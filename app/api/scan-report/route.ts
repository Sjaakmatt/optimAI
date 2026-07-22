// POST /api/scan-report — de bezoeker vraagt na de scan het volledige
// rapport per e-mail aan. We mailen het uitgebreide rapport via Resend,
// leggen e-mail + marketing-consent vast in de dashboard-database (ScanLead)
// en sturen info@ een leadmelding.

import { buildReportHtml, buildReportText } from '@/lib/scan/report';
import { saveReportRequest } from '@/lib/scan/leads';
import { normalizeScanUrl } from '@/lib/scan/scraper';
import type { ScanAnalysis } from '@/lib/scan/types';

export const runtime = 'nodejs';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort rate-limit per IP (in-memory, per instance).
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 6;
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
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

interface Payload {
  website?: unknown;
  bedrijfsnaam?: unknown;
  email?: unknown;
  consent?: unknown;
  consentText?: unknown;
  result?: unknown;
  // honeypot: mensen zien dit veld niet.
  telefoon?: unknown;
}

function str(v: unknown, max = 300): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

async function mailReport(to: string, naam: string, analysis: ScanAnalysis): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL ?? 'website@factumai.nl';
  if (!apiKey) {
    console.info('[scan-report] geen RESEND_API_KEY, rapport niet verzonden naar', to);
    return false;
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from: `FactumAI <${from}>`,
        to: [to],
        subject: `Uw AI-rapport voor ${naam}`,
        html: buildReportHtml(naam, analysis),
        text: buildReportText(naam, analysis),
      }),
    });
    if (!res.ok) {
      console.error('[scan-report] Resend faalde:', res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error('[scan-report] Resend exception:', err);
    return false;
  }
}

async function notifyTeam(fields: {
  naam: string;
  website: string;
  email: string;
  consent: boolean;
  score: number;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? 'info@factumai.nl';
  const from = process.env.CONTACT_FROM_EMAIL ?? 'website@factumai.nl';
  if (!apiKey) return;
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from: `FactumAI Scan <${from}>`,
        to: [to],
        reply_to: fields.email,
        subject: `Nieuwe scan-lead · ${fields.naam} (${fields.score}/100)`,
        text:
          `Bedrijf: ${fields.naam}\n` +
          `Website: ${fields.website}\n` +
          `E-mail: ${fields.email}\n` +
          `Marketing-opt-in: ${fields.consent ? 'ja' : 'nee'}\n` +
          `AI-potentieel: ${fields.score}/100\n` +
          `Bron: publieke AI-scan\n`,
      }),
    });
  } catch (err) {
    console.error('[scan-report] teamnotificatie faalde:', err);
  }
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return Response.json({ ok: false, error: 'Ongeldige aanvraag' }, { status: 400 });
  }

  // Honeypot: stilzwijgend ok.
  if (str(body.telefoon).length > 0) return Response.json({ ok: true });

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'onbekend';
  if (rateLimited(ip)) {
    return Response.json(
      { ok: false, error: 'Even geduld, u heeft net al een rapport aangevraagd.' },
      { status: 429 },
    );
  }

  const email = str(body.email, 160);
  if (!email || !EMAIL_REGEX.test(email)) {
    return Response.json({ ok: false, error: 'Vul een geldig e-mailadres in.' }, { status: 422 });
  }

  const website = normalizeScanUrl(str(body.website)) ?? str(body.website);
  const bedrijfsnaam = str(body.bedrijfsnaam, 160);
  const consent = body.consent === true;
  const consentText =
    str(body.consentText, 500) ||
    'Ja, FactumAI mag mij af en toe mailen over wat AI voor mijn bedrijf kan betekenen.';

  const analysis =
    body.result && typeof body.result === 'object'
      ? (body.result as ScanAnalysis)
      : null;
  if (!analysis || typeof analysis.score !== 'number') {
    return Response.json({ ok: false, error: 'Scan-resultaat ontbreekt.' }, { status: 422 });
  }

  const naam = bedrijfsnaam || website.replace(/^https?:\/\//, '');

  // Vastleggen in de database (best-effort, nooit blokkerend voor de mail).
  await saveReportRequest({
    website,
    bedrijfsnaam,
    email,
    consentMarketing: consent,
    consentText,
    analysis,
  });

  const sent = await mailReport(email, naam, analysis);
  void notifyTeam({ naam, website, email, consent, score: analysis.score });

  if (!sent) {
    // Opslag is gelukt; alleen de mail haperde. Meld het eerlijk.
    return Response.json(
      {
        ok: false,
        error:
          'We konden het rapport nu niet mailen. Uw aanvraag is genoteerd; we sturen het handmatig na.',
      },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
