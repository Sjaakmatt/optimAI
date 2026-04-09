"use client";
export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundColor: "var(--cream)",
        position: "relative",
        overflow: "hidden",
        paddingTop: "6rem",
        paddingBottom: "4rem",
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 2fr",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          {/* Left: hero text */}
          <div>
            <p
              className="fade-up fade-up-delay-1"
              style={{
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "var(--accent)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              AI Implementatie & Procesoptimalisatie voor MKB
            </p>

            <h1
              className="fade-up fade-up-delay-2"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: "1.8rem",
                letterSpacing: "-0.02em",
              }}
            >
              Bedrijven zonder AI zijn<br />
              <em style={{ color: "var(--green)", fontStyle: "italic" }}>
                over 5 jaar klaar.
              </em>
            </h1>

            <p
              className="fade-up fade-up-delay-3"
              style={{
                fontSize: "1.1rem",
                color: "var(--ink-light)",
                lineHeight: 1.7,
                marginBottom: "1rem",
                maxWidth: "580px",
              }}
            >
              Wij analyseren je processen, adviseren de aanpak, en implementeren
              AI. Van quick win tot custom applicatie. Geen rapporten die in een
              la verdwijnen.
            </p>

            <p
              className="fade-up fade-up-delay-3"
              style={{
                fontSize: "1rem",
                color: "var(--ink-muted)",
                marginBottom: "2.5rem",
                fontStyle: "italic",
              }}
            >
              &ldquo;Ik kijk naar je processen, zie waar je uren weglekken, en plug
              daar AI in.&rdquo;
            </p>

            <div
              className="fade-up fade-up-delay-4"
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
            >
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--green-mid)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
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
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--green)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--ink-light)")
                }
              >
                Hoe werkt het?
              </a>
            </div>

            <div
              style={{
                marginTop: "3rem",
                paddingTop: "2rem",
                borderTop: "1px solid var(--border)",
                display: "flex",
                gap: "2.5rem",
                flexWrap: "wrap",
              }}
            >
              {[
                { num: "Advies", label: "tot custom build" },
                { num: "Gratis", label: "AI procescan als start" },
                { num: "MKB", label: "10–200 medewerkers" },
              ].map((item) => (
                <div key={item.label}>
                  <div
                    style={{
                      fontFamily: "'Lora', serif",
                      fontSize: "1.4rem",
                      fontWeight: 600,
                      color: "var(--green)",
                    }}
                  >
                    {item.num}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--ink-muted)" }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: about / intro */}
          <div className="fade-up fade-up-delay-3">
            {/* Photo block */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1/1",
                  backgroundColor: "var(--cream-dark)",
                  borderRadius: "8px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "0.5rem",
                    color: "var(--ink-muted)",
                  }}
                >
                  <div style={{ fontSize: "3rem" }}>👤</div>
                  <span style={{ fontSize: "0.8rem" }}>Foto hier</span>
                </div>

                {/* Floating badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "1rem",
                    right: "1rem",
                    backgroundColor: "var(--green)",
                    color: "var(--white)",
                    padding: "1rem 1.25rem",
                    borderRadius: "8px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Lora', serif",
                      fontSize: "1.3rem",
                      fontWeight: 600,
                    }}
                  >
                    8+ jaar
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      opacity: 0.8,
                      marginTop: "0.2rem",
                    }}
                  >
                    Bedrijfskunde &<br />
                    proceservaring
                  </div>
                </div>
              </div>
            </div>

            {/* Short intro text */}
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--ink-light)",
                lineHeight: 1.7,
                marginTop: "1.5rem",
              }}
            >
              Mijn achtergrond is bedrijfskunde, met een focus op processen,
              strategie en waardepropositie. Ik werk met MKB-bedrijven van 10 tot
              200 medewerkers — de schaal waar procesoptimalisatie het meeste
              verschil maakt.
            </p>

            {/* Badges */}
            <div
              className="badges-row"
              style={{
                marginTop: "1.25rem",
                display: "flex",
                gap: "1.5rem",
                paddingTop: "1.25rem",
                borderTop: "1px solid var(--border)",
                flexWrap: "wrap",
              }}
            >
              {[
                { label: "Bedrijfskunde", sub: "Processen" },
                { label: "MKB-focus", sub: "10–200 medewerkers" },
                { label: "No-nonsense", sub: "Resultaat voorop" },
              ].map((item, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontFamily: "'Lora', serif",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      color: "var(--green)",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--ink-muted)",
                      marginTop: "0.15rem",
                    }}
                  >
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
