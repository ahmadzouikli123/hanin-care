"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

const PRACTICE_QUIZ_ID = "fbc20026-08eb-4544-84d0-d017844f37e4"

const PLAN_CONFIG: Record<string, any> = {
  beginner: { icon:"🌱", label:"Beginner Plan",  color:"var(--beg)", bg:"var(--beg-bg)", levels:1 },
  standard: { icon:"📈", label:"Standard Plan",  color:"var(--int)", bg:"var(--int-bg)", levels:2 },
  advanced: { icon:"🏆", label:"Advanced Plan",  color:"var(--adv)", bg:"var(--adv-bg)", levels:3 },
}

const PLAN_LEVELS: Record<string, string[]> = {
  beginner:     ["beginner"],
  standard:     ["beginner", "intermediate"],
  advanced:     ["beginner", "intermediate", "advanced"],
}

export default function DashboardPage() {
  const [user, setUser]         = useState<any>(null)
  const [plan, setPlan]         = useState<string>("beginner")
  const [loading, setLoading]   = useState(true)
  const [stats, setStats]       = useState({
    completed: 0,
    total: 27,
    score: 0,
    certs: 0,
    quizAttempts: 0,
    bestScore: 0,
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const supabase = createClient()
    const { data: authData } = await supabase.auth.getUser()
    if (!authData.user) { setLoading(false); return }

    const uid = authData.user.id
    setUser(authData.user)

    // Get plan
    const { data: profile } = await supabase
      .from("profiles").select("plan, first_name").eq("id", uid).single()
    const userPlan = (profile as any)?.plan || authData.user.user_metadata?.plan || "beginner"
    setPlan(userPlan)

    // Get completed units count
    const { count: completedCount } = await supabase
      .from("unit_progress")
      .select("id", { count: "exact" })
      .eq("user_id", uid)
      .eq("is_completed", true)

    // Get quiz attempts stats
    const { data: attempts } = await supabase
      .from("quiz_attempts")
      .select("score, passed")
      .eq("user_id", uid)
      .eq("quiz_id", PRACTICE_QUIZ_ID)

    const bestScore = attempts?.length
      ? Math.max(...attempts.map((a: any) => a.score))
      : 0
    const avgScore = attempts?.length
      ? Math.round(attempts.reduce((sum: number, a: any) => sum + a.score, 0) / attempts.length)
      : 0

    // Get certificates count
    const { count: certsCount } = await supabase
      .from("certificates")
      .select("id", { count: "exact" })
      .eq("user_id", uid)

    // Total accessible units based on plan
    const allowedLevels = PLAN_LEVELS[userPlan] || ["beginner"]
    const totalUnits = allowedLevels.length === 1 ? 8 : allowedLevels.length === 2 ? 18 : 27

    setStats({
      completed:    completedCount || 0,
      total:        totalUnits,
      score:        avgScore,
      certs:        certsCount || 0,
      quizAttempts: attempts?.length || 0,
      bestScore,
    })
    setLoading(false)
  }

  const pc = PLAN_CONFIG[plan] || PLAN_CONFIG.beginner
  const progressPct = stats.total ? Math.round((stats.completed / stats.total) * 100) : 0

  const levels = [
    { id:"beginner",     label:"Beginner",     color:"var(--beg)", bg:"var(--beg-bg)", icon:"🌱", units:8,  desc:"Foundations of PSW care",         locked: false },
    { id:"intermediate", label:"Intermediate", color:"var(--int)", bg:"var(--int-bg)", icon:"📈", units:10, desc:"Advanced care techniques",         locked: plan === "beginner" },
    { id:"advanced",     label:"Advanced",     color:"var(--adv)", bg:"var(--adv-bg)", icon:"🏆", units:9,  desc:"Specialist and leadership skills", locked: plan !== "advanced" },
  ]

  const firstName = (user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Student").split(" ")[0]

  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh" }}>

      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,var(--primary-dark),var(--primary))", color:"white", padding:"3rem 2rem 2.5rem" }}>
        <div style={{ maxWidth:1400, margin:"0 auto" }}>
          <p style={{ opacity:0.7, fontSize:"0.85rem", marginBottom:"0.5rem" }}>👋 Welcome back</p>
          <h1 style={{ fontFamily:'"Playfair Display",serif', fontSize:"2.2rem", marginBottom:"0.75rem" }}>
            {firstName} <span style={{ color:"var(--accent-green)" }}>Dashboard</span>
          </h1>
          <p style={{ opacity:0.8, marginBottom:"2rem" }}>Continue your PSW training journey</p>

          {/* Stats */}
          <div style={{ display:"flex", gap:"2rem", flexWrap:"wrap" }}>
            {[
              { num: `${stats.completed}/${stats.total}`, label:"Units Completed",  icon:"📚" },
              { num: stats.quizAttempts > 0 ? `${stats.bestScore}%` : "—", label:"Best Quiz Score", icon:"🧠" },
              { num: stats.certs,                         label:"Certificates",     icon:"📜" },
              { num: `${progressPct}%`,                   label:"Overall Progress", icon:"📈" },
            ].map(({ num, label, icon }) => (
              <div key={label} style={{ textAlign:"center" }}>
                <span style={{ fontFamily:'"Playfair Display",serif', fontSize:"1.9rem", fontWeight:700, color:"var(--accent-green)", display:"block" }}>{num}</span>
                <span style={{ fontSize:"0.78rem", opacity:0.7 }}>{icon} {label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background:"white", borderBottom:"1px solid var(--border)", padding:"1rem 2rem" }}>
        <div style={{ maxWidth:1400, margin:"0 auto", display:"flex", alignItems:"center", gap:"1.5rem" }}>
          <span style={{ fontSize:"0.85rem", fontWeight:600, color:"var(--text-light)", whiteSpace:"nowrap" }}>Overall Progress</span>
          <div style={{ flex:1, height:10, background:"var(--border)", borderRadius:5 }}>
            <div style={{ width:`${progressPct}%`, height:"100%", background:"var(--primary)", borderRadius:5, transition:"width 0.5s" }} />
          </div>
          <span style={{ fontSize:"0.85rem", fontWeight:700, color:"var(--primary)", whiteSpace:"nowrap" }}>{progressPct}%</span>
        </div>
      </div>

      <div style={{ maxWidth:1400, margin:"0 auto", padding:"2.5rem 2rem" }}>

        {/* Plan card */}
        <div style={{ background:pc.bg, border:`2px solid ${pc.color}`, borderRadius:16, padding:"1.25rem 1.75rem", marginBottom:"2rem", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"1rem" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
            <span style={{ fontSize:"2rem" }}>{pc.icon}</span>
            <div>
              <div style={{ fontWeight:700, color:pc.color, fontSize:"1rem" }}>{pc.label}</div>
              <div style={{ fontSize:"0.82rem", color:"var(--text-light)" }}>
                Access to {pc.levels} level{pc.levels > 1 ? "s" : ""} · {pc.levels === 1 ? "8" : pc.levels === 2 ? "18" : "27"} units
              </div>
            </div>
          </div>
          {plan !== "advanced" && (
            <Link href="/register" style={{ background:pc.color, color:"white", padding:"0.6rem 1.5rem", borderRadius:10, fontWeight:600, fontSize:"0.88rem", textDecoration:"none" }}>
              Upgrade Plan ↗
            </Link>
          )}
        </div>

        {/* Training levels */}
        <h2 style={{ fontFamily:'"Playfair Display",serif', fontSize:"1.5rem", marginBottom:"1.5rem" }}>Training Levels</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"1.5rem", marginBottom:"3rem" }}>
          {levels.map(lv => (
            <div key={lv.id} style={{ background:"white", borderRadius:18, border:`1px solid ${lv.locked ? "#E2E8F0" : "var(--border)"}`, boxShadow: lv.locked ? "none" : "var(--shadow)", padding:"1.75rem", opacity: lv.locked ? 0.65 : 1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"1.25rem" }}>
                <div style={{ width:52, height:52, borderRadius:14, background: lv.locked ? "#E2E8F0" : lv.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.5rem" }}>
                  {lv.locked ? "🔒" : lv.icon}
                </div>
                <div>
                  <span style={{ display:"inline-block", background: lv.locked ? "#94A3B8" : lv.color, color:"white", borderRadius:20, padding:"0.2rem 0.8rem", fontSize:"0.75rem", fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:"0.3rem" }}>{lv.label}</span>
                  <p style={{ fontSize:"0.85rem", color:"var(--text-light)" }}>{lv.locked ? "Requires higher plan" : lv.desc}</p>
                </div>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:"0.82rem", color:"var(--text-light)", marginBottom:"0.6rem" }}>
                <span>{lv.units} units</span>
                <span>{lv.locked ? "Locked" : "Available"}</span>
              </div>
              <div style={{ height:6, background:"var(--border)", borderRadius:3, marginBottom:"1.25rem" }}>
                <div style={{ width: lv.locked ? "0%" : "0%", height:"100%", background: lv.locked ? "#CBD5E1" : lv.color, borderRadius:3 }} />
              </div>
              {lv.locked
                ? <div style={{ textAlign:"center", background:"#F1F5F9", color:"#94A3B8", padding:"0.7rem", borderRadius:10, fontWeight:600, fontSize:"0.88rem" }}>🔒 Upgrade to unlock</div>
                : <Link href="/dashboard/curriculum" style={{ display:"block", textAlign:"center", background:lv.bg, color:lv.color, padding:"0.7rem", borderRadius:10, fontWeight:600, fontSize:"0.9rem", textDecoration:"none" }}>Start Learning →</Link>
              }
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <h2 style={{ fontFamily:'"Playfair Display",serif', fontSize:"1.5rem", marginBottom:"1.5rem" }}>Quick Actions</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"1rem" }}>
          {[
            { href:"/dashboard/curriculum",  icon:"📚", label:"View Curriculum",  color:"var(--primary)", bg:"var(--beg-bg)" },
            { href:"/dashboard/quiz/1",      icon:"🧠", label:"Practice Quiz",    color:"var(--adv)",    bg:"var(--adv-bg)" },
            { href:"/dashboard/certificates",icon:"📜", label:"My Certificates",  color:"var(--int)",    bg:"var(--int-bg)" },
          ].map(({ href, icon, label, color, bg }) => (
            <Link key={label} href={href} style={{ background:"white", border:"1px solid var(--border)", borderRadius:14, padding:"1.5rem", display:"flex", alignItems:"center", gap:"1rem", textDecoration:"none", boxShadow:"var(--shadow)" }}>
              <div style={{ width:44, height:44, borderRadius:12, background:bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.3rem" }}>{icon}</div>
              <span style={{ fontWeight:600, fontSize:"0.95rem", color }}>{label}</span>
            </Link>
          ))}
        </div>

        {/* Quiz stats card */}
        {stats.quizAttempts > 0 && (
          <div style={{ marginTop:"2rem", background:"white", borderRadius:16, border:"1px solid var(--border)", padding:"1.5rem 2rem", boxShadow:"var(--shadow)" }}>
            <h3 style={{ fontFamily:'"Playfair Display",serif', fontSize:"1.2rem", marginBottom:"1.25rem" }}>🧠 Practice Quiz History</h3>
            <div style={{ display:"flex", gap:"2rem", flexWrap:"wrap" }}>
              {[
                { label:"Attempts", value: stats.quizAttempts },
                { label:"Best Score", value: `${stats.bestScore}%` },
                { label:"Average Score", value: `${stats.score}%` },
                { label:"Status", value: stats.bestScore >= 70 ? "✅ Passed" : "❌ Not passed yet" },
              ].map(({ label, value }) => (
                <div key={label} style={{ textAlign:"center", minWidth:80 }}>
                  <div style={{ fontFamily:'"Playfair Display",serif', fontSize:"1.5rem", fontWeight:700, color:"var(--primary)" }}>{value}</div>
                  <div style={{ fontSize:"0.78rem", color:"var(--text-light)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
