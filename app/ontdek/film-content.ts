/**
 * Copy en inhoud van /ontdek: zeven zakelijke hoofdstukken die samen
 * het verhaal Probleem -> Mechanisme -> Vertrouwen -> Actie vertellen.
 *
 * Schrijfregels (uit het onderzoek): u-vorm, nuchter, kop <= 8 woorden,
 * body 15-40 woorden, één idee per hoofdstuk. Geen "robot", geen
 * "magie"; het frame is de digitale collega met uw handen aan het
 * stuur.
 */

export interface Hoofdstuk {
  id: string;
  nummer: string;
  eyebrow: string;
  titel: string;
  titelAccent: string;
  body: string;
  beats: number;
}

export const HOOFDSTUKKEN: Hoofdstuk[] = [
  {
    id: 'maandag',
    nummer: '01',
    eyebrow: '01 · Maandagochtend',
    titel: 'Veertig mailtjes.',
    titelAccent: 'Waar begint u?',
    body:
      'Offerteaanvragen, factuurvragen, bestellingen. Het meeste is routine, maar het moet wel vandaag. En het loopt dwars door uw eigen werk heen.',
    beats: 3,
  },
  {
    id: 'collega',
    nummer: '02',
    eyebrow: '02 · De digitale collega',
    titel: 'Geen robot.',
    titelAccent: 'Een collega.',
    body:
      'Software doet taken. Een collega denkt de stappen ertussen: lezen, opzoeken, afwegen, klaarzetten. Dat is wat een agent is. Niet meer, niet minder.',
    beats: 1,
  },
  {
    id: 'denkt',
    nummer: '03',
    eyebrow: '03 · Zo denkt hij',
    titel: 'Elke stap',
    titelAccent: 'leesbaar.',
    body:
      'Voor elk antwoord kijkt de agent eerst na wat er klopt. En elke afweging wordt vastgelegd, zodat u altijd kunt teruglezen waarom iets is gebeurd.',
    beats: 3,
  },
  {
    id: 'levert',
    nummer: '04',
    eyebrow: '04 · Hij levert',
    titel: 'Klaar voor',
    titelAccent: 'verzending.',
    body:
      'Geen samenvatting van wat u zou kunnen doen, maar het werk zelf: de offerte, het antwoord, de orderbevestiging. Opgesteld zoals uw mensen dat doen.',
    beats: 3,
  },
  {
    id: 'stuur',
    nummer: '05',
    eyebrow: '05 · U houdt het stuur',
    titel: 'Bij twijfel',
    titelAccent: 'stopt hij.',
    body:
      'De agent werkt binnen grenzen die u samen afspreekt. Wat daarbuiten valt, legt hij bij u neer. Als een copiloot: hij vliegt, u beslist.',
    beats: 2,
  },
  {
    id: 'grenzen',
    nummer: '06',
    eyebrow: '06 · Wat Factum niet doet',
    titel: 'Grenzen,',
    titelAccent: 'zwart op wit.',
    body:
      'Eerlijk is eerlijk: ongeveer één op de tien gevallen kijkt u zelf even na. En een aantal dingen doet de agent principieel niet.',
    beats: 4,
  },
  {
    id: 'begin',
    nummer: '07',
    eyebrow: '07 · Begin klein',
    titel: 'Werk hem in als een',
    titelAccent: 'nieuwe collega.',
    body:
      'Eén proces, een vaste bouwprijs, en binnen twee weken draait de eerste versie. Bevalt het niet, dan stopt het daar. Zo simpel mag het zijn.',
    beats: 4,
  },
];

/* ------------------------------------------------------------------ */
/* Inhoud per hoofdstuk                                                */
/* ------------------------------------------------------------------ */

export const MAANDAG_BERICHTEN = [
  { van: 'inkoop@bouwbedrijfhendriks.nl', regel: 'Offerte 40 m2 eiken vloerdelen?' },
  { van: 'administratie@dekort.nl', regel: 'Toeslag op factuur 2026-0341?' },
  { van: 'j.smit@smitafbouw.nl', regel: 'Bestelling: 12 zakken egaline' },
];

export const DENKT_LOG = [
  'Klant herkend: Bouwbedrijf Hendriks, betaalafspraak 30 dagen.',
  'Voorraad gecheckt: 62 m2 eiken op locatie C-2.',
  'Staffelprijs van toepassing. Concept klaargezet.',
];

export const LEVERT_DOCUMENT = {
  soort: 'Offerte',
  nummer: 'OFF-2026-118',
  klant: 'Bouwbedrijf Hendriks',
  regels: [
    { omschrijving: '40 m2 eiken vloerdelen, geschaafd', bedrag: '€ 2.480,00' },
    { omschrijving: 'Levering week 12, af magazijn', bedrag: '€ 200,00' },
  ],
  totaal: '€ 2.680,00 excl. btw',
};

export const NIET_DOEN = [
  'Verstuurt nooit iets zonder uw akkoord.',
  'Verzint geen bedragen en geen levertijden.',
  'Beslist niet over uw klanten of uw prijzen.',
  'Werkt niet buiten de afspraken die u zelf zet.',
];

export interface BeginStat {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  literal?: string;
}

export const BEGIN_STATS: BeginStat[] = [
  { value: 1, prefix: '', suffix: ' proces', label: 'om mee te beginnen', literal: '1' },
  { value: 2, prefix: '1–', suffix: ' wk', label: 'tot de eerste versie live staat' },
  { value: 40, prefix: '~', suffix: '%', label: 'minder tijd aan terugkerend werk' },
];
