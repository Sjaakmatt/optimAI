'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const NAV = [
  { href: '/over', label: 'Over ons' },
  { href: '/info', label: 'Wat is AI-agent' },
  { href: '/cases', label: 'Cases' },
  { href: '/kennis', label: 'Kennis' },
  { href: '/demo', label: 'Demo' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="w-full border-b border-[var(--paper-edge)] relative z-30 bg-[var(--paper)]">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-4 sm:py-5 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-baseline gap-3 group min-w-0">
            <span className="font-display text-[22px] sm:text-[24px] tracking-tight leading-none flex items-baseline">
              <span
                aria-hidden
                className="text-[var(--oker)] mr-1.5 text-[18px] sm:text-[20px] leading-none transition-transform group-hover:-rotate-6"
              >
                ❦
              </span>
              <span className="text-[var(--ink)]">Factum</span>
              <span className="italic text-[var(--oker-deep)]">AI</span>
            </span>
            <span className="hidden sm:inline font-mono italic text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.2em] group-hover:text-[var(--oker-deep)] transition-colors">
              AI-agents voor MKB
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 text-[13px] rounded-[2px] transition-colors ${
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

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Menu openen"
            className="lg:hidden p-2 -mr-2 rounded-[2px] text-[var(--ink-dim)] hover:text-[var(--ink)] hover:bg-[var(--paper-deep)] transition-colors"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 lg:hidden flex flex-col bg-[var(--paper)]"
          >
            <div className="border-b border-[var(--paper-edge)] px-5 py-4 flex items-center justify-between">
              <span className="font-display text-[22px] tracking-tight flex items-baseline leading-none">
                <span aria-hidden className="text-[var(--oker)] mr-1.5 text-[18px] leading-none">
                  ❦
                </span>
                <span className="text-[var(--ink)]">Factum</span>
                <span className="italic text-[var(--oker-deep)]">AI</span>
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Menu sluiten"
                className="p-2 -mr-2 rounded-[2px] text-[var(--ink-dim)] hover:text-[var(--ink)] hover:bg-[var(--paper-deep)]"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-5 py-6">
              <ul className="space-y-1">
                {NAV.map((item, i) => {
                  const active =
                    pathname === item.href || pathname.startsWith(item.href + '/');
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                    >
                      <Link
                        href={item.href}
                        className={`block px-3 py-3 rounded-[2px] text-[18px] font-display transition-colors ${
                          active
                            ? 'text-[var(--ink)] bg-[var(--paper-deep)]'
                            : 'text-[var(--ink-dim)] hover:text-[var(--ink)] hover:bg-[var(--paper-deep)]'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-10 pt-6 border-t border-[var(--paper-edge)] space-y-2">
                <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.18em]">
                  Direct contact
                </div>
                <a
                  href="mailto:info@factumai.nl"
                  className="block text-[14px] text-[var(--ink)] hover:text-[var(--oker-deep)]"
                >
                  info@factumai.nl
                </a>
                <a
                  href="tel:+31610555658"
                  className="block text-[14px] text-[var(--ink)] hover:text-[var(--oker-deep)]"
                >
                  06-10 55 56 58
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
