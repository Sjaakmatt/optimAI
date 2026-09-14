'use client';

// De mailagent, live in de hero. Geen video: dit is de echte UI die een mail
// binnen ziet komen, de systemen raadpleegt, een overweging maakt en het
// antwoord schrijft. Alles gescript, uit dezelfde bron als de Werkbank-demo.
//
// Afspelen begint zodra het venster in beeld is. Klikt de bezoeker op een
// andere mail, dan begint die meteen. Met reduced motion staat elke mail er
// direct compleet.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Check,
  CreditCard,
  FileText,
  Inbox,
  Package,
  Pencil,
  Send,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { MAIL_CASES, type MailCase, type MailStap } from '@/lib/mailagent/cases';
import type { CheckTone } from '@/lib/types';

type Fase = 'wachten' | 'lezen' | 'werken' | 'schrijven' | 'klaar' | 'verstuurd';

interface Afspeelstand {
  fase: Fase;
  stappen: number; // aantal zichtbare stappen
  tekens: number; // aantal getypte tekens van het antwoord
}

const BEGIN: Afspeelstand = { fase: 'wachten', stappen: 0, tekens: 0 };

const TOON_ICOON: Record<CheckTone, typeof UserRound> = {
  dossier: UserRound,
  policy: ShieldCheck,
  inventory: Package,
  log: FileText,
  credit: CreditCard,
  pricing: CreditCard,
  planning: FileText,
};

function totaalTekens(c: MailCase): number {
  return c.antwoord.alineas.reduce((n, a) => n + a.length + 1, 0);
}

export function MailAgent({ autoplay = true }: { autoplay?: boolean }) {
  const reduced = useReducedMotion() ?? false;
  const [actief, setActief] = useState(0);
  const [stand, setStand] = useState<Afspeelstand>(BEGIN);
  const [afgehandeld, setAfgehandeld] = useState<string[]>([]);
  const [inBeeld, setInBeeld] = useState(false);
  const wortelRef = useRef<HTMLDivElement>(null);
  const middenRef = useRef<HTMLDivElement>(null);
  const cases = MAIL_CASES;
  const huidige = cases[actief];
  const totaal = useMemo(() => totaalTekens(huidige), [huidige]);

  // In beeld? Dan pas afspelen; de hero moet niet al klaar zijn voordat
  // iemand gekeken heeft.
  useEffect(() => {
    const el = wortelRef.current;
    if (!el || !autoplay) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setInBeeld(true);
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [autoplay]);

  // Het afspelen zelf: één keten van timers per mail, netjes opgeruimd zodra
  // de bezoeker een andere mail kiest.
  useEffect(() => {
    if (!inBeeld && autoplay) return;
    if (reduced) {
      setStand({ fase: 'klaar', stappen: huidige.stappen.length, tekens: totaal });
      return;
    }

    let gestopt = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (ms: number, fn: () => void) => {
      const t = setTimeout(() => {
        if (!gestopt) fn();
      }, ms);
      timers.push(t);
    };

    setStand({ fase: 'lezen', stappen: 0, tekens: 0 });
    let t = 1100;
    later(t, () => setStand((s) => ({ ...s, fase: 'werken' })));
    huidige.stappen.forEach((stap, i) => {
      t += stap.kind === 'reasoning' ? 1250 : 950;
      later(t, () => setStand((s) => ({ ...s, stappen: i + 1 })));
    });
    t += 900;
    later(t, () => {
      setStand((s) => ({ ...s, fase: 'schrijven' }));
      let tekens = 0;
      const interval = setInterval(() => {
        if (gestopt) {
          clearInterval(interval);
          return;
        }
        tekens += 3;
        if (tekens >= totaal) {
          clearInterval(interval);
          setStand({ fase: 'klaar', stappen: huidige.stappen.length, tekens: totaal });
        } else {
          setStand((s) => ({ ...s, tekens }));
        }
      }, 16);
      timers.push(interval as unknown as ReturnType<typeof setTimeout>);
    });

    return () => {
      gestopt = true;
      for (const timer of timers) {
        clearTimeout(timer);
        clearInterval(timer as unknown as ReturnType<typeof setInterval>);
      }
    };
  }, [actief, huidige, inBeeld, autoplay, reduced, totaal]);

  // Het middenpaneel scrolt mee met de stappen.
  useEffect(() => {
    const el = middenRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reduced ? 'auto' : 'smooth' });
  }, [stand.stappen, stand.fase, reduced]);

  const kies = useCallback((i: number) => {
    setActief(i);
    setInBeeld(true);
    setStand(BEGIN);
  }, []);

  const verstuur = useCallback(() => {
    setStand((s) => ({ ...s, fase: 'verstuurd' }));
    setAfgehandeld((lijst) => (lijst.includes(huidige.id) ? lijst : [...lijst, huidige.id]));
    const volgende = cases.findIndex((c, i) => i !== actief && !afgehandeld.includes(c.id));
    if (volgende >= 0) {
      setTimeout(() => kies(volgende), 1500);
    }
  }, [actief, afgehandeld, cases, huidige.id, kies]);

  const bespaardTotaal = cases
    .filter((c) => afgehandeld.includes(c.id))
    .reduce((n, c) => n + c.minutenBespaard, 0);

  return (
    <div ref={wortelRef} className="venster text-[13px] text-[var(--fg)]" data-mailagent>
      {/* Titelbalk */}
      <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-2.5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="font-mono text-[11px] text-[var(--fg-faint)] truncate">
            klantenservice@vonk.nl · Inbox
          </div>
        </div>
        <StatusPil fase={stand.fase} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)_300px] lg:grid-cols-[240px_minmax(0,1fr)_320px]">
        {/* Inbox */}
        <aside className="border-b md:border-b-0 md:border-r border-[var(--border)]">
          <div className="hidden md:flex items-center gap-2 px-4 pt-4 pb-2 text-[var(--fg-faint)]">
            <Inbox size={13} strokeWidth={1.8} />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.14em]">Binnengekomen</span>
          </div>
          <ul className="flex md:block overflow-x-auto md:overflow-visible px-2 py-2 gap-1.5 md:gap-0 md:space-y-0.5">
            {cases.map((c, i) => {
              const isActief = i === actief;
              const klaar = afgehandeld.includes(c.id);
              return (
                <li key={c.id} className="shrink-0 md:shrink w-[220px] md:w-auto">
                  <button
                    type="button"
                    onClick={() => kies(i)}
                    aria-pressed={isActief}
                    className={`w-full text-left rounded-[12px] px-3 py-2.5 transition-colors ${
                      isActief ? 'bg-[var(--surface-2)]' : 'hover:bg-[var(--surface)]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[10.5px] font-medium ${
                          klaar ? 'bg-[rgba(155,178,131,0.18)] text-[var(--sage)]' : 'bg-[var(--surface-2)] text-[var(--fg-dim)]'
                        }`}
                      >
                        {klaar ? <Check size={12} strokeWidth={2.2} /> : c.afzender.initialen}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className={`truncate text-[12.5px] ${isActief ? 'text-[var(--fg)]' : 'text-[var(--fg-dim)]'}`}>
                            {c.afzender.naam}
                          </span>
                          <span className="font-mono text-[10px] text-[var(--fg-faint)] shrink-0">{c.ontvangen}</span>
                        </div>
                        <div className={`truncate text-[12px] ${isActief ? 'text-[var(--fg-dim)]' : 'text-[var(--fg-faint)]'}`}>
                          {c.onderwerp}
                        </div>
                      </div>
                      {!klaar && !isActief && (
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="hidden md:block mx-4 mt-3 mb-4 rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5">
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--fg-faint)]">Vandaag</div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="font-display text-[20px] text-[var(--fg)]">{afgehandeld.length}</span>
              <span className="text-[11.5px] text-[var(--fg-dim)]">afgehandeld</span>
            </div>
            <div className="text-[11.5px] text-[var(--fg-faint)]">{bespaardTotaal} min werk bespaard</div>
          </div>
        </aside>

        {/* Mail + agent aan het werk */}
        <div ref={middenRef} className="relative max-h-[420px] md:max-h-[520px] overflow-y-auto px-4 py-4 sm:px-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={huidige.id}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--surface-2)] text-[12px] font-medium text-[var(--fg-dim)]">
                  {huidige.afzender.initialen}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <span className="text-[13.5px] text-[var(--fg)]">{huidige.afzender.naam}</span>
                    <span className="font-mono text-[10.5px] text-[var(--fg-faint)]">Vandaag · {huidige.ontvangen}</span>
                  </div>
                  <div className="text-[12px] text-[var(--fg-faint)]">{huidige.afzender.email}</div>
                </div>
              </div>
              <h3 className="mt-3 text-[15px] font-medium leading-snug text-[var(--fg)]">{huidige.onderwerp}</h3>
              <div className="mt-2 space-y-2 text-[13px] leading-[1.6] text-[var(--fg-dim)]">
                {huidige.body.map((regel, i) => (
                  <p key={i}>{regel}</p>
                ))}
              </div>

              {/* De agent */}
              <div className="mt-5 rounded-[14px] border border-[var(--border)] bg-[var(--surface)] p-3.5">
                <div className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-text)]">
                    <Sparkles size={12} strokeWidth={2} />
                  </span>
                  <span className="text-[12.5px] text-[var(--fg)]">Agent</span>
                  <span className="text-[11.5px] text-[var(--fg-faint)]">
                    {stand.fase === 'lezen' && 'leest de mail'}
                    {stand.fase === 'werken' && 'zoekt op en toetst uw beleid'}
                    {stand.fase === 'schrijven' && 'schrijft het antwoord'}
                    {(stand.fase === 'klaar' || stand.fase === 'verstuurd') && 'klaar · wacht op uw akkoord'}
                    {stand.fase === 'wachten' && 'staat klaar'}
                  </span>
                  {(stand.fase === 'lezen' || stand.fase === 'werken' || stand.fase === 'schrijven') && (
                    <span className="ml-auto flex gap-1" aria-hidden>
                      <span className="agent-punt h-1.5 w-1.5 rounded-full bg-[var(--accent)]" style={{ animationDelay: '0ms' }} />
                      <span className="agent-punt h-1.5 w-1.5 rounded-full bg-[var(--accent)]" style={{ animationDelay: '150ms' }} />
                      <span className="agent-punt h-1.5 w-1.5 rounded-full bg-[var(--accent)]" style={{ animationDelay: '300ms' }} />
                    </span>
                  )}
                </div>
                <ol className="mt-3 space-y-2" aria-live="polite">
                  {huidige.stappen.slice(0, stand.stappen).map((stap, i) => (
                    <StapRegel key={i} stap={stap} reduced={reduced} />
                  ))}
                </ol>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Conceptantwoord */}
        <aside className="border-t md:border-t-0 md:border-l border-[var(--border)] flex flex-col">
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <div className="flex items-center gap-2 text-[var(--fg-faint)]">
              <Pencil size={13} strokeWidth={1.8} />
              <span className="font-mono text-[10.5px] uppercase tracking-[0.14em]">Conceptantwoord</span>
            </div>
            {stand.fase === 'klaar' && (
              <span className="font-mono text-[10px] text-[var(--sage)]">{huidige.minutenBespaard} min bespaard</span>
            )}
          </div>
          <div className="px-4 flex-1 min-h-[220px]">
            {stand.fase === 'wachten' || stand.fase === 'lezen' || stand.fase === 'werken' ? (
              <div className="h-full rounded-[12px] border border-dashed border-[var(--border)] px-3 py-4 text-[12px] leading-[1.6] text-[var(--fg-faint)]">
                Het antwoord verschijnt hier zodra de agent alles heeft opgezocht.
              </div>
            ) : (
              <Antwoord c={huidige} tekens={stand.tekens} typend={stand.fase === 'schrijven'} />
            )}
          </div>
          <div className="px-4 pb-4 pt-3">
            {stand.fase === 'verstuurd' ? (
              <div className="flex items-center gap-2 rounded-full bg-[rgba(155,178,131,0.14)] px-4 py-2.5 text-[12.5px] text-[var(--sage)]">
                <Check size={14} strokeWidth={2.2} />
                Verstuurd door u · {huidige.minutenBespaard} min bespaard
              </div>
            ) : (
              <button
                type="button"
                onClick={verstuur}
                disabled={stand.fase !== 'klaar'}
                className={`knop w-full !py-[0.7rem] ${stand.fase === 'klaar' ? 'knop-primair' : 'knop-glas opacity-50 cursor-not-allowed'}`}
              >
                <Send size={14} strokeWidth={2} />
                Goedkeuren en versturen
              </button>
            )}
            <p className="mt-2 text-center text-[10.5px] leading-[1.5] text-[var(--fg-faint)]">
              Niets gaat de deur uit zonder een mens.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function StatusPil({ fase }: { fase: Fase }) {
  const actief = fase === 'lezen' || fase === 'werken' || fase === 'schrijven';
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--fg-dim)]">
      <span
        className={`h-1.5 w-1.5 rounded-full ${actief ? 'bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]' : 'bg-[var(--sage)]'}`}
        aria-hidden
      />
      {actief ? 'Agent werkt' : 'Agent actief'}
    </span>
  );
}

function StapRegel({ stap, reduced }: { stap: MailStap; reduced: boolean }) {
  const anim = reduced
    ? {}
    : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease: 'easeOut' as const } };
  if (stap.kind === 'reasoning') {
    return (
      <motion.li {...anim} className="rounded-[10px] border-l-2 border-[var(--accent)] bg-[var(--accent-soft)] px-3 py-2 text-[12.5px] leading-[1.55] text-[var(--fg-dim)]">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--accent-text)]">Overweging</span>
        <div className="mt-0.5">{stap.text}</div>
      </motion.li>
    );
  }
  const Icoon = TOON_ICOON[stap.tone] ?? FileText;
  return (
    <motion.li {...anim} className="flex items-start gap-2.5">
      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--surface-2)] text-[var(--fg-dim)]">
        <Icoon size={11} strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <div className="text-[12px] text-[var(--fg)]">{stap.label}</div>
        <div className="text-[12px] leading-[1.5] text-[var(--fg-faint)]">{stap.value}</div>
      </div>
      <Check size={12} strokeWidth={2.2} className="ml-auto mt-1 shrink-0 text-[var(--sage)]" />
    </motion.li>
  );
}

function Antwoord({ c, tekens, typend }: { c: MailCase; tekens: number; typend: boolean }) {
  let rest = tekens;
  const alineas = c.antwoord.alineas.map((a) => {
    if (rest <= 0) return '';
    const deel = a.slice(0, rest);
    rest -= a.length + 1;
    return deel;
  });
  return (
    <div className="text-[12.5px] leading-[1.6] text-[var(--fg-dim)]">
      <div className="mb-3 space-y-0.5 border-b border-[var(--border)] pb-2.5 font-mono text-[10.5px] text-[var(--fg-faint)]">
        <div>
          <span className="text-[var(--fg-faint)]">Aan </span>
          <span className="text-[var(--fg-dim)]">{c.antwoord.aan}</span>
        </div>
        <div>
          <span className="text-[var(--fg-faint)]">Onderwerp </span>
          <span className="text-[var(--fg-dim)]">{c.antwoord.onderwerp}</span>
        </div>
      </div>
      <div className="space-y-2.5 whitespace-pre-line">
        {alineas.map((a, i) =>
          a ? (
            <p key={i}>
              {a}
              {typend && i === alineas.findIndex((x, j) => j >= i && (x.length < c.antwoord.alineas[j].length || j === alineas.length - 1)) && (
                <span className="ml-0.5 inline-block h-[13px] w-[2px] translate-y-[2px] bg-[var(--accent)] align-baseline" aria-hidden />
              )}
            </p>
          ) : null,
        )}
      </div>
    </div>
  );
}
