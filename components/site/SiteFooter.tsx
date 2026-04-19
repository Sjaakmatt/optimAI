import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-[var(--paper-edge)] bg-[var(--paper-deep)] mt-24">
      <div className="mx-auto max-w-[1080px] px-6 sm:px-10 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <div className="font-display text-[18px] text-[var(--ink)]">FactumAI</div>
          <p className="mt-2 text-[13px] text-[var(--ink-dim)] leading-relaxed max-w-[260px]">
            Wij bouwen en implementeren AI-agents die het dagelijkse werk van MKB-bedrijven
            overnemen. Nederlands, pragmatisch, zonder dashboard-gedoe.
          </p>
        </div>

        <div>
          <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em] mb-2">
            Navigatie
          </div>
          <ul className="space-y-1 text-[13px]">
            <li><Link href="/over" className="text-[var(--ink-dim)] hover:text-[var(--ink)]">Over ons</Link></li>
            <li><Link href="/info" className="text-[var(--ink-dim)] hover:text-[var(--ink)]">Wat is een AI-agent</Link></li>
            <li><Link href="/demo" className="text-[var(--ink-dim)] hover:text-[var(--ink)]">Demo — De Werkbank</Link></li>
            <li><Link href="/contact" className="text-[var(--ink-dim)] hover:text-[var(--ink)]">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em] mb-2">
            Contact
          </div>
          <ul className="space-y-1 text-[13px] text-[var(--ink-dim)]">
            <li>hallo@factumai.nl</li>
            <li>06-12 34 56 78</li>
            <li>Regio Noord-Holland</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-[1080px] px-6 sm:px-10 py-4 border-t border-[var(--paper-edge)] flex items-center justify-between text-[11px] font-mono text-[var(--ink-faint)]">
        <span>© {new Date().getFullYear()} FactumAI</span>
        <span className="uppercase tracking-[0.14em]">Gebouwd met ambacht</span>
      </div>
    </footer>
  );
}
