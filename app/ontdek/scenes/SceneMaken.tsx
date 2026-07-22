'use client';

import { motion } from 'motion/react';
import { Toneel } from '../wereld/Toneel';
import { Waslijn, Figuur, Struik, Boom, Bloemen, PAD_Y } from '../wereld/wereld';
import { WASLIJN_PAPIEREN, type SceneProps } from '../film-content';

/**
 * Halte 3. Een waslijn tussen twee palen; de agent hangt zijn werk van
 * vandaag te drogen: een offerte, een appje, een agenda-afspraak.
 */
export function SceneMaken({ beat, reduced }: SceneProps) {
  return (
    <div className="absolute inset-0">
      <Toneel stop={2} reduced={reduced}>
        <Waslijn x1={230} x2={790} y={PAD_Y - 228} />
        <Figuur x={850} y={PAD_Y + 2} pose="staand" s={1.1} flip />
        <Boom x={130} y={PAD_Y - 4} s={1.05} />
        <Struik x={520} y={PAD_Y - 4} />
        <Bloemen x={680} y={PAD_Y + 16} />
      </Toneel>

      {/* de papieren aan de lijn (HTML, zodat de tekst scherp blijft) */}
      <div className="absolute left-[8%] right-[8%] sm:left-[25%] sm:right-[25%] top-[45%] flex items-start justify-center gap-[3%]">
        {WASLIJN_PAPIEREN.map((papier, i) => {
          const visible = reduced || beat >= i + 1;
          const rot = [-2.4, 1.8, -1.2][i];
          return (
            <motion.figure
              key={papier.soort}
              style={{ marginTop: `${[0, 3.6, 1][i]}%`, transformOrigin: 'top center' }}
              initial={reduced ? false : { opacity: 0, y: -18, rotate: rot * 3 }}
              animate={
                visible ? { opacity: 1, y: 0, rotate: rot } : { opacity: 0, y: -18, rotate: rot * 3 }
              }
              transition={{ type: 'spring', stiffness: 120, damping: 13 }}
              className="relative w-[32%] max-w-[210px] rounded-[2px] border border-[var(--paper-edge)] bg-[var(--paper)] px-3 py-2.5 shadow-[var(--shadow-lift)]"
            >
              {/* wasknijper */}
              <span
                aria-hidden
                className="absolute -top-[9px] left-1/2 h-[14px] w-[7px] -translate-x-1/2 rounded-[2px] border border-[var(--ink-dim)] bg-[var(--oker)]/60"
              />
              <figcaption className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-[var(--oker-deep)]">
                {papier.soort}
              </figcaption>
              <div className="mt-1 font-display text-[12.5px] leading-tight text-[var(--ink)]">
                {papier.titel}
              </div>
              <ul className="mt-1.5 space-y-0.5 text-[10.5px] leading-snug text-[var(--ink-dim)]">
                {papier.regels.map((r, j) => (
                  <li key={j}>{r}</li>
                ))}
              </ul>
              <div className="mt-1.5 border-t border-dashed border-[var(--paper-edge)] pt-1 font-mono text-[8.5px] uppercase tracking-[0.1em] text-[var(--mos)]">
                ✓ {papier.slot}
              </div>
            </motion.figure>
          );
        })}
      </div>
    </div>
  );
}
