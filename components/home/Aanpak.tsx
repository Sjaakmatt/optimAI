"use client";

// De aanpak in vijf stappen. Het apparaat hier: een lijn die zich tekent
// terwijl de bezoeker langs de stappen scrolt, en per stap een nummer dat
// oplicht zodra de lijn erlangs is. Geen kaarten, tekst op ruimte.

import { useRef } from "react";
import { motion, useReducedMotion, useTransform } from "motion/react";
import { Opkomend, Verschijn } from "./Opkomend";
import { useZichtProgress } from "./useZichtProgress";

const STAPPEN = [
  [
    "Kennismaken",
    "Eén gesprek bij u of online. We luisteren naar het verhaal achter jullie organisatie en de mogelijke behoefte.",
  ],
  [
    "Ontwerpen",
    "Tijdens het gesprek kiezen we samen de richting. Is er al duidelijk een proces waar we aan kunnen werken of moet dit eerst in kaart worden gebracht met een AI-audit?",
  ],
  [
    "Bouwen",
    "In fasen. Eén gekaderd proces tegelijk. Elke fase eindigt in iets werkends dat u ziet en goedkeurt. Pas daarna kijken we naar de volgende stap.",
  ],
  [
    "Implementeren",
    "We implementeren het systeem binnen de organisatie en trainen de mensen waar nodig.",
  ],
  [
    "Bijhouden",
    "We monitoren, onderhouden en sturen bij. Daarnaast is er indien gewenst een uur per maand de tijd om te sparren over uitbreiding en doorontwikkeling.",
  ],
];

export function Aanpak() {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion() ?? false;
  const p = useZichtProgress(ref, !reduced);
  // De lijn tekent zich terwijl de lijst door het midden van het venster gaat.
  const lijn = useTransform(p, [0.2, 0.75], [0, 1]);

  return (
    <section className="band pt-24 sm:pt-32">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="max-w-[720px]">
          <Verschijn inView>
            <div className="eyebrow mb-3">Onze aanpak</div>
          </Verschijn>
          <Opkomend
            as="h2"
            inView
            className="font-display text-[30px] leading-[1.06] tracking-[-0.03em] text-[var(--fg)] sm:text-[40px] lg:text-[48px]"
            regels={[
              "Van eerste gesprek",
              <em key="accent">Naar meer tijd voor het menselijke.</em>,
            ]}
          />
          <Verschijn inView vertraging={0.2}>
            <p className="mt-5 text-[15.5px] leading-[1.65] text-[var(--fg-dim)] sm:text-[17px]">
              Het eerste gesprek is altijd vrijblijvend. Past AI bij uw werk?
              Eventueel doen we een AI-audit om te onderzoeken waar we AI kunnen
              inzetten en wat het oplevert. Daarna bouwen we: één gekaderd
              proces, vaste prijs per fase, en elke fase eindigt in iets dat
              werkt. Geen pilot van zes maanden zonder resultaat.
            </p>
          </Verschijn>
        </div>
        <ol ref={ref} className="relative lg:pt-2">
          <span
            className="absolute left-[25px] top-2 bottom-2 w-px bg-[var(--border)] sm:left-[35px]"
            aria-hidden
          />
          <motion.span
            data-vlak="aanpak-lijn"
            className="absolute left-[25px] top-2 bottom-2 w-px origin-top bg-[var(--accent)] sm:left-[35px]"
            style={{ scaleY: reduced ? 1 : lijn }}
            aria-hidden
          />
          {STAPPEN.map(([titel, body], i) => (
            <Stap
              key={titel}
              index={i}
              titel={titel}
              body={body}
              p={p}
              reduced={reduced}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Stap({
  index,
  titel,
  body,
  p,
  reduced,
}: {
  index: number;
  titel: string;
  body: string;
  p: ReturnType<typeof useZichtProgress>;
  reduced: boolean;
}) {
  const drempel = 0.2 + ((index + 0.5) / STAPPEN.length) * 0.55;
  const aan = useTransform(p, [drempel - 0.03, drempel], [0, 1]);
  const kleur = useTransform(
    aan,
    [0, 1],
    ["rgba(244,241,236,0.45)", "rgba(233,180,106,1)"],
  );
  const rand = useTransform(
    aan,
    [0, 1],
    ["rgba(255,255,255,0.14)", "rgba(233,180,106,0.9)"],
  );
  return (
    <Verschijn inView vertraging={0.06 * index}>
      <li className="relative grid grid-cols-[52px_minmax(0,1fr)] gap-x-4 py-5 sm:grid-cols-[72px_minmax(0,1fr)] sm:py-6">
        <motion.span
          className="relative z-10 grid h-7 w-7 place-items-center rounded-full border bg-[var(--bg)] font-mono text-[11px] tabular-nums sm:ml-[9px]"
          style={
            reduced
              ? {
                  color: "rgba(233,180,106,1)",
                  borderColor: "rgba(233,180,106,0.9)",
                }
              : { color: kleur, borderColor: rand }
          }
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
        <div className="grid gap-x-8 gap-y-1 sm:grid-cols-[160px_minmax(0,1fr)]">
          <div className="text-[17px] text-[var(--fg)]">{titel}</div>
          <p className="text-[14.5px] leading-[1.6] text-[var(--fg-dim)]">
            {body}
          </p>
        </div>
      </li>
    </Verschijn>
  );
}
