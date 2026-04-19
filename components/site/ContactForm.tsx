'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

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
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="artifact-card artifact-card--lift px-8 py-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Naam" placeholder="Jan Jansen" />
        <Field label="Bedrijf" placeholder="Bouwbedrijf Jansen BV" />
        <Field label="E-mail" type="email" placeholder="jan@jansen-bouw.nl" />
        <Field label="Telefoon" type="tel" placeholder="06-…" />
      </div>

      <div className="mt-5">
        <label className="block">
          <span className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">
            Bericht
          </span>
          <textarea
            rows={5}
            placeholder="Kort wat speelt bij u — waar zou u wel wat hulp bij willen?"
            className="mt-1.5 w-full px-3 py-2.5 rounded-[2px] border border-[var(--paper-edge)] bg-[var(--paper)] text-[14px] text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--oker)] outline-none transition-colors resize-y"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-[11px] font-mono text-[var(--ink-faint)] uppercase tracking-wider">
          We reageren binnen één werkdag
        </p>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
        >
          Bericht versturen
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  type = 'text',
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1.5 w-full px-3 py-2 rounded-[2px] border border-[var(--paper-edge)] bg-[var(--paper)] text-[14px] text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--oker)] outline-none transition-colors"
      />
    </label>
  );
}
