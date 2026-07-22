'use client';

import { useMemo } from 'react';
import rough from 'roughjs';
import type { Options, Drawable } from 'roughjs/bin/core';

/**
 * Dunne React-laag over rough.js: alle vormen in agent-land worden
 * hiermee getekend, zodat elke lijn een handgetekende, licht wiebelige
 * inktlijn is en vullingen als arcering (hachure) verschijnen.
 *
 * Belangrijk: elke vorm krijgt een deterministische seed, zodat server
 * en client exact dezelfde paden genereren (geen hydration-mismatch) en
 * de tekening niet per render verspringt.
 */

const gen = rough.generator();

function seedVan(...nums: number[]): number {
  let h = 2166136261;
  for (const n of nums) {
    h = Math.imul(h ^ Math.round(n * 7 + 13), 16777619);
  }
  return (Math.abs(h) % 2 ** 31) + 1;
}

function Paden({ drawable }: { drawable: Drawable }) {
  const paths = gen.toPaths(drawable);
  return (
    <>
      {paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          stroke={p.stroke}
          strokeWidth={p.strokeWidth}
          fill={p.fill ?? 'none'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </>
  );
}

const BASIS: Options = {
  roughness: 1.1,
  bowing: 1.2,
  strokeWidth: 1.4,
  stroke: 'var(--ink-dim)',
};

export function RLijn({
  x1,
  y1,
  x2,
  y2,
  ...opts
}: { x1: number; y1: number; x2: number; y2: number } & Options) {
  const d = useMemo(
    () => gen.line(x1, y1, x2, y2, { ...BASIS, seed: seedVan(x1, y1, x2, y2), ...opts }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [x1, y1, x2, y2, JSON.stringify(opts)],
  );
  return <Paden drawable={d} />;
}

export function RRect({
  x,
  y,
  w,
  h,
  ...opts
}: { x: number; y: number; w: number; h: number } & Options) {
  const d = useMemo(
    () => gen.rectangle(x, y, w, h, { ...BASIS, seed: seedVan(x, y, w, h), ...opts }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [x, y, w, h, JSON.stringify(opts)],
  );
  return <Paden drawable={d} />;
}

export function RCirkel({
  cx,
  cy,
  r,
  ...opts
}: { cx: number; cy: number; r: number } & Options) {
  const d = useMemo(
    () => gen.circle(cx, cy, r * 2, { ...BASIS, seed: seedVan(cx, cy, r), ...opts }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cx, cy, r, JSON.stringify(opts)],
  );
  return <Paden drawable={d} />;
}

export function REllips({
  cx,
  cy,
  rx,
  ry,
  ...opts
}: { cx: number; cy: number; rx: number; ry: number } & Options) {
  const d = useMemo(
    () => gen.ellipse(cx, cy, rx * 2, ry * 2, { ...BASIS, seed: seedVan(cx, cy, rx, ry), ...opts }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cx, cy, rx, ry, JSON.stringify(opts)],
  );
  return <Paden drawable={d} />;
}

export function RVeelhoek({
  punten,
  ...opts
}: { punten: [number, number][] } & Options) {
  const d = useMemo(
    () =>
      gen.polygon(punten, {
        ...BASIS,
        seed: seedVan(...punten.flat()),
        ...opts,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(punten), JSON.stringify(opts)],
  );
  return <Paden drawable={d} />;
}

export function RPad({ d: pathD, seed, ...opts }: { d: string; seed?: number } & Options) {
  const d = useMemo(
    () => gen.path(pathD, { ...BASIS, seed: seed ?? seedVan(pathD.length, 17) + pathD.length, ...opts }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathD, seed, JSON.stringify(opts)],
  );
  return <Paden drawable={d} />;
}
