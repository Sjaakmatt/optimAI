import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Server-only Supabase-client voor de FactumAI-dashboard database.
 *
 * Gebruikt de service-role key: die omzeilt RLS en mag daarom NOOIT naar
 * de client lekken. Alle aanroepen gebeuren in API-routes / server code.
 * Ontbreekt de env, dan geeft dit null terug en degradeert de aanroeper
 * netjes (de scan blijft werken, opslag wordt overgeslagen).
 */

let cached: SupabaseClient | null | undefined;

export function getServiceClient(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    cached = null;
    return null;
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
