'use client';

// Drie afspraken. Het apparaat hier is een wipe: elk blok wordt van links
// naar rechts onthuld, na elkaar. Een andere beweging dan opkomen, en
// stevig genoeg voor de zin "geen kleine lettertjes".

import { motion, useReducedMotion } from 'motion/react';
import { ShieldCheck, MapPin, Clock } from 'lucide-react';
import { Opkomend } from './Opkomend';

const AFSPRAKEN = [
  {
    icoon: ShieldCheck,
    label: 'Mens beslist',
    body: 'Elke uitgaande mail, bestelling of statuswijziging staat eerst als concept klaar en wordt door uw mensen goedgekeurd.',
  },
  {
    icoon: MapPin,
    label: 'Data in Frankfurt',
    body: 'Applicatie en database draaien in Europa. De taalmodelcalls lopen via Anthropic in de VS, opgenomen in onze sub-verwerkerslijst.',
  },
  {
    icoon: Clock,
    label: 'Eén maand opzegtermijn',
    body: 'Geen minimale looptijd na de eerste drie maanden. Levert het niet, dan stopt u.',
  },
];

export function Afspraken() {
  const reduced = useReducedMotion() ?? false;
  return (
    <section className="band pt-20 sm:pt-28">
      <div className="max-w-[720px]">
        <Opkomend
          as="h2"
          inView
          className="font-display text-[30px] leading-[1.06] tracking-[-0.03em] text-[var(--fg)] sm:text-[40px] lg:text-[48px]"
          regels={['Drie afspraken.', 'Geen kleine lettertjes.']}
        />
      </div>
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0">
        {AFSPRAKEN.map((a, i) => (
          <motion.div
            key={a.label}
            className={i > 0 ? 'md:border-l md:border-[var(--border)] md:pl-8' : 'md:pr-8'}
            initial={reduced ? false : { clipPath: 'inset(0 100% 0 0)', opacity: 0.4 }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 * i }}
          >
            <a.icoon size={20} strokeWidth={1.8} className="text-[var(--accent-text)]" />
            <div className="mt-4 text-[20px] leading-tight text-[var(--fg)]">{a.label}</div>
            <p className="mt-2 max-w-[320px] text-[14px] leading-[1.6] text-[var(--fg-dim)]">{a.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
