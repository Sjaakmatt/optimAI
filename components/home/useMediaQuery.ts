'use client';

import { useEffect, useState } from 'react';

/** Waar of onwaar voor een media query; op de server en vóór hydratie altijd `standaard`. */
export function useMediaQuery(query: string, standaard = false): boolean {
  const [past, setPast] = useState(standaard);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setPast(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);
  return past;
}
