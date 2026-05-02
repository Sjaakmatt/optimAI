'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { bootstrapCal } from './calLoader';
import { CAL_LINK, CAL_NAMESPACE } from './config';

export function CalProvider() {
  const pathname = usePathname();
  const hideFloating = pathname === '/plan' || pathname === '/demo';

  useEffect(() => {
    const Cal = bootstrapCal();
    if (!Cal) return;

    if (!hideFloating) {
      Cal.ns[CAL_NAMESPACE]('floatingButton', {
        calLink: CAL_LINK,
        config: { layout: 'month_view', theme: 'light' },
        buttonText: 'Plan een gesprek',
        buttonColor: '#a15842',
        buttonTextColor: '#f4ede0',
        buttonPosition: 'bottom-right',
        hideButtonIcon: false,
      });
    }
  }, [hideFloating]);

  return null;
}
