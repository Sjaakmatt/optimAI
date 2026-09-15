'use client';

// De kop van de site: zwevend over de hero, wordt glas zodra er gescrold is.
// Eén pill-knop rechts (plan een gesprek), de rest rustig.

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { vergrendelScroll } from '@/lib/site/scrollLock';
import { calPopupAttrs } from '@/components/booking/config';
import Image from 'next/image';

interface NavLink {
  href: string;
  label: string;
}

interface NavGroup {
  label: string;
  items: NavLink[];
  matchPrefixes: string[];
}

type NavEntry = NavLink | NavGroup;

function isGroup(e: NavEntry): e is NavGroup {
  return 'items' in e;
}

const NAV: NavEntry[] = [
  { href: '/diensten', label: 'Diensten' },
  { href: '/oplossingen', label: 'Oplossingen' },
  { href: '/cases', label: 'Cases' },
  { href: '/kennis', label: 'Kennis' },
  { href: '/over', label: 'Over ons' },
  {
    label: 'Tools',
    matchPrefixes: ['/demo', '/tools/', '/scan', '/ontdek', '/info'],
    items: [
      { href: '/ontdek', label: 'Ontdek AI-agents' },
      { href: '/info', label: 'Wat is een AI-agent' },
      { href: '/scan', label: 'AI-agents scan' },
      { href: '/demo', label: 'Demo · De Werkbank' },
      { href: '/tools/ai-roi-calculator', label: 'Procesdiagnose' },
      { href: '/tools/agent-readiness-check', label: 'Readiness check' },
    ],
  },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [gescrold, setGescrold] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    return vergrendelScroll();
  }, [mobileOpen]);

  useEffect(() => {
    const opScroll = () => setGescrold(window.scrollY > 24);
    opScroll();
    window.addEventListener('scroll', opScroll, { passive: true });
    return () => window.removeEventListener('scroll', opScroll);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full pointer-events-none">
        <div className="band pt-3 sm:pt-4">
          <div
            className={`pointer-events-auto flex items-center justify-between gap-3 rounded-[999px] px-3 sm:px-4 py-2 border border-[rgba(255,255,255,0.1)] backdrop-blur-xl transition-all duration-500 ${
              gescrold
                ? 'bg-[rgba(12,12,15,0.78)] shadow-[0_12px_40px_rgba(0,0,0,0.45)]'
                : 'bg-[rgba(14,13,20,0.62)] shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
            }`}
          >
            <Link href="/" className="flex items-center gap-2 pl-1 min-w-0" aria-label="FactumAI, naar de homepage">
              <Image src="/branding/factumai/logo-horizon.webp" alt="FactumAI" width={1086} height={208} priority className="h-auto w-[130px] sm:w-[148px] shrink-0 rounded-sm" />
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Hoofdmenu">
              {NAV.map((entry) =>
                isGroup(entry) ? (
                  <DesktopDropdown key={entry.label} group={entry} pathname={pathname} />
                ) : (
                  <DesktopLink key={entry.href} item={entry} pathname={pathname} />
                ),
              )}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/contact"
                className="hidden md:inline-flex px-3 py-2 text-[13.5px] text-[var(--fg-dim)] hover:text-[var(--fg)] transition-colors"
              >
                Contact
              </Link>
              <Link href="/plan" {...calPopupAttrs} className="knop knop-primair !py-[0.62rem] !px-[1.1rem] text-[13.5px]">
                Plan een gesprek
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Menu openen"
                className="lg:hidden p-2 rounded-full text-[var(--fg-dim)] hover:text-[var(--fg)] hover:bg-[var(--surface-2)] transition-colors"
              >
                <Menu size={20} strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 lg:hidden flex flex-col bg-[var(--bg)]"
          >
            <div className="band py-4 flex items-center justify-between">
              <Image src="/branding/factumai/logo-horizon.webp" alt="FactumAI" width={1086} height={208} priority className="h-auto w-[130px] sm:w-[148px] shrink-0 rounded-sm" />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Menu sluiten"
                className="p-2 -mr-2 rounded-full text-[var(--fg-dim)] hover:text-[var(--fg)] hover:bg-[var(--surface-2)]"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto band py-4">
              <ul className="space-y-1">
                {[...NAV, { href: '/contact', label: 'Contact' }].map((entry, i) => (
                  <motion.li
                    key={isGroup(entry) ? entry.label : entry.href}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                  >
                    {isGroup(entry) ? (
                      <MobileGroup group={entry} pathname={pathname} />
                    ) : (
                      <MobileLink item={entry} pathname={pathname} />
                    )}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-10 pt-6 border-t border-[var(--border)] space-y-2">
                <div className="eyebrow">Direct contact</div>
                <a href="mailto:info@factumai.nl" className="block text-[15px] text-[var(--fg)]">
                  info@factumai.nl
                </a>
                <a href="tel:+31610555658" className="block text-[15px] text-[var(--fg)]">
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
      className={`px-3 py-2 text-[13.5px] rounded-full transition-colors ${
        active ? 'text-[var(--fg)] bg-[var(--surface-2)]' : 'text-[var(--fg-dim)] hover:text-[var(--fg)]'
      }`}
    >
      {item.label}
    </Link>
  );
}

function DesktopDropdown({ group, pathname }: { group: NavGroup; pathname: string }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active = group.matchPrefixes.some((p) => pathname === p || pathname.startsWith(p));

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
        className={`px-3 py-2 text-[13.5px] rounded-full transition-colors flex items-center gap-1 ${
          active ? 'text-[var(--fg)] bg-[var(--surface-2)]' : 'text-[var(--fg-dim)] hover:text-[var(--fg)]'
        }`}
      >
        {group.label}
        <ChevronDown size={13} strokeWidth={1.8} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            role="menu"
            className="absolute right-0 top-full mt-2 min-w-[240px] rounded-[16px] p-1.5 z-40 bg-[rgba(16,16,19,0.92)] border border-[var(--border)] backdrop-blur-xl"
            style={{ boxShadow: 'var(--shadow-lift)' }}
          >
            {group.items.map((item) => {
              const itemActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  className={`block px-3.5 py-2 text-[13.5px] rounded-[10px] transition-colors ${
                    itemActive
                      ? 'text-[var(--fg)] bg-[var(--surface-2)]'
                      : 'text-[var(--fg-dim)] hover:text-[var(--fg)] hover:bg-[var(--surface)]'
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
      className={`block px-3 py-3 rounded-[12px] text-[22px] font-display transition-colors ${
        active ? 'text-[var(--fg)] bg-[var(--surface)]' : 'text-[var(--fg-dim)] hover:text-[var(--fg)]'
      }`}
    >
      {item.label}
    </Link>
  );
}

function MobileGroup({ group, pathname }: { group: NavGroup; pathname: string }) {
  const active = group.matchPrefixes.some((p) => pathname === p || pathname.startsWith(p));
  return (
    <div>
      <div className={`px-3 py-3 text-[22px] font-display ${active ? 'text-[var(--fg)]' : 'text-[var(--fg-dim)]'}`}>
        {group.label}
      </div>
      <ul className="ml-3 pl-3 border-l border-[var(--border)] space-y-0.5">
        {group.items.map((item) => {
          const itemActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-3 py-2.5 rounded-[10px] text-[16px] transition-colors ${
                  itemActive ? 'text-[var(--fg)] bg-[var(--surface)]' : 'text-[var(--fg-dim)] hover:text-[var(--fg)]'
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
