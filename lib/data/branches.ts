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
  stats?: BrancheStat[];
  caseSlug?: string;
  context?: string;
  expectations?: string[];
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
    caseSlug: 'hendriks-installatie',
    context:
      'Hendriks Installatietechniek heeft 22 monteurs en een klein kantoor. Sinds acht weken live. Omzetgroei van 30% werd opgevangen zonder extra kantoorbezetting. De werkvoorbereiders doen nu plannings-werk in plaats van getik.',
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
  {
    slug: 'zakelijke-dienstverlening',
    label: 'Zakelijke dienstverlening',
    keyword: 'AI-agent voor zakelijke dienstverlening',
    heroEyebrow: 'Branche · Zakelijke dienstverlening',
    heroTitle: 'AI-agent voor zakelijke dienstverleners.',
    heroItalic: 'Minder administratie. Meer tijd voor het vak.',
    intro:
      'Advocaten, accountants, consultants en bureaus werken uur-voor-uur. Elk uur dat aan administratie opgaat, is een uur dat niet aan de klant wordt besteed. Een AI-agent neemt intake, dossiervoorbereiding, urenregistratie en klant-communicatie over — zonder aan vertrouwelijkheid of zorgvuldigheid in te boeten.',
    lede:
      'Voor advocatenkantoren, accountants, belastingadviseurs, consultants, notarissen, communicatiebureaus en HR-dienstverleners. Waar declarabele uren het verdienmodel zijn en administratie de stille roofmoordenaar van marge.',
    pijnpunten: [
      'Declarabele uren gaan verloren aan mail, urenbriefjes en dossiervoorbereiding.',
      'Intake-gesprekken moeten handmatig worden uitgewerkt tot dossier — soms dagen na het gesprek.',
      'Standaard-documenten (opdrachtbevestiging, NDA, jaarrekening-brief) worden telkens opnieuw opgesteld.',
      'Klanten vragen status van hun zaak of dossier zonder dat er iets nieuws te melden is.',
      'Kennis zit in hoofden van senioren — junioren zoeken het telkens opnieuw uit.',
    ],
    oplossing: [
      'Intake-agent luistert mee (met toestemming), vat samen, stelt dossier op volgens uw kantoorsjabloon.',
      'Urenregistratie gebeurt automatisch op basis van agenda, e-mailactiviteit en dossier-touches.',
      'Standaard-documenten worden opgesteld met klantgegevens, dossierreferenties en uw voorwaarden.',
      'Klant-updates bij mijlpalen in het dossier — u bepaalt welke gebeurtenissen trigger zijn.',
      'Kennisbank-agent doorzoekt eigen archief, jurisprudentie of richtlijnen binnen de door u gezette grenzen.',
    ],
    agents: [
      {
        naam: 'Intake-agent',
        doet: 'Samenvattingen van intake-gesprekken, automatische dossier-aanmaak, conflictcheck tegen bestaande dossiers.',
      },
      {
        naam: 'Uren-agent',
        doet: 'Verzamelt werkactiviteit uit agenda, mail en dossier-gebruik, stelt urenregistratie op voor akkoord.',
      },
      {
        naam: 'Document-agent',
        doet: 'Opdrachtbevestigingen, NDA\'s, standaardbrieven opgesteld met klantdata en uw kantoorsjabloon.',
      },
      {
        naam: 'Communicatie-agent',
        doet: 'Klant-updates bij dossier-mijlpalen, herinneringen aan termijnen, pro-actieve status-mails.',
      },
      {
        naam: 'Kennis-agent',
        doet: 'Doorzoekt eigen archief en externe bronnen binnen gezette grenzen, levert onderbouwde notitie met bronnen.',
      },
    ],
    expectations: [
      'Tien tot twintig procent meer declarabele uren per medewerker per maand.',
      'Intake-gesprek tot volledig dossier binnen één uur in plaats van één tot drie dagen.',
      'Standaard-documenten binnen minuten in plaats van halve uren.',
      'Klanttevredenheid stijgt meetbaar door pro-actieve updates zonder extra werk.',
    ],
    waaromNu:
      'Dienstverleners die intake en administratie automatiseren, winnen declarabele tijd terug zonder harder te werken. Wie nu begint, bouwt een kantoor dat met gelijkblijvende bezetting meer klanten aankan. Concurrenten die dit niet doen, blijven uurtje-factuurtje draaien met stijgende loonkosten.',
    aanpak:
      'Eerste agent: intake of urenregistratie — afhankelijk van waar uw grootste lek zit. Live binnen één tot twee weken. Vertrouwelijkheid, conflictcheck en bevoegdheden zijn vanaf dag één ingericht. Daarna documenten, communicatie en kennisbank uitrollen.',
  },
  {
    slug: 'bouw',
    label: 'Bouw',
    keyword: 'AI-agent voor bouwbedrijven',
    heroEyebrow: 'Branche · Bouw',
    heroTitle: 'AI-agent voor bouwbedrijven.',
    heroItalic: 'Van calculatie tot oplevering zonder papierstroom.',
    intro:
      'Bouwbedrijven werken in projecten met lange doorlooptijden en veel partijen: opdrachtgever, architect, onderaannemers, leveranciers, gemeente. Een AI-agent houdt de papierstroom bij — calculaties, meerwerk, bouwverslagen, materiaalbestellingen, facturatie — zodat projectleiders kunnen bouwen in plaats van administreren.',
    lede:
      'Voor utiliteitsbouw, woningbouw, renovatie, afbouw, grond-, weg- en waterbouw. Waar elk project een eigen administratie-traject is en meerwerk-discussies marges wegvreten.',
    pijnpunten: [
      'Calculaties kosten dagen per offerte, terwijl opdrachtgevers binnen een week een prijs willen.',
      'Meerwerk wordt mondeling afgesproken en later pas op papier gezet — met discussie tot gevolg.',
      'Bouwverslagen, urenstaten en materiaalbonnen stapelen op — verwerking loopt weken achter.',
      'Onderaannemers en leveranciers mailen over planning, levertijd en facturen — allemaal via de projectleider.',
      'Eindafrekening vraagt weken puzzelen omdat meerwerk en minderwerk verspreid zijn over mails en bouwverslagen.',
    ],
    oplossing: [
      'Calculatie-agent stelt offertes op basis van staartkosten, uurtarieven per rol en historische projectdata.',
      'Meerwerk-agent verwerkt signalen uit de bouwplaats (foto, spraakmemo, mail) direct tot meerwerk-bon met akkoord-verzoek.',
      'Verslag-agent verwerkt dagrapporten, urenstaten en foto\'s tot bouwverslag en projectdossier.',
      'Coördinatie-agent handelt levertijden, planningsverzoeken en leveranciers-mails af binnen uw kaders.',
      'Afrekening-agent bouwt eindafrekening automatisch op uit alle geregistreerde gebeurtenissen.',
    ],
    agents: [
      {
        naam: 'Calculatie-agent',
        doet: 'Stelt offertes op vanuit werkomschrijving of bestek, rekent staartkosten, vergelijkt met historische projecten.',
      },
      {
        naam: 'Meerwerk-agent',
        doet: 'Verwerkt foto, spraakmemo of mail uit bouwplaats direct tot meerwerk-bon met akkoord-verzoek richting opdrachtgever.',
      },
      {
        naam: 'Verslag-agent',
        doet: 'Combineert dagrapporten, urenstaten en foto\'s tot wekelijks bouwverslag en gestructureerd projectdossier.',
      },
      {
        naam: 'Coördinatie-agent',
        doet: 'Mails van onderaannemers en leveranciers afhandelen, planning bijhouden, escalatie bij afwijking van planning.',
      },
      {
        naam: 'Afrekening-agent',
        doet: 'Eindafrekening samenstellen uit contractwaarde, meerwerk, minderwerk en gemaakte kosten, klaar voor akkoord.',
      },
    ],
    expectations: [
      'Calculatie-doorlooptijd halveert — meer offertes uit dezelfde bezetting.',
      'Meerwerk-discussies verdwijnen: alles digitaal vastgelegd, direct akkoord of afwijzing.',
      'Projectdossiers zijn realtime compleet, niet pas bij oplevering.',
      'Eindafrekeningen binnen dagen in plaats van weken — liquiditeit komt sneller binnen.',
    ],
    waaromNu:
      'Bouwbedrijven die projectadministratie op orde krijgen, winnen twee dingen: snellere facturatie en minder meerwerk-verlies. In een markt waar marges al dun zijn, is dat het verschil tussen draaien en groeien. Wie nu begint, heeft het systeem staan voor de volgende opdrachtpiek.',
    aanpak:
      'Eerste agent: meerwerk-registratie, omdat daar direct geld verloren gaat. Live binnen één tot twee weken. Koppelingen met uw calculatiesoftware, urenregistratie en leveranciers-portals worden stap voor stap aangezet.',
  },
  {
    slug: 'zorg',
    label: 'Zorg',
    keyword: 'AI-agent voor zorgorganisaties',
    heroEyebrow: 'Branche · Zorg',
    heroTitle: 'AI-agent voor de zorg.',
    heroItalic: 'Minder administratie. Meer tijd aan het bed.',
    intro:
      'Zorgorganisaties verliezen dertig tot veertig procent van de tijd aan administratie. Een AI-agent — ingericht binnen AVG en NEN 7510 — neemt rapportage, planning en declaratie-voorbereiding over. Zodat zorgmedewerkers zorgen, en kantoor de organisatie laat doorlopen.',
    lede:
      'Voor thuiszorg, VVT, gehandicaptenzorg, GGZ, huisartsenpraktijken en tandartspraktijken. Waar administratie structureel onderbezet is en zorgmedewerkers met steeds meer registratieverplichtingen worden belast.',
    pijnpunten: [
      'Rapportage na een dienst kost dertig tot zestig minuten — tijd die niet declarabel is.',
      'Planners puzzelen dagelijks met ziekmeldingen, beschikbaarheid en zorgvraag — meestal met Excel.',
      'Declaraties naar zorgverzekeraars en gemeenten vragen handmatige controle op codes en onderbouwing.',
      'Cliëntdossiers worden niet altijd tijdig bijgewerkt, waardoor collega\'s onvolledige informatie hebben.',
      'Klachten en incidenten worden mondeling doorgegeven en niet systematisch geregistreerd.',
    ],
    oplossing: [
      'Rapportage-agent zet spraakmemo of korte aantekening om in gestructureerde ECD-rapportage.',
      'Planning-agent verwerkt ziekmeldingen, beschikbaarheid en zorgvraag tot een voorstel dat de planner alleen akkoord hoeft te geven.',
      'Declaratie-agent controleert codes, onderbouwing en dubbele registraties vóór verzending.',
      'Dossier-agent vat contact-momenten samen en vult het ECD bij — altijd ter akkoord door zorgverlener.',
      'Incident-agent registreert MIC/MIM-meldingen gestructureerd, signaleert patronen.',
    ],
    agents: [
      {
        naam: 'Rapportage-agent',
        doet: 'Spraakmemo of korte aantekening omzetten naar ECD-rapportage volgens uw sjabloon, altijd ter akkoord door zorgverlener.',
      },
      {
        naam: 'Planning-agent',
        doet: 'Dagelijkse plannings-puzzel oplossen met ziekmeldingen, beschikbaarheid, zorgvraag en reistijd. Planner geeft akkoord.',
      },
      {
        naam: 'Declaratie-agent',
        doet: 'Controleert declaratie-codes, onderbouwing, cliënt-indicatie vóór verzending naar zorgverzekeraar of gemeente.',
      },
      {
        naam: 'Dossier-agent',
        doet: 'Vat contact-momenten en rapportages samen, signaleert onvolledigheden, ondersteunt overdracht bij dienstwisseling.',
      },
      {
        naam: 'Incident-agent',
        doet: 'MIC/MIM-meldingen structureren, signaleren van patronen, kwartaalrapportage voor kwaliteitscommissie.',
      },
    ],
    expectations: [
      'Rapportage-tijd per dienst gaat van 30-60 minuten naar 5-10 minuten.',
      'Planning-doorlooptijd halveert — minder stress op de planner, minder fouten in de roosters.',
      'Declaratie-afwijzingen door zorgverzekeraars dalen fors door pre-check.',
      'AVG- en NEN 7510-compliance is vanaf dag één ingericht: alle data on-premise of in NL-cloud.',
    ],
    waaromNu:
      'Zorgorganisaties staan onder dubbele druk: toenemende zorgvraag en krappere bezetting. Wie administratie-tijd terugwint, houdt personeel. Wie dat niet doet, ziet goede zorgmedewerkers vertrekken omdat ze niet meer aan zorgen toekomen. Een AI-agent is geen luxe meer, het is personeelsbehoud.',
    aanpak:
      'Eerste agent: rapportage, omdat daar de grootste tijdwinst per zorgmedewerker zit. Live binnen twee weken, inclusief AVG-verwerkersovereenkomst en NEN 7510-controle. Daarna planning en declaratie. Data blijft in NL, logging en auditspoor zijn standaard.',
  },
  {
    slug: 'productie',
    label: 'Productie',
    keyword: 'AI-agent voor productiebedrijven',
    heroEyebrow: 'Branche · Productie',
    heroTitle: 'AI-agent voor productiebedrijven.',
    heroItalic: 'Orderflow, planning en kwaliteit in één ritme.',
    intro:
      'Maakbedrijven leveren op klantorder of voorraad, vaak met complexe stuklijsten en strakke levertijden. Een AI-agent verbindt orderintake, werkvoorbereiding, inkoop, productieplanning en kwaliteitsregistratie — zodat de werkvloer kan produceren en de binnendienst regie houdt zonder overbelasting.',
    lede:
      'Voor metaal, kunststof, machinebouw, voedingsmiddelen, meubels, verpakkingen en engineer-to-order bedrijven. Waar een order door tien handen gaat voor hij de machine raakt.',
    pijnpunten: [
      'Offertes op maat kosten dagen omdat werkvoorbereiding moet rekenen aan stuklijst en capaciteit.',
      'Materialen worden soms te laat besteld doordat stuklijst-eisen en voorraad niet realtime gekoppeld zijn.',
      'Productieplanning schuift bij elke spoedorder — handmatig, met stress en fouten.',
      'Kwaliteitsmetingen worden op papier genoteerd en pas weken later verwerkt in trends.',
      'Klanten vragen status van hun order — antwoord vraagt rondje langs werkvoorbereiding en planning.',
    ],
    oplossing: [
      'Offerte-agent rekent aan stuklijst, uurtarief per bewerking en beschikbare capaciteit — offerte binnen uren.',
      'Inkoop-agent vergelijkt materialen in voorraad met stuklijst-eis en zet bestellingen klaar voor akkoord.',
      'Planning-agent herplant automatisch bij spoedorder, geeft impact op andere orders direct inzichtelijk.',
      'Kwaliteit-agent verwerkt metingen realtime, signaleert drift voordat het afkeur wordt.',
      'Klant-agent beantwoordt order-status-vragen direct uit ERP en planning, zonder binnendienst te belasten.',
    ],
    agents: [
      {
        naam: 'Offerte-agent',
        doet: 'Rekent op stuklijst, uurtarief per bewerking, beschikbare capaciteit. Offerte in uren in plaats van dagen.',
      },
      {
        naam: 'Inkoop-agent',
        doet: 'Stuklijst vergelijken met voorraad, bestelling bij voorkeurs-leverancier klaarzetten, levertijd terugkoppelen aan planning.',
      },
      {
        naam: 'Planning-agent',
        doet: 'Spoedorders inschuiven met impact-analyse op bestaande orders. Planner geeft akkoord na voorstel.',
      },
      {
        naam: 'Kwaliteit-agent',
        doet: 'Metingen realtime verwerken, trend-signalen geven, kwaliteitsrapport per klant of per productlijn samenstellen.',
      },
      {
        naam: 'Klant-agent',
        doet: 'Status-vragen beantwoorden met actuele planning- en productie-informatie, met de toon die u voorschrijft.',
      },
    ],
    expectations: [
      'Offerte-doorlooptijd van dagen naar uren — hogere hitrate op klantaanvragen.',
      'Spoedorders worden realistisch ingeschoven in plaats van chaotisch — minder stress op werkvloer.',
      'Kwaliteitsafwijkingen zichtbaar voor ze afkeur worden — directe besparing op productiekosten.',
      'Status-vragen van klanten worden direct beantwoord zonder dat binnendienst erop hoeft te reageren.',
    ],
    waaromNu:
      'Productiebedrijven die orderflow en planning koppelen, winnen op levertijd en betrouwbaarheid. Klanten kiezen steeds vaker op "wanneer kan het af" in plaats van alleen op prijs. Wie nu inricht, heeft over een jaar een reactietijd en leverbetrouwbaarheid die concurrenten niet matchen.',
    aanpak:
      'Eerste agent: offerte of order-status — afhankelijk van waar uw werkvoorbereiding vastloopt. Live binnen één tot twee weken. Koppeling met uw ERP, MES of planningssoftware stap voor stap. Kwaliteitsregistratie wordt toegevoegd zodra de basis draait.',
  },
  {
    slug: 'detailhandel',
    label: 'Detailhandel',
    keyword: 'AI-agent voor detailhandel',
    heroEyebrow: 'Branche · Detailhandel',
    heroTitle: 'AI-agent voor de detailhandel.',
    heroItalic: 'Van klantvraag tot verkoop zonder kassa-ruis.',
    intro:
      'Winkels en webshops krijgen vragen via tien kanalen — winkel, telefoon, mail, WhatsApp, webshop-chat, socials. Een AI-agent centraliseert die stroom, beantwoordt routine-vragen en zet verkopen door. Zodat uw medewerkers tijd hebben voor klanten die echt in de winkel staan.',
    lede:
      'Voor speciaalzaken, retail-ketens, webshops, omnichannel-retailers en showroom-bedrijven. Waar klanten steeds vaker vooraf contact opnemen en de winkel of webshop 24/7 bereikbaar moet lijken.',
    pijnpunten: [
      'Vragen komen via mail, WhatsApp, Instagram-DM en webshop-chat — niemand heeft overzicht.',
      'Voorraadvraag ("hebben jullie dit nog in M?") kost iedere keer een loopje naar het magazijn.',
      'Retouren vragen handmatige controle op aankoopbewijs, staat van het product en beleid.',
      'Webshop-bestellingen blijven liggen omdat de verwerkende medewerker ook in de winkel staat.',
      'Seizoen-piek vraagt tijdelijke krachten die elke keer opnieuw moeten worden ingewerkt.',
    ],
    oplossing: [
      'Kanaal-agent vangt vragen op uit alle inbox-kanalen en beantwoordt routine (openingstijden, voorraad, levertijd).',
      'Voorraad-agent kent realtime voorraad per filiaal en kan reserveren of doorsturen naar ander filiaal.',
      'Retour-agent behandelt retouren volgens uw beleid, controleert aankoopbewijs, zet terugbetaling klaar.',
      'Order-agent verwerkt webshop-bestellingen, orderbevestigingen en verzendmeldingen automatisch.',
      'Onboarding-agent ondersteunt tijdelijke krachten met direct-antwoord op procedure-vragen.',
    ],
    agents: [
      {
        naam: 'Kanaal-agent',
        doet: 'Vangt vragen uit alle kanalen, beantwoordt routinevragen, escaleert naar medewerker bij complexe zaak.',
      },
      {
        naam: 'Voorraad-agent',
        doet: 'Realtime voorraadinzage, cross-filiaal-reservering, klant informeren over beschikbaarheid.',
      },
      {
        naam: 'Retour-agent',
        doet: 'Retour behandelen volgens uw beleid, aankoopbewijs controleren, terugbetaling of ruiling initiëren.',
      },
      {
        naam: 'Order-agent',
        doet: 'Webshop-orders verwerken, bevestigingen, verzendmeldingen, klantcommunicatie bij uitstel of levering.',
      },
      {
        naam: 'Onboarding-agent',
        doet: 'Vaste procedures en productkennis toegankelijk voor tijdelijke krachten — chat-antwoord in plaats van handleiding.',
      },
    ],
    expectations: [
      'Routinevragen (openingstijden, voorraad, levertijd) worden 24/7 beantwoord zonder extra bezetting.',
      'Webshop-verwerking stopt met knellen op winkel-bezetting in piekuren.',
      'Retour-doorlooptijd van dagen naar uren — klantbeleving stijgt meetbaar.',
      'Tijdelijke krachten zijn productief vanaf dag één in plaats van dag drie.',
    ],
    waaromNu:
      'Retail is een reactietijd-markt geworden. Consumenten vergelijken binnen minuten en bestellen waar ze direct antwoord krijgen. Winkels die daar niet op meekomen, verliezen omzet niet aan prijs maar aan snelheid. Een AI-agent op uw inbox draait die wedstrijd terug in uw voordeel.',
    aanpak:
      'Eerste agent: kanaal-inbox, omdat de winst direct voelbaar is op werkvloer en in klanttevredenheid. Live binnen één tot twee weken. Koppelingen met uw kassasysteem, webshop en voorraadsysteem stap voor stap. Retour- en order-flows volgen zodra de basis draait.',
  },
];

export const BRANCHE_BY_SLUG = BRANCHES.reduce<Record<string, Branche>>((acc, b) => {
  acc[b.slug] = b;
  return acc;
}, {});
