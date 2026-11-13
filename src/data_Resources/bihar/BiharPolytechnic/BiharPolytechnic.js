"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdBanner from "@/components/AdBanner";
import Image from "next/image";

/* ─────────────────────────────────────────────
   STATIC DATA  — verified from official DCECE 2026 Prospectus
───────────────────────────────────────────── */
const highlights = [
  { label: "Exam Name", value: "Diploma Certificate Entrance Competitive Examination (DCECE) — Polytechnic Engineering (PE)" },
  { label: "Conducting Body", value: "BCECE Board (BCECEB), Patna" },
  { label: "Exam Level", value: "State-Level Entrance" },
  { label: "Admission To", value: "Polytechnic (Diploma Engineering) Colleges in Bihar — Government & Private (40,000+ seats)" },
  { label: "Exam Mode", value: "Offline – OMR Based (Pen & Paper)" },
  { label: "Exam Timing", value: "As printed on the Admit Card (shift-wise)" },
  { label: "Duration", value: "2 Hours 15 Minutes (135 Minutes)" },
  { label: "Total Questions", value: "90 MCQs (30 each — Physics, Chemistry, Mathematics)" },
  { label: "Total Marks", value: "450 Marks (5 Marks per Question)" },
  { label: "Marking Scheme", value: "+5 for correct, no negative marking, 0 for unattempted" },
  { label: "Question Type", value: "Objective (Multiple Choice) — Bilingual Hindi & English" },
  { label: "Medium", value: "Hindi & English (Bilingual)" },
  { label: "Exam Center", value: "District headquarters across Bihar (printed on Admit Card)" },
  { label: "Age Limit", value: "No minimum age bar for the PE group (BCECEB 2026)" },
];

const subjects = [
  { name: "Physics (Bhautik Vigyan)", icon: "⚛️", questions: 30, marks: 150, color: "#3b82f6", bg: "#eff6ff", border: "#bfdbfe", level: "Matric (Class 10) Level" },
  { name: "Chemistry (Rasayan Vigyan)", icon: "🧪", questions: 30, marks: 150, color: "#10b981", bg: "#ecfdf5", border: "#a7f3d0", level: "Matric (Class 10) Level" },
  { name: "Mathematics (Ganit)", icon: "📐", questions: 30, marks: 150, color: "#f59e0b", bg: "#fffbeb", border: "#fde68a", level: "Matric (Class 10) Level" },
];

const eligibility = [
  {
    icon: "📘",
    title: "Class 10 Pass (Matric) or Appearing",
    desc: "Candidate must have passed — or be appearing in — the Class 10 / Matriculation examination with Mathematics and Science as compulsory subjects. The passing certificate has to be produced at the time of counselling / document verification.",
  },
  {
    icon: "📍",
    title: "Bihar Domicile Required",
    desc: "DCECE is held for candidates whose parents are natives of / residents of Bihar. A valid Local Resident Certificate issued by the competent authority is mandatory at counselling — without a Bihar residence claim no Bihar seat is offered.",
  },
  {
    icon: "🎂",
    title: "No Minimum Age for PE",
    desc: "The Polytechnic Engineering (PE) group has no separate minimum age limit in the 2026 cycle. Age conditions, wherever prescribed, apply only to the Para Medical (PM / PMM) course groups.",
  },
  {
    icon: "🏥",
    title: "Medical Fitness & Verification",
    desc: "Candidates shortlisted in the merit list must appear for document verification and submit a Medical Fitness Certificate issued by a Registered Medical Practitioner before final admission is granted.",
  },
];

const importantDates = [
  { event: "Application Form Release (Online)", date: "19 March 2026" },
  { event: "Last Date to Apply (Online)", date: "27 April 2026" },
  { event: "Last Date to Pay Application Fee", date: "27 April 2026" },
  { event: "Admit Card Download", date: "15 May 2026" },
  { event: "Exam Date — PE (Polytechnic Engineering)", date: "23 May 2026 (Saturday)" },
  { event: "Exam Date — PM / PMM (Paramedical)", date: "24 May 2026 (Sunday)" },
  { event: "Exam Timing / Shift", date: "As printed on the Admit Card" },
  { event: "Exam Centers", date: "Bihar के जिला मुख्यालय — Patna, Gaya, Muzaffarpur, Darbhanga, Bhagalpur, Purnia, Arrah, Chhapra, Katihar आदि" },
  { event: "Result Declaration (Rank Card)", date: "June 2026 (Expected)" },
  { event: "Counselling Process", date: "August 2026 (Expected)" },
];

const applicationFee = [
  { category: "General / OBC / EBC — PE (1 Course)", fee: "₹750" },
  { category: "SC / ST / PwD — PE (1 Course)", fee: "₹480" },
  { category: "General / OBC / EBC — 2 Courses", fee: "₹850" },
  { category: "SC / ST / PwD — 2 Courses", fee: "₹530" },
  { category: "General / OBC / EBC — 3 Courses", fee: "₹950" },
  { category: "SC / ST / PwD — 3 Courses", fee: "₹630" },
];

const onlineApplicationSteps = [
  {
    title: "Registration & Form Filling",
    desc: "Visit bceceboard.bihar.gov.in → open the 'Online Portal of DCECE[PE]-2026'. Register with mobile number and e-mail, then fill Personal Details (Name, DOB, Gender, Category, Domicile, Exam District), Educational Details (Class 10 board, year, marks) and Communication Address. Note the login credentials generated after registration.",
    icon: "📝",
  },
  {
    title: "Photograph & Signature Upload",
    desc: "Upload a recent colour photograph carrying your name and date as prescribed by BCECEB, together with a scanned signature in the prescribed format. Preview every field carefully before final submission — editing is allowed only in the notified correction window.",
    icon: "📷",
  },
  {
    title: "Application Fee Payment & Printout",
    desc: "Pay online through Debit Card, Credit Card, Net Banking or UPI. For PE only the fee is ₹750 (General / OBC / EBC) or ₹480 (SC / ST / PwD). After successful payment, download and print the completed application form and keep 3-4 copies safely. Fee is non-refundable.",
    icon: "💳",
  },
];

const documentsRequired = [
  "Matriculation / Class 10 Admit Card, Marksheet & Passing Certificate (original + self-attested copies)",
  "Bihar Local Resident / Domicile Certificate issued by the competent authority",
  "Caste Certificate — SC / ST / EBC / BC issued by the competent Bihar authority (if claiming reservation)",
  "EWS Income & Assets Certificate issued within the last one year (if claiming EWS)",
  "PwD / Divyang Certificate from a Government Hospital (if claiming horizontal reservation)",
  "Migration Certificate — candidates who passed Class 10 from a board other than BSEB",
  "DCECE 2026 Admit Card and Rank Card / Scorecard",
  "Provisional Seat Allotment Letter & Document Verification Slip (after counselling)",
  "Aadhaar Card, recent colour photographs and signature",
  "Medical Fitness Certificate issued by a Registered Medical Practitioner",
];

const tieBreakingRules = [
  { rank: "1", condition: "Total DCECE marks (out of 450) not equal", resolution: "Candidate with the higher total marks gets the higher merit rank" },
  { rank: "2", condition: "Total marks equal", resolution: "Inter-se merit decided as per the official DCECE 2026 prospectus / BCECEB rules" },
  { rank: "3", condition: "Merit list finalised", resolution: "BCECEB publishes the Rank Card on bceceboard.bihar.gov.in (June 2026 expected)" },
  { rank: "4", condition: "Counselling stage", resolution: "Merit-wise online choice filling and seat allotment conducted by BCECEB" },
];

const reservationCategories = [
  { category: "SC (Scheduled Caste)", detail: "16% of seats as per Government of Bihar reservation rules" },
  { category: "ST (Scheduled Tribe)", detail: "1% of seats as per Government of Bihar reservation rules" },
  { category: "EBC (Extremely Backward Class)", detail: "18% of seats - Non-Creamy Layer certificate mandatory" },
  { category: "BC (Backward Class)", detail: "15% of seats - Non-Creamy Layer certificate mandatory" },
  { category: "EWS (Economically Weaker Section)", detail: "10% of unreserved seats - family income below ₹8 lakh/year, certificate from competent authority" },
  { category: "PwD / Divyang (DQ)", detail: "4% horizontal reservation across all categories - disability certificate from a Government hospital" },
];

const syllabusSummary = [
  {
    subject: "Physics",
    icon: "⚛️",
    color: "#3b82f6",
    level: "Matric Level",
    topics: [
      "Units & Measurements",
      "Motion & Force (Newton's Laws)",
      "Work, Power & Energy",
      "Heat & Thermodynamics",
      "Sound - Waves, Pitch & Echo",
      "Light - Reflection, Refraction, Mirrors & Lenses",
      "Electricity & Magnetism",
      "Gravitation & Pressure (Fluid Mechanics)",
      "Kinematics & Simple Machines",
      "Electromagnetic Induction",
    ],
  },
  {
    subject: "Chemistry",
    icon: "🧪",
    color: "#10b981",
    level: "Matric Level",
    topics: [
      "Matter & Its States",
      "Atomic Structure",
      "Periodic Classification of Elements",
      "Chemical Bonding (Ionic, Covalent, Metallic)",
      "Acids, Bases & Salts - Reactions & pH",
      "Metals & Non-Metals",
      "Carbon & Its Compounds (Hydrocarbons)",
      "Chemical Reactions & Equations",
      "Environmental Chemistry",
      "Important Chemical Compounds",
    ],
  },
  {
    subject: "Mathematics",
    icon: "📐",
    color: "#f59e0b",
    level: "Matric Level",
    topics: [
      "Number System - LCM, HCF, Decimals, Binary",
      "Algebra - Linear & Quadratic Equations",
      "Geometry & Mensuration",
      "Coordinate Geometry - Distance & Midpoint",
      "Trigonometry - Ratios, Identities, Height & Distance",
      "Ratio, Proportion & Percentage",
      "Statistics & Probability",
      "Arithmetic Applications - Interest, Profit & Loss, Time & Work",
      "Sets, Relations & Functions",
      "Simplification & Factorisation",
    ],
  },
];

const pyqPapers = [
  { year: "2025", driveUrl: null },
  { year: "2024", driveUrl: null },
  { year: "2023", driveUrl: null },
  { year: "2022", driveUrl: null },
  { year: "2021", driveUrl: null },
  { year: "2020", driveUrl: null },
  { year: "2019", driveUrl: null },
  { year: "2018", driveUrl: null },
];

const preparationTips = [
  { icon: "📅", tip: "Syllabus BCECEB की DCECE 2026 notification पर आधारित है - BSEB / NCERT Class 10 की Physics, Chemistry और Maths की textbooks से पढ़ो।" },
  { icon: "📝", tip: "पुराने papers से questions repeat होते हैं - 2018-2025 के सभी PYQs solve करो, pattern पहचानना सबसे ज़रूरी है।" },
  { icon: "⏱️", tip: "Mock tests में OMR sheet की practice करो - bubbling mistakes से marks जाते हैं, चाहे answer सही ही क्यों न हो।" },
  { icon: "🎯", tip: "90 questions के लिए सिर्फ 2 घंटे 15 मिनट मिलते हैं - पहले आसान questions करो, tough questions बाद के लिए छोड़ो।" },
  { icon: "✅", tip: "PE group में negative marking नहीं है - कोई भी question खाली मत छोड़ो, educated guess भी हमेशा फायदे में रहेगा।" },
  { icon: "📊", tip: "Maths 150 marks का है और सबसे तेज़ solve होता है - रोज़ formula revision करो ताकि exam में time बचे।" },
];

const faqs = [
  {
    q: "Bihar Polytechnic (DCECE) exam क्या है?",
    a: "Diploma Certificate Entrance Competitive Examination (DCECE) को BCECE Board (BCECEB), Patna आयोजित करता है। यह Bihar के सरकारी और निजी Polytechnic colleges में Diploma Engineering (PE group) के admission के लिए राज्य-स्तरीय entrance परीक्षा है। Paramedical के लिए PM और PMM groups अलग से आयोजित होते हैं।",
  },
  {
    q: "DCECE 2026 exam date और timing क्या है?",
    a: "PE (Polytechnic Engineering) group की परीक्षा 23 May 2026 (Saturday) को और PM / PMM (Paramedical) groups की 24 May 2026 (Sunday) को होगी। Shift और timing admit card पर दी जाएगी। परीक्षा Bihar के जिला मुख्यालयों - Patna, Gaya, Muzaffarpur, Darbhanga, Bhagalpur, Purnia, Arrah, Chhapra, Katihar आदि - में आयोजित होती है।",
  },
  {
    q: "Polytechnic exam का syllabus और pattern क्या है?",
    a: "Syllabus Matric / Class 10 level का है - Physics, Chemistry और Mathematics से 30-30 questions, कुल 90 questions और 450 marks (हर सही उत्तर पर 5 marks)। परीक्षा 2 घंटे 15 मिनट की है, offline OMR mode में होती है और negative marking नहीं है।",
  },
  {
    q: "Eligibility क्या है? Minimum marks कितने चाहिए?",
    a: "Candidate को Class 10 / Matric pass या appearing होना चाहिए और Mathematics + Science compulsory subjects होने चाहिए। Bihar residence / domicile certificate अनिवार्य है। Appearing candidates counselling से पहले passing certificate ज़रूर present करें।",
  },
  {
    q: "Age limit क्या है?",
    a: "PE group के लिए कोई अलग minimum age limit नहीं रखी गई है (BCECEB 2026)। Age conditions केवल Paramedical (PM / PMM) groups पर लागू होती हैं।",
  },
  {
    q: "Application fee कितनी है?",
    a: "PE (1 course) के लिए General / OBC / EBC को ₹750 और SC / ST / PwD को ₹480 देना होता है। 2 courses के लिए ₹850 / ₹530 और 3 courses के लिए ₹950 / ₹630। Fee केवल online - Debit Card, Credit Card, Net Banking या UPI - से भरी जाती है और non-refundable है।",
  },
  {
    q: "Merit list / Rank कैसे तय होता है?",
    a: "DCECE का result Rank Card के रूप में जारी होता है, जो परीक्षा में प्राप्त कुल marks (450 में से) पर आधारित होता है। Rank Card June 2026 में bceceboard.bihar.gov.in पर आएगा, उसके बाद merit के अनुसार online counselling (choice filling और seat allotment) होगा।",
  },
  {
    q: "Exam किस mode में होती है और negative marking है क्या?",
    a: "Exam offline OMR-based mode (pen & paper) में होती है। Duration 2 घंटे 15 मिनट है। सही answer पर +5 marks मिलते हैं और negative marking नहीं है - गलत answer पर कुछ नहीं कटता। Paper Hindi और English दोनों भाषाओं में आता है।",
  },
];

const SectionHead = ({ label, title, sub }) => (
  <div style={{ marginBottom: 20 }}>
    <span className="jp-section-label">{label}</span>
    <h2 className="jp-section-title">{title}</h2>
    {sub && <p className="jp-section-sub">{sub}</p>}
  </div>
);

const Sep = () => <div className="jp-sep" />;

export default function BiharPolytechnicClient() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    //const timer = setTimeout(() => setShowBanner(true), 2000);
    //return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full px-0">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes btnBorderSpin {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes jpDlGlow {
          0%   { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }

        /* BANNER */
        .jp-banner-overlay {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px);
          padding: 16px; box-sizing: border-box;
          animation: jpBannerFadeIn 0.3s ease;
        }
        @keyframes jpBannerFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .jp-banner-wrapper {
          position: relative;
          width: min(340px, calc(100vw - 32px));
          aspect-ratio: 916 / 1717;
          max-height: calc(100vh - 80px);
          border-radius: 14px; overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,0.55);
          animation: jpBannerSlideUp 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes jpBannerSlideUp {
          from { transform: translateY(40px) scale(0.96); opacity: 0; }
          to   { transform: translateY(0) scale(1); opacity: 1; }
        }
        .jp-banner-wrapper img { width: 100%; height: 100%; object-fit: cover; display: block; cursor: pointer; }
        .jp-banner-close {
          position: absolute; top: 10px; right: 10px;
          width: 32px; height: 32px; border: none; background: transparent;
          color: #fff; font-size: 22px; line-height: 1;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 10; transition: opacity 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .jp-banner-close:hover { opacity: 0.7; }

        /* PAGE */
        .jp-page {
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
          font-family: inherit;
          background: #f3f6fb;
          min-height: 100vh;
          padding-bottom: 80px;
          overflow-x: hidden;
        }

        /* HERO */
        .jp-hero {
          background: linear-gradient(155deg, #1e3a8a 0%, #1a56db 60%, #2563eb 100%);
          padding: 22px 16px 80px; text-align: center; position: relative; overflow: hidden;
        }
        .jp-hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at 15% 60%, rgba(255,255,255,0.08) 0%, transparent 45%),
                      radial-gradient(circle at 85% 20%, rgba(255,255,255,0.05) 0%, transparent 40%);
          pointer-events: none;
        }
        .jp-hero-inner { position: relative; z-index: 1; max-width: 680px; margin: 0 auto; }
        .jp-hero h1 {
          font-size: clamp(1.55rem, 5vw, 2.3rem);
          font-weight: 800; color: #fff; margin-bottom: 12px; margin-top: 0px;
          line-height: 1.2; letter-spacing: -0.5px;
        }
        .jp-hero-desc {
          font-size: clamp(0.9rem, 2.5vw, 1rem); color: rgba(255,255,255,0.82);
          line-height: 1.75; margin: 0 auto 20px; max-width: 560px;
        }
        .jp-hero-pills { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
        .jp-hero-pill {
          background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.22);
          border-radius: 999px; padding: 5px 14px; font-size: 0.76rem; font-weight: 600; color: #fff;
        }

        /* STAT STRIP */
        .jp-stat-strip {
          display: grid; grid-template-columns: repeat(4, 1fr);
          background: var(--surface); border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md); overflow: hidden; margin-top: -36px; position: relative; z-index: 2;
        }
        @media (max-width: 600px) { .jp-stat-strip { grid-template-columns: repeat(2, 1fr); } }
        .jp-stat { text-align: center; padding: 18px 10px; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .jp-stat:nth-child(4n) { border-right: none; }
        @media (max-width: 600px) {
          .jp-stat:nth-child(2n) { border-right: none; }
          .jp-stat:nth-child(3), .jp-stat:nth-child(4) { border-bottom: none; }
        }
        .jp-stat-val { font-size: clamp(1.1rem,3vw,1.4rem); font-weight: 800; color: var(--blue); line-height: 1; margin-bottom: 4px; }
        .jp-stat-label { font-size: clamp(0.66rem,1.5vw,0.75rem); color: var(--muted); font-weight: 600; }

        /* LAYOUT */
        .jp-sep { height: 1px; background: var(--border); margin: 32px 0 0; }
        .jp-section { padding-top: 28px; }
        .jp-section-label { display: block; font-size: 0.68rem; font-weight: 800; letter-spacing: 1.6px; text-transform: uppercase; color: var(--blue); margin-bottom: 5px; }
        .jp-section-title { font-size: clamp(1.05rem,3.5vw,1.35rem); font-weight: 800; color: var(--text); margin-bottom: 5px; letter-spacing: -0.3px; line-height: 1.3; }
        .jp-section-sub { font-size: 0.88rem; color: var(--muted); line-height: 1.65; margin-bottom: 0; }

        /* CARD */
        .jp-card { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-xs); }
        .jp-card-header { display: flex; align-items: center; gap: 10px; padding: 13px 18px; border-bottom: 1px solid var(--border); background: var(--surface-2); }
        .jp-card-icon { width: 30px; height: 30px; border-radius: 8px; background: var(--blue-lt); display: flex; align-items: center; justify-content: center; font-size: 0.95rem; flex-shrink: 0; }
        .jp-card-title { font-size: 0.88rem; font-weight: 800; color: var(--text); margin: 0; }
        .jp-card-body { padding: 18px; }

        /* HIGHLIGHTS TABLE */
        .jp-highlights-table { width: 100%; border-collapse: collapse; }
        .jp-highlights-table tr { border-bottom: 1px solid var(--border); }
        .jp-highlights-table tr:last-child { border-bottom: none; }
        .jp-highlights-table td { padding: 10px 16px; font-size: 0.85rem; line-height: 1.5; vertical-align: top; }
        .jp-highlights-table td:first-child { font-weight: 700; color: var(--text-2); width: 42%; }
        .jp-highlights-table td:last-child { color: var(--text); }
        @media (max-width: 400px) { .jp-highlights-table td { padding: 9px 12px; font-size: 0.81rem; } }

        /* SUBJECTS */
        .jp-subjects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        @media (max-width: 600px) { .jp-subjects-grid { grid-template-columns: 1fr; gap: 8px; } }
        .jp-subject-card { border-radius: var(--radius-md); padding: 16px; border: 1.5px solid; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 6px; }
        @media (max-width: 600px) { .jp-subject-card { flex-direction: row; text-align: left; gap: 14px; padding: 13px 16px; align-items: center; } .jp-subject-card-left { display: flex; align-items: center; gap: 10px; flex: 1; } .jp-subject-card-right { display: flex; align-items: center; gap: 16px; flex-shrink: 0; } }
        @media (min-width: 601px) { .jp-subject-card-left { display: contents; } .jp-subject-card-right { display: contents; } }
        .jp-subject-icon { font-size: 1.5rem; flex-shrink: 0; }
        .jp-subject-name { font-size: 0.88rem; font-weight: 800; }
        .jp-subject-stat { font-size: 0.76rem; color: var(--muted); font-weight: 600; }
        .jp-subject-stat span { font-size: 1rem; font-weight: 800; }

        /* MARKING */
        .jp-marking-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 12px; }
        .jp-marking-card { border-radius: var(--radius-sm); padding: 14px 10px; text-align: center; border: 1.5px solid; }
        .jp-marking-emoji { font-size: 1.1rem; margin-bottom: 4px; }
        .jp-marking-val { font-size: 1.05rem; font-weight: 800; margin-bottom: 3px; }
        .jp-marking-label { font-size: 0.72rem; color: var(--muted); font-weight: 600; }

        /* ELIGIBILITY */
        .jp-elig-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        @media (max-width: 520px) { .jp-elig-grid { grid-template-columns: 1fr; } }
        .jp-elig-card { background: var(--surface-2); border: 1.5px solid var(--border); border-radius: var(--radius-md); padding: 14px 16px; display: flex; gap: 11px; align-items: flex-start; }
        .jp-elig-icon { font-size: 1.1rem; flex-shrink: 0; width: 34px; height: 34px; background: var(--surface); border-radius: 99px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); }
        .jp-elig-title { font-size: 0.83rem; font-weight: 700; color: var(--text); margin-bottom: 4px; }
        .jp-elig-desc { font-size: 0.8rem; color: var(--muted); line-height: 1.6; margin: 0; }

        /* FEE TABLE */
        .jp-fee-table { width: 100%; border-collapse: collapse; }
        .jp-fee-table th { background: var(--blue); color: #fff; padding: 10px 16px; font-size: 0.8rem; font-weight: 700; text-align: left; }
        .jp-fee-table td { padding: 10px 16px; font-size: 0.85rem; border-bottom: 1px solid var(--border); color: var(--text-2); }
        .jp-fee-table tr:last-child td { border-bottom: none; }
        .jp-fee-table tr:nth-child(even) td { background: var(--surface-2); }
        .jp-fee-val { font-weight: 800; color: var(--blue); }

        /* DATES */
        .jp-dates-list { display: flex; flex-direction: column; gap: 7px; }
        .jp-date-item { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 11px 16px; background: var(--surface-2); border: 1.5px solid var(--border); border-radius: var(--radius-sm); }
        .jp-date-item--highlight { border-color: rgba(26,86,219,0.3); background: #eff6ff; }
        .jp-date-event { font-size: 0.84rem; font-weight: 600; color: var(--text-2); flex: 1; min-width: 0; }
        .jp-date-val { font-size: 0.78rem; font-weight: 700; color: var(--blue); background: var(--blue-lt); border-radius: 999px; padding: 3px 11px; white-space: nowrap; flex-shrink: 0; }
        @media (max-width: 480px) { .jp-date-item { flex-wrap: wrap; gap: 6px; } .jp-date-event { font-size: 0.81rem; } }

        /* STEPS */
        .jp-steps-list { display: flex; flex-direction: column; gap: 12px; }
        .jp-step-card { display: flex; gap: 14px; align-items: flex-start; background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); padding: 16px; }
        .jp-step-num { width: 36px; height: 36px; border-radius: 50%; background: var(--blue); color: #fff; font-size: 0.8rem; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .jp-step-title { font-size: 0.88rem; font-weight: 700; color: var(--text); margin-bottom: 5px; }
        .jp-step-desc { font-size: 0.82rem; color: var(--muted); line-height: 1.65; margin: 0; }

        /* DOCUMENTS */
        .jp-docs-list { display: flex; flex-direction: column; gap: 7px; }
        .jp-doc-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 14px; background: var(--surface-2); border: 1.5px solid var(--border); border-radius: var(--radius-sm); font-size: 0.83rem; color: var(--text-2); line-height: 1.55; }
        .jp-doc-icon { flex-shrink: 0; font-size: 0.9rem; margin-top: 1px; }

        /* TIE-BREAKING */
        .jp-tie-table { width: 100%; border-collapse: collapse; }
        .jp-tie-table th { background: var(--blue); color: #fff; padding: 9px 14px; font-size: 0.78rem; font-weight: 700; text-align: left; }
        .jp-tie-table td { padding: 10px 14px; font-size: 0.82rem; border-bottom: 1px solid var(--border); color: var(--text-2); }
        .jp-tie-table tr:last-child td { border-bottom: none; }
        .jp-tie-table tr:nth-child(even) td { background: var(--surface-2); }

        /* RESERVATION */
        .jp-res-table { width: 100%; border-collapse: collapse; }
        .jp-res-table th { background: var(--blue); color: #fff; padding: 9px 14px; font-size: 0.78rem; font-weight: 700; text-align: left; }
        .jp-res-table td { padding: 9px 14px; font-size: 0.82rem; border-bottom: 1px solid var(--border); color: var(--text-2); }
        .jp-res-table tr:last-child td { border-bottom: none; }
        .jp-res-table tr:nth-child(even) td { background: var(--surface-2); }

        /* SYLLABUS */
        .jp-syllabus-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        @media (max-width: 720px) { .jp-syllabus-grid { grid-template-columns: 1fr; gap: 10px; } }
        .jp-syllabus-card { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); overflow: hidden; }
        .jp-syllabus-header { display: flex; align-items: center; gap: 8px; padding: 11px 15px; font-size: 0.88rem; font-weight: 800; color: #fff; }
        .jp-syllabus-level { font-size: 0.68rem; background: rgba(255,255,255,0.2); border-radius: 999px; padding: 2px 8px; margin-left: auto; white-space: nowrap; }
        .jp-syllabus-topics { padding: 10px 14px; }
        .jp-syllabus-topic { display: flex; align-items: flex-start; gap: 7px; font-size: 0.8rem; color: var(--text-2); padding: 5px 0; border-bottom: 1px solid var(--border); line-height: 1.4; }
        .jp-syllabus-topic:last-child { border-bottom: none; }
        .jp-syllabus-topic::before { content: '›'; font-size: 0.85rem; font-weight: 700; flex-shrink: 0; margin-top: 1px; opacity: 0.5; }
        @media (max-width: 720px) { .jp-syllabus-topics { display: grid; grid-template-columns: repeat(2, 1fr); padding: 10px 12px; } .jp-syllabus-topic { padding: 4px 2px; } }
        @media (max-width: 380px) { .jp-syllabus-topics { grid-template-columns: 1fr; } }

        /* INFO ALERT */
        .jp-info-alert { display: flex; align-items: flex-start; gap: 10px; background: #fffbeb; border: 1.5px solid #fde68a; border-radius: var(--radius-sm); padding: 12px 14px; font-size: 0.82rem; color: #92400e; line-height: 1.6; margin-top: 10px; }
        .jp-info-alert-icon { flex-shrink: 0; font-size: 1rem; }

        /* PYQ FEATURE */
        .jp-pyq-feature { background: linear-gradient(140deg, #1e3a8a 0%, #1a56db 55%, #2563eb 100%); border-radius: var(--radius-lg); padding: 28px 24px 26px; position: relative; overflow: hidden; }
        .jp-pyq-feature::before { content: ''; position: absolute; top: -60px; right: -60px; width: 220px; height: 220px; border-radius: 50%; background: rgba(255,255,255,0.07); pointer-events: none; }
        .jp-pyq-feature::after  { content: ''; position: absolute; bottom: -80px; left: -20px; width: 240px; height: 240px; border-radius: 50%; background: rgba(255,255,255,0.04); pointer-events: none; }
        .jp-pyq-feature-inner { position: relative; z-index: 1; }
        .jp-pyq-tag { display: flex; align-items: center; justify-content: center; gap: 6px; width: fit-content; margin: 0 auto 16px auto; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.28); border-radius: 999px; padding: 5px 14px; font-size: 0.75rem; font-weight: 700; color: #fff; }
        .jp-pyq-tag-dot { width: 7px; height: 7px; border-radius: 50%; background: #34d399; flex-shrink: 0; }
        .jp-pyq-feature h3 { font-size: clamp(1.1rem, 3.5vw, 1.45rem); font-weight: 800; color: #fff; margin-bottom: 7px; line-height: 1.25; }
        .jp-pyq-feature-desc { font-size: 0.86rem; color: rgba(255,255,255,0.80); line-height: 1.65; margin-bottom: 22px; max-width: 540px; }

        /* PYQ TABLE */
        .jp-pyq-table-wrap { border-radius: 12px; overflow: hidden; border: 1px solid #c8d9f8; }
        .jp-pyq-table { width: 100%; border-collapse: collapse; min-width: 340px; }
        .jp-pyq-table th { background: #0d6efd; color: #fff; padding: 11px 16px; font-size: 0.82rem; font-weight: 700; text-align: center; white-space: nowrap; }
        .jp-pyq-table th:first-child { text-align: left; }
        .jp-pyq-table td { background: #f9fbff; border: 1px solid #dce8ff; padding: 11px 16px; font-size: 0.86rem; text-align: center; color: #374151; vertical-align: middle; }
        .jp-pyq-table tr:nth-child(even) td { background: #f0f6ff; }
        .jp-pyq-table tr:last-child td { border-bottom: none; }
        .jp-pyq-table td:first-child { text-align: left; font-weight: 700; }

        /* DOWNLOAD BUTTON */
        .jp-dl-btn { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 5px; background: linear-gradient(90deg, #0d6efd, #6610f2); color: #fff; border: none; border-radius: 8px; padding: 9px 18px; font-size: 0.82rem; font-weight: 700; cursor: pointer; overflow: hidden; z-index: 1; white-space: nowrap; text-decoration: none; }
        .jp-dl-btn::before { content: ""; position: absolute; inset: -2px; border-radius: 10px; background: linear-gradient(120deg, transparent, #00eaff, #6610f2, #00eaff, transparent); background-size: 300% 300%; animation: jpDlGlow 2.5s linear infinite; z-index: -1; }
        .jp-dl-btn::after { content: ""; position: absolute; inset: 2px; border-radius: 6px; background: linear-gradient(90deg, #0d6efd, #6610f2); z-index: -1; }
        .jp-dl-btn:hover { opacity: 0.9; color: #fff; }
        .jp-dl-btn:disabled { background: linear-gradient(90deg, #94a3b8, #64748b); cursor: not-allowed; opacity: 0.7; }
        .jp-dl-btn:disabled::before { animation: none; background: none; }
        .jp-dl-btn:disabled::after { background: linear-gradient(90deg, #94a3b8, #64748b); }
        @media (max-width: 480px) { .jp-pyq-table th, .jp-pyq-table td { padding: 9px 10px; font-size: 0.78rem; } .jp-pyq-table th:nth-child(3), .jp-pyq-table td:nth-child(3) { display: none; } .jp-dl-btn { font-size: 0.84rem; padding: 8px 16px; } }

        /* PRACTICE BANNER */
        .jp-practice-banner { position: relative; border-radius: var(--radius-lg); overflow: hidden; background: linear-gradient(140deg, #064e3b 0%, #065f46 45%, #047857 100%); padding: 28px 24px 26px; }
        .jp-practice-banner::before { content: ''; position: absolute; top: -50px; right: -50px; width: 220px; height: 220px; border-radius: 50%; background: rgba(255,255,255,0.06); pointer-events: none; }
        .jp-practice-banner::after  { content: ''; position: absolute; bottom: -70px; left: -10px; width: 200px; height: 200px; border-radius: 50%; background: rgba(255,255,255,0.04); pointer-events: none; }
        .jp-practice-inner { position: relative; z-index: 1; }
        .jp-practice-banner h3 { font-size: clamp(1.1rem, 3.5vw, 1.45rem); font-weight: 800; color: #fff; margin-bottom: 7px; line-height: 1.25; }
        .jp-practice-desc { font-size: 0.86rem; color: rgba(255,255,255,0.80); line-height: 1.65; margin-bottom: 20px; max-width: 540px; }
        .jp-practice-feats { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 22px; }
        .jp-practice-feat { display: flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; padding: 5px 12px; font-size: 0.77rem; font-weight: 600; color: rgba(255,255,255,0.922); }
        .jp-pf-dot { width: 6px; height: 6px; border-radius: 50%; background: #34d399; flex-shrink: 0; }
        .jp-practice-btns { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }

        /* ANIMATED BUTTON */
        .jp-start-btn-wrap { display: inline-flex; padding: 2.5px; border-radius: calc(var(--radius-sm) + 2.5px); background: linear-gradient(270deg, #60a5fa, #a78bfa, #34d399, #fbbf24, #f472b6, #60a5fa); background-size: 400% 400%; animation: btnBorderSpin 3s ease infinite; text-decoration: none; transition: transform 0.18s, box-shadow 0.18s; }
        .jp-start-btn-wrap:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.28); }
        .jp-practice-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: #fff; color: #065f46; border-radius: var(--radius-sm); padding: 12px 22px; font-size: 0.9rem; font-weight: 800; text-decoration: none; transition: background 0.18s, color 0.18s; }
        .jp-start-btn-wrap:hover .jp-practice-btn-primary { background: #ecfdf5; color: #064e3b; }
        .jp-practice-btn-secondary { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.14); border: 1.5px solid rgba(255,255,255,0.3); border-radius: var(--radius-sm); padding: 12px 20px; font-size: 0.88rem; font-weight: 700; color: #fff; text-decoration: none; transition: background 0.18s; }
        .jp-practice-btn-secondary:hover { background: rgba(255,255,255,0.22); color: #fff; }

        /* TIPS */
        .jp-tips-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 9px; }
        @media (max-width: 480px) { .jp-tips-grid { grid-template-columns: 1fr; } }
        .jp-tip-card { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-sm); padding: 13px 15px; display: flex; align-items: flex-start; gap: 10px; font-size: 0.83rem; color: var(--text-2); line-height: 1.55; }
        .jp-tip-icon { font-size: 1rem; flex-shrink: 0; margin-top: 1px; }

        /* SCHEDULE SLOTS */
        .jp-slot { display: flex; gap: 12px; align-items: flex-start; padding-bottom: 14px; margin-bottom: 14px; border-bottom: 1px solid var(--border); }
        .jp-slot:last-child { padding-bottom: 0; margin-bottom: 0; border-bottom: none; }
        .jp-slot-icon { font-size: 1.05rem; flex-shrink: 0; }
        .jp-slot-time { font-size: 0.76rem; font-weight: 800; color: var(--blue); margin-bottom: 2px; }
        .jp-slot-label { font-size: 0.84rem; color: var(--text-2); margin: 0; line-height: 1.5; }

        /* FAQ */
        .jp-faq-item { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); margin-bottom: 7px; overflow: hidden; }
        .jp-faq-item--open { border-color: rgba(26,86,219,0.3); }
        .jp-faq-btn { width: 100%; border: none; background: transparent; text-align: left; display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 14px 18px; cursor: pointer; min-height: 50px; -webkit-tap-highlight-color: transparent; }
        .jp-faq-q { font-size: clamp(0.8rem,2vw,0.88rem); font-weight: 700; color: var(--text); line-height: 1.4; }
        .jp-faq-chevron { flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%; background: var(--surface-2); color: var(--muted); font-size: 0.65rem; display: flex; align-items: center; justify-content: center; transition: transform 0.25s, background 0.2s, color 0.2s; }
        .jp-faq-item--open .jp-faq-chevron { transform: rotate(180deg); background: var(--blue); color: #fff; }
        .jp-faq-ans { padding: 0 18px 14px; font-size: 0.84rem; color: var(--muted); line-height: 1.72; }
        @media (max-width: 400px) { .jp-faq-btn { padding: 12px 14px; } .jp-faq-ans { padding: 0 14px 12px; } }

        /* OFFICIAL STRIP */
        .jp-official-strip { background: linear-gradient(135deg, var(--blue) 0%, var(--blue-dk) 100%); border-radius: var(--radius-md); padding: 18px 20px; color: #fff; display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; box-shadow: 0 6px 20px rgba(26,86,219,0.22); }
        .jp-official-text h3 { font-size: 0.9rem; font-weight: 800; margin-bottom: 3px; }
        .jp-official-text p { font-size: 0.8rem; color: rgba(255,255,255,0.75); margin: 0; }
        .jp-official-link { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); border-radius: var(--radius-sm); padding: 9px 18px; color: #fff; font-weight: 700; font-size: 0.82rem; text-decoration: none; transition: background 0.18s; white-space: nowrap; }
        .jp-official-link:hover { background: rgba(255,255,255,0.25); color: #fff; }

        /* RELATED */
        .jp-related-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 9px; margin-top: 14px; }
        @media (max-width: 480px) { .jp-related-grid { grid-template-columns: 1fr; } }
        .jp-related-link { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); padding: 13px 15px; text-decoration: none; color: var(--text-2); font-size: 0.83rem; font-weight: 600; display: flex; align-items: center; justify-content: space-between; gap: 8px; transition: border-color 0.18s, color 0.18s; }
        .jp-related-link:hover { border-color: rgba(26,86,219,0.3); color: var(--blue); }
        .jp-disclaimer { text-align: center; font-size: 0.73rem; color: var(--muted); margin-top: 18px; line-height: 1.65; padding: 0 8px; }

        /* RESPONSIVE */
        @media (max-width: 480px) { .jp-pyq-table-wrap { margin: 0 -16px; } .jp-hero { padding: 22px 14px 68px; } .jp-hero h1 { margin-top: 0px; } .jp-card-body { padding: 14px; } .jp-section { padding-top: 22px; } .jp-official-link { width: 100%; justify-content: center; } }
        @media (max-width: 400px) { .jp-dl-btn { font-size: 0.84rem; padding: 8px 16px; } .jp-pyq-table-wrap { margin: 0 -12px; } .jp-hero h1 { font-size: 1.38rem; margin-top: 0px; } .jp-section-title { font-size: 1rem; } }
        @media (max-width: 540px) { .jp-practice-btns { justify-content: center; align-items: center; } .jp-start-btn-wrap, .jp-practice-btn-secondary { margin-left: auto; margin-right: auto; } }
      ` }} />

      {/* BANNER */}
      {showBanner && (
        <div className="jp-banner-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowBanner(false); }}>
          <div className="jp-banner-wrapper">
            <Image width={916} height={1717}
              src="/bannerPoly.png"
              alt="Bihar Polytechnic 2026 Full Test Series – Join on Futurely"
              draggable={false} loading="lazy" onClick={() => { setShowBanner(false); router.push("/test-series"); }}
            />
            <button className="jp-banner-close" onClick={() => setShowBanner(false)} aria-label="Close advertisement">✕</button>
          </div>
        </div>
      )}

      <main className="jp-page">

        {/* HERO */}
        <div className="jp-hero">
          <div className="jp-hero-inner">
            <h1>Bihar Polytechnic Exam 2026<br />Complete Official Guide + Free PYQ Papers</h1>
            <p className="jp-hero-desc">
              BCECEB DCECE 2026 — eligibility, Class 10 syllabus, exam pattern, important dates,
              8 years of free PYQ papers (2018–2025) and free online practice — all in one place.
            </p>
            <div className="jp-hero-pills">
              <span className="jp-hero-pill">2h 15m Exam</span>
              <span className="jp-hero-pill">OMR Offline</span>
              <span className="jp-hero-pill">No Negative Marking</span>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 980, padding: "0 14px" }} className="mx-auto">

          {/* STAT STRIP */}
          <div className="jp-stat-strip">
            {[
              { val: "90", label: "Total Questions" },
              { val: "450", label: "Total Marks" },
              { val: "2h 15m", label: "Duration" },
              { val: "23 May", label: "Exam Date 2026" },
            ].map((s, i) => (
              <div className="jp-stat" key={i}>
                <div className="jp-stat-val">{s.val}</div>
                <div className="jp-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* AD — after stat strip */}
          <div style={{ margin: "20px 0", minHeight: 0 }}>
            <AdBanner slot="2434542863" />
          </div>

          {/* 1. HIGHLIGHTS */}
          <div className="jp-section" id="exam-info">
            <SectionHead
              label="About the Exam"
              title="Exam Highlights"
              sub="Bihar Polytechnic (DCECE) is a state-level entrance conducted by BCECEB for admission to Diploma Engineering colleges across Bihar."
            />
            <div className="jp-card">
              <div className="jp-card-header"><div className="jp-card-icon">📋</div><h3 className="jp-card-title">At a Glance — Official 2026 Data</h3></div>
              <div className="jp-card-body" style={{ padding: 0 }}>
                <table className="jp-highlights-table">
                  <tbody>{highlights.map((h, i) => <tr key={i}><td>{h.label}</td><td>{h.value}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
          </div>
          <Sep />

          {/* 2. PATTERN */}
          <div className="jp-section" id="pattern">
            <SectionHead label="Exam Pattern" title="Subject-wise Distribution" sub="All three subjects carry equal weightage — 30 questions and 150 marks each. Syllabus is Matric (Class 10) level." />
            <div className="jp-subjects-grid" style={{ marginBottom: 12 }}>
              {subjects.map((s, i) => (
                <div className="jp-subject-card" key={i} style={{ background: s.bg, borderColor: s.border }}>
                  <div className="jp-subject-card-left">
                    <span className="jp-subject-icon">{s.icon}</span>
                    <span className="jp-subject-name" style={{ color: s.color }}>{s.name}</span>
                  </div>
                  <div className="jp-subject-card-right">
                    <div className="jp-subject-stat"><span style={{ color: s.color }}>{s.questions}</span> Qs</div>
                    <div className="jp-subject-stat"><span style={{ color: s.color }}>{s.marks}</span> Marks</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="jp-marking-grid">
              <div className="jp-marking-card" style={{ background: "#ecfdf5", borderColor: "#6ee7b7" }}><div className="jp-marking-emoji">✅</div><div className="jp-marking-val" style={{ color: "#059669" }}>+5</div><div className="jp-marking-label">Correct Answer</div></div>
              <div className="jp-marking-card" style={{ background: "#fee2e2", borderColor: "#fca5a5" }}><div className="jp-marking-emoji">❌</div><div className="jp-marking-val" style={{ color: "#dc2626" }}>0</div><div className="jp-marking-label">Wrong Answer — No Deduction</div></div>
              <div className="jp-marking-card" style={{ background: "#f9fafb", borderColor: "#e5e7eb" }}><div className="jp-marking-emoji">⬜</div><div className="jp-marking-val" style={{ color: "#6b7280" }}>0</div><div className="jp-marking-label">Unattempted</div></div>
            </div>
            <div className="jp-info-alert">
              <span className="jp-info-alert-icon">⚠️</span>
              <span><strong>No negative marking:</strong> DCECE PE में गलत उत्तर पर कोई mark नहीं काटा जाता — कोई भी question खाली मत छोड़ो।</span>
            </div>
          </div>
          <Sep />

          {/* 3. ELIGIBILITY */}
          <div className="jp-section" id="eligibility">
            <SectionHead label="Who Can Apply" title="Eligibility Criteria 2026" sub="Official eligibility as per the BCECEB DCECE 2026 notification." />
            <div className="jp-elig-grid">
              {eligibility.map((e, i) => (
                <div className="jp-elig-card" key={i}>
                  <div className="jp-elig-icon">{e.icon}</div>
                  <div><p className="jp-elig-title">{e.title}</p><p className="jp-elig-desc">{e.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
          <Sep />

          {/* 4. FEE */}
          <div className="jp-section" id="fee">
            <SectionHead label="Fees" title="Application Fee 2026" />
            <div className="jp-card">
              <div className="jp-card-body" style={{ padding: 0 }}>
                <table className="jp-fee-table">
                  <thead><tr><th>Category</th><th style={{ textAlign: "center" }}>Application Fee</th></tr></thead>
                  <tbody>{applicationFee.map((f, i) => <tr key={i}><td>{f.category}</td><td style={{ textAlign: "center" }} className="jp-fee-val">{f.fee}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
            <p style={{ fontSize: "0.76rem", color: "var(--muted)", marginTop: 8 }}>
              * Fee is charged per course combination — applying for PE only = ₹750 (General / OBC / EBC) or ₹480 (SC / ST / PwD). Paid online; non-refundable.
            </p>
          </div>
          <Sep />

          {/* 5. DATES */}
          <div className="jp-section" id="dates">
            <SectionHead
              label="Schedule"
              title="Important Dates 2026"
              sub="Official dates from BCECEB DCECE 2026 notification. Always verify latest updates at bceceboard.bihar.gov.in."
            />
            <div className="jp-dates-list">
              {importantDates.map((d, i) => (
                <div className={`jp-date-item${d.highlight ? " jp-date-item--highlight" : ""}`} key={i}>
                  <span className="jp-date-event">{d.event}</span>
                  <span className="jp-date-val">{d.date}</span>
                </div>
              ))}
            </div>
          </div>
          <Sep />

          {/* 6. HOW TO APPLY */}
          <div className="jp-section" id="apply">
            <SectionHead
              label="Application Process"
              title="How to Apply Online — Step by Step"
              sub="Official 3-step online application process as per the BCECEB DCECE 2026 notification."
            />
            <div className="jp-steps-list">
              {onlineApplicationSteps.map((s, i) => (
                <div className="jp-step-card" key={i}>
                  <div className="jp-step-num">{i + 1}</div>
                  <div>
                    <p className="jp-step-title">{s.icon} {s.title}</p>
                    <p className="jp-step-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="jp-info-alert">
              <span className="jp-info-alert-icon">⚠️</span>
              <span>
                <strong>Important:</strong> Application form का printout BCECEB Board Office को भेजने की जरूरत नहीं है। 3-4 copies अपने पास रखें।
                Photo Edited नहीं होनी चाहिए — Edited photo पर application reject होगा।
              </span>
            </div>
          </div>
          <Sep />

          {/* AD — after apply steps */}
          <div className="jp-scard" style={{ padding: "8px", minHeight: 0 }}>
            <AdBanner slot="3636692323" format="auto" />
          </div>

          {/* 7. DOCUMENTS */}
          <div className="jp-section" id="documents">
            <SectionHead
              label="Counselling Documents"
              title="Documents Required at Interview / Counselling"
              sub="Original documents + self-attested copies mandatory. Xerox/Fax copies alone will NOT be accepted."
            />
            <div className="jp-docs-list">
              {documentsRequired.map((doc, i) => (
                <div className="jp-doc-item" key={i}>
                  <span className="jp-doc-icon">📄</span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>
          <Sep />

          {/* 8. TIE-BREAKING */}
          <div className="jp-section" id="merit">
            <SectionHead
              label="Merit List"
              title="Tie-Breaking Rules (Official)"
              sub="If two or more candidates score equal marks, the merit rank is decided in this order — as per the official DCECE 2026 notification and BCECEB rules:"
            />
            <div className="jp-card">
              <div className="jp-card-body" style={{ padding: 0 }}>
                <table className="jp-tie-table">
                  <thead>
                    <tr><th>Priority</th><th>Condition</th><th>Resolution</th></tr>
                  </thead>
                  <tbody>
                    {tieBreakingRules.map((r, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 800, color: "var(--blue)" }}>#{r.rank}</td>
                        <td>{r.condition}</td>
                        <td style={{ fontWeight: 600 }}>{r.resolution}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="jp-info-alert">
              <span className="jp-info-alert-icon">💡</span>
              <span><strong>Strategy tip:</strong> Rank कुल marks (450 में से) पर आधारित है और negative marking नहीं है — इसलिए हर question attempt करो, Maths पर extra focus दो।</span>
            </div>
          </div>
          <Sep />

          {/* AD — after tie-breaking */}
          <div className="jp-scard" style={{ padding: "8px", minHeight: 0 }}>
            <AdBanner slot="6242297060" format="auto" />
          </div>

          {/* 9. RESERVATION */}
          <div className="jp-section" id="reservation">
            <SectionHead
              label="Reservation Policy"
              title="Category-wise Reservation"
              sub="Seat allocation as per Government of Bihar reservation rules and the BCECEB DCECE 2026 notification."
            />
            <div className="jp-card">
              <div className="jp-card-body" style={{ padding: 0 }}>
                <table className="jp-res-table">
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
              * Percentages follow Government of Bihar reservation rules; EBC / BC candidates must produce a Non-Creamy Layer certificate.
              Certificates must be issued by the competent authority and produced in original at document verification.
            </p>
          </div>
          <Sep />

          {/* 10. SYLLABUS */}
          <div className="jp-section" id="syllabus">
            <SectionHead
              label="What to Study"
              title="Polytechnic Exam Syllabus 2026 (Official)"
              sub="Matric / Secondary (Class 10) level — Physics, Chemistry & Mathematics as per the BSEB / NCERT Class 10 syllabus."
            />
            <div className="jp-syllabus-grid">
              {syllabusSummary.map((sub, i) => (
                <div className="jp-syllabus-card" key={i}>
                  <div className="jp-syllabus-header" style={{ background: sub.color }}>
                    <span>{sub.icon}</span>
                    <span>{sub.subject}</span>
                    <span className="jp-syllabus-level">{sub.level}</span>
                  </div>
                  <div className="jp-syllabus-topics">
                    {sub.topics.map((t, j) => <div className="jp-syllabus-topic" key={j}>{t}</div>)}
                  </div>
                </div>
              ))}
            </div>
            <div className="jp-info-alert">
              <span className="jp-info-alert-icon">📌</span>
              <span>
                यह syllabus directly BCECEB official portal से लिया गया है। Topics Class 10 से थोड़े आगे तक जाते हैं —
                इसलिए NCERT के साथ-साथ state board की secondary level books भी refer करो।
              </span>
            </div>
          </div>
          <Sep />

          {/* AD — between syllabus and PYQ */}
          <div style={{ margin: "20px 0", minHeight: 0 }}>
            <AdBanner slot="8729236906" format="fluid" layout="in-article" />
          </div>

          {/* 11. PYQ */}
          <div className="jp-section" id="pyq">
            <SectionHead label="Free Question Papers" title="Bihar Polytechnic PYQ Papers (2018–2025)" />
            <div className="jp-pyq-feature">
              <div className="jp-pyq-feature-inner">
                <span className="jp-pyq-tag"><span className="jp-pyq-tag-dot" />📄 Download Polytechnic Question Paper PDF — Free</span>
                <h3>8 साल के Official PYQ Papers — Bihar Polytechnic (DCECE)</h3>
                <p className="jp-pyq-feature-desc">
                  Polytechnic exam में पुराने papers से questions repeat होते हैं। 2018–2025 के सभी official
                  question papers यहाँ download करो — Physics, Chemistry और Maths तीनों के — completely free।
                  यह सबसे important resource है exam crack करने के लिए।
                </p>
                <div className="jp-pyq-table-wrap">
                  <table className="jp-pyq-table">
                    <thead><tr><th>Year</th><th>Paper Name</th><th>Subjects</th><th>Download &amp; Preview</th></tr></thead>
                    <tbody>
                      {pyqPapers.map((p, i) => (
                        <tr key={i}>
                          <td><strong style={{ color: "#0d6efd", fontSize: "1rem" }}>{p.year}</strong></td>
                          <td>
                            <Link
                              href={`/resources/bihar-polytechnic/pdf?year=${p.year}&subject=DCECE%20Question%20Paper`}
                              style={{ color: "#0f172a", fontWeight: 600, textDecoration: "none" }}
                              className="hover:text-emerald-600 transition-colors"
                            >
                              Polytechnic DCECE {p.year}
                            </Link>
                          </td>
                          <td style={{ color: "#64748b", fontSize: "0.78rem" }}>Phy · Chem · Maths</td>
                          <td>
                            {p.driveUrl ? (
                              <Link
                                href={`/resources/bihar-polytechnic/pdf?year=${p.year}&subject=DCECE%20Question%20Paper`}
                                className="jp-dl-btn"
                                aria-label={`Read and Download Bihar Polytechnic ${p.year} Question Paper PDF`}
                              >
                                📥 Download PDF
                              </Link>
                            ) : (
                              <button className="jp-dl-btn" disabled>⏳ Coming Soon</button>
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
          <div className="jp-section" id="practice">
            <SectionHead label="Online Mock Test" title="Practice Polytechnic Online — Free PYQ Practice" />
            <div className="jp-practice-banner">
              <div className="jp-practice-inner">
                <h3>Practice Bihar Polytechnic PYQs (2018–2025) Online</h3>
                <p className="jp-practice-desc">
                  Futurely पर 2018–2025 के सभी Polytechnic PYQ questions online attempt करो — timer के साथ,
                  instant score के साथ, और detailed solution के साथ। Subject-wise या year-wise
                  practice करो — जैसे चाहो।
                </p>
                <div className="jp-practice-feats">
                  {["PYQ-based Questions", "Year-wise Sets", "Instant Solutions", "Score Tracking", "Free Forever"].map((feat, i) => (
                    <div className="jp-practice-feat" key={i}><div className="jp-pf-dot" />{feat}</div>
                  ))}
                </div>
                <div className="jp-practice-btns">
                  <Link href="/exam-preparation/bihar-polytechnic" className="jp-start-btn-wrap">
                    <span className="jp-practice-btn-primary">🚀 Start Preparation Now — Free</span>
                  </Link>
                  <Link href="/test-series" className="jp-practice-btn-secondary">📝 Full Mock Test</Link>
                </div>
              </div>
            </div>
          </div>
          <Sep />

          {/* AD — after practice section */}
          <div className="jp-scard" style={{ padding: "8px", minHeight: 0 }}>
            <AdBanner slot="6484121014" format="auto" />
          </div>

          {/* 13. TIPS */}
          <div className="jp-section" id="preparation">
            <SectionHead label="Strategy" title="How to Prepare for Polytechnic 2026" sub="Practical tips based on official exam pattern and previous years' question trends." />
            <div className="jp-tips-grid" style={{ marginBottom: 20 }}>
              {preparationTips.map((t, i) => (
                <div className="jp-tip-card" key={i}><span className="jp-tip-icon">{t.icon}</span><span>{t.tip}</span></div>
              ))}
            </div>

            <p className="jp-section-label" style={{ marginBottom: 12 }}>Recommended Daily Schedule</p>
            <div className="jp-card" style={{ marginBottom: 14 }}>
              <div className="jp-card-body">
                {[
                  { time: "7:00 – 9:00 AM", activity: "Theory reading (BSEB / NCERT Class 10 — Physics, Chemistry, Maths)", icon: "📖" },
                  { time: "10:00 AM – 12:00 PM", activity: "Practice MCQs from PYQ papers (2018–2025)", icon: "✏️" },
                  { time: "2:00 – 4:00 PM", activity: "Mock tests with OMR sheet practice — time yourself strictly", icon: "📝" },
                  { time: "5:00 – 6:30 PM", activity: "Revision — formulas, short notes, error analysis", icon: "🔁" },
                ].map((slot, i, arr) => (
                  <div className="jp-slot" key={i} style={i === arr.length - 1 ? { borderBottom: "none", marginBottom: 0, paddingBottom: 0 } : {}}>
                    <span className="jp-slot-icon">{slot.icon}</span>
                    <div><p className="jp-slot-time">{slot.time}</p><p className="jp-slot-label">{slot.activity}</p></div>
                  </div>
                ))}
              </div>
            </div>

            <p className="jp-section-label" style={{ marginBottom: 12 }}>Recommended Books</p>
            <div className="jp-card">
              <div className="jp-card-body">
                {[
                  { subject: "Physics", books: "BSEB + NCERT Class 10 Science (Physics chapters), Lakhmir Singh & Manjit Kaur Class 10 Science Part 1" },
                  { subject: "Chemistry", books: "BSEB + NCERT Class 10 Science (Chemistry chapters), Lakhmir Singh & Manjit Kaur Class 10 Science Part 1 & 2" },
                  { subject: "Mathematics", books: "NCERT Class 10 Mathematics, R.D. Sharma Class 10, RS Aggarwal Class 10" },
                ].map((b, i, arr) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", paddingBottom: i < arr.length - 1 ? 14 : 0, marginBottom: i < arr.length - 1 ? 14 : 0, borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <span style={{ fontSize: "0.68rem", fontWeight: 800, background: "var(--blue)", color: "#fff", borderRadius: 6, padding: "3px 8px", flexShrink: 0, marginTop: 2 }}>{b.subject}</span>
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
          <div className="jp-section" id="faq">
            <SectionHead label="FAQ" title="Frequently Asked Questions" sub="Common doubts about Bihar Polytechnic DCECE 2026, answered based on official prospectus." />
            {faqs.map((faq, i) => (
              <div className={"jp-faq-item" + (openFaq === i ? " jp-faq-item--open" : "")} key={i}>
                <button className="jp-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                  <span className="jp-faq-q">{faq.q}</span>
                  <span className="jp-faq-chevron">▾</span>
                </button>
                {openFaq === i && <div className="jp-faq-ans">{faq.a}</div>}
              </div>
            ))}
          </div>
          <Sep />

          {/* OFFICIAL STRIP */}
          <div style={{ paddingTop: 24 }}>
            <div className="jp-official-strip">
              <div className="jp-official-text">
                <h3>Official Website – BCECE Board, Bihar</h3>
                <p>Apply online, download admit card, check results & counselling schedule at the official portal.</p>
              </div>
              <a href="https://bceceboard.bihar.gov.in" target="_blank" rel="noopener noreferrer" className="jp-official-link">
                🌐 bceceboard.bihar.gov.in
              </a>
            </div>
          </div>

          {/* RELATED */}
          <div className="jp-related-grid">
            <Link href="/resources/bihar-polytechnic/lateral-entry" className="jp-related-link"><span>🎓 Bihar Polytechnic Lateral Entry (DECE LE) Guide</span><span>›</span></Link>
            <Link href="/resources/bihar-btech-lateral/exam-information" className="jp-related-link"><span>📙 Bihar B.Tech Lateral (BCECE LE) Guide</span><span>›</span></Link>
            <Link href="/exam-preparation/bihar-polytechnic" className="jp-related-link"><span>🎯 Practice Polytechnic MCQs Online</span><span>›</span></Link>
            <Link href="/exam-preparation" className="jp-related-link"><span>📄 Bihar Exam Preparation Hub</span><span>›</span></Link>
            <Link href="/resources/bihar" className="jp-related-link"><span>📚 All Bihar Resources</span><span>›</span></Link>
          </div>

          <p className="jp-disclaimer">
            All information is sourced from the official BCECEB DCECE 2026 notification and official notices.
            Always verify latest updates at{" "}
            <a href="https://bceceboard.bihar.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "var(--blue)" }}>
              bceceboard.bihar.gov.in
            </a>.
            Futurely is not affiliated with BCECEB or the Government of Bihar.
          </p>

        </div>
      </main>
    </div>
  );
}