import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { BRANCHES } from '@/lib/data/branches';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';

export const metadata: Metadata = {
  title: 'AI-agents per branche, sectorspecifieke oplossingen',
  description:
    'AI-agents op maat per branche: groothandel, installatietechniek, transport, zakelijke dienstverlening, bouw, zorg, productie, detailhandel, accountancy, advocatuur, makelaardij, agrarisch, e-commerce en horeca.',
  alternates: { canonical: '/branches' },
};

const ITEMLIST_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'AI-agents per branche',
  numberOfItems: BRANCHES.length,
  itemListElement: BRANCHES.map((b, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${SITE_URL}/branches/${b.slug}`,
    name: `AI-agent voor ${b.label.toLowerCase()}`,
  })),
};

export default function BranchesPage() {
  return (
    <SitePage>
      <JsonLd data={ITEMLIST_SCHEMA} />

      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-6">
        <div className="mb-6 sm:mb-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Branches', href: '/branches' },
            ]}
          />
        </div>
        <div className="max-w-[760px]">
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
            Branches
          </div>
          <h1 className="mt-4 font-display text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.05] tracking-tight text-[var(--ink)]">
            AI-agents{' '}
            <span className="italic text-[var(--oker-deep)]">per branche.</span>
          </h1>
          <p className="mt-6 text-[15px] sm:text-[16px] leading-[1.7] text-[var(--ink-dim)]">
            Elke branche werkt anders. Andere systemen, andere regels, andere taken. Hier per
            sector wat AI-agents concreet voor uw bedrijf doen, met cijfers uit de praktijk waar
            beschikbaar.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pb-20">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BRANCHES.map((b) => (
            <li key={b.slug}>
              <Link
                href={`/branches/${b.slug}`}
                className="block h-full site-card px-5 py-5 group"
              >
                <div className="font-mono text-[10px] text-[var(--oker-deep)] uppercase tracking-[0.18em]">
                  Branche
                </div>
                <h2 className="mt-1 font-display text-[19px] leading-snug text-[var(--ink)] group-hover:text-[var(--oker-deep)] transition-colors">
                  {b.label}
                </h2>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-[var(--ink-dim)] line-clamp-3">
                  {b.lede}
                </p>
                <div className="mt-3 font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-wider flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  Lezen
                  <ArrowRight size={12} strokeWidth={1.8} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </SitePage>
  );
}
