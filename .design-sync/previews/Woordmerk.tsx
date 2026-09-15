import { Woordmerk } from 'factumai-demo';

/** Het woordmerk zoals het in de kop van de site staat. */
export function Standaard() {
  return <Woordmerk />;
}

/** De grote variant, voor de footer en de onderhoudspagina. */
export function Groot() {
  return <Woordmerk groot />;
}

/** Als link naar de homepage, zoals de SiteHeader het gebruikt. */
export function AlsLink() {
  return (
    <a href="/" className="inline-flex items-center gap-2 pl-1" aria-label="FactumAI, naar de homepage">
      <Woordmerk />
    </a>
  );
}
