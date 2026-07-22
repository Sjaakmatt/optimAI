'use client';

import { useRef, useState, type ComponentType } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { useGSAP } from '@gsap/react';
import { HOOFDSTUKKEN } from '../film-content';
import { DRUPPEL_STATEN } from './druppel';
import {
  LaagMaandag,
  LaagCollega,
  LaagDenkt,
  LaagLevert,
  LaagStuur,
  LaagGrenzen,
  LaagBegin,
  type LaagProps,
} from './hoofdstukken';
import { useInstellingen } from './instellingen';
import { speelStap, speelMoment } from './geluid';
import { EASE_UIT, DUUR, STAGGER } from './tokens';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, MorphSVGPlugin);

/**
 * Het verhaal van /ontdek: één inktdruppel als hoofdrolspeler, gescrubd
 * aan de scroll. De druppel morpht per hoofdstuk van gedaante (chaos ->
 * collega -> denken -> document -> grens -> stilte -> goud zegel),
 * terwijl korte tekstpanelen voorbij komen. Kalm basisbeeld, één
 * verandering per beat, goud verschijnt pas bij het slot.
 *
 * In de rustige modus (prefers-reduced-motion of "Animaties uit") staan
 * de zeven hoofdstukken statisch en compleet onder elkaar.
 */

const LAGEN: ComponentType<LaagProps>[] = [
  LaagMaandag,
  LaagCollega,
  LaagDenkt,
  LaagLevert,
  LaagStuur,
  LaagGrenzen,
  LaagBegin,
];

const N = HOOFDSTUKKEN.length;
const SEGMENT_SVH = 180;
const REIS = 0.34; // eerste deel van elk segment: de druppel transformeert

export function Wandeling() {
  const { rustig } = useInstellingen();
  return rustig ? <VerhaalRustig /> : <VerhaalScroll />;
}

/* ------------------------------------------------------------------ */
/* Scroll-gedreven verhaal                                             */
/* ------------------------------------------------------------------ */

function VerhaalScroll() {
  const { geluidAan } = useInstellingen();
  const containerRef = useRef<HTMLDivElement>(null);
  const padRef = useRef<SVGPathElement>(null);
  const wrapRef = useRef<SVGGElement>(null);
  const ademRef = useRef<SVGGElement>(null);
  const zegelRef = useRef<SVGCircleElement>(null);

  const [stop, setStop] = useState(0);
  const [beat, setBeat] = useState(0);
  const stopRef = useRef(0);
  const beatRef = useRef(0);

  useGSAP(
    () => {
      // de druppel ademt: nauwelijks zichtbaar, maar hij leeft
      gsap.to(ademRef.current, {
        scaleX: 1.012,
        scaleY: 0.988,
        rotation: 0.6,
        transformOrigin: '200px 220px',
        duration: 3.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      // de morph-tijdlijn van de druppel, gescrubd aan de container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });
      tl.to({}, { duration: REIS }); // rustpunt op hoofdstuk 1
      for (let i = 1; i < N; i++) {
        const s = DRUPPEL_STATEN[i];
        tl.to(
          padRef.current,
          { morphSVG: s.d, fill: s.fill, duration: REIS, ease: 'power2.inOut' },
          i,
        );
        tl.to(
          wrapRef.current,
          { x: s.x, y: s.y, scale: s.scale, duration: REIS, ease: 'power2.inOut' },
          i,
        );
      }
      // het zegelrandje tekent zich pas bij het slot
      tl.fromTo(
        zegelRef.current,
        { drawSVG: '0%', opacity: 1 },
        { drawSVG: '100%', duration: 0.5, ease: 'power2.out' },
        N - 1 + 0.1,
      );
      tl.to({}, { duration: 1 - REIS }, N - 1 + REIS); // rust op het slot
      tl.duration(N);

      // hoofdstuk- en beat-status voor de lagen
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const p = self.progress;
          const s = Math.min(N - 1, Math.floor(p * N));
          const lokaal = p * N - s;
          const naReis = s === 0 ? lokaal : Math.max(0, (lokaal - REIS) / (1 - REIS));
          const beats = HOOFDSTUKKEN[s].beats;
          const b = Math.min(beats, Math.floor((naReis / 0.75) * (beats + 1)));
          if (s !== stopRef.current) {
            stopRef.current = s;
            setStop(s);
            speelStap(geluidAan);
            if (s === 4) speelMoment(geluidAan);
          }
          if (b !== beatRef.current) {
            beatRef.current = b;
            setBeat(b);
          }
        },
      });
      return () => st.kill();
    },
    { scope: containerRef, dependencies: [geluidAan] },
  );

  const Laag = LAGEN[stop];
  const hoofdstuk = HOOFDSTUKKEN[stop];

  return (
    <div ref={containerRef} className="relative" style={{ height: `${N * SEGMENT_SVH}svh` }}>
      {/* de sticky stage */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* zacht watermerk dat nét langzamer beweegt: voelbare, onzichtbare diepte */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 55% 42% at 50% 48%, var(--oker) 0%, transparent 65%)',
          }}
        />
        {/* het domein van de druppel: gecentreerd, op desktop links van de panelen */}
        <div className="absolute inset-0 lg:right-[430px]">
          <svg
            viewBox="0 0 400 400"
            className="absolute inset-0 m-auto h-[min(74vh,560px)] w-auto"
            aria-hidden
            focusable="false"
          >
            {/* rimpel bij aankomst op een nieuw hoofdstuk */}
            <motion.circle
              key={stop}
              cx={200}
              cy={220}
              fill="none"
              stroke="var(--ink-faint)"
              strokeWidth={1}
              initial={{ r: 70, opacity: 0.5 }}
              animate={{ r: 150, opacity: 0 }}
              transition={{ duration: 1.3, ease: 'easeOut' }}
            />
            <g ref={wrapRef} style={{ transformOrigin: '200px 220px' }}>
              <g ref={ademRef}>
                {/* het zegelrandje (alleen zichtbaar bij het slot) */}
                <circle
                  ref={zegelRef}
                  cx={200}
                  cy={206}
                  r={86}
                  fill="none"
                  stroke="var(--oker-deep)"
                  strokeWidth={1.6}
                  strokeDasharray="10 6"
                  strokeLinecap="round"
                  opacity={0}
                />
                <path ref={padRef} d={DRUPPEL_STATEN[0].d} fill={DRUPPEL_STATEN[0].fill} />
                {/* glansaccent: de druppel is nat */}
                <ellipse cx={172} cy={190} rx={16} ry={9} fill="var(--paper)" opacity={0.14} transform="rotate(-24 172 190)" />
              </g>
            </g>
          </svg>
          {/* de laag van het actieve hoofdstuk */}
          <Laag key={hoofdstuk.id} beat={beat} reduced={false} actief />
        </div>
      </div>

      {/* de tekstpanelen */}
      <div className="pointer-events-none absolute inset-0">
        {HOOFDSTUKKEN.map((h, i) => (
          <div
            key={h.id}
            className="flex items-center justify-center px-5 lg:justify-end lg:pr-[6vw]"
            style={{ height: `${SEGMENT_SVH}svh` }}
          >
            <Paneel index={i} />
          </div>
        ))}
      </div>

      <VoortgangsRail stop={stop} containerRef={containerRef} />
    </div>
  );
}

/** Tekstpaneel: kop per woord, body als één rustige fade. */
function Paneel({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const h = HOOFDSTUKKEN[index];

  useGSAP(
    () => {
      const titel = ref.current?.querySelector('h2');
      if (!titel) return;
      const split = SplitText.create(titel, { type: 'words' });
      gsap.from(split.words, {
        yPercent: 110,
        opacity: 0,
        duration: DUUR.hoofdstuk,
        ease: EASE_UIT,
        stagger: STAGGER,
        scrollTrigger: { trigger: ref.current, start: 'top 76%' },
      });
      gsap.from(ref.current!.querySelectorAll('[data-regel]'), {
        y: 14,
        opacity: 0,
        duration: DUUR.paneel,
        ease: EASE_UIT,
        stagger: 0.09,
        delay: 0.12,
        scrollTrigger: { trigger: ref.current, start: 'top 76%' },
      });
      const lijn = ref.current!.querySelector<SVGPathElement>('[data-lijn] path');
      if (lijn) {
        gsap.fromTo(
          lijn,
          { drawSVG: '0%' },
          {
            drawSVG: '100%',
            duration: DUUR.hoofdstuk,
            ease: EASE_UIT,
            scrollTrigger: { trigger: ref.current, start: 'top 72%' },
          },
        );
      }
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="pointer-events-auto w-full max-w-[400px]">
      <div className="border-l border-[var(--paper-edge)] pl-6 lg:bg-transparent">
        <div data-regel className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--oker-deep)]">
          {h.eyebrow}
        </div>
        <h2 className="mt-3 overflow-hidden font-display text-[30px] sm:text-[36px] leading-[1.08] tracking-tight text-[var(--ink)]">
          {h.titel} <span className="italic text-[var(--oker-deep)]">{h.titelAccent}</span>
        </h2>
        <svg data-lijn viewBox="0 0 140 10" className="mt-3 w-[120px]" aria-hidden focusable="false">
          <path
            d="M2 6 C 34 2, 66 9, 98 5 C 114 3, 126 6, 138 4"
            fill="none"
            stroke="var(--oker)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
        <p data-regel className="mt-3 text-[14px] sm:text-[15px] leading-[1.7] text-[var(--ink-dim)]">
          {h.body}
        </p>
      </div>
    </div>
  );
}

/** Vaste voortgangsrail; klikbaar en keyboard-bedienbaar. */
function VoortgangsRail({
  stop,
  containerRef,
}: {
  stop: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  function naar(i: number) {
    const el = containerRef.current;
    if (!el) return;
    const top = el.offsetTop + ((i + 0.6) / N) * el.offsetHeight - window.innerHeight * 0.5;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number) => void } }).__lenis;
    if (lenis) lenis.scrollTo(top);
    else window.scrollTo({ top, behavior: 'smooth' });
  }

  return (
    <nav
      aria-label="Hoofdstukken"
      className="fixed left-5 top-1/2 z-20 hidden -translate-y-1/2 lg:flex flex-col gap-1"
    >
      {HOOFDSTUKKEN.map((h, i) => (
        <button
          key={h.id}
          type="button"
          onClick={() => naar(i)}
          aria-label={h.eyebrow}
          aria-current={i === stop ? 'step' : undefined}
          className="group flex items-center gap-2 py-1"
        >
          <span
            aria-hidden
            className="font-mono text-[9px] tabular-nums transition-colors duration-300"
            style={{ color: i === stop ? 'var(--oker-deep)' : 'var(--ink-faint)' }}
          >
            {h.nummer}
          </span>
          <span
            aria-hidden
            className="block h-px transition-all duration-300 group-hover:bg-[var(--oker)]"
            style={{
              width: i === stop ? 26 : 12,
              background: i <= stop ? 'var(--oker)' : 'var(--paper-edge)',
            }}
          />
        </button>
      ))}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Rustige variant: statische, complete hoofdstukken                   */
/* ------------------------------------------------------------------ */

function VerhaalRustig() {
  return (
    <div className="mx-auto w-full max-w-[1080px] px-5 sm:px-8 lg:px-10">
      {HOOFDSTUKKEN.map((h, i) => {
        const Laag = LAGEN[i];
        const staat = DRUPPEL_STATEN[i];
        return (
          <section key={h.id} aria-labelledby={`hoofdstuk-${h.id}`} className="grid grid-cols-1 items-center gap-8 py-12 sm:py-16 lg:grid-cols-2">
            <div className="max-w-[440px]">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--oker-deep)]">
                {h.eyebrow}
              </div>
              <h2
                id={`hoofdstuk-${h.id}`}
                className="mt-3 font-display text-[28px] sm:text-[32px] leading-[1.1] tracking-tight text-[var(--ink)]"
              >
                {h.titel} <span className="italic text-[var(--oker-deep)]">{h.titelAccent}</span>
              </h2>
              <p className="mt-3 text-[14px] leading-[1.7] text-[var(--ink-dim)]">{h.body}</p>
            </div>
            <div className="relative h-[420px]">
              <svg viewBox="0 0 400 400" className="absolute inset-0 m-auto h-full w-auto" aria-hidden focusable="false">
                <g style={{ transform: `translate(${staat.x}px, ${staat.y}px) scale(${staat.scale})`, transformOrigin: '200px 220px' }}>
                  {i === N - 1 && (
                    <circle cx={200} cy={206} r={86} fill="none" stroke="var(--oker-deep)" strokeWidth={1.6} strokeDasharray="10 6" strokeLinecap="round" />
                  )}
                  <path d={staat.d} fill={staat.fill} />
                </g>
              </svg>
              <Laag beat={h.beats} reduced actief />
            </div>
          </section>
        );
      })}
    </div>
  );
}
