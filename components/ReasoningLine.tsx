'use client';

import { motion } from 'motion/react';
import { useStore } from '@/lib/store';
import type { ReasoningItem } from '@/lib/types';

interface Props {
  reasoning: ReasoningItem;
}

export function ReasoningLine({ reasoning }: Props) {
  const agents = useStore((s) => s.agents);
  const name = agents[reasoning.by]?.name ?? reasoning.by;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mx-auto w-full max-w-[520px] text-center px-4 py-2"
    >
      <p className="font-display italic text-[15px] leading-[1.5] text-[var(--ink-dim)]">
        {reasoning.text}
      </p>
      <div className="mt-1 font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.14em]">
        — {name}
      </div>
    </motion.div>
  );
}
