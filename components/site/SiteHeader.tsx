'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavLink {
  href: string;
  label: string;
}

interface NavGroup {
  label: string;
  items: NavLink[];
  matchPrefixes: string[]; // route-prefixes for "active" state
}

type NavEntry = NavLink | NavGroup;

function isGroup(e: NavEntry): e is NavGroup {
  return 'items' in e;
}

const NAV: NavEntry[] = [
  { href: '/diensten', label: 'Diensten' },
  { href: '/info', label: 'Wat is AI-agent' },
  { href: '/cases', label: 'Cases' },
  { href: '/kennis', label: 'Kennis' },
  { href: '/over', label: 'Over ons' },
  {
    label: 'Tools',
    matchPrefixes: ['/demo', '/tools/', '/scan', '/ontdek'],
    items: [
      { href: '/ontdek', label: 'Ontdek AI-agents' },
      { href: '/scan', label: 'AI-agents scan' },
      { href: '/demo', label: 'Demo · De Werkbank' },
      { href: '/tools/ai-roi-calculator', label: 'AI ROI calculator' },
      { href: '/tools/agent-readiness-check', label: 'Readiness check' },
    ],
  },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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
            <span className="font-display text-[22px] sm:text-[24px] tracking-tight leading-none">
              <span className="text-[var(--ink)]">Factum</span>
              <span className="italic text-[var(--oker-deep)]">AI</span>
            </span>
            <span className="hidden sm:inline font-mono italic text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.2em] group-hover:text-[var(--oker-deep)] transition-colors">
              AI-agents voor MKB
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((entry) =>
              isGroup(entry) ? (
                <DesktopDropdown key={entry.label} group={entry} pathname={pathname} />
              ) : (
                <DesktopLink key={entry.href} item={entry} pathname={pathname} />
              ),
            )}
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
              <span className="font-display text-[22px] tracking-tight leading-none">
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
                {NAV.map((entry, i) => (
                  <motion.li
                    key={isGroup(entry) ? entry.label : entry.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                  >
                    {isGroup(entry) ? (
                      <MobileGroup group={entry} pathname={pathname} />
                    ) : (
                      <MobileLink item={entry} pathname={pathname} />
                    )}
                  </motion.li>
                ))}
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

function DesktopLink({ item, pathname }: { item: NavLink; pathname: string }) {
  const active = pathname === item.href || pathname.startsWith(item.href + '/');
  return (
    <Link
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
}

function DesktopDropdown({ group, pathname }: { group: NavGroup; pathname: string }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active = group.matchPrefixes.some(
    (p) => pathname === p || pathname.startsWith(p),
  );

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="relative" onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`px-3 py-1.5 text-[13px] rounded-[2px] transition-colors flex items-center gap-1 ${
          active
            ? 'text-[var(--ink)] bg-[var(--paper-deep)]'
            : 'text-[var(--ink-dim)] hover:text-[var(--ink)] hover:bg-[var(--paper-deep)]'
        }`}
      >
        {group.label}
        <ChevronDown
          size={13}
          strokeWidth={1.8}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            role="menu"
            className="absolute right-0 top-full mt-1 min-w-[240px] bg-[var(--paper)] border border-[var(--paper-edge)] rounded-[2px] py-1.5 z-40"
            style={{ boxShadow: 'var(--shadow-lift)' }}
          >
            {group.items.map((item) => {
              const itemActive =
                pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  className={`block px-4 py-2 text-[13px] transition-colors ${
                    itemActive
                      ? 'text-[var(--ink)] bg-[var(--paper-deep)]'
                      : 'text-[var(--ink-dim)] hover:text-[var(--ink)] hover:bg-[var(--paper-deep)]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileLink({ item, pathname }: { item: NavLink; pathname: string }) {
  const active = pathname === item.href || pathname.startsWith(item.href + '/');
  return (
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
  );
}

function MobileGroup({ group, pathname }: { group: NavGroup; pathname: string }) {
  const active = group.matchPrefixes.some(
    (p) => pathname === p || pathname.startsWith(p),
  );
  return (
    <div>
      <div
        className={`px-3 py-3 text-[18px] font-display flex items-center gap-2 ${
          active ? 'text-[var(--ink)]' : 'text-[var(--ink-dim)]'
        }`}
      >
        {group.label}
        <span className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em] pt-1.5">
          {group.items.length}
        </span>
      </div>
      <ul className="ml-3 pl-3 border-l border-[var(--paper-edge)] space-y-0.5">
        {group.items.map((item) => {
          const itemActive =
            pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-3 py-2.5 rounded-[2px] text-[15px] transition-colors ${
                  itemActive
                    ? 'text-[var(--ink)] bg-[var(--paper-deep)]'
                    : 'text-[var(--ink-dim)] hover:text-[var(--ink)] hover:bg-[var(--paper-deep)]'
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
