"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

const PROVINCES = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick",
  "Newfoundland and Labrador", "Nova Scotia", "Ontario",
  "Prince Edward Island", "Quebec", "Saskatchewan",
]

const PLAN_INFO: Record<string, { icon: string; label: string; color: string; bg: string }> = {
  beginner:     { icon:"🌱", label:"Beginner Plan",  color:"#2E7D9E", bg:"#E0F2F7" },
  standard:     { icon:"📈", label:"Standard Plan",  color:"#D97706", bg:"#FEF3C7" },
  advanced:     { icon:"🏆", label:"Advanced Plan",  color:"#7C3AED", bg:"#EDE9FE" },
}

export default function ProfilePage() {
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(false)
  const [editing, setEditing]   = useState(false)
  const [saved, setSaved]       = useState(false)
  const [error, setError]       = useState("")

  const [profile, setProfile] = useState({
    first_name: "",
    last_name:  "",
    email:      "",
    phone:      "",
    employer:   "",
    province:   "",
    plan:       "beginner",
    created_at: "",
  })

  const [form, setForm] = useState({ ...profile })
  const supabase = createClient()

  useEffect(() => { loadProfile() }, [])

  const loadProfile = async () => {
    const { data: authData } = await supabase.auth.getUser()
    if (!authData.user) { setLoading(false); return }

    const { data } = await supabase
      .from("profiles")
      .select("first_name, last_name, email, phone, employer, province, plan, created_at")
      .eq("id", authData.user.id)
      .single()

    if (data) {
      const p = {
        first_name: data.first_name || "",
        last_name:  data.last_name  || "",
        email:      data.email      || authData.user.email || "",
        phone:      data.phone      || "",
        employer:   data.employer   || "",
        province:   data.province   || "",
        plan:       data.plan       || "beginner",
        created_at: data.created_at || "",
      }
      setProfile(p)
      setForm(p)
    }
    setLoading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    setError("")
    const { data: authData } = await supabase.auth.getUser()
    console.log("user:", authData.user?.id); if (!authData.user) { setSaving(false); return }

    const { error: err } = await supabase
      .from("profiles")
      .update({
        first_name: form.first_name,
        last_name:  form.last_name,
        phone:      form.phone,
        employer:   form.employer,
        full_name:  `${form.first_name} ${form.last_name}`.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", authData.user.id)

    console.error("Profile update error:", err); if (err) {
      setError("Failed to save. Please try again.")
    } else {
      setProfile({ ...form })
      setEditing(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
    setSaving(false)
  }

  const planInfo = PLAN_INFO[profile.plan] || PLAN_INFO.beginner

  const inp: React.CSSProperties = {
    width:"100%", padding:"0.8rem 1rem",
    border:"1.5px solid var(--border)", borderRadius:10,
    fontSize:"0.93rem", fontFamily:"inherit",
    background:"white", color:"var(--text)", outline:"none",
    boxSizing:"border-box",
  }

  const disabledInp: React.CSSProperties = {
    ...inp, background:"var(--bg)", color:"var(--text-light)", cursor:"not-allowed",
  }

  const lbl: React.CSSProperties = {
    display:"block", fontSize:"0.82rem", fontWeight:700,
    color:"var(--text-light)", marginBottom:"0.4rem", textTransform:"uppercase", letterSpacing:0.5,
  }

  if (loading) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"var(--bg)" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:"2rem", marginBottom:"1rem" }}>⏳</div>
        <p style={{ color:"var(--text-light)" }}>Loading your profile…</p>
      </div>
    </div>
  )

  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh" }}>

      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,var(--primary-dark),var(--primary))", color:"white", padding:"3rem 2rem 2.5rem" }}>
        <div style={{ maxWidth:800, margin:"0 auto" }}>
          <div style={{ fontSize:"0.82rem", opacity:0.7, marginBottom:"1rem" }}>
            <Link href="/dashboard" style={{ color:"white", textDecoration:"none" }}>Dashboard</Link> › Profile
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"1.5rem" }}>
            {/* Avatar */}
            <div style={{ width:72, height:72, borderRadius:"50%", background:"rgba(255,255,255,0.2)", border:"3px solid rgba(255,255,255,0.4)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"2rem", fontWeight:700, flexShrink:0 }}>
              {profile.first_name ? profile.first_name[0].toUpperCase() : "?"}
            </div>
            <div>
              <h1 style={{ fontFamily:'"Playfair Display",serif', fontSize:"2rem", marginBottom:"0.25rem" }}>
                {profile.first_name} {profile.last_name}
              </h1>
              <p style={{ opacity:0.8, fontSize:"0.9rem" }}>{profile.email}</p>
              <div style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.25)", borderRadius:20, padding:"0.3rem 0.9rem", fontSize:"0.8rem", fontWeight:600, marginTop:"0.5rem" }}>
                {planInfo.icon} {planInfo.label}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:800, margin:"0 auto", padding:"2.5rem 2rem" }}>

        {/* Success message */}
        {saved && (
          <div style={{ background:"#DCFCE7", border:"1px solid #86EFAC", borderRadius:12, padding:"1rem 1.5rem", marginBottom:"1.5rem", color:"#15803D", fontWeight:600, display:"flex", alignItems:"center", gap:"0.75rem" }}>
            ✅ Profile updated successfully!
          </div>
        )}

        {/* Error message */}
        {error && (
          <div style={{ background:"#FEF2F2", border:"1px solid #FCA5A5", borderRadius:12, padding:"1rem 1.5rem", marginBottom:"1.5rem", color:"#DC2626", fontWeight:600 }}>
            ⚠️ {error}
          </div>
        )}

        {/* Plan card */}
        <div style={{ background:planInfo.bg, border:`2px solid ${planInfo.color}`, borderRadius:16, padding:"1.25rem 1.75rem", marginBottom:"2rem", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"1rem" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
            <span style={{ fontSize:"2.5rem" }}>{planInfo.icon}</span>
            <div>
              <div style={{ fontWeight:700, color:planInfo.color, fontSize:"1.05rem" }}>{planInfo.label}</div>
              <div style={{ fontSize:"0.82rem", color:"var(--text-light)", marginTop:"0.2rem" }}>
                {profile.plan === "beginner" ? "8 units · Level 1" : profile.plan === "standard" ? "18 units · Levels 1 & 2" : "27 units · All levels"}
              </div>
              {profile.created_at && (
                <div style={{ fontSize:"0.78rem", color:"var(--text-light)", marginTop:"0.2rem" }}>
                  Member since {new Date(profile.created_at).toLocaleDateString("en-CA", { year:"numeric", month:"long" })}
                </div>
              )}
            </div>
          </div>
          {profile.plan !== "advanced" && (
            <Link href="/register" style={{ background:planInfo.color, color:"white", padding:"0.65rem 1.5rem", borderRadius:10, fontWeight:600, fontSize:"0.88rem", textDecoration:"none" }}>
              Upgrade Plan ↗
            </Link>
          )}
        </div>

        {/* Profile form */}
        <div style={{ background:"white", borderRadius:18, border:"1px solid var(--border)", boxShadow:"var(--shadow)", overflow:"hidden" }}>

          {/* Form header */}
          <div style={{ padding:"1.5rem 2rem", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <h2 style={{ fontFamily:'"Playfair Display",serif', fontSize:"1.3rem", margin:0 }}>Personal Information</h2>
            {!editing ? (
              <button onClick={() => setEditing(true)} style={{ background:"var(--bg)", border:"1.5px solid var(--border)", color:"var(--text)", padding:"0.6rem 1.25rem", borderRadius:10, fontWeight:600, fontSize:"0.88rem", cursor:"pointer", fontFamily:"inherit" }}>
                ✏️ Edit Profile
              </button>
            ) : (
              <div style={{ display:"flex", gap:"0.75rem" }}>
                <button onClick={() => { setEditing(false); setForm({ ...profile }); setError("") }} style={{ background:"var(--bg)", border:"1.5px solid var(--border)", color:"var(--text-light)", padding:"0.6rem 1.25rem", borderRadius:10, fontWeight:600, fontSize:"0.88rem", cursor:"pointer", fontFamily:"inherit" }}>
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving} style={{ background:"var(--primary)", color:"white", padding:"0.6rem 1.5rem", borderRadius:10, fontWeight:700, fontSize:"0.88rem", cursor:saving?"wait":"pointer", fontFamily:"inherit", opacity:saving?0.7:1 }}>
                  {saving ? "Saving…" : "💾 Save Changes"}
                </button>
              </div>
            )}
          </div>

          {/* Form fields */}
          <div style={{ padding:"2rem" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.25rem", marginBottom:"1.25rem" }}>
              <div>
                <label style={lbl}>First Name</label>
                <input
                  value={form.first_name}
                  onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))}
                  disabled={!editing}
                  style={editing ? inp : disabledInp}
                  placeholder="First name"
                />
              </div>
              <div>
                <label style={lbl}>Last Name</label>
                <input
                  value={form.last_name}
                  onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))}
                  disabled={!editing}
                  style={editing ? inp : disabledInp}
                  placeholder="Last name"
                />
              </div>
            </div>

            <div style={{ marginBottom:"1.25rem" }}>
              <label style={lbl}>Email Address</label>
              <input
                value={profile.email}
                disabled
                style={disabledInp}
                placeholder="Email address"
              />
              <p style={{ fontSize:"0.75rem", color:"var(--text-light)", marginTop:"0.35rem" }}>Email cannot be changed here. Contact support if needed.</p>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.25rem", marginBottom:"1.25rem" }}>
              <div>
                <label style={lbl}>Phone Number</label>
                <input
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  disabled={!editing}
                  style={editing ? inp : disabledInp}
                  placeholder="+1 (416) 555-0000"
                />
              </div>
              <div>
                <label style={lbl}>Province</label>
                {editing ? (
                  <select
                    value={form.province}
                    onChange={e => setForm(f => ({ ...f, province: e.target.value }))}
                    style={{ ...inp }}
                  >
                    <option value="">Select province…</option>
                    {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                ) : (
                  <input value={form.province || "Not specified"} disabled style={disabledInp} />
                )}
              </div>
            </div>

            <div style={{ marginBottom:"1.25rem" }}>
              <label style={lbl}>Employer / Organization</label>
              <input
                value={form.employer}
                onChange={e => setForm(f => ({ ...f, employer: e.target.value }))}
                disabled={!editing}
                style={editing ? inp : disabledInp}
                placeholder="e.g. Sunridge Long-Term Care Home"
              />
            </div>

            {/* Current plan (read only) */}
            <div>
              <label style={lbl}>Current Plan</label>
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.8rem 1rem", background:"var(--bg)", borderRadius:10, border:"1.5px solid var(--border)" }}>
                <span style={{ fontSize:"1.2rem" }}>{planInfo.icon}</span>
                <span style={{ fontWeight:600, color:planInfo.color }}>{planInfo.label}</span>
                {profile.plan !== "advanced" && (
                  <Link href="/register" style={{ marginLeft:"auto", background:planInfo.color, color:"white", padding:"0.3rem 0.9rem", borderRadius:8, fontSize:"0.78rem", fontWeight:600, textDecoration:"none" }}>
                    Upgrade ↗
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"1rem", marginTop:"2rem" }}>
          {[
            { href:"/dashboard",              icon:"📊", label:"Dashboard",       color:"var(--primary)" },
            { href:"/dashboard/curriculum",   icon:"📚", label:"Curriculum",      color:"var(--beg)"    },
            { href:"/dashboard/certificates", icon:"📜", label:"Certificates",    color:"var(--int)"    },
            { href:"/dashboard/quiz/1",       icon:"🧠", label:"Practice Quiz",   color:"var(--adv)"    },
          ].map(({ href, icon, label, color }) => (
            <Link key={label} href={href} style={{ background:"white", border:"1px solid var(--border)", borderRadius:14, padding:"1.25rem", display:"flex", alignItems:"center", gap:"0.75rem", textDecoration:"none", boxShadow:"var(--shadow)" }}>
              <span style={{ fontSize:"1.3rem" }}>{icon}</span>
              <span style={{ fontWeight:600, fontSize:"0.9rem", color }}>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
