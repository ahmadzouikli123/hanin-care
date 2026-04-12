"use client"
import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { UNITS } from "@/lib/curriculum-data"
import { UNITS_4_27 } from "@/lib/units-4-27"

const ALL_UNITS = [...UNITS, ...UNITS_4_27]

export default function UnitPage() {
  const params   = useParams()
  const unitId   = Number(params.id)
  const unit     = ALL_UNITS.find(u => u.id === unitId)
  const [userId, setUserId] = useState<string|null>(null)
  const [unitMarked, setUnitMarked] = useState(false)
  const [tab, setTab] = useState<"theory"|"quiz"|"case">("theory")
  const [answers, setAnswers]   = useState<Record<number,string>>({})
  const [shown, setShown]       = useState<Record<number,boolean>>({})
  const [finished, setFinished] = useState(false)

  if (!unit) return (
    <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
      <h2>Unit not found</h2>
      <Link href="/dashboard/curriculum">← Back to Curriculum</Link>
    </div>
  )

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      if (data.user) setUserId(data.user.id)
    })
  }, [])

  const markUnitComplete = async () => {
    if (!userId || unitMarked) return
    const supabase = createClient()
    const { data: unitRow } = await supabase.from("units").select("id").eq("unit_number", unitId).single()
    if (!unitRow) return
    await supabase.from("unit_progress").upsert({ user_id: userId, unit_id: unitRow.id, is_completed: true, completed_at: new Date().toISOString(), completed_at: new Date().toISOString() }, { onConflict: "user_id,unit_id" })
    setUnitMarked(true)
  }

  const lc = { beginner:{color:"var(--beg)",bg:"var(--beg-bg)",border:"#A8D9E8"}, intermediate:{color:"var(--int)",bg:"var(--int-bg)",border:"#FCD34D"}, advanced:{color:"var(--adv)",bg:"var(--adv-bg)",border:"#C4B5FD"} }[unit.level]
  const DC: Record<string,any> = { easy:{bg:"#DCFCE7",color:"#166534"}, medium:{bg:"#FEF3C7",color:"#92400E"}, hard:{bg:"#FEE2E2",color:"#991B1B"} }

  const answerQ = (qIdx: number, letter: string) => {
    if (shown[qIdx]) return
    setAnswers(a => ({ ...a, [qIdx]: letter }))
    setShown(s => ({ ...s, [qIdx]: true }))
  }

  const score  = unit.quiz.filter((q,i) => answers[i] === q.correct).length
  const pct    = finished ? Math.round((score/unit.quiz.length)*100) : 0
  const passed = pct >= 70

  const tabBtn = (t: "theory"|"quiz"|"case", label: string) => (
    <button onClick={() => setTab(t)} style={{ padding: "0.9rem 1.5rem", fontWeight: 600, fontSize: "0.88rem", color: tab===t ? "var(--primary)" : "var(--text-light)", border: "none", background: "none", cursor: "pointer", borderBottom: `3px solid ${tab===t ? "var(--primary)" : "transparent"}`, marginBottom: -2, fontFamily: "inherit" }}>
      {label}
    </button>
  )

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg,var(--primary-dark),var(--primary))`, color: "white", padding: "3rem 2rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontSize: "0.82rem", opacity: 0.7, marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
            <Link href="/dashboard" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link> ›
            <Link href="/dashboard/curriculum" style={{ color: "white", textDecoration: "none" }}>Curriculum</Link> ›
            <span>Unit {unit.id}</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: lc.color, color: "white", borderRadius: 20, padding: "0.3rem 1rem", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: "1rem" }}>
            {unit.level.charAt(0).toUpperCase()+unit.level.slice(1)} · Unit {unit.id}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", marginBottom: "0.75rem" }}>{unit.title}</h1>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", opacity: 0.85, fontSize: "0.88rem" }}>
            <span>⏱️ {unit.duration}</span>
            <span>📖 {unit.lectures} Lectures</span>
            <span>❓ {unit.quiz.length} Quiz Questions</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "white", borderBottom: "2px solid var(--border)", padding: "0 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex" }}>
          {tabBtn("theory","📖 Theory")}
          {tabBtn("quiz",`🧠 Quiz (${unit.quiz.length})`)}
          {unit.caseStudy && tabBtn("case","📋 Case Study")}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2.5rem 2rem" }}>

        {/* ── THEORY TAB ── */}
        {tab === "theory" && (
          <div>
            {unit.theory.map((block, i) => (
              <div key={i} style={{ marginBottom: "2rem" }}>
                {block.type === "heading" && (
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ width: 4, height: 18, background: lc.color, borderRadius: 2, display: "inline-block" }} />
                    {block.content}
                  </h3>
                )}
                {block.type === "paragraph" && (
                  <p style={{ fontSize: "0.93rem", lineHeight: 1.8, color: "var(--text-light)", background: "white", borderRadius: 12, padding: "1.25rem 1.5rem", border: "1px solid var(--border)" }}>
                    {block.content}
                  </p>
                )}
                {block.type === "list" && (
                  <div style={{ background: "white", borderRadius: 12, padding: "1.25rem 1.5rem", border: "1px solid var(--border)" }}>
                    <ul style={{ marginLeft: "1.25rem" }}>
                      {(block.items||[]).map((item: string, j: number) => (
                        <li key={j} style={{ fontSize: "0.93rem", lineHeight: 1.7, color: "var(--text-light)", marginBottom: "0.4rem" }} dangerouslySetInnerHTML={{ __html: item }} />
                      ))}
                    </ul>
                  </div>
                )}
                {block.type === "infobox" && (
                  <div style={{ borderRadius: 12, padding: "1.25rem 1.5rem", borderLeft: "4px solid", background: block.variant==="blue"?"#EFF6FF":block.variant==="green"?"#F0FDF4":block.variant==="red"?"#FEF2F2":block.variant==="amber"?"#FFFBEB":"#F5F3FF", borderColor: block.variant==="blue"?"#3B82F6":block.variant==="green"?"#22C55E":block.variant==="red"?"#EF4444":block.variant==="amber"?"#F59E0B":"#8B5CF6" }}>
                    <div style={{ fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: "0.5rem", color: block.variant==="blue"?"#1D4ED8":block.variant==="green"?"#15803D":block.variant==="red"?"#DC2626":block.variant==="amber"?"#D97706":"#7C3AED" }}>
                      {block.title}
                    </div>
                    <div style={{ fontSize: "0.92rem", lineHeight: 1.7, color: "var(--text)" }}>
                      {block.content}
                      {block.items && <ul style={{ marginLeft: "1.2rem", marginTop: "0.5rem" }}>{block.items.map((it:string,j:number)=><li key={j} style={{ marginBottom: "0.3rem" }} dangerouslySetInnerHTML={{__html:it}}/>)}</ul>}
                    </div>
                  </div>
                )}
                {block.type === "table" && (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", borderRadius: 12, overflow: "hidden", fontSize: "0.88rem" }}>
                      <thead style={{ background: "var(--primary)", color: "white" }}>
                        <tr>{block.headers?.map((h:string,j:number)=><th key={j} style={{ padding: "0.85rem 1rem", textAlign: "left", fontWeight: 600 }}>{h}</th>)}</tr>
                      </thead>
                      <tbody>
                        {block.rows?.map((row:string[],j:number)=>(
                          <tr key={j} style={{ background: j%2===0?"white":"var(--bg)" }}>
                            {row.map((cell,k)=><td key={k} style={{ padding: "0.8rem 1rem", borderBottom: "1px solid var(--border)" }} dangerouslySetInnerHTML={{__html:cell}}/>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {block.type === "badges" && (
                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
                    {(block.items||[]).map((b:string,j:number)=>(
                      <span key={j} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "white", border: "1px solid var(--border)", borderRadius: 8, padding: "0.4rem 0.85rem", fontSize: "0.78rem", fontWeight: 600, color: "var(--text)" }}>
                        ✅ {b}
                      </span>
                    ))}
                  </div>
                )}
                {block.type === "practical" && (
                  <div style={{ background: "#F8FAFF", borderRadius: 16, padding: "1.75rem", border: "1px solid #E0E8FF", marginTop: "2rem" }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--primary)", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      🤝 Practical Skills
                    </h4>
                    {(block.steps||[]).map((step:any,j:number)=>(
                      <div key={j} style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem", background: "white", borderRadius: 12, padding: "1.25rem", border: "1px solid var(--border)" }}>
                        <div style={{ width: 36, height: 36, minWidth: 36, borderRadius: "50%", background: lc.color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.95rem" }}>{j+1}</div>
                        <div style={{ flex: 1 }}>
                          <h5 style={{ fontWeight: 700, marginBottom: "0.4rem", fontSize: "0.95rem" }}>{step.title}</h5>
                          <p style={{ fontSize: "0.88rem", color: "var(--text-light)", lineHeight: 1.7, marginBottom: "0.5rem" }}>{step.desc}</p>
                          <span style={{ background: step.tag==="Must Pass"?"#DCFCE7":step.tag==="Competency Check"?"#FEF3C7":"#E0F2F7", color: step.tag==="Must Pass"?"#166534":step.tag==="Competency Check"?"#92400E":"var(--beg)", padding: "0.2rem 0.7rem", borderRadius: 6, fontSize: "0.75rem", fontWeight: 700 }}>{step.tag}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
              <button onClick={() => setTab("quiz")} style={{ background: lc.color, color: "white", padding: "0.85rem 2rem", borderRadius: 10, border: "none", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: "0.95rem" }}>
                Take Quiz →
              </button>
              <Link href="/dashboard/curriculum" style={{ background: "transparent", border: `2px solid ${lc.color}`, color: lc.color, padding: "0.85rem 2rem", borderRadius: 10, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                ← Back
              </Link>
            </div>
          </div>
        )}

        {/* ── QUIZ TAB ── */}
        {tab === "quiz" && (
          <div>
            {finished && (
              <div style={{ background: passed?"linear-gradient(135deg,#DCFCE7,#BBF7D0)":"linear-gradient(135deg,#FEF2F2,#FEE2E2)", border: `2px solid ${passed?"#22C55E":"#EF4444"}`, borderRadius: 16, padding: "1.5rem 2rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1.25rem" }}>
                <span style={{ fontSize: "2.5rem" }}>{passed?"🎉":"📚"}</span>
                <div>
                  <h3 style={{ fontWeight: 700, color: passed?"#15803D":"#DC2626", marginBottom: "0.3rem" }}>{passed?`Passed with ${pct}%!`:`Score: ${pct}% — Review and retry`}</h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-light)" }}>{score}/{unit.quiz.length} correct · 70% to pass</p>
                </div>
              </div>
            )}
            {unit.quiz.map((q,idx) => {
              const ua=answers[idx]; const isAns=shown[idx]; const isOk=ua===q.correct
              const dc=DC[q.diff]||DC.medium
              return (
                <div key={idx} style={{ background: "white", borderRadius: 16, border: `1.5px solid ${isAns?(isOk?"#86efac":"#fca5a5"):"var(--border)"}`, boxShadow: "var(--shadow)", padding: "1.75rem", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                    <span style={{ background: lc.bg, color: lc.color, padding: "0.25rem 0.8rem", borderRadius: 10, fontSize: "0.75rem", fontWeight: 600 }}>Unit {unit.id}</span>
                    <span style={{ background: dc.bg, color: dc.color, padding: "0.25rem 0.8rem", borderRadius: 10, fontSize: "0.75rem", fontWeight: 600, textTransform: "capitalize" }}>{q.diff}</span>
                  </div>
                  <p style={{ fontSize: "1rem", fontWeight: 600, lineHeight: 1.6, marginBottom: "1.25rem" }}>
                    <span style={{ background: "var(--primary)", color: "white", borderRadius: 6, padding: "0.15rem 0.6rem", fontSize: "0.8rem", fontWeight: 700, marginRight: "0.5rem" }}>Q{idx+1}</span>
                    {q.text}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1rem" }}>
                    {q.options.map(opt => {
                      const isRight=isAns&&opt.l===q.correct; const isWrong=isAns&&ua===opt.l&&!isOk
                      return (
                        <div key={opt.l} onClick={() => answerQ(idx, opt.l)} style={{ display: "flex", alignItems: "center", gap: "0.85rem", padding: "0.85rem 1rem", border: `2px solid ${isRight?"#86efac":isWrong?"#fca5a5":"var(--border)"}`, borderRadius: 10, cursor: isAns?"default":"pointer", background: isRight?"var(--correct-bg)":isWrong?"var(--wrong-bg)":"var(--bg)", fontSize: "0.92rem" }}>
                          <div style={{ width: 28, height: 28, minWidth: 28, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.78rem", background: isRight?"var(--correct)":isWrong?"var(--wrong)":"var(--border)", color: (isRight||isWrong)?"white":"var(--text-light)" }}>{opt.l}</div>
                          <span style={{ flex: 1 }}>{opt.t}</span>
                          {isRight&&<span>✅</span>}{isWrong&&<span>❌</span>}
                        </div>
                      )
                    })}
                  </div>
                  {isAns && (
                    <div style={{ background: isOk?"var(--correct-bg)":"var(--wrong-bg)", borderLeft: `4px solid ${isOk?"var(--correct)":"var(--wrong)"}`, borderRadius: "0 12px 12px 0", padding: "1rem 1.25rem" }}>
                      <div style={{ fontWeight: 700, color: isOk?"var(--correct)":"var(--wrong)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>{isOk?"✅ Correct!":"❌ Incorrect"} — Explanation</div>
                      <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--text)" }}>{q.exp}</p>
                      {q.ref && <p style={{ fontSize: "0.78rem", color: "var(--text-light)", marginTop: "0.5rem", fontStyle: "italic" }}>📚 {q.ref}</p>}
                    </div>
                  )}
                </div>
              )
            })}
            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
              {Object.keys(shown).length===unit.quiz.length && !finished && (
                <button onClick={() => setFinished(true)} style={{ background: "var(--primary)", color: "white", padding: "0.8rem 2rem", borderRadius: 10, border: "none", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Submit & See Results →</button>
              )}
              <button onClick={() => { setAnswers({}); setShown({}); setFinished(false) }} style={{ background: "transparent", border: "2px solid var(--border)", color: "var(--text-light)", padding: "0.8rem 1.5rem", borderRadius: 10, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>🔄 Reset</button>
              <Link href="/dashboard/curriculum" style={{ border: "2px solid var(--primary)", color: "var(--primary)", padding: "0.8rem 2rem", borderRadius: 10, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>← Curriculum</Link>
            </div>
          </div>
        )}

        {/* ── CASE STUDY TAB ── */}
        {tab === "case" && unit.caseStudy && (
          <div>
            <div style={{ background: "white", borderRadius: 18, border: "1px solid var(--border)", boxShadow: "var(--shadow)", overflow: "hidden" }}>
              <div style={{ background: `linear-gradient(135deg,var(--primary-dark),var(--primary))`, color: "white", padding: "1.5rem 2rem", display: "flex", alignItems: "center", gap: "1.25rem" }}>
                <div style={{ fontSize: "2.5rem" }}>{unit.caseStudy.icon}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "0.2rem" }}>{unit.caseStudy.title}</h3>
                  <p style={{ opacity: 0.8, fontSize: "0.85rem" }}>{unit.caseStudy.subtitle}</p>
                </div>
                <span style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", padding: "0.35rem 0.9rem", borderRadius: 20, fontSize: "0.78rem", fontWeight: 700 }}>
                  {unit.level.charAt(0).toUpperCase()+unit.level.slice(1)} · Unit {unit.id}
                </span>
              </div>
              <div style={{ padding: "2rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: "0.85rem", background: "var(--bg)", borderRadius: 12, padding: "1.25rem", marginBottom: "1.5rem" }}>
                  {unit.caseStudy.profile.map((p:any,i:number) => (
                    <div key={i}>
                      <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-light)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: "0.2rem" }}>{p.label}</div>
                      <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "var(--text)" }}>{p.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#EFF6FF", borderLeft: "4px solid var(--primary)", borderRadius: "0 12px 12px 0", padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--primary)", marginBottom: "0.75rem" }}>📋 Scenario</h4>
                  <p style={{ fontSize: "0.92rem", lineHeight: 1.8, color: "var(--text)" }}>{unit.caseStudy.scenario}</p>
                </div>
                <h4 style={{ fontWeight: 700, marginBottom: "1rem", color: "var(--text)" }}>Case Questions</h4>
                {unit.caseStudy.questions.map((cq:any,i:number) => (
                  <CaseQuestion key={i} cq={cq} idx={i} lc={lc} />
                ))}
                <div style={{ background: "#FFFBEB", border: "1.5px solid #FCD34D", borderRadius: 12, padding: "1.25rem 1.5rem", marginTop: "1.5rem" }}>
                  <h4 style={{ fontWeight: 700, color: "#D97706", fontSize: "0.9rem", marginBottom: "0.75rem" }}>💡 Clinical Reflection Points</h4>
                  <ul style={{ listStyle: "none" }}>
                    {unit.caseStudy.reflections.map((r:string,i:number) => (
                      <li key={i} style={{ fontSize: "0.88rem", lineHeight: 1.7, paddingLeft: "1.5rem", position: "relative", color: "var(--text)", marginBottom: "0.35rem" }}>
                        <span style={{ position: "absolute", left: 0 }}>💡</span>{r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function CaseQuestion({ cq, idx, lc }: { cq: any, idx: number, lc: any }) {
  const [selected, setSelected] = useState<string|null>(null)
  return (
    <div style={{ border: `1.5px solid ${selected ? (selected===cq.correct?"#86efac":"#fca5a5") : "var(--border)"}`, borderRadius: 12, overflow: "hidden", marginBottom: "1.25rem" }}>
      <div style={{ padding: "1rem 1.25rem", background: "var(--bg)", display: "flex", gap: "0.85rem" }}>
        <div style={{ width: 28, height: 28, background: "var(--primary)", color: "white", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.8rem", flexShrink: 0 }}>{idx+1}</div>
        <p style={{ fontSize: "0.93rem", fontWeight: 600, lineHeight: 1.6, flex: 1 }}>{cq.q}</p>
      </div>
      <div style={{ padding: "1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
        {cq.options.map((opt:any) => {
          const isRight = selected && opt.l===cq.correct
          const isWrong = selected===opt.l && opt.l!==cq.correct
          return (
            <div key={opt.l} onClick={() => !selected && setSelected(opt.l)} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "0.7rem 1rem", border: `1.5px solid ${isRight?"#86efac":isWrong?"#fca5a5":"var(--border)"}`, borderRadius: 9, cursor: selected?"default":"pointer", background: isRight?"var(--correct-bg)":isWrong?"var(--wrong-bg)":"white", fontSize: "0.88rem", lineHeight: 1.5 }}>
              <div style={{ width: 26, height: 26, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.78rem", flexShrink: 0, background: isRight?"var(--correct)":isWrong?"var(--wrong)":"var(--border)", color: (isRight||isWrong)?"white":"var(--text-light)" }}>{opt.l}</div>
              {opt.t}
            </div>
          )
        })}
      </div>
      {selected && (
        <div style={{ margin: "0 1.25rem 1.25rem", padding: "1rem 1.25rem", background: "#ECFDF5", borderLeft: "4px solid #22C55E", borderRadius: "0 10px 10px 0" }}>
          <div style={{ fontWeight: 700, color: "#15803D", fontSize: "0.85rem", marginBottom: "0.5rem" }}>✅ Explanation</div>
          <p style={{ fontSize: "0.88rem", color: "var(--text)", lineHeight: 1.7 }}>{cq.exp}</p>
        </div>
      )}
    </div>
  )
}