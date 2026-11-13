"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import { getSem1Link as getLink } from "./Sem1Data";
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
  FlaskConical,
  FileText,
  Share2,
  Download,
  FileDown,
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
    question: "What subjects are in Jharkhand Diploma 1st Semester?",
    answer:
      "Jharkhand Diploma 1st Semester (JUT Ranchi) has 4 core subjects: Engineering Physics, Engineering Chemistry, Engineering Mathematics, plus one branch-specific paper — Mechanical Science & Engineering (Mech/Meta/Auto), Basics of Electrical Power System (EE), Fundamental of Computer (CSE), Electronic Component & Device (ECE), or Basic Surveying (Civil).",
  },
  {
    question: "Which years of 1st Semester PYQs are available to download?",
    answer:
      "PYQs for Jharkhand Diploma 1st Semester are currently available for 2021, 2022, and 2024, with branch-specific papers for 2024. More years and missing subjects are being uploaded regularly on Futurely.",
  },
  {
    question: "Are these PYQ PDFs free to download?",
    answer:
      "Yes, 100% free. No login or payment needed. Just click the Download PDF button next to any subject and the PDF opens directly from Google Drive.",
  },
  {
    question: "Who conducts the Jharkhand Diploma 1st Semester exam?",
    answer:
      "Jharkhand Diploma semester exams are conducted by JUT Ranchi (Jharkhand University of Technology). All polytechnic colleges affiliated with JUT Ranchi follow the same syllabus and question paper pattern.",
  },
  {
    question: "Are branch-specific PYQs also available?",
    answer:
      "Yes. For 2024, branch papers are available for Civil, CSE, Mech/Meta/Auto, Electrical, and Electronics & Communication Engineering alongside the 3 common subjects.",
  },
  {
    question: "How many marks is the 1st Semester exam?",
    answer:
      "Each subject in Jharkhand Diploma 1st Semester is of 100 marks total — 30 marks internal (sessional) and 70 marks external (JUT Ranchi paper). The minimum passing marks for the external exam is 28 out of 70.",
  },
  {
    question: "How should I use PYQs to prepare effectively?",
    answer:
      "Download papers from all available years, identify repeated topics and question patterns, then practice solving them within 3 hours (exam duration). Focus especially on derivations in Physics, reactions in Chemistry, and integration/differentiation in Mathematics.",
  },
  {
    question: "Will more years of PYQs be added in the future?",
    answer:
      "Yes. Futurely regularly uploads new PYQ PDFs. Papers marked as 'Uploading Soon' will be added shortly. Bookmark this page and check back regularly for updates.",
  },
  {
    question: "Where can I download the official 1st Semester syllabus?",
    answer:
      "Use the Download Syllabus button above — it links to the official JUT Ranchi 1st Semester syllabus PDF covering all common and branch-specific subjects.",
  },
];

/* ─────────────────────────────────────────────
   STATIC DATA — paper links live in ./Sem1Data.js (getSem1Link,
   alias-aware). Year/subject row layout stays local to this page.
───────────────────────────────────────────── */
const years = [2025, 2024, 2022];
const subjects = ["Engineering Mathematics", "Engineering Chemistry", "Engineering Physics"];
const branchSubjects = [
  "Civil Engineering",
  "Computer Science Engineering",
  "Mech/ Meta/ Auto Engineering",
  "Electrical Engineering",
  "Electronics & Comm Engineering",
];

// TODO: replace with the actual JUT Ranchi 1st Semester syllabus PDF link
// (Google Drive "view" link works fine, same as the PYQ links in Sem1Data.js)
const SYLLABUS_LINK = "https://drive.google.com/file/d/REPLACE_WITH_SYLLABUS_FILE_ID/view";

const examInfoCards = [
  { icon: School, label: "Conducted By", value: "JUT Ranchi" },
  { icon: ClipboardList, label: "Total Subjects", value: "4 per Semester" },
  { icon: Clock, label: "Duration", value: "3 Hours / Paper" },
  { icon: Award, label: "Total Marks", value: "100 per Subject" },
  { icon: FileCheck, label: "External Marks", value: "70 (pass: 28)" },
  { icon: BarChart2, label: "Internal Marks", value: "30 (Sessional)" },
];

const studyTips = [
  { icon: Target, tip: "Solve PYQs from all available years first — repeated topics carry the most weightage." },
  { icon: BookOpen, tip: "In Mathematics, focus on Integration, Differentiation, and Matrices — asked every year." },
  { icon: FlaskConical, tip: "In Chemistry, electrochemistry and polymers have high repetition across all years." },
  { icon: Lightbulb, tip: "In Physics, optics, current electricity, and semiconductors appear consistently." },
  { icon: Clock, tip: "Practice solving full papers in exactly 3 hours to build exam-day time management." },
  { icon: ClipboardList, tip: "Don't ignore your branch-specific paper — it's equally weighted and equally important." },
];

const semLinks = [
  { label: "2nd Semester", path: "/resources/jharkhand-diploma/semester-2" },
  { label: "3rd Semester — ECE", path: "/resources/jharkhand-diploma/semester-3-ece" },
  { label: "3rd Semester — EE/EEE", path: "/resources/jharkhand-diploma/semester-3-eee" },
  { label: "4th Semester", path: "/resources/jharkhand-diploma/semester-4-mech" },
  { label: "5th Semester", path: "/resources/jharkhand-diploma/semester-5" },
  { label: "6th Semester", path: "/resources/jharkhand-diploma/semester-6" },
];

// Formats "Last Updated" from the most recent build instead of a
// hand-typed string that silently goes stale.
const lastUpdatedLabel = new Date().toLocaleDateString("en-IN", {
  month: "long",
  year: "numeric",
});

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function Sem1Client() {
  const [openFaq, setOpenFaq] = useState(null);
  const [copiedYear, setCopiedYear] = useState(null);

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  const handleShare = (year) => {
    const url = `${window.location.origin}${window.location.pathname}#year-${year}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedYear(year);
        setTimeout(() => setCopiedYear(null), 2000);
      });
    }
  };

  return (
    <div className="w-full px-0">
      <div className="s1-page">

        {/* ── HERO ── */}
        <header className="s1-hero">
          <h1 className="s1-hero-title">Jharkhand Diploma 1st Semester PYQ</h1>
          <p className="s1-hero-sub">
            JUT Ranchi &nbsp;|&nbsp; 2021–2024 &nbsp;|&nbsp; Engineering Physics, Chemistry, Mathematics &amp; Branch Papers
          </p>
          <p className="s1-hero-desc">
            This 1st Semester material has been carefully prepared to help
            Jharkhand Polytechnic Diploma students prepare effectively for
            their examinations.
            <br />
            <span className="s1-hero-hindi">
              इसमें important questions, previous year papers तथा important topics शामिल हैं जिससे semester exam का pattern और topics की clear understanding मिल सके।
            </span>
          </p>
        </header>

        {/* ── MAIN LAYOUT ── */}
        <div className="s1-layout">

          {/* ══ MAIN COLUMN ══ */}
          <main className="s1-main">

            {/* Exam Info */}
            <section className="s1-section" aria-label="Exam information">
              <h2 className="s1-section-title flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-[#0d6efd]" />
                <span>Exam Information</span>
              </h2>
              <div className="s1-info-grid">
                {examInfoCards.map((c) => {
                  const CardIcon = c.icon;
                  return (
                    <div className="s1-info-card" key={c.label}>
                      <span className="s1-info-icon" aria-hidden="true">
                        <CardIcon className="h-5 w-5 text-indigo-600" />
                      </span>
                      <div>
                        <div className="s1-info-label">{c.label}</div>
                        <div className="s1-info-value">{c.value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Subjects */}
            <section className="s1-section" aria-label="1st semester subjects">
              <h2 className="s1-section-title flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#0d6efd]" />
                <span>Subjects of 1st Semester (Total 4)</span>
              </h2>
              <div className="s1-subjects-box">
                <div className="s1-subjects-col">
                  <div className="s1-subject-group-label flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 text-emerald-600" />
                    <span>Common Subjects (All Branches)</span>
                  </div>
                  <ul className="s1-sublist">
                    <li>Engineering Physics</li>
                    <li>Engineering Chemistry</li>
                    <li>Engineering Mathematics</li>
                  </ul>
                </div>
                <div className="s1-subjects-col">
                  <div className="s1-subject-group-label flex items-center gap-1.5">
                    <ChevronRight className="h-4 w-4 text-emerald-600" />
                    <span>Branch-Specific Subjects</span>
                  </div>
                  <ul className="s1-sublist">
                    <li><b>Mech/Meta/Auto:</b> Mechanical Science &amp; Engineering</li>
                    <li><b>EE:</b> Basics of Electrical Power System</li>
                    <li><b>CSE:</b> Fundamental of Computer</li>
                    <li><b>ECE:</b> Electronic Component &amp; Device</li>
                    <li><b>Civil:</b> Basic Surveying</li>
                  </ul>
                </div>
              </div>
              <div className="s1-note flex items-start gap-2.5">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="m-0 text-sm leading-relaxed">
                  सभी 1st Semester छात्रों के लिए इन 4 विषयों की External Exam में उपस्थित होना अनिवार्य है।
                  अंतिम परीक्षा का प्रश्नपत्र JUT Ranchi द्वारा तैयार किया जाता है।
                </p>
              </div>
            </section>

            {/* Syllabus Download */}
            <section className="s1-section" aria-label="Download 1st semester syllabus">
              <div className="s1-syllabus-card">
                <div className="s1-syllabus-info flex items-center gap-3">
                  <span className="s1-syllabus-icon" aria-hidden="true">
                    <FileDown className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="s1-syllabus-title">Jharkhand Diploma 1st Semester Syllabus</h3>
                    <p className="s1-syllabus-desc">
                      Official JUT Ranchi syllabus PDF — covers all common &amp; branch-specific subjects with unit-wise topics.
                    </p>
                  </div>
                </div>
                <a
                  href={SYLLABUS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="s1-syllabus-btn inline-flex items-center justify-center gap-1.5"
                  title="Download 1st Semester syllabus PDF"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Syllabus PDF</span>
                </a>
              </div>
            </section>

            {/* PYQ Tables */}
            <section className="s1-section" aria-label="Previous year question papers download">
              <h2 className="s1-section-title flex items-center gap-2">
                <Download className="h-5 w-5 text-[#0d6efd]" />
                <span>Download Previous Year Question Papers</span>
              </h2>
              <p className="s1-pyq-intro">
                यहाँ आप Jharkhand Polytechnic Diploma 1st Semester के सभी विषयों के{" "}
                <b>2021–2024 Previous Year Question Papers (PDF)</b> free में डाउनलोड कर सकते हैं।
              </p>

              {years.map((year, yearIndex) => {
                const rowSubs = [...subjects, ...(year === 2024 ? branchSubjects : [])];
                return (
                  <React.Fragment key={year}>
                  <div className="s1-year-box" id={`year-${year}`}>
                    <div className="s1-year-header">
                      <h3 className="s1-year-title flex items-center gap-1.5">
                        <FileText className="h-4.5 w-4.5 text-indigo-600" />
                        <span>{year} – 1st Semester Papers</span>
                      </h3>
                      <div className="s1-year-meta">
                        <button
                          className="s1-share-btn flex items-center gap-1"
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

                    <div className="s1-table-wrap">
                      <table>
                        <thead>
                          <tr>
                            <th scope="col">Subject</th>
                            <th scope="col">Year</th>
                            <th scope="col">Type</th>
                            <th scope="col">Download</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rowSubs.map((sub, i) => {
                            const link = getLink(year, sub);
                            const isCommon = subjects.includes(sub);
                            const pdfPageUrl = `/resources/jharkhand-diploma/semester-1/pdf?subject=${encodeURIComponent(sub)}&year=${year}`;
                            return (
                              <tr key={i} className={link ? "" : "s1-row-soon"}>
                                <td className="s1-sub-cell">
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
                                <td className="s1-year-cell">{year}</td>
                                <td>
                                  <span className={`s1-type-badge ${isCommon ? "common" : "branch"}`}>
                                    {isCommon ? "Common" : "Branch"}
                                  </span>
                                </td>
                                <td className="s1-dl-cell">
                                  {link ? (
                                    <Link
                                      href={pdfPageUrl}
                                      className="s1-dl-btn inline-flex items-center justify-center gap-1.5"
                                      aria-label={`Read and Download ${sub} ${year} PYQ PDF`}
                                      title={`Preview and download ${sub} ${year} question paper PDF`}
                                    >
                                      <span aria-hidden="true">📥</span>
                                      <span>Download PDF</span>
                                    </Link>
                                  ) : (
                                    <span className="s1-soon-tag inline-flex items-center gap-1" aria-label="Uploading soon">
                                      <Clock className="h-3.5 w-3.5" />
                                      <span>Uploading Soon</span>
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

                  {/* Ad between year sections — gaps 1/2/3 = 6247445156 / 8194031779 / 8948710243 */}
                  {yearIndex < years.length - 1 && yearIndex < 3 && (
                    <div style={{ margin: "18px 0" }}>
                      <AdBanner yearGap={yearIndex} />
                    </div>
                  )}
                  </React.Fragment>
                );
              })}
            </section>

            <div style={{ margin: "18px 0" }}>
              <AdBanner slot="8679502538" format="fluid" layout="in-article" />
            </div>

            {/* Study Tips */}
            <section className="s1-section" aria-label="Study tips for 1st semester">
              <h2 className="s1-section-title flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-[#0d6efd]" />
                <span>Study Tips for 1st Semester</span>
              </h2>
              <div className="s1-tips-grid">
                {studyTips.map((t, i) => {
                  const TipIcon = t.icon;
                  return (
                    <div className="s1-tip-card" key={i}>
                      <span className="s1-tip-icon" aria-hidden="true">
                        <TipIcon className="h-5 w-5 text-[#0d6efd]" />
                      </span>
                      <p className="s1-tip-text">{t.tip}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            <div style={{ margin: "18px 0" }}>
              <AdBanner slot="3636692323" />
            </div>

            {/* FAQ */}
            <section className="s1-section" aria-label="Frequently asked questions about Jharkhand Diploma 1st Semester">
              <h2 className="s1-section-title flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-[#0d6efd]" />
                <span>Frequently Asked Questions</span>
              </h2>
              <p className="s1-faq-sub">
                Common questions about Jharkhand Diploma 1st Semester PYQs and JUT Ranchi exams.
              </p>
              <div role="list">
                {faqData.map((faq, i) => (
                  <div className="s1-faq-item" key={i} role="listitem">
                    <button
                      className="s1-faq-btn"
                      onClick={() => toggleFaq(i)}
                      aria-expanded={openFaq === i}
                      aria-controls={`s1-faq-ans-${i}`}
                      id={`s1-faq-q-${i}`}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`s1-faq-chevron ${openFaq === i ? "open" : ""} h-5 w-5`} aria-hidden="true" />
                    </button>
                    <div
                      id={`s1-faq-ans-${i}`}
                      className={`s1-faq-answer ${openFaq === i ? "open" : ""}`}
                      role="region"
                      aria-labelledby={`s1-faq-q-${i}`}
                    >
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div style={{ margin: "18px 0" }}>
              <AdBanner slot="6242297060" format="auto" />
            </div>

          </main>

          {/* ══ SIDEBAR ══ */}
          <aside className="s1-sidebar" aria-label="Quick navigation and exam links">

            {/* Other Semesters */}
            <div className="s1-scard">
              <h3 className="s1-scard-title flex items-center gap-1.5">
                <BookOpen className="h-4.5 w-4.5 text-indigo-600" />
                <span>Other Semesters</span>
              </h3>
              <nav aria-label="Other diploma semester links">
                {semLinks.map((s) => (
                  <Link key={s.label} href={s.path} className="s1-ql" title={`Jharkhand Diploma ${s.label} PYQ`}>
                    <span>{s.label}</span>
                    <ChevronRight className="s1-ql-arrow h-4 w-4" />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="mb-3"><SidebarAd slot="1675110481" /></div>

            {/* Practice Online */}
            <div className="s1-scard s1-practice-card">
              <h3 className="s1-scard-title flex items-center gap-1.5" style={{ color: "#fff" }}>
                <Zap className="h-4.5 w-4.5 text-yellow-300 fill-yellow-300" />
                <span>Practice Online</span>
              </h3>
              <p className="s1-practice-desc">
                Solve Jharkhand D2D &amp; Polytechnic MCQs interactively with instant feedback and solutions.
              </p>
              <Link href="/exam-preparation/jharkhand-d2d" className="s1-practice-btn" title="Practice Jharkhand D2D PYQs online">Practice D2D PYQs →</Link>
              <Link href="/exam-preparation/jharkhand-polytechnic" className="s1-practice-btn s1-pb-ol" title="Practice Jharkhand Polytechnic PYQs online" style={{ marginTop: 8 }}>Practice Polytechnic PYQs →</Link>
            </div>

            {/* Exam Notifications */}
            <div className="s1-scard" style={{ borderLeft: "4px solid #4f46e5" }}>
              <h3 className="s1-scard-title flex items-center gap-1.5" style={{ color: "#4f46e5" }}>
                <Megaphone className="h-4.5 w-4.5 text-indigo-600" />
                <span>Exam Notifications</span>
              </h3>
              {[
                { dot: "#22c55e", name: "Jharkhand Polytechnic 2026", status: "Registration Started", date: "Last date: 17 June 2026" },
                { dot: "#22c55e", name: "Jharkhand Polytechnic Laterl Entry 2026", status: "Registration Started", date: "Last date: 12 June 2026" },
                { dot: "#22c55e", name: "Jharkhand D2D Btech 2026", status: "Registration Started", date: "Last date: 12 June 2026" },
                { dot: "#f59e0b", name: "Bihar Polytechnic (DCECE)", status: "Registration Started", date: "Last date: 19 April 2026" },
              ].map((n) => (
                <div className="s1-notif-item" key={n.name}>
                  <div className="s1-notif-dot" style={{ background: n.dot }} aria-hidden="true"></div>
                  <div>
                    <div className="s1-notif-name">{n.name}</div>
                    <div className="s1-notif-status">{n.status}</div>
                    <div className="s1-notif-date">{n.date}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pro Tip */}
            <div className="s1-scard s1-protip-card">
              <div style={{ fontSize: "1.6rem", marginBottom: "8px" }}>
                <Lightbulb className="h-6 w-6 text-amber-500 fill-amber-100 mx-auto" />
              </div>
              <p className="s1-protip-text">
                <b>Pro Tip:</b> Repeated questions across years are almost guaranteed to appear again.
                Solve papers from all available years before your exam.
              </p>
            </div>



          </aside>
        </div>

        {/* ── FOOTER ── */}
        <footer className="s1-footer">
          <p>Last Updated: {lastUpdatedLabel}</p>
          <p>All PDFs are for educational purposes only and based on previous year data. Futurely does not claim official ownership.</p>
        </footer>

      </div>

      {/* ══════════════════════════════════════════
          STYLES — ported verbatim from the react-bootstrap
          version (Sem1.jsx) so both implementations render
          identically.
      ══════════════════════════════════════════ */}
      <style dangerouslySetInnerHTML={{ __html: `

        .s1-page {
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

        *, *::before, *::after { box-sizing: border-box; }

        /* ── HERO ── */
        .s1-hero {
          max-width: 1100px;
          margin: 0px auto 10px;
          padding: 22px 16px 18px;
          text-align: center;
        }
        .s1-hero-title {
          font-size: clamp(1.3rem, 4.5vw, 2.3rem);
          font-weight: 800;
          color: var(--blue);
          margin-bottom: 8px;
          line-height: 1.25;
          word-break: break-word;
        }
        .s1-hero-sub {
          font-size: clamp(.88rem, 2.5vw, 1.08rem);
          color: var(--muted);
          margin-bottom: 12px;
          font-weight: 500;
          word-break: break-word;
        }
        .s1-hero-desc {
          font-size: clamp(.92rem, 2.3vw, 1.05rem);
          color: #374151;
          line-height: 1.7;
          max-width: 1080px;
          margin: 0 auto 10px;
          text-align: left;
        }
        .s1-hero-hindi {
          font-size: clamp(.86rem, 2.1vw, 1rem);
          color: var(--muted);
        }
        /* ── LAYOUT ── */
        .s1-layout {
          display: grid;
          grid-template-columns: 1fr 296px;
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 2px;
          align-items: start;
        }
        @media (max-width: 960px) {
          .s1-layout { grid-template-columns: 1fr; }
          .s1-sidebar { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        }
        @media (max-width: 560px) {
          .s1-sidebar { grid-template-columns: 1fr; }
          .s1-layout { padding: 0 10px; gap: 14px; }
        }

        /* ── SECTION ── */
        .s1-section { margin-bottom: 24px; }
        .s1-section-title {
          font-size: clamp(1rem, 2.8vw, 1.22rem);
          font-weight: 800;
          color: var(--blue);
          margin-bottom: 14px;
          padding-bottom: 8px;
          border-bottom: 2px solid var(--blue-lt);
          word-break: break-word;
        }

        /* ── INFO GRID ── */
        .s1-info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        @media (max-width: 600px) { .s1-info-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 340px) { .s1-info-grid { grid-template-columns: 1fr; } }

        .s1-info-card {
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
        .s1-info-card:hover { box-shadow: var(--sh-md); transform: translateY(-2px); }
        .s1-info-icon  { font-size: 1.35rem; flex-shrink: 0; }
        .s1-info-label { font-size: clamp(.72rem, 1.7vw, .8rem); color: var(--muted); font-weight: 600; text-transform: uppercase; letter-spacing: .4px; }
        .s1-info-value { font-size: clamp(.84rem, 2vw, 1rem); font-weight: 700; color: var(--text); word-break: break-word; }

        /* ── SUBJECTS BOX ── */
        .s1-subjects-box {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          background: var(--green-lt);
          border: 2px solid var(--green);
          border-radius: var(--r);
          padding: 16px;
          box-shadow: var(--sh-sm);
        }
        @media (max-width: 520px) { .s1-subjects-box { grid-template-columns: 1fr; gap: 10px; } }

        .s1-subject-group-label {
          font-size: clamp(.8rem, 2vw, .88rem);
          font-weight: 800;
          color: var(--green);
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: .4px;
        }
        .s1-sublist {
          margin: 0;
          padding-left: 16px;
          color: #212529;
          font-size: clamp(.88rem, 2.2vw, .97rem);
          line-height: 1.85;
        }
        .s1-note {
          margin-top: 12px;
          background: #fff7e6;
          border-left: 4px solid #ffc107;
          padding: 10px 12px;
          border-radius: 10px;
          font-size: clamp(.86rem, 2vw, .96rem);
          color: #374151;
          line-height: 1.6;
        }

        /* ── SYLLABUS CARD ── */
        .s1-syllabus-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
          background: linear-gradient(135deg, #e6ffed, #fff);
          border: 2px solid var(--green);
          border-radius: var(--r);
          padding: 16px;
          box-shadow: var(--sh-sm);
        }
        .s1-syllabus-info { flex: 1 1 260px; min-width: 0; }
        .s1-syllabus-icon {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: var(--green);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .s1-syllabus-title {
          font-size: clamp(.94rem, 2.4vw, 1.08rem);
          font-weight: 800;
          color: var(--text);
          margin: 0 0 4px;
        }
        .s1-syllabus-desc {
          font-size: clamp(.82rem, 2vw, .92rem);
          color: var(--muted);
          margin: 0;
          line-height: 1.55;
        }
        .s1-syllabus-btn {
          flex-shrink: 0;
          background: var(--green);
          color: #fff;
          padding: 10px 18px;
          border-radius: 10px;
          font-size: clamp(.84rem, 2vw, .94rem);
          font-weight: 700;
          text-decoration: none;
          white-space: nowrap;
          transition: opacity .15s;
        }
        .s1-syllabus-btn:hover { opacity: .9; color: #fff; }

        /* ── PYQ INTRO ── */
        .s1-pyq-intro {
          font-size: clamp(.88rem, 2.2vw, .98rem);
          color: #495057;
          text-align: center;
          margin-bottom: 16px;
          line-height: 1.65;
        }

        /* ── YEAR BOX ── */
        .s1-year-box {
          background: linear-gradient(135deg, #e8f0ff, #fff);
          border: 2px solid var(--blue);
          border-radius: var(--r);
          padding: 14px 12px;
          margin-bottom: 18px;
          box-shadow: var(--sh-sm);
          scroll-margin-top: 80px;
          overflow: hidden;
        }
        .s1-year-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }
        .s1-year-title {
          font-size: clamp(.92rem, 2.8vw, 1.08rem);
          font-weight: 800;
          color: var(--blue);
          margin: 0;
          word-break: break-word;
        }
        .s1-year-meta   { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .s1-share-btn {
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
        .s1-share-btn:hover { background: var(--blue-lt); color: var(--blue); }

        /* ── TABLE ── */
        .s1-table-wrap {
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
        .s1-row-soon td { opacity: .65; }
        .s1-sub-cell {
          text-align: left !important;
          padding-left: 10px !important;
          font-weight: 600;
          max-width: 160px;
          word-break: break-word;
          white-space: normal;
        }
        .s1-year-cell { font-weight: 700; color: var(--blue); white-space: nowrap; }
        .s1-dl-cell   { white-space: nowrap; }
        .s1-type-badge {
          padding: 2px 8px;
          border-radius: 999px;
          font-size: clamp(.7rem, 1.6vw, .8rem);
          font-weight: 700;
          white-space: nowrap;
        }
        .s1-type-badge.common { background: #dbeafe; color: #1d4ed8; }
        .s1-type-badge.branch { background: #fef3c7; color: #92400e; }

        /* ── DOWNLOAD BUTTON ── */
        .s1-dl-btn {
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
        .s1-dl-btn::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 10px;
          background: linear-gradient(120deg, transparent, #00eaff, #6610f2, #00eaff, transparent);
          background-size: 300% 300%;
          animation: s1BorderGlow 2.5s linear infinite;
          z-index: -1;
        }
        .s1-dl-btn::after {
          content: "";
          position: absolute;
          inset: 2px;
          background: linear-gradient(90deg, #0d6efd, #6610f2);
          border-radius: 6px;
          z-index: -1;
        }
        .s1-dl-btn:hover { opacity: .9; color: #fff; }
        @keyframes s1BorderGlow {
          0%   { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
        .s1-soon-tag { font-size: clamp(.72rem, 1.7vw, .86rem); color: #94a3b8; font-style: italic; }

        /* ── TIPS ── */
        .s1-tips-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 520px) { .s1-tips-grid { grid-template-columns: 1fr; } }
        .s1-tip-card {
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
        .s1-tip-card:hover { box-shadow: var(--sh-md); }
        .s1-tip-icon { font-size: 1.3rem; flex-shrink: 0; margin-top: 1px; }
        .s1-tip-text { font-size: clamp(.86rem, 2vw, .96rem); color: #374151; line-height: 1.65; margin: 0; }

        /* ── FAQ ── */
        .s1-faq-sub { font-size: clamp(.86rem, 2vw, .96rem); color: var(--muted); margin-bottom: 14px; }
        .s1-faq-item {
          background: var(--blue-lt);
          border: 1px solid #c7d9f8;
          border-radius: 12px;
          margin-bottom: 8px;
          overflow: hidden;
          transition: box-shadow .2s;
        }
        .s1-faq-item:hover { box-shadow: 0 4px 16px rgba(13,110,253,.12); }
        .s1-faq-btn {
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
        }
        .s1-faq-btn:focus-visible { outline: 3px solid rgba(13,110,253,.35); border-radius: 12px; }
        .s1-faq-chevron {
          flex-shrink: 0;
          color: var(--blue);
          font-size: 20px;
          line-height: 1;
          transition: transform .25s;
          display: inline-block;
        }
        .s1-faq-chevron.open { transform: rotate(180deg); }
        .s1-faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height .3s ease, padding .3s ease;
          padding: 0 15px;
          color: var(--muted);
          font-size: clamp(.86rem, 2vw, .98rem);
          line-height: 1.75;
        }
        .s1-faq-answer.open { max-height: 300px; padding: 0 15px 15px; }

        /* ── SIDEBAR ── */
        .s1-sidebar { display: flex; flex-direction: column; gap: 16px; }
        .s1-scard {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--r);
          padding: 16px;
          box-shadow: var(--sh-sm);
        }
        .s1-scard-title { font-size: clamp(.94rem, 2.2vw, 1.05rem); font-weight: 800; color: var(--text); margin-bottom: 12px; }

        .s1-ql {
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
        .s1-ql:last-child { margin-bottom: 0; }
        .s1-ql:hover { background: var(--blue-lt); border-color: #b6d4fe; color: var(--blue); }
        .s1-ql-arrow { color: #94a3b8; font-size: 18px; }

        .s1-practice-card { background: linear-gradient(135deg, #4f46e5, #7c3aed); border: none; }
        .s1-practice-desc { font-size: clamp(.86rem, 2vw, .95rem); color: rgba(255,255,255,.85); margin-bottom: 12px; line-height: 1.5; }
        .s1-practice-btn {
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
        .s1-practice-btn:hover { opacity: .9; color: #4f46e5; }
        .s1-pb-ol { background: rgba(255,255,255,.15); color: #fff; border: 1px solid rgba(255,255,255,.3); }
        .s1-pb-ol:hover { background: rgba(255,255,255,.25); color: #fff; }

        .s1-notif-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--border); }
        .s1-notif-item:last-child { border-bottom: none; padding-bottom: 0; }
        .s1-notif-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }
        .s1-notif-name   { font-size: clamp(.86rem, 2vw, .96rem); font-weight: 700; color: var(--text); }
        .s1-notif-status { font-size: clamp(.78rem, 1.8vw, .88rem); color: #16a34a; font-weight: 600; }
        .s1-notif-date   { font-size: clamp(.74rem, 1.7vw, .84rem); color: var(--muted); }

        .s1-protip-card { background: #fffbeb; border-color: #fde68a; text-align: center; }
        .s1-protip-text { font-size: clamp(.86rem, 2vw, .96rem); color: #374151; line-height: 1.65; margin: 0; }

        /* ── FOOTER ── */
        .s1-footer {
          max-width: 1100px;
          margin: 32px auto 0;
          padding: 16px 16px;
          border-top: 1px solid var(--border);
          text-align: center;
        }
        .s1-footer p { font-size: clamp(.74rem, 1.7vw, .86rem); color: #94a3b8; margin-bottom: 4px; }
        .s1-footer p:last-child { margin-bottom: 0; }

        /* ── SMALL DEVICE OVERRIDES ── */
        @media (max-width: 400px) {
          .s1-hero { margin-top: 22px; padding: 12px 10px 10px; }
          .s1-year-box { padding: 8px 5px; }
          table { font-size: .78rem; min-width: 300px; }
          th { padding: 8px 5px; font-size: .74rem; }
          td { padding: 7px 5px; font-size: .76rem; }
          .s1-dl-btn { font-size: .74rem; padding: 5px 7px; }
          .s1-type-badge {padding: 2px 6px;}
          .s1-sub-cell { max-width: 120px; font-size: .76rem; }
          .s1-faq-btn { padding: 11px 11px; }
          .s1-scard { padding: 12px; }
          .s1-syllabus-card { flex-direction: column; align-items: stretch; text-align: center; }
          .s1-syllabus-info { flex-direction: column; text-align: center; }
          .s1-syllabus-btn { width: 100%; }
        }
        .s1-sidebar-ad {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--r);
          overflow: hidden;
          box-shadow: var(--sh-sm);
          min-height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      ` }} />
    </div>
  );
}