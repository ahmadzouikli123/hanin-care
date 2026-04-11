import Link from "next/link"

export default function Home() {
  const stats = [
    { num: "3",    label: "Training Levels"    },
    { num: "21",   label: "Learning Units"     },
    { num: "500+", label: "Practice Questions" },
    { num: "100%", label: "Canadian Standards" },
  ]
  const features = [
    "🎓 Beginner → Intermediate → Advanced",
    "🧠 Interactive quizzes and case studies",
    "📜 Downloadable certificates",
    "🇨🇦 Canadian regulatory standards",
  ]
  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg,var(--primary-dark) 0%,var(--primary) 60%,#0A5A7A 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "white", textAlign: "center", padding: "2rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, background: "rgba(255,255,255,0.04)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -150, left: -150, width: 600, height: 600, background: "rgba(255,255,255,0.03)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
        <div style={{ width: 72, height: 72, background: "rgba(255,255,255,0.15)", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", margin: "0 auto 2rem" }}>🏥</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: 800, marginBottom: "1.5rem", lineHeight: 1.2 }}>
          Hanin Care <span style={{ color: "var(--accent-green)" }}>Canada</span>
        </h1>
        <p style={{ fontSize: "1.15rem", opacity: 0.85, maxWidth: 580, margin: "0 auto 0.75rem", lineHeight: 1.8 }}>Professional Support Worker (PSW) Training Platform</p>
        <p style={{ fontSize: "0.95rem", opacity: 0.65, maxWidth: 520, margin: "0 auto 3rem", lineHeight: 1.7 }}>Evidence-based curriculum · Canadian standards · 3 training levels</p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
          <Link href="/register" style={{ background: "var(--accent-green)", color: "var(--primary-dark)", padding: "0.9rem 2.5rem", borderRadius: 12, fontWeight: 700, fontSize: "1rem", textDecoration: "none" }}>Get Started Free</Link>
          <Link href="/login"    style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.3)", padding: "0.9rem 2.5rem", borderRadius: 12, fontWeight: 600, fontSize: "1rem", textDecoration: "none" }}>Sign In</Link>
        </div>
        <div style={{ display: "flex", gap: "3rem", justifyContent: "center", flexWrap: "wrap" }}>
          {stats.map(({ num, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.2rem", fontWeight: 700, color: "var(--accent-green)", display: "block" }}>{num}</span>
              <span style={{ fontSize: "0.82rem", opacity: 0.7 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
