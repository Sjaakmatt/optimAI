'use client';

// Het slot van de pagina. Bovenaan ging de zon onder achter hetzelfde
// landschap; hier komt hij op. Wat vanavond binnenkwam, staat morgen klaar.
// Dezelfde lagen, een ander licht. De pagina eindigt hier en houdt stil.

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { calPopupAttrs } from '@/components/booking/config';
import { DAGERAAD_PALET, maakBosLagen } from './landschap/Bos';
import { Landschap, useMuisParallax, type LandschapVariant } from './Landschap';
import { PolderFoto, POLDER_DAGERAAD } from './PolderFoto';
import { Opkomend, Verschijn } from './Opkomend';

const BOS_DAGERAAD = maakBosLagen(DAGERAAD_PALET);
const NEVEL = { achter: 'rgba(244, 220, 180, 0.28)', voor: 'rgba(159, 182, 196, 0.18)' };

export function Dageraad({ variant }: { variant: LandschapVariant }) {
  const { ref, muisX, muisY } = useMuisParallax();
  const foto = variant === 'polder';

  return (
    <section
      ref={ref}
      className={`relative mt-28 overflow-hidden sm:mt-36 ${foto ? 'dageraad-lucht-foto' : 'dageraad-lucht'}`}
      style={foto ? ({ '--hero-lucht-top': '#7b89a3' } as React.CSSProperties) : undefined}
    >
      {foto ? (
        <PolderFoto platen={POLDER_DAGERAAD} muisX={muisX} muisY={muisY} hoogte="66%" rietBreedte="88%" horizon={0.46} />
      ) : (
        <>
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[44%] h-[34%] dageraad-zon" />
          <Landschap lagen={BOS_DAGERAAD} muisX={muisX} muisY={muisY} nevel={NEVEL} />
        </>
      )}
      <div aria-hidden className="pointer-events-none absolute inset-0 korrel" />

      <div className="relative band pt-24 pb-[58vh] text-center sm:pt-32 sm:pb-[66vh]">
        <Opkomend
          as="h2"
          inView
          className="mx-auto max-w-[1040px] font-display text-[34px] leading-[1.04] tracking-[-0.03em] text-[var(--fg)] sm:text-[48px] lg:text-[58px]"
          regels={['Vanavond komt de mail binnen.', 'Morgen staat het antwoord klaar.']}
        />
        <Verschijn inView vertraging={0.2}>
          <p className="mx-auto mt-6 max-w-[540px] text-[16px] leading-[1.65] text-[var(--fg-dim)] sm:text-[17px]">
            Eén gesprek van twintig minuten, vrijblijvend. Wij kijken naar het werk dat uw mensen
            nu de meeste tijd kost en zeggen eerlijk of een agent daar iets aan doet.
          </p>
        </Verschijn>
        <Verschijn inView vertraging={0.3} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="/plan" {...calPopupAttrs} className="knop knop-primair">
            Plan een gesprek
          </Link>
          <Link href="/scan" className="knop knop-glas">
            Of doe eerst de AI-scan
            <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </Verschijn>
      </div>
    </section>
  );
}
