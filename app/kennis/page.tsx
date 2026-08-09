import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { JsonLd } from '@/components/seo/JsonLd';
import { POSTS } from '@/lib/data/posts';
import { RESOURCES } from '@/lib/data/resources';
import { getSoroPostsExcluding } from '@/lib/data/soro';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';

export const metadata: Metadata = {
  title: 'Kennisbank · artikelen over AI-agents in het MKB',
  description:
    'Artikelen over AI-agents in de praktijk: hoe ze werken, wanneer het loont om er één te laten bouwen, en hoe u zelf de eerste stap zet. Geschreven voor MKB-ondernemers.',
  alternates: { canonical: '/kennis' },
};

function itemListSchema(items: Array<{ slug: string; title: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'FactumAI Kennisbank, artikelen over AI-agents',
    numberOfItems: items.length,
    itemListElement: items.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/kennis/${p.slug}`,
      name: p.title,
    })),
  };
}

const BLOG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${SITE_URL}/kennis#blog`,
  name: 'FactumAI Kennisbank',
  description:
    'Artikelen over AI-agents in het Nederlandse MKB, strategie, techniek, governance, branche-toepassingen.',
  url: `${SITE_URL}/kennis`,
  inLanguage: 'nl-NL',
  publisher: { '@id': `${SITE_URL}/#organization` },
  author: { '@id': `${SITE_URL}/over#sjaak-ter-veld` },
};

const DATE_FORMATTER = new Intl.DateTimeFormat('nl-NL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export const revalidate = 3600;

export default async function KennisPage() {
  const extern = await getSoroPostsExcluding(new Set(POSTS.map((p) => p.slug)));
  const artikelen = [
    ...POSTS.map((p) => ({
      slug: p.slug,
      title: p.title,
      lede: p.lede,
      published: p.published,
      readingMinutes: p.readingMinutes,
      tags: p.tags,
      extern: false,
    })),
    ...extern.map((p) => ({
      slug: p.slug,
      title: p.title,
      lede: p.lede,
      published: p.published,
      readingMinutes: p.readingMinutes,
      tags: p.tags,
      extern: true,
    })),
  ].sort((a, b) => (a.published < b.published ? 1 : -1));

  return (
    <SitePage>
      <JsonLd data={[BLOG_SCHEMA, itemListSchema(artikelen)]} />
      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-14 sm:pt-20 pb-10 sm:pb-12">
        <div className="max-w-[720px]">
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
            Kennis
          </div>
          <h1 className="mt-4 font-display text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.05] tracking-tight text-[var(--ink)]">
            Gedachten,<br />
            <span className="italic text-[var(--oker-deep)]">zonder jargon.</span>
          </h1>
          <p className="mt-6 text-[15px] sm:text-[16px] leading-[1.7] text-[var(--ink-dim)]">
            Over hoe AI-agents werken, wat ze kunnen en wat (nog) niet, en wat het betekent voor
            uw bedrijf. Geen whitepapers van 40 pagina&rsquo;s. Korte essays die u tijdens een
            kop koffie uitleest.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pb-20 divide-y divide-[var(--paper-edge)] border-y border-[var(--paper-edge)]">
        {artikelen.map((p) => (
          <Link
            key={p.slug}
            href={`/kennis/${p.slug}`}
            className="block py-7 sm:py-8 group relative"
          >
            <div
              aria-hidden
              className="absolute left-0 top-7 sm:top-8 bottom-7 sm:bottom-8 w-[2px] bg-[var(--oker)] opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <div className="pl-0 group-hover:pl-4 transition-[padding] duration-300">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 md:gap-6">
                <div className="max-w-[660px]">
                  <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">
                    {DATE_FORMATTER.format(new Date(p.published))} · {p.readingMinutes} min lezen
                    {p.extern && (
                      <span className="text-[var(--steen)]"> · blog</span>
                    )}
                  </div>
                  <h2 className="mt-2 font-display text-[22px] sm:text-[26px] lg:text-[28px] leading-[1.15] text-[var(--ink)] group-hover:text-[var(--oker-deep)] transition-colors">
                    {p.title}
                  </h2>
                  <p className="mt-3 text-[14px] sm:text-[15px] leading-[1.65] text-[var(--ink-dim)]">
                    {p.lede}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] text-[var(--steen)] uppercase tracking-[0.14em]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-wider flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  Lezen
                  <ArrowRight size={12} strokeWidth={1.8} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className="border-t border-[var(--paper-edge)]" style={{ background: 'var(--paper-warm)' }}>
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-16">
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
            Om mee te werken
          </div>
          <h2 className="mt-2 font-display text-[24px] sm:text-[30px] leading-tight text-[var(--ink)]">
            Twee documenten die u zelf kunt gebruiken.
          </h2>
          <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[820px]">
            {RESOURCES.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/resources/${r.slug}`}
                  className="block h-full border border-[var(--paper-edge)] rounded-[2px] px-5 py-5 bg-[var(--paper)] hover:border-[var(--oker)] hover:bg-[var(--paper-deep)] transition-colors"
                >
                  <span className="font-display text-[17px] text-[var(--ink)] leading-snug">
                    {r.shortTitle}
                    <ArrowRight
                      size={14}
                      strokeWidth={1.8}
                      className="inline ml-2 text-[var(--oker-deep)]"
                    />
                  </span>
                  <span className="block mt-2 text-[13.5px] leading-[1.6] text-[var(--ink-dim)]">
                    {r.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SitePage>
  );
}
