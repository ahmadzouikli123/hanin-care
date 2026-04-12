"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { usePlan } from "@/hooks/usePlan"

const PLANS = [
  { id: "beginner", icon: "🌱", label: "Beginner",  color: "#2E7D9E", bg: "#E0F2F7", border: "#2E7D9E", units: "8 units · 140 hrs",  levels: ["Level 1 — Foundations"] },
  { id: "standard", icon: "📈", label: "Standard",   color: "#D97706", bg: "#FEF3C7", border: "#D97706", units: "18 units · 360 hrs", levels: ["Level 1", "Level 2 — Clinical Skills"], popular: false },
  { id: "advanced", icon: "🏆", label: "Advanced",   color: "#7C3AED", bg: "#EDE9FE", border: "#7C3AED", units: "27 units · 600 hrs", levels: ["Level 1", "Level 2", "Level 3 — Advanced Practice"], popular: true },
]

export default function UpgradePage() {
  const router          = useRouter()
  const { plan: current } = usePlan()
  const [loading, setLoading] = useState("")

  const upgrade = async (newPlan: string) => {
    if (newPlan === current) return
    setLoading(newPlan)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from("profiles").update({ plan: newPlan }).eq("id", user.id)
    }
    router.push("/dashboard/curriculum")
    router.refresh()
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", marginBottom: "0.5rem" }}>Choose Your Plan</h1>
      <p style={{ color: "#4A5F7F", marginBottom: "2rem" }}>Upgrade anytime to unlock more levels and content.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.25rem" }}>
        {PLANS.map(p => {
          const isCurrent = p.id === current
          return (
            <div key={p.id} style={{ border: `2px solid ${isCurrent ? p.border : "#E5E7EB"}`, borderRadius: 18, padding: "1.75rem", background: isCurrent ? p.bg : "white", position: "relative" }}>
              {p.popular && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#7C3AED", color: "white", fontSize: "0.7rem", fontWeight: 700, padding: "0.25rem 0.75rem", borderRadius: 20, whiteSpace: "nowrap" }}>RECOMMENDED</div>}
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{p.icon}</div>
              <h3 style={{ color: p.color, fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.25rem" }}>{p.label}</h3>
              <p style={{ color: "#6B7280", fontSize: "0.82rem", marginBottom: "1rem" }}>{p.units}</p>
              <div style={{ marginBottom: "1.25rem" }}>
                {p.levels.map(l => <div key={l} style={{ fontSize: "0.8rem", color: p.color, fontWeight: 600, marginBottom: "0.3rem" }}>✓ {l}</div>)}
              </div>
              <button onClick={() => upgrade(p.id)} disabled={isCurrent || !!loading}
                style={{ width: "100%", padding: "0.7rem", borderRadius: 10, border: `2px solid ${p.border}`, background: isCurrent ? p.border : "white", color: isCurrent ? "white" : p.color, fontWeight: 700, fontSize: "0.9rem", cursor: isCurrent ? "default" : "pointer", fontFamily: "inherit" }}>
                {isCurrent ? "Current Plan ✓" : loading === p.id ? "Upgrading..." : `Select ${p.label}`}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}