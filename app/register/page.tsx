"use client"
import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

const PROVINCES = ["Ontario","British Columbia","Alberta","Quebec","Manitoba","Saskatchewan","Nova Scotia","New Brunswick","Newfoundland and Labrador","Prince Edward Island","Northwest Territories","Nunavut","Yukon"]

export default function RegisterPage() {
  const [form, setForm]       = useState({ firstName:"", lastName:"", email:"", password:"", province:"", employer:"" })
  const [error, setError]     = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone]       = useState(false)

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError("")
    const supabase = createClient()
    const { error: err } = await supabase.auth.signUp({
      email: form.email, password: form.password,
      options: { data: { first_name: form.firstName, last_name: form.lastName, province: form.province, employer: form.employer } }
    })
    if (err) { setError(err.message); setLoading(false) } else setDone(true)
  }

  const inp: React.CSSProperties = { width: "100%", padding: "0.8rem 1rem", border: "1.5px solid var(--border)", borderRadius: 10, fontSize: "0.9rem", fontFamily: "inherit", background: "var(--bg)", color: "var(--text)", outline: "none" }
  const lbl: React.CSSProperties = { display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text)", marginBottom: "0.4rem" }

  if (done) return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "white", borderRadius: 20, padding: "3rem", maxWidth: 450, textAlign: "center", boxShadow: "var(--shadow)" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", marginBottom: "0.75rem" }}>Check your email</h2>
        <p style={{ color: "var(--text-light)", marginBottom: "2rem", lineHeight: 1.7 }}>We sent a confirmation link to <strong>{form.email}</strong>. Click it to activate your account.</p>
        <Link href="/login" style={{ background: "var(--primary)", color: "white", padding: "0.85rem 2rem", borderRadius: 10, textDecoration: "none", fontWeight: 600 }}>Go to Login</Link>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ background: "white", borderRadius: 20, padding: "2.5rem", width: "100%", maxWidth: 560, boxShadow: "var(--shadow)" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🏥</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.9rem", marginBottom: "0.4rem" }}>Create your account</h2>
          <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>Join thousands of Canadian PSW students</p>
        </div>
        {error && <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 10, padding: "0.85rem", marginBottom: "1.25rem", color: "#DC2626", fontSize: "0.88rem" }}>⚠️ {error}</div>}
        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
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
          <button type="submit" disabled={loading} style={{ background: "var(--primary)", color: "white", padding: "0.9rem", borderRadius: 10, border: "none", fontWeight: 700, fontSize: "1rem", cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1, fontFamily: "inherit", marginTop: "0.5rem" }}>
            {loading ? "Creating account…" : "Create Account →"}
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "1.5rem", color: "var(--text-light)", fontSize: "0.88rem" }}>
          Already have an account? <Link href="/login" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
