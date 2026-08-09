/**
 * Haalt de artikelen op die Soro publiceert en normaliseert ze naar hetzelfde
 * model als onze eigen kennisartikelen, zodat ze in één lijst op /kennis staan.
 *
 * Aanzetten: zet SORO_FEED_URL in de omgeving naar de RSS-feed uit het
 * Soro-dashboard. Zonder die variabele gedraagt de site zich precies zoals
 * daarvoor: geen externe artikelen, geen extra requests, geen risico.
 */

export interface SoroPost {
  slug: string;
  title: string;
  lede: string;
  author: string;
  published: string;
  updated?: string;
  readingMinutes: number;
  tags: string[];
  /** Gesaneerde HTML van het artikel. */
  html: string;
  /** Uitgelichte afbeelding uit enclosure of media:content, indien aanwezig. */
  image?: string;
  source: 'soro';
}

/**
 * De feed is account-gebonden en read-only; hetzelfde token stond ook in het
 * publieke embed-snippet. Via SORO_FEED_URL te overschrijven, of leeg te zetten
 * om externe artikelen uit te schakelen.
 */
const DEFAULT_FEED_URL =
  'https://app.trysoro.com/api/rss/32b19ece-d2a9-4775-819a-6c816c13aa02';
const FEED_URL =
  process.env.SORO_FEED_URL === undefined
    ? DEFAULT_FEED_URL
    : process.env.SORO_FEED_URL;
const REVALIDATE_SECONDS = 3600;

function stripCdata(value: string): string {
  const match = value.match(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/);
  return match ? match[1] : value;
}

function decodeEntities(value: string): string {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
}

function tagValue(item: string, tag: string): string | undefined {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'i');
  const match = item.match(re);
  if (!match) return undefined;
  const value = stripCdata(match[1]).trim();
  return value.length > 0 ? value : undefined;
}

function allTagValues(item: string, tag: string): string[] {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'gi');
  const out: string[] = [];
  for (const match of item.matchAll(re)) {
    const value = stripCdata(match[1]).trim();
    if (value.length > 0) out.push(value);
  }
  return out;
}

/**
 * Conservatieve sanitizer. De feed is van een externe partij, dus alles wat
 * kan uitvoeren of laden van derden gaat eruit voordat het op onze pagina komt.
 */
export function sanitizeHtml(input: string): string {
  let html = input;
  html = html.replace(/<!--[\s\S]*?-->/g, '');
  html = html.replace(/<(script|style|iframe|object|embed|form|input|button|link|meta|base|svg)\b[\s\S]*?<\/\1\s*>/gi, '');
  html = html.replace(/<(script|style|iframe|object|embed|form|input|button|link|meta|base|svg)\b[^>]*\/?>/gi, '');
  // event-handlers en javascript:-URL's
  html = html.replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, '');
  html = html.replace(/\son[a-z]+\s*=\s*'[^']*'/gi, '');
  html = html.replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, '');
  html = html.replace(/(href|src)\s*=\s*"(?:\s*javascript:|\s*data:(?!image\/))[^"]*"/gi, '$1="#"');
  html = html.replace(/(href|src)\s*=\s*'(?:\s*javascript:|\s*data:(?!image\/))[^']*'/gi, "$1='#'");
  return html.trim();
}

function toPlainText(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function slugFrom(link: string | undefined, guid: string | undefined, title: string): string {
  const candidate = link ?? guid ?? '';
  const fromUrl = candidate
    .split('?')[0]
    .split('#')[0]
    .replace(/\/+$/, '')
    .split('/')
    .pop();
  const base =
    fromUrl && /[a-z0-9]/i.test(fromUrl) && !/^https?:$/i.test(fromUrl)
      ? fromUrl
      : title;
  return base
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96);
}

function attributeValue(item: string, tag: string, attr: string): string | undefined {
  const re = new RegExp(`<${tag}\\b[^>]*\\b${attr}\\s*=\\s*"([^"]+)"`, 'i');
  const match = item.match(re);
  if (!match) return undefined;
  const value = match[1].trim();
  return /^https:\/\//i.test(value) ? value : undefined;
}

function toIsoDate(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString().slice(0, 10);
}

function parseFeed(xml: string): SoroPost[] {
  const items = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];
  const posts: SoroPost[] = [];

  for (const item of items) {
    const title = tagValue(item, 'title');
    if (!title) continue;

    const rawContent =
      tagValue(item, 'content:encoded') ?? tagValue(item, 'description') ?? '';
    const html = sanitizeHtml(decodeEntities(rawContent));
    const plain = toPlainText(html);
    if (plain.length === 0) continue;

    const published =
      toIsoDate(tagValue(item, 'pubDate')) ??
      toIsoDate(tagValue(item, 'dc:date')) ??
      new Date().toISOString().slice(0, 10);

    const descriptionText = toPlainText(
      sanitizeHtml(decodeEntities(tagValue(item, 'description') ?? '')),
    );
    const lede =
      descriptionText.length > 20 && descriptionText.length < 400
        ? descriptionText
        : plain.slice(0, 220).replace(/\s+\S*$/, '') + '…';

    posts.push({
      slug: slugFrom(tagValue(item, 'link'), tagValue(item, 'guid'), title),
      title: decodeEntities(title),
      lede,
      author: decodeEntities(tagValue(item, 'dc:creator') ?? 'FactumAI'),
      published,
      updated: toIsoDate(tagValue(item, 'atom:updated')),
      readingMinutes: Math.max(1, Math.round(plain.split(/\s+/).length / 200)),
      tags: allTagValues(item, 'category').map(decodeEntities).slice(0, 5),
      html,
      image:
        attributeValue(item, 'enclosure', 'url') ??
        attributeValue(item, 'media:content', 'url'),
      source: 'soro',
    });
  }

  return posts;
}

let warned = false;

export async function getSoroPosts(): Promise<SoroPost[]> {
  if (!FEED_URL) return [];

  try {
    const res = await fetch(FEED_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: 'application/rss+xml, application/xml, text/xml' },
    });
    if (!res.ok) {
      if (!warned) {
        warned = true;
        console.warn(`[soro] feed gaf status ${res.status}, externe artikelen overgeslagen`);
      }
      return [];
    }
    return parseFeed(await res.text());
  } catch (error) {
    if (!warned) {
      warned = true;
      console.warn('[soro] feed niet bereikbaar, externe artikelen overgeslagen', error);
    }
    return [];
  }
}

/**
 * Externe artikelen minus de slugs die wij zelf al gebruiken, zodat een eigen
 * artikel altijd wint van een gelijknamig extern artikel.
 */
export async function getSoroPostsExcluding(ownSlugs: Set<string>): Promise<SoroPost[]> {
  const posts = await getSoroPosts();
  const seen = new Set<string>();
  return posts.filter((p) => {
    if (ownSlugs.has(p.slug) || seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });
}

export async function getSoroPostBySlug(slug: string): Promise<SoroPost | undefined> {
  const posts = await getSoroPosts();
  return posts.find((p) => p.slug === slug);
}
