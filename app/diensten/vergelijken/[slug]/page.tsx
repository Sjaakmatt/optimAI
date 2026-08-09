import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { calPopupAttrs } from '@/components/booking/config';
import { COMPARISONS, COMPARISON_BY_SLUG } from '@/lib/data/comparisons';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';

export async function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = COMPARISON_BY_SLUG[slug];
  if (!c) return { title: 'Vergelijking niet gevonden' };
  return {
    title: c.pageTitle,
    description: c.metaDescription,
    alternates: { canonical: `/diensten/vergelijken/${slug}` },
    openGraph: {
      title: `${c.pageTitle} · FactumAI`,
      description: c.metaDescription,
      url: `${SITE_URL}/diensten/vergelijken/${slug}`,
    },
  };
}

export default async function VergelijkenPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = COMPARISON_BY_SLUG[slug];
  if (!c) notFound();

  const url = `${SITE_URL}/diensten/vergelijken/${c.slug}`;

  const FAQ_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const ARTICLE_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.pageTitle,
    description: c.metaDescription,
    inLanguage: 'nl-NL',
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/over#sjaak-ter-veld`,
      name: 'Sjaak ter Veld',
      url: `${SITE_URL}/over`,
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    image: `${SITE_URL}/opengraph-image`,
  };

  const otherComparisons = COMPARISONS.filter((x) => x.slug !== c.slug);

  return (
    <SitePage>
      <JsonLd data={[ARTICLE_SCHEMA, FAQ_SCHEMA]} />

      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-10">
        <div className="mb-6 sm:mb-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Diensten', href: '/diensten/ai-agent-laten-bouwen' },
              { label: 'Vergelijken', href: '/diensten/ai-agent-laten-bouwen' },
              { label: c.alternative, href: `/diensten/vergelijken/${c.slug}` },
            ]}
          />
        </div>
        <div className="max-w-[820px]">
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
            {c.heroEyebrow}
          </div>
          <h1 className="mt-4 font-display text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-tight text-[var(--ink)]">
            {c.heroTitle}
            <br />
            <span
              className="italic text-[var(--oker-deep)]"
              dangerouslySetInnerHTML={{ __html: c.heroItalic }}
            />
          </h1>
          <p className="mt-5 text-[16px] sm:text-[17px] leading-[1.65] text-[var(--ink-dim)] max-w-[680px]">
            {c.intro}
          </p>
        </div>
      </section>

      <section className="border-t border-[var(--paper-edge)]">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-12 sm:py-16">
          <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
            Het verschil op een rij
          </div>
          <h2 className="mt-2 font-display text-[26px] sm:text-[34px] leading-tight text-[var(--ink)]">
            AI-agent vs {c.alternative}.
          </h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] text-[14px] border-collapse">
              <thead>
                <tr className="text-left">
                  <th className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.18em] py-3 pr-4 border-b border-[var(--paper-edge)]"></th>
                  <th className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.18em] py-3 px-4 border-b border-[var(--paper-edge)]">
                    AI-agent
                  </th>
                  <th className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.18em] py-3 pl-4 border-b border-[var(--paper-edge)]">
                    {c.alternativeColumnLabel ?? c.alternative}
                  </th>
                </tr>
              </thead>
              <tbody className="text-[var(--ink)]">
                {c.rows.map((r) => (
                  <tr key={r.feature} className="border-b border-[var(--paper-edge)]">
                    <td className="py-3 pr-4 font-display text-[14px]">{r.feature}</td>
                    <td className="py-3 px-4 text-[13.5px] text-[var(--ink-dim)]">{r.agent}</td>
                    <td className="py-3 pl-4 text-[13.5px] text-[var(--ink-dim)]">{r.alternative}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {(c.geenAgentNodig || c.vultElkaarAan) && (
        <section className="border-t border-[var(--paper-edge)]" style={{ background: 'var(--paper-warm)' }}>
          <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            {c.geenAgentNodig && (
              <div>
                <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
                  Waar u geen agent voor nodig heeft
                </div>
                <p className="mt-4 text-[15.5px] leading-[1.75] text-[var(--ink)]">
                  {c.geenAgentNodig}
                </p>
              </div>
            )}
            {c.vultElkaarAan && (
              <div>
                <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
                  Waar het elkaar aanvult
                </div>
                <p className="mt-4 text-[15.5px] leading-[1.75] text-[var(--ink)]">
                  {c.vultElkaarAan}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {c.whenAgent.length > 0 && c.whenAlternative.length > 0 && (
      <section className="border-t border-[var(--paper-edge)]" style={{ background: 'var(--paper-warm)' }}>
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
              Kies AI-agent als
            </div>
            <ul className="mt-5 space-y-3">
              {c.whenAgent.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-[1.7] text-[var(--ink)]">
                  <span className="text-[var(--oker-deep)] pt-1 shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
              Kies {c.alternative} als
            </div>
            <ul className="mt-5 space-y-3">
              {c.whenAlternative.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-[1.7] text-[var(--ink)]">
                  <span className="text-[var(--ink-faint)] pt-1 shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      )}

      <section className="border-t border-[var(--paper-edge)]">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
          <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
            Conclusie
          </div>
          <h2 className="mt-2 font-display text-[26px] sm:text-[32px] leading-tight text-[var(--ink)] max-w-[760px]">
            In de praktijk.
          </h2>
          <p className="mt-6 text-[15.5px] sm:text-[16.5px] leading-[1.75] text-[var(--ink)] max-w-[760px]">
            {c.conclusion}
          </p>
        </div>
      </section>

      <section className="border-t border-[var(--paper-edge)]">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
          <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
            Veelgestelde vragen
          </div>
          <h2 className="mt-2 font-display text-[26px] sm:text-[32px] leading-tight text-[var(--ink)]">
            Over deze vergelijking.
          </h2>
          <div className="mt-8 space-y-6 max-w-[780px]">
            {c.faq.map((item) => (
              <div key={item.q} className="pb-5 border-b border-[var(--paper-edge)]">
                <h3 className="font-display text-[17px] sm:text-[18px] text-[var(--ink)] leading-snug">
                  {item.q}
                </h3>
                <p className="mt-2 text-[14px] sm:text-[15px] leading-[1.7] text-[var(--ink-dim)]">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {otherComparisons.length > 0 && (
        <section className="border-t border-[var(--paper-edge)]" style={{ background: 'var(--paper-deep)' }}>
          <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-12 sm:py-16">
            <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
              Andere vergelijkingen
            </div>
            <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherComparisons.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/diensten/vergelijken/${o.slug}`}
                    className="block border border-[var(--paper-edge)] rounded-[2px] px-5 py-4 bg-[var(--paper)] hover:border-[var(--oker)] hover:bg-[var(--paper-warm)] transition-colors"
                  >
                    <span className="font-display text-[16px] text-[var(--ink)] leading-snug">
                      AI-agent vs {o.alternative}
                    </span>
                    <ArrowRight size={14} strokeWidth={1.8} className="inline ml-2 text-[var(--oker-deep)]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="border-t border-[var(--paper-edge)] bg-[var(--paper-deep)]">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <h2 className="font-display text-[22px] sm:text-[26px] text-[var(--ink)] max-w-[560px] leading-snug">
            Voor uw situatie de juiste keuze maken?{' '}
            <span className="italic text-[var(--oker-deep)]">Plan een gesprek.</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/plan"
              {...calPopupAttrs}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--terra)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
            >
              Plan een gesprek
              <ArrowRight size={16} strokeWidth={1.8} />
            </Link>
            <Link
              href="/diensten/ai-agent-laten-bouwen"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper)] transition-colors"
            >
              AI-agent laten bouwen
            </Link>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
