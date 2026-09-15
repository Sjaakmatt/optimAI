// Next.js inlines `process.env.NEXT_PUBLIC_*` at build time; outside Next.js
// there is no `process` object in the browser. Imported first from the
// design-sync entry so module-level reads in lib/ fall back to their defaults.
const g = globalThis as unknown as { process?: { env?: Record<string, string | undefined> } };
if (typeof g.process === 'undefined') g.process = { env: {} };
else if (!g.process.env) g.process.env = {};
