'use client';

// De polder als fotolagen, naar het laagcontract uit scroll-craft: zes vlakken
// die elk een eigen stukje achterblijven bij het scrollen (ver blijft het
// meest achter, de voorgrond rijdt mee met de pagina), met occlusie vooraan.
//
//   1. lucht met water        blijft 31% achter
//   2. molen op de dijk        22%
//   3. nevel over het water    18%, drijft ook zelf
//   4. knotwilgen op de oever  14%
//   5. rietkraag               6%
//   6. riet vooraan, onscherp  0% (rijdt mee met de tekst), reageert het sterkst op de muis
//
// Elke laag is onder zijn silhouet dichtgevuld, zodat er bij het uit elkaar
// schuiven geen laag doorheen schemert. De onderrand vervaagt naar de pagina.

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';

export interface PolderPlaten {
  lucht: string;
  molen: string;
  wilgen: string;
  nevel: string;
  riet: string;
}

export const POLDER_SCHEMER: PolderPlaten = {
  lucht: '/polder/lucht-schemer.webp',
  molen: '/polder/molen.webp',
  wilgen: '/polder/wilgen.webp',
  nevel: '/polder/nevel.webp',
  riet: '/polder/riet.webp',
};

export const POLDER_DAGERAAD: PolderPlaten = {
  ...POLDER_SCHEMER,
  lucht: '/polder/lucht-dageraad.webp',
};

/** Hoeveel scroll de lagen volgen; daarboven leest het niet meer als diepte. */
const SCROLL_BEREIK = 700;

export function PolderFoto({
  platen,
  muisX,
  muisY,
  horizon = 0.5,
  hoogte = '72%',
  rietBreedte = '110%',
  rietOnder = '-4%',
  mobielInStroom = false,
  grond = '#0a0a0c',
}: {
  platen: PolderPlaten;
  muisX: MotionValue<number>;
  muisY: MotionValue<number>;
  /** Hoogte van de horizon, als deel van de laagbox (0 = boven, 1 = onder). */
  horizon?: number;
  /** Hoogte van de laagbox als deel van de sectie. */
  hoogte?: string;
  /** Breedte van de rietkraag; smaller = kleiner riet. */
  rietBreedte?: string;
  /** Hoe ver het riet onder de rand van de laagbox doorloopt (negatief = lager). */
  rietOnder?: string;
  /** Op telefoons als eigen band in de tekststroom, op brede schermen absoluut achter de inhoud. */
  mobielInStroom?: boolean;
  /** Kleur van de pagina waar de onderrand in oplost. */
  grond?: string;
}) {
  const reduced = useReducedMotion() ?? false;
  const { scrollY } = useScroll();
  const horizonPct = `${horizon * 100}%`;

  return (
    <div
      className={`pointer-events-none select-none overflow-hidden ${
        mobielInStroom
          ? 'relative h-[52vh] min-h-[340px] w-full md:absolute md:inset-x-0 md:bottom-0 md:h-[var(--polder-hoogte)] md:min-h-[420px]'
          : 'absolute inset-x-0 bottom-0 h-[var(--polder-hoogte)] min-h-[420px]'
      }`}
      style={{ '--polder-hoogte': hoogte } as React.CSSProperties}
      aria-hidden
    >
      {/* 1 · lucht en water */}
      <Vlak lag={0.31} muis={6} scrollY={scrollY} muisX={muisX} muisY={muisY} reduced={reduced} schaal={1.1}>
        <div className="absolute inset-0 lucht-masker">
          <Image src={platen.lucht} alt="" fill sizes="100vw" priority className="object-cover object-[50%_62%]" />
        </div>
      </Vlak>

      {/* 2 · molen op de dijk, met spiegeling; dichtgevuld onder de dijk */}
      <Vlak lag={0.22} muis={12} scrollY={scrollY} muisX={muisX} muisY={muisY} reduced={reduced}>
        <div
          className="absolute left-[-14%] w-[112%] translate-y-1/2 sm:left-[-8%] sm:w-[76%] lg:left-[-4%] lg:w-[62%] max-w-[1100px]"
          style={{ bottom: `${(1 - horizon) * 100}%` }}
        >
          <div className="relative aspect-[1800/782]">
            <Image src={platen.molen} alt="" fill sizes="(min-width: 1024px) 62vw, 112vw" priority className="object-contain object-bottom" />
          </div>
          <div className="relative aspect-[1800/782] -scale-y-100 opacity-[0.3] blur-[1.5px] spiegeling">
            <Image src={platen.molen} alt="" fill sizes="(min-width: 1024px) 62vw, 112vw" className="object-contain object-bottom" />
          </div>
        </div>
      </Vlak>

      {/* 3 · nevel over het water: een echte halfdoorzichtige laag, drijft langzaam */}
      <Vlak lag={0.18} muis={10} scrollY={scrollY} muisX={muisX} muisY={muisY} reduced={reduced}>
        <div className="absolute inset-x-[-10%] h-[34%] nevel-drijft" style={{ top: `calc(${horizonPct} - 9%)` }}>
          <Image src={platen.nevel} alt="" fill sizes="120vw" className="object-cover object-center opacity-[0.55]" />
        </div>
      </Vlak>

      {/* 4 · knotwilgen op de nabije oever, rechts, achter het riet. De
          dichtgevulde oever eronder gaat schuil achter het riet en de vloer. */}
      <Vlak lag={0.14} muis={16} scrollY={scrollY} muisX={muisX} muisY={muisY} reduced={reduced}>
        <div className="absolute right-[-22%] bottom-[22%] w-[92%] sm:right-[-12%] sm:w-[62%] lg:right-[-8%] lg:w-[46%] max-w-[900px]">
          <div className="relative aspect-[1800/907]">
            <Image src={platen.wilgen} alt="" fill sizes="(min-width: 1024px) 48vw, 92vw" priority className="object-contain object-bottom" />
          </div>
          <div className="absolute inset-x-[12%] top-[96%] h-[60vh]" style={{ background: grond }} />
        </div>
      </Vlak>

      {/* 5 · rietkraag; dichtgevuld eronder */}
      <Vlak lag={0.06} muis={22} scrollY={scrollY} muisX={muisX} muisY={muisY} reduced={reduced}>
        <div
          className="absolute min-w-[820px] aspect-[1920/759] riet-wiegt"
          style={{ width: rietBreedte, left: `calc((100% - ${rietBreedte}) / 2)`, bottom: rietOnder }}
        >
          <Image src={platen.riet} alt="" fill sizes="110vw" priority className="object-contain object-bottom" />
          <div className="absolute inset-x-0 top-full h-[40vh]" style={{ background: grond }} />
        </div>
      </Vlak>

      {/* 6 · riet vooraan, onscherp, alleen aan de zijkanten zodat het midden open blijft */}
      <Vlak lag={0} muis={34} scrollY={scrollY} muisX={muisX} muisY={muisY} reduced={reduced}>
        <div className="absolute left-[-22%] bottom-[-14%] w-[62%] min-w-[520px] aspect-[1920/759] blur-[2.5px] riet-wiegt-terug opacity-95">
          <Image src={platen.riet} alt="" fill sizes="62vw" className="object-contain object-bottom" />
        </div>
        <div className="absolute right-[-26%] bottom-[-12%] w-[66%] min-w-[520px] aspect-[1920/759] -scale-x-100 blur-[3px] riet-wiegt opacity-95">
          <Image src={platen.riet} alt="" fill sizes="66vw" className="object-contain object-bottom" />
        </div>
      </Vlak>

      {/* onderrand vervaagt naar de pagina, boven alle lagen */}
      <div
        className="absolute inset-x-0 bottom-0 h-[30%]"
        style={{ background: `linear-gradient(180deg, rgba(10,10,12,0) 0%, ${grond} 100%)` }}
      />
    </div>
  );
}

function Vlak({
  children,
  lag,
  muis,
  scrollY,
  muisX,
  muisY,
  reduced,
  schaal = 1.03,
}: {
  children: React.ReactNode;
  /** Deel van de scroll waarmee dit vlak achterblijft (0 = rijdt mee met de pagina). */
  lag: number;
  /** Maximale verschuiving in px bij muisbeweging. */
  muis: number;
  scrollY: MotionValue<number>;
  muisX: MotionValue<number>;
  muisY: MotionValue<number>;
  reduced: boolean;
  schaal?: number;
}) {
  const achter = useTransform(scrollY, [0, SCROLL_BEREIK], [0, lag * SCROLL_BEREIK]);
  const mx = useTransform(muisX, [-1, 1], [muis, -muis]);
  const my = useTransform(muisY, [-1, 1], [muis * 0.45, -muis * 0.45]);
  const y = useTransform([achter, my], ([a, m]) => (a as number) + (m as number));
  return (
    <motion.div className="absolute inset-0" style={reduced ? undefined : { x: mx, y, scale: schaal }} initial={false}>
      {children}
    </motion.div>
  );
}
