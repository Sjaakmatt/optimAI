'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInstellingen } from './instellingen';

gsap.registerPlugin(ScrollTrigger);

/**
 * Smooth scroll met Lenis, gekoppeld aan GSAP's ticker zodat
 * ScrollTrigger en Lenis dezelfde klok delen. In de rustige modus
 * (prefers-reduced-motion of "Animaties uit") draait er géén Lenis:
 * native scroll, niets onderschept.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const { rustig } = useInstellingen();

  useEffect(() => {
    if (rustig) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      gsap.ticker.remove(tick);
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      lenis.destroy();
      ScrollTrigger.refresh();
    };
  }, [rustig]);

  return <>{children}</>;
}
