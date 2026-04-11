import Link from "next/link"

export default function Home() {
  const stats = [
    { num: "27",   label: "Units"     },
    { num: "600+", label: "Hours"     },
    { num: "100+", label: "Questions" },
    { num: "100%", label: "Canadian"  },
  ]
  const team = [
    { name: "Hanin Zouikli",  role: "B.Sc. Psychology",            icon: "🎓" },
    { name: "M-Nour Zouikli", role: "B.Sc. Psychology & Business", icon: "🎓" },
    { name: "Ahmad Zouikli",  role: "Software Engineer",           icon: "💻" },
  ]
  return (
    <main style={{ height:"100vh", background:"linear-gradient(135deg,#0A3D5C 0%,#0F5A8A 55%,#1E7BA8 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", color:"white", textAlign:"center", padding:"1.5rem", position:"relative", overflow:"hidden" }}>
      {/* circles */}
      <div style={{ position:"absolute", top:-100, right:-100, width:450, height:450, background:"rgba(255,255,255,0.04)", borderRadius:"50%", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-130, left:-130, width:500, height:500, background:"rgba(255,255,255,0.03)", borderRadius:"50%", pointerEvents:"none" }} />

      <div style={{ position:"relative", zIndex:1, maxWidth:900, width:"100%" }}>
        {/* Logo + Title */}
        <img src="/logo.png" alt="Hanin Care" style={{ width:75, height:75, objectFit:"contain", filter:"drop-shadow(0 4px 20px rgba(0,0,0,0.3))", marginBottom:"0.75rem" }} />
        <h1 style={{ fontFamily:"\"Playfair Display\",serif", fontSize:"clamp(1.9rem,4vw,3rem)", fontWeight:800, lineHeight:1.15, marginBottom:"0.3rem" }}>
          Hanin Care <span style={{ color:"#7FFFC0" }}>Canada</span>
        </h1>
        <p style={{ fontSize:"0.72rem", letterSpacing:3, textTransform:"uppercase", opacity:0.6, marginBottom:"0.75rem" }}>
          Training Platform for Elderly and Dementia Care
        </p>
        <p style={{ fontSize:"0.88rem", opacity:0.82, maxWidth:520, margin:"0 auto 1.5rem", lineHeight:1.7 }}>
          Evidence-based PSW curriculum aligned with Canadian healthcare standards.
        </p>

        {/* CTA */}
        <div style={{ display:"flex", gap:"0.75rem", justifyContent:"center", flexWrap:"wrap", marginBottom:"1.75rem" }}>
          <Link href="/register" style={{ background:"#7FFFC0", color:"#0A3D5C", padding:"0.75rem 2rem", borderRadius:10, fontWeight:700, fontSize:"0.95rem", textDecoration:"none" }}>
            Get Started Free
          </Link>
          <Link href="/login" style={{ background:"rgba(255,255,255,0.15)", color:"white", border:"1px solid rgba(255,255,255,0.3)", padding:"0.75rem 2rem", borderRadius:10, fontWeight:600, fontSize:"0.95rem", textDecoration:"none" }}>
            Sign In
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display:"flex", gap:"2rem", justifyContent:"center", flexWrap:"wrap", marginBottom:"2rem" }}>
          {stats.map(({ num, label }) => (
            <div key={label} style={{ textAlign:"center" }}>
              <span style={{ fontFamily:"\"Playfair Display\",serif", fontSize:"1.7rem", fontWeight:700, color:"#7FFFC0", display:"block" }}>{num}</span>
              <span style={{ fontSize:"0.72rem", opacity:0.65 }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ width:"100%", height:1, background:"rgba(255,255,255,0.15)", marginBottom:"1.5rem" }} />

        {/* Team */}
        <p style={{ fontSize:"0.65rem", fontWeight:700, letterSpacing:3, textTransform:"uppercase", opacity:0.5, marginBottom:"1rem" }}>
          Developed & Designed By
        </p>
        <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap", marginBottom:"1rem" }}>
          {team.map(({ name, role, icon }) => (
            <div key={name} style={{ background:"rgba(255,255,255,0.1)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:14, padding:"1rem 1.5rem", minWidth:180, flex:1, maxWidth:240 }}>
              <div style={{ fontSize:"1.8rem", marginBottom:"0.4rem" }}>{icon}</div>
              <div style={{ fontWeight:700, fontSize:"0.9rem", marginBottom:"0.2rem" }}>{name}</div>
              <div style={{ fontSize:"0.72rem", opacity:0.65 }}>{role}</div>
            </div>
          ))}
        </div>

        <p style={{ fontSize:"0.72rem", opacity:0.4 }}>© 2024 Hanin Care Canada · All rights reserved</p>
      </div>
    </main>
  )
}