'use client';

// De polder als 2.5D-scène: één foto, gesplitst in dieptelagen (zie
// scripts/polder-lagen.py). Alle lagen zijn hetzelfde canvas en worden op
// precies dezelfde manier geschaald, dus ze liggen altijd op elkaar; alleen
// de verschuiving bij scrollen en muis verschilt per laag.
//
//   ver   lucht, horizon, water        blijft 30% achter bij de scroll
//   dijk  molen, boerderij, wilgen,    25%   (één stuk grond: niets zweeft)
//         dijkband
//   nevel drijvende mist                18%
//   riet  rietkraag aan de oever        8%
//   voor  oever en riet vooraan         0%    (rijdt mee met de tekst)
//
// De verre plaat is achter de losgemaakte lagen bijgevuld, zodat er bij het
// uit elkaar schuiven geen gaten vallen. Kleine verschillen, grote rust.

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';

export interface PolderScene {
  map: string;
  /** y van de horizon als deel van de afbeelding (0..1). */
  horizon: number;
}

export const POLDER_SCHEMER: PolderScene = { map: '/polder/lagen', horizon: 0.545 };
export const POLDER_DAGERAAD: PolderScene = { map: '/polder/lagen-dageraad', horizon: 0.545 };

const SCROLL_BEREIK = 700;

export function PolderFoto({
  scene,
  muisX,
  muisY,
  /** Horizontale positie van de foto op brede schermen (object-position x); op telefoons staat de molen in beeld. */
  x = '65%',
  mobielInStroom = false,
  grond = '#0a0a0c',
  nevel = '/polder/nevel.webp',
}: {
  scene: PolderScene;
  muisX: MotionValue<number>;
  muisY: MotionValue<number>;
  x?: string;
  mobielInStroom?: boolean;
  grond?: string;
  nevel?: string | null;
}) {
  const reduced = useReducedMotion() ?? false;
  const { scrollY } = useScroll();
  // Op brede schermen past de foto op breedte en staat hij onderin de box
  // (de lucht erboven komt uit de paginakleur); op telefoons vult hij de band
  // en schuift hij naar links zodat de molen in beeld staat.
  const laag = (naam: string, prioriteit = false) => (
    <Image
      src={`${scene.map}/${naam}.webp`}
      alt=""
      fill
      sizes="100vw"
      priority={prioriteit}
      className="object-cover object-[26%_100%] md:object-contain md:object-[var(--polder-x)_100%]"
      style={{ '--polder-x': x } as React.CSSProperties}
    />
  );

  return (
    <div
      className={`pointer-events-none select-none overflow-hidden ${
        mobielInStroom
          ? 'relative h-[56vh] min-h-[360px] w-full md:absolute md:inset-0 md:h-auto md:min-h-0'
          : 'absolute inset-0'
      }`}
      aria-hidden
    >
      <Vlak naam="ver" lag={0.3} muis={5} scrollY={scrollY} muisX={muisX} muisY={muisY} reduced={reduced} schaal={1.06}>
        <div className={`absolute inset-0 ${mobielInStroom ? 'lucht-masker md:lucht-masker-zacht' : 'lucht-masker'}`}>{laag('ver', true)}</div>
      </Vlak>

      <Vlak naam="dijk" lag={0.25} muis={9} scrollY={scrollY} muisX={muisX} muisY={muisY} reduced={reduced} schaal={1.06}>
        {laag('dijk', true)}
      </Vlak>

      {nevel && (
        <Vlak naam="nevel" lag={0.18} muis={8} scrollY={scrollY} muisX={muisX} muisY={muisY} reduced={reduced} schaal={1.06}>
          <div className="absolute inset-x-[-8%] bottom-[24%] h-[24%] nevel-drijft opacity-[0.38]">
            <Image src={nevel} alt="" fill sizes="120vw" className="object-cover object-center" />
          </div>
        </Vlak>
      )}

      <Vlak naam="riet" lag={0.08} muis={14} scrollY={scrollY} muisX={muisX} muisY={muisY} reduced={reduced} schaal={1.06}>
        <div className="absolute inset-0 riet-wiegt">{laag('riet', true)}</div>
      </Vlak>

      <Vlak naam="voor" lag={0} muis={20} scrollY={scrollY} muisX={muisX} muisY={muisY} reduced={reduced} schaal={1.08}>
        <div className="absolute inset-0 riet-wiegt-terug">{laag('voor')}</div>
      </Vlak>

      {/* de vloer vervaagt boven alle lagen naar de pagina */}
      <div
        className="absolute inset-x-0 bottom-0 h-[26%]"
        style={{ background: `linear-gradient(180deg, rgba(10,10,12,0) 0%, ${grond} 100%)` }}
      />
    </div>
  );
}

function Vlak({
  naam,
  children,
  lag,
  muis,
  scrollY,
  muisX,
  muisY,
  reduced,
  schaal = 1.04,
}: {
  naam: string;
  children: React.ReactNode;
  lag: number;
  muis: number;
  scrollY: MotionValue<number>;
  muisX: MotionValue<number>;
  muisY: MotionValue<number>;
  reduced: boolean;
  schaal?: number;
}) {
  const achter = useTransform(scrollY, [0, SCROLL_BEREIK], [0, lag * SCROLL_BEREIK]);
  const mx = useTransform(muisX, [-1, 1], [muis, -muis]);
  const my = useTransform(muisY, [-1, 1], [muis * 0.4, -muis * 0.4]);
  const y = useTransform([achter, my], ([a, m]) => (a as number) + (m as number));
  return (
    <motion.div data-vlak={naam} className="absolute inset-0" style={reduced ? undefined : { x: mx, y, scale: schaal }} initial={false}>
      {children}
    </motion.div>
  );
}
