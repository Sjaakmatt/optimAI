import type { Artifact } from '@/lib/types';

/**
 * Copy, timing en fixtures voor de wandeling op /ontdek.
 *
 * De film bestaat uit hoofdstukken die elk in "beats" opbouwen. De controller
 * (OntdekFilm) verhoogt de beat op beatDelayMs zolang er wordt afgespeeld en
 * gaat holdMs na de laatste beat door naar het volgende hoofdstuk. Een
 * hoofdstuk met pauseAtBeat wacht op die beat tot de bezoeker iets doet.
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
    eyebrow: 'Halte 1 · De brief op de mat',
    titel: 'Er valt werk',
    titelAccent: 'binnen.',
    intro:
      'Een AI-agent is een digitale collega. Hij leest wat er binnenkomt, net als uw mensen. Alleen meteen, en altijd.',
    beats: 4,
    beatDelayMs: 1600,
    holdMs: 3500,
    pauseAtBeat: 1,
  },
  {
    id: 'denken',
    eyebrow: 'Halte 2 · Hardop denken',
    titel: 'Geen zwarte doos, maar een',
    titelAccent: 'werkbriefje.',
    intro:
      'Voor elke stap kijkt de agent eerst na wat er klopt. En u kunt altijd teruglezen waarom hij iets deed.',
    beats: 5,
    beatDelayMs: 1400,
    holdMs: 4000,
  },
  {
    id: 'maken',
    eyebrow: 'Halte 3 · Echte dingen maken',
    titel: 'Hij praat niet alleen. Hij',
    titelAccent: 'levert.',
    intro:
      'Offertes, antwoorden, afspraken: de agent zet ze klaar zoals uw mensen dat zouden doen. U hoeft alleen nog te versturen.',
    beats: 3,
    beatDelayMs: 1800,
    holdMs: 4500,
  },
  {
    id: 'systemen',
    eyebrow: 'Halte 4 · In uw systemen',
    titel: 'Geen nieuw scherm erbij.',
    titelAccent: 'Hij komt naar u.',
    intro:
      'De agent werkt in uw mail, uw boekhouding, uw agenda en uw CRM. Niet in wéér een apart pakket dat niemand opent.',
    beats: 4,
    beatDelayMs: 1300,
    holdMs: 4000,
  },
  {
    id: 'hek',
    eyebrow: 'Halte 5 · Het hek',
    titel: 'Bij twijfel beslist',
    titelAccent: 'een mens.',
    intro:
      'De agent werkt binnen regels die u samen afspreekt. Komt hij iets tegen dat daarbuiten valt, dan stopt hij en legt het bij u neer.',
    beats: 3,
    beatDelayMs: 1500,
    holdMs: 4000,
    pauseAtBeat: 1,
  },
  {
    id: 'team',
    eyebrow: 'Halte 6 · Het dorp',
    titel: 'Grote klussen doet hij',
    titelAccent: 'samen.',
    intro:
      'Voor werk dat door meerdere afdelingen loopt werken agents als een klein team, met een dirigent die het overzicht houdt.',
    beats: 3,
    beatDelayMs: 1500,
    holdMs: 4500,
  },
  {
    id: 'oogst',
    eyebrow: 'Halte 7 · De oogst',
    titel: 'Wat het',
    titelAccent: 'oplevert.',
    intro:
      'Uren terug voor werk dat aandacht verdient. Dat is de hele bedoeling.',
    beats: 4,
    beatDelayMs: 1200,
    holdMs: 6000,
  },
];

export interface SceneProps {
  beat: number;
  reduced: boolean;
  interacted: boolean;
  onInteract: () => void;
}

/* ------------------------------------------------------------------ */
/* Fixtures voor de artifact-kaarten (zelfde vorm als de Werkbank)     */
/* ------------------------------------------------------------------ */

export const BRIEF_EMAIL: Artifact = {
  id: 'ontdek-brief',
  eventId: 'ontdek',
  type: 'email',
  state: 'complete',
  startedAt: 0,
  footer: 'Concept klaargezet, wacht op uw akkoord',
  meta: {
    from: 'agent@uwbedrijf.nl',
    to: 'j.vermeer@dehaanbouw.nl',
    subject: 'Re: Levertijd kozijnen order 24831',
    date: 'vandaag · 09:12',
    reasoning: [
      'Vraag herkend als levertijd-check voor een lopende order.',
      'Order 24831 opgezocht: levering staat gepland op donderdag.',
      'Toon overgenomen uit eerdere mails aan deze klant.',
    ],
  },
  content: {
    paragraphs: [
      'Beste meneer Vermeer,',
      'Uw kozijnen van order 24831 staan gepland voor levering op donderdag tussen 8.00 en 12.00 uur. De chauffeur belt een half uur van tevoren.',
      'Met vriendelijke groet,\nDe Haan Bouwmaterialen',
    ],
  },
};

export const MAKEN_QUOTE: Artifact = {
  id: 'ontdek-offerte',
  eventId: 'ontdek',
  type: 'quote',
  state: 'complete',
  startedAt: 0,
  footer: 'Klaar voor verzending',
  meta: {
    quoteNumber: 'OFF-2026-118',
    date: 'vandaag',
    projectName: 'Renovatie dakkapel',
    customer: 'Aannemersbedrijf Kuiper',
    terms: '14 dagen, levering af magazijn',
    validity: '30 dagen',
  },
  content: {
    lines: [
      { omschrijving: 'HR++ glas 1200×800', aantal: 4, prijs: 128, totaal: 512 },
      { omschrijving: 'Kozijnprofiel hardhout', aantal: 12, prijs: 46, totaal: 552 },
      { omschrijving: 'Montageset compleet', aantal: 1, prijs: 89, totaal: 89 },
    ],
  },
};

export const MAKEN_WHATSAPP: Artifact = {
  id: 'ontdek-whatsapp',
  eventId: 'ontdek',
  type: 'whatsapp',
  state: 'complete',
  startedAt: 0,
  footer: 'Beantwoord',
  meta: {
    customer: 'Installatiebedrijf Roos',
    phone: '06 24 81 03 77',
  },
  content: {
    messages: [
      { from: 'customer', text: 'Is de bestelling van vrijdag al onderweg?', time: '08:41' },
      {
        from: 'us',
        text: 'Goedemorgen! Ja, uw bestelling is vanochtend geladen. Verwachte levering tussen 13.00 en 15.00 uur.',
        time: '08:42',
      },
    ],
  },
};

export const MAKEN_AGENDA: Artifact = {
  id: 'ontdek-agenda',
  eventId: 'ontdek',
  type: 'calendar-item',
  state: 'complete',
  startedAt: 0,
  footer: 'Ingepland, uitnodiging verstuurd',
  meta: {},
  content: {
    slot: {
      wanneer: 'dinsdag 10.00 uur',
      duur: '45 min',
      voor: 'monteur Van Dijk',
      onderwerp: 'Inmeten dakkapel bij Kuiper',
      details: ['Adres en ordernummer staan in de uitnodiging', 'Klant is akkoord met het tijdstip'],
    },
  },
};

/* ------------------------------------------------------------------ */
/* Scène-specifieke copy                                               */
/* ------------------------------------------------------------------ */

export const BRIEF_STAPPEN = [
  { label: 'Lezen', body: 'Wat wordt er gevraagd?' },
  { label: 'Opzoeken', body: 'Wat weten we van deze klant en order?' },
  { label: 'Doen', body: 'Antwoord klaarzetten, in uw toon.' },
];

export const DENKEN_CHECKS = [
  { label: 'Dossier gevonden', value: 'klant sinds 2019, order 24831' },
  { label: 'Beleid nagekeken', value: 'levertijd mag gedeeld, korting niet' },
  { label: 'Voorraad gecheckt', value: 'alles op locatie B-14' },
];

export const DENKEN_REASONING = [
  'De vraag gaat over een lopende order, dus eerst het ordersysteem geraadpleegd.',
  'Uw beleid zegt: levertijden altijd bevestigen met een tijdvak, nooit een exact uur.',
  'Antwoord opgesteld en klaargezet als concept, want deze klant heeft een betalingsafspraak die aandacht vraagt.',
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
