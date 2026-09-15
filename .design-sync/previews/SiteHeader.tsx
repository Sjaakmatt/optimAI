import { SiteHeader } from 'factumai-demo';

/**
 * De kop zoals hij boven elke pagina zweeft: woordmerk links, hoofdmenu in het
 * midden (vanaf lg), contact en de primaire knop rechts. Onder de header wat
 * paginainhoud, zodat de glazen pil ergens boven ligt.
 */
export function BovenPagina() {
  return (
    <div style={{ minHeight: 260 }}>
      <SiteHeader />
      <div className="band pt-10">
        <div className="eyebrow">Diensten</div>
        <h1 className="mt-3 text-[34px] leading-[1.1] font-display">AI-agents die het dagelijkse werk overnemen.</h1>
        <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.6] text-[var(--fg-dim)]">
          Mails, offertes, orders en planning. Gebouwd op uw manier, met u aan het stuur.
        </p>
      </div>
    </div>
  );
}
