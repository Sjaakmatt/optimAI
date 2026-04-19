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
    tagline: 'Zeven afdelingen, één digitale collega.',
    intro:
      'Nordveld is een groothandel in bouwmaterialen met 34 medewerkers. Mails, offertes, ordercoördinatie en transportplanning kostten het binnendienst-team dagelijks uren. We bouwden één AI-platform dat acht afdelingsagents aanstuurt.',
    uitdaging: [
      'Gemiddeld 70+ mails per dag, veel identiek in toon maar verschillend in inhoud',
      'Offertes werden vaak pas na een dag verstuurd — verloren aanbestedingen',
      'Vertragingen bij leveranciers kwamen laat op tafel, klanten hoorden het te laat',
      'Klachten werden ad-hoc afgehandeld, coulance-beleid zat alleen in hoofden',
    ],
    oplossing: [
      'Eén orchestrator (De Dirigent) verdeelt inkomend werk over 7 afdelingsagents',
      'Elk agent past beleidsregels toe die Nordveld zelf inricht en aanpast',
      'Klantservice, Inkoop, Voorraad, Orders, Facturatie, Verzending samen per zaak',
      'Werkitems per afdeling: mensen alleen aan de knoppen bij uitzonderingen',
    ],
    resultaat: [
      { metric: '182 min', label: 'per dag bespaard op binnendienst' },
      { metric: '€ 1.650', label: 'per maand aan loonuren' },
      { metric: '24u → 9 min', label: 'gemiddelde reactietijd offertes' },
      { metric: '0', label: 'verloren klachten door pro-actieve comms' },
    ],
    quote: {
      text:
        '"Onze mensen doen eindelijk weer het werk waar ze voor zijn aangenomen. De saaie mails doet de agent."',
      by: 'Sietse Noordveld',
      role: 'Directeur Nordveld Groothandel',
    },
    doorlooptijd: '6 weken tot live',
  },
  {
    slug: 'van-der-berg-installatie',
    klant: 'Van der Berg Installatietechniek',
    branche: 'Installatietechniek',
    regio: 'Utrecht',
    tagline: 'Van offerte tot eindfactuur in één vloeiende keten.',
    intro:
      'Een installatiebedrijf met 22 monteurs en een klein kantoor. De werkvoorbereiding liep vol met handmatig werk: offertes uittikken, materialen bestellen, ritten plannen, facturen maken. Eén agent neemt die keten nu over.',
    uitdaging: [
      'Werkvoorbereiders spendeerden 60% van de tijd aan administratie',
      'Facturatie liep dagen achter op oplevering — cashflow-impact',
      'Materiaal werd soms dubbel besteld omdat voorraad-overzicht ontbrak',
      'Klanten belden nog vaak voor status, wat tijd kostte',
    ],
    oplossing: [
      'Agent koppelt offerte → materiaallijst → bestelling → rit → factuur als één flow',
      'Automatische klant-updates per WhatsApp: "monteur vertrokken", "onderweg"',
      'Dubbele bestellingen voorkomen door centrale voorraad-check',
      'Factuur klaar op dag van oplevering',
    ],
    resultaat: [
      { metric: '−65%', label: 'administratietijd werkvoorbereiding' },
      { metric: '+4 dagen', label: 'snellere factuur = betere cashflow' },
      { metric: '€ 2.100', label: 'per maand minder dubbel bestelde voorraad' },
      { metric: '−80%', label: 'status-telefoontjes van klanten' },
    ],
    quote: {
      text:
        '"We hebben geen extra mensen aangenomen terwijl we in omzet 30% zijn gegroeid. Dat zegt genoeg."',
      by: 'Peter van der Berg',
      role: 'Eigenaar',
    },
    doorlooptijd: '8 weken tot live',
  },
  {
    slug: 'bakker-transport',
    klant: 'Bakker Transport',
    branche: 'Transport & logistiek',
    regio: 'Friesland',
    tagline: 'Planning die meedenkt, niet die we moeten bijhouden.',
    intro:
      'Een transportbedrijf met 18 wagens. De planner hield ritten handmatig bij, paste op het laatste moment aan bij file of pech, en belde klanten wanneer het fout ging. De agent doet nu de communicatie en alternatieven-zoektocht.',
    uitdaging: [
      'Bij vertragingen moest de planner zelf klanten bellen of mailen — niet altijd gebeurde het',
      'Alternatief transporteur inhuren bij overmacht kostte minuten zoeken',
      'Ritten combineren gebeurde uit hoofd, niet altijd optimaal',
    ],
    oplossing: [
      'Bij file/incident signaleert agent de geraakte klanten, stuurt pro-actief mail',
      'Bij overmacht: agent vergelijkt drie alternatieve transporteurs en legt voor',
      'Rit-combinatie-voorstel bij elke nieuwe order',
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
