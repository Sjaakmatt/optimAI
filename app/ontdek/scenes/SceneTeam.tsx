'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { TEAM_AGENTS, type SceneProps } from '../film-content';
import { beatReveal } from '../film-motion';

/**
 * Stap 6. De keten: een coordinator en een klein team van agents, elk met
 * een eigen rol. Zelfde beeldtaal als het organogram in de Werkbank,
 * maar dan zelfstandig en zonder store.
 */

const W = 440;
const H = 205;
const DIRIGENT_Y = 42;
const BUS_Y = 112;
const CHIP_Y = 168;

function chipX(i: number): number {
  const margin = 68;
  const step = (W - margin * 2) / (TEAM_AGENTS.length - 1);
  return margin + i * step;
}

export function SceneTeam({ beat, reduced }: SceneProps) {
  const [pulseIndex, setPulseIndex] = useState(0);
  const running = reduced || beat >= 2;

  useEffect(() => {
    if (reduced || !running) return;
    const t = setInterval(() => setPulseIndex((p) => (p + 1) % TEAM_AGENTS.length), 1100);
    return () => clearInterval(t);
  }, [reduced, running]);

  return (
    <div className="mx-auto w-full max-w-[560px]">
      <div className="relative" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden focusable="false">
          {/* coordinator naar bus */}
          <line
            x1={W / 2} y1={DIRIGENT_Y + 22} x2={W / 2} y2={BUS_Y}
            stroke="var(--oker)" strokeWidth={1.1}
          />
          {/* bus */}
          <line
            x1={chipX(0)} y1={BUS_Y} x2={chipX(TEAM_AGENTS.length - 1)} y2={BUS_Y}
            stroke="var(--paper-edge)" strokeWidth={1.1}
          />
          <circle cx={W / 2} cy={BUS_Y} r={2.5} fill="var(--oker)" />
          {/* stubs */}
          {TEAM_AGENTS.map((_, i) => {
            const x = chipX(i);
            const visible = reduced || beat >= 1;
            return (
              <g key={i}>
                <line
                  x1={x} y1={BUS_Y} x2={x} y2={CHIP_Y - 16}
                  stroke={visible ? 'var(--oker)' : 'var(--paper-edge)'}
                  strokeWidth={1}
                  style={{ transition: 'stroke 500ms ease' }}
                />
                <circle cx={x} cy={BUS_Y} r={2} fill={visible ? 'var(--oker)' : 'var(--paper-edge)'} />
                {!reduced && running && pulseIndex === i && (
                  <motion.circle
                    cx={x}
                    r={3}
                    fill="var(--oker)"
                    initial={{ cy: BUS_Y, opacity: 0.9 }}
                    animate={{ cy: CHIP_Y - 16, opacity: [0.9, 0.9, 0] }}
                    transition={{ duration: 0.85, ease: 'easeInOut' }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Coordinator */}
        <motion.div
          {...beatReveal(true, reduced)}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: '50%', top: `${(DIRIGENT_Y / H) * 100}%` }}
        >
          <div className="rounded-[3px] border border-[var(--oker)] bg-[var(--paper)] px-5 py-2.5 text-center shadow-[var(--shadow-soft)]">
            <div className="font-display text-[15px] leading-none text-[var(--ink)]">Coördinator</div>
            <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--oker-deep)]">
              verdeelt en bewaakt
            </div>
          </div>
        </motion.div>

        {/* Team-chips */}
        {TEAM_AGENTS.map((name, i) => (
          <motion.div
            key={name}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={
              reduced || beat >= 1
                ? { opacity: 1, y: 0, transition: { delay: reduced ? 0 : i * 0.12, duration: 0.4 } }
                : { opacity: 0, y: 12 }
            }
            className="absolute -translate-x-1/2"
            style={{ left: `${(chipX(i) / W) * 100}%`, top: `${((CHIP_Y - 14) / H) * 100}%` }}
          >
            <div className="rounded-[3px] border border-[var(--paper-edge)] bg-[var(--paper-warm)] px-3 py-1.5 text-center">
              <div className="font-display text-[12.5px] leading-none text-[var(--ink)] whitespace-nowrap">
                {name}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        {...beatReveal(reduced || beat >= 2, reduced)}
        className="mx-auto mt-1 max-w-[400px] text-center text-[12.5px] leading-relaxed text-[var(--ink-dim)]"
      >
        Een grote order loopt automatisch door verkoop, uitvoering, planning en facturatie; alleen
        een afwijking of uitzondering komt nog bij een mens.
      </motion.p>
    </div>
  );
}
