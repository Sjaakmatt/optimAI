"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: "var(--bg-alt)",
      borderTop: "1px solid var(--border)",
      padding: "4rem 0 2rem",
    }}>
      <div className="container">
        <div className="footer-grid" style={{
          display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "3rem", marginBottom: "3rem",
        }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{
              fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 700,
              color: "var(--text)", textDecoration: "none",
            }}>
              Factum<span style={{ color: "var(--accent)" }}>AI</span>
            </Link>
            <p style={{
              color: "var(--text-muted)", fontSize: "0.88rem",
              lineHeight: 1.7, marginTop: "0.75rem", maxWidth: "260px",
            }}>
              AI implementatie & procesoptimalisatie voor MKB-bedrijven.
              Concreet resultaat, geen vage beloften.
            </p>
          </div>

          {/* Diensten */}
          <div>
            <p style={{
              fontSize: "0.72rem", fontWeight: 600, color: "var(--text-muted)",
              letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem",
            }}>
              Diensten
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { label: "AI Procescan", href: "/#scan" },
                { label: "AI Agents", href: "/agents" },
                { label: "Cases", href: "/cases" },
              ].map(item => (
                <Link key={item.label} href={item.href} style={{
                  color: "var(--text-secondary)", fontSize: "0.88rem",
                  transition: "color 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Bedrijf */}
          <div>
            <p style={{
              fontSize: "0.72rem", fontWeight: 600, color: "var(--text-muted)",
              letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem",
            }}>
              Bedrijf
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { label: "Over ons", href: "/over-ons" },
                { label: "Aanpak", href: "/#aanpak" },
              ].map(item => (
                <Link key={item.label} href={item.href} style={{
                  color: "var(--text-secondary)", fontSize: "0.88rem",
                  transition: "color 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{
              fontSize: "0.72rem", fontWeight: 600, color: "var(--text-muted)",
              letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem",
            }}>
              Contact
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { label: "LinkedIn", href: "#" },
                { label: "E-mail", href: "#" },
              ].map(item => (
                <a key={item.label} href={item.href} style={{
                  color: "var(--text-secondary)", fontSize: "0.88rem",
                  transition: "color 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "1.5rem",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: "1rem",
        }}>
          <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
            &copy; {new Date().getFullYear()} FactumAI. Alle rechten voorbehouden.
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
            Procesoptimalisatie & AI implementatie voor MKB
          </p>
        </div>
      </div>
    </footer>
  );
}
