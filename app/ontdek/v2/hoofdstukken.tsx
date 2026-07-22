'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, CornerUpLeft, ThumbsUp } from 'lucide-react';
import {
  MAANDAG_BERICHTEN,
  COLLEGA_ROLLEN,
  DENKT_KNOPEN,
  DENKT_LOG,
  LEVERT_DOCUMENTEN,
  NIET_DOEN,
  BEGIN_STATS,
} from '../film-content';
import { EASE_UIT_CSS, DUUR, STAGGER } from './tokens';
import { CountUp } from './CountUp';

/**
 * De lagen per hoofdstuk: wat er rond de inktdruppel gebeurt. Kalm
 * basisbeeld, één verandering per beat, en de speelsheid zit in kleine,
 * precieze momenten: een orbit van rollen, een lijn die zich tekent,
 * een werkitem dat tegen de grens tikt, een zegel dat stempelt.
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

/** Regel die zichzelf tikt, teken voor teken. */
function TypeRegel({ tekst, run, reduced }: { tekst: string; run: boolean; reduced: boolean }) {
  const [n, setN] = useState(reduced ? tekst.length : 0);
  useEffect(() => {
    if (reduced) {
      setN(tekst.length);
      return;
    }
    if (!run) return;
    let i = 0;
    const t = setInterval(() => {
      i += 2;
      setN(i);
      if (i >= tekst.length) clearInterval(t);
    }, 18);
    return () => clearInterval(t);
  }, [run, reduced, tekst]);
  return <span>{tekst.slice(0, n)}</span>;
}

/* 01 — Maandagochtend: vier bedrijven, dezelfde ochtend */
export function LaagMaandag({ beat, reduced }: LaagProps) {
  return (
    <div className="absolute right-[5%] top-[10%] flex w-[min(310px,48%)] flex-col gap-2.5">
      {MAANDAG_BERICHTEN.map((b, i) => (
        <motion.div
          key={b.van}
          initial={reduced ? false : { opacity: 0, y: -18, rotate: [-2, 1.6, -1, 1.2][i] * 2 }}
          animate={
            reduced || beat >= i + 1
              ? { opacity: 1, y: 0, rotate: [-1.2, 0.8, -0.6, 0.9][i] }
              : { opacity: 0, y: -18 }
          }
          transition={{ type: 'spring', stiffness: 190, damping: 17 }}
          className="rounded-[2px] border border-[var(--paper-edge)] bg-[var(--paper)] px-3.5 py-2.5 shadow-[var(--shadow-soft)]"
        >
          <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--ink-faint)]">
            {b.van}
          </div>
          <div className="mt-0.5 text-[12.5px] text-[var(--ink)]">{b.regel}</div>
        </motion.div>
      ))}
      <motion.div
        {...kaartIn(reduced || beat >= 4, reduced, 0.15)}
        className="mt-1 self-end font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ink-faint)]"
      >
        + 36 andere voor twaalven
      </motion.div>
    </div>
  );
}

/* 02 — De digitale collega: zijn rollen draaien als een rustige baan om hem heen */
export function LaagCollega({ beat, reduced, actief }: LaagProps) {
  const zichtbaar = actief && (reduced || beat >= 1);
  return (
    <div className="pointer-events-none absolute inset-0 m-auto h-[min(74vh,560px)] w-[min(74vh,560px)]">
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={reduced ? undefined : zichtbaar ? { rotate: 360 } : undefined}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        {COLLEGA_ROLLEN.map((rol, i) => {
          const hoek = (i / COLLEGA_ROLLEN.length) * Math.PI * 2 - Math.PI / 2;
          const r = 44;
          return (
            <motion.span
              key={rol}
              initial={reduced ? false : { opacity: 0, scale: 0.7 }}
              animate={zichtbaar ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
              transition={{ duration: DUUR.paneel, ease: EASE_UIT_CSS, delay: reduced ? 0 : i * 0.12 }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${50 + Math.cos(hoek) * r}%`, top: `${50 + Math.sin(hoek) * r}%` }}
            >
              {/* tegen-rotatie zodat de tekst recht blijft */}
              <motion.span
                className="block rounded-full border border-[var(--paper-edge)] bg-[var(--paper)]/95 px-3 py-1 font-display text-[12.5px] text-[var(--ink)] shadow-[var(--shadow-soft)] whitespace-nowrap"
                initial={false}
                animate={reduced ? undefined : zichtbaar ? { rotate: -360 } : undefined}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              >
                {rol}
              </motion.span>
            </motion.span>
          );
        })}
      </motion.div>
      <motion.p
        {...kaartIn(actief && (reduced || beat >= 2), reduced, 0.3)}
        className="absolute bottom-[-8%] left-1/2 w-[min(360px,90%)] -translate-x-1/2 text-center font-display italic text-[15px] text-[var(--ink-dim)]"
      >
        Eén collega, zes rollen. En voor grote klussen werken meerdere agents samen, met een
        dirigent die het overzicht houdt.
      </motion.p>
    </div>
  );
}

/* 03 — Zo denkt hij: vier benoemde knopen + een logboek dat zichzelf tikt */
export function LaagDenkt({ beat, reduced, actief }: LaagProps) {
  const KNOPEN = [
    { x: 318, y: 128, lijn: 'M214 180 C 254 148 284 134 306 130' },
    { x: 330, y: 232, lijn: 'M248 222 C 276 226 298 229 318 231' },
    { x: 300, y: 322, lijn: 'M226 250 C 254 278 274 300 290 314' },
    { x: 96, y: 150, lijn: 'M158 194 C 138 178 122 164 108 154' },
  ];
  const draw = (visible: boolean, delay = 0) =>
    reduced
      ? { style: { opacity: visible ? 1 : 0 } }
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: visible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
          transition: { duration: 0.8, ease: EASE_UIT_CSS, delay },
        };
  return (
    <>
      <svg
        viewBox="0 0 400 400"
        className="pointer-events-none absolute inset-0 m-auto h-full max-h-[560px] w-auto overflow-visible"
        aria-hidden
        focusable="false"
      >
        {KNOPEN.map((k, i) => {
          const visible = actief && (reduced || beat >= Math.min(i + 1, 3));
          return (
            <g key={i}>
              <motion.path
                d={k.lijn}
                fill="none"
                stroke="var(--ink-dim)"
                strokeWidth={1.2}
                {...draw(visible, i * 0.12)}
              />
              <motion.circle
                cx={k.x}
                cy={k.y}
                r={4.5}
                fill="var(--paper)"
                stroke="var(--ink-dim)"
                strokeWidth={1.3}
                initial={reduced ? undefined : { scale: 0 }}
                animate={visible ? { scale: 1 } : reduced ? undefined : { scale: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.4 + i * 0.12 }}
              />
            </g>
          );
        })}
      </svg>
      <svg
        viewBox="0 0 400 400"
        className="pointer-events-none absolute inset-0 m-auto h-full max-h-[560px] w-auto overflow-visible"
        aria-hidden
        focusable="false"
      >
        {KNOPEN.map((k, i) => {
          const visible = actief && (reduced || beat >= Math.min(i + 1, 3));
          return (
            <motion.text
              key={i}
              x={k.x}
              y={k.y - 12}
              textAnchor="middle"
              fontSize="10"
              fill="var(--ink-dim)"
              fontFamily="var(--font-plex-mono), monospace"
              letterSpacing="1.5"
              initial={reduced ? undefined : { opacity: 0 }}
              animate={visible ? { opacity: 1 } : reduced ? undefined : { opacity: 0 }}
              transition={{ duration: DUUR.paneel, delay: 0.55 + i * 0.1 }}
            >
              {DENKT_KNOPEN[i].toUpperCase()}
            </motion.text>
          );
        })}
      </svg>
      {/* het logboek tikt zichzelf */}
      <div className="absolute bottom-[8%] left-1/2 w-[min(430px,90%)] -translate-x-1/2 rounded-[2px] border border-[var(--paper-edge)] bg-[var(--paper)]/95 px-4 py-3 shadow-[var(--shadow-soft)]">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--ink-faint)]">
            Logboek · praktijk De Linde
          </span>
          <span className="font-mono text-[9px] text-[var(--ink-faint)]">09:12</span>
        </div>
        <ul className="mt-2 min-h-[54px] space-y-1.5">
          {DENKT_LOG.map((r, i) => {
            const visible = reduced || beat >= i + 1;
            return (
              <li
                key={i}
                className="flex items-start gap-2 font-mono text-[11px] leading-[1.5] text-[var(--ink-dim)]"
                style={{ opacity: visible ? 1 : 0 }}
              >
                <span aria-hidden className="mt-[1px] text-[var(--oker-deep)]">
                  ·
                </span>
                <TypeRegel tekst={r} run={visible && actief} reduced={reduced} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

/* 04 — Hij levert: drie soorten werk uit drie bedrijven waaieren uit */
export function LaagLevert({ beat, reduced }: LaagProps) {
  return (
    <div className="absolute right-[4%] top-1/2 w-[min(330px,60%)] -translate-y-1/2 space-y-3">
      {LEVERT_DOCUMENTEN.map((doc, i) => (
        <motion.div
          key={doc.soort}
          initial={reduced ? false : { opacity: 0, x: -26, rotate: [-1.6, 1.2, -0.8, 1][i] * 2 }}
          animate={
            reduced || beat >= i + 1
              ? { opacity: 1, x: 0, rotate: [-1, 0.7, -0.5, 0.6][i] }
              : { opacity: 0, x: -26 }
          }
          transition={{ type: 'spring', stiffness: 170, damping: 19 }}
          className="rounded-[2px] border border-[var(--paper-edge)] bg-[var(--paper)] px-4 py-3 shadow-[var(--shadow-lift)]"
        >
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--oker-deep)]">
              {doc.soort}
            </span>
            <span className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-[var(--mos)]">
              ✓ {doc.slot}
            </span>
          </div>
          <div className="mt-1 font-display text-[14.5px] leading-tight text-[var(--ink)]">
            {doc.kop}
          </div>
          <div className="mt-0.5 text-[11.5px] text-[var(--ink-dim)]">{doc.detail}</div>
        </motion.div>
      ))}
    </div>
  );
}

/* 05 — U houdt het stuur: het werkitem tikt tegen de grens en wacht */
export function LaagStuur({ beat, reduced, actief }: LaagProps) {
  const [besluit, setBesluit] = useState<'geen' | 'goed' | 'terug'>('geen');
  return (
    <>
      <svg
        viewBox="0 0 400 400"
        className="pointer-events-none absolute inset-0 m-auto h-full max-h-[560px] w-auto overflow-visible"
        aria-hidden
        focusable="false"
      >
        <motion.line
          x1={296}
          y1={86}
          x2={296}
          y2={334}
          stroke="var(--ink-dim)"
          strokeWidth={1.4}
          strokeLinecap="round"
          initial={reduced ? undefined : { pathLength: 0 }}
          animate={actief || reduced ? { pathLength: 1 } : reduced ? undefined : { pathLength: 0 }}
          transition={{ duration: 1, ease: EASE_UIT_CSS }}
        />
        <motion.text
          x={306}
          y={102}
          fontSize="10"
          fill="var(--ink-faint)"
          fontFamily="var(--font-plex-mono), monospace"
          letterSpacing="1.5"
          initial={reduced ? undefined : { opacity: 0 }}
          animate={actief || reduced ? { opacity: 1 } : reduced ? undefined : { opacity: 0 }}
          transition={{ delay: 0.6 }}
        >
          UW GRENS
        </motion.text>
        {/* het werkitem: stuitert zachtjes tegen de grens, en wacht dan */}
        {!reduced && actief && (
          <motion.circle
            r={4.5}
            cy={214}
            fill={besluit === 'terug' ? 'var(--terra)' : 'var(--oker-deep)'}
            initial={{ cx: 236, opacity: 0 }}
            animate={
              besluit === 'goed'
                ? { cx: [288, 366], opacity: [1, 0] }
                : besluit === 'terug'
                  ? { cx: [288, 232], opacity: [1, 0.9] }
                  : beat >= 1
                    ? { cx: [236, 289, 284, 289], opacity: 1 }
                    : { cx: 236, opacity: 0 }
            }
            transition={
              besluit === 'geen'
                ? { duration: 1.4, times: [0, 0.55, 0.8, 1], ease: 'easeOut' }
                : { duration: 0.9, ease: 'easeInOut' }
            }
          />
        )}
        {/* rimpel op het moment van aantikken */}
        {!reduced && actief && beat >= 1 && besluit === 'geen' && (
          <motion.circle
            cx={293}
            cy={214}
            fill="none"
            stroke="var(--terra)"
            strokeWidth={1}
            initial={{ r: 4, opacity: 0.7 }}
            animate={{ r: 22, opacity: 0 }}
            transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 0.8, delay: 0.8 }}
          />
        )}
      </svg>
      <motion.div
        {...kaartIn(reduced || beat >= 2, reduced)}
        className="absolute bottom-[9%] left-1/2 w-[min(360px,86%)] -translate-x-1/2 rounded-[2px] border border-[var(--terra)]/70 bg-[var(--paper)] px-4 py-3.5 shadow-[var(--shadow-lift)]"
      >
        <div className="font-display text-[15px] text-[var(--ink)]">
          Twijfelgeval. <span className="italic text-[var(--terra)]">U beslist.</span>
        </div>
        <p className="mt-1 text-[12px] leading-[1.5] text-[var(--ink-dim)]">
          Een klant vraagt korting boven uw afspraak. De agent gokt niet; hij wacht.
        </p>
        <div className="mt-2.5 flex flex-wrap gap-2">
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
                {besluit === 'goed' ? 'Verwerkt, met uw akkoord' : 'Terug naar de agent'}
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

/* 07 — Begin klein: het zegel stempelt, met een kleine inktspetter */
export function LaagBegin({ beat, reduced }: LaagProps) {
  const gestempeld = reduced || beat >= 1;
  return (
    <>
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 1.5, y: -18 }}
        animate={gestempeld ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 1.5, y: -18 }}
        transition={{ type: 'spring', stiffness: 240, damping: 15, delay: 0.2 }}
        className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2"
      >
        <span className="font-display text-[56px] italic leading-none text-[var(--paper)]">F</span>
      </motion.div>
      {/* inktspetters bij het neerkomen van het stempel */}
      {!reduced &&
        gestempeld &&
        [
          { x: '38%', y: '30%', d: 0.35 },
          { x: '62%', y: '28%', d: 0.4 },
          { x: '58%', y: '58%', d: 0.45 },
        ].map((s, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-[var(--oker-deep)]"
            style={{ left: s.x, top: s.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.8, 0], scale: [0, 1, 0.6], y: [0, -10, 6] }}
            transition={{ duration: 0.9, delay: s.d }}
          />
        ))}
      <div className="absolute bottom-[7%] left-1/2 flex w-[min(460px,92%)] -translate-x-1/2 items-start justify-center gap-[6%]">
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
