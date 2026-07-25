'use client';

import { useEffect } from 'react';
import { getCalApi } from './calLoader';
import { ADS_ID, ADS_LABEL, adsConversionConfigured } from '@/lib/analytics/gtag';
import { readConsent } from '@/lib/analytics/consent';

/**
 * GOOGLE ADS CONVERSIETRACKING voor de /aanvraag-landingspagina's.
 *
 * De conversie vuurt uitsluitend op een succesvolle boeking in de Cal.com
 * inline embed (event 'bookingSuccessful'), en alleen als:
 *   1. er een geldige Google Ads-tag is geconfigureerd
 *      (NEXT_PUBLIC_GOOGLE_ADS_ID = AW-… en NEXT_PUBLIC_GOOGLE_ADS_LABEL), en
 *   2. de bezoeker in de cookiebanner "Marketing" heeft toegestaan.
 *
 * gtag.js wordt niet hier geladen: ConsentGate laadt en configureert de
 * Google Ads-tag zodra er marketing-toestemming is (Consent Mode v2). Deze
 * hook registreert alleen de conversie zelf. Zolang de Ads-ID leeg is of er
 * geen toestemming is, gebeurt er niets.
 */

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

let listenerRegistered = false;
let conversionFired = false;

export function useAdsConversion(): void {
  useEffect(() => {
    if (!adsConversionConfigured()) {
      console.info('[ads] Google Ads-ID/label niet ingevuld, conversietracking staat uit.');
      return;
    }
    if (listenerRegistered) return;
    listenerRegistered = true;

    getCalApi()
      .then((ns) => {
        ns('on', {
          action: 'bookingSuccessful',
          callback: () => {
            if (conversionFired) return;
            // Alleen met marketing-toestemming; gtag is dan door ConsentGate
            // geladen met de Ads-config.
            if (!readConsent()?.marketing || typeof window.gtag !== 'function') return;
            conversionFired = true;
            window.gtag('event', 'conversion', {
              send_to: `${ADS_ID}/${ADS_LABEL}`,
            });
          },
        });
      })
      .catch((err) => {
        console.warn('[ads] kon bookingSuccessful-listener niet registreren:', err);
      });
  }, []);
}
