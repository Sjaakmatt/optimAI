'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getCalApi } from './calLoader';
import { calPopupAttrs } from './config';

const HIDE_ON: ReadonlySet<string> = new Set([
  '/contact',
  '/plan',
  '/demo',
  '/privacy',
  '/subverwerkers',
]);

/**
 * Zwevende "Plan gesprek"-knop rechtsonder. Eigen knop in de huisstijl
 * i.p.v. Cal's ingebouwde floatingButton — die was fors en slecht
 * gecentreerd. De klik opent dezelfde Cal-popup via de data-cal-attrs;
 * de embed wordt in de effect alvast geladen zodat de popup direct opent.
 */
export function CalProvider() {
  const pathname = usePathname();
  const hideFloating = HIDE_ON.has(pathname) || pathname.startsWith('/aanvraag');

  useEffect(() => {
    if (hideFloating) return;
    getCalApi().catch((err) => {
      console.warn('[cal] embed init failed:', err);
    });
  }, [hideFloating]);

  if (hideFloating) return null;

  return (
    <button
      type="button"
      {...calPopupAttrs}
      className="fixed bottom-5 right-5 z-40 inline-flex items-center justify-center px-4 py-2 rounded-full bg-[var(--ink)] text-[var(--paper)] text-[13px] leading-none hover:bg-[var(--oker-deep)] transition-colors"
      style={{ boxShadow: 'var(--shadow-lift)' }}
    >
      Plan gesprek
    </button>
  );
}
