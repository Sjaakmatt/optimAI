import type { Artifact } from '@/lib/types';

/**
 * Copy, timing en fixtures voor de wandeling op /ontdek.
 *
 * Rode draad: één fictieve exporteur ("Bolster Export", bloembollen en
 * zaden, levert aan retailers in dertig landen). De film laat zien hoe
 * één agent daar meertalig orders afhandelt, en groeit tot een
 * multi-agent orderketen en geavanceerde, vooruitkijkende agents.
 *
 * De film bestaat uit hoofdstukken die elk in "beats" opbouwen. De
 * controller (OntdekFilm) verhoogt de beat op beatDelayMs zolang er
 * wordt afgespeeld en gaat holdMs na de laatste beat door naar de
 * volgende halte. Een halte met pauseAtBeat wacht op de bezoeker.
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
    titel: 'Er valt werk binnen.',
    titelAccent: 'In vier talen.',
    intro:
      'Bolster Export levert bloembollen aan retailers in dertig landen. De agent leest elke order mee, ook als hij in het Duits, Engels of Frans binnenkomt.',
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
      'Voor elke order kijkt de agent na wat er klopt: klant, valuta, voorraad, seizoen, exportpapieren. En u kunt altijd teruglezen waarom hij iets deed.',
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
      'Orderbevestiging, factuur met de juiste valuta en exportdocumentatie, verpakkingsplanning voor de najaarspiek: de agent zet het klaar zoals uw mensen dat doen.',
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
      'Via een adapter per systeem werkt de agent in het ERP, de facturatie, de magazijnplanning en alle klantkanalen tegelijk: mail, chat en social.',
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
      'Een standaardorder loopt door. Maar vraagt een retailer om afwijkende private-label-verpakking, dan stopt de agent en legt hij de keuze bij u neer.',
    beats: 3,
    beatDelayMs: 1500,
    holdMs: 4000,
    pauseAtBeat: 1,
  },
  {
    id: 'team',
    eyebrow: 'Halte 6 · De orderketen',
    titel: 'Grote klussen doet hij',
    titelAccent: 'samen.',
    intro:
      'Eén order loopt van sales naar verpakking, logistiek en facturatie. Agents geven het werk aan elkaar door, met een dirigent die het overzicht houdt.',
    beats: 3,
    beatDelayMs: 1500,
    holdMs: 4500,
  },
  {
    id: 'vooruit',
    eyebrow: 'Halte 7 · Vooruitkijken',
    titel: 'En dan wordt het pas',
    titelAccent: 'echt interessant.',
    intro:
      'Naast het dagelijkse werk zijn er agents die vooruitkijken: vraag voorspellen, regels bewaken, kennis ontsluiten en de markt volgen.',
    beats: 4,
    beatDelayMs: 1500,
    holdMs: 5500,
  },
  {
    id: 'oogst',
    eyebrow: 'Halte 8 · De oogst',
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
  footer: 'Concept in het Duits klaargezet, wacht op uw akkoord',
  meta: {
    from: 'agent@bolster-export.nl',
    to: 'einkauf@gartenwelt-berlin.de',
    subject: 'Re: Bestellung Tulpenzwiebeln Herbstsaison',
    date: 'vandaag · 09:12',
    reasoning: [
      'Order herkend: 18.000 tulpenbollen, gemengd assortiment, levering week 38.',
      'Beantwoord in de taal van de klant (Duits), toon uit eerdere mails overgenomen.',
      'Voorraad en verpakkingscapaciteit gecheckt vóór het toezeggen van de leverweek.',
    ],
  },
  content: {
    paragraphs: [
      'Sehr geehrte Frau Weber,',
      'vielen Dank für Ihre Bestellung von 18.000 Tulpenzwiebeln für die Herbstsaison. Die Lieferung ist für Woche 38 eingeplant; die Auftragsbestätigung und die Exportdokumente folgen in separater Mail.',
      'Mit freundlichen Grüßen,\nBolster Export',
    ],
  },
};

export const MAKEN_ORDER: Artifact = {
  id: 'ontdek-order',
  eventId: 'ontdek',
  type: 'order-confirmation',
  state: 'complete',
  startedAt: 0,
  footer: 'Bevestigd naar de retailer, in het Duits',
  meta: {
    orderNumber: 'ORD-2026-2214',
    customer: 'Gartenwelt Berlin GmbH',
    contactRegel: 'bolster-export.nl',
    date: 'vandaag',
    deliveryDate: 'Week 38 · najaarslevering',
    deliveryWindow: 'Laadslot magazijn: dinsdag 7.00 uur',
    deliveryAddress: 'Zentrallager Gartenwelt\nBerlin-Spandau, DE',
  },
  content: {
    items: [
      { artikel: 'Tulp Triumph, gemengd 12/+', aantal: 12000 },
      { artikel: 'Tulp Darwin hybride 12/+', aantal: 6000 },
      { artikel: 'Displaydozen private label', aantal: 240 },
    ],
  },
};

export const MAKEN_FACTUUR: Artifact = {
  id: 'ontdek-factuur',
  eventId: 'ontdek',
  type: 'invoice',
  state: 'complete',
  startedAt: 0,
  footer: 'Multi-valuta en exportdocumentatie meegenomen',
  meta: {
    invoiceNumber: 'F-2026-1841',
    date: 'vandaag',
    afzender: 'BOLSTER EXPORT',
    afzenderSub: 'Bloembollen & zaden',
    customer: 'Gartenwelt Berlin GmbH',
    to: 'Zentrallager Berlin-Spandau\nDuitsland · facturatie in EUR',
    terms: '30 dagen · fytosanitair certificaat bijgevoegd',
  },
  content: {
    lines: [
      { omschrijving: 'Tulpenbollen najaarsorder ORD-2026-2214', aantal: 1, prijs: 14680, totaal: 14680 },
      { omschrijving: 'Exportdocumentatie en keuring', aantal: 1, prijs: 240, totaal: 240 },
    ],
  },
};

export const MAKEN_PLANNING: Artifact = {
  id: 'ontdek-planning',
  eventId: 'ontdek',
  type: 'calendar-item',
  state: 'complete',
  startedAt: 0,
  footer: 'Ingepland rond de najaarspiek',
  meta: {},
  content: {
    slot: {
      wanneer: 'week 37, ma t/m wo',
      duur: '3 dagdelen',
      voor: 'verpakkingslijn 2',
      onderwerp: 'Verpakken order Gartenwelt (18.000 bollen)',
      details: [
        'Displaydozen private label staan dinsdag klaar',
        'Laadslot magazijn week 38 is al gereserveerd',
      ],
    },
  },
};

/* ------------------------------------------------------------------ */
/* Scène-specifieke copy                                               */
/* ------------------------------------------------------------------ */

export const BRIEF_STAPPEN = [
  { label: 'Lezen', body: 'in de taal van de klant (NL/EN/DE/FR)' },
  { label: 'Opzoeken', body: 'klant, voorraad en seizoen erbij' },
  { label: 'Doen', body: 'antwoord en vervolgstappen klaarzetten' },
];

export const DENKEN_CHECKS = [
  { label: 'Klant en valuta', value: 'Gartenwelt Berlin, EUR, btw verlegd, 30 dagen' },
  { label: 'Voorraad en seizoen', value: '31.000 Triumph op voorraad, najaarspiek +12% vs vorig jaar' },
  { label: 'Exportdocumenten', value: 'fytosanitair certificaat DE vereist, sjabloon klaar' },
];

export const DENKEN_REASONING = [
  'De vraag naar Triumph-bollen ligt dit najaar naar verwachting 12% hoger dan vorig seizoen; de voorraad kan deze order dragen zonder andere klanten te raken.',
  'Duitsland vraagt een fytosanitair certificaat; dat sjabloon staat klaar en gaat mee met de factuur.',
  'De leverweek is pas toegezegd nadat verpakkingslijn 2 en het laadslot gecheckt waren.',
];

export const SYSTEMEN = [
  { label: 'ERP · voorraad', detail: 'orders en partijen' },
  { label: 'Facturatie', detail: 'multi-valuta, export' },
  { label: 'Magazijnplanning', detail: 'laadsloten, lijnen' },
  { label: 'Klantkanalen', detail: 'mail · chat · social' },
];

export const TEAM_AGENTS = ['Sales', 'Verpakking', 'Logistiek', 'Facturatie'];

/** De geavanceerde agents van halte 7. */
export interface VooruitAgent {
  type: string;
  titel: string;
  body: string;
  voorbeeld: string;
}

export const VOORUIT_AGENTS: VooruitAgent[] = [
  {
    type: 'Voorspellend',
    titel: 'Seizoensvraag-forecasting',
    body: 'Combineert verkoopdata per land, weerpatronen en plantseizoenen om vraagpieken te voorspellen, zodat inkoop en verpakking vooruit gepland worden.',
    voorbeeld: 'Hoeveel tulpenbollen heeft de Duitse retail komend najaar nodig?',
  },
  {
    type: 'Kennis & RAG',
    titel: 'Compliance-assistent certificering',
    body: 'Ontsluit alle kwaliteits- en certificeringsdocumentatie (SKAL, MPS, SKBH), zodat sales direct het juiste, land-specifieke antwoord heeft.',
    voorbeeld: 'Een Franse retailer vraagt naar bio-certificering: het juiste SKAL-bewijs, direct.',
  },
  {
    type: 'Autonome monitoring',
    titel: 'Fytosanitaire bewaking, 30 landen',
    body: 'Volgt continu wijzigingen in import- en fytosanitaire eisen per exportland en waarschuwt vóórdat een zending geweigerd kan worden.',
    voorbeeld: 'Nieuw invoervereiste in Polen? Melding vandaag, niet bij de grens.',
  },
  {
    type: 'Klantintelligentie',
    titel: 'Prijs- en marktmonitoring',
    body: 'Monitort assortiment, prijzen en promoties van concurrenten en retailtrends, zodat sales proactief kan inspelen op private-label-kansen.',
    voorbeeld: 'Concurrent lanceert een bio-bollenlijn in Duitsland: signaal voor het eigen SKAL-assortiment.',
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
  { value: 40, prefix: '~', suffix: '%', label: 'minder tijd aan terugkerend orderwerk' },
  { value: 2, prefix: '1–', suffix: ' wk', label: 'van kennismaking tot eerste agent live' },
  { value: 4, prefix: '', suffix: '', label: 'talen beantwoord, zonder extra mensen', literal: '4' },
];
