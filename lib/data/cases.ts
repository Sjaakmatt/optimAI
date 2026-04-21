export interface CaseStudy {
  slug: string;
  klant: string;
  branche: string;
  regio: string;
  tagline: string;
  intro: string;
  uitdaging: string[];
  oplossing: string[];
  resultaat: Array<{ metric: string; label: string }>;
  quote?: { text: string; by: string; role: string };
  doorlooptijd: string;
}

export const CASES: CaseStudy[] = [
  {
    slug: 'nordveld-groothandel',
    klant: 'Nordveld Groothandel',
    branche: 'Bouwmaterialen',
    regio: 'West-Friesland',
    tagline: 'Zeven afdelingen. Eén digitale collega.',
    intro:
      'Nordveld is een groothandel in bouwmaterialen met 34 medewerkers. De binnendienst was elke dag uren bezig met mails, offertes, ordercoördinatie en transportplanning. We hebben één AI-platform gebouwd dat acht afdelingsagents aanstuurt.',
    uitdaging: [
      'Gemiddeld 70 mails per dag, vaak hetzelfde in toon maar telkens anders in inhoud',
      'Offertes werden vaak pas na een dag verstuurd. Aanbestedingen gingen zo verloren',
      'Vertragingen bij leveranciers kwamen laat op tafel. Klanten hoorden het te laat',
      'Klachten werden ad hoc afgehandeld. Coulance-beleid zat alleen in de hoofden van mensen',
    ],
    oplossing: [
      'Eén orchestrator (De Dirigent) verdeelt inkomend werk over 7 afdelingsagents',
      'Elke agent past beleidsregels toe die Nordveld zelf inricht en aanpast',
      'Klantservice, Inkoop, Voorraad, Orders, Facturatie en Verzending werken samen per zaak',
      'Werkitems per afdeling. Mensen alleen aan de knoppen bij uitzonderingen',
    ],
    resultaat: [
      { metric: '182 min', label: 'per dag bespaard op binnendienst' },
      { metric: '€ 1.650', label: 'per maand aan loonuren' },
      { metric: '24u → 9 min', label: 'gemiddelde reactietijd offertes' },
      { metric: '0', label: 'verloren klachten door pro-actieve communicatie' },
    ],
    quote: {
      text:
        'Onze mensen doen eindelijk weer het werk waar ze voor zijn aangenomen. De saaie mails doet de agent.',
      by: 'Sietse Noordveld',
      role: 'Directeur Nordveld Groothandel',
    },
    doorlooptijd: '6 weken tot live',
  },
  {
    slug: 'hendriks-installatie',
    klant: 'Hendriks Installatietechniek',
    branche: 'Installatietechniek',
    regio: 'Utrecht',
    tagline: 'Van offerte tot eindfactuur in één vloeiende keten.',
    intro:
      'Een installatiebedrijf met 22 monteurs en een klein kantoor. De werkvoorbereiding zat tot aan de oren in handmatig werk. Offertes uittikken, materialen bestellen, ritten plannen, facturen maken. Eén agent neemt die hele keten nu over.',
    uitdaging: [
      'Werkvoorbereiders waren 60% van hun tijd kwijt aan administratie',
      'Facturatie liep dagen achter op oplevering. Dat raakte de cashflow',
      'Materiaal werd soms dubbel besteld omdat het voorraad-overzicht ontbrak',
      'Klanten belden vaak voor status. Dat kostte ook weer tijd',
    ],
    oplossing: [
      'Agent koppelt offerte, materiaallijst, bestelling, rit en factuur als één flow',
      'Automatische klant-updates per WhatsApp: "monteur vertrokken", "onderweg"',
      'Dubbele bestellingen voorkomen door centrale voorraad-check',
      'Factuur klaar op de dag van oplevering',
    ],
    resultaat: [
      { metric: '−65%', label: 'administratietijd werkvoorbereiding' },
      { metric: '+4 dagen', label: 'snellere factuur, betere cashflow' },
      { metric: '€ 2.100', label: 'per maand minder dubbel bestelde voorraad' },
      { metric: '−80%', label: 'status-telefoontjes van klanten' },
    ],
    quote: {
      text:
        'We hebben geen extra mensen aangenomen terwijl we 30% in omzet zijn gegroeid. Dat zegt genoeg.',
      by: 'Martijn Hendriks',
      role: 'Eigenaar',
    },
    doorlooptijd: '8 weken tot live',
  },
  {
    slug: 'bakker-transport',
    klant: 'Bakker Transport',
    branche: 'Transport & logistiek',
    regio: 'Friesland',
    tagline: 'Planning die meedenkt. Niet die we moeten bijhouden.',
    intro:
      'Een transportbedrijf met 18 wagens. De planner hield ritten handmatig bij. Paste op het laatste moment aan bij file of pech. En belde klanten zelf wanneer het ergens fout ging. De agent doet nu de communicatie en het zoekwerk.',
    uitdaging: [
      'Bij vertragingen moest de planner zelf klanten bellen of mailen. Niet altijd gebeurde dat',
      'Alternatief transporteur inhuren bij overmacht kostte minuten zoeken',
      'Ritten combineren gebeurde uit hoofd. Niet altijd optimaal',
    ],
    oplossing: [
      'Bij file of incident signaleert de agent de geraakte klanten en stuurt zelf een mail',
      'Bij overmacht vergelijkt de agent drie alternatieve transporteurs en legt het voor',
      'Bij elke nieuwe order krijgt de planner een rit-combinatie-voorstel',
    ],
    resultaat: [
      { metric: '+22%', label: 'ritten gecombineerd' },
      { metric: '−90%', label: 'escalaties over late leveringen' },
      { metric: '47 min', label: 'gemiddeld bespaard per incident-afhandeling' },
    ],
    doorlooptijd: '5 weken tot live',
  },
];

export const CASE_BY_SLUG = CASES.reduce<Record<string, CaseStudy>>((acc, c) => {
  acc[c.slug] = c;
  return acc;
}, {});
