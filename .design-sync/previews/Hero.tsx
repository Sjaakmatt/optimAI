import { Hero, SiteHeader } from 'factumai-demo';

/**
 * Het openingsscherm van de homepage zoals het in `.home-world` staat: slate
 * lucht, kop met serif-accent, twee knoppen, het mailkaartje rechtsonder en
 * de onderschriftregel. De sectie trekt zichzelf 76px omhoog onder de
 * zwevende header; de wrapper geeft die ruimte terug.
 */
export function Startscherm() {
  return (
    <div className="home-world" style={{ paddingTop: 76 }}>
      <Hero />
    </div>
  );
}

/**
 * Zoals de bezoeker het ziet: de glazen header zweeft boven het scherm en de
 * hero schuift eronder door (de negatieve marge op `.horizon-hero`).
 */
export function MetHeader() {
  return (
    <div className="home-world">
      <SiteHeader />
      <Hero />
    </div>
  );
}
