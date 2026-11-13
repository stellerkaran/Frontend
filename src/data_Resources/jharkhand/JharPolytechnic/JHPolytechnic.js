"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdBanner from "@/components/AdBanner";
import Image from "next/image";

/* ─────────────────────────────────────────────
   STATIC DATA  — verified from official PECE 2026 Prospectus
───────────────────────────────────────────── */
const highlights = [
  { label: "Exam Name", value: "Polytechnic Entrance Competitive Examination (PECE)" },
  { label: "Conducting Body", value: "JCECEB, Jharkhand" },
  { label: "Exam Level", value: "State-Level Entrance" },
  { label: "Admission To", value: "Diploma Engineering Colleges (Govt., Private & PPP Mode)" },
  { label: "Exam Mode", value: "Offline – OMR Based (Pen & Paper)" },
  { label: "Exam Timing", value: "10:30 AM – 1:00 PM" },
  { label: "Duration", value: "2 Hours 30 Minutes (150 Minutes)" },
  { label: "Total Questions", value: "150 MCQs" },
  { label: "Total Marks", value: "150 Marks" },
  { label: "Marking Scheme", value: "+1 for correct, –0.25 for wrong, 0 for unattempted" },
  { label: "Question Type", value: "Objective (Multiple Choice) — Bilingual Hindi & English" },
  { label: "Syllabus Level", value: "Madhyamik / Secondary (Class 10) Level" },
  { label: "Age Limit", value: "Min 17 years (as on 1 July 2026) for Mining Engineering only; No limit for other branches" },
  { label: "Minimum Qualification", value: "Class 10 / Madhyamik / Equivalent with min 35% marks" },
];

const subjects = [
  { name: "Physics (Bhautik Vigyan)", icon: "⚛️", questions: 50, marks: 50, color: "#3b82f6", bg: "#eff6ff", border: "#bfdbfe" },
  { name: "Chemistry (Rasayan Vigyan)", icon: "🧪", questions: 50, marks: 50, color: "#10b981", bg: "#ecfdf5", border: "#a7f3d0" },
  { name: "Mathematics (Ganit)", icon: "📐", questions: 50, marks: 50, color: "#f59e0b", bg: "#fffbeb", border: "#fde68a" },
];

const eligibility = [
  {
    icon: "📘",
    title: "Class 10 Pass (Madhyamik / Equivalent)",
    desc: "Candidate must have passed Class 10th or equivalent Madhyamik examination from a recognised Board with minimum 35% marks. Appearing candidates may also apply but must produce the passing certificate before counselling.",
  },
  {
    icon: "📍",
    title: "Jharkhand Domicile Required",
    desc: "Only Indian citizens who are permanent or local residents of Jharkhand State can apply. A valid domicile/residential certificate issued by Anchal Adhikari or District Magistrate of Jharkhand is mandatory at counselling.",
  },
  {
    icon: "🎂",
    title: "Age Limit — Mining Engineering Only",
    desc: "For the Mining Engineering branch only: minimum age 17 years as on 1 July 2026 is required. No minimum or maximum age limit exists for all other engineering diploma branches.",
  },
  {
    icon: "🏥",
    title: "Medical Fitness",
    desc: "Candidates recommended through the interview/counselling must produce a Medical Fitness Certificate issued by a Registered Medical Practitioner at the time of enrollment, otherwise admission will not be granted.",
  },
];

const importantDates = [
  { event: "Application Form Release (Online)", date: "19 May 2026", highlight: false },
  { event: "Last Date to Apply (Online)", date: "17 June 2026", highlight: false },
  { event: "Application Correction Window", date: "18 – 19 June 2026", highlight: false },
  { event: "Admit Card Download", date: "4 Days Before Exam", highlight: false },
  { event: "Exam Date", date: "5 July 2026 (Sunday)", highlight: true },
  { event: "Exam Timing", date: "10:30 AM – 1:00 PM", highlight: true },
  { event: "Exam Centers", date: "Ranchi, Hazaribagh, Jamshedpur, Dhanbad, Dumka, Chaibasa, Bokaro, Palamu", highlight: false },
  { event: "Result Declaration", date: "End of July 2026 (Expected)", highlight: false },
  { event: "Counselling Process", date: "August 2026 (Expected)", highlight: false },
];

const applicationFee = [
  { category: "General / EWS / BC-I / BC-II", fee: "₹650" },
  { category: "SC / ST (All) / Female Candidates (All Categories)", fee: "₹325" },
  { category: "PwBD / Divyang Candidates (All Categories)", fee: "Exempted" },
];

const onlineApplicationSteps = [
  {
    title: "Registration & Form Filling",
    desc: "Visit jceceb.jharkhand.gov.in → Click 'Online Application for PECE – 2026'. Fill Personal Details (Name, DOB, Gender, Category, EWS, SMQ, MCQ, Aadhaar, Exam Centre Choice), Educational Details (10th Board, Year, Marks/CGPA), and Communication Address. Set password with at least one Capital Letter, one Small Letter & one Number.",
    icon: "📝",
  },
  {
    title: "Image Uploading",
    desc: "Upload: Colour Photo (10–100 KB, JPG/JPEG, white background, both ears visible), Signature (5–50 KB, JPG/JPEG), Left-hand Thumb Impression (10–50 KB, JPG/JPEG). Preview all images carefully. Use 'Edit Application' if corrections are needed before saving.",
    icon: "📷",
  },
  {
    title: "Application Fee Payment",
    desc: "Pay online via Credit Card, Net Banking, or UPI through the payment gateway. After successful payment, login to 'Applicant Login' on the JCECEB website and print your confirmation page. Fee is non-refundable. Do NOT send printout to JCECEB board office.",
    icon: "💳",
  },
];

const documentsRequired = [
  "Matriculation / 10th Class Admit Card, Marksheet & Passing Certificate (original + self-attested copy)",
  "Jharkhand Domicile / Local Resident Certificate (issued by Anchal Adhikari / District Magistrate / Upayukt of Jharkhand)",
  "Caste Certificate — SC/ST/BC-I/BC-II (issued by authorised Jharkhand officer) — if claiming reservation",
  "EWS Income & Assets Certificate (issued by Anchal Adhikari / DM — dated within 1 year) — if claiming EWS",
  "PwBD / Divyang Certificate from District Hospital Orthopaedics / Civil Surgeon + Full-size photograph (if applicable)",
  "Ex-Servicemen Ashrit Certificate from District Sainik Parishad or Sainik Officer (if claiming SMQ quota)",
  "MCQ (Muslim Community Quota) Certificate — only for Al-Kabir Polytechnic, Jamshedpur applicants",
  "PECE 2026 Admit Card (mandatory at interview/counselling)",
  "Recent Colour Photograph, Signature & Left Thumb Impression",
  "Anti-Ragging Affidavit (as prescribed by UGC — format on JCECEB website Downloads section)",
];

const tieBreakingRules = [
  { rank: "1", condition: "Total Marks equal", resolution: "Higher marks in Mathematics (Ganit)" },
  { rank: "2", condition: "Step 1 equal (Maths same)", resolution: "Higher marks in Physics (Bhautik Vigyan)" },
  { rank: "3", condition: "Steps 1 & 2 equal", resolution: "Candidate with earlier Date of Birth (older candidate)" },
  { rank: "4", condition: "Steps 1, 2 & 3 equal", resolution: "Alphabetical order of First Name (English alphabet)" },
];

const reservationCategories = [
  { category: "SC (Scheduled Caste)", detail: "As per Jharkhand Reservation Act 2001" },
  { category: "ST (Scheduled Tribe)", detail: "As per Jharkhand Reservation Act; min 2% for Adi Jan Jati within ST seats" },
  { category: "BC-I / BC-II (Backward Classes)", detail: "Non-Creamy Layer certificate mandatory; Creamy Layer candidates treated as General" },
  { category: "EWS (Economically Weaker Section)", detail: "Income < ₹8 lakh/year; certificate from DM within 1 year; all EWS seats unreserved" },
  { category: "SMQ — Ex-Servicemen Quota", detail: "Priority order: widows of fallen soldiers → disabled serving/retired → peacetime deceased → peacetime disabled → Vir Chakra awardees → retired → serving" },
  { category: "MCQ — Muslim Community Quota", detail: "50 reserved seats at Al-Kabir Polytechnic, Mango, Jamshedpur only" },
  { category: "PwBD / Divyang", detail: "Seats reserved in every Polytechnic branch (blindness/low vision, hearing impairment, locomotor disability ≥40%)" },
  { category: "TFW — Tuition Fee Waiver", detail: "5% additional seats per branch; family income < ₹8 lakh; all TFW seats unreserved (merit-based)" },
];

const syllabusSummary = [
  {
    subject: "Physics",
    icon: "⚛️",
    color: "#3b82f6",
    level: "Secondary Level",
    topics: [
      "Measurement",
      "Kinetic",
      "Law of Motion",
      "Work, Power and Energy",
      "Kinetic Theory of Gases",
      "Heat and Thermal Expansions",
      "Thermodynamic",
      "Rotary Motion of Rigid Body",
      "Gravitation",
      "Simple Harmonic Motion",
      "Hydrostatic",
      "Reflection of Light",
      "Optical Instrument",
      "Electrostatics",
      "Current Electricity",
      "Transmission of Heat",
      "Wave Motion",
      "Electromagnetic",
      "Electromagnetic Induction",
    ],
  },
  {
    subject: "Chemistry",
    icon: "🧪",
    color: "#10b981",
    level: "Secondary Level",
    topics: [
      "Element",
      "Mixture and Compound",
      "Molecules and Equivalent Masses",
      "Group Elements",
      "Important Chemical Compounds",
      "Electrochemistry",
      "Catalysis",
      "Different Chemical Reaction",
      "Periodic Classification of Element",
      "Law of Chemical Combination and Gases Law",
      "Atomic Structure",
      "Valency",
      "Concept of Atomic",
      "Hydrocarbons",
      "Polymer",
      "Detergent, Drugs and Explosive",
    ],
  },
  {
    subject: "Mathematics",
    icon: "📐",
    color: "#f59e0b",
    level: "Secondary Level",
    topics: [
      "Number System",
      "Time and Distance",
      "Rational Expression",
      "Logarithm",
      "Linear Equations",
      "Quadratic Equation",
      "Factorization",
      "LCM & HCF",
      "Set",
      "Time and Work",
      "Simple Interest & Compound Interest",
      "Banking",
      "Relation and Function",
      "Trigonometry Ratio and Identities",
      "Trigonometric Formula",
      "Statistics",
      "Geometry",
      "Height and Distance",
      "Area, Volume and Surface Area",
      "Rectangular Coordinates",
      "The Straight Line",
    ],
  },
];

const pyqPapers = [
  { year: "2026", driveUrl: "https://drive.google.com/file/d/1CjDK8jVPnqzxtXR4_Kw3V0imhD4l-R16/view" },
  { year: "2025", driveUrl: "https://drive.google.com/file/d/18asg7qiIY9TYGcpUU9Q4Ghb3kdJm6WFZ/view" },
  { year: "2024", driveUrl: "https://drive.google.com/file/d/17rK99BvD_E6zJMWLO_Loqp0NgVWmV_Z3/view" },
  { year: "2023", driveUrl: "https://drive.google.com/file/d/18SHXRF3MrK_agzA3T3Ncd24G7vqerVl9/view" },
  { year: "2022", driveUrl: "https://drive.google.com/file/d/1NeXaMaHortAK8HEAf9Pcd_SiXAaaNiNi/view" },
  { year: "2021", driveUrl: "https://drive.google.com/file/d/1otyj5pK4yjSbtOXr4JIQpoE2qbtf0HFv/view" },
];

const preparationTips = [
  { icon: "📅", tip: "Official syllabus JCECEB portal से है — NCERT Class 9 & 10 के साथ Jharkhand State Board की Secondary level books भी पढ़ो।" },
  { icon: "📝", tip: "Solve all 5 years of PYQs — many questions repeat every year. Pattern recognition is key." },
  { icon: "⏱️", tip: "Practice OMR sheets during mock tests — bubbling errors cost marks even when you know the answer." },
  { icon: "🎯", tip: "Attempt easy questions first in the 2.5-hour paper; don't waste time on tough ones early." },
  { icon: "🔁", tip: "Revise formulas and concepts daily in the final 2 weeks — recall speed matters in MCQ exams." },
  { icon: "📊", tip: "Focus extra on Maths — tie-breaking is decided first by Maths marks, then Physics marks." },
];

const faqs = [
  {
    q: "Jharkhand Polytechnic (PECE) exam क्या है?",
    a: "Jharkhand Polytechnic Entrance Competitive Examination (PECE) JCECEB (Jharkhand Combined Entrance Competitive Examination Board) द्वारा आयोजित की जाती है। यह exam Jharkhand के Government, Private और PPP mode पर संचालित Polytechnic Colleges में Diploma Engineering के सभी branches में admission के लिए होती है।",
  },
  {
    q: "PECE 2026 exam date Aur timing क्या है?",
    a: "Official notification के अनुसार, PECE 2026 exam 5 July 2026 (Sunday) को आयोजित होगी। Exam timing सुबह 10:30 AM से दोपहर 1:00 PM तक है, यानी exam की duration 2 घंटे 30 मिनट (150 minutes) है। Exam Ranchi, Hazaribagh, Jamshedpur, Dhanbad, Dumka, Chaibasa, Bokaro और Palamu के exam centers पर होगी।",
  },
  {
    q: "Polytechnic exam का syllabus क्या है?",
    a: "Official syllabus के अनुसार, exam में Madhyamik / Secondary (Class 10) level के Physics (Bhautik Vigyan), Chemistry (Rasayan Vigyan) और Mathematics (Ganit) के questions होते हैं। तीनों subjects में 50-50 questions होते हैं — कुल 150 questions और 150 marks।",
  },
  {
    q: "Eligibility क्या है? Minimum marks कितने चाहिए?",
    a: "Candidate को Class 10 या equivalent Madhyamik किसी recognised board से minimum 35% marks के साथ pass होना चाहिए। Jharkhand domicile भी जरूरी है। Appearing candidates भी apply कर सकते हैं लेकिन counselling से पहले passing certificate produce करना अनिवार्य होगा।",
  },
  {
    q: "Age limit क्या है?",
    a: "Mining Engineering branch के लिए minimum age 17 years (as on 1 July 2026) अनिवार्य है। बाकी सभी Diploma Engineering branches के लिए कोई minimum या maximum age limit नहीं है।",
  },
  {
    q: "Tie-breaking rules क्या हैं?",
    a: "अगर दो candidates के total marks equal हों तो पहले Mathematics के marks देखे जाते हैं। अगर वो भी equal हों तो Physics marks। फिर Date of Birth (पहले जन्मे candidate को priority) और अंत में First Name का English alphabetical order।",
  },
  {
    q: "Exam किस mode में होती है और negative marking है क्या?",
    a: "Exam offline OMR-based mode (pen & paper) में होती है। Duration 2 hours 30 minutes है। सही answer पर +1 mark मिलता है। गलत answer पर –0.25 mark काटे जाते हैं। Unattempted questions पर कोई mark नहीं काटा जाता। एक question में एक से अधिक विकल्प भरने पर गलत माना जाएगा।",
  },
  {
    q: "Application fee कितनी है?",
    a: "General/EWS/BC-I/BC-II candidates के लिए ₹650 और SC/ST/Female/Divyang candidates के लिए ₹325 (Divyang के लिए exempted) है। Fee online mode में — Credit Card, Net Banking या UPI से — जमा होती है। Fee non-refundable है।",
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

export default function JHPolytechnicClient() {
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
              alt="Jharkhand Polytechnic 2026 Full Test Series – Join on Futurely"
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
            <h1>Jharkhand Polytechnic Exam 2026<br />Complete Official Guide + Free PYQ Papers</h1>
            <p className="jp-hero-desc">
              JCECEB PECE 2026 — eligibility, Class 10 syllabus, exam pattern, important dates,
              5 years of free PYQ papers, and 750+ MCQs to practice online — all in one place.
            </p>
            <div className="jp-hero-pills">
              <span className="jp-hero-pill">2h 30m Exam</span>
              <span className="jp-hero-pill">OMR Offline</span>
              <span className="jp-hero-pill">–0.25 Negative</span>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 980, padding: "0 14px" }} className="mx-auto">

          {/* STAT STRIP */}
          <div className="jp-stat-strip">
            {[
              { val: "150", label: "Total Questions" },
              { val: "150", label: "Total Marks" },
              { val: "2.5h", label: "Duration" },
              { val: "5 July", label: "Exam Date 2026" },
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
              sub="Jharkhand Polytechnic (PECE) is a state-level entrance conducted by JCECEB for admission to Diploma Engineering colleges across Jharkhand."
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
            <SectionHead label="Exam Pattern" title="Subject-wise Distribution" sub="All three subjects carry equal weightage — 50 questions and 50 marks each. Syllabus is Madhyamik (Class 10) level." />
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
              <div className="jp-marking-card" style={{ background: "#ecfdf5", borderColor: "#6ee7b7" }}><div className="jp-marking-emoji">✅</div><div className="jp-marking-val" style={{ color: "#059669" }}>+1</div><div className="jp-marking-label">Correct Answer</div></div>
              <div className="jp-marking-card" style={{ background: "#fee2e2", borderColor: "#fca5a5" }}><div className="jp-marking-emoji">❌</div><div className="jp-marking-val" style={{ color: "#dc2626" }}>−0.25</div><div className="jp-marking-label">Wrong Answer</div></div>
              <div className="jp-marking-card" style={{ background: "#f9fafb", borderColor: "#e5e7eb" }}><div className="jp-marking-emoji">⬜</div><div className="jp-marking-val" style={{ color: "#6b7280" }}>0</div><div className="jp-marking-label">Unattempted</div></div>
            </div>
            <div className="jp-info-alert">
              <span className="jp-info-alert-icon">⚠️</span>
              <span><strong>Multiple answers = Wrong answer:</strong> एक question में एक से अधिक विकल्प भरने पर उसे गलत उत्तर माना जाएगा और –0.25 mark काटे जाएंगे।</span>
            </div>
          </div>
          <Sep />

          {/* 3. ELIGIBILITY */}
          <div className="jp-section" id="eligibility">
            <SectionHead label="Who Can Apply" title="Eligibility Criteria 2026" sub="Official eligibility as per JCECEB PECE 2026 Prospectus." />
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

          {/* AD — after eligibility */}
          <div className="jp-scard" style={{ padding: "8px", minHeight: 0 }}>
            <AdBanner slot="8679502538" format="auto" />
          </div>

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
              * Paid online only via Credit Card, Net Banking or UPI. Fee is non-refundable under any circumstances.
            </p>
          </div>
          <Sep />

          {/* 5. DATES */}
          <div className="jp-section" id="dates">
            <SectionHead
              label="Schedule"
              title="Important Dates 2026"
              sub="Official dates from JCECEB PECE 2026 notification. Always verify latest updates at jceceb.jharkhand.gov.in."
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
              sub="Official 3-step online application process as per JCECEB PECE 2026 Prospectus."
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
                <strong>Important:</strong> Application form का printout JCECEB Board Office को भेजने की जरूरत नहीं है। 3-4 copies अपने पास रखें।
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
              sub="If two or more candidates score equal marks, the merit rank is decided in this order — as per PECE 2026 Prospectus Section 17:"
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
              <span><strong>Strategy tip:</strong> Tie-breaking पहले Mathematics marks से होता है — इसलिए Maths पर extra focus दो।</span>
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
              sub="Seat allocation as per Jharkhand Reservation Act 2001 and JCECEB PECE 2026 Prospectus Section 9."
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
              * TFW seats are 5% additional (supernumerary) per branch — not counted from main seats.
              Al-Kabir Polytechnic MCQ quota is 50 reserved seats only for Muslim community candidates.
            </p>
          </div>
          <Sep />

          {/* 10. SYLLABUS */}
          <div className="jp-section" id="syllabus">
            <SectionHead
              label="What to Study"
              title="Polytechnic Exam Syllabus 2026 (Official)"
              sub="Madhyamik / Secondary (Class 10) level — Physics, Chemistry & Mathematics as per NCERT and Jharkhand State Board."
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
                यह syllabus directly JCECEB official portal से लिया गया है। Topics Class 10 से थोड़े आगे तक जाते हैं —
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
            <SectionHead label="Free Question Papers" title="Jharkhand Polytechnic PYQ Papers (2021–2026)" />
            <div className="jp-pyq-feature">
              <div className="jp-pyq-feature-inner">
                <span className="jp-pyq-tag"><span className="jp-pyq-tag-dot" />📄 Download Polytechnic Question Paper PDF — Free</span>
                <h3>6 साल के Official PYQ Papers — Jharkhand Polytechnic (PECE)</h3>
                <p className="jp-pyq-feature-desc">
                  Polytechnic exam में पुराने papers से questions repeat होते हैं। 2021–2026 के सभी official
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
                              href={`/resources/jharkhand-polytechnic/pdf?year=${p.year}&subject=PECE%20Question%20Paper`}
                              style={{ color: "#0f172a", fontWeight: 600, textDecoration: "none" }}
                              className="hover:text-emerald-600 transition-colors"
                            >
                              Polytechnic PECE {p.year}
                            </Link>
                          </td>
                          <td style={{ color: "#64748b", fontSize: "0.78rem" }}>Phy · Chem · Maths</td>
                          <td>
                            {p.driveUrl ? (
                              <Link
                                href={`/resources/jharkhand-polytechnic/pdf?year=${p.year}&subject=PECE%20Question%20Paper`}
                                className="jp-dl-btn"
                                aria-label={`Read and Download Jharkhand Polytechnic ${p.year} Question Paper PDF`}
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
            <SectionHead label="Online Mock Test" title="Practice Polytechnic Online — 750+ MCQs Free" />
            <div className="jp-practice-banner">
              <div className="jp-practice-inner">
                <h3>Practice Jharkhand Polytechnic PYQs (2021–2026) Online</h3>
                <p className="jp-practice-desc">
                  Futurely पर 2021–2026 के सभी Polytechnic PYQ questions online attempt करो — timer के साथ,
                  instant score के साथ, और detailed solution के साथ। Subject-wise या year-wise
                  practice करो — जैसे चाहो।
                </p>
                <div className="jp-practice-feats">
                  {["750+ PYQ Questions", "Year-wise Sets", "Instant Solutions", "Score Tracking", "Free Forever"].map((feat, i) => (
                    <div className="jp-practice-feat" key={i}><div className="jp-pf-dot" />{feat}</div>
                  ))}
                </div>
                <div className="jp-practice-btns">
                  <Link href="/exam-preparation/jharkhand-polytechnic" className="jp-start-btn-wrap">
                    <span className="jp-practice-btn-primary">🚀 Start Preparation Now — Free</span>
                  </Link>
                  <Link href="/test-series" className="jp-practice-btn-secondary">📝 Full Mock Test</Link>
                </div>
              </div>
            </div>
          </div>
          <Sep />



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
                  { time: "7:00 – 9:00 AM", activity: "Theory reading (NCERT Class 9 & 10 — Physics, Chemistry, Maths)", icon: "📖" },
                  { time: "10:00 AM – 12:00 PM", activity: "Practice MCQs from PYQ papers (2021–2026)", icon: "✏️" },
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
                  { subject: "Physics", books: "NCERT Class 10 Science (Physics chapters), Lakhmir Singh & Manjit Kaur Class 10 Science Part 1" },
                  { subject: "Chemistry", books: "NCERT Class 10 Science (Chemistry chapters), Lakhmir Singh & Manjit Kaur Class 10 Science Part 1 & 2" },
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
            <SectionHead label="FAQ" title="Frequently Asked Questions" sub="Common doubts about Jharkhand Polytechnic PECE 2026, answered based on official prospectus." />
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
                <h3>Official Website – JCECEB Jharkhand</h3>
                <p>Apply online, download admit card, check results & counselling schedule at the official portal.</p>
              </div>
              <a href="https://jceceb.jharkhand.gov.in" target="_blank" rel="noopener noreferrer" className="jp-official-link">
                🌐 jceceb.jharkhand.gov.in
              </a>
            </div>
          </div>

          {/* RELATED */}
          <div className="jp-related-grid">
            <Link href="/resources/jharkhand-d2d/exam-information" className="jp-related-link"><span>📙 Jharkhand D2D (Lateral Entry) Guide</span><span>›</span></Link>
            <Link href="/exam-preparation/jharkhand-polytechnic" className="jp-related-link"><span>🎯 Practice Polytechnic MCQs Online</span><span>›</span></Link>
            <Link href="/exam-preparation" className="jp-related-link"><span>📄 Diploma Colleges in Jharkhand</span><span>›</span></Link>
            <Link href="/resources" className="jp-related-link"><span>📚 All Jharkhand Resources</span><span>›</span></Link>
          </div>

          <p className="jp-disclaimer">
            All information is sourced from the official JCECEB PECE 2026 Marg-Nirdeshika / Prospectus.
            Always verify latest updates at{" "}
            <a href="https://jceceb.jharkhand.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "var(--blue)" }}>
              jceceb.jharkhand.gov.in
            </a>.
            Futurely is not affiliated with JCECEB or the Government of Jharkhand.
          </p>

        </div>
      </main>
    </div>
  );
}