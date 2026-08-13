// POST /api/v1/agenda/boeken — legt de kennismaking vast in de agenda.
//
// Dit is het enige publieke eindpunt van de site dat iets in de agenda van een
// mens zet, dus de volgorde is: honeypot, rate limit, validatie, en pas dan de
// MCP. De controle of het gekozen moment écht vrij is gebeurt in
// `boekAfspraakIn` — daar staat ook waarom.
//
// De agenda-uitnodiging met de Teams-link komt uit de mailbox zelf; de
// bevestigingsmail hier is de menselijke tekst ernaast.

import { NextResponse } from 'next/server';
import { z } from 'zod';

import { BOEKING_DUUR_MINUTEN, BOEKING_PROVIDER } from '@/components/booking/config';
import { SlotBezetFout, boekAfspraakIn, omschrijfMoment } from '@/lib/booking/agenda';
import { magBoeken } from '@/lib/booking/limiet';
import { stuurBevestiging } from '@/lib/booking/mail';
import { hashIp } from '@/lib/site-agent/ratelimit';

export const runtime = 'nodejs';
export const maxDuration = 30;

const Invoer = z.object({
  start: z.string().datetime(),
  naam: z.string().min(2).max(120),
  email: z.string().email().max(160),
  bedrijf: z.string().max(160).optional(),
  aanleiding: z.string().max(600).optional(),
  // Honeypot: staat verstopt in het formulier. Ingevuld betekent bot.
  website: z.string().optional(),
});

export async function POST(request: Request) {
  if (BOEKING_PROVIDER !== 'teams') {
    return NextResponse.json({ ok: false, error: 'De eigen agenda staat uit.' }, { status: 404 });
  }

  let ruw: unknown;
  try {
    ruw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Ongeldig verzoek.' }, { status: 400 });
  }

  const parsed = Invoer.safeParse(ruw);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Controleer je naam, mailadres en het gekozen moment.' },
      { status: 400 },
    );
  }
  const invoer = parsed.data;

  // Botten vullen alles in wat ze zien. Stilletjes ok teruggeven: een bot die
  // een foutmelding krijgt, probeert het net zo lang tot het wél lukt.
  if (invoer.website && invoer.website.trim() !== '') {
    return NextResponse.json({ ok: true, bevestiging: 'Bedankt, je hoort van ons.' });
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'onbekend';

  const limiet = await magBoeken(hashIp(ip));
  if (!limiet.toegestaan) {
    return NextResponse.json({ ok: false, error: limiet.melding }, { status: 429 });
  }

  try {
    const boeking = await boekAfspraakIn({
      start: invoer.start,
      naam: invoer.naam,
      email: invoer.email,
      bedrijf: invoer.bedrijf,
      aanleiding: invoer.aanleiding,
      bron: 'agenda',
    });

    await stuurBevestiging({
      naam: invoer.naam,
      email: invoer.email,
      start: boeking.start,
      joinUrl: boeking.joinUrl,
      duurMinuten: BOEKING_DUUR_MINUTEN,
    });

    return NextResponse.json({
      ok: true,
      start: boeking.start,
      moment: omschrijfMoment(boeking.start),
      bevestiging: `Gelukt, ${omschrijfMoment(boeking.start)} staat in de agenda. Je krijgt een uitnodiging met de Teams-link per mail.`,
    });
  } catch (err) {
    if (err instanceof SlotBezetFout) {
      return NextResponse.json(
        { ok: false, herlaad: true, error: 'Dat moment is net vergeven. Kies een ander tijdstip.' },
        { status: 409 },
      );
    }
    console.error('[agenda] boeken faalde:', err instanceof Error ? err.message : err);
    return NextResponse.json(
      {
        ok: false,
        error:
          'Het lukte niet om de afspraak vast te leggen. Probeer het zo nog eens, of mail naar info@factumai.nl.',
      },
      { status: 502 },
    );
  }
}
