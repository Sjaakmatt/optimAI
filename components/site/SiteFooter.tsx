import Link from 'next/link';
import { CASES } from '@/lib/data/cases';
import { POSTS } from '@/lib/data/posts';
import { BRANCHES } from '@/lib/data/branches';

export function SiteFooter() {
  const topPosts = [...POSTS]
    .sort((a, b) => (a.published < b.published ? 1 : -1))
    .slice(0, 5);

  return (
    <footer className="w-full border-t border-[var(--paper-edge)] bg-[var(--paper-deep)] mt-24">
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <div className="font-display text-[20px] tracking-tight leading-none">
            <span className="text-[var(--ink)]">Factum</span>
            <span className="italic text-[var(--oker-deep)]">AI</span>
          </div>
          <p className="mt-2 text-[13px] text-[var(--ink-dim)] leading-relaxed max-w-[280px]">
            Wij bouwen en implementeren AI-agents die het dagelijkse werk van MKB-bedrijven
            lichter maken. Nederlands, pragmatisch, zonder dashboard-gedoe.
          </p>
        </div>

        <div>
          <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em] mb-2">
            Diensten
          </div>
          <ul className="space-y-1 text-[13px]">
            <li>
              <Link
                href="/diensten/ai-agent-laten-bouwen"
                className="text-[var(--ink-dim)] hover:text-[var(--ink)]"
              >
                AI-agent laten bouwen
              </Link>
            </li>
            {BRANCHES.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/branches/${b.slug}`}
                  className="text-[var(--ink-dim)] hover:text-[var(--ink)]"
                >
                  Voor {b.label.toLowerCase()}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/info" className="text-[var(--ink-dim)] hover:text-[var(--ink)]">
                Wat is een AI-agent
              </Link>
            </li>
            <li>
              <Link href="/demo" className="text-[var(--ink-dim)] hover:text-[var(--ink)]">
                Demo · De Werkbank
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em] mb-2">
            Cases
          </div>
          <ul className="space-y-1 text-[13px]">
            {CASES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/cases/${c.slug}`}
                  className="text-[var(--ink-dim)] hover:text-[var(--ink)]"
                >
                  {c.klant}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/cases" className="text-[var(--ink-faint)] hover:text-[var(--ink)] italic">
                Alle cases
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em] mb-2">
            Kennis
          </div>
          <ul className="space-y-1 text-[13px]">
            {topPosts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/kennis/${p.slug}`}
                  className="text-[var(--ink-dim)] hover:text-[var(--ink)]"
                >
                  {p.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/kennis"
                className="text-[var(--ink-faint)] hover:text-[var(--ink)] italic"
              >
                Alle artikelen
              </Link>
            </li>
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
            <li className="pt-2">
              <Link href="/over" className="hover:text-[var(--ink)]">
                Over FactumAI
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[var(--ink)]">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-4 border-t border-[var(--paper-edge)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-mono text-[var(--ink-faint)]">
        <span>© {new Date().getFullYear()} FactumAI</span>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <li>
            <Link
              href="/privacy"
              className="uppercase tracking-[0.14em] hover:text-[var(--ink)]"
            >
              Privacy
            </Link>
          </li>
          <li>
            <Link
              href="/subverwerkers"
              className="uppercase tracking-[0.14em] hover:text-[var(--ink)]"
            >
              Sub-verwerkers
            </Link>
          </li>
        </ul>
        <span className="uppercase tracking-[0.14em]">Gebouwd met ambacht</span>
      </div>
    </footer>
  );
}
