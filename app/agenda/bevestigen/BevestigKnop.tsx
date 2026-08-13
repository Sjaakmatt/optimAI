'use client';

// De knop achter de link uit de opt-in mail.
//
// De link zelf boekt niets: hij brengt de bezoeker hier, en pas deze knop zet
// de afspraak in de agenda. Dat is met opzet. Mailfilters en preview-diensten
// halen links op om ze te controleren, en een link die bij het ophalen al boekt
// levert afspraken op die niemand heeft aangeklikt.

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

import { trackEvent } from '@/lib/analytics/gtag';

interface Antwoord {
  ok: boolean;
  soort?: string;
  moment?: string;
  bevestiging?: string;
  error?: string;
}

type Fase = 'klaar-om' | 'bezig' | 'gelukt' | 'mislukt';

export function BevestigKnop({ token }: { token: string }) {
  const [fase, setFase] = useState<Fase>('klaar-om');
  const [melding, setMelding] = useState<string | null>(null);
  const [nieuwMomentNodig, setNieuwMomentNodig] = useState(false);

  if (!token) {
    return (
      <Tekst>
        Deze link is niet compleet. Open hem nog eens vanuit de mail, of{' '}
        <AgendaLink>kies een nieuw moment</AgendaLink>.
      </Tekst>
    );
  }

  const bevestig = async () => {
    setFase('bezig');
    setMelding(null);
    try {
      const res = await fetch('/api/v1/agenda/bevestigen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const data = (await res.json()) as Antwoord;

      if (res.ok && data.ok) {
        if (data.soort === 'geboekt') trackEvent('book_intro', { source: 'opt-in' });
        setMelding(data.bevestiging ?? 'De afspraak staat in de agenda.');
        setFase('gelukt');
        return;
      }

      setMelding(data.error ?? 'Het lukte niet om de afspraak vast te leggen.');
      setNieuwMomentNodig(data.soort === 'verlopen' || data.soort === 'bezet');
      setFase('mislukt');
    } catch {
      setMelding('Het lukte niet om de afspraak vast te leggen.');
      setFase('mislukt');
    }
  };

  if (fase === 'gelukt') {
    return (
      <div className="text-center py-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--oker-deep)]/10">
          <Check size={22} strokeWidth={1.8} className="text-[var(--oker-deep)]" aria-hidden />
        </div>
        <h2 className="mt-5 font-display text-[24px] leading-tight text-[var(--ink)]">
          Staat genoteerd.
        </h2>
        <p className="mt-3 text-[14px] text-[var(--ink-dim)] leading-[1.6] max-w-[420px] mx-auto">
          {melding}
        </p>
      </div>
    );
  }

  if (fase === 'mislukt') {
    return (
      <Tekst>
        {melding}
        {nieuwMomentNodig && (
          <>
            {' '}
            <AgendaLink>Kies een nieuw moment</AgendaLink>.
          </>
        )}
      </Tekst>
    );
  }

  return (
    <div>
      <p className="text-[15px] text-[var(--ink-dim)] leading-[1.7]">
        Zolang je hier niet op klikt, staat er niets in de agenda. Dat is met opzet: zo kan
        niemand op jouw mailadres een afspraak vastleggen.
      </p>
      <button
        type="button"
        onClick={bevestig}
        disabled={fase === 'bezig'}
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--terra)] text-[var(--paper)] hover:bg-[var(--oker-deep)] disabled:opacity-60 transition-colors"
      >
        {fase === 'bezig' ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden />
            Vastleggen…
          </>
        ) : (
          <>
            Ja, zet het vast
            <ArrowRight size={16} strokeWidth={1.8} aria-hidden />
          </>
        )}
      </button>
      <p className="mt-3 text-[12px] text-[var(--ink-faint)] leading-[1.5]">
        Daarna krijg je een agenda-uitnodiging met de Teams-link.
      </p>
    </div>
  );
}

function Tekst({ children }: { children: React.ReactNode }) {
  return (
    <p role="status" className="text-[15px] text-[var(--ink-dim)] leading-[1.7]">
      {children}
    </p>
  );
}

function AgendaLink({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href="/plan"
      className="underline underline-offset-2 text-[var(--oker-deep)] hover:text-[var(--ink)] transition-colors"
    >
      {children}
    </Link>
  );
}
