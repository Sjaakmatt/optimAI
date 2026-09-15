'use client';

// Het podium naast "wat een agent doet": drie echte fragmenten van de
// werkbank (de mail die binnenkomt, wat de agent opzoekt, het antwoord dat
// klaarstaat), gestapeld met diepte. Het fragment dat bij het actieve punt
// hoort komt naar voren; de andere twee wijken terug, kleiner en zachter.
// Dezelfde bron als de demo: lib/mailagent/cases.

import { motion, useTransform, type MotionValue } from 'motion/react';
import { Check, Mail, Send, Sparkles } from 'lucide-react';
import { MAIL_CASES } from '@/lib/mailagent/cases';

const CASE = MAIL_CASES[0];

export function Podium({ progress, gepind }: { progress: MotionValue<number>; gepind: boolean }) {
  return (
    <div className="relative mt-10 h-[300px] w-full max-w-[460px]" aria-hidden>
      <Kaart index={0} progress={progress} gepind={gepind} naam="mail">
        <div className="flex items-center gap-2 text-[11px] text-[var(--fg-faint)]">
          <Mail size={12} strokeWidth={2} />
          <span className="font-mono uppercase tracking-[0.12em]">Binnengekomen · {CASE.ontvangen}</span>
        </div>
        <div className="mt-2 text-[13.5px] text-[var(--fg)]">{CASE.afzender.naam}</div>
        <div className="text-[12.5px] text-[var(--fg-dim)]">{CASE.onderwerp}</div>
        <p className="mt-2 line-clamp-3 text-[12.5px] leading-[1.55] text-[var(--fg-faint)]">{CASE.body[1]}</p>
      </Kaart>
      <Kaart index={1} progress={progress} gepind={gepind} naam="checks">
        <div className="flex items-center gap-2 text-[11px] text-[var(--fg-faint)]">
          <Sparkles size={12} strokeWidth={2} className="text-[var(--accent-text)]" />
          <span className="font-mono uppercase tracking-[0.12em]">Opgezocht en getoetst</span>
        </div>
        <ul className="mt-2 space-y-1.5">
          {CASE.stappen
            .filter((s) => s.kind === 'check')
            .slice(0, 3)
            .map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-[12px]">
                <Check size={12} strokeWidth={2.2} className="mt-0.5 shrink-0 text-[var(--sage)]" />
                <span className="min-w-0">
                  <span className="text-[var(--fg)]">{s.kind === 'check' ? s.label : ''}</span>
                  <span className="block truncate text-[var(--fg-faint)]">{s.kind === 'check' ? s.value : ''}</span>
                </span>
              </li>
            ))}
        </ul>
      </Kaart>
      <Kaart index={2} progress={progress} gepind={gepind} naam="antwoord">
        <div className="flex items-center gap-2 text-[11px] text-[var(--fg-faint)]">
          <Send size={12} strokeWidth={2} />
          <span className="font-mono uppercase tracking-[0.12em]">Conceptantwoord · wacht op u</span>
        </div>
        <p className="mt-2 line-clamp-2 text-[12.5px] leading-[1.55] text-[var(--fg-dim)]">{CASE.antwoord.alineas[1]}</p>
        <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-[1.55] text-[var(--fg-dim)]">{CASE.antwoord.alineas[2]}</p>
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--fg)] px-3 py-1.5 text-[11.5px] text-[#121014]">
          <Send size={11} strokeWidth={2} />
          Goedkeuren en versturen
        </div>
      </Kaart>
    </div>
  );
}

function Kaart({
  index,
  progress,
  gepind,
  naam,
  children,
}: {
  index: number;
  progress: MotionValue<number>;
  gepind: boolean;
  naam: string;
  children: React.ReactNode;
}) {
  // Actief in zijn eigen derde van de scroll; daarbuiten wijkt de kaart terug.
  const midden = (index + 0.5) / 3;
  const afstand = useTransform(progress, (p) => Math.min(1, Math.abs(p - midden) * 3));
  const y = useTransform(afstand, [0, 1], [0, 26 + index * 6]);
  const schaal = useTransform(afstand, [0, 1], [1, 0.93]);
  const opacity = useTransform(afstand, [0, 0.6, 1], [1, 0.55, 0.35]);
  const blur = useTransform(afstand, [0, 1], ['blur(0px)', 'blur(1.5px)']);
  const z = useTransform(afstand, (a) => 10 - Math.round(a * 9));
  const rust = { y: index * 18, scale: 1 - index * 0.04, opacity: 1 - index * 0.25, zIndex: 3 - index };

  return (
    <motion.div
      data-vlak={`podium-${naam}`}
      className="absolute inset-x-0 top-0 rounded-[16px] border border-[var(--border)] bg-[rgba(18,17,22,0.92)] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur"
      style={gepind ? { y, scale: schaal, opacity, filter: blur, zIndex: z } : rust}
    >
      {children}
    </motion.div>
  );
}
