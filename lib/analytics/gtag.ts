// Dunne wrapper rond Google Analytics 4 (gtag). Alles is opt-in: de tag wordt
// pas geladen nadat de bezoeker in de cookiebanner toestemming heeft gegeven
// (zie components/analytics/ConsentGate.tsx). Deze helpers zijn no-ops zolang
// de actuele toestemming ontbreekt, ook als gtag al eerder geladen is.
//
// Window.gtag/dataLayer worden elders al globaal gedeclareerd
// (components/booking/useAdsConversion.ts); niet opnieuw declareren.

import { type Consent, readConsent } from './consent';

// GA4 Measurement ID. Standaard de FactumAI-property; via NEXT_PUBLIC_GA_ID in
// Vercel te overschrijven of (met een lege waarde) uit te zetten. Een GA-ID is
// publiek (staat toch in de paginabron), dus mag gerust in de repo staan.
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-QZQRD1D0BY';

// Google Ads (marketing). Leeg tot er een echte conversie-tag is. Zolang deze
// leeg is, verschijnt de "Marketing"-categorie in de cookiebanner niet en wordt
// er geen advertentiecookie geplaatst. Vul in Vercel in:
//   NEXT_PUBLIC_GOOGLE_ADS_ID    = AW-XXXXXXXXXX
//   NEXT_PUBLIC_GOOGLE_ADS_LABEL = <conversielabel>
export const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? '';
export const ADS_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL ?? '';

/** Is er een geldige Google Ads-tag geconfigureerd? (voor remarketing + tonen categorie) */
export const adsConfigured = (): boolean => /^AW-\d+$/.test(ADS_ID);

/** Kan er een conversie gevuurd worden? (Ads-ID én label aanwezig) */
export const adsConversionConfigured = (): boolean =>
  adsConfigured() && ADS_LABEL.length > 0 && !ADS_LABEL.includes('X');

type TagState = { consent: Consent; initialized: boolean; configured: Set<string> };
const tagStates = new WeakMap<Window, TagState>();

/**
 * Werk ook een reeds geladen tag direct bij. Alleen een eerste opt-in maakt
 * de lokale commandowachtrij; de externe library laadt ConsentGate daarna.
 */
export function syncGoogleConsent(consent: Consent | null): void {
  if (typeof window === 'undefined') return;
  const analytics = Boolean(GA_ID && consent?.analytics);
  const marketing = Boolean(adsConfigured() && consent?.marketing);
  const previous = tagStates.get(window);
  const changed = !previous || previous.consent.analytics !== analytics ||
    previous.consent.marketing !== marketing;
  const state = previous ?? { consent: { analytics, marketing }, initialized: false, configured: new Set<string>() };
  state.consent = { analytics, marketing };
  tagStates.set(window, state);

  // Consent Mode kan cookieloze pings toestaan. De GA-opt-out stopt ook
  // automatische Analytics-events na intrekken, zoals enhanced measurement.
  if (GA_ID) (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = !analytics;
  if (!analytics && !marketing && typeof window.gtag !== 'function') return;

  if (typeof window.gtag !== 'function') {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      // Het officiële gtag-queueformaat gebruikt een Arguments-object.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  }

  const initializing = !state.initialized;
  if (initializing) {
    window.gtag('consent', 'default', {
      analytics_storage: 'denied', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied',
    });
    window.gtag('js', new Date());
    state.initialized = true;
  }
  if (initializing || changed) {
    window.gtag('consent', 'update', {
      analytics_storage: analytics ? 'granted' : 'denied',
      ad_storage: marketing ? 'granted' : 'denied',
      ad_user_data: marketing ? 'granted' : 'denied',
      ad_personalization: marketing ? 'granted' : 'denied',
    });
  }
  if (analytics && !state.configured.has(GA_ID)) {
    // ConsentGate stuurt de eerste view en routewissels expliciet.
    window.gtag('config', GA_ID, { send_page_view: false });
    state.configured.add(GA_ID);
  }
  if (marketing && !state.configured.has(ADS_ID)) {
    window.gtag('config', ADS_ID);
    state.configured.add(ADS_ID);
  }
}

/** De sessiekeuze blijft geldig als localStorage niet schrijfbaar is. */
export function currentGoogleConsent(): Consent | null {
  if (typeof window === 'undefined') return null;
  return tagStates.get(window)?.consent ?? readConsent();
}

/** Handmatige pageview voor client-side navigatie (App Router). */
export function pageview(path: string) {
  if (!GA_ID || !currentGoogleConsent()?.analytics || typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    send_to: GA_ID,
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/**
 * Custom event. Geen meting zonder actuele Analytics-toestemming.
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (!GA_ID || !currentGoogleConsent()?.analytics || typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, { ...params, send_to: GA_ID });
}
