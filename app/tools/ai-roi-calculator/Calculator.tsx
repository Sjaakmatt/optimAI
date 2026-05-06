'use client';

import { useMemo, useState } from 'react';

const EUR = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
const NUM = new Intl.NumberFormat('nl-NL', { maximumFractionDigits: 0 });

interface Inputs {
  medewerkers: number;
  uurPerWeek: number;
  loonPerUur: number;
  adminPercentage: number;
  automatiseerbaarPercentage: number;
  bouwprijs: number;
}

const DEFAULTS: Inputs = {
  medewerkers: 3,
  uurPerWeek: 40,
  loonPerUur: 32,
  adminPercentage: 30,
  automatiseerbaarPercentage: 60,
  bouwprijs: 12000,
};

export function Calculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);

  const result = useMemo(() => {
    const wekenPerJaar = 46; // 6 weken vakantie/feestdagen aftrek
    const adminUrenPerJaarPerMedewerker =
      inputs.uurPerWeek * (inputs.adminPercentage / 100) * wekenPerJaar;
    const automatiseerbaarUrenJaar =
      adminUrenPerJaarPerMedewerker *
      (inputs.automatiseerbaarPercentage / 100) *
      inputs.medewerkers;
    const besparingPerJaar = automatiseerbaarUrenJaar * inputs.loonPerUur;
    const besparingPerMaand = besparingPerJaar / 12;
    const terugverdientijdMaanden =
      inputs.bouwprijs > 0 && besparingPerMaand > 0
        ? Math.round((inputs.bouwprijs / besparingPerMaand) * 10) / 10
        : 0;

    return {
      automatiseerbaarUrenJaar,
      besparingPerJaar,
      besparingPerMaand,
      terugverdientijdMaanden,
    };
  }, [inputs]);

  const set = (key: keyof Inputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setInputs((prev) => ({ ...prev, [key]: Number.isFinite(v) && v >= 0 ? v : 0 }));
  };

  return (
    <section className="border-t border-[var(--paper-edge)]" style={{ background: 'var(--paper-warm)' }}>
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10">
          <div>
            <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
              Uw situatie
            </div>
            <h2 className="mt-2 font-display text-[24px] sm:text-[28px] leading-tight text-[var(--ink)]">
              Vul uw cijfers in.
            </h2>

            <div className="mt-8 space-y-5">
              <Field label="Aantal medewerkers met administratief werk" suffix="medewerker(s)">
                <input
                  type="number"
                  min={1}
                  max={500}
                  step={1}
                  value={inputs.medewerkers}
                  onChange={set('medewerkers')}
                  className="input-field"
                />
              </Field>

              <Field label="Werkuren per week per medewerker" suffix="uur/week">
                <input
                  type="number"
                  min={1}
                  max={80}
                  step={1}
                  value={inputs.uurPerWeek}
                  onChange={set('uurPerWeek')}
                  className="input-field"
                />
              </Field>

              <Field label="Volledig uurloon (incl. werkgeverslasten, ICT, werkplek)" suffix="€/uur">
                <input
                  type="number"
                  min={10}
                  max={200}
                  step={1}
                  value={inputs.loonPerUur}
                  onChange={set('loonPerUur')}
                  className="input-field"
                />
              </Field>

              <Field
                label={`% van werkdag aan administratie / mailstroom (${inputs.adminPercentage}%)`}
                suffix=""
              >
                <input
                  type="range"
                  min={5}
                  max={80}
                  step={1}
                  value={inputs.adminPercentage}
                  onChange={set('adminPercentage')}
                  className="w-full accent-[var(--oker-deep)]"
                />
              </Field>

              <Field
                label={`% daarvan dat realistisch automatiseerbaar is (${inputs.automatiseerbaarPercentage}%)`}
                suffix=""
              >
                <input
                  type="range"
                  min={10}
                  max={90}
                  step={1}
                  value={inputs.automatiseerbaarPercentage}
                  onChange={set('automatiseerbaarPercentage')}
                  className="w-full accent-[var(--oker-deep)]"
                />
              </Field>

              <Field label="Schatting eenmalige bouwprijs voor agent" suffix="€">
                <input
                  type="number"
                  min={2000}
                  max={150000}
                  step={500}
                  value={inputs.bouwprijs}
                  onChange={set('bouwprijs')}
                  className="input-field"
                />
              </Field>

              <button
                type="button"
                onClick={() => setInputs(DEFAULTS)}
                className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.16em] hover:text-[var(--oker-deep)] transition-colors"
              >
                ↺ Terug naar standaard waardes
              </button>
            </div>
          </div>

          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="bg-[var(--paper)] border border-[var(--paper-edge)] rounded-[2px] p-7 sm:p-9">
              <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
                Geschatte uitkomst
              </div>
              <h2 className="mt-2 font-display text-[24px] sm:text-[28px] leading-tight text-[var(--ink)]">
                Wat dit u oplevert.
              </h2>

              <div className="mt-8 space-y-6">
                <Stat
                  label="Besparing per maand"
                  value={EUR.format(result.besparingPerMaand)}
                  hint="Uitgaande van uw invoer hierboven."
                />
                <Stat
                  label="Besparing per jaar"
                  value={EUR.format(result.besparingPerJaar)}
                  big
                />
                <Stat
                  label="Geautomatiseerde uren per jaar"
                  value={`${NUM.format(Math.round(result.automatiseerbaarUrenJaar))} uur`}
                  hint="Tijd die uw mensen weer aan vakwerk besteden."
                />
                <Stat
                  label="Terugverdientijd"
                  value={
                    result.terugverdientijdMaanden > 0
                      ? `${result.terugverdientijdMaanden.toString().replace('.', ',')} maanden`
                      : '—'
                  }
                  hint={
                    result.terugverdientijdMaanden > 0 && result.terugverdientijdMaanden < 12
                      ? 'Onder een jaar — typische uitkomst voor MKB-implementaties.'
                      : result.terugverdientijdMaanden >= 12
                      ? 'Langer dan een jaar — overweeg een kleiner eerste proces.'
                      : 'Vul boven uw cijfers in om uitkomst te zien.'
                  }
                />
              </div>

              <p className="mt-8 text-[12px] leading-[1.6] text-[var(--ink-faint)] border-t border-[var(--paper-edge)] pt-5">
                Indicatie. Werkelijke besparing hangt af van proces-keuze, integraties en adoptie.
                Wij rekenen niet met productiviteitswinst van vrijgekomen tijd — dat is bovenop de
                besparing.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .input-field {
          width: 100%;
          padding: 10px 12px;
          background: var(--paper);
          border: 1px solid var(--paper-edge);
          border-radius: 2px;
          font-family: inherit;
          font-size: 15px;
          color: var(--ink);
          transition: border-color 120ms ease;
        }
        .input-field:focus {
          outline: none;
          border-color: var(--oker);
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  suffix,
  children,
}: {
  label: string;
  suffix?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <span className="font-mono text-[11px] text-[var(--ink-dim)] uppercase tracking-[0.14em]">
          {label}
        </span>
        {suffix && (
          <span className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.14em]">
            {suffix}
          </span>
        )}
      </div>
      {children}
    </label>
  );
}

function Stat({ label, value, hint, big }: { label: string; value: string; hint?: string; big?: boolean }) {
  return (
    <div className="border-l-[3px] border-[var(--oker)] pl-4">
      <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.14em]">
        {label}
      </div>
      <div
        className={`mt-1 font-display tabular-nums text-[var(--ink)] leading-tight ${
          big ? 'text-[40px] sm:text-[48px]' : 'text-[26px] sm:text-[30px]'
        }`}
      >
        {value}
      </div>
      {hint && <p className="mt-1 text-[12.5px] leading-[1.55] text-[var(--ink-dim)]">{hint}</p>}
    </div>
  );
}
