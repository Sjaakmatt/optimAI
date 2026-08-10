 
/**
 * indexnow-ping.ts
 *
 * Pingt IndexNow (Bing, Yandex, Seznam, Naver, Yep, Mojeek) zodra er
 * nieuwe URLs op factumai.nl bijkomen. Versnelt indexering, Google
 * gebruikt IndexNow niet zelf, maar Bing voedt ChatGPT-search en de
 * crawl-signaal helpt indirect overal.
 *
 * Modes:
 *
 *   npm run indexnow-ping -- --auto
 *     Diff HEAD~1 vs HEAD op alle data-files. Pingt elke nieuw
 *     toegevoegde slug. Gebruikt vanuit GitHub Actions.
 *
 *   npm run indexnow-ping -- --soro
 *     Pingt de artikelen die Soro de afgelopen dagen publiceerde. Die
 *     komen zonder commit binnen, dus de diff-modus ziet ze niet.
 *
 *   npm run indexnow-ping -- --all
 *     Pingt alle URLs uit de data-files (+ statics). Eenmalig nuttig
 *     bij eerste setup of een grote refactor.
 *
 *   npm run indexnow-ping -- https://factumai.nl/foo https://factumai.nl/bar
 *     Pingt expliciet meegegeven URLs.
 */

import { execSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { INDEXNOW_KEY, INDEXNOW_KEY_LOCATION, INDEXNOW_ENDPOINT } from '../lib/seo/indexnow';

const ROOT = join(import.meta.dirname ?? __dirname, '..');
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';
const HOST = new URL(SITE).host;

const STATIC_URLS: string[] = [
  '/',
  '/diensten',
  '/diensten/ai-agent-laten-bouwen',
  '/diensten/ai-automatisering',
  '/diensten/ai-implementatie',
  '/diensten/ai-agents-voor-bedrijven',
  '/diensten/vergelijken/ai-agent-vs-erp-automatisering',
  '/oplossingen',
  '/over',
  '/info',
  '/cases',
  '/kennis',
  '/branches',
  '/contact',
  '/plan',
  '/tools/ai-roi-calculator',
  '/tools/agent-readiness-check',
];

// Map data file -> URL prefix, gebruikt voor diff- en --all modes
const DATA_URL_MAP: Array<{ file: string; prefix: string }> = [
  { file: 'lib/data/posts.ts', prefix: '/kennis/' },
  { file: 'lib/data/cases.ts', prefix: '/cases/' },
  { file: 'lib/data/branches.ts', prefix: '/branches/' },
  { file: 'lib/data/oplossingen.ts', prefix: '/oplossingen/' },
  { file: 'lib/data/comparisons.ts', prefix: '/diensten/vergelijken/' },
  { file: 'lib/data/resources.ts', prefix: '/resources/' },
  { file: 'lib/data/team.ts', prefix: '/over/' },
];

function extractSlugs(content: string): string[] {
  const slugs: string[] = [];
  for (const m of content.matchAll(/slug:\s*'([^']+)'/g)) slugs.push(m[1]);
  return slugs;
}

function gitShow(ref: string, file: string): string {
  try {
    return execSync(`git show ${ref}:${file}`, {
      encoding: 'utf8',
      cwd: ROOT,
      stdio: ['pipe', 'pipe', 'pipe'],
    });
  } catch {
    return '';
  }
}

function detectNewUrls(): string[] {
  const urls: string[] = [];
  for (const { file, prefix } of DATA_URL_MAP) {
    const oldContent = gitShow('HEAD~1', file);
    const newContent = gitShow('HEAD', file);
    const oldSlugs = new Set(extractSlugs(oldContent));
    const newSlugs = extractSlugs(newContent);
    for (const slug of newSlugs) {
      if (!oldSlugs.has(slug)) {
        urls.push(`${SITE}${prefix}${slug}`);
      }
    }
  }
  return urls;
}

async function readAllUrls(): Promise<string[]> {
  const urls: string[] = STATIC_URLS.map((p) => `${SITE}${p === '/' ? '' : p}`);
  for (const { file, prefix } of DATA_URL_MAP) {
    try {
      const content = await readFile(join(ROOT, file), 'utf8');
      for (const slug of extractSlugs(content)) urls.push(`${SITE}${prefix}${slug}`);
    } catch {
      // file kan ontbreken in oudere repo-states
    }
  }
  // dedupe
  return Array.from(new Set(urls));
}

/**
 * Artikelen uit de Soro-feed komen zonder commit binnen, dus de diff-modus
 * ziet ze niet. Deze modus pingt de artikelen die de afgelopen dagen zijn
 * gepubliceerd. Draait één keer per dag, dus het volume blijft laag.
 */
async function detectSoroUrls(dagen = 3): Promise<string[]> {
  const { getSoroPosts } = await import('../lib/data/soro');
  const posts = await getSoroPosts();
  const grens = new Date();
  grens.setDate(grens.getDate() - dagen);

  return posts
    .filter((p) => new Date(p.published) >= grens)
    .map((p) => `${SITE}/kennis/${p.slug}`);
}

async function ping(urls: string[]): Promise<void> {
  if (urls.length === 0) {
    console.log('Geen URLs om te pingen. Klaar.');
    return;
  }

  console.log(`Pingen naar IndexNow: ${urls.length} URL${urls.length === 1 ? '' : 's'}`);
  for (const u of urls) console.log(`  - ${u}`);

  // IndexNow heeft een max van 10.000 URLs per request maar wij blijven veilig
  // onder de praktische limiet door in batches van 100 te pingen.
  const BATCH = 100;
  for (let i = 0; i < urls.length; i += BATCH) {
    const batch = urls.slice(i, i + BATCH);
    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: INDEXNOW_KEY_LOCATION,
      urlList: batch,
    };

    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    if (res.status === 200 || res.status === 202) {
      console.log(`✓ Batch ${Math.floor(i / BATCH) + 1}: HTTP ${res.status} (${batch.length} URLs)`);
      continue;
    }

    const body = await res.text().catch(() => '');
    console.error(`✗ Batch ${Math.floor(i / BATCH) + 1}: HTTP ${res.status}`);
    if (body) console.error(`  ${body.slice(0, 300)}`);
    process.exit(1);
  }
}

async function main() {
  const args = process.argv.slice(2);
  let urls: string[];

  if (args.length === 0) {
    console.error('Usage:');
    console.error('  indexnow-ping --auto              # diff HEAD~1 vs HEAD');
    console.error('  indexnow-ping --soro              # recent gepubliceerde Soro-artikelen');
    console.error('  indexnow-ping --all               # alle bekende URLs');
    console.error('  indexnow-ping <url> [url...]      # specifieke URLs');
    process.exit(1);
  }

  if (args[0] === '--auto') {
    urls = detectNewUrls();
    console.log(`Diff-detectie: ${urls.length} nieuwe URL${urls.length === 1 ? '' : 's'}`);
  } else if (args[0] === '--soro') {
    urls = await detectSoroUrls();
    console.log(`Soro-feed: ${urls.length} recent gepubliceerd${urls.length === 1 ? '' : 'e'} artikel${urls.length === 1 ? '' : 'en'}`);
  } else if (args[0] === '--all') {
    urls = await readAllUrls();
    console.log(`Bulk-mode: ${urls.length} URLs`);
  } else {
    urls = args.filter((a) => a.startsWith('http'));
    if (urls.length === 0) {
      console.error('Geen geldige URLs meegegeven.');
      process.exit(1);
    }
  }

  await ping(urls);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
