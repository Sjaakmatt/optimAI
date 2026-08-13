'use client';

// Het venster waarin de agenda opent.
//
// Toegankelijkheid volgt hetzelfde patroon als het chatpaneel: focus gaat naar
// binnen, Tab blijft binnen het venster, Escape sluit, en de achtergrond
// scrollt niet mee.

import { useCallback, useEffect, useRef, type KeyboardEvent } from 'react';
import { X } from 'lucide-react';

import { AgendaKiezer } from './AgendaKiezer';

const FOCUSBAAR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface AgendaDialoogProps {
  bron: string;
  aanleiding?: string;
  onSluiten: () => void;
}

export function AgendaDialoog({ bron, aanleiding, onSluiten }: AgendaDialoogProps) {
  const paneelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const opEscape = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onSluiten();
    };
    document.addEventListener('keydown', opEscape);
    const vorigeOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    paneelRef.current?.querySelector<HTMLElement>(FOCUSBAAR)?.focus();
    return () => {
      document.removeEventListener('keydown', opEscape);
      document.body.style.overflow = vorigeOverflow;
    };
  }, [onSluiten]);

  const opTab = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !paneelRef.current) return;
    const elementen = Array.from(
      paneelRef.current.querySelectorAll<HTMLElement>(FOCUSBAAR),
    ).filter((el) => el.offsetParent !== null);
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

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <button
        type="button"
        aria-label="Agenda sluiten"
        onClick={onSluiten}
        className="absolute inset-0 bg-[var(--ink)]/30 backdrop-blur-[2px]"
      />
      <div
        ref={paneelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Plan een kennismaking"
        onKeyDown={opTab}
        className="relative w-full sm:max-w-[540px] max-h-[92vh] overflow-y-auto bg-[var(--paper)] border border-[var(--paper-edge)] rounded-t-[6px] sm:rounded-[3px] px-6 sm:px-8 pt-5 pb-8"
        style={{ boxShadow: 'var(--shadow-lift)' }}
      >
        <div className="flex justify-end -mr-2">
          <button
            type="button"
            onClick={onSluiten}
            aria-label="Sluiten"
            className="p-2 text-[var(--ink-faint)] hover:text-[var(--ink)] transition-colors"
          >
            <X size={18} strokeWidth={1.8} aria-hidden />
          </button>
        </div>
        <AgendaKiezer bron={bron} aanleiding={aanleiding} />
      </div>
    </div>
  );
}
