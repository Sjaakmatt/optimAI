'use client';

import type { ReactNode } from 'react';
import { Zon, Wolk, Vogels, Land, HaltePaal } from './wereld';

/**
 * Eén venster op de wereld: lucht, zon (die per halte verder zakt),
 * wolken, land en het doorlopende pad. Scènes zetten hun eigen decor
 * en overlays erbovenop. De SVG is decoratief; tekst leeft in HTML.
 */
export function Toneel({
  stop,
  reduced,
  children,
}: {
  stop: number;
  reduced: boolean;
  children?: ReactNode;
}) {
  // wolkposities variëren per halte zodat de lucht blijft leven
  const w1 = 120 + ((stop * 173) % 300);
  const w2 = 620 + ((stop * 97) % 240);
  return (
    <svg
      viewBox="0 0 1000 520"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
      focusable="false"
    >
      <Zon stop={stop} />
      <Wolk x={w1} y={70 + ((stop * 31) % 40)} s={1.3} drift={!reduced} />
      <Wolk x={w2} y={120 + ((stop * 53) % 36)} s={0.9} drift={!reduced} />
      {stop < 4 && <Vogels x={340 + stop * 60} y={110} />}
      <Land />
      <HaltePaal x={78} nummer={stop + 1} />
      {children}
    </svg>
  );
}
