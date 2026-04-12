"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

const PRACTICE_QUIZ_ID = "fbc20026-08eb-4544-84d0-d017844f37e4"

const PLAN_LEVELS: Record<string, string[]> = {
  beginner:     ["beginner"],
  standard:     ["beginner", "intermediate"],
  advanced:     ["beginner", "intermediate", "advanced"],
}

const DC: Record<string, any> = {
  easy:   { bg: "#DCFCE7", color: "#166534" },
  medium: { bg: "#FEF3C7", color: "#92400E" },
  hard:   { bg: "#FEE2E2", color: "#991B1B" },
}

type Option = { id: string; option_text: string; is_correct: boolean; order_index: number }
type Question = { id: string; question_text: string; difficulty: string; explanation: string; order_index: number; answer_options: Option[] }

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function PracticeQuizPage() {
  const [plan, setPlan]           = useState<string>("beginner")
  const [userId, setUserId]       = useState<string | null>(null)
  const [loading, setLoading]     = useState(true)
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers]     = useState<Record<string, string>>({})   // questionId → optionId
  const [shown, setShown]         = useState<Record<string, boolean>>({})
  const [finished, setFinished]   = useState(false)
  const [saving, setSaving]       = useState(false)
  const [savedAttempt, setSavedAttempt] = useState<string | null>(null)
  const [startedAt] = useState<Date>(new Date())

  const supabase = createClient()

  // ── Load user + questions ──────────────────────────────────
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    setAnswers({})
    setShown({})
    setFinished(false)
    setSavedAttempt(null)

    // Get user + plan
    const { data: authData } = await supabase.auth.getUser()
    let userPlan = "beginner"
    let uid: string | null = null
    if (authData.user) {
      uid = authData.user.id
      setUserId(uid)
      const { data: profile } = await supabase
        .from("profiles").select("plan").eq("id", uid).single()
      if ((profile as any)?.plan) userPlan = (profile as any).plan
      else if (authData.user.user_metadata?.plan) userPlan = authData.user.user_metadata.plan
    }
    setPlan(userPlan)

    // Fetch all questions + options for this quiz
    const { data: allQ } = await supabase
      .from("questions")
      .select("id, question_text, difficulty, explanation, order_index, answer_options(id, option_text, is_correct, order_index)")
      .eq("quiz_id", PRACTICE_QUIZ_ID)
      .order("order_index")

    if (!allQ) { setLoading(false); return }

    // Determine how many questions based on plan
    // beginner=10, standard=20, advanced=30
    const allowed = PLAN_LEVELS[userPlan] || ["beginner"]
    const count = allowed.length * 10

    // Shuffle and pick
    const picked = shuffle(allQ as Question[]).slice(0, count)
    // Shuffle options within each question
    const withShuffledOptions = picked.map(q => ({
      ...q,
      answer_options: shuffle(q.answer_options)
    }))
    setQuestions(withShuffledOptions)
    setLoading(false)
  }

  // ── Answer a question ──────────────────────────────────────
  const answer = (questionId: string, optionId: string) => {
    if (shown[questionId]) return
    setAnswers(a => ({ ...a, [questionId]: optionId }))
    setShown(s => ({ ...s, [questionId]: true }))
  }

  // ── Submit + save to DB ────────────────────────────────────
  const handleSubmit = async () => {
    setFinished(true)
    if (!userId) return
    setSaving(true)

    const correct = questions.filter(q => {
      const selectedId = answers[q.id]
      const selectedOpt = q.answer_options.find(o => o.id === selectedId)
      return selectedOpt?.is_correct
    }).length

    const total = questions.length
    const score = Math.round((correct / total) * 100)
    const passed = score >= 70
    const timeTaken = Math.round((new Date().getTime() - startedAt.getTime()) / 1000)

    // Get attempt number
    const { count: prevCount } = await supabase
      .from("quiz_attempts")
      .select("id", { count: "exact" })
      .eq("user_id", userId)
      .eq("quiz_id", PRACTICE_QUIZ_ID)

    const attemptNum = (prevCount || 0) + 1

    // Save attempt
    const { data: attempt } = await supabase
      .from("quiz_attempts")
      .insert({
        user_id: userId,
        quiz_id: PRACTICE_QUIZ_ID,
        attempt_num: attemptNum,
        score,
        correct,
        total,
        passed,
        started_at: startedAt.toISOString(),
        completed_at: new Date().toISOString(),
        time_taken: timeTaken,
      })
      .select("id")
      .single()

    if (attempt) {
      setSavedAttempt(attempt.id)
      // Save individual answers
      const answerRows = questions.map(q => ({
        attempt_id: attempt.id,
        question_id: q.id,
        selected_option: answers[q.id] || null,
        is_correct: q.answer_options.find(o => o.id === answers[q.id])?.is_correct || false,
      }))
      await supabase.from("question_answers").insert(answerRows)
    }
    setSaving(false)
  }

  // ── Computed stats ─────────────────────────────────────────
  const correctCount = questions.filter(q => {
    const selectedId = answers[q.id]
    return q.answer_options.find(o => o.id === selectedId)?.is_correct
  }).length

  const pct    = finished ? Math.round((correctCount / questions.length) * 100) : 0
  const passed = pct >= 70
  const answeredCount = Object.keys(shown).length
  const allAnswered = answeredCount === questions.length && questions.length > 0
  const allowedLevels = PLAN_LEVELS[plan] || ["beginner"]

  // ── Loading ────────────────────────────────────────────────
  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
      <div style={{ textAlign: "center", color: "var(--text-light)" }}>
        <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⏳</div>
        <p>Loading your practice quiz…</p>
      </div>
    </div>
  )

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,var(--primary-dark),var(--primary))", color: "white", padding: "3rem 2rem 2.5rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ fontSize: "0.82rem", opacity: 0.7, marginBottom: "1rem" }}>
            <Link href="/dashboard" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link>
            {" › "}
            <Link href="/dashboard/curriculum" style={{ color: "white", textDecoration: "none" }}>Curriculum</Link>
            {" › Practice Quiz"}
          </div>
          <h1 style={{ fontFamily: '"Playfair Display",serif', fontSize: "2.2rem", marginBottom: "0.5rem" }}>
            Practice <span style={{ color: "var(--accent-green)" }}>Quiz</span>
          </h1>
          <p style={{ opacity: 0.8, marginBottom: "1.5rem" }}>
            Randomized exam-prep questions · {allowedLevels.join(", ")} level{allowedLevels.length > 1 ? "s" : ""}
          </p>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {[
              { num: questions.length, label: "Questions" },
              { num: "70%",            label: "Pass Mark" },
              { num: answeredCount,    label: "Answered" },
            ].map(({ num, label }) => (
              <div key={label}>
                <span style={{ fontFamily: '"Playfair Display",serif', fontSize: "1.8rem", fontWeight: 700, color: "var(--accent-green)", display: "block" }}>{num}</span>
                <span style={{ fontSize: "0.78rem", opacity: 0.7 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky progress bar */}
      <div style={{ background: "white", borderBottom: "1px solid var(--border)", padding: "1rem 2rem", position: "sticky", top: 78, zIndex: 900 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <span style={{ fontFamily: '"Playfair Display",serif', fontSize: "1.3rem", fontWeight: 700, color: "var(--primary)" }}>
            {answeredCount}/{questions.length}
          </span>
          <div style={{ flex: 1, height: 8, background: "var(--border)", borderRadius: 4 }}>
            <div style={{ width: `${questions.length ? (answeredCount / questions.length) * 100 : 0}%`, height: "100%", background: "var(--primary)", borderRadius: 4, transition: "width 0.4s" }} />
          </div>
          {allAnswered && !finished && (
            <button onClick={handleSubmit} disabled={saving} style={{ background: "var(--primary)", color: "white", padding: "0.65rem 1.5rem", borderRadius: 10, border: "none", fontWeight: 700, cursor: saving ? "wait" : "pointer", fontFamily: "inherit" }}>
              {saving ? "Saving…" : "Submit Quiz →"}
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "2.5rem 2rem" }}>

        {/* Result banner */}
        {finished && (
          <div style={{ background: passed ? "linear-gradient(135deg,#DCFCE7,#BBF7D0)" : "linear-gradient(135deg,#FEF2F2,#FEE2E2)", border: `2px solid ${passed ? "#22C55E" : "#EF4444"}`, borderRadius: 16, padding: "1.5rem 2rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "2.5rem" }}>{passed ? "🎉" : "📚"}</span>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontWeight: 700, color: passed ? "#15803D" : "#DC2626", marginBottom: "0.3rem" }}>
                {passed ? `You passed with ${pct}%!` : `Score: ${pct}% — Keep practising!`}
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-light)" }}>
                {correctCount}/{questions.length} correct · {passed ? "Pass ✓" : "70% required"}
                {savedAttempt && <span style={{ marginLeft: "0.75rem", color: "#15803D" }}>✅ Saved to your history</span>}
              </p>
            </div>
            <button onClick={loadData} style={{ background: "var(--primary)", color: "white", padding: "0.65rem 1.5rem", borderRadius: 10, border: "none", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
              🔄 New Quiz
            </button>
          </div>
        )}

        {/* Questions */}
        {questions.map((q, idx) => {
          const selectedId = answers[q.id]
          const isAns = shown[q.id]
          const selectedOpt = q.answer_options.find(o => o.id === selectedId)
          const isOk = selectedOpt?.is_correct || false
          const dc = DC[q.difficulty] || DC.medium

          return (
            <div key={q.id} style={{ background: "white", borderRadius: 16, border: `1.5px solid ${isAns ? (isOk ? "#86efac" : "#fca5a5") : "var(--border)"}`, boxShadow: "var(--shadow)", padding: "1.75rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                <span style={{ background: dc.bg, color: dc.color, padding: "0.25rem 0.8rem", borderRadius: 10, fontSize: "0.75rem", fontWeight: 600, textTransform: "capitalize" }}>{q.difficulty}</span>
              </div>
              <p style={{ fontSize: "1rem", fontWeight: 600, lineHeight: 1.6, marginBottom: "1.25rem" }}>
                <span style={{ background: "var(--primary)", color: "white", borderRadius: 6, padding: "0.15rem 0.6rem", fontSize: "0.8rem", fontWeight: 700, marginRight: "0.5rem" }}>Q{idx + 1}</span>
                {q.question_text}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1rem" }}>
                {q.answer_options.map((opt, optIdx) => {
                  const isRight = isAns && opt.is_correct
                  const isWrong = isAns && selectedId === opt.id && !opt.is_correct
                  const letters = ["A", "B", "C", "D"]
                  return (
                    <div key={opt.id} onClick={() => answer(q.id, opt.id)} style={{ display: "flex", alignItems: "center", gap: "0.85rem", padding: "0.85rem 1rem", border: `2px solid ${isRight ? "#86efac" : isWrong ? "#fca5a5" : "var(--border)"}`, borderRadius: 10, cursor: isAns ? "default" : "pointer", background: isRight ? "var(--correct-bg)" : isWrong ? "var(--wrong-bg)" : "var(--bg)", fontSize: "0.92rem" }}>
                      <div style={{ width: 28, height: 28, minWidth: 28, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.78rem", background: isRight ? "var(--correct)" : isWrong ? "var(--wrong)" : "var(--border)", color: (isRight || isWrong) ? "white" : "var(--text-light)" }}>{letters[optIdx] || optIdx + 1}</div>
                      <span style={{ flex: 1 }}>{opt.option_text}</span>
                      {isRight && <span>✅</span>}
                      {isWrong && <span>❌</span>}
                    </div>
                  )
                })}
              </div>
              {isAns && (
                <div style={{ background: isOk ? "var(--correct-bg)" : "var(--wrong-bg)", borderLeft: `4px solid ${isOk ? "var(--correct)" : "var(--wrong)"}`, borderRadius: "0 12px 12px 0", padding: "1rem 1.25rem" }}>
                  <div style={{ fontWeight: 700, color: isOk ? "var(--correct)" : "var(--wrong)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                    {isOk ? "✅ Correct!" : "❌ Incorrect"} — Explanation
                  </div>
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--text)" }}>{q.explanation}</p>
                </div>
              )}
            </div>
          )
        })}

        {/* Footer */}
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
          {allAnswered && !finished && (
            <button onClick={handleSubmit} disabled={saving} style={{ background: "var(--primary)", color: "white", padding: "0.8rem 2rem", borderRadius: 10, border: "none", fontWeight: 700, cursor: saving ? "wait" : "pointer", fontFamily: "inherit" }}>
              {saving ? "Saving…" : "Submit and See Results →"}
            </button>
          )}
          <Link href="/dashboard/curriculum" style={{ border: "2px solid var(--primary)", color: "var(--primary)", padding: "0.8rem 2rem", borderRadius: 10, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
            ← Back to Curriculum
          </Link>
        </div>
      </div>
    </div>
  )
}
