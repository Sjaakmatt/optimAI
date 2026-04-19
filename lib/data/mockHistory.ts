import type { AgentId } from '@/lib/types';

export interface HourPoint {
  hour: string;
  taken: number;
}

// Deterministische mock: 24 uur "taken per uur"-verloop, reëel gevormd
// (MKB-patroon: stil 's nachts, piek 9-11u en 14-16u, iets rustiger rond lunch).
export const TASKS_PER_HOUR_24H: HourPoint[] = [
  { hour: '00:00', taken: 1 },
  { hour: '01:00', taken: 0 },
  { hour: '02:00', taken: 1 },
  { hour: '03:00', taken: 0 },
  { hour: '04:00', taken: 2 },
  { hour: '05:00', taken: 3 },
  { hour: '06:00', taken: 5 },
  { hour: '07:00', taken: 11 },
  { hour: '08:00', taken: 22 },
  { hour: '09:00', taken: 34 },
  { hour: '10:00', taken: 41 },
  { hour: '11:00', taken: 38 },
  { hour: '12:00', taken: 24 },
  { hour: '13:00', taken: 28 },
  { hour: '14:00', taken: 36 },
  { hour: '15:00', taken: 39 },
  { hour: '16:00', taken: 33 },
  { hour: '17:00', taken: 19 },
  { hour: '18:00', taken: 9 },
  { hour: '19:00', taken: 5 },
  { hour: '20:00', taken: 4 },
  { hour: '21:00', taken: 3 },
  { hour: '22:00', taken: 2 },
  { hour: '23:00', taken: 2 },
];

export interface AgentBarPoint {
  agent: AgentId;
  label: string;
  minuten: number;
}

// Baseline besparing per agent (totaal vandaag, voordat live-sessie begint).
// Live ROI-events worden hier bovenop getoond, zodat getallen geloofwaardig blijven.
export const SAVED_MINUTES_BY_AGENT: AgentBarPoint[] = [
  { agent: 'sales', label: 'Sales', minuten: 185 },
  { agent: 'inkoop', label: 'Inkoop', minuten: 142 },
  { agent: 'voorraad', label: 'Voorraad', minuten: 94 },
  { agent: 'orders', label: 'Orders', minuten: 168 },
  { agent: 'facturatie', label: 'Facturatie', minuten: 76 },
  { agent: 'klantservice', label: 'Klantservice', minuten: 221 },
  { agent: 'verzending', label: 'Verzending', minuten: 128 },
];

export const BASELINE_TOTAL_MINUTES = SAVED_MINUTES_BY_AGENT.reduce(
  (sum, p) => sum + p.minuten,
  0,
);

export const BASELINE_TASKS = TASKS_PER_HOUR_24H.reduce((sum, p) => sum + p.taken, 0);
