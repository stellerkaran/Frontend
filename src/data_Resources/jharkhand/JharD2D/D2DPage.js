"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdBanner from "@/components/AdBanner";
import Image from "next/image";

const highlights = [
  { label: "Exam Name", value: "JCECE Lateral Entry (Engineering D2D)" },
  { label: "Conducting Body", value: "JCECEB, Jharkhand" },
  { label: "Exam Level", value: "State-Level Entrance" },
  { label: "Admission To", value: "B.Tech / B.E. 2nd Year (Direct Lateral Entry)" },
  { label: "Exam Mode", value: "Offline – OMR Based (Pen & Paper)" },
  { label: "Exam Timing", value: "10:00 AM to 12:30 PM" },
  { label: "Duration", value: "2 Hours 30 Minutes (150 Minutes)" },
  { label: "Total Questions", value: "150 MCQs" },
  { label: "Total Marks", value: "150 Marks" },
  { label: "Marking Scheme", value: "+1 for correct, –0.25 for wrong, 0 for unattempted" },
  { label: "Question Type", value: "Objective (Multiple Choice)" },
  { label: "Medium", value: "Hindi & English (Bilingual)" },
  { label: "Exam Center", value: "Ranchi District (Multiple Centers)" },
  { label: "Age Limit", value: "No Minimum / Maximum Age Limit" },
];

const subjects = [
  {
    name: "Engineering Physics",
    icon: "⚛️",
    questions: 50,
    marks: 50,
    color: "#3b82f6",
    bg: "#eff6ff",
    border: "#bfdbfe",
    level: "Diploma 1st & 2nd Semester",
  },
  {
    name: "Engineering Chemistry",
    icon: "🧪",
    questions: 50,
    marks: 50,
    color: "#10b981",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    level: "Diploma 1st & 2nd Semester",
  },
  {
    name: "Engineering Mathematics",
    icon: "📐",
    questions: 50,
    marks: 50,
    color: "#f59e0b",
    bg: "#fffbeb",
    border: "#fde68a",
    level: "Diploma 1st & 2nd Semester",
  },
];

const eligibility = [
  {
    icon: "🎓",
    title: "Diploma Holders (Engineering)",
    desc: "Must have passed minimum THREE years / TWO years (Lateral Entry) Diploma in ANY branch of Engineering & Technology with at least 45% marks (40% for reserved category candidates) from a recognised institution.",
  },
  {
    icon: "🔬",
    title: "B.Sc Graduates",
    desc: "Candidates with B.Sc Degree from a UGC-recognised University with at least 45% marks (40% for reserved category) and Mathematics as a subject in 10+2 are also eligible.",
  },
  {
    icon: "⚙️",
    title: "B.Voc / D.Voc Graduates",
    desc: "Candidates who have passed B.Voc or 3-year D.Voc stream in the same or allied sector are also eligible to apply for lateral entry admission.",
  },
  {
    icon: "📍",
    title: "Jharkhand Domicile Required",
    desc: "Only Indian citizens who are permanent/local residents of Jharkhand State can apply. A valid domicile/residential certificate issued by the competent authority of Jharkhand government is mandatory at counselling.",
  },
  {
    icon: "⏳",
    title: "Appearing Candidates",
    desc: "Candidates currently appearing in the qualifying exam may also apply, but must produce their passing certificate before the counselling/interview date, otherwise they will not be considered eligible for admission.",
  },
  {
    icon: "🔧",
    title: "Eligible Engineering Branches",
    desc: "All branches of Engineering and Technology Diploma are accepted — including CSE, Electrical, Mechanical, ECE, Civil, Chemical, Drilling Technology, and other allied engineering streams.",
  },
];

const importantDates = [
  { event: "Application Form Release", date: "19 May 2026" },
  { event: "Last Date to Apply (Online)", date: "12 June 2026" },
  { event: "Application Correction Window", date: "13 – 14 June 2026" },
  { event: "Admit Card Download", date: "4 Days Before Exam" },
  { event: "Exam Date", date: "28 June 2026 (Sunday)" },
  { event: "Exam Timing", date: "10:00 AM – 12:30 PM" },
  { event: "Exam Center", date: "Ranchi District" },
  { event: "Result Declaration", date: "July 2026 (Expected)" },
  { event: "Counselling Process", date: "End of July 2026 (Expected)" },
];

const applicationFee = [
  { category: "General / EWS / BC-I / BC-II", fee: "₹900" },
  { category: "SC / ST (All) / Female Candidates (All Categories)", fee: "₹450" },
  { category: "PwBD / Divyang Candidates (All Categories)", fee: "Exempted" },
];

const onlineApplicationSteps = [
  {
    step: "Step 1",
    title: "Registration & Form Filling",
    desc: "Visit jceceb.jharkhand.gov.in → Click 'Online Application for Engineering Entrance Competitive Examination (Lateral Entry) – 2026'. Fill Personal Details, Educational Details (Diploma Branch & Group Code), and Communication Address. Set password (8–13 characters with at least one Capital Letter, one Small Letter, and one Number).",
    icon: "📝",
  },
  {
    step: "Step 2",
    title: "Image Uploading",
    desc: "Upload scanned Colour Photo (10–100 KB, JPG/JPEG, white background, both ears visible), Signature (5–50 KB, JPG/JPEG), and Left-hand Thumb Impression (10–50 KB, JPG/JPEG). Preview and verify before proceeding.",
    icon: "📷",
  },
  {
    step: "Step 3",
    title: "Application Fee Payment",
    desc: "Pay online via Debit Card, Credit Card, Net Banking, or UPI. After successful payment, login to 'Applicant Login' and print the confirmation page. Fee is non-refundable. Do NOT send the printout to the board office.",
    icon: "💳",
  },
];

const documentsRequired = [
  "Matriculation / 10th Marksheet & Passing Certificate (original/attested)",
  "Diploma All-Year/Semester Marksheets & Passing Certificate",
  "Jharkhand Domicile / Local Resident Certificate (issued by Anchal Adhikari or District Magistrate)",
  "Caste Certificate — SC/ST/BC-I/BC-II (issued by authorised officer of Jharkhand)",
  "EWS Income & Assets Certificate (if claiming EWS reservation)",
  "PwBD / Divyang Certificate from Civil Surgeon (if applicable) + full-size photograph",
  "Admit Card of the Entrance Exam (mandatory at interview/counselling)",
  "Recent Colour Photograph, Signature & Left Thumb Impression",
];

const tieBreakingRules = [
  { rank: "1", condition: "Total marks equal", resolution: "Higher marks in Engineering Mathematics" },
  { rank: "2", condition: "Engineering Mathematics marks also equal", resolution: "Higher marks in Engineering Physics" },
  { rank: "3", condition: "Steps 1 & 2 equal", resolution: "Candidate with earlier Date of Birth" },
  { rank: "4", condition: "Steps 1, 2 & 3 equal", resolution: "Alphabetical order of first name (English)" },
];

const syllabusSummary = [
  {
    subject: "Engineering Physics",
    icon: "⚛️",
    color: "#3b82f6",
    bg: "#eff6ff",
    level: "Diploma 1st & 2nd Semester",
    topics: [
      "Units & Measurements",
      "Kinematics & Newton's Laws of Motion",
      "Angular Motion & Simple Harmonic Motion",
      "Work, Power & Energy",
      "Elasticity & Surface Tension",
      "Viscosity & Fluid Mechanics",
      "Heat, Temperature & Thermal Expansion",
      "Sound & Acoustics of Buildings",
      "Properties of Light & Optics",
      "Electrostatics & Electric Potential",
      "Modern Physics & Band Theory",
      "Photo Electricity, LASER & X-rays",
      "Nanotechnology & Non-Conventional Energy",
    ],
  },
  {
    subject: "Engineering Chemistry",
    icon: "🧪",
    color: "#10b981",
    bg: "#ecfdf5",
    level: "Diploma 1st & 2nd Semester",
    topics: [
      "Atomic Structure",
      "Electro Chemistry",
      "Water — Sources, Hardness & Treatment",
      "Metallurgy — Ore, Extraction & Alloys",
      "Corrosion — Types & Prevention Methods",
      "Atmospheric & Electrochemical Corrosion",
      "Paints & Varnishes",
      "Lubricants — Types & Properties",
      "Plastics — Thermosetting & Thermoplastic",
      "Rubber — Natural & Synthetic",
      "Insulating & Non-Metallic Materials",
      "Fuels — Classification & Properties",
      "Pollution & Environmental Chemistry",
    ],
  },
  {
    subject: "Engineering Mathematics",
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
];

const pyqPapers = [
  { year: "2026", driveUrl: "https://drive.google.com/file/d/1QijyQaxxqiUoNObpcoZmDzXY5WqsjObi/view" },
  { year: "2025", driveUrl: "https://drive.google.com/file/d/1SKd1YKnu3jCXFmhzcVsVFb9lVi2bwYnQ/view" },
  { year: "2024", driveUrl: "https://drive.google.com/file/d/1VK_1yRtZKCIUeyj8O0dxil-DvKV-z-7u/view" },
  { year: "2023", driveUrl: "https://drive.google.com/file/d/1i8EmeuA7zCCJyVCIUuFjp4HFDnnGXlQ8/view" },
  { year: "2022", driveUrl: "https://drive.google.com/file/d/1Yf9RF2bp2cw_Q3JPzrj5JwJO0R--kRKa/view" },
  { year: "2021", driveUrl: "https://drive.google.com/file/d/1-mgbElP-26lZzZ8xYl2GtWpSTBhFw-aT/view" },
];

const preparationTips = [
  { icon: "📅", tip: "Start with State Board / Polytechnic Diploma textbooks — the syllabus is exactly Diploma 1st & 2nd Semester level." },
  { icon: "📝", tip: "Solve all 5 years of PYQs thoroughly — the pattern repeats frequently and many questions are directly repeated." },
  { icon: "⏱️", tip: "Practice OMR sheets during mock tests — bubbling errors can cost you marks even if you knew the answer." },
  { icon: "🎯", tip: "Attempt easy questions first in the 2.5-hour exam; don't spend too long on a single problem." },
  { icon: "🔁", tip: "Revise formulas and short notes daily in the final 2 weeks — formula recall is key for Maths & Physics." },
  { icon: "📊", tip: "Focus extra time on Maths — tie-breaking is first decided by Maths marks, then Physics marks." },
];

const faqs = [
  {
    q: "Jharkhand D2D (JCECE LE) exam क्या है?",
    a: "Jharkhand D2D (Diploma to Degree) exam — officially JCECE Lateral Entry — JCECEB (Jharkhand Combined Entrance Competitive Examination Board) द्वारा आयोजित की जाती है। यह Diploma / B.Sc holders को Jharkhand के Government और Private Engineering Colleges में B.Tech 2nd Year in Direct Lateral Entry दिलाती है।"
  },
  {
    q: "D2D 2026 exam date और timing क्या है?",
    a: "Official notification के अनुसार, D2D 2026 exam 28 June 2026 (Sunday) को आयोजित होगी। Exam timing सुबह 10:00 AM से दोपहर 12:30 PM तक है, यानी exam की duration 2 घंटे 30 मिनट (150 minutes) है। Exam Ranchi जिले के विभिन्न exam centers पर होगी।"
  },
  {
    q: "D2D exam का syllabus क्या है?",
    a: "Official syllabus के अनुसार, इस exam में Engineering Physics, Engineering Chemistry और Engineering Mathematics (Diploma 1st & 2nd Semester level) के questions आते हैं। Physics में Units, Mechanics, Optics, Modern Physics; Chemistry में Atomic Structure, Corrosion, Water, Alloys, Plastics; Maths में Algebra, Trigonometry, Calculus और Coordinate Geometry शामिल हैं।"
  },
  {
    q: "Tie-breaking rules क्या हैं अगर दो candidates के marks equal हों?",
    a: "Tie-breaking के लिए पहले Engineering Mathematics के marks देखे जाते हैं। अगर वो भी equal हों तो Engineering Physics marks देखे जाते हैं। फिर Date of Birth (जो पहले हो) और अंत में First Name का alphabetical order (English) use होता है।"
  },
  {
    q: "क्या B.Sc और B.Voc students भी apply कर सकते हैं?",
    a: "हाँ। B.Sc graduates जिनके 10+2 में Mathematics था और Degree में minimum 45% marks हैं, वे eligible हैं। इसके अलावा B.Voc या 3-year D.Voc stream के candidates भी same or allied sector में eligible हैं — यह नया addition है 2026 में।"
  },
  {
    q: "Application fee कितनी है और कैसे जमा करें?",
    a: "General/EWS/BC-I/BC-II candidates के लिए ₹900 और SC/ST/Female/Divyang candidates के लिए ₹450 (Divyang के लिए exempted) है। Fee केवल online mode में जमा होती है — Debit Card, Credit Card, Net Banking, या UPI के through। Fee non-refundable है।"
  },
  {
    q: "Exam किस mode में होती है और negative marking है क्या?",
    a: "Exam offline mode (OMR-based, pen & paper) में होती है। Duration 2 hours 30 minutes है। सही answer पर +1 mark, गलत answer पर –0.25 mark काटे जाते हैं। Unattempted questions पर कोई mark नहीं काटा जाता।"
  },
  {
    q: "Counselling में कौन से documents चाहिए?",
    a: "Counselling में चाहिए: 10th Marksheet, Diploma All-Semester Marksheets, Jharkhand Domicile Certificate, Caste Certificate (अगर applicable हो), EWS Certificate (अगर applicable हो), Divyang Certificate (अगर applicable हो), और Entrance Exam का Admit Card। Xerox या Fax copy स्वीकार नहीं होगी — original documents + self-attested copies लेकर जाना अनिवार्य है।"
  }
];

const reservationCategories = [
  { category: "SC (Scheduled Caste)", seats: "As per Jharkhand Reservation Act" },
  { category: "ST (Scheduled Tribe)", seats: "As per Jharkhand Reservation Act" },
  { category: "BC-I / BC-II (Backward Classes)", seats: "As per Jharkhand Reservation Act" },
  { category: "EWS (Economically Weaker Section)", seats: "As per Jharkhand Govt. norms" },
  { category: "Primitive Tribal Groups (Adi Jan Jati)", seats: "Min 2% of ST reserved seats" },
  { category: "PwBD / Divyang", seats: "As per AICTE / State norms" },
];

const SectionHead = ({ label, title, sub }) => (
  <div style={{ marginBottom: 20 }}>
    <span className="d2d-section-label">{label}</span>
    <h2 className="d2d-section-title">{title}</h2>
    {sub && <p className="d2d-section-sub">{sub}</p>}
  </div>
);

const Sep = () => <div className="d2d-sep" />;

export default function D2DClient() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  return (
    <div className="w-full px-0">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes btnBorderSpin {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes d2dDlGlow {
          0%   { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }

        /* BANNER */
        .d2d-banner-overlay {
          position:fixed; inset:0; z-index:9999;
          display:flex; align-items:center; justify-content:center;
          background:rgba(0,0,0,0.65);
          backdrop-filter:blur(3px); -webkit-backdrop-filter:blur(3px);
          padding:16px; box-sizing:border-box;
          animation:d2dBannerFadeIn 0.3s ease;
        }
        @keyframes d2dBannerFadeIn { from{opacity:0;} to{opacity:1;} }
        .d2d-banner-wrapper {
          position:relative;
          width: min(340px, calc(100vw - 32px));
          aspect-ratio: 916 / 1717;
          max-height: calc(100vh - 80px);
          border-radius:14px; overflow:hidden;
          box-shadow:0 24px 60px rgba(0,0,0,0.55);
          animation:d2dBannerSlideUp 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes d2dBannerSlideUp { from{transform:translateY(40px) scale(0.96);opacity:0;} to{transform:translateY(0) scale(1);opacity:1;} }
        .d2d-banner-wrapper img { width:100%; height:100%; object-fit:cover; display:block; cursor:pointer; }
        .d2d-banner-close {
          position:absolute; top:10px; right:10px;
          width:32px; height:32px; border:none; background:transparent;
          color:#fff; font-size:22px; line-height:1;
          display:flex; align-items:center; justify-content:center;
          cursor:pointer; z-index:10; transition:opacity 0.2s;
          -webkit-tap-highlight-color:transparent;
        }
        .d2d-banner-close:hover { opacity:0.7; }

        /* PAGE */
        .d2d-page {
          --blue:      #1a56db;
          --blue-dk:   #1e429f;
          --blue-lt:   #eff6ff;
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
          background: #f3f6fb;
          min-height: 100vh;
          padding-bottom: 80px;
          overflow-x: hidden;
        }

        /* HERO */
        .d2d-hero {
          background: linear-gradient(155deg, #1e3a8a 0%, #1a56db 60%, #2563eb 100%);
          padding: 0px 16px 80px; text-align: center; position: relative; overflow: hidden;
        }
        .d2d-hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at 15% 60%, rgba(255,255,255,0.08) 0%, transparent 45%),
                      radial-gradient(circle at 85% 20%, rgba(255,255,255,0.05) 0%, transparent 40%);
          pointer-events: none;
        }
        .d2d-hero-inner { position: relative; z-index: 1; max-width: 680px; margin: 0 auto; }
        .d2d-hero h1 {
          font-family: "Sora", sans-serif;
          font-size: clamp(1.55rem, 5vw, 2.3rem);
          font-weight: 800; color: #fff; margin-bottom: 12px; margin-top: 22px;
          line-height: 1.2; letter-spacing: -0.5px;
        }
        .d2d-hero > .d2d-hero-inner > p {
          font-size: clamp(0.9rem, 2.5vw, 1rem); color: rgba(255,255,255,0.82);
          line-height: 1.75; margin: 0 auto 20px; max-width: 560px;
        }
        .d2d-hero-pills { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
        .d2d-hero-pill {
          background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.22);
          border-radius: 999px; padding: 5px 14px;
          font-size: 0.76rem; font-weight: 600; color: #fff;
        }
        .d2d-hero-pill--new {
          background: rgba(52,211,153,0.2); border-color: rgba(52,211,153,0.4); color: #6ee7b7;
        }

        /* STAT STRIP */
        .d2d-stat-strip {
          display: grid; grid-template-columns: repeat(4, 1fr);
          background: var(--surface); border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md); overflow: hidden;
          margin-top: -36px; position: relative; z-index: 2;
        }
        @media (max-width: 600px) { .d2d-stat-strip { grid-template-columns: repeat(2, 1fr); } }
        .d2d-stat {
          text-align: center; padding: 18px 10px;
          border-right: 1px solid var(--border); border-bottom: 1px solid var(--border);
        }
        .d2d-stat:nth-child(4n) { border-right: none; }
        @media (max-width: 600px) {
          .d2d-stat:nth-child(2n) { border-right: none; }
          .d2d-stat:nth-child(3), .d2d-stat:nth-child(4) { border-bottom: none; }
        }
        .d2d-stat-val {
          font-family: "Sora", sans-serif;
          font-size: clamp(1.1rem, 3vw, 1.4rem);
          font-weight: 800; color: var(--blue); line-height: 1; margin-bottom: 4px;
        }
        .d2d-stat-label { font-size: clamp(0.66rem,1.5vw,0.75rem); color: var(--muted); font-weight: 600; }

        /* SEPARATOR */
        .d2d-sep { height: 1px; background: var(--border); margin: 32px 0 0; }
        .d2d-section { padding-top: 28px; }
        .d2d-section-label {
          display: block; font-size: 0.68rem; font-weight: 800;
          letter-spacing: 1.6px; text-transform: uppercase;
          color: var(--blue); font-family: "Sora", sans-serif; margin-bottom: 5px;
        }
        .d2d-section-title {
          font-family: "Sora", sans-serif;
          font-size: clamp(1.05rem, 3.5vw, 1.35rem);
          font-weight: 800; color: var(--text); margin-bottom: 5px;
          letter-spacing: -0.3px; line-height: 1.3;
        }
        .d2d-section-sub { font-size: 0.88rem; color: var(--muted); line-height: 1.65; margin-bottom: 0; }

        /* CARD */
        .d2d-card {
          background: var(--surface); border: 1.5px solid var(--border);
          border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-xs);
        }
        .d2d-card-header {
          display: flex; align-items: center; gap: 10px;
          padding: 13px 18px; border-bottom: 1px solid var(--border);
          background: var(--surface-2);
        }
        .d2d-card-icon {
          width: 30px; height: 30px; border-radius: 8px;
          background: var(--blue-lt); display: flex; align-items: center;
          justify-content: center; font-size: 0.95rem; flex-shrink: 0;
        }
        .d2d-card-title {
          font-family: "Sora", sans-serif; font-size: 0.88rem;
          font-weight: 800; color: var(--text); margin: 0;
        }
        .d2d-card-body { padding: 18px; }

        /* HIGHLIGHTS TABLE */
        .d2d-highlights-table { width: 100%; border-collapse: collapse; }
        .d2d-highlights-table tr { border-bottom: 1px solid var(--border); }
        .d2d-highlights-table tr:last-child { border-bottom: none; }
        .d2d-highlights-table td { padding: 10px 16px; font-size: 0.85rem; line-height: 1.5; vertical-align: top; }
        .d2d-highlights-table td:first-child { font-weight: 700; color: var(--text-2); width: 42%; }
        .d2d-highlights-table td:last-child { color: var(--text); }
        @media (max-width: 400px) { .d2d-highlights-table td { padding: 9px 12px; font-size: 0.81rem; } }

        /* SUBJECTS GRID */
        .d2d-subjects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        @media (max-width: 600px) { .d2d-subjects-grid { grid-template-columns: 1fr; gap: 8px; } }
        .d2d-subject-card {
          border-radius: var(--radius-md); padding: 16px; border: 1.5px solid;
          display: flex; flex-direction: column; align-items: center; text-align: center; gap: 6px;
        }
        @media (max-width: 600px) {
          .d2d-subject-card { flex-direction: row; text-align: left; gap: 14px; padding: 13px 16px; align-items: center; }
          .d2d-subject-card-left { display: flex; align-items: center; gap: 10px; flex: 1; }
          .d2d-subject-card-right { display: flex; align-items: center; gap: 16px; flex-shrink: 0; }
        }
        @media (min-width: 601px) {
          .d2d-subject-card-left { display: contents; }
          .d2d-subject-card-right { display: contents; }
        }
        .d2d-subject-icon { font-size: 1.5rem; flex-shrink: 0; }
        .d2d-subject-name { font-family: "Sora", sans-serif; font-size: 0.88rem; font-weight: 800; }
        .d2d-subject-level { font-size: 0.72rem; color: var(--muted); font-weight: 600; margin-top: 2px; }
        .d2d-subject-stat { font-size: 0.76rem; color: var(--muted); font-weight: 600; }
        .d2d-subject-stat span { font-family: "Sora", sans-serif; font-size: 1rem; font-weight: 800; }

        /* MARKING GRID */
        .d2d-marking-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 12px; }
        .d2d-marking-card { border-radius: var(--radius-sm); padding: 14px 10px; text-align: center; border: 1.5px solid; }
        .d2d-marking-emoji { font-size: 1.1rem; margin-bottom: 4px; }
        .d2d-marking-val { font-family: "Sora", sans-serif; font-size: 1.05rem; font-weight: 800; margin-bottom: 3px; }
        .d2d-marking-label { font-size: 0.72rem; color: var(--muted); font-weight: 600; }

        /* ELIGIBILITY GRID */
        .d2d-elig-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        @media (max-width: 520px) { .d2d-elig-grid { grid-template-columns: 1fr; } }
        .d2d-elig-card {
          background: var(--surface-2); border: 1.5px solid var(--border);
          border-radius: var(--radius-md); padding: 14px 16px;
          display: flex; gap: 11px; align-items: flex-start;
        }
        .d2d-elig-icon {
          font-size: 1.1rem; flex-shrink: 0; width: 34px; height: 34px;
          background: var(--surface); border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--border);
        }
        .d2d-elig-title { font-family: "Sora", sans-serif; font-size: 0.83rem; font-weight: 700; color: var(--text); margin-bottom: 4px; }
        .d2d-elig-desc { font-size: 0.8rem; color: var(--muted); line-height: 1.6; margin: 0; }

        /* FEE TABLE */
        .d2d-fee-table { width: 100%; border-collapse: collapse; }
        .d2d-fee-table th {
          background: var(--blue); color: #fff; padding: 10px 16px;
          font-family: "Sora", sans-serif; font-size: 0.8rem; font-weight: 700; text-align: left;
        }
        .d2d-fee-table td { padding: 10px 16px; font-size: 0.85rem; border-bottom: 1px solid var(--border); color: var(--text-2); }
        .d2d-fee-table tr:last-child td { border-bottom: none; }
        .d2d-fee-table tr:nth-child(even) td { background: var(--surface-2); }
        .d2d-fee-val { font-weight: 800; font-family: "Sora", sans-serif; color: var(--blue); }

        /* DATES LIST */
        .d2d-dates-list { display: flex; flex-direction: column; gap: 7px; }
        .d2d-date-item {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; padding: 11px 16px;
          background: var(--surface-2); border: 1.5px solid var(--border);
          border-radius: var(--radius-sm);
        }
        .d2d-date-item--highlight { border-color: rgba(26,86,219,0.3); background: #eff6ff; }
        .d2d-date-event { font-size: 0.84rem; font-weight: 600; color: var(--text-2); flex: 1; min-width: 0; }
        .d2d-date-val {
          font-size: 0.78rem; font-weight: 700; font-family: "Sora", sans-serif;
          color: var(--blue); background: var(--blue-lt);
          border-radius: 999px; padding: 3px 11px; white-space: nowrap; flex-shrink: 0;
        }
        @media (max-width: 480px) { .d2d-date-item { flex-wrap: wrap; gap: 6px; } .d2d-date-event { font-size: 0.81rem; } }

        /* STEPS */
        .d2d-steps-list { display: flex; flex-direction: column; gap: 12px; }
        .d2d-step-card {
          display: flex; gap: 14px; align-items: flex-start;
          background: var(--surface); border: 1.5px solid var(--border);
          border-radius: var(--radius-md); padding: 16px;
        }
        .d2d-step-num {
          width: 36px; height: 36px; border-radius: 50%;
          background: var(--blue); color: #fff;
          font-family: "Sora", sans-serif; font-size: 0.8rem; font-weight: 800;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .d2d-step-title { font-family: "Sora", sans-serif; font-size: 0.88rem; font-weight: 700; color: var(--text); margin-bottom: 5px; }
        .d2d-step-desc { font-size: 0.82rem; color: var(--muted); line-height: 1.65; margin: 0; }

        /* DOCUMENTS LIST */
        .d2d-docs-list { display: flex; flex-direction: column; gap: 7px; }
        .d2d-doc-item {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 10px 14px; background: var(--surface-2);
          border: 1.5px solid var(--border); border-radius: var(--radius-sm);
          font-size: 0.83rem; color: var(--text-2); line-height: 1.55;
        }
        .d2d-doc-icon { flex-shrink: 0; font-size: 0.9rem; margin-top: 1px; }

        /* TIE-BREAKING TABLE */
        .d2d-tie-table { width: 100%; border-collapse: collapse; }
        .d2d-tie-table th {
          background: var(--blue); color: #fff; padding: 9px 14px;
          font-family: "Sora", sans-serif; font-size: 0.78rem; font-weight: 700; text-align: left;
        }
        .d2d-tie-table td { padding: 10px 14px; font-size: 0.82rem; border-bottom: 1px solid var(--border); color: var(--text-2); }
        .d2d-tie-table tr:last-child td { border-bottom: none; }
        .d2d-tie-table tr:nth-child(even) td { background: var(--surface-2); }

        /* RESERVATION TABLE */
        .d2d-res-table { width: 100%; border-collapse: collapse; }
        .d2d-res-table th {
          background: var(--blue); color: #fff; padding: 9px 14px;
          font-family: "Sora", sans-serif; font-size: 0.78rem; font-weight: 700; text-align: left;
        }
        .d2d-res-table td { padding: 9px 14px; font-size: 0.82rem; border-bottom: 1px solid var(--border); color: var(--text-2); }
        .d2d-res-table tr:last-child td { border-bottom: none; }
        .d2d-res-table tr:nth-child(even) td { background: var(--surface-2); }

        /* SYLLABUS */
        .d2d-syllabus-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        @media (max-width: 720px) { .d2d-syllabus-grid { grid-template-columns: 1fr; gap: 10px; } }
        .d2d-syllabus-card {
          background: var(--surface); border: 1.5px solid var(--border);
          border-radius: var(--radius-md); overflow: hidden;
        }
        .d2d-syllabus-header {
          display: flex; align-items: center; gap: 8px;
          padding: 11px 15px; font-family: "Sora", sans-serif;
          font-size: 0.88rem; font-weight: 800; color: #fff;
        }
        .d2d-syllabus-level {
          font-size: 0.68rem; background: rgba(255,255,255,0.2);
          border-radius: 999px; padding: 2px 8px; margin-left: auto; white-space: nowrap;
        }
        .d2d-syllabus-topics { padding: 10px 14px; }
        .d2d-syllabus-topic {
          display: flex; align-items: flex-start; gap: 7px;
          font-size: 0.8rem; color: var(--text-2);
          padding: 6px 0; border-bottom: 1px solid var(--border); line-height: 1.4;
        }
        .d2d-syllabus-topic:last-child { border-bottom: none; }
        .d2d-syllabus-topic::before { content: '›'; font-size: 0.85rem; font-weight: 700; flex-shrink: 0; margin-top: 1px; opacity: 0.5; }
        @media (max-width: 720px) {
          .d2d-syllabus-topics { display: grid; grid-template-columns: repeat(2, 1fr); padding: 10px 12px; gap: 0 8px; }
          .d2d-syllabus-topic { padding: 5px 2px; }
        }
        @media (max-width: 380px) { .d2d-syllabus-topics { grid-template-columns: 1fr; } }

        /* PYQ FEATURE */
        .d2d-pyq-feature {
          background: linear-gradient(140deg, #1e3a8a 0%, #1a56db 55%, #2563eb 100%);
          border-radius: var(--radius-lg); padding: 28px 24px 26px;
          position: relative; overflow: hidden;
        }
        .d2d-pyq-feature::before { content: ''; position: absolute; top: -60px; right: -60px; width: 220px; height: 220px; border-radius: 50%; background: rgba(255,255,255,0.07); pointer-events: none; }
        .d2d-pyq-feature::after { content: ''; position: absolute; bottom: -80px; left: -20px; width: 240px; height: 240px; border-radius: 50%; background: rgba(255,255,255,0.04); pointer-events: none; }
        .d2d-pyq-feature-inner { position: relative; z-index: 1; }
        .d2d-pyq-tag {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          width: fit-content; margin: 0 auto 16px auto;
          background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.28);
          border-radius: 999px; padding: 5px 14px;
          font-size: 0.75rem; font-weight: 700; color: #fff; font-family: "Sora", sans-serif;
        }
        .d2d-pyq-tag-dot { width: 7px; height: 7px; border-radius: 50%; background: #34d399; flex-shrink: 0; }
        .d2d-pyq-feature h3 {
          font-family: "Sora", sans-serif; font-size: clamp(1.1rem, 3.5vw, 1.45rem);
          font-weight: 800; color: #fff; margin-bottom: 7px; line-height: 1.25;
        }
        .d2d-pyq-feature-desc { font-size: 0.86rem; color: rgba(255,255,255,0.80); line-height: 1.65; margin-bottom: 22px; max-width: 540px; }

        .d2d-pyq-table-wrap { border-radius: 12px; overflow: hidden; border: 1px solid #c8d9f8; }
        .d2d-pyq-table { width: 100%; border-collapse: collapse; min-width: 340px; }
        .d2d-pyq-table th {
          background: #0d6efd; color: #fff; padding: 11px 16px;
          font-family: "Sora", sans-serif; font-size: 0.82rem; font-weight: 700;
          text-align: center; white-space: nowrap;
        }
        .d2d-pyq-table th:first-child { text-align: left; }
        .d2d-pyq-table td {
          background: #f9fbff; border: 1px solid #dce8ff;
          padding: 11px 16px; font-size: 0.86rem; text-align: center;
          color: #374151; vertical-align: middle;
        }
        .d2d-pyq-table tr:nth-child(even) td { background: #f0f6ff; }
        .d2d-pyq-table tr:last-child td { border-bottom: none; }
        .d2d-pyq-table td:first-child { text-align: left; font-weight: 700; }

        .d2d-dl-btn {
          position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 5px;
          background: linear-gradient(90deg, #0d6efd, #6610f2); color: #fff; border: none;
          border-radius: 8px; padding: 9px 18px; font-size: 0.82rem; font-weight: 700;
          font-family: "Sora", sans-serif; cursor: pointer; overflow: hidden; z-index: 1;
          white-space: nowrap; text-decoration: none;
        }
        .d2d-dl-btn::before {
          content: ""; position: absolute; inset: -2px; border-radius: 10px;
          background: linear-gradient(120deg, transparent, #00eaff, #6610f2, #00eaff, transparent);
          background-size: 300% 300%; animation: d2dDlGlow 2.5s linear infinite; z-index: -1;
        }
        .d2d-dl-btn::after {
          content: ""; position: absolute; inset: 2px; border-radius: 6px;
          background: linear-gradient(90deg, #0d6efd, #6610f2); z-index: -1;
        }
        .d2d-dl-btn:hover { opacity: 0.9; color: #fff; }
        .d2d-dl-btn:disabled { background: linear-gradient(90deg, #94a3b8, #64748b); cursor: not-allowed; opacity: 0.7; }
        .d2d-dl-btn:disabled::before { animation: none; background: none; }
        .d2d-dl-btn:disabled::after { background: linear-gradient(90deg, #94a3b8, #64748b); }
        @media (max-width: 480px) {
          .d2d-pyq-table th, .d2d-pyq-table td { padding: 9px 10px; font-size: 0.78rem; }
          .d2d-pyq-table th:nth-child(3), .d2d-pyq-table td:nth-child(3) { display: none; }
          .d2d-dl-btn { font-size: 0.84rem; padding: 8px 16px; }
        }

        /* PRACTICE BANNER */
        .d2d-practice-banner {
          position: relative; border-radius: var(--radius-lg); overflow: hidden;
          background: linear-gradient(140deg, #064e3b 0%, #065f46 45%, #047857 100%);
          padding: 28px 24px 26px;
        }
        .d2d-practice-banner::before { content: ''; position: absolute; top: -50px; right: -50px; width: 220px; height: 220px; border-radius: 50%; background: rgba(255,255,255,0.06); pointer-events: none; }
        .d2d-practice-banner::after { content: ''; position: absolute; bottom: -70px; left: -10px; width: 200px; height: 200px; border-radius: 50%; background: rgba(255,255,255,0.04); pointer-events: none; }
        .d2d-practice-inner { position: relative; z-index: 1; }
        .d2d-practice-banner h3 { font-family: "Sora", sans-serif; font-size: clamp(1.1rem, 3.5vw, 1.45rem); font-weight: 800; color: #fff; margin-bottom: 7px; line-height: 1.25; }
        .d2d-practice-desc { font-size: 0.86rem; color: rgba(255,255,255,0.80); line-height: 1.65; margin-bottom: 20px; max-width: 540px; }
        .d2d-practice-feats { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 22px; }
        .d2d-practice-feat {
          display: flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);
          border-radius: 8px; padding: 5px 12px;
          font-size: 0.77rem; font-weight: 600; color: rgba(255,255,255,0.92);
        }
        .d2d-pf-dot { width: 6px; height: 6px; border-radius: 50%; background: #34d399; flex-shrink: 0; }
        .d2d-practice-btns { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }

        .d2d-start-btn-wrap {
          display: inline-flex; padding: 2.5px;
          border-radius: calc(var(--radius-sm) + 2.5px);
          background: linear-gradient(270deg, #60a5fa, #a78bfa, #34d399, #fbbf24, #f472b6, #60a5fa);
          background-size: 400% 400%; animation: btnBorderSpin 3s ease infinite;
          text-decoration: none; transition: transform 0.18s, box-shadow 0.18s;
        }
        .d2d-start-btn-wrap:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.28); }
        .d2d-practice-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff; color: #065f46; border-radius: var(--radius-sm);
          padding: 12px 22px; font-size: 0.9rem; font-weight: 800;
          font-family: "Sora", sans-serif; text-decoration: none;
          transition: background 0.18s, color 0.18s;
        }
        .d2d-start-btn-wrap:hover .d2d-practice-btn-primary { background: #ecfdf5; color: #064e3b; }
        .d2d-practice-btn-secondary {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.14); border: 1.5px solid rgba(255,255,255,0.3);
          border-radius: var(--radius-sm); padding: 12px 20px;
          font-size: 0.88rem; font-weight: 700;
          font-family: "Sora", sans-serif; color: #fff; text-decoration: none;
          transition: background 0.18s;
        }
        .d2d-practice-btn-secondary:hover { background: rgba(255,255,255,0.22); color: #fff; }

        /* TIPS */
        .d2d-tips-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 9px; }
        @media (max-width: 480px) { .d2d-tips-grid { grid-template-columns: 1fr; } }
        .d2d-tip-card {
          background: var(--surface); border: 1.5px solid var(--border);
          border-radius: var(--radius-sm); padding: 13px 15px;
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 0.83rem; color: var(--text-2); line-height: 1.55;
        }
        .d2d-tip-icon { font-size: 1rem; flex-shrink: 0; margin-top: 1px; }

        /* SCHEDULE SLOTS */
        .d2d-slot { display: flex; gap: 12px; align-items: flex-start; padding-bottom: 14px; margin-bottom: 14px; border-bottom: 1px solid var(--border); }
        .d2d-slot:last-child { padding-bottom: 0; margin-bottom: 0; border-bottom: none; }
        .d2d-slot-icon { font-size: 1.05rem; flex-shrink: 0; }
        .d2d-slot-time { font-family: "Sora", sans-serif; font-size: 0.76rem; font-weight: 800; color: var(--blue); margin-bottom: 2px; }
        .d2d-slot-label { font-size: 0.84rem; color: var(--text-2); margin: 0; line-height: 1.5; }

        /* FAQ */
        .d2d-faq-item { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); margin-bottom: 7px; overflow: hidden; }
        .d2d-faq-item--open { border-color: rgba(26,86,219,0.3); }
        .d2d-faq-btn {
          width: 100%; border: none; background: transparent; text-align: left;
          display: flex; align-items: center; justify-content: space-between;
          gap: 10px; padding: 14px 18px; cursor: pointer; min-height: 50px;
          -webkit-tap-highlight-color: transparent;
        }
        .d2d-faq-q { font-family: "Sora", sans-serif; font-size: clamp(0.8rem,2vw,0.88rem); font-weight: 700; color: var(--text); line-height: 1.4; }
        .d2d-faq-chevron {
          flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%;
          background: var(--surface-2); color: var(--muted); font-size: 0.65rem;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.25s, background 0.2s, color 0.2s;
        }
        .d2d-faq-item--open .d2d-faq-chevron { transform: rotate(180deg); background: var(--blue); color: #fff; }
        .d2d-faq-ans { padding: 0 18px 14px; font-size: 0.84rem; color: var(--muted); line-height: 1.72; }
        @media (max-width: 400px) { .d2d-faq-btn { padding: 12px 14px; } .d2d-faq-ans { padding: 0 14px 12px; } }

        /* OFFICIAL STRIP */
        .d2d-official-strip {
          background: linear-gradient(135deg, var(--blue) 0%, var(--blue-dk) 100%);
          border-radius: var(--radius-md); padding: 18px 20px; color: #fff;
          display: flex; align-items: center; justify-content: space-between;
          gap: 14px; flex-wrap: wrap; box-shadow: 0 6px 20px rgba(26,86,219,0.22);
        }
        .d2d-official-text h3 { font-family: "Sora", sans-serif; font-size: 0.9rem; font-weight: 800; margin-bottom: 3px; }
        .d2d-official-text p { font-size: 0.8rem; color: rgba(255,255,255,0.75); margin: 0; }
        .d2d-official-link {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25);
          border-radius: var(--radius-sm); padding: 9px 18px;
          color: #fff; font-weight: 700; font-size: 0.82rem;
          text-decoration: none; font-family: "Sora", sans-serif;
          transition: background 0.18s; white-space: nowrap;
        }
        .d2d-official-link:hover { background: rgba(255,255,255,0.25); color: #fff; }

        /* RELATED GRID */
        .d2d-related-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 9px; margin-top: 14px; }
        @media (max-width: 480px) { .d2d-related-grid { grid-template-columns: 1fr; } }
        .d2d-related-link {
          background: var(--surface); border: 1.5px solid var(--border);
          border-radius: var(--radius-md); padding: 13px 15px;
          text-decoration: none; color: var(--text-2); font-size: 0.83rem; font-weight: 600;
          display: flex; align-items: center; justify-content: space-between; gap: 8px;
          transition: border-color 0.18s, color 0.18s; font-family: "Sora", sans-serif;
        }
        .d2d-related-link:hover { border-color: rgba(26,86,219,0.3); color: var(--blue); }
        .d2d-disclaimer { text-align: center; font-size: 0.73rem; color: var(--muted); margin-top: 18px; line-height: 1.65; padding: 0 8px; }

        /* INFO ALERT */
        .d2d-info-alert {
          display: flex; align-items: flex-start; gap: 10px;
          background: #fffbeb; border: 1.5px solid #fde68a;
          border-radius: var(--radius-sm); padding: 12px 14px;
          font-size: 0.82rem; color: #92400e; line-height: 1.6; margin-top: 10px;
        }
        .d2d-info-alert-icon { flex-shrink: 0; font-size: 1rem; }

        /* RESPONSIVE */
        @media (max-width: 480px) {
          .d2d-pyq-table-wrap { margin: 0 -16px; }
          .d2d-hero { padding: 0px 14px 68px; }
          .d2d-hero h1 { margin-top: 36px; }
          .d2d-card-body { padding: 14px; }
          .d2d-section { padding-top: 22px; }
          .d2d-official-link { width: 100%; justify-content: center; }
        }
        @media (max-width: 400px) {
          .d2d-dl-btn { font-size: 0.84rem; padding: 8px 16px; }
          .d2d-pyq-table-wrap { margin: 0 -12px; }
          .d2d-hero h1 { font-size: 1.38rem; margin-top: 36px; }
          .d2d-section-title { font-size: 1rem; }
        }
        @media (max-width: 540px) {
          .d2d-practice-btns { justify-content: center; align-items: center; }
          .d2d-start-btn-wrap, .d2d-practice-btn-secondary { margin-left: auto; margin-right: auto; }
        }
      `}} />

      {/* BANNER */}
      {showBanner && (
        <div
          className="d2d-banner-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) setShowBanner(false); }}
        >
          <div className="d2d-banner-wrapper">
            <Image width={916} height={1717}
              src="/bannerD2D.png"
              alt="Jharkhand D2D 2026 Full Test Series – Join on Futurely"
              draggable={false}
              onClick={() => { setShowBanner(false); router.push("/test-series"); }}
            />
            <button className="d2d-banner-close" onClick={() => setShowBanner(false)} aria-label="Close">✕</button>
          </div>
        </div>
      )}

      <main className="d2d-page">
        {/* HERO */}
        <div className="d2d-hero">
          <div className="d2d-hero-inner">
            <h1>Jharkhand D2D Exam 2026<br />Complete Official Guide + Free PYQ Papers</h1>
            <p>
              JCECE Lateral Entry (Engineering D2D) 2026 — official eligibility, syllabus, exam pattern, important dates,
              5 years of free PYQ papers, and 750+ MCQs to practice online — all in one place.
            </p>
            <div className="d2d-hero-pills">
              <span className="d2d-hero-pill">2h 30m Exam</span>
              <span className="d2d-hero-pill">OMR Offline</span>
              <span className="d2d-hero-pill">–0.25 Negative</span>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 980, padding: "0 14px" }} className="mx-auto">

          {/* STAT STRIP */}
          <div className="d2d-stat-strip">
            {[
              { val: "150", label: "Total Questions" },
              { val: "150", label: "Total Marks" },
              { val: "2.5h", label: "Duration" },
              { val: "28 June", label: "Exam Date 2026" },
            ].map((s, i) => (
              <div className="d2d-stat" key={i}>
                <div className="d2d-stat-val">{s.val}</div>
                <div className="d2d-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* AD — after stat strip */}
          <div style={{ margin: "20px 0", minHeight: 0 }}>
            <AdBanner slot="2434542863" />
          </div>

          {/* EXAM HIGHLIGHTS */}
          <div className="d2d-section" id="exam-info">
            <SectionHead
              label="About the Exam"
              title="Exam Highlights"
              sub="Jharkhand D2D (JCECE LE) is a state-level entrance conducted by JCECEB for direct admission to B.Tech 2nd Year (Lateral Entry)."
            />
            <div className="d2d-card">
              <div className="d2d-card-header">
                <div className="d2d-card-icon">📋</div>
                <h3 className="d2d-card-title">At a Glance — Official 2026 Data</h3>
              </div>
              <div className="d2d-card-body" style={{ padding: 0 }}>
                <table className="d2d-highlights-table">
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

          {/* EXAM PATTERN */}
          <div className="d2d-section" id="pattern">
            <SectionHead label="Exam Pattern" title="Subject-wise Distribution" sub="Based on official 2026 prospectus — each subject carries equal weightage from Diploma 1st & 2nd Semester." />
            <div className="d2d-subjects-grid" style={{ marginBottom: 12 }}>
              {subjects.map((s, i) => (
                <div className="d2d-subject-card" key={i} style={{ background: s.bg, borderColor: s.border }}>
                  <div className="d2d-subject-card-left">
                    <span className="d2d-subject-icon">{s.icon}</span>
                    <div>
                      <span className="d2d-subject-name" style={{ color: s.color }}>{s.name}</span>
                      <div className="d2d-subject-level">{s.level}</div>
                    </div>
                  </div>
                  <div className="d2d-subject-card-right">
                    <div className="d2d-subject-stat"><span style={{ color: s.color }}>{s.questions}</span> Qs</div>
                    <div className="d2d-subject-stat"><span style={{ color: s.color }}>{s.marks}</span> Marks</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="d2d-marking-grid">
              <div className="d2d-marking-card" style={{ background: "#ecfdf5", borderColor: "#6ee7b7" }}>
                <div className="d2d-marking-emoji">✅</div>
                <div className="d2d-marking-val" style={{ color: "#059669" }}>+1</div>
                <div className="d2d-marking-label">Correct Answer</div>
              </div>
              <div className="d2d-marking-card" style={{ background: "#fee2e2", borderColor: "#fca5a5" }}>
                <div className="d2d-marking-emoji">❌</div>
                <div className="d2d-marking-val" style={{ color: "#dc2626" }}>−0.25</div>
                <div className="d2d-marking-label">Wrong Answer</div>
              </div>
              <div className="d2d-marking-card" style={{ background: "#f9fafb", borderColor: "#e5e7eb" }}>
                <div className="d2d-marking-emoji">⬜</div>
                <div className="d2d-marking-val" style={{ color: "#6b7280" }}>0</div>
                <div className="d2d-marking-label">Unattempted</div>
              </div>
            </div>
            <div className="d2d-info-alert" style={{ marginTop: 12 }}>
              <span className="d2d-info-alert-icon">⚠️</span>
              <span>
                <strong>Multiple answers = Wrong answer:</strong> यदि एक question के लिए एक से अधिक विकल्प भरे जाते हैं, तो उसे गलत उत्तर माना जाएगा और –0.25 mark काटे जाएंगे।
              </span>
            </div>
          </div>

          <Sep />

          {/* ELIGIBILITY */}
          <div className="d2d-section" id="eligibility">
            <SectionHead
              label="Who Can Apply"
              title="Eligibility Criteria 2026"
              sub="Official eligibility as per JCECEB 2026 Prospectus — three qualifying pathways."
            />
            <div className="d2d-elig-grid">
              {eligibility.map((e, i) => (
                <div className="d2d-elig-card" key={i}>
                  <div className="d2d-elig-icon">{e.icon}</div>
                  <div>
                    <p className="d2d-elig-title">{e.title}</p>
                    <p className="d2d-elig-desc">{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="d2d-info-alert">
              <span className="d2d-info-alert-icon">ℹ️</span>
              <span>
                कोई Minimum या Maximum age limit नहीं है। शारीरिक रूप से अक्षम candidates को Enrollment के समय Civil Surgeon द्वारा issued Medical Certificate प्रस्तुत करना अनिवार्य है।
              </span>
            </div>
          </div>

          <Sep />

          <div className="bt-scard" style={{ padding: "8px", minHeight: 0 }}>
            <AdBanner slot="8679502538" format="auto" />
          </div>

          {/* FEE */}
          <div className="d2d-section" id="fee">
            <SectionHead label="Fees" title="Application Fee 2026" />
            <div className="d2d-card">
              <div className="d2d-card-body" style={{ padding: 0 }}>
                <table className="d2d-fee-table">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th style={{ textAlign: "center" }}>Application Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicationFee.map((f, i) => (
                      <tr key={i}>
                        <td>{f.category}</td>
                        <td style={{ textAlign: "center" }} className="d2d-fee-val">{f.fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p style={{ fontSize: "0.76rem", color: "var(--muted)", marginTop: 8 }}>
              * Fee paid online only — Debit/Credit Card, Net Banking, or UPI. Fee is non-refundable under any circumstances.
            </p>
          </div>

          <Sep />

          {/* IMPORTANT DATES */}
          <div className="d2d-section" id="dates">
            <SectionHead
              label="Schedule"
              title="Important Dates 2026"
              sub="Official dates from JCECEB 2026 notification — verify latest updates at jceceb.jharkhand.gov.in."
            />
            <div className="d2d-dates-list">
              {importantDates.map((d, i) => (
                <div
                  className={`d2d-date-item${d.event === "Exam Date" ? " d2d-date-item--highlight" : ""}`}
                  key={i}
                >
                  <span className="d2d-date-event">{d.event}</span>
                  <span className="d2d-date-val">{d.date}</span>
                </div>
              ))}
            </div>
          </div>

          <Sep />

          {/* HOW TO APPLY */}
          <div className="d2d-section" id="apply">
            <SectionHead
              label="Application Process"
              title="How to Apply Online — Step by Step"
              sub="Official 3-step process as per JCECEB 2026 Prospectus."
            />
            <div className="d2d-steps-list">
              {onlineApplicationSteps.map((s, i) => (
                <div className="d2d-step-card" key={i}>
                  <div className="d2d-step-num">{i + 1}</div>
                  <div>
                    <p className="d2d-step-title">{s.icon} {s.title}</p>
                    <p className="d2d-step-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="d2d-info-alert">
              <span className="d2d-info-alert-icon">⚠️</span>
              <span>
                <strong>Important:</strong> Application form का printout JCECEB Board Office को भेजने की कोई जरूरत नहीं है। केवल अपने पास 3-4 copies रख लें। Photo Edited नहीं होनी चाहिए अन्यथा application reject होगा।
              </span>
            </div>
          </div>

          <Sep />

          <div className="bt-scard" style={{ padding: "8px", minHeight: 0 }}>
            <AdBanner slot="3636692323" format="auto" />
          </div>

          {/* DOCUMENTS REQUIRED */}
          <div className="d2d-section" id="documents">
            <SectionHead
              label="Counselling Documents"
              title="Documents Required at Interview / Counselling"
              sub="Original documents + self-attested copies mandatory. Xerox/Fax copies alone will NOT be accepted."
            />
            <div className="d2d-docs-list">
              {documentsRequired.map((doc, i) => (
                <div className="d2d-doc-item" key={i}>
                  <span className="d2d-doc-icon">📄</span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          <Sep />

          {/* TIE-BREAKING */}
          <div className="d2d-section" id="merit">
            <SectionHead
              label="Merit List"
              title="Tie-Breaking Rules (Official)"
              sub="If two or more candidates score equal marks, the merit rank is decided in this order:"
            />
            <div className="d2d-card">
              <div className="d2d-card-body" style={{ padding: 0 }}>
                <table className="d2d-tie-table">
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
            <div className="d2d-info-alert">
              <span className="d2d-info-alert-icon">💡</span>
              <span>
                <strong>Strategy tip:</strong> Tie-breaking पहले Mathematics marks से होता है — इसलिए Maths पर extra focus do।
              </span>
            </div>
          </div>

          <Sep />

          <div className="bt-scard" style={{ padding: "8px", minHeight: 0 }}>
            <AdBanner slot="6242297060" format="auto" />
          </div>

          {/* RESERVATION */}
          <div className="d2d-section" id="reservation">
            <SectionHead
              label="Reservation Policy"
              title="Category-wise Reservation"
              sub="Seat allocation is as per Jharkhand Reservation of Vacancies and Posts Act 2001 and Jharkhand Government norms."
            />
            <div className="d2d-card">
              <div className="d2d-card-body" style={{ padding: 0 }}>
                <table className="d2d-res-table">
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
            <p style={{ fontSize: "0.76rem", color: "var(--muted)", marginTop: 8 }}>
              * ST category के अंतर्गत Adi Jan Jati (Primitive Tribal Group) के लिए न्यूनतम 2% आरक्षण ST आरक्षित सीटों में से है।
              BC-I/BC-II candidates Creamy Layer concept के तहत आरक्षण का लाभ उठाने के लिए Caste Certificate submit करना अनिवार्य है।
            </p>
          </div>

          <Sep />

          {/* SYLLABUS */}
          <div className="d2d-section" id="syllabus">
            <SectionHead
              label="What to Study"
              title="D2D Exam Syllabus 2026 (Official)"
              sub="Engineering Physics, Chemistry & Mathematics — Diploma 1st & 2nd Semester level as per JCECEB official syllabus."
            />
            <div className="d2d-syllabus-grid">
              {syllabusSummary.map((sub, i) => (
                <div className="d2d-syllabus-card" key={i}>
                  <div className="d2d-syllabus-header" style={{ background: sub.color }}>
                    <span>{sub.icon}</span>
                    <span>{sub.subject}</span>
                    <span className="d2d-syllabus-level">{sub.level}</span>
                  </div>
                  <div className="d2d-syllabus-topics">
                    {sub.topics.map((t, j) => (
                      <div className="d2d-syllabus-topic" key={j}>{t}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="d2d-info-alert">
              <span className="d2d-info-alert-icon">📌</span>
              <span>
                Syllabus Diploma Engineering के 1st & 2nd Semester का है — NCERT Class 11–12 नहीं। अपने Polytechnic Diploma textbooks से पढ़ें।
                Full official syllabus: <a href="https://jceceb.jharkhand.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "var(--blue)" }}>jceceb.jharkhand.gov.in</a>
              </span>
            </div>
          </div>

          <Sep />

          {/* AD — between syllabus and PYQ */}
          <div style={{ margin: "20px 0", minHeight: 0 }}>
            <AdBanner slot="8729236906" format="fluid" layout="in-article" />
          </div>

          {/* PYQ */}
          <div className="d2d-section" id="pyq">
            <SectionHead label="Free Question Papers" title="Jharkhand D2D Previous Year Papers (2021–2026)" />
            <div className="d2d-pyq-feature">
              <div className="d2d-pyq-feature-inner">
                <span className="d2d-pyq-tag">
                  <span className="d2d-pyq-tag-dot" />📄 Download D2D Question Paper PDF — Free
                </span>
                <h3>5 साल के Official PYQ Papers — Jharkhand D2D (Diploma to Degree)</h3>
                <p className="d2d-pyq-feature-desc">
                  D2D exam में पुराने papers से questions repeat होते हैं। 2021–2026 के सभी official question papers यहाँ download करो —
                  Engineering Physics, Chemistry और Mathematics तीनों के — completely free।
                  यह सबसे important resource है D2D crack करने के लिए।
                </p>
                <div className="d2d-pyq-table-wrap">
                  <table className="d2d-pyq-table">
                    <thead>
                      <tr>
                        <th>Year</th>
                        <th>Paper Name</th>
                        <th>Subjects</th>
                        <th>Download &amp; Preview</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pyqPapers.map((p, i) => (
                        <tr key={i}>
                          <td>
                            <strong style={{ color: "#0d6efd", fontFamily: "Sora, sans-serif", fontSize: "1rem" }}>
                              {p.year}
                            </strong>
                          </td>
                          <td>
                            <Link
                              href={`/resources/jharkhand-d2d/pdf?year=${p.year}&subject=D2D%20(Lateral%20Entry)%20Question%20Paper`}
                              style={{ color: "#0f172a", fontWeight: 600, textDecoration: "none" }}
                              className="hover:text-blue-600 transition-colors"
                            >
                              D2D Official Paper {p.year}
                            </Link>
                          </td>
                          <td style={{ color: "#64748b", fontSize: "0.78rem" }}>Eng. Phy · Chem · Maths</td>
                          <td>
                            {p.driveUrl ? (
                              <Link
                                href={`/resources/jharkhand-d2d/pdf?year=${p.year}&subject=D2D%20(Lateral%20Entry)%20Question%20Paper`}
                                className="d2d-dl-btn"
                                aria-label={`Read and Download D2D ${p.year} Question Paper PDF`}
                              >
                                📥Download PDF
                              </Link>
                            ) : (
                              <button className="d2d-dl-btn" disabled>⏳ Coming Soon</button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <Sep />

          {/* PRACTICE */}
          <div className="d2d-section" id="practice">
            <SectionHead label="Online Mock Test" title="Practice D2D Online — 750+ MCQs Free" />
            <div className="d2d-practice-banner">
              <div className="d2d-practice-inner">
                <h3>Practice Jharkhand D2D PYQs (2021–2026) Online</h3>
                <p className="d2d-practice-desc">
                  Futurely पर 2021–2026 के सभी D2D PYQ questions online attempt करो — timer के साथ, instant score के साथ,
                  और detailed solution के साथ। Subject-wise या year-wise practice करो — जैसे चाहो।
                </p>
                <div className="d2d-practice-feats">
                  {["750+ PYQ Questions", "Year-wise Sets", "Instant Solutions", "Score Tracking", "Free Forever"].map((feat, i) => (
                    <div className="d2d-practice-feat" key={i}>
                      <div className="d2d-pf-dot" />{feat}
                    </div>
                  ))}
                </div>
                <div className="d2d-practice-btns">
                  <Link href="/exam-preparation/jharkhand-d2d" className="d2d-start-btn-wrap">
                    <span className="d2d-practice-btn-primary">🚀 Start Preparation Now — Free</span>
                  </Link>
                  <Link href="/test-series" className="d2d-practice-btn-secondary">
                    📝 Full Mock Test
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Sep />



          {/* PREPARATION */}
          <div className="d2d-section" id="preparation">
            <SectionHead
              label="Strategy"
              title="How to Prepare for D2D 2026"
              sub="Practical tips based on official exam pattern analysis and previous years' question trends."
            />
            <div className="d2d-tips-grid" style={{ marginBottom: 20 }}>
              {preparationTips.map((t, i) => (
                <div className="d2d-tip-card" key={i}>
                  <span className="d2d-tip-icon">{t.icon}</span>
                  <span>{t.tip}</span>
                </div>
              ))}
            </div>

            <p className="d2d-section-label" style={{ marginBottom: 12 }}>Recommended Daily Schedule</p>
            <div className="d2d-card" style={{ marginBottom: 14 }}>
              <div className="d2d-card-body">
                {[
                  { time: "7:00 – 10:00 AM", activity: "Theory reading (Diploma Polytechnic textbooks — 1st & 2nd Semester)", icon: "📖" },
                  { time: "11:00 AM – 1:00 PM", activity: "Practice MCQs from PYQ papers (2021–2026)", icon: "✏️" },
                  { time: "2:00 – 4:00 PM", activity: "Mock tests with OMR sheet practice — timing yourself", icon: "📝" },
                  { time: "5:00 – 7:00 PM", activity: "Revision — formulas, short notes, error analysis", icon: "🔁" },
                ].map((slot, i, arr) => (
                  <div
                    className="d2d-slot"
                    key={i}
                    style={i === arr.length - 1 ? { borderBottom: "none", marginBottom: 0, paddingBottom: 0 } : {}}
                  >
                    <span className="d2d-slot-icon">{slot.icon}</span>
                    <div>
                      <p className="d2d-slot-time">{slot.time}</p>
                      <p className="d2d-slot-label">{slot.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="d2d-section-label" style={{ marginBottom: 12 }}>Recommended Books</p>
            <div className="d2d-card">
              <div className="d2d-card-body">
                {[
                  { subject: "Physics", books: "Polytechnic Diploma Physics (1st & 2nd Sem), H.C. Verma Vol 1 for concept clarity" },
                  { subject: "Chemistry", books: "Polytechnic Diploma Chemistry (1st & 2nd Sem), P. Bahadur for Physical Chemistry numericals" },
                  { subject: "Mathematics", books: "Polytechnic Diploma Maths (1st & 2nd Sem), R.D. Sharma for Algebra & Trigonometry practice" },
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

          {/* AD — before FAQ */}
          <div style={{ margin: "20px 0", minHeight: 0 }}>
            <AdBanner slot="3476532920" />
          </div>

          {/* FAQ */}
          <div className="d2d-section" id="faq">
            <SectionHead
              label="FAQ"
              title="Frequently Asked Questions"
              sub="Common doubts about Jharkhand D2D exam 2026, answered based on official prospectus."
            />
            {faqs.map((faq, i) => (
              <div className={"d2d-faq-item" + (openFaq === i ? " d2d-faq-item--open" : "")} key={i}>
                <button
                  className="d2d-faq-btn"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="d2d-faq-q">{faq.q}</span>
                  <span className="d2d-faq-chevron">▾</span>
                </button>
                {openFaq === i && <div className="d2d-faq-ans">{faq.a}</div>}
              </div>
            ))}
          </div>

          <Sep />

          {/* OFFICIAL STRIP */}
          <div style={{ paddingTop: 24 }}>
            <div className="d2d-official-strip">
              <div className="d2d-official-text">
                <h3>Official Website – JCECEB Jharkhand</h3>
                <p>Apply online, download admit card, check results & counselling schedule at the official portal.</p>
              </div>
              <a
                href="https://jceceb.jharkhand.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="d2d-official-link"
              >
                🌐 jceceb.jharkhand.gov.in
              </a>
            </div>
          </div>

          {/* RELATED LINKS */}
          <div className="d2d-related-grid">
            <Link href="/resources/jharkhand-polytechnic/exam-information" className="d2d-related-link">
              <span>📗 Jharkhand Polytechnic Guide</span><span>›</span>
            </Link>
            <Link href="/exam-preparation/jharkhand-d2d" className="d2d-related-link">
              <span>🎯 Practice D2D MCQs Online</span><span>›</span>
            </Link>
            <Link href="/exam-preparation" className="d2d-related-link">
              <span>🏛️ B.Tech Colleges in Jharkhand</span><span>›</span>
            </Link>
            <Link href="/resources" className="d2d-related-link">
              <span>📚 All Jharkhand Resources</span><span>›</span>
            </Link>
          </div>

          <p className="d2d-disclaimer">
            All information is sourced from the official JCECEB 2026 Prospectus / Marg-Nirdeshika. Always verify latest updates at{" "}
            <a
              href="https://jceceb.jharkhand.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--blue)" }}
            >
              jceceb.jharkhand.gov.in
            </a>
            . Futurely is not affiliated with JCECEB or the Government of Jharkhand.
          </p>

        </div>
      </main>
    </div>
  );
}