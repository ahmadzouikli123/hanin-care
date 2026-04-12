"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

const PLANS = [
  {
    id: "beginner",
    icon: "🌱",
    label: "Beginner",
    color: "#2E7D9E",
    bg: "#E0F2F7",
    border: "#2E7D9E",
    units: "8 units · 140 hrs",
    levels: ["Level 1 — Foundations"],
    desc: "Start your PSW journey with core skills and Canadian healthcare basics.",
  },
  {
    id: "standard",
    icon: "📈",
    label: "Standard",
    color: "#D97706",
    bg: "#FEF3C7",
    border: "#D97706",
    units: "18 units · 360 hrs",
    levels: ["Level 1 — Foundations", "Level 2 — Clinical Skills"],
    desc: "Expand into clinical observations, chronic disease, and mental health care.",
  },
  {
    id: "advanced",
    icon: "🏆",
    label: "Advanced",
    color: "#7C3AED",
    bg: "#EDE9FE",
    border: "#7C3AED",
    units: "27 units · 600 hrs",
    levels: ["Level 1 — Foundations", "Level 2 — Clinical Skills", "Level 3 — Advanced Practice"],
    desc: "Full curriculum including delegated acts, gerontology, and capstone practicum.",
    popular: true,
  },
]

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep]         = useState<1 | 2>(1)
  const [plan, setPlan]         = useState("")
  const [firstName, setFirst]   = useState("")
  const [lastName, setLast]     = useState("")
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  const [error, setError]       = useState("")
  const [loading, setLoading]   = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError("")
    const supabase = createClient()
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName, last_name: lastName, plan },
      },
    })
    if (signUpError) { setError(signUpError.message); setLoading(false); return }

    // Update plan in profiles table
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from("profiles").update({ plan, first_name: firstName, last_name: lastName }).eq("id", user.id)
    }
    router.push("/dashboard")
  }

  const inp: React.CSSProperties = { width: "100%", padding: "0.85rem 1rem", border: "1.5px solid #D4E0ED", borderRadius: 10, fontSize: "0.95rem", fontFamily: "inherit", background: "#F5F7FA", color: "#1A2332", outline: "none", boxSizing: "border-box" }
  const lbl: React.CSSProperties = { display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#1A2332", marginBottom: "0.5rem" }

  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>

      {/* LEFT */}
      <div style={{ flex: 1, background: "linear-gradient(135deg,#0A3D5C,#0F5A8A)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "white", padding: "3rem" }}>
        <div style={{ textAlign: "center", maxWidth: 420 }}>
          <img src="/logo.png" alt="Hanin" style={{ width: 110, height: 110, objectFit: "contain", marginBottom: "1.5rem" }} />
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", marginBottom: "0.5rem" }}>
            Hanin <span style={{ color: "#7FFFC0" }}>Care</span>
          </h1>
          <p style={{ opacity: 0.85, marginBottom: "2rem", lineHeight: 1.7 }}>Training Platform for Elderly and Dementia Care</p>
          <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 14, padding: "1.5rem", textAlign: "left" }}>
            <p style={{ fontWeight: 700, marginBottom: "1rem", fontSize: "0.95rem" }}>Choose your path:</p>
            {PLANS.map(p => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "1.3rem" }}>{p.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{p.label}</div>
                  <div style={{ opacity: 0.7, fontSize: "0.78rem" }}>{p.units}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div style={{ width: 520, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2.5rem", background: "white", overflowY: "auto" }}>
        <div style={{ width: "100%", maxWidth: 440 }}>

          {/* STEP INDICATOR */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
            {[1, 2].map(s => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: step >= s ? "#0F5A8A" : "#E5E7EB", color: step >= s ? "white" : "#9CA3AF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.8rem" }}>{s}</div>
                <span style={{ fontSize: "0.82rem", color: step >= s ? "#0F5A8A" : "#9CA3AF", fontWeight: step >= s ? 600 : 400 }}>{s === 1 ? "Choose Plan" : "Your Details"}</span>
                {s < 2 && <div style={{ width: 32, height: 2, background: step > s ? "#0F5A8A" : "#E5E7EB", borderRadius: 2 }} />}
              </div>
            ))}
          </div>

          {/* STEP 1 — PLAN SELECTION */}
          {step === 1 && (
            <>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.7rem", marginBottom: "0.4rem" }}>Choose your plan</h2>
              <p style={{ color: "#4A5F7F", marginBottom: "1.5rem", fontSize: "0.9rem" }}>You can upgrade anytime from your dashboard.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "1.5rem" }}>
                {PLANS.map(p => (
                  <div key={p.id} onClick={() => setPlan(p.id)}
                    style={{ border: `2px solid ${plan === p.id ? p.border : "#E5E7EB"}`, borderRadius: 14, padding: "1.1rem 1.25rem", cursor: "pointer", background: plan === p.id ? p.bg : "white", position: "relative", transition: "all 0.2s" }}>
                    {p.popular && <div style={{ position: "absolute", top: -10, right: 12, background: "#7C3AED", color: "white", fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: 20 }}>MOST POPULAR</div>}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem" }}>
                      <span style={{ fontSize: "1.4rem" }}>{p.icon}</span>
                      <div>
                        <span style={{ fontWeight: 700, color: p.color, fontSize: "1rem" }}>{p.label}</span>
                        <span style={{ marginLeft: "0.5rem", fontSize: "0.78rem", color: "#6B7280" }}>{p.units}</span>
                      </div>
                      {plan === p.id && <span style={{ marginLeft: "auto", color: p.color, fontSize: "1.2rem" }}>✓</span>}
                    </div>
                    <p style={{ fontSize: "0.82rem", color: "#4A5F7F", margin: 0, lineHeight: 1.5 }}>{p.desc}</p>
                    <div style={{ marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                      {p.levels.map(l => (
                        <div key={l} style={{ fontSize: "0.75rem", color: p.color, fontWeight: 600 }}>✓ {l}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => plan && setStep(2)} disabled={!plan}
                style={{ width: "100%", background: plan ? "#0F5A8A" : "#E5E7EB", color: plan ? "white" : "#9CA3AF", padding: "0.9rem", borderRadius: 10, border: "none", fontWeight: 700, fontSize: "1rem", cursor: plan ? "pointer" : "not-allowed", fontFamily: "inherit" }}>
                Continue →
              </button>
            </>
          )}

          {/* STEP 2 — DETAILS */}
          {step === 2 && (
            <>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.7rem", marginBottom: "0.4rem" }}>Create your account</h2>
              <p style={{ color: "#4A5F7F", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
                Plan: <strong style={{ color: PLANS.find(p => p.id === plan)?.color }}>{PLANS.find(p => p.id === plan)?.icon} {PLANS.find(p => p.id === plan)?.label}</strong>
                <button onClick={() => setStep(1)} style={{ marginLeft: "0.75rem", background: "none", border: "none", color: "#0F5A8A", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600, padding: 0 }}>Change</button>
              </p>
              {error && <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 10, padding: "0.85rem 1rem", marginBottom: "1.25rem", color: "#DC2626", fontSize: "0.9rem" }}>{error}</div>}
              <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div><label style={lbl}>First name</label><input required value={firstName} onChange={e => setFirst(e.target.value)} placeholder="Sara" style={inp} /></div>
                  <div><label style={lbl}>Last name</label><input required value={lastName} onChange={e => setLast(e.target.value)} placeholder="Ahmed" style={inp} /></div>
                </div>
                <div><label style={lbl}>Email address</label><input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={inp} /></div>
                <div><label style={lbl}>Password</label><input type="password" required minLength={8} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters" style={inp} /></div>
                <button type="submit" disabled={loading}
                  style={{ background: "#0F5A8A", color: "white", padding: "0.9rem", borderRadius: 10, border: "none", fontWeight: 700, fontSize: "1rem", cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1, fontFamily: "inherit", marginTop: "0.25rem" }}>
                  {loading ? "Creating account..." : "Create Account →"}
                </button>
              </form>
            </>
          )}

          <p style={{ textAlign: "center", marginTop: "1.5rem", color: "#4A5F7F", fontSize: "0.9rem" }}>
            Already have an account? <Link href="/login" style={{ color: "#0F5A8A", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
          </p>

        </div>
      </div>
    </div>
  )
}