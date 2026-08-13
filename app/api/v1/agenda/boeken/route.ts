// POST /api/v1/agenda/boeken — vraagt een kennismaking aan.
//
// Let op wat hier níét gebeurt: er komt nog geen afspraak in de agenda. Dit
// eindpunt is publiek en anoniem, dus wie hier een mailadres invult heeft nog
// niet bewezen dat het van hem is. De bezoeker krijgt een link per mail; pas
// als die gevolgd wordt gaat de afspraak erin. Zie lib/booking/flow.ts.
//
// Volgorde: honeypot, rate limit, validatie, en pas dan de MCP en de mail.

import { NextResponse } from 'next/server';
import { z } from 'zod';

import { BOEKING_PROVIDER } from '@/components/booking/config';
import { SlotBezetFout } from '@/lib/booking/agenda';
import { OptInMailFout, vraagAan } from '@/lib/booking/flow';
import { magBoeken } from '@/lib/booking/limiet';
import { hashIp } from '@/lib/site-agent/ratelimit';

export const runtime = 'nodejs';
export const maxDuration = 30;

const Invoer = z.object({
  start: z.string().datetime(),
  naam: z.string().min(2).max(120),
  email: z.string().email().max(160),
  bedrijf: z.string().max(160).optional(),
  aanleiding: z.string().max(600).optional(),
  // Waar de agenda geopend is. Vaste lijst en geen vrije tekst: dit komt in de
  // database en de client bepaalt de waarde.
  bron: z.enum(['agenda', 'knop', 'plan-pagina', 'aanvraag']).default('agenda'),
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

  const limiet = await magBoeken(hashIp(ip), invoer.email);
  if (!limiet.toegestaan) {
    return NextResponse.json({ ok: false, error: limiet.melding }, { status: 429 });
  }

  try {
    const aanvraag = await vraagAan({
      start: invoer.start,
      naam: invoer.naam,
      email: invoer.email,
      bedrijf: invoer.bedrijf,
      aanleiding: invoer.aanleiding,
      bron: invoer.bron,
    });

    return NextResponse.json({
      ok: true,
      wachtOpBevestiging: true,
      start: aanvraag.start,
      moment: aanvraag.moment,
      bevestiging:
        `Ik heb je een mail gestuurd op ${invoer.email}. Klik op de link erin, dan zet ik ` +
        `${aanvraag.moment} vast in de agenda.`,
    });
  } catch (err) {
    if (err instanceof SlotBezetFout) {
      return NextResponse.json(
        { ok: false, herlaad: true, error: 'Dat moment is net vergeven. Kies een ander tijdstip.' },
        { status: 409 },
      );
    }
    if (err instanceof OptInMailFout) {
      return NextResponse.json(
        {
          ok: false,
          error:
            'Ik kon de bevestigingsmail niet versturen. Controleer het mailadres, of mail direct naar info@factumai.nl.',
        },
        { status: 502 },
      );
    }
    console.error('[agenda] aanvraag faalde:', err instanceof Error ? err.message : err);
    return NextResponse.json(
      {
        ok: false,
        error:
          'Het lukte niet om de aanvraag te verwerken. Probeer het zo nog eens, of mail naar info@factumai.nl.',
      },
      { status: 502 },
    );
  }
}
