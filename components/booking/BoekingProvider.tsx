'use client';

// De schakelaar tussen de twee agenda's.
//
// Met NEXT_PUBLIC_BOEKING_PROVIDER=cal blijft alles zoals het was: de
// Cal.com-embed en de zwevende knop daaruit. Met 'teams' laden we Cal helemaal
// niet en gaat alles naar de eigen agenda.
//
// De boekingsknoppen staan op een pagina of tien en dragen daar
// `data-cal-link`-attributen die Cal's embed.js zelf oppikt. Die pagina's
// blijven ongemoeid: in teams-modus vangen we de klik op zo'n knop hier af,
// vóór hij ergens anders terechtkomt. Dat scheelt een wijziging op tien
// plekken die bij het terugzetten van de vlag weer teruggedraaid moet worden.

import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { verbergZwevendeKnoppen } from '@/lib/site-agent/pad-naar-playbook';
import { AgendaDialoog } from './AgendaDialoog';
import { openAgenda, opentAgenda, type AgendaVerzoek } from './agendaStore';
import { BOEKING_PROVIDER } from './config';
import { CalProvider } from './CalProvider';

export function BoekingProvider() {
  if (BOEKING_PROVIDER === 'cal') return <CalProvider />;
  return <TeamsAgendaProvider />;
}

function TeamsAgendaProvider() {
  const pathname = usePathname();
  const hideFloating = verbergZwevendeKnoppen(pathname);
  const [verzoek, setVerzoek] = useState<AgendaVerzoek | null>(null);

  const sluiten = useCallback(() => setVerzoek(null), []);

  useEffect(() => opentAgenda(setVerzoek), []);

  // Elke bestaande boekingsknop op de site opent nu dit venster.
  useEffect(() => {
    const opKlik = (e: MouseEvent) => {
      const doel = e.target as HTMLElement | null;
      const knop = doel?.closest?.('[data-cal-link]');
      if (!knop) return;
      e.preventDefault();
      e.stopPropagation();
      openAgenda({ bron: 'knop' });
    };
    // Capture-fase: eerder dan welke handler op de knop zelf ook.
    document.addEventListener('click', opKlik, true);
    return () => document.removeEventListener('click', opKlik, true);
  }, []);

  return (
    <>
      {!hideFloating && (
        <button
          type="button"
          onClick={() => openAgenda({ bron: 'floating' })}
          className="fixed bottom-6 left-6 z-40 inline-flex items-center justify-center px-5 py-3 rounded-full bg-[var(--terra)] text-[var(--paper)] text-[14px] leading-none hover:bg-[var(--oker-deep)] transition-colors"
          style={{ boxShadow: 'var(--shadow-lift)' }}
        >
          Plan gesprek
        </button>
      )}
      {verzoek && (
        <AgendaDialoog bron={verzoek.bron} aanleiding={verzoek.aanleiding} onSluiten={sluiten} />
      )}
    </>
  );
}
