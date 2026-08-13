// Paginapad naar playbooksleutel. Bewust zonder imports, zodat dit ook in de
// client-bundel kan zonder de branchedata (lib/data/branches.ts) mee te slepen.
//
// De sleutel die de client meestuurt wordt server-side alsnog tegen de vaste
// lijst gelegd, dus een gemanipuleerde waarde levert hooguit een ander van de
// zes blokken op en nooit vrije tekst in de prompt.

export type PlaybookPad =
  | 'prijs'
  | 'branche'
  | 'dienst'
  | 'blog'
  | 'cases'
  | 'home';

export function playbookVoorPad(pad: string): PlaybookPad {
  const p = pad.toLowerCase().replace(/\/+$/, '') || '/';

  if (p.startsWith('/branches')) return 'branche';
  if (p.startsWith('/diensten') || p.startsWith('/oplossingen')) return 'dienst';
  if (p.startsWith('/kennis')) return 'blog';
  if (p.startsWith('/cases') || p.startsWith('/over')) return 'cases';
  // Er is geen aparte prijspagina; koopintentie landt op de uitlegpagina en de
  // rekentool. Komt die pagina er wel, voeg hem hier toe.
  if (p === '/info' || p.startsWith('/tools')) return 'prijs';

  return 'home';
}

/**
 * Pagina's waar geen zwevende knoppen horen: de conversiepagina's zelf en de
 * immersieve pagina's. Wordt gedeeld door de Cal-knop en de site-agent, zodat
 * ze niet uit elkaar lopen.
 */
export function verbergZwevendeKnoppen(pad: string): boolean {
  const vast = new Set(['/contact', '/plan', '/demo', '/privacy', '/subverwerkers']);
  return vast.has(pad) || pad.startsWith('/aanvraag') || pad.startsWith('/ontdek');
}
