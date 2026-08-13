'use client';

// Het chatpaneel zelf. Wordt pas geladen als de bezoeker de agent opent of het
// openingsbericht verschijnt, zodat de paginaload er niets van merkt.
//
// Toegankelijkheid: focus gaat bij openen naar het invoerveld, Tab blijft
// binnen het paneel, Escape sluit, en nieuwe berichten worden aangekondigd via
// aria-live. Op mobiel is het een schermvullend blad in plaats van een klein
// bolletje.

import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { X, ArrowUp } from 'lucide-react';

import { getCalApi } from '@/components/booking/calLoader';
import { CAL_LINK } from '@/components/booking/config';
import TerugbelKaart from './TerugbelKaart';
import { useGesprek, type Signaal } from './useGesprek';

const FOCUSBAAR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface AgentPaneelProps {
  sessionId: string;
  paginaPad: string;
  playbook: string;
  opening: string;
  /**
   * `heeftGesproken` is true zodra de bezoeker zelf iets heeft gestuurd.
   *
   * Dat onderscheid bepaalt of het wolkje later terugkomt: wie het paneel
   * opent, de openingszin leest en meteen wegklikt, heeft niets gezegd en mag
   * op een volgende pagina nog een zetje krijgen. Wie wél heeft gepraat kent de
   * agent inmiddels; die heeft aan de knop genoeg.
   */
  onSluiten: (heeftGesproken: boolean) => void;
}

export default function AgentPaneel({
  sessionId,
  paginaPad,
  playbook,
  opening,
  onSluiten,
}: AgentPaneelProps) {
  // Het terugbelaanbod: de agent geeft het signaal, de widget vraagt de
  // gegevens. Null betekent "niet aangeboden in dit gesprek".
  const [terugbelAanleiding, setTerugbelAanleiding] = useState<string | null>(null);

  // De agent kan om de agenda vragen. Die komt uit de bestaande Cal-embed van
  // de site; we bouwen er geen eigen agenda naast.
  const opSignaal = useCallback((signaal: Signaal) => {
    if (signaal.naam === 'terugbellen') {
      const aanleiding =
        typeof signaal.payload.aanleiding === 'string' ? signaal.payload.aanleiding : '';
      setTerugbelAanleiding(aanleiding);
      return;
    }
    if (signaal.naam !== 'agenda') return;
    const link = typeof signaal.payload.calLink === 'string' ? signaal.payload.calLink : CAL_LINK;
    getCalApi()
      .then((ns) => ns('modal', { calLink: link, config: { layout: 'month_view', theme: 'light' } }))
      .catch((err) => console.warn('[site-agent] agenda openen faalde:', err));
  }, []);

  const { berichten, status, fout, afsluiting, stuur, voegOpeningToe } = useGesprek({
    sessionId,
    paginaPad,
    playbook,
    onSignaal: opSignaal,
  });

  const paneelRef = useRef<HTMLDivElement>(null);
  const invoerRef = useRef<HTMLTextAreaElement>(null);
  const onderkantRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    voegOpeningToe(opening);
    invoerRef.current?.focus();
  }, [opening, voegOpeningToe]);

  // Meescrollen met nieuwe tekst, maar zonder de hele pagina te verspringen.
  useEffect(() => {
    onderkantRef.current?.scrollIntoView({ block: 'end' });
  }, [berichten]);

  // Heeft de bezoeker zelf iets gestuurd? Via een ref, zodat de Escape-handler
  // niet bij elk nieuw bericht opnieuw hoeft te binden.
  const heeftGesprokenRef = useRef(false);
  heeftGesprokenRef.current = berichten.some((b) => b.rol === 'bezoeker');

  const sluitPaneel = useCallback(() => {
    onSluiten(heeftGesprokenRef.current);
  }, [onSluiten]);

  useEffect(() => {
    const opEscape = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') sluitPaneel();
    };
    document.addEventListener('keydown', opEscape);
    return () => document.removeEventListener('keydown', opEscape);
  }, [sluitPaneel]);

  const opTab = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !paneelRef.current) return;
    const elementen = Array.from(paneelRef.current.querySelectorAll<HTMLElement>(FOCUSBAAR)).filter(
      (el) => el.offsetParent !== null,
    );
    if (elementen.length === 0) return;

    const eerste = elementen[0];
    const laatste = elementen[elementen.length - 1];
    if (e.shiftKey && document.activeElement === eerste) {
      e.preventDefault();
      laatste.focus();
    } else if (!e.shiftKey && document.activeElement === laatste) {
      e.preventDefault();
      eerste.focus();
    }
  }, []);

  function verstuur(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const veld = invoerRef.current;
    if (!veld) return;
    const tekst = veld.value;
    veld.value = '';
    veld.style.height = 'auto';
    void stuur(tekst);
  }

  function opToetsInVeld(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  }

  const laatste = berichten[berichten.length - 1];
  const wachtOpAntwoord = status === 'bezig' && laatste?.rol === 'bezoeker';

  return (
    <div
      ref={paneelRef}
      onKeyDown={opTab}
      role="dialog"
      aria-modal="false"
      aria-label="Gesprek met de agent van FactumAI"
      className={[
        'fixed z-50 flex flex-col bg-[var(--paper)]',
        'inset-0 sm:inset-auto sm:bottom-6 sm:right-6',
        'sm:h-[min(620px,calc(100vh-3rem))] sm:w-[380px] sm:rounded-[3px]',
        'border-0 sm:border sm:border-[var(--paper-edge)]',
      ].join(' ')}
      style={{ boxShadow: 'var(--shadow-lift)' }}
    >
      <header className="flex items-start justify-between gap-3 border-b border-[var(--paper-edge)] bg-[var(--paper-warm)] px-5 py-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--oker-deep)]">
            FactumAI
          </div>
          <div className="mt-1 font-display text-[17px] leading-tight text-[var(--ink)]">
            Stel je vraag
          </div>
        </div>
        <button
          type="button"
          onClick={sluitPaneel}
          aria-label="Gesprek sluiten"
          className="-mr-1 -mt-1 rounded-[2px] p-2 text-[var(--ink-faint)] transition-colors hover:bg-[var(--paper-deep)] hover:text-[var(--ink)]"
        >
          <X size={18} strokeWidth={1.8} />
        </button>
      </header>

      <div
        className="flex-1 space-y-3 overflow-y-auto px-5 py-4"
        aria-live="polite"
        aria-atomic="false"
      >
        {berichten.map((bericht) => (
          <div
            key={bericht.id}
            className={bericht.rol === 'bezoeker' ? 'flex justify-end' : 'flex justify-start'}
          >
            <div
              className={[
                'max-w-[85%] whitespace-pre-wrap rounded-[3px] px-3.5 py-2.5 text-[14.5px] leading-[1.6]',
                bericht.rol === 'bezoeker'
                  ? 'bg-[var(--ink)] text-[var(--paper)]'
                  : 'border border-[var(--paper-edge)] bg-[var(--paper-warm)] text-[var(--ink)]',
              ].join(' ')}
            >
              {bericht.tekst}
            </div>
          </div>
        ))}

        {wachtOpAntwoord && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1.5 rounded-[3px] border border-[var(--paper-edge)] bg-[var(--paper-warm)] px-3.5 py-3">
              <span className="sr-only">De agent typt een antwoord</span>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className="agent-punt block h-1.5 w-1.5 rounded-full bg-[var(--ink-faint)]"
                  style={{ animationDelay: `${i * 160}ms` }}
                />
              ))}
            </div>
          </div>
        )}

        {fout && (
          <div
            role="status"
            className="rounded-[3px] border border-[var(--paper-edge)] bg-[var(--paper-deep)] px-3.5 py-2.5 text-[13.5px] leading-[1.6] text-[var(--ink-dim)]"
          >
            {fout}
          </div>
        )}

        {terugbelAanleiding !== null && (
          <TerugbelKaart
            sessionId={sessionId}
            aanleiding={terugbelAanleiding}
            // "Liever niet" is een antwoord aan de agent, geen stilte: hij moet
            // weten dat hij hier niet op terug moet komen.
            opAfgewezen={() => void stuur('Liever geen telefoontje.')}
          />
        )}

        {afsluiting === 'afspraak' && (
          <div className="flex justify-start">
            <button
              type="button"
              onClick={() => opSignaal({ naam: 'agenda', payload: {} })}
              className="rounded-[2px] bg-[var(--terra)] px-4 py-2.5 text-[14px] leading-none text-[var(--paper)] transition-colors hover:bg-[var(--oker-deep)]"
            >
              Plan een gesprek van 20 minuten
            </button>
          </div>
        )}

        <div ref={onderkantRef} />
      </div>

      <form onSubmit={verstuur} className="border-t border-[var(--paper-edge)] px-5 py-4">
        <div className="flex items-end gap-2">
          <label htmlFor="site-agent-invoer" className="sr-only">
            Je bericht
          </label>
          <textarea
            id="site-agent-invoer"
            ref={invoerRef}
            rows={1}
            maxLength={2000}
            disabled={afsluiting !== null}
            placeholder={afsluiting ? 'Dit gesprek is afgerond' : 'Typ je vraag'}
            onKeyDown={opToetsInVeld}
            onInput={(e) => {
              const el = e.currentTarget;
              el.style.height = 'auto';
              el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
            }}
            className="max-h-[120px] flex-1 resize-none rounded-[2px] border border-[var(--paper-edge)] bg-[var(--paper)] px-3 py-2 text-[14.5px] leading-[1.5] text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--ink-faint)] focus:border-[var(--oker)]"
          />
          <button
            type="submit"
            disabled={status === 'bezig' || afsluiting !== null}
            aria-label="Bericht versturen"
            className="rounded-[2px] bg-[var(--terra)] p-2.5 text-[var(--paper)] transition-colors hover:bg-[var(--oker-deep)] disabled:cursor-not-allowed disabled:opacity-45"
          >
            <ArrowUp size={16} strokeWidth={2} />
          </button>
        </div>

        {/* AI Act-transparantieplicht. Deze regel is niet optioneel. */}
        <p className="mt-2.5 text-[11.5px] leading-[1.5] text-[var(--ink-faint)]">
          Dit is een AI-agent van FactumAI. Gesprekken worden bewaard om je vraag op te volgen.{' '}
          <Link
            href="/privacy"
            className="underline decoration-[var(--paper-edge)] underline-offset-2 transition-colors hover:text-[var(--ink-dim)] hover:decoration-[var(--oker)]"
          >
            Zie de privacyverklaring
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
