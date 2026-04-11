import Link from "next/link"

export default function Home() {
  const stats = [
    { num: "3",    label: "Training Levels"    },
    { num: "21",   label: "Learning Units"     },
    { num: "500+", label: "Practice Questions" },
    { num: "100%", label: "Canadian Standards" },
  ]

  const team = [
    { name: "Hanin Zouikli",   role: "Bachelor in Psychology",                    icon: "🎓" },
    { name: "M-Nour Zouikli",  role: "Bachelor in Psychology & Business",          icon: "🎓" },
    { name: "Ahmad Zouikli",   role: "Software Engineer",                          icon: "💻" },
  ]

  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* HERO */}
      <div style={{ flex: 1, background: "linear-gradient(135deg,var(--primary-dark) 0%,var(--primary) 60%,#0A5A7A 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "white", textAlign: "center", padding: "2rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, background: "rgba(255,255,255,0.04)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -150, left: -150, width: 600, height: 600, background: "rgba(255,255,255,0.03)", borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
          {/* Logo */}
          <div style={{ marginBottom: "1.5rem" }}>
            <img src="/logo.png" alt="Hanin Care" style={{ width: 110, height: 110, objectFit: "contain", filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.3))" }} />
          </div>

          <h1 style={{ fontFamily: "\"Playfair Display\",serif", fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: 800, marginBottom: "0.5rem", lineHeight: 1.2 }}>
            Hanin Care <span style={{ color: "var(--accent-green)" }}>Canada</span>
          </h1>
          <p style={{ fontSize: "1rem", opacity: 0.7, letterSpacing: 3, textTransform: "uppercase", marginBottom: "1.5rem" }}>
            Training Platform for Elderly and Dementia Care
          </p>
          <p style={{ fontSize: "1.05rem", opacity: 0.85, maxWidth: 560, margin: "0 auto 3rem", lineHeight: 1.8 }}>
            Evidence-based PSW curriculum aligned with Canadian healthcare standards — 3 levels, 21 units, 500+ practice questions.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
            <Link href="/register" style={{ background: "var(--accent-green)", color: "var(--primary-dark)", padding: "0.9rem 2.5rem", borderRadius: 12, fontWeight: 700, fontSize: "1rem", textDecoration: "none" }}>
              Get Started Free
            </Link>
            <Link href="/login" style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.3)", padding: "0.9rem 2.5rem", borderRadius: 12, fontWeight: 600, fontSize: "1rem", textDecoration: "none" }}>
              Sign In
            </Link>
          </div>

          <div style={{ display: "flex", gap: "3rem", justifyContent: "center", flexWrap: "wrap" }}>
            {stats.map(({ num, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <span style={{ fontFamily: "\"Playfair Display\",serif", fontSize: "2.2rem", fontWeight: 700, color: "var(--accent-green)", display: "block" }}>{num}</span>
                <span style={{ fontSize: "0.82rem", opacity: 0.7 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TEAM SECTION */}
      <div style={{ background: "white", padding: "4rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--text-light)", marginBottom: "0.75rem" }}>
            Developed & Designed By
          </p>
          <h2 style={{ fontFamily: "\"Playfair Display\",serif", fontSize: "2rem", color: "var(--primary)", marginBottom: "3rem" }}>
            Meet the Team
          </h2>
          <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
            {team.map(({ name, role, icon }) => (
              <div key={name} style={{ background: "var(--bg)", borderRadius: 20, padding: "2rem 2.5rem", border: "1px solid var(--border)", boxShadow: "var(--shadow)", minWidth: 220, flex: 1, maxWidth: 280 }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{icon}</div>
                <h3 style={{ fontFamily: "\"Playfair Display\",serif", fontSize: "1.15rem", fontWeight: 700, color: "var(--primary)", marginBottom: "0.4rem" }}>{name}</h3>
                <p style={{ fontSize: "0.82rem", color: "var(--text-light)", lineHeight: 1.6 }}>{role}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "3rem", color: "var(--text-light)", fontSize: "0.85rem" }}>
            © 2024 Hanin Care Canada · PSW Training Platform · All rights reserved
          </p>
        </div>
      </div>
    </main>
  )
}
