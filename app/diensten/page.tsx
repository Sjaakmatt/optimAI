import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { BRANCHES } from '@/lib/data/branches';
import { COMPARISONS } from '@/lib/data/comparisons';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';

export const metadata: Metadata = {
  title: 'Diensten · AI-agents voor MKB',
  description:
    'Alle diensten van FactumAI op een rij: AI-agent laten bouwen, AI-automatisering, AI-implementatie, AI-agents voor bedrijven. Inclusief branche-pagina\'s, tools en vergelijkingen.',
  alternates: { canonical: '/diensten' },
};

interface ServiceCard {
  href: string;
  eyebrow: string;
  title: string;
  body: string;
  highlight?: boolean;
}

const SERVICES: ServiceCard[] = [
  {
    href: '/diensten/ai-agent-laten-bouwen',
    eyebrow: 'Hoofd-dienst',
    title: 'AI-agent laten bouwen',
    body: 'Een agent op maat voor uw bedrijf, gekoppeld aan uw systemen, binnen uw beleid. Vaste bouwprijs, eerste agent live in 1 tot 2 weken.',
    highlight: true,
  },
  {
    href: '/diensten/ai-automatisering',
    eyebrow: 'Bredere dienst',
    title: 'AI-automatisering',
    body: 'Mailstroom, offertes, orders, facturatie en planning automatisch. Niet via een dashboard, maar via AI-agents die meedraaien in uw bestaande systemen.',
  },
  {
    href: '/diensten/ai-implementatie',
    eyebrow: 'Begeleiding',
    title: 'AI implementeren',
    body: 'Wij brengen AI binnen één tot twee weken in productie — zonder pilot-moeras. Stappenplan, integraties, governance en adoptie ingebouwd.',
  },
  {
    href: '/diensten/ai-agents-voor-bedrijven',
    eyebrow: 'B2B-framing',
    title: 'AI-agents voor bedrijven',
    body: 'Wat AI-agents concreet voor B2B-bedrijven doen — type-agents, integraties, randvoorwaarden, ROI. Met concrete cijfers uit MKB-implementaties.',
  },
];

const ITEMLIST_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Diensten van FactumAI',
  numberOfItems: SERVICES.length,
  itemListElement: SERVICES.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${SITE_URL}${s.href}`,
    name: s.title,
  })),
};

export default function DienstenPage() {
  return (
    <SitePage>
      <JsonLd data={ITEMLIST_SCHEMA} />

      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-6">
        <div className="mb-6 sm:mb-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Diensten', href: '/diensten' },
            ]}
          />
        </div>
        <div className="max-w-[760px]">
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
            Diensten
          </div>
          <h1 className="mt-4 font-display text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.05] tracking-tight text-[var(--ink)]">
            Wat wij doen.
            <br />
            <span className="italic text-[var(--oker-deep)]">Eén plek, alles bij elkaar.</span>
          </h1>
          <p className="mt-6 text-[15px] sm:text-[16px] leading-[1.7] text-[var(--ink-dim)]">
            Vier hoofd-diensten, veertien branche-pagina&rsquo;s, drie vergelijkingen en twee
            tools. Begin bij de hoofd-dienst, of duik direct in uw branche.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pb-12">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className={`block h-full px-6 py-7 rounded-[2px] border transition-colors group ${
                  s.highlight
                    ? 'bg-[var(--paper)] border-[var(--oker)] hover:border-[var(--oker-deep)] hover:bg-[var(--paper-warm)]'
                    : 'bg-[var(--paper)] border-[var(--paper-edge)] hover:border-[var(--oker)] hover:bg-[var(--paper-warm)]'
                }`}
              >
                <div className="font-mono text-[10px] text-[var(--oker-deep)] uppercase tracking-[0.18em]">
                  {s.eyebrow}
                </div>
                <h2 className="mt-2 font-display text-[22px] sm:text-[24px] leading-tight text-[var(--ink)] group-hover:text-[var(--oker-deep)] transition-colors">
                  {s.title}
                </h2>
                <p className="mt-3 text-[14px] leading-[1.65] text-[var(--ink-dim)]">{s.body}</p>
                <div className="mt-5 font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-wider flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  Bekijk dienst
                  <ArrowRight size={12} strokeWidth={1.8} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-[var(--paper-edge)]" style={{ background: 'var(--paper-warm)' }}>
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-16">
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
            Per branche
          </div>
          <div className="mt-2 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <h2 className="font-display text-[26px] sm:text-[32px] leading-tight text-[var(--ink)]">
              Veertien sectoren, één werkwijze.
            </h2>
            <Link
              href="/branches"
              className="font-mono text-[11px] text-[var(--ink)] uppercase tracking-wider hover:text-[var(--oker-deep)] flex items-center gap-1.5"
            >
              Alle branches
              <ArrowRight size={12} strokeWidth={1.8} />
            </Link>
          </div>
          <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {BRANCHES.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/branches/${b.slug}`}
                  className="block px-3 py-2.5 rounded-[2px] bg-[var(--paper)] border border-[var(--paper-edge)] text-[13px] text-[var(--ink)] hover:border-[var(--oker)] hover:bg-[var(--paper-deep)] transition-colors"
                >
                  {b.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-[var(--paper-edge)]">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
              Vergelijkingen
            </div>
            <h2 className="mt-2 font-display text-[24px] sm:text-[28px] leading-tight text-[var(--ink)]">
              Hoe AI-agents zich verhouden tot bekende alternatieven.
            </h2>
            <ul className="mt-6 space-y-3">
              {COMPARISONS.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/diensten/vergelijken/${c.slug}`}
                    className="block px-4 py-3 rounded-[2px] bg-[var(--paper)] border border-[var(--paper-edge)] hover:border-[var(--oker)] hover:bg-[var(--paper-warm)] transition-colors"
                  >
                    <span className="font-display text-[15.5px] text-[var(--ink)]">
                      AI-agent vs {c.alternative}
                    </span>
                    <ArrowRight
                      size={13}
                      strokeWidth={1.8}
                      className="inline ml-2 text-[var(--oker-deep)]"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
              Tools en resources
            </div>
            <h2 className="mt-2 font-display text-[24px] sm:text-[28px] leading-tight text-[var(--ink)]">
              Zelf rekenen, eerst checken, of verdiepen.
            </h2>
            <ul className="mt-6 space-y-3">
              <li>
                <Link
                  href="/tools/ai-roi-calculator"
                  className="block px-4 py-3 rounded-[2px] bg-[var(--paper)] border border-[var(--paper-edge)] hover:border-[var(--oker)] hover:bg-[var(--paper-warm)] transition-colors"
                >
                  <span className="font-display text-[15.5px] text-[var(--ink)]">
                    AI ROI calculator
                  </span>
                  <span className="block mt-1 text-[12.5px] text-[var(--ink-dim)]">
                    Bereken uw besparing in een minuut.
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/agent-readiness-check"
                  className="block px-4 py-3 rounded-[2px] bg-[var(--paper)] border border-[var(--paper-edge)] hover:border-[var(--oker)] hover:bg-[var(--paper-warm)] transition-colors"
                >
                  <span className="font-display text-[15.5px] text-[var(--ink)]">
                    AI-agent readiness check
                  </span>
                  <span className="block mt-1 text-[12.5px] text-[var(--ink-dim)]">
                    Tien vragen, eerlijke score.
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/info"
                  className="block px-4 py-3 rounded-[2px] bg-[var(--paper)] border border-[var(--paper-edge)] hover:border-[var(--oker)] hover:bg-[var(--paper-warm)] transition-colors"
                >
                  <span className="font-display text-[15.5px] text-[var(--ink)]">
                    Wat is een AI-agent?
                  </span>
                  <span className="block mt-1 text-[12.5px] text-[var(--ink-dim)]">
                    Uitleg van het begrip, met FAQ.
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--paper-edge)] bg-[var(--paper-deep)]">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <h2 className="font-display text-[22px] sm:text-[26px] text-[var(--ink)] max-w-[560px] leading-snug">
            Niet zeker welke dienst past?{' '}
            <span className="italic text-[var(--oker-deep)]">Een gesprek lost dat op.</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
            >
              Plan een gesprek
              <ArrowRight size={16} strokeWidth={1.8} />
            </Link>
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper)] transition-colors"
            >
              Bekijk de cases
            </Link>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
