export interface TeamMember {
  slug: string;
  voornaam: string;
  achternaam: string;
  initialen: string; // voor avatar-fallback
  rol: string;
  rolKort: string; // voor footer / kaartjes
  vestiging: string;
  email: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  portretSrc?: string; // /portret.jpg etc — optioneel
  korteBio: string; // max ~200 tekens, voor kaart
  langeBio: string[]; // paragrafen, voor persoonlijke pagina
  expertise: { titel: string; body: string }[];
  knowsAbout: string[]; // schema.org Person.knowsAbout
  alumniOf?: string;
  publicatieSlugs?: string[]; // koppelt aan posts.ts via slug
  startedAt: string; // ISO date — wanneer bij FactumAI gestart
}

export const TEAM: TeamMember[] = [
  {
    slug: 'sjaak-ter-veld',
    voornaam: 'Sjaak',
    achternaam: 'ter Veld',
    initialen: 'SV',
    rol: 'Oprichter · Sparringpartner',
    rolKort: 'Oprichter',
    vestiging: 'Hoogkarspel · West-Friesland',
    email: 'sjaak@factumai.nl',
    linkedin: 'https://www.linkedin.com/in/sjaak-ter-veld/',
    portretSrc: '/portret.jpg',
    korteBio:
      'Bedrijfskundige met 8+ jaar IT-praktijk. Bouwt AI-agents voor MKB-bedrijven en schrijft de FactumAI-kennisbank.',
    langeBio: [
      'Ik ben opgeleid in de bedrijfskunde en heb daarna meer dan acht jaar in IT gewerkt: aan optimalisatie, procesverbetering, strategie en projectmanagement bij bedrijven van uiteenlopende grootte. In 2026 ben ik FactumAI gestart om AI-agents bereikbaar te maken voor MKB-bedrijven die niet wachten op een groot consultancy-traject.',
      'Mijn rol bij FactumAI is dubbel. Ik zit aan tafel bij ondernemers om hun werkdag te begrijpen, en ik bouw mee aan de agents die wij opleveren. Dat houdt het werk eerlijk: ik beloof niets dat ik niet zelf zou kunnen waarmaken.',
      'Op deze site schrijf ik bovendien de kennisbank. De artikelen zijn observaties uit de praktijk — wat werkt, wat niet, en waarom het MKB juist nu de meeste winst kan pakken. Geen jargon, geen hype.',
    ],
    expertise: [
      {
        titel: 'AI-agents in productie',
        body: 'Acht jaar IT-praktijk en sinds 2026 fulltime aan het bouwen van AI-agents voor MKB-bedrijven. Multi-agent platforms in groothandel, installatietechniek, transport en zakelijke dienstverlening.',
      },
      {
        titel: 'Bedrijfskunde + techniek',
        body: 'Hbo-bedrijfskunde, doorgegroeid in IT-optimalisatie, projectmanagement en procesverbetering. Combineert het zakelijke gesprek met de technische uitvoering — beide onder één dak.',
      },
      {
        titel: 'MKB-context',
        body: 'Werkt al jaren met Nederlandse MKB-ondernemers. Kent de echte pijnpunten: krappe bezetting, ontbrekende data-afdeling, grote behoefte aan ruimte, weinig aan abstracte strategie.',
      },
      {
        titel: 'Governance & guardrails',
        body: 'Alle agents draaien binnen expliciete beleidsregels. AVG, NEN 7510 (zorg), WWFT (financieel), beroepsgeheim (juridisch) — randvoorwaarden zijn vanaf dag één ingericht.',
      },
    ],
    knowsAbout: [
      'AI-agents',
      'Multi-agent systemen',
      'Procesautomatisering MKB',
      'AI-implementatie',
      'AI-integraties',
      'Bedrijfskunde',
      'IT-optimalisatie',
      'Projectmanagement',
      'Change management',
    ],
    alumniOf: 'Bedrijfskunde (hoger onderwijs)',
    publicatieSlugs: [
      'waarom-mkb-nu-klaar-is-voor-ai-agents',
      'guardrails-niet-een-rem-maar-een-kompas',
      'welk-proces-is-geschikt-voor-een-agent',
      'eerste-agent-is-nooit-de-belangrijkste',
      'integraties-makkelijker-dan-u-denkt',
      'vaste-bouwprijs-en-retainer',
    ],
    startedAt: '2026-01-01',
  },
  {
    slug: 'danny-rossenaar',
    voornaam: 'Danny',
    achternaam: 'Rossenaar',
    initialen: 'DR',
    rol: 'Sales & Marketing Manager',
    rolKort: 'Sales & Marketing',
    vestiging: 'Hoogkarspel · West-Friesland',
    email: 'danny@factumai.nl',
    portretSrc: '/danny.jpg',
    korteBio:
      'Verzorgt contact en marketing bij FactumAI. Vertaalt de vraag van ondernemers naar wat een AI-agent concreet oplevert, zonder technisch jargon.',
    langeBio: [
      'Als Sales & Marketing Manager verzorgt Danny het contact en de marketing bij FactumAI. Hij zit aan tafel bij ondernemers, luistert naar waar de werkdag stroef loopt, en vertaalt dat naar een helder voorstel: wat kan een agent overnemen, wat levert het op, en waar beginnen we.',
      'Hij bewaakt dat de belofte eerlijk blijft. Geen luchtkastelen, maar een concreet eerste resultaat binnen één tot twee weken. Wat aan tafel wordt beloofd, maken de bouwers waar.',
      'Daarnaast geeft hij FactumAI een gezicht naar buiten: van het klantcontact tot de verhalen die we delen over wat AI wél en niet voor het MKB kan betekenen.',
    ],
    expertise: [
      {
        titel: 'Sales voor het MKB',
        body: 'Begrijpt de ondernemer achter de vraag. Vertaalt een vaag "we moeten iets met AI" naar een concreet, behapbaar eerste project met een duidelijke opbrengst.',
      },
      {
        titel: 'Marketing & positionering',
        body: 'Zorgt dat het verhaal van FactumAI klopt en klopt blijft: eerlijk, nuchter en zonder hype. Van de website en kennisbank tot de eerste kennismaking.',
      },
      {
        titel: 'Van vraag naar voorstel',
        body: 'Brengt in kaart welk proces zich leent voor een agent, wat het oplevert en waar we klein beginnen, zodat de klant weet waar hij aan toe is voordat er gebouwd wordt.',
      },
      {
        titel: 'Klantrelatie',
        body: 'Korte lijnen, kort op de bal. Blijft betrokken na de kennismaking, zodat de samenwerking soepel loopt en de verwachtingen helder blijven.',
      },
    ],
    knowsAbout: [
      'Sales',
      'Marketing',
      'MKB',
      'Klantrelaties',
      'AI-agents',
      'Leadgeneratie',
      'Positionering',
    ],
    startedAt: '2026-06-01',
  },
];

export const TEAM_BY_SLUG = TEAM.reduce<Record<string, TeamMember>>((acc, m) => {
  acc[m.slug] = m;
  return acc;
}, {});
