import { useEffect, useRef, useState } from 'react';
import { MailAgent } from 'factumai-demo';
import { Uitgeanimeerd } from '../preview-lib/Uitgeanimeerd';

// De mailagent speelt zijn script af met timers zodra hij in beeld is. Een
// foto vangt daar één moment van. Voor de afgeronde toestand gebruikt deze
// preview wat het component zelf al kent: met 'prefers-reduced-motion' staat
// elke mail meteen compleet. De cel zet die voorkeur vóór de eerste render,
// alleen voor zichzelf.

function useReducedMotionAan() {
  useState(() => {
    if (typeof window === 'undefined') return true;
    const origineel = window.matchMedia.bind(window);
    window.matchMedia = (query: string) => {
      if (!query.includes('prefers-reduced-motion')) return origineel(query);
      const lijst = {
        matches: true,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      };
      return lijst as unknown as MediaQueryList;
    };
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

/** Zoals in de hero: zodra het venster in beeld is begint de agent de mail te lezen (een moment uit het afspelen). */
export function AanHetWerk() {
  return (
    <Uitgeanimeerd>
      <MailAgent />
    </Uitgeanimeerd>
  );
}

/** Afgerond: alle stappen en overwegingen staan er, het concept is klaar en wacht op akkoord. */
export function Klaar() {
  useReducedMotionAan();
  return <MailAgent autoplay={false} />;
}

/** Een andere mail gekozen in de inbox: de tweede mail, met haar eigen stappen en concept. */
export function VolgendeMail() {
  useReducedMotionAan();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(
    () =>
      wachtOp(
        () => ref.current?.querySelectorAll<HTMLButtonElement>('aside li button')[1],
        (knop) => knop.click(),
      ),
    [],
  );
  return (
    <div ref={ref}>
      <MailAgent autoplay={false} />
    </div>
  );
}

/** Na 'Goedkeuren en versturen': de mail is afgehandeld, de teller links telt mee. */
export function Verstuurd() {
  useReducedMotionAan();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(
    () =>
      wachtOp(
        () => ref.current?.querySelector<HTMLButtonElement>('button.knop-primair'),
        (knop) => knop.click(),
      ),
    [],
  );
  return (
    <div ref={ref}>
      <MailAgent autoplay={false} />
    </div>
  );
}
