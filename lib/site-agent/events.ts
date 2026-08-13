// Eventlogging voor de site-agent, in de tabel AgentEvent van de
// dashboard-database. Zelfde conventie als de bestaande agents daar:
//
//   category  llm | llm_decision | compliance | user_action
//   type      info | warning | error
//   message   korte regel, leesbaar in de werkbak
//   metadata  jsonb met model, tokens, kosten en duur
//   expiresAt retentie
//
// De categorie `compliance` is nieuw: die gebruiken we voor treffers van de
// outputcontrole. Dat is de belangrijkste kwaliteitsmeting op de prompt, dus
// die moet apart te filteren zijn van gewone llm-events.
//
// Persoonsgegevens gaan hier niet in. De metadata bevat tellers, model-namen en
// beslissingen; geen berichtinhoud, geen mailadressen. E-mail wordt gemaskeerd
// met maskeerEmail() voor de gevallen waarin een adres onvermijdelijk is.

import { getServiceClient } from '@/lib/db/supabase';
import { nieuwId, SITE_AGENT_ORG_ID } from './db';

/** De Agent-rij van de site-agent in de dashboard-database. */
export const SITE_AGENT_ID = process.env.SITE_AGENT_AGENT_ID ?? 'cmsiteagent0000factumainl';
export const SITE_AGENT_SLUG = 'site-agent-factumai';

/**
 * Retentie op events. De RetentionPolicy in het dashboard staat voor AgentEvent
 * op 180 dagen; we volgen die. Staat er in docs/AGENT-INTEGRATION.md een kortere
 * TTL per categorie, pas dit dan daarop aan.
 */
export const EVENT_RETENTIE_DAGEN = Number(process.env.SITE_AGENT_EVENT_RETENTIE_DAGEN ?? '180');

export type EventCategorie = 'llm' | 'llm_decision' | 'compliance' | 'user_action';
export type EventType = 'info' | 'warning' | 'error';

export interface EventInvoer {
  categorie: EventCategorie;
  type?: EventType;
  bericht: string;
  metadata?: Record<string, unknown>;
}

/** Maskeert een mailadres zodat het herkenbaar blijft maar niet leesbaar is. */
export function maskeerEmail(email: string | null | undefined): string | null {
  if (!email) return null;
  const [lokaal, domein] = email.split('@');
  if (!domein) return '***';
  const zichtbaar = lokaal.slice(0, 2);
  return `${zichtbaar}${'*'.repeat(Math.max(1, lokaal.length - 2))}@${domein}`;
}

/**
 * Schrijft een event weg. Best-effort en met opzet niet-blokkerend: het
 * mislukken van een logregel mag een lopend gesprek nooit afbreken. Fouten gaan
 * naar de serverlog zodat ze wel zichtbaar blijven.
 */
export async function logEvent(invoer: EventInvoer): Promise<void> {
  const db = getServiceClient();
  if (!db) {
    console.info('[site-agent] geen Supabase-env, event niet gelogd:', invoer.bericht);
    return;
  }

  const verloopt = new Date(Date.now() + EVENT_RETENTIE_DAGEN * 24 * 60 * 60 * 1000);

  try {
    const { error } = await db.from('AgentEvent').insert({
      id: nieuwId(),
      agentId: SITE_AGENT_ID,
      agentSlug: SITE_AGENT_SLUG,
      orgId: SITE_AGENT_ORG_ID,
      category: invoer.categorie,
      type: invoer.type ?? 'info',
      message: invoer.bericht.slice(0, 500),
      metadata: invoer.metadata ?? null,
      expiresAt: verloopt.toISOString(),
      audit: false,
    });
    if (error) console.error('[site-agent] event loggen faalde:', error.message);
  } catch (err) {
    console.error('[site-agent] event loggen exception:', err);
  }
}
