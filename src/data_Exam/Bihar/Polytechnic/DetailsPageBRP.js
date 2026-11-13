"use client";

import React, { useState, useEffect } from "react";

import PhysicsQuestionsBRP from "./PhysicsQuestionsBRP";
import ChemistryQuestionsBRP from "./ChemistryQuestionsBRP";
import MathematicsQuestionsBRP from "./MathematicsQuestionsBRP";
import Analysis from "./Analysis";

/* ─────────────────────────────────────────────
   JSON-LD SCHEMAS
───────────────────────────────────────────── */
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "en-IN",
  name: "Bihar Polytechnic PYQ (2021–2025) | Futurely",
  description:
    "Solve Bihar Polytechnic Previous Year Questions (2021–2025) online with solutions for Physics, Chemistry, and Mathematics. Prepare for Bihar Polytechnic 2026 exam on Futurely.",
  url: "https://www.futurely.in/exam-preparation/bihar-polytechnic",
  publisher: {
    "@type": "Organization",
    name: "Futurely",
    url: "https://www.futurely.in",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.futurely.in" },
      { "@type": "ListItem", position: 2, name: "Exam Preparation", item: "https://www.futurely.in/exam-preparation" },
      { "@type": "ListItem", position: 3, name: "Bihar Polytechnic PYQ", item: "https://www.futurely.in/exam-preparation/bihar-polytechnic" },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "en-IN",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Bihar Polytechnic exam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bihar Polytechnic (DCECE) is an entrance exam conducted for admission into polytechnic diploma engineering programs in Bihar. It tests students on Physics, Chemistry, and Mathematics.",
      },
    },
    {
      "@type": "Question",
      name: "Which years of Bihar Polytechnic PYQs are available on Futurely?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Futurely provides Bihar Polytechnic Previous Year Questions from 2021 to 2025, covering Physics, Chemistry, and Mathematics subjects with solutions.",
      },
    },
    {
      "@type": "Question",
      name: "Are the Bihar Polytechnic PYQs free to solve on Futurely?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, all Bihar Polytechnic PYQs on Futurely are completely free. No login or payment is required to practice the questions.",
      },
    },
    {
      "@type": "Question",
      name: "How many questions are available for Bihar Polytechnic on Futurely?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Futurely has 350+ questions from 5 previous year papers (2021–2025) covering Physics, Chemistry, and Mathematics for Bihar Polytechnic exam preparation.",
      },
    },
  ],
};

export default function BiharPolytechnicDetailsPage() {
  const [activeTab, setActiveTab] = useState("Physics");
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.title = "Bihar Polytechnic PYQ (2021–2025) | Physics, Chemistry, Math | Futurely";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Solve Bihar Polytechnic Previous Year Questions (2021–2025) online for Physics, Chemistry & Mathematics with solutions. 350+ questions from 5 papers. Free practice for Polytechnic 2026 exam on Futurely.");
    } else {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      metaDesc.content = "Solve Bihar Polytechnic Previous Year Questions (2021–2025) online for Physics, Chemistry & Mathematics with solutions. 350+ questions from 5 papers. Free practice for Polytechnic 2026 exam on Futurely.";
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
            <h1>Bihar Polytechnic Previous Year Questions (PYQ)</h1>
            <p>(2021 – 2025) — For 2026 Exam</p>

            <div className="pyq-stats">
              <span><strong>2021–2025</strong>Years</span>
              <span><strong>5</strong>Papers</span>
              <span><strong>350+</strong>Questions</span>
            </div>

            <div className="pyq-tabs">
              <button className={activeTab === "Physics" ? "active" : ""} onClick={() => setActiveTab("Physics")}>Physics</button>
              <button className={activeTab === "Chemistry" ? "active" : ""} onClick={() => setActiveTab("Chemistry")}>Chemistry</button>
              <button className={activeTab === "Math" ? "active" : ""} onClick={() => setActiveTab("Math")}>Math</button>
              <button className={activeTab === "Analysis" ? "active" : ""} onClick={() => setActiveTab("Analysis")}>Analysis</button>
            </div>
          </div>
        )}

        {/* ================= CONTENT ================= */}
        <div className="pyq-card">
          {activeTab === "Physics" && (
            <PhysicsQuestionsBRP setFocusMode={setFocusMode} />
          )}
          {activeTab === "Chemistry" && (
            <ChemistryQuestionsBRP setFocusMode={setFocusMode} />
          )}
          {activeTab === "Math" && (
            <MathematicsQuestionsBRP setFocusMode={setFocusMode} />
          )}
          {activeTab === "Analysis" && (
            <Analysis />
          )}
        </div>

      </div>
  );
}
