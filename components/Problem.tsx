"use client";
import { useEffect, useRef } from "react";

const problems = [
  {
    icon: "📋",
    title: "Repetitief handmatig werk",
    body: "Gegevens overtypen tussen systemen. Rapporten die elke week opnieuw handmatig worden samengesteld. Werk dat al jaren zo gaat — omdat niemand tijd heeft om het anders in te richten.",
    ai: "AI automatiseert de invoer, verwerking en output. Wat nu uren kost, duurt seconden.",
  },
  {
    icon: "📊",
    title: "Excel als ruggengraat",
    body: "Vijf versies van hetzelfde bestand. Formules die niemand meer begrijpt. Eén fout en de maandafsluiting loopt vertraging op.",
    ai: "We vervangen fragiele Excel-workflows door betrouwbare, geautomatiseerde processen.",
  },
  {
    icon: "✉️",
    title: "Communicatie die tijd vreet",
    body: "Offertes die te lang duren. Klantintakes die handmatig worden verwerkt. E-mails die elke keer opnieuw worden geschreven.",
    ai: "AI drafts, verwerkt en routeert — jij controleert alleen nog waar het ertoe doet.",
  },
  {
    icon: "🔄",
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
    <section className="section" style={{ backgroundColor: "var(--white)" }}>
      <div className="container">
        <div style={{ maxWidth: "560px", marginBottom: "4rem" }}>
          <p style={{
            fontSize: "0.8rem", fontWeight: 500, color: "var(--accent)",
            letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem",
          }}>
            Het probleem
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", marginBottom: "1rem" }}>
            Ze weten dat AI kan helpen.<br />Ze weten niet waar te beginnen.
          </h2>
          <p style={{ color: "var(--ink-light)", fontSize: "1.05rem" }}>
            Dat is precies waar wij instappen. Wij analyseren, adviseren, en implementeren. Van bestaande tools configureren tot custom applicaties bouwen.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {problems.map((p, i) => (
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
              {/* Left: problem */}
              <div style={{ padding: "2rem", backgroundColor: "var(--cream)" }}>
                <div style={{ fontSize: "1.6rem", marginBottom: "0.75rem" }}>{p.icon}</div>
                <h3 style={{ fontFamily: "'Lora', serif", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.6rem" }}>
                  {p.title}
                </h3>
                <p style={{ color: "var(--ink-light)", fontSize: "0.93rem", lineHeight: 1.65 }}>{p.body}</p>
              </div>
              {/* Right: AI solution */}
              <div className="split-card-right" style={{ padding: "2rem", backgroundColor: "var(--green-light)", borderLeft: "1px solid var(--border)" }}>
                <div style={{
                  fontSize: "0.72rem", fontWeight: 600, color: "var(--green)",
                  letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem",
                }}>
                  Wat AI doet
                </div>
                <p style={{ color: "var(--ink)", fontSize: "0.93rem", lineHeight: 1.65 }}>{p.ai}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}