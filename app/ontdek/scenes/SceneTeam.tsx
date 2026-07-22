'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Toneel } from '../wereld/Toneel';
import { Podium, Figuur, Lantaarn, Huisje, Boom, Struik, PAD_Y } from '../wereld/wereld';
import { TEAM_AGENTS, type SceneProps } from '../film-content';

/**
 * Halte 6. Het dorpsplein in de vroege avond: de dirigent op een
 * podium, vier agents eromheen. De maat gaat rond als een zachte puls
 * van de dirigent naar wie aan de beurt is.
 */

const FIGUREN = [
  { x: 330, y: PAD_Y + 14 },
  { x: 430, y: PAD_Y + 26 },
  { x: 620, y: PAD_Y + 26 },
  { x: 720, y: PAD_Y + 14 },
];
const DIRIGENT = { x: 525, y: PAD_Y - 16 };

export function SceneTeam({ beat, reduced, actief }: SceneProps) {
  const [maat, setMaat] = useState(0);
  const speelt = reduced || beat >= 2;

  useEffect(() => {
    if (reduced || !speelt || !actief) return;
    const t = setInterval(() => setMaat((m) => (m + 1) % TEAM_AGENTS.length), 1200);
    return () => clearInterval(t);
  }, [reduced, speelt, actief]);

  return (
    <div className="absolute inset-0">
      <Toneel stop={5} reduced={reduced}>
        <Huisje x={170} y={PAD_Y - 30} w={82} h={48} lampAan schoorsteen />
        <Huisje x={880} y={PAD_Y - 44} w={76} h={44} lampAan />
        <Lantaarn x={260} y={PAD_Y + 6} aan />
        <Lantaarn x={800} y={PAD_Y + 10} aan />
        <Boom x={945} y={PAD_Y - 2} s={0.9} />
        <Struik x={230} y={PAD_Y + 16} />
        <Podium x={DIRIGENT.x} y={DIRIGENT.y} />
        <motion.g
          initial={false}
          animate={reduced ? undefined : { rotate: speelt ? [0, -4, 3, 0] : 0 }}
          transition={{ duration: 1.2, repeat: speelt && !reduced ? Infinity : 0, ease: 'easeInOut' }}
          style={{ originX: `${DIRIGENT.x}px`, originY: `${DIRIGENT.y - 20}px` }}
        >
          <Figuur x={DIRIGENT.x} y={DIRIGENT.y - 8} pose="dirigent" s={1.2} />
        </motion.g>
        {FIGUREN.map((f, i) => (
          <motion.g
            key={i}
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced || beat >= 1 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: reduced ? 0 : i * 0.15 }}
          >
            <Figuur x={f.x} y={f.y} pose="staand" s={1.05} flip={i > 1} />
          </motion.g>
        ))}
        {/* de maat: een puls van dirigent naar wie aan de beurt is */}
        {!reduced && speelt && actief && (
          <motion.circle
            key={maat}
            r={3}
            fill="var(--oker)"
            initial={{ cx: DIRIGENT.x, cy: DIRIGENT.y - 40, opacity: 0 }}
            animate={{
              cx: [DIRIGENT.x, (DIRIGENT.x + FIGUREN[maat].x) / 2, FIGUREN[maat].x],
              cy: [DIRIGENT.y - 40, DIRIGENT.y - 70, FIGUREN[maat].y - 52],
              opacity: [0, 0.9, 0],
            }}
            transition={{ duration: 1.05, ease: 'easeInOut' }}
          />
        )}
      </Toneel>

      {/* naambordjes onder de figuren */}
      {TEAM_AGENTS.map((naam, i) => (
        <motion.div
          key={naam}
          initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={reduced || beat >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.45, delay: reduced ? 0 : i * 0.15 }}
          className="absolute -translate-x-1/2"
          style={{
            left: `${(FIGUREN[i].x / 1000) * 100}%`,
            top: `${((FIGUREN[i].y + 10) / 520) * 100}%`,
          }}
        >
          <span
            className="rounded-full border bg-[var(--paper)]/95 px-2.5 py-0.5 font-display text-[11px] text-[var(--ink)] shadow-[var(--shadow-soft)] transition-colors duration-300"
            style={{ borderColor: !reduced && speelt && maat === i ? 'var(--oker)' : 'var(--paper-edge)' }}
          >
            {naam}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
