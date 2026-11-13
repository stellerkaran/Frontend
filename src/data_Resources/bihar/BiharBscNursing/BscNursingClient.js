"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdBanner from "@/components/AdBanner";
import Image from "next/image";

const highlights = [
  { label: "Exam Name", value: "BCECE 2026 — Bihar Combined Entrance Competitive Examination (PCB Group) for B.Sc. Nursing" },
  { label: "Conducting Body", value: "BCECE Board (BCECEB), Patna" },
  { label: "Exam Level", value: "State-Level Entrance" },
  { label: "Admission To", value: "4-year B.Sc. Nursing in Government & Private Nursing Colleges across Bihar" },
  { label: "Exam Mode", value: "Offline – OMR Based (Pen & Paper)" },
  { label: "Exam Timing", value: "As printed on the Admit Card (shift-wise — 30 & 31 May 2026)" },
  { label: "Duration", value: "90 Minutes per Subject Paper (Physics, Chemistry, Biology)" },
  { label: "Total Questions", value: "300 MCQs (100 each — Physics, Chemistry, Biology)" },
  { label: "Total Marks", value: "1200 Marks (4 Marks per Question)" },
  { label: "Marking Scheme", value: "+4 for correct, –1 for wrong, 0 for unattempted" },
  { label: "Question Type", value: "Objective (Multiple Choice) — Bilingual Hindi & English" },
  { label: "Medium", value: "Hindi & English (Bilingual)" },
  { label: "Age Limit", value: "Minimum 17 years as on 31 December 2026 (no upper age limit)" },
  { label: "Minimum Qualification", value: "10+2 (PCB) with English — 45% General, 40% SC/ST/OBC aggregate" },
];

const subjects = [
  { name: "Physics (Bhautik Vigyan)", icon: "⚛️", questions: 100, marks: 400, color: "#3b82f6", bg: "#eff6ff", border: "#bfdbfe", level: "Class 11–12 (NCERT) Level" },
  { name: "Chemistry (Rasayan Vigyan)", icon: "🧪", questions: 100, marks: 400, color: "#10b981", bg: "#ecfdf5", border: "#a7f3d0", level: "Class 11–12 (NCERT) Level" },
  { name: "Biology (Jeev Vigyan)", icon: "🧬", questions: 100, marks: 400, color: "#f59e0b", bg: "#fffbeb", border: "#fde68a", level: "Class 11–12 (NCERT) Level" },
];

const eligibility = [
  {
    icon: "📗",
    title: "10+2 with PCB & English",
    desc: "Passed — or appearing in 2026 — the Intermediate / 10+2 examination with Physics, Chemistry, Biology and English from a recognised board. General candidates need 45% aggregate marks; SC / ST / OBC candidates need 40% aggregate. The passing certificate must be produced at counselling.",
  },
  {
    icon: "📍",
    title: "Bihar Domicile Required",
    desc: "Applicants must be Indian citizens and permanent residents of Bihar. A valid Bihar Local Resident (Domicile) Certificate issued by the competent authority is mandatory at counselling — without it no Bihar seat is offered under the state quota.",
  },
  {
    icon: "🎂",
    title: "Minimum 17 Years (No Upper Age)",
    desc: "Candidates must complete 17 years of age on or before 31 December 2026. There is no upper age limit for the B.Sc. Nursing entrance as per the official BCECE 2026 notification.",
  },
  {
    icon: "🩺",
    title: "Medical Fitness & Verification",
    desc: "Candidates shortlisted in the merit list must appear for document verification and submit a Medical Fitness Certificate issued by a Registered Medical Practitioner before final admission. PwD / Divyang reservation requires a certificate from a Government hospital.",
  },
];

const importantDates = [
  { event: "Application Form Release (Online)", date: "5 May 2026" },
  { event: "Last Date to Apply (Online)", date: "13 May 2026 (Re-extended)" },
  { event: "Last Date to Pay Application Fee", date: "10 May 2026 (11:59 PM)" },
  { event: "Application Correction Window", date: "11 – 12 May 2026" },
  { event: "Admit Card Download", date: "22 May 2026" },
  { event: "Exam Date", date: "30 & 31 May 2026" },
  { event: "Exam Timing / Shift", date: "As printed on the Admit Card" },
  { event: "Exam Centers", date: "Bihar के जिला मुख्यालय — centre printed on the Admit Card" },
  { event: "Result / Rank Card", date: "As per BCECEB Announcement" },
  { event: "Counselling (Choice Filling)", date: "As per BCECEB Schedule" },
];

const applicationFee = [
  { category: "General / BC / EBC", fee: "₹1,000" },
  { category: "SC / ST / DQ (Divyang)", fee: "₹500" },
  { category: "Mode of Payment", fee: "Online — Debit / Credit Card, Net Banking, UPI" },
  { category: "Fee Refund", fee: "Non-refundable" },
];

const onlineApplicationSteps = [
  {
    step: "Step 1",
    title: "Registration & Form Filling",
    desc: "Visit bceceboard.bihar.gov.in → BCECE 2026 Online Portal. Register with mobile number and e-mail, then fill Personal Details, Educational Details (10+2 PCB marks, passing year / appearing status) and Communication Address. Log in with the generated credentials to complete the form before the last date (13 May 2026, re-extended).",
    icon: "📝",
  },
  {
    step: "Step 2",
    title: "Photograph & Signature Upload",
    desc: "Upload a recent colour photograph carrying your name and date as prescribed by BCECEB, together with a scanned signature in the prescribed format. Preview the entire form before final submission — editing is allowed only in the notified correction window (11–12 May 2026).",
    icon: "📷",
  },
  {
    step: "Step 3",
    title: "Application Fee Payment",
    desc: "Pay the application fee — ₹1,000 for General / BC / EBC and ₹500 for SC / ST / DQ candidates — online through Net Banking, Debit Card, Credit Card or UPI. After successful payment, download and print the confirmation page for future reference. Fee is non-refundable.",
    icon: "💳",
  },
];

const documentsRequired = [
  "Matriculation / Class 10 Marksheet & Passing Certificate (date of birth proof)",
  "Intermediate / 10+2 Marksheet & Passing Certificate — Physics, Chemistry, Biology & English",
  "Bihar Local Resident / Domicile Certificate issued by the competent authority",
  "Caste Certificate — SC / ST / BC / EBC (if claiming reservation) + Non-Creamy Layer certificate where applicable",
  "EWS Income & Assets Certificate (if claiming EWS)",
  "PwD / Divyang Certificate from a Government Hospital (if applicable)",
  "Medical Fitness Certificate from a Registered Medical Practitioner",
  "BCECE 2026 Admit Card and Rank Card",
  "Provisional Seat Allotment Letter & Document Verification Slip (after counselling)",
  "Migration Certificate, Aadhaar Card, recent colour photographs and signature",
];

const tieBreakingRules = [
  { rank: "1", condition: "Total BCECE marks (out of 1200) not equal", resolution: "Candidate with the higher total marks gets the higher merit rank" },
  { rank: "2", condition: "Total marks equal", resolution: "Inter-se merit decided as per the official BCECE 2026 prospectus / BCECEB rules (subject-wise marks considered)" },
  { rank: "3", condition: "Merit list finalised", resolution: "BCECEB publishes the Rank Card on bceceboard.bihar.gov.in" },
  { rank: "4", condition: "Counselling stage", resolution: "Merit-wise online choice filling and seat allotment conducted by BCECEB" },
];

const syllabusSummary = [
  {
    subject: "Physics",
    icon: "⚛️",
    color: "#3b82f6",
    bg: "#eff6ff",
    level: "Class 11–12",
    topics: [
      "Units & Measurements, Kinematics, Laws of Motion",
      "Work, Energy, Power, Rotational Motion & Gravitation",
      "Properties of Matter, Thermodynamics & Kinetic Theory",
      "Oscillations & Waves (SHM, sound waves)",
      "Electrostatics, Current Electricity & Magnetism",
      "Electromagnetic Induction & Alternating Current",
      "Optics — Ray & Wave optics, dual nature of matter",
      "Atoms, Nuclei & Semiconductor Devices",
    ],
  },
  {
    subject: "Chemistry",
    icon: "🧪",
    color: "#10b981",
    bg: "#ecfdf5",
    level: "Class 11–12",
    topics: [
      "Some Basic Concepts of Chemistry & Atomic Structure",
      "Chemical Bonding, Molecular Structure & p-Block Elements",
      "States of Matter, Thermodynamics & Equilibrium",
      "Redox Reactions, Electrochemistry & Chemical Kinetics",
      "s-Block, d & f-Block Elements, Coordination Compounds",
      "Haloalkanes, Haloarenes, Alcohols, Phenols & Ethers",
      "Aldehydes, Ketones, Carboxylic Acids & Amines",
      "Biomolecules, Polymers & Chemistry in Everyday Life",
    ],
  },
  {
    subject: "Biology",
    icon: "🧬",
    color: "#f59e0b",
    bg: "#fffbeb",
    level: "Class 11–12",
    topics: [
      "The Living World, Biological Classification & Plant Kingdom",
      "Cell — Unit of Life, Biomolecules & Cell Cycle",
      "Human Physiology — digestion, respiration, circulation, excretion",
      "Plant Physiology — photosynthesis, transport, growth hormones",
      "Reproduction — flowering plants & human reproductive system",
      "Genetics & Evolution — heredity, molecular basis of inheritance",
      "Biology & Human Welfare, Biotechnology & its applications",
      "Ecology — ecosystem, biodiversity & environmental issues",
    ],
  },
];

const pyqPapers = [
  { year: "2025", driveUrl: null },
  { year: "2024", driveUrl: null },
  { year: "2023", driveUrl: null },
  { year: "2022", driveUrl: null },
  { year: "2021", driveUrl: null },
];

const preparationTips = [
  { icon: "📚", tip: "Syllabus NCERT Class 11–12 का PCB (Physics, Chemistry, Biology) है — NCERT textbooks को ही core बनाओ, हर chapter के examples और back-exercises solve करो।" },
  { icon: "📝", tip: "2021-2025 के सभी PYQs solve करो — pattern repeat होता है और कई questions दोबारा आते हैं, खासकर Biology और Chemistry में।" },
  { icon: "⏱️", tip: "हर subject के लिए सिर्फ 90 minutes मिलते हैं (100 questions) — mock tests में timer लगाकर practice करो, पहले आसान questions करो।" },
  { icon: "🎯", tip: "Negative marking (–1) लागू है — doubtful questions में blind guess मत करो; Biology (400 marks) सबसे scoring section है, उस पर पहले command बनाओ।" },
  { icon: "🔁", tip: "Final 2 weeks में Biology diagrams, Chemistry named reactions और Physics formulas रोज़ revise करो — recall speed ही score बनाती है।" },
  { icon: "⏱️", tip: "OMR sheet की practice mock tests में करो — bubbling mistakes से marks जाते हैं, चाहे answer सही ही क्यों न हो।" },
];

const faqs = [
  {
    q: "Bihar B.Sc. Nursing exam क्या है?",
    a: "BCECE 2026 (PCB Group) — Bihar Combined Entrance Competitive Examination — को BCECE Board (BCECEB), Patna आयोजित करता है। इस exam के माध्यम से Bihar के सरकारी व निजी nursing colleges में 4-year B.Sc. Nursing course में admission होता है।",
  },
  {
    q: "BCECE Nursing 2026 exam date और timing क्या है?",
    a: "BCECE 2026 की परीक्षा 30 और 31 May 2026 को होगी। Application form 5 May 2026 को जारी हुआ और last date 13 May 2026 (re-extended) थी, correction window 11-12 May 2026 थी। Admit card 22 May 2026 को जारी हुआ। Shift और timing admit card पर दी जाती है।",
  },
  {
    q: "Exam pattern क्या है? कितने questions आते हैं?",
    a: "परीक्षा offline OMR mode में होती है — कुल 300 MCQs: Physics 100, Chemistry 100 और Biology 100। कुल 1200 marks (हर सही उत्तर पर +4) और गलत उत्तर पर –1 की negative marking लागू है। हर subject के लिए 90 minutes का अलग paper होता है और भाषा Hindi और English दोनों है।",
  },
  {
    q: "Eligibility क्या है? 10+2 में कितने marks चाहिए?",
    a: "10+2 (Intermediate) में Physics, Chemistry, Biology और English के साथ pass होना चाहिए — General के लिए 45% aggregate और SC/ST/OBC के लिए 40% aggregate अनिवार्य है। Appearing candidates भी apply कर सकते हैं, लेकिन counselling से पहले passing certificate देना होगा। साथ ही Bihar का domicile certificate भी ज़रूरी है।",
  },
  {
    q: "Age limit क्या है?",
    a: "न्यूनतम 17 वर्ष — 31 December 2026 तक (exam year के अंत तक)। कोई upper age limit नहीं है, जैसा BCECE 2026 official notification में दिया गया है।",
  },
  {
    q: "Application fee कितनी है?",
    a: "General / BC / EBC candidates के लिए ₹1,000 और SC / ST / DQ (Divyang) candidates के लिए ₹500 है। Fee केवल online — Net Banking, Debit Card, Credit Card या UPI — से जमा होती है और non-refundable है।",
  },
  {
    q: "Merit list / Rank कैसे तय होता है?",
    a: "BCECEB Rank Card जारी करता है, जो परीक्षा में प्राप्त कुल marks (1200 में से) पर आधारित होता है। दोनों के marks equal होने पर inter-se merit official prospectus के अनुसार तय होती है। उसके बाद merit के अनुसार online counselling — choice filling और seat allotment — होती है।",
  },
  {
    q: "Counselling में कौन से documents चाहिए?",
    a: "Counselling में चाहिए: 10th Marksheet, 12th (10+2 PCB) Marksheet & Passing Certificate, Bihar Residence Certificate, Caste / EWS / PwD certificates (अगर applicable हो), Medical Fitness Certificate, BCECE 2026 का Admit Card और Rank Card, और seat allotment letter। Original documents + self-attested copies लेकर जाना अनिवार्य है।",
  },
];

const reservationCategories = [
  { category: "SC (Scheduled Caste)", seats: "16% of seats as per Government of Bihar reservation rules" },
  { category: "ST (Scheduled Tribe)", seats: "1% of seats as per Government of Bihar reservation rules" },
  { category: "EBC (Extremely Backward Class)", seats: "18% of seats - Non-Creamy Layer certificate mandatory" },
  { category: "BC (Backward Class)", seats: "15% of seats - Non-Creamy Layer certificate mandatory" },
  { category: "EWS (Economically Weaker Section)", seats: "10% of unreserved seats - family income below ₹8 lakh/year" },
  { category: "PwD / Divyang", seats: "4% horizontal reservation - certificate from a Government hospital" },
];

const SectionHead = ({ label, title, sub }) => (
  <div style={{ marginBottom: 20 }}>
    <span className="d2d-section-label">{label}</span>
    <h2 className="d2d-section-title">{title}</h2>
    {sub && <p className="d2d-section-sub">{sub}</p>}
  </div>
);

const Sep = () => <div className="d2d-sep" />;

export default function BiharBscNursingClient() {
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
              src="/bannerPoly.png"
              alt="Bihar B.Sc. Nursing 2026 Full Test Series – Join on Futurely"
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
            <h1>Bihar B.Sc. Nursing Exam 2026<br />Complete Official Guide + Free PYQ Papers</h1>
            <p>
              BCECE 2026 (PCB Group) B.Sc. Nursing — official eligibility, NCERT Class 11–12 syllabus, exam pattern, important dates,
              5 years of free PYQ papers (2021–2025) and free online practice — all in one place.
            </p>
            <div className="d2d-hero-pills">
              <span className="d2d-hero-pill">90m per Subject</span>
              <span className="d2d-hero-pill">OMR Offline</span>
              <span className="d2d-hero-pill">1200 Marks</span>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 980, padding: "0 14px" }} className="mx-auto">

          {/* STAT STRIP */}
          <div className="d2d-stat-strip">
            {[
              { val: "300", label: "Total Questions" },
              { val: "1200", label: "Total Marks" },
              { val: "90m", label: "Per Subject" },
              { val: "30 May", label: "Exam Date 2026" },
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
              sub="Bihar B.Sc. Nursing (BCECE PCB Group) is a state-level entrance conducted by BCECEB for admission to 4-year B.Sc. Nursing courses across Bihar."
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
            <SectionHead label="Exam Pattern" title="Subject-wise Distribution" sub="Based on the official BCECE 2026 (PCB) notification — 100 questions and 400 marks in each of the three subjects, 90 minutes per paper." />
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
                <div className="d2d-marking-val" style={{ color: "#059669" }}>+4</div>
                <div className="d2d-marking-label">Correct Answer</div>
              </div>
              <div className="d2d-marking-card" style={{ background: "#fee2e2", borderColor: "#fca5a5" }}>
                <div className="d2d-marking-emoji">❌</div>
                <div className="d2d-marking-val" style={{ color: "#dc2626" }}>−1</div>
                <div className="d2d-marking-label">Wrong Answer (–1 Mark)</div>
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
                <strong>Negative marking applies:</strong> गलत उत्तर पर –1 mark काटा जाता है — doubtful questions में blind guess से बचो।
              </span>
            </div>
          </div>

          <Sep />

          {/* ELIGIBILITY */}
          <div className="d2d-section" id="eligibility">
            <SectionHead
              label="Who Can Apply"
              title="Eligibility Criteria 2026"
              sub="Official eligibility as per the BCECE 2026 notification — 10+2 PCB with English, Bihar domicile and 17 years minimum age."
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
                न्यूनतम 17 वर्ष आयु (31 December 2026 तक) अनिवार्य है और कोई upper age limit नहीं है। Document verification के समय Medical Fitness Certificate और Bihar domicile certificate प्रस्तुत करना अनिवार्य है।
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
              sub="Official dates from BCECE 2026 notification (form re-extended to 13 May) — verify latest updates at bceceboard.bihar.gov.in."
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
              sub="Official 3-step process as per the BCECEB BCECE 2026 notification."
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
                <strong>Important:</strong> Application form का printout BCECEB Board Office को भेजने की कोई जरूरत नहीं है। केवल अपने पास 3-4 copies रख लें। Photo Edited नहीं होनी चाहिए अन्यथा application reject होगा।
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
                <strong>Strategy tip:</strong> Biology सबसे ज़्यादा marks (400) का section है — पहले Biology पर command बनाओ, फिर Chemistry और Physics के numericals practice करो।
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
              sub="Seat allocation as per Government of Bihar reservation rules and the BCECE 2026 (B.Sc. Nursing) notification."
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
              * EBC / BC candidates को Creamy Layer certificate के साथ caste certificate देना अनिवार्य है।
              Certificates competent authority द्वारा issued होने चाहिए — counselling में original और self-attested copies दोनों लेकर जाएँ।
            </p>
          </div>

          <Sep />

          {/* SYLLABUS */}
          <div className="d2d-section" id="syllabus">
            <SectionHead
              label="What to Study"
              title="B.Sc. Nursing Exam Syllabus 2026 (Official)"
              sub="Physics, Chemistry & Biology — NCERT Class 11–12 level as per the official BCECE 2026 (PCB Group) syllabus."
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
                Syllabus NCERT Class 11–12 का है — Physics, Chemistry और Biology (PCB group); diploma level का नहीं। अपनी NCERT textbooks से पढ़ें।
                Full official syllabus: <a href="https://bceceboard.bihar.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "var(--blue)" }}>bceceboard.bihar.gov.in</a>
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
            <SectionHead label="Free Question Papers" title="Bihar B.Sc. Nursing Previous Year Papers (2021–2025)" />
            <div className="d2d-pyq-feature">
              <div className="d2d-pyq-feature-inner">
                <span className="d2d-pyq-tag">
                  <span className="d2d-pyq-tag-dot" />📄 Download BCECE Nursing Question Paper PDF — Free
                </span>
                <h3>5 साल के Official PYQ Papers — BCECE B.Sc. Nursing (PCB)</h3>
                <p className="d2d-pyq-feature-desc">
                  BCECE Nursing exam में पुराने papers से questions repeat होते हैं। 2021–2025 के सभी official question papers यहाँ download करो —
                  Physics, Chemistry और Biology तीनों के — completely free।
                  यह सबसे important resource है Bihar B.Sc. Nursing crack करने के लिए।
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
                              href={`/resources/bihar-bsc-nursing/pdf?year=${p.year}&subject=B.Sc.%20Nursing%20Question%20Paper`}
                              style={{ color: "#0f172a", fontWeight: 600, textDecoration: "none" }}
                              className="hover:text-blue-600 transition-colors"
                            >
                              BCECE Nursing Official Paper {p.year}
                            </Link>
                          </td>
                          <td style={{ color: "#64748b", fontSize: "0.78rem" }}>Physics · Chemistry · Biology</td>
                          <td>
                            {p.driveUrl ? (
                              <Link
                                href={`/resources/bihar-bsc-nursing/pdf?year=${p.year}&subject=B.Sc.%20Nursing%20Question%20Paper`}
                                className="d2d-dl-btn"
                                aria-label={`Read and Download Bihar B.Sc. Nursing ${p.year} Question Paper PDF`}
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
            <SectionHead label="Online Mock Test" title="Practice B.Sc. Nursing Online — Free" />
            <div className="d2d-practice-banner">
              <div className="d2d-practice-inner">
                <h3>Practice Bihar B.Sc. Nursing PYQs (2021–2025) Online</h3>
                <p className="d2d-practice-desc">
                  Futurely पर 2021–2025 के सभी B.Sc. Nursing PYQ questions online attempt करो — timer के साथ, instant score के साथ,
                  और detailed solution के साथ। Subject-wise या year-wise practice करो — जैसे चाहो।
                </p>
                <div className="d2d-practice-feats">
                  {["PYQ-based Questions", "Year-wise Sets", "Instant Solutions", "Score Tracking", "Free Forever"].map((feat, i) => (
                    <div className="d2d-practice-feat" key={i}>
                      <div className="d2d-pf-dot" />{feat}
                    </div>
                  ))}
                </div>
                <div className="d2d-practice-btns">
                  <Link href="/exam-preparation/bihar-bsc-nursing" className="d2d-start-btn-wrap">
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
              title="How to Prepare for B.Sc. Nursing 2026"
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
                  { time: "7:00 – 10:00 AM", activity: "Theory reading (NCERT Class 11–12 Physics, Chemistry & Biology)", icon: "📖" },
                  { time: "11:00 AM – 1:00 PM", activity: "Practice MCQs from PYQ papers (2021–2025)", icon: "✏️" },
                  { time: "2:00 – 4:00 PM", activity: "Mock tests with OMR sheet practice — timing yourself (90 min/subject)", icon: "📝" },
                  { time: "5:00 – 7:00 PM", activity: "Revision — Biology diagrams, formulas, short notes, error analysis", icon: "🔁" },
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
                  { subject: "Physics", books: "NCERT Class 11 & 12 Physics — H.C. Verma (Concepts of Physics) for numericals on mechanics, electricity & optics" },
                  { subject: "Chemistry", books: "NCERT Class 11 & 12 Chemistry — O.P. Tandon / Morrison & Boyd for organic mechanisms and named reactions" },
                  { subject: "Biology", books: "NCERT Class 11 & 12 Biology (must-read line by line) + previous years' NEET-pattern practice books for MCQs" },
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
              sub="Common doubts about Bihar B.Sc. Nursing (BCECE PCB) exam 2026, answered based on official prospectus."
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
                <h3>Official Website – BCECE Board, Bihar</h3>
                <p>Apply online, download admit card, check results & counselling schedule at the official portal.</p>
              </div>
              <a
                href="https://bceceboard.bihar.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="d2d-official-link"
              >
                🌐 bceceboard.bihar.gov.in
              </a>
            </div>
          </div>

          {/* RELATED LINKS */}
          <div className="d2d-related-grid">
            <Link href="/resources/bihar-polytechnic/exam-information" className="d2d-related-link">
              <span>📗 Bihar Polytechnic Guide</span><span>›</span>
            </Link>
            <Link href="/exam-preparation/bihar-bsc-nursing" className="d2d-related-link">
              <span>🎯 B.Sc. Nursing Preparation Resources</span><span>›</span>
            </Link>
            <Link href="/exam-preparation" className="d2d-related-link">
              <span>🏛️ Exam Preparation Hub</span><span>›</span>
            </Link>
            <Link href="/resources/bihar" className="d2d-related-link">
              <span>📚 All Bihar Resources</span><span>›</span>
            </Link>
          </div>

          <p className="d2d-disclaimer">
            All information is sourced from the official BCECE 2026 (B.Sc. Nursing) notification and prospectus. Always verify latest updates at{" "}
            <a
              href="https://bceceboard.bihar.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--blue)" }}
            >
              bceceboard.bihar.gov.in
            </a>
            . Futurely is not affiliated with BCECEB or the Government of Bihar.
          </p>

        </div>
      </main>
    </div>
  );
}