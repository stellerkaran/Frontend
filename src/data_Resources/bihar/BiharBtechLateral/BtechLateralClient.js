"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdBanner from "@/components/AdBanner";
import Image from "next/image";

const highlights = [
  { label: "Exam Name", value: "BCECE [LE] — Bihar Combined Entrance Competitive Examination (Lateral Entry)" },
  { label: "Conducting Body", value: "BCECE Board (BCECEB), Patna" },
  { label: "Exam Level", value: "State-Level Entrance" },
  { label: "Admission To", value: "2nd Year B.Tech / B.E. (Direct Lateral Entry) in Bihar Engineering Colleges" },
  { label: "Exam Mode", value: "Offline – OMR Based (Pen & Paper)" },
  { label: "Exam Timing", value: "As printed on the Admit Card (shift-wise)" },
  { label: "Duration", value: "2 Hours 15 Minutes (135 Minutes)" },
  { label: "Total Questions", value: "150 MCQs (50 each — Mathematics, Engineering Mechanics, English)" },
  { label: "Total Marks", value: "600 Marks (4 Marks per Question)" },
  { label: "Marking Scheme", value: "+4 for correct, –1 for wrong, 0 for unattempted" },
  { label: "Question Type", value: "Objective (Multiple Choice) — Bilingual Hindi & English" },
  { label: "Medium", value: "Hindi & English (Bilingual)" },
  { label: "Age Limit", value: "Minimum 18 years as on 31 December of the examination year (degree course)" },
  { label: "Minimum Qualification", value: "Diploma in Engg & Tech with 45% (40% reserved) / B.Sc with 45% + Maths in 10+2" },
];

const subjects = [
  { name: "Engineering Mathematics", icon: "📐", questions: 50, marks: 200, color: "#f59e0b", bg: "#fffbeb", border: "#fde68a", level: "Diploma Level" },
  { name: "Engineering Mechanics", icon: "⚙️", questions: 50, marks: 200, color: "#3b82f6", bg: "#eff6ff", border: "#bfdbfe", level: "Diploma Level" },
  { name: "Technical English", icon: "📖", questions: 50, marks: 200, color: "#10b981", bg: "#ecfdf5", border: "#a7f3d0", level: "Diploma Level" },
];

const eligibility = [
  {
    icon: "🎓",
    title: "Diploma Holders (Engineering)",
    desc: "Passed a THREE year / TWO year (Lateral Entry) Diploma in ANY branch of Engineering and Technology with at least 45% marks (40% for reserved category candidates) from a recognised institution. Final-year diploma students may also apply.",
  },
  {
    icon: "🔬",
    title: "B.Sc Graduates",
    desc: "B.Sc degree from a recognised university with at least 45% marks (40% for reserved category) and Mathematics as a subject in the 10+2 examination is an accepted pathway for lateral entry into B.Tech.",
  },
  {
    icon: "⚙️",
    title: "B.Voc / D.Voc Graduates",
    desc: "Candidates who have passed B.Voc or the 3-year D.Voc stream in the same or allied sector are also eligible to apply for lateral entry admission.",
  },
  {
    icon: "📍",
    title: "Bihar Domicile Required",
    desc: "Applicants must be Indian citizens whose parents are natives of Bihar (or fall under the other residence conditions listed by BCECEB — state government / central government employees posted in Bihar etc.). A valid Bihar residence certificate is mandatory at counselling.",
  },
  {
    icon: "⏳",
    title: "Appearing Candidates",
    desc: "Candidates currently appearing in the qualifying examination may also apply, but must produce the passing certificate before the counselling / interview date, otherwise they will not be considered eligible for admission.",
  },
  {
    icon: "🔧",
    title: "Eligible Engineering Branches",
    desc: "All branches of the Engineering & Technology Diploma are accepted — including CSE, Electrical, Mechanical, ECE, Civil, Chemical and other allied engineering streams.",
  },
];

const importantDates = [
  { event: "Application Form Release (Online)", date: "9 April 2026" },
  { event: "Last Date to Apply (Online)", date: "7 May 2026" },
  { event: "Last Date to Pay Application Fee", date: "8 May 2026" },
  { event: "Application Correction Window", date: "10 – 11 May 2026" },
  { event: "Admit Card Download", date: "23 May 2026" },
  { event: "Exam Date", date: "31 May 2026 (Sunday)" },
  { event: "Exam Timing / Shift", date: "As printed on the Admit Card" },
  { event: "Exam Centers", date: "Bihar के जिला मुख्यालय — centre printed on the Admit Card" },
  { event: "Result / Rank Card", date: "As per BCECEB Announcement" },
  { event: "Counselling (Choice Filling)", date: "As per BCECEB Schedule" },
];

const applicationFee = [
  { category: "All Categories (General / OBC / EBC / SC / ST / PwD)", fee: "₹2,200" },
  { category: "Mode of Payment", fee: "Online — Debit / Credit Card, Net Banking, UPI" },
  { category: "Fee Refund", fee: "Non-refundable" },
];

const onlineApplicationSteps = [
  {
    step: "Step 1",
    title: "Registration & Form Filling",
    desc: "Visit bceceboard.bihar.gov.in → click 'Online Portal of BCECE[LE]-2026'. Register with mobile number and e-mail, then fill Personal Details, Educational Details (Diploma branch, passing year, marks / B.Sc details) and Communication Address. Log in with the generated credentials to complete the form.",
    icon: "📝",
  },
  {
    step: "Step 2",
    title: "Photograph & Signature Upload",
    desc: "Upload a recent colour photograph carrying your name and date as prescribed by BCECEB, together with a scanned signature in the prescribed format. Preview the entire form before final submission — editing is allowed only in the notified window (10–11 May 2026).",
    icon: "📷",
  },
  {
    step: "Step 3",
    title: "Application Fee Payment",
    desc: "Pay the application fee of ₹2,200 (same for all categories) online through Net Banking, Debit Card, Credit Card or UPI. After successful payment, download and print the confirmation page for future reference. Fee is non-refundable.",
    icon: "💳",
  },
];

const documentsRequired = [
  "Matriculation / Class 10 Marksheet & Passing Certificate",
  "Intermediate / 10+2 Marksheet (for candidates qualifying through the B.Sc route)",
  "Diploma all-semester marksheets, provisional certificate & passing certificate",
  "Bihar Local Resident / Domicile Certificate issued by the competent authority",
  "Caste Certificate — SC / ST / EBC / BC (if claiming reservation) + Non-Creamy Layer certificate where applicable",
  "EWS Income & Assets Certificate (if claiming EWS)",
  "PwD / Divyang Certificate from a Government Hospital (if applicable)",
  "BCECE [LE] 2026 Admit Card and Rank Card",
  "Provisional Seat Allotment Letter & Document Verification Slip (after counselling)",
  "Migration Certificate, Aadhaar Card, recent colour photographs and signature",
];

const tieBreakingRules = [
  { rank: "1", condition: "Total BCECE [LE] marks (out of 600) not equal", resolution: "Candidate with the higher total marks gets the higher merit rank" },
  { rank: "2", condition: "Total marks equal", resolution: "Inter-se merit decided as per the official BCECE [LE] 2026 prospectus / BCECEB rules" },
  { rank: "3", condition: "Merit list finalised", resolution: "BCECEB publishes the Rank Card on bceceboard.bihar.gov.in" },
  { rank: "4", condition: "Counselling stage", resolution: "Merit-wise online choice filling and seat allotment conducted by BCECEB" },
];

const syllabusSummary = [
  {
    subject: "Engineering Mathematics",
    icon: "📐",
    color: "#f59e0b",
    bg: "#fffbeb",
    level: "Diploma Level",
    topics: [
      "Solid Geometry — coordinates, lines, planes, spheres & quadrics",
      "Differential Calculus — limits, continuity, differentiation, maxima-minima",
      "Integral Calculus — definite & improper integrals, Beta & Gamma functions",
      "Differential Equations — first & second order, exact & Bernoulli forms",
      "Vector Calculus — gradient, curl, divergence, Green, Gauss & Stokes theorem",
      "Matrices — rank, inverse, eigen values & eigen vectors",
      "Fourier Series & Infinite Series",
      "Numerical Analysis & Statistics",
    ],
  },
  {
    subject: "Engineering Mechanics",
    icon: "⚙️",
    color: "#3b82f6",
    bg: "#eff6ff",
    level: "Diploma Level",
    topics: [
      "Force Systems, Resultant & Equilibrium",
      "Trusses, Beams, Shear Force & Bending Moment Diagrams",
      "Friction — belt, ladder and screw friction",
      "Centroid, Centre of Pressure & Moment of Inertia",
      "Kinematics of Particles and Rigid Bodies",
      "Work, Energy, Power & Impulse-Momentum",
      "Simple Machines — lever, pulley, screw jack",
      "Simple Stress, Strain & Material Properties",
    ],
  },
  {
    subject: "Technical English",
    icon: "📖",
    color: "#10b981",
    bg: "#ecfdf5",
    level: "Diploma Level",
    topics: [
      "Grammar — tenses, subject-verb agreement, articles & prepositions",
      "Vocabulary — synonyms, antonyms, one-word substitutions & idioms",
      "Sentence Correction & Rearrangement",
      "Active & Passive Voice, Direct & Indirect Narration",
      "Comprehension — unseen passages (general + technical)",
      "Technical Writing — letter, report & paragraph writing",
      "Word Meanings in technical contexts",
      "Common errors in Engineering English usage",
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
  { icon: "📅", tip: "Syllabus BCECEB की BCECE[LE] 2026 notification पर आधारित है — diploma level की Mathematics, Mechanics और English की textbooks से शुरू करो।" },
  { icon: "📝", tip: "2021-2025 के सभी PYQs solve करो — pattern repeat होता है और कई questions दोबारा आते हैं।" },
  { icon: "⏱️", tip: "OMR sheet की practice mock tests में करो — bubbling mistakes से marks जाते हैं, चाहे answer सही ही क्यों न हो।" },
  { icon: "🎯", tip: "150 questions के लिए सिर्फ 2 घंटे 15 मिनट मिलते हैं — पहले आसान questions करो, tough ones बाद के लिए छोड़ो।" },
  { icon: "🔁", tip: "Final 2 weeks में formulas, theorems और mechanics के standard results रोज़ revise करो — recall speed ही score बनाती है।" },
  { icon: "📊", tip: "Negative marking (–1) लागू है — doubtful questions में blind guess मत करो; 50 questions का Mathematics section सबसे scoring है।" },
];

const faqs = [
  {
    q: "Bihar B.Tech Lateral (BCECE LE) exam क्या है?",
    a: "BCECE [LE] — Bihar Combined Entrance Competitive Examination (Lateral Entry) — को BCECE Board (BCECEB), Patna आयोजित करता है। यह diploma और B.Sc holders को Bihar के सरकारी व निजी Engineering Colleges में B.Tech / B.E. के दूसरे वर्ष (2nd Year) में direct lateral entry दिलाती है।",
  },
  {
    q: "BCECE LE 2026 exam date और timing क्या है?",
    a: "BCECE [LE] 2026 की परीक्षा 31 May 2026 (Sunday) को होगी। Application form 9 April 2026 को जारी हुआ और last date 7 May 2026 थी, fee जमा करने की अंतिम तारीख 8 May और correction window 10-11 May 2026 थी। Admit card 23 May 2026 को जारी हुआ। Shift और timing admit card पर दी जाती है।",
  },
  {
    q: "Exam pattern क्या है? कितने questions आते हैं?",
    a: "परीक्षा offline OMR mode में होती है — कुल 150 MCQs: Engineering Mathematics 50, Engineering Mechanics 50 और Technical English 50। कुल 600 marks (हर सही उत्तर पर +4) और गलत उत्तर पर –1 की negative marking लागू है। Duration 2 घंटे 15 मिनट और भाषा Hindi और English दोनों है।",
  },
  {
    q: "Eligibility क्या है? Diploma के बाद apply कर सकते हैं?",
    a: "हाँ। किसी भी branch का 3-year / 2-year diploma (Engineering & Technology) minimum 45% marks (reserved category के लिए 40%) के साथ pass होना चाहिए। साथ ही B.Sc (45% + 10+2 में Maths) और B.Voc / 3-year D.Voc candidates भी eligible हैं। Appearing candidates भी apply कर सकते हैं।",
  },
  {
    q: "Age limit क्या है?",
    a: "Degree course (B.Tech lateral entry) में admission के लिए examination year की 31 December तक minimum age 18 years होनी चाहिए, जैसा कि BCECEB prospectus में दिया गया है।",
  },
  {
    q: "Application fee कितनी है?",
    a: "सभी categories (General / OBC / EBC / SC / ST / PwD) के लिए application fee ₹2,200 है। Fee केवल online mode में — Net Banking, Debit Card, Credit Card या UPI से — जमा होती है और non-refundable है।",
  },
  {
    q: "Merit list / Rank कैसे तय होता है?",
    a: "BCECEB Rank Card जारी करता है, जो परीक्षा में प्राप्त कुल marks (600 में से) पर आधारित होता है। उसके बाद merit के अनुसार online counselling — choice filling और seat allotment — होती है; दोनों की तारीखें bceceboard.bihar.gov.in पर घोषित होती हैं।",
  },
  {
    q: "Counselling में कौन से documents चाहिए?",
    a: "Counselling में चाहिए: 10th Marksheet, 12th Marksheet (B.Sc route वालों के लिए), Diploma के सभी semester marksheets और provisional certificate, Bihar Residence Certificate, Caste / EWS / PwD certificates (अगर applicable हो), BCECE [LE] का Admit Card और Rank Card, और seat allotment letter। Original documents + self-attested copies लेकर जाना अनिवार्य है।",
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

export default function BiharBtechLateralClient() {
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
              alt="Bihar B.Tech Lateral 2026 Full Test Series – Join on Futurely"
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
            <h1>Bihar B.Tech Lateral Exam 2026<br />Complete Official Guide + Free PYQ Papers</h1>
            <p>
              BCECE [LE] Lateral Entry (Engineering) 2026 — official eligibility, syllabus, exam pattern, important dates,
              5 years of free PYQ papers (2021–2025) and free online practice — all in one place.
            </p>
            <div className="d2d-hero-pills">
              <span className="d2d-hero-pill">2h 15m Exam</span>
              <span className="d2d-hero-pill">OMR Offline</span>
              <span className="d2d-hero-pill">–1 Negative</span>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 980, padding: "0 14px" }} className="mx-auto">

          {/* STAT STRIP */}
          <div className="d2d-stat-strip">
            {[
              { val: "150", label: "Total Questions" },
              { val: "600", label: "Total Marks" },
              { val: "2h 15m", label: "Duration" },
              { val: "31 May", label: "Exam Date 2026" },
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
              sub="Bihar B.Tech Lateral (BCECE LE) is a state-level entrance conducted by BCECEB for direct admission to B.Tech 2nd Year (Lateral Entry)."
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
            <SectionHead label="Exam Pattern" title="Subject-wise Distribution" sub="Based on the official BCECE[LE] 2026 notification — 50 questions and 200 marks in each of the three sections." />
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
              sub="Official eligibility as per the BCECEB BCECE[LE] 2026 notification — diploma, B.Sc and B.Voc pathways."
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
                Degree course में admission के लिए minimum 18 years age (31 December तक) ज़रूरी है। शारीरिक रूप से अक्षम candidates को enrolment के समय सरकारी अस्पताल से Medical Certificate प्रस्तुत करना अनिवार्य है।
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
              sub="Official dates from BCECEB 2026 notification — verify latest updates at bceceboard.bihar.gov.in."
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
              sub="Official 3-step process as per BCECEB 2026 Prospectus."
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
              sub="Seat allocation as per Government of Bihar reservation rules and the BCECEB BCECE[LE] 2026 notification."
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
              title="B.Tech Lateral Exam Syllabus 2026 (Official)"
              sub="Engineering Mathematics, Engineering Mechanics & Technical English — diploma level as per the official BCECEB BCECE[LE] syllabus."
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
                Syllabus diploma level का है — Engineering Mathematics, Engineering Mechanics और Technical English; NCERT Class 11–12 का नहीं। अपने Diploma textbooks से पढ़ें।
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
            <SectionHead label="Free Question Papers" title="Bihar B.Tech Lateral Previous Year Papers (2021–2025)" />
            <div className="d2d-pyq-feature">
              <div className="d2d-pyq-feature-inner">
                <span className="d2d-pyq-tag">
                  <span className="d2d-pyq-tag-dot" />📄 Download BCECE LE Question Paper PDF — Free
                </span>
                <h3>5 साल के Official PYQ Papers — BCECE Lateral Entry (BCECE LE)</h3>
                <p className="d2d-pyq-feature-desc">
                  BCECE LE exam में पुराने papers से questions repeat होते हैं। 2021–2025 के सभी official question papers यहाँ download करो —
                  Mathematics, Mechanics और English तीनों के — completely free।
                  यह सबसे important resource है BCECE LE crack करने के लिए।
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
                              href={`/resources/bihar-btech-lateral/pdf?year=${p.year}&subject=BCECE%20LE%20Question%20Paper`}
                              style={{ color: "#0f172a", fontWeight: 600, textDecoration: "none" }}
                              className="hover:text-blue-600 transition-colors"
                            >
                              BCECE LE Official Paper {p.year}
                            </Link>
                          </td>
                          <td style={{ color: "#64748b", fontSize: "0.78rem" }}>Maths · Mechanics · English</td>
                          <td>
                            {p.driveUrl ? (
                              <Link
                                href={`/resources/bihar-btech-lateral/pdf?year=${p.year}&subject=BCECE%20LE%20Question%20Paper`}
                                className="d2d-dl-btn"
                                aria-label={`Read and Download BCECE LE ${p.year} Question Paper PDF`}
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
            <SectionHead label="Online Mock Test" title="Practice B.Tech Lateral Online — Free" />
            <div className="d2d-practice-banner">
              <div className="d2d-practice-inner">
                <h3>Practice Bihar B.Tech Lateral PYQs (2021–2025) Online</h3>
                <p className="d2d-practice-desc">
                  Futurely पर 2021–2025 के सभी B.Tech Lateral PYQ questions online attempt करो — timer के साथ, instant score के साथ,
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
                  <Link href="/exam-preparation/bihar-btech-lateral" className="d2d-start-btn-wrap">
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
              title="How to Prepare for B.Tech Lateral 2026"
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
                  { time: "7:00 – 10:00 AM", activity: "Theory reading (Diploma-level Maths, Mechanics & English textbooks)", icon: "📖" },
                  { time: "11:00 AM – 1:00 PM", activity: "Practice MCQs from PYQ papers (2021–2025)", icon: "✏️" },
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
                  { subject: "Mathematics", books: "Engineering Mathematics (diploma level) — R.D. Sharma / Tata McGraw-Hill for calculus, matrices & vectors" },
                  { subject: "Mechanics", books: "Engineering Mechanics — S.S. Bhavikatti or R.K. Bansal for force systems, friction, centroid & SFD-BMD" },
                  { subject: "English", books: "Wren & Martin High School Grammar + previous years Technical English questions" },
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
              sub="Common doubts about Bihar B.Tech Lateral exam 2026, answered based on official prospectus."
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
            <Link href="/exam-preparation/bihar-btech-lateral" className="d2d-related-link">
              <span>🎯 BCECE LE Preparation Resources</span><span>›</span>
            </Link>
            <Link href="/exam-preparation" className="d2d-related-link">
              <span>🏛️ Exam Preparation Hub</span><span>›</span>
            </Link>
            <Link href="/resources/bihar" className="d2d-related-link">
              <span>📚 All Bihar Resources</span><span>›</span>
            </Link>
          </div>

          <p className="d2d-disclaimer">
            All information is sourced from the official BCECEB BCECE[LE] 2026 notification and prospectus. Always verify latest updates at{" "}
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