'use client';

// De polder als fotolagen. Drie platen die los van elkaar bewegen:
//   1. de lucht met het water (ver, beweegt nauwelijks)
//   2. de molen op de dijk, met zijn spiegeling in het water
//   3. de rietkraag vooraan (dichtbij, beweegt het meest en wiegt zacht)
// Daartussen nevel. De platen zijn gegenereerd en uitgesneden met echt
// alfakanaal; de lucht is een gewone foto.

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';

export interface PolderPlaten {
  lucht: string;
  molen: string;
  riet: string;
}

export const POLDER_SCHEMER: PolderPlaten = {
  lucht: '/polder/lucht-schemer.webp',
  molen: '/polder/molen.webp',
  riet: '/polder/riet.webp',
};

export const POLDER_DAGERAAD: PolderPlaten = {
  lucht: '/polder/lucht-dageraad.webp',
  molen: '/polder/molen.webp',
  riet: '/polder/riet.webp',
};

export function PolderFoto({
  platen,
  muisX,
  muisY,
  /** Hoogte van de horizon, als deel van de laagbox (0 = boven, 1 = onder). */
  horizon = 0.5,
  /** Hoogte van de laagbox als deel van de sectie. */
  hoogte = '72%',
  /** Breedte van de rietkraag; smaller = kleiner riet. */
  rietBreedte = '110%',
  /** Hoe ver het riet onder de rand van de laagbox doorloopt (negatief = lager). */
  rietOnder = '-4%',
  /**
   * Op telefoons als eigen band in de tekststroom (tussen de kop en het
   * venster), op brede schermen absoluut achter de inhoud. Zonder dit staat
   * de polder op een telefoon volledig achter het venster verstopt.
   */
  mobielInStroom = false,
}: {
  platen: PolderPlaten;
  muisX: MotionValue<number>;
  muisY: MotionValue<number>;
  horizon?: number;
  hoogte?: string;
  rietBreedte?: string;
  rietOnder?: string;
  mobielInStroom?: boolean;
}) {
  const reduced = useReducedMotion() ?? false;
  const { scrollY } = useScroll();

  return (
    <div
      className={`pointer-events-none select-none ${
        mobielInStroom
          ? 'relative h-[46vh] min-h-[300px] w-full md:absolute md:inset-x-0 md:bottom-0 md:h-[var(--polder-hoogte)] md:min-h-[380px]'
          : 'absolute inset-x-0 bottom-0 h-[var(--polder-hoogte)] min-h-[380px]'
      }`}
      style={{ '--polder-hoogte': hoogte } as React.CSSProperties}
      aria-hidden
    >
      {/* 1 · lucht en water. De bovenrand van de foto lost op in de lucht van
          de pagina via een masker, zodat er geen naad is waar de foto begint. */}
      <Laag diepte={0.06} scrollY={scrollY} muisX={muisX} muisY={muisY} reduced={reduced} schaal={1.08}>
        <div className="absolute inset-0 lucht-masker">
          <Image src={platen.lucht} alt="" fill sizes="100vw" priority className="object-cover object-[50%_62%]" />
        </div>
      </Laag>

      <Nevel top={`${(horizon - 0.1) * 100}%`} kleur="rgba(244, 196, 150, 0.22)" breedte="80%" links="10%" duur={48} hoogte="16%" />

      {/* 2 · molen op de dijk, met spiegeling */}
      <Laag diepte={0.26} scrollY={scrollY} muisX={muisX} muisY={muisY} reduced={reduced}>
        {/* De container bevat molen én spiegeling; de contactlijn ligt in het
            midden, dus hij schuift een halve hoogte omlaag om op de horizon te staan. */}
        <div
          className="absolute left-[-14%] w-[112%] translate-y-1/2 sm:left-[-8%] sm:w-[76%] lg:left-[-4%] lg:w-[62%] max-w-[1100px]"
          style={{ bottom: `${(1 - horizon) * 100}%` }}
        >
          <div className="relative aspect-[1800/782]">
            <Image src={platen.molen} alt="" fill sizes="(min-width: 1024px) 64vw, 110vw" priority className="object-contain object-bottom" />
          </div>
          {/* spiegeling: dezelfde uitsnede, gespiegeld, zacht en wegstervend */}
          <div className="relative aspect-[1800/782] -scale-y-100 opacity-[0.3] blur-[1.5px] spiegeling">
            <Image src={platen.molen} alt="" fill sizes="(min-width: 1024px) 64vw, 110vw" className="object-contain object-bottom" />
          </div>
        </div>
      </Laag>

      <Nevel top={`${(horizon + 0.04) * 100}%`} kleur="rgba(120, 96, 120, 0.26)" breedte="100%" links="0%" duur={64} hoogte="18%" omgekeerd />

      {/* 3 · riet vooraan */}
      <Laag diepte={0.62} scrollY={scrollY} muisX={muisX} muisY={muisY} reduced={reduced} schaal={1.04}>
        <div
          className="absolute min-w-[820px] aspect-[1920/759] riet-wiegt"
          style={{ width: rietBreedte, left: `calc((100% - ${rietBreedte}) / 2)`, bottom: rietOnder }}
        >
          <Image src={platen.riet} alt="" fill sizes="110vw" priority className="object-contain object-bottom" />
        </div>
      </Laag>

      {/* onderrand vervaagt naar de achtergrond van de pagina */}
      <div
        className="absolute inset-x-0 bottom-0 h-[34%]"
        style={{ background: 'linear-gradient(180deg, rgba(10,10,12,0) 0%, rgba(10,10,12,0.7) 55%, var(--bg) 100%)' }}
      />
    </div>
  );
}

function Laag({
  children,
  diepte,
  scrollY,
  muisX,
  muisY,
  reduced,
  schaal = 1.03,
}: {
  children: React.ReactNode;
  diepte: number;
  scrollY: MotionValue<number>;
  muisX: MotionValue<number>;
  muisY: MotionValue<number>;
  reduced: boolean;
  schaal?: number;
}) {
  const scrollVerschuiving = useTransform(scrollY, [0, 900], [0, -diepte * 110 + 30]);
  const mx = useTransform(muisX, [-1, 1], [diepte * 26, -diepte * 26]);
  const my = useTransform(muisY, [-1, 1], [diepte * 12, -diepte * 12]);
  const y = useTransform([scrollVerschuiving, my], ([s, m]) => (s as number) + (m as number));
  return (
    <motion.div className="absolute inset-0" style={reduced ? undefined : { x: mx, y, scale: schaal }} initial={false}>
      {children}
    </motion.div>
  );
}

function Nevel({
  top,
  kleur,
  breedte,
  links,
  duur,
  hoogte,
  omgekeerd = false,
}: {
  top: string;
  kleur: string;
  breedte: string;
  links: string;
  duur: number;
  hoogte: string;
  omgekeerd?: boolean;
}) {
  return (
    <div
      className={`absolute rounded-[50%] nevel ${omgekeerd ? 'nevel-terug' : ''}`}
      style={{
        top,
        left: links,
        width: breedte,
        height: hoogte,
        background: `radial-gradient(ellipse at center, ${kleur} 0%, transparent 70%)`,
        filter: 'blur(22px)',
        animationDuration: `${duur}s`,
      }}
    />
  );
}
