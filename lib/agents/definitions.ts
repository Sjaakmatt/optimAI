import type { Agent, AgentId } from '@/lib/types';

export const AGENT_DEFINITIONS: Record<AgentId, Agent> = {
  orchestrator: {
    id: 'orchestrator',
    name: 'De Dirigent',
    role: 'Orchestrator — verdeelt werk, bewaakt het geheel',
    status: 'idle',
    color: '#d4a857',
    minutesSavedPerTask: 0,
    policies: [
      { id: 'orc-1', rule: 'Bedragen boven €25.000 altijd langs directie', enabled: true },
      { id: 'orc-2', rule: 'Bij escalatie binnen 5 min mens informeren', enabled: true },
      { id: 'orc-3', rule: 'Parallel delegeren wanneer afdelingen onafhankelijk zijn', enabled: true },
      { id: 'orc-4', rule: 'Bij twijfel over toon: keuze voor coulance', enabled: true },
    ],
  },
  sales: {
    id: 'sales',
    name: 'Sales',
    role: 'Offertes, lead-opvolging, prijsstelling',
    status: 'idle',
    color: '#7fb685',
    minutesSavedPerTask: 35,
    policies: [
      { id: 'sal-1', rule: 'Offertes binnen 24u versturen', enabled: true },
      { id: 'sal-2', rule: 'Marge ondergrens 11% bij overheidswerk', enabled: true },
      { id: 'sal-3', rule: 'Concurrentprijzen meewegen bij aanbestedingen', enabled: true },
      { id: 'sal-4', rule: 'Follow-up na 5 werkdagen indien geen reactie', enabled: false },
    ],
  },
  inkoop: {
    id: 'inkoop',
    name: 'Inkoop',
    role: 'Leveranciers, bestellingen, prijsvergelijk',
    status: 'idle',
    color: '#9cb380',
    minutesSavedPerTask: 22,
    policies: [
      { id: 'ink-1', rule: 'Mandaat tot €5.000 zonder akkoord', enabled: true },
      { id: 'ink-2', rule: 'Altijd minimaal 2 leveranciers vergelijken boven €1.000', enabled: true },
      { id: 'ink-3', rule: 'Vertragings-incidenten bijhouden voor kwartaal-review', enabled: true },
    ],
  },
  voorraad: {
    id: 'voorraad',
    name: 'Voorraad',
    role: 'Warehouse, stock levels, locaties',
    status: 'idle',
    color: '#b6a26a',
    minutesSavedPerTask: 14,
    policies: [
      { id: 'vor-1', rule: 'MIN/MAX-signalering automatisch', enabled: true },
      { id: 'vor-2', rule: 'Verbruiksanalyse bij elk laag-signaal', enabled: true },
      { id: 'vor-3', rule: 'Aanbevolen bestelhoeveelheid op basis van 6 weken dekking', enabled: true },
    ],
  },
  orders: {
    id: 'orders',
    name: 'Orders',
    role: 'Orderverwerking, picking, beschikbaarheid',
    status: 'idle',
    color: '#a87cc4',
    minutesSavedPerTask: 18,
    policies: [
      { id: 'ord-1', rule: 'Orders boven €10.000 altijd handmatige goedkeuring', enabled: true },
      { id: 'ord-2', rule: 'Nieuwe klanten (eerste order) altijd kredietcheck', enabled: true },
      { id: 'ord-3', rule: 'Spoedorders automatisch prioriteit', enabled: false },
      { id: 'ord-4', rule: 'Bij voorraadtekort: alternatief artikel voorstellen', enabled: true },
    ],
  },
  facturatie: {
    id: 'facturatie',
    name: 'Facturatie',
    role: 'Debiteuren, credit, betaalvoorwaarden',
    status: 'idle',
    color: '#c4634a',
    minutesSavedPerTask: 12,
    policies: [
      { id: 'fac-1', rule: 'Credit tot €100 zonder goedkeuring', enabled: true },
      { id: 'fac-2', rule: 'Trouwe klant + afwijkend gedrag: eerst persoonlijk contact', enabled: true },
      { id: 'fac-3', rule: 'Overheidsklanten standaard 30 dagen netto', enabled: true },
      { id: 'fac-4', rule: 'Drie herinneringen, dan juridisch', enabled: false },
    ],
  },
  klantservice: {
    id: 'klantservice',
    name: 'Klantservice',
    role: 'Mail, klachten, vragen, toon',
    status: 'idle',
    color: '#e0a24f',
    minutesSavedPerTask: 16,
    policies: [
      { id: 'kls-1', rule: 'Ontvangstbevestiging binnen 15 min', enabled: true },
      { id: 'kls-2', rule: 'Klanten >10 orders, 0 klachten: coulance zonder discussie', enabled: true },
      { id: 'kls-3', rule: 'Toon afstemmen op klant-historiek', enabled: true },
      { id: 'kls-4', rule: 'Pro-actief informeren bij vertraging', enabled: true },
    ],
  },
  verzending: {
    id: 'verzending',
    name: 'Verzending',
    role: 'Logistiek, transport, tracking',
    status: 'idle',
    color: '#5a9bd4',
    minutesSavedPerTask: 19,
    policies: [
      { id: 'ver-1', rule: 'Ritten combineren binnen regio West-Friesland', enabled: true },
      { id: 'ver-2', rule: 'Foto-bewijs bij laden en lossen', enabled: true },
      { id: 'ver-3', rule: 'Bij vertraging: alternatief transporteur tot €200 meerkosten', enabled: true },
    ],
  },
};

export const AGENT_ORDER: AgentId[] = [
  'sales',
  'inkoop',
  'voorraad',
  'orders',
  'facturatie',
  'klantservice',
  'verzending',
];

export const ALL_AGENTS: AgentId[] = ['orchestrator', ...AGENT_ORDER];
