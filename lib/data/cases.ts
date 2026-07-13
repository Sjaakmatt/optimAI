export interface CaseStudy {
  slug: string;
  klant: string;
  branche: string;
  regio?: string;
  tagline: string;
  intro: string;
  uitdaging: string[];
  oplossing: string[];
  resultaat: Array<{ metric: string; label: string }>;
  quote?: { text: string; by: string; role: string };
  doorlooptijd?: string;
  logo?: string; // path relative to /public — bv. '/logos/pavo.svg'
}

export const CASES: CaseStudy[] = [
  {
    slug: 'pavo-lead-agent',
    klant: 'Pavo',
    branche: 'HR-dienstverlening',
    tagline: 'Sales-leads uit een kaartgebied. Niet meer handmatig zoeken.',
    intro:
      'Pavo levert HR-diensten aan Nederlandse bedrijven. Sales besteedde tot voor kort een groot deel van hun week aan het handmatig doorlopen van bedrijven per regio: welke past bij ons profiel, welke heeft mogelijk HR-behoefte, wie is de juiste contactpersoon? Wij hebben een lead-agent gebouwd die dat werk overneemt op basis van een geselecteerd gebied op de kaart.',
    uitdaging: [
      'Sales moest per regio bedrijf voor bedrijf handmatig onderzoeken — uren per lead',
      'Signalen over mogelijke HR-behoefte (groei, personeelsverloop, vacatures) zaten verspreid over meerdere bronnen',
      'Contactpersonen achterhalen kostte extra tijd per lead',
      'Het proces was niet schaalbaar: meer sales-inzet was de enige manier om meer leads te krijgen',
    ],
    oplossing: [
      'Sales selecteert een gebied op een interactieve kaart',
      'De agent doorzoekt dat gebied op bedrijven die matchen met het Pavo-klantprofiel',
      'Per bedrijf verzamelt de agent signalen die op HR-behoefte wijzen',
      'De juiste contactpersoon per bedrijf wordt opgezocht en toegevoegd aan de dataset',
      'Sales ontvangt een curated dataset met leads klaar voor benadering — ze doen het gesprek, niet het zoekwerk',
    ],
    resultaat: [
      { metric: 'Uren → minuten', label: 'per regio-scan' },
      { metric: 'Curated dataset', label: 'in plaats van los speurwerk' },
      { metric: 'Schaalbaar', label: 'meer leads zonder meer sales-inzet' },
    ],
    doorlooptijd: 'In productie',
  },
  {
    slug: 'teka-kranen-inspectie',
    klant: 'TEKA Kranen',
    branche: 'Kraanverhuur & inspectie',
    tagline: 'Inspectie op locatie: foto, annotatie, template naar werkvoorbereider.',
    intro:
      'TEKA Kranen inspecteert kranen op locatie. Het rapportageproces was tot voor kort een keten van dubbel werk: naar de locatie, foto maken, terug op kantoor uitprinten, met de hand notaties op de print, dan alles nogmaals digitaal uittekenen in het systeem, en tot slot in een Word-template plakken. Voor elke inspectie opnieuw. Wij hebben dat proces samen met TEKA in één digitale flow gebracht.',
    uitdaging: [
      'Inspectie op locatie → foto → terug naar kantoor voor verwerking',
      'Tekening met de hand op geprinte foto — verloren bij zoekraken, moeilijk te archiveren',
      'Dezelfde notaties nogmaals digitaal uittekenen in het interne systeem',
      'Rapportage handmatig samenstellen in Word: veel copy-paste, foutgevoelig',
      'Werkvoorbereider wachtte dagen op een compleet rapport',
    ],
    oplossing: [
      'Inspecteur maakt foto op locatie via tablet',
      'Annotaties (metingen, opmerkingen, aandachtspunten) direct op de foto op de tablet',
      'Agent vult het TEKA-inspectierapport pre-filled aan met foto, annotaties en meta-data',
      'Rapport gaat direct richting werkvoorbereider — geen tussenstap meer op kantoor',
    ],
    resultaat: [
      { metric: 'Van dagen naar uren', label: 'doorlooptijd inspectie tot rapport' },
      { metric: 'Eén keer noteren', label: 'in plaats van printen + hertekenen' },
      { metric: 'Op locatie klaar', label: 'geen terugkeer naar kantoor voor verwerking' },
    ],
    doorlooptijd: 'In productie',
  },
];

export const CASE_BY_SLUG = CASES.reduce<Record<string, CaseStudy>>((acc, c) => {
  acc[c.slug] = c;
  return acc;
}, {});
