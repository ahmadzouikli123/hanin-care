"use client"
import { useState } from "react"
import Link from "next/link"

const Q = [
  { id:1, unit:"Unit 1", level:"beginner", diff:"easy", type:"mcq", text:"What is the primary role of a PSW in Canadian healthcare?", options:[{l:"A",t:"Diagnose medical conditions"},{l:"B",t:"Provide personal care and assist with daily living"},{l:"C",t:"Perform surgical procedures"},{l:"D",t:"Manage hospital administration"}], correct:"B", exp:"PSWs provide personal care and assist with ADLs under supervision of regulated health professionals." },
  { id:2, unit:"Unit 2", level:"beginner", diff:"easy", type:"mcq", text:"How long should you wash hands according to Canadian guidelines?", options:[{l:"A",t:"5 seconds"},{l:"B",t:"10 seconds"},{l:"C",t:"20 seconds"},{l:"D",t:"60 seconds"}], correct:"C", exp:"Health Canada recommends at least 20 seconds of hand washing with soap and water." },
  { id:3, unit:"Unit 5", level:"beginner", diff:"medium", type:"mcq", text:"You notice a wet floor near the bathroom. What is your FIRST action?", options:[{l:"A",t:"Document and report at shift end"},{l:"B",t:"Ask client to avoid the area"},{l:"C",t:"Place a warning sign and clean or report immediately"},{l:"D",t:"Ignore it if client is not nearby"}], correct:"C", exp:"Immediate action prevents falls. Place a wet floor sign and clean or report to supervisor right away." },
  { id:4, unit:"Unit 8", level:"intermediate", diff:"medium", type:"mcq", text:"A dementia client becomes agitated and refuses care. Best approach?", options:[{l:"A",t:"Insist on completing care"},{l:"B",t:"Pause, use calm tone, redirect and try again later"},{l:"C",t:"Restrain the client for safety"},{l:"D",t:"Skip care for the day"}], correct:"B", exp:"Person-centred care means pausing, speaking calmly, and redirecting. Restraint is never a first response." },
  { id:5, unit:"Unit 10", level:"intermediate", diff:"hard", type:"true_false", text:"TRUE or FALSE: In palliative care, the goal is to cure the disease and extend life at all costs.", options:[{l:"T",t:"True"},{l:"F",t:"False"}], correct:"F", exp:"Palliative care focuses on comfort, dignity and quality of life — not cure. It honours the client wishes." },
]

const DC: Record<string,any> = { easy:{bg:"#DCFCE7",color:"#166534"}, medium:{bg:"#FEF3C7",color:"#92400E"}, hard:{bg:"#FEE2E2",color:"#991B1B"} }
const LC: Record<string,any> = { beginner:{bg:"var(--beg-bg)",color:"var(--beg)"}, intermediate:{bg:"var(--int-bg)",color:"var(--int)"} }

export default function QuizPage() {
  const [answers, setAnswers] = useState<Record<number,string>>({})
  const [shown, setShown]     = useState<Record<number,boolean>>({})
  const [finished, setFinished] = useState(false)

  const answer = (qId: number, l: string) => {
    if (shown[qId]) return
    setAnswers(a => ({ ...a, [qId]: l }))
    setShown(s => ({ ...s, [qId]: true }))
  }

  const score  = Q.filter(q => answers[q.id] === q.correct).length
  const pct    = finished ? Math.round((score/Q.length)*100) : 0
  const passed = pct >= 70

  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh" }}>
      <div style={{ background:"linear-gradient(135deg,var(--primary-dark),var(--primary))", color:"white", padding:"3rem 2rem 2.5rem" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div style={{ fontSize:"0.82rem", opacity:0.7, marginBottom:"1rem" }}>
            <Link href="/dashboard" style={{ color:"white", textDecoration:"none" }}>Dashboard</Link> › <Link href="/dashboard/curriculum" style={{ color:"white", textDecoration:"none" }}>Curriculum</Link> › Quiz
          </div>
          <h1 style={{ fontFamily:"\"Playfair Display\",serif", fontSize:"2.2rem", marginBottom:"0.5rem" }}>Practice <span style={{ color:"var(--accent-green)" }}>Quiz</span></h1>
          <p style={{ opacity:0.8, marginBottom:"1.5rem" }}>Mixed questions — Beginner and Intermediate levels</p>
          <div style={{ display:"flex", gap:"2rem" }}>
            {[{num:Q.length,label:"Questions"},{num:"70%",label:"Pass Mark"},{num:Object.keys(shown).length,label:"Answered"}].map(({num,label})=>(
              <div key={label}><span style={{ fontFamily:"\"Playfair Display\",serif", fontSize:"1.8rem", fontWeight:700, color:"var(--accent-green)", display:"block" }}>{num}</span><span style={{ fontSize:"0.78rem", opacity:0.7 }}>{label}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background:"white", borderBottom:"1px solid var(--border)", padding:"1rem 2rem", position:"sticky", top:78, zIndex:900 }}>
        <div style={{ maxWidth:1000, margin:"0 auto", display:"flex", alignItems:"center", gap:"1.5rem" }}>
          <span style={{ fontFamily:"\"Playfair Display\",serif", fontSize:"1.3rem", fontWeight:700, color:"var(--primary)" }}>{Object.keys(shown).length}/{Q.length}</span>
          <div style={{ flex:1, height:8, background:"var(--border)", borderRadius:4 }}><div style={{ width:`${(Object.keys(shown).length/Q.length)*100}%`, height:"100%", background:"var(--primary)", borderRadius:4, transition:"width 0.4s" }} /></div>
          {Object.keys(shown).length===Q.length && !finished && (
            <button onClick={()=>setFinished(true)} style={{ background:"var(--primary)", color:"white", padding:"0.65rem 1.5rem", borderRadius:10, border:"none", fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>Submit Quiz →</button>
          )}
        </div>
      </div>

      <div style={{ maxWidth:1000, margin:"0 auto", padding:"2.5rem 2rem" }}>
        {finished && (
          <div style={{ background:passed?"linear-gradient(135deg,#DCFCE7,#BBF7D0)":"linear-gradient(135deg,#FEF2F2,#FEE2E2)", border:`2px solid ${passed?"#22C55E":"#EF4444"}`, borderRadius:16, padding:"1.5rem 2rem", marginBottom:"2rem", display:"flex", alignItems:"center", gap:"1.25rem" }}>
            <span style={{ fontSize:"2.5rem" }}>{passed?"🎉":"📚"}</span>
            <div>
              <h3 style={{ fontWeight:700, color:passed?"#15803D":"#DC2626" }}>{passed?`You passed with ${pct}%!`:`Score: ${pct}% — Keep practising!`}</h3>
              <p style={{ fontSize:"0.88rem", color:"var(--text-light)" }}>{score}/{Q.length} correct · {passed?"Pass ✓":"70% required"}</p>
            </div>
          </div>
        )}

        {Q.map((q,idx)=>{
          const ua=answers[q.id]; const isAns=shown[q.id]; const isOk=ua===q.correct
          const dc=DC[q.diff]; const lc=LC[q.level]||{bg:"var(--beg-bg)",color:"var(--beg)"}
          return (
            <div key={q.id} style={{ background:"white", borderRadius:16, border:`1.5px solid ${isAns?(isOk?"#86efac":"#fca5a5"):"var(--border)"}`, boxShadow:"var(--shadow)", padding:"1.75rem", marginBottom:"1.5rem" }}>
              <div style={{ display:"flex", gap:"0.6rem", marginBottom:"1rem", flexWrap:"wrap" }}>
                <span style={{ background:lc.bg, color:lc.color, padding:"0.25rem 0.8rem", borderRadius:10, fontSize:"0.75rem", fontWeight:600 }}>{q.unit}</span>
                <span style={{ background:dc.bg, color:dc.color, padding:"0.25rem 0.8rem", borderRadius:10, fontSize:"0.75rem", fontWeight:600, textTransform:"capitalize" as const }}>{q.diff}</span>
              </div>
              <p style={{ fontSize:"1rem", fontWeight:600, lineHeight:1.6, marginBottom:"1.25rem" }}>
                <span style={{ background:"var(--primary)", color:"white", borderRadius:6, padding:"0.15rem 0.6rem", fontSize:"0.8rem", fontWeight:700, marginRight:"0.5rem" }}>Q{idx+1}</span>{q.text}
              </p>
              <div style={{ display:"flex", flexDirection:"column" as const, gap:"0.6rem", marginBottom:"1rem" }}>
                {q.options.map(opt=>{
                  const isRight=isAns&&opt.l===q.correct; const isWrong=isAns&&ua===opt.l&&!isOk
                  return (
                    <div key={opt.l} onClick={()=>answer(q.id,opt.l)} style={{ display:"flex", alignItems:"center", gap:"0.85rem", padding:"0.85rem 1rem", border:`2px solid ${isRight?"#86efac":isWrong?"#fca5a5":"var(--border)"}`, borderRadius:10, cursor:isAns?"default":"pointer", background:isRight?"var(--correct-bg)":isWrong?"var(--wrong-bg)":"var(--bg)", fontSize:"0.92rem" }}>
                      <div style={{ width:28, height:28, minWidth:28, borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:"0.78rem", background:isRight?"var(--correct)":isWrong?"var(--wrong)":"var(--border)", color:(isRight||isWrong)?"white":"var(--text-light)" }}>{opt.l}</div>
                      <span style={{ flex:1 }}>{opt.t}</span>
                      {isRight&&<span>✅</span>}{isWrong&&<span>❌</span>}
                    </div>
                  )
                })}
              </div>
              {isAns&&(
                <div style={{ background:isOk?"var(--correct-bg)":"var(--wrong-bg)", borderLeft:`4px solid ${isOk?"var(--correct)":"var(--wrong)"}`, borderRadius:"0 12px 12px 0", padding:"1rem 1.25rem" }}>
                  <div style={{ fontWeight:700, color:isOk?"var(--correct)":"var(--wrong)", fontSize:"0.85rem", marginBottom:"0.5rem" }}>{isOk?"✅ Correct!":"❌ Incorrect"} — Explanation</div>
                  <p style={{ fontSize:"0.9rem", lineHeight:1.7, color:"var(--text)" }}>{q.exp}</p>
                </div>
              )}
            </div>
          )
        })}

        <div style={{ display:"flex", gap:"1rem", marginTop:"1rem" }}>
          {Object.keys(shown).length===Q.length&&!finished&&(
            <button onClick={()=>setFinished(true)} style={{ background:"var(--primary)", color:"white", padding:"0.8rem 2rem", borderRadius:10, border:"none", fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>Submit and See Results →</button>
          )}
          <Link href="/dashboard/curriculum" style={{ border:"2px solid var(--primary)", color:"var(--primary)", padding:"0.8rem 2rem", borderRadius:10, fontWeight:600, textDecoration:"none", display:"inline-block" }}>← Back to Curriculum</Link>
        </div>
      </div>
    </div>
  )
}