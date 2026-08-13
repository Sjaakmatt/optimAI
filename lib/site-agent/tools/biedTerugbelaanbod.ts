// biedTerugbelaanbod: geeft de widget het signaal om de ja/nee-keuze te tonen.
//
// Deze tool schrijft niets weg. Dat is het punt: de agent bepaalt wánneer het
// aanbod komt, maar het ophalen van mailadres, telefoonnummer en toestemming
// gebeurt in de widget en gaat langs /api/v1/site-agent/terugbelverzoek.
//
// Waarom niet gewoon in de chat uitvragen:
//   - De toestemmingstekst moet vast en aantoonbaar zijn. Laat je het model
//     formuleren, dan belooft hij elk gesprek net iets anders en kun je achteraf
//     niet hard maken waar iemand ja op zei.
//   - Een telefoonnummer dat via vrije tekst binnenkomt, valideert niemand.
//   - Alles wat het model niet aanraakt, hoeft de outputcontrole ook niet te
//     bewaken.

import type Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

import type { ToolUitvoer } from './types';

export const BIED_TERUGBELAANBOD_DEFINITIE: Anthropic.Tool = {
  name: 'biedTerugbelaanbod',
  description:
    'Toon de bezoeker een ja/nee-keuze of we hem mogen terugbellen. Roep dit aan zodra je ' +
    'merkt dat er echte interesse is: hij beschrijft een proces dat knelt, vraagt door over de ' +
    'aanpak, of zegt dat dit bij hem speelt. Dit is je eerste afsluiting — pas als de bezoeker ' +
    'liever zelf een moment kiest, gebruik je boekAfspraak. Vraag zelf niet om een mailadres of ' +
    'telefoonnummer: de widget vraagt die, samen met de toestemming. Roep dit maximaal twee ' +
    'keer per gesprek aan.',
  input_schema: {
    type: 'object',
    properties: {
      aanleiding: {
        type: 'string',
        description:
          'In één zin waarover gebeld zou worden, in de woorden van de bezoeker. Bijvoorbeeld ' +
          '"orders overtypen uit Outlook naar Exact". Dit komt in de werkbak te staan.',
      },
    },
    required: ['aanleiding'],
    additionalProperties: false,
  },
};

const Invoer = z.object({ aanleiding: z.string().max(500) });

// Geen ToolContext-parameter: deze tool raakt de database niet. Het gesprek
// komt pas in beeld bij het endpoint, als de bezoeker het formulier invult.
export async function biedTerugbelaanbod(ruw: unknown): Promise<ToolUitvoer> {
  const parsed = Invoer.safeParse(ruw);
  const aanleiding = parsed.success ? parsed.data.aanleiding : '';

  return {
    voorModel:
      'De ja/nee-keuze staat nu in de widget. Zeg er kort iets bij en wacht af — vraag niet ' +
      'zelf om een mailadres of telefoonnummer, en noem geen termijn waarop er gebeld wordt.',
    signaal: { naam: 'terugbellen', payload: { aanleiding } },
  };
}
