'use client';

import { motion, AnimatePresence } from 'motion/react';
import type { Artifact } from '@/lib/types';
import { ArtifactByline } from './ArtifactByline';
import { WaaromToggle } from './WaaromToggle';

interface Props {
  artifact: Artifact;
}

export function CallNoteArtifact({ artifact }: Props) {
  const { meta, content, state, footer } = artifact;
  const bullets = content.bullets ?? [];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mx-auto w-full max-w-[580px] px-10 py-9 rounded-[2px] border border-[var(--paper-edge)]"
      style={{
        background: 'linear-gradient(180deg, #f2e6b8 0%, #eedf9f 100%)',
        boxShadow: 'var(--shadow-lift)',
      }}
    >
      <header className="pb-4 border-b border-[rgba(125,94,36,0.25)]">
        <div className="font-mono text-[10px] text-[var(--oker-deep)] uppercase tracking-[0.18em]">
          Belnotitie
        </div>
        <h2 className="font-display text-[22px] text-[var(--ink)] mt-1">
          Voor {meta.callContext ?? 'finance'}
        </h2>
        <div className="mt-2 text-[13px] text-[var(--ink-dim)]">
          <span className="font-display text-[15px] text-[var(--ink)]">{meta.customer}</span>
          {meta.phone && (
            <span className="font-mono text-[12px] text-[var(--ink-dim)] ml-3">· {meta.phone}</span>
          )}
        </div>
      </header>

      <div className="pt-5 space-y-5 text-[14px] leading-[1.7]">
        <AnimatePresence initial={false}>
          {bullets.map((section, i) => (
            <motion.section
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <div className="font-mono text-[10px] text-[var(--oker-deep)] uppercase tracking-wider mb-1">
                {section.heading}
              </div>
              <ul className="space-y-1 text-[var(--ink)]">
                {section.items.map((item, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-[var(--ink-faint)] select-none">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}
        </AnimatePresence>
      </div>

      {state === 'complete' && footer && (
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 pt-4 border-t border-[rgba(125,94,36,0.25)] flex items-center justify-between gap-4"
        >
          <span className="font-mono text-[11px] text-[var(--oker-deep)] tracking-wider">
            ✓ {footer}
          </span>
          <ArtifactByline agent={artifact.agent} startedAt={artifact.startedAt} />
        </motion.footer>
      )}
      <WaaromToggle reasoning={meta.reasoning} />
    </motion.article>
  );
}
