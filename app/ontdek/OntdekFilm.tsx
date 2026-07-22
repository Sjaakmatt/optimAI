'use client';

import { useEffect, useRef, useState, type ComponentType } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { CHAPTERS, type SceneProps } from './film-content';
import { useFilmMotion } from './film-motion';
import { SceneBrief } from './scenes/SceneBrief';
import { SceneDenken } from './scenes/SceneDenken';
import { SceneMaken } from './scenes/SceneMaken';
import { SceneSystemen } from './scenes/SceneSystemen';
import { SceneHek } from './scenes/SceneHek';
import { SceneTeam } from './scenes/SceneTeam';
import { SceneOogst } from './scenes/SceneOogst';

/**
 * De wandeling door agent-land: één doorlopend getekend landschap van
 * zeven haltes. De camera schuift van halte naar halte terwijl een
 * wandelaartje op het pad blijft lopen; binnen elke halte bouwt de
 * scène zich op in beats. Haltes met pauseAtBeat wachten op de
 * bezoeker. Met prefers-reduced-motion wordt het een diavoorstelling:
 * geen autoplay, geen pan, elk decor staat er direct compleet.
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

const N = CHAPTERS.length;

export function OntdekFilm() {
  const { reduced } = useFilmMotion();
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [beat, setBeat] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [interacted, setInteracted] = useState(false);
  const [walking, setWalking] = useState(false);
  const vorigeIndex = useRef(0);

  const chapter = CHAPTERS[index];
  const last = index === N - 1;

  function goTo(i: number) {
    const clamped = Math.max(0, Math.min(N - 1, i));
    setIndex(clamped);
    setBeat(reduced ? CHAPTERS[clamped].beats : 0);
    setInteracted(false);
  }

  function start() {
    setStarted(true);
    setPlaying(true);
    goTo(0);
  }

  function onInteract() {
    setInteracted(true);
    setBeat((b) => (chapter.pauseAtBeat !== undefined && b === chapter.pauseAtBeat ? b + 1 : b));
  }

  // wandelaar loopt zolang de camera pant
  useEffect(() => {
    if (index === vorigeIndex.current) return;
    vorigeIndex.current = index;
    if (reduced) return;
    setWalking(true);
    const t = setTimeout(() => setWalking(false), 1400);
    return () => clearTimeout(t);
  }, [index, reduced]);

  useEffect(() => {
    if (!started || !playing || reduced) return;
    const waiting =
      chapter.pauseAtBeat !== undefined && beat === chapter.pauseAtBeat && !interacted;
    if (waiting) return;

    if (beat < chapter.beats) {
      const t = setTimeout(() => setBeat((b) => b + 1), chapter.beatDelayMs);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      if (last) {
        setPlaying(false);
      } else {
        goTo(index + 1);
      }
    }, chapter.holdMs);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, playing, reduced, index, beat, interacted]);

  return (
    <div className="mx-auto w-full max-w-[960px]">
      <section
        aria-label="De wandeling door agent-land"
        className="relative overflow-hidden rounded-[4px] border border-[var(--paper-edge)] bg-[var(--paper)] shadow-[var(--shadow-lift)]"
      >
        {!started ? (
          <StartOverlay onStart={start} reduced={reduced} />
        ) : (
          <>
            {/* het venster op de wereld */}
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: '1000 / 520', minHeight: 260 }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 flex h-full"
                style={{ width: `${N * 100}%` }}
                initial={false}
                animate={{ x: `-${(index * 100) / N}%` }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 55, damping: 19, mass: 1.1 }
                }
              >
                {CHAPTERS.map((c, i) => {
                  const Scene = SCENES[i];
                  return (
                    <div key={c.id} className="relative h-full" style={{ width: `${100 / N}%` }}>
                      <Scene
                        beat={i === index ? beat : i < index ? c.beats : 0}
                        reduced={reduced}
                        actief={i === index}
                        interacted={i === index ? interacted : i < index}
                        onInteract={i === index ? onInteract : () => undefined}
                      />
                    </div>
                  );
                })}
              </motion.div>
              {!reduced && <Wandelaar walking={walking} />}
            </div>

            {/* het bijschrift, als ondertitel van de film */}
            <div className="relative border-t border-[var(--paper-edge)] bg-[var(--paper-warm)]/70 px-5 py-4 sm:px-8 sm:py-5 min-h-[118px] sm:min-h-[108px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={chapter.id}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--oker-deep)]">
                    {chapter.eyebrow}
                  </div>
                  <h2 className="mt-1 font-display text-[19px] sm:text-[23px] leading-[1.15] tracking-tight text-[var(--ink)]">
                    {chapter.titel}{' '}
                    <span className="italic text-[var(--oker-deep)]">{chapter.titelAccent}</span>
                  </h2>
                  <p className="mt-1 text-[12.5px] sm:text-[13.5px] leading-[1.6] text-[var(--ink-dim)] max-w-[640px]">
                    {chapter.intro}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        )}
      </section>

      {/* Bediening */}
      {started && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <div className="flex items-center gap-2">
            <ControlButton label="Vorige halte" disabled={index === 0} onClick={() => goTo(index - 1)}>
              <ChevronLeft size={16} strokeWidth={1.8} aria-hidden />
            </ControlButton>
            {!reduced && (
              <ControlButton
                label={playing ? 'Pauzeer de wandeling' : 'Speel verder'}
                onClick={() => {
                  if (!playing && last && beat >= chapter.beats) {
                    start();
                  } else {
                    setPlaying((p) => !p);
                  }
                }}
              >
                {playing ? (
                  <Pause size={15} strokeWidth={1.8} aria-hidden />
                ) : last && beat >= chapter.beats ? (
                  <RotateCcw size={15} strokeWidth={1.8} aria-hidden />
                ) : (
                  <Play size={15} strokeWidth={1.8} aria-hidden />
                )}
              </ControlButton>
            )}
            <ControlButton label="Volgende halte" disabled={last} onClick={() => goTo(index + 1)}>
              <ChevronRight size={16} strokeWidth={1.8} aria-hidden />
            </ControlButton>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink-faint)]">
              Halte {index + 1} / {N}
            </span>
            <div className="flex items-center gap-2">
              {CHAPTERS.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Ga naar ${c.eyebrow}`}
                  aria-current={i === index ? 'step' : undefined}
                  className="flex h-6 w-6 items-center justify-center rounded-full"
                >
                  <span
                    aria-hidden
                    className="block rounded-full transition-all duration-300"
                    style={{
                      width: i === index ? 10 : 6,
                      height: i === index ? 10 : 6,
                      background: i <= index ? 'var(--oker)' : 'var(--paper-edge)',
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * De wandelaar staat stil in beeld terwijl de wereld onder hem
 * doorschuift: zo lijkt hij van halte naar halte te lopen.
 */
function Wandelaar({ walking }: { walking: boolean }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute"
      style={{ left: '14%', bottom: '10.8%', height: '13.5%' }}
      animate={walking ? { y: [0, -2.5, 0] } : { y: 0 }}
      transition={walking ? { duration: 0.4, repeat: Infinity } : { duration: 0.2 }}
    >
      <svg viewBox="0 0 44 72" className="h-full w-auto" focusable="false">
        <g stroke="var(--ink)" strokeWidth={2.4} strokeLinecap="round" fill="none">
          <circle cx={20} cy={10} r={6.5} fill="var(--paper)" />
          <path d="M20 17 L 20 42" />
          {/* armen: eentje met lantaarn */}
          <path d="M20 26 L 10 33" />
          <path d="M20 26 L 30 30 L 30 37" />
          {/* benen */}
          <motion.path
            d="M20 42 L 12 60"
            animate={walking ? { d: ['M20 42 L 12 60', 'M20 42 L 24 61', 'M20 42 L 12 60'] } : { d: 'M20 42 L 14 60' }}
            transition={walking ? { duration: 0.5, repeat: Infinity } : { duration: 0.2 }}
          />
          <motion.path
            d="M20 42 L 28 60"
            animate={walking ? { d: ['M20 42 L 28 60', 'M20 42 L 15 61', 'M20 42 L 28 60'] } : { d: 'M20 42 L 26 60' }}
            transition={walking ? { duration: 0.5, repeat: Infinity } : { duration: 0.2 }}
          />
        </g>
        <rect x={26.5} y={37} width={7} height={9} rx={1.5} fill="var(--oker)" opacity={0.85} stroke="var(--ink)" strokeWidth={1.4} />
      </svg>
    </motion.div>
  );
}

function StartOverlay({ onStart, reduced }: { onStart: () => void; reduced: boolean }) {
  return (
    <div className="relative flex min-h-[480px] sm:min-h-[560px] flex-col items-center justify-center px-6 py-10 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(168, 128, 58, 0.08) 0%, transparent 60%)',
        }}
      />
      {/* de route als kaartje */}
      <svg viewBox="0 0 280 100" className="w-[230px] sm:w-[280px] h-auto" aria-hidden focusable="false">
        <path
          d="M12 84 C 60 72, 55 38, 118 42 C 180 46, 175 78, 230 60 C 255 51, 262 30, 268 16"
          fill="none"
          stroke="var(--oker)"
          strokeWidth="1.4"
          strokeDasharray="2.5 7"
          strokeLinecap="round"
          opacity="0.85"
        />
        {[
          [12, 84],
          [62, 62],
          [118, 42],
          [168, 52],
          [214, 63],
          [246, 43],
          [268, 16],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={i === 0 ? 3.5 : 2.6} fill={i === 6 ? 'none' : 'var(--oker)'} stroke="var(--oker)" strokeWidth={1.2} />
          </g>
        ))}
      </svg>
      <h2 className="mt-6 font-display text-[27px] sm:text-[34px] leading-[1.12] tracking-tight text-[var(--ink)] max-w-[500px]">
        Een korte wandeling door het land van de{' '}
        <span className="italic text-[var(--oker-deep)]">agents.</span>
      </h2>
      <p className="mt-4 max-w-[430px] text-[14px] sm:text-[15px] leading-[1.7] text-[var(--ink-dim)]">
        Zeven haltes, een minuut of drie. Onderweg ziet u wat een AI-agent is, hoe hij denkt en waar
        hij stopt. {reduced ? 'U bladert zelf door de haltes.' : 'Pauzeren kan altijd.'}
      </p>
      <button
        type="button"
        onClick={onStart}
        className="mt-8 inline-flex items-center gap-2 rounded-[2px] bg-[var(--ink)] px-6 py-3 text-[15px] text-[var(--paper)] transition-colors hover:bg-[var(--oker-deep)] lift-on-hover"
      >
        <Play size={15} strokeWidth={1.8} aria-hidden />
        Start de wandeling
      </button>
    </div>
  );
}

function ControlButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--paper-edge)] bg-[var(--paper)] text-[var(--ink)] transition-colors hover:border-[var(--oker)] hover:bg-[var(--paper-warm)] disabled:opacity-35 disabled:hover:border-[var(--paper-edge)] disabled:hover:bg-[var(--paper)]"
    >
      {children}
    </button>
  );
}
