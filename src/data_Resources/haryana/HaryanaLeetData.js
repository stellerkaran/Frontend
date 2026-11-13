export const highlights = [
  { label: "Exam Name", value: "Haryana LEET — Lateral Entry Entrance Test (OCET-2026)" },
  { label: "Conducting Body", value: "HSTES (Haryana State Technical Education Society)" },
  { label: "Exam Level", value: "State-Level Entrance" },
  { label: "Admission To", value: "B.E. / B.Tech 2nd Year (Direct Lateral Entry)" },
  { label: "Exam Mode", value: "Online — Computer Based Test (CBT / OCET)" },
  { label: "Exam Date", value: "30 June 2026 onwards" },
  { label: "Duration", value: "90 Minutes" },
  { label: "Total Questions", value: "90 MCQs (4 Sections)" },
  { label: "Total Marks", value: "90 Marks" },
  { label: "Marking Scheme", value: "+1 for correct, 0 for wrong / unattempted — NO Negative Marking" },
  { label: "Question Type", value: "Objective (Multiple Choice)" },
  { label: "Medium", value: "English Only" },
  { label: "PPP ID", value: "Mandatory for Haryana Candidates" },
  { label: "Age Limit", value: "No Minimum / Maximum Age Limit" },
];

export const sections = [
  {
    id: "A",
    name: "Section A — Basic Sciences",
    icon: "🔬",
    questions: 25,
    marks: 25,
    color: "#f59e0b",
    bg: "#fffbeb",
    border: "#fde68a",
    subjects: [
      { name: "Mathematics", questions: 8 },
      { name: "Physics", questions: 8 },
      { name: "Chemistry", questions: 3 },
      { name: "Communication Skills", questions: 3 },
      { name: "General Awareness", questions: 3 },
    ],
  },
  {
    id: "B",
    name: "Section B — Electronics Stream",
    icon: "⚡",
    questions: 25,
    marks: 25,
    color: "#3b82f6",
    bg: "#eff6ff",
    border: "#bfdbfe",
    subjects: [
      { name: "Elements of Electrical Engineering", questions: "~8" },
      { name: "Elements of Electronics Engineering", questions: "~9" },
      { name: "Elements of Computer Engineering", questions: "~8" },
    ],
  },
  {
    id: "C",
    name: "Section C — Mechanical Stream",
    icon: "⚙️",
    questions: 20,
    marks: 20,
    color: "#10b981",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    subjects: [
      { name: "Elements of Mechanical Engineering", questions: "~8" },
      { name: "Elements of Production Engineering & Mfg.", questions: "~6" },
      { name: "Automobile Engineering", questions: "~6" },
    ],
  },
  {
    id: "D",
    name: "Section D — Other Engineering Streams",
    icon: "🏗️",
    questions: 20,
    marks: 20,
    color: "#8b5cf6",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    subjects: [
      { name: "Civil Engineering", questions: "" },
      { name: "Textile Engineering", questions: "" },
      { name: "Chemical Engineering", questions: "" },
      { name: "Printing / Ceramic / Food Technology", questions: "" },
      { name: "Other Allied Engineering Streams", questions: "" },
    ],
  },
];

export const eligibility = [
  {
    icon: "🎓",
    title: "Diploma Holders (Engineering)",
    desc: "Must have passed minimum 3-year Diploma in ANY branch of Engineering & Technology with at least 45% marks (40% for reserved category candidates) from a recognised institution.",
  },
  {
    icon: "🔬",
    title: "B.Sc Graduates",
    desc: "Candidates with B.Sc Degree from a UGC-recognised University with at least 45% marks (40% for reserved category) and Mathematics as a subject in 10+2 are also eligible.",
  },
  {
    icon: "🏅",
    title: "B.Voc / D.Voc Graduates",
    desc: "Candidates who have passed B.Voc or D.Voc (3-year) stream in the same or allied sector are also eligible for lateral entry admission.",
  },
  {
    icon: "📍",
    title: "Haryana Domicile / PPP ID",
    desc: "Haryana candidates must have a valid PPP (Parivar Pehchan Patra) ID for registration and confirmation of category & annual income. Domicile certificate may be required at counselling.",
  },
  {
    icon: "⏳",
    title: "Appearing Candidates",
    desc: "Candidates currently appearing in their qualifying exam may apply, but must produce the passing certificate before reporting at the allotted institute, otherwise they will not be eligible.",
  },
  {
    icon: "🔧",
    title: "Eligible Engineering Branches",
    desc: "All branches of Engineering and Technology Diploma are accepted — including CSE, Electrical, Mechanical, ECE, Civil, Chemical, and other allied engineering streams.",
  },
];

export const importantDates = [
  { event: "Brochure Available Online", date: "15 May 2026" },
  { event: "Online Registration Opens", date: "22 May 2026 (11:00 AM)" },
  { event: "Last Date to Register & Pay Fee", date: "23 Jun 2026 (11:59 PM)" },
  { event: "Admit Card Download", date: "26 Jun 2026" },
  { event: "OCET-2026 Exam Date", date: "30 Jun 2026 onwards*" },
  { event: "Display of Inter-se Rank", date: "8 Jul 2026" },
  { event: "1st Counseling — Choice Filling", date: "9 Jul – 12 Jul 2026" },
  { event: "1st Seat Allotment Result", date: "13 Jul 2026 (4:00 PM)" },
  { event: "Physical Reporting (1st Round)", date: "14 Jul – 16 Jul 2026" },
  { event: "2nd Counseling — Choice Filling", date: "17 Jul – 19 Jul 2026" },
  { event: "2nd Seat Allotment Result", date: "20 Jul 2026 (4:00 PM)" },
  { event: "Physical Reporting (2nd Round)", date: "21 Jul – 23 Jul 2026" },
  { event: "Last Date — Full Fee Refund", date: "31 Jul 2026" },
  { event: "Final Cut-off (All Admissions)", date: "14 Aug 2026" },
  { event: "Final Upload on HSTES Portal", date: "25 Aug 2026 (11:59 PM)" },
];

export const applicationFee = [
  { category: "General Category (Non-refundable)", fee: "₹1,000" },
  {
    category: "Reserved Categories (SC / SCD / BC / PH / FF / ESM / KM / Girls / EWS)",
    fee: "₹700",
  },
];

export const onlineApplicationSteps = [
  {
    step: "Step 1",
    title: "Register & Fill the Online Form",
    desc: "Visit techadmissionshry.gov.in → Click on 'B.Tech Lateral Entry 2026'. Fill personal details, educational qualifications (Diploma Branch), communication address. Haryana candidates must enter their PPP ID for category & income verification.",
    icon: "📝",
  },
  {
    step: "Step 2",
    title: "Upload Photo & Documents",
    desc: "Upload a recent passport-size colour photograph, signature, and any other documents as required. Ensure the photo is clear, recent, and against a white background. Preview before submitting.",
    icon: "📷",
  },
  {
    step: "Step 3",
    title: "Pay Registration Fee Online",
    desc: "Pay ₹1,000 (General) or ₹700 (Reserved) via Debit Card, Credit Card, or Net Banking. Fee is non-refundable. After payment, login to your applicant account and print the confirmation page. Do NOT post the printout to HSTES.",
    icon: "💳",
  },
];

export const documentsRequired = [
  "10th Marksheet & Passing Certificate (original + self-attested copies)",
  "Diploma All-Year/Semester Marksheets & Final Passing Certificate",
  "PPP ID (Parivar Pehchan Patra) — mandatory for Haryana residents",
  "Haryana Domicile Certificate (if applicable, issued by competent authority)",
  "Caste / Category Certificate — SC/SCD/BC/EWS/PH/FF/ESM/KM (issued by authorised authority)",
  "Annual Income Certificate (for reserved category fee concession & EWS)",
  "PwBD / Divyang Certificate from Civil Surgeon (if applicable)",
  "Admit Card of OCET-2026 (mandatory at physical reporting / counselling)",
  "Recent Colour Photograph & Signature",
];

export const tieBreakingRules = [
  {
    rank: "1",
    condition: "Total marks in OCET-2026 are equal",
    resolution: "Higher marks in Section A — Basic Sciences (Mathematics first)",
  },
  {
    rank: "2",
    condition: "Section A marks also equal",
    resolution: "Higher marks in Section B — Electronics Stream",
  },
  {
    rank: "3",
    condition: "Steps 1 & 2 equal",
    resolution: "Candidate with earlier Date of Birth (older candidate ranks higher)",
  },
  {
    rank: "4",
    condition: "Steps 1, 2 & 3 equal",
    resolution: "Alphabetical order of first name (English)",
  },
];

export const syllabusSummary = [
  {
    subject: "Section A — Mathematics",
    icon: "📐",
    color: "#f59e0b",
    bg: "#fffbeb",
    level: "Diploma 1st & 2nd Semester",
    topics: [
      "AP, GP, HP & Quadratic Equations",
      "Logarithms & Partial Fractions",
      "Determinants & Matrices",
      "Binomial Theorem",
      "Trigonometry — Ratios & Identities",
      "Compound & Multiple Angles",
      "Inverse Trigonometric Ratios",
      "Coordinate Geometry — Point & Line",
      "Circles & Their Equations",
      "Vectors — Dot & Cross Product",
      "Functions, Limits & Continuity",
      "Differentiation & Its Applications",
      "Integration & Its Applications",
    ],
  },
  {
    subject: "Section A — Physics",
    icon: "⚛️",
    color: "#3b82f6",
    bg: "#eff6ff",
    level: "Diploma 1st & 2nd Semester",
    topics: [
      "Units & Measurements",
      "Kinematics & Newton's Laws",
      "Angular Motion & SHM",
      "Work, Power & Energy",
      "Elasticity & Surface Tension",
      "Viscosity & Fluid Mechanics",
      "Heat & Thermal Expansion",
      "Sound & Acoustics",
      "Optics & Properties of Light",
      "Electrostatics & Electric Potential",
      "Modern Physics & Band Theory",
      "Photo Electricity, LASER & X-rays",
      "Nanotechnology & Non-Conventional Energy",
    ],
  },
  {
    subject: "Section A — Chemistry",
    icon: "🧪",
    color: "#10b981",
    bg: "#ecfdf5",
    level: "Diploma 1st & 2nd Semester",
    topics: [
      "Atomic Structure",
      "Electro Chemistry",
      "Water — Sources, Hardness & Treatment",
      "Metallurgy — Ore, Extraction & Alloys",
      "Corrosion — Types & Prevention",
      "Paints & Varnishes",
      "Lubricants — Types & Properties",
      "Plastics — Thermosetting & Thermoplastic",
      "Rubber — Natural & Synthetic",
      "Fuels — Classification & Properties",
      "Pollution & Environmental Chemistry",
      "Organic Chemistry Basics",
    ],
  },
  {
    subject: "Section A — Comm. Skills & GK",
    icon: "🗣️",
    color: "#ec4899",
    bg: "#fdf2f8",
    level: "General / Diploma Level",
    topics: [
      "Reading Comprehension",
      "Grammar & Vocabulary",
      "Technical Communication Basics",
      "Current Affairs — National & Haryana",
      "Science & Technology in News",
      "General Knowledge (India & World)",
    ],
  },
  {
    subject: "Section B — Electronics Stream",
    icon: "⚡",
    color: "#6366f1",
    bg: "#eef2ff",
    level: "Diploma 3rd–6th Semester",
    topics: [
      "Network Analysis — KVL, KCL, Theorems",
      "AC/DC Circuits & Phasors",
      "Transformers & Machines (basics)",
      "Semiconductor Devices — Diode, BJT, FET",
      "Amplifiers & Oscillators",
      "Digital Electronics — Logic Gates, Flip-flops",
      "Microprocessors & Microcontrollers (basics)",
      "Communication Systems — AM, FM, Digital",
      "Programming in C / C++",
      "Data Structures Basics",
      "DBMS Fundamentals",
      "Computer Networks (basics)",
      "Operating System Concepts",
    ],
  },
  {
    subject: "Section C — Mechanical Stream",
    icon: "⚙️",
    color: "#0891b2",
    bg: "#ecfeff",
    level: "Diploma 3rd–6th Semester",
    topics: [
      "Engineering Mechanics — Statics & Dynamics",
      "Strength of Materials — Stress, Strain",
      "Theory of Machines — Gears, Cams",
      "Thermodynamics — Laws, Cycles",
      "Fluid Mechanics & Hydraulic Machines",
      "Manufacturing Processes — Casting, Forging",
      "Machining — Turning, Drilling, Milling",
      "Welding — Types & Applications",
      "Metrology — Vernier, Micrometer",
      "Engine Components — IC Engines",
      "Automobile Systems — Transmission, Brakes",
      "Fuel Systems & Cooling Systems",
    ],
  },
  {
    subject: "Section D — Civil & Other Streams",
    icon: "🏗️",
    color: "#d97706",
    bg: "#fffbeb",
    level: "Diploma 3rd–6th Semester",
    topics: [
      "Strength of Materials & Structures",
      "Surveying — Levelling, Contouring",
      "Fluid Mechanics & Hydraulics",
      "Building Materials & Construction",
      "Environmental Engineering basics",
      "Chemical Process Engineering basics",
      "Heat & Mass Transfer basics",
      "Textile Technology basics",
      "Printing Technology basics",
      "Ceramic Engineering basics",
      "Food Technology basics",
    ],
  },
];

export const preparationTips = [
  {
    icon: "📅",
    tip: "Section A (Basic Sciences — 25 marks) is common for ALL candidates. Master it first — it's the most important section for rank.",
  },
  {
    icon: "📝",
    tip: "Solve Haryana LEET previous year question papers — pattern repeats frequently and many questions come directly from PYQs.",
  },
  {
    icon: "⏱️",
    tip: "Practice with 90-minute timer-based mock tests — OCET CBT mode has only 90 minutes for 90 questions, speed matters.",
  },
  {
    icon: "🎯",
    tip: "NO negative marking — always attempt ALL 90 questions. Never leave any question blank; a random guess gives 25% chance.",
  },
  {
    icon: "🔁",
    tip: "Revise formulas and short notes daily in the final 2 weeks — formula recall is critical for Maths & Physics in Section A.",
  },
  {
    icon: "📊",
    tip: "Section A + B = 50 marks — prioritise these two sections. Section C & D = 40 marks, revise from diploma notes in last 2–3 weeks.",
  },
];

export const faqs = [
  {
    q: "Haryana LEET (OCET-2026) exam क्या है?",
    a: "Haryana LEET (Lateral Entry Entrance Test), officially known as OCET (Online Common Entrance Test) 2026, HSTES (Haryana State Technical Education Society) द्वारा आयोजित की जाती है। यह Diploma / B.Sc holders को Haryana के Government और Private Engineering Colleges में B.Tech 2nd Year में Direct Lateral Entry दिलाती है।",
  },
  {
    q: "OCET-2026 exam pattern क्या है — कितने questions हैं?",
    a: "OCET-2026 में कुल 90 MCQ questions होते हैं जो 90 marks के लिए होते हैं। Exam की duration 90 minutes है। 4 sections हैं: Section A (Basic Sciences — 25 marks), Section B (Electronics Stream — 25 marks), Section C (Mechanical Stream — 20 marks), Section D (Other Engineering Streams — 20 marks)। कोई Negative Marking नहीं है।",
  },
  {
    q: "क्या OCET में Negative Marking होती है?",
    a: "नहीं। OCET-2026 में कोई Negative Marking नहीं है। हर correct answer के लिए +1 mark मिलता है। गलत या unattempted question के लिए 0 marks। इसलिए सभी 90 questions attempt करने चाहिए — कोई भी question blank नहीं छोड़ना चाहिए।",
  },
  {
    q: "OCET-2026 exam date और timing क्या है?",
    a: "Official schedule के अनुसार, OCET-2026 exam 30 June 2026 से शुरू होगी (exact date admit card पर होगी)। Exam Online CBT Mode में होगी। Admit cards 26 June 2026 को जारी होंगे। Rank display 8 July 2026 को होगा।",
  },
  {
    q: "Haryana LEET का syllabus क्या है?",
    a: "OCET के 4 sections हैं। Section A में Maths (8Q), Physics (8Q), Chemistry (3Q), Communication Skills (3Q), General Awareness (3Q) — कुल 25 questions। Section B में Electrical, Electronics, Computer Engineering — 25 questions। Section C में Mechanical, Production, Automobile Engineering — 20 questions। Section D में Civil, Chemical, Textile, Food Technology और अन्य streams — 20 questions।",
  },
  {
    q: "PPP ID क्या है और क्या यह जरूरी है?",
    a: "PPP ID यानी Parivar Pehchan Patra ID — Haryana सरकार का family identity document है। Haryana candidates के लिए registration और category / annual income की confirmation के लिए यह mandatory है। Non-Haryana candidates को इसकी जरूरत नहीं होती।",
  },
  {
    q: "Application fee कितनी है?",
    a: "General category candidates के लिए ₹1,000 और सभी Reserved categories (SC/SCD/BC/PH/FF/ESM/KM/Girls/EWS) के लिए ₹700 है। Fee केवल online mode में जमा होती है — Debit/Credit Card या Net Banking। Fee non-refundable है।",
  },
  {
    q: "Counselling process कैसे काम करती है?",
    a: "HSTES Online Centralized Off-Campus Counselling करती है। दो rounds होते हैं। पहले candidates techadmissionshry.gov.in पर choices fill और lock करते हैं, NIC seat allotment करता है, फिर allotted institute पर physically report करना होता है। 1st round: 9-12 July (choices), 13 July (allotment), 14-16 July (reporting). 2nd round: 17-19 July (choices), 20 July (allotment), 21-23 July (reporting)।",
  },
  {
    q: "क्या मैं अपनी Diploma branch से अलग B.Tech branch चुन सकता हूँ?",
    a: "हाँ। HSTES official brochure के अनुसार, किसी भी Engineering Diploma वाला candidate counselling में कोई भी B.Tech branch choose कर सकता है — rank और seat availability के आधार पर। उदाहरण: Diploma in Mechanical वाला candidate Computer Engineering में admission ले सकता है।",
  },
  {
    q: "क्या B.Sc graduates Haryana LEET के लिए eligible हैं?",
    a: "हाँ। B.Sc graduates जिनके 10+2 में Mathematics था और Degree में minimum 45% marks हैं (reserved category के लिए 40%), वे Haryana LEET के लिए eligible हैं। B.Voc / D.Voc (3-year) stream candidates भी same or allied sector में eligible हैं।",
  },
];

export const reservationCategories = [
  { category: "SC (Scheduled Caste)", seats: "As per Haryana Reservation Act" },
  { category: "SCD (Scheduled Caste Deprived)", seats: "As per Haryana Reservation Act" },
  { category: "BC-A / BC-B (Backward Classes)", seats: "As per Haryana Reservation Act" },
  { category: "EWS (Economically Weaker Section)", seats: "As per Haryana Govt. norms" },
  { category: "PH / Divyang", seats: "As per AICTE / State norms" },
  { category: "FF (Freedom Fighter)", seats: "As per Haryana norms" },
  { category: "ESM (Ex-Serviceman)", seats: "As per Haryana norms" },
  { category: "KM (Kashmiri Migrant)", seats: "As per Haryana norms" },
  { category: "TFW (Tuition Fee Waiver)", seats: "10% of seats in each institute" },
];
