'use client';

import { useEffect } from 'react';
import { getCalApi } from './calLoader';

const ELEMENT_ID = 'cal-inline-embed';

export function CalEmbed({ calLink }: { calLink: string }) {
  useEffect(() => {
    let cancelled = false;
    getCalApi()
      .then((ns) => {
        if (cancelled) return;
        ns('inline', {
          elementOrSelector: `#${ELEMENT_ID}`,
          calLink,
          config: { layout: 'month_view', theme: 'light' },
        });
      })
      .catch((err) => {
        console.warn('[cal] inline init failed:', err);
      });

    return () => {
      cancelled = true;
    };
  }, [calLink]);

  return (
    <div
      id={ELEMENT_ID}
      style={{ width: '100%', minHeight: 720, overflow: 'auto' }}
    />
  );
}
