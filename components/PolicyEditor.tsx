'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '@/lib/store';
import { ALL_AGENTS } from '@/lib/agents/definitions';
import type { AgentId } from '@/lib/types';
import { Toggle } from '@/components/ui/Toggle';

export function PolicyEditor() {
  const agents = useStore((s) => s.agents);
  const updatePolicy = useStore((s) => s.updatePolicy);
  const [selected, setSelected] = useState<AgentId>('orchestrator');

  const agent = agents[selected];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
      <aside className="border border-[var(--border)] bg-[var(--bg-elev)]">
        <div className="p-4 border-b border-[var(--border)]">
          <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--text-faint)]">
            Agents
          </div>
          <div className="font-display text-[17px] text-[var(--text)]">Regels per agent</div>
        </div>
        <ul>
          {ALL_AGENTS.map((id) => {
            const a = agents[id];
            const active = selected === id;
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => setSelected(id)}
                  className={clsx(
                    'w-full text-left px-4 py-3 flex items-center justify-between border-l-2 transition-colors',
                    active
                      ? 'border-[var(--accent)] bg-[color:rgba(212,168,87,0.06)] text-[var(--text)]'
                      : 'border-transparent text-[var(--text-dim)] hover:text-[var(--text)] hover:bg-[var(--bg-elev-2)]',
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-[8px] w-[8px] rounded-full"
                      style={{ backgroundColor: a.color }}
                    />
                    <span className="font-display text-[15px]">{a.name}</span>
                  </div>
                  <span className="font-mono text-[10px] text-[var(--text-faint)]">
                    {a.policies.filter((p) => p.enabled).length}/{a.policies.length}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <section className="border border-[var(--border)] bg-[var(--bg-elev)]">
        <header className="p-5 border-b border-[var(--border)]">
          <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--text-faint)]">
            {selected === 'orchestrator' ? 'Orchestrator' : 'Sub-agent'}
          </div>
          <h2 className="font-display text-[28px] leading-tight text-[var(--text)]">
            {agent.name}
          </h2>
          <p className="mt-1 text-[13px] text-[var(--text-dim)]">{agent.role}</p>
        </header>

        <AnimatePresence mode="wait">
          <motion.ul
            key={selected}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="divide-y divide-[var(--border)]"
          >
            {agent.policies.map((p) => (
              <li key={p.id} className="px-5 py-4 flex items-start gap-4">
                <Toggle
                  checked={p.enabled}
                  onChange={(v) => updatePolicy(selected, p.id, v)}
                  ariaLabel={p.rule}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={clsx(
                      'text-[13.5px] leading-[1.5]',
                      p.enabled ? 'text-[var(--text)]' : 'text-[var(--text-dim)]',
                    )}
                  >
                    {p.rule}
                  </p>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--text-faint)]">
                    {p.enabled ? 'Actief · wordt meegenomen bij volgende taak' : 'Uitgeschakeld'}
                  </p>
                </div>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>

        <footer className="px-5 py-3 border-t border-[var(--border)] font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--text-faint)]">
          Wijzigingen worden lokaal bewaard · reset gooit policies terug naar default
        </footer>
      </section>
    </div>
  );
}
