"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import {
  SEM5_YEARS as years,
  SEM5_ALL_SUBJECTS as subjects,
  getSem5Link as getLink,
} from "./Sem5Data";
import {
  School,
  ClipboardList,
  Clock,
  Award,
  FileCheck,
  BarChart2,
  BookOpen,
  ChevronRight,
  Lightbulb,
  Target,
  FileText,
  Share2,
  Download,
  Megaphone,
  HelpCircle,
  ChevronDown,
  Zap,
  AlertTriangle
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
    question: "What subjects are in Jharkhand Diploma 5th Semester for CSE?",
    answer:
      "Jharkhand Diploma 5th Semester for CSE (JUT Ranchi) includes key branch papers such as Microprocessors & Microcontrollers, Java Programming, Computer Graphics, and the elective papers are Mobile Computing and E-Commerce prescribed for the semester. Students should follow the latest JUT syllabus and exam programme for the exact paper codes.",
  },
  {
    question: "Which years of 5th Semester PYQs are available to download?",
    answer:
      "PYQs for Jharkhand Diploma 5th Semester CSE are currently arranged year-wise from 2021 to 2025. More years and missing subjects can be added later on Futurely.",
  },
  {
    question: "Are these PYQ PDFs free to download?",
    answer:
      "Yes, 100% free. No login or payment is needed. Just click the Download PDF button next to any subject and the PDF opens directly from the linked source.",
  },
  {
    question: "Who conducts the Jharkhand Diploma 5th Semester exam?",
    answer:
      "Jharkhand Diploma semester exams are conducted by JUT Ranchi (Jharkhand University of Technology). All polytechnic colleges affiliated with JUT Ranchi follow the same syllabus and question paper pattern.",
  },
  {
    question: "Are CSE branch papers also included?",
    answer:
      "Yes. This page is prepared for the CSE branch and includes the CSE 5th-semester paper set that is commonly asked in the JUT exam programme.",
  },
  {
    question: "How many marks is each subject?",
    answer:
      "Each subject is usually treated as a full paper with internal and external marks as per the JUT pattern. Check your official syllabus or notice for the final marks scheme of the current session.",
  },
  {
    question: "How should I use PYQs to prepare effectively?",
    answer:
      "Download papers from all available years, identify repeated topics and question patterns, then practice solving them within the exam duration. Focus especially on Java, Computer Graphics, Microprocessors, and the elective papers.",
  },
  {
    question: "Will more years of PYQs be added in the future?",
    answer:
      "Yes. Futurely can keep adding new PYQ PDFs over time. Bookmark this page and check back regularly for updates.",
  },
];

/* ─────────────────────────────────────────────
   STATIC DATA — single source of truth lives in ./Sem5Data.js
   (years / subjects / getLink imported above)
───────────────────────────────────────────── */

const examInfoCards = [
  { icon: School, label: "Conducted By", value: "JUT Ranchi" },
  { icon: ClipboardList, label: "Branch", value: "Computer Science Engg" },
  { icon: Clock, label: "Duration", value: "3 Hours / Paper" },
  { icon: Award, label: "Total Marks", value: "100 per Subject" },
  { icon: FileCheck, label: "Pattern", value: "Internal + External" },
  { icon: BookOpen, label: "Semester", value: "5th Semester" },
];

const studyTips = [
  { icon: Target, tip: "Solve PYQs year by year and keep one notebook for repeated concepts and common question patterns." },
  { icon: BookOpen, tip: "In Java, revise OOP, arrays, strings, exception handling, inheritance, and file handling first." },
  { icon: FileText, tip: "In Computer Graphics, focus on 2D/3D basics, line algorithms, transformations, clipping, and viewing." },
  { icon: Zap, tip: "In Microprocessors, practice architecture, instruction set, addressing modes, and basic interfacing." },
  { icon: Clock, tip: "Attempt one full paper in exam timing so your speed and writing practice improve together." },
  { icon: ClipboardList, tip: "Do not ignore elective papers. They often contain scoring questions and short theory answers." },
];

const semLinks = [
  { label: "1st Semester", path: "/resources/jharkhand-diploma/semester-1" },
  { label: "2nd Semester", path: "/resources/jharkhand-diploma/semester-2" },
  { label: "3rd Semester — ECE", path: "/resources/jharkhand-diploma/semester-3-ece" },
  { label: "3rd Semester — EE/EEE", path: "/resources/jharkhand-diploma/semester-3-eee" },
  { label: "4th Semester", path: "/resources/jharkhand-diploma/semester-4-mech" },
  { label: "6th Semester", path: "/resources/jharkhand-diploma/semester-6" },
];

export default function Sem5Client() {
  const [openFaq, setOpenFaq] = useState(null);
  const [copiedYear, setCopiedYear] = useState(null);

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  const handleShare = (year) => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}${window.location.pathname}#year-${year}`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          setCopiedYear(year);
          setTimeout(() => setCopiedYear(null), 2000);
        });
      }
    }
  };

  return (
    <div className="w-full px-0">
      <div className="s5-page">

        {/* ── HERO ── */}
        <header className="s5-hero">
          <h1 className="s5-hero-title">Jharkhand Diploma 5th Semester PYQ</h1>
          <p className="s5-hero-sub">
            JUT Ranchi &nbsp;|&nbsp; CSE Branch &nbsp;|&nbsp; 2021–2025 &nbsp;|&nbsp; Microprocessors, Java, Computer Graphics &amp; Electives
          </p>
          <p className="s5-hero-desc">
            This 5th Semester material has been carefully prepared to help
            Jharkhand Polytechnic Diploma students prepare effectively for
            their examinations.
            <br />
            <span className="s5-hero-hindi">
              इसमें important questions, previous year papers तथा important topics शामिल हैं जिससे semester exam pattern और branch topics की clear understanding मिल सके।
            </span>
          </p>
        </header>

        {/* ── MAIN LAYOUT ── */}
        <div className="s5-layout">

          {/* ══ MAIN COLUMN ══ */}
          <main className="s5-main">

            {/* Exam Info */}
            <section className="s5-section" aria-label="Exam information">
              <h2 className="s5-section-title flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-[#0d6efd]" />
                <span>Exam Information</span>
              </h2>
              <div className="s5-info-grid">
                {examInfoCards.map((c) => {
                  const CardIcon = c.icon;
                  return (
                    <div className="s5-info-card" key={c.label}>
                      <span className="s5-info-icon" aria-hidden="true">
                        <CardIcon className="h-5 w-5 text-[#0d6efd]" />
                      </span>
                      <div>
                        <div className="s5-info-label">{c.label}</div>
                        <div className="s5-info-value">{c.value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <div style={{ margin: "18px 0" }}>
              <AdBanner slot="2434542863" />
            </div>

            {/* Subjects */}
            <section className="s5-section" aria-label="5th semester subjects">
              <h2 className="s5-section-title flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#0d6efd]" />
                <span>Subjects of 5th Semester (CSE)</span>
              </h2>
              <div className="s5-subjects-box">
                <div className="s5-subjects-col">
                  <div className="s5-subject-group-label font-bold text-emerald-700 flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 text-emerald-600" />
                    <span>CSE Semester Papers</span>
                  </div>
                  <ul className="s5-sublist">
                    <li>Microprocessors &amp; Microcontrollers</li>
                    <li>Java Programming</li>
                    <li>Computer Graphics</li>
                  </ul>
                </div>
                <div className="s5-subjects-col">
                  <div className="s5-subject-group-label font-bold text-emerald-700 flex items-center gap-1.5">
                    <ChevronRight className="h-4 w-4 text-emerald-600" />
                    <span>Elective Papers</span>
                  </div>
                  <ul className="s5-sublist">
                    <li><b>Elective-I:</b> Mobile Computing</li>
                    <li><b>Elective-II:</b> E-Commerce</li>
                  </ul>
                </div>
              </div>
              <div className="s5-note flex items-start gap-2.5">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="m-0 text-sm leading-relaxed">
                  सभी CSE 5th Semester छात्रों के लिए prescribed papers की external exam में उपस्थित होना अनिवार्य है।
                  अंतिम परीक्षा का प्रश्नपत्र JUT Ranchi द्वारा तैयार किया जाता है।
                </p>
              </div>
            </section>

            {/* PYQ Download */}
            <section className="s5-section" aria-label="Previous year question papers download">
              <h2 className="s5-section-title flex items-center gap-2">
                <Download className="h-5 w-5 text-[#0d6efd]" />
                <span>Download Previous Year Question Papers</span>
              </h2>
              <p className="s5-pyq-intro">
                यहाँ आप Jharkhand Polytechnic Diploma 5th Semester CSE के सभी विषयों के{" "}
                <b>2021–2025 Previous Year Question Papers (PDF)</b> free में डाउनलोड कर सकते हैं।
              </p>

              {years.map((year, yearIndex) => (
                <React.Fragment key={year}>
                <div className="s5-year-box" id={`year-${year}`}>
                  <div className="s5-year-header">
                    <h3 className="s5-year-title flex items-center gap-1.5">
                      <FileText className="h-4.5 w-4.5 text-indigo-600" />
                      <span>{year} – 5th Semester CSE Papers</span>
                    </h3>
                    <div className="s5-year-meta">
                      <button
                        className="s5-share-btn flex items-center gap-1"
                        onClick={() => handleShare(year)}
                        aria-label={`Copy link to ${year} papers`}
                        title="Copy link to this year section"
                      >
                        {copiedYear === year ? (
                          <span>✔ Copied!</span>
                        ) : (
                          <>
                            <Share2 className="h-3.5 w-3.5" />
                            <span>Share</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="s5-table-wrap">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th scope="col" className="text-left font-bold text-white px-3 py-2 bg-blue-600">Subject</th>
                          <th scope="col" className="text-center font-bold text-white px-3 py-2 bg-blue-600">Year</th>
                          <th scope="col" className="text-center font-bold text-white px-3 py-2 bg-blue-600">Branch</th>
                          <th scope="col" className="text-center font-bold text-white px-3 py-2 bg-blue-600">Download</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subjects.map((sub, i) => {
                          const link = getLink(year, sub);
                          const pdfPageUrl = `/resources/jharkhand-diploma/semester-5/pdf?subject=${encodeURIComponent(sub)}&year=${year}`;
                          return (
                            <tr key={i} className={link ? "" : "s5-row-soon"}>
                              <td className="s5-sub-cell">
                                {link ? (
                                  <Link
                                    href={pdfPageUrl}
                                    className="text-slate-900 hover:text-blue-600 hover:underline inline-block font-semibold"
                                    title={`Read & Download ${sub} ${year} PDF`}
                                  >
                                    {sub}
                                  </Link>
                                ) : (
                                  <span>{sub}</span>
                                )}
                              </td>
                              <td className="s5-year-cell">{year}</td>
                              <td>
                                <span className="s5-type-badge branch">CSE</span>
                              </td>
                              <td className="s5-dl-cell">
                                {link ? (
                                  <Link
                                    href={pdfPageUrl}
                                    className="s5-dl-btn inline-flex items-center justify-center gap-1.5"
                                    aria-label={`Read and Download ${sub} ${year} PYQ PDF`}
                                    title={`Preview and download ${sub} ${year} question paper PDF`}
                                  >
                                    <span aria-hidden="true">📥</span>
                                    <span>Download PDF</span>
                                  </Link>
                                ) : (
                                  <span className="s5-soon-tag inline-flex items-center gap-1" aria-label="Uploading soon">
                                    <Clock className="h-3.5 w-3.5" />
                                    <span>Soon</span>
                                  </span>
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

            {/* Study Tips */}
            <section className="s5-section" aria-label="Study tips for 5th semester">
              <h2 className="s5-section-title flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-[#0d6efd]" />
                <span>Study Tips for 5th Semester</span>
              </h2>
              <div className="s5-tips-grid">
                {studyTips.map((t, i) => {
                  const TipIcon = t.icon;
                  return (
                    <div className="s5-tip-card" key={i}>
                      <span className="s5-tip-icon" aria-hidden="true">
                        <TipIcon className="h-5 w-5 text-[#0d6efd]" />
                      </span>
                      <p className="s5-tip-text">{t.tip}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            <div style={{ margin: "18px 0" }}>
              <AdBanner slot="3636692323" />
            </div>

            {/* FAQ */}
            <section className="s5-section" aria-label="Frequently asked questions about Jharkhand Diploma 5th Semester">
              <h2 className="s5-section-title flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-[#0d6efd]" />
                <span>Frequently Asked Questions</span>
              </h2>
              <p className="s5-faq-sub">
                Common questions about Jharkhand Diploma 5th Semester CSE PYQs and JUT Ranchi exams.
              </p>
              <div role="list">
                {faqData.map((faq, i) => (
                  <div className="s5-faq-item" key={i} role="listitem">
                    <button
                      className="s5-faq-btn"
                      onClick={() => toggleFaq(i)}
                      aria-expanded={openFaq === i}
                      aria-controls={`s5-faq-ans-${i}`}
                      id={`s5-faq-q-${i}`}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`s5-faq-chevron ${openFaq === i ? "rotate-180" : ""} h-5 w-5 text-[#0d6efd] transition-transform duration-200`} aria-hidden="true" />
                    </button>
                    <div
                      id={`s5-faq-ans-${i}`}
                      className={`s5-faq-answer ${openFaq === i ? "open" : ""}`}
                      role="region"
                      aria-labelledby={`s5-faq-q-${i}`}
                    >
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </main>

          {/* Sidebar */}
          <aside className="s5-sidebar" aria-label="Quick navigation and exam links">
            <div className="s5-scard">
              <h3 className="s5-scard-title flex items-center gap-1.5 font-bold">
                <BookOpen className="h-4.5 w-4.5 text-indigo-600" />
                <span>Other Semesters</span>
              </h3>
              <nav aria-label="Other diploma semester links">
                {semLinks.map((s) => (
                  <Link key={s.label} href={s.path} className="s5-ql" title={`Jharkhand Diploma ${s.label} PYQ`}>
                    <span>{s.label}</span>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="mb-3"><SidebarAd slot="1675110481" /></div>

            <div className="s5-practice-card s5-scard">
              <h3 className="s5-scard-title font-bold text-white mb-2 flex items-center gap-1.5" style={{ color: "#fff" }}>
                <Zap className="h-4.5 w-4.5 text-yellow-300 fill-yellow-300" />
                <span>Practice Online</span>
              </h3>
              <p className="s5-practice-desc">
                Solve Jharkhand D2D &amp; Polytechnic MCQs interactively with instant feedback and solutions.
              </p>
              <Link href="/exam-preparation/jharkhand-d2d" className="s5-practice-btn" title="Practice Jharkhand D2D PYQs online">
                Practice D2D PYQs →
              </Link>
              <Link
                href="/exam-preparation/jharkhand-polytechnic"
                className="s5-practice-btn s5-pb-ol text-white border border-white/30 hover:bg-white/10"
                title="Practice Jharkhand Polytechnic PYQs online"
                style={{ marginTop: 8 }}
              >
                Practice Polytechnic PYQs →
              </Link>
            </div>

            <div className="s5-scard" style={{ borderLeft: "4px solid #4f46e5" }}>
              <h3 className="s5-scard-title font-bold text-[#4f46e5] mb-3 flex items-center gap-1.5" style={{ color: "#4f46e5" }}>
                <Megaphone className="h-4.5 w-4.5 text-indigo-600" />
                <span>Exam Notifications</span>
              </h3>
              {[
                { dot: "#22c55e", name: "Jharkhand Polytechnic 2026", status: "Registration Started", date: "Last date: 17 June 2026" },
                { dot: "#22c55e", name: "Jharkhand Polytechnic Laterl Entry 2026", status: "Registration Started", date: "Last date: 12 June 2026" },
                { dot: "#22c55e", name: "Jharkhand D2D Btech 2026", status: "Registration Started", date: "Last date: 12 June 2026" },
                { dot: "#f59e0b", name: "Bihar Polytechnic (DCECE)", status: "Registration Started", date: "Last date: 19 April 2026" },
              ].map((n) => (
                <div className="s5-notif-item" key={n.name}>
                  <div className="s5-notif-dot" style={{ background: n.dot }} aria-hidden="true"></div>
                  <div>
                    <div className="s5-notif-name">{n.name}</div>
                    <div className="s5-notif-status">{n.status}</div>
                    <div className="s5-notif-date">{n.date}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-3">
              <SidebarAd slot="4461940407" />
            </div>

            <div className="s5-scard s5-protip-card flex flex-col items-center">
              <div className="mb-2">
                <Lightbulb className="h-6 w-6 text-amber-500 fill-amber-100" />
              </div>
              <p className="s5-protip-text">
                <b>Pro Tip:</b> Repeated questions across years are almost guaranteed to appear again.
                Solve papers from all available years before your exam.
              </p>
            </div>

            <div className="my-3">
              <AdBanner slot="6242297060" />
            </div>
          </aside>
        </div>

        <footer className="s5-footer">
          <p>Last Updated: May 2026</p>
          <p>All PDFs are for educational purposes only and based on previous year data. Futurely does not claim official ownership.</p>
        </footer>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .s5-page {
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
          font-family: inherit;
          background: linear-gradient(180deg, #f0f6ff 0%, #fff 60%);
          min-height: 100vh;
          padding-bottom: 60px;
          box-sizing: border-box;
          overflow-x: hidden;
        }

        *, *::before, *::after { box-sizing: border-box; }

        /* ── HERO ── */
        .s5-hero {
          max-width: 1100px;
          margin: 0px auto 10px;
          padding: 22px 16px 18px;
          text-align: center;
        }
        .s5-hero-title {
          font-size: clamp(1.3rem, 4.5vw, 2.3rem);
          font-weight: 800;
          color: var(--blue);
          margin-bottom: 8px;
          line-height: 1.25;
          word-break: break-word;
        }
        .s5-hero-sub {
          font-size: clamp(.88rem, 2.5vw, 1.08rem);
          color: var(--muted);
          margin-bottom: 12px;
          font-weight: 500;
          word-break: break-word;
        }
        .s5-hero-desc {
          font-size: clamp(.92rem, 2.3vw, 1.05rem);
          color: #374151;
          line-height: 1.7;
          max-width: 1080px;
          margin: 0 auto 10px;
          text-align: left;
        }
        .s5-hero-hindi {
          font-size: clamp(.86rem, 2.1vw, 1rem);
          color: var(--muted);
        }

        /* ── LAYOUT ── */
        .s5-layout {
          display: grid;
          grid-template-columns: 1fr 296px;
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 2px;
          align-items: start;
        }
        @media (max-width: 960px) {
          .s5-layout { grid-template-columns: 1fr; }
          .s5-sidebar { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        }
        @media (max-width: 560px) {
          .s5-sidebar { grid-template-columns: 1fr; }
          .s5-layout { padding: 0 10px; gap: 14px; }
        }

        /* ── SECTION ── */
        .s5-section { margin-bottom: 24px; }
        .s5-section-title {
          font-size: clamp(1rem, 2.8vw, 1.22rem);
          font-weight: 800;
          color: var(--blue);
          margin-bottom: 14px;
          padding-bottom: 8px;
          border-bottom: 2px solid var(--blue-lt);
          word-break: break-word;
        }

        /* ── INFO GRID ── */
        .s5-info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        @media (max-width: 600px) { .s5-info-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 340px) { .s5-info-grid { grid-template-columns: 1fr; } }

        .s5-info-card {
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
        .s5-info-card:hover { box-shadow: var(--sh-md); transform: translateY(-2px); }
        .s5-info-icon  { font-size: 1.35rem; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; }
        .s5-info-label { font-size: clamp(.72rem, 1.7vw, .8rem); color: var(--muted); font-weight: 600; text-transform: uppercase; letter-spacing: .4px; }
        .s5-info-value { font-size: clamp(.84rem, 2vw, 1rem); font-weight: 700; color: var(--text); word-break: break-word; }

        /* ── SUBJECTS BOX ── */
        .s5-subjects-box {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          background: var(--green-lt);
          border: 2px solid var(--green);
          border-radius: var(--r);
          padding: 16px;
          box-shadow: var(--sh-sm);
        }
        @media (max-width: 520px) { .s5-subjects-box { grid-template-columns: 1fr; gap: 10px; } }

        .s5-subject-group-label {
          font-size: clamp(.8rem, 2vw, .88rem);
          font-weight: 800;
          color: var(--green);
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: .4px;
        }
        .s5-sublist {
          margin: 0;
          padding-left: 16px;
          color: #212529;
          font-size: clamp(.88rem, 2.2vw, .97rem);
          line-height: 1.85;
        }
        .s5-note {
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
        .s5-pyq-intro {
          font-size: clamp(.88rem, 2.2vw, .98rem);
          color: #495057;
          text-align: center;
          margin-bottom: 16px;
          line-height: 1.65;
        }

        /* ── YEAR BOX ── */
        .s5-year-box {
          background: linear-gradient(135deg, #e8f0ff, #fff);
          border: 2px solid var(--blue);
          border-radius: var(--r);
          padding: 14px 12px;
          margin-bottom: 18px;
          box-shadow: var(--sh-sm);
          scroll-margin-top: 80px;
          overflow: hidden;
        }
        .s5-year-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }
        .s5-year-title {
          font-size: clamp(.92rem, 2.8vw, 1.08rem);
          font-weight: 800;
          color: var(--blue);
          margin: 0;
          word-break: break-word;
        }
        .s5-year-meta   { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .s5-share-btn {
          background: #f1f5f9;
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 3px 10px;
          font-size: clamp(.74rem, 1.8vw, .84rem);
          font-weight: 700;
          color: var(--muted);
          cursor: pointer;
          transition: background .15s, color .15s;
          white-space: nowrap;
        }
        .s5-share-btn:hover { background: var(--blue-lt); color: var(--blue); }

        /* ── TABLE ── */
        .s5-table-wrap {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          border-radius: 10px;
          border: 1px solid #c8d9f8;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 340px;
          font-size: clamp(.82rem, 2vw, .98rem);
        }
        th {
          background: var(--blue);
          color: #fff;
          padding: 10px 7px;
          font-size: clamp(.76rem, 1.8vw, .92rem);
          font-weight: 700;
          text-align: center;
          white-space: nowrap;
        }
        td {
          background: #f9fbff;
          border: 1px solid #dce8ff;
          padding: 9px 7px;
          text-align: center;
          font-size: clamp(.78rem, 1.8vw, .94rem);
          vertical-align: middle;
        }
        tr:nth-child(even) td { background: #f0f6ff; }
        .s5-row-soon td { opacity: .65; }
        .s5-sub-cell {
          text-align: left !important;
          padding-left: 10px !important;
          font-weight: 600;
          max-width: 160px;
          word-break: break-word;
          white-space: normal;
        }
        .s5-year-cell { font-weight: 700; color: var(--blue); white-space: nowrap; }
        .s5-dl-cell   { white-space: nowrap; }
        .s5-type-badge {
          padding: 2px 8px;
          border-radius: 999px;
          font-size: clamp(.7rem, 1.6vw, .8rem);
          font-weight: 700;
          white-space: nowrap;
        }
        .s5-type-badge.branch { background: #fef3c7; color: #92400e; }

        .s5-dl-btn {
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
        .s5-dl-btn::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 10px;
          background: linear-gradient(120deg, transparent, #00eaff, #6610f2, #00eaff, transparent);
          background-size: 300% 300%;
          animation: s5BorderGlow 2.5s linear infinite;
          z-index: -1;
        }
        .s5-dl-btn::after {
          content: "";
          position: absolute;
          inset: 2px;
          background: linear-gradient(90deg, #0d6efd, #6610f2);
          border-radius: 6px;
          z-index: -1;
        }
        .s5-dl-btn:hover { opacity: .9; color: #fff; }
        @keyframes s5BorderGlow {
          0%   { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
        .s5-soon-tag { font-size: clamp(.72rem, 1.7vw, .86rem); color: #94a3b8; font-style: italic; }

        /* ── TIPS ── */
        .s5-tips-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 520px) { .s5-tips-grid { grid-template-columns: 1fr; } }
        .s5-tip-card {
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
        .s5-tip-card:hover { box-shadow: var(--sh-md); }
        .s5-tip-icon { font-size: 1.35rem; flex-shrink: 0; margin-top: 2px; display: inline-flex; align-items: center; justify-content: center; }
        .s5-tip-text { font-size: clamp(.86rem, 2vw, .96rem); color: #374151; line-height: 1.65; margin: 0; }

        /* ── FAQ ── */
        .s5-faq-sub { font-size: clamp(.86rem, 2vw, .96rem); color: var(--muted); margin-bottom: 14px; }
        .s5-faq-item {
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 14px;
          margin-bottom: 10px;
          overflow: hidden;
          transition: border-color 0.22s ease, box-shadow 0.22s ease;
        }
        .s5-faq-item:hover {
          border-color: rgba(79,70,229,0.25);
          box-shadow: 0 4px 16px rgba(15,23,42,0.05);
        }
        .s5-faq-btn {
          width: 100%;
          background: none;
          border: none;
          text-align: left;
          padding: 16px 18px;
          font-size: clamp(.9rem, 2.2vw, 1.04rem);
          font-weight: 700;
          color: var(--text);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          line-height: 1.4;
        }
        .s5-faq-btn:focus-visible { outline: 3px solid rgba(13,110,253,.35); border-radius: 12px; }
        .s5-faq-chevron {
          flex-shrink: 0;
          color: #4f46e5;
          transition: transform .25s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .s5-faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height .3s ease, padding .3s ease;
          padding: 0 18px;
          color: var(--muted);
          font-size: clamp(.86rem, 2vw, .98rem);
          line-height: 1.75;
          background: transparent;
        }
        .s5-faq-answer.open {
          max-height: 300px;
          padding: 0 18px 18px;
          border-top: 1px solid rgba(0,0,0,0.05);
          padding-top: 12px;
        }

        /* ── SIDEBAR ── */
        .s5-sidebar { display: flex; flex-direction: column; gap: 16px; }
        .s5-scard {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--r);
          padding: 16px;
          box-shadow: var(--sh-sm);
        }
        .s5-scard-title { font-size: clamp(.94rem, 2.2vw, 1.05rem); font-weight: 800; color: var(--text); margin-bottom: 12px; }

        .s5-ql {
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
        .s5-ql:last-child { margin-bottom: 0; }
        .s5-ql:hover { background: var(--blue-lt); border-color: #b6d4fe; color: var(--blue); }

        .s5-practice-card { background: linear-gradient(135deg, #4f46e5, #7c3aed); border: none; }
        .s5-practice-desc { font-size: clamp(.86rem, 2vw, .95rem); color: rgba(255,255,255,.85); margin-bottom: 12px; line-height: 1.5; }
        .s5-practice-btn {
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
        .s5-practice-btn:hover { opacity: .9; color: #4f46e5; }
        .s5-pb-ol { background: rgba(255,255,255,.15); color: #fff; border: 1px solid rgba(255,255,255,.3); }
        .s5-pb-ol:hover { background: rgba(255,255,255,.25); color: #fff; }

        .s5-notif-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--border); }
        .s5-notif-item:last-child { border-bottom: none; padding-bottom: 0; }
        .s5-notif-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }
        .s5-notif-name   { font-size: clamp(.86rem, 2vw, .96rem); font-weight: 700; color: var(--text); }
        .s5-notif-status { font-size: clamp(.78rem, 1.8vw, .88rem); color: #16a34a; font-weight: 600; }
        .s5-notif-date   { font-size: clamp(.74rem, 1.7vw, .84rem); color: var(--muted); }

        .s5-protip-card { background: #fffbeb; border-color: #fde68a; text-align: center; }
        .s5-protip-text { font-size: clamp(.86rem, 2vw, .96rem); color: #374151; line-height: 1.65; margin: 0; }

        /* ── FOOTER ── */
        .s5-footer {
          max-width: 1100px;
          margin: 32px auto 0;
          padding: 16px 16px;
          border-top: 1px solid var(--border);
          text-align: center;
        }
        .s5-footer p { font-size: clamp(.74rem, 1.7vw, .86rem); color: #94a3b8; margin-bottom: 4px; }
        .s5-footer p:last-child { margin-bottom: 0; }

        /* ── SMALL DEVICE OVERRIDES ── */
        @media (max-width: 400px) {
          .s5-hero { margin-top: 22px; padding: 12px 10px 10px; }
          .s5-year-box { padding: 8px 5px; }
          table { font-size: .78rem; min-width: 300px; }
          th { padding: 8px 5px; font-size: .74rem; }
          td { padding: 7px 5px; font-size: .76rem; }
          .s5-dl-btn { font-size: .74rem; padding: 5px 7px; }
          .s5-type-badge { padding: 2px 6px; }
          .s5-sub-cell { max-width: 120px; font-size: .76rem; }
          .s5-faq-btn { padding: 11px 11px; }
          .s5-scard { padding: 12px; }
        }
      ` }} />
    </div>
  );
}
