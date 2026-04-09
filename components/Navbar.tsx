"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navItems = [
    { label: "Aanpak", href: "/#aanpak" },
    { label: "AI Agents", href: "/agents" },
    { label: "Over ons", href: "/over-ons" },
  ];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0,
        zIndex: menuOpen ? 300 : 100,
        padding: "1.2rem 2rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        backgroundColor: menuOpen ? "var(--cream)" : scrolled ? "rgba(245,240,232,0.95)" : "transparent",
        backdropFilter: scrolled && !menuOpen ? "blur(8px)" : "none",
        borderBottom: scrolled && !menuOpen ? "1px solid var(--border)" : "none",
        transition: "background-color 0.3s ease, border-bottom 0.3s ease",
      }}>
        <Link href="/" onClick={() => setMenuOpen(false)} style={{
          fontFamily: "'Lora', serif", fontSize: "1.3rem", fontWeight: 600,
          color: "var(--green)", letterSpacing: "-0.02em", textDecoration: "none",
          position: "relative", zIndex: 301,
        }}>
          Factum<span style={{ color: "var(--accent)" }}>AI</span>
        </Link>

        {/* Desktop nav links */}
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} style={{
              fontSize: "0.9rem", color: "var(--ink-light)", fontWeight: 400,
              textDecoration: "none", transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--green)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--ink-light)")}
            >
              {item.label}
            </Link>
          ))}
          <a href="/#scan" style={{
            backgroundColor: "var(--green)", color: "var(--white)",
            padding: "0.55rem 1.2rem", borderRadius: "4px",
            fontSize: "0.9rem", fontWeight: 500, transition: "background-color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--green-mid)")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--green)")}
          >
            Gratis procescan
          </a>
        </div>

        {/* Hamburger button */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu"
          style={{
            display: "none",
            flexDirection: "column",
            gap: "5px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            position: "relative",
            zIndex: 301,
          }}
        >
          <span style={{
            display: "block", width: "24px", height: "2px",
            backgroundColor: "var(--ink)",
            transition: "transform 0.3s, opacity 0.3s",
            transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
          }} />
          <span style={{
            display: "block", width: "24px", height: "2px",
            backgroundColor: "var(--ink)",
            transition: "opacity 0.3s",
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            display: "block", width: "24px", height: "2px",
            backgroundColor: "var(--ink)",
            transition: "transform 0.3s, opacity 0.3s",
            transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
          }} />
        </button>
      </nav>

      {/* Mobile fullscreen overlay - rendered outside of nav */}
      {menuOpen && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "var(--cream)",
          zIndex: 299,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
        }}>
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)} style={{
              fontSize: "1.4rem",
              fontFamily: "'Lora', serif",
              color: "var(--ink)",
              fontWeight: 500,
              textDecoration: "none",
              transition: "color 0.2s",
            }}>
              {item.label}
            </Link>
          ))}
          <a href="/#scan" onClick={() => setMenuOpen(false)} style={{
            backgroundColor: "var(--green)", color: "var(--white)",
            padding: "0.85rem 2rem", borderRadius: "4px",
            fontSize: "1.1rem", fontWeight: 500,
            marginTop: "1rem",
          }}>
            Gratis procescan
          </a>
        </div>
      )}
    </>
  );
}
