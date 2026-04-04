"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "1.2rem 2rem",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      backgroundColor: scrolled ? "rgba(245,240,232,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(8px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "none",
      transition: "all 0.3s ease",
    }}>
      <Link href="/" style={{
        fontFamily: "'Lora', serif", fontSize: "1.3rem", fontWeight: 600,
        color: "var(--green)", letterSpacing: "-0.02em", textDecoration: "none",
      }}>
        Factum<span style={{ color: "var(--accent)" }}>AI</span>
      </Link>

      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {[
          { label: "Aanpak", href: "/#aanpak" },
          { label: "AI Agents", href: "/agents" },
          { label: "Over mij", href: "/#over-mij" },
        ].map((item) => (
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
    </nav>
  );
}