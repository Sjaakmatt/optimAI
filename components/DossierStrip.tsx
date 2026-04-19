'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '@/lib/store';

export function DossierStrip() {
  const activeAgents = useStore((s) => s.activeAgents);
  const agents = useStore((s) => s.agents);

  if (activeAgents.length === 0) {
    return (
      <div className="mx-auto w-full max-w-[560px] text-center font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">
        Dossier · wacht op afdelingen
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[680px] flex items-center justify-center gap-1 flex-wrap text-[12px]">
      <span className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em] mr-2">
        Dossier
      </span>
      <AnimatePresence initial={false}>
        {activeAgents.map((id, i) => (
          <motion.span
            key={id}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex items-center gap-1"
          >
            {i > 0 && <span className="text-[var(--ink-faint)] select-none mx-1">→</span>}
            <span className="px-2 py-0.5 rounded-[2px] bg-[var(--paper-deep)] border border-[var(--paper-edge)] font-display text-[13px] text-[var(--ink)]">
              {agents[id].name}
            </span>
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
