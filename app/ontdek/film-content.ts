/**
 * Copy en timing voor de wandeling op /ontdek.
 *
 * De film bestaat uit zeven haltes in een doorlopend getekend landschap.
 * Elke halte bouwt op in "beats": de controller (OntdekFilm) verhoogt de
 * beat op beatDelayMs zolang er wordt afgespeeld en gaat holdMs na de
 * laatste beat door naar de volgende halte. Een halte met pauseAtBeat
 * wacht daar tot de bezoeker iets doet.
 */

export interface FilmChapter {
  id: string;
  eyebrow: string;
  titel: string;
  titelAccent: string;
  intro: string;
  beats: number;
  beatDelayMs: number;
  holdMs: number;
  pauseAtBeat?: number;
}

export const CHAPTERS: FilmChapter[] = [
  {
    id: 'brief',
    eyebrow: 'Halte 1 · De brievenbus',
    titel: 'Er valt werk',
    titelAccent: 'binnen.',
    intro:
      'Een AI-agent is een digitale collega. Hij leest wat er binnenkomt, net als uw mensen. Alleen meteen, en altijd.',
    beats: 3,
    beatDelayMs: 1700,
    holdMs: 4200,
    pauseAtBeat: 1,
  },
  {
    id: 'denken',
    eyebrow: 'Halte 2 · Het bankje',
    titel: 'Eerst denken, dan',
    titelAccent: 'doen.',
    intro:
      'Voor elke stap kijkt de agent na wat er klopt. En u kunt altijd teruglezen waarom hij iets deed. Geen zwarte doos.',
    beats: 4,
    beatDelayMs: 1500,
    holdMs: 4200,
  },
  {
    id: 'maken',
    eyebrow: 'Halte 3 · De waslijn',
    titel: 'Hij praat niet alleen. Hij',
    titelAccent: 'levert.',
    intro:
      'Offertes, antwoorden, afspraken: de agent hangt ze klaar zoals uw mensen dat zouden doen. U hoeft alleen nog te versturen.',
    beats: 3,
    beatDelayMs: 1700,
    holdMs: 4500,
  },
  {
    id: 'systemen',
    eyebrow: 'Halte 4 · Het buurtschap',
    titel: 'Geen nieuw scherm erbij.',
    titelAccent: 'Hij komt naar u.',
    intro:
      'De agent loopt tussen uw mail, uw boekhouding, uw agenda en uw CRM. Niet in wéér een apart pakket dat niemand opent.',
    beats: 4,
    beatDelayMs: 1400,
    holdMs: 4200,
  },
  {
    id: 'hek',
    eyebrow: 'Halte 5 · Het hek',
    titel: 'Bij twijfel beslist',
    titelAccent: 'een mens.',
    intro:
      'De agent werkt binnen regels die u samen afspreekt. Komt hij iets tegen dat daarbuiten valt, dan stopt hij bij het hek.',
    beats: 2,
    beatDelayMs: 1600,
    holdMs: 4200,
    pauseAtBeat: 1,
  },
  {
    id: 'team',
    eyebrow: 'Halte 6 · Het dorpsplein',
    titel: 'Grote klussen doet hij',
    titelAccent: 'samen.',
    intro:
      'Voor werk dat door meerdere afdelingen loopt werken agents als een klein team, met een dirigent die de maat aangeeft.',
    beats: 2,
    beatDelayMs: 1600,
    holdMs: 4800,
  },
  {
    id: 'oogst',
    eyebrow: 'Halte 7 · De boomgaard',
    titel: 'Wat het',
    titelAccent: 'oplevert.',
    intro: 'Uren terug voor werk dat aandacht verdient. Dat is de hele bedoeling.',
    beats: 4,
    beatDelayMs: 1300,
    holdMs: 6000,
  },
];

export interface SceneProps {
  beat: number;
  reduced: boolean;
  actief: boolean;
  interacted: boolean;
  onInteract: () => void;
}

/* ------------------------------------------------------------------ */
/* Halte-inhoud                                                        */
/* ------------------------------------------------------------------ */

export const BRIEF = {
  van: 'j.vermeer@dehaanbouw.nl',
  onderwerp: 'Levertijd kozijnen, order 24831',
  regels: [
    'Beste meneer Vermeer,',
    'Uw kozijnen staan gepland voor donderdag tussen 8.00 en 12.00 uur. De chauffeur belt een half uur van tevoren.',
  ],
  stempel: 'Concept klaargezet · wacht op uw akkoord',
};

export const BRIEF_STAPPEN = [
  { label: 'Lezen', body: 'wat wordt er gevraagd?' },
  { label: 'Opzoeken', body: 'wat weten we al?' },
  { label: 'Doen', body: 'antwoord klaarzetten, in uw toon' },
];

export const DENKEN_CHECKS = [
  { label: 'Dossier gevonden', value: 'klant sinds 2019, order 24831' },
  { label: 'Beleid nagekeken', value: 'levertijd mag gedeeld, korting niet' },
  { label: 'Voorraad gecheckt', value: 'alles op locatie B-14' },
];

export const DENKEN_REASONING =
  'Deze klant heeft een betalingsafspraak die aandacht vraagt, dus het antwoord staat klaar als concept. U beslist.';

export const WASLIJN_PAPIEREN = [
  {
    soort: 'Offerte',
    titel: 'Renovatie dakkapel',
    regels: ['4 × HR++ glas', '12 × kozijnprofiel', 'montageset'],
    slot: '€ 1.395,13 incl. btw',
  },
  {
    soort: 'WhatsApp',
    titel: 'Installatiebedrijf Roos',
    regels: ['"Is de bestelling al onderweg?"', 'Geladen, levering 13.00 en 15.00 uur.'],
    slot: 'beantwoord om 08:42',
  },
  {
    soort: 'Agenda',
    titel: 'Inmeten bij Kuiper',
    regels: ['dinsdag 10.00 uur, 45 min', 'monteur Van Dijk'],
    slot: 'uitnodiging verstuurd',
  },
];

export const SYSTEMEN = [
  { label: 'E-mail', detail: 'leest en beantwoordt' },
  { label: 'Boekhouding', detail: 'boekt en controleert' },
  { label: 'Agenda', detail: 'plant en bevestigt' },
  { label: 'CRM', detail: 'kent elke klant' },
];

export const TEAM_AGENTS = ['Verkoop', 'Planning', 'Inkoop', 'Facturatie'];

export interface OogstStat {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  literal?: string;
}

export const OOGST_STATS: OogstStat[] = [
  { value: 40, prefix: '~', suffix: '%', label: 'minder tijd aan terugkerend werk' },
  { value: 2, prefix: '1–', suffix: ' wk', label: 'van kennismaking tot live' },
  { value: 0, prefix: '', suffix: '', label: 'nieuwe schermen om te leren', literal: '0' },
];
