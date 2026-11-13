/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container } from "react-bootstrap";
import AdBanner from "@/components/AdBanner";
import Image from "next/image";

/* ─────────────────────────────────────────────
   STATIC DATA  — from OFFICIAL JCECEB Agriculture Notification
   (Advt. No. JCECEB/06/26-23, dated 16/06/2026, Ranchi)
   + supplementary pattern/syllabus details from JCECEB's general JCECE pattern
───────────────────────────────────────────── */
const highlights = [
  { label: "Exam Name", value: "JCECE (For Agriculture & Other Allied Courses) – 2026" },
  { label: "Notification No.", value: "JCECEB/06/26-23, dated 16 June 2026" },
  { label: "Conducting Body", value: "JCECEB, Jharkhand" },
  { label: "Exam Level", value: "State-Level — Subject Groups: PCM / PCB / PCMB" },
  { label: "Admission To", value: "1st Semester/Year Degree-Level Professional Courses (Academic Year 2026–27)" },
  { label: "Exam Mode", value: "Offline – OMR Based (Pen & Paper), Bilingual Hindi & English" },
  { label: "Exam Date", value: "19 July 2026 (Sunday)" },
  { label: "Exam Centres", value: "Ranchi and Dumka Headquarters Only" },
  { label: "Total Questions", value: "150 MCQs (PCM/PCB Groups) | 200 MCQs (PCMB Group)" },
  { label: "Total Marks", value: "150 Marks (PCM/PCB) | 200 Marks (PCMB) — 1 Mark Each" },
  { label: "Marking Scheme", value: "Not specified in this notification — Pattern & Scoring details are in the separate Information Bulletin on the JCECEB website" },
  { label: "Gender Eligibility", value: "Both Male & Female Candidates Eligible" },
  { label: "Age Limit", value: "17–25 Years (B.V.Sc & A.H.) or 17–22 Years (all other courses) — Course-Dependent, See Eligibility Below" },
];

const courses = [
  {
    name: "B.V.Sc & A.H. (Bachelor of Veterinary Science & Animal Husbandry)",
    group: "PCB",
    qualification: "Intermediate Science (10+2) with Physics, Chemistry, Biology and English as core subjects. General category candidates must qualify in each of English, Physics, Chemistry and Biology, and score an aggregate of 50% in these subjects (47.5% for SC/ST/special category, as per VCI Gazette Notification 2016). Admission is based purely on entrance exam merit — no other weightage is considered.",
    age: "17 to 25 years as on 31 December 2026 (date of admission to 1st year). 5-year age relaxation for SC/ST/OBC candidates.",
  },
  {
    name: "B.Sc. (Hons.) Agriculture",
    group: "PCB or PCMB",
    qualification: "+2 Science with Biology as one subject — either PCB (Physics, Chemistry, Biology) or PCMB (Physics, Chemistry, Mathematics, Biology).",
    age: "17 to 22 years as on 1 July 2026 (start of academic year of admission). 5-year age relaxation for SC/ST/OBC candidates.",
  },
  {
    name: "B.Sc. (H.) Forestry",
    group: "PCB or PCM",
    qualification: "Intermediate Science (10+2) or equivalent with Physics, Chemistry, Biology or Physics, Chemistry, Mathematics from a recognised Board/University.",
    age: "17 to 22 years as on 1 July 2026. 5-year age relaxation for SC/ST/OBC candidates.",
  },
  {
    name: "B.Tech. (Dairy Technology)",
    group: "PCM",
    qualification: "10+2 / Intermediate with PCM (Physics, Chemistry, Mathematics) from a recognised Board/University.",
    age: "17 to 22 years as on 1 July 2026. 5-year age relaxation for SC/ST/OBC candidates.",
  },
  {
    name: "B.Tech. (Agriculture Engineering)",
    group: "PCM",
    qualification: "10+2 / Intermediate with PCM (Physics, Chemistry, Mathematics) from a recognised Board/University.",
    age: "17 to 22 years as on 1 July 2026. 5-year age relaxation for SC/ST/OBC candidates.",
  },
  {
    name: "B.F.Sc. (Bachelor of Fisheries Science)",
    group: "PCMB / PCB / Inter (Agriculture)",
    qualification: "Higher Secondary / 10+2 / Intermediate with PCMB, PCB, or Intermediate (Agriculture) from a recognised Board/University.",
    age: "17 to 22 years as on 1 July 2026. 5-year age relaxation for SC/ST/OBC candidates.",
  },
  {
    name: "B.Sc. (H.) Horticulture",
    group: "PCB / PCMB / PCM / PC Forestry / Inter (Agriculture)",
    qualification: "10+2 / Intermediate with PCB, PCMB, PCM, PC Forestry or Intermediate (Agriculture) from a recognised Board/University.",
    age: "17 to 22 years as on 1 July 2026. 5-year age relaxation for SC/ST/OBC candidates.",
  },
];

const subjectGroups = [
  { group: "PCM", full: "Physics, Chemistry, Mathematics", questions: "150 (50 per subject)", color: "#166534", bg: "#f0fdf4", border: "#bbf7d0", forCourses: "B.Tech (Dairy Tech.), B.Tech (Agri. Engg.), B.Sc (H) Forestry, B.Sc (H) Horticulture" },
  { group: "PCB", full: "Physics, Chemistry, Biology", questions: "150 (50 per subject)", color: "#0369a1", bg: "#f0f9ff", border: "#bae6fd", forCourses: "B.V.Sc & A.H., B.Sc (Hons) Agriculture, B.Sc (H) Forestry, B.F.Sc, B.Sc (H) Horticulture" },
  { group: "PCMB", full: "Physics, Chemistry, Mathematics, Biology", questions: "200 (50 per subject)", color: "#a16207", bg: "#fefce8", border: "#fde68a", forCourses: "B.Sc (Hons) Agriculture, B.F.Sc, B.Sc (H) Horticulture" },
];

const importantDates = [
  { event: "Notification Release", date: "16 June 2026", highlight: false },
  { event: "Online Application Start", date: "17 June 2026", highlight: false },
  { event: "Online Application Last Date", date: "2 July 2026", highlight: false },
  { event: "Correction / Editing Window", date: "3 – 4 July 2026", highlight: false },
  { event: "Exam Date", date: "19 July 2026 (Sunday)", highlight: true },
  { event: "Exam Centres", date: "Ranchi and Dumka Headquarters Only", highlight: false },
  { event: "Result Declaration", date: "To Be Announced — Check Official Website", highlight: false },
];

const applicationFee = [
  { category: "General / EWS / BC-I / BC-II", group: "PCM / PCB", fee: "₹900" },
  { category: "General / EWS / BC-I / BC-II", group: "PCMB", fee: "₹1000" },
  { category: "SC / ST / Female (All Categories)", group: "PCM / PCB", fee: "₹450" },
  { category: "SC / ST / Female (All Categories)", group: "PCMB", fee: "₹500" },
  { category: "Persons with Benchmark Disabilities (PwBD)", group: "All Groups", fee: "Exempted" },
];

const onlineApplicationSteps = [
  {
    title: "Registration & Form Filling",
    desc: "Visit jceceb.jharkhand.gov.in → click 'Click Here for All Online Application Submission – JCECEB 2026' on the homepage → select the JCECE (Agriculture & Other Allied Courses) – 2026 application form. Fill in personal, educational and category details, and choose your Subject Group (PCM / PCB / PCMB) carefully based on the course(s) you wish to apply for.",
    icon: "📝",
  },
  {
    title: "Check Eligibility & Age Against Your Chosen Group",
    desc: "Before submitting, verify that your educational qualification and age match the requirements for your opted Subject Group and target course — these vary by course as detailed in the eligibility section below.",
    icon: "🔍",
  },
  {
    title: "Pay Fee & Use the Correction Window if Needed",
    desc: "Pay the applicable category-and-group-based application-cum-examination fee online. If corrections are needed in submitted details, use the editing window (3–4 July 2026 only) — no further correction requests will be accepted after this period.",
    icon: "💳",
  },
];

const documentsRequired = [
  "Class 10 & Class 12 (Intermediate) Admit Card, Marksheet & Passing Certificate — original + self-attested copy",
  "Local Resident / Domicile Certificate confirming permanent or local resident status of Jharkhand State",
  "Caste Certificate — SC/ST/BC-I/BC-II (if applicable), issued by an authorised Jharkhand officer",
  "EWS Income & Assets Certificate (if applicable)",
  "Benchmark Disability Certificate (if applicable, for fee exemption)",
  "JCECE (Agriculture) 2026 Admit Card",
  "Recent Colour Photograph & Signature",
];

const reservationNote = "Detailed reservation policy, along with Subject Groups, Pattern & Scoring, and the online application method, is published in the Information Bulletin available under the 'Download' section of the JCECEB website. All caste, residential, disability and EWS certificates submitted will undergo detailed verification — candidates applying under an ineligible category or with forged documents will face criminal action.";

const pyqPapers = [
  { year: "2026", driveUrl: null },
  { year: "2025", driveUrl: "https://drive.google.com/file/d/1qPt72rlVKV3r5yOlKhLC1czHB7WL5L33/view" },
  { year: "2024", driveUrl: "https://drive.google.com/file/d/1o_yFzjotl3ma9noooQRAWIC7cCq1J_xG/view" },
  { year: "2023", driveUrl: "https://drive.google.com/file/d/1IslTlbnY6w84XkqPwc49ZZe_6L3DRNA8/view" },
  { year: "2022", driveUrl: "https://drive.google.com/file/d/1np1zPK3Ewij4FrAgB0fudoBvYkjvBsSh/view" },
];

const preparationTips = [
  { icon: "📅", tip: "अपने Subject Group (PCM/PCB/PCMB) के हिसाब से syllabus तय करो — Class 11-12 NCERT आधारित तैयारी सबसे मजबूत नींव है।" },
  { icon: "📝", tip: "हर subject से 50 questions पूछे जाते हैं — इसलिए Physics, Chemistry, Maths/Biology सभी को बराबर समय दो।" },
  { icon: "⚠️", tip: "Marking scheme और exam duration आधिकारिक Information Bulletin में confirm करें — अलग-अलग groups के लिए ये अलग हो सकते हैं।" },
  { icon: "🎯", tip: "अगर PCMB group चुना है तो 200 questions solve करने हैं — समय प्रबंधन और stamina दोनों पर practice करो।" },
  { icon: "🔁", tip: "पिछले साल के JCECE Agriculture question papers solve करो — questions का difficulty level और repeat pattern समझने में मदद मिलेगी।" },
  { icon: "📊", tip: "जिस course में interested हो (B.V.Sc, B.Sc Agriculture, B.Tech Dairy आदि), उसकी eligibility और age limit दोबारा ज़रूर verify करो — courses के अनुसार अलग-अलग है।" },
];

const faqs = [
  {
    q: "JCECE (Agriculture & Other Allied Courses) 2026 क्या है?",
    a: "यह JCECEB द्वारा आयोजित एक state-level entrance exam है (Advt. No. JCECEB/06/26-23, dated 16/06/2026), जो शैक्षणिक वर्ष 2026-27 में B.V.Sc & A.H., B.Sc (Hons) Agriculture, B.Sc (H) Forestry, B.Tech (Dairy Technology), B.F.Sc, B.Tech (Agriculture Engineering) और B.Sc (H) Horticulture जैसे 1st year/semester degree-level courses में admission के लिए है।",
  },
  {
    q: "Exam date और centers क्या हैं?",
    a: "Exam 19 जुलाई 2026 (रविवार) को offline mode में होगी। यह सिर्फ Ranchi और Dumka जिला मुख्यालयों में conduct की जाएगी — अन्य JCECEB exams की तुलना में इस exam के centers काफी सीमित हैं।",
  },
  {
    q: "Subject Groups (PCM/PCB/PCMB) का क्या मतलब है?",
    a: "PCM का मतलब Physics-Chemistry-Mathematics है (B.Tech Dairy Technology, B.Tech Agriculture Engineering जैसे courses के लिए)। PCB का मतलब Physics-Chemistry-Biology है (B.V.Sc & A.H. जैसे courses के लिए)। PCMB में चारों subjects शामिल हैं और यह उन candidates के लिए है जो PCB और PCM दोनों group के courses के लिए eligible होना चाहते हैं (जैसे B.Sc Agriculture, B.F.Sc, B.Sc Horticulture)।",
  },
  {
    q: "अलग-अलग courses के लिए eligibility क्या है?",
    a: "हर course की eligibility अलग है: B.V.Sc & A.H. के लिए Intermediate Science (PCB+English) चाहिए, B.Sc Agriculture के लिए PCB या PCMB, B.Sc Forestry के लिए PCB या PCM, B.Tech Dairy/Agriculture Engineering के लिए PCM, और B.F.Sc व B.Sc Horticulture के लिए कई subject combinations स्वीकार्य हैं। विस्तृत जानकारी ऊपर 'Courses & Eligibility' सेक्शन में दी गई है।",
  },
  {
    q: "Age limit क्या है?",
    a: "B.V.Sc & A.H. के लिए उम्र 31 दिसंबर 2026 तक 17 से 25 वर्ष के बीच होनी चाहिए। बाकी सभी courses (B.Sc Agriculture, B.Sc Forestry, B.Tech Dairy/Agriculture Engineering, B.F.Sc, B.Sc Horticulture) के लिए उम्र 1 जुलाई 2026 तक 17 से 22 वर्ष के बीच होनी चाहिए। SC/ST/OBC candidates को अधिकतम आयु सीमा में 5 वर्ष की छूट मिलती है।",
  },
  {
    q: "Application fee कितनी है?",
    a: "General/EWS/BC-I/BC-II candidates के लिए PCM/PCB group की fee ₹900 और PCMB group की fee ₹1000 है। SC/ST candidates और सभी श्रेणियों की female candidates के लिए यह क्रमशः ₹450 और ₹500 है। Benchmark Disabilities वाले candidates को कोई fee नहीं देनी है।",
  },
  {
    q: "Exam pattern और marking scheme क्या है?",
    a: "आधिकारिक notification में Pattern व Scoring की जानकारी अलग से Information Bulletin में दी गई है (JCECEB वेबसाइट के 'Download' कॉलम में उपलब्ध)। सामान्यतः JCECEB के अन्य groups के आधार पर, PCM/PCB group में 150 questions (150 marks) और PCMB group में 200 questions (200 marks) होने की संभावना है, प्रत्येक सही उत्तर पर +1 अंक मिलता है। सटीक marking scheme (negative marking है या नहीं) के लिए आधिकारिक Information Bulletin अवश्य देखें।",
  },
  {
    q: "Correction window कब है?",
    a: "आवेदन में भरे गए विवरण में सुधार के लिए 3 जुलाई 2026 से 4 जुलाई 2026 तक ही मौका दिया जाएगा। इस अवधि के बाद कोई सुधार या नया आवेदन स्वीकार नहीं किया जाएगा।",
  },
  {
    q: "गलत category या forged documents देने पर क्या होगा?",
    a: "सभी Caste, Residential, Disability और EWS certificates का विस्तृत सत्यापन किया जाएगा। यदि कोई candidate किसी category के लिए अपात्र होते हुए भी उस श्रेणी में आवेदन करता है, या कोई forged document प्रस्तुत करता है, तो उसके विरुद्ध आपराधिक कार्रवाई की जाएगी।",
  },
];

const SectionHead = ({ label, title, sub }) => (
  <div style={{ marginBottom: 20 }}>
    <span className="ag-section-label">{label}</span>
    <h2 className="ag-section-title">{title}</h2>
    {sub && <p className="ag-section-sub">{sub}</p>}
  </div>
);

const Sep = () => <div className="ag-sep" />;

/* ═══════════════════════════════════════════
   METADATA (Next.js App Router)
   Place this export in a separate metadata.js / layout.js if this
   file stays a Client Component ("use client" cannot export metadata).
   Included here as a reference block — see note at bottom of file.
═══════════════════════════════════════════ */
// export const metadata = {
//   title: "Jharkhand Agriculture Entrance Exam 2026 (JCECE) – Official Dates, Pattern & Free PYQ Papers | Futurely",
//   description: "JCECE Agriculture & Allied Courses 2026 official details from JCECEB notification: exam date 19 July 2026, eligibility for B.V.Sc, B.Sc Agriculture, B.Tech Dairy Tech & more, PCM/PCB/PCMB pattern, fee, dates, and free PYQ papers.",
//   alternates: { canonical: "https://www.futurely.in/resources/jharkhand-agriculture/exam-information" },
//   robots: { index: true, follow: true },
//   openGraph: {
//     type: "website",
//     url: "https://www.futurely.in/resources/jharkhand-agriculture/exam-information",
//     title: "Jharkhand Agriculture Entrance Exam 2026 (JCECE) – Official Guide | Futurely",
//     description: "Official JCECEB Agriculture entrance guide 2026 — eligibility, PCM/PCB/PCMB pattern, dates, fee, and free PYQ papers, all in one place.",
//     images: ["https://www.futurely.in/og-image.png"],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Jharkhand Agriculture Exam 2026 (JCECE) – Official Guide & Free Mock Tests | Futurely",
//     description: "Official JCECEB Agriculture entrance details + free online MCQ practice. Exam pattern, eligibility, dates — all in one place.",
//     images: ["https://www.futurely.in/og-image.png"],
//   },
// };

/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
const JHAgriculture = () => {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const courseSchema = {
    "@context": "https://schema.org", "@type": "Course",
    name: "JCECE Agriculture & Allied Courses Entrance Exam 2026 Preparation",
    description: "Free JCECE (Agriculture & Other Allied Courses) 2026 guide based on the official JCECEB notification: eligibility, PCM/PCB/PCMB subject groups, exam pattern, important dates and free online MCQ practice.",
    provider: { "@type": "Organization", name: "Futurely", sameAs: "https://www.futurely.in" },
    url: "https://www.futurely.in/resources/jharkhand-agriculture/exam-information",
    educationalLevel: "Higher Secondary", inLanguage: ["en", "hi"], isAccessibleForFree: true,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.futurely.in" },
      { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.futurely.in/resources" },
      { "@type": "ListItem", position: 3, name: "Jharkhand Agriculture Exam 2026", item: "https://www.futurely.in/resources/jharkhand-agriculture/exam-information" },
    ],
  };
  const pyqListSchema = {
    "@context": "https://schema.org", "@type": "ItemList",
    name: "Jharkhand Agriculture Entrance Previous Year Question Papers",
    description: "Free PYQ papers for JCECE Agriculture & Allied Courses Entrance Exam.",
    itemListElement: pyqPapers.map((p, i) => ({
      "@type": "ListItem", position: i + 1,
      name: `JCECE Agriculture Question Paper ${p.year} – PCM/PCB/PCMB`,
      url: "https://www.futurely.in/resources/jharkhand-agriculture/exam-information",
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
        @keyframes agDlGlow {
          0%   { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }

        /* BANNER */
        .ag-banner-overlay {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px);
          padding: 16px; box-sizing: border-box;
          animation: agBannerFadeIn 0.3s ease;
        }
        @keyframes agBannerFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .ag-banner-wrapper {
          position: relative;
          width: min(340px, calc(100vw - 32px));
          aspect-ratio: 916 / 1717;
          max-height: calc(100vh - 80px);
          border-radius: 14px; overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,0.55);
          animation: agBannerSlideUp 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes agBannerSlideUp {
          from { transform: translateY(40px) scale(0.96); opacity: 0; }
          to   { transform: translateY(0) scale(1); opacity: 1; }
        }
        .ag-banner-wrapper img { width: 100%; height: 100%; object-fit: cover; display: block; cursor: pointer; }
        .ag-banner-close {
          position: absolute; top: 10px; right: 10px;
          width: 32px; height: 32px; border: none; background: transparent;
          color: #fff; font-size: 22px; line-height: 1;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 10; transition: opacity 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .ag-banner-close:hover { opacity: 0.7; }

        /* PAGE */
        .ag-page {
         --green:      #1a56db;
         --green-dk:   #1e429f;
         --green-lt:   #eff6ff;
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
          background: #f5faf6;
          min-height: 100vh;
          padding-bottom: 80px;
          overflow-x: hidden;
        }

        /* HERO */
        .ag-hero {
          background: linear-gradient(155deg, #1e3a8a 0%, #1a56db 60%, #2563eb 100%);
          padding: 0px 16px 80px; text-align: center; position: relative; overflow: hidden;
        }
        .ag-hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at 15% 60%, rgba(255,255,255,0.08) 0%, transparent 45%),
                      radial-gradient(circle at 85% 20%, rgba(255,255,255,0.05) 0%, transparent 40%);
          pointer-events: none;
        }
        .ag-hero-inner { position: relative; z-index: 1; max-width: 680px; margin: 0 auto; }
        .ag-hero h1 {
          font-family: inherit; font-size: clamp(1.5rem, 5vw, 2.2rem);
          font-weight: 800; color: #fff; margin-bottom: 12px; margin-top: 22px;
          line-height: 1.2; letter-spacing: -0.5px;
        }
        .ag-hero-desc {
          font-size: clamp(0.9rem, 2.5vw, 1rem); color: rgba(255,255,255,0.82);
          line-height: 1.75; margin: 0 auto 20px; max-width: 560px;
        }
        .ag-hero-pills { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
        .ag-hero-pill {
          background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.22);
          border-radius: 999px; padding: 5px 14px; font-size: 0.76rem; font-weight: 600; color: #fff;
        }

        /* STAT STRIP */
        .ag-stat-strip {
          display: grid; grid-template-columns: repeat(4, 1fr);
          background: var(--surface); border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md); overflow: hidden; margin-top: -36px; position: relative; z-index: 2;
        }
        @media (max-width: 600px) { .ag-stat-strip { grid-template-columns: repeat(2, 1fr); } }
        .ag-stat { text-align: center; padding: 18px 10px; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .ag-stat:nth-child(4n) { border-right: none; }
        @media (max-width: 600px) {
          .ag-stat:nth-child(2n) { border-right: none; }
          .ag-stat:nth-child(3), .ag-stat:nth-child(4) { border-bottom: none; }
        }
        .ag-stat-val { font-family: inherit; font-size: clamp(1.1rem,3vw,1.4rem); font-weight: 800; color: var(--green); line-height: 1; margin-bottom: 4px; }
        .ag-stat-label { font-size: clamp(0.66rem,1.5vw,0.75rem); color: var(--muted); font-weight: 600; }

        /* LAYOUT */
        .ag-sep { height: 1px; background: var(--border); margin: 32px 0 0; }
        .ag-section { padding-top: 28px; }
        .ag-section-label { display: block; font-size: 0.68rem; font-weight: 800; letter-spacing: 1.6px; text-transform: uppercase; color: var(--green); font-family: inherit; margin-bottom: 5px; }
        .ag-section-title { font-family: inherit; font-size: clamp(1.05rem,3.5vw,1.35rem); font-weight: 800; color: var(--text); margin-bottom: 5px; letter-spacing: -0.3px; line-height: 1.3; }
        .ag-section-sub { font-size: 0.88rem; color: var(--muted); line-height: 1.65; margin-bottom: 0; }

        /* CARD */
        .ag-card { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-xs); }
        .ag-card-header { display: flex; align-items: center; gap: 10px; padding: 13px 18px; border-bottom: 1px solid var(--border); background: var(--surface-2); }
        .ag-card-icon { width: 30px; height: 30px; border-radius: 8px; background: var(--green-lt); display: flex; align-items: center; justify-content: center; font-size: 0.95rem; flex-shrink: 0; }
        .ag-card-title { font-family: "Sora", sans-serif; font-size: 0.88rem; font-weight: 800; color: var(--text); margin: 0; }
        .ag-card-body { padding: 18px; }

        /* HIGHLIGHTS TABLE */
        .ag-highlights-table { width: 100%; border-collapse: collapse; }
        .ag-highlights-table tr { border-bottom: 1px solid var(--border); }
        .ag-highlights-table tr:last-child { border-bottom: none; }
        .ag-highlights-table td { padding: 10px 16px; font-size: 0.85rem; line-height: 1.5; vertical-align: top; }
        .ag-highlights-table td:first-child { font-weight: 700; color: var(--text-2); width: 42%; }
        .ag-highlights-table td:last-child { color: var(--text); }
        @media (max-width: 400px) { .ag-highlights-table td { padding: 9px 12px; font-size: 0.81rem; } }

        /* COURSES */
        .ag-course-card { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); padding: 15px 16px; margin-bottom: 10px; }
        .ag-course-card:last-child { margin-bottom: 0; }
        .ag-course-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; margin-bottom: 8px; flex-wrap: wrap; }
        .ag-course-name { font-family: "Sora", sans-serif; font-size: 0.86rem; font-weight: 800; color: var(--text); }
        .ag-course-group-badge { font-size: 0.7rem; font-weight: 800; font-family: "Sora", sans-serif; background: var(--green-lt); color: var(--green); border-radius: 999px; padding: 3px 11px; white-space: nowrap; flex-shrink: 0; }
        .ag-course-row { font-size: 0.79rem; color: var(--text-2); line-height: 1.6; margin-bottom: 4px; }
        .ag-course-row:last-child { margin-bottom: 0; }
        .ag-course-row strong { color: var(--text); }

        /* SUBJECT GROUPS */
        .ag-group-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        @media (max-width: 720px) { .ag-group-grid { grid-template-columns: 1fr; } }
        .ag-group-card { border-radius: var(--radius-md); padding: 16px; border: 1.5px solid; }
        .ag-group-badge { display: inline-block; font-family: "Sora", sans-serif; font-size: 0.95rem; font-weight: 800; border-radius: 8px; padding: 4px 12px; margin-bottom: 8px; color: #fff; }
        .ag-group-full { font-size: 0.79rem; color: var(--text-2); margin-bottom: 8px; line-height: 1.5; }
        .ag-group-q { font-size: 0.78rem; font-weight: 700; color: var(--text); margin-bottom: 8px; }
        .ag-group-for { font-size: 0.74rem; color: var(--muted); line-height: 1.55; border-top: 1px solid var(--border); padding-top: 8px; }

        /* ELIGIBILITY */
        .ag-elig-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        @media (max-width: 520px) { .ag-elig-grid { grid-template-columns: 1fr; } }
        .ag-elig-card { background: var(--surface-2); border: 1.5px solid var(--border); border-radius: var(--radius-md); padding: 14px 16px; display: flex; gap: 11px; align-items: flex-start; }
        .ag-elig-icon { font-size: 1.1rem; flex-shrink: 0; width: 34px; height: 34px; background: var(--surface); border-radius: 9px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); }
        .ag-elig-title { font-family: "Sora", sans-serif; font-size: 0.83rem; font-weight: 700; color: var(--text); margin-bottom: 4px; }
        .ag-elig-desc { font-size: 0.8rem; color: var(--muted); line-height: 1.6; margin: 0; }

        /* FEE TABLE */
        .ag-fee-table { width: 100%; border-collapse: collapse; }
        .ag-fee-table th { background: var(--green); color: #fff; padding: 10px 14px; font-family: "Sora", sans-serif; font-size: 0.78rem; font-weight: 700; text-align: left; }
        .ag-fee-table td { padding: 10px 14px; font-size: 0.83rem; border-bottom: 1px solid var(--border); color: var(--text-2); }
        .ag-fee-table tr:last-child td { border-bottom: none; }
        .ag-fee-table tr:nth-child(even) td { background: var(--surface-2); }
        .ag-fee-val { font-weight: 800; font-family: "Sora", sans-serif; color: var(--green); }

        /* DATES */
        .ag-dates-list { display: flex; flex-direction: column; gap: 7px; }
        .ag-date-item { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 11px 16px; background: var(--surface-2); border: 1.5px solid var(--border); border-radius: var(--radius-sm); }
        .ag-date-item--highlight { border-color: rgba(22,101,52,0.3); background: #f0fdf4; }
        .ag-date-event { font-size: 0.84rem; font-weight: 600; color: var(--text-2); flex: 1; min-width: 0; }
        .ag-date-val { font-size: 0.78rem; font-weight: 700; font-family: "Sora", sans-serif; color: var(--green); background: var(--green-lt); border-radius: 999px; padding: 3px 11px; white-space: nowrap; flex-shrink: 0; }
        @media (max-width: 480px) { .ag-date-item { flex-wrap: wrap; gap: 6px; } .ag-date-event { font-size: 0.81rem; } }

        /* STEPS */
        .ag-steps-list { display: flex; flex-direction: column; gap: 12px; }
        .ag-step-card { display: flex; gap: 14px; align-items: flex-start; background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); padding: 16px; }
        .ag-step-num { width: 36px; height: 36px; border-radius: 50%; background: var(--green); color: #fff; font-family: "Sora", sans-serif; font-size: 0.8rem; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .ag-step-title { font-family: "Sora", sans-serif; font-size: 0.88rem; font-weight: 700; color: var(--text); margin-bottom: 5px; }
        .ag-step-desc { font-size: 0.82rem; color: var(--muted); line-height: 1.65; margin: 0; }

        /* DOCUMENTS */
        .ag-docs-list { display: flex; flex-direction: column; gap: 7px; }
        .ag-doc-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 14px; background: var(--surface-2); border: 1.5px solid var(--border); border-radius: var(--radius-sm); font-size: 0.83rem; color: var(--text-2); line-height: 1.55; }
        .ag-doc-icon { flex-shrink: 0; font-size: 0.9rem; margin-top: 1px; }

        /* INFO ALERT */
        .ag-info-alert { display: flex; align-items: flex-start; gap: 10px; background: #fffbeb; border: 1.5px solid #fde68a; border-radius: var(--radius-sm); padding: 12px 14px; font-size: 0.82rem; color: #92400e; line-height: 1.6; margin-top: 10px; }
        .ag-info-alert-icon { flex-shrink: 0; font-size: 1rem; }
        .ag-info-alert--danger { background: #fef2f2; border-color: #fecaca; color: #991b1b; }

        /* PYQ FEATURE */
        .ag-pyq-feature { background: linear-gradient(140deg, #1e3a8a 0%, #1a56db 55%, #2563eb 100%); padding: 28px 24px 26px; position: relative; overflow: hidden; }
        .ag-pyq-feature::before { content: ''; position: absolute; top: -60px; right: -60px; width: 220px; height: 220px; border-radius: 50%; background: rgba(255,255,255,0.07); pointer-events: none; }
        .ag-pyq-feature::after  { content: ''; position: absolute; bottom: -80px; left: -20px; width: 240px; height: 240px; border-radius: 50%; background: rgba(255,255,255,0.04); pointer-events: none; }
        .ag-pyq-feature-inner { position: relative; z-index: 1; }
        .ag-pyq-tag { display: flex; align-items: center; justify-content: center; gap: 6px; width: fit-content; margin: 0 auto 16px auto; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.28); border-radius: 999px; padding: 5px 14px; font-size: 0.75rem; font-weight: 700; color: #fff; font-family: "Sora", sans-serif; }
        .ag-pyq-tag-dot { width: 7px; height: 7px; border-radius: 50%; background: #34d399; flex-shrink: 0; }
        .ag-pyq-feature h3 { font-family: "Sora", sans-serif; font-size: clamp(1.1rem, 3.5vw, 1.45rem); font-weight: 800; color: #fff; margin-bottom: 7px; line-height: 1.25; }
        .ag-pyq-feature-desc { font-size: 0.86rem; color: rgba(255,255,255,0.80); line-height: 1.65; margin-bottom: 22px; max-width: 540px; }

        /* PYQ TABLE */
        .ag-pyq-table-wrap { border-radius: 12px; overflow: hidden; border: 1px solid #bfdbfe; }
        .ag-pyq-table { width: 100%; border-collapse: collapse; min-width: 340px; }
        .ag-pyq-table th { background: #0d6efd; color: #fff; padding: 11px 16px; font-family: "Sora", sans-serif; font-size: 0.82rem; font-weight: 700; text-align: center; white-space: nowrap; }
        .ag-pyq-table th:first-child { text-align: left; }
        .ag-pyq-table td { background: #f9fbff; border: 1px solid #dce8ff; padding: 11px 16px; font-size: 0.86rem; text-align: center; color: #374151; vertical-align: middle; }
        .ag-pyq-table tr:nth-child(even) td { background: #f0f6ff; }
        .ag-pyq-table tr:last-child td { border-bottom: none; }
        .ag-pyq-table td:first-child { text-align: left; font-weight: 700; }

        /* DOWNLOAD BUTTON */
        .ag-dl-btn { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 5px; background: linear-gradient(90deg, #0d6efd, #6610f2); color: #fff; border: none; border-radius: 8px; padding: 9px 18px; font-size: 0.82rem; font-weight: 700; font-family: "Sora", sans-serif; cursor: pointer; overflow: hidden; z-index: 1; white-space: nowrap; text-decoration: none; }
        .ag-dl-btn::before { content: ""; position: absolute; inset: -2px; border-radius: 10px; background: linear-gradient(120deg, transparent, #00eaff, #6610f2, #00eaff, transparent); background-size: 300% 300%; animation: agDlGlow 2.5s linear infinite; z-index: -1; }
        .ag-dl-btn::after { content: ""; position: absolute; inset: 2px; border-radius: 6px; background: linear-gradient(90deg, #0d6efd, #6610f2); z-index: -1; }
        .ag-dl-btn:hover { opacity: 0.9; color: #fff; }
        .ag-dl-btn:disabled { background: linear-gradient(90deg, #94a3b8, #64748b); cursor: not-allowed; opacity: 0.7; }
        .ag-dl-btn:disabled::before { animation: none; background: none; }
        .ag-dl-btn:disabled::after { background: linear-gradient(90deg, #94a3b8, #64748b); }
        @media (max-width: 480px) { .ag-pyq-table th, .ag-pyq-table td { padding: 9px 10px; font-size: 0.78rem; } .ag-pyq-table th:nth-child(3), .ag-pyq-table td:nth-child(3) { display: none; } .ag-dl-btn { font-size: 0.84rem; padding: 8px 16px; } }

        /* PRACTICE BANNER */
        .ag-practice-banner { position: relative; border-radius: var(--radius-lg); overflow: hidden; background: linear-gradient(140deg, #1e3a8a 0%, #1d4ed8 45%, #2563eb 100%); padding: 28px 24px 26px; }
        .ag-practice-banner::before { content: ''; position: absolute; top: -50px; right: -50px; width: 220px; height: 220px; border-radius: 50%; background: rgba(255,255,255,0.06); pointer-events: none; }
        .ag-practice-banner::after  { content: ''; position: absolute; bottom: -70px; left: -10px; width: 200px; height: 200px; border-radius: 50%; background: rgba(255,255,255,0.04); pointer-events: none; }
        .ag-practice-inner { position: relative; z-index: 1; }
        .ag-practice-banner h3 { font-family: "Sora", sans-serif; font-size: clamp(1.1rem, 3.5vw, 1.45rem); font-weight: 800; color: #fff; margin-bottom: 7px; line-height: 1.25; }
        .ag-practice-desc { font-size: 0.86rem; color: rgba(255,255,255,0.80); line-height: 1.65; margin-bottom: 20px; max-width: 540px; }
        .ag-practice-feats { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 22px; }
        .ag-practice-feat { display: flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; padding: 5px 12px; font-size: 0.77rem; font-weight: 600; color: rgba(255,255,255,0.92); }
        .ag-pf-dot { width: 6px; height: 6px; border-radius: 50%; background: #34d399; flex-shrink: 0; }
        .ag-practice-btns { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }

        /* ANIMATED BUTTON */
        .ag-start-btn-wrap { display: inline-flex; padding: 2.5px; border-radius: calc(var(--radius-sm) + 2.5px); background: linear-gradient(270deg, #60a5fa, #a78bfa, #34d399, #fbbf24, #f472b6, #60a5fa); background-size: 400% 400%; animation: btnBorderSpin 3s ease infinite; text-decoration: none; transition: transform 0.18s, box-shadow 0.18s; }
        .ag-start-btn-wrap:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.28); }
        .ag-practice-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: #fff; color: #1e3a8a; border-radius: var(--radius-sm); padding: 12px 22px; font-size: 0.9rem; font-weight: 800; font-family: "Sora", sans-serif; text-decoration: none; transition: background 0.18s, color 0.18s; }
        .ag-start-btn-wrap:hover .ag-practice-btn-primary { background: #eff6ff; color: #1e293b; }
        .ag-practice-btn-secondary { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.14); border: 1.5px solid rgba(255,255,255,0.3); border-radius: var(--radius-sm); padding: 12px 20px; font-size: 0.88rem; font-weight: 700; font-family: "Sora", sans-serif; color: #fff; text-decoration: none; transition: background 0.18s; }
        .ag-practice-btn-secondary:hover { background: rgba(255,255,255,0.22); color: #fff; }

        /* TIPS */
        .ag-tips-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 9px; }
        @media (max-width: 480px) { .ag-tips-grid { grid-template-columns: 1fr; } }
        .ag-tip-card { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-sm); padding: 13px 15px; display: flex; align-items: flex-start; gap: 10px; font-size: 0.83rem; color: var(--text-2); line-height: 1.55; }
        .ag-tip-icon { font-size: 1rem; flex-shrink: 0; margin-top: 1px; }

        /* FAQ */
        .ag-faq-item { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); margin-bottom: 7px; overflow: hidden; }
        .ag-faq-item--open { border-color: rgba(22,101,52,0.3); }
        .ag-faq-btn { width: 100%; border: none; background: transparent; text-align: left; display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 14px 18px; cursor: pointer; min-height: 50px; -webkit-tap-highlight-color: transparent; }
        .ag-faq-q { font-family: "Sora", sans-serif; font-size: clamp(0.8rem,2vw,0.88rem); font-weight: 700; color: var(--text); line-height: 1.4; }
        .ag-faq-chevron { flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%; background: var(--surface-2); color: var(--muted); font-size: 0.65rem; display: flex; align-items: center; justify-content: center; transition: transform 0.25s, background 0.2s, color 0.2s; }
        .ag-faq-item--open .ag-faq-chevron { transform: rotate(180deg); background: var(--green); color: #fff; }
        .ag-faq-ans { padding: 0 18px 14px; font-size: 0.84rem; color: var(--muted); line-height: 1.72; }
        @media (max-width: 400px) { .ag-faq-btn { padding: 12px 14px; } .ag-faq-ans { padding: 0 14px 12px; } }

        /* OFFICIAL STRIP */
        .ag-official-strip { background: linear-gradient(135deg, var(--green) 0%, var(--green-dk) 100%); border-radius: var(--radius-md); padding: 18px 20px; color: #fff; display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; box-shadow: 0 6px 20px rgba(22,101,52,0.22); }
        .ag-official-text h3 { font-family: "Sora", sans-serif; font-size: 0.9rem; font-weight: 800; margin-bottom: 3px; }
        .ag-official-text p { font-size: 0.8rem; color: rgba(255,255,255,0.75); margin: 0; }
        .ag-official-link { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); border-radius: var(--radius-sm); padding: 9px 18px; color: #fff; font-weight: 700; font-size: 0.82rem; text-decoration: none; font-family: "Sora", sans-serif; transition: background 0.18s; white-space: nowrap; }
        .ag-official-link:hover { background: rgba(255,255,255,0.25); color: #fff; }

        /* RELATED */
        .ag-related-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 9px; margin-top: 14px; }
        @media (max-width: 480px) { .ag-related-grid { grid-template-columns: 1fr; } }
        .ag-related-link { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-md); padding: 13px 15px; text-decoration: none; color: var(--text-2); font-size: 0.83rem; font-weight: 600; display: flex; align-items: center; justify-content: space-between; gap: 8px; transition: border-color 0.18s, color 0.18s; font-family: "Sora", sans-serif; }
        .ag-related-link:hover { border-color: rgba(22,101,52,0.3); color: var(--green); }
        .ag-disclaimer { text-align: center; font-size: 0.73rem; color: var(--muted); margin-top: 18px; line-height: 1.65; padding: 0 8px; }

        /* RESPONSIVE */
        @media (max-width: 480px) { .ag-pyq-table-wrap { margin: 0 -16px; } .ag-hero { padding: 0px 14px 68px; } .ag-hero h1 { margin-top: 36px; } .ag-card-body { padding: 14px; } .ag-section { padding-top: 22px; } .ag-official-link { width: 100%; justify-content: center; } }
        @media (max-width: 400px) { .ag-dl-btn { font-size: 0.84rem; padding: 8px 16px; } .ag-pyq-table-wrap { margin: 0 -12px; } .ag-hero h1 { font-size: 1.32rem; margin-top: 36px; } .ag-section-title { font-size: 1rem; } }
        @media (max-width: 540px) { .ag-practice-btns { justify-content: center; align-items: center; } .ag-start-btn-wrap, .ag-practice-btn-secondary { margin-left: auto; margin-right: auto; } }
      ` }} />

      {/* BANNER */}
      {showBanner && (
        <div className="ag-banner-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowBanner(false); }}>
          <div className="ag-banner-wrapper">
            <Image width={916} height={1717}
              src="/bannerAgriculture.png"
              alt="Jharkhand Agriculture 2026 Full Test Series – Join on Futurely"
              draggable={false} loading="lazy" onClick={() => { setShowBanner(false); router.push("/test-series"); }}
            />
            <button className="ag-banner-close" onClick={() => setShowBanner(false)} aria-label="Close advertisement">✕</button>
          </div>
        </div>
      )}

      <main className="ag-page">
        {/* HERO */}
        <div className="ag-hero">
          <div className="ag-hero-inner">
            <h1>Jharkhand Agriculture Entrance Exam 2026<br />Official Guide + Free PYQ Papers</h1>
            <p className="ag-hero-desc">
              JCECEB Agriculture & Allied Courses 2026 — eligibility for B.V.Sc, B.Sc Agriculture, B.Tech Dairy
              Technology & more, PCM/PCB/PCMB pattern, fee, dates, and free MCQs to practice online.
            </p>
            <div className="ag-hero-pills">
              <span className="ag-hero-pill">19 July 2026</span>
              <span className="ag-hero-pill">PCM / PCB / PCMB</span>
              <span className="ag-hero-pill">7 Degree Courses</span>
            </div>
          </div>
        </div>

        <Container style={{ maxWidth: 980, margin: "0 auto", padding: "0 14px" }}>
          {/* STAT STRIP */}
          <div className="ag-stat-strip">
            {[
              { val: "150/200", label: "Total Questions" },
              { val: "3", label: "Subject Groups" },
              { val: "19 Jul", label: "Exam Date 2026" },
              { val: "7", label: "Degree Courses" },
            ].map((s, i) => (
              <div className="ag-stat" key={i}>
                <div className="ag-stat-val">{s.val}</div>
                <div className="ag-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* AD — after stat strip */}
          <div style={{ margin: "20px 0", minHeight: 0 }}>
            <AdBanner slot="2434542863" />
          </div>

          {/* 1. HIGHLIGHTS */}
          <div className="ag-section" id="exam-info">
            <SectionHead
              label="About the Exam"
              title="Exam Highlights"
              sub="JCECE (Agriculture & Other Allied Courses) 2026 is a state-level exam conducted by JCECEB for admission to 1st year/semester degree-level Agriculture, Veterinary, Forestry, Dairy Technology, Fisheries Science and Horticulture courses across Jharkhand."
            />
            <div className="ag-card">
              <div className="ag-card-header"><div className="ag-card-icon">📋</div><h3 className="ag-card-title">At a Glance — Official 2026 Notification</h3></div>
              <div className="ag-card-body" style={{ padding: 0 }}>
                <table className="ag-highlights-table">
                  <tbody>{highlights.map((h, i) => <tr key={i}><td>{h.label}</td><td>{h.value}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
          </div>
          <Sep />

          {/* 2. COURSES */}
          <div className="ag-section" id="courses">
            <SectionHead label="What You Can Study" title="Courses & Course-wise Eligibility (Official)" sub="Each course has its own Subject Group requirement, qualification criteria and age limit — check carefully before applying." />
            {courses.map((c, i) => (
              <div className="ag-course-card" key={i}>
                <div className="ag-course-top">
                  <span className="ag-course-name">{c.name}</span>
                  <span className="ag-course-group-badge">{c.group}</span>
                </div>
                <p className="ag-course-row"><strong>Qualification:</strong> {c.qualification}</p>
                <p className="ag-course-row"><strong>Age Limit:</strong> {c.age}</p>
              </div>
            ))}
          </div>
          <Sep />

          {/* 3. SUBJECT GROUPS */}
          <div className="ag-section" id="pattern">
            <SectionHead label="Exam Pattern" title="Subject Groups: PCM / PCB / PCMB" sub="Your Subject Group determines which questions you'll be asked. PCM/PCB groups carry 150 questions; the PCMB group (covering both PCM and PCB courses) carries 200 questions." />
            <div className="ag-group-grid">
              {subjectGroups.map((g, i) => (
                <div className="ag-group-card" key={i} style={{ background: g.bg, borderColor: g.border }}>
                  <span className="ag-group-badge" style={{ background: g.color }}>{g.group}</span>
                  <p className="ag-group-full">{g.full}</p>
                  <p className="ag-group-q">📝 {g.questions} questions</p>
                  <p className="ag-group-for"><strong>Courses:</strong> {g.forCourses}</p>
                </div>
              ))}
            </div>
            <div className="ag-info-alert">
              <span className="ag-info-alert-icon">⚠️</span>
              <span><strong>Important:</strong> The official notification states that detailed Pattern & Scoring information is provided separately in the Information Bulletin (available under the "Download" section of jceceb.jharkhand.gov.in). Marking scheme (including whether there is negative marking) should be confirmed from that bulletin or your admit card before the exam.</span>
            </div>
          </div>
          <Sep />

          {/* 4. ELIGIBILITY SUMMARY */}
          <div className="ag-section" id="eligibility">
            <SectionHead label="Who Can Apply" title="General Eligibility Conditions" sub="Applicable across all courses, in addition to the course-specific criteria listed above." />
            <div className="ag-elig-grid">
              <div className="ag-elig-card">
                <div className="ag-elig-icon">🇮🇳</div>
                <div><p className="ag-elig-title">Indian Citizen & Jharkhand Resident</p><p className="ag-elig-desc">Candidate must be a citizen of India and a Local/Permanent Resident of Jharkhand State, as per the residential certificate norms of the state government.</p></div>
              </div>
              <div className="ag-elig-card">
                <div className="ag-elig-icon">🚻</div>
                <div><p className="ag-elig-title">Both Genders Eligible</p><p className="ag-elig-desc">All courses under this exam are open to both male and female candidates, subject to the respective eligibility conditions.</p></div>
              </div>
              <div className="ag-elig-card">
                <div className="ag-elig-icon">⏳</div>
                <div><p className="ag-elig-title">5-Year Age Relaxation</p><p className="ag-elig-desc">SC/ST/OBC candidates get a 5-year relaxation on the maximum age limit prescribed for their respective course.</p></div>
              </div>
              <div className="ag-elig-card">
                <div className="ag-elig-icon">📑</div>
                <div><p className="ag-elig-title">Group Must Match Course</p><p className="ag-elig-desc">Applicants must verify their educational qualification and age against their opted Subject Group (PCM/PCB/PCMB) before applying online.</p></div>
              </div>
            </div>
          </div>
          <Sep />
          <div className="bt-scard" style={{ padding: "8px", minHeight: 0 }}>
            <AdBanner slot="8679502538" format="auto" />
          </div>

          {/* 5. FEE */}
          <div className="ag-section" id="fee">
            <SectionHead label="Fees" title="Application-cum-Examination Fee 2026 (Official)" sub="Fee depends on both your category and your opted Subject Group. Paid online and non-refundable." />
            <div className="ag-card">
              <div className="ag-card-body" style={{ padding: 0 }}>
                <table className="ag-fee-table">
                  <thead><tr><th>Category</th><th>Group</th><th style={{ textAlign: "center" }}>Fee</th></tr></thead>
                  <tbody>{applicationFee.map((f, i) => <tr key={i}><td>{f.category}</td><td>{f.group}</td><td style={{ textAlign: "center" }} className="ag-fee-val">{f.fee}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
          </div>
          <Sep />

          {/* 6. DATES */}
          <div className="ag-section" id="dates">
            <SectionHead
              label="Schedule"
              title="Important Dates 2026 (Official)"
              sub="As notified in Advt. No. JCECEB/06/26-23, dated 16 June 2026."
            />
            <div className="ag-dates-list">
              {importantDates.map((d, i) => (
                <div className={`ag-date-item${d.highlight ? " ag-date-item--highlight" : ""}`} key={i}>
                  <span className="ag-date-event">{d.event}</span>
                  <span className="ag-date-val">{d.date}</span>
                </div>
              ))}
            </div>
          </div>
          <Sep />

          {/* 7. HOW TO APPLY */}
          <div className="ag-section" id="apply">
            <SectionHead
              label="Application Process"
              title="How to Apply Online — Step by Step"
              sub="Official online application process as per the JCECEB Agriculture 2026 notification."
            />
            <div className="ag-steps-list">
              {onlineApplicationSteps.map((s, i) => (
                <div className="ag-step-card" key={i}>
                  <div className="ag-step-num">{i + 1}</div>
                  <div>
                    <p className="ag-step-title">{s.icon} {s.title}</p>
                    <p className="ag-step-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="ag-info-alert ag-info-alert--danger">
              <span className="ag-info-alert-icon">🚨</span>
              <span><strong>Serious Warning:</strong> All caste, residential, disability and EWS certificates will undergo detailed verification. If a candidate applies under a category for which they are not eligible, or submits a forged document, criminal action will be taken against them.</span>
            </div>
          </div>
          <Sep />

          <div className="bt-scard" style={{ padding: "8px", minHeight: 0 }}>
            <AdBanner slot="3636692323" format="auto" />
          </div>

          {/* 8. DOCUMENTS */}
          <div className="ag-section" id="documents">
            <SectionHead
              label="Documents"
              title="Documents Typically Required"
              sub="Based on standard JCECEB verification requirements. Refer to the Information Bulletin for the exact list applicable to this exam."
            />
            <div className="ag-docs-list">
              {documentsRequired.map((doc, i) => (
                <div className="ag-doc-item" key={i}>
                  <span className="ag-doc-icon">📄</span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>
          <Sep />

          {/* 9. RESERVATION */}
          <div className="ag-section" id="reservation">
            <SectionHead label="Reservation & Other Info" title="Reservation Policy & Important Notes" />
            <div className="ag-card">
              <div className="ag-card-body">
                <p style={{ fontSize: "0.84rem", color: "var(--text-2)", lineHeight: 1.7, margin: 0 }}>{reservationNote}</p>
              </div>
            </div>
            <div className="ag-info-alert" style={{ marginTop: 12 }}>
              <span className="ag-info-alert-icon">📞</span>
              <span><strong>Helpline:</strong> For any assistance/query regarding this exam, contact 9264473891 / 9264473893 during office hours on any working day, or email jceceboard@gmail.com.</span>
            </div>
          </div>
          <Sep />

          {/* AD — before PYQ */}
          <div style={{ margin: "20px 0", minHeight: 0 }}>
            <AdBanner slot="6242297060" format="fluid" layout="in-article" />
          </div>

          {/* 10. PYQ */}
          <div className="ag-section" id="pyq">
            <SectionHead label="Previous Year Papers" title="Jharkhand Agriculture Entrance PYQ Papers (2021–2026)" />
            <div className="ag-pyq-feature">
              <div className="ag-pyq-feature-inner">
                <span className="ag-pyq-tag"><span className="ag-pyq-tag-dot" />📄 Download Question Paper PDF — Free</span>
                <h3>Official PYQ Papers — JCECE Agriculture & Allied Courses</h3>
                <p className="ag-pyq-feature-desc">
                  पुराने papers से questions repeat होते हैं। जैसे ही official papers उपलब्ध होंगे,
                  PCM, PCB और PCMB — सभी groups के papers यहाँ free download के लिए मिलेंगे।
                </p>
                <div className="ag-pyq-table-wrap">
                  <table className="ag-pyq-table">
                    <thead><tr><th>Year</th><th>Paper Name</th><th>Groups</th><th>Download &amp; Preview</th></tr></thead>
                    <tbody>
                      {pyqPapers.map((p, i) => (
                        <tr key={i}>
                          <td><strong style={{ color: "#0d6efd", fontFamily: "Sora, sans-serif", fontSize: "1rem" }}>{p.year}</strong></td>
                          <td>
                            <Link
                              href={`/resources/jharkhand-agriculture/pdf?year=${p.year}&subject=JCECE%20Agriculture%20Question%20Paper`}
                              style={{ color: "#0f172a", fontWeight: 600, textDecoration: "none" }}
                              className="hover:text-blue-600 transition-colors"
                            >
                              JCECE Agriculture {p.year}
                            </Link>
                          </td>
                          <td style={{ color: "#64748b", fontSize: "0.78rem" }}>PCM · PCB · PCMB</td>
                          <td>
                            {p.driveUrl ? (
                              <Link
                                href={`/resources/jharkhand-agriculture/pdf?year=${p.year}&subject=JCECE%20Agriculture%20Question%20Paper`}
                                className="ag-dl-btn"
                                aria-label={`Read and Download Jharkhand Agriculture ${p.year} Question Paper PDF`}
                              >
                                📥 Download PDF
                              </Link>
                            ) : (
                              <button className="ag-dl-btn" disabled>⏳ Coming Soon</button>
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
          <div className="ag-section" id="practice">
            <SectionHead label="Online Mock Test" title="Practice Agriculture Entrance Online — Free MCQs" />
            <div className="ag-practice-banner">
              <div className="ag-practice-inner">
                <h3>Practice Jharkhand Agriculture Entrance Questions Online</h3>
                <p className="ag-practice-desc">
                  Futurely पर JCECE Agriculture MCQs online attempt करो — timer के साथ, instant score के साथ,
                  और detailed solution के साथ। अपने Subject Group (PCM/PCB/PCMB) के हिसाब से practice करो।
                </p>
                <div className="ag-practice-feats">
                  {["Group-wise Practice", "Instant Solutions", "Score Tracking", "Free Forever"].map((feat, i) => (
                    <div className="ag-practice-feat" key={i}><div className="ag-pf-dot" />{feat}</div>
                  ))}
                </div>
                <div className="ag-practice-btns">
                  <Link href="/resources/jharkhand-agriculture/exam-information" className="ag-start-btn-wrap">
                    <span className="ag-practice-btn-primary">🚀 Start Preparation Now — Free</span>
                  </Link>
                  <Link href="/resources/jharkhand-agriculture/exam-information" className="ag-practice-btn-secondary">📝 Full Exam Details</Link>
                </div>
              </div>
            </div>
          </div>
          <Sep />



          {/* 12. TIPS */}
          <div className="ag-section" id="preparation">
            <SectionHead label="Strategy" title="How to Prepare for JCECE Agriculture 2026" sub="Practical tips based on the official exam structure." />
            <div className="ag-tips-grid" style={{ marginBottom: 20 }}>
              {preparationTips.map((t, i) => (
                <div className="ag-tip-card" key={i}><span className="ag-tip-icon">{t.icon}</span><span>{t.tip}</span></div>
              ))}
            </div>

            <p className="ag-section-label" style={{ marginBottom: 12 }}>Recommended Books</p>
            <div className="ag-card">
              <div className="ag-card-body">
                {[
                  { subject: "Physics", books: "NCERT Class 11 & 12 Physics, D.C. Pandey Objective Physics" },
                  { subject: "Chemistry", books: "NCERT Class 11 & 12 Chemistry, MTG Objective NCERT at your Fingertips" },
                  { subject: "Mathematics", books: "NCERT Class 11 & 12 Mathematics, R.D. Sharma / RS Aggarwal" },
                  { subject: "Biology", books: "NCERT Class 11 & 12 Biology, Trueman's Elementary Biology Vol 1 & 2" },
                ].map((b, i, arr) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", paddingBottom: i < arr.length - 1 ? 14 : 0, marginBottom: i < arr.length - 1 ? 14 : 0, borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <span style={{ fontFamily: "Sora, sans-serif", fontSize: "0.68rem", fontWeight: 800, background: "var(--green)", color: "#fff", borderRadius: 6, padding: "3px 8px", flexShrink: 0, marginTop: 2 }}>{b.subject}</span>
                    <p style={{ fontSize: "0.84rem", color: "var(--text-2)", margin: 0, lineHeight: 1.55 }}>{b.books}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Sep />

          {/* AD — before FAQ */}
          <div style={{ margin: "20px 0", minHeight: 0 }}>
            <AdBanner slot="6484121014" />
          </div>

          {/* 13. FAQ */}
          <div className="ag-section" id="faq">
            <SectionHead label="FAQ" title="Frequently Asked Questions" sub="Common doubts about JCECE (Agriculture & Other Allied Courses) 2026, answered from the official notification." />
            {faqs.map((faq, i) => (
              <div className={"ag-faq-item" + (openFaq === i ? " ag-faq-item--open" : "")} key={i}>
                <button className="ag-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                  <span className="ag-faq-q">{faq.q}</span>
                  <span className="ag-faq-chevron">▾</span>
                </button>
                {openFaq === i && <div className="ag-faq-ans">{faq.a}</div>}
              </div>
            ))}
          </div>
          <Sep />

          {/* OFFICIAL STRIP */}
          <div style={{ paddingTop: 24 }}>
            <div className="ag-official-strip">
              <div className="ag-official-text">
                <h3>Official Website – JCECEB Jharkhand</h3>
                <p>Apply online, download admit card, and check the Information Bulletin at the official portal.</p>
              </div>
              <a href="https://jceceb.jharkhand.gov.in" target="_blank" rel="noopener noreferrer" className="ag-official-link">
                🌐 jceceb.jharkhand.gov.in
              </a>
            </div>
          </div>

          {/* RELATED */}
          <div className="ag-related-grid">
            <Link href="/resources/jharkhand-nursing/gnm" className="ag-related-link"><span>🧬 Jharkhand GNM Guide</span><span>›</span></Link>
            <Link href="/resources/jharkhand-paramedical/exam-information" className="ag-related-link"><span>🩺 Jharkhand Paramedical Guide</span><span>›</span></Link>
            <Link href="/resources/jharkhand-nursing/bsc-nursing" className="ag-related-link"><span>🎓 Jharkhand B.Sc Nursing Guide</span><span>›</span></Link>
            <Link href="/resources/jharkhand-polytechnic/exam-information" className="ag-related-link"><span>🎯 Jharkhand Polytechnic Guide</span><span>›</span></Link>
          </div>

          <p className="ag-disclaimer">
            All information above is compiled from the official JCECEB Agriculture notification (Advt. No. JCECEB/06/26-23, dated 16 June 2026). Details on Pattern & Scoring, and Reservation
            are as per the separate Information Bulletin referenced in the notification. The Board reserves the right to change the exam date, mode, or centre — always verify the
            latest updates at{" "}
            <a href="https://jceceb.jharkhand.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "var(--green)" }}>
              jceceb.jharkhand.gov.in
            </a>.
            Futurely is not affiliated with JCECEB or the Government of Jharkhand.
          </p>
        </Container>
      </main>
    </>
  );
};

export default JHAgriculture;