'use client';

import { useEffect, type RefObject } from 'react';
import { useMotionValue, type MotionValue } from 'motion/react';

/**
 * Voortgang van een vastgepinde sectie, 0 als zijn bovenrand de bovenrand van
 * het venster raakt en 1 als zijn onderrand de onderrand raakt. Gemeten op
 * elke scroll met de actuele positie, zodat lagen die later van hoogte
 * veranderen (afbeeldingen, lettertypes, de mailagent) de meting niet
 * verouderen.
 */
export function useSectieProgress(ref: RefObject<HTMLElement | null>, actief = true): MotionValue<number> {
  const progress = useMotionValue(0);

  useEffect(() => {
    if (!actief) return;
    let raf = 0;
    const meet = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const reis = r.height - window.innerHeight;
      if (reis <= 0) {
        progress.set(0);
        return;
      }
      const p = Math.min(1, Math.max(0, -r.top / reis));
      progress.set(p);
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
