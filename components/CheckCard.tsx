'use client';

import { motion } from 'motion/react';
import {
  FileSearch,
  ShieldCheck,
  PackageSearch,
  ScrollText,
  Wallet,
  TagIcon,
  CalendarRange,
} from 'lucide-react';
import { useStore } from '@/lib/store';
import type { CheckItem, CheckTone } from '@/lib/types';

interface Props {
  check: CheckItem;
}

const TONE_META: Record<CheckTone, { label: string; color: string; Icon: typeof FileSearch }> = {
  dossier: { label: 'Dossier', color: 'var(--ink-dim)', Icon: FileSearch },
  policy: { label: 'Beleid', color: 'var(--oker-deep)', Icon: ShieldCheck },
  inventory: { label: 'Voorraad', color: 'var(--mos)', Icon: PackageSearch },
  log: { label: 'Log', color: 'var(--steen)', Icon: ScrollText },
  credit: { label: 'Krediet', color: 'var(--terra)', Icon: Wallet },
  pricing: { label: 'Prijs', color: 'var(--oker)', Icon: TagIcon },
  planning: { label: 'Planning', color: 'var(--steen)', Icon: CalendarRange },
};

export function CheckCard({ check }: Props) {
  const agents = useStore((s) => s.agents);
  const meta = TONE_META[check.tone];
  const Icon = meta.Icon;
  const agentName = agents[check.by]?.name ?? check.by;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mx-auto w-full max-w-[560px] flex items-stretch gap-3 px-4 py-2.5 rounded-[2px] bg-[var(--paper-deep)] border border-[var(--paper-edge)]"
    >
      <div
        className="flex items-center justify-center w-7 shrink-0"
        style={{ color: meta.color }}
      >
        <Icon size={15} strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0 flex items-baseline gap-2 flex-wrap">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.14em]"
          style={{ color: meta.color }}
        >
          {meta.label} · {check.label}
        </span>
        <span className="text-[13px] text-[var(--ink)]">{check.value}</span>
      </div>
      <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-wider whitespace-nowrap self-center">
        {agentName}
      </div>
    </motion.div>
  );
}
