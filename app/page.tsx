import Link from "next/link"

export default function Home() {
  const stats = [
    { num: "27",   label: "Training Units"     },
    { num: "600+", label: "Training Hours"     },
    { num: "100+", label: "Practice Questions" },
    { num: "100%", label: "Canadian Standards" },
  ]

  const team = [
    { name: "Hanin Zouikli",  role: "Bachelor in Psychology",             icon: "🎓" },
    { name: "M-Nour Zouikli", role: "Bachelor in Psychology & Business",  icon: "🎓" },
    { name: "Ahmad Zouikli",  role: "Software Engineer",                  icon: "💻" },
  ]

  return (
    <main style={{ margin: 0, padding: 0 }}>
      {/* ── HERO — full viewport height ── */}
      <section style={{
        height: "100vh",
        background: "linear-gradient(135deg,#0A3D5C 0%,#0F5A8A 55%,#1E7BA8 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* decorative circles */}
        <div style={{ position:"absolute", top:-120, right:-120, width:500, height:500, background:"rgba(255,255,255,0.04)", borderRadius:"50%", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-160, left:-160, width:600, height:600, background:"rgba(255,255,255,0.03)", borderRadius:"50%", pointerEvents:"none" }} />

        <div style={{ position:"relative", zIndex:1, maxWidth:820, width:"100%" }}>
          {/* Logo */}
          <img
            src="/logo.png"
            alt="Hanin Care"
            style={{ width:100, height:100, objectFit:"contain", filter:"drop-shadow(0 4px 24px rgba(0,0,0,0.3))", marginBottom:"1.5rem" }}
          />

          <h1 style={{ fontFamily:"\"Playfair Display\",serif", fontSize:"clamp(2.2rem,5vw,3.8rem)", fontWeight:800, lineHeight:1.15, marginBottom:"0.5rem" }}>
            Hanin Care <span style={{ color:"#7FFFC0" }}>Canada</span>
          </h1>

          <p style={{ fontSize:"0.82rem", letterSpacing:3, textTransform:"uppercase", opacity:0.65, marginBottom:"1.25rem" }}>
            Training Platform for Elderly and Dementia Care
          </p>

          <p style={{ fontSize:"1rem", opacity:0.85, maxWidth:580, margin:"0 auto 2.5rem", lineHeight:1.8 }}>
            Evidence-based PSW curriculum aligned with Canadian healthcare standards — 3 levels, 27 units, 600+ training hours.
          </p>

          {/* CTA Buttons */}
          <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap", marginBottom:"3rem" }}>
            <Link href="/register" style={{ background:"#7FFFC0", color:"#0A3D5C", padding:"0.9rem 2.5rem", borderRadius:12, fontWeight:700, fontSize:"1rem", textDecoration:"none" }}>
              Get Started Free
            </Link>
            <Link href="/login" style={{ background:"rgba(255,255,255,0.15)", color:"white", border:"1px solid rgba(255,255,255,0.3)", padding:"0.9rem 2.5rem", borderRadius:12, fontWeight:600, fontSize:"1rem", textDecoration:"none" }}>
              Sign In
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display:"flex", gap:"2.5rem", justifyContent:"center", flexWrap:"wrap" }}>
            {stats.map(({ num, label }) => (
              <div key={label} style={{ textAlign:"center" }}>
                <span style={{ fontFamily:"\"Playfair Display\",serif", fontSize:"2rem", fontWeight:700, color:"#7FFFC0", display:"block" }}>{num}</span>
                <span style={{ fontSize:"0.78rem", opacity:0.7 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* scroll hint */}
        <div style={{ position:"absolute", bottom:"1.5rem", left:"50%", transform:"translateX(-50%)", opacity:0.5, fontSize:"0.75rem", letterSpacing:2, textTransform:"uppercase" }}>
          ↓ Meet the team
        </div>
      </section>

      {/* ── TEAM SECTION ── */}
      <section style={{ background:"white", padding:"5rem 2rem", textAlign:"center" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <p style={{ fontSize:"0.75rem", fontWeight:700, letterSpacing:3, textTransform:"uppercase", color:"var(--text-light)", marginBottom:"0.75rem" }}>
            Developed & Designed By
          </p>
          <h2 style={{ fontFamily:"\"Playfair Display\",serif", fontSize:"2.2rem", color:"var(--primary)", marginBottom:"3rem" }}>
            Meet the Team
          </h2>

          <div style={{ display:"flex", gap:"2rem", justifyContent:"center", flexWrap:"wrap", marginBottom:"3.5rem" }}>
            {team.map(({ name, role, icon }) => (
              <div key={name} style={{ background:"var(--bg)", borderRadius:20, padding:"2.25rem 2.5rem", border:"1px solid var(--border)", boxShadow:"var(--shadow)", minWidth:220, flex:1, maxWidth:280 }}>
                <div style={{ fontSize:"2.8rem", marginBottom:"1rem" }}>{icon}</div>
                <h3 style={{ fontFamily:"\"Playfair Display\",serif", fontSize:"1.15rem", fontWeight:700, color:"var(--primary)", marginBottom:"0.4rem" }}>{name}</h3>
                <p style={{ fontSize:"0.82rem", color:"var(--text-light)", lineHeight:1.6 }}>{role}</p>
              </div>
            ))}
          </div>

          <p style={{ color:"var(--text-light)", fontSize:"0.85rem" }}>
            © 2024 Hanin Care Canada · PSW Training Platform · All rights reserved
          </p>
        </div>
      </section>
    </main>
  )
}