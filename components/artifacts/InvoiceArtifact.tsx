'use client';

import { motion, AnimatePresence } from 'motion/react';
import type { Artifact } from '@/lib/types';
import { formatEuroPrecise } from '@/lib/utils';
import { ArtifactByline } from './ArtifactByline';
import { WaaromToggle } from './WaaromToggle';

interface Props {
  artifact: Artifact;
}

export function InvoiceArtifact({ artifact }: Props) {
  const { meta, content, state, footer } = artifact;
  const lines = content.lines ?? [];
  const isCredit = meta.invoiceKind === 'credit';
  const label = isCredit ? 'Creditnota' : 'Factuur';

  const subtotal = lines.reduce((acc, l) => acc + l.totaal, 0);
  const btw = subtotal * 0.21;
  const total = subtotal + btw;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="artifact-card mx-auto w-full max-w-[640px] px-10 py-10"
    >
      <header className="flex items-start justify-between pb-5 border-b border-[var(--paper-edge)]">
        <div>
          <div className="font-display text-[22px] leading-none text-[var(--ink)]">NORDVELD</div>
          <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-wider mt-1">
            Groothandel Bouwmaterialen
          </div>
        </div>
        <div className="text-right">
          <div className="font-display text-[18px] text-[var(--ink)]">{label}</div>
          <div className="font-mono text-[12px] text-[var(--ink-dim)] mt-0.5">{meta.invoiceNumber}</div>
          <div className="font-mono text-[11px] text-[var(--ink-faint)] mt-0.5">{meta.date}</div>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-6 py-5 border-b border-[var(--paper-edge)] text-[13px]">
        <div>
          <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-wider">Geadresseerde</div>
          <div className="mt-1 text-[var(--ink)] font-display text-[15px]">{meta.customer}</div>
          <div className="text-[var(--ink-dim)] whitespace-pre-line">{meta.to}</div>
        </div>
        <div>
          <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-wider">Voorwaarden</div>
          <div className="mt-1 text-[var(--ink-dim)] text-[13px]">{meta.terms}</div>
        </div>
      </div>

      <table className="w-full text-[13px] mt-5">
        <thead>
          <tr className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-wider">
            <th className="text-left pb-2 font-normal">Omschrijving</th>
            <th className="text-right pb-2 font-normal w-16">Aantal</th>
            <th className="text-right pb-2 font-normal w-24">Prijs</th>
            <th className="text-right pb-2 font-normal w-24">Totaal</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence initial={false}>
            {lines.map((line, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="border-t border-[var(--paper-edge)]"
              >
                <td className="py-2 text-[var(--ink)]">{line.omschrijving}</td>
                <td className="py-2 text-right font-mono text-[var(--ink-dim)]">
                  {isCredit ? '−' : ''}{line.aantal}
                </td>
                <td className="py-2 text-right font-mono text-[var(--ink-dim)]">
                  {formatEuroPrecise(line.prijs)}
                </td>
                <td className="py-2 text-right font-mono text-[var(--ink)]">
                  {isCredit ? '−' : ''}{formatEuroPrecise(line.totaal)}
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>

      {lines.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4 pt-4 border-t border-[var(--paper-edge)] flex justify-end"
        >
          <div className="w-[260px] text-[13px] space-y-1">
            <div className="flex justify-between text-[var(--ink-dim)]">
              <span>Subtotaal</span>
              <span className="font-mono">{isCredit ? '−' : ''}{formatEuroPrecise(subtotal)}</span>
            </div>
            <div className="flex justify-between text-[var(--ink-dim)]">
              <span>BTW 21%</span>
              <span className="font-mono">{isCredit ? '−' : ''}{formatEuroPrecise(btw)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[var(--paper-edge)] text-[var(--ink)] font-display text-[15px]">
              <span>Totaal</span>
              <span className="font-mono">{isCredit ? '−' : ''}{formatEuroPrecise(total)}</span>
            </div>
          </div>
        </motion.div>
      )}

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
