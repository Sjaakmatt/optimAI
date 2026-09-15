import { PolderFoto, POLDER_DAGERAAD, POLDER_SCHEMER, useMuisParallax } from 'factumai-demo';

// De foto-lagen komen van factumai.nl; de scène vult een relatief vlak
// (absolute inset-0), dus elke cel geeft hem een box met hoogte en lucht.

/** Schemerlucht boven de polder: de lucht van de pagina, de foto onderin. */
const LUCHT_SCHEMER = 'linear-gradient(180deg, #0a0a0c 0%, #1a1420 30%, #4a2e3a 62%, #a8573f 100%)';
/** Dageraadlucht zoals .dageraad-lucht-foto hem tekent. */
const LUCHT_DAGERAAD = 'linear-gradient(180deg, #0a0a0c 0%, #12161e 16%, #3a4658 30%, #7b89a3 40%, #7b89a3 100%)';

/** De polder in de schemering, zoals hij onder de hero staat. */
export function Schemer() {
  const { ref, muisX, muisY } = useMuisParallax();
  return (
    <section ref={ref} className="relative overflow-hidden" style={{ height: 480, background: LUCHT_SCHEMER, borderRadius: 12 }}>
      <PolderFoto scene={POLDER_SCHEMER} muisX={muisX} muisY={muisY} />
    </section>
  );
}

/** Dezelfde scène bij dageraad, met de molen in het midden (x="50%"). */
export function Dageraad() {
  const { ref, muisX, muisY } = useMuisParallax();
  return (
    <section ref={ref} className="relative overflow-hidden" style={{ height: 480, background: LUCHT_DAGERAAD, borderRadius: 12 }}>
      <PolderFoto scene={POLDER_DAGERAAD} muisX={muisX} muisY={muisY} x="50%" />
    </section>
  );
}

/** Onder een tekstblok, zoals op de onderhoudspagina: de copy bovenin, de polder over de volle breedte eronder. */
export function OnderTekst() {
  const { ref, muisX, muisY } = useMuisParallax();
  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: LUCHT_DAGERAAD, borderRadius: 12 }}>
      <div className="band relative z-10 text-center" style={{ paddingTop: 56 }}>
        <div className="eyebrow">Even geduld</div>
        <h1 className="font-display mt-4 text-[40px] leading-[1.06] tracking-[-0.03em] text-[var(--fg)]">
          We zijn even
          <br />
          aan het werk.
        </h1>
        <p className="mx-auto mt-5 max-w-[440px] text-[15.5px] leading-[1.65] text-[var(--fg-dim)]">
          De site krijgt een onderhoudsbeurt. Probeer het over een uur nog eens, of stuur ons een mail.
        </p>
      </div>
      <div className="relative z-0 mt-10 md:static md:m-0">
        <PolderFoto scene={POLDER_DAGERAAD} muisX={muisX} muisY={muisY} x="50%" mobielInStroom grond="#0a0a0c" />
      </div>
      <div className="hidden md:block" style={{ height: 300 }} aria-hidden />
    </section>
  );
}
