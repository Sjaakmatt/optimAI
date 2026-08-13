// checkBeschikbaarheid: kijkt in de echte agenda van Sjaak wanneer hij kan.
//
// Deze tool haalt data op en beslist niets. Hij geeft het model een korte lijst
// met momenten in gewone taal én de bijbehorende ISO-tijden, want die laatste
// heeft `boekAfspraak` nodig. Het model mag alleen momenten noemen die hier
// uitkomen: verzinnen wat "meestal wel kan" is precies waar een agenda voor
// een bezoeker onbetrouwbaar wordt.
//
// Tegelijk gaat de agenda open in de widget, zodat de bezoeker ook zelf kan
// klikken in plaats van het gesprek af te wachten.

import type Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

import { BOEKING_PROVIDER } from '@/components/booking/config';
import { HORIZON_DAGEN, haalSlots, omschrijfMoment } from '@/lib/booking/agenda';
import type { ToolUitvoer } from './types';

/** Hoeveel momenten we het model laten zien. Genoeg keuze, geen waslijst. */
const MAX_IN_ANTWOORD = 8;

export const CHECK_BESCHIKBAARHEID_DEFINITIE: Anthropic.Tool = {
  name: 'checkBeschikbaarheid',
  description:
    'Kijk in de agenda van Sjaak wanneer er ruimte is voor een kennismaking. Gebruik dit zodra ' +
    'de bezoeker wil weten wanneer Sjaak kan, of voordat je een afspraak boekt. Noem alleen ' +
    'momenten die deze tool teruggeeft en verzin er nooit zelf een bij. De agenda opent ' +
    'tegelijk in de widget, dus de bezoeker kan ook zelf klikken.',
  input_schema: {
    type: 'object',
    properties: {
      aanleiding: {
        type: 'string',
        description:
          'In één zin waar het gesprek over gaat, zodat het formulier in de widget alvast ' +
          'is ingevuld. Bijvoorbeeld "offertes maken bij een groothandel, loopt via Exact".',
      },
    },
    required: [],
    additionalProperties: false,
  },
};

const Invoer = z.object({ aanleiding: z.string().max(500).optional() });

export async function checkBeschikbaarheid(ruw: unknown): Promise<ToolUitvoer> {
  const parsed = Invoer.safeParse(ruw);
  const aanleiding = parsed.success ? parsed.data.aanleiding : undefined;

  if (BOEKING_PROVIDER !== 'teams') {
    // Met de Cal.com-agenda kunnen we niet in de agenda kijken; dan is het
    // enige eerlijke antwoord: laat de bezoeker zelf kiezen.
    return {
      voorModel:
        'De agenda staat nu open in de widget. Je kunt niet zien welke momenten vrij zijn, dus ' +
        'noem geen datum en geen tijdstip. Zeg dat de bezoeker zelf een moment kan kiezen.',
      signaal: { naam: 'agenda', payload: { aanleiding } },
    };
  }

  try {
    const slots = await haalSlots();
    if (slots.length === 0) {
      return {
        voorModel:
          `Er staat de komende ${HORIZON_DAGEN} dagen niets vrij in de agenda. Zeg dat eerlijk ` +
          'en bied aan om een notitie klaar te zetten of te mailen naar info@factumai.nl.',
      };
    }

    const getoond = slots.slice(0, MAX_IN_ANTWOORD);
    const regels = getoond.map((s) => `- ${omschrijfMoment(s.start)} (start=${s.start})`);

    return {
      voorModel:
        'Dit zijn de eerstvolgende vrije momenten:\n' +
        `${regels.join('\n')}\n\n` +
        'Noem er twee of drie, in gewone taal en zonder de start=-waarde. Vraag welk moment ' +
        'schikt. Wil de bezoeker er een? Vraag dan naam en mailadres en roep boekAfspraak aan ' +
        'met de start=-waarde die hier precies zo staat. De agenda staat ook open in de widget, ' +
        'dus de bezoeker kan het net zo goed zelf aanklikken.',
      signaal: { naam: 'agenda', payload: { aanleiding } },
    };
  } catch (err) {
    console.error(
      '[site-agent] beschikbaarheid ophalen faalde:',
      err instanceof Error ? err.message : err,
    );
    return {
      voorModel:
        'De agenda is nu niet bereikbaar, dus je weet niet welke momenten vrij zijn. Noem geen ' +
        'datum en geen tijdstip. Zeg dat het even niet lukt en bied aan om te mailen naar ' +
        'info@factumai.nl.',
    };
  }
}
