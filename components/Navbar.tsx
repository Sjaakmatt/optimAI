"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navItems = [
    { label: "Aanpak", href: "/#aanpak" },
    { label: "Cases", href: "/cases" },
    { label: "AI Agents", href: "/agents" },
    { label: "Over ons", href: "/over-ons" },
  ];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: menuOpen ? 300 : 100,
        padding: "1rem 2rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        backgroundColor: menuOpen ? "var(--bg)" : scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled && !menuOpen ? "blur(12px)" : "none",
        borderBottom: scrolled && !menuOpen ? "1px solid var(--border)" : "1px solid transparent",
        transition: "background-color 0.3s ease, border-bottom 0.3s ease",
      }}>
        <Link href="/" onClick={() => setMenuOpen(false)} style={{
          fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 700,
          color: "var(--text)", letterSpacing: "-0.02em", textDecoration: "none",
          position: "relative", zIndex: 301,
        }}>
          Factum<span style={{ color: "var(--accent)" }}>AI</span>
        </Link>

        {/* Desktop nav */}
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} style={{
              fontSize: "0.88rem", color: "var(--text-secondary)", fontWeight: 400,
              textDecoration: "none", transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {item.label}
            </Link>
          ))}

          {/* Theme toggle */}
          <button onClick={toggle} aria-label="Wissel thema" style={{
            background: "none", border: "1px solid var(--border)", borderRadius: "var(--radius-full)",
            padding: "0.4rem", cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", width: "36px", height: "36px",
            color: "var(--text-secondary)", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
          >
            {theme === "dark" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>

          <a href="/#scan" className="btn btn-primary" style={{ padding: "0.55rem 1.3rem", fontSize: "0.88rem" }}>
            Gratis procescan
          </a>
        </div>

        {/* Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button onClick={toggle} className="hamburger" aria-label="Wissel thema" style={{
            display: "none", background: "none", border: "1px solid var(--border)",
            borderRadius: "var(--radius-full)", padding: "0.4rem", cursor: "pointer",
            width: "36px", height: "36px", color: "var(--text-secondary)",
            alignItems: "center", justifyContent: "center", zIndex: 301,
          }}>
            {theme === "dark" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>

          <button className="hamburger" onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu" style={{
              display: "none", flexDirection: "column", gap: "5px",
              background: "none", border: "none", cursor: "pointer", padding: "4px",
              position: "relative", zIndex: 301,
            }}
          >
            <span style={{
              display: "block", width: "22px", height: "2px", backgroundColor: "var(--text)",
              transition: "transform 0.3s, opacity 0.3s",
              transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            }} />
            <span style={{
              display: "block", width: "22px", height: "2px", backgroundColor: "var(--text)",
              transition: "opacity 0.3s", opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: "block", width: "22px", height: "2px", backgroundColor: "var(--text)",
              transition: "transform 0.3s, opacity 0.3s",
              transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "var(--bg)", zIndex: 299,
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", gap: "2rem",
        }}>
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)} style={{
              fontSize: "1.4rem", fontFamily: "var(--font-heading)", color: "var(--text)",
              fontWeight: 500, textDecoration: "none", transition: "color 0.2s",
            }}>
              {item.label}
            </Link>
          ))}
          <a href="/#scan" onClick={() => setMenuOpen(false)}
            className="btn btn-primary btn-lg" style={{ marginTop: "1rem" }}
          >
            Gratis procescan
          </a>
        </div>
      )}
    </>
  );
}
