"use client";
import { useEffect, useRef } from "react";

const offerings = [
  {
    step: "01",
    title: "AI Processcan",
    desc: "We lopen samen door je werkprocessen en brengen in kaart waar tijd weglekt. Je krijgt een concreet rapport met wat AI kan oplossen, hoeveel het oplevert, en wat de logische eerste stap is.",
    deliverables: ["Procesanalyse op locatie of remote", "Rapport met besparingspotentieel", "Concrete aanbeveling voor vervolgstap"],
    tag: "Startpunt",
    accent: true,
  },
  {
    step: "02",
    title: "Quick Win Implementatie",
    desc: "Eén proces geautomatiseerd met bestaande tools of een lichte custom oplossing. Snel resultaat, direct merkbaar in je dagelijkse operatie.",
    deliverables: ["Werkende automatisering binnen 2–4 weken", "Uitleg en overdracht aan je team", "Geen langlopend traject nodig"],
    tag: "2–4 weken",
    accent: false,
  },
  {
    step: "03",
    title: "Full Optimization",
    desc: "Meerdere processen aangepakt, custom AI-toepassingen gebouwd voor jouw situatie. Gekoppeld aan je bestaande systemen, klaar voor dagelijks gebruik.",
    deliverables: ["Meerdere processen geautomatiseerd", "Custom oplossingen op maat", "Integratie met jullie systemen"],
    tag: "2–3 maanden",
    accent: false,
  },
  {
    step: "04",
    title: "Retainer",
    desc: "Doorlopende ondersteuning: nieuwe implementaties, optimalisaties, en bijblijven met wat AI kan. Jouw vaste AI-partner zonder vast dienstverband.",
    deliverables: ["Maandelijkse optimalisaties", "Nieuwe mogelijkheden signaleren", "Directe support wanneer nodig"],
    tag: "Doorlopend",
    accent: false,
  },
];

export default function Processes() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("visible")
        ),
      { threshold: 0.1 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="aanbod"
      className="section"
      style={{ backgroundColor: "var(--white)" }}
    >
      <div className="container">
        <div style={{ maxWidth: "560px", marginBottom: "3.5rem" }}>
          <p
            style={{
              fontSize: "0.8rem",
              fontWeight: 500,
              color: "var(--accent)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Hoe we werken
          </p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              marginBottom: "1rem",
            }}
          >
            Van inzicht naar werkende oplossing
          </h2>
          <p style={{ color: "var(--ink-light)", fontSize: "1.05rem" }}>
            Elk traject begint met de scan. Wat daarna past, hangt af van jullie
            situatie — niet van een vast menu.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.25rem",
            marginBottom: "3rem",
          }}
        >
          {offerings.map((o, i) => (
            <div
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="reveal"
              style={{
                backgroundColor: o.accent ? "var(--green)" : "var(--cream)",
                border: `1px solid ${o.accent ? "transparent" : "var(--border)"}`,
                borderRadius: "10px",
                padding: "2rem",
                transitionDelay: `${i * 0.08}s`,
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "1.25rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: o.accent
                      ? "rgba(255,255,255,0.6)"
                      : "var(--ink-muted)",
                    backgroundColor: o.accent
                      ? "rgba(255,255,255,0.1)"
                      : "var(--white)",
                    padding: "0.25rem 0.7rem",
                    borderRadius: "20px",
                  }}
                >
                  {o.tag}
                </span>
                <span
                  style={{
                    fontFamily: "'Lora', serif",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: o.accent
                      ? "rgba(255,255,255,0.2)"
                      : "var(--border)",
                    lineHeight: 1,
                  }}
                >
                  {o.step}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: o.accent ? "var(--white)" : "var(--ink)",
                  marginBottom: "0.75rem",
                }}
              >
                {o.title}
              </h3>

              <p
                style={{
                  fontSize: "0.92rem",
                  color: o.accent
                    ? "rgba(255,255,255,0.75)"
                    : "var(--ink-light)",
                  lineHeight: 1.65,
                  marginBottom: "1.25rem",
                }}
              >
                {o.desc}
              </p>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  marginTop: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                }}
              >
                {o.deliverables.map((d, j) => (
                  <li
                    key={j}
                    style={{
                      fontSize: "0.82rem",
                      color: o.accent
                        ? "rgba(255,255,255,0.6)"
                        : "var(--ink-muted)",
                      paddingLeft: "1rem",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "0.1em",
                        color: o.accent
                          ? "rgba(255,255,255,0.35)"
                          : "var(--accent)",
                        fontSize: "0.7rem",
                      }}
                    >
                      ✓
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Scan CTA strip */}
        <div
          style={{
            backgroundColor: "var(--cream)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            padding: "2rem 2.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "1.1rem",
                fontWeight: 600,
                marginBottom: "0.25rem",
              }}
            >
              Benieuwd wat AI voor jouw bedrijf kan doen?
            </p>
            <p style={{ color: "var(--ink-light)", fontSize: "0.92rem" }}>
              Begin met de processcan. Vrijblijvend, concreet, en direct
              duidelijkheid.
            </p>
          </div>
          <a
            href="#scan"
            style={{
              display: "inline-block",
              backgroundColor: "var(--green)",
              color: "var(--white)",
              padding: "0.85rem 1.75rem",
              borderRadius: "6px",
              fontWeight: 500,
              fontSize: "0.97rem",
              whiteSpace: "nowrap",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--green-mid)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--green)")
            }
          >
            Plan een scan →
          </a>
        </div>
      </div>
    </section>
  );
}