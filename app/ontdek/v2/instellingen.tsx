'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

/**
 * Instellingen van de wandeling: animaties en geluid.
 *
 * prefers-reduced-motion is een volwaardig pad, geen bijzaak: de
 * media-query én een zichtbare "Animaties uit"-schakelaar voeden
 * dezelfde vlag. Geluid staat standaard uit en gaat alleen aan via de
 * zichtbare toggle (nooit autoplay).
 */

interface Instellingen {
  /** true = geen autoplay, geen scroll-choreografie, statische eindstaten */
  rustig: boolean;
  /** door de bezoeker geforceerd (UI-toggle), los van de media-query */
  animatiesUit: boolean;
  zetAnimatiesUit: (uit: boolean) => void;
  geluidAan: boolean;
  zetGeluidAan: (aan: boolean) => void;
}

const Ctx = createContext<Instellingen | null>(null);

export function InstellingenProvider({ children }: { children: ReactNode }) {
  const [mediaReduced, setMediaReduced] = useState(false);
  const [animatiesUit, zetAnimatiesUit] = useState(false);
  const [geluidAan, zetGeluidAan] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setMediaReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setMediaReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const value = useMemo(
    () => ({
      rustig: mediaReduced || animatiesUit,
      animatiesUit,
      zetAnimatiesUit,
      geluidAan,
      zetGeluidAan,
    }),
    [mediaReduced, animatiesUit, geluidAan],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useInstellingen(): Instellingen {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useInstellingen buiten InstellingenProvider');
  return ctx;
}
