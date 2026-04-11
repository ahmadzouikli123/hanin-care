// lib/curriculum-data.ts
// Real curriculum content extracted from hanin_v2.html & hanin_curriculum.html

export interface TheoryBlock {
  type: "heading"|"paragraph"|"list"|"infobox"|"table"|"badges"|"practical"
  content?: string
  title?: string
  variant?: "blue"|"green"|"red"|"amber"|"purple"
  items?: string[]
  headers?: string[]
  rows?: string[][]
  steps?: { title: string; desc: string; tag: string }[]
}

export interface QuizQuestion {
  text: string
  diff: "easy"|"medium"|"hard"
  options: { l: string; t: string }[]
  correct: string
  exp: string
  ref?: string
}

export interface CaseStudy {
  icon: string
  title: string
  subtitle: string
  profile: { label: string; value: string }[]
  scenario: string
  questions: { q: string; options: { l: string; t: string }[]; correct: string; exp: string }[]
  reflections: string[]
}

export interface Unit {
  id: number
  level: "beginner"|"intermediate"|"advanced"
  title: string
  duration: string
  lectures: number
  theory: TheoryBlock[]
  quiz: QuizQuestion[]
  caseStudy?: CaseStudy
}

export const UNITS: Unit[] = [
  // ══════════════════════════════════════════════
  //  UNIT 1 — Canadian Healthcare System
  // ══════════════════════════════════════════════
  {
    id: 1,
    level: "beginner",
    title: "Unit 1 — The Canadian Healthcare System",
    duration: "20 hours",
    lectures: 8,
    theory: [
      {
        type: "heading",
        content: "The Canada Health Act (1984)"
      },
      {
        type: "paragraph",
        content: "The Canada Health Act is the federal legislation governing publicly funded health insurance programs in Canada. It establishes five criteria that provinces and territories must meet to receive full federal health transfer funding."
      },
      {
        type: "list",
        items: [
          "<strong>Public Administration:</strong> Health insurance plans must be administered on a non-profit basis by a public authority accountable to the provincial/territorial government.",
          "<strong>Comprehensiveness:</strong> All medically necessary hospital and physician services must be insured, including surgical procedures, anesthesia, and diagnostic services.",
          "<strong>Universality:</strong> All insured residents are entitled to insured health services on uniform terms and conditions. No discrimination based on health status, income, or other factors.",
          "<strong>Portability:</strong> Coverage must be maintained when a resident moves to another province or travels outside Canada (with limitations for out-of-country coverage).",
          "<strong>Accessibility:</strong> Reasonable access to insured services must not be impeded by financial charges or other barriers."
        ]
      },
      {
        type: "infobox",
        variant: "blue",
        title: "💡 PSW Context",
        content: "While PSW services are not directly covered under the Canada Health Act, understanding this framework helps PSWs navigate the system, advocate for clients' rights, and understand funding structures for community and long-term care services which ARE publicly funded under provincial legislation."
      },
      {
        type: "heading",
        content: "Provincial Healthcare Legislation"
      },
      {
        type: "list",
        items: [
          "<strong>Ontario — Fixing Long-Term Care Act (FLTCA), 2021:</strong> Governs standards, staffing, residents' rights, and inspection of LTC homes. Mandates minimum average of 4 hours of direct care per resident per day.",
          "<strong>Ontario — Retirement Homes Act, 2010:</strong> Administered by RHRA. Governs care and safety standards in retirement homes. Resident rights include freedom from abuse, privacy, participation in care planning.",
          "<strong>British Columbia — Community Care and Assisted Living Act:</strong> Regulates community care facilities and assisted living residences.",
          "<strong>Alberta — Continuing Care Health Service Standards:</strong> Sets minimum standards for continuing care, including personal care, nursing care, and supportive living.",
          "<strong>All Provinces — Health Information Protection Acts:</strong> Each province has legislation protecting personal health information (Ontario PHIPA, BC PIPA, Alberta HIA)."
        ]
      },
      {
        type: "heading",
        content: "The Healthcare Team & Circle of Care"
      },
      {
        type: "table",
        headers: ["Provider", "Role & Scope", "PSW Interaction"],
        rows: [
          ["<strong>Registered Nurse (RN)</strong>", "Assessment, care planning, delegating controlled acts, medication administration", "Receive delegated tasks, report observations"],
          ["<strong>Registered Practical Nurse (RPN)</strong>", "Routine nursing care in stable environments, limited delegation", "Report changes in condition, receive instructions"],
          ["<strong>Physician / NP</strong>", "Diagnosis, prescriptions, treatment orders", "No direct orders to PSW — must go through RN/RPN"],
          ["<strong>Physiotherapist (PT)</strong>", "Mobility assessment, exercise programs, equipment recommendations", "Carry out prescribed exercise programs, use recommended equipment"],
          ["<strong>Occupational Therapist (OT)</strong>", "ADL assessment, adaptive equipment, home modification", "Use recommended adaptive strategies and devices"],
          ["<strong>Dietitian (RD)</strong>", "Nutrition assessment, therapeutic diet orders, texture modification", "Follow prescribed diets, report intake issues"],
          ["<strong>PSW</strong>", "ADL assistance, personal care, observation, companion care", "Implements care plan, reports to RN/supervisor"]
        ]
      },
      {
        type: "heading",
        content: "Care Settings in Canada"
      },
      {
        type: "list",
        items: [
          "<strong>Acute Care / Hospitals:</strong> Short-term, high-intensity care. PSWs may work as hospital unit aides under close RN supervision.",
          "<strong>Long-Term Care (LTC) Homes:</strong> 24/7 residential care for people who can no longer live independently. Regulated by provincial legislation.",
          "<strong>Retirement Homes:</strong> Hospitality-plus model with optional care services. Less regulated medically than LTC.",
          "<strong>Community / Home Care:</strong> Services delivered in the client's own home. Highest growth area for PSWs.",
          "<strong>Assisted Living / Supportive Housing:</strong> Semi-independent living with available support services.",
          "<strong>Adult Day Programs:</strong> Daytime programs providing social activity and therapeutic support while families work."
        ]
      },
      {
        type: "heading",
        content: "PSW Regulation — HSCPOA (Ontario)"
      },
      {
        type: "paragraph",
        content: "The Health and Supportive Care Providers Oversight Authority (HSCPOA) is Ontario's regulatory body for PSWs, home health aides, and other unregulated care providers. It maintains a public register, sets entry-to-practice requirements, investigates complaints, and takes disciplinary action."
      },
      {
        type: "badges",
        items: ["Canada Health Act 1984", "FLTCA 2021 (Ontario)", "HSCPOA Standards", "BC CCALA"]
      },
      {
        type: "practical",
        steps: [
          { title: "Identify care team members and reporting structure", desc: "Given a scenario, correctly identify who to report specific observations to (e.g., new skin breakdown → RPN/RN; client wants to add family to care plan → Social Worker).", tag: "Core Competency" },
          { title: "Navigate a client care plan", desc: "Read and interpret a sample care plan, identifying: care goals, scheduled interventions, dietary orders, mobility precautions, and who authorized each element.", tag: "Core Competency" },
          { title: "Recognize scope of practice boundaries", desc: "Role-play three scenarios where you are asked to perform tasks outside PSW scope (e.g., adjust oxygen, administer medication, change a wound dressing). Demonstrate appropriate refusal and escalation.", tag: "Must Pass" }
        ]
      }
    ],
    quiz: [
      {
        text: "Under the Canada Health Act, which criterion ensures that all eligible residents receive insured services regardless of income or health status?",
        diff: "easy",
        options: [{ l:"A", t:"Portability" },{ l:"B", t:"Comprehensiveness" },{ l:"C", t:"Universality" },{ l:"D", t:"Accessibility" }],
        correct: "C",
        exp: "Universality ensures that all insured residents receive health services on uniform terms. No discrimination based on income, age, health status, or other factors is permitted under the Canada Health Act.",
        ref: "Canada Health Act, 1984, Section 10"
      },
      {
        text: "A client in a Long-Term Care home in Ontario asks you to increase their oxygen flow rate because they feel short of breath. What is your MOST appropriate action?",
        diff: "medium",
        options: [{ l:"A", t:"Increase the flow rate by 1L/min since the client is requesting it" },{ l:"B", t:"Do not adjust the oxygen rate; reposition the client upright, assess SpO2, and notify the RN immediately using SBAR" },{ l:"C", t:"Ask the client's family member to decide whether to increase the rate" },{ l:"D", t:"Document the complaint and address it at the next care team meeting" }],
        correct: "B",
        exp: "Adjusting oxygen flow rates is a controlled act under the RHPA and is outside PSW scope of practice. The PSW must: (1) position the client upright to maximize respiratory effort, (2) assess oxygen saturation if trained, (3) report immediately to the RN using SBAR.",
        ref: "RHPA Ontario; FLTCA 2021; Scope of Practice Standards"
      },
      {
        text: "In the hierarchy of the healthcare team, who does a PSW report observations and concerns to FIRST?",
        diff: "easy",
        options: [{ l:"A", t:"The attending physician" },{ l:"B", t:"The client's family" },{ l:"C", t:"The charge nurse or supervising RN/RPN" },{ l:"D", t:"The social worker" }],
        correct: "C",
        exp: "PSWs work under the supervision of Regulated Health Professionals. All clinical observations are reported to the charge nurse or supervising RN/RPN first. PSWs do not receive orders directly from physicians.",
        ref: "CNO RPN Practice Standard; PSW Training Standards Ontario"
      },
      {
        text: "The Fixing Long-Term Care Act (FLTCA) 2021 in Ontario mandates a minimum average of how many hours of direct care per resident per day?",
        diff: "medium",
        options: [{ l:"A", t:"2 hours" },{ l:"B", t:"3 hours" },{ l:"C", t:"4 hours" },{ l:"D", t:"6 hours" }],
        correct: "C",
        exp: "The FLTCA 2021 mandates a minimum average of 4 hours of direct care per resident per day (with 0.5 hours from an RN), to be phased in by 2025. This was a major policy reform following the COVID-19 pandemic's impact on Ontario LTC homes.",
        ref: "Fixing Long-Term Care Act, 2021, Ontario"
      },
      {
        text: "Which of the following BEST describes the role of the HSCPOA?",
        diff: "hard",
        options: [{ l:"A", t:"Funding body that pays PSW salaries in Ontario's LTC homes" },{ l:"B", t:"A union representing Personal Support Workers across Canada" },{ l:"C", t:"Ontario's regulatory body that maintains a PSW registry, sets entry-to-practice requirements, and handles complaints and discipline" },{ l:"D", t:"A provincial body that inspects LTC homes for compliance with care standards" }],
        correct: "C",
        exp: "The HSCPOA is Ontario's regulatory authority for PSWs, home health aides, and similar providers. Its functions include: maintaining a public register, setting training standards, investigating complaints, and taking disciplinary action. LTC home inspections are conducted by the Ministry of Long-Term Care.",
        ref: "Health and Supportive Care Providers Oversight Authority Act, 2021"
      }
    ],
    caseStudy: {
      icon: "👵",
      title: "Mrs. Lan Nguyen — New LTC Admission",
      subtitle: "Day 1 of placement — You are the assigned PSW on the afternoon shift",
      profile: [
        { label: "Age", value: "82 years" },
        { label: "Diagnosis", value: "Hip fracture (post-op)" },
        { label: "Language", value: "Vietnamese (limited English)" },
        { label: "Setting", value: "Ontario LTC Home" },
        { label: "SDM", value: "Daughter (on file)" },
        { label: "Code Status", value: "DNR (on file)" }
      ],
      scenario: "Mrs. Nguyen was admitted to your LTC home yesterday following surgery for a right hip fracture. Her daughter Linh informs you that her mother is very anxious about being in a new environment and does not speak much English. Mrs. Nguyen has been pointing to her hip and grimacing since this morning. During your shift, Linh pulls you aside in the hallway and asks you to tell her what medications her mother is taking and whether the surgery went well. Linh says: \"I'm her family — I have the right to know everything.\" A few minutes later, you notice your colleague discussing Mrs. Nguyen's surgery loudly at the nursing station while two visitors for another resident are present nearby.",
      questions: [
        {
          q: "Linh asks you to share her mother's medication list and surgical details in the hallway. What is your BEST response?",
          options: [{ l:"A", t:"Share the information since Linh is the daughter and likely the SDM" },{ l:"B", t:"Refuse to discuss any information and walk away" },{ l:"C", t:"Acknowledge Linh's concern, explain you cannot share health information in the hallway, and direct her to speak with the charge nurse in a private room after confirming her SDM status" },{ l:"D", t:"Give a general overview of the medications but avoid surgical details" }],
          correct: "C",
          exp: "Under PHIPA, health information cannot be shared in public corridors. Even if Linh is the SDM, you must: (1) verify her SDM status in the care plan, (2) direct the conversation to a private space, (3) refer clinical questions to the RN. The PSW's role is to facilitate the conversation, not to disclose medical details."
        },
        {
          q: "You observe your colleague loudly discussing Mrs. Nguyen's surgery near other visitors. What should you do?",
          options: [{ l:"A", t:"Ignore it — the visitors don't know Mrs. Nguyen" },{ l:"B", t:"Politely interrupt your colleague and suggest moving the discussion to a private area; report the incident to the charge nurse" },{ l:"C", t:"Wait until after your shift and mention it informally" },{ l:"D", t:"Document it in Mrs. Nguyen's chart only" }],
          correct: "B",
          exp: "This is a privacy breach under PHIPA. PSWs have a professional obligation to intervene immediately and respectfully. Report to the charge nurse so an incident report can be completed. The PSW who witnesses a breach and does nothing can also be held accountable."
        },
        {
          q: "Mrs. Nguyen is grimacing and pointing to her hip. She does not speak English well. How do you assess and report her pain?",
          options: [{ l:"A", t:"Assume it's post-operative discomfort and continue with your tasks" },{ l:"B", t:"Ask Linh to translate by phone and administer a PRN pain medication" },{ l:"C", t:"Use the FACES pain scale, note facial expression and behaviour, request interpreter services, and report findings immediately to the charge nurse using SBAR" },{ l:"D", t:"Document 'client appears comfortable' since she hasn't verbalized pain" }],
          correct: "C",
          exp: "Non-verbal pain indicators are valid clinical signs. Use the FACES scale or PACSLAC for clients with language barriers. Family members can assist with communication but should not be used as interpreters for consent or care decisions. PSWs never administer medications. Report observed pain using SBAR."
        }
      ],
      reflections: [
        "Privacy breaches must be addressed immediately — passivity makes you equally responsible under PHIPA.",
        "Being an SDM does not automatically entitle a family member to receive information in any setting — verify, verify, verify.",
        "Language barriers never justify under-reporting pain or skipping assessment. Culturally appropriate tools and interpreter services are patient rights.",
        "As the PSW, you are often the first to notice changes — your observations form the foundation of the care team's response."
      ]
    }
  },

  // ══════════════════════════════════════════════
  //  UNIT 2 — Ethics & Legal Frameworks
  // ══════════════════════════════════════════════
  {
    id: 2,
    level: "beginner",
    title: "Unit 2 — Professional Ethics & Legal Frameworks",
    duration: "18 hours",
    lectures: 7,
    theory: [
      { type: "heading", content: "Four Principles of Healthcare Ethics (Beauchamp & Childress)" },
      {
        type: "list",
        items: [
          "<strong>Autonomy:</strong> Every person has the right to make informed decisions about their own body and care, even decisions the PSW disagrees with. This includes the right to refuse care.",
          "<strong>Beneficence:</strong> Acting in the best interest of the client — not just following orders, but actively promoting their well-being and quality of life.",
          "<strong>Non-Maleficence:</strong> \"First, do no harm.\" Avoiding actions that injure, demean, or negatively impact the client. Includes harm through neglect or omission.",
          "<strong>Justice:</strong> Treating all clients fairly and equitably. Providing the same quality of care regardless of age, race, gender, disability, sexual orientation, religion, or socioeconomic status."
        ]
      },
      { type: "heading", content: "Informed Consent — Health Care Consent Act (Ontario)" },
      {
        type: "paragraph",
        content: "Consent must be: informed, voluntary, capacity-based, and specific to the procedure."
      },
      {
        type: "list",
        items: [
          "<strong>Capacity:</strong> A person has capacity if they understand the information and appreciate the consequences of their decision. Capacity is decision-specific.",
          "<strong>Substitute Decision Maker (SDM):</strong> If a person lacks capacity, consent is obtained from an SDM in this priority order: (1) court-appointed guardian, (2) attorney for personal care, (3) representative appointed by the CCB, (4) spouse/partner, (5) child, (6) parent, (7) sibling, (8) other relative.",
          "<strong>PSW Role:</strong> PSWs must obtain consent before each intervention. Document any refusals immediately and report to supervisor."
        ]
      },
      {
        type: "infobox",
        variant: "red",
        title: "⚠️ Mandatory Reporting Obligations",
        content: "PSWs in LTC homes have mandatory reporting obligations under the FLTCA. Failure to report may result in fines or charges.",
        items: [
          "Suspected abuse or neglect of a resident (physical, sexual, emotional, financial, verbal)",
          "Witnessed abuse — even by a colleague or family member",
          "Theft or misuse of a resident's property",
          "Suspected or alleged improper or incompetent treatment"
        ]
      },
      { type: "heading", content: "Privacy and Confidentiality (PHIPA / PIPA / HIA)" },
      {
        type: "list",
        items: [
          "<strong>Need-to-Know Principle:</strong> Share client health information ONLY with team members directly involved in that client's care.",
          "<strong>Prohibited disclosures:</strong> Never discuss client information in public areas, elevators, or with family members without explicit client consent. Never post anything about clients on social media.",
          "<strong>Circle of Care:</strong> Physicians, nurses, PSWs, and other providers involved in a client's care may share information within that circle without explicit consent.",
          "<strong>Breaches:</strong> Unauthorized disclosure of health information is a provincial offence. PSWs can face disciplinary action and criminal charges."
        ]
      },
      { type: "heading", content: "Professional Boundaries" },
      {
        type: "list",
        items: [
          "Never accept gifts, money, or favors from clients or families beyond token appreciation.",
          "Never form personal romantic or financial relationships with clients.",
          "Never disclose personal information about yourself in ways that shift the focus from the client's needs.",
          "Do not follow clients or families on social media or accept friend requests.",
          "Maintain therapeutic use of self — empathetic but professional at all times."
        ]
      },
      {
        type: "badges",
        items: ["HCCA (Ontario)", "PHIPA (Ontario)", "FLTCA 2021", "Canadian Human Rights Act"]
      },
      {
        type: "practical",
        steps: [
          { title: "Obtain verbal consent before each care task", desc: "Demonstrate the correct verbal consent process: introduce yourself, explain the procedure, check understanding, and respond to refusal appropriately.", tag: "Core Skill" },
          { title: "Identify and respond to boundary violations", desc: "Role-play scenarios involving gift-giving, inappropriate client requests, and personal disclosure. Practice appropriate, respectful responses.", tag: "Ethics Simulation" },
          { title: "Complete an incident/abuse report", desc: "Using a sample form, document a witnessed incident accurately: factual language only, no opinions or assumptions, time-stamped, signed.", tag: "Documentation Skill" }
        ]
      }
    ],
    quiz: [
      {
        text: "A client tells you they do not want to take their bath today. Which ethical principle guides your response?",
        diff: "easy",
        options: [{ l:"A", t:"Beneficence — you should bathe them anyway for their health" },{ l:"B", t:"Autonomy — respect their right to refuse care" },{ l:"C", t:"Justice — all clients must follow the same schedule" },{ l:"D", t:"Non-maleficence — skipping the bath could cause harm" }],
        correct: "B",
        exp: "Autonomy is the cornerstone of person-centred care. Competent individuals have the absolute right to refuse care, even if the PSW believes the care is beneficial. Document the refusal and report to the supervisor.",
        ref: "Health Care Consent Act, Ontario; PSW Ethics Standards"
      },
      {
        text: "Under PHIPA, sharing a client's health information with their adult child in the hallway without the client's consent is:",
        diff: "medium",
        options: [{ l:"A", t:"Acceptable if the child is listed as next of kin" },{ l:"B", t:"A privacy breach regardless of family relationship" },{ l:"C", t:"Permitted if the client cannot speak for themselves" },{ l:"D", t:"Acceptable if done quietly" }],
        correct: "B",
        exp: "PHIPA protects health information regardless of setting or relationship. Information cannot be shared in public areas, and family members do not automatically have the right to health information. Even if the adult child is the SDM, information must be shared privately and verified.",
        ref: "Personal Health Information Protection Act (PHIPA), Ontario"
      },
      {
        text: "A client offers you $50 as a Christmas gift. What is the appropriate PSW response?",
        diff: "medium",
        options: [{ l:"A", t:"Accept it graciously — refusing is impolite" },{ l:"B", t:"Accept it but report it to your supervisor later" },{ l:"C", t:"Decline respectfully, explain your organization's gift policy, and report the offer to your supervisor" },{ l:"D", t:"Suggest the client give the money to charity instead" }],
        correct: "C",
        exp: "Accepting cash gifts from clients violates professional boundary standards and can constitute a conflict of interest. PSWs must decline, explain the policy kindly, and report the offer to their supervisor. This protects both the PSW and the client.",
        ref: "PSW Professional Boundaries Standards; HSCPOA Code of Conduct"
      },
      {
        text: "You witness a fellow PSW yelling at a resident who is resisting personal care. Under the FLTCA, what are you legally required to do?",
        diff: "hard",
        options: [{ l:"A", t:"Speak privately to the colleague after the shift" },{ l:"B", t:"Report the incident immediately to the charge nurse and complete a mandatory report" },{ l:"C", t:"Document what you saw in the client's chart" },{ l:"D", t:"Report only if it happens again" }],
        correct: "B",
        exp: "The FLTCA 2021 imposes mandatory reporting obligations. Verbal abuse of a resident must be reported immediately to the Director of Nursing and the Administrator. Failure to report is itself an offence. Delayed or informal reporting does not meet the legal standard.",
        ref: "Fixing Long-Term Care Act, 2021, s.99-112 (Mandatory Reporting)"
      },
      {
        text: "Which of the following actions would violate the Need-to-Know principle of privacy?",
        diff: "easy",
        options: [{ l:"A", t:"Telling the charge nurse about a client's new skin breakdown" },{ l:"B", t:"Discussing a client's diagnosis with the physiotherapist treating them" },{ l:"C", t:"Mentioning a client's condition to your spouse over dinner" },{ l:"D", t:"Documenting a client's refusal of care in the progress notes" }],
        correct: "C",
        exp: "The Need-to-Know principle limits sharing of health information to those directly involved in the client's care. Discussing client information outside the circle of care — including with family, friends, or in social settings — is a PHIPA breach, regardless of intent.",
        ref: "PHIPA, Ontario; PSW Privacy Standards"
      }
    ]
  },

  // ══════════════════════════════════════════════
  //  UNIT 3 — Infection Control
  // ══════════════════════════════════════════════
  {
    id: 3,
    level: "beginner",
    title: "Unit 3 — Infection Control & Safety",
    duration: "20 hours",
    lectures: 8,
    theory: [
      { type: "heading", content: "PHAC Routine Practices" },
      {
        type: "paragraph",
        content: "Routine Practices (formerly Universal Precautions) must be applied with ALL clients at ALL times, regardless of known diagnosis."
      },
      {
        type: "list",
        items: [
          "<strong>Hand Hygiene:</strong> The MOST effective infection prevention measure. Use alcohol-based hand rub (ABHR) or soap and water as per the 4 Moments.",
          "<strong>Point-of-Care Risk Assessment (PCRA):</strong> Before any care interaction, assess: What is the likely exposure? Is PPE needed? What is the transmission route?",
          "<strong>Personal Protective Equipment (PPE):</strong> Gloves, gowns, masks, eye protection — selected based on PCRA.",
          "<strong>Respiratory Hygiene / Cough Etiquette:</strong> Provide tissues and ABHR; encourage clients to cover coughs/sneezes.",
          "<strong>Safe Handling of Sharps:</strong> Never recap needles; use safety devices; dispose in approved sharps containers immediately.",
          "<strong>Environmental Cleaning:</strong> Clean and disinfect high-touch surfaces per facility protocol."
        ]
      },
      {
        type: "infobox",
        variant: "amber",
        title: "🙌 The WHO 5 Moments for Hand Hygiene",
        content: "Proper handwashing time: minimum 20 seconds with soap and water; 15 seconds with ABHR (sufficient alcohol content ≥60%).",
        items: [
          "<strong>Moment 1:</strong> Before touching a patient",
          "<strong>Moment 2:</strong> Before a clean/aseptic procedure",
          "<strong>Moment 3:</strong> After body fluid exposure risk",
          "<strong>Moment 4:</strong> After touching a patient",
          "<strong>Moment 5:</strong> After touching patient surroundings"
        ]
      },
      { type: "heading", content: "Transmission-Based Precautions" },
      {
        type: "table",
        headers: ["Precaution Type", "Indication", "PPE Required", "Room Requirement"],
        rows: [
          ["<strong>Contact</strong>", "MRSA, C. diff, VRE, wound infections, scabies", "Gloves + gown for ALL contact", "Private room preferred"],
          ["<strong>Droplet</strong>", "Influenza, COVID-19, pertussis, meningitis", "Surgical mask within 2 metres; eye protection", "Private room; door may be open"],
          ["<strong>Airborne</strong>", "Tuberculosis, measles, varicella", "N95 respirator (fit-tested); eye protection", "Negative pressure room — door CLOSED"],
          ["<strong>Contact + Droplet</strong>", "COVID-19, RSV with symptoms", "Gloves, gown, surgical mask, eye protection", "Private room preferred"]
        ]
      },
      {
        type: "infobox",
        variant: "red",
        title: "⚠️ C. difficile Special Consideration",
        content: "C. diff spores are NOT killed by ABHR. For clients with confirmed or suspected C. diff, always use soap and water hand hygiene. Spores can survive on surfaces for months. Use 1:10 bleach solution or sporicidal disinfectant for environmental cleaning."
      },
      {
        type: "badges",
        items: ["PHAC Routine Practices 2012", "WHO Hand Hygiene Guidelines", "PIDAC Best Practices"]
      },
      {
        type: "practical",
        steps: [
          { title: "Proper Hand Hygiene — Soap & Water (20 seconds)", desc: "Palm to palm → fingers interlaced → backs of fingers → thumbs → fingertips and nails → wrists. Use UV light/GloGerm to assess coverage.", tag: "Must Pass" },
          { title: "Don and Doff PPE — Contact Precautions", desc: "DON order: gown → gloves. DOFF order: gloves → gown (rolling outward) → hand hygiene after each step. Contaminated surfaces must not touch clothing or face.", tag: "Competency Check" },
          { title: "Don N95 Respirator with Fit Check", desc: "Perform seal check: positive (push out — no air should escape at edges) and negative (inhale sharply — mask should collapse slightly against face).", tag: "Competency Check" },
          { title: "High-Touch Surface Disinfection", desc: "Using a sporicidal wipe, clean bed rail → call bell → over-bed table → door handle in correct sequence. Demonstrate correct contact time for product used.", tag: "Core Skill" }
        ]
      }
    ],
    quiz: [
      {
        text: "According to Canadian infection control guidelines, how long should you wash hands with soap and water?",
        diff: "easy",
        options: [{ l:"A", t:"5 seconds" },{ l:"B", t:"10 seconds" },{ l:"C", t:"20 seconds" },{ l:"D", t:"60 seconds" }],
        correct: "C",
        exp: "Health Canada and PHAC recommend washing hands for at least 20 seconds. This is the most effective way to remove harmful bacteria and viruses. For ABHR, 15 seconds is sufficient with appropriate alcohol content (≥60%).",
        ref: "PHAC Routine Practices; WHO Hand Hygiene Guidelines"
      },
      {
        text: "A client has confirmed C. difficile infection. Which hand hygiene method should you use after care?",
        diff: "medium",
        options: [{ l:"A", t:"Alcohol-based hand rub — it is faster and more effective" },{ l:"B", t:"Either method is equally effective for C. diff" },{ l:"C", t:"Soap and water only — ABHR does not kill C. diff spores" },{ l:"D", t:"Gloves alone are sufficient — no hand hygiene needed after" }],
        correct: "C",
        exp: "C. diff produces spores that are resistant to alcohol-based hand rubs. Soap and water is the ONLY effective method for C. diff because the mechanical action of washing physically removes spores. This is a critical infection control principle.",
        ref: "PHAC Routine Practices; PIDAC C. diff Guidelines"
      },
      {
        text: "You are assigned to care for a client with active pulmonary tuberculosis. Which PPE and room type are required?",
        diff: "hard",
        options: [{ l:"A", t:"Surgical mask; any private room" },{ l:"B", t:"N95 respirator (fit-tested); airborne infection isolation room (negative pressure) with door closed" },{ l:"C", t:"Gloves and gown only; door may remain open" },{ l:"D", t:"Standard precautions only — TB only spreads by direct contact" }],
        correct: "B",
        exp: "Tuberculosis is an airborne pathogen transmitted via droplet nuclei that remain suspended in air. Airborne precautions require: (1) fit-tested N95 respirator, (2) Airborne Infection Isolation Room (AIIR) with negative pressure, (3) door must remain closed at all times. Surgical masks do not filter aerosol-sized particles.",
        ref: "PHAC Airborne Precautions; PIDAC TB Infection Control"
      },
      {
        text: "When donning PPE for Contact Precautions, what is the correct order?",
        diff: "medium",
        options: [{ l:"A", t:"Gloves → Gown" },{ l:"B", t:"Gown → Gloves" },{ l:"C", t:"Mask → Gown → Gloves" },{ l:"D", t:"Order does not matter" }],
        correct: "B",
        exp: "The correct DON order for Contact Precautions is: Gown first (to protect clothing), then Gloves (gloves should cover the cuff of the gown). The correct DOFF order is: Gloves first (most contaminated), then Gown (rolling outward), followed by hand hygiene after each step.",
        ref: "PHAC Routine Practices; PIDAC PPE Guidelines"
      },
      {
        text: "Which of the WHO 5 Moments for Hand Hygiene occurs BEFORE a clean/aseptic procedure?",
        diff: "easy",
        options: [{ l:"A", t:"Moment 1" },{ l:"B", t:"Moment 2" },{ l:"C", t:"Moment 3" },{ l:"D", t:"Moment 4" }],
        correct: "B",
        exp: "The WHO 5 Moments: Moment 1 = before touching patient; Moment 2 = before clean/aseptic procedure; Moment 3 = after body fluid exposure risk; Moment 4 = after touching patient; Moment 5 = after touching patient surroundings. Moment 2 is critical to prevent infection during procedures like wound care.",
        ref: "WHO 5 Moments for Hand Hygiene; PHAC Guidelines"
      }
    ]
  }
]

export const CURRICULUM_STRUCTURE = [
  {
    level: "beginner" as const,
    label: "Beginner",
    color: "var(--beg)",
    bg: "var(--beg-bg)",
    border: "#A8D9E8",
    headerBg: "linear-gradient(135deg,#E8F5F9,#D1EBF3)",
    icon: "🌱",
    hours: "140",
    desc: "Build your core knowledge base covering the Canadian healthcare system, professional ethics, communication, infection control, and fundamental personal care skills.",
    units: [
      { num: 1,  title: "The Canadian Healthcare System",          duration: "20h", questions: 5  },
      { num: 2,  title: "Professional Ethics & Legal Frameworks",  duration: "18h", questions: 5  },
      { num: 3,  title: "Infection Control & Safety",              duration: "20h", questions: 5  },
      { num: 4,  title: "Communication Skills",                    duration: "16h", questions: 5  },
      { num: 5,  title: "Body Structure & Function",               duration: "20h", questions: 5  },
      { num: 6,  title: "Basic Personal Care & ADLs",             duration: "22h", questions: 5  },
      { num: 7,  title: "Mobility & Body Mechanics",               duration: "12h", questions: 5  },
      { num: 8,  title: "Nutrition & Hydration Basics",            duration: "12h", questions: 5  },
    ]
  },
  {
    level: "intermediate" as const,
    label: "Intermediate",
    color: "var(--int)",
    bg: "var(--int-bg)",
    border: "#FCD34D",
    headerBg: "linear-gradient(135deg,#FFFBEB,#FEF3C7)",
    icon: "📈",
    hours: "220",
    desc: "Advance your skills in complex care needs, cognitive conditions, chronic disease management, and professional practice.",
    units: [
      { num: 9,  title: "Clinical Observations",                   duration: "24h", questions: 5  },
      { num: 10, title: "Chronic Disease Care",                    duration: "28h", questions: 5  },
      { num: 11, title: "Wound & Skin Care",                       duration: "20h", questions: 5  },
      { num: 12, title: "Medication Assistance",                   duration: "18h", questions: 5  },
      { num: 13, title: "Mental Health & Cognitive Care",          duration: "24h", questions: 5  },
      { num: 14, title: "Palliative & End-of-Life Care",           duration: "22h", questions: 5  },
      { num: 15, title: "Pediatric & Family Support",             duration: "18h", questions: 5  },
      { num: 16, title: "Rehabilitation Support",                  duration: "20h", questions: 5  },
      { num: 17, title: "Therapeutic Nutrition",                   duration: "20h", questions: 5  },
      { num: 18, title: "Documentation & Reporting",               duration: "16h", questions: 5  },
    ]
  },
  {
    level: "advanced" as const,
    label: "Advanced",
    color: "var(--adv)",
    bg: "var(--adv-bg)",
    border: "#C4B5FD",
    headerBg: "linear-gradient(135deg,#F5F3FF,#EDE9FE)",
    icon: "🏆",
    hours: "240",
    desc: "Master leadership, complex clinical situations, specialty care, and advocate for clients at the highest level.",
    units: [
      { num: 19, title: "Complex Medical Conditions",              duration: "28h", questions: 5  },
      { num: 20, title: "Delegated Medical Acts",                  duration: "24h", questions: 5  },
      { num: 21, title: "Gerontology & Aging",                     duration: "24h", questions: 5  },
      { num: 22, title: "Behavioural Support",                     duration: "26h", questions: 5  },
      { num: 23, title: "Community & Home Care",                   duration: "26h", questions: 5  },
      { num: 24, title: "Indigenous Cultural Safety",              duration: "22h", questions: 5  },
      { num: 25, title: "Emergency Preparedness",                  duration: "22h", questions: 5  },
      { num: 26, title: "Leadership & Advocacy",                   duration: "20h", questions: 5  },
      { num: 27, title: "Capstone Clinical Practicum",             duration: "48h", questions: 10 },
    ]
  }
]