'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useStore } from '@/lib/store';
import { AGENT_ORDER } from '@/lib/agents/definitions';
import type { AgentId } from '@/lib/types';

export function PolicyPanel() {
  const open = useStore((s) => s.policyPanelOpen);
  const setOpen = useStore((s) => s.setPolicyPanelOpen);
  const agents = useStore((s) => s.agents);
  const updatePolicy = useStore((s) => s.updatePolicy);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-[var(--ink)]/20 z-40"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-0 right-0 h-screen w-full sm:w-[480px] bg-[var(--paper)] border-l border-[var(--paper-edge)] z-50 overflow-y-auto"
          >
            <header className="sticky top-0 bg-[var(--paper)] border-b border-[var(--paper-edge)] px-8 py-5 flex items-center justify-between">
              <div>
                <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">
                  Beleidsregels
                </div>
                <h2 className="font-display text-[20px] text-[var(--ink)] mt-1">
                  U houdt de knoppen
                </h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Sluiten"
                className="p-2 rounded-[2px] text-[var(--ink-dim)] hover:bg-[var(--paper-deep)]"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </header>

            <div className="px-8 py-6 space-y-8">
              {(['orchestrator', ...AGENT_ORDER] as AgentId[]).map((id) => {
                const agent = agents[id];
                return (
                  <section key={id}>
                    <div className="flex items-baseline justify-between mb-3">
                      <h3 className="font-display text-[17px] text-[var(--ink)]">
                        {agent.name}
                      </h3>
                      <span className="font-mono text-[11px] text-[var(--ink-faint)]">
                        {agent.role.split(' — ')[0]}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {agent.policies.map((p) => (
                        <li key={p.id} className="flex items-start gap-3 py-1">
                          <button
                            onClick={() => updatePolicy(id, p.id, !p.enabled)}
                            aria-pressed={p.enabled}
                            className="mt-0.5 relative inline-flex h-[18px] w-[32px] rounded-full transition-colors shrink-0"
                            style={{
                              background: p.enabled ? 'var(--mos)' : 'var(--paper-edge)',
                            }}
                          >
                            <motion.span
                              animate={{ x: p.enabled ? 15 : 2 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-[2px] h-[14px] w-[14px] rounded-full bg-[var(--paper)]"
                            />
                          </button>
                          <span
                            className={`text-[13px] leading-[1.5] ${
                              p.enabled ? 'text-[var(--ink)]' : 'text-[var(--ink-faint)] line-through decoration-[var(--paper-edge)]'
                            }`}
                          >
                            {p.rule}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
