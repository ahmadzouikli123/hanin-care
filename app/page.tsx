import Link from "next/link"

export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#F8FAFC",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      overflowX: "hidden",
    }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(15,90,138,0.08)",
        padding: "0 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 68,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img src="/logo.png" alt="Logo" style={{ width: 40, height: 40, objectFit: "contain" }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#0F5A8A", letterSpacing: -0.3 }}>Elder Support Training</div>
            <div style={{ fontSize: "0.65rem", color: "#64748B", letterSpacing: 1.5, textTransform: "uppercase" }}>PSW · Canada</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <Link href="/login" style={{
            color: "#0F5A8A", fontWeight: 600, fontSize: "0.9rem",
            textDecoration: "none", padding: "0.5rem 1.25rem",
          }}>Sign In</Link>
          <Link href="/register" style={{
            background: "#0F5A8A", color: "white",
            padding: "0.55rem 1.4rem", borderRadius: 8,
            fontWeight: 700, fontSize: "0.9rem", textDecoration: "none",
          }}>Get Started Free →</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        paddingTop: 130, paddingBottom: 100,
        background: "linear-gradient(160deg, #0A3D5C 0%, #0F5A8A 45%, #1a7ab8 100%)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Background decorations */}
        <div style={{ position: "absolute", top: -120, right: -120, width: 500, height: 500, background: "rgba(127,255,192,0.06)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 400, height: 400, background: "rgba(255,255,255,0.03)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", top: "30%", left: "60%", width: 2, height: "40%", background: "rgba(255,255,255,0.06)" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 1 }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(127,255,192,0.12)", border: "1px solid rgba(127,255,192,0.3)",
            borderRadius: 20, padding: "0.35rem 1rem", marginBottom: "2rem",
            fontSize: "0.78rem", color: "#7FFFC0", fontWeight: 600, letterSpacing: 0.5,
          }}>
            🇨🇦 Aligned with Canadian PSW Standards · HSCPOA · FLTCA 2021
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <h1 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2.4rem, 4vw, 3.4rem)",
                fontWeight: 800, color: "white", lineHeight: 1.15,
                marginBottom: "1.5rem", letterSpacing: -1,
              }}>
                The Complete<br />
                <span style={{ color: "#7FFFC0" }}>PSW Training</span><br />
                Platform for Canada
              </h1>
              <p style={{
                fontSize: "1.05rem", color: "rgba(255,255,255,0.75)",
                lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 480,
              }}>
                Evidence-based curriculum aligned with Ontario HSCPOA, BC CHW, and Alberta ALIS standards. 27 units · 250+ hours · 100+ assessments.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/register" style={{
                  background: "#7FFFC0", color: "#0A3D5C",
                  padding: "0.9rem 2.25rem", borderRadius: 10,
                  fontWeight: 800, fontSize: "0.98rem", textDecoration: "none",
                  boxShadow: "0 8px 32px rgba(127,255,192,0.35)",
                }}>
                  Start Learning Free →
                </Link>
                <Link href="/login" style={{
                  background: "rgba(255,255,255,0.1)", color: "white",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  padding: "0.9rem 2rem", borderRadius: 10,
                  fontWeight: 600, fontSize: "0.98rem", textDecoration: "none",
                }}>
                  Sign In
                </Link>
              </div>
            </div>

            {/* Stats card */}
            <div style={{
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 24, padding: "2.5rem",
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                {[
                  { num: "27", label: "Training Units", icon: "📘" },
                  { num: "250+", label: "Learning Hours", icon: "⏱" },
                  { num: "100+", label: "Assessments", icon: "🧠" },
                  { num: "3", label: "Skill Levels", icon: "🎓" },
                ].map(({ num, label, icon }) => (
                  <div key={label} style={{
                    background: "rgba(255,255,255,0.07)",
                    borderRadius: 16, padding: "1.5rem",
                    border: "1px solid rgba(255,255,255,0.08)",
                    textAlign: "center",
                  }}>
                    <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>{icon}</div>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 700, color: "#7FFFC0" }}>{num}</div>
                    <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", marginTop: "0.2rem" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LEVELS ── */}
      <section style={{ padding: "80px 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: 2, color: "#0F5A8A", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            CURRICULUM STRUCTURE
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.2rem", fontWeight: 800, color: "#0A3D5C", marginBottom: "1rem" }}>
            Three Levels of Professional Growth
          </h2>
          <p style={{ color: "#64748B", fontSize: "1rem", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            Progress from foundational Canadian healthcare knowledge to advanced clinical expertise and leadership.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: "1.5rem" }}>
          {[
            {
              level: "Beginner", icon: "🌱", units: "Units 1–8", hours: "80 hours",
              color: "#0F5A8A", bg: "#EFF6FF", border: "#BFDBFE",
              desc: "Canadian healthcare system, professional ethics, infection control, communication, personal care, mobility, and nutrition.",
              topics: ["Canada Health Act", "HCCA & PHIPA", "Infection Control", "ADL Assistance"],
            },
            {
              level: "Intermediate", icon: "📊", units: "Units 9–18", hours: "100 hours",
              color: "#B45309", bg: "#FFFBEB", border: "#FCD34D",
              desc: "Clinical observation, chronic disease, wound care, medications, mental health, palliative care, and documentation.",
              topics: ["Vital Signs", "Chronic Disease", "Dementia Care", "End-of-Life Care"],
            },
            {
              level: "Advanced", icon: "🏆", units: "Units 19–27", hours: "70 hours",
              color: "#6D28D9", bg: "#F5F3FF", border: "#C4B5FD",
              desc: "Complex conditions, delegated acts, gerontology, Indigenous cultural safety, emergency preparedness, and leadership.",
              topics: ["Delegated Acts", "Indigenous Safety", "Emergency Codes", "PSW Leadership"],
            },
          ].map(({ level, icon, units, hours, color, bg, border, desc, topics }) => (
            <div key={level} style={{
              background: "white", borderRadius: 20,
              border: `1.5px solid ${border}`,
              padding: "2rem", boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: bg, color, borderRadius: 20,
                padding: "0.35rem 1rem", fontSize: "0.78rem", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: 1, marginBottom: "1.25rem",
              }}>
                {icon} {level}
              </div>
              <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", fontSize: "0.82rem", color: "#64748B" }}>
                <span>📘 {units}</span>
                <span>⏱ {hours}</span>
              </div>
              <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.7, marginBottom: "1.25rem" }}>{desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {topics.map(t => (
                  <span key={t} style={{
                    background: bg, color, padding: "0.25rem 0.7rem",
                    borderRadius: 6, fontSize: "0.72rem", fontWeight: 600,
                  }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ background: "#F1F5F9", padding: "80px 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: 2, color: "#0F5A8A", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              PLATFORM FEATURES
            </div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.2rem", fontWeight: 800, color: "#0A3D5C" }}>
              Everything You Need to Succeed
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: "1.25rem" }}>
            {[
              { icon: "📖", title: "Rich Theory Content", desc: "Comprehensive theory blocks aligned with HSCPOA standards, with tables, infoboxes, and practical skill guides." },
              { icon: "🧠", title: "Interactive Quizzes", desc: "3 difficulty levels per unit with instant feedback, explanations, and progress tracking." },
              { icon: "📋", title: "Case Studies", desc: "Real-world clinical scenarios reflecting Canadian LTC, home care, and community care settings." },
              { icon: "📺", title: "Learning Videos", desc: "Curated educational videos from WHO, CDC, and Canadian healthcare educators for each unit." },
              { icon: "🎓", title: "Certificates", desc: "Downloadable certificates of completion for each level — shareable with Canadian employers." },
              { icon: "📱", title: "Mobile-Ready", desc: "Fully responsive platform — study on any device, anywhere in Canada." },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{
                background: "white", borderRadius: 16, padding: "1.75rem",
                border: "1px solid #E2E8F0",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{icon}</div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0A3D5C", marginBottom: "0.5rem" }}>{title}</h3>
                <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: "linear-gradient(135deg, #0A3D5C, #0F5A8A)",
        padding: "80px 2rem", textAlign: "center",
      }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "2.2rem", fontWeight: 800, color: "white",
            marginBottom: "1rem",
          }}>
            Start Your PSW Journey Today
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
            Join PSWs across Canada building their knowledge and advancing their careers with evidence-based training.
          </p>
          <Link href="/register" style={{
            background: "#7FFFC0", color: "#0A3D5C",
            padding: "1rem 2.5rem", borderRadius: 10,
            fontWeight: 800, fontSize: "1rem", textDecoration: "none",
            display: "inline-block",
            boxShadow: "0 8px 32px rgba(127,255,192,0.3)",
          }}>
            Get Started — It&apos;s Free →
          </Link>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ padding: "60px 2rem", maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: 2, color: "#94A3B8", textTransform: "uppercase", marginBottom: "2rem" }}>
          DEVELOPED & DESIGNED BY
        </div>
        <div style={{ display: "flex", gap: "1.25rem", justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { name: "Hanin Zouikli", role: "B.Sc. Psychology", icon: "🎓" },
            { name: "M-Nour Zouikli", role: "B.Sc. Psychology & Business", icon: "🎓" },
            { name: "Ahmad Zouikli", role: "Software Engineer", icon: "💻" },
          ].map(({ name, role, icon }) => (
            <div key={name} style={{
              background: "white", border: "1px solid #E2E8F0",
              borderRadius: 16, padding: "1.5rem 2rem",
              minWidth: 200, flex: 1, maxWidth: 260,
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{icon}</div>
              <div style={{ fontWeight: 700, color: "#0A3D5C", marginBottom: "0.25rem" }}>{name}</div>
              <div style={{ fontSize: "0.8rem", color: "#64748B" }}>{role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: "#0A3D5C", color: "white",
        padding: "2rem", textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "1rem", flexWrap: "wrap", fontSize: "0.85rem" }}>
            <Link href="/privacy" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Terms of Service</Link>
            <Link href="/login" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Sign In</Link>
            <Link href="/register" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Register</Link>
          </div>
          <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)" }}>
            © 2024 Elder Support Training PSW · All rights reserved · Canadian PSW Training Platform
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginTop: "0.75rem", fontSize: "0.72rem", color: "rgba(255,255,255,0.3)" }}>
            <span>✓ Ontario HSCPOA</span>
            <span>✓ BC CHW Standards</span>
            <span>✓ Alberta ALIS</span>
          </div>
        </div>
      </footer>

    </main>
  )
}
