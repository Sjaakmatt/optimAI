'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getCalApi } from './calLoader';
import { CAL_LINK } from './config';

export function CalProvider() {
  const pathname = usePathname();
  const hideFloating = pathname === '/plan' || pathname === '/demo';

  useEffect(() => {
    if (hideFloating) return;

    let cancelled = false;
    getCalApi()
      .then((ns) => {
        if (cancelled) return;
        ns('floatingButton', {
          calLink: CAL_LINK,
          config: { layout: 'month_view', theme: 'light' },
          buttonText: 'Plan een gesprek',
          buttonColor: '#a15842',
          buttonTextColor: '#f4ede0',
          buttonPosition: 'bottom-right',
          hideButtonIcon: false,
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
