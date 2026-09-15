import { useEffect, useRef, useState } from 'react';
import { AgendaKiezer } from 'factumai-demo';

// De agenda haalt zijn tijden van /api/v1/agenda/slots. Dat endpoint bestaat
// hier niet, dus deze preview zet een klein antwoord klaar in dezelfde vorm
// als lib/booking/agenda.ts die maakt (nl-NL, weekdag voluit, tijd hh:mm).
// Elke cel meldt vooraf welk antwoord hij wil; de eerste AgendaKiezer die
// laadt krijgt het eerste antwoord, en zo verder, zodat de cellen elkaar in
// de kaartweergave niet in de weg zitten.

type Agenda = 'beschikbaar' | 'vol' | 'storing' | 'laden';

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

const BEVESTIGING =
  'Ik heb je een mail gestuurd op sanne@vonkinstallaties.nl. Klik op de link erin, dan zet ik woensdag 16 september om 11:00 vast in de agenda.';

const wachtrij: Agenda[] = [];
let geinstalleerd = false;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

function installeerAgenda() {
  if (geinstalleerd || typeof window === 'undefined') return;
  geinstalleerd = true;
  const origineel = window.fetch.bind(window);
  window.fetch = (input, init) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    if (url.includes('/api/v1/agenda/slots')) {
      const agenda = wachtrij.shift() ?? 'beschikbaar';
      if (agenda === 'laden') return new Promise<Response>(() => {});
      if (agenda === 'storing') return Promise.reject(new TypeError('Failed to fetch'));
      return Promise.resolve(json({ ok: true, duurMinuten: 20, dagen: agenda === 'vol' ? [] : DAGEN }));
    }
    if (url.includes('/api/v1/agenda/boeken')) {
      return Promise.resolve(
        json({ ok: true, wachtOpBevestiging: true, moment: 'woensdag 16 september om 11:00', bevestiging: BEVESTIGING }),
      );
    }
    return origineel(input, init);
  };
}

/** Meld vóór de eerste render welk antwoord deze cel wil. */
function useAgenda(agenda: Agenda) {
  useState(() => {
    installeerAgenda();
    wachtrij.push(agenda);
    return true;
  });
}

/** Probeert tot ~1 s lang iets te vinden en doet er dan wat mee. */
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

/** Vult een door React beheerd veld alsof de bezoeker typt. */
function vul(el: HTMLInputElement | HTMLTextAreaElement | null, waarde: string) {
  if (!el) return;
  const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, 'value')?.set?.call(el, waarde);
  el.dispatchEvent(new Event('input', { bubbles: true }));
}

/** Zelfde omlijsting als op /aanvraag: een kader op de ondergrond. */
function Kader({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[14px] border border-[var(--paper-edge)] bg-[var(--paper)] px-6 sm:px-8 py-6" style={{ maxWidth: 540 }}>
      {children}
    </div>
  );
}

function kiesTijd(wortel: HTMLElement | null, tijd: string) {
  return wachtOp(
    () => Array.from(wortel?.querySelectorAll<HTMLButtonElement>('.grid button') ?? []).find((b) => b.textContent?.trim() === tijd),
    (knop) => knop.click(),
  );
}

function vulGegevens(wortel: HTMLElement | null) {
  vul(wortel?.querySelector<HTMLInputElement>('input[autocomplete="name"]') ?? null, 'Sanne de Vries');
  vul(wortel?.querySelector<HTMLInputElement>('input[autocomplete="email"]') ?? null, 'sanne@vonkinstallaties.nl');
  vul(wortel?.querySelector<HTMLInputElement>('input[autocomplete="organization"]') ?? null, 'Vonk Installaties');
}

/** Stap één, zoals op /aanvraag: dagen als tabs, tijden als rooster, duur en Teams erbij. */
export function Kiezen() {
  useAgenda('beschikbaar');
  return (
    <Kader>
      <AgendaKiezer bron="aanvraag" />
    </Kader>
  );
}

/** Stap twee, na het kiezen van 11:00: naam, mail, bedrijf en de aanleiding uit het gesprek voorgevuld. */
export function Gegevens() {
  useAgenda('beschikbaar');
  const ref = useRef<HTMLDivElement>(null);
  useEffect(
    () =>
      kiesTijd(ref.current, '11:00'),
    [],
  );
  useEffect(() => wachtOp(() => ref.current?.querySelector('form'), () => vulGegevens(ref.current)), []);
  return (
    <div ref={ref}>
      <Kader>
        <AgendaKiezer bron="site-agent" aanleiding="Onze werkbonnen worden 's avonds nog met de hand in het pakket overgetypt." />
      </Kader>
    </div>
  );
}

/** Na versturen: de afspraak staat pas vast na de klik in de mail, dus eerst dit. */
export function Klaar() {
  useAgenda('beschikbaar');
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => kiesTijd(ref.current, '11:00'), []);
  useEffect(
    () =>
      wachtOp(
        () => ref.current?.querySelector('form'),
        (form) => {
          vulGegevens(ref.current);
          form.requestSubmit();
        },
      ),
    [],
  );
  return (
    <div ref={ref}>
      <Kader>
        <AgendaKiezer bron="aanvraag" />
      </Kader>
    </div>
  );
}

/** Terwijl de tijden opgehaald worden. */
export function Laden() {
  useAgenda('laden');
  return (
    <Kader>
      <AgendaKiezer bron="aanvraag" />
    </Kader>
  );
}

/** Geen vrije momenten de komende weken. */
export function Vol() {
  useAgenda('vol');
  return (
    <Kader>
      <AgendaKiezer bron="aanvraag" />
    </Kader>
  );
}

/** De agenda antwoordt niet: uitwijk naar mail, met een knop om het nog eens te proberen. */
export function Onbereikbaar() {
  useAgenda('storing');
  return (
    <Kader>
      <AgendaKiezer bron="aanvraag" />
    </Kader>
  );
}
