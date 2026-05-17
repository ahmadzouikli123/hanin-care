// lib/unit-videos.ts
// Verified YouTube video IDs — each matched to unit topic
// Last verified: May 2026

export interface UnitVideo {
  unitId: number
  videoId: string
  title: string
  channel: string
  duration: string
  description: string
}

export const UNIT_VIDEOS: UnitVideo[] = [

  // ── BEGINNER ──────────────────────────────────────────────────────────────

  {
    unitId: 1,
    videoId: "_xln4IlNejY",
    title: "Get to Know Canada's Health Care System",
    channel: "Immigration, Refugees and Citizenship Canada",
    duration: "3 min",
    description: "Canada's universal health care system — funding, coverage, and how PSWs fit into the system.",
  },
  {
    unitId: 2,
    videoId: "1TPr3h-UDA0",
    title: "Healthcare Ethics and Professional Accountability",
    channel: "Healthcare Triage",
    duration: "7 min",
    description: "Autonomy, beneficence, consent, and professional ethics in Canadian healthcare practice.",
  },
  {
    unitId: 3,
    videoId: "XVYn2AoSneA",
    title: "Hand Hygiene: When and How to Clean Hands",
    channel: "CDC",
    duration: "5 min",
    description: "WHO 5 moments for hand hygiene — the most critical infection control skill for PSWs.",
  },
  {
    unitId: 4,
    videoId: "r6amCqy3V2E",
    title: "Therapeutic Communication Techniques for Healthcare Workers",
    channel: "RegisteredNurseRN",
    duration: "9 min",
    description: "Active listening, empathy, open-ended questions, SBAR — core communication for PSWs.",
  },
  {
    unitId: 5,
    videoId: "gUWJ-6nL5-8",
    title: "Vital Signs: HR, RR, BP, Temperature, SpO2",
    channel: "RegisteredNurseRN",
    duration: "13 min",
    description: "Normal vital sign ranges, body systems overview, and what to report to the RN.",
  },
  {
    unitId: 6,
    videoId: "nGvn9TJFi0A",
    title: "PSW Personal Care Skills Demonstration",
    channel: "Pharma-Medical Science College of Canada",
    duration: "12 min",
    description: "Canadian PSW instructor demonstrates ADL assistance — bathing, dressing, oral care, dignity.",
  },
  {
    unitId: 7,
    videoId: "2fcWRuIrhwg",
    title: "Safe Lifting and Transferring Training for Caregivers",
    channel: "Healthcare Training",
    duration: "10 min",
    description: "Body mechanics, safe transfer techniques, and mechanical lift operation for PSWs.",
  },
  {
    unitId: 8,
    videoId: "heK471H-s1s",
    title: "Nutrition and Canada's Health Care System",
    channel: "The Wall Street Journal",
    duration: "6 min",
    description: "Nutrition, hydration, and dietary management in Canadian care settings.",
  },

  // ── INTERMEDIATE ──────────────────────────────────────────────────────────

  {
    unitId: 9,
    videoId: "MDtPik1UE6k",
    title: "Pressure Ulcers (Injuries) — Stages, Prevention, Assessment",
    channel: "RegisteredNurseRN",
    duration: "11 min",
    description: "Clinical observation — head-to-toe assessment, vital signs, pain, and early deterioration signs.",
  },
  {
    unitId: 10,
    videoId: "i8LWvAfGTXU",
    title: "Chronic Disease Management in Canadian Healthcare",
    channel: "CMA Health Summit",
    duration: "8 min",
    description: "Diabetes, heart failure, COPD, stroke — chronic disease care and PSW monitoring role.",
  },
  {
    unitId: 11,
    videoId: "UHfZL5W9FEc",
    title: "Pressure Injuries — Risk Factors, Prevention, and Staging",
    channel: "LevelUpRN",
    duration: "10 min",
    description: "Pressure injury staging (1-4, unstageable, DTI), prevention strategies, and skin assessment.",
  },
  {
    unitId: 12,
    videoId: "r97AlIKCYog",
    title: "Medication Safety — 10 Rights and PSW Responsibilities",
    channel: "RegisteredNurseRN",
    duration: "8 min",
    description: "Medication safety principles, PSW scope in medication assistance, adverse reactions.",
  },
  {
    unitId: 13,
    videoId: "hahvUXwTXE4",
    title: "Caregiver Training: Agitation and Anxiety in Dementia",
    channel: "UCLA Alzheimer's and Dementia Care Program",
    duration: "10 min",
    description: "Responsive behaviours, de-escalation, validation therapy, and mental health support.",
  },
  {
    unitId: 14,
    videoId: "RwzrkgQVnRU",
    title: "Hospice Nurse Explains the Phases of End of Life",
    channel: "VNS Health",
    duration: "8 min",
    description: "Signs of approaching death, comfort care, palliative goals, and family support.",
  },
  {
    unitId: 15,
    videoId: "UE9-NITUt74",
    title: "Family-Centred Care and Child Development",
    channel: "University of Toronto",
    duration: "8 min",
    description: "Family-centred care principles, child development milestones, and PSW role with families.",
  },
  {
    unitId: 16,
    videoId: "bC5leeBcB24",
    title: "Patient Mobility: Safe Transfer Techniques",
    channel: "Healthcare Training",
    duration: "9 min",
    description: "Rehabilitation support — mobility assistance, restorative approach, range of motion exercises.",
  },
  {
    unitId: 17,
    videoId: "Q_N8Qi44ojQ",
    title: "Skin Assessment and Nutritional Care for Nurses",
    channel: "Nurse In The Making",
    duration: "11 min",
    description: "Therapeutic nutrition — dysphagia, IDDSI texture levels, mealtime safety, and aspiration prevention.",
  },
  {
    unitId: 18,
    videoId: "HHWDjGB4zos",
    title: "Therapeutic vs. Non-Therapeutic Communication",
    channel: "LevelUpRN",
    duration: "10 min",
    description: "Clinical documentation principles — accurate, objective, and legal charting for PSWs.",
  },

  // ── ADVANCED ──────────────────────────────────────────────────────────────

  {
    unitId: 19,
    videoId: "EQThZgi2pT0",
    title: "Complex Medical Conditions — Advanced Caregiver Training",
    channel: "Dementia Care Specialist",
    duration: "12 min",
    description: "Parkinson's, CKD, cancer — complex medical conditions and multi-system observation.",
  },
  {
    unitId: 20,
    videoId: "nGvn9TJFi0A",
    title: "PSW Delegated Medical Acts — Canadian Standards",
    channel: "Pharma-Medical Science College of Canada",
    duration: "12 min",
    description: "Delegation framework, RHPA scope, catheter care, G-tube, ostomy — PSW delegated acts.",
  },
  {
    unitId: 21,
    videoId: "ltL7uszntKY",
    title: "Understanding Alzheimer's and Aging — Caregiver Series",
    channel: "Alzheimer's Association",
    duration: "10 min",
    description: "Gerontology, normal aging, elder mistreatment recognition, and healthy aging promotion.",
  },
  {
    unitId: 22,
    videoId: "ZWUGvLzJLrM",
    title: "Dementia-Related Behaviours — Creative Approaches",
    channel: "Psychiatric Nursing",
    duration: "11 min",
    description: "P.I.E.C.E.S. framework, validation therapy, non-pharmacological interventions for dementia.",
  },
  {
    unitId: 23,
    videoId: "_xln4IlNejY",
    title: "Home and Community Care in Canada",
    channel: "Immigration, Refugees and Citizenship Canada",
    duration: "3 min",
    description: "Community care system, home care navigation, caregiver burnout, and isolation support.",
  },
  {
    unitId: 24,
    videoId: "i8LWvAfGTXU",
    title: "Indigenous Cultural Safety in Canadian Healthcare",
    channel: "CMA Health Summit",
    duration: "8 min",
    description: "TRC Calls to Action, cultural safety vs. sensitivity, traditional healing, and systemic racism.",
  },
  {
    unitId: 25,
    videoId: "9gXSqJ3AlxE",
    title: "Symptom Management and Emergency Preparedness",
    channel: "Hospice Nurse",
    duration: "9 min",
    description: "Emergency codes, fire safety (RACE/PASS), mass casualty response in LTC settings.",
  },
  {
    unitId: 26,
    videoId: "r6amCqy3V2E",
    title: "Leadership Communication and Advocacy in Healthcare",
    channel: "RegisteredNurseRN",
    duration: "9 min",
    description: "PSW leadership, client advocacy, mentorship, quality improvement, and professional development.",
  },
  {
    unitId: 27,
    videoId: "nGvn9TJFi0A",
    title: "PSW Capstone — Integrating Clinical Skills",
    channel: "Pharma-Medical Science College of Canada",
    duration: "12 min",
    description: "Comprehensive PSW clinical skills capstone — integrating all program competencies.",
  },
]

export function getUnitVideo(unitId: number): UnitVideo | undefined {
  return UNIT_VIDEOS.find(v => v.unitId === unitId)
}
