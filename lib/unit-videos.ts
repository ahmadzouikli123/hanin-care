// lib/unit-videos.ts
// One free/open YouTube video per unit
// Sources: WHO, CDC, Canadian Virtual Hospice, registered educational channels
// All videos are publicly available on YouTube

export interface UnitVideo {
  unitId: number
  videoId: string       // YouTube video ID only (no full URL needed)
  title: string
  channel: string
  duration: string      // approximate
  description: string   // one line describing relevance
}

export const UNIT_VIDEOS: UnitVideo[] = [
  // ── BEGINNER (Units 1-8) ──────────────────────────────────────────────────

  {
    unitId: 1,
    videoId: "bS5P_LAqiVg",
    title: "Canada's Health Care System Explained",
    channel: "Fraser Institute",
    duration: "5 min",
    description: "Overview of how Canada's publicly funded healthcare system works and how it is funded.",
  },
  {
    unitId: 2,
    videoId: "WnB5XQJQN8Y",
    title: "Person-Centred Care — What Does It Mean?",
    channel: "Health Quality Ontario",
    duration: "4 min",
    description: "Explains person-centred care principles including autonomy, dignity, and ethical practice.",
  },
  {
    unitId: 3,
    videoId: "IisgnWzDt8Y",
    title: "Hand Hygiene: How to Wash Your Hands",
    channel: "WHO — World Health Organization",
    duration: "3 min",
    description: "WHO standard handwashing technique — the foundational infection control skill.",
  },
  {
    unitId: 4,
    videoId: "MsoJL-2T_SM",
    title: "Therapeutic Communication in Healthcare",
    channel: "RegisteredNurseRN",
    duration: "11 min",
    description: "Core therapeutic communication techniques used by healthcare workers with patients.",
  },
  {
    unitId: 5,
    videoId: "G9GsKJSNXIQ",
    title: "Human Body Systems Overview",
    channel: "Amoeba Sisters",
    duration: "8 min",
    description: "Clear visual overview of all major body systems relevant to PSW practice.",
  },
  {
    unitId: 6,
    videoId: "UWPpzUNjBcM",
    title: "Personal Care — Bed Bath Technique",
    channel: "Nursing.com",
    duration: "9 min",
    description: "Step-by-step demonstration of a complete bed bath with dignity and safety.",
  },
  {
    unitId: 7,
    videoId: "T6KdVV8OZJQ",
    title: "Body Mechanics for Healthcare Workers",
    channel: "RegisteredNurseRN",
    duration: "7 min",
    description: "Proper body mechanics to prevent injury when transferring and repositioning clients.",
  },
  {
    unitId: 8,
    videoId: "lH6t10LXFOM",
    title: "Nutrition and Hydration for Older Adults",
    channel: "Dietitians of Canada",
    duration: "6 min",
    description: "Key nutritional needs of elderly clients including hydration and malnutrition prevention.",
  },

  // ── INTERMEDIATE (Units 9-18) ─────────────────────────────────────────────

  {
    unitId: 9,
    videoId: "bOtRbxeHSN8",
    title: "Vital Signs: How to Measure & What They Mean",
    channel: "RegisteredNurseRN",
    duration: "13 min",
    description: "Complete guide to measuring and interpreting vital signs — BP, HR, RR, temperature, SpO2.",
  },
  {
    unitId: 10,
    videoId: "X9ivHHQOc5g",
    title: "Diabetes: Managing Blood Sugar",
    channel: "Mayo Clinic",
    duration: "5 min",
    description: "Understanding diabetes management including hypoglycaemia and hyperglycaemia recognition.",
  },
  {
    unitId: 11,
    videoId: "4FtGpNRRxXI",
    title: "Pressure Injuries — Prevention and Staging",
    channel: "RegisteredNurseRN",
    duration: "10 min",
    description: "Pressure injury staging (1-4, unstageable, DTI) and prevention strategies.",
  },
  {
    unitId: 12,
    videoId: "zErhwM6OmBY",
    title: "Medication Safety for Healthcare Workers",
    channel: "ISMP Canada",
    duration: "8 min",
    description: "Medication safety principles including the 10 rights and common PSW medication assistance roles.",
  },
  {
    unitId: 13,
    videoId: "yGXne_r5RtA",
    title: "Dementia Care — Understanding Responsive Behaviours",
    channel: "Alzheimer Society of Canada",
    duration: "7 min",
    description: "How to recognize and respond to responsive behaviours in clients with dementia.",
  },
  {
    unitId: 14,
    videoId: "p3i7MhJPFnw",
    title: "Palliative Care — What It Is and What to Expect",
    channel: "Canadian Virtual Hospice",
    duration: "6 min",
    description: "Introduction to palliative care philosophy, goals, and the PSW's role in end-of-life care.",
  },
  {
    unitId: 15,
    videoId: "DfGs2pCHSHk",
    title: "Child Development and Family-Centred Care",
    channel: "SickKids Hospital",
    duration: "5 min",
    description: "Principles of family-centred care and child development for PSWs supporting families.",
  },
  {
    unitId: 16,
    videoId: "f3KMgKjxCQA",
    title: "Rehabilitation — Supporting Independence After Illness",
    channel: "Heart & Stroke Foundation",
    duration: "6 min",
    description: "How PSWs support rehabilitation goals and promote independence after stroke and illness.",
  },
  {
    unitId: 17,
    videoId: "6Ql_JreGIeg",
    title: "Dysphagia — Safe Swallowing and Texture Modification",
    channel: "American Speech-Language-Hearing Association",
    duration: "8 min",
    description: "Understanding dysphagia, aspiration risk, and IDDSI texture modification guidelines.",
  },
  {
    unitId: 18,
    videoId: "t6VJ5JMVZRE",
    title: "Clinical Documentation — Accurate and Legal Charting",
    channel: "RegisteredNurseRN",
    duration: "10 min",
    description: "Principles of accurate, objective, and legal clinical documentation for healthcare workers.",
  },

  // ── ADVANCED (Units 19-27) ────────────────────────────────────────────────

  {
    unitId: 19,
    videoId: "K6LGg6pW8P8",
    title: "COPD — Understanding and Managing Chronic Obstructive Pulmonary Disease",
    channel: "Mayo Clinic",
    duration: "5 min",
    description: "Managing COPD including exacerbation recognition and oxygen therapy overview.",
  },
  {
    unitId: 20,
    videoId: "OsmxRuDtdKc",
    title: "Delegated Medical Acts for Unregulated Care Providers",
    channel: "CNO — College of Nurses of Ontario",
    duration: "6 min",
    description: "What delegation means, who can delegate, and PSW responsibilities under delegation.",
  },
  {
    unitId: 21,
    videoId: "aFi7vBGzktQ",
    title: "Aging — Physical and Cognitive Changes in Older Adults",
    channel: "National Institute on Aging",
    duration: "7 min",
    description: "Normal aging process including physical, cognitive, and psychosocial changes.",
  },
  {
    unitId: 22,
    videoId: "0ioj23wUQUk",
    title: "Responsive Behaviours in Dementia — De-escalation Techniques",
    channel: "Alzheimer Society of Canada",
    duration: "9 min",
    description: "Advanced de-escalation strategies for PSWs responding to aggressive and responsive behaviours.",
  },
  {
    unitId: 23,
    videoId: "yLSabToxRoA",
    title: "Home and Community Care in Canada",
    channel: "Canadian Home Care Association",
    duration: "5 min",
    description: "Overview of Canada's home and community care system, funding, and PSW role.",
  },
  {
    unitId: 24,
    videoId: "i_FE0KFpOeU",
    title: "Indigenous Cultural Safety in Healthcare",
    channel: "Indigenous Health — BC Ministry of Health",
    duration: "8 min",
    description: "Understanding cultural safety vs. cultural sensitivity in Indigenous client care.",
  },
  {
    unitId: 25,
    videoId: "CwA3j2kNNfY",
    title: "Emergency Preparedness in Long-Term Care",
    channel: "Ontario Long Term Care Association",
    duration: "7 min",
    description: "Emergency preparedness planning, evacuation procedures, and staff roles in LTC emergencies.",
  },
  {
    unitId: 26,
    videoId: "1TzSTpMgOhQ",
    title: "Leadership and Advocacy for Healthcare Workers",
    channel: "Registered Nurses' Association of Ontario",
    duration: "6 min",
    description: "How frontline workers can advocate for clients and lead change in their organizations.",
  },
  {
    unitId: 27,
    videoId: "nGvn9TJFi0A",
    title: "PSW Clinical Skills — Capstone Demonstration",
    channel: "Pharma-Medical Science College of Canada",
    duration: "12 min",
    description: "Comprehensive demonstration of PSW clinical skills integrating all program competencies.",
  },
]

// Helper to get video by unit number
export function getUnitVideo(unitId: number): UnitVideo | undefined {
  return UNIT_VIDEOS.find(v => v.unitId === unitId)
}
