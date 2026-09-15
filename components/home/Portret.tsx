'use client';

// Het portret met diepte: de gloed erachter blijft achter, het portret zelf
// rijdt iets voor de pagina uit, en een zachte nevel ervoor beweegt het
// snelst. Drie snelheden, kleine verschillen.

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useTransform } from 'motion/react';
import { useZichtProgress } from './useZichtProgress';

export function Portret({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const p = useZichtProgress(ref, !reduced);
  const gloedY = useTransform(p, [0, 1], [60, -60]);
  const portretY = useTransform(p, [0, 1], [30, -30]);
  const nevelY = useTransform(p, [0, 1], [-40, 40]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
      <motion.div
        data-vlak="portret-gloed"
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          y: reduced ? 0 : gloedY,
          background: 'radial-gradient(circle, rgba(201, 116, 74, 0.28) 0%, rgba(43, 26, 46, 0.35) 45%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <motion.div data-vlak="portret" className="portret-vervaag relative aspect-[916/1315] w-full" style={{ y: reduced ? 0 : portretY }}>
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 480px, 80vw" className="object-contain object-bottom" />
      </motion.div>
      <motion.div
        data-vlak="portret-nevel"
        aria-hidden
        className="pointer-events-none absolute inset-x-[-10%] bottom-[-6%] h-[38%]"
        style={{
          y: reduced ? 0 : nevelY,
          background: 'radial-gradient(ellipse at center, rgba(120, 96, 120, 0.35) 0%, transparent 70%)',
          filter: 'blur(26px)',
        }}
      />
    </div>
  );
}
