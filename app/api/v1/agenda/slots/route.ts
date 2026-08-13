// GET /api/v1/agenda/slots — de vrije momenten voor een kennismaking.
//
// Publiek en anoniem: de agenda-widget en de site-agent halen hier hun slots
// op. We geven bewust alleen start- en eindtijden terug, geen onderwerpen of
// deelnemers: wat er verder in de agenda staat gaat een websitebezoeker niets
// aan.

import { NextResponse } from 'next/server';

import { BOEKING_DUUR_MINUTEN, BOEKING_PROVIDER } from '@/components/booking/config';
import { HORIZON_DAGEN, groepeerPerDag, haalSlots } from '@/lib/booking/agenda';
import { magSlotsOpvragen } from '@/lib/booking/limiet';
import { hashIp } from '@/lib/site-agent/ratelimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  if (BOEKING_PROVIDER !== 'teams') {
    return NextResponse.json(
      { ok: false, error: 'De eigen agenda staat uit.' },
      { status: 404 },
    );
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'onbekend';

  const limiet = await magSlotsOpvragen(hashIp(ip));
  if (!limiet.toegestaan) {
    return NextResponse.json({ ok: false, error: limiet.melding }, { status: 429 });
  }

  try {
    const slots = await haalSlots();
    return NextResponse.json(
      {
        ok: true,
        duurMinuten: BOEKING_DUUR_MINUTEN,
        horizonDagen: HORIZON_DAGEN,
        dagen: groepeerPerDag(slots),
      },
      // Kort cachen aan de rand: een paar bezoekers achter elkaar hoeven niet
      // ieder een eigen Graph-call te veroorzaken, en een slot dat een halve
      // minuut te laat verdwijnt wordt bij het boeken alsnog geweigerd.
      { headers: { 'Cache-Control': 'public, max-age=0, s-maxage=30' } },
    );
  } catch (err) {
    console.error('[agenda] slots ophalen faalde:', err instanceof Error ? err.message : err);
    return NextResponse.json(
      {
        ok: false,
        error:
          'De agenda is even niet bereikbaar. Probeer het zo nog eens, of mail naar info@factumai.nl.',
      },
      { status: 502 },
    );
  }
}
