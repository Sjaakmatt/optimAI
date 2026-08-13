// Aan/uit en het kostenplafond van de site-agent.
//
// De agent staat aan. Uitzetten kan met SITE_AGENT_ENABLED=false (server) en
// NEXT_PUBLIC_SITE_AGENT_ENABLED=false (widget); dat is de noodrem als er iets
// misgaat, en hij werkt zonder code te wijzigen.
//
// Let op bij het uitzetten: NEXT_PUBLIC_-variabelen worden bij de build in de
// bundel gebakken, dus alleen de waarde omzetten is niet genoeg. Er moet een
// nieuwe deploy overheen voordat de widget verdwijnt. De servervariabele werkt
// wel direct: het endpoint weigert dan meteen, dus de kosten stoppen ook zonder
// nieuwe build.
//
// Het kostenplafond is de tweede rem. Boven het plafond doet het endpoint geen
// modelcalls meer en verwijst het naar het contactformulier, tot de dagteller
// omslaat.

import { getServiceClient } from '@/lib/db/supabase';

export function siteAgentAan(): boolean {
  return process.env.SITE_AGENT_ENABLED !== 'false';
}

/** Dagplafond in dollars over alle gesprekken samen. */
export const DAGPLAFOND_USD = Number(process.env.SITE_AGENT_DAGPLAFOND_USD ?? '5');

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
