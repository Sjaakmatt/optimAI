'use client';

import { motion, AnimatePresence } from 'motion/react';
import { EmailArtifact } from '@/components/artifacts/EmailArtifact';
import { BRIEF_EMAIL, BRIEF_STAPPEN, type SceneProps } from '../film-content';
import { beatReveal, EASE } from '../film-motion';

/**
 * Halte 1. Een envelop valt op de mat; de bezoeker opent hem zelf en ziet
 * hoe de agent er een klaargezet antwoord van maakt.
 */
export function SceneBrief({ beat, reduced, interacted, onInteract }: SceneProps) {
  const open = interacted;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[300px] sm:min-h-[340px]">
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.div
            key="dicht"
            className="flex flex-col items-center"
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16, transition: { duration: 0.3 } }}
          >
            {/* De mat */}
            <motion.button
              type="button"
              onClick={onInteract}
              aria-expanded={open}
              aria-label="Open de brief"
              className="group relative flex flex-col items-center focus-visible:outline-2 focus-visible:outline-[var(--oker-deep)] rounded-[4px] p-4"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.svg
                viewBox="0 0 150 104"
                className="w-[150px] sm:w-[180px] h-auto drop-shadow-sm"
                aria-hidden
                focusable="false"
                initial={reduced ? false : { y: -110, rotate: -7, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                transition={
                  reduced ? undefined : { type: 'spring', stiffness: 160, damping: 15, delay: 0.25 }
                }
              >
                {/* envelop */}
                <rect
                  x="15" y="18" width="120" height="72" rx="2"
                  fill="var(--paper)" stroke="var(--ink-dim)" strokeWidth="1.2"
                />
                {/* flaplijnen */}
                <path d="M15 20 L75 58 L135 20" fill="none" stroke="var(--ink-dim)" strokeWidth="1.2" />
                <path d="M15 88 L58 56 M135 88 L92 56" fill="none" stroke="var(--paper-edge)" strokeWidth="1" />
                {/* zegel */}
                <circle cx="75" cy="58" r="7" fill="var(--oker)" opacity="0.9" />
                <circle cx="75" cy="58" r="7" fill="none" stroke="var(--oker-deep)" strokeWidth="1" />
              </motion.svg>
              <span className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-dim)] group-hover:text-[var(--oker-deep)] transition-colors">
                Er is post
              </span>
            </motion.button>

            {/* Hint verschijnt op de wacht-beat */}
            <motion.div
              {...beatReveal(beat >= 1, reduced)}
              className="mt-3 flex items-center gap-2 text-[13px] text-[var(--ink-dim)]"
            >
              <span
                aria-hidden
                className="inline-block h-[1px] w-6"
                style={{ background: 'var(--oker)' }}
              />
              Klik op de envelop om hem te openen
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="open"
            className="w-full"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="mx-auto max-w-[560px] origin-top scale-[0.92] sm:scale-100">
              <EmailArtifact artifact={BRIEF_EMAIL} />
            </div>

            <motion.ol
              {...beatReveal(reduced || beat >= 3, reduced)}
              className="mt-5 flex flex-col sm:flex-row items-stretch justify-center gap-3 sm:gap-4"
            >
              {BRIEF_STAPPEN.map((stap, i) => (
                <li
                  key={stap.label}
                  className="flex items-center gap-3 rounded-[3px] border border-[var(--paper-edge)] bg-[var(--paper-warm)] px-4 py-2.5"
                >
                  <span className="font-mono text-[11px] text-[var(--oker-deep)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[13px] leading-snug">
                    <span className="font-display text-[var(--ink)]">{stap.label}.</span>{' '}
                    <span className="text-[var(--ink-dim)]">{stap.body}</span>
                  </span>
                </li>
              ))}
            </motion.ol>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
