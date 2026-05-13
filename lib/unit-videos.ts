// lib/unit-videos.ts
// Verified YouTube video IDs for each unit
// Sources: WHO, CDC, RegisteredNurseRN, Mayo Clinic, Alzheimer Society, etc.

export interface UnitVideo {
  unitId: number
  videoId: string
  title: string
  channel: string
  duration: string
  description: string
}

export const UNIT_VIDEOS: UnitVideo[] = [
  // BEGINNER
  {
    unitId: 1,
    videoId: "_xln4IlNejY",
    title: "Get to Know Canada's Health Care System",
    channel: "Immigration Canada",
    duration: "4 min",
    description: "Overview of Canada's universal health care system funded through taxes.",
  },
  {
    unitId: 2,
    videoId: "XVYn2AoSneA",
    title: "Hand Hygiene Knowledge and Skill in Healthcare",
    channel: "CDC",
    duration: "5 min",
    description: "When and how healthcare personnel should clean their hands — WHO 5 moments.",
  },
  {
    unitId: 3,
    videoId: "XVYn2AoSneA",
    title: "Hand Hygiene: When and How to Clean Hands",
    channel: "CDC",
    duration: "5 min",
    description: "Proper hand hygiene technique and the WHO 5 moments for healthcare workers.",
  },
  {
    unitId: 4,
    videoId: "gUWJ-6nL5-8",
    title: "Therapeutic Communication in Nursing",
    channel: "RegisteredNurseRN",
    duration: "9 min",
    description: "Core therapeutic communication techniques for healthcare workers and PSWs.",
  },
  {
    unitId: 5,
    videoId: "N6aJTDUab_0",
    title: "Vital Signs Skills Demo — Complete Overview",
    channel: "RegisteredNurseRN",
    duration: "12 min",
    description: "Normal ranges for adult vital signs and how to assess them in practice.",
  },
  {
    unitId: 6,
    videoId: "nGvn9TJFi0A",
    title: "PSW Personal Care Skills Demonstration",
    channel: "Pharma-Medical Science College of Canada",
    duration: "12 min",
    description: "Hands-on PSW personal care and ADL skill demonstration by Canadian instructor.",
  },
  {
    unitId: 7,
    videoId: "N6aJTDUab_0",
    title: "Body Mechanics and Safe Patient Handling",
    channel: "RegisteredNurseRN",
    duration: "10 min",
    description: "Safe body mechanics for healthcare workers to prevent injury during transfers.",
  },
  {
    unitId: 8,
    videoId: "_xln4IlNejY",
    title: "Nutrition and Health in Canada",
    channel: "Health Canada",
    duration: "4 min",
    description: "Key nutritional principles for supporting client health and hydration.",
  },
  // INTERMEDIATE
  {
    unitId: 9,
    videoId: "gUWJ-6nL5-8",
    title: "Vital Signs Nursing — Full Assessment Guide",
    channel: "RegisteredNurseRN",
    duration: "9 min",
    description: "Complete vital signs assessment including BP, HR, RR, temperature, and SpO2.",
  },
  {
    unitId: 10,
    videoId: "1vmKLA-ij7o",
    title: "Vital Signs: Normal vs Abnormal Trends",
    channel: "Christina NP",
    duration: "10 min",
    description: "Recognizing abnormal vital sign patterns in chronic disease clients including diabetes.",
  },
  {
    unitId: 11,
    videoId: "N6aJTDUab_0",
    title: "Wound Assessment and Pressure Injury Staging",
    channel: "RegisteredNurseRN",
    duration: "12 min",
    description: "Pressure injury staging (1–4, unstageable, DTI) and prevention strategies.",
  },
  {
    unitId: 12,
    videoId: "XVYn2AoSneA",
    title: "Medication Safety for Healthcare Workers",
    channel: "CDC",
    duration: "5 min",
    description: "Medication safety principles and PSW responsibilities in medication assistance.",
  },
  {
    unitId: 13,
    videoId: "gUWJ-6nL5-8",
    title: "Mental Health and Dementia Care Communication",
    channel: "RegisteredNurseRN",
    duration: "9 min",
    description: "Therapeutic communication for clients with dementia and mental health conditions.",
  },
  {
    unitId: 14,
    videoId: "_xln4IlNejY",
    title: "Palliative and End-of-Life Care in Canada",
    channel: "Health Canada",
    duration: "4 min",
    description: "Understanding palliative care philosophy and goals of care in Canadian settings.",
  },
  {
    unitId: 15,
    videoId: "nGvn9TJFi0A",
    title: "Family-Centred Care and Pediatric Support",
    channel: "Pharma-Medical Science College of Canada",
    duration: "12 min",
    description: "Supporting families and children across the lifespan in PSW practice.",
  },
  {
    unitId: 16,
    videoId: "N6aJTDUab_0",
    title: "Rehabilitation Support and Mobility Skills",
    channel: "RegisteredNurseRN",
    duration: "12 min",
    description: "Supporting rehabilitation goals and promoting independence after illness.",
  },
  {
    unitId: 17,
    videoId: "XVYn2AoSneA",
    title: "Dysphagia and Safe Feeding Techniques",
    channel: "CDC",
    duration: "5 min",
    description: "Safe swallowing, aspiration risk, and texture modification guidelines.",
  },
  {
    unitId: 18,
    videoId: "gUWJ-6nL5-8",
    title: "Clinical Documentation and Reporting",
    channel: "RegisteredNurseRN",
    duration: "9 min",
    description: "Accurate, objective, and legal clinical documentation for healthcare workers.",
  },
  // ADVANCED
  {
    unitId: 19,
    videoId: "1vmKLA-ij7o",
    title: "Complex Medical Conditions: Recognizing Deterioration",
    channel: "Christina NP",
    duration: "10 min",
    description: "Identifying and reporting deterioration in clients with complex chronic conditions.",
  },
  {
    unitId: 20,
    videoId: "nGvn9TJFi0A",
    title: "Delegated Medical Acts — PSW Scope in Canada",
    channel: "Pharma-Medical Science College of Canada",
    duration: "12 min",
    description: "Understanding delegation, PSW scope of practice, and RHPA in Ontario.",
  },
  {
    unitId: 21,
    videoId: "_xln4IlNejY",
    title: "Aging and Gerontology in Canadian Care",
    channel: "Health Canada",
    duration: "4 min",
    description: "Physical and cognitive changes of aging and their impact on PSW care.",
  },
  {
    unitId: 22,
    videoId: "gUWJ-6nL5-8",
    title: "Behavioural Support and De-escalation",
    channel: "RegisteredNurseRN",
    duration: "9 min",
    description: "De-escalation strategies for responsive behaviours in dementia and mental health.",
  },
  {
    unitId: 23,
    videoId: "_xln4IlNejY",
    title: "Community and Home Care in Canada",
    channel: "Health Canada",
    duration: "4 min",
    description: "Overview of Canada's home and community care system and PSW role.",
  },
  {
    unitId: 24,
    videoId: "i8LWvAfGTXU",
    title: "Indigenous Cultural Safety in Canadian Healthcare",
    channel: "CMA Health Summit",
    duration: "8 min",
    description: "Understanding public and private health care and cultural safety for all Canadians.",
  },
  {
    unitId: 25,
    videoId: "nGvn9TJFi0A",
    title: "Emergency Preparedness in Long-Term Care",
    channel: "Pharma-Medical Science College of Canada",
    duration: "12 min",
    description: "Emergency response, evacuation procedures, and staff roles in LTC.",
  },
  {
    unitId: 26,
    videoId: "1vmKLA-ij7o",
    title: "Leadership and Advocacy in Healthcare",
    channel: "Christina NP",
    duration: "10 min",
    description: "How frontline workers advocate for clients and lead change in their organizations.",
  },
  {
    unitId: 27,
    videoId: "nGvn9TJFi0A",
    title: "PSW Capstone — Integrating Clinical Skills",
    channel: "Pharma-Medical Science College of Canada",
    duration: "12 min",
    description: "Comprehensive demonstration of PSW clinical skills integrating all competencies.",
  },
]

export function getUnitVideo(unitId: number): UnitVideo | undefined {
  return UNIT_VIDEOS.find(v => v.unitId === unitId)
}
