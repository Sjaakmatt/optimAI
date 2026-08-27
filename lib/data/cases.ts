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
  logo?: string; // path relative to /public, bv. '/logos/pavo.svg'
}

export const CASES: CaseStudy[] = [
  {
    slug: 'pavo-lead-agent',
    klant: 'Pavo',
    branche: 'HR-dienstverlening',
    logo: '/pavo-hr.svg',
    tagline: 'Sales-leads uit een kaartgebied. Niet meer handmatig zoeken.',
    intro:
      'Pavo levert HR-diensten aan Nederlandse bedrijven. Sales besteedde tot voor kort een groot deel van hun week aan het handmatig doorlopen van bedrijven per regio: welke past bij ons profiel, welke heeft mogelijk HR-behoefte, wie is de juiste contactpersoon? Wij hebben een lead-agent gebouwd die dat werk overneemt op basis van een geselecteerd gebied op de kaart.',
    uitdaging: [
      'Sales moest per regio bedrijf voor bedrijf handmatig onderzoeken, uren per lead',
      'Signalen over mogelijke HR-behoefte (groei, personeelsverloop, vacatures) zaten verspreid over meerdere bronnen',
      'Contactpersonen achterhalen kostte extra tijd per lead',
      'Het proces was niet schaalbaar: meer sales-inzet was de enige manier om meer leads te krijgen',
    ],
    oplossing: [
      'Sales selecteert een gebied op een interactieve kaart',
      'De agent doorzoekt dat gebied op bedrijven die matchen met het Pavo-klantprofiel',
      'Per bedrijf verzamelt de agent signalen die op HR-behoefte wijzen',
      'De juiste contactpersoon per bedrijf wordt opgezocht en toegevoegd aan de dataset',
      'Sales ontvangt een curated dataset met leads klaar voor benadering, ze doen het gesprek, niet het zoekwerk',
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
    logo: '/teka.svg',
    tagline: 'Inspectie op locatie: foto, annotatie, template naar werkvoorbereider.',
    intro:
      'TEKA Kranen inspecteert kranen op locatie. Het rapportageproces was tot voor kort een keten van dubbel werk: naar de locatie, foto maken, terug op kantoor uitprinten, met de hand notaties op de print, dan alles nogmaals digitaal uittekenen in het systeem, en tot slot in een Word-template plakken. Voor elke inspectie opnieuw. Wij hebben dat proces samen met TEKA in één digitale flow gebracht.',
    uitdaging: [
      'Inspectie op locatie → foto → terug naar kantoor voor verwerking',
      'Tekening met de hand op geprinte foto, verloren bij zoekraken, moeilijk te archiveren',
      'Dezelfde notaties nogmaals digitaal uittekenen in het interne systeem',
      'Rapportage handmatig samenstellen in Word: veel copy-paste, foutgevoelig',
      'Werkvoorbereider wachtte dagen op een compleet rapport',
    ],
    oplossing: [
      'Inspecteur maakt foto op locatie via tablet',
      'Annotaties (metingen, opmerkingen, aandachtspunten) direct op de foto op de tablet',
      'Agent vult het TEKA-inspectierapport pre-filled aan met foto, annotaties en meta-data',
      'Rapport gaat direct richting werkvoorbereider, geen tussenstap meer op kantoor',
    ],
    resultaat: [
      { metric: 'Van dagen naar uren', label: 'doorlooptijd inspectie tot rapport' },
      { metric: 'Eén keer noteren', label: 'in plaats van printen + hertekenen' },
      { metric: 'Op locatie klaar', label: 'geen terugkeer naar kantoor voor verwerking' },
    ],
    doorlooptijd: 'In productie',
  },
  {
    slug: 'bint-projectdashboard',
    klant: 'B_inT',
    branche: 'Interieurbouw & maatwerk keukens',
    logo: '/bint.svg',
    tagline: 'Van eerste aanvraag tot oplevering, één dossier dat zichzelf bijhoudt.',
    intro:
      'B_inT ontwerpt en bouwt maatwerkkeukens en interieurs. Elk project begint als een verzameling losse dingen: een klant die belt, maten die op locatie worden opgenomen, materiaalkeuzes die gaandeweg veranderen, een planning die van meerdere leveranciers afhangt. Die informatie zat verspreid over mail, appjes, foto’s op telefoons en mappen op de server. Wij hebben een dashboard gebouwd dat een nieuwe klant en zijn project automatisch aanmaakt, en dat het project daarna door de fasen stuurt.',
    uitdaging: [
      'Elke nieuwe opdracht begon met dezelfde gegevens op meerdere plekken overtypen',
      'Projectinformatie zat verspreid over mail, telefoons en losse mappen, zonder één plek waar het klopte',
      'De stand van zaken was alleen bekend bij degene die er die week aan werkte',
      'Welke keuze wanneer gemaakt was, bleek achteraf lastig terug te vinden',
      'Opvolging hing aan geheugen: wie belt de klant, wie bestelt het materiaal, wie plant de montage',
    ],
    oplossing: [
      'Klant en project worden automatisch aangemaakt zodra een aanvraag binnenkomt, inclusief dossier',
      'De intake wordt uitgevraagd en vastgelegd vóór het eerste gesprek, niet erna',
      'Het project loopt langs vaste fasen, van intake en ontwerp tot productie, montage en oplevering',
      'Per fase bepaalt het dashboard wat er klaar moet zijn en wie aan zet is, en zet dat klaar in plaats van erom te vragen',
      'Maten, materiaalkeuzes, foto’s en afspraken hangen aan datzelfde dossier en blijven daar staan',
      'Iedereen ziet de status zonder iemand te hoeven bellen',
    ],
    resultaat: [
      { metric: 'Eén dossier', label: 'in plaats van mail, appjes en losse mappen' },
      { metric: 'Onboarding vanzelf', label: 'klant en project staan klaar zonder overtypen' },
      { metric: 'Status zonder navragen', label: 'elke fase zichtbaar voor wie kijkt' },
    ],
    doorlooptijd: 'In productie',
  },
  {
    // Let op: dit logo is een reconstructie, geen aangeleverd merkbestand.
    // De toelichting staat boven in public/driehoek.svg.
    slug: 'praktijk-de-driehoek-praktijksysteem',
    klant: 'Praktijk de Driehoek',
    branche: 'Coaching & therapie',
    logo: '/driehoek.svg',
    tagline: 'Van aanmelding tot factuur en lesmateriaal, zonder dat de praktijk administratie wordt.',
    intro:
      'Praktijk de Driehoek begeleidt mensen met coaching en therapie. Het werk zit in de sessie, niet in de administratie eromheen. Maar die administratie is er wel: een aanmelding die binnenkomt, een intake die moet worden vastgelegd, afspraken die verzet worden, facturen die eruit moeten, en materiaal dat een cliënt tussen twee sessies door nodig heeft. Dat liep met de hand, meestal buiten praktijkuren om. Wij hebben er één systeem van gemaakt dat bij de aanmelding begint en de rest daaruit laat volgen.',
    uitdaging: [
      'Elke aanmelding begon met dezelfde gegevens opnieuw overnemen, op meerdere plekken',
      'Intake, afspraken en de voortgang van een traject stonden los van elkaar',
      'Facturen werden per sessie met de hand opgemaakt en nagelopen, na werktijd',
      'Lesmateriaal ging los per mail, dus wie wat wanneer had gekregen was lastig terug te zien',
      'Tijd die naar administratie ging, ging niet naar cliënten',
    ],
    oplossing: [
      'Een aanmelding maakt automatisch een cliëntdossier aan, met de intake er meteen in',
      'Het traject loopt langs vaste stappen, van kennismaking en intake tot sessies en afronding',
      'Facturatie volgt uit wat er werkelijk is geweest, in plaats van uit een aparte administratie achteraf',
      'Lesmateriaal hangt aan de stap in het traject waar het bij hoort en gaat op dat moment naar de cliënt',
      'De praktijk ziet in één overzicht wie waar in zijn traject zit en wat er nog moet gebeuren',
      'Wat naar een cliënt gaat, gaat pas nadat een mens het heeft gezien. Bij een praktijk die met vertrouwelijke verhalen werkt is dat geen detail maar het uitgangspunt',
    ],
    resultaat: [
      { metric: 'Aanmelding wordt dossier', label: 'zonder overtypen' },
      { metric: 'Factuur volgt de sessie', label: 'geen losse administratie achteraf' },
      { metric: 'Materiaal op tijd', label: 'gekoppeld aan de stap in het traject' },
    ],
    doorlooptijd: 'In productie',
  },
];

export const CASE_BY_SLUG = CASES.reduce<Record<string, CaseStudy>>((acc, c) => {
  acc[c.slug] = c;
  return acc;
}, {});
