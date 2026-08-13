import type { Artifact } from '@/lib/types';

/**
 * Copy, timing en fixtures voor de rondleiding op /ontdek.
 *
 * Rode draad: een gewoon MKB-bedrijf dat klantvragen, bestellingen en
 * facturen afhandelt (in het voorbeeld "Meridian", een fictieve leverancier
 * met klanten in binnen- en buitenland). De rondleiding laat zien hoe één
 * agent daar meertalig orders afhandelt, en groeit tot een multi-agent keten
 * en geavanceerde, vooruitkijkende agents. Bewust sector-neutraal, zodat elk
 * bedrijf zich erin herkent.
 *
 * De rondleiding bestaat uit hoofdstukken die elk in "beats" opbouwen. De
 * controller (OntdekFilm) verhoogt de beat op beatDelayMs zolang er
 * wordt afgespeeld en gaat holdMs na de laatste beat door naar de
 * volgende stap. Een stap met pauseAtBeat wacht op de bezoeker.
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
    eyebrow: 'Stap 1 · Binnenkomend werk',
    titel: 'Er komt werk binnen.',
    titelAccent: 'In vier talen.',
    intro:
      'Klanten sturen aanvragen en bestellingen, in het Nederlands, Duits, Engels of Frans. De agent leest elke binnenkomende vraag en beantwoordt die in de taal van de klant.',
    beats: 4,
    beatDelayMs: 1600,
    holdMs: 3500,
    pauseAtBeat: 1,
  },
  {
    id: 'denken',
    eyebrow: 'Stap 2 · Controle en onderbouwing',
    titel: 'Geen zwarte doos, maar een',
    titelAccent: 'controleerbaar spoor.',
    intro:
      'Voor elke aanvraag controleert de agent wie de klant is, wat er is afgesproken, of het leverbaar is en welke voorwaarden gelden. Elke stap is achteraf terug te lezen.',
    beats: 5,
    beatDelayMs: 1400,
    holdMs: 4000,
  },
  {
    id: 'maken',
    eyebrow: 'Stap 3 · Wat de agent oplevert',
    titel: 'De agent antwoordt niet alleen. Hij',
    titelAccent: 'levert.',
    intro:
      'Een orderbevestiging, een factuur met de juiste gegevens en valuta, een planning voor de uitvoering: de agent zet het klaar volgens uw eigen werkwijze.',
    beats: 3,
    beatDelayMs: 1800,
    holdMs: 4500,
  },
  {
    id: 'systemen',
    eyebrow: 'Stap 4 · Koppeling met uw systemen',
    titel: 'Geen extra systeem.',
    titelAccent: 'Hij werkt in wat u al heeft.',
    intro:
      'Via een koppeling per systeem werkt de agent in uw ERP of administratie, de facturatie, de planning en al uw klantkanalen tegelijk: mail, chat en social.',
    beats: 4,
    beatDelayMs: 1300,
    holdMs: 4000,
  },
  {
    id: 'hek',
    eyebrow: 'Stap 5 · Grenzen en toezicht',
    titel: 'Bij twijfel beslist',
    titelAccent: 'een mens.',
    intro:
      'Standaardgevallen handelt de agent zelf af. Wijkt een aanvraag af, gaat het om een uitzondering of een groot bedrag, dan stopt hij en legt hij de keuze bij u neer.',
    beats: 3,
    beatDelayMs: 1500,
    holdMs: 4000,
    pauseAtBeat: 1,
  },
  {
    id: 'team',
    eyebrow: 'Stap 6 · Samenwerkende agents',
    titel: 'Grotere processen lopen',
    titelAccent: 'door de keten.',
    intro:
      'Eén opdracht loopt van verkoop naar uitvoering, planning en facturatie. Agents geven het werk aan elkaar door, met een coördinator die het overzicht houdt.',
    beats: 3,
    beatDelayMs: 1500,
    holdMs: 4500,
  },
  {
    id: 'vooruit',
    eyebrow: 'Stap 7 · Vooruitkijkende agents',
    titel: 'Van afhandelen naar',
    titelAccent: 'vooruitkijken.',
    intro:
      'Naast het dagelijkse werk zijn er agents die vooruitkijken: vraag voorspellen, afspraken en regels bewaken, kennis uit uw eigen documenten ontsluiten en de markt volgen.',
    beats: 4,
    beatDelayMs: 1500,
    holdMs: 5500,
  },
  {
    id: 'oogst',
    eyebrow: 'Stap 8 · Het resultaat',
    titel: 'Wat het',
    titelAccent: 'oplevert.',
    intro:
      'Minder tijd aan terugkerend werk, meer tijd voor klanten en groei. Daar is het om te doen.',
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
  footer: 'Concept in het Duits klaargezet, wacht op uw akkoord',
  meta: {
    from: 'orders@meridian.nl',
    to: 'einkauf@nordmann-gmbh.de',
    subject: 'Re: Ihre Bestellung 2214',
    date: 'vandaag · 09:12',
    reasoning: [
      'Order herkend: bestelling 2214, levering in week 38.',
      'Beantwoord in de taal van de klant (Duits), toon uit eerdere mails overgenomen.',
      'Beschikbaarheid en planning gecheckt vóór het toezeggen van de leverweek.',
    ],
  },
  content: {
    paragraphs: [
      'Sehr geehrter Herr Nordmann,',
      'vielen Dank für Ihre Bestellung 2214. Die Lieferung ist für Woche 38 eingeplant; die Auftragsbestätigung und die Rechnung folgen in separater Mail.',
      'Mit freundlichen Grüßen,\nMeridian',
    ],
  },
};

export const MAKEN_ORDER: Artifact = {
  id: 'ontdek-order',
  eventId: 'ontdek',
  type: 'order-confirmation',
  state: 'complete',
  startedAt: 0,
  footer: 'Bevestigd naar de klant, in het Duits',
  meta: {
    orderNumber: 'ORD-2026-2214',
    customer: 'Nordmann GmbH',
    contactRegel: 'meridian.nl',
    date: 'vandaag',
    deliveryDate: 'Week 38',
    deliveryWindow: 'Laadslot magazijn: dinsdag 7.00 uur',
    deliveryAddress: 'Zentrallager Nordmann\nBerlin, DE',
  },
  content: {
    items: [
      { artikel: 'Standaardassortiment, gemengd', aantal: 240 },
      { artikel: 'Aanvullende artikelen', aantal: 60 },
      { artikel: 'Verpakking met klantlogo', aantal: 24 },
    ],
  },
};

export const MAKEN_FACTUUR: Artifact = {
  id: 'ontdek-factuur',
  eventId: 'ontdek',
  type: 'invoice',
  state: 'complete',
  startedAt: 0,
  footer: 'Juiste valuta en klantvoorwaarden meegenomen',
  meta: {
    invoiceNumber: 'F-2026-1841',
    date: 'vandaag',
    afzender: 'MERIDIAN',
    afzenderSub: 'Levering aan zakelijke klanten',
    customer: 'Nordmann GmbH',
    to: 'Zentrallager Berlin\nDuitsland · facturatie in EUR',
    terms: '30 dagen · levering in overleg',
  },
  content: {
    lines: [
      { omschrijving: 'Levering order ORD-2026-2214', aantal: 1, prijs: 14680, totaal: 14680 },
      { omschrijving: 'Verzend- en administratiekosten', aantal: 1, prijs: 240, totaal: 240 },
    ],
  },
};

export const MAKEN_PLANNING: Artifact = {
  id: 'ontdek-planning',
  eventId: 'ontdek',
  type: 'calendar-item',
  state: 'complete',
  startedAt: 0,
  footer: 'Ingepland ruim voor de leverweek',
  meta: {},
  content: {
    slot: {
      wanneer: 'week 37, ma t/m wo',
      duur: '3 dagdelen',
      voor: 'het uitvoerende team',
      onderwerp: 'Order Nordmann klaarmaken (2214)',
      details: [
        'Materiaal en capaciteit zijn gereserveerd',
        'Levering in week 38 is met de klant bevestigd',
      ],
    },
  },
};

/* ------------------------------------------------------------------ */
/* Scène-specifieke copy                                               */
/* ------------------------------------------------------------------ */

export const BRIEF_STAPPEN = [
  { label: 'Lezen', body: 'in de taal van de klant (NL/EN/DE/FR)' },
  { label: 'Controleren', body: 'klant, afspraken en beschikbaarheid erbij' },
  { label: 'Uitvoeren', body: 'antwoord en vervolgstappen klaarzetten' },
];

export const DENKEN_CHECKS = [
  { label: 'Klant en voorwaarden', value: 'Nordmann GmbH, EUR, btw verlegd, 30 dagen' },
  { label: 'Beschikbaarheid', value: 'leverbaar, levering week 38 haalbaar' },
  { label: 'Afspraken', value: 'klantspecifieke prijs- en levervoorwaarden toegepast' },
];

export const DENKEN_REASONING = [
  'De bestelling past binnen de beschikbaarheid en raakt geen andere klanten.',
  'De klantspecifieke prijsafspraak en betaaltermijn (30 dagen) zijn automatisch toegepast.',
  'De leverweek is pas toegezegd nadat capaciteit en planning gecheckt waren.',
];

export const SYSTEMEN = [
  { label: 'ERP · administratie', detail: 'orders en klanten' },
  { label: 'Facturatie', detail: 'facturen en betalingen' },
  { label: 'Planning', detail: 'capaciteit en levering' },
  { label: 'Klantkanalen', detail: 'mail · chat · social' },
];

export const TEAM_AGENTS = ['Verkoop', 'Uitvoering', 'Planning', 'Facturatie'];

/** De geavanceerde agents van stap 7. */
export interface VooruitAgent {
  type: string;
  titel: string;
  body: string;
  voorbeeld: string;
}

export const VOORUIT_AGENTS: VooruitAgent[] = [
  {
    type: 'Voorspellend',
    titel: 'Vraagvoorspelling',
    body: 'Combineert verkoophistorie, seizoenspatronen en externe signalen om drukte en vraag te voorspellen, zodat inkoop, planning en bezetting vooruit geregeld worden.',
    voorbeeld: 'Piek over zes weken? De planning is daar nu al op ingericht.',
  },
  {
    type: 'Kennis & RAG',
    titel: 'Kennis uit uw eigen documenten',
    body: 'Ontsluit uw handleidingen, contracten, prijsafspraken en dossiers, zodat iedereen direct het juiste, onderbouwde antwoord heeft, met bronvermelding.',
    voorbeeld: 'Wat is met deze klant afgesproken over levertijden? Direct paraat, met bron.',
  },
  {
    type: 'Autonome monitoring',
    titel: 'Regels en afspraken bewaken',
    body: 'Volgt continu wijzigingen in regels, tarieven of afspraken die voor u gelden en waarschuwt vóórdat het een probleem wordt.',
    voorbeeld: 'Een voorwaarde of tarief verandert? U hoort het dezelfde dag, niet achteraf.',
  },
  {
    type: 'Marktintelligentie',
    titel: 'Markt- en prijsmonitoring',
    body: 'Volgt prijzen, aanbod en trends in uw markt, zodat u proactief kunt inspelen op kansen in plaats van achteraf te reageren.',
    voorbeeld: 'Een concurrent verandert zijn aanbod: signaal zodat u op tijd kunt bijsturen.',
  },
];

export interface OogstStat {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  literal?: string;
}

export const OOGST_STATS: OogstStat[] = [
  { value: 40, prefix: '~', suffix: '%', label: 'minder tijd aan terugkerend werk' },
  { value: 2, prefix: '1–', suffix: ' wk', label: 'van kennismaking tot eerste agent live' },
  { value: 4, prefix: '', suffix: '', label: 'talen beantwoord, zonder extra mensen', literal: '4' },
];
