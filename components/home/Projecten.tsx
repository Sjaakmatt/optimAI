'use client';

// De projectstrook. Op een breed scherm blijft de strook staan en reist hij
// zijwaarts mee met het scrollen: vier kaarten trekken voorbij. Op een
// telefoon is het een gewone strook die de bezoeker zelf schuift.
// Per case een gecodeerde visual van wat er gebouwd is; later in te wisselen
// voor foto's of video's, de kaart blijft dezelfde.

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, useTransform } from 'motion/react';
import { ArrowRight, MapPin, Camera, CheckCircle2, CalendarDays, FileText } from 'lucide-react';
import { CASES } from '@/lib/data/cases';
import { Opkomend, Verschijn } from './Opkomend';
import { useMediaQuery } from './useMediaQuery';
import { useSectieProgress } from './useSectieProgress';

const VISUALS: Record<string, React.ReactNode> = {
  'pavo-lead-agent': <VisualKaart />,
  'teka-kranen-inspectie': <VisualInspectie />,
  'bint-projectdashboard': <VisualDossier />,
  'praktijk-de-driehoek-praktijksysteem': <VisualPraktijk />,
};

export function Projecten() {
  const breed = useMediaQuery('(min-width: 1024px)');
  const reduced = useReducedMotion() ?? false;
  const gepind = breed && !reduced;
  const ref = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [reis, setReis] = useState(0);
  const progress = useSectieProgress(ref, gepind);
  const x = useTransform(progress, [0.1, 0.9], [0, -reis]);

  // Hoe ver de rail moet reizen: zijn eigen breedte min wat er al in beeld past.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail || !gepind) return;
    // De rail is zo breed als zijn inhoud; wat in beeld past is de breedte van zijn ouder.
    const meet = () => setReis(Math.max(0, rail.scrollWidth - (rail.parentElement?.clientWidth ?? rail.clientWidth)));
    meet();
    const obs = new ResizeObserver(meet);
    obs.observe(rail);
    if (rail.parentElement) obs.observe(rail.parentElement);
    return () => obs.disconnect();
  }, [gepind]);

  const kop = (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-[640px]">
        <Opkomend
          as="h2"
          inView
          className="font-display text-[30px] leading-[1.06] tracking-[-0.03em] text-[var(--fg)] sm:text-[40px] lg:text-[48px]"
          regels={['Gebouwd, en in gebruik.']}
        />
        <Verschijn inView vertraging={0.2}>
          <p className="mt-5 text-[15.5px] leading-[1.65] text-[var(--fg-dim)] sm:text-[17px]">
            Vier bedrijven, vier agents die elke dag draaien. Geen pilots: dit is werk dat nu wordt gedaan.
          </p>
        </Verschijn>
      </div>
      <Verschijn inView vertraging={0.2}>
        <Link href="/cases" className="knop knop-glas shrink-0">
          Alle cases
          <ArrowRight size={15} strokeWidth={2} />
        </Link>
      </Verschijn>
    </div>
  );

  // Binnen elke kaart schuift de visual een fractie tegen de rail in: diepte
  // in de kaart zelf terwijl de rail reist.
  const binnenX = useTransform(x, (v) => v * -0.06);

  const kaarten = CASES.map((c) => (
    <article key={c.slug} data-kaart className="site-card group snap-start shrink-0 w-[86vw] max-w-[440px] sm:w-[440px] overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-[var(--border)] bg-[var(--bg-2)]">
        <motion.div
          data-vlak="kaart-visual"
          className="absolute inset-[-6%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={gepind ? { x: binnenX } : undefined}
        >
          {VISUALS[c.slug]}
        </motion.div>
        {c.logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={c.logo} alt={c.klant} className="absolute left-4 top-4 h-6 w-auto brightness-0 invert opacity-80" />
        )}
      </div>
      <div className="px-5 py-5">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--fg-faint)]">{c.branche}</div>
        <h3 className="mt-2 text-[17px] leading-snug text-[var(--fg)]">{c.tagline}</h3>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {c.resultaat.slice(0, 2).map((r) => (
            <li key={r.metric} className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[11.5px] text-[var(--fg-dim)]">
              {r.metric}
            </li>
          ))}
        </ul>
        <Link
          href={`/cases/${c.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] text-[var(--accent-text)] transition-colors hover:text-[var(--fg)]"
        >
          Lees de case
          <ArrowRight size={14} strokeWidth={2} />
        </Link>
      </div>
    </article>
  ));

  if (!gepind) {
    return (
      <section className="band pt-24 sm:pt-32">
        {kop}
        <div className="projecten-strook mt-10 -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10">
          {kaarten}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[260vh] pt-24 sm:pt-32">
      <div className="sticky top-0 flex min-h-screen flex-col justify-center pt-16">
        <div className="band">{kop}</div>
        <div className="mt-10 overflow-hidden">
          <div className="band">
            <motion.div ref={railRef} style={{ x }} className="flex w-max gap-5 pr-[10vw] pb-4">
              {kaarten}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- visuals ---------- */

function Raster({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      {children}
    </div>
  );
}

function VisualKaart() {
  const pins = [
    [38, 42],
    [52, 58],
    [61, 36],
    [70, 62],
    [45, 70],
  ];
  return (
    <Raster>
      <svg viewBox="0 0 100 75" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="pavo-gebied" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d99a4e" stopOpacity="0.28" />
            <stop offset="1" stopColor="#c4643f" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <path d="M8 30 C 20 18, 40 12, 58 20 S 92 30, 88 48 S 70 70, 50 68 S 12 62, 8 30 Z" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
        <path d="M30 34 C 40 26, 58 28, 66 34 S 76 52, 66 60 S 40 66, 34 56 S 24 42, 30 34 Z" fill="url(#pavo-gebied)" stroke="#e9b46a" strokeWidth="0.8" strokeDasharray="2 1.5" />
        {pins.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="3.2" fill="#d99a4e" opacity="0.25" />
            <circle cx={x} cy={y} r="1.3" fill="#f0b27a" />
          </g>
        ))}
      </svg>
      <div className="absolute right-4 bottom-4 w-[58%] rounded-[12px] border border-[var(--border)] bg-[rgba(16,16,19,0.92)] p-3 text-[11px]">
        <div className="flex items-center gap-1.5 text-[var(--fg-faint)]">
          <MapPin size={11} strokeWidth={2} />
          <span className="font-mono text-[9.5px] uppercase tracking-[0.12em]">Regio Alkmaar · 5 leads</span>
        </div>
        <ul className="mt-2 space-y-1.5">
          {[
            ['Bouwbedrijf Kok', 'Vacature · 3 open'],
            ['De Vries Logistiek', 'Groei · +12 fte'],
            ['Hotel Zeezicht', 'Verloop · seizoen'],
          ].map(([naam, signaal]) => (
            <li key={naam} className="flex items-center justify-between gap-2">
              <span className="text-[var(--fg)]">{naam}</span>
              <span className="text-[var(--fg-faint)]">{signaal}</span>
            </li>
          ))}
        </ul>
      </div>
    </Raster>
  );
}

function VisualInspectie() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #1b1a20 0%, #121115 60%, #0f0f12 100%)' }} />
      <svg viewBox="0 0 100 75" className="absolute inset-0 h-full w-full" aria-hidden>
        <g stroke="rgba(255,255,255,0.55)" strokeWidth="0.9" fill="none" strokeLinecap="round">
          <path d="M22 70 V 22" />
          <path d="M22 22 L 78 30" />
          <path d="M22 30 L 60 26" />
          <path d="M22 38 L 45 30" />
          <path d="M18 70 H 30" />
          <path d="M70 29 V 46" />
          <path d="M67 46 H 73 V 50 H 67 Z" fill="rgba(255,255,255,0.35)" />
          <path d="M16 20 H 28 V 24 H 16 Z" fill="rgba(255,255,255,0.35)" />
        </g>
        {[
          [50, 27, 'A'],
          [22, 46, 'B'],
          [70, 48, 'C'],
        ].map(([x, y, l]) => (
          <g key={String(l)}>
            <circle cx={x} cy={y} r="4.2" fill="#d99a4e" opacity="0.22" />
            <circle cx={x} cy={y} r="2.6" fill="none" stroke="#f0b27a" strokeWidth="0.7" />
            <text x={x} y={Number(y) + 1} textAnchor="middle" fontSize="2.6" fill="#f0b27a" fontFamily="monospace">
              {l}
            </text>
          </g>
        ))}
      </svg>
      <div className="absolute left-4 bottom-4 flex items-center gap-2 rounded-full border border-[var(--border)] bg-[rgba(16,16,19,0.9)] px-3 py-1.5 text-[11px] text-[var(--fg-dim)]">
        <Camera size={12} strokeWidth={2} className="text-[var(--accent-text)]" />
        Foto op locatie · 3 annotaties
      </div>
      <div className="absolute right-4 bottom-4 w-[42%] rounded-[12px] border border-[var(--border)] bg-[rgba(16,16,19,0.92)] p-3 text-[11px]">
        <div className="flex items-center gap-1.5 text-[var(--fg-faint)]">
          <FileText size={11} strokeWidth={2} />
          <span className="font-mono text-[9.5px] uppercase tracking-[0.12em]">Rapport</span>
        </div>
        <div className="mt-2 space-y-1.5">
          {['Giek · speling 4 mm', 'Kabel · ok', 'Haak · vervangen'].map((r) => (
            <div key={r} className="flex items-center gap-1.5 text-[var(--fg)]">
              <CheckCircle2 size={11} className="text-[var(--sage)]" />
              {r}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VisualDossier() {
  const fasen = [
    ['Aanvraag', 100],
    ['Opmeten', 100],
    ['Ontwerp', 100],
    ['Productie', 64],
    ['Montage', 0],
  ] as const;
  return (
    <Raster>
      <div className="absolute inset-x-5 top-12 rounded-[14px] border border-[var(--border)] bg-[rgba(16,16,19,0.92)] p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-[var(--fg-faint)]">Project 2026-114</div>
            <div className="mt-0.5 text-[13px] text-[var(--fg)]">Keuken · fam. Bakker, Hoorn</div>
          </div>
          <span className="rounded-full bg-[var(--accent-soft)] px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-[var(--accent-text)]">
            In productie
          </span>
        </div>
        <ol className="mt-4 space-y-2">
          {fasen.map(([naam, pct]) => (
            <li key={naam} className="flex items-center gap-3 text-[11px]">
              <span className="w-16 text-[var(--fg-dim)]">{naam}</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--surface-2)]">
                <span className="block h-full rounded-full" style={{ width: `${pct}%`, background: pct === 100 ? 'var(--sage)' : 'var(--accent)' }} />
              </span>
              <span className="w-8 text-right font-mono text-[9.5px] text-[var(--fg-faint)]">{pct}%</span>
            </li>
          ))}
        </ol>
      </div>
    </Raster>
  );
}

function VisualPraktijk() {
  const stappen = ['Aanmelding', 'Intake', 'Sessies', 'Factuur'];
  return (
    <Raster>
      <div className="absolute inset-x-5 top-10 flex items-center justify-between">
        {stappen.map((s, i) => (
          <div key={s} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={`grid h-7 w-7 place-items-center rounded-full border text-[10px] ${
                  i < 3 ? 'border-[var(--sage)] bg-[rgba(155,178,131,0.16)] text-[var(--sage)]' : 'border-[var(--border)] text-[var(--fg-faint)]'
                }`}
              >
                {i < 3 ? <CheckCircle2 size={12} /> : i + 1}
              </span>
              <span className="text-[10px] text-[var(--fg-dim)]">{s}</span>
            </div>
            {i < stappen.length - 1 && <span className="mx-1 mb-5 h-px flex-1 bg-[var(--border-strong)]" />}
          </div>
        ))}
      </div>
      <div className="absolute inset-x-5 bottom-4 grid grid-cols-2 gap-3">
        <div className="rounded-[12px] border border-[var(--border)] bg-[rgba(16,16,19,0.92)] p-3 text-[11px]">
          <div className="flex items-center gap-1.5 text-[var(--fg-faint)]">
            <CalendarDays size={11} strokeWidth={2} />
            <span className="font-mono text-[9.5px] uppercase tracking-[0.12em]">Agenda</span>
          </div>
          <div className="mt-1.5 text-[var(--fg)]">Di 14:00 · sessie 4</div>
          <div className="text-[var(--fg-faint)]">materiaal verstuurd</div>
        </div>
        <div className="rounded-[12px] border border-[var(--border)] bg-[rgba(16,16,19,0.92)] p-3 text-[11px]">
          <div className="flex items-center gap-1.5 text-[var(--fg-faint)]">
            <FileText size={11} strokeWidth={2} />
            <span className="font-mono text-[9.5px] uppercase tracking-[0.12em]">Factuur</span>
          </div>
          <div className="mt-1.5 text-[var(--fg)]">F-2026-081 · klaar</div>
          <div className="text-[var(--fg-faint)]">wacht op akkoord</div>
        </div>
      </div>
    </Raster>
  );
}
