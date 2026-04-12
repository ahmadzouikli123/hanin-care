"use client"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export type Plan = "beginner" | "standard" | "advanced"

export function usePlan() {
  const [plan, setPlan]       = useState<Plan | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { setLoading(false); return }
      supabase.from("profiles").select("plan").eq("id", user.id).single()
        .then(({ data }) => {
          setPlan((data?.plan as Plan) ?? "beginner")
          setLoading(false)
        })
    })
  }, [])

  const canAccess = (level: "beginner" | "intermediate" | "advanced") => {
    if (!plan) return false
    if (level === "beginner")     return true
    if (level === "intermediate") return plan === "standard" || plan === "advanced"
    if (level === "advanced")     return plan === "advanced"
    return false
  }

  return { plan, loading, canAccess }
}