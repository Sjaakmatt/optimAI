"use client";
import { useEffect, useRef } from "react";

const steps = [
  {
    num: "01",
    title: "AI Procescan",
    body: "We analyseren je processen: waar lekt tijd, waar zitten fouten, wat kost onnodig geld. Je krijgt concrete bevindingen — geen vage conclusies. De scan is gratis en vrijblijvend.",
    tag: "Gratis start",
    detail: "Online scan + gesprek",
    featured: true,
  },
  {
    num: "02",
    title: "Advies & aanpak",
    body: "Op basis van de scan bepalen we samen de aanpak. Soms is dat een bestaande tool configureren. Soms een workflow aanpassen. Soms is de beste oplossing een custom AI-applicatie.",
    tag: "Consulting",
    detail: "Altijd passend bij jouw situatie",
    featured: false,
  },
  {
    num: "03",
    title: "Implementatie",
    body: "We voeren het uit. Van quick win in twee weken tot een volledig gebouwde applicatie die in jouw systemen werkt. Geen rapporten — werkende software die morgen tijd bespaart.",
    tag: "Bouwen",
    detail: "Quick win of custom build",
    featured: false,
  },
  {
    num: "04",
    title: "Optioneel: retainer",
    body: "Wil je dat ik structureel meekijk? Nieuwe processen aanpakken, bestaande tools optimaliseren, bijhouden wat er in AI-land verandert en wat dat voor jou betekent.",
    tag: "Doorlopend",
    detail: "Vast partnerschap",
    featured: false,
  },
];

export default function HowItWorks() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    refs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="aanpak" className="section" style={{ backgroundColor: "var(--bg)" }}>
      <div className="container">
        <div style={{ maxWidth: "560px", marginBottom: "4rem" }}>
          <p className="section-tag">Aanpak</p>
          <h2 className="section-title">Van analyse tot werkende oplossing</h2>
          <p className="section-desc">
            Geen eindeloos traject. We bewegen snel van probleem naar resultaat
            — en je betaalt alleen voor wat je nodig hebt.
          </p>
        </div>

        <div style={{ position: "relative" }}>
          {/* Timeline line */}
          <div className="timeline-line" style={{
            position: "absolute", left: "2.5rem",
            top: "3rem", bottom: "3rem",
            width: "1px",
            background: "linear-gradient(to bottom, var(--accent), var(--border))",
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {steps.map((step, i) => (
              <div
                key={i}
                ref={el => { refs.current[i] = el; }}
                className="reveal step-row"
                style={{
                  display: "flex", gap: "2rem",
                  alignItems: "flex-start",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div className="step-circle" style={{
                  flexShrink: 0, width: "5rem", height: "5rem", borderRadius: "50%",
                  backgroundColor: step.featured ? "var(--accent)" : "var(--bg-card-solid)",
                  border: step.featured ? "none" : "1px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700,
                  color: step.featured ? "#fff" : "var(--text-muted)",
                  position: "relative", zIndex: 1,
                  boxShadow: step.featured ? "0 0 30px var(--accent-glow)" : "none",
                }}>
                  {step.num}
                </div>

                <div className="card" style={{
                  flex: 1,
                  borderColor: step.featured ? "var(--accent)" : undefined,
                  boxShadow: step.featured ? "0 0 40px var(--accent-glow), var(--card-shadow)" : undefined,
                }}>
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "flex-start", marginBottom: "0.75rem",
                    flexWrap: "wrap", gap: "0.5rem",
                  }}>
                    <h3 style={{
                      fontFamily: "var(--font-heading)", fontSize: "1.15rem", fontWeight: 600,
                    }}>
                      {step.title}
                    </h3>
                    <span className={`badge ${step.featured ? "badge-accent" : "badge-outline"}`}>
                      {step.tag}
                    </span>
                  </div>
                  <p style={{
                    color: "var(--text-secondary)", fontSize: "0.95rem",
                    lineHeight: 1.65, marginBottom: "0.75rem",
                  }}>
                    {step.body}
                  </p>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
