"use client";
import { useEffect, useRef } from "react";

const concepts = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>
      </svg>
    ),
    title: "Wat is een AI agent?",
    body: "Een AI agent is software die zelfstandig een taak uitvoert. Hij ontvangt input — een e-mail, een formulier, een bestand — denkt na over wat er moet gebeuren, en voert de juiste actie uit. Zonder dat jij er iets aan doet.",
    ai: "Trigger \u2192 redeneren \u2192 actie. Continu, foutloos, schaalbaar.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
    title: "Hoe koppelen we systemen?",
    body: "Via n8n verbinden we jouw bestaande tools met elkaar. Exact Online, je CRM, e-mail, Google Sheets, WhatsApp — ze praten met elkaar via automatische workflows die wij bouwen en beheren.",
    ai: "Geen vervanging van je systemen. Wij laten ze samenwerken.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: "Wat levert het op?",
    body: "Uren per week die terugkomen. Fouten die verdwijnen omdat mensen niets meer hoeven over te typen. Processen die \u2019s nachts gewoon doorlopen.",
    ai: "Jij richt je op wat er \u00e9cht toe doet. De agent doet de rest.",
  },
];

export default function AgentsExplainer() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    refs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" style={{ backgroundColor: "var(--bg-alt)" }}>
      <div className="container">
        <div style={{ maxWidth: "560px", marginBottom: "4rem" }}>
          <p className="section-tag">Hoe het werkt</p>
          <h2 className="section-title">
            Processen die zichzelf runnen.
          </h2>
          <p className="section-desc">
            We gebruiken n8n als orkestratieplatform — open source, krachtig,
            volledig aanpasbaar aan jouw processen.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {concepts.map((c, i) => (
            <div
              key={i}
              ref={el => { refs.current[i] = el; }}
              className="reveal split-card"
              style={{
                display: "grid", gridTemplateColumns: "1fr 1fr",
                border: "1px solid var(--border)", borderRadius: "var(--radius-md)",
                overflow: "hidden", transitionDelay: `${i * 0.08}s`,
              }}
            >
              <div style={{ padding: "2rem", backgroundColor: "var(--bg-card)" }}>
                <div style={{ marginBottom: "0.75rem" }}>{c.icon}</div>
                <h3 style={{
                  fontFamily: "var(--font-heading)", fontSize: "1.1rem",
                  fontWeight: 600, marginBottom: "0.6rem",
                }}>
                  {c.title}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.93rem", lineHeight: 1.65 }}>
                  {c.body}
                </p>
              </div>
              <div className="split-card-right" style={{
                padding: "2rem", backgroundColor: "var(--accent-subtle)",
                borderLeft: "1px solid var(--border)",
              }}>
                <div style={{
                  fontSize: "0.72rem", fontWeight: 600, color: "var(--accent)",
                  letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem",
                }}>
                  In de praktijk
                </div>
                <p style={{ color: "var(--text)", fontSize: "0.93rem", lineHeight: 1.65 }}>
                  {c.ai}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
