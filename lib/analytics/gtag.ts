// Dunne wrapper rond Google Analytics 4 (gtag). Alles is opt-in: de tag wordt
// pas geladen nadat de bezoeker in de cookiebanner toestemming heeft gegeven
// (zie components/analytics/ConsentGate.tsx). Deze helpers zijn no-ops zolang
// gtag niet op window staat, dus ze zijn overal veilig aan te roepen, ook
// server-side (guard op window) en zonder toestemming.
//
// Window.gtag/dataLayer worden elders al globaal gedeclareerd
// (components/booking/useAdsConversion.ts); niet opnieuw declareren.

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

/** Handmatige pageview voor client-side navigatie (App Router). */
export function pageview(path: string) {
  if (!GA_ID || typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/**
 * Custom event. No-op als GA nog niet geladen is (geen toestemming), zodat we
 * dit gerust overal in de UI kunnen aanroepen zonder null-checks.
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}
