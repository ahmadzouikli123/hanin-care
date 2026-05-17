"use client"
import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { UNITS } from "@/lib/curriculum-data"
import UnitVideo from "@/components/UnitVideo"
import { UNITS_4_27 } from "@/lib/units-4-27"

const ALL_UNITS = [...UNITS, ...UNITS_4_27]

// ─── Types ───────────────────────────────────────────────────────────────────
interface DBQuestion {
  id: string
  question_text: string
  difficulty: "easy" | "medium" | "hard"
  explanation: string
  order_index: number
  answer_options: {
    id: string
    option_text: string
    is_correct: boolean
    order_index: number
  }[]
}

interface QuizQ {
  text: string
  diff: "easy" | "medium" | "hard"
  options: { l: string; t: string }[]
  correct: string
  exp: string
}

// ─── Theory Block Types ───────────────────────────────────────────────────────
interface DBTheoryBlock {
  id: string
  order_index: number
  type: "heading" | "paragraph" | "list" | "infobox" | "table" | "badges" | "practical"
  content?: string
  title?: string
  variant?: "blue" | "green" | "red" | "amber" | "purple"
  items?: string[]
  headers?: string[]
  rows?: string[][]
  steps?: { title: string; desc: string; tag: string }[]
}

// ─── Case Study Types ─────────────────────────────────────────────────────────
interface DBCaseStudy {
  id: string
  order_index: number
  icon: string
  title: string
  subtitle: string
  scenario: string
  difficulty: "beginner" | "intermediate" | "advanced"
  profile: { label: string; value: string }[]
  case_study_questions: {
    id: string
    order_index: number
    question_text: string
    correct_letter: string
    explanation: string
    case_study_options: {
      letter: string
      option_text: string
      order_index: number
    }[]
  }[]
  case_study_reflections: {
    order_index: number
    reflection_text: string
  }[]
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const LETTERS = ["A", "B", "C", "D", "E"]

function dbToQuiz(q: DBQuestion): QuizQ {
  const sorted = [...q.answer_options].sort((a, b) => a.order_index - b.order_index)
  const correctIdx = sorted.findIndex((o) => o.is_correct)
  return {
    text: q.question_text,
    diff: q.difficulty,
    options: sorted.map((o, i) => ({ l: LETTERS[i], t: o.option_text })),
    correct: LETTERS[correctIdx] ?? "A",
    exp: q.explanation,
  }
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function UnitPage() {
  const params = useParams()
  const unitId = Number(params.id)
  const unit = ALL_UNITS.find((u) => u.id === unitId)

  const [userId, setUserId] = useState<string | null>(null)
  const [unitMarked, setUnitMarked] = useState(false)
  const [theoryViewed, setTheoryViewed]   = useState(false)
  const [quizPassed, setQuizPassed]       = useState(false)
  const [caseDone, setCaseDone]           = useState(false)
  const [progressPct, setProgressPct]     = useState(0)
  const [tab, setTab] = useState<"theory" | "quiz" | "case">("theory")
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [shown, setShown] = useState<Record<number, boolean>>({})
  const [finished, setFinished] = useState(false)

  // ── Theory from Supabase ──
  const [dbTheory, setDbTheory] = useState<DBTheoryBlock[]>([])
  const [theoryLoading, setTheoryLoading] = useState(true)
  const [theoryError, setTheoryError] = useState<string | null>(null)

  // ── Quiz from Supabase ──
  const [quizQuestions, setQuizQuestions] = useState<QuizQ[]>([])
  const [quizLoading, setQuizLoading] = useState(true)
  const [quizError, setQuizError] = useState<string | null>(null)

  // ── Case Studies from Supabase ──
  const [caseStudies, setCaseStudies] = useState<DBCaseStudy[]>([])
  const [caseLoading, setCaseLoading] = useState(true)
  const [caseError, setCaseError] = useState<string | null>(null)
  const [activeCaseIdx, setActiveCaseIdx] = useState(0)

  // ── Auth ──
  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data }) => {
        if (data.user) setUserId(data.user.id)
      })
  }, [])

  // ── Fetch theory from Supabase ──
  useEffect(() => {
    if (!unitId) return
    const fetchTheory = async () => {
      setTheoryLoading(true)
      try {
        const supabase = createClient()
        const { data: unitRow } = await supabase
          .from("units").select("id").eq("unit_number", unitId).single()
        if (!unitRow) throw new Error("Unit not found")

        const { data: blocks, error } = await supabase
          .from("unit_theory_blocks")
          .select("*")
          .eq("unit_id", unitRow.id)
          .order("order_index")

        if (error) throw new Error("Failed to load theory content")
        if (blocks && blocks.length > 0) {
          setDbTheory(blocks as DBTheoryBlock[])
        }
      } catch (err: any) {
        console.error("Failed to load theory:", err)
        setTheoryError(err.message ?? "Failed to load theory")
      } finally {
        setTheoryLoading(false)
      }
    }
    fetchTheory()
  }, [unitId])

  // ── Fetch quiz from Supabase ──
  useEffect(() => {
    if (!unitId) return
    const fetchQuiz = async () => {
      setQuizLoading(true)
      setQuizError(null)
      try {
        const supabase = createClient()

        // 1. Get the unit's DB id
        const { data: unitRow, error: unitErr } = await supabase
          .from("units")
          .select("id")
          .eq("unit_number", unitId)
          .single()

        if (unitErr || !unitRow) throw new Error("Unit not found in database")

        // 2. Get the unit quiz
        const { data: quiz, error: quizErr } = await supabase
          .from("quizzes")
          .select("id")
          .eq("unit_id", unitRow.id)
          .eq("quiz_type", "unit")
          .single()

        if (quizErr || !quiz) throw new Error("Quiz not found for this unit")

        // 3. Get questions + answer options
        const { data: questions, error: qErr } = await supabase
          .from("questions")
          .select(`
            id,
            question_text,
            difficulty,
            explanation,
            order_index,
            answer_options (
              id,
              option_text,
              is_correct,
              order_index
            )
          `)
          .eq("quiz_id", quiz.id)
          .order("order_index")

        if (qErr) throw new Error("Failed to load questions")

        setQuizQuestions((questions as DBQuestion[]).map(dbToQuiz))
      } catch (err: any) {
        setQuizError(err.message ?? "Failed to load quiz")
        // Fallback to static data if available
        if (unit?.quiz?.length) {
          setQuizQuestions(unit.quiz as QuizQ[])
        }
      } finally {
        setQuizLoading(false)
      }
    }

    fetchQuiz()
  }, [unitId])

  // ── Fetch case studies from Supabase ──
  useEffect(() => {
    if (!unitId) return
    const fetchCases = async () => {
      setCaseLoading(true)
      try {
        const supabase = createClient()
        const { data: unitRow } = await supabase
          .from("units").select("id").eq("unit_number", unitId).single()
        if (!unitRow) throw new Error("Unit not found")

        const { data: cases, error } = await supabase
          .from("case_studies")
          .select(`
            id, order_index, icon, title, subtitle, scenario, difficulty, profile,
            case_study_questions (
              id, order_index, question_text, correct_letter, explanation,
              case_study_options ( letter, option_text, order_index )
            ),
            case_study_reflections ( order_index, reflection_text )
          `)
          .eq("unit_id", unitRow.id)
          .order("order_index")

        if (error) throw error
        if (error) throw new Error("Failed to load case studies")
        if (cases) setCaseStudies(cases as DBCaseStudy[])
      } catch (err: any) {
        console.error("Failed to load case studies:", err)
        setCaseError(err.message ?? "Failed to load case studies")
      } finally {
        setCaseLoading(false)
      }
    }
    fetchCases()
  }, [unitId])

  if (!unit)
    return (
      <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <h2>Unit not found</h2>
        <Link href="/dashboard/curriculum">← Back to Curriculum</Link>
      </div>
    )

  // ── Actions ──
  // ── Progress helpers ──────────────────────────────────────────────────────
  const getUnitDbId = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from("units").select("id").eq("unit_number", unitId).single()
    return data?.id ?? null
  }

  const updateProgress = async (theory: boolean, quiz: boolean, quizScore: number, quizPass: boolean, caseStudy: boolean) => {
    if (!userId) return
    const unitDbId = await getUnitDbId()
    if (!unitDbId) return
    const pct = Math.round((Number(theory) + Number(quizPass) + Number(caseStudy)) / 3 * 100)
    setProgressPct(pct)
    const supabase = createClient()
    await supabase.from("unit_progress").upsert({
      user_id:        userId,
      unit_id:        unitDbId,
      is_started:     true,
      theory_viewed:  theory,
      quiz_completed: quiz,
      quiz_score:     quizScore,
      quiz_passed:    quizPass,
      case_completed: caseStudy,
      progress_pct:   pct,
      is_completed:   pct === 100,
      completed_at:   pct === 100 ? new Date().toISOString() : null,
      last_accessed:  new Date().toISOString(),
    }, { onConflict: "user_id,unit_id" })
    if (pct === 100) setUnitMarked(true)
  }

  const markTheoryViewed = async () => {
    if (theoryViewed) return
    setTheoryViewed(true)
    await updateProgress(true, quizPassed, finished ? Math.round((score / activeQuiz.length) * 100) : 0, quizPassed, caseDone)
  }

  const markCaseCompleted = async () => {
    if (caseDone) return
    setCaseDone(true)
    await updateProgress(theoryViewed, quizPassed, finished ? Math.round((score / activeQuiz.length) * 100) : 0, quizPassed, true)
  }

  const markUnitComplete = async () => {
    if (!userId || unitMarked) return
    const supabase = createClient()
    const { data: unitRow } = await supabase
      .from("units").select("id").eq("unit_number", unitId).single()
    if (!unitRow) return
    await supabase.from("unit_progress").upsert(
      {
        user_id: userId,
        unit_id: unitRow.id,
        is_completed: true,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,unit_id" }
    )
    setUnitMarked(true)
  }

  const answerQ = (qIdx: number, letter: string) => {
    if (shown[qIdx]) return
    setAnswers((a) => ({ ...a, [qIdx]: letter }))
    setShown((s) => ({ ...s, [qIdx]: true }))
  }

  const activeQuiz = quizQuestions
  const score = activeQuiz.filter((q, i) => answers[i] === q.correct).length
  const pct = finished ? Math.round((score / activeQuiz.length) * 100) : 0
  const passed = pct >= 70

  const lc = {
    beginner: { color: "var(--beg)", bg: "var(--beg-bg)", border: "#A8D9E8" },
    intermediate: { color: "var(--int)", bg: "var(--int-bg)", border: "#FCD34D" },
    advanced: { color: "var(--adv)", bg: "var(--adv-bg)", border: "#C4B5FD" },
  }[unit.level]

  const DC: Record<string, any> = {
    easy: { bg: "#DCFCE7", color: "#166534" },
    medium: { bg: "#FEF3C7", color: "#92400E" },
    hard: { bg: "#FEE2E2", color: "#991B1B" },
  }

  const tabBtn = (t: "theory" | "quiz" | "case", label: string) => (
    <button
      onClick={() => setTab(t)}
      style={{
        padding: "0.9rem 1.5rem",
        fontWeight: 600,
        fontSize: "0.88rem",
        color: tab === t ? "var(--primary)" : "var(--text-light)",
        border: "none",
        background: "none",
        cursor: "pointer",
        borderBottom: `3px solid ${tab === t ? "var(--primary)" : "transparent"}`,
        marginBottom: -2,
        fontFamily: "inherit",
      }}
    >
      {label}
    </button>
  )

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg,var(--primary-dark),var(--primary))`,
          color: "white",
          padding: "3rem 2rem 2rem",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              fontSize: "0.82rem",
              opacity: 0.7,
              marginBottom: "1rem",
              display: "flex",
              gap: "0.5rem",
            }}
          >
            <Link href="/dashboard" style={{ color: "white", textDecoration: "none" }}>
              Dashboard
            </Link>{" "}
            ║
            <Link href="/dashboard/curriculum" style={{ color: "white", textDecoration: "none" }}>
              Curriculum
            </Link>{" "}
            ║<span>Unit {unit.id}</span>
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: lc.color,
              color: "white",
              borderRadius: 20,
              padding: "0.3rem 1rem",
              fontSize: "0.78rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: "1rem",
            }}
          >
            {unit.level.charAt(0).toUpperCase() + unit.level.slice(1)} · Unit {unit.id}
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            {unit.title}
          </h1>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              flexWrap: "wrap",
              opacity: 0.85,
              fontSize: "0.88rem",
            }}
          >
            <span>⏱ {unit.duration}</span>
            <span>📘 {unit.lectures} Lectures</span>
            <span>
              ❓{" "}
              {quizLoading
                ? "Loading..."
                : `${activeQuiz.length} Quiz Questions`}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          background: "white",
          borderBottom: "2px solid var(--border)",
          padding: "0 2rem",
        }}
      >
        <div
          style={{ maxWidth: 1100, margin: "0 auto", display: "flex" }}
        >
          {tabBtn("theory", "📘 Theory")}
          {tabBtn(
            "quiz",
            `🧠 Quiz (${quizLoading ? "..." : activeQuiz.length})`
          )}
          {(caseStudies.length > 0 || unit.caseStudy) && tabBtn("case", `📋 Case Study (${caseStudies.length || 1})`)}
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ background: "white", borderBottom: "1px solid var(--border)", padding: "0.75rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-light)", whiteSpace: "nowrap" }}>Unit Progress</span>
          <div style={{ flex: 1, height: 8, background: "var(--border)", borderRadius: 4 }}>
            <div style={{ width: `${progressPct}%`, height: "100%", background: progressPct === 100 ? "#22C55E" : "var(--primary)", borderRadius: 4, transition: "width 0.5s" }} />
          </div>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: progressPct === 100 ? "#22C55E" : "var(--primary)", whiteSpace: "nowrap" }}>{progressPct}%</span>
          <div style={{ display: "flex", gap: "0.4rem" }}>
            {[{ label: "📘", done: theoryViewed }, { label: "🧠", done: quizPassed }, { label: "📋", done: caseDone }].map(({ label, done }) => (
              <span key={label} style={{ fontSize: "0.9rem", opacity: done ? 1 : 0.3 }}>{label}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2.5rem 2rem" }}>

        {/* ── THEORY TAB ── */}
        {tab === "theory" && markTheoryViewed()}
        {tab === "theory" && (
          <div>
            <UnitVideo unitId={unitId} levelColor={lc.color} />
            {theoryLoading ? (
              <div style={{ textAlign:"center", padding:"2rem", color:"var(--text-light)" }}>
                <div style={{ fontSize:"1.5rem", marginBottom:"0.5rem" }}>⏳</div>
                <p style={{ fontSize:"0.9rem" }}>Loading theory content…</p>
              </div>
            ) : null}
            {!theoryLoading && theoryError && dbTheory.length === 0 && (
              <div style={{ background:"#FEF2F2", border:"1px solid #FCA5A5", borderRadius:12, padding:"1rem 1.25rem", marginBottom:"1.5rem", display:"flex", alignItems:"center", gap:"0.75rem" }}>
                <span style={{ fontSize:"1.2rem" }}>⚠️</span>
                <div>
                  <div style={{ fontWeight:700, color:"#DC2626", fontSize:"0.88rem" }}>Failed to load theory content</div>
                  <div style={{ fontSize:"0.8rem", color:"#991B1B", marginTop:"0.2rem" }}>Showing offline content — check your connection and refresh.</div>
                </div>
                <button onClick={() => window.location.reload()} style={{ marginLeft:"auto", background:"#DC2626", color:"white", border:"none", borderRadius:8, padding:"0.4rem 0.9rem", fontSize:"0.8rem", fontWeight:700, cursor:"pointer" }}>Retry</button>
              </div>
            )}
            {!theoryLoading && (dbTheory.length > 0 ? dbTheory : unit.theory).map((block: any, i: number) => (
              <div key={i} style={{ marginBottom: "2rem" }}>
                {block.type === "heading" && (
                  <h3
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "var(--text)",
                      marginBottom: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        width: 4,
                        height: 18,
                        background: lc.color,
                        borderRadius: 2,
                        display: "inline-block",
                      }}
                    />
                    {block.content}
                  </h3>
                )}
                {block.type === "paragraph" && (
                  <p
                    style={{
                      fontSize: "0.93rem",
                      lineHeight: 1.8,
                      color: "var(--text-light)",
                      background: "white",
                      borderRadius: 12,
                      padding: "1.25rem 1.5rem",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {block.content}
                  </p>
                )}
                {block.type === "list" && (
                  <div
                    style={{
                      background: "white",
                      borderRadius: 12,
                      padding: "1.25rem 1.5rem",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <ul style={{ marginLeft: "1.25rem" }}>
                      {(block.items || []).map((item: string, j: number) => (
                        <li
                          key={j}
                          style={{
                            fontSize: "0.93rem",
                            lineHeight: 1.7,
                            color: "var(--text-light)",
                            marginBottom: "0.4rem",
                          }}
                          dangerouslySetInnerHTML={{ __html: item }}
                        />
                      ))}
                    </ul>
                  </div>
                )}
                {block.type === "infobox" && (
                  <div
                    style={{
                      borderRadius: 12,
                      padding: "1.25rem 1.5rem",
                      borderLeft: "4px solid",
                      background:
                        block.variant === "blue"
                          ? "#EFF6FF"
                          : block.variant === "green"
                          ? "#F0FDF4"
                          : block.variant === "red"
                          ? "#FEF2F2"
                          : block.variant === "amber"
                          ? "#FFFBEB"
                          : "#F5F3FF",
                      borderColor:
                        block.variant === "blue"
                          ? "#3B82F6"
                          : block.variant === "green"
                          ? "#22C55E"
                          : block.variant === "red"
                          ? "#EF4444"
                          : block.variant === "amber"
                          ? "#F59E0B"
                          : "#8B5CF6",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                        marginBottom: "0.5rem",
                        color:
                          block.variant === "blue"
                            ? "#1D4ED8"
                            : block.variant === "green"
                            ? "#15803D"
                            : block.variant === "red"
                            ? "#DC2626"
                            : block.variant === "amber"
                            ? "#D97706"
                            : "#7C3AED",
                      }}
                    >
                      {block.title}
                    </div>
                    <div
                      style={{
                        fontSize: "0.92rem",
                        lineHeight: 1.7,
                        color: "var(--text)",
                      }}
                    >
                      {block.content}
                      {block.items && (
                        <ul style={{ marginLeft: "1.2rem", marginTop: "0.5rem" }}>
                          {block.items.map((it: string, j: number) => (
                            <li
                              key={j}
                              style={{ marginBottom: "0.3rem" }}
                              dangerouslySetInnerHTML={{ __html: it }}
                            />
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
                {block.type === "table" && (
                  <div style={{ overflowX: "auto" }}>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        borderRadius: 12,
                        overflow: "hidden",
                        fontSize: "0.88rem",
                      }}
                    >
                      <thead style={{ background: "var(--primary)", color: "white" }}>
                        <tr>
                          {block.headers?.map((h: string, j: number) => (
                            <th
                              key={j}
                              style={{
                                padding: "0.85rem 1rem",
                                textAlign: "left",
                                fontWeight: 600,
                              }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.rows?.map((row: string[], j: number) => (
                          <tr
                            key={j}
                            style={{ background: j % 2 === 0 ? "white" : "var(--bg)" }}
                          >
                            {row.map((cell, k) => (
                              <td
                                key={k}
                                style={{
                                  padding: "0.8rem 1rem",
                                  borderBottom: "1px solid var(--border)",
                                }}
                                dangerouslySetInnerHTML={{ __html: cell }}
                              />
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {block.type === "badges" && (
                  <div
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      flexWrap: "wrap",
                      marginTop: "1rem",
                    }}
                  >
                    {(block.items || []).map((b: string, j: number) => (
                      <span
                        key={j}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          background: "white",
                          border: "1px solid var(--border)",
                          borderRadius: 8,
                          padding: "0.4rem 0.85rem",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          color: "var(--text)",
                        }}
                      >
                        ✓ {b}
                      </span>
                    ))}
                  </div>
                )}
                {block.type === "practical" && (
                  <div
                    style={{
                      background: "#F8FAFF",
                      borderRadius: 16,
                      padding: "1.75rem",
                      border: "1px solid #E0E8FF",
                      marginTop: "2rem",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "var(--primary)",
                        marginBottom: "1.25rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      🔬 Practical Skills
                    </h4>
                    {(block.steps || []).map((step: any, j: number) => (
                      <div
                        key={j}
                        style={{
                          display: "flex",
                          gap: "1rem",
                          marginBottom: "1.25rem",
                          background: "white",
                          borderRadius: 12,
                          padding: "1.25rem",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            minWidth: 36,
                            borderRadius: "50%",
                            background: lc.color,
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: "0.95rem",
                          }}
                        >
                          {j + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                          <h5 style={{ fontWeight: 700, marginBottom: "0.4rem", fontSize: "0.95rem" }}>
                            {step.title}
                          </h5>
                          <p
                            style={{
                              fontSize: "0.88rem",
                              color: "var(--text-light)",
                              lineHeight: 1.7,
                              marginBottom: "0.5rem",
                            }}
                          >
                            {step.desc}
                          </p>
                          <span
                            style={{
                              background:
                                step.tag === "Must Pass"
                                  ? "#DCFCE7"
                                  : step.tag === "Competency Check"
                                  ? "#FEF3C7"
                                  : "#E0F2F7",
                              color:
                                step.tag === "Must Pass"
                                  ? "#166534"
                                  : step.tag === "Competency Check"
                                  ? "#92400E"
                                  : "var(--beg)",
                              padding: "0.2rem 0.7rem",
                              borderRadius: 6,
                              fontSize: "0.75rem",
                              fontWeight: 700,
                            }}
                          >
                            {step.tag}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
              <button
                onClick={() => setTab("quiz")}
                style={{
                  background: lc.color,
                  color: "white",
                  padding: "0.85rem 2rem",
                  borderRadius: 10,
                  border: "none",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "0.95rem",
                }}
              >
                Take Quiz →
              </button>
              <Link
                href="/dashboard/curriculum"
                style={{
                  background: "transparent",
                  border: `2px solid ${lc.color}`,
                  color: lc.color,
                  padding: "0.85rem 2rem",
                  borderRadius: 10,
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                ← Back
              </Link>
            </div>
          </div>
        )}

        {/* ── QUIZ TAB ── */}
        {tab === "quiz" && (
          <div>
            {/* Loading state */}
            {quizLoading && (
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem",
                  color: "var(--text-light)",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⏳</div>
                <p>Loading quiz questions...</p>
              </div>
            )}

            {/* Error state */}
            {!quizLoading && quizError && (
              <div style={{ background:"#FEF2F2", border:"1px solid #FCA5A5", borderRadius:12, padding:"1rem 1.25rem", marginBottom:"1.5rem", display:"flex", alignItems:"center", gap:"0.75rem" }}>
                <span style={{ fontSize:"1.2rem" }}>⚠️</span>
                <div>
                  <div style={{ fontWeight:700, color:"#DC2626", fontSize:"0.88rem" }}>Failed to load quiz questions</div>
                  <div style={{ fontSize:"0.8rem", color:"#991B1B", marginTop:"0.2rem" }}>{quizError} — {quizQuestions.length > 0 ? "showing fallback questions." : "no questions available."}</div>
                </div>
                <button onClick={() => window.location.reload()} style={{ marginLeft:"auto", background:"#DC2626", color:"white", border:"none", borderRadius:8, padding:"0.4rem 0.9rem", fontSize:"0.8rem", fontWeight:700, cursor:"pointer" }}>Retry</button>
              </div>
            )}

            {/* No questions */}
            {!quizLoading && activeQuiz.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem",
                  color: "var(--text-light)",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>📭</div>
                <p>No quiz questions found for this unit.</p>
              </div>
            )}

            {/* Results banner */}
            {!quizLoading && finished && activeQuiz.length > 0 && (
              <div
                style={{
                  background: passed
                    ? "linear-gradient(135deg,#DCFCE7,#BBF7D0)"
                    : "linear-gradient(135deg,#FEF2F2,#FEE2E2)",
                  border: `2px solid ${passed ? "#22C55E" : "#EF4444"}`,
                  borderRadius: 16,
                  padding: "1.5rem 2rem",
                  marginBottom: "2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1.25rem",
                }}
              >
                <span style={{ fontSize: "2.5rem" }}>{passed ? "🎉" : "📚"}</span>
                <div>
                  <h3
                    style={{
                      fontWeight: 700,
                      color: passed ? "#15803D" : "#DC2626",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {passed ? `Passed with ${pct}%!` : `Score: ${pct}% — Review and retry`}
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-light)" }}>
                    {score}/{activeQuiz.length} correct · 70% to pass
                  </p>
                </div>
              </div>
            )}

            {/* Questions */}
            {!quizLoading &&
              activeQuiz.map((q, idx) => {
                const ua = answers[idx]
                const isAns = shown[idx]
                const isOk = ua === q.correct
                const dc = DC[q.diff] || DC.medium
                return (
                  <div
                    key={idx}
                    style={{
                      background: "white",
                      borderRadius: 16,
                      border: `1.5px solid ${
                        isAns ? (isOk ? "#86efac" : "#fca5a5") : "var(--border)"
                      }`,
                      boxShadow: "var(--shadow)",
                      padding: "1.75rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "0.6rem",
                        marginBottom: "1rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          background: lc.bg,
                          color: lc.color,
                          padding: "0.25rem 0.8rem",
                          borderRadius: 10,
                          fontSize: "0.75rem",
                          fontWeight: 600,
                        }}
                      >
                        Unit {unit.id}
                      </span>
                      <span
                        style={{
                          background: dc.bg,
                          color: dc.color,
                          padding: "0.25rem 0.8rem",
                          borderRadius: 10,
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          textTransform: "capitalize",
                        }}
                      >
                        {q.diff}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        lineHeight: 1.6,
                        marginBottom: "1.25rem",
                      }}
                    >
                      <span
                        style={{
                          background: "var(--primary)",
                          color: "white",
                          borderRadius: 6,
                          padding: "0.15rem 0.6rem",
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          marginRight: "0.5rem",
                        }}
                      >
                        Q{idx + 1}
                      </span>
                      {q.text}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.6rem",
                        marginBottom: "1rem",
                      }}
                    >
                      {q.options.map((opt) => {
                        const isRight = isAns && opt.l === q.correct
                        const isWrong = isAns && ua === opt.l && !isOk
                        return (
                          <div
                            key={opt.l}
                            onClick={() => answerQ(idx, opt.l)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.85rem",
                              padding: "0.85rem 1rem",
                              border: `2px solid ${
                                isRight ? "#86efac" : isWrong ? "#fca5a5" : "var(--border)"
                              }`,
                              borderRadius: 10,
                              cursor: isAns ? "default" : "pointer",
                              background: isRight
                                ? "var(--correct-bg)"
                                : isWrong
                                ? "var(--wrong-bg)"
                                : "var(--bg)",
                              fontSize: "0.92rem",
                            }}
                          >
                            <div
                              style={{
                                width: 28,
                                height: 28,
                                minWidth: 28,
                                borderRadius: 7,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 700,
                                fontSize: "0.78rem",
                                background: isRight
                                  ? "var(--correct)"
                                  : isWrong
                                  ? "var(--wrong)"
                                  : "var(--border)",
                                color: isRight || isWrong ? "white" : "var(--text-light)",
                              }}
                            >
                              {opt.l}
                            </div>
                            <span style={{ flex: 1 }}>{opt.t}</span>
                            {isRight && <span>✓</span>}
                            {isWrong && <span>✗</span>}
                          </div>
                        )
                      })}
                    </div>
                    {isAns && (
                      <div
                        style={{
                          background: isOk ? "var(--correct-bg)" : "var(--wrong-bg)",
                          borderLeft: `4px solid ${isOk ? "var(--correct)" : "var(--wrong)"}`,
                          borderRadius: "0 12px 12px 0",
                          padding: "1rem 1.25rem",
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 700,
                            color: isOk ? "var(--correct)" : "var(--wrong)",
                            fontSize: "0.85rem",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {isOk ? "✓ Correct!" : "✗ Incorrect"} — Explanation
                        </div>
                        <p
                          style={{
                            fontSize: "0.9rem",
                            lineHeight: 1.7,
                            color: "var(--text)",
                          }}
                        >
                          {q.exp}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}

            {/* Actions */}
            {!quizLoading && activeQuiz.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  marginTop: "1rem",
                  flexWrap: "wrap",
                }}
              >
                {Object.keys(shown).length === activeQuiz.length && !finished && (
                  <button
                    onClick={async () => {
                      setFinished(true)
                      const sc = activeQuiz.filter((q, i) => answers[i] === q.correct).length
                      if (Math.round((sc / activeQuiz.length) * 100) >= 70)
                        await markUnitComplete()
                    }}
                    style={{
                      background: "var(--primary)",
                      color: "white",
                      padding: "0.8rem 2rem",
                      borderRadius: 10,
                      border: "none",
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Submit & See Results →
                  </button>
                )}
                <button
                  onClick={() => {
                    setAnswers({})
                    setShown({})
                    setFinished(false)
                  }}
                  style={{
                    background: "transparent",
                    border: "2px solid var(--border)",
                    color: "var(--text-light)",
                    padding: "0.8rem 1.5rem",
                    borderRadius: 10,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  🔄 Reset
                </button>
                <Link
                  href="/dashboard/curriculum"
                  style={{
                    border: "2px solid var(--primary)",
                    color: "var(--primary)",
                    padding: "0.8rem 2rem",
                    borderRadius: 10,
                    fontWeight: 600,
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                >
                  ← Curriculum
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ── CASE STUDY TAB ── */}
        {tab === "case" && markCaseCompleted()}
        {tab === "case" && (
          <div>
            {caseLoading ? (
              <div style={{ textAlign:"center", padding:"3rem", color:"var(--text-light)" }}>
                <div style={{ fontSize:"2rem", marginBottom:"1rem" }}>⏳</div>
                <p>Loading case studies...</p>
              </div>
            ) : !caseLoading && caseError && caseStudies.length === 0 ? (
              <div style={{ background:"#FEF2F2", border:"1px solid #FCA5A5", borderRadius:12, padding:"1rem 1.25rem", display:"flex", alignItems:"center", gap:"0.75rem" }}>
                <span style={{ fontSize:"1.2rem" }}>⚠️</span>
                <div>
                  <div style={{ fontWeight:700, color:"#DC2626", fontSize:"0.88rem" }}>Failed to load case studies</div>
                  <div style={{ fontSize:"0.8rem", color:"#991B1B", marginTop:"0.2rem" }}>Check your connection and try again.</div>
                </div>
                <button onClick={() => window.location.reload()} style={{ marginLeft:"auto", background:"#DC2626", color:"white", border:"none", borderRadius:8, padding:"0.4rem 0.9rem", fontSize:"0.8rem", fontWeight:700, cursor:"pointer" }}>Retry</button>
              </div>
            ) : caseStudies.length === 0 && !unit.caseStudy ? (
              <div style={{ textAlign:"center", padding:"3rem", color:"var(--text-light)" }}>
                <div style={{ fontSize:"2rem", marginBottom:"1rem" }}>📭</div>
                <p>No case studies found for this unit.</p>
              </div>
            ) : (
              <>
                {/* Case selector tabs — show if DB has cases */}
                {caseStudies.length > 0 && (
                  <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap", marginBottom:"2rem" }}>
                    {caseStudies.map((cs, idx) => {
                      const diffColors: Record<string, any> = {
                        beginner:     { bg:"var(--beg-bg)", color:"var(--beg)", border:"#A8D9E8" },
                        intermediate: { bg:"var(--int-bg)", color:"var(--int)", border:"#FCD34D" },
                        advanced:     { bg:"var(--adv-bg)", color:"var(--adv)", border:"#C4B5FD" },
                      }
                      const dc = diffColors[cs.difficulty] || diffColors.beginner
                      return (
                        <button
                          key={cs.id}
                          onClick={() => setActiveCaseIdx(idx)}
                          style={{
                            padding:"0.5rem 1.1rem",
                            borderRadius:20,
                            border:`2px solid ${activeCaseIdx === idx ? dc.border : "var(--border)"}`,
                            background: activeCaseIdx === idx ? dc.bg : "white",
                            color: activeCaseIdx === idx ? dc.color : "var(--text-light)",
                            fontWeight:700,
                            fontSize:"0.82rem",
                            cursor:"pointer",
                            fontFamily:"inherit",
                            display:"flex",
                            alignItems:"center",
                            gap:"0.4rem",
                          }}
                        >
                          {cs.icon} Case {cs.order_index}
                          <span style={{ fontSize:"0.72rem", opacity:0.8, textTransform:"capitalize" }}>
                            · {cs.difficulty}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                )}

                {/* Active case study */}
                {caseStudies.length > 0 ? (
                  <DBCaseStudyView cs={caseStudies[activeCaseIdx]} lc={lc} />
                ) : unit.caseStudy ? (
                  // Fallback to static data
                  <div style={{ background:"white", borderRadius:18, border:"1px solid var(--border)", boxShadow:"var(--shadow)", overflow:"hidden" }}>
                    <div style={{ background:`linear-gradient(135deg,var(--primary-dark),var(--primary))`, color:"white", padding:"1.5rem 2rem", display:"flex", alignItems:"center", gap:"1.25rem" }}>
                      <div style={{ fontSize:"2.5rem" }}>{unit.caseStudy.icon}</div>
                      <div style={{ flex:1 }}>
                        <h3 style={{ fontSize:"1.1rem", marginBottom:"0.2rem" }}>{unit.caseStudy.title}</h3>
                        <p style={{ opacity:0.8, fontSize:"0.85rem" }}>{unit.caseStudy.subtitle}</p>
                      </div>
                    </div>
                    <div style={{ padding:"2rem" }}>
                      <div style={{ background:"#EFF6FF", borderLeft:"4px solid var(--primary)", borderRadius:"0 12px 12px 0", padding:"1.25rem 1.5rem", marginBottom:"1.5rem" }}>
                        <h4 style={{ fontSize:"0.9rem", fontWeight:700, color:"var(--primary)", marginBottom:"0.75rem" }}>📋 Scenario</h4>
                        <p style={{ fontSize:"0.92rem", lineHeight:1.8, color:"var(--text)" }}>{unit.caseStudy.scenario}</p>
                      </div>
                      <h4 style={{ fontWeight:700, marginBottom:"1rem" }}>Case Questions</h4>
                      {unit.caseStudy.questions.map((cq: any, i: number) => (
                        <CaseQuestion key={i} cq={cq} idx={i} lc={lc} />
                      ))}
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── DB Case Study View Component ────────────────────────────────────────────
function DBCaseStudyView({ cs, lc }: { cs: DBCaseStudy; lc: any }) {
  const diffColors: Record<string, any> = {
    beginner:     { bg:"var(--beg-bg)", color:"var(--beg)" },
    intermediate: { bg:"var(--int-bg)", color:"var(--int)" },
    advanced:     { bg:"var(--adv-bg)", color:"var(--adv)" },
  }
  const dc = diffColors[cs.difficulty] || diffColors.beginner
  const sortedQuestions = [...cs.case_study_questions].sort((a,b) => a.order_index - b.order_index)
  const sortedReflections = [...cs.case_study_reflections].sort((a,b) => a.order_index - b.order_index)

  return (
    <div style={{ background:"white", borderRadius:18, border:"1px solid var(--border)", boxShadow:"var(--shadow)", overflow:"hidden" }}>
      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,var(--primary-dark),var(--primary))`, color:"white", padding:"1.5rem 2rem", display:"flex", alignItems:"center", gap:"1.25rem" }}>
        <div style={{ fontSize:"2.5rem" }}>{cs.icon}</div>
        <div style={{ flex:1 }}>
          <h3 style={{ fontSize:"1.1rem", marginBottom:"0.2rem" }}>{cs.title}</h3>
          <p style={{ opacity:0.8, fontSize:"0.85rem" }}>{cs.subtitle}</p>
        </div>
        <span style={{ background:"rgba(255,255,255,0.2)", border:"1px solid rgba(255,255,255,0.3)", padding:"0.35rem 0.9rem", borderRadius:20, fontSize:"0.78rem", fontWeight:700, textTransform:"capitalize" }}>
          {cs.difficulty}
        </span>
      </div>

      <div style={{ padding:"2rem" }}>
        {/* Profile */}
        {cs.profile?.length > 0 && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))", gap:"0.85rem", background:"var(--bg)", borderRadius:12, padding:"1.25rem", marginBottom:"1.5rem" }}>
            {cs.profile.map((p, i) => (
              <div key={i}>
                <div style={{ fontSize:"0.72rem", fontWeight:700, color:"var(--text-light)", textTransform:"uppercase", letterSpacing:0.5, marginBottom:"0.2rem" }}>{p.label}</div>
                <div style={{ fontSize:"0.92rem", fontWeight:600, color:"var(--text)" }}>{p.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Scenario */}
        <div style={{ background:"#EFF6FF", borderLeft:"4px solid var(--primary)", borderRadius:"0 12px 12px 0", padding:"1.25rem 1.5rem", marginBottom:"1.5rem" }}>
          <h4 style={{ fontSize:"0.9rem", fontWeight:700, color:"var(--primary)", marginBottom:"0.75rem" }}>📋 Scenario</h4>
          <p style={{ fontSize:"0.92rem", lineHeight:1.8, color:"var(--text)" }}>{cs.scenario}</p>
        </div>

        {/* Questions */}
        <h4 style={{ fontWeight:700, marginBottom:"1rem", color:"var(--text)" }}>Case Questions</h4>
        {sortedQuestions.map((q, i) => {
          const opts = [...q.case_study_options].sort((a,b) => a.order_index - b.order_index)
          const cq = {
            q: q.question_text,
            correct: q.correct_letter,
            exp: q.explanation,
            options: opts.map(o => ({ l: o.letter, t: o.option_text }))
          }
          return <CaseQuestion key={q.id} cq={cq} idx={i} lc={lc} />
        })}

        {/* Reflections */}
        {sortedReflections.length > 0 && (
          <div style={{ background:"#FFFBEB", border:"1.5px solid #FCD34D", borderRadius:12, padding:"1.25rem 1.5rem", marginTop:"1.5rem" }}>
            <h4 style={{ fontWeight:700, color:"#D97706", fontSize:"0.9rem", marginBottom:"0.75rem" }}>💡 Clinical Reflection Points</h4>
            <ul style={{ listStyle:"none" }}>
              {sortedReflections.map((r, i) => (
                <li key={i} style={{ fontSize:"0.88rem", lineHeight:1.7, paddingLeft:"1.5rem", position:"relative", color:"var(--text)", marginBottom:"0.35rem" }}>
                  <span style={{ position:"absolute", left:0 }}>💡</span>
                  {r.reflection_text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
function CaseQuestion({ cq, idx, lc }: { cq: any; idx: number; lc: any }) {
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <div
      style={{
        border: `1.5px solid ${
          selected ? (selected === cq.correct ? "#86efac" : "#fca5a5") : "var(--border)"
        }`,
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: "1.25rem",
      }}
    >
      <div
        style={{
          padding: "1rem 1.25rem",
          background: "var(--bg)",
          display: "flex",
          gap: "0.85rem",
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            background: "var(--primary)",
            color: "white",
            borderRadius: 7,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "0.8rem",
            flexShrink: 0,
          }}
        >
          {idx + 1}
        </div>
        <p
          style={{
            fontSize: "0.93rem",
            fontWeight: 600,
            lineHeight: 1.6,
            flex: 1,
          }}
        >
          {cq.q}
        </p>
      </div>
      <div
        style={{
          padding: "1rem 1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.55rem",
        }}
      >
        {cq.options.map((opt: any) => {
          const isRight = selected && opt.l === cq.correct
          const isWrong = selected === opt.l && opt.l !== cq.correct
          return (
            <div
              key={opt.l}
              onClick={() => !selected && setSelected(opt.l)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                padding: "0.7rem 1rem",
                border: `1.5px solid ${
                  isRight ? "#86efac" : isWrong ? "#fca5a5" : "var(--border)"
                }`,
                borderRadius: 9,
                cursor: selected ? "default" : "pointer",
                background: isRight
                  ? "var(--correct-bg)"
                  : isWrong
                  ? "var(--wrong-bg)"
                  : "white",
                fontSize: "0.88rem",
                lineHeight: 1.5,
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  flexShrink: 0,
                  background: isRight ? "var(--correct)" : isWrong ? "var(--wrong)" : "var(--border)",
                  color: isRight || isWrong ? "white" : "var(--text-light)",
                }}
              >
                {opt.l}
              </div>
              {opt.t}
            </div>
          )
        })}
      </div>
      {selected && (
        <div
          style={{
            margin: "0 1.25rem 1.25rem",
            padding: "1rem 1.25rem",
            background: "#ECFDF5",
            borderLeft: "4px solid #22C55E",
            borderRadius: "0 10px 10px 0",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              color: "#15803D",
              fontSize: "0.85rem",
              marginBottom: "0.5rem",
            }}
          >
            ✓ Explanation
          </div>
          <p style={{ fontSize: "0.88rem", color: "var(--text)", lineHeight: 1.7 }}>
            {cq.exp}
          </p>
        </div>
      )}
    </div>
  )
}
