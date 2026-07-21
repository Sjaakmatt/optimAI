// Gedeelde types voor de publieke AI-agents-scan (/scan).
//
// De vorm spiegelt de AI-verrijking in het FactumAI-dashboard
// (src/lib/crm/ai-enrichment.ts): een bedrijfsprofiel, simpele
// standaard-automatiseringskansen en complexere agent-voorstellen met
// categorie/complexiteit/impact. Contactgegevens worden hier bewust NIET
// verzameld — dit is een publieke tool.

export type Complexiteit = 'gemiddeld' | 'hoog' | 'zeer hoog';
export type Impact = 'laag' | 'middel' | 'hoog';

/** Publieksvriendelijke variant van HOT/WARM/COLD uit het dashboard. */
export type PotentieelLabel = 'hoog' | 'gemiddeld' | 'beperkt';

export interface CompanyProfile {
  sector: string | null;
  activiteiten: string | null;
  omvang: string | null;
  doelgroep: string | null;
  locatie: string | null;
}

/** Complexer agent-voorstel, voorbij de standaard-procesautomatisering. */
export interface AdvancedSolution {
  titel: string;
  categorie: string;
  beschrijving: string;
  complexiteit: Complexiteit;
  impact: Impact;
  dataBronnen: string[];
  voorbeeld: string | null;
}

export interface ScanAnalysis {
  score: number; // 0-100
  label: PotentieelLabel;
  samenvatting: string;
  companyProfile: CompanyProfile;
  websiteAnalyse: string | null;
  brancheKansen: string | null;
  /** Simpele, voor de hand liggende automatiseringskansen. */
  aiOpportunities: string[];
  /** Geavanceerdere agent-voorstellen, toegespitst op dit bedrijf. */
  advancedSolutions: AdvancedSolution[];
}

export type ScanStageId = 'website' | 'profiel' | 'branche' | 'voorstellen';

export type ScanEvent =
  | { type: 'stage'; stage: ScanStageId; status: 'busy' | 'done'; detail?: string }
  | { type: 'result'; result: ScanAnalysis; bedrijfsnaam: string; url: string }
  | { type: 'error'; message: string };

export function labelFromScore(score: number): PotentieelLabel {
  if (score >= 70) return 'hoog';
  if (score >= 40) return 'gemiddeld';
  return 'beperkt';
}
