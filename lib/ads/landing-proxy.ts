import { isIP } from 'node:net';

/** The website forwards only public landing pages. Admin routes never cross this boundary. */
const MAX_BODY_BYTES = 64 * 1024;
const TIMEOUT_MS = 15_000;
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;
const RESPONSE_HEADERS = ['content-type', 'content-language', 'content-security-policy', 'referrer-policy', 'permissions-policy', 'x-frame-options', 'x-content-type-options', 'x-robots-tag', 'retry-after'] as const;
const DEFAULT_ADS_ORIGIN = 'https://factumai-ads.terveldholding.workers.dev';
const DEFAULT_SITE_ORIGIN = 'https://factumai.nl';

type Environment = Record<string, string | undefined>;
type Dependencies = { env?: Environment; fetcher?: typeof fetch; timeoutMs?: number };

function origin(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password && url.pathname === '/' && !url.search && !url.hash ? url.origin : null;
  } catch { return null; }
}

/** Vercel overwrites this platform header. Never substitute a client-provided custom header. */
function visitorIp(request: Request, env: Environment): string | null {
  if (env.VERCEL !== '1') return null;
  const value = request.headers.get('x-vercel-forwarded-for')?.trim();
  if (!value || value.length > 64 || !isIP(value)) return null;
  if (isIP(value) === 4) return value;
  try { return new URL(`http://[${value}]/`).hostname.slice(1, -1); }
  catch { return null; }
}

function failure(status: number, message: string, method: string, allow?: string): Response {
  const headers: Record<string, string> = {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'X-Robots-Tag': 'noindex, nofollow',
    'Content-Security-Policy': "default-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'",
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  };
  if (allow) headers.Allow = allow;
  const html = `<!doctype html><html lang="nl"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>FactumAI · Landingspagina</title><body><main><h1>De pagina is even niet beschikbaar.</h1><p>${message}</p><p><a href="https://factumai.nl">Terug naar FactumAI</a></p></main></body></html>`;
  return new Response(method === 'HEAD' ? null : html, { status, headers });
}

async function boundedBody(request: Request): Promise<ArrayBuffer> {
  const reader = request.body?.getReader();
  if (!reader) return new ArrayBuffer(0);
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BODY_BYTES) {
        await reader.cancel().catch(() => undefined);
        throw new RangeError('Body limit');
      }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const body = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength; }
  return body.buffer;
}

/** Injectable HTTP boundary makes spoofing and error handling testable without external requests. */
export async function proxyLandingRequest(request: Request, dependencies: Dependencies = {}): Promise<Response> {
  const env = dependencies.env ?? process.env;
  const method = request.method;
  const requestedUrl = new URL(request.url);
  // Reject encoded paths, extra segments and every endpoint outside this exact public contract.
  const match = /^\/lp\/([a-z0-9]+(?:-[a-z0-9]+)*)(?:\/(submit|bedankt))?\/?$/.exec(requestedUrl.pathname);
  if (!match || match[1].length < 3 || match[1].length > 80) return failure(404, 'Deze landingspagina bestaat niet.', method);
  const [, slug, suffix] = match;
  const allowed = suffix === 'submit' ? ['POST'] : ['GET', 'HEAD'];
  if (!allowed.includes(method)) return failure(405, 'Open de pagina opnieuw om verder te gaan.', method, allowed.join(', '));

  const adsOrigin = origin(env.FACTUMAI_ADS_ORIGIN ?? DEFAULT_ADS_ORIGIN);
  const siteOrigin = origin(env.PUBLIC_SITE_ORIGIN ?? DEFAULT_SITE_ORIGIN);
  const secret = env.LANDING_PROXY_SECRET;
  if (!adsOrigin || !siteOrigin || !secret || secret.length < 32 || /[\r\n]/.test(secret)) return failure(503, 'Probeer het later opnieuw of neem contact op via onze website.', method);
  if (method === 'POST' && (request.headers.get('origin') !== siteOrigin || requestedUrl.origin !== siteOrigin)) return failure(403, 'Open de landingspagina op factumai.nl en verstuur het formulier daar.', method);

  const ip = visitorIp(request, env);
  if (!ip) return failure(503, 'Probeer het later opnieuw of neem contact op via onze website.', method);
  const upstream = new URL(`/lp/${slug}${suffix ? `/${suffix}` : '/'}`, adsOrigin);
  if (!suffix) {
    for (const key of UTM_KEYS) {
      const value = requestedUrl.searchParams.get(key);
      if (value !== null) upstream.searchParams.set(key, value.slice(0, 200));
    }
  }
  const headers = new Headers({
    Accept: 'text/html',
    'X-FactumAI-Proxy-Secret': secret,
    'X-FactumAI-Visitor-IP': ip,
  });
  let body: ArrayBuffer | undefined;
  if (method === 'POST') {
    const contentType = request.headers.get('content-type') ?? '';
    if (contentType.split(';')[0].trim().toLowerCase() !== 'application/x-www-form-urlencoded') return failure(415, 'Verstuur uw aanvraag via het formulier op de pagina.', method);
    const declaredLength = request.headers.get('content-length');
    if (declaredLength !== null && (!/^\d+$/.test(declaredLength) || Number(declaredLength) > MAX_BODY_BYTES)) return failure(413, 'Uw aanvraag is te groot. Gebruik een kortere omschrijving.', method);
    try { body = await boundedBody(request); }
    catch (error) { return failure(error instanceof RangeError ? 413 : 400, 'Uw aanvraag kon niet worden gelezen. Gebruik een kortere omschrijving en probeer opnieuw.', method); }
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    // This is the original browser Origin, already validated above; never reconstructed from a query.
    headers.set('Origin', request.headers.get('origin')!);
  }

  const abort = new AbortController();
  const timer = setTimeout(() => abort.abort(), dependencies.timeoutMs ?? TIMEOUT_MS);
  try {
    const response = await (dependencies.fetcher ?? fetch)(upstream, {
      method, headers, body, redirect: 'manual', cache: 'no-store', signal: abort.signal,
    });
    const outgoing = new Headers();
    for (const key of RESPONSE_HEADERS) {
      const value = response.headers.get(key);
      if (value !== null) outgoing.set(key, value);
    }
    outgoing.set('Cache-Control', 'no-store');
    outgoing.set('X-Content-Type-Options', 'nosniff');
    outgoing.set('X-Robots-Tag', 'noindex, nofollow');
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      // A successful form may only redirect to this page's confirmation, never another host or route.
      if (method !== 'POST' || response.status !== 303 || location !== `/lp/${slug}/bedankt`) {
        await response.body?.cancel().catch(() => undefined);
        return failure(502, 'De pagina kon niet goed worden geopend. Probeer het opnieuw.', method);
      }
      outgoing.set('Location', location);
    }
    // Fully read within the timeout. HTML is produced by our own Worker; no browser cookies or keys return.
    const responseBody = method === 'HEAD' ? null : await response.arrayBuffer();
    if (method === 'HEAD') await response.body?.cancel().catch(() => undefined);
    return new Response(responseBody, { status: response.status, headers: outgoing });
  } catch {
    return failure(502, 'Probeer het later opnieuw of neem contact op via onze website.', method);
  } finally { clearTimeout(timer); }
}
