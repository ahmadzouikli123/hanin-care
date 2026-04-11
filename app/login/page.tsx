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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError("")
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false) }
    else router.push("/dashboard")
  }

  const inp: React.CSSProperties = { width: "100%", padding: "0.85rem 1rem", border: "1.5px solid var(--border)", borderRadius: 10, fontSize: "0.95rem", fontFamily: "inherit", background: "var(--bg)", color: "var(--text)", outline: "none" }
  const lbl: React.CSSProperties = { display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text)", marginBottom: "0.5rem" }

  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      <div style={{ flex: 1, background: "linear-gradient(135deg,var(--primary-dark),var(--primary))", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "white", padding: "3rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, background: "rgba(255,255,255,0.05)", borderRadius: "50%" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 400 }}>
          <div style={{ marginBottom: "1.5rem" }}><img src="/logo.png" alt="Hanin" style={{ width: "90px", height: "90px", objectFit: "contain" }} /></div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.2rem", marginBottom: "1rem" }}>
            Hanin Care <span style={{ color: "var(--accent-green)" }}>Canada</span>
          </h1>
          <p style={{ opacity: 0.8, lineHeight: 1.8, marginBottom: "2rem" }}>PSW Training Platform — evidence-based curriculum for Canadian healthcare standards.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {["🎓 Beginner → Intermediate → Advanced","🧠 Interactive quizzes and case studies","📜 Downloadable certificates","🇨🇦 Canadian regulatory standards"].map(f => (
              <div key={f} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "0.75rem 1rem", fontSize: "0.9rem", textAlign: "left" }}>{f}</div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ width: 480, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem", background: "white" }}>
        <div style={{ width: "100%", maxWidth: 380 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.9rem", marginBottom: "0.5rem" }}>Welcome back</h2>
          <p style={{ color: "var(--text-light)", marginBottom: "2rem", fontSize: "0.9rem" }}>Sign in to continue your training</p>
          {error && <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 10, padding: "0.85rem 1rem", marginBottom: "1.25rem", color: "#DC2626", fontSize: "0.9rem" }}>⚠️ {error}</div>}
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div><label style={lbl}>Email address</label><input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={inp} /></div>
            <div><label style={lbl}>Password</label><input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={inp} /></div>
            <button type="submit" disabled={loading} style={{ background: "var(--primary)", color: "white", padding: "0.9rem", borderRadius: 10, border: "none", fontWeight: 700, fontSize: "1rem", cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1, fontFamily: "inherit" }}>
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </form>
          <p style={{ textAlign: "center", marginTop: "1.5rem", color: "var(--text-light)", fontSize: "0.9rem" }}>
            No account? <Link href="/register" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
