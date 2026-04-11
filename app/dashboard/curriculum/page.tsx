"use client"
import { useState } from "react"
import Link from "next/link"

const CURRICULUM = [
  {
    level:"beginner", label:"Beginner", color:"var(--beg)", bg:"var(--beg-bg)", border:"#A8D9E8",
    headerBg:"linear-gradient(135deg,#E8F5F9,#D1EBF3)", icon:"🌱",
    desc:"Build a solid foundation in personal support work — essential skills, safety protocols, and person-centred care.",
    units:[
      { num:1, title:"Role of the PSW in Canadian Healthcare",        duration:"45 min", questions:15 },
      { num:2, title:"Infection Control and Hand Hygiene",            duration:"40 min", questions:12 },
      { num:3, title:"Personal Care and Activities of Daily Living",  duration:"55 min", questions:18 },
      { num:4, title:"Communication and Interpersonal Skills",        duration:"35 min", questions:10 },
      { num:5, title:"Safety and Fall Prevention",                    duration:"50 min", questions:15 },
      { num:6, title:"Nutrition and Hydration Assistance",            duration:"40 min", questions:12 },
      { num:7, title:"Documentation and Reporting",                   duration:"30 min", questions:10 },
    ]
  },
  {
    level:"intermediate", label:"Intermediate", color:"var(--int)", bg:"var(--int-bg)", border:"#FCD34D",
    headerBg:"linear-gradient(135deg,#FFFBEB,#FEF3C7)", icon:"📈",
    desc:"Advance your skills in complex care needs, cognitive conditions, and professional practice.",
    units:[
      { num:8,  title:"Dementia and Alzheimer Care",              duration:"60 min", questions:20 },
      { num:9,  title:"Mental Health Support in PSW Practice",    duration:"50 min", questions:16 },
      { num:10, title:"Palliative and End-of-Life Care",          duration:"55 min", questions:18 },
      { num:11, title:"Mobility Assistance and Transfers",        duration:"50 min", questions:15 },
      { num:12, title:"Medication Awareness",                     duration:"45 min", questions:14 },
      { num:13, title:"Chronic Condition Management",             duration:"60 min", questions:20 },
      { num:14, title:"Cultural Competency and Diversity",        duration:"40 min", questions:12 },
    ]
  },
  {
    level:"advanced", label:"Advanced", color:"var(--adv)", bg:"var(--adv-bg)", border:"#C4B5FD",
    headerBg:"linear-gradient(135deg,#F5F3FF,#EDE9FE)", icon:"🏆",
    desc:"Master leadership, complex clinical situations, and specialty care for senior PSW professionals.",
    units:[
      { num:15, title:"Responsive Behaviours and De-escalation",   duration:"65 min", questions:22 },
      { num:16, title:"Complex Wound Care Awareness",               duration:"55 min", questions:18 },
      { num:17, title:"Ethical Decision-Making in PSW",             duration:"50 min", questions:16 },
      { num:18, title:"Family Dynamics and Caregiver Support",      duration:"45 min", questions:14 },
      { num:19, title:"Leadership and Mentoring in Care Settings",  duration:"50 min", questions:16 },
      { num:20, title:"Technology in Modern PSW Practice",          duration:"40 min", questions:12 },
      { num:21, title:"Capstone: Integrated Case Studies",          duration:"90 min", questions:30 },
    ]
  }
]

export default function CurriculumPage() {
  const [openUnit, setOpenUnit] = useState<string|null>(null)

  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh" }}>
      <div style={{ background:"linear-gradient(135deg,var(--primary-dark),var(--primary))", color:"white", padding:"3.5rem 2rem 2.5rem", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-80, right:-80, width:400, height:400, background:"rgba(255,255,255,0.04)", borderRadius:"50%" }} />
        <div style={{ maxWidth:1400, margin:"0 auto", position:"relative", zIndex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", fontSize:"0.82rem", opacity:0.7, marginBottom:"1rem" }}>
            <Link href="/dashboard" style={{ color:"white", textDecoration:"none" }}>Dashboard</Link>
            <span>›</span><span>Curriculum</span>
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"2.5rem", marginBottom:"0.75rem" }}>
            PSW Training <span style={{ color:"var(--accent-green)" }}>Curriculum</span>
          </h1>
          <p style={{ opacity:0.85, maxWidth:650, lineHeight:1.8, marginBottom:"1.5rem" }}>21 units across 3 levels — from foundations to advanced clinical practice, aligned with Canadian PSW standards.</p>
          <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
            {[{ icon:"📚", text:"21 Units" },{ icon:"🧠", text:"500+ Questions" },{ icon:"⏱️", text:"~18 Hours" },{ icon:"🇨🇦", text:"Canadian Standards" }].map(({ icon, text }) => (
              <div key={text} style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.2)", padding:"0.4rem 1rem", borderRadius:20, fontSize:"0.85rem" }}>{icon} {text}</div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1400, margin:"0 auto", padding:"2.5rem 2rem" }}>
        {CURRICULUM.map(lv => (
          <div key={lv.level} style={{ marginBottom:"4rem" }}>
            <div style={{ background:lv.headerBg, border:`2px solid ${lv.border}`, borderRadius:20, padding:"2.5rem", marginBottom:"2rem" }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", background:lv.color, color:"white", borderRadius:20, padding:"0.4rem 1rem", fontSize:"0.82rem", fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:"1rem" }}>{lv.icon} {lv.label}</div>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.9rem", marginBottom:"0.75rem" }}>{lv.label} Level Training</h2>
              <p style={{ color:"var(--text-light)", maxWidth:700, lineHeight:1.8 }}>{lv.desc}</p>
              <div style={{ display:"flex", gap:"2rem", marginTop:"1.5rem", flexWrap:"wrap" }}>
                <span style={{ display:"flex", alignItems:"center", gap:"0.5rem", fontSize:"0.88rem", fontWeight:600, color:lv.color }}>📖 {lv.units.length} Units</span>
                <span style={{ display:"flex", alignItems:"center", gap:"0.5rem", fontSize:"0.88rem", fontWeight:600, color:lv.color }}>❓ {lv.units.reduce((a,u)=>a+u.questions,0)} Questions</span>
              </div>
            </div>

            {lv.units.map(unit => {
              const key = `${lv.level}-${unit.num}`
              const isOpen = openUnit === key
              return (
                <div key={key} style={{ background:"white", borderRadius:18, border:"1px solid var(--border)", boxShadow:"var(--shadow)", marginBottom:"1rem", overflow:"hidden" }}>
                  <div style={{ height:4, background:"var(--border)" }}><div style={{ width:"0%", height:"100%", background:lv.color, borderRadius:4 }} /></div>
                  <div onClick={() => setOpenUnit(isOpen ? null : key)} style={{ padding:"1.5rem 2rem", display:"flex", alignItems:"center", gap:"1.25rem", cursor:"pointer" }}>
                    <div style={{ width:52, height:52, borderRadius:14, background:lv.color, color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:"1.1rem", flexShrink:0 }}>{unit.num}</div>
                    <div style={{ flex:1 }}>
                      <h3 style={{ fontSize:"1rem", fontWeight:700, marginBottom:"0.3rem" }}>{unit.title}</h3>
                      <div style={{ display:"flex", gap:"1rem", fontSize:"0.8rem", color:"var(--text-light)" }}>
                        <span>⏱️ {unit.duration}</span>
                        <span>❓ {unit.questions} questions</span>
                        <span style={{ background:lv.bg, color:lv.color, padding:"0.15rem 0.6rem", borderRadius:6, fontWeight:600 }}>{lv.label}</span>
                      </div>
                    </div>
                    <span style={{ color:"var(--text-light)", transform:isOpen?"rotate(180deg)":"rotate(0)", transition:"transform 0.3s", fontSize:"1.2rem" }}>▾</span>
                  </div>
                  {isOpen && (
                    <div style={{ borderTop:"1px solid var(--border)", padding:"2rem" }}>
                      <div style={{ background:"var(--bg)", borderRadius:12, padding:"1.25rem", marginBottom:"1.5rem" }}>
                        <p style={{ color:"var(--text-light)", fontSize:"0.93rem", lineHeight:1.8 }}>This unit covers key competencies for Canadian PSW practice. Complete the theory section, then test your knowledge with the quiz.</p>
                      </div>
                      <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
                        <button style={{ background:lv.color, color:"white", padding:"0.7rem 1.5rem", borderRadius:10, border:"none", fontWeight:600, cursor:"pointer", fontSize:"0.9rem", fontFamily:"inherit" }}>📖 Study Theory</button>
                        <Link href="/dashboard/quiz/1" style={{ background:lv.bg, color:lv.color, padding:"0.7rem 1.5rem", borderRadius:10, fontWeight:600, fontSize:"0.9rem", textDecoration:"none", display:"inline-block" }}>🧠 Take Quiz →</Link>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <footer style={{ background:"var(--text)", color:"white", padding:"2rem", textAlign:"center" }}>
        <p style={{ opacity:0.5, fontSize:"0.85rem" }}>© 2024 Hanin Care Canada · PSW Training Platform</p>
      </footer>
    </div>
  )
}
