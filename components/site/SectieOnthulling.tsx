'use client';

// Laat de secties van een binnenpagina opkomen zodra ze in beeld komen.
// De pagina's zelf zijn servercomponenten; deze waarnemer zet per sectie
// een klasse en de CSS doet de rest. Zonder JavaScript of met reduced
// motion staat alles er gewoon: de verbergende stijl geldt alleen als de
// waarnemer actief is (klasse op <html>).

import { useEffect } from 'react';

export function SectieOnthulling() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const secties = Array.from(document.querySelectorAll<HTMLElement>('main > section, main > div > section'));
    if (secties.length === 0) return;
    document.documentElement.classList.add('js-onthul');
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-zichtbaar');
            obs.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    for (const s of secties) {
      // wat al in beeld staat bij laden, meteen tonen
      const r = s.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) s.classList.add('is-zichtbaar');
      else obs.observe(s);
    }
    return () => {
      obs.disconnect();
      document.documentElement.classList.remove('js-onthul');
    };
  }, []);
  return null;
}
