'use client';

// "Wat een agent doet": drie punten, één tegelijk. Op een breed scherm blijft
// het beeld staan terwijl de bezoeker scrolt en licht per stuk scroll één
// punt op; de andere twee wachten gedimd. Op een telefoon is het gewoon een
// lijst, want daar is pinnen een scroll-belasting.

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, useTransform, type MotionValue } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { OPLOSSINGEN, OPLOSSINGEN_FEATURED } from '@/lib/data/oplossingen';
import { Opkomend, Verschijn } from './Opkomend';
import { useMediaQuery } from './useMediaQuery';
import { useSectieProgress } from './useSectieProgress';
import { Podium } from './Podium';

const PUNTEN = [
  {
    titel: 'Hij leest wat er echt staat',
    body:
      'Een mail met een bijlage, een klacht die eigenlijk een retour is, een aanvraag waarvan de voorwaarde nergens in een veld staat. Een agent leest het, toetst het aan uw beleid en zet de afhandeling klaar.',
    voorbeeld: '“Kunnen jullie twee nieuwe borden sturen, of anders het bedrag terugstorten?”',
    uitkomst: 'Retour herkend · beleid getoetst · antwoord en creditnota klaar',
  },
  {
    titel: 'Hij rekent met uw eigen cijfers',
    body:
      'Bestelritme per klant, seizoenspatroon per artikel, offertes die te lang openstaan. De gegevens liggen er al; een agent levert de uitkomst, met de onderbouwing eronder.',
    voorbeeld: 'Offerte 2026-114 staat 19 dagen open. Deze klant besliste eerder binnen 8.',
    uitkomst: 'Opvolgmail als concept · toon afgestemd op de klant',
  },
  {
    titel: 'Hij werkt tussen uw systemen',
    body:
      'Tussen de webshop en de boekhouding, tussen de mailbox en het ERP, tussen u en de leverancier. Daar staat nu iemand te kopiëren en te plakken. Precies daar doet een agent zijn werk.',
    voorbeeld: 'Bestelling per PDF → orderregels, voorraadcheck, kredietcheck → concept in het ERP',
    uitkomst: 'Bronmail gekoppeld · niets overgetypt',
  },
];

export function WatHijDoet() {
  const breed = useMediaQuery('(min-width: 768px)');
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const gepind = breed && !reduced;
  const scrollYProgress = useSectieProgress(ref, gepind);

  return (
    <section ref={ref} className={gepind ? 'relative h-[260vh]' : 'relative'}>
      <div className={gepind ? 'sticky top-0 flex min-h-screen items-center pt-20 pb-8' : ''}>
        <div className="band w-full py-20 sm:py-28 md:py-0">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-16 lg:gap-24">
            <div>
              <Opkomend
                as="h2"
                inView
                className="font-display text-[30px] leading-[1.06] tracking-[-0.03em] text-[var(--fg)] sm:text-[40px] lg:text-[48px]"
                regels={['Uw pakket onthoudt.', 'Een agent denkt mee.']}
              />
              <Verschijn inView vertraging={0.2}>
                <p className="mt-5 max-w-[460px] text-[15.5px] leading-[1.65] text-[var(--fg-dim)] sm:text-[17px]">
                  Uw administratie draait al ergens in, en dat moet vooral zo blijven. Een agent
                  vervangt uw pakket niet. Hij pakt het werk op dat uw pakket laat liggen.
                </p>
              </Verschijn>
              <Verschijn inView vertraging={0.25} className="hidden md:block">
                <Podium progress={scrollYProgress} gepind={gepind} />
              </Verschijn>
              <Verschijn inView vertraging={0.3} className="mt-8 hidden md:block">
                <div className="text-[13px] text-[var(--fg-faint)]">Waar wij het vaakst bouwen</div>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {OPLOSSINGEN_FEATURED.map((o) => (
                    <li key={o.slug}>
                      <Link
                        href={`/oplossingen/${o.slug}`}
                        className="inline-flex rounded-full border border-[var(--border)] px-3 py-1.5 text-[13px] text-[var(--fg-dim)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--fg)]"
                      >
                        {o.navLabel}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/oplossingen"
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] text-[var(--accent-text)] transition-colors hover:text-[var(--fg)]"
                    >
                      Alle {OPLOSSINGEN.length}
                      <ArrowRight size={13} strokeWidth={2} />
                    </Link>
                  </li>
                </ul>
              </Verschijn>
            </div>

            <ol className="relative space-y-2 md:space-y-4">
              {PUNTEN.map((p, i) => (
                <Punt key={p.titel} punt={p} index={i} progress={scrollYProgress} gepind={gepind} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function Punt({
  punt,
  index,
  progress,
  gepind,
}: {
  punt: (typeof PUNTEN)[number];
  index: number;
  progress: MotionValue<number>;
  gepind: boolean;
}) {
  // Elk punt bezit een derde van de scroll; het licht op in zijn eigen venster.
  const start = index / PUNTEN.length;
  const eind = (index + 1) / PUNTEN.length;
  const laatste = index === PUNTEN.length - 1;
  const opacity = useTransform(
    progress,
    laatste ? [start - 0.1, start, 1] : [start - 0.1, start, eind - 0.02, eind + 0.06],
    laatste ? [0.3, 1, 1] : [0.3, 1, 1, 0.3],
  );
  const lijn = useTransform(progress, [start, eind], [0, 1]);

  return (
    <motion.li
      style={gepind ? { opacity } : undefined}
      className="relative grid grid-cols-[28px_minmax(0,1fr)] gap-x-4 rounded-[var(--radius)] px-2 py-4 md:px-4 md:py-4"
    >
      <div className="relative">
        <span className="absolute left-[13px] top-1 h-[calc(100%+0.5rem)] w-px bg-[var(--border)]" aria-hidden />
        {gepind && (
          <motion.span
            className="absolute left-[13px] top-1 h-[calc(100%+0.5rem)] w-px origin-top bg-[var(--accent)]"
            style={{ scaleY: lijn }}
            aria-hidden
          />
        )}
        <span className="relative z-10 grid h-7 w-7 place-items-center rounded-full border border-[var(--border-strong)] bg-[var(--bg)] font-mono text-[11px] text-[var(--accent-text)]">
          {index + 1}
        </span>
      </div>
      <div>
        <h3 className="text-[19px] leading-snug text-[var(--fg)] sm:text-[21px]">{punt.titel}</h3>
        <p className="mt-2 text-[14px] leading-[1.6] text-[var(--fg-dim)]">{punt.body}</p>
        <div className="mt-3 rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[12.5px] leading-[1.5]">
          <div className="text-[var(--fg-dim)]">{punt.voorbeeld}</div>
          <div className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--sage)]">{punt.uitkomst}</div>
        </div>
      </div>
    </motion.li>
  );
}
