'use client';

import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Toneel } from '../wereld/Toneel';
import { Boom, Bankje, Figuur, Struik, Bloemen, PAD_Y } from '../wereld/wereld';
import { DENKEN_CHECKS, DENKEN_REASONING, type SceneProps } from '../film-content';

/**
 * Halte 2. De agent zit op een bankje onder een grote boom en denkt
 * hardop: zijn gedachten verschijnen als een wolkje boven zijn hoofd.
 */
export function SceneDenken({ beat, reduced }: SceneProps) {
  const denktNog = !reduced && beat < DENKEN_CHECKS.length;

  return (
    <div className="absolute inset-0">
      <Toneel stop={1} reduced={reduced}>
        <Boom x={330} y={PAD_Y - 4} s={1.7} />
        <Bankje x={400} y={PAD_Y + 2} />
        <Figuur x={392} y={PAD_Y + 2} pose="zittend" s={1.15} />
        <Struik x={560} y={PAD_Y - 6} />
        <Bloemen x={200} y={PAD_Y + 18} />
        <Boom x={840} y={PAD_Y - 2} s={0.85} />
        {/* gedachtenbelletjes richting de wolk */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={415 + i * 12}
            cy={PAD_Y - 52 - i * 16}
            r={2.5 + i * 1.3}
            fill="var(--paper)"
            stroke="var(--ink-faint)"
            strokeWidth={1}
            initial={false}
            animate={denktNog ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.9 }}
            transition={denktNog ? { duration: 1.6, repeat: Infinity, delay: i * 0.35 } : undefined}
          />
        ))}
      </Toneel>

      {/* de gedachtenwolk met het werkbriefje */}
      <div
        className="absolute right-[4%] top-[3%] w-[min(330px,58%)] rounded-[16px] border border-[var(--ink-faint)]/50 bg-[var(--paper)]/95 px-4 py-3.5 shadow-[var(--shadow-lift)]"
        style={{ borderStyle: 'dashed' }}
      >
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--ink-faint)]">
            Wat hij denkt
          </span>
          {!denktNog && (
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--mos)]">
              gecontroleerd
            </span>
          )}
        </div>
        <ul className="mt-2.5 space-y-2">
          {DENKEN_CHECKS.map((check, i) => {
            const done = reduced || beat >= i + 1;
            return (
              <motion.li
                key={check.label}
                initial={reduced ? false : { opacity: 0, x: -8 }}
                animate={done ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex items-start gap-2.5"
              >
                <span className="mt-[1px] flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full border border-[var(--mos)] bg-[var(--paper-warm)]">
                  {done && (
                    <motion.span
                      initial={reduced ? false : { scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.12 }}
                      className="flex"
                    >
                      <Check size={9} strokeWidth={2.4} className="text-[var(--mos)]" />
                    </motion.span>
                  )}
                </span>
                <span className="text-[12px] leading-snug">
                  <span className="font-display text-[var(--ink)]">{check.label}.</span>{' '}
                  <span className="text-[var(--ink-dim)]">{check.value}</span>
                </span>
              </motion.li>
            );
          })}
        </ul>
        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={reduced || beat >= 4 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-2.5 border-t border-dashed border-[var(--paper-edge)] pt-2 text-[11.5px] leading-[1.55] text-[var(--ink-dim)] italic"
        >
          {DENKEN_REASONING}
        </motion.p>
      </div>
    </div>
  );
}
