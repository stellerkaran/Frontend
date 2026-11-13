"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { GATE_PDS_YEARS_DATA } from "@/src/data_Exam/Gate/GatePDSYearData";
import { GATE_CS_SUBJECTS } from "@/src/data_Exam/Gate/GateCSData";
import { Button } from "react-bootstrap";

/* ================= COMPONENT ================= */
export default function GateAttemptClient({ params }) {
  const router = useRouter();
  const timerRef = useRef(null);

  const { branch = "cs", subject: subjectSlug = "programming-data-structures", year: yearStr = "2026", set: setStr = "1" } = params || {};
  const year = parseInt(yearStr, 10);
  const setIndex = parseInt(setStr, 10) - 1;

  /* Find subject metadata */
  const subjectMeta = GATE_CS_SUBJECTS.find(
    s => s.slug === subjectSlug
  ) || GATE_CS_SUBJECTS[0];

  /* Find year data */
  const yearData = GATE_PDS_YEARS_DATA.find(d => d.year === year);
  const paper = yearData?.papers?.[setIndex];

  /* Flatten all questions from paper */
  const allQuestions = useMemo(() => {
    if (!paper?.questions) return [];
    return paper.questions.map((q, idx) => ({
      ...q,
      _index: idx,
    }));
  }, [paper]);

  /* Per-question states */
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswer, setShowAnswer] = useState({});

  const [timeLeft, setTimeLeft] = useState(0);
  const [viewMode, setViewMode] = useState("years"); // "years" | "viewer"
  const [selectedYear, setSelectedYear] = useState(null);
  const [yearQuestions, setYearQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  /* ================= TIMER ================= */
  function startTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(0);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => prev + 1);
    }, 1000);
  }

  function stopTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  /* ================= HANDLERS ================= */
  const openYearQuestions = useCallback(() => {
    if (!paper) return;

    const qs = allQuestions.map((q, idx) => ({
      id: q.id || `gate-${year}-${setIndex}-${idx}`,
      text: q.question,
      options: q.options || [],
      correctIndex: q.correctAnswer ? q.correctAnswer.charCodeAt(0) - 65 : 0,
      explanation: q.explanation || "",
      type: q.type || "MCQ",
      marks: q.marks || 1,
      topic: q.topic || "",
    }));

    setYearQuestions(qs);
    setCurrentIndex(0);
    setViewMode("viewer");
    setSelectedYear({ year, setIndex });

    // Initialize per-question states
    setSelectedAnswers(prev => {
      const next = { ...prev };
      qs.forEach(q => { if (next[q.id] === undefined) next[q.id] = undefined; });
      return next;
    });
    setShowAnswer(prev => {
      const next = { ...prev };
      qs.forEach(q => { if (next[q.id] === undefined) next[q.id] = false; });
      return next;
    });

    startTimer();
  }, [paper, allQuestions, year, setIndex]);

  const backToYears = useCallback(() => {
    stopTimer();
    setViewMode("years");
    setSelectedYear(null);
    setYearQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowAnswer({});
    router.back();
  }, [router]);

  /* ================= EFFECTS ================= */
  useEffect(() => {
    return () => stopTimer();
  }, []);

  // Auto-jump to viewer when year param is provided (direct link)
  useEffect(() => {
    if (year && paper) {
      setLoading(true);
      openYearQuestions();
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, paper]);

  function handleSelectOption(qid, idx) {
    if (showAnswer[qid]) return;
    setSelectedAnswers(prev => ({ ...prev, [qid]: idx }));
  }

  function handleCheckAnswer() {
    const q = yearQuestions[currentIndex];
    if (!q) return;

    const qid = q.id;
    const selected = selectedAnswers[qid];
    if (selected === undefined) return;

    setShowAnswer(prev => ({ ...prev, [qid]: true }));
    stopTimer();
  }

  function handleTryAgain() {
    const q = yearQuestions[currentIndex];
    if (!q) return;
    const qid = q.id;

    setShowAnswer(prev => ({ ...prev, [qid]: false }));
    setSelectedAnswers(prev => ({ ...prev, [qid]: undefined }));
    startTimer();
  }

  function goNext() {
    if (currentIndex < yearQuestions.length - 1) {
      setCurrentIndex(i => i + 1);
      startTimer();
    }
  }

  function goPrevious() {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
      startTimer();
    }
  }

  /* ================= BOTTOM BAR ================= */
  const showBottomBar = viewMode === "viewer" && yearQuestions.length > 0;

  let bottomBar = null;
  if (showBottomBar && yearQuestions[currentIndex]) {
    const qid = yearQuestions[currentIndex].id;
    const isShown = !!showAnswer[qid];
    const chosen = selectedAnswers[qid];
    const correctIdx = yearQuestions[currentIndex].correctIndex;
    const showTryAgain = isShown && chosen !== undefined && chosen !== correctIdx;

    bottomBar = (
      <div className="bottom-action-bar">
        <div className="bottom-action-inner">
          <Button variant="light" onClick={goPrevious} disabled={currentIndex === 0}>Previous</Button>

          {showTryAgain ? (
            <button className="try-btn" onClick={handleTryAgain} aria-label="Try again">
              <span style={{ fontSize: 18 }}>↺</span>
              Try Again
            </button>
          ) : (
            <Button
              variant="primary"
              onClick={handleCheckAnswer}
              disabled={isShown || selectedAnswers[qid] === undefined}
              style={{ minWidth: 160 }}
            >
              Check Answer
            </Button>
          )}

          <Button variant="light" onClick={goNext} disabled={currentIndex === yearQuestions.length - 1}>Next</Button>
        </div>
      </div>
    );
  }

  /* ================= SCORE ================= */
  const score = useMemo(() => {
    if (!yearQuestions.length) return { correct: 0, wrong: 0, skipped: 0, total: 0, accuracy: 0 };
    let correct = 0, wrong = 0, skipped = 0;
    yearQuestions.forEach(q => {
      const chosen = selectedAnswers[q.id];
      if (chosen === undefined) skipped++;
      else if (chosen === q.correctIndex) correct++;
      else wrong++;
    });
    const total = yearQuestions.length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { correct, wrong, skipped, total, accuracy };
  }, [yearQuestions, selectedAnswers]);

  /* ================= RENDER ================= */
  return (
    <div className={`physics-box ${viewMode === "years" ? "bg-years" : "bg-viewer"}`}>

      <style dangerouslySetInnerHTML={{ __html: `
    .physics-box, .physics-box *, .physics-box *::before, .physics-box *::after {
      box-sizing: border-box; margin: 0; padding: 0;
    }
    .physics-box {
      font-family: 'DM Sans', system-ui, sans-serif;
      background: #f8f9fa;
      min-height: 100vh;
      -webkit-tap-highlight-color: transparent;
    }

    .pyq-title{
      margin: 12px 0px 12px;
      font-size:16px;
      font-weight:700;
      color:#2563eb;
      text-align:center;
      background:transparent;
    }

    .pyq-list{display:flex;flex-direction:column;gap:12px;background:transparent;padding:0;border-radius:0;}
    .pyq-row{
      display:flex;
      justify-content:space-between;
      align-items:center;
      background:#ffffff;
      border-radius:12px;
      padding:14px 16px;
      cursor:pointer;
      box-shadow:0 1px 2px rgba(0,0,0,.05);
      transition: background .12s ease, box-shadow .12s ease;
    }

    .bg-years{ background:#f8f9fa; }
    .bg-viewer{ background:#ffffff; }

    .pyq-row:hover{
      background: rgba(197, 163, 163, 0.1);
      box-shadow: 0 4px 10px rgba(0,0,0,.10);
      transform: translateY(-1px);
    }

    .pyq-left{display:flex;gap:12px;align-items:center}
    .pyq-year{
      width:40px;height:40px;border-radius:8px;
      background:#e8f0fe;color:#1a73e8;
      display:flex;align-items:center;justify-content:center;
      font-size:13px;font-weight:500;flex-shrink:0;
    }

    .pyq-progress{font-size:14px;color:#1a73e8;font-weight:500;}
    .pyq-small{font-size:11px;color:#6b7280;margin-top:3px;text-align:right}
    .pyq-arrow{font-size:20px;color:#9aa0a6;transition: transform .12s ease;}
    .pyq-row:hover .pyq-arrow{transform: translateX(2px);}

    .exam-topbar{
      display:flex;justify-content:space-between;align-items:center;
      background:#0f172a;color:#fff;padding:10px 16px;margin-bottom:14px;border-radius:0;
    }
    .exam-left span{display:block;font-size:12px;opacity:.8}
    .exam-center{font-weight:700}
    .exam-right{display:flex;gap:8px;align-items:center}

    .timer-pill{
      padding:6px 14px;border-radius:999px;font-weight:800;font-size:13px;
      background:#e0edff;color:#1d4ed8;
    }

    .option-box{
      display:flex;align-items:center;gap:15px;
      border:2px solid #e5e7eb;border-radius:14px;
      padding:14px 16px;margin-bottom:16px;
      cursor:pointer;background:#fff;user-select:none;
      transition: all .18s ease;
      padding-left: 18px;padding-right: 18px;box-sizing: border-box;
    }
    .option-box strong{
      width:38px;height:38px;border-radius:50%;
      background:#f1f5f9;color:#475569;
      display:flex;align-items:center;justify-content:center;
      font-weight:700;font-size:15px;flex-shrink:0;
    }
    .option-box.selected{ border:2px solid #1d4ed8; background:#ffffff; }
    .option-box.selected strong{ background:#1d4ed8; color:#ffffff; }
    .option-box.correct{ border-color:#22c55e; background:#ffffff; position: relative; padding-right: 44px; }
    .option-box.correct strong{ background:#dcfce7; color:#16a34a; }
    .option-box.incorrect{ border-color:#ef4444; background:#ffffff; position: relative; padding-right: 44px; }
    .option-box.incorrect strong{ background:#fee2e2; color:#dc2626; }

    .status-icon{
      position: absolute;top: 50%;right: 16px;transform: translateY(-50%);
      width: 26px;height: 26px;border-radius: 50%;
      display: flex;align-items: center;justify-content: center;
      font-size: 14px;font-weight: 700;color: #fff;flex-shrink: 0;
    }
    .status-icon-correct{ background: #22c55e; }
    .status-icon-wrong{ background: #ef4444; }

    .marked-tag{
      position: absolute;top: -10px;right: 16px;
      background: #ffffff;padding: 0 6px;
      font-size: 11px;font-weight: 700;color: #ef4444;
    }

    .solution-box{
      margin: 20px 16px 140px 16px;padding: 18px;
      background: #fefce8;border: 1.5px solid #fde68a;
      border-radius: 14px;box-shadow: 0 1px 3px rgba(0,0,0,.04);
    }
    .solution-header{
      display: flex;align-items: center;justify-content: center;
      margin-bottom: 14px;padding-bottom: 10px;
      border-bottom: 1px solid #fde68a;
    }
    .solution-label{
      font-weight: 700;font-size: 15px;color: #1d4ed8;
    }
    .solution-lang-block{
      margin-bottom: 14px;padding-left: 12px;border-left: 3px solid #fbbf24;
    }
    .solution-lang-block:last-child{ margin-bottom: 0; }
    .solution-lang-hindi{ border-left-color: #60a5fa; }
    .solution-lang-tag{
      font-size: 11px;font-weight: 700;text-transform: uppercase;
      letter-spacing: 0.5px;color: #b45309;margin-bottom: 4px;
    }
    .solution-lang-hindi .solution-lang-tag{ color: #1d4ed8; }
    .solution-text{font-size: 14.5px;line-height: 1.7;color: #1f2937;white-space: pre-line;}
    .solution-empty{font-size: 13.5px;color: #9ca3af;font-style: italic;}

    .mcq-viewer{width: 100%;padding-bottom: 120px;overflow-x: hidden;}
    .question-full{width: 100%;padding: 0 16px;box-sizing: border-box;}
    .mcq-content{width: 100%;margin: 0;padding: 8px 16px 0 16px;box-sizing: border-box;max-width: none;}
    .mcq-content .option-box{width: 100%;max-width: none;}
    .question-text{line-height: 1.65;font-weight: 700;}

    .bottom-action-bar{
      position:fixed;bottom:0;left:0;right:0;
      background:#ffffff;padding:14px 16px 18px;
      border-top:1px solid #e5e7eb;z-index:1000;
    }
    .bottom-action-inner .btn-primary{
      background:#006eff !important;border:none !important;
      opacity:1 !important;color:#ffffff !important;
    }
    .bottom-action-inner .btn-primary:disabled,
    .bottom-action-inner .btn-primary.disabled{
      background:#57a0ff !important;border:none !important;
      opacity:1 !important;color:#ffffff !important;
    }
    .bottom-action-inner{
      max-width:760px;margin:0 auto;
      display:flex;justify-content:space-between;align-items:center;gap:12px;
    }
    .bottom-action-inner button{
      min-width:110px;height:44px;border-radius:12px;
      font-weight:600;font-size:15px;
    }
    .bottom-action-inner .btn-light{
      border-radius:12px !important;border:1.5px solid #d1d5db !important;
      background:#ffffff !important;color:#111827;
    }
    .bottom-action-inner .btn-light:hover{ background:#f9fafb !important; }
    .bottom-action-inner .btn-light:disabled,
    .bottom-action-inner .btn-light.disabled{
      border-radius:12px !important;border:1.5px solid #d1d5db !important;
      background:#ffffff !important;color:#9ca3af !important;opacity:1 !important;
    }
    .try-btn{
      background:#111827;color:#fff;border:0;min-width:160px;height:44px;
      border-radius:12px;display:inline-flex;align-items:center;
      justify-content:center;gap:10px;font-weight:700;font-size:15px;
    }
    .try-btn:hover{opacity:.95}

    @media (max-width:600px){
      .mcq-content{ padding: 8px 12px 0 12px; }
      .question-full{ padding: 0 12px; }
      .exam-topbar{ padding-left:12px;padding-right:12px; }
      .option-box{ padding: 12px 14px; }
    }

    .loading-box {
      display: flex;flex-direction: column;align-items: center;justify-content: center;
      padding: 40px 20px;text-align: center;color: #374151;
    }
    .loading-box p{ margin-top: 14px;font-weight: 600; }
    .loading-box small{ margin-top: 6px;color: #6b7280; }
    .spinner{
      width: 42px;height: 42px;border: 4px solid #e5e7eb;
      border-top: 4px solid #2563eb;border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .pyq-right{ display:flex;align-items:center;gap:12px; }
      ` }} />

      {/* ================= YEAR LIST ================= */}
      {viewMode === "years" && (
        <>
          <h2 className="pyq-title">GATE — {subjectMeta?.title || "Programming & Data Structures"}</h2>

          {loading ? (
            <div className="loading-box">
              <div className="spinner"></div>
              <p>Loading questions, please wait…</p>
              <small>This may take a few seconds on first load</small>
            </div>
          ) : (
            <div className="pyq-list">
              {yearData && paper && (
                <div className="pyq-row" onClick={openYearQuestions}>
                  <div className="pyq-left">
                    <div className="pyq-year">{year}</div>
                    <div>
                      <div style={{ fontWeight: 500 }}>
                        GATE {year} — Set {setIndex + 1}
                      </div>
                    </div>
                  </div>
                  <div className="pyq-right">
                    <div className="pyq-progress">
                      {allQuestions.length} Questions
                    </div>
                    <div className="pyq-arrow">›</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* ================= MCQ VIEWER ================= */}
      {viewMode === "viewer" && yearQuestions.length > 0 && yearQuestions[currentIndex] && (
        <div className="mcq-viewer">
          <div className="exam-topbar">
            <div className="exam-left">
              <strong>GATE — {subjectMeta?.title}</strong>
              <span>GATE {year} Set-{setIndex + 1}</span>
            </div>
            <div className="exam-center">Q {currentIndex + 1} / {yearQuestions.length}</div>
            <div className="exam-right">
              <div className="timer-pill">⏱ {formatTime(timeLeft)}</div>
              <Button size="sm" variant="light" onClick={backToYears}>✕</Button>
            </div>
          </div>

          <div className="question-full">
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
              flexWrap: "wrap",
              gap: 8,
            }}>
              <span style={{
                fontSize: 11,fontWeight: 700,padding: "3px 10px",borderRadius: 6,
                background: "#eff6ff",color: "#1d4ed8",border: "1px solid #bfdbfe",
              }}>
                {yearQuestions[currentIndex].type || "MCQ"}
              </span>
              <span style={{ fontSize: 12, color: "#6b7280" }}>
                Q {currentIndex + 1} of {yearQuestions.length}
              </span>
            </div>

            <div style={{
              fontSize: 16,fontWeight: 600,color: "#0f172a",
              lineHeight: 1.75,marginBottom: 20,background: "#fff",
              borderRadius: 12,padding: "16px",border: "1px solid #e5e7eb",
              whiteSpace: "pre-line",
            }}>
              {yearQuestions[currentIndex].text}
            </div>
          </div>

          <div className="mcq-content">
            {yearQuestions[currentIndex].options.map((opt, idx) => {
              const qid = yearQuestions[currentIndex].id;
              const showState = showAnswer[qid];
              const isCorrect = yearQuestions[currentIndex].correctIndex === idx;
              const isSelected = selectedAnswers[qid] === idx;

              let cls = "option-box";
              if (!showState && isSelected) cls += " selected";
              if (showState === true && isCorrect) cls += " correct";
              if (showState === true && isSelected && !isCorrect) cls += " incorrect";

              const isWrongMarked = cls.includes("incorrect");
              const isRightShown = cls.includes("correct");

              return (
                <div
                  key={idx}
                  className={cls}
                  onClick={() => handleSelectOption(qid, idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelectOption(qid, idx);
                    }
                  }}
                  aria-pressed={isSelected}
                  aria-disabled={!!showState}
                  style={{ opacity: 1, position: "relative" }}
                >
                  {isWrongMarked && (
                    <span className="marked-tag">You Marked</span>
                  )}

                  <strong>{String.fromCharCode(65 + idx)}</strong>
                  <div style={{ flex: 1, fontSize: 15, color: "#1f2937", lineHeight: 1.55, fontWeight: 500 }}>
                    {opt}
                  </div>

                  {isRightShown && (
                    <span className="status-icon status-icon-correct">✓</span>
                  )}
                  {isWrongMarked && (
                    <span className="status-icon status-icon-wrong">✕</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Solution */}
          {(() => {
            const qid = yearQuestions[currentIndex].id;
            const showState = showAnswer[qid];
            const chosen = selectedAnswers[qid];
            const correctIdx = yearQuestions[currentIndex].correctIndex;

            const showSolution = showState === true && chosen === correctIdx;

            if (!showSolution) return null;

            const explanation = yearQuestions[currentIndex].explanation;
            if (!explanation || explanation.trim().length === 0) {
              return (
                <div className="solution-box">
                  <div className="solution-header">
                    <span className="solution-label">Solution</span>
                  </div>
                  <div className="solution-empty">
                    Solution not added yet for this question.
                  </div>
                </div>
              );
            }

            const parts = explanation.split("---");
            const englishPart = parts[0] || "";
            const hindiPart = parts[1] || "";

            return (
              <div className="solution-box">
                <div className="solution-header">
                  <span className="solution-label">Solution</span>
                </div>

                <div className="solution-lang-block">
                  <div className="solution-lang-tag">English</div>
                  <div className="solution-text">{englishPart.trim()}</div>
                </div>

                {hindiPart && (
                  <div className="solution-lang-block solution-lang-hindi">
                    <div className="solution-lang-tag">हिंदी</div>
                    <div className="solution-text">{hindiPart.trim()}</div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {bottomBar}
    </div>
  );
}
