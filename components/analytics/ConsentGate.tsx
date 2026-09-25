'use client';

import { useCallback, useEffect, useState } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useOpOnderhoudPagina } from '@/lib/site/onderhoudPagina';
import { GA_ID, ADS_ID, adsConfigured, pageview, syncGoogleConsent } from '@/lib/analytics/gtag';
import {
  type Consent,
  readConsent,
  writeConsent,
  CONSENT_EVENT,
} from '@/lib/analytics/consent';

// Opt-in cookie-consent + Google Consent Mode v2.
//
// AVG-uitgangspunt: analytische (Google Analytics) en marketing (Google Ads)
// cookies plaatsen we pas ná expliciete toestemming, per categorie. Vóór
// akkoord wordt geen gtag.js geladen en niets gemeten. De "Marketing"-categorie
// verschijnt alleen als er echt een Google Ads-tag is geconfigureerd
// (NEXT_PUBLIC_GOOGLE_ADS_ID), zodat we geen toestemming vragen voor iets dat
// niets doet. De keuze is via "Cookievoorkeuren" in de footer altijd te
// herzien of in te trekken.

const REOPEN_EVENT = 'open-cookie-consent';

export function ConsentGate() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [ready, setReady] = useState(false);
  const [tagId, setTagId] = useState<string | null>(null);
  const pathname = usePathname();
  const opOnderhoud = useOpOnderhoudPagina();

  useEffect(() => {
    setConsent(readConsent());
    setReady(true);
    const reopen = () => {
      setShowPrefs(true);
      setBannerOpen(true);
    };
    window.addEventListener(REOPEN_EVENT, reopen);
    return () => window.removeEventListener(REOPEN_EVENT, reopen);
  }, []);

  useEffect(() => {
    const syncStoredChoice = (event: StorageEvent) => {
      if (event.key !== null && !event.key.startsWith('factumai.consent.')) return;
      const choice = readConsent();
      syncGoogleConsent(opOnderhoud ? null : choice);
      setConsent(choice);
    };
    window.addEventListener('storage', syncStoredChoice);
    return () => window.removeEventListener('storage', syncStoredChoice);
  }, [opOnderhoud]);

  const analytics = consent?.analytics ?? false;
  const marketing = consent?.marketing ?? false;
  const showMarketing = adsConfigured();

  // Zet de lokale consent/config-queue klaar vóór de externe library laadt.
  useEffect(() => {
    syncGoogleConsent(opOnderhoud ? null : { analytics, marketing });
    const loadAnalytics = analytics && Boolean(GA_ID);
    const loadAds = marketing && showMarketing;
    setTagId(!opOnderhoud && (loadAnalytics || loadAds) ? (loadAnalytics ? GA_ID : ADS_ID) : null);
  }, [analytics, marketing, showMarketing, opOnderhoud]);

  // Eerste view na opt-in en SPA-pageviews bij routewissel.
  useEffect(() => {
    if (!analytics || opOnderhoud) return;
    pageview(pathname);
  }, [pathname, analytics, opOnderhoud]);

  const persist = useCallback((c: Consent) => {
    // Synchroon intrekken: een klik of routewissel vóór de volgende render
    // mag niet doorgaan met de eerder verleende toestemming.
    syncGoogleConsent(c);
    writeConsent(c);
    setConsent(c);
    setBannerOpen(false);
    setShowPrefs(false);
    try {
      window.dispatchEvent(new Event(CONSENT_EVENT));
    } catch {
      /* ignore */
    }
  }, []);

  // Op de onderhoudspagina geen banner en geen tags: er valt niets te meten.
  if (opOnderhoud) return null;
  if (!GA_ID && !showMarketing) return null;

  const showBanner = ready && (consent === null || bannerOpen);

  return (
    <>
      {tagId && (
        <Script
          id="gtag-lib"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${tagId}`}
        />
      )}

      {showBanner && (
        <ConsentBanner
          initial={{ analytics, marketing }}
          showMarketing={showMarketing}
          showPrefs={showPrefs}
          onOpenPrefs={() => setShowPrefs(true)}
          onAcceptAll={() => persist({ analytics: true, marketing: showMarketing })}
          onRejectAll={() => persist({ analytics: false, marketing: false })}
          onSave={(c) => persist(c)}
        />
      )}
    </>
  );
}

function ConsentBanner({
  initial,
  showMarketing,
  showPrefs,
  onOpenPrefs,
  onAcceptAll,
  onRejectAll,
  onSave,
}: {
  initial: Consent;
  showMarketing: boolean;
  showPrefs: boolean;
  onOpenPrefs: () => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onSave: (c: Consent) => void;
}) {
  const [analytics, setAnalytics] = useState(initial.analytics);
  const [marketing, setMarketing] = useState(initial.marketing);

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

        {!showPrefs ? (
          <>
            <p className="mt-2 text-[13.5px] leading-[1.65] text-[var(--ink-dim)]">
              Wij gebruiken cookies om te zien hoe de site gebruikt wordt en hem te verbeteren
              {showMarketing ? ', en om onze advertenties te meten' : ''}. Alleen met uw
              toestemming. Noodzakelijke functies werken altijd. Meer leest u in onze{' '}
              <Link
                href="/privacy"
                className="text-[var(--oker-deep)] underline underline-offset-2 hover:text-[var(--ink)] transition-colors"
              >
                privacyverklaring
              </Link>
              .
            </p>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <button
                onClick={onOpenPrefs}
                className="order-3 sm:order-1 text-left sm:mr-auto font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-dim)] hover:text-[var(--ink)] underline underline-offset-4 transition-colors"
              >
                Voorkeuren aanpassen
              </button>
              <button
                onClick={onRejectAll}
                className="order-2 inline-flex items-center justify-center px-5 py-2.5 rounded-[10px] text-[13.5px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper-deep)] hover:border-[var(--oker)] transition-colors"
              >
                Alleen noodzakelijk
              </button>
              <button
                onClick={onAcceptAll}
                className="order-1 sm:order-3 inline-flex items-center justify-center px-5 py-2.5 rounded-[10px] text-[13.5px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
              >
                Accepteren
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="mt-2 text-[13px] leading-[1.6] text-[var(--ink-dim)]">
              Kies zelf welke cookies u toestaat. U kunt dit altijd wijzigen via
              &ldquo;Cookievoorkeuren&rdquo; onderaan de pagina.
            </p>

            <div className="mt-4 space-y-2.5">
              <CategoryRow
                titel="Noodzakelijk"
                body="Nodig om de site te laten werken en om uw cookiekeuze te onthouden. Deze staan altijd aan."
                checked
                locked
              />
              <CategoryRow
                titel="Analyse"
                body="Google Analytics: meet hoe de site gebruikt wordt, zodat we hem kunnen verbeteren."
                checked={analytics}
                onChange={setAnalytics}
              />
              {showMarketing && (
                <CategoryRow
                  titel="Marketing"
                  body="Google Ads: meet welke advertenties tot een aanvraag leiden en maakt relevante advertenties mogelijk."
                  checked={marketing}
                  onChange={setMarketing}
                />
              )}
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <button
                onClick={() => onSave({ analytics: false, marketing: false })}
                className="order-2 sm:order-1 sm:mr-auto inline-flex items-center justify-center px-5 py-2.5 rounded-[10px] text-[13.5px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper-deep)] hover:border-[var(--oker)] transition-colors"
              >
                Alles weigeren
              </button>
              <button
                onClick={() => onSave({ analytics, marketing: showMarketing ? marketing : false })}
                className="order-1 sm:order-2 inline-flex items-center justify-center px-5 py-2.5 rounded-[10px] text-[13.5px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
              >
                Voorkeuren opslaan
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CategoryRow({
  titel,
  body,
  checked,
  locked,
  onChange,
}: {
  titel: string;
  body: string;
  checked: boolean;
  locked?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-[14px] border border-[var(--paper-edge)] bg-[var(--paper-warm)] px-4 py-3">
      <div className="min-w-0">
        <div className="font-display text-[14.5px] text-[var(--ink)]">{titel}</div>
        <p className="mt-0.5 text-[12.5px] leading-[1.5] text-[var(--ink-dim)]">{body}</p>
      </div>
      <Toggle checked={checked} locked={locked} onChange={onChange} label={titel} />
    </div>
  );
}

function Toggle({
  checked,
  locked,
  onChange,
  label,
}: {
  checked: boolean;
  locked?: boolean;
  onChange?: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={`${label}${locked ? ' (altijd aan)' : ''}`}
      disabled={locked}
      onClick={() => onChange?.(!checked)}
      className={`relative mt-0.5 h-[22px] w-[38px] shrink-0 rounded-full transition-colors ${
        checked ? 'bg-[var(--oker-deep)]' : 'bg-[var(--paper-edge)]'
      } ${locked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className="absolute top-[3px] h-[16px] w-[16px] rounded-full bg-[var(--paper)] transition-all"
        style={{ left: checked ? '19px' : '3px', boxShadow: '0 1px 2px rgba(42,36,32,0.25)' }}
      />
    </button>
  );
}
