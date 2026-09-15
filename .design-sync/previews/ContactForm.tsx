import { ContactForm } from 'factumai-demo';

/**
 * Het contactformulier zoals het op /contact staat: naam, bedrijf, e-mail en
 * telefoon in twee kolommen, daaronder het bericht en de verstuurknop.
 */
export function Formulier() {
  return (
    <div style={{ maxWidth: 720 }}>
      <ContactForm />
    </div>
  );
}

/**
 * In de opmaak van de contactpagina: links de contactgegevens en wat we graag
 * weten, rechts het formulier. Zo staat hij in productie.
 */
export function OpContactpagina() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-8 md:gap-12 lg:gap-14">
      <aside className="space-y-6">
        <div>
          <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">E-mail</div>
          <div className="mt-1 font-display text-[16px] text-[var(--ink)] leading-snug">info@factumai.nl</div>
        </div>
        <div>
          <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">Telefoon</div>
          <div className="mt-1 font-display text-[16px] text-[var(--ink)] leading-snug">06-10 55 56 58</div>
        </div>
        <div>
          <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">Thuisbasis</div>
          <div className="mt-1 font-display text-[16px] text-[var(--ink)] whitespace-pre-line leading-snug">
            {'Hoogkarspel · West-Friesland\nOok bij u op locatie'}
          </div>
        </div>
        <div className="pt-6 border-t border-[var(--paper-edge)]">
          <div className="font-mono text-[10px] text-[var(--mos)] uppercase tracking-[0.16em]">Wat we graag weten</div>
          <ul className="mt-3 space-y-1.5 text-[13px] text-[var(--ink-dim)] leading-[1.55]">
            <li className="flex gap-2">
              <span aria-hidden className="font-mono text-[var(--steen)]">·</span>
              <span>Wat voor bedrijf (branche, aantal mensen)</span>
            </li>
            <li className="flex gap-2">
              <span aria-hidden className="font-mono text-[var(--steen)]">·</span>
              <span>Welk proces kost u de meeste tijd</span>
            </li>
            <li className="flex gap-2">
              <span aria-hidden className="font-mono text-[var(--steen)]">·</span>
              <span>Wanneer zou u iets live willen hebben</span>
            </li>
          </ul>
        </div>
      </aside>
      <ContactForm />
    </div>
  );
}
