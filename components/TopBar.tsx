'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RotateCcw } from 'lucide-react';
import clsx from 'clsx';
import { useStore } from '@/lib/store';
import { ModeSwitch } from '@/components/ui/ModeSwitch';
import { Button } from '@/components/ui/Button';

const NAV = [
  { href: '/', label: 'Control Room' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/policy', label: 'Policy' },
];

export function TopBar() {
  const pathname = usePathname();
  const mode = useStore((s) => s.mode);
  const setMode = useStore((s) => s.setMode);
  const reset = useStore((s) => s.reset);
  const isPlaying = useStore((s) => s.isPlaying);

  return (
    <header className="h-14 border-b border-[var(--border)] bg-[var(--bg-elev)] relative z-10">
      <div className="h-full px-3 sm:px-5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <div className="flex items-baseline gap-3 shrink-0">
            <span className="font-display text-[20px] sm:text-[22px] leading-none text-[var(--text)]">
              FactumAI
            </span>
            <span className="hidden lg:inline font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--text-faint)]">
              Control Room · Nordveld
            </span>
          </div>
          <nav className="flex items-center gap-0.5 sm:gap-1">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'px-2 sm:px-3 py-1.5 text-[12px] tracking-wide rounded-sm transition-colors whitespace-nowrap',
                    active
                      ? 'text-[var(--accent)] bg-[color:rgba(212,168,87,0.08)]'
                      : 'text-[var(--text-dim)] hover:text-[var(--text)]',
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-2">
            <span
              className={clsx(
                'h-[7px] w-[7px] rounded-full',
                isPlaying ? 'bg-[var(--signal-amber)] node-pulse' : 'bg-[var(--text-faint)]',
              )}
            />
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--text-faint)]">
              {isPlaying ? 'Live' : 'Stand-by'}
            </span>
          </div>
          <ModeSwitch mode={mode} onChange={setMode} />
          <Button
            variant="ghost"
            onClick={() => reset()}
            aria-label="Reset demo"
            className="px-2"
          >
            <RotateCcw size={14} />
            <span className="hidden sm:inline">Reset</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
