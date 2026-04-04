"use client";
export default function Footer() {
  return (
    <footer style={{
      backgroundColor: "var(--ink)",
      color: "var(--white)",
      padding: "3rem 0",
    }}>
      <div className="container" style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
      }}>
        <span style={{
          fontFamily: "'Lora', serif",
          fontSize: "1.2rem",
          fontWeight: 600,
        }}>
          Factum<span style={{ color: "var(--accent)" }}>AI</span>
        </span>

        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>
          © {new Date().getFullYear()} FactumAI — Procesoptimalisatie voor MKB
        </p>

        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["LinkedIn", "E-mail"].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.5)",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--white)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}