'use client';

import Link from 'next/link';
import { calPopupAttrs } from '@/components/booking/config';
import { BOS_LAGEN } from './landschap/Bos';
import { Landschap, useMuisParallax, type LandschapVariant } from './Landschap';
import { PolderFoto, POLDER_SCHEMER } from './PolderFoto';
import { Opkomend, Verschijn } from './Opkomend';

export function Hero({ variant }: { variant: LandschapVariant }) {
  const { ref, muisX, muisY } = useMuisParallax();
  const foto = variant === 'polder';

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden -mt-[72px] pt-[72px] md:min-h-[100svh] ${foto ? 'hero-lucht-foto' : 'hero-lucht'}`}
      style={foto ? ({ '--hero-lucht-top': '#5c5f93' } as React.CSSProperties) : undefined}
    >
      {foto ? null : (
        <>
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[46%] h-[30%] hero-zon" />
          <Landschap lagen={BOS_LAGEN} muisX={muisX} muisY={muisY} />
        </>
      )}
      <div aria-hidden className="pointer-events-none absolute inset-0 korrel" />

      <div className="relative z-10 band pt-24 sm:pt-28 lg:pt-32 text-center">
        <Verschijn vertraging={0.05} className="flex justify-center">
          <span className="chip">
            <span className="chip-punt" aria-hidden />
            AI-agents voor MKB · Nederland
          </span>
        </Verschijn>

        <Opkomend
          as="h1"
          vertraging={0.15}
          className="mx-auto mt-6 max-w-[900px] font-display text-[40px] leading-[1.02] tracking-[-0.03em] text-[var(--fg)] sm:text-[60px] lg:text-[76px]"
          regels={['Uw werk, klaargezet', 'door een digitale collega.']}
        />

        <Verschijn vertraging={0.45}>
          <p className="mx-auto mt-6 max-w-[560px] text-[16px] leading-[1.6] text-[var(--fg-dim)] sm:text-[18px]">
            FactumAI bouwt AI-agents die mails beantwoorden, offertes opvolgen en orders
            klaarzetten. Binnen uw regels. U keurt goed.
          </p>
        </Verschijn>

        <Verschijn vertraging={0.6} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="/plan" {...calPopupAttrs} className="knop knop-primair">
            Plan een gesprek
          </Link>
          <Link href="/ontdek" className="knop knop-glas">
            Ontdek hoe het werkt
          </Link>
        </Verschijn>
      </div>

      {/* Op telefoons staat de polder hier als eigen band; op brede schermen
          absoluut onderin de sectie, over de volle breedte. */}
      {foto && (
        <div className="relative z-0 mt-8 md:static md:m-0">
          <PolderFoto platen={POLDER_SCHEMER} muisX={muisX} muisY={muisY} mobielInStroom hoogte="58%" rietBreedte="84%" rietOnder="-16%" horizon={0.42} />
        </div>
      )}
      {/* ruimte voor het landschap op brede schermen */}
      <div className="hidden md:block h-[54vh] min-h-[420px]" aria-hidden />
    </section>
  );
}
