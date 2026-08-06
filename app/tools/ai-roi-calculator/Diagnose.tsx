'use client';

import { useMemo, useState } from 'react';

type Antwoord = string;

interface Vraag {
  key: string;
  label: string;
  toelichting: string;
  opties: Array<{ value: Antwoord; label: string }>;
}

const VRAGEN: Vraag[] = [
  {
    key: 'frequentie',
    label: 'Hoe vaak komt dit proces voor?',
    toelichting:
      'Bouwen kost tijd en geld. Dat verdient zich alleen terug bij werk dat blijft terugkomen.',
    opties: [
      { value: 'dagelijks', label: 'Meerdere keren per dag' },
      { value: 'wekelijks', label: 'Wekelijks' },
      { value: 'zelden', label: 'Maandelijks of minder' },
    ],
  },
  {
    key: 'input',
    label: 'Waar komt de informatie vandaan die iemand nodig heeft?',
    toelichting:
      'Dit is het scherpste onderscheid tussen een koppeltool en een agent.',
    opties: [
      { value: 'velden-1', label: 'Vaste velden in één systeem' },
      { value: 'velden-meer', label: 'Vaste velden in meerdere systemen' },
      { value: 'vrije-tekst', label: 'Ook uit mails, bijlagen of notities' },
    ],
  },
  {
    key: 'oordeel',
    label: 'Wat gebeurt er in het hoofd van uw medewerker?',
    toelichting:
      'Een vaste regel hoort in uw pakket. Een afweging is werk voor een agent.',
    opties: [
      { value: 'regel', label: 'Een vaste regel toepassen' },
      { value: 'uitzonderingen', label: 'Een regel, met regelmatig uitzonderingen' },
      { value: 'afweging', label: 'Elke keer een afweging' },
    ],
  },
  {
    key: 'beleid',
    label: 'Liggen uw regels en uitzonderingen ergens vast?',
    toelichting:
      'Zonder vastgelegd beleid kan een agent niets toetsen. Dan is dat de eerste stap.',
    opties: [
      { value: 'vast', label: 'Ja, op papier of in het systeem' },
      { value: 'deels', label: 'Deels' },
      { value: 'hoofden', label: 'Nee, dat zit in hoofden' },
    ],
  },
  {
    key: 'systemen',
    label: 'Hoeveel schermen moet iemand openen om dit af te handelen?',
    toelichting: 'Tussen de pakketten gaat de meeste tijd verloren.',
    opties: [
      { value: 'een', label: 'Eén' },
      { value: 'twee', label: 'Twee' },
      { value: 'drie-plus', label: 'Drie of meer' },
    ],
  },
  {
    key: 'vervolg',
    label: 'Wat moet er ná het besluit nog gebeuren?',
    toelichting:
      'Het antwoord schrijven is zelden het werk. De vervolghandeling meestal wel.',
    opties: [
      { value: 'antwoord', label: 'Alleen antwoorden' },
      { value: 'een-systeem', label: 'Iets vastleggen in één systeem' },
      { value: 'meerdere-systemen', label: 'Handelingen in meerdere systemen' },
    ],
  },
];

interface Uitkomst {
  kop: string;
  oordeel: string;
  vervolgstap: string;
  toon: 'positief' | 'neutraal' | 'afhoudend';
}

function bepaalUitkomst(a: Record<string, Antwoord>): Uitkomst | null {
  if (VRAGEN.some((v) => !a[v.key])) return null;

  if (a.frequentie === 'zelden') {
    return {
      kop: 'Te weinig herhaling',
      oordeel:
        'Dit proces komt te weinig voor om het bouwen terug te verdienen. Een agent verdient zichzelf terug op werk dat blijft terugkomen, niet op werk dat een paar keer per maand langskomt.',
      vervolgstap:
        'Kijk of er een ander proces is dat wél dagelijks speelt. Vaak is dat de mailbox of de opvolging van klanten die stil vallen.',
      toon: 'afhoudend',
    };
  }

  const heeftOordeel = a.oordeel !== 'regel';
  const heeftVrijeTekst = a.input === 'vrije-tekst';
  const heeftNaad = a.systemen === 'drie-plus' || a.vervolg === 'meerdere-systemen';

  if (!heeftOordeel && !heeftVrijeTekst && a.systemen === 'een') {
    return {
      kop: 'Dit hoort in uw eigen pakket',
      oordeel:
        'Vaste regels op vaste velden binnen één systeem: daar heeft u ons niet voor nodig. Uw ERP, uw CRM of een koppeltool doet dit goedkoper, sneller en met minder onderhoud.',
      vervolgstap:
        'Vraag uw pakketleverancier wat er in de standaard al kan. Wij zeggen dit ook gewoon in het eerste gesprek.',
      toon: 'afhoudend',
    };
  }

  if (heeftOordeel && a.beleid === 'hoofden') {
    return {
      kop: 'Kansrijk, maar begin bij uw beleid',
      oordeel:
        'Er wordt geoordeeld, en dat is precies het werk waar een agent voor bedoeld is. Alleen zit uw beleid nog in hoofden. Een agent kan niet toetsen aan wat nergens staat.',
      vervolgstap:
        'De eerste fase is dan het vastleggen van uw regels en uitzonderingen, samen met de mensen die ze nu toepassen. Dat is werk vooraf, geen bijzaak.',
      toon: 'neutraal',
    };
  }

  if (heeftOordeel || heeftVrijeTekst || heeftNaad) {
    return {
      kop: 'Dit is de laag waar wij bouwen',
      oordeel:
        'Er moet iets beoordeeld of gecombineerd worden voordat er gehandeld kan worden, en de informatie ligt verspreid. Uw pakket legt vast wat er gebeurd is, maar neemt dit besluit niet.',
      vervolgstap:
        'Wij bouwen dit als agent die het besluit voorbereidt en de handeling klaarzet. Uw mensen keuren goed, en pas dan gaat er iets weg.',
      toon: 'positief',
    };
  }

  return {
    kop: 'Grensgeval',
    oordeel:
      'Dit kan beide kanten op. Het hangt af van hoe vaak de uitzonderingen echt voorkomen en hoe goed uw systemen te koppelen zijn.',
    vervolgstap:
      'Dat is in een half uur uit te zoeken. Wij kijken mee naar het proces zelf voordat wij iets toezeggen.',
    toon: 'neutraal',
  };
}

export function Diagnose() {
  const [antwoorden, setAntwoorden] = useState<Record<string, Antwoord>>({});
  const uitkomst = useMemo(() => bepaalUitkomst(antwoorden), [antwoorden]);
  const beantwoord = VRAGEN.filter((v) => antwoorden[v.key]).length;

  const accent =
    uitkomst?.toon === 'positief'
      ? 'var(--mos)'
      : uitkomst?.toon === 'afhoudend'
      ? 'var(--steen)'
      : 'var(--oker-deep)';

  return (
    <section className="border-t border-[var(--paper-edge)]" style={{ background: 'var(--paper-warm)' }}>
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10">
          <div>
            <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
              Uw proces
            </div>
            <h2 className="mt-2 font-display text-[24px] sm:text-[28px] leading-tight text-[var(--ink)]">
              Zes vragen over één proces.
            </h2>
            <p className="mt-3 text-[14px] leading-[1.65] text-[var(--ink-dim)] max-w-[460px]">
              Kies één proces dat nu handmatig gaat en beantwoord de vragen daarover. Niet over uw
              bedrijf als geheel, want dan wordt het antwoord vaag.
            </p>

            <div className="mt-8 space-y-7">
              {VRAGEN.map((v, i) => (
                <fieldset key={v.key} className="border-0 p-0 m-0">
                  <legend className="block">
                    <span className="font-mono text-[10px] text-[var(--oker-deep)] uppercase tracking-[0.16em] tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="block mt-1 font-display text-[16px] leading-snug text-[var(--ink)]">
                      {v.label}
                    </span>
                    <span className="block mt-1 text-[13px] leading-[1.55] text-[var(--ink-faint)]">
                      {v.toelichting}
                    </span>
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {v.opties.map((o) => {
                      const gekozen = antwoorden[v.key] === o.value;
                      return (
                        <button
                          key={o.value}
                          type="button"
                          aria-pressed={gekozen}
                          onClick={() =>
                            setAntwoorden((prev) => ({ ...prev, [v.key]: o.value }))
                          }
                          className={`px-3.5 py-2 rounded-[2px] border text-[13.5px] text-left transition-colors ${
                            gekozen
                              ? 'border-[var(--oker-deep)] bg-[var(--paper)] text-[var(--ink)]'
                              : 'border-[var(--paper-edge)] bg-[var(--paper)] text-[var(--ink-dim)] hover:border-[var(--oker)] hover:text-[var(--ink)]'
                          }`}
                        >
                          {o.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>

            {beantwoord > 0 && (
              <button
                type="button"
                onClick={() => setAntwoorden({})}
                className="mt-8 font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.16em] hover:text-[var(--oker-deep)] transition-colors"
              >
                Opnieuw beginnen
              </button>
            )}
          </div>

          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="bg-[var(--paper)] border border-[var(--paper-edge)] rounded-[2px] p-7 sm:p-9">
              <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
                De uitkomst
              </div>

              {!uitkomst && (
                <>
                  <h2 className="mt-2 font-display text-[24px] sm:text-[28px] leading-tight text-[var(--ink)]">
                    Nog even geduld.
                  </h2>
                  <p className="mt-4 text-[14.5px] leading-[1.7] text-[var(--ink-dim)]">
                    Beantwoord alle zes de vragen, dan verschijnt hier het oordeel. U krijgt geen
                    bedrag te zien. Wat een agent oplevert, hangt af van uw proces, uw systemen en
                    uw data, en dat weten wij pas nadat wij ernaar hebben gekeken.
                  </p>
                  <div className="mt-6 font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.16em] tabular-nums">
                    {beantwoord} van {VRAGEN.length} beantwoord
                  </div>
                </>
              )}

              {uitkomst && (
                <>
                  <h2
                    className="mt-2 font-display text-[26px] sm:text-[30px] leading-tight"
                    style={{ color: accent }}
                  >
                    {uitkomst.kop}
                  </h2>
                  <div className="mt-6 border-l-[3px] pl-4" style={{ borderColor: accent }}>
                    <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.14em]">
                      Wat uw antwoorden zeggen
                    </div>
                    <p className="mt-2 text-[14.5px] leading-[1.7] text-[var(--ink)]">
                      {uitkomst.oordeel}
                    </p>
                  </div>
                  <div className="mt-6 border-l-[3px] border-[var(--paper-edge)] pl-4">
                    <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.14em]">
                      Wat de eerste stap is
                    </div>
                    <p className="mt-2 text-[14.5px] leading-[1.7] text-[var(--ink)]">
                      {uitkomst.vervolgstap}
                    </p>
                  </div>
                </>
              )}

              <p className="mt-8 text-[12px] leading-[1.6] text-[var(--ink-faint)] border-t border-[var(--paper-edge)] pt-5">
                Deze diagnose zegt iets over de geschiktheid van een proces, niet over de opbrengst.
                Wij noemen bewust geen bedrag: dat zou een schatting zijn over een proces dat wij
                nog niet gezien hebben.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
