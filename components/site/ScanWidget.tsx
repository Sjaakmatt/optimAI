'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Link2 } from 'lucide-react';

/**
 * Homepage-instap voor de AI-agents scan: één URL-veld + start-knop.
 * Stuurt door naar /scan?url=… waar de scan direct start.
 */
export function ScanWidget() {
  const router = useRouter();
  const [url, setUrl] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;
    router.push(`/scan?url=${encodeURIComponent(trimmed)}`);
  }

  return (
    <div
      className="relative rounded-[3px] border border-[var(--oker)] bg-[var(--paper-warm)] p-6 sm:p-8"
      style={{ boxShadow: '0 0 0 6px var(--oker-soft), 0 18px 40px -24px rgba(42, 36, 32, 0.35)' }}
    >
      <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
        Gratis scan · geen registratie
      </div>
      <h2 className="mt-3 font-display text-[24px] sm:text-[30px] leading-[1.15] tracking-tight text-[var(--ink)] max-w-[560px]">
        Bekijk binnen één minuut{' '}
        <span className="italic text-[var(--oker-deep)]">
          wat AI-agents voor uw bedrijf kunnen betekenen
        </span>
      </h2>
      <form onSubmit={submit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-[560px]">
        <label htmlFor="home-scan-url" className="sr-only">
          Website van uw bedrijf
        </label>
        <div className="relative flex-1">
          <Link2
            size={16}
            strokeWidth={1.8}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-faint)]"
            aria-hidden
          />
          <input
            id="home-scan-url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            maxLength={300}
            inputMode="url"
            placeholder="Vul uw website in — uwbedrijf.nl"
            className="w-full pl-11 pr-4 py-3.5 rounded-[2px] bg-[var(--paper)] border border-[var(--paper-edge)] text-[15px] text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:outline-none focus:border-[var(--oker)]"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[2px] text-[15px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors shrink-0 lift-on-hover"
        >
          Start
          <ArrowRight size={16} strokeWidth={1.8} />
        </button>
      </form>
      <p className="mt-4 text-[12px] leading-[1.6] text-[var(--ink-faint)] max-w-[560px]">
        We analyseren uw website, uw branche en uw processen — en laten zien welke taken een
        AI-agent kan overnemen, van snelle standaard-automatisering tot geavanceerde agents op
        maat.
      </p>
    </div>
  );
}
