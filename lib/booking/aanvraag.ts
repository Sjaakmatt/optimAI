// De wachtrij van aangevraagde kennismakingen (dubbele opt-in).
//
// Iemand die een moment kiest, krijgt niet meteen een afspraak. Er komt een rij
// in `SiteBooking` en een mail met een link; pas als die link gevolgd wordt,
// gaat de afspraak via de MCP de agenda in.
//
// Waarom die omweg: het boekingseindpunt is publiek en anoniem. Zonder opt-in
// kan iemand het mailadres van een ander invullen en zo een afspraak in de
// agenda van Sjaak zetten — met een vreemde erbij uitgenodigd. Met de opt-in
// moet je het adres kunnen lezen om de afspraak door te zetten.
//
// De token staat alleen in de mail. Hier bewaren we de sha256, zodat een
// gelekte databasekopie geen bevestigingen oplevert. Het opzoeken gebeurt op
// die hash, dus er is geen pad waarlangs de ruwe token uit de database komt.

import { createHash, randomBytes } from 'node:crypto';

import { getServiceClient } from '@/lib/db/supabase';
import { SITE_AGENT_ORG_ID, nieuwId } from '@/lib/site-agent/db';

/** Hoe lang een opt-in link geldig is. Kort genoeg om niet te blijven slingeren. */
export const TOKEN_GELDIG_UREN = Number(process.env.BOEKING_TOKEN_UREN ?? '24');

export type BoekingStatus = 'WACHT' | 'BEVESTIGD' | 'VERVALLEN';

export interface Aanvraag {
  id: string;
  status: BoekingStatus;
  start: string;
  eind: string;
  naam: string;
  email: string;
  bedrijf: string | null;
  aanleiding: string | null;
  bron: string;
  conversationId: string | null;
  afspraakId: string | null;
  expiresAt: string;
}

const VELDEN =
  'id, status, start, eind, naam, email, bedrijf, aanleiding, bron, "conversationId", "afspraakId", "expiresAt"';

function client() {
  const db = getServiceClient();
  if (!db) throw new Error('agenda: geen Supabase-configuratie voor boekingen');
  return db;
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

/**
 * Wanneer de opt-in link vervalt: `geldigUren` na nu, maar nooit later dan de
 * afspraak zelf. Een link die pas geldig wordt nadat het gesprek al begonnen
 * is, kan niets meer opleveren.
 */
export function bepaalVervaltijd(nu: Date, startIso: string, geldigUren: number): Date {
  const verloopt = new Date(nu.getTime() + geldigUren * 60 * 60 * 1000);
  const start = new Date(startIso);
  if (Number.isNaN(start.getTime())) return verloopt;
  return verloopt < start ? verloopt : start;
}

export interface NieuweAanvraag {
  start: string;
  eind: string;
  naam: string;
  email: string;
  bedrijf?: string;
  aanleiding?: string;
  bron: string;
  conversationId?: string | null;
}

/**
 * Legt de aanvraag vast en geeft de token terug. Die token is het enige moment
 * waarop hij bestaat buiten de mail om — de aanroeper zet hem in de link en
 * bewaart hem verder nergens.
 */
export async function maakAanvraag(
  invoer: NieuweAanvraag,
): Promise<{ id: string; token: string }> {
  const db = client();
  const id = nieuwId();
  const token = randomBytes(32).toString('hex');
  const nu = new Date();
  const expiresAt = bepaalVervaltijd(nu, invoer.start, TOKEN_GELDIG_UREN);

  const { error } = await db.from('SiteBooking').insert({
    id,
    organizationId: SITE_AGENT_ORG_ID,
    tokenHash: hashToken(token),
    status: 'WACHT',
    start: invoer.start,
    eind: invoer.eind,
    naam: invoer.naam,
    email: invoer.email,
    bedrijf: invoer.bedrijf ?? null,
    aanleiding: invoer.aanleiding ?? null,
    bron: invoer.bron,
    conversationId: invoer.conversationId ?? null,
    expiresAt: expiresAt.toISOString(),
    updatedAt: nu.toISOString(),
  });

  if (error) throw new Error(`agenda: aanvraag vastleggen faalde: ${error.message}`);
  return { id, token };
}

/**
 * Zoekt de aanvraag bij een token. Geeft null bij een onbekende token; de
 * aanroeper mag daar niet uit kunnen afleiden of hij bijna goed zat.
 */
export async function zoekAanvraag(token: string): Promise<Aanvraag | null> {
  if (!/^[0-9a-f]{64}$/.test(token)) return null;

  const db = client();
  const { data, error } = await db
    .from('SiteBooking')
    .select(VELDEN)
    .eq('tokenHash', hashToken(token))
    .maybeSingle<Aanvraag>();

  if (error) throw new Error(`agenda: aanvraag zoeken faalde: ${error.message}`);
  return data;
}

export async function markeerBevestigd(id: string, afspraakId: string): Promise<void> {
  const db = client();
  const nu = new Date().toISOString();
  const { error } = await db
    .from('SiteBooking')
    .update({ status: 'BEVESTIGD', afspraakId, bevestigdOp: nu, updatedAt: nu })
    .eq('id', id);
  if (error) throw new Error(`agenda: bevestiging vastleggen faalde: ${error.message}`);
}

export async function markeerVervallen(id: string): Promise<void> {
  const db = client();
  const nu = new Date().toISOString();
  const { error } = await db
    .from('SiteBooking')
    .update({ status: 'VERVALLEN', updatedAt: nu })
    .eq('id', id);
  if (error) throw new Error(`agenda: vervallen vastleggen faalde: ${error.message}`);
}

/**
 * Ruimt aanvragen op die nooit bevestigd zijn en waarvan de link verlopen is.
 * Bevestigde rijen blijven staan: die zijn de administratie van wie er geboekt
 * heeft, en vallen onder dezelfde retentie als de gesprekken.
 */
export async function ruimVerlopenAanvragenOp(): Promise<number> {
  const db = getServiceClient();
  if (!db) return 0;

  const { error, count } = await db
    .from('SiteBooking')
    .delete({ count: 'exact' })
    .neq('status', 'BEVESTIGD')
    .lt('expiresAt', new Date().toISOString());

  if (error) throw new Error(`agenda: aanvragen opruimen faalde: ${error.message}`);
  return count ?? 0;
}
