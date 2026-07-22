'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Check, Pencil, Send, X, RotateCcw } from 'lucide-react';
import { useInstellingen } from './instellingen';
import { speelStap, speelMoment } from './geluid';
import { EASE_UIT_CSS } from './tokens';

/**
 * De Agent Sandbox: de bezoeker laat de agent zélf een taak oppakken.
 * Volledig client-side gescript en deterministisch: de agent leest
 * (highlight-sweep), denkt (redeneerregels), tikt een concept
 * (typemachine) en stopt dan bewust: de mens beslist. GSAP regisseert
 * de choreografie; in de rustige modus verschijnt alles direct en
 * blijven alle keuzes gewoon werken.
 */

interface Bericht {
  id: string;
  van: string;
  onderwerp: string;
  tekst: string;
  redenatie: string[];
  concept: string;
  conceptSoort: string;
}

const BERICHTEN: Bericht[] = [
  {
    id: 'webshop',
    van: 'klant · webshop',
    onderwerp: 'Waar blijft mijn bestelling #8412?',
    tekst:
      'Ik heb vorige week dinsdag besteld en zou binnen drie werkdagen leveren. Het is nu maandag en ik heb nog niets gehoord. Wat is er aan de hand?',
    redenatie: [
      'Order #8412 gevonden: vertraagd bij de vervoerder, nieuwe leverdatum morgen.',
      'Klant bestelt vaak; toon extra zorgvuldig, kortingscode aanbieden mag tot € 5.',
      'Track & trace opgehaald en in het antwoord gezet.',
    ],
    concept:
      'Beste mevrouw Peters,\n\nU heeft gelijk, dat duurde te lang. Uw pakket lag vertraagd bij de vervoerder en wordt morgen voor 17.00 uur bezorgd; de track & trace staat hieronder.\n\nAls kleine pleister: code SORRY5 voor € 5 korting op uw volgende bestelling.',
    conceptSoort: 'Concept-antwoord',
  },
  {
    id: 'storing',
    van: 'huurder · vastgoedbeheer',
    onderwerp: 'CV-ketel kapot, Vondelstraat 12',
    tekst:
      'Sinds vanochtend doet de verwarming het niet meer en het is koud in huis. Kan er snel iemand komen kijken?',
    redenatie: [
      'Storing herkend als urgent (verwarming, winterperiode): monteur nodig binnen 24 uur.',
      'Agenda installateur Bakker gecheckt: morgen 8.00 uur is vrij; werkbon aangemaakt.',
      'Keten klaargezet: huurder bevestigen, monteur inplannen, werkbon naar de administratie.',
    ],
    concept:
      'Beste heer Yilmaz,\n\nVervelend, zeker met deze kou. Er is direct een monteur ingepland: morgen tussen 8.00 en 9.00 uur staat installateur Bakker bij u voor de deur.\n\nDe werkbon en de melding in het onderhoudssysteem staan klaar. Drie acties, één akkoord: zal ik alles doorzetten?',
    conceptSoort: 'Keten: 3 acties klaargezet',
  },
  {
    id: 'factuur',
    van: 'klant · administratie',
    onderwerp: 'Vraag over factuur 2026-0341',
    tekst:
      'Beste, op factuur 2026-0341 staat een toeslag van € 85 die ik niet kan plaatsen. Kunnen jullie dit toelichten?',
    redenatie: [
      'Factuur 2026-0341 gevonden: toeslag betreft spoedlevering op 14 maart.',
      'Spoedtoeslag is vooraf per mail bevestigd door de heer De Kort.',
      'Toon: kort en vriendelijk, met de bevestiging als bijlage.',
    ],
    concept:
      'Beste mevrouw Jansen,\n\nDe toeslag van € 85 op factuur 2026-0341 is de spoedtoeslag voor de levering van 14 maart, die op 12 maart per mail door uw collega is bevestigd. Ik heb die bevestiging bijgevoegd.\n\nZo klopt het weer helemaal. Fijne dag!',
    conceptSoort: 'Concept-antwoord',
  },
];

type Fase = 'inbox' | 'leest' | 'denkt' | 'tikt' | 'wacht' | 'verstuurd' | 'aangepast' | 'geannuleerd';

const STATUS_BIJ_FASE: Record<Fase, string> = {
  inbox: 'Gereed',
  leest: 'Leest het bericht',
  denkt: 'Controleert dossier en afspraken',
  tikt: 'Stelt het concept op',
  wacht: 'Wacht op uw besluit',
  verstuurd: 'Verstuurd',
  aangepast: 'Aangepast door u',
  geannuleerd: 'Gestopt',
};

export function Sandbox() {
  const { rustig, geluidAan } = useInstellingen();
  const [fase, setFase] = useState<Fase>('inbox');
  const [gekozen, setGekozen] = useState<Bericht | null>(null);
  const [redenatieN, setRedenatieN] = useState(0);
  const [getypt, setGetypt] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: wrap });

  const start = contextSafe((bericht: Bericht) => {
    setGekozen(bericht);
    setRedenatieN(0);
    setGetypt(0);

    if (rustig) {
      setGetypt(bericht.concept.length);
      setRedenatieN(bericht.redenatie.length);
      setFase('wacht');
      speelMoment(geluidAan);
      return;
    }

    const tl = gsap.timeline();
    tl.call(() => {
      setFase('leest');
      speelStap(geluidAan);
    });
    tl.to({}, { duration: 1.9 });
    tl.call(() => {
      setFase('denkt');
      speelStap(geluidAan);
    });
    bericht.redenatie.forEach((_, i) => {
      tl.to({}, { duration: 0.85 });
      tl.call(() => setRedenatieN(i + 1));
    });
    tl.to({}, { duration: 0.5 });
    tl.call(() => {
      setFase('tikt');
      speelStap(geluidAan);
    });
    const voortgang = { n: 0 };
    tl.to(voortgang, {
      n: bericht.concept.length,
      duration: Math.min(4.2, bericht.concept.length * 0.02),
      ease: 'none',
      onUpdate: () => setGetypt(Math.round(voortgang.n)),
    });
    tl.to({}, { duration: 0.35 });
    tl.call(() => {
      setFase('wacht');
      speelMoment(geluidAan);
    });
  });

  function reset() {
    setFase('inbox');
    setGekozen(null);
    setRedenatieN(0);
    setGetypt(0);
  }

  const bezig = fase !== 'inbox' && fase !== 'verstuurd' && fase !== 'aangepast' && fase !== 'geannuleerd';

  return (
    <section
      aria-labelledby="sandbox-titel"
      className="border-y border-[var(--paper-edge)] bg-[var(--paper-warm)]/60"
    >
      <div ref={wrap} className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-16 sm:py-24">
        <div className="max-w-[640px]">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--oker-deep)]">
            Probeer het zelf · de sandbox
          </div>
          <h2
            id="sandbox-titel"
            className="mt-3 font-display text-[28px] sm:text-[36px] leading-[1.1] tracking-tight text-[var(--ink)]"
          >
            Geef de agent een <span className="italic text-[var(--oker-deep)]">klus.</span>
          </h2>
          <p className="mt-3 text-[14.5px] leading-[1.65] text-[var(--ink-dim)]">
            Drie berichten uit een doorsnee MKB-inbox. Kies er één en kijk wat er gebeurt. En let op
            het einde: de agent verstuurt niets zonder u.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr] lg:gap-10">
          {/* de inbox */}
          <div aria-label="Voorbeeldinbox" role="list" className="space-y-3">
            {BERICHTEN.map((b) => {
              const dit = gekozen?.id === b.id;
              return (
                <div
                  key={b.id}
                  role="listitem"
                  className={`relative rounded-[3px] border bg-[var(--paper)] px-4 py-3.5 shadow-[var(--shadow-soft)] transition-colors ${
                    dit ? 'border-[var(--oker)]' : 'border-[var(--paper-edge)]'
                  }`}
                >
                  <div className="font-mono text-[10px] text-[var(--ink-faint)]">{b.van}</div>
                  <div className="mt-1 font-display text-[15px] leading-tight text-[var(--ink)]">
                    {b.onderwerp}
                  </div>
                  <p className="relative mt-1.5 overflow-hidden text-[12.5px] leading-[1.55] text-[var(--ink-dim)]">
                    {b.tekst}
                    {/* lees-sweep */}
                    {dit && fase === 'leest' && !rustig && (
                      <motion.span
                        aria-hidden
                        className="absolute inset-y-0 w-16"
                        style={{
                          background:
                            'linear-gradient(90deg, transparent, rgba(168,128,58,0.28), transparent)',
                        }}
                        initial={{ left: '-18%' }}
                        animate={{ left: '108%' }}
                        transition={{ duration: 0.9, repeat: 2, ease: 'easeInOut' }}
                      />
                    )}
                  </p>
                  <div className="mt-2.5">
                    {dit && bezig ? (
                      <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--oker-deep)]">
                        <motion.span
                          aria-hidden
                          className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--oker)]"
                          animate={rustig ? undefined : { opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        {fase === 'leest' && 'De agent leest mee'}
                        {fase === 'denkt' && 'De agent denkt na'}
                        {fase === 'tikt' && 'De agent tikt een concept'}
                        {fase === 'wacht' && 'Wacht op uw besluit'}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => start(b)}
                        disabled={bezig}
                        className="rounded-[2px] bg-[var(--ink)] px-3.5 py-1.5 text-[12.5px] text-[var(--paper)] transition-colors hover:bg-[var(--oker-deep)] disabled:opacity-35"
                      >
                        Laat de agent dit oppakken
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* de werkbank van de agent */}
          <div className="relative min-h-[420px] rounded-[4px] border border-[var(--paper-edge)] bg-[var(--paper)] p-5 sm:p-7 shadow-[var(--shadow-lift)]">
            <div className="pointer-events-none absolute right-4 top-4 flex items-center gap-2">
              <motion.span
                aria-hidden
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: fase === 'wacht' ? 'var(--terra)' : 'var(--oker)' }}
                animate={rustig || !bezig ? undefined : { opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-[var(--ink-faint)]">
                {STATUS_BIJ_FASE[fase]}
              </span>
            </div>

            <AnimatePresence mode="wait">
              {!gekozen ? (
                <motion.div
                  key="leeg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full min-h-[360px] flex-col items-center justify-center text-center"
                >
                  <svg viewBox="0 0 120 60" className="w-[110px]" aria-hidden focusable="false">
                    <path
                      d="M8 50 C 40 42, 36 18, 62 22 C 88 26, 86 48, 112 34"
                      fill="none"
                      stroke="var(--oker)"
                      strokeWidth="1.4"
                      strokeDasharray="2.5 7"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p className="mt-4 max-w-[300px] text-[13.5px] leading-[1.6] text-[var(--ink-dim)]">
                    Kies links een bericht. De agent laat hier stap voor stap zien wat hij ermee
                    doet.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={gekozen.id + fase.replace(/verstuurd|aangepast|geannuleerd/, 'klaar')}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE_UIT_CSS }}
                  className="pr-16 sm:pr-24"
                >
                  {/* redenatie */}
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-faint)]">
                    Wat de agent controleert
                  </div>
                  <ul className="mt-2.5 space-y-1.5" aria-live="polite">
                    {gekozen.redenatie.slice(0, redenatieN).map((r, i) => (
                      <motion.li
                        key={i}
                        initial={rustig ? false : { opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-2 text-[12.5px] leading-snug text-[var(--ink-dim)]"
                      >
                        <Check size={12} strokeWidth={2.4} className="mt-[2px] shrink-0 text-[var(--mos)]" aria-hidden />
                        {r}
                      </motion.li>
                    ))}
                  </ul>

                  {/* het concept */}
                  {(fase === 'tikt' || fase === 'wacht' || fase === 'verstuurd' || fase === 'aangepast' || fase === 'geannuleerd') && (
                    <div className="mt-5 rounded-[3px] border border-[var(--paper-edge)] bg-[var(--paper-warm)]/70 px-4 py-3.5">
                      <div className="flex items-baseline justify-between gap-3 border-b border-dashed border-[var(--paper-edge)] pb-2">
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--oker-deep)]">
                          {gekozen.conceptSoort}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--ink-faint)]">
                          concept · nog niet verstuurd
                        </span>
                      </div>
                      <p className="mt-2.5 whitespace-pre-wrap text-[13px] leading-[1.6] text-[var(--ink)]">
                        {gekozen.concept.slice(0, getypt)}
                        {fase === 'tikt' && (
                          <motion.span
                            aria-hidden
                            className="ml-[1px] inline-block h-[14px] w-[7px] translate-y-[2px] bg-[var(--oker)]"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          />
                        )}
                      </p>
                    </div>
                  )}

                  {/* het mens-beslist-moment */}
                  <AnimatePresence>
                    {fase === 'wacht' && (
                      <motion.div
                        initial={rustig ? { opacity: 0 } : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-5 rounded-[3px] border border-[var(--terra)] bg-[var(--paper)] px-4 py-3.5"
                      >
                        <div className="font-display text-[16px] text-[var(--ink)]">
                          De agent stopt hier.{' '}
                          <span className="italic text-[var(--terra)]">U beslist.</span>
                        </div>
                        <p className="mt-1 text-[12.5px] leading-[1.55] text-[var(--ink-dim)]">
                          Wil je dit versturen?
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => setFase('verstuurd')}
                            className="inline-flex items-center gap-1.5 rounded-[2px] bg-[var(--terra)] px-3.5 py-2 text-[12.5px] text-[var(--paper)] transition-colors hover:bg-[var(--oker-deep)]"
                          >
                            <Send size={12} strokeWidth={2} aria-hidden /> Verstuur
                          </button>
                          <button
                            type="button"
                            onClick={() => setFase('aangepast')}
                            className="inline-flex items-center gap-1.5 rounded-[2px] border border-[var(--paper-edge)] bg-[var(--paper)] px-3.5 py-2 text-[12.5px] text-[var(--ink)] transition-colors hover:border-[var(--oker)]"
                          >
                            <Pencil size={12} strokeWidth={2} aria-hidden /> Pas aan
                          </button>
                          <button
                            type="button"
                            onClick={() => setFase('geannuleerd')}
                            className="inline-flex items-center gap-1.5 rounded-[2px] border border-[var(--paper-edge)] bg-[var(--paper)] px-3.5 py-2 text-[12.5px] text-[var(--ink-dim)] transition-colors hover:border-[var(--terra)]"
                          >
                            <X size={12} strokeWidth={2} aria-hidden /> Annuleer
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {(fase === 'verstuurd' || fase === 'aangepast' || fase === 'geannuleerd') && (
                    <motion.div
                      initial={rustig ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-[3px] border border-[var(--paper-edge)] bg-[var(--paper-warm)] px-4 py-3"
                    >
                      <span className="text-[13px] text-[var(--ink)]">
                        {fase === 'verstuurd' && (
                          <>
                            <span className="font-display">Verstuurd.</span>{' '}
                            <span className="text-[var(--ink-dim)]">
                              Zo voelt het als de routine vanzelf gaat.
                            </span>
                          </>
                        )}
                        {fase === 'aangepast' && (
                          <>
                            <span className="font-display">Precies.</span>{' '}
                            <span className="text-[var(--ink-dim)]">
                              U schaaft bij, de agent leert uw voorkeur.
                            </span>
                          </>
                        )}
                        {fase === 'geannuleerd' && (
                          <>
                            <span className="font-display">Ook goed.</span>{' '}
                            <span className="text-[var(--ink-dim)]">
                              Niets gaat de deur uit zonder u. Dat is het hele punt.
                            </span>
                          </>
                        )}
                      </span>
                      <button
                        type="button"
                        onClick={reset}
                        className="inline-flex items-center gap-1.5 rounded-[2px] border border-[var(--paper-edge)] bg-[var(--paper)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink-dim)] transition-colors hover:border-[var(--oker)]"
                      >
                        <RotateCcw size={11} strokeWidth={2} aria-hidden /> Nog een bericht
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
