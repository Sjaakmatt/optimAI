import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { CASES, CASE_BY_SLUG } from '@/lib/data/cases';

export async function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = CASE_BY_SLUG[slug];
  if (!c) return { title: 'Case niet gevonden' };
  return {
    title: `${c.klant} — case`,
    description: c.tagline,
  };
}

export default async function CaseDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = CASE_BY_SLUG[slug];
  if (!c) notFound();

  const currentIndex = CASES.findIndex((x) => x.slug === slug);
  const next = CASES[(currentIndex + 1) % CASES.length];

  return (
    <SitePage>
      <article>
        <section className="mx-auto max-w-[1080px] px-6 sm:px-10 pt-14 pb-12">
          <Link
            href="/cases"
            className="inline-flex items-center gap-1.5 text-[13px] text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors mb-8"
          >
            <ArrowLeft size={13} strokeWidth={1.5} />
            Alle cases
          </Link>
          <div className="max-w-[760px]">
            <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
              {c.branche} · {c.regio} · {c.doorlooptijd}
            </div>
            <h1 className="mt-4 font-display text-[40px] sm:text-[52px] leading-[1.05] tracking-tight text-[var(--ink)]">
              {c.klant}
            </h1>
            <p className="mt-3 font-display italic text-[20px] text-[var(--ink-dim)]">
              {c.tagline}
            </p>
            <p className="mt-6 text-[16px] leading-[1.7] text-[var(--ink)]">{c.intro}</p>
          </div>
        </section>

        <section className="border-t border-[var(--paper-edge)] bg-[var(--paper-deep)]">
          <div className="mx-auto max-w-[1080px] px-6 sm:px-10 py-14">
            <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em] mb-6">
              Resultaat
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {c.resultaat.map((r) => (
                <div key={r.label} className="artifact-card px-5 py-5">
                  <div className="font-display text-[28px] text-[var(--ink)] leading-none">
                    {r.metric}
                  </div>
                  <div className="mt-2 text-[12px] text-[var(--ink-dim)] leading-[1.5]">
                    {r.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1080px] px-6 sm:px-10 py-14 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
              Uitdaging
            </div>
            <h2 className="mt-2 font-display text-[22px] text-[var(--ink)]">
              Wat er vast zat.
            </h2>
            <ul className="mt-4 space-y-2.5 text-[14px] leading-[1.6] text-[var(--ink)]">
              {c.uitdaging.map((u, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-mono text-[11px] text-[var(--ink-faint)] tabular-nums pt-1 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
              Oplossing
            </div>
            <h2 className="mt-2 font-display text-[22px] text-[var(--ink)]">
              Wat we hebben gebouwd.
            </h2>
            <ul className="mt-4 space-y-2.5 text-[14px] leading-[1.6] text-[var(--ink)]">
              {c.oplossing.map((o, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-[var(--oker)] pt-1 shrink-0">→</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {c.quote && (
          <section className="border-t border-[var(--paper-edge)]">
            <div className="mx-auto max-w-[820px] px-6 sm:px-10 py-14 text-center">
              <p className="font-display italic text-[24px] sm:text-[28px] leading-[1.35] text-[var(--ink)]">
                {c.quote.text}
              </p>
              <div className="mt-6 font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.18em]">
                {c.quote.by} · {c.quote.role}
              </div>
            </div>
          </section>
        )}

        <section className="border-t border-[var(--paper-edge)] bg-[var(--paper-deep)]">
          <div className="mx-auto max-w-[1080px] px-6 sm:px-10 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.18em]">
                Volgende case
              </div>
              <Link
                href={`/cases/${next.slug}`}
                className="mt-1 font-display text-[24px] text-[var(--ink)] hover:text-[var(--oker-deep)] transition-colors flex items-center gap-2"
              >
                {next.klant}
                <ArrowRight size={18} strokeWidth={1.8} />
              </Link>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
            >
              Iets soortgelijks bespreken
              <ArrowRight size={16} strokeWidth={1.8} />
            </Link>
          </div>
        </section>
      </article>
    </SitePage>
  );
}
