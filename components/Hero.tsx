"use client";
export default function Hero() {
  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      backgroundColor: "var(--cream)",
      position: "relative",
      overflow: "hidden",
      paddingTop: "6rem",
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
            fontSize: "0.85rem",
            fontWeight: 500,
            color: "var(--accent)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}>
            AI Implementatie & Procesoptimalisatie voor MKB
          </p>

          <h1 className="fade-up fade-up-delay-2" style={{
            fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: "1.8rem",
            letterSpacing: "-0.02em",
          }}>
            Bedrijven zonder AI zijn<br />
            <em style={{ color: "var(--green)", fontStyle: "italic" }}>over 5 jaar klaar.</em>
          </h1>

          <p className="fade-up fade-up-delay-3" style={{
            fontSize: "1.15rem",
            color: "var(--ink-light)",
            lineHeight: 1.7,
            marginBottom: "1rem",
            maxWidth: "580px",
          }}>
            Wij analyseren je processen, adviseren de aanpak, en implementeren AI. Van quick win tot custom applicatie. Geen rapporten die in een la verdwijnen.
          </p>

          <p className="fade-up fade-up-delay-3" style={{
            fontSize: "1rem",
            color: "var(--ink-muted)",
            marginBottom: "2.5rem",
            fontStyle: "italic",
          }}>
            "Ik kijk naar je processen, zie waar je uren weglekken, en plug daar AI in."
          </p>

          <div className="fade-up fade-up-delay-4" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a
              href="#scan"
              style={{
                display: "inline-block",
                backgroundColor: "var(--green)",
                color: "var(--white)",
                padding: "0.9rem 2rem",
                borderRadius: "4px",
                fontWeight: 500,
                fontSize: "1rem",
                transition: "background-color 0.2s, transform 0.15s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = "var(--green-mid)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = "var(--green)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Start gratis AI procescan →
            </a>
            <a
              href="#aanpak"
              style={{
                display: "inline-block",
                color: "var(--ink-light)",
                padding: "0.9rem 1.5rem",
                fontSize: "0.95rem",
                borderBottom: "1px solid var(--border)",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--green)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--ink-light)")}
            >
              Hoe werkt het?
            </a>
          </div>

          <div style={{
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            gap: "2.5rem",
            flexWrap: "wrap",
          }}>
            {[
              { num: "Advies", label: "tot custom build" },
              { num: "Gratis", label: "AI procescan als start" },
              { num: "MKB", label: "10–200 medewerkers" },
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