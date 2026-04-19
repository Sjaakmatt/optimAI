'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X } from 'lucide-react';
import { useStore, ALL_SCENARIOS } from '@/lib/store';

export function EventTrigger() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerEvent = useStore((s) => s.triggerEvent);
  const isPlaying = useStore((s) => s.isPlaying);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handlePick = (id: string) => {
    setOpen(false);
    void triggerEvent(id);
  };

  const modal = (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
          style={{ background: 'rgba(42, 36, 32, 0.5)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[580px] max-h-[80vh] flex flex-col artifact-card artifact-card--lift overflow-hidden"
          >
            <header className="flex items-baseline justify-between px-6 py-4 border-b border-[var(--paper-edge)] shrink-0">
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
            </header>
            <ul className="flex-1 min-h-0 overflow-y-auto divide-y divide-[var(--paper-edge)]">
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

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
      {mounted && createPortal(modal, document.body)}
    </>
  );
}
