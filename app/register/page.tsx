"use client"
import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

const PROVINCES = ["Ontario","British Columbia","Alberta","Quebec","Manitoba","Saskatchewan","Nova Scotia","New Brunswick","Newfoundland and Labrador","Prince Edward Island","Northwest Territories","Nunavut","Yukon"]

const PLANS = [
  {
    id: "beginner",
    icon: "🌱",
    label: "Beginner",
    color: "var(--beg)",
    bg: "var(--beg-bg)",
    border: "#A8D9E8",
    desc: "Level 1 only",
    units: "8 units · 140 hrs",
    features: ["Canadian Healthcare System", "Ethics & Legal Frameworks", "Infection Control", "Basic Personal Care"]
  },
  {
    id: "standard",
    icon: "📈",
    label: "Standard",
    color: "var(--int)",
    bg: "var(--int-bg)",
    border: "#FCD34D",
    desc: "Level 1 + Level 2",
    units: "18 units · 360 hrs",
    features: ["All Beginner content", "Clinical Observations", "Chronic Disease Care", "Palliative & End-of-Life Care"]
  },
  {
    id: "advanced",
    icon: "🏆",
    label: "Advanced",
    color: "var(--adv)",
    bg: "var(--adv-bg)",
    border: "#C4B5FD",
    desc: "All 3 levels",
    units: "27 units · 600 hrs",
    features: ["All Standard content", "Complex Medical Conditions", "Indigenous Cultural Safety", "Capstone Practicum"]
  }
]

export default function RegisterPage() {
  const [step, setStep]           = useState<1|2>(1)
  const [plan, setPlan]           = useState<string>("")
  const [form, setForm]           = useState({ firstName:"", lastName:"", email:"", password:"", province:"", employer:"" })
  const [error, setError]         = useState("")
  const [loading, setLoading]     = useState(false)
  const [gLoading, setGLoading]   = useState(false)
  const [done, setDone]           = useState(false)

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleGoogle = async () => {
    if (!plan) return
    setGLoading(true)
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
        queryParams: { prompt: "select_account" }
      }
    })
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError("")
    const supabase = createClient()
    const { error: err } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          first_name: form.firstName,
          last_name: form.lastName,
          province: form.province,
          employer: form.employer,
          plan: plan
        }
      }
    })
    if (err) { setError(err.message); setLoading(false) }
    else setDone(true)
  }

  const inp: React.CSSProperties = { width:"100%", padding:"0.8rem 1rem", border:"1.5px solid var(--border)", borderRadius:10, fontSize:"0.9rem", fontFamily:"inherit", background:"var(--bg)", color:"var(--text)", outline:"none" }
  const lbl: React.CSSProperties = { display:"block", fontSize:"0.82rem", fontWeight:600, color:"var(--text)", marginBottom:"0.4rem" }

  if (done) return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ background:"white", borderRadius:20, padding:"3rem", maxWidth:420, textAlign:"center", boxShadow:"var(--shadow)" }}>
        <div style={{ fontSize:"3rem", marginBottom:"1rem" }}>✅</div>
        <h2 style={{ fontFamily:"\"Playfair Display\",serif", fontSize:"1.8rem", marginBottom:"0.75rem" }}>Check your email</h2>
        <p style={{ color:"var(--text-light)", marginBottom:"2rem", lineHeight:1.7 }}>
          We sent a confirmation link to <strong>{form.email}</strong>.<br />
          Your plan: <strong>{PLANS.find(p=>p.id===plan)?.label}</strong>
        </p>
        <Link href="/login" style={{ background:"var(--primary)", color:"white", padding:"0.85rem 2rem", borderRadius:10, textDecoration:"none", fontWeight:600 }}>Go to Login</Link>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem" }}>
      <div style={{ background:"white", borderRadius:20, padding:"2.5rem", width:"100%", maxWidth: step===1 ? 860 : 540, boxShadow:"var(--shadow)", transition:"max-width 0.3s" }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:"1.75rem" }}>
          <img src="/logo.png" alt="Hanin Care" style={{ width:55, height:55, objectFit:"contain", marginBottom:"0.6rem" }} />
          <h2 style={{ fontFamily:"\"Playfair Display\",serif", fontSize:"1.7rem", marginBottom:"0.3rem" }}>
            {step===1 ? "Choose Your Training Plan" : "Create Your Account"}
          </h2>
          <p style={{ color:"var(--text-light)", fontSize:"0.88rem" }}>
            {step===1 ? "Select the level that matches your training goals" : `Plan: ${PLANS.find(p=>p.id===plan)?.icon} ${PLANS.find(p=>p.id===plan)?.label}`}
          </p>
        </div>

        {/* STEP 1 — Plan Selection */}
        {step === 1 && (
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))", gap:"1rem", marginBottom:"1.5rem" }}>
              {PLANS.map(p => (
                <div
                  key={p.id}
                  onClick={() => setPlan(p.id)}
                  style={{
                    border: `2px solid ${plan===p.id ? p.color : "var(--border)"}`,
                    borderRadius:16,
                    padding:"1.5rem",
                    cursor:"pointer",
                    background: plan===p.id ? p.bg : "white",
                    transition:"all 0.2s",
                    position:"relative"
                  }}
                >
                  {plan===p.id && (
                    <div style={{ position:"absolute", top:12, right:12, width:22, height:22, borderRadius:"50%", background:p.color, color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.75rem", fontWeight:700 }}>✓</div>
                  )}
                  <div style={{ fontSize:"2rem", marginBottom:"0.75rem" }}>{p.icon}</div>
                  <div style={{ display:"inline-block", background:p.color, color:"white", borderRadius:20, padding:"0.2rem 0.75rem", fontSize:"0.75rem", fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:"0.5rem" }}>{p.label}</div>
                  <div style={{ fontSize:"0.82rem", color:p.color, fontWeight:600, marginBottom:"0.5rem" }}>{p.desc}</div>
                  <div style={{ fontSize:"0.78rem", color:"var(--text-light)", marginBottom:"1rem" }}>{p.units}</div>
                  <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"0.4rem" }}>
                    {p.features.map((f,i) => (
                      <li key={i} style={{ fontSize:"0.8rem", color:"var(--text)", display:"flex", alignItems:"center", gap:"0.4rem" }}>
                        <span style={{ color:p.color, fontWeight:700 }}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <button
              onClick={() => { if (plan) setStep(2) }}
              disabled={!plan}
              style={{ width:"100%", padding:"0.9rem", background: plan ? "var(--primary)" : "var(--border)", color: plan ? "white" : "var(--text-light)", borderRadius:10, border:"none", fontWeight:700, fontSize:"1rem", cursor: plan ? "pointer" : "not-allowed", fontFamily:"inherit" }}
            >
              {plan ? `Continue with ${PLANS.find(p=>p.id===plan)?.label} Plan →` : "Select a plan to continue"}
            </button>

            <p style={{ textAlign:"center", marginTop:"1.25rem", color:"var(--text-light)", fontSize:"0.88rem" }}>
              Already have an account? <Link href="/login" style={{ color:"var(--primary)", fontWeight:600, textDecoration:"none" }}>Sign in</Link>
            </p>
          </div>
        )}

        {/* STEP 2 — Account Details */}
        {step === 2 && (
          <div>
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

            <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"1.25rem" }}>
              <div style={{ flex:1, height:1, background:"var(--border)" }} />
              <span style={{ fontSize:"0.8rem", color:"var(--text-light)" }}>or register with email</span>
              <div style={{ flex:1, height:1, background:"var(--border)" }} />
            </div>

            {error && <div style={{ background:"#FEF2F2", border:"1px solid #FCA5A5", borderRadius:10, padding:"0.85rem", marginBottom:"1rem", color:"#DC2626", fontSize:"0.88rem" }}>⚠️ {error}</div>}

            <form onSubmit={handleRegister} style={{ display:"flex", flexDirection:"column", gap:"0.9rem" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.9rem" }}>
                <div><label style={lbl}>First Name</label><input required value={form.firstName} onChange={set("firstName")} placeholder="Sarah" style={inp} /></div>
                <div><label style={lbl}>Last Name</label><input required value={form.lastName} onChange={set("lastName")} placeholder="Johnson" style={inp} /></div>
              </div>
              <div><label style={lbl}>Email</label><input type="email" required value={form.email} onChange={set("email")} placeholder="you@example.com" style={inp} /></div>
              <div><label style={lbl}>Password</label><input type="password" required value={form.password} onChange={set("password")} placeholder="Min. 8 characters" style={inp} /></div>
              <div>
                <label style={lbl}>Province</label>
                <select required value={form.province} onChange={set("province")} style={{ ...inp }}>
                  <option value="">Select province…</option>
                  {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div><label style={lbl}>Employer / Facility (optional)</label><input value={form.employer} onChange={set("employer")} placeholder="e.g. Sunrise Long-Term Care" style={inp} /></div>
              <button type="submit" disabled={loading} style={{ background:"var(--primary)", color:"white", padding:"0.9rem", borderRadius:10, border:"none", fontWeight:700, fontSize:"1rem", cursor:loading?"wait":"pointer", opacity:loading?0.7:1, fontFamily:"inherit" }}>
                {loading ? "Creating account…" : "Create Account →"}
              </button>
            </form>

            <div style={{ display:"flex", justifyContent:"space-between", marginTop:"1.25rem" }}>
              <button onClick={() => setStep(1)} style={{ background:"none", border:"none", color:"var(--text-light)", cursor:"pointer", fontSize:"0.88rem", fontFamily:"inherit" }}>← Change plan</button>
              <Link href="/login" style={{ color:"var(--primary)", fontWeight:600, textDecoration:"none", fontSize:"0.88rem" }}>Already have account?</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}