'use client';

import { create } from 'zustand';
import type {
  Agent,
  AgentId,
  AgentStatus,
  Artifact,
  CheckItem,
  CockpitState,
  CompletedEvent,
  DemoEvent,
  ROIState,
  ReasoningItem,
  Script,
  ScriptStep,
  StageItem,
  WorkItem,
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

function initialCockpit(): CockpitState {
  return {
    orders: 12,
    stockMutations: 34,
    routesPlanned: 5,
    mails: 47,
    revenue: 18420,
  };
}

type Mode = 'autonomous' | 'manual';

interface AppState {
  agents: Record<AgentId, Agent>;
  events: DemoEvent[];
  activeEventId: string | null;
  stageItems: StageItem[];
  activeAgents: AgentId[];
  statusText: string | null;
  completed: CompletedEvent[];
  viewingCompletedId: string | null;
  workItems: WorkItem[];
  openInboxFor: AgentId | null;
  mode: Mode;
  isPlaying: boolean;
  policyPanelOpen: boolean;
  roi: ROIState;
  cockpit: CockpitState;
  recentlyPlayedScenarioIds: string[];

  triggerEvent: (scenarioId: string) => Promise<void>;
  playScript: (script: Script, eventId: string) => Promise<void>;
  setPolicyPanelOpen: (open: boolean) => void;
  updatePolicy: (agentId: AgentId, policyId: string, enabled: boolean) => void;
  setMode: (mode: Mode) => void;
  setViewingCompletedId: (id: string | null) => void;
  setOpenInboxFor: (id: AgentId | null) => void;
  completeWorkItem: (id: string) => void;
  reset: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  agents: buildInitialAgents(),
  events: [],
  activeEventId: null,
  stageItems: [],
  activeAgents: [],
  statusText: null,
  completed: [],
  viewingCompletedId: null,
  workItems: [],
  openInboxFor: null,
  mode: 'manual',
  isPlaying: false,
  policyPanelOpen: false,
  roi: emptyROI(),
  cockpit: initialCockpit(),
  recentlyPlayedScenarioIds: [],

  setMode: (mode) => set({ mode }),
  setPolicyPanelOpen: (open) => set({ policyPanelOpen: open }),
  setViewingCompletedId: (id) => set({ viewingCompletedId: id }),
  setOpenInboxFor: (id) => set({ openInboxFor: id }),
  completeWorkItem: (id) =>
    set((state) => ({
      workItems: state.workItems.map((w) =>
        w.id === id ? { ...w, status: 'completed', completedAt: Date.now() } : w,
      ),
    })),

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
      viewingCompletedId: null,
      stageItems: [],
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

    for (const step of script.steps) {
      if (step.delay) await sleep(step.delay);
      await runStep(step, eventId, set, get, script);
    }

    set({ isPlaying: false });
  },

  reset: () =>
    set(() => ({
      agents: buildInitialAgents(),
      events: [],
      stageItems: [],
      activeAgents: [],
      statusText: null,
      completed: [],
      viewingCompletedId: null,
      workItems: [],
      openInboxFor: null,
      activeEventId: null,
      isPlaying: false,
      roi: emptyROI(),
      cockpit: initialCockpit(),
      recentlyPlayedScenarioIds: [],
    })),
}));

type SetFn = (
  partial: Partial<AppState> | ((state: AppState) => Partial<AppState>),
) => void;
type GetFn = () => AppState;

async function runStep(
  step: ScriptStep,
  eventId: string,
  set: SetFn,
  get: GetFn,
  script: Script,
) {
  switch (step.kind) {
    case 'ticket':
      return;

    case 'status.update': {
      if (step.statusText !== undefined) set({ statusText: step.statusText });
      return;
    }

    case 'pickup': {
      if (!step.by) return;
      setAgentStatus(set, get, step.by, 'acting');
      addActiveAgent(set, get, step.by);
      return;
    }

    case 'check': {
      if (!step.check) return;
      const item: CheckItem = {
        ...step.check,
        id: uid('chk'),
        startedAt: Date.now(),
      };
      addActiveAgent(set, get, item.by);
      pushStageItem(set, { kind: 'check', id: item.id, check: item });
      return;
    }

    case 'reasoning': {
      if (!step.reasoning) return;
      const item: ReasoningItem = {
        ...step.reasoning,
        id: uid('rsn'),
        startedAt: Date.now(),
      };
      pushStageItem(set, { kind: 'reasoning', id: item.id, reasoning: item });
      return;
    }

    case 'cockpit.tick': {
      if (!step.cockpit) return;
      set((state) => ({
        cockpit: applyCockpitDelta(state.cockpit, step.cockpit ?? {}),
      }));
      return;
    }

    case 'workitem.create': {
      if (!step.workitem) return;
      const item: WorkItem = {
        ...step.workitem,
        id: uid('wi'),
        eventId,
        eventTitle: script.eventTitle,
        createdAt: Date.now(),
        status: 'pending',
      };
      set((state) => ({ workItems: [...state.workItems, item] }));
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
      pushStageItem(set, { kind: 'artifact', id: artifact.id, artifact });
      return;
    }

    case 'artifact.fill': {
      if (!step.artifactId) return;
      patchArtifact(set, step.artifactId, (a) => ({
        ...a,
        content: applyFill(a.content, step),
      }));
      return;
    }

    case 'artifact.done': {
      if (!step.artifactId) return;
      patchArtifact(set, step.artifactId, (a) => ({
        ...a,
        state: 'complete',
        footer: step.footer,
        completedAt: Date.now(),
        minutesSaved: step.minutesSaved,
      }));
      if (step.minutesSaved) {
        const agentId = findLatestAgent(get);
        if (agentId) incrementROI(set, get, agentId, step.minutesSaved);
      }
      return;
    }

    case 'complete': {
      const state = get();
      const stageSnapshot = state.stageItems;
      const artifactCount = stageSnapshot.filter((i) => i.kind === 'artifact').length;
      const eventRecord = state.events.find((e) => e.id === eventId);
      const completedItem: CompletedEvent = {
        id: eventId,
        title: script.eventTitle,
        context: script.eventContext,
        channel: eventRecord?.channel,
        from: eventRecord?.from,
        subject: eventRecord?.subject,
        body: eventRecord?.body,
        extra: eventRecord?.extra,
        startedAt: eventRecord?.timestamp ?? Date.now(),
        completedAt: Date.now(),
        minutesSaved: step.totalMinutes ?? script.minutesSaved,
        artifactCount,
        agents: [...state.activeAgents],
        stageItems: stageSnapshot,
      };
      for (const id of state.activeAgents) setAgentStatus(set, get, id, 'idle');
      set((s) => ({
        completed: [completedItem, ...s.completed],
        roi: { ...s.roi, casesHandled: s.roi.casesHandled + 1 },
        activeEventId: null,
        stageItems: [],
        activeAgents: [],
        statusText: null,
      }));
      return;
    }
  }
}

function setAgentStatus(set: SetFn, get: GetFn, id: AgentId, status: AgentStatus) {
  set((state) => ({
    agents: { ...state.agents, [id]: { ...state.agents[id], status } },
  }));
}

function addActiveAgent(set: SetFn, get: GetFn, id: AgentId) {
  if (get().activeAgents.includes(id)) return;
  set((state) => ({ activeAgents: [...state.activeAgents, id] }));
}

function pushStageItem(set: SetFn, item: StageItem) {
  set((state) => ({ stageItems: [...state.stageItems, item] }));
}

function patchArtifact(
  set: SetFn,
  artifactId: string,
  patch: (a: Artifact) => Artifact,
) {
  set((state) => ({
    stageItems: state.stageItems.map((it) =>
      it.kind === 'artifact' && it.artifact.id === artifactId
        ? { ...it, artifact: patch(it.artifact) }
        : it,
    ),
  }));
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
    case 'picking-list':
      return { pickingRows: [] };
    case 'stock-mutation':
      return {};
    case 'transport-plan':
      return { stops: [] };
    case 'calendar-item':
      return {};
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
    case 'picking-row':
      if (!step.pickingRow) return content;
      return { ...content, pickingRows: [...(content.pickingRows ?? []), step.pickingRow] };
    case 'stop':
      if (!step.stop) return content;
      return { ...content, stops: [...(content.stops ?? []), step.stop] };
    case 'stock-delta':
      if (!step.stockDelta) return content;
      return { ...content, stockDelta: step.stockDelta };
    case 'slot':
      if (!step.slot) return content;
      return { ...content, slot: step.slot };
    default:
      return content;
  }
}

function applyCockpitDelta(state: CockpitState, delta: Partial<CockpitState>): CockpitState {
  return {
    orders: state.orders + (delta.orders ?? 0),
    stockMutations: state.stockMutations + (delta.stockMutations ?? 0),
    routesPlanned: state.routesPlanned + (delta.routesPlanned ?? 0),
    mails: state.mails + (delta.mails ?? 0),
    revenue: state.revenue + (delta.revenue ?? 0),
  };
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
