'use client';

import { create } from 'zustand';
import type {
  ActiveLink,
  Agent,
  AgentId,
  AgentMessage,
  AgentStatus,
  DemoEvent,
  ROIState,
  Script,
  ScriptStep,
} from '@/lib/types';
import { AGENT_DEFINITIONS, ALL_AGENTS } from '@/lib/agents/definitions';
import { SCENARIO_BY_ID, SCENARIOS } from '@/lib/data/scenarios';
import { SCRIPTS } from '@/lib/data/scripts';
import {
  BASELINE_TASKS,
  BASELINE_TOTAL_MINUTES,
  SAVED_MINUTES_BY_AGENT,
} from '@/lib/data/mockHistory';
import { HOURLY_RATE_EUR, sleep, uid } from '@/lib/utils';

const POLICY_STORAGE_KEY = 'factumai.policies.v1';

type PolicyOverrideMap = Record<string, boolean>; // key = `${agentId}:${policyId}`

function loadPolicyOverrides(): PolicyOverrideMap {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(POLICY_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as PolicyOverrideMap;
  } catch {
    return {};
  }
}

function persistPolicyOverrides(overrides: PolicyOverrideMap) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(POLICY_STORAGE_KEY, JSON.stringify(overrides));
  } catch {
    /* ignore */
  }
}

function buildInitialAgents(): Record<AgentId, Agent> {
  const overrides = loadPolicyOverrides();
  const agents: Record<AgentId, Agent> = {} as Record<AgentId, Agent>;
  for (const id of ALL_AGENTS) {
    const base = AGENT_DEFINITIONS[id];
    agents[id] = {
      ...base,
      status: 'idle',
      policies: base.policies.map((p) => {
        const key = `${id}:${p.id}`;
        return key in overrides ? { ...p, enabled: overrides[key] } : { ...p };
      }),
    };
  }
  return agents;
}

function emptyROI(): ROIState {
  const byAgent = {} as Record<AgentId, { minutes: number; tasks: number }>;
  for (const id of ALL_AGENTS) {
    byAgent[id] = { minutes: 0, tasks: 0 };
  }
  // Baseline vullen zodat dashboard gelijk levende getallen heeft.
  for (const p of SAVED_MINUTES_BY_AGENT) {
    byAgent[p.agent] = { minutes: p.minuten, tasks: Math.round(p.minuten / 12) };
  }
  return {
    totalMinutesSaved: BASELINE_TOTAL_MINUTES,
    tasksCompleted: BASELINE_TASKS,
    eurosEquivalent: (BASELINE_TOTAL_MINUTES / 60) * HOURLY_RATE_EUR,
    byAgent,
  };
}

type Mode = 'autonomous' | 'manual';

interface AppState {
  agents: Record<AgentId, Agent>;
  events: DemoEvent[];
  messages: AgentMessage[];
  activeEventId: string | null;
  activeLinks: ActiveLink[];
  mode: Mode;
  isPlaying: boolean;
  roi: ROIState;
  recentlyPlayedScenarioIds: string[];

  triggerEvent: (scenarioId: string) => Promise<void>;
  playScript: (script: Script, eventId: string) => Promise<void>;
  updateAgentStatus: (id: AgentId, status: AgentStatus) => void;
  appendMessage: (msg: Omit<AgentMessage, 'id'>) => string;
  updateMessage: (id: string, partial: Partial<AgentMessage>) => void;
  addActiveLink: (link: Omit<ActiveLink, 'id' | 'createdAt'>) => string;
  removeActiveLink: (id: string) => void;
  incrementROI: (agentId: AgentId, minutes: number) => void;
  updatePolicy: (agentId: AgentId, policyId: string, enabled: boolean) => void;
  setMode: (mode: Mode) => void;
  reset: () => void;
  setActiveEvent: (id: string | null) => void;
}

export const useStore = create<AppState>((set, get) => ({
  agents: buildInitialAgents(),
  events: [],
  messages: [],
  activeEventId: null,
  activeLinks: [],
  mode: 'manual',
  isPlaying: false,
  roi: emptyROI(),
  recentlyPlayedScenarioIds: [],

  setActiveEvent: (id) => set({ activeEventId: id }),

  setMode: (mode) => set({ mode }),

  updateAgentStatus: (id, status) =>
    set((state) => ({
      agents: { ...state.agents, [id]: { ...state.agents[id], status } },
    })),

  appendMessage: (msg) => {
    const id = uid('msg');
    const full: AgentMessage = { id, ...msg };
    set((state) => ({ messages: [...state.messages, full] }));
    return id;
  },

  updateMessage: (id, partial) =>
    set((state) => ({
      messages: state.messages.map((m) => (m.id === id ? { ...m, ...partial } : m)),
    })),

  addActiveLink: (link) => {
    const id = uid('link');
    const full: ActiveLink = { id, createdAt: Date.now(), ...link };
    set((state) => ({ activeLinks: [...state.activeLinks, full] }));
    return id;
  },

  removeActiveLink: (id) =>
    set((state) => ({ activeLinks: state.activeLinks.filter((l) => l.id !== id) })),

  incrementROI: (agentId, minutes) =>
    set((state) => {
      const prev = state.roi.byAgent[agentId] ?? { minutes: 0, tasks: 0 };
      const byAgent = {
        ...state.roi.byAgent,
        [agentId]: { minutes: prev.minutes + minutes, tasks: prev.tasks + 1 },
      };
      const totalMinutesSaved = state.roi.totalMinutesSaved + minutes;
      return {
        roi: {
          ...state.roi,
          byAgent,
          totalMinutesSaved,
          tasksCompleted: state.roi.tasksCompleted + 1,
          eurosEquivalent: (totalMinutesSaved / 60) * HOURLY_RATE_EUR,
        },
      };
    }),

  updatePolicy: (agentId, policyId, enabled) => {
    const overrides = loadPolicyOverrides();
    overrides[`${agentId}:${policyId}`] = enabled;
    persistPolicyOverrides(overrides);
    set((state) => {
      const agent = state.agents[agentId];
      const updatedPolicies = agent.policies.map((p) =>
        p.id === policyId ? { ...p, enabled } : p,
      );
      return {
        agents: { ...state.agents, [agentId]: { ...agent, policies: updatedPolicies } },
      };
    });
  },

  triggerEvent: async (scenarioId) => {
    const scenario = SCENARIO_BY_ID[scenarioId];
    if (!scenario) return;
    const script = SCRIPTS[scenario.scriptId];
    if (!script) return;

    const eventId = uid('evt');
    const event: DemoEvent = { ...scenario, id: eventId, timestamp: Date.now() };

    set((state) => ({
      events: [event, ...state.events],
      activeEventId: eventId,
      recentlyPlayedScenarioIds: [
        scenarioId,
        ...state.recentlyPlayedScenarioIds.filter((id) => id !== scenarioId),
      ].slice(0, 5),
    }));

    await get().playScript(script, eventId);
  },

  playScript: async (script, eventId) => {
    set({ isPlaying: true });

    const runStep = async (step: ScriptStep) => {
      get().updateAgentStatus(step.from, 'thinking');
      await sleep(200 + Math.random() * 250);
      get().updateAgentStatus(step.from, 'acting');
      if (step.to !== 'broadcast') {
        get().updateAgentStatus(step.to, 'thinking');
      }

      const linkId = get().addActiveLink({ from: step.from, to: step.to });

      const msgId = get().appendMessage({
        eventId,
        from: step.from,
        to: step.to,
        kind: step.kind,
        content: '',
        fullContent: step.text,
        status: 'streaming',
        minutesSaved: step.minutesSaved,
        timestamp: Date.now(),
      });

      const speed = step.typingSpeed ?? 20;
      const text = step.text;
      for (let c = 0; c < text.length; c++) {
        const char = text[c];
        const baseDelay = speed + (Math.random() * 10 - 5);
        const extra = char === ',' || char === '.' || char === ':' ? 70 : 0;
        await sleep(baseDelay + extra);
        get().updateMessage(msgId, { content: text.substring(0, c + 1) });
      }

      get().updateMessage(msgId, { status: 'complete' });

      if (step.minutesSaved) {
        get().incrementROI(step.from, step.minutesSaved);
      }

      await sleep(280);
      get().removeActiveLink(linkId);
      get().updateAgentStatus(step.from, 'idle');
      if (step.to !== 'broadcast') {
        get().updateAgentStatus(step.to, 'idle');
      }
    };

    for (let i = 0; i < script.steps.length; i++) {
      const step = script.steps[i];
      if (step.parallel && i > 0) {
        // Fire parallel zonder op de pre-delay te wachten.
        void runStep(step);
        await sleep(step.delayBefore);
        continue;
      }
      await sleep(step.delayBefore);
      await runStep(step);
    }

    set({ isPlaying: false });
  },

  reset: () =>
    set(() => ({
      agents: buildInitialAgents(),
      events: [],
      messages: [],
      activeEventId: null,
      activeLinks: [],
      isPlaying: false,
      roi: emptyROI(),
      recentlyPlayedScenarioIds: [],
    })),
}));

export const ALL_SCENARIOS = SCENARIOS;
