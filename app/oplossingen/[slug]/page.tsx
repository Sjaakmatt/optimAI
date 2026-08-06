import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { calPopupAttrs } from '@/components/booking/config';
import { OPLOSSINGEN, OPLOSSING_BY_SLUG } from '@/lib/data/oplossingen';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';

export async function generateStaticParams() {
  return OPLOSSINGEN.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const o = OPLOSSING_BY_SLUG[slug];
  if (!o) return { title: 'Oplossing niet gevonden' };
  return {
    title: `${o.pageTitle} · FactumAI`,
    description: o.metaDescription,
    alternates: { canonical: `/oplossingen/${slug}` },
    openGraph: {
      title: `${o.pageTitle} · FactumAI`,
      description: o.metaDescription,
      url: `${SITE_URL}/oplossingen/${slug}`,
    },
  };
}

export default async function OplossingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const o = OPLOSSING_BY_SLUG[slug];
  if (!o) notFound();

  const url = `${SITE_URL}/oplossingen/${o.slug}`;

  const SERVICE_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: o.serviceType,
    name: o.pageTitle,
    description: o.metaDescription,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'Country', name: 'Netherlands' },
    inLanguage: 'nl-NL',
    url,
  };

  const FAQ_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: o.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const andere = OPLOSSINGEN.filter((x) => x.slug !== o.slug);

  return (
    <SitePage>
      <JsonLd data={[SERVICE_SCHEMA, FAQ_SCHEMA]} />

      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-10">
        <div className="mb-6 sm:mb-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Oplossingen', href: '/oplossingen' },
              { label: o.navLabel, href: `/oplossingen/${o.slug}` },
            ]}
          />
        </div>
        <div className="max-w-[820px] relative">
          <div
            aria-hidden
            className="hidden sm:block absolute -left-4 top-2 bottom-6 w-[2px]"
            style={{
              background:
                'linear-gradient(to bottom, var(--oker) 0%, var(--oker) 40%, transparent 100%)',
              opacity: 0.55,
            }}
          />
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
            {o.heroEyebrow}
          </div>
          <h1 className="mt-4 font-display text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-tight text-[var(--ink)]">
            {o.heroTitle}
            <br />
            <span className="italic text-[var(--oker-deep)]">{o.heroItalic}</span>
          </h1>
          <p className="mt-6 text-[16px] sm:text-[17px] leading-[1.65] text-[var(--ink-dim)] max-w-[680px]">
            {o.intro}
          </p>
        </div>
      </section>

      <section className="border-t border-[var(--paper-edge)]" style={{ background: 'var(--paper-warm)' }}>
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          <div>
            <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
              Wat uw systeem al doet
            </div>
            <p className="mt-4 text-[15.5px] leading-[1.75] text-[var(--ink)]">{o.systeemDoetAl}</p>
          </div>
          <div>
            <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
              Waar het ophoudt
            </div>
            <p className="mt-4 text-[15.5px] leading-[1.75] text-[var(--ink)]">
              {o.waarHetOphoudt}
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--paper-edge)]">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
          <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
            Wat de agent doet
          </div>
          <h2 className="mt-2 font-display text-[26px] sm:text-[34px] leading-tight text-[var(--ink)] max-w-[760px]">
            Stap voor stap.
          </h2>
          <ol className="mt-10 space-y-6 max-w-[780px]">
            {o.watDeAgentDoet.map((stap, i) => (
              <li key={stap} className="flex gap-5">
                <span className="font-mono text-[11px] text-[var(--oker-deep)] tabular-nums pt-1 w-8 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-[15px] sm:text-[15.5px] leading-[1.75] text-[var(--ink)]">
                  {stap}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-[var(--paper-edge)] bg-[var(--paper-deep)]">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          <div>
            <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
              Wat u nodig heeft
            </div>
            <p className="mt-4 text-[15.5px] leading-[1.75] text-[var(--ink)]">{o.watUNodigHeeft}</p>
          </div>
          <div className="border-l-[3px] border-[var(--terra)] pl-6">
            <div className="font-mono text-[11px] text-[var(--terra)] uppercase tracking-[0.2em]">
              Wat wij niet doen
            </div>
            <p className="mt-4 text-[15.5px] leading-[1.75] text-[var(--ink)]">
              {o.watWijNietDoen}
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--paper-edge)]">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <h2 className="font-display text-[22px] sm:text-[26px] text-[var(--ink)] max-w-[600px] leading-snug">
            Benieuwd of dit bij uw systemen past?{' '}
            <span className="italic text-[var(--oker-deep)]">Dat checken wij eerst.</span>
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
              href="/diensten/vergelijken/ai-agent-vs-erp-automatisering"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper-deep)] hover:border-[var(--oker)] transition-colors"
            >
              Doet ons ERP dit al?
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--paper-edge)]">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
          <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
            Veelgestelde vragen
          </div>
          <h2 className="mt-2 font-display text-[26px] sm:text-[32px] leading-tight text-[var(--ink)]">
            Over deze oplossing.
          </h2>
          <div className="mt-8 space-y-6 max-w-[780px]">
            {o.faq.map((item) => (
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

      <section className="border-t border-[var(--paper-edge)]" style={{ background: 'var(--paper-deep)' }}>
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-12 sm:py-16">
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
            Andere oplossingen
          </div>
          <ul className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {andere.map((x) => (
              <li key={x.slug}>
                <Link
                  href={`/oplossingen/${x.slug}`}
                  className="block h-full border border-[var(--paper-edge)] rounded-[2px] px-5 py-4 bg-[var(--paper)] hover:border-[var(--oker)] hover:bg-[var(--paper-warm)] transition-colors"
                >
                  <span className="font-display text-[16px] text-[var(--ink)] leading-snug">
                    {x.navLabel}
                  </span>
                  <ArrowRight size={14} strokeWidth={1.8} className="inline ml-2 text-[var(--oker-deep)]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SitePage>
  );
}
