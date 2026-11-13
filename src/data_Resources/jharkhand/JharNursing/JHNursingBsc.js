/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container } from "react-bootstrap";
import AdBanner from "@/components/AdBanner";
import Image from "next/image";

/* ─────────────────────────────────────────────
   STATIC DATA  — verified from official JCECEB B.Sc Nursing (Basic/Post-Basic) Prospectus
───────────────────────────────────────────── */
const highlights = [
  { label: "Exam Name", value: "B.Sc Nursing (Basic / Post-Basic) Entrance Competitive Examination" },
  { label: "Conducting Body", value: "JCECEB, Jharkhand" },
  { label: "Exam Level", value: "State-Level Entrance" },
  { label: "Admission To", value: "B.Sc Nursing (Basic) & B.Sc Nursing (Post-Basic) — Govt. & Private Colleges" },
  { label: "Course Duration", value: "Basic: 4 Years | Post-Basic: 2 Years" },
  { label: "Exam Mode", value: "Offline – OMR Based (Pen & Paper)" },
  { label: "Total Questions", value: "150 MCQs (Basic Course)" },
  { label: "Total Marks", value: "150 Marks (1 Mark Each)" },
  { label: "Exam Duration", value: "~2 – 2.5 Hours (Verify Exact Duration on Admit Card)" },
  { label: "Marking Scheme", value: "+1 for correct, generally No Negative Marking (confirm via admit card instructions)" },
  { label: "Question Type", value: "Objective (Multiple Choice) — Bilingual Hindi & English" },
  { label: "Syllabus Level", value: "Class 11 & 12 (Higher Secondary) Level — Physics, Chemistry, Biology" },
  { label: "Gender Eligibility", value: "Both Male & Female Candidates Eligible" },
  { label: "Minimum Qualification (Basic)", value: "Class 12 (Intermediate) Science with Physics, Chemistry & Biology" },
];

const subjects = [
  { name: "Physics", icon: "⚛️", questions: 50, marks: 50, color: "#4f46e5", bg: "#eef2ff", border: "#c7d2fe" },
  { name: "Chemistry", icon: "🧪", questions: 50, marks: 50, color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
  { name: "Biology", icon: "🧬", questions: 50, marks: 50, color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc" },
];

const eligibility = [
  {
    icon: "🎓",
    title: "B.Sc Nursing (Basic) — Class 12 Science Pass",
    desc: "Candidate must have passed Class 12 (Intermediate) in Science stream with Physics, Chemistry and Biology from a recognised Board, with the minimum percentage prescribed by JCECEB (verify exact cut-off in the official bulletin — typically around 45% for General and 40% for reserved categories).",
  },
  {
    icon: "🩺",
    title: "B.Sc Nursing (Post-Basic) — Separate Track",
    desc: "Open to candidates who already hold a GNM Diploma and are registered as a Registered Nurse & Registered Midwife (RNRM) with a State Nursing Council. Course duration is 2 years instead of 4. Eligibility and application process differ from the Basic course — check the separate Post-Basic notification.",
  },
  {
    icon: "📍",
    title: "Jharkhand Domicile Required",
    desc: "Only Indian citizens who are permanent or local residents of Jharkhand State can apply. A valid domicile/residential certificate issued by Anchal Adhikari or District Magistrate of Jharkhand is mandatory at counselling.",
  },
  {
    icon: "🚻",
    title: "Both Male & Female Candidates Eligible",
    desc: "Unlike ANM (which is open to female candidates only), B.Sc Nursing (Basic) is open to both male and female candidates, subject to fulfilling all other eligibility conditions.",
  },
  {
    icon: "🎂",
    title: "Age Limit",
    desc: "Candidates should generally be at least 17 years old, with an upper age limit as prescribed by JCECEB for the respective session. Age relaxation may apply for reserved categories as per Jharkhand Government norms — always confirm exact limits in the official bulletin.",
  },
  {
    icon: "🏥",
    title: "Medical Fitness",
    desc: "Candidates recommended through counselling must produce a Medical Fitness Certificate issued by a Registered Medical Practitioner at the time of enrollment, otherwise admission will not be granted.",
  },
];

const importantDates = [
  { event: "Information Bulletin Release", date: "Expected Soon on jceceb.jharkhand.gov.in (2026)", highlight: false },
  { event: "Application Form Release (Online)", date: "To Be Announced (2026)", highlight: false },
  { event: "Last Date to Apply (Online)", date: "To Be Announced — Form usually stays open ~25 days", highlight: false },
  { event: "Admit Card Download", date: "To Be Announced — carry a self-attested photo pasted on the printout", highlight: false },
  { event: "Exam Date", date: "To Be Announced (2026)", highlight: true },
  { event: "Answer Key Release", date: "After Exam — Online on Official Portal", highlight: false },
  { event: "Result Declaration", date: "Few Weeks After Exam (Expected)", highlight: false },
  { event: "Counselling (Multiple Rounds)", date: "Online, via nursingbasic.jceceb.org.in — up to 5 Rounds", highlight: false },
];

const applicationFee = [
  { category: "General / EWS / BC-I / BC-II", fee: "₹900 (Approx. — Verify in Bulletin)" },
  { category: "SC / ST (All Categories)", fee: "₹450 (Approx. — Verify in Bulletin)" },
  { category: "PwBD / Divyang Candidates (All Categories)", fee: "Exempted (As per Norms)" },
];

const onlineApplicationSteps = [
  {
    title: "Registration & Basic Details",
    desc: "Visit jceceb.jharkhand.gov.in → Click 'Click here for all Online Application Form Submission – JCECEB 2026' → Select 'B.Sc (Nursing / Post-Basic) Entrance Competitive Examination – 2026'. Enter Course Applied For, Email Address and Mobile Number, and create a strong password. Submit to receive your Registration Number & Password on your registered email.",
    icon: "📝",
  },
  {
    title: "Login & Fill Application Form",
    desc: "Click 'Applicant Login', enter your Registration Number & Password. Fill in Personal Details, Qualification Details (Class 12 Board, Year, PCB marks — or GNM/RNRM details for Post-Basic), and Address Details.",
    icon: "🧾",
  },
  {
    title: "Upload Documents & Pay Fee",
    desc: "Upload Photograph and Signature in the specified format, along with other required documents. Pay the application fee online via Credit Card, Net Banking or UPI, and submit. Take multiple printouts of the confirmation page for future reference — do NOT send it to the Board office.",
    icon: "💳",
  },
];

const documentsRequired = [
  "Class 12 / Intermediate Admit Card, Marksheet & Passing Certificate with PCB (original + self-attested copy) — for Basic course",
  "GNM Diploma Certificate & RNRM Registration Certificate — for Post-Basic course applicants",
  "Class 10 Admit Card & Marksheet (for date of birth verification)",
  "Jharkhand Domicile / Local Resident Certificate (issued by Anchal Adhikari / District Magistrate / Upayukt of Jharkhand)",
  "Caste Certificate — SC/ST/BC-I/BC-II (issued by authorised Jharkhand officer) — if claiming reservation",
  "EWS Income & Assets Certificate (issued by Anchal Adhikari / DM — dated within 1 year) — if claiming EWS",
  "PwBD / Divyang Certificate from District Hospital / Civil Surgeon (if applicable)",
  "Medical Fitness Certificate from a Registered Medical Practitioner",
  "B.Sc Nursing Entrance Admit Card (mandatory at interview/counselling, self-attested photo pasted)",
  "Recent Colour Photograph & Signature",
  "Anti-Ragging Affidavit (as prescribed by UGC — format on JCECEB website Downloads section)",
];

const tieBreakingRules = [
  { rank: "1", condition: "Total Marks equal", resolution: "Higher marks in Biology" },
  { rank: "2", condition: "Step 1 equal (Biology same)", resolution: "Higher marks in Chemistry" },
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
    subject: "Physics",
    icon: "⚛️",
    color: "#4f46e5",
    level: "Class 11–12 Level",
    topics: [
      "Measurement & Units",
      "Kinematics",
      "Force and Laws of Motion",
      "Work, Energy and Power",
      "Rotational Motion & Moment of Inertia",
      "Gravitation",
      "Properties of Solids & Fluids",
      "Heat and Thermodynamics",
      "Oscillations and Waves",
      "Ray & Wave Optics",
      "Electrostatics",
      "Current Electricity",
      "Magnetic Effects of Current",
      "Electromagnetic Induction & AC",
      "Electron, Photon and Radioactivity",
    ],
  },
  {
    subject: "Chemistry",
    icon: "🧪",
    color: "#7c3aed",
    level: "Class 11–12 Level",
    topics: [
      "Atomic Structure",
      "Chemical Bonding & Molecular Structure",
      "States of Matter",
      "Periodic Classification of Elements",
      "Thermodynamics & Chemical Equilibrium",
      "Solutions & Electrochemistry",
      "Chemical Kinetics",
      "Organic Chemistry — Basic Principles",
      "Hydrocarbons",
      "Biomolecules",
      "Polymers",
      "Chemistry in Everyday Life",
    ],
  },
  {
    subject: "Biology",
    icon: "🧬",
    color: "#0891b2",
    level: "Class 11–12 Level",
    topics: [
      "Diversity of Living Organisms",
      "Structural Organisation in Animals & Plants",
      "Cell Structure and Function",
      "Human Physiology (Digestion, Respiration, Circulation)",
      "Excretion and Osmoregulation",
      "Neural & Hormonal Control",
      "Reproduction — Human & Plant",
      "Genetics & Evolution",
      "Biology and Human Welfare",
      "Biotechnology & its Applications",
      "Ecology & Environment",
    ],
  },
];

const pyqPapers = [
  { year: "2026", driveUrl: null },
  { year: "2025", driveUrl: null },
  { year: "2024", driveUrl: "https://drive.google.com/file/d/1HQuK5-f2o9PmLACqLewVQvleWeW17Jln/view" },
  { year: "2023", driveUrl: "https://drive.google.com/file/d/1zS8J_pR3FrqJPyE14tPLyh5S3KIDUyvX/view" },
  { year: "2022", driveUrl: "https://drive.google.com/file/d/1LgSv2V_X8MFeUIiichv98ZuMMqnMGm-z/view" },
  { year: "2021", driveUrl: "https://drive.google.com/file/d/1AQuWXfJm1d-9UxuzwehwIu7CcmFAqJHo/view" },
  { year: "2020", driveUrl: "https://drive.google.com/file/d/1Ypknk2r3DeJ8aih5ffPQN0fJnIzwm0A2/view" },
  { year: "2019", driveUrl: "https://drive.google.com/file/d/1Z3jttUFwbfetMKL5MhdjMa61fFDtxjKX/view" },
];

const preparationTips = [
  { icon: "📅", tip: "Official syllabus Class 11-12 (NCERT) level का है — इसलिए Class 12 Board की तैयारी ही entrance exam की सबसे अच्छी नींव है।" },
  { icon: "📝", tip: "Biology (खासकर Human Physiology) पर सबसे ज़्यादा focus करो — यह सबसे scoring subject माना जाता है और tie-breaking में भी पहले देखा जाता है।" },
  { icon: "⏱️", tip: "Practice OMR sheets during mock tests — bubbling errors cost marks even when you know the answer।" },
  { icon: "🔁", tip: "पिछले 5 सालों के JCECEB B.Sc Nursing question papers solve करो — इससे questions का level समझ आएगा।" },
  { icon: "📊", tip: "तीनों subjects (Physics, Chemistry, Biology) को बराबर weightage दिया गया है (50-50-50) — इसलिए समय बराबर बाँटो।" },
  { icon: "⚠️", tip: "Negative marking है या नहीं — यह जानकारी हर साल admit card/instructions में confirm करें, क्योंकि यह exam-to-exam vary कर सकता है।" },
];

const faqs = [
  {
    q: "Jharkhand B.Sc Nursing entrance exam क्या है?",
    a: "JCECEB (Jharkhand Combined Entrance Competitive Examination Board) द्वारा आयोजित B.Sc Nursing Entrance Competitive Examination, Jharkhand के Government और Private colleges में B.Sc Nursing (Basic — 4 वर्षीय Degree) और B.Sc Nursing (Post-Basic — 2 वर्षीय Degree) courses में admission के लिए होती है।",
  },
  {
    q: "B.Sc Nursing (Basic) और (Post-Basic) में क्या फर्क है?",
    a: "B.Sc Nursing (Basic) एक 4-वर्षीय Degree course है जिसके लिए Class 12 Science (PCB) pass students apply कर सकते हैं। B.Sc Nursing (Post-Basic) एक 2-वर्षीय course है जो सिर्फ उन candidates के लिए है जिनके पास पहले से GNM Diploma है और वे RNRM के रूप में registered हैं।",
  },
  {
    q: "Exam pattern और syllabus क्या है?",
    a: "B.Sc Nursing (Basic) entrance exam में 150 objective (MCQ) questions होते हैं — Physics, Chemistry और Biology से बराबर-बराबर (50-50) questions पूछे जाते हैं। कुल 150 marks होते हैं। Syllabus मुख्य रूप से Class 11 और 12 (NCERT) level का होता है — यह ANM/GNM के Class 10 level syllabus से ऊँचा है।",
  },
  {
    q: "Eligibility क्या है?",
    a: "Basic course के लिए candidate को Class 12 (Intermediate) Science stream से Physics, Chemistry और Biology विषयों के साथ pass होना चाहिए, JCECEB द्वारा तय minimum percentage के साथ। Jharkhand domicile भी अनिवार्य है। Post-Basic course के लिए GNM Diploma और RNRM registration ज़रूरी है।",
  },
  {
    q: "क्या male candidates B.Sc Nursing के लिए apply कर सकते हैं?",
    a: "हाँ। ANM course के विपरीत जो केवल female candidates के लिए है, B.Sc Nursing (Basic) course male और female दोनों candidates के लिए खुला है — बशर्ते वे सभी eligibility conditions पूरी करते हों।",
  },
  {
    q: "Exam duration और negative marking की जानकारी क्या है?",
    a: "अलग-अलग sources के अनुसार exam duration लगभग 2 से 2.5 घंटे के बीच होती है — सटीक duration हर साल admit card पर confirm करें। Negative marking आमतौर पर नहीं होती, लेकिन यह exam-to-exam vary कर सकता है इसलिए admit card की instructions ज़रूर पढ़ें।",
  },
  {
    q: "Tie-breaking rules क्या हैं?",
    a: "अगर दो candidates के total marks equal हों तो पहले Biology के marks देखे जाते हैं। अगर वो भी equal हों तो Chemistry marks। फिर Date of Birth (पहले जन्मे candidate को priority) और अंत में First Name का English alphabetical order।",
  },
  {
    q: "Application fee कितनी है?",
    a: "General/EWS/BC-I/BC-II candidates के लिए लगभग ₹900 और SC/ST candidates के लिए लगभग ₹450 (PwBD के लिए exempted) होने की संभावना है — यह ANM/GNM fee structure के आधार पर estimate है। सटीक fee के लिए official information bulletin अवश्य verify करें।",
  },
  {
    q: "Counselling कैसे होती है?",
    a: "Result declare होने के बाद JCECEB counselling schedule जारी करता है। Counselling nursingbasic.jceceb.org.in पर online mode में होती है, और आमतौर पर सीटें भरने के लिए 5 rounds तक conduct किए जाते हैं।",
  },
];

const SectionHead = ({ label, title, sub }) => (
  <div style={{ marginBottom: 20 }}>
    <span className="bn-section-label">{label}</span>
    <h2 className="bn-section-title">{title}</h2>
    {sub && <p className="bn-section-sub">{sub}</p>}
  </div>
);

const Sep = () => <div className="bn-sep" />;

/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
const JHNursingBsc = () => {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Jharkhand B.Sc Nursing Entrance Exam 2026 Preparation",
    description: "Free Jharkhand B.Sc Nursing (Basic & Post-Basic) Entrance Exam 2026 guide: eligibility, Class 11-12 level syllabus (Physics, Chemistry, Biology), exam pattern and free online MCQ practice.",
    provider: { "@type": "Organization", name: "Futurely", sameAs: "https://www.futurely.in" },
    url: "https://www.futurely.in/resources/jharkhand-bsc-nursing/exam-information",
    educationalLevel: "Higher Secondary",
    inLanguage: ["en", "hi"],
    isAccessibleForFree: true,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.futurely.in" },
      { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.futurely.in/resources" },
      { "@type": "ListItem", position: 3, name: "Jharkhand B.Sc Nursing Exam 2026", item: "https://www.futurely.in/resources/jharkhand-bsc-nursing/exam-information" },
    ],
  };
  const pyqListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Jharkhand B.Sc Nursing Previous Year Question Papers",
    description: "Free PYQ papers for Jharkhand B.Sc Nursing Entrance Exam (JCECEB).",
    itemListElement: pyqPapers.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Jharkhand B.Sc Nursing Question Paper ${p.year} – 150 MCQs Physics Chemistry Biology`,
      url: "https://www.futurely.in/resources/jharkhand-bsc-nursing/exam-information",
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pyqListSchema) }}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes btnBorderSpin {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes bnDlGlow {
          0%   { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }

        /* BANNER */
        .bn-banner-overlay {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px);
          padding: 16px; box-sizing: border-box;
          animation: bnBannerFadeIn 0.3s ease;
        }
        @keyframes bnBannerFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .bn-banner-wrapper {
          position: relative;
          width: min(340px, calc(100vw - 32px));
          aspect-ratio: 916 / 1717;
          max-height: calc(100vh - 80px);
          border-radius: 14px; overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,0.55);
          animation: bnBannerSlideUp 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes bnBannerSlideUp {
          from { transform: translateY(40px) scale(0.96); opacity: 0; }
          to   { transform: translateY(0) scale(1); opacity: 1; }
        }
        .bn-banner-wrapper img { width: 100%; height: 100%; object-fit: cover; display: block; cursor: pointer; }
        .bn-banner-close {
          position: absolute; top: 10px; right: 10px;
          width: 32px; height: 32px; border: none; background: transparent;
          color: #fff; font-size: 22px; line-height: 1;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 10; transition: opacity 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .bn-banner-close:hover { opacity: 0.7; }

        /* PAGE */
        .bn-page {
          --indigo:    #1a56db;
          --indigo-dk: #1e429f;
          --indigo-lt: #eff6ff;
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
          background: #f5f5fb;
          min-height: 100vh;
          padding-bottom: 80px;
          overflow-x: hidden;
        }

        /* HERO */
        .bn-hero {
          background: linear-gradient(155deg, #1e3a8a 0%, #1a56db 60%, #2563eb 100%);
          padding: 0px 16px 80px; text-align: center; position: relative; overflow: hidden;
        }
        .bn-hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at 15% 60%, rgba(255,255,255,0.08) 0%, transparent 45%),
                      radial-gradient(circle at 85% 20%, rgba(255,255,255,0.05) 0%, transparent 40%);
          pointer-events: none;
        }
        .bn-hero-inner { position: relative; z-index: 1; max-width: 680px; margin: 0 auto; }
        .bn-hero h1 {
          font-family: "Sora", sans-serif; font-size: clamp(1.5rem, 5vw, 2.2rem);
          font-weight: 800; color: #fff; margin-bottom: 12px; margin-top: 22px;
          line-height: 1.2; letter-spacing: -0.5px;
        }
        .bn-hero-desc {
          font-size: clamp(0.9rem, 2.5vw, 1rem); color: rgba(255,255,255,0.82);
          line-height: 1.75; margin: 0 auto 20px; max-width: 560px;
        }
        .bn-hero-pills { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
        .bn-hero-pill {
          background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.22);
          border-radius: 999px; padding: 5px 14px; font-size: 0.76rem; font-weight: 600; color: #fff;
        }

        /* STAT STRIP */
        .bn-stat-strip {
          display: grid; grid-template-columns: repeat(4, 1fr);
          background: var(--surface); border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md); overflow: hidden; margin-top: -36px; position: relative; z-index: 2;
        }
        @media (max-width: 600px) { .bn-stat-strip { grid-template-columns: repeat(2, 1fr); } }
        .bn-stat { text-align: center; padding: 18px 10px; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .bn-stat:nth-child(4n) { border-right: none; }
        @media (max-width: 600px) {
          .bn-stat:nth-child(2n) { border-right: none; }
          .bn-stat:nth-child(3), .bn-stat:nth-child(4) { border-bottom: none; }
        }
        .bn-stat-val { font-family: "Sora", sans-serif; font-size: clamp(1.1rem,3vw,1.4rem); font-weight: 800; color: var(--indigo); line-height: 1; margin-bottom: 4px; }
        .bn-stat-label { font-size: clamp(0.66rem,1.5vw,0.75rem); color: var(--muted); font-weight: 600; }

        /* LAYOUT */
        .bn-sep { height: 1px; background: var(--border); margin: 32px 0 0; }
        .bn-section { padding-top: 28px; }
        .bn-section-label { display: block; font-size: 0.68rem; font-weight: 800; letter-spacing: 1.6px; text-transform: uppercase; color: var(--indigo); font-family: "Sora", sans-serif; margin-bottom: 5px; }
        .bn-section-title { font-family: "Sora", sans-serif; font-size: clamp(1.05rem,3.5vw,1.35rem); font-weight: 800; color: var(--text); margin-bottom: 5px; letter-spacing: -0.3px; line-height: 1.3; }
        .bn-section-sub { font-size: 0.88rem; color: var(--muted); line-height: 1.65; margin-bottom: 0; }

        /* CARD */
        .bn-card { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-xs); }
        .bn-card-header { display: flex; align-items: center; gap: 10px; padding: 13px 18px; border-bottom: 1px solid var(--border); background: var(--surface-2); }
        .bn-card-icon { width: 30px; height: 30px; border-radius: 8px; background: var(--indigo-lt); display: flex; align-items: center; justify-content: center; font-size: 0.95rem; flex-shrink: 0; }
        .bn-card-title { font-family: "Sora", sans-serif; font-size: 0.88rem; font-weight: 800; color: var(--text); margin: 0; }
        .bn-card-body { padding: 18px; }

        /* HIGHLIGHTS TABLE */
        .bn-highlights-table { width: 100%; border-collapse: collapse; }
        .bn-highlights-table tr { border-bottom: 1px solid var(--border); }
        .bn-highlights-table tr:last-child { border-bottom: none; }
        .bn-highlights-table td { padding: 10px 16px; font-size: 0.85rem; line-height: 1.5; vertical-align: top; }
        .bn-highlights-table td:first-child { font-weight: 700; color: var(--text-2); width: 42%; }
        .bn-highlights-table td:last-child { color: var(--text); }
        @media (max-width: 400px) { .bn-highlights-table td { padding: 9px 12px; font-size: 0.81rem; } }

        /* SUBJECTS */
        .bn-subjects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        @media (max-width: 640px) { .bn-subjects-grid { grid-template-columns: 1fr; gap: 8px; } }
        .bn-subject-card { border-radius: var(--radius-md); padding: 16px; border: 1.5px solid; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 6px; }
        @media (max-width: 640px) { .bn-subject-card { flex-direction: row; text-align: left; gap: 14px; padding: 13px 16px; align-items: center; } .bn-subject-card-left { display: flex; align-items: center; gap: 10px; flex: 1; } .bn-subject-card-right { display: flex; align-items: center; gap: 16px; flex-shrink: 0; } }
        @media (min-width: 641px) { .bn-subject-card-left { display: contents; } .bn-subject-card-right { display: contents; } }
        .bn-subject-icon { font-size: 1.5rem; flex-shrink: 0; }
        .bn-subject-name { font-family: "Sora", sans-serif; font-size: 0.88rem; font-weight: 800; }
        .bn-subject-stat { font-size: 0.76rem; color: var(--muted); font-weight: 600; }
        .bn-subject-stat span { font-family: "Sora", sans-serif; font-size: 1rem; font-weight: 800; }

        /* MARKING */
        .bn-marking-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 12px; }
        .bn-marking-card { border-radius: var(--radius-sm); padding: 14px 10px; text-align: center; border: 1.5px solid; }
        .bn-marking-emoji { font-size: 1.1rem; margin-bottom: 4px; }
        .bn-marking-val { font-family: "Sora", sans-serif; font-size: 1.05rem; font-weight: 800; margin-bottom: 3px; }
        .bn-marking-label { font-size: 0.72rem; color: var(--muted); font-weight: 600; }

        /* ELIGIBILITY */
        .bn-elig-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        @media (max-width: 520px) { .bn-elig-grid { grid-template-columns: 1fr; } }
        .bn-elig-card { background: var(--surface-2); border: 1.5px solid var(--border); border-radius: var(--radius-md); padding: 14px 16px; display: flex; gap: 11px; align-items: flex-start; }
        .bn-elig-icon { font-size: 1.1rem; flex-shrink: 0; width: 34px; height: 34px; background: var(--surface); border-radius: 99px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); }
        .bn-elig-title { font-family: "Sora", sans-serif; font-size: 0.83rem; font-weight: 700; color: var(--text); margin-bottom: 4px; }
        .bn-elig-desc { font-size: 0.8rem; color: var(--muted); line-height: 1.6; margin: 0; }

        /* FEE TABLE */
        .bn-fee-table { width: 100%; border-collapse: collapse; }
        .bn-fee-table th { background: var(--indigo); color: #fff; padding: 10px 16px; font-family: "Sora", sans-serif; font-size: 0.8rem; font-weight: 700; text-align: left; }
        .bn-fee-table td { padding: 10px 16px; font-size: 0.85rem; border-bottom: 1px solid var(--border); color: var(--text-2); }
        .bn-fee-table tr:last-child td { border-bottom: none; }
        .bn-fee-table tr:nth-child(even) td { background: var(--surface-2); }
        .bn-fee-val { font-weight: 800; font-family: "Sora", sans-serif; color: var(--indigo); }

        /* DATES */
        .bn-dates-list { display: flex; flex-direction: column; gap: 7px; }
        .bn-date-item { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 11px 16px; background: var(--surface-2); border: 1.5px solid var(--border); border-radius: var(--radius-sm); }
        .bn-date-item--highlight { border-color: rgba(79,70,229,0.3); background: #eef2ff; }
        .bn-date-event { font-size: 0.84rem; font-weight: 600; color: var(--text-2); flex: 1; min-width: 0; }
        .bn-date-val { font-size: 0.78rem; font-weight: 700; font-family: "Sora", sans-serif; color: var(--indigo); background: var(--indigo-lt); border-radius: 999px; padding: 3px 11px; white-space: nowrap; flex-shrink: 0; }
        @media (max-width: 480px) { .bn-date-item { flex-wrap: wrap; gap: 6px; } .bn-date-event { font-size: 0.81rem; } }

        /* STEPS */
        .bn-steps-list { display: flex; flex-direction: column; gap: 12px; }
        .bn-step-card { display: flex; gap: 14px; align-items: flex-start; background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); padding: 16px; }
        .bn-step-num { width: 36px; height: 36px; border-radius: 50%; background: var(--indigo); color: #fff; font-family: "Sora", sans-serif; font-size: 0.8rem; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .bn-step-title { font-family: "Sora", sans-serif; font-size: 0.88rem; font-weight: 700; color: var(--text); margin-bottom: 5px; }
        .bn-step-desc { font-size: 0.82rem; color: var(--muted); line-height: 1.65; margin: 0; }

        /* DOCUMENTS */
        .bn-docs-list { display: flex; flex-direction: column; gap: 7px; }
        .bn-doc-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 14px; background: var(--surface-2); border: 1.5px solid var(--border); border-radius: var(--radius-sm); font-size: 0.83rem; color: var(--text-2); line-height: 1.55; }
        .bn-doc-icon { flex-shrink: 0; font-size: 0.9rem; margin-top: 1px; }

        /* TIE-BREAKING */
        .bn-tie-table { width: 100%; border-collapse: collapse; }
        .bn-tie-table th { background: var(--indigo); color: #fff; padding: 9px 14px; font-family: "Sora", sans-serif; font-size: 0.78rem; font-weight: 700; text-align: left; }
        .bn-tie-table td { padding: 10px 14px; font-size: 0.82rem; border-bottom: 1px solid var(--border); color: var(--text-2); }
        .bn-tie-table tr:last-child td { border-bottom: none; }
        .bn-tie-table tr:nth-child(even) td { background: var(--surface-2); }

        /* RESERVATION */
        .bn-res-table { width: 100%; border-collapse: collapse; }
        .bn-res-table th { background: var(--indigo); color: #fff; padding: 9px 14px; font-family: "Sora", sans-serif; font-size: 0.78rem; font-weight: 700; text-align: left; }
        .bn-res-table td { padding: 9px 14px; font-size: 0.82rem; border-bottom: 1px solid var(--border); color: var(--text-2); }
        .bn-res-table tr:last-child td { border-bottom: none; }
        .bn-res-table tr:nth-child(even) td { background: var(--surface-2); }

        /* SYLLABUS */
        .bn-syllabus-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        @media (max-width: 900px) { .bn-syllabus-grid { grid-template-columns: 1fr; gap: 10px; } }
        .bn-syllabus-card { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); overflow: hidden; }
        .bn-syllabus-header { display: flex; align-items: center; gap: 8px; padding: 11px 15px; font-family: "Sora", sans-serif; font-size: 0.88rem; font-weight: 800; color: #fff; }
        .bn-syllabus-level { font-size: 0.68rem; background: rgba(255,255,255,0.2); border-radius: 999px; padding: 2px 8px; margin-left: auto; white-space: nowrap; }
        .bn-syllabus-topics { padding: 10px 14px; }
        .bn-syllabus-topic { display: flex; align-items: flex-start; gap: 7px; font-size: 0.8rem; color: var(--text-2); padding: 5px 0; border-bottom: 1px solid var(--border); line-height: 1.4; }
        .bn-syllabus-topic:last-child { border-bottom: none; }
        .bn-syllabus-topic::before { content: '›'; font-size: 0.85rem; font-weight: 700; flex-shrink: 0; margin-top: 1px; opacity: 0.5; }
        @media (max-width: 600px) { .bn-syllabus-topics { display: grid; grid-template-columns: repeat(2, 1fr); padding: 10px 12px; } .bn-syllabus-topic { padding: 4px 2px; } }
        @media (max-width: 380px) { .bn-syllabus-topics { grid-template-columns: 1fr; } }

        /* INFO ALERT */
        .bn-info-alert { display: flex; align-items: flex-start; gap: 10px; background: #fffbeb; border: 1.5px solid #fde68a; border-radius: var(--radius-sm); padding: 12px 14px; font-size: 0.82rem; color: #92400e; line-height: 1.6; margin-top: 10px; }
        .bn-info-alert-icon { flex-shrink: 0; font-size: 1rem; }

        /* PYQ FEATURE */
        .bn-pyq-feature { background: linear-gradient(140deg, #1e3a8a 0%, #1a56db 55%, #2563eb 100%); border-radius: var(--radius-lg); padding: 28px 24px 26px; position: relative; overflow: hidden; }
        .bn-pyq-feature::before { content: ''; position: absolute; top: -60px; right: -60px; width: 220px; height: 220px; border-radius: 50%; background: rgba(255,255,255,0.07); pointer-events: none; }
        .bn-pyq-feature::after  { content: ''; position: absolute; bottom: -80px; left: -20px; width: 240px; height: 240px; border-radius: 50%; background: rgba(255,255,255,0.04); pointer-events: none; }
        .bn-pyq-feature-inner { position: relative; z-index: 1; }
        .bn-pyq-tag { display: flex; align-items: center; justify-content: center; gap: 6px; width: fit-content; margin: 0 auto 16px auto; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.28); border-radius: 999px; padding: 5px 14px; font-size: 0.75rem; font-weight: 700; color: #fff; font-family: "Sora", sans-serif; }
        .bn-pyq-tag-dot { width: 7px; height: 7px; border-radius: 50%; background: #34d399; flex-shrink: 0; }
        .bn-pyq-feature h3 { font-family: "Sora", sans-serif; font-size: clamp(1.1rem, 3.5vw, 1.45rem); font-weight: 800; color: #fff; margin-bottom: 7px; line-height: 1.25; }
        .bn-pyq-feature-desc { font-size: 0.86rem; color: rgba(255,255,255,0.80); line-height: 1.65; margin-bottom: 22px; max-width: 540px; }

        /* PYQ TABLE */
        .bn-pyq-table-wrap { border-radius: 12px; overflow: hidden; border: 1px solid #bfdbfe; }
        .bn-pyq-table { width: 100%; border-collapse: collapse; min-width: 340px; }
        .bn-pyq-table th { background: #0d6efd; color: #fff; padding: 11px 16px; font-family: inherit; font-size: 0.82rem; font-weight: 700; text-align: center; white-space: nowrap; }
        .bn-pyq-table th:first-child { text-align: left; }
        .bn-pyq-table td { background: #f9fbff; border: 1px solid #dce8ff; padding: 11px 16px; font-size: 0.86rem; text-align: center; color: #374151; vertical-align: middle; }
        .bn-pyq-table tr:nth-child(even) td { background: #f0f6ff; }
        .bn-pyq-table tr:last-child td { border-bottom: none; }
        .bn-pyq-table td:first-child { text-align: left; font-weight: 700; }

        /* DOWNLOAD BUTTON */
        .bn-dl-btn { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 5px; background: linear-gradient(90deg, #0d6efd, #6610f2); color: #fff; border: none; border-radius: 8px; padding: 9px 18px; font-size: 0.82rem; font-weight: 700; font-family: "Sora", sans-serif; cursor: pointer; overflow: hidden; z-index: 1; white-space: nowrap; text-decoration: none; }
        .bn-dl-btn::before { content: ""; position: absolute; inset: -2px; border-radius: 10px; background: linear-gradient(120deg, transparent, #00eaff, #6610f2, #00eaff, transparent); background-size: 300% 300%; animation: bnDlGlow 2.5s linear infinite; z-index: -1; }
        .bn-dl-btn::after { content: ""; position: absolute; inset: 2px; border-radius: 6px; background: linear-gradient(90deg, #0d6efd, #6610f2); z-index: -1; }
        .bn-dl-btn:hover { opacity: 0.9; color: #fff; }
        .bn-dl-btn:disabled { background: linear-gradient(90deg, #94a3b8, #64748b); cursor: not-allowed; opacity: 0.7; }
        .bn-dl-btn:disabled::before { animation: none; background: none; }
        .bn-dl-btn:disabled::after { background: linear-gradient(90deg, #94a3b8, #64748b); }
        @media (max-width: 480px) { .bn-pyq-table th, .bn-pyq-table td { padding: 9px 10px; font-size: 0.78rem; } .bn-pyq-table th:nth-child(3), .bn-pyq-table td:nth-child(3) { display: none; } .bn-dl-btn { font-size: 0.84rem; padding: 8px 16px; } }

        /* PRACTICE BANNER */
        .bn-practice-banner { position: relative; border-radius: var(--radius-lg); overflow: hidden; background: linear-gradient(140deg, #0f172a 0%, #1d4ed8 45%, #2563eb 100%); padding: 28px 24px 26px; }
        .bn-practice-banner::before { content: ''; position: absolute; top: -50px; right: -50px; width: 220px; height: 220px; border-radius: 50%; background: rgba(255,255,255,0.06); pointer-events: none; }
        .bn-practice-banner::after  { content: ''; position: absolute; bottom: -70px; left: -10px; width: 200px; height: 200px; border-radius: 50%; background: rgba(255,255,255,0.04); pointer-events: none; }
        .bn-practice-inner { position: relative; z-index: 1; }
        .bn-practice-banner h3 { font-family: "Sora", sans-serif; font-size: clamp(1.1rem, 3.5vw, 1.45rem); font-weight: 800; color: #fff; margin-bottom: 7px; line-height: 1.25; }
        .bn-practice-desc { font-size: 0.86rem; color: rgba(255,255,255,0.80); line-height: 1.65; margin-bottom: 20px; max-width: 540px; }
        .bn-practice-feats { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 22px; }
        .bn-practice-feat { display: flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; padding: 5px 12px; font-size: 0.77rem; font-weight: 600; color: rgba(255,255,255,0.92); }
        .bn-pf-dot { width: 6px; height: 6px; border-radius: 50%; background: #34d399; flex-shrink: 0; }
        .bn-practice-btns { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }

        /* ANIMATED BUTTON */
        .bn-start-btn-wrap { display: inline-flex; padding: 2.5px; border-radius: calc(var(--radius-sm) + 2.5px); background: linear-gradient(270deg, #60a5fa, #a78bfa, #34d399, #fbbf24, #f472b6, #60a5fa); background-size: 400% 400%; animation: btnBorderSpin 3s ease infinite; text-decoration: none; transition: transform 0.18s, box-shadow 0.18s; }
        .bn-start-btn-wrap:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.28); }
        .bn-practice-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: #fff; color: #1e3a8a; border-radius: var(--radius-sm); padding: 12px 22px; font-size: 0.9rem; font-weight: 800; font-family: "Sora", sans-serif; text-decoration: none; transition: background 0.18s, color 0.18s; }
        .bn-start-btn-wrap:hover .bn-practice-btn-primary { background: #eff6ff; color: #1e293b; }
        .bn-practice-btn-secondary { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.14); border: 1.5px solid rgba(255,255,255,0.3); border-radius: var(--radius-sm); padding: 12px 20px; font-size: 0.88rem; font-weight: 700; font-family: "Sora", sans-serif; color: #fff; text-decoration: none; transition: background 0.18s; }
        .bn-practice-btn-secondary:hover { background: rgba(255,255,255,0.22); color: #fff; }

        /* TIPS */
        .bn-tips-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 9px; }
        @media (max-width: 480px) { .bn-tips-grid { grid-template-columns: 1fr; } }
        .bn-tip-card { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-sm); padding: 13px 15px; display: flex; align-items: flex-start; gap: 10px; font-size: 0.83rem; color: var(--text-2); line-height: 1.55; }
        .bn-tip-icon { font-size: 1rem; flex-shrink: 0; margin-top: 1px; }

        /* SCHEDULE SLOTS */
        .bn-slot { display: flex; gap: 12px; align-items: flex-start; padding-bottom: 14px; margin-bottom: 14px; border-bottom: 1px solid var(--border); }
        .bn-slot:last-child { padding-bottom: 0; margin-bottom: 0; border-bottom: none; }
        .bn-slot-icon { font-size: 1.05rem; flex-shrink: 0; }
        .bn-slot-time { font-family: "Sora", sans-serif; font-size: 0.76rem; font-weight: 800; color: var(--indigo); margin-bottom: 2px; }
        .bn-slot-label { font-size: 0.84rem; color: var(--text-2); margin: 0; line-height: 1.5; }

        /* FAQ */
        .bn-faq-item { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); margin-bottom: 7px; overflow: hidden; }
        .bn-faq-item--open { border-color: rgba(79,70,229,0.3); }
        .bn-faq-btn { width: 100%; border: none; background: transparent; text-align: left; display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 14px 18px; cursor: pointer; min-height: 50px; -webkit-tap-highlight-color: transparent; }
        .bn-faq-q { font-family: "Sora", sans-serif; font-size: clamp(0.8rem,2vw,0.88rem); font-weight: 700; color: var(--text); line-height: 1.4; }
        .bn-faq-chevron { flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%; background: var(--surface-2); color: var(--muted); font-size: 0.65rem; display: flex; align-items: center; justify-content: center; transition: transform 0.25s, background 0.2s, color 0.2s; }
        .bn-faq-item--open .bn-faq-chevron { transform: rotate(180deg); background: var(--indigo); color: #fff; }
        .bn-faq-ans { padding: 0 18px 14px; font-size: 0.84rem; color: var(--muted); line-height: 1.72; }
        @media (max-width: 400px) { .bn-faq-btn { padding: 12px 14px; } .bn-faq-ans { padding: 0 14px 12px; } }

        /* OFFICIAL STRIP */
        .bn-official-strip { background: linear-gradient(135deg, var(--indigo) 0%, var(--indigo-dk) 100%); border-radius: var(--radius-md); padding: 18px 20px; color: #fff; display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; box-shadow: 0 6px 20px rgba(79,70,229,0.22); }
        .bn-official-text h3 { font-family: "Sora", sans-serif; font-size: 0.9rem; font-weight: 800; margin-bottom: 3px; }
        .bn-official-text p { font-size: 0.8rem; color: rgba(255,255,255,0.75); margin: 0; }
        .bn-official-link { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); border-radius: var(--radius-sm); padding: 9px 18px; color: #fff; font-weight: 700; font-size: 0.82rem; text-decoration: none; font-family: "Sora", sans-serif; transition: background 0.18s; white-space: nowrap; }
        .bn-official-link:hover { background: rgba(255,255,255,0.25); color: #fff; }

        /* RELATED */
        .bn-related-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 9px; margin-top: 14px; }
        @media (max-width: 480px) { .bn-related-grid { grid-template-columns: 1fr; } }
        .bn-related-link { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); padding: 13px 15px; text-decoration: none; color: var(--text-2); font-size: 0.83rem; font-weight: 600; display: flex; align-items: center; justify-content: space-between; gap: 8px; transition: border-color 0.18s, color 0.18s; font-family: "Sora", sans-serif; }
        .bn-related-link:hover { border-color: rgba(79,70,229,0.3); color: var(--indigo); }
        .bn-disclaimer { text-align: center; font-size: 0.73rem; color: var(--muted); margin-top: 18px; line-height: 1.65; padding: 0 8px; }

        /* RESPONSIVE */
        @media (max-width: 480px) { .bn-pyq-table-wrap { margin: 0 -16px; } .bn-hero { padding: 0px 14px 68px; } .bn-hero h1 { margin-top: 36px; } .bn-card-body { padding: 14px; } .bn-section { padding-top: 22px; } .bn-official-link { width: 100%; justify-content: center; } }
        @media (max-width: 400px) { .bn-dl-btn { font-size: 0.84rem; padding: 8px 16px; } .bn-pyq-table-wrap { margin: 0 -12px; } .bn-hero h1 { font-size: 1.32rem; margin-top: 36px; } .bn-section-title { font-size: 1rem; } }
        @media (max-width: 540px) { .bn-practice-btns { justify-content: center; align-items: center; } .bn-start-btn-wrap, .bn-practice-btn-secondary { margin-left: auto; margin-right: auto; } }
      ` }} />

      {/* BANNER */}
      {showBanner && (
        <div className="bn-banner-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowBanner(false); }}>
          <div className="bn-banner-wrapper">
            <Image width={916} height={1717}
              src="/bannerBscNursing.png"
              alt="Jharkhand B.Sc Nursing 2026 Full Test Series – Join on Futurely"
              draggable={false} loading="lazy" onClick={() => { setShowBanner(false); router.push("/test-series"); }}
            />
            <button className="bn-banner-close" onClick={() => setShowBanner(false)} aria-label="Close advertisement">✕</button>
          </div>
        </div>
      )}

      <main className="bn-page">

        {/* HERO */}
        <div className="bn-hero">
          <div className="bn-hero-inner">
            <h1>Jharkhand B.Sc Nursing Exam 2026<br />Complete Official Guide + Free PYQ Papers</h1>
            <p className="bn-hero-desc">
              JCECEB B.Sc Nursing (Basic & Post-Basic) 2026 — eligibility, Class 11–12 level syllabus, exam pattern,
              important dates, free PYQ papers, and MCQs to practice online — all in one place.
            </p>
            <div className="bn-hero-pills">
              <span className="bn-hero-pill">150 MCQs</span>
              <span className="bn-hero-pill">OMR Offline</span>
              <span className="bn-hero-pill">Class 11–12 Level</span>
            </div>
          </div>
        </div>

        <Container style={{ maxWidth: 980, padding: "0 14px", margin: "0 auto" }}>

          {/* STAT STRIP */}
          <div className="bn-stat-strip">
            {[
              { val: "150", label: "Total Questions" },
              { val: "150", label: "Total Marks" },
              { val: "3", label: "Subjects" },
              { val: "4 Yrs", label: "Course Duration (Basic)" },
            ].map((s, i) => (
              <div className="bn-stat" key={i}>
                <div className="bn-stat-val">{s.val}</div>
                <div className="bn-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          {/* AD — after stat strip */}
          <div style={{ margin: "20px 0", minHeight: 0 }}>
            <AdBanner slot="2434542863" />
          </div>

          {/* 1. HIGHLIGHTS */}
          <div className="bn-section" id="exam-info">
            <SectionHead
              label="About the Exam"
              title="Exam Highlights"
              sub="Jharkhand B.Sc Nursing entrance is a state-level exam conducted by JCECEB for admission to B.Sc Nursing (Basic) and B.Sc Nursing (Post-Basic) courses across Jharkhand."
            />
            <div className="bn-card">
              <div className="bn-card-header"><div className="bn-card-icon">📋</div><h3 className="bn-card-title">At a Glance — Official 2026 Data</h3></div>
              <div className="bn-card-body" style={{ padding: 0 }}>
                <table className="bn-highlights-table">
                  <tbody>{highlights.map((h, i) => <tr key={i}><td>{h.label}</td><td>{h.value}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
          </div>
          <Sep />

          {/* 2. PATTERN */}
          <div className="bn-section" id="pattern">
            <SectionHead label="Exam Pattern" title="Subject-wise Distribution (Basic Course)" sub="All three subjects carry equal weightage — 50 questions and 50 marks each. Syllabus is Class 11–12 (Higher Secondary) level." />
            <div className="bn-subjects-grid" style={{ marginBottom: 12 }}>
              {subjects.map((s, i) => (
                <div className="bn-subject-card" key={i} style={{ background: s.bg, borderColor: s.border }}>
                  <div className="bn-subject-card-left">
                    <span className="bn-subject-icon">{s.icon}</span>
                    <span className="bn-subject-name" style={{ color: s.color }}>{s.name}</span>
                  </div>
                  <div className="bn-subject-card-right">
                    <div className="bn-subject-stat"><span style={{ color: s.color }}>{s.questions}</span> Qs</div>
                    <div className="bn-subject-stat"><span style={{ color: s.color }}>{s.marks}</span> Marks</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bn-marking-grid">
              <div className="bn-marking-card" style={{ background: "#ecfdf5", borderColor: "#6ee7b7" }}><div className="bn-marking-emoji">✅</div><div className="bn-marking-val" style={{ color: "#059669" }}>+1</div><div className="bn-marking-label">Correct Answer</div></div>
              <div className="bn-marking-card" style={{ background: "#f9fafb", borderColor: "#e5e7eb" }}><div className="bn-marking-emoji">⬜</div><div className="bn-marking-val" style={{ color: "#6b7280" }}>0</div><div className="bn-marking-label">Wrong Answer*</div></div>
              <div className="bn-marking-card" style={{ background: "#f9fafb", borderColor: "#e5e7eb" }}><div className="bn-marking-emoji">⬜</div><div className="bn-marking-val" style={{ color: "#6b7280" }}>0</div><div className="bn-marking-label">Unattempted</div></div>
            </div>
            <div className="bn-info-alert">
              <span className="bn-info-alert-icon">⚠️</span>
              <span><strong>Note:</strong> Most JCECEB Nursing exams do NOT have negative marking, but this can vary year to year — always confirm from your admit card / instruction sheet before the exam.</span>
            </div>
          </div>
          <Sep />

          {/* 3. ELIGIBILITY */}
          <div className="bn-section" id="eligibility">
            <SectionHead label="Who Can Apply" title="Eligibility Criteria 2026" sub="Official eligibility as per JCECEB B.Sc Nursing (Basic / Post-Basic) 2026 Prospectus." />
            <div className="bn-elig-grid">
              {eligibility.map((e, i) => (
                <div className="bn-elig-card" key={i}>
                  <div className="bn-elig-icon">{e.icon}</div>
                  <div><p className="bn-elig-title">{e.title}</p><p className="bn-elig-desc">{e.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
          <Sep />
          <div className="bt-scard" style={{ padding: "8px", minHeight: 0 }}>
            <AdBanner slot="8679502538" format="auto" />
          </div>

          {/* 4. FEE */}
          <div className="bn-section" id="fee">
            <SectionHead label="Fees" title="Application Fee 2026 (Estimated)" />
            <div className="bn-card">
              <div className="bn-card-body" style={{ padding: 0 }}>
                <table className="bn-fee-table">
                  <thead><tr><th>Category</th><th style={{ textAlign: "center" }}>Application Fee</th></tr></thead>
                  <tbody>{applicationFee.map((f, i) => <tr key={i}><td>{f.category}</td><td style={{ textAlign: "center" }} className="bn-fee-val">{f.fee}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
            <p style={{ fontSize: "0.76rem", color: "var(--muted)", marginTop: 8 }}>
              * Fee figures above are estimated based on JCECEB's ANM/GNM fee structure since the B.Sc Nursing 2026 information bulletin has not been released yet. Paid online only via Credit Card, Net Banking or UPI. Always verify the exact fee from the official bulletin once released.
            </p>
          </div>
          <Sep />

          {/* 5. DATES */}
          <div className="bn-section" id="dates">
            <SectionHead
              label="Schedule"
              title="Important Dates 2026"
              sub="As of now, the JCECEB B.Sc Nursing 2026 information bulletin is yet to be released. Exact dates will be updated here as soon as they are announced — bookmark this page or check jceceb.jharkhand.gov.in directly."
            />
            <div className="bn-dates-list">
              {importantDates.map((d, i) => (
                <div className={`bn-date-item${d.highlight ? " bn-date-item--highlight" : ""}`} key={i}>
                  <span className="bn-date-event">{d.event}</span>
                  <span className="bn-date-val">{d.date}</span>
                </div>
              ))}
            </div>
          </div>
          <Sep />

          {/* 6. HOW TO APPLY */}
          <div className="bn-section" id="apply">
            <SectionHead
              label="Application Process"
              title="How to Apply Online — Step by Step"
              sub="Official online application process as per the JCECEB B.Sc Nursing Entrance Prospectus."
            />
            <div className="bn-steps-list">
              {onlineApplicationSteps.map((s, i) => (
                <div className="bn-step-card" key={i}>
                  <div className="bn-step-num">{i + 1}</div>
                  <div>
                    <p className="bn-step-title">{s.icon} {s.title}</p>
                    <p className="bn-step-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bn-info-alert">
              <span className="bn-info-alert-icon">⚠️</span>
              <span>
                <strong>Important:</strong> Application form का printout JCECEB Board Office को भेजने की जरूरत नहीं है — सिर्फ अपने पास future reference के लिए रखें।
                Admit card पर एक self-attested photograph चिपकाना और उसे carry करना अनिवार्य है।
              </span>
            </div>
          </div>
          <Sep />

          <div className="bt-scard" style={{ padding: "8px", minHeight: 0 }}>
            <AdBanner slot="3636692323" format="auto" />
          </div>

          {/* 7. DOCUMENTS */}
          <div className="bn-section" id="documents">
            <SectionHead
              label="Counselling Documents"
              title="Documents Required at Interview / Counselling"
              sub="Original documents + self-attested copies mandatory. Xerox/Fax copies alone will NOT be accepted."
            />
            <div className="bn-docs-list">
              {documentsRequired.map((doc, i) => (
                <div className="bn-doc-item" key={i}>
                  <span className="bn-doc-icon">📄</span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>
          <Sep />

          {/* 8. TIE-BREAKING */}
          <div className="bn-section" id="merit">
            <SectionHead
              label="Merit List"
              title="Tie-Breaking Rules"
              sub="If two or more candidates score equal marks, the merit rank is typically decided in this order (verify with the official bulletin, as JCECEB may refine these criteria each year):"
            />
            <div className="bn-card">
              <div className="bn-card-body" style={{ padding: 0 }}>
                <table className="bn-tie-table">
                  <thead>
                    <tr><th>Priority</th><th>Condition</th><th>Resolution</th></tr>
                  </thead>
                  <tbody>
                    {tieBreakingRules.map((r, i) => (
                      <tr key={i}>
                        <td style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, color: "var(--indigo)" }}>#{r.rank}</td>
                        <td>{r.condition}</td>
                        <td style={{ fontWeight: 600 }}>{r.resolution}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bn-info-alert">
              <span className="bn-info-alert-icon">💡</span>
              <span><strong>Strategy tip:</strong> Biology (khaas taur par Human Physiology) पर strong पकड़ बनाओ — यह सबसे scoring और tie-breaking में प्राथमिकता वाला subject है।</span>
            </div>
          </div>
          <Sep />
          <div className="bt-scard" style={{ padding: "8px", minHeight: 0 }}>
            <AdBanner slot="6242297060" format="auto" />
          </div>

          {/* 9. RESERVATION */}
          <div className="bn-section" id="reservation">
            <SectionHead
              label="Reservation Policy"
              title="Category-wise Reservation"
              sub="Seat allocation as per Jharkhand Reservation Act 2001 and JCECEB norms applicable across its entrance exams."
            />
            <div className="bn-card">
              <div className="bn-card-body" style={{ padding: 0 }}>
                <table className="bn-res-table">
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
          <div className="bn-section" id="syllabus">
            <SectionHead
              label="What to Study"
              title="B.Sc Nursing Exam Syllabus 2026 (Basic Course)"
              sub="Class 11–12 (Higher Secondary) level — Physics, Chemistry & Biology as per NCERT and Jharkhand State Board. This is notably higher than the Class 10 level syllabus used for ANM/GNM."
            />
            <div className="bn-syllabus-grid">
              {syllabusSummary.map((sub, i) => (
                <div className="bn-syllabus-card" key={i}>
                  <div className="bn-syllabus-header" style={{ background: sub.color }}>
                    <span>{sub.icon}</span>
                    <span>{sub.subject}</span>
                    <span className="bn-syllabus-level">{sub.level}</span>
                  </div>
                  <div className="bn-syllabus-topics">
                    {sub.topics.map((t, j) => <div className="bn-syllabus-topic" key={j}>{t}</div>)}
                  </div>
                </div>
              ))}
            </div>
            <div className="bn-info-alert">
              <span className="bn-info-alert-icon">📌</span>
              <span>
                यह syllabus JCECEB official notifications और NCERT Class 11-12 curriculum से compiled है।
                Class 12 Board की तैयारी ही इस entrance exam की सबसे मजबूत नींव है।
              </span>
            </div>
          </div>
          <Sep />
          {/* AD — between syllabus and PYQ */}
          <div style={{ margin: "20px 0", minHeight: 0 }}>
            <AdBanner slot="8729236906" format="fluid" layout="in-article" />
          </div>

          {/* 11. PYQ */}
          <div className="bn-section" id="pyq">
            <SectionHead label="Previous Year Papers" title="Jharkhand B.Sc Nursing PYQ Papers" />
            <div className="bn-pyq-feature">
              <div className="bn-pyq-feature-inner">
                <span className="bn-pyq-tag"><span className="bn-pyq-tag-dot" />📄 Download B.Sc Nursing Question Paper PDF — Free</span>
                <h3>Official PYQ Papers — Jharkhand B.Sc Nursing Entrance</h3>
                <p className="bn-pyq-feature-desc">
                  B.Sc Nursing exam में पुराने papers से questions repeat होते हैं। जैसे ही official papers उपलब्ध होंगे,
                  Physics, Chemistry और Biology — सभी के papers यहाँ free download के लिए मिलेंगे।
                </p>
                <div className="bn-pyq-table-wrap">
                  <table className="bn-pyq-table">
                    <thead><tr><th>Year</th><th>Paper Name</th><th>Subjects</th><th>Download &amp; Preview</th></tr></thead>
                    <tbody>
                      {pyqPapers.map((p, i) => (
                        <tr key={i}>
                          <td><strong style={{ color: "#4f46e5", fontFamily: "Sora, sans-serif", fontSize: "1rem" }}>{p.year}</strong></td>
                          <td>Jharkhand B.Sc Nursing {p.year}</td>
                          <td style={{ color: "#64748b", fontSize: "0.78rem" }}>Phy · Chem · Bio (150 MCQs)</td>
                          <td>
                            {p.driveUrl ? (
                              <Link
                                href={`/resources/jharkhand-nursing/bsc-nursing/pdf?year=${p.year}&subject=B.Sc%20Nursing%20Question%20Paper`}
                                className="bn-dl-btn"
                                aria-label={`Read and Download B.Sc Nursing ${p.year} Question Paper PDF`}
                              >
                                📥Download PDF
                              </Link>
                            ) : (
                              <button className="bn-dl-btn" disabled>⏳ Coming Soon</button>
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
          <div className="bn-section" id="practice">
            <SectionHead label="Online Mock Test" title="Practice B.Sc Nursing Online — Free MCQs" />
            <div className="bn-practice-banner">
              <div className="bn-practice-inner">
                <h3>Practice Jharkhand B.Sc Nursing Questions Online</h3>
                <p className="bn-practice-desc">
                  Futurely पर Jharkhand B.Sc Nursing MCQs online attempt करो — timer के साथ, instant score के साथ,
                  और detailed solution के साथ। Subject-wise practice करो — जैसे चाहो।
                </p>
                <div className="bn-practice-feats">
                  {["Subject-wise Practice", "Instant Solutions", "Score Tracking", "Free Forever"].map((feat, i) => (
                    <div className="bn-practice-feat" key={i}><div className="bn-pf-dot" />{feat}</div>
                  ))}
                </div>
                <div className="bn-practice-btns">
                  <Link href="/exam-preparation/jharkhand-bsc-nursing" className="bn-start-btn-wrap">
                    <span className="bn-practice-btn-primary">🚀 Start Preparation Now — Free</span>
                  </Link>
                  <Link href="/test-series" className="bn-practice-btn-secondary">📝 Full Mock Test</Link>
                </div>
              </div>
            </div>
          </div>
          <Sep />



          {/* 13. TIPS */}
          <div className="bn-section" id="preparation">
            <SectionHead label="Strategy" title="How to Prepare for B.Sc Nursing 2026" sub="Practical tips based on official exam pattern and syllabus." />
            <div className="bn-tips-grid" style={{ marginBottom: 20 }}>
              {preparationTips.map((t, i) => (
                <div className="bn-tip-card" key={i}><span className="bn-tip-icon">{t.icon}</span><span>{t.tip}</span></div>
              ))}
            </div>

            <p className="bn-section-label" style={{ marginBottom: 12 }}>Recommended Daily Schedule</p>
            <div className="bn-card" style={{ marginBottom: 14 }}>
              <div className="bn-card-body">
                {[
                  { time: "7:00 – 9:00 AM", activity: "Theory reading (NCERT Class 11 & 12 — Biology, focus on Human Physiology)", icon: "📖" },
                  { time: "10:00 AM – 12:00 PM", activity: "Practice MCQs — Physics and Chemistry sections", icon: "✏️" },
                  { time: "2:00 – 4:00 PM", activity: "Mock tests with OMR sheet practice — time yourself strictly", icon: "📝" },
                  { time: "5:00 – 6:30 PM", activity: "Revision — Biology diagrams, formulas, short notes, error analysis", icon: "🔁" },
                ].map((slot, i, arr) => (
                  <div className="bn-slot" key={i} style={i === arr.length - 1 ? { borderBottom: "none", marginBottom: 0, paddingBottom: 0 } : {}}>
                    <span className="bn-slot-icon">{slot.icon}</span>
                    <div><p className="bn-slot-time">{slot.time}</p><p className="bn-slot-label">{slot.activity}</p></div>
                  </div>
                ))}
              </div>
            </div>

            <p className="bn-section-label" style={{ marginBottom: 12 }}>Recommended Books</p>
            <div className="bn-card">
              <div className="bn-card-body">
                {[
                  { subject: "Physics", books: "NCERT Class 11 & 12 Physics, D.C. Pandey Objective Physics" },
                  { subject: "Chemistry", books: "NCERT Class 11 & 12 Chemistry, MTG Objective NCERT at your Fingertips" },
                  { subject: "Biology", books: "NCERT Class 11 & 12 Biology, Trueman's Elementary Biology Vol 1 & 2" },
                ].map((b, i, arr) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", paddingBottom: i < arr.length - 1 ? 14 : 0, marginBottom: i < arr.length - 1 ? 14 : 0, borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <span style={{ fontFamily: "Sora, sans-serif", fontSize: "0.68rem", fontWeight: 800, background: "var(--indigo)", color: "#fff", borderRadius: 6, padding: "3px 8px", flexShrink: 0, marginTop: 2 }}>{b.subject}</span>
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
          <div className="bn-section" id="faq">
            <SectionHead label="FAQ" title="Frequently Asked Questions" sub="Common doubts about Jharkhand B.Sc Nursing Entrance Exam 2026, answered based on official information." />
            {faqs.map((faq, i) => (
              <div className={"bn-faq-item" + (openFaq === i ? " bn-faq-item--open" : "")} key={i}>
                <button className="bn-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                  <span className="bn-faq-q">{faq.q}</span>
                  <span className="bn-faq-chevron">▾</span>
                </button>
                {openFaq === i && <div className="bn-faq-ans">{faq.a}</div>}
              </div>
            ))}
          </div>
          <Sep />

          {/* OFFICIAL STRIP */}
          <div style={{ paddingTop: 24 }}>
            <div className="bn-official-strip">
              <div className="bn-official-text">
                <h3>Official Website – JCECEB Jharkhand</h3>
                <p>Apply online, download admit card, check results & counselling schedule at the official portal.</p>
              </div>
              <a href="https://jceceb.jharkhand.gov.in" target="_blank" rel="noopener noreferrer" className="bn-official-link">
                🌐 jceceb.jharkhand.gov.in
              </a>
            </div>
          </div>

          {/* RELATED */}
          <div className="bn-related-grid">
            <Link href="/resources/jharkhand-anm/exam-information" className="bn-related-link"><span>♀️ Jharkhand ANM Guide</span><span>›</span></Link>
            <Link href="/exam-preparation/jharkhand-bsc-nursing" className="bn-related-link"><span>🎯 Practice B.Sc Nursing MCQs</span><span>›</span></Link>
            <Link href="/resources" className="bn-related-link"><span>📚 All Jharkhand Resources</span><span>›</span></Link>
          </div>

          <p className="bn-disclaimer">
            All information is compiled from official JCECEB notifications, prior year's B.Sc Nursing prospectus, and publicly available exam-prep sources.
            The 2026 information bulletin has not been officially released at the time of writing — several fields above (dates, exact fee, duration) are best estimates and must be verified at{" "}
            <a href="https://jceceb.jharkhand.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "var(--indigo)" }}>
              jceceb.jharkhand.gov.in
            </a>{" "}
            once the official bulletin is out.
            Futurely is not affiliated with JCECEB or the Government of Jharkhand.
          </p>

        </Container>
      </main>
    </>
  );
};

export default JHNursingBsc;