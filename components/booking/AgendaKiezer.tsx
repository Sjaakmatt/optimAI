'use client';

// De eigen agenda: kies een dag, kies een tijd, laat je gegevens achter.
//
// Twee stappen en niet meer. Wie een kennismaking wil, moet niet eerst een
// formulier door: de tijden staan meteen in beeld, en pas als er een moment
// gekozen is vragen we naar naam en mailadres.
//
// Wordt zowel inline (op /aanvraag) als in het venster (overal elders)
// gebruikt, dus dit component regelt zelf geen randen of achtergrond.

import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, Calendar, Check, Loader2 } from 'lucide-react';

import { trackEvent } from '@/lib/analytics/gtag';

export interface AgendaSlot {
  start: string;
  end: string;
  label: string;
}

export interface AgendaDag {
  datum: string;
  label: string;
  slots: AgendaSlot[];
}

interface SlotsAntwoord {
  ok: boolean;
  error?: string;
  duurMinuten?: number;
  dagen?: AgendaDag[];
}

interface BoekAntwoord {
  ok: boolean;
  error?: string;
  herlaad?: boolean;
  moment?: string;
  bevestiging?: string;
}

type Fase = 'laden' | 'kiezen' | 'gegevens' | 'boeken' | 'klaar' | 'onbereikbaar';

export interface AgendaKiezerProps {
  /** Waar de agenda geopend is; gaat mee in de analytics. */
  bron?: string;
  /** Voorzet voor het veld 'waar gaat het over', bv. uit het chatgesprek. */
  aanleiding?: string;
  onGeboekt?: (moment: string) => void;
}

export function AgendaKiezer({ bron = 'agenda', aanleiding, onGeboekt }: AgendaKiezerProps) {
  const [fase, setFase] = useState<Fase>('laden');
  const [dagen, setDagen] = useState<AgendaDag[]>([]);
  const [duur, setDuur] = useState(20);
  const [actieveDag, setActieveDag] = useState<string | null>(null);
  const [gekozen, setGekozen] = useState<AgendaSlot | null>(null);
  const [fout, setFout] = useState<string | null>(null);
  const [bevestiging, setBevestiging] = useState<string | null>(null);

  const [naam, setNaam] = useState('');
  const [email, setEmail] = useState('');
  const [bedrijf, setBedrijf] = useState('');
  const [toelichting, setToelichting] = useState(aanleiding ?? '');
  const [honeypot, setHoneypot] = useState('');

  const laadSlots = useCallback(async () => {
    setFase('laden');
    setFout(null);
    try {
      const res = await fetch('/api/v1/agenda/slots', { cache: 'no-store' });
      const data = (await res.json()) as SlotsAntwoord;
      if (!res.ok || !data.ok || !data.dagen) {
        setFout(data.error ?? 'De agenda is even niet bereikbaar.');
        setFase('onbereikbaar');
        return;
      }
      setDagen(data.dagen);
      setDuur(data.duurMinuten ?? 20);
      setActieveDag((huidig) =>
        huidig && data.dagen?.some((d) => d.datum === huidig) ? huidig : (data.dagen?.[0]?.datum ?? null),
      );
      setFase('kiezen');
    } catch {
      setFout('De agenda is even niet bereikbaar.');
      setFase('onbereikbaar');
    }
  }, []);

  useEffect(() => {
    void laadSlots();
  }, [laadSlots]);

  const kiesSlot = (slot: AgendaSlot) => {
    setGekozen(slot);
    setFout(null);
    setFase('gegevens');
  };

  const boek = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gekozen) return;
    setFase('boeken');
    setFout(null);

    try {
      const res = await fetch('/api/v1/agenda/boeken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          start: gekozen.start,
          naam,
          email,
          bedrijf: bedrijf || undefined,
          aanleiding: toelichting || undefined,
          website: honeypot,
        }),
      });
      const data = (await res.json()) as BoekAntwoord;

      if (!res.ok || !data.ok) {
        setFout(data.error ?? 'Het lukte niet om de afspraak vast te leggen.');
        // Het slot is vergeven: terug naar het overzicht met verse tijden,
        // anders kiest de bezoeker hetzelfde moment nog een keer.
        if (data.herlaad) {
          setGekozen(null);
          void laadSlots();
        } else {
          setFase('gegevens');
        }
        return;
      }

      trackEvent('book_intro', { source: bron });
      setBevestiging(data.bevestiging ?? 'De afspraak staat in de agenda.');
      setFase('klaar');
      if (data.moment) onGeboekt?.(data.moment);
    } catch {
      setFout('Het lukte niet om de afspraak vast te leggen.');
      setFase('gegevens');
    }
  };

  if (fase === 'laden') {
    return (
      <div className="flex items-center gap-3 py-16 justify-center text-[14px] text-[var(--ink-dim)]">
        <Loader2 size={18} className="animate-spin" aria-hidden />
        Beschikbare momenten ophalen…
      </div>
    );
  }

  if (fase === 'onbereikbaar') {
    return (
      <div className="py-12 text-center">
        <p className="text-[14px] text-[var(--ink-dim)] leading-[1.6] max-w-[380px] mx-auto">
          {fout ?? 'De agenda is even niet bereikbaar.'}
        </p>
        <p className="mt-3 text-[14px] text-[var(--ink-dim)]">
          Mail gerust naar{' '}
          <a
            href="mailto:info@factumai.nl"
            className="underline underline-offset-2 text-[var(--oker-deep)] hover:text-[var(--ink)] transition-colors"
          >
            info@factumai.nl
          </a>
          , dan plannen we het handmatig in.
        </p>
        <button
          type="button"
          onClick={() => void laadSlots()}
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-[2px] text-[14px] border border-[var(--paper-edge)] hover:border-[var(--oker-deep)] transition-colors"
        >
          Opnieuw proberen
        </button>
      </div>
    );
  }

  if (fase === 'klaar') {
    return (
      <div className="py-14 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--oker-deep)]/10">
          <Check size={22} strokeWidth={1.8} className="text-[var(--oker-deep)]" aria-hidden />
        </div>
        <h3 className="mt-5 font-display text-[24px] leading-tight text-[var(--ink)]">
          Staat genoteerd.
        </h3>
        <p className="mt-3 text-[14px] text-[var(--ink-dim)] leading-[1.6] max-w-[400px] mx-auto">
          {bevestiging}
        </p>
      </div>
    );
  }

  if (fase === 'gegevens' || fase === 'boeken') {
    const bezig = fase === 'boeken';
    return (
      <form onSubmit={boek} className="py-2">
        <button
          type="button"
          onClick={() => {
            setGekozen(null);
            setFase('kiezen');
          }}
          className="text-[13px] text-[var(--ink-dim)] underline underline-offset-2 hover:text-[var(--ink)] transition-colors"
        >
          ← Ander moment kiezen
        </button>

        <p className="mt-4 font-display text-[20px] leading-tight text-[var(--ink)]">
          {gekozen?.label} — {dagen.find((d) => d.slots.some((s) => s.start === gekozen?.start))?.label}
        </p>
        <p className="mt-1 text-[13px] text-[var(--ink-faint)]">
          {duur} minuten, via Microsoft Teams.
        </p>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-1.5">
            <span className="text-[13px] text-[var(--ink-dim)]">Naam</span>
            <input
              required
              value={naam}
              onChange={(e) => setNaam(e.target.value)}
              autoComplete="name"
              className="px-3 py-2 rounded-[2px] border border-[var(--paper-edge)] bg-[var(--paper)] text-[15px] focus:border-[var(--oker-deep)] outline-none transition-colors"
            />
          </label>

          <label className="grid gap-1.5">
            <span className="text-[13px] text-[var(--ink-dim)]">E-mailadres</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="px-3 py-2 rounded-[2px] border border-[var(--paper-edge)] bg-[var(--paper)] text-[15px] focus:border-[var(--oker-deep)] outline-none transition-colors"
            />
          </label>

          <label className="grid gap-1.5">
            <span className="text-[13px] text-[var(--ink-dim)]">
              Bedrijf <span className="text-[var(--ink-faint)]">(optioneel)</span>
            </span>
            <input
              value={bedrijf}
              onChange={(e) => setBedrijf(e.target.value)}
              autoComplete="organization"
              className="px-3 py-2 rounded-[2px] border border-[var(--paper-edge)] bg-[var(--paper)] text-[15px] focus:border-[var(--oker-deep)] outline-none transition-colors"
            />
          </label>

          <label className="grid gap-1.5">
            <span className="text-[13px] text-[var(--ink-dim)]">
              Waar gaat het over? <span className="text-[var(--ink-faint)]">(optioneel)</span>
            </span>
            <textarea
              rows={3}
              value={toelichting}
              onChange={(e) => setToelichting(e.target.value)}
              placeholder="Bijvoorbeeld: offertes maken kost ons elke week een dag."
              className="px-3 py-2 rounded-[2px] border border-[var(--paper-edge)] bg-[var(--paper)] text-[15px] leading-[1.5] focus:border-[var(--oker-deep)] outline-none transition-colors resize-none"
            />
          </label>

          {/* Honeypot: staat buiten beeld en buiten de tabvolgorde. */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] w-px h-px opacity-0"
          />
        </div>

        {fout && (
          <p role="alert" className="mt-4 text-[13px] text-[var(--terra)] leading-[1.5]">
            {fout}
          </p>
        )}

        <button
          type="submit"
          disabled={bezig}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--terra)] text-[var(--paper)] hover:bg-[var(--oker-deep)] disabled:opacity-60 transition-colors"
        >
          {bezig ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden />
              Vastleggen…
            </>
          ) : (
            <>
              Afspraak vastleggen
              <ArrowRight size={16} strokeWidth={1.8} aria-hidden />
            </>
          )}
        </button>

        <p className="mt-3 text-[12px] text-[var(--ink-faint)] leading-[1.5]">
          Je krijgt een agenda-uitnodiging met de Teams-link op het adres dat je hier invult.
        </p>
      </form>
    );
  }

  // fase === 'kiezen'
  if (dagen.length === 0) {
    return (
      <div className="py-12 text-center">
        <Calendar size={26} strokeWidth={1.5} className="text-[var(--oker-deep)] mx-auto" aria-hidden />
        <p className="mt-4 text-[14px] text-[var(--ink-dim)] leading-[1.6] max-w-[380px] mx-auto">
          De komende weken staat de agenda vol. Mail even naar{' '}
          <a
            href="mailto:info@factumai.nl"
            className="underline underline-offset-2 text-[var(--oker-deep)] hover:text-[var(--ink)] transition-colors"
          >
            info@factumai.nl
          </a>
          , dan zoeken we samen een moment.
        </p>
      </div>
    );
  }

  const dag = dagen.find((d) => d.datum === actieveDag) ?? dagen[0];

  return (
    <div className="py-2">
      <p className="font-display text-[20px] leading-tight text-[var(--ink)]">
        Wanneer schikt het?
      </p>
      <p className="mt-1 text-[13px] text-[var(--ink-faint)]">
        Kennismaking van {duur} minuten, via Microsoft Teams.
      </p>

      <div
        className="mt-5 flex gap-2 overflow-x-auto pb-1 -mx-1 px-1"
        role="tablist"
        aria-label="Kies een dag"
      >
        {dagen.map((d) => {
          const actief = d.datum === dag.datum;
          return (
            <button
              key={d.datum}
              type="button"
              role="tab"
              aria-selected={actief}
              onClick={() => setActieveDag(d.datum)}
              className={`shrink-0 px-3.5 py-2 rounded-[2px] text-[13px] border transition-colors ${
                actief
                  ? 'border-[var(--oker-deep)] bg-[var(--oker-deep)]/10 text-[var(--ink)]'
                  : 'border-[var(--paper-edge)] text-[var(--ink-dim)] hover:border-[var(--oker-deep)]'
              }`}
            >
              {d.label}
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-3 sm:grid-cols-4 gap-2">
        {dag.slots.map((slot) => (
          <button
            key={slot.start}
            type="button"
            onClick={() => kiesSlot(slot)}
            className="px-2 py-2.5 rounded-[2px] text-[14px] border border-[var(--paper-edge)] text-[var(--ink)] hover:border-[var(--oker-deep)] hover:bg-[var(--oker-deep)]/5 transition-colors"
          >
            {slot.label}
          </button>
        ))}
      </div>

      <p className="mt-5 text-[12px] text-[var(--ink-faint)] leading-[1.5]">
        Tijden in Nederlandse tijd. Staat er niets tussen?{' '}
        <a
          href="mailto:info@factumai.nl"
          className="underline underline-offset-2 hover:text-[var(--ink)] transition-colors"
        >
          Mail even.
        </a>
      </p>
    </div>
  );
}
