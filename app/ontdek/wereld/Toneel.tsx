'use client';

import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Zon, Vogels, Land, HaltePaal } from './wereld';

/**
 * Eén venster op de wereld: lichtstemming (van ochtend naar avond),
 * zon, land en het doorlopende pad. De wolken en de voorgrond leven in
 * aparte parallaxlagen (lagen.tsx). Scènes zetten hun decor hier
 * bovenop. Decoratief; betekenisdragende tekst leeft in HTML.
 */

// tint van de lucht per halte: ochtendgeel naar avondrood
const LUCHT: Array<[string, number]> = [
  ['#f7ecd6', 0.5],
  ['#f7ecd6', 0.35],
  ['#f2e2c0', 0.35],
  ['#f0dcb4', 0.4],
  ['#eccfa4', 0.45],
  ['#e2b894', 0.4],
  ['#d9a58a', 0.45],
];

const VUURVLIEGJES = [
  { x: 180, y: 380 },
  { x: 330, y: 350 },
  { x: 700, y: 365 },
  { x: 860, y: 395 },
  { x: 540, y: 340 },
];

export function Toneel({
  stop,
  reduced,
  children,
}: {
  stop: number;
  reduced: boolean;
  children?: ReactNode;
}) {
  const [tint, sterkte] = LUCHT[stop] ?? LUCHT[0];
  return (
    <svg
      viewBox="0 0 1000 520"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id={`lucht-${stop}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tint} stopOpacity={sterkte} />
          <stop offset="70%" stopColor={tint} stopOpacity={0} />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={1000} height={520} fill={`url(#lucht-${stop})`} />
      <Zon stop={stop} />
      {stop < 4 && <Vogels x={340 + stop * 60} y={110} />}
      <Land />
      <HaltePaal x={78} nummer={stop + 1} />
      {children}
      {/* vuurvliegjes in de schemering */}
      {stop >= 5 &&
        VUURVLIEGJES.map((v, i) =>
          reduced ? (
            <circle key={i} cx={v.x} cy={v.y} r={1.8} fill="var(--oker)" opacity={0.7} />
          ) : (
            <motion.circle
              key={i}
              cx={v.x}
              cy={v.y}
              r={1.8}
              fill="var(--oker)"
              animate={{
                opacity: [0, 0.9, 0],
                cy: [v.y, v.y - 6, v.y - 2],
                cx: [v.x, v.x + (i % 2 === 0 ? 5 : -5), v.x],
              }}
              transition={{ duration: 3 + i * 0.7, repeat: Infinity, delay: i * 0.9, ease: 'easeInOut' }}
            />
          ),
        )}
    </svg>
  );
}
