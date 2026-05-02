'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getCalApi } from './calLoader';
import { CAL_LINK } from './config';

const HIDE_ON: ReadonlySet<string> = new Set([
  '/',
  '/contact',
  '/plan',
  '/demo',
  '/privacy',
  '/subverwerkers',
]);

export function CalProvider() {
  const pathname = usePathname();
  const hideFloating = HIDE_ON.has(pathname);

  useEffect(() => {
    if (hideFloating) return;

    let cancelled = false;
    getCalApi()
      .then((ns) => {
        if (cancelled) return;
        ns('floatingButton', {
          calLink: CAL_LINK,
          config: { layout: 'month_view', theme: 'light' },
          buttonText: 'Plan gesprek',
          buttonColor: '#2a2420',
          buttonTextColor: '#f4ede0',
          buttonPosition: 'bottom-right',
          hideButtonIcon: true,
        });
      })
      .catch((err) => {
        console.warn('[cal] floatingButton init failed:', err);
      });

    return () => {
      cancelled = true;
    };
  }, [hideFloating]);

  return null;
}
