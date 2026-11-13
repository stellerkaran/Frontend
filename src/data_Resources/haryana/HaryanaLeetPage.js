/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "react-bootstrap";
import AdBanner from "@/components/AdBanner";

const highlights = [
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

// 4-section exam pattern (official OCET structure)
const sections = [
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

const eligibility = [
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

const importantDates = [
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

const applicationFee = [
  { category: "General Category (Non-refundable)", fee: "₹1,000" },
  {
    category: "Reserved Categories (SC / SCD / BC / PH / FF / ESM / KM / Girls / EWS)",
    fee: "₹700",
  },
];

const onlineApplicationSteps = [
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

const documentsRequired = [
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

const tieBreakingRules = [
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

// Updated 4-section detailed syllabus
const syllabusSummary = [
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

const preparationTips = [
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

const reservationCategories = [
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

const SectionHead = ({ label, title, sub }) => (
  <div style={{ marginBottom: 20 }}>
    <span className="hlp-section-label">{label}</span>
    <h2 className="hlp-section-title">{title}</h2>
    {sub && <p className="hlp-section-sub">{sub}</p>}
  </div>
);

const Sep = () => <div className="hlp-sep" />;

export default function HaryanaLeetPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      {/* Inline <style> via dangerouslySetInnerHTML so React never HTML-escapes the CSS (it would escape "&" and ">" inside a text child, breaking hydration on server-rendered HTML). */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* PAGE */
        .hlp-page {
          --blue:      #1d4ed8;
          --blue-dk:   #1e3a8a;
          --blue-lt:   #eff6ff;
          --saffron:   #f97316;
          --text:      #111827;
          --text-2:    #374151;
          --muted:     #6b7280;
          --border:    #e5e7eb;
          --surface:   #ffffff;
          --surface-2: #f9fafb;
          --radius-lg: 20px;
          --radius-md: 14px;
          --radius-sm: 10px;
          --shadow-xs: 0 1px 6px rgba(0,0,0,0.05);
          --shadow-sm: 0 4px 16px rgba(0,0,0,0.07);
          --shadow-md: 0 8px 32px rgba(0,0,0,0.10);
          font-family: "DM Sans", ui-sans-serif, system-ui, sans-serif;
          background: #f0f4fb;
          min-height: 100vh;
          padding-bottom: 80px;
          overflow-x: hidden;
        }

        /* HERO */
        .hlp-hero {
          background: linear-gradient(155deg, #0a1628 0%, #1d4ed8 55%, #2563eb 100%);
          padding: 64px 16px 80px; text-align: center; position: relative; overflow: hidden;
        }
        .hlp-hero-stripe {
          position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, #ff9933 33.33%, #ffffff 33.33% 66.66%, #138808 66.66%);
        }
        .hlp-hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at 15% 60%, rgba(255,255,255,0.07) 0%, transparent 45%),
                      radial-gradient(circle at 85% 20%, rgba(249,115,22,0.10) 0%, transparent 40%);
          pointer-events: none;
        }
        .hlp-hero-inner { position: relative; z-index: 1; max-width: 680px; margin: 0 auto; }
        .hlp-hero h1 {
          font-family: "Sora", sans-serif;
          font-size: clamp(1.55rem, 5vw, 2.3rem);
          font-weight: 800; color: #fff; margin-bottom: 12px; margin-top: 22px;
          line-height: 1.2; letter-spacing: -0.5px;
        }
        .hlp-hero > .hlp-hero-inner > p {
          font-size: clamp(0.9rem, 2.5vw, 1rem); color: rgba(255,255,255,0.82);
          line-height: 1.75; margin: 0 auto 20px; max-width: 560px;
        }
        .hlp-hero-pills { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
        .hlp-hero-pill {
          background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.22);
          border-radius: 999px; padding: 5px 14px;
          font-size: 0.76rem; font-weight: 600; color: #fff;
        }
        .hlp-hero-pill--warn {
          background: rgba(249,115,22,0.20); border-color: rgba(249,115,22,0.45); color: #fed7aa;
        }
        .hlp-hero-pill--green {
          background: rgba(16,185,129,0.20); border-color: rgba(16,185,129,0.45); color: #6ee7b7;
        }

        /* STAT STRIP */
        .hlp-stat-strip {
          display: grid; grid-template-columns: repeat(4, 1fr);
          background: var(--surface); border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md); overflow: hidden;
          margin-top: -36px; position: relative; z-index: 2;
        }
        @media (max-width: 600px) { .hlp-stat-strip { grid-template-columns: repeat(2, 1fr); } }
        .hlp-stat {
          text-align: center; padding: 18px 10px;
          border-right: 1px solid var(--border); border-bottom: 1px solid var(--border);
        }
        .hlp-stat:nth-child(4n) { border-right: none; }
        @media (max-width: 600px) {
          .hlp-stat:nth-child(2n) { border-right: none; }
          .hlp-stat:nth-child(3), .hlp-stat:nth-child(4) { border-bottom: none; }
        }
        .hlp-stat-val {
          font-family: "Sora", sans-serif;
          font-size: clamp(1.1rem, 3vw, 1.4rem);
          font-weight: 800; color: var(--blue); line-height: 1; margin-bottom: 4px;
        }
        .hlp-stat-label { font-size: clamp(0.66rem,1.5vw,0.75rem); color: var(--muted); font-weight: 600; }

        /* SEPARATOR */
        .hlp-sep { height: 1px; background: var(--border); margin: 32px 0 0; }
        .hlp-section { padding-top: 28px; }
        .hlp-section-label {
          display: block; font-size: 0.68rem; font-weight: 800;
          letter-spacing: 1.6px; text-transform: uppercase;
          color: var(--blue); font-family: "Sora", sans-serif; margin-bottom: 5px;
        }
        .hlp-section-title {
          font-family: "Sora", sans-serif;
          font-size: clamp(1.05rem, 3.5vw, 1.35rem);
          font-weight: 800; color: var(--text); margin-bottom: 5px;
          letter-spacing: -0.3px; line-height: 1.3;
        }
        .hlp-section-sub { font-size: 0.88rem; color: var(--muted); line-height: 1.65; margin-bottom: 0; }

        /* CARD */
        .hlp-card {
          background: var(--surface); border: 1.5px solid var(--border);
          border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-xs);
        }
        .hlp-card-header {
          display: flex; align-items: center; gap: 10px;
          padding: 13px 18px; border-bottom: 1px solid var(--border);
          background: var(--surface-2);
        }
        .hlp-card-icon {
          width: 30px; height: 30px; border-radius: 8px;
          background: var(--blue-lt); display: flex; align-items: center;
          justify-content: center; font-size: 0.95rem; flex-shrink: 0;
        }
        .hlp-card-title {
          font-family: "Sora", sans-serif; font-size: 0.88rem;
          font-weight: 800; color: var(--text); margin: 0;
        }
        .hlp-card-body { padding: 18px; }

        /* HIGHLIGHTS TABLE */
        .hlp-highlights-table { width: 100%; border-collapse: collapse; }
        .hlp-highlights-table tr { border-bottom: 1px solid var(--border); }
        .hlp-highlights-table tr:last-child { border-bottom: none; }
        .hlp-highlights-table td { padding: 10px 16px; font-size: 0.85rem; line-height: 1.5; vertical-align: top; }
        .hlp-highlights-table td:first-child { font-weight: 700; color: var(--text-2); width: 42%; }
        .hlp-highlights-table td:last-child { color: var(--text); }
        @media (max-width: 400px) { .hlp-highlights-table td { padding: 9px 12px; font-size: 0.81rem; } }

        /* SECTIONS GRID (4-section pattern) */
        .hlp-sections-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 12px; }
        @media (max-width: 540px) { .hlp-sections-grid { grid-template-columns: 1fr; } }
        .hlp-section-card {
          border-radius: var(--radius-md); padding: 16px; border: 1.5px solid;
        }
        .hlp-section-card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .hlp-section-badge {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: "Sora", sans-serif; font-size: 0.75rem; font-weight: 800;
          color: #fff; flex-shrink: 0;
        }
        .hlp-section-card-name { font-family: "Sora", sans-serif; font-size: 0.82rem; font-weight: 800; }
        .hlp-section-card-meta { display: flex; gap: 14px; margin-bottom: 10px; }
        .hlp-section-card-stat { font-size: 0.75rem; color: var(--muted); font-weight: 600; }
        .hlp-section-card-stat span { font-family: "Sora", sans-serif; font-size: 1rem; font-weight: 800; }
        .hlp-section-subjects { display: flex; flex-direction: column; gap: 4px; }
        .hlp-section-subject {
          font-size: 0.77rem; color: var(--text-2);
          display: flex; align-items: center; justify-content: space-between;
          padding: 3px 0; border-bottom: 1px dashed var(--border);
        }
        .hlp-section-subject:last-child { border-bottom: none; }
        .hlp-section-subject-q { font-weight: 700; font-size: 0.72rem; opacity: 0.7; }

        /* MARKING GRID */
        .hlp-marking-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 12px; }
        .hlp-marking-card { border-radius: var(--radius-sm); padding: 14px 10px; text-align: center; border: 1.5px solid; }
        .hlp-marking-emoji { font-size: 1.1rem; margin-bottom: 4px; }
        .hlp-marking-val { font-family: "Sora", sans-serif; font-size: 1.05rem; font-weight: 800; margin-bottom: 3px; }
        .hlp-marking-label { font-size: 0.72rem; color: var(--muted); font-weight: 600; }

        /* ELIGIBILITY GRID */
        .hlp-elig-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        @media (max-width: 520px) { .hlp-elig-grid { grid-template-columns: 1fr; } }
        .hlp-elig-card {
          background: var(--surface-2); border: 1.5px solid var(--border);
          border-radius: var(--radius-md); padding: 14px 16px;
          display: flex; gap: 11px; align-items: flex-start;
        }
        .hlp-elig-icon {
          font-size: 1.1rem; flex-shrink: 0; width: 34px; height: 34px;
          background: var(--surface); border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--border);
        }
        .hlp-elig-title { font-family: "Sora", sans-serif; font-size: 0.83rem; font-weight: 700; color: var(--text); margin-bottom: 4px; }
        .hlp-elig-desc { font-size: 0.8rem; color: var(--muted); line-height: 1.6; margin: 0; }

        /* FEE TABLE */
        .hlp-fee-table { width: 100%; border-collapse: collapse; }
        .hlp-fee-table th {
          background: var(--blue); color: #fff; padding: 10px 16px;
          font-family: "Sora", sans-serif; font-size: 0.8rem; font-weight: 700; text-align: left;
        }
        .hlp-fee-table td { padding: 10px 16px; font-size: 0.85rem; border-bottom: 1px solid var(--border); color: var(--text-2); }
        .hlp-fee-table tr:last-child td { border-bottom: none; }
        .hlp-fee-table tr:nth-child(even) td { background: var(--surface-2); }
        .hlp-fee-val { font-weight: 800; font-family: "Sora", sans-serif; color: var(--blue); }

        /* DATES LIST */
        .hlp-dates-list { display: flex; flex-direction: column; gap: 7px; }
        .hlp-date-item {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; padding: 11px 16px;
          background: var(--surface-2); border: 1.5px solid var(--border);
          border-radius: var(--radius-sm);
        }
        .hlp-date-item--highlight { border-color: rgba(29,78,216,0.3); background: #eff6ff; }
        .hlp-date-item--warn { border-color: rgba(239,68,68,0.30); background: #fff1f2; }
        .hlp-date-event { font-size: 0.84rem; font-weight: 600; color: var(--text-2); flex: 1; min-width: 0; }
        .hlp-date-val {
          font-size: 0.78rem; font-weight: 700; font-family: "Sora", sans-serif;
          color: var(--blue); background: var(--blue-lt);
          border-radius: 999px; padding: 3px 11px; white-space: nowrap; flex-shrink: 0;
        }
        .hlp-date-val--warn { color: #dc2626; background: #fee2e2; }
        @media (max-width: 480px) { .hlp-date-item { flex-wrap: wrap; gap: 6px; } .hlp-date-event { font-size: 0.81rem; } }

        /* STEPS */
        .hlp-steps-list { display: flex; flex-direction: column; gap: 12px; }
        .hlp-step-card {
          display: flex; gap: 14px; align-items: flex-start;
          background: var(--surface); border: 1.5px solid var(--border);
          border-radius: var(--radius-md); padding: 16px;
        }
        .hlp-step-num {
          width: 36px; height: 36px; border-radius: 50%;
          background: var(--blue); color: #fff;
          font-family: "Sora", sans-serif; font-size: 0.8rem; font-weight: 800;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .hlp-step-title { font-family: "Sora", sans-serif; font-size: 0.88rem; font-weight: 700; color: var(--text); margin-bottom: 5px; }
        .hlp-step-desc { font-size: 0.82rem; color: var(--muted); line-height: 1.65; margin: 0; }

        /* DOCUMENTS LIST */
        .hlp-docs-list { display: flex; flex-direction: column; gap: 7px; }
        .hlp-doc-item {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 10px 14px; background: var(--surface-2);
          border: 1.5px solid var(--border); border-radius: var(--radius-sm);
          font-size: 0.83rem; color: var(--text-2); line-height: 1.55;
        }
        .hlp-doc-icon { flex-shrink: 0; font-size: 0.9rem; margin-top: 1px; }

        /* TIE-BREAKING TABLE */
        .hlp-tie-table { width: 100%; border-collapse: collapse; }
        .hlp-tie-table th {
          background: var(--blue); color: #fff; padding: 9px 14px;
          font-family: "Sora", sans-serif; font-size: 0.78rem; font-weight: 700; text-align: left;
        }
        .hlp-tie-table td { padding: 10px 14px; font-size: 0.82rem; border-bottom: 1px solid var(--border); color: var(--text-2); }
        .hlp-tie-table tr:last-child td { border-bottom: none; }
        .hlp-tie-table tr:nth-child(even) td { background: var(--surface-2); }

        /* RESERVATION TABLE */
        .hlp-res-table { width: 100%; border-collapse: collapse; }
        .hlp-res-table th {
          background: var(--blue); color: #fff; padding: 9px 14px;
          font-family: "Sora", sans-serif; font-size: 0.78rem; font-weight: 700; text-align: left;
        }
        .hlp-res-table td { padding: 9px 14px; font-size: 0.82rem; border-bottom: 1px solid var(--border); color: var(--text-2); }
        .hlp-res-table tr:last-child td { border-bottom: none; }
        .hlp-res-table tr:nth-child(even) td { background: var(--surface-2); }

        /* SYLLABUS */
        .hlp-syllabus-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        @media (max-width: 720px) { .hlp-syllabus-grid { grid-template-columns: 1fr; gap: 10px; } }
        .hlp-syllabus-card {
          background: var(--surface); border: 1.5px solid var(--border);
          border-radius: var(--radius-md); overflow: hidden;
        }
        .hlp-syllabus-header {
          display: flex; align-items: center; gap: 8px;
          padding: 11px 15px; font-family: "Sora", sans-serif;
          font-size: 0.88rem; font-weight: 800; color: #fff;
        }
        .hlp-syllabus-level {
          font-size: 0.68rem; background: rgba(255,255,255,0.2);
          border-radius: 999px; padding: 2px 8px; margin-left: auto; white-space: nowrap;
        }
        .hlp-syllabus-topics { padding: 10px 14px; }
        .hlp-syllabus-topic {
          display: flex; align-items: flex-start; gap: 7px;
          font-size: 0.8rem; color: var(--text-2);
          padding: 6px 0; border-bottom: 1px solid var(--border); line-height: 1.4;
        }
        .hlp-syllabus-topic:last-child { border-bottom: none; }
        .hlp-syllabus-topic::before { content: '›'; font-size: 0.85rem; font-weight: 700; flex-shrink: 0; margin-top: 1px; opacity: 0.5; }
        @media (max-width: 720px) {
          .hlp-syllabus-topics { display: grid; grid-template-columns: repeat(2, 1fr); padding: 10px 12px; gap: 0 8px; }
          .hlp-syllabus-topic { padding: 5px 2px; }
        }
        @media (max-width: 380px) { .hlp-syllabus-topics { grid-template-columns: 1fr; } }

        /* TIPS */
        .hlp-tips-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 9px; }
        @media (max-width: 480px) { .hlp-tips-grid { grid-template-columns: 1fr; } }
        .hlp-tip-card {
          background: var(--surface); border: 1.5px solid var(--border);
          border-radius: var(--radius-sm); padding: 13px 15px;
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 0.83rem; color: var(--text-2); line-height: 1.55;
        }
        .hlp-tip-icon { font-size: 1rem; flex-shrink: 0; margin-top: 1px; }

        /* SCHEDULE SLOTS */
        .hlp-slot { display: flex; gap: 12px; align-items: flex-start; padding-bottom: 14px; margin-bottom: 14px; border-bottom: 1px solid var(--border); }
        .hlp-slot:last-child { padding-bottom: 0; margin-bottom: 0; border-bottom: none; }
        .hlp-slot-icon { font-size: 1.05rem; flex-shrink: 0; }
        .hlp-slot-time { font-family: "Sora", sans-serif; font-size: 0.76rem; font-weight: 800; color: var(--blue); margin-bottom: 2px; }
        .hlp-slot-label { font-size: 0.84rem; color: var(--text-2); margin: 0; line-height: 1.5; }

        /* FAQ */
        .hlp-faq-item { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); margin-bottom: 7px; overflow: hidden; }
        .hlp-faq-item--open { border-color: rgba(29,78,216,0.3); }
        .hlp-faq-btn {
          width: 100%; border: none; background: transparent; text-align: left;
          display: flex; align-items: center; justify-content: space-between;
          gap: 10px; padding: 14px 18px; cursor: pointer; min-height: 50px;
          -webkit-tap-highlight-color: transparent;
        }
        .hlp-faq-q { font-family: "Sora", sans-serif; font-size: clamp(0.8rem,2vw,0.88rem); font-weight: 700; color: var(--text); line-height: 1.4; }
        .hlp-faq-chevron {
          flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%;
          background: var(--surface-2); color: var(--muted); font-size: 0.65rem;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.25s, background 0.2s, color 0.2s;
        }
        .hlp-faq-item--open .hlp-faq-chevron { transform: rotate(180deg); background: var(--blue); color: #fff; }
        .hlp-faq-ans { padding: 0 18px 14px; font-size: 0.84rem; color: var(--muted); line-height: 1.72; }
        @media (max-width: 400px) { .hlp-faq-btn { padding: 12px 14px; } .hlp-faq-ans { padding: 0 14px 12px; } }

        /* OFFICIAL STRIP */
        .hlp-official-strip {
          background: linear-gradient(135deg, var(--blue) 0%, var(--blue-dk) 100%);
          border-radius: var(--radius-md); padding: 18px 20px; color: #fff;
          display: flex; align-items: center; justify-content: space-between;
          gap: 14px; flex-wrap: wrap; box-shadow: 0 6px 20px rgba(29,78,216,0.22);
        }
        .hlp-official-text h3 { font-family: "Sora", sans-serif; font-size: 0.9rem; font-weight: 800; margin-bottom: 3px; }
        .hlp-official-text p { font-size: 0.8rem; color: rgba(255,255,255,0.75); margin: 0; }
        .hlp-official-link {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25);
          border-radius: var(--radius-sm); padding: 9px 18px;
          color: #fff; font-weight: 700; font-size: 0.82rem;
          text-decoration: none; font-family: "Sora", sans-serif;
          transition: background 0.18s; white-space: nowrap;
        }
        .hlp-official-link:hover { background: rgba(255,255,255,0.25); color: #fff; }

        /* RELATED GRID */
        .hlp-related-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 9px; margin-top: 14px; }
        @media (max-width: 480px) { .hlp-related-grid { grid-template-columns: 1fr; } }
        .hlp-related-link {
          background: var(--surface); border: 1.5px solid var(--border);
          border-radius: var(--radius-md); padding: 13px 15px;
          text-decoration: none; color: var(--text-2); font-size: 0.83rem; font-weight: 600;
          display: flex; align-items: center; justify-content: space-between; gap: 8px;
          transition: border-color 0.18s, color 0.18s; font-family: "Sora", sans-serif;
        }
        .hlp-related-link:hover { border-color: rgba(29,78,216,0.3); color: var(--blue); }
        .hlp-disclaimer { text-align: center; font-size: 0.73rem; color: var(--muted); margin-top: 18px; line-height: 1.65; padding: 0 8px; }

        /* INFO ALERT */
        .hlp-info-alert {
          display: flex; align-items: flex-start; gap: 10px;
          background: #fffbeb; border: 1.5px solid #fde68a;
          border-radius: var(--radius-sm); padding: 12px 14px;
          font-size: 0.82rem; color: #92400e; line-height: 1.6; margin-top: 10px;
        }
        .hlp-info-alert-icon { flex-shrink: 0; font-size: 1rem; }
        .hlp-info-alert--blue { background: #eff6ff; border-color: #bfdbfe; color: #1e40af; }
        .hlp-info-alert--green { background: #ecfdf5; border-color: #6ee7b7; color: #065f46; }

        /* NO NEGATIVE MARKING BANNER */
        .hlp-no-neg-banner {
          background: linear-gradient(135deg, #065f46 0%, #047857 100%);
          border-radius: var(--radius-md); padding: 16px 20px;
          display: flex; align-items: center; gap: 14px;
          color: #fff; margin-top: 12px;
        }
        .hlp-no-neg-icon { font-size: 1.8rem; flex-shrink: 0; }
        .hlp-no-neg-title { font-family: "Sora", sans-serif; font-size: 0.95rem; font-weight: 800; margin-bottom: 3px; }
        .hlp-no-neg-desc { font-size: 0.8rem; color: rgba(255,255,255,0.82); line-height: 1.5; margin: 0; }

        /* RESPONSIVE */
        @media (max-width: 480px) {
          .hlp-hero { padding: 48px 14px 68px; }
          .hlp-hero h1 { margin-top: 36px; }
          .hlp-card-body { padding: 14px; }
          .hlp-section { padding-top: 22px; }
          .hlp-official-link { width: 100%; justify-content: center; }
        }
        @media (max-width: 400px) {
          .hlp-hero h1 { font-size: 1.38rem; margin-top: 36px; }
          .hlp-section-title { font-size: 1rem; }
        }
      ` }} />

      <main className="hlp-page">
        {/* HERO */}
        <div className="hlp-hero">
          <div className="hlp-hero-stripe" aria-hidden="true" />
          <div className="hlp-hero-inner">
            <h1>Haryana LEET Exam 2026<br />Complete Official Guide</h1>
            <p>
              Haryana Lateral Entry (OCET-2026) — official eligibility, full 4-section syllabus, exam pattern,
              important dates, counselling schedule, and MCQs to practice online — all in one place, completely free.
            </p>
            <div className="hlp-hero-pills">
              <span className="hlp-hero-pill">Online CBT Mode</span>
              <span className="hlp-hero-pill--green hlp-hero-pill">✅ No Negative Marking</span>
              <span className="hlp-hero-pill--warn hlp-hero-pill">⚠️ Exam: 30 Jun 2026</span>
            </div>
          </div>
        </div>

        <Container style={{ maxWidth: 980, padding: "0 14px" }}>

          {/* STAT STRIP */}
          <div className="hlp-stat-strip">
            {[
              { val: "90", label: "Total Questions" },
              { val: "90", label: "Total Marks" },
              { val: "90 min", label: "Duration" },
              { val: "30 Jun", label: "Exam Date 2026" },
            ].map((s, i) => (
              <div className="hlp-stat" key={i}>
                <div className="hlp-stat-val">{s.val}</div>
                <div className="hlp-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ margin: "18px 0" }}>
            <AdBanner slot="2434542863" />
          </div>

          {/* EXAM HIGHLIGHTS */}
          <div className="hlp-section" id="exam-info">
            <SectionHead
              label="About the Exam"
              title="Exam Highlights"
              sub="Haryana LEET (OCET-2026) is a state-level online entrance conducted by HSTES for direct admission to B.Tech 2nd Year (Lateral Entry) in Haryana."
            />
            <div className="hlp-card">
              <div className="hlp-card-header">
                <div className="hlp-card-icon">📋</div>
                <h3 className="hlp-card-title">At a Glance — Official 2026 Data</h3>
              </div>
              <div className="hlp-card-body" style={{ padding: 0 }}>
                <table className="hlp-highlights-table">
                  <tbody>
                    {highlights.map((h, i) => (
                      <tr key={i}>
                        <td>{h.label}</td>
                        <td>{h.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <Sep />

          {/* EXAM PATTERN — 4 SECTIONS */}
          <div className="hlp-section" id="pattern">
            <SectionHead
              label="Exam Pattern"
              title="4-Section Distribution (Official OCET Pattern)"
              sub="OCET-2026 has 4 sections — 90 questions, 90 marks, 90 minutes. ALL candidates must attempt ALL sections."
            />

            <div className="hlp-sections-grid">
              {sections.map((sec) => (
                <div
                  className="hlp-section-card"
                  key={sec.id}
                  style={{ background: sec.bg, borderColor: sec.border }}
                >
                  <div className="hlp-section-card-header">
                    <div className="hlp-section-badge" style={{ background: sec.color }}>
                      {sec.id}
                    </div>
                    <span className="hlp-section-card-name" style={{ color: sec.color }}>
                      {sec.icon} {sec.name.replace(`Section ${sec.id} — `, "")}
                    </span>
                  </div>
                  <div className="hlp-section-card-meta">
                    <div className="hlp-section-card-stat">
                      <span style={{ color: sec.color }}>{sec.questions}</span> Questions
                    </div>
                    <div className="hlp-section-card-stat">
                      <span style={{ color: sec.color }}>{sec.marks}</span> Marks
                    </div>
                  </div>
                  <div className="hlp-section-subjects">
                    {sec.subjects.map((sub, j) => (
                      <div className="hlp-section-subject" key={j}>
                        <span>{sub.name}</span>
                        {sub.questions && (
                          <span className="hlp-section-subject-q">{sub.questions}Q</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Marking Scheme */}
            <div className="hlp-marking-grid">
              <div className="hlp-marking-card" style={{ background: "#ecfdf5", borderColor: "#6ee7b7" }}>
                <div className="hlp-marking-emoji">✅</div>
                <div className="hlp-marking-val" style={{ color: "#059669" }}>+1</div>
                <div className="hlp-marking-label">Correct Answer</div>
              </div>
              <div className="hlp-marking-card" style={{ background: "#f9fafb", borderColor: "#e5e7eb" }}>
                <div className="hlp-marking-emoji">❌</div>
                <div className="hlp-marking-val" style={{ color: "#6b7280" }}>0</div>
                <div className="hlp-marking-label">Wrong Answer</div>
              </div>
              <div className="hlp-marking-card" style={{ background: "#f9fafb", borderColor: "#e5e7eb" }}>
                <div className="hlp-marking-emoji">⬜</div>
                <div className="hlp-marking-val" style={{ color: "#6b7280" }}>0</div>
                <div className="hlp-marking-label">Unattempted</div>
              </div>
            </div>

            {/* No Negative Marking highlight */}
            <div className="hlp-no-neg-banner">
              <span className="hlp-no-neg-icon">🚫➖</span>
              <div>
                <p className="hlp-no-neg-title">कोई Negative Marking नहीं! — Attempt All 90 Questions</p>
                <p className="hlp-no-neg-desc">
                  OCET-2026 में wrong answer पर 0 marks मिलते हैं — कोई marks नहीं कटते। इसलिए कोई भी question blank मत छोड़ो। Even a guess gives 25% chance of +1.
                </p>
              </div>
            </div>

            <div className="hlp-info-alert" style={{ marginTop: 12 }}>
              <span className="hlp-info-alert-icon">⚠️</span>
              <span>
                <strong>CBT Mode:</strong> Haryana LEET 2026 Online (Computer Based Test) है — OMR नहीं। Question paper <strong>English only</strong> में होता है। Exam OCET Centers पर conduct होती है as per admit card।
              </span>
            </div>
          </div>

          <Sep />

          {/* ELIGIBILITY */}
          <div className="hlp-section" id="eligibility">
            <SectionHead
              label="Who Can Apply"
              title="Eligibility Criteria 2026"
              sub="Official eligibility as per HSTES 2026 Brochure — three qualifying pathways."
            />
            <div className="hlp-elig-grid">
              {eligibility.map((e, i) => (
                <div className="hlp-elig-card" key={i}>
                  <div className="hlp-elig-icon">{e.icon}</div>
                  <div>
                    <p className="hlp-elig-title">{e.title}</p>
                    <p className="hlp-elig-desc">{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="hlp-info-alert">
              <span className="hlp-info-alert-icon">ℹ️</span>
              <span>
                कोई Minimum या Maximum age limit नहीं है। Haryana candidates को registration के लिए <strong>PPP ID (Parivar Pehchan Patra)</strong> अनिवार्य है — इससे category और annual income verify होती है।
              </span>
            </div>
          </div>

          <Sep />
          <div className="bt-scard" style={{ padding: "8px", minHeight: 0 }}>
            <AdBanner slot="8679502538" format="auto" />
          </div>

          {/* FEE */}
          <div className="hlp-section" id="fee">
            <SectionHead label="Fees" title="Registration Fee 2026" />
            <div className="hlp-card">
              <div className="hlp-card-body" style={{ padding: 0 }}>
                <table className="hlp-fee-table">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th style={{ textAlign: "center" }}>Registration Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicationFee.map((f, i) => (
                      <tr key={i}>
                        <td>{f.category}</td>
                        <td style={{ textAlign: "center" }} className="hlp-fee-val">{f.fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p style={{ fontSize: "0.76rem", color: "var(--muted)", marginTop: 8 }}>
              * Fee paid online only — Debit/Credit Card or Net Banking. Fee is non-refundable under any circumstances.
            </p>
          </div>

          <Sep />

          {/* IMPORTANT DATES */}
          <div className="hlp-section" id="dates">
            <SectionHead
              label="Schedule"
              title="Important Dates 2026 (Official)"
              sub="Official schedule from HSTES Appendix-L — visit hstes.org.in and techadmissionshry.gov.in for latest updates."
            />
            <div className="hlp-dates-list">
              {importantDates.map((d, i) => (
                <div
                  className={`hlp-date-item${d.event === "OCET-2026 Exam Date"
                    ? " hlp-date-item--warn"
                    : d.event.includes("Seat Allotment") || d.event.includes("Choice Filling")
                      ? " hlp-date-item--highlight"
                      : ""
                    }`}
                  key={i}
                >
                  <span className="hlp-date-event">{d.event}</span>
                  <span className={`hlp-date-val${d.event === "OCET-2026 Exam Date" ? " hlp-date-val--warn" : ""}`}>
                    {d.date}
                  </span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "0.73rem", color: "var(--muted)", marginTop: 8 }}>
              * Number of exam days depends on total registered candidates. Exact date will be on the admit card.
            </p>
          </div>

          <Sep />

          {/* HOW TO APPLY */}
          <div className="hlp-section" id="apply">
            <SectionHead
              label="Application Process"
              title="How to Apply Online — Step by Step"
              sub="Official process via techadmissionshry.gov.in."
            />
            <div className="hlp-steps-list">
              {onlineApplicationSteps.map((s, i) => (
                <div className="hlp-step-card" key={i}>
                  <div className="hlp-step-num">{i + 1}</div>
                  <div>
                    <p className="hlp-step-title">{s.icon} {s.title}</p>
                    <p className="hlp-step-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="hlp-info-alert">
              <span className="hlp-info-alert-icon">⚠️</span>
              <span>
                <strong>Important:</strong> Application form का printout HSTES को भेजने की जरूरत नहीं है। Haryana candidates — PPP ID के बिना registration complete नहीं होगा। Registration deadline: <strong>23 Jun 2026</strong>.
              </span>
            </div>
          </div>

          <Sep />
          <div style={{ margin: "20px 0", minHeight: 0 }}>
            <AdBanner slot="8679502538" />
          </div>

          {/* DOCUMENTS REQUIRED */}
          <div className="hlp-section" id="documents">
            <SectionHead
              label="Counselling Documents"
              title="Documents Required at Physical Reporting"
              sub="Original documents + self-attested copies mandatory at the allotted institute."
            />
            <div className="hlp-docs-list">
              {documentsRequired.map((doc, i) => (
                <div className="hlp-doc-item" key={i}>
                  <span className="hlp-doc-icon">📄</span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          <Sep />

          {/* TIE-BREAKING */}
          <div className="hlp-section" id="merit">
            <SectionHead
              label="Merit List"
              title="Tie-Breaking Rules (Official)"
              sub="If two or more candidates score equal marks in OCET-2026, rank is decided in this order:"
            />
            <div className="hlp-card">
              <div className="hlp-card-body" style={{ padding: 0 }}>
                <table className="hlp-tie-table">
                  <thead>
                    <tr>
                      <th>Priority</th>
                      <th>Condition</th>
                      <th>Resolution</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tieBreakingRules.map((r, i) => (
                      <tr key={i}>
                        <td style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, color: "var(--blue)" }}>#{r.rank}</td>
                        <td>{r.condition}</td>
                        <td style={{ fontWeight: 600 }}>{r.resolution}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="hlp-info-alert">
              <span className="hlp-info-alert-icon">💡</span>
              <span>
                <strong>Strategy tip:</strong> Tie-breaking पहले Section A (Basic Sciences / Maths) marks से होता है — इसलिए Section A पर extra focus दो।
              </span>
            </div>
          </div>

          <Sep />

          {/* RESERVATION */}
          <div className="hlp-section" id="reservation">
            <SectionHead
              label="Reservation Policy"
              title="Category-wise Reservation"
              sub="Seat allocation is as per Haryana State Reservation policy and Government norms."
            />
            <div className="hlp-card">
              <div className="hlp-card-body" style={{ padding: 0 }}>
                <table className="hlp-res-table">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Reservation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservationCategories.map((r, i) => (
                      <tr key={i}>
                        <td>{r.category}</td>
                        <td>{r.seats}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <Sep />

          {/* SYLLABUS — ALL 4 SECTIONS */}
          <div className="hlp-section" id="syllabus">
            <SectionHead
              label="What to Study"
              title="Haryana LEET Syllabus 2026 — All 4 Sections"
              sub="Section A is common for all. Sections B, C & D are branch-specific — all candidates answer all sections."
            />

            {/* Section A notice */}
            <div className="hlp-info-alert hlp-info-alert--blue" style={{ marginBottom: 14 }}>
              <span className="hlp-info-alert-icon">📌</span>
              <span>
                <strong>Section A (25 marks)</strong> — सभी candidates के लिए common और सबसे important। इसमें Maths (8Q), Physics (8Q), Chemistry (3Q), Communication Skills (3Q), General Awareness (3Q) होते हैं। यह section diploma 1st & 2nd semester level का है।
              </span>
            </div>

            <div className="hlp-syllabus-grid">
              {syllabusSummary.map((sub, i) => (
                <div className="hlp-syllabus-card" key={i}>
                  <div className="hlp-syllabus-header" style={{ background: sub.color }}>
                    <span>{sub.icon}</span>
                    <span>{sub.subject}</span>
                    <span className="hlp-syllabus-level">{sub.level}</span>
                  </div>
                  <div className="hlp-syllabus-topics">
                    {sub.topics.map((t, j) => (
                      <div className="hlp-syllabus-topic" key={j}>{t}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="hlp-info-alert" style={{ marginTop: 14 }}>
              <span className="hlp-info-alert-icon">📌</span>
              <span>
                Section A का syllabus Diploma Engineering के 1st & 2nd Semester का है। Sections B, C & D का syllabus Diploma के 3rd–6th Semester (Branch subjects) से है। NCERT Class 11–12 से मत पढ़ो — अपने Polytechnic Diploma textbooks use करो।
                Full official syllabus: <a href="https://www.hstes.org.in" target="_blank" rel="noopener noreferrer" style={{ color: "var(--blue)" }}>hstes.org.in</a>
              </span>
            </div>
          </div>

          <Sep />
          <div style={{ margin: "18px 0" }}>
            <AdBanner slot="2642577412" format="fluid" layout="in-article" />
          </div>

          {/* PREPARATION */}
          <div className="hlp-section" id="preparation">
            <SectionHead
              label="Strategy"
              title="How to Prepare for Haryana LEET 2026"
              sub="Practical tips based on official OCET exam pattern analysis and question trends."
            />
            <div className="hlp-tips-grid" style={{ marginBottom: 20 }}>
              {preparationTips.map((t, i) => (
                <div className="hlp-tip-card" key={i}>
                  <span className="hlp-tip-icon">{t.icon}</span>
                  <span>{t.tip}</span>
                </div>
              ))}
            </div>

            <p className="hlp-section-label" style={{ marginBottom: 12 }}>Recommended Daily Schedule</p>
            <div className="hlp-card" style={{ marginBottom: 14 }}>
              <div className="hlp-card-body">
                {[
                  { time: "7:00 – 8:30 AM", activity: "Section A — Maths & Physics theory (Diploma 1st–2nd Semester textbooks)", icon: "📖" },
                  { time: "9:00 – 11:00 AM", activity: "Branch subjects (Sections B/C/D) — Diploma 3rd–6th Semester notes", icon: "📚" },
                  { time: "11:30 AM – 1:00 PM", activity: "Practice MCQs — subject-wise sets on Futurely (free)", icon: "✏️" },
                  { time: "3:00 – 4:30 PM", activity: "Full 90-minute mock tests — simulate real CBT conditions, attempt ALL 90 questions", icon: "📝" },
                  { time: "5:00 – 6:30 PM", activity: "Revision — formulas, short notes, error analysis from mock tests", icon: "🔁" },
                ].map((slot, i, arr) => (
                  <div
                    className="hlp-slot"
                    key={i}
                    style={i === arr.length - 1 ? { borderBottom: "none", marginBottom: 0, paddingBottom: 0 } : {}}
                  >
                    <span className="hlp-slot-icon">{slot.icon}</span>
                    <div>
                      <p className="hlp-slot-time">{slot.time}</p>
                      <p className="hlp-slot-label">{slot.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="hlp-section-label" style={{ marginBottom: 12 }}>Recommended Books</p>
            <div className="hlp-card">
              <div className="hlp-card-body">
                {[
                  { subject: "Maths", books: "Polytechnic Diploma Maths (1st & 2nd Sem), R.D. Sharma for Algebra & Trigonometry practice" },
                  { subject: "Physics", books: "Polytechnic Diploma Physics (1st & 2nd Sem), H.C. Verma Vol 1 for concept clarity" },
                  { subject: "Chemistry", books: "Polytechnic Diploma Chemistry (1st & 2nd Sem)" },
                  { subject: "Branch", books: "HSBTE Diploma branch textbooks (3rd–6th Semester). Use diploma notes + PYQs — JEE-level books are NOT needed." },
                ].map((b, i, arr) => (
                  <div
                    key={i}
                    style={{
                      display: "flex", gap: 12, alignItems: "flex-start",
                      paddingBottom: i < arr.length - 1 ? 14 : 0,
                      marginBottom: i < arr.length - 1 ? 14 : 0,
                      borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                    }}
                  >
                    <span style={{
                      fontFamily: "Sora, sans-serif", fontSize: "0.68rem", fontWeight: 800,
                      background: "var(--blue)", color: "#fff", borderRadius: 6,
                      padding: "3px 8px", flexShrink: 0, marginTop: 2,
                    }}>
                      {b.subject}
                    </span>
                    <p style={{ fontSize: "0.84rem", color: "var(--text-2)", margin: 0, lineHeight: 1.55 }}>{b.books}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Sep />
          <div style={{ margin: "18px 0" }}>
            <AdBanner slot="5339034699" />
          </div>

          {/* FAQ */}
          <div className="hlp-section" id="faq">
            <SectionHead
              label="FAQ"
              title="Frequently Asked Questions"
              sub="Common doubts about Haryana LEET (OCET) 2026, answered based on official HSTES brochure."
            />
            {faqs.map((faq, i) => (
              <div className={"hlp-faq-item" + (openFaq === i ? " hlp-faq-item--open" : "")} key={i}>
                <button
                  className="hlp-faq-btn"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="hlp-faq-q">{faq.q}</span>
                  <span className="hlp-faq-chevron">▾</span>
                </button>
                {openFaq === i && <div className="hlp-faq-ans">{faq.a}</div>}
              </div>
            ))}
          </div>

          <Sep />

          {/* OFFICIAL STRIP */}
          <div style={{ paddingTop: 24 }}>
            <div className="hlp-official-strip">
              <div className="hlp-official-text">
                <h3>Official Websites — HSTES Haryana</h3>
                <p>Register, download admit card, check results & counselling schedule at the official portals.</p>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <a href="https://www.hstes.org.in" target="_blank" rel="noopener noreferrer" className="hlp-official-link">
                  🌐 hstes.org.in
                </a>
                <a href="https://techadmissionshry.gov.in" target="_blank" rel="noopener noreferrer" className="hlp-official-link">
                  🌐 techadmissionshry.gov.in
                </a>
              </div>
            </div>
          </div>

          {/* RELATED LINKS */}
          <div className="hlp-related-grid">
            <Link href="/resources/haryana-leet-info" className="hlp-related-link">
              <span>📗 Haryana Btech Colleges</span><span>›</span>
            </Link>
            <Link href="/exam-preparation" className="hlp-related-link">
              <span>🎯 Practice LEET MCQs Online</span><span>›</span>
            </Link>
            <Link href="/resources" className="hlp-related-link">
              <span>📚 All Resources</span><span>›</span>
            </Link>
          </div>

          <p className="hlp-disclaimer">
            All information is sourced from the official HSTES 2026 Brochure / Appendix-L and official OCET exam pattern. Always verify latest updates at{" "}
            <a href="https://www.hstes.org.in" target="_blank" rel="noopener noreferrer" style={{ color: "var(--blue)" }}>
              hstes.org.in
            </a>{" "}
            and{" "}
            <a href="https://techadmissionshry.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "var(--blue)" }}>
              techadmissionshry.gov.in
            </a>
            . Futurely is not affiliated with HSTES or the Government of Haryana.
          </p>

        </Container>
      </main>
    </>
  );
}
