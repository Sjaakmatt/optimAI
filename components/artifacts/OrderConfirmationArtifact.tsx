'use client';

import { motion, AnimatePresence } from 'motion/react';
import type { Artifact } from '@/lib/types';

interface Props {
  artifact: Artifact;
}

export function OrderConfirmationArtifact({ artifact }: Props) {
  const { meta, content, state, footer } = artifact;
  const items = content.items ?? [];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="artifact-card mx-auto w-full max-w-[620px] px-10 py-9"
    >
      <header className="pb-5 border-b border-[var(--paper-edge)]">
        <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.18em]">
          Orderbevestiging
        </div>
        <h2 className="font-display text-[28px] text-[var(--ink)] mt-1 tracking-tight">
          {meta.orderNumber}
        </h2>
        <div className="mt-2 text-[13px] text-[var(--ink-dim)]">
          Voor <span className="text-[var(--ink)]">{meta.customer}</span> · {meta.date}
        </div>
      </header>

      <div className="grid grid-cols-2 gap-6 py-5 border-b border-[var(--paper-edge)] text-[13px]">
        <div>
          <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-wider">Leverdatum</div>
          <div className="mt-1 text-[var(--ink)] font-display text-[15px]">{meta.deliveryDate}</div>
          {meta.deliveryWindow && (
            <div className="text-[var(--ink-dim)] text-[12px]">{meta.deliveryWindow}</div>
          )}
        </div>
        <div>
          <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-wider">Afleveradres</div>
          <div className="mt-1 text-[var(--ink-dim)] whitespace-pre-line">{meta.deliveryAddress}</div>
        </div>
      </div>

      <div className="pt-5">
        <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-wider mb-2">Artikelen</div>
        <ul className="space-y-1">
          <AnimatePresence initial={false}>
            {items.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex justify-between items-baseline py-2 border-t border-[var(--paper-edge)] text-[14px]"
              >
                <span className="text-[var(--ink)]">{item.artikel}</span>
                <span className="font-mono text-[var(--ink-dim)]">{item.aantal}×</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>

      {state === 'complete' && footer && (
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-7 pt-4 border-t border-[var(--paper-edge)] flex justify-between items-baseline text-[12px]"
        >
          <span className="font-mono text-[var(--mos)] tracking-wider">✓ {footer}</span>
          <span className="font-mono text-[var(--ink-faint)]">Vragen? 0228-554100</span>
        </motion.footer>
      )}
    </motion.article>
  );
}
