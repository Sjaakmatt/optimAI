'use client';

import { useRef, useState, type ComponentType } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useGSAP } from '@gsap/react';
import { CHAPTERS, type SceneProps } from '../film-content';
import { SceneBrief } from '../scenes/SceneBrief';
import { SceneDenken } from '../scenes/SceneDenken';
import { SceneMaken } from '../scenes/SceneMaken';
import { SceneSystemen } from '../scenes/SceneSystemen';
import { SceneHek } from '../scenes/SceneHek';
import { SceneTeam } from '../scenes/SceneTeam';
import { SceneOogst } from '../scenes/SceneOogst';
import { WolkenCel, VoorgrondCel } from '../wereld/lagen';
import { Gids, type GidsState } from './Gids';
import { useInstellingen } from './instellingen';
import { speelStap, speelMoment } from './geluid';
import { EASE_UIT, DUUR, STAGGER } from './tokens';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

// 3D-gedachtenveld voor halte 2, alleen client-side en alleen in de buurt
const GedachtenVeld = dynamic(() => import('./GedachtenVeld'), { ssr: false });

/**
 * De wandeling als scroll-verhaal: de getekende wereld hangt sticky in
 * beeld en schuift horizontaal mee met de verticale scroll, terwijl de
 * tekstpanelen van de zeven haltes voorbij komen. De gids loopt zodra
 * er gescrold wordt en wisselt per halte van toestand.
 *
 * In de rustige modus (prefers-reduced-motion of "Animaties uit") is er
 * geen pin en geen scrub: de haltes staan als volwaardige, statische
 * hoofdstukken onder elkaar.
 */

const SCENES: ComponentType<SceneProps>[] = [
  SceneBrief,
  SceneDenken,
  SceneMaken,
  SceneSystemen,
  SceneHek,
  SceneTeam,
  SceneOogst,
];

const GIDS_PER_STOP: GidsState[] = ['leest', 'denkt', 'maakt', 'idle', 'stopt', 'overlegt', 'idle'];

const N = CHAPTERS.length;
const PANEEL_VH = 135;

export function Wandeling() {
  const { rustig } = useInstellingen();
  return rustig ? <WandelingRustig /> : <WandelingScroll />;
}

/* ------------------------------------------------------------------ */
/* Scroll-gedreven variant                                             */
/* ------------------------------------------------------------------ */

function WandelingScroll() {
  const { geluidAan } = useInstellingen();
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const wolkenRef = useRef<HTMLDivElement>(null);
  const voorRef = useRef<HTMLDivElement>(null);

  const [stop, setStop] = useState(0);
  const [beat, setBeat] = useState(0);
  const [walking, setWalking] = useState(false);
  const [geklikt, setGeklikt] = useState<Record<number, boolean>>({});

  const stopRef = useRef(0);
  const beatRef = useRef(0);
  const loopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useGSAP(
    () => {
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const p = self.progress;
          const s = Math.min(N - 1, Math.floor(p * N));
          const lokaal = p * N - s;

          // camera met plateau: reizen in de eerste 38% van een segment,
          // daarna stilstaan precies op de halte terwijl het paneel leest
          const reis = s === 0 ? 1 : Math.min(1, lokaal / 0.38);
          const eased = reis < 0.5 ? 2 * reis * reis : 1 - Math.pow(-2 * reis + 2, 2) / 2;
          const k = s === 0 ? 0 : s - 1 + eased;
          if (stripRef.current) gsap.set(stripRef.current, { xPercent: (-k * 100) / N });
          if (wolkenRef.current) gsap.set(wolkenRef.current, { xPercent: (-k * 0.45 * 100) / N });
          if (voorRef.current) gsap.set(voorRef.current, { xPercent: (-k * 1.3 * 100) / (N + 3) });

          const beats = CHAPTERS[s].beats;
          const naReis = s === 0 ? lokaal : Math.max(0, (lokaal - 0.38) / 0.62);
          const b = Math.min(beats, Math.floor((naReis / 0.8) * (beats + 1)));

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

          if (Math.abs(self.getVelocity()) > 40) {
            setWalking(true);
            if (loopTimer.current) clearTimeout(loopTimer.current);
            loopTimer.current = setTimeout(() => setWalking(false), 220);
          }
        },
      });
      return () => st.kill();
    },
    { scope: containerRef, dependencies: [geluidAan] },
  );

  return (
    <div ref={containerRef} className="relative" style={{ height: `${N * PANEEL_VH}vh` }}>
      {/* de sticky wereld */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 top-0">
          {/* wolkenlaag */}
          <div
            ref={wolkenRef}
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 flex h-full"
            style={{ width: `${N * 100}%` }}
          >
            {Array.from({ length: N }, (_, i) => (
              <div key={i} className="relative h-full" style={{ width: `${100 / N}%` }}>
                <WolkenCel i={i} />
              </div>
            ))}
          </div>
          {/* scènestrip */}
          <div
            ref={stripRef}
            className="absolute inset-y-0 left-0 flex h-full"
            style={{ width: `${N * 100}%` }}
          >
            {CHAPTERS.map((c, i) => {
              const Scene = SCENES[i];
              const actief = i === stop;
              const pauze = c.pauseAtBeat;
              const interacted =
                (actief && pauze !== undefined && beat > pauze) || i < stop || !!geklikt[i];
              return (
                <div key={c.id} className="relative h-full" style={{ width: `${100 / N}%` }}>
                  <Scene
                    beat={actief ? beat : i < stop ? c.beats : 0}
                    reduced={false}
                    actief={actief}
                    interacted={interacted}
                    onInteract={() => setGeklikt((g) => ({ ...g, [i]: true }))}
                  />
                </div>
              );
            })}
          </div>
          {/* voorgrond */}
          <div
            ref={voorRef}
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 flex h-full"
            style={{ width: `${(N + 3) * 100}%` }}
          >
            {Array.from({ length: N + 3 }, (_, i) => (
              <div key={i} className="relative h-full" style={{ width: `${100 / (N + 3)}%` }}>
                <VoorgrondCel i={i} />
              </div>
            ))}
          </div>
          {/* 3D-gedachten boven het bankje van halte 2 */}
          {stop >= 0 && stop <= 2 && <GedachtenVeld actief={stop === 1} />}
          {/* de gids */}
          <Gids
            state={GIDS_PER_STOP[stop]}
            walking={walking}
            rustig={false}
            className="pointer-events-none absolute"
            style={{ left: '12%', bottom: '13%', height: 'min(19vh, 150px)' }}
          />
        </div>
      </div>

      {/* de tekstpanelen */}
      <div className="pointer-events-none absolute inset-0">
        {CHAPTERS.map((c, i) => (
          <div
            key={c.id}
            className="flex items-center justify-center px-5 lg:justify-end lg:pr-[7vw]"
            style={{ height: `${PANEEL_VH}vh` }}
          >
            <Paneel index={i} />
          </div>
        ))}
      </div>

      <VoortgangsRail stop={stop} containerRef={containerRef} />
    </div>
  );
}

/** Tekstpaneel van één halte, met SplitText-reveal en een flourish die zichzelf tekent. */
function Paneel({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const c = CHAPTERS[index];

  useGSAP(
    () => {
      const titel = ref.current?.querySelector('h2');
      if (!titel) return;
      const split = SplitText.create(titel, { type: 'words' });
      gsap.from(split.words, {
        yPercent: 110,
        opacity: 0,
        duration: DUUR.basis,
        ease: EASE_UIT,
        stagger: STAGGER,
        scrollTrigger: { trigger: ref.current, start: 'top 78%' },
      });
      gsap.from(ref.current!.querySelectorAll('[data-regel]'), {
        y: 18,
        opacity: 0,
        duration: DUUR.basis,
        ease: EASE_UIT,
        stagger: 0.1,
        delay: 0.15,
        scrollTrigger: { trigger: ref.current, start: 'top 78%' },
      });
      const paden = ref.current!.querySelectorAll<SVGPathElement>('[data-flourish] path');
      if (paden.length) {
        gsap.fromTo(
          paden,
          { drawSVG: '0%' },
          {
            drawSVG: '100%',
            duration: DUUR.lang,
            ease: EASE_UIT,
            stagger: 0.06,
            scrollTrigger: { trigger: ref.current, start: 'top 74%' },
          },
        );
      }
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className="pointer-events-auto w-full max-w-[420px] rounded-[4px] border border-[var(--paper-edge)] bg-[var(--paper)]/92 px-6 py-6 shadow-[var(--shadow-lift)] backdrop-blur-[2px]"
    >
      <svg data-flourish viewBox="0 0 120 14" className="mb-3 w-[110px]" aria-hidden focusable="false">
        <path
          d="M2 10 C 26 4, 44 13, 66 8 C 88 3, 102 10, 118 5"
          fill="none"
          stroke="var(--oker)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <div data-regel className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--oker-deep)]">
        {c.eyebrow}
      </div>
      <h2 className="mt-2 overflow-hidden font-display text-[24px] sm:text-[28px] leading-[1.12] tracking-tight text-[var(--ink)]">
        {c.titel} <span className="italic text-[var(--oker-deep)]">{c.titelAccent}</span>
      </h2>
      <p data-regel className="mt-3 text-[13.5px] sm:text-[14.5px] leading-[1.65] text-[var(--ink-dim)]">
        {c.intro}
      </p>
    </div>
  );
}

/** Vaste rail met de zeven haltes; klikbaar en keyboard-bedienbaar. */
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
    const top = el.offsetTop + ((i + 0.45) / N) * el.offsetHeight - window.innerHeight * 0.45;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number) => void } }).__lenis;
    if (lenis) lenis.scrollTo(top);
    else window.scrollTo({ top, behavior: 'smooth' });
  }

  return (
    <nav
      aria-label="Haltes van de wandeling"
      className="fixed left-4 top-1/2 z-20 hidden -translate-y-1/2 lg:flex flex-col items-center gap-2.5"
    >
      {CHAPTERS.map((c, i) => (
        <button
          key={c.id}
          type="button"
          onClick={() => naar(i)}
          aria-label={c.eyebrow}
          aria-current={i === stop ? 'step' : undefined}
          className="group flex h-5 w-5 items-center justify-center rounded-full"
        >
          <span
            aria-hidden
            className="block rounded-full transition-all duration-300 group-hover:scale-125"
            style={{
              width: i === stop ? 10 : 6,
              height: i === stop ? 10 : 6,
              background: i <= stop ? 'var(--oker)' : 'var(--paper-edge)',
            }}
          />
        </button>
      ))}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Rustige variant: volwaardige statische hoofdstukken                 */
/* ------------------------------------------------------------------ */

function WandelingRustig() {
  return (
    <div className="mx-auto w-full max-w-[1080px] px-5 sm:px-8 lg:px-10">
      {CHAPTERS.map((c, i) => {
        const Scene = SCENES[i];
        return (
          <section key={c.id} aria-labelledby={`halte-${c.id}`} className="py-10 sm:py-14">
            <div className="max-w-[560px]">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--oker-deep)]">
                {c.eyebrow}
              </div>
              <h2
                id={`halte-${c.id}`}
                className="mt-2 font-display text-[24px] sm:text-[30px] leading-[1.12] tracking-tight text-[var(--ink)]"
              >
                {c.titel} <span className="italic text-[var(--oker-deep)]">{c.titelAccent}</span>
              </h2>
              <p className="mt-3 text-[14px] leading-[1.65] text-[var(--ink-dim)]">{c.intro}</p>
            </div>
            <div
              className="relative mt-6 w-full overflow-hidden rounded-[4px] border border-[var(--paper-edge)]"
              style={{ aspectRatio: '1000 / 520', minHeight: 240 }}
            >
              <Scene
                beat={c.beats}
                reduced
                actief
                interacted
                onInteract={() => undefined}
              />
            </div>
          </section>
        );
      })}
    </div>
  );
}
