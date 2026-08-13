'use client';

// De ja/nee-keuze op het terugbelaanbod, en bij "ja" het formulier eronder.
//
// Bewust een formulier en geen chatvraag. Het model bepaalt wánneer dit
// verschijnt, maar de velden en de toestemmingstekst staan vast: zo valideert
// een schema het telefoonnummer, en staat er achteraf één aantoonbare tekst
// tegenover wat is vastgelegd in plaats van een formulering die per gesprek
// verschilt.

import { useState, type FormEvent } from 'react';

import { CONSENT_TEKST } from '@/lib/site-agent/consent';

type Stand = 'vraag' | 'formulier' | 'bezig' | 'klaar' | 'geweigerd';

export interface TerugbelKaartProps {
  sessionId: string;
  aanleiding: string;
  /** Wordt aangeroepen bij "nee", zodat het gesprek gewoon doorloopt. */
  opAfgewezen: () => void;
}

export default function TerugbelKaart({
  sessionId,
  aanleiding,
  opAfgewezen,
}: TerugbelKaartProps) {
  const [stand, setStand] = useState<Stand>('vraag');
  const [fout, setFout] = useState<string | null>(null);

  async function verstuur(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formulier = new FormData(e.currentTarget);
    setFout(null);
    setStand('bezig');

    try {
      const res = await fetch('/api/v1/site-agent/terugbelverzoek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          aanleiding,
          naam: String(formulier.get('naam') ?? ''),
          email: String(formulier.get('email') ?? ''),
          telefoon: String(formulier.get('telefoon') ?? ''),
          akkoord: formulier.get('akkoord') === 'on',
          // Honeypot: mensen zien dit veld niet.
          bedrijfsnaam: String(formulier.get('bedrijfsnaam') ?? ''),
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setFout(data.error ?? 'Er ging iets mis. Probeer het nog een keer.');
        setStand('formulier');
        return;
      }
      setStand('klaar');
    } catch {
      setFout('Geen verbinding. Probeer het nog een keer.');
      setStand('formulier');
    }
  }

  if (stand === 'geweigerd') return null;

  if (stand === 'klaar') {
    return (
      <div
        role="status"
        className="rounded-[3px] border border-[var(--paper-edge)] bg-[var(--paper-warm)] px-3.5 py-3 text-[13.5px] leading-[1.6] text-[var(--ink)]"
      >
        Genoteerd. Sjaak neemt zelf contact met je op.
      </div>
    );
  }

  const veldClass =
    'w-full rounded-[2px] border border-[var(--paper-edge)] bg-[var(--paper)] px-3 py-2 ' +
    'text-[14px] leading-[1.5] text-[var(--ink)] outline-none transition-colors ' +
    'placeholder:text-[var(--ink-faint)] focus:border-[var(--oker)]';

  return (
    <div className="rounded-[3px] border border-[var(--paper-edge)] bg-[var(--paper-warm)] px-3.5 py-3">
      {stand === 'vraag' ? (
        <>
          <p className="text-[14px] leading-[1.6] text-[var(--ink)]">
            Zal ik zorgen dat Sjaak je hierover belt?
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => setStand('formulier')}
              className="rounded-[2px] bg-[var(--terra)] px-4 py-2 text-[14px] leading-none text-[var(--paper)] transition-colors hover:bg-[var(--oker-deep)]"
            >
              Ja, graag
            </button>
            <button
              type="button"
              onClick={() => {
                setStand('geweigerd');
                opAfgewezen();
              }}
              className="rounded-[2px] border border-[var(--paper-edge)] px-4 py-2 text-[14px] leading-none text-[var(--ink-dim)] transition-colors hover:bg-[var(--paper-deep)]"
            >
              Liever niet
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={verstuur} className="space-y-2.5">
          <p className="text-[13.5px] leading-[1.6] text-[var(--ink-dim)]">
            Waar mag Sjaak je bereiken?
          </p>

          <div>
            <label htmlFor="tb-naam" className="sr-only">
              Je naam
            </label>
            <input id="tb-naam" name="naam" required maxLength={120} placeholder="Je naam" className={veldClass} />
          </div>

          <div>
            <label htmlFor="tb-email" className="sr-only">
              Je mailadres
            </label>
            <input
              id="tb-email"
              name="email"
              type="email"
              required
              maxLength={160}
              placeholder="Mailadres"
              className={veldClass}
            />
          </div>

          <div>
            <label htmlFor="tb-telefoon" className="sr-only">
              Je telefoonnummer
            </label>
            <input
              id="tb-telefoon"
              name="telefoon"
              type="tel"
              required
              maxLength={20}
              placeholder="Telefoonnummer"
              className={veldClass}
            />
          </div>

          {/* Honeypot. Buiten beeld en buiten de tabvolgorde, niet display:none:
              een deel van de bots vult verborgen velden juist wél in. */}
          <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="tb-bedrijfsnaam">Bedrijfsnaam</label>
            <input id="tb-bedrijfsnaam" name="bedrijfsnaam" tabIndex={-1} autoComplete="off" />
          </div>

          <label className="flex gap-2 text-[12.5px] leading-[1.5] text-[var(--ink-dim)]">
            <input
              name="akkoord"
              type="checkbox"
              required
              className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[var(--terra)]"
            />
            <span>{CONSENT_TEKST}</span>
          </label>

          {fout && (
            <p role="alert" className="text-[12.5px] leading-[1.5] text-[var(--terra)]">
              {fout}
            </p>
          )}

          <button
            type="submit"
            disabled={stand === 'bezig'}
            className="w-full rounded-[2px] bg-[var(--terra)] px-4 py-2.5 text-[14px] leading-none text-[var(--paper)] transition-colors hover:bg-[var(--oker-deep)] disabled:cursor-not-allowed disabled:opacity-45"
          >
            {stand === 'bezig' ? 'Bezig…' : 'Laat Sjaak me bellen'}
          </button>
        </form>
      )}
    </div>
  );
}
