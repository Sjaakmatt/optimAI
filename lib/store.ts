'use client';

import { create } from 'zustand';
import type {
  Agent,
  AgentId,
  AgentStatus,
  Artifact,
  CompletedEvent,
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

type PolicyOverrideMap = Record<string, boolean>;

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
  for (const p of SAVED_MINUTES_BY_AGENT) {
    byAgent[p.agent] = { minutes: p.minuten, tasks: Math.round(p.minuten / 12) };
  }
  return {
    totalMinutesSaved: BASELINE_TOTAL_MINUTES,
    tasksCompleted: BASELINE_TASKS,
    eurosEquivalent: (BASELINE_TOTAL_MINUTES / 60) * HOURLY_RATE_EUR,
    casesHandled: 0,
    byAgent,
  };
}

type Mode = 'autonomous' | 'manual';

interface AppState {
  agents: Record<AgentId, Agent>;
  events: DemoEvent[];
  activeEventId: string | null;
  artifacts: Artifact[];
  activeAgents: AgentId[];
  statusText: string | null;
  completed: CompletedEvent[];
  mode: Mode;
  isPlaying: boolean;
  policyPanelOpen: boolean;
  roi: ROIState;
  recentlyPlayedScenarioIds: string[];

  triggerEvent: (scenarioId: string) => Promise<void>;
  playScript: (script: Script, eventId: string) => Promise<void>;
  setPolicyPanelOpen: (open: boolean) => void;
  updatePolicy: (agentId: AgentId, policyId: string, enabled: boolean) => void;
  setMode: (mode: Mode) => void;
  reset: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  agents: buildInitialAgents(),
  events: [],
  activeEventId: null,
  artifacts: [],
  activeAgents: [],
  statusText: null,
  completed: [],
  mode: 'manual',
  isPlaying: false,
  policyPanelOpen: false,
  roi: emptyROI(),
  recentlyPlayedScenarioIds: [],

  setMode: (mode) => set({ mode }),
  setPolicyPanelOpen: (open) => set({ policyPanelOpen: open }),

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
    if (get().isPlaying) return;

    const eventId = uid('evt');
    const event: DemoEvent = { ...scenario, id: eventId, timestamp: Date.now() };

    set((state) => ({
      events: [event, ...state.events],
      activeEventId: eventId,
      artifacts: [],
      activeAgents: [],
      statusText: null,
      recentlyPlayedScenarioIds: [
        scenarioId,
        ...state.recentlyPlayedScenarioIds.filter((id) => id !== scenarioId),
      ].slice(0, 5),
    }));

    await get().playScript(script, eventId);
  },

  playScript: async (script, eventId) => {
    set({ isPlaying: true });

    const setAgentStatus = (id: AgentId, status: AgentStatus) =>
      set((state) => ({
        agents: { ...state.agents, [id]: { ...state.agents[id], status } },
      }));

    const addActiveAgent = (id: AgentId) =>
      set((state) => ({
        activeAgents: state.activeAgents.includes(id)
          ? state.activeAgents
          : [...state.activeAgents, id],
      }));

    for (const step of script.steps) {
      if (step.delay) await sleep(step.delay);
      await runStep(step, eventId, setAgentStatus, addActiveAgent, set, get, script);
    }

    set({ isPlaying: false });
  },

  reset: () =>
    set(() => ({
      agents: buildInitialAgents(),
      events: [],
      artifacts: [],
      activeAgents: [],
      statusText: null,
      completed: [],
      activeEventId: null,
      isPlaying: false,
      roi: emptyROI(),
      recentlyPlayedScenarioIds: [],
    })),
}));

type SetFn = (
  partial:
    | Partial<AppState>
    | ((state: AppState) => Partial<AppState>),
) => void;
type GetFn = () => AppState;

async function runStep(
  step: ScriptStep,
  eventId: string,
  setAgentStatus: (id: AgentId, status: AgentStatus) => void,
  addActiveAgent: (id: AgentId) => void,
  set: SetFn,
  get: GetFn,
  script: Script,
) {
  switch (step.kind) {
    case 'ticket': {
      return;
    }

    case 'status.update': {
      if (step.statusText !== undefined) {
        set({ statusText: step.statusText });
      }
      return;
    }

    case 'pickup': {
      if (step.by) {
        setAgentStatus(step.by, 'acting');
        addActiveAgent(step.by);
      }
      return;
    }

    case 'artifact.start': {
      if (!step.artifactId || !step.artifactType) return;
      const agentId = findLatestAgent(get);
      const artifact: Artifact = {
        id: step.artifactId,
        eventId,
        type: step.artifactType,
        meta: step.meta ?? {},
        content: emptyContent(step.artifactType),
        state: 'filling',
        agent: agentId,
        startedAt: Date.now(),
      };
      set((state) => ({ artifacts: [...state.artifacts, artifact] }));
      return;
    }

    case 'artifact.fill': {
      if (!step.artifactId) return;
      set((state) => ({
        artifacts: state.artifacts.map((a) => {
          if (a.id !== step.artifactId) return a;
          return { ...a, content: applyFill(a.content, step) };
        }),
      }));
      return;
    }

    case 'artifact.done': {
      if (!step.artifactId) return;
      set((state) => ({
        artifacts: state.artifacts.map((a) =>
          a.id === step.artifactId
            ? {
                ...a,
                state: 'complete',
                footer: step.footer,
                completedAt: Date.now(),
                minutesSaved: step.minutesSaved,
              }
            : a,
        ),
      }));
      if (step.minutesSaved) {
        const agentId = findLatestAgent(get);
        if (agentId) incrementROI(set, get, agentId, step.minutesSaved);
      }
      return;
    }

    case 'complete': {
      const state = get();
      const artifacts = state.artifacts.filter((a) => a.eventId === eventId);
      const completedItem: CompletedEvent = {
        id: eventId,
        title: script.eventTitle,
        context: script.eventContext,
        completedAt: Date.now(),
        minutesSaved: step.totalMinutes ?? script.minutesSaved,
        artifactCount: artifacts.length,
      };
      // Reset idle status on agents
      for (const id of state.activeAgents) {
        setAgentStatus(id, 'idle');
      }
      set((s) => ({
        completed: [completedItem, ...s.completed],
        roi: { ...s.roi, casesHandled: s.roi.casesHandled + 1 },
        activeEventId: null,
        artifacts: [],
        activeAgents: [],
        statusText: null,
      }));
      return;
    }
  }
}

function findLatestAgent(get: GetFn): AgentId | undefined {
  const arr = get().activeAgents;
  return arr.length ? arr[arr.length - 1] : undefined;
}

function emptyContent(type: Artifact['type']): Artifact['content'] {
  switch (type) {
    case 'email':
      return { paragraphs: [] };
    case 'invoice':
      return { lines: [] };
    case 'callnote':
      return { bullets: [] };
    case 'order-confirmation':
      return { items: [] };
    case 'quote':
      return { lines: [] };
    case 'memo':
      return { bullets: [] };
    case 'whatsapp':
      return { messages: [] };
  }
}

function applyFill(content: Artifact['content'], step: ScriptStep): Artifact['content'] {
  switch (step.target) {
    case 'paragraph':
      if (!step.paragraph) return content;
      return { ...content, paragraphs: [...(content.paragraphs ?? []), step.paragraph] };
    case 'line':
      if (!step.line) return content;
      return { ...content, lines: [...(content.lines ?? []), step.line] };
    case 'bullet-section':
      if (!step.bulletSection) return content;
      return { ...content, bullets: [...(content.bullets ?? []), step.bulletSection] };
    case 'item':
      if (!step.item) return content;
      return { ...content, items: [...(content.items ?? []), step.item] };
    case 'message':
      if (!step.message) return content;
      return { ...content, messages: [...(content.messages ?? []), step.message] };
    default:
      return content;
  }
}

function incrementROI(set: SetFn, get: GetFn, agentId: AgentId, minutes: number) {
  const state = get();
  const prev = state.roi.byAgent[agentId] ?? { minutes: 0, tasks: 0 };
  const byAgent = {
    ...state.roi.byAgent,
    [agentId]: { minutes: prev.minutes + minutes, tasks: prev.tasks + 1 },
  };
  const totalMinutesSaved = state.roi.totalMinutesSaved + minutes;
  set({
    roi: {
      ...state.roi,
      byAgent,
      totalMinutesSaved,
      tasksCompleted: state.roi.tasksCompleted + 1,
      eurosEquivalent: (totalMinutesSaved / 60) * HOURLY_RATE_EUR,
    },
  });
}

export const ALL_SCENARIOS = SCENARIOS;
