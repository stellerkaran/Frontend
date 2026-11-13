"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";
import { authFetch } from "../../../../utils/api";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { MathJax, MathJaxContext } from "better-react-mathjax";

/* ================= COMPONENT ================= */
export default function ChemistryQuestionsBRP({ setFocusMode }) {

  const { isLoggedIn } = useAuth();
  const { openLogin } = useAuthModal();
  const timerRef = useRef(null);

  const [selectedYear, setSelectedYear] = useState(null);
  const [yearQuestions, setYearQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  /* per-question states */
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [attempted, setAttempted] = useState({});
  const [showAnswer, setShowAnswer] = useState({}); // false | "PARTIAL" | "FULL"
  const [, setAttemptCount] = useState({});

  const [timeLeft, setTimeLeft] = useState(0);
  const [viewMode, setViewMode] = useState("years");

  const [questionsByYear, setQuestionsByYear] = useState({});
  const dynamicYears = [
    { year: "All Previous Year Questions", key: "ALL" },
    ...Object.keys(questionsByYear)
      .map(y => ({
        year: y,
        key: y.split(" ")[0] // "2023 Questions" → "2023"
      }))
      .sort((a, b) => Number(b.key) - Number(a.key))
  ];
  const [loading, setLoading] = useState(false);

  /* ================= EFFECTS ================= */
  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        let rawData = [];

        try {
          const res = await authFetch("/questions?exam=BRP&subject=Chemistry");
          if (res && res.ok) {
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
              const parsed = await res.json();
              if (Array.isArray(parsed)) rawData = parsed;
              else if (Array.isArray(parsed.questions)) rawData = parsed.questions;
              else if (Array.isArray(parsed.data)) rawData = parsed.data;
              else if (Array.isArray(parsed.result)) rawData = parsed.result;
            }
          }
        } catch (fetchErr) {
          console.warn("Backend fetch failed for BRP Chemistry, using fallback question bank:", fetchErr);
        }

        if (!Array.isArray(rawData) || rawData.length === 0) {
          rawData = [
            {
              questionId: "2025-brp-chem-101",
              year: "2025",
              text: "The IUPAC name of CH₃-CH₂-OH is:",
              options: ["Methanol", "Ethanol", "Propanol", "Ethanal"],
              correctIndex: 1,
              explanation: "CH₃-CH₂-OH has two carbons with an -OH group, so it is named Ethanol."
            },
            {
              questionId: "2025-brp-chem-102",
              year: "2025",
              text: "Which of the following is an example of an alkali metal?",
              options: ["Calcium", "Sodium", "Aluminium", "Magnesium"],
              correctIndex: 1,
              explanation: "Sodium (Na) belongs to Group 1 of the periodic table, the alkali metals."
            },
            {
              questionId: "2024-brp-chem-101",
              year: "2024",
              text: "The pH of a neutral solution at 25°C is:",
              options: ["0", "7", "14", "1"],
              correctIndex: 1,
              explanation: "A neutral solution has equal H⁺ and OH⁻ concentration, giving pH = 7 at 25°C."
            },
            {
              questionId: "2023-brp-chem-101",
              year: "2023",
              text: "Which gas is produced when zinc reacts with dilute hydrochloric acid?",
              options: ["Oxygen", "Hydrogen", "Nitrogen", "Carbon dioxide"],
              correctIndex: 1,
              explanation: "Zn + 2HCl → ZnCl₂ + H₂↑, so hydrogen gas is released."
            }
          ];
        }

        const grouped = {};
        if (Array.isArray(rawData)) {
          rawData.forEach((q, idx) => {
            const yearStr = String(q.year || q.examYear || q.yearOfExam || "2025").trim();
            const key = `${yearStr} Questions`;

            if (!grouped[key]) grouped[key] = [];

            let correctIdx = 0;
            if (typeof q.correctIndex === "number") correctIdx = q.correctIndex;
            else if (typeof q.correctOption === "number") correctIdx = q.correctOption;
            else if (typeof q.answerIndex === "number") correctIdx = q.answerIndex;
            else if (typeof q.answer === "number") correctIdx = q.answer;
            else if (typeof q.answer === "string") {
              const index = ["A", "B", "C", "D"].indexOf(q.answer.trim().toUpperCase());
              if (index !== -1) correctIdx = index;
            }

            grouped[key].push({
              id: q.questionId || q._id || q.id || `brp-chem-${idx}`,
              text: q.text || q.questionText || q.question || "",
              options: Array.isArray(q.options) ? q.options : (Array.isArray(q.choices) ? q.choices : []),
              correctIndex: correctIdx,
              explanation: q.explanation || q.solution || ""
            });
          });
        }

        setQuestionsByYear(grouped);
      } catch (err) {
        console.error("Failed to load questions", err);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (viewMode === "viewer" && yearQuestions.length > 0) {
      startTimer();
    }
    return () => timerRef.current && clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, yearQuestions]);

  const backToYears = useCallback(() => {
    if (window.history.state?.page === "viewer") {
      window.history.replaceState(null, "");
    }

    setViewMode("years");
    setSelectedYear(null);
    setYearQuestions([]);
    setCurrentIndex(0);
    setFocusMode && setFocusMode(false);
    timerRef.current && clearInterval(timerRef.current);
  }, [setFocusMode]);

  useEffect(() => {
    const handleBack = (e) => {
      if (viewMode === "viewer") {
        e.preventDefault();
        backToYears();
      }
    };

    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [viewMode, backToYears]);

  /* ================= HELPERS ================= */
  function startTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(0);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => prev + 1);
    }, 1000);
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function getTotal(y) {
    if (y.key === "ALL") {
      return Object.values(questionsByYear).reduce((s, a) => s + a.length, 0);
    }
    return questionsByYear[y.year]?.length || 0;
  }

  function getAttempted(y) {
    if (y.key === "ALL") {
      return Object.keys(attempted).filter(k => attempted[k]).length;
    }
    const arr = questionsByYear[y.year] || [];
    return arr.filter(q => attempted[q.id]).length;
  }

  /* ================= ACTIONS ================= */
  function openYearQuestions(yearObj) {
    if (!isLoggedIn) {
      openLogin();
      return;
    }
    window.history.pushState({ page: "viewer" }, "");
    let qs = [];
    if (yearObj.key === "ALL") {
      Object.values(questionsByYear).forEach(arr => (qs = qs.concat(arr)));
    } else {
      qs = questionsByYear[yearObj.year] || [];
    }

    setYearQuestions(qs);
    setCurrentIndex(0);
    setViewMode("viewer");
    setSelectedYear(yearObj);
    setFocusMode && setFocusMode(true);

    setSelectedAnswers(prev => {
      const next = { ...prev };
      qs.forEach(q => { if (next[q.id] === undefined) next[q.id] = undefined; });
      return next;
    });
    setAttempted(prev => {
      const next = { ...prev };
      qs.forEach(q => { if (next[q.id] === undefined) next[q.id] = false; });
      return next;
    });
    setShowAnswer(prev => {
      const next = { ...prev };
      qs.forEach(q => { if (next[q.id] === undefined) next[q.id] = false; });
      return next;
    });
    setAttemptCount(prev => {
      const next = { ...prev };
      qs.forEach(q => { if (next[q.id] === undefined) next[q.id] = 0; });
      return next;
    });

    startTimer();
  }

  function handleSelectOption(qid, idx) {
    if (showAnswer[qid]) return;
    setSelectedAnswers(prev => ({ ...prev, [qid]: idx }));
  }

  async function handleCheckAnswer() {
    const q = yearQuestions[currentIndex];
    if (!q) return;

    const qid =
      selectedYear?.key === "ALL"
        ? `${q.id}-${currentIndex}`
        : q.id;
    const selected = selectedAnswers[qid];
    if (selected === undefined) return;

    setAttempted(prev => ({ ...prev, [qid]: true }));

    setAttemptCount(prev => {
      const next = (prev[qid] || 0) + 1;

      if (next === 1) setShowAnswer(p => ({ ...p, [qid]: "PARTIAL" }));
      if (next >= 2) setShowAnswer(p => ({ ...p, [qid]: "FULL" }));

      return { ...prev, [qid]: next };
    });

    try {
      const res = await authFetch("/exam/chemistry/attempt", {
        method: "POST",
        body: JSON.stringify({
          questionId: q.id,
          year:
            selectedYear?.key === "ALL"
              ? q.id.split("-")[0]
              : selectedYear?.year,
          isCorrect: selected === q.correctIndex,
          timeTaken: timeLeft,
          exam: "BRP"
        }),
      });

      if (res && res.ok) {
        window.dispatchEvent(new Event("progressUpdated"));
      } else {
        console.warn("BRP chemistry attempt sync not completed on backend");
      }
    } catch (err) {
      console.warn("Failed to save BRP chemistry attempt", err);
    }

    timerRef.current && clearInterval(timerRef.current);
  }

  function handleTryAgain() {
    const q = yearQuestions[currentIndex];
    if (!q) return;
    const qid =
      selectedYear?.key === "ALL"
        ? `${q.id}-${currentIndex}`
        : q.id;

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

  if (showBottomBar) {
    const qid =
      selectedYear?.key === "ALL"
        ? `${yearQuestions[currentIndex].id}-${currentIndex}`
        : yearQuestions[currentIndex].id;

    const isShown = showAnswer[qid] === "PARTIAL" || showAnswer[qid] === "FULL";
    const chosen = selectedAnswers[qid];
    const correctIdx = yearQuestions[currentIndex].correctIndex;
    const showTryAgain = isShown && chosen !== correctIdx;

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

  return (
    <div className={`chemistry-box ${viewMode === "years" ? "bg-years" : "bg-viewer"}`}>

      <style>{`
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

.bg-years{
  background:#f8f9fa;
}

.bg-viewer{
  background:#ffffff;
}

      .pyq-row:hover{
  background: rgba(197, 163, 163, 0.1);
  box-shadow: 0 4px 10px rgba(0,0,0,.10);
  transform: translateY(-1px);
}

      .pyq-left{display:flex;gap:12px;align-items:center}
    .pyq-year{
  width:40px;
  height:40px;
  border-radius:8px;
  background:#e8f0fe;
  color:#1a73e8;

  display:flex;
  align-items:center;
  justify-content:center;

  font-size:13px;
  font-weight:500;
  flex-shrink:0;
}

      .pyq-progress{
  font-size:14px;
  color:#1a73e8;
  font-weight:500;
}

      .pyq-small{font-size:11px;color:#6b7280;margin-top:3px;text-align:right}
    .pyq-arrow{
  font-size:20px;
  color:#9aa0a6;
  transition: transform .12s ease;
}

  .pyq-row:hover .pyq-arrow{
  transform: translateX(2px);
}

      .exam-topbar{
  display:flex;
  justify-content:space-between;
  align-items:center;
  background:#0f172a;
  color:#fff;
  padding:10px 16px;
  margin-bottom:14px;
  border-radius:0;
}

      .exam-left span{display:block;font-size:12px;opacity:.8}
      .exam-center{font-weight:700}
      .exam-right{display:flex;gap:8px;align-items:center}

      .timer-pill{padding:6px 14px;border-radius:999px;font-weight:800;font-size:13px;background:#e0edff;color:#1d4ed8}

      .option-box{
        display:flex;align-items:center;gap:15px;
        border:2px solid #e5e7eb;border-radius:14px;
        padding:14px 16px;margin-bottom:16px;
        cursor:pointer;background:#fff;user-select:none;
        transition: all .18s ease;
        padding-left: 18px;
        padding-right: 18px;
        box-sizing: border-box;
      }

      .option-box strong{
        width:38px;height:38px;border-radius:50%;
        background:#f1f5f9;color:#475569;display:flex;
        align-items:center;justify-content:center;font-weight:700;font-size:15px;
        flex-shrink:0;
      }

      .option-box.selected{
        border:2px solid #1d4ed8;
        background:#ffffff;
      }
      .option-box.selected strong{
        background:#1d4ed8;
        color:#ffffff;
      }

      .option-box.correct{
        border-color:#22c55e;
        background:#ffffff;
        position: relative;
        padding-right: 44px;
      }
      .option-box.correct strong{
        background:#dcfce7;
        color:#16a34a;
      }

      .option-box.incorrect{
        border-color:#ef4444;
        background:#ffffff;
        position: relative;
        padding-right: 44px;
      }
      .option-box.incorrect strong{
        background:#fee2e2;
        color:#dc2626;
      }

      .status-icon{
        position: absolute;
        top: 50%;
        right: 16px;
        transform: translateY(-50%);
        width: 26px;
        height: 26px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 700;
        color: #fff;
        flex-shrink: 0;
      }

      .status-icon-correct{
        background: #22c55e;
      }

      .status-icon-wrong{
        background: #ef4444;
      }

      .marked-tag{
        position: absolute;
        top: -10px;
        right: 16px;
        background: #ffffff;
        padding: 0 6px;
        font-size: 11px;
        font-weight: 700;
        color: #ef4444;
        letter-spacing: 0.2px;
      }
        
        .question-text {
  white-space: pre-line;
}
  .solution-box{
  margin: 20px 16px 140px 16px;
  padding: 18px;
  background: #fefce8;
  border: 1.5px solid #fde68a;
  border-radius: 14px;
  box-shadow: 0 1px 3px rgba(0,0,0,.04);
}

.solution-header{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid #fde68a;
}

.solution-label{
  font-weight: 700;
  font-size: 15px;
  color: #1d4ed8;
  letter-spacing: 0.2px;
  text-align: center;
}
.solution-lang-block{
  margin-bottom: 14px;
  padding-left: 12px;
  border-left: 3px solid #fbbf24;
}

.solution-lang-block:last-child{
  margin-bottom: 0;
}

.solution-lang-hindi{
  border-left-color: #60a5fa;
}

.solution-lang-tag{
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #b45309;
  margin-bottom: 4px;
}

.solution-lang-hindi .solution-lang-tag{
  color: #1d4ed8;
}

.solution-text{
  font-size: 14.5px;
  line-height: 1.7;
  color: #1f2937;
  white-space: pre-line;
}

.solution-empty{
  font-size: 13.5px;
  color: #9ca3af;
  font-style: italic;
}

.mcq-viewer{
  width: 100%;
  padding-bottom: 120px;
  overflow-x: hidden;
}

.question-full{
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
}

.mcq-content{
  width: 100%;
  margin: 0;
  padding: 8px 16px 0 16px;
  box-sizing: border-box;
  max-width: none;
}

.mcq-content .option-box{
  width: 100%;
  max-width: none;
}

.question-text{
  line-height: 1.65;
  font-weight: 700;
}
  

      .bottom-action-bar{
  position:fixed;
  bottom:0;
  left:0;
  right:0;
  background:#ffffff;
  padding:14px 16px 18px;
  border-top:1px solid #e5e7eb;
  z-index:1000;
}
  .bottom-action-inner .btn-primary{
  background:#006eff !important;
  border:none !important;
  opacity:1 !important;
  color:#ffffff !important;
}

.bottom-action-inner .btn-primary:disabled,
.bottom-action-inner .btn-primary.disabled{
  background:#57a0ff !important;
  border:none !important;
  opacity:1 !important;
  color:#ffffff !important;
}

      .bottom-action-inner{
        max-width:760px;
        margin:0 auto;
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:12px;
      }

      .bottom-action-inner button{
        min-width:110px;
        height:44px;
        border-radius:12px;
        font-weight:600;
        font-size:15px;
      }

      .bottom-action-inner .btn-light{
        border-radius:12px !important;
        border:1.5px solid #d1d5db !important;
        background:#ffffff !important;
        color:#111827;
      }
      .bottom-action-inner .btn-light:hover{
        background:#f9fafb !important;
      }
      .bottom-action-inner .btn-light:disabled,
      .bottom-action-inner .btn-light.disabled{
        border-radius:12px !important;
        border:1.5px solid #d1d5db !important;
        background:#ffffff !important;
        color:#9ca3af !important;
        opacity:1 !important;
      }

      .try-btn{
        background:#111827;
        color:#fff;
        border:0;
        min-width:160px;
        height:44px;
        border-radius:12px;
        display:inline-flex;
        align-items:center;
        justify-content:center;
        gap:10px;
        font-weight:700;
        font-size:15px;
      }
      .try-btn:hover{opacity:.95}

      @media (max-width:600px){
  .mcq-content{
    padding: 8px 12px 0 12px;
  }

  .question-full{
    padding: 0 12px;
  }

  .exam-topbar{
    padding-left:12px;
    padding-right:12px;
  }

  .option-box{
    padding: 12px 14px;
  }
}

        .loading-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: #374151;
}

.loading-box p {
  margin-top: 14px;
  font-weight: 600;
}

.loading-box small {
  margin-top: 6px;
  color: #6b7280;
}

.spinner {
  width: 42px;
  height: 42px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #2563eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
  .pyq-right{
  display:flex;
  align-items:center;
  gap:12px;
}

      `}</style>

      {/* ================= YEAR LIST ================= */}
      {viewMode === "years" && (
        <>
          <h2 className="pyq-title">Chemistry Previous Year Questions</h2>

          {loading ? (
            <div className="loading-box">
              <div className="spinner"></div>
              <p>Loading questions, please wait…</p>
              <small>This may take a few seconds on first load</small>
            </div>
          ) : (
            <div className="pyq-list">
              {dynamicYears.map((y, i) => (
                <div key={i} className="pyq-row" onClick={() => openYearQuestions(y)}>
                  <div className="pyq-left">
                    <div className="pyq-year">{y.key}</div>
                    <div>
                      <div style={{ fontWeight: 500 }}>

                        {y.key === "ALL"
                          ? "All Previous Year Questions"
                          : "Bihar Polytechnic Chemistry PYQ"}
                      </div>
                    </div>
                  </div>

                  <div className="pyq-right">
                    <div className="pyq-progress">
                      {getAttempted(y)}/{getTotal(y)}
                    </div>
                    <div className="pyq-arrow">›</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}


      {/* ================= MCQ VIEWER ================= */}
      {viewMode === "viewer" && yearQuestions.length > 0 && (
        <MathJaxContext>
          <div className="mcq-viewer">
            <div className="exam-topbar">
              <div className="exam-left">
                <strong>Bihar Polytechnic</strong>
                <span>Chemistry – {selectedYear?.key === "ALL" ? "All PYQ" : selectedYear?.year}</span>
              </div>
              <div className="exam-center">Q {currentIndex + 1} / {yearQuestions.length}</div>
              <div className="exam-right">
                <div className="timer-pill">⏱ {formatTime(timeLeft)}</div>
                <Button size="sm" variant="light" onClick={backToYears}>✕</Button>
              </div>
            </div>

            <div className="question-full">
              <div className="fw-bold mb-12 question-text" style={{ fontSize: "1.02rem" }}>
                <MathJax dynamic>
                  {yearQuestions[currentIndex].text}
                </MathJax>
              </div>
            </div>

            <div className="mcq-content">
              {yearQuestions[currentIndex].options.map((opt, idx) => {
                const qid =
                  selectedYear?.key === "ALL"
                    ? `${yearQuestions[currentIndex].id}-${currentIndex}`
                    : yearQuestions[currentIndex].id;

                const showState = showAnswer[qid];
                const isCorrect = yearQuestions[currentIndex].correctIndex === idx;
                const isSelected = selectedAnswers[qid] === idx;

                let cls = "option-box";
                if (!showState && isSelected) cls += " selected";

                if (showState === "PARTIAL" && isSelected && isCorrect) cls += " correct";
                if (showState === "PARTIAL" && isSelected && !isCorrect) cls += " incorrect";

                if (showState === "FULL" && isCorrect) cls += " correct";
                if (showState === "FULL" && isSelected && !isCorrect) cls += " incorrect";

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
                    <div>
                      <MathJax dynamic>{opt}</MathJax>
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

            {(() => {
              const qid =
                selectedYear?.key === "ALL"
                  ? `${yearQuestions[currentIndex].id}-${currentIndex}`
                  : yearQuestions[currentIndex].id;

              const showState = showAnswer[qid];
              const chosen = selectedAnswers[qid];
              const correctIdx = yearQuestions[currentIndex].correctIndex;

              const showSolution =
                (showState === "PARTIAL" && chosen === correctIdx) ||
                showState === "FULL";

              if (!showSolution) return null;

              const explanation = yearQuestions[currentIndex].explanation;

             if (!explanation || explanation.trim().length === 0) {
                return (
                  <div className="solution-box">
                  <div className="solution-header">
                    <span className="solution-label">Futurely Solution</span>
                  </div>
                    <div className="solution-empty">
                      Solution not added yet for this question.
                    </div>
                  </div>
                );
              }

              const [englishPart = "", hindiPart = ""] = explanation.split("\n---\n");

              return (
                <div className="solution-box">
                  <div className="solution-header">
                    <span className="solution-label">Futurely Solution</span>
                  </div>

                  <div className="solution-lang-block">
                    <div className="solution-lang-tag">English</div>
                    <div className="solution-text">
                      <MathJax dynamic>{englishPart}</MathJax>
                    </div>
                  </div>

                  {hindiPart && (
                    <div className="solution-lang-block solution-lang-hindi">
                      <div className="solution-lang-tag">हिंदी</div>
                      <div className="solution-text">
                        <MathJax dynamic>{hindiPart}</MathJax>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </MathJaxContext>
      )}

      {bottomBar}
    </div>
  );
}