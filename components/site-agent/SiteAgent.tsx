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
import { MessageSquare } from 'lucide-react';

import { playbookVoorPad, verbergZwevendeKnoppen } from '@/lib/site-agent/pad-naar-playbook';

const AgentPaneel = dynamic(() => import('./AgentPaneel'), { ssr: false });

const SLEUTEL_SESSIE = 'factumai.agent.sessie';
const SLEUTEL_WEGGEKLIKT = 'factumai.agent.weggeklikt';
const SLEUTEL_GEMELD = 'factumai.agent.gemeld';

const WACHTTIJD_MS = 20_000;
const SCROLLDIEPTE = 0.5;

/**
 * Openingsberichten per playbook. Dit is weergave-tekst en gaat niet naar het
 * model: de agent reageert straks op wat de bezoeker terugtypt. De teksten
 * volgen de playbookblokken uit docs/site-agent/prompt.md, maar stellen niet
 * dezelfde vraag die het model zelf zou stellen.
 */
const OPENINGEN: Record<string, string> = {
  prijs:
    'Je bent aan het kijken wat zoiets kost. Eerlijk: dat hangt zo aan het proces dat een getal hier je zou misleiden. Waar zou je het op inzetten?',
  branche:
    'Je kijkt naar wat we in deze branche doen. Vertel eens waar bij jullie de meeste tijd in gaat zitten, dan kan ik zeggen of dit erbij past.',
  dienst:
    'Je leest over een van onze diensten. Werkt dat bij jullie nu handmatig, of zit er al iets omheen dat het half doet?',
  blog: 'Als je hier een concrete vraag over hebt, stel hem gerust.',
  cases:
    'Als je wilt weten hoe dit in de praktijk loopt, vraag maar door. Ik verzin geen resultaten, dus wat ik niet weet zeg ik ook.',
  home: 'Waar ben je naar op zoek?',
};

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
  const gemeldRef = useRef(false);

  const verbergen = verbergZwevendeKnoppen(pathname);

  useEffect(() => {
    if (verbergen) return;
    try {
      setSessionId(leesSessie());
      if (window.sessionStorage.getItem(SLEUTEL_GEMELD) === '1') gemeldRef.current = true;
    } catch {
      // Private mode of geblokkeerde opslag: de agent werkt dan alleen niet
      // over paginawissels heen. Dat is geen reden om hem te verbergen.
      setSessionId(null);
    }
  }, [verbergen]);

  // Melden na tijd of scrolldiepte, eenmalig per sessie.
  useEffect(() => {
    if (verbergen || open) return;

    let weggeklikt = false;
    try {
      weggeklikt = window.sessionStorage.getItem(SLEUTEL_WEGGEKLIKT) === '1';
    } catch {
      /* opslag niet beschikbaar */
    }
    if (weggeklikt || gemeldRef.current) return;

    const meld = () => {
      if (gemeldRef.current) return;
      gemeldRef.current = true;
      try {
        window.sessionStorage.setItem(SLEUTEL_GEMELD, '1');
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
  }, [verbergen, open]);

  const sluiten = useCallback(() => {
    setOpen(false);
    setUitnodiging(false);
    try {
      window.sessionStorage.setItem(SLEUTEL_WEGGEKLIKT, '1');
    } catch {
      /* opslag niet beschikbaar */
    }
  }, []);

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

  if (open) {
    return (
      <AgentPaneel
        sessionId={sessionId}
        paginaPad={pathname}
        playbook={playbook}
        opening={OPENINGEN[playbook] ?? OPENINGEN.home}
        onSluiten={sluiten}
      />
    );
  }

  return (
    <>
      {uitnodiging && (
        <div
          className="fixed bottom-[5.5rem] right-6 z-40 max-w-[260px] rounded-[3px] border border-[var(--paper-edge)] bg-[var(--paper-warm)] px-4 py-3"
          style={{ boxShadow: 'var(--shadow-lift)' }}
        >
          <p className="text-[13.5px] leading-[1.55] text-[var(--ink)]">
            {OPENINGEN[playbook] ?? OPENINGEN.home}
          </p>
          <div className="mt-2.5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="text-[13px] text-[var(--oker-deep)] underline underline-offset-2 hover:text-[var(--terra)]"
            >
              Reageren
            </button>
            <button
              type="button"
              onClick={wegklikken}
              className="text-[13px] text-[var(--ink-faint)] hover:text-[var(--ink-dim)]"
            >
              Later
            </button>
          </div>
        </div>
      )}

      {/* Chat rechtsonder, de Cal-knop linksonder. Beide verschijnen op
          dezelfde pagina's, zie verbergZwevendeKnoppen. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Stel je vraag aan de agent van FactumAI"
        aria-haspopup="dialog"
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full border border-[var(--paper-edge)] bg-[var(--paper)] px-4 py-3 text-[14px] leading-none text-[var(--ink)] transition-colors hover:bg-[var(--paper-warm)]"
        style={{ boxShadow: 'var(--shadow-lift)' }}
      >
        <MessageSquare size={16} strokeWidth={1.8} />
        Stel je vraag
      </button>
    </>
  );
}
