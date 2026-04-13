"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

const PRACTICE_QUIZ_ID = "fbc20026-08eb-4544-84d0-d017844f37e4"

const LEVELS = [
  { slug: "beginner",     id: "10000000-0000-0000-0000-000000000001", label: "Level 1 — Foundations",       units: 8,  color: "#2E7D9E", bg: "#E0F2F7", icon: "🌱" },
  { slug: "intermediate", id: "10000000-0000-0000-0000-000000000002", label: "Level 2 — Clinical Skills",    units: 10, color: "#D97706", bg: "#FEF3C7", icon: "📈" },
  { slug: "advanced",     id: "10000000-0000-0000-0000-000000000003", label: "Level 3 — Advanced Practice",  units: 9,  color: "#7C3AED", bg: "#EDE9FE", icon: "🏆" },
]

const PLAN_LEVELS: Record<string, string[]> = {
  beginner:     ["beginner"],
  standard:     ["beginner", "intermediate"],
  advanced:     ["beginner", "intermediate", "advanced"],
}

type CertStatus = {
  slug: string
  label: string
  icon: string
  color: string
  bg: string
  earned: boolean
  quizPassed: boolean
  quizScore: number | null
  unitsCompleted: number
  totalUnits: number
  issuedAt: string | null
  certNumber: string | null
}

export default function CertificatesPage() {
  const [loading, setLoading]   = useState(true)
  const [plan, setPlan]         = useState("beginner")
  const [userName, setUserName] = useState("Student")
  const [userId, setUserId]     = useState<string | null>(null)
  const [certs, setCerts]       = useState<CertStatus[]>([])
  const [generating, setGenerating] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => { loadData() }, [])

  const loadData = async () => {
    setLoading(true)
    const { data: authData } = await supabase.auth.getUser()
    if (!authData.user) { setLoading(false); return }

    const uid = authData.user.id
    setUserId(uid)

    // Get profile
    const { data: profile } = await supabase
      .from("profiles").select("plan, first_name, last_name").eq("id", uid).single()
    const userPlan = (profile as any)?.plan || "beginner"
    setPlan(userPlan)
    const firstName = (profile as any)?.first_name || authData.user.user_metadata?.full_name || "Student"
    const lastName  = (profile as any)?.last_name  || ""
    setUserName(`${firstName} ${lastName}`.trim())

    // Get best quiz attempt
    const { data: attempts } = await supabase
      .from("quiz_attempts")
      .select("score, passed, completed_at")
      .eq("user_id", uid)
      .eq("quiz_id", PRACTICE_QUIZ_ID)
      .eq("passed", true)
      .order("score", { ascending: false })
      .limit(1)

    const bestAttempt = attempts?.[0] || null

    // Get unit progress
    const { data: progress } = await supabase
      .from("unit_progress")
      .select("unit_id, is_completed")
      .eq("user_id", uid)

    // Get existing certificates
    const { data: existingCerts } = await supabase
      .from("certificates")
      .select("level_id, cert_number, issued_at, final_score")
      .eq("user_id", uid)

    // Get units per level
    const { data: units } = await supabase
      .from("units")
      .select("id, level_id")

    const allowedLevels = PLAN_LEVELS[userPlan] || ["beginner"]
    const completedUnitIds = new Set((progress || []).filter((p: any) => p.is_completed).map((p: any) => p.unit_id))

    const statuses: CertStatus[] = LEVELS.filter(l => allowedLevels.includes(l.slug)).map(level => {
      const levelUnits = (units || []).filter((u: any) => u.level_id === level.id)
      const completedInLevel = levelUnits.filter((u: any) => completedUnitIds.has(u.id)).length
      const allUnitsComplete = completedInLevel >= level.units
      const quizPassed = !!bestAttempt
      const earned = allUnitsComplete && quizPassed

      const existing = (existingCerts || []).find((c: any) => c.level_id === level.id)

      return {
        slug:           level.slug,
        label:          level.label,
        icon:           level.icon,
        color:          level.color,
        bg:             level.bg,
        earned,
        quizPassed,
        quizScore:      bestAttempt ? bestAttempt.score : null,
        unitsCompleted: completedInLevel,
        totalUnits:     level.units,
        issuedAt:       existing?.issued_at || null,
        certNumber:     existing?.cert_number || null,
      }
    })

    setCerts(statuses)
    setLoading(false)
  }

  // ── Generate & download PDF certificate ────────────────────
  const downloadCert = async (cert: CertStatus) => {
    setGenerating(cert.slug)
    try {
      // Dynamic import jsPDF
      const { jsPDF } = await import("jspdf")
      const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" })

      const W = 297
      const H = 210
// Add logo
let logoB64: string | null = null
try {
  const logoResp = await fetch("/logo.png")
  const logoBlob = await logoResp.blob()
  logoB64 = await new Promise<string>((res) => {
    const reader = new FileReader()
    reader.onloadend = () => res((reader.result as string).split(",")[1])
    reader.readAsDataURL(logoBlob)
  })
} catch(e) {}

// Background
doc.setFillColor(245, 247, 250)
doc.rect(0, 0, W, H, "F")

      // Top border strip
      const [r, g, b] = hexToRgb(cert.color)
      doc.setFillColor(r, g, b)
      doc.rect(0, 0, W, 8, "F")
      doc.rect(0, H - 8, W, 8, "F")

      // Left border strip
      doc.setFillColor(r, g, b)
      doc.rect(0, 0, 8, H, "F")
      doc.rect(W - 8, 0, 8, H, "F")

      // Inner decorative border
      doc.setDrawColor(r, g, b)
      doc.setLineWidth(0.5)
      doc.rect(14, 14, W - 28, H - 28)

      // Corner decorations
      const corners = [[18, 18], [W - 18, 18], [18, H - 18], [W - 18, H - 18]]
      corners.forEach(([cx, cy]) => {
        doc.setFillColor(r, g, b)
        doc.circle(cx, cy, 3, "F")
      })

      // Organization name
      doc.setFontSize(11)
      doc.setTextColor(r, g, b)
      doc.setFont("helvetica", "bold")
    // Watermark logo (center, large, transparent)
if (logoB64) {
  doc.saveGraphicsState()
  doc.setGState(new (doc as any).GState({ opacity: 0.08 }))
  doc.addImage(logoB64, "PNG", W/2 - 40, H/2 - 40, 80, 80)
  doc.restoreGraphicsState()
  // Small logo top center
  doc.addImage(logoB64, "PNG", W/2 - 15, 10, 30, 18)
}
      doc.text("HANIN CARE CANADA", W / 2, 30, { align: "center" })

      doc.setFontSize(8)
      doc.setTextColor(100, 100, 100)
      doc.setFont("helvetica", "normal")
      doc.text("PSW Training Platform · Canadian Healthcare Standards", W / 2, 36, { align: "center" })

      // Divider line
      doc.setDrawColor(r, g, b)
      doc.setLineWidth(0.3)
      doc.line(50, 40, W - 50, 40)

      // "Certificate of Completion"
      doc.setFontSize(28)
      doc.setTextColor(15, 90, 138)
      doc.setFont("helvetica", "bold")
      doc.text("Certificate of Completion", W / 2, 58, { align: "center" })

      // "This is to certify that"
      doc.setFontSize(11)
      doc.setTextColor(80, 80, 80)
      doc.setFont("helvetica", "normal")
      doc.text("This is to certify that", W / 2, 70, { align: "center" })

      // Student name
      doc.setFontSize(26)
      doc.setTextColor(10, 61, 92)
      doc.setFont("helvetica", "bold")
      doc.text(userName, W / 2, 84, { align: "center" })

      // Underline name
      const nameWidth = doc.getTextWidth(userName)
      doc.setDrawColor(r, g, b)
      doc.setLineWidth(0.5)
      doc.line(W / 2 - nameWidth / 2, 87, W / 2 + nameWidth / 2, 87)

      // "has successfully completed"
      doc.setFontSize(11)
      doc.setTextColor(80, 80, 80)
      doc.setFont("helvetica", "normal")
      doc.text("has successfully completed all requirements for", W / 2, 97, { align: "center" })

      // Level name
      doc.setFontSize(18)
      doc.setTextColor(r, g, b)
      doc.setFont("helvetica", "bold")
      doc.text(cert.label, W / 2, 110, { align: "center" })

      // Program name
      doc.setFontSize(10)
      doc.setTextColor(80, 80, 80)
      doc.setFont("helvetica", "normal")
      doc.text("Canadian Personal Support Worker (PSW) Training Program", W / 2, 120, { align: "center" })

      // Stats row
      const statsY = 135
      const stats = [
        { label: "Units Completed", value: `${cert.totalUnits}/${cert.totalUnits}` },
        { label: "Practice Quiz Score", value: `${cert.quizScore || 0}%` },
        { label: "Status", value: "PASSED" },
      ]
      stats.forEach((s, i) => {
        const x = 70 + i * 55
        doc.setFontSize(16)
        doc.setTextColor(r, g, b)
        doc.setFont("helvetica", "bold")
        doc.text(s.value, x, statsY, { align: "center" })
        doc.setFontSize(8)
        doc.setTextColor(120, 120, 120)
        doc.setFont("helvetica", "normal")
        doc.text(s.label, x, statsY + 6, { align: "center" })
      })

      // Divider
      doc.setDrawColor(200, 200, 200)
      doc.setLineWidth(0.2)
      doc.line(50, 148, W - 50, 148)

      // Issue date + cert number
      const issueDate = new Date().toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })
      const certNum = cert.certNumber || `HC-${cert.slug.toUpperCase().slice(0, 3)}-${Date.now().toString().slice(-6)}`

      doc.setFontSize(9)
      doc.setTextColor(100, 100, 100)
      doc.setFont("helvetica", "normal")
      doc.text(`Issue Date: ${issueDate}`, 60, 158, { align: "center" })
      doc.text(`Certificate No: ${certNum}`, W - 60, 158, { align: "center" })

      // Signature line
      doc.setDrawColor(80, 80, 80)
      doc.setLineWidth(0.3)
      doc.line(W / 2 - 35, 172, W / 2 + 35, 172)
      doc.setFontSize(9)
      doc.setTextColor(80, 80, 80)
      doc.setFont("helvetica", "bold")
      doc.text("Hanin Zouikli", W / 2, 177, { align: "center" })
      doc.setFont("helvetica", "normal")
      doc.setFontSize(8)
      doc.text("Program Director, Hanin Care Canada", W / 2, 182, { align: "center" })

      // Standards badges
      const badges = ["Ontario HSCPOA", "BC CHW Standards", "Alberta ALIS"]
      badges.forEach((badge, i) => {
        const bx = 55 + i * 65
        doc.setFillColor(240, 240, 240)
        doc.roundedRect(bx - 25, 188, 50, 10, 2, 2, "F")
        doc.setFontSize(7)
        doc.setTextColor(80, 80, 80)
        doc.text(`v ${badge}`, bx, 194, { align: "center" })
      })

      // Save the PDF
      doc.save(`HaninCare_Certificate_${cert.slug}_${userName.replace(/\s+/g, "_")}.pdf`)

      // Save to DB if not already saved
      if (!cert.certNumber && userId) {
        await supabase.from("certificates").upsert({
          user_id:    userId,
          level_id:   LEVELS.find(l => l.slug === cert.slug)?.id,
          cert_number: certNum,
          status:     "active",
          final_score: cert.quizScore || 0,
          issued_at:  new Date().toISOString(),
        })
        loadData()
      }
    } catch (err) {
      console.error("PDF generation error:", err)
      alert("Error generating PDF. Please try again.")
    }
    setGenerating(null)
  }

  function hexToRgb(hex: string): [number, number, number] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [15, 90, 138]
  }

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⏳</div>
        <p style={{ color: "var(--text-light)" }}>Loading your certificates…</p>
      </div>
    </div>
  )

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,var(--primary-dark),var(--primary))", color: "white", padding: "3rem 2rem 2.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontSize: "0.82rem", opacity: 0.7, marginBottom: "1rem" }}>
            <Link href="/dashboard" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link> › Certificates
          </div>
          <h1 style={{ fontFamily: '"Playfair Display",serif', fontSize: "2.2rem", marginBottom: "0.5rem" }}>
            My <span style={{ color: "var(--accent-green)" }}>Certificates</span>
          </h1>
          <p style={{ opacity: 0.8 }}>Complete all units in a level AND pass the Practice Quiz (70%+) to earn your certificate.</p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "2.5rem 2rem" }}>

        {certs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 2rem", background: "white", borderRadius: 16, border: "1px solid var(--border)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📜</div>
            <h3 style={{ marginBottom: "0.5rem" }}>No certificates yet</h3>
            <p style={{ color: "var(--text-light)", marginBottom: "1.5rem" }}>Complete your training levels and pass the practice quiz to earn certificates.</p>
            <Link href="/dashboard/curriculum" style={{ background: "var(--primary)", color: "white", padding: "0.85rem 2rem", borderRadius: 10, textDecoration: "none", fontWeight: 700 }}>
              Start Learning →
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {certs.map(cert => (
              <div key={cert.slug} style={{ background: "white", borderRadius: 18, border: `2px solid ${cert.earned ? cert.color : "var(--border)"}`, boxShadow: "var(--shadow)", overflow: "hidden" }}>

                {/* Top color strip */}
                <div style={{ height: 6, background: cert.earned ? cert.color : "#E5E7EB" }} />

                <div style={{ padding: "1.75rem 2rem", display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>

                  {/* Icon */}
                  <div style={{ width: 64, height: 64, borderRadius: 16, background: cert.earned ? cert.bg : "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", flexShrink: 0 }}>
                    {cert.earned ? cert.icon : "🔒"}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", margin: 0 }}>{cert.label}</h3>
                      {cert.earned
                        ? <span style={{ background: "#DCFCE7", color: "#15803D", padding: "0.2rem 0.75rem", borderRadius: 20, fontSize: "0.75rem", fontWeight: 700 }}>✓ Earned</span>
                        : <span style={{ background: "#F3F4F6", color: "#6B7280", padding: "0.2rem 0.75rem", borderRadius: 20, fontSize: "0.75rem", fontWeight: 600 }}>In Progress</span>
                      }
                    </div>

                    {/* Requirements */}
                    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.88rem" }}>
                        <span style={{ fontSize: "1rem" }}>{cert.unitsCompleted >= cert.totalUnits ? "✅" : "⭕"}</span>
                        <span style={{ color: "var(--text-light)" }}>Units: <strong style={{ color: "var(--text)" }}>{cert.unitsCompleted}/{cert.totalUnits}</strong></span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.88rem" }}>
                        <span style={{ fontSize: "1rem" }}>{cert.quizPassed ? "✅" : "⭕"}</span>
                        <span style={{ color: "var(--text-light)" }}>Practice Quiz: <strong style={{ color: "var(--text)" }}>{cert.quizPassed ? `${cert.quizScore}% ✓` : "Not passed yet"}</strong></span>
                      </div>
                    </div>

                    {cert.issuedAt && (
                      <p style={{ fontSize: "0.8rem", color: "var(--text-light)", marginTop: "0.5rem" }}>
                        Issued: {new Date(cert.issuedAt).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
                        {cert.certNumber && ` · #${cert.certNumber}`}
                      </p>
                    )}
                  </div>

                  {/* Download button */}
                  {cert.earned ? (
                    <button
                      onClick={() => downloadCert(cert)}
                      disabled={generating === cert.slug}
                      style={{ background: cert.color, color: "white", padding: "0.85rem 1.75rem", borderRadius: 12, border: "none", fontWeight: 700, cursor: generating === cert.slug ? "wait" : "pointer", fontFamily: "inherit", fontSize: "0.9rem", whiteSpace: "nowrap", opacity: generating === cert.slug ? 0.7 : 1 }}
                    >
                      {generating === cert.slug ? "⏳ Generating…" : "⬇️ Download PDF"}
                    </button>
                  ) : (
                    <Link href={cert.unitsCompleted < cert.totalUnits ? "/dashboard/curriculum" : "/dashboard/quiz/1"} style={{ background: "var(--bg)", color: "var(--text-light)", padding: "0.85rem 1.75rem", borderRadius: 12, border: "2px solid var(--border)", fontWeight: 600, textDecoration: "none", fontSize: "0.9rem", whiteSpace: "nowrap" }}>
                      {cert.unitsCompleted < cert.totalUnits ? "Continue Learning →" : "Take Quiz →"}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info box */}
        <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 12, padding: "1.25rem 1.5rem", marginTop: "2rem" }}>
          <h4 style={{ color: "#1D4ED8", fontWeight: 700, marginBottom: "0.5rem", fontSize: "0.9rem" }}>📋 How to earn certificates</h4>
          <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "#1E40AF", fontSize: "0.88rem", lineHeight: 1.8 }}>
            <li>Complete all units in the level (mark each unit as complete)</li>
            <li>Pass the Practice Quiz with a score of 70% or higher</li>
            <li>Your certificate will be available for download instantly</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
