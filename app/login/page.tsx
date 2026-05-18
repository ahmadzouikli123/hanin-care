"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  const [error, setError]       = useState("")
  const [loading, setLoading]   = useState(false)
  const [gLoading, setGLoading] = useState(false)
  const [showAdmin, setShowAdmin]       = useState(false)
  const [adminEmail, setAdminEmail]     = useState("")
  const [adminPass, setAdminPass]       = useState("")
  const [adminError, setAdminError]     = useState("")
  const [adminLoading, setAdminLoading] = useState(false)

  const handleGoogle = async () => {
    setGLoading(true)
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` }
    })
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const supabase = createClient()
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    if (err) { setError(err.message); setLoading(false) }
    else router.push("/dashboard")
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAdminError("")
    setAdminLoading(true)
    const supabase = createClient()
    const { data, error: err } = await supabase.auth.signInWithPassword({ email: adminEmail, password: adminPass })
    if (err) { setAdminError(err.message); setAdminLoading(false); return }
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", data.user.id).single()
    if ((profile as any)?.role === "admin") router.push("/admin")
    else { setAdminError("Access denied — admin only"); setAdminLoading(false) }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* ── LEFT PANEL ── */}
      <div style={{
        flex: "0 0 48%", background: "linear-gradient(160deg, #0A3D5C 0%, #0F5A8A 50%, #1a7ab8 100%)",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        padding: "3rem", position: "relative", overflow: "hidden",
      }}>
        {/* Decorations */}
        <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, background: "rgba(127,255,192,0.06)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 350, height: 350, background: "rgba(255,255,255,0.03)", borderRadius: "50%" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 420, width: "100%", textAlign: "center" }}>
          {/* Logo */}
          <img src="/logo.png" alt="Logo" style={{ width: 80, height: 80, objectFit: "contain", marginBottom: "1.5rem", filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.2))" }} />

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "2rem", fontWeight: 800, color: "white",
            lineHeight: 1.2, marginBottom: "0.75rem",
          }}>
            Elder Support<br />Training <span style={{ color: "#7FFFC0" }}>PSW</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "3rem" }}>
            Canadian PSW Training Platform<br />Evidence-based · HSCPOA Aligned
          </p>

          {/* Feature list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", textAlign: "left" }}>
            {[
              { icon: "📘", text: "27 units across 3 levels" },
              { icon: "🧠", text: "Interactive quizzes & case studies" },
              { icon: "🎓", text: "Downloadable certificates" },
              { icon: "🇨🇦", text: "Canadian regulatory standards" },
            ].map(({ icon, text }) => (
              <div key={text} style={{
                display: "flex", alignItems: "center", gap: "0.85rem",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10, padding: "0.75rem 1rem",
                color: "rgba(255,255,255,0.85)", fontSize: "0.88rem",
              }}>
                <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={{
        flex: 1, background: "white",
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        padding: "3rem 2rem",
      }}>
        <div style={{ width: "100%", maxWidth: 420 }}>

          {/* Header */}
          <div style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.9rem", fontWeight: 800, color: "#0A3D5C", marginBottom: "0.4rem" }}>
              Welcome back
            </h2>
            <p style={{ color: "#64748B", fontSize: "0.9rem" }}>
              Sign in to continue your training
            </p>
          </div>

          {/* Google */}
          <button onClick={handleGoogle} disabled={gLoading}
            style={{
              width: "100%", padding: "0.85rem", borderRadius: 10,
              border: "1.5px solid #E2E8F0", background: "white",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
              fontWeight: 600, fontSize: "0.92rem", color: "#1E293B",
              cursor: gLoading ? "wait" : "pointer", marginBottom: "1.5rem",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              fontFamily: "inherit",
            }}>
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
              <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.04a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
              <path fill="#FBBC05" d="M4.5 10.48A4.8 4.8 0 0 1 4.5 7.52V5.45H1.83a8 8 0 0 0 0 7.1l2.67-2.07z"/>
              <path fill="#EA4335" d="M8.98 3.58c1.32 0 2.44.45 3.35 1.35l2.51-2.51C13.45.89 11.43 0 8.98 0A8 8 0 0 0 1.83 5.45L4.5 7.52C5.17 5.3 6.9 3.58 8.98 3.58z"/>
            </svg>
            {gLoading ? "Redirecting…" : "Continue with Google"}
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
            <span style={{ color: "#94A3B8", fontSize: "0.8rem" }}>or sign in with email</span>
            <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>
            {error && (
              <div style={{
                background: "#FEF2F2", border: "1px solid #FCA5A5",
                borderRadius: 8, padding: "0.75rem 1rem",
                color: "#DC2626", fontSize: "0.85rem", marginBottom: "1rem",
              }}>
                ⚠️ {error}
              </div>
            )}

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem" }}>
                Email address
              </label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com" required
                style={{
                  width: "100%", padding: "0.8rem 1rem", borderRadius: 8,
                  border: "1.5px solid #E2E8F0", fontSize: "0.92rem",
                  outline: "none", background: "#F8FAFC", color: "#1E293B",
                  boxSizing: "border-box", fontFamily: "inherit",
                }}
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem" }}>
                Password
              </label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" required
                style={{
                  width: "100%", padding: "0.8rem 1rem", borderRadius: 8,
                  border: "1.5px solid #E2E8F0", fontSize: "0.92rem",
                  outline: "none", background: "#F8FAFC", color: "#1E293B",
                  boxSizing: "border-box", fontFamily: "inherit",
                }}
              />
            </div>

            <button type="submit" disabled={loading}
              style={{
                width: "100%", padding: "0.9rem",
                background: loading ? "#94A3B8" : "#0F5A8A",
                color: "white", border: "none", borderRadius: 10,
                fontWeight: 700, fontSize: "0.95rem",
                cursor: loading ? "wait" : "pointer",
                fontFamily: "inherit",
                boxShadow: loading ? "none" : "0 4px 16px rgba(15,90,138,0.3)",
              }}>
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.88rem", color: "#64748B" }}>
            No account?{" "}
            <Link href="/register" style={{ color: "#0F5A8A", fontWeight: 700, textDecoration: "none" }}>
              Create one free
            </Link>
          </p>

          {/* Admin */}
          <div style={{ textAlign: "center", marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #F1F5F9" }}>
            <button onClick={() => setShowAdmin(!showAdmin)}
              style={{ background: "none", border: "none", color: "#94A3B8", fontSize: "0.78rem", cursor: "pointer", fontFamily: "inherit" }}>
              🔒 Admin Portal
            </button>

            {showAdmin && (
              <form onSubmit={handleAdminLogin} style={{ marginTop: "1rem" }}>
                {adminError && (
                  <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 8, padding: "0.6rem 0.85rem", color: "#DC2626", fontSize: "0.8rem", marginBottom: "0.75rem" }}>
                    {adminError}
                  </div>
                )}
                <input type="email" placeholder="Admin email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} required
                  style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: "0.85rem", marginBottom: "0.5rem", boxSizing: "border-box", fontFamily: "inherit", background: "#F8FAFC" }} />
                <input type="password" placeholder="Admin password" value={adminPass} onChange={e => setAdminPass(e.target.value)} required
                  style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: "0.85rem", marginBottom: "0.75rem", boxSizing: "border-box", fontFamily: "inherit", background: "#F8FAFC" }} />
                <button type="submit" disabled={adminLoading}
                  style={{ width: "100%", padding: "0.65rem", background: "#1E293B", color: "white", border: "none", borderRadius: 8, fontWeight: 600, fontSize: "0.85rem", cursor: adminLoading ? "wait" : "pointer", fontFamily: "inherit" }}>
                  {adminLoading ? "Verifying…" : "Access Admin"}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  )
}
