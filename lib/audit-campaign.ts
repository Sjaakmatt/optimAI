/** Bump when the terms displayed at /gratis-ai-audit#deelnamevoorwaarden change. */
export const AUDIT_TERMS_VERSION = 'gratis-ai-audit-2026-09-16-v1';

/** Call only on the server. The page and API share the same closure switch. */
export function isAuditCampaignOpen(): boolean {
  return process.env.AI_AUDIT_CAMPAIGN_OPEN?.trim().toLowerCase() !== 'false';
}

export const AUDIT_LIMITS = {
  naam: 120,
  bedrijf: 160,
  email: 160,
  plaats: 120,
  telefoon: 40,
  werkzaamheden: 2000,
} as const;

export type AuditTextField = keyof typeof AUDIT_LIMITS;
export type AuditField = AuditTextField | 'akkoord';
export type AuditErrors = Partial<Record<AuditField, string>>;
export type AuditApplication = Record<AuditTextField, string> & { akkoord: true };

export const AUDIT_FIELD_LABELS: Record<AuditField, string> = {
  naam: 'Uw naam',
  bedrijf: 'Bedrijfsnaam',
  email: 'Zakelijk e-mailadres',
  plaats: 'Vestigingsplaats',
  telefoon: 'Telefoonnummer',
  werkzaamheden: 'Het werk dat tijd kost',
  akkoord: 'Deelnameafspraken',
};

export function validateAuditApplication(body: unknown):
  | { ok: true; fields: AuditApplication }
  | { ok: false; errors: AuditErrors; error?: string } {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, errors: {}, error: 'De aanmelding kon niet worden gelezen. Probeer het opnieuw.' };
  }

  const input = body as Record<string, unknown>;
  const errors: AuditErrors = {};
  const fields = {} as Record<AuditTextField, string>;

  for (const name of Object.keys(AUDIT_LIMITS) as AuditTextField[]) {
    const value = input[name];
    fields[name] = typeof value === 'string' ? value.trim() : '';
    if (value !== undefined && value !== null && typeof value !== 'string') {
      errors[name] = 'Vul dit veld in als tekst.';
    } else if (!fields[name] && name !== 'telefoon') {
      errors[name] = 'Vul dit veld in.';
    } else if (fields[name].length > AUDIT_LIMITS[name]) {
      errors[name] = `Gebruik maximaal ${AUDIT_LIMITS[name]} tekens.`;
    } else if (/\u0000/.test(fields[name]) || (name !== 'werkzaamheden' && /[\r\n]/.test(fields[name]))) {
      errors[name] = 'Verwijder de ongeldige tekens uit dit veld.';
    }
  }

  if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Vul een geldig e-mailadres in, bijvoorbeeld naam@bedrijf.nl.';
  }
  if (!errors.telefoon && fields.telefoon && (
    !/^[+()\d\s.\/-]+$/.test(fields.telefoon) ||
    fields.telefoon.replace(/\D/g, '').length < 7 ||
    fields.telefoon.replace(/\D/g, '').length > 20
  )) {
    errors.telefoon = 'Vul een geldig telefoonnummer in of laat dit veld leeg.';
  }
  if (!errors.werkzaamheden && fields.werkzaamheden.length < 20) {
    errors.werkzaamheden = 'Vertel iets meer over het werk dat tijd kost (minimaal 20 tekens).';
  }
  if (input.akkoord !== true) {
    errors.akkoord = 'Lees de deelnameafspraken en vink aan dat u hiermee akkoord gaat.';
  }

  return Object.keys(errors).length
    ? { ok: false, errors }
    : { ok: true, fields: { ...fields, akkoord: true } };
}
