'use client';

import { motion, AnimatePresence } from 'motion/react';
import type { Artifact } from '@/lib/types';
import { ArtifactByline } from './ArtifactByline';
import { WaaromToggle } from './WaaromToggle';

interface Props {
  artifact: Artifact;
}

export function EmailArtifact({ artifact }: Props) {
  const { meta, content, state, footer } = artifact;
  const paragraphs = content.paragraphs ?? [];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="artifact-card mx-auto w-full max-w-[640px] px-10 py-10"
    >
      <header className="pb-5 border-b border-[var(--paper-edge)]">
        <div className="grid grid-cols-[auto_1fr_auto] gap-x-4 gap-y-1 text-[13px] leading-relaxed">
          <span className="font-mono text-[var(--ink-faint)] uppercase tracking-wider text-[11px] self-center">Van</span>
          <span className="text-[var(--ink)]">{meta.from}</span>
          <span className="font-mono text-[var(--ink-faint)] text-[11px] self-center justify-self-end row-span-2">
            {meta.date}
          </span>
          <span className="font-mono text-[var(--ink-faint)] uppercase tracking-wider text-[11px] self-center">Aan</span>
          <span className="text-[var(--ink)]">{meta.to}</span>
          <span className="font-mono text-[var(--ink-faint)] uppercase tracking-wider text-[11px] self-center col-start-1">Onderwerp</span>
          <span className="text-[var(--ink)] col-span-2 font-display text-[15px]">{meta.subject}</span>
        </div>
      </header>

      <div className="pt-6 space-y-4 text-[15px] leading-[1.7] text-[var(--ink)] font-[var(--font-lora)]">
        <AnimatePresence initial={false}>
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="whitespace-pre-wrap"
            >
              {p}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>

      {state === 'complete' && footer && (
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 pt-4 border-t border-[var(--paper-edge)] flex items-center justify-between gap-4"
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
