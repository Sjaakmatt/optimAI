// GET /api/v1/site-agent/cron
//
// Twee taken die niemand anders doet:
//   1. Gesprekken afronden die vijftien minuten stil zijn (scoring + lead).
//   2. Opruimen wat over de retentietermijn heen is (90 dagen), plus de
//      verlopen tellers.
//
// Er is in deze repo nog geen retention-cron om aan te haken, dus dit is een
// losse endpoint met dezelfde conventie als de rest: bescherm hem met
// CRON_SECRET en hang hem aan de scheduler van Vercel.
//
// Aan de dashboardkant hoort dezelfde opruiming in de bestaande retention-cron
// te komen; zie docs/site-agent/opdracht-dashboard.md. Deze route is het vangnet
// zolang dat niet staat.

import { siteAgentAan } from '@/lib/site-agent/config';
import { haalStilleGesprekken, ruimVerlopenOp } from '@/lib/site-agent/db';
import { logEvent } from '@/lib/site-agent/events';
import { scoorGesprek } from '@/lib/site-agent/scoring';

export const runtime = 'nodejs';
export const maxDuration = 300;

const STIL_NA_MINUTEN = 15;
/** Bovengrens per run, zodat één cron-run niet urenlang doorscoort. */
const MAX_PER_RUN = 25;

function geautoriseerd(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;

  const header = request.headers.get('authorization');
  return header === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!geautoriseerd(request)) {
    return Response.json({ ok: false, error: 'Niet geautoriseerd' }, { status: 401 });
  }

  const resultaat = { afgerond: 0, mislukt: 0, opgeruimd: { gesprekken: 0, tellers: 0 } };

  // 1. Stille gesprekken afronden. De schakelaar telt hier ook: staat de agent
  //    uit, dan doen we geen modelcalls, maar opruimen blijft gewoon gebeuren.
  if (siteAgentAan()) {
    try {
      const stille = await haalStilleGesprekken(STIL_NA_MINUTEN, MAX_PER_RUN);
      for (const conversatie of stille) {
        try {
          await scoorGesprek(conversatie);
          resultaat.afgerond += 1;
        } catch (err) {
          resultaat.mislukt += 1;
          console.error('[site-agent] scoren van stil gesprek faalde:', err);
        }
      }
    } catch (err) {
      console.error('[site-agent] stille gesprekken ophalen faalde:', err);
    }
  }

  // 2. Retentie. Dit draait altijd, ook met de agent uit.
  try {
    resultaat.opgeruimd = await ruimVerlopenOp();
  } catch (err) {
    console.error('[site-agent] opruimen faalde:', err);
  }

  void logEvent({
    categorie: 'system',
    bericht:
      `Site-agent cron · ${resultaat.afgerond} afgerond, ${resultaat.mislukt} mislukt, ` +
      `${resultaat.opgeruimd.gesprekken} gesprekken en ${resultaat.opgeruimd.tellers} tellers opgeruimd`,
    metadata: resultaat as unknown as Record<string, unknown>,
  });

  return Response.json({ ok: true, ...resultaat });
}
