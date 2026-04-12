import Link from "next/link"
import type { Plan } from "@/hooks/usePlan"

const UPGRADE: Record<string, { need: Plan; label: string }> = {
  intermediate: { need: "standard",  label: "Standard" },
  advanced:     { need: "advanced",  label: "Advanced" },
}

export default function LockedLevel({ level }: { level: "intermediate" | "advanced" }) {
  const u = UPGRADE[level]
  return (
    <div style={{ background: "#F9FAFB", border: "2px dashed #D1D5DB", borderRadius: 18, padding: "3rem 2rem", textAlign: "center", margin: "2rem 0" }}>
      <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔒</div>
      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", color: "#1A2332", marginBottom: "0.5rem" }}>
        {level === "intermediate" ? "Level 2 — Intermediate" : "Level 3 — Advanced"} is Locked
      </h3>
      <p style={{ color: "#4A5F7F", marginBottom: "1.5rem", maxWidth: 400, margin: "0 auto 1.5rem" }}>
        Upgrade to the <strong>{u.label} plan</strong> to unlock this level and continue your training.
      </p>
      <Link href="/dashboard/upgrade" style={{ background: "#0F5A8A", color: "white", padding: "0.75rem 2rem", borderRadius: 10, fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", display: "inline-block" }}>
        Upgrade Plan →
      </Link>
    </div>
  )
}