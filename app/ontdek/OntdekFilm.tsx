'use client';

import { useEffect, useState, type ComponentType } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { CHAPTERS, type SceneProps } from './film-content';
import { sceneSwap, useFilmMotion } from './film-motion';
import { SceneBrief } from './scenes/SceneBrief';
import { SceneDenken } from './scenes/SceneDenken';
import { SceneMaken } from './scenes/SceneMaken';
import { SceneSystemen } from './scenes/SceneSystemen';
import { SceneHek } from './scenes/SceneHek';
import { SceneTeam } from './scenes/SceneTeam';
import { SceneOogst } from './scenes/SceneOogst';

/**
 * De wandeling: een zichzelf afspelende film van zeven haltes.
 *
 * De controller telt "beats" binnen een hoofdstuk (beatDelayMs) en gaat na
 * de laatste beat door naar de volgende halte (holdMs). Hoofdstukken met
 * pauseAtBeat wachten daar tot de bezoeker iets aanklikt. Met
 * prefers-reduced-motion wordt het een diavoorstelling: geen autoplay,
 * elk hoofdstuk staat er direct compleet en u bladert zelf.
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

export function OntdekFilm() {
  const { reduced } = useFilmMotion();
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [beat, setBeat] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [interacted, setInteracted] = useState(false);

  const chapter = CHAPTERS[index];
  const Scene = SCENES[index];
  const last = index === CHAPTERS.length - 1;

  function goTo(i: number) {
    const clamped = Math.max(0, Math.min(CHAPTERS.length - 1, i));
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
    // meteen verder na de interactie, niet nog een beatDelay wachten
    setBeat((b) => (chapter.pauseAtBeat !== undefined && b === chapter.pauseAtBeat ? b + 1 : b));
  }

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
      {/* De stage */}
      <div className="relative overflow-hidden rounded-[4px] border border-[var(--paper-edge)] bg-[var(--paper)] shadow-[var(--shadow-lift)]">
        {/* zachte avondgloed bovenin de stage */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(168, 128, 58, 0.07) 0%, transparent 60%)',
          }}
        />

        {!started ? (
          <StartOverlay onStart={start} reduced={reduced} />
        ) : (
          <div className="relative flex min-h-[560px] sm:min-h-[600px] flex-col px-5 py-7 sm:px-10 sm:py-9">
            <AnimatePresence mode="wait">
              <motion.section
                key={chapter.id}
                aria-labelledby={`halte-${chapter.id}`}
                className="flex flex-1 flex-col"
                {...(reduced ? {} : sceneSwap)}
              >
                <header className="mb-6 sm:mb-8 max-w-[620px]">
                  <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[var(--oker-deep)]">
                    {chapter.eyebrow}
                  </div>
                  <h2
                    id={`halte-${chapter.id}`}
                    className="mt-2 font-display text-[24px] sm:text-[32px] leading-[1.12] tracking-tight text-[var(--ink)]"
                  >
                    {chapter.titel}{' '}
                    <span className="italic text-[var(--oker-deep)]">{chapter.titelAccent}</span>
                  </h2>
                  <p className="mt-2.5 text-[13.5px] sm:text-[14.5px] leading-[1.65] text-[var(--ink-dim)]">
                    {chapter.intro}
                  </p>
                </header>

                <div className="flex flex-1 flex-col justify-center">
                  <Scene
                    beat={beat}
                    reduced={reduced}
                    interacted={interacted}
                    onInteract={onInteract}
                  />
                </div>
              </motion.section>
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Bediening */}
      {started && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <div className="flex items-center gap-2">
            <ControlButton
              label="Vorige halte"
              disabled={index === 0}
              onClick={() => goTo(index - 1)}
            >
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
            <ControlButton
              label="Volgende halte"
              disabled={last}
              onClick={() => goTo(index + 1)}
            >
              <ChevronRight size={16} strokeWidth={1.8} aria-hidden />
            </ControlButton>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink-faint)]">
              Halte {index + 1} / {CHAPTERS.length}
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

function StartOverlay({ onStart, reduced }: { onStart: () => void; reduced: boolean }) {
  return (
    <div className="relative flex min-h-[560px] sm:min-h-[600px] flex-col items-center justify-center px-6 text-center">
      {/* uitnodigend wandelpaadje */}
      <svg viewBox="0 0 260 90" className="w-[220px] sm:w-[260px] h-auto" aria-hidden focusable="false">
        <path
          d="M10 78 C 70 66, 60 30, 128 34 C 196 38, 190 70, 250 14"
          fill="none"
          stroke="var(--oker)"
          strokeWidth="1.3"
          strokeDasharray="2 7"
          strokeLinecap="round"
          opacity="0.8"
        />
        <circle cx="10" cy="78" r="3" fill="var(--oker)" />
        <circle cx="250" cy="14" r="2.5" fill="none" stroke="var(--oker)" strokeWidth="1.2" />
      </svg>
      <h2 className="mt-6 font-display text-[28px] sm:text-[36px] leading-[1.1] tracking-tight text-[var(--ink)] max-w-[480px]">
        Een korte wandeling door het land van de{' '}
        <span className="italic text-[var(--oker-deep)]">agents.</span>
      </h2>
      <p className="mt-4 max-w-[420px] text-[14px] sm:text-[15px] leading-[1.7] text-[var(--ink-dim)]">
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
