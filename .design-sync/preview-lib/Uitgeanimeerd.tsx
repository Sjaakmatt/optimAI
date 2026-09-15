import { useEffect, type ReactNode } from 'react';

/**
 * Preview glue: rondt elke lopende web-animatie (Motion's opacity-reveals)
 * meteen af naar de eindstand, zodat een onthul-kaart direct zijn rustbeeld
 * toont in plaats van een lege eerste seconde. Verandert niets aan de
 * componenten zelf.
 */
export function Uitgeanimeerd({ children }: { children: ReactNode }) {
  useEffect(() => {
    const afronden = () => {
      for (const a of document.getAnimations()) {
        try { a.finish(); } catch { /* al klaar of oneindig */ }
      }
    };
    afronden();
    const tik = setInterval(afronden, 100);
    const stop = setTimeout(() => clearInterval(tik), 4000);
    return () => { clearInterval(tik); clearTimeout(stop); };
  }, []);
  return <>{children}</>;
}
