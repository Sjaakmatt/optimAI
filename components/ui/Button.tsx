'use client';

import clsx from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'danger';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

const base =
  'inline-flex items-center gap-2 px-3 py-1.5 text-[13px] tracking-wide rounded-sm border transition-colors disabled:opacity-40 disabled:cursor-not-allowed';

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--bg-elev-2)] border-[var(--accent-dim)] text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[color:rgba(212,168,87,0.08)]',
  ghost:
    'bg-transparent border-[var(--border)] text-[var(--text-dim)] hover:text-[var(--text)] hover:border-[var(--border-hot)]',
  danger:
    'bg-transparent border-[color:rgba(196,99,74,0.35)] text-[var(--signal-red)] hover:border-[var(--signal-red)]',
};

export function Button({ variant = 'ghost', className, children, ...rest }: Props) {
  return (
    <button className={clsx(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}
