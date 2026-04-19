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

export type EventChannel = 'email' | 'system' | 'phone' | 'whatsapp' | 'form';

export interface EventExtra {
  label: string;
  value: string;
}

export interface DemoEvent {
  id: string;
  type: EventType;
  label: string;
  context: string;
  channel?: EventChannel;
  from?: string;
  subject?: string;
  body?: string[];
  extra?: EventExtra[];
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
  | 'whatsapp'
  | 'picking-list'
  | 'stock-mutation'
  | 'transport-plan'
  | 'calendar-item';

export type ArtifactState = 'opening' | 'filling' | 'complete';

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

export interface PickingRow {
  artikel: string;
  aantal: number;
  locatie: string;
  status?: 'open' | 'gepakt';
}

export interface StockDelta {
  artikel: string;
  was: number;
  wordt: number;
  unit?: string;
  reden?: string;
}

export interface TransportStop {
  tijd: string;
  plaats: string;
  klant?: string;
  artikelen?: string;
}

export interface CalendarSlot {
  wanneer: string;
  duur: string;
  voor: string;
  onderwerp: string;
  details?: string[];
}

export interface ArtifactContent {
  paragraphs?: string[];
  lines?: InvoiceLine[];
  bullets?: BulletSection[];
  items?: OrderItem[];
  messages?: WhatsAppMessage[];
  pickingRows?: PickingRow[];
  stockDelta?: StockDelta;
  stops?: TransportStop[];
  slot?: CalendarSlot;
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
  routeName?: string;
  vehicle?: string;
  driver?: string;
  totalKm?: string;
  pickingNumber?: string;
  warehouse?: string;
  reasoning?: string[];
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

export type CheckTone = 'dossier' | 'policy' | 'inventory' | 'log' | 'credit' | 'pricing' | 'planning';

export interface CheckItem {
  id: string;
  label: string;
  value: string;
  by: AgentId;
  tone: CheckTone;
  startedAt: number;
}

export interface ReasoningItem {
  id: string;
  text: string;
  by: AgentId;
  startedAt: number;
}

export type StageItem =
  | { kind: 'artifact'; id: string; artifact: Artifact }
  | { kind: 'check'; id: string; check: CheckItem }
  | { kind: 'reasoning'; id: string; reasoning: ReasoningItem };

export type CockpitMetric = 'orders' | 'stockMutations' | 'routesPlanned' | 'mails' | 'revenue';

export type CockpitDelta = Partial<Record<CockpitMetric, number>>;

export type StepKind =
  | 'ticket'
  | 'pickup'
  | 'artifact.start'
  | 'artifact.fill'
  | 'artifact.done'
  | 'status.update'
  | 'check'
  | 'reasoning'
  | 'cockpit.tick'
  | 'workitem.create'
  | 'complete';

export type ArtifactFillTarget =
  | 'paragraph'
  | 'line'
  | 'bullet-section'
  | 'item'
  | 'message'
  | 'picking-row'
  | 'stop'
  | 'stock-delta'
  | 'slot';

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
  pickingRow?: PickingRow;
  stop?: TransportStop;
  stockDelta?: StockDelta;
  slot?: CalendarSlot;
  footer?: string;
  minutesSaved?: number;
  totalMinutes?: number;
  check?: Omit<CheckItem, 'id' | 'startedAt'>;
  reasoning?: Omit<ReasoningItem, 'id' | 'startedAt'>;
  cockpit?: CockpitDelta;
  workitem?: Omit<
    WorkItem,
    'id' | 'eventId' | 'eventTitle' | 'createdAt' | 'status' | 'completedAt'
  >;
}

export type WorkItemKind =
  | 'payment-out'
  | 'invoice-send'
  | 'picking'
  | 'call'
  | 'approval'
  | 'route-execute'
  | 'review'
  | 'followup';

export type WorkItemStatus = 'pending' | 'completed';

export interface WorkItem {
  id: string;
  eventId: string;
  eventTitle: string;
  artifactId?: string;
  department: AgentId;
  kind: WorkItemKind;
  title: string;
  subtitle?: string;
  amount?: string;
  reference?: string;
  actionLabel: string;
  systemTarget: string;
  createdAt: number;
  status: WorkItemStatus;
  completedAt?: number;
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

export interface CockpitState {
  orders: number;
  stockMutations: number;
  routesPlanned: number;
  mails: number;
  revenue: number;
}

export interface CompletedEvent {
  id: string;
  title: string;
  context: string;
  channel?: EventChannel;
  from?: string;
  subject?: string;
  body?: string[];
  extra?: EventExtra[];
  startedAt: number;
  completedAt: number;
  minutesSaved: number;
  artifactCount: number;
  agents: AgentId[];
  stageItems: StageItem[];
}
