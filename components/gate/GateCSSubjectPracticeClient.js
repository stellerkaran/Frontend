"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Binary,
  Workflow,
  Cpu,
  Network,
  Database,
  Sparkles,
  Server,
  Code2,
  CircuitBoard,
  Sigma,
  Compass,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Calculator,
  Bookmark,
  ChevronRight,
  FileText,
  RotateCcw,
  Check,
  Award,
  Layers,
  Flame,
  BookOpen
} from "lucide-react";
import { GATE_CS_SUBJECTS } from "@/src/data_Exam/Gate/GateCSData";

const ICON_MAP = {
  Binary,
  Workflow,
  Cpu,
  Network,
  Database,
  Sparkles,
  Server,
  Code2,
  CircuitBoard,
  Sigma,
  Compass,
};

export default function GateCSSubjectPracticeClient({ subjectSlug }) {
  const router = useRouter();

  // Find subject data
  const subjectIndex = useMemo(() => {
    const idx = GATE_CS_SUBJECTS.findIndex((s) => s.slug === subjectSlug);
    return idx !== -1 ? idx : 0;
  }, [subjectSlug]);

  const currentSubject = GATE_CS_SUBJECTS[subjectIndex] || GATE_CS_SUBJECTS[0];
  const prevSubject = subjectIndex > 0 ? GATE_CS_SUBJECTS[subjectIndex - 1] : null;
  const nextSubject = subjectIndex < GATE_CS_SUBJECTS.length - 1 ? GATE_CS_SUBJECTS[subjectIndex + 1] : null;

  // Question solving state
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [userAnswers, setUserAnswers] = useState({});
  const [revealedSolutions, setRevealedSolutions] = useState({});
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState({});
  const [showCalcTip, setShowCalcTip] = useState(false);

  const IconComponent = ICON_MAP[currentSubject.iconName] || Cpu;

  // Filter questions
  const filteredQuestions = useMemo(() => {
    if (!currentSubject.sampleQuestions) return [];
    return currentSubject.sampleQuestions.filter((q) => {
      if (selectedYear !== "all" && q.year.toString() !== selectedYear) return false;
      if (selectedType !== "all" && q.type !== selectedType) return false;
      return true;
    });
  }, [currentSubject, selectedYear, selectedType]);

  const handleOptionSelect = (qId, optionVal) => {
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: optionVal,
    }));
  };

  const handleToggleSolution = (qId) => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const handleToggleBookmark = (qId) => {
    setBookmarkedQuestions((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  return (
    <div className="practice-wrapper" id="gate-cs-subject-practice">
      <style dangerouslySetInnerHTML={{ __html: `
        .practice-wrapper {
          min-height: 100vh;
          background: linear-gradient(160deg, #f0f2ff 0%, #e8eaff 50%, #f5f0ff 100%);
          padding: 16px 20px 48px;
          position: relative;
        }

        .practice-wrapper::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image: radial-gradient(circle, rgba(99,102,241,0.14) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,0.18), transparent 80%);
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.18), transparent 80%);
          z-index: 0;
        }

        .practice-shell {
          max-width: 1040px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .breadcrumb-nav {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #64748b;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .breadcrumb-nav a {
          color: #475569;
          text-decoration: none;
          transition: color 0.15s;
        }

        .breadcrumb-nav a:hover {
          color: #2563eb;
        }

        /* ── SUBJECT HEADER CARD ── */
        .subject-header-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 22px;
          padding: 22px 26px;
          box-shadow: 0 12px 32px rgba(37, 99, 235, 0.08);
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .sh-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .sh-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .sh-icon-box {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .sh-title {
          font-size: 1.45rem;
          font-weight: 900;
          color: #0f172a;
          line-height: 1.2;
          margin: 0 0 4px;
        }

        .sh-meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .sh-pill {
          font-size: 0.76rem;
          font-weight: 800;
          padding: 3px 9px;
          border-radius: 8px;
        }

        .topics-scroll-row {
          display: flex;
          align-items: center;
          gap: 6px;
          overflow-x: auto;
          padding-top: 4px;
          scrollbar-width: none;
        }

        .topic-pill-item {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #475569;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 8px;
          white-space: nowrap;
        }

        /* ── FILTER TOOLBAR ── */
        .practice-toolbar {
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 12px 18px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
        }

        .tb-group {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .tb-label {
          font-size: 0.78rem;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
          margin-right: 2px;
        }

        .tb-btn {
          border: 1px solid #e2e8f0;
          background: #ffffff;
          color: #475569;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .tb-btn:hover {
          background: #f1f5f9;
        }

        .tb-btn.active {
          background: #2563eb;
          color: #ffffff;
          border-color: #2563eb;
        }

        /* ── QUESTIONS LIST ── */
        .questions-stack {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .question-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 22px 24px;
          box-shadow: 0 6px 20px rgba(15, 23, 42, 0.05);
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: border-color 0.2s;
        }

        .question-card:hover {
          border-color: #cbd5e1;
        }

        .qc-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding-bottom: 12px;
          border-bottom: 1px solid #f1f5f9;
        }

        .qc-tags {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tag-year {
          background: #eff6ff;
          color: #2563eb;
          font-weight: 800;
          font-size: 0.74rem;
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid #bfdbfe;
        }

        .tag-type {
          background: #faf5ff;
          color: #7c3aed;
          font-weight: 700;
          font-size: 0.74rem;
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid #e9d5ff;
        }

        .tag-marks {
          background: #f0fdf4;
          color: #16a34a;
          font-weight: 700;
          font-size: 0.74rem;
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid #bbf7d0;
        }

        .qc-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-icon-action {
          border: none;
          background: transparent;
          color: #94a3b8;
          padding: 4px;
          border-radius: 8px;
          cursor: pointer;
          transition: color 0.15s, background 0.15s;
        }

        .btn-icon-action:hover {
          color: #2563eb;
          background: #eff6ff;
        }

        .btn-icon-action.active {
          color: #eab308;
        }

        .qc-text {
          font-size: 0.95rem;
          font-weight: 600;
          color: #1e293b;
          line-height: 1.6;
          white-space: pre-wrap;
          font-family: inherit;
        }

        .qc-options-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .option-btn {
          border: 1.5px solid #e2e8f0;
          background: #f8fafc;
          border-radius: 12px;
          padding: 12px 14px;
          text-align: left;
          font-size: 0.86rem;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
          transition: all 0.15s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .option-btn:hover {
          background: #eff6ff;
          border-color: #bfdbfe;
        }

        .option-btn.selected {
          border-color: #2563eb;
          background: #eff6ff;
          color: #1d4ed8;
        }

        .option-btn.correct {
          border-color: #16a34a;
          background: #f0fdf4;
          color: #15803d;
          font-weight: 700;
        }

        .option-btn.incorrect {
          border-color: #dc2626;
          background: #fef2f2;
          color: #b91c1c;
        }

        /* ── NAT INPUT FORM ── */
        .nat-box {
          background: #f8fafc;
          border: 1.5px dashed #cbd5e1;
          border-radius: 14px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .nat-input {
          padding: 8px 14px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 700;
          width: 140px;
          outline: none;
          color: #0f172a;
          background: #ffffff;
        }

        .nat-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
        }

        /* ── SOLUTION ACCORDION ── */
        .qc-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding-top: 10px;
          border-top: 1px solid #f1f5f9;
        }

        .btn-solution-toggle {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid #bfdbfe;
          background: #eff6ff;
          color: #2563eb;
          font-size: 0.82rem;
          font-weight: 800;
          padding: 8px 14px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-solution-toggle:hover {
          background: #2563eb;
          color: #ffffff;
        }

        .solution-panel {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 16px 18px;
          margin-top: 8px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .sol-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .sol-key-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #15803d;
          font-size: 0.82rem;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .sol-derivation {
          font-size: 0.85rem;
          color: #334155;
          line-height: 1.6;
          white-space: pre-wrap;
          font-family: inherit;
        }

        /* ── BOTTOM SUBJECT NAVIGATION ── */
        .bottom-nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 32px;
          padding-top: 20px;
          border-top: 1px solid rgba(191, 219, 254, 0.8);
          flex-wrap: wrap;
        }

        .nav-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 10px 16px;
          border-radius: 14px;
          font-size: 0.86rem;
          font-weight: 800;
          color: #0f172a;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
          transition: all 0.15s ease;
          text-decoration: none;
          cursor: pointer;
        }

        .nav-link-btn:hover {
          border-color: #2563eb;
          color: #2563eb;
          transform: translateY(-2px);
        }

        @media (max-width: 720px) {
          .practice-wrapper { padding: 10px 12px 32px; }
          .subject-header-card { padding: 16px; border-radius: 18px; }
          .sh-title { font-size: 1.2rem; }
          .qc-options-grid { grid-template-columns: 1fr; }
          .bottom-nav-row { flex-direction: column; align-items: stretch; }
          .nav-link-btn { justify-content: center; }
        }
      ` }} />

      <div className="practice-shell">
        {/* Breadcrumb navigation */}
        <div className="breadcrumb-nav">
          <Link href="/gate/exam-preparation">GATE Preparation</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/gate/pyq/computer-science">GATE CS &amp; IT Subjects</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span style={{ color: "#2563eb", fontWeight: 700 }}>{currentSubject.title}</span>
        </div>

        {/* Subject Header */}
        <div className="subject-header-card">
          <div className="sh-top">
            <div className="sh-left">
              <div
                className="sh-icon-box"
                style={{
                  backgroundColor: currentSubject.bgLight,
                  border: `1px solid ${currentSubject.borderLight}`,
                  color: currentSubject.accentColor,
                }}
              >
                <IconComponent className="w-6 h-6" strokeWidth={2} />
              </div>

              <div>
                <h1 className="sh-title">{currentSubject.title}</h1>
                <div className="sh-meta-row">
                  <span
                    className="sh-pill"
                    style={{
                      backgroundColor: currentSubject.bgLight,
                      color: currentSubject.accentColor,
                      border: `1px solid ${currentSubject.borderLight}`,
                    }}
                  >
                    Weightage: {currentSubject.weightage}
                  </span>
                  <span className="sh-pill" style={{ backgroundColor: "#f8fafc", color: "#475569", border: "1px solid #e2e8f0" }}>
                    {currentSubject.questionCount} Solved Questions ({currentSubject.years})
                  </span>
                  <span className="sh-pill" style={{ backgroundColor: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>
                    100% Official Answer Keys
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/gate/pyq/computer-science"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-colors shrink-0"
              style={{ textDecoration: "none" }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Change Subject</span>
            </Link>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {currentSubject.description}
          </p>

          {/* Topics Chips */}
          <div className="topics-scroll-row">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase mr-1 shrink-0">Topics:</span>
            {currentSubject.topics.map((t, idx) => (
              <span key={idx} className="topic-pill-item">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Filter and Tool Bar */}
        <div className="practice-toolbar">
          <div className="tb-group">
            <span className="tb-label">Year:</span>
            <button
              className={`tb-btn ${selectedYear === "all" ? "active" : ""}`}
              onClick={() => setSelectedYear("all")}
            >
              All (2018–2024)
            </button>
            <button
              className={`tb-btn ${selectedYear === "2024" ? "active" : ""}`}
              onClick={() => setSelectedYear("2024")}
            >
              2024
            </button>
            <button
              className={`tb-btn ${selectedYear === "2023" ? "active" : ""}`}
              onClick={() => setSelectedYear("2023")}
            >
              2023
            </button>
            <button
              className={`tb-btn ${selectedYear === "2022" ? "active" : ""}`}
              onClick={() => setSelectedYear("2022")}
            >
              2022
            </button>
          </div>

          <div className="tb-group">
            <span className="tb-label">Type:</span>
            <button
              className={`tb-btn ${selectedType === "all" ? "active" : ""}`}
              onClick={() => setSelectedType("all")}
            >
              All Types
            </button>
            <button
              className={`tb-btn ${selectedType === "MCQ" ? "active" : ""}`}
              onClick={() => setSelectedType("MCQ")}
            >
              MCQ
            </button>
            <button
              className={`tb-btn ${selectedType === "NAT" ? "active" : ""}`}
              onClick={() => setSelectedType("NAT")}
            >
              NAT
            </button>
          </div>
        </div>

        {/* Questions Stack */}
        <div className="questions-stack">
          {filteredQuestions.map((q, qIndex) => {
            const isRevealed = revealedSolutions[q.id];
            const userAns = userAnswers[q.id];
            const isBookmarked = bookmarkedQuestions[q.id];

            return (
              <div key={q.id} className="question-card" id={`question-${q.id}`}>
                <div className="qc-header">
                  <div className="qc-tags">
                    <span className="tag-year">Q{qIndex + 1} &bull; {q.paper}</span>
                    <span className="tag-type">{q.type}</span>
                    <span className="tag-marks">{q.marks} Mark{q.marks > 1 ? "s" : ""}</span>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {q.topic}
                    </span>
                  </div>

                  <div className="qc-actions">
                    <button
                      className={`btn-icon-action ${isBookmarked ? "active" : ""}`}
                      onClick={() => handleToggleBookmark(q.id)}
                      title={isBookmarked ? "Bookmarked" : "Bookmark for revision"}
                    >
                      <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>

                {/* Question Text */}
                <div className="qc-text">{q.question}</div>

                {/* MCQ Options */}
                {q.type === "MCQ" && q.options && q.options.length > 0 && (
                  <div className="qc-options-grid">
                    {q.options.map((opt, optIdx) => {
                      const optKey = opt.trim().charAt(0); // e.g. 'A', 'B', 'C', 'D'
                      const isSelected = userAns === optKey;
                      const isCorrect = isRevealed && optKey === q.correctAnswer;
                      const isWrong = isRevealed && isSelected && optKey !== q.correctAnswer;

                      let btnClass = "option-btn";
                      if (isCorrect) btnClass += " correct";
                      else if (isWrong) btnClass += " incorrect";
                      else if (isSelected) btnClass += " selected";

                      return (
                        <button
                          key={optIdx}
                          className={btnClass}
                          onClick={() => handleOptionSelect(q.id, optKey)}
                        >
                          <span>{opt}</span>
                          {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                          {isWrong && <XCircle className="w-4 h-4 text-red-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* NAT Question Input */}
                {q.type === "NAT" && (
                  <div className="nat-box">
                    <span className="text-xs font-bold text-slate-700">
                      Numerical Answer Type:
                    </span>
                    <input
                      type="text"
                      className="nat-input"
                      placeholder="Enter integer/decimal"
                      value={userAns || ""}
                      onChange={(e) => handleOptionSelect(q.id, e.target.value)}
                    />
                    {isRevealed && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        Official Answer: {q.correctAnswer}
                      </span>
                    )}
                  </div>
                )}

                {/* Card Footer: Show Solution Button */}
                <div className="qc-footer">
                  <button
                    className="btn-solution-toggle"
                    onClick={() => handleToggleSolution(q.id)}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{isRevealed ? "Hide Solution" : "View Step-by-Step Derivation & Official Key"}</span>
                  </button>

                  <span className="text-[11px] font-semibold text-slate-400">
                    GATE {q.year} Official Question
                  </span>
                </div>

                {/* Solution Derivation Panel */}
                {isRevealed && (
                  <div className="solution-panel">
                    <div className="sol-header">
                      <span className="sol-key-badge">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Official Answer Key: Option {q.correctAnswer}</span>
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">
                        Detailed Derivation
                      </span>
                    </div>
                    <div className="sol-derivation">{q.explanation}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Subject Navigation */}
        <div className="bottom-nav-row">
          {prevSubject ? (
            <Link
              href={`/gate/pyq/computer-science/${prevSubject.slug}`}
              className="nav-link-btn"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Subject: {prevSubject.shortName}</span>
            </Link>
          ) : (
            <Link href="/gate/pyq/computer-science" className="nav-link-btn">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All CS Subjects</span>
            </Link>
          )}

          <Link
            href="/gate/pyq/computer-science"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-xl border border-blue-200"
            style={{ textDecoration: "none" }}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>View All 11 Subjects</span>
          </Link>

          {nextSubject && (
            <Link
              href={`/gate/pyq/computer-science/${nextSubject.slug}`}
              className="nav-link-btn"
            >
              <span>Next Subject: {nextSubject.shortName}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
