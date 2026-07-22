'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Toneel } from '../wereld/Toneel';
import { Huisje, Figuur, Boom, Den, Struik, PAD_Y } from '../wereld/wereld';
import { SYSTEMEN, type SceneProps } from '../film-content';

/**
 * Halte 4. Een buurtschap van vier huisjes: mail, boekhouding, agenda,
 * CRM. De agent staat met zijn lantaarn op het kruispunt en loopt bij
 * iedereen langs; waar hij is geweest, brandt licht.
 */

const HUISJES = [
  { x: 200, y: PAD_Y - 46, w: 80 },
  { x: 430, y: PAD_Y - 78, w: 74 },
  { x: 660, y: PAD_Y - 60, w: 78 },
  { x: 866, y: PAD_Y - 30, w: 80 },
];
const AGENT_X = 545;
const AGENT_Y = PAD_Y + 6;

export function SceneSystemen({ beat, reduced, actief }: SceneProps) {
  const [pulseIndex, setPulseIndex] = useState(0);
  const klaar = reduced || beat >= SYSTEMEN.length;

  useEffect(() => {
    if (reduced || !klaar || !actief) return;
    const t = setInterval(() => setPulseIndex((p) => (p + 1) % SYSTEMEN.length), 1500);
    return () => clearInterval(t);
  }, [reduced, klaar, actief]);

  return (
    <div className="absolute inset-0">
      <Toneel stop={3} reduced={reduced}>
        {/* paadjes van de agent naar elk huisje */}
        {HUISJES.map((h, i) => (
          <path
            key={i}
            d={`M${AGENT_X} ${AGENT_Y - 10} Q ${(AGENT_X + h.x) / 2} ${(AGENT_Y + h.y) / 2 + 26} ${h.x} ${h.y + 6}`}
            fill="none"
            stroke={reduced || beat >= i + 1 ? 'var(--oker)' : 'var(--paper-edge)'}
            strokeWidth={1.1}
            strokeDasharray="2 6"
            strokeLinecap="round"
            style={{ transition: 'stroke 500ms ease' }}
          />
        ))}
        {HUISJES.map((h, i) => (
          <g key={i} style={{ opacity: reduced || beat >= i + 1 ? 1 : 0.35, transition: 'opacity 500ms ease' }}>
            <Huisje x={h.x} y={h.y + 46} w={h.w} lampAan={reduced || beat >= i + 1} schoorsteen={i === 1} />
          </g>
        ))}
        <Figuur x={AGENT_X} y={AGENT_Y} pose="lantaarn" s={1.15} />
        <Boom x={100} y={PAD_Y - 2} s={0.9} />
        <Den x={760} y={PAD_Y - 6} s={1.1} />
        <Struik x={320} y={PAD_Y + 4} />
        {/* de lopende puls: de agent doet zijn rondje */}
        {!reduced && klaar && actief && (
          <motion.circle
            key={pulseIndex}
            r={3.4}
            fill="var(--oker)"
            initial={{ cx: AGENT_X, cy: AGENT_Y - 12, opacity: 0 }}
            animate={{
              cx: [AGENT_X, (AGENT_X + HUISJES[pulseIndex].x) / 2, HUISJES[pulseIndex].x],
              cy: [AGENT_Y - 12, (AGENT_Y + HUISJES[pulseIndex].y) / 2 + 20, HUISJES[pulseIndex].y + 8],
              opacity: [0, 0.9, 0],
            }}
            transition={{ duration: 1.35, ease: 'easeInOut' }}
          />
        )}
      </Toneel>

      {/* naambordjes bij de huisjes */}
      {SYSTEMEN.map((sys, i) => {
        const h = HUISJES[i];
        const visible = reduced || beat >= i + 1;
        return (
          <motion.div
            key={sys.label}
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="absolute -translate-x-1/2 text-center"
            style={{
              left: `${(h.x / 1000) * 100}%`,
              top: `${((h.y - 58) / 520) * 100}%`,
            }}
          >
            <div className="rounded-full border border-[var(--paper-edge)] bg-[var(--paper)]/95 px-2.5 py-1 shadow-[var(--shadow-soft)]">
              <span className="font-display text-[11.5px] leading-none text-[var(--ink)]">{sys.label}</span>
              <span className="ml-1.5 hidden sm:inline text-[10px] text-[var(--ink-dim)]">{sys.detail}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
