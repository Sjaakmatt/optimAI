import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { BRANCHES, BRANCHE_BY_SLUG, type Branche } from '@/lib/data/branches';
import { CASE_BY_SLUG } from '@/lib/data/cases';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';

export async function generateStaticParams() {
  return BRANCHES.map((b) => ({ branche: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ branche: string }>;
}): Promise<Metadata> {
  const { branche } = await params;
  const b = BRANCHE_BY_SLUG[branche];
  if (!b) return { title: 'Branche niet gevonden' };
  const title = `${b.keyword} · FactumAI`;
  return {
    title,
    description: b.intro,
    alternates: { canonical: `/branches/${b.slug}` },
    openGraph: {
      title,
      description: b.intro,
      url: `${SITE_URL}/branches/${b.slug}`,
      type: 'website',
    },
  };
}

function serviceSchema(b: Branche) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: b.keyword,
    name: b.keyword,
    description: b.intro,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'Country', name: 'Netherlands' },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: b.label,
    },
    url: `${SITE_URL}/branches/${b.slug}`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `AI-agents voor ${b.label}`,
      itemListElement: b.agents.map((a) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: a.naam, description: a.doet },
      })),
    },
  };
}

function breadcrumbSchema(b: Branche) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Branches', item: `${SITE_URL}/branches/${b.slug}` },
      {
        '@type': 'ListItem',
        position: 3,
        name: b.label,
        item: `${SITE_URL}/branches/${b.slug}`,
      },
    ],
  };
}

export default async function BranchePage({
  params,
}: {
  params: Promise<{ branche: string }>;
}) {
  const { branche } = await params;
  const b = BRANCHE_BY_SLUG[branche];
  if (!b) notFound();
  const caseStudy = b.caseSlug ? CASE_BY_SLUG[b.caseSlug] : undefined;

  return (
    <SitePage>
      <JsonLd data={[serviceSchema(b), breadcrumbSchema(b)]} />

      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-12 sm:pb-14">
        <div className="mb-6 sm:mb-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Branches', href: `/branches/${b.slug}` },
              { label: b.label, href: `/branches/${b.slug}` },
            ]}
          />
        </div>
        <div className="max-w-[820px]">
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
            {b.heroEyebrow}
          </div>
          <h1 className="mt-4 font-display text-[34px] sm:text-[46px] lg:text-[54px] leading-[1.05] tracking-tight text-[var(--ink)]">
            {b.heroTitle}
            <br />
            <span className="italic text-[var(--oker-deep)]">{b.heroItalic}</span>
          </h1>
          <p className="mt-6 text-[16px] sm:text-[17px] leading-[1.7] text-[var(--ink-dim)]">
            {b.intro}
          </p>
          <p className="mt-4 text-[14.5px] sm:text-[15px] leading-[1.7] text-[var(--ink-faint)]">
            {b.lede}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
            >
              Plan een kennismaking
              <ArrowRight size={16} strokeWidth={1.8} />
            </Link>
            <Link
              href="/diensten/ai-agent-laten-bouwen"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper-deep)] hover:border-[var(--oker)] transition-colors"
            >
              AI-agent laten bouwen
            </Link>
          </div>
        </div>
      </section>

      <Section eyebrow="Pijnpunten" title={`Wat u herkent in de ${b.label.toLowerCase()}-praktijk.`}>
        <ul className="mt-8 space-y-3 max-w-[820px]">
          {b.pijnpunten.map((p) => (
            <li
              key={p}
              className="flex gap-3 text-[15px] sm:text-[16px] leading-[1.7] text-[var(--ink)]"
            >
              <span className="text-[var(--oker)] pt-1 shrink-0">—</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="Onze aanpak"
        title={`Wat een AI-agent concreet doet in uw ${b.label.toLowerCase()}.`}
        tint
      >
        <ul className="mt-8 space-y-3 max-w-[820px]">
          {b.oplossing.map((o) => (
            <li
              key={o}
              className="flex gap-3 text-[15px] sm:text-[16px] leading-[1.7] text-[var(--ink)]"
            >
              <span className="text-[var(--oker)] pt-1 shrink-0">→</span>
              <span>{o}</span>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-[15px] leading-[1.7] text-[var(--ink-dim)] max-w-[720px]">{b.aanpak}</p>
      </Section>

      <Section eyebrow="De agents" title="Welke agents samen één klantzaak afhandelen.">
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {b.agents.map((a) => (
            <article key={a.naam} className="site-card px-5 py-5">
              <div className="font-display text-[17px] text-[var(--ink)] leading-snug">{a.naam}</div>
              <p className="mt-2 text-[14px] leading-[1.65] text-[var(--ink-dim)]">{a.doet}</p>
            </article>
          ))}
        </div>
      </Section>

      {caseStudy && b.stats && (
        <Section
          eyebrow="Resultaten uit de praktijk"
          title={`Zo werkt het bij ${caseStudy.klant}.`}
          tint
        >
          <p className="mt-4 text-[15px] leading-[1.7] text-[var(--ink-dim)] max-w-[720px]">
            {b.context}
          </p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-5">
            {b.stats.map((s) => (
              <div
                key={s.label}
                className="site-card px-5 py-5"
                style={{ borderColor: 'var(--oker)' }}
              >
                <div className="font-display text-[22px] text-[var(--oker-deep)] leading-none">
                  {s.metric}
                </div>
                <div className="mt-2 text-[13px] leading-[1.55] text-[var(--ink-dim)]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          {caseStudy.quote && (
            <blockquote
              className="mt-10 pl-5 sm:pl-6 pr-4 py-3 border-l-[3px] border-[var(--oker)] max-w-[760px]"
              style={{ background: 'var(--paper)' }}
            >
              <p className="font-display italic text-[18px] sm:text-[21px] leading-[1.5] text-[var(--ink)]">
                &ldquo;{caseStudy.quote.text}&rdquo;
              </p>
              <div className="mt-2 font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.14em]">
                — {caseStudy.quote.by} · {caseStudy.quote.role}
              </div>
            </blockquote>
          )}
          <div className="mt-8">
            <Link
              href={`/cases/${caseStudy.slug}`}
              className="inline-flex items-center gap-2 text-[14px] text-[var(--ink)] hover:text-[var(--oker-deep)] transition-colors"
            >
              Lees de volledige case
              <ArrowRight size={16} strokeWidth={1.8} />
            </Link>
          </div>
        </Section>
      )}

      {!caseStudy && b.expectations && (
        <Section
          eyebrow="Wat u mag verwachten"
          title={`Concreet resultaat in uw ${b.label.toLowerCase()}-organisatie.`}
          tint
        >
          <p className="mt-4 text-[15px] leading-[1.7] text-[var(--ink-dim)] max-w-[720px]">
            Dit zijn de uitkomsten die wij bij vergelijkbare opdrachten halen. Uw situatie bepaalt
            welke het eerst opvalt — dat stemmen we af in het intake-gesprek.
          </p>
          <ul className="mt-8 space-y-3 max-w-[820px]">
            {b.expectations.map((e) => (
              <li
                key={e}
                className="flex gap-3 text-[15px] sm:text-[16px] leading-[1.7] text-[var(--ink)]"
              >
                <span className="text-[var(--oker)] pt-1 shrink-0">✓</span>
                <span>{e}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 text-[14px] text-[var(--ink)] hover:text-[var(--oker-deep)] transition-colors"
            >
              Bekijk cases uit andere branches
              <ArrowRight size={16} strokeWidth={1.8} />
            </Link>
          </div>
        </Section>
      )}

      <Section eyebrow="Waarom nu" title="Wat dit waard is voor uw branche in 2026.">
        <p className="mt-6 text-[15.5px] sm:text-[16px] leading-[1.75] text-[var(--ink)] max-w-[760px]">
          {b.waaromNu}
        </p>
      </Section>

      <section className="border-t border-[var(--paper-edge)] bg-[var(--paper-deep)]">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <h2 className="font-display text-[22px] sm:text-[26px] text-[var(--ink)] max-w-[560px] leading-snug">
            Zin in een gesprek over wat een agent in úw{' '}
            <span className="italic text-[var(--oker-deep)]">{b.label.toLowerCase()}</span> zou
            doen?
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
            >
              Plan een kennismaking
              <ArrowRight size={16} strokeWidth={1.8} />
            </Link>
            <Link
              href="/diensten/ai-agent-laten-bouwen"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper)] hover:border-[var(--oker)] transition-colors"
            >
              AI-agent laten bouwen
            </Link>
          </div>
        </div>
      </section>
    </SitePage>
  );
}

function Section({
  eyebrow,
  title,
  children,
  tint,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  tint?: boolean;
}) {
  return (
    <section
      className="border-t border-[var(--paper-edge)]"
      style={tint ? { background: 'var(--paper-warm)' } : undefined}
    >
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
        <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
          {eyebrow}
        </div>
        <h2 className="mt-2 font-display text-[28px] sm:text-[36px] lg:text-[40px] leading-[1.1] text-[var(--ink)] max-w-[720px]">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
