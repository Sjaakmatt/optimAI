// POST /api/scan — publieke AI-agents-scan met live voortgang (SSE).
//
// De bezoeker stuurt { bedrijfsnaam?, url }. De route scrapet de website
// (bedrijven-MCP indien geconfigureerd, anders de ingebouwde scraper), laat
// Claude het bedrijf analyseren en streamt ondertussen fase-events zodat de
// UI de checklist live kan aftikken. Afsluitend één result- of error-event.

import { scrapeCompanyWebsite, normalizeScanUrl } from '@/lib/scan/scraper';
import { analyzeCompany } from '@/lib/scan/analyze';
import type { ScanEvent } from '@/lib/scan/types';

export const runtime = 'nodejs';
export const maxDuration = 120;

// Best-effort rate-limit per IP (in-memory; op serverless per instance —
// geen waterdichte bescherming, wel een rem op misbruik en API-kosten).
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 4;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (list.length >= RATE_MAX) {
    hits.set(ip, list);
    return true;
  }
  list.push(now);
  hits.set(ip, list);
  // Simpele opruiming zodat de map niet oneindig groeit.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

interface ScanPayload {
  bedrijfsnaam?: unknown;
  url?: unknown;
  // Honeypot — mensen zien dit veld niet; ingevuld = bot.
  emailadres?: unknown;
}

export async function POST(request: Request) {
  let body: ScanPayload;
  try {
    body = (await request.json()) as ScanPayload;
  } catch {
    return Response.json({ ok: false, error: 'Ongeldige aanvraag' }, { status: 400 });
  }

  if (typeof body.emailadres === 'string' && body.emailadres.trim().length > 0) {
    // Honeypot geraakt: stilzwijgend "ok", geen scan.
    return Response.json({ ok: true });
  }

  const rawUrl = typeof body.url === 'string' ? body.url.trim() : '';
  const bedrijfsnaam =
    typeof body.bedrijfsnaam === 'string' ? body.bedrijfsnaam.trim().slice(0, 160) : '';

  const url = normalizeScanUrl(rawUrl);
  if (!url) {
    return Response.json(
      { ok: false, error: 'Vul een geldige website-URL in (bijv. uwbedrijf.nl).' },
      { status: 422 },
    );
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'onbekend';
  if (rateLimited(ip)) {
    return Response.json(
      { ok: false, error: 'Even geduld — u heeft net al een paar scans gedaan. Probeer het over een paar minuten opnieuw.' },
      { status: 429 },
    );
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const timers: ReturnType<typeof setTimeout>[] = [];
      let closed = false;

      const send = (event: ScanEvent) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
        } catch {
          closed = true;
        }
      };
      const heartbeat = setInterval(() => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(': ping\n\n'));
        } catch {
          closed = true;
        }
      }, 10_000);

      // Fase 3 en 4 lopen binnen één model-call; we laten de tussenstappen op
      // een timer meelopen zodat de checklist blijft bewegen. De láátste stap
      // wordt pas afgevinkt als het echte resultaat er is.
      const finish = (fn: () => void) => {
        clearInterval(heartbeat);
        for (const t of timers) clearTimeout(t);
        fn();
        if (!closed) {
          closed = true;
          controller.close();
        }
      };

      try {
        send({ type: 'stage', stage: 'website', status: 'busy' });
        const scrape = await scrapeCompanyWebsite(url);
        send({ type: 'stage', stage: 'website', status: 'done', detail: scrape.title ?? undefined });
        send({ type: 'stage', stage: 'profiel', status: 'busy' });

        timers.push(
          setTimeout(() => {
            send({ type: 'stage', stage: 'profiel', status: 'done' });
            send({ type: 'stage', stage: 'branche', status: 'busy' });
          }, 8_000),
          setTimeout(() => {
            send({ type: 'stage', stage: 'branche', status: 'done' });
            send({ type: 'stage', stage: 'voorstellen', status: 'busy' });
          }, 18_000),
        );

        const naam = bedrijfsnaam || scrape.title || new URL(scrape.url).hostname;
        const result = await analyzeCompany(naam, scrape);

        finish(() => {
          // Eventueel nog niet gepasseerde tussenstappen alsnog aftikken.
          send({ type: 'stage', stage: 'profiel', status: 'done' });
          send({ type: 'stage', stage: 'branche', status: 'done' });
          send({ type: 'stage', stage: 'voorstellen', status: 'done' });
          send({ type: 'result', result, bedrijfsnaam: naam, url: scrape.url });
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'De scan is mislukt';
        console.error('[scan] fout:', message);
        finish(() =>
          send({
            type: 'error',
            message:
              message.includes('gescand') || message.includes('gevonden')
                ? message
                : 'De scan is helaas mislukt. Probeer het over een moment opnieuw, of plan direct een gesprek.',
          }),
        );
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
