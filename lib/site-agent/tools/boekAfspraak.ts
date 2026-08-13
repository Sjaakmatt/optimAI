// boekAfspraak: geeft de widget het signaal om de agenda te tonen.
//
// Er zit geen eigen agendakoppeling in deze repo en die verzin ik ook niet. Wat
// er wél is, is de Cal.com-embed (components/booking) plus een geverifieerde
// webhook op /api/cal-webhook die de bevestigingsmail stuurt. Deze tool sluit
// daarop aan: hij geeft de boekingslink terug en zet een signaal klaar waarmee
// de widget de bestaande Cal-popup opent.
//
// Wat hier nog niet dichtligt: de Cal-webhook kent het sessionId niet, dus de
// koppeling tussen een geboekte afspraak en dit gesprek leunt op het signaal
// vanuit de widget. Zie docs/site-agent/README.md; een harde koppeling via een
// prefill-parameter in Cal is een aparte opdracht.

import type Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

import { werkConversatieBij } from '../db';
import type { ToolContext, ToolUitvoer } from './types';

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? 'sjaak-factumai/kennismaking';

export const BOEK_AFSPRAAK_DEFINITIE: Anthropic.Tool = {
  name: 'boekAfspraak',
  description:
    'Toon de agenda van Sjaak in de widget zodat de bezoeker zelf een moment kiest voor een ' +
    'kennismaking van 20 minuten. Roep dit pas aan als de bezoeker ja heeft gezegd op de vraag ' +
    'of je zal kijken wanneer Sjaak kan. Vraag daarna niet ook nog om een mailadres: de agenda ' +
    'vraagt dat zelf.',
  input_schema: {
    type: 'object',
    properties: {
      aanleiding: {
        type: 'string',
        description:
          'In één zin waar het gesprek over gaat, zodat Sjaak voorbereid is. Bijvoorbeeld ' +
          '"offertes maken bij een groothandel, loopt via Exact en Outlook".',
      },
    },
    required: ['aanleiding'],
    additionalProperties: false,
  },
};

const Invoer = z.object({ aanleiding: z.string().max(500) });

export async function boekAfspraak(ruw: unknown, ctx: ToolContext): Promise<ToolUitvoer> {
  const parsed = Invoer.safeParse(ruw);
  const aanleiding = parsed.success ? parsed.data.aanleiding : '';

  await werkConversatieBij(ctx.conversatieId, { afspraakGeboekt: true });

  return {
    voorModel:
      'De agenda staat nu open in de widget. Zeg kort dat de bezoeker een moment kan kiezen en ' +
      'dat hij daarna een bevestiging krijgt. Noem geen datum en geen tijdstip.',
    signaal: { naam: 'agenda', payload: { calLink: CAL_LINK, aanleiding } },
    afspraakGeboekt: true,
  };
}
