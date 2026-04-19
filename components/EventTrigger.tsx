'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { useStore, ALL_SCENARIOS } from '@/lib/store';

export function EventTrigger() {
  const [open, setOpen] = useState(false);
  const triggerEvent = useStore((s) => s.triggerEvent);
  const isPlaying = useStore((s) => s.isPlaying);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handlePick = (id: string) => {
    setOpen(false);
    void triggerEvent(id);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        disabled={isPlaying}
        className="flex items-center gap-2 px-4 py-2 rounded-[2px] text-[13px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <Plus size={14} strokeWidth={2} />
        <span>{isPlaying ? 'Werkbank bezig…' : 'Nieuw event'}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-[360px] artifact-card artifact-card--lift z-20"
          >
            <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.14em] px-4 pt-3 pb-2">
              Kies een scenario
            </div>
            <ul className="pb-2">
              {ALL_SCENARIOS.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => handlePick(s.id)}
                    className="w-full text-left px-4 py-2.5 hover:bg-[var(--paper-deep)] transition-colors"
                  >
                    <div className="text-[14px] text-[var(--ink)]">{s.label}</div>
                    <div className="text-[12px] text-[var(--ink-dim)] mt-0.5 leading-[1.4]">
                      {s.context}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
