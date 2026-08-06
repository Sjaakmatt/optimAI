// Toestemming per categorie. Wordt gedeeld door de cookiebanner
// (ConsentGate) en de Google Ads-conversietracking (useAdsConversion).
//
// Opslag in localStorage als JSON. We migreren de oude v1-waarde
// ('granted'/'denied', die alleen analytics dekte) automatisch naar v2.

export interface Consent {
  analytics: boolean;
  marketing: boolean;
}

const KEY_V2 = 'factumai.consent.v2';
const KEY_V1 = 'factumai.consent.v1';

/** Event dat afgaat zodra de bezoeker een keuze opslaat, zodat andere
 *  componenten (bv. de Ads-conversie) hun gedrag kunnen bijstellen. */
export const CONSENT_EVENT = 'factumai-consent-change';

export function readConsent(): Consent | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(KEY_V2);
    if (raw) {
      const o = JSON.parse(raw) as Partial<Consent>;
      return { analytics: !!o.analytics, marketing: !!o.marketing };
    }
    // Migratie van de oude, alleen-analytics keuze.
    const v1 = window.localStorage.getItem(KEY_V1);
    if (v1 === 'granted') return { analytics: true, marketing: false };
    if (v1 === 'denied') return { analytics: false, marketing: false };
    return null;
  } catch {
    return null;
  }
}

export function writeConsent(c: Consent): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(KEY_V2, JSON.stringify(c));
  } catch {
    /* private mode e.d., keuze geldt dan alleen deze sessie */
  }
}
