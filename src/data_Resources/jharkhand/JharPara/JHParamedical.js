/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container } from "react-bootstrap";
import AdBanner from "@/components/AdBanner";
import Image from "next/image";

/* ─────────────────────────────────────────────
   STATIC DATA  — from OFFICIAL JCECEB PMECE-2026 Notification
   (Advt. No. JCECEB/05/26-26, dated 29/06/2026, Ranchi)
───────────────────────────────────────────── */
const highlights = [
  { label: "Exam Name", value: "Para-Medical Entrance Competitive Examination (PMECE) – 2026" },
  { label: "Notification No.", value: "JCECEB/05/26-26, dated 29 June 2026" },
  { label: "Conducting Body", value: "JCECEB, Jharkhand" },
  { label: "Exam Level", value: "State-Level — Two Separate Levels: Intermediate & Matric" },
  { label: "Admission To", value: "Pharmacy, Para-Medical Diploma & Certificate Courses — Govt. & Private Institutions" },
  { label: "Course Duration", value: "Pharmacy: 2 Yrs 3 Months | Para-Medical Diploma: 2 Years | Certificate Courses: 1 Year" },
  { label: "Exam Mode", value: "Offline – Objective (MCQ), Bilingual Hindi & English" },
  { label: "Exam Date", value: "2 August 2026 (Sunday) — Two Separate Shifts" },
  { label: "Total Questions", value: "150 MCQs (Both Levels)" },
  { label: "Total Marks", value: "150 Marks (1 Mark Each)" },
  { label: "Marking Scheme", value: "Not specified as negative in the notification — confirm marking scheme on your admit card / instruction sheet" },
  { label: "Age Limit — Pharmacy", value: "Minimum 17 years as on 31 December 2026; no upper limit" },
  { label: "Age Limit — Para-Medical Diploma & Certificate Courses", value: "No minimum or maximum age limit" },
  { label: "Gender Eligibility", value: "Both Male & Female Candidates Eligible" },
];

const courseTracks = [
  {
    title: "Pharmacy (Intermediate Level)",
    icon: "💊",
    color: "#c2410c",
    duration: "2 Years 3 Months",
    eligNote: "10+2 (Science) pass with Physics, Chemistry and Mathematics or Biology",
    ageNote: "Minimum 17 years as on 31 Dec 2026 (as per exam year); no upper age limit",
    courses: [{ name: "Diploma in Pharmacy (D.Pharm)", duration: "2 Yrs 3 Mo" }],
  },
  {
    title: "Para-Medical Diploma (Intermediate Level)",
    icon: "🩺",
    color: "#0369a1",
    duration: "2 Years",
    eligNote: "Intermediate Science / 10+2 (Science) pass",
    ageNote: "No minimum or maximum age limit",
    courses: [
      { name: "DMLT / MLT / Lab Technician", duration: "2 Years" },
      { name: "O.T. Technician / Assistant", duration: "2 Years" },
      { name: "X-Ray / Radio Imaging Tech. / Radiographer", duration: "2 Years" },
      { name: "Ophthalmic Assistant", duration: "2 Years" },
      { name: "Anaesthesia Technician", duration: "2 Years" },
      { name: "ECG Tech. / Non-Invasive Cardiology Lab Tech.", duration: "2 Years" },
      { name: "Dialysis Technician", duration: "2 Years" },
      { name: "Cath Lab Technician", duration: "2 Years" },
      { name: "ICU Technician", duration: "2 Years" },
      { name: "Hearing, Language & Speech Therapy", duration: "2 Years" },
      { name: "Sanitary Inspector", duration: "2 Years" },
    ],
  },
  {
    title: "Certificate Courses (Matric Level)",
    icon: "📘",
    color: "#059669",
    duration: "1 Year",
    eligNote: "Matric / Madhyamik / 10th or equivalent pass",
    ageNote: "No minimum or maximum age limit",
    courses: [
      { name: "Dresser Certificate Course", duration: "1 Year" },
      { name: "Medical Lab Attendant Certificate Course", duration: "1 Year" },
      { name: "Radiographer Attendant Certificate Course", duration: "1 Year" },
    ],
  },
];

const interPattern = [
  { group: "PCM Group (Physics, Chemistry, Maths)", subjects: [{ n: "Physics", q: 50 }, { n: "Chemistry", q: 50 }, { n: "Mathematics", q: 50 }] },
  { group: "PCB Group (Physics, Chemistry, Biology)", subjects: [{ n: "Physics", q: 50 }, { n: "Chemistry", q: 50 }, { n: "Biology", q: 50 }] },
];

const matricPattern = [
  { n: "Mathematics", q: 50 },
  { n: "Science", q: 50 },
  { n: "General Knowledge", q: 50 },
];

const examShifts = [
  { level: "Intermediate Level (Pharmacy + Para-Medical Diploma, PCM/PCB Group)", time: "10:00 AM – 12:30 PM" },
  { level: "Matric Level (Certificate Courses)", time: "2:30 PM – 5:00 PM" },
];

const eligibility = [
  {
    icon: "💊",
    title: "Pharmacy (D.Pharm) — Intermediate Science Pass",
    desc: "10+2 (Science) examination passed with Physics, Chemistry and Mathematics or Biology. Minimum age 17 years as on 31 December 2026 — no upper age limit prescribed.",
  },
  {
    icon: "🩺",
    title: "Para-Medical Diploma — Intermediate Science Pass",
    desc: "Intermediate Science / 10+2 (Science) examination passed, for 2-year diploma courses such as DMLT, OT Technician, Radiographer, Ophthalmic Assistant, and others. No minimum or maximum age limit for these courses.",
  },
  {
    icon: "📘",
    title: "Certificate Courses — Matric Pass",
    desc: "For the 1-year certificate courses in Dresser / Medical Lab Attendant / Radiographer Attendant, candidate must have passed Matric / Madhyamik / 10th or an equivalent examination. No minimum or maximum age limit.",
  },
  {
    icon: "📍",
    title: "Jharkhand Domicile Required",
    desc: "Candidate must be a citizen of India and fall under the permanent/local resident category of Jharkhand State, as per the residential certificate norms notified by the Jharkhand Government (Personnel, Administrative Reforms & Rajbhasha Department).",
  },
  {
    icon: "🚻",
    title: "Both Male & Female Candidates Eligible",
    desc: "All courses under PMECE — Pharmacy, Para-Medical Diploma and Certificate courses — are open to both male and female candidates, subject to fulfilling the respective eligibility conditions.",
  },
  {
    icon: "🏥",
    title: "Medical Fitness at Enrollment",
    desc: "Candidates recommended for admission must submit a health/medical fitness certificate issued by a registered doctor at the time of enrollment in the respective institution. Unfit candidates will not be admitted.",
  },
];

const importantDates = [
  { event: "Notification Release", date: "29 June 2026", highlight: false },
  { event: "Online Application Start", date: "30 June 2026", highlight: false },
  { event: "Online Application Last Date", date: "15 July 2026", highlight: false },
  { event: "Correction Window (Online)", date: "16 – 17 July 2026", highlight: false },
  { event: "Admit Card Download", date: "Available 4 Days Before Exam (~29 July 2026)", highlight: false },
  { event: "Exam Date", date: "2 August 2026 (Sunday)", highlight: true },
  { event: "Exam Centres", date: "Various Designated Centres in Ranchi District Headquarters", highlight: false },
  { event: "Interview / Counselling", date: "After Result — Notified via Newspapers & Official Website", highlight: false },
];

const applicationFee = [
  { category: "General / EWS / BC-I / BC-II", fee: "₹900" },
  { category: "SC / ST & Female Candidates (All Categories)", fee: "₹450" },
  { category: "PwBD / Divyang Candidates", fee: "Exempted (No Fee Payable)" },
];

const onlineApplicationSteps = [
  {
    title: "Registration & Form Filling",
    desc: "Visit jceceb.jharkhand.gov.in → Click 'Click Here for All Online Application Submission – JCECEB 2026' on the homepage → Select the Para-Medical Entrance Competitive Examination – 2026 application form. Fill in your personal, educational and category details online between 30 June and 15 July 2026.",
    icon: "📝",
  },
  {
    title: "Upload Photograph, Signature & Thumb Impression",
    desc: "Upload a scanned colour passport-size photograph (with both ears clearly visible, not edited), signature, and left-hand thumb impression as specified. Submit the form — the printout does NOT need to be sent to the Board office.",
    icon: "📷",
  },
  {
    title: "Pay Fee & Use the Correction Window if Needed",
    desc: "Pay the application-cum-exam fee online via Credit Card / Debit Card / Net Banking / UPI (non-refundable). If any correction is needed in the submitted entries, candidates can log in and edit only between 16 and 17 July 2026 — no correction or fresh application will be accepted after this window.",
    icon: "💳",
  },
];

const documentsRequired = [
  "Matric / Intermediate Admit Card, Marksheet & Passing Certificate (as applicable to the chosen course) — original + attested copy",
  "Local Resident (Domicile) Certificate issued by the Anchal Adhikari / Sub-Divisional Officer of Jharkhand",
  "Caste Certificate — SC/ST/BC-I/BC-II (if applicable), issued by an authorised Jharkhand officer",
  "Income & Asset (EWS) Certificate (if applicable)",
  "Disability (Divyang) Certificate attested by the Chief Medical Officer / Head of Medical Board / Head of Hospital (if applicable)",
  "Medical Fitness Certificate from a Registered Doctor — submitted at the time of enrollment",
  "PMECE 2026 Admit Card",
  "Recent Colour Photograph, Signature & Left Thumb Impression",
];

const tieBreakingRules = {
  inter: [
    { rank: "1", resolution: "Higher marks in Physics" },
    { rank: "2", resolution: "Higher marks in Chemistry (if Physics also equal)" },
    { rank: "3", resolution: "Candidate with earlier Date of Birth (if Chemistry also equal)" },
    { rank: "4", resolution: "Alphabetical order of First Name in English (if DOB also equal)" },
  ],
  matric: [
    { rank: "1", resolution: "Higher marks in Mathematics" },
    { rank: "2", resolution: "Higher marks in Science (if Maths also equal)" },
    { rank: "3", resolution: "Candidate with earlier Date of Birth (if Science also equal)" },
    { rank: "4", resolution: "Alphabetical order of First Name in English (if DOB also equal)" },
  ],
};

const reservationCategories = [
  { category: "SC (Scheduled Caste)", detail: "As per the Jharkhand Government's prevailing reservation policy" },
  { category: "ST (Scheduled Tribe)", detail: "Includes special provision for Particularly Vulnerable Tribal Groups (PVTG) residing in Jharkhand" },
  { category: "BC-I / BC-II (Backward Classes)", detail: "Non-Creamy Layer certificate mandatory as per Personnel, Administrative Reforms & Rajbhasha Dept. norms; Creamy Layer candidates are not eligible for reservation benefit" },
  { category: "PwBD / Divyang", detail: "Horizontal reservation as per the Rights of Persons with Disabilities Act, 2016; also exempted from application fee" },
  { category: "Female Candidates (All Categories)", detail: "Concessional application fee of ₹450, same as SC/ST candidates" },
];

const pyqPapers = [
  { year: "2025", driveUrl: "https://drive.google.com/file/d/11yGo-OIZh1-ScxJjDazoEH6_n5IjdPGU/view" },
  { year: "2024", driveUrl: "https://drive.google.com/file/d/1O98Jm-aZGR_UnqMV8SOmaLM1D14rHXOG/view" },
  { year: "2023", driveUrl: "https://drive.google.com/file/d/1DmvpumJzMJpiijlrGWkiFK4pI4u2cg_7/view" },
  { year: "2022", driveUrl: null },
];

const preparationTips = [
  { icon: "📅", tip: "अपने group (PCM/PCB) या Matric-level course के हिसाब से सही subjects पर focus करो — Pharmacy और Para-Medical दोनों में तीन ही subjects पूछे जाते हैं।" },
  { icon: "📝", tip: "Intermediate level में Physics और Chemistry पर सबसे ज़्यादा focus करो — merit tie होने पर पहले यही subjects देखे जाते हैं।" },
  { icon: "🧮", tip: "Matric level (Certificate courses) में Mathematics सबसे scoring और tie-breaking में पहला subject है —इसे मज़बूत करो।" },
  { icon: "⏱️", tip: "150 questions को 2.5 घंटे में हल करना है — इसलिए speed और accuracy दोनों पर बराबर ध्यान दो।" },
  { icon: "🌐", tip: "Matric-level candidates General Knowledge के लिए daily current affairs और Jharkhand GK ज़रूर पढ़ें — यह तीसरा और बराबर weightage वाला section है।" },
  { icon: "⚠️", tip: "Negative marking की जानकारी official notification में स्पष्ट नहीं है — admit card या exam-day instructions ज़रूर पढ़ें।" },
];

const faqs = [
  {
    q: "Jharkhand Paramedical entrance exam (PMECE) 2026 क्या है?",
    a: "PMECE (Para-Medical Entrance Competitive Examination) – 2026, JCECEB द्वारा (Advt. No. JCECEB/05/26-26, dated 29/06/2026) आयोजित एक state-level exam है, जो Jharkhand के Government और Private institutions में Pharmacy, Para-Medical Diploma और Certificate courses में शैक्षणिक वर्ष 2026-27 के लिए admission हेतु है।",
  },
  {
    q: "PMECE 2026 exam किस date को होगी?",
    a: "Exam 2 अगस्त 2026 (रविवार) को होगी। Intermediate level (Pharmacy व Para-Medical Diploma, PCM/PCB Group) की परीक्षा सुबह 10:00 बजे से दोपहर 12:30 बजे तक, और Matric level (Certificate courses) की परीक्षा दोपहर 2:30 बजे से शाम 5:00 बजे तक होगी।",
  },
  {
    q: "Application form कब से कब तक भरा जा सकता है?",
    a: "ऑनलाइन आवेदन 30 जून 2026 से 15 जुलाई 2026 तक भरे जा सकते हैं। भरे गए विवरण में सुधार के लिए 16 से 17 जुलाई 2026 तक एक अलग correction window दी गई है — इसके बाद कोई सुधार या नया आवेदन स्वीकार नहीं किया जाएगा।",
  },
  {
    q: "PMECE के तहत कौन-कौन से courses आते हैं?",
    a: "Intermediate Level में Pharmacy (2 वर्ष 3 महीने का D.Pharm Diploma) और Para-Medical Diploma (2 वर्ष) — जिसमें DMLT, OT Technician, Radiographer, Ophthalmic Assistant, Anaesthesia Technician, ECG Technician, Dialysis Technician, Cath Lab Technician, ICU Technician, Hearing-Language-Speech Therapy और Sanitary Inspector शामिल हैं। Matric Level में Dresser, Medical Lab Attendant और Radiographer Attendant के 1-वर्षीय Certificate courses शामिल हैं।",
  },
  {
    q: "Eligibility और age limit क्या है?",
    a: "Pharmacy के लिए 10+2 Science (Physics, Chemistry के साथ Maths या Biology) pass होना चाहिए और उम्र 31 दिसंबर 2026 तक कम से कम 17 वर्ष होनी चाहिए (कोई अधिकतम सीमा नहीं)। Para-Medical Diploma के लिए Intermediate Science pass चाहिए, और Certificate courses के लिए Matric pass — इन दोनों track में कोई minimum या maximum age limit नहीं है।",
  },
  {
    q: "Exam pattern क्या है?",
    a: "दोनों levels में कुल 150 objective (MCQ) questions पूछे जाते हैं। Intermediate level में PCM group (Physics, Chemistry, Maths — 50-50-50) और PCB group (Physics, Chemistry, Biology — 50-50-50) के लिए अलग पैटर्न है। Matric level (Certificate courses) में Mathematics, Science और General Knowledge से 50-50-50 questions पूछे जाते हैं।",
  },
  {
    q: "Application fee कितनी है?",
    a: "General/EWS/BC-I/BC-II candidates के लिए ₹900 और SC/ST तथा सभी श्रेणियों की महिला candidates के लिए ₹450 है। दिव्यांग (PwBD) candidates को कोई fee नहीं देनी है।",
  },
  {
    q: "Merit list / tie-breaking rules क्या हैं?",
    a: "Intermediate level के लिए PCM और PCB दोनों groups के योग्य candidates की एक संयुक्त 'PCMB मेधा सूची' बनती है — बराबर अंक होने पर पहले Physics, फिर Chemistry marks, फिर जन्मतिथि (पहले जन्मे candidate को प्राथमिकता), और अंत में नाम का alphabetical order देखा जाता है। Matric level में यही क्रम Mathematics और फिर Science marks के आधार पर लागू होता है।",
  },
  {
    q: "Interview/Counselling की प्रक्रिया क्या है?",
    a: "Result घोषित होने के बाद, मेधा क्रम एवं course-समूह के अनुसार साक्षात्कार (Interview) की सूचना झारखंड के प्रमुख समाचार पत्रों और पर्षद की वेबसाइट के माध्यम से दी जाएगी। साक्षात्कार के समय candidates को संस्थान व पाठ्यक्रम की प्राथमिकता (Priority) भरनी होगी, जिसके आधार पर मेधा-सह-इच्छा अनुसार सीट आवंटन होगा।",
  },
];

const SectionHead = ({ label, title, sub }) => (
  <div style={{ marginBottom: 20 }}>
    <span className="pm-section-label">{label}</span>
    <h2 className="pm-section-title">{title}</h2>
    {sub && <p className="pm-section-sub">{sub}</p>}
  </div>
);

const Sep = () => <div className="pm-sep" />;

/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
const JHParamedical = () => {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const courseSchema = {
    "@context": "https://schema.org", "@type": "Course",
    name: "Jharkhand Paramedical Entrance Exam (PMECE) 2026 Preparation",
    description: "Free Jharkhand Paramedical Entrance Exam (PMECE) 2026 guide based on the official JCECEB notification: eligibility, exam pattern (Intermediate PCM/PCB & Matric levels), important dates and free online MCQ practice.",
    provider: { "@type": "Organization", name: "Futurely", sameAs: "https://www.futurely.in" },
    url: "https://www.futurely.in/resources/jharkhand-paramedical/exam-information",
    educationalLevel: "Secondary", inLanguage: ["en", "hi"], isAccessibleForFree: true,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.futurely.in" },
      { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.futurely.in/resources" },
      { "@type": "ListItem", position: 3, name: "Jharkhand Paramedical Exam 2026", item: "https://www.futurely.in/resources/jharkhand-paramedical/exam-information" },
    ],
  };
  const pyqListSchema = {
    "@context": "https://schema.org", "@type": "ItemList",
    name: "Jharkhand Paramedical Previous Year Question Papers",
    description: "Free PYQ papers for Jharkhand Paramedical Entrance Exam (PMECE).",
    itemListElement: pyqPapers.map((p, i) => ({
      "@type": "ListItem", position: i + 1,
      name: `Jharkhand Paramedical Question Paper ${p.year} – 150 MCQs`,
      url: "https://www.futurely.in/resources/jharkhand-paramedical/exam-information",
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pyqListSchema) }} />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes btnBorderSpin {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pmDlGlow {
          0%   { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }

        /* BANNER */
        .pm-banner-overlay {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px);
          padding: 16px; box-sizing: border-box;
          animation: pmBannerFadeIn 0.3s ease;
        }
        @keyframes pmBannerFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .pm-banner-wrapper {
          position: relative;
          width: min(340px, calc(100vw - 32px));
          aspect-ratio: 916 / 1717;
          max-height: calc(100vh - 80px);
          border-radius: 14px; overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,0.55);
          animation: pmBannerSlideUp 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes pmBannerSlideUp {
          from { transform: translateY(40px) scale(0.96); opacity: 0; }
          to   { transform: translateY(0) scale(1); opacity: 1; }
        }
        .pm-banner-wrapper img { width: 100%; height: 100%; object-fit: cover; display: block; cursor: pointer; }
        .pm-banner-close {
          position: absolute; top: 10px; right: 10px;
          width: 32px; height: 32px; border: none; background: transparent;
          color: #fff; font-size: 22px; line-height: 1;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 10; transition: opacity 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .pm-banner-close:hover { opacity: 0.7; }

        /* PAGE */
        .pm-page {
          --amber:      #1a56db;
          --amber-dk:   #1e429f;
          --amber-lt:   #eff6ff;
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
          background: #fdf7f3;
          min-height: 100vh;
          padding-bottom: 80px;
          overflow-x: hidden;
        }

        /* HERO */
        .pm-hero {
          background: linear-gradient(155deg, #1e3a8a 0%, #1a56db 60%, #2563eb 100%);
          padding: 0px 16px 80px; text-align: center; position: relative; overflow: hidden;
        }
        .pm-hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at 15% 60%, rgba(255,255,255,0.08) 0%, transparent 45%),
                      radial-gradient(circle at 85% 20%, rgba(255,255,255,0.05) 0%, transparent 40%);
          pointer-events: none;
        }
        .pm-hero-inner { position: relative; z-index: 1; max-width: 680px; margin: 0 auto; }
        .pm-hero h1 {
          font-family: "Sora", sans-serif; font-size: clamp(1.5rem, 5vw, 2.2rem);
          font-weight: 800; color: #fff; margin-bottom: 12px; margin-top: 22px;
          line-height: 1.2; letter-spacing: -0.5px;
        }
        .pm-hero-desc {
          font-size: clamp(0.9rem, 2.5vw, 1rem); color: rgba(255,255,255,0.82);
          line-height: 1.75; margin: 0 auto 20px; max-width: 560px;
        }
        .pm-hero-pills { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
        .pm-hero-pill {
          background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.22);
          border-radius: 999px; padding: 5px 14px; font-size: 0.76rem; font-weight: 600; color: #fff;
        }

        /* STAT STRIP */
        .pm-stat-strip {
          display: grid; grid-template-columns: repeat(4, 1fr);
          background: var(--surface); border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md); overflow: hidden; margin-top: -36px; position: relative; z-index: 2;
        }
        @media (max-width: 600px) { .pm-stat-strip { grid-template-columns: repeat(2, 1fr); } }
        .pm-stat { text-align: center; padding: 18px 10px; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .pm-stat:nth-child(4n) { border-right: none; }
        @media (max-width: 600px) {
          .pm-stat:nth-child(2n) { border-right: none; }
          .pm-stat:nth-child(3), .pm-stat:nth-child(4) { border-bottom: none; }
        }
        .pm-stat-val { font-family: "Sora", sans-serif; font-size: clamp(1.1rem,3vw,1.4rem); font-weight: 800; color: var(--amber); line-height: 1; margin-bottom: 4px; }
        .pm-stat-label { font-size: clamp(0.66rem,1.5vw,0.75rem); color: var(--muted); font-weight: 600; }

        /* LAYOUT */
        .pm-sep { height: 1px; background: var(--border); margin: 32px 0 0; }
        .pm-section { padding-top: 28px; }
        .pm-section-label { display: block; font-size: 0.68rem; font-weight: 800; letter-spacing: 1.6px; text-transform: uppercase; color: var(--amber); font-family: "Sora", sans-serif; margin-bottom: 5px; }
        .pm-section-title { font-family: "Sora", sans-serif; font-size: clamp(1.05rem,3.5vw,1.35rem); font-weight: 800; color: var(--text); margin-bottom: 5px; letter-spacing: -0.3px; line-height: 1.3; }
        .pm-section-sub { font-size: 0.88rem; color: var(--muted); line-height: 1.65; margin-bottom: 0; }

        /* CARD */
        .pm-card { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-xs); }
        .pm-card-header { display: flex; align-items: center; gap: 10px; padding: 13px 18px; border-bottom: 1px solid var(--border); background: var(--surface-2); }
        .pm-card-icon { width: 30px; height: 30px; border-radius: 8px; background: var(--amber-lt); display: flex; align-items: center; justify-content: center; font-size: 0.95rem; flex-shrink: 0; }
        .pm-card-title { font-family: "Sora", sans-serif; font-size: 0.88rem; font-weight: 800; color: var(--text); margin: 0; }
        .pm-card-body { padding: 18px; }

        /* HIGHLIGHTS TABLE */
        .pm-highlights-table { width: 100%; border-collapse: collapse; }
        .pm-highlights-table tr { border-bottom: 1px solid var(--border); }
        .pm-highlights-table tr:last-child { border-bottom: none; }
        .pm-highlights-table td { padding: 10px 16px; font-size: 0.85rem; line-height: 1.5; vertical-align: top; }
        .pm-highlights-table td:first-child { font-weight: 700; color: var(--text-2); width: 42%; }
        .pm-highlights-table td:last-child { color: var(--text); }
        @media (max-width: 400px) { .pm-highlights-table td { padding: 9px 12px; font-size: 0.81rem; } }

        /* COURSE TRACKS */
        .pm-track-card { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); overflow: hidden; margin-bottom: 12px; }
        .pm-track-card:last-child { margin-bottom: 0; }
        .pm-track-header { display: flex; align-items: center; gap: 8px; padding: 13px 16px; font-family: "Sora", sans-serif; font-size: 0.88rem; font-weight: 800; color: #fff; flex-wrap: wrap; }
        .pm-track-header-dur { margin-left: auto; font-size: 0.7rem; background: rgba(255,255,255,0.2); border-radius: 999px; padding: 3px 10px; white-space: nowrap; font-weight: 700; }
        .pm-track-meta { display: flex; flex-direction: column; gap: 4px; padding: 11px 16px; background: var(--surface-2); border-bottom: 1px solid var(--border); font-size: 0.79rem; color: var(--text-2); line-height: 1.55; }
        .pm-track-body { padding: 8px 16px 12px; }
        .pm-track-item { display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 0.82rem; color: var(--text-2); padding: 8px 0; border-bottom: 1px solid var(--border); }
        .pm-track-item:last-child { border-bottom: none; }
        .pm-track-duration { font-size: 0.72rem; font-weight: 700; font-family: "Sora", sans-serif; background: var(--surface-2); border-radius: 999px; padding: 3px 10px; white-space: nowrap; flex-shrink: 0; color: var(--muted); }

        /* PATTERN GROUPS */
        .pm-pattern-group-title { font-family: "Sora", sans-serif; font-size: 0.83rem; font-weight: 800; color: var(--text); margin: 0 0 8px 2px; }
        .pm-subjects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 14px; }
        @media (max-width: 600px) { .pm-subjects-grid { grid-template-columns: 1fr; gap: 8px; } }
        .pm-subject-card { border-radius: var(--radius-md); padding: 14px 16px; border: 1.5px solid; display: flex; flex-direction: row; align-items: center; justify-content: space-between; gap: 10px; }
        .pm-subject-name { font-family: "Sora", sans-serif; font-size: 0.86rem; font-weight: 800; }
        .pm-subject-stat { font-size: 0.76rem; color: var(--muted); font-weight: 600; white-space: nowrap; }
        .pm-subject-stat span { font-family: "Sora", sans-serif; font-size: 1rem; font-weight: 800; }

        /* SHIFTS */
        .pm-shift-list { display: flex; flex-direction: column; gap: 8px; }
        .pm-shift-item { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 16px; background: var(--surface-2); border: 1.5px solid var(--border); border-radius: var(--radius-sm); }
        .pm-shift-level { font-size: 0.82rem; font-weight: 600; color: var(--text-2); }
        .pm-shift-time { font-size: 0.78rem; font-weight: 700; font-family: "Sora", sans-serif; color: var(--amber); background: var(--amber-lt); border-radius: 999px; padding: 4px 12px; white-space: nowrap; }

        /* MARKING */
        .pm-marking-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 12px; }
        .pm-marking-card { border-radius: var(--radius-sm); padding: 14px 10px; text-align: center; border: 1.5px solid; }
        .pm-marking-emoji { font-size: 1.1rem; margin-bottom: 4px; }
        .pm-marking-val { font-family: "Sora", sans-serif; font-size: 1.05rem; font-weight: 800; margin-bottom: 3px; }
        .pm-marking-label { font-size: 0.72rem; color: var(--muted); font-weight: 600; }

        /* ELIGIBILITY */
        .pm-elig-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        @media (max-width: 520px) { .pm-elig-grid { grid-template-columns: 1fr; } }
        .pm-elig-card { background: var(--surface-2); border: 1.5px solid var(--border); border-radius: var(--radius-md); padding: 14px 16px; display: flex; gap: 11px; align-items: flex-start; }
        .pm-elig-icon { font-size: 1.1rem; flex-shrink: 0; width: 34px; height: 34px; background: var(--surface); border-radius: 9px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); }
        .pm-elig-title { font-family: "Sora", sans-serif; font-size: 0.83rem; font-weight: 700; color: var(--text); margin-bottom: 4px; }
        .pm-elig-desc { font-size: 0.8rem; color: var(--muted); line-height: 1.6; margin: 0; }

        /* FEE TABLE */
        .pm-fee-table { width: 100%; border-collapse: collapse; }
        .pm-fee-table th { background: var(--amber); color: #fff; padding: 10px 16px; font-family: "Sora", sans-serif; font-size: 0.8rem; font-weight: 700; text-align: left; }
        .pm-fee-table td { padding: 10px 16px; font-size: 0.85rem; border-bottom: 1px solid var(--border); color: var(--text-2); }
        .pm-fee-table tr:last-child td { border-bottom: none; }
        .pm-fee-table tr:nth-child(even) td { background: var(--surface-2); }
        .pm-fee-val { font-weight: 800; font-family: "Sora", sans-serif; color: var(--amber); }

        /* DATES */
        .pm-dates-list { display: flex; flex-direction: column; gap: 7px; }
        .pm-date-item { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 11px 16px; background: var(--surface-2); border: 1.5px solid var(--border); border-radius: var(--radius-sm); }
        .pm-date-item--highlight { border-color: rgba(194,65,12,0.3); background: #fff7ed; }
        .pm-date-event { font-size: 0.84rem; font-weight: 600; color: var(--text-2); flex: 1; min-width: 0; }
        .pm-date-val { font-size: 0.78rem; font-weight: 700; font-family: "Sora", sans-serif; color: var(--amber); background: var(--amber-lt); border-radius: 999px; padding: 3px 11px; white-space: nowrap; flex-shrink: 0; }
        @media (max-width: 480px) { .pm-date-item { flex-wrap: wrap; gap: 6px; } .pm-date-event { font-size: 0.81rem; } }

        /* STEPS */
        .pm-steps-list { display: flex; flex-direction: column; gap: 12px; }
        .pm-step-card { display: flex; gap: 14px; align-items: flex-start; background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); padding: 16px; }
        .pm-step-num { width: 36px; height: 36px; border-radius: 50%; background: var(--amber); color: #fff; font-family: "Sora", sans-serif; font-size: 0.8rem; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .pm-step-title { font-family: "Sora", sans-serif; font-size: 0.88rem; font-weight: 700; color: var(--text); margin-bottom: 5px; }
        .pm-step-desc { font-size: 0.82rem; color: var(--muted); line-height: 1.65; margin: 0; }

        /* DOCUMENTS */
        .pm-docs-list { display: flex; flex-direction: column; gap: 7px; }
        .pm-doc-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 14px; background: var(--surface-2); border: 1.5px solid var(--border); border-radius: var(--radius-sm); font-size: 0.83rem; color: var(--text-2); line-height: 1.55; }
        .pm-doc-icon { flex-shrink: 0; font-size: 0.9rem; margin-top: 1px; }

        /* TIE-BREAKING */
        .pm-tie-table { width: 100%; border-collapse: collapse; }
        .pm-tie-table th { background: var(--amber); color: #fff; padding: 9px 14px; font-family: "Sora", sans-serif; font-size: 0.78rem; font-weight: 700; text-align: left; }
        .pm-tie-table td { padding: 10px 14px; font-size: 0.82rem; border-bottom: 1px solid var(--border); color: var(--text-2); }
        .pm-tie-table tr:last-child td { border-bottom: none; }
        .pm-tie-table tr:nth-child(even) td { background: var(--surface-2); }

        /* RESERVATION */
        .pm-res-table { width: 100%; border-collapse: collapse; }
        .pm-res-table th { background: var(--amber); color: #fff; padding: 9px 14px; font-family: "Sora", sans-serif; font-size: 0.78rem; font-weight: 700; text-align: left; }
        .pm-res-table td { padding: 9px 14px; font-size: 0.82rem; border-bottom: 1px solid var(--border); color: var(--text-2); }
        .pm-res-table tr:last-child td { border-bottom: none; }
        .pm-res-table tr:nth-child(even) td { background: var(--surface-2); }

        /* INFO ALERT */
        .pm-info-alert { display: flex; align-items: flex-start; gap: 10px; background: #fffbeb; border: 1.5px solid #fde68a; border-radius: var(--radius-sm); padding: 12px 14px; font-size: 0.82rem; color: #92400e; line-height: 1.6; margin-top: 10px; }
        .pm-info-alert-icon { flex-shrink: 0; font-size: 1rem; }

        /* PYQ FEATURE */
        .pm-pyq-feature { background: linear-gradient(140deg, #1e3a8a 0%, #1a56db 55%, #2563eb 100%); border-radius: var(--radius-lg); padding: 28px 24px 26px; position: relative; overflow: hidden; }
        .pm-pyq-feature::before { content: ''; position: absolute; top: -60px; right: -60px; width: 220px; height: 220px; border-radius: 50%; background: rgba(255,255,255,0.07); pointer-events: none; }
        .pm-pyq-feature::after  { content: ''; position: absolute; bottom: -80px; left: -20px; width: 240px; height: 240px; border-radius: 50%; background: rgba(255,255,255,0.04); pointer-events: none; }
        .pm-pyq-feature-inner { position: relative; z-index: 1; }
        .pm-pyq-tag { display: flex; align-items: center; justify-content: center; gap: 6px; width: fit-content; margin: 0 auto 16px auto; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.28); border-radius: 999px; padding: 5px 14px; font-size: 0.75rem; font-weight: 700; color: #fff; font-family: "Sora", sans-serif; }
        .pm-pyq-tag-dot { width: 7px; height: 7px; border-radius: 50%; background: #34d399; flex-shrink: 0; }
        .pm-pyq-feature h3 { font-family: "Sora", sans-serif; font-size: clamp(1.1rem, 3.5vw, 1.45rem); font-weight: 800; color: #fff; margin-bottom: 7px; line-height: 1.25; }
        .pm-pyq-feature-desc { font-size: 0.86rem; color: rgba(255,255,255,0.80); line-height: 1.65; margin-bottom: 22px; max-width: 540px; }

        /* PYQ TABLE */
        .pm-pyq-table-wrap { border-radius: 12px; overflow: hidden; border: 1px solid #bfdbfe; }
        .pm-pyq-table { width: 100%; border-collapse: collapse; min-width: 340px; }
        .pm-pyq-table th { background: #0d6efd; color: #fff; padding: 11px 16px; font-family: inherit; font-size: 0.82rem; font-weight: 700; text-align: center; white-space: nowrap; }
        .pm-pyq-table th:first-child { text-align: left; }
        .pm-pyq-table td { background: #f9fbff; border: 1px solid #dce8ff; padding: 11px 16px; font-size: 0.86rem; text-align: center; color: #374151; vertical-align: middle; }
        .pm-pyq-table tr:nth-child(even) td { background: #f0f6ff; }
        .pm-pyq-table tr:last-child td { border-bottom: none; }
        .pm-pyq-table td:first-child { text-align: left; font-weight: 700; }

        /* DOWNLOAD BUTTON */
        .pm-dl-btn { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 5px; background: linear-gradient(90deg, #0d6efd, #6610f2); color: #fff; border: none; border-radius: 8px; padding: 9px 18px; font-size: 0.82rem; font-weight: 700; font-family: "Sora", sans-serif; cursor: pointer; overflow: hidden; z-index: 1; white-space: nowrap; text-decoration: none; }
        .pm-dl-btn::before { content: ""; position: absolute; inset: -2px; border-radius: 10px; background: linear-gradient(120deg, transparent, #00eaff, #6610f2, #00eaff, transparent); background-size: 300% 300%; animation: pmDlGlow 2.5s linear infinite; z-index: -1; }
        .pm-dl-btn::after { content: ""; position: absolute; inset: 2px; border-radius: 6px; background: linear-gradient(90deg, #0d6efd, #6610f2); z-index: -1; }
        .pm-dl-btn:hover { opacity: 0.9; color: #fff; }
        .pm-dl-btn:disabled { background: linear-gradient(90deg, #94a3b8, #64748b); cursor: not-allowed; opacity: 0.7; }
        .pm-dl-btn:disabled::before { animation: none; background: none; }
        .pm-dl-btn:disabled::after { background: linear-gradient(90deg, #94a3b8, #64748b); }
        @media (max-width: 480px) { .pm-pyq-table th, .pm-pyq-table td { padding: 9px 10px; font-size: 0.78rem; } .pm-pyq-table th:nth-child(3), .pm-pyq-table td:nth-child(3) { display: none; } .pm-dl-btn { font-size: 0.84rem; padding: 8px 16px; } }

        /* PRACTICE BANNER */
        .pm-practice-banner { position: relative; border-radius: var(--radius-lg); overflow: hidden; background: linear-gradient(140deg, #1e3a8a 0%, #1d4ed8 45%, #2563eb 100%); padding: 28px 24px 26px; }
        .pm-practice-banner::before { content: ''; position: absolute; top: -50px; right: -50px; width: 220px; height: 220px; border-radius: 50%; background: rgba(255,255,255,0.06); pointer-events: none; }
        .pm-practice-banner::after  { content: ''; position: absolute; bottom: -70px; left: -10px; width: 200px; height: 200px; border-radius: 50%; background: rgba(255,255,255,0.04); pointer-events: none; }
        .pm-practice-inner { position: relative; z-index: 1; }
        .pm-practice-banner h3 { font-family: "Sora", sans-serif; font-size: clamp(1.1rem, 3.5vw, 1.45rem); font-weight: 800; color: #fff; margin-bottom: 7px; line-height: 1.25; }
        .pm-practice-desc { font-size: 0.86rem; color: rgba(255,255,255,0.80); line-height: 1.65; margin-bottom: 20px; max-width: 540px; }
        .pm-practice-feats { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 22px; }
        .pm-practice-feat { display: flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; padding: 5px 12px; font-size: 0.77rem; font-weight: 600; color: rgba(255,255,255,0.92); }
        .pm-pf-dot { width: 6px; height: 6px; border-radius: 50%; background: #34d399; flex-shrink: 0; }
        .pm-practice-btns { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }

        /* ANIMATED BUTTON */
        .pm-start-btn-wrap { display: inline-flex; padding: 2.5px; border-radius: calc(var(--radius-sm) + 2.5px); background: linear-gradient(270deg, #60a5fa, #a78bfa, #34d399, #fbbf24, #f472b6, #60a5fa); background-size: 400% 400%; animation: btnBorderSpin 3s ease infinite; text-decoration: none; transition: transform 0.18s, box-shadow 0.18s; }
        .pm-start-btn-wrap:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.28); }
        .pm-practice-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: #fff; color: #1e3a8a; border-radius: var(--radius-sm); padding: 12px 22px; font-size: 0.9rem; font-weight: 800; font-family: "Sora", sans-serif; text-decoration: none; transition: background 0.18s, color 0.18s; }
        .pm-start-btn-wrap:hover .pm-practice-btn-primary { background: #eff6ff; color: #1e293b; }
        .pm-practice-btn-secondary { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.14); border: 1.5px solid rgba(255,255,255,0.3); border-radius: var(--radius-sm); padding: 12px 20px; font-size: 0.88rem; font-weight: 700; font-family: "Sora", sans-serif; color: #fff; text-decoration: none; transition: background 0.18s; }
        .pm-practice-btn-secondary:hover { background: rgba(255,255,255,0.22); color: #fff; }

        /* TIPS */
        .pm-tips-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 9px; }
        @media (max-width: 480px) { .pm-tips-grid { grid-template-columns: 1fr; } }
        .pm-tip-card { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-sm); padding: 13px 15px; display: flex; align-items: flex-start; gap: 10px; font-size: 0.83rem; color: var(--text-2); line-height: 1.55; }
        .pm-tip-icon { font-size: 1rem; flex-shrink: 0; margin-top: 1px; }

        /* SCHEDULE SLOTS */
        .pm-slot { display: flex; gap: 12px; align-items: flex-start; padding-bottom: 14px; margin-bottom: 14px; border-bottom: 1px solid var(--border); }
        .pm-slot:last-child { padding-bottom: 0; margin-bottom: 0; border-bottom: none; }
        .pm-slot-icon { font-size: 1.05rem; flex-shrink: 0; }
        .pm-slot-time { font-family: "Sora", sans-serif; font-size: 0.76rem; font-weight: 800; color: var(--amber); margin-bottom: 2px; }
        .pm-slot-label { font-size: 0.84rem; color: var(--text-2); margin: 0; line-height: 1.5; }

        /* FAQ */
        .pm-faq-item { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); margin-bottom: 7px; overflow: hidden; }
        .pm-faq-item--open { border-color: rgba(194,65,12,0.3); }
        .pm-faq-btn { width: 100%; border: none; background: transparent; text-align: left; display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 14px 18px; cursor: pointer; min-height: 50px; -webkit-tap-highlight-color: transparent; }
        .pm-faq-q { font-family: "Sora", sans-serif; font-size: clamp(0.8rem,2vw,0.88rem); font-weight: 700; color: var(--text); line-height: 1.4; }
        .pm-faq-chevron { flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%; background: var(--surface-2); color: var(--muted); font-size: 0.65rem; display: flex; align-items: center; justify-content: center; transition: transform 0.25s, background 0.2s, color 0.2s; }
        .pm-faq-item--open .pm-faq-chevron { transform: rotate(180deg); background: var(--amber); color: #fff; }
        .pm-faq-ans { padding: 0 18px 14px; font-size: 0.84rem; color: var(--muted); line-height: 1.72; }
        @media (max-width: 400px) { .pm-faq-btn { padding: 12px 14px; } .pm-faq-ans { padding: 0 14px 12px; } }

        /* OFFICIAL STRIP */
        .pm-official-strip { background: linear-gradient(135deg, var(--amber) 0%, var(--amber-dk) 100%); border-radius: var(--radius-md); padding: 18px 20px; color: #fff; display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; box-shadow: 0 6px 20px rgba(194,65,12,0.22); }
        .pm-official-text h3 { font-family: "Sora", sans-serif; font-size: 0.9rem; font-weight: 800; margin-bottom: 3px; }
        .pm-official-text p { font-size: 0.8rem; color: rgba(255,255,255,0.75); margin: 0; }
        .pm-official-link { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); border-radius: var(--radius-sm); padding: 9px 18px; color: #fff; font-weight: 700; font-size: 0.82rem; text-decoration: none; font-family: "Sora", sans-serif; transition: background 0.18s; white-space: nowrap; }
        .pm-official-link:hover { background: rgba(255,255,255,0.25); color: #fff; }

        /* RELATED */
        .pm-related-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 9px; margin-top: 14px; }
        @media (max-width: 480px) { .pm-related-grid { grid-template-columns: 1fr; } }
        .pm-related-link { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); padding: 13px 15px; text-decoration: none; color: var(--text-2); font-size: 0.83rem; font-weight: 600; display: flex; align-items: center; justify-content: space-between; gap: 8px; transition: border-color 0.18s, color 0.18s; font-family: "Sora", sans-serif; }
        .pm-related-link:hover { border-color: rgba(194,65,12,0.3); color: var(--amber); }
        .pm-disclaimer { text-align: center; font-size: 0.73rem; color: var(--muted); margin-top: 18px; line-height: 1.65; padding: 0 8px; }

        /* RESPONSIVE */
        @media (max-width: 480px) { .pm-pyq-table-wrap { margin: 0 -16px; } .pm-hero { padding: 0px 14px 68px; } .pm-hero h1 { margin-top: 36px; } .pm-card-body { padding: 14px; } .pm-section { padding-top: 22px; } .pm-official-link { width: 100%; justify-content: center; } }
        @media (max-width: 400px) { .pm-dl-btn { font-size: 0.84rem; padding: 8px 16px; } .pm-pyq-table-wrap { margin: 0 -12px; } .pm-hero h1 { font-size: 1.32rem; margin-top: 36px; } .pm-section-title { font-size: 1rem; } }
        @media (max-width: 540px) { .pm-practice-btns { justify-content: center; align-items: center; } .pm-start-btn-wrap, .pm-practice-btn-secondary { margin-left: auto; margin-right: auto; } }
      ` }} />

      {/* BANNER */}
      {showBanner && (
        <div className="pm-banner-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowBanner(false); }}>
          <div className="pm-banner-wrapper">
            <Image width={916} height={1717}
              src="/bannerParamedical.png"
              alt="Jharkhand Paramedical 2026 Full Test Series – Join on Futurely"
              draggable={false} loading="lazy" onClick={() => { setShowBanner(false); router.push("/test-series"); }}
            />
            <button className="pm-banner-close" onClick={() => setShowBanner(false)} aria-label="Close advertisement">✕</button>
          </div>
        </div>
      )}

      <main className="pm-page">
        {/* HERO */}
        <div className="pm-hero">
          <div className="pm-hero-inner">
            <h1>Jharkhand Paramedical Exam 2026 (PMECE)<br />Official Guide + Free PYQ Papers</h1>
            <p className="pm-hero-desc">
              Based on the official JCECEB notification (Advt. No. JCECEB/05/26-26) — exam date, eligibility,
              PCM/PCB & Matric-level pattern, fee, dates, and free MCQs to practice online, all in one place.
            </p>
            <div className="pm-hero-pills">
              <span className="pm-hero-pill">150 MCQs</span>
              <span className="pm-hero-pill">2 Aug 2026</span>
              <span className="pm-hero-pill">Two Levels: Inter & Matric</span>
            </div>
          </div>
        </div>

        <Container style={{ maxWidth: 980, margin: "0 auto", padding: "0 14px" }}>
          {/* STAT STRIP */}
          <div className="pm-stat-strip">
            {[
              { val: "150", label: "Total Questions" },
              { val: "150", label: "Total Marks" },
              { val: "2 Aug", label: "Exam Date 2026" },
              { val: "15+", label: "Courses Covered" },
            ].map((s, i) => (
              <div className="pm-stat" key={i}>
                <div className="pm-stat-val">{s.val}</div>
                <div className="pm-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* AD — after stat strip */}
          <div style={{ margin: "20px 0", minHeight: 0 }}>
            <AdBanner slot="2434542863" />
          </div>

          {/* 1. HIGHLIGHTS */}
          <div className="pm-section" id="exam-info">
            <SectionHead
              label="About the Exam"
              title="Exam Highlights"
              sub="Jharkhand Paramedical entrance (PMECE) 2026 is a state-level exam conducted by JCECEB for admission to Pharmacy, Para-Medical Diploma and Certificate courses across Jharkhand — details below are from the official notification dated 29 June 2026."
            />
            <div className="pm-card">
              <div className="pm-card-header"><div className="pm-card-icon">📋</div><h3 className="pm-card-title">At a Glance — Official 2026 Notification</h3></div>
              <div className="pm-card-body" style={{ padding: 0 }}>
                <table className="pm-highlights-table">
                  <tbody>{highlights.map((h, i) => <tr key={i}><td>{h.label}</td><td>{h.value}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
          </div>
          <Sep />

          {/* 2. COURSES */}
          <div className="pm-section" id="courses">
            <SectionHead label="What You Can Study" title="Courses Offered Under PMECE 2026" sub="Three distinct tracks, each with its own eligibility and age norms — check which matches your qualification." />
            {courseTracks.map((track, i) => (
              <div className="pm-track-card" key={i}>
                <div className="pm-track-header" style={{ background: track.color }}>
                  <span>{track.icon}</span><span>{track.title}</span>
                  <span className="pm-track-header-dur">{track.duration}</span>
                </div>
                <div className="pm-track-meta">
                  <span>🎓 <strong>Eligibility:</strong> {track.eligNote}</span>
                  <span>🎂 <strong>Age Limit:</strong> {track.ageNote}</span>
                </div>
                <div className="pm-track-body">
                  {track.courses.map((c, j) => (
                    <div className="pm-track-item" key={j}>
                      <span>{c.name}</span>
                      <span className="pm-track-duration">{c.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Sep />
          <div className="bt-scard" style={{ padding: "8px", minHeight: 0 }}>
            <AdBanner slot="8679502538" format="auto" />
          </div>

          {/* 3. PATTERN */}
          <div className="pm-section" id="pattern">
            <SectionHead label="Exam Pattern" title="Subject-wise Distribution (Official)" sub="150 objective questions in both levels, but the subject combination differs by level and group. Exam is held in two shifts on the same day." />

            <p className="pm-pattern-group-title">Intermediate Level — Pharmacy & Para-Medical Diploma</p>
            {interPattern.map((grp, gi) => (
              <div key={gi} style={{ marginBottom: 6 }}>
                <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--muted)", margin: "0 0 8px 2px" }}>{grp.group}</p>
                <div className="pm-subjects-grid">
                  {grp.subjects.map((s, si) => (
                    <div className="pm-subject-card" key={si} style={{ background: "#fff7ed", borderColor: "#fed7aa" }}>
                      <span className="pm-subject-name" style={{ color: "#c2410c" }}>{s.n}</span>
                      <span className="pm-subject-stat"><span style={{ color: "#c2410c" }}>{s.q}</span> Qs / {s.q} Marks</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <p className="pm-pattern-group-title" style={{ marginTop: 18 }}>Matric Level — Certificate Courses</p>
            <div className="pm-subjects-grid" style={{ marginBottom: 8 }}>
              {matricPattern.map((s, si) => (
                <div className="pm-subject-card" key={si} style={{ background: "#f0f9ff", borderColor: "#bae6fd" }}>
                  <span className="pm-subject-name" style={{ color: "#0369a1" }}>{s.n}</span>
                  <span className="pm-subject-stat"><span style={{ color: "#0369a1" }}>{s.q}</span> Qs / {s.q} Marks</span>
                </div>
              ))}
            </div>

            <p className="pm-pattern-group-title" style={{ marginTop: 18 }}>Exam Shift Timings — 2 August 2026</p>
            <div className="pm-shift-list" style={{ marginBottom: 12 }}>
              {examShifts.map((s, i) => (
                <div className="pm-shift-item" key={i}>
                  <span className="pm-shift-level">{s.level}</span>
                  <span className="pm-shift-time">{s.time}</span>
                </div>
              ))}
            </div>

            <div className="pm-info-alert">
              <span className="pm-info-alert-icon">⚠️</span>
              <span><strong>Marking Scheme:</strong> The official notification does not explicitly state whether there is negative marking. Please confirm this from your admit card or exam-day instructions before the exam.</span>
            </div>
          </div>
          <Sep />

          {/* 4. ELIGIBILITY */}
          <div className="pm-section" id="eligibility">
            <SectionHead label="Who Can Apply" title="Eligibility Criteria 2026" sub="Official eligibility as per JCECEB PMECE 2026 notification (Advt. No. JCECEB/05/26-26)." />
            <div className="pm-elig-grid">
              {eligibility.map((e, i) => (
                <div className="pm-elig-card" key={i}>
                  <div className="pm-elig-icon">{e.icon}</div>
                  <div><p className="pm-elig-title">{e.title}</p><p className="pm-elig-desc">{e.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
          <Sep />
          <div className="bt-scard" style={{ padding: "8px", minHeight: 0 }}>
            <AdBanner slot="3636692323" format="auto" />
          </div>

          {/* 5. FEE */}
          <div className="pm-section" id="fee">
            <SectionHead label="Fees" title="Application-cum-Examination Fee 2026" sub="Fee is category and gender based, as per the official notification. Payment is via Credit Card / Debit Card / Net Banking / UPI and is non-refundable." />
            <div className="pm-card">
              <div className="pm-card-body" style={{ padding: 0 }}>
                <table className="pm-fee-table">
                  <thead><tr><th>Category</th><th style={{ textAlign: "center" }}>Fee</th></tr></thead>
                  <tbody>{applicationFee.map((f, i) => <tr key={i}><td>{f.category}</td><td style={{ textAlign: "center" }} className="pm-fee-val">{f.fee}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
            <p style={{ fontSize: "0.76rem", color: "var(--muted)", marginTop: 8 }}>
              * This fee schedule applies uniformly whether a candidate is applying for a Matric-level or Intermediate-level course.
            </p>
          </div>
          <Sep />

          {/* 6. DATES */}
          <div className="pm-section" id="dates">
            <SectionHead
              label="Schedule"
              title="Important Dates 2026 (Official)"
              sub="As notified in Advt. No. JCECEB/05/26-26, dated 29 June 2026. The Board reserves the right to change the exam date, mode or centre — always check jceceb.jharkhand.gov.in for the latest update."
            />
            <div className="pm-dates-list">
              {importantDates.map((d, i) => (
                <div className={`pm-date-item${d.highlight ? " pm-date-item--highlight" : ""}`} key={i}>
                  <span className="pm-date-event">{d.event}</span>
                  <span className="pm-date-val">{d.date}</span>
                </div>
              ))}
            </div>
          </div>
          <Sep />

          {/* 7. HOW TO APPLY */}
          <div className="pm-section" id="apply">
            <SectionHead
              label="Application Process"
              title="How to Apply Online — Step by Step"
              sub="Official online application process as per the JCECEB PMECE 2026 notification."
            />
            <div className="pm-steps-list">
              {onlineApplicationSteps.map((s, i) => (
                <div className="pm-step-card" key={i}>
                  <div className="pm-step-num">{i + 1}</div>
                  <div>
                    <p className="pm-step-title">{s.icon} {s.title}</p>
                    <p className="pm-step-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pm-info-alert">
              <span className="pm-info-alert-icon">⚠️</span>
              <span>
                <strong>Important:</strong> The correction window is only open from 16 to 17 July 2026 — no correction or fresh application will be accepted after this.
                Upload only an unedited colour photograph with both ears visible; edited photos will lead to application rejection.
              </span>
            </div>
          </div>
          <Sep />

          <div className="bt-scard" style={{ padding: "8px", minHeight: 0 }}>
            <AdBanner slot="6242297060" format="auto" />
          </div>

          {/* 8. DOCUMENTS */}
          <div className="pm-section" id="documents">
            <SectionHead
              label="Interview / Counselling Documents"
              title="Documents Required at Interview"
              sub="To be submitted at the time of interview/document verification, as specified in the official notification."
            />
            <div className="pm-docs-list">
              {documentsRequired.map((doc, i) => (
                <div className="pm-doc-item" key={i}>
                  <span className="pm-doc-icon">📄</span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>
          <Sep />

          {/* 9. TIE-BREAKING */}
          <div className="pm-section" id="merit">
            <SectionHead
              label="Merit List"
              title="Tie-Breaking Rules (Official)"
              sub="For the Intermediate level, PCM and PCB group candidates eligible for both are combined into a single 'PCMB' merit list. If two or more candidates score equal marks, rank is decided in this order:"
            />
            <p className="pm-pattern-group-title">Intermediate Level (PCMB Merit List)</p>
            <div className="pm-card" style={{ marginBottom: 16 }}>
              <div className="pm-card-body" style={{ padding: 0 }}>
                <table className="pm-tie-table">
                  <thead><tr><th>Priority</th><th>Resolution</th></tr></thead>
                  <tbody>
                    {tieBreakingRules.inter.map((r, i) => (
                      <tr key={i}>
                        <td style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, color: "var(--amber)" }}>#{r.rank}</td>
                        <td style={{ fontWeight: 600 }}>{r.resolution}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="pm-pattern-group-title">Matric Level (Certificate Courses)</p>
            <div className="pm-card">
              <div className="pm-card-body" style={{ padding: 0 }}>
                <table className="pm-tie-table">
                  <thead><tr><th>Priority</th><th>Resolution</th></tr></thead>
                  <tbody>
                    {tieBreakingRules.matric.map((r, i) => (
                      <tr key={i}>
                        <td style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, color: "var(--amber)" }}>#{r.rank}</td>
                        <td style={{ fontWeight: 600 }}>{r.resolution}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="pm-info-alert">
              <span className="pm-info-alert-icon">💡</span>
              <span><strong>Strategy tip:</strong> Intermediate level में Physics पर, और Matric level में Mathematics पर सबसे ज़्यादा focus करो — ये tie-breaking में सबसे पहले देखे जाते हैं।</span>
            </div>
          </div>
          <Sep />
          <div className="bt-scard" style={{ padding: "8px", minHeight: 0 }}>
            <AdBanner slot="8729236906" format="auto" />
          </div>

          {/* 10. RESERVATION */}
          <div className="pm-section" id="reservation">
            <SectionHead
              label="Reservation Policy"
              title="Category-wise Reservation"
              sub="As per the Jharkhand Government's prevailing reservation policy, applicable to state institutions and services, referenced in the official PMECE notification."
            />
            <div className="pm-card">
              <div className="pm-card-body" style={{ padding: 0 }}>
                <table className="pm-res-table">
                  <thead><tr><th>Category / Quota</th><th>Details</th></tr></thead>
                  <tbody>
                    {reservationCategories.map((r, i) => (
                      <tr key={i}><td style={{ fontWeight: 700 }}>{r.category}</td><td>{r.detail}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Sep />



          {/* 11. PYQ */}
          <div className="pm-section" id="pyq">
            <SectionHead label="Previous Year Papers" title="Jharkhand Paramedical PYQ Papers" />
            <div className="pm-pyq-feature">
              <div className="pm-pyq-feature-inner">
                <span className="pm-pyq-tag"><span className="pm-pyq-tag-dot" />📄 Download Paramedical Question Paper PDF — Free</span>
                <h3>Official PYQ Papers — Jharkhand PMECE</h3>
                <p className="pm-pyq-feature-desc">
                  PMECE exam में पुराने papers से questions repeat होते हैं। जैसे ही official papers उपलब्ध होंगे,
                  Intermediate (PCM/PCB) और Matric level — दोनों के papers यहाँ free download के लिए मिलेंगे।
                </p>
                <div className="pm-pyq-table-wrap">
                  <table className="pm-pyq-table">
                    <thead><tr><th>Year</th><th>Paper Name</th><th>Level</th><th>Download</th></tr></thead>
                    <tbody>
                      {pyqPapers.map((p, i) => (
                        <tr key={i}>
                          <td><strong style={{ color: "#c2410c", fontFamily: "Sora, sans-serif", fontSize: "1rem" }}>{p.year}</strong></td>
                          <td>
                            <Link
                              href={`/resources/jharkhand-paramedical/pdf?year=${p.year}&subject=PMECE%20Question%20Paper`}
                              style={{ color: "#0f172a", fontWeight: 600, textDecoration: "none" }}
                              className="hover:text-amber-600 transition-colors"
                            >
                              PMECE {p.year}
                            </Link>
                          </td>
                          <td style={{ color: "#64748b", fontSize: "0.78rem" }}>Inter · Matric</td>
                          <td>
                            {p.driveUrl ? (
                              <Link
                                href={`/resources/jharkhand-paramedical/pdf?year=${p.year}&subject=PMECE%20Question%20Paper`}
                                className="pm-dl-btn"
                                aria-label={`Read and Download Jharkhand Paramedical ${p.year} Question Paper PDF`}
                              >
                                📥 Read &amp; Download PDF
                              </Link>
                            ) : (
                              <button className="pm-dl-btn" disabled>⏳ Coming Soon</button>
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
          <div className="pm-section" id="practice">
            <SectionHead label="Online Mock Test" title="Practice Paramedical Online — Free MCQs" />
            <div className="pm-practice-banner">
              <div className="pm-practice-inner">
                <h3>Practice Jharkhand Paramedical Questions Online</h3>
                <p className="pm-practice-desc">
                  Futurely पर Jharkhand Paramedical MCQs online attempt करो — timer के साथ, instant score के साथ,
                  और detailed solution के साथ। अपने group (PCM/PCB/Matric) के हिसाब से practice करो।
                </p>
                <div className="pm-practice-feats">
                  {["Group-wise Practice", "Instant Solutions", "Score Tracking", "Free Forever"].map((feat, i) => (
                    <div className="pm-practice-feat" key={i}><div className="pm-pf-dot" />{feat}</div>
                  ))}
                </div>
                <div className="pm-practice-btns">
                  <Link href="/exam-preparation/jharkhand-paramedical" className="pm-start-btn-wrap">
                    <span className="pm-practice-btn-primary">🚀 Start Preparation Now — Free</span>
                  </Link>
                  <Link href="/test-series" className="pm-practice-btn-secondary">📝 Full Mock Test</Link>
                </div>
              </div>
            </div>
          </div>
          <Sep />

          {/* 13. TIPS */}
          <div className="pm-section" id="preparation">
            <SectionHead label="Strategy" title="How to Prepare for PMECE 2026" sub="Practical tips based on the official exam pattern." />
            <div className="pm-tips-grid" style={{ marginBottom: 20 }}>
              {preparationTips.map((t, i) => (
                <div className="pm-tip-card" key={i}><span className="pm-tip-icon">{t.icon}</span><span>{t.tip}</span></div>
              ))}
            </div>

            <p className="pm-section-label" style={{ marginBottom: 12 }}>Recommended Daily Schedule</p>
            <div className="pm-card" style={{ marginBottom: 14 }}>
              <div className="pm-card-body">
                {[
                  { time: "7:00 – 9:00 AM", activity: "Theory reading (NCERT Science — Physics, Chemistry, and Maths or Biology per your group)", icon: "📖" },
                  { time: "10:00 AM – 12:00 PM", activity: "Practice MCQs — subjects relevant to your course level (Intermediate or Matric)", icon: "✏️" },
                  { time: "2:00 – 3:30 PM", activity: "Matric-level candidates: daily current affairs & General Knowledge revision", icon: "🌐" },
                  { time: "4:00 – 6:00 PM", activity: "Full-length mock tests, timed to 2.5 hours — track speed and accuracy", icon: "📝" },
                ].map((slot, i, arr) => (
                  <div className="pm-slot" key={i} style={i === arr.length - 1 ? { borderBottom: "none", marginBottom: 0, paddingBottom: 0 } : {}}>
                    <span className="pm-slot-icon">{slot.icon}</span>
                    <div><p className="pm-slot-time">{slot.time}</p><p className="pm-slot-label">{slot.activity}</p></div>
                  </div>
                ))}
              </div>
            </div>

            <p className="pm-section-label" style={{ marginBottom: 12 }}>Recommended Books</p>
            <div className="pm-card">
              <div className="pm-card-body">
                {[
                  { subject: "Physics / Chemistry", books: "NCERT Class 10–12 Science, Lakhmir Singh & Manjit Kaur Science" },
                  { subject: "Maths / Biology", books: "NCERT Class 10–12 Mathematics or Biology (per your group), R.S. Aggarwal Class 10 Maths" },
                  { subject: "Science (Matric)", books: "NCERT Class 9–10 Science, Lucent's General Science" },
                  { subject: "General Knowledge", books: "Lucent's General Knowledge, Jharkhand GK Manual, Daily Newspaper / Current Affairs Digest" },
                ].map((b, i, arr) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", paddingBottom: i < arr.length - 1 ? 14 : 0, marginBottom: i < arr.length - 1 ? 14 : 0, borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <span style={{ fontFamily: "Sora, sans-serif", fontSize: "0.68rem", fontWeight: 800, background: "var(--amber)", color: "#fff", borderRadius: 6, padding: "3px 8px", flexShrink: 0, marginTop: 2 }}>{b.subject}</span>
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
          <div className="pm-section" id="faq">
            <SectionHead label="FAQ" title="Frequently Asked Questions" sub="Common doubts about Jharkhand Paramedical Entrance Exam (PMECE) 2026, answered from the official notification." />
            {faqs.map((faq, i) => (
              <div className={"pm-faq-item" + (openFaq === i ? " pm-faq-item--open" : "")} key={i}>
                <button className="pm-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                  <span className="pm-faq-q">{faq.q}</span>
                  <span className="pm-faq-chevron">▾</span>
                </button>
                {openFaq === i && <div className="pm-faq-ans">{faq.a}</div>}
              </div>
            ))}
          </div>
          <Sep />

          {/* OFFICIAL STRIP */}
          <div style={{ paddingTop: 24 }}>
            <div className="pm-official-strip">
              <div className="pm-official-text">
                <h3>Official Website – JCECEB Jharkhand</h3>
                <p>Apply online, download admit card, check results & counselling schedule at the official portal.</p>
              </div>
              <a href="https://jceceb.jharkhand.gov.in" target="_blank" rel="noopener noreferrer" className="pm-official-link">
                🌐 jceceb.jharkhand.gov.in
              </a>
            </div>
          </div>

          {/* RELATED */}
          <div className="pm-related-grid">
            <Link href="/resources/jharkhand-anm/exam-information" className="pm-related-link"><span>♀️ Jharkhand ANM Guide</span><span>›</span></Link>
            <Link href="/resources/jharkhand-bsc-nursing/exam-information" className="pm-related-link"><span>🩺 Jharkhand B.Sc Nursing Guide</span><span>›</span></Link>
            <Link href="/exam-preparation/jharkhand-paramedical" className="pm-related-link"><span>🎯 Practice Paramedical MCQs</span><span>›</span></Link>
          </div>

          <p className="pm-disclaimer">
            All information above is compiled from the official JCECEB PMECE-2026 notification (Advt. No. JCECEB/05/26-26, dated 29 June 2026). The Board reserves the right
            to change the exam date, mode, or centre — always verify the latest updates at{" "}
            <a href="https://jceceb.jharkhand.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "var(--amber)" }}>
              jceceb.jharkhand.gov.in
            </a>.
            Futurely is not affiliated with JCECEB or the Government of Jharkhand.
          </p>
        </Container>
      </main>
    </>
  );
};

export default JHParamedical;