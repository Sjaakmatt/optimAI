// De eigen agenda: beschikbaarheid ophalen en afspraken boeken op een
// Graph-mailbox, via de scheduling-MCP. Welke mailbox staat in BOEKING_MAILBOX.
//
// Dit is de vervanger van de Cal.com-embed. De MCP rekent de vrije momenten
// uit — werkdagen, openingstijden, marge rond bestaande afspraken en het
// halfuurraster staan in de adapter-config in het dashboard, niet hier. Deze
// laag doet drie dingen: het venster bepalen dat we bevragen, de slots naar
// iets brengen waar de site en de agent mee kunnen werken, en bij het boeken
// controleren dat het gevraagde moment ook echt vrij was.
//
// Die laatste controle is geen formaliteit. Het boekingseindpunt is publiek:
// zonder controle kan iemand een willekeurige starttijd meesturen en midden in
// de nacht of dwars door een bestaande afspraak heen boeken.

import {
  BOEKING_DUUR_MINUTEN,
  BOEKING_TIJDZONE,
} from '@/components/booking/config';
import { McpFout, roepMcpTool } from '@/lib/mcp/client';

/** Standaard hoever vooruit we kijken. De MCP bewaakt de ondergrens. */
export const HORIZON_DAGEN = Number(process.env.BOEKING_HORIZON_DAGEN ?? '14');

/** Maximaal aantal slots dat we per keer opvragen. */
const MAX_SLOTS = 50;

const MCP_TIMEOUT_MS = 20_000;

/**
 * De mailbox waarin geboekt wordt. Dit is de `resourceId` die de MCP aan Graph
 * doorgeeft; een UPN werkt daar net zo goed als een object-id.
 *
 * Zet deze expliciet. De default is een gok, en een verkeerde mailbox levert
 * geen nette fout op maar een lege agenda of een boeking op het verkeerde
 * adres.
 */
export function boekingsMailbox(): string {
  return process.env.BOEKING_MAILBOX ?? 'sjaak@factumai.nl';
}

function schedulingUrl(): string {
  const url = process.env.FACTUMAI_MCP_SCHEDULING_URL;
  if (!url) throw new McpFout('FACTUMAI_MCP_SCHEDULING_URL niet gezet', 'scheduling', '-');
  return url;
}

/**
 * Welke scheduling-instance de website gebruikt.
 *
 * Dit moet gezet zijn zodra de organisatie meer dan één scheduling-instance
 * heeft. Zonder waarde kiest de MCP de primaire instance, en die hoort bij de
 * orchestrator — dan zou de website in de verkeerde agenda kijken en boeken.
 */
function schedulingInstance(): string | undefined {
  return process.env.BOEKING_MCP_INSTANCE || undefined;
}

export interface Slot {
  /** ISO-tijdstip in UTC; de enige waarde die terug mag komen bij het boeken. */
  start: string;
  end: string;
}

/** Eén dag met de vrije momenten erop, klaar voor de agenda-UI. */
export interface AgendaDag {
  /** Kalenderdatum in Amsterdam, als YYYY-MM-DD. */
  datum: string;
  /** Bijvoorbeeld 'woensdag 3 juni'. */
  label: string;
  slots: Array<Slot & { label: string }>;
}

interface McpSlot {
  resourceId: string;
  resourceName?: string;
  start: string;
  end: string;
}

const DAG_FMT = new Intl.DateTimeFormat('nl-NL', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  timeZone: BOEKING_TIJDZONE,
});

const TIJD_FMT = new Intl.DateTimeFormat('nl-NL', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: BOEKING_TIJDZONE,
});

const DATUM_FMT = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  timeZone: BOEKING_TIJDZONE,
});

/** 'woensdag 3 juni om 14:30' — de vorm die we in mails en chat gebruiken. */
export function omschrijfMoment(iso: string): string {
  const d = new Date(iso);
  return `${DAG_FMT.format(d)} om ${TIJD_FMT.format(d)}`;
}

export function tijdLabel(iso: string): string {
  return TIJD_FMT.format(new Date(iso));
}

/**
 * Haalt de vrije momenten op vanaf `vanaf` (default nu) tot `dagen` verder.
 * Geeft platte slots terug; groeperen per dag doet `groepeerPerDag`.
 */
export async function haalSlots(opties: { vanaf?: Date; dagen?: number } = {}): Promise<Slot[]> {
  const vanaf = opties.vanaf ?? new Date();
  const dagen = Math.min(Math.max(opties.dagen ?? HORIZON_DAGEN, 1), 60);
  const tot = new Date(vanaf.getTime() + dagen * 24 * 60 * 60 * 1000);

  const slots = await roepMcpTool<McpSlot[]>({
    baseUrl: schedulingUrl(),
    tool: 'find_available_slots',
    argumenten: {
      from: vanaf.toISOString(),
      to: tot.toISOString(),
      durationMinutes: BOEKING_DUUR_MINUTEN,
      maxResults: MAX_SLOTS,
    },
    agentId: 'website-agenda',
    instanceKey: schedulingInstance(),
    timeoutMs: MCP_TIMEOUT_MS,
  });

  return (Array.isArray(slots) ? slots : []).map((s) => ({ start: s.start, end: s.end }));
}

export function groepeerPerDag(slots: Slot[]): AgendaDag[] {
  const dagen = new Map<string, AgendaDag>();
  for (const slot of slots) {
    const d = new Date(slot.start);
    const datum = DATUM_FMT.format(d);
    let dag = dagen.get(datum);
    if (!dag) {
      dag = { datum, label: DAG_FMT.format(d), slots: [] };
      dagen.set(datum, dag);
    }
    dag.slots.push({ ...slot, label: TIJD_FMT.format(d) });
  }
  return [...dagen.values()];
}

export interface BoekingsInvoer {
  /** Starttijd zoals de bezoeker die koos, ISO in UTC. */
  start: string;
  naam: string;
  email: string;
  bedrijf?: string;
  /** Waar het gesprek over gaat; komt in de omschrijving van de afspraak. */
  aanleiding?: string;
  /** Waar de boeking vandaan komt, bv. 'agenda' of 'site-agent'. */
  bron: string;
}

export interface Boeking {
  afspraakId: string;
  start: string;
  end: string;
  /** De Teams-link, als Graph er een heeft aangemaakt. */
  joinUrl: string | null;
}

export class SlotBezetFout extends Error {
  constructor() {
    super('Dat moment is net vergeven.');
    this.name = 'SlotBezetFout';
  }
}

interface McpAppointment {
  id: string;
  start: string;
  end: string;
  onlineMeeting?: { joinUrl?: string };
}

/**
 * Zoekt het slot dat exact op `startIso` begint en op dit ogenblik nog vrij is.
 * Gooit `SlotBezetFout` als het er niet is.
 *
 * Dit staat los van het boeken, omdat het twee keer nodig is: bij de aanvraag
 * (geen opt-in mail sturen voor een moment dat niet kan) en bij de bevestiging
 * (tussen die twee zit een klik van de bezoeker, en in die tijd kan het moment
 * vergeven zijn).
 *
 * Alleen een exacte slotstart telt. Wie vijf minuten opschuift, schuift ook het
 * einde op en loopt daarmee de afspraak erna in.
 */
export async function zoekVrijSlot(startIso: string): Promise<Slot> {
  const start = new Date(startIso);
  if (Number.isNaN(start.getTime())) throw new SlotBezetFout();

  const beschikbaar = await haalSlots({ vanaf: new Date(), dagen: HORIZON_DAGEN });
  const gekozen = beschikbaar.find((s) => Date.parse(s.start) === start.getTime());
  if (!gekozen) throw new SlotBezetFout();
  return gekozen;
}

/**
 * Boekt de afspraak. Controleert eerst of het gevraagde moment op dit ogenblik
 * echt vrij is: de bezoeker kan een oud slot in beeld hebben, of een gemanipuleerde
 * starttijd sturen.
 *
 * Er blijft een klein raampje tussen de controle en het aanmaken waarin iemand
 * anders hetzelfde moment kan pakken. Dat is hier geen probleem: Graph zet de
 * tweede afspraak er gewoon naast en Sjaak ziet dubbelboeking in zijn agenda —
 * met een halfuurraster en dit boekingsvolume is dat een aanvaardbaar risico,
 * en een echte reservering zou state in de MCP vragen die daar niet hoort.
 */
export async function boekAfspraakIn(invoer: BoekingsInvoer): Promise<Boeking> {
  const gekozen = await zoekVrijSlot(invoer.start);

  const regels = [
    `Aangevraagd via ${invoer.bron} op factumai.nl.`,
    invoer.bedrijf ? `Bedrijf: ${invoer.bedrijf}` : null,
    invoer.aanleiding ? `Aanleiding: ${invoer.aanleiding}` : null,
  ].filter(Boolean);

  const afspraak = await roepMcpTool<McpAppointment>({
    baseUrl: schedulingUrl(),
    tool: 'create_appointment',
    argumenten: {
      resourceId: boekingsMailbox(),
      start: gekozen.start,
      end: gekozen.end,
      subject: `Kennismaking ${invoer.naam}${invoer.bedrijf ? ` — ${invoer.bedrijf}` : ''}`,
      description: regels.join('\n'),
      isOnlineMeeting: true,
      attendees: [{ email: invoer.email, name: invoer.naam }],
    },
    agentId: 'website-agenda',
    instanceKey: schedulingInstance(),
    timeoutMs: MCP_TIMEOUT_MS,
  });

  return {
    afspraakId: afspraak.id,
    start: afspraak.start ?? gekozen.start,
    end: afspraak.end ?? gekozen.end,
    joinUrl: afspraak.onlineMeeting?.joinUrl ?? null,
  };
}
