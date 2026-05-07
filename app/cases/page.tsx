import type { Metadata } from 'next';
import { SitePage } from '@/components/site/SitePage';
import { JsonLd } from '@/components/seo/JsonLd';
import { CASES } from '@/lib/data/cases';
import { CasesList } from './CasesList';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';

export const metadata: Metadata = {
  title: 'AI-agent cases — resultaten bij MKB-klanten',
  description:
    'Voorbeelden van AI-agents die wij voor MKB-klanten bouwden in groothandel, installatietechniek, transport en meer. Met concrete tijdwinst, kostenbesparing en doorlooptijd. Filter op branche of regio.',
  alternates: { canonical: '/cases' },
};

const ITEMLIST_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'AI-agent cases bij Nederlandse MKB-bedrijven',
  numberOfItems: CASES.length,
  itemListElement: CASES.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${SITE_URL}/cases/${c.slug}`,
    name: `${c.klant} — ${c.tagline}`,
  })),
};

export default function CasesPage() {
  return (
    <SitePage>
      <JsonLd data={ITEMLIST_SCHEMA} />
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
            MKB-bedrijven, verschillende processen, één aanpak. Filter op branche of regio om
            cases te vinden die op uw situatie lijken. Namen aangepast waar klanten daarom vroegen.
          </p>
        </div>
      </section>

      <CasesList cases={CASES} />
    </SitePage>
  );
}
