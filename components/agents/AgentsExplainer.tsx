"use client";
import { useEffect, useRef } from "react";

const concepts = [
  {
    icon: "🤖",
    title: "Wat is een AI agent?",
    body: "Een AI agent is software die zelfstandig een taak uitvoert. Hij ontvangt input — een e-mail, een formulier, een bestand — denkt na over wat er moet gebeuren, en voert de juiste actie uit. Zonder dat jij er iets aan doet.",
    ai: "Trigger → redeneren → actie. Continu, foutloos, schaalbaar.",
  },
  {
    icon: "🔗",
    title: "Hoe koppelen we systemen?",
    body: "Via n8n verbinden we jouw bestaande tools met elkaar. Exact Online, je CRM, e-mail, Google Sheets, WhatsApp — ze praten met elkaar via automatische workflows die wij bouwen en beheren.",
    ai: "Geen vervanging van je systemen. Wij laten ze samenwerken.",
  },
  {
    icon: "⚡",
    title: "Wat levert het op?",
    body: "Uren per week die terugkomen. Fouten die verdwijnen omdat mensen niets meer hoeven over te typen. Processen die 's nachts gewoon doorlopen.",
    ai: "Jij richt je op wat er écht toe doet. De agent doet de rest.",
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
    <section className="section" style={{ backgroundColor: "var(--white)" }}>
      <div className="container">
        <div style={{ maxWidth: "560px", marginBottom: "4rem" }}>
          <p style={{
            fontSize: "0.8rem", fontWeight: 500, color: "var(--accent)",
            letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem",
          }}>Hoe het werkt</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", marginBottom: "1rem" }}>
            Processen die zichzelf<br />runnen.
          </h2>
          <p style={{ color: "var(--ink-light)", fontSize: "1.05rem" }}>
            We gebruiken n8n als orkestratieplatform — open source, krachtig, volledig aanpasbaar aan jouw processen.
          </p>
        </div>

        {/* Same split-card layout as Problem section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {concepts.map((c, i) => (
            <div
              key={i}
              ref={el => { refs.current[i] = el; }}
              className="reveal split-card"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                overflow: "hidden",
                transitionDelay: `${i * 0.08}s`,
              }}
            >
              <div style={{ padding: "2rem", backgroundColor: "var(--cream)" }}>
                <div style={{ fontSize: "1.6rem", marginBottom: "0.75rem" }}>{c.icon}</div>
                <h3 style={{ fontFamily: "'Lora', serif", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.6rem" }}>
                  {c.title}
                </h3>
                <p style={{ color: "var(--ink-light)", fontSize: "0.93rem", lineHeight: 1.65 }}>{c.body}</p>
              </div>
              <div className="split-card-right" style={{ padding: "2rem", backgroundColor: "var(--green-light)", borderLeft: "1px solid var(--border)" }}>
                <div style={{
                  fontSize: "0.72rem", fontWeight: 600, color: "var(--green)",
                  letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem",
                }}>
                  In de praktijk
                </div>
                <p style={{ color: "var(--ink)", fontSize: "0.93rem", lineHeight: 1.65 }}>{c.ai}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}