"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { CURRICULUM_STRUCTURE } from "@/lib/curriculum-data"

const PLAN_ACCESS: Record<string, string[]> = {
  beginner: ["beginner"],
  standard: ["beginner", "intermediate"],
  advanced: ["beginner", "intermediate", "advanced"],
}

const PLAN_LABELS: Record<string, { icon: string; label: string; color: string }> = {
  beginner: { icon:"🌱", label:"Beginner Plan",  color:"var(--beg)" },
  standard: { icon:"📈", label:"Standard Plan",  color:"var(--int)" },
  advanced: { icon:"🏆", label:"Advanced Plan",  color:"var(--adv)" },
}

export default function CurriculumPage() {
  const [openUnit, setOpenUnit]   = useState<string|null>(null)
  const [plan, setPlan]           = useState<string>("beginner")
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data }) => {
      if (data.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("plan")
          .eq("id", data.user.id)
          .single()
        if (profile?.plan) setPlan(profile.plan)
        // fallback to metadata
        else if (data.user.user_metadata?.plan) setPlan(data.user.user_metadata.plan)
      }
      setLoading(false)
    })
  }, [])

  const accessible = PLAN_ACCESS[plan] || ["beginner"]
  const planInfo   = PLAN_LABELS[plan]

  if (loading) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"var(--bg)" }}>
      <div style={{ textAlign:"center", color:"var(--text-light)" }}>
        <div style={{ fontSize:"2rem", marginBottom:"1rem" }}>⏳</div>
        <p>Loading your curriculum…</p>
      </div>
    </div>
  )

  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh" }}>
      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,var(--primary-dark),var(--primary))", color:"white", padding:"3.5rem 2rem 2.5rem", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-80, right:-80, width:400, height:400, background:"rgba(255,255,255,0.04)", borderRadius:"50%" }} />
        <div style={{ maxWidth:1400, margin:"0 auto", position:"relative", zIndex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", fontSize:"0.82rem", opacity:0.7, marginBottom:"1rem" }}>
            <Link href="/dashboard" style={{ color:"white", textDecoration:"none" }}>Dashboard</Link>
            <span>›</span><span>Curriculum</span>
          </div>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:"1.5rem" }}>
            <div>
              <h1 style={{ fontFamily:"\"Playfair Display\",serif", fontSize:"2.5rem", marginBottom:"0.75rem" }}>
                PSW Training <span style={{ color:"var(--accent-green)" }}>Curriculum</span>
              </h1>
              <p style={{ opacity:0.85, maxWidth:600, lineHeight:1.8, marginBottom:"1.5rem" }}>
                27 units across 3 levels — aligned with Canadian PSW standards (Ontario, BC, Alberta).
              </p>
              <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
                {[{ icon:"📚", text:"27 Units" },{ icon:"⏱️", text:"600+ Hours" },{ icon:"🧠", text:"100+ Questions" },{ icon:"🇨🇦", text:"Canadian Standards" }].map(({ icon, text }) => (
                  <div key={text} style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.2)", padding:"0.4rem 1rem", borderRadius:20, fontSize:"0.85rem" }}>{icon} {text}</div>
                ))}
              </div>
            </div>
            {/* Plan badge */}
            <div style={{ background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.25)", borderRadius:16, padding:"1.25rem 1.75rem", textAlign:"center", minWidth:180 }}>
              <div style={{ fontSize:"2rem", marginBottom:"0.4rem" }}>{planInfo.icon}</div>
              <div style={{ fontWeight:700, fontSize:"0.95rem", marginBottom:"0.2rem" }}>{planInfo.label}</div>
              <div style={{ fontSize:"0.78rem", opacity:0.7 }}>
                {accessible.length === 1 ? "Level 1 access" : accessible.length === 2 ? "Level 1 & 2 access" : "Full access"}
              </div>
              <Link href="/dashboard" style={{ display:"inline-block", marginTop:"0.75rem", background:"rgba(255,255,255,0.2)", color:"white", padding:"0.35rem 0.9rem", borderRadius:8, fontSize:"0.78rem", fontWeight:600, textDecoration:"none" }}>
                Upgrade ↗
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1400, margin:"0 auto", padding:"2.5rem 2rem" }}>
        {CURRICULUM_STRUCTURE.map(lv => {
          const isLocked = !accessible.includes(lv.level)
          return (
            <div key={lv.level} style={{ marginBottom:"4rem", opacity: isLocked ? 0.6 : 1 }}>
              {/* Level header */}
              <div style={{ background: isLocked ? "#F1F5F9" : lv.headerBg, border:`2px solid ${isLocked ? "#CBD5E1" : lv.border}`, borderRadius:20, padding:"2.5rem", marginBottom:"2rem", position:"relative" }}>
                {isLocked && (
                  <div style={{ position:"absolute", top:20, right:20, background:"#64748B", color:"white", borderRadius:10, padding:"0.4rem 1rem", fontSize:"0.8rem", fontWeight:700, display:"flex", alignItems:"center", gap:"0.4rem" }}>
                    🔒 Locked
                  </div>
                )}
                <div style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", background: isLocked ? "#94A3B8" : lv.color, color:"white", borderRadius:20, padding:"0.4rem 1rem", fontSize:"0.82rem", fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:"1rem" }}>
                  {lv.icon} {lv.label}
                </div>
                <h2 style={{ fontFamily:"\"Playfair Display\",serif", fontSize:"1.9rem", marginBottom:"0.75rem" }}>{lv.label} Level Training</h2>
                <p style={{ color: isLocked ? "#94A3B8" : "var(--text-light)", maxWidth:700, lineHeight:1.8 }}>{lv.desc}</p>
                {isLocked && (
                  <div style={{ marginTop:"1.25rem", background:"white", borderRadius:12, padding:"1rem 1.25rem", display:"inline-flex", alignItems:"center", gap:"0.75rem", border:"1px solid #CBD5E1" }}>
                    <span style={{ fontSize:"1.2rem" }}>🔒</span>
                    <div>
                      <div style={{ fontWeight:700, fontSize:"0.88rem", color:"#475569" }}>This level requires a higher plan</div>
                      <div style={{ fontSize:"0.78rem", color:"#94A3B8" }}>
                        {lv.level === "intermediate" ? "Upgrade to Standard or Advanced plan" : "Upgrade to Advanced plan"}
                      </div>
                    </div>
                  </div>
                )}
                <div style={{ display:"flex", gap:"2rem", marginTop:"1.5rem", flexWrap:"wrap" }}>
                  <span style={{ display:"flex", alignItems:"center", gap:"0.5rem", fontSize:"0.88rem", fontWeight:600, color: isLocked ? "#94A3B8" : lv.color }}>📖 {lv.units.length} Units</span>
                  <span style={{ display:"flex", alignItems:"center", gap:"0.5rem", fontSize:"0.88rem", fontWeight:600, color: isLocked ? "#94A3B8" : lv.color }}>⏱️ {lv.hours} Hours</span>
                </div>
              </div>

              {/* Units */}
              {lv.units.map(unit => {
                const key = `${lv.level}-${unit.num}`
                const isOpen = openUnit === key
                return (
                  <div key={key} style={{ background: isLocked ? "#F8FAFC" : "white", borderRadius:18, border:`1px solid ${isLocked ? "#E2E8F0" : "var(--border)"}`, boxShadow: isLocked ? "none" : "var(--shadow)", marginBottom:"1rem", overflow:"hidden" }}>
                    <div style={{ height:4, background: isLocked ? "#E2E8F0" : "var(--border)" }}>
                      <div style={{ width:"0%", height:"100%", background: isLocked ? "#CBD5E1" : lv.color, borderRadius:4 }} />
                    </div>
                    <div
                      onClick={() => !isLocked && setOpenUnit(isOpen ? null : key)}
                      style={{ padding:"1.5rem 2rem", display:"flex", alignItems:"center", gap:"1.25rem", cursor: isLocked ? "not-allowed" : "pointer" }}
                    >
                      <div style={{ width:52, height:52, borderRadius:14, background: isLocked ? "#CBD5E1" : lv.color, color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:"1.1rem", flexShrink:0 }}>
                        {isLocked ? "🔒" : unit.num}
                      </div>
                      <div style={{ flex:1 }}>
                        <h3 style={{ fontSize:"1rem", fontWeight:700, marginBottom:"0.3rem", color: isLocked ? "#94A3B8" : "var(--text)" }}>{unit.title}</h3>
                        <div style={{ display:"flex", gap:"1rem", fontSize:"0.8rem", color:"var(--text-light)" }}>
                          <span>⏱️ {unit.duration}</span>
                          <span>❓ {unit.questions} questions</span>
                          <span style={{ background: isLocked ? "#F1F5F9" : lv.bg, color: isLocked ? "#94A3B8" : lv.color, padding:"0.15rem 0.6rem", borderRadius:6, fontWeight:600 }}>{lv.label}</span>
                        </div>
                      </div>
                      {isLocked
                        ? <span style={{ color:"#CBD5E1", fontSize:"1.2rem" }}>🔒</span>
                        : <span style={{ color:"var(--text-light)", transform:isOpen?"rotate(180deg)":"rotate(0)", transition:"transform 0.3s", fontSize:"1.2rem" }}>▾</span>
                      }
                    </div>
                    {isOpen && !isLocked && (
                      <div style={{ borderTop:"1px solid var(--border)", padding:"1.5rem 2rem" }}>
                        <p style={{ color:"var(--text-light)", fontSize:"0.93rem", lineHeight:1.8, marginBottom:"1.5rem" }}>
                          This unit covers key competencies for Canadian PSW practice. Complete theory, quiz, and case study to master this unit.
                        </p>
                        <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
                          <Link href={`/dashboard/unit/${unit.num}`} style={{ background:lv.color, color:"white", padding:"0.7rem 1.5rem", borderRadius:10, fontWeight:600, fontSize:"0.9rem", textDecoration:"none", display:"inline-block" }}>
                            📖 Study Unit {unit.num} →
                          </Link>
                          <Link href={`/dashboard/unit/${unit.num}`} style={{ background:lv.bg, color:lv.color, padding:"0.7rem 1.5rem", borderRadius:10, fontWeight:600, fontSize:"0.9rem", textDecoration:"none", display:"inline-block" }}>
                            🧠 Take Quiz →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      <footer style={{ background:"var(--text)", color:"white", padding:"2rem", textAlign:"center" }}>
        <p style={{ opacity:0.5, fontSize:"0.85rem" }}>© 2024 Hanin Care Canada · PSW Training Platform</p>
      </footer>
    </div>
  )
}