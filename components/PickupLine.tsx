'use client';

import { motion, AnimatePresence } from 'motion/react';

interface Props {
  text: string | null;
}

export function PickupLine({ text }: Props) {
  return (
    <div className="h-6 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {text && (
          <motion.div
            key={text}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 text-[12px] font-mono tracking-wider text-[var(--ink-faint)] uppercase"
          >
            <span className="h-px w-10 bg-[var(--paper-edge)]" />
            <span>{text}</span>
            <span className="h-px w-10 bg-[var(--paper-edge)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
