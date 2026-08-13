'use client';

// Instappunt van de site-agent: de zwevende knop plus de logica die bepaalt
// wanneer de agent zich meldt. Het paneel zelf wordt dynamisch geladen, dus
// zolang de bezoeker niets doet kost dit niets meer dan deze knop.
//
// Wanneer meldt de agent zich: na 6 seconden of bij 35% scrolldiepte, wat
// eerder komt, en één keer per pagina — want elke pagina heeft een eigen zin.
//
// Twee dingen zetten hem voor de rest van de sessie uit: het kruisje (of
// "Liever niet"), en het gevoerd hebben van een gesprek. Alleen het paneel
// openen en weer sluiten telt niet, want dan heeft de bezoeker niets gezegd.
//
// Dit is sinds de Cal-knop eruit is de enige zwevende knop op de pagina.
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

/**
 * Versie van de sessievlaggen. Ophogen zodra de betekenis van een vlag
 * verandert.
 *
 * Waarom dit nodig is: `weggeklikt` betekende tot voor kort óók "heeft het
 * paneel gesloten". Een tabblad dat die vlag al had staan, houdt het wolkje uit
 * — ook na een deploy die dat gedrag juist verandert, want sessionStorage
 * overleeft een refresh. De oude vlag draagt dan een betekenis die de nieuwe
 * code niet meer bedoelt.
 *
 * Met een versie in de sleutel tellen oude vlaggen simpelweg niet meer mee.
 * Goedkoper en betrouwbaarder dan opruimcode die je later weer moet weghalen.
 */
const OPSLAG_VERSIE = 'v2';

const SLEUTEL_SESSIE = `factumai.agent.${OPSLAG_VERSIE}.sessie`;
const SLEUTEL_WEGGEKLIKT = `factumai.agent.${OPSLAG_VERSIE}.weggeklikt`;
const SLEUTEL_GEMELD = `factumai.agent.${OPSLAG_VERSIE}.gemeld`;

// Zes seconden. Bewuste keuze voor conversie: het moment waarop iemand besluit
// of deze pagina hem iets oplevert ligt vroeg, en na dat moment meld je je bij
// wie al half weg is.
//
// De keerzijde is dat de bezoeker dan pas een alinea of twee gelezen heeft, dus
// het haakje moet het werk doen zonder dat hij de pagina kent. Daar zijn de
// zinnen per pagina op geschreven (lib/site-agent/haakjes.ts): ze benoemen een
// concrete handeling in plaats van te verwijzen naar wat er op het scherm staat.
//
// Loopt het aandeel wegklikkers op, dan is dit de eerste knop om aan te draaien.
const WACHTTIJD_MS = 6_000;
const SCROLLDIEPTE = 0.35;

/**
 * Bovengrens op het aantal keer dat de agent zich uit zichzelf meldt per sessie.
 *
 * Het wolkje komt één keer per pagina: elke pagina heeft een eigen zin, dus wie
 * doorklikt naar zijn branche krijgt daar de zin die er wél toe doet. Dit getal
 * is niet de normale rem maar een vangnet voor een sessie van tientallen
 * pagina's.
 *
 * De echte uitknop is het kruisje. Wie wegklikt of "Liever niet" kiest, ziet
 * hem de rest van de sessie niet meer — iemand die nee zegt, heeft nee gezegd.
 * Hetzelfde geldt zodra de bezoeker daadwerkelijk met de agent heeft gepraat:
 * die kent hem dan en heeft aan de knop genoeg.
 */
const MAX_UITNODIGINGEN = 6;

/**
 * Testschakelaar: `?agent=nu` toont het wolkje meteen en negeert de
 * sessievlaggen.
 *
 * Die vlaggen zijn hardnekkig met opzet — wie het wolkje wegklikt of de chat
 * sluit, krijgt het de rest van het tabblad niet meer te zien — maar daardoor
 * is het bijna niet te testen. Eén keer de chat openen en sluiten is genoeg om
 * het voor dat tabblad uit te zetten, en een refresh helpt niet omdat
 * sessionStorage die overleeft.
 *
 * Alleen de URL van deze paginaweergave telt; er wordt niets opgeslagen, dus
 * een gewone bezoeker merkt hier niets van.
 */
const TEST_PARAMETER = 'agent';
const TEST_WAARDE = 'nu';

function testModusAan(): boolean {
  try {
    return new URLSearchParams(window.location.search).get(TEST_PARAMETER) === TEST_WAARDE;
  } catch {
    return false;
  }
}

/**
 * Aan/uit. De agent staat aan; NEXT_PUBLIC_SITE_AGENT_ENABLED=false haalt de
 * widget weg. Die waarde wordt bij de build in de bundel gebakken, dus er moet
 * een nieuwe deploy overheen voordat het effect heeft. Wil je de kosten
 * meteen stoppen, zet dan SITE_AGENT_ENABLED=false: dat weigert het endpoint
 * direct, ook zonder nieuwe build.
 */
const AGENT_AAN = process.env.NEXT_PUBLIC_SITE_AGENT_ENABLED !== 'false';

function nieuwSessieId(): string {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  // Terugval voor omgevingen zonder randomUUID; blijft een geldige v4-vorm.
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Sessie-id, bij voorkeur uit sessionStorage zodat het gesprek een paginawissel
 * overleeft.
 *
 * Lukt opslaan niet — private mode, geblokkeerde opslag — dan geven we alsnog
 * een id terug, alleen niet bewaard. Eerder leverde dit pad `null`, en omdat de
 * component op een lege sessie helemaal niets rendert verdween daarmee de hele
 * widget. Dat was nooit de bedoeling: het commentaar zei het al, de code deed
 * het andersom.
 */
function leesSessie(): string {
  try {
    const bestaand = window.sessionStorage.getItem(SLEUTEL_SESSIE);
    if (bestaand) return bestaand;
    const id = nieuwSessieId();
    window.sessionStorage.setItem(SLEUTEL_SESSIE, id);
    return id;
  } catch {
    return nieuwSessieId();
  }
}

export function SiteAgent() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [uitnodiging, setUitnodiging] = useState(false);
  /** Is het paneel geopend vanuit het wolkje, of koud via de knop? */
  const [viaWolkje, setViaWolkje] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const aantalGemeldRef = useRef(0);
  /** Pad waarop het wolkje het laatst is getoond; houdt het op één per pagina. */
  const laatstGemeldPadRef = useRef<string | null>(null);

  const verbergen = !AGENT_AAN || verbergZwevendeKnoppen(pathname);

  useEffect(() => {
    if (verbergen) return;
    // leesSessie() vangt zijn eigen opslagfouten af en geeft altijd een id.
    setSessionId(leesSessie());
    try {
      aantalGemeldRef.current = Number(window.sessionStorage.getItem(SLEUTEL_GEMELD) ?? '0') || 0;
    } catch {
      // Geen opslag: dan meldt hij zich deze paginaweergave gewoon opnieuw.
    }
  }, [verbergen]);

  // Melden na tijd of scrolldiepte. Per pagina opnieuw, tot MAX_UITNODIGINGEN
  // of tot de bezoeker hem wegklikt. `pathname` staat daarom in de deps: bij een
  // paginawissel begint de timer opnieuw, met de zin die bij díé pagina hoort.
  useEffect(() => {
    if (verbergen || open) return;

    // Testmodus: meteen tonen, sessievlaggen overslaan.
    if (testModusAan()) {
      setUitnodiging(true);
      return;
    }

    // Eén wolkje per pagina. Zonder dit zou het sluiten van het paneel op
    // dezelfde pagina een nieuwe timer starten en zes seconden later opnieuw
    // een wolkje opleveren — dat is geen zetje meer maar aandringen.
    if (laatstGemeldPadRef.current === pathname) return;

    let weggeklikt = false;
    try {
      weggeklikt = window.sessionStorage.getItem(SLEUTEL_WEGGEKLIKT) === '1';
    } catch {
      /* opslag niet beschikbaar */
    }
    if (weggeklikt || aantalGemeldRef.current >= MAX_UITNODIGINGEN) return;

    const meld = () => {
      if (aantalGemeldRef.current >= MAX_UITNODIGINGEN) return;
      if (laatstGemeldPadRef.current === pathname) return;
      laatstGemeldPadRef.current = pathname;
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
  //
  // Niet bij de eerste render. Dit effect draait ná het effect hierboven, dus
  // zonder deze uitzondering zet het een wolkje dat daar net is aangezet meteen
  // weer uit — precies wat er in testmodus zou gebeuren.
  const eersteRenderRef = useRef(true);
  useEffect(() => {
    if (eersteRenderRef.current) {
      eersteRenderRef.current = false;
      return;
    }
    setUitnodiging(false);
  }, [pathname]);

  const sluiten = useCallback((heeftGesproken: boolean) => {
    setOpen(false);
    setUitnodiging(false);

    // Alleen een échte stop als de bezoeker het gesprek ook gevoerd heeft. Wie
    // het paneel opent, de openingszin leest en meteen wegklikt, heeft niets
    // gezegd — die mag op een volgende pagina nog een zetje krijgen. Eerder
    // zette elk sluiten de rem erop, en dan verdween juist de bezoeker die je
    // wilt terugpakken uit beeld.
    if (heeftGesproken) {
      try {
        window.sessionStorage.setItem(SLEUTEL_WEGGEKLIKT, '1');
      } catch {
        /* opslag niet beschikbaar */
      }
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
        // Kwam de bezoeker binnen via het wolkje, dan begint het gesprek met de
        // vraag waar hij zojuist op klikte. Anders stond er in de bubbel een
        // vraag en in de chat een andere, en was de klik op "Antwoord geven"
        // nergens op uitgelopen: je zou opnieuw moeten bedenken waar je begint.
        opening={viaWolkje ? haakje : openingVoorPad(pathname)}
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
            onClick={() => {
              setViaWolkje(true);
              setOpen(true);
            }}
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

      {/* De enige zwevende knop op de pagina; de Cal-knop linksonder is eruit.
          Formaat en typografie gelijk aan wat die knop had (px-5 py-3, 14px),
          zodat dit dezelfde maat houdt als de rest van de site gewend was.

          Terra in plaats van paper: de oude chatknop had de kleur van de
          achtergrond en verdween daarin. */}
      <button
        type="button"
        onClick={() => {
          setViaWolkje(false);
          setOpen(true);
        }}
        aria-label="Stel je vraag aan de AI-agent van FactumAI"
        aria-haspopup="dialog"
        className="agent-knop inline-flex items-center justify-center gap-2 rounded-full bg-[var(--terra)] px-5 py-3 text-[14px] leading-none text-[var(--paper)] transition-colors hover:bg-[var(--oker-deep)]"
        style={{ boxShadow: 'var(--shadow-lift)' }}
      >
        <MessageSquare size={16} strokeWidth={2} />
        Stel je vraag
      </button>
    </div>
  );
}
