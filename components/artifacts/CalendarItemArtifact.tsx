'use client';

import { motion } from 'motion/react';
import type { Artifact } from '@/lib/types';
import { ArtifactByline } from './ArtifactByline';
import { WaaromToggle } from './WaaromToggle';

interface Props {
  artifact: Artifact;
}

export function CalendarItemArtifact({ artifact }: Props) {
  const { meta, content, state, footer } = artifact;
  const slot = content.slot;
  if (!slot) return null;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="artifact-card mx-auto w-full max-w-[480px] px-7 py-6"
    >
      <header className="pb-3 border-b border-[var(--paper-edge)] flex items-baseline justify-between">
        <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.18em]">
          Agenda · ingepland
        </div>
        <div className="font-mono text-[11px] text-[var(--ink-dim)]">{slot.duur}</div>
      </header>

      <div className="mt-4 space-y-3">
        <div>
          <div className="font-display text-[20px] text-[var(--ink)] leading-tight">
            {slot.onderwerp}
          </div>
          <div className="text-[13px] text-[var(--ink-dim)] mt-0.5">Voor {slot.voor}</div>
        </div>

        <div className="flex items-baseline gap-2 text-[13px]">
          <span className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-wider">
            Wanneer
          </span>
          <span className="text-[var(--ink)]">{slot.wanneer}</span>
        </div>

        {slot.details && slot.details.length > 0 && (
          <ul className="pt-2 border-t border-[var(--paper-edge)] space-y-1 text-[13px]">
            {slot.details.map((d, i) => (
              <li key={i} className="flex gap-2 text-[var(--ink-dim)]">
                <span className="text-[var(--ink-faint)] select-none">—</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {state === 'complete' && footer && (
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-5 pt-3 border-t border-[var(--paper-edge)] flex items-center justify-between gap-4"
        >
          <span className="font-mono text-[11px] text-[var(--mos)] tracking-wider">
            ✓ {footer}
          </span>
          <ArtifactByline agent={artifact.agent} startedAt={artifact.startedAt} />
        </motion.footer>
      )}
      <WaaromToggle reasoning={meta.reasoning} />
    </motion.article>
  );
}
