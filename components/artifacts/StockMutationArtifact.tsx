'use client';

import { motion } from 'motion/react';
import type { Artifact } from '@/lib/types';
import { ArtifactByline } from './ArtifactByline';
import { WaaromToggle } from './WaaromToggle';

interface Props {
  artifact: Artifact;
}

export function StockMutationArtifact({ artifact }: Props) {
  const { meta, content, state, footer } = artifact;
  const delta = content.stockDelta;
  if (!delta) return null;

  const change = delta.wordt - delta.was;
  const positive = change >= 0;
  const sign = positive ? '+' : '−';
  const max = Math.max(delta.was, delta.wordt, 100);
  const wasPct = (delta.was / max) * 100;
  const wordtPct = (delta.wordt / max) * 100;
  const unit = delta.unit ?? '';

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="artifact-card mx-auto w-full max-w-[520px] px-8 py-6"
    >
      <header className="pb-3 border-b border-[var(--paper-edge)] flex items-baseline justify-between">
        <div>
          <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.18em]">
            Voorraad-mutatie
          </div>
          <h2 className="font-display text-[18px] text-[var(--ink)] mt-1">{delta.artikel}</h2>
        </div>
        <span
          className="font-display text-[20px] tabular-nums"
          style={{ color: positive ? 'var(--mos)' : 'var(--terra)' }}
        >
          {sign} {Math.abs(change)} {unit}
        </span>
      </header>

      <div className="mt-5 space-y-3 text-[12px]">
        <Row label="Was" value={delta.was} unit={unit} pct={wasPct} color="var(--steen)" />
        <Row
          label="Wordt"
          value={delta.wordt}
          unit={unit}
          pct={wordtPct}
          color={positive ? 'var(--mos)' : 'var(--terra)'}
        />
      </div>

      {delta.reden && (
        <div className="mt-4 text-[12px] text-[var(--ink-dim)] italic">
          {delta.reden}
        </div>
      )}

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

function Row({
  label,
  value,
  unit,
  pct,
  color,
}: {
  label: string;
  value: number;
  unit: string;
  pct: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-wider w-12">
        {label}
      </div>
      <div className="flex-1 h-2 bg-[var(--paper-deep)] rounded-[1px] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="h-full"
          style={{ background: color }}
        />
      </div>
      <div className="font-mono text-[12px] text-[var(--ink)] tabular-nums w-20 text-right">
        {value} {unit}
      </div>
    </div>
  );
}
