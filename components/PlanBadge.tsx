import type { Plan } from "@/hooks/usePlan"

const CONFIG = {
  beginner: { icon: "🌱", label: "Beginner",  color: "#2E7D9E", bg: "#E0F2F7" },
  standard: { icon: "📈", label: "Standard",   color: "#D97706", bg: "#FEF3C7" },
  advanced: { icon: "🏆", label: "Advanced",   color: "#7C3AED", bg: "#EDE9FE" },
}

export default function PlanBadge({ plan }: { plan: Plan }) {
  const c = CONFIG[plan]
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", background: c.bg, color: c.color, border: `1.5px solid ${c.color}`, borderRadius: 20, padding: "0.3rem 0.85rem", fontSize: "0.8rem", fontWeight: 700 }}>
      {c.icon} {c.label} Plan
    </span>
  )
}