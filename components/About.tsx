"use client";
import { useEffect, useRef } from "react";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="over-mij" className="section" style={{ backgroundColor: "var(--white)" }}>
      <div className="container">
        <div
          ref={ref}
          className="reveal two-col-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
        >
          {/* Left: visual block */}
          <div style={{ position: "relative" }}>
            <div style={{
              width: "100%",
              aspectRatio: "4/5",
              backgroundColor: "var(--cream-dark)",
              borderRadius: "8px",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Placeholder for photo */}
              <div style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "0.5rem",
                color: "var(--ink-muted)",
              }}>
                <div style={{ fontSize: "3rem" }}>👤</div>
                <span style={{ fontSize: "0.8rem" }}>Foto hier</span>
              </div>
            </div>

            {/* Floating badge */}
            <div style={{
              position: "absolute",
              bottom: "-1.5rem",
              right: "-1.5rem",
              backgroundColor: "var(--green)",
              color: "var(--white)",
              padding: "1.25rem 1.5rem",
              borderRadius: "8px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            }}>
              <div style={{ fontFamily: "'Lora', serif", fontSize: "1.5rem", fontWeight: 600 }}>8+ jaar</div>
              <div style={{ fontSize: "0.8rem", opacity: 0.8, marginTop: "0.2rem" }}>Bedrijfskunde &<br />proceservaring</div>
            </div>
          </div>

          {/* Right: text */}
          <div>
            <p style={{
              fontSize: "0.8rem",
              fontWeight: 500,
              color: "var(--accent)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}>
              Over mij
            </p>

            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", marginBottom: "1.5rem" }}>
              Ik houd van processen die wél werken
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: "var(--ink-light)", fontSize: "1rem", lineHeight: 1.7 }}>
              <p>
                Mijn achtergrond is bedrijfskunde, met een focus op processen, strategie en waardepropositie. Ik zie inefficiëntie snel — en ik word oprecht enthousiast van het oplossen ervan.
              </p>
              <p>
                Ik werk met MKB-bedrijven van 10 tot 200 medewerkers. Niet omdat dat lukraak gekozen is, maar omdat dat de schaal is waar procesoptimalisatie het meeste verschil maakt en het minst serieus wordt genomen.
              </p>
              <p>
                Geen vage adviezen. Geen dure trajecten die jaren duren. Concrete ingrepen, meetbaar resultaat, en als het klaar is heb je er niks meer van nodig.
              </p>
            </div>

            <div style={{
              marginTop: "2rem",
              display: "flex",
              gap: "2rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--border)",
              flexWrap: "wrap",
            }}
            className="badges-row">
              {[
                { label: "Bedrijfskunde", sub: "Specialisatie processen" },
                { label: "MKB-focus", sub: "10–200 medewerkers" },
                { label: "No-nonsense", sub: "Resultaat voorop" },
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: "1rem", color: "var(--green)" }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--ink-muted)", marginTop: "0.15rem" }}>
                    {item.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}