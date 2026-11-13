/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container } from "react-bootstrap";
import AdBanner from "@/components/AdBanner";
import Image from "next/image";

/* ─────────────────────────────────────────────
   STATIC DATA — verified from official DECE LE 2026 portal screenshot + Prospectus
   KEY FIX: Level of Exam = 10th Standard (per official JCECEB table)
───────────────────────────────────────────── */
const highlights = [
  { label: "Exam Name", value: "DECE LE – Diploma Lateral Entry" },
  { label: "Full Form", value: "Diploma Entrance Competitive Examination (Lateral Entry)" },
  { label: "Conducting Body", value: "JCECEB, Jharkhand" },
  { label: "Admission To", value: "2nd Year / 3rd Semester – Diploma Engineering Colleges (Govt., Private & PPP Mode)" },
  { label: "Exam Mode", value: "Offline – OMR Based (Pen & Paper)" },
  { label: "Exam Timing", value: "02:30 PM – 04:30 PM" },
  { label: "Duration", value: "2 Hours (120 Minutes)" },
  { label: "Total Questions", value: "100 MCQs" },
  { label: "Total Marks", value: "100 Marks" },
  { label: "Marking Scheme", value: "+1 for correct, –0.25 for wrong, 0 for unattempted" },
  { label: "Question Type", value: "Objective (Multiple Choice) — Bilingual Hindi & English" },
  { label: "Syllabus Level", value: "10th Standard (Madhyamik / Secondary Level)" },
  { label: "Age Limit", value: "Min 17 years (as on 1 July 2025) for Mining Engineering only; No limit for other branches" },
  { label: "Minimum Qualification", value: "10+2 with PCM/relevant subjects OR 10th + 2-year ITI" },
  { label: "Exam Center", value: "Ranchi (Jila Mukhyalaya)" },
  { label: "Official Website", value: "jceceb.jharkhand.gov.in" },
];

const subjects = [
  {
    name: "Mathematics (Ganit)",
    icon: "📐",
    questions: 50,
    marks: 50,
    color: "#f59e0b",
    bg: "#fffbeb",
    border: "#fde68a",
    note: "10th Standard level",
  },
  {
    name: "Science (Vigyan)",
    icon: "🔬",
    questions: 50,
    marks: 50,
    color: "#3b82f6",
    bg: "#eff6ff",
    border: "#bfdbfe",
    note: "Physics + Chemistry — 10th Standard level",
  },
];

const eligibility = [
  {
    icon: "📘",
    title: "10+2 Pass — Science Stream",
    desc: "Candidate must have passed 10+2 with Physics / Mathematics / Chemistry / Computer Science / Electronics / Information Technology / Biology / Informatics Practices / Biotechnology / Technical Vocational subject / Agriculture / Engineering Graphics / Business Studies / Entrepreneurship as per AICTE Approval Process Handbook 2024-2027 (Table 8.4).",
  },
  {
    icon: "🔧",
    title: "10th + 2-Year ITI Certificate",
    desc: "Candidates who have passed Class 10th and completed a 2-year ITI (minimum 2 years duration) in a relevant trade are eligible for admission to 2nd Year Diploma Course in Any branch of Engineering and Technology. ITI of less than 2 years duration is NOT eligible.",
  },
  {
    icon: "📍",
    title: "Jharkhand Domicile Required",
    desc: "Only Indian citizens who are permanent residents or local residents (Sthaniya Niwasi) of Jharkhand State can apply. A valid local resident certificate (Sthaniya Niwasi Praman Patra) issued by the Anchal Adhikari / Anumandal Padadhikari / Upayukt of Jharkhand is mandatory at counselling.",
  },
  {
    icon: "🎂",
    title: "Age Limit — Mining Engineering Only",
    desc: "For the Mining Engineering branch only: minimum age of 17 years as on 1 July 2025 is required. No minimum or maximum age limit exists for all other Diploma Engineering branches.",
  },
];

const importantDates = [
  { event: "Application Form Release (Online)", date: "19 May 2026", highlight: false },
  { event: "Last Date to Apply (Online)", date: "12 June 2026", highlight: false },
  { event: "Application Correction Window", date: "13 – 14 June 2026", highlight: false },
  { event: "Admit Card Download", date: "4 Days Before Exam", highlight: false },
  { event: "Exam Date", date: "28 June 2026 (Sunday)", highlight: true },
  { event: "Exam Timing", date: "02:30 PM – 04:30 PM", highlight: true },
  { event: "Exam Center", date: "Ranchi (Jila Mukhyalaya)", highlight: false },
  { event: "Result Declaration", date: "July 2026 (Expected)", highlight: false },
  { event: "Counselling Process", date: "End of July 2026 (Expected)", highlight: false },
];

const applicationFee = [
  { category: "General / EWS / BC-I / BC-II", fee: "₹650" },
  { category: "SC / ST (All) / Female Candidates (All Categories)", fee: "₹325" },
  { category: "PwBD / Divyang Candidates (All Categories)", fee: "Exempted" },
];

const onlineApplicationSteps = [
  {
    title: "Registration",
    desc: "jceceb.jharkhand.gov.in पर जाएं → 'Click Here for All Online Application Submission – JCECEB 2026' पर Click करें → 'Diploma Entrance Competitive Examination (Lateral Entry) – 2026' link पर Click करें। उपलब्ध form में माँगी गई जानकारियाँ भरें। Password कम से कम 8 Character का बनाएं जिसमें कम से कम एक Capital Letter, एक Small Letter और एक Number हो। Login Id और Password को भविष्य के लिए सुरक्षित लिखकर रख लें।",
    icon: "📝",
  },
  {
    title: "Personal & Educational Details",
    desc: "अपना नाम, Father's Name, Mother's Name, Date of Birth, Gender, Residential Status, Category (यदि General कोटि के अन्तर्गत EWS में भी आते हैं तो EWS में 'Yes' करें), TFW, PwD, Annual Family Income, Muslim Community Quota, Nationality, e-mail Id, Mobile No., Communication Address भरें। Educational Details में Qualifying Examination के details भरें — Pass Status, Year of Passing/Appearing, Institute Name & Address, Board/University Name, Obtained Marks Percentage।",
    icon: "🖊️",
  },
  {
    title: "Upload Photo, Signature & LTI",
    desc: "JPG/JPEG Format में स्कैन किया हुआ हाल का रंगीन (Colour) फोटोग्राफ सफेद पृष्ठभूमि (White Background) जिसमें दोनों कान स्पष्ट रूप से दिखता हो — 10 KB से 50 KB। JPG/JPEG Format में स्कैन किया हुआ हस्ताक्षर — 05 KB to 50 KB। JPG/JPEG Format में स्कैन किया हुआ बायें हाथ का अंगूठे का निशान (LTI) — 10 KB to 50 KB। Edited photo पर application reject होगा।",
    icon: "📷",
  },
  {
    title: "Fee Payment",
    desc: "Payment पर Click करें। Bank Collect का screen आएगा — Credit Card / Debit Card / Net Banking / UPI से fee जमा करें। Successfully भुगतान के बाद website पर login करें और Confirmation Page का Print निकाल कर सुरक्षित रखें। प्राप्त आवेदन पत्र (confirmation page) को पर्षद कार्यालय भेजने की आवश्यकता नहीं है।",
    icon: "💳",
  },
];

const documentsRequired = [
  "माध्यमिक / 10वीं / समकक्ष परीक्षा का Admit Card, Marksheet एवं Passing Certificate (original + self-attested copy)",
  "10+2 परीक्षा का Marksheet एवं Passing Certificate (Physics/Maths/relevant subjects के साथ) — OR — 10th + 2-year ITI का Admit Card, Marksheet एवं Passing Certificate",
  "Jharkhand का Sthaniya Niwasi Praman Patra (Anchal Adhikari / Anumandal Padadhikari / Upayukt द्वारा जारी — Annexure 'ख' format में)",
  "Caste Certificate — SC/ST/BC-I/BC-II (Jharkhand government के authorized officer द्वारा जारी, Creamy Layer रहित) — if claiming reservation",
  "EWS Income & Assets Certificate (Anchal Adhikari / DM द्वारा जारी — dated within 1 year) — if claiming EWS",
  "PwBD / Divyang Certificate from District Hospital / Civil Surgeon + Full-size photograph — if applicable",
  "DECE LE 2026 Admit Card (mandatory at counselling) — JCECEB website से online download करें",
  "Recent Colour Photograph, Signature (self-attested copies)",
  "Anti-Ragging Affidavit (as prescribed by UGC — format on JCECEB website Downloads section)",
  "Muslim Community Quota Certificate — only for Al-Kabir Polytechnic, Jamshedpur applicants (if claiming MCQ)",
];

const syllabusSummary = [
  {
    subject: "Mathematics (Ganit)",
    icon: "📐",
    color: "#f59e0b",
    level: "10th Standard",
    topics: [
      "Real Numbers",
      "Polynomials",
      "Pair of Linear Equations in Two Variables",
      "Quadratic Equations",
      "Arithmetic Progressions (AP)",
      "Triangles — Similarity & Congruence",
      "Circles — Tangents & Chords",
      "Coordinate Geometry",
      "Introduction to Trigonometry",
      "Applications of Trigonometry (Heights & Distances)",
      "Areas Related to Circles",
      "Surface Areas & Volumes",
      "Statistics — Mean, Median, Mode",
      "Probability",
    ],
  },
  {
    subject: "Science — Physics Topics",
    icon: "⚛️",
    color: "#3b82f6",
    level: "10th Standard",
    topics: [
      "Motion — Distance, Speed, Velocity",
      "Laws of Motion — Newton's Laws",
      "Gravitation & Weight",
      "Work, Energy & Power",
      "Sound — Reflection & Range",
      "Light — Reflection at Curved Surfaces",
      "Light — Refraction & Lenses",
      "Human Eye & Optical Phenomena",
      "Electricity — Ohm's Law & Resistance",
      "Electric Circuits — Series & Parallel",
      "Magnetic Effects of Current",
      "Sources of Energy",
    ],
  },
  {
    subject: "Science — Chemistry Topics",
    icon: "🧪",
    color: "#10b981",
    level: "10th Standard",
    topics: [
      "Chemical Reactions & Equations",
      "Types of Chemical Reactions",
      "Acids, Bases & Salts",
      "pH Scale & Indicators",
      "Metals & Non-Metals",
      "Reactivity Series of Metals",
      "Carbon & its Compounds",
      "Functional Groups in Carbon Compounds",
      "Periodic Classification of Elements",
      "Corrosion & Rancidity",
      "Soaps & Detergents",
      "Our Environment — Chemical Aspects",
    ],
  },
];

const preparationTips = [
  { icon: "📅", tip: "NCERT Class 9 & 10 books से पढ़ो — official JCECEB portal के अनुसार LE का Level of Exam '10th Standard' है। Physics, Chemistry और Maths तीनों cover करो।" },
  { icon: "📝", tip: "Science paper में Physics और Chemistry दोनों के questions आते हैं। दोनों को equally prepare करो — 25-25 questions का rough distribution expect करो।" },
  { icon: "⏱️", tip: "Exam सिर्फ 2 घंटे का है और 100 questions हैं — speed important है। OMR bubbling practice करो ताकि time waste न हो।" },
  { icon: "🎯", tip: "Easy questions पहले attempt करो। 2-hour exam में time management crucial है — tough questions पर ज्यादा time मत दो।" },
  { icon: "🔁", tip: "Final 2 weeks में formulas और short notes daily revise करो — MCQ exam में recall speed matters।" },
  { icon: "📊", tip: "Mathematics पर extra focus दो — tie-breaking में merit list पहले 10+2 vs ITI stream देखती है, फिर date of birth।" },
];

const tieBreakingRules = [
  { rank: "1", condition: "Total Marks equal", resolution: "10+2 PCM stream candidates को ITI candidates से ऊपर रखा जाएगा" },
  { rank: "2", condition: "Step 1 equal", resolution: "पहले जन्म तिथि वाले candidate को priority (older candidate)" },
  { rank: "3", condition: "Steps 1 & 2 equal", resolution: "Candidate के प्रथम नाम का English alphabetical order" },
];

const faqs = [
  {
    q: "Jharkhand Polytechnic Lateral Entry (DECE LE) kya hai?",
    a: "DECE LE ek entrance exam hai jo JCECEB (Jharkhand Combined Entrance Competitive Examination Board) dwara aayojit hota hai. Iske through 10+2 (PCM ya relevant subjects) ya 10th + 2-year ITI pass candidates Diploma Engineering ke 2nd Year (3rd Semester) mein seedha admission le sakte hain — yani 1st year skip kar ke directly 2nd year mein jaate hain.",
  },
  {
    q: "DECE LE 2026 exam date aur timing kya hai?",
    a: "Official notification ke anusar, DECE LE 2026 exam 28 June 2026 (Sunday) ko aayojit hogi. Exam timing dopahar 02:30 PM se 04:30 PM tak hai, yani exam ki duration 2 ghante (120 minutes) hai. Exam center sirf Ranchi (Jila Mukhyalaya) hai.",
  },
  {
    q: "LE exam mein kitne subjects aur questions hote hain?",
    a: "Official JCECEB portal ke anusar, DECE LE 2026 exam mein 2 subjects hote hain — Mathematics (50 marks) aur Science (50 marks). Total 100 questions, 100 marks. Duration 2 ghante hai. Dono subjects ka level '10th Standard' hai — yahi JCECEB portal par officially mentioned hai.",
  },
  {
    q: "LE ka syllabus level kya hai — 10th ya 10+2?",
    a: "Official JCECEB portal par 'Scheme of Examination' table clearly mention karta hai ki dono subjects (Mathematics aur Science) ka 'Level of Exam' = '10th Standard' hai. Isliye NCERT Class 9 & 10 ki books se prepare karna sabse effective hai.",
  },
  {
    q: "Eligibility kya hai?",
    a: "Do tarike se eligible ho sakte ho: (1) 10+2 pass with Physics/Mathematics/Chemistry/Computer Science/Electronics/IT/Biology/relevant subjects as per AICTE Approval Process Handbook 2024-2027. (2) Class 10th ke baad 2-year ITI certificate (minimum 2 years, kam avadhi wala ITI eligible nahi). Jharkhand domicile bhi mandatory hai.",
  },
  {
    q: "Age limit kya hai?",
    a: "Mining Engineering branch ke liye minimum age 17 years (as on 1 July 2025) anivarya hai. Baaki sabhi Diploma Engineering branches ke liye koi minimum ya maximum age limit nahi hai.",
  },
  {
    q: "Negative marking hai kya?",
    a: "Haan. Sahi answer par +1 mark milta hai. Galat answer par –0.25 mark kate jaate hain. Unattempted questions par koi mark nahi kata jaata. Ek question mein ek se adhik vikalp bharne par galat mana jaayega aur –0.25 mark katenga.",
  },
  {
    q: "Application fee kitni hai?",
    a: "General/EWS/BC-I/BC-II candidates ke liye ₹650 aur SC/ST/Female candidates ke liye ₹325 hai. Divyang (PwBD) candidates ke liye fee exempt hai. Fee online mode mein — Credit Card, Debit Card, Net Banking ya UPI se — jama hoti hai. Fee non-refundable hai.",
  },
  {
    q: "Exam center kaun sa hai?",
    a: "DECE LE 2026 ka exam center sirf Ranchi (Jila Mukhyalaya) hai. PECE (regular Polytechnic) ke unlike, LE ka exam single center par hota hai. Exact center ke liye admit card check karo.",
  },
];

const pyqPapers = [
  { year: "2026", driveUrl: "https://drive.google.com/file/d/1CN--d9PUcNEqk6kG64TvGpjiNpHcxj9e/view" },
  { year: "2025", driveUrl: "https://drive.google.com/file/d/1Wu_ctdoQSf4k3tACSYGa47Qk70gUr8wQ/view" },
  { year: "2024", driveUrl: "https://drive.google.com/file/d/1VIlSqTnap8nhECdXse1jtGEx0JlFbCCW/view" },
  { year: "2023", driveUrl: "https://drive.google.com/file/d/1yQiVpCQa9kr4kYanBYbktq_m2x086xI-/view" },
  { year: "2022", driveUrl: "https://drive.google.com/file/d/1Yti8uFOVfQQ1uCuO6tp98gmkyyicJFcN/view" },
  { year: "2021", driveUrl: "https://drive.google.com/file/d/1j8419eOW8iKnZC4AyNahTLzK4LJREOaL/view" },
];

/* ─── JSON-LD Schemas ─── */
const faqSchemaData = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const courseSchema = {
  "@context": "https://schema.org", "@type": "Course",
  name: "Jharkhand Polytechnic Lateral Entry DECE LE 2027 Exam Preparation",
  description: "Complete guide for Jharkhand Polytechnic Lateral Entry DECE LE 2027 — 10th Standard syllabus, eligibility, exam pattern (100 MCQs — Mathematics + Science), important dates and online MCQ practice.",
  provider: { "@type": "Organization", name: "Futurely", sameAs: "https://www.futurely.in" },
  url: "https://www.futurely.in/resources/jharkhand-polytechnic/lateral-entry",
  educationalLevel: "Secondary",
  inLanguage: ["en", "hi"],
  isAccessibleForFree: true,
};
const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.futurely.in" },
    { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.futurely.in/resources" },
    { "@type": "ListItem", position: 3, name: "Jharkhand Polytechnic Lateral Entry 2026", item: "https://www.futurely.in/resources/jharkhand-polytechnic/lateral-entry" },
  ],
};

const SectionHead = ({ label, title, sub }) => (
  <div style={{ marginBottom: 20 }}>
    <span className="le-section-label">{label}</span>
    <h2 className="le-section-title">{title}</h2>
    {sub && <p className="le-section-sub">{sub}</p>}
  </div>
);
const Sep = () => <div className="le-sep" />;

/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
const JHPolytechnicLE = () => {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <style dangerouslySetInnerHTML={{ __html: `

        @keyframes leInfoBannerFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes leInfoBannerSlideUp { from { transform: translateY(40px) scale(0.96); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }

        .le-info-banner-overlay {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px);
          padding: 16px; box-sizing: border-box;
          animation: leInfoBannerFadeIn 0.3s ease;
        }
        .le-info-banner-wrapper {
          position: relative;
          width: min(340px, calc(100vw - 32px));
          aspect-ratio: 916 / 1717;
          max-height: calc(100vh - 80px);
          border-radius: 14px; overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,0.55);
          animation: leInfoBannerSlideUp 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .le-info-banner-wrapper img {
          width: 100%; height: 100%; object-fit: cover; display: block; cursor: pointer;
        }
        .le-info-banner-close {
          position: absolute; top: 10px; right: 10px;
          width: 32px; height: 32px; border: none; background: transparent;
          color: #efff; font-size: 25px; line-height: 1;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 10; transition: opacity 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .le-info-banner-close:hover { opacity: 0.7; }
        @media (max-width: 360px) {
          .le-info-banner-close { width: 28px; height: 28px; font-size: 18px; top: 8px; right: 8px; }
        }

        @keyframes btnBorderSpin {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes leDlGlow {
          0%   { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }

        .le-page {
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
        .le-hero {
          background: linear-gradient(155deg, #1e3a8a 0%, #1a56db 60%, #2563eb 100%);
          padding: 0px 16px 80px; text-align: center; position: relative; overflow: hidden;
        }
        .le-hero::before {
          content: ""; position: absolute; inset: 0;
          background: radial-gradient(circle at 15% 60%, rgba(255,255,255,0.08) 0%, transparent 45%),
                      radial-gradient(circle at 85% 20%, rgba(255,255,255,0.05) 0%, transparent 40%);
          pointer-events: none;
        }
        .le-hero-inner { position: relative; z-index: 1; max-width: 680px; margin: 0 auto; }
        .le-hero h1 {
          font-family: "Sora", sans-serif; font-size: clamp(1.55rem, 5vw, 2.3rem);
          font-weight: 800; color: #fff; margin-bottom: 12px; margin-top: 22px;
          line-height: 1.2; letter-spacing: -0.5px;
        }
        .le-hero-desc { font-size: clamp(0.9rem, 2.5vw, 1rem); color: rgba(255,255,255,0.82); line-height: 1.75; margin: 0 auto 20px; max-width: 560px; }
        .le-hero-pills { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
        .le-hero-pill { background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.22); border-radius: 999px; padding: 5px 14px; font-size: 0.76rem; font-weight: 600; color: #fff; }

        /* STAT STRIP */
        .le-stat-strip {
          display: grid; grid-template-columns: repeat(4, 1fr);
          background: var(--surface); border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md); overflow: hidden; margin-top: -36px; position: relative; z-index: 2;
        }
        @media (max-width: 600px) { .le-stat-strip { grid-template-columns: repeat(2, 1fr); } }
        .le-stat { text-align: center; padding: 18px 10px; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .le-stat:nth-child(4n) { border-right: none; }
        @media (max-width: 600px) {
          .le-stat:nth-child(2n) { border-right: none; }
          .le-stat:nth-child(3), .le-stat:nth-child(4) { border-bottom: none; }
        }
        .le-stat-val { font-family: "Sora", sans-serif; font-size: clamp(1.1rem,3vw,1.4rem); font-weight: 800; color: var(--blue); line-height: 1; margin-bottom: 4px; }
        .le-stat-label { font-size: clamp(0.66rem,1.5vw,0.75rem); color: var(--muted); font-weight: 600; }

        /* LAYOUT */
        .le-sep { height: 1px; background: var(--border); margin: 32px 0 0; }
        .le-section { padding-top: 28px; }
        .le-section-label { display: block; font-size: 0.68rem; font-weight: 800; letter-spacing: 1.6px; text-transform: uppercase; color: var(--blue); font-family: "Sora", sans-serif; margin-bottom: 5px; }
        .le-section-title { font-family: "Sora", sans-serif; font-size: clamp(1.05rem,3.5vw,1.35rem); font-weight: 800; color: var(--text); margin-bottom: 5px; letter-spacing: -0.3px; line-height: 1.3; }
        .le-section-sub { font-size: 0.88rem; color: var(--muted); line-height: 1.65; margin-bottom: 0; }

        /* CARD */
        .le-card { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-xs); }
        .le-card-header { display: flex; align-items: center; gap: 10px; padding: 13px 18px; border-bottom: 1px solid var(--border); background: var(--surface-2); }
        .le-card-icon { width: 30px; height: 30px; border-radius: 8px; background: var(--blue-lt); display: flex; align-items: center; justify-content: center; font-size: 0.95rem; flex-shrink: 0; }
        .le-card-title { font-family: "Sora", sans-serif; font-size: 0.88rem; font-weight: 800; color: var(--text); margin: 0; }
        .le-card-body { padding: 18px; }

        /* HIGHLIGHTS TABLE */
        .le-highlights-table { width: 100%; border-collapse: collapse; }
        .le-highlights-table tr { border-bottom: 1px solid var(--border); }
        .le-highlights-table tr:last-child { border-bottom: none; }
        .le-highlights-table td { padding: 10px 16px; font-size: 0.85rem; line-height: 1.5; vertical-align: top; }
        .le-highlights-table td:first-child { font-weight: 700; color: var(--text-2); width: 42%; }
        .le-highlights-table td:last-child { color: var(--text); }
        @media (max-width: 400px) { .le-highlights-table td { padding: 9px 12px; font-size: 0.81rem; } }

        /* OFFICIAL EXAM TABLE BADGE */
        .le-official-badge {
          display: inline-flex; align-items: center; gap: 5px;
          background: #ecfdf5; border: 1px solid #6ee7b7; border-radius: 999px;
          padding: 3px 10px; font-size: 0.7rem; font-weight: 700; color: #065f46;
          font-family: "Sora", sans-serif; margin-bottom: 12px;
        }
        .le-official-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #10b981; }

        /* SUBJECTS — 2 columns */
        .le-subjects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        @media (max-width: 520px) { .le-subjects-grid { grid-template-columns: 1fr; gap: 8px; } }
        .le-subject-card { border-radius: var(--radius-md); padding: 18px 16px; border: 1.5px solid; }
        .le-subject-top { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .le-subject-icon { font-size: 1.6rem; flex-shrink: 0; }
        .le-subject-name { font-family: "Sora", sans-serif; font-size: 0.92rem; font-weight: 800; line-height: 1.3; }
        .le-subject-note { font-size: 0.74rem; color: var(--muted); font-weight: 500; margin-top: 2px; }
        .le-subject-stats { display: flex; gap: 16px; }
        .le-subject-stat { font-size: 0.76rem; color: var(--muted); font-weight: 600; }
        .le-subject-stat span { font-family: "Sora", sans-serif; font-size: 1.05rem; font-weight: 800; display: block; margin-bottom: 1px; }

        /* OFFICIAL EXAM TABLE */
        .le-exam-table-wrap { border-radius: 12px; overflow: hidden; border: 1.5px solid var(--border); margin-top: 14px; }
        .le-exam-table { width: 100%; border-collapse: collapse; }
        .le-exam-table th { background: var(--blue); color: #fff; padding: 10px 16px; font-family: "Sora", sans-serif; font-size: 0.8rem; font-weight: 700; text-align: center; }
        .le-exam-table th:first-child { text-align: left; }
        .le-exam-table td { padding: 11px 16px; font-size: 0.85rem; border-bottom: 1px solid var(--border); color: var(--text-2); text-align: center; }
        .le-exam-table td:first-child { text-align: left; font-weight: 700; color: var(--text); }
        .le-exam-table tr:last-child td { border-bottom: none; }
        .le-exam-table tr:nth-child(even) td { background: var(--surface-2); }
        .le-exam-level-badge { display: inline-block; background: #eff6ff; color: var(--blue); border: 1px solid #bfdbfe; border-radius: 999px; padding: 2px 10px; font-size: 0.72rem; font-weight: 700; font-family: "Sora", sans-serif; }

        /* MARKING */
        .le-marking-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 12px; }
        .le-marking-card { border-radius: var(--radius-sm); padding: 14px 10px; text-align: center; border: 1.5px solid; }
        .le-marking-emoji { font-size: 1.1rem; margin-bottom: 4px; }
        .le-marking-val { font-family: "Sora", sans-serif; font-size: 1.05rem; font-weight: 800; margin-bottom: 3px; }
        .le-marking-label { font-size: 0.72rem; color: var(--muted); font-weight: 600; }

        /* INFO ALERT */
        .le-info-alert { display: flex; align-items: flex-start; gap: 10px; background: #fffbeb; border: 1.5px solid #fde68a; border-radius: var(--radius-sm); padding: 12px 14px; font-size: 0.82rem; color: #92400e; line-height: 1.6; margin-top: 10px; }
        .le-info-alert-icon { flex-shrink: 0; font-size: 1rem; }
        .le-info-blue { background: #eff6ff; border-color: #bfdbfe; color: #1e3a8a; }
        .le-info-green { background: #ecfdf5; border-color: #6ee7b7; color: #065f46; }

        /* ELIGIBILITY */
        .le-elig-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        @media (max-width: 520px) { .le-elig-grid { grid-template-columns: 1fr; } }
        .le-elig-card { background: var(--surface-2); border: 1.5px solid var(--border); border-radius: var(--radius-md); padding: 14px 16px; display: flex; gap: 11px; align-items: flex-start; }
        .le-elig-icon { font-size: 1.1rem; flex-shrink: 0; width: 34px; height: 34px; background: var(--surface); border-radius: 9px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); }
        .le-elig-title { font-family: "Sora", sans-serif; font-size: 0.83rem; font-weight: 700; color: var(--text); margin-bottom: 4px; }
        .le-elig-desc { font-size: 0.8rem; color: var(--muted); line-height: 1.6; margin: 0; }

        /* FEE TABLE */
        .le-fee-table { width: 100%; border-collapse: collapse; }
        .le-fee-table th { background: var(--blue); color: #fff; padding: 10px 16px; font-family: "Sora", sans-serif; font-size: 0.8rem; font-weight: 700; text-align: left; }
        .le-fee-table td { padding: 10px 16px; font-size: 0.85rem; border-bottom: 1px solid var(--border); color: var(--text-2); }
        .le-fee-table tr:last-child td { border-bottom: none; }
        .le-fee-table tr:nth-child(even) td { background: var(--surface-2); }
        .le-fee-val { font-weight: 800; font-family: "Sora", sans-serif; color: var(--blue); }

        /* DATES */
        .le-dates-list { display: flex; flex-direction: column; gap: 7px; }
        .le-date-item { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 11px 16px; background: var(--surface-2); border: 1.5px solid var(--border); border-radius: var(--radius-sm); }
        .le-date-item--highlight { border-color: rgba(26,86,219,0.3); background: #eff6ff; }
        .le-date-event { font-size: 0.84rem; font-weight: 600; color: var(--text-2); flex: 1; min-width: 0; }
        .le-date-val { font-size: 0.78rem; font-weight: 700; font-family: "Sora", sans-serif; color: var(--blue); background: var(--blue-lt); border-radius: 999px; padding: 3px 11px; white-space: nowrap; flex-shrink: 0; }
        @media (max-width: 480px) { .le-date-item { flex-wrap: wrap; gap: 6px; } .le-date-event { font-size: 0.81rem; } }

        /* STEPS */
        .le-steps-list { display: flex; flex-direction: column; gap: 12px; }
        .le-step-card { display: flex; gap: 14px; align-items: flex-start; background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); padding: 16px; }
        .le-step-num { width: 36px; height: 36px; border-radius: 50%; background: var(--blue); color: #fff; font-family: "Sora", sans-serif; font-size: 0.8rem; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .le-step-title { font-family: "Sora", sans-serif; font-size: 0.88rem; font-weight: 700; color: var(--text); margin-bottom: 5px; }
        .le-step-desc { font-size: 0.82rem; color: var(--muted); line-height: 1.65; margin: 0; }

        /* DOCUMENTS */
        .le-docs-list { display: flex; flex-direction: column; gap: 7px; }
        .le-doc-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 14px; background: var(--surface-2); border: 1.5px solid var(--border); border-radius: var(--radius-sm); font-size: 0.83rem; color: var(--text-2); line-height: 1.55; }
        .le-doc-icon { flex-shrink: 0; font-size: 0.9rem; margin-top: 1px; }

        /* TIE-BREAKING */
        .le-tie-table { width: 100%; border-collapse: collapse; }
        .le-tie-table th { background: var(--blue); color: #fff; padding: 9px 14px; font-family: "Sora", sans-serif; font-size: 0.78rem; font-weight: 700; text-align: left; }
        .le-tie-table td { padding: 10px 14px; font-size: 0.82rem; border-bottom: 1px solid var(--border); color: var(--text-2); }
        .le-tie-table tr:last-child td { border-bottom: none; }
        .le-tie-table tr:nth-child(even) td { background: var(--surface-2); }

        /* SYLLABUS */
        .le-syllabus-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        @media (max-width: 720px) { .le-syllabus-grid { grid-template-columns: 1fr; gap: 10px; } }
        .le-syllabus-card { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); overflow: hidden; }
        .le-syllabus-header { display: flex; align-items: center; gap: 8px; padding: 11px 15px; font-family: "Sora", sans-serif; font-size: 0.88rem; font-weight: 800; color: #fff; }
        .le-syllabus-level-badge { font-size: 0.68rem; background: rgba(255,255,255,0.2); border-radius: 999px; padding: 2px 8px; margin-left: auto; white-space: nowrap; }
        .le-syllabus-topics { padding: 10px 14px; }
        .le-syllabus-topic { display: flex; align-items: flex-start; gap: 7px; font-size: 0.8rem; color: var(--text-2); padding: 5px 0; border-bottom: 1px solid var(--border); line-height: 1.4; }
        .le-syllabus-topic:last-child { border-bottom: none; }
        .le-syllabus-topic::before { content: "›"; font-size: 0.85rem; font-weight: 700; flex-shrink: 0; margin-top: 1px; opacity: 0.5; }
        @media (max-width: 720px) { .le-syllabus-topics { display: grid; grid-template-columns: repeat(2, 1fr); padding: 10px 12px; } .le-syllabus-topic { padding: 4px 2px; } }
        @media (max-width: 380px) { .le-syllabus-topics { grid-template-columns: 1fr; } }

        /* PYQ FEATURE */
        .le-pyq-feature {
          background: linear-gradient(140deg, #1e3a8a 0%, #1a56db 55%, #2563eb 100%);
          border-radius: var(--radius-lg); padding: 28px 24px 26px; position: relative; overflow: hidden;
        }
        .le-pyq-feature::before { content: ""; position: absolute; top: -60px; right: -60px; width: 220px; height: 220px; border-radius: 50%; background: rgba(255,255,255,0.07); pointer-events: none; }
        .le-pyq-feature::after  { content: ""; position: absolute; bottom: -80px; left: -20px; width: 240px; height: 240px; border-radius: 50%; background: rgba(255,255,255,0.04); pointer-events: none; }
        .le-pyq-feature-inner { position: relative; z-index: 1; }
        .le-pyq-tag { display: flex; align-items: center; justify-content: center; gap: 6px; width: fit-content; margin: 0 auto 16px auto; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.28); border-radius: 999px; padding: 5px 14px; font-size: 0.75rem; font-weight: 700; color: #fff; font-family: "Sora", sans-serif; }
        .le-pyq-tag-dot { width: 7px; height: 7px; border-radius: 50%; background: #34d399; flex-shrink: 0; }
        .le-pyq-feature h3 { font-family: "Sora", sans-serif; font-size: clamp(1.1rem, 3.5vw, 1.45rem); font-weight: 800; color: #fff; margin-bottom: 7px; line-height: 1.25; }
        .le-pyq-feature-desc { font-size: 0.86rem; color: rgba(255,255,255,0.80); line-height: 1.65; margin-bottom: 22px; max-width: 540px; }
        .le-pyq-table-wrap { border-radius: 12px; overflow: hidden; border: 1px solid #c8d9f8; }
        .le-pyq-table { width: 100%; border-collapse: collapse; min-width: 300px; }
        .le-pyq-table th { background: #0d6efd; color: #fff; padding: 11px 16px; font-family: "Sora", sans-serif; font-size: 0.82rem; font-weight: 700; text-align: center; white-space: nowrap; }
        .le-pyq-table th:first-child { text-align: left; }
        .le-pyq-table td { background: #f9fbff; border: 1px solid #dce8ff; padding: 11px 16px; font-size: 0.86rem; text-align: center; color: #374151; vertical-align: middle; }
        .le-pyq-table tr:nth-child(even) td { background: #f0f6ff; }
        .le-pyq-table tr:last-child td { border-bottom: none; }
        .le-pyq-table td:first-child { text-align: left; font-weight: 700; }

        /* DOWNLOAD BUTTON */
        .le-dl-btn {
          position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 5px;
          background: linear-gradient(90deg, #0d6efd, #6610f2);
          color: #fff; border: none; border-radius: 8px; padding: 9px 18px;
          font-size: 0.82rem; font-weight: 700; font-family: "Sora", sans-serif;
          cursor: pointer; overflow: hidden; z-index: 1; white-space: nowrap; text-decoration: none;
        }
        .le-dl-btn::before { content: ""; position: absolute; inset: -2px; border-radius: 10px; background: linear-gradient(120deg, transparent, #00eaff, #6610f2, #00eaff, transparent); background-size: 300% 300%; animation: leDlGlow 2.5s linear infinite; z-index: -1; }
        .le-dl-btn::after { content: ""; position: absolute; inset: 2px; border-radius: 6px; background: linear-gradient(90deg, #0d6efd, #6610f2); z-index: -1; }
        .le-dl-btn:hover { opacity: 0.9; color: #fff; }
        .le-dl-btn:disabled { background: linear-gradient(90deg, #94a3b8, #64748b); cursor: not-allowed; opacity: 0.7; }
        .le-dl-btn:disabled::before { animation: none; background: none; }
        .le-dl-btn:disabled::after { background: linear-gradient(90deg, #94a3b8, #64748b); }
        @media (max-width: 480px) {
          .le-pyq-table th, .le-pyq-table td { padding: 9px 10px; font-size: 0.78rem; }
          .le-pyq-table th:nth-child(3), .le-pyq-table td:nth-child(3) { display: none; }
          .le-dl-btn { font-size: 0.84rem; padding: 8px 16px; }
        }

        /* PRACTICE BANNER */
        .le-practice-banner {
          position: relative; border-radius: var(--radius-lg); overflow: hidden;
          background: linear-gradient(140deg, #064e3b 0%, #065f46 45%, #047857 100%);
          padding: 28px 24px 26px;
        }
        .le-practice-banner::before { content: ""; position: absolute; top: -50px; right: -50px; width: 220px; height: 220px; border-radius: 50%; background: rgba(255,255,255,0.06); pointer-events: none; }
        .le-practice-banner::after  { content: ""; position: absolute; bottom: -70px; left: -10px; width: 200px; height: 200px; border-radius: 50%; background: rgba(255,255,255,0.04); pointer-events: none; }
        .le-practice-inner { position: relative; z-index: 1; }
        .le-practice-banner h3 { font-family: "Sora", sans-serif; font-size: clamp(1.1rem, 3.5vw, 1.45rem); font-weight: 800; color: #fff; margin-bottom: 7px; line-height: 1.25; }
        .le-practice-desc { font-size: 0.86rem; color: rgba(255,255,255,0.80); line-height: 1.65; margin-bottom: 20px; max-width: 540px; }
        .le-practice-feats { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 22px; }
        .le-practice-feat { display: flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; padding: 5px 12px; font-size: 0.77rem; font-weight: 600; color: rgba(255,255,255,0.92); }
        .le-pf-dot { width: 6px; height: 6px; border-radius: 50%; background: #34d399; flex-shrink: 0; }
        .le-practice-btns { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }
        .le-start-btn-wrap { display: inline-flex; padding: 2.5px; border-radius: calc(var(--radius-sm) + 2.5px); background: linear-gradient(270deg, #60a5fa, #a78bfa, #34d399, #fbbf24, #f472b6, #60a5fa); background-size: 400% 400%; animation: btnBorderSpin 3s ease infinite; text-decoration: none; transition: transform 0.18s, box-shadow 0.18s; }
        .le-start-btn-wrap:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.28); }
        .le-practice-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: #fff; color: #065f46; border-radius: var(--radius-sm); padding: 12px 22px; font-size: 0.9rem; font-weight: 800; font-family: "Sora", sans-serif; text-decoration: none; transition: background 0.18s, color 0.18s; }
        .le-start-btn-wrap:hover .le-practice-btn-primary { background: #ecfdf5; color: #064e3b; }
        .le-practice-btn-secondary { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.14); border: 1.5px solid rgba(255,255,255,0.3); border-radius: var(--radius-sm); padding: 12px 20px; font-size: 0.88rem; font-weight: 700; font-family: "Sora", sans-serif; color: #fff; text-decoration: none; transition: background 0.18s; }
        .le-practice-btn-secondary:hover { background: rgba(255,255,255,0.22); color: #fff; }
        @media (max-width: 540px) { .le-practice-btns { justify-content: center; align-items: center; } .le-start-btn-wrap, .le-practice-btn-secondary { margin-left: auto; margin-right: auto; } }

        /* TIPS */
        .le-tips-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 9px; }
        @media (max-width: 480px) { .le-tips-grid { grid-template-columns: 1fr; } }
        .le-tip-card { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-sm); padding: 13px 15px; display: flex; align-items: flex-start; gap: 10px; font-size: 0.83rem; color: var(--text-2); line-height: 1.55; }
        .le-tip-icon { font-size: 1rem; flex-shrink: 0; margin-top: 1px; }

        /* FAQ */
        .le-faq-item { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); margin-bottom: 7px; overflow: hidden; }
        .le-faq-item--open { border-color: rgba(26,86,219,0.3); }
        .le-faq-btn { width: 100%; border: none; background: transparent; text-align: left; display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 14px 18px; cursor: pointer; min-height: 50px; -webkit-tap-highlight-color: transparent; }
        .le-faq-q { font-family: "Sora", sans-serif; font-size: clamp(0.8rem,2vw,0.88rem); font-weight: 700; color: var(--text); line-height: 1.4; }
        .le-faq-chevron { flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%; background: var(--surface-2); color: var(--muted); font-size: 0.65rem; display: flex; align-items: center; justify-content: center; transition: transform 0.25s, background 0.2s, color 0.2s; }
        .le-faq-item--open .le-faq-chevron { transform: rotate(180deg); background: var(--blue); color: #fff; }
        .le-faq-ans { padding: 0 18px 14px; font-size: 0.84rem; color: var(--muted); line-height: 1.72; }
        @media (max-width: 400px) { .le-faq-btn { padding: 12px 14px; } .le-faq-ans { padding: 0 14px 12px; } }

        /* OFFICIAL STRIP */
        .le-official-strip { background: linear-gradient(135deg, var(--blue) 0%, var(--blue-dk) 100%); border-radius: var(--radius-md); padding: 18px 20px; color: #fff; display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; box-shadow: 0 6px 20px rgba(26,86,219,0.22); }
        .le-official-text h3 { font-family: "Sora", sans-serif; font-size: 0.9rem; font-weight: 800; margin-bottom: 3px; }
        .le-official-text p { font-size: 0.8rem; color: rgba(255,255,255,0.75); margin: 0; }
        .le-official-link { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); border-radius: var(--radius-sm); padding: 9px 18px; color: #fff; font-weight: 700; font-size: 0.82rem; text-decoration: none; font-family: "Sora", sans-serif; transition: background 0.18s; white-space: nowrap; }
        .le-official-link:hover { background: rgba(255,255,255,0.25); color: #fff; }

        /* RELATED */
        .le-related-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 9px; margin-top: 14px; }
        @media (max-width: 480px) { .le-related-grid { grid-template-columns: 1fr; } }
        .le-related-link { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); padding: 13px 15px; text-decoration: none; color: var(--text-2); font-size: 0.83rem; font-weight: 600; display: flex; align-items: center; justify-content: space-between; gap: 8px; transition: border-color 0.18s, color 0.18s; font-family: "Sora", sans-serif; }
        .le-related-link:hover { border-color: rgba(26,86,219,0.3); color: var(--blue); }
        .le-disclaimer { text-align: center; font-size: 0.73rem; color: var(--muted); margin-top: 18px; line-height: 1.65; padding: 0 8px; }

        @media (max-width: 480px) { .le-pyq-table-wrap { margin: 0 -16px; } .le-hero { padding: 22px 14px 68px; } .le-hero h1 { margin-top: 0px; } .le-card-body { padding: 14px; } .le-section { padding-top: 22px; } .le-official-link { width: 100%; justify-content: center; } }
        @media (max-width: 400px) { .le-dl-btn { font-size: 0.84rem; padding: 8px 16px; } .le-pyq-table-wrap { margin: 0 -12px; } .le-hero h1 { font-size: 1.38rem; margin-top: 0px; } .le-section-title { font-size: 1rem; } }
        @media (max-width: 400px) { .le-pyq-feature, .le-practice-banner { padding: 22px 16px 20px; } .le-start-btn-wrap { width: 100%; } .le-practice-btn-primary, .le-practice-btn-secondary { width: 100%; justify-content: center; } }
      ` }} />

      {/* BANNER */}
      {showBanner && (
        <div
          className="le-info-banner-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) setShowBanner(false); }}
        >
          <div className="le-info-banner-wrapper">
            <Image width={916} height={1717}
              src="/banner-3.png"
              alt="Jharkhand Polytechnic Lateral Entry 2026 Full Test Series – Join on Futurely"
              draggable={false} loading="lazy" onClick={() => { setShowBanner(false); router.push("/test-series"); }}
            />
            <button
              className="le-info-banner-close"
              onClick={() => setShowBanner(false)}
              aria-label="Close advertisement"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <main className="le-page">

        {/* HERO */}
        <div className="le-hero">
          <div className="le-hero-inner">
            <h1>Jharkhand Polytechnic Lateral Entry 2027<br />Complete Guide + Free PYQ Papers</h1>
            <p className="le-hero-desc">
              JCECEB DECE LE 2027 — eligibility, 10th Standard level syllabus (Mathematics + Science),
              exam pattern, important dates, PYQ papers and MCQs to practice online — all in one place.
            </p>
            <div className="le-hero-pills">
              <span className="le-hero-pill">28 June 2026</span>
              <span className="le-hero-pill">10th Standard Level</span>
              <span className="le-hero-pill">OMR Based</span>
              <span className="le-hero-pill">–0.25 Negative</span>
            </div>
          </div>
        </div>

        <Container style={{ maxWidth: 980, margin: "0 auto", padding: "0 14px" }}>

          {/* STAT STRIP */}
          <div className="le-stat-strip">
            {[
              { val: "100", label: "Total Questions" },
              { val: "100", label: "Total Marks" },
              { val: "2h", label: "Duration" },
              { val: "28 June", label: "Exam Date 2026" },
            ].map((s, i) => (
              <div className="le-stat" key={i}>
                <div className="le-stat-val">{s.val}</div>
                <div className="le-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ margin: "20px 0", minHeight: 0 }}>
            <AdBanner slot="2434542863" />
          </div>

          {/* 1. HIGHLIGHTS */}
          <div className="le-section" id="exam-info">
            <SectionHead
              label="About the Exam"
              title="Exam Highlights"
              sub="Jharkhand Polytechnic Lateral Entry (DECE LE) is a state-level entrance conducted by JCECEB for direct 2nd Year / 3rd Semester Diploma Engineering admission."
            />
            <div className="le-card">
              <div className="le-card-header"><div className="le-card-icon">📋</div><h3 className="le-card-title">At a Glance — Official 2026 Data</h3></div>
              <div className="le-card-body" style={{ padding: 0 }}>
                <table className="le-highlights-table">
                  <tbody>{highlights.map((h, i) => <tr key={i}><td>{h.label}</td><td>{h.value}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
          </div>
          <Sep />

          {/* 2. EXAM PATTERN */}
          <div className="le-section" id="pattern">
            <SectionHead
              label="Exam Pattern"
              title="Subject-wise Distribution"
              sub="DECE LE 2027 mein 2 subjects hote hain — Mathematics (50 marks) aur Science (50 marks). Total 100 questions, 2 ghante. Dono ka level 10th Standard hai."
            />
            <div className="le-official-badge">
              <span className="le-official-badge-dot" />
              Official JCECEB Scheme of Examination — as per portal
            </div>
            <div className="le-exam-table-wrap">
              <table className="le-exam-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Sr. No.</th>
                    <th>Subjects of Question Paper</th>
                    <th>Total Marks</th>
                    <th>Level of Exam</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Mathematics</td>
                    <td>50</td>
                    <td><span className="le-exam-level-badge">10th Standard</span></td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>Science</td>
                    <td>50</td>
                    <td><span className="le-exam-level-badge">10th Standard</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="le-subjects-grid" style={{ marginTop: 14, marginBottom: 12 }}>
              {subjects.map((s, i) => (
                <div className="le-subject-card" key={i} style={{ background: s.bg, borderColor: s.border }}>
                  <div className="le-subject-top">
                    <span className="le-subject-icon">{s.icon}</span>
                    <div>
                      <div className="le-subject-name" style={{ color: s.color }}>{s.name}</div>
                      <div className="le-subject-note">{s.note}</div>
                    </div>
                  </div>
                  <div className="le-subject-stats">
                    <div className="le-subject-stat"><span style={{ color: s.color }}>{s.questions}</span>Questions</div>
                    <div className="le-subject-stat"><span style={{ color: s.color }}>{s.marks}</span>Marks</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="le-marking-grid">
              <div className="le-marking-card" style={{ background: "#ecfdf5", borderColor: "#6ee7b7" }}><div className="le-marking-emoji">✅</div><div className="le-marking-val" style={{ color: "#059669" }}>+1</div><div className="le-marking-label">Correct Answer</div></div>
              <div className="le-marking-card" style={{ background: "#fee2e2", borderColor: "#fca5a5" }}><div className="le-marking-emoji">❌</div><div className="le-marking-val" style={{ color: "#dc2626" }}>−0.25</div><div className="le-marking-label">Wrong Answer</div></div>
              <div className="le-marking-card" style={{ background: "#f9fafb", borderColor: "#e5e7eb" }}><div className="le-marking-emoji">⬜</div><div className="le-marking-val" style={{ color: "#6b7280" }}>0</div><div className="le-marking-label">Unattempted</div></div>
            </div>
            <div className="le-info-alert">
              <span className="le-info-alert-icon">⚠️</span>
              <span><strong>Multiple answers = Wrong answer:</strong> एक question में एक से अधिक विकल्प भरने पर उसे गलत उत्तर माना जाएगा और –0.25 mark काटे जाएंगे।</span>
            </div>
          </div>
          <Sep />

          {/* 3. ELIGIBILITY */}
          <div className="le-section" id="eligibility">
            <SectionHead
              label="Who Can Apply"
              title="Eligibility Criteria 2027"
              sub="Official eligibility as per JCECEB DECE LE 2026 Prospectus and AICTE Approval Process Handbook 2024-2027."
            />
            <div className="le-elig-grid">
              {eligibility.map((e, i) => (
                <div className="le-elig-card" key={i}>
                  <div className="le-elig-icon">{e.icon}</div>
                  <div><p className="le-elig-title">{e.title}</p><p className="le-elig-desc">{e.desc}</p></div>
                </div>
              ))}
            </div>
            <div className="le-info-alert le-info-blue" style={{ marginTop: 10 }}>
              <span className="le-info-alert-icon">💡</span>
              <span>
                <strong>ITI Note:</strong> 2 वर्ष से कम अवधि वाले ITI में उत्तीर्ण होने वाले आवेदक इस परीक्षा के तहत नामांकन के योग्य नहीं समझे जाएंगे। Appearing candidates भी apply कर सकते हैं लेकिन counselling से पहले passing certificate produce करना अनिवार्य होगा।
              </span>
            </div>
          </div>
          <Sep />

          <div className="bt-scard" style={{ padding: "8px", minHeight: 0 }}>
            <AdBanner slot="8679502538" format="auto" />
          </div>

          {/* 4. FEE */}
          <div className="le-section" id="fee">
            <SectionHead label="Fees" title="Application Fee 2026" />
            <div className="le-card">
              <div className="le-card-body" style={{ padding: 0 }}>
                <table className="le-fee-table">
                  <thead><tr><th>Category</th><th style={{ textAlign: "center" }}>Application Fee</th></tr></thead>
                  <tbody>{applicationFee.map((f, i) => <tr key={i}><td>{f.category}</td><td style={{ textAlign: "center" }} className="le-fee-val">{f.fee}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
            <p style={{ fontSize: "0.76rem", color: "var(--muted)", marginTop: 8 }}>
              * Paid online only via Credit Card / Debit Card / Net Banking / UPI. Fee is non-refundable under any circumstances.
            </p>
          </div>
          <Sep />

          {/* 5. DATES */}
          <div className="le-section" id="dates">
            <SectionHead
              label="Schedule"
              title="Important Dates 2026"
              sub="Official dates from JCECEB DECE LE 2026 notification. Always verify latest updates at jceceb.jharkhand.gov.in."
            />
            <div className="le-dates-list">
              {importantDates.map((d, i) => (
                <div className={`le-date-item${d.highlight ? " le-date-item--highlight" : ""}`} key={i}>
                  <span className="le-date-event">{d.event}</span>
                  <span className="le-date-val">{d.date}</span>
                </div>
              ))}
            </div>
          </div>
          <Sep />

           <div className="bt-scard" style={{ padding: "8px", minHeight: 0 }}>
            <AdBanner slot="3636692323" format="auto" />
          </div>

          {/* 6. HOW TO APPLY */}
          <div className="le-section" id="apply">
            <SectionHead
              label="Application Process"
              title="How to Apply Online — Step by Step"
              sub="Official 4-step online application process as per JCECEB DECE LE 2026 Prospectus."
            />
            <div className="le-steps-list">
              {onlineApplicationSteps.map((s, i) => (
                <div className="le-step-card" key={i}>
                  <div className="le-step-num">{i + 1}</div>
                  <div>
                    <p className="le-step-title">{s.icon} {s.title}</p>
                    <p className="le-step-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="le-info-alert">
              <span className="le-info-alert-icon">⚠️</span>
              <span>
                <strong>Important:</strong> Application form का printout JCECEB Board Office को भेजने की जरूरत नहीं है। 3-4 copies अपने पास रखें।
                Photo Edited नहीं होनी चाहिए और फोटो में दोनों कान स्पष्ट रूप से दिखने चाहिए — Edited या unclear photo पर application reject होगा।
              </span>
            </div>
          </div>
          <Sep />

          {/* 7. DOCUMENTS */}
          <div className="le-section" id="documents">
            <SectionHead
              label="Counselling Documents"
              title="Documents Required at Counselling / Nomination"
              sub="Original documents + self-attested copies mandatory. Sirf Xerox Copy ya Fax Copy acceptable nahi hogi."
            />
            <div className="le-docs-list">
              {documentsRequired.map((doc, i) => (
                <div className="le-doc-item" key={i}>
                  <span className="le-doc-icon">📄</span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>
          <Sep />
          <div style={{ margin: "20px 0", minHeight: 0 }}>
            <AdBanner slot="6242297060" format="fluid" layout="in-article" />
          </div>


          {/* 8. TIE-BREAKING */}
          <div className="le-section" id="merit">
            <SectionHead
              label="Merit List"
              title="Tie-Breaking Rules (Official)"
              sub="Agar do ya do se adhik candidates ke total marks equal hoon to merit rank is order mein decide hoga — as per DECE LE 2026 Prospectus:"
            />
            <div className="le-card">
              <div className="le-card-body" style={{ padding: 0 }}>
                <table className="le-tie-table">
                  <thead><tr><th>Priority</th><th>Condition</th><th>Resolution</th></tr></thead>
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
            <div className="le-info-alert">
              <span className="le-info-alert-icon">💡</span>
              <span><strong>Preference:</strong> 10+2 (PCM) stream candidates को ITI candidates से ऊपर रखा जाता है merit list में — even if marks equal हों।</span>
            </div>
          </div>
          <Sep />

          {/* 9. SYLLABUS */}
          <div className="le-section" id="syllabus">
            <SectionHead
              label="What to Study"
              title="DECE LE Exam Syllabus 2027 — 10th Standard Level"
              sub="Official JCECEB portal ke anusar dono subjects (Mathematics aur Science) ka Level of Exam '10th Standard' hai. NCERT Class 9 & 10 books se prepare karo."
            />
            <div className="le-info-alert le-info-green" style={{ marginBottom: 14 }}>
              <span className="le-info-alert-icon">✅</span>
              <span>
                <strong>Official Confirmation:</strong> JCECEB portal par Scheme of Examination table clearly mention karta hai — Mathematics: 10th Standard, Science: 10th Standard.
                इसलिए NCERT Class 9 & 10 की books ही इस exam के लिए सबसे relevant हैं।
              </span>
            </div>
            <div className="le-syllabus-grid">
              {syllabusSummary.map((sub, i) => (
                <div className="le-syllabus-card" key={i}>
                  <div className="le-syllabus-header" style={{ background: sub.color }}>
                    <span>{sub.icon}</span>
                    <span>{sub.subject}</span>
                    <span className="le-syllabus-level-badge">{sub.level}</span>
                  </div>
                  <div className="le-syllabus-topics">
                    {sub.topics.map((t, j) => <div className="le-syllabus-topic" key={j}>{t}</div>)}
                  </div>
                </div>
              ))}
            </div>
            <div className="le-info-alert" style={{ marginTop: 10 }}>
              <span className="le-info-alert-icon">📌</span>
              <span>
                Science paper में Physics और Chemistry दोनों के topics आते हैं। NCERT Class 9 & 10 Science (Physics chapters + Chemistry chapters) और NCERT Class 9 & 10 Mathematics से thoroughly prepare करो।
              </span>
            </div>
          </div>
          <Sep />
          <div className="bt-scard" style={{ padding: "8px", minHeight: 0 }}>
            <AdBanner slot="8729236906" format="auto" />
          </div>

          {/* 10. PYQ */}
          <div className="le-section" id="pyq">
            <SectionHead label="Free Question Papers" title="Jharkhand Polytechnic Lateral Entry PYQ Papers (2021–2026)" />
            <div className="le-pyq-feature">
              <div className="le-pyq-feature-inner">
                <span className="le-pyq-tag">
                  <span className="le-pyq-tag-dot" />
                  📄 Download Lateral Entry Question Paper PDF — Free
                </span>
                <h3>5 साल के PYQ Papers — Jharkhand Polytechnic Lateral Entry (DECE LE)</h3>
                <p className="le-pyq-feature-desc">
                  LE exam mein pichle saalo ke papers se questions repeat hote hain. 2021–2026 ke
                  official question papers yahan download karo — Mathematics aur Science dono ke —
                  completely free. Yeh sabse important resource hai exam crack karne ke liye.
                </p>
                <div className="le-pyq-table-wrap">
                  <table className="le-pyq-table">
                    <thead>
                      <tr><th>Year</th><th>Paper Name</th><th>Subjects</th><th>Download &amp; Preview</th></tr>
                    </thead>
                    <tbody>
                      {pyqPapers.map((p, i) => (
                        <tr key={i}>
                          <td><strong style={{ color: "#0d6efd", fontFamily: "Sora, sans-serif", fontSize: "1rem" }}>{p.year}</strong></td>
                          <td>
                            <Link
                              href={`/resources/jharkhand-polytechnic/lateral-entry/pdf?year=${p.year}&subject=DECE%20LE%20Question%20Paper`}
                              style={{ color: "#0f172a", fontWeight: 600, textDecoration: "none" }}
                              className="hover:text-amber-600 transition-colors"
                            >
                              Jharkhand LE Paper {p.year}
                            </Link>
                          </td>
                          <td style={{ color: "#64748b", fontSize: "0.78rem" }}>Math · Science</td>
                          <td>
                            {p.driveUrl ? (
                              <Link
                                href={`/resources/jharkhand-polytechnic/lateral-entry/pdf?year=${p.year}&subject=DECE%20LE%20Question%20Paper`}
                                className="le-dl-btn"
                                aria-label={`Read and Download Jharkhand Polytechnic Lateral Entry ${p.year} Question Paper PDF`}
                              >
                                📥 Download PDF
                              </Link>
                            ) : (
                              <button className="le-dl-btn" disabled>⏳ Coming Soon</button>
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

          {/* 11. PRACTICE */}
          <div className="le-section" id="practice">
            <SectionHead label="Online Mock Test" title="Practice Polytechnic LE Online — MCQs Free" />
            <div className="le-practice-banner">
              <div className="le-practice-inner">
                <h3>Practice Jharkhand Polytechnic LE PYQs Online</h3>
                <p className="le-practice-desc">
                  Futurely par Polytechnic LE PYQ questions online attempt karo — timer ke saath,
                  instant score ke saath, aur detailed solution ke saath. Mathematics ya Science —
                  subject-wise ya year-wise practice karo. Yeh sabse effective tarika hai exam crack karne ka.
                </p>
                <div className="le-practice-feats">
                  {["Mathematics + Science Questions", "Year-wise Sets", "Instant Solutions", "Score Tracking", "Free Forever"].map((feat, i) => (
                    <div className="le-practice-feat" key={i}><div className="le-pf-dot" />{feat}</div>
                  ))}
                </div>
                <div className="le-practice-btns">
                  <Link href="/exam-preparation/jharkhand-polytechnic-lateral-entry" className="le-start-btn-wrap">
                    <span className="le-practice-btn-primary">🚀 Start Preparation Now — Free</span>
                  </Link>
                  <Link href="/test-series" className="le-practice-btn-secondary">📝 Full Mock Test</Link>
                </div>
              </div>
            </div>
          </div>
          <Sep />



          {/* 12. TIPS */}
          <div className="le-section" id="preparation">
            <SectionHead label="Strategy" title="How to Prepare for Polytechnic LE 2026" sub="LE exam 10th Standard level ka hota hai — iske liye effective strategy yahan hai." />
            <div className="le-tips-grid" style={{ marginBottom: 20 }}>
              {preparationTips.map((t, i) => (
                <div className="le-tip-card" key={i}><span className="le-tip-icon">{t.icon}</span><span>{t.tip}</span></div>
              ))}
            </div>

            <p className="le-section-label" style={{ marginBottom: 12 }}>Recommended Books</p>
            <div className="le-card">
              <div className="le-card-body">
                {[
                  { subject: "Mathematics", books: "NCERT Class 10 Mathematics, NCERT Class 9 Mathematics, R.D. Sharma Class 10, RS Aggarwal Class 10" },
                  { subject: "Physics", books: "NCERT Class 10 Science (Physics chapters), NCERT Class 9 Science (Physics chapters), Lakhmir Singh Class 10 Science Part 1" },
                  { subject: "Chemistry", books: "NCERT Class 10 Science (Chemistry chapters), NCERT Class 9 Science (Chemistry chapters), Lakhmir Singh Class 10 Science Part 1 & 2" },
                ].map((b, i, arr) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", paddingBottom: i < arr.length - 1 ? 14 : 0, marginBottom: i < arr.length - 1 ? 14 : 0, borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <span style={{ fontFamily: "Sora, sans-serif", fontSize: "0.68rem", fontWeight: 800, background: "var(--blue)", color: "#fff", borderRadius: 6, padding: "3px 8px", flexShrink: 0, marginTop: 2 }}>{b.subject}</span>
                    <p style={{ fontSize: "0.84rem", color: "var(--text-2)", margin: 0, lineHeight: 1.55 }}>{b.books}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Sep />
          <div style={{ margin: "20px 0", minHeight: 0 }}>
            <AdBanner slot="3476532920" />
          </div>

          {/* 13. FAQ */}
          <div className="le-section" id="faq">
            <SectionHead label="FAQ" title="Frequently Asked Questions" sub="Common doubts about Jharkhand Polytechnic Lateral Entry DECE LE 2026, answered based on official portal and prospectus." />
            {faqs.map((faq, i) => (
              <div className={"le-faq-item" + (openFaq === i ? " le-faq-item--open" : "")} key={i}>
                <button className="le-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                  <span className="le-faq-q">{faq.q}</span>
                  <span className="le-faq-chevron">▾</span>
                </button>
                {openFaq === i && <div className="le-faq-ans">{faq.a}</div>}
              </div>
            ))}
          </div>
          <Sep />

          {/* OFFICIAL STRIP */}
          <div style={{ paddingTop: 24 }}>
            <div className="le-official-strip">
              <div className="le-official-text">
                <h3>Official Website – JCECEB Jharkhand</h3>
                <p>Apply online, download admit card, check results & counselling schedule at the official portal.</p>
              </div>
              <a href="https://jceceb.jharkhand.gov.in" target="_blank" rel="noopener noreferrer" className="le-official-link">
                🌐 jceceb.jharkhand.gov.in
              </a>
            </div>
          </div>

          {/* RELATED */}
          <div className="le-related-grid">
            <Link href="/resources/jharkhand-polytechnic/exam-information" className="le-related-link"><span>📗 Jharkhand Polytechnic (PECE) Guide</span><span>›</span></Link>
            <Link href="/resources/jharkhand-d2d/exam-information" className="le-related-link"><span>📙 Jharkhand D2D Guide</span><span>›</span></Link>
            <Link href="/exam-preparation/jharkhand-polytechnic" className="le-related-link"><span>🎯 Practice Polytechnic MCQs</span><span>›</span></Link>
            <Link href="/resources" className="le-related-link"><span>📚 All Jharkhand Resources</span><span>›</span></Link>
          </div>

          <p className="le-disclaimer">
            All information is sourced from the official JCECEB DECE LE 2026 portal and Suchna-Vivarneka / Prospectus.
            Always verify latest updates at{" "}
            <a href="https://jceceb.jharkhand.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "var(--blue)" }}>
              jceceb.jharkhand.gov.in
            </a>.
            Futurely is not affiliated with JCECEB or the Government of Jharkhand.
          </p>

        </Container>
      </main>
    </>
  );
};

export default JHPolytechnicLE;