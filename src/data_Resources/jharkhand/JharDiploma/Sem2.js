"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";
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
  AlertTriangle,
  Leaf,
} from "lucide-react";
import {
  SEM2_COMMON_SUBJECTS,
  SEM2_BRANCH_SUBJECTS,
  SEM2_YEARS,
  getSem2Link,
} from "./Sem2Data";

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
    question: "What subjects are in Jharkhand Diploma 2nd Semester?",
    answer:
      "Jharkhand Diploma 2nd Semester (JUT Ranchi) has 4 core subjects: Project Management Skill, Statistics and Analytics, Fundamental of Electrical & Electronic Engineering, and Environmental Sustainability — plus one branch-specific paper: Python Programming (CSE), Construction Material (Civil/Architecture/Interior Design), or Transformer and Alternators (Electrical Engg & EEE).",
  },
  {
    question: "Which years of 2nd Semester PYQs are available to download?",
    answer:
      "PYQs for Jharkhand Diploma 2nd Semester are currently available for 2021, 2022, 2023, 2024, and 2025. More years and missing subjects are being uploaded regularly on Futurely.",
  },
  {
    question: "Are these PYQ PDFs free to download?",
    answer:
      "Yes, 100% free. No login or payment needed. Just click the Download PDF button next to any subject and the PDF opens directly from Google Drive.",
  },
  {
    question: "Who conducts the Jharkhand Diploma 2nd Semester exam?",
    answer:
      "Jharkhand Diploma semester exams are conducted by JUT Ranchi (Jharkhand University of Technology). All polytechnic colleges affiliated with JUT Ranchi follow the same syllabus and question paper pattern.",
  },
  {
    question: "Are branch-specific PYQs also available for 2nd Semester?",
    answer:
      "Yes. Branch papers are available for CSE (Python Programming), Civil/Architecture/Interior Design (Construction Material), and Electrical Engineering & EEE (Transformer and Alternators), alongside the 4 common subjects.",
  },
  {
    question: "How many marks is the 2nd Semester exam?",
    answer:
      "Each subject in Jharkhand Diploma 2nd Semester is of 100 marks total — 30 marks internal (sessional) and 70 marks external (JUT Ranchi paper). The minimum passing marks for the external exam is 28 out of 70.",
  },
  {
    question: "How should I use PYQs to prepare for 2nd Semester effectively?",
    answer:
      "Download papers from all available years, identify repeated topics and question patterns, then practice solving them within 3 hours (exam duration). For Statistics focus on mean/median/mode and probability; for Electrical & Electronics focus on Ohm's law, transformers, and basic circuits; for Project Management focus on planning tools like CPM and PERT.",
  },
  {
    question: "Will more years of PYQs be added in the future?",
    answer:
      "Yes. Futurely regularly uploads new PYQ PDFs. Papers marked as 'Uploading Soon' will be added shortly. Bookmark this page and check back regularly for updates.",
  },
];

/* ─────────────────────────────────────────────
   STATIC DATA
───────────────────────────────────────────── */
const years = SEM2_YEARS;
const subjects = SEM2_COMMON_SUBJECTS;
const branchSubjects = SEM2_BRANCH_SUBJECTS;
const getLink = getSem2Link;

const examInfoCards = [
  { icon: School, label: "Conducted By", value: "JUT Ranchi" },
  { icon: ClipboardList, label: "Total Subjects", value: "5 per Semester" },
  { icon: Clock, label: "Duration", value: "3 Hours / Paper" },
  { icon: Award, label: "Total Marks", value: "100 per Subject" },
  { icon: FileCheck, label: "External Marks", value: "70 (pass: 28)" },
  { icon: BarChart2, label: "Internal Marks", value: "30 (Sessional)" },
];

const studyTips = [
  { icon: Target, tip: "Solve PYQs from all available years first — repeated topics carry the most weightage in the exam." },
  { icon: BarChart2, tip: "In Statistics & Analytics, focus on Mean, Median, Mode, Standard Deviation, and Probability — asked every year." },
  { icon: Zap, tip: "In Fundamental of Electrical & Electronic Engg, Ohm's Law, Kirchhoff's Laws, and basic circuit analysis are must-knows." },
  { icon: Leaf, tip: "In Environmental Sustainability, topics like pollution types, waste management, and green energy are highly repeated." },
  { icon: ClipboardList, tip: "In Project Management Skill, CPM, PERT, Gantt charts, and project lifecycle questions appear every year." },
  { icon: Clock, tip: "Practice solving full papers within exactly 3 hours to build exam-day time management skills." },
  { icon: Target, tip: "CSE students: Python syntax, loops, functions, and basic data structures are the most tested topics." },
  { icon: School, tip: "Civil students: Study properties of cement, concrete, bricks, steel, and timber thoroughly for Construction Material." },
  { icon: Zap, tip: "Electrical students: Understand transformer working principle, EMF equation, and alternator types for branch paper." },
];

const semLinks = [
  { label: "1st Semester", path: "/resources/jharkhand-diploma/semester-1" },
  { label: "3rd Semester — ECE", path: "/resources/jharkhand-diploma/semester-3-ece" },
  { label: "3rd Semester — EE/EEE", path: "/resources/jharkhand-diploma/semester-3-eee" },
  { label: "4th Semester", path: "/resources/jharkhand-diploma/semester-4-mech" },
  { label: "5th Semester", path: "/resources/jharkhand-diploma/semester-5" },
  { label: "6th Semester", path: "/resources/jharkhand-diploma/semester-6" },
];

export default function Sem2Client() {
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
      <div className="s2-page">

        {/* ── HERO ── */}
        <header className="s2-hero">
          <h1 className="s2-hero-title">Jharkhand Diploma 2nd Semester PYQ</h1>
          <p className="s2-hero-sub">
            JUT Ranchi &nbsp;|&nbsp; 2021–2025 &nbsp;|&nbsp; Project Management, Statistics, Electrical &amp; Electronic Engg, Environmental Sustainability &amp; Branch Papers
          </p>
          <p className="s2-hero-desc">
            This 2nd Semester material has been carefully prepared to help
            Jharkhand Polytechnic Diploma students prepare effectively for
            their examinations.
            <br />
            <span className="s2-hero-hindi">
              इसमें important questions, previous year papers तथा important topics शामिल हैं जिससे semester exam का pattern और topics की clear understanding मिल सके।
            </span>
          </p>
        </header>

        {/* ── MAIN LAYOUT ── */}
        <div className="s2-layout">

          {/* ══ MAIN COLUMN ══ */}
          <main className="s2-main">

            {/* Exam Info */}
            <section className="s2-section" aria-label="Exam information">
              <h2 className="s2-section-title flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-[#0d6efd]" />
                <span>Exam Information</span>
              </h2>
              <div className="s2-info-grid">
                {examInfoCards.map((c) => {
                  const CardIcon = c.icon;
                  return (
                    <div className="s2-info-card" key={c.label}>
                      <span className="s2-info-icon" aria-hidden="true">
                        <CardIcon className="h-5 w-5 text-indigo-600" />
                      </span>
                      <div>
                        <div className="s2-info-label">{c.label}</div>
                        <div className="s2-info-value">{c.value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Subjects */}
            <section className="s2-section" aria-label="2nd semester subjects">
              <h2 className="s2-section-title flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#0d6efd]" />
                <span>Subjects of 2nd Semester (Total 5)</span>
              </h2>
              <div className="s2-subjects-box">
                <div className="s2-subjects-col">
                  <div className="s2-subject-group-label flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 text-emerald-600" />
                    <span>Common Subjects (All Branches)</span>
                  </div>
                  <ul className="s2-sublist">
                    <li>Project Management Skill</li>
                    <li>Statistics and Analytics</li>
                    <li>Fundamental of Electrical &amp; Electronic Engineering</li>
                    <li>Environmental Sustainability</li>
                  </ul>
                </div>
                <div className="s2-subjects-col">
                  <div className="s2-subject-group-label flex items-center gap-1.5">
                    <ChevronRight className="h-4 w-4 text-emerald-600" />
                    <span>Branch-Specific Subjects</span>
                  </div>
                  <ul className="s2-sublist">
                    <li><b>CSE:</b> Python Programming</li>
                    <li><b>Civil / Architecture / Interior Design:</b> Construction Material</li>
                    <li><b>Electrical Engg &amp; EEE:</b> Transformer and Alternators</li>
                    <li><b>Mechanical / Automobile / Metallurgy:</b> Materials for Engineering</li>
                    <li><b>Electronics ECE:</b> Digital Electronics</li>
                  </ul>
                </div>
              </div>
              <div className="s2-note flex items-start gap-2.5">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="m-0 text-sm leading-relaxed">
                  सभी 2nd Semester छात्रों के लिए इन 5 विषयों की External Exam में उपस्थित होना अनिवार्य है।
                  अंतिम परीक्षा का प्रश्नपत्र JUT Ranchi द्वारा तैयार किया जाता है।
                </p>
              </div>
            </section>

            {/* PYQ Tables */}
            <section className="s2-section" aria-label="Previous year question papers download">
              <h2 className="s2-section-title flex items-center gap-2">
                <Download className="h-5 w-5 text-[#0d6efd]" />
                <span>Download Previous Year Question Papers</span>
              </h2>
              <p className="s2-pyq-intro">
                यहाँ आप Jharkhand Polytechnic Diploma 2nd Semester के सभी विषयों के{" "}
                <b>2021–2025 Previous Year Question Papers (PDF)</b> free में डाउनलोड कर सकते हैं।
              </p>

              {years.map((year, yearIndex) => {
                return (
                  <React.Fragment key={year}>
                  <div className="s2-year-box" id={`year-${year}`}>
                    <div className="s2-year-header">
                      <h3 className="s2-year-title flex items-center gap-1.5">
                        <FileText className="h-4.5 w-4.5 text-indigo-600" />
                        <span>{year} – 2nd Semester Papers</span>
                      </h3>
                      <div className="s2-year-meta">
                        <button
                          className="s2-share-btn flex items-center gap-1"
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

                    <div className="s2-table-wrap">
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
                          {/* ── Common Subject Rows ── */}
                          {subjects.map((sub, i) => {
                            const link = getLink(year, sub);
                            const pdfPageUrl = `/resources/jharkhand-diploma/semester-2/pdf?subject=${encodeURIComponent(sub)}&year=${year}`;
                            return (
                              <tr key={`common-${i}`} className={link ? "" : "s2-row-soon"}>
                                <td className="s2-sub-cell">
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
                                <td className="s2-year-cell">{year}</td>
                                <td>
                                  <span className="s2-type-badge common">Common</span>
                                </td>
                                <td className="s2-dl-cell">
                                  {link ? (
                                    <Link
                                      href={pdfPageUrl}
                                      className="s2-dl-btn inline-flex items-center justify-center gap-1.5"
                                      aria-label={`Read and Download ${sub} ${year} PYQ PDF`}
                                      title={`Preview and download ${sub} ${year} question paper PDF`}
                                    >
                                      <span aria-hidden="true">📥</span>
                                      <span>Download PDF</span>
                                    </Link>
                                  ) : (
                                    <span className="s2-soon-tag inline-flex items-center gap-1" aria-label="Uploading soon">
                                      <Clock className="h-3.5 w-3.5" />
                                      <span>Uploading Soon</span>
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}

                          {/* ── Branch Divider Row ── */}
                          <tr className="s2-branch-divider-row">
                            <td colSpan={4}>
                              <span className="s2-branch-divider-label flex items-center gap-1.5">
                                <ChevronRight className="h-4 w-4" />
                                <span>Branch-Specific Papers</span>
                              </span>
                            </td>
                          </tr>

                          {/* ── Branch Subject Rows ── */}
                          {branchSubjects.map((sub, i) => {
                            const link = getLink(year, sub);
                            const pdfPageUrl = `/resources/jharkhand-diploma/semester-2/pdf?subject=${encodeURIComponent(sub)}&year=${year}`;
                            return (
                              <tr key={`branch-${i}`} className={`s2-branch-row${link ? "" : " s2-row-soon"}`}>
                                <td className="s2-sub-cell">
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
                                <td className="s2-year-cell">{year}</td>
                                <td>
                                  <span className="s2-type-badge branch">Branch</span>
                                </td>
                                <td className="s2-dl-cell">
                                  {link ? (
                                    <Link
                                      href={pdfPageUrl}
                                      className="s2-dl-btn inline-flex items-center justify-center gap-1.5"
                                      aria-label={`Read and Download ${sub} ${year} PYQ PDF`}
                                      title={`Preview and download ${sub} ${year} question paper PDF`}
                                    >
                                      <span aria-hidden="true">📥</span>
                                      <span>Download PDF</span>
                                    </Link>
                                  ) : (
                                    <span className="s2-soon-tag inline-flex items-center gap-1" aria-label="Uploading soon">
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
                  {/* Ad between year sections - gaps 1/2/3 = 6247445156 / 8194031779 / 8948710243 */}
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
            <section className="s2-section" aria-label="Study tips for 2nd semester">
              <h2 className="s2-section-title flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-[#0d6efd]" />
                <span>Study Tips for 2nd Semester</span>
              </h2>
              <div className="s2-tips-grid">
                {studyTips.map((t, i) => {
                  const TipIcon = t.icon;
                  return (
                    <div className="s2-tip-card" key={i}>
                      <span className="s2-tip-icon" aria-hidden="true">
                        <TipIcon className="h-5 w-5 text-[#0d6efd]" />
                      </span>
                      <p className="s2-tip-text">{t.tip}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            <div style={{ margin: "18px 0" }}>
              <AdBanner slot="3636692323" />
            </div>

            {/* FAQ */}
            <section
              className="s2-section"
              aria-label="Frequently asked questions about Jharkhand Diploma 2nd Semester"
            >
              <h2 className="s2-section-title flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-[#0d6efd]" />
                <span>Frequently Asked Questions</span>
              </h2>
              <p className="s2-faq-sub">
                Common questions about Jharkhand Diploma 2nd Semester PYQs and JUT Ranchi exams.
              </p>
              <div role="list">
                {faqData.map((faq, i) => (
                  <div className="s2-faq-item" key={i} role="listitem">
                    <button
                      className="s2-faq-btn"
                      onClick={() => toggleFaq(i)}
                      aria-expanded={openFaq === i}
                      aria-controls={`s2-faq-ans-${i}`}
                      id={`s2-faq-q-${i}`}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`s2-faq-chevron ${openFaq === i ? "open" : ""} h-5 w-5`} aria-hidden="true" />
                    </button>
                    <div
                      id={`s2-faq-ans-${i}`}
                      className={`s2-faq-answer ${openFaq === i ? "open" : ""}`}
                      role="region"
                      aria-labelledby={`s2-faq-q-${i}`}
                    >
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </main>

          {/* ══ SIDEBAR ══ */}
          <aside className="s2-sidebar" aria-label="Quick navigation and exam links">

            {/* Other Semesters */}
            <div className="s2-scard">
              <h3 className="s2-scard-title flex items-center gap-1.5">
                <BookOpen className="h-4.5 w-4.5 text-indigo-600" />
                <span>Other Semesters</span>
              </h3>
              <nav aria-label="Other diploma semester links">
                {semLinks.map((s) => (
                  <Link
                    key={s.label}
                    href={s.path}
                    className="s2-ql"
                    title={`Jharkhand Diploma ${s.label} PYQ`}
                  >
                    <span>{s.label}</span>
                    <ChevronRight className="s2-ql-arrow h-4 w-4" />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="mb-3"><SidebarAd slot="1675110481" /></div>

            {/* Practice Online */}
            <div className="s2-scard s2-practice-card">
              <h3 className="s2-scard-title flex items-center gap-1.5" style={{ color: "#fff" }}>
                <Zap className="h-4.5 w-4.5 text-yellow-300 fill-yellow-300" />
                <span>Practice Online</span>
              </h3>
              <p className="s2-practice-desc">
                Solve Jharkhand D2D &amp; Polytechnic MCQs interactively with instant feedback and solutions.
              </p>
              <Link
                href="/exam-preparation/jharkhand-d2d"
                className="s2-practice-btn"
                title="Practice Jharkhand D2D PYQs online"
              >
                Practice D2D PYQs →
              </Link>
              <Link
                href="/exam-preparation/jharkhand-polytechnic"
                className="s2-practice-btn s2-pb-ol"
                title="Practice Jharkhand Polytechnic PYQs online"
                style={{ marginTop: 8 }}
              >
                Practice Polytechnic PYQs →
              </Link>
            </div>

            {/* Exam Notifications */}
            <div className="s2-scard" style={{ borderLeft: "4px solid #4f46e5" }}>
              <h3 className="s2-scard-title flex items-center gap-1.5" style={{ color: "#4f46e5" }}>
                <Megaphone className="h-4.5 w-4.5 text-indigo-600" />
                <span>Exam Notifications</span>
              </h3>
              {[
                { dot: "#22c55e", name: "Jharkhand Polytechnic 2026", status: "Registration Started", date: "Last date: 17 June 2026" },
                { dot: "#22c55e", name: "Jharkhand Polytechnic Laterl Entry 2026", status: "Registration Started", date: "Last date: 12 June 2026" },
                { dot: "#22c55e", name: "Jharkhand D2D Btech 2026", status: "Registration Started", date: "Last date: 12 June 2026" },
                { dot: "#f59e0b", name: "Bihar Polytechnic (DCECE)", status: "Registration Started", date: "Last date: 19 April 2026" },
              ].map((n) => (
                <div className="s2-notif-item" key={n.name}>
                  <div
                    className="s2-notif-dot"
                    style={{ background: n.dot }}
                    aria-hidden="true"
                  ></div>
                  <div>
                    <div className="s2-notif-name">{n.name}</div>
                    <div className="s2-notif-status">{n.status}</div>
                    <div className="s2-notif-date">{n.date}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-3">
              <SidebarAd slot="4461940407" />
            </div>

            {/* Pro Tip */}
            <div className="s2-scard s2-protip-card">
              <div style={{ fontSize: "1.6rem", marginBottom: "8px" }}>
                <Lightbulb className="h-6 w-6 text-amber-500 fill-amber-100 mx-auto" />
              </div>
              <p className="s2-protip-text">
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
        <footer className="s2-footer">
          <p>Last Updated: May 2026</p>
          <p>
            All PDFs are for educational purposes only and based on previous year data. Futurely does not
            claim official ownership.
          </p>
        </footer>

      </div>

      {/* ══════════════════════════════════════════
          STYLES — same design system as Sem1Client
          (prefixed s2-), plus branch-divider/branch-row
          rules kept from the original Sem2 file since
          Sem1 has no branch-divider markup to copy from.
      ══════════════════════════════════════════ */}
      <style dangerouslySetInnerHTML={{ __html: `

        .s2-page {
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

        .s2-page, .s2-page *, .s2-page *::before, .s2-page *::after { box-sizing: border-box; }

        /* ── HERO ── */
        .s2-hero {
          max-width: 1100px;
          margin: 0px auto 10px;
          padding: 22px 16px 18px;
          text-align: center;
        }
        .s2-hero-title {
          font-size: clamp(1.3rem, 4.5vw, 2.3rem);
          font-weight: 800;
          color: var(--blue);
          margin-bottom: 8px;
          line-height: 1.25;
          word-break: break-word;
        }
        .s2-hero-sub {
          font-size: clamp(.88rem, 2.5vw, 1.08rem);
          color: var(--muted);
          margin-bottom: 12px;
          font-weight: 500;
          word-break: break-word;
        }
        .s2-hero-desc {
          font-size: clamp(.92rem, 2.3vw, 1.05rem);
          color: #374151;
          line-height: 1.7;
          max-width: 1080px;
          margin: 0 auto 10px;
          text-align: left;
        }
        .s2-hero-hindi {
          font-size: clamp(.86rem, 2.1vw, 1rem);
          color: var(--muted);
        }

        /* ── LAYOUT ── */
        .s2-layout {
          display: grid;
          grid-template-columns: 1fr 296px;
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 2px;
          align-items: start;
        }
        @media (max-width: 960px) {
          .s2-layout { grid-template-columns: 1fr; }
          .s2-sidebar { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        }
        @media (max-width: 560px) {
          .s2-sidebar { grid-template-columns: 1fr; }
          .s2-layout { padding: 0 10px; gap: 14px; }
        }

        /* ── SECTION ── */
        .s2-section { margin-bottom: 24px; }
        .s2-section-title {
          font-size: clamp(1rem, 2.8vw, 1.22rem);
          font-weight: 800;
          color: var(--blue);
          margin-bottom: 14px;
          padding-bottom: 8px;
          border-bottom: 2px solid var(--blue-lt);
          word-break: break-word;
        }

        /* ── INFO GRID ── */
        .s2-info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        @media (max-width: 600px) { .s2-info-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 340px) { .s2-info-grid { grid-template-columns: 1fr; } }

        .s2-info-card {
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
        .s2-info-card:hover { box-shadow: var(--sh-md); transform: translateY(-2px); }
        .s2-info-icon  { font-size: 1.35rem; flex-shrink: 0; }
        .s2-info-label { font-size: clamp(.72rem, 1.7vw, .8rem); color: var(--muted); font-weight: 600; text-transform: uppercase; letter-spacing: .4px; }
        .s2-info-value { font-size: clamp(.84rem, 2vw, 1rem); font-weight: 700; color: var(--text); word-break: break-word; }

        /* ── SUBJECTS BOX ── */
        .s2-subjects-box {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          background: var(--green-lt);
          border: 2px solid var(--green);
          border-radius: var(--r);
          padding: 16px;
          box-shadow: var(--sh-sm);
        }
        @media (max-width: 520px) { .s2-subjects-box { grid-template-columns: 1fr; gap: 10px; } }

        .s2-subject-group-label {
          font-size: clamp(.8rem, 2vw, .88rem);
          font-weight: 800;
          color: var(--green);
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: .4px;
        }
        .s2-sublist {
          margin: 0;
          padding-left: 16px;
          color: #212529;
          font-size: clamp(.88rem, 2.2vw, .97rem);
          line-height: 1.85;
        }
        .s2-note {
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
        .s2-pyq-intro {
          font-size: clamp(.88rem, 2.2vw, .98rem);
          color: #495057;
          text-align: center;
          margin-bottom: 16px;
          line-height: 1.65;
        }

        /* ── YEAR BOX ── */
        .s2-year-box {
          background: linear-gradient(135deg, #e8f0ff, #fff);
          border: 2px solid var(--blue);
          border-radius: var(--r);
          padding: 14px 12px;
          margin-bottom: 18px;
          box-shadow: var(--sh-sm);
          scroll-margin-top: 80px;
          overflow: hidden;
        }
        .s2-year-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }
        .s2-year-title {
          font-size: clamp(.92rem, 2.8vw, 1.08rem);
          font-weight: 800;
          color: var(--blue);
          margin: 0;
          word-break: break-word;
        }
        .s2-year-meta   { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .s2-share-btn {
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
        .s2-share-btn:hover { background: var(--blue-lt); color: var(--blue); }

        /* ── TABLE ── */
        .s2-table-wrap {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          border-radius: 10px;
          border: 1px solid #c8d9f8;
        }
        .s2-table-wrap table {
          width: 100%;
          border-collapse: collapse;
          min-width: 340px;
          font-size: clamp(.82rem, 2vw, .98rem);
        }
        .s2-table-wrap th {
          background: var(--blue);
          color: #fff;
          padding: 10px 7px;
          font-size: clamp(.76rem, 1.8vw, .92rem);
          font-weight: 700;
          text-align: center;
          white-space: nowrap;
        }
        .s2-table-wrap td {
          background: #f9fbff;
          border: 1px solid #dce8ff;
          padding: 9px 7px;
          text-align: center;
          font-size: clamp(.78rem, 1.8vw, .94rem);
          vertical-align: middle;
        }
        .s2-table-wrap tr:nth-child(even) td { background: #f0f6ff; }
        .s2-row-soon td { opacity: .65; }
        .s2-sub-cell {
          text-align: left !important;
          padding-left: 10px !important;
          font-weight: 600;
          max-width: 180px;
          word-break: break-word;
          white-space: normal;
        }
        .s2-year-cell { font-weight: 700; color: var(--blue); white-space: nowrap; }
        .s2-dl-cell   { white-space: nowrap; }
        .s2-type-badge {
          padding: 2px 8px;
          border-radius: 999px;
          font-size: clamp(.7rem, 1.6vw, .8rem);
          font-weight: 700;
          white-space: nowrap;
        }
        .s2-type-badge.common { background: #dbeafe; color: #1d4ed8; }
        .s2-type-badge.branch { background: #fef3c7; color: #92400e; }

        /* ── DOWNLOAD BUTTON ── */
        .s2-dl-btn {
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
        .s2-dl-btn::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 10px;
          background: linear-gradient(120deg, transparent, #00eaff, #6610f2, #00eaff, transparent);
          background-size: 300% 300%;
          animation: s2BorderGlow 2.5s linear infinite;
          z-index: -1;
        }
        .s2-dl-btn::after {
          content: "";
          position: absolute;
          inset: 2px;
          background: linear-gradient(90deg, #0d6efd, #6610f2);
          border-radius: 6px;
          z-index: -1;
        }
        .s2-dl-btn:hover { opacity: .9; color: #fff; }
        @keyframes s2BorderGlow {
          0%   { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
        .s2-soon-tag { font-size: clamp(.72rem, 1.7vw, .86rem); color: #94a3b8; font-style: italic; }

        /* ── BRANCH DIVIDER ROW (Sem2-specific — no equivalent in Sem1) ── */
        .s2-branch-divider-row td {
          background: linear-gradient(90deg, #fef3c7, #fffbeb) !important;
          border-top: 2px solid #f59e0b !important;
          border-bottom: 2px solid #f59e0b !important;
          padding: 7px 10px !important;
          text-align: left !important;
        }
        .s2-branch-divider-label {
          font-size: clamp(.78rem, 1.9vw, .9rem);
          font-weight: 800;
          color: #92400e;
          text-transform: uppercase;
          letter-spacing: .5px;
        }
        .s2-branch-row td {
          background: #fffdf5 !important;
        }
        .s2-branch-row:nth-child(even) td {
          background: #fff8e1 !important;
        }
        .s2-branch-row.s2-row-soon td { opacity: .65; }

        /* ── TIPS ── */
        .s2-tips-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 520px) { .s2-tips-grid { grid-template-columns: 1fr; } }
        .s2-tip-card {
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
        .s2-tip-card:hover { box-shadow: var(--sh-md); }
        .s2-tip-icon { font-size: 1.3rem; flex-shrink: 0; margin-top: 1px; }
        .s2-tip-text { font-size: clamp(.86rem, 2vw, .96rem); color: #374151; line-height: 1.65; margin: 0; }

        /* ── FAQ ── */
        .s2-faq-sub { font-size: clamp(.86rem, 2vw, .96rem); color: var(--muted); margin-bottom: 14px; }
        .s2-faq-item {
          background: var(--blue-lt);
          border: 1px solid #c7d9f8;
          border-radius: 12px;
          margin-bottom: 8px;
          overflow: hidden;
          transition: box-shadow .2s;
        }
        .s2-faq-item:hover { box-shadow: 0 4px 16px rgba(13,110,253,.12); }
        .s2-faq-btn {
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
        .s2-faq-btn:focus-visible { outline: 3px solid rgba(13,110,253,.35); border-radius: 12px; }
        .s2-faq-chevron {
          flex-shrink: 0;
          color: var(--blue);
          font-size: 20px;
          line-height: 1;
          transition: transform .25s;
          display: inline-block;
        }
        .s2-faq-chevron.open { transform: rotate(180deg); }
        .s2-faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height .3s ease, padding .3s ease;
          padding: 0 15px;
          color: var(--muted);
          font-size: clamp(.86rem, 2vw, .98rem);
          line-height: 1.75;
        }
        .s2-faq-answer.open { max-height: 300px; padding: 0 15px 15px; }

        /* ── SIDEBAR ── */
        .s2-sidebar { display: flex; flex-direction: column; gap: 16px; }
        .s2-scard {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--r);
          padding: 16px;
          box-shadow: var(--sh-sm);
        }
        .s2-scard-title { font-size: clamp(.94rem, 2.2vw, 1.05rem); font-weight: 800; color: var(--text); margin-bottom: 12px; }

        .s2-ql {
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
        .s2-ql:last-child { margin-bottom: 0; }
        .s2-ql:hover { background: var(--blue-lt); border-color: #b6d4fe; color: var(--blue); }
        .s2-ql-arrow { color: #94a3b8; font-size: 18px; }

        .s2-practice-card { background: linear-gradient(135deg, #4f46e5, #7c3aed); border: none; }
        .s2-practice-desc { font-size: clamp(.86rem, 2vw, .95rem); color: rgba(255,255,255,.85); margin-bottom: 12px; line-height: 1.5; }
        .s2-practice-btn {
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
        .s2-practice-btn:hover { opacity: .9; color: #4f46e5; }
        .s2-pb-ol { background: rgba(255,255,255,.15); color: #fff; border: 1px solid rgba(255,255,255,.3); }
        .s2-pb-ol:hover { background: rgba(255,255,255,.25); color: #fff; }

        .s2-notif-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--border); }
        .s2-notif-item:last-child { border-bottom: none; padding-bottom: 0; }
        .s2-notif-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }
        .s2-notif-name   { font-size: clamp(.86rem, 2vw, .96rem); font-weight: 700; color: var(--text); }
        .s2-notif-status { font-size: clamp(.78rem, 1.8vw, .88rem); color: #16a34a; font-weight: 600; }
        .s2-notif-date   { font-size: clamp(.74rem, 1.7vw, .84rem); color: var(--muted); }

        .s2-protip-card { background: #fffbeb; border-color: #fde68a; text-align: center; }
        .s2-protip-text { font-size: clamp(.86rem, 2vw, .96rem); color: #374151; line-height: 1.65; margin: 0; }

        /* ── FOOTER ── */
        .s2-footer {
          max-width: 1100px;
          margin: 32px auto 0;
          padding: 16px 16px;
          border-top: 1px solid var(--border);
          text-align: center;
        }
        .s2-footer p { font-size: clamp(.74rem, 1.7vw, .86rem); color: #94a3b8; margin-bottom: 4px; }
        .s2-footer p:last-child { margin-bottom: 0; }

        /* ── SMALL DEVICE OVERRIDES ── */
        @media (max-width: 400px) {
          .s2-hero { margin-top: 22px; padding: 12px 10px 10px; }
          .s2-year-box { padding: 8px 5px; }
          .s2-table-wrap table { font-size: .78rem; min-width: 300px; }
          .s2-table-wrap th { padding: 8px 5px; font-size: .74rem; }
          .s2-table-wrap td { padding: 7px 5px; font-size: .76rem; }
          .s2-dl-btn { font-size: .74rem; padding: 5px 7px; }
          .s2-type-badge { padding: 2px 4px; }
          .s2-sub-cell { max-width: 130px; font-size: .76rem; }
          .s2-faq-btn { padding: 11px 11px; }
          .s2-scard { padding: 12px; }
        }
        .s2-sidebar-ad {
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
