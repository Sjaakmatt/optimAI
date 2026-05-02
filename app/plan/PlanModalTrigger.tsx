'use client';

import { useEffect, useRef } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { getCalApi } from '@/components/booking/calLoader';
import { CAL_LINK, calPopupAttrs } from '@/components/booking/config';

export function PlanModalTrigger() {
  const opened = useRef(false);

  useEffect(() => {
    if (opened.current) return;
    opened.current = true;

    let cancelled = false;
    getCalApi()
      .then((ns) => {
        if (cancelled) return;
        ns('modal', {
          calLink: CAL_LINK,
          config: { layout: 'month_view', theme: 'light' },
        });
      })
      .catch((err) => {
        console.warn('[cal] auto-open modal failed:', err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className="site-card flex flex-col items-center justify-center text-center px-8 py-16"
      style={{ minHeight: 480 }}
    >
      <Calendar size={28} strokeWidth={1.5} className="text-[var(--oker-deep)]" />
      <div className="mt-5 font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.18em]">
        Kalender
      </div>
      <h3 className="mt-2 font-display text-[24px] sm:text-[28px] leading-tight text-[var(--ink)] max-w-[420px]">
        De kalender opent in een{' '}
        <span className="italic text-[var(--oker-deep)]">venster.</span>
      </h3>
      <p className="mt-3 text-[14px] text-[var(--ink-dim)] leading-[1.6] max-w-[380px]">
        Geen kalender gezien? Klik hieronder om hem opnieuw te openen.
      </p>
      <button
        type="button"
        {...calPopupAttrs}
        className="mt-7 inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--terra)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors lift-on-hover"
      >
        Open de kalender
        <ArrowRight size={16} strokeWidth={1.8} />
      </button>
    </div>
  );
}
