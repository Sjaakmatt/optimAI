'use client';

import { useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';

/**
 * Gedeelde motion-basis voor de wandeling. Eén plek, zodat elke scène
 * hetzelfde ritme heeft en reduced motion overal identiek uitpakt:
 * met reduced motion staan elementen er direct, zonder beweging.
 */

export const EASE = 'easeOut' as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

export const sceneSwap = {
  initial: { opacity: 0, scale: 0.985, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.99, y: -8 },
  transition: { duration: 0.45, ease: EASE },
} as const;

export function useFilmMotion(): { reduced: boolean } {
  const reduced = useReducedMotion() ?? false;
  return { reduced };
}

/** Props voor een element dat bij een bepaalde beat opkomt. */
export function beatReveal(visible: boolean, reduced: boolean) {
  if (reduced) {
    return { style: { opacity: visible ? 1 : 0 } };
  }
  return {
    initial: 'hidden' as const,
    animate: visible ? ('visible' as const) : ('hidden' as const),
    variants: fadeUp,
  };
}
