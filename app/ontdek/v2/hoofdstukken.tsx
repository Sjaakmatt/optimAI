'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, CornerUpLeft, ThumbsUp } from 'lucide-react';
import {
  MAANDAG_BERICHTEN,
  DENKT_LOG,
  LEVERT_DOCUMENT,
  NIET_DOEN,
  BEGIN_STATS,
} from '../film-content';
import { EASE_UIT_CSS, DUUR, STAGGER } from './tokens';
import { CountUp } from './CountUp';

/**
 * De ondersteunende lagen per hoofdstuk: wat er rond de inktdruppel
 * verschijnt. Elke laag volgt dezelfde regels: kalm basisbeeld, één
 * verandering per beat, alleen transform en opacity, en de laag laat
 * de druppel het middelpunt blijven.
 */

export interface LaagProps {
  beat: number;
  reduced: boolean;
  actief: boolean;
}

const kaartIn = (visible: boolean, reduced: boolean, delay = 0) => ({
  initial: reduced ? false : { opacity: 0, y: 14 },
  animate: visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
  transition: { duration: DUUR.paneel, ease: EASE_UIT_CSS, delay },
});

/* 01 — Maandagochtend: berichten stapelen zich op */
export function LaagMaandag({ beat, reduced }: LaagProps) {
  return (
    <div className="absolute right-[6%] top-[12%] flex w-[min(300px,46%)] flex-col gap-2.5">
      {MAANDAG_BERICHTEN.map((b, i) => (
        <motion.div
          key={b.van}
          {...kaartIn(reduced || beat >= i + 1, reduced)}
          style={{ rotate: [-1.2, 0.8, -0.6][i] }}
          className="rounded-[2px] border border-[var(--paper-edge)] bg-[var(--paper)] px-3.5 py-2.5 shadow-[var(--shadow-soft)]"
        >
          <div className="font-mono text-[9px] text-[var(--ink-faint)]">{b.van}</div>
          <div className="mt-0.5 text-[12.5px] text-[var(--ink)]">{b.regel}</div>
        </motion.div>
      ))}
      <motion.div
        {...kaartIn(reduced || beat >= 3, reduced, 0.2)}
        className="mt-1 self-end font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ink-faint)]"
      >
        + 37 andere
      </motion.div>
    </div>
  );
}

/* 02 — De digitale collega: drie rustige woorden rond de druppel */
export function LaagCollega({ reduced, actief }: LaagProps) {
  const woorden = [
    { tekst: 'leest', x: '20%', y: '30%' },
    { tekst: 'denkt', x: '76%', y: '42%' },
    { tekst: 'doet', x: '28%', y: '74%' },
  ];
  return (
    <>
      {woorden.map((w, i) => (
        <motion.span
          key={w.tekst}
          initial={reduced ? false : { opacity: 0 }}
          animate={actief || reduced ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: DUUR.hoofdstuk, delay: reduced ? 0 : 0.3 + i * 0.25 }}
          className="absolute -translate-x-1/2 -translate-y-1/2 font-display italic text-[17px] text-[var(--ink-dim)]"
          style={{ left: w.x, top: w.y }}
        >
          {w.tekst}
        </motion.span>
      ))}
    </>
  );
}

/* 03 — Zo denkt hij: pennenlijnen naar knopen + leesbaar logboek */
export function LaagDenkt({ beat, reduced, actief }: LaagProps) {
  const draw = (visible: boolean, delay = 0) =>
    reduced
      ? { style: { opacity: visible ? 1 : 0 } }
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: visible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
          transition: { duration: 0.9, ease: EASE_UIT_CSS, delay },
        };
  return (
    <>
      {/* satellietknopen + lijnen, in het assenstelsel van de druppel-svg */}
      <svg
        viewBox="0 0 400 400"
        className="pointer-events-none absolute inset-0 m-auto h-full max-h-[520px] w-auto"
        aria-hidden
        focusable="false"
      >
        <motion.path
          d="M212 178 C 250 150 282 140 310 142"
          fill="none"
          stroke="var(--ink-dim)"
          strokeWidth={1.2}
          {...draw(actief && (reduced || beat >= 1))}
        />
        <motion.path
          d="M224 240 C 262 262 288 280 306 300"
          fill="none"
          stroke="var(--ink-dim)"
          strokeWidth={1.2}
          {...draw(actief && (reduced || beat >= 2), 0.1)}
        />
        <motion.circle
          cx={316}
          cy={140}
          r={5}
          fill="var(--paper)"
          stroke="var(--ink-dim)"
          strokeWidth={1.3}
          initial={reduced ? undefined : { scale: 0 }}
          animate={actief && (reduced || beat >= 1) ? { scale: 1 } : reduced ? undefined : { scale: 0 }}
          transition={{ duration: DUUR.basis, delay: 0.6 }}
        />
        <motion.circle
          cx={312}
          cy={304}
          r={5}
          fill="var(--paper)"
          stroke="var(--ink-dim)"
          strokeWidth={1.3}
          initial={reduced ? undefined : { scale: 0 }}
          animate={actief && (reduced || beat >= 2) ? { scale: 1 } : reduced ? undefined : { scale: 0 }}
          transition={{ duration: DUUR.basis, delay: 0.7 }}
        />
      </svg>
      {/* het logboek */}
      <div className="absolute bottom-[10%] left-1/2 w-[min(420px,88%)] -translate-x-1/2 rounded-[2px] border border-[var(--paper-edge)] bg-[var(--paper)]/95 px-4 py-3 shadow-[var(--shadow-soft)]">
        <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--ink-faint)]">
          Logboek · vandaag 09:12
        </div>
        <ul className="mt-2 space-y-1.5">
          {DENKT_LOG.map((r, i) => (
            <motion.li
              key={i}
              {...kaartIn(reduced || beat >= i + 1, reduced)}
              className="flex items-start gap-2 font-mono text-[11px] leading-[1.5] text-[var(--ink-dim)]"
            >
              <span aria-hidden className="mt-[1px] text-[var(--oker-deep)]">
                ·
              </span>
              {r}
            </motion.li>
          ))}
        </ul>
      </div>
    </>
  );
}

/* 04 — Hij levert: het document bouwt zich op, regel voor regel */
export function LaagLevert({ beat, reduced }: LaagProps) {
  const doc = LEVERT_DOCUMENT;
  return (
    <div className="absolute right-[5%] top-1/2 w-[min(330px,62%)] -translate-y-1/2 rounded-[2px] border border-[var(--paper-edge)] bg-[var(--paper)] px-5 py-4 shadow-[var(--shadow-lift)]">
      <div>
        <motion.div {...kaartIn(reduced || beat >= 1, reduced)}>
          <div className="flex items-baseline justify-between border-b border-[var(--ink-dim)]/60 pb-2">
            <span className="font-display text-[18px] text-[var(--ink)]">{doc.soort}</span>
            <span className="font-mono text-[10px] text-[var(--ink-faint)]">{doc.nummer}</span>
          </div>
          <div className="mt-1.5 text-[12px] text-[var(--ink-dim)]">{doc.klant}</div>
        </motion.div>
        <div className="mt-3 space-y-2">
          {doc.regels.map((r, i) => (
            <motion.div
              key={i}
              {...kaartIn(reduced || beat >= 2, reduced, i * STAGGER)}
              className="flex items-baseline justify-between gap-4 text-[12.5px]"
            >
              <span className="text-[var(--ink)]">{r.omschrijving}</span>
              <span className="font-mono text-[11.5px] text-[var(--ink-dim)] tabular-nums">
                {r.bedrag}
              </span>
            </motion.div>
          ))}
        </div>
        <motion.div
          {...kaartIn(reduced || beat >= 3, reduced)}
          className="mt-3 flex items-baseline justify-between border-t border-[var(--paper-edge)] pt-2"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--mos)]">
            Concept · wacht op uw akkoord
          </span>
          <span className="font-display text-[14px] text-[var(--ink)] tabular-nums">{doc.totaal}</span>
        </motion.div>
      </div>
    </div>
  );
}

/* 05 — U houdt het stuur: de grens, en de keuze die bij u ligt */
export function LaagStuur({ beat, reduced, actief }: LaagProps) {
  const [besluit, setBesluit] = useState<'geen' | 'goed' | 'terug'>('geen');
  return (
    <>
      {/* de getrokken grens */}
      <svg
        viewBox="0 0 400 400"
        className="pointer-events-none absolute inset-0 m-auto h-full max-h-[520px] w-auto"
        aria-hidden
        focusable="false"
      >
        <motion.line
          x1={296}
          y1={90}
          x2={296}
          y2={330}
          stroke="var(--ink-dim)"
          strokeWidth={1.4}
          strokeDasharray="1 6"
          strokeLinecap="round"
          initial={reduced ? undefined : { pathLength: 0 }}
          animate={actief || reduced ? { pathLength: 1 } : reduced ? undefined : { pathLength: 0 }}
          transition={{ duration: 1, ease: EASE_UIT_CSS }}
        />
        {/* het werkitem dat bij de grens wacht of passeert */}
        {!reduced && actief && (
          <motion.circle
            r={4.5}
            cy={220}
            fill={besluit === 'terug' ? 'var(--terra)' : 'var(--oker-deep)'}
            initial={{ cx: 250, opacity: 0 }}
            animate={
              besluit === 'goed'
                ? { cx: [286, 360], opacity: [1, 0] }
                : besluit === 'terug'
                  ? { cx: [286, 240], opacity: [1, 0.9] }
                  : { cx: 286, opacity: beat >= 1 ? [0.4, 1, 0.4] : 0 }
            }
            transition={
              besluit === 'geen'
                ? { duration: 1.6, repeat: Infinity }
                : { duration: 0.9, ease: 'easeInOut' }
            }
          />
        )}
      </svg>
      {/* de beslissing */}
      <motion.div
        {...kaartIn(reduced || beat >= 2, reduced)}
        className="absolute bottom-[10%] left-1/2 w-[min(360px,86%)] -translate-x-1/2 rounded-[2px] border border-[var(--terra)]/70 bg-[var(--paper)] px-4 py-3.5 shadow-[var(--shadow-lift)]"
      >
        <div className="font-display text-[15px] text-[var(--ink)]">
          Twijfelgeval. <span className="italic text-[var(--terra)]">U beslist.</span>
        </div>
        <p className="mt-1 text-[12px] leading-[1.5] text-[var(--ink-dim)]">
          Korting boven de afspraak gevraagd. De agent wacht.
        </p>
        <div className="mt-2.5 flex gap-2">
          <button
            type="button"
            onClick={() => setBesluit('goed')}
            aria-pressed={besluit === 'goed'}
            className="inline-flex items-center gap-1.5 rounded-[2px] border border-[var(--paper-edge)] bg-[var(--paper-warm)] px-3 py-1.5 text-[12px] text-[var(--ink)] transition-colors hover:border-[var(--oker)]"
          >
            <ThumbsUp size={11} strokeWidth={2} aria-hidden /> Keur goed
          </button>
          <button
            type="button"
            onClick={() => setBesluit('terug')}
            aria-pressed={besluit === 'terug'}
            className="inline-flex items-center gap-1.5 rounded-[2px] border border-[var(--paper-edge)] bg-[var(--paper-warm)] px-3 py-1.5 text-[12px] text-[var(--ink)] transition-colors hover:border-[var(--terra)]"
          >
            <CornerUpLeft size={11} strokeWidth={2} aria-hidden /> Stuur terug
          </button>
          <AnimatePresence>
            {besluit !== 'geen' && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="self-center font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--mos)]"
              >
                {besluit === 'goed' ? 'Verwerkt' : 'Terug naar de agent'}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}

/* 06 — Wat Factum niet doet: de gegraveerde lijst */
export function LaagGrenzen({ beat, reduced }: LaagProps) {
  return (
    <div className="absolute left-1/2 top-1/2 w-[min(400px,86%)] -translate-x-1/2 -translate-y-1/2">
      <ul className="space-y-3.5">
        {NIET_DOEN.map((regel, i) => (
          <motion.li
            key={i}
            {...kaartIn(reduced || beat >= i + 1, reduced)}
            className="flex items-start gap-3 border-b border-[var(--paper-edge)] pb-3"
          >
            <Check size={13} strokeWidth={2.4} className="mt-[3px] shrink-0 text-[var(--mos)]" aria-hidden />
            <span className="font-display text-[15px] leading-snug text-[var(--ink)]">{regel}</span>
          </motion.li>
        ))}
      </ul>
      <motion.p
        {...kaartIn(reduced || beat >= 4, reduced, 0.15)}
        className="mt-4 text-[12px] italic leading-[1.6] text-[var(--ink-dim)]"
      >
        En eerlijk: ongeveer één op de tien gevallen kijkt u zelf even na. Dat hoort erbij.
      </motion.p>
    </div>
  );
}

/* 07 — Begin klein: het zegel en de sobere cijfers */
export function LaagBegin({ beat, reduced }: LaagProps) {
  return (
    <>
      {/* het monogram in het zegel */}
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.8 }}
        animate={reduced || beat >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: DUUR.paneel, ease: EASE_UIT_CSS, delay: 0.25 }}
        className="pointer-events-none absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2"
      >
        <span className="font-display text-[54px] italic leading-none text-[var(--paper)]">F</span>
      </motion.div>
      {/* cijfers */}
      <div className="absolute bottom-[8%] left-1/2 flex w-[min(460px,92%)] -translate-x-1/2 items-start justify-center gap-[6%]">
        {BEGIN_STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            {...kaartIn(reduced || beat >= i + 1, reduced)}
            className="w-[30%] text-center"
          >
            <div className="font-display text-[26px] leading-none text-[var(--ink)] tabular-nums">
              {stat.literal ? (
                <span>
                  {stat.literal}
                  {stat.suffix}
                </span>
              ) : (
                <>
                  {stat.prefix}
                  <CountUp target={stat.value} run={!reduced && beat >= i + 1} reduced={reduced} />
                  {stat.suffix}
                </>
              )}
            </div>
            <div className="mt-1.5 text-[10.5px] leading-snug text-[var(--ink-dim)]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
