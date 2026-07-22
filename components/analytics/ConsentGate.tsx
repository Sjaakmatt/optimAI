'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { GA_ID, pageview } from '@/lib/analytics/gtag';

// Opt-in cookie-consent + Google Analytics 4.
//
// AVG-uitgangspunt: Google Analytics plaatst cookies en verwerkt persoons-
// gegevens, dus wij laden de tag pas ná expliciete toestemming. Vóór akkoord
// wordt er geen gtag.js geladen en niets gemeten. De keuze wordt bewaard en is
// via "Cookievoorkeuren" in de footer altijd te herzien (event 'open-cookie-
// consent'). Zonder NEXT_PUBLIC_GA_ID is er niets te meten en tonen we ook
// geen banner.

const STORAGE_KEY = 'factumai.consent.v1';
const REOPEN_EVENT = 'open-cookie-consent';

type Choice = 'granted' | 'denied' | null;

function readChoice(): Choice {
  if (typeof window === 'undefined') return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

export function ConsentGate() {
  const [choice, setChoice] = useState<Choice>(null);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const pathname = usePathname();
  const firstRun = useRef(true);

  useEffect(() => {
    setChoice(readChoice());
    setReady(true);
    const reopen = () => setBannerOpen(true);
    window.addEventListener(REOPEN_EVENT, reopen);
    return () => window.removeEventListener(REOPEN_EVENT, reopen);
  }, []);

  const granted = choice === 'granted';

  // SPA-pageviews bij routewissel. De eerste view wordt door de GA-config
  // (send_page_view) zelf gemeten, dus die slaan we hier over.
  useEffect(() => {
    if (!granted) return;
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    pageview(pathname);
  }, [pathname, granted]);

  const persist = useCallback((value: 'granted' | 'denied') => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* private mode e.d. — keuze geldt dan alleen deze sessie */
    }
    setChoice(value);
    setBannerOpen(false);
  }, []);

  if (!GA_ID) return null;

  const showBanner = ready && (choice === null || bannerOpen);

  return (
    <>
      {granted && (
        <>
          <Script
            id="ga-lib"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('consent', 'default', {
                ad_storage: 'granted',
                ad_user_data: 'granted',
                ad_personalization: 'granted',
                analytics_storage: 'granted'
              });
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {showBanner && (
        <ConsentBanner onAccept={() => persist('granted')} onReject={() => persist('denied')} />
      )}
    </>
  );
}

function ConsentBanner({
  onAccept,
  onReject,
}: {
  onAccept: () => void;
  onReject: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-label="Cookievoorkeuren"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[200] px-3 pb-3 sm:px-5 sm:pb-5 pointer-events-none"
    >
      <div
        className="mx-auto max-w-[560px] pointer-events-auto bg-[var(--paper)] border border-[var(--paper-edge)] rounded-[4px] px-5 py-5 sm:px-6 sm:py-6"
        style={{ boxShadow: 'var(--shadow-lift, 0 12px 40px rgba(42,36,32,0.18))' }}
      >
        <div className="font-mono text-[10px] text-[var(--oker-deep)] uppercase tracking-[0.18em]">
          Cookies
        </div>
        <p className="mt-2 text-[13.5px] leading-[1.65] text-[var(--ink-dim)]">
          Wij gebruiken analytische cookies (Google Analytics) om te zien hoe de site gebruikt
          wordt en hem te verbeteren. Alleen met uw toestemming. Noodzakelijke functies werken
          altijd. Meer leest u in onze{' '}
          <a
            href="/privacy"
            className="text-[var(--oker-deep)] underline underline-offset-2 hover:text-[var(--ink)] transition-colors"
          >
            privacyverklaring
          </a>
          .
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={onAccept}
            className="order-1 sm:order-2 inline-flex items-center justify-center px-5 py-2.5 rounded-[2px] text-[13.5px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
          >
            Accepteren
          </button>
          <button
            onClick={onReject}
            className="order-2 sm:order-1 inline-flex items-center justify-center px-5 py-2.5 rounded-[2px] text-[13.5px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper-deep)] hover:border-[var(--oker)] transition-colors"
          >
            Alleen noodzakelijk
          </button>
        </div>
      </div>
    </div>
  );
}
