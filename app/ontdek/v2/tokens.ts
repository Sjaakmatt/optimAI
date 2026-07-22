/**
 * Het motion-systeem van /ontdek: drie easings, vier duren, één stagger.
 * Elke animatie op de pagina put uit deze set; dat ene besluit is de
 * grootste drijver van het "duur en doordacht"-gevoel.
 *
 * Waarden volgen het motion-onderzoek: ease-out voor alles wat de
 * bezoeker in gang zet, ease-in-out voor zichtbaar verplaatsende
 * elementen, één subtiele spring (overshoot < 8%) voor het speelse
 * accent. Exit is 0.8x de enter-duur.
 */

// onthullingen en binnenkomers (expo-out-gevoel)
export const EASE_UIT = 'expo.out';
export const EASE_UIT_CSS: [number, number, number, number] = [0.16, 1, 0.3, 1];

// zichtbare verplaatsingen A -> B
export const EASE_KALM = 'power2.inOut';
export const EASE_KALM_CSS: [number, number, number, number] = [0.4, 0, 0.2, 1];

// het speelse accent: subtiele veer, nooit cartoon-bounce
export const VEER = { type: 'spring', stiffness: 170, damping: 26 } as const;

export const DUUR = {
  micro: 0.12,
  basis: 0.2,
  paneel: 0.32,
  hoofdstuk: 0.7,
} as const;

export const STAGGER = 0.06;
export const EXIT_FACTOR = 0.8;
