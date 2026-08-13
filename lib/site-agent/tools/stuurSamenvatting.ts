// stuurSamenvatting: zet de procesnotitie als concept klaar in de werkbak.
//
// Deze tool verstuurt niets. Hij maakt een ReviewItem met kind draft_email en
// status PENDING; een mens keurt goed voordat er iets naar de bezoeker gaat.
// Dat is de kern van de demonstratie, dus de agent moet dat ook hardop zeggen
// tegen de bezoeker en niet wegmoffelen.

import type Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

import { MAILBOX } from '../config';
import { maakReviewItem } from './crm';
import type { ToolContext, ToolUitvoer } from './types';

export const STUUR_SAMENVATTING_DEFINITIE: Anthropic.Tool = {
  name: 'stuurSamenvatting',
  description:
    'Zet een korte procesnotitie klaar voor de bezoeker: wat je uit het gesprek haalt over zijn ' +
    'proces, en wat daar wel en niet automatiseerbaar aan is. Gebruik dit als de bezoeker geen ' +
    'afspraak wil maar wel een mailadres geeft. De notitie wordt NIET verstuurd: hij komt als ' +
    'concept in de reviewwachtrij en een collega kijkt er eerst overheen. Zeg dat er ook bij tegen de ' +
    'bezoeker. Zet geen bedragen, doorlooptijden of besparingscijfers in de notitie.',
  input_schema: {
    type: 'object',
    properties: {
      email: { type: 'string', description: 'Het mailadres dat de bezoeker zelf heeft gegeven.' },
      onderwerp: { type: 'string', description: 'Onderwerpregel van de mail, kort en concreet.' },
      notitie: {
        type: 'string',
        description:
          'De procesnotitie zelf, in de je-vorm en in de toon van FactumAI. Beschrijf het proces ' +
          'zoals de bezoeker het vertelde, wat daarvan een agent kan overnemen en wat niet, en ' +
          'wat de logische eerste stap is. Geen bedragen, geen doorlooptijden, geen percentages.',
      },
    },
    required: ['email', 'onderwerp', 'notitie'],
    additionalProperties: false,
  },
};

const Invoer = z.object({
  email: z.string().email().max(160),
  onderwerp: z.string().min(1).max(200),
  notitie: z.string().min(1).max(6000),
});

export async function stuurSamenvatting(ruw: unknown, ctx: ToolContext): Promise<ToolUitvoer> {
  const parsed = Invoer.safeParse(ruw);
  if (!parsed.success) {
    return {
      voorModel:
        'De notitie is niet klaargezet: het mailadres of de tekst ontbrak. Vraag het mailadres ' +
        'nog een keer na.',
    };
  }
  const invoer = parsed.data;

  const reviewId = await maakReviewItem({
    kind: 'draft_email',
    domain: 'mail',
    level: 'REVIEW',
    summary: `Procesnotitie voor ${invoer.email} · ${invoer.onderwerp}`,
    proposed: {
      to: invoer.email,
      subject: invoer.onderwerp,
      body: invoer.notitie,
      // Zonder mailbox valt de orchestrator terug op zijn org-brede standaard
      // (`sjaak`) en vertrekt de mail vanaf het verkeerde adres. Zie MAILBOX.
      mailbox: MAILBOX,
      bron: 'site-agent',
    },
    grounding: {
      conversatieId: ctx.conversatieId,
      paginaPad: ctx.paginaPad,
      leadId: ctx.leadId,
      transcript: ctx.transcript,
    },
  });

  return {
    voorModel:
      `De procesnotitie staat als concept in de werkbak (${reviewId}). Er is niets verstuurd. ` +
      'Zeg tegen de bezoeker dat een collega er eerst overheen kijkt en dat dat bij FactumAI standaard is.',
  };
}
