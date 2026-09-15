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

export const CAL_PALETTE_DARK = {
  'cal-brand': '#d99a4e',
  'cal-text': '#f4f1ec',
  'cal-text-emphasis': '#ffffff',
  'cal-bg': '#101013',
  'cal-bg-emphasis': '#1a1a1f',
  'cal-bg-muted': '#16161a',
  'cal-border': '#2a2a30',
  'cal-border-subtle': '#1f1f24',
  'cal-border-emphasis': '#d99a4e',
} as const;

export const calPopupAttrs = {
  'data-cal-link': CAL_LINK,
  'data-cal-namespace': CAL_NAMESPACE,
  'data-cal-config': '{"layout":"month_view","theme":"dark"}',
} as const;
