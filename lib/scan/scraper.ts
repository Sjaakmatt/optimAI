// Website-content ophalen voor de publieke scan.
//
// Primaire route: de bedrijven-MCP (`get_company_website_content`) — dezelfde
// worker die het FactumAI-dashboard gebruikt voor lead-verrijking. Die crawlt
// meerdere relevante pagina's (homepage + over-ons/diensten/contact) en geeft
// schone tekst terug. Zet hiervoor `FACTUMAI_MCP_BEDRIJVEN_URL` (en de
// bijbehorende auth-vars) in de env.
//
// Fallback: een lichte ingebouwde scraper (homepage + een paar relevante
// same-origin pagina's, HTML → platte tekst). Zo werkt de scan ook zonder
// MCP-configuratie, alleen met een ANTHROPIC_API_KEY.

import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';

export interface ScanScrape {
  status: 'ok' | 'empty' | 'failed';
  url: string;
  title: string | null;
  markdown: string | null;
  bron: 'mcp' | 'fetch' | null;
  errorMessage: string | null;
}

// Ruim genoeg voor een goede analyse, krap genoeg om de model-call snel te
// houden op een publieke marketingpagina (~6k tokens).
const MAX_TOTAL_CHARS = 24_000;
const MAX_PAGE_CHARS = 7_000;
const MAX_EXTRA_PAGES = 4;
const FETCH_TIMEOUT_MS = 10_000;
const MCP_TIMEOUT_MS = 60_000;

// ---------------------------------------------------------------------------
// URL-normalisatie + SSRF-guard
// ---------------------------------------------------------------------------

export function normalizeScanUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed || trimmed.length > 300) return null;
  const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const u = new URL(withProto);
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return null;
    if (!u.hostname.includes('.')) return null;
    u.hash = '';
    u.search = '';
    return u.toString();
  } catch {
    return null;
  }
}

function isPrivateIp(ip: string): boolean {
  if (ip.includes(':')) {
    // IPv6: loopback, link-local, unique-local, IPv4-mapped naar privaat
    const low = ip.toLowerCase();
    return (
      low === '::1' ||
      low.startsWith('fe80:') ||
      low.startsWith('fc') ||
      low.startsWith('fd') ||
      low.startsWith('::ffff:127.') ||
      low.startsWith('::ffff:10.') ||
      low.startsWith('::ffff:192.168.')
    );
  }
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4) return true;
  const [a, b] = parts;
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168)
  );
}

/** Weiger interne hosts — de bezoeker bepaalt de URL, dus wij checken 'm. */
async function assertPublicHost(url: string): Promise<void> {
  const { hostname } = new URL(url);
  const bare = hostname.replace(/^\[|\]$/g, '');
  if (bare === 'localhost' || bare.endsWith('.local') || bare.endsWith('.internal')) {
    throw new Error('Deze host kan niet gescand worden.');
  }
  if (isIP(bare)) {
    if (isPrivateIp(bare)) throw new Error('Deze host kan niet gescand worden.');
    return;
  }
  try {
    const { address } = await lookup(bare);
    if (isPrivateIp(address)) throw new Error('Deze host kan niet gescand worden.');
  } catch {
    throw new Error('Website niet gevonden — controleer het adres.');
  }
}

// ---------------------------------------------------------------------------
// Bedrijven-MCP (zelfde Streamable-HTTP-conventie als het dashboard)
// ---------------------------------------------------------------------------

type ScrapedPage = { url: string; title?: string; text: string };
type WebsiteScrapeResult = { pages: ScrapedPage[] };

function mcpAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {};
  const secret = process.env.FACTUMAI_MCP_INBOUND_SECRET;
  if (secret) headers.Authorization = `Bearer ${secret}`;
  const cfId = process.env.CF_ACCESS_CLIENT_ID;
  const cfSecret = process.env.CF_ACCESS_CLIENT_SECRET;
  if (cfId && cfSecret) {
    headers['CF-Access-Client-Id'] = cfId;
    headers['CF-Access-Client-Secret'] = cfSecret;
  }
  return headers;
}

function parseStreamableHttpResponse(text: string): unknown {
  const sseMatches = text.matchAll(/^data:\s*(.+)$/gm);
  let lastJson: unknown | null = null;
  for (const match of sseMatches) {
    try {
      lastJson = JSON.parse(match[1]);
    } catch {
      // volgende event proberen
    }
  }
  if (lastJson !== null) return lastJson;
  return JSON.parse(text);
}

let mcpRequestId = 0;

async function callBedrijvenMcp(url: string): Promise<WebsiteScrapeResult> {
  const baseUrl = process.env.FACTUMAI_MCP_BEDRIJVEN_URL;
  if (!baseUrl) throw new Error('FACTUMAI_MCP_BEDRIJVEN_URL niet gezet');

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/event-stream',
    ...mcpAuthHeaders(),
  };

  // Initialize (stateless workers geven geen sessie-id terug; dat is prima).
  const initRes = await fetch(baseUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: { name: 'factumai-website-scan', version: '1.0.0' },
      },
      id: ++mcpRequestId,
    }),
    signal: AbortSignal.timeout(5000),
  });
  if (!initRes.ok) throw new Error(`MCP initialize HTTP ${initRes.status}`);
  const sessionId = initRes.headers.get('mcp-session-id') ?? '';
  await initRes.text();

  const toolCallId = `scan-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: sessionId ? { ...headers, 'Mcp-Session-Id': sessionId } : headers,
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'tools/call',
      params: {
        name: 'get_company_website_content',
        arguments: {
          url,
          maxPages: 6,
          tenantContext: {
            organizationId: process.env.FACTUMAI_MCP_ORG_ID ?? 'factumai-website',
            agentId: 'website-scan',
            toolCallId,
          },
        },
      },
      id: ++mcpRequestId,
    }),
    signal: AbortSignal.timeout(MCP_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`MCP tools/call HTTP ${res.status}`);

  const payload = parseStreamableHttpResponse(await res.text()) as {
    error?: { message: string };
    result?: { isError?: boolean; content?: Array<{ type: string; text?: string }> };
  };
  if (payload.error) throw new Error(payload.error.message);
  const textBlock = payload.result?.content?.find((c) => c.type === 'text');
  if (payload.result?.isError) throw new Error(textBlock?.text ?? 'MCP tool error');
  if (!textBlock?.text) throw new Error('MCP gaf geen content terug');
  return JSON.parse(textBlock.text) as WebsiteScrapeResult;
}

/** Meerdere MCP-pagina's plat naar één markdown-document met bron-kopjes. */
function flattenMcpResult(result: WebsiteScrapeResult): {
  markdown: string | null;
  title: string | null;
} {
  const pages = (result.pages ?? []).filter((p) => p.text?.trim());
  if (pages.length === 0) return { markdown: null, title: null };
  const title = pages.find((p) => p.title)?.title?.trim() ?? null;
  const sections = pages.map((p) => {
    const header = p.title?.trim() || p.url;
    return `## ${header}\n(${p.url})\n\n${p.text.trim().slice(0, MAX_PAGE_CHARS)}`;
  });
  return { markdown: sections.join('\n\n---\n\n'), title };
}

// ---------------------------------------------------------------------------
// Fallback: lichte eigen scraper (homepage + relevante deep-links)
// ---------------------------------------------------------------------------

const RELEVANT_PATHS =
  /over|about|team|dienst|service|product|werkwijze|contact|vacature|case|project|assortiment|oplossing/i;

function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(br|\/p|\/div|\/li|\/h[1-6]|\/tr)[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&eacute;/g, 'é')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n\s*/g, '\n\n')
    .trim();
}

function extractTitle(html: string): string | null {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? htmlToText(m[1]).slice(0, 200) || null : null;
}

async function fetchPage(url: string): Promise<{ html: string } | null> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'FactumAI-ScanBot/1.0 (+https://factumai.nl/scan)',
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'nl,en;q=0.8',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    const type = res.headers.get('content-type') ?? '';
    if (!type.includes('html')) return null;
    return { html: await res.text() };
  } catch {
    return null;
  }
}

function discoverLinks(html: string, baseUrl: string): string[] {
  const base = new URL(baseUrl);
  const seen = new Set<string>();
  const links: string[] = [];
  for (const m of html.matchAll(/<a\s[^>]*href=["']([^"'#]+)["']/gi)) {
    let resolved: URL;
    try {
      resolved = new URL(m[1], base);
    } catch {
      continue;
    }
    if (resolved.hostname !== base.hostname) continue;
    if (!RELEVANT_PATHS.test(resolved.pathname)) continue;
    if (/\.(pdf|jpe?g|png|webp|zip|docx?|xlsx?)$/i.test(resolved.pathname)) continue;
    resolved.hash = '';
    resolved.search = '';
    const key = resolved.toString();
    if (seen.has(key) || key === baseUrl) continue;
    seen.add(key);
    links.push(key);
    if (links.length >= MAX_EXTRA_PAGES) break;
  }
  return links;
}

async function fallbackScrape(url: string): Promise<{
  markdown: string | null;
  title: string | null;
}> {
  const home = await fetchPage(url);
  if (!home) return { markdown: null, title: null };

  const title = extractTitle(home.html);
  const sections: string[] = [];
  const homeText = htmlToText(home.html).slice(0, MAX_PAGE_CHARS);
  if (homeText) sections.push(`## ${title ?? 'Homepage'}\n(${url})\n\n${homeText}`);

  const extra = discoverLinks(home.html, url);
  const pages = await Promise.all(extra.map((link) => fetchPage(link).then((p) => ({ link, p }))));
  for (const { link, p } of pages) {
    if (!p) continue;
    const text = htmlToText(p.html).slice(0, MAX_PAGE_CHARS);
    if (!text) continue;
    sections.push(`## ${extractTitle(p.html) ?? link}\n(${link})\n\n${text}`);
  }

  return { markdown: sections.length ? sections.join('\n\n---\n\n') : null, title };
}

// ---------------------------------------------------------------------------
// Hoofd-entry
// ---------------------------------------------------------------------------

export async function scrapeCompanyWebsite(rawUrl: string): Promise<ScanScrape> {
  const url = normalizeScanUrl(rawUrl);
  if (!url) {
    return {
      status: 'failed',
      url: rawUrl,
      title: null,
      markdown: null,
      bron: null,
      errorMessage: 'Ongeldige website-URL',
    };
  }

  await assertPublicHost(url);

  // 1) Bedrijven-MCP (indien geconfigureerd)
  if (process.env.FACTUMAI_MCP_BEDRIJVEN_URL) {
    try {
      const viaMcp = flattenMcpResult(await callBedrijvenMcp(url));
      if (viaMcp.markdown) {
        return {
          status: 'ok',
          url,
          title: viaMcp.title,
          markdown: viaMcp.markdown.slice(0, MAX_TOTAL_CHARS),
          bron: 'mcp',
          errorMessage: null,
        };
      }
    } catch (err) {
      console.warn('[scan] mcp-bedrijven fallback:', err instanceof Error ? err.message : err);
    }
  }

  // 2) Ingebouwde scraper
  const viaFetch = await fallbackScrape(url);
  if (viaFetch.markdown) {
    return {
      status: 'ok',
      url,
      title: viaFetch.title,
      markdown: viaFetch.markdown.slice(0, MAX_TOTAL_CHARS),
      bron: 'fetch',
      errorMessage: null,
    };
  }

  return {
    status: 'empty',
    url,
    title: viaFetch.title,
    markdown: null,
    bron: null,
    errorMessage: 'De website leverde geen leesbare content op',
  };
}
