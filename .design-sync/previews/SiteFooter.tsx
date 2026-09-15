import { SiteFooter } from 'factumai-demo';

/**
 * De voet zoals hij onder elke pagina staat: woordmerk en missie, kolommen
 * voor diensten, cases, kennis en contact, met de gloed aan de horizon en de
 * juridische regel onderaan. Gevoed met de echte cases en artikelen.
 */
export function Voet() {
  return <SiteFooter />;
}

/**
 * Met het einde van een pagina erboven, zodat de scheidingslijn en de
 * overgang van inhoud naar voet te zien zijn.
 */
export function OnderPagina() {
  return (
    <div>
      <section className="band pb-10">
        <div className="eyebrow">Volgende stap</div>
        <h2 className="mt-3 text-[28px] leading-[1.15] font-display">Eén gesprek, geen verplichting.</h2>
        <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.6] text-[var(--fg-dim)]">
          Eerst kijken of er iets concreets te winnen is. We reageren binnen één werkdag.
        </p>
      </section>
      <SiteFooter />
    </div>
  );
}
