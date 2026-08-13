// maakLead: schrijft of werkt de lead bij in het CRM. Geen review nodig, want
// er gaat niets naar buiten; dit is interne vastlegging.
//
// Idempotent per gesprek. Hangt er al een lead aan de conversatie, dan werken
// we die bij in plaats van een tweede aan te maken. Is er nog geen lead maar
// wel een mailadres, dan zoeken we eerst of die persoon al in het CRM staat en
// koppelen we daaraan, met een interactie erbij zodat zichtbaar is dat er
// opnieuw contact was.

import type Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

import { werkConversatieBij } from '../db';
import { maakInteractie, maakLeadAan, werkLeadBij, zoekLeadOpEmail } from './crm';
import type { ToolContext, ToolUitvoer } from './types';

export const MAAK_LEAD_DEFINITIE: Anthropic.Tool = {
  name: 'maakLead',
  description:
    'Leg dit gesprek vast als lead in het CRM van FactumAI. Roep dit aan zodra je weet welk ' +
    'bedrijf of welke persoon je spreekt, en in elk geval aan het eind van elk gesprek, ook als ' +
    'de bezoeker niet gekwalificeerd is. Herhaald aanroepen is veilig: het werkt de bestaande ' +
    'lead bij in plaats van een tweede aan te maken. Deze tool verstuurt niets naar de bezoeker.',
  input_schema: {
    type: 'object',
    properties: {
      bedrijfsnaam: {
        type: 'string',
        description:
          'Naam van het bedrijf. Weet je die niet, gebruik dan een korte omschrijving zoals ' +
          '"onbekend, groothandel".',
      },
      contactNaam: { type: 'string', description: 'Naam van de persoon, als die genoemd is.' },
      contactEmail: { type: 'string', description: 'Mailadres, alleen als de bezoeker het zelf gaf.' },
      contactTelefoon: { type: 'string', description: 'Telefoonnummer, alleen als het gegeven is.' },
      websiteUrl: { type: 'string', description: 'Website van het bedrijf, als die genoemd is.' },
      samenvatting: {
        type: 'string',
        description:
          'Twee tot vier zinnen: welk proces knelt, hoeveel mensen en tijd, welke systemen, en ' +
          'wat er eerder is geprobeerd. Schrijf feitelijk en zonder cijfers die je niet hebt gehoord.',
      },
      vervolgactie: {
        type: 'string',
        description: 'Wat de eerstvolgende stap zou moeten zijn, in één zin.',
      },
    },
    required: ['bedrijfsnaam', 'samenvatting'],
    additionalProperties: false,
  },
};

const Invoer = z.object({
  bedrijfsnaam: z.string().min(1).max(160),
  contactNaam: z.string().max(120).optional(),
  contactEmail: z.string().email().max(160).optional(),
  contactTelefoon: z.string().max(40).optional(),
  websiteUrl: z.string().max(300).optional(),
  samenvatting: z.string().max(4000),
  vervolgactie: z.string().max(500).optional(),
});

export async function maakLead(ruw: unknown, ctx: ToolContext): Promise<ToolUitvoer> {
  const parsed = Invoer.safeParse(ruw);
  if (!parsed.success) {
    return {
      voorModel:
        'De lead is niet vastgelegd: de gegevens waren onvolledig. Vraag de bedrijfsnaam nog ' +
        'even na en probeer het opnieuw.',
    };
  }
  const invoer = parsed.data;

  const velden = {
    bedrijfsnaam: invoer.bedrijfsnaam,
    contactNaam: invoer.contactNaam ?? null,
    contactEmail: invoer.contactEmail ?? null,
    contactTelefoon: invoer.contactTelefoon ?? null,
    websiteUrl: invoer.websiteUrl ?? null,
    nextStepSuggestion: invoer.vervolgactie ?? null,
  };

  // 1. Hangt er al een lead aan dit gesprek, dan bijwerken.
  if (ctx.leadId) {
    await werkLeadBij(ctx.leadId, velden);
    return { voorModel: 'De lead is bijgewerkt in het CRM.', leadId: ctx.leadId };
  }

  // 2. Bestaat deze persoon al in het CRM, dan koppelen in plaats van dupliceren.
  if (invoer.contactEmail) {
    const bestaand = await zoekLeadOpEmail(invoer.contactEmail);
    if (bestaand) {
      await werkLeadBij(bestaand.id, velden);
      await maakInteractie({
        leadId: bestaand.id,
        subject: `Gesprek met de site-agent op ${ctx.paginaPad}`,
        body: invoer.samenvatting,
      });
      await werkConversatieBij(ctx.conversatieId, { leadId: bestaand.id });
      return {
        voorModel:
          'Deze persoon stond al in het CRM. Het gesprek is aan die bestaande lead gekoppeld.',
        leadId: bestaand.id,
      };
    }
  }

  // 3. Nieuwe lead.
  const leadId = await maakLeadAan(velden);
  await maakInteractie({
    leadId,
    subject: `Gesprek met de site-agent op ${ctx.paginaPad}`,
    body: invoer.samenvatting,
  });
  await werkConversatieBij(ctx.conversatieId, { leadId });

  return { voorModel: 'De lead is aangemaakt in het CRM.', leadId };
}
