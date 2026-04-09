"use client";
import { useEffect, useRef } from "react";

const diensten = [
  {
    title: "AI Processcan",
    desc: "We analyseren je werkprocessen en brengen in kaart waar tijd weglekt. Je krijgt een concreet rapport met wat AI kan oplossen, hoeveel het oplevert, en wat de logische eerste stap is.",
    tag: "Gratis startpunt",
    accent: true,
  },
  {
    title: "Quick Win Implementatie",
    desc: "Eén proces geautomatiseerd met bestaande tools of een lichte custom oplossing. Snel resultaat, direct merkbaar in je dagelijkse operatie.",
    tag: "2–4 weken",
    accent: false,
  },
  {
    title: "Full Optimization",
    desc: "Meerdere processen aangepakt, custom AI-toepassingen gebouwd voor jouw situatie. Gekoppeld aan je bestaande systemen, klaar voor dagelijks gebruik.",
    tag: "2–3 maanden",
    accent: false,
  },
  {
    title: "Retainer",
    desc: "Doorlopende ondersteuning: nieuwe implementaties, optimalisaties, en bijblijven met wat AI kan. Jouw vaste AI-partner zonder vast dienstverband.",
    tag: "Doorlopend",
    accent: false,
  },
];

const specialiteiten = [
  {
    title: "Procesoptimalisatie",
    desc: "We identificeren inefficiënties en ontwerpen slimmere workflows — met of zonder AI.",
  },
  {
    title: "AI Implementatie",
    desc: "Van off-the-shelf tools tot custom oplossingen: we bouwen wat bij je past en zorgen dat het werkt.",
  },
  {
    title: "Automatisering",
    desc: "Repetitieve taken elimineren zodat je team zich kan focussen op werk dat er echt toe doet.",
  },
  {
    title: "Systeemintegratie",
    desc: "AI-oplossingen die naadloos aansluiten op je bestaande software en werkwijzen.",
  },
];

export default function OverOnsContent() {
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("visible")
        ),
      { threshold: 0.1 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <>
      {/* Hero */}
      <section
        style={{
          backgroundColor: "var(--cream)",
          paddingTop: "8rem",
          paddingBottom: "5rem",
        }}
      >
        <div className="container">
          <div
            ref={addRef}
            className="reveal"
            style={{ maxWidth: "700px" }}
          >
            <p
              style={{
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "var(--accent)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              Over ons
            </p>
            <h1
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: "1.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              Wij maken bedrijven{" "}
              <em style={{ color: "var(--green)", fontStyle: "italic" }}>
                slimmer met AI
              </em>
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--ink-light)",
                lineHeight: 1.7,
                maxWidth: "600px",
              }}
            >
              FactumAI helpt MKB-bedrijven om hun processen te analyseren,
              optimaliseren en automatiseren met AI. Geen vage adviezen — concrete
              ingrepen met meetbaar resultaat.
            </p>
          </div>
        </div>
      </section>

      {/* Wie we zijn */}
      <section className="section" style={{ backgroundColor: "var(--white)" }}>
        <div className="container">
          <div
            ref={addRef}
            className="reveal two-col-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "5rem",
              alignItems: "center",
            }}
          >
            {/* Foto */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4/5",
                  backgroundColor: "var(--cream-dark)",
                  borderRadius: "8px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src="/foto.jpg"
                  alt="FactumAI team"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: "-1.5rem",
                  right: "-1.5rem",
                  backgroundColor: "var(--green)",
                  color: "var(--white)",
                  padding: "1.25rem 1.5rem",
                  borderRadius: "8px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Lora', serif",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                  }}
                >
                  8+ jaar
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    opacity: 0.8,
                    marginTop: "0.2rem",
                  }}
                >
                  Bedrijfskunde &
                  <br />
                  proceservaring
                </div>
              </div>
            </div>

            {/* Tekst */}
            <div>
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
                Wie we zijn
              </p>

              <h2
                style={{
                  fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                  marginBottom: "1.5rem",
                }}
              >
                Wij houden van processen die wél werken
              </h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  color: "var(--ink-light)",
                  fontSize: "1rem",
                  lineHeight: 1.7,
                }}
              >
                <p>
                  Onze achtergrond ligt in bedrijfskunde, met een focus op
                  processen, strategie en waardepropositie. We zien inefficiëntie
                  snel — en worden oprecht enthousiast van het oplossen ervan.
                </p>
                <p>
                  We werken met MKB-bedrijven van 10 tot 200 medewerkers. Niet
                  omdat dat lukraak gekozen is, maar omdat dat de schaal is waar
                  procesoptimalisatie het meeste verschil maakt en het minst
                  serieus wordt genomen.
                </p>
                <p>
                  Geen vage adviezen. Geen dure trajecten die jaren duren.
                  Concrete ingrepen, meetbaar resultaat, en als het klaar is heb
                  je er niks meer van nodig.
                </p>
              </div>

              <div
                className="badges-row"
                style={{
                  marginTop: "2rem",
                  display: "flex",
                  gap: "2rem",
                  paddingTop: "2rem",
                  borderTop: "1px solid var(--border)",
                  flexWrap: "wrap",
                }}
              >
                {[
                  { label: "Bedrijfskunde", sub: "Specialisatie processen" },
                  { label: "MKB-focus", sub: "10–200 medewerkers" },
                  { label: "No-nonsense", sub: "Resultaat voorop" },
                ].map((item, i) => (
                  <div key={i}>
                    <div
                      style={{
                        fontFamily: "'Lora', serif",
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: "var(--green)",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: "0.8rem",
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

      {/* Onze specialiteiten */}
      <section className="section" style={{ backgroundColor: "var(--cream)" }}>
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
              Specialiteiten
            </p>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                marginBottom: "1rem",
              }}
            >
              Waar wij goed in zijn
            </h2>
            <p style={{ color: "var(--ink-light)", fontSize: "1.05rem" }}>
              Onze expertise zit op het snijvlak van bedrijfsprocessen en
              technologie.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1.5rem",
            }}
            className="two-col-grid"
          >
            {specialiteiten.map((s, i) => (
              <div
                key={i}
                ref={addRef}
                className="reveal"
                style={{
                  backgroundColor: "var(--white)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  padding: "2rem 2.25rem",
                  transitionDelay: `${i * 0.08}s`,
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Lora', serif",
                    fontSize: "1.15rem",
                    fontWeight: 600,
                    marginBottom: "0.75rem",
                    color: "var(--ink)",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--ink-light)",
                    lineHeight: 1.7,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Onze diensten */}
      <section className="section" style={{ backgroundColor: "var(--white)" }}>
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
              Diensten
            </p>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                marginBottom: "1rem",
              }}
            >
              Wat we voor je kunnen doen
            </h2>
            <p style={{ color: "var(--ink-light)", fontSize: "1.05rem" }}>
              Elk traject begint met de scan. Wat daarna past, hangt af van
              jullie situatie.
            </p>
          </div>

          <div
            className="offerings-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.25rem",
              marginBottom: "3rem",
            }}
          >
            {diensten.map((d, i) => (
              <div
                key={i}
                ref={addRef}
                className="reveal"
                style={{
                  backgroundColor: d.accent ? "var(--green)" : "var(--cream)",
                  border: `1px solid ${d.accent ? "transparent" : "var(--border)"}`,
                  borderRadius: "10px",
                  padding: "2rem",
                  transitionDelay: `${i * 0.08}s`,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: d.accent
                      ? "rgba(255,255,255,0.6)"
                      : "var(--ink-muted)",
                    backgroundColor: d.accent
                      ? "rgba(255,255,255,0.1)"
                      : "var(--white)",
                    padding: "0.25rem 0.7rem",
                    borderRadius: "20px",
                    alignSelf: "flex-start",
                    marginBottom: "1.25rem",
                  }}
                >
                  {d.tag}
                </span>

                <h3
                  style={{
                    fontFamily: "'Lora', serif",
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    color: d.accent ? "var(--white)" : "var(--ink)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {d.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.92rem",
                    color: d.accent
                      ? "rgba(255,255,255,0.75)"
                      : "var(--ink-light)",
                    lineHeight: 1.65,
                  }}
                >
                  {d.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
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
              href="/#scan"
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
              Start gratis procescan →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
