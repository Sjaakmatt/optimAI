'use client';

import { useEffect, type RefObject } from 'react';
import { useMotionValue, type MotionValue } from 'motion/react';

/**
 * Hoe ver een element door het venster is gereisd: 0 als zijn bovenrand
 * onderaan het venster verschijnt, 1 als zijn onderrand bovenaan verdwijnt.
 * Per scroll opnieuw gemeten, zodat lagen die later van hoogte veranderen de
 * meting niet verouderen.
 */
export function useZichtProgress(ref: RefObject<HTMLElement | null>, actief = true): MotionValue<number> {
  const progress = useMotionValue(0);
  useEffect(() => {
    if (!actief) return;
    let raf = 0;
    const meet = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh - r.top) / (vh + r.height);
      progress.set(Math.min(1, Math.max(0, p)));
    };
    const plan = () => {
      if (!raf) raf = requestAnimationFrame(meet);
    };
    meet();
    window.addEventListener('scroll', plan, { passive: true });
    window.addEventListener('resize', plan);
    return () => {
      window.removeEventListener('scroll', plan);
      window.removeEventListener('resize', plan);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, actief, progress]);
  return progress;
}
