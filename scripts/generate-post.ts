/* eslint-disable no-console */
/**
 * generate-post.ts
 *
 * Schrijft één nieuw kennisartikel in factumai-stijl met Claude Sonnet 4.6,
 * valideert het, voegt het toe aan lib/data/posts.ts en zet de backlog-item op
 * "drafted". Bedoeld om vanuit GitHub Actions te draaien (cron) of lokaal:
 *
 *   npm run new-post                 -- volgende item uit content-backlog.json
 *   npm run new-post -- "topic"      -- ad-hoc onderwerp (cluster A default)
 *
 * Vereisten:
 *   - ANTHROPIC_API_KEY in env
 *   - npm install (zie package.json devDependencies)
 *
 * De generated post wordt getagd met `generatedBy: 'ai-draft'` zodat het in
 * de UI/CI te onderscheiden is van menselijk werk.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

const ROOT = join(import.meta.dirname ?? __dirname, '..');
const POSTS_PATH = join(ROOT, 'lib', 'data', 'posts.ts');
const BACKLOG_PATH = join(ROOT, 'scripts', 'content-backlog.json');
const STYLE_GUIDE_PATH = join(ROOT, 'scripts', 'style-guide.md');
const FEWSHOT_FILES = [
  'guardrails.json',
  'welk-proces.json',
  'verborgen-kosten.json',
  'integraties.json',
];

const MODEL = 'claude-sonnet-4-6';
const MAX_RETRIES = 2;

// ---------- Zod schemas (mirror Post type from lib/data/posts.ts) ----------

const blockSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('p'), text: z.string().min(20) }),
  z.object({ kind: z.literal('h2'), text: z.string().min(2).max(120) }),
  z.object({ kind: z.literal('h3'), text: z.string().min(2).max(120) }),
  z.object({ kind: z.literal('quote'), text: z.string().min(10).max(220), by: z.string().optional() }),
  z.object({ kind: z.literal('list'), items: z.array(z.string().min(5)).min(2).max(7) }),
  z.object({ kind: z.literal('divider') }),
]);

const faqSchema = z.object({
  q: z.string().min(10).max(180),
  a: z.string().min(40).max(600),
});

const postSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'kebab-case slug, geen leestekens'),
  title: z.string().min(15).max(120),
  lede: z.string().min(80).max(360),
  author: z.literal('Sjaak ter Veld'),
  published: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  readingMinutes: z.number().int().min(3).max(9),
  tags: z.array(z.string().min(2)).min(2).max(6),
  blocks: z.array(blockSchema).min(6).max(20),
  faq: z.array(faqSchema).min(0).max(5).optional(),
  cluster: z.enum(['A', 'B', 'C', 'D', 'E']),
  generatedBy: z.literal('ai-draft'),
});

type GeneratedPost = z.infer<typeof postSchema>;

// ---------- Pre-validation normalization ----------

/**
 * Het model kiest soms andere veldnamen dan het schema verwacht
 * (bv. `question`/`answer` ipv `q`/`a`). Hier normaliseren we naar
 * het canonieke schema voordat Zod valideert. Voorkomt onnodige retries.
 */
function normalize(raw: unknown): unknown {
  if (!raw || typeof raw !== 'object') return raw;
  const obj = raw as Record<string, unknown>;

  if (Array.isArray(obj.faq)) {
    obj.faq = obj.faq.map((item) => {
      if (!item || typeof item !== 'object') return item;
      const f = item as Record<string, unknown>;
      const q = f.q ?? f.question ?? f.vraag ?? f.title;
      const a = f.a ?? f.answer ?? f.antwoord ?? f.text ?? f.body;
      return { q, a };
    });
  }

  if (Array.isArray(obj.blocks)) {
    obj.blocks = obj.blocks.map((b) => {
      if (!b || typeof b !== 'object') return b;
      const block = b as Record<string, unknown>;
      // model gebruikt soms `type` ipv `kind`
      if (!block.kind && typeof block.type === 'string') {
        block.kind = block.type;
        delete block.type;
      }
      // list-items kunnen onder `content` of `items` zitten
      if (block.kind === 'list' && !block.items && Array.isArray(block.content)) {
        block.items = block.content;
        delete block.content;
      }
      return block;
    });
  }

  // generatedBy kan in andere casing terugkomen
  if (typeof obj.generatedBy !== 'string') {
    obj.generatedBy = 'ai-draft';
  }

  return obj;
}

// ---------- Backlog ----------

interface BacklogItem {
  topic: string;
  cluster: 'A' | 'B' | 'C' | 'D' | 'E';
  status: 'pending' | 'drafted' | 'published' | 'skipped';
  tags?: string[];
}

interface Backlog {
  $schema?: string;
  items: BacklogItem[];
}

async function loadBacklog(): Promise<Backlog> {
  return JSON.parse(await readFile(BACKLOG_PATH, 'utf8'));
}

async function saveBacklog(b: Backlog) {
  await writeFile(BACKLOG_PATH, `${JSON.stringify(b, null, 2)}\n`, 'utf8');
}

function pickNext(b: Backlog): BacklogItem | undefined {
  return b.items.find((i) => i.status === 'pending');
}

// ---------- Existing slugs (to avoid duplicates) ----------

async function readExistingSlugs(): Promise<Set<string>> {
  const src = await readFile(POSTS_PATH, 'utf8');
  const slugs = new Set<string>();
  for (const m of src.matchAll(/slug:\s*'([^']+)'/g)) slugs.add(m[1]);
  return slugs;
}

// ---------- Claude prompt construction ----------

async function buildSystemBlocks() {
  const styleGuide = await readFile(STYLE_GUIDE_PATH, 'utf8');
  const fewshots = await Promise.all(
    FEWSHOT_FILES.map(async (f) => ({
      name: f,
      content: await readFile(join(ROOT, 'scripts', 'fewshot', f), 'utf8'),
    })),
  );

  const fewshotText = fewshots
    .map((s) => `### ${s.name}\n\`\`\`json\n${s.content.trim()}\n\`\`\``)
    .join('\n\n');

  // The system prompt is split in two cached blocks so prompt-caching keeps
  // both the style-guide and the fewshots warm across runs in the same session.
  return [
    {
      type: 'text' as const,
      text: `Je bent de redactionele schrijver van FactumAI, een Nederlands AI-implementatiebureau.
Je schrijft kennisartikelen in dezelfde stijl als de drie meegeleverde voorbeelden.

# Stijlgids
${styleGuide}`,
      cache_control: { type: 'ephemeral' as const },
    },
    {
      type: 'text' as const,
      text: `# Voorbeelden van bestaande artikelen
Hier zijn drie complete artikelen in het exacte JSON-formaat dat je moet produceren.
Lees ze door en imiteer de stijl, structuur, ritme en woordkeuze:

${fewshotText}

# Output-contract
Geef ALLEEN geldig JSON terug dat exact past op het Post-schema hieronder.
Geen markdown, geen toelichting, geen \`\`\`json fence.

\`\`\`ts
{
  slug: string,                   // kebab-case, geen leestekens
  title: string,                  // 15-120 tekens, max 9 woorden
  lede: string,                   // 80-360 tekens, 25-55 woorden
  author: "Sjaak ter Veld",       // exact deze string
  published: "yyyy-mm-dd",        // vandaag
  readingMinutes: number,         // 4-8
  tags: string[],                 // 3-5 items
  blocks: Block[],                // 6-20 items, zie hieronder
  faq?: { q: string, a: string }[],  // optioneel, 2-4 items. VELDNAMEN ZIJN q EN a, NIET question/answer
  cluster: "A" | "B" | "C" | "D" | "E",
  generatedBy: "ai-draft"
}

type Block =
  | { kind: "p", text: string }              // paragraaf
  | { kind: "h2", text: string }             // sectiekop
  | { kind: "h3", text: string }             // sub-sectiekop
  | { kind: "quote", text: string, by?: string }
  | { kind: "list", items: string[] }        // 2-7 items, KIND IS list, ITEMS ZIJN items
  | { kind: "divider" }
\`\`\`

Belangrijk:
- Velden HEETEN exact zoals hierboven. faq-items hebben \`q\` en \`a\`, niet \`question\`/\`answer\`. blocks hebben \`kind\`, niet \`type\`.
- Geen H1 (de title is de H1).
- Geef geen verzonnen klantnamen of cijfers. Whitelist productnamen volgens de stijlgids.`,
      cache_control: { type: 'ephemeral' as const },
    },
  ];
}

function buildUserPrompt(item: BacklogItem, today: string): string {
  return `Schrijf het volgende kennisartikel:

- Onderwerp: ${item.topic}
- Cluster: ${item.cluster}
- Voorgestelde tags (overweeg, mag uitbreiden of swappen): ${(item.tags ?? []).join(', ') || '—'}
- Publicatiedatum (gebruik dit voor 'published'): ${today}

Schrijf in u-vorm. Vermijd hype-taal. Maak het concreet en bruikbaar voor een Nederlandse MKB-ondernemer die overweegt AI-agents in te zetten.

Lever ALLEEN het JSON-object terug, geen tekst eromheen.`;
}

// ---------- Anthropic call with retry ----------

async function generateOnce(
  client: Anthropic,
  systemBlocks: Awaited<ReturnType<typeof buildSystemBlocks>>,
  userPrompt: string,
): Promise<string> {
  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 8000,
    system: systemBlocks,
    messages: [{ role: 'user', content: userPrompt }],
  });

  const text = res.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('\n')
    .trim();

  // Strip optional ```json fence if model still adds one
  return text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
}

function approxWordCount(p: GeneratedPost): number {
  return p.blocks.reduce((sum, b) => {
    if (b.kind === 'p' || b.kind === 'h2' || b.kind === 'h3' || b.kind === 'quote') {
      return sum + b.text.split(/\s+/).filter(Boolean).length;
    }
    if (b.kind === 'list') {
      return sum + b.items.reduce((s, it) => s + it.split(/\s+/).filter(Boolean).length, 0);
    }
    return sum;
  }, 0);
}

// ---------- Insert post into posts.ts ----------

function postToTsLiteral(p: GeneratedPost): string {
  const escape = (s: string) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

  const blockLines = p.blocks
    .map((b) => {
      if (b.kind === 'p' || b.kind === 'h2' || b.kind === 'h3') {
        return `      { kind: '${b.kind}', text: '${escape(b.text)}' },`;
      }
      if (b.kind === 'quote') {
        const by = b.by ? `, by: '${escape(b.by)}'` : '';
        return `      { kind: 'quote', text: '${escape(b.text)}'${by} },`;
      }
      if (b.kind === 'list') {
        const items = b.items.map((it) => `        '${escape(it)}',`).join('\n');
        return `      { kind: 'list', items: [\n${items}\n      ] },`;
      }
      return `      { kind: 'divider' },`;
    })
    .join('\n');

  const tagsLine = p.tags.map((t) => `'${escape(t)}'`).join(', ');

  const faqBlock = p.faq?.length
    ? `    faq: [\n${p.faq
        .map(
          (f) =>
            `      { q: '${escape(f.q)}', a: '${escape(f.a)}' },`,
        )
        .join('\n')}\n    ],\n`
    : '';

  return `  {
    slug: '${escape(p.slug)}',
    title: '${escape(p.title)}',
    lede: '${escape(p.lede)}',
    author: '${escape(p.author)}',
    published: '${p.published}',
    readingMinutes: ${p.readingMinutes},
    tags: [${tagsLine}],
    blocks: [
${blockLines}
    ],
${faqBlock}    cluster: '${p.cluster}',
    generatedBy: '${p.generatedBy}',
  },
`;
}

async function insertIntoPostsFile(p: GeneratedPost) {
  const src = await readFile(POSTS_PATH, 'utf8');

  // We append the new entry just before the closing ']' of POSTS array.
  // Look for the last '];' that closes 'export const POSTS: Post[] = [...]'.
  const marker = '\n];\n\nexport const POST_BY_SLUG';
  const idx = src.indexOf(marker);
  if (idx < 0) {
    throw new Error('Kan POSTS-array sluiting niet vinden in posts.ts — handmatig bijwerken nodig.');
  }

  const insertion = postToTsLiteral(p);
  const next = `${src.slice(0, idx)}\n${insertion}${src.slice(idx)}`;
  await writeFile(POSTS_PATH, next, 'utf8');
}

// ---------- Main ----------

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ERROR: ANTHROPIC_API_KEY ontbreekt in env.');
    process.exit(1);
  }

  const adhocTopic = process.argv[2];
  const backlog = await loadBacklog();

  let item: BacklogItem | undefined;
  if (adhocTopic) {
    item = { topic: adhocTopic, cluster: 'A', status: 'pending' };
    console.log(`> Ad-hoc onderwerp: ${adhocTopic}`);
  } else {
    item = pickNext(backlog);
    if (!item) {
      console.log('Backlog is leeg — niets te doen. Voeg items toe in scripts/content-backlog.json.');
      return;
    }
    console.log(`> Volgend backlog-item: ${item.topic} (cluster ${item.cluster})`);
  }

  const existingSlugs = await readExistingSlugs();
  const client = new Anthropic({ apiKey });
  const systemBlocks = await buildSystemBlocks();
  const today = new Date().toISOString().slice(0, 10);
  const userPrompt = buildUserPrompt(item, today);

  let post: GeneratedPost | null = null;
  let lastError: string | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES + 1; attempt += 1) {
    console.log(`> Generatie poging ${attempt}/${MAX_RETRIES + 1}…`);
    let raw: string;
    try {
      raw = await generateOnce(client, systemBlocks, userPrompt);
    } catch (e) {
      lastError = `API-call faalde: ${(e as Error).message}`;
      console.error(lastError);
      continue;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      lastError = 'JSON-parse faalde — model gaf geen geldig JSON.';
      console.error(`${lastError} Eerste 200 chars:\n${raw.slice(0, 200)}`);
      continue;
    }

    parsed = normalize(parsed);
    const result = postSchema.safeParse(parsed);
    if (!result.success) {
      lastError = `Zod-validatie faalde:\n${result.error.issues
        .map((i) => `  - ${i.path.join('.')}: ${i.message}`)
        .join('\n')}`;
      console.error(lastError);
      continue;
    }

    if (existingSlugs.has(result.data.slug)) {
      lastError = `Slug bestaat al in posts.ts: ${result.data.slug}`;
      console.error(lastError);
      continue;
    }

    const wc = approxWordCount(result.data);
    if (wc < 450 || wc > 1500) {
      lastError = `Lengte (${wc} woorden) buiten bandbreedte 450-1500.`;
      console.error(lastError);
      continue;
    }

    post = result.data;
    break;
  }

  if (!post) {
    console.error(`\nGeneratie mislukt na ${MAX_RETRIES + 1} pogingen. Laatste fout:\n${lastError}`);
    process.exit(2);
  }

  console.log(`> Geldige post: "${post.title}" (${approxWordCount(post)} woorden, ${post.readingMinutes} min)`);

  await insertIntoPostsFile(post);
  console.log(`> Toegevoegd aan ${POSTS_PATH}`);

  if (!adhocTopic) {
    item.status = 'drafted';
    await saveBacklog(backlog);
    console.log('> Backlog-item gemarkeerd als drafted');
  }

  // GitHub Actions outputs (gebruikt door workflow voor PR-titel/-body)
  if (process.env.GITHUB_OUTPUT) {
    const out = `slug=${post.slug}\ntitle=${post.title.replace(/\n/g, ' ')}\ncluster=${post.cluster}\n`;
    await writeFile(process.env.GITHUB_OUTPUT, out, { flag: 'a' });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
