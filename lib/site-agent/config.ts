// Aan/uit en het kostenplafond van de site-agent.
//
// De schakelaar staat standaard uit. Dat is bewust: de widget hangt in de
// root-layout, dus zonder schakelaar zou een merge naar main hem meteen op elke
// pagina zetten. Zet SITE_AGENT_ENABLED (server) en NEXT_PUBLIC_SITE_AGENT_ENABLED
// (widget) op 'true' om hem aan te zetten.
//
// Het kostenplafond is de tweede rem. Boven het plafond doet het endpoint geen
// modelcalls meer en verwijst het naar het contactformulier, tot de dagteller
// omslaat.

import { getServiceClient } from '@/lib/db/supabase';

export function siteAgentAan(): boolean {
  return process.env.SITE_AGENT_ENABLED === 'true';
}

/** Dagplafond in dollars over alle gesprekken samen. */
export const DAGPLAFOND_USD = Number(process.env.SITE_AGENT_DAGPLAFOND_USD ?? '5');

/**
 * Vanuit welke mailbox een goedgekeurde procesnotitie de deur uitgaat.
 *
 * Dit moet erbij. Laat je het weg, dan pakt de orchestrator zijn eigen
 * standaard — en die staat op `sjaak` (AIOS_MAIL_INSTANCE in wrangler.toml).
 * Een mail aan een websitebezoeker zou dan vanuit Sjaaks persoonlijke mailbox
 * vertrekken in plaats van de sales/info-box, terwijl de werkbak gewoon
 * "uitgevoerd" meldt. Precies die stille verwisseling is eerder al een keer
 * misgegaan.
 *
 * `default` is in het dashboard de instanceKey van "Sales/info mail".
 */
export const MAILBOX = process.env.SITE_AGENT_MAILBOX ?? 'default';

interface TellerRij {
  kostenUsd: string | number;
}

/**
 * Kijkt of het dagplafond is bereikt. Faalt de database, dan laten we door:
 * het endpoint zit al achter rate limiting, en een onbereikbare teller mag geen
 * reden zijn om de hele site-agent stil te leggen.
 */
export async function plafondBereikt(): Promise<boolean> {
  if (DAGPLAFOND_USD <= 0) return false;

  const db = getServiceClient();
  if (!db) return false;

  const dag = new Date().toISOString().slice(0, 10);
  const { data, error } = await db
    .from('SiteAgentCounter')
    .select('"kostenUsd"')
    .eq('soort', 'dagkosten')
    .eq('sleutel', dag)
    .maybeSingle<TellerRij>();

  if (error) {
    console.error('[site-agent] dagteller lezen faalde:', error.message);
    return false;
  }

  return data ? Number(data.kostenUsd) >= DAGPLAFOND_USD : false;
}

export const PLAFOND_MELDING =
  'De agent is voor vandaag even uit de lucht. Mail je vraag naar info@factumai.nl of plan ' +
  'direct een gesprek, dan pakt Sjaak het persoonlijk op.';
