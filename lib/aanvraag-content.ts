/**
 * Content voor de kale Google Ads-landingspagina's onder /aanvraag/[slug].
 *
 * Eén template, content per slug. De volledige advertentiekop is h1 plus
 * (indien gezet) h1Accent; samen moeten die woordelijk overeenkomen met de
 * kop waarop bezoekers klikken (message-match). h1Accent wordt in de hero
 * cursief en in oker gezet, zoals elders op de site. Nieuwe varianten voeg
 * je hier toe; er komen geen losse pagina's bij.
 *
 * De eerste twee slugs richten zich op bedrijven die nog weinig
 * geautomatiseerd hebben. De derde (ai-verder-uitbreiden) op bedrijven die
 * al losse tools of koppelingen draaien en verder willen.
 */

export interface AanvraagContent {
  slug: string;
  h1: string;
  h1Accent?: string;
  sub: string;
  offer: string[];
  ctaLabel: string;
}

export const AANVRAAG_PAGES: AanvraagContent[] = [
  {
    slug: 'ai-agent-laten-bouwen',
    h1: 'Een AI-agent',
    h1Accent: 'laten bouwen',
    sub: 'Wij bouwen agents op maat rond één proces in uw bedrijf. Vaste bouwprijs, eerste versie in 1 tot 2 weken live. Plan een gesprek en hoor of uw proces zich ervoor leent.',
    offer: [
      'U vertelt welk werk u uit handen wilt geven, wij vertellen wat daar technisch voor nodig is.',
      'U hoort met welk klein deel we zouden beginnen en hoe dat productieklaar wordt opgeleverd.',
      'Past het niet bij wat wij bouwen, dan hoort u dat ook. Geen opvolgmails.',
    ],
    ctaLabel: 'Plan een gesprek van 30 minuten',
  },
  {
    slug: 'proces-automatisering',
    h1: 'Proces-automatisering',
    sub: 'Orders, offertes, facturatie, planning: het handwerk daartussen is terugkerend werk volgens vaste regels. Precies dat werk kan een AI-agent overnemen. In 30 minuten kijken we samen waar bij u de winst zit.',
    offer: [
      'We lopen uw proces door: waar komt het werk binnen, wat wordt overgetikt, waar blijft het liggen.',
      'U hoort welke stappen zich lenen voor een agent en welke bij uw mensen blijven.',
      'U krijgt een eerlijk antwoord. Soms is dat ja, soms nee. Beide hoort u dezelfde middag.',
    ],
    ctaLabel: 'Plan een gesprek van 30 minuten',
  },
  {
    slug: 'ai-verder-uitbreiden',
    h1: 'Alles al',
    h1Accent: 'geautomatiseerd?',
    sub: 'U draait al het een en ander: koppelingen, een chatbot, wat Zapier of Make. Maar losse tools lopen ergens tegen hun grenzen aan. Plan een gesprek om te sparren over hoe AI geavanceerder en betrouwbaarder in uw organisatie kan werken.',
    offer: [
      'U vertelt wat er al draait en waar het knelt. Wij denken mee op inhoud, niet vanaf nul.',
      'We verkennen de volgende stap: maatwerk-agents, systemen die echt samenwerken, minder los zand.',
      'Is uw huidige opzet gewoon goed genoeg, dan hoort u dat ook. Dan laat u hem staan.',
    ],
    ctaLabel: 'Plan een gesprek van 30 minuten',
  },
];

export function getAanvraagContent(slug: string): AanvraagContent | undefined {
  return AANVRAAG_PAGES.find((p) => p.slug === slug);
}
