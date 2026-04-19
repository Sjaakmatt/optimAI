'use client';

import clsx from 'clsx';

type Mode = 'autonomous' | 'manual';

interface Props {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

const OPTIONS: { value: Mode; label: string }[] = [
  { value: 'manual', label: 'Handmatig' },
  { value: 'autonomous', label: 'Autonoom' },
];

export function ModeSwitch({ mode, onChange }: Props) {
  return (
    <div className="inline-flex rounded-sm border border-[var(--border-hot)] bg-[var(--bg-elev-2)] p-[2px]">
      {OPTIONS.map((opt) => {
        const active = opt.value === mode;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={clsx(
              'px-3 py-1 text-[12px] tracking-wide transition-colors rounded-[2px]',
              active
                ? 'bg-[color:rgba(212,168,87,0.14)] text-[var(--accent)]'
                : 'text-[var(--text-dim)] hover:text-[var(--text)]',
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
