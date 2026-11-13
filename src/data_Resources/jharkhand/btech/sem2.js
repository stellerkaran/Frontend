"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import {
  SEM2_YEARS as years,
  SEM2_ALL_SUBJECTS as commonSubjects,
  getSem2Link as getLink,
} from "./Sem2Data";
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  Award, 
  FileText, 
  ClipboardCheck, 
  Compass, 
  Flame, 
  Lightbulb, 
  Cpu, 
  DraftingCompass, 
  Calendar, 
  Share2, 
  Download, 
  ChevronRight, 
  Bell, 
  HelpCircle, 
  FolderOpen, 
  Activity, 
  ChevronDown,
  Dna,
  Sliders,
  Info
} from "lucide-react";

// ---------- Sidebar Square Ad — capped to viewport width ----------
function SidebarAd({ slot }) {
  const adRef = useRef(null);
  useEffect(() => {
    try {
      if (window.adsbygoogle && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) { }
  }, []);

  return (
    <div
      style={{
        width: '100%',
        minHeight: 250,
        background: '#f1f5f9',
        borderRadius: 10,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', maxWidth: 300, height: 250 }}
        data-ad-client="ca-pub-9939857316410378"
        data-ad-slot={slot}
        data-ad-format="rectangle"
        data-full-width-responsive="true"
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   FAQ DATA
───────────────────────────────────────────── */
const faqData = [
  {
    question: "What subjects are in Jharkhand B.Tech 2nd Semester?",
    answer:
      "Jharkhand B.Tech 2nd Semester (JUT Ranchi) includes: Engineering Mathematics-II, Engineering Chemistry, Biology for Engineers, Elements of Electronics Engineering, Engineering Drawing and Computer Graphics, and Fundamentals of Measurement and Sensors. These 6 subjects are common for all branches.",
  },
  {
    question: "Is the B.Tech 2nd Semester syllabus same for all branches?",
    answer:
      "Yes, the 2nd Semester is common for all branches under JUT Ranchi. All 6 subjects — Mathematics-II, Chemistry, Biology, Electronics, Engineering Drawing, and Measurement & Sensors — are shared across CSE, IT, ME, CE, EE and all other branches.",
  },
  {
    question: "Which years of B.Tech 2nd Semester PYQs are available?",
    answer:
      "PYQs for 2025, 2024 and 2023 are currently available or being uploaded. Futurely regularly adds newly released papers. Papers marked 'Uploading Soon' will be available shortly — bookmark this page.",
  },
  {
    question: "Are these B.Tech PYQ PDFs free to download?",
    answer:
      "Yes, 100% free. No login or payment is required. Click the Download PDF button to access the paper directly from Google Drive.",
  },
  {
    question: "Who conducts the Jharkhand B.Tech 2nd Semester exam?",
    answer:
      "Jharkhand B.Tech semester exams are conducted by JUT Ranchi (Jharkhand University of Technology). All engineering colleges affiliated with JUT Ranchi follow the same curriculum and examination pattern.",
  },
  {
    question: "How many marks is the B.Tech 2nd Semester exam?",
    answer:
      "Each subject carries 100 marks total — typically 30 marks for internal assessment (sessional, assignments, attendance) and 70 marks for the external end-semester examination. The passing threshold for external is 28 out of 70.",
  },
  {
    question: "How should I use B.Tech PYQs effectively?",
    answer:
      "Study the PYQ papers to identify recurring topics and common question patterns. Focus on integration techniques and differential equations in Mathematics-II, electrochemistry in Chemistry, logic gates and circuits in Electronics, and projection methods in Engineering Drawing. Practice under timed conditions to simulate the real exam.",
  },
  {
    question: "Will more years of B.Tech 2nd Semester PYQs be added?",
    answer:
      "Yes. Futurely regularly uploads new PYQ PDFs as they become available. Papers marked 'Uploading Soon' will be added shortly. Bookmark this page for updates.",
  },
];

/* ─────────────────────────────────────────────
   STATIC DATA — single source of truth lives in ./Sem2Data.js
   (years / commonSubjects / getLink imported above)
───────────────────────────────────────────── */

const examInfoCards = [
  { icon: <GraduationCap size={20} className="text-blue-600" />, label: "Conducted By", value: "JUT Ranchi" },
  { icon: <BookOpen size={20} className="text-blue-600" />, label: "Subjects", value: "6 per Semester" },
  { icon: <Clock size={20} className="text-blue-600" />, label: "Duration", value: "3 Hours / Paper" },
  { icon: <Award size={20} className="text-blue-600" />, label: "Total Marks", value: "100 per Subject" },
  { icon: <FileText size={20} className="text-blue-600" />, label: "External Marks", value: "70 (pass: 28)" },
  { icon: <ClipboardCheck size={20} className="text-blue-600" />, label: "Internal Marks", value: "30 (Sessional)" },
];

const studyTips = [
  { icon: <Compass size={20} className="text-indigo-500" />, tip: "Maths-II: Integration (definite/indefinite), differential equations, Laplace transforms and Fourier series are asked every year — don't skip any." },
  { icon: <Flame size={20} className="text-emerald-500" />, tip: "Chemistry: Electrochemistry, corrosion, polymer chemistry and water treatment repeat consistently across years." },
  { icon: <Dna size={20} className="text-amber-500" />, tip: "Biology for Engineers: Focus on cell biology, genetics basics, biotechnology applications and environmental biology — these are the highest-scoring areas." },
  { icon: <Cpu size={20} className="text-blue-500" />, tip: "Electronics: Logic gates, Boolean algebra, diode circuits, transistor basics and op-amp fundamentals are must-prepare topics." },
  { icon: <DraftingCompass size={20} className="text-rose-500" />, tip: "Engineering Drawing: Practice orthographic projections, isometric views and sectional views — they take time but carry high marks." },
  { icon: <Sliders size={20} className="text-teal-500" />, tip: "Measurement & Sensors: Focus on measurement errors, transducer types, strain gauges, thermocouples and signal conditioning circuits." },
];

const semLinks = [
  { label: "1st Semester", path: "/resources/jharkhand-btech/semester-1" },
  { label: "3rd Semester - CSE", path: "/resources/jharkhand-btech/semester-3-cse" },
];

/* ─────────────────────────────────────────────
   FAQ ITEM COMPONENT
───────────────────────────────────────────── */
const FaqItem = ({ faq, index, isOpen, onToggle }) => {
  const innerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!innerRef.current) return;
    setHeight(isOpen ? innerRef.current.scrollHeight : 0);
  }, [isOpen]);

  return (
    <div className={`bt-faq-item${isOpen ? " bt-faq-item--open" : ""}`} role="listitem">
      <button
        className="bt-faq-btn"
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        aria-controls={`bt-faq-ans-${index}`}
        id={`bt-faq-q-${index}`}
      >
        <span className="bt-faq-num" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <span className="bt-faq-text">{faq.question}</span>
        <span className={`bt-faq-chevron${isOpen ? " open" : ""}`} aria-hidden="true" style={{ display: "flex", alignItems: "center" }}>
          <ChevronDown size={18} />
        </span>
      </button>
      <div
        id={`bt-faq-ans-${index}`}
        className="bt-faq-body"
        style={{ height }}
        role="region"
        aria-labelledby={`bt-faq-q-${index}`}
      >
        <div ref={innerRef} className="bt-faq-inner">
          {faq.answer}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════ */
const BtechSem2Client = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [copiedYear, setCopiedYear] = useState(null);

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  const handleShare = (year) => {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}${window.location.pathname}#year-${year}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedYear(year);
        setTimeout(() => setCopiedYear(null), 2000);
      });
    }
  };

  return (
    <>
      <div className="bt-page">

        {/* ── HERO ── */}
        <header className="bt-hero">
          <h1 className="bt-hero-title">Jharkhand B.Tech 2nd Semester PYQ</h1>
          <p className="bt-hero-sub">
            JUT Ranchi &nbsp;|&nbsp; 2023–2026 &nbsp;|&nbsp; Mathematics-II, Chemistry, Biology, Electronics &amp; More
          </p>
          <div className="bt-hero-desc">
            Complete PYQ collection for Jharkhand B.Tech 2nd Semester — organised by subject,
            instantly downloadable, no login required.
            <br />
            <span className="bt-hero-hindi">
              इसमें Engineering Mathematics-II, Chemistry, Biology for Engineers, Electronics Engineering, Engineering Drawing और Measurement &amp; Sensors के Previous Year Papers उपलब्ध हैं।
            </span>
          </div>
        </header>

        {/* ── MAIN LAYOUT ── */}
        <div className="bt-layout">

          {/* ══ MAIN COLUMN ══ */}
          <main className="bt-main">

            {/* ── EXAM INFO ── */}
            <section className="bt-section" aria-label="Exam information">
              <h2 className="bt-section-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Info size={18} />
                Exam Information
              </h2>
              <div className="bt-info-grid">
                {examInfoCards.map((c) => (
                  <div className="bt-info-card" key={c.label}>
                    <span className="bt-info-icon" aria-hidden="true">{c.icon}</span>
                    <div>
                      <div className="bt-info-label">{c.label}</div>
                      <div className="bt-info-value">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── SUBJECTS ── */}
            <section className="bt-section" aria-label="2nd semester subjects">
              <h2 className="bt-section-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <BookOpen size={18} />
                Subjects of 2nd Semester (Total 6)
              </h2>
              <div className="bt-subjects-box">
                <div className="bt-subject-group-label">📚 Common Subjects — All Branches</div>
                <ul className="bt-sublist">
                  {commonSubjects.map((sub, i) => (
                    <li key={i}>{sub}</li>
                  ))}
                </ul>
              </div>
              <p className="bt-note">
                ⚠️ B.Tech 2nd Semester में सभी branches के लिए 6 common subjects होते हैं। Final exam JUT Ranchi द्वारा conduct होता है। External paper 70 marks का होता है — passing marks: 28.
              </p>
            </section>

            {/* ── PYQ DOWNLOAD ── */}
            <section className="bt-section" aria-label="Download previous year question papers">
              <h2 className="bt-section-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Download size={18} />
                Download Previous Year Question Papers
              </h2>
              <div className="bt-pyq-intro">
                Jharkhand B.Tech 2nd Semester के सभी विषयों के <strong>Previous Year Question Papers (PDF)</strong> यहाँ free में available हैं। New papers regularly upload होते हैं।
              </div>

              {years.map((year, yearIndex) => (
                <React.Fragment key={year}>
                <div className="bt-year-block" id={`year-${year}`}>
                  <div className="bt-year-header-orig">
                    <div className="bt-year-left">
                      <span className="bt-year-badge">{year}</span>
                      <span className="bt-year-label">B.Tech 2nd Sem Papers JUT</span>
                    </div>
                    <button
                      className="bt-share-btn-orig"
                      onClick={() => handleShare(year)}
                      aria-label={`Copy link to ${year} papers`}
                      style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
                    >
                      {copiedYear === year ? (
                        <span>✓ Copied</span>
                      ) : (
                        <>
                          <Share2 size={12} />
                          <span>Share</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bt-table-scroll">
                    <table className="bt-table-orig">
                      <thead>
                        <tr>
                          <th scope="col">Subject</th>
                          <th scope="col" className="col-year">Year</th>
                          <th scope="col" className="col-type">Type</th>
                          <th scope="col">Download</th>
                        </tr>
                      </thead>
                      <tbody>
                        {commonSubjects.map((sub, i) => {
                          const link = getLink(year, sub);
                          const pdfViewerUrl = `/resources/jharkhand-btech/semester-2/pdf?subject=${encodeURIComponent(sub)}&year=${year}`;
                          return (
                            <tr key={i} className={link ? "" : "soon-row"}>
                              <td className="bt-sub-name">
                                {link ? (
                                  <Link
                                    href={pdfViewerUrl}
                                    className="hover:text-blue-600 hover:underline transition-colors"
                                    title={`Read ${sub} ${year} Question Paper PDF Online`}
                                  >
                                    {sub}
                                  </Link>
                                ) : (
                                  <span>{sub}</span>
                                )}
                              </td>
                              <td className="bt-year-col col-year">{year}</td>
                              <td className="col-type"><span className="bt-type-tag">Common</span></td>
                              <td>
                                {link ? (
                                  <Link
                                    href={pdfViewerUrl}
                                    className="bt-dl-btn"
                                    aria-label={`Download ${sub} ${year} PDF`}
                                    style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                                    title={`Read & Download ${sub} ${year} PDF`}
                                  >
                                    <span aria-hidden="true">📥</span>
                                    Download PDF
                                  </Link>
                                ) : (
                                  <span className="bt-soon-tag">⏳ Soon</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* Ad between year sections - gaps 1/2/3 = 6247445156 / 8194031779 / 8948710243 */}
                {yearIndex < years.length - 1 && yearIndex < 3 && (
                  <div style={{ margin: "18px 0" }}>
                    <AdBanner yearGap={yearIndex} />
                  </div>
                )}
                </React.Fragment>
              ))}
            </section>

            <div style={{ margin: "18px 0" }}>
              <AdBanner slot="8679502538" format="fluid" layout="in-article" />
            </div>

            {/* ── STUDY TIPS ── */}
            <section className="bt-section" aria-label="Study tips for 2nd semester">
              <h2 className="bt-section-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Lightbulb size={18} />
                Study Tips for 2nd Semester
              </h2>
              <div className="bt-tips-grid">
                {studyTips.map((t, i) => (
                  <div className="bt-tip-card" key={i}>
                    <span className="bt-tip-icon" aria-hidden="true">{t.icon}</span>
                    <p className="bt-tip-text">{t.tip}</p>
                  </div>
                ))}
              </div>
            </section>

            <div style={{ margin: "18px 0" }}>
              <AdBanner slot="3636692323" />
            </div>

            {/* ── FAQ ── */}
            <section className="bt-section" aria-label="Frequently asked questions about Jharkhand B.Tech 2nd Semester">
              <h2 className="bt-section-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <HelpCircle size={18} />
                Frequently Asked Questions
              </h2>
              <p className="bt-faq-sub">
                Common questions about Jharkhand B.Tech 2nd Semester PYQs and JUT Ranchi exams.
              </p>
              <div role="list">
                {faqData.map((faq, i) => (
                  <FaqItem
                    key={i}
                    faq={faq}
                    index={i}
                    isOpen={openFaq === i}
                    onToggle={toggleFaq}
                  />
                ))}
              </div>
            </section>

          </main>

          {/* ══ SIDEBAR ══ */}
          <aside className="bt-sidebar" aria-label="Quick navigation and exam links">

            {/* Other Semesters */}
            <div className="bt-scard">
              <h3 className="bt-scard-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FolderOpen size={18} className="text-slate-750" />
                Other Semesters
              </h3>
              <nav aria-label="B.Tech semester navigation">
                {semLinks.map((s) => (
                  <Link key={s.label} href={s.path} className="bt-ql" title={`Jharkhand B.Tech ${s.label} PYQ`}>
                    <span>{s.label}</span>
                    <span className="bt-ql-arrow" aria-hidden="true" style={{ display: "flex", alignItems: "center" }}>
                      <ChevronRight size={14} />
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="mb-3"><SidebarAd slot="1675110481" /></div>

            {/* Practice Online */}
            <div className="bt-scard bt-practice-card">
              <h3 className="bt-scard-title" style={{ color: "#fff", display: "flex", alignItems: "center", gap: "8px" }}>
                <Activity size={18} />
                Practice Online
              </h3>
              <p className="bt-practice-desc">
                Solve Jharkhand D2D &amp; Polytechnic MCQs interactively with instant feedback and solutions.
              </p>
              <Link href="/exam-preparation/jharkhand-d2d" className="bt-practice-btn" title="Practice Jharkhand D2D PYQs online">
                Practice D2D PYQs →
              </Link>
              <Link
                href="/exam-preparation/jharkhand-polytechnic"
                className="bt-practice-btn bt-pb-ol"
                title="Practice Jharkhand Polytechnic PYQs online"
                style={{ marginTop: 8 }}
              >
                Practice Polytechnic PYQs →
              </Link>
            </div>

            {/* Exam Notifications */}
            <div className="bt-scard" style={{ borderLeft: "4px solid #4f46e5" }}>
              <h3 className="bt-scard-title" style={{ color: "#4f46e5", display: "flex", alignItems: "center", gap: "8px" }}>
                <Bell size={18} className="animate-pulse" />
                Exam Notifications
              </h3>
              {[
                { dot: "#22c55e", name: "Jharkhand Polytechnic 2026", status: "Registration Started", date: "Last date: 17 June 2026" },
                { dot: "#22c55e", name: "Jharkhand Polytechnic LE 2026", status: "Registration Started", date: "Last date: 12 June 2026" },
                { dot: "#22c55e", name: "Jharkhand D2D Btech 2026", status: "Registration Started", date: "Last date: 12 June 2026" },
                { dot: "#f59e0b", name: "Bihar Polytechnic (DCECE)", status: "Registration Started", date: "Last date: 19 April 2026" },
              ].map((n) => (
                <div className="bt-notif-item" key={n.name}>
                  <div className="bt-notif-dot" style={{ background: n.dot }} aria-hidden="true"></div>
                  <div>
                    <div className="bt-notif-name">{n.name}</div>
                    <div className="bt-notif-status">{n.status}</div>
                    <div className="bt-notif-date">{n.date}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-3">
              <SidebarAd slot="4461940407" />
            </div>

            {/* Pro Tip */}
            <div className="bt-scard bt-protip-card">
              <div style={{ marginBottom: "8px", display: "flex", justifyContent: "center" }} className="text-amber-500">
                <Lightbulb size={24} />
              </div>
              <p className="bt-protip-text">
                <b>Pro Tip:</b> Repeated questions across years are almost guaranteed to appear again.
                Solve papers from all available years before your exam.
              </p>
            </div>

            <div className="my-3">
              <AdBanner slot="6242297060" />
            </div>

          </aside>
        </div>

        {/* ── FOOTER ── */}
        <footer className="bt-footer">
          <p>Last Updated: June 2026</p>
          <p>All PDFs are for educational purposes only and based on previous year data. Futurely does not claim official ownership.</p>
        </footer>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `

        .bt-page {
          --blue:     #0d6efd;
          --blue-dk:  #084298;
          --blue-lt:  #e8f0fe;
          --green:    #198754;
          --green-lt: #e6ffed;
          --indigo:   #4f46e5;
          --text:     #0f172a;
          --muted:    #64748b;
          --border:   #e2e8f0;
          --r:        14px;
          --sh-sm:    0 4px 16px rgba(15,23,42,0.07);
          --sh-md:    0 8px 28px rgba(15,23,42,0.11);
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(180deg, #f0f6ff 0%, #fff 60%);
          min-height: 100vh;
          padding-bottom: 60px;
          box-sizing: border-box;
          overflow-x: hidden;
        }

        .bt-page *, .bt-page *::before, .bt-page *::after { box-sizing: border-box; }

        /* ── HERO ── */
        .bt-hero {
          max-width: 1100px;
          margin: 0px auto 10px;
          padding: 22px 16px 18px;
          text-align: center;
        }
        .bt-hero-title {
          font-size: clamp(1.3rem, 4.5vw, 2.3rem);
          font-weight: 800;
          color: var(--blue);
          margin-bottom: 8px;
          line-height: 1.25;
          word-break: break-word;
        }
        .bt-hero-sub {
          font-size: clamp(.88rem, 2.5vw, 1.08rem);
          color: var(--muted);
          margin-bottom: 12px;
          font-weight: 500;
          word-break: break-word;
        }
        .bt-hero-desc {
          font-size: clamp(.92rem, 2.3vw, 1.05rem);
          color: #374151;
          line-height: 1.7;
          max-width: 1080px;
          margin: 0 auto 10px;
          text-align: left;
        }
        .bt-hero-hindi {
          font-size: clamp(.86rem, 2.1vw, 1rem);
          color: var(--muted);
        }

        /* ── LAYOUT ── */
        .bt-layout {
          display: grid;
          grid-template-columns: 1fr 296px;
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 2px;
          align-items: start;
        }
        @media (max-width: 960px) {
          .bt-layout { grid-template-columns: 1fr; }
          .bt-sidebar { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        }
        @media (max-width: 560px) {
          .bt-sidebar { grid-template-columns: 1fr; }
          .bt-layout { padding: 0 10px; gap: 14px; }
        }

        /* ── SECTION ── */
        .bt-section { margin-bottom: 24px; }
        .bt-section-title {
          font-size: clamp(1rem, 2.8vw, 1.22rem);
          font-weight: 800;
          color: var(--blue);
          margin-bottom: 14px;
          padding-bottom: 8px;
          border-bottom: 2px solid var(--blue-lt);
          word-break: break-word;
        }

        /* ── INFO GRID ── */
        .bt-info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        @media (max-width: 600px) { .bt-info-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 340px) { .bt-info-grid { grid-template-columns: 1fr; } }

        .bt-info-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--r);
          padding: 10px 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: var(--sh-sm);
          transition: box-shadow .2s, transform .2s;
          min-width: 0;
        }
        .bt-info-card:hover { box-shadow: var(--sh-md); transform: translateY(-2px); }
        .bt-info-icon  { font-size: 1.35rem; flex-shrink: 0; }
        .bt-info-label { font-size: clamp(.72rem, 1.7vw, .8rem); color: var(--muted); font-weight: 600; text-transform: uppercase; letter-spacing: .4px; }
        .bt-info-value { font-size: clamp(.84rem, 2vw, 1rem); font-weight: 700; color: var(--text); word-break: break-word; }

        /* ── SUBJECTS BOX ── */
        .bt-subjects-box {
          background: var(--green-lt);
          border: 2px solid var(--green);
          border-radius: var(--r);
          padding: 16px;
          box-shadow: var(--sh-sm);
        }
        .bt-subject-group-label {
          font-size: clamp(.8rem, 2vw, .88rem);
          font-weight: 800;
          color: var(--green);
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: .4px;
        }
        .bt-sublist {
          margin: 0;
          padding-left: 18px;
          color: #212529;
          font-size: clamp(.88rem, 2.2vw, .97rem);
          line-height: 2;
        }
        .bt-note {
          margin-top: 12px;
          background: #fff7e6;
          border-left: 4px solid #ffc107;
          padding: 10px 12px;
          border-radius: 10px;
          font-size: clamp(.86rem, 2vw, .96rem);
          color: #374151;
          line-height: 1.6;
        }

        /* ── PYQ INTRO ── */
        .bt-pyq-intro {
          font-size: 0.84rem;
          color: #374151;
          margin-bottom: 14px;
          line-height: 1.7;
          text-align: center;
          padding: 11px 12px;
          background: #ecfdf5;
          border: 1.5px solid #6ee7b7;
          border-radius: var(--r);
          word-break: break-word;
        }
        .bt-pyq-intro strong { color: #059669; }

        /* ── YEAR BLOCK ── */
        .bt-year-block {
          background: #fff;
          border: 1.5px solid var(--border);
          border-radius: 18px;
          overflow: hidden;
          margin-bottom: 12px;
          box-shadow: var(--sh-sm);
          transition: border-color .18s;
          scroll-margin-top: 80px;
        }
        .bt-year-block:hover { border-color: #bfdbfe; }

        .bt-year-header-orig {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          background: #f9fafb;
          border-bottom: 1px solid var(--border);
          flex-wrap: wrap;
          gap: 8px;
          overflow: hidden;
        }
        .bt-year-left {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
          flex: 1;
          overflow: hidden;
        }
        .bt-year-badge {
          font-family: 'Poppins', sans-serif;
          font-size: 0.9rem;
          font-weight: 800;
          color: #fff;
          background: var(--blue);
          padding: 3px 10px;
          border-radius: 8px;
          letter-spacing: 0.5px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .bt-year-label {
          font-size: 0.82rem;
          font-weight: 600;
          color: #374151;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        @media (max-width: 360px) { .bt-year-label { display: none; } }

        .bt-share-btn-orig {
          background: #fff;
          border: 1.5px solid var(--border);
          border-radius: 8px;
          padding: 5px 10px;
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--muted);
          cursor: pointer;
          transition: border-color .15s, color .15s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .bt-share-btn-orig:hover { border-color: #bfdbfe; color: var(--blue); }

        /* ── TABLE ── */
        .bt-table-scroll {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .bt-table-orig {
          width: 100%;
          border-collapse: collapse;
          min-width: 280px;
        }
        .bt-table-orig thead tr { background: var(--blue); }
        .bt-table-orig th {
          padding: 9px 10px;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          color: #fff;
          text-align: left;
          white-space: nowrap;
        }
        .bt-table-orig th:last-child { text-align: center; }
        .bt-table-orig tbody tr {
          border-bottom: 1px solid var(--border);
          transition: background .12s;
        }
        .bt-table-orig tbody tr:last-child { border-bottom: none; }
        .bt-table-orig tbody tr:hover { background: #eff6ff; }
        .bt-table-orig tbody tr:nth-child(even) { background: #f9fafb; }
        .bt-table-orig tbody tr:nth-child(even):hover { background: #eff6ff; }
        .bt-table-orig tbody tr.soon-row { opacity: 0.5; }
        .bt-table-orig td {
          padding: 9px 10px;
          font-size: 0.8rem;
          color: #374151;
          vertical-align: middle;
          word-break: break-word;
        }
        .bt-table-orig td:last-child { text-align: center; }
        .bt-sub-name { font-weight: 600; color: var(--text); }
        .bt-year-col {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          color: var(--blue);
          font-size: 0.78rem;
          white-space: nowrap;
        }
        .bt-type-tag {
          display: inline-block;
          padding: 2px 7px;
          border-radius: 999px;
          font-size: 0.66rem;
          font-weight: 700;
          white-space: nowrap;
          background: #dbeafe;
          color: #1d4ed8;
          border: 1px solid #bfdbfe;
        }
        @media (max-width: 380px) {
          .bt-table-orig th.col-year,
          .bt-table-orig td.col-year,
          .bt-table-orig th.col-type,
          .bt-table-orig td.col-type { display: none; }
        }

        /* ── DOWNLOAD BUTTON ── */
        .bt-dl-btn {
          position: relative;
          background: linear-gradient(90deg, #0d6efd, #6610f2);
          color: #fff;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: clamp(.74rem, 1.8vw, .88rem);
          font-weight: 600;
          text-decoration: none;
          display: inline-block;
          overflow: hidden;
          z-index: 1;
          white-space: nowrap;
        }
        .bt-dl-btn::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 10px;
          background: linear-gradient(120deg, transparent, #00eaff, #6610f2, #00eaff, transparent);
          background-size: 300% 300%;
          animation: btBorderGlow 2.5s linear infinite;
          z-index: -1;
        }
        .bt-dl-btn::after {
          content: "";
          position: absolute;
          inset: 2px;
          background: linear-gradient(90deg, #0d6efd, #6610f2);
          border-radius: 6px;
          z-index: -1;
        }
        .bt-dl-btn:hover { opacity: .9; color: #fff; }
        @keyframes btBorderGlow {
          0%   { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
        .bt-soon-tag { font-size: clamp(.72rem, 1.7vw, .86rem); color: #94a3b8; font-style: italic; }

        /* ── TIPS ── */
        .bt-tips-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 520px) { .bt-tips-grid { grid-template-columns: 1fr; } }
        .bt-tip-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--r);
          padding: 12px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          box-shadow: var(--sh-sm);
          transition: box-shadow .2s;
        }
        .bt-tip-card:hover { box-shadow: var(--sh-md); }
        .bt-tip-icon { font-size: 1.3rem; flex-shrink: 0; margin-top: 1px; }
        .bt-tip-text { font-size: clamp(.86rem, 2vw, .96rem); color: #374151; line-height: 1.65; margin: 0; }

        /* ── FAQ ── */
        .bt-faq-sub { font-size: clamp(.86rem, 2vw, .96rem); color: var(--muted); margin-bottom: 14px; }
        .bt-faq-item {
          background: var(--blue-lt);
          border: 1px solid #c7d9f8;
          border-radius: 12px;
          margin-bottom: 8px;
          overflow: hidden;
          transition: box-shadow .2s;
        }
        .bt-faq-item:hover { box-shadow: 0 4px 16px rgba(13,110,253,.12); }
        .bt-faq-item--open { border-color: rgba(13,110,253,.35); }
        .bt-faq-btn {
          width: 100%;
          background: none;
          border: none;
          text-align: left;
          padding: 13px 15px;
          font-size: clamp(.9rem, 2.2vw, 1.04rem);
          font-weight: 700;
          color: var(--text);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          line-height: 1.4;
          font-family: 'Poppins', sans-serif;
          -webkit-tap-highlight-color: transparent;
        }
        .bt-faq-btn:focus-visible { outline: 3px solid rgba(13,110,253,.35); border-radius: 12px; }
        .bt-faq-num {
          font-size: 0.63rem;
          font-weight: 800;
          color: var(--blue);
          background: #fff;
          border: 1px solid #c7d9f8;
          width: 22px; height: 22px;
          min-width: 22px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .bt-faq-item--open .bt-faq-num { background: var(--blue); color: #fff; border-color: var(--blue); }
        .bt-faq-text { flex: 1; min-width: 0; word-break: break-word; }
        .bt-faq-chevron {
          text-align: center;
          flex-shrink: 0;
          color: var(--blue);
          transition: transform .25s, color .18s;
          display: flex;
          align-items: center;
        }
        .bt-faq-chevron.open { transform: rotate(180deg); }
        .bt-faq-body {
          overflow: hidden;
          height: 0;
          transition: height .3s cubic-bezier(0.22,1,0.36,1);
        }
        .bt-faq-inner {
          padding: 0 15px 15px 50px;
          color: var(--muted);
          font-size: clamp(.86rem, 2vw, .98rem);
          line-height: 1.75;
          word-break: break-word;
        }
        @media (max-width: 360px) { .bt-faq-inner { padding-left: 15px; } .bt-faq-num { display: none; } }

        /* ── SIDEBAR ── */
        .bt-sidebar { display: flex; flex-direction: column; gap: 16px; }
        .bt-scard {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--r);
          padding: 16px;
          box-shadow: var(--sh-sm);
        }
        .bt-scard-title { font-size: clamp(.94rem, 2.2vw, 1.05rem); font-weight: 800; color: var(--text); margin-bottom: 12px; }

        .bt-ql {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 11px;
          border-radius: 10px;
          background: #f8faff;
          border: 1px solid var(--border);
          text-decoration: none;
          color: var(--text);
          font-size: clamp(.86rem, 2vw, .96rem);
          font-weight: 600;
          margin-bottom: 6px;
          transition: background .15s, border-color .15s, color .15s;
        }
        .bt-ql:last-child { margin-bottom: 0; }
        .bt-ql:hover { background: var(--blue-lt); border-color: #b6d4fe; color: var(--blue); }
        .bt-ql-arrow { color: #94a3b8; font-size: 18px; }

        .bt-practice-card { background: linear-gradient(135deg, #4f46e5, #7c3aed); border: none; }
        .bt-practice-desc { font-size: clamp(.86rem, 2vw, .95rem); color: rgba(255,255,255,.85); margin-bottom: 12px; line-height: 1.5; }
        .bt-practice-btn {
          display: block;
          width: 100%;
          text-align: center;
          padding: 9px 12px;
          border-radius: 10px;
          background: #fff;
          color: #4f46e5;
          font-size: clamp(.86rem, 2vw, .96rem);
          font-weight: 700;
          text-decoration: none;
          transition: opacity .15s;
        }
        .bt-practice-btn:hover { opacity: .9; color: #4f46e5; }
        .bt-pb-ol { background: rgba(255,255,255,.15); color: #fff; border: 1px solid rgba(255,255,255,.3); }
        .bt-pb-ol:hover { background: rgba(255,255,255,.25); color: #fff; }

        .bt-notif-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--border); }
        .bt-notif-item:last-child { border-bottom: none; padding-bottom: 0; }
        .bt-notif-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }
        .bt-notif-name   { font-size: clamp(.86rem, 2vw, .96rem); font-weight: 700; color: var(--text); }
        .bt-notif-status { font-size: clamp(.78rem, 1.8vw, .88rem); color: #16a34a; font-weight: 600; }
        .bt-notif-date   { font-size: clamp(.74rem, 1.7vw, .84rem); color: var(--muted); }

        .bt-protip-card { background: #fffbeb; border-color: #fde68a; text-align: center; }
        .bt-protip-text { font-size: clamp(.86rem, 2vw, .96rem); color: #374151; line-height: 1.65; margin: 0; }

        /* ── FOOTER ── */
        .bt-footer {
          max-width: 1100px;
          margin: 32px auto 0;
          padding: 16px;
          border-top: 1px solid var(--border);
          text-align: center;
        }
        .bt-footer p { font-size: clamp(.74rem, 1.7vw, .86rem); color: #94a3b8; margin-bottom: 4px; }
        .bt-footer p:last-child { margin-bottom: 0; }

        /* ── SMALL DEVICE OVERRIDES ── */
        @media (max-width: 400px) {
          .bt-hero { margin-top: 22px; padding: 12px 10px 10px; }
          table { font-size: .78rem; min-width: 300px; }
          th { padding: 8px 5px; font-size: .74rem; }
          td { padding: 7px 5px; font-size: .76rem; }
          .bt-dl-btn { font-size: .74rem; padding: 5px 7px; }
          .bt-faq-btn { padding: 11px 11px; }
          .bt-scard { padding: 12px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .bt-faq-body, .bt-faq-chevron, .bt-info-card, .bt-tip-card { transition: none !important; }
          .bt-dl-btn::before { animation: none !important; }
        }
      ` }} />
    </>
  );
};

export default BtechSem2Client;
