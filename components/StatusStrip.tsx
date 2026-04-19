'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '@/lib/store';

export function StatusStrip() {
  const activeAgents = useStore((s) => s.activeAgents);
  const agents = useStore((s) => s.agents);
  const isPlaying = useStore((s) => s.isPlaying);

  const names = activeAgents.map((id) => agents[id].name).join(', ');
  const showText = isPlaying && names
    ? `Aan het werk: ${names}`
    : 'Werkbank · rustig';

  return (
    <div className="border-t border-[var(--paper-edge)] bg-[var(--paper-deep)]">
      <div className="mx-auto max-w-[1080px] px-8 py-2.5 flex items-center justify-between">
        <AnimatePresence mode="wait">
          <motion.span
            key={showText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="font-mono text-[11px] text-[var(--ink-dim)] tracking-wider"
          >
            {showText}
          </motion.span>
        </AnimatePresence>
        <span className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.14em]">
          {isPlaying ? 'bezig' : 'gereed'}
        </span>
      </div>
    </div>
  );
}
