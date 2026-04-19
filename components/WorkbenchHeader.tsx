'use client';

import Link from 'next/link';
import { Settings, ArrowLeft } from 'lucide-react';
import { useStore } from '@/lib/store';
import { HeaderMenu } from './HeaderMenu';

export function WorkbenchHeader() {
  const openPolicies = useStore((s) => s.setPolicyPanelOpen);
  const mode = useStore((s) => s.mode);

  return (
    <header className="w-full border-b border-[var(--paper-edge)]">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-3 sm:gap-4 min-w-0">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-[20px] sm:text-[22px] tracking-tight text-[var(--ink)] hover:text-[var(--oker-deep)] transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={1.8} className="text-[var(--ink-faint)]" />
            FactumAI
          </Link>
          <span className="hidden sm:inline font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.14em] truncate">
            De Werkbank · Nordveld
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <span className="hidden md:inline font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-wider">
            Vandaag · {mode === 'manual' ? 'Handmatig' : 'Autonoom'}
          </span>
          <button
            onClick={() => openPolicies(true)}
            aria-label="Beleidsregels"
            className="p-2 rounded-[2px] text-[var(--ink-dim)] hover:text-[var(--ink)] hover:bg-[var(--paper-deep)] transition-colors"
          >
            <Settings size={16} strokeWidth={1.5} />
          </button>
          <HeaderMenu />
        </div>
      </div>
    </header>
  );
}
