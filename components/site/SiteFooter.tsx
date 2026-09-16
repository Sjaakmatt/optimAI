import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { CASES } from '@/lib/data/cases';
import { POSTS } from '@/lib/data/posts';
import { CookiePrefsButton } from '@/components/analytics/CookiePrefsButton';

export function SiteFooter() {
  const topPosts = [...POSTS]
    .sort((a, b) => (a.published < b.published ? 1 : -1))
    .slice(0, 2);

  return (
    <footer className="relative w-full pt-12 overflow-hidden">
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
      <div className="relative band py-9 sm:py-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-7">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <Link href="/" aria-label="FactumAI, naar de homepage" className="inline-block max-w-full">
            <Image
              src="/branding/factumai/logo-transparent.webp"
              alt="FactumAI"
              width={1107}
              height={234}
              className="h-auto w-[168px] max-w-full rounded-none"
            />
          </Link>
          <p className="mt-4 text-[13.5px] text-[var(--fg-dim)] leading-relaxed max-w-[280px]">
            AI-agents die het dagelijkse werk van MKB-bedrijven lichter maken.
          </p>
          <p className="mt-3 font-mono text-[10px] text-[var(--fg-faint)] uppercase tracking-[0.06em]">
            FactumAI B.V. · KvK 42123186
          </p>
        </div>

        <Kolom titel="Diensten">
          <VoetLink href="/diensten/ai-audit">AI-audit</VoetLink>
          <VoetLink href="/diensten/ai-agent-laten-bouwen">AI-agent laten bouwen</VoetLink>
          <VoetLink href="/diensten/ai-automatisering">AI-automatisering</VoetLink>
          <AllesLink href="/diensten" onderwerp="diensten" />
        </Kolom>

        <Kolom titel="Cases">
          {CASES.slice(0, 3).map((c) => (
            <VoetLink key={c.slug} href={`/cases/${c.slug}`}>
              {c.klant}
            </VoetLink>
          ))}
          <AllesLink href="/cases" onderwerp="cases" />
        </Kolom>

        <Kolom titel="Kennis">
          {topPosts.map((p) => (
            <VoetLink key={p.slug} href={`/kennis/${p.slug}`}>
              <span className="line-clamp-2" title={p.title}>{p.title}</span>
            </VoetLink>
          ))}
          <AllesLink href="/kennis" onderwerp="artikelen" />
          <VoetLink href="/videos" zacht>Alle video’s</VoetLink>
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
          <li className="pt-1.5 flex flex-wrap gap-x-4 gap-y-1">
            <VoetLinkInner href="/over">Over FactumAI</VoetLinkInner>
            <VoetLinkInner href="/contact">Contact</VoetLinkInner>
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

function AllesLink({ href, onderwerp }: { href: string; onderwerp: string }) {
  return (
    <li className="pt-1.5">
      <Link
        href={href}
        aria-label={`Toon alle ${onderwerp}`}
        className="inline-flex items-center gap-1.5 text-[var(--fg-faint)] hover:text-[var(--fg)] transition-colors"
      >
        Toon alles <ArrowUpRight size={13} aria-hidden />
      </Link>
    </li>
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
