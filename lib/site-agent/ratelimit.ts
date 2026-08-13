// Rate limiting voor het publieke chat-endpoint.
//
// Dit endpoint zet bij elk bericht een betaalde API-call in gang, dus de
// begrenzing gaat vóór alles wat geld kost. De tellers staan in de database
// (SiteAgentCounter) en worden atomair opgehoogd via de functie
// site_agent_tel: in-memory tellers werken op serverless per instance en zijn
// daarmee geen echte rem, zoals de bestaande scan-routes ook laten zien.
//
// Faalt de database, dan weigeren we het verzoek. Dat is de veilige kant: geen
// telling betekent geen zicht op misbruik, en dan is dichtgaan beter dan
// doorlaten.

import { createHash } from 'node:crypto';
import { getServiceClient } from '@/lib/db/supabase';

export const LIMIET_SESSIE_BERICHTEN = Number(process.env.SITE_AGENT_LIMIET_SESSIE ?? '10');
export const VENSTER_SESSIE_SECONDEN = 10 * 60;

export const LIMIET_IP_BERICHTEN = Number(process.env.SITE_AGENT_LIMIET_IP ?? '40');
export const VENSTER_IP_SECONDEN = 60 * 60;

export interface LimietResultaat {
  toegestaan: boolean;
  /** Nederlandse melding voor de bezoeker; alleen gevuld als het niet mag. */
  melding?: string;
}

interface TellerRij {
  aantal: number;
  kostenUsd: string | number;
}

/** IP's slaan we gehasht op: voor een teller is de identiteit niet nodig. */
export function hashIp(ip: string): string {
  const zout = process.env.SITE_AGENT_IP_ZOUT ?? 'factumai-site-agent';
  return createHash('sha256').update(`${zout}:${ip}`).digest('hex').slice(0, 32);
}

/** Begin van het huidige venster, zodat gelijktijdige verzoeken dezelfde rij raken. */
function vensterStart(seconden: number): Date {
  const ms = seconden * 1000;
  return new Date(Math.floor(Date.now() / ms) * ms);
}

async function hoogOp(
  soort: string,
  sleutel: string,
  vensterSeconden: number,
  aantal = 1,
  kosten = 0,
): Promise<number | null> {
  const db = getServiceClient();
  if (!db) return null;

  const { data, error } = await db.rpc('site_agent_tel', {
    p_soort: soort,
    p_sleutel: sleutel,
    p_venster: vensterStart(vensterSeconden).toISOString(),
    p_ttl_seconden: vensterSeconden * 2,
    p_aantal: aantal,
    p_kosten: kosten,
  });

  if (error) {
    console.error('[site-agent] teller ophogen faalde:', error.message);
    return null;
  }

  const rijen = data as TellerRij[] | null;
  return rijen && rijen.length > 0 ? rijen[0].aantal : null;
}

/**
 * Hoogt de tellers op en zegt of dit bericht door mag. Wordt aangeroepen
 * voordat er iets naar Anthropic gaat.
 */
export async function controleerLimieten(invoer: {
  sessionId: string;
  ip: string;
}): Promise<LimietResultaat> {
  const perSessie = await hoogOp('sessie', invoer.sessionId, VENSTER_SESSIE_SECONDEN);
  if (perSessie === null) {
    return {
      toegestaan: false,
      melding:
        'Ik kan je bericht nu even niet verwerken. Probeer het zo nog eens, of mail ons op info@factumai.nl.',
    };
  }
  if (perSessie > LIMIET_SESSIE_BERICHTEN) {
    return {
      toegestaan: false,
      melding:
        'Je hebt in korte tijd veel berichten gestuurd. Neem even pauze, of mail direct naar info@factumai.nl.',
    };
  }

  const perIp = await hoogOp('ip', hashIp(invoer.ip), VENSTER_IP_SECONDEN);
  if (perIp !== null && perIp > LIMIET_IP_BERICHTEN) {
    return {
      toegestaan: false,
      melding:
        'Er zijn vanaf dit netwerk veel berichten gestuurd. Probeer het later opnieuw, of mail naar info@factumai.nl.',
    };
  }

  return { toegestaan: true };
}

/** Telt de kosten van een gesprek mee in de dagteller, voor het kostenplafond. */
export async function boekKosten(kostenUsd: number): Promise<void> {
  const dag = new Date().toISOString().slice(0, 10);
  await hoogOp('dagkosten', dag, 24 * 60 * 60, 1, kostenUsd);
}
