'use client';

// De grond van de pagina drijft mee: heel licht warmer bij het portret,
// koeler richting de dageraad. Eén kleur die over de hele pagina schuift, zodat
// de secties niet als losse donkere vlakken lezen maar als één avond.

import { useEffect } from 'react';
import { useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';

const STOPS = ['#0a0a0c', '#0c0a10', '#120d12', '#0b0b0f', '#0a0a0c', '#0a0d13'];

export function Grond() {
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();
  const kleur = useTransform(scrollYProgress, [0, 0.2, 0.36, 0.55, 0.75, 1], STOPS);

  useMotionValueEvent(kleur, 'change', (v) => {
    if (!reduced) document.documentElement.style.setProperty('--bg', v);
  });

  useEffect(() => {
    return () => {
      document.documentElement.style.removeProperty('--bg');
    };
  }, []);

  return null;
}
