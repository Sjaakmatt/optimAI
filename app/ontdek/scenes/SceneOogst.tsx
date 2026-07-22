'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { Toneel } from '../wereld/Toneel';
import { Boom, Figuur, Struik, Bloemen, PAD_Y } from '../wereld/wereld';
import { OOGST_STATS, type SceneProps } from '../film-content';

/**
 * Halte 7. De boomgaard bij avondlicht: aan de grote boom verschijnt
 * vrucht na vrucht, en op houten bordjes staat wat de wandeling in de
 * praktijk oplevert.
 */

const BOOM_X = 250;
const VRUCHTEN = [
  { x: BOOM_X - 22, y: PAD_Y - 108 },
  { x: BOOM_X + 34, y: PAD_Y - 126 },
  { x: BOOM_X - 4, y: PAD_Y - 146 },
  { x: BOOM_X + 44, y: PAD_Y - 96 },
  { x: BOOM_X + 12, y: PAD_Y - 112 },
];

export function SceneOogst({ beat, reduced }: SceneProps) {
  return (
    <div className="absolute inset-0">
      <Toneel stop={6} reduced={reduced}>
        <Boom x={BOOM_X} y={PAD_Y - 2} s={2.4} />
        <Boom x={860} y={PAD_Y - 4} s={0.95} />
        <Struik x={640} y={PAD_Y + 6} />
        <Bloemen x={520} y={PAD_Y + 18} />
        <Figuur x={370} y={PAD_Y + 4} pose="lantaarn" s={1.1} />
        {VRUCHTEN.map((v, i) => (
          <motion.circle
            key={i}
            cx={v.x}
            cy={v.y}
            r={4.5}
            fill="var(--oker)"
            stroke="var(--oker-deep)"
            strokeWidth={0.8}
            initial={reduced ? false : { scale: 0, opacity: 0 }}
            animate={
              reduced || beat >= Math.min(i + 1, 3)
                ? { scale: 1, opacity: 0.9 }
                : { scale: 0, opacity: 0 }
            }
            transition={{ type: 'spring', stiffness: 300, damping: 14, delay: reduced ? 0 : (i % 3) * 0.2 }}
            style={{ originX: `${v.x}px`, originY: `${v.y}px` }}
          />
        ))}
      </Toneel>

      {/* houten bordjes met de oogst */}
      <div className="absolute left-[6%] right-[3%] sm:left-[33%] bottom-[16%] flex items-end justify-center gap-[3%]">
        {OOGST_STATS.map((stat, i) => {
          const visible = reduced || beat >= i + 1;
          return (
            <motion.div
              key={stat.label}
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-[31%] max-w-[190px] rounded-[2px] border border-[var(--paper-edge)] bg-[var(--paper)]/95 px-3 py-2.5 text-center shadow-[var(--shadow-lift)]"
            >
              <div className="font-display text-[24px] sm:text-[30px] leading-none text-[var(--ink)] tabular-nums">
                {stat.literal ? (
                  <span>{stat.literal}</span>
                ) : (
                  <>
                    {stat.prefix}
                    <CountUp target={stat.value} run={visible && !reduced} reduced={reduced} />
                    {stat.suffix}
                  </>
                )}
              </div>
              <div className="mt-1 text-[10.5px] sm:text-[11.5px] leading-snug text-[var(--ink-dim)]">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* de uitgang */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={reduced || beat >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        className="absolute bottom-[2.5%] left-1/2 -translate-x-1/2"
      >
        <a
          href="#finale"
          className="inline-flex items-center gap-2 rounded-[2px] bg-[var(--ink)] px-4 py-2 text-[13px] text-[var(--paper)] shadow-[var(--shadow-lift)] transition-colors hover:bg-[var(--oker-deep)]"
        >
          Bekijk uw volgende stap
          <ArrowDown size={14} strokeWidth={1.8} aria-hidden />
        </a>
      </motion.div>
    </div>
  );
}

function CountUp({ target, run, reduced }: { target: number; run: boolean; reduced: boolean }) {
  const [value, setValue] = useState(reduced ? target : 0);
  const done = useRef(false);

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }
    if (!run || done.current) return;
    done.current = true;
    const duration = 900;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, reduced, target]);

  return <span>{value}</span>;
}
