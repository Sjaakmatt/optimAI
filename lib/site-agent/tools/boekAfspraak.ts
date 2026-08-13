// boekAfspraak: legt de kennismaking daadwerkelijk vast in de agenda.
//
// Met de eigen agenda (BOEKING_PROVIDER=teams) boekt deze tool echt: hij zet de
// afspraak in de mailbox van sjaak@factumai.com, met een Teams-link, en de
// bezoeker krijgt de uitnodiging plus een bevestigingsmail. Daarvoor zijn een
// starttijd uit `checkBeschikbaarheid`, een naam en een mailadres nodig.
//
// Dat het echt boekt is precies waarom de tool zuinig is met vertrouwen: de
// starttijd wordt serverside nog een keer tegen de vrije momenten gehouden
// (lib/booking/agenda.ts), zodat een verzonnen of verlopen tijdstip niet in de
// agenda belandt. Een model dat zich vergist mag geen afspraak op zondagnacht
// kunnen zetten.
//
// Staat de site nog op de Cal.com-agenda, dan boekt deze tool niets en opent
// alleen de widget — het oude gedrag.

import type Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

import { BOEKING_DUUR_MINUTEN, BOEKING_PROVIDER } from '@/components/booking/config';
import { SlotBezetFout, boekAfspraakIn, omschrijfMoment } from '@/lib/booking/agenda';
import { stuurBevestiging } from '@/lib/booking/mail';
import { werkConversatieBij } from '../db';
import type { ToolContext, ToolUitvoer } from './types';

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? 'sjaak-factumai/kennismaking';

export const BOEK_AFSPRAAK_DEFINITIE: Anthropic.Tool = {
  name: 'boekAfspraak',
  description:
    'Leg de kennismaking van 20 minuten vast in de agenda van Sjaak. Roep dit alleen aan als je ' +
    'via checkBeschikbaarheid een vrij moment hebt gezien én de bezoeker naam en mailadres heeft ' +
    'gegeven en het gekozen moment heeft bevestigd. Gebruik voor "start" exact de start=-waarde ' +
    'uit checkBeschikbaarheid; verzin nooit zelf een tijdstip. De bezoeker krijgt daarna een ' +
    'agenda-uitnodiging met de Teams-link. Weet je geen vrij moment of geen mailadres, gebruik ' +
    'dan checkBeschikbaarheid en laat de bezoeker zelf kiezen in de widget.',
  input_schema: {
    type: 'object',
    properties: {
      start: {
        type: 'string',
        description:
          'De starttijd, exact zoals checkBeschikbaarheid die gaf achter "start=" ' +
          '(bijvoorbeeld 2026-06-03T10:30:00.000Z).',
      },
      naam: { type: 'string', description: 'De naam die de bezoeker zelf heeft gegeven.' },
      email: { type: 'string', description: 'Het mailadres dat de bezoeker zelf heeft gegeven.' },
      bedrijf: { type: 'string', description: 'De bedrijfsnaam, als de bezoeker die noemde.' },
      aanleiding: {
        type: 'string',
        description:
          'In één zin waar het gesprek over gaat, zodat Sjaak voorbereid is. Bijvoorbeeld ' +
          '"offertes maken bij een groothandel, loopt via Exact en Outlook".',
      },
    },
    required: ['start', 'naam', 'email'],
    additionalProperties: false,
  },
};

const Invoer = z.object({
  start: z.string().min(1),
  naam: z.string().min(2).max(120),
  email: z.string().email().max(160),
  bedrijf: z.string().max(160).optional(),
  aanleiding: z.string().max(500).optional(),
});

export async function boekAfspraak(ruw: unknown, ctx: ToolContext): Promise<ToolUitvoer> {
  // Zonder eigen agenda kan deze tool niet boeken: dan blijft het bij de
  // widget openzetten, zoals het met Cal.com ging.
  if (BOEKING_PROVIDER !== 'teams') {
    const aanleiding =
      typeof (ruw as { aanleiding?: unknown } | null)?.aanleiding === 'string'
        ? (ruw as { aanleiding: string }).aanleiding
        : '';
    await werkConversatieBij(ctx.conversatieId, { afspraakGeboekt: true });
    return {
      voorModel:
        'De agenda staat nu open in de widget. Zeg kort dat de bezoeker een moment kan kiezen en ' +
        'dat hij daarna een bevestiging krijgt. Noem geen datum en geen tijdstip.',
      signaal: { naam: 'agenda', payload: { calLink: CAL_LINK, aanleiding } },
      afspraakGeboekt: true,
    };
  }

  const parsed = Invoer.safeParse(ruw);
  if (!parsed.success) {
    return {
      voorModel:
        'De afspraak is niet geboekt: er ontbrak een geldige starttijd, naam of mailadres. Vraag ' +
        'wat er mist en probeer het daarna opnieuw. Zeg niet dat het gelukt is.',
    };
  }
  const invoer = parsed.data;

  try {
    const boeking = await boekAfspraakIn({
      start: invoer.start,
      naam: invoer.naam,
      email: invoer.email,
      bedrijf: invoer.bedrijf,
      aanleiding: invoer.aanleiding,
      bron: 'site-agent',
    });

    await stuurBevestiging({
      naam: invoer.naam,
      email: invoer.email,
      start: boeking.start,
      joinUrl: boeking.joinUrl,
      duurMinuten: BOEKING_DUUR_MINUTEN,
    });

    await werkConversatieBij(ctx.conversatieId, { afspraakGeboekt: true });

    const moment = omschrijfMoment(boeking.start);
    return {
      voorModel:
        `De afspraak staat: ${moment}. De bezoeker heeft een agenda-uitnodiging met de ` +
        'Teams-link gekregen op het opgegeven mailadres. Bevestig dit kort en noem het moment.',
      afspraakGeboekt: true,
    };
  } catch (err) {
    if (err instanceof SlotBezetFout) {
      return {
        voorModel:
          'Dat moment is inmiddels vergeven, dus er is niets geboekt. Zeg dat eerlijk, roep ' +
          'checkBeschikbaarheid opnieuw aan en bied een ander moment aan.',
      };
    }
    console.error('[site-agent] boeken faalde:', err instanceof Error ? err.message : err);
    return {
      voorModel:
        'Het boeken lukte niet door een technische storing. Zeg dat eerlijk, zeg NIET dat er een ' +
        'afspraak staat, en bied aan om te mailen naar info@factumai.nl.',
    };
  }
}
