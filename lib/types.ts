export type AgentId =
  | 'orchestrator'
  | 'sales'
  | 'inkoop'
  | 'voorraad'
  | 'orders'
  | 'facturatie'
  | 'klantservice'
  | 'verzending';

export type AgentStatus = 'idle' | 'thinking' | 'acting' | 'handoff' | 'escalated';

export interface Policy {
  id: string;
  rule: string;
  enabled: boolean;
}

export interface Agent {
  id: AgentId;
  name: string;
  role: string;
  status: AgentStatus;
  policies: Policy[];
  minutesSavedPerTask: number;
  color: string;
}

export type EventType =
  | 'order.new'
  | 'order.inquiry'
  | 'mail.complaint'
  | 'mail.question'
  | 'stock.low'
  | 'supplier.delay'
  | 'invoice.overdue'
  | 'shipment.issue';

export interface DemoEvent {
  id: string;
  type: EventType;
  label: string;
  payload: Record<string, unknown>;
  timestamp: number;
  scriptId: string;
}

export type MessageKind = 'delegate' | 'report' | 'handoff' | 'reasoning' | 'action';

export interface AgentMessage {
  id: string;
  eventId: string;
  from: AgentId;
  to: AgentId | 'broadcast';
  kind: MessageKind;
  content: string;
  fullContent: string;
  timestamp: number;
  status: 'pending' | 'streaming' | 'complete';
  minutesSaved?: number;
}

export interface ScriptStep {
  delayBefore: number;
  from: AgentId;
  to: AgentId | 'broadcast';
  kind: MessageKind;
  text: string;
  typingSpeed?: number;
  minutesSaved?: number;
  parallel?: boolean;
}

export interface Script {
  id: string;
  steps: ScriptStep[];
}

export interface ROIByAgent {
  minutes: number;
  tasks: number;
}

export interface ROIState {
  totalMinutesSaved: number;
  tasksCompleted: number;
  eurosEquivalent: number;
  byAgent: Record<AgentId, ROIByAgent>;
}

export interface ActiveLink {
  id: string;
  from: AgentId;
  to: AgentId | 'broadcast';
  createdAt: number;
}
