"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Camera,
  CheckCircle2,
  CalendarDays,
  FileText,
} from "lucide-react";
import { CASES } from "@/lib/data/cases";

const VISUALS: Record<string, React.ReactNode> = {
  "pavo-lead-agent": <VisualKaart />,
  "teka-kranen-inspectie": <VisualInspectie />,
  "bint-projectdashboard": <VisualDossier />,
  "praktijk-de-driehoek-praktijksysteem": <VisualPraktijk />,
};

export function Projecten() {
  const rail = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const measure = useCallback(() => {
    const el = rail.current;
    if (el)
      setEdges({
        start: el.scrollLeft <= 2,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 3,
      });
  }, []);
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    measure();
    return () => observer.disconnect();
  }, [measure]);
  function move(direction: number) {
    const el = rail.current;
    const card = el?.querySelector<HTMLElement>(".case-card");
    if (!el || !card) return;
    el.scrollBy({
      left:
        direction *
        (card.offsetWidth + (parseFloat(getComputedStyle(el).columnGap) || 0)),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  return (
    <section className="case-section" aria-labelledby="cases-heading">
      <div className="case-heading band">
        <div>
          <p className="editorial-label">Klantcases</p>
          <h2 id="cases-heading">
            Gebouwd.
            <br />
            <em>En al aan het werk.</em>
          </h2>
        </div>
        <div>
          <p>
            Van eerste aanvraag tot live in productie
            <br />
            Dit hebben we samen met onze klanten gebouwd.
          </p>
          <Link href="/cases">
            Alle cases <ArrowUpRight size={17} />
          </Link>
          <div className="video-arrows case-arrows">
            <button
              aria-label="Vorige cases"
              disabled={edges.start}
              onClick={() => move(-1)}
            >
              <ArrowLeft size={19} />
            </button>
            <button
              aria-label="Volgende cases"
              disabled={edges.end}
              onClick={() => move(1)}
            >
              <ArrowRight size={19} />
            </button>
            <span>Scroll of swipe door de projecten</span>
          </div>
        </div>
      </div>
      <div
        className="case-rail"
        ref={rail}
        onScroll={measure}
        tabIndex={0}
        aria-label="Projecten van onze klanten"
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        {CASES.map((c, i) => (
          <article key={c.slug} className={`case-card case-card-${i}`}>
            <Link
              href={`/cases/${c.slug}`}
              className="case-visual-link"
              aria-label={`Bekijk de case van ${c.klant}`}
            >
              <div className="case-visual">
                <div className="case-window">
                  <div className="case-window-bar">
                    <span className="window-dots">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span>{c.klant} · Werkruimte</span>
                  </div>
                  <div className="case-screen">{VISUALS[c.slug]}</div>
                </div>
                <span className="case-visual-label">
                  Illustratie van de oplossing
                </span>
                <span className="case-open">
                  <ArrowUpRight size={20} />
                </span>
              </div>
            </Link>
            <div className="case-card-copy">
              <div className="case-meta">
                <span>{c.klant}</span>
                <span>0{i + 1}</span>
              </div>
              <h3>
                <Link href={`/cases/${c.slug}`}>{c.tagline}</Link>
              </h3>
              <div className="case-results">
                {c.resultaat.slice(0, 2).map((r) => (
                  <span key={r.metric}>{r.metric}</span>
                ))}
              </div>
              <Link className="case-read" href={`/cases/${c.slug}`}>
                Ontdek het project <ArrowUpRight size={15} />
              </Link>
            </div>
          </article>
        ))}
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
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
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
      <svg
        viewBox="0 0 100 75"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="pavo-gebied" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d99a4e" stopOpacity="0.28" />
            <stop offset="1" stopColor="#c4643f" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <path
          d="M8 30 C 20 18, 40 12, 58 20 S 92 30, 88 48 S 70 70, 50 68 S 12 62, 8 30 Z"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.6"
        />
        <path
          d="M30 34 C 40 26, 58 28, 66 34 S 76 52, 66 60 S 40 66, 34 56 S 24 42, 30 34 Z"
          fill="url(#pavo-gebied)"
          stroke="#e9b46a"
          strokeWidth="0.8"
          strokeDasharray="2 1.5"
        />
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
          <span className="font-mono text-[9.5px] uppercase tracking-[0.12em]">
            Regio Alkmaar · 5 leads
          </span>
        </div>
        <ul className="mt-2 space-y-1.5">
          {[
            ["Bouwbedrijf Kok", "Vacature · 3 open"],
            ["De Vries Logistiek", "Groei · +12 fte"],
            ["Hotel Zeezicht", "Verloop · seizoen"],
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
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #1b1a20 0%, #121115 60%, #0f0f12 100%)",
        }}
      />
      <svg
        viewBox="0 0 100 75"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <g
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="0.9"
          fill="none"
          strokeLinecap="round"
        >
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
          [50, 27, "A"],
          [22, 46, "B"],
          [70, 48, "C"],
        ].map(([x, y, l]) => (
          <g key={String(l)}>
            <circle cx={x} cy={y} r="4.2" fill="#d99a4e" opacity="0.22" />
            <circle
              cx={x}
              cy={y}
              r="2.6"
              fill="none"
              stroke="#f0b27a"
              strokeWidth="0.7"
            />
            <text
              x={x}
              y={Number(y) + 1}
              textAnchor="middle"
              fontSize="2.6"
              fill="#f0b27a"
              fontFamily="monospace"
            >
              {l}
            </text>
          </g>
        ))}
      </svg>
      <div className="absolute left-4 bottom-4 flex items-center gap-2 rounded-full border border-[var(--border)] bg-[rgba(16,16,19,0.9)] px-3 py-1.5 text-[11px] text-[var(--fg-dim)]">
        <Camera
          size={12}
          strokeWidth={2}
          className="text-[var(--accent-text)]"
        />
        Foto op locatie · 3 annotaties
      </div>
      <div className="absolute right-4 bottom-4 w-[42%] rounded-[12px] border border-[var(--border)] bg-[rgba(16,16,19,0.92)] p-3 text-[11px]">
        <div className="flex items-center gap-1.5 text-[var(--fg-faint)]">
          <FileText size={11} strokeWidth={2} />
          <span className="font-mono text-[9.5px] uppercase tracking-[0.12em]">
            Rapport
          </span>
        </div>
        <div className="mt-2 space-y-1.5">
          {["Giek · speling 4 mm", "Kabel · ok", "Haak · vervangen"].map(
            (r) => (
              <div
                key={r}
                className="flex items-center gap-1.5 text-[var(--fg)]"
              >
                <CheckCircle2 size={11} className="text-[var(--sage)]" />
                {r}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

function VisualDossier() {
  const fasen = [
    ["Aanvraag", 100],
    ["Opmeten", 100],
    ["Ontwerp", 100],
    ["Productie", 64],
    ["Montage", 0],
  ] as const;
  return (
    <Raster>
      <div className="absolute inset-x-5 top-12 rounded-[14px] border border-[var(--border)] bg-[rgba(16,16,19,0.92)] p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-[var(--fg-faint)]">
              Project 2026-114
            </div>
            <div className="mt-0.5 text-[13px] text-[var(--fg)]">
              Keuken · fam. Bakker, Hoorn
            </div>
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
                <span
                  className="block h-full rounded-full"
                  style={{
                    width: `${pct}%`,
                    background: pct === 100 ? "var(--sage)" : "var(--accent)",
                  }}
                />
              </span>
              <span className="w-8 text-right font-mono text-[9.5px] text-[var(--fg-faint)]">
                {pct}%
              </span>
            </li>
          ))}
        </ol>
      </div>
    </Raster>
  );
}

function VisualPraktijk() {
  const stappen = ["Aanmelding", "Intake", "Sessies", "Factuur"];
  return (
    <Raster>
      <div className="absolute inset-x-5 top-10 flex items-center justify-between">
        {stappen.map((s, i) => (
          <div key={s} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={`grid h-7 w-7 place-items-center rounded-full border text-[10px] ${
                  i < 3
                    ? "border-[var(--sage)] bg-[rgba(155,178,131,0.16)] text-[var(--sage)]"
                    : "border-[var(--border)] text-[var(--fg-faint)]"
                }`}
              >
                {i < 3 ? <CheckCircle2 size={12} /> : i + 1}
              </span>
              <span className="text-[10px] text-[var(--fg-dim)]">{s}</span>
            </div>
            {i < stappen.length - 1 && (
              <span className="mx-1 mb-5 h-px flex-1 bg-[var(--border-strong)]" />
            )}
          </div>
        ))}
      </div>
      <div className="absolute inset-x-5 bottom-4 grid grid-cols-2 gap-3">
        <div className="rounded-[12px] border border-[var(--border)] bg-[rgba(16,16,19,0.92)] p-3 text-[11px]">
          <div className="flex items-center gap-1.5 text-[var(--fg-faint)]">
            <CalendarDays size={11} strokeWidth={2} />
            <span className="font-mono text-[9.5px] uppercase tracking-[0.12em]">
              Agenda
            </span>
          </div>
          <div className="mt-1.5 text-[var(--fg)]">Di 14:00 · sessie 4</div>
          <div className="text-[var(--fg-faint)]">materiaal verstuurd</div>
        </div>
        <div className="rounded-[12px] border border-[var(--border)] bg-[rgba(16,16,19,0.92)] p-3 text-[11px]">
          <div className="flex items-center gap-1.5 text-[var(--fg-faint)]">
            <FileText size={11} strokeWidth={2} />
            <span className="font-mono text-[9.5px] uppercase tracking-[0.12em]">
              Factuur
            </span>
          </div>
          <div className="mt-1.5 text-[var(--fg)]">F-2026-081 · klaar</div>
          <div className="text-[var(--fg-faint)]">wacht op akkoord</div>
        </div>
      </div>
    </Raster>
  );
}
