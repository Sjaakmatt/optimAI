'use client';

import { Wolk, Graspol, Bloemen, Struik } from './wereld';

/**
 * Parallaxlagen om de wereld diepte te geven. De wolken schuiven
 * langzamer mee dan de scènes, de voorgrond (gras, stenen, bloemen)
 * juist sneller. Cellen zijn even breed als het venster; posities zijn
 * deterministisch per celindex zodat elke halte een eigen lucht heeft.
 */

export function WolkenCel({ i }: { i: number }) {
  const a = 130 + ((i * 217) % 380);
  const b = 560 + ((i * 149) % 300);
  return (
    <svg
      viewBox="0 0 1000 520"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
      focusable="false"
    >
      <Wolk x={a} y={62 + ((i * 37) % 46)} s={1.35} />
      <Wolk x={b} y={116 + ((i * 59) % 40)} s={0.95} />
      {i % 2 === 0 && <Wolk x={(a + b) / 2 + 90} y={88} s={0.7} />}
    </svg>
  );
}

export function VoorgrondCel({ i }: { i: number }) {
  const posities = [90, 240, 420, 610, 780, 930].map((x) => x + ((i * 53) % 60) - 30);
  return (
    <svg
      viewBox="0 0 1000 520"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
      focusable="false"
    >
      {posities.map((x, j) => (
        <Graspol key={j} x={x} y={505 + ((j * 7) % 12)} s={1.5 + ((i + j) % 3) * 0.35} />
      ))}
      {i % 2 === 0 && <Struik x={posities[1] + 70} y={516} s={1.5} />}
      {i % 3 === 0 && <Bloemen x={posities[3] + 40} y={512} />}
    </svg>
  );
}
