'use client';

// Instappunt van de site-agent: de zwevende knop plus de logica die bepaalt
// wanneer de agent zich meldt. Het paneel zelf wordt dynamisch geladen, dus
// zolang de bezoeker niets doet kost dit niets meer dan deze knop.
//
// Wanneer meldt de agent zich: na 20 seconden of bij 50% scrolldiepte, wat
// eerder komt, en eenmalig per sessie. Sluit de bezoeker hem weg, dan blijft
// het bij de knop tot hij er zelf op klikt.
//
// Geen cookies. Het sessie-id staat in sessionStorage en verdwijnt met het
// tabblad; daar is geen toestemming voor nodig.

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { MessageSquare, X } from 'lucide-react';

import { haakjeVoorPad, openingVoorPad } from '@/lib/site-agent/haakjes';
import { playbookVoorPad, verbergZwevendeKnoppen } from '@/lib/site-agent/pad-naar-playbook';

const AgentPaneel = dynamic(() => import('./AgentPaneel'), { ssr: false });

const SLEUTEL_SESSIE = 'factumai.agent.sessie';
const SLEUTEL_WEGGEKLIKT = 'factumai.agent.weggeklikt';
const SLEUTEL_GEMELD = 'factumai.agent.gemeld';

// Twaalf seconden in plaats van twintig. Twintig is voorbij het moment waarop
// iemand besluit of deze pagina hem iets oplevert; dan meld je je bij wie al
// weg is. Onder de tien wordt het opdringerig — dan heeft hij nog niets gelezen
// om op te reageren.
const WACHTTIJD_MS = 12_000;
const SCROLLDIEPTE = 0.35;

/**
 * Hoe vaak de agent zich uit zichzelf meldt per sessie.
 *
 * Twee, en niet één: elke pagina heeft een eigen zin, dus iemand die van de
 * homepage naar zijn branche doorklikt krijgt daar de zin die er wél toe doet.
 * Twee is ook de grens — daarboven is het geen uitnodiging meer maar gezeur.
 *
 * Wegklikken telt zwaarder dan negeren: "Later" of het kruisje zet hem voor de
 * rest van de sessie uit. Iemand die nee zegt, heeft nee gezegd.
 */
const MAX_UITNODIGINGEN = 2;

/**
 * Aan/uit. De agent staat aan; NEXT_PUBLIC_SITE_AGENT_ENABLED=false haalt de
 * widget weg. Die waarde wordt bij de build in de bundel gebakken, dus er moet
 * een nieuwe deploy overheen voordat het effect heeft. Wil je de kosten
 * meteen stoppen, zet dan SITE_AGENT_ENABLED=false: dat weigert het endpoint
 * direct, ook zonder nieuwe build.
 */
const AGENT_AAN = process.env.NEXT_PUBLIC_SITE_AGENT_ENABLED !== 'false';

function leesSessie(): string {
  const bestaand = window.sessionStorage.getItem(SLEUTEL_SESSIE);
  if (bestaand) return bestaand;

  const id =
    typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : // Terugval voor omgevingen zonder randomUUID; blijft een geldige v4-vorm.
        'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          const v = c === 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });

  window.sessionStorage.setItem(SLEUTEL_SESSIE, id);
  return id;
}

export function SiteAgent() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [uitnodiging, setUitnodiging] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const aantalGemeldRef = useRef(0);

  const verbergen = !AGENT_AAN || verbergZwevendeKnoppen(pathname);

  useEffect(() => {
    if (verbergen) return;
    try {
      setSessionId(leesSessie());
      aantalGemeldRef.current = Number(window.sessionStorage.getItem(SLEUTEL_GEMELD) ?? '0') || 0;
    } catch {
      // Private mode of geblokkeerde opslag: de agent werkt dan alleen niet
      // over paginawissels heen. Dat is geen reden om hem te verbergen.
      setSessionId(null);
    }
  }, [verbergen]);

  // Melden na tijd of scrolldiepte. Per pagina opnieuw, tot MAX_UITNODIGINGEN
  // of tot de bezoeker hem wegklikt. `pathname` staat daarom in de deps: bij een
  // paginawissel begint de timer opnieuw, met de zin die bij díé pagina hoort.
  useEffect(() => {
    if (verbergen || open) return;

    let weggeklikt = false;
    try {
      weggeklikt = window.sessionStorage.getItem(SLEUTEL_WEGGEKLIKT) === '1';
    } catch {
      /* opslag niet beschikbaar */
    }
    if (weggeklikt || aantalGemeldRef.current >= MAX_UITNODIGINGEN) return;

    const meld = () => {
      if (aantalGemeldRef.current >= MAX_UITNODIGINGEN) return;
      aantalGemeldRef.current += 1;
      try {
        window.sessionStorage.setItem(SLEUTEL_GEMELD, String(aantalGemeldRef.current));
      } catch {
        /* opslag niet beschikbaar */
      }
      setUitnodiging(true);
    };

    const timer = window.setTimeout(meld, WACHTTIJD_MS);

    const opScroll = () => {
      const hoogte = document.documentElement.scrollHeight - window.innerHeight;
      if (hoogte > 0 && window.scrollY / hoogte >= SCROLLDIEPTE) meld();
    };
    window.addEventListener('scroll', opScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', opScroll);
    };
  }, [verbergen, open, pathname]);

  // Bij een paginawissel de openstaande bubbel weghalen: hij hoort bij de zin
  // van de vorige pagina, en die klopt hier niet meer.
  useEffect(() => {
    setUitnodiging(false);
  }, [pathname]);

  const sluiten = useCallback(() => {
    setOpen(false);
    setUitnodiging(false);
    try {
      window.sessionStorage.setItem(SLEUTEL_WEGGEKLIKT, '1');
    } catch {
      /* opslag niet beschikbaar */
    }

    // Het sluiten van de widget is een van de drie afrondtriggers. Via
    // sendBeacon, zodat de scoring ook draait als de bezoeker meteen wegklikt.
    if (!sessionId) return;
    const payload = JSON.stringify({ sessionId });
    try {
      const verstuurd =
        typeof navigator.sendBeacon === 'function' &&
        navigator.sendBeacon(
          '/api/v1/site-agent/afronden',
          new Blob([payload], { type: 'application/json' }),
        );
      if (!verstuurd) {
        void fetch('/api/v1/site-agent/afronden', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        }).catch(() => {
          /* de cron rondt het later alsnog af */
        });
      }
    } catch {
      /* de cron rondt het later alsnog af */
    }
  }, [sessionId]);

  const wegklikken = useCallback(() => {
    setUitnodiging(false);
    try {
      window.sessionStorage.setItem(SLEUTEL_WEGGEKLIKT, '1');
    } catch {
      /* opslag niet beschikbaar */
    }
  }, []);

  if (verbergen || !sessionId) return null;

  const playbook = playbookVoorPad(pathname);
  const haakje = haakjeVoorPad(pathname);

  if (open) {
    return (
      <AgentPaneel
        sessionId={sessionId}
        paginaPad={pathname}
        playbook={playbook}
        opening={openingVoorPad(pathname)}
        onSluiten={sluiten}
      />
    );
  }

  // Wolkje én knop in één container, rechts uitgelijnd. Ze horen bij elkaar:
  // het wolkje komt uit de knop, niet ergens los uit de hoek. Daarom staat de
  // positionering hier en niet twee keer apart — anders lopen ze uit elkaar
  // zodra de knop van formaat verandert.
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {uitnodiging && (
        <div
          // De hele ballon is klikbaar, niet alleen een tekstlink: dit is het
          // moment waarop iemand reageert, en dan moet je niet op een woord van
          // vijftig pixels hoeven mikken. Het kruisje ligt erbovenop.
          className="agent-wolkje relative w-[min(290px,calc(100vw-3rem))] rounded-[10px] border border-[var(--oker)] bg-[var(--paper-warm)]"
          style={{ boxShadow: 'var(--shadow-lift)' }}
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="block w-full px-4 py-3.5 pr-9 text-left"
          >
            <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--oker-deep)]">
              FactumAI · AI-agent
            </span>
            <span className="mt-1.5 block text-[14.5px] leading-[1.5] text-[var(--ink)]">
              {haakje}
            </span>
            <span className="mt-2 block text-[13px] text-[var(--terra)] underline underline-offset-2">
              Antwoord geven
            </span>
          </button>
          <button
            type="button"
            onClick={wegklikken}
            aria-label="Niet nu"
            className="absolute right-1.5 top-1.5 rounded-full p-1.5 text-[var(--ink-faint)] transition-colors hover:bg-[var(--paper-deep)] hover:text-[var(--ink)]"
          >
            <X size={14} strokeWidth={1.8} />
          </button>

          {/* Het staartje. Twee driehoeken over elkaar: de onderste in de
              randkleur, de bovenste een pixel hoger in de vulkleur, zodat de
              rand doorloopt tot in de punt in plaats van er bovenlangs. */}
          <span
            aria-hidden="true"
            className="absolute right-7 top-full h-0 w-0 border-x-[9px] border-t-[10px] border-x-transparent border-t-[color:var(--oker)]"
          />
          <span
            aria-hidden="true"
            className="absolute right-7 top-full h-0 w-0 -translate-y-px border-x-[9px] border-t-[10px] border-x-transparent border-t-[color:var(--paper-warm)]"
          />
        </div>
      )}

      {/* Chat rechtsonder, de Cal-knop linksonder. Beide verschijnen op
          dezelfde pagina's, zie verbergZwevendeKnoppen.

          Terra in plaats van paper: de oude knop had de kleur van de achtergrond
          en verdween daarin. Dit is dezelfde kleur als de primaire knoppen op de
          site, dus hij valt op zonder een vreemd element te worden. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Stel je vraag aan de AI-agent van FactumAI"
        aria-haspopup="dialog"
        className="agent-knop inline-flex items-center gap-2 rounded-full bg-[var(--terra)] px-5 py-3.5 text-[14.5px] leading-none text-[var(--paper)] transition-colors hover:bg-[var(--oker-deep)]"
        style={{ boxShadow: 'var(--shadow-lift)' }}
      >
        <MessageSquare size={17} strokeWidth={2} />
        Stel je vraag
      </button>
    </div>
  );
}
