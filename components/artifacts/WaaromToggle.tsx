'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface Props {
  reasoning?: string[];
}

export function WaaromToggle({ reasoning }: Props) {
  const [open, setOpen] = useState(false);
  if (!reasoning || reasoning.length === 0) return null;

  return (
    <div className="mt-5 pt-3 border-t border-dashed border-[var(--paper-edge)]">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink-faint)] hover:text-[var(--ink-dim)] transition-colors"
      >
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={11} strokeWidth={1.5} />
        </motion.span>
        Waarom?
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 overflow-hidden space-y-1 text-[12px] text-[var(--ink-dim)] leading-relaxed"
          >
            {reasoning.map((r, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-[var(--ink-faint)] select-none">—</span>
                <span>{r}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
