"use client";

import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import {
  BIHAR_RESOURCES_HOME,
  getSavedExam,
  isBiharExam,
  normalizeExamId,
} from "../../utils/examData";
import {
  ChevronDown,
  BookOpen,
  GraduationCap,
  School,
  Compass,
  CheckCircle2,
  Folder,
  Smartphone,
  RefreshCw,
  Zap,
  Bell,
  Activity,
  HeartPulse,
  Sprout
} from "lucide-react";

// ── Bihar redirect ────────────────────────────────────────────
// Bihar aspirants get the dedicated /resources/bihar hub — the same pre-paint
// redirect as /exam-preparation → /bihar/exam-preparation (see ExamsClient):
// the decision lives in a client-only layout effect (runs before paint, never
// during SSR) and NOT in the first render, so hydration stays identical to the
// server HTML. While the redirect is in flight the page renders nothing, so a
// Bihar user never sees a frame of the Jharkhand listing.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Exam choice readable synchronously on the client: the lightweight exam
// preference (context/AuthContext keeps it in sync) and the cached profile.
const readLocalExam = () => {
  if (typeof window === "undefined") return "";
  try {
    const savedExam = normalizeExamId(window.localStorage.getItem("futurely_exam") || "");
    if (savedExam) return savedExam;
    const cachedUser = window.localStorage.getItem("user");
    return cachedUser ? normalizeExamId(JSON.parse(cachedUser)?.exam) : "";
  } catch {
    // Storage blocked (private mode / in-app webview) — the React-side check
    // still catches Bihar aspirants once the session loads.
    return "";
  }
};

/* ─────────────────────────────────────────────
   FAQ DATA
───────────────────────────────────────────── */
const faqData = [
  {
    question: "What study materials are available on Futurely for Jharkhand students?",
    answer: "Futurely provides Jharkhand Diploma Semester PYQs (1st to 6th Semester), Jharkhand B.Tech Semester PYQs (1st to 8th Semester), Jharkhand Polytechnic PYQ (2021–2025), Jharkhand D2D PYQ (2021–2025), Paramedical, Nursing, and Agriculture study materials. All materials are free, mobile-friendly, and regularly updated.",
  },
  {
    question: "Are the study materials on Futurely free to download?",
    answer: "Yes, all study materials on Futurely — including Previous Year Question Papers, semester PYQs, and exam guides — are 100% free to access and download. No subscription or payment is required.",
  },
  {
    question: "What B.Tech semester PYQs are available on Futurely?",
    answer: "Futurely covers all 8 semesters of Jharkhand B.Tech courses — from 1st Semester to 8th Semester — with Previous Year Question Papers organised by subject for easy access and preparation.",
  },
  {
    question: "How can I download Jharkhand Polytechnic PYQ papers?",
    answer: "Navigate to the 'Jharkhand Polytechnic PYQ' section on this page, click to expand it, and select 'Download All Papers (2021–2025)'. You will be taken to a dedicated page with all available question papers.",
  },
  {
    question: "What is the Jharkhand D2D exam and what papers are available?",
    answer: "Jharkhand D2D (Diploma to Degree) is a JCECEB lateral-entry exam for diploma holders seeking direct B.Tech 2nd-year admission. Futurely provides solved D2D PYQs from 2021 to 2025 covering Physics, Chemistry, and Mathematics.",
  },
  {
    question: "Which semesters of Jharkhand Diploma PYQ are available?",
    answer: "Futurely covers all 6 semesters of the Jharkhand Diploma course — from 1st Semester to 6th Semester — with Previous Year Question Papers organised by subject for easy access.",
  },
  {
    question: "How often is the content updated on Futurely?",
    answer: "Futurely regularly adds new exam papers, updated solutions, and exam-related information as soon as official results or new papers are released by JCECEB and other state boards.",
  },
];

/* ─────────────────────────────────────────────
   ACCORDION DATA
───────────────────────────────────────────── */
const data = [
  {
    key: "jharkhand-diploma",
    title: "Jharkhand Diploma Semester PYQ",
    icon: BookOpen,
    color: "linear-gradient(135deg, #0d6efd, #6ea8fe)",
    badge: "1st – 6th Sem",
    desc: "Previous year question papers for all 6 semesters of Jharkhand Diploma courses.",
    subs: [
      { id: "semester-1", title: "1st Semester" },
      { id: "semester-2", title: "2nd Semester" },
      { id: "semester-3-ece", title: "3rd Semester — ECE" },
      { id: "semester-3-eee", title: "3rd Semester — EE/EEE" },
      { id: "semester-3-cse", title: "3rd Semester — CSE" },
      { id: "semester-3-mech", title: "3rd Semester — Mechanical" },
      { id: "semester-3-civil", title: "3rd Semester — CIVIL" },
      { id: "semester-3-meta", title: "3rd Semester — Metallurg" },
      { id: "semester-4-cse", title: "4th Semester-CSE" },
      { id: "semester-4-mech", title: "4th Semester-Mechanical" },
      { id: "semester-4-eee", title: "4th Semester — EE/EEE" },
      { id: "semester-4-ece", title: "4th Semester — ECE" },
      { id: "semester-4-civil", title: "4th Semester — CIVIL" },
      { id: "semester-5", title: "5th Semester" },
      { id: "semester-6", title: "6th Semester" },
    ],
  },
  {
    key: "jharkhand-btech",
    title: "Jharkhand B.Tech Semester PYQ",
    icon: GraduationCap,
    color: "linear-gradient(135deg, #7c3aed, #a78bfa)",
    badge: "1st – 8th Sem",
    desc: "Previous year question papers for all 8 semesters of Jharkhand B.Tech courses. Covers all major branches.",
    subs: [
      { id: "semester-1", title: "1st Semester" },
      { id: "semester-2", title: "2nd Semester" },
      { id: "semester-3-cse", title: "3rd Semester — CSE" },
      { id: "semester-4-ece", title: "4th Semester — ECE" },
    ],
  },
  {
    key: "jharkhand-polytechnic",
    title: "Jharkhand Polytechnic PYQ",
    icon: School,
    color: "linear-gradient(135deg, #198754, #5be49b)",
    badge: "2021 – 2026",
    desc: "Free PYQ Papers (2021–2026) + Syllabus, Eligibility & Online Practice for Jharkhand Polytechnic 2027.",
    subs: [
      { id: "exam-information", title: "Complete Jharkhand Polytechnic Guide + Free PYQ Papers 2026" },
      { id: "lateral-entry", title: "Complete Jharkhand Polytechnic(Lateral Entry) Guide + Free PYQ Papers 2027" },
    ],
  },
  {
    key: "jharkhand-d2d",
    title: "Jharkhand D2D PYQ",
    icon: Compass,
    color: "linear-gradient(135deg, #fd7e14, #ffc07a)",
    badge: "2021 – 2026",
    desc: "Free PYQ Papers (2021–2026) + Syllabus, Eligibility & Online Practice for D2D 2027.",
    subs: [
      { id: "exam-information", title: "Complete D2D Guide + Free PYQ Papers 2027" },
    ],
  },
  {
    key: "jharkhand-paramedical",
    title: "Jharkhand Paramedical PYQ",
    icon: Activity,
    color: "linear-gradient(135deg, #0d9488, #5eead4)",
    badge: "PMECE 2026",
    desc: "Free PYQ Papers + Syllabus, Eligibility & Online Practice for Jharkhand Paramedical (PMECE) 2026.",
    subs: [
      { id: "exam-information", title: "Complete Jharkhand Paramedical Guide + Free PYQ Papers 2026" },
    ],
  },
  {
    key: "jharkhand-nursing",
    title: "Jharkhand Nursing PYQ",
    icon: HeartPulse,
    color: "linear-gradient(135deg, #db2777, #f9a8d4)",
    badge: "2026",
    desc: "Free PYQ Papers + Syllabus, Eligibility & Online Practice for Jharkhand Nursing 2026 (B.Sc Nursing, GNM & ANM).",
    subs: [
      { id: "bsc-nursing", title: "B.Sc Nursing" },
      { id: "gnm", title: "GNM (General Nursing & Midwifery)" },
      { id: "anm", title: "ANM (Auxiliary Nurse Midwifery)" },
    ],
  },
  {
    key: "jharkhand-agriculture",
    title: "Jharkhand Agriculture PYQ",
    icon: Sprout,
    color: "linear-gradient(135deg, #166534, #86efac)",
    badge: "JCECE 2026",
    desc: "Free PYQ Papers + Syllabus, Eligibility & Online Practice for Jharkhand Agriculture & Allied Courses (JCECE) 2026.",
    subs: [
      { id: "exam-information", title: "Complete Jharkhand Agriculture Guide + Free PYQ Papers 2026" },
    ],
  },
];

const features = [
  { icon: CheckCircle2, text: "100% Free & High-Quality Study Materials" },
  { icon: Folder, text: "Well-Organised Content for Easy Learning" },
  { icon: Smartphone, text: "Fast PDF Access & Fully Mobile-Friendly" },
  { icon: RefreshCw, text: "Regular Updates with Latest Exam Papers" },
];

/* ─────────────────────────────────────────────
   FAQ ITEM
───────────────────────────────────────────── */
const FaqItem = React.memo(({ faq, index, isOpen, onToggle }) => {
  const innerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!innerRef.current) return;
    setHeight(isOpen ? innerRef.current.scrollHeight : 0);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const ro = new ResizeObserver(() => {
      if (innerRef.current) setHeight(innerRef.current.scrollHeight);
    });
    if (innerRef.current) ro.observe(innerRef.current);
    return () => ro.disconnect();
  }, [isOpen]);

  return (
    <div className={`faq-item${isOpen ? " faq-item--open" : ""}`} role="listitem">
      <button
        className="faq-question"
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        aria-controls={`faq-ans-${index}`}
        id={`faq-q-${index}`}
      >
        <span className="faq-q-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <span className="faq-q-text">{faq.question}</span>
        <span className={`faq-icon${isOpen ? " faq-icon--open" : ""}`} aria-hidden="true">
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>

      <div
        id={`faq-ans-${index}`}
        className="faq-body"
        style={{ height }}
        role="region"
        aria-labelledby={`faq-q-${index}`}
      >
        <div
          ref={innerRef}
          className={`faq-body-inner${isOpen ? " faq-body-inner--open" : ""}`}
        >
          {faq.answer}
        </div>
      </div>
    </div>
  );
});
FaqItem.displayName = "FaqItem";

/* ─────────────────────────────────────────────
   ACCORDION ITEM
───────────────────────────────────────────── */
const AccordionItem = React.memo(({ main, activeKey, toggleAccordion }) => {
  const CardIcon = main.icon;
  return (
    <div className="res-acc-card" id={`acc-card-${main.key}`}>
      <button
        className="res-acc-header"
        style={{ background: main.color }}
        onClick={() => toggleAccordion(main.key)}
        aria-expanded={activeKey === main.key}
      >
        <div className="res-acc-left">
          <span className="res-acc-emoji" aria-hidden="true">
            <CardIcon className="h-5 w-5 text-white" />
          </span>
          <div className="res-acc-info">
            <div className="res-acc-title">{main.title}</div>
            <span className="res-acc-badge">{main.badge}</span>
          </div>
        </div>
        <ChevronDown size={18} className={`res-acc-chevron ${activeKey === main.key ? "open" : ""}`} aria-hidden="true" />
      </button>

      {activeKey === main.key && (
        <div className="res-acc-content">
          <div className="res-acc-desc">{main.desc}</div>
          <div className={`res-acc-body${main.subs.length > 4 ? " res-acc-body--grid3" : ""}`}>
            {main.subs.map((sub) => (
              <Link key={sub.id} href={`/resources/${main.key}/${sub.id}`} className="res-sub-link">
                <span className="res-sub-dot" aria-hidden="true"></span>
                <span className="res-sub-title">{sub.title}</span>
                <span className="res-sub-arrow" aria-hidden="true">›</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
AccordionItem.displayName = "AccordionItem";

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
const ResourcesClient = () => {
  const [activeKey, setActiveKey] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleAccordion = useCallback((key) => setActiveKey((prev) => (prev === key ? null : key)), []);
  const toggleFaq = useCallback(
    (index) => setOpenFaq((prev) => (prev === index ? null : index)),
    []
  );

  const router = useRouter();
  const { user } = useAuth();
  // Bihar aspirants must NEVER see this Jharkhand listing — not even one frame
  // (mirrors ExamsClient's Bihar → /bihar/exam-preparation redirect).
  const [redirectingToBihar, setRedirectingToBihar] = useState(false);

  // Catches an exam that only becomes known later (login / profile refresh).
  useIsomorphicLayoutEffect(() => {
    const activeExam =
      normalizeExamId(user?.exam) || readLocalExam() || getSavedExam();
    if (isBiharExam(activeExam)) {
      setRedirectingToBihar(true);
      router.replace(BIHAR_RESOURCES_HOME);
    }
  }, [user?.exam, router]);

  // Never paint this page while the Bihar hub is loading.
  if (redirectingToBihar) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url("https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap");

        *, *::before, *::after {
          box-sizing: border-box;
        }

        /* ══════════════════════════════
           TICKER BANNER
        ══════════════════════════════ */
        .res-ticker-wrap {
          width: 100%;
          max-width: 100vw;
          background: linear-gradient(90deg, #4f46e5, #7c3aed);
          overflow: hidden;
          padding: 8px 0;
          position: relative;
          z-index: 10;
          margin-top: 0px;
        }
        .res-ticker-wrap::before,
        .res-ticker-wrap::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 40px;
          z-index: 2;
          pointer-events: none;
        }
        .res-ticker-wrap::before {
          left: 0;
          background: linear-gradient(90deg, #4f46e5, transparent);
        }
        .res-ticker-wrap::after {
          right: 0;
          background: linear-gradient(270deg, #7c3aed, transparent);
        }
        .res-ticker-track {
          display: flex;
          width: max-content;
          animation: tickerMove 28s linear infinite;
        }
        .res-ticker-track:hover { animation-play-state: paused; }
        @keyframes tickerMove {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .res-ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          padding: 0 20px;
          font-family: "Sora", sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          color: #fff;
        }
        .res-ticker-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #34d399;
          flex-shrink: 0;
          animation: tickerDotPulse 1.5s ease-in-out infinite;
        }
        @keyframes tickerDotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.7); }
        }
        .res-ticker-sep {
          color: rgba(255,255,255,0.3);
          padding: 0 4px;
          font-size: 0.85rem;
        }
        .res-ticker-cta {
          color: #fbbf24;
          text-decoration: none;
          font-weight: 800;
          border-bottom: 1px solid rgba(251,191,36,0.4);
          margin-left: 4px;
        }
        .res-ticker-cta:hover { border-color: #fbbf24; color: #fbbf24; }

        /* ══════════════════════════════
           CSS RESET & BASE TOKENS
        ══════════════════════════════ */
        .res-page {
          --accent:       #4f46e5;
          --accent-2:     #7c3aed;
          --accent-lt:    #eef2ff;
          --accent-mid:   rgba(79,70,229,0.12);
          --green:        #059669;
          --orange:       #ea580c;
          --purple:       #7c3aed;
          --purple-lt:    #f5f3ff;
          --text:         #0f172a;
          --text-2:       #334155;
          --muted:        #64748b;
          --border:       #e2e8f0;
          --border-2:     #cbd5e1;
          --surface:      #ffffff;
          --surface-2:    #f8fafc;
          --surface-3:    #f1f5f9;
          --radius-xl:    24px;
          --radius-lg:    18px;
          --radius-md:    12px;
          --radius-sm:    8px;
          --shadow-xs:    0 1px 4px rgba(15,23,42,0.06);
          --shadow-sm:    0 4px 16px rgba(15,23,42,0.08);
          --shadow-md:    0 8px 32px rgba(15,23,42,0.12);
          --shadow-lg:    0 16px 48px rgba(15,23,42,0.15);
          --shadow-acc:   0 8px 24px rgba(79,70,229,0.22);
          font-family: "DM Sans", ui-sans-serif, system-ui, sans-serif;
          background: #f8fafc;
          min-height: 100vh;
          width: 100%;
          max-width: 100vw;
          padding-bottom: 0;
          overflow-x: hidden;
        }

        /* ══════════════════════════════
           ANIMATED BACKGROUND
        ══════════════════════════════ */
        .res-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .res-bg::before {
          content: '';
          position: absolute;
          width: 900px; height: 900px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(79,70,229,0.09) 0%, transparent 70%);
          top: -300px; left: -200px;
          animation: bgPulse 8s ease-in-out infinite alternate;
        }
        .res-bg::after {
          content: '';
          position: absolute;
          width: 700px; height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%);
          bottom: -200px; right: -150px;
          animation: bgPulse 10s ease-in-out infinite alternate-reverse;
        }
        .res-bg-orb {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%);
          top: 40%; left: 60%;
          animation: bgPulse 12s ease-in-out infinite alternate;
        }
        @keyframes bgPulse {
          from { transform: scale(1) translate(0, 0); }
          to   { transform: scale(1.15) translate(30px, -20px); }
        }

        /* ══════════════════════════════
           MAIN WRAPPER
        ══════════════════════════════ */
        .res-main-wrap {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
        }

        /* ══════════════════════════════
           HERO
        ══════════════════════════════ */
        .res-hero {
          text-align: center;
          padding: 48px 16px 28px;
          max-width: 720px;
          margin: 0 auto;
          box-sizing: border-box;
        }
        .res-hero h1 {
          font-family: "Sora", sans-serif;
          font-size: clamp(1.4rem, 5vw, 2.4rem);
          font-weight: 800;
          color: var(--text);
          margin-bottom: 12px;
          line-height: 1.22;
          letter-spacing: -0.5px;
          overflow-wrap: anywhere;
          word-break: break-word;
        }
        .res-hero h1 .highlight {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .res-hero p {
          color: var(--muted);
          font-size: clamp(0.85rem, 3vw, 1rem);
          max-width: 560px;
          margin: 0 auto 24px;
          line-height: 1.65;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        /* ══════════════════════════════
           STATS STRIP
        ══════════════════════════════ */
        .res-stats {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 8px;
        }
        .res-stat-pill {
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: 999px;
          padding: 6px 14px;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-2);
          box-shadow: var(--shadow-xs);
          white-space: nowrap;
          font-family: "Sora", sans-serif;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        }
        .res-stat-pill:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
          border-color: rgba(79,70,229,0.3);
        }
        .res-stat-pill span {
          color: var(--accent);
          font-size: 0.95rem;
        }

        /* ══════════════════════════════
           LAYOUT GRID
        ══════════════════════════════ */
        .res-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 24px;
          align-items: start;
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 16px;
          box-sizing: border-box;
          width: 100%;
        }
        @media (max-width: 900px) {
          .res-layout {
            grid-template-columns: 1fr;
            padding: 0 12px;
            gap: 20px;
          }
          .res-sidebar {
            display: contents;
          }
          .res-main-section   { order: 1; }
          .res-notif-card     { order: 2; }
          .res-quick-card     { order: 3; }
          .res-feature-card   { order: 4; }
        }
        @media (max-width: 480px) {
          .res-layout { padding: 0 10px; gap: 14px; }
        }
        @media (max-width: 360px) {
          .res-layout { padding: 0 6px; gap: 12px; }
        }

        /* ══════════════════════════════
           SECTION LABEL
        ══════════════════════════════ */
        .res-section-label {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 12px;
          font-family: "Sora", sans-serif;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .res-section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, var(--border), transparent);
        }

        /* ══════════════════════════════
           ACCORDION CARDS
        ══════════════════════════════ */
        .res-acc-card {
          border: 1.5px solid var(--border) !important;
          border-radius: var(--radius-lg) !important;
          overflow: hidden;
          margin-bottom: 12px;
          box-shadow: var(--shadow-xs);
          transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s;
          background: var(--surface) !important;
          width: 100%;
          box-sizing: border-box;
        }
        .res-acc-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
          border-color: rgba(79,70,229,0.15) !important;
        }

        .res-acc-header {
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          border: none;
          width: 100%;
          text-align: left;
          gap: 10px;
          color: #fff;
          min-height: 56px;
          box-sizing: border-box;
        }
        .res-acc-header:focus-visible {
          outline: 3px solid rgba(255,255,255,0.6);
          outline-offset: -3px;
        }

        .res-acc-left {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          min-width: 0;
        }

        .res-acc-emoji {
          font-size: 1.3rem;
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .res-acc-info { min-width: 0; flex: 1; }

        .res-acc-title {
          font-size: clamp(0.82rem, 3.2vw, 0.98rem);
          font-weight: 700;
          line-height: 1.25;
          font-family: "Sora", sans-serif;
          white-space: normal;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .res-acc-badge {
          display: inline-block;
          margin-top: 3px;
          font-size: 0.65rem;
          font-weight: 700;
          background: rgba(255,255,255,0.25);
          border-radius: 999px;
          padding: 2px 8px;
          letter-spacing: 0.3px;
          font-family: "Sora", sans-serif;
          white-space: nowrap;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .res-acc-chevron {
          flex-shrink: 0;
          transition: transform 0.28s cubic-bezier(0.22,1,0.36,1);
          opacity: 0.85;
        }
        .res-acc-chevron.open { transform: rotate(180deg); }

        .res-acc-content { animation: slideDown 0.18s ease; width: 100%; }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }

        .res-acc-desc {
          background: var(--surface-2);
          padding: 10px 14px;
          font-size: 0.8rem;
          color: var(--muted);
          border-bottom: 1px solid var(--border);
          line-height: 1.5;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .res-acc-body {
          background: var(--surface-2);
          padding: 12px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          box-sizing: border-box;
          width: 100%;
        }
        @media (min-width: 640px) {
          .res-acc-body--grid3 {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }
        @media (max-width: 540px) { .res-acc-body { grid-template-columns: 1fr; gap: 8px; padding: 10px; } }
        @media (max-width: 360px) { .res-acc-body { padding: 8px 6px; gap: 6px; } }

        .res-sub-link {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: var(--radius-md);
          padding: 10px 12px;
          text-decoration: none;
          color: var(--text-2);
          font-weight: 600;
          font-size: 0.84rem;
          box-shadow: var(--shadow-xs);
          transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s, color 0.18s, background 0.18s;
          min-height: 44px;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }
        .res-sub-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(79,70,229,0.14);
          border-color: rgba(79,70,229,0.3);
          color: var(--accent);
          background: var(--accent-lt);
        }
        .res-sub-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
          transition: transform 0.18s;
        }
        .res-sub-link:hover .res-sub-dot { transform: scale(1.4); }
        .res-sub-title {
          flex: 1;
          min-width: 0;
          overflow-wrap: anywhere;
          word-break: break-word;
          font-size: clamp(0.78rem, 3vw, 0.85rem);
          line-height: 1.3;
        }
        .res-sub-arrow {
          font-size: 1rem;
          color: var(--muted);
          flex-shrink: 0;
          transition: transform 0.18s, color 0.18s;
        }
        .res-sub-link:hover .res-sub-arrow { transform: translateX(3px); color: var(--accent); }

        /* ══════════════════════════════
           SIDEBAR CARDS
        ══════════════════════════════ */
        .res-notif-card {
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 18px;
          box-shadow: var(--shadow-sm);
          margin-bottom: 14px;
          box-sizing: border-box;
          width: 100%;
        }
        .res-notif-card h2 {
          font-size: 0.88rem;
          font-weight: 800;
          color: var(--accent);
          margin-bottom: 12px;
          font-family: "Sora", sans-serif;
          position: relative;
        }
        .res-notif-item {
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 10px 12px;
          margin-bottom: 8px;
          position: relative;
          overflow-wrap: anywhere;
          word-break: break-word;
        }
        .res-notif-item:last-child { margin-bottom: 0; }
        .res-notif-item strong {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 4px;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 3px;
        }
        .res-notif-item span {
          font-size: 0.74rem;
          color: var(--muted);
          line-height: 1.4;
        }
        .res-notif-badge {
          display: inline-block;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 999px;
          font-family: "Sora", sans-serif;
        }
        .res-notif-badge--soon { background: #fef3c7; color: #92400e; }
        .res-notif-badge--live { background: #d1fae5; color: #065f46; }

        .res-quick-card {
          background: linear-gradient(145deg, #4f46e5, #6d28d9);
          border-radius: var(--radius-lg);
          padding: 18px;
          color: #fff;
          box-shadow: var(--shadow-acc);
          margin-bottom: 14px;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
          width: 100%;
        }
        .res-quick-card h2 {
          font-size: 0.88rem;
          font-weight: 800;
          margin-bottom: 12px;
          font-family: "Sora", sans-serif;
          position: relative;
          z-index: 1;
        }
        .res-quick-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: var(--radius-sm);
          padding: 10px 12px;
          margin-bottom: 8px;
          text-decoration: none;
          color: #fff;
          font-size: 0.82rem;
          font-weight: 600;
          transition: background 0.18s, transform 0.18s;
          position: relative;
          z-index: 1;
          min-height: 44px;
          width: 100%;
          box-sizing: border-box;
          gap: 8px;
        }
        .res-quick-link span {
          min-width: 0;
          flex: 1;
          overflow-wrap: anywhere;
          word-break: break-word;
        }
        .res-quick-link:hover {
          background: rgba(255,255,255,0.22);
          color: #fff;
          transform: translateX(3px);
        }
        .res-quick-link:last-child { margin-bottom: 0; }
        .res-quick-link-arrow { font-size: 1rem; opacity: 0.7; flex-shrink: 0; transition: transform 0.18s, opacity 0.18s; }
        .res-quick-link:hover .res-quick-link-arrow { transform: translateX(4px); opacity: 1; }

        .res-feature-card {
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 18px;
          box-shadow: var(--shadow-sm);
          margin-bottom: 14px;
          box-sizing: border-box;
          width: 100%;
        }
        .res-feature-card h2 {
          font-size: 0.88rem;
          font-weight: 800;
          color: var(--text);
          margin-bottom: 12px;
          font-family: "Sora", sans-serif;
        }
        .res-feature-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 10px;
        }
        .res-feature-list li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.83rem;
          color: var(--text-2);
          line-height: 1.45;
          overflow-wrap: anywhere;
          word-break: break-word;
        }
        .res-feature-icon {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: var(--accent-lt);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
        }

        @media (max-width: 480px) {
          .res-acc-header { padding: 12px 10px; min-height: 52px; gap: 8px; }
          .res-acc-emoji  { width: 34px; height: 34px; border-radius: 8px; }
          .res-sub-link   { padding: 8px 10px; }
          .res-notif-card, .res-quick-card, .res-feature-card { padding: 14px 12px; border-radius: 14px; }
        }

        @media (max-width: 360px) {
          .res-hero       { padding: 28px 10px 20px; }
          .res-hero h1    { font-size: 1.35rem; }
          .res-hero p     { font-size: 0.82rem; margin-bottom: 18px; }
          .res-stat-pill  { padding: 5px 10px; font-size: 0.72rem; }
          .res-acc-header { padding: 10px 8px; }
          .res-acc-emoji  { width: 30px; height: 32px; }
          .res-notif-card, .res-quick-card, .res-feature-card { padding: 12px 10px; border-radius: 12px; }
        }

        /* ══════════════════════════════
           FAQ SECTION
        ══════════════════════════════ */
        .faq-section {
          padding: 56px 0 64px;
          position: relative;
          width: 100%;
          box-sizing: border-box;
        }
        .faq-heading {
          text-align: center;
          margin-bottom: 8px;
          font-family: "Sora", sans-serif;
          font-size: clamp(1.25rem, 4vw, 1.75rem);
          font-weight: 800;
          color: var(--text);
          letter-spacing: -0.3px;
        }
        .faq-subheading {
          text-align: center;
          color: var(--muted);
          font-size: clamp(0.82rem, 2.5vw, 0.95rem);
          margin-bottom: 28px;
          line-height: 1.5;
        }

        .faq-item {
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: 12px;
          margin-bottom: 10px;
          width: 100%;
          box-sizing: border-box;
          transition: border-color 0.22s ease, box-shadow 0.22s ease;
        }
        .faq-item:hover,
        .faq-item--open {
          border-color: rgba(79,70,229,0.25);
          box-shadow: 0 4px 20px rgba(79,70,229,0.1);
        }

        .faq-question {
          width: 100%;
          border: none;
          background: transparent;
          text-align: left;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 14px 16px;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          user-select: none;
          min-height: 52px;
          box-sizing: border-box;
        }
        .faq-question:focus { outline: none; }

        .faq-q-num {
          flex-shrink: 0;
          font-size: 0.68rem;
          font-weight: 800;
          font-family: "Sora", sans-serif;
          color: var(--accent);
          background: var(--accent-lt);
          width: 26px;
          height: 26px;
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .faq-item--open .faq-q-num {
          background: var(--accent);
          color: #fff;
        }

        .faq-q-text {
          font-size: clamp(0.84rem, 2.8vw, 0.95rem);
          font-weight: 700;
          line-height: 1.4;
          color: var(--text);
          flex: 1;
          min-width: 0;
          overflow-wrap: anywhere;
          word-break: break-word;
          font-family: "Sora", sans-serif;
        }

        .faq-icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: var(--surface-3);
          color: var(--muted);
          font-size: 0.72rem;
          transition: transform 0.34s cubic-bezier(0.22,1,0.36,1), background 0.22s ease, color 0.22s ease;
        }
        .faq-icon--open {
          transform: rotate(180deg);
          background: var(--accent);
          color: #fff;
        }

        .faq-body {
          overflow: hidden;
          height: 0;
          transition: height 0.34s cubic-bezier(0.22,1,0.36,1);
        }

        .faq-body-inner {
          padding: 2px 16px 16px;
          color: var(--muted);
          font-size: 0.88rem;
          line-height: 1.65;
          opacity: 0;
          transform: translateY(-8px);
          transition: opacity 0.26s cubic-bezier(0.22,1,0.36,1) 0.06s, transform 0.30s cubic-bezier(0.22,1,0.36,1) 0.04s;
          overflow-wrap: anywhere;
          word-break: break-word;
        }
        .faq-body-inner--open {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 575px) {
          .faq-section    { padding: 36px 0 44px; }
          .faq-question   { padding: 12px 10px; min-height: 48px; }
          .faq-q-num      { display: none; }
          .faq-body-inner { padding: 2px 10px 14px; font-size: 0.83rem; }
        }

        /* ══════════════════════════════
           DIVIDER
        ══════════════════════════════ */
        .res-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border), transparent);
          margin: 8px 0 24px;
          max-width: 1080px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (prefers-reduced-motion: reduce) {
          .faq-body, .faq-body-inner, .faq-icon, .faq-item,
          .res-acc-card, .res-sub-link, .res-quick-link,
          .res-bg::before, .res-bg::after, .res-bg-orb,
          .res-hero h1, .res-hero p, .res-stats {
            transition: none !important;
            animation: none !important;
          }
        }
      ` }} />

      {/* Animated background */}
      <div className="res-bg" aria-hidden="true">
        <div className="res-bg-orb"></div>
      </div>

      <main className="res-page">
        {/* ── TICKER ── */}
        <div className="res-ticker-wrap" aria-label="Exam notifications">
          <div className="res-ticker-track">
            {[0, 1].map((copy) => (
              <div key={copy} style={{ display: "flex" }}>
                <span className="res-ticker-item">
                  <span className="res-ticker-dot" aria-hidden="true" />
                  🔴 LIVE — Jharkhand Polytechnic 2026 Form Started!
                  <Link href="/resources/jharkhand-polytechnic/exam-information" className="res-ticker-cta">Apply Now →</Link>
                </span>
                <span className="res-ticker-sep" aria-hidden="true">◆</span>
                <span className="res-ticker-item">
                  <span className="res-ticker-dot" aria-hidden="true" />
                  🔴 LIVE — Jharkhand Polytechnic Lateral Entry 2026 Form Started!
                  <Link href="/resources/jharkhand-polytechnic/lateral-entry" className="res-ticker-cta">Apply Now →</Link>
                </span>
                <span className="res-ticker-sep" aria-hidden="true">◆</span>
                <span className="res-ticker-item">
                  <span className="res-ticker-dot" aria-hidden="true" />
                  🔴 LIVE — Jharkhand D2D 2026 Form Started!
                  <Link href="/resources/jharkhand-d2d/exam-information" className="res-ticker-cta">Apply Now →</Link>
                </span>
                <span className="res-ticker-sep" aria-hidden="true">◆</span>
                <span className="res-ticker-item">
                  <span className="res-ticker-dot" aria-hidden="true" />
                  🆕 NEW — B.Tech Semester PYQs Now Available!
                  <Link href="/resources/jharkhand-btech/semester-1" className="res-ticker-cta">Explore →</Link>
                </span>
                <span className="res-ticker-sep" aria-hidden="true">◆</span>
              </div>
            ))}
          </div>
        </div>

        <div className="res-main-wrap">

          {/* ── HERO ── */}
          <header className="res-hero">
            <h1>
              All Jharkhand Study Material<br />
              <span className="highlight">in One Place</span>
            </h1>
            <p>Diploma &amp; B.Tech Semester PYQs, Jharkhand Polytechnic, D2D, Paramedical, Nursing &amp; Agriculture solved papers — organised by subject, updated regularly, fully free.</p>
            <div className="res-stats" aria-label="Resource statistics">
              <div className="res-stat-pill"><span>6</span> Diploma Semesters</div>
              <div className="res-stat-pill"><span>8</span> B.Tech Semesters</div>
              <div className="res-stat-pill"><span>5</span> Years PYQs</div>
              <div className="res-stat-pill"><span>2000+</span> Questions</div>
              <div className="res-stat-pill"><span>100%</span> Free</div>
            </div>
          </header>

          {/* ── MAIN LAYOUT ── */}
          <div className="res-layout">
            {/* Left: Accordions */}
            <section className="res-main-section" aria-label="Jharkhand study resource categories">
              <p className="res-section-label">Browse Resources</p>
              <div className="accordion">
                {data.map((main) => (
                  <AccordionItem
                    key={main.key}
                    main={main}
                    activeKey={activeKey}
                    toggleAccordion={toggleAccordion}
                  />
                ))}
              </div>
            </section>

            {/* Right: Sidebar */}
            <aside className="res-sidebar" aria-label="Quick links and platform highlights">
              {/* Exam Notification */}
              <div className="res-notif-card">
                <h2 className="flex items-center gap-2">
                  <Bell className="h-4.5 w-4.5 text-indigo-600" />
                  <span>Exam Notifications</span>
                </h2>
                <div className="res-notif-item">
                  <strong>
                    <span>Jharkhand Polytechnic 2026</span>
                    <span className="res-notif-badge res-notif-badge--soon">Started</span>
                  </strong>
                  <span>Registration started · Last date: 17 June 2026</span>
                </div>
                <div className="res-notif-item">
                  <strong>
                    <span>Jharkhand Poly Lateral Entry 2026</span>
                    <span className="res-notif-badge res-notif-badge--soon">Started</span>
                  </strong>
                  <span>Registration started · Last date: 17 June 2026</span>
                </div>
                <div className="res-notif-item">
                  <strong>
                    <span>Jharkhand D2D BTech 2026</span>
                    <span className="res-notif-badge res-notif-badge--soon">Started</span>
                  </strong>
                  <span>Registration Started · Last date: 12 June 2026</span>
                </div>
                <div className="res-notif-item">
                  <strong>
                    <span>Bihar Polytechnic (DCECE)</span>
                    <span className="res-notif-badge res-notif-badge--live">Started</span>
                  </strong>
                  <span>Last date: 19 April 2026</span>
                </div>
              </div>

              {/* Quick Links */}
              <div className="res-quick-card">
                <h2 className="flex items-center gap-2">
                  <Zap className="h-4.5 w-4.5 text-indigo-200 fill-indigo-200" />
                  <span>Quick Links</span>
                </h2>
                <Link href="/resources/jharkhand-btech/semester-1" className="res-quick-link" title="B.Tech Semester PYQs">
                  <span>B.Tech Semester PYQs 🆕</span>
                  <span className="res-quick-link-arrow" aria-hidden="true">›</span>
                </Link>
                <Link href="/test-series" className="res-quick-link" title="Practice Jharkhand D2D PYQs online">
                  <span>Practice Jharkhand D2D PYQs Online</span>
                  <span className="res-quick-link-arrow" aria-hidden="true">›</span>
                </Link>
                <Link href="/test-series" className="res-quick-link" title="Practice Jharkhand Polytechnic PYQs online">
                  <span>Practice Jharkhand Polytechnic PYQs Online</span>
                  <span className="res-quick-link-arrow" aria-hidden="true">›</span>
                </Link>
                <Link href="/test-series" className="res-quick-link" title="View all exam preparation categories">
                  <span>All Exam Categories</span>
                  <span className="res-quick-link-arrow" aria-hidden="true">›</span>
                </Link>
              </div>

              {/* Features */}
              <div className="res-feature-card">
                <h2>What You'll Get on Futurely</h2>
                <ul className="res-feature-list">
                  {features.map((f, i) => {
                    const FeatureIcon = f.icon;
                    return (
                      <li key={i}>
                        <span className="res-feature-icon" aria-hidden="true">
                          <FeatureIcon className="h-4 w-4 text-emerald-600" />
                        </span>
                        <span>{f.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>
          </div>

          {/* ── DIVIDER ── */}
          <div className="res-divider" aria-hidden="true" />

          {/* ── FAQ ── */}
          <section className="faq-section" aria-label="Frequently Asked Questions about Futurely">
            <div className="container mx-auto px-3 max-w-4xl">
              <h2 className="faq-heading">Frequently Asked Questions</h2>
              <p className="faq-subheading">Common questions about Futurely's Jharkhand study resources and PYQs.</p>
              <div role="list" aria-label="FAQ accordion">
                {faqData.map((faq, index) => (
                  <FaqItem
                    key={index}
                    faq={faq}
                    index={index}
                    isOpen={openFaq === index}
                    onToggle={toggleFaq}
                  />
                ))}
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
};

export default ResourcesClient;


