'use client';

import { motion, AnimatePresence } from 'motion/react';
import type { Artifact } from '@/lib/types';
import { ArtifactByline } from './ArtifactByline';
import { WaaromToggle } from './WaaromToggle';

interface Props {
  artifact: Artifact;
}

export function PickingListArtifact({ artifact }: Props) {
  const { meta, content, state, footer } = artifact;
  const rows = content.pickingRows ?? [];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="artifact-card mx-auto w-full max-w-[600px] px-9 py-8"
    >
      <header className="pb-4 border-b border-[var(--paper-edge)]">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.18em]">
              Pakbon · {meta.warehouse ?? 'Magazijn West'}
            </div>
            <h2 className="font-display text-[22px] text-[var(--ink)] mt-1 tracking-tight">
              {meta.pickingNumber}
            </h2>
          </div>
          <div className="text-right text-[12px] text-[var(--ink-dim)]">
            <div>{meta.customer}</div>
            <div className="font-mono text-[11px] text-[var(--ink-faint)]">{meta.date}</div>
          </div>
        </div>
      </header>

      <table className="w-full text-[13px] mt-4">
        <thead>
          <tr className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-wider">
            <th className="text-left pb-2 font-normal">Artikel</th>
            <th className="text-left pb-2 font-normal w-24">Locatie</th>
            <th className="text-right pb-2 font-normal w-16">Aantal</th>
            <th className="text-right pb-2 font-normal w-12"></th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence initial={false}>
            {rows.map((r, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="border-t border-[var(--paper-edge)]"
              >
                <td className="py-2 text-[var(--ink)]">{r.artikel}</td>
                <td className="py-2 font-mono text-[12px] text-[var(--ink-dim)]">{r.locatie}</td>
                <td className="py-2 text-right font-mono text-[var(--ink)]">{r.aantal}×</td>
                <td className="py-2 text-right">
                  {r.status === 'gepakt' ? (
                    <span className="font-mono text-[10px] text-[var(--mos)]">✓</span>
                  ) : (
                    <span className="font-mono text-[10px] text-[var(--ink-faint)]">○</span>
                  )}
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>

      {state === 'complete' && footer && (
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 pt-3 border-t border-[var(--paper-edge)] flex items-center justify-between gap-4"
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
