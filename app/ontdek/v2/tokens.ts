/**
 * Bewegingstaal van de wandeling: drie signature-easings en vaste
 * tijden, overal hergebruikt zodat de hele pagina als één product
 * voelt. GSAP en Motion gebruiken dezelfde curves.
 */

// zacht uitrollend, voor onthullingen
export const EASE_UIT = 'power3.out';
export const EASE_UIT_CSS: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

// verend, voor speelse elementen
export const EASE_VEER = 'back.out(1.6)';

// kalm in-en-uit, voor camera en grote vlakken
export const EASE_KALM = 'power2.inOut';
export const EASE_KALM_CSS: [number, number, number, number] = [0.455, 0.03, 0.515, 0.955];

export const DUUR = {
  kort: 0.35,
  basis: 0.6,
  lang: 1.1,
} as const;

export const STAGGER = 0.07;
