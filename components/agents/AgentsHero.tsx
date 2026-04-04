"use client";

export default function AgentsHero() {
  return (
    <section style={{
      minHeight: "70vh",
      display: "flex",
      alignItems: "center",
      backgroundColor: "var(--cream)",
      position: "relative",
      overflow: "hidden",
      paddingTop: "7rem",
      paddingBottom: "5rem",
    }}>
      <div style={{
        position: "absolute",
        top: 0, right: 0,
        width: "45%",
        height: "100%",
        backgroundColor: "var(--green-light)",
        clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)",
        opacity: 0.5,
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "700px" }}>
          <p className="fade-up fade-up-delay-1" style={{
            fontSize: "0.85rem", fontWeight: 500, color: "var(--accent)",
            letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem",
          }}>
            AI Agents & Workflow Automatisering
          </p>
          <h1 className="fade-up fade-up-delay-2" style={{
            fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
            fontWeight: 700, lineHeight: 1.1,
            marginBottom: "1.8rem",
            letterSpacing: "-0.02em",
          }}>
            Processen die zichzelf<br />
            <em style={{ color: "var(--green)", fontStyle: "italic" }}>uitvoeren.</em>
          </h1>
          <p className="fade-up fade-up-delay-3" style={{
            fontSize: "1.15rem", color: "var(--ink-light)",
            lineHeight: 1.7, marginBottom: "1rem", maxWidth: "580px",
          }}>
            Wij bouwen AI agents die taken overnemen, beslissingen nemen op basis van regels, en systemen met elkaar laten praten — zonder dat daar een mens tussen hoeft te zitten.
          </p>
          <p className="fade-up fade-up-delay-3" style={{
            fontSize: "1rem", color: "var(--ink-muted)",
            marginBottom: "2.5rem", fontStyle: "italic",
          }}>
            "Niet praten over automatisering. Gewoon doen."
          </p>

          <div className="fade-up fade-up-delay-4" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#workflows" style={{
              display: "inline-block",
              backgroundColor: "var(--green)",
              color: "var(--white)",
              padding: "0.9rem 2rem", borderRadius: "4px",
              fontWeight: 500, fontSize: "1rem",
              transition: "background-color 0.2s, transform 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--green-mid)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "var(--green)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Bekijk voorbeelden →
            </a>
            <a href="/#scan" style={{
              display: "inline-block",
              color: "var(--ink-light)",
              padding: "0.9rem 1.5rem", fontSize: "0.95rem",
              borderBottom: "1px solid var(--border)",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--green)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--ink-light)")}
            >
              Gratis procescan
            </a>
          </div>

          <div style={{
            marginTop: "4rem", paddingTop: "2rem",
            borderTop: "1px solid var(--border)",
            display: "flex", gap: "2.5rem", flexWrap: "wrap",
          }}>
            {[
              { num: "n8n", label: "als orkestratieplatform" },
              { num: "Custom", label: "per klant & proces" },
              { num: "24/7", label: "draait zonder toezicht" },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ fontFamily: "'Lora', serif", fontSize: "1.4rem", fontWeight: 600, color: "var(--green)" }}>
                  {item.num}
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--ink-muted)" }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}