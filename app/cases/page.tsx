import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { CASES } from '@/lib/data/cases';

export const metadata: Metadata = {
  title: 'Cases · klanten en resultaten',
  description:
    'Drie voorbeelden van hoe we AI-agents bouwden voor MKB-klanten in groothandel, installatietechniek en transport.',
  alternates: { canonical: '/cases' },
};

export default function CasesPage() {
  return (
    <SitePage>
      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-14 sm:pt-20 pb-10">
        <div className="max-w-[720px]">
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
            Cases
          </div>
          <h1 className="mt-4 font-display text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.05] tracking-tight text-[var(--ink)]">
            Wat we eerder bouwden.<br />
            <span className="italic text-[var(--oker-deep)]">En wat het opleverde.</span>
          </h1>
          <p className="mt-6 text-[15px] sm:text-[16px] leading-[1.7] text-[var(--ink-dim)]">
            Drie MKB-bedrijven, drie andere processen, één aanpak. Namen aangepast waar klanten
            daarom vroegen.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pb-20 space-y-5">
        {CASES.map((c) => (
          <Link
            key={c.slug}
            href={`/cases/${c.slug}`}
            className="block site-card px-6 sm:px-8 py-6 sm:py-7 group"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="min-w-0">
                <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">
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
                    <div className="font-display text-[20px] sm:text-[22px] text-[var(--oker-deep)]">
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
        ))}
      </section>
    </SitePage>
  );
}
