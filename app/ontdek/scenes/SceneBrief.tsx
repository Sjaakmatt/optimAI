'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Toneel } from '../wereld/Toneel';
import { Huisje, Brievenbus, Boom, Struik, Bloemen, Envelopje, PAD_Y } from '../wereld/wereld';
import { BRIEF, BRIEF_STAPPEN, type SceneProps } from '../film-content';

/**
 * Halte 1. Een huisje aan het pad, een brievenbus, en een envelop die
 * uit de lucht komt dwarrelen. De bezoeker opent de brievenbus zelf.
 */
export function SceneBrief({ beat, reduced, actief, interacted, onInteract }: SceneProps) {
  const open = interacted;
  const brievenbusX = 560;

  return (
    <div className="absolute inset-0">
      <Toneel stop={0} reduced={reduced}>
        <Huisje x={300} y={PAD_Y - 14} w={96} h={56} schoorsteen />
        <Boom x={190} y={PAD_Y - 6} s={1.15} />
        <Boom x={880} y={PAD_Y - 2} s={0.9} />
        <Struik x={420} y={PAD_Y - 8} />
        <Bloemen x={640} y={PAD_Y + 16} />
        <Brievenbus x={brievenbusX} y={PAD_Y + 4} vlagOmhoog={reduced || beat >= 0 ? !open : false} />
        {/* de envelop dwarrelt naar de brievenbus */}
        {!open && (
          <motion.g
            initial={reduced ? { x: brievenbusX, y: PAD_Y - 44 } : { x: brievenbusX + 220, y: 60, rotate: -14 }}
            animate={
              actief || reduced
                ? { x: brievenbusX, y: PAD_Y - 44, rotate: 0 }
                : { x: brievenbusX + 220, y: 60, rotate: -14 }
            }
            transition={reduced ? { duration: 0 } : { duration: 1.6, ease: 'easeInOut', delay: 0.4 }}
          >
            <Envelopje s={0.9} />
          </motion.g>
        )}
      </Toneel>

      {/* klik-uitnodiging op de brievenbus */}
      {!open && (
        <motion.button
          type="button"
          onClick={onInteract}
          aria-expanded={open}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={reduced || beat >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          className="absolute flex items-center gap-2 rounded-full border border-[var(--oker)] bg-[var(--paper)] px-3.5 py-1.5 text-[12px] text-[var(--ink)] shadow-[var(--shadow-soft)] transition-colors hover:bg-[var(--paper-warm)]"
          style={{ left: '52%', bottom: '24%' }}
        >
          <motion.span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full bg-[var(--oker)]"
            animate={reduced ? undefined : { scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          Open de brievenbus
        </motion.button>
      )}

      {/* de brief, opgehouden voor de camera */}
      <AnimatePresence>
        {open && (
          <motion.figure
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: -1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 140, damping: 16 }}
            className="absolute right-[3%] top-[3%] w-[min(300px,60%)] rounded-[2px] border border-[var(--paper-edge)] bg-[var(--paper)] px-4 py-3.5 shadow-[var(--shadow-lift)]"
          >
            <figcaption className="flex items-baseline justify-between gap-2 border-b border-[var(--paper-edge)] pb-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--ink-faint)]">
                {BRIEF.van}
              </span>
            </figcaption>
            <div className="mt-2 font-display text-[13px] text-[var(--ink)]">{BRIEF.onderwerp}</div>
            <div className="mt-1.5 space-y-1.5 text-[11.5px] leading-[1.55] text-[var(--ink-dim)]">
              {BRIEF.regels.map((r, i) => (
                <p key={i}>{r}</p>
              ))}
            </div>
            <div className="mt-2.5 border-t border-dashed border-[var(--paper-edge)] pt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--mos)]">
              ✓ {BRIEF.stempel}
            </div>
          </motion.figure>
        )}
      </AnimatePresence>

      {/* de drie stappen als wegwijzertjes */}
      <AnimatePresence>
        {open && (reduced || beat >= 3) && (
          <motion.ol
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-[3%] left-[3%] hidden sm:flex flex-wrap items-center gap-2"
          >
            {BRIEF_STAPPEN.map((stap, i) => (
              <li
                key={stap.label}
                className="flex items-center gap-2 rounded-full border border-[var(--paper-edge)] bg-[var(--paper)]/90 px-3 py-1.5 text-[11.5px] shadow-[var(--shadow-soft)]"
              >
                <span className="font-mono text-[10px] text-[var(--oker-deep)]">{i + 1}</span>
                <span>
                  <span className="font-display text-[var(--ink)]">{stap.label}</span>{' '}
                  <span className="text-[var(--ink-dim)]">· {stap.body}</span>
                </span>
              </li>
            ))}
          </motion.ol>
        )}
      </AnimatePresence>
    </div>
  );
}
