'use client';

import { useStore } from '@/lib/store';
import { formatEuro, minutesToHoursLabel, formatNumber } from '@/lib/utils';

export function TodayPanel() {
  const roi = useStore((s) => s.roi);
  const completed = useStore((s) => s.completed);
  const casesTotal = completed.length + roi.casesHandled;

  return (
    <aside className="artifact-card px-5 py-4 w-[220px] text-[13px]">
      <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em] mb-2">
        Vandaag
      </div>
      <ul className="space-y-1.5 text-[var(--ink-dim)]">
        <li className="flex gap-2">
          <span className="text-[var(--ink-faint)] select-none">—</span>
          <span>
            <span className="font-mono text-[var(--ink)]">{formatNumber(casesTotal)}</span>{' '}
            zaken afgehandeld
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-[var(--ink-faint)] select-none">—</span>
          <span>
            <span className="font-mono text-[var(--ink)]">
              {minutesToHoursLabel(roi.totalMinutesSaved)}
            </span>{' '}
            werk bespaard
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-[var(--ink-faint)] select-none">—</span>
          <span>
            <span className="font-mono text-[var(--ink)]">
              {formatEuro(roi.eurosEquivalent)}
            </span>{' '}
            aan loonuren
          </span>
        </li>
      </ul>
    </aside>
  );
}
