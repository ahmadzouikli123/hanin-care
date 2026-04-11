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

  const handleGoogle = async () => {
    setGLoading(true)
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` }
    })
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError("")
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false) }
    else router.push("/dashboard")
  }

  const inp: React.CSSProperties = { width:"100%", padding:"0.85rem 1rem", border:"1.5px solid var(--border)", borderRadius:10, fontSize:"0.95rem", fontFamily:"inherit", background:"var(--bg)", color:"var(--text)", outline:"none" }
  const lbl: React.CSSProperties = { display:"block", fontSize:"0.85rem", fontWeight:600, color:"var(--text)", marginBottom:"0.5rem" }

  return (
    <div style={{ minHeight:"100vh", display:"flex" }}>
      {/* Left panel */}
      <div style={{ flex:1, background:"linear-gradient(135deg,#0A3D5C,#0F5A8A)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", color:"white", padding:"3rem", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-80, right:-80, width:400, height:400, background:"rgba(255,255,255,0.05)", borderRadius:"50%" }} />
        <div style={{ position:"relative", zIndex:1, textAlign:"center", maxWidth:400 }}>
          <img src="/logo.png" alt="Hanin Care" style={{ width:90, height:90, objectFit:"contain", marginBottom:"1.25rem", filter:"drop-shadow(0 4px 20px rgba(0,0,0,0.3))" }} />
          <h1 style={{ fontFamily:"\"Playfair Display\",serif", fontSize:"2rem", marginBottom:"0.75rem" }}>
            Hanin Care <span style={{ color:"#7FFFC0" }}>Canada</span>
          </h1>
          <p style={{ opacity:0.8, lineHeight:1.8, marginBottom:"2rem", fontSize:"0.92rem" }}>PSW Training Platform — evidence-based curriculum for Canadian healthcare standards.</p>
          <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
            {["🎓 Beginner → Intermediate → Advanced","🧠 Interactive quizzes and case studies","📜 Downloadable certificates","🇨🇦 Canadian regulatory standards"].map(f => (
              <div key={f} style={{ background:"rgba(255,255,255,0.1)", borderRadius:10, padding:"0.7rem 1rem", fontSize:"0.88rem", textAlign:"left" }}>{f}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ width:460, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"3rem", background:"white" }}>
        <div style={{ width:"100%", maxWidth:360 }}>
          <h2 style={{ fontFamily:"\"Playfair Display\",serif", fontSize:"1.9rem", marginBottom:"0.4rem" }}>Welcome back</h2>
          <p style={{ color:"var(--text-light)", marginBottom:"1.75rem", fontSize:"0.9rem" }}>Sign in to continue your training</p>

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={gLoading}
            style={{ width:"100%", padding:"0.85rem", border:"2px solid var(--border)", borderRadius:10, background:"white", display:"flex", alignItems:"center", justifyContent:"center", gap:"0.75rem", cursor:gLoading?"wait":"pointer", fontFamily:"inherit", fontSize:"0.95rem", fontWeight:600, color:"var(--text)", marginBottom:"1.25rem" }}
          >
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            {gLoading ? "Redirecting…" : "Continue with Google"}
          </button>

          {/* Divider */}
          <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"1.25rem" }}>
            <div style={{ flex:1, height:1, background:"var(--border)" }} />
            <span style={{ fontSize:"0.8rem", color:"var(--text-light)" }}>or sign in with email</span>
            <div style={{ flex:1, height:1, background:"var(--border)" }} />
          </div>

          {error && <div style={{ background:"#FEF2F2", border:"1px solid #FCA5A5", borderRadius:10, padding:"0.85rem 1rem", marginBottom:"1.25rem", color:"#DC2626", fontSize:"0.9rem" }}>⚠️ {error}</div>}

          <form onSubmit={handleLogin} style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>
            <div><label style={lbl}>Email address</label><input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={inp} /></div>
            <div><label style={lbl}>Password</label><input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={inp} /></div>
            <button type="submit" disabled={loading} style={{ background:"var(--primary)", color:"white", padding:"0.9rem", borderRadius:10, border:"none", fontWeight:700, fontSize:"1rem", cursor:loading?"wait":"pointer", opacity:loading?0.7:1, fontFamily:"inherit" }}>
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </form>

          <p style={{ textAlign:"center", marginTop:"1.5rem", color:"var(--text-light)", fontSize:"0.9rem" }}>
            No account? <Link href="/register" style={{ color:"var(--primary)", fontWeight:600, textDecoration:"none" }}>Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  )
}