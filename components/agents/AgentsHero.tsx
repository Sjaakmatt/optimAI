"use client";

export default function AgentsHero() {
  return (
    <section style={{
      minHeight: "70vh",
      display: "flex", alignItems: "center",
      background: "var(--hero-grad)",
      position: "relative", overflow: "hidden",
      paddingTop: "7rem", paddingBottom: "5rem",
    }}>
      <div style={{
        position: "absolute", top: "15%", right: "10%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
        filter: "blur(80px)", pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "700px" }}>
          <div className="fade-up fade-up-d1">
            <span className="badge badge-accent" style={{ marginBottom: "1.5rem" }}>
              AI Agents & Workflow Automatisering
            </span>
          </div>

          <h1 className="fade-up fade-up-d2" style={{
            fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
            fontWeight: 700, lineHeight: 1.1, marginBottom: "1.8rem",
          }}>
            Processen die zichzelf{" "}
            <span className="gradient-text" style={{ fontStyle: "italic" }}>
              uitvoeren.
            </span>
          </h1>

          <p className="fade-up fade-up-d3" style={{
            fontSize: "1.15rem", color: "var(--text-secondary)",
            lineHeight: 1.7, marginBottom: "1rem", maxWidth: "580px",
          }}>
            Wij bouwen AI agents die taken overnemen, beslissingen nemen op basis
            van regels, en systemen met elkaar laten praten — zonder dat daar een
            mens tussen hoeft te zitten.
          </p>

          <p className="fade-up fade-up-d3" style={{
            fontSize: "0.95rem", color: "var(--text-muted)",
            marginBottom: "2.5rem", fontStyle: "italic",
          }}>
            &ldquo;Niet praten over automatisering. Gewoon doen.&rdquo;
          </p>

          <div className="fade-up fade-up-d4" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#workflows" className="btn btn-primary btn-lg">
              Bekijk voorbeelden
            </a>
            <a href="/#scan" className="btn btn-secondary btn-lg">
              Gratis procescan
            </a>
          </div>

          <div className="stats-row" style={{
            marginTop: "4rem", paddingTop: "2rem",
            borderTop: "1px solid var(--border)",
            display: "flex", gap: "3rem", flexWrap: "wrap",
          }}>
            {[
              { num: "n8n", label: "als orkestratieplatform" },
              { num: "Custom", label: "per klant & proces" },
              { num: "24/7", label: "draait zonder toezicht" },
            ].map((item) => (
              <div key={item.label}>
                <div style={{
                  fontFamily: "var(--font-heading)", fontSize: "1.4rem",
                  fontWeight: 700, color: "var(--accent)",
                }}>
                  {item.num}
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
