// boekAfspraak: vraagt de kennismaking aan en mailt de bevestigingslink.
//
// De afspraak staat na deze tool nog niet vast. Dat is met opzet: de agent
// krijgt het mailadres in een chatgesprek en heeft geen enkele manier om te
// weten of het van de bezoeker is. Er gaat dus een mail met een link naar dat
// adres, en pas als die gevolgd wordt gaat de afspraak de agenda in. Wie het
// adres niet kan lezen, krijgt er niets voor elkaar.
//
// Daarom mag het model hier ook nooit "je afspraak staat" zeggen. De teksten
// hieronder sturen daar strak op, want dat is precies het soort bevestiging dat
// een model graag te vroeg geeft.
//
// De starttijd wordt serverside nog een keer tegen de vrije momenten gehouden
// (lib/booking/agenda.ts), zodat een verzonnen of verlopen tijdstip niet eens
// een mail oplevert.
//
// Staat de site nog op de Cal.com-agenda, dan doet deze tool niets meer dan de
// widget openen — het oude gedrag.

import type Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

import { BOEKING_PROVIDER } from '@/components/booking/config';
import { SlotBezetFout } from '@/lib/booking/agenda';
import { OptInMailFout, vraagAan } from '@/lib/booking/flow';
import { werkConversatieBij } from '../db';
import type { ToolContext, ToolUitvoer } from './types';

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? 'sjaak-factumai/kennismaking';

export const BOEK_AFSPRAAK_DEFINITIE: Anthropic.Tool = {
  name: 'boekAfspraak',
  description:
    'Vraag de kennismaking van 20 minuten aan en stuur de bezoeker een bevestigingsmail. Roep dit ' +
    'alleen aan als je via checkBeschikbaarheid een vrij moment hebt gezien én de bezoeker naam ' +
    'en mailadres heeft gegeven en het gekozen moment heeft bevestigd. Gebruik voor "start" exact ' +
    'de start=-waarde uit checkBeschikbaarheid; verzin nooit zelf een tijdstip. LET OP: de ' +
    'afspraak staat hierna nog NIET in de agenda. De bezoeker moet eerst op de link in die mail ' +
    'klikken. Zeg dus nooit dat de afspraak vaststaat. Weet je geen vrij moment of geen ' +
    'mailadres, gebruik dan checkBeschikbaarheid en laat de bezoeker zelf kiezen in de widget.',
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
        'Er is niets aangevraagd: er ontbrak een geldige starttijd, naam of mailadres. Vraag ' +
        'wat er mist en probeer het daarna opnieuw. Zeg niet dat het gelukt is.',
    };
  }
  const invoer = parsed.data;

  try {
    const aanvraag = await vraagAan({
      start: invoer.start,
      naam: invoer.naam,
      email: invoer.email,
      bedrijf: invoer.bedrijf,
      aanleiding: invoer.aanleiding,
      bron: 'site-agent',
      conversationId: ctx.conversatieId,
    });

    return {
      voorModel:
        `Er is een bevestigingsmail gestuurd naar ${invoer.email} voor ${aanvraag.moment}. ` +
        'De afspraak staat nog NIET in de agenda: dat gebeurt pas als de bezoeker op de link in ' +
        'die mail klikt. Zeg dus dat de mail onderweg is en dat één klik erop het vastzet. ' +
        'Bevestig de afspraak niet als iets dat al geregeld is.',
    };
  } catch (err) {
    if (err instanceof SlotBezetFout) {
      return {
        voorModel:
          'Dat moment is inmiddels vergeven, dus er is niets aangevraagd. Zeg dat eerlijk, roep ' +
          'checkBeschikbaarheid opnieuw aan en bied een ander moment aan.',
      };
    }
    if (err instanceof OptInMailFout) {
      return {
        voorModel:
          'De bevestigingsmail kon niet verstuurd worden, dus er staat niets klaar. Vraag of het ' +
          'mailadres klopt en probeer het opnieuw, of bied aan om te mailen naar info@factumai.nl.',
      };
    }
    console.error('[site-agent] aanvraag faalde:', err instanceof Error ? err.message : err);
    return {
      voorModel:
        'Het aanvragen lukte niet door een technische storing. Zeg dat eerlijk, zeg NIET dat er ' +
        'een afspraak staat, en bied aan om te mailen naar info@factumai.nl.',
    };
  }
}
