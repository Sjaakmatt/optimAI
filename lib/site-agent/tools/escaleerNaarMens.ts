// escaleerNaarMens: legt een vraag met gesprekscontext in de werkbak en stuurt
// een signaal naar het team.
//
// Dit is de tool die het gedrag van FactumAI zichtbaar maakt: de agent gokt
// niet naar een prijs, datum of toezegging maar zet de vraag door naar een
// mens. Het reviewitem is een taak, geen concept-mail: er staat nog geen
// antwoord in dat verstuurd kan worden.

import type Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

import { maskeerEmail } from '../events';
import { notificatieKanaal } from '../notify';
import { maakReviewItem } from './crm';
import type { ToolContext, ToolUitvoer } from './types';

export const ESCALEER_DEFINITIE: Anthropic.Tool = {
  name: 'escaleerNaarMens',
  description:
    'Leg een vraag voor aan een collega die jij niet mag of kunt beantwoorden: een prijs, een ' +
    'opleverdatum, een toezegging, of iets dat buiten je kennisbank valt. Roep dit aan nadat je ' +
    'tegen de bezoeker hebt gezegd dat je er niet naar wilt gokken. Geef het mailadres mee als je ' +
    'dat hebt. Er wordt niets naar de bezoeker verstuurd; een collega pakt het op.',
  input_schema: {
    type: 'object',
    properties: {
      vraag: { type: 'string', description: 'De vraag van de bezoeker, in zijn eigen woorden.' },
      context: {
        type: 'string',
        description: 'Wat je verder uit het gesprek weet en wat een collega nodig heeft om te antwoorden.',
      },
      email: { type: 'string', description: 'Mailadres van de bezoeker, als je dat hebt.' },
      urgentie: {
        type: 'string',
        enum: ['normaal', 'hoog'],
        description:
          'Gebruik hoog als dit een serieus gekwalificeerde bezoeker is: een herkenbaar proces, ' +
          'meerdere mensen erop, en een concrete aanleiding. Anders normaal.',
      },
    },
    required: ['vraag', 'context'],
    additionalProperties: false,
  },
};

const Invoer = z.object({
  vraag: z.string().min(1).max(2000),
  context: z.string().max(4000),
  email: z.string().email().max(160).optional(),
  urgentie: z.enum(['normaal', 'hoog']).optional(),
});

export async function escaleerNaarMens(ruw: unknown, ctx: ToolContext): Promise<ToolUitvoer> {
  const parsed = Invoer.safeParse(ruw);
  if (!parsed.success) {
    return { voorModel: 'De vraag is niet doorgezet: er ontbrak context. Formuleer de vraag opnieuw.' };
  }
  const invoer = parsed.data;
  const urgent = invoer.urgentie === 'hoog';

  const reviewId = await maakReviewItem({
    kind: 'site_agent_question',
    domain: 'chat',
    level: urgent ? 'ESCALATION' : 'REVIEW',
    summary: `Vraag uit de site-agent: ${invoer.vraag.slice(0, 160)}`,
    proposed: {
      vraag: invoer.vraag,
      context: invoer.context,
      email: invoer.email ?? null,
      paginaPad: ctx.paginaPad,
      bron: 'site-agent',
    },
    grounding: {
      conversatieId: ctx.conversatieId,
      leadId: ctx.leadId,
      transcript: ctx.transcript,
    },
  });

  // Direct signaal. Faalt het kanaal, dan staat het item nog steeds in de
  // werkbak: de escalatie gaat niet verloren omdat de mail hapert.
  const verstuurd = await notificatieKanaal().stuur({
    urgent,
    onderwerp: `Vraag uit de site-agent · ${invoer.vraag.slice(0, 80)}`,
    tekst:
      `Vraag: ${invoer.vraag}\n\n` +
      `Context: ${invoer.context}\n\n` +
      `Mailadres: ${maskeerEmail(invoer.email) ?? 'niet gegeven'}\n` +
      `Pagina: ${ctx.paginaPad}\n` +
      `Reviewitem: ${reviewId}\n` +
      `Gesprek: ${ctx.conversatieId}\n\n` +
      'Het volledige mailadres en transcript staan bij het reviewitem in de werkbak.',
  });

  return {
    voorModel:
      `De vraag staat in de werkbak (${reviewId})` +
      `${verstuurd ? ' en hij heeft een melding gekregen' : ''}. ` +
      'Zeg tegen de bezoeker dat hij een antwoord krijgt dat klopt, en gok zelf niets.',
  };
}
