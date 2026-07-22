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
      'Een webshop, een beheerder, een groothandel, een praktijk: ander werk, dezelfde ochtend. Het meeste is routine, maar het moet wel vandaag.',
    beats: 4,
  },
  {
    id: 'collega',
    nummer: '02',
    eyebrow: '02 · De digitale collega',
    titel: 'Geen robot.',
    titelAccent: 'Een collega.',
    body:
      'Software doet taken. Een collega denkt de stappen ertussen: lezen, opzoeken, afwegen, klaarzetten. En dezelfde agent kan meerdere rollen spelen.',
    beats: 2,
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
      'Van een los antwoord tot een hele keten: order aannemen, voorraad checken, monteur inplannen, factuur klaarzetten. Meerdere stappen, meerdere systemen, één agent.',
    beats: 4,
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
  { van: 'klant · webshop', regel: 'Waar blijft bestelling #8412?' },
  { van: 'huurder · vastgoedbeheer', regel: 'De cv-ketel doet het niet.' },
  { van: 'inkoop · groothandel', regel: 'Offerte voor 40 m2 eiken?' },
  { van: 'patiënt · praktijk', regel: 'Kan mijn afspraak naar donderdag?' },
];

/** De rollen die één en dezelfde agent kan spelen: de breedte van het vak. */
export const COLLEGA_ROLLEN = [
  'Klantenservice',
  'Administratie',
  'Planning',
  'Inkoop',
  'Facturatie',
  'Offertes',
];

export const DENKT_KNOPEN = ['dossier', 'agenda', 'beleid', 'toon'];

export const DENKT_LOG = [
  'Vraag herkend: afspraak verzetten, praktijk De Linde.',
  'Agenda gecheckt: donderdag 10.15 uur is vrij.',
  'Herinnering ingepland, bevestiging klaargezet.',
];

/** Drie soorten werk uit drie totaal verschillende bedrijven. */
export const LEVERT_DOCUMENTEN = [
  {
    soort: 'Antwoord',
    kop: 'Track & trace bestelling #8412',
    detail: 'Webshop · verzonden, levering morgen',
    slot: 'klaar om te versturen',
  },
  {
    soort: 'Werkbon',
    kop: 'Monteur ingepland: cv-storing',
    detail: 'Vastgoedbeheer · woensdag 8.00 uur',
    slot: 'huurder krijgt bevestiging',
  },
  {
    soort: 'Offerte',
    kop: 'OFF-2026-118 · € 2.680,00',
    detail: 'Groothandel · staffelprijs toegepast',
    slot: 'concept, wacht op akkoord',
  },
  {
    soort: 'Volledige keten',
    kop: 'Order 8412: van bestelling tot factuur',
    detail: 'Voorraad · planning · verzending · facturatie, 8 stappen in 3 systemen',
    slot: 'afgerond, logboek compleet',
  },
];

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
