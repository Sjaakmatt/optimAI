"use client";
import { useEffect, useRef } from "react";

const problems = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: "Repetitief handmatig werk",
    body: "Gegevens overtypen tussen systemen. Rapporten die elke week opnieuw handmatig worden samengesteld. Werk dat al jaren zo gaat — omdat niemand tijd heeft om het anders in te richten.",
    ai: "AI automatiseert de invoer, verwerking en output. Wat nu uren kost, duurt seconden.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>
      </svg>
    ),
    title: "Excel als ruggengraat",
    body: "Vijf versies van hetzelfde bestand. Formules die niemand meer begrijpt. Eén fout en de maandafsluiting loopt vertraging op.",
    ai: "We vervangen fragiele Excel-workflows door betrouwbare, geautomatiseerde processen.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    title: "Communicatie die tijd vreet",
    body: "Offertes die te lang duren. Klantintakes die handmatig worden verwerkt. E-mails die elke keer opnieuw worden geschreven.",
    ai: "AI drafts, verwerkt en routeert — jij controleert alleen nog waar het ertoe doet.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
      </svg>
    ),
    title: "Processen die niet meegroeien",
    body: "Bij tien medewerkers werkte het nog. Bij vijftig kraakt het aan alle kanten. Maar er is nooit tijd om het structureel aan te pakken.",
    ai: "We bouwen processen die schalen. Zonder dat je er elke keer opnieuw naar hoeft te kijken.",
  },
];

export default function Problem() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    refs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" style={{ backgroundColor: "var(--bg-alt)" }}>
      <div className="container">
        <div style={{ maxWidth: "560px", marginBottom: "4rem" }}>
          <p className="section-tag">Het probleem</p>
          <h2 className="section-title">
            Ze weten dat AI kan helpen.<br />Ze weten niet waar te beginnen.
          </h2>
          <p className="section-desc">
            Dat is precies waar wij instappen. Wij bouwen AI agents en
            automatiseringen die het werk overnemen. Van slimme workflows
            tot custom AI-applicaties.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {problems.map((p, i) => (
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
                <div style={{ marginBottom: "0.75rem", display: "flex", alignItems: "center" }}>{p.icon}</div>
                <h3 style={{
                  fontFamily: "var(--font-heading)", fontSize: "1.1rem",
                  fontWeight: 600, marginBottom: "0.6rem",
                }}>
                  {p.title}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.93rem", lineHeight: 1.65 }}>
                  {p.body}
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
                  Wat AI doet
                </div>
                <p style={{ color: "var(--text)", fontSize: "0.93rem", lineHeight: 1.65 }}>
                  {p.ai}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
