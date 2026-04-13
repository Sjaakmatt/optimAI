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
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    title: "AI Implementatie",
    desc: "Van off-the-shelf tools tot custom oplossingen: we bouwen wat bij je past en zorgen dat het werkt.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>
      </svg>
    ),
  },
  {
    title: "Automatisering",
    desc: "Repetitieve taken elimineren zodat je team zich kan focussen op werk dat er echt toe doet.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
      </svg>
    ),
  },
  {
    title: "Systeemintegratie",
    desc: "AI-oplossingen die naadloos aansluiten op je bestaande software en werkwijzen.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
  },
];

export default function OverOnsContent() {
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    revealRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <>
      {/* Hero */}
      <section style={{
        background: "var(--hero-grad)",
        paddingTop: "8rem", paddingBottom: "5rem",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "20%", right: "10%",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
          filter: "blur(60px)", pointerEvents: "none",
        }} />
        <div className="container">
          <div ref={addRef} className="reveal" style={{ maxWidth: "700px" }}>
            <p className="section-tag">Over ons</p>
            <h1 style={{
              fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700,
              lineHeight: 1.15, marginBottom: "1.5rem",
            }}>
              Wij maken bedrijven{" "}
              <span className="gradient-text" style={{ fontStyle: "italic" }}>
                slimmer met AI
              </span>
            </h1>
            <p style={{
              fontSize: "1.1rem", color: "var(--text-secondary)",
              lineHeight: 1.7, maxWidth: "600px",
            }}>
              FactumAI helpt MKB-bedrijven om hun processen te analyseren,
              optimaliseren en automatiseren met AI. Geen vage adviezen — concrete
              ingrepen met meetbaar resultaat.
            </p>
          </div>
        </div>
      </section>

      {/* Missie & Visie */}
      <section className="section" style={{ backgroundColor: "var(--bg-alt)" }}>
        <div className="container">
          <div ref={addRef} className="reveal two-col-grid" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
          }}>
            <div className="card card-solid" style={{
              borderLeft: "3px solid var(--accent)",
            }}>
              <p className="section-tag" style={{ marginBottom: "0.75rem" }}>Onze missie</p>
              <h3 style={{
                fontFamily: "var(--font-heading)", fontSize: "1.25rem",
                fontWeight: 600, marginBottom: "1rem",
              }}>
                MKB-bedrijven concurrerend houden met AI
              </h3>
              <p style={{
                color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.7,
              }}>
                Wij geloven dat elke ondernemer toegang moet hebben tot de kracht
                van AI — niet alleen de grote corporates met diepe zakken. Daarom
                maken wij AI-implementatie bereikbaar, concreet en resultaatgericht
                voor het MKB.
              </p>
            </div>
            <div className="card card-solid" style={{
              borderLeft: "3px solid var(--gold)",
            }}>
              <p className="section-tag" style={{ marginBottom: "0.75rem", color: "var(--gold)" }}>
                Onze visie
              </p>
              <h3 style={{
                fontFamily: "var(--font-heading)", fontSize: "1.25rem",
                fontWeight: 600, marginBottom: "1rem",
              }}>
                Een toekomst waarin processen voor je werken, niet andersom
              </h3>
              <p style={{
                color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.7,
              }}>
                We zien een wereld waarin MKB-bedrijven hun energie steken in
                groei, klantrelaties en innovatie — terwijl AI het repetitieve
                werk afhandelt. Geen vervanging van mensen, maar versterking van
                wat ze kunnen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wie we zijn */}
      <section className="section" style={{ backgroundColor: "var(--bg)" }}>
        <div className="container">
          <div ref={addRef} className="reveal two-col-grid" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "5rem", alignItems: "center",
          }}>
            {/* Foto */}
            <div style={{ position: "relative" }}>
              <div style={{
                width: "100%", aspectRatio: "4/5",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid var(--border)",
                boxShadow: "var(--card-shadow)",
              }}>
                <img src="/foto.jpg" alt="FactumAI team" style={{
                  width: "100%", height: "100%", objectFit: "cover",
                }} />
              </div>

              <div style={{
                position: "absolute", bottom: "-1.5rem", right: "-1.5rem",
                background: "linear-gradient(135deg, var(--accent), var(--accent-hover))",
                color: "#fff", padding: "1.25rem 1.5rem",
                borderRadius: "var(--radius-md)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              }}>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700 }}>
                  8+ jaar
                </div>
                <div style={{ fontSize: "0.78rem", opacity: 0.85, marginTop: "0.15rem" }}>
                  Bedrijfskunde &<br />proceservaring
                </div>
              </div>
            </div>

            {/* Tekst */}
            <div>
              <p className="section-tag">Wie we zijn</p>
              <h2 className="section-title">
                Wij houden van processen die w&eacute;l werken
              </h2>

              <div style={{
                display: "flex", flexDirection: "column", gap: "1rem",
                color: "var(--text-secondary)", fontSize: "0.97rem", lineHeight: 1.7,
              }}>
                <p>
                  Onze achtergrond ligt in bedrijfskunde, met een focus op
                  processen, strategie en waardepropositie. We zien ineffici&euml;ntie
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

              <div className="badges-row" style={{
                marginTop: "2rem", display: "flex", gap: "2rem",
                paddingTop: "2rem", borderTop: "1px solid var(--border)", flexWrap: "wrap",
              }}>
                {[
                  { label: "Bedrijfskunde", sub: "Specialisatie processen" },
                  { label: "MKB-focus", sub: "10–200 medewerkers" },
                  { label: "No-nonsense", sub: "Resultaat voorop" },
                ].map((item, i) => (
                  <div key={i}>
                    <div style={{
                      fontFamily: "var(--font-heading)", fontWeight: 600,
                      fontSize: "1rem", color: "var(--accent)",
                    }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>
                      {item.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialiteiten */}
      <section className="section" style={{ backgroundColor: "var(--bg-alt)" }}>
        <div className="container">
          <div style={{ maxWidth: "560px", marginBottom: "3.5rem" }}>
            <p className="section-tag">Specialiteiten</p>
            <h2 className="section-title">Waar wij goed in zijn</h2>
            <p className="section-desc">
              Onze expertise zit op het snijvlak van bedrijfsprocessen en technologie.
            </p>
          </div>

          <div className="grid-2">
            {specialiteiten.map((s, i) => (
              <div key={i} ref={addRef} className="reveal card card-solid" style={{
                transitionDelay: `${i * 0.08}s`,
              }}>
                <div style={{ marginBottom: "1rem" }}>{s.icon}</div>
                <h3 style={{
                  fontFamily: "var(--font-heading)", fontSize: "1.1rem",
                  fontWeight: 600, marginBottom: "0.75rem",
                }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: "0.93rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diensten */}
      <section className="section" style={{ backgroundColor: "var(--bg)" }}>
        <div className="container">
          <div style={{ maxWidth: "560px", marginBottom: "3.5rem" }}>
            <p className="section-tag">Diensten</p>
            <h2 className="section-title">Wat we voor je kunnen doen</h2>
            <p className="section-desc">
              Elk traject begint met de scan. Wat daarna past, hangt af van jullie situatie.
            </p>
          </div>

          <div className="offerings-grid" style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.25rem", marginBottom: "3rem",
          }}>
            {diensten.map((d, i) => (
              <div key={i} ref={addRef} className="reveal" style={{
                background: d.accent
                  ? "linear-gradient(135deg, var(--accent), var(--accent-hover))"
                  : "var(--bg-card)",
                border: `1px solid ${d.accent ? "transparent" : "var(--border)"}`,
                borderRadius: "var(--radius-md)",
                padding: "2rem", transitionDelay: `${i * 0.08}s`,
                display: "flex", flexDirection: "column",
                boxShadow: d.accent ? "0 8px 32px var(--accent-glow)" : "var(--card-shadow)",
              }}>
                <span className="badge" style={{
                  background: d.accent ? "rgba(255,255,255,0.15)" : "var(--accent-subtle)",
                  color: d.accent ? "rgba(255,255,255,0.9)" : "var(--accent)",
                  alignSelf: "flex-start", marginBottom: "1.25rem",
                }}>
                  {d.tag}
                </span>
                <h3 style={{
                  fontFamily: "var(--font-heading)", fontSize: "1.15rem",
                  fontWeight: 600,
                  color: d.accent ? "#fff" : "var(--text)", marginBottom: "0.75rem",
                }}>
                  {d.title}
                </h3>
                <p style={{
                  fontSize: "0.9rem",
                  color: d.accent ? "rgba(255,255,255,0.75)" : "var(--text-secondary)",
                  lineHeight: 1.65,
                }}>
                  {d.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="card" style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", flexWrap: "wrap", gap: "1.5rem",
          }}>
            <div>
              <p style={{
                fontFamily: "var(--font-heading)", fontSize: "1.1rem",
                fontWeight: 600, marginBottom: "0.25rem",
              }}>
                Benieuwd wat AI voor jouw bedrijf kan doen?
              </p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>
                Begin met de processcan. Vrijblijvend, concreet, en direct duidelijkheid.
              </p>
            </div>
            <a href="/#scan" className="btn btn-primary">
              Start gratis procescan
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
