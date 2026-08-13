'use client';

// De schakelaar tussen de twee agenda's.
//
// Met NEXT_PUBLIC_BOEKING_PROVIDER=cal blijft alles zoals het was: de
// Cal.com-embed wordt voorgeladen en de knoppen op de site openen die popup.
// Met 'teams' laden we Cal helemaal niet en gaat alles naar de eigen agenda.
//
// Net als CalProvider rendert dit component geen zwevende knop. Die is er
// bewust uit gehaald; de chatknop staat rechtsonder en een tweede knop ernaast
// vecht daarmee om aandacht. De agenda opent via de knoppen die al op de
// pagina's staan, of vanuit het gesprek.
//
// Die boekingsknoppen staan op een pagina of tien en dragen daar
// `data-cal-link`-attributen die Cal's embed.js zelf oppikt. Die pagina's
// blijven ongemoeid: in teams-modus vangen we de klik op zo'n knop hier af,
// vóór hij ergens anders terechtkomt. Dat scheelt een wijziging op tien plekken
// die bij het terugzetten van de vlag weer teruggedraaid moet worden.

import { useCallback, useEffect, useState } from 'react';

import { AgendaDialoog } from './AgendaDialoog';
import { openAgenda, opentAgenda, type AgendaVerzoek } from './agendaStore';
import { BOEKING_PROVIDER } from './config';
import { CalProvider } from './CalProvider';

export function BoekingProvider() {
  if (BOEKING_PROVIDER === 'cal') return <CalProvider />;
  return <TeamsAgendaProvider />;
}

function TeamsAgendaProvider() {
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

  if (!verzoek) return null;

  return (
    <AgendaDialoog bron={verzoek.bron} aanleiding={verzoek.aanleiding} onSluiten={sluiten} />
  );
}
