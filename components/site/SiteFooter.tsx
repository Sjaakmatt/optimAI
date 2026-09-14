import Link from 'next/link';
import { CASES } from '@/lib/data/cases';
import { POSTS } from '@/lib/data/posts';
import { CookiePrefsButton } from '@/components/analytics/CookiePrefsButton';
import { Woordmerk } from './Woordmerk';

export function SiteFooter() {
  const topPosts = [...POSTS]
    .sort((a, b) => (a.published < b.published ? 1 : -1))
    .slice(0, 5);

  return (
    <footer className="relative w-full mt-28 overflow-hidden">
      {/* zachte gloed aan de horizon */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px]"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 110%, rgba(196, 100, 63, 0.22) 0%, rgba(43, 26, 46, 0.25) 45%, transparent 75%)',
        }}
      />
      <div className="lijn" />
      <div className="relative band py-14 sm:py-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <Woordmerk />
          <p className="mt-4 text-[13.5px] text-[var(--fg-dim)] leading-relaxed max-w-[280px]">
            Wij bouwen en implementeren AI-agents die het dagelijkse werk van MKB-bedrijven
            lichter maken. Nederlands, pragmatisch, zonder dashboard-gedoe.
          </p>
          <p className="mt-4 font-mono text-[11px] text-[var(--fg-faint)] uppercase tracking-[0.14em]">
            FactumAI B.V. · KvK 42123186
          </p>
        </div>

        <Kolom titel="Diensten">
          <VoetLink href="/diensten/ai-agent-laten-bouwen">AI-agent laten bouwen</VoetLink>
          <VoetLink href="/diensten/ai-automatisering">AI-automatisering</VoetLink>
          <VoetLink href="/diensten/ai-implementatie">AI implementeren</VoetLink>
          <VoetLink href="/diensten/ai-agents-voor-bedrijven">AI-agents voor bedrijven</VoetLink>
          <VoetLink href="/oplossingen">Oplossingen</VoetLink>
          <VoetLink href="/branches">Per branche</VoetLink>
          <VoetLink href="/diensten" zacht>Alle diensten</VoetLink>
        </Kolom>

        <Kolom titel="Cases">
          {CASES.map((c) => (
            <VoetLink key={c.slug} href={`/cases/${c.slug}`}>
              {c.klant}
            </VoetLink>
          ))}
          <VoetLink href="/cases" zacht>Alle cases</VoetLink>
        </Kolom>

        <Kolom titel="Kennis">
          {topPosts.map((p) => (
            <VoetLink key={p.slug} href={`/kennis/${p.slug}`}>
              {p.title}
            </VoetLink>
          ))}
          <VoetLink href="/kennis" zacht>Alle artikelen</VoetLink>
        </Kolom>

        <Kolom titel="Contact">
          <li>
            <a href="mailto:info@factumai.nl" className="text-[var(--fg-dim)] hover:text-[var(--fg)] transition-colors">
              info@factumai.nl
            </a>
          </li>
          <li>
            <a href="tel:+31610555658" className="text-[var(--fg-dim)] hover:text-[var(--fg)] transition-colors">
              06-10 55 56 58
            </a>
          </li>
          <li className="text-[var(--fg-faint)]">Hoogkarspel · West-Friesland</li>
          <li className="pt-2">
            <VoetLinkInner href="/over">Over FactumAI</VoetLinkInner>
          </li>
          <li>
            <VoetLinkInner href="/contact">Contact</VoetLinkInner>
          </li>
          <li>
            <VoetLinkInner href="/info">Wat is een AI-agent</VoetLinkInner>
          </li>
          <li>
            <VoetLinkInner href="/demo">Demo · De Werkbank</VoetLinkInner>
          </li>
        </Kolom>
      </div>
      <div className="relative band pb-8 pt-5 border-t border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-mono text-[var(--fg-faint)]">
        <span>© {new Date().getFullYear()} FactumAI</span>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <li>
            <Link href="/privacy" className="uppercase tracking-[0.14em] hover:text-[var(--fg)]">
              Privacy
            </Link>
          </li>
          <li>
            <Link href="/subverwerkers" className="uppercase tracking-[0.14em] hover:text-[var(--fg)]">
              Sub-verwerkers
            </Link>
          </li>
          <li>
            <CookiePrefsButton />
          </li>
        </ul>
        <span className="uppercase tracking-[0.14em]">Gebouwd met ambacht</span>
      </div>
    </footer>
  );
}

function Kolom({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="eyebrow mb-3">{titel}</div>
      <ul className="space-y-1.5 text-[13.5px]">{children}</ul>
    </div>
  );
}

function VoetLink({ href, children, zacht = false }: { href: string; children: React.ReactNode; zacht?: boolean }) {
  return (
    <li>
      <VoetLinkInner href={href} zacht={zacht}>
        {children}
      </VoetLinkInner>
    </li>
  );
}

function VoetLinkInner({ href, children, zacht = false }: { href: string; children: React.ReactNode; zacht?: boolean }) {
  return (
    <Link
      href={href}
      className={`transition-colors hover:text-[var(--fg)] ${zacht ? 'text-[var(--fg-faint)]' : 'text-[var(--fg-dim)]'}`}
    >
      {children}
    </Link>
  );
}
