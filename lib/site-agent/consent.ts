// De tekst waar een bezoeker akkoord op geeft bij een terugbelverzoek.
//
// Bewust één constante, geïmporteerd door zowel de widget (die hem toont) als
// het endpoint (dat hem letterlijk opslaat bij de lead). Zou de widget zijn
// eigen tekst hebben, dan kun je achteraf niet aantonen waar iemand ja op zei.
//
// Even bewust: het model komt hier niet aan. De agent bepaalt wánneer hij het
// aanbod doet, maar de formulering van de toestemming is vast. Een LLM dat elke
// keer iets anders belooft, is geen toestemming die je kunt onderbouwen.
//
// Wijzig je de tekst, wijzig dan ook VERSIE. Bestaande leads houden de tekst die
// ze destijds hebben gezien — die staat als kopie op de lead zelf.

export const CONSENT_TEKST =
  'Ja, FactumAI mag contact met mij opnemen over dit gesprek. Mijn gegevens ' +
  'worden niet met derden gedeeld en ik kan dit altijd intrekken via ' +
  'info@factumai.nl.';

/** Ophogen bij elke inhoudelijke wijziging van CONSENT_TEKST. */
export const CONSENT_VERSIE = 1;

/** Wat we bij de lead vastleggen: de tekst zelf, met de versie ervoor. */
export function consentRegel(): string {
  return `[v${CONSENT_VERSIE}] ${CONSENT_TEKST}`;
}
