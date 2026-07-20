'use client';

import { useEffect, useRef } from 'react';
import { getCalApi } from '@/components/booking/calLoader';
import { CAL_LINK } from '@/components/booking/config';
import { useAdsConversion } from '@/components/booking/useAdsConversion';

const CAL_FALLBACK_URL = `https://cal.com/${CAL_LINK}`;

export function AanvraagCal() {
  const containerRef = useRef<HTMLDivElement>(null);
  useAdsConversion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;
    getCalApi()
      .then((ns) => {
        if (cancelled || el.dataset.calInitialized) return;
        el.dataset.calInitialized = 'true';
        ns('inline', {
          elementOrSelector: el,
          calLink: CAL_LINK,
          config: { layout: 'month_view', theme: 'light' },
        });
      })
      .catch((err) => {
        console.warn('[cal] inline embed laden mislukt:', err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <div
        ref={containerRef}
        className="w-full min-h-[560px] overflow-hidden rounded-[3px] border border-[var(--paper-edge)] bg-[var(--paper)]"
        aria-label="Boekingskalender"
      />
      <p className="mt-4 text-[13px] text-[var(--ink-dim)] leading-[1.6]">
        Laadt de kalender hier niet?{' '}
        <a
          href={CAL_FALLBACK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 text-[var(--oker-deep)] hover:text-[var(--ink)] transition-colors"
        >
          Boek dan direct via cal.com
        </a>
        .
      </p>
    </div>
  );
}
