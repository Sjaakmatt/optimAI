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
  context: string;
  payload: Record<string, unknown>;
  timestamp: number;
  scriptId: string;
}

export type ArtifactType =
  | 'email'
  | 'invoice'
  | 'callnote'
  | 'order-confirmation'
  | 'quote'
  | 'memo'
  | 'whatsapp';

export type ArtifactState = 'opening' | 'filling' | 'complete';

export interface ArtifactContent {
  paragraphs?: string[];
  lines?: InvoiceLine[];
  bullets?: BulletSection[];
  items?: OrderItem[];
  messages?: WhatsAppMessage[];
}

export interface InvoiceLine {
  omschrijving: string;
  aantal: number;
  prijs: number;
  totaal: number;
}

export interface BulletSection {
  heading: string;
  items: string[];
}

export interface OrderItem {
  artikel: string;
  aantal: number;
}

export interface WhatsAppMessage {
  from: 'customer' | 'us';
  text: string;
  time: string;
}

export interface ArtifactMeta {
  from?: string;
  to?: string;
  subject?: string;
  date?: string;
  customer?: string;
  invoiceNumber?: string;
  invoiceKind?: 'invoice' | 'credit';
  orderNumber?: string;
  quoteNumber?: string;
  projectName?: string;
  deliveryDate?: string;
  deliveryAddress?: string;
  deliveryWindow?: string;
  subtotal?: number;
  btw?: number;
  total?: number;
  terms?: string;
  validity?: string;
  approvalStatus?: string;
  phone?: string;
  callContext?: string;
  memoSubject?: string;
  [key: string]: unknown;
}

export interface Artifact {
  id: string;
  eventId: string;
  type: ArtifactType;
  meta: ArtifactMeta;
  content: ArtifactContent;
  state: ArtifactState;
  agent?: AgentId;
  footer?: string;
  startedAt: number;
  completedAt?: number;
  minutesSaved?: number;
}

export type StepKind =
  | 'ticket'
  | 'pickup'
  | 'artifact.start'
  | 'artifact.fill'
  | 'artifact.done'
  | 'status.update'
  | 'complete';

export type ArtifactFillTarget =
  | 'paragraph'
  | 'line'
  | 'bullet-section'
  | 'item'
  | 'message';

export interface ScriptStep {
  kind: StepKind;
  delay?: number;
  by?: AgentId;
  statusText?: string;
  artifactId?: string;
  artifactType?: ArtifactType;
  meta?: ArtifactMeta;
  target?: ArtifactFillTarget;
  paragraph?: string;
  line?: InvoiceLine;
  bulletSection?: BulletSection;
  item?: OrderItem;
  message?: WhatsAppMessage;
  footer?: string;
  minutesSaved?: number;
  totalMinutes?: number;
}

export interface Script {
  id: string;
  eventTitle: string;
  eventContext: string;
  minutesSaved: number;
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
  casesHandled: number;
  byAgent: Record<AgentId, ROIByAgent>;
}

export interface CompletedEvent {
  id: string;
  title: string;
  context: string;
  completedAt: number;
  minutesSaved: number;
  artifactCount: number;
}
