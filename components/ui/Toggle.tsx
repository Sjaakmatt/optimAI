'use client';

import clsx from 'clsx';

interface Props {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
  ariaLabel?: string;
}

export function Toggle({ checked, onChange, label, ariaLabel }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel ?? label}
      onClick={() => onChange(!checked)}
      className={clsx(
        'relative inline-flex h-[20px] w-[34px] shrink-0 items-center rounded-full border transition-colors',
        checked
          ? 'bg-[color:rgba(212,168,87,0.18)] border-[var(--accent)]'
          : 'bg-[var(--bg-elev-2)] border-[var(--border-hot)]',
      )}
    >
      <span
        className={clsx(
          'inline-block h-[14px] w-[14px] rounded-full transition-all',
          checked
            ? 'translate-x-[17px] bg-[var(--accent)]'
            : 'translate-x-[3px] bg-[var(--text-faint)]',
        )}
      />
    </button>
  );
}
