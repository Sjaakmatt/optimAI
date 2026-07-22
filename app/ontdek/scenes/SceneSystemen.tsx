'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Database, Receipt, Warehouse, MessagesSquare } from 'lucide-react';
import { SYSTEMEN, type SceneProps } from '../film-content';
import { beatReveal } from '../film-motion';

/**
 * Halte 4. De agent als stille kracht midden tussen de systemen die er
 * al zijn. Pulsen reizen over de lijnen: hij haalt en brengt.
 */

const W = 440;
const H = 240;
const CX = W / 2;
const CY = H / 2;

// posities van de vier systeemkaartjes in het assenstelsel van de SVG
const NODES = [
  { x: 78, y: 46 },
  { x: 362, y: 46 },
  { x: 78, y: 194 },
  { x: 362, y: 194 },
];

const ICONS = [Database, Receipt, Warehouse, MessagesSquare];

export function SceneSystemen({ beat, reduced }: SceneProps) {
  // Na de opbouw blijven pulsen rustig rondgaan
  const [pulseIndex, setPulseIndex] = useState(0);
  const allVisible = reduced || beat >= SYSTEMEN.length;

  useEffect(() => {
    if (reduced || !allVisible) return;
    const t = setInterval(() => setPulseIndex((p) => (p + 1) % SYSTEMEN.length), 1400);
    return () => clearInterval(t);
  }, [reduced, allVisible]);

  return (
    <div className="mx-auto w-full max-w-[560px]">
      <div className="relative" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden focusable="false">
          {NODES.map((node, i) => {
            const visible = reduced || beat >= i + 1;
            const pulsing = !reduced && allVisible && pulseIndex === i;
            return (
              <g key={i}>
                <line
                  x1={CX}
                  y1={CY}
                  x2={node.x}
                  y2={node.y}
                  stroke={visible ? 'var(--oker)' : 'var(--paper-edge)'}
                  strokeWidth={visible ? 1.2 : 1}
                  strokeDasharray="1 5"
                  strokeLinecap="round"
                  style={{ transition: 'stroke 500ms ease' }}
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={2.5}
                  fill={visible ? 'var(--oker)' : 'var(--paper-edge)'}
                  style={{ transition: 'fill 500ms ease' }}
                />
                {/* elk systeem hangt aan een adapter */}
                <text
                  x={(CX + node.x) / 2}
                  y={(CY + node.y) / 2 - 5}
                  textAnchor="middle"
                  fontSize="7.5"
                  letterSpacing="1"
                  fill="var(--ink-faint)"
                  fontFamily="var(--font-plex-mono), monospace"
                  style={{ opacity: visible ? 0.9 : 0, transition: 'opacity 500ms ease' }}
                >
                  ADAPTER
                </text>
                {pulsing && (
                  <motion.circle
                    r={3.2}
                    fill="var(--oker)"
                    initial={{ cx: CX, cy: CY, opacity: 0.9 }}
                    animate={{ cx: node.x, cy: node.y, opacity: [0.9, 0.9, 0] }}
                    transition={{ duration: 1.15, ease: 'easeInOut' }}
                  />
                )}
              </g>
            );
          })}
          {/* zachte gloed onder de agent-node */}
          <circle cx={CX} cy={CY} r={30} fill="var(--oker)" opacity={0.07} />
        </svg>

        {/* Agent in het midden */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: '50%', top: '50%' }}
        >
          <div className="rounded-[3px] border border-[var(--oker)] bg-[var(--paper)] px-4 py-2.5 text-center shadow-[var(--shadow-soft)]">
            <div className="font-display text-[15px] leading-none text-[var(--ink)]">Uw agent</div>
            <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--oker-deep)]">
              haalt en brengt
            </div>
          </div>
        </div>

        {/* Systeemkaartjes */}
        {SYSTEMEN.map((sys, i) => {
          const Icon = ICONS[i];
          return (
            <motion.div
              key={sys.label}
              {...beatReveal(reduced || beat >= i + 1, reduced)}
              className="absolute w-[118px] sm:w-[132px] -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${(NODES[i].x / W) * 100}%`,
                top: `${(NODES[i].y / H) * 100}%`,
              }}
            >
              <div className="rounded-[3px] border border-[var(--paper-edge)] bg-[var(--paper-warm)] px-3 py-2 text-center">
                <Icon size={14} strokeWidth={1.5} className="mx-auto text-[var(--ink-dim)]" aria-hidden />
                <div className="mt-1 font-display text-[13px] leading-none text-[var(--ink)]">
                  {sys.label}
                </div>
                <div className="mt-0.5 text-[10.5px] leading-tight text-[var(--ink-dim)]">
                  {sys.detail}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
