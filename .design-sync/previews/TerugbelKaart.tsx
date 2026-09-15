import { useEffect, useRef } from 'react';
import { TerugbelKaart } from 'factumai-demo';

/** Zo verschijnt de kaart in het gesprek: de vraag, met ja en liever niet. */
export function Vraag() {
  return (
    <div style={{ maxWidth: 360 }}>
      <TerugbelKaart sessionId="demo-sessie" aanleiding="Vraag over mailafhandeling" opAfgewezen={() => {}} />
    </div>
  );
}

/** Na "Ja, graag": het formulier met naam, mail, telefoon en de vaste toestemmingstekst. */
export function Formulier() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const knop = ref.current?.querySelector<HTMLButtonElement>('button');
    knop?.click();
  }, []);
  return (
    <div ref={ref} style={{ maxWidth: 360 }}>
      <TerugbelKaart sessionId="demo-sessie" aanleiding="Offerte voor een orderagent" opAfgewezen={() => {}} />
    </div>
  );
}

/** In de context van het agentpaneel: een berichtbubbel erboven, de kaart eronder. */
export function InGesprek() {
  return (
    <div className="space-y-3" style={{ maxWidth: 360 }}>
      <div className="rounded-[14px] bg-[var(--surface-2)] px-3.5 py-3 text-[14px] leading-[1.6] text-[var(--fg)]">
        Dat kan ik uitzoeken. Het snelst is als een collega je even belt.
      </div>
      <TerugbelKaart sessionId="demo-sessie" aanleiding="Terugbelverzoek vanuit chat" opAfgewezen={() => {}} />
    </div>
  );
}
