"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Mail,
  FileCheck2,
  Layers,
  ChevronRight,
} from "lucide-react";

const STEPS = [
  {
    title: "Hij leest tussen de regels.",
    text: "Een mail, een bijlage, een vraag die nét anders is. Uw agent begrijpt de bedoeling en zoekt de juiste informatie erbij.",
    icon: Mail,
    label: "Klantenservice",
    subject: "Twee borden beschadigd geleverd",
    from: "Nieuwe klantvraag",
    message:
      "“Kunnen jullie twee nieuwe borden sturen, of anders het bedrag terugstorten?”",
    checks: [
      "Bestelling teruggevonden",
      "Retourbeleid gecontroleerd",
      "Vervangende artikelen op voorraad",
    ],
    result: "Antwoord en vervangende order staan klaar.",
    href: "/oplossingen/klantenservice-automatiseren",
  },
  {
    title: "Hij houdt het werk in beweging.",
    text: "Een offerte die blijft liggen. Een klant die nog niets heeft gehoord. De agent herkent het moment en zet de volgende stap klaar.",
    icon: FileCheck2,
    label: "Opvolging",
    subject: "Offerte 2026-114",
    from: "Opvolgmoment herkend",
    message:
      "Deze offerte staat 19 dagen open. Tijd om even persoonlijk contact op te nemen.",
    checks: [
      "Klantgeschiedenis opgehaald",
      "Openstaande offerte gecontroleerd",
      "Opvolgmail op maat geschreven",
    ],
    result: "Een persoonlijke opvolgmail, klaar voor akkoord.",
    href: "/oplossingen/leadopvolging-automatiseren",
  },
  {
    title: "Hij verbindt uw systemen.",
    text: "Van mailbox naar ERP. Van webshop naar boekhouding. De informatie gaat mee, zonder dat iemand alles nog een keer hoeft over te typen.",
    icon: Layers,
    label: "Orders & systemen",
    subject: "Nieuwe bestelling per PDF",
    from: "Bestelling ontvangen",
    message:
      "Een bestelling in de mailbox. De orderregels horen in uw ERP, met de bron er direct bij.",
    checks: [
      "Orderregels uitgelezen",
      "Voorraad en krediet gecontroleerd",
      "Bronbestand aan de order gekoppeld",
    ],
    result: "De conceptorder staat klaar in uw ERP.",
    href: "/oplossingen",
  },
];

export function WatHijDoet() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];
  return (
    <section
      className="practice-section band"
      aria-labelledby="practice-heading"
    >
      <div className="practice-intro">
        <p className="editorial-label">Uw nieuwe collega</p>
        <h2 id="practice-heading">
          Uw pakket onthoudt.
          <br />
          <em>Een agent denkt mee.</em>
        </h2>
        <p>
          Uw systemen blijven. Het terugkerende werk verandert. Ontdek waar een
          digitale collega ruimte maakt.
        </p>
      </div>
      <div className="practice-grid">
        <div
          className="practice-steps"
          role="tablist"
          aria-label="Wat een agent doet"
          aria-orientation="vertical"
        >
          {STEPS.map((item, i) => (
            <button
              key={item.label}
              role="tab"
              id={`practice-tab-${i}`}
              aria-selected={active === i}
              aria-controls="practice-preview"
              tabIndex={active === i ? 0 : -1}
              className={`practice-step ${active === i ? "is-active" : ""}`}
              onClick={() => setActive(i)}
              onKeyDown={(event) => {
                let next = i;
                if (event.key === "ArrowDown") next = (i + 1) % STEPS.length;
                else if (event.key === "ArrowUp")
                  next = (i + STEPS.length - 1) % STEPS.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = STEPS.length - 1;
                else return;
                event.preventDefault();
                setActive(next);
                document.getElementById(`practice-tab-${next}`)?.focus();
              }}
            >
              <span className="practice-number">0{i + 1}</span>
              <span>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </span>
              <ChevronRight size={17} />
            </button>
          ))}
        </div>
        <div
          className="practice-preview"
          id="practice-preview"
          role="tabpanel"
          aria-labelledby={`practice-tab-${active}`}
          tabIndex={0}
        >
          <div className="practice-orbit orbit-one" aria-hidden="true" />
          <div className="practice-orbit orbit-two" aria-hidden="true" />
          <div className="agent-window">
            <div className="agent-window-bar">
              <span className="window-dots">
                <i />
                <i />
                <i />
              </span>
              <span>FactumAI · {step.label}</span>
              <span className="agent-status">Actief</span>
            </div>
            <div className="agent-message">
              <span className="agent-message-icon">
                <step.icon size={20} />
              </span>
              <div>
                <small>{step.from}</small>
                <h3>{step.subject}</h3>
              </div>
            </div>
            <p className="agent-quote">{step.message}</p>
            <div className="agent-checks">
              {step.checks.map((check) => (
                <div key={check}>
                  <span>
                    <Check size={12} />
                  </span>
                  {check}
                </div>
              ))}
            </div>
            <div className="agent-result">
              <FileCheck2 size={18} />
              <span>{step.result}</span>
            </div>
            <div className="agent-approval">
              <span>U beslist wat er uitgaat.</span>
              <span>
                <Check size={12} /> Klaar voor akkoord
              </span>
            </div>
          </div>
          <div className="agent-note">
            <span className="agent-note-mark">f.</span>
            <div>
              Het werk is voorbereid.
              <br />
              <strong>De regie blijft bij u.</strong>
            </div>
          </div>
          <p className="practice-example">
            Illustratief voorbeeld van een werkproces
          </p>
        </div>
      </div>
      <Link className="practice-link" href={step.href}>
        Meer over {step.label.toLowerCase()} <ArrowUpRight size={16} />
      </Link>
    </section>
  );
}
