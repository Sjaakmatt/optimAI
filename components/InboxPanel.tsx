'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';
import { useStore } from '@/lib/store';
import { formatTime } from '@/lib/utils';
import type { AgentId, WorkItem } from '@/lib/types';

export function InboxPanel() {
  const openFor = useStore((s) => s.openInboxFor);
  const setOpen = useStore((s) => s.setOpenInboxFor);
  const agents = useStore((s) => s.agents);
  const allWorkItems = useStore((s) => s.workItems);
  const completeWorkItem = useStore((s) => s.completeWorkItem);

  useEffect(() => {
    if (!openFor) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [openFor, setOpen]);

  const agent = openFor ? agents[openFor] : null;
  const items = openFor ? allWorkItems.filter((w) => w.department === openFor) : [];
  const pending = items.filter((w) => w.status === 'pending');
  const completed = items
    .filter((w) => w.status === 'completed')
    .sort((a, b) => (b.completedAt ?? 0) - (a.completedAt ?? 0));

  return (
    <AnimatePresence>
      {openFor && agent && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(42, 36, 32, 0.25)' }}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-0 right-0 h-screen w-full sm:w-[440px] bg-[var(--paper)] border-l border-[var(--paper-edge)] z-50 overflow-y-auto"
          >
            <header className="sticky top-0 bg-[var(--paper)] border-b border-[var(--paper-edge)] px-7 py-5 flex items-center justify-between">
              <div>
                <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">
                  Werkbak
                </div>
                <h2 className="font-display text-[22px] text-[var(--ink)] mt-0.5">
                  {agent.name}
                </h2>
                <div className="text-[12px] text-[var(--ink-dim)] mt-0.5">
                  {agent.role.split(' — ')[0]}
                </div>
              </div>
              <button
                onClick={() => setOpen(null)}
                aria-label="Sluiten"
                className="p-2 rounded-[2px] text-[var(--ink-dim)] hover:bg-[var(--paper-deep)]"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </header>

            <div className="px-7 py-6 space-y-6">
              <section>
                <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.14em] mb-3">
                  Te verwerken · {pending.length}
                </div>
                {pending.length === 0 ? (
                  <p className="text-[13px] text-[var(--ink-dim)] italic">
                    Geen openstaande zaken. Alles afgerond.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    <AnimatePresence initial={false}>
                      {pending.map((w) => (
                        <PendingCard
                          key={w.id}
                          item={w}
                          onComplete={() => completeWorkItem(w.id)}
                        />
                      ))}
                    </AnimatePresence>
                  </ul>
                )}
              </section>

              {completed.length > 0 && (
                <section>
                  <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.14em] mb-3">
                    Vandaag verwerkt · {completed.length}
                  </div>
                  <ul className="space-y-1.5">
                    {completed.map((w) => (
                      <li
                        key={w.id}
                        className="flex items-baseline gap-3 text-[12px] text-[var(--ink-dim)]"
                      >
                        <CheckCircle2
                          size={11}
                          strokeWidth={1.5}
                          className="text-[var(--mos)] shrink-0 mt-0.5"
                        />
                        <span className="font-mono text-[var(--ink-faint)] tabular-nums">
                          {w.completedAt ? formatTime(w.completedAt) : ''}
                        </span>
                        <span className="flex-1 truncate">{w.title}</span>
                        <span className="font-mono text-[10px] text-[var(--ink-faint)] whitespace-nowrap">
                          → {w.systemTarget}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function PendingCard({ item, onComplete }: { item: WorkItem; onComplete: () => void }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4, height: 0, marginTop: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="artifact-card px-5 py-4"
    >
      <div className="flex items-baseline justify-between gap-3">
        <div className="font-mono text-[10px] text-[var(--oker-deep)] uppercase tracking-[0.16em]">
          {kindLabel(item.kind)}
        </div>
        <span className="font-mono text-[10px] text-[var(--ink-faint)] tabular-nums">
          {formatTime(item.createdAt)}
        </span>
      </div>
      <h3 className="font-display text-[15px] text-[var(--ink)] mt-1 leading-tight">
        {item.title}
      </h3>
      {item.subtitle && (
        <p className="text-[12.5px] text-[var(--ink-dim)] mt-0.5">{item.subtitle}</p>
      )}
      <div className="mt-2 flex items-baseline gap-3 text-[11px] font-mono text-[var(--ink-faint)]">
        {item.reference && <span>{item.reference}</span>}
        {item.amount && <span className="text-[var(--ink-dim)]">{item.amount}</span>}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          onClick={onComplete}
          className="px-3 py-1.5 rounded-[2px] text-[12.5px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
        >
          {item.actionLabel}
        </button>
        <span className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-wider">
          → {item.systemTarget}
        </span>
      </div>
    </motion.li>
  );
}

function kindLabel(kind: WorkItem['kind']): string {
  switch (kind) {
    case 'payment-out':
      return 'Uitbetaling';
    case 'invoice-send':
      return 'Factuur versturen';
    case 'picking':
      return 'Picking';
    case 'call':
      return 'Bellen';
    case 'approval':
      return 'Goedkeuring';
    case 'route-execute':
      return 'Rit starten';
    case 'review':
      return 'Review';
    case 'followup':
      return 'Follow-up';
  }
}

export function pendingCountFor(items: WorkItem[], department: AgentId): number {
  return items.filter((w) => w.department === department && w.status === 'pending').length;
}
