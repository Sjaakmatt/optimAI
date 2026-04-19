'use client';

import { motion, AnimatePresence } from 'motion/react';
import type { Artifact } from '@/lib/types';

interface Props {
  artifact: Artifact;
}

export function WhatsAppThreadArtifact({ artifact }: Props) {
  const { meta, content, state, footer } = artifact;
  const messages = content.messages ?? [];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="artifact-card mx-auto w-full max-w-[440px] px-6 py-6"
    >
      <header className="pb-3 border-b border-[var(--paper-edge)] flex items-center justify-between">
        <div>
          <div className="font-display text-[15px] text-[var(--ink)]">{meta.customer}</div>
          <div className="font-mono text-[11px] text-[var(--ink-faint)]">{meta.phone}</div>
        </div>
        <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-wider">
          WhatsApp
        </div>
      </header>

      <div className="pt-4 space-y-3">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className={msg.from === 'us' ? 'flex justify-end' : 'flex justify-start'}
            >
              <div
                className="max-w-[80%] px-3 py-2 rounded-[8px] text-[14px] leading-relaxed"
                style={{
                  background: msg.from === 'us' ? 'rgba(94, 110, 63, 0.15)' : 'var(--paper-deep)',
                  border: '1px solid var(--paper-edge)',
                }}
              >
                <div className="text-[var(--ink)] whitespace-pre-wrap">{msg.text}</div>
                <div className="text-right mt-1 font-mono text-[10px] text-[var(--ink-faint)]">
                  {msg.time}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {state === 'complete' && footer && (
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 pt-3 border-t border-[var(--paper-edge)] font-mono text-[11px] text-[var(--mos)] tracking-wider"
        >
          ✓✓ {footer}
        </motion.footer>
      )}
    </motion.article>
  );
}
