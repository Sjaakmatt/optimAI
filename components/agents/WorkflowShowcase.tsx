"use client";
import { useEffect, useRef } from "react";

export default function WorkflowShowcase() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="workflows" className="section" style={{ backgroundColor: "var(--bg)" }}>
      <div className="container">
        <div style={{ maxWidth: "560px", marginBottom: "3.5rem" }}>
          <p className="section-tag">Onder de motorkap</p>
          <h2 className="section-title">Zo ziet een AI workflow eruit</h2>
          <p className="section-desc">
            We bouwen workflows in n8n — een visueel orkestratieplatform dat
            jouw systemen aan elkaar knoopt. Hieronder een voorbeeld.
          </p>
        </div>

        <div ref={ref} className="reveal card card-solid" style={{
          padding: 0, overflow: "hidden",
        }}>
          {/* Vervang src door een eigen screenshot/video van een n8n workflow */}
          <div style={{
            position: "relative", width: "100%",
            aspectRatio: "16/9",
            backgroundColor: "var(--bg-card-solid)",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}>
            {/* Placeholder: vervang door <img> of <video> met je eigen n8n content */}
            <img
              src="/n8n-workflow.png"
              alt="Voorbeeld n8n workflow"
              style={{
                width: "100%", height: "100%", objectFit: "cover",
              }}
              onError={(e) => {
                // Als de afbeelding niet bestaat, toon placeholder
                const target = e.currentTarget;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  const placeholder = document.createElement("div");
                  placeholder.style.cssText = "display:flex;flex-direction:column;align-items:center;gap:1rem;padding:3rem;text-align:center;";
                  placeholder.innerHTML = `
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
                      <line x1="7" y1="2" x2="7" y2="22"/>
                      <line x1="17" y1="2" x2="17" y2="22"/>
                      <line x1="2" y1="12" x2="22" y2="12"/>
                      <line x1="2" y1="7" x2="7" y2="7"/>
                      <line x1="2" y1="17" x2="7" y2="17"/>
                      <line x1="17" y1="7" x2="22" y2="7"/>
                      <line x1="17" y1="17" x2="22" y2="17"/>
                    </svg>
                    <p style="color:var(--text-muted);font-size:0.9rem;">Voeg <strong>/n8n-workflow.png</strong> toe aan de public folder<br/>of vervang door een video embed.</p>
                  `;
                  parent.appendChild(placeholder);
                }
              }}
            />
          </div>

          {/* Caption bar */}
          <div style={{
            padding: "1.25rem 2rem",
            borderTop: "1px solid var(--border)",
            display: "flex", justifyContent: "space-between",
            alignItems: "center", flexWrap: "wrap", gap: "1rem",
          }}>
            <div>
              <p style={{
                fontFamily: "var(--font-heading)", fontSize: "1rem",
                fontWeight: 600, marginBottom: "0.15rem",
              }}>
                Visuele workflow in n8n
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                Elke stap is zichtbaar, testbaar en aanpasbaar aan jouw processen.
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {["Open source", "Self-hosted", "300+ integraties"].map((tag) => (
                <span key={tag} className="badge badge-outline" style={{ fontSize: "0.7rem" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
