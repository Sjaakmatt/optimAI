'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw } from 'lucide-react';
import { useStore } from '@/lib/store';

export function HeaderMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reset = useStore((s) => s.reset);
  const mode = useStore((s) => s.mode);
  const setMode = useStore((s) => s.setMode);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="p-2 rounded-[2px] text-[var(--ink-dim)] hover:text-[var(--ink)] hover:bg-[var(--paper-deep)] transition-colors"
      >
        <RotateCcw size={16} strokeWidth={1.5} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-[240px] artifact-card artifact-card--lift z-30"
          >
            <div className="px-4 pt-3 pb-2 font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.14em]">
              Modus
            </div>
            <div className="px-3 pb-2">
              <div className="grid grid-cols-2 gap-1 p-1 rounded-[2px] bg-[var(--paper-deep)] border border-[var(--paper-edge)]">
                {(['manual', 'autonomous'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`text-[12px] py-1.5 rounded-[2px] transition-colors ${
                      mode === m
                        ? 'bg-[var(--paper)] text-[var(--ink)] shadow-sm'
                        : 'text-[var(--ink-dim)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {m === 'manual' ? 'Handmatig' : 'Autonoom'}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-[var(--ink-faint)] leading-snug">
                {mode === 'manual'
                  ? 'U kiest zelf welke event speelt.'
                  : 'Werkbank pakt elke 18–25 sec een nieuwe zaak op.'}
              </p>
            </div>

            <div className="border-t border-[var(--paper-edge)] mt-1">
              <button
                onClick={() => {
                  reset();
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-[13px] text-[var(--ink-dim)] hover:bg-[var(--paper-deep)] hover:text-[var(--ink)] transition-colors"
              >
                Werkbank resetten
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
