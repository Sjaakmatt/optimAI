'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '@/lib/store';
import { AGENT_ORDER } from '@/lib/agents/definitions';
import type { AgentId } from '@/lib/types';
import { EventTrigger } from './EventTrigger';

// Eén coördinaten-systeem voor SVG én HTML overlays
const W = 720;
const H = 210;

const DIRIGENT_CX = W / 2;
const DIRIGENT_CY = 52;
const DIRIGENT_BOTTOM = 104;

const BUS_Y = 140;
const CHIP_TOP = 162;
const CHIP_CY = 180;

const CHIPS_MARGIN = 36;

const AGENTS = AGENT_ORDER;

function chipCX(index: number) {
  const count = AGENTS.length;
  const usable = W - CHIPS_MARGIN * 2;
  return CHIPS_MARGIN + (index / (count - 1)) * usable;
}

export function AgentDiagram() {
  const agents = useStore((s) => s.agents);
  const activeAgents = useStore((s) => s.activeAgents);
  const statusText = useStore((s) => s.statusText);
  const isPlaying = useStore((s) => s.isPlaying);

  const [pulsingAgent, setPulsingAgent] = useState<AgentId | null>(null);
  const prevActiveRef = useRef<AgentId[]>([]);

  useEffect(() => {
    const prev = prevActiveRef.current;
    const fresh = activeAgents.find((id) => !prev.includes(id));
    if (fresh) {
      setPulsingAgent(fresh);
      const t = setTimeout(() => setPulsingAgent(null), 1100);
      prevActiveRef.current = activeAgents;
      return () => clearTimeout(t);
    }
    prevActiveRef.current = activeAgents;
  }, [activeAgents]);

  const busLeft = chipCX(0);
  const busRight = chipCX(AGENTS.length - 1);
  const centralActive = isPlaying;

  return (
    <section className="mx-auto w-full max-w-[820px]">
      <div className="relative" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="absolute inset-0 w-full h-full"
          aria-hidden
        >
          {/* Verticaal van Dirigent naar bus */}
          <line
            x1={DIRIGENT_CX}
            y1={DIRIGENT_BOTTOM}
            x2={DIRIGENT_CX}
            y2={BUS_Y}
            stroke={centralActive ? 'var(--oker)' : 'var(--paper-edge)'}
            strokeWidth={1}
            style={{ transition: 'stroke 500ms ease' }}
          />
          {/* Horizontale bus */}
          <line
            x1={busLeft}
            y1={BUS_Y}
            x2={busRight}
            y2={BUS_Y}
            stroke="var(--paper-edge)"
            strokeWidth={1}
          />
          {/* Stubs naar elke chip + pulse */}
          {AGENTS.map((id, i) => {
            const cx = chipCX(i);
            const active = activeAgents.includes(id);
            const pulse = pulsingAgent === id;
            return (
              <g key={id}>
                <line
                  x1={cx}
                  y1={BUS_Y}
                  x2={cx}
                  y2={CHIP_TOP}
                  stroke={active ? 'var(--oker)' : 'var(--paper-edge)'}
                  strokeWidth={active ? 1.4 : 1}
                  style={{ transition: 'stroke 500ms ease, stroke-width 500ms ease' }}
                />
                {/* Kleine knoop op de bus */}
                <circle
                  cx={cx}
                  cy={BUS_Y}
                  r={2}
                  fill={active ? 'var(--oker)' : 'var(--paper-edge)'}
                  style={{ transition: 'fill 500ms ease' }}
                />
                {pulse && (
                  <motion.circle
                    cx={cx}
                    r={3}
                    fill="var(--oker)"
                    initial={{ cy: BUS_Y, opacity: 1 }}
                    animate={{ cy: CHIP_TOP, opacity: [1, 1, 0] }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                  />
                )}
              </g>
            );
          })}
          {/* Knoop onder Dirigent en in T-kruising */}
          <circle
            cx={DIRIGENT_CX}
            cy={BUS_Y}
            r={2.5}
            fill={centralActive ? 'var(--oker)' : 'var(--paper-edge)'}
            style={{ transition: 'fill 500ms ease' }}
          />
        </svg>

        {/* Dirigent-kaart */}
        <div
          className="absolute"
          style={{
            left: `${(DIRIGENT_CX / W) * 100}%`,
            top: `${(DIRIGENT_CY / H) * 100}%`,
            width: '380px',
            maxWidth: '90%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <DirigentCard statusText={statusText} isPlaying={isPlaying} />
        </div>

        {/* Chips */}
        {AGENTS.map((id, i) => {
          const active = activeAgents.includes(id);
          const agent = agents[id];
          const cx = chipCX(i);
          return (
            <div
              key={id}
              className="absolute"
              style={{
                left: `${(cx / W) * 100}%`,
                top: `${(CHIP_CY / H) * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <AgentChip name={agent.name} active={active} />
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
    <div className="artifact-card artifact-card--lift px-7 py-5">
      <div className="flex items-center justify-between gap-6">
        <div className="text-left min-w-0">
          <div className="font-mono text-[10px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
            De Dirigent
          </div>
          <div className="font-display italic text-[14px] text-[var(--ink-dim)] leading-snug mt-1 min-h-[20px] min-w-[180px] max-w-[260px]">
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
        </div>
        <div className="shrink-0">
          <EventTrigger />
        </div>
      </div>
    </div>
  );
}

function AgentChip({ name, active }: { name: string; active: boolean }) {
  return (
    <motion.div
      animate={{ scale: active ? 1.04 : 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="px-3 py-1.5 rounded-[2px] border"
      style={{
        background: active ? 'var(--paper)' : 'var(--paper-deep)',
        borderColor: active ? 'var(--oker)' : 'var(--paper-edge)',
        boxShadow: active ? 'var(--shadow-soft)' : 'none',
        transition: 'background 450ms ease, border-color 450ms ease, box-shadow 450ms ease',
      }}
    >
      <div
        className="font-display text-[12.5px] leading-none whitespace-nowrap"
        style={{ color: active ? 'var(--ink)' : 'var(--ink-dim)' }}
      >
        {name}
      </div>
    </motion.div>
  );
}
