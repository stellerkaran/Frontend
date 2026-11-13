/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container } from "react-bootstrap";
import AdBanner from "@/components/AdBanner";
import Image from "next/image";

/* ─────────────────────────────────────────────
   STATIC DATA  — verified from official JCECEB NECE (ANM) Prospectus
───────────────────────────────────────────── */
const highlights = [
  { label: "Exam Name", value: "Nursing Entrance Competitive Examination (NECE) — ANM" },
  { label: "Conducting Body", value: "JCECEB, Jharkhand" },
  { label: "Exam Level", value: "State-Level Entrance" },
  { label: "Admission To", value: "ANM (Auxiliary Nurse Midwifery) Training Centres — Govt. & Private" },
  { label: "Course Duration", value: "2 Years (ANM Diploma)" },
  { label: "Exam Mode", value: "Offline – OMR Based (Pen & Paper)" },
  { label: "Total Questions", value: "100 MCQs" },
  { label: "Total Marks", value: "100 Marks (1 Mark Each)" },
  { label: "Marking Scheme", value: "+1 for correct, No Negative Marking for wrong/unattempted" },
  { label: "Question Type", value: "Objective (Multiple Choice) — Bilingual Hindi & English" },
  { label: "Syllabus Level", value: "Secondary / Class 10 Level (Science, Mathematics, General Knowledge)" },
  { label: "Gender Eligibility", value: "Female Candidates Only" },
  { label: "Age Limit", value: "17 – 35 years (as on 31 December 2026)" },
  { label: "Minimum Qualification", value: "Class 10 (Matriculation) Pass or Equivalent" },
];

const subjects = [
  { name: "General Science", icon: "🔬", questions: 50, marks: 50, color: "#be123c", bg: "#fff1f2", border: "#fecdd3" },
  { name: "Mathematics", icon: "📐", questions: 25, marks: 25, color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
  { name: "General Knowledge", icon: "🌐", questions: 25, marks: 25, color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
];

const eligibility = [
  {
    icon: "📘",
    title: "Class 10 Pass (Matriculation / Equivalent)",
    desc: "Candidate must have passed Class 10th or equivalent examination from a recognised Board. Appearing candidates may also apply but must produce the passing certificate before counselling.",
  },
  {
    icon: "♀️",
    title: "Female Candidates Only",
    desc: "Unlike GNM, which is open to both genders, the ANM course is open ONLY to female candidates as per JCECEB norms.",
  },
  {
    icon: "📍",
    title: "Jharkhand Domicile Required",
    desc: "Only Indian citizens who are permanent or local residents of Jharkhand State can apply. A valid domicile/residential certificate issued by Anchal Adhikari or District Magistrate of Jharkhand is mandatory at counselling.",
  },
  {
    icon: "🎂",
    title: "Age Limit — 17 to 35 Years",
    desc: "Minimum age 17 years and maximum age 35 years as on 31 December 2026 is required for ANM admission. Age relaxation may apply for reserved categories as per Jharkhand Government norms.",
  },
  {
    icon: "🏥",
    title: "Medical Fitness",
    desc: "Candidates recommended through counselling must produce a Medical Fitness Certificate issued by a Registered Medical Practitioner at the time of enrollment, otherwise admission will not be granted.",
  },
  {
    icon: "🩺",
    title: "Community-Level Health Role After Course",
    desc: "ANM-qualified candidates work as community-level health workers assisting in maternal health, immunisation, and primary healthcare at health sub-centres and rural health posts across Jharkhand.",
  },
];

const importantDates = [
  { event: "Application Form Release (Online)", date: "3rd Week of May 2026 (Tentative)", highlight: false },
  { event: "Last Date to Apply (Online)", date: "12 June 2026", highlight: false },
  { event: "Application Correction Window", date: "Announced Separately by JCECEB", highlight: false },
  { event: "Admit Card Download", date: "~22–23 July 2026 (4 Days Before Exam, Expected)", highlight: false },
  { event: "Exam Date (Expected)", date: "27 July 2026 (Monday) — Separate Time Slot from GNM", highlight: true },
  { event: "Exam Centers", date: "Ranchi, Hazaribagh, Jamshedpur, Dhanbad, Dumka, Chaibasa, Bokaro, Palamu", highlight: false },
  { event: "Result Declaration", date: "August 2026 (Expected)", highlight: false },
  { event: "Counselling Registration", date: "September 2026 (Expected)", highlight: false },
];

const applicationFee = [
  { category: "General / EWS / BC-I / BC-II", fee: "₹900" },
  { category: "SC / ST (All Categories)", fee: "₹450" },
  { category: "PwBD / Divyang Candidates (All Categories)", fee: "Exempted" },
];

const onlineApplicationSteps = [
  {
    title: "Registration & Form Filling",
    desc: "Visit anmcet.jceceb.org.in (or jceceb.jharkhand.gov.in) → Click 'Online Application for NECE (ANM) – 2026'. Fill Personal Details (Name, DOB, Category, Domicile, Aadhaar, Exam Centre Choice), Educational Details (10th Board, Year, Marks), and Communication Address. Set a strong password with at least one Capital Letter, one Small Letter & one Number.",
    icon: "📝",
  },
  {
    title: "Image Uploading",
    desc: "Upload: Colour Photo (10–100 KB, JPG/JPEG, white background, both ears visible), Signature (5–50 KB, JPG/JPEG), Left-hand Thumb Impression (10–50 KB, JPG/JPEG). Preview all images carefully before final submission — edited photographs lead to rejection.",
    icon: "📷",
  },
  {
    title: "Application Fee Payment",
    desc: "Pay online via Credit Card, Net Banking, or UPI through the payment gateway. After successful payment, login to 'Applicant Login' and print your confirmation page for personal records. Fee is non-refundable. Do NOT send printout to JCECEB board office.",
    icon: "💳",
  },
];

const documentsRequired = [
  "Class 10 / Matriculation Admit Card, Marksheet & Passing Certificate (original + self-attested copy)",
  "Jharkhand Domicile / Local Resident Certificate (issued by Anchal Adhikari / District Magistrate / Upayukt of Jharkhand)",
  "Caste Certificate — SC/ST/BC-I/BC-II (issued by authorised Jharkhand officer) — if claiming reservation",
  "EWS Income & Assets Certificate (issued by Anchal Adhikari / DM — dated within 1 year) — if claiming EWS",
  "PwBD / Divyang Certificate from District Hospital / Civil Surgeon (if applicable)",
  "Medical Fitness Certificate from a Registered Medical Practitioner",
  "NECE (ANM) 2026 Admit Card (mandatory at interview/counselling)",
  "Recent Colour Photograph, Signature & Left Thumb Impression",
  "Anti-Ragging Affidavit (as prescribed by UGC — format on JCECEB website Downloads section)",
];

const tieBreakingRules = [
  { rank: "1", condition: "Total Marks equal", resolution: "Higher marks in General Science section" },
  { rank: "2", condition: "Step 1 equal (Science same)", resolution: "Higher marks in Mathematics section" },
  { rank: "3", condition: "Steps 1 & 2 equal", resolution: "Candidate with earlier Date of Birth (older candidate)" },
  { rank: "4", condition: "Steps 1, 2 & 3 equal", resolution: "Alphabetical order of First Name (English alphabet)" },
];

const reservationCategories = [
  { category: "SC (Scheduled Caste)", detail: "As per Jharkhand Reservation Act 2001" },
  { category: "ST (Scheduled Tribe)", detail: "As per Jharkhand Reservation Act; min 2% for Adi Jan Jati within ST seats" },
  { category: "BC-I / BC-II (Backward Classes)", detail: "Non-Creamy Layer certificate mandatory; Creamy Layer candidates treated as General" },
  { category: "EWS (Economically Weaker Section)", detail: "Income < ₹8 lakh/year; certificate from DM within 1 year; all EWS seats unreserved" },
  { category: "PwBD / Divyang", detail: "Seats reserved as per Jharkhand Government norms (blindness/low vision, hearing impairment, locomotor disability ≥40%)" },
];

const syllabusSummary = [
  {
    subject: "General Science",
    icon: "🔬",
    color: "#be123c",
    level: "Secondary Level",
    topics: [
      "Physics: Measurement & Units",
      "Physics: Motion, Force & Energy",
      "Physics: Light, Heat & Electricity",
      "Chemistry: Elements, Mixtures & Compounds",
      "Chemistry: Acids, Bases and Salts",
      "Chemistry: Everyday Chemistry",
      "Biology: Human Body Systems",
      "Biology: Health, Hygiene & Nutrition",
      "Biology: Common Diseases & Immunity",
      "Biology: Reproduction & Growth",
    ],
  },
  {
    subject: "Mathematics",
    icon: "📐",
    color: "#d97706",
    level: "Secondary Level",
    topics: [
      "Number System",
      "Percentage, Ratio & Proportion",
      "Simple & Compound Interest",
      "Time, Speed and Distance",
      "Time and Work",
      "Basic Algebra — Linear Equations",
      "Mensuration — Area, Volume & Surface Area",
      "Statistics & Averages",
      "Basic Geometry",
      "Data Interpretation",
    ],
  },
  {
    subject: "General Knowledge",
    icon: "🌐",
    color: "#7c3aed",
    level: "Up to Secondary/Sr. Secondary Level",
    topics: [
      "Current Affairs — National & State",
      "Jharkhand General Knowledge",
      "Indian History — Key Events",
      "Indian Geography Basics",
      "Indian Polity & Constitution Basics",
      "Sports, Awards & Honours",
      "Government Health Schemes",
      "Basic Computer Awareness",
      "Important Days & Events",
      "Static GK — Books, Authors, Capitals",
    ],
  },
];

const pyqPapers = [
  { year: "2025", driveUrl: " https://drive.google.com/file/d/1A9t2QfgXRQ-azuZY_rHhbdlYMAUx9Etw/view"  },
  { year: "2024", driveUrl: " https://drive.google.com/file/d/178iKiDCGxDOUqqf8UBy1bWyiXdeAtd7A/view" },
  { year: "2023", driveUrl: null },
  { year: "2022", driveUrl: null },
];

const preparationTips = [
  { icon: "📅", tip: "Official syllabus ANM CET (JCECEB) portal से है — NCERT Class 9 & 10 की Science और Maths के साथ-साथ current affairs भी पढ़ो।" },
  { icon: "📝", tip: "General Science पर सबसे ज़्यादा focus करो — यह section 50 marks का है और tie-breaking में भी पहले देखा जाता है।" },
  { icon: "⏱️", tip: "Practice OMR sheets during mock tests — bubbling errors cost marks even when you know the answer।" },
  { icon: "🎯", tip: "कोई negative marking नहीं है — इसलिए हर question attempt करना फायदेमंद है, कोई भी question खाली मत छोड़ो।" },
  { icon: "🔁", tip: "General Knowledge के लिए daily current affairs और Jharkhand-specific GK पढ़ो — यह section अक्सर कम समय दिया जाता है।" },
  { icon: "📊", tip: "3 sections हैं इसलिए समय बाँटकर practice करो — General Science को सबसे ज़्यादा समय दो, फिर Maths, फिर GK।" },
];

const faqs = [
  {
    q: "Jharkhand ANM entrance exam क्या है?",
    a: "Jharkhand ANM entrance JCECEB (Jharkhand Combined Entrance Competitive Examination Board) द्वारा आयोजित Nursing Entrance Competitive Examination (NECE) का हिस्सा है। यह exam Jharkhand के Government और Private ANM Training Centres में 2-वर्षीय Diploma course में admission के लिए होती है।",
  },
  {
    q: "ANM 2026 exam date और timing क्या है?",
    a: "पिछले cycle (2025) के आधार पर, ANM entrance exam जुलाई के अंत में (expected around 27 July 2026) आयोजित होने की संभावना है। ANM और GNM exams उसी दिन अलग-अलग time slots में होती हैं। सटीक date के लिए official notification जरूर देखें।",
  },
  {
    q: "ANM exam का syllabus क्या है?",
    a: "Official syllabus के अनुसार, exam में Secondary / Class 10 level के General Science (Physics, Chemistry, Biology), Mathematics और General Knowledge के questions होते हैं। कुल 100 questions और 100 marks — Science से 50, Mathematics से 25 और General Knowledge से 25 questions।",
  },
  {
    q: "Eligibility क्या है? Minimum marks कितने चाहिए?",
    a: "Candidate को Class 10 या equivalent किसी recognised board से pass होना चाहिए। Jharkhand domicile भी अनिवार्य है। Appearing candidates भी apply कर सकते हैं लेकिन counselling से पहले passing certificate produce करना अनिवार्य होगा।",
  },
  {
    q: "क्या पुरुष candidates ANM के लिए apply कर सकते हैं?",
    a: "नहीं। GNM के विपरीत जो male और female दोनों के लिए खुला है, ANM course केवल female candidates के लिए है।",
  },
  {
    q: "Age limit क्या है?",
    a: "ANM admission के लिए minimum age 17 years और maximum age 35 years (as on 31 December 2026) निर्धारित है। Reserved categories के लिए age relaxation Jharkhand सरकार के norms के अनुसार लागू हो सकती है।",
  },
  {
    q: "Tie-breaking rules क्या हैं?",
    a: "अगर दो candidates के total marks equal हों तो पहले General Science section के marks देखे जाते हैं। अगर वो भी equal हों तो Mathematics marks। फिर Date of Birth (पहले जन्मे candidate को priority) और अंत में First Name का English alphabetical order।",
  },
  {
    q: "Exam किस mode में होती है और negative marking है क्या?",
    a: "Exam offline OMR-based mode (pen & paper) में होती है। सही answer पर +1 mark मिलता है। गलत answer या unattempted question पर कोई negative marking नहीं है — इसलिए हर question attempt करना सुरक्षित है।",
  },
  {
    q: "Application fee कितनी है?",
    a: "General/EWS/BC-I/BC-II candidates के लिए लगभग ₹900 और SC/ST candidates के लिए लगभग ₹450 (PwBD के लिए exempted) है। Fee online mode में — Credit Card, Net Banking या UPI से — जमा होती है। Fee non-refundable है। सटीक fee के लिए official notification अवश्य verify करें।",
  },
  {
    q: "ANM और GNM में क्या फर्क है?",
    a: "ANM 2-वर्षीय course है, केवल female candidates के लिए, Class 10 pass पर आधारित है, और exam में 100 questions होते हैं। GNM 3-वर्षीय course है, male और female दोनों के लिए खुला है, Class 12 (PCB+English) pass पर आधारित है, और exam में 150 questions होते हैं।",
  },
];

const SectionHead = ({ label, title, sub }) => (
  <div style={{ marginBottom: 20 }}>
    <span className="an-section-label">{label}</span>
    <h2 className="an-section-title">{title}</h2>
    {sub && <p className="an-section-sub">{sub}</p>}
  </div>
);

const Sep = () => <div className="an-sep" />;

/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
const JHANM = () => {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `

        @keyframes btnBorderSpin {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes anDlGlow {
          0%   { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }

        /* BANNER */
        .an-banner-overlay {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px);
          padding: 16px; box-sizing: border-box;
          animation: anBannerFadeIn 0.3s ease;
        }
        @keyframes anBannerFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .an-banner-wrapper {
          position: relative;
          width: min(340px, calc(100vw - 32px));
          aspect-ratio: 916 / 1717;
          max-height: calc(100vh - 80px);
          border-radius: 14px; overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,0.55);
          animation: anBannerSlideUp 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes anBannerSlideUp {
          from { transform: translateY(40px) scale(0.96); opacity: 0; }
          to   { transform: translateY(0) scale(1); opacity: 1; }
        }
        .an-banner-wrapper img { width: 100%; height: 100%; object-fit: cover; display: block; cursor: pointer; }
        .an-banner-close {
          position: absolute; top: 10px; right: 10px;
          width: 32px; height: 32px; border: none; background: transparent;
          color: #fff; font-size: 22px; line-height: 1;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 10; transition: opacity 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .an-banner-close:hover { opacity: 0.7; }

        /* PAGE */
        .an-page {
          --rose:      #1a56db;
          --rose-dk:   #1e429f;
          --rose-lt:   #eff6ff;
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
          font-family: inherit;
          background: #fbf5f6;
          min-height: 100vh;
          padding-bottom: 80px;
          overflow-x: hidden;
        }

        /* HERO */
        .an-hero {
          background: linear-gradient(155deg, #1e3a8a 0%, #1a56db 60%, #2563eb 100%);
          padding: 0px 16px 80px; text-align: center; position: relative; overflow: hidden;
        }
        .an-hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at 15% 60%, rgba(255,255,255,0.08) 0%, transparent 45%),
                      radial-gradient(circle at 85% 20%, rgba(255,255,255,0.05) 0%, transparent 40%);
          pointer-events: none;
        }
        .an-hero-inner { position: relative; z-index: 1; max-width: 680px; margin: 0 auto; }
        .an-hero h1 {
          font-family: "Sora", sans-serif; font-size: clamp(1.55rem, 5vw, 2.3rem);
          font-weight: 800; color: #fff; margin-bottom: 12px; margin-top: 22px;
          line-height: 1.2; letter-spacing: -0.5px;
        }
        .an-hero-desc {
          font-size: clamp(0.9rem, 2.5vw, 1rem); color: rgba(255,255,255,0.82);
          line-height: 1.75; margin: 0 auto 20px; max-width: 560px;
        }
        .an-hero-pills { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
        .an-hero-pill {
          background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.22);
          border-radius: 999px; padding: 5px 14px; font-size: 0.76rem; font-weight: 600; color: #fff;
        }

        /* STAT STRIP */
        .an-stat-strip {
          display: grid; grid-template-columns: repeat(4, 1fr);
          background: var(--surface); border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md); overflow: hidden; margin-top: -36px; position: relative; z-index: 2;
        }
        @media (max-width: 600px) { .an-stat-strip { grid-template-columns: repeat(2, 1fr); } }
        .an-stat { text-align: center; padding: 18px 10px; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .an-stat:nth-child(4n) { border-right: none; }
        @media (max-width: 600px) {
          .an-stat:nth-child(2n) { border-right: none; }
          .an-stat:nth-child(3), .an-stat:nth-child(4) { border-bottom: none; }
        }
        .an-stat-val { font-family: "Sora", sans-serif; font-size: clamp(1.1rem,3vw,1.4rem); font-weight: 800; color: var(--rose); line-height: 1; margin-bottom: 4px; }
        .an-stat-label { font-size: clamp(0.66rem,1.5vw,0.75rem); color: var(--muted); font-weight: 600; }

        /* LAYOUT */
        .an-sep { height: 1px; background: var(--border); margin: 32px 0 0; }
        .an-section { padding-top: 28px; }
        .an-section-label { display: block; font-size: 0.68rem; font-weight: 800; letter-spacing: 1.6px; text-transform: uppercase; color: var(--rose); font-family: "Sora", sans-serif; margin-bottom: 5px; }
        .an-section-title { font-family: "Sora", sans-serif; font-size: clamp(1.05rem,3.5vw,1.35rem); font-weight: 800; color: var(--text); margin-bottom: 5px; letter-spacing: -0.3px; line-height: 1.3; }
        .an-section-sub { font-size: 0.88rem; color: var(--muted); line-height: 1.65; margin-bottom: 0; }

        /* CARD */
        .an-card { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-xs); }
        .an-card-header { display: flex; align-items: center; gap: 10px; padding: 13px 18px; border-bottom: 1px solid var(--border); background: var(--surface-2); }
        .an-card-icon { width: 30px; height: 30px; border-radius: 8px; background: var(--rose-lt); display: flex; align-items: center; justify-content: center; font-size: 0.95rem; flex-shrink: 0; }
        .an-card-title { font-family: "Sora", sans-serif; font-size: 0.88rem; font-weight: 800; color: var(--text); margin: 0; }
        .an-card-body { padding: 18px; }

        /* HIGHLIGHTS TABLE */
        .an-highlights-table { width: 100%; border-collapse: collapse; }
        .an-highlights-table tr { border-bottom: 1px solid var(--border); }
        .an-highlights-table tr:last-child { border-bottom: none; }
        .an-highlights-table td { padding: 10px 16px; font-size: 0.85rem; line-height: 1.5; vertical-align: top; }
        .an-highlights-table td:first-child { font-weight: 700; color: var(--text-2); width: 42%; }
        .an-highlights-table td:last-child { color: var(--text); }
        @media (max-width: 400px) { .an-highlights-table td { padding: 9px 12px; font-size: 0.81rem; } }

        /* SUBJECTS */
        .an-subjects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        @media (max-width: 640px) { .an-subjects-grid { grid-template-columns: 1fr; gap: 8px; } }
        .an-subject-card { border-radius: var(--radius-md); padding: 16px; border: 1.5px solid; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 6px; }
        @media (max-width: 640px) { .an-subject-card { flex-direction: row; text-align: left; gap: 14px; padding: 13px 16px; align-items: center; } .an-subject-card-left { display: flex; align-items: center; gap: 10px; flex: 1; } .an-subject-card-right { display: flex; align-items: center; gap: 16px; flex-shrink: 0; } }
        @media (min-width: 641px) { .an-subject-card-left { display: contents; } .an-subject-card-right { display: contents; } }
        .an-subject-icon { font-size: 1.5rem; flex-shrink: 0; }
        .an-subject-name { font-family: "Sora", sans-serif; font-size: 0.88rem; font-weight: 800; }
        .an-subject-stat { font-size: 0.76rem; color: var(--muted); font-weight: 600; }
        .an-subject-stat span { font-family: "Sora", sans-serif; font-size: 1rem; font-weight: 800; }

        /* MARKING */
        .an-marking-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 12px; }
        .an-marking-card { border-radius: var(--radius-sm); padding: 14px 10px; text-align: center; border: 1.5px solid; }
        .an-marking-emoji { font-size: 1.1rem; margin-bottom: 4px; }
        .an-marking-val { font-family: "Sora", sans-serif; font-size: 1.05rem; font-weight: 800; margin-bottom: 3px; }
        .an-marking-label { font-size: 0.72rem; color: var(--muted); font-weight: 600; }

        /* ELIGIBILITY */
        .an-elig-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        @media (max-width: 520px) { .an-elig-grid { grid-template-columns: 1fr; } }
        .an-elig-card { background: var(--surface-2); border: 1.5px solid var(--border); border-radius: var(--radius-md); padding: 14px 16px; display: flex; gap: 11px; align-items: flex-start; }
        .an-elig-icon { font-size: 1.1rem; flex-shrink: 0; width: 34px; height: 34px; background: var(--surface); border-radius: 999px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); }
        .an-elig-title { font-family: "Sora", sans-serif; font-size: 0.83rem; font-weight: 700; color: var(--text); margin-bottom: 4px; }
        .an-elig-desc { font-size: 0.8rem; color: var(--muted); line-height: 1.6; margin: 0; }

        /* FEE TABLE */
        .an-fee-table { width: 100%; border-collapse: collapse; }
        .an-fee-table th { background: var(--rose); color: #fff; padding: 10px 16px; font-family: "Sora", sans-serif; font-size: 0.8rem; font-weight: 700; text-align: left; }
        .an-fee-table td { padding: 10px 16px; font-size: 0.85rem; border-bottom: 1px solid var(--border); color: var(--text-2); }
        .an-fee-table tr:last-child td { border-bottom: none; }
        .an-fee-table tr:nth-child(even) td { background: var(--surface-2); }
        .an-fee-val { font-weight: 800; font-family: "Sora", sans-serif; color: var(--rose); }

        /* DATES */
        .an-dates-list { display: flex; flex-direction: column; gap: 7px; }
        .an-date-item { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 11px 16px; background: var(--surface-2); border: 1.5px solid var(--border); border-radius: var(--radius-sm); }
        .an-date-item--highlight { border-color: rgba(190,18,60,0.3); background: #fff1f2; }
        .an-date-event { font-size: 0.84rem; font-weight: 600; color: var(--text-2); flex: 1; min-width: 0; }
        .an-date-val { font-size: 0.78rem; font-weight: 700; font-family: "Sora", sans-serif; color: var(--rose); background: var(--rose-lt); border-radius: 999px; padding: 3px 11px; white-space: nowrap; flex-shrink: 0; }
        @media (max-width: 480px) { .an-date-item { flex-wrap: wrap; gap: 6px; } .an-date-event { font-size: 0.81rem; } }

        /* STEPS */
        .an-steps-list { display: flex; flex-direction: column; gap: 12px; }
        .an-step-card { display: flex; gap: 14px; align-items: flex-start; background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); padding: 16px; }
        .an-step-num { width: 36px; height: 36px; border-radius: 50%; background: var(--rose); color: #fff; font-family: "Sora", sans-serif; font-size: 0.8rem; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .an-step-title { font-family: "Sora", sans-serif; font-size: 0.88rem; font-weight: 700; color: var(--text); margin-bottom: 5px; }
        .an-step-desc { font-size: 0.82rem; color: var(--muted); line-height: 1.65; margin: 0; }

        /* DOCUMENTS */
        .an-docs-list { display: flex; flex-direction: column; gap: 7px; }
        .an-doc-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 14px; background: var(--surface-2); border: 1.5px solid var(--border); border-radius: var(--radius-sm); font-size: 0.83rem; color: var(--text-2); line-height: 1.55; }
        .an-doc-icon { flex-shrink: 0; font-size: 0.9rem; margin-top: 1px; }

        /* TIE-BREAKING */
        .an-tie-table { width: 100%; border-collapse: collapse; }
        .an-tie-table th { background: var(--rose); color: #fff; padding: 9px 14px; font-family: "Sora", sans-serif; font-size: 0.78rem; font-weight: 700; text-align: left; }
        .an-tie-table td { padding: 10px 14px; font-size: 0.82rem; border-bottom: 1px solid var(--border); color: var(--text-2); }
        .an-tie-table tr:last-child td { border-bottom: none; }
        .an-tie-table tr:nth-child(even) td { background: var(--surface-2); }

        /* RESERVATION */
        .an-res-table { width: 100%; border-collapse: collapse; }
        .an-res-table th { background: var(--rose); color: #fff; padding: 9px 14px; font-family: "Sora", sans-serif; font-size: 0.78rem; font-weight: 700; text-align: left; }
        .an-res-table td { padding: 9px 14px; font-size: 0.82rem; border-bottom: 1px solid var(--border); color: var(--text-2); }
        .an-res-table tr:last-child td { border-bottom: none; }
        .an-res-table tr:nth-child(even) td { background: var(--surface-2); }

        /* SYLLABUS */
        .an-syllabus-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        @media (max-width: 900px) { .an-syllabus-grid { grid-template-columns: 1fr; gap: 10px; } }
        .an-syllabus-card { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); overflow: hidden; }
        .an-syllabus-header { display: flex; align-items: center; gap: 8px; padding: 11px 15px; font-family: "Sora", sans-serif; font-size: 0.88rem; font-weight: 800; color: #fff; }
        .an-syllabus-level { font-size: 0.68rem; background: rgba(255,255,255,0.2); border-radius: 999px; padding: 2px 8px; margin-left: auto; white-space: nowrap; }
        .an-syllabus-topics { padding: 10px 14px; }
        .an-syllabus-topic { display: flex; align-items: flex-start; gap: 7px; font-size: 0.8rem; color: var(--text-2); padding: 5px 0; border-bottom: 1px solid var(--border); line-height: 1.4; }
        .an-syllabus-topic:last-child { border-bottom: none; }
        .an-syllabus-topic::before { content: '›'; font-size: 0.85rem; font-weight: 700; flex-shrink: 0; margin-top: 1px; opacity: 0.5; }
        @media (max-width: 600px) { .an-syllabus-topics { display: grid; grid-template-columns: repeat(2, 1fr); padding: 10px 12px; } .an-syllabus-topic { padding: 4px 2px; } }
        @media (max-width: 380px) { .an-syllabus-topics { grid-template-columns: 1fr; } }

        /* INFO ALERT */
        .an-info-alert { display: flex; align-items: flex-start; gap: 10px; background: #fffbeb; border: 1.5px solid #fde68a; border-radius: var(--radius-sm); padding: 12px 14px; font-size: 0.82rem; color: #92400e; line-height: 1.6; margin-top: 10px; }
        .an-info-alert-icon { flex-shrink: 0; font-size: 1rem; }

        /* PYQ FEATURE */
        .an-pyq-feature { background: linear-gradient(140deg, #1e3a8a 0%, #1a56db 55%, #2563eb 100%); border-radius: var(--radius-lg); padding: 28px 24px 26px; position: relative; overflow: hidden; }
        .an-pyq-feature::before { content: ''; position: absolute; top: -60px; right: -60px; width: 220px; height: 220px; border-radius: 50%; background: rgba(255,255,255,0.07); pointer-events: none; }
        .an-pyq-feature::after  { content: ''; position: absolute; bottom: -80px; left: -20px; width: 240px; height: 240px; border-radius: 50%; background: rgba(255,255,255,0.04); pointer-events: none; }
        .an-pyq-feature-inner { position: relative; z-index: 1; }
        .an-pyq-tag { display: flex; align-items: center; justify-content: center; gap: 6px; width: fit-content; margin: 0 auto 16px auto; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.28); border-radius: 999px; padding: 5px 14px; font-size: 0.75rem; font-weight: 700; color: #fff; font-family: "Sora", sans-serif; }
        .an-pyq-tag-dot { width: 7px; height: 7px; border-radius: 50%; background: #34d399; flex-shrink: 0; }
        .an-pyq-feature h3 { font-family: "Sora", sans-serif; font-size: clamp(1.1rem, 3.5vw, 1.45rem); font-weight: 800; color: #fff; margin-bottom: 7px; line-height: 1.25; }
        .an-pyq-feature-desc { font-size: 0.86rem; color: rgba(255,255,255,0.80); line-height: 1.65; margin-bottom: 22px; max-width: 540px; }

        /* PYQ TABLE */
        .an-pyq-table-wrap { border-radius: 12px; overflow: hidden; border: 1px solid #bfdbfe; }
        .an-pyq-table { width: 100%; border-collapse: collapse; min-width: 340px; }
        .an-pyq-table th { background: #0d6efd; color: #fff; padding: 11px 16px; font-family: inherit; font-size: 0.82rem; font-weight: 700; text-align: center; white-space: nowrap; }
        .an-pyq-table th:first-child { text-align: left; }
        .an-pyq-table td { background: #f9fbff; border: 1px solid #dce8ff; padding: 11px 16px; font-size: 0.86rem; text-align: center; color: #374151; vertical-align: middle; }
        .an-pyq-table tr:nth-child(even) td { background: #f0f6ff; }
        .an-pyq-table tr:last-child td { border-bottom: none; }
        .an-pyq-table td:first-child { text-align: left; font-weight: 700; }

        /* DOWNLOAD BUTTON */
        .an-dl-btn { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 5px; background: linear-gradient(90deg, #0d6efd, #6610f2); color: #fff; border: none; border-radius: 8px; padding: 9px 18px; font-size: 0.82rem; font-weight: 700; font-family: "Sora", sans-serif; cursor: pointer; overflow: hidden; z-index: 1; white-space: nowrap; text-decoration: none; }
        .an-dl-btn::before { content: ""; position: absolute; inset: -2px; border-radius: 10px; background: linear-gradient(120deg, transparent, #00eaff, #6610f2, #00eaff, transparent); background-size: 300% 300%; animation: anDlGlow 2.5s linear infinite; z-index: -1; }
        .an-dl-btn::after { content: ""; position: absolute; inset: 2px; border-radius: 6px; background: linear-gradient(90deg, #0d6efd, #6610f2); z-index: -1; }
        .an-dl-btn:hover { opacity: 0.9; color: #fff; }
        .an-dl-btn:disabled { background: linear-gradient(90deg, #94a3b8, #64748b); cursor: not-allowed; opacity: 0.7; }
        .an-dl-btn:disabled::before { animation: none; background: none; }
        .an-dl-btn:disabled::after { background: linear-gradient(90deg, #94a3b8, #64748b); }
        @media (max-width: 480px) { .an-pyq-table th, .an-pyq-table td { padding: 9px 10px; font-size: 0.78rem; } .an-pyq-table th:nth-child(3), .an-pyq-table td:nth-child(3) { display: none; } .an-dl-btn { font-size: 0.84rem; padding: 8px 16px; } }

        /* PRACTICE BANNER */
        .an-practice-banner { position: relative; border-radius: var(--radius-lg); overflow: hidden; background: linear-gradient(140deg, #1e3a8a 0%, #1d4ed8 45%, #2563eb 100%); padding: 28px 24px 26px; }
        .an-practice-banner::before { content: ''; position: absolute; top: -50px; right: -50px; width: 220px; height: 220px; border-radius: 50%; background: rgba(255,255,255,0.06); pointer-events: none; }
        .an-practice-banner::after  { content: ''; position: absolute; bottom: -70px; left: -10px; width: 200px; height: 200px; border-radius: 50%; background: rgba(255,255,255,0.04); pointer-events: none; }
        .an-practice-inner { position: relative; z-index: 1; }
        .an-practice-banner h3 { font-family: "Sora", sans-serif; font-size: clamp(1.1rem, 3.5vw, 1.45rem); font-weight: 800; color: #fff; margin-bottom: 7px; line-height: 1.25; }
        .an-practice-desc { font-size: 0.86rem; color: rgba(255,255,255,0.80); line-height: 1.65; margin-bottom: 20px; max-width: 540px; }
        .an-practice-feats { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 22px; }
        .an-practice-feat { display: flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; padding: 5px 12px; font-size: 0.77rem; font-weight: 600; color: rgba(255,255,255,0.92); }
        .an-pf-dot { width: 6px; height: 6px; border-radius: 50%; background: #34d399; flex-shrink: 0; }
        .an-practice-btns { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }

        /* ANIMATED BUTTON */
        .an-start-btn-wrap { display: inline-flex; padding: 2.5px; border-radius: calc(var(--radius-sm) + 2.5px); background: linear-gradient(270deg, #60a5fa, #a78bfa, #34d399, #fbbf24, #f472b6, #60a5fa); background-size: 400% 400%; animation: btnBorderSpin 3s ease infinite; text-decoration: none; transition: transform 0.18s, box-shadow 0.18s; }
        .an-start-btn-wrap:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.28); }
        .an-practice-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: #fff; color: #1e3a8a; border-radius: var(--radius-sm); padding: 12px 22px; font-size: 0.9rem; font-weight: 800; font-family: "Sora", sans-serif; text-decoration: none; transition: background 0.18s, color 0.18s; }
        .an-start-btn-wrap:hover .an-practice-btn-primary { background: #eff6ff; color: #1e293b; }
        .an-practice-btn-secondary { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.14); border: 1.5px solid rgba(255,255,255,0.3); border-radius: var(--radius-sm); padding: 12px 20px; font-size: 0.88rem; font-weight: 700; font-family: "Sora", sans-serif; color: #fff; text-decoration: none; transition: background 0.18s; }
        .an-practice-btn-secondary:hover { background: rgba(255,255,255,0.22); color: #fff; }

        /* TIPS */
        .an-tips-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 9px; }
        @media (max-width: 480px) { .an-tips-grid { grid-template-columns: 1fr; } }
        .an-tip-card { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-sm); padding: 13px 15px; display: flex; align-items: flex-start; gap: 10px; font-size: 0.83rem; color: var(--text-2); line-height: 1.55; }
        .an-tip-icon { font-size: 1rem; flex-shrink: 0; margin-top: 1px; }

        /* SCHEDULE SLOTS */
        .an-slot { display: flex; gap: 12px; align-items: flex-start; padding-bottom: 14px; margin-bottom: 14px; border-bottom: 1px solid var(--border); }
        .an-slot:last-child { padding-bottom: 0; margin-bottom: 0; border-bottom: none; }
        .an-slot-icon { font-size: 1.05rem; flex-shrink: 0; }
        .an-slot-time { font-family: "Sora", sans-serif; font-size: 0.76rem; font-weight: 800; color: var(--rose); margin-bottom: 2px; }
        .an-slot-label { font-size: 0.84rem; color: var(--text-2); margin: 0; line-height: 1.5; }

        /* FAQ */
        .an-faq-item { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); margin-bottom: 7px; overflow: hidden; }
        .an-faq-item--open { border-color: rgba(190,18,60,0.3); }
        .an-faq-btn { width: 100%; border: none; background: transparent; text-align: left; display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 14px 18px; cursor: pointer; min-height: 50px; -webkit-tap-highlight-color: transparent; }
        .an-faq-q { font-family: "Sora", sans-serif; font-size: clamp(0.8rem,2vw,0.88rem); font-weight: 700; color: var(--text); line-height: 1.4; }
        .an-faq-chevron { flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%; background: var(--surface-2); color: var(--muted); font-size: 0.65rem; display: flex; align-items: center; justify-content: center; transition: transform 0.25s, background 0.2s, color 0.2s; }
        .an-faq-item--open .an-faq-chevron { transform: rotate(180deg); background: var(--rose); color: #fff; }
        .an-faq-ans { padding: 0 18px 14px; font-size: 0.84rem; color: var(--muted); line-height: 1.72; }
        @media (max-width: 400px) { .an-faq-btn { padding: 12px 14px; } .an-faq-ans { padding: 0 14px 12px; } }

        
        /* OFFICIAL STRIP */
        .an-official-strip { background: linear-gradient(135deg, var(--rose) 0%, var(--rose-dk) 100%); border-radius: var(--radius-md); padding: 18px 20px; color: #fff; display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; box-shadow: 0 6px 20px rgba(190,18,60,0.22); }
        .an-official-text h3 { font-family: "Sora", sans-serif; font-size: 0.9rem; font-weight: 800; margin-bottom: 3px; }
        .an-official-text p { font-size: 0.8rem; color: rgba(255,255,255,0.75); margin: 0; }
        .an-official-link { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); border-radius: var(--radius-sm); padding: 9px 18px; color: #fff; font-weight: 700; font-size: 0.82rem; text-decoration: none; font-family: "Sora", sans-serif; transition: background 0.18s; white-space: nowrap; }
        .an-official-link:hover { background: rgba(255,255,255,0.25); color: #fff; }

        /* RELATED */
        .an-related-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 9px; margin-top: 14px; }
        @media (max-width: 480px) { .an-related-grid { grid-template-columns: 1fr; } }
        .an-related-link { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); padding: 13px 15px; text-decoration: none; color: var(--text-2); font-size: 0.83rem; font-weight: 600; display: flex; align-items: center; justify-content: space-between; gap: 8px; transition: border-color 0.18s, color 0.18s; font-family: "Sora", sans-serif; }
        .an-related-link:hover { border-color: rgba(190,18,60,0.3); color: var(--rose); }
        .an-disclaimer { text-align: center; font-size: 0.73rem; color: var(--muted); margin-top: 18px; line-height: 1.65; padding: 0 8px; }

        /* RESPONSIVE */
        @media (max-width: 480px) { .an-pyq-table-wrap { margin: 0 -16px; } .an-hero { padding: 0px 14px 68px; } .an-hero h1 { margin-top: 36px; } .an-card-body { padding: 14px; } .an-section { padding-top: 22px; } .an-official-link { width: 100%; justify-content: center; } }
        @media (max-width: 400px) { .an-dl-btn { font-size: 0.84rem; padding: 8px 16px; } .an-pyq-table-wrap { margin: 0 -12px; } .an-hero h1 { font-size: 1.38rem; margin-top: 36px; } .an-section-title { font-size: 1rem; } }
        @media (max-width: 540px) { .an-practice-btns { justify-content: center; align-items: center; } .an-start-btn-wrap, .an-practice-btn-secondary { margin-left: auto; margin-right: auto; } }
      ` }} />

      {/* BANNER */}
      {showBanner && (
        <div className="an-banner-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowBanner(false); }}>
          <div className="an-banner-wrapper">
            <Image width={916} height={1717}
              src="/bannerANM.png"
              alt="Jharkhand ANM 2026 Full Test Series – Join on Futurely"
              draggable={false} loading="lazy" onClick={() => { setShowBanner(false); router.push("/test-series"); }}
            />
            <button className="an-banner-close" onClick={() => setShowBanner(false)} aria-label="Close advertisement">✕</button>
          </div>
        </div>
      )}

      <main className="an-page">

        {/* HERO */}
        <div className="an-hero">
          <div className="an-hero-inner">
            <h1>Jharkhand ANM Exam 2026<br />Complete Official Guide + Free PYQ Papers</h1>
            <p className="an-hero-desc">
              JCECEB NECE (ANM) 2026 — eligibility, Class 10 level syllabus, exam pattern, important dates,
              free PYQ papers, and MCQs to practice online — all in one place.
            </p>
            <div className="an-hero-pills">
              <span className="an-hero-pill">100 MCQs</span>
              <span className="an-hero-pill">OMR Offline</span>
              <span className="an-hero-pill">No Negative Marking</span>
            </div>
          </div>
        </div>

       <Container style={{ maxWidth: 980, padding: "0 14px", margin: "0 auto" }}>

          {/* STAT STRIP */}
          <div className="an-stat-strip">
            {[
              { val: "100", label: "Total Questions" },
              { val: "100", label: "Total Marks" },
              { val: "3", label: "Sections" },
              { val: "27 July", label: "Exam Date 2026 (Exp.)" },
            ].map((s, i) => (
              <div className="an-stat" key={i}>
                <div className="an-stat-val">{s.val}</div>
                <div className="an-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          {/* AD — after stat strip */}
          <div style={{ margin: "20px 0", minHeight: 0 }}>
            <AdBanner slot="2434542863" />
          </div>

          {/* 1. HIGHLIGHTS */}
          <div className="an-section" id="exam-info">
            <SectionHead
              label="About the Exam"
              title="Exam Highlights"
              sub="Jharkhand ANM entrance (NECE) is a state-level exam conducted by JCECEB for admission to ANM (Auxiliary Nurse Midwifery) Training Centres across Jharkhand."
            />
            <div className="an-card">
              <div className="an-card-header"><div className="an-card-icon">📋</div><h3 className="an-card-title">At a Glance — Official 2026 Data</h3></div>
              <div className="an-card-body" style={{ padding: 0 }}>
                <table className="an-highlights-table">
                  <tbody>{highlights.map((h, i) => <tr key={i}><td>{h.label}</td><td>{h.value}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
          </div>
          <Sep />

          {/* 2. PATTERN */}
          <div className="an-section" id="pattern">
            <SectionHead label="Exam Pattern" title="Section-wise Distribution" sub="The paper has 3 sections — General Science carries the highest weightage, followed by Mathematics and General Knowledge." />
            <div className="an-subjects-grid" style={{ marginBottom: 12 }}>
              {subjects.map((s, i) => (
                <div className="an-subject-card" key={i} style={{ background: s.bg, borderColor: s.border }}>
                  <div className="an-subject-card-left">
                    <span className="an-subject-icon">{s.icon}</span>
                    <span className="an-subject-name" style={{ color: s.color }}>{s.name}</span>
                  </div>
                  <div className="an-subject-card-right">
                    <div className="an-subject-stat"><span style={{ color: s.color }}>{s.questions}</span> Qs</div>
                    <div className="an-subject-stat"><span style={{ color: s.color }}>{s.marks}</span> Marks</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="an-marking-grid">
              <div className="an-marking-card" style={{ background: "#ecfdf5", borderColor: "#6ee7b7" }}><div className="an-marking-emoji">✅</div><div className="an-marking-val" style={{ color: "#059669" }}>+1</div><div className="an-marking-label">Correct Answer</div></div>
              <div className="an-marking-card" style={{ background: "#f9fafb", borderColor: "#e5e7eb" }}><div className="an-marking-emoji">⬜</div><div className="an-marking-val" style={{ color: "#6b7280" }}>0</div><div className="an-marking-label">Wrong Answer</div></div>
              <div className="an-marking-card" style={{ background: "#f9fafb", borderColor: "#e5e7eb" }}><div className="an-marking-emoji">⬜</div><div className="an-marking-val" style={{ color: "#6b7280" }}>0</div><div className="an-marking-label">Unattempted</div></div>
            </div>
            <div className="an-info-alert">
              <span className="an-info-alert-icon">💡</span>
              <span><strong>No Negative Marking:</strong> गलत answer या unattempted question — दोनों पर कोई marks नहीं कटते, इसलिए हर question attempt करना फायदेमंद है।</span>
            </div>
          </div>
          <Sep />

          {/* 3. ELIGIBILITY */}
          <div className="an-section" id="eligibility">
            <SectionHead label="Who Can Apply" title="Eligibility Criteria 2026" sub="Official eligibility as per JCECEB NECE (ANM) 2026 Prospectus." />
            <div className="an-elig-grid">
              {eligibility.map((e, i) => (
                <div className="an-elig-card" key={i}>
                  <div className="an-elig-icon">{e.icon}</div>
                  <div><p className="an-elig-title">{e.title}</p><p className="an-elig-desc">{e.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
          <Sep />
          <div className="bt-scard" style={{ padding: "8px", minHeight: 0 }}>
            <AdBanner slot="8679502538" format="auto" />
          </div>

          {/* 4. FEE */}
          <div className="an-section" id="fee">
            <SectionHead label="Fees" title="Application Fee 2026" />
            <div className="an-card">
              <div className="an-card-body" style={{ padding: 0 }}>
                <table className="an-fee-table">
                  <thead><tr><th>Category</th><th style={{ textAlign: "center" }}>Application Fee</th></tr></thead>
                  <tbody>{applicationFee.map((f, i) => <tr key={i}><td>{f.category}</td><td style={{ textAlign: "center" }} className="an-fee-val">{f.fee}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
            <p style={{ fontSize: "0.76rem", color: "var(--muted)", marginTop: 8 }}>
              * Paid online only via Credit Card, Net Banking or UPI. Fee is non-refundable under any circumstances. Always verify the exact fee from the official notification.
            </p>
          </div>
          <Sep />

          {/* 5. DATES */}
          <div className="an-section" id="dates">
            <SectionHead
              label="Schedule"
              title="Important Dates 2026"
              sub="Dates based on the JCECEB NECE 2026 cycle and previous year's (2025) pattern. Always verify latest updates at jceceb.jharkhand.gov.in."
            />
            <div className="an-dates-list">
              {importantDates.map((d, i) => (
                <div className={`an-date-item${d.highlight ? " an-date-item--highlight" : ""}`} key={i}>
                  <span className="an-date-event">{d.event}</span>
                  <span className="an-date-val">{d.date}</span>
                </div>
              ))}
            </div>
          </div>
          <Sep />

          {/* 6. HOW TO APPLY */}
          <div className="an-section" id="apply">
            <SectionHead
              label="Application Process"
              title="How to Apply Online — Step by Step"
              sub="Official 3-step online application process as per JCECEB NECE (ANM) 2026 Prospectus."
            />
            <div className="an-steps-list">
              {onlineApplicationSteps.map((s, i) => (
                <div className="an-step-card" key={i}>
                  <div className="an-step-num">{i + 1}</div>
                  <div>
                    <p className="an-step-title">{s.icon} {s.title}</p>
                    <p className="an-step-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="an-info-alert">
              <span className="an-info-alert-icon">⚠️</span>
              <span>
                <strong>Important:</strong> Application form का printout JCECEB Board Office को भेजने की जरूरत नहीं है। 3-4 copies अपने पास रखें।
                Photo Edited नहीं होनी चाहिए — Edited photo पर application reject होगा।
              </span>
            </div>
          </div>
          <Sep />

          <div className="bt-scard" style={{ padding: "8px", minHeight: 0 }}>
            <AdBanner slot="3636692323" format="auto" />
          </div>

          {/* 7. DOCUMENTS */}
          <div className="an-section" id="documents">
            <SectionHead
              label="Counselling Documents"
              title="Documents Required at Interview / Counselling"
              sub="Original documents + self-attested copies mandatory. Xerox/Fax copies alone will NOT be accepted."
            />
            <div className="an-docs-list">
              {documentsRequired.map((doc, i) => (
                <div className="an-doc-item" key={i}>
                  <span className="an-doc-icon">📄</span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>
          <Sep />

          {/* 8. TIE-BREAKING */}
          <div className="an-section" id="merit">
            <SectionHead
              label="Merit List"
              title="Tie-Breaking Rules (Official)"
              sub="If two or more candidates score equal marks, the merit rank is decided in this order as per the JCECEB NECE (ANM) Prospectus:"
            />
            <div className="an-card">
              <div className="an-card-body" style={{ padding: 0 }}>
                <table className="an-tie-table">
                  <thead>
                    <tr><th>Priority</th><th>Condition</th><th>Resolution</th></tr>
                  </thead>
                  <tbody>
                    {tieBreakingRules.map((r, i) => (
                      <tr key={i}>
                        <td style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, color: "var(--rose)" }}>#{r.rank}</td>
                        <td>{r.condition}</td>
                        <td style={{ fontWeight: 600 }}>{r.resolution}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="an-info-alert">
              <span className="an-info-alert-icon">💡</span>
              <span><strong>Strategy tip:</strong> Tie-breaking पहले General Science marks से होता है — इसलिए Science section पर extra focus दो।</span>
            </div>
          </div>
          <Sep />
          <div className="bt-scard" style={{ padding: "8px", minHeight: 0 }}>
            <AdBanner slot="6242297060" format="auto" />
          </div>

          {/* 9. RESERVATION */}
          <div className="an-section" id="reservation">
            <SectionHead
              label="Reservation Policy"
              title="Category-wise Reservation"
              sub="Seat allocation as per Jharkhand Reservation Act 2001 and JCECEB NECE (ANM) 2026 Prospectus."
            />
            <div className="an-card">
              <div className="an-card-body" style={{ padding: 0 }}>
                <table className="an-res-table">
                  <thead><tr><th>Category / Quota</th><th>Details</th></tr></thead>
                  <tbody>
                    {reservationCategories.map((r, i) => (
                      <tr key={i}><td style={{ fontWeight: 700 }}>{r.category}</td><td>{r.detail}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p style={{ fontSize: "0.76rem", color: "var(--muted)", marginTop: 8 }}>
              * EWS seats are unreserved (merit-based). Always verify latest reservation policy from the official notification.
            </p>
          </div>
          <Sep />

          {/* 10. SYLLABUS */}
          <div className="an-section" id="syllabus">
            <SectionHead
              label="What to Study"
              title="ANM Exam Syllabus 2026 (Official)"
              sub="Secondary (Class 10) level — General Science, Mathematics & General Knowledge as per NCERT and Jharkhand State Board."
            />
            <div className="an-syllabus-grid">
              {syllabusSummary.map((sub, i) => (
                <div className="an-syllabus-card" key={i}>
                  <div className="an-syllabus-header" style={{ background: sub.color }}>
                    <span>{sub.icon}</span>
                    <span>{sub.subject}</span>
                    <span className="an-syllabus-level">{sub.level}</span>
                  </div>
                  <div className="an-syllabus-topics">
                    {sub.topics.map((t, j) => <div className="an-syllabus-topic" key={j}>{t}</div>)}
                  </div>
                </div>
              ))}
            </div>
            <div className="an-info-alert">
              <span className="an-info-alert-icon">📌</span>
              <span>
                यह syllabus JCECEB official portal (anmcet.jceceb.org.in) से लिया गया है। Topics Class 10 के आसपास रहते हैं —
                इसलिए NCERT के साथ-साथ current affairs भी daily basis पर पढ़ो।
              </span>
            </div>
          </div>
          <Sep />
          {/* AD — between syllabus and PYQ */}
          <div style={{ margin: "20px 0", minHeight: 0 }}>
            <AdBanner slot="8729236906" format="fluid" layout="in-article" />
          </div>

          {/* 11. PYQ */}
          <div className="an-section" id="pyq">
            <SectionHead label="Previous Year Papers" title="Jharkhand ANM PYQ Papers" />
            <div className="an-pyq-feature">
              <div className="an-pyq-feature-inner">
                <span className="an-pyq-tag"><span className="an-pyq-tag-dot" />📄 Download ANM Question Paper PDF — Free</span>
                <h3>Official PYQ Papers — Jharkhand ANM Entrance (NECE)</h3>
                <p className="an-pyq-feature-desc">
                  ANM exam में पुराने papers से questions repeat होते हैं। जैसे ही official papers उपलब्ध होंगे,
                  General Science, Mathematics और General Knowledge — सभी section के papers यहाँ free download के लिए मिलेंगे।
                </p>
                <div className="an-pyq-table-wrap">
                  <table className="an-pyq-table">
                    <thead><tr><th>Year</th><th>Paper Name</th><th>Sections</th><th>Download</th></tr></thead>
                    <tbody>
                      {pyqPapers.map((p, i) => (
                        <tr key={i}>
                          <td><strong style={{ color: "#be123c", fontFamily: "Sora, sans-serif", fontSize: "1rem" }}>{p.year}</strong></td>
                          <td>
                            <Link
                              href={`/resources/jharkhand-nursing/anm/pdf?year=${p.year}&subject=ANM%20Question%20Paper`}
                              style={{ color: "#0f172a", fontWeight: 600, textDecoration: "none" }}
                              className="hover:text-rose-600 transition-colors"
                            >
                              ANM NECE {p.year}
                            </Link>
                          </td>
                          <td style={{ color: "#64748b", fontSize: "0.78rem" }}>Science · Maths · GK</td>
                          <td>
                            {p.driveUrl ? (
                              <Link
                                href={`/resources/jharkhand-nursing/anm/pdf?year=${p.year}&subject=ANM%20Question%20Paper`}
                                className="an-dl-btn"
                                aria-label={`Read and Download Jharkhand ANM ${p.year} Question Paper PDF`}
                              >
                                📥 Download PDF
                              </Link>
                            ) : (
                              <button className="an-dl-btn" disabled>⏳ Coming Soon</button>
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

          {/* 12. PRACTICE */}
          <div className="an-section" id="practice">
            <SectionHead label="Online Mock Test" title="Practice ANM Online — Free MCQs" />
            <div className="an-practice-banner">
              <div className="an-practice-inner">
                <h3>Practice Jharkhand ANM Questions Online</h3>
                <p className="an-practice-desc">
                  Futurely पर Jharkhand ANM MCQs online attempt करो — timer के साथ, instant score के साथ,
                  और detailed solution के साथ। Section-wise practice करो — जैसे चाहो।
                </p>
                <div className="an-practice-feats">
                  {["Section-wise Practice", "Instant Solutions", "Score Tracking", "Free Forever"].map((feat, i) => (
                    <div className="an-practice-feat" key={i}><div className="an-pf-dot" />{feat}</div>
                  ))}
                </div>
                <div className="an-practice-btns">
                  <Link href="/exam-preparation/jharkhand-anm" className="an-start-btn-wrap">
                    <span className="an-practice-btn-primary">🚀 Start Preparation Now — Free</span>
                  </Link>
                  <Link href="/test-series" className="an-practice-btn-secondary">📝 Full Mock Test</Link>
                </div>
              </div>
            </div>
          </div>
          <Sep />



          {/* 13. TIPS */}
          <div className="an-section" id="preparation">
            <SectionHead label="Strategy" title="How to Prepare for ANM 2026" sub="Practical tips based on official exam pattern and syllabus." />
            <div className="an-tips-grid" style={{ marginBottom: 20 }}>
              {preparationTips.map((t, i) => (
                <div className="an-tip-card" key={i}><span className="an-tip-icon">{t.icon}</span><span>{t.tip}</span></div>
              ))}
            </div>

            <p className="an-section-label" style={{ marginBottom: 12 }}>Recommended Daily Schedule</p>
            <div className="an-card" style={{ marginBottom: 14 }}>
              <div className="an-card-body">
                {[
                  { time: "7:00 – 9:00 AM", activity: "Theory reading (NCERT Class 9 & 10 — Physics, Chemistry, Biology)", icon: "📖" },
                  { time: "10:00 AM – 12:00 PM", activity: "Practice MCQs — Mathematics section", icon: "✏️" },
                  { time: "2:00 – 3:30 PM", activity: "Daily current affairs & General Knowledge revision", icon: "🌐" },
                  { time: "4:00 – 6:00 PM", activity: "Mock tests with OMR sheet practice — time yourself strictly", icon: "📝" },
                ].map((slot, i, arr) => (
                  <div className="an-slot" key={i} style={i === arr.length - 1 ? { borderBottom: "none", marginBottom: 0, paddingBottom: 0 } : {}}>
                    <span className="an-slot-icon">{slot.icon}</span>
                    <div><p className="an-slot-time">{slot.time}</p><p className="an-slot-label">{slot.activity}</p></div>
                  </div>
                ))}
              </div>
            </div>

            <p className="an-section-label" style={{ marginBottom: 12 }}>Recommended Books</p>
            <div className="an-card">
              <div className="an-card-body">
                {[
                  { subject: "General Science", books: "NCERT Class 10 Science (Physics, Chemistry & Biology chapters), Lucent's General Science" },
                  { subject: "Mathematics", books: "NCERT Class 10 Mathematics, R.S. Aggarwal Class 10, Fast Track Objective Arithmetic" },
                  { subject: "General Knowledge", books: "Lucent's General Knowledge, Jharkhand GK Manual, Daily Newspaper / Current Affairs Digest" },
                ].map((b, i, arr) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", paddingBottom: i < arr.length - 1 ? 14 : 0, marginBottom: i < arr.length - 1 ? 14 : 0, borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <span style={{ fontFamily: "Sora, sans-serif", fontSize: "0.68rem", fontWeight: 800, background: "var(--rose)", color: "#fff", borderRadius: 6, padding: "3px 8px", flexShrink: 0, marginTop: 2 }}>{b.subject}</span>
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

          {/* 14. FAQ */}
          <div className="an-section" id="faq">
            <SectionHead label="FAQ" title="Frequently Asked Questions" sub="Common doubts about Jharkhand ANM Entrance Exam 2026, answered based on official information." />
            {faqs.map((faq, i) => (
              <div className={"an-faq-item" + (openFaq === i ? " an-faq-item--open" : "")} key={i}>
                <button className="an-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                  <span className="an-faq-q">{faq.q}</span>
                  <span className="an-faq-chevron">▾</span>
                </button>
                {openFaq === i && <div className="an-faq-ans">{faq.a}</div>}
              </div>
            ))}
          </div>
          <Sep />

          {/* OFFICIAL STRIP */}
          <div style={{ paddingTop: 24 }}>
            <div className="an-official-strip">
              <div className="an-official-text">
                <h3>Official Website – JCECEB Jharkhand</h3>
                <p>Apply online, download admit card, check results & counselling schedule at the official portal.</p>
              </div>
              <a href="https://jceceb.jharkhand.gov.in" target="_blank" rel="noopener noreferrer" className="an-official-link">
                🌐 jceceb.jharkhand.gov.in
              </a>
            </div>
          </div>

          {/* RELATED */}
          <div className="an-related-grid">
            <Link href="/exam-preparation/jharkhand-anm" className="an-related-link"><span>🎯 Practice ANM MCQs Online</span><span>›</span></Link>
            <Link href="/resources/jharkhand-polytechnic/exam-information" className="an-related-link"><span>📘 Jharkhand Polytechnic Guide</span><span>›</span></Link>
            <Link href="/resources" className="an-related-link"><span>📚 All Jharkhand Resources</span><span>›</span></Link>
          </div>

          <p className="an-disclaimer">
            All information is compiled from official JCECEB NECE (ANM) notifications and prospectus. Exam date is tentative/expected based on the previous year's cycle.
            Always verify latest updates at{" "}
            <a href="https://jceceb.jharkhand.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "var(--rose)" }}>
              jceceb.jharkhand.gov.in
            </a>.
            Futurely is not affiliated with JCECEB or the Government of Jharkhand.
          </p>

        </Container>
      </main>
    </>
  );
};

export default JHANM;
