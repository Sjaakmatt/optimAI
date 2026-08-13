'use client';

import { motion } from 'motion/react';
import { Check, ChevronDown } from 'lucide-react';
import { DENKEN_CHECKS, DENKEN_REASONING, type SceneProps } from '../film-content';
import { beatReveal } from '../film-motion';

/**
 * Stap 2. De controle: de agent controleert hardop, en zijn
 * redenering is altijd terug te lezen.
 */
export function SceneDenken({ beat, reduced }: SceneProps) {
  return (
    <div className="mx-auto w-full max-w-[520px]">
      <div className="artifact-card px-6 sm:px-8 py-6">
        <div className="flex items-baseline justify-between border-b border-[var(--paper-edge)] pb-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-faint)]">
            Controle · binnengekomen order
          </span>
          <ThinkingDots active={!reduced && beat < 3} />
        </div>

        <ul className="mt-4 space-y-3">
          {DENKEN_CHECKS.map((check, i) => {
            const done = reduced || beat >= i + 1;
            return (
              <motion.li
                key={check.label}
                {...beatReveal(done, reduced)}
                className="flex items-start gap-3"
              >
                <span className="mt-[1px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-[var(--mos)] bg-[var(--paper-warm)]">
                  {done &&
                    (reduced ? (
                      <Check size={11} strokeWidth={2.2} className="text-[var(--mos)]" />
                    ) : (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.15 }}
                        className="flex"
                      >
                        <Check size={11} strokeWidth={2.2} className="text-[var(--mos)]" />
                      </motion.span>
                    ))}
                </span>
                <span className="text-[14px] leading-snug">
                  <span className="font-display text-[var(--ink)]">{check.label}.</span>{' '}
                  <span className="text-[var(--ink-dim)]">{check.value}</span>
                </span>
              </motion.li>
            );
          })}
        </ul>

        {/* De onderbouwing: waarom de agent dit besloot */}
        <motion.div
          {...beatReveal(reduced || beat >= 4, reduced)}
          className="mt-5 border-t border-dashed border-[var(--paper-edge)] pt-3"
        >
          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--oker-deep)]">
            <ChevronDown size={11} strokeWidth={1.5} aria-hidden />
            Onderbouwing van de agent
          </div>
          <ul className="mt-2 space-y-1.5 text-[12.5px] leading-relaxed text-[var(--ink-dim)]">
            {DENKEN_REASONING.map((r, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="select-none text-[var(--ink-faint)]">
                  ·
                </span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

function ThinkingDots({ active }: { active: boolean }) {
  if (!active) {
    return (
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--mos)]">
        Gecontroleerd
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-[4px] w-[4px] rounded-full bg-[var(--oker)]"
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
        />
      ))}
    </span>
  );
}
