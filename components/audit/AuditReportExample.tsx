'use client';

import { useId, useState } from 'react';
import { ArrowDownRight, FileText } from 'lucide-react';
import styles from './AuditReportExample.module.css';

const EXAMPLES = [
  {
    id: 'orders',
    label: 'Orders',
    title: 'Orders uit de mailbox verwerken',
    volume: 120,
    unit: 'orders',
    currentMinutes: 8,
    handlingMinutes: 3,
    checkMinutes: 1,
    handlingLabel: 'verwerken',
    bottleneck: 'Medewerkers nemen klantgegevens en orderregels over van e-mail naar het ordersysteem.',
    aiRole: 'AI leest de bestelling en zet een conceptorder klaar. Uw medewerker controleert en bevestigt.',
  },
  {
    id: 'offertes',
    label: 'Offertes',
    title: 'Offertes voorbereiden en uitwerken',
    volume: 30,
    unit: 'offertes',
    currentMinutes: 24,
    handlingMinutes: 8,
    checkMinutes: 8,
    handlingLabel: 'uitwerken',
    bottleneck: 'Informatie uit aanvragen, prijslijsten en eerdere offertes wordt steeds opnieuw bij elkaar gezocht.',
    aiRole: 'AI verzamelt de gegevens en maakt een eerste opzet. Uw medewerker bepaalt de prijs en rondt de offerte af.',
  },
  {
    id: 'klantvragen',
    label: 'Klantvragen',
    title: 'Terugkerende klantvragen afhandelen',
    volume: 150,
    unit: 'vragen',
    currentMinutes: 6,
    handlingMinutes: 1,
    checkMinutes: 3,
    handlingLabel: 'afhandelen',
    bottleneck: 'Bij elke vraag zoekt een medewerker opnieuw de bestelling, status en afspraken op.',
    aiRole: 'AI zoekt de informatie op en stelt een antwoord voor. Uw medewerker controleert het antwoord en behandelt uitzonderingen.',
  },
] as const;

export function AuditReportExample() {
  const [selected, setSelected] = useState(0);
  const reportId = useId();
  const example = EXAMPLES[selected];
  const afterMinutes = example.handlingMinutes + example.checkMinutes;
  const currentHours = (example.volume * example.currentMinutes) / 60;
  const afterHours = (example.volume * afterMinutes) / 60;
  const savedHours = currentHours - afterHours;

  return (
    <div className={styles.report}>
      <div className={styles.topline}>
        <span className={styles.reportLabel}><FileText size={15} aria-hidden /> Uit het auditrapport</span>
        <span className={styles.exampleLabel}>Fictief rekenvoorbeeld · geen klantresultaat</span>
      </div>

      <div className={styles.selector} role="group" aria-label="Kies een voorbeeldproces">
        {EXAMPLES.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={selected === index}
            aria-controls={reportId}
            onClick={() => setSelected(index)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div id={reportId} className={styles.body} aria-live="polite" aria-atomic="true">
        <div className={styles.heading}>
          <p className={styles.eyebrow}>Proces {String(selected + 1).padStart(2, '0')}</p>
          <h3>{example.title}</h3>
          <p>{example.volume} {example.unit} per week · tijd van uw medewerkers</p>
        </div>

        <div className={styles.comparison}>
          <div className={styles.barRow}>
            <div className={styles.barLabel}>
              <span>Vandaag</span><strong>{currentHours} uur <span>/ week</span></strong>
            </div>
            <div className={styles.track} aria-hidden><div className={styles.currentBar} /></div>
            <p>{example.volume} × {example.currentMinutes} min = {currentHours} uur</p>
          </div>
          <div className={styles.barRow}>
            <div className={styles.barLabel}>
              <span>Met AI, in dit voorbeeld</span><strong>{afterHours} uur <span>/ week</span></strong>
            </div>
            <div className={styles.track} aria-hidden>
              <div className={styles.afterBar} style={{ width: `${(afterHours / currentHours) * 100}%` }} />
            </div>
            <p>
              {example.volume} × ({example.handlingMinutes} min {example.handlingLabel} + {example.checkMinutes} min controle) = {afterHours} uur
            </p>
          </div>
        </div>

        <div className={styles.outcome}>
          <div className={styles.hours}>
            <ArrowDownRight size={25} strokeWidth={1.5} aria-hidden />
            <strong>{savedHours}<span>uur / week</span></strong>
          </div>
          <p>Minder handwerk.<br /><span>Meer tijd voor het werk dat blijft.</span></p>
        </div>

        <dl className={styles.findings}>
          <div>
            <dt>Waar het vastloopt</dt>
            <dd>{example.bottleneck}</dd>
          </div>
          <div>
            <dt>Wat AI kan voorbereiden</dt>
            <dd>{example.aiRole}</dd>
          </div>
        </dl>

        <p className={styles.assumptions}>
          Alle tijden zijn aannames over actieve werktijd. De tijd na inzet van AI is inclusief controle en een gemiddelde voor uitzonderingen. Wachttijd en de verwerkingstijd van AI staan hier los van. Vrijgekomen uren zijn geen automatische kostenbesparing; in uw audit rekenen we met uw eigen gegevens.
        </p>
      </div>
    </div>
  );
}
