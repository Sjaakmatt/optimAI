'use client';

import { motion, AnimatePresence } from 'motion/react';
import type { Artifact } from '@/lib/types';
import { ArtifactByline } from './ArtifactByline';
import { WaaromToggle } from './WaaromToggle';

interface Props {
  artifact: Artifact;
}

export function TransportPlanArtifact({ artifact }: Props) {
  const { meta, content, state, footer } = artifact;
  const stops = content.stops ?? [];

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
              Transportplan
            </div>
            <h2 className="font-display text-[20px] text-[var(--ink)] mt-1">
              {meta.routeName ?? 'Rit'}
            </h2>
          </div>
          <div className="text-right text-[12px] text-[var(--ink-dim)]">
            {meta.vehicle && <div>{meta.vehicle}</div>}
            {meta.driver && <div className="font-mono text-[11px]">Chauffeur {meta.driver}</div>}
            {meta.totalKm && <div className="font-mono text-[11px] text-[var(--ink-faint)]">{meta.totalKm}</div>}
          </div>
        </div>
      </header>

      <ol className="mt-5 relative">
        <span
          className="absolute left-[11px] top-2 bottom-2 w-px bg-[var(--paper-edge)]"
          aria-hidden
        />
        <AnimatePresence initial={false}>
          {stops.map((stop, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative pl-9 pb-4 last:pb-0"
            >
              <span className="absolute left-0 top-0.5 flex items-center justify-center w-[22px] h-[22px] rounded-full bg-[var(--paper)] border border-[var(--paper-edge)] font-mono text-[11px] text-[var(--ink-dim)]">
                {i + 1}
              </span>
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <div className="font-display text-[15px] text-[var(--ink)]">
                    {stop.plaats}
                    {stop.klant && (
                      <span className="text-[var(--ink-dim)] text-[13px]"> · {stop.klant}</span>
                    )}
                  </div>
                  {stop.artikelen && (
                    <div className="text-[12px] text-[var(--ink-dim)] mt-0.5">{stop.artikelen}</div>
                  )}
                </div>
                <span className="font-mono text-[12px] text-[var(--ink-dim)] whitespace-nowrap tabular-nums">
                  {stop.tijd}
                </span>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>

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
