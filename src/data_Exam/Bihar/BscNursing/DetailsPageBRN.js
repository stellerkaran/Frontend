"use client";

import React, { useState, useEffect } from "react";

/* Bihar B.Sc. Nursing entrance detail page.
   Mirrors ../BtechLateral/DetailsPageBRB.js — same layout/theme/tab structure.
   Question banks are NOT wired in yet; each tab shows a "coming soon"
   placeholder until the nursing question components land. */

const META_DESC =
  "Solve Bihar B.Sc. Nursing Entrance Previous Year Questions (2021–2025) online for Physics, Chemistry & Biology with solutions. Free practice for the 2027 exam on Futurely.";

export default function BiharBscNursingDetailsPage() {
  const [activeTab, setActiveTab] = useState("Physics");
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.title =
      "Bihar B.Sc. Nursing PYQ (2021–2025) | Physics, Chemistry, Biology | Futurely";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", META_DESC);
    } else {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      metaDesc.content = META_DESC;
      document.head.appendChild(metaDesc);
    }
  }, []);

  return (
    <div className={`pyq-app ${focusMode ? "focus-mode" : ""}`}>
        <style>{`
/* ================= ROOT ================= */
.pyq-app {
  font-family: Inter, system-ui;
  background: #f8f9fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* WIDTH CONTROL */
.pyq-header,
.pyq-card {
  width: 100%;
  max-width: 760px;
}

/* ================= HEADER — Bihar amber/gold theme ================= */
.pyq-header {
  background: linear-gradient(135deg, #f7971e, #ffd200);
  color: #1a0e00;
  padding: 20px 16px 24px;
  border-radius: 0 0 10px 10px;
  text-align: center;
}

.pyq-header h1 {
  margin: 0;
  font-size: clamp(18px, 5vw, 22px);
  font-weight: 800;
  color: #1a0e00;
}

.pyq-header p {
  margin: 6px 0 14px;
  font-size: clamp(13px, 3.5vw, 14px);
  color: #2d1a00;
  opacity: .85;
}

/* STATS */
.pyq-stats {
  display: flex;
  justify-content: center;
  gap: 26px;
  font-size: 13px;
  color: #1a0e00;
}

.pyq-stats span {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
}

.pyq-stats strong {
  font-size: 15px;
  color: #1a0e00;
}

/* TABS */
.pyq-tabs {
  margin-top: 14px;
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}

.pyq-tabs button {
  border: none;
  padding: 8px 16px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.12);
  color: #1a0e00;
  font-size: 13px;
  font-weight: 700;
  min-height: 36px;
  cursor: pointer;
}

.pyq-tabs button.active {
  background: #fff;
  color: #c47a00;
}

/* ================= CONTENT CARD ================= */
.pyq-card {
  background: #f8f9fa;
  margin: 0px 12px;
  padding: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, .06);
}

/* ================= COMING SOON PLACEHOLDER ================= */
.pyq-coming-soon {
  text-align: center;
  padding: 48px 16px;
  color: #6b7280;
}

.pyq-coming-soon-emoji {
  font-size: 40px;
  line-height: 1;
  margin-bottom: 12px;
}

.pyq-coming-soon h3 {
  margin: 0 0 8px;
  font-size: clamp(15px, 4vw, 18px);
  font-weight: 800;
  color: #1a0e00;
}

.pyq-coming-soon p {
  margin: 0 auto;
  max-width: 460px;
  font-size: 0.86rem;
  line-height: 1.6;
}

/* ================= FOCUS MODE ================= */
.focus-mode .pyq-header,
.focus-mode .pyq-seo {
  display: none;
}

.focus-mode .pyq-card {
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 100%;
  border-radius: 0;
  box-shadow: none;
}

/* ================= MOBILE ================= */
@media (max-width: 600px) {
  .pyq-header {
    width: 100vw;
    max-width: 100vw;
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    position: sticky;
    top: 56px;
    z-index: 50;
  }
}

        `}</style>

        {/* ================= HEADER ================= */}
        {!focusMode && (
          <div className="pyq-header">
            <h1>Bihar B.Sc. Nursing Previous Year Questions (PYQ)</h1>
            <p>(2021 – 2025) — For 2027 Exam</p>

            <div className="pyq-stats">
              <span><strong>2021–2025</strong>Years</span>
              <span><strong>5</strong>Papers</span>
              <span><strong>350+</strong>Questions</span>
            </div>

            <div className="pyq-tabs">
              <button className={activeTab === "Physics" ? "active" : ""} onClick={() => setActiveTab("Physics")}>Physics</button>
              <button className={activeTab === "Chemistry" ? "active" : ""} onClick={() => setActiveTab("Chemistry")}>Chemistry</button>
              <button className={activeTab === "Biology" ? "active" : ""} onClick={() => setActiveTab("Biology")}>Biology</button>
              <button className={activeTab === "Analysis" ? "active" : ""} onClick={() => setActiveTab("Analysis")}>Analysis</button>
            </div>
          </div>
        )}

        {/* ================= CONTENT ================= */}
        <div className="pyq-card">
          <div className="pyq-coming-soon">
            <div className="pyq-coming-soon-emoji" aria-hidden="true">🩺</div>
            {activeTab === "Analysis" ? (
              <>
                <h3>Analysis — Coming Soon</h3>
                <p>
                  The paper analysis section for the Bihar B.Sc. Nursing
                  entrance exam is being prepared and will be available here
                  soon.
                </p>
              </>
            ) : (
              <>
                <h3>{activeTab} PYQs — Coming Soon</h3>
                <p>
                  Solved {activeTab} previous year questions (2021–2025) for the
                  Bihar B.Sc. Nursing entrance exam are on the way — stay
                  tuned!
                </p>
              </>
            )}
          </div>
        </div>

      </div>
  );
}