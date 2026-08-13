// Telefoonnummers uit het terugbelformulier.
//
// Los van de route zodat dit te testen is zonder database. Mensen typen hun
// nummer op tien manieren; we accepteren die allemaal en normaliseren daarna,
// in plaats van iemand op een format te laten stuklopen bij het enige moment
// waarop hij zegt dat hij gebeld wil worden.

/**
 * Wat we accepteren als invoer: cijfers, spaties, streepjes, punten, haakjes en
 * een plus. Lengte tussen 8 en 20 tekens, ruim genoeg voor een internationaal
 * nummer met opmaak.
 */
export const TELEFOON_PATROON = /^[0-9+()\-.\s]{8,20}$/;

/**
 * Haalt opmaak weg zodat het nummer belbaar in het CRM staat.
 *
 * `0031` wordt `+31`: die twee vormen zijn hetzelfde nummer, en anders staat
 * dezelfde persoon twee keer verschillend in de lijst.
 */
export function normaliseerTelefoon(ruw: string): string {
  const compact = ruw.replace(/[^\d+]/g, '');
  if (compact.startsWith('0031')) return `+31${compact.slice(4)}`;
  return compact;
}
