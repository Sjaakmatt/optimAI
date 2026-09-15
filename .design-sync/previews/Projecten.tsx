import { Projecten } from 'factumai-demo';

// De sectie leest zijn lichte palet uit .home-projects (in .home-world) en
// toont alle cases uit lib/data/cases in een horizontale rail.

/** Zoals op de homepage: de lichte projectenband met de rail van cases. */
export function Sectie() {
  return (
    <div className="home-world">
      <div className="home-projects">
        <Projecten />
      </div>
    </div>
  );
}

/** De overgang vanuit de band van de oprichter: de afgeronde bovenrand en de schaduw van de projectenband. */
export function NaDeOprichter() {
  return (
    <div className="home-world">
      <div className="home-founder" style={{ padding: 0, height: 96 }} aria-hidden />
      <div className="home-projects">
        <Projecten />
      </div>
    </div>
  );
}
