export const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const jitter = (base: number, range: number) => base + (Math.random() * range - range / 2);

export const HOURLY_RATE_EUR = 29.57;

export const formatEuro = (amount: number) =>
  new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(Math.round(amount));

export const formatEuroPrecise = (amount: number) =>
  new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

export const formatNumber = (n: number) =>
  new Intl.NumberFormat('nl-NL').format(Math.round(n));

export const formatTime = (timestamp: number) => {
  const d = new Date(timestamp);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
};

export const minutesToHoursLabel = (mins: number) => {
  const h = Math.floor(mins / 60);
  const m = Math.round(mins % 60);
  if (h <= 0) return `${m} min`;
  return `${h}u ${m}m`;
};

export const uid = (prefix = 'id') =>
  `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-3)}`;

export const minutesToEuros = (minutes: number) => (minutes / 60) * HOURLY_RATE_EUR;
