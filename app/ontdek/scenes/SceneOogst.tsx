'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { OOGST_STATS, type SceneProps } from '../film-content';
import { beatReveal } from '../film-motion';

/**
 * Stap 8. Het resultaat: wat het in de praktijk oplevert, en de stap
 * naar een echt gesprek.
 */
export function SceneOogst({ beat, reduced }: SceneProps) {
  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-col items-center">
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
        {OOGST_STATS.map((stat, i) => {
          const visible = reduced || beat >= i + 1;
          return (
            <motion.div key={stat.label} {...beatReveal(visible, reduced)} className="text-center">
              <div className="font-display text-[44px] sm:text-[52px] leading-none text-[var(--ink)] tabular-nums">
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
              <div className="mx-auto mt-2 max-w-[180px] text-[12.5px] leading-snug text-[var(--ink-dim)]">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        {...beatReveal(reduced || beat >= 4, reduced)}
        className="mt-8 flex flex-col items-center gap-3"
      >
        <div className="flex items-center gap-3 text-[12px] text-[var(--ink-faint)]">
          <span aria-hidden className="h-[1px] w-8" style={{ background: 'var(--oker)' }} />
          <span className="font-mono uppercase tracking-[0.16em]">Einde van de rondleiding</span>
          <span aria-hidden className="h-[1px] w-8" style={{ background: 'var(--oker)' }} />
        </div>
        <a
          href="#finale"
          className="inline-flex items-center gap-2 rounded-[2px] bg-[var(--ink)] px-5 py-2.5 text-[14px] text-[var(--paper)] transition-colors hover:bg-[var(--oker-deep)] lift-on-hover"
        >
          Bekijk uw volgende stap
          <ArrowDown size={15} strokeWidth={1.8} aria-hidden />
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
