'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import clsx from 'clsx';
import { useStore } from '@/lib/store';
import { AGENT_ORDER, AGENT_DEFINITIONS } from '@/lib/agents/definitions';
import type { AgentId, AgentStatus } from '@/lib/types';

const SIZE = 560;
const CENTER = SIZE / 2;
const RING_RADIUS = 210;
const NODE_RADIUS = 34;
const CENTER_RADIUS = 48;

interface NodePos {
  id: AgentId;
  x: number;
  y: number;
}

function computePositions(): NodePos[] {
  const positions: NodePos[] = [{ id: 'orchestrator', x: CENTER, y: CENTER }];
  const n = AGENT_ORDER.length;
  AGENT_ORDER.forEach((id, i) => {
    // Start bovenaan, met de klok mee
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    positions.push({
      id,
      x: CENTER + Math.cos(angle) * RING_RADIUS,
      y: CENTER + Math.sin(angle) * RING_RADIUS,
    });
  });
  return positions;
}

function statusTone(status: AgentStatus) {
  switch (status) {
    case 'thinking':
      return {
        ring: 'var(--signal-amber)',
        fill: 'rgba(224,162,79,0.14)',
        text: 'var(--signal-amber)',
        pulse: true,
      };
    case 'acting':
      return {
        ring: 'var(--accent)',
        fill: 'rgba(212,168,87,0.18)',
        text: 'var(--accent)',
        pulse: false,
      };
    case 'escalated':
      return {
        ring: 'var(--signal-red)',
        fill: 'rgba(196,99,74,0.14)',
        text: 'var(--signal-red)',
        pulse: true,
      };
    case 'handoff':
      return {
        ring: 'var(--signal-green)',
        fill: 'rgba(127,182,133,0.14)',
        text: 'var(--signal-green)',
        pulse: false,
      };
    default:
      return {
        ring: 'var(--border-hot)',
        fill: 'var(--bg-elev-2)',
        text: 'var(--text-dim)',
        pulse: false,
      };
  }
}

export function AgentNetwork() {
  const agents = useStore((s) => s.agents);
  const activeLinks = useStore((s) => s.activeLinks);

  const positions = useMemo(computePositions, []);
  const posById = useMemo(() => {
    const map: Record<string, NodePos> = {};
    for (const p of positions) map[p.id] = p;
    return map;
  }, [positions]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 scanline pointer-events-none opacity-60" />

      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full h-full max-w-[620px] max-h-[620px]"
        aria-label="Agent netwerk"
      >
        <defs>
          <radialGradient id="orch-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(212,168,87,0.18)" />
            <stop offset="100%" stopColor="rgba(212,168,87,0)" />
          </radialGradient>
          <filter id="soft-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Idle lijnen orchestrator -> elke sub-agent */}
        {AGENT_ORDER.map((id) => {
          const p = posById[id];
          return (
            <line
              key={`idle-${id}`}
              x1={CENTER}
              y1={CENTER}
              x2={p.x}
              y2={p.y}
              stroke="var(--border)"
              strokeWidth={1}
            />
          );
        })}

        {/* Actieve lijnen */}
        <AnimatePresence>
          {activeLinks.map((link) => {
            const from = posById[link.from];
            if (!from) return null;

            if (link.to === 'broadcast') {
              return (
                <motion.g
                  key={link.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {AGENT_ORDER.map((id) => {
                    const to = posById[id];
                    return (
                      <line
                        key={`bc-${link.id}-${id}`}
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                        stroke="var(--accent)"
                        strokeWidth={1.2}
                        strokeOpacity={0.55}
                        className="dash-flow"
                      />
                    );
                  })}
                </motion.g>
              );
            }

            const to = posById[link.to];
            if (!to) return null;
            return (
              <motion.line
                key={link.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="var(--accent)"
                strokeWidth={1.5}
                className="dash-flow"
              />
            );
          })}
        </AnimatePresence>

        {/* Orchestrator glow */}
        <circle cx={CENTER} cy={CENTER} r={CENTER_RADIUS + 32} fill="url(#orch-glow)" />

        {/* Nodes */}
        {positions.map((p) => {
          const agent = agents[p.id];
          const isCenter = p.id === 'orchestrator';
          const r = isCenter ? CENTER_RADIUS : NODE_RADIUS;
          const tone = statusTone(agent.status);

          return (
            <g key={p.id}>
              {tone.pulse && (
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r={r + 4}
                  fill="none"
                  stroke={tone.ring}
                  strokeOpacity={0.5}
                  strokeWidth={1.2}
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 1.35, opacity: 0 }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                  style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                />
              )}
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={r}
                fill={tone.fill}
                stroke={tone.ring}
                strokeWidth={isCenter ? 1.6 : 1.3}
                animate={{ strokeWidth: agent.status === 'acting' ? 2 : 1.3 }}
                transition={{ duration: 0.2 }}
                filter={agent.status === 'acting' ? 'url(#soft-glow)' : undefined}
              />
              <text
                x={p.x}
                y={isCenter ? p.y - 4 : p.y - 2}
                textAnchor="middle"
                fill={tone.text}
                className="font-display"
                fontSize={isCenter ? 17 : 13}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {isCenter ? 'De Dirigent' : AGENT_DEFINITIONS[p.id].name}
              </text>
              <text
                x={p.x}
                y={isCenter ? p.y + 12 : p.y + 12}
                textAnchor="middle"
                fill="var(--text-faint)"
                fontSize={9}
                style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.14em' }}
              >
                {isCenter ? 'ORCHESTRATOR' : agent.status.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legenda */}
      <div className="absolute bottom-3 left-3 flex items-center gap-3 font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--text-faint)]">
        <LegendDot color="var(--border-hot)" label="Idle" />
        <LegendDot color="var(--signal-amber)" label="Denkt" />
        <LegendDot color="var(--accent)" label="Acteert" />
        <LegendDot color="var(--signal-red)" label="Escalatie" />
      </div>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={clsx('h-[7px] w-[7px] rounded-full inline-block')}
        style={{ backgroundColor: color }}
      />
      <span>{label}</span>
    </div>
  );
}
