'use client';

import { useEffect } from 'react';

const NAMESPACE = 'kennismaking';

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

type CalApi = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns: Record<string, (...args: unknown[]) => void>;
  q?: unknown[];
};

export function CalEmbed({ calLink }: { calLink: string }) {
  useEffect(() => {
    (function (C: Window & { Cal?: CalApi }, A: string, L: string) {
      const p = function (a: { q: unknown[] }, ar: unknown) {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        (function (this: unknown, ...args: unknown[]) {
          const cal = C.Cal!;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement('script')).setAttribute('src', A);
            cal.loaded = true;
          }
          if (args[0] === L) {
            const api = function (this: unknown, ...rest: unknown[]) {
              p(api as unknown as { q: unknown[] }, rest);
            } as unknown as { q: unknown[] };
            api.q = [];
            const namespace = args[1];
            if (typeof namespace === 'string') {
              cal.ns[namespace] =
                cal.ns[namespace] ||
                (api as unknown as (...a: unknown[]) => void);
              p(cal.ns[namespace] as unknown as { q: unknown[] }, args);
              p(cal as unknown as { q: unknown[] }, ['initNamespace', namespace]);
            } else {
              p(cal as unknown as { q: unknown[] }, args);
            }
            return;
          }
          p(cal as unknown as { q: unknown[] }, args);
        } as unknown as CalApi);
    })(window, 'https://app.cal.com/embed/embed.js', 'Cal');

    const Cal = window.Cal!;
    Cal('init', NAMESPACE, { origin: 'https://cal.com' });
    Cal.ns[NAMESPACE]('inline', {
      elementOrSelector: '#cal-inline-embed',
      calLink,
      config: { layout: 'month_view', theme: 'light' },
    });
    Cal.ns[NAMESPACE]('ui', {
      hideEventTypeDetails: false,
      layout: 'month_view',
      theme: 'light',
      cssVarsPerTheme: {
        light: {
          'cal-brand': '#a8803a',
          'cal-text': '#2a2420',
          'cal-text-emphasis': '#2a2420',
          'cal-bg': '#f4ede0',
          'cal-bg-emphasis': '#ebe2cf',
          'cal-bg-muted': '#f7ecd6',
          'cal-border': '#ddd1b8',
          'cal-border-subtle': '#ebe2cf',
          'cal-border-emphasis': '#a8803a',
        },
      },
    });
  }, [calLink]);

  return (
    <div
      id="cal-inline-embed"
      style={{ width: '100%', minHeight: 720, overflow: 'auto' }}
    />
  );
}
