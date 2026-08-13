// Welke agenda de site gebruikt. 'cal' is de Cal.com-embed, 'teams' de eigen
// agenda op de Graph-mailbox van sjaak@factumai.com via de scheduling-MCP.
//
// De schakelaar staat hier zodat beide naast elkaar kunnen draaien: eerst de
// eigen agenda op een testomgeving, en pas omzetten als het staat. Let op dat
// NEXT_PUBLIC_-variabelen bij de build in de bundel worden gebakken — omzetten
// vraagt dus om een nieuwe deploy, net als bij de site-agent-noodrem.
export type BoekingsProvider = 'cal' | 'teams';

export const BOEKING_PROVIDER: BoekingsProvider =
  process.env.NEXT_PUBLIC_BOEKING_PROVIDER === 'teams' ? 'teams' : 'cal';

/** Lengte van een kennismaking, in minuten. Ook de duur die de MCP boekt. */
export const BOEKING_DUUR_MINUTEN = Number(
  process.env.NEXT_PUBLIC_BOEKING_DUUR_MINUTEN ?? '20',
);

export const BOEKING_TIJDZONE = 'Europe/Amsterdam';

export const CAL_NAMESPACE = 'kennismaking';

export const CAL_LINK =
  process.env.NEXT_PUBLIC_CAL_LINK ?? 'sjaak-factumai/kennismaking';

export const CAL_PALETTE_LIGHT = {
  'cal-brand': '#7d5e24',
  'cal-text': '#2a2420',
  'cal-text-emphasis': '#2a2420',
  'cal-bg': '#f4ede0',
  'cal-bg-emphasis': '#e9ddc2',
  'cal-bg-muted': '#f7ecd6',
  'cal-border': '#d2c3a4',
  'cal-border-subtle': '#e9ddc2',
  'cal-border-emphasis': '#7d5e24',
} as const;

export const calPopupAttrs = {
  'data-cal-link': CAL_LINK,
  'data-cal-namespace': CAL_NAMESPACE,
  'data-cal-config': '{"layout":"month_view","theme":"light"}',
} as const;
