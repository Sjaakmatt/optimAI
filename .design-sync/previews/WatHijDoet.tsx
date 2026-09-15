import { useEffect, useRef } from 'react';
import { WatHijDoet } from 'factumai-demo';

/** Kiest na het mounten een van de drie tabs, zoals een bezoeker erop klikt. */
function useTab(ref: React.RefObject<HTMLDivElement | null>, index: number) {
  useEffect(() => {
    ref.current?.querySelector<HTMLButtonElement>(`[id="practice-tab-${index}"]`)?.click();
  }, [ref, index]);
}

/** Zoals op de homepage: de eerste stap (klantenservice) actief, het agentvenster rechts. */
export function Klantenservice() {
  return (
    <div className="home-world">
      <div className="home-practice">
        <WatHijDoet />
      </div>
    </div>
  );
}

/** De tweede stap gekozen: een offerte die blijft liggen, de opvolgmail klaar voor akkoord. */
export function Opvolging() {
  const ref = useRef<HTMLDivElement>(null);
  useTab(ref, 1);
  return (
    <div ref={ref} className="home-world">
      <div className="home-practice">
        <WatHijDoet />
      </div>
    </div>
  );
}

/** De derde stap gekozen: een bestelling per PDF die als conceptorder in het ERP staat. */
export function OrdersEnSystemen() {
  const ref = useRef<HTMLDivElement>(null);
  useTab(ref, 2);
  return (
    <div ref={ref} className="home-world">
      <div className="home-practice">
        <WatHijDoet />
      </div>
    </div>
  );
}
