'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ChevronDown } from 'lucide-react';
import { useStore, useArtifactById } from '@/lib/store';
import { formatTime } from '@/lib/utils';
import type { AgentId, WorkItem } from '@/lib/types';
import { ArtifactView } from './artifacts/ArtifactView';

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
            className="fixed top-0 right-0 h-screen w-full sm:w-[520px] bg-[var(--paper)] border-l border-[var(--paper-edge)] z-50 overflow-y-auto"
          >
            <header className="sticky top-0 bg-[var(--paper)] border-b border-[var(--paper-edge)] px-7 py-5 flex items-center justify-between z-10">
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
                        <WorkItemCard
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
                  <ul className="space-y-2">
                    {completed.map((w) => (
                      <CompletedWorkItem key={w.id} item={w} />
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

function WorkItemCard({
  item,
  onComplete,
}: {
  item: WorkItem;
  onComplete: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const artifact = useArtifactById(item.artifactId);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4, height: 0, marginTop: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="artifact-card overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-5 py-4 hover:bg-[var(--paper-deep)] transition-colors"
      >
        <div className="flex items-baseline justify-between gap-3">
          <div className="font-mono text-[10px] text-[var(--oker-deep)] uppercase tracking-[0.16em]">
            {kindLabel(item.kind)}
          </div>
          <div className="flex items-baseline gap-2 shrink-0">
            <span className="font-mono text-[10px] text-[var(--ink-faint)] tabular-nums">
              {formatTime(item.createdAt)}
            </span>
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="text-[var(--ink-faint)]"
            >
              <ChevronDown size={12} strokeWidth={1.5} />
            </motion.span>
          </div>
        </div>
        <h3 className="font-display text-[15px] text-[var(--ink)] mt-1 leading-tight">
          {item.title}
        </h3>
        {item.subtitle && (
          <p className="text-[12.5px] text-[var(--ink-dim)] mt-0.5">{item.subtitle}</p>
        )}
        {(item.reference || item.amount) && (
          <div className="mt-1.5 flex items-baseline gap-3 text-[11px] font-mono text-[var(--ink-faint)]">
            {item.reference && <span>{item.reference}</span>}
            {item.amount && <span className="text-[var(--ink-dim)]">{item.amount}</span>}
          </div>
        )}
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-[var(--paper-edge)] bg-[var(--paper-deep)]"
          >
            <div className="px-4 py-5">
              {artifact ? (
                <div className="artifact-embed">
                  <ArtifactView artifact={artifact} />
                </div>
              ) : (
                <p className="text-[12px] text-[var(--ink-faint)] italic text-center py-4">
                  Geen gekoppeld document beschikbaar.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-5 py-3 border-t border-[var(--paper-edge)] flex items-center justify-between gap-3 bg-[var(--paper)]">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onComplete();
          }}
          className="px-3 py-1.5 rounded-[2px] text-[12.5px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
        >
          {item.actionLabel}
        </button>
        <span className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-wider text-right">
          → {item.systemTarget}
        </span>
      </div>
    </motion.li>
  );
}

function CompletedWorkItem({ item }: { item: WorkItem }) {
  const [expanded, setExpanded] = useState(false);
  const artifact = useArtifactById(item.artifactId);

  return (
    <li className="rounded-[2px] border border-[var(--paper-edge)] bg-[var(--paper-deep)] overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-baseline gap-3 px-3 py-2 text-[12px] text-[var(--ink-dim)] hover:bg-[var(--paper)] transition-colors"
      >
        <CheckCircle2
          size={11}
          strokeWidth={1.5}
          className="text-[var(--mos)] shrink-0 mt-0.5"
        />
        <span className="font-mono text-[var(--ink-faint)] tabular-nums">
          {item.completedAt ? formatTime(item.completedAt) : ''}
        </span>
        <span className="flex-1 truncate text-left">{item.title}</span>
        <span className="font-mono text-[10px] text-[var(--ink-faint)] whitespace-nowrap">
          → {item.systemTarget}
        </span>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-[var(--ink-faint)]"
        >
          <ChevronDown size={11} strokeWidth={1.5} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {expanded && artifact && (
          <motion.div
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-[var(--paper-edge)] bg-[var(--paper)]"
          >
            <div className="px-4 py-5">
              <ArtifactView artifact={artifact} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
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
