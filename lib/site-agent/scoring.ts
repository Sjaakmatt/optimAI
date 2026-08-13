// Scoring na afloop van een gesprek. Aparte call met claude-haiku-4-5 op het
// transcript, met een JSON-schema als uitvoerformaat zodat er geen vrije tekst
// terugkomt die we alsnog moeten uitpakken.
//
// Wat er wél in het event komt: de beslissing en de onderbouwing. Niet de
// volledige prompt en niet de brontekst; die staan al bij het gesprek zelf.

import Anthropic from '@anthropic-ai/sdk';

import { berekenKosten, SITE_AGENT_SCORE_MODEL } from './prompt';
import { logEvent } from './events';
import { haalBerichten, werkConversatieBij, type Conversatie, type LeadScore } from './db';
import { maakInteractie, maakLeadAan, werkLeadBij, zoekLeadOpEmail } from './tools/crm';

const SCORING_PROMPT = `Je krijgt een transcript van een gesprek op factumai.nl. Beoordeel de lead volgens het kwalificatieraamwerk van FactumAI. Antwoord uitsluitend met JSON, zonder toelichting en zonder markdown.

HOT: duidelijk herkenbaar proces dat een agent kan overnemen, bedrijf van betekenisvolle omvang met meerdere mensen op dat proces, compleet contactprofiel of warme introductie, en een aanwijsbare pijn in plaats van nieuwsgierigheid.
WARM: redelijk potentieel maar incomplete signalen, nog onduidelijk welk proces knelt, of contact loopt zonder concrete aanleiding.
COLD: nauwelijks automatiseerbare processen, geen personeel, koude bron zonder aanleiding, of te weinig informatie om waarde in te schatten.

Weinig informatie is zelf een reden voor WARM of COLD. Speculeer niet dat het wel goed zit. Vul een veld met null als het niet in het transcript staat. Verzin niets.`;

const SCHEMA = {
  type: 'object',
  properties: {
    score: { type: 'string', enum: ['HOT', 'WARM', 'COLD'] },
    onderbouwing: {
      type: 'string',
      description: 'Maximaal 2 zinnen, verwijzend naar wat er letterlijk is gezegd.',
    },
    proces: { type: ['string', 'null'] },
    omvangIndicatie: { type: ['string', 'null'] },
    tijdsbeslag: { type: ['string', 'null'] },
    systemen: { type: 'array', items: { type: 'string' } },
    eerdereTeleurstelling: { type: ['string', 'null'] },
    bezwaren: { type: 'array', items: { type: 'string' } },
    afspraakGeboekt: { type: 'boolean' },
    contact: {
      type: 'object',
      properties: {
        naam: { type: ['string', 'null'] },
        email: { type: ['string', 'null'] },
        bedrijf: { type: ['string', 'null'] },
      },
      required: ['naam', 'email', 'bedrijf'],
      additionalProperties: false,
    },
    voorgesteldeVervolgactie: { type: 'string' },
  },
  required: [
    'score',
    'onderbouwing',
    'proces',
    'omvangIndicatie',
    'tijdsbeslag',
    'systemen',
    'eerdereTeleurstelling',
    'bezwaren',
    'afspraakGeboekt',
    'contact',
    'voorgesteldeVervolgactie',
  ],
  additionalProperties: false,
} as const;

export interface Beoordeling {
  score: LeadScore;
  onderbouwing: string;
  proces: string | null;
  omvangIndicatie: string | null;
  tijdsbeslag: string | null;
  systemen: string[];
  eerdereTeleurstelling: string | null;
  bezwaren: string[];
  afspraakGeboekt: boolean;
  contact: { naam: string | null; email: string | null; bedrijf: string | null };
  voorgesteldeVervolgactie: string;
}

let clientCache: Anthropic | null = null;
function anthropic(): Anthropic {
  if (!clientCache) clientCache = new Anthropic();
  return clientCache;
}

function isBeoordeling(waarde: unknown): waarde is Beoordeling {
  if (typeof waarde !== 'object' || waarde === null) return false;
  const o = waarde as Record<string, unknown>;
  return (
    (o.score === 'HOT' || o.score === 'WARM' || o.score === 'COLD') &&
    typeof o.onderbouwing === 'string' &&
    typeof o.contact === 'object' &&
    o.contact !== null
  );
}

/** Bouwt een samenvatting die Sjaak kan lezen zonder het transcript erbij. */
function bouwSamenvatting(b: Beoordeling): string {
  const regels = [
    b.proces ? `Proces: ${b.proces}` : null,
    b.omvangIndicatie ? `Omvang: ${b.omvangIndicatie}` : null,
    b.tijdsbeslag ? `Tijdsbeslag: ${b.tijdsbeslag}` : null,
    b.systemen.length > 0 ? `Systemen: ${b.systemen.join(', ')}` : null,
    b.eerdereTeleurstelling ? `Eerder geprobeerd: ${b.eerdereTeleurstelling}` : null,
    b.bezwaren.length > 0 ? `Bezwaren: ${b.bezwaren.join('; ')}` : null,
    `Vervolgactie: ${b.voorgesteldeVervolgactie}`,
  ].filter(Boolean);
  return regels.join('\n');
}

/**
 * Beoordeelt het gesprek en schrijft het resultaat weg op de conversatie en op
 * de lead. Roept maakLead-gedrag aan als er nog geen lead hangt, ook bij COLD:
 * een afgewezen gesprek is ook informatie.
 */
export async function scoorGesprek(conversatie: Conversatie): Promise<Beoordeling | null> {
  const berichten = await haalBerichten(conversatie.id);
  if (berichten.length === 0) return null;

  const transcript = berichten
    .map((b) => `${b.rol === 'user' ? 'Bezoeker' : 'Agent'}: ${b.inhoud}`)
    .join('\n');

  const start = Date.now();
  const antwoord = await anthropic().messages.create({
    model: SITE_AGENT_SCORE_MODEL,
    max_tokens: 1500,
    system: SCORING_PROMPT,
    output_config: { format: { type: 'json_schema', schema: SCHEMA as unknown as Record<string, unknown> } },
    messages: [
      {
        role: 'user',
        content:
          `Pagina waar het gesprek begon: ${conversatie.paginaPad}\n` +
          `Afspraak geboekt volgens de widget: ${conversatie.afspraakGeboekt ? 'ja' : 'nee'}\n\n` +
          `TRANSCRIPT\n${transcript}`,
      },
    ],
  });

  const tekst = antwoord.content.find((blok) => blok.type === 'text');
  if (!tekst || tekst.type !== 'text') return null;

  let beoordeling: unknown;
  try {
    beoordeling = JSON.parse(tekst.text);
  } catch {
    console.error('[site-agent] scoring gaf geen geldige JSON');
    return null;
  }
  if (!isBeoordeling(beoordeling)) {
    console.error('[site-agent] scoring miste verplichte velden');
    return null;
  }

  const samenvatting = bouwSamenvatting(beoordeling);

  await werkConversatieBij(conversatie.id, {
    status: 'AFGEROND',
    score: beoordeling.score,
    scoreReason: beoordeling.onderbouwing,
    samenvatting,
  });

  // Lead vastleggen of bijwerken. Altijd, ook bij COLD.
  const leadVelden = {
    bedrijfsnaam: beoordeling.contact.bedrijf ?? beoordeling.proces ?? 'Onbekend, via site-agent',
    contactNaam: beoordeling.contact.naam,
    contactEmail: beoordeling.contact.email,
    score: beoordeling.score,
    scoreReason: beoordeling.onderbouwing,
    nextStepSuggestion: beoordeling.voorgesteldeVervolgactie,
  };

  try {
    if (conversatie.leadId) {
      await werkLeadBij(conversatie.leadId, leadVelden);
    } else {
      const bestaand = beoordeling.contact.email
        ? await zoekLeadOpEmail(beoordeling.contact.email)
        : null;
      const leadId = bestaand ? bestaand.id : await maakLeadAan(leadVelden);
      if (bestaand) await werkLeadBij(leadId, leadVelden);
      await maakInteractie({
        leadId,
        subject: `Gesprek met de site-agent op ${conversatie.paginaPad}`,
        body: samenvatting,
      });
      await werkConversatieBij(conversatie.id, { leadId });
    }
  } catch (err) {
    // De scoring zelf is gelukt; de CRM-schrijfactie niet. Dat mag de
    // afronding niet ongedaan maken.
    console.error('[site-agent] lead bijwerken na scoring faalde:', err);
  }

  const kosten = berekenKosten({
    invoer: antwoord.usage.input_tokens ?? 0,
    uitvoer: antwoord.usage.output_tokens ?? 0,
    cacheGelezen: antwoord.usage.cache_read_input_tokens ?? 0,
    cacheGeschreven: antwoord.usage.cache_creation_input_tokens ?? 0,
  });

  // Alleen de beslissing en de redenering, geen prompt en geen brontekst.
  void logEvent({
    categorie: 'llm_decision',
    bericht: `Lead beoordeeld als ${beoordeling.score}`,
    metadata: {
      model: SITE_AGENT_SCORE_MODEL,
      conversatie_id: conversatie.id,
      score: beoordeling.score,
      onderbouwing: beoordeling.onderbouwing,
      proces: beoordeling.proces,
      systemen: beoordeling.systemen,
      bezwaren: beoordeling.bezwaren,
      afspraak_geboekt: beoordeling.afspraakGeboekt,
      duration_ms: Date.now() - start,
      input_tokens: antwoord.usage.input_tokens ?? 0,
      output_tokens: antwoord.usage.output_tokens ?? 0,
      cost_usd: Number(kosten.toFixed(6)),
    },
  });

  return beoordeling;
}
