'use client';

import { useEffect, useRef, useState } from 'react';

/** Sober optellend cijfer; met reduced motion staat de eindwaarde er direct. */
export function CountUp({
  target,
  run,
  reduced,
}: {
  target: number;
  run: boolean;
  reduced: boolean;
}) {
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
