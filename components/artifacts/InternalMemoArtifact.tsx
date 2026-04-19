'use client';

import { motion, AnimatePresence } from 'motion/react';
import type { Artifact } from '@/lib/types';
import { ArtifactByline } from './ArtifactByline';
import { WaaromToggle } from './WaaromToggle';

interface Props {
  artifact: Artifact;
}

export function InternalMemoArtifact({ artifact }: Props) {
  const { meta, content, state, footer } = artifact;
  const bullets = content.bullets ?? [];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="artifact-card mx-auto w-full max-w-[600px] px-10 py-9"
    >
      <header className="pb-4 border-b border-[var(--paper-edge)]">
        <div className="inline-block font-mono text-[10px] text-[var(--paper)] uppercase tracking-[0.2em] bg-[var(--terra)] px-2 py-0.5 rounded-[1px]">
          Intern · Nordveld
        </div>
        <h2 className="font-display text-[20px] text-[var(--ink)] mt-3">
          {meta.memoSubject ?? meta.subject}
        </h2>
        {meta.date && (
          <div className="font-mono text-[11px] text-[var(--ink-faint)] mt-1">{meta.date}</div>
        )}
      </header>

      <div className="pt-5 space-y-4 text-[14px] leading-[1.65]">
        <AnimatePresence initial={false}>
          {bullets.map((section, i) => (
            <motion.section
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-wider mb-1">
                {section.heading}
              </div>
              <ol className="space-y-1 text-[var(--ink)] list-decimal list-inside">
                {section.items.map((item, j) => (
                  <li key={j} className="pl-1">{item}</li>
                ))}
              </ol>
            </motion.section>
          ))}
        </AnimatePresence>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-7 pt-3 border-t border-[var(--paper-edge)] space-y-2"
      >
        <div className="flex justify-between text-[11px] font-mono">
          <span className="text-[var(--ink-faint)]">
            Opgesteld door systeem · {state === 'complete' ? 'klaar voor review' : 'in opbouw'}
          </span>
          {state === 'complete' && footer && (
            <span className="text-[var(--mos)] tracking-wider">✓ {footer}</span>
          )}
        </div>
        {state === 'complete' && (
          <ArtifactByline agent={artifact.agent} startedAt={artifact.startedAt} />
        )}
      </motion.footer>
      <WaaromToggle reasoning={meta.reasoning} />
    </motion.article>
  );
}
