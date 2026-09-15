'use client';

// De gelaagde horizon in de hero. Elke laag schuift bij scrollen en bij
// muisbeweging een eigen stukje mee (verder weg = minder), met nevel
// ertussen die traag drijft. Met reduced motion staat alles stil.

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import type { Laag } from './landschap/Bos';

export type LandschapVariant = 'bos' | 'polder';

export interface NevelKleuren {
  achter: string;
  voor: string;
}

const SCHEMER_NEVEL: NevelKleuren = { achter: 'rgba(240, 178, 122, 0.22)', voor: 'rgba(201, 116, 74, 0.16)' };

export function Landschap({
  lagen,
  muisX,
  muisY,
  nevel = SCHEMER_NEVEL,
}: {
  lagen: Laag[];
  muisX: MotionValue<number>;
  muisY: MotionValue<number>;
  nevel?: NevelKleuren;
}) {
  const reduced = useReducedMotion() ?? false;
  const { scrollY } = useScroll();

  return (
    <div className="absolute inset-x-0 bottom-0 h-[62%] min-h-[340px] pointer-events-none" aria-hidden>
      {/* nevel achter de verste laag */}
      <Nevel top="34%" kleur={nevel.achter} breedte="70%" links="15%" duur={46} />
      {lagen.map((laag, i) => (
        <LaagView key={laag.id} laag={laag} scrollY={scrollY} muisX={muisX} muisY={muisY} reduced={reduced} index={i} />
      ))}
      {/* nevel tussen midden en voorgrond */}
      <Nevel top="58%" kleur={nevel.voor} breedte="90%" links="5%" duur={58} omgekeerd />
      {/* onderrand vervaagt naar de achtergrond van de pagina */}
      <div
        className="absolute inset-x-0 bottom-0 h-[40%]"
        style={{ background: 'linear-gradient(180deg, rgba(10,10,12,0) 0%, rgba(10,10,12,0.75) 60%, var(--bg) 100%)' }}
      />
    </div>
  );
}

function LaagView({
  laag,
  scrollY,
  muisX,
  muisY,
  reduced,
  index,
}: {
  laag: Laag;
  scrollY: MotionValue<number>;
  muisX: MotionValue<number>;
  muisY: MotionValue<number>;
  reduced: boolean;
  index: number;
}) {
  const scrollVerschuiving = useTransform(scrollY, [0, 900], [0, -laag.diepte * 90 + 40]);
  const mx = useTransform(muisX, [-1, 1], [laag.diepte * 22, -laag.diepte * 22]);
  const my = useTransform(muisY, [-1, 1], [laag.diepte * 10, -laag.diepte * 10]);
  const y = useTransform([scrollVerschuiving, my], ([s, m]) => (s as number) + (m as number));

  return (
    <motion.div
      className="absolute inset-0"
      style={reduced ? undefined : { x: mx, y, scale: 1.06 }}
      // De laag die het verst weg is, wordt licht 'in de nevel' getekend.
      initial={false}
    >
      <div className="absolute inset-0" style={{ opacity: index === 0 ? 0.92 : 1 }}>
        {laag.svg}
      </div>
    </motion.div>
  );
}

function Nevel({ top, kleur, breedte, links, duur, omgekeerd = false }: { top: string; kleur: string; breedte: string; links: string; duur: number; omgekeerd?: boolean }) {
  return (
    <div
      className={`absolute h-[26%] rounded-[50%] nevel ${omgekeerd ? 'nevel-terug' : ''}`}
      style={{
        top,
        left: links,
        width: breedte,
        background: `radial-gradient(ellipse at center, ${kleur} 0%, transparent 70%)`,
        filter: 'blur(24px)',
        animationDuration: `${duur}s`,
      }}
    />
  );
}

/** Muispositie van een element, genormaliseerd naar -1..1, met veer erop. */
export function useMuisParallax() {
  const ruwX = useMotionValue(0);
  const ruwY = useMotionValue(0);
  const muisX = useSpring(ruwX, { stiffness: 40, damping: 18, mass: 0.6 });
  const muisY = useSpring(ruwY, { stiffness: 40, damping: 18, mass: 0.6 });
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const opBeweging = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      ruwX.set(((e.clientX - r.left) / r.width) * 2 - 1);
      ruwY.set(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    const opWeg = () => {
      ruwX.set(0);
      ruwY.set(0);
    };
    el.addEventListener('pointermove', opBeweging);
    el.addEventListener('pointerleave', opWeg);
    return () => {
      el.removeEventListener('pointermove', opBeweging);
      el.removeEventListener('pointerleave', opWeg);
    };
  }, [ruwX, ruwY]);

  return { ref, muisX, muisY };
}
