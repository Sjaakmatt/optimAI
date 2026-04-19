'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useStore } from '@/lib/store';
import { formatEuro, formatNumber } from '@/lib/utils';

export function ROITicker() {
  const euros = useStore((s) => s.roi.eurosEquivalent);
  const tasks = useStore((s) => s.roi.tasksCompleted);
  const minutes = useStore((s) => s.roi.totalMinutesSaved);

  const [displayEuros, setDisplayEuros] = useState(euros);
  const prevEurosRef = useRef(euros);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const start = prevEurosRef.current;
    const end = euros;
    if (start === end) return;
    setPulse((p) => p + 1);
    const duration = 700;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayEuros(start + (end - start) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else prevEurosRef.current = end;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [euros]);

  return (
    <motion.div
      key={pulse}
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.015, 1] }}
      transition={{ duration: 0.4 }}
      className="pointer-events-none fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-30 rounded-sm border border-[var(--border-hot)] bg-[color:rgba(17,18,21,0.92)] backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-3 shadow-2xl"
    >
      <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--text-faint)]">
        Bespaard vandaag
      </div>
      <div className="mt-1 font-display text-[26px] sm:text-[34px] leading-none text-[var(--accent)]">
        {formatEuro(displayEuros)}
      </div>
      <div className="mt-1.5 sm:mt-2 flex items-center gap-2 sm:gap-3 font-mono text-[10px] text-[var(--text-dim)]">
        <span>{formatNumber(tasks)} taken</span>
        <span className="text-[var(--text-faint)]">·</span>
        <span>{formatNumber(minutes)} min</span>
      </div>
    </motion.div>
  );
}
