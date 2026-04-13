"use client";

export default function Hero() {
  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      background: "var(--hero-grad)",
      position: "relative",
      overflow: "hidden",
      paddingTop: "6rem",
      paddingBottom: "4rem",
    }}>
      {/* Subtle gradient orb */}
      <div style={{
        position: "absolute",
        top: "10%", right: "5%",
        width: "600px", height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
        filter: "blur(80px)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "20%", left: "-5%",
        width: "400px", height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, var(--gold-subtle) 0%, transparent 70%)",
        filter: "blur(60px)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="hero-grid" style={{
          display: "grid", gridTemplateColumns: "3fr 2fr",
          gap: "4rem", alignItems: "center",
        }}>
          {/* Text */}
          <div>
            <div className="fade-up fade-up-d1" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              marginBottom: "2rem",
            }}>
              <span className="badge badge-accent">
                AI Implementatie & Procesoptimalisatie
              </span>
            </div>

            <h1 className="fade-up fade-up-d2" style={{
              fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
              fontWeight: 700, lineHeight: 1.08, marginBottom: "1.8rem",
            }}>
              Jouw processen,{" "}
              <span className="gradient-text" style={{ fontStyle: "italic" }}>
                versterkt met AI.
              </span>
            </h1>

            <p className="fade-up fade-up-d3" style={{
              fontSize: "1.1rem", color: "var(--text-secondary)",
              lineHeight: 1.75, marginBottom: "1rem", maxWidth: "540px",
            }}>
              FactumAI analyseert je bedrijfsprocessen, vindt waar tijd en geld
              weglekt, en implementeert AI-oplossingen die direct resultaat
              leveren. Van quick win tot custom applicatie.
            </p>

            <p className="fade-up fade-up-d3" style={{
              fontSize: "0.95rem", color: "var(--text-muted)",
              marginBottom: "2.5rem", fontStyle: "italic",
            }}>
              &ldquo;Ik kijk naar je processen, zie waar uren weglekken, en plug
              daar AI in.&rdquo;
            </p>

            <div className="fade-up fade-up-d4" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#scan" className="btn btn-primary btn-lg">
                Start gratis procescan
              </a>
              <a href="#afspraak" className="btn btn-secondary btn-lg">
                Plan een gesprek
              </a>
            </div>

            <div className="fade-up fade-up-d4 stats-row" style={{
              marginTop: "3.5rem", paddingTop: "2rem",
              borderTop: "1px solid var(--border)",
              display: "flex", gap: "3rem", flexWrap: "wrap",
            }}>
              {[
                { num: "MKB", label: "10–200 medewerkers" },
                { num: "Gratis", label: "procescan als start" },
                { num: "2–4 wk", label: "tot eerste resultaat" },
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

          {/* Photo */}
          <div className="fade-up fade-up-d3 hero-photo">
            <div style={{ position: "relative" }}>
              <div style={{
                width: "100%", aspectRatio: "1/1",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid var(--border)",
                boxShadow: "var(--card-shadow)",
              }}>
                <img src="/foto.jpg" alt="FactumAI" style={{
                  width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "center top",
                }} />
              </div>

              {/* Floating badge */}
              <div style={{
                position: "absolute", bottom: "-1rem", right: "-1rem",
                background: "var(--accent)", color: "#fff",
                padding: "1.1rem 1.4rem", borderRadius: "var(--radius-md)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              }}>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 700 }}>
                  8+ jaar
                </div>
                <div style={{ fontSize: "0.72rem", opacity: 0.85, marginTop: "0.15rem" }}>
                  Bedrijfskunde &<br />proceservaring
                </div>
              </div>
            </div>

            <p style={{
              fontSize: "0.9rem", color: "var(--text-secondary)",
              lineHeight: 1.7, marginTop: "2rem",
            }}>
              Achtergrond in bedrijfskunde, focus op processen en strategie.
              Ik werk met MKB-bedrijven van 10 tot 200 medewerkers — de schaal
              waar procesoptimalisatie het meeste verschil maakt.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
