'use client';

import { useEffect, useRef, useState } from 'react';
import { useStore } from '@/lib/store';
import { formatEuro, formatNumber } from '@/lib/utils';

interface MetricProps {
  label: string;
  value: number;
  format?: (n: number) => string;
}

function useEasedNumber(target: number, durationMs = 600): number {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  const startRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (target === value) return;
    fromRef.current = value;
    startRef.current = performance.now();
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const t = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = fromRef.current + (target - fromRef.current) * eased;
      setValue(next);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return value;
}

function Metric({ label, value, format = formatNumber }: MetricProps) {
  const eased = useEasedNumber(value);
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2 min-w-0 shrink-0">
      <span className="font-mono text-[9px] sm:text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.14em] whitespace-nowrap">
        {label}
      </span>
      <span className="font-display text-[15px] sm:text-[16px] text-[var(--ink)] tabular-nums whitespace-nowrap">
        {format(Math.round(eased))}
      </span>
    </div>
  );
}

export function CockpitHeader() {
  const cockpit = useStore((s) => s.cockpit);
  return (
    <div className="border-b border-[var(--paper-edge)] bg-[var(--paper-deep)]">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-8 py-2 sm:py-2.5 flex items-start sm:items-center gap-5 sm:gap-6 lg:justify-between overflow-x-auto whitespace-nowrap">
        <Metric label="Orders" value={cockpit.orders} />
        <Metric label="Voorraad" value={cockpit.stockMutations} />
        <Metric label="Ritten" value={cockpit.routesPlanned} />
        <Metric label="Mails" value={cockpit.mails} />
        <Metric label="Omzet" value={cockpit.revenue} format={(n) => formatEuro(n)} />
      </div>
    </div>
  );
}
