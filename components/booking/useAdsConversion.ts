'use client';

import { useEffect } from 'react';
import { getCalApi } from './calLoader';

/**
 * GOOGLE ADS CONVERSIETRACKING voor de /aanvraag-landingspagina's.
 *
 * De conversie vuurt uitsluitend op een succesvolle boeking in de Cal.com
 * inline embed (event 'bookingSuccessful'), niet op paginabezoek of klik.
 *
 * Waar komen GOOGLE_ADS_ID en GOOGLE_ADS_CONVERSION_LABEL vandaan?
 * 1. Google Ads > Doelen > Conversies > Nieuwe conversieactie.
 * 2. Kies 'Website', categorie 'Afspraak boeken' (of 'Lead').
 * 3. Kies bij de installatie voor 'De tag zelf installeren' /
 *    'handmatig via code'. Google toont dan een tag-ID in de vorm
 *    AW-123456789 (dat is GOOGLE_ADS_ID) en een conversielabel, een korte
 *    tekenreeks zoals 'AbCdEfGhIj0123456789' (dat is het LABEL).
 * 4. Vul beide hieronder in en deploy. Meer is er niet aan.
 *
 * Zolang de placeholders niet vervangen zijn wordt gtag.js niet geladen en
 * wordt er niets gemeten; de pagina werkt verder gewoon.
 *
 * Het project heeft verder geen Google-tag (alleen Vercel Analytics), dus
 * deze hook is de enige plek die gtag laadt. Mocht er ooit sitewide een
 * Google-tag bijkomen: de check op window.gtag hieronder voorkomt dat de
 * tag dubbel wordt geladen.
 */

const GOOGLE_ADS_ID = 'AW-XXXXXXXXXX';
const GOOGLE_ADS_CONVERSION_LABEL = 'XXXXXXXXXXXXXXXXXXX';

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

function isConfigured(): boolean {
  return /^AW-\d+$/.test(GOOGLE_ADS_ID) && !GOOGLE_ADS_CONVERSION_LABEL.includes('X');
}

function ensureGtag(): GtagFn {
  // Bestaande gtag (bv. later sitewide toegevoegd) hergebruiken — nooit
  // een tweede keer laden.
  if (window.gtag) return window.gtag;

  window.dataLayer = window.dataLayer || [];
  const gtag: GtagFn = function (...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag = gtag;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
  document.head.appendChild(script);

  gtag('js', new Date());
  gtag('config', GOOGLE_ADS_ID);

  return gtag;
}

let listenerRegistered = false;
let conversionFired = false;

/**
 * Laadt gtag (alleen op pagina's die deze hook gebruiken) en vuurt de
 * Google Ads-conversie zodra Cal.com een succesvolle boeking meldt.
 */
export function useAdsConversion(): void {
  useEffect(() => {
    if (!isConfigured()) {
      console.info('[ads] Google Ads ID/label nog niet ingevuld, tracking staat uit.');
      return;
    }
    if (listenerRegistered) return;
    listenerRegistered = true;

    ensureGtag();

    getCalApi()
      .then((ns) => {
        ns('on', {
          action: 'bookingSuccessful',
          callback: () => {
            // Eén conversie per pageview, ook als Cal het event dubbel meldt.
            if (conversionFired) return;
            conversionFired = true;
            window.gtag?.('event', 'conversion', {
              send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
            });
          },
        });
      })
      .catch((err) => {
        console.warn('[ads] kon bookingSuccessful-listener niet registreren:', err);
      });
  }, []);
}
