"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import "@/styles/diploma-semester.css";
import {
  School,
  ClipboardList,
  Clock,
  Award,
  FileCheck,
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
  Wallet,
} from "lucide-react";

/* ==========================================================================
   Shared shell for every Sem3/Sem4 diploma branch page.

   The 11 branch pages were identical apart from a handful of short strings and
   four data blocks, so the markup now lives here once and each branch supplies
   its own config -- see Sem3_CIVIL.config.js for the shape.
   ========================================================================== */

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
;

/* ─────────────────────────────────────────────
   STATIC DATA — single source of truth lives in ../Sem3CivilData.js
   (years / subjects / getLink imported above)
───────────────────────────────────────────── */

;

;

;

export default function SemesterBranchClient({ config }) {
  const {
    data: { years, subjects, getLink },
    examInfoCards,
    studyTips,
    semLinks,
    faqData,
    heroTitle,
    heroSubtitle,
    heroDescBlock,
    subjectsAria,
    subjectsHeading,
    branchPapersHeading,
    noticeText,
    browseLead,
    yearPapersLabel,
    pdfPathSegment,
    badge,
    tipsAria,
    tipsHeading,
    faqAria,
    faqLead,
    lastUpdated,
  } = config;
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
      <div className="s3-page">

        {/* ── HERO ── */}
        <header className="s3-hero">
          <h1 className="s3-hero-title">Jharkhand Diploma {config.heroTitle}</h1>
          <p className="s3-hero-sub">
            JUT Ranchi &nbsp;|&nbsp;{config.heroSubtitle}&amp; More
          </p>
          {config.heroDescBlock}
        </header>

        {/* ── MAIN LAYOUT ── */}
        <div className="s3-layout">

          {/* ══ MAIN COLUMN ══ */}
          <main className="s3-main">

            {/* Exam Info */}
            <section className="s3-section" aria-label="Exam information">
              <h2 className="s3-section-title flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-[#0d6efd]" />
                <span>Exam Information</span>
              </h2>
              <div className="s3-info-grid">
                {examInfoCards.map((c) => {
                  const CardIcon = c.icon;
                  return (
                    <div className="s3-info-card" key={c.label}>
                      <span className="s3-info-icon" aria-hidden="true">
                        <CardIcon className="h-5 w-5 text-[#0d6efd]" />
                      </span>
                      <div>
                        <div className="s3-info-label">{c.label}</div>
                        <div className="s3-info-value">{c.value}</div>
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
            <section className="s3-section" aria-label="{config.subjectsAria} subjects">
              <h2 className="s3-section-title flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#0d6efd]" />
                <span>Subjects of {config.subjectsHeading}</span>
              </h2>
              <div className="s3-subjects-box">
                <div className="s3-subjects-col">
                  <div className="s3-subject-group-label font-bold text-emerald-700 flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 text-emerald-600" />
                    <span>{config.branchPapersHeading} Branch Papers</span>
                  </div>
                  <ul className="s3-sublist">
                    {subjects.map((sub) => (
                      <li key={sub}>{sub}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="s3-note flex items-start gap-2.5">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="m-0 text-sm leading-relaxed">
                  ⚠️ सभी{config.noticeText} छात्रों के लिए इन 5 विषयों की External Exam में उपस्थित होना अनिवार्य है।
                  अंतिम परीक्षा का प्रश्नपत्र JUT Ranchi द्वारा तैयार किया जाता है।
                </p>
              </div>
            </section>

            {/* PYQ Download */}
            <section className="s3-section" aria-label="Previous year question papers download">
              <h2 className="s3-section-title flex items-center gap-2">
                <Download className="h-5 w-5 text-[#0d6efd]" />
                <span>Download Previous Year Question Papers</span>
              </h2>
              <p className="s3-pyq-intro">
                यहाँ{config.browseLead} के सभी विषयों के{" "}
                <b>2021–2025 Previous Year Question Papers (PDF)</b> free में डाउनलोड कर सकते हैं।
              </p>

              {years.map((year, yearIndex) => (
                <React.Fragment key={year}>
                <div className="s3-year-box" id={`year-${year}`}>
                  <div className="s3-year-header">
                    <h3 className="s3-year-title flex items-center gap-1.5">
                      <FileText className="h-4.5 w-4.5 text-indigo-600" />
                      <span>{year} – {config.yearPapersLabel}</span>
                    </h3>
                    <div className="s3-year-meta">
                      <button
                        className="s3-share-btn flex items-center gap-1"
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

                  <div className="s3-table-wrap">
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
                          const pdfPageUrl = `/resources/jharkhand-diploma/semester-{config.pdfPathSegment}/pdf?subject=${encodeURIComponent(sub)}&year=${year}`;
                          return (
                            <tr key={i} className={link ? "" : "s3-row-soon"}>
                              <td className="s3-sub-cell">
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
                              <td className="s3-year-cell">{year}</td>
                              <td>
                                {config.badge}
                              </td>
                              <td className="s3-dl-cell">
                                {link ? (
                                  <Link
                                    href={pdfPageUrl}
                                    className="s3-dl-btn inline-flex items-center justify-center gap-1.5"
                                    aria-label={`Read and Download ${sub} ${year} PYQ PDF`}
                                    title={`Preview and download ${sub} ${year} question paper PDF`}
                                  >
                                    <span aria-hidden="true">📥</span>
                                    <span>Download PDF</span>
                                  </Link>
                                ) : (
                                  <span className="s3-soon-tag inline-flex items-center gap-1 text-slate-400" aria-label="Uploading soon">
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
            <section className="s3-section" aria-label="Study tips for {config.tipsAria}">
              <h2 className="s3-section-title flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-[#0d6efd]" />
                <span>Study Tips for {config.tipsHeading}</span>
              </h2>
              <div className="s3-tips-grid">
                {studyTips.map((t, i) => {
                  const TipIcon = t.icon;
                  return (
                    <div className="s3-tip-card" key={i}>
                      <span className="s3-tip-icon" aria-hidden="true">
                        <TipIcon className="h-5 w-5 text-[#0d6efd]" />
                      </span>
                      <p className="s3-tip-text">{t.tip}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            <div style={{ margin: "18px 0" }}>
              <AdBanner slot="3636692323" />
            </div>

            {/* FAQ */}
            <section className="s3-section" aria-label="Frequently asked questions about Jharkhand Diploma {config.faqAria}">
              <h2 className="s3-section-title flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-[#0d6efd]" />
                <span>Frequently Asked Questions</span>
              </h2>
              <p className="s3-faq-sub">
                Common questions about Jharkhand Diploma {config.faqLead}.
              </p>
              <div role="list">
                {faqData.map((faq, i) => (
                  <div className="s3-faq-item" key={i} role="listitem">
                    <button
                      className="s3-faq-btn"
                      onClick={() => toggleFaq(i)}
                      aria-expanded={openFaq === i}
                      aria-controls={`s3-faq-ans-${i}`}
                      id={`s3-faq-q-${i}`}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`s3-faq-chevron ${openFaq === i ? "rotate-180" : ""} h-5 w-5 text-[#0d6efd] transition-transform duration-200`} aria-hidden="true" />
                    </button>
                    <div
                      id={`s3-faq-ans-${i}`}
                      className={`s3-faq-answer ${openFaq === i ? "open" : ""}`}
                      role="region"
                      aria-labelledby={`s3-faq-q-${i}`}
                    >
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="s3-sidebar" aria-label="Quick navigation and exam links">
            <div className="s3-scard">
              <h3 className="s3-scard-title flex items-center gap-1.5 font-bold">
                <BookOpen className="h-4.5 w-4.5 text-indigo-600" />
                <span>Other Semesters</span>
              </h3>
              <nav aria-label="Other diploma semester links">
                {semLinks.map((s) => (
                  <Link key={s.label} href={s.path} className="s3-ql" title={`Jharkhand Diploma ${s.label} PYQ`}>
                    <span>{s.label}</span>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="mb-3"><SidebarAd slot="1675110481" /></div>

            <div className="s3-scard s3-practice-card">
              <h3 className="s3-scard-title font-bold text-white mb-2 flex items-center gap-1.5" style={{ color: "#fff" }}>
                <Zap className="h-4.5 w-4.5 text-yellow-300 fill-yellow-300" />
                <span>Practice Online</span>
              </h3>
              <p className="s3-practice-desc">
                Solve Jharkhand D2D &amp; Polytechnic MCQs interactively with instant feedback and solutions.
              </p>
              <Link href="/exam-preparation/jharkhand-d2d" className="s3-practice-btn" title="Practice Jharkhand D2D PYQs online">
                Practice D2D PYQs →
              </Link>
              <Link
                href="/exam-preparation/jharkhand-polytechnic"
                className="s3-practice-btn s3-pb-ol text-white border border-white/30 hover:bg-white/10"
                title="Practice Jharkhand Polytechnic PYQs online"
                style={{ marginTop: 8 }}
              >
                Practice Polytechnic PYQs →
              </Link>
            </div>

            <div className="s3-scard" style={{ borderLeft: "4px solid #4f46e5" }}>
              <h3 className="s3-scard-title font-bold text-[#4f46e5] mb-3 flex items-center gap-1.5" style={{ color: "#4f46e5" }}>
                <Megaphone className="h-4.5 w-4.5 text-indigo-600" />
                <span>Exam Notifications</span>
              </h3>
              {[
                { dot: "#22c55e", name: "Jharkhand Polytechnic 2026", status: "Registration Started", date: "Last date: 17 June 2026" },
                { dot: "#22c55e", name: "Jharkhand Polytechnic Lateral Entry 2026", status: "Registration Started", date: "Last date: 12 June 2026" },
                { dot: "#22c55e", name: "Jharkhand D2D Btech 2026", status: "Registration Started", date: "Last date: 12 June 2026" },
                { dot: "#f59e0b", name: "Bihar Polytechnic (DCECE)", status: "Registration Started", date: "Last date: 19 April 2026" },
              ].map((n) => (
                <div className="s3-notif-item" key={n.name}>
                  <div className="s3-notif-dot" style={{ background: n.dot }} aria-hidden="true"></div>
                  <div>
                    <div className="s3-notif-name">{n.name}</div>
                    <div className="s3-notif-status">{n.status}</div>
                    <div className="s3-notif-date">{n.date}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-3">
              <SidebarAd slot="4461940407" />
            </div>

            <div className="s3-scard s3-protip-card flex flex-col items-center">
              <div className="mb-2">
                <Lightbulb className="h-6 w-6 text-amber-500 fill-amber-100" />
              </div>
              <p className="s3-protip-text">
                <b>Pro Tip:</b> Repeated questions across years are almost guaranteed to appear again.
                Solve papers from all available years before your exam.
              </p>
            </div>

            <div className="my-3">
              <AdBanner slot="6242297060" />
            </div>
          </aside>
        </div>

        <footer className="s3-footer">
          <p>Last Updated: {config.lastUpdated} 2026</p>
          <p>All PDFs are for educational purposes only and based on previous year data. Futurely does not claim official ownership.</p>
        </footer>
      </div>
    </div>
  );
}
