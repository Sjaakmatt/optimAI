import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { calPopupAttrs } from '@/components/booking/config';
import { RESOURCES, RESOURCE_BY_SLUG } from '@/lib/data/resources';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';

export async function generateStaticParams() {
  return RESOURCES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = RESOURCE_BY_SLUG[slug];
  if (!r) return { title: 'Resource niet gevonden' };
  return {
    title: r.title,
    description: r.metaDescription,
    alternates: { canonical: `/resources/${slug}` },
    openGraph: {
      title: `${r.shortTitle} · FactumAI`,
      description: r.metaDescription,
      url: `${SITE_URL}/resources/${slug}`,
    },
  };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = RESOURCE_BY_SLUG[slug];
  if (!r) notFound();

  const url = `${SITE_URL}/resources/${r.slug}`;

  const HOWTO_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: r.title,
    description: r.description,
    inLanguage: 'nl-NL',
    publisher: { '@id': `${SITE_URL}/#organization` },
    author: { '@id': `${SITE_URL}/over/sjaak-ter-veld#person` },
    url,
    step: r.hoofdstukken.map((h, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: h,
    })),
  };

  const otherResources = RESOURCES.filter((x) => x.slug !== r.slug);

  return (
    <SitePage>
      <JsonLd data={HOWTO_SCHEMA} />

      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-10">
        <div className="mb-6 sm:mb-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Resources', href: `/resources/${r.slug}` },
              { label: r.shortTitle, href: `/resources/${r.slug}` },
            ]}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-10">
          <div>
            <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
              Resource · gratis · pdf
            </div>
            <h1 className="mt-4 font-display text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-tight text-[var(--ink)]">
              {r.title}
            </h1>
            <p className="mt-5 text-[16px] sm:text-[17px] leading-[1.65] text-[var(--ink-dim)] max-w-[640px]">
              {r.description}
            </p>

            <div className="mt-10">
              <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
                Wat zit erin
              </div>
              <ul className="mt-4 space-y-2">
                {r.hoofdstukken.map((h, i) => (
                  <li
                    key={h}
                    className="flex gap-3 text-[15px] leading-[1.7] text-[var(--ink)]"
                  >
                    <span className="font-mono text-[12px] text-[var(--oker-deep)] shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
                Inclusief
              </div>
              <ul className="mt-4 space-y-2">
                {r.voorbeelden.map((v) => (
                  <li
                    key={v}
                    className="flex gap-3 text-[14.5px] leading-[1.65] text-[var(--ink-dim)]"
                  >
                    <span className="text-[var(--oker-deep)]">—</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="border border-[var(--paper-edge)] rounded-[2px] p-6 bg-[var(--paper)]">
              <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.18em]">
                Aanvragen
              </div>
              <h2 className="mt-2 font-display text-[20px] leading-tight text-[var(--ink)]">
                {r.cta}
              </h2>
              <p className="mt-3 text-[13.5px] leading-[1.6] text-[var(--ink-dim)]">
                {r.pages} pagina&rsquo;s · pdf · Nederlands. Doelgroep: {r.audience}
              </p>

              <div className="mt-5 space-y-3">
                <Link
                  href="/contact"
                  className="block w-full text-center px-4 py-3 rounded-[2px] text-[14px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
                >
                  {r.cta}
                </Link>
                <Link
                  href="/plan"
                  {...calPopupAttrs}
                  className="block w-full text-center px-4 py-3 rounded-[2px] text-[14px] text-[var(--ink)] border border-[var(--paper-edge)] hover:border-[var(--oker)] hover:bg-[var(--paper-warm)] transition-colors"
                >
                  Of: plan een gesprek
                </Link>
              </div>

              <p className="mt-4 font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.14em] leading-[1.6]">
                Geen spam. Wij gebruiken uw e-mail alleen om de pdf te sturen, conform onze
                privacyverklaring.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {otherResources.length > 0 && (
        <section className="border-t border-[var(--paper-edge)]" style={{ background: 'var(--paper-deep)' }}>
          <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-12 sm:py-16">
            <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
              Andere resources
            </div>
            <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherResources.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/resources/${o.slug}`}
                    className="block border border-[var(--paper-edge)] rounded-[2px] px-5 py-4 bg-[var(--paper)] hover:border-[var(--oker)] hover:bg-[var(--paper-warm)] transition-colors"
                  >
                    <span className="font-display text-[16px] text-[var(--ink)] leading-snug">
                      {o.shortTitle}
                    </span>
                    <ArrowRight size={14} strokeWidth={1.8} className="inline ml-2 text-[var(--oker-deep)]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </SitePage>
  );
}
