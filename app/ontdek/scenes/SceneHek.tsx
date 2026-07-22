'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Check, UserRound } from 'lucide-react';
import { Toneel } from '../wereld/Toneel';
import { HekMetPoort, Huisje, Figuur, Den, Boom, Struik, PAD_Y } from '../wereld/wereld';
import type { SceneProps } from '../film-content';

/**
 * Halte 5. Een echt hek dwars over het pad. Gaat alles volgens de
 * afspraken, dan staat de poort open. Twijfelt de agent, dan gaat de
 * poort dicht en loopt het werk het zijpad af, naar een mens.
 */

const HEK_X = 470;
const HUIS_X = 790;
const HUIS_Y = PAD_Y - 26;

export function SceneHek({ beat, reduced, actief, interacted, onInteract }: SceneProps) {
  const twijfel = interacted;

  return (
    <div className="absolute inset-0">
      <Toneel stop={4} reduced={reduced}>
        {/* zijpad naar het huis van de mens */}
        <path
          d={`M${HEK_X - 40} ${PAD_Y - 2} C ${HEK_X + 20} ${PAD_Y + 34}, ${HUIS_X - 160} ${PAD_Y + 42}, ${HUIS_X - 30} ${PAD_Y + 20}`}
          fill="none"
          stroke={twijfel ? 'var(--terra)' : 'var(--paper-edge)'}
          strokeWidth={twijfel ? 1.5 : 1.1}
          strokeDasharray="2 7"
          strokeLinecap="round"
          style={{ transition: 'stroke 500ms ease' }}
        />
        <HekMetPoort x={HEK_X} dicht={twijfel} />
        <Huisje x={HUIS_X} y={HUIS_Y} w={86} h={50} lampAan={twijfel} />
        <Figuur x={HUIS_X - 58} y={PAD_Y + 22} pose="staand" s={1.05} />
        <Den x={150} y={PAD_Y - 4} s={1.2} />
        <Boom x={935} y={PAD_Y - 40} s={0.8} />
        <Struik x={620} y={PAD_Y + 8} />
        {/* het werk onderweg */}
        {!reduced && actief && !twijfel && (
          <motion.circle
            r={3.4}
            cy={PAD_Y - 6}
            fill="var(--oker)"
            initial={{ cx: 110, opacity: 0 }}
            animate={{ cx: [110, HEK_X - 10, 900], opacity: [0, 0.9, 0] }}
            transition={{ duration: 2.6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.7 }}
          />
        )}
        {!reduced && actief && twijfel && (
          <motion.circle
            r={3.4}
            fill="var(--terra)"
            initial={{ cx: 110, cy: PAD_Y - 6, opacity: 0 }}
            animate={{
              cx: [110, HEK_X - 44, HEK_X + 60, HUIS_X - 40],
              cy: [PAD_Y - 6, PAD_Y - 4, PAD_Y + 34, PAD_Y + 16],
              opacity: [0, 0.9, 0.9, 0],
            }}
            transition={{ duration: 2.8, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.7 }}
          />
        )}
      </Toneel>

      {/* bordjes */}
      <div className="absolute right-[3%] top-[16%] flex items-center gap-1.5 rounded-full border border-[var(--paper-edge)] bg-[var(--paper)]/95 px-2.5 py-1 shadow-[var(--shadow-soft)]">
        <Check size={11} strokeWidth={2.2} className={twijfel ? 'text-[var(--ink-faint)]' : 'text-[var(--mos)]'} aria-hidden />
        <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--ink-dim)]">
          Afgehandeld
        </span>
      </div>
      <div
        className="absolute flex items-center gap-1.5 rounded-full border bg-[var(--paper)]/95 px-2.5 py-1 shadow-[var(--shadow-soft)] transition-colors duration-500"
        style={{
          left: `${(HUIS_X / 1000) * 100}%`,
          top: `${((HUIS_Y - 108) / 520) * 100}%`,
          transform: 'translateX(-50%)',
          borderColor: twijfel ? 'var(--terra)' : 'var(--paper-edge)',
        }}
      >
        <UserRound size={11} strokeWidth={1.8} className="shrink-0 text-[var(--ink-dim)]" aria-hidden />
        <span className="whitespace-nowrap font-display text-[11.5px] text-[var(--ink)]">U beslist</span>
        <AnimatePresence>
          {twijfel && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-[var(--terra)]"
            >
              · ter beoordeling
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* de interactie */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={reduced || beat >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        className="absolute bottom-[3%] left-1/2 -translate-x-1/2"
      >
        <button
          type="button"
          onClick={onInteract}
          aria-pressed={twijfel}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--paper-edge)] bg-[var(--paper)] px-4 py-2 text-[12.5px] text-[var(--ink)] shadow-[var(--shadow-soft)] transition-colors hover:border-[var(--oker)] hover:bg-[var(--paper-warm)]"
        >
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full transition-colors duration-300"
            style={{ background: twijfel ? 'var(--terra)' : 'var(--oker)' }}
          />
          {twijfel ? 'De poort is dicht: het werk gaat naar u' : 'Stel: de agent twijfelt'}
        </button>
      </motion.div>
    </div>
  );
}
