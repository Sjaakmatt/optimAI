'use client';

import type { ReactNode } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { InstellingenProvider, useInstellingen } from './instellingen';
import { LenisProvider } from './LenisProvider';
import { Held } from './Held';
import { Wandeling } from './Wandeling';
import { Sandbox } from './Sandbox';

/**
 * De hele ervaring van /ontdek: hero, scroll-wandeling en sandbox,
 * binnen de instellingen- en smooth-scroll-providers. De finale-CTA
 * komt als server-children mee zodat die tekst altijd in de HTML staat.
 */
export function OntdekExperience({ children }: { children?: ReactNode }) {
  return (
    <InstellingenProvider>
      <LenisProvider>
        <Schakelaars />
        <Held />
        <Wandeling />
        <Sandbox />
        {children}
      </LenisProvider>
    </InstellingenProvider>
  );
}

/** Zichtbare toggles: animaties uit (a11y) en geluid aan (nooit autoplay). */
function Schakelaars() {
  const { animatiesUit, zetAnimatiesUit, geluidAan, zetGeluidAan, rustig } = useInstellingen();
  return (
    <div className="pointer-events-none sticky top-3 z-40 flex justify-end px-4">
      <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-[var(--paper-edge)] bg-[var(--paper)]/95 px-2 py-1.5 shadow-[var(--shadow-soft)]">
        <button
          type="button"
          onClick={() => zetAnimatiesUit(!animatiesUit)}
          aria-pressed={animatiesUit}
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--ink-dim)] transition-colors hover:bg-[var(--paper-warm)]"
        >
          <Sparkles size={11} strokeWidth={1.8} aria-hidden />
          {rustig ? 'Animaties uit' : 'Animaties aan'}
        </button>
        <span aria-hidden className="h-4 w-px bg-[var(--paper-edge)]" />
        <button
          type="button"
          onClick={() => zetGeluidAan(!geluidAan)}
          aria-pressed={geluidAan}
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--ink-dim)] transition-colors hover:bg-[var(--paper-warm)]"
        >
          {geluidAan ? (
            <Volume2 size={11} strokeWidth={1.8} aria-hidden />
          ) : (
            <VolumeX size={11} strokeWidth={1.8} aria-hidden />
          )}
          {geluidAan ? 'Geluid aan' : 'Geluid uit'}
        </button>
      </div>
    </div>
  );
}
