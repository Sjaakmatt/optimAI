// Eén plek van waaruit de agenda geopend wordt.
//
// De boekingsknoppen staan verspreid over een stuk of twaalf pagina's en
// dragen daar `data-cal-link`-attributen; de site-agent opent de agenda vanuit
// een signaal, en /plan opent hem meteen bij het laden. Die willen alle drie
// hetzelfde doen zonder elkaars componenten te kennen, dus loopt het via dit
// kleine abonnement in plaats van via props door de hele boom.

export interface AgendaVerzoek {
  /** Waar de opening vandaan komt; gaat mee de analytics in. */
  bron: string;
  /** Optionele aanleiding uit het gesprek, vult het formulier voor. */
  aanleiding?: string;
}

type Luisteraar = (verzoek: AgendaVerzoek) => void;

const luisteraars = new Set<Luisteraar>();

export function opentAgenda(luisteraar: Luisteraar): () => void {
  luisteraars.add(luisteraar);
  return () => {
    luisteraars.delete(luisteraar);
  };
}

export function openAgenda(verzoek: AgendaVerzoek): void {
  for (const luisteraar of luisteraars) luisteraar(verzoek);
}
