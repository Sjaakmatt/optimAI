import { Landschap, useMuisParallax } from 'factumai-demo';
import { BOS_LAGEN, DAGERAAD_PALET, maakBosLagen } from '@/components/home/landschap/Bos';
import { POLDER_LAGEN, maakPolderLagen } from '@/components/home/landschap/Polder';

// De lagen zijn niet uit het pakket te halen (Landschap.tsx exporteert ze niet
// opnieuw), dus de preview bouwt ze uit dezelfde bron als de app.
const BOS_DAGERAAD = maakBosLagen(DAGERAAD_PALET);
const POLDER_DAGERAAD = maakPolderLagen(DAGERAAD_PALET, 'dageraad');

const NEVEL_DAGERAAD = { achter: 'rgba(244, 220, 180, 0.2)', voor: 'rgba(159, 182, 196, 0.16)' };

/** Schemerlucht: van nacht bovenin naar koper aan de horizon. */
const LUCHT_SCHEMER = 'linear-gradient(180deg, #0a0a0c 0%, #1c1420 36%, #4a2e3a 62%, #a8573f 86%, #f0b27a 100%)';
/** Dageraad: koel blauwgrijs met een lichte streep aan de horizon. */
const LUCHT_DAGERAAD = 'linear-gradient(180deg, #0f1319 0%, #2b3644 34%, #5b6b7c 62%, #9fb6c4 86%, #f4dcb4 100%)';

/** Het vlak waar het landschap onderin staat; de muisparallax komt van het pakket. */
function Vlak({ lucht, hoogte = 520, children }: { lucht: string; hoogte?: number; children: React.ReactNode }) {
  const { ref } = useMuisParallax();
  return (
    <section ref={ref} className="relative overflow-hidden" style={{ height: hoogte, background: lucht, borderRadius: 12 }}>
      {children}
    </section>
  );
}

/** Het bos in de schemering: drie rijen bomen, paars-grijs achter, bijna zwart vooraan. */
export function Bos() {
  const { muisX, muisY } = useMuisParallax();
  return (
    <Vlak lucht={LUCHT_SCHEMER}>
      <Landschap lagen={BOS_LAGEN} muisX={muisX} muisY={muisY} />
    </Vlak>
  );
}

/** De polder in de schemering: kerktoren, boerderij en molen in de verte, dijk met knotwilgen, riet vooraan. */
export function Polder() {
  const { muisX, muisY } = useMuisParallax();
  return (
    <Vlak lucht={LUCHT_SCHEMER}>
      <Landschap lagen={POLDER_LAGEN} muisX={muisX} muisY={muisY} />
    </Vlak>
  );
}

/** Hetzelfde bos bij dageraad: koel blauwgrijs palet en lichtere nevel. */
export function BosDageraad() {
  const { muisX, muisY } = useMuisParallax();
  return (
    <Vlak lucht={LUCHT_DAGERAAD}>
      <Landschap lagen={BOS_DAGERAAD} muisX={muisX} muisY={muisY} nevel={NEVEL_DAGERAAD} />
    </Vlak>
  );
}

/** De polder bij dageraad, met de weerspiegeling van de lichte lucht in het water. */
export function PolderDageraad() {
  const { muisX, muisY } = useMuisParallax();
  return (
    <Vlak lucht={LUCHT_DAGERAAD}>
      <Landschap lagen={POLDER_DAGERAAD} muisX={muisX} muisY={muisY} nevel={NEVEL_DAGERAAD} />
    </Vlak>
  );
}

/** Zoals het in een hero staat: de kop en de intro boven de horizon, het landschap eronder. */
export function InHero() {
  const { muisX, muisY } = useMuisParallax();
  return (
    <Vlak lucht={LUCHT_SCHEMER} hoogte={600}>
      <div className="band relative z-10 text-center" style={{ paddingTop: 72 }}>
        <div className="eyebrow">AI-agents. Nuchter gebouwd in Nederland.</div>
        {/* De hero zet zijn maten in CSS (clamp), niet met utilities; hier inline zodat ze niet van de gecompileerde set afhangen. */}
        <h1
          className="font-display text-[var(--fg)]"
          style={{ fontSize: 52, lineHeight: 1.04, letterSpacing: '-0.045em', fontWeight: 450, margin: '22px auto 0' }}
        >
          Meer ruimte voor
          <br />
          <em className="text-[var(--accent-text)]" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 400 }}>
            het echte werk.
          </em>
        </h1>
        <p className="mx-auto mt-5 text-[16px] leading-[1.65] text-[var(--fg-dim)]" style={{ maxWidth: 460 }}>
          Een digitale collega die mails afhandelt, offertes opvolgt en orders klaarzet. Op uw manier. Met u aan het stuur.
        </p>
      </div>
      <Landschap lagen={POLDER_LAGEN} muisX={muisX} muisY={muisY} />
    </Vlak>
  );
}
