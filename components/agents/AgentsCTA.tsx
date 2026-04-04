"use client";

export default function AgentsCTA() {
  return (
    <section className="section" style={{ backgroundColor: "var(--green)" }}>
      <div className="container">
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: "2rem",
        }}>
          <div style={{ maxWidth: "540px" }}>
            <p style={{
              fontSize: "0.8rem", fontWeight: 500, color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem",
            }}>
              Klaar om te starten?
            </p>
            <h2 style={{
              color: "var(--white)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              marginBottom: "1rem",
            }}>
              Welk proces automatiseren we als eerste?
            </h2>
            <p style={{
              color: "rgba(255,255,255,0.65)", fontSize: "1.05rem", lineHeight: 1.7,
            }}>
              Begin met de gratis procescan. We kijken samen welk proces het meeste oplevert om als eerste aan te pakken.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <a href="/#scan" style={{
              display: "inline-block",
              backgroundColor: "var(--white)",
              color: "var(--green)",
              padding: "0.95rem 2.2rem",
              borderRadius: "4px", fontWeight: 500, fontSize: "1rem",
              transition: "opacity 0.2s, transform 0.15s",
              whiteSpace: "nowrap",
            }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Gratis procescan aanvragen →
            </a>
            <a href="/" style={{
              textAlign: "center",
              color: "rgba(255,255,255,0.5)", fontSize: "0.9rem",
              borderBottom: "1px solid rgba(255,255,255,0.2)",
              paddingBottom: "2px",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--white)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >
              ← Terug naar home
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}