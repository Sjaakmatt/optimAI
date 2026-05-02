export const CAL_NAMESPACE = 'kennismaking';

export const CAL_LINK =
  process.env.NEXT_PUBLIC_CAL_LINK ?? 'sjaak-factumai/kennismaking';

export const CAL_PALETTE_LIGHT = {
  'cal-brand': '#a8803a',
  'cal-text': '#2a2420',
  'cal-text-emphasis': '#2a2420',
  'cal-bg': '#f4ede0',
  'cal-bg-emphasis': '#ebe2cf',
  'cal-bg-muted': '#f7ecd6',
  'cal-border': '#ddd1b8',
  'cal-border-subtle': '#ebe2cf',
  'cal-border-emphasis': '#a8803a',
} as const;

export const calPopupAttrs = {
  'data-cal-link': CAL_LINK,
  'data-cal-namespace': CAL_NAMESPACE,
  'data-cal-config': '{"layout":"month_view","theme":"light"}',
} as const;
