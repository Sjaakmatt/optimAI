'use client';

import Link from 'next/link';
import { calPopupAttrs } from '@/components/booking/config';
import { MailAgent } from '@/components/mailagent/MailAgent';
import { BOS_LAGEN } from './landschap/Bos';
import { POLDER_LAGEN } from './landschap/Polder';
import { Landschap, useMuisParallax, type LandschapVariant } from './Landschap';
import { Opkomend, Verschijn } from './Opkomend';

export function Hero({ variant }: { variant: LandschapVariant }) {
  const { ref, muisX, muisY } = useMuisParallax();
  const lagen = variant === 'polder' ? POLDER_LAGEN : BOS_LAGEN;

  return (
    <section ref={ref} className="relative overflow-hidden hero-lucht -mt-[72px] pt-[72px]">
      {/* zon achter de horizon */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[46%] h-[30%] hero-zon" />

      <Landschap lagen={lagen} muisX={muisX} muisY={muisY} />
      <div aria-hidden className="pointer-events-none absolute inset-0 korrel" />

      <div className="relative band pt-24 sm:pt-32 lg:pt-36 text-center">
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
          <a href="#mailagent" className="knop knop-glas">
            Zie de agent werken
          </a>
        </Verschijn>
      </div>

      {/* Het venster met de mailagent rijst op uit het landschap */}
      <Verschijn vertraging={0.8} y={40} className="relative band mt-16 sm:mt-20 lg:mt-24 pb-10 sm:pb-16">
        <div id="mailagent" className="scroll-mt-28 mx-auto max-w-[1100px]">
          <MailAgent />
        </div>
      </Verschijn>
    </section>
  );
}
