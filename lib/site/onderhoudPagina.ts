// Signaal van de onderhoudspagina naar de zwevende onderdelen in de root-layout
// (chatknop, cookiebanner). Die kunnen niet op het pad afgaan: bij
// onderhoudsmodus schrijft de middleware elke URL naar /onderhoud, maar de
// browser (en dus usePathname) ziet nog steeds de oorspronkelijke URL.
// Daarom meldt de pagina zichzelf aan zolang hij op het scherm staat.

import { useSyncExternalStore } from 'react';

let actief = false;
const luisteraars = new Set<() => void>();

export function zetOnderhoudPagina(waarde: boolean) {
  if (actief === waarde) return;
  actief = waarde;
  for (const l of luisteraars) l();
}

function abonneer(l: () => void) {
  luisteraars.add(l);
  return () => {
    luisteraars.delete(l);
  };
}

/** True zolang de onderhoudspagina op het scherm staat; op de server altijd false. */
export function useOpOnderhoudPagina(): boolean {
  return useSyncExternalStore(abonneer, () => actief, () => false);
}
