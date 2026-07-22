// Opslag van scan-leads in de FactumAI-dashboard database (tabel ScanLead).
//
// Alle functies zijn best-effort: ze loggen bij een fout maar gooien nooit,
// zodat de scan- en rapport-flow blijven werken ook als de database (even)
// niet bereikbaar is of de env ontbreekt.

import { getServiceClient } from '@/lib/db/supabase';
import type { ScanAnalysis } from './types';

const TABLE = 'ScanLead';

/** Sla de start van een scan op (bedrijfsnaam + website, nog geen e-mail). */
export async function saveScanStart(input: {
  website: string;
  bedrijfsnaam?: string;
  ip?: string;
  userAgent?: string;
}): Promise<void> {
  const db = getServiceClient();
  if (!db) {
    console.info('[scan-lead] geen Supabase-env, scan-start niet opgeslagen');
    return;
  }
  try {
    const { error } = await db.from(TABLE).insert({
      website: input.website,
      bedrijfsnaam: input.bedrijfsnaam || null,
      stage: 'scan_started',
      ip: input.ip || null,
      user_agent: input.userAgent || null,
    });
    if (error) console.error('[scan-lead] insert scan-start faalde:', error.message);
  } catch (err) {
    console.error('[scan-lead] insert scan-start exception:', err);
  }
}

/** Verrijk de meest recente lead van deze website met het scan-resultaat. */
export async function attachScanResult(input: {
  website: string;
  bedrijfsnaam?: string;
  analysis: ScanAnalysis;
}): Promise<void> {
  const db = getServiceClient();
  if (!db) return;
  try {
    const { data, error: selErr } = await db
      .from(TABLE)
      .select('id')
      .eq('website', input.website)
      .eq('stage', 'scan_started')
      .order('created_at', { ascending: false })
      .limit(1);
    if (selErr) {
      console.error('[scan-lead] select voor verrijking faalde:', selErr.message);
      return;
    }

    const patch = {
      bedrijfsnaam: input.bedrijfsnaam || null,
      score: input.analysis.score,
      label: input.analysis.label,
      analysis: input.analysis as unknown as Record<string, unknown>,
      updated_at: new Date().toISOString(),
    };

    if (data && data.length > 0) {
      const { error } = await db.from(TABLE).update(patch).eq('id', data[0].id);
      if (error) console.error('[scan-lead] update resultaat faalde:', error.message);
    } else {
      // Geen scan-start-rij gevonden (bv. env kwam later): alsnog vastleggen.
      const { error } = await db
        .from(TABLE)
        .insert({ website: input.website, stage: 'scan_started', ...patch });
      if (error) console.error('[scan-lead] fallback-insert resultaat faalde:', error.message);
    }
  } catch (err) {
    console.error('[scan-lead] attachScanResult exception:', err);
  }
}

/**
 * Leg de rapportaanvraag vast: e-mail + marketing-consent (met tijdstip en
 * de exacte tekst als audit trail). Werkt de bestaande lead bij of maakt er
 * een aan als die er niet is.
 */
export async function saveReportRequest(input: {
  website: string;
  bedrijfsnaam?: string;
  email: string;
  consentMarketing: boolean;
  consentText: string;
  analysis?: ScanAnalysis;
}): Promise<void> {
  const db = getServiceClient();
  if (!db) {
    console.info('[scan-lead] geen Supabase-env, rapportaanvraag niet opgeslagen');
    return;
  }
  const now = new Date().toISOString();
  const patch: Record<string, unknown> = {
    email: input.email,
    bedrijfsnaam: input.bedrijfsnaam || null,
    consent_marketing: input.consentMarketing,
    consent_at: input.consentMarketing ? now : null,
    consent_text: input.consentText,
    stage: 'report_requested',
    updated_at: now,
  };
  if (input.analysis) {
    patch.score = input.analysis.score;
    patch.label = input.analysis.label;
    patch.analysis = input.analysis as unknown as Record<string, unknown>;
  }

  try {
    const { data, error: selErr } = await db
      .from(TABLE)
      .select('id')
      .eq('website', input.website)
      .order('created_at', { ascending: false })
      .limit(1);
    if (selErr) {
      console.error('[scan-lead] select voor rapport faalde:', selErr.message);
      return;
    }
    if (data && data.length > 0) {
      const { error } = await db.from(TABLE).update(patch).eq('id', data[0].id);
      if (error) console.error('[scan-lead] update rapport faalde:', error.message);
    } else {
      const { error } = await db.from(TABLE).insert({ website: input.website, ...patch });
      if (error) console.error('[scan-lead] insert rapport faalde:', error.message);
    }
  } catch (err) {
    console.error('[scan-lead] saveReportRequest exception:', err);
  }
}
