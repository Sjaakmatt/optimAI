import { LuchtBand } from 'factumai-demo';

/**
 * Zoals de band op elke binnenpagina zit: absoluut bovenaan, met de kop van
 * de pagina eroverheen. De verlooptint loopt onderaan over in de ondergrond.
 */
export function BovenKop() {
  return (
    <div className="relative overflow-hidden" style={{ minHeight: 560 }}>
      <LuchtBand />
      <div className="band relative pt-24 pb-16">
        <div className="eyebrow">Diensten</div>
        <h1 className="mt-3 max-w-[760px] text-[40px] leading-[1.08] font-display">AI-agent laten bouwen voor uw bedrijf.</h1>
        <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.6] text-[var(--fg-dim)]">
          Een digitale collega die mails afhandelt, offertes opvolgt en orders klaarzet. Gebouwd binnen uw regels,
          met een mens die goedkeurt.
        </p>
      </div>
    </div>
  );
}

/** De band op zichzelf, zonder inhoud erover: alleen lucht en verloop. */
export function Kaal() {
  return (
    <div className="relative overflow-hidden" style={{ height: 420 }}>
      <LuchtBand />
    </div>
  );
}
