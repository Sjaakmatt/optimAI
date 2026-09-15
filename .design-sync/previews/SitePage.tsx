import { SitePage } from 'factumai-demo';

/**
 * Een binnenpagina zoals /diensten: luchtband bovenin, de zwevende kop, de
 * pagina-inhoud in main en de voet eronder.
 */
export function Binnenpagina() {
  return (
    <SitePage>
      <section className="band pt-14 sm:pt-20 pb-20">
        <div className="eyebrow">Diensten</div>
        <h1 className="mt-3 max-w-[760px] text-[40px] leading-[1.08] font-display">AI-agents die het dagelijkse werk overnemen.</h1>
        <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.6] text-[var(--fg-dim)]">
          Mails, offertes, orders en planning. Gebouwd op uw manier, met u aan het stuur. Vaste prijs per fase.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/plan" className="knop knop-primair">Plan een kennismaking</a>
          <a href="/cases" className="knop">Bekijk de cases</a>
        </div>
      </section>
    </SitePage>
  );
}

/**
 * Zonder luchtband (`lucht={false}`), zoals de homepage en de videopagina
 * die hun eigen achtergrond meebrengen: alleen kop, main en voet.
 */
export function ZonderLucht() {
  return (
    <SitePage lucht={false}>
      <section className="band pt-14 sm:pt-20 pb-20">
        <div className="eyebrow">Video's</div>
        <h1 className="mt-3 max-w-[760px] text-[40px] leading-[1.08] font-display">Zie een agent aan het werk.</h1>
        <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.6] text-[var(--fg-dim)]">
          Korte opnames uit de praktijk: een mailagent die een offerteaanvraag afhandelt, een orderagent die een
          bestelling klaarzet.
        </p>
      </section>
    </SitePage>
  );
}
