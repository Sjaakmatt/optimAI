"use client";
import { useEffect, useRef } from "react";

const steps = [
  {
    num: "01",
    title: "AI Procescan",
    body: "We analyseren je processen: waar lekt tijd, waar zitten fouten, wat kost onnodig geld. Je krijgt concrete bevindingen — geen vage conclusies. De scan is gratis en vrijblijvend.",
    tag: "Gratis start",
    detail: "Online scan + gesprek",
  },
  {
    num: "02",
    title: "Advies & aanpak",
    body: "Op basis van de scan bepalen we samen de aanpak. Soms is dat een bestaande tool configureren. Soms een workflow aanpassen. Soms is de beste oplossing een custom AI-applicatie.",
    tag: "Consulting",
    detail: "Altijd passend bij jouw situatie",
  },
  {
    num: "03",
    title: "Implementatie",
    body: "We voeren het uit. Van quick win in twee weken tot een volledig gebouwde applicatie die in jouw systemen werkt. Geen rapporten — werkende software die morgen tijd bespaart.",
    tag: "Bouwen",
    detail: "Quick win of custom build",
  },
  {
    num: "04",
    title: "Optioneel: retainer",
    body: "Wil je dat ik structureel meekijk? Nieuwe processen aanpakken, bestaande tools optimaliseren, bijhouden wat er in AI-land verandert en wat dat voor jou betekent.",
    tag: "Doorlopend",
    detail: "€750–€1.500/maand",
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
    <section id="aanpak" className="section" style={{ backgroundColor: "var(--cream)" }}>
      <div className="container">
        <div style={{ maxWidth: "560px", marginBottom: "4rem" }}>
          <p style={{
            fontSize: "0.8rem", fontWeight: 500, color: "var(--accent)",
            letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem",
          }}>
            Aanpak
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", marginBottom: "1rem" }}>
            Van analyse tot werkende oplossing
          </h2>
          <p style={{ color: "var(--ink-light)", fontSize: "1.05rem" }}>
            Geen eindeloos traject. We bewegen snel van probleem naar resultaat — en je betaalt alleen voor wat je nodig hebt.
          </p>
        </div>

        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", left: "2.5rem",
            top: "3rem", bottom: "3rem",
            width: "1px", backgroundColor: "var(--border)",
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {steps.map((step, i) => (
              <div
                key={i}
                ref={(el) => { refs.current[i] = el; }}
                className="reveal"
                style={{ display: "flex", gap: "2.5rem", alignItems: "flex-start", transitionDelay: `${i * 0.1}s` }}
              >
                <div style={{
                  flexShrink: 0, width: "5rem", height: "5rem", borderRadius: "50%",
                  backgroundColor: i === 0 ? "var(--accent)" : "var(--green)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Lora', serif", fontSize: "1.1rem", fontWeight: 600,
                  color: "var(--white)", position: "relative", zIndex: 1,
                }}>
                  {step.num}
                </div>

                <div style={{
                  backgroundColor: "var(--white)", border: "1px solid var(--border)",
                  borderRadius: "8px", padding: "1.75rem 2rem", flex: 1,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                    <h3 style={{ fontFamily: "'Lora', serif", fontSize: "1.2rem", fontWeight: 600 }}>
                      {step.title}
                    </h3>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <span style={{
                        fontSize: "0.75rem", fontWeight: 500, color: i === 0 ? "var(--accent)" : "var(--green)",
                        backgroundColor: i === 0 ? "#fdf3e7" : "var(--green-light)",
                        padding: "0.25rem 0.75rem", borderRadius: "20px", whiteSpace: "nowrap",
                      }}>
                        {step.tag}
                      </span>
                    </div>
                  </div>
                  <p style={{ color: "var(--ink-light)", fontSize: "0.97rem", lineHeight: 1.65, marginBottom: "0.75rem" }}>
                    {step.body}
                  </p>
                  <p style={{ fontSize: "0.82rem", color: "var(--ink-muted)" }}>
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