// Dunne wrapper rond Google Analytics 4 (gtag). Alles is opt-in: de tag wordt
// pas geladen nadat de bezoeker in de cookiebanner toestemming heeft gegeven
// (zie components/analytics/ConsentGate.tsx). Deze helpers zijn no-ops zolang
// gtag niet op window staat, dus ze zijn overal veilig aan te roepen — ook
// server-side (guard op window) en zonder toestemming.
//
// Window.gtag/dataLayer worden elders al globaal gedeclareerd
// (components/booking/useAdsConversion.ts); niet opnieuw declareren.

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

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
