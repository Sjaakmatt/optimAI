'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import { formatEuro, formatNumber, minutesToHoursLabel } from '@/lib/utils';
import { AGENT_ORDER, AGENT_DEFINITIONS } from '@/lib/agents/definitions';

function useEasedNumber(target: number, duration = 800) {
  const [value, setValue] = useState(target);
  useEffect(() => {
    const start = value;
    const end = target;
    if (start === end) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(start + (end - start) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return value;
}

export function DashboardKPI() {
  const roi = useStore((s) => s.roi);
  const agents = useStore((s) => s.agents);

  const minutes = useEasedNumber(roi.totalMinutesSaved);
  const tasks = useEasedNumber(roi.tasksCompleted);
  const euros = useEasedNumber(roi.eurosEquivalent);
  const activeAgents = AGENT_ORDER.filter((id) => agents[id].status !== 'idle').length;

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 border border-[var(--border)] bg-[var(--bg-elev)]">
      <KpiCell label="Uren bespaard" value={minutesToHoursLabel(minutes)} accent />
      <KpiCell label="Taken afgehandeld" value={formatNumber(tasks)} />
      <KpiCell label="€ Equivalent" value={formatEuro(euros)} accent />
      <KpiCell label="Actieve agents" value={`${activeAgents} / 7`} last />
    </section>
  );
}

function KpiCell({
  label,
  value,
  accent,
  last,
}: {
  label: string;
  value: string;
  accent?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={`px-6 py-6 border-[var(--border)] ${
        last ? '' : 'border-b lg:border-b-0 lg:border-r'
      }`}
    >
      <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--text-faint)]">
        {label}
      </div>
      <div
        className={`mt-2 font-display text-[44px] leading-[1.05] ${
          accent ? 'text-[var(--accent)]' : 'text-[var(--text)]'
        }`}
      >
        {value}
      </div>
    </div>
  );
}

export function AgentTable() {
  const roi = useStore((s) => s.roi);
  const agents = useStore((s) => s.agents);
  return (
    <section className="border border-[var(--border)] bg-[var(--bg-elev)]">
      <header className="px-5 py-3 border-b border-[var(--border)] flex items-center justify-between">
        <div className="font-display text-[17px] text-[var(--text)]">Per agent</div>
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--text-faint)]">
          Status · Taken · Minuten
        </div>
      </header>
      <table className="w-full text-[13px]">
        <thead>
          <tr className="text-left text-[var(--text-faint)] font-mono text-[10px] tracking-[0.14em] uppercase">
            <th className="px-5 py-2 font-normal">Agent</th>
            <th className="px-5 py-2 font-normal">Rol</th>
            <th className="px-5 py-2 font-normal text-right">Taken</th>
            <th className="px-5 py-2 font-normal text-right">Bespaard</th>
            <th className="px-5 py-2 font-normal">Status</th>
          </tr>
        </thead>
        <tbody>
          {AGENT_ORDER.map((id) => {
            const a = agents[id];
            const def = AGENT_DEFINITIONS[id];
            const stats = roi.byAgent[id];
            return (
              <tr key={id} className="border-t border-[var(--border)]">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-[8px] w-[8px] rounded-full"
                      style={{ backgroundColor: def.color }}
                    />
                    <span className="font-display text-[15px] text-[var(--text)]">{def.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-[var(--text-dim)]">{def.role}</td>
                <td className="px-5 py-3 text-right font-mono text-[12px]">{stats.tasks}</td>
                <td className="px-5 py-3 text-right font-mono text-[12px] text-[var(--accent)]">
                  {minutesToHoursLabel(stats.minutes)}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`font-mono text-[10px] tracking-[0.14em] uppercase ${
                      a.status === 'idle'
                        ? 'text-[var(--text-faint)]'
                        : 'text-[var(--signal-amber)]'
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
