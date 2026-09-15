import { SiteDoek, Woordmerk } from 'factumai-demo';

/** Een kaartvlak: afgerond, met de standaard binnenmarge. */
export function Kaart() {
  return (
    <SiteDoek>
      <div className="eyebrow">Ondergrond</div>
      <h2 className="mt-2 text-[24px] leading-[1.15] font-display">Leigrijs, warm wit, zacht koper.</h2>
      <p className="mt-3 max-w-[48ch] text-[15px] leading-[1.6] text-[var(--fg-dim)]">
        Alle componenten verwachten dit vlak onder zich. Tekst is <span className="text-[var(--accent-text)]">warm wit</span>,
        het accent is koper.
      </p>
    </SiteDoek>
  );
}

/** Als paginaondergrond (vult het scherm) met het woordmerk erop. */
export function Pagina() {
  return (
    <SiteDoek vol className="band py-8">
      <Woordmerk groot />
      <p className="mt-6 text-[15px] leading-[1.6] text-[var(--fg-dim)]">Een lege pagina op de donkere ondergrond.</p>
    </SiteDoek>
  );
}
