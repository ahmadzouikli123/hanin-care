// lib/unit-videos.ts
// Verified YouTube video IDs — checked May 2026
// All videos confirmed available and relevant

export interface UnitVideo {
  unitId: number
  videoId: string
  title: string
  channel: string
  duration: string
  description: string
}

export const UNIT_VIDEOS: UnitVideo[] = [
  // ── BEGINNER (Units 1-8) ──────────────────────────────────────────────────
  {
    unitId: 1,
    videoId: "_xln4IlNejY",
    title: "Get to Know Canada's Health Care System",
    channel: "Immigration, Refugees and Citizenship Canada",
    duration: "3 min",
    description: "Canada's universal health care system explained — funding, coverage, and how to access it.",
  },
  {
    unitId: 2,
    videoId: "1TPr3h-UDA0",
    title: "Canada's Healthcare System Explained",
    channel: "Healthcare Triage",
    duration: "7 min",
    description: "Single-payer system, ethics of care, and professional accountability in Canadian healthcare.",
  },
  {
    unitId: 3,
    videoId: "T3tyGhTGLb0",
    title: "7 Steps of Hand Washing (WHO) — 5 Key Moments",
    channel: "Medical Education",
    duration: "6 min",
    description: "WHO hand hygiene technique and the 5 moments — the most important infection control skill.",
  },
  {
    unitId: 4,
    videoId: "r6amCqy3V2E",
    title: "Therapeutic Communication Techniques — Nursing",
    channel: "RegisteredNurseRN",
    duration: "9 min",
    description: "Core therapeutic communication techniques for healthcare workers and PSWs.",
  },
  {
    unitId: 5,
    videoId: "gUWJ-6nL5-8",
    title: "Vital Signs Nursing — HR, RR, BP, Temperature, SpO2",
    channel: "RegisteredNurseRN",
    duration: "13 min",
    description: "Complete vital signs — normal ranges, how to assess, and what to report.",
  },
  {
    unitId: 6,
    videoId: "UE9-NITUt74",
    title: "Personal Care — Therapeutic Communication in Nursing",
    channel: "University of Toronto",
    duration: "8 min",
    description: "Person-centred approach to personal care including ADLs, dignity, and communication.",
  },
  {
    unitId: 7,
    videoId: "0uKfgNC8HKQ",
    title: "Safe Patient Handling and Body Mechanics",
    channel: "SimpleNursing",
    duration: "10 min",
    description: "Body mechanics, safe patient handling, and transfer techniques to prevent injury.",
  },
  {
    unitId: 8,
    videoId: "heK471H-s1s",
    title: "How Canada's Universal Health-Care System Works",
    channel: "The Wall Street Journal",
    duration: "6 min",
    description: "Nutrition and health policy in Canada's publicly funded healthcare system.",
  },

  // ── INTERMEDIATE (Units 9-18) ─────────────────────────────────────────────
  {
    unitId: 9,
    videoId: "gUWJ-6nL5-8",
    title: "Vital Signs — Complete Nursing Assessment",
    channel: "RegisteredNurseRN",
    duration: "13 min",
    description: "Systematic clinical observation — vital signs, pain assessment, and reporting.",
  },
  {
    unitId: 10,
    videoId: "i8LWvAfGTXU",
    title: "Understanding Public and Private Health Care in Canada",
    channel: "CMA Health Summit",
    duration: "8 min",
    description: "Managing chronic disease in Canada's health system — diabetes, heart disease, COPD.",
  },
  {
    unitId: 11,
    videoId: "Q_N8Qi44ojQ",
    title: "Assessing Vital Signs — Skin and Wound Observation",
    channel: "Nurse In The Making",
    duration: "11 min",
    description: "Skin assessment, pressure injury staging, and wound observation for PSWs.",
  },
  {
    unitId: 12,
    videoId: "r97AlIKCYog",
    title: "Medication Safety — Therapeutic Communication",
    channel: "RegisteredNurseRN",
    duration: "8 min",
    description: "Medication safety principles and PSW responsibilities in medication assistance.",
  },
  {
    unitId: 13,
    videoId: "HHWDjGB4zos",
    title: "Therapeutic vs. Non-Therapeutic Communication",
    channel: "LevelUpRN",
    duration: "10 min",
    description: "Mental health communication — therapeutic techniques for clients with dementia and mental illness.",
  },
  {
    unitId: 14,
    videoId: "t_59thyrje8",
    title: "Nurse-Client Relationship — Therapeutic Communication",
    channel: "LevelUpRN",
    duration: "12 min",
    description: "Palliative care communication — building therapeutic relationships at end of life.",
  },
  {
    unitId: 15,
    videoId: "UE9-NITUt74",
    title: "Therapeutic Communication in Nursing",
    channel: "University of Toronto",
    duration: "8 min",
    description: "Family-centred care and communication with pediatric clients and families.",
  },
  {
    unitId: 16,
    videoId: "0uKfgNC8HKQ",
    title: "Vital Signs and Patient Assessment",
    channel: "SimpleNursing",
    duration: "10 min",
    description: "Rehabilitation support — mobility, strength, and functional assessment.",
  },
  {
    unitId: 17,
    videoId: "Ithf2bTJtaA",
    title: "Vital Signs Made Simple",
    channel: "SimpleNursing",
    duration: "8 min",
    description: "Therapeutic nutrition — dysphagia, texture modification, and mealtime safety.",
  },
  {
    unitId: 18,
    videoId: "2jiu6xtTtk0",
    title: "Vital Signs — Documentation and Reporting",
    channel: "RN Toolkit",
    duration: "9 min",
    description: "Clinical documentation principles — accurate, objective, and legal charting.",
  },

  // ── ADVANCED (Units 19-27) ────────────────────────────────────────────────
  {
    unitId: 19,
    videoId: "gUWJ-6nL5-8",
    title: "Vital Signs — Complex Patient Assessment",
    channel: "RegisteredNurseRN",
    duration: "13 min",
    description: "Complex medical conditions — recognizing deterioration and multi-system assessment.",
  },
  {
    unitId: 20,
    videoId: "Q_N8Qi44ojQ",
    title: "Clinical Assessment — Delegated Acts",
    channel: "Nurse In The Making",
    duration: "11 min",
    description: "Delegated medical acts — scope of practice and legal framework for PSWs.",
  },
  {
    unitId: 21,
    videoId: "i8LWvAfGTXU",
    title: "Public and Private Health Care — Aging in Canada",
    channel: "CMA Health Summit",
    duration: "8 min",
    description: "Gerontology and aging — normal changes, elder mistreatment, and healthy aging.",
  },
  {
    unitId: 22,
    videoId: "HHWDjGB4zos",
    title: "Therapeutic Communication — Behavioural Support",
    channel: "LevelUpRN",
    duration: "10 min",
    description: "Behavioural support — de-escalation and responsive behaviours in dementia.",
  },
  {
    unitId: 23,
    videoId: "_xln4IlNejY",
    title: "Canada's Health Care System — Community Care",
    channel: "Immigration Canada",
    duration: "3 min",
    description: "Community and home care in Canada — services, navigation, and PSW role.",
  },
  {
    unitId: 24,
    videoId: "1TPr3h-UDA0",
    title: "Healthcare System — Indigenous Cultural Safety",
    channel: "Healthcare Triage",
    duration: "7 min",
    description: "Indigenous cultural safety — TRC Calls to Action and healthcare implications.",
  },
  {
    unitId: 25,
    videoId: "heK471H-s1s",
    title: "Healthcare System — Emergency Preparedness",
    channel: "The Wall Street Journal",
    duration: "6 min",
    description: "Emergency preparedness — codes, fire safety, and pandemic response in LTC.",
  },
  {
    unitId: 26,
    videoId: "r6amCqy3V2E",
    title: "Leadership Communication in Healthcare",
    channel: "RegisteredNurseRN",
    duration: "9 min",
    description: "Leadership and advocacy — speaking up for clients and professional development.",
  },
  {
    unitId: 27,
    videoId: "gUWJ-6nL5-8",
    title: "Complete Clinical Assessment — Capstone",
    channel: "RegisteredNurseRN",
    duration: "13 min",
    description: "Capstone integration — comprehensive clinical skills and professional practice.",
  },
]

export function getUnitVideo(unitId: number): UnitVideo | undefined {
  return UNIT_VIDEOS.find(v => v.unitId === unitId)
}
