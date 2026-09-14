'use client';

// Tekst die regel voor regel opkomt: elke regel zit in een afgeknipte
// container en schuift van onder omhoog. Bij reduced motion staat hij er.
//
// De waarneming (in beeld of niet) zit op de buitenste tag, niet op de
// regels zelf: een regel die nog onder de knipgrens staat telt voor de
// IntersectionObserver als onzichtbaar en zou dus nooit opkomen.

import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

const regelVarianten: Variants = {
  verborgen: { y: '110%', opacity: 0 },
  zichtbaar: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE, delay: i * 0.09 },
  }),
};

export function Opkomend({
  regels,
  vertraging = 0,
  className = '',
  as = 'div',
  inView = false,
}: {
  regels: ReactNode[];
  vertraging?: number;
  className?: string;
  as?: 'div' | 'h1' | 'h2' | 'p';
  inView?: boolean;
}) {
  const reduced = useReducedMotion() ?? false;
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduced ? false : 'verborgen'}
      {...(inView
        ? { whileInView: 'zichtbaar', viewport: { once: true, margin: '-8% 0px' } }
        : { animate: 'zichtbaar' })}
      transition={{ delayChildren: vertraging }}
    >
      {regels.map((regel, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span className="block will-change-transform" variants={regelVarianten} custom={i}>
            {regel}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function Verschijn({
  children,
  vertraging = 0,
  className = '',
  inView = false,
  y = 18,
}: {
  children: ReactNode;
  vertraging?: number;
  className?: string;
  inView?: boolean;
  y?: number;
}) {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { y, opacity: 0 }}
      {...(inView
        ? { whileInView: { y: 0, opacity: 1 }, viewport: { once: true, margin: '-8% 0px' } }
        : { animate: { y: 0, opacity: 1 } })}
      transition={{ duration: 0.9, ease: EASE, delay: vertraging }}
    >
      {children}
    </motion.div>
  );
}
