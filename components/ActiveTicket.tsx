'use client';

import { motion } from 'motion/react';
import { Mail, Bell, Phone, MessageCircle, FileText } from 'lucide-react';
import type { DemoEvent, EventChannel } from '@/lib/types';
import { formatTime } from '@/lib/utils';

interface Props {
  event: DemoEvent;
}

const CHANNEL_META: Record<
  EventChannel,
  { label: string; Icon: typeof Mail }
> = {
  email: { label: 'E-mail', Icon: Mail },
  system: { label: 'Systeem', Icon: Bell },
  phone: { label: 'Telefoon', Icon: Phone },
  whatsapp: { label: 'WhatsApp', Icon: MessageCircle },
  form: { label: 'Formulier', Icon: FileText },
};

export function ActiveTicket({ event }: Props) {
  const channel = event.channel ?? 'email';
  const meta = CHANNEL_META[channel];
  const Icon = meta.Icon;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mx-auto w-full max-w-[640px] artifact-card artifact-card--lift px-9 py-7"
    >
      <header className="pb-4 border-b border-[var(--paper-edge)]">
        <div className="flex items-baseline justify-between">
          <div className="flex items-center gap-2">
            <Icon size={13} strokeWidth={1.5} className="text-[var(--oker-deep)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--oker-deep)]">
              Werkbon · {meta.label} binnengekomen
            </span>
          </div>
          <span className="font-mono text-[11px] text-[var(--ink-faint)] tabular-nums">
            {formatTime(event.timestamp)}
          </span>
        </div>
        <h1 className="font-display text-[22px] leading-[1.25] text-[var(--ink)] mt-2">
          {event.label}
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
        <div
          className={`mt-4 pl-4 border-l-2 ${
            channel === 'system' ? 'border-[var(--steen)]' : 'border-[var(--paper-edge)]'
          } space-y-3 text-[14px] leading-[1.6] text-[var(--ink)]`}
          style={
            channel === 'phone' || channel === 'whatsapp'
              ? { fontStyle: 'italic', color: 'var(--ink-dim)' }
              : undefined
          }
        >
          {event.body.map((p, i) => (
            <p key={i} className="whitespace-pre-wrap">{p}</p>
          ))}
        </div>
      )}

      {event.extra && event.extra.length > 0 && (
        <dl className="mt-5 pt-4 border-t border-[var(--paper-edge)] grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[12px]">
          {event.extra.map((e, i) => (
            <FragmentRow key={i} label={e.label} value={e.value} />
          ))}
        </dl>
      )}

      {!event.body && (
        <p className="mt-3 text-[14px] leading-[1.55] text-[var(--ink-dim)]">{event.context}</p>
      )}
    </motion.article>
  );
}

function FragmentRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-wider self-baseline whitespace-nowrap">
        {label}
      </dt>
      <dd className="text-[var(--ink-dim)]">{value}</dd>
    </>
  );
}
