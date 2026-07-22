'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Check, UserRound } from 'lucide-react';
import type { SceneProps } from '../film-content';
import { beatReveal } from '../film-motion';

/**
 * Halte 5. Het hek: de gewone route loopt door, maar bij twijfel buigt
 * het werk af naar een mens. De bezoeker mag zelf aan het hek voelen.
 */

const W = 440;
const H = 210;
const MAIN_Y = 64;
const BRANCH_X = 205;

export function SceneHek({ beat, reduced, interacted, onInteract }: SceneProps) {
  const doubted = interacted;

  return (
    <div className="mx-auto w-full max-w-[560px]">
      <div className="relative" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden focusable="false">
          {/* hoofdroute */}
          <line
            x1={30} y1={MAIN_Y} x2={410} y2={MAIN_Y}
            stroke={doubted ? 'var(--paper-edge)' : 'var(--oker)'}
            strokeWidth={1.2}
            strokeDasharray="1 5"
            strokeLinecap="round"
            style={{ transition: 'stroke 500ms ease' }}
          />
          {/* hekje op het splitsingspunt */}
          <g stroke="var(--ink-dim)" strokeWidth={1.1} strokeLinecap="round">
            <line x1={BRANCH_X - 9} y1={MAIN_Y - 13} x2={BRANCH_X - 9} y2={MAIN_Y + 13} />
            <line x1={BRANCH_X + 9} y1={MAIN_Y - 13} x2={BRANCH_X + 9} y2={MAIN_Y + 13} />
            <line x1={BRANCH_X - 13} y1={MAIN_Y - 7} x2={BRANCH_X + 13} y2={MAIN_Y - 7} />
            <line x1={BRANCH_X - 13} y1={MAIN_Y + 4} x2={BRANCH_X + 13} y2={MAIN_Y + 4} />
          </g>
          {/* zijpad naar de mens */}
          <path
            d={`M${BRANCH_X} ${MAIN_Y} C ${BRANCH_X + 18} ${MAIN_Y + 52}, ${BRANCH_X + 44} ${H - 58}, ${BRANCH_X + 96} ${H - 48}`}
            fill="none"
            stroke={doubted ? 'var(--terra)' : 'var(--paper-edge)'}
            strokeWidth={doubted ? 1.4 : 1}
            strokeDasharray="1 5"
            strokeLinecap="round"
            style={{ transition: 'stroke 500ms ease, stroke-width 500ms ease' }}
          />
          {/* knopen */}
          <circle cx={30} cy={MAIN_Y} r={2.5} fill="var(--oker)" />
          <circle cx={410} cy={MAIN_Y} r={2.5} fill={doubted ? 'var(--paper-edge)' : 'var(--oker)'} style={{ transition: 'fill 500ms ease' }} />
          <circle cx={BRANCH_X} cy={MAIN_Y} r={2.5} fill="var(--ink-dim)" />
          {/* reizende puls */}
          {!reduced && !doubted && (
            <motion.circle
              r={3.2}
              cy={MAIN_Y}
              fill="var(--oker)"
              initial={{ cx: 30, opacity: 0.9 }}
              animate={{ cx: 410, opacity: [0.9, 0.9, 0] }}
              transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.8 }}
            />
          )}
          {!reduced && doubted && (
            <motion.circle
              r={3.2}
              fill="var(--terra)"
              initial={{ cx: 30, cy: MAIN_Y, opacity: 0.9 }}
              animate={{
                cx: [30, BRANCH_X, BRANCH_X + 44, BRANCH_X + 96],
                cy: [MAIN_Y, MAIN_Y, H - 62, H - 48],
                opacity: [0.9, 0.9, 0.9, 0],
              }}
              transition={{ duration: 2.6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.8 }}
            />
          )}
        </svg>

        {/* labels als HTML-overlays */}
        <Overlay x={30} y={MAIN_Y - 24}>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink-dim)]">
            Nieuw werk
          </span>
        </Overlay>
        <Overlay x={410} y={MAIN_Y - 24} align="right">
          <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--mos)]">
            <Check size={11} strokeWidth={2} aria-hidden /> Afgehandeld
          </span>
        </Overlay>

        {/* het mens-kaartje */}
        <div
          className="absolute -translate-y-1/2"
          style={{ left: `${((BRANCH_X + 110) / W) * 100}%`, top: `${((H - 48) / H) * 100}%` }}
        >
          <div
            className="rounded-[3px] border bg-[var(--paper)] px-3.5 py-2 shadow-[var(--shadow-soft)] transition-colors duration-500"
            style={{ borderColor: doubted ? 'var(--terra)' : 'var(--paper-edge)' }}
          >
            <div className="flex items-center gap-2">
              <UserRound size={15} strokeWidth={1.5} className="text-[var(--ink-dim)]" aria-hidden />
              <div>
                <div className="font-display text-[14px] leading-none text-[var(--ink)]">U beslist</div>
                <AnimatePresence>
                  {doubted && (
                    <motion.div
                      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--terra)]"
                    >
                      Ter beoordeling
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* de interactie */}
      <div className="mt-2 flex flex-col items-center gap-2">
        <motion.div {...beatReveal(beat >= 1, reduced)}>
          <button
            type="button"
            onClick={onInteract}
            aria-pressed={doubted}
            className="inline-flex items-center gap-2 rounded-[2px] border border-[var(--paper-edge)] bg-[var(--paper-warm)] px-4 py-2 text-[13px] text-[var(--ink)] transition-colors hover:border-[var(--oker)] hover:bg-[var(--paper-deep)]"
          >
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full transition-colors duration-300"
              style={{ background: doubted ? 'var(--terra)' : 'var(--oker)' }}
            />
            {doubted ? 'De agent twijfelt: het werk gaat naar u' : 'Stel: de agent twijfelt'}
          </button>
        </motion.div>
        <AnimatePresence>
          {doubted && (
            <motion.p
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-[380px] text-center text-[12.5px] leading-relaxed text-[var(--ink-dim)]"
            >
              Afwijkende private-label-verpakking gevraagd. Dat valt buiten de afspraken, dus het
              komt netjes bij een mens terecht. Geen gok, geen halve waarheid.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Overlay({
  x,
  y,
  align,
  children,
}: {
  x: number;
  y: number;
  align?: 'right';
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute"
      style={{
        left: `${(x / W) * 100}%`,
        top: `${(y / H) * 100}%`,
        transform: align === 'right' ? 'translateX(-100%)' : undefined,
      }}
    >
      {children}
    </div>
  );
}
