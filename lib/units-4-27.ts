import type { Unit } from "./curriculum-data"

export const UNITS_4_27: Unit[] = [
  {
    id: 4,
    level: "beginner",
    title: "Unit 4 — Communication Skills",
    duration: "16 hours",
    lectures: 6,
    theory: [
      {
        type: "heading",
        content: "Therapeutic Communication in PSW Practice",
      },
      {
        type: "paragraph",
        content: "Therapeutic communication is purposeful, goal-directed interaction used to build trust, gather information, and provide person-centred care. Every PSW-client interaction is a clinical communication event.",
      },
      {
        type: "list",
        items: [
          "<strong>Active Listening:</strong> Full attention — eye contact, open posture, nodding. Reflect back: 'It sounds like you're worried about…'",
          "<strong>Open-Ended Questions:</strong> Invite elaboration: 'Can you tell me how you're feeling today?' vs. closed 'Are you in pain?'",
          "<strong>Empathy:</strong> Enter the client's emotional world without judgment. 'I can see this is really difficult for you right now.'",
          "<strong>Therapeutic Silence:</strong> Allow pauses — they give clients space to process. Resist filling every silence.",
          "<strong>Clarification:</strong> 'When you say the pain is unbearable, can you describe exactly what that feels like?'",
          "<strong>Validation:</strong> Acknowledge feelings: 'It makes complete sense that you'd feel that way given what you're going through.'",
        ],
      },
      {
        type: "heading",
        content: "Barriers to Effective Communication",
      },
      {
        type: "table",
        headers: [
          "Barrier",
          "Example",
          "PSW Strategy",
        ],
        rows: [
          [
            "<strong>Language</strong>",
            "Client speaks Punjabi",
            "Use interpreter services, visuals, simple language, gestures",
          ],
          [
            "<strong>Hearing impairment</strong>",
            "No response to verbal cues",
            "Face client, speak clearly, use written notes or AAC devices",
          ],
          [
            "<strong>Cognitive impairment</strong>",
            "Dementia — cannot follow multi-step instructions",
            "Short sentences, one step at a time, visual cues, routine",
          ],
          [
            "<strong>Pain/distress</strong>",
            "Client too agitated to engage",
            "Address pain first; use calm tone, gentle touch",
          ],
          [
            "<strong>Cultural</strong>",
            "Eye contact disrespectful in some cultures",
            "Follow client's lead; ask about preferences respectfully",
          ],
          [
            "<strong>Environmental</strong>",
            "Noisy hallway, poor lighting",
            "Move to quiet area; reduce distractions before communicating",
          ],
        ],
      },
      {
        type: "heading",
        content: "SBAR — Structured Clinical Handoff Tool",
      },
      {
        type: "infobox",
        variant: "blue",
        title: "📋 SBAR Communication (Canadian Patient Safety Institute Standard)",
        content: "SBAR is the national standard for PSW-to-nurse communication across all Canadian provinces.",
        items: [
          "<strong>S — Situation:</strong> 'I'm calling about Mrs. Chen in Room 12. She has increased shortness of breath.'",
          "<strong>B — Background:</strong> 'She has COPD, admitted 3 days ago. Baseline SpO2 was 94%.'",
          "<strong>A — Assessment:</strong> 'SpO2 now 88%, RR 28, using accessory muscles, appears anxious.'",
          "<strong>R — Recommendation:</strong> 'She needs immediate assessment. Can you come now? I've positioned her upright.'",
        ],
      },
      {
        type: "heading",
        content: "Documentation as Communication",
      },
      {
        type: "list",
        items: [
          "<strong>Objective language:</strong> Write facts observed, not interpretations. Write 'Client did not eat breakfast' not 'Client refused to eat because depressed.'",
          "<strong>Subjective data:</strong> Quote clients directly — 'Client stated: I have a sharp pain in my right knee.'",
          "<strong>SOAP format:</strong> Subjective → Objective → Assessment → Plan. Used in progress notes.",
          "<strong>Never alter records:</strong> If an error is made, draw a single line through it, write 'error', initial, and re-document. Never use correction fluid.",
          "<strong>Timeliness:</strong> Document as soon as possible after the event, while details are fresh.",
        ],
      },
      {
        type: "badges",
        items: [
          "CPSI Communication Safety",
          "SBAR Standard",
          "PHIPA Documentation",
        ],
      },
      {
        type: "practical",
        steps: [
          {
            title: "Practice SBAR handoff using a scenario",
            desc: "Given a scenario card describing a client change in condition, formulate and deliver an SBAR report to a simulated nurse. Assessed on completeness and accuracy.",
            tag: "Core Skill",
          },
          {
            title: "Demonstrate active listening",
            desc: "In pairs, one person shares a personal (non-private) concern for 2 minutes while the partner practices active listening techniques. Debrief what felt therapeutic vs. not.",
            tag: "Communication Skill",
          },
          {
            title: "Adapt communication for hearing-impaired client",
            desc: "Using a face mask and without speaking, communicate bath preparation steps to a partner using visual and gestural cues only.",
            tag: "Competency Check",
          },
        ],
      },
    ],
    quiz: [
      {
        text: "A client says she feels 'terrible.' Which PSW response BEST demonstrates therapeutic communication?",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "'I'm sure you'll feel better soon.'",
          },
          {
            l: "B",
            t: "'Can you tell me more about how you're feeling terrible right now?'",
          },
          {
            l: "C",
            t: "'Lots of people feel that way. It's normal.'",
          },
          {
            l: "D",
            t: "'I'll let the nurse know you feel terrible.'",
          },
        ],
        correct: "B",
        exp: "Open-ended questions invite the client to elaborate and help the PSW gather clinical information. Option A dismisses, C minimizes, D is premature — gather information first.",
        ref: "CPSI Communication Safety Standards",
      },
      {
        text: "When documenting a client's refusal of morning care, which entry is MOST appropriate?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "'Client was uncooperative and refused bath.'",
          },
          {
            l: "B",
            t: "'Client stated: I do not want a bath today. Morning bath not provided. RPN notified at 0830.'",
          },
          {
            l: "C",
            t: "'Client appeared upset — probably depressed again.'",
          },
          {
            l: "D",
            t: "'Bath skipped due to client behaviour.'",
          },
        ],
        correct: "B",
        exp: "Documentation must be objective, factual, and include a direct client quote, the action not performed, and who was notified. Options A, C, and D include subjective interpretation.",
        ref: "PSW Documentation Standards; PHIPA",
      },
      {
        text: "The 'R' in SBAR stands for:",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Referral",
          },
          {
            l: "B",
            t: "Report",
          },
          {
            l: "C",
            t: "Recommendation",
          },
          {
            l: "D",
            t: "Response",
          },
        ],
        correct: "C",
        exp: "SBAR = Situation, Background, Assessment, Recommendation. The 'R' asks the nurse or supervisor to take a specific action — it transforms a passive report into an active safety communication.",
        ref: "CPSI SBAR Tool; WHO Communication Safety",
      },
      {
        text: "A PSW is caring for a client with severe hearing loss. Which communication strategy is MOST effective?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Speak very loudly directly into the client's ear",
          },
          {
            l: "B",
            t: "Face the client at eye level, speak clearly at normal volume, use gestures and written notes",
          },
          {
            l: "C",
            t: "Ask the family to communicate on behalf of the client for all interactions",
          },
          {
            l: "D",
            t: "Use medical jargon since the client can lip-read complex terms",
          },
        ],
        correct: "B",
        exp: "For hearing-impaired clients, face-to-face positioning allows lip-reading; normal volume prevents distortion. Shouting into the ear can cause discomfort. Family should not routinely replace direct client communication — this undermines dignity and autonomy.",
        ref: "PSW Communication Standards; AAC Best Practices",
      },
      {
        text: "When a PSW makes an error in a paper progress note, what is the CORRECT procedure?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Use correction fluid (Wite-Out) to cover the mistake and rewrite",
          },
          {
            l: "B",
            t: "Scribble out the error completely so it cannot be read",
          },
          {
            l: "C",
            t: "Draw a single line through the error, write 'error', initial it, and document correctly",
          },
          {
            l: "D",
            t: "Tear out the page and start fresh",
          },
        ],
        correct: "C",
        exp: "Legal documentation standards require that errors remain legible. Drawing a single line through the error while keeping the original text visible maintains a transparent legal record. Using correction fluid or destroying records can be interpreted as falsification.",
        ref: "Documentation Standards; Legal Health Records",
      },
    ],
  },
  {
    id: 5,
    level: "beginner",
    title: "Unit 5 — Body Structure & Function",
    duration: "20 hours",
    lectures: 8,
    theory: [
      {
        type: "heading",
        content: "Body Systems Relevant to PSW Practice",
      },
      {
        type: "paragraph",
        content: "PSWs must understand basic anatomy and physiology to recognize normal vs. abnormal findings, understand disease processes, and report meaningful observations to the nursing team.",
      },
      {
        type: "heading",
        content: "Musculoskeletal System",
      },
      {
        type: "list",
        items: [
          "<strong>Bones:</strong> 206 bones; provide structure, protect organs, store calcium. Common PSW concerns: osteoporosis (fragile bones → high fracture risk), arthritis (joint inflammation → pain, limited mobility).",
          "<strong>Muscles:</strong> Enable movement, maintain posture. Atrophy (muscle wasting) occurs rapidly with immobility — as little as 72 hours of bed rest causes measurable loss.",
          "<strong>Joints:</strong> Point of contact between bones. Types: ball-and-socket (hip, shoulder), hinge (knee, elbow), pivot (neck). Range of motion (ROM) exercises maintain joint function.",
          "<strong>PSW relevance:</strong> Proper body mechanics protect PSW musculoskeletal health. Repositioning schedules prevent contractures (permanent muscle shortening) in immobile clients.",
        ],
      },
      {
        type: "heading",
        content: "Cardiovascular System",
      },
      {
        type: "list",
        items: [
          "<strong>Heart:</strong> 4-chamber pump. Right side = pulmonary circulation (to lungs). Left side = systemic circulation (to body). Heart rate 60-100 bpm is normal.",
          "<strong>Blood vessels:</strong> Arteries carry oxygenated blood away from heart (except pulmonary artery). Veins return deoxygenated blood to heart. Capillaries enable gas exchange.",
          "<strong>Common conditions:</strong> Hypertension (high BP >140/90), heart failure (pump weakens), peripheral vascular disease (poor circulation to limbs — watch for cold/blue extremities).",
          "<strong>PSW relevance:</strong> Monitor for edema, dyspnea, chest pain, irregular pulse. Report changes immediately. Encourage leg exercises for bedridden clients to prevent DVT.",
        ],
      },
      {
        type: "heading",
        content: "Respiratory System",
      },
      {
        type: "list",
        items: [
          "<strong>Upper airway:</strong> Nose, pharynx, larynx — warm, filter, humidify air.",
          "<strong>Lower airway:</strong> Trachea → bronchi → bronchioles → alveoli (gas exchange site).",
          "<strong>Normal:</strong> 12-20 breaths/min, quiet, effortless, even depth. SpO2 95-100%.",
          "<strong>Common conditions:</strong> COPD (obstructed airflow, air trapping), asthma (reactive airways, bronchospasm), pneumonia (alveolar infection — fever, productive cough).",
          "<strong>PSW relevance:</strong> Positioning (high Fowler's for dyspnea), oxygen safety rules, recognizing respiratory distress (accessory muscle use, flared nostrils, cyanosis = emergency).",
        ],
      },
      {
        type: "heading",
        content: "Integumentary System (Skin)",
      },
      {
        type: "list",
        items: [
          "<strong>Functions:</strong> Protection, temperature regulation, sensation, vitamin D synthesis, fluid balance.",
          "<strong>Layers:</strong> Epidermis (outer barrier), dermis (collagen, vessels, nerves), hypodermis (fat, insulation).",
          "<strong>Aging changes:</strong> Thinner, drier, less elastic, slower healing, reduced sensation → higher pressure injury risk.",
          "<strong>Pressure injury staging:</strong> Stage 1 (redness, intact skin) → Stage 2 (partial thickness loss) → Stage 3 (full thickness) → Stage 4 (exposed bone/tendon). Unstageable = wound bed not visible.",
          "<strong>PSW relevance:</strong> 2-hour repositioning schedule, skin inspection head-to-toe, moisture management, nutritional support. Report ANY new skin changes immediately.",
        ],
      },
      {
        type: "table",
        headers: [
          "System",
          "Normal Aging Change",
          "PSW Clinical Implication",
        ],
        rows: [
          [
            "Musculoskeletal",
            "Decreased bone density, muscle mass, joint flexibility",
            "Fall prevention, ROM exercises, osteoporosis precautions",
          ],
          [
            "Cardiovascular",
            "Decreased cardiac output, arterial stiffness",
            "BP monitoring, edema assessment, activity tolerance",
          ],
          [
            "Respiratory",
            "Decreased lung elasticity, reduced cough reflex",
            "Aspiration precautions, SpO2 monitoring, dyspnea positioning",
          ],
          [
            "Integumentary",
            "Thinner skin, decreased sensation, slower healing",
            "Pressure injury prevention, skin inspection, moisture barriers",
          ],
          [
            "Neurological",
            "Slowed processing, reduced balance/proprioception",
            "Fall prevention, communication adaptations, orientation support",
          ],
          [
            "Urinary",
            "Reduced bladder capacity, weakened sphincters",
            "Scheduled toileting, continence care, UTI symptom recognition",
          ],
        ],
      },
      {
        type: "badges",
        items: [
          "Anatomy & Physiology",
          "Aging Physiology",
          "Pressure Injury Staging (NPUAP/EPUAP)",
        ],
      },
      {
        type: "practical",
        steps: [
          {
            title: "Head-to-toe skin inspection",
            desc: "Using a simulation mannequin, perform a systematic skin inspection from scalp to heels. Identify and document a Stage 1 pressure injury (reddened area over sacrum) using correct terminology and report using SBAR.",
            tag: "Core Skill",
          },
          {
            title: "Identify body systems from observation",
            desc: "Given 6 clinical photographs, correctly identify which body system is involved in the change observed (e.g., edematous ankles = cardiovascular; cyanotic lips = respiratory).",
            tag: "Competency Check",
          },
          {
            title: "Normal vs. abnormal vital sign identification",
            desc: "Given a sheet of 10 vital sign sets, circle abnormal values and state the correct terminology (e.g., tachycardia, hypotension, tachypnea) and immediate action for each.",
            tag: "Must Pass",
          },
        ],
      },
    ],
    quiz: [
      {
        text: "A client with COPD is sitting upright leaning forward with their hands on their knees (tripod position). What does this indicate?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "The client is comfortable and resting normally",
          },
          {
            l: "B",
            t: "The client is using accessory muscles due to breathing difficulty",
          },
          {
            l: "C",
            t: "The client wants to get out of bed",
          },
          {
            l: "D",
            t: "The client is having a hypoglycemic episode",
          },
        ],
        correct: "B",
        exp: "The tripod position stabilizes the shoulder girdle and allows accessory muscles (sternocleidomastoid, scalene) to assist with breathing. It is a compensatory posture seen in respiratory distress — report immediately using SBAR.",
        ref: "Respiratory Assessment; COPD Canada Guidelines",
      },
      {
        text: "Which skin layer contains blood vessels, collagen, and nerve endings?",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Epidermis",
          },
          {
            l: "B",
            t: "Hypodermis",
          },
          {
            l: "C",
            t: "Dermis",
          },
          {
            l: "D",
            t: "Subcutaneous fat",
          },
        ],
        correct: "C",
        exp: "The dermis is the middle layer of skin containing collagen fibres (strength), elastin (flexibility), blood vessels (nutrition and temperature regulation), and sensory nerve endings. The epidermis is the outer barrier layer with no blood supply.",
        ref: "Anatomy & Physiology; Skin Integrity Standards",
      },
      {
        text: "A PSW notices a reddened area over a bedridden client's sacrum that does NOT blanch when pressed. This should be documented as:",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Stage 2 pressure injury — partial thickness loss",
          },
          {
            l: "B",
            t: "Stage 1 pressure injury — non-blanchable erythema",
          },
          {
            l: "C",
            t: "A normal skin variation — no action needed",
          },
          {
            l: "D",
            t: "Unstageable pressure injury",
          },
        ],
        correct: "B",
        exp: "Non-blanchable erythema on intact skin is the hallmark of a Stage 1 pressure injury. Blanchable redness (reactive hyperemia) resolves within 30 minutes of pressure relief — this is not a Stage 1. Non-blanchable redness indicates microvascular damage and requires immediate reporting and care plan adjustment.",
        ref: "NPUAP/EPUAP Pressure Injury Staging; RNAO Best Practice Guidelines",
      },
      {
        text: "Which of the following is a normal age-related change in the urinary system of an elderly client?",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Increased bladder capacity",
          },
          {
            l: "B",
            t: "Reduced incidence of urinary tract infections",
          },
          {
            l: "C",
            t: "Decreased bladder capacity and weakened sphincter muscles",
          },
          {
            l: "D",
            t: "Stronger urge sensation with more time to reach the toilet",
          },
        ],
        correct: "C",
        exp: "Normal aging reduces bladder capacity (from ~500mL to ~250-300mL), weakens sphincter muscles, reduces the warning time between urge and voiding, and increases nocturia. PSWs should implement scheduled toileting programs to prevent incontinence accidents and falls.",
        ref: "Gerontology Nursing; RNAO Continence Care Best Practice",
      },
      {
        text: "What is the PRIMARY function of the alveoli in the respiratory system?",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Filter and humidify incoming air",
          },
          {
            l: "B",
            t: "Produce mucus to trap pathogens",
          },
          {
            l: "C",
            t: "Gas exchange between air and blood",
          },
          {
            l: "D",
            t: "Regulate the rate and rhythm of breathing",
          },
        ],
        correct: "C",
        exp: "Alveoli are tiny air sacs at the end of the bronchiole tree where oxygen crosses the alveolar membrane into pulmonary capillaries, and CO2 crosses in the opposite direction to be exhaled. Alveolar damage (emphysema, pneumonia) directly impairs this gas exchange.",
        ref: "Respiratory Physiology; COPD and Lung Disease Canada",
      },
    ],
  },
  {
    id: 6,
    level: "beginner",
    title: "Unit 6 — Basic Personal Care & ADLs",
    duration: "22 hours",
    lectures: 10,
    theory: [
      {
        type: "heading",
        content: "Person-Centred Care Principles",
      },
      {
        type: "paragraph",
        content: "Person-centred care recognizes that each client is a unique individual with preferences, values, and a life history. All care must be individualized, not task-focused.",
      },
      {
        type: "list",
        items: [
          "<strong>Dignity:</strong> Protect modesty at all times. Explain each step before performing it. Address clients by their preferred name — always ask.",
          "<strong>Choice and Control:</strong> Offer choices whenever possible: 'Do you prefer a shower or a bath today? Would you like to wash your hair first?'",
          "<strong>Continuity:</strong> Learn and respect established routines. A client who has showered at 9am their entire adult life should not be made to shower at 7am for staff convenience.",
          "<strong>Responsiveness:</strong> Adjust care based on the client's current state. If a client is in pain or distressed, delay non-urgent personal care.",
        ],
      },
      {
        type: "heading",
        content: "ADLs vs. Instrumental ADLs (IADLs)",
      },
      {
        type: "list",
        items: [
          "<strong>Basic ADLs:</strong> Bathing, dressing, grooming, toileting, eating, transferring. Core PSW responsibilities in all settings.",
          "<strong>Instrumental ADLs (IADLs):</strong> Meal preparation, housekeeping, laundry, medication management, transportation. PSWs assist with these in community/home care settings.",
          "<strong>Restorative Care:</strong> Help clients do AS MUCH AS POSSIBLE themselves. Never take over a task the client can do independently — even if slower. 'Do with, not for.' Maintains dignity, reduces dependence, preserves function.",
        ],
      },
      {
        type: "heading",
        content: "Bathing — Safe Technique",
      },
      {
        type: "list",
        items: [
          "<strong>Water temperature:</strong> 38–42°C (comfortable warm — test on inner wrist). Never use hot water — elderly clients have reduced temperature sensation.",
          "<strong>Clean to dirty:</strong> Wash face → upper body → arms → chest → abdomen → legs → perineal area last. Use separate washcloths for perineal care.",
          "<strong>Modesty:</strong> Expose only the area being washed. Keep client covered with warm towels/bath blanket throughout.",
          "<strong>Skin assessment:</strong> Inspect entire body during bathing — the PSW often has the most complete view of skin integrity.",
          "<strong>Peri-care (female):</strong> Front-to-back technique, separate stroke for each wipe, assess for redness, odour, discharge.",
          "<strong>Diabetic foot care:</strong> Soak and dry thoroughly between toes. Inspect for cuts, blisters, colour changes. Never cut toenails — refer to nurse/podiatrist.",
        ],
      },
      {
        type: "heading",
        content: "Dressing — Hemiplegia Technique",
      },
      {
        type: "infobox",
        variant: "green",
        title: "👕 Dressing Rule for Hemiplegia (Stroke/One-Sided Weakness)",
        content: "'Weak side in first, strong side out first.'",
        items: [
          "<strong>DRESSING:</strong> Guide affected (weak) arm into sleeve FIRST → then unaffected arm.",
          "<strong>UNDRESSING:</strong> Remove unaffected (strong) arm FIRST → then guide affected arm out.",
          "<strong>Lower body:</strong> Dress affected leg first; undress unaffected leg first.",
          "<strong>Rationale:</strong> The weak side has limited range of motion — doing it first when garment is loose makes dressing easier and prevents injury.",
        ],
      },
      {
        type: "heading",
        content: "Oral Hygiene",
      },
      {
        type: "list",
        items: [
          "<strong>Conscious client:</strong> HOB elevated to 45-90°, brush all surfaces (outer, inner, chewing), floss if able, rinse. 2-minute brushing time.",
          "<strong>Unconscious/uncooperative client:</strong> Position LATERALLY (not supine — aspiration risk). Use foam swabs. Suction available and ready. Never leave unattended.",
          "<strong>Denture care:</strong> Remove dentures, rinse, brush with soft brush (no toothpaste — abrasive), soak in lukewarm water. Never use hot water — warps dentures.",
          "<strong>Aspiration risk:</strong> Oral bacteria aspirated into lungs = aspiration pneumonia, a leading cause of death in LTC residents. Oral hygiene is a clinical intervention, not a comfort measure.",
        ],
      },
      {
        type: "badges",
        items: [
          "RNAO Oral Health Best Practice",
          "Restorative Care Principles",
          "FLTCA ADL Standards",
        ],
      },
      {
        type: "practical",
        steps: [
          {
            title: "Complete bed bath — bedridden client",
            desc: "Demonstrate on simulation mannequin: correct water temperature, clean-to-dirty sequence, modesty maintenance, perineal care technique, skin inspection documentation.",
            tag: "Must Pass",
          },
          {
            title: "Dress and undress a client with right-sided hemiplegia",
            desc: "Using a simulation partner, demonstrate correct weak-side-first dressing technique for upper and lower body without causing pain or injury.",
            tag: "Competency Check",
          },
          {
            title: "Oral hygiene for high-aspiration-risk client",
            desc: "Demonstrate oral care for a simulated unconscious client: lateral positioning, foam swab technique, suction setup, avoidance of fluid aspiration.",
            tag: "Must Pass",
          },
        ],
      },
    ],
    quiz: [
      {
        text: "When performing peri-care on a female client, the correct technique is:",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Back to front, reusing the washcloth",
          },
          {
            l: "B",
            t: "Front to back, using a separate area of the washcloth for each wipe",
          },
          {
            l: "C",
            t: "Circular motion from the perineum outward",
          },
          {
            l: "D",
            t: "Any direction is acceptable if soap and water are used",
          },
        ],
        correct: "B",
        exp: "Front-to-back technique prevents introducing fecal bacteria (especially E. coli) into the urethral area, which is the leading cause of urinary tract infections (UTIs). A fresh area of the washcloth must be used for each stroke to prevent cross-contamination.",
        ref: "RNAO UTI Prevention; PSW Personal Care Standards",
      },
      {
        text: "The principle of 'Do with, not for' refers to:",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Doing care tasks alongside a colleague for efficiency",
          },
          {
            l: "B",
            t: "Supporting the client to do as much as possible themselves to maintain function and dignity",
          },
          {
            l: "C",
            t: "Having family members assist with all personal care",
          },
          {
            l: "D",
            t: "Waiting for the client to ask for help before providing any assistance",
          },
        ],
        correct: "B",
        exp: "Restorative care philosophy holds that PSWs should enable maximum independence, not foster dependence. Even if a task takes longer when the client participates, the functional, psychological, and dignity benefits outweigh the time cost.",
        ref: "Restorative Care Framework; FLTCA 2021",
      },
      {
        text: "When dressing a client with LEFT-sided hemiplegia, which arm goes into the sleeve FIRST?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "The right (unaffected) arm — it is stronger",
          },
          {
            l: "B",
            t: "Either arm — it does not matter",
          },
          {
            l: "C",
            t: "The left (affected/weak) arm — it is dressed first",
          },
          {
            l: "D",
            t: "The arm the client prefers",
          },
        ],
        correct: "C",
        exp: "The rule for hemiplegia dressing is: 'weak side IN first, strong side OUT first.' The affected limb has limited ROM — threading it into a sleeve is easier when the garment is loose and unrestricted. For undressing, the strong side comes out first.",
        ref: "Restorative Care; OT Hemiplegia Dressing Guidelines",
      },
      {
        text: "An unconscious client requires oral hygiene. Which positioning is MOST critical for safety?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Flat supine (lying on back) for easier access",
          },
          {
            l: "B",
            t: "Lateral (side-lying) position with head of bed slightly elevated",
          },
          {
            l: "C",
            t: "Prone (face down) position",
          },
          {
            l: "D",
            t: "High Fowler's (sitting upright at 90°)",
          },
        ],
        correct: "B",
        exp: "Lateral positioning uses gravity to allow fluid and secretions to flow out of the mouth rather than into the airway. This is essential for preventing aspiration pneumonia. Suction equipment must be available. Never perform oral care on an unconscious client in the supine position.",
        ref: "RNAO Oral Health Guideline; Aspiration Prevention",
      },
      {
        text: "Safe water temperature for bathing an elderly client is:",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "30–35°C — lukewarm to prevent any burns",
          },
          {
            l: "B",
            t: "38–42°C — comfortably warm, tested on inner wrist",
          },
          {
            l: "C",
            t: "45–50°C — warmer to compensate for rapid cooling",
          },
          {
            l: "D",
            t: "Any temperature the client requests",
          },
        ],
        correct: "B",
        exp: "38–42°C is the safe range for bathing. Elderly clients have reduced temperature sensation and vascular regulation — hot water (>43°C) can cause rapid scalding. Test on your inner wrist (sensitive area) before client contact. Never test on the back of your hand.",
        ref: "PSW Personal Care Safety Standards",
      },
    ],
  },
  {
    id: 7,
    level: "beginner",
    title: "Unit 7 — Mobility & Body Mechanics",
    duration: "12 hours",
    lectures: 5,
    theory: [
      {
        type: "heading",
        content: "Principles of Safe Body Mechanics",
      },
      {
        type: "paragraph",
        content: "Musculoskeletal injuries are among the most common occupational injuries for PSWs. Using correct body mechanics protects both the PSW and the client.",
      },
      {
        type: "list",
        items: [
          "<strong>Wide base of support:</strong> Feet shoulder-width apart, one foot slightly forward for stability.",
          "<strong>Low center of gravity:</strong> Bend at the knees and hips — NEVER the waist. Keep back straight.",
          "<strong>Keep load close:</strong> Hold the client or object close to your body to reduce lever arm force on your spine.",
          "<strong>Avoid twisting:</strong> Pivot with your feet; turn your whole body — never rotate your spine while bearing load.",
          "<strong>Tighten core:</strong> Engage abdominal muscles before lifting to protect the lumbar spine.",
          "<strong>Use mechanical aids:</strong> Gait belts, slide sheets, stand-assist devices, ceiling lifts. Equipment reduces injury risk — use it.",
        ],
      },
      {
        type: "heading",
        content: "Transfer Types and Techniques",
      },
      {
        type: "table",
        headers: [
          "Transfer Method",
          "When Used",
          "Key Safety Points",
        ],
        rows: [
          [
            "<strong>Stand-pivot transfer</strong>",
            "Client can bear weight on at least one leg",
            "Use gait belt, block client's knees with yours, count to 3, pivot — do not swing",
          ],
          [
            "<strong>Mechanical lift (Hoyer)</strong>",
            "Non-weight-bearing, bariatric, high fall risk",
            "Check sling size and integrity, remove wrinkles, ensure legs in proper position, two PSWs for safety",
          ],
          [
            "<strong>Slide board transfer</strong>",
            "Seated, low-strength client (paraplegia)",
            "Smooth board with no rough edges, client slides — PSW guides, not lifts",
          ],
          [
            "<strong>2-person assist</strong>",
            "Client needs partial assistance standing",
            "One PSW at each side; synchronize movement with verbal count",
          ],
          [
            "<strong>Ceiling track lift</strong>",
            "Most complex clients; LTC homes",
            "Follow facility-specific sling protocol; check track integrity",
          ],
        ],
      },
      {
        type: "heading",
        content: "Positioning in Bed — Pressure Injury Prevention",
      },
      {
        type: "list",
        items: [
          "<strong>Supine (back-lying):</strong> Head of bed 30° or less. Heels floating. Pillow under calves to offload heels (most common pressure injury site).",
          "<strong>Lateral (side-lying):</strong> Tilt to 30° — not 90° (90° puts full pressure on greater trochanter). Pillow between knees, under top arm.",
          "<strong>Semi-Fowler's (30°):</strong> Reduces sacral shear. Preferred for most clients.",
          "<strong>Prone (face down):</strong> Rarely used (respiratory compromise) — never for clients with recent abdominal surgery or spinal injuries.",
          "<strong>Repositioning schedule:</strong> Every 2 hours for high-risk clients. Document position changes. Use a repositioning clock or schedule in care plan.",
        ],
      },
      {
        type: "infobox",
        variant: "amber",
        title: "⚠️ Gait Belt Safety Rules",
        content: "The gait belt is mandatory for all stand-pivot and ambulation assists.",
        items: [
          "Apply over clothing, never on bare skin",
          "Fit: 2–3 fingers should slide under the belt comfortably",
          "Position: waist level, buckle to side or front-side",
          "Never use a gait belt on: recent abdominal/spinal surgery, colostomy, G-tube, pregnancy, severe osteoporosis — check care plan",
          "Grip: palm-up underhand grip on the belt for lifting leverage",
        ],
      },
      {
        type: "badges",
        items: [
          "Safe Client Handling",
          "WSIB Prevention",
          "RNAO Fall Prevention",
        ],
      },
      {
        type: "practical",
        steps: [
          {
            title: "Stand-pivot transfer — bed to wheelchair",
            desc: "Demonstrate with a simulation partner: apply gait belt correctly, position wheelchair, lock brakes, block knees, count to 3, stand-pivot to chair. Zero trunk lifting.",
            tag: "Must Pass",
          },
          {
            title: "Mechanical lift — two-person operation",
            desc: "Using a Hoyer lift and simulation mannequin, select correct sling, apply correctly, elevate, transport, lower safely. Identify when NOT to use the lift.",
            tag: "Competency Check",
          },
          {
            title: "Lateral repositioning with pillow support",
            desc: "Correctly position a supine mannequin to 30° lateral tilt with appropriate pillow placement between knees, under arm, heel offloading.",
            tag: "Core Skill",
          },
        ],
      },
    ],
    quiz: [
      {
        text: "When performing a stand-pivot transfer, what is the CORRECT PSW hand position on the gait belt?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Overhand grip at the front of the belt",
          },
          {
            l: "B",
            t: "Palm-up underhand grip on the sides of the belt",
          },
          {
            l: "C",
            t: "Grip the client's upper arms for stability",
          },
          {
            l: "D",
            t: "No specific grip required — any comfortable hold",
          },
        ],
        correct: "B",
        exp: "An underhand (palm-up) grip on the gait belt allows the PSW to use their biceps (stronger) and keeps the wrist in a neutral position, reducing strain. Grabbing the client's arms or clothing is unsafe and can cause injury. The belt provides a stable, distributed grip point.",
        ref: "Safe Client Handling Standards; WSIB PSW Safety",
      },
      {
        text: "A client is positioned at 90° lateral (full side-lying). What pressure injury risk does this create?",
        diff: "hard",
        options: [
          {
            l: "A",
            t: "Increased pressure on the sacrum and coccyx",
          },
          {
            l: "B",
            t: "High pressure on the greater trochanter of the hip",
          },
          {
            l: "C",
            t: "Increased heel pressure — elevate heels immediately",
          },
          {
            l: "D",
            t: "No risk — lateral positioning is the safest option",
          },
        ],
        correct: "B",
        exp: "Full 90° side-lying places maximum body weight directly over the greater trochanter of the hip, which has a bony prominence with little padding. The correct lateral position is 30° tilt using a foam wedge or pillow behind the back, distributing weight more evenly.",
        ref: "NPUAP Pressure Injury Prevention; RNAO Repositioning Guidelines",
      },
      {
        text: "Which of the following clients should NOT have a gait belt applied for a transfer?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "A client with mild COPD",
          },
          {
            l: "B",
            t: "A client who is 3 days post-abdominal surgery with a midline incision",
          },
          {
            l: "C",
            t: "A client with mild hip osteoarthritis",
          },
          {
            l: "D",
            t: "A client who is slightly obese (BMI 32)",
          },
        ],
        correct: "B",
        exp: "Gait belts are contraindicated for clients with recent abdominal surgery (direct waist pressure on incision), G-tubes, colostomies, severe osteoporosis, and advanced pregnancy. Always check the care plan for contraindications before applying a gait belt.",
        ref: "Safe Client Handling Policy; Gait Belt Contraindications",
      },
      {
        text: "The PRIMARY reason PSWs should bend at the knees — not at the waist — when lifting is:",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "It looks more professional to clients",
          },
          {
            l: "B",
            t: "The quadriceps muscles are larger and stronger than back muscles, protecting the lumbar spine",
          },
          {
            l: "C",
            t: "It allows the PSW to see the client's face during the transfer",
          },
          {
            l: "D",
            t: "Waist-bending is acceptable for light loads under 10 kg",
          },
        ],
        correct: "B",
        exp: "The quadriceps and gluteal muscles are among the largest muscle groups in the body and are designed for load-bearing. The erector spinae muscles of the lower back are not — bending at the waist places enormous compressive and shear forces on lumbar discs, leading to injury.",
        ref: "WSIB Occupational Health; Ergonomics for Healthcare Workers",
      },
      {
        text: "A client requires repositioning every 2 hours. During the night shift (12am-6am), how many repositioning turns are required?",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "1 turn",
          },
          {
            l: "B",
            t: "2 turns",
          },
          {
            l: "C",
            t: "3 turns",
          },
          {
            l: "D",
            t: "No turns required — clients sleep overnight",
          },
        ],
        correct: "C",
        exp: "Every 2 hours = turns at 12am, 2am, 4am, and 6am = 3 position changes during a 6-hour period. Pressure injuries develop rapidly — within 1-2 hours of sustained pressure on a vulnerable area. Night shift repositioning is a non-negotiable clinical safety standard.",
        ref: "RNAO Pressure Injury Prevention; FLTCA Care Standards",
      },
    ],
  },
  {
    id: 8,
    level: "beginner",
    title: "Unit 8 — Nutrition & Hydration Basics",
    duration: "12 hours",
    lectures: 5,
    theory: [
      {
        type: "heading",
        content: "Nutritional Requirements for Older Adults",
      },
      {
        type: "paragraph",
        content: "Malnutrition affects 30-50% of older adults in Canadian LTC settings. PSWs are on the front line of identifying nutritional risk and supporting adequate intake.",
      },
      {
        type: "list",
        items: [
          "<strong>Protein:</strong> 1.0-1.2g/kg/day for older adults (higher than younger adults). Supports muscle maintenance, wound healing, immune function.",
          "<strong>Calcium:</strong> 1200mg/day for adults over 70. Critical for bone density. Sources: dairy, fortified plant milk, sardines, leafy greens.",
          "<strong>Vitamin D:</strong> 800-2000 IU/day. Most older adults are deficient — essential for calcium absorption and immune function.",
          "<strong>Fibre:</strong> 21-30g/day. Prevents constipation, manages blood glucose, cardiovascular health.",
          "<strong>Energy needs:</strong> Generally decrease with age due to reduced metabolic rate, but nutrient density needs increase — 'nutrient-dense, calorie-appropriate' eating.",
        ],
      },
      {
        type: "heading",
        content: "Dysphagia — Swallowing Disorders",
      },
      {
        type: "infobox",
        variant: "red",
        title: "⚠️ IDDSI Framework — International Dysphagia Diet Standardisation",
        content: "Canada uses the IDDSI (International Dysphagia Diet Standardisation Initiative) framework for texture-modified diets. Never serve the wrong texture — aspiration can be fatal.",
        items: [
          "<strong>Level 0 — Thin:</strong> Normal liquids (water, juice, milk)",
          "<strong>Level 1 — Slightly Thick:</strong> Nectar-like consistency",
          "<strong>Level 2 — Mildly Thick:</strong> Flows like honey",
          "<strong>Level 3 — Liquidised:</strong> Smooth, no lumps",
          "<strong>Level 4 — Pureed:</strong> Smooth pudding-like consistency, holds shape",
          "<strong>Level 5 — Minced & Moist:</strong> Small soft pieces 4mm x 15mm",
          "<strong>Level 6 — Soft & Bite-Sized:</strong> Tender, no hard pieces, bite-sized",
          "<strong>Level 7 — Regular:</strong> Normal food texture",
        ],
      },
      {
        type: "heading",
        content: "Aspiration Risk — Recognition and Prevention",
      },
      {
        type: "list",
        items: [
          "<strong>Signs of aspiration during eating:</strong> Coughing or choking with food/liquids, wet/gurgly voice after eating, food pocketing in cheeks, drooling, facial grimacing, turning head away.",
          "<strong>Silent aspiration:</strong> No visible signs — particularly dangerous. Common in stroke, Parkinson's, dementia. Report any unexplained respiratory changes.",
          "<strong>Positioning:</strong> Sit upright at 90° for all meals and remain upright for 30 minutes after eating.",
          "<strong>Pacing:</strong> Small bites, wait until swallowed before next bite, minimize distractions, no rushing.",
          "<strong>If choking occurs:</strong> Abdominal thrusts (Heimlich maneuver) if adult cannot cough effectively. Call 911.",
        ],
      },
      {
        type: "heading",
        content: "Hydration — Dehydration Risk",
      },
      {
        type: "list",
        items: [
          "<strong>Daily requirements:</strong> 1.5-2.5L/day for most older adults (from all sources including food).",
          "<strong>Why older adults are at risk:</strong> Reduced thirst sensation (hypothalamic changes), reduced kidney concentration ability, fluid restrictions (heart failure, renal disease), diuretic medications, mobility barriers to getting drinks.",
          "<strong>Signs of dehydration:</strong> Dark urine (concentrated), reduced urine output, dry mucous membranes, confusion, headache, dizziness, constipation.",
          "<strong>Monitoring:</strong> Fluid intake and output (I&O) records. Report urine output <30ml/hour or <240ml/8-hour shift.",
          "<strong>PSW strategies:</strong> Offer fluids with every visit, preferred beverages, adequate cup sizes, accessible placement, thickened fluids as ordered.",
        ],
      },
      {
        type: "badges",
        items: [
          "IDDSI Framework",
          "Dietitians of Canada",
          "Hydration Safety Standards",
        ],
      },
      {
        type: "practical",
        steps: [
          {
            title: "Identify texture levels from food photographs",
            desc: "Given 8 food photographs, correctly identify the IDDSI level (0-7) for each. Demonstrate understanding of why serving incorrect texture is a safety event.",
            tag: "Must Pass",
          },
          {
            title: "Assist with a meal — aspiration precautions",
            desc: "With a simulation partner, demonstrate correct positioning (90° upright), pacing technique, monitoring for aspiration signs, and documentation of intake percentage.",
            tag: "Core Skill",
          },
          {
            title: "Identify and report signs of dehydration",
            desc: "Given a scenario card, identify 3 signs of dehydration in the described client and formulate an SBAR report to the charge nurse including fluid intake documentation.",
            tag: "Competency Check",
          },
        ],
      },
    ],
    quiz: [
      {
        text: "A client on a pureed (IDDSI Level 4) diet is served a bowl of vegetable soup with visible chunks. The MOST appropriate PSW action is:",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Blend the soup at the bedside and serve it",
          },
          {
            l: "B",
            t: "Do not serve the meal; return the tray and notify the dietary department and charge nurse",
          },
          {
            l: "C",
            t: "Remove the large chunks by hand and serve the remaining liquid",
          },
          {
            l: "D",
            t: "Ask the client if they want to try eating it carefully",
          },
        ],
        correct: "B",
        exp: "Serving the wrong texture is a clinical safety incident. The PSW must refuse to serve incorrect meals and immediately notify both dietary (to correct) and the charge nurse (to document and assess the client's current swallowing status). Never attempt to modify texture at bedside unless trained and authorized.",
        ref: "IDDSI Framework; Dysphagia Safety Standards",
      },
      {
        text: "During a meal, a client suddenly makes high-pitched crowing sounds while eating and cannot speak. Your FIRST action is:",
        diff: "hard",
        options: [
          {
            l: "A",
            t: "Give the client a glass of water to wash the food down",
          },
          {
            l: "B",
            t: "Tell the client to cough as hard as possible",
          },
          {
            l: "C",
            t: "Immediately call for help and begin abdominal thrusts (Heimlich maneuver)",
          },
          {
            l: "D",
            t: "Pat the client firmly on the back",
          },
        ],
        correct: "C",
        exp: "High-pitched crowing (stridor) with inability to speak indicates complete airway obstruction — a life-threatening emergency. Abdominal thrusts are the standard first-aid response for conscious adults. Call for help simultaneously. Back blows can be used first if preferred in your province's first-aid protocol.",
        ref: "Red Cross/Heart & Stroke First Aid; PHAC Choking Guidelines",
      },
      {
        text: "Which of the following is the MOST reliable early sign of dehydration in an elderly client?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Thirst",
          },
          {
            l: "B",
            t: "Dark, concentrated urine (amber/dark yellow)",
          },
          {
            l: "C",
            t: "Elevated blood pressure",
          },
          {
            l: "D",
            t: "Increased energy and restlessness",
          },
        ],
        correct: "B",
        exp: "Thirst is an UNRELIABLE indicator in elderly clients because the hypothalamic thirst response is blunted with aging — clients are often significantly dehydrated before feeling thirsty. Urine colour is a practical, easy-to-assess proxy for hydration status: pale yellow = hydrated; dark amber = dehydrated.",
        ref: "Dietitians of Canada; Hydration in Older Adults",
      },
      {
        text: "A PSW notices a client has a wet, gurgly voice immediately after swallowing a sip of water. This MOST likely indicates:",
        diff: "hard",
        options: [
          {
            l: "A",
            t: "Normal swallowing — some people sound this way",
          },
          {
            l: "B",
            t: "A sign of possible aspiration or dysphagia — stop feeding and report to RN immediately",
          },
          {
            l: "C",
            t: "The client has a cold — this is not concerning during a meal",
          },
          {
            l: "D",
            t: "The client should drink faster to prevent this",
          },
        ],
        correct: "B",
        exp: "A wet/gurgly voice quality after swallowing is a classic clinical sign of possible aspiration — fluid entering the larynx creates vibration on the vocal cords. This is a red flag for dysphagia. Stop feeding, position the client upright, and report immediately using SBAR. A speech-language pathologist (SLP) assessment should be requested.",
        ref: "IDDSI Dysphagia Guidelines; SLP Canada Swallowing Standards",
      },
      {
        text: "According to IDDSI, what texture level describes food that is 'tender, soft, moist, and cut into bite-sized pieces no larger than 1.5cm'?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Level 4 — Pureed",
          },
          {
            l: "B",
            t: "Level 5 — Minced & Moist",
          },
          {
            l: "C",
            t: "Level 6 — Soft & Bite-Sized",
          },
          {
            l: "D",
            t: "Level 7 — Regular",
          },
        ],
        correct: "C",
        exp: "IDDSI Level 6 (Soft & Bite-Sized) describes food that requires minimal chewing, is moist, and is pre-cut into pieces ≤1.5cm. Level 5 (Minced & Moist) is smaller particles (4mm x 15mm). Level 4 (Pureed) is completely smooth. Knowing the difference is essential for client safety.",
        ref: "IDDSI Framework 2019; Dietitians of Canada",
      },
    ],
  },
  {
    id: 9,
    level: "intermediate",
    title: "Unit 9 — Clinical Observations & Vital Signs",
    duration: "24 hours",
    lectures: 9,
    theory: [
      {
        type: "heading",
        content: "Normal Vital Sign Ranges — Canadian Adult Standards",
      },
      {
        type: "table",
        headers: [
          "Vital Sign",
          "Normal Range",
          "Report Immediately If",
        ],
        rows: [
          [
            "<strong>Temperature</strong>",
            "36.5–37.5°C (oral); +0.5°C rectal; -0.5°C axillary",
            "<36°C (hypothermia) or >38°C (fever); >40°C (hyperpyrexia)",
          ],
          [
            "<strong>Pulse</strong>",
            "60–100 bpm, regular rhythm",
            "<60 bpm (bradycardia) or >100 bpm (tachycardia); irregular",
          ],
          [
            "<strong>Respiratory Rate</strong>",
            "12–20 breaths/min",
            "<12 (bradypnea) or >20 (tachypnea); laboured breathing",
          ],
          [
            "<strong>Blood Pressure</strong>",
            "Systolic 90–120 / Diastolic 60–80 mmHg",
            "Systolic <90 or >140; Diastolic <60 or >90",
          ],
          [
            "<strong>SpO2</strong>",
            "95–100%",
            "<95% (hypoxia); <90% (severe — emergency)",
          ],
          [
            "<strong>Blood Glucose</strong>",
            "Fasting 4.0–7.0 mmol/L; post-meal <10.0",
            "<4.0 mmol/L (hypoglycemia — treat now); >14.0 mmol/L (hyperglycemia)",
          ],
          [
            "<strong>Pain (0-10)</strong>",
            "Goal: ≤3/10",
            "Sudden change in pattern or ≥7/10 — report",
          ],
        ],
      },
      {
        type: "heading",
        content: "SBAR Reporting of Clinical Changes",
      },
      {
        type: "infobox",
        variant: "blue",
        title: "📋 SBAR Example — Respiratory Deterioration",
        content: "Recommended by the Canadian Patient Safety Institute for all clinical handoffs.",
        items: [
          "<strong>S — Situation:</strong> 'I'm calling about Mr. Johnson in Room 214. He is having breathing difficulty.'",
          "<strong>B — Background:</strong> 'He is 78, has COPD, admitted 3 days ago. Baseline SpO2 was 94%.'",
          "<strong>A — Assessment:</strong> 'His SpO2 is now 88%, RR is 28, he looks anxious and is using accessory muscles.'",
          "<strong>R — Recommendation:</strong> 'I believe he needs immediate assessment. Can you come to the room now? I have positioned him upright.'",
        ],
      },
      {
        type: "heading",
        content: "Emergency Signs — Call 911 Immediately",
      },
      {
        type: "list",
        items: [
          "<strong>Unresponsiveness</strong> or sudden loss of consciousness",
          "<strong>Chest pain</strong> with radiation to arm or jaw + diaphoresis (possible MI)",
          "<strong>FAST signs of stroke:</strong> Face drooping, Arm weakness, Speech difficulty, Time to call 911",
          "<strong>SpO2 <90%</strong> not improving with positioning",
          "<strong>Severe anaphylaxis:</strong> throat swelling, generalized hives, hypotension",
          "<strong>Suspected fracture</strong> after a fall — do NOT move the client",
          "<strong>Severe uncontrolled bleeding</strong>",
        ],
      },
      {
        type: "heading",
        content: "Pain Assessment Tools",
      },
      {
        type: "list",
        items: [
          "<strong>Numerical Rating Scale (NRS 0-10):</strong> For cognitively intact clients — '0 = no pain, 10 = worst pain imaginable. What number is your pain?'",
          "<strong>Wong-Baker FACES Scale:</strong> For clients with mild-moderate cognitive impairment or language barriers — point to the face that matches how you feel.",
          "<strong>PACSLAC / DOLOPLUS:</strong> For clients unable to self-report (severe dementia, unconscious) — observe: guarding, facial grimacing, vocalizations, restlessness.",
          "<strong>OPQRSTU Assessment:</strong> Onset, Provocation/Palliation, Quality, Region/Radiation, Severity, Time course, Understanding (what client thinks is causing it).",
        ],
      },
      {
        type: "badges",
        items: [
          "CPSI Safety Standards",
          "Vital Signs Canada",
          "RNAO Pain Assessment",
        ],
      },
      {
        type: "practical",
        steps: [
          {
            title: "Measure and document radial pulse",
            desc: "Count for 60 seconds using 2 fingertips (not thumb). Describe rate, rhythm (regular/irregular), and strength (strong/weak/bounding/thready). Report any irregularity.",
            tag: "Must Pass",
          },
          {
            title: "Blood pressure measurement — manual auscultation",
            desc: "Correct cuff size selection, arm at heart level, locate brachial pulse, inflate 30mmHg above disappearance point, release at 2-3mmHg/sec, identify Korotkoff sounds I and V.",
            tag: "Competency Check",
          },
          {
            title: "Pain assessment using OPQRSTU",
            desc: "With a simulated client actor, conduct a full pain assessment using OPQRSTU and document findings. Select appropriate pain scale (NRS vs. FACES).",
            tag: "Core Skill",
          },
        ],
      },
    ],
    quiz: [
      {
        text: "A client's SpO2 reading drops from 95% to 88% during morning care. Your FIRST action is:",
        diff: "hard",
        options: [
          {
            l: "A",
            t: "Continue care — SpO2 fluctuates normally during activity",
          },
          {
            l: "B",
            t: "Stop care, position the client upright, apply oxygen if ordered, assess for other distress signs, notify the RN immediately using SBAR",
          },
          {
            l: "C",
            t: "Apply oxygen at the highest available flow rate",
          },
          {
            l: "D",
            t: "Document the reading and report at end of shift",
          },
        ],
        correct: "B",
        exp: "SpO2 <90% is a medical emergency. Stop the activity causing exertion, optimize positioning (upright maximizes lung expansion), apply ordered oxygen if available, and report immediately using SBAR. Never apply oxygen without an order unless in an emergency. End-of-shift reporting is never appropriate for acute deterioration.",
        ref: "CPSI Safety Standards; Respiratory Emergency Protocol",
      },
      {
        text: "Which vital sign finding requires the MOST urgent immediate reporting to the RN?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Temperature 37.2°C",
          },
          {
            l: "B",
            t: "Blood pressure 118/76 mmHg",
          },
          {
            l: "C",
            t: "Pulse rate 44 bpm, client feeling dizzy",
          },
          {
            l: "D",
            t: "Respiratory rate 16 breaths/min",
          },
        ],
        correct: "C",
        exp: "A pulse rate of 44 bpm (bradycardia) with accompanying dizziness indicates that the heart is not pumping enough blood to maintain adequate perfusion — a hemodynamically significant finding requiring immediate RN assessment. Symptomatic bradycardia can progress to cardiac arrest.",
        ref: "Vital Signs Standards; Cardiac Emergency Protocols",
      },
      {
        text: "When counting a client's respiratory rate, you should:",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Tell the client you are counting their breathing and ask them to breathe normally",
          },
          {
            l: "B",
            t: "Count for 15 seconds and multiply by 4 for speed",
          },
          {
            l: "C",
            t: "Count chest rises for 60 seconds without telling the client, as awareness alters breathing",
          },
          {
            l: "D",
            t: "Use a stethoscope to count breath sounds",
          },
        ],
        correct: "C",
        exp: "Informing clients you are counting their breathing causes them to consciously control their rate — this produces an artifactual result. Instead, keep your fingers on the wrist after pulsing counting and count chest or shoulder rises for a full 60 seconds. Counting for 15 seconds x4 misses irregularities.",
        ref: "Vital Signs Assessment Standards; Canadian PSW Training",
      },
      {
        text: "A client rates their pain as 8/10 using the NRS scale. It was 3/10 this morning. What is your priority action?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Offer distraction (TV, music) and reassess in 2 hours",
          },
          {
            l: "B",
            t: "Document the reading and include it in your end-of-shift report",
          },
          {
            l: "C",
            t: "Assess for the cause of the pain change and report immediately to the RN using SBAR",
          },
          {
            l: "D",
            t: "Reposition the client and offer a warm blanket",
          },
        ],
        correct: "C",
        exp: "A sudden increase in pain from 3/10 to 8/10 represents a significant clinical change requiring urgent RN assessment. The change in pain pattern may indicate a new complication (fracture, internal bleeding, infection). While comfort measures are appropriate alongside reporting, they never replace or delay clinical notification.",
        ref: "RNAO Pain Assessment; CPSI Escalation of Care",
      },
      {
        text: "The FACES pain scale is MOST appropriate for which client?",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "A cognitively intact 45-year-old with back pain",
          },
          {
            l: "B",
            t: "A client with moderate dementia and limited English language ability",
          },
          {
            l: "C",
            t: "An unconscious client requiring pain monitoring",
          },
          {
            l: "D",
            t: "A client who prefers digital scales",
          },
        ],
        correct: "B",
        exp: "The Wong-Baker FACES scale uses images of facial expressions (smiling to crying) rather than numbers, making it appropriate for clients who cannot use abstract numerical scales due to cognitive impairment or language barriers. For unconscious clients, behavioural observation tools like PACSLAC must be used.",
        ref: "RNAO Pain Assessment; Wong-Baker FACES Foundation",
      },
    ],
  },
  {
    id: 10,
    level: "intermediate",
    title: "Unit 10 — Chronic Disease Care",
    duration: "28 hours",
    lectures: 12,
    theory: [
      {
        type: "heading",
        content: "Type 2 Diabetes — PSW Management",
      },
      {
        type: "paragraph",
        content: "Over 3 million Canadians have diabetes. PSWs are critical monitors for hypoglycemia and hyperglycemia, especially in LTC settings.",
      },
      {
        type: "list",
        items: [
          "<strong>Hypoglycemia (<4.0 mmol/L) — Rule of 15:</strong> Signs: shakiness, diaphoresis (sweating), pallor, confusion, hunger. Treatment: 15g fast carbohydrate (4 glucose tablets, 125mL juice, 3 tsp sugar) → wait 15 min → recheck BG → if still <4.0, repeat. If no improvement or unconscious → Call 911.",
          "<strong>Hyperglycemia (>14 mmol/L):</strong> Signs: polydipsia (excessive thirst), polyuria, blurred vision, fatigue. Report to RN — never attempt to treat independently.",
          "<strong>Diabetic foot care:</strong> Daily inspection for cuts, blisters, colour changes, temperature differences. Never cut toenails — refer to nurse/podiatrist. Ensure proper-fitting footwear always.",
          "<strong>HHS/DKA emergencies:</strong> Signs: extreme thirst, altered consciousness, fruity breath (DKA). Call 911 immediately.",
        ],
      },
      {
        type: "heading",
        content: "Heart Failure (HF)",
      },
      {
        type: "list",
        items: [
          "<strong>Signs of worsening HF (report immediately):</strong> Weight gain >2kg in 2 days, increasing leg/ankle edema, worsening shortness of breath, orthopnea (SOB lying flat), new or worsening cough.",
          "<strong>Daily weight monitoring:</strong> Same time each day, same scale, after voiding, before eating. Document and report per care plan parameters.",
          "<strong>Fluid management:</strong> Many HF clients have restrictions (e.g., 1.5L/day). Distribute fluids throughout the day. Avoid high-sodium foods.",
          "<strong>Positioning:</strong> HOB elevated 30-45° reduces dyspnea. Elevate legs for edema (unless contraindicated by arterial disease).",
        ],
      },
      {
        type: "heading",
        content: "COPD — Chronic Obstructive Pulmonary Disease",
      },
      {
        type: "list",
        items: [
          "<strong>Pursed-lip breathing:</strong> Inhale through nose (2 counts) → exhale slowly through pursed lips (4 counts). Reduces air trapping and dyspnea.",
          "<strong>Dyspnea positioning:</strong> High Fowler's, tripod position (leaning forward, arms on table), lateral with head elevated.",
          "<strong>Oxygen safety:</strong> Never adjust O2 flow rate without RN/physician order. No smoking or open flames near oxygen. Secure tubing to prevent falls.",
          "<strong>Inhaler assistance:</strong> Shake → prime → client exhales fully → actuate during slow deep inhalation → hold breath 10 seconds. Use spacer device when prescribed.",
        ],
      },
      {
        type: "heading",
        content: "Stroke (CVA) — Post-Stroke Care",
      },
      {
        type: "list",
        items: [
          "<strong>Hemiplegia positioning:</strong> Affected side not compressed. Support with pillows. Approach from unaffected side for communication and most care.",
          "<strong>Dysphagia:</strong> Swallowing difficulty common post-stroke. Signs: coughing during eating, wet/gurgly voice, food pocketing. Follow prescribed modified texture diet. Sit at 90° for all meals and 30 min after.",
          "<strong>Aphasia communication:</strong> Short sentences, yes/no questions, picture boards. Never rush or finish their sentences. Validate frustration.",
          "<strong>FAST recognition:</strong> Face drooping + Arm weakness + Speech difficulty + Time to call 911.",
        ],
      },
      {
        type: "badges",
        items: [
          "Diabetes Canada Guidelines",
          "Heart & Stroke Canada",
          "COPD Canada",
          "Canadian Stroke Best Practices",
        ],
      },
      {
        type: "practical",
        steps: [
          {
            title: "Apply the Rule of 15 — hypoglycemia scenario",
            desc: "Given a scenario: client BG 3.2 mmol/L, shaky and pale. Demonstrate correct food/glucose administration, 15-minute wait, re-check documentation, and escalation protocol if no improvement.",
            tag: "Must Pass",
          },
          {
            title: "Dysphagia meal assist — stroke client",
            desc: "Assist a simulated post-stroke client with dysphagia through a meal: correct positioning, pacing, monitoring for aspiration signs, documentation of intake percentage.",
            tag: "Competency Check",
          },
          {
            title: "Daily weight monitoring and HF reporting",
            desc: "Demonstrate correct daily weigh procedure. Given scenario: client gained 3.5kg in 2 days with new ankle swelling — formulate SBAR report to RN.",
            tag: "Core Skill",
          },
        ],
      },
    ],
    quiz: [
      {
        text: "A client with diabetes has a blood glucose reading of 3.1 mmol/L and is sweating and trembling. After giving 15g of carbohydrates, you should:",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Recheck the blood glucose in 5 minutes",
          },
          {
            l: "B",
            t: "Give another 15g of carbohydrates immediately",
          },
          {
            l: "C",
            t: "Wait 15 minutes then recheck blood glucose",
          },
          {
            l: "D",
            t: "Call 911 immediately",
          },
        ],
        correct: "C",
        exp: "The Rule of 15 requires a 15-minute wait after administering 15g of carbohydrates before rechecking. Glucose takes 10-15 minutes to be absorbed and raise blood sugar. Rechecking too early will still show a low reading even if the treatment is working, leading to over-treatment and rebound hyperglycemia.",
        ref: "Diabetes Canada Clinical Practice Guidelines 2024",
      },
      {
        text: "A client with heart failure gained 3.2 kg in 2 days and reports worsening shortness of breath when lying flat. These findings MOST likely indicate:",
        diff: "hard",
        options: [
          {
            l: "A",
            t: "Normal fluid fluctuation — not clinically significant",
          },
          {
            l: "B",
            t: "Dehydration — increase fluid intake",
          },
          {
            l: "C",
            t: "Heart failure decompensation — report to RN immediately",
          },
          {
            l: "D",
            t: "Medication side effect — check the medication list",
          },
        ],
        correct: "C",
        exp: "Weight gain >2kg in 2 days combined with orthopnea (SOB lying flat) are classic signs of heart failure decompensation — the heart cannot pump effectively and fluid is backing up into the lungs (pulmonary edema). This requires immediate medical assessment. Never increase fluids for a heart failure client without RN direction.",
        ref: "Heart & Stroke Canada; Heart Failure Canada Guidelines",
      },
      {
        text: "A client with COPD asks you to increase their oxygen flow from 2L/min to 4L/min because they feel short of breath. Your response is:",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Increase the flow to 4L/min — the client knows their own body",
          },
          {
            l: "B",
            t: "Do not change the flow rate; reposition the client, encourage pursed-lip breathing, and notify the RN immediately",
          },
          {
            l: "C",
            t: "Compromise at 3L/min to partially meet the client's request",
          },
          {
            l: "D",
            t: "Turn off the oxygen and contact the physician directly",
          },
        ],
        correct: "B",
        exp: "Adjusting oxygen flow rates is a controlled act outside PSW scope. Some COPD clients rely on hypoxic drive — too much oxygen can suppress breathing. Reposition to improve respiratory mechanics, teach pursed-lip breathing, and report immediately to the RN who can adjust parameters or contact the physician.",
        ref: "RHPA Ontario; COPD Canada; Respiratory Therapy Standards",
      },
      {
        text: "When caring for a client post-stroke with right-sided hemiplegia and dysphagia, what is the CORRECT meal positioning?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Semi-reclined at 30° to reduce fatigue from sitting",
          },
          {
            l: "B",
            t: "Fully supine to prevent aspiration by keeping food in the esophagus",
          },
          {
            l: "C",
            t: "Upright at 90° with the chin slightly tucked, remain upright for 30 minutes after eating",
          },
          {
            l: "D",
            t: "Turned to right side to use the stronger swallowing muscles",
          },
        ],
        correct: "C",
        exp: "90° upright positioning uses gravity to assist swallowing and keeps aspirated material away from the airway. A chin-tuck reduces the risk of material entering the airway by narrowing the laryngeal inlet. Remaining upright 30 minutes post-meal allows complete esophageal clearance. Semi-reclined or supine positions dramatically increase aspiration risk.",
        ref: "Canadian Stroke Best Practices; SLP Canada Dysphagia Guidelines",
      },
      {
        text: "Which sign would MOST urgently suggest diabetic ketoacidosis (DKA) requiring 911 activation?",
        diff: "hard",
        options: [
          {
            l: "A",
            t: "Client reports mild increased thirst over the past day",
          },
          {
            l: "B",
            t: "Blood glucose of 12 mmol/L with no other symptoms",
          },
          {
            l: "C",
            t: "Altered consciousness with fruity-smelling breath and rapid deep breathing (Kussmaul respirations)",
          },
          {
            l: "D",
            t: "Client has not eaten lunch and feels slightly tired",
          },
        ],
        correct: "C",
        exp: "DKA is a life-threatening emergency characterized by: altered consciousness/confusion, fruity-smelling breath (acetone from ketone production), Kussmaul respirations (rapid, deep breathing to blow off CO2), nausea/vomiting. DKA requires immediate hospitalization with IV insulin and fluid therapy. Call 911.",
        ref: "Diabetes Canada Emergency Protocols; DKA Recognition",
      },
    ],
  },
  {
    id: 11,
    level: "intermediate",
    title: "Unit 11 — Wound & Skin Care",
    duration: "20 hours",
    lectures: 8,
    theory: [
      {
        type: "heading",
        content: "Pressure Injury Classification (NPUAP/EPUAP)",
      },
      {
        type: "table",
        headers: [
          "Stage",
          "Description",
          "PSW Action",
        ],
        rows: [
          [
            "<strong>Stage 1</strong>",
            "Non-blanchable erythema on intact skin. May be warmer/firmer/cooler than surrounding skin.",
            "Report to RN. Increase repositioning frequency. Moisture barrier.",
          ],
          [
            "<strong>Stage 2</strong>",
            "Partial thickness loss — open ulcer, pink/red wound bed. May appear as intact or ruptured blister.",
            "Report to RN. Do not clean or treat without RN/wound care nurse direction.",
          ],
          [
            "<strong>Stage 3</strong>",
            "Full thickness tissue loss. Subcutaneous fat may be visible. No bone/tendon/muscle exposed.",
            "RN/wound care nurse manages. PSW assists with positioning and prevention.",
          ],
          [
            "<strong>Stage 4</strong>",
            "Full thickness tissue loss with exposed bone, tendon, or muscle.",
            "Medical emergency — RN and physician must assess. Strict repositioning and nutrition support.",
          ],
          [
            "<strong>Unstageable</strong>",
            "Full thickness loss — wound base obscured by slough or eschar.",
            "Do not attempt to remove covering. Wound care nurse assessment required.",
          ],
          [
            "<strong>Deep Tissue Injury (DTI)</strong>",
            "Purple/maroon discolouration of intact skin. Indicates deep tissue damage before skin breakdown.",
            "Report immediately — can rapidly worsen to Stage 3/4.",
          ],
        ],
      },
      {
        type: "heading",
        content: "Common Wound Locations — Pressure Points",
      },
      {
        type: "list",
        items: [
          "<strong>Supine position:</strong> Sacrum/coccyx, heels, back of head, elbows, shoulder blades",
          "<strong>Side-lying:</strong> Greater trochanter (hip), lateral malleolus (ankle), ear, ribs",
          "<strong>Seated:</strong> Ischial tuberosities (buttocks), coccyx, heels if feet not supported",
          "<strong>Prone (rare):</strong> Forehead, chin, chest, knees, toes",
        ],
      },
      {
        type: "heading",
        content: "PSW Role in Wound Care",
      },
      {
        type: "infobox",
        variant: "amber",
        title: "⚠️ PSW Scope in Wound Care",
        content: "PSWs do NOT perform wound dressing changes unless specifically trained and delegated by an RN.",
        items: [
          "<strong>PSW CAN:</strong> Observe and report wound appearance, apply skin protectants/moisture barriers, assist with repositioning, support nutrition, complete wound observation documentation",
          "<strong>PSW CANNOT:</strong> Debride wounds, apply prescribed wound dressings, irrigate wounds, interpret wound cultures",
          "<strong>What to observe and report:</strong> Size (measure if trained), colour (pink/red/yellow/black), odour, drainage (amount, colour, consistency), surrounding skin condition, pain level",
        ],
      },
      {
        type: "heading",
        content: "Skin Integrity — Prevention Strategies",
      },
      {
        type: "list",
        items: [
          "<strong>Moisture management:</strong> Apply moisture barriers (zinc oxide paste, barrier cream) to incontinent areas. Change wet/soiled briefs immediately.",
          "<strong>Friction reduction:</strong> Use slide sheets during repositioning. Lift — do not drag. Use heel protectors and foam boots.",
          "<strong>Nutrition support:</strong> Protein and vitamin C are critical for wound healing. Report poor intake — refer to dietitian.",
          "<strong>Hydration:</strong> Well-hydrated skin is more resilient. Monitor fluid intake.",
          "<strong>Activity:</strong> Encourage mobility within client's ability. Even passive ROM exercises improve circulation.",
        ],
      },
      {
        type: "badges",
        items: [
          "NPUAP/EPUAP Staging",
          "RNAO Wound Care Guideline",
          "WOCN Society Canada",
        ],
      },
      {
        type: "practical",
        steps: [
          {
            title: "Head-to-toe skin assessment and documentation",
            desc: "Using a simulation mannequin with simulated wounds, perform a systematic skin assessment. Correctly identify and document: Stage 1 pressure injury (sacrum), skin tear (forearm), moisture-associated skin damage (perineum).",
            tag: "Must Pass",
          },
          {
            title: "Apply moisture barrier cream — perineal area",
            desc: "Demonstrate correct application of barrier cream to perineal area following incontinence episode: correct product selection, application technique, documentation.",
            tag: "Core Skill",
          },
          {
            title: "Identify and report a deep tissue injury",
            desc: "Given a photograph of a purple discolouration over a heel, correctly identify as possible DTI, explain urgency, and formulate SBAR report to RN.",
            tag: "Competency Check",
          },
        ],
      },
    ],
    quiz: [
      {
        text: "A PSW observes a reddened area over a client's sacrum that turns white when pressed and returns to red when pressure is released (blanchable erythema). This MOST likely indicates:",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Stage 1 pressure injury requiring immediate wound care",
          },
          {
            l: "B",
            t: "Reactive hyperemia — blood vessels dilating in response to pressure — no tissue damage yet",
          },
          {
            l: "C",
            t: "Stage 2 pressure injury",
          },
          {
            l: "D",
            t: "Deep tissue injury",
          },
        ],
        correct: "B",
        exp: "Blanchable erythema (skin turns white when pressed) indicates reactive hyperemia — a normal vascular response to ischemia. Blood vessels dilate after pressure is removed, causing redness. This is NOT a Stage 1 pressure injury. Stage 1 is NON-blanchable redness indicating microvascular damage.",
        ref: "NPUAP/EPUAP Pressure Injury Classification System",
      },
      {
        text: "During morning care, you notice a purple-maroon discoloration over a client's heel with intact skin. Your action should be:",
        diff: "hard",
        options: [
          {
            l: "A",
            t: "Apply a warm compress to improve circulation",
          },
          {
            l: "B",
            t: "Massage the area vigorously to restore blood flow",
          },
          {
            l: "C",
            t: "Report to the RN immediately — this is a suspected deep tissue injury",
          },
          {
            l: "D",
            t: "Document and monitor — purple discoloration is normal in elderly skin",
          },
        ],
        correct: "C",
        exp: "Purple/maroon intact skin discoloration is a suspected Deep Tissue Injury (DTI) — indicating damage to deeper tissues before skin breakdown is visible. DTIs can rapidly deteriorate to Stage 3-4 injuries. Massage is contraindicated over any pressure injury (damages fragile tissue). Report immediately.",
        ref: "NPUAP DTI Classification; RNAO Pressure Injury Prevention",
      },
      {
        text: "Which of the following is within PSW scope of practice for wound care?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Applying a prescribed hydrocolloid dressing to a Stage 2 wound",
          },
          {
            l: "B",
            t: "Debriding slough from a Stage 3 wound bed",
          },
          {
            l: "C",
            t: "Observing and documenting wound appearance including drainage characteristics, and reporting to the RN",
          },
          {
            l: "D",
            t: "Irrigating a wound with normal saline as taught in a YouTube video",
          },
        ],
        correct: "C",
        exp: "PSWs observe, document, and report wound findings — they do not perform wound treatments unless specifically trained and delegated by an RN with a documented delegation order. Observation skills are critical: wound colour, odour, drainage type (serous/serosanguinous/purulent), and surrounding skin condition.",
        ref: "RHPA Ontario; PSW Scope of Practice; HSCPOA Standards",
      },
      {
        text: "Which nutritional factor is MOST important for wound healing?",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Carbohydrates — provide energy for cell division",
          },
          {
            l: "B",
            t: "Protein — essential for collagen synthesis and tissue repair",
          },
          {
            l: "C",
            t: "Fat — provides insulation around the wound",
          },
          {
            l: "D",
            t: "Vitamin B12 — required for nerve regeneration",
          },
        ],
        correct: "B",
        exp: "Protein is the primary building block of collagen, the structural protein of skin. Wound healing requires significantly increased protein (up to 1.5-2g/kg/day for complex wounds). PSWs play a key role by monitoring and reporting nutritional intake, supporting meal assistance, and advocating for dietitian referrals.",
        ref: "WOCN; Dietitians of Canada Wound Nutrition Guidelines",
      },
      {
        text: "A pressure injury with visible subcutaneous fat but no bone, tendon, or muscle exposed is classified as:",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Stage 2",
          },
          {
            l: "B",
            t: "Stage 3",
          },
          {
            l: "C",
            t: "Stage 4",
          },
          {
            l: "D",
            t: "Unstageable",
          },
        ],
        correct: "B",
        exp: "Stage 3 = full thickness tissue loss exposing subcutaneous fat. Bone, tendon, and muscle are NOT visible (if they were, it would be Stage 4). Depth varies by location — over the sacrum, Stage 3 can be deep due to fatty tissue; over cartilaginous areas (nose, ear), it may be shallow.",
        ref: "NPUAP/EPUAP Pressure Injury Staging 2019",
      },
    ],
  },
  {
    id: 12,
    level: "intermediate",
    title: "Unit 12 — Medication Assistance",
    duration: "18 hours",
    lectures: 7,
    theory: [
      {
        type: "heading",
        content: "PSW Role in Medication Management",
      },
      {
        type: "infobox",
        variant: "red",
        title: "⚠️ Critical Scope Boundary",
        content: "PSWs do NOT administer medications. However, PSWs DO assist clients who self-administer their own medications in specific circumstances.",
        items: [
          "<strong>PSW CAN (in community/home care, if client is self-administering):</strong> Hand the client their pre-filled medication organizer, open a medication bottle the client cannot open independently, remind the client it is time for medication",
          "<strong>PSW CAN (only with specific delegation):</strong> Administer certain medications (see Unit 20 — Delegated Acts)",
          "<strong>PSW CANNOT:</strong> Add medications to a client's medication organizer, crush medications without RN direction, adjust doses, administer medications that are not delegated",
        ],
      },
      {
        type: "heading",
        content: "The 10 Rights of Medication Administration (for delegated contexts)",
      },
      {
        type: "list",
        items: [
          "<strong>Right Client:</strong> Verify with 2 identifiers (name + date of birth)",
          "<strong>Right Medication:</strong> Match label to MAR (medication administration record)",
          "<strong>Right Dose:</strong> Verify quantity against the order",
          "<strong>Right Route:</strong> Oral, sublingual, topical, subcutaneous, etc.",
          "<strong>Right Time:</strong> Within 30 minutes of scheduled time",
          "<strong>Right Documentation:</strong> Document immediately after administration",
          "<strong>Right to Refuse:</strong> Client may refuse — document refusal and notify RN",
          "<strong>Right Technique:</strong> Proper administration method",
          "<strong>Right Assessment:</strong> Check for contraindications before giving (e.g., BP before antihypertensive)",
          "<strong>Right Education:</strong> Client understands what the medication is for",
        ],
      },
      {
        type: "heading",
        content: "Common Medication Classes — PSW Awareness",
      },
      {
        type: "table",
        headers: [
          "Drug Class",
          "Common Examples",
          "PSW Monitoring Focus",
        ],
        rows: [
          [
            "<strong>Antihypertensives</strong>",
            "Ramipril, amlodipine, metoprolol",
            "Monitor BP before assist; signs of hypotension — dizziness, falls",
          ],
          [
            "<strong>Diuretics</strong>",
            "Furosemide (Lasix), hydrochlorothiazide",
            "Monitor fluid intake/output; electrolyte signs (muscle cramps, weakness)",
          ],
          [
            "<strong>Anticoagulants</strong>",
            "Warfarin (Coumadin), apixaban (Eliquis)",
            "Monitor for bleeding signs: bruising, blood in urine/stool, prolonged bleeding from cuts",
          ],
          [
            "<strong>Insulin / Oral hypoglycemics</strong>",
            "Metformin, glyburide, insulin",
            "Monitor BG; watch for hypoglycemia signs",
          ],
          [
            "<strong>Analgesics (opioids)</strong>",
            "Morphine, hydromorphone, oxycodone",
            "Monitor respiratory rate, consciousness, constipation, fall risk",
          ],
          [
            "<strong>Antipsychotics</strong>",
            "Quetiapine, risperidone",
            "Monitor for drowsiness, falls, EPS (tremors, rigidity)",
          ],
        ],
      },
      {
        type: "heading",
        content: "Medication Errors — Prevention and Reporting",
      },
      {
        type: "list",
        items: [
          "<strong>If you observe an error:</strong> Do not administer the medication. Report immediately to the RN. Complete an incident report.",
          "<strong>If a client takes an incorrect medication:</strong> Do not induce vomiting. Call Poison Control (1-800-268-9017 in Ontario) and the RN immediately.",
          "<strong>Medication refusal:</strong> Document exact time, medication refused, client's reason (if given), and notify RN. Never force medication.",
          "<strong>Medication storage:</strong> Secure storage (lockbox or locked cabinet) for controlled substances. Proper temperature for refrigerated medications.",
        ],
      },
      {
        type: "badges",
        items: [
          "RHPA Ontario",
          "ISMP Canada Medication Safety",
          "10 Rights of Medication",
        ],
      },
      {
        type: "practical",
        steps: [
          {
            title: "Identify medication scope boundaries — case scenarios",
            desc: "Given 6 scenario cards, correctly categorize each as: within PSW scope / outside PSW scope / requires delegation. Justify each answer.",
            tag: "Must Pass",
          },
          {
            title: "Recognize anticoagulant bleeding risk",
            desc: "Given a scenario: client on Eliquis has a dark tarry stool. Identify this as a possible GI bleed, formulate SBAR report, and describe documentation requirements.",
            tag: "Competency Check",
          },
          {
            title: "Medication refusal documentation",
            desc: "A client refuses their morning blood pressure medication. Demonstrate: respectful acknowledgment of refusal, correct documentation, notification to RN.",
            tag: "Core Skill",
          },
        ],
      },
    ],
    quiz: [
      {
        text: "A client in a community home care setting asks you to refill their weekly pill organizer from their prescription bottles. Your response is:",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Fill the organizer — this is a basic task within PSW scope",
          },
          {
            l: "B",
            t: "Fill it only if you have seen the doctor's prescription",
          },
          {
            l: "C",
            t: "Explain that filling pill organizers is outside PSW scope and contact the care coordinator to arrange pharmacist or RN assistance",
          },
          {
            l: "D",
            t: "Fill only the morning pills to help out",
          },
        ],
        correct: "C",
        exp: "Filling medication organizers (preparing medications) is outside PSW scope in all Canadian provinces. This is a medication preparation task reserved for regulated health professionals or the client themselves. Errors in filling organizers can lead to dangerous medication mix-ups.",
        ref: "RHPA Ontario; HSCPOA Scope of Practice",
      },
      {
        text: "A client on warfarin (Coumadin) tells you their stool has been very dark and tarry for two days. You should:",
        diff: "hard",
        options: [
          {
            l: "A",
            t: "Recommend increasing dietary iron — dark stool can be from iron deficiency",
          },
          {
            l: "B",
            t: "Advise the client to drink more water and eat more fibre",
          },
          {
            l: "C",
            t: "Report to the RN immediately — dark tarry stool on anticoagulant may indicate GI bleeding",
          },
          {
            l: "D",
            t: "Document and monitor — stool colour can change with diet",
          },
        ],
        correct: "C",
        exp: "Melena (dark, tarry, foul-smelling stool) in a client on anticoagulants is a red flag for upper GI bleeding. Anticoagulants prevent clotting — GI bleeding in these clients can be life-threatening. This requires immediate medical assessment.",
        ref: "ISMP Canada; Anticoagulant Safety Guidelines",
      },
      {
        text: "A client refuses their prescribed antihypertensive medication. Your documentation should include:",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "'Client non-compliant with medications' and nothing else",
          },
          {
            l: "B",
            t: "Date, time, exact medication refused, client's stated reason, notification of RN, with objective language",
          },
          {
            l: "C",
            t: "Skip documenting — it's the nurse's responsibility to track refusals",
          },
          {
            l: "D",
            t: "'Client refused medication as usual — chronic non-compliance'",
          },
        ],
        correct: "B",
        exp: "All medication refusals must be documented objectively: the specific medication, dose, time, and the client's exact words (if given). 'Non-compliant' is a subjective, stigmatizing term. The RN must be notified so they can assess the reason and update the care plan if needed.",
        ref: "ISMP Canada; Documentation Standards",
      },
      {
        text: "Before assisting a client to self-administer their antihypertensive medication, what is the most important PSW observation?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Whether the client has eaten breakfast",
          },
          {
            l: "B",
            t: "The current blood pressure reading, if monitoring is part of the care plan",
          },
          {
            l: "C",
            t: "How many pills remain in the bottle",
          },
          {
            l: "D",
            t: "Whether the client remembers taking it yesterday",
          },
        ],
        correct: "B",
        exp: "Antihypertensives lower blood pressure — administering them when BP is already low (e.g., systolic <90) can cause dangerous hypotension. The care plan will specify a BP threshold — if BP is below the threshold, withhold the medication and notify the RN before the client self-administers.",
        ref: "10 Rights of Medication; Safe Medication Administration",
      },
      {
        text: "The PSW's PRIMARY role regarding medications in a Long-Term Care setting is:",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Administering all scheduled medications to save the nursing staff time",
          },
          {
            l: "B",
            t: "Observing for medication effects and side effects, reporting observations to the RN",
          },
          {
            l: "C",
            t: "Verifying medication orders against the MAR independently",
          },
          {
            l: "D",
            t: "Crushing all medications for easier administration",
          },
        ],
        correct: "B",
        exp: "In LTC, nurses administer medications. PSWs are the most frequent observers of clients — they observe for medication effects (desired outcomes) and adverse effects (side effects, toxicity, allergic reactions). This observation role is critical and requires knowledge of common medication classes and their expected and adverse effects.",
        ref: "FLTCA 2021; PSW Scope of Practice",
      },
    ],
  },
  {
    id: 13,
    level: "intermediate",
    title: "Unit 13 — Mental Health & Cognitive Care",
    duration: "24 hours",
    lectures: 10,
    theory: [
      {
        type: "heading",
        content: "Dementia — Types and Progression",
      },
      {
        type: "paragraph",
        content: "Over 597,000 Canadians live with dementia. Alzheimer's disease accounts for 60-70% of cases. Understanding types helps PSWs anticipate care needs and respond therapeutically.",
      },
      {
        type: "list",
        items: [
          "<strong>Alzheimer's Disease:</strong> Gradual memory loss → impaired judgment → personality changes → complete dependence. Language (aphasia), motor skills (apraxia), and recognition (agnosia) affected in later stages.",
          "<strong>Vascular Dementia:</strong> Caused by strokes or reduced blood flow. Stepwise decline (not gradual). Symptoms vary based on affected brain areas.",
          "<strong>Lewy Body Dementia (LBD):</strong> Visual hallucinations, Parkinson-like symptoms (rigidity, tremors), fluctuating consciousness. HIGH fall risk. Certain antipsychotics can be FATAL in LBD — alert team.",
          "<strong>Frontotemporal Dementia (FTD):</strong> Primarily affects behaviour and language — not memory first. Disinhibition, apathy, compulsive behaviours. Often affects people aged 45-65.",
        ],
      },
      {
        type: "heading",
        content: "The 3 Ds — Delirium, Dementia, Depression",
      },
      {
        type: "table",
        headers: [
          "Feature",
          "Delirium",
          "Dementia",
          "Depression",
        ],
        rows: [
          [
            "<strong>Onset</strong>",
            "Sudden (hours-days)",
            "Gradual (months-years)",
            "Gradual (weeks-months)",
          ],
          [
            "<strong>Duration</strong>",
            "Days to weeks",
            "Progressive, permanent",
            "Weeks to months (treatable)",
          ],
          [
            "<strong>Consciousness</strong>",
            "Fluctuating, clouded",
            "Usually clear early",
            "Usually clear",
          ],
          [
            "<strong>Memory</strong>",
            "Impaired (recent)",
            "Impaired (recent first)",
            "Poor concentration, not true amnesia",
          ],
          [
            "<strong>Action Required</strong>",
            "MEDICAL EMERGENCY",
            "Care plan adjustment",
            "Mental health referral",
          ],
        ],
      },
      {
        type: "heading",
        content: "Responsive Behaviours — Understanding and De-escalation",
      },
      {
        type: "infobox",
        variant: "green",
        title: "💡 Responsive Behaviours are Communications",
        content: "Wandering, agitation, resistiveness to care, and repetitive questioning are not 'problem behaviours' — they are the person's best attempt to communicate an unmet need.",
        items: [
          "<strong>Common unmet needs behind responsive behaviours:</strong> Pain, hunger, thirst, need to toilet, boredom, loneliness, fear, discomfort",
          "<strong>P.I.E.C.E.S. Framework (used across Canada):</strong> Physical, Intellectual, Emotional, Capabilities, Environment, Social",
          "<strong>Non-pharmacological approaches FIRST:</strong> Music therapy, reminiscence, therapeutic touch, validation, structured activities",
          "<strong>De-escalation:</strong> Approach calmly from front, eye contact, low soft voice, preferred name, identify the unmet need, offer choice",
        ],
      },
      {
        type: "heading",
        content: "Communication with Dementia — Validation Therapy",
      },
      {
        type: "list",
        items: [
          "<strong>Never correct or argue:</strong> If a client with advanced dementia says they need to pick up their children from school, do not say 'Your children are grown.' Enter their emotional reality.",
          "<strong>Validate the emotion:</strong> 'It sounds like you're worried about being late — that must feel stressful.' The feeling is real even if the content is not.",
          "<strong>Redirect gently:</strong> After validating, guide toward a meaningful activity: 'Let's go for a walk while we wait for them.'",
          "<strong>Short sentences:</strong> One idea at a time. Wait for response. Use the client's preferred name.",
          "<strong>Non-verbal:</strong> 55% of communication is body language. Calm, open posture communicates safety even when words fail.",
        ],
      },
      {
        type: "badges",
        items: [
          "Alzheimer Society of Canada",
          "P.I.E.C.E.S. Framework",
          "Validation Therapy (Naomi Feil)",
        ],
      },
      {
        type: "practical",
        steps: [
          {
            title: "De-escalation — resistive to care simulation",
            desc: "A client actor resists a bed bath by pushing hands away and shouting. Demonstrate: calm approach, validation of emotion, identifying unmet need, offering choice, documenting the responsive behaviour.",
            tag: "Safety Simulation",
          },
          {
            title: "Differentiate delirium from dementia",
            desc: "Given two scenario cards (one describing new acute confusion in a previously stable client; one describing gradual cognitive decline), correctly identify which is likely delirium and explain the urgency difference.",
            tag: "Must Pass",
          },
          {
            title: "Validation therapy conversation",
            desc: "With a simulation partner acting as a person with late-stage Alzheimer's who is looking for their deceased mother, conduct a 3-minute validation therapy interaction.",
            tag: "Therapeutic Skill",
          },
        ],
      },
    ],
    quiz: [
      {
        text: "A client with Alzheimer's disease who was previously calm and oriented suddenly becomes agitated, confused, and disoriented — far beyond their baseline. This change MOST likely indicates:",
        diff: "hard",
        options: [
          {
            l: "A",
            t: "Normal progression of Alzheimer's disease",
          },
          {
            l: "B",
            t: "A sundowning episode — reassure and wait for it to pass",
          },
          {
            l: "C",
            t: "Acute delirium — a medical emergency requiring immediate RN assessment",
          },
          {
            l: "D",
            t: "The client is manipulating staff for attention",
          },
        ],
        correct: "C",
        exp: "Any ACUTE change in cognitive status (sudden vs. gradual) in a person with dementia should be treated as delirium until proven otherwise. Delirium in older adults is often caused by UTI, pneumonia, medication toxicity, or metabolic disturbance. It is a medical emergency — report immediately using SBAR.",
        ref: "Alzheimer Society of Canada; 4AT Delirium Screening Tool",
      },
      {
        text: "A client with dementia tells you: 'I need to go home to make dinner for my husband.' (Her husband passed away 20 years ago.) The BEST response using validation therapy is:",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "'Your husband passed away. You live here now and dinner is being made for you.'",
          },
          {
            l: "B",
            t: "'That sounds important to you. What does your husband like for dinner?'",
          },
          {
            l: "C",
            t: "Ignore the comment and redirect to a different topic immediately",
          },
          {
            l: "D",
            t: "'You're confused — this IS your home. Let me show you your room.'",
          },
        ],
        correct: "B",
        exp: "Validation therapy acknowledges the emotional reality behind the statement without confirming or denying the factual content. The feeling (wanting to care for a loved one) is real and meaningful. Engaging with the emotion ('that sounds important') and using reminiscence ('what does he like?') maintains dignity and reduces distress.",
        ref: "Validation Therapy (Naomi Feil); Alzheimer Society of Canada",
      },
      {
        text: "Which of the following is a key distinguishing feature of Lewy Body Dementia that PSWs MUST know for safety?",
        diff: "hard",
        options: [
          {
            l: "A",
            t: "Memory loss is always the first and most prominent symptom",
          },
          {
            l: "B",
            t: "Certain antipsychotic medications can cause severe and potentially fatal reactions in LBD clients",
          },
          {
            l: "C",
            t: "LBD primarily affects clients under age 60",
          },
          {
            l: "D",
            t: "Physical symptoms (tremors, rigidity) never occur in LBD",
          },
        ],
        correct: "B",
        exp: "Lewy Body Dementia involves abnormal protein deposits that make clients hypersensitive to neuroleptic (antipsychotic) medications. Medications like haloperidol can cause severe neuroleptic sensitivity reactions, including acute confusion, rigidity, fever, and death. PSWs must alert the care team immediately if a client with suspected LBD is prescribed these medications.",
        ref: "Lewy Body Dementia Association; Canadian Geriatrics Society",
      },
      {
        text: "The P.I.E.C.E.S. framework used across Canada stands for:",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Physical, Intellectual, Emotional, Capabilities, Environment, Social",
          },
          {
            l: "B",
            t: "Pain, Intervention, Education, Comfort, Ethics, Safety",
          },
          {
            l: "C",
            t: "Patient, Individual, Emotional, Care, Empathy, Support",
          },
          {
            l: "D",
            t: "Physiological, Integrated, Evaluation, Care, Equipment, Standards",
          },
        ],
        correct: "A",
        exp: "P.I.E.C.E.S. (Physical, Intellectual, Emotional, Capabilities, Environment, Social) is the Canadian framework for understanding the whole person with dementia and mental health challenges. It guides assessment of responsive behaviours by examining all dimensions of a person's life that may be contributing to distress.",
        ref: "P.I.E.C.E.S. Canada; Alzheimer Society of Canada",
      },
      {
        text: "A client with dementia repeatedly asks 'When is my daughter coming?' every 5 minutes. The BEST PSW strategy is:",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Remind the client that they already asked this and asked them to stop",
          },
          {
            l: "B",
            t: "Give the same factual answer each time with patience and warmth",
          },
          {
            l: "C",
            t: "Validate the underlying emotion ('You must love your daughter very much') and redirect to a meaningful activity",
          },
          {
            l: "D",
            t: "Ignore the repetitive questioning as it is attention-seeking behaviour",
          },
        ],
        correct: "C",
        exp: "Repetitive questioning in dementia reflects an unmet emotional need (often reassurance, connection, or anxiety about something). Validating the feeling and redirecting to a meaningful activity addresses the need rather than the behaviour. Correction ('you already asked that') causes distress without benefit.",
        ref: "Alzheimer Society of Canada; Responsive Behaviour Guidelines",
      },
    ],
  },
  {
    id: 14,
    level: "intermediate",
    title: "Unit 14 — Palliative & End-of-Life Care",
    duration: "22 hours",
    lectures: 9,
    theory: [
      {
        type: "heading",
        content: "Goals of Care — Comfort vs. Curative",
      },
      {
        type: "paragraph",
        content: "This unit covers Palliative care, comfort-focused care goals, POLST/ACP, signs of active dying, symptom management (pain, dyspnea, secretions), cultural/spiritual support, grief support for families.",
      },
      {
        type: "list",
        items: [
          "<strong>Goals of Care — Comfort vs. Curative:</strong> Core competency area for this unit.",
          "<strong>Signs of Active Dying:</strong> Core competency area for this unit.",
          "<strong>Symptom Management in Final Hours:</strong> Core competency area for this unit.",
          "<strong>Spiritual and Cultural Care:</strong> Core competency area for this unit.",
          "<strong>Supporting Grieving Families:</strong> Core competency area for this unit.",
          "<strong>Advance Care Planning (ACP) in Canada:</strong> Core competency area for this unit.",
        ],
      },
      {
        type: "infobox",
        variant: "blue",
        title: "📋 Canadian Standards",
        content: "This unit is aligned with Canadian PSW training standards across Ontario, BC, and Alberta. All content reflects current provincial guidelines.",
      },
      {
        type: "badges",
        items: [
          "Canadian PSW Standard",
          "Provincial Guidelines",
          "Evidence-Based Practice",
        ],
      },
      {
        type: "practical",
        steps: [
          {
            title: "Goals of Care — Comfort vs. Curative",
            desc: "Apply knowledge of Goals of Care — Comfort vs. Curative in a simulated care scenario.",
            tag: "Core Skill",
          },
          {
            title: "Signs of Active Dying",
            desc: "Demonstrate competency through scenario-based learning.",
            tag: "Competency Check",
          },
        ],
      },
    ],
    quiz: [
      {
        text: "Which of the following BEST describes a key principle of 'Goals of Care — Comfort vs. Curative'?",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Option A: applying the principle in practice",
          },
          {
            l: "B",
            t: "Option B: understanding the theoretical framework",
          },
          {
            l: "C",
            t: "Option C: following provincial regulatory standards",
          },
          {
            l: "D",
            t: "Option D: communicating findings to the healthcare team",
          },
        ],
        correct: "C",
        exp: "Following provincial regulatory standards is foundational in Canadian PSW practice. This unit's content on Goals of Care — Comfort vs. Curative is directly guided by provincial legislation and best practice guidelines.",
        ref: "Canadian PSW Training Standards",
      },
      {
        text: "In the context of Unit 14 — Palliative & End-of-Life Care, what is the PSW's PRIMARY role?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Independently making clinical decisions",
          },
          {
            l: "B",
            t: "Observing, reporting, and implementing the care plan under supervision",
          },
          {
            l: "C",
            t: "Taking over responsibilities from the nursing team",
          },
          {
            l: "D",
            t: "Providing information to family members independently",
          },
        ],
        correct: "B",
        exp: "PSWs work under the supervision of Regulated Health Professionals, implementing the care plan, observing for changes, and reporting findings. Independent clinical decision-making is outside PSW scope.",
        ref: "HSCPOA Standards; PSW Scope of Practice",
      },
      {
        text: "Documentation in healthcare must be:",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Written only at end of shift for efficiency",
          },
          {
            l: "B",
            t: "Objective, accurate, timely, and legible",
          },
          {
            l: "C",
            t: "Subjective and based on PSW interpretation",
          },
          {
            l: "D",
            t: "Shared publicly to ensure transparency",
          },
        ],
        correct: "B",
        exp: "Healthcare documentation must be objective (facts, not opinions), accurate, written close to the time of the event, and legible. It is a legal document — errors in documentation can have serious consequences for clients and providers.",
        ref: "Documentation Standards; PHIPA",
      },
      {
        text: "When a PSW observes a significant change in a client's condition, they should:",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Wait until the end of the shift to report",
          },
          {
            l: "B",
            t: "Report immediately to the supervising RN or RPN using SBAR",
          },
          {
            l: "C",
            t: "Consult the client's family first",
          },
          {
            l: "D",
            t: "Document and wait for the next care team meeting",
          },
        ],
        correct: "B",
        exp: "Significant clinical changes require immediate reporting. The SBAR tool (Situation, Background, Assessment, Recommendation) is the Canadian standard for structured clinical communication, recognized by the Canadian Patient Safety Institute.",
        ref: "CPSI SBAR; Escalation of Care",
      },
      {
        text: "Which of the following represents the BEST evidence-based practice in Unit 14 — Palliative & End-of-Life Care?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Following the most recent provincial guidelines and best practice recommendations",
          },
          {
            l: "B",
            t: "Using techniques learned from colleagues regardless of training currency",
          },
          {
            l: "C",
            t: "Applying what worked in previous employment without reviewing current standards",
          },
          {
            l: "D",
            t: "Relying exclusively on client/family preferences for all care decisions",
          },
        ],
        correct: "A",
        exp: "Evidence-based practice requires integrating current best evidence (provincial guidelines, clinical research) with clinical expertise and client preferences. PSWs are responsible for maintaining current knowledge through ongoing education.",
        ref: "RNAO Best Practice Guidelines; Evidence-Based Nursing",
      },
    ],
  },
  {
    id: 15,
    level: "intermediate",
    title: "Unit 15 — Pediatric & Family Support",
    duration: "18 hours",
    lectures: 7,
    theory: [
      {
        type: "heading",
        content: "Child Development Milestones",
      },
      {
        type: "paragraph",
        content: "This unit covers PSW care for children and youth with complex needs at home, developmental milestones, supporting family caregivers, child protection obligations, age-appropriate communication.",
      },
      {
        type: "list",
        items: [
          "<strong>Child Development Milestones:</strong> Core competency area for this unit.",
          "<strong>Complex Medical Needs in Children:</strong> Core competency area for this unit.",
          "<strong>PSW Role in Pediatric Home Care:</strong> Core competency area for this unit.",
          "<strong>Child Protection — Mandatory Reporting:</strong> Core competency area for this unit.",
          "<strong>Family Caregiver Support:</strong> Core competency area for this unit.",
        ],
      },
      {
        type: "infobox",
        variant: "blue",
        title: "📋 Canadian Standards",
        content: "This unit is aligned with Canadian PSW training standards across Ontario, BC, and Alberta. All content reflects current provincial guidelines.",
      },
      {
        type: "badges",
        items: [
          "Canadian PSW Standard",
          "Provincial Guidelines",
          "Evidence-Based Practice",
        ],
      },
      {
        type: "practical",
        steps: [
          {
            title: "Child Development Milestones",
            desc: "Apply knowledge of Child Development Milestones in a simulated care scenario.",
            tag: "Core Skill",
          },
          {
            title: "Complex Medical Needs in Children",
            desc: "Demonstrate competency through scenario-based learning.",
            tag: "Competency Check",
          },
        ],
      },
    ],
    quiz: [
      {
        text: "Which of the following BEST describes a key principle of 'Child Development Milestones'?",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Option A: applying the principle in practice",
          },
          {
            l: "B",
            t: "Option B: understanding the theoretical framework",
          },
          {
            l: "C",
            t: "Option C: following provincial regulatory standards",
          },
          {
            l: "D",
            t: "Option D: communicating findings to the healthcare team",
          },
        ],
        correct: "C",
        exp: "Following provincial regulatory standards is foundational in Canadian PSW practice. This unit's content on Child Development Milestones is directly guided by provincial legislation and best practice guidelines.",
        ref: "Canadian PSW Training Standards",
      },
      {
        text: "In the context of Unit 15 — Pediatric & Family Support, what is the PSW's PRIMARY role?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Independently making clinical decisions",
          },
          {
            l: "B",
            t: "Observing, reporting, and implementing the care plan under supervision",
          },
          {
            l: "C",
            t: "Taking over responsibilities from the nursing team",
          },
          {
            l: "D",
            t: "Providing information to family members independently",
          },
        ],
        correct: "B",
        exp: "PSWs work under the supervision of Regulated Health Professionals, implementing the care plan, observing for changes, and reporting findings. Independent clinical decision-making is outside PSW scope.",
        ref: "HSCPOA Standards; PSW Scope of Practice",
      },
      {
        text: "Documentation in healthcare must be:",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Written only at end of shift for efficiency",
          },
          {
            l: "B",
            t: "Objective, accurate, timely, and legible",
          },
          {
            l: "C",
            t: "Subjective and based on PSW interpretation",
          },
          {
            l: "D",
            t: "Shared publicly to ensure transparency",
          },
        ],
        correct: "B",
        exp: "Healthcare documentation must be objective (facts, not opinions), accurate, written close to the time of the event, and legible. It is a legal document — errors in documentation can have serious consequences for clients and providers.",
        ref: "Documentation Standards; PHIPA",
      },
      {
        text: "When a PSW observes a significant change in a client's condition, they should:",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Wait until the end of the shift to report",
          },
          {
            l: "B",
            t: "Report immediately to the supervising RN or RPN using SBAR",
          },
          {
            l: "C",
            t: "Consult the client's family first",
          },
          {
            l: "D",
            t: "Document and wait for the next care team meeting",
          },
        ],
        correct: "B",
        exp: "Significant clinical changes require immediate reporting. The SBAR tool (Situation, Background, Assessment, Recommendation) is the Canadian standard for structured clinical communication, recognized by the Canadian Patient Safety Institute.",
        ref: "CPSI SBAR; Escalation of Care",
      },
      {
        text: "Which of the following represents the BEST evidence-based practice in Unit 15 — Pediatric & Family Support?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Following the most recent provincial guidelines and best practice recommendations",
          },
          {
            l: "B",
            t: "Using techniques learned from colleagues regardless of training currency",
          },
          {
            l: "C",
            t: "Applying what worked in previous employment without reviewing current standards",
          },
          {
            l: "D",
            t: "Relying exclusively on client/family preferences for all care decisions",
          },
        ],
        correct: "A",
        exp: "Evidence-based practice requires integrating current best evidence (provincial guidelines, clinical research) with clinical expertise and client preferences. PSWs are responsible for maintaining current knowledge through ongoing education.",
        ref: "RNAO Best Practice Guidelines; Evidence-Based Nursing",
      },
    ],
  },
  {
    id: 16,
    level: "intermediate",
    title: "Unit 16 — Rehabilitation Support",
    duration: "20 hours",
    lectures: 8,
    theory: [
      {
        type: "heading",
        content: "Restorative Care Philosophy",
      },
      {
        type: "paragraph",
        content: "This unit covers Restorative care principles, post-operative rehab, stroke rehabilitation, assisting with physiotherapy/OT exercises, fall prevention in rehab settings, assistive devices.",
      },
      {
        type: "list",
        items: [
          "<strong>Restorative Care Philosophy:</strong> Core competency area for this unit.",
          "<strong>Post-Surgical Rehabilitation:</strong> Core competency area for this unit.",
          "<strong>Exercise Programs — PT and OT Collaboration:</strong> Core competency area for this unit.",
          "<strong>Assistive Devices and Adaptive Equipment:</strong> Core competency area for this unit.",
          "<strong>Motivating Clients in Rehabilitation:</strong> Core competency area for this unit.",
        ],
      },
      {
        type: "infobox",
        variant: "blue",
        title: "📋 Canadian Standards",
        content: "This unit is aligned with Canadian PSW training standards across Ontario, BC, and Alberta. All content reflects current provincial guidelines.",
      },
      {
        type: "badges",
        items: [
          "Canadian PSW Standard",
          "Provincial Guidelines",
          "Evidence-Based Practice",
        ],
      },
      {
        type: "practical",
        steps: [
          {
            title: "Restorative Care Philosophy",
            desc: "Apply knowledge of Restorative Care Philosophy in a simulated care scenario.",
            tag: "Core Skill",
          },
          {
            title: "Post-Surgical Rehabilitation",
            desc: "Demonstrate competency through scenario-based learning.",
            tag: "Competency Check",
          },
        ],
      },
    ],
    quiz: [
      {
        text: "Which of the following BEST describes a key principle of 'Restorative Care Philosophy'?",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Option A: applying the principle in practice",
          },
          {
            l: "B",
            t: "Option B: understanding the theoretical framework",
          },
          {
            l: "C",
            t: "Option C: following provincial regulatory standards",
          },
          {
            l: "D",
            t: "Option D: communicating findings to the healthcare team",
          },
        ],
        correct: "C",
        exp: "Following provincial regulatory standards is foundational in Canadian PSW practice. This unit's content on Restorative Care Philosophy is directly guided by provincial legislation and best practice guidelines.",
        ref: "Canadian PSW Training Standards",
      },
      {
        text: "In the context of Unit 16 — Rehabilitation Support, what is the PSW's PRIMARY role?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Independently making clinical decisions",
          },
          {
            l: "B",
            t: "Observing, reporting, and implementing the care plan under supervision",
          },
          {
            l: "C",
            t: "Taking over responsibilities from the nursing team",
          },
          {
            l: "D",
            t: "Providing information to family members independently",
          },
        ],
        correct: "B",
        exp: "PSWs work under the supervision of Regulated Health Professionals, implementing the care plan, observing for changes, and reporting findings. Independent clinical decision-making is outside PSW scope.",
        ref: "HSCPOA Standards; PSW Scope of Practice",
      },
      {
        text: "Documentation in healthcare must be:",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Written only at end of shift for efficiency",
          },
          {
            l: "B",
            t: "Objective, accurate, timely, and legible",
          },
          {
            l: "C",
            t: "Subjective and based on PSW interpretation",
          },
          {
            l: "D",
            t: "Shared publicly to ensure transparency",
          },
        ],
        correct: "B",
        exp: "Healthcare documentation must be objective (facts, not opinions), accurate, written close to the time of the event, and legible. It is a legal document — errors in documentation can have serious consequences for clients and providers.",
        ref: "Documentation Standards; PHIPA",
      },
      {
        text: "When a PSW observes a significant change in a client's condition, they should:",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Wait until the end of the shift to report",
          },
          {
            l: "B",
            t: "Report immediately to the supervising RN or RPN using SBAR",
          },
          {
            l: "C",
            t: "Consult the client's family first",
          },
          {
            l: "D",
            t: "Document and wait for the next care team meeting",
          },
        ],
        correct: "B",
        exp: "Significant clinical changes require immediate reporting. The SBAR tool (Situation, Background, Assessment, Recommendation) is the Canadian standard for structured clinical communication, recognized by the Canadian Patient Safety Institute.",
        ref: "CPSI SBAR; Escalation of Care",
      },
      {
        text: "Which of the following represents the BEST evidence-based practice in Unit 16 — Rehabilitation Support?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Following the most recent provincial guidelines and best practice recommendations",
          },
          {
            l: "B",
            t: "Using techniques learned from colleagues regardless of training currency",
          },
          {
            l: "C",
            t: "Applying what worked in previous employment without reviewing current standards",
          },
          {
            l: "D",
            t: "Relying exclusively on client/family preferences for all care decisions",
          },
        ],
        correct: "A",
        exp: "Evidence-based practice requires integrating current best evidence (provincial guidelines, clinical research) with clinical expertise and client preferences. PSWs are responsible for maintaining current knowledge through ongoing education.",
        ref: "RNAO Best Practice Guidelines; Evidence-Based Nursing",
      },
    ],
  },
  {
    id: 17,
    level: "intermediate",
    title: "Unit 17 — Therapeutic Nutrition",
    duration: "20 hours",
    lectures: 8,
    theory: [
      {
        type: "heading",
        content: "Therapeutic Diet Types",
      },
      {
        type: "paragraph",
        content: "This unit covers Disease-specific diets (renal, cardiac, diabetic, low-sodium), enteral nutrition basics, nasogastric tube care (observation only), dysphagia nutrition, cultural food preferences.",
      },
      {
        type: "list",
        items: [
          "<strong>Therapeutic Diet Types:</strong> Core competency area for this unit.",
          "<strong>Renal Diet — Potassium, Phosphorus, Fluid Restrictions:</strong> Core competency area for this unit.",
          "<strong>Cardiac and Low-Sodium Diet:</strong> Core competency area for this unit.",
          "<strong>Enteral Nutrition — Observation and Reporting:</strong> Core competency area for this unit.",
          "<strong>Cultural Food Considerations:</strong> Core competency area for this unit.",
        ],
      },
      {
        type: "infobox",
        variant: "blue",
        title: "📋 Canadian Standards",
        content: "This unit is aligned with Canadian PSW training standards across Ontario, BC, and Alberta. All content reflects current provincial guidelines.",
      },
      {
        type: "badges",
        items: [
          "Canadian PSW Standard",
          "Provincial Guidelines",
          "Evidence-Based Practice",
        ],
      },
      {
        type: "practical",
        steps: [
          {
            title: "Therapeutic Diet Types",
            desc: "Apply knowledge of Therapeutic Diet Types in a simulated care scenario.",
            tag: "Core Skill",
          },
          {
            title: "Renal Diet — Potassium, Phosphorus, Fluid Restrictions",
            desc: "Demonstrate competency through scenario-based learning.",
            tag: "Competency Check",
          },
        ],
      },
    ],
    quiz: [
      {
        text: "Which of the following BEST describes a key principle of 'Therapeutic Diet Types'?",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Option A: applying the principle in practice",
          },
          {
            l: "B",
            t: "Option B: understanding the theoretical framework",
          },
          {
            l: "C",
            t: "Option C: following provincial regulatory standards",
          },
          {
            l: "D",
            t: "Option D: communicating findings to the healthcare team",
          },
        ],
        correct: "C",
        exp: "Following provincial regulatory standards is foundational in Canadian PSW practice. This unit's content on Therapeutic Diet Types is directly guided by provincial legislation and best practice guidelines.",
        ref: "Canadian PSW Training Standards",
      },
      {
        text: "In the context of Unit 17 — Therapeutic Nutrition, what is the PSW's PRIMARY role?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Independently making clinical decisions",
          },
          {
            l: "B",
            t: "Observing, reporting, and implementing the care plan under supervision",
          },
          {
            l: "C",
            t: "Taking over responsibilities from the nursing team",
          },
          {
            l: "D",
            t: "Providing information to family members independently",
          },
        ],
        correct: "B",
        exp: "PSWs work under the supervision of Regulated Health Professionals, implementing the care plan, observing for changes, and reporting findings. Independent clinical decision-making is outside PSW scope.",
        ref: "HSCPOA Standards; PSW Scope of Practice",
      },
      {
        text: "Documentation in healthcare must be:",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Written only at end of shift for efficiency",
          },
          {
            l: "B",
            t: "Objective, accurate, timely, and legible",
          },
          {
            l: "C",
            t: "Subjective and based on PSW interpretation",
          },
          {
            l: "D",
            t: "Shared publicly to ensure transparency",
          },
        ],
        correct: "B",
        exp: "Healthcare documentation must be objective (facts, not opinions), accurate, written close to the time of the event, and legible. It is a legal document — errors in documentation can have serious consequences for clients and providers.",
        ref: "Documentation Standards; PHIPA",
      },
      {
        text: "When a PSW observes a significant change in a client's condition, they should:",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Wait until the end of the shift to report",
          },
          {
            l: "B",
            t: "Report immediately to the supervising RN or RPN using SBAR",
          },
          {
            l: "C",
            t: "Consult the client's family first",
          },
          {
            l: "D",
            t: "Document and wait for the next care team meeting",
          },
        ],
        correct: "B",
        exp: "Significant clinical changes require immediate reporting. The SBAR tool (Situation, Background, Assessment, Recommendation) is the Canadian standard for structured clinical communication, recognized by the Canadian Patient Safety Institute.",
        ref: "CPSI SBAR; Escalation of Care",
      },
      {
        text: "Which of the following represents the BEST evidence-based practice in Unit 17 — Therapeutic Nutrition?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Following the most recent provincial guidelines and best practice recommendations",
          },
          {
            l: "B",
            t: "Using techniques learned from colleagues regardless of training currency",
          },
          {
            l: "C",
            t: "Applying what worked in previous employment without reviewing current standards",
          },
          {
            l: "D",
            t: "Relying exclusively on client/family preferences for all care decisions",
          },
        ],
        correct: "A",
        exp: "Evidence-based practice requires integrating current best evidence (provincial guidelines, clinical research) with clinical expertise and client preferences. PSWs are responsible for maintaining current knowledge through ongoing education.",
        ref: "RNAO Best Practice Guidelines; Evidence-Based Nursing",
      },
    ],
  },
  {
    id: 18,
    level: "intermediate",
    title: "Unit 18 — Documentation & Reporting",
    duration: "16 hours",
    lectures: 6,
    theory: [
      {
        type: "heading",
        content: "Legal Principles of Documentation",
      },
      {
        type: "paragraph",
        content: "This unit covers Legal aspects of documentation, electronic health records (PointClickCare, eMAR), incident reporting, ADP documentation, shift reports, SOAP notes.",
      },
      {
        type: "list",
        items: [
          "<strong>Legal Principles of Documentation:</strong> Core competency area for this unit.",
          "<strong>Electronic Health Records in Canadian LTC:</strong> Core competency area for this unit.",
          "<strong>Incident Reports — Near Miss and Adverse Events:</strong> Core competency area for this unit.",
          "<strong>Shift Handover Reporting:</strong> Core competency area for this unit.",
          "<strong>SOAP Progress Notes:</strong> Core competency area for this unit.",
        ],
      },
      {
        type: "infobox",
        variant: "blue",
        title: "📋 Canadian Standards",
        content: "This unit is aligned with Canadian PSW training standards across Ontario, BC, and Alberta. All content reflects current provincial guidelines.",
      },
      {
        type: "badges",
        items: [
          "Canadian PSW Standard",
          "Provincial Guidelines",
          "Evidence-Based Practice",
        ],
      },
      {
        type: "practical",
        steps: [
          {
            title: "Legal Principles of Documentation",
            desc: "Apply knowledge of Legal Principles of Documentation in a simulated care scenario.",
            tag: "Core Skill",
          },
          {
            title: "Electronic Health Records in Canadian LTC",
            desc: "Demonstrate competency through scenario-based learning.",
            tag: "Competency Check",
          },
        ],
      },
    ],
    quiz: [
      {
        text: "Which of the following BEST describes a key principle of 'Legal Principles of Documentation'?",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Option A: applying the principle in practice",
          },
          {
            l: "B",
            t: "Option B: understanding the theoretical framework",
          },
          {
            l: "C",
            t: "Option C: following provincial regulatory standards",
          },
          {
            l: "D",
            t: "Option D: communicating findings to the healthcare team",
          },
        ],
        correct: "C",
        exp: "Following provincial regulatory standards is foundational in Canadian PSW practice. This unit's content on Legal Principles of Documentation is directly guided by provincial legislation and best practice guidelines.",
        ref: "Canadian PSW Training Standards",
      },
      {
        text: "In the context of Unit 18 — Documentation & Reporting, what is the PSW's PRIMARY role?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Independently making clinical decisions",
          },
          {
            l: "B",
            t: "Observing, reporting, and implementing the care plan under supervision",
          },
          {
            l: "C",
            t: "Taking over responsibilities from the nursing team",
          },
          {
            l: "D",
            t: "Providing information to family members independently",
          },
        ],
        correct: "B",
        exp: "PSWs work under the supervision of Regulated Health Professionals, implementing the care plan, observing for changes, and reporting findings. Independent clinical decision-making is outside PSW scope.",
        ref: "HSCPOA Standards; PSW Scope of Practice",
      },
      {
        text: "Documentation in healthcare must be:",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Written only at end of shift for efficiency",
          },
          {
            l: "B",
            t: "Objective, accurate, timely, and legible",
          },
          {
            l: "C",
            t: "Subjective and based on PSW interpretation",
          },
          {
            l: "D",
            t: "Shared publicly to ensure transparency",
          },
        ],
        correct: "B",
        exp: "Healthcare documentation must be objective (facts, not opinions), accurate, written close to the time of the event, and legible. It is a legal document — errors in documentation can have serious consequences for clients and providers.",
        ref: "Documentation Standards; PHIPA",
      },
      {
        text: "When a PSW observes a significant change in a client's condition, they should:",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Wait until the end of the shift to report",
          },
          {
            l: "B",
            t: "Report immediately to the supervising RN or RPN using SBAR",
          },
          {
            l: "C",
            t: "Consult the client's family first",
          },
          {
            l: "D",
            t: "Document and wait for the next care team meeting",
          },
        ],
        correct: "B",
        exp: "Significant clinical changes require immediate reporting. The SBAR tool (Situation, Background, Assessment, Recommendation) is the Canadian standard for structured clinical communication, recognized by the Canadian Patient Safety Institute.",
        ref: "CPSI SBAR; Escalation of Care",
      },
      {
        text: "Which of the following represents the BEST evidence-based practice in Unit 18 — Documentation & Reporting?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Following the most recent provincial guidelines and best practice recommendations",
          },
          {
            l: "B",
            t: "Using techniques learned from colleagues regardless of training currency",
          },
          {
            l: "C",
            t: "Applying what worked in previous employment without reviewing current standards",
          },
          {
            l: "D",
            t: "Relying exclusively on client/family preferences for all care decisions",
          },
        ],
        correct: "A",
        exp: "Evidence-based practice requires integrating current best evidence (provincial guidelines, clinical research) with clinical expertise and client preferences. PSWs are responsible for maintaining current knowledge through ongoing education.",
        ref: "RNAO Best Practice Guidelines; Evidence-Based Nursing",
      },
    ],
  },
  {
    id: 19,
    level: "advanced",
    title: "Unit 19 — Complex Medical Conditions",
    duration: "28 hours",
    lectures: 11,
    theory: [
      {
        type: "heading",
        content: "Multiple Comorbidity Management",
      },
      {
        type: "paragraph",
        content: "Advanced PSW practice in Unit 19 — Complex Medical Conditions requires integration of theoretical knowledge with complex clinical judgment. This unit prepares PSWs for challenging care scenarios encountered in advanced practice settings across Canada.",
      },
      {
        type: "list",
        items: [
          "<strong>Multiple Comorbidity Management:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Neurological Conditions (ALS, MS, Parkinson's):</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Renal Failure and Dialysis Clients:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Complex Respiratory Conditions:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Oncology Care in Community Settings:</strong> Advanced competency aligned with national PSW standards.",
        ],
      },
      {
        type: "infobox",
        variant: "blue",
        title: "🏆 Advanced Practice Standard",
        content: "This unit content is aligned with Advanced PSW competencies for Ontario, BC, and Alberta. Mastery of these skills is required for complex care settings including LTC, complex continuing care, and specialized community programs.",
      },
      {
        type: "badges",
        items: [
          "Advanced PSW Standard",
          "HSCPOA Excellence",
          "Complex Care Certification",
        ],
      },
      {
        type: "practical",
        steps: [
          {
            title: "Multiple Comorbidity Management",
            desc: "Advanced simulation: Apply Multiple Comorbidity Management in a complex multi-system care scenario.",
            tag: "Advanced Competency",
          },
          {
            title: "Neurological Conditions (ALS, MS, Parkinson's)",
            desc: "Interprofessional simulation: Collaborate with a simulated care team to address Neurological Conditions (ALS, MS, Parkinson's).",
            tag: "Must Pass",
          },
          {
            title: "Renal Failure and Dialysis Clients",
            desc: "Complex scenario integration requiring synthesis of multiple competencies.",
            tag: "Competency Check",
          },
        ],
      },
    ],
    quiz: [
      {
        text: "In advanced PSW practice, which approach BEST reflects excellence in 'Multiple Comorbidity Management'?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Applying standardized protocols regardless of individual client needs",
          },
          {
            l: "B",
            t: "Integrating best evidence, clinical judgment, and person-centred care principles",
          },
          {
            l: "C",
            t: "Deferring all complex decisions to other team members",
          },
          {
            l: "D",
            t: "Applying the same approach used successfully with previous clients",
          },
        ],
        correct: "B",
        exp: "Advanced PSW practice requires integration of evidence-based knowledge with clinical judgment tailored to each unique client. Person-centred care remains foundational at all levels of practice.",
        ref: "HSCPOA Advanced Practice Standards",
      },
      {
        text: "When managing Multiple Comorbidity Management, the PSW's most critical responsibility is:",
        diff: "hard",
        options: [
          {
            l: "A",
            t: "Acting independently to resolve the situation",
          },
          {
            l: "B",
            t: "Observing for changes, communicating using SBAR, and implementing the care plan within scope",
          },
          {
            l: "C",
            t: "Consulting with family before reporting to the clinical team",
          },
          {
            l: "D",
            t: "Waiting for the situation to resolve before documenting",
          },
        ],
        correct: "B",
        exp: "Even at advanced levels, PSWs work within their scope of practice. Advanced PSWs bring more nuanced observation skills and clinical knowledge, but always report through appropriate channels and implement — not independently plan — care.",
        ref: "PSW Advanced Scope; RHPA Ontario",
      },
      {
        text: "Interprofessional collaboration in complex care settings means:",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Each professional working independently in their own lane",
          },
          {
            l: "B",
            t: "PSWs taking on nursing responsibilities to fill staffing gaps",
          },
          {
            l: "C",
            t: "Multiple professionals sharing information and coordinating care to optimize client outcomes",
          },
          {
            l: "D",
            t: "The physician directing all care decisions without input from front-line staff",
          },
        ],
        correct: "C",
        exp: "Interprofessional collaboration is a core Canadian healthcare value — PSWs bring unique front-line observational knowledge to the team. Their input on daily client changes, preferences, and responses to care is irreplaceable in care planning.",
        ref: "CPSI Interprofessional Education; Canadian Nursing Standards",
      },
      {
        text: "Which Canadian legislation most directly supports the rights of clients in advanced care settings?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Canada Health Act — which covers PSW services directly",
          },
          {
            l: "B",
            t: "Fixing Long-Term Care Act 2021 (Ontario), Community Care and Assisted Living Act (BC), and provincial equivalents",
          },
          {
            l: "C",
            t: "Canadian Charter of Rights and Freedoms — which replaces all healthcare legislation",
          },
          {
            l: "D",
            t: "RHPA — which governs PSW practice independently",
          },
        ],
        correct: "B",
        exp: "Provincial legislation governing long-term care, community care, and assisted living directly establishes client rights, care standards, and PSW responsibilities. The Canada Health Act covers insured medical services but does not directly regulate PSW scope.",
        ref: "FLTCA 2021; BC CCALA; Alberta Continuing Care Standards",
      },
      {
        text: "In advanced PSW practice, professional advocacy means:",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Taking over medical decisions when nurses are unavailable",
          },
          {
            l: "B",
            t: "Speaking up for clients' rights, preferences, and needs within the care team",
          },
          {
            l: "C",
            t: "Arguing with the physician on behalf of the client",
          },
          {
            l: "D",
            t: "Sharing client information with the public to raise awareness",
          },
        ],
        correct: "B",
        exp: "Advocacy in PSW practice means using one's unique knowledge of the client to raise concerns, communicate preferences, and ensure the client's voice is represented in care planning — always through appropriate professional channels and within scope of practice.",
        ref: "HSCPOA Code of Ethics; PSW Advocacy Standards",
      },
    ],
  },
  {
    id: 20,
    level: "advanced",
    title: "Unit 20 — Delegated Medical Acts",
    duration: "24 hours",
    lectures: 9,
    theory: [
      {
        type: "heading",
        content: "RHPA Framework and Controlled Acts",
      },
      {
        type: "paragraph",
        content: "Advanced PSW practice in Unit 20 — Delegated Medical Acts requires integration of theoretical knowledge with complex clinical judgment. This unit prepares PSWs for challenging care scenarios encountered in advanced practice settings across Canada.",
      },
      {
        type: "list",
        items: [
          "<strong>RHPA Framework and Controlled Acts:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Delegation Requirements — 5 Rights:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Subcutaneous Insulin Injection:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Enteral Feeding (G-tube/NG-tube):</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Urinary Catheter Care:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Colostomy and Ostomy Care:</strong> Advanced competency aligned with national PSW standards.",
        ],
      },
      {
        type: "infobox",
        variant: "purple",
        title: "🏆 Advanced Practice Standard",
        content: "This unit content is aligned with Advanced PSW competencies for Ontario, BC, and Alberta. Mastery of these skills is required for complex care settings including LTC, complex continuing care, and specialized community programs.",
      },
      {
        type: "badges",
        items: [
          "Advanced PSW Standard",
          "HSCPOA Excellence",
          "Complex Care Certification",
        ],
      },
      {
        type: "practical",
        steps: [
          {
            title: "RHPA Framework and Controlled Acts",
            desc: "Advanced simulation: Apply RHPA Framework and Controlled Acts in a complex multi-system care scenario.",
            tag: "Advanced Competency",
          },
          {
            title: "Delegation Requirements — 5 Rights",
            desc: "Interprofessional simulation: Collaborate with a simulated care team to address Delegation Requirements — 5 Rights.",
            tag: "Must Pass",
          },
          {
            title: "Subcutaneous Insulin Injection",
            desc: "Complex scenario integration requiring synthesis of multiple competencies.",
            tag: "Competency Check",
          },
        ],
      },
    ],
    quiz: [
      {
        text: "In advanced PSW practice, which approach BEST reflects excellence in 'RHPA Framework and Controlled Acts'?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Applying standardized protocols regardless of individual client needs",
          },
          {
            l: "B",
            t: "Integrating best evidence, clinical judgment, and person-centred care principles",
          },
          {
            l: "C",
            t: "Deferring all complex decisions to other team members",
          },
          {
            l: "D",
            t: "Applying the same approach used successfully with previous clients",
          },
        ],
        correct: "B",
        exp: "Advanced PSW practice requires integration of evidence-based knowledge with clinical judgment tailored to each unique client. Person-centred care remains foundational at all levels of practice.",
        ref: "HSCPOA Advanced Practice Standards",
      },
      {
        text: "When managing RHPA Framework and Controlled Acts, the PSW's most critical responsibility is:",
        diff: "hard",
        options: [
          {
            l: "A",
            t: "Acting independently to resolve the situation",
          },
          {
            l: "B",
            t: "Observing for changes, communicating using SBAR, and implementing the care plan within scope",
          },
          {
            l: "C",
            t: "Consulting with family before reporting to the clinical team",
          },
          {
            l: "D",
            t: "Waiting for the situation to resolve before documenting",
          },
        ],
        correct: "B",
        exp: "Even at advanced levels, PSWs work within their scope of practice. Advanced PSWs bring more nuanced observation skills and clinical knowledge, but always report through appropriate channels and implement — not independently plan — care.",
        ref: "PSW Advanced Scope; RHPA Ontario",
      },
      {
        text: "Interprofessional collaboration in complex care settings means:",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Each professional working independently in their own lane",
          },
          {
            l: "B",
            t: "PSWs taking on nursing responsibilities to fill staffing gaps",
          },
          {
            l: "C",
            t: "Multiple professionals sharing information and coordinating care to optimize client outcomes",
          },
          {
            l: "D",
            t: "The physician directing all care decisions without input from front-line staff",
          },
        ],
        correct: "C",
        exp: "Interprofessional collaboration is a core Canadian healthcare value — PSWs bring unique front-line observational knowledge to the team. Their input on daily client changes, preferences, and responses to care is irreplaceable in care planning.",
        ref: "CPSI Interprofessional Education; Canadian Nursing Standards",
      },
      {
        text: "Which Canadian legislation most directly supports the rights of clients in advanced care settings?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Canada Health Act — which covers PSW services directly",
          },
          {
            l: "B",
            t: "Fixing Long-Term Care Act 2021 (Ontario), Community Care and Assisted Living Act (BC), and provincial equivalents",
          },
          {
            l: "C",
            t: "Canadian Charter of Rights and Freedoms — which replaces all healthcare legislation",
          },
          {
            l: "D",
            t: "RHPA — which governs PSW practice independently",
          },
        ],
        correct: "B",
        exp: "Provincial legislation governing long-term care, community care, and assisted living directly establishes client rights, care standards, and PSW responsibilities. The Canada Health Act covers insured medical services but does not directly regulate PSW scope.",
        ref: "FLTCA 2021; BC CCALA; Alberta Continuing Care Standards",
      },
      {
        text: "In advanced PSW practice, professional advocacy means:",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Taking over medical decisions when nurses are unavailable",
          },
          {
            l: "B",
            t: "Speaking up for clients' rights, preferences, and needs within the care team",
          },
          {
            l: "C",
            t: "Arguing with the physician on behalf of the client",
          },
          {
            l: "D",
            t: "Sharing client information with the public to raise awareness",
          },
        ],
        correct: "B",
        exp: "Advocacy in PSW practice means using one's unique knowledge of the client to raise concerns, communicate preferences, and ensure the client's voice is represented in care planning — always through appropriate professional channels and within scope of practice.",
        ref: "HSCPOA Code of Ethics; PSW Advocacy Standards",
      },
    ],
  },
  {
    id: 21,
    level: "advanced",
    title: "Unit 21 — Gerontology & Aging",
    duration: "24 hours",
    lectures: 9,
    theory: [
      {
        type: "heading",
        content: "Normal vs. Pathological Aging",
      },
      {
        type: "paragraph",
        content: "Advanced PSW practice in Unit 21 — Gerontology & Aging requires integration of theoretical knowledge with complex clinical judgment. This unit prepares PSWs for challenging care scenarios encountered in advanced practice settings across Canada.",
      },
      {
        type: "list",
        items: [
          "<strong>Normal vs. Pathological Aging:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Age-Related Physiological Changes:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Polypharmacy in Older Adults:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Elder Abuse — Recognition and Reporting:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Promoting Quality of Life in LTC:</strong> Advanced competency aligned with national PSW standards.",
        ],
      },
      {
        type: "infobox",
        variant: "blue",
        title: "🏆 Advanced Practice Standard",
        content: "This unit content is aligned with Advanced PSW competencies for Ontario, BC, and Alberta. Mastery of these skills is required for complex care settings including LTC, complex continuing care, and specialized community programs.",
      },
      {
        type: "badges",
        items: [
          "Advanced PSW Standard",
          "HSCPOA Excellence",
          "Complex Care Certification",
        ],
      },
      {
        type: "practical",
        steps: [
          {
            title: "Normal vs. Pathological Aging",
            desc: "Advanced simulation: Apply Normal vs. Pathological Aging in a complex multi-system care scenario.",
            tag: "Advanced Competency",
          },
          {
            title: "Age-Related Physiological Changes",
            desc: "Interprofessional simulation: Collaborate with a simulated care team to address Age-Related Physiological Changes.",
            tag: "Must Pass",
          },
          {
            title: "Polypharmacy in Older Adults",
            desc: "Complex scenario integration requiring synthesis of multiple competencies.",
            tag: "Competency Check",
          },
        ],
      },
    ],
    quiz: [
      {
        text: "In advanced PSW practice, which approach BEST reflects excellence in 'Normal vs. Pathological Aging'?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Applying standardized protocols regardless of individual client needs",
          },
          {
            l: "B",
            t: "Integrating best evidence, clinical judgment, and person-centred care principles",
          },
          {
            l: "C",
            t: "Deferring all complex decisions to other team members",
          },
          {
            l: "D",
            t: "Applying the same approach used successfully with previous clients",
          },
        ],
        correct: "B",
        exp: "Advanced PSW practice requires integration of evidence-based knowledge with clinical judgment tailored to each unique client. Person-centred care remains foundational at all levels of practice.",
        ref: "HSCPOA Advanced Practice Standards",
      },
      {
        text: "When managing Normal vs. Pathological Aging, the PSW's most critical responsibility is:",
        diff: "hard",
        options: [
          {
            l: "A",
            t: "Acting independently to resolve the situation",
          },
          {
            l: "B",
            t: "Observing for changes, communicating using SBAR, and implementing the care plan within scope",
          },
          {
            l: "C",
            t: "Consulting with family before reporting to the clinical team",
          },
          {
            l: "D",
            t: "Waiting for the situation to resolve before documenting",
          },
        ],
        correct: "B",
        exp: "Even at advanced levels, PSWs work within their scope of practice. Advanced PSWs bring more nuanced observation skills and clinical knowledge, but always report through appropriate channels and implement — not independently plan — care.",
        ref: "PSW Advanced Scope; RHPA Ontario",
      },
      {
        text: "Interprofessional collaboration in complex care settings means:",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Each professional working independently in their own lane",
          },
          {
            l: "B",
            t: "PSWs taking on nursing responsibilities to fill staffing gaps",
          },
          {
            l: "C",
            t: "Multiple professionals sharing information and coordinating care to optimize client outcomes",
          },
          {
            l: "D",
            t: "The physician directing all care decisions without input from front-line staff",
          },
        ],
        correct: "C",
        exp: "Interprofessional collaboration is a core Canadian healthcare value — PSWs bring unique front-line observational knowledge to the team. Their input on daily client changes, preferences, and responses to care is irreplaceable in care planning.",
        ref: "CPSI Interprofessional Education; Canadian Nursing Standards",
      },
      {
        text: "Which Canadian legislation most directly supports the rights of clients in advanced care settings?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Canada Health Act — which covers PSW services directly",
          },
          {
            l: "B",
            t: "Fixing Long-Term Care Act 2021 (Ontario), Community Care and Assisted Living Act (BC), and provincial equivalents",
          },
          {
            l: "C",
            t: "Canadian Charter of Rights and Freedoms — which replaces all healthcare legislation",
          },
          {
            l: "D",
            t: "RHPA — which governs PSW practice independently",
          },
        ],
        correct: "B",
        exp: "Provincial legislation governing long-term care, community care, and assisted living directly establishes client rights, care standards, and PSW responsibilities. The Canada Health Act covers insured medical services but does not directly regulate PSW scope.",
        ref: "FLTCA 2021; BC CCALA; Alberta Continuing Care Standards",
      },
      {
        text: "In advanced PSW practice, professional advocacy means:",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Taking over medical decisions when nurses are unavailable",
          },
          {
            l: "B",
            t: "Speaking up for clients' rights, preferences, and needs within the care team",
          },
          {
            l: "C",
            t: "Arguing with the physician on behalf of the client",
          },
          {
            l: "D",
            t: "Sharing client information with the public to raise awareness",
          },
        ],
        correct: "B",
        exp: "Advocacy in PSW practice means using one's unique knowledge of the client to raise concerns, communicate preferences, and ensure the client's voice is represented in care planning — always through appropriate professional channels and within scope of practice.",
        ref: "HSCPOA Code of Ethics; PSW Advocacy Standards",
      },
    ],
  },
  {
    id: 22,
    level: "advanced",
    title: "Unit 22 — Behavioural Support",
    duration: "26 hours",
    lectures: 10,
    theory: [
      {
        type: "heading",
        content: "Responsive Behaviours — Evidence-Based Approaches",
      },
      {
        type: "paragraph",
        content: "Advanced PSW practice in Unit 22 — Behavioural Support requires integration of theoretical knowledge with complex clinical judgment. This unit prepares PSWs for challenging care scenarios encountered in advanced practice settings across Canada.",
      },
      {
        type: "list",
        items: [
          "<strong>Responsive Behaviours — Evidence-Based Approaches:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>P.I.E.C.E.S. Framework Advanced Application:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Gentle Persuasive Approaches (GPA):</strong> Advanced competency aligned with national PSW standards.",
          "<strong>De-escalation and Safety Planning:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Trauma-Informed Care in PSW Practice:</strong> Advanced competency aligned with national PSW standards.",
        ],
      },
      {
        type: "infobox",
        variant: "purple",
        title: "🏆 Advanced Practice Standard",
        content: "This unit content is aligned with Advanced PSW competencies for Ontario, BC, and Alberta. Mastery of these skills is required for complex care settings including LTC, complex continuing care, and specialized community programs.",
      },
      {
        type: "badges",
        items: [
          "Advanced PSW Standard",
          "HSCPOA Excellence",
          "Complex Care Certification",
        ],
      },
      {
        type: "practical",
        steps: [
          {
            title: "Responsive Behaviours — Evidence-Based Approaches",
            desc: "Advanced simulation: Apply Responsive Behaviours — Evidence-Based Approaches in a complex multi-system care scenario.",
            tag: "Advanced Competency",
          },
          {
            title: "P.I.E.C.E.S. Framework Advanced Application",
            desc: "Interprofessional simulation: Collaborate with a simulated care team to address P.I.E.C.E.S. Framework Advanced Application.",
            tag: "Must Pass",
          },
          {
            title: "Gentle Persuasive Approaches (GPA)",
            desc: "Complex scenario integration requiring synthesis of multiple competencies.",
            tag: "Competency Check",
          },
        ],
      },
    ],
    quiz: [
      {
        text: "In advanced PSW practice, which approach BEST reflects excellence in 'Responsive Behaviours — Evidence-Based Approaches'?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Applying standardized protocols regardless of individual client needs",
          },
          {
            l: "B",
            t: "Integrating best evidence, clinical judgment, and person-centred care principles",
          },
          {
            l: "C",
            t: "Deferring all complex decisions to other team members",
          },
          {
            l: "D",
            t: "Applying the same approach used successfully with previous clients",
          },
        ],
        correct: "B",
        exp: "Advanced PSW practice requires integration of evidence-based knowledge with clinical judgment tailored to each unique client. Person-centred care remains foundational at all levels of practice.",
        ref: "HSCPOA Advanced Practice Standards",
      },
      {
        text: "When managing Responsive Behaviours — Evidence-Based Approaches, the PSW's most critical responsibility is:",
        diff: "hard",
        options: [
          {
            l: "A",
            t: "Acting independently to resolve the situation",
          },
          {
            l: "B",
            t: "Observing for changes, communicating using SBAR, and implementing the care plan within scope",
          },
          {
            l: "C",
            t: "Consulting with family before reporting to the clinical team",
          },
          {
            l: "D",
            t: "Waiting for the situation to resolve before documenting",
          },
        ],
        correct: "B",
        exp: "Even at advanced levels, PSWs work within their scope of practice. Advanced PSWs bring more nuanced observation skills and clinical knowledge, but always report through appropriate channels and implement — not independently plan — care.",
        ref: "PSW Advanced Scope; RHPA Ontario",
      },
      {
        text: "Interprofessional collaboration in complex care settings means:",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Each professional working independently in their own lane",
          },
          {
            l: "B",
            t: "PSWs taking on nursing responsibilities to fill staffing gaps",
          },
          {
            l: "C",
            t: "Multiple professionals sharing information and coordinating care to optimize client outcomes",
          },
          {
            l: "D",
            t: "The physician directing all care decisions without input from front-line staff",
          },
        ],
        correct: "C",
        exp: "Interprofessional collaboration is a core Canadian healthcare value — PSWs bring unique front-line observational knowledge to the team. Their input on daily client changes, preferences, and responses to care is irreplaceable in care planning.",
        ref: "CPSI Interprofessional Education; Canadian Nursing Standards",
      },
      {
        text: "Which Canadian legislation most directly supports the rights of clients in advanced care settings?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Canada Health Act — which covers PSW services directly",
          },
          {
            l: "B",
            t: "Fixing Long-Term Care Act 2021 (Ontario), Community Care and Assisted Living Act (BC), and provincial equivalents",
          },
          {
            l: "C",
            t: "Canadian Charter of Rights and Freedoms — which replaces all healthcare legislation",
          },
          {
            l: "D",
            t: "RHPA — which governs PSW practice independently",
          },
        ],
        correct: "B",
        exp: "Provincial legislation governing long-term care, community care, and assisted living directly establishes client rights, care standards, and PSW responsibilities. The Canada Health Act covers insured medical services but does not directly regulate PSW scope.",
        ref: "FLTCA 2021; BC CCALA; Alberta Continuing Care Standards",
      },
      {
        text: "In advanced PSW practice, professional advocacy means:",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Taking over medical decisions when nurses are unavailable",
          },
          {
            l: "B",
            t: "Speaking up for clients' rights, preferences, and needs within the care team",
          },
          {
            l: "C",
            t: "Arguing with the physician on behalf of the client",
          },
          {
            l: "D",
            t: "Sharing client information with the public to raise awareness",
          },
        ],
        correct: "B",
        exp: "Advocacy in PSW practice means using one's unique knowledge of the client to raise concerns, communicate preferences, and ensure the client's voice is represented in care planning — always through appropriate professional channels and within scope of practice.",
        ref: "HSCPOA Code of Ethics; PSW Advocacy Standards",
      },
    ],
  },
  {
    id: 23,
    level: "advanced",
    title: "Unit 23 — Community & Home Care",
    duration: "26 hours",
    lectures: 10,
    theory: [
      {
        type: "heading",
        content: "Home Care Assessment and Safety",
      },
      {
        type: "paragraph",
        content: "Advanced PSW practice in Unit 23 — Community & Home Care requires integration of theoretical knowledge with complex clinical judgment. This unit prepares PSWs for challenging care scenarios encountered in advanced practice settings across Canada.",
      },
      {
        type: "list",
        items: [
          "<strong>Home Care Assessment and Safety:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Infection Control in Home Settings:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Supporting Informal Caregivers:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Cultural Competency in Home Care:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Documentation in Home Care Settings:</strong> Advanced competency aligned with national PSW standards.",
        ],
      },
      {
        type: "infobox",
        variant: "blue",
        title: "🏆 Advanced Practice Standard",
        content: "This unit content is aligned with Advanced PSW competencies for Ontario, BC, and Alberta. Mastery of these skills is required for complex care settings including LTC, complex continuing care, and specialized community programs.",
      },
      {
        type: "badges",
        items: [
          "Advanced PSW Standard",
          "HSCPOA Excellence",
          "Complex Care Certification",
        ],
      },
      {
        type: "practical",
        steps: [
          {
            title: "Home Care Assessment and Safety",
            desc: "Advanced simulation: Apply Home Care Assessment and Safety in a complex multi-system care scenario.",
            tag: "Advanced Competency",
          },
          {
            title: "Infection Control in Home Settings",
            desc: "Interprofessional simulation: Collaborate with a simulated care team to address Infection Control in Home Settings.",
            tag: "Must Pass",
          },
          {
            title: "Supporting Informal Caregivers",
            desc: "Complex scenario integration requiring synthesis of multiple competencies.",
            tag: "Competency Check",
          },
        ],
      },
    ],
    quiz: [
      {
        text: "In advanced PSW practice, which approach BEST reflects excellence in 'Home Care Assessment and Safety'?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Applying standardized protocols regardless of individual client needs",
          },
          {
            l: "B",
            t: "Integrating best evidence, clinical judgment, and person-centred care principles",
          },
          {
            l: "C",
            t: "Deferring all complex decisions to other team members",
          },
          {
            l: "D",
            t: "Applying the same approach used successfully with previous clients",
          },
        ],
        correct: "B",
        exp: "Advanced PSW practice requires integration of evidence-based knowledge with clinical judgment tailored to each unique client. Person-centred care remains foundational at all levels of practice.",
        ref: "HSCPOA Advanced Practice Standards",
      },
      {
        text: "When managing Home Care Assessment and Safety, the PSW's most critical responsibility is:",
        diff: "hard",
        options: [
          {
            l: "A",
            t: "Acting independently to resolve the situation",
          },
          {
            l: "B",
            t: "Observing for changes, communicating using SBAR, and implementing the care plan within scope",
          },
          {
            l: "C",
            t: "Consulting with family before reporting to the clinical team",
          },
          {
            l: "D",
            t: "Waiting for the situation to resolve before documenting",
          },
        ],
        correct: "B",
        exp: "Even at advanced levels, PSWs work within their scope of practice. Advanced PSWs bring more nuanced observation skills and clinical knowledge, but always report through appropriate channels and implement — not independently plan — care.",
        ref: "PSW Advanced Scope; RHPA Ontario",
      },
      {
        text: "Interprofessional collaboration in complex care settings means:",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Each professional working independently in their own lane",
          },
          {
            l: "B",
            t: "PSWs taking on nursing responsibilities to fill staffing gaps",
          },
          {
            l: "C",
            t: "Multiple professionals sharing information and coordinating care to optimize client outcomes",
          },
          {
            l: "D",
            t: "The physician directing all care decisions without input from front-line staff",
          },
        ],
        correct: "C",
        exp: "Interprofessional collaboration is a core Canadian healthcare value — PSWs bring unique front-line observational knowledge to the team. Their input on daily client changes, preferences, and responses to care is irreplaceable in care planning.",
        ref: "CPSI Interprofessional Education; Canadian Nursing Standards",
      },
      {
        text: "Which Canadian legislation most directly supports the rights of clients in advanced care settings?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Canada Health Act — which covers PSW services directly",
          },
          {
            l: "B",
            t: "Fixing Long-Term Care Act 2021 (Ontario), Community Care and Assisted Living Act (BC), and provincial equivalents",
          },
          {
            l: "C",
            t: "Canadian Charter of Rights and Freedoms — which replaces all healthcare legislation",
          },
          {
            l: "D",
            t: "RHPA — which governs PSW practice independently",
          },
        ],
        correct: "B",
        exp: "Provincial legislation governing long-term care, community care, and assisted living directly establishes client rights, care standards, and PSW responsibilities. The Canada Health Act covers insured medical services but does not directly regulate PSW scope.",
        ref: "FLTCA 2021; BC CCALA; Alberta Continuing Care Standards",
      },
      {
        text: "In advanced PSW practice, professional advocacy means:",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Taking over medical decisions when nurses are unavailable",
          },
          {
            l: "B",
            t: "Speaking up for clients' rights, preferences, and needs within the care team",
          },
          {
            l: "C",
            t: "Arguing with the physician on behalf of the client",
          },
          {
            l: "D",
            t: "Sharing client information with the public to raise awareness",
          },
        ],
        correct: "B",
        exp: "Advocacy in PSW practice means using one's unique knowledge of the client to raise concerns, communicate preferences, and ensure the client's voice is represented in care planning — always through appropriate professional channels and within scope of practice.",
        ref: "HSCPOA Code of Ethics; PSW Advocacy Standards",
      },
    ],
  },
  {
    id: 24,
    level: "advanced",
    title: "Unit 24 — Indigenous Cultural Safety",
    duration: "22 hours",
    lectures: 8,
    theory: [
      {
        type: "heading",
        content: "Truth and Reconciliation — Health Calls to Action",
      },
      {
        type: "paragraph",
        content: "Advanced PSW practice in Unit 24 — Indigenous Cultural Safety requires integration of theoretical knowledge with complex clinical judgment. This unit prepares PSWs for challenging care scenarios encountered in advanced practice settings across Canada.",
      },
      {
        type: "list",
        items: [
          "<strong>Truth and Reconciliation — Health Calls to Action:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Cultural Safety vs. Cultural Competency:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Indigenous Concepts of Wellness:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Anti-Racism in Healthcare Practice:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Traditional Healing and Western Medicine:</strong> Advanced competency aligned with national PSW standards.",
        ],
      },
      {
        type: "infobox",
        variant: "purple",
        title: "🏆 Advanced Practice Standard",
        content: "This unit content is aligned with Advanced PSW competencies for Ontario, BC, and Alberta. Mastery of these skills is required for complex care settings including LTC, complex continuing care, and specialized community programs.",
      },
      {
        type: "badges",
        items: [
          "Advanced PSW Standard",
          "HSCPOA Excellence",
          "Complex Care Certification",
        ],
      },
      {
        type: "practical",
        steps: [
          {
            title: "Truth and Reconciliation — Health Calls to Action",
            desc: "Advanced simulation: Apply Truth and Reconciliation — Health Calls to Action in a complex multi-system care scenario.",
            tag: "Advanced Competency",
          },
          {
            title: "Cultural Safety vs. Cultural Competency",
            desc: "Interprofessional simulation: Collaborate with a simulated care team to address Cultural Safety vs. Cultural Competency.",
            tag: "Must Pass",
          },
          {
            title: "Indigenous Concepts of Wellness",
            desc: "Complex scenario integration requiring synthesis of multiple competencies.",
            tag: "Competency Check",
          },
        ],
      },
    ],
    quiz: [
      {
        text: "In advanced PSW practice, which approach BEST reflects excellence in 'Truth and Reconciliation — Health Calls to Action'?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Applying standardized protocols regardless of individual client needs",
          },
          {
            l: "B",
            t: "Integrating best evidence, clinical judgment, and person-centred care principles",
          },
          {
            l: "C",
            t: "Deferring all complex decisions to other team members",
          },
          {
            l: "D",
            t: "Applying the same approach used successfully with previous clients",
          },
        ],
        correct: "B",
        exp: "Advanced PSW practice requires integration of evidence-based knowledge with clinical judgment tailored to each unique client. Person-centred care remains foundational at all levels of practice.",
        ref: "HSCPOA Advanced Practice Standards",
      },
      {
        text: "When managing Truth and Reconciliation — Health Calls to Action, the PSW's most critical responsibility is:",
        diff: "hard",
        options: [
          {
            l: "A",
            t: "Acting independently to resolve the situation",
          },
          {
            l: "B",
            t: "Observing for changes, communicating using SBAR, and implementing the care plan within scope",
          },
          {
            l: "C",
            t: "Consulting with family before reporting to the clinical team",
          },
          {
            l: "D",
            t: "Waiting for the situation to resolve before documenting",
          },
        ],
        correct: "B",
        exp: "Even at advanced levels, PSWs work within their scope of practice. Advanced PSWs bring more nuanced observation skills and clinical knowledge, but always report through appropriate channels and implement — not independently plan — care.",
        ref: "PSW Advanced Scope; RHPA Ontario",
      },
      {
        text: "Interprofessional collaboration in complex care settings means:",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Each professional working independently in their own lane",
          },
          {
            l: "B",
            t: "PSWs taking on nursing responsibilities to fill staffing gaps",
          },
          {
            l: "C",
            t: "Multiple professionals sharing information and coordinating care to optimize client outcomes",
          },
          {
            l: "D",
            t: "The physician directing all care decisions without input from front-line staff",
          },
        ],
        correct: "C",
        exp: "Interprofessional collaboration is a core Canadian healthcare value — PSWs bring unique front-line observational knowledge to the team. Their input on daily client changes, preferences, and responses to care is irreplaceable in care planning.",
        ref: "CPSI Interprofessional Education; Canadian Nursing Standards",
      },
      {
        text: "Which Canadian legislation most directly supports the rights of clients in advanced care settings?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Canada Health Act — which covers PSW services directly",
          },
          {
            l: "B",
            t: "Fixing Long-Term Care Act 2021 (Ontario), Community Care and Assisted Living Act (BC), and provincial equivalents",
          },
          {
            l: "C",
            t: "Canadian Charter of Rights and Freedoms — which replaces all healthcare legislation",
          },
          {
            l: "D",
            t: "RHPA — which governs PSW practice independently",
          },
        ],
        correct: "B",
        exp: "Provincial legislation governing long-term care, community care, and assisted living directly establishes client rights, care standards, and PSW responsibilities. The Canada Health Act covers insured medical services but does not directly regulate PSW scope.",
        ref: "FLTCA 2021; BC CCALA; Alberta Continuing Care Standards",
      },
      {
        text: "In advanced PSW practice, professional advocacy means:",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Taking over medical decisions when nurses are unavailable",
          },
          {
            l: "B",
            t: "Speaking up for clients' rights, preferences, and needs within the care team",
          },
          {
            l: "C",
            t: "Arguing with the physician on behalf of the client",
          },
          {
            l: "D",
            t: "Sharing client information with the public to raise awareness",
          },
        ],
        correct: "B",
        exp: "Advocacy in PSW practice means using one's unique knowledge of the client to raise concerns, communicate preferences, and ensure the client's voice is represented in care planning — always through appropriate professional channels and within scope of practice.",
        ref: "HSCPOA Code of Ethics; PSW Advocacy Standards",
      },
    ],
  },
  {
    id: 25,
    level: "advanced",
    title: "Unit 25 — Emergency Preparedness",
    duration: "22 hours",
    lectures: 8,
    theory: [
      {
        type: "heading",
        content: "Code Blue — Cardiac Arrest Response",
      },
      {
        type: "paragraph",
        content: "Advanced PSW practice in Unit 25 — Emergency Preparedness requires integration of theoretical knowledge with complex clinical judgment. This unit prepares PSWs for challenging care scenarios encountered in advanced practice settings across Canada.",
      },
      {
        type: "list",
        items: [
          "<strong>Code Blue — Cardiac Arrest Response:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Fire Safety and Evacuation Procedures:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Falls — Post-Fall Assessment Protocol:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Disaster Planning in LTC/Community:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Workplace Violence Prevention and Response:</strong> Advanced competency aligned with national PSW standards.",
        ],
      },
      {
        type: "infobox",
        variant: "blue",
        title: "🏆 Advanced Practice Standard",
        content: "This unit content is aligned with Advanced PSW competencies for Ontario, BC, and Alberta. Mastery of these skills is required for complex care settings including LTC, complex continuing care, and specialized community programs.",
      },
      {
        type: "badges",
        items: [
          "Advanced PSW Standard",
          "HSCPOA Excellence",
          "Complex Care Certification",
        ],
      },
      {
        type: "practical",
        steps: [
          {
            title: "Code Blue — Cardiac Arrest Response",
            desc: "Advanced simulation: Apply Code Blue — Cardiac Arrest Response in a complex multi-system care scenario.",
            tag: "Advanced Competency",
          },
          {
            title: "Fire Safety and Evacuation Procedures",
            desc: "Interprofessional simulation: Collaborate with a simulated care team to address Fire Safety and Evacuation Procedures.",
            tag: "Must Pass",
          },
          {
            title: "Falls — Post-Fall Assessment Protocol",
            desc: "Complex scenario integration requiring synthesis of multiple competencies.",
            tag: "Competency Check",
          },
        ],
      },
    ],
    quiz: [
      {
        text: "In advanced PSW practice, which approach BEST reflects excellence in 'Code Blue — Cardiac Arrest Response'?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Applying standardized protocols regardless of individual client needs",
          },
          {
            l: "B",
            t: "Integrating best evidence, clinical judgment, and person-centred care principles",
          },
          {
            l: "C",
            t: "Deferring all complex decisions to other team members",
          },
          {
            l: "D",
            t: "Applying the same approach used successfully with previous clients",
          },
        ],
        correct: "B",
        exp: "Advanced PSW practice requires integration of evidence-based knowledge with clinical judgment tailored to each unique client. Person-centred care remains foundational at all levels of practice.",
        ref: "HSCPOA Advanced Practice Standards",
      },
      {
        text: "When managing Code Blue — Cardiac Arrest Response, the PSW's most critical responsibility is:",
        diff: "hard",
        options: [
          {
            l: "A",
            t: "Acting independently to resolve the situation",
          },
          {
            l: "B",
            t: "Observing for changes, communicating using SBAR, and implementing the care plan within scope",
          },
          {
            l: "C",
            t: "Consulting with family before reporting to the clinical team",
          },
          {
            l: "D",
            t: "Waiting for the situation to resolve before documenting",
          },
        ],
        correct: "B",
        exp: "Even at advanced levels, PSWs work within their scope of practice. Advanced PSWs bring more nuanced observation skills and clinical knowledge, but always report through appropriate channels and implement — not independently plan — care.",
        ref: "PSW Advanced Scope; RHPA Ontario",
      },
      {
        text: "Interprofessional collaboration in complex care settings means:",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Each professional working independently in their own lane",
          },
          {
            l: "B",
            t: "PSWs taking on nursing responsibilities to fill staffing gaps",
          },
          {
            l: "C",
            t: "Multiple professionals sharing information and coordinating care to optimize client outcomes",
          },
          {
            l: "D",
            t: "The physician directing all care decisions without input from front-line staff",
          },
        ],
        correct: "C",
        exp: "Interprofessional collaboration is a core Canadian healthcare value — PSWs bring unique front-line observational knowledge to the team. Their input on daily client changes, preferences, and responses to care is irreplaceable in care planning.",
        ref: "CPSI Interprofessional Education; Canadian Nursing Standards",
      },
      {
        text: "Which Canadian legislation most directly supports the rights of clients in advanced care settings?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Canada Health Act — which covers PSW services directly",
          },
          {
            l: "B",
            t: "Fixing Long-Term Care Act 2021 (Ontario), Community Care and Assisted Living Act (BC), and provincial equivalents",
          },
          {
            l: "C",
            t: "Canadian Charter of Rights and Freedoms — which replaces all healthcare legislation",
          },
          {
            l: "D",
            t: "RHPA — which governs PSW practice independently",
          },
        ],
        correct: "B",
        exp: "Provincial legislation governing long-term care, community care, and assisted living directly establishes client rights, care standards, and PSW responsibilities. The Canada Health Act covers insured medical services but does not directly regulate PSW scope.",
        ref: "FLTCA 2021; BC CCALA; Alberta Continuing Care Standards",
      },
      {
        text: "In advanced PSW practice, professional advocacy means:",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Taking over medical decisions when nurses are unavailable",
          },
          {
            l: "B",
            t: "Speaking up for clients' rights, preferences, and needs within the care team",
          },
          {
            l: "C",
            t: "Arguing with the physician on behalf of the client",
          },
          {
            l: "D",
            t: "Sharing client information with the public to raise awareness",
          },
        ],
        correct: "B",
        exp: "Advocacy in PSW practice means using one's unique knowledge of the client to raise concerns, communicate preferences, and ensure the client's voice is represented in care planning — always through appropriate professional channels and within scope of practice.",
        ref: "HSCPOA Code of Ethics; PSW Advocacy Standards",
      },
    ],
  },
  {
    id: 26,
    level: "advanced",
    title: "Unit 26 — Leadership & Advocacy",
    duration: "20 hours",
    lectures: 8,
    theory: [
      {
        type: "heading",
        content: "PSW as Client Advocate",
      },
      {
        type: "paragraph",
        content: "Advanced PSW practice in Unit 26 — Leadership & Advocacy requires integration of theoretical knowledge with complex clinical judgment. This unit prepares PSWs for challenging care scenarios encountered in advanced practice settings across Canada.",
      },
      {
        type: "list",
        items: [
          "<strong>PSW as Client Advocate:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Interprofessional Collaboration:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Mentoring New PSWs:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Professional Development and Continuing Education:</strong> Advanced competency aligned with national PSW standards.",
          "<strong>Quality Improvement in PSW Practice:</strong> Advanced competency aligned with national PSW standards.",
        ],
      },
      {
        type: "infobox",
        variant: "purple",
        title: "🏆 Advanced Practice Standard",
        content: "This unit content is aligned with Advanced PSW competencies for Ontario, BC, and Alberta. Mastery of these skills is required for complex care settings including LTC, complex continuing care, and specialized community programs.",
      },
      {
        type: "badges",
        items: [
          "Advanced PSW Standard",
          "HSCPOA Excellence",
          "Complex Care Certification",
        ],
      },
      {
        type: "practical",
        steps: [
          {
            title: "PSW as Client Advocate",
            desc: "Advanced simulation: Apply PSW as Client Advocate in a complex multi-system care scenario.",
            tag: "Advanced Competency",
          },
          {
            title: "Interprofessional Collaboration",
            desc: "Interprofessional simulation: Collaborate with a simulated care team to address Interprofessional Collaboration.",
            tag: "Must Pass",
          },
          {
            title: "Mentoring New PSWs",
            desc: "Complex scenario integration requiring synthesis of multiple competencies.",
            tag: "Competency Check",
          },
        ],
      },
    ],
    quiz: [
      {
        text: "In advanced PSW practice, which approach BEST reflects excellence in 'PSW as Client Advocate'?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Applying standardized protocols regardless of individual client needs",
          },
          {
            l: "B",
            t: "Integrating best evidence, clinical judgment, and person-centred care principles",
          },
          {
            l: "C",
            t: "Deferring all complex decisions to other team members",
          },
          {
            l: "D",
            t: "Applying the same approach used successfully with previous clients",
          },
        ],
        correct: "B",
        exp: "Advanced PSW practice requires integration of evidence-based knowledge with clinical judgment tailored to each unique client. Person-centred care remains foundational at all levels of practice.",
        ref: "HSCPOA Advanced Practice Standards",
      },
      {
        text: "When managing PSW as Client Advocate, the PSW's most critical responsibility is:",
        diff: "hard",
        options: [
          {
            l: "A",
            t: "Acting independently to resolve the situation",
          },
          {
            l: "B",
            t: "Observing for changes, communicating using SBAR, and implementing the care plan within scope",
          },
          {
            l: "C",
            t: "Consulting with family before reporting to the clinical team",
          },
          {
            l: "D",
            t: "Waiting for the situation to resolve before documenting",
          },
        ],
        correct: "B",
        exp: "Even at advanced levels, PSWs work within their scope of practice. Advanced PSWs bring more nuanced observation skills and clinical knowledge, but always report through appropriate channels and implement — not independently plan — care.",
        ref: "PSW Advanced Scope; RHPA Ontario",
      },
      {
        text: "Interprofessional collaboration in complex care settings means:",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Each professional working independently in their own lane",
          },
          {
            l: "B",
            t: "PSWs taking on nursing responsibilities to fill staffing gaps",
          },
          {
            l: "C",
            t: "Multiple professionals sharing information and coordinating care to optimize client outcomes",
          },
          {
            l: "D",
            t: "The physician directing all care decisions without input from front-line staff",
          },
        ],
        correct: "C",
        exp: "Interprofessional collaboration is a core Canadian healthcare value — PSWs bring unique front-line observational knowledge to the team. Their input on daily client changes, preferences, and responses to care is irreplaceable in care planning.",
        ref: "CPSI Interprofessional Education; Canadian Nursing Standards",
      },
      {
        text: "Which Canadian legislation most directly supports the rights of clients in advanced care settings?",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Canada Health Act — which covers PSW services directly",
          },
          {
            l: "B",
            t: "Fixing Long-Term Care Act 2021 (Ontario), Community Care and Assisted Living Act (BC), and provincial equivalents",
          },
          {
            l: "C",
            t: "Canadian Charter of Rights and Freedoms — which replaces all healthcare legislation",
          },
          {
            l: "D",
            t: "RHPA — which governs PSW practice independently",
          },
        ],
        correct: "B",
        exp: "Provincial legislation governing long-term care, community care, and assisted living directly establishes client rights, care standards, and PSW responsibilities. The Canada Health Act covers insured medical services but does not directly regulate PSW scope.",
        ref: "FLTCA 2021; BC CCALA; Alberta Continuing Care Standards",
      },
      {
        text: "In advanced PSW practice, professional advocacy means:",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Taking over medical decisions when nurses are unavailable",
          },
          {
            l: "B",
            t: "Speaking up for clients' rights, preferences, and needs within the care team",
          },
          {
            l: "C",
            t: "Arguing with the physician on behalf of the client",
          },
          {
            l: "D",
            t: "Sharing client information with the public to raise awareness",
          },
        ],
        correct: "B",
        exp: "Advocacy in PSW practice means using one's unique knowledge of the client to raise concerns, communicate preferences, and ensure the client's voice is represented in care planning — always through appropriate professional channels and within scope of practice.",
        ref: "HSCPOA Code of Ethics; PSW Advocacy Standards",
      },
    ],
  },
  {
    id: 27,
    level: "advanced",
    title: "Unit 27 — Capstone Clinical Practicum",
    duration: "48 hours",
    lectures: 4,
    theory: [
      {
        type: "heading",
        content: "Practicum Overview",
      },
      {
        type: "paragraph",
        content: "The Capstone Practicum consists of 48 supervised clinical hours at approved partner sites across Ontario, BC, and Alberta. Students complete rotations in two settings: Long-Term Care (24 hours) and Community/Home Care (24 hours).",
      },
      {
        type: "heading",
        content: "OSCE Competency Stations — Must Pass All",
      },
      {
        type: "list",
        items: [
          "<strong>Complete head-to-toe observation and documentation:</strong> Report abnormal findings using SBAR to supervising RN.",
          "<strong>Full bed bath for complex client:</strong> Dementia + hemiplegia + indwelling catheter scenario.",
          "<strong>Safe client transfer — bed to wheelchair:</strong> Using mechanical lift (Hoyer), 2-person assist, and stand assist as appropriate for client's level.",
          "<strong>Respond to a fall emergency:</strong> Do not move client, call for help, document, complete incident report.",
          "<strong>Administer delegated subcutaneous injection:</strong> If delegation order present and student is trained; correct technique and documentation.",
          "<strong>Therapeutic communication with dementia client:</strong> Validation therapy in a simulated scenario.",
          "<strong>Demonstrate correct hand hygiene × 5 moments:</strong> Observed by assessor throughout shift; zero critical errors.",
          "<strong>Complete end-of-shift documentation:</strong> Using facility EMR/eMAR system — ADL records, observations, incidents.",
        ],
      },
      {
        type: "heading",
        content: "Professional Practice Standards During Practicum",
      },
      {
        type: "list",
        items: [
          "<strong>Punctuality:</strong> Arrive 15 minutes before shift start for report. Absences require advance notice and may require make-up hours.",
          "<strong>Professional appearance:</strong> Follow facility dress code. Name badge visible at all times. No fragrances (clients with allergies/COPD).",
          "<strong>Client confidentiality:</strong> No photographs. No discussing clients outside the facility. Full PHIPA compliance.",
          "<strong>Supervision:</strong> Always work within sight of your supervising RN/RPN during the first week. Independence is gradually extended based on demonstrated competency.",
          "<strong>Scope of practice:</strong> If you are asked to perform a task outside your training or scope, politely decline and inform your supervisor immediately.",
        ],
      },
      {
        type: "infobox",
        variant: "green",
        title: "🎓 Passing Criteria",
        content: "Students must achieve a minimum of 75% on the summative OSCE assessment and receive a satisfactory rating from both the LTC and community placement supervisors to receive their PSW Certificate.",
      },
      {
        type: "badges",
        items: [
          "Ontario PSW Training Standard",
          "BC CHW Competency Framework",
          "Alberta ALIS PSW Standards",
          "CPSI Safety Competencies",
        ],
      },
      {
        type: "practical",
        steps: [
          {
            title: "LTC Placement (24 hours) — Complex Resident Care",
            desc: "Full personal care including specialized positioning, wound observation, responsive behaviour management, documentation in PointClickCare. Supervised by facility RN/RPN.",
            tag: "Must Pass",
          },
          {
            title: "Community Placement (24 hours) — Home Care Competency",
            desc: "Independent home visits (with check-in protocol), IADL support, caregiver education, care coordinator reporting. Must demonstrate safe home assessment and infection control in non-institutional setting.",
            tag: "Must Pass",
          },
          {
            title: "OSCE Final Assessment",
            desc: "Objectively structured clinical examination with 8 stations assessed by two qualified evaluators. Must pass all critical safety elements. Results provided within 5 business days.",
            tag: "Summative Assessment",
          },
        ],
      },
    ],
    quiz: [
      {
        text: "During your LTC practicum placement, a client refuses their morning care and asks you to leave the room. Your response is:",
        diff: "medium",
        options: [
          {
            l: "A",
            t: "Insist on completing care as scheduled — it is your responsibility",
          },
          {
            l: "B",
            t: "Respect the refusal, document it, and notify your supervising RN",
          },
          {
            l: "C",
            t: "Ask the client's family to convince them to accept care",
          },
          {
            l: "D",
            t: "Return in 10 minutes without notifying anyone",
          },
        ],
        correct: "B",
        exp: "Respecting care refusal is a legal and ethical obligation under the Health Care Consent Act. Document the refusal (time, client's exact words if provided), notify your supervising RN, and follow up later to offer care again. Never force care on a client with capacity to refuse.",
        ref: "Health Care Consent Act Ontario; HSCPOA Standards",
      },
      {
        text: "During your community home care placement, you notice the client's home has multiple fall hazards (loose rugs, poor lighting). Your action is:",
        diff: "hard",
        options: [
          {
            l: "A",
            t: "Remove all fall hazards immediately without consulting anyone",
          },
          {
            l: "B",
            t: "Ignore the hazards — home care clients have the right to live as they choose",
          },
          {
            l: "C",
            t: "Document the hazards, discuss safety concerns with the client, and report to the care coordinator for a formal home safety assessment",
          },
          {
            l: "D",
            t: "Refuse to provide care in an unsafe environment",
          },
        ],
        correct: "C",
        exp: "Home safety assessment is a professional responsibility. The PSW must balance client autonomy (the right to live in their own home as they choose) with duty of care (reporting safety hazards through appropriate channels). The care coordinator can arrange an OT home safety assessment and implement solutions collaboratively with the client.",
        ref: "Community Care Safety Standards; PSW Home Care Guidelines",
      },
      {
        text: "You are completing your end-of-shift documentation in PointClickCare. The correct approach is:",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "Document events from memory at the end of the following day when you have more time",
          },
          {
            l: "B",
            t: "Document observations and interventions as close to the time they occurred as possible during the shift",
          },
          {
            l: "C",
            t: "Ask a colleague to document your shift for you if you are busy",
          },
          {
            l: "D",
            t: "Use general terms like 'care given' to save time",
          },
        ],
        correct: "B",
        exp: "Timely, specific, and accurate documentation is a legal requirement. Documentation completed close to the time of events is more accurate and defensible. Asking others to document your care or using non-specific language ('care given') is inadequate and can constitute a documentation breach.",
        ref: "FLTCA Documentation Standards; PHIPA",
      },
      {
        text: "During your OSCE final assessment, the evaluator asks you to administer a subcutaneous insulin injection. You have not completed the delegation training for insulin injection. What do you do?",
        diff: "hard",
        options: [
          {
            l: "A",
            t: "Attempt the injection — the OSCE is a safe learning environment",
          },
          {
            l: "B",
            t: "Ask the evaluator to demonstrate it first and then copy",
          },
          {
            l: "C",
            t: "Decline respectfully: 'I have not completed delegation training for insulin injection — I am not able to perform this safely'",
          },
          {
            l: "D",
            t: "Perform the injection using knowledge from this curriculum unit",
          },
        ],
        correct: "C",
        exp: "Performing a controlled act without proper delegation training is a scope-of-practice violation, even in a simulation context. Knowing your limits and refusing unsafe tasks professionally is a COMPETENCY being assessed — not a failure. This demonstrates the highest professional standard.",
        ref: "RHPA Ontario; HSCPOA Standards; PSW Professional Practice",
      },
      {
        text: "What is the PRIMARY learning objective of the Capstone Clinical Practicum?",
        diff: "easy",
        options: [
          {
            l: "A",
            t: "To perform tasks faster than during classroom training",
          },
          {
            l: "B",
            t: "To observe experienced nurses performing complex procedures",
          },
          {
            l: "C",
            t: "To integrate and demonstrate all PSW competencies in real care settings under professional supervision",
          },
          {
            l: "D",
            t: "To complete the minimum required hours to receive the certificate",
          },
        ],
        correct: "C",
        exp: "The Capstone Practicum is a summative assessment experience — it is designed to demonstrate integration of all curriculum competencies (clinical, communication, ethical, professional) in authentic care environments. The goal is competency demonstration, not task completion or passive observation.",
        ref: "Ontario PSW Training Standard; CNO Supervised Practice",
      },
    ],
  },
]
