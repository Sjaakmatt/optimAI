// Opslag van site-agent-gesprekken in de dashboard-database (SiteConversation
// en SiteMessage), via dezelfde service-role client als lib/scan/leads.ts.
//
// Belangrijk verschil met de scan-opslag: die is best-effort en slikt fouten,
// omdat een scan ook zonder database bruikbaar blijft. Een gesprek kan dat niet:
// de berichtgeschiedenis komt uit de database en niet van de client, dus zonder
// database is er geen gesprek. Deze module gooit daarom wél, en de route vangt
// dat af met een nette Nederlandse melding.

import { createHash, randomBytes } from 'node:crypto';
import { getServiceClient } from '@/lib/db/supabase';

/** De FactumAI-organisatie in de dashboard-database. */
export const SITE_AGENT_ORG_ID = process.env.SITE_AGENT_ORG_ID ?? 'org_factumai_internal';

/** Standaard retentiebeleid: gesprekken verdwijnen na 90 dagen. */
export const RETENTIE_DAGEN = 90;

export type ConversatieStatus = 'OPEN' | 'AFGEROND' | 'AFGEBROKEN';
export type BerichtRol = 'user' | 'assistant';
export type LeadScore = 'HOT' | 'WARM' | 'COLD';

export interface Conversatie {
  id: string;
  sessionId: string;
  paginaPad: string;
  playbook: string;
  status: ConversatieStatus;
  score: LeadScore | null;
  scoreReason: string | null;
  samenvatting: string | null;
  afspraakGeboekt: boolean;
  leadId: string | null;
  totaalTokens: number;
  kostenUsd: number;
  createdAt: string;
}

export interface Bericht {
  id: string;
  rol: BerichtRol;
  inhoud: string;
  geblokkeerd: boolean;
  blokReden: string | null;
  createdAt: string;
}

interface ConversatieRij {
  id: string;
  sessionId: string;
  paginaPad: string;
  playbook: string;
  status: string;
  score: string | null;
  scoreReason: string | null;
  samenvatting: string | null;
  afspraakGeboekt: boolean;
  leadId: string | null;
  totaalTokens: number;
  kostenUsd: string | number | null;
  createdAt: string;
}

interface BerichtRij {
  id: string;
  rol: string;
  inhoud: string;
  geblokkeerd: boolean;
  blokReden: string | null;
  createdAt: string;
}

const CONVERSATIE_VELDEN =
  'id, "sessionId", "paginaPad", playbook, status, score, "scoreReason", samenvatting, ' +
  '"afspraakGeboekt", "leadId", "totaalTokens", "kostenUsd", "createdAt"';

const BERICHT_VELDEN = 'id, rol, inhoud, geblokkeerd, "blokReden", "createdAt"';

/**
 * Id in de stijl die Prisma met `cuid()` genereert: een `c`, een tijdstempel en
 * willekeur, allemaal base36. We schrijven buiten Prisma om, dus we vullen de
 * primaire sleutel zelf; de kolommen hebben geen database-default.
 */
export function nieuwId(): string {
  const tijd = Date.now().toString(36);
  const willekeur = randomBytes(12).toString('hex').slice(0, 16);
  return `c${tijd}${willekeur}`;
}

/** Hasht de user-agent; we slaan hem niet ruw op. */
export function hashUserAgent(userAgent: string | null | undefined): string | null {
  if (!userAgent) return null;
  return createHash('sha256').update(userAgent).digest('hex').slice(0, 32);
}

function client() {
  const db = getServiceClient();
  if (!db) {
    throw new Error(
      'site-agent: geen Supabase-configuratie (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)',
    );
  }
  return db;
}

function naarConversatie(rij: ConversatieRij): Conversatie {
  const status = rij.status === 'AFGEROND' || rij.status === 'AFGEBROKEN' ? rij.status : 'OPEN';
  const score =
    rij.score === 'HOT' || rij.score === 'WARM' || rij.score === 'COLD' ? rij.score : null;
  return {
    id: rij.id,
    sessionId: rij.sessionId,
    paginaPad: rij.paginaPad,
    playbook: rij.playbook,
    status,
    score,
    scoreReason: rij.scoreReason,
    samenvatting: rij.samenvatting,
    afspraakGeboekt: rij.afspraakGeboekt,
    leadId: rij.leadId,
    totaalTokens: rij.totaalTokens,
    kostenUsd: rij.kostenUsd === null ? 0 : Number(rij.kostenUsd),
    createdAt: rij.createdAt,
  };
}

export interface NieuweConversatie {
  sessionId: string;
  paginaPad: string;
  playbook: string;
  referrer?: string | null;
  userAgentHash?: string | null;
}

/**
 * Haalt het gesprek bij deze sessie op, of maakt het aan. `sessionId` is uniek,
 * dus een race tussen twee gelijktijdige eerste berichten eindigt in een
 * conflict; die vangen we af door daarna alsnog te lezen.
 */
export async function haalOfMaakConversatie(invoer: NieuweConversatie): Promise<Conversatie> {
  const db = client();

  const bestaand = await db
    .from('SiteConversation')
    .select(CONVERSATIE_VELDEN)
    .eq('sessionId', invoer.sessionId)
    .maybeSingle<ConversatieRij>();

  if (bestaand.error) {
    throw new Error(`site-agent: gesprek ophalen faalde: ${bestaand.error.message}`);
  }
  if (bestaand.data) return naarConversatie(bestaand.data);

  const nu = new Date();
  const verloopt = new Date(nu.getTime() + RETENTIE_DAGEN * 24 * 60 * 60 * 1000);

  const aangemaakt = await db
    .from('SiteConversation')
    .insert({
      id: nieuwId(),
      organizationId: SITE_AGENT_ORG_ID,
      sessionId: invoer.sessionId,
      paginaPad: invoer.paginaPad,
      playbook: invoer.playbook,
      referrer: invoer.referrer ?? null,
      userAgentHash: invoer.userAgentHash ?? null,
      expiresAt: verloopt.toISOString(),
      updatedAt: nu.toISOString(),
    })
    .select(CONVERSATIE_VELDEN)
    .single<ConversatieRij>();

  if (aangemaakt.error) {
    // 23505 = unique violation: een gelijktijdig verzoek was ons voor.
    if (aangemaakt.error.code === '23505') {
      const opnieuw = await db
        .from('SiteConversation')
        .select(CONVERSATIE_VELDEN)
        .eq('sessionId', invoer.sessionId)
        .single<ConversatieRij>();
      if (!opnieuw.error && opnieuw.data) return naarConversatie(opnieuw.data);
    }
    throw new Error(`site-agent: gesprek aanmaken faalde: ${aangemaakt.error.message}`);
  }

  return naarConversatie(aangemaakt.data);
}

/** Haalt het gesprek bij een sessie op zonder er een aan te maken. */
export async function haalConversatie(sessionId: string): Promise<Conversatie | null> {
  const db = client();
  const { data, error } = await db
    .from('SiteConversation')
    .select(CONVERSATIE_VELDEN)
    .eq('sessionId', sessionId)
    .maybeSingle<ConversatieRij>();

  if (error) throw new Error(`site-agent: gesprek ophalen faalde: ${error.message}`);
  return data ? naarConversatie(data) : null;
}

/**
 * Open gesprekken waar al een tijd niets meer in gebeurd is. Basis voor de
 * afronding op inactiviteit; `updatedAt` tikt mee bij elk bericht.
 */
export async function haalStilleGesprekken(
  stilSindsMinuten: number,
  maximum = 25,
): Promise<Conversatie[]> {
  const db = client();
  const grens = new Date(Date.now() - stilSindsMinuten * 60 * 1000).toISOString();

  const { data, error } = await db
    .from('SiteConversation')
    .select(CONVERSATIE_VELDEN)
    .eq('status', 'OPEN')
    .lt('updatedAt', grens)
    .order('updatedAt', { ascending: true })
    .limit(maximum)
    .returns<ConversatieRij[]>();

  if (error) throw new Error(`site-agent: stille gesprekken ophalen faalde: ${error.message}`);
  return (data ?? []).map(naarConversatie);
}

export interface OpruimResultaat {
  gesprekken: number;
  tellers: number;
}

/**
 * Ruimt op wat over de retentietermijn heen is. Berichten verdwijnen mee via
 * de cascade op SiteMessage.
 */
export async function ruimVerlopenOp(): Promise<OpruimResultaat> {
  const db = client();
  const nu = new Date().toISOString();

  const gesprekken = await db
    .from('SiteConversation')
    .delete({ count: 'exact' })
    .lt('expiresAt', nu)
    .not('expiresAt', 'is', null);
  if (gesprekken.error) {
    throw new Error(`site-agent: gesprekken opruimen faalde: ${gesprekken.error.message}`);
  }

  const tellers = await db.from('SiteAgentCounter').delete({ count: 'exact' }).lt('expiresAt', nu);
  if (tellers.error) {
    throw new Error(`site-agent: tellers opruimen faalde: ${tellers.error.message}`);
  }

  return { gesprekken: gesprekken.count ?? 0, tellers: tellers.count ?? 0 };
}

/**
 * De berichtgeschiedenis, oplopend op tijd. Geblokkeerde berichten laten we
 * bewust weg: die zijn nooit bij de bezoeker aangekomen, dus ze horen ook niet
 * in de context van het model. Ze blijven wel bewaard voor de meting.
 */
export async function haalBerichten(conversationId: string, maximum = 60): Promise<Bericht[]> {
  const db = client();
  const { data, error } = await db
    .from('SiteMessage')
    .select(BERICHT_VELDEN)
    .eq('conversationId', conversationId)
    .eq('geblokkeerd', false)
    .order('createdAt', { ascending: true })
    .limit(maximum)
    .returns<BerichtRij[]>();

  if (error) throw new Error(`site-agent: berichten ophalen faalde: ${error.message}`);

  return (data ?? []).map((rij) => ({
    id: rij.id,
    rol: rij.rol === 'assistant' ? 'assistant' : 'user',
    inhoud: rij.inhoud,
    geblokkeerd: rij.geblokkeerd,
    blokReden: rij.blokReden,
    createdAt: rij.createdAt,
  }));
}

/**
 * Tijdstip van het laatste bericht in dit gesprek. Basis voor de botdetectie:
 * twee berichten binnen een fractie van een seconde komen niet van iemand die
 * zit te typen.
 */
export async function haalLaatsteBerichtTijd(conversationId: string): Promise<number | null> {
  const db = client();
  const { data, error } = await db
    .from('SiteMessage')
    .select('"createdAt"')
    .eq('conversationId', conversationId)
    .order('createdAt', { ascending: false })
    .limit(1)
    .maybeSingle<{ createdAt: string }>();

  if (error) throw new Error(`site-agent: laatste berichttijd ophalen faalde: ${error.message}`);
  return data ? new Date(data.createdAt).getTime() : null;
}

/** Aantal berichten in het gesprek, inclusief geblokkeerde. Voor de harde limiet. */
export async function telBerichten(conversationId: string): Promise<number> {
  const db = client();
  const { count, error } = await db
    .from('SiteMessage')
    .select('id', { count: 'exact', head: true })
    .eq('conversationId', conversationId);

  if (error) throw new Error(`site-agent: berichten tellen faalde: ${error.message}`);
  return count ?? 0;
}

export interface NieuwBericht {
  conversationId: string;
  rol: BerichtRol;
  inhoud: string;
  toolCalls?: unknown;
  geblokkeerd?: boolean;
  blokReden?: string | null;
}

export async function slaBerichtOp(invoer: NieuwBericht): Promise<string> {
  const db = client();
  const id = nieuwId();
  const { error } = await db.from('SiteMessage').insert({
    id,
    conversationId: invoer.conversationId,
    rol: invoer.rol,
    inhoud: invoer.inhoud,
    toolCalls: invoer.toolCalls ?? null,
    geblokkeerd: invoer.geblokkeerd ?? false,
    blokReden: invoer.blokReden ?? null,
  });

  if (error) throw new Error(`site-agent: bericht opslaan faalde: ${error.message}`);
  return id;
}

export interface ConversatiePatch {
  status?: ConversatieStatus;
  score?: LeadScore;
  scoreReason?: string;
  samenvatting?: string;
  afspraakGeboekt?: boolean;
  leadId?: string;
  paginaPad?: string;
  playbook?: string;
}

export async function werkConversatieBij(id: string, patch: ConversatiePatch): Promise<void> {
  const db = client();
  const { error } = await db
    .from('SiteConversation')
    .update({ ...patch, updatedAt: new Date().toISOString() })
    .eq('id', id);

  if (error) throw new Error(`site-agent: gesprek bijwerken faalde: ${error.message}`);
}

/**
 * Telt tokens en kosten op bij het gesprek. Optellen gebeurt in de database via
 * een atomaire update zou netter zijn, maar dat vraagt een extra functie; bij
 * één schrijver per gesprek (de bezoeker zelf) is lezen-en-schrijven genoeg.
 */
export async function verhoogVerbruik(
  id: string,
  tokens: number,
  kostenUsd: number,
): Promise<void> {
  const db = client();
  const huidig = await db
    .from('SiteConversation')
    .select('"totaalTokens", "kostenUsd"')
    .eq('id', id)
    .single<{ totaalTokens: number; kostenUsd: string | number | null }>();

  if (huidig.error) {
    throw new Error(`site-agent: verbruik ophalen faalde: ${huidig.error.message}`);
  }

  const nieuweTokens = (huidig.data.totaalTokens ?? 0) + tokens;
  const nieuweKosten = Number(huidig.data.kostenUsd ?? 0) + kostenUsd;

  const { error } = await db
    .from('SiteConversation')
    .update({
      totaalTokens: nieuweTokens,
      kostenUsd: nieuweKosten.toFixed(4),
      updatedAt: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) throw new Error(`site-agent: verbruik bijwerken faalde: ${error.message}`);
}
