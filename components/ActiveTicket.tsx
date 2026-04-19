'use client';

import { motion } from 'motion/react';
import type { DemoEvent } from '@/lib/types';
import { formatTime } from '@/lib/utils';

interface Props {
  event: DemoEvent;
}

export function ActiveTicket({ event }: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mx-auto w-full max-w-[560px] artifact-card px-8 py-6"
    >
      <div className="flex items-baseline justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--oker-deep)]">
          Werkbon · binnengekomen
        </span>
        <span className="font-mono text-[11px] text-[var(--ink-faint)]">
          {formatTime(event.timestamp)}
        </span>
      </div>
      <h1 className="font-display text-[22px] leading-[1.25] text-[var(--ink)]">
        {event.label}
      </h1>
      <p className="mt-2 text-[14px] leading-[1.55] text-[var(--ink-dim)]">
        {event.context}
      </p>
    </motion.div>
  );
}
