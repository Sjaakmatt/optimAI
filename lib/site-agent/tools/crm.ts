// Schrijftoegang tot het CRM in de dashboard-database, via de service-role
// client. Geen LLM hierin: deze functies halen data of leggen iets vast, de
// agent beslist.
//
// Let op de kolommen zonder database-default: Lead.id, Lead.updatedAt,
// ReviewItem.id en Interactie.id worden aan de Prisma-kant app-side gevuld, dus
// die vullen wij hier zelf.

import { getServiceClient } from '@/lib/db/supabase';
import { nieuwId, SITE_AGENT_ORG_ID } from '../db';

export type LeadScore = 'HOT' | 'WARM' | 'COLD';

export interface LeadInvoer {
  bedrijfsnaam: string;
  contactNaam?: string | null;
  contactEmail?: string | null;
  contactTelefoon?: string | null;
  websiteUrl?: string | null;
  score?: LeadScore | null;
  scoreReason?: string | null;
  nextStepSuggestion?: string | null;
}

interface LeadRij {
  id: string;
  bedrijfsnaam: string;
  contactEmail: string | null;
}

function client() {
  const db = getServiceClient();
  if (!db) throw new Error('site-agent: geen Supabase-configuratie voor CRM-schrijfacties');
  return db;
}

/** Zoekt een bestaande lead op mailadres, zodat we niet dubbel aanmaken. */
export async function zoekLeadOpEmail(email: string): Promise<LeadRij | null> {
  const db = client();
  const { data, error } = await db
    .from('Lead')
    .select('id, bedrijfsnaam, "contactEmail"')
    .eq('organizationId', SITE_AGENT_ORG_ID)
    .ilike('contactEmail', email)
    .order('createdAt', { ascending: false })
    .limit(1)
    .maybeSingle<LeadRij>();

  if (error) throw new Error(`site-agent: lead zoeken faalde: ${error.message}`);
  return data;
}

export async function maakLeadAan(invoer: LeadInvoer): Promise<string> {
  const db = client();
  const id = nieuwId();
  const nu = new Date().toISOString();

  const { error } = await db.from('Lead').insert({
    id,
    organizationId: SITE_AGENT_ORG_ID,
    bedrijfsnaam: invoer.bedrijfsnaam,
    contactNaam: invoer.contactNaam ?? null,
    contactEmail: invoer.contactEmail ?? null,
    contactTelefoon: invoer.contactTelefoon ?? null,
    websiteUrl: invoer.websiteUrl ?? null,
    bron: 'WEBSITE_AGENT',
    stage: 'NEW',
    score: invoer.score ?? null,
    scoreReason: invoer.scoreReason ?? null,
    nextStepSuggestion: invoer.nextStepSuggestion ?? null,
    updatedAt: nu,
  });

  if (error) throw new Error(`site-agent: lead aanmaken faalde: ${error.message}`);
  return id;
}

export async function werkLeadBij(id: string, patch: Partial<LeadInvoer>): Promise<void> {
  const db = client();
  const velden: Record<string, unknown> = { updatedAt: new Date().toISOString() };
  for (const [sleutel, waarde] of Object.entries(patch)) {
    if (waarde !== undefined && waarde !== null && waarde !== '') velden[sleutel] = waarde;
  }

  const { error } = await db.from('Lead').update(velden).eq('id', id);
  if (error) throw new Error(`site-agent: lead bijwerken faalde: ${error.message}`);
}

export interface InteractieInvoer {
  leadId: string;
  subject: string;
  body: string;
}

/**
 * Legt het gesprek als interactie vast bij de lead. Type NOTE en richting IN:
 * de bezoeker kwam naar ons toe, en dit is een notitie en geen verzonden mail.
 */
export async function maakInteractie(invoer: InteractieInvoer): Promise<void> {
  const db = client();
  const { error } = await db.from('Interactie').insert({
    id: nieuwId(),
    organizationId: SITE_AGENT_ORG_ID,
    leadId: invoer.leadId,
    type: 'NOTE',
    direction: 'IN',
    subject: invoer.subject.slice(0, 200),
    body: invoer.body,
    occurredAt: new Date().toISOString(),
  });

  if (error) throw new Error(`site-agent: interactie vastleggen faalde: ${error.message}`);
}

export type ReviewNiveau = 'SIMPLE' | 'REVIEW' | 'ESCALATION';

/**
 * Soorten werkbak-item die wij aanmaken.
 *
 * `site_agent_question` is bewust géén `task`: dat soort betekent aan de
 * dashboardkant "maak een ticket aan bij een bestaande klant" en vereist een
 * gematchte `customerId` in de grounding. Een websitebezoeker is hooguit een
 * lead, dus dat item zou gegarandeerd op FAILED belanden. Het dashboard sluit
 * `site_agent_question` zelf af: goedkeuren = "gezien en opgepakt", zonder
 * systeemactie. Zie het contract in de dashboard-repo,
 * `docs/site-agent-werkbak-contract.md`.
 */
export type ReviewSoort = 'draft_email' | 'site_agent_question';

export interface ReviewInvoer {
  kind: ReviewSoort;
  summary: string;
  proposed: Record<string, unknown>;
  grounding?: Record<string, unknown>;
  domain?: 'chat' | 'mail' | 'calendar';
  level?: ReviewNiveau;
}

/**
 * Zet een concept in de werkbak. Dit verstuurt niets: status blijft PENDING tot
 * een mens het goedkeurt. Dat is geen beperking om weg te moffelen maar precies
 * wat de agent aan de bezoeker demonstreert.
 */
export async function maakReviewItem(invoer: ReviewInvoer): Promise<string> {
  const db = client();
  const id = nieuwId();

  const { error } = await db.from('ReviewItem').insert({
    id,
    organizationId: SITE_AGENT_ORG_ID,
    kind: invoer.kind,
    summary: invoer.summary.slice(0, 500),
    proposed: invoer.proposed,
    grounding: invoer.grounding ?? null,
    domain: invoer.domain ?? 'chat',
    level: invoer.level ?? 'REVIEW',
    status: 'PENDING',
  });

  if (error) throw new Error(`site-agent: reviewitem aanmaken faalde: ${error.message}`);
  return id;
}
