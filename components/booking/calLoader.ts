import { CAL_NAMESPACE, CAL_PALETTE_LIGHT } from './config';

type CalQueueItem = unknown[];

interface CalNamespaceFn {
  (...args: unknown[]): void;
  q?: CalQueueItem[];
}

interface CalApi {
  (...args: unknown[]): void;
  loaded?: boolean;
  ns: Record<string, CalNamespaceFn>;
  q?: CalQueueItem[];
}

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

let snippetInstalled = false;

function installSnippet(): void {
  if (snippetInstalled) return;
  snippetInstalled = true;

  // Cal's officiële IIFE, installeert window.Cal als een queueing-stub
  // en triggert async load van embed.js.
  (function (C: Window, A: string, L: string) {
    const cw = C as Window & { Cal?: CalApi };
    const p = function (a: { q?: CalQueueItem[] }, ar: CalQueueItem) {
      a.q = a.q || [];
      a.q.push(ar);
    };
    const d = C.document;
    cw.Cal =
      cw.Cal ||
      (function (this: unknown, ...args: unknown[]) {
        const cal = cw.Cal!;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement('script')).setAttribute('src', A);
          cal.loaded = true;
        }
        if (args[0] === L) {
          const api = function (this: unknown, ...rest: unknown[]) {
            p(api as unknown as { q: CalQueueItem[] }, rest);
          } as unknown as CalNamespaceFn;
          api.q = [];
          const namespace = args[1];
          if (typeof namespace === 'string') {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace] as unknown as { q: CalQueueItem[] }, args);
            p(cal as unknown as { q: CalQueueItem[] }, [
              'initNamespace',
              namespace,
            ]);
          } else {
            p(cal as unknown as { q: CalQueueItem[] }, args);
          }
          return;
        }
        p(cal as unknown as { q: CalQueueItem[] }, args);
      } as CalApi);
  })(window, 'https://app.cal.com/embed/embed.js', 'Cal');

  const Cal = window.Cal!;

  // Trigger de namespace-branch in de IIFE zodat Cal.ns[NAMESPACE]
  // direct als queueing-stub bestaat. Zonder dit blijft Cal.ns[NAMESPACE]
  // undefined tot embed.js geladen is, race condition op consumers.
  Cal('Cal', CAL_NAMESPACE);

  Cal('init', CAL_NAMESPACE, { origin: 'https://cal.com' });

  Cal.ns[CAL_NAMESPACE]('ui', {
    hideEventTypeDetails: false,
    layout: 'month_view',
    theme: 'light',
    cssVarsPerTheme: { light: { ...CAL_PALETTE_LIGHT } },
  });
}

/**
 * Geeft de namespace-functie waarop je 'inline', 'floatingButton',
 * 'modal' etc. kan aanroepen. Synchroon klaar, calls queueën in
 * de namespace-stub tot embed.js de queue verwerkt.
 */
export function getCalApi(): Promise<CalNamespaceFn> {
  if (typeof window === 'undefined') {
    return new Promise(() => {
      /* never resolves during SSR */
    });
  }
  installSnippet();
  return Promise.resolve(window.Cal!.ns[CAL_NAMESPACE]);
}
