import { Logostrook } from 'factumai-demo';
import { CASES } from '@/lib/data/cases';

// De strook gebruikt een gewone <img> met een root-relatieve src (`/pavo-hr.svg`);
// buiten Next lost die niet op, dus hier absoluut naar de live site, net als de
// next/image-shim doet.
const klanten = CASES.filter((c) => c.logo).map((c) => ({ ...c, logo: `https://factumai.nl${c.logo}` }));

/** De strook met klantlogo's zoals op de homepage, gevoed met de echte cases. */
export function Klanten() {
  return <Logostrook klanten={klanten} />;
}

/**
 * Zoals de homepage hem plaatst: het eyebrow "In productie bij" links, de
 * logo's ernaast in dezelfde rij.
 */
export function InProductieBij() {
  return (
    <section className="band pt-4 pb-6 sm:pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12">
        <div className="eyebrow shrink-0 !text-[var(--fg-faint)]">In productie bij</div>
        <Logostrook klanten={klanten} />
      </div>
    </section>
  );
}

/**
 * Te weinig ruimte voor de hele rij: dan schuift de band door in plaats van
 * af te breken. Hier afgedwongen met een smalle houder.
 */
export function Schuivend() {
  return (
    <div className="flex" style={{ maxWidth: 320 }}>
      <Logostrook klanten={[...klanten, ...klanten]} />
    </div>
  );
}
