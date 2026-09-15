'use client';

// Een gelaagde luchtband boven de kop van elke binnenpagina: dezelfde
// polderlucht als op de homepage (dageraad), zacht en laag in contrast, die
// iets achterblijft bij het scrollen. Geeft elke pagina diepte en continuïteit
// zonder de inhoud te storen.

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

export function LuchtBand() {
  const reduced = useReducedMotion() ?? false;
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 60]);
  const opacity = useTransform(scrollY, [0, 650], [1, 0]);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[680px] overflow-hidden" aria-hidden>
      <motion.div data-vlak="luchtband" className="absolute inset-0 lucht-band" style={reduced ? undefined : { y, opacity }}>
        <Image src="/polder/lagen-dageraad/master.webp" alt="" fill sizes="100vw" priority className="object-cover object-[50%_34%] opacity-[0.85]" />
      </motion.div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(38,52,62,0.55) 0%, rgba(45,63,70,0.75) 40%, var(--bg) 100%)' }} />
    </div>
  );
}
