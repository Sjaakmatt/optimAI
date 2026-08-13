// POST /api/v1/agenda/bevestigen — zet de aangevraagde afspraak in de agenda.
//
// Bewust een POST en geen GET. De link in de mail wijst naar een pagina met een
// knop; die knop doet dit verzoek. Een GET die meteen boekt, wordt geboekt door
// de eerste de beste linkscanner van een mailfilter — en dan staat de afspraak
// er zonder dat de bezoeker iets gedaan heeft, precies het probleem dat de
// opt-in moest oplossen.
//
// Geen rate limit op de token zelf: die is 32 bytes willekeur en wordt op hash
// opgezocht, dus raden is geen begaanbare weg. Wel telt elke poging mee in de
// gewone infrastructuurlimieten.

import { NextResponse } from 'next/server';
import { z } from 'zod';

import { BOEKING_PROVIDER } from '@/components/booking/config';
import { bevestig } from '@/lib/booking/flow';

export const runtime = 'nodejs';
export const maxDuration = 30;

const Invoer = z.object({ token: z.string().length(64) });

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
      { ok: false, soort: 'onbekend', error: 'Deze link klopt niet.' },
      { status: 400 },
    );
  }

  try {
    const uitkomst = await bevestig(parsed.data.token);

    switch (uitkomst.soort) {
      case 'geboekt':
        return NextResponse.json({
          ok: true,
          soort: uitkomst.soort,
          moment: uitkomst.moment,
          bevestiging: `Gelukt, ${uitkomst.moment} staat in de agenda. Je krijgt een uitnodiging met de Teams-link per mail.`,
        });

      case 'al-bevestigd':
        return NextResponse.json({
          ok: true,
          soort: uitkomst.soort,
          moment: uitkomst.moment,
          bevestiging: `Deze afspraak stond al vast: ${uitkomst.moment}. Je hoeft niets meer te doen.`,
        });

      case 'verlopen':
        return NextResponse.json(
          {
            ok: false,
            soort: uitkomst.soort,
            error:
              'Deze link is verlopen. Kies gerust een nieuw moment, dan sturen we een nieuwe bevestiging.',
          },
          { status: 410 },
        );

      case 'bezet':
        return NextResponse.json(
          {
            ok: false,
            soort: uitkomst.soort,
            error:
              'Dat moment is inmiddels vergeven. Kies een ander tijdstip, dan zetten we dat vast.',
          },
          { status: 409 },
        );

      default:
        return NextResponse.json(
          { ok: false, soort: 'onbekend', error: 'Deze link klopt niet of is al opgeruimd.' },
          { status: 404 },
        );
    }
  } catch (err) {
    console.error('[agenda] bevestigen faalde:', err instanceof Error ? err.message : err);
    return NextResponse.json(
      {
        ok: false,
        soort: 'fout',
        error:
          'Het lukte niet om de afspraak vast te leggen. Probeer het zo nog eens, of mail naar info@factumai.nl.',
      },
      { status: 502 },
    );
  }
}
