// Onderhoudsmodus.
//
// Eén schakelaar (ONDERHOUD_MODUS=true) zet de hele site achter de
// onderhoudspagina. Bezoekers krijgen /onderhoud te zien met een 503, zodat
// zoekmachines de tijdelijke toestand niet indexeren en later gewoon terugkomen.
//
// Wie de site ondertussen wél moet zien (om te controleren of alles goed staat)
// opent één keer een link met ?onderhoud=<sleutel>; daarna zet een cookie hem
// vrij. De sleutel staat in ONDERHOUD_SLEUTEL.
//
// Dit bestand bevat alleen de beslissing, zonder Next-specifieke imports, zodat
// hij met node:test te toetsen is. De middleware voert de beslissing uit.

export const ONDERHOUD_COOKIE = 'factumai_onderhoud';
export const ONDERHOUD_PAD = '/onderhoud';
export const ONDERHOUD_QUERY = 'onderhoud';

/** Zo lang mogen tussenliggende caches en zoekmachines wachten voor ze het opnieuw proberen. */
export const ONDERHOUD_RETRY_AFTER_SECONDEN = 3600;

export function onderhoudActief(env: Record<string, string | undefined> = process.env): boolean {
  const waarde = (env.ONDERHOUD_MODUS ?? '').trim().toLowerCase();
  return waarde === 'true' || waarde === '1' || waarde === 'aan';
}

/**
 * Paden die ook tijdens onderhoud gewoon bereikbaar blijven: de
 * onderhoudspagina zelf, de assets die hij nodig heeft, de API (webhooks en
 * cron horen door te lopen) en de bestanden die zoekmachines lezen.
 */
export function isVrijgesteldPad(pad: string): boolean {
  if (pad === ONDERHOUD_PAD) return true;
  if (pad.startsWith('/_next/')) return true;
  if (pad.startsWith('/api/')) return true;
  if (pad.startsWith('/polder/')) return true;
  if (pad === '/robots.txt' || pad === '/sitemap.xml' || pad === '/manifest.webmanifest') return true;
  if (pad === '/opengraph-image' || pad === '/icon.png' || pad === '/apple-icon.png' || pad === '/favicon.ico') return true;
  // Statische bestanden uit /public (afbeeldingen, fonts, txt): hebben een extensie.
  const laatste = pad.slice(pad.lastIndexOf('/') + 1);
  return /\.[a-z0-9]{2,5}$/i.test(laatste);
}

export type OnderhoudBesluit =
  | { soort: 'doorlaten' }
  | { soort: 'onderhoud' }
  /** De sleutel klopt: zet de cookie en stuur door naar hetzelfde pad zonder de query. */
  | { soort: 'vrijstellen'; cookie: string };

export function beslisOnderhoud({
  actief,
  pad,
  sleutel,
  cookie,
  query,
}: {
  actief: boolean;
  pad: string;
  /** ONDERHOUD_SLEUTEL; leeg betekent: geen vrijstelling mogelijk. */
  sleutel: string | undefined;
  /** Waarde van de vrijstellingscookie, als die er is. */
  cookie: string | undefined;
  /** Waarde van ?onderhoud=…, als die er is. */
  query: string | undefined;
}): OnderhoudBesluit {
  if (!actief) return { soort: 'doorlaten' };
  if (isVrijgesteldPad(pad)) return { soort: 'doorlaten' };

  const geldigeSleutel = (sleutel ?? '').trim();
  if (geldigeSleutel.length >= 8) {
    if (query !== undefined && veiligGelijk(query, geldigeSleutel)) {
      return { soort: 'vrijstellen', cookie: geldigeSleutel };
    }
    if (cookie !== undefined && veiligGelijk(cookie, geldigeSleutel)) {
      return { soort: 'doorlaten' };
    }
  }
  return { soort: 'onderhoud' };
}

/** Vergelijking in constante tijd, zodat de lengte of het begin van de sleutel niet uit de responstijd valt af te leiden. */
function veiligGelijk(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let verschil = 0;
  for (let i = 0; i < a.length; i++) verschil |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return verschil === 0;
}
