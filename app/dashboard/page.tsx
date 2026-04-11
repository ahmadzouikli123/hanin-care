"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const stats = { completed: 3, total: 21, score: 78, certs: 0, streak: 4 }

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  const levels = [
    { id: "beginner",     label: "Beginner",     color: "var(--beg)", bg: "var(--beg-bg)", icon: "🌱", units: 7,  desc: "Foundations of PSW care"             },
    { id: "intermediate", label: "Intermediate", color: "var(--int)", bg: "var(--int-bg)", icon: "📈", units: 7,  desc: "Advanced care techniques"            },
    { id: "advanced",     label: "Advanced",     color: "var(--adv)", bg: "var(--adv-bg)", icon: "🏆", units: 7,  desc: "Specialist and leadership skills"    },
  ]

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(135deg,var(--primary-dark),var(--primary))", color: "white", padding: "3rem 2rem 2.5rem" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <p style={{ opacity: 0.7, fontSize: "0.85rem", marginBottom: "0.5rem" }}>👋 Welcome back</p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.2rem", marginBottom: "0.75rem" }}>
            {user?.user_metadata?.first_name || "Student"}{" "}
            <span style={{ color: "var(--accent-green)" }}>Dashboard</span>
          </h1>
          <p style={{ opacity: 0.8, marginBottom: "2rem" }}>Continue your PSW training journey</p>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {[
              { num: `${stats.completed}/${stats.total}`, label: "Units Completed" },
              { num: `${stats.score}%`,                   label: "Average Score"   },
              { num: stats.certs,                         label: "Certificates"    },
              { num: `${stats.streak} days`,              label: "Study Streak"    },
            ].map(({ num, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.9rem", fontWeight: 700, color: "var(--accent-green)", display: "block" }}>{num}</span>
                <span style={{ fontSize: "0.78rem", opacity: 0.7 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: "white", borderBottom: "1px solid var(--border)", padding: "1rem 2rem" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-light)", whiteSpace: "nowrap" }}>Overall Progress</span>
          <div style={{ flex: 1, height: 10, background: "var(--border)", borderRadius: 5 }}>
            <div style={{ width: `${Math.round((stats.completed/stats.total)*100)}%`, height: "100%", background: "var(--primary)", borderRadius: 5 }} />
          </div>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--primary)", whiteSpace: "nowrap" }}>{Math.round((stats.completed/stats.total)*100)}%</span>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "2.5rem 2rem" }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", marginBottom: "1.5rem" }}>Training Levels</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          {levels.map(lv => (
            <div key={lv.id} style={{ background: "white", borderRadius: 18, border: "1px solid var(--border)", boxShadow: "var(--shadow)", padding: "1.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: lv.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>{lv.icon}</div>
                <div>
                  <span style={{ display: "inline-block", background: lv.color, color: "white", borderRadius: 20, padding: "0.2rem 0.8rem", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: "0.3rem" }}>{lv.label}</span>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>{lv.desc}</p>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "var(--text-light)", marginBottom: "0.6rem" }}>
                <span>{lv.units} units</span><span>0 completed</span>
              </div>
              <div style={{ height: 6, background: "var(--border)", borderRadius: 3, marginBottom: "1.25rem" }}>
                <div style={{ width: "0%", height: "100%", background: lv.color, borderRadius: 3 }} />
              </div>
              <Link href="/dashboard/curriculum" style={{ display: "block", textAlign: "center", background: lv.bg, color: lv.color, padding: "0.7rem", borderRadius: 10, fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
                Start Learning →
              </Link>
            </div>
          ))}
        </div>

        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", marginBottom: "1.5rem" }}>Quick Actions</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1rem" }}>
          {[
            { href: "/dashboard/curriculum", icon: "📚", label: "View Curriculum",  color: "var(--primary)", bg: "var(--beg-bg)" },
            { href: "/dashboard/quiz/1",     icon: "🧠", label: "Take a Quiz",      color: "var(--adv)",    bg: "var(--adv-bg)" },
            { href: "/dashboard",            icon: "📜", label: "My Certificates",  color: "var(--int)",    bg: "var(--int-bg)" },
          ].map(({ href, icon, label, color, bg }) => (
            <Link key={label} href={href} style={{ background: "white", border: "1px solid var(--border)", borderRadius: 14, padding: "1.5rem", display: "flex", alignItems: "center", gap: "1rem", textDecoration: "none", boxShadow: "var(--shadow)" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>{icon}</div>
              <span style={{ fontWeight: 600, fontSize: "0.95rem", color }}>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
