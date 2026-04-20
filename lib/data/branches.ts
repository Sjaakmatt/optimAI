export interface BrancheStat {
  metric: string;
  label: string;
}

export interface BrancheAgent {
  naam: string;
  doet: string;
}

export interface Branche {
  slug: string;
  label: string;
  keyword: string;
  heroEyebrow: string;
  heroTitle: string;
  heroItalic: string;
  intro: string;
  lede: string;
  pijnpunten: string[];
  oplossing: string[];
  agents: BrancheAgent[];
  stats: BrancheStat[];
  caseSlug: string;
  context: string;
  waaromNu: string;
  aanpak: string;
}

export const BRANCHES: Branche[] = [
  {
    slug: 'groothandel',
    label: 'Groothandel',
    keyword: 'AI-agent voor groothandel',
    heroEyebrow: 'Branche · Groothandel',
    heroTitle: 'AI-agent voor de groothandel.',
    heroItalic: 'Minder mails, snellere offertes, stabielere marges.',
    intro:
      'Groothandels hebben één gemeenschappelijke pijn: de binnendienst verzuipt in mails, offerte-aanvragen en order-coördinatie. Een AI-agent haalt dat werk weg — mits hij kan koppelen met uw ERP, uw prijslijsten en uw voorraad-administratie.',
    lede:
      'Specialist groothandels in bouwmaterialen, installatiemateriaal, technische producten, food en non-food. Waar offertes in uren verouderen en elke telefooncirkel tien minuten kost.',
    pijnpunten: [
      'Zestig tot honderd binnenkomende mails per dag, waarvan tachtig procent routine (offerte-aanvragen, status, facturen).',
      'Offertes duren uren tot dagen, terwijl concurrenten dezelfde dag reageren.',
      'Klantspecifieke prijsafspraken zitten in hoofden van vertegenwoordigers, niet in systemen.',
      'Voorraad-stand wijkt af van wat het ERP zegt, met te-laat-leveringen en verloren opdrachten als gevolg.',
      'Debiteurenbeheer vraagt aandacht, maar blijft liggen omdat het dagelijkse werk voorgaat.',
    ],
    oplossing: [
      'Eén orchestrator-agent verdeelt binnenkomende mails over gespecialiseerde afdelings-agents.',
      'Offertes worden binnen minuten opgesteld met actuele prijzen, klantkortingen en marge-regels — klaar voor uw akkoord.',
      'Orderverwerking gebeurt automatisch inclusief kredietcheck, voorraadcheck, bevestigingsmail en ERP-boeking.',
      'Voorraadsignalen leiden automatisch tot inkoopvoorstellen binnen uw mandaat.',
      'Debiteuren-agent stuurt herinneringen met de toon die u voorschrijft per klantgroep.',
    ],
    agents: [
      {
        naam: 'Offerte-agent',
        doet: 'Leest mail, raadpleegt prijslijst en klantkortingen, stelt offerte op, stuurt door voor akkoord of verstuurt direct bij standaardwerk.',
      },
      {
        naam: 'Order-agent',
        doet: 'Kredietcheck, voorraadcheck, boeking in ERP, bevestigingsmail, koppeling met magazijn voor picklijst.',
      },
      {
        naam: 'Voorraad-agent',
        doet: 'Volgt minimum-niveaus, vergelijkt leveranciers, zet inkoopvoorstel klaar, binnen mandaat direct plaatsen.',
      },
      {
        naam: 'Facturatie-agent',
        doet: 'Facturen automatisch klaarzetten na levering, creditnota\'s bij retour, debiteurenopvolging per klantprofiel.',
      },
      {
        naam: 'Klachten-agent',
        doet: 'Klachten categoriseren, coulance-beleid toepassen, escalatie naar directie bij uitzonderingen.',
      },
    ],
    stats: [
      { metric: '182 min', label: 'per dag bespaard op binnendienst' },
      { metric: '24u → 9 min', label: 'reactietijd op offertes' },
      { metric: '€ 1.650', label: 'per maand aan loonuren' },
      { metric: '0', label: 'verloren klachten door pro-actieve opvolging' },
    ],
    caseSlug: 'nordveld-groothandel',
    context:
      'Nordveld Groothandel in bouwmaterialen draait sinds zes weken een platform met zeven afdelings-agents die samen één klantzaak afhandelen van binnenkomende mail tot verzonden factuur. De binnendienst doet nu het werk waar mensen goed in zijn: moeilijke klanten, complexe projecten, vertegenwoordiging.',
    waaromNu:
      'Groothandels die nu starten bouwen binnen een jaar een reactietijd op die concurrenten niet kunnen volgen. Niet omdat hun mensen harder werken, maar omdat routinewerk automatisch doorstroomt. Dat verschil zien klanten direct aan de hoeveelheid offertes die dezelfde dag binnenkomen.',
    aanpak:
      'We beginnen niet bij uw grootste pijn. We beginnen bij het meest voorspelbare proces — meestal offertes of orderbevestigingen — om binnen één tot twee weken een eerste agent live te krijgen. Uw mensen leren hoe ze het bijsturen. Daarna rollen we uit naar inkoop, voorraad, klachten en debiteuren.',
  },
  {
    slug: 'installatietechniek',
    label: 'Installatietechniek',
    keyword: 'AI-agent voor installatiebedrijf',
    heroEyebrow: 'Branche · Installatietechniek',
    heroTitle: 'AI-agent voor het installatiebedrijf.',
    heroItalic: 'Van werkbon tot factuur in één vloeiende keten.',
    intro:
      'Installatiebedrijven verliezen veel tijd aan werkvoorbereiding, materiaalbestelling en facturatie. Een AI-agent koppelt offerte, materiaallijst, bestelling, rit en factuur als één doorstromende keten — mits hij praat met uw werkbon-systeem, leveranciers-portals en boekhouding.',
    lede:
      'Voor elektrotechniek, werktuigbouw, klimaat, sanitair, dak en onderhoud. Waar monteurs het werk buiten doen, en kantoor structureel onder-bemand is voor het papierwerk.',
    pijnpunten: [
      'Werkvoorbereiders zijn zestig procent van hun tijd kwijt aan administratie in plaats van plannen.',
      'Facturatie loopt dagen achter op oplevering, wat direct de cashflow raakt.',
      'Materiaal wordt soms dubbel besteld doordat voorraad-overzicht per busje ontbreekt.',
      'Klanten bellen over status van hun werkbon omdat ze niets horen na de inmeting.',
      'Offertes voor klein onderhoud blijven dagen liggen terwijl concurrenten dezelfde avond reageren.',
    ],
    oplossing: [
      'Agent koppelt offerte, materiaallijst, bestelling bij leveranciers, ritplanning en factuur in één flow.',
      'Automatische klant-updates per e-mail of WhatsApp: "monteur vertrokken", "onderweg", "afgerond".',
      'Dubbele bestellingen voorkomen door centrale voorraad-check per bus en hoofdmagazijn.',
      'Factuur staat klaar op de dag van oplevering, niet dagen later.',
      'Kleine onderhoudsvragen worden automatisch ingepland op basis van routing en beschikbaarheid.',
    ],
    agents: [
      {
        naam: 'Werkbon-agent',
        doet: 'Leest inkomende aanvraag, stelt werkbon op met standaarduren en materiaal, plant inmeting of oplevert-afspraak.',
      },
      {
        naam: 'Materiaal-agent',
        doet: 'Stelt materiaallijst op per klus, vergelijkt leverancier-prijzen, plaatst bestelling binnen inkoopmandaat.',
      },
      {
        naam: 'Rit-agent',
        doet: 'Combineert ritten op geografie en werksoort, geeft monteurs optimale route, schuift automatisch bij calamiteit.',
      },
      {
        naam: 'Communicatie-agent',
        doet: 'Klant-updates bij vertrek, aankomst en oplevering via het kanaal dat de klant heeft aangegeven.',
      },
      {
        naam: 'Factuur-agent',
        doet: 'Factuur klaar op de dag van oplevering, met meerwerk en materiaal gekoppeld aan werkbon-registratie.',
      },
    ],
    stats: [
      { metric: '−65%', label: 'administratietijd werkvoorbereiding' },
      { metric: '+4 dagen', label: 'snellere factuur, betere cashflow' },
      { metric: '€ 2.100', label: 'per maand minder dubbel bestelde voorraad' },
      { metric: '−80%', label: 'status-telefoontjes van klanten' },
    ],
    caseSlug: 'van-der-berg-installatie',
    context:
      'Van der Berg Installatietechniek heeft 22 monteurs en een klein kantoor. Sinds acht weken live. Omzetgroei van 30% werd opgevangen zonder extra kantoorbezetting. De werkvoorbereiders doen nu plannings-werk in plaats van getik.',
    waaromNu:
      'Installatiebedrijven die een keten van werkbon-tot-factuur draaiend hebben, werken structureel profitabeler. De marge zit niet in uurtarief maar in doorstroom. Elke dag dat een factuur later de deur uit gaat, is liquiditeit die klant niet nodig heeft en u wel.',
    aanpak:
      'Eerste agent: vaak de factuur-agent, omdat cashflow-winst direct voelbaar is. Daarna werkbon-verwerking, materiaal-bestelling en klant-communicatie. Elke stap brengt meetbare tijdwinst binnen twee weken.',
  },
  {
    slug: 'transport-logistiek',
    label: 'Transport & logistiek',
    keyword: 'AI-agent voor transportbedrijf',
    heroEyebrow: 'Branche · Transport & logistiek',
    heroTitle: 'AI-agent voor het transportbedrijf.',
    heroItalic: 'Planning die meedenkt, niet die u moet bijhouden.',
    intro:
      'Transportbedrijven werken met kleine marges en weinig tijd voor bijkomstigheden. Een AI-agent neemt het zoek- en meldwerk over — ritten combineren, klanten informeren bij vertraging, alternatieven inschakelen bij overmacht. Zodat uw planner en chauffeurs kunnen rijden en plannen.',
    lede:
      'Voor nationale distributie, bouwlogistiek, koelvervoer, expediteurs en eigen vervoer. Waar files, laadtijden en laatste-minuut-wijzigingen de dagelijkse werkelijkheid zijn.',
    pijnpunten: [
      'Bij vertragingen moet de planner zelf bellen of mailen — gebeurt niet altijd in de hectiek.',
      'Alternatief transporteur inhuren bij overmacht kost minuten zoeken in een Excel-lijst.',
      'Ritten combineren gebeurt uit het hoofd — niet altijd de meest efficiënte combinatie.',
      'Klanten bellen voor status omdat ze geen update krijgen bij wijziging van de ETA.',
      'Rekening-courant met vaste klanten wordt niet meer nagelopen dan eens per maand, terwijl dat dagelijks kan.',
    ],
    oplossing: [
      'Bij file of incident signaleert de agent de geraakte klanten en stuurt direct een mail met nieuwe ETA.',
      'Bij overmacht vergelijkt de agent drie alternatieve transporteurs op prijs en beschikbaarheid en legt voor.',
      'Bij elke nieuwe order stelt de agent een rit-combinatie voor, op basis van bestaande planning en geografie.',
      'Klanten krijgen pro-actieve statusupdates bij elk ritmijlpaal (vertrek, onderweg, gelost).',
      'Facturatie per rit of per maand, met inkoopfacturen van charters automatisch gematcht.',
    ],
    agents: [
      {
        naam: 'Planning-agent',
        doet: 'Combineert nieuwe orders met bestaande ritten op geografie, gewicht en tijdvenster. Geeft planner altijd drie opties.',
      },
      {
        naam: 'Incident-agent',
        doet: 'Volgt verkeersdata en ritstatus. Bij vertraging: automatische klant-mail met nieuwe ETA, escalatie bij gevaar van contractbreuk.',
      },
      {
        naam: 'Charter-agent',
        doet: 'Bij overmacht: drie alternatieve transporteurs vergeleken op prijs, beschikbaarheid en klantvoorkeur, voorgelegd aan planner.',
      },
      {
        naam: 'Communicatie-agent',
        doet: 'Klant-updates bij vertrek, onderweg en gelost. Afzender is uw bedrijfsnaam, toon past bij uw huisstijl.',
      },
      {
        naam: 'Facturatie-agent',
        doet: 'Rittenstaat omzetten naar factuur of rittenfactuur per maand, inkoopfacturen van charters matchen aan uitgaande facturen.',
      },
    ],
    stats: [
      { metric: '+22%', label: 'ritten gecombineerd' },
      { metric: '−90%', label: 'escalaties over late leveringen' },
      { metric: '47 min', label: 'gemiddeld bespaard per incident-afhandeling' },
    ],
    caseSlug: 'bakker-transport',
    context:
      'Bakker Transport heeft 18 wagens en één planner. Sinds vijf weken draait het incident-scenario automatisch. De planner kan nu plannen in plaats van branden blussen. Chauffeurs krijgen rit-combinaties die niemand eerder had bedacht.',
    waaromNu:
      'Transportbedrijven werken met marges die niet veel ruimte bieden voor operationele inefficiëntie. Elk uur zoekwerk, elk gemist telefoontje, elke niet-gecombineerde rit is geld dat u niet terugziet. Een agent die dat systematisch aanpakt, betaalt zichzelf binnen weken terug.',
    aanpak:
      'Eerste agent: incident-afhandeling, omdat winst direct meetbaar is op klanttevredenheid en reputatie. Daarna planning-voorstellen, daarna charter-vergelijking, daarna facturatie. Elke stap is een zelfstandige winst die niet afhankelijk is van de volgende.',
  },
];

export const BRANCHE_BY_SLUG = BRANCHES.reduce<Record<string, Branche>>((acc, b) => {
  acc[b.slug] = b;
  return acc;
}, {});
