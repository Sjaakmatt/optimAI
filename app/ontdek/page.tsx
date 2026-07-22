import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { JsonLd } from '@/components/seo/JsonLd';
import { calPopupAttrs } from '@/components/booking/config';
import { OntdekExperience } from './v2/OntdekExperience';
import { Magnetic } from './v2/Magnetic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';
const PAGE_PATH = '/ontdek';

export const metadata: Metadata = {
  title: 'Ontdek FactumAI agents · een wandeling door agent-land',
  description:
    'Scroll in een paar minuten door het land van de AI-agents: zie een agent lezen, denken, maken en netjes stoppen waar een mens beslist. Probeer hem daarna zelf in de sandbox.',
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: 'Ontdek FactumAI agents',
    description:
      'Een interactieve wandeling door het land van de AI-agents, met een sandbox waarin u de agent zelf een klus geeft.',
    url: `${SITE_URL}${PAGE_PATH}`,
  },
};

const PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Ontdek FactumAI agents',
  description:
    'Interactieve introductie op AI-agents voor MKB-bedrijven: wat een agent is, hoe hij redeneert, wat hij oplevert en hoe mensen de regie houden.',
  url: `${SITE_URL}${PAGE_PATH}`,
  inLanguage: 'nl-NL',
  publisher: { '@id': `${SITE_URL}/#organization` },
};

export default function OntdekPage() {
  return (
    <SitePage>
      <JsonLd data={PAGE_SCHEMA} />
      <OntdekExperience>
        {/* Finale: server-gerenderd, altijd in de HTML */}
        <section
          id="finale"
          className="border-t border-[var(--paper-edge)] bg-[var(--paper-deep)] scroll-mt-6"
        >
          <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-16 sm:py-24">
            <div className="max-w-[640px]">
              <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
                Na de wandeling
              </div>
              <h2 className="mt-3 font-display text-[30px] sm:text-[40px] leading-[1.08] tracking-tight text-[var(--ink)]">
                Zin om verder te <span className="italic text-[var(--oker-deep)]">lopen?</span>
              </h2>
              <p className="mt-4 text-[15px] leading-[1.7] text-[var(--ink-dim)]">
                Een half uur sparren over uw eigen situatie zegt meer dan welke wandeling ook. Geen
                verkooppraatje: u vertelt waar het werk knelt, wij zeggen eerlijk of een agent daar
                iets aan verandert.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <Link
                    href="/plan"
                    {...calPopupAttrs}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-[2px] text-[15px] bg-[var(--terra)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors lift-on-hover"
                  >
                    Plan een gesprek
                    <ArrowRight size={16} strokeWidth={1.8} />
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link
                    href="/scan"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-[2px] text-[15px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
                  >
                    Doe de AI-scan
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </section>
      </OntdekExperience>
    </SitePage>
  );
}
