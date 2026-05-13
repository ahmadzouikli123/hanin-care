"use client"
import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

// ─── Types ───────────────────────────────────────────────────────────────────
interface CaseStudy {
  id: string
  order_index: number
  icon: string
  title: string
  subtitle: string
  scenario: string
  profile: { label: string; value: string }[]
  level_case_questions: {
    id: string
    order_index: number
    question_text: string
    correct_letter: string
    explanation: string
    level_case_options: {
      letter: string
      option_text: string
      order_index: number
    }[]
  }[]
  level_case_reflections: {
    order_index: number
    reflection_text: string
  }[]
}

// ─── Level Config ─────────────────────────────────────────────────────────────
const LEVEL_CONFIG: Record<string, any> = {
  beginner: {
    label: "Beginner",
    icon: "🌱",
    color: "var(--beg)",
    bg: "var(--beg-bg)",
    border: "#A8D9E8",
    headerBg: "linear-gradient(135deg,#E8F5F9,#D1EBF3)",
    units: "Units 1–8",
    desc: "Foundational PSW competencies — healthcare system, ethics, infection control, communication, personal care, mobility, and nutrition.",
  },
  intermediate: {
    label: "Intermediate",
    icon: "📊",
    color: "var(--int)",
    bg: "var(--int-bg)",
    border: "#FCD34D",
    headerBg: "linear-gradient(135deg,#FFFBEB,#FEF3C7)",
    units: "Units 9–18",
    desc: "Complex care scenarios — clinical observation, chronic disease, wound care, medications, mental health, palliative care, rehabilitation, and documentation.",
  },
  advanced: {
    label: "Advanced",
    icon: "🏆",
    color: "var(--adv)",
    bg: "var(--adv-bg)",
    border: "#C4B5FD",
    headerBg: "linear-gradient(135deg,#F5F3FF,#EDE9FE)",
    units: "Units 19–27",
    desc: "Advanced practice — complex medical conditions, delegated acts, gerontology, behavioural support, Indigenous cultural safety, emergency preparedness, and leadership.",
  },
}

// ─── Question Component ───────────────────────────────────────────────────────
function CaseQuestion({ q, idx, lc }: { q: any; idx: number; lc: any }) {
  const [selected, setSelected] = useState<string | null>(null)
  const opts = [...q.level_case_options].sort((a: any, b: any) => a.order_index - b.order_index)
  const isAnswered = selected !== null

  return (
    <div style={{
      border: `1.5px solid ${isAnswered ? (selected === q.correct_letter ? "#86efac" : "#fca5a5") : "var(--border)"}`,
      borderRadius: 12, overflow: "hidden", marginBottom: "1.25rem",
    }}>
      <div style={{ padding: "1rem 1.25rem", background: "var(--bg)", display: "flex", gap: "0.85rem" }}>
        <div style={{ width: 28, height: 28, background: "var(--primary)", color: "white", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.8rem", flexShrink: 0 }}>
          {idx + 1}
        </div>
        <p style={{ fontSize: "0.93rem", fontWeight: 600, lineHeight: 1.6, flex: 1, margin: 0 }}>{q.question_text}</p>
      </div>
      <div style={{ padding: "1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
        {opts.map((opt: any) => {
          const isRight = isAnswered && opt.letter === q.correct_letter
          const isWrong = selected === opt.letter && opt.letter !== q.correct_letter
          return (
            <div key={opt.letter} onClick={() => !isAnswered && setSelected(opt.letter)}
              style={{
                display: "flex", alignItems: "flex-start", gap: "0.75rem",
                padding: "0.7rem 1rem",
                border: `1.5px solid ${isRight ? "#86efac" : isWrong ? "#fca5a5" : "var(--border)"}`,
                borderRadius: 9,
                cursor: isAnswered ? "default" : "pointer",
                background: isRight ? "var(--correct-bg)" : isWrong ? "var(--wrong-bg)" : "white",
                fontSize: "0.88rem", lineHeight: 1.5,
              }}>
              <div style={{
                width: 26, height: 26, borderRadius: 6, display: "flex", alignItems: "center",
                justifyContent: "center", fontWeight: 700, fontSize: "0.78rem", flexShrink: 0,
                background: isRight ? "var(--correct)" : isWrong ? "var(--wrong)" : "var(--border)",
                color: (isRight || isWrong) ? "white" : "var(--text-light)",
              }}>{opt.letter}</div>
              <span style={{ flex: 1 }}>{opt.option_text}</span>
              {isRight && <span>✓</span>}
              {isWrong && <span>✗</span>}
            </div>
          )
        })}
      </div>
      {isAnswered && (
        <div style={{ margin: "0 1.25rem 1.25rem", padding: "1rem 1.25rem", background: "#ECFDF5", borderLeft: "4px solid #22C55E", borderRadius: "0 10px 10px 0" }}>
          <div style={{ fontWeight: 700, color: "#15803D", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
            {selected === q.correct_letter ? "✓ Correct!" : "✗ Incorrect"} — Explanation
          </div>
          <p style={{ fontSize: "0.88rem", color: "var(--text)", lineHeight: 1.7, margin: 0 }}>{q.explanation}</p>
        </div>
      )}
    </div>
  )
}

// ─── Single Case View ─────────────────────────────────────────────────────────
function CaseView({ cs, lc }: { cs: CaseStudy; lc: any }) {
  const sortedQ = [...cs.level_case_questions].sort((a, b) => a.order_index - b.order_index)
  const sortedR = [...cs.level_case_reflections].sort((a, b) => a.order_index - b.order_index)

  return (
    <div style={{ background: "white", borderRadius: 18, border: "1px solid var(--border)", boxShadow: "var(--shadow)", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,var(--primary-dark),var(--primary))", color: "white", padding: "1.5rem 2rem", display: "flex", alignItems: "center", gap: "1.25rem" }}>
        <div style={{ fontSize: "2.5rem" }}>{cs.icon}</div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "0.2rem", margin: 0 }}>{cs.title}</h3>
          <p style={{ opacity: 0.8, fontSize: "0.85rem", margin: "0.3rem 0 0" }}>{cs.subtitle}</p>
        </div>
        <span style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", padding: "0.35rem 0.9rem", borderRadius: 20, fontSize: "0.78rem", fontWeight: 700, whiteSpace: "nowrap" }}>
          Case {cs.order_index} of 5
        </span>
      </div>

      <div style={{ padding: "2rem" }}>
        {/* Profile */}
        {cs.profile?.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: "0.85rem", background: "var(--bg)", borderRadius: 12, padding: "1.25rem", marginBottom: "1.5rem" }}>
            {cs.profile.map((p, i) => (
              <div key={i}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-light)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: "0.2rem" }}>{p.label}</div>
                <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "var(--text)" }}>{p.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Scenario */}
        <div style={{ background: "#EFF6FF", borderLeft: "4px solid var(--primary)", borderRadius: "0 12px 12px 0", padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}>
          <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--primary)", marginBottom: "0.75rem" }}>📋 Scenario</h4>
          <p style={{ fontSize: "0.92rem", lineHeight: 1.8, color: "var(--text)", margin: 0 }}>{cs.scenario}</p>
        </div>

        {/* Questions */}
        <h4 style={{ fontWeight: 700, marginBottom: "1rem", color: "var(--text)" }}>Case Questions</h4>
        {sortedQ.map((q, i) => <CaseQuestion key={q.id} q={q} idx={i} lc={lc} />)}

        {/* Reflections */}
        {sortedR.length > 0 && (
          <div style={{ background: "#FFFBEB", border: "1.5px solid #FCD34D", borderRadius: 12, padding: "1.25rem 1.5rem", marginTop: "1.5rem" }}>
            <h4 style={{ fontWeight: 700, color: "#D97706", fontSize: "0.9rem", marginBottom: "0.75rem" }}>💡 Clinical Reflection Points</h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {sortedR.map((r, i) => (
                <li key={i} style={{ fontSize: "0.88rem", lineHeight: 1.7, paddingLeft: "1.5rem", position: "relative", color: "var(--text)", marginBottom: "0.35rem" }}>
                  <span style={{ position: "absolute", left: 0 }}>💡</span>{r.reflection_text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
function CasesContent() {
  const params = useParams()
  const level = (params.level as string) || "beginner"
  const lc = LEVEL_CONFIG[level] || LEVEL_CONFIG.beginner

  const [cases, setCases] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const fetchCases = async () => {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase
        .from("level_case_studies")
        .select(`
          id, order_index, icon, title, subtitle, scenario, profile,
          level_case_questions (
            id, order_index, question_text, correct_letter, explanation,
            level_case_options ( letter, option_text, order_index )
          ),
          level_case_reflections ( order_index, reflection_text )
        `)
        .eq("level", level)
        .order("order_index")

      if (!error && data) setCases(data as CaseStudy[])
      setLoading(false)
    }
    fetchCases()
  }, [level])

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
      <div style={{ textAlign: "center", color: "var(--text-light)" }}>
        <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⏳</div>
        <p>Loading case studies…</p>
      </div>
    </div>
  )

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,var(--primary-dark),var(--primary))", color: "white", padding: "3rem 2rem 2.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontSize: "0.82rem", opacity: 0.7, marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
            <Link href="/dashboard" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link> ║
            <Link href={`/dashboard/curriculum?level=${level}`} style={{ color: "white", textDecoration: "none" }}>Curriculum</Link> ║
            <span>Case Studies</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: lc.color, color: "white", borderRadius: 20, padding: "0.3rem 1rem", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: "1rem" }}>
            {lc.icon} {lc.label}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", marginBottom: "0.5rem" }}>
            {lc.label} <span style={{ color: "var(--accent-green)" }}>Case Studies</span>
          </h1>
          <p style={{ opacity: 0.8, marginBottom: "1.5rem", maxWidth: 600, lineHeight: 1.7 }}>{lc.desc}</p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {[
              { icon: "📋", text: `${cases.length} Case Studies` },
              { icon: "📘", text: lc.units },
              { icon: "🎓", text: `${lc.label} Level` },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", padding: "0.4rem 1rem", borderRadius: 20, fontSize: "0.85rem" }}>
                {icon} {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Level switcher */}
      <div style={{ background: "white", borderBottom: "2px solid var(--border)", padding: "0 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex" }}>
          {["beginner", "intermediate", "advanced"].map(lvl => {
            const cfg = LEVEL_CONFIG[lvl]
            const isActive = lvl === level
            return (
              <Link key={lvl} href={`/dashboard/cases/${lvl}`}
                style={{
                  padding: "0.9rem 1.5rem", fontWeight: 700, fontSize: "0.88rem",
                  color: isActive ? cfg.color : "var(--text-light)",
                  textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem",
                  borderBottom: `3px solid ${isActive ? cfg.color : "transparent"}`,
                  marginBottom: -2,
                }}>
                {cfg.icon} {cfg.label}
              </Link>
            )
          })}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2.5rem 2rem" }}>

        {cases.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-light)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
            <p>No case studies found for this level yet.</p>
          </div>
        ) : (
          <>
            {/* Case selector */}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2rem" }}>
              {cases.map((cs, idx) => (
                <button key={cs.id} onClick={() => setActiveIdx(idx)}
                  style={{
                    padding: "0.6rem 1.25rem", borderRadius: 20,
                    border: `2px solid ${activeIdx === idx ? lc.color : "var(--border)"}`,
                    background: activeIdx === idx ? lc.bg : "white",
                    color: activeIdx === idx ? lc.color : "var(--text-light)",
                    fontWeight: 700, fontSize: "0.85rem", cursor: "pointer",
                    fontFamily: "inherit", display: "flex", alignItems: "center", gap: "0.5rem",
                    transition: "all 0.2s",
                  }}>
                  {cs.icon} Case {cs.order_index}
                </button>
              ))}
            </div>

            {/* Active case */}
            <CaseView cs={cases[activeIdx]} lc={lc} />

            {/* Navigation */}
            <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", justifyContent: "space-between", flexWrap: "wrap" }}>
              <button onClick={() => setActiveIdx(i => Math.max(0, i - 1))} disabled={activeIdx === 0}
                style={{ background: activeIdx === 0 ? "var(--border)" : lc.color, color: activeIdx === 0 ? "var(--text-light)" : "white", padding: "0.75rem 1.5rem", borderRadius: 10, border: "none", fontWeight: 700, cursor: activeIdx === 0 ? "default" : "pointer", fontFamily: "inherit" }}>
                ← Previous Case
              </button>
              <Link href={`/dashboard/curriculum?level=${level}`}
                style={{ border: `2px solid ${lc.color}`, color: lc.color, padding: "0.75rem 1.5rem", borderRadius: 10, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                ← Back to Curriculum
              </Link>
              <button onClick={() => setActiveIdx(i => Math.min(cases.length - 1, i + 1))} disabled={activeIdx === cases.length - 1}
                style={{ background: activeIdx === cases.length - 1 ? "var(--border)" : lc.color, color: activeIdx === cases.length - 1 ? "var(--text-light)" : "white", padding: "0.75rem 1.5rem", borderRadius: 10, border: "none", fontWeight: 700, cursor: activeIdx === cases.length - 1 ? "default" : "pointer", fontFamily: "inherit" }}>
                Next Case →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function CasesPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}><p>Loading…</p></div>}>
      <CasesContent />
    </Suspense>
  )
}
