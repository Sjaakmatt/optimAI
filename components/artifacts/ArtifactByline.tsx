'use client';

import { useStore } from '@/lib/store';
import type { AgentId } from '@/lib/types';

interface Props {
  agent?: AgentId;
  startedAt: number;
  className?: string;
}

export function ArtifactByline({ agent, startedAt, className = '' }: Props) {
  const agents = useStore((s) => s.agents);
  if (!agent) return null;
  const name = agents[agent].name;
  const d = new Date(startedAt);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');

  return (
    <div
      className={`font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.14em] ${className}`}
    >
      Geschreven door {name} · {hh}:{mm}
    </div>
  );
}
