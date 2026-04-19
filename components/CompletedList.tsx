'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useStore } from '@/lib/store';
import { formatTime, minutesToHoursLabel } from '@/lib/utils';
import type { AgentId } from '@/lib/types';

export function CompletedList() {
  const completed = useStore((s) => s.completed);
  const agents = useStore((s) => s.agents);
  const [open, setOpen] = useState(true);

  if (completed.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-[640px]">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.14em] hover:text-[var(--ink-dim)] transition-colors"
      >
        <span>Vandaag afgehandeld · {completed.length}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={14} strokeWidth={1.5} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-3 overflow-hidden divide-y divide-[var(--paper-edge)] border-y border-[var(--paper-edge)]"
          >
            {completed.map((c) => (
              <li key={c.id} className="py-3 text-[13px]">
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] text-[var(--ink-faint)] tabular-nums">
                      {formatTime(c.completedAt)}
                    </span>
                    <div>
                      <div className="text-[var(--ink)]">{c.title}</div>
                      <div className="text-[12px] text-[var(--ink-dim)]">{c.context}</div>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-[var(--mos)] whitespace-nowrap">
                    {minutesToHoursLabel(c.minutesSaved)} bespaard · {c.artifactCount} stuks
                  </span>
                </div>
                {c.agents.length > 0 && (
                  <div className="mt-2 ml-[88px] flex flex-wrap items-center gap-1 text-[11px]">
                    {c.agents.map((id: AgentId, i: number) => (
                      <span key={id} className="flex items-center gap-1">
                        {i > 0 && (
                          <span className="text-[var(--ink-faint)] select-none mx-0.5">→</span>
                        )}
                        <span className="px-1.5 py-0.5 rounded-[2px] bg-[var(--paper-deep)] border border-[var(--paper-edge)] font-mono text-[10px] text-[var(--ink-dim)] uppercase tracking-wider">
                          {agents[id].name}
                        </span>
                      </span>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </section>
  );
}
