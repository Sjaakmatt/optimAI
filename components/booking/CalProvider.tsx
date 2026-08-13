'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getCalApi } from './calLoader';
import { calPopupAttrs } from './config';
import { trackEvent } from '@/lib/analytics/gtag';
import { verbergZwevendeKnoppen } from '@/lib/site-agent/pad-naar-playbook';

let bookingListenerAttached = false;

/**
 * Zwevende "Plan gesprek"-knop rechtsonder. Eigen knop in de huisstijl
 * i.p.v. Cal's ingebouwde floatingButton, die was fors en slecht
 * gecentreerd. De klik opent dezelfde Cal-popup via de data-cal-attrs;
 * de embed wordt in de effect alvast geladen zodat de popup direct opent.
 */
export function CalProvider() {
  const pathname = usePathname();
  // Gedeeld met de site-agent, zodat de twee zwevende knoppen niet op
  // verschillende pagina's los van elkaar opduiken.
  const hideFloating = verbergZwevendeKnoppen(pathname);

  useEffect(() => {
    if (hideFloating) return;
    getCalApi()
      .then((ns) => {
        // Eén keer een booking-event registreren voor analytics (no-op zonder
        // toestemming; trackEvent guardt op window.gtag).
        if (bookingListenerAttached) return;
        bookingListenerAttached = true;
        ns('on', {
          action: 'bookingSuccessful',
          callback: () => trackEvent('book_intro', { source: 'floating' }),
        });
      })
      .catch((err) => {
        console.warn('[cal] embed init failed:', err);
      });
  }, [hideFloating]);

  if (hideFloating) return null;

  return (
    <button
      type="button"
      {...calPopupAttrs}
      className="fixed bottom-6 left-6 z-40 inline-flex items-center justify-center px-5 py-3 rounded-full bg-[var(--terra)] text-[var(--paper)] text-[14px] leading-none hover:bg-[var(--oker-deep)] transition-colors"
      style={{ boxShadow: 'var(--shadow-lift)' }}
    >
      Plan gesprek
    </button>
  );
}
