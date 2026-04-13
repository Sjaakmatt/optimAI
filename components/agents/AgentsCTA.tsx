"use client";

export default function AgentsCTA() {
  return (
    <section className="section" style={{
      background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)",
    }}>
      <div className="container">
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: "2rem",
        }}>
          <div style={{ maxWidth: "540px" }}>
            <p style={{
              fontSize: "0.8rem", fontWeight: 600,
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.12em", textTransform: "uppercase",
              marginBottom: "1rem",
            }}>
              Klaar om te starten?
            </p>
            <h2 style={{
              color: "#fff", fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 700, marginBottom: "1rem",
            }}>
              Welk proces automatiseren we als eerste?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", lineHeight: 1.7 }}>
              Begin met de gratis procescan. We kijken samen welk proces het
              meeste oplevert om als eerste aan te pakken.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <a href="/#scan" className="btn btn-lg" style={{
              backgroundColor: "#fff", color: "var(--accent-hover)",
              fontWeight: 600,
            }}>
              Gratis procescan aanvragen
            </a>
            <a href="/" style={{
              textAlign: "center", color: "rgba(255,255,255,0.55)",
              fontSize: "0.9rem", transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
            >
              &larr; Terug naar home
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
