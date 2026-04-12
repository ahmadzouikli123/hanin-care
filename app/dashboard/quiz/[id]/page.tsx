"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

// ── 30 Questions: 10 per level ──────────────────────────────
const ALL_QUESTIONS = [
  // ── BEGINNER (10) ──
  { id:1,  unit:"Unit 1", level:"beginner",     diff:"easy",   text:"What is the primary role of a PSW in Canadian healthcare?", options:[{l:"A",t:"Diagnose medical conditions"},{l:"B",t:"Provide personal care and assist with daily living"},{l:"C",t:"Perform surgical procedures"},{l:"D",t:"Manage hospital administration"}], correct:"B", exp:"PSWs provide personal care and assist with ADLs under supervision of regulated health professionals." },
  { id:2,  unit:"Unit 2", level:"beginner",     diff:"easy",   text:"How long should you wash hands according to WHO guidelines?", options:[{l:"A",t:"5 seconds"},{l:"B",t:"10 seconds"},{l:"C",t:"20 seconds"},{l:"D",t:"60 seconds"}], correct:"C", exp:"WHO recommends at least 20 seconds of handwashing with soap and water." },
  { id:3,  unit:"Unit 2", level:"beginner",     diff:"easy",   text:"Which of the following is a mandatory reporting obligation for a PSW in an LTC home?", options:[{l:"A",t:"A resident's low appetite"},{l:"B",t:"Suspected abuse or neglect of a resident"},{l:"C",t:"A family member visiting outside visiting hours"},{l:"D",t:"A resident refusing dessert"}], correct:"B", exp:"Under the FLTCA, PSWs must report any suspected or witnessed abuse or neglect to the Director of Nursing and the Ministry." },
  { id:4,  unit:"Unit 1", level:"beginner",     diff:"easy",   text:"The Canada Health Act (1984) is based on how many core principles?", options:[{l:"A",t:"3"},{l:"B",t:"4"},{l:"C",t:"5"},{l:"D",t:"6"}], correct:"C", exp:"The five principles are: public administration, comprehensiveness, universality, portability, and accessibility." },
  { id:5,  unit:"Unit 4", level:"beginner",     diff:"medium", text:"You notice a wet floor near the bathroom. What is your FIRST action?", options:[{l:"A",t:"Document and report at shift end"},{l:"B",t:"Ask the client to avoid the area"},{l:"C",t:"Place a warning sign and clean or report immediately"},{l:"D",t:"Ignore it if the client is not nearby"}], correct:"C", exp:"Immediate action prevents falls. Place a wet floor sign and clean or report to supervisor right away." },
  { id:6,  unit:"Unit 4", level:"beginner",     diff:"medium", text:"Which pathogen requires soap and water hand hygiene — alcohol-based hand rub is NOT effective?", options:[{l:"A",t:"MRSA"},{l:"B",t:"Influenza"},{l:"C",t:"C. difficile"},{l:"D",t:"VRE"}], correct:"C", exp:"C. difficile forms spores that are resistant to alcohol. Soap and water is mandatory for suspected or confirmed C. diff cases." },
  { id:7,  unit:"Unit 3", level:"beginner",     diff:"medium", text:"Which SBAR component includes your interpretation of the client's condition?", options:[{l:"A",t:"Situation"},{l:"B",t:"Background"},{l:"C",t:"Assessment"},{l:"D",t:"Recommendation"}], correct:"C", exp:"Assessment (A) is where you share your interpretation: 'I think the client may be developing a respiratory infection.'" },
  { id:8,  unit:"Unit 6", level:"beginner",     diff:"medium", text:"When assisting a client with a bed bath, what is the correct order to wash body regions?", options:[{l:"A",t:"Feet → face → perineal area"},{l:"B",t:"Face → body → perineal area (clean to dirty)"},{l:"C",t:"Perineal area first to prevent odour"},{l:"D",t:"Order does not matter"}], correct:"B", exp:"Always wash from clean to dirty: face first, then body, and perineal area last to prevent cross-contamination." },
  { id:9,  unit:"Unit 2", level:"beginner",     diff:"hard",   text:"A client has capacity and refuses their morning medications. The correct PSW response is:", options:[{l:"A",t:"Insist the client take the medication for their safety"},{l:"B",t:"Mix the medication into their food without telling them"},{l:"C",t:"Respect the refusal, document it, and report to the supervisor/RN immediately"},{l:"D",t:"Call the family to convince the client"}], correct:"C", exp:"Autonomy is a core ethical principle. A capable client has the right to refuse any treatment. The PSW must document and report." },
  { id:10, unit:"Unit 7", level:"beginner",     diff:"hard",   text:"When using a mechanical lift (Hoyer), which action is UNSAFE?", options:[{l:"A",t:"Checking sling condition before use"},{l:"B",t:"Performing the lift with one PSW alone"},{l:"C",t:"Ensuring the client's legs are properly positioned in the sling"},{l:"D",t:"Lowering the boom before attaching the sling"}], correct:"B", exp:"Mechanical lifts require a minimum of two trained PSWs for safe operation. Single-operator lifts are a safety violation." },

  // ── INTERMEDIATE (10) ──
  { id:11, unit:"Unit 9",  level:"intermediate", diff:"easy",   text:"A client's blood pressure reads 168/102 mmHg. How should you classify this?", options:[{l:"A",t:"Normal"},{l:"B",t:"Low — hypotension"},{l:"C",t:"High — hypertension requiring prompt reporting"},{l:"D",t:"Within acceptable range for elderly clients"}], correct:"C", exp:"A reading above 140/90 mmHg is classified as hypertension. A reading of 168/102 requires prompt reporting to the RN." },
  { id:12, unit:"Unit 13", level:"intermediate", diff:"easy",   text:"Which communication approach is recommended when speaking with a client who has dementia?", options:[{l:"A",t:"Correcting the client's misconceptions firmly"},{l:"B",t:"Using validation therapy — entering the client's emotional reality"},{l:"C",t:"Speaking loudly and slowly"},{l:"D",t:"Avoiding conversation to reduce confusion"}], correct:"B", exp:"Validation therapy acknowledges the client's feelings and emotional reality without arguing about facts, reducing distress." },
  { id:13, unit:"Unit 10", level:"intermediate", diff:"easy",   text:"A diabetic client is shaking, pale, and says 'I feel dizzy.' Blood glucose is 3.1 mmol/L. This indicates:", options:[{l:"A",t:"Hyperglycemia — give insulin"},{l:"B",t:"Hypoglycemia — provide 15g fast-acting carbohydrate and notify RN"},{l:"C",t:"Normal blood sugar fluctuation"},{l:"D",t:"Stroke — call 911 immediately"}], correct:"B", exp:"Blood glucose below 4.0 mmol/L with symptoms is hypoglycemia. Give 15g fast-acting carbs (e.g. juice), wait 15 min, recheck, and notify RN." },
  { id:14, unit:"Unit 11", level:"intermediate", diff:"medium", text:"A Stage II pressure injury is best described as:", options:[{l:"A",t:"Intact skin with non-blanchable redness"},{l:"B",t:"Partial thickness skin loss — shallow open wound with red/pink wound bed"},{l:"C",t:"Full thickness skin loss — subcutaneous tissue visible"},{l:"D",t:"Full thickness tissue loss — bone, tendon or muscle exposed"}], correct:"B", exp:"Stage II: Partial thickness skin loss. The wound bed is red or pink. No slough or bruising present." },
  { id:15, unit:"Unit 12", level:"intermediate", diff:"medium", text:"Which of the following is within the PSW scope of practice WITHOUT delegation?", options:[{l:"A",t:"Administering subcutaneous insulin"},{l:"B",t:"Reminding a client to take their own medication"},{l:"C",t:"Inserting a urinary catheter"},{l:"D",t:"Changing a sterile wound dressing"}], correct:"B", exp:"Medication reminders are not a controlled act and fall within PSW scope. Insulin injection, catheter insertion, and sterile dressings require delegation." },
  { id:16, unit:"Unit 14", level:"intermediate", diff:"medium", text:"Which sign indicates a client is in the active phase of dying (last hours to days)?", options:[{l:"A",t:"Increased appetite and restlessness"},{l:"B",t:"Mottling of skin, Cheyne-Stokes breathing, and decreased urine output"},{l:"C",t:"Elevated blood pressure and strong pulse"},{l:"D",t:"Complaints of hunger and thirst"}], correct:"B", exp:"Mottling, irregular breathing patterns (Cheyne-Stokes), and decreased urine output are physiological signs of the active dying process." },
  { id:17, unit:"Unit 9",  level:"intermediate", diff:"medium", text:"Using the PAINAD scale, which client behaviour indicates HIGH pain?", options:[{l:"A",t:"Relaxed face, calm breathing, no vocalization"},{l:"B",t:"Occasional laboured breathing, moaning, and tense body"},{l:"C",t:"Smiling occasionally, normal breathing"},{l:"D",t:"Sleeping quietly with relaxed muscles"}], correct:"B", exp:"The PAINAD scale scores breathing, vocalization, facial expression, body language, and consolability. Laboured breathing, moaning, and tense body indicate significant pain." },
  { id:18, unit:"Unit 13", level:"intermediate", diff:"hard",   text:"A client with dementia is resisting morning care and becoming physically aggressive. Your FIRST response should be:", options:[{l:"A",t:"Restrain the client to complete care safely"},{l:"B",t:"Pause care, step back, use a calm tone, and attempt redirection"},{l:"C",t:"Call for security"},{l:"D",t:"Skip care and document 'client refused'"}], correct:"B", exp:"De-escalation is always first: pause, use calm voice, validate feelings, redirect. Restraint is a last resort and requires physician orders." },
  { id:19, unit:"Unit 18", level:"intermediate", diff:"hard",   text:"A PSW documents: 'Client seemed depressed and didn't want to eat because of family problems.' This documentation is:", options:[{l:"A",t:"Appropriate — it gives context"},{l:"B",t:"Incorrect — contains subjective assumptions and interpretations"},{l:"C",t:"Correct because the PSW knows the client well"},{l:"D",t:"Only acceptable if co-signed by an RN"}], correct:"B", exp:"Documentation must be objective and factual. Correct: 'Client did not eat breakfast. Client stated: I don't feel like eating today.' Never document assumptions." },
  { id:20, unit:"Unit 10", level:"intermediate", diff:"hard",   text:"A client with COPD has an SpO2 of 86% on room air and is using accessory muscles to breathe. Your IMMEDIATE action is:", options:[{l:"A",t:"Reposition and reassess in 30 minutes"},{l:"B",t:"Notify the RN immediately using SBAR and stay with the client"},{l:"C",t:"Encourage deep breathing exercises"},{l:"D",t:"Administer oxygen via nasal cannula"}], correct:"B", exp:"SpO2 below 90% with increased work of breathing is a medical emergency. Notify the RN immediately using SBAR. PSWs do not initiate oxygen without orders." },

  // ── ADVANCED (10) ──
  { id:21, unit:"Unit 20", level:"advanced", diff:"easy",   text:"For a delegated act to be legally performed by a PSW in Ontario, which condition MUST be met?", options:[{l:"A",t:"The PSW has performed it before"},{l:"B",t:"A written delegation order from an RN or physician, client-specific"},{l:"C",t:"Verbal authorization from a family member"},{l:"D",t:"The task is listed in the PSW job description"}], correct:"B", exp:"Under the RHPA, controlled acts require a written, client-specific delegation order from an authorized regulated health professional (usually RN or MD)." },
  { id:22, unit:"Unit 22", level:"advanced", diff:"easy",   text:"The P.I.E.C.E.S. framework is used to:", options:[{l:"A",t:"Assess nutritional needs in LTC"},{l:"B",t:"Understand and address responsive behaviours holistically"},{l:"C",t:"Document wound care progress"},{l:"D",t:"Train new PSWs in body mechanics"}], correct:"B", exp:"P.I.E.C.E.S. (Physical, Intellectual, Emotional, Capabilities, Environment, Social) is a Canadian framework for understanding responsive behaviours in dementia care." },
  { id:23, unit:"Unit 24", level:"advanced", diff:"easy",   text:"Cultural humility, as opposed to cultural competence, emphasizes:", options:[{l:"A",t:"Memorizing facts about different cultures"},{l:"B",t:"Ongoing self-reflection and recognizing power imbalances in care relationships"},{l:"C",t:"Treating all clients identically regardless of background"},{l:"D",t:"Completing a one-time cultural awareness training"}], correct:"B", exp:"Cultural humility is an ongoing process of self-reflection, acknowledging one's own biases, and recognizing the power differential between caregiver and client." },
  { id:24, unit:"Unit 19", level:"advanced", diff:"medium", text:"A client with ALS (amyotrophic lateral sclerosis) is at highest risk for:", options:[{l:"A",t:"Hypoglycemia"},{l:"B",t:"Progressive muscle weakness leading to respiratory failure"},{l:"C",t:"Skin infections from poor hygiene"},{l:"D",t:"Acute kidney injury"}], correct:"B", exp:"ALS causes progressive degeneration of motor neurons, ultimately affecting the respiratory muscles. Respiratory failure is the primary cause of death in ALS." },
  { id:25, unit:"Unit 21", level:"advanced", diff:"medium", text:"Which factor is the STRONGEST predictor of fall risk in elderly clients?", options:[{l:"A",t:"Age over 65"},{l:"B",t:"History of a previous fall"},{l:"C",t:"Living alone"},{l:"D",t:"Taking more than 2 medications"}], correct:"B", exp:"A history of previous falls is the single strongest predictor of future falls. This is consistently identified in the Morse Fall Scale and other validated tools." },
  { id:26, unit:"Unit 23", level:"advanced", diff:"medium", text:"A home care PSW arrives and finds the client has not answered the door after several attempts. Your FIRST action is:", options:[{l:"A",t:"Leave and document 'client not home'"},{l:"B",t:"Attempt to contact the client by phone, then notify your supervisor and follow the missing client protocol"},{l:"C",t:"Call 911 immediately"},{l:"D",t:"Check with neighbours"}], correct:"B", exp:"Follow the agency's missing client protocol: call the client, notify supervisor, check with emergency contacts. 911 is called if there are immediate safety concerns." },
  { id:27, unit:"Unit 25", level:"advanced", diff:"medium", text:"In a fire emergency in an LTC home, the RACE acronym stands for:", options:[{l:"A",t:"Run, Alert, Call, Evacuate"},{l:"B",t:"Rescue, Alarm, Contain, Extinguish/Evacuate"},{l:"C",t:"Remove, Assess, Call, Exit"},{l:"D",t:"Respond, Activate, Contain, Escape"}], correct:"B", exp:"RACE: Rescue anyone in immediate danger → Alarm (pull the fire alarm) → Contain (close doors) → Extinguish if safe, or Evacuate." },
  { id:28, unit:"Unit 26", level:"advanced", diff:"hard",   text:"A colleague makes a racist comment toward an Indigenous client. Using the 5Ds bystander framework, which is the MOST appropriate immediate response?", options:[{l:"A",t:"Ignore it to avoid conflict"},{l:"B",t:"Report it only at the end of the shift"},{l:"C",t:"Use Direct or Distract strategies in the moment, then Document and report to a supervisor"},{l:"D",t:"Apologize to the client on behalf of your colleague"}], correct:"C", exp:"The 5Ds (Direct, Distract, Delegate, Delay, Document) provide a framework for bystander intervention. Direct or Distract in the moment, then document and report through the appropriate channel." },
  { id:29, unit:"Unit 22", level:"advanced", diff:"hard",   text:"Antecedent-Behaviour-Consequence (ABC) charting is used to:", options:[{l:"A",t:"Document medication administration"},{l:"B",t:"Identify triggers and patterns of responsive behaviours to develop non-pharmacological interventions"},{l:"C",t:"Assess pain levels in non-verbal clients"},{l:"D",t:"Track wound healing progress"}], correct:"B", exp:"ABC charting identifies what happens Before (trigger), the Behaviour itself, and the Consequence. Patterns identified guide non-pharmacological care plan modifications." },
  { id:30, unit:"Unit 27", level:"advanced", diff:"hard",   text:"During a capstone OSCE, a client has a fall in front of you. The correct sequence of actions is:", options:[{l:"A",t:"Help client up immediately, then report"},{l:"B",t:"Do not move the client — call for help, stay with client, call for nurse, complete incident report"},{l:"C",t:"Assess the client yourself and decide if they need help"},{l:"D",t:"Document the incident first before calling for help"}], correct:"B", exp:"Never move a fallen client — unseen injuries (fractures, spinal) may be worsened. Stay with the client, call for help immediately, and complete a detailed incident report." },
]

const DC: Record<string,any> = {
  easy:   { bg:"#DCFCE7", color:"#166534" },
  medium: { bg:"#FEF3C7", color:"#92400E" },
  hard:   { bg:"#FEE2E2", color:"#991B1B" },
}
const LC: Record<string,any> = {
  beginner:     { bg:"var(--beg-bg)", color:"var(--beg)" },
  intermediate: { bg:"var(--int-bg)", color:"var(--int)" },
  advanced:     { bg:"var(--adv-bg)", color:"var(--adv)" },
}
const PLAN_LEVELS: Record<string, string[]> = {
  beginner:     ["beginner"],
  standard:     ["beginner","intermediate"],
  advanced:     ["beginner","intermediate","advanced"],
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function PracticeQuizPage() {
  const [plan, setPlan]         = useState<string>("beginner")
  const [loading, setLoading]   = useState(true)
  const [questions, setQuestions] = useState<typeof ALL_QUESTIONS>([])
  const [answers, setAnswers]   = useState<Record<number,string>>({})
  const [shown, setShown]       = useState<Record<number,boolean>>({})
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data }) => {
      let userPlan = "beginner"
      if (data.user) {
        const { data: profile } = await supabase
          .from("profiles").select("plan").eq("id", data.user.id).single()
        if ((profile as any)?.plan) userPlan = (profile as any).plan
        else if (data.user.user_metadata?.plan) userPlan = data.user.user_metadata.plan
      }
      setPlan(userPlan)

      // Build randomized question set based on plan
      const allowed = PLAN_LEVELS[userPlan] || ["beginner"]
      const selected: typeof ALL_QUESTIONS = []
      allowed.forEach(level => {
        const pool = ALL_QUESTIONS.filter(q => q.level === level)
        selected.push(...shuffle(pool).slice(0, 10))
      })
      setQuestions(shuffle(selected))
      setLoading(false)
    })
  }, [])

  const answer = (qId: number, l: string) => {
    if (shown[qId]) return
    setAnswers(a => ({ ...a, [qId]: l }))
    setShown(s => ({ ...s, [qId]: true }))
  }

  const score  = questions.filter(q => answers[q.id] === q.correct).length
  const pct    = finished ? Math.round((score / questions.length) * 100) : 0
  const passed = pct >= 70
  const allowedLevels = PLAN_LEVELS[plan] || ["beginner"]

  if (loading) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"var(--bg)" }}>
      <div style={{ textAlign:"center", color:"var(--text-light)" }}>
        <div style={{ fontSize:"2rem", marginBottom:"1rem" }}>⏳</div>
        <p>Loading your practice quiz…</p>
      </div>
    </div>
  )

  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh" }}>

      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,var(--primary-dark),var(--primary))", color:"white", padding:"3rem 2rem 2.5rem" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div style={{ fontSize:"0.82rem", opacity:0.7, marginBottom:"1rem" }}>
            <Link href="/dashboard" style={{ color:"white", textDecoration:"none" }}>Dashboard</Link>
            {" › "}
            <Link href="/dashboard/curriculum" style={{ color:"white", textDecoration:"none" }}>Curriculum</Link>
            {" › Practice Quiz"}
          </div>
          <h1 style={{ fontFamily:'"Playfair Display",serif', fontSize:"2.2rem", marginBottom:"0.5rem" }}>
            Practice <span style={{ color:"var(--accent-green)" }}>Quiz</span>
          </h1>
          <p style={{ opacity:0.8, marginBottom:"1.5rem" }}>
            Randomized exam-prep questions · {allowedLevels.join(", ")} level{allowedLevels.length > 1 ? "s" : ""}
          </p>
          <div style={{ display:"flex", gap:"2rem", flexWrap:"wrap" }}>
            {[
              { num: questions.length, label:"Questions" },
              { num: "70%",            label:"Pass Mark" },
              { num: Object.keys(shown).length, label:"Answered" },
              { num: allowedLevels.length * 10, label:"Total Available" },
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
            {Object.keys(shown).length}/{questions.length}
          </span>
          <div style={{ flex:1, height:8, background:"var(--border)", borderRadius:4 }}>
            <div style={{ width:`${(Object.keys(shown).length/questions.length)*100}%`, height:"100%", background:"var(--primary)", borderRadius:4, transition:"width 0.4s" }} />
          </div>
          {Object.keys(shown).length === questions.length && !finished && (
            <button onClick={() => setFinished(true)} style={{ background:"var(--primary)", color:"white", padding:"0.65rem 1.5rem", borderRadius:10, border:"none", fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
              Submit Quiz →
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth:1000, margin:"0 auto", padding:"2.5rem 2rem" }}>

        {/* Result banner */}
        {finished && (
          <div style={{ background:passed?"linear-gradient(135deg,#DCFCE7,#BBF7D0)":"linear-gradient(135deg,#FEF2F2,#FEE2E2)", border:`2px solid ${passed?"#22C55E":"#EF4444"}`, borderRadius:16, padding:"1.5rem 2rem", marginBottom:"2rem", display:"flex", alignItems:"center", gap:"1.25rem" }}>
            <span style={{ fontSize:"2.5rem" }}>{passed ? "🎉" : "📚"}</span>
            <div>
              <h3 style={{ fontWeight:700, color:passed?"#15803D":"#DC2626" }}>
                {passed ? `You passed with ${pct}%!` : `Score: ${pct}% — Keep practising!`}
              </h3>
              <p style={{ fontSize:"0.88rem", color:"var(--text-light)" }}>
                {score}/{questions.length} correct · {passed ? "Pass ✓" : "70% required to pass"}
              </p>
            </div>
            <button onClick={() => {
              setAnswers({})
              setShown({})
              setFinished(false)
              const allowed = PLAN_LEVELS[plan] || ["beginner"]
              const selected: typeof ALL_QUESTIONS = []
              allowed.forEach(level => {
                const pool = ALL_QUESTIONS.filter(q => q.level === level)
                selected.push(...shuffle(pool).slice(0, 10))
              })
              setQuestions(shuffle(selected))
            }} style={{ marginLeft:"auto", background:"var(--primary)", color:"white", padding:"0.65rem 1.5rem", borderRadius:10, border:"none", fontWeight:700, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap" }}>
              🔄 New Quiz
            </button>
          </div>
        )}

        {/* Questions */}
        {questions.map((q, idx) => {
          const ua = answers[q.id]
          const isAns = shown[q.id]
          const isOk = ua === q.correct
          const dc = DC[q.diff]
          const lc = LC[q.level] || LC.beginner
          return (
            <div key={q.id} style={{ background:"white", borderRadius:16, border:`1.5px solid ${isAns ? (isOk ? "#86efac" : "#fca5a5") : "var(--border)"}`, boxShadow:"var(--shadow)", padding:"1.75rem", marginBottom:"1.5rem" }}>
              <div style={{ display:"flex", gap:"0.6rem", marginBottom:"1rem", flexWrap:"wrap" }}>
                <span style={{ background:lc.bg, color:lc.color, padding:"0.25rem 0.8rem", borderRadius:10, fontSize:"0.75rem", fontWeight:600, textTransform:"capitalize" }}>{q.level}</span>
                <span style={{ background:"var(--bg)", color:"var(--text-light)", padding:"0.25rem 0.8rem", borderRadius:10, fontSize:"0.75rem", fontWeight:600 }}>{q.unit}</span>
                <span style={{ background:dc.bg, color:dc.color, padding:"0.25rem 0.8rem", borderRadius:10, fontSize:"0.75rem", fontWeight:600, textTransform:"capitalize" }}>{q.diff}</span>
              </div>
              <p style={{ fontSize:"1rem", fontWeight:600, lineHeight:1.6, marginBottom:"1.25rem" }}>
                <span style={{ background:"var(--primary)", color:"white", borderRadius:6, padding:"0.15rem 0.6rem", fontSize:"0.8rem", fontWeight:700, marginRight:"0.5rem" }}>Q{idx+1}</span>
                {q.text}
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem", marginBottom:"1rem" }}>
                {q.options.map(opt => {
                  const isRight = isAns && opt.l === q.correct
                  const isWrong = isAns && ua === opt.l && !isOk
                  return (
                    <div key={opt.l} onClick={() => answer(q.id, opt.l)} style={{ display:"flex", alignItems:"center", gap:"0.85rem", padding:"0.85rem 1rem", border:`2px solid ${isRight?"#86efac":isWrong?"#fca5a5":"var(--border)"}`, borderRadius:10, cursor:isAns?"default":"pointer", background:isRight?"var(--correct-bg)":isWrong?"var(--wrong-bg)":"var(--bg)", fontSize:"0.92rem" }}>
                      <div style={{ width:28, height:28, minWidth:28, borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:"0.78rem", background:isRight?"var(--correct)":isWrong?"var(--wrong)":"var(--border)", color:(isRight||isWrong)?"white":"var(--text-light)" }}>{opt.l}</div>
                      <span style={{ flex:1 }}>{opt.t}</span>
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
                  <p style={{ fontSize:"0.9rem", lineHeight:1.7, color:"var(--text)" }}>{q.exp}</p>
                </div>
              )}
            </div>
          )
        })}

        {/* Footer buttons */}
        <div style={{ display:"flex", gap:"1rem", marginTop:"1rem", flexWrap:"wrap" }}>
          {Object.keys(shown).length === questions.length && !finished && (
            <button onClick={() => setFinished(true)} style={{ background:"var(--primary)", color:"white", padding:"0.8rem 2rem", borderRadius:10, border:"none", fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
              Submit and See Results →
            </button>
          )}
          <Link href="/dashboard/curriculum" style={{ border:"2px solid var(--primary)", color:"var(--primary)", padding:"0.8rem 2rem", borderRadius:10, fontWeight:600, textDecoration:"none", display:"inline-block" }}>
            ← Back to Curriculum
          </Link>
        </div>
      </div>
    </div>
  )
}
