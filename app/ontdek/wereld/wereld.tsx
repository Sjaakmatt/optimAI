'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { RLijn, RRect, RCirkel, REllips, RVeelhoek, RPad } from './rough';

/**
 * De getekende wereld van agent-land, in etsstijl: elke lijn is een
 * licht wiebelige inktlijn (rough.js), vullingen zijn arceringen.
 * Elke scène is een venster van 1000 × 520 wereld-eenheden met dezelfde
 * horizon (GROND_Y) en hetzelfde pad (PAD_Y), zodat het landschap
 * doorloopt terwijl de camera van halte naar halte schuift. Alle SVG is
 * decoratief (aria-hidden); betekenisdragende tekst leeft in HTML.
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
      <circle cx={x} cy={y} r={48} fill={kleur} opacity={0.09} />
      <circle cx={x} cy={y} r={27} fill={kleur} opacity={0.14} />
      <RCirkel cx={x} cy={y} r={17} stroke={kleur} strokeWidth={1.4} roughness={0.9} />
      <RCirkel
        cx={x}
        cy={y}
        r={12}
        stroke={kleur}
        strokeWidth={0.9}
        roughness={1.6}
        fill={kleur}
        fillStyle="hachure"
        hachureGap={3.5}
        fillWeight={0.5}
      />
      {!avond &&
        [20, 65, 110, 155, 200, 245, 290, 335].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <RLijn
              key={deg}
              x1={x + Math.cos(rad) * 24}
              y1={y + Math.sin(rad) * 24}
              x2={x + Math.cos(rad) * 31}
              y2={y + Math.sin(rad) * 31}
              stroke={kleur}
              strokeWidth={1.2}
            />
          );
        })}
    </g>
  );
}

export function Wolk({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={0.85}>
      <RPad
        d="M0 14 C -3 4, 10 -3, 18 3 C 22 -7, 38 -7, 42 3 C 53 -2, 61 6, 57 14 Z"
        seed={Math.round(x + y)}
        fill="var(--paper)"
        fillStyle="solid"
        stroke="var(--ink-faint)"
        strokeWidth={1.1}
        roughness={0.9}
      />
    </g>
  );
}

export function Vogels({ x, y }: { x: number; y: number }) {
  return (
    <g opacity={0.85}>
      <RPad d={`M${x} ${y} q 5 -7 10 0 q 5 -7 10 0`} stroke="var(--ink-faint)" strokeWidth={1.1} roughness={0.6} />
      <RPad d={`M${x + 36} ${y - 15} q 4 -6 8 0 q 4 -6 8 0`} stroke="var(--ink-faint)" strokeWidth={1} roughness={0.6} />
    </g>
  );
}

/** Heuvels, grond en het doorlopende wandelpad. */
export function Land({ children }: { children?: ReactNode }) {
  return (
    <g>
      {/* verre heuvels: glad vlak, ruwe kamlijn. Begin- en eindhoogte zijn
          gelijk zodat de cellen naadloos tegelen tijdens de camera-pan. */}
      <path
        d={`M0 ${GROND_Y - 80} C 180 ${GROND_Y - 128}, 340 ${GROND_Y - 60}, 520 ${GROND_Y - 96} C 700 ${GROND_Y - 132}, 860 ${GROND_Y - 56}, 1000 ${GROND_Y - 80} L 1000 ${VB_H} L 0 ${VB_H} Z`}
        fill="var(--paper-deep)"
        opacity={0.45}
      />
      <path
        d={`M0 ${GROND_Y - 40} C 200 ${GROND_Y - 74}, 420 ${GROND_Y - 12}, 640 ${GROND_Y - 46} C 820 ${GROND_Y - 72}, 920 ${GROND_Y - 16}, 1000 ${GROND_Y - 40} L 1000 ${VB_H} L 0 ${VB_H} Z`}
        fill="var(--paper-warm)"
      />
      <RPad
        d={`M0 ${GROND_Y - 40} C 200 ${GROND_Y - 74}, 420 ${GROND_Y - 12}, 640 ${GROND_Y - 46} C 820 ${GROND_Y - 72}, 920 ${GROND_Y - 16}, 1000 ${GROND_Y - 40}`}
        stroke="var(--ink-faint)"
        strokeWidth={0.9}
        roughness={1.6}
      />
      {/* grondvlak */}
      <path
        d={`M0 ${GROND_Y - 4} C 250 ${GROND_Y - 16}, 700 ${GROND_Y + 8}, 1000 ${GROND_Y - 4} L 1000 ${VB_H} L 0 ${VB_H} Z`}
        fill="var(--paper-deep)"
        opacity={0.55}
      />
      <RPad
        d={`M0 ${GROND_Y - 4} C 250 ${GROND_Y - 16}, 700 ${GROND_Y + 8}, 1000 ${GROND_Y - 4}`}
        stroke="var(--ink-faint)"
        strokeWidth={1}
        roughness={1.8}
      />
      {/* het pad: dubbele karrenspoor-lijn */}
      <RPad
        d={`M0 ${PAD_Y - 4} C 200 ${PAD_Y - 14}, 380 ${PAD_Y + 10}, 560 ${PAD_Y - 6} C 740 ${PAD_Y - 16}, 880 ${PAD_Y + 6}, 1000 ${PAD_Y - 4}`}
        stroke="var(--oker)"
        strokeWidth={1.5}
        roughness={1}
        strokeLineDash={[4, 9]}
      />
      <g opacity={0.55}>
        <RPad
          d={`M0 ${PAD_Y + 7} C 200 ${PAD_Y - 3}, 380 ${PAD_Y + 21}, 560 ${PAD_Y + 5} C 740 ${PAD_Y - 5}, 880 ${PAD_Y + 17}, 1000 ${PAD_Y + 7}`}
          stroke="var(--oker)"
          strokeWidth={1}
          roughness={1}
          strokeLineDash={[3, 11]}
        />
      </g>
      {children}
    </g>
  );
}

/** Haltepaal met wimpel en nummer. */
export function HaltePaal({ x, nummer }: { x: number; nummer: number }) {
  const y = PAD_Y - 4;
  return (
    <g aria-hidden>
      <RLijn x1={x} y1={y} x2={x} y2={y - 54} strokeWidth={1.6} />
      <RVeelhoek
        punten={[
          [x, y - 54],
          [x + 28, y - 46],
          [x, y - 38],
        ]}
        fill="var(--terra)"
        fillStyle="hachure"
        hachureGap={2.5}
        fillWeight={0.9}
        stroke="var(--terra)"
        strokeWidth={1.1}
      />
      <RCirkel cx={x} cy={y} r={3} fill="var(--oker)" fillStyle="solid" stroke="var(--oker-deep)" strokeWidth={1} />
      <text
        x={x + 11}
        y={y - 42.5}
        fontSize="9"
        fill="var(--ink)"
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
      <RPad d="M0 0 C -1 -12, 1 -22, 0 -34" strokeWidth={1.7} />
      <RPad d="M0 -16 C -6 -20, -9 -25, -11 -30" strokeWidth={1.1} />
      <RPad d="M0 -22 C 5 -26, 8 -30, 9 -34" strokeWidth={1.1} />
      <RPad
        d="M-16 -34 C -24 -48, -12 -62, 0 -58 C 4 -70, 22 -66, 22 -52 C 32 -46, 24 -32, 12 -34 C 6 -26, -10 -26, -16 -34 Z"
        fill="var(--mos)"
        fillStyle="hachure"
        hachureGap={4.5}
        fillWeight={0.6}
        stroke="var(--mos)"
        strokeWidth={1.2}
        roughness={1.4}
      />
    </g>
  );
}

export function Den({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g transform={`scale(${s})`}>
        <RLijn x1={0} y1={0} x2={0} y2={-9} strokeWidth={1.5} />
        {[
          [
            [-11, -8],
            [0, -26],
            [11, -8],
          ],
          [
            [-8, -20],
            [0, -36],
            [8, -20],
          ],
          [
            [-5, -32],
            [0, -45],
            [5, -32],
          ],
        ].map((punten, i) => (
          <RVeelhoek
            key={i}
            punten={punten as [number, number][]}
            fill="var(--mos)"
            fillStyle="hachure"
            hachureGap={3.5}
            fillWeight={0.6}
            stroke="var(--mos)"
            strokeWidth={1.1}
          />
        ))}
      </g>
    </g>
  );
}

export function Struik({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <RPad
        d="M-10 0 C -14 -8, -6 -14, 0 -11 C 5 -16, 14 -10, 11 -3 C 13 0, 10 1, 8 0 Z"
        fill="var(--mos)"
        fillStyle="hachure"
        hachureGap={3.5}
        fillWeight={0.5}
        stroke="var(--mos)"
        strokeWidth={1.1}
      />
    </g>
  );
}

export function Bloemen({ x, y }: { x: number; y: number }) {
  return (
    <g aria-hidden>
      {[0, 14, 26].map((dx, i) => (
        <g key={i} transform={`translate(${x + dx} ${y - (i % 2) * 4})`}>
          <RLijn x1={0} y1={0} x2={0} y2={-7} stroke="var(--mos)" strokeWidth={1} />
          <RCirkel
            cx={0}
            cy={-9}
            r={2.4}
            fill={i === 1 ? 'var(--terra)' : 'var(--oker)'}
            fillStyle="solid"
            stroke={i === 1 ? 'var(--terra)' : 'var(--oker-deep)'}
            strokeWidth={0.8}
          />
        </g>
      ))}
    </g>
  );
}

export function Graspol({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[-6, -3, 0, 3, 6].map((dx, i) => (
        <RPad
          key={i}
          d={`M${dx} 0 C ${dx * 1.3} -5, ${dx * 1.6} -9, ${dx * 2.1} -13`}
          stroke="var(--mos)"
          strokeWidth={1.1}
          roughness={0.8}
          seed={Math.round(x + i * 31)}
        />
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
      <RRect x={-w / 2} y={-h} w={w} h={h} fill="var(--paper)" fillStyle="solid" strokeWidth={1.4} />
      <RVeelhoek
        punten={[
          [-w / 2 - 8, -h],
          [0, -h - dak],
          [w / 2 + 8, -h],
        ]}
        fill="var(--terra)"
        fillStyle="hachure"
        hachureGap={4}
        fillWeight={0.7}
        stroke="var(--ink-dim)"
        strokeWidth={1.4}
      />
      {schoorsteen && (
        <g>
          <RRect x={w / 4} y={-h - dak + 2} w={9} h={15} fill="var(--paper)" fillStyle="solid" strokeWidth={1.1} />
          <RPad
            d={`M${w / 4 + 4} ${-h - dak - 4} c 2 -6 -3 -9 1 -15`}
            stroke="var(--ink-faint)"
            strokeWidth={1}
            roughness={1.8}
          />
        </g>
      )}
      <RRect x={-w / 2 + 9} y={-24} w={13} h={24} fill="var(--paper-deep)" fillStyle="solid" strokeWidth={1.1} />
      <circle cx={-w / 2 + 19} cy={-12} r={1} fill="var(--ink-dim)" />
      <RRect
        x={6}
        y={-h + 12}
        w={16}
        h={13}
        fill={lampAan ? 'var(--oker)' : 'var(--paper-warm)'}
        fillStyle="solid"
        strokeWidth={1.1}
      />
      <RLijn x1={14} y1={-h + 12} x2={14} y2={-h + 25} strokeWidth={0.9} />
      {lampAan && <circle cx={14} cy={-h + 18} r={13} fill="var(--oker)" opacity={0.13} />}
    </g>
  );
}

export function Brievenbus({ x, y, vlagOmhoog }: { x: number; y: number; vlagOmhoog: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <RLijn x1={0} y1={0} x2={0} y2={-30} strokeWidth={1.7} />
      <RRect x={-16} y={-48} w={32} h={18} fill="var(--paper)" fillStyle="solid" strokeWidth={1.4} />
      <RLijn x1={-16} y1={-39} x2={-6} y2={-39} strokeWidth={1.1} />
      <motion.g
        style={{ originX: '18px', originY: '-40px' }}
        animate={{ rotate: vlagOmhoog ? -90 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
      >
        <RLijn x1={18} y1={-40} x2={28} y2={-40} stroke="var(--terra)" strokeWidth={1.7} />
        <RVeelhoek
          punten={[
            [28, -43],
            [34, -40],
            [28, -37],
          ]}
          fill="var(--terra)"
          fillStyle="solid"
          stroke="var(--terra)"
          strokeWidth={1}
        />
      </motion.g>
    </g>
  );
}

export function Bankje({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <RLijn x1={-24} y1={0} x2={-24} y2={-14} />
      <RLijn x1={24} y1={0} x2={24} y2={-14} />
      <RLijn x1={-30} y1={-14} x2={30} y2={-14} />
      <RLijn x1={-30} y1={-17} x2={30} y2={-17} strokeWidth={2.6} />
      <RLijn x1={-26} y1={-17} x2={-26} y2={-30} />
      <RLijn x1={26} y1={-17} x2={26} y2={-30} />
      <RLijn x1={-28} y1={-30} x2={28} y2={-30} strokeWidth={1.9} />
    </g>
  );
}

export function Lantaarn({ x, y, aan }: { x: number; y: number; aan: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <RLijn x1={0} y1={0} x2={0} y2={-54} strokeWidth={1.6} />
      <RPad d="M0 -54 C 0 -63, 8 -63, 10 -58" strokeWidth={1.3} />
      <RRect
        x={7}
        y={-58}
        w={7}
        h={9}
        fill={aan ? 'var(--oker)' : 'var(--paper)'}
        fillStyle="solid"
        strokeWidth={1.1}
      />
      {aan && <circle cx={10.5} cy={-53} r={11} fill="var(--oker)" opacity={0.16} />}
    </g>
  );
}

/** Hek met poort dwars over het pad. De poort kan dicht (twijfel). */
export function HekMetPoort({ x, dicht }: { x: number; dicht: boolean }) {
  const y = PAD_Y + 2;
  return (
    <g transform={`translate(${x} ${y})`}>
      {[-58, -34, 34, 58].map((dx) => (
        <RLijn key={dx} x1={dx} y1={5} x2={dx} y2={-32} strokeWidth={1.7} />
      ))}
      <RLijn x1={-62} y1={-25} x2={-30} y2={-25} strokeWidth={1.2} />
      <RLijn x1={-62} y1={-12} x2={-30} y2={-12} strokeWidth={1.2} />
      <RLijn x1={30} y1={-25} x2={62} y2={-25} strokeWidth={1.2} />
      <RLijn x1={30} y1={-12} x2={62} y2={-12} strokeWidth={1.2} />
      <motion.g
        style={{ originX: '-30px', originY: '0px' }}
        animate={{ rotate: dicht ? 0 : -64 }}
        transition={{ type: 'spring', stiffness: 120, damping: 15 }}
      >
        <RLijn x1={-30} y1={-30} x2={30} y2={-30} stroke="var(--terra)" strokeWidth={1.8} />
        <RLijn x1={-30} y1={-8} x2={30} y2={-8} stroke="var(--terra)" strokeWidth={1.8} />
        <RLijn x1={-30} y1={-30} x2={30} y2={-8} stroke="var(--terra)" strokeWidth={1.2} />
        <RLijn x1={-26} y1={-32} x2={-26} y2={-5} stroke="var(--terra)" strokeWidth={1.8} />
        <RLijn x1={26} y1={-32} x2={26} y2={-5} stroke="var(--terra)" strokeWidth={1.8} />
      </motion.g>
    </g>
  );
}

export function Waslijn({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g>
      <RLijn x1={x1} y1={PAD_Y - 2} x2={x1} y2={y} strokeWidth={1.7} />
      <RLijn x1={x2} y1={PAD_Y - 2} x2={x2} y2={y} strokeWidth={1.7} />
      <RPad
        d={`M${x1} ${y} C ${(x1 + x2) / 2 - 40} ${y + 28}, ${(x1 + x2) / 2 + 40} ${y + 28}, ${x2} ${y}`}
        strokeWidth={1.2}
        roughness={0.7}
      />
    </g>
  );
}

export function Podium({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <RRect x={-26} y={-10} w={52} h={10} fill="var(--paper)" fillStyle="solid" strokeWidth={1.4} />
      <RLijn x1={-26} y1={-10} x2={26} y2={-10} stroke="var(--oker)" strokeWidth={1.5} />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Figuren                                                             */
/* ------------------------------------------------------------------ */

export type FiguurPose = 'staand' | 'zittend' | 'dirigent' | 'lantaarn';

/**
 * Getekend poppetje met een jasje (arcering) en een pet. Charmant
 * imperfect, zoals de rest van de wereld.
 */
export function Figuur({
  x,
  y,
  s = 1,
  pose = 'staand',
  flip = false,
}: {
  x: number;
  y: number;
  s?: number;
  pose?: FiguurPose;
  flip?: boolean;
}) {
  const jas = (
    <RVeelhoek
      punten={[
        [-5, -33],
        [5, -33],
        [7, -17],
        [-7, -17],
      ]}
      fill="var(--ink-dim)"
      fillStyle="hachure"
      hachureGap={2.6}
      fillWeight={0.7}
      stroke="var(--ink-dim)"
      strokeWidth={1.3}
    />
  );
  const hoofd = (
    <>
      <RCirkel cx={0} cy={-40} r={5.5} fill="var(--paper)" fillStyle="solid" stroke="var(--ink-dim)" strokeWidth={1.3} />
      {/* pet */}
      <RPad d="M-5.5 -42.5 C -4 -47.5, 4 -47.5, 5.5 -42.5 L 8.5 -42 " stroke="var(--terra)" strokeWidth={1.5} roughness={0.8} />
    </>
  );

  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      {pose === 'zittend' ? (
        <g>
          <RCirkel cx={0} cy={-36} r={5.5} fill="var(--paper)" fillStyle="solid" stroke="var(--ink-dim)" strokeWidth={1.3} />
          <RPad d="M-5.5 -38.5 C -4 -43.5, 4 -43.5, 5.5 -38.5 L 8.5 -38" stroke="var(--terra)" strokeWidth={1.5} roughness={0.8} />
          <RVeelhoek
            punten={[
              [-5, -30],
              [5, -30],
              [6, -16],
              [-6, -16],
            ]}
            fill="var(--ink-dim)"
            fillStyle="hachure"
            hachureGap={2.6}
            fillWeight={0.7}
            stroke="var(--ink-dim)"
            strokeWidth={1.3}
          />
          <RPad d="M-2 -16 L 9 -16 L 9 -6" strokeWidth={1.5} />
          <RPad d="M2 -16 L 2 -6" strokeWidth={1.5} />
          <RPad d="M0 -26 C 5 -24, 9 -22, 11 -19" strokeWidth={1.4} />
        </g>
      ) : pose === 'dirigent' ? (
        <g>
          {hoofd}
          {jas}
          <RPad d="M-3 -17 L -5 -5" strokeWidth={1.5} />
          <RPad d="M3 -17 L 5 -5" strokeWidth={1.5} />
          <RPad d="M-4 -29 L -10 -36" strokeWidth={1.4} />
          <RPad d="M4 -29 L 11 -40" strokeWidth={1.4} />
          <RLijn x1={11} y1={-40} x2={16} y2={-45} stroke="var(--oker-deep)" strokeWidth={1.3} />
        </g>
      ) : pose === 'lantaarn' ? (
        <g>
          {hoofd}
          {jas}
          <RPad d="M-3 -17 L -5 -5" strokeWidth={1.5} />
          <RPad d="M3 -17 L 5 -5" strokeWidth={1.5} />
          <RPad d="M-4 -28 L -9 -23" strokeWidth={1.4} />
          <RPad d="M4 -28 L 10 -25 L 10 -20" strokeWidth={1.4} />
          <RRect x={7.5} y={-20} w={5.5} h={7.5} fill="var(--oker)" fillStyle="solid" stroke="var(--ink-dim)" strokeWidth={1} />
          <circle cx={10} cy={-16} r={8} fill="var(--oker)" opacity={0.15} />
        </g>
      ) : (
        <g>
          {hoofd}
          {jas}
          <RPad d="M-3 -17 L -5 -5" strokeWidth={1.5} />
          <RPad d="M3 -17 L 5 -5" strokeWidth={1.5} />
          <RPad d="M-4 -28 L -8 -22" strokeWidth={1.4} />
          <RPad d="M4 -28 L 8 -22" strokeWidth={1.4} />
        </g>
      )}
    </g>
  );
}

/** Envelopje dat door de lucht kan vliegen. */
export function Envelopje({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <RRect x={-13} y={-9} w={26} h={18} fill="var(--paper)" fillStyle="solid" strokeWidth={1.3} />
      <RPad d="M-13 -8 L 0 3 L 13 -8" strokeWidth={1.2} />
      <RCirkel cx={0} cy={3} r={2.6} fill="var(--oker)" fillStyle="solid" stroke="var(--oker-deep)" strokeWidth={0.8} />
    </g>
  );
}
