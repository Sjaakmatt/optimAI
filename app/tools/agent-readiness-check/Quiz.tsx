'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: { label: string; score: number }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'Hoeveel medewerkers werken er bij u op kantoor (binnendienst, administratie, planning)?',
    options: [
      { label: '0–2 medewerkers', score: 1 },
      { label: '3–10 medewerkers', score: 3 },
      { label: '11–25 medewerkers', score: 3 },
      { label: 'Meer dan 25', score: 2 },
    ],
  },
  {
    id: 'q2',
    text: 'Komt er per dag dezelfde soort vraag of werk binnen via mail of telefoon?',
    options: [
      { label: 'Bijna alles is uniek', score: 0 },
      { label: 'De helft is routine', score: 2 },
      { label: 'Drie kwart is voorspelbaar patroon', score: 3 },
      { label: 'Vrijwel alles draait om dezelfde 5 vragen', score: 3 },
    ],
  },
  {
    id: 'q3',
    text: 'Hoeveel mails komen er per dag binnen op de centrale inbox?',
    options: [
      { label: 'Minder dan 20', score: 0 },
      { label: '20–60', score: 2 },
      { label: '60–150', score: 3 },
      { label: 'Meer dan 150', score: 3 },
    ],
  },
  {
    id: 'q4',
    text: 'Hoe staat het met uw boekhoudpakket?',
    options: [
      { label: 'Modern (Exact, AFAS, Twinfield, Moneybird, Snelstart, Visma)', score: 3 },
      { label: 'Iets ouder met API of e-mail-export', score: 2 },
      { label: 'Verouderd, alleen handmatig in te zien', score: 1 },
      { label: 'Geen boekhoudpakket', score: 0 },
    ],
  },
  {
    id: 'q5',
    text: 'Heeft u beleid op papier (bedragen-mandaat, klantgroepen, kortingsregels)?',
    options: [
      { label: 'Vrijwel niets staat op papier', score: 0 },
      { label: 'Een paar dingen, rest in hoofden', score: 1 },
      { label: 'Het meeste staat in een handboek of QHSE-systeem', score: 3 },
      { label: 'Alles is gedocumenteerd', score: 3 },
    ],
  },
  {
    id: 'q6',
    text: 'Wat is de houding van uw team tegenover automatisering?',
    options: [
      { label: 'Sceptisch — bang om vervangen te worden', score: 0 },
      { label: 'Neutraal — wachten af', score: 1 },
      { label: 'Geïnteresseerd — willen mee bouwen', score: 3 },
      { label: 'Vragen er zelf om', score: 3 },
    ],
  },
  {
    id: 'q7',
    text: 'Heeft één persoon binnen uw bedrijf tijd om mee te denken over beleid en bijsturing?',
    options: [
      { label: 'Nee, iedereen is overvol', score: 0 },
      { label: 'Misschien een paar uur per maand', score: 2 },
      { label: 'Eén persoon kan een uur per week vrijmaken', score: 3 },
      { label: 'Ik heb iemand fulltime hierop', score: 3 },
    ],
  },
  {
    id: 'q8',
    text: 'Hoe vaak loopt urgent werk vast omdat een medewerker afwezig is?',
    options: [
      { label: 'Bijna nooit', score: 0 },
      { label: 'Soms', score: 1 },
      { label: 'Regelmatig — kennis zit bij één persoon', score: 3 },
      { label: 'Wekelijks paniek', score: 3 },
    ],
  },
  {
    id: 'q9',
    text: 'Verliest u opdrachten of klanten door trage reactietijd?',
    options: [
      { label: 'Nee, reactietijd is geen issue', score: 0 },
      { label: 'Soms', score: 1 },
      { label: 'Regelmatig — concurrenten zijn sneller', score: 3 },
      { label: 'Structureel', score: 3 },
    ],
  },
  {
    id: 'q10',
    text: 'Hoeveel ruimte heeft u in budget voor een eenmalige bouwprijs van een agent (vaste prijs, eerste keer)?',
    options: [
      { label: 'Geen budget op dit moment', score: 0 },
      { label: 'Tot € 5.000 als het zich snel terugverdient', score: 1 },
      { label: '€ 5.000 – € 25.000', score: 3 },
      { label: 'Meer dan € 25.000', score: 3 },
    ],
  },
];

const MAX_SCORE = QUESTIONS.length * 3;

interface ResultBand {
  min: number;
  band: string;
  title: string;
  body: string;
  cta: { href: string; label: string };
}

const BANDS: ResultBand[] = [
  {
    min: 0,
    band: 'Nog niet starten',
    title: 'Begin eerst met basis-organisatie.',
    body:
      'Uw situatie is nog niet rijp voor een AI-agent. Niet erg — investeer eerst in een modern boekhoudpakket, het op papier zetten van een paar basis-beleidsregels, en het vrijmaken van iemand intern die mee kan denken. Daarna is een eerste agent een logische volgende stap.',
    cta: { href: '/kennis/welk-proces-is-geschikt-voor-een-agent', label: 'Lees: welk proces is geschikt' },
  },
  {
    min: 12,
    band: 'Voorzichtig starten',
    title: 'Klaar voor een kleine eerste agent.',
    body:
      'U heeft de basis. Niet alles staat in goud, maar genoeg om met één klein, voorspelbaar proces te beginnen. Denk aan ontvangstbevestigingen, factuur-klaarzetten of voorraadsignalen. Eerst die ervaring opdoen, daarna uitbreiden.',
    cta: { href: '/kennis/eerste-agent-is-nooit-de-belangrijkste', label: 'Lees: uw eerste agent' },
  },
  {
    min: 20,
    band: 'Goed klaar',
    title: 'U bent klaar voor een serieuze eerste agent.',
    body:
      'De voorwaarden zijn er: voldoende werkstroom, modern systeem-landschap, beleid op papier, één persoon intern die meekijkt. Een eerste agent kan binnen één tot twee weken live, en betaalt zich vaak binnen het halve jaar terug. Plan een kennismaking om te bepalen wat als eerste het verschil maakt.',
    cta: { href: '/plan', label: 'Plan een gesprek' },
  },
  {
    min: 26,
    band: 'Uitgesproken klaar',
    title: 'U laat geld liggen door te wachten.',
    body:
      'Uw bedrijf heeft alle ingrediënten en mist alleen nog de uitvoering. De combinatie van werkvolume, systeem-landschap, gemotiveerd team en budget betekent dat een eerste agent zich vrijwel zeker binnen drie tot vijf maanden terugverdient. Wacht u langer, dan loopt u achter op concurrenten die wel beginnen.',
    cta: { href: '/plan', label: 'Plan een gesprek' },
  },
];

function bandFor(score: number): ResultBand {
  return [...BANDS].reverse().find((b) => score >= b.min) ?? BANDS[0];
}

export function Quiz() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const totalScore = useMemo(
    () => Object.values(answers).reduce((s, v) => s + v, 0),
    [answers],
  );
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;
  const result = bandFor(totalScore);

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  if (submitted && allAnswered) {
    const pct = Math.round((totalScore / MAX_SCORE) * 100);
    return (
      <section className="border-t border-[var(--paper-edge)]" style={{ background: 'var(--paper-warm)' }}>
        <div className="mx-auto max-w-[820px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
            Uw uitkomst
          </div>
          <h2 className="mt-2 font-display text-[28px] sm:text-[36px] leading-tight text-[var(--ink)]">
            {result.title}
          </h2>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="border-l-[3px] border-[var(--oker)] pl-4">
              <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.14em]">
                Score
              </div>
              <div className="mt-1 font-display tabular-nums text-[40px] sm:text-[44px] text-[var(--ink)] leading-tight">
                {totalScore}
                <span className="text-[20px] text-[var(--ink-faint)]"> / {MAX_SCORE}</span>
              </div>
            </div>
            <div className="border-l-[3px] border-[var(--oker)] pl-4">
              <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.14em]">
                Percentage
              </div>
              <div className="mt-1 font-display tabular-nums text-[40px] sm:text-[44px] text-[var(--ink)] leading-tight">
                {pct}%
              </div>
            </div>
            <div className="border-l-[3px] border-[var(--oker)] pl-4">
              <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.14em]">
                Conclusie
              </div>
              <div className="mt-1 font-display text-[20px] sm:text-[22px] text-[var(--ink)] leading-tight">
                {result.band}
              </div>
            </div>
          </div>

          <p className="mt-8 text-[15.5px] leading-[1.75] text-[var(--ink)]">{result.body}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={result.cta.href}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
            >
              {result.cta.label}
              <ArrowRight size={16} strokeWidth={1.8} />
            </Link>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper)] transition-colors"
            >
              Quiz opnieuw doen
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-[var(--paper-edge)]" style={{ background: 'var(--paper-warm)' }}>
      <div className="mx-auto max-w-[820px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
        <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
          {Object.keys(answers).length}/{QUESTIONS.length} vragen beantwoord
        </div>
        <div className="mt-3 h-[3px] bg-[var(--paper-edge)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--oker-deep)] transition-[width] duration-500"
            style={{ width: `${(Object.keys(answers).length / QUESTIONS.length) * 100}%` }}
          />
        </div>

        <div className="mt-10 space-y-10">
          {QUESTIONS.map((q, i) => (
            <fieldset key={q.id}>
              <legend className="font-display text-[18px] sm:text-[20px] text-[var(--ink)] leading-snug">
                <span className="font-mono text-[12px] text-[var(--oker-deep)] mr-2">
                  {String(i + 1).padStart(2, '0')}.
                </span>
                {q.text}
              </legend>
              <div className="mt-4 space-y-2">
                {q.options.map((opt, oi) => {
                  const checked = answers[q.id] === opt.score && answers[q.id] !== undefined;
                  return (
                    <label
                      key={oi}
                      className={`flex items-start gap-3 px-4 py-3 rounded-[2px] border cursor-pointer transition-colors ${
                        checked
                          ? 'border-[var(--oker-deep)] bg-[var(--paper)]'
                          : 'border-[var(--paper-edge)] bg-[var(--paper)] hover:border-[var(--oker)]'
                      }`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        checked={checked}
                        onChange={() =>
                          setAnswers((prev) => ({ ...prev, [q.id]: opt.score }))
                        }
                        className="mt-1 accent-[var(--oker-deep)]"
                      />
                      <span className="text-[14.5px] leading-[1.55] text-[var(--ink)]">
                        {opt.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={!allAnswered}
            onClick={() => setSubmitted(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[2px] text-[14px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Toon mijn score
            <ArrowRight size={16} strokeWidth={1.8} />
          </button>
          {!allAnswered && (
            <span className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.14em]">
              Beantwoord alle {QUESTIONS.length} vragen om uw score te zien
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
