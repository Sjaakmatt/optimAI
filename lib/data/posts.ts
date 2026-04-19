export type PostBlock =
  | { kind: 'p'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'quote'; text: string; by?: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'divider' };

export interface Post {
  slug: string;
  title: string;
  lede: string;
  author: string;
  published: string; // ISO date
  readingMinutes: number;
  tags: string[];
  blocks: PostBlock[];
}

export const POSTS: Post[] = [
  {
    slug: 'waarom-mkb-nu-klaar-is-voor-ai-agents',
    title: 'Waarom het MKB nu klaar is voor AI-agents',
    lede:
      'Drie jaar geleden konden agents niet goed genoeg werk afleveren om ze los te laten op klantmails. Dat is dit jaar veranderd — en de gevolgen zijn groter voor kleine bedrijven dan voor grote.',
    author: 'Sjaak Mattheij',
    published: '2026-03-12',
    readingMinutes: 6,
    tags: ['MKB', 'agents', 'trends'],
    blocks: [
      {
        kind: 'p',
        text:
          'Iedereen heeft de afgelopen twee jaar wel eens iets gedemonstreerd gekregen met generatieve AI. Chatbots, tekstgeneratoren, plaatjes. Leuk, niet altijd bruikbaar. Dat is in 2025-2026 fundamenteel gekanteld — niet omdat de modellen slimmer zijn (dat ook), maar omdat het tooling-landschap er omheen volwassen is geworden.',
      },
      { kind: 'h2', text: 'Wat er praktisch veranderd is' },
      {
        kind: 'list',
        items: [
          'Agents kunnen betrouwbaar koppelen met bestaande systemen — e-mail, boekhoudpakket, CRM, magazijn.',
          'Beleidsregels zijn niet meer een stuk prompt, maar een configureerbare laag die mensen zelf kunnen aan/uitzetten.',
          'Hallucineren komt nog voor, maar is voorspelbaar en af te vangen met checks.',
          'Integraties zijn met een paar dagen werk te bouwen, niet met een paar maanden.',
        ],
      },
      { kind: 'h2', text: 'Waarom juist het MKB nu stappen kan maken' },
      {
        kind: 'p',
        text:
          'Grote concerns hebben in hun backoffice al veel geautomatiseerd — SAP, Oracle, custom workflows. Voor hen is een AI-agent een extra schil bovenop bestaande automatisering. Interessant, maar niet levensveranderend.',
      },
      {
        kind: 'p',
        text:
          'Bij MKB-bedrijven is de situatie omgekeerd. Veel wordt nog via mail en Excel gedaan. Eén goed gebouwde agent neemt daar direct 30-60% van de administratieve tijd weg. De impact is groter, de bouwtijd korter, de ROI meetbaar binnen één maand.',
      },
      {
        kind: 'quote',
        text:
          'De dingen die grote bedrijven in 2005 met ERP hebben gedaan — standaardiseren, koppelen, automatiseren — kan een MKB\u2019er nu in één kwartaal met een agent.',
      },
      { kind: 'h2', text: 'Wat dit betekent voor 2026' },
      {
        kind: 'p',
        text:
          'Wij verwachten dat de bedrijven die nu beginnen over twee jaar een onhaalbare voorsprong hebben in hun branche. Niet omdat ze “meer met AI doen”, maar omdat ze met dezelfde bezetting 30% meer omzet draaien. Dat vertaalt zich naar investeringsruimte, inkoopkracht, en werksnelheid richting klanten.',
      },
      {
        kind: 'p',
        text:
          'De adoptiecurve loopt hard. Maar in tegenstelling tot eerdere technologische golven is de instapdrempel laag: één agent, vaste prijs, 4-8 weken live. Geen groot project-bord nodig.',
      },
    ],
  },
  {
    slug: 'guardrails-niet-een-rem-maar-een-kompas',
    title: 'Guardrails — niet een rem, maar een kompas',
    lede:
      'De grootste angst bij agents: “straks doet hij iets stoms wat mij geld kost”. Terecht. Maar de oplossing is niet de agent kleiner maken. De oplossing is expliciete beleidsregels.',
    author: 'Sjaak Mattheij',
    published: '2026-02-22',
    readingMinutes: 5,
    tags: ['guardrails', 'beleid', 'governance'],
    blocks: [
      {
        kind: 'p',
        text:
          'Elke agent die wij bouwen heeft een laag met beleidsregels erboven. Die laag bepaalt wat automatisch mag, en wat langs een mens moet. De MKB’er stelt deze regels zelf in, en kan ze elke dag aanpassen als hij voortschrijdend inzicht heeft.',
      },
      { kind: 'h2', text: 'Voorbeelden uit de praktijk' },
      {
        kind: 'list',
        items: [
          'Bedragen boven € 5.000 altijd langs directie.',
          'Overheidsklanten: betaaltermijn standaard 30 dagen, geen aanbetaling.',
          'Klanten met >10 orders en 0 klachten: coulance toepassen zonder discussie over schuldvraag.',
          'Bij vertraging: alternatief transporteur inschakelen tot € 200 meerkosten.',
          'Drie herinneringen, dan juridisch — tenzij klantgeschiedenis anders zegt.',
        ],
      },
      { kind: 'h2', text: 'Waarom dit zo goed werkt' },
      {
        kind: 'p',
        text:
          'Omdat beleid expliciet wordt. De impliciete kennis die tot nu toe alleen in het hoofd van Saskia op finance zat — “die klant bellen we eerst” — komt nu op een plek waar iedereen het kan zien en bijstellen.',
      },
      {
        kind: 'p',
        text:
          'Bij uitval van Saskia valt de kennis niet weg. Bij een nieuwe medewerker hoef je niet maandenlang te coachen op intuïtie. De regels staan, de agent volgt ze, en als je het beleid wil veranderen, verander je één schakelaar.',
      },
      {
        kind: 'quote',
        text:
          'Een goed gebouwde agent is een organisatie met expliciet beleid. Zo simpel is het.',
      },
      { kind: 'h2', text: 'Wat mensen fout doen' },
      {
        kind: 'list',
        items: [
          'Te veel regels in één keer — begin met 5-10 per afdeling, breid uit als je merkt waar de vragen liggen.',
          'Beleid niet bijhouden — als je regels niet elke maand even tegen het licht houdt, verouderen ze.',
          'Beleid en techniek door elkaar halen — de beleidsregel “niet juridisch bij trouwe klant” is losstaand van hoe de agent het technisch implementeert.',
        ],
      },
    ],
  },
  {
    slug: 'dashboards-die-niemand-opent',
    title: 'Dashboards die niemand opent',
    lede:
      'De laatste 20 jaar is elk SaaS-bedrijf beloond voor het bouwen van een dashboard. En elke MKB’er heeft logins voor 14 daarvan, waar hij er hooguit 2 regelmatig gebruikt. AI-agents werken beter zonder.',
    author: 'Sjaak Mattheij',
    published: '2026-02-03',
    readingMinutes: 4,
    tags: ['filosofie', 'UX', 'tooling'],
    blocks: [
      {
        kind: 'p',
        text:
          'Elke keer als we bij een MKB-klant binnenlopen, is het eerste gesprek hetzelfde. “Welke software gebruikt u?” Het antwoord: een lijst van 8-15 tools, waarvan de helft door één specifieke medewerker wordt bediend. De baas heeft logins, maar kijkt er zelden naar.',
      },
      {
        kind: 'p',
        text:
          'Dat is geen gebrek aan interesse. Dat is een gebrek aan tijd. Een dashboard vraagt actie: inloggen, filter instellen, grafiek interpreteren. Als de antwoorden niet urgent zijn, gebeurt het niet.',
      },
      { kind: 'h2', text: 'Wat werkt dan wel' },
      {
        kind: 'p',
        text:
          'Wij bouwen agents die zelf naar u toe komen met dingen die uw aandacht nodig hebben. Geen dashboard — een belnotitie die klaarstaat. Een klantmail die niet is verzonden omdat het bedrag boven uw mandaat valt. Een werkbak met drie zaken die u kort moet afvinken.',
      },
      {
        kind: 'quote',
        text:
          'Als u de app nog moet openen om iets te zien, dan is het te laat. Goede automatisering komt uw bureau op.',
      },
      { kind: 'h2', text: 'Concrete implicaties' },
      {
        kind: 'list',
        items: [
          'In plaats van een KPI-dashboard: een maandrapport per e-mail met drie zinnen.',
          'In plaats van een CRM-scherm: een belnotitie in de inbox van de verantwoordelijke.',
          'In plaats van een voorraad-alert-app: de agent die zelf al een inkooporder heeft klaargezet.',
        ],
      },
      {
        kind: 'p',
        text:
          'Het idee is simpel: u heeft geen tijd om een tool te bedienen. Dus bouwen we iets dat zelf komt aanlopen.',
      },
    ],
  },
];

export const POST_BY_SLUG = POSTS.reduce<Record<string, Post>>((acc, p) => {
  acc[p.slug] = p;
  return acc;
}, {});
