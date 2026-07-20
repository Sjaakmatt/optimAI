/**
 * Content voor de kale Google Ads-landingspagina's onder /aanvraag/[slug].
 *
 * Eén template, content per slug. De h1 moet woordelijk overeenkomen met de
 * advertentiekop waarop bezoekers klikken (message-match). Nieuwe varianten
 * voeg je hier toe; er komen geen losse pagina's bij.
 */

export interface AanvraagContent {
  slug: string;
  h1: string;
  sub: string;
  offer: string[];
  ctaLabel: string;
}

export const AANVRAAG_PAGES: AanvraagContent[] = [
  {
    slug: 'klantenservice-automatiseren',
    h1: 'Klantenservice automatiseren',
    sub: 'Een AI-agent die uw mailbox, vragen en meldingen afhandelt. In uw toon, volgens uw regels, met uw mensen aan het stuur. In een gesprek van 30 minuten hoort u of dat voor uw situatie werkt.',
    offer: [
      'We nemen door waar uw klantenservice nu tijd aan kwijt is en welke vragen steeds terugkomen.',
      'U hoort concreet welk deel een agent kan overnemen en wat bij uw mensen blijft.',
      'U krijgt een eerlijk antwoord. Zien wij er niks in, dan zeggen we dat dezelfde middag.',
    ],
    ctaLabel: 'Plan een gesprek van 30 minuten',
  },
];

export function getAanvraagContent(slug: string): AanvraagContent | undefined {
  return AANVRAAG_PAGES.find((p) => p.slug === slug);
}
