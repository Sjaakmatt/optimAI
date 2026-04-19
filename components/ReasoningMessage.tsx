'use client';

import clsx from 'clsx';
import { ArrowRight, Check, Radio } from 'lucide-react';
import { motion } from 'motion/react';
import { AGENT_DEFINITIONS } from '@/lib/agents/definitions';
import type { AgentMessage, MessageKind } from '@/lib/types';
import { formatTime } from '@/lib/utils';

const KIND_LABEL: Record<MessageKind, string> = {
  reasoning: 'Redenering',
  delegate: 'Delegeer',
  report: 'Rapport',
  handoff: 'Overdracht',
  action: 'Actie',
};

const KIND_COLOR: Record<MessageKind, string> = {
  reasoning: 'text-[var(--text-dim)]',
  delegate: 'text-[var(--accent)]',
  report: 'text-[var(--signal-green)]',
  handoff: 'text-[var(--signal-amber)]',
  action: 'text-[var(--signal-green)]',
};

interface Props {
  message: AgentMessage;
}

export function ReasoningMessage({ message }: Props) {
  const fromAgent = AGENT_DEFINITIONS[message.from];
  const toAgent =
    message.to === 'broadcast' ? null : AGENT_DEFINITIONS[message.to];

  const isStreaming = message.status === 'streaming';
  const isComplete = message.status === 'complete';

  return (
    <motion.article
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={clsx(
        'px-4 py-3 border-b border-[var(--border)]',
        isStreaming && 'bg-[color:rgba(212,168,87,0.03)]',
      )}
    >
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="h-[8px] w-[8px] rounded-full inline-block shrink-0"
            style={{ backgroundColor: fromAgent.color }}
          />
          <span className="font-display text-[15px] leading-none text-[var(--text)] truncate">
            {fromAgent.name}
          </span>
          {message.to === 'broadcast' ? (
            <span className="inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--text-faint)]">
              <Radio size={10} />
              <span>Broadcast</span>
            </span>
          ) : (
            toAgent && (
              <>
                <ArrowRight size={12} className="text-[var(--text-faint)] shrink-0" />
                <span
                  className="h-[6px] w-[6px] rounded-full inline-block shrink-0"
                  style={{ backgroundColor: toAgent.color }}
                />
                <span className="font-display text-[14px] leading-none text-[var(--text-dim)] truncate">
                  {toAgent.name}
                </span>
              </>
            )
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={clsx(
              'font-mono text-[9px] tracking-[0.14em] uppercase',
              KIND_COLOR[message.kind],
            )}
          >
            {KIND_LABEL[message.kind]}
          </span>
          <span className="font-mono text-[10px] text-[var(--text-faint)]">
            {formatTime(message.timestamp)}
          </span>
        </div>
      </header>

      <p className="mt-2 font-mono text-[12.5px] leading-[1.55] text-[var(--text)] whitespace-pre-wrap break-words">
        {message.content}
        {isStreaming && <span className="caret" aria-hidden />}
      </p>

      {isComplete && typeof message.minutesSaved === 'number' && message.minutesSaved > 0 && (
        <footer className="mt-2 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--signal-green)]">
          <Check size={11} />
          <span>Actie voltooid · +{message.minutesSaved} min bespaard</span>
        </footer>
      )}
    </motion.article>
  );
}
