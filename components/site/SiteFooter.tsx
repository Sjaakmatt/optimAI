import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-[var(--paper-edge)] bg-[var(--paper-deep)] mt-24">
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <div className="font-display text-[20px] tracking-tight flex items-baseline leading-none">
            <span aria-hidden className="text-[var(--oker)] mr-1.5 text-[16px] leading-none">
              ❦
            </span>
            <span className="text-[var(--ink)]">Factum</span>
            <span className="italic text-[var(--oker-deep)]">AI</span>
          </div>
          <p className="mt-2 text-[13px] text-[var(--ink-dim)] leading-relaxed max-w-[260px]">
            Wij bouwen en implementeren AI-agents die het dagelijkse werk van MKB-bedrijven
            lichter maken. Nederlands, pragmatisch, zonder dashboard-gedoe.
          </p>
        </div>

        <div>
          <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em] mb-2">
            Navigatie
          </div>
          <ul className="space-y-1 text-[13px]">
            <li><Link href="/over" className="text-[var(--ink-dim)] hover:text-[var(--ink)]">Over ons</Link></li>
            <li><Link href="/info" className="text-[var(--ink-dim)] hover:text-[var(--ink)]">Wat is een AI-agent</Link></li>
            <li><Link href="/kennis" className="text-[var(--ink-dim)] hover:text-[var(--ink)]">Kennis</Link></li>
            <li><Link href="/demo" className="text-[var(--ink-dim)] hover:text-[var(--ink)]">Demo · De Werkbank</Link></li>
            <li><Link href="/contact" className="text-[var(--ink-dim)] hover:text-[var(--ink)]">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em] mb-2">
            Contact
          </div>
          <ul className="space-y-1 text-[13px] text-[var(--ink-dim)]">
            <li>
              <a href="mailto:info@factumai.nl" className="hover:text-[var(--ink)]">
                info@factumai.nl
              </a>
            </li>
            <li>
              <a href="tel:+31610555658" className="hover:text-[var(--ink)]">
                06-10 55 56 58
              </a>
            </li>
            <li>Hoogkarspel · West-Friesland</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-4 border-t border-[var(--paper-edge)] flex items-center justify-between text-[11px] font-mono text-[var(--ink-faint)]">
        <span>© {new Date().getFullYear()} FactumAI</span>
        <span className="uppercase tracking-[0.14em]">Gebouwd met ambacht</span>
      </div>
    </footer>
  );
}
