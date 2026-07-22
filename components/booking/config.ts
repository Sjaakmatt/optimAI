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
