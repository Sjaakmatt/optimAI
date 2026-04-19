'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/over', label: 'Over ons' },
  { href: '/info', label: 'Wat is een AI-agent' },
  { href: '/demo', label: 'Demo' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-[var(--paper-edge)]">
      <div className="mx-auto max-w-[1080px] px-6 sm:px-10 py-5 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-baseline gap-3 group">
          <span className="font-display text-[22px] tracking-tight text-[var(--ink)]">
            FactumAI
          </span>
          <span className="hidden sm:inline font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.2em] group-hover:text-[var(--oker-deep)] transition-colors">
            AI-agents voor MKB
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2 sm:px-3 py-1.5 text-[13px] rounded-[2px] transition-colors ${
                  active
                    ? 'text-[var(--ink)] bg-[var(--paper-deep)]'
                    : 'text-[var(--ink-dim)] hover:text-[var(--ink)] hover:bg-[var(--paper-deep)]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
