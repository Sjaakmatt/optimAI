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
    expectations: [
      'Reactietijd op offertes gaat van uren of dagen naar minuten.',
      'Binnendienst wint per medewerker een groot deel van de dag terug op mail- en offerte-verwerking.',
      'Voorraad-signalen leiden automatisch tot inkoop-voorstellen binnen uw mandaat.',
      'Debiteurenopvolging gebeurt structureel in plaats van "als er tijd is".',
    ],
    waaromNu:
      'Groothandels die nu starten bouwen binnen een jaar een reactietijd op die concurrenten niet kunnen volgen. Niet omdat hun mensen harder werken, maar omdat routinewerk automatisch doorstroomt. Dat verschil zien klanten direct aan de hoeveelheid offertes die dezelfde dag binnenkomen.',
    aanpak:
      'We beginnen niet bij uw grootste pijn. We beginnen bij het meest voorspelbare proces — meestal offertes of orderbevestigingen — om daar de eerste agent omheen te bouwen. Uw mensen leren hoe ze het bijsturen. Daarna rollen we uit naar inkoop, voorraad, klachten en debiteuren.',
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
    expectations: [
      'Administratietijd van werkvoorbereiding gaat fors omlaag.',
      'Facturen gaan de deur uit op de dag van oplevering, niet dagen later — cashflow-winst.',
      'Dubbele bestellingen dalen door centrale voorraad-check.',
      'Status-telefoontjes van klanten verdwijnen door pro-actieve updates.',
    ],
    waaromNu:
      'Installatiebedrijven die een keten van werkbon-tot-factuur draaiend hebben, werken structureel profitabeler. De marge zit niet in uurtarief maar in doorstroom. Elke dag dat een factuur later de deur uit gaat, is liquiditeit die klant niet nodig heeft en u wel.',
    aanpak:
      'Eerste agent: vaak de factuur-agent, omdat cashflow-winst direct voelbaar is. Daarna werkbon-verwerking, materiaal-bestelling en klant-communicatie. Elke stap staat op zichzelf en eindigt in iets werkends.',
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
    expectations: [
      'Ritten worden vaker gecombineerd zonder handmatig puzzelen.',
      'Klanten krijgen automatisch update bij vertraging — geen escalaties meer.',
      'Bij overmacht ligt er binnen minuten een charter-vergelijking klaar.',
      'Planner kan plannen in plaats van branden blussen.',
    ],
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
      'Eerste agent: intake of urenregistratie — afhankelijk van waar uw grootste lek zit. Vertrouwelijkheid, conflictcheck en bevoegdheden zijn vanaf dag één ingericht. Daarna documenten, communicatie en kennisbank uitrollen.',
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
      'Eerste agent: meerwerk-registratie, omdat daar direct geld verloren gaat. Koppelingen met uw calculatiesoftware, urenregistratie en leveranciers-portals worden stap voor stap aangezet.',
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
      'AVG- en NEN 7510-compliance is vanaf dag één ingericht, met opslag en verwerking in Frankfurt.',
    ],
    waaromNu:
      'Zorgorganisaties staan onder dubbele druk: toenemende zorgvraag en krappere bezetting. Wie administratie-tijd terugwint, houdt personeel. Wie dat niet doet, ziet goede zorgmedewerkers vertrekken omdat ze niet meer aan zorgen toekomen. Een AI-agent is geen luxe meer, het is personeelsbehoud.',
    aanpak:
      'Eerste agent: rapportage, omdat daar de grootste tijdwinst per zorgmedewerker zit. Inclusief AVG-verwerkersovereenkomst en NEN 7510-controle. Daarna planning en declaratie. Opslag en verwerking in Frankfurt, taalmodelcalls via Anthropic in de VS, opgenomen in onze sub-verwerkerslijst met een transfer impact assessment. Logging en auditspoor zijn standaard.',
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
      'Eerste agent: offerte of order-status — afhankelijk van waar uw werkvoorbereiding vastloopt. Koppeling met uw ERP, MES of planningssoftware stap voor stap. Kwaliteitsregistratie wordt toegevoegd zodra de basis draait.',
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
      'Eerste agent: kanaal-inbox, omdat de winst direct voelbaar is op werkvloer en in klanttevredenheid. Koppelingen met uw kassasysteem, webshop en voorraadsysteem stap voor stap. Retour- en order-flows volgen zodra de basis draait.',
  },
  {
    slug: 'accountancy',
    label: 'Accountancy',
    keyword: 'AI-agent voor accountantskantoor',
    heroEyebrow: 'Branche · Accountancy',
    heroTitle: 'AI-agent voor het accountantskantoor.',
    heroItalic: 'Saaie uren weg, advies-uren terug.',
    intro:
      'Accountantskantoren verliezen marge aan boekingen, BTW-checks en standaardrapportages. Een AI-agent neemt dat routinewerk over en koppelt direct met uw boekhoudpakket — zodat uw mensen aan adviesuren toekomen in plaats van inkloppen.',
    lede:
      'Voor accountants- en administratiekantoren, MKB-accountants en samenstelpraktijken. Waar elk kwartaal dezelfde handelingen herhaald worden en advies-uren onder druk staan.',
    pijnpunten: [
      'Boekingen categoriseren en BTW-codes kiezen kost een groot deel van de maand.',
      'Vragen van klanten over saldo, BTW-aangifte of openstaande posten komen via mail en telefoon.',
      'Standaard-rapportages (kwartaal, jaarrekening, samenstelverklaring) vragen handmatig samenstellen.',
      'Adviesgesprekken worden uitgesteld omdat de basis-administratie voorgaat.',
      'Junioren leren werk dat over twee jaar geautomatiseerd is — terwijl seniors te weinig tijd hebben voor advies.',
    ],
    oplossing: [
      'Boekings-agent verwerkt facturen en bonnen automatisch met de juiste BTW-code en grootboekrekening.',
      'Klant-agent beantwoordt routine-vragen over saldo en aangifte op basis van actuele cijfers.',
      'Rapportage-agent stelt periodieke rapporten samen — accountant doet review en publiceert.',
      'Signaal-agent waarschuwt bij afwijkingen (omzetdaling, marge-erosie, debiteurenstand) zodat advies pro-actief kan.',
      'Aangifte-agent bereidt BTW- en IB-aangiftes voor controle door de accountant.',
    ],
    agents: [
      {
        naam: 'Boekings-agent',
        doet: 'Facturen en bonnen verwerken, BTW-codes toekennen, grootboekrekening kiezen, dubbel-boekingen signaleren.',
      },
      {
        naam: 'Klant-agent',
        doet: 'Routinevragen van klanten over saldo, openstaande posten, BTW-aangifte beantwoorden met actuele cijfers.',
      },
      {
        naam: 'Rapportage-agent',
        doet: 'Kwartaalrapport, jaarrekening-concept, samenstelverklaring opstellen klaar voor review.',
      },
      {
        naam: 'Signaal-agent',
        doet: 'Marge-erosie, debiteurenstand, afwijkende kostenposten signaleren met advies-aanbeveling.',
      },
      {
        naam: 'Aangifte-agent',
        doet: 'BTW- en IB-aangiftes voorbereiden, controles uitvoeren, klaarzetten voor accountant-akkoord.',
      },
    ],
    expectations: [
      'Boekingstijd per klant daalt met 50 tot 70 procent.',
      'Adviesuren per klant per jaar verdubbelen zonder extra bezetting.',
      'Klanttevredenheid stijgt door pro-actieve signalen in plaats van reactieve gesprekken.',
      'Junioren krijgen interessanter werk: review en advies in plaats van inkloppen.',
    ],
    waaromNu:
      'Boekhoudsoftware en AI-modellen koppelen in 2026 als nooit tevoren. Kantoren die dit nu inrichten, verkopen meer adviesuren tegen hetzelfde tarief en houden hun mensen vast omdat het werk leuker wordt. Wie wacht, ziet klanten overstappen naar collega-kantoren die wel sneller en goedkoper de basis leveren.',
    aanpak:
      'Eerste agent: boekingen of klantvraag-afhandeling, afhankelijk van waar uw kantoor het meest tijd verliest. Koppelingen met Exact, AFAS, Twinfield, Snelstart of Visma stap voor stap. AVG- en WWFT-randvoorwaarden vanaf dag één.',
  },
  {
    slug: 'advocatuur',
    label: 'Advocatuur',
    keyword: 'AI-agent voor advocatenkantoor',
    heroEyebrow: 'Branche · Advocatuur',
    heroTitle: 'AI-agent voor het advocatenkantoor.',
    heroItalic: 'Dossierwerk geautomatiseerd. Uren over voor pleidooi.',
    intro:
      'Advocatenkantoren werken uur-voor-uur, met intake, conflictcheck, dossiervoorbereiding en standaard-stukken die elke keer terugkeren. Een AI-agent — binnen geheimhouding en gedragsregels — neemt die voorbereiding over zodat advocaten meer declarabele tijd aan de zaak besteden.',
    lede:
      'Voor algemene praktijken, niche-kantoren in arbeidsrecht, ondernemingsrecht, familierecht of huurrecht. Waar de combinatie van vertrouwelijkheid, kwaliteit en uurtarief onhoudbaar wordt zonder hulp.',
    pijnpunten: [
      'Intake-gesprekken kosten een uur — uitwerken tot dossier nog eens een halve dag.',
      'Conflictcheck gebeurt handmatig of niet op tijd, met vrijblijvendheids-risico.',
      'Standaard-stukken (sommatie, NDA, dagvaarding-concept) worden steeds opnieuw opgesteld.',
      'Uren bijhouden raakt achterop, declarabele uren lekken weg.',
      'Cliënten vragen status zonder dat er iets te melden is.',
    ],
    oplossing: [
      'Intake-agent vat gesprek samen, stelt dossier op, draait conflictcheck tegen bestaande zaken.',
      'Document-agent maakt sommatie, NDA, opdrachtbevestiging op basis van dossiergegevens en uw kantoorsjabloon.',
      'Uren-agent registreert werk automatisch op basis van agenda, mail en dossier-gebruik.',
      'Communicatie-agent stuurt cliënt-updates bij dossier-mijlpalen volgens uw protocol.',
      'Onderzoek-agent doorzoekt uw eigen archief en jurisprudentie binnen vooraf gezette grenzen.',
    ],
    agents: [
      {
        naam: 'Intake-agent',
        doet: 'Gesprek samenvatten, dossier-aanmaak, conflictcheck tegen actief en gesloten archief.',
      },
      {
        naam: 'Document-agent',
        doet: 'Sommaties, opdrachtbevestigingen, NDA, vaststellingsovereenkomsten op basis van dossier en kantoorsjabloon.',
      },
      {
        naam: 'Uren-agent',
        doet: 'Automatische urenregistratie via agenda en dossier-activiteit, klaar voor advocaat-akkoord.',
      },
      {
        naam: 'Communicatie-agent',
        doet: 'Cliënt-updates bij mijlpalen, herinneringen aan termijnen, pro-actieve status-mails.',
      },
      {
        naam: 'Onderzoek-agent',
        doet: 'Jurisprudentie en eigen archief doorzoeken, gefundeerde notitie met bronvermelding.',
      },
    ],
    expectations: [
      '15 tot 25 procent meer declarabele uren per advocaat per maand.',
      'Intake tot dossier binnen het uur in plaats van een halve dag.',
      'Conflictcheck gebeurt automatisch en op tijd, zonder vergeten.',
      'Cliënttevredenheid stijgt door pro-actieve status-updates.',
    ],
    waaromNu:
      'De AI-tooling in 2026 maakt het mogelijk om vertrouwelijk én juridisch zorgvuldig te werken — opslag en verwerking in Frankfurt, geen training op uw dossiers, expliciete logging. Kantoren die dit nu inrichten, draaien hogere marges en behouden ambitieuze advocaten die geen administratie willen doen.',
    aanpak:
      'Eerste agent: intake of urenregistratie. Geheimhouding, conflictcheck en bevoegdheden zijn vanaf dag één geconfigureerd. Daarna document-templates en cliënt-communicatie uitrollen.',
  },
  {
    slug: 'makelaardij',
    label: 'Makelaardij',
    keyword: 'AI-agent voor makelaarskantoor',
    heroEyebrow: 'Branche · Makelaardij',
    heroTitle: 'AI-agent voor het makelaarskantoor.',
    heroItalic: 'Bezichtigen op locatie. De rest gaat vanzelf.',
    intro:
      'Makelaarskantoren werken in pieken: aanmelding, bezichtiging, bod, transactie, oplevering. Een AI-agent neemt de mail-, planning- en documentstroom over zodat NVM-makelaars of zelfstandigen zich op de mensen kunnen richten — kopers, verkopers, taxaties.',
    lede:
      'Voor verkoop- en aankoopmakelaars, taxateurs, beheerders en bedrijfsmakelaars. Waar reactietijd het verschil maakt tussen opdracht binnen of opdracht naar de concurrent.',
    pijnpunten: [
      'Aanvragen voor bezichtigingen komen via Funda, mail, WhatsApp, telefoon — nooit in één bak.',
      'Standaard-stukken (koopovereenkomst, opdracht tot dienstverlening, taxatieopdracht) elke keer opnieuw invullen.',
      'Bezichtigings-planning kost dagelijks puzzelen, bijhouden van wie wanneer geweest is.',
      'Status-updates aan opdrachtgevers worden vergeten in de drukte.',
      'Open Huizen Dag of marktwerving vraagt extra capaciteit die er niet is.',
    ],
    oplossing: [
      'Aanvraag-agent vangt bezichtigingsverzoeken uit alle kanalen op en plant in op basis van uw agenda.',
      'Document-agent stelt koopovereenkomst, opdracht-formulieren en kopersbrieven op met klantgegevens.',
      'Communicatie-agent informeert opdrachtgevers wekelijks over voortgang, bezichtigingen en biedingen.',
      'Marketing-agent zet objecten op Funda, social en eigen site met huisstijl-teksten en passende foto-volgorde.',
      'Taxatie-agent verwerkt kadaster, energielabel en marktdata tot taxatie-onderbouwing.',
    ],
    agents: [
      {
        naam: 'Aanvraag-agent',
        doet: 'Bezichtigingsverzoeken centraliseren, planning voorstellen, bevestigingsmail sturen, herinnering vooraf.',
      },
      {
        naam: 'Document-agent',
        doet: 'Koopovereenkomsten, opdracht-formulieren, kopersbrieven opstellen op basis van dossier.',
      },
      {
        naam: 'Communicatie-agent',
        doet: 'Wekelijks update naar opdrachtgever met aantal bezichtigingen, bod-status, marktbeweging.',
      },
      {
        naam: 'Marketing-agent',
        doet: 'Object op Funda en eigen site plaatsen met huisstijl-tekst, geoptimaliseerde foto-volgorde.',
      },
      {
        naam: 'Taxatie-agent',
        doet: 'Kadaster, energielabel, vergelijkbare verkopen samenbrengen tot taxatie-onderbouwing.',
      },
    ],
    expectations: [
      'Reactietijd op bezichtigingsverzoek van uren naar minuten — meer doorlopen tot opdracht.',
      'Document-doorlooptijd halveert.',
      'Opdrachtgevers krijgen wekelijks update zonder dat u eraan denkt.',
      'Capaciteit voor marktwerving en taxatie verdubbelt.',
    ],
    waaromNu:
      'Een huizenmarkt waar consumenten in minuten beslissen welke makelaar ze bellen, beloont kantoren die direct kunnen reageren. AI-agents maken die snelheid bereikbaar zonder extra bezetting.',
    aanpak:
      'Eerste agent: aanvraag-afhandeling, omdat snelheid daar direct opdracht-conversie verbetert. Koppeling met Funda, agenda en NVM-software stap voor stap.',
  },
  {
    slug: 'agrarisch',
    label: 'Agrarisch',
    keyword: 'AI-agent voor agrarische bedrijven',
    heroEyebrow: 'Branche · Agrarisch',
    heroTitle: 'AI-agent voor de agrarische sector.',
    heroItalic: 'Buiten boer. Binnen administratie geautomatiseerd.',
    intro:
      'Agrarische bedrijven werken met krappe marges, veel registratieverplichtingen en weinig kantoorbezetting. Een AI-agent neemt mestadministratie, GLB-aanvragen, leveranciers-mails en factuurverwerking over — zodat de boer kan boeren en het kantoor maandagochtend op orde is.',
    lede:
      'Voor melkveehouderij, akkerbouw, varkens- en pluimveehouderij, glastuinbouw, fruitteelt en loonwerkers. Waar registratie en regelgeving net zo zwaar zijn als de operatie zelf.',
    pijnpunten: [
      'Mestadministratie, GLB, derogatie en NVWA-meldingen vragen wekelijks bewerkelijke registratie.',
      'Inkoopfacturen voor voer, kunstmest en gewasbescherming komen via mail in tientallen formaten.',
      'Leveranciers en afnemers mailen over levering, prijs, kwaliteit, planning.',
      'Subsidies en regelingen veranderen per jaar — bijhouden lukt niet zonder externe adviseur.',
      'Avonden en weekenden gaan op aan administratie omdat overdag geen tijd is.',
    ],
    oplossing: [
      'Registratie-agent koppelt mest- en gewasregistratie aan RVO, NVWA, BRP en derogatie-systemen.',
      'Factuur-agent verwerkt inkoopfacturen, koppelt aan voorraad en bedrijfsregister.',
      'Leverancier-agent handelt mail van voer-, mest- en gewasleveranciers af binnen uw inkoopkaders.',
      'Subsidie-agent volgt regelingen, signaleert kansen en bereidt aanvragen voor.',
      'Klant-agent beantwoordt afnemers (zuivel, veiling, supermarkt) over levering en kwaliteit.',
    ],
    agents: [
      {
        naam: 'Registratie-agent',
        doet: 'Mest-, gewas- en dierregistratie verwerken naar RVO, NVWA en sector-systemen volgens regels.',
      },
      {
        naam: 'Factuur-agent',
        doet: 'Inkoopfacturen lezen, koppelen aan voorraad, voorbereiden voor boekhouder.',
      },
      {
        naam: 'Leverancier-agent',
        doet: 'Mails van voer-, mest- en gewasleveranciers afhandelen binnen inkoopkaders, prijsafwijking signaleren.',
      },
      {
        naam: 'Subsidie-agent',
        doet: 'GLB, derogatie, ANLb en sectorale subsidies volgen, kansen signaleren, aanvragen klaarzetten.',
      },
      {
        naam: 'Klant-agent',
        doet: 'Mails en bestellingen van afnemers (zuivel, veiling, supermarkt, boerderijwinkel) afhandelen.',
      },
    ],
    expectations: [
      'Registratielast halveert; geen avond-administratie meer.',
      'Factuur-doorlooptijd van weken naar dagen.',
      'Subsidie-kansen worden niet meer gemist.',
      'Boer doet boer-werk, agent doet kantoorwerk.',
    ],
    waaromNu:
      'Regelgeving wordt strenger, marges blijven dun, opvolging is onzeker. Bedrijven die nu de administratie automatiseren, blijven over de generaties heen werkbaar. Wie blijft hangen in pen-en-papier of Excel, raakt achter op kantoorwerk waarvan de eisen alleen maar groeien.',
    aanpak:
      'Eerste agent: factuurverwerking of registratie. Koppelingen met sector-systemen (RVO, NVWA, KringloopWijzer, FarmInfo) en eigen bedrijfsadministratie stap voor stap.',
  },
  {
    slug: 'e-commerce',
    label: 'E-commerce',
    keyword: 'AI-agent voor webshops',
    heroEyebrow: 'Branche · E-commerce',
    heroTitle: 'AI-agent voor de webshop.',
    heroItalic: 'Service op niveau zonder service-team van twintig.',
    intro:
      'Webshops verdienen of verliezen op klantenservice, retouren en operationele snelheid. Een AI-agent neemt klantvragen, retour-afhandeling en orderverwerking over — zodat een team van vijf voelt als een team van twintig zonder extra loonkosten.',
    lede:
      'Voor B2C en B2B-webshops, marketplaces-sellers en omnichannel-retailers met een eigen e-commerce-tak. Waar klantverwachtingen op Bol/Coolblue-niveau liggen terwijl uw team kleiner is.',
    pijnpunten: [
      'Klantvragen via mail, chat, WhatsApp en marketplace-berichten zijn niet centraal.',
      'Retouren vragen handmatige controle, terugbetaling en voorraadcorrectie.',
      'Productvragen ("welke maat", "is dit waterdicht") krijgen trage of inconsistente antwoorden.',
      'Marketplace-meldingen (klacht, A-Z claim, performance) blijven liggen tot het te laat is.',
      'Orderverwerking schaalt niet mee met seizoenspieken — Black Friday is panic-modus.',
    ],
    oplossing: [
      'Service-agent beantwoordt routinevragen 24/7 in uw merk-toon, escaleert complexe zaken.',
      'Retour-agent behandelt retouren, controleert beleid, zet refund of ruiling klaar.',
      'Product-agent beantwoordt maat-, materiaal- en compatibiliteitsvragen op basis van productdata.',
      'Marketplace-agent monitort Bol-, Amazon-, MM-prestaties, beantwoordt klachten binnen SLA.',
      'Order-agent verwerkt bestellingen, bevestigingen, verzendmeldingen en geeft pro-actief uitstel-melding.',
    ],
    agents: [
      {
        naam: 'Service-agent',
        doet: 'Klantvragen via alle kanalen beantwoorden in uw merk-toon, escaleren bij complexe zaak.',
      },
      {
        naam: 'Retour-agent',
        doet: 'Retour controleren tegen beleid, terugbetaling of ruiling initiëren, voorraad-correctie.',
      },
      {
        naam: 'Product-agent',
        doet: 'Maat-, materiaal-, compatibiliteits- en advies-vragen beantwoorden op basis van productdata.',
      },
      {
        naam: 'Marketplace-agent',
        doet: 'Bol, Amazon, Marktplaats-prestaties monitoren, klachten en A-Z claims binnen SLA afhandelen.',
      },
      {
        naam: 'Order-agent',
        doet: 'Orderbevestigingen, verzendmeldingen, uitstelmeldingen, koppeling met WMS en boekhouding.',
      },
    ],
    expectations: [
      'Klantservice 24/7 zonder extra bezetting.',
      'Retour-doorlooptijd van dagen naar uren — terugbetaling sneller, klant blijft fan.',
      'Marketplace-rating stijgt door snelle respons.',
      'Black Friday wordt voorspelbaar in plaats van paniek.',
    ],
    waaromNu:
      'E-commerce is een snelheids- en service-markt geworden. Kopers kiezen niet meer alleen op prijs maar op snelheid van antwoord, retour en levering. AI-agents brengen dat niveau bereikbaar voor MKB-webshops zonder een service-organisatie van twintig.',
    aanpak:
      'Eerste agent: klantservice-kanaal of retour-afhandeling. Koppeling met Shopify, WooCommerce, Magento, Bol Seller, Amazon Seller, Magento, eigen WMS stap voor stap.',
  },
  {
    slug: 'horeca',
    label: 'Horeca',
    keyword: 'AI-agent voor horeca',
    heroEyebrow: 'Branche · Horeca',
    heroTitle: 'AI-agent voor de horecaondernemer.',
    heroItalic: 'Reserveren, inkoop, planning automatisch. U doet de gasten.',
    intro:
      'Horecazaken werken met onvoorspelbare drukte, smalle marges en een team dat vooral op de vloer staat. Een AI-agent regelt reserveringen, inkoopbestellingen, personeelsplanning en social-media-respons — zodat de eigenaar niet meer ’s nachts factureert en bestelt.',
    lede:
      'Voor restaurants, lunchrooms, hotels, cafés en cateringbedrijven. Waar elk uur dat de eigenaar achter de laptop zit een uur is dat niet in de zaak gewerkt wordt.',
    pijnpunten: [
      'Reserveringen komen via telefoon, mail, Resengo, eigen site, Google, Instagram-DM.',
      'Inkoopbestellingen worden ’s avonds gedaan met handmatige controle op voorraad.',
      'Personeelsplanning verandert dagelijks door ziekte, no-shows en piekdrukte.',
      'Reviews en DM\'s op social blijven liggen, met reputatie-effect.',
      'Catering-aanvragen vragen offerte op maat — vaak te laat de deur uit.',
    ],
    oplossing: [
      'Reservering-agent vangt aanvragen uit alle kanalen, plaatst in reserveringssysteem, bevestigt en herinnert.',
      'Inkoop-agent stelt bestellijst op uit voorraad, kaart en weeksjabloon, plaatst bij voorkeursleveranciers.',
      'Planning-agent maakt rooster op basis van prognose, beschikbaarheid en cao-regels.',
      'Communicatie-agent beantwoordt reviews en DMs in uw toon, escaleert klachten naar manager.',
      'Catering-agent stelt offerte op uit aanvraag-formulier en standaardprijslijst.',
    ],
    agents: [
      {
        naam: 'Reservering-agent',
        doet: 'Reserveringen uit alle kanalen centraliseren, bevestigen, herinneren, no-show vroeg signaleren.',
      },
      {
        naam: 'Inkoop-agent',
        doet: 'Bestellijst opstellen uit voorraad, weeksjabloon en kaart, plaatsen bij voorkeursleveranciers.',
      },
      {
        naam: 'Planning-agent',
        doet: 'Rooster maken op basis van prognose en beschikbaarheid, ziekte en no-show opvangen.',
      },
      {
        naam: 'Communicatie-agent',
        doet: 'Google-, TripAdvisor- en social-reacties afhandelen in uw toon, klacht escaleren.',
      },
      {
        naam: 'Catering-agent',
        doet: 'Catering-aanvragen omzetten in offerte met standaardprijzen en uw voorwaarden.',
      },
    ],
    expectations: [
      'No-shows dalen met 30 tot 50 procent door betere bevestigingen en herinneringen.',
      'Inkoop in minuten in plaats van een uur per avond.',
      'Personeelsplanning gaat van paniek naar voorspelbaar.',
      'Reputatie-onderhoud op social gebeurt vanzelf.',
    ],
    waaromNu:
      'Horeca-marges zijn dun en personeel schaars. Wie de operationele backoffice automatiseert, houdt mensen vast en houdt de zaak werkbaar voor de eigenaar. Wie blijft hangen, brandt op of sluit.',
    aanpak:
      'Eerste agent: reservering of inkoop. Koppelingen met Resengo, Untill, Lightspeed, Mews, Mr.Winston, leveranciersportals en eigen kassasysteem stap voor stap.',
  },
];

export const BRANCHE_BY_SLUG = BRANCHES.reduce<Record<string, Branche>>((acc, b) => {
  acc[b.slug] = b;
  return acc;
}, {});
