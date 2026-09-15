import { useEffect, useRef, useState } from 'react';
import { AgentPaneel } from 'factumai-demo';
import { openingVoorPad } from '@/lib/site-agent/haakjes';

// Het paneel praat met /api/v1/site-agent/chat, een SSE-stroom. Die is hier
// niet, dus elke cel zet vooraf één antwoord klaar in precies dat formaat
// (data: {...}\n\n). De cellen sturen na het openen zelf de eerste snelle
// vraag, zoals een bezoeker die op een chip klikt.

type Antwoord =
  | { soort: 'tekst'; tekst: string; signaal?: { naam: string; payload: Record<string, unknown> } }
  | { soort: 'afspraak'; tekst: string }
  | { soort: 'storing' };

const PAD = '/branches/installatietechniek';
const SESSIE = 'preview-3f1c';

const wachtrij: Antwoord[] = [];
let geinstalleerd = false;

function sse(events: object[]) {
  const body = events.map((e) => `data: ${JSON.stringify(e)}\n\n`).join('');
  return new Response(body, { status: 200, headers: { 'Content-Type': 'text/event-stream' } });
}

function installeerChat() {
  if (geinstalleerd || typeof window === 'undefined') return;
  geinstalleerd = true;
  const origineel = window.fetch.bind(window);
  window.fetch = (input, init) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    if (!url.includes('/api/v1/site-agent/chat')) return origineel(input, init);
    const antwoord = wachtrij.shift() ?? { soort: 'storing' as const };
    if (antwoord.soort === 'storing') return Promise.reject(new TypeError('Failed to fetch'));
    if (antwoord.soort === 'afspraak') {
      return Promise.resolve(
        new Response(JSON.stringify({ error: antwoord.tekst, actie: 'afspraak' }), {
          status: 409,
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    }
    const events: object[] = antwoord.tekst.split(/(?<=\. )/).map((tekst) => ({ type: 'delta', tekst }));
    if (antwoord.signaal) events.push({ type: 'signaal', naam: antwoord.signaal.naam, payload: antwoord.signaal.payload });
    events.push({ type: 'klaar' });
    return Promise.resolve(sse(events));
  };
}

function useAntwoord(antwoord: Antwoord | null) {
  useState(() => {
    installeerChat();
    if (antwoord) wachtrij.push(antwoord);
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

/** Klikt de eerste snelle vraag aan zodra die er staat. */
function useKlikStarter(ref: React.RefObject<HTMLDivElement | null>, tekst: string) {
  useEffect(
    () =>
      wachtOp(
        () => Array.from(ref.current?.querySelectorAll<HTMLButtonElement>('button.rounded-full') ?? []).find((b) => b.textContent?.trim() === tekst),
        (knop) => knop.click(),
      ),
    [ref, tekst],
  );
}

/** De branchepagina waar het paneel rechtsonder boven hangt. Vult de cel, zodat het vaste paneel een hoek heeft. */
function Pagina({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: 'calc(100vh - 96px)' }}>
      <div className="eyebrow">Installatietechniek</div>
      <h1 className="mt-3 text-[34px] leading-[1.1] font-display" style={{ maxWidth: 420 }}>
        Werkbonnen die zichzelf verwerken.
      </h1>
      <p className="mt-4 max-w-[40ch] text-[16px] leading-[1.6] text-[var(--fg-dim)]">
        De agent leest de bon, zoekt het materiaal op en zet de uren in het pakket. De monteur kijkt het na en is klaar.
      </p>
      {children}
    </div>
  );
}

function Paneel() {
  return (
    <AgentPaneel sessionId={SESSIE} paginaPad={PAD} playbook="branche" opening={openingVoorPad(PAD)} onSluiten={() => {}} />
  );
}

/** Net geopend op een branchepagina: de openingszin, de snelle vragen en de verplichte AI-regel onderin. */
export function Opening() {
  useAntwoord(null);
  return (
    <Pagina>
      <Paneel />
    </Pagina>
  );
}

/** Een lopend gesprek: de bezoeker koos een snelle vraag, de agent vraagt door. */
export function Gesprek() {
  useAntwoord({
    soort: 'tekst',
    tekst:
      "Herkenbaar. Bij installateurs zit het meestal in de bon die 's avonds nog van papier of uit de app in het pakket moet. Hoe komen die bonnen bij jullie nu binnen: op papier, in een app, of allebei?",
  });
  const ref = useRef<HTMLDivElement>(null);
  useKlikStarter(ref, 'Werkbonnen verwerken');
  return (
    <div ref={ref}>
      <Pagina>
        <Paneel />
      </Pagina>
    </div>
  );
}

/** De agent geeft het signaal 'terugbellen': onder zijn antwoord verschijnt de terugbelkaart. */
export function Terugbelaanbod() {
  useAntwoord({
    soort: 'tekst',
    tekst: 'Dat hangt af van hoe jullie pakket de bonnen aanneemt. Het snelst is als een collega je even belt en meekijkt.',
    signaal: { naam: 'terugbellen', payload: { aanleiding: 'Werkbonnen verwerken bij een installatiebedrijf' } },
  });
  const ref = useRef<HTMLDivElement>(null);
  useKlikStarter(ref, 'Materiaal bestellen');
  return (
    <div ref={ref}>
      <Pagina>
        <Paneel />
      </Pagina>
    </div>
  );
}

/** Afgerond: de agent sluit af met een laatste bericht en de knop naar de agenda; het invoerveld gaat dicht. */
export function Afgerond() {
  useAntwoord({
    soort: 'afspraak',
    tekst: 'Dan is een gesprek van twintig minuten de snelste route. Kies hieronder een moment dat jou uitkomt.',
  });
  const ref = useRef<HTMLDivElement>(null);
  useKlikStarter(ref, 'Werkbonnen verwerken');
  return (
    <div ref={ref}>
      <Pagina>
        <Paneel />
      </Pagina>
    </div>
  );
}

/** Storing: het bericht kwam niet aan, de agent zegt dat netjes en de bezoeker kan het nog eens proberen. */
export function Storing() {
  useAntwoord({ soort: 'storing' });
  const ref = useRef<HTMLDivElement>(null);
  useKlikStarter(ref, 'Iets anders');
  return (
    <div ref={ref}>
      <Pagina>
        <Paneel />
      </Pagina>
    </div>
  );
}
