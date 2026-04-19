'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X } from 'lucide-react';
import { useStore, ALL_SCENARIOS } from '@/lib/store';

export function EventTrigger() {
  const [open, setOpen] = useState(false);
  const triggerEvent = useStore((s) => s.triggerEvent);
  const isPlaying = useStore((s) => s.isPlaying);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  const handlePick = (id: string) => {
    setOpen(false);
    void triggerEvent(id);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        disabled={isPlaying}
        className="flex items-center gap-2 px-4 py-2 rounded-[2px] text-[13px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
      >
        <Plus size={14} strokeWidth={2} />
        <span>{isPlaying ? 'Werkbank bezig…' : 'Nieuw event'}</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-[var(--ink)]/25"
            />
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="artifact-card artifact-card--lift w-full max-w-[580px] pointer-events-auto overflow-hidden">
                <div className="flex items-baseline justify-between px-6 py-4 border-b border-[var(--paper-edge)]">
                  <div>
                    <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.18em]">
                      Nieuw event
                    </div>
                    <h2 className="font-display text-[18px] text-[var(--ink)] mt-0.5">
                      Kies een scenario
                    </h2>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Sluiten"
                    className="p-1.5 rounded-[2px] text-[var(--ink-dim)] hover:bg-[var(--paper-deep)] transition-colors"
                  >
                    <X size={16} strokeWidth={1.5} />
                  </button>
                </div>
                <ul className="max-h-[60vh] overflow-y-auto divide-y divide-[var(--paper-edge)]">
                  {ALL_SCENARIOS.map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => handlePick(s.id)}
                        className="w-full text-left px-6 py-3 hover:bg-[var(--paper-deep)] transition-colors group"
                      >
                        <div className="text-[14px] text-[var(--ink)] group-hover:text-[var(--oker-deep)] transition-colors">
                          {s.label}
                        </div>
                        <div className="text-[12px] text-[var(--ink-dim)] mt-0.5 leading-[1.4]">
                          {s.context}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
