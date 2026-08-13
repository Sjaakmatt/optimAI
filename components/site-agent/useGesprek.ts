'use client';

// Gesprekstoestand en de SSE-stroom naar /api/v1/site-agent/chat.
//
// De client houdt geen geschiedenis bij voor het model: hij stuurt alleen het
// nieuwe bericht en de server haalt de rest uit de database. Wat hier in state
// staat is puur voor de weergave.

import { useCallback, useRef, useState } from 'react';

export interface Bericht {
  id: string;
  rol: 'bezoeker' | 'agent';
  tekst: string;
}

export type GespreksStatus = 'rust' | 'bezig' | 'fout';

/** Het gesprek is afgerond; de widget toont een afsluiting in plaats van invoer. */
export type Afsluiting = 'afspraak' | null;

interface FoutBody {
  error?: string;
  actie?: string;
}

interface ServerEvent {
  type: 'delta' | 'herstart' | 'signaal' | 'klaar' | 'fout';
  tekst?: string;
  melding?: string;
  naam?: string;
  payload?: Record<string, unknown>;
}

/** Actie die de agent aan de widget vraagt, bijvoorbeeld de agenda openen. */
export interface Signaal {
  naam: string;
  payload: Record<string, unknown>;
}

const ALGEMENE_FOUT =
  'Er ging iets mis aan onze kant. Probeer het zo nog eens, of mail ons op info@factumai.nl.';

function nieuwBerichtId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useGesprek(opties: {
  sessionId: string;
  paginaPad: string;
  playbook: string;
  onSignaal?: (signaal: Signaal) => void;
}) {
  const signaalRef = useRef(opties.onSignaal);
  signaalRef.current = opties.onSignaal;

  const [berichten, setBerichten] = useState<Bericht[]>([]);
  const [status, setStatus] = useState<GespreksStatus>('rust');
  const [fout, setFout] = useState<string | null>(null);
  const [afsluiting, setAfsluiting] = useState<Afsluiting>(null);
  const bezigRef = useRef(false);

  const voegOpeningToe = useCallback((tekst: string) => {
    setBerichten((huidig) =>
      huidig.length > 0 ? huidig : [{ id: nieuwBerichtId(), rol: 'agent', tekst }],
    );
  }, []);

  const stuur = useCallback(
    async (tekst: string) => {
      const schoon = tekst.trim();
      if (!schoon || bezigRef.current) return;

      bezigRef.current = true;
      setFout(null);
      setStatus('bezig');

      const agentId = nieuwBerichtId();
      setBerichten((huidig) => [
        ...huidig,
        { id: nieuwBerichtId(), rol: 'bezoeker', tekst: schoon },
      ]);

      try {
        const res = await fetch('/api/v1/site-agent/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: opties.sessionId,
            paginaPad: opties.paginaPad,
            bericht: schoon,
            playbook: opties.playbook,
            bedrijfsnaam: '', // honeypot, blijft leeg voor echte bezoekers
          }),
        });

        if (!res.ok || !res.body) {
          const body = (await res.json().catch(() => ({}))) as FoutBody;
          const melding = body.error ?? ALGEMENE_FOUT;

          // Het gesprek is niet stuk, het is klaar. Dan hoort er geen
          // foutmelding te staan maar een laatste bericht van de agent met een
          // knop naar de agenda.
          if (body.actie === 'afspraak') {
            setBerichten((huidig) => [
              ...huidig,
              { id: nieuwBerichtId(), rol: 'agent', tekst: melding },
            ]);
            setAfsluiting('afspraak');
            setStatus('rust');
            return;
          }

          setFout(melding);
          setStatus('fout');
          return;
        }

        // Het lege agent-bericht verschijnt pas als de eerste zin binnen is,
        // zodat er geen leeg blokje staat te wachten.
        let begonnen = false;
        const lezer = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        const verwerk = (regel: string) => {
          if (!regel.startsWith('data:')) return;
          let event: ServerEvent;
          try {
            event = JSON.parse(regel.slice(5).trim()) as ServerEvent;
          } catch {
            return;
          }

          if (event.type === 'delta' && event.tekst) {
            const stuk = event.tekst;
            if (!begonnen) {
              begonnen = true;
              setBerichten((huidig) => [...huidig, { id: agentId, rol: 'agent', tekst: stuk }]);
            } else {
              setBerichten((huidig) =>
                huidig.map((b) => (b.id === agentId ? { ...b, tekst: b.tekst + stuk } : b)),
              );
            }
            return;
          }

          // De outputcontrole heeft ingegrepen: wat er stond klopt niet en de
          // agent probeert het opnieuw. Weghalen, niet laten staan.
          if (event.type === 'herstart') {
            begonnen = false;
            setBerichten((huidig) => huidig.filter((b) => b.id !== agentId));
            return;
          }

          if (event.type === 'signaal' && event.naam) {
            signaalRef.current?.({ naam: event.naam, payload: event.payload ?? {} });
            return;
          }

          if (event.type === 'fout') {
            setFout(event.melding ?? ALGEMENE_FOUT);
            setStatus('fout');
          }
        };

        for (;;) {
          const { done, value } = await lezer.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const regels = buffer.split('\n\n');
          buffer = regels.pop() ?? '';
          for (const regel of regels) verwerk(regel.trim());
        }
        if (buffer.trim()) verwerk(buffer.trim());

        setStatus((s) => (s === 'fout' ? s : 'rust'));
      } catch {
        setFout(ALGEMENE_FOUT);
        setStatus('fout');
      } finally {
        bezigRef.current = false;
      }
    },
    [opties.sessionId, opties.paginaPad, opties.playbook],
  );

  return { berichten, status, fout, afsluiting, stuur, voegOpeningToe };
}
