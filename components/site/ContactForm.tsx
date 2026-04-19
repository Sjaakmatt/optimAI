'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

type FieldErrors = Partial<Record<'naam' | 'email' | 'bericht', string>>;

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    setGlobalError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      naam: data.get('naam'),
      bedrijf: data.get('bedrijf'),
      email: data.get('email'),
      telefoon: data.get('telefoon'),
      bericht: data.get('bericht'),
      website: data.get('website'), // honeypot
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await res.json()) as {
        ok: boolean;
        errors?: FieldErrors;
        error?: string;
      };
      if (res.ok && result.ok) {
        setSubmitted(true);
      } else if (result.errors) {
        setErrors(result.errors);
      } else {
        setGlobalError(result.error ?? 'Er ging iets mis. Probeer het nog eens.');
      }
    } catch {
      setGlobalError('Geen verbinding. Controleer uw internet en probeer opnieuw.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="artifact-card artifact-card--lift px-8 py-12 text-center">
        <CheckCircle2
          size={32}
          strokeWidth={1.5}
          className="mx-auto text-[var(--mos)]"
        />
        <h3 className="mt-4 font-display text-[22px] text-[var(--ink)]">
          Bericht ontvangen
        </h3>
        <p className="mt-2 text-[14px] text-[var(--ink-dim)] max-w-[380px] mx-auto">
          We reageren binnen één werkdag. Dank voor uw bericht.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="artifact-card artifact-card--lift px-8 py-8"
    >
      {/* Honeypot, onzichtbaar veld voor bots */}
      <div
        aria-hidden
        style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}
      >
        <label>
          Laat leeg
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field name="naam" label="Naam" placeholder="Jan Jansen" error={errors.naam} required />
        <Field name="bedrijf" label="Bedrijf" placeholder="Bouwbedrijf Jansen BV" />
        <Field
          name="email"
          label="E-mail"
          type="email"
          placeholder="jan@jansen-bouw.nl"
          error={errors.email}
          required
        />
        <Field name="telefoon" label="Telefoon" type="tel" placeholder="06-…" />
      </div>

      <div className="mt-5">
        <label className="block">
          <span className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">
            Bericht
          </span>
          <textarea
            name="bericht"
            rows={5}
            required
            placeholder="Wat speelt er bij u? Waar zou u graag wat hulp bij willen?"
            className={`mt-1.5 w-full px-3 py-2.5 rounded-[2px] border bg-[var(--paper)] text-[14px] text-[var(--ink)] placeholder:text-[var(--ink-faint)] outline-none transition-colors resize-y ${
              errors.bericht
                ? 'border-[var(--terra)] focus:border-[var(--terra)]'
                : 'border-[var(--paper-edge)] focus:border-[var(--oker)]'
            }`}
          />
          {errors.bericht && <FieldError message={errors.bericht} />}
        </label>
      </div>

      {globalError && (
        <div className="mt-5 flex items-start gap-2 text-[13px] text-[var(--terra)] bg-[var(--paper-deep)] border border-[var(--paper-edge)] rounded-[2px] px-3 py-2">
          <AlertCircle size={14} strokeWidth={1.5} className="mt-0.5 shrink-0" />
          <span>{globalError}</span>
        </div>
      )}

      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-[11px] font-mono text-[var(--ink-faint)] uppercase tracking-wider">
          We reageren binnen één werkdag
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? 'Versturen…' : 'Bericht versturen'}
        </button>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type = 'text',
  placeholder,
  error,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">
        {label}
        {required && <span className="text-[var(--oker-deep)]"> ·</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={`mt-1.5 w-full px-3 py-2 rounded-[2px] border bg-[var(--paper)] text-[14px] text-[var(--ink)] placeholder:text-[var(--ink-faint)] outline-none transition-colors ${
          error
            ? 'border-[var(--terra)] focus:border-[var(--terra)]'
            : 'border-[var(--paper-edge)] focus:border-[var(--oker)]'
        }`}
      />
      {error && <FieldError message={error} />}
    </label>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <span className="mt-1 flex items-center gap-1 text-[11px] text-[var(--terra)]">
      <AlertCircle size={11} strokeWidth={1.5} />
      {message}
    </span>
  );
}
