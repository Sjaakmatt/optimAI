'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check, LoaderCircle } from 'lucide-react';
import {
  AUDIT_FIELD_LABELS,
  AUDIT_LIMITS,
  AUDIT_TERMS_VERSION,
  validateAuditApplication,
  type AuditErrors,
  type AuditField,
  type AuditTextField,
} from '@/lib/audit-campaign';
import styles from './GratisAuditForm.module.css';

const fallbackHref = 'mailto:info@factumai.nl?subject=Aanmelding%20kosteloze%20AI-audit';

export function GratisAuditForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<AuditErrors>({});
  const [message, setMessage] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);
  const inFlight = useRef(false);

  useEffect(() => {
    if (state === 'error' || state === 'success') resultRef.current?.focus();
  }, [state, errors, message]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const data = new FormData(event.currentTarget);
    const payload = {
      naam: data.get('naam'),
      bedrijf: data.get('bedrijf'),
      email: data.get('email'),
      plaats: data.get('plaats'),
      telefoon: data.get('telefoon'),
      werkzaamheden: data.get('werkzaamheden'),
      akkoord: data.get('akkoord') === 'on',
      website: data.get('website'),
      voorwaardenVersie: AUDIT_TERMS_VERSION,
    };
    setErrors({});
    setMessage('');
    const validation = validateAuditApplication(payload);
    if (!validation.ok) {
      setErrors(validation.errors);
      setState('error');
      return;
    }

    inFlight.current = true;
    setState('sending');
    try {
      const response = await fetch('/api/audit-aanmelding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(20_000),
      });
      const result = await response.json() as { ok?: boolean; errors?: AuditErrors; error?: string };
      if (response.ok && result.ok === true) {
        setState('success');
      } else {
        if (result.errors) setErrors(result.errors);
        setMessage(result.error ?? (result.errors && Object.keys(result.errors).length ? '' : 'We konden de ontvangst niet bevestigen. Probeer het opnieuw of mail ons.'));
        setState('error');
      }
    } catch {
      setMessage('We konden de ontvangst niet bevestigen. Controleer uw verbinding en probeer het opnieuw, of mail ons.');
      setState('error');
    } finally {
      inFlight.current = false;
    }
  }

  if (state === 'success') {
    return (
      <div className={`${styles.form} ${styles.success}`} ref={resultRef} tabIndex={-1} role="status">
        <span className={styles.successIcon}><Check size={25} strokeWidth={1.5} aria-hidden="true" /></span>
        <p className={styles.eyebrow}>De eerste stap is gezet</p>
        <h3>Dank voor uw <em>aanmelding.</em></h3>
        <p>We bekijken of uw bedrijf en werkzaamheden bij deze ronde passen. Daarna nemen we persoonlijk contact met u op.</p>
        <p className={styles.successNote}>Uw aanmelding is nog geen bevestiging van deelname. Tijdens de kennismaking kiezen we samen drie afgebakende processen.</p>
        <Link href="/diensten/ai-audit">Meer over onze aanpak <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
    );
  }

  return (
    <form className={styles.form} method="post" action="/api/audit-aanmelding" onSubmit={submit} noValidate aria-labelledby="audit-form-heading" aria-busy={state === 'sending'}>
      <div className={styles.heading}>
        <p className={styles.eyebrow}>Vertel ons over uw bedrijf</p>
        <h3 id="audit-form-heading">Hier begint <em>het inzicht.</em></h3>
        <p>Voor bedrijven in Noord-Holland. Een korte beschrijving is genoeg; de drie processen kiezen we samen tijdens de kennismaking. Alleen uw telefoonnummer is optioneel.</p>
      </div>

      <noscript><p>Voor dit formulier is JavaScript nodig. U kunt uw aanmelding ook mailen naar <a href={fallbackHref}>info@factumai.nl</a>.</p></noscript>

      {state === 'error' && (
        <div className={styles.errorSummary} ref={resultRef} tabIndex={-1} role="alert">
          <strong>{message ? 'Uw aanmelding is nog niet bevestigd' : 'Controleer deze gegevens'}</strong>
          {message && <p>{message}</p>}
          {Object.keys(errors).length > 0 && (
            <ul>
              {(Object.entries(errors) as [AuditField, string][]).map(([name, error]) => (
                <li key={name}>
                  <a href={`#audit-${name}`} onClick={(event) => {
                    event.preventDefault();
                    document.getElementById(`audit-${name}`)?.focus();
                  }}>{AUDIT_FIELD_LABELS[name]}: {error}</a>
                </li>
              ))}
            </ul>
          )}
          {message && <a href={fallbackHref}>Mail uw aanmelding naar info@factumai.nl <ArrowUpRight size={14} aria-hidden="true" /></a>}
        </div>
      )}

      <fieldset className={styles.fields} disabled={state === 'sending'}>
        <legend className={styles.visuallyHidden}>Uw bedrijf en contactgegevens</legend>
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="audit-website">Laat dit veld leeg</label>
          <input id="audit-website" name="website" autoComplete="off" tabIndex={-1} />
        </div>
        <div className={styles.grid}>
          <TextField name="naam" autoComplete="name" error={errors.naam} />
          <TextField name="bedrijf" autoComplete="organization" error={errors.bedrijf} />
          <TextField name="email" type="email" autoComplete="email" error={errors.email} />
          <TextField name="plaats" autoComplete="address-level2" error={errors.plaats} />
          <TextField name="telefoon" type="tel" autoComplete="tel" error={errors.telefoon} />
        </div>

        <div className={styles.field}>
          <label htmlFor="audit-werkzaamheden">Welk werk kost uw team onnodig veel tijd?</label>
          <p className={styles.hint} id="audit-werkzaamheden-hint">Bijvoorbeeld orders overtypen, offertes maken of klantvragen beantwoorden. Deel hier nog geen vertrouwelijke informatie.</p>
          <textarea
            id="audit-werkzaamheden"
            name="werkzaamheden"
            rows={4}
            required
            minLength={20}
            maxLength={AUDIT_LIMITS.werkzaamheden}
            aria-invalid={Boolean(errors.werkzaamheden)}
            aria-describedby={`audit-werkzaamheden-hint${errors.werkzaamheden ? ' audit-werkzaamheden-error' : ''}`}
            placeholder="Bij ons gaat veel tijd naar…"
          />
          <FieldError name="werkzaamheden" error={errors.werkzaamheden} />
        </div>

        <div className={styles.consent}>
          <div>
            <input type="checkbox" id="audit-akkoord" name="akkoord" required aria-invalid={Boolean(errors.akkoord)} aria-describedby={errors.akkoord ? 'audit-akkoord-error' : undefined} />
            <label htmlFor="audit-akkoord">Ik heb de <Link href="/gratis-ai-audit#deelnamevoorwaarden">deelnameafspraken</Link> gelezen en ga hiermee akkoord. Ik begrijp dat FactumAI drie bedrijven selecteert en dat aanmelden geen garantie op deelname is.</label>
          </div>
          <FieldError name="akkoord" error={errors.akkoord} />
        </div>

        <button className={styles.submit} type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? <>Aanmelding versturen <LoaderCircle className={styles.spinner} size={19} aria-hidden="true" /></> : <>Meld mijn bedrijf aan <ArrowUpRight size={19} aria-hidden="true" /></>}
        </button>
        <p className={styles.privacy}>Geen kosten. Geen afnameverplichting. We gebruiken uw gegevens voor deze aanmelding, zoals beschreven in onze <Link href="/privacy">privacyverklaring</Link>.</p>
      </fieldset>
      <span className={styles.visuallyHidden} role="status">{state === 'sending' ? 'Uw aanmelding wordt verstuurd.' : ''}</span>
    </form>
  );
}

function TextField({ name, type = 'text', autoComplete, error }: { name: Exclude<AuditTextField, 'werkzaamheden'>; type?: string; autoComplete: string; error?: string }) {
  return (
    <div className={styles.field}>
      <label htmlFor={`audit-${name}`}>{AUDIT_FIELD_LABELS[name]}{name === 'telefoon' && <span> (optioneel)</span>}</label>
      <input id={`audit-${name}`} name={name} type={type} autoComplete={autoComplete} required={name !== 'telefoon'} maxLength={AUDIT_LIMITS[name]} aria-invalid={Boolean(error)} aria-describedby={error ? `audit-${name}-error` : undefined} />
      <FieldError name={name} error={error} />
    </div>
  );
}

function FieldError({ name, error }: { name: AuditField; error?: string }) {
  return error ? <p className={styles.fieldError} id={`audit-${name}-error`}>{error}</p> : null;
}
