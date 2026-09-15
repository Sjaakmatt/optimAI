import { Dageraad } from 'factumai-demo';

/**
 * De afsluitende horizon onderaan de homepage: dageraadlandschap, wash,
 * kop met serif-accent, twee knoppen en de signatuur "Gebouwd met aandacht".
 */
export function Afsluiting() {
  return (
    <div className="home-world">
      <Dageraad />
    </div>
  );
}

/**
 * Overgang vanuit de methode-band: het laatste blok van `.home-method`
 * (donker, met de 110px onderrand) loopt over in de dageraad.
 */
export function NaMethode() {
  return (
    <div className="home-world">
      <div className="home-method">
        <section className="band pt-20">
          <div className="max-w-[560px]">
            <h2 className="font-display text-[26px] leading-[1.1] tracking-[-0.02em] text-[var(--fg)] sm:text-[32px]">
              Wat is een AI-agent eigenlijk?
            </h2>
            <p className="mt-3 text-[15px] leading-[1.65] text-[var(--fg-dim)]">
              Zie in drie minuten hoe een digitale collega leest, denkt en levert. En waar hij stopt, omdat u beslist.
            </p>
          </div>
        </section>
      </div>
      <Dageraad />
    </div>
  );
}
