import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { CASES, CASE_BY_SLUG, type CaseStudy } from '@/lib/data/cases';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';

function caseSchema(c: CaseStudy) {
  const url = `${SITE_URL}/cases/${c.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${c.klant} — ${c.tagline}`,
    description: c.intro,
    inLanguage: 'nl-NL',
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    image: `${SITE_URL}/opengraph-image`,
    about: {
      '@type': 'Organization',
      name: c.klant,
      industry: c.branche,
      address: {
        '@type': 'PostalAddress',
        addressRegion: c.regio,
        addressCountry: 'NL',
      },
    },
    articleSection: 'Cases',
    keywords: [c.branche, c.regio, 'AI-agent', 'case study'],
  };
}

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
    title: `${c.klant} · case`,
    description: c.tagline,
    alternates: { canonical: `/cases/${slug}` },
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
      <JsonLd data={caseSchema(c)} />
      <article>
        <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-10 sm:pb-12">
          <div className="mb-6 sm:mb-8">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Cases', href: '/cases' },
                { label: c.klant, href: `/cases/${c.slug}` },
              ]}
            />
          </div>
          <div className="max-w-[760px]">
            <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
              {c.branche} · {c.regio} · {c.doorlooptijd}
            </div>
            <h1 className="mt-4 font-display text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.05] tracking-tight text-[var(--ink)]">
              {c.klant}
            </h1>
            <p className="mt-3 font-display italic text-[18px] sm:text-[22px] text-[var(--oker-deep)]">
              {c.tagline}
            </p>
            <p className="mt-6 text-[15px] sm:text-[16px] leading-[1.75] text-[var(--ink)]">
              {c.intro}
            </p>
          </div>
        </section>

        <section
          className="border-t border-[var(--paper-edge)]"
          style={{ background: 'var(--paper-warm)' }}
        >
          <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-12 sm:py-16">
            <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em] mb-6">
              Resultaat
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
              {c.resultaat.map((r, i) => {
                const accent = ['var(--oker-deep)', 'var(--terra)', 'var(--mos)', 'var(--oker)'][i % 4];
                return (
                  <div key={r.label} className="site-card px-5 py-5">
                    <div className="font-display text-[24px] sm:text-[28px] leading-none" style={{ color: accent }}>
                      {r.metric}
                    </div>
                    <div className="mt-2 text-[12px] text-[var(--ink-dim)] leading-[1.5]">
                      {r.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 grid grid-cols-1 md:grid-cols-2 gap-10">
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
          <section className="border-t border-[var(--paper-edge)] bg-[var(--ink)] relative overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(161, 88, 66, 0.14) 0%, transparent 70%)',
              }}
            />
            <div className="relative mx-auto max-w-[820px] px-5 sm:px-8 lg:px-10 py-16 sm:py-20 text-center">
              <div
                aria-hidden
                className="font-display italic text-[64px] leading-none text-[var(--oker)] opacity-50 mb-2"
              >
                &ldquo;
              </div>
              <p className="font-display italic text-[22px] sm:text-[28px] leading-[1.4] text-[var(--paper)]">
                {c.quote.text}
              </p>
              <div className="mt-8 font-mono text-[11px] text-[var(--oker)] uppercase tracking-[0.18em]">
                {c.quote.by} · {c.quote.role}
              </div>
            </div>
          </section>
        )}

        <section className="border-t border-[var(--paper-edge)] bg-[var(--paper-deep)]">
          <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
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
