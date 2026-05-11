"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

const LEVEL_QUIZ_IDS: Record<string, string> = {
  beginner:     "aaaaaaaa-0001-0000-0000-000000000001",
  intermediate: "aaaaaaaa-0002-0000-0000-000000000002",
  advanced:     "aaaaaaaa-0003-0000-0000-000000000003",
}

const LEVEL_INFO: Record<string, { label: string; color: string; bg: string; icon: string; levelId: string }> = {
  beginner:     { label: "Beginner",     color: "#2E7D9E", bg: "#E0F2F7", icon: "🌱", levelId: "10000000-0000-0000-0000-000000000001" },
  intermediate: { label: "Intermediate", color: "#D97706", bg: "#FEF3C7", icon: "📈", levelId: "10000000-0000-0000-0000-000000000002" },
  advanced:     { label: "Advanced",     color: "#7C3AED", bg: "#EDE9FE", icon: "🏆", levelId: "10000000-0000-0000-0000-000000000003" },
}

const DC: Record<string, any> = {
  easy:   { bg: "#DCFCE7", color: "#166534" },
  medium: { bg: "#FEF3C7", color: "#92400E" },
  hard:   { bg: "#FEE2E2", color: "#991B1B" },
}

type Option   = { id: string; option_text: string; is_correct: boolean; order_index: number }
type Question = { id: string; question_text: string; difficulty: string; explanation: string; order_index: number; answer_options: Option[] }

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function LevelExamPage() {
  const params    = useParams()
  const router    = useRouter()
  const level     = (params.level as string)?.toLowerCase()
  const quizId    = LEVEL_QUIZ_IDS[level]
  const info      = LEVEL_INFO[level]

  const [loading, setLoading]     = useState(true)
  const [userId, setUserId]       = useState<string | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers]     = useState<Record<string, string>>({})
  const [shown, setShown]         = useState<Record<string, boolean>>({})
  const [finished, setFinished]   = useState(false)
  const [saving, setSaving]       = useState(false)
  const [savedAttempt, setSavedAttempt] = useState<string | null>(null)
  const [startedAt] = useState<Date>(new Date())

  const supabase = createClient()

  useEffect(() => {
    if (!quizId) return
    loadExam()
  }, [quizId])

  const loadExam = async () => {
    setLoading(true)
    setAnswers({})
    setShown({})
    setFinished(false)
    setSavedAttempt(null)

    const { data: authData } = await supabase.auth.getUser()
    if (authData.user) setUserId(authData.user.id)

    const { data: qs } = await supabase
      .from("questions")
      .select("id, question_text, difficulty, explanation, order_index, answer_options(id, option_text, is_correct, order_index)")
      .eq("quiz_id", quizId)
      .order("order_index")

    if (qs) {
      const shuffled = (qs as Question[]).map(q => ({
        ...q,
        answer_options: shuffle(q.answer_options)
      }))
      setQuestions(shuffled)
    }
    setLoading(false)
  }

  const answer = (questionId: string, optionId: string) => {
    if (shown[questionId]) return
    setAnswers(a => ({ ...a, [questionId]: optionId }))
    setShown(s => ({ ...s, [questionId]: true }))
  }

  const handleSubmit = async () => {
    setFinished(true)
    if (!userId) return
    setSaving(true)

    const correct = questions.filter(q => {
      const selectedOpt = q.answer_options.find(o => o.id === answers[q.id])
      return selectedOpt?.is_correct
    }).length

    const total    = questions.length
    const score    = Math.round((correct / total) * 100)
    const passed   = score >= 75
    const timeTaken = Math.round((new Date().getTime() - startedAt.getTime()) / 1000)

    const { count: prevCount } = await supabase
      .from("quiz_attempts")
      .select("id", { count: "exact" })
      .eq("user_id", userId)
      .eq("quiz_id", quizId)

    const { data: attempt } = await supabase
      .from("quiz_attempts")
      .insert({
        user_id:      userId,
        quiz_id:      quizId,
        attempt_num:  (prevCount || 0) + 1,
        score,
        correct,
        total,
        passed,
        started_at:   startedAt.toISOString(),
        completed_at: new Date().toISOString(),
        time_taken:   timeTaken,
      })
      .select("id")
      .single()

    if (attempt) {
      setSavedAttempt(attempt.id)
      const answerRows = questions.map(q => ({
        attempt_id:      attempt.id,
        question_id:     q.id,
        selected_option: answers[q.id] || null,
        is_correct:      q.answer_options.find(o => o.id === answers[q.id])?.is_correct || false,
      }))
      await supabase.from("question_answers").insert(answerRows)

      // If passed, save certificate
      if (passed && info) {
        const certNum = `HC-${level.toUpperCase().slice(0,3)}-${Date.now().toString().slice(-6)}`
        await supabase.from("certificates").upsert({
          user_id:    userId,
          level_id:   info.levelId,
          cert_number: certNum,
          status:     "active",
          final_score: score,
          issued_at:  new Date().toISOString(),
        })
      }
    }
    setSaving(false)
  }

  if (!quizId || !info) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"var(--bg)" }}>
      <div style={{ textAlign:"center" }}>
        <h2>Exam not found</h2>
        <Link href="/dashboard/curriculum">← Back to Curriculum</Link>
      </div>
    </div>
  )

  if (loading) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"var(--bg)" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:"2rem", marginBottom:"1rem" }}>⏳</div>
        <p style={{ color:"var(--text-light)" }}>Loading your exam…</p>
      </div>
    </div>
  )

  const correctCount  = questions.filter(q => q.answer_options.find(o => o.id === answers[q.id])?.is_correct).length
  const pct           = finished ? Math.round((correctCount / questions.length) * 100) : 0
  const passed        = pct >= 75
  const answeredCount = Object.keys(shown).length
  const allAnswered   = answeredCount === questions.length && questions.length > 0

  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh" }}>

      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,var(--primary-dark),var(--primary))`, color:"white", padding:"3rem 2rem 2.5rem" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div style={{ fontSize:"0.82rem", opacity:0.7, marginBottom:"1rem" }}>
            <Link href="/dashboard" style={{ color:"white", textDecoration:"none" }}>Dashboard</Link>
            {" › "}
            <Link href="/dashboard/curriculum" style={{ color:"white", textDecoration:"none" }}>Curriculum</Link>
            {" › Level Exam"}
          </div>
          <div style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", background:info.color, borderRadius:20, padding:"0.3rem 1rem", fontSize:"0.82rem", fontWeight:700, marginBottom:"1rem" }}>
            {info.icon} {info.label} Level Exam
          </div>
          <h1 style={{ fontFamily:'"Playfair Display",serif', fontSize:"2.2rem", marginBottom:"0.5rem" }}>
            {info.label} <span style={{ color:"var(--accent-green)" }}>Final Exam</span>
          </h1>
          <p style={{ opacity:0.8, marginBottom:"1.5rem" }}>
            Complete all {questions.length} questions · Pass mark: <strong>75%</strong> · Earn your certificate
          </p>
          <div style={{ display:"flex", gap:"2rem", flexWrap:"wrap" }}>
            {[
              { num: questions.length, label:"Questions" },
              { num: "75%",            label:"Pass Mark"  },
              { num: answeredCount,    label:"Answered"   },
            ].map(({ num, label }) => (
              <div key={label}>
                <span style={{ fontFamily:'"Playfair Display",serif', fontSize:"1.8rem", fontWeight:700, color:"var(--accent-green)", display:"block" }}>{num}</span>
                <span style={{ fontSize:"0.78rem", opacity:0.7 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background:"white", borderBottom:"1px solid var(--border)", padding:"1rem 2rem", position:"sticky", top:78, zIndex:900 }}>
        <div style={{ maxWidth:1000, margin:"0 auto", display:"flex", alignItems:"center", gap:"1.5rem" }}>
          <span style={{ fontFamily:'"Playfair Display",serif', fontSize:"1.3rem", fontWeight:700, color:"var(--primary)" }}>
            {answeredCount}/{questions.length}
          </span>
          <div style={{ flex:1, height:8, background:"var(--border)", borderRadius:4 }}>
            <div style={{ width:`${questions.length ? (answeredCount/questions.length)*100 : 0}%`, height:"100%", background:info.color, borderRadius:4, transition:"width 0.4s" }} />
          </div>
          {allAnswered && !finished && (
            <button onClick={handleSubmit} disabled={saving} style={{ background:info.color, color:"white", padding:"0.65rem 1.5rem", borderRadius:10, border:"none", fontWeight:700, cursor:saving?"wait":"pointer", fontFamily:"inherit" }}>
              {saving ? "Saving…" : "Submit Exam →"}
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth:1000, margin:"0 auto", padding:"2.5rem 2rem" }}>

        {/* Result banner */}
        {finished && (
          <div style={{ background:passed?"linear-gradient(135deg,#DCFCE7,#BBF7D0)":"linear-gradient(135deg,#FEF2F2,#FEE2E2)", border:`2px solid ${passed?"#22C55E":"#EF4444"}`, borderRadius:16, padding:"1.5rem 2rem", marginBottom:"2rem", display:"flex", alignItems:"center", gap:"1.25rem", flexWrap:"wrap" }}>
            <span style={{ fontSize:"2.5rem" }}>{passed ? "🎉" : "📚"}</span>
            <div style={{ flex:1 }}>
              <h3 style={{ fontWeight:700, color:passed?"#15803D":"#DC2626", marginBottom:"0.3rem" }}>
                {passed ? `Congratulations! You passed with ${pct}%!` : `Score: ${pct}% — You need 75% to pass`}
              </h3>
              <p style={{ fontSize:"0.88rem", color:"var(--text-light)" }}>
                {correctCount}/{questions.length} correct
                {passed && savedAttempt && <span style={{ marginLeft:"0.75rem", color:"#15803D" }}>✅ Certificate earned! Check My Certificates</span>}
              </p>
            </div>
            <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap" }}>
              {passed && (
                <Link href="/dashboard/certificates" style={{ background:info.color, color:"white", padding:"0.65rem 1.5rem", borderRadius:10, fontWeight:700, textDecoration:"none" }}>
                  📜 My Certificates
                </Link>
              )}
              <button onClick={loadExam} style={{ background:"white", color:info.color, border:`2px solid ${info.color}`, padding:"0.65rem 1.5rem", borderRadius:10, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                🔄 Retry
              </button>
            </div>
          </div>
        )}

        {/* Questions */}
        {questions.map((q, idx) => {
          const selectedId = answers[q.id]
          const isAns      = shown[q.id]
          const selectedOpt = q.answer_options.find(o => o.id === selectedId)
          const isOk       = selectedOpt?.is_correct || false
          const dc         = DC[q.difficulty] || DC.medium

          return (
            <div key={q.id} style={{ background:"white", borderRadius:16, border:`1.5px solid ${isAns?(isOk?"#86efac":"#fca5a5"):"var(--border)"}`, boxShadow:"var(--shadow)", padding:"1.75rem", marginBottom:"1.5rem" }}>
              <div style={{ display:"flex", gap:"0.6rem", marginBottom:"1rem", flexWrap:"wrap" }}>
                <span style={{ background:dc.bg, color:dc.color, padding:"0.25rem 0.8rem", borderRadius:10, fontSize:"0.75rem", fontWeight:600, textTransform:"capitalize" }}>{q.difficulty}</span>
              </div>
              <p style={{ fontSize:"1rem", fontWeight:600, lineHeight:1.6, marginBottom:"1.25rem" }}>
                <span style={{ background:info.color, color:"white", borderRadius:6, padding:"0.15rem 0.6rem", fontSize:"0.8rem", fontWeight:700, marginRight:"0.5rem" }}>Q{idx+1}</span>
                {q.question_text}
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem", marginBottom:"1rem" }}>
                {q.answer_options.map((opt, optIdx) => {
                  const isRight = isAns && opt.is_correct
                  const isWrong = isAns && selectedId === opt.id && !opt.is_correct
                  const letters = ["A","B","C","D"]
                  return (
                    <div key={opt.id} onClick={() => answer(q.id, opt.id)} style={{ display:"flex", alignItems:"center", gap:"0.85rem", padding:"0.85rem 1rem", border:`2px solid ${isRight?"#86efac":isWrong?"#fca5a5":"var(--border)"}`, borderRadius:10, cursor:isAns?"default":"pointer", background:isRight?"var(--correct-bg)":isWrong?"var(--wrong-bg)":"var(--bg)", fontSize:"0.92rem" }}>
                      <div style={{ width:28, height:28, minWidth:28, borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:"0.78rem", background:isRight?"var(--correct)":isWrong?"var(--wrong)":"var(--border)", color:(isRight||isWrong)?"white":"var(--text-light)" }}>{letters[optIdx]||optIdx+1}</div>
                      <span style={{ flex:1 }}>{opt.option_text}</span>
                      {isRight && <span>✅</span>}
                      {isWrong && <span>❌</span>}
                    </div>
                  )
                })}
              </div>
              {isAns && (
                <div style={{ background:isOk?"var(--correct-bg)":"var(--wrong-bg)", borderLeft:`4px solid ${isOk?"var(--correct)":"var(--wrong)"}`, borderRadius:"0 12px 12px 0", padding:"1rem 1.25rem" }}>
                  <div style={{ fontWeight:700, color:isOk?"var(--correct)":"var(--wrong)", fontSize:"0.85rem", marginBottom:"0.5rem" }}>
                    {isOk ? "✅ Correct!" : "❌ Incorrect"} — Explanation
                  </div>
                  <p style={{ fontSize:"0.9rem", lineHeight:1.7, color:"var(--text)" }}>{q.explanation}</p>
                </div>
              )}
            </div>
          )
        })}

        {/* Footer */}
        <div style={{ display:"flex", gap:"1rem", marginTop:"1rem", flexWrap:"wrap" }}>
          {allAnswered && !finished && (
            <button onClick={handleSubmit} disabled={saving} style={{ background:info.color, color:"white", padding:"0.8rem 2rem", borderRadius:10, border:"none", fontWeight:700, cursor:saving?"wait":"pointer", fontFamily:"inherit" }}>
              {saving ? "Saving…" : "Submit and See Results →"}
            </button>
          )}
          <Link href="/dashboard/curriculum" style={{ border:`2px solid ${info.color}`, color:info.color, padding:"0.8rem 2rem", borderRadius:10, fontWeight:600, textDecoration:"none", display:"inline-block" }}>
            ← Back to Curriculum
          </Link>
        </div>
      </div>
    </div>
  )
}
