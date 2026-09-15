import { useEffect, useRef, useState } from 'react';
import { SiteAgent } from 'factumai-demo';

// SiteAgent heeft geen props: hij leest het pad uit de URL en zijn
// sessievlaggen uit sessionStorage. Het wolkje komt na zes seconden of bij
// 35% scrolldiepte; de cel 'Wolkje' scrolt daarom kort naar beneden en weer
// terug. Elke cel wist eerst de sessievlaggen, anders houdt een eerdere cel
// het wolkje tegen.

const VLAGGEN = ['factumai.agent.v2.weggeklikt', 'factumai.agent.v2.gemeld'];

function useSchoneSessie() {
  useState(() => {
    try {
      for (const sleutel of VLAGGEN) window.sessionStorage.removeItem(sleutel);
    } catch {
      /* geen opslag */
    }
    return true;
  });
}

function wachtOp<T>(zoek: () => T | null | undefined, doe: (t: T) => void) {
  let gestopt = false;
  let pogingen = 0;
  const tik = () => {
    if (gestopt) return;
    const t = zoek();
    if (t) doe(t);
    else if (pogingen++ < 60) setTimeout(tik, 16);
  };
  tik();
  return () => {
    gestopt = true;
  };
}

/** Een pagina onder de zwevende knop. Vult de cel, zodat rechtsonder ook echt rechtsonder is. */
function Pagina({ children, hoogte }: { children?: React.ReactNode; hoogte?: number }) {
  return (
    <div style={{ minHeight: hoogte ?? 'calc(100vh - 96px)' }}>
      <div className="eyebrow">Diensten</div>
      <h1 className="mt-3 text-[34px] leading-[1.1] font-display" style={{ maxWidth: 480 }}>
        AI-agents die het dagelijkse werk overnemen.
      </h1>
      <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.6] text-[var(--fg-dim)]">
        Mails, offertes, orders en planning. Gebouwd op uw manier, met u aan het stuur.
      </p>
      {children}
    </div>
  );
}

/** In rust: alleen de terra knop rechtsonder, de enige zwevende knop op de site. */
export function Knop() {
  useSchoneSessie();
  return (
    <Pagina>
      <SiteAgent />
    </Pagina>
  );
}

/** De agent meldt zich: het wolkje met de zin voor deze pagina, boven de knop. */
export function Wolkje() {
  useSchoneSessie();
  const [hoog, setHoog] = useState(true);
  useEffect(() => {
    // Scrolldiepte halen, het wolkje laten komen, en weer terug naar boven.
    // De site scrolt vloeiend (scroll-behavior: smooth); hier moet het
    // meteen, anders staat scrollY nog op 0 als het scroll-event afgaat.
    const id = window.setTimeout(() => {
      const wortel = document.documentElement;
      const eerder = wortel.style.scrollBehavior;
      wortel.style.scrollBehavior = 'auto';
      window.scrollTo({ top: wortel.scrollHeight, behavior: 'instant' as ScrollBehavior });
      window.dispatchEvent(new Event('scroll'));
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      wortel.style.scrollBehavior = eerder;
      setHoog(false);
    }, 32);
    return () => window.clearTimeout(id);
  }, []);
  return (
    <Pagina hoogte={hoog ? 2400 : undefined}>
      <SiteAgent />
    </Pagina>
  );
}

/** Geopend via de knop: het paneel met de opening van de homepage en de snelle vragen. */
export function Geopend() {
  useSchoneSessie();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(
    () =>
      wachtOp(
        () => ref.current?.querySelector<HTMLButtonElement>('button.agent-knop'),
        (knop) => knop.click(),
      ),
    [],
  );
  return (
    <div ref={ref}>
      <Pagina>
        <SiteAgent />
      </Pagina>
    </div>
  );
}
