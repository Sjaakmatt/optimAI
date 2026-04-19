'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '@/lib/store';
import { AGENT_ORDER } from '@/lib/agents/definitions';
import type { AgentId } from '@/lib/types';
import { EventTrigger } from './EventTrigger';

// SVG layout constants
const W = 760;
const H = 280;
const DIRIGENT_X = W / 2;
const DIRIGENT_Y = 50;
const AGENTS_Y = 220;

const AGENTS = AGENT_ORDER; // 7 afdelingen (orchestrator niet meegeteld)

function agentX(index: number) {
  const count = AGENTS.length;
  const margin = 60;
  const usable = W - margin * 2;
  return margin + (index / (count - 1)) * usable;
}

export function AgentDiagram() {
  const agents = useStore((s) => s.agents);
  const activeAgents = useStore((s) => s.activeAgents);
  const statusText = useStore((s) => s.statusText);
  const isPlaying = useStore((s) => s.isPlaying);

  // Track which agents were newly added to trigger a one-shot pulse animation
  const [pulsingAgent, setPulsingAgent] = useState<AgentId | null>(null);
  const prevActiveRef = useRef<AgentId[]>([]);

  useEffect(() => {
    const prev = prevActiveRef.current;
    const fresh = activeAgents.find((id) => !prev.includes(id));
    if (fresh) {
      setPulsingAgent(fresh);
      const t = setTimeout(() => setPulsingAgent(null), 1400);
      prevActiveRef.current = activeAgents;
      return () => clearTimeout(t);
    }
    prevActiveRef.current = activeAgents;
  }, [activeAgents]);

  return (
    <section className="mx-auto w-full max-w-[820px] px-2">
      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          aria-hidden
        >
          {/* Fan connectors from Dirigent to each agent */}
          {AGENTS.map((id, i) => {
            const x2 = agentX(i);
            const active = activeAgents.includes(id);
            const pulse = pulsingAgent === id;
            return (
              <g key={id}>
                <line
                  x1={DIRIGENT_X}
                  y1={DIRIGENT_Y + 38}
                  x2={x2}
                  y2={AGENTS_Y - 22}
                  stroke={active ? 'var(--oker)' : 'var(--paper-edge)'}
                  strokeWidth={active ? 1.5 : 1}
                  style={{ transition: 'stroke 500ms ease, stroke-width 500ms ease' }}
                />
                {pulse && (
                  <motion.circle
                    r={4}
                    fill="var(--oker)"
                    initial={{
                      cx: DIRIGENT_X,
                      cy: DIRIGENT_Y + 38,
                      opacity: 1,
                    }}
                    animate={{
                      cx: x2,
                      cy: AGENTS_Y - 22,
                      opacity: [1, 1, 0],
                    }}
                    transition={{ duration: 1.1, ease: 'easeInOut' }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Dirigent kaart (geabsoluut overlayed) */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: `${(DIRIGENT_Y / H) * 100}%`, transform: 'translate(-50%, -50%)' }}
        >
          <DirigentCard statusText={statusText} isPlaying={isPlaying} />
        </div>

        {/* Agent kaarten (geabsoluut overlayed) */}
        {AGENTS.map((id, i) => {
          const active = activeAgents.includes(id);
          const agent = agents[id];
          return (
            <div
              key={id}
              className="absolute -translate-x-1/2"
              style={{
                left: `${(agentX(i) / W) * 100}%`,
                top: `${(AGENTS_Y / H) * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <AgentChip name={agent.name} role={agent.role} active={active} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function DirigentCard({
  statusText,
  isPlaying,
}: {
  statusText: string | null;
  isPlaying: boolean;
}) {
  return (
    <div className="artifact-card artifact-card--lift px-5 py-4 w-[300px] text-center">
      <div className="font-mono text-[10px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
        De Dirigent
      </div>
      <div className="font-display text-[15px] text-[var(--ink)] italic mt-0.5 min-h-[22px]">
        <AnimatePresence mode="wait">
          <motion.span
            key={statusText ?? 'idle'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {isPlaying && statusText ? statusText : 'coördineert het werk'}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="mt-3 flex justify-center">
        <EventTrigger />
      </div>
    </div>
  );
}

function AgentChip({
  name,
  role,
  active,
}: {
  name: string;
  role: string;
  active: boolean;
}) {
  return (
    <motion.div
      animate={{
        scale: active ? 1.04 : 1,
      }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="px-3 py-2 rounded-[2px] border text-center min-w-[92px] max-w-[110px]"
      style={{
        background: active ? 'var(--paper)' : 'var(--paper-deep)',
        borderColor: active ? 'var(--oker)' : 'var(--paper-edge)',
        boxShadow: active ? 'var(--shadow-soft)' : 'none',
        transition: 'background 450ms ease, border-color 450ms ease, box-shadow 450ms ease',
      }}
    >
      <div
        className="font-display text-[13px] leading-tight"
        style={{ color: active ? 'var(--ink)' : 'var(--ink-dim)' }}
      >
        {name}
      </div>
      <div className="font-mono text-[9px] text-[var(--ink-faint)] uppercase tracking-wider mt-0.5 truncate">
        {role.split(' — ')[0].split(',')[0]}
      </div>
    </motion.div>
  );
}
