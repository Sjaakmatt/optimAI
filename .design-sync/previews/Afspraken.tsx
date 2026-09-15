import { Afspraken } from 'factumai-demo';
import { Uitgeanimeerd } from '../preview-lib/Uitgeanimeerd';
import { ArrowRight } from 'lucide-react';

/**
 * Drie afspraken naast elkaar (vanaf md), gescheiden door dunne lijnen:
 * mens beslist, data in Frankfurt, één maand opzegtermijn. In de
 * methode-band van de homepage.
 */
export function DrieAfspraken() {
  return (
    <Uitgeanimeerd>
    <div className="home-world">
      <div className="home-method">
        <Afspraken />
      </div>
    </div>
    </Uitgeanimeerd>
  );
}

/**
 * Het einde van de methode-band: de afspraken met daaronder de ontdek-band
 * ("Wat is een AI-agent eigenlijk?") met de glazen knop, zoals op de homepage.
 */
export function MetOntdekBand() {
  return (
    <Uitgeanimeerd>
    <div className="home-world">
      <div className="home-method">
        <Afspraken />
        <section className="band pt-20 sm:pt-24">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-[560px]">
              <h2 className="font-display text-[26px] leading-[1.1] tracking-[-0.02em] text-[var(--fg)] sm:text-[32px]">
                Wat is een AI-agent eigenlijk?
              </h2>
              <p className="mt-3 text-[15px] leading-[1.65] text-[var(--fg-dim)]">
                Zie in drie minuten hoe een digitale collega leest, denkt en levert. En waar hij stopt, omdat u beslist.
              </p>
            </div>
            <a href="/ontdek" className="knop knop-glas shrink-0 self-start md:self-auto">
              Ontdek FactumAI agents
              <ArrowRight size={15} strokeWidth={2} />
            </a>
          </div>
        </section>
      </div>
    </div>
    </Uitgeanimeerd>
  );
}
