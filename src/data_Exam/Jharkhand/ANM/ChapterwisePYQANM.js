"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import BuyModal from "@/components/BuyModal";
import { authFetch } from "@/src/utils/api";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useAuth } from "@/src/context/AuthContext";

/* ─────────────────────────────────────────────
   CHAPTER DATA
───────────────────────────────────────────── */
const CHAPTER_DATA = {
  "General Science": [
    {
      name: "Human Anatomy & Physiology / मानव शरीर रचना एवं क्रिया विज्ञान",
      free: true,
      questionIds: ["2025-anm-sc-1", "2025-anm-sc-2", "2024-anm-sc-1", "2023-anm-sc-1", "2022-anm-sc-1"]
    },
    {
      name: "Cell Biology & Microorganisms / कोशिका विज्ञान एवं सूक्ष्मजीव",
      free: false,
      questionIds: ["2025-anm-sc-3", "2024-anm-sc-2", "2023-anm-sc-2", "2021-anm-sc-1"]
    },
    {
      name: "Nutrition, Health & Hygiene / पोषण, स्वास्थ्य एवं स्वच्छता",
      free: false,
      questionIds: ["2025-anm-sc-4", "2024-anm-sc-3", "2022-anm-sc-2"]
    },
    {
      name: "Diseases & Immunization / रोग एवं टीकाकरण",
      free: false,
      questionIds: ["2025-anm-sc-5", "2024-anm-sc-4", "2023-anm-sc-3"]
    },
    {
      name: "First Aid & Basic Medical Science / प्राथमिक चिकित्सा एवं चिकित्सा विज्ञान",
      free: false,
      questionIds: ["2025-anm-sc-6", "2022-anm-sc-3", "2021-anm-sc-2"]
    }
  ],
  "General Knowledge": [
    {
      name: "Jharkhand GK & History / झारखंड सामान्य ज्ञान एवं इतिहास",
      free: true,
      questionIds: ["2025-anm-gk-1", "2024-anm-gk-1", "2023-anm-gk-1", "2021-anm-gk-1"]
    },
    {
      name: "Health Schemes & ANM Role / स्वास्थ्य योजनाएं एवं ANM की भूमिका",
      free: false,
      questionIds: ["2025-anm-gk-2", "2024-anm-gk-2", "2023-anm-gk-2"]
    },
    {
      name: "National Health Organizations & Days / प्रमुख स्वास्थ्य संगठन एवं दिवस",
      free: false,
      questionIds: ["2025-anm-gk-3", "2022-anm-gk-1", "2021-anm-gk-2"]
    },
    {
      name: "General Awareness & Culture / सामान्य जागरूकता एवं संस्कृति",
      free: false,
      questionIds: ["2024-anm-gk-3", "2023-anm-gk-3"]
    }
  ],
  Mathematics: [
    {
      name: "Number System & Simplification / संख्या पद्धति एवं सरलीकरण",
      free: true,
      questionIds: ["2025-anm-m-1", "2024-anm-m-1", "2023-anm-m-1", "2022-anm-m-1"]
    },
    {
      name: "Percentage, Ratio & Proportion / प्रतिशतता एवं अनुपात",
      free: false,
      questionIds: ["2025-anm-m-2", "2024-anm-m-2", "2021-anm-m-1"]
    },
    {
      name: "Average, Profit & Loss / औसत, लाभ एवं हानि",
      free: false,
      questionIds: ["2025-anm-m-3", "2023-anm-m-2", "2022-anm-m-2"]
    },
    {
      name: "Time, Work & Dosage Math / समय, कार्य एवं खुराक गणित",
      free: false,
      questionIds: ["2025-anm-m-4", "2024-anm-m-3", "2021-anm-m-2"]
    }
  ]
};
const SUBJECTS = ["General Science", "General Knowledge", "Mathematics"];

/* ─────────────────────────────────────────────
   SHARED STYLES
───────────────────────────────────────────── */
const CW_STYLES = `
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Chapter list root ── */
.cw-root { padding: 4px 0 24px; background: #f8f9fa; }

/* ── Chapter cards ── */
.cw-chapter-grid { display: flex; flex-direction: column; gap: 10px; }
.cw-chapter-card {
  display: flex; align-items: center; gap: 12px;
  background: #fff; border: 1.5px solid #ede9fe;
  border-radius: 14px; padding: 14px 14px 14px 12px;
  cursor: pointer; transition: box-shadow 0.15s, transform 0.12s, border-color 0.15s;
  position: relative; overflow: hidden;
}
.cw-chapter-card::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0;
  width: 4px; background: #0aa06e; border-radius: 4px 0 0 4px;
  opacity: 0; transition: opacity 0.15s;
}
.cw-chapter-card:hover { box-shadow: 0 4px 16px rgba(10,160,110,0.13); transform: translateY(-1px); border-color: #6ee7b7; }
.cw-chapter-card:hover::before { opacity: 1; }
.cw-chapter-card--locked { border-color: #f3f4f6; cursor: default; opacity: 0.75; }
.cw-chapter-card--locked::before { display: none; }
.cw-chapter-card--locked:hover { box-shadow: none; transform: none; border-color: #f3f4f6; }

.cw-ch-num-badge {
  width: 32px; height: 32px; border-radius: 8px;
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 900; color: #0aa06e; flex-shrink: 0;
}
.cw-chapter-card--locked .cw-ch-num-badge { background: #f3f4f6; color: #9ca3af; }

.cw-ch-info { flex: 1; min-width: 0; }
.cw-ch-name { font-weight: 700; color: #1f2937; font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cw-ch-meta { font-size: 11px; color: #9ca3af; margin-top: 2px; }

.cw-ch-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.cw-ch-count { font-size: 11px; font-weight: 700; color: #0aa06e; background: #d1fae5; padding: 3px 9px; border-radius: 999px; white-space: nowrap; }
.cw-ch-soon { font-size: 10px; color: #9ca3af; background: #f9fafb; padding: 3px 8px; border-radius: 999px; }
.cw-ch-arrow { font-size: 16px; color: #6ee7b7; transition: transform 0.15s; }
.cw-chapter-card:hover .cw-ch-arrow { transform: translateX(3px); color: #0aa06e; }
.cw-ch-lock { font-size: 13px; opacity: 0.4; }
.cw-ch-free-badge {
  font-size: 10px; font-weight: 800; color: #16a34a;
  background: #dcfce7; border: 1px solid #86efac;
  padding: 2px 8px; border-radius: 999px; white-space: nowrap;
}

/* ── Blur overlay for locked preview ── */
.cw-blur-wrap { position: relative; border-radius: 12px; overflow: hidden; }
.cw-blur-overlay {
  position: absolute; bottom: 0; left: 0; right: 0; height: 65%;
  background: linear-gradient(to bottom, transparent 0%, rgba(248,249,250,0.92) 45%, #f8f9fa 100%);
  display: flex; align-items: flex-end; justify-content: center;
  padding-bottom: 20px;
}

/* ── Unlock card ── */
.cw-unlock-card {
  background: #ffffff;
  border: 1.5px solid #e5e7eb;
  border-radius: 16px; padding: 28px 20px 22px;
  text-align: center; margin-bottom: 20px;
  position: relative; overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
}
.cw-unlock-icon { font-size: 40px; margin-bottom: 10px; }
.cw-unlock-title { color: #111827; font-size: clamp(16px,4vw,19px); font-weight: 800; margin: 0 0 6px; line-height: 1.3; }
.cw-unlock-desc { color: #6b7280; font-size: 13.5px; margin: 0 0 18px; line-height: 1.5; }

.cw-unlock-divider {
  display: flex; align-items: center; gap: 10px; margin: 14px 0 10px;
}
.cw-unlock-divider span { flex: 1; height: 1px; background: #e5e7eb; }
.cw-unlock-divider em { color: #9ca3af; font-size: 11px; font-style: normal; white-space: nowrap; }

.cw-buymodal-wrap { display: flex; justify-content: center; margin-bottom: 6px; }
.cw-buymodal-wrap > button,
.cw-buymodal-wrap > div > button {
  width: 100% !important; justify-content: center !important;
  font-size: 15px !important; padding: 14px 20px !important;
  border-radius: 12px !important;
  background: #0aa06e !important;
  color: #fff !important;
  font-weight: 800 !important;
  border: none !important;
  box-shadow: 0 4px 14px rgba(10,160,110,0.35) !important;
}

.cw-buymodal-wrap-bundle > button,
.cw-buymodal-wrap-bundle > div > button {
  width: 100% !important; justify-content: center !important;
  font-size: 14px !important; padding: 12px 20px !important;
  border-radius: 12px !important;
  background: #fff !important;
  color: #0aa06e !important;
  font-weight: 700 !important;
  border: 1.5px solid #a7f3d0 !important;
  box-shadow: none !important;
}

.cw-buymodal-wrap-bundle {
  display: flex; justify-content: center; margin-bottom: 6px;
}

.cw-blur-overlay > button,
.cw-blur-overlay > div > button {
  background: #0aa06e !important;
  border-radius: 10px !important; padding: 12px 28px !important;
  font-size: 14px !important; font-weight: 800 !important;
  color: #fff !important; border: none !important;
  box-shadow: 0 4px 18px rgba(10,160,110,0.35) !important;
}

/* ── Section label & subject tabs ── */
.cw-section-label {
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.06em; color: #9ca3af; margin-bottom: 10px;
}
.cw-unlocked-badge {
  display: flex; align-items: center; justify-content: center;
  background: #dcfce7; border: 1px solid #86efac;
  border-radius: 10px; padding: 10px 14px;
  font-size: 13px; font-weight: 700; color: #166534; margin-bottom: 16px;
}
.cw-subject-tabs {
  display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;
}
.cw-stab {
  border: 1.5px solid #d1d5db; background: #fff; color: #374151;
  font-size: 12px; font-weight: 700; padding: 6px 14px; border-radius: 999px;
  cursor: pointer; transition: background 0.15s, color 0.15s;
  -webkit-tap-highlight-color: transparent;
}
.cw-stab.active { background: #0aa06e; color: #fff; border-color: #0aa06e; }

/* ── MCQ Viewer ── */
.cw-viewer-wrap {
  position: fixed; top: 56px; left: 0; width: 100%;
  height: calc(100% - 56px);
  z-index: 9999; background: #fff; overflow-y: auto;
  display: flex; flex-direction: column;
}

.cw-topbar {
  display: flex; justify-content: space-between; align-items: center;
  background: #0f172a; color: #fff; padding: 10px 16px;
  position: sticky; top: 0; z-index: 1001; flex-shrink: 0;
}
.cw-topbar-left strong { display: block; font-size: 13px; font-weight: 800; }
.cw-topbar-left span { display: block; font-size: 11px; opacity: 0.7; margin-top: 1px; }
.cw-topbar-center { font-weight: 700; font-size: 14px; }
.cw-topbar-right { display: flex; gap: 8px; align-items: center; }
.cw-timer-pill {
  padding: 5px 12px; border-radius: 999px;
  font-weight: 800; font-size: 12px;
  background: #e0edff; color: #1d4ed8;
}
.cw-close-btn {
  background: none; border: none; color: #fff;
  font-size: 20px; cursor: pointer; padding: 2px 6px; line-height: 1;
  border-radius: 6px; transition: background 0.15s;
}
.cw-close-btn:hover { background: rgba(255,255,255,0.15); }

.cw-question-wrap {
  width: 100%; padding: 20px 16px 8px;
  box-sizing: border-box;
}
.cw-question-text {
  font-weight: 600; font-size: 1.02rem;
  line-height: 1.65; color: #1f2937; white-space: pre-line;
}

.cw-options-wrap {
  width: 100%; padding: 8px 16px 16px;
  box-sizing: border-box;
}
.cw-option-box {
  display: flex; align-items: center; gap: 14px;
  background: #fff; border: 2px solid #e5e7eb; border-radius: 14px;
  padding: 14px 16px; margin-bottom: 12px;
  cursor: pointer; transition: all 0.15s; user-select: none;
}
.cw-option-box strong {
  width: 36px; height: 36px; border-radius: 50%;
  background: #f1f5f9; color: #475569;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 14px; flex-shrink: 0;
}
.cw-option-box.selected  { border-color: #0aa06e; }
.cw-option-box.selected strong { background: #0aa06e; color: #fff; }
.cw-option-box.correct   { border-color: #22c55e; background: #ffffff; position: relative; padding-right: 44px; }
.cw-option-box.correct strong { background: #dcfce7; color: #16a34a; }
.cw-option-box.incorrect { border-color: #ef4444; background: #ffffff; position: relative; padding-right: 44px; }
.cw-option-box.incorrect strong { background: #fee2e2; color: #dc2626; }

.cw-status-icon {
  position: absolute; top: 50%; right: 16px; transform: translateY(-50%);
  width: 26px; height: 26px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 700; color: #fff; flex-shrink: 0;
}
.cw-status-icon-correct { background: #22c55e; }
.cw-status-icon-wrong { background: #ef4444; }

.cw-marked-tag {
  position: absolute; top: -10px; right: 16px;
  background: #ffffff; padding: 0 6px;
  font-size: 11px; font-weight: 700; color: #ef4444; letter-spacing: 0.2px;
}

/* ── Solution box ── */
.cw-solution-box {
  margin: 20px 16px 140px 16px; padding: 18px;
  background: #fefce8; border: 1.5px solid #fde68a;
  border-radius: 14px; box-shadow: 0 1px 3px rgba(0,0,0,.04);
}
.cw-solution-header {
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid #fde68a;
}
.cw-solution-label { font-weight: 700; font-size: 15px; color: #1d4ed8; letter-spacing: 0.2px; text-align: center; }
.cw-solution-lang-block { margin-bottom: 14px; padding-left: 12px; border-left: 3px solid #fbbf24; }
.cw-solution-lang-block:last-child { margin-bottom: 0; }
.cw-solution-lang-hindi { border-left-color: #60a5fa; }
.cw-solution-lang-tag { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #b45309; margin-bottom: 4px; }
.cw-solution-lang-hindi .cw-solution-lang-tag { color: #1d4ed8; }
.cw-solution-text { font-size: 14.5px; line-height: 1.7; color: #1f2937; white-space: pre-line; }
.cw-solution-empty { font-size: 13.5px; color: #9ca3af; font-style: italic; }

/* ── Bottom bar ── */
.cw-bottom-bar {
  position: fixed; bottom: 0; left: 0; right: 0;
  background: #fff; border-top: 1px solid #e5e7eb;
  padding: 14px 16px 18px; z-index: 10000;
}
.cw-bottom-inner {
  max-width: 760px; margin: 0 auto;
  display: flex; gap: 12px;
}
.cw-bottom-inner button {
  flex: 1; height: 46px; border-radius: 12px;
  font-weight: 700; font-size: 14px; cursor: pointer;
}
.cw-btn-nav {
  background: #fff; border: 1.5px solid #d1d5db; color: #374151;
}
.cw-btn-nav:disabled { color: #9ca3af; cursor: not-allowed; }
.cw-btn-check {
  flex: 2 !important; background: #0aa06e; color: #fff; border: none;
}
.cw-btn-check:disabled { background: #e5e7eb; color: #9ca3af; cursor: not-allowed; }
.cw-btn-try {
  flex: 2 !important; background: #111827; color: #fff; border: none;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}

/* ── Loading ── */
.cw-loading {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 50px 20px; text-align: center;
}
.cw-spinner {
  width: 40px; height: 40px;
  border: 4px solid #e5e7eb; border-top-color: #0aa06e;
  border-radius: 50%; animation: spin 0.8s linear infinite;
  margin-bottom: 14px;
}
.cw-loading p { font-weight: 600; color: #374151; margin: 0; }

@media (max-width: 600px) {
  .cw-question-wrap { padding: 16px 12px 8px; }
  .cw-options-wrap  { padding: 8px 12px 16px; }
  .cw-topbar        { padding: 10px 12px; }
}
`;

/* ─────────────────────────────────────────────
   MCQ VIEWER
───────────────────────────────────────────── */
function ChapterViewer({ chapter, subject, onBack }) {
  const timerRef = useRef(null);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [, setAttempted] = useState({});
  const [showAnswer, setShowAnswer] = useState({});
  const [, setAttemptCount] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setAttempted({});
    setShowAnswer({});
    setAttemptCount({});
    setTimeLeft(0);

    async function load() {
      if (!chapter.questionIds?.length) { setLoading(false); return; }
      try {
        const ids = chapter.questionIds.join(",");
        const res = await authFetch(`/questions/by-ids?ids=${ids}&exam=ANM`);
        const data = await res.json();
        let questionsToUse = [];
        if (Array.isArray(data) && data.length > 0) {
          questionsToUse = data.sort((a, b) => b.year - a.year);
        } else {
          // Fallback questions for preview
          questionsToUse = chapter.questionIds.map((id, idx) => ({
            questionId: id,
            year: 2025 - (idx % 5),
            text: `[Sample PYQ for ${chapter.name}] Question ${idx + 1}: What is the primary role / concept associated with this topic?`,
            options: [
              "Option A - Primary concept definition",
              "Option B - Secondary mechanism",
              "Option C - Standard practice guideline",
              "Option D - Clinical measurement"
            ],
            correctIndex: 0,
            explanation: `Detailed solution and rationale for ${chapter.name} question ${idx + 1}.\n---\n${chapter.name} के प्रश्न ${idx + 1} का विस्तृत समाधान।`
          }));
        }
        setQuestions(questionsToUse);
        const sel = {}, att = {}, show = {}, cnt = {};
        questionsToUse.forEach((q, i) => {
          const key = `${q.questionId}-${i}`;
          sel[key] = undefined;
          att[key] = false;
          show[key] = false;
          cnt[key] = 0;
        });
        setSelectedAnswers(sel);
        setAttempted(att);
        setShowAnswer(show);
        setAttemptCount(cnt);
      } catch (err) {
        console.error("Failed to load chapter questions", err);
        const fallbackQs = chapter.questionIds.map((id, idx) => ({
          questionId: id,
          year: 2025 - (idx % 5),
          text: `[Sample PYQ for ${chapter.name}] Question ${idx + 1}: What is the primary role / concept associated with this topic?`,
          options: [
            "Option A - Primary concept definition",
            "Option B - Secondary mechanism",
            "Option C - Standard practice guideline",
            "Option D - Clinical measurement"
          ],
          correctIndex: 0,
          explanation: `Detailed solution and rationale for ${chapter.name} question ${idx + 1}.\n---\n${chapter.name} के प्रश्न ${idx + 1} का विस्तृत समाधान।`
        }));
        setQuestions(fallbackQs);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [chapter]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(0);
    timerRef.current = setInterval(() => setTimeLeft(t => t + 1), 1000);
  }, []);

  useEffect(() => {
    if (questions.length > 0) startTimer();
    return () => timerRef.current && clearInterval(timerRef.current);
  }, [questions, startTimer]);

  const handleBack = useCallback(() => {
    timerRef.current && clearInterval(timerRef.current);
    if (typeof window !== "undefined" && window.history.state?.page === "cw-viewer") {
      window.history.replaceState(null, "");
    }
    onBack();
  }, [onBack]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.pushState({ page: "cw-viewer" }, "");
    }
    const pop = (e) => { e.preventDefault(); handleBack(); };
    window.addEventListener("popstate", pop);
    return () => window.removeEventListener("popstate", pop);
  }, [handleBack]);

  function fmt(sec) {
    return `${Math.floor(sec / 60).toString().padStart(2, "0")}:${(sec % 60).toString().padStart(2, "0")}`;
  }

  function handleSelectOption(qid, idx) {
    if (showAnswer[qid]) return;
    setSelectedAnswers(p => ({ ...p, [qid]: idx }));
  }

  async function handleCheckAnswer() {
    const q = questions[currentIndex];
    if (!q) return;
    const qid = `${q.questionId}-${currentIndex}`;
    const chosen = selectedAnswers[qid];
    if (chosen === undefined) return;

    setAttempted(p => ({ ...p, [qid]: true }));

    setAttemptCount(prev => {
      const next = (prev[qid] || 0) + 1;
      if (chosen === q.correctIndex) {
        setShowAnswer(p => ({ ...p, [qid]: "FULL" }));
      } else if (next === 1) {
        setShowAnswer(p => ({ ...p, [qid]: "PARTIAL" }));
      } else {
        setShowAnswer(p => ({ ...p, [qid]: "FULL" }));
      }
      return { ...prev, [qid]: next };
    });

    timerRef.current && clearInterval(timerRef.current);

    try {
      await authFetch("/exam/attempt", {
        method: "POST",
        body: JSON.stringify({
          questionId: q.questionId,
          year: q.year,
          isCorrect: chosen === q.correctIndex,
          timeTaken: timeLeft,
          exam: "ANM",
          subject,
          chapter: chapter.name,
        }),
      });
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("progressUpdated"));
      }
    } catch (err) {
      console.error("Failed to save attempt", err);
    }
  }

  function handleTryAgain() {
    const q = questions[currentIndex];
    if (!q) return;
    const qid = `${q.questionId}-${currentIndex}`;
    setShowAnswer(p => ({ ...p, [qid]: false }));
    setSelectedAnswers(p => ({ ...p, [qid]: undefined }));
    startTimer();
  }

  function goNext() {
    if (currentIndex < questions.length - 1) { setCurrentIndex(i => i + 1); startTimer(); }
  }
  function goPrev() {
    if (currentIndex > 0) { setCurrentIndex(i => i - 1); startTimer(); }
  }

  if (loading) return (
    <div className="cw-viewer-wrap">
      <style dangerouslySetInnerHTML={{ __html: CW_STYLES }} />
      <div className="cw-loading"><div className="cw-spinner" /><p>Loading questions…</p></div>
    </div>
  );

  if (!questions.length) return (
    <div className="cw-viewer-wrap">
      <style dangerouslySetInnerHTML={{ __html: CW_STYLES }} />
      <div className="cw-loading" style={{ gap: 12 }}>
        <p style={{ color: "#6b7280" }}>No questions found for this chapter.</p>
        <button onClick={handleBack} style={{ padding: "8px 20px", borderRadius: 8, border: "1.5px solid #e5e7eb", background: "#fff", cursor: "pointer", fontWeight: 700 }}>← Back</button>
      </div>
    </div>
  );

  const q = questions[currentIndex];
  const qid = `${q.questionId}-${currentIndex}`;
  const showState = showAnswer[qid];
  const chosen = selectedAnswers[qid];
  const isShown = showState === "PARTIAL" || showState === "FULL";
  const showTryAgain = showState === "PARTIAL" && chosen !== q.correctIndex;

  const showSolution =
    (showState === "PARTIAL" && chosen === q.correctIndex) ||
    showState === "FULL";

  let solutionBlock = null;
  if (showSolution) {
    const explanation = q.explanation;
    if (!explanation || explanation.trim().length === 0) {
      solutionBlock = (
        <div className="cw-solution-box">
          <div className="cw-solution-header">
            <span className="cw-solution-label">Futurely Solution</span>
          </div>
          <div className="cw-solution-empty">
            Solution not added yet for this question.
          </div>
        </div>
      );
    } else {
      const [englishPart = "", hindiPart = ""] = explanation.split("\n---\n");
      solutionBlock = (
        <div className="cw-solution-box">
          <div className="cw-solution-header">
            <span className="cw-solution-label">Futurely Solution</span>
          </div>

          <div className="cw-solution-lang-block">
            <div className="cw-solution-lang-tag">English</div>
            <div className="cw-solution-text">
              <MathJax dynamic>{englishPart}</MathJax>
            </div>
          </div>

          {hindiPart && (
            <div className="cw-solution-lang-block cw-solution-lang-hindi">
              <div className="cw-solution-lang-tag">हिंदी</div>
              <div className="cw-solution-text">
                <MathJax dynamic>{hindiPart}</MathJax>
              </div>
            </div>
          )}
        </div>
      );
    }
  }

  return (
    <MathJaxContext>
      <style dangerouslySetInnerHTML={{ __html: CW_STYLES }} />
      <div className="cw-viewer-wrap">

        <div className="cw-topbar">
          <div className="cw-topbar-left">
            <strong>Chapter {String(CHAPTER_DATA[subject]?.findIndex(c => c.name === chapter.name) + 1 || 1).padStart(2, "0")}: {chapter.name}</strong>
            <span>{subject} · Jharkhand ANM PYQ Practice</span>
          </div>
          <div className="cw-topbar-center">Q {currentIndex + 1} / {questions.length}</div>
          <div className="cw-topbar-right">
            <div className="cw-timer-pill">⏱ {fmt(timeLeft)}</div>
            <button className="cw-close-btn" onClick={handleBack} aria-label="Close">✕</button>
          </div>
        </div>

        <div className="cw-question-wrap">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 700, color: "#1d4ed8", marginBottom: 10 }}>
            📅 {q.year} · ANM
          </div>
          <div className="cw-question-text"><MathJax dynamic>{q.text}</MathJax></div>
        </div>

        <div className="cw-options-wrap">
          {q.options.map((opt, idx) => {
            const optCorrect = idx === q.correctIndex;
            const optSelected = chosen === idx;

            let cls = "cw-option-box";
            if (!showState && optSelected) cls += " selected";
            if (showState === "PARTIAL" && optSelected && optCorrect) cls += " correct";
            if (showState === "PARTIAL" && optSelected && !optCorrect) cls += " incorrect";
            if (showState === "FULL" && optCorrect) cls += " correct";
            if (showState === "FULL" && optSelected && !optCorrect) cls += " incorrect";

            const isWrongMarked = cls.includes("incorrect");
            const isRightShown = cls.includes("correct");

            return (
              <div key={idx} className={cls}
                onClick={() => handleSelectOption(qid, idx)}
                role="button" tabIndex={0}
                onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleSelectOption(qid, idx); } }}
                aria-pressed={optSelected} aria-disabled={!!showState} style={{ opacity: 1, position: "relative" }}
              >
                {isWrongMarked && (
                  <span className="cw-marked-tag">You Marked</span>
                )}

                <strong>{String.fromCharCode(65 + idx)}</strong>
                <div style={{ fontSize: 14, lineHeight: 1.5 }}><MathJax dynamic>{opt}</MathJax></div>

                {isRightShown && (
                  <span className="cw-status-icon cw-status-icon-correct">✓</span>
                )}
                {isWrongMarked && (
                  <span className="cw-status-icon cw-status-icon-wrong">✕</span>
                )}
              </div>
            );
          })}
        </div>

        {solutionBlock}

        <div className="cw-bottom-bar">
          <div className="cw-bottom-inner">
            <button className="cw-btn-nav" onClick={goPrev} disabled={currentIndex === 0}>← Prev</button>

            {showTryAgain ? (
              <button className="cw-btn-try" onClick={handleTryAgain}>
                <span style={{ fontSize: 18 }}>↺</span> Try Again
              </button>
            ) : (
              <button className="cw-btn-check" onClick={handleCheckAnswer} disabled={isShown || chosen === undefined}>
                {isShown && chosen === q.correctIndex ? "✓ Correct!" : "Check Answer"}
              </button>
            )}

            <button className="cw-btn-nav" onClick={goNext} disabled={currentIndex === questions.length - 1}>Next →</button>
          </div>
        </div>

      </div>
    </MathJaxContext>
  );
}

/* ─────────────────────────────────────────────
   CHAPTER LIST — Locked / Unlocked
───────────────────────────────────────────── */
export default function ChapterwisePYQANM({ isUnlocked, onUnlocked, setFocusMode }) {
  const { user } = useAuth();
  const [activeSubject, setActiveSubject] = useState("General Science");
  const [activeChapter, setActiveChapter] = useState(null);

  useEffect(() => {
    setFocusMode && setFocusMode(!!activeChapter);
  }, [activeChapter, setFocusMode]);

  function openChapter(ch) {
    if (typeof window !== "undefined" && !localStorage.getItem("token")) {
      if (window.openLoginModal) {
        window.openLoginModal();
      } else {
        alert("Please log in to continue.");
      }
      return;
    }
    if (ch.free || isUnlocked) {
      if (!ch.questionIds?.length) {
        alert("Questions coming soon for this chapter!");
        return;
      }
      setActiveChapter(ch);
    }
  }

  if ((isUnlocked || activeChapter?.free) && activeChapter) {
    return (
      <ChapterViewer
        chapter={activeChapter}
        subject={activeSubject}
        onBack={() => setActiveChapter(null)}
      />
    );
  }

  return (
    <div className="cw-root">
      <style dangerouslySetInnerHTML={{ __html: CW_STYLES }} />

      {!isUnlocked && (
        <div className="cw-unlock-card">
          <div className="cw-unlock-icon">🔒</div>
          <h2 className="cw-unlock-title">Chapter-wise PYQs (2021–2025)</h2>
          <p className="cw-unlock-desc">
            Questions sorted by topic. Master each chapter individually.
          </p>

          <div className="cw-buymodal-wrap">
            <BuyModal testSeriesId="anm-chapterwise-pyq" onUnlocked={onUnlocked} />
          </div>

          <div className="cw-unlock-divider">
            <span /><em>or get best value</em><span />
          </div>

          <div className="cw-buymodal-wrap-bundle">
            <BuyModal testSeriesId="anm-bundle" onUnlocked={onUnlocked} />
          </div>
        </div>
      )}

      {isUnlocked && (
        <div className="cw-unlocked-badge">✅ Chapter-wise PYQs Unlocked!</div>
      )}

      <div className="cw-section-label">
        {isUnlocked ? "Select Subject" : "Preview — Chapter List"}
      </div>
      <div className="cw-subject-tabs">
        {SUBJECTS.map(s => (
          <button
            key={s}
            className={`cw-stab ${activeSubject === s ? "active" : ""}`}
            onClick={() => setActiveSubject(s)}
          >{s}</button>
        ))}
      </div>

      {isUnlocked ? (
        <div className="cw-chapter-grid">
          {CHAPTER_DATA[activeSubject]?.map((ch, i) => {
            const hasQs = ch.questionIds?.length > 0;
            const years = hasQs
              ? [...new Set(ch.questionIds.map(id => id.split("-")[0]))].sort((a, b) => b - a)
              : [];
            return (
              <div
                key={i}
                className={`cw-chapter-card${!hasQs ? " cw-chapter-card--locked" : ""}`}
                onClick={() => openChapter(ch)}
              >
                <div className="cw-ch-num-badge">{String(i + 1).padStart(2, "0")}</div>
                <div className="cw-ch-info">
                  <div className="cw-ch-name">{ch.name}</div>
                  {hasQs && (
                    <div className="cw-ch-meta">
                      {years.join(" · ")}
                    </div>
                  )}
                </div>
                <div className="cw-ch-right">
                  {hasQs
                    ? <span className="cw-ch-count">{ch.questionIds.length} Qs</span>
                    : <span className="cw-ch-soon">Soon</span>
                  }
                  {hasQs
                    ? <span className="cw-ch-arrow">›</span>
                    : <span className="cw-ch-lock">🔒</span>
                  }
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="cw-blur-wrap">
          <div className="cw-chapter-grid">
            {CHAPTER_DATA[activeSubject]?.map((ch, i) => {
              const isFree = !!ch.free;
              return (
                <div
                  key={i}
                  className={`cw-chapter-card${isFree ? "" : " cw-chapter-card--locked"}`}
                  onClick={() => isFree ? openChapter(ch) : undefined}
                  style={isFree ? { cursor: "pointer" } : {}}
                >
                  <div className="cw-ch-num-badge">{String(i + 1).padStart(2, "0")}</div>
                  <div className="cw-ch-info">
                    <div className="cw-ch-name">{ch.name}</div>
                    <div className="cw-ch-meta">2021 · 2022 · 2023 · 2024 · 2025</div>
                  </div>
                  <div className="cw-ch-right">
                    <span className="cw-ch-count">{ch.questionIds?.length || "—"} Qs</span>
                    {isFree
                      ? <span className="cw-ch-free-badge">FREE</span>
                      : <span className="cw-ch-lock">🔒</span>
                    }
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cw-blur-overlay">
            <BuyModal testSeriesId="anm-chapterwise-pyq" onUnlocked={onUnlocked} />
          </div>
        </div>
      )}
    </div>
  );
}
