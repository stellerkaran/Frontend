"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import BuyModal from "@/components/BuyModal";
import { authFetch } from "@/src/utils/api";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useAuth } from "@/src/context/AuthContext";

/* ─────────────────────────────────────────────
   CHAPTER DATA — PARAMEDICAL (PM)
───────────────────────────────────────────── */
const CHAPTER_DATA = {
  Physics: [
    { id: "P1", title: "Units & Measurements / भौतिकी में मापन" },
    { id: "P2", title: "Kinematics & Motion / गतिकी तथा गति के नियम" },
    { id: "P3", title: "Work, Energy & Power / कार्य, ऊर्जा तथा शक्ति" },
    { id: "P4", title: "Gravitation & Properties of Matter / गुरुत्वाकर्षण तथा पदार्थ के गुण" },
    { id: "P5", title: "Heat & Thermodynamics / ऊष्मा तथा उष्मागतिकी" },
    { id: "P6", title: "Waves & Sound / तरंगें तथा ध्वनि" },
    { id: "P7", title: "Electrostatics & Current Electricity / स्थिर वैद्युतिकी एवं विद्युत धारा" },
    { id: "P8", title: "Optics & Light / प्रकाशिकी एवं प्रकाश" },
    { id: "P9", title: "Modern Physics & Magnetism / आधुनिक भौतिकी तथा चुंबकत्व" }
  ],
  Chemistry: [
    { id: "C1", title: "Basic Concepts of Chemistry / रसायन विज्ञान की मूलभूत अवधारणाएं" },
    { id: "C2", title: "Atomic Structure & Periodic Table / परमाणु संरचना तथा आवर्त सारणी" },
    { id: "C3", title: "Chemical Bonding & States of Matter / रासायनिक आबंधन एवं द्रव्य की अवस्थाएं" },
    { id: "C4", title: "Thermodynamics & Equilibrium / ऊष्मागतिकी तथा साम्यावस्था" },
    { id: "C5", title: "Redox Reactions & Electrochemistry / रेडॉक्स अभिक्रियाएं एवं वैद्युत रसायन" },
    { id: "C6", title: "Organic Chemistry - Basics / कार्बनिक रसायन - बुनियादी सिद्धांत" },
    { id: "C7", title: "Hydrocarbons & Organic Compounds / हाइड्रोकार्बन एवं कार्बनिक यौगिक" },
    { id: "C8", title: "Biomolecules & Everyday Chemistry / जैव अणु एवं दैनिक जीवन में रसायन" }
  ],
  Biology: [
    { id: "B1", title: "Diversity in Living World / जीव जगत में विविधता" },
    { id: "B2", title: "Structural Organisation in Animals & Plants / पादप एवं प्राणियों में संरचनात्मक संगठन" },
    { id: "B3", title: "Cell Structure & Function / कोशिका: संरचना एवं कार्य" },
    { id: "B4", title: "Plant Physiology / पादप कार्यिकी" },
    { id: "B5", title: "Human Physiology / मानव कार्यिकी" },
    { id: "B6", title: "Reproduction in Organisms & Humans / जीव जनन एवं मानव जनन" },
    { id: "B7", title: "Genetics & Evolution / आनुवंशिकी तथा विकास" },
    { id: "B8", title: "Biology & Human Welfare / मानव कल्याण में जीव विज्ञान" },
    { id: "B9", title: "Biotechnology & Ecology / जैव प्रौद्योगिकी एवं पारिस्थितिकी" }
  ]
};

export default function ChapterwisePYQPM({ setFocusMode }) {
  const { user } = useAuth();
  const [activeSubject, setActiveSubject] = useState("Physics");
  const [activeChapter, setActiveChapter] = useState(null);
  const [unlockedChapters, setUnlockedChapters] = useState([]);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [pendingChapter, setPendingChapter] = useState(null);

  /* Viewer State */
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [attempted, setAttempted] = useState({});
  const [showAnswer, setShowAnswer] = useState({});
  const [attemptCount, setAttemptCount] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [viewMode, setViewMode] = useState("list");
  const [loading, setLoading] = useState(false);

  const timerRef = useRef(null);

  /* ─────────────────────────────────────────────
     FETCH UNLOCKED CHAPTERS ON MOUNT
  ───────────────────────────────────────────── */
  useEffect(() => {
    async function fetchPurchased() {
      if (!user) return;
      try {
        const res = await authFetch("/purchases/my-purchases");
        if (res.ok) {
          const data = await res.json();
          const unlocked = data
            .filter((p) => p.itemType === "CHAPTER_PYQ")
            .map((p) => p.itemId);
          setUnlockedChapters(unlocked);
        }
      } catch (err) {
        console.error("Failed to fetch unlocked chapters:", err);
      }
    }
    fetchPurchased();
  }, [user]);

  /* ─────────────────────────────────────────────
     TIMER HELPERS
  ───────────────────────────────────────────── */
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(0);
    timerRef.current = setInterval(() => setTimeLeft((t) => t + 1), 1000);
  }, []);

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  /* ─────────────────────────────────────────────
     NAVIGATION / BACK HANDLER
  ───────────────────────────────────────────── */
  const backToList = useCallback(() => {
    if (typeof window !== "undefined" && window.history.state?.page === "cwViewer") {
      window.history.replaceState(null, "");
    }
    setViewMode("list");
    setActiveChapter(null);
    setQuestions([]);
    setCurrentIndex(0);
    if (setFocusMode) setFocusMode(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [setFocusMode]);

  useEffect(() => {
    const handlePopState = (e) => {
      if (viewMode === "viewer") {
        e.preventDefault();
        backToList();
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [viewMode, backToList]);

  /* ─────────────────────────────────────────────
     OPEN CHAPTER
  ───────────────────────────────────────────── */
  const handleChapterClick = async (chapter) => {
    const isFirst = chapter.id === "P1" || chapter.id === "C1" || chapter.id === "B1";
    const isUnlocked = isFirst || unlockedChapters.includes(chapter.id);

    if (!isUnlocked) {
      setPendingChapter(chapter);
      setShowBuyModal(true);
      return;
    }

    openChapterQuestions(chapter);
  };

  const openChapterQuestions = async (chapter) => {
    setActiveChapter(chapter);
    setLoading(true);
    setViewMode("viewer");
    if (setFocusMode) setFocusMode(true);

    if (typeof window !== "undefined") {
      window.history.pushState({ page: "cwViewer" }, "");
    }

    try {
      const res = await authFetch(`/questions?exam=PM&chapterId=${chapter.id}`);
      if (res.ok) {
        const data = await res.json();
        const formatted = data.map((q) => ({
          id: q.questionId,
          text: q.text,
          options: q.options,
          correctIndex: q.correctIndex,
          explanation: q.explanation || "",
        }));
        setQuestions(formatted);
        setCurrentIndex(0);
        setSelectedAnswers({});
        setAttempted({});
        setShowAnswer({});
        setAttemptCount({});
        startTimer();
      }
    } catch (err) {
      console.error("Error loading chapter questions:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────────────────────
     ANSWER HANDLERS
  ───────────────────────────────────────────── */
  const handleSelectOption = (qId, idx) => {
    if (showAnswer[qId]) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: idx }));
  };

  const handleCheckAnswer = async () => {
    const q = questions[currentIndex];
    if (!q) return;

    const selected = selectedAnswers[q.id];
    if (selected === undefined) return;

    setAttempted((prev) => ({ ...prev, [q.id]: true }));

    const newCount = (attemptCount[q.id] || 0) + 1;
    setAttemptCount((prev) => ({ ...prev, [q.id]: newCount }));

    if (newCount === 1) setShowAnswer((prev) => ({ ...prev, [q.id]: "PARTIAL" }));
    if (newCount >= 2) setShowAnswer((prev) => ({ ...prev, [q.id]: "FULL" }));

    try {
      await authFetch(`/exam/${activeSubject.toLowerCase()}/attempt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: q.id,
          chapterId: activeChapter.id,
          isCorrect: selected === q.correctIndex,
          timeTaken: timeLeft,
          exam: "PM",
        }),
      });
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("progressUpdated"));
      }
    } catch (err) {
      console.error("Error saving attempt:", err);
    }

    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleTryAgain = () => {
    const q = questions[currentIndex];
    if (!q) return;
    setShowAnswer((prev) => ({ ...prev, [q.id]: false }));
    setSelectedAnswers((prev) => ({ ...prev, [q.id]: undefined }));
    startTimer();
  };

  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      startTimer();
    }
  };

  const goPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      startTimer();
    }
  };

  const handleUnlockSuccess = () => {
    if (pendingChapter) {
      setUnlockedChapters((prev) => [...prev, pendingChapter.id]);
      openChapterQuestions(pendingChapter);
    }
    setShowBuyModal(false);
    setPendingChapter(null);
  };

  /* ─────────────────────────────────────────────
     RENDER LIST VIEW
  ───────────────────────────────────────────── */
  if (viewMode === "list") {
    return (
      <div className="cw-container">
        <style>{`
          .cw-container { width: 100%; padding: 12px 0; }
          .cw-sub-tabs { display: flex; gap: 8px; margin-bottom: 16px; justify-content: center; }
          .cw-sub-btn {
            padding: 8px 18px; border-radius: 20px; font-weight: 600; font-size: 13.5px;
            border: 1.5px solid #e2e8f0; background: #fff; color: #475569; cursor: pointer; transition: all 0.15s;
          }
          .cw-sub-btn.active { background: #2563eb; color: #fff; border-color: #2563eb; }
          .cw-list { display: flex; flex-direction: column; gap: 10px; }
          .cw-item {
            display: flex; justify-content: space-between; align-items: center;
            background: #fff; padding: 14px 16px; border-radius: 12px; border: 1px solid #e2e8f0;
            cursor: pointer; transition: all 0.15s;
          }
          .cw-item:hover { border-color: #cbd5e1; box-shadow: 0 2px 6px rgba(0,0,0,0.04); }
          .cw-item-left { display: flex; align-items: center; gap: 12px; }
          .cw-num {
            width: 32px; height: 32px; border-radius: 8px; background: #eff6ff; color: #2563eb;
            font-weight: 700; font-size: 13px; display: flex; align-items: center; justify-content: center;
          }
          .cw-title { font-size: 14px; font-weight: 600; color: #1e293b; }
          .cw-status { font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 12px; }
          .cw-free { background: #dcfce7; color: #166534; }
          .cw-lock { background: #fef3c7; color: #92400e; display: flex; align-items: center; gap: 4px; }
          .cw-unlocked { background: #e0e7ff; color: #3730a3; }
        `}</style>

        {/* SUBJECT TABS */}
        <div className="cw-sub-tabs">
          {["Physics", "Chemistry", "Biology"].map((sub) => (
            <button
              key={sub}
              className={`cw-sub-btn ${activeSubject === sub ? "active" : ""}`}
              onClick={() => setActiveSubject(sub)}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* CHAPTER LIST */}
        <div className="cw-list">
          {CHAPTER_DATA[activeSubject]?.map((ch, idx) => {
            const isFirst = ch.id === "P1" || ch.id === "C1" || ch.id === "B1";
            const isUnlocked = isFirst || unlockedChapters.includes(ch.id);

            return (
              <div key={ch.id} className="cw-item" onClick={() => handleChapterClick(ch)}>
                <div className="cw-item-left">
                  <div className="cw-num">{idx + 1}</div>
                  <div className="cw-title">{ch.title}</div>
                </div>

                <div>
                  {isFirst ? (
                    <span className="cw-status cw-free">FREE</span>
                  ) : isUnlocked ? (
                    <span className="cw-status cw-unlocked">UNLOCKED</span>
                  ) : (
                    <span className="cw-status cw-lock">🔒 ₹9</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* BUY MODAL */}
        {showBuyModal && pendingChapter && (
          <BuyModal
            show={showBuyModal}
            onClose={() => setShowBuyModal(false)}
            itemType="CHAPTER_PYQ"
            itemId={pendingChapter.id}
            title={pendingChapter.title}
            amount={9}
            onSuccess={handleUnlockSuccess}
          />
        )}
      </div>
    );
  }

  /* ─────────────────────────────────────────────
     RENDER VIEWER VIEW
  ───────────────────────────────────────────── */
  const q = questions[currentIndex];
  const qId = q?.id;

  const showState = showAnswer[qId];
  const isShown = showState === "PARTIAL" || showState === "FULL";
  const chosen = selectedAnswers[qId];
  const isCorrectChoice = q && chosen === q.correctIndex;
  const showTryAgain = isShown && !isCorrectChoice;

  return (
    <MathJaxContext>
      <div className="cw-viewer">
        <style>{`
          .cw-viewer { width: 100%; padding-bottom: 100px; background: #fff; min-height: 100vh; }
          .exam-topbar {
            display: flex; justify-content: space-between; align-items: center;
            background: #0f172a; color: #fff; padding: 10px 16px; margin-bottom: 14px;
          }
          .exam-left span { display: block; font-size: 12px; opacity: .8; }
          .exam-center { font-weight: 700; }
          .timer-pill { padding: 6px 14px; border-radius: 999px; font-weight: 800; font-size: 13px; background: #e0edff; color: #1d4ed8; }
          .close-btn { background: #fff; color: #000; border: none; padding: 4px 10px; border-radius: 6px; font-weight: 700; cursor: pointer; }
          
          .question-full { padding: 0 16px; font-weight: 700; font-size: 1.02rem; margin-bottom: 16px; line-height: 1.6; }
          .mcq-content { padding: 0 16px; }
          
          .option-box {
            display: flex; align-items: center; gap: 15px; border: 2px solid #e5e7eb;
            border-radius: 14px; padding: 14px 16px; margin-bottom: 12px; cursor: pointer;
            background: #fff; transition: all .18s ease; position: relative;
          }
          .option-box strong {
            width: 38px; height: 38px; border-radius: 50%; background: #f1f5f9; color: #475569;
            display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;
          }
          .option-box.selected { border-color: #1d4ed8; }
          .option-box.selected strong { background: #1d4ed8; color: #fff; }
          .option-box.correct { border-color: #22c55e; }
          .option-box.correct strong { background: #dcfce7; color: #16a34a; }
          .option-box.incorrect { border-color: #ef4444; }
          .option-box.incorrect strong { background: #fee2e2; color: #dc2626; }

          .status-icon {
            position: absolute; right: 16px; width: 26px; height: 26px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #fff;
          }
          .status-icon-correct { background: #22c55e; }
          .status-icon-wrong { background: #ef4444; }

          .solution-box {
            margin: 20px 16px 100px 16px; padding: 18px; background: #fefce8;
            border: 1.5px solid #fde68a; border-radius: 14px;
          }
          .solution-header { font-weight: 700; color: #1d4ed8; text-align: center; margin-bottom: 10px; border-bottom: 1px solid #fde68a; padding-bottom: 8px; }
          .solution-text { font-size: 14.5px; line-height: 1.6; color: #1f2937; }

          .bottom-action-bar {
            position: fixed; bottom: 0; left: 0; right: 0; background: #fff;
            padding: 12px 16px; border-top: 1px solid #e5e7eb; z-index: 1000;
          }
          .bottom-action-inner {
            max-width: 760px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; gap: 12px;
          }
          .btn-nav { padding: 8px 16px; border-radius: 8px; font-weight: 600; border: 1px solid #cbd5e1; background: #fff; }
          .btn-action { padding: 10px 24px; border-radius: 8px; font-weight: 700; background: #2563eb; color: #fff; border: none; }
          .btn-action:disabled { background: #93c5fd; }
          .try-btn { background: #0f172a; color: #fff; padding: 10px 20px; border-radius: 8px; font-weight: 700; border: none; }
        `}</style>

        {/* TOPBAR */}
        <div className="exam-topbar">
          <div className="exam-left">
            <strong>{activeChapter?.title}</strong>
            <span>Chapterwise PYQ ({activeSubject})</span>
          </div>
          <div className="exam-center">Q {currentIndex + 1} / {questions.length}</div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div className="timer-pill">⏱ {formatTime(timeLeft)}</div>
            <button className="close-btn" onClick={backToList}>✕</button>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>Loading Chapter Questions...</div>
        ) : q ? (
          <>
            <div className="question-full">
              <MathJax dynamic>{q.text}</MathJax>
            </div>

            <div className="mcq-content">
              {q.options.map((opt, idx) => {
                const isSelected = selectedAnswers[qId] === idx;
                const isCorrect = q.correctIndex === idx;

                let cls = "option-box";
                if (!showState && isSelected) cls += " selected";
                if (showState === "PARTIAL" && isSelected && isCorrect) cls += " correct";
                if (showState === "PARTIAL" && isSelected && !isCorrect) cls += " incorrect";
                if (showState === "FULL" && isCorrect) cls += " correct";
                if (showState === "FULL" && isSelected && !isCorrect) cls += " incorrect";

                return (
                  <div key={idx} className={cls} onClick={() => handleSelectOption(qId, idx)}>
                    <strong>{String.fromCharCode(65 + idx)}</strong>
                    <div><MathJax dynamic>{opt}</MathJax></div>
                    {cls.includes("correct") && <span className="status-icon status-icon-correct">✓</span>}
                    {cls.includes("incorrect") && <span className="status-icon status-icon-wrong">✕</span>}
                  </div>
                );
              })}
            </div>

            {/* SOLUTION BLOCK */}
            {(showState === "FULL" || (showState === "PARTIAL" && isCorrectChoice)) && (
              <div className="solution-box">
                <div className="solution-header">Futurely Solution</div>
                <div className="solution-text">
                  <MathJax dynamic>{q.explanation || "Solution not provided."}</MathJax>
                </div>
              </div>
            )}

            {/* BOTTOM BAR */}
            <div className="bottom-action-bar">
              <div className="bottom-action-inner">
                <button className="btn-nav" onClick={goPrevious} disabled={currentIndex === 0}>Previous</button>

                {showTryAgain ? (
                  <button className="try-btn" onClick={handleTryAgain}>↺ Try Again</button>
                ) : (
                  <button
                    className="btn-action"
                    onClick={handleCheckAnswer}
                    disabled={isShown || selectedAnswers[qId] === undefined}
                  >
                    Check Answer
                  </button>
                )}

                <button className="btn-nav" onClick={goNext} disabled={currentIndex === questions.length - 1}>Next</button>
              </div>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "40px" }}>No questions found for this chapter.</div>
        )}
      </div>
    </MathJaxContext>
  );
}
