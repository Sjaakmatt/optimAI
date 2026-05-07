'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';
import type { CaseStudy } from '@/lib/data/cases';

const ALL = '__all__';

interface Filter {
  branche: string;
  regio: string;
}

export function CasesList({ cases }: { cases: CaseStudy[] }) {
  const [filter, setFilter] = useState<Filter>({ branche: ALL, regio: ALL });

  const branches = useMemo(
    () => Array.from(new Set(cases.map((c) => c.branche))).sort(),
    [cases],
  );
  const regios = useMemo(
    () => Array.from(new Set(cases.map((c) => c.regio))).sort(),
    [cases],
  );

  const filtered = useMemo(() => {
    return cases.filter((c) => {
      if (filter.branche !== ALL && c.branche !== filter.branche) return false;
      if (filter.regio !== ALL && c.regio !== filter.regio) return false;
      return true;
    });
  }, [cases, filter]);

  const isFiltered = filter.branche !== ALL || filter.regio !== ALL;

  return (
    <>
      <section
        className="border-y border-[var(--paper-edge)]"
        style={{ background: 'var(--paper-warm)' }}
      >
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-6 sm:py-8 grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] items-start gap-4 sm:gap-6">
          <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.18em] sm:pt-2.5">
            Filter
          </div>

          <div className="space-y-3">
            <FilterRow
              label="Branche"
              value={filter.branche}
              options={branches}
              onChange={(v) => setFilter((f) => ({ ...f, branche: v }))}
            />
            <FilterRow
              label="Regio"
              value={filter.regio}
              options={regios}
              onChange={(v) => setFilter((f) => ({ ...f, regio: v }))}
            />
          </div>

          <div className="flex flex-col items-start sm:items-end gap-2 sm:pt-1">
            <div className="font-mono text-[11px] text-[var(--ink-dim)] tabular-nums">
              {filtered.length} van {cases.length} cases
            </div>
            {isFiltered && (
              <button
                type="button"
                onClick={() => setFilter({ branche: ALL, regio: ALL })}
                className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink-dim)] hover:text-[var(--oker-deep)] transition-colors"
              >
                <X size={12} strokeWidth={2} />
                Wis filters
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-12 sm:py-14 space-y-5">
        {filtered.length === 0 ? (
          <div className="border border-dashed border-[var(--paper-edge)] rounded-[2px] px-6 py-10 text-center">
            <p className="font-display text-[18px] text-[var(--ink-dim)]">
              Geen cases gevonden voor deze combinatie.
            </p>
            <button
              type="button"
              onClick={() => setFilter({ branche: ALL, regio: ALL })}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-[2px] text-[13px] text-[var(--ink)] border border-[var(--paper-edge)] hover:border-[var(--oker)] hover:bg-[var(--paper-warm)] transition-colors"
            >
              Toon alle cases
            </button>
          </div>
        ) : (
          filtered.map((c, i) => {
            const accent = ['var(--oker-deep)', 'var(--terra)', 'var(--mos)'][i % 3];
            return (
              <Link
                key={c.slug}
                href={`/cases/${c.slug}`}
                className="block site-card px-6 sm:px-8 py-6 sm:py-7 group"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="min-w-0">
                    <div
                      className="font-mono text-[10px] uppercase tracking-[0.16em]"
                      style={{ color: accent }}
                    >
                      {c.branche} · {c.regio}
                    </div>
                    <h2 className="mt-1 font-display text-[22px] sm:text-[26px] leading-tight text-[var(--ink)] group-hover:text-[var(--oker-deep)] transition-colors">
                      {c.klant}
                    </h2>
                    <p className="mt-1 text-[15px] text-[var(--ink-dim)] italic">{c.tagline}</p>
                  </div>
                  <div className="flex items-baseline gap-5 shrink-0">
                    {c.resultaat.slice(0, 2).map((r) => (
                      <div key={r.label} className="text-right">
                        <div
                          className="font-display text-[20px] sm:text-[22px]"
                          style={{ color: accent }}
                        >
                          {r.metric}
                        </div>
                        <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-wider">
                          {r.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[var(--paper-edge)] flex items-center justify-between text-[12px]">
                  <span className="font-mono text-[var(--ink-faint)] uppercase tracking-wider">
                    {c.doorlooptijd}
                  </span>
                  <span className="font-mono text-[var(--oker-deep)] group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                    Lees de case
                    <ArrowRight size={13} strokeWidth={1.8} />
                  </span>
                </div>
              </Link>
            );
          })
        )}
      </section>
    </>
  );
}

function FilterRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.14em] w-[60px] sm:w-[72px] shrink-0">
        {label}
      </span>
      <button
        type="button"
        onClick={() => onChange(ALL)}
        className={`px-3 py-1.5 rounded-[2px] text-[12px] border transition-colors ${
          value === ALL
            ? 'border-[var(--oker)] bg-[var(--paper)] text-[var(--ink)]'
            : 'border-[var(--paper-edge)] bg-transparent text-[var(--ink-dim)] hover:border-[var(--oker)] hover:bg-[var(--paper)]'
        }`}
      >
        Alle
      </button>
      {options.map((o) => {
        const active = value === o;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(active ? ALL : o)}
            className={`px-3 py-1.5 rounded-[2px] text-[12px] border transition-colors ${
              active
                ? 'border-[var(--oker)] bg-[var(--paper)] text-[var(--ink)]'
                : 'border-[var(--paper-edge)] bg-transparent text-[var(--ink-dim)] hover:border-[var(--oker)] hover:bg-[var(--paper)]'
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}
