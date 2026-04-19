'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { ChevronDown, Plus, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore, ALL_SCENARIOS } from '@/lib/store';
import { formatTime } from '@/lib/utils';
import type { EventType } from '@/lib/types';

const TYPE_LABEL: Record<EventType, string> = {
  'order.new': 'Order',
  'order.inquiry': 'Offerte',
  'mail.complaint': 'Klacht',
  'mail.question': 'Vraag',
  'stock.low': 'Voorraad',
  'supplier.delay': 'Leverancier',
  'invoice.overdue': 'Factuur',
  'shipment.issue': 'Verzending',
};

const TYPE_COLOR: Record<EventType, string> = {
  'order.new': 'text-[var(--signal-green)]',
  'order.inquiry': 'text-[var(--accent)]',
  'mail.complaint': 'text-[var(--signal-red)]',
  'mail.question': 'text-[var(--text-dim)]',
  'stock.low': 'text-[var(--signal-amber)]',
  'supplier.delay': 'text-[var(--signal-amber)]',
  'invoice.overdue': 'text-[var(--signal-red)]',
  'shipment.issue': 'text-[var(--signal-amber)]',
};

export function EventsPanel() {
  const events = useStore((s) => s.events);
  const activeEventId = useStore((s) => s.activeEventId);
  const isPlaying = useStore((s) => s.isPlaying);
  const triggerEvent = useStore((s) => s.triggerEvent);
  const setActiveEvent = useStore((s) => s.setActiveEvent);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col h-full border-r border-[var(--border)] bg-[var(--bg-elev)]">
      <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
        <div>
          <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--text-faint)]">
            Inbound
          </div>
          <div className="font-display text-[18px] leading-tight text-[var(--text)]">
            Events
          </div>
        </div>
        <div className="relative">
          <button
            type="button"
            disabled={isPlaying}
            onClick={() => setOpen((v) => !v)}
            className={clsx(
              'inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] rounded-sm border transition-colors',
              'border-[var(--accent-dim)] text-[var(--accent)] bg-[var(--bg-elev-2)]',
              'hover:border-[var(--accent)] hover:bg-[color:rgba(212,168,87,0.08)]',
              'disabled:opacity-40 disabled:cursor-not-allowed',
            )}
          >
            <Plus size={13} />
            <span>Trigger</span>
            <ChevronDown size={12} className={clsx('transition-transform', open && 'rotate-180')} />
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.12 }}
                className="absolute right-0 top-[calc(100%+4px)] z-20 w-[300px] rounded-sm border border-[var(--border-hot)] bg-[var(--bg-elev-2)] shadow-2xl overflow-hidden"
              >
                <div className="px-3 py-2 border-b border-[var(--border)] font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--text-faint)]">
                  Kies scenario
                </div>
                <ul className="max-h-[360px] overflow-y-auto">
                  {ALL_SCENARIOS.map((s) => (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setOpen(false);
                          void triggerEvent(s.id);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-[var(--bg-elev)] transition-colors flex items-start gap-2"
                      >
                        <Zap size={12} className={clsx('mt-[3px]', TYPE_COLOR[s.type])} />
                        <div className="flex-1">
                          <div className="text-[12px] text-[var(--text)] leading-snug">
                            {s.label}
                          </div>
                          <div
                            className={clsx(
                              'mt-0.5 font-mono text-[10px] tracking-wide uppercase',
                              TYPE_COLOR[s.type],
                            )}
                          >
                            {TYPE_LABEL[s.type]}
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {events.length === 0 && (
          <div className="p-6 text-[12px] text-[var(--text-faint)] leading-relaxed">
            Nog geen events. Klik <span className="text-[var(--accent)]">Trigger</span> om een scenario
            te starten, of schakel naar <span className="text-[var(--text-dim)]">Autonoom</span> om
            ze vanzelf binnen te laten komen.
          </div>
        )}
        <ul>
          <AnimatePresence initial={false}>
            {events.map((ev) => {
              const active = ev.id === activeEventId;
              return (
                <motion.li
                  key={ev.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveEvent(ev.id)}
                    className={clsx(
                      'w-full text-left px-4 py-3 border-b border-[var(--border)] transition-colors block',
                      active
                        ? 'bg-[color:rgba(212,168,87,0.06)] border-l-2 border-l-[var(--accent)]'
                        : 'hover:bg-[var(--bg-elev-2)]',
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={clsx(
                          'font-mono text-[10px] tracking-[0.14em] uppercase',
                          TYPE_COLOR[ev.type],
                        )}
                      >
                        {TYPE_LABEL[ev.type]}
                      </span>
                      <span className="font-mono text-[10px] text-[var(--text-faint)]">
                        {formatTime(ev.timestamp)}
                      </span>
                    </div>
                    <div className="mt-1 text-[12.5px] text-[var(--text)] leading-snug">
                      {ev.label}
                    </div>
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
