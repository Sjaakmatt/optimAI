'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * De getekende wereld van agent-land. Elke scène is een venster van
 * 1000 × 520 wereld-eenheden met dezelfde horizon (GROND_Y) en hetzelfde
 * pad (PAD_Y), zodat het landschap doorloopt terwijl de camera van halte
 * naar halte schuift. Stijl: hairlines in inkt, vlakken in papiertinten,
 * accenten in oker, mos en terra. Alle SVG is decoratief (aria-hidden);
 * betekenisdragende tekst staat als HTML-overlay in de scènes.
 */

export const VB_W = 1000;
export const VB_H = 520;
export const GROND_Y = 430;
export const PAD_Y = 458;

/* ------------------------------------------------------------------ */
/* Lucht en land                                                       */
/* ------------------------------------------------------------------ */

/** De zon zakt gedurende de wandeling: stop 0 = ochtend, stop 6 = avond. */
export function Zon({ stop }: { stop: number }) {
  const t = stop / 6;
  const x = 830 - t * 660;
  const y = 78 + t * 66;
  const avond = t > 0.6;
  const kleur = avond ? 'var(--terra)' : 'var(--oker)';
  return (
    <g>
      <circle cx={x} cy={y} r={46} fill={kleur} opacity={0.1} />
      <circle cx={x} cy={y} r={26} fill={kleur} opacity={0.16} />
      <circle cx={x} cy={y} r={17} fill="none" stroke={kleur} strokeWidth={1.3} opacity={0.85} />
      {!avond &&
        [0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1={x + Math.cos(rad) * 23}
              y1={y + Math.sin(rad) * 23}
              x2={x + Math.cos(rad) * 29}
              y2={y + Math.sin(rad) * 29}
              stroke={kleur}
              strokeWidth={1.2}
              strokeLinecap="round"
              opacity={0.7}
            />
          );
        })}
    </g>
  );
}

export function Wolk({
  x,
  y,
  s = 1,
  drift = false,
}: {
  x: number;
  y: number;
  s?: number;
  drift?: boolean;
}) {
  const inhoud = (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={0.75}>
      <path
        d="M0 14 C -2 4, 10 -2, 18 3 C 22 -6, 38 -6, 42 3 C 52 -1, 60 6, 57 14 Z"
        fill="var(--paper)"
        stroke="var(--ink-faint)"
        strokeWidth={1.1}
        strokeLinejoin="round"
      />
    </g>
  );
  if (!drift) return inhoud;
  return (
    <motion.g
      animate={{ x: [0, 14, 0] }}
      transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
    >
      {inhoud}
    </motion.g>
  );
}

export function Vogels({ x, y }: { x: number; y: number }) {
  return (
    <g stroke="var(--ink-faint)" strokeWidth={1.1} fill="none" strokeLinecap="round" opacity={0.8}>
      <path d={`M${x} ${y} q 5 -6 10 0 q 5 -6 10 0`} />
      <path d={`M${x + 34} ${y - 14} q 4 -5 8 0 q 4 -5 8 0`} />
    </g>
  );
}

/** Heuvels, grond en het doorlopende wandelpad. */
export function Land({ children }: { children?: ReactNode }) {
  return (
    <g>
      {/* verre heuvels */}
      <path
        d={`M0 ${GROND_Y - 68} C 180 ${GROND_Y - 128}, 340 ${GROND_Y - 60}, 520 ${GROND_Y - 96} C 700 ${GROND_Y - 132}, 860 ${GROND_Y - 70}, 1000 ${GROND_Y - 92} L 1000 ${VB_H} L 0 ${VB_H} Z`}
        fill="var(--paper-deep)"
        opacity={0.45}
      />
      {/* dichte heuvels */}
      <path
        d={`M0 ${GROND_Y - 26} C 200 ${GROND_Y - 74}, 420 ${GROND_Y - 12}, 640 ${GROND_Y - 46} C 820 ${GROND_Y - 72}, 920 ${GROND_Y - 26}, 1000 ${GROND_Y - 40} L 1000 ${VB_H} L 0 ${VB_H} Z`}
        fill="var(--paper-warm)"
      />
      {/* grondvlak */}
      <path
        d={`M0 ${GROND_Y} C 250 ${GROND_Y - 14}, 700 ${GROND_Y + 10}, 1000 ${GROND_Y - 6} L 1000 ${VB_H} L 0 ${VB_H} Z`}
        fill="var(--paper-deep)"
        opacity={0.55}
      />
      <path
        d={`M0 ${GROND_Y} C 250 ${GROND_Y - 14}, 700 ${GROND_Y + 10}, 1000 ${GROND_Y - 6}`}
        fill="none"
        stroke="var(--ink-faint)"
        strokeWidth={1}
        opacity={0.5}
      />
      {/* het pad */}
      <path
        d={`M0 ${PAD_Y} C 200 ${PAD_Y - 12}, 380 ${PAD_Y + 12}, 560 ${PAD_Y - 4} C 740 ${PAD_Y - 16}, 880 ${PAD_Y + 8}, 1000 ${PAD_Y - 2}`}
        fill="none"
        stroke="var(--oker)"
        strokeWidth={1.5}
        strokeDasharray="3 8"
        strokeLinecap="round"
        opacity={0.9}
      />
      {children}
    </g>
  );
}

/** Haltepaal met wimpel en nummer. */
export function HaltePaal({ x, nummer }: { x: number; nummer: number }) {
  const y = PAD_Y - 4;
  return (
    <g aria-hidden>
      <line x1={x} y1={y} x2={x} y2={y - 52} stroke="var(--ink-dim)" strokeWidth={1.4} strokeLinecap="round" />
      <path d={`M${x} ${y - 52} L ${x + 26} ${y - 45} L ${x} ${y - 38} Z`} fill="var(--terra)" opacity={0.85} />
      <circle cx={x} cy={y} r={3} fill="var(--oker)" />
      <text
        x={x + 12}
        y={y - 41}
        fontSize="9"
        fill="var(--paper)"
        fontFamily="var(--font-plex-mono), monospace"
        textAnchor="middle"
      >
        {nummer}
      </text>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Flora                                                               */
/* ------------------------------------------------------------------ */

export function Boom({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 C -1 -12, 1 -22, 0 -34" fill="none" stroke="var(--ink-dim)" strokeWidth={1.6} strokeLinecap="round" />
      <path d="M0 -16 C -6 -20, -9 -25, -11 -30 M0 -22 C 5 -26, 8 -30, 9 -34" fill="none" stroke="var(--ink-dim)" strokeWidth={1.1} strokeLinecap="round" />
      <path
        d="M-16 -34 C -24 -48, -12 -62, 0 -58 C 4 -70, 22 -66, 22 -52 C 32 -46, 24 -32, 12 -34 C 6 -26, -10 -26, -16 -34 Z"
        fill="var(--mos)"
        opacity={0.22}
        stroke="var(--mos)"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
    </g>
  );
}

export function Den({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke="var(--mos)" strokeWidth={1.2} strokeLinejoin="round">
      <line x1={0} y1={0} x2={0} y2={-8} stroke="var(--ink-dim)" strokeWidth={1.4} />
      <path d="M-11 -8 L 0 -26 L 11 -8 Z" fill="var(--mos)" opacity={0.18} />
      <path d="M-8 -20 L 0 -36 L 8 -20 Z" fill="var(--mos)" opacity={0.18} />
      <path d="M-5 -32 L 0 -44 L 5 -32 Z" fill="var(--mos)" opacity={0.18} />
    </g>
  );
}

export function Struik({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M-10 0 C -14 -8, -6 -14, 0 -11 C 5 -16, 14 -10, 11 -3 C 13 0, 10 1, 8 0 Z"
      fill="var(--mos)"
      opacity={0.18}
      stroke="var(--mos)"
      strokeWidth={1.1}
      strokeLinejoin="round"
    />
  );
}

export function Bloemen({ x, y }: { x: number; y: number }) {
  return (
    <g aria-hidden>
      {[0, 14, 26].map((dx, i) => (
        <g key={i} transform={`translate(${x + dx} ${y - (i % 2) * 4})`}>
          <line x1={0} y1={0} x2={0} y2={-7} stroke="var(--mos)" strokeWidth={1} />
          <circle cx={0} cy={-9} r={2.2} fill={i === 1 ? 'var(--terra)' : 'var(--oker)'} opacity={0.8} />
        </g>
      ))}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Bouwwerken                                                          */
/* ------------------------------------------------------------------ */

export function Huisje({
  x,
  y,
  w = 74,
  h = 46,
  lampAan = false,
  schoorsteen = false,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  lampAan?: boolean;
  schoorsteen?: boolean;
}) {
  const dak = 30;
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* romp */}
      <rect x={-w / 2} y={-h} width={w} height={h} fill="var(--paper)" stroke="var(--ink-dim)" strokeWidth={1.3} />
      {/* dak */}
      <path
        d={`M${-w / 2 - 7} ${-h} L 0 ${-h - dak} L ${w / 2 + 7} ${-h} Z`}
        fill="var(--terra)"
        opacity={0.3}
        stroke="var(--ink-dim)"
        strokeWidth={1.3}
        strokeLinejoin="round"
      />
      {schoorsteen && (
        <g>
          <rect x={w / 4} y={-h - dak + 4} width={8} height={14} fill="var(--paper)" stroke="var(--ink-dim)" strokeWidth={1.1} />
          <path
            d={`M${w / 4 + 4} ${-h - dak - 2} c 2 -5 -2 -8 1 -13`}
            fill="none"
            stroke="var(--ink-faint)"
            strokeWidth={1}
            strokeLinecap="round"
            opacity={0.7}
          />
        </g>
      )}
      {/* deur */}
      <rect x={-w / 2 + 9} y={-24} width={13} height={24} fill="var(--paper-deep)" stroke="var(--ink-dim)" strokeWidth={1.1} />
      <circle cx={-w / 2 + 19} cy={-12} r={1} fill="var(--ink-dim)" />
      {/* raam */}
      <rect
        x={6}
        y={-h + 12}
        width={16}
        height={13}
        fill={lampAan ? 'var(--oker)' : 'var(--paper-warm)'}
        opacity={lampAan ? 0.55 : 1}
        stroke="var(--ink-dim)"
        strokeWidth={1.1}
        style={{ transition: 'fill 600ms ease, opacity 600ms ease' }}
      />
      <line x1={14} y1={-h + 12} x2={14} y2={-h + 25} stroke="var(--ink-dim)" strokeWidth={0.9} />
    </g>
  );
}

export function Brievenbus({ x, y, vlagOmhoog }: { x: number; y: number; vlagOmhoog: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <line x1={0} y1={0} x2={0} y2={-30} stroke="var(--ink-dim)" strokeWidth={1.6} strokeLinecap="round" />
      <rect x={-16} y={-48} width={32} height={18} rx={7} fill="var(--paper)" stroke="var(--ink-dim)" strokeWidth={1.4} />
      <line x1={-16} y1={-39} x2={-6} y2={-39} stroke="var(--ink-dim)" strokeWidth={1.1} />
      {/* vlaggetje */}
      <motion.g
        style={{ originX: '18px', originY: '-40px' }}
        animate={{ rotate: vlagOmhoog ? -90 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
      >
        <line x1={18} y1={-40} x2={28} y2={-40} stroke="var(--terra)" strokeWidth={1.6} strokeLinecap="round" />
        <path d="M28 -40 L 34 -37 L 28 -34 Z" fill="var(--terra)" transform="translate(0 -3)" />
      </motion.g>
    </g>
  );
}

export function Bankje({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="var(--ink-dim)" strokeWidth={1.4} strokeLinecap="round">
      <line x1={-24} y1={0} x2={-24} y2={-14} />
      <line x1={24} y1={0} x2={24} y2={-14} />
      <line x1={-30} y1={-14} x2={30} y2={-14} />
      <line x1={-30} y1={-17} x2={30} y2={-17} strokeWidth={2.4} />
      <line x1={-26} y1={-17} x2={-26} y2={-30} />
      <line x1={26} y1={-17} x2={26} y2={-30} />
      <line x1={-28} y1={-30} x2={28} y2={-30} strokeWidth={1.8} />
    </g>
  );
}

export function Lantaarn({ x, y, aan }: { x: number; y: number; aan: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <line x1={0} y1={0} x2={0} y2={-54} stroke="var(--ink-dim)" strokeWidth={1.5} strokeLinecap="round" />
      <path d="M0 -54 C 0 -62, 8 -62, 10 -58" fill="none" stroke="var(--ink-dim)" strokeWidth={1.3} strokeLinecap="round" />
      <rect x={7} y={-58} width={7} height={9} rx={1.5} fill={aan ? 'var(--oker)' : 'var(--paper)'} opacity={aan ? 0.85 : 1} stroke="var(--ink-dim)" strokeWidth={1.1} style={{ transition: 'fill 600ms ease' }} />
      {aan && <circle cx={10.5} cy={-53} r={10} fill="var(--oker)" opacity={0.14} />}
    </g>
  );
}

/** Hek met poort dwars over het pad. De poort kan dicht (twijfel). */
export function HekMetPoort({ x, dicht }: { x: number; dicht: boolean }) {
  const y = PAD_Y + 2;
  return (
    <g transform={`translate(${x} ${y})`}>
      {[-58, -34, 34, 58].map((dx) => (
        <line key={dx} x1={dx} y1={4} x2={dx} y2={-30} stroke="var(--ink-dim)" strokeWidth={1.6} strokeLinecap="round" />
      ))}
      <line x1={-62} y1={-24} x2={-30} y2={-24} stroke="var(--ink-dim)" strokeWidth={1.2} />
      <line x1={-62} y1={-12} x2={-30} y2={-12} stroke="var(--ink-dim)" strokeWidth={1.2} />
      <line x1={30} y1={-24} x2={62} y2={-24} stroke="var(--ink-dim)" strokeWidth={1.2} />
      <line x1={30} y1={-12} x2={62} y2={-12} stroke="var(--ink-dim)" strokeWidth={1.2} />
      {/* poortdeur, scharniert op de linkerpost */}
      <motion.g
        style={{ originX: '-30px', originY: '0px' }}
        animate={{ rotate: dicht ? 0 : -64 }}
        transition={{ type: 'spring', stiffness: 120, damping: 15 }}
      >
        <line x1={-30} y1={-28} x2={30} y2={-28} stroke="var(--terra)" strokeWidth={1.6} />
        <line x1={-30} y1={-8} x2={30} y2={-8} stroke="var(--terra)" strokeWidth={1.6} />
        <line x1={-30} y1={-28} x2={30} y2={-8} stroke="var(--terra)" strokeWidth={1.2} opacity={0.8} />
        <line x1={-26} y1={-30} x2={-26} y2={-5} stroke="var(--terra)" strokeWidth={1.6} />
        <line x1={26} y1={-30} x2={26} y2={-5} stroke="var(--terra)" strokeWidth={1.6} />
      </motion.g>
    </g>
  );
}

export function Waslijn({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g>
      <line x1={x1} y1={PAD_Y - 2} x2={x1} y2={y} stroke="var(--ink-dim)" strokeWidth={1.6} strokeLinecap="round" />
      <line x1={x2} y1={PAD_Y - 2} x2={x2} y2={y} stroke="var(--ink-dim)" strokeWidth={1.6} strokeLinecap="round" />
      <path d={`M${x1} ${y} C ${(x1 + x2) / 2 - 40} ${y + 26}, ${(x1 + x2) / 2 + 40} ${y + 26}, ${x2} ${y}`} fill="none" stroke="var(--ink-dim)" strokeWidth={1.2} />
    </g>
  );
}

export function Podium({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-26} y={-10} width={52} height={10} fill="var(--paper)" stroke="var(--ink-dim)" strokeWidth={1.3} />
      <line x1={-26} y1={-10} x2={26} y2={-10} stroke="var(--oker)" strokeWidth={1.4} />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Figuren                                                             */
/* ------------------------------------------------------------------ */

export type FiguurPose = 'staand' | 'zittend' | 'dirigent' | 'lantaarn';

export function Figuur({
  x,
  y,
  s = 1,
  pose = 'staand',
  kleur = 'var(--ink-dim)',
  flip = false,
}: {
  x: number;
  y: number;
  s?: number;
  pose?: FiguurPose;
  kleur?: string;
  flip?: boolean;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}
      stroke={kleur}
      strokeWidth={1.5}
      strokeLinecap="round"
      fill="none"
    >
      {pose === 'zittend' ? (
        <g>
          <circle cx={0} cy={-34} r={5} />
          <path d="M0 -29 C 0 -24, 0 -20, -1 -17" />
          <path d="M-1 -17 L 8 -17 L 8 -8 M-1 -17 L -2 -8" />
          <path d="M0 -26 C 5 -24, 8 -22, 10 -19" />
        </g>
      ) : pose === 'dirigent' ? (
        <g>
          <circle cx={0} cy={-40} r={5} />
          <path d="M0 -35 L 0 -18" />
          <path d="M0 -18 L -5 -6 M0 -18 L 5 -6" />
          <path d="M0 -30 L -8 -36" />
          <path d="M0 -30 L 9 -40 L 14 -44" />
        </g>
      ) : pose === 'lantaarn' ? (
        <g>
          <circle cx={0} cy={-40} r={5} />
          <path d="M0 -35 L 0 -18" />
          <path d="M0 -18 L -5 -6 M0 -18 L 5 -6" />
          <path d="M0 -30 L -7 -24" />
          <path d="M0 -30 L 8 -26 L 8 -21" />
          <rect x={5.5} y={-21} width={5} height={7} rx={1} stroke={kleur} strokeWidth={1.1} fill="var(--oker)" opacity={0.7} />
        </g>
      ) : (
        <g>
          <circle cx={0} cy={-40} r={5} />
          <path d="M0 -35 L 0 -18" />
          <path d="M0 -18 L -5 -6 M0 -18 L 5 -6" />
          <path d="M0 -30 L -7 -23 M0 -30 L 7 -23" />
        </g>
      )}
    </g>
  );
}

/** Envelopje dat door de lucht kan vliegen. */
export function Envelopje({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <rect x={-13} y={-9} width={26} height={18} rx={1.5} fill="var(--paper)" stroke="var(--ink-dim)" strokeWidth={1.3} />
      <path d="M-13 -8 L 0 2 L 13 -8" fill="none" stroke="var(--ink-dim)" strokeWidth={1.2} />
      <circle cx={0} cy={2} r={2.4} fill="var(--oker)" />
    </g>
  );
}
