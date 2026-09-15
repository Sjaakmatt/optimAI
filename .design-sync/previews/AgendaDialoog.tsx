import { useEffect, useRef, useState } from 'react';
import { AgendaDialoog } from 'factumai-demo';

// Het venster is een vast, schermvullend overlay. In deze preview ligt het
// boven een stukje pagina, zoals wanneer iemand op "Plan een kennismaking"
// klikt. De agenda erin haalt tijden van /api/v1/agenda/slots; dat antwoord
// wordt hier klaargezet in dezelfde vorm als lib/booking/agenda.ts (zie ook
// de preview van AgendaKiezer).

type Agenda = 'beschikbaar' | 'storing';

const DAGEN = [
  { datum: '2026-09-16', label: 'woensdag 16 september', tijden: ['09:00', '09:30', '11:00', '13:30', '15:00'] },
  { datum: '2026-09-17', label: 'donderdag 17 september', tijden: ['10:00', '10:30', '14:00'] },
  { datum: '2026-09-18', label: 'vrijdag 18 september', tijden: ['09:00', '11:30', '13:00', '16:00'] },
  { datum: '2026-09-21', label: 'maandag 21 september', tijden: ['09:30', '13:00', '14:30', '15:30'] },
  { datum: '2026-09-22', label: 'dinsdag 22 september', tijden: ['10:00', '11:00'] },
].map((d) => ({
  datum: d.datum,
  label: d.label,
  slots: d.tijden.map((t) => ({ start: `${d.datum}T${t}:00+02:00`, end: `${d.datum}T${t}:20+02:00`, label: t })),
}));

const wachtrij: Agenda[] = [];
let geinstalleerd = false;

function installeerAgenda() {
  if (geinstalleerd || typeof window === 'undefined') return;
  geinstalleerd = true;
  const origineel = window.fetch.bind(window);
  window.fetch = (input, init) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    if (url.includes('/api/v1/agenda/slots')) {
      const agenda = wachtrij.shift() ?? 'beschikbaar';
      if (agenda === 'storing') return Promise.reject(new TypeError('Failed to fetch'));
      return Promise.resolve(
        new Response(JSON.stringify({ ok: true, duurMinuten: 20, dagen: DAGEN }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    }
    return origineel(input, init);
  };
}

function useAgenda(agenda: Agenda) {
  useState(() => {
    installeerAgenda();
    wachtrij.push(agenda);
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

/**
 * De pagina waar het venster boven ligt. Vult de hele cel, zodat het vaste
 * overlay iets heeft om zich over te leggen.
 */
function Pagina({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: 'calc(100vh - 96px)' }}>
      <div className="eyebrow">Installatietechniek</div>
      <h1 className="mt-3 text-[34px] leading-[1.1] font-display">Werkbonnen die zichzelf verwerken.</h1>
      <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.6] text-[var(--fg-dim)]">
        De agent leest de bon, zoekt het materiaal op en zet de uren in het pakket. De monteur kijkt het na en is klaar.
      </p>
      {children}
    </div>
  );
}

/** Zo opent het venster vanaf een boekingsknop: gecentreerd, de pagina erachter gedempt. */
export function Open() {
  useAgenda('beschikbaar');
  return (
    <Pagina>
      <AgendaDialoog bron="branche-installatietechniek" onSluiten={() => {}} />
    </Pagina>
  );
}

/** Geopend door de site-agent, met de aanleiding uit het gesprek: na het kiezen van een tijd staat die al ingevuld. */
export function VanuitGesprek() {
  useAgenda('beschikbaar');
  const ref = useRef<HTMLDivElement>(null);
  useEffect(
    () =>
      wachtOp(
        () => Array.from(ref.current?.querySelectorAll<HTMLButtonElement>('.grid button') ?? []).find((b) => b.textContent?.trim() === '13:30'),
        (knop) => knop.click(),
      ),
    [],
  );
  return (
    <div ref={ref}>
      <Pagina>
        <AgendaDialoog bron="site-agent" aanleiding="Werkbonnen die 's avonds nog ingevoerd moeten worden." onSluiten={() => {}} />
      </Pagina>
    </div>
  );
}

/** De agenda antwoordt niet: het venster blijft staan, met de uitwijk naar mail. */
export function Onbereikbaar() {
  useAgenda('storing');
  return (
    <Pagina>
      <AgendaDialoog bron="branche-installatietechniek" onSluiten={() => {}} />
    </Pagina>
  );
}
