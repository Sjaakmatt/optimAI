'use client';

import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useStore } from '@/lib/store';
import type { CompletedEvent, AgentId } from '@/lib/types';
import { Stage } from './Stage';
import { formatTime, minutesToHoursLabel } from '@/lib/utils';

interface Props {
  event: CompletedEvent;
}

export function CompletedViewer({ event }: Props) {
  const setViewingCompletedId = useStore((s) => s.setViewingCompletedId);
  const agents = useStore((s) => s.agents);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <button
          onClick={() => setViewingCompletedId(null)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-[2px] text-[12px] text-[var(--ink-dim)] hover:text-[var(--ink)] hover:bg-[var(--paper-deep)] transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Terug naar werkbank
        </button>
        <span className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">
          Archief · {formatTime(event.completedAt)}
        </span>
      </div>

      <ArchivedTicket event={event} />
      <ArchivedDossier agents={event.agents} agentNames={agents} />
      <Stage items={event.stageItems} />
      <ArchivedFooter event={event} />
    </motion.div>
  );
}

function ArchivedTicket({ event }: { event: CompletedEvent }) {
  return (
    <article className="mx-auto w-full max-w-[640px] artifact-card px-9 py-7">
      <header className="pb-4 border-b border-[var(--paper-edge)]">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--mos)]">
            Werkbon · afgehandeld
          </span>
          <span className="font-mono text-[11px] text-[var(--ink-faint)] tabular-nums">
            {formatTime(event.startedAt)} → {formatTime(event.completedAt)}
          </span>
        </div>
        <h1 className="font-display text-[22px] leading-[1.25] text-[var(--ink)] mt-2">
          {event.title}
        </h1>
      </header>

      {event.from && (
        <div className="pt-4 pb-1">
          <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[12.5px]">
            <span className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-wider self-center">
              Van
            </span>
            <span className="text-[var(--ink)]">{event.from}</span>
            {event.subject && (
              <>
                <span className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-wider self-center">
                  Betreft
                </span>
                <span className="text-[var(--ink)] font-display">{event.subject}</span>
              </>
            )}
          </div>
        </div>
      )}

      {event.body && event.body.length > 0 && (
        <div className="mt-4 pl-4 border-l-2 border-[var(--paper-edge)] space-y-3 text-[14px] leading-[1.6] text-[var(--ink)]">
          {event.body.map((p, i) => (
            <p key={i} className="whitespace-pre-wrap">{p}</p>
          ))}
        </div>
      )}

      {event.extra && event.extra.length > 0 && (
        <dl className="mt-5 pt-4 border-t border-[var(--paper-edge)] grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[12px]">
          {event.extra.map((e, i) => (
            <div key={i} className="contents">
              <dt className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-wider self-baseline whitespace-nowrap">
                {e.label}
              </dt>
              <dd className="text-[var(--ink-dim)]">{e.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {!event.body && (
        <p className="mt-3 text-[14px] leading-[1.55] text-[var(--ink-dim)]">{event.context}</p>
      )}
    </article>
  );
}

function ArchivedDossier({
  agents,
  agentNames,
}: {
  agents: AgentId[];
  agentNames: Record<AgentId, { name: string }>;
}) {
  if (agents.length === 0) return null;
  return (
    <div className="mx-auto w-full max-w-[680px] flex items-center justify-center gap-1 flex-wrap text-[12px]">
      <span className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em] mr-2">
        Dossier
      </span>
      {agents.map((id, i) => (
        <span key={id} className="flex items-center gap-1">
          {i > 0 && <span className="text-[var(--ink-faint)] select-none mx-1">→</span>}
          <span className="px-2 py-0.5 rounded-[2px] bg-[var(--paper-deep)] border border-[var(--paper-edge)] font-display text-[13px] text-[var(--ink)]">
            {agentNames[id].name}
          </span>
        </span>
      ))}
    </div>
  );
}

function ArchivedFooter({ event }: { event: CompletedEvent }) {
  return (
    <div className="mx-auto w-full max-w-[560px] pt-4 mt-2 border-t border-[var(--paper-edge)] flex items-baseline justify-between text-[12px]">
      <span className="font-mono text-[var(--ink-faint)] uppercase tracking-wider">
        {event.artifactCount} document{event.artifactCount === 1 ? '' : 'en'} opgeleverd
      </span>
      <span className="font-mono text-[var(--mos)]">
        {minutesToHoursLabel(event.minutesSaved)} werk bespaard
      </span>
    </div>
  );
}
