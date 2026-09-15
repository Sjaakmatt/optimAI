'use client';

import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { calPopupAttrs } from '@/components/booking/config';
import { BOS_LAGEN } from './landschap/Bos';
import { Landschap, useMuisParallax, type LandschapVariant } from './Landschap';
import { PolderFoto, POLDER_SCHEMER } from './PolderFoto';
import { Opkomend, Verschijn } from './Opkomend';
import { useMediaQuery } from './useMediaQuery';

export function Hero({ variant }: { variant: LandschapVariant }) {
  const { ref, muisX, muisY } = useMuisParallax();
  const foto = variant === 'polder';
  // De kop rijdt iets langzamer dan de pagina en zakt daardoor bij het
  // scrollen achter het riet vooraan weg (dat rijdt op 1x mee).
  const reduced = useReducedMotion() ?? false;
  const breed = useMediaQuery('(min-width: 768px)');
  const { scrollY } = useScroll();
  const zak = useTransform(scrollY, [0, 700], [0, 0.2 * 700]);

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden -mt-[72px] pt-[72px] md:min-h-[104svh] ${foto ? 'hero-lucht-foto' : 'hero-lucht'}`}
      style={foto ? ({ '--hero-lucht-top': '#63618b' } as React.CSSProperties) : undefined}
    >
      {foto ? null : (
        <>
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[46%] h-[30%] hero-zon" />
          <Landschap lagen={BOS_LAGEN} muisX={muisX} muisY={muisY} />
        </>
      )}
      <div aria-hidden className="pointer-events-none absolute inset-0 korrel" />

      <motion.div className="relative z-10 band pt-20 sm:pt-24 lg:pt-24 text-center" style={reduced || !foto || !breed ? undefined : { y: zak }}>
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
      </motion.div>

      {/* Op telefoons staat de polder hier als eigen band; op brede schermen
          absoluut onderin de sectie, over de volle breedte. */}
      {foto && (
        <div className="relative z-0 mt-8 md:static md:m-0">
          <PolderFoto scene={POLDER_SCHEMER} muisX={muisX} muisY={muisY} mobielInStroom />
        </div>
      )}
      {/* ruimte voor het landschap op brede schermen: de horizon ligt onder de knoppen */}
      <div className="hidden md:block h-[46vh] min-h-[380px]" aria-hidden />
    </section>
  );
}
