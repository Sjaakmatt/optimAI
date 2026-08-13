// De twee stappen van een boeking, op één plek.
//
// Stap 1 (`vraagAan`) legt de aanvraag vast en mailt een link. Stap 2
// (`bevestig`) volgt die link en zet de afspraak pas dán in de agenda.
//
// Beide worden vanaf twee kanten aangeroepen — het formulier op de site en de
// site-agent — dus de volgorde en de foutafhandeling staan hier en niet in de
// routes. Wat er in beide gevallen hetzelfde moet zijn: er komt geen mail de
// deur uit voor een moment dat niet kan, en er komt geen afspraak in de agenda
// zonder gevolgde link.

import { BOEKING_DUUR_MINUTEN } from '@/components/booking/config';
import {
  SlotBezetFout,
  boekAfspraakIn,
  omschrijfMoment,
  zoekVrijSlot,
} from './agenda';
import {
  markeerBevestigd,
  markeerVervallen,
  maakAanvraag,
  zoekAanvraag,
  type Aanvraag,
} from './aanvraag';
import { stuurBevestiging, stuurOptIn } from './mail';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';

export class OptInMailFout extends Error {
  constructor() {
    super('De bevestigingsmail kon niet verstuurd worden.');
    this.name = 'OptInMailFout';
  }
}

export interface AanvraagInvoer {
  start: string;
  naam: string;
  email: string;
  bedrijf?: string;
  aanleiding?: string;
  bron: string;
  conversationId?: string | null;
}

export interface AanvraagResultaat {
  /** Het gekozen moment in gewone taal, voor de bevestigingstekst. */
  moment: string;
  start: string;
}

/**
 * Stap 1: leg de aanvraag vast en stuur de opt-in mail.
 *
 * De slotcontrole gaat vóór de database: een moment dat niet kan hoort geen rij
 * en geen mail op te leveren. Faalt de mail alsnog, dan vervalt de aanvraag
 * meteen — een rij zonder verstuurde link kan nooit meer bevestigd worden en
 * zou anders blijven staan tot de retentie hem opruimt.
 */
export async function vraagAan(invoer: AanvraagInvoer): Promise<AanvraagResultaat> {
  const slot = await zoekVrijSlot(invoer.start);

  const { id, token } = await maakAanvraag({
    start: slot.start,
    eind: slot.end,
    naam: invoer.naam,
    email: invoer.email,
    bedrijf: invoer.bedrijf,
    aanleiding: invoer.aanleiding,
    bron: invoer.bron,
    conversationId: invoer.conversationId,
  });

  const bevestigUrl = `${SITE_URL}/agenda/bevestigen?token=${token}`;

  try {
    await stuurOptIn({
      naam: invoer.naam,
      email: invoer.email,
      start: slot.start,
      duurMinuten: BOEKING_DUUR_MINUTEN,
      bevestigUrl,
    });
  } catch (err) {
    console.error('[agenda] opt-in mail faalde:', err instanceof Error ? err.message : err);
    // Een rij waarvan de link nooit is aangekomen, kan nooit meer bevestigd
    // worden. Meteen laten vervallen in plaats van tot de retentie laten staan.
    await markeerVervallen(id).catch(() => {});
    throw new OptInMailFout();
  }

  return { moment: omschrijfMoment(slot.start), start: slot.start };
}

export type BevestigUitkomst =
  | { soort: 'geboekt'; moment: string; start: string }
  | { soort: 'al-bevestigd'; moment: string; start: string }
  | { soort: 'onbekend' }
  | { soort: 'verlopen' }
  | { soort: 'bezet' };

/**
 * Stap 2: volg de link en zet de afspraak in de agenda.
 *
 * Een tweede klik op dezelfde link mag geen tweede afspraak opleveren, dus een
 * al bevestigde aanvraag komt er als `al-bevestigd` uit in plaats van als
 * fout — mensen klikken nu eenmaal nog eens, en mailclients ook.
 */
export async function bevestig(token: string): Promise<BevestigUitkomst> {
  const aanvraag = await zoekAanvraag(token);
  if (!aanvraag) return { soort: 'onbekend' };

  const oordeel = beoordeelAanvraag(aanvraag, new Date());

  if (oordeel === 'al-bevestigd') {
    return {
      soort: 'al-bevestigd',
      moment: omschrijfMoment(aanvraag.start),
      start: aanvraag.start,
    };
  }

  if (oordeel === 'verlopen') {
    if (aanvraag.status !== 'VERVALLEN') await markeerVervallen(aanvraag.id);
    return { soort: 'verlopen' };
  }

  try {
    const boeking = await boekAfspraakIn({
      start: aanvraag.start,
      naam: aanvraag.naam,
      email: aanvraag.email,
      bedrijf: aanvraag.bedrijf ?? undefined,
      aanleiding: aanvraag.aanleiding ?? undefined,
      bron: aanvraag.bron,
    });

    // De bevestigde afspraak staat hiermee vast in `SiteBooking`, mét
    // `conversationId`. Dat is de bron voor "hoeveel afspraken zijn er echt
    // geboekt" — bewust niet `SiteConversation.afspraakGeboekt`, want die kolom
    // meet in de werkbak "agenda geopend" en dat moet hij blijven doen. Zie
    // docs/site-agent-werkbak-contract.md in de dashboard-repo.
    await markeerBevestigd(aanvraag.id, boeking.afspraakId);

    await stuurBevestiging({
      naam: aanvraag.naam,
      email: aanvraag.email,
      start: boeking.start,
      joinUrl: boeking.joinUrl,
      duurMinuten: BOEKING_DUUR_MINUTEN,
    });

    return {
      soort: 'geboekt',
      moment: omschrijfMoment(boeking.start),
      start: boeking.start,
    };
  } catch (err) {
    if (err instanceof SlotBezetFout) {
      // Tussen de aanvraag en de klik is het moment vergeven. De aanvraag is
      // daarmee dood: een nieuwe keuze vraagt een nieuwe link.
      await markeerVervallen(aanvraag.id);
      return { soort: 'bezet' };
    }
    throw err;
  }
}

export type Oordeel = 'boeken' | 'al-bevestigd' | 'verlopen';

/**
 * Wat er met een gevonden aanvraag moet gebeuren.
 *
 * Twee dingen zitten hier bewust in. Een al bevestigde aanvraag levert geen
 * tweede afspraak op — mensen klikken nog eens, en mailclients ook. En een
 * aanvraag verloopt niet alleen op de tokengeldigheid maar ook op de starttijd:
 * bevestigen wat al bezig is of voorbij is, heeft geen zin.
 */
export function beoordeelAanvraag(aanvraag: Aanvraag, nu: Date): Oordeel {
  if (aanvraag.status === 'BEVESTIGD') return 'al-bevestigd';
  const nuMs = nu.getTime();
  if (Date.parse(aanvraag.expiresAt) <= nuMs) return 'verlopen';
  if (Date.parse(aanvraag.start) <= nuMs) return 'verlopen';
  if (aanvraag.status === 'VERVALLEN') return 'verlopen';
  return 'boeken';
}
