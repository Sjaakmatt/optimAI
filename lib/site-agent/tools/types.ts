// Gedeelde vorm van de tools. Geen LLM binnen een tool: de tool haalt data of
// voert een actie uit, de agent beslist wanneer.

export interface ToolContext {
  conversatieId: string;
  sessionId: string;
  paginaPad: string;
  /** De lead die al aan dit gesprek hangt, als die er is. */
  leadId: string | null;
  /** Het transcript tot nu toe, voor tools die context moeten meesturen. */
  transcript: string;
}

export interface ToolSignaal {
  /** Naam die de widget herkent, bijvoorbeeld 'agenda'. */
  naam: string;
  payload: Record<string, unknown>;
}

export interface ToolUitvoer {
  /** Wat het model terugkrijgt. Kort en feitelijk. */
  voorModel: string;
  /** Optioneel signaal naar de widget, buiten het model om. */
  signaal?: ToolSignaal;
  /** Zetten we na afloop op het gesprek. */
  leadId?: string;
  afspraakGeboekt?: boolean;
}
