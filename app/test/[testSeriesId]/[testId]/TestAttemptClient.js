"use client";

// TestAttemptClient.jsx
// Next.js port of TestAttemptPage.jsx — route: app/test/[testSeriesId]/[testId]/page.jsx
// Complete port: intro phase, attempt/confirm phase (question UI, palette, modals),
// result phase (summary + review tabs), loading and error states.

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useAuth } from "@/context/AuthContext";
import { authFetch } from "@/utils/api";

const TOTAL_SECONDS = 9000; // 2.5 hrs
const MARKS_CORRECT = 1;
const DEFAULT_MARKS_WRONG = -0.25;
const NAVBAR_HEIGHT = 0;

function formatTime(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
}

const SUBJ_STYLE = {
  Physics: { bg: "#eff6ff", bd: "#93c5fd", tx: "#1d4ed8", dot: "#3b82f6", accent: "#2563eb" },
  Chemistry: { bg: "#f0fdf4", bd: "#6ee7b7", tx: "#15803d", dot: "#22c55e", accent: "#16a34a" },
  Math: { bg: "#fdf4ff", bd: "#d8b4fe", tx: "#7e22ce", dot: "#a855f7", accent: "#9333ea" },
  Science: { bg: "#fff7ed", bd: "#fdba74", tx: "#c2410c", dot: "#f97316", accent: "#ea580c" },
  Biology: { bg: "#fff7ed", bd: "#fdba74", tx: "#c2410c", dot: "#f97316", accent: "#ea580c" },
  English: { bg: "#fdf2f8", bd: "#f9a8d4", tx: "#be185d", dot: "#ec4899", accent: "#db2777" },
  "General Science": { bg: "#ecfeff", bd: "#67e8f9", tx: "#0e7490", dot: "#06b6d4", accent: "#0891b2" },
  "General Knowledge": { bg: "#f0fdf4", bd: "#6ee7b7", tx: "#15803d", dot: "#22c55e", accent: "#16a34a" },
  Mathematics: { bg: "#fdf4ff", bd: "#d8b4fe", tx: "#7e22ce", dot: "#a855f7", accent: "#9333ea" },
};

const TEST_CONFIG = {
  "D2D-TS": {
    subjects: [
      { name: "Physics", count: 50 },
      { name: "Chemistry", count: 50 },
      { name: "Math", count: 50 },
    ],
  },
  "JHP-TS": {
    subjects: [
      { name: "Physics", count: 50 },
      { name: "Chemistry", count: 50 },
      { name: "Math", count: 50 },
    ],
  },
  "JHPLE-TS": {
    subjects: [
      { name: "Science", count: 50 },
      { name: "Math", count: 50 },
    ],
  },
  "GNM-TS": {
    subjects: [
      { name: "Physics", count: 30 },
      { name: "Chemistry", count: 30 },
      { name: "Biology", count: 30 },
      { name: "Maths", count: 30 },
      { name: "English", count: 30 },
    ],
    marksWrong: 0,
  },
  "ANM-TS": {
    subjects: [
      { name: "General Science", count: 50 },
      { name: "General Knowledge", count: 25 },
      { name: "Mathematics", count: 25 },
    ],
  },
};

const DEFAULT_SUBJECT_CONFIG = [
  { name: "Physics", count: 50 },
  { name: "Chemistry", count: 50 },
  { name: "Math", count: 50 },
];

const TEST_SERIES_ROUTES = {
  "D2D-TS": "/d2d-tests",
  "JHP-TS": "/jh-poly-tests",
  "JHPLE-TS": "/jh-poly-lateral-tests",
  "GNM-TS": "/gnm-tests",
  "ANM-TS": "/anm-tests",
};

const TEST_SERIES_NAMES = {
  "D2D-TS": "D2D 2026",
  "JHP-TS": "Polytechnic 2026",
  "JHPLE-TS": "Polytechnic Lateral Entry 2026",
  "GNM-TS": "GNM 2026",
  "ANM-TS": "ANM 2026",
};

// Full CSS (tap-*, intro-*, res-*, rev-* rules) ported from TestAttemptPage.jsx
const CSS = `
  .tap-root, .tap-root *, .tap-root *::before, .tap-root *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .tap-root {
    font-family: 'DM Sans', system-ui, sans-serif;
    background: #f4f6f9;
    min-height: 100vh;
    overflow-x: hidden;
    -webkit-tap-highlight-color: transparent;
  }

  /* ══════════════════════════════════
     INTRO — HERO BANNER
  ══════════════════════════════════ */
  .intro-hero-banner {
    background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%);
    border-radius: 16px;
    padding: 20px 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    gap: 12px;
  }
  .intro-hero-left { flex: 1; min-width: 0; }
  .intro-hero-label {
    font-size: 10px; font-weight: 800; letter-spacing: 0.12em;
    color: rgba(255,255,255,0.45); text-transform: uppercase; margin-bottom: 4px;
  }
  .intro-hero-title {
    font-size: 18px; font-weight: 800; color: #fff;
    line-height: 1.25; margin-bottom: 10px;
  }
  .intro-hero-meta { display: flex; flex-wrap: wrap; gap: 6px; }
  .intro-hero-pill {
    font-size: 11px; font-weight: 700; padding: 3px 9px;
    border-radius: 6px; border: 1px solid;
  }
  .intro-hero-right {
    display: flex; flex-direction: column; align-items: center;
    gap: 8px; flex-shrink: 0;
  }
  .intro-hero-stat { display: flex; flex-direction: column; align-items: center; gap: 2px; }
  .intro-hero-stat-num { font-size: 26px; font-weight: 900; color: #fff; line-height: 1; }
  .intro-hero-stat-lbl { font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.5); }
  .intro-hero-divider { width: 1px; height: 28px; background: rgba(255,255,255,0.15); }

  /* ── Quick strip ── */
  .intro-strip {
    display: grid; grid-template-columns: repeat(4, 1fr);
    background: #fff; border: 1px solid #e5e7eb;
    border-radius: 12px; overflow: hidden; margin-bottom: 12px;
  }
  .intro-strip-item {
    display: flex; flex-direction: column; align-items: center;
    padding: 12px 6px; gap: 2px; border-right: 1px solid #f0f0f0;
  }
  .intro-strip-item:last-child { border-right: none; }
  .intro-strip-icon { font-size: 16px; margin-bottom: 2px; }
  .intro-strip-val { font-size: 15px; font-weight: 800; color: #111827; }
  .intro-strip-lbl { font-size: 9.5px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.04em; }

  /* ══════════════════════════════════
     INTRO — CARDS
  ══════════════════════════════════ */
  .intro-card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 14px;
    overflow: hidden;
    margin-bottom: 12px;
  }
  .intro-card-head {
    font-size: 12px; font-weight: 800; letter-spacing: 0.06em;
    text-transform: uppercase; color: #374151;
    background: #fafafa; border-bottom: 1px solid #f0f0f0;
    padding: 10px 14px;
  }

  /* Subject distribution */
  .intro-subj-dist { padding: 8px 0 4px; }
  .intro-subj-dist-row {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 14px; border-bottom: 1px solid #f9fafb;
  }
  .intro-subj-dist-row:last-child { border-bottom: none; }
  .intro-subj-dist-left { display: flex; align-items: center; gap: 8px; min-width: 130px; }
  .intro-subj-dist-qs { font-size: 11.5px; color: #6b7280; font-weight: 500; }
  .intro-subj-dist-right { flex: 1; display: flex; align-items: center; gap: 9px; }
  .intro-subj-dist-bar-bg { flex: 1; height: 7px; background: #f1f5f9; border-radius: 4px; overflow: hidden; }
  .intro-subj-dist-bar-fill { height: 100%; border-radius: 4px; }
  .intro-subj-dist-marks { font-size: 11.5px; font-weight: 700; color: #374151; white-space: nowrap; min-width: 55px; text-align: right; }

  /* Last attempt card */
  .intro-last-loading {
    display: flex; align-items: center; justify-content: center; gap: 10px;
    padding: 24px 14px; color: #9ca3af; font-size: 13px; font-weight: 500;
  }
  .intro-spinner {
    width: 20px; height: 20px; border-radius: 50%;
    border: 2px solid #e5e7eb; border-top-color: #2563eb;
    animation: spin 0.8s linear infinite; flex-shrink: 0;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .intro-no-attempt {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 8px; padding: 24px 14px; text-align: center;
    font-size: 13.5px; color: #6b7280; font-weight: 500; line-height: 1.6;
  }
  .intro-no-icon { font-size: 28px; }

  /* Score hero */
  .intro-last-hero {
    display: flex; flex-direction: column; align-items: center;
    padding: 16px 14px 8px; gap: 6px;
  }
  .intro-last-score-block { display: flex; align-items: baseline; gap: 4px; }
  .intro-last-score-num { font-size: 44px; font-weight: 900; line-height: 1; }
  .intro-last-score-denom { font-size: 17px; color: #9ca3af; font-weight: 600; }
  .intro-grade-badge {
    font-size: 12px; font-weight: 700; padding: 3px 12px;
    border-radius: 999px; border: 1px solid;
  }
  .intro-last-acc { font-size: 12.5px; color: #6b7280; font-weight: 600; }

  /* Stat pills */
  .intro-last-pills {
    display: flex; flex-wrap: wrap; gap: 7px;
    padding: 6px 14px 10px; justify-content: center;
  }
  .intro-pill { font-size: 11.5px; font-weight: 700; padding: 4px 11px; border-radius: 999px; border: 1px solid; }
  .intro-pill-green { background: #f0fdf4; border-color: #bbf7d0; color: #15803d; }
  .intro-pill-red   { background: #fef2f2; border-color: #fecaca; color: #dc2626; }
  .intro-pill-gray  { background: #f8fafc; border-color: #e2e8f0; color: #64748b; }
  .intro-pill-blue  { background: #eff6ff; border-color: #bfdbfe; color: #1d4ed8; }

  /* Negative marking bar */
  .intro-negative-bar {
    display: flex; justify-content: space-between; align-items: center;
    margin: 0 14px 10px; background: #fef2f2; border: 1px solid #fecaca;
    border-radius: 8px; padding: 7px 11px;
  }
  .intro-negative-label { font-size: 11.5px; font-weight: 600; color: #374151; }
  .intro-negative-val   { font-size: 13px; font-weight: 800; }

  /* Subject breakdown in last attempt */
  .intro-last-subj-rows { padding: 0 14px 8px; display: flex; flex-direction: column; gap: 8px; }
  .intro-subj-row { display: flex; align-items: center; gap: 8px; }
  .intro-subj-bar-wrap { flex: 1; display: flex; align-items: center; gap: 7px; }
  .intro-subj-bar-bg { flex: 1; height: 7px; background: #f1f5f9; border-radius: 4px; overflow: hidden; }
  .intro-subj-bar-fill { height: 100%; border-radius: 4px; transition: width 0.6s ease; }
  .intro-subj-stat { font-size: 11px; font-weight: 700; color: #374151; white-space: nowrap; min-width: 34px; text-align: right; }
  .intro-subj-acc  { font-size: 11px; font-weight: 600; color: #6b7280; min-width: 34px; text-align: center; }
  .intro-subj-marks { font-size: 12px; font-weight: 700; min-width: 52px; text-align: right; }

  .intro-last-date {
    text-align: center; font-size: 11.5px; color: #9ca3af; font-weight: 500;
    padding: 4px 14px 14px;
  }

  /* Instructions */
  .intro-instr-list { padding: 10px 14px 14px 28px; display: flex; flex-direction: column; gap: 7px; }
  .intro-instr-list li { font-size: 13px; color: #374151; line-height: 1.55; }

  /* CTA */
  .intro-start-btn {
    display: block; width: 100%;
    height: 52px; border-radius: 14px; border: none;
    background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%);
    color: #fff; font-size: 16px; font-weight: 800;
    cursor: pointer; letter-spacing: 0.02em;
    transition: opacity 0.15s, transform 0.12s;
    box-shadow: 0 4px 20px rgba(15,23,42,0.25);
  }
  .intro-start-btn:hover  { opacity: 0.9; transform: translateY(-1px); }
  .intro-start-btn:active { transform: translateY(0); }

  /* ══════════════════════════════════
     TOPBAR
  ══════════════════════════════════ */
  .tap-topbar {
    display: flex; justify-content: space-between; align-items: center;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    color: #fff; padding: 0 14px; height: 56px;
    position: sticky; top: 0; z-index: 200; gap: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    box-shadow: 0 2px 12px rgba(0,0,0,0.25);
  }
  .tap-topbar-left  { display:flex; align-items:center; gap:9px; min-width:0; flex:1; }
  .tap-topbar-right { display:flex; align-items:center; gap:7px; flex-shrink:0; }

  .tap-exit-btn {
    width:32px; height:32px; border-radius:50%; flex-shrink:0;
    border:1px solid rgba(255,255,255,0.22); background:rgba(255,255,255,0.09);
    color:rgba(255,255,255,0.85); font-size:13px; cursor:pointer;
    display:flex; align-items:center; justify-content:center; transition:background 0.15s;
  }
  .tap-exit-btn:hover { background:rgba(255,255,255,0.18); }

  .tap-topbar-titles { min-width:0; }
  .tap-topbar-name {
    font-size:14px; font-weight:700; color:#f1f5f9;
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis; letter-spacing:0.01em;
  }
  .tap-topbar-sub {
    font-size:11px; color:rgba(255,255,255,0.55); margin-top:2px;
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
    display:flex; align-items:center; gap:5px;
  }
  .tap-topbar-dot { color:rgba(255,255,255,0.25); }

  .tap-timer {
    background:rgba(219,234,254,0.15); border:1px solid rgba(147,197,253,0.3); color:#bfdbfe;
    padding:5px 11px; border-radius:999px; font-size:13px; font-weight:800;
    letter-spacing:0.04em; white-space:nowrap; flex-shrink:0; transition:all 0.3s;
    font-variant-numeric:tabular-nums;
  }
  .tap-timer-warn   { background:rgba(254,243,199,0.15); border-color:rgba(252,211,77,0.4); color:#fde68a; }
  .tap-timer-danger { background:rgba(254,226,226,0.15); border-color:rgba(252,165,165,0.4); color:#fca5a5; animation:tap-blink 1s ease-in-out infinite; }
  @keyframes tap-blink { 0%,100%{opacity:1} 50%{opacity:0.45} }

  .tap-palette-btn {
    background:rgba(255,255,255,0.09); border:1px solid rgba(255,255,255,0.18);
    color:rgba(255,255,255,0.85); width:36px; height:36px; border-radius:9px;
    cursor:pointer; flex-shrink:0; display:flex; align-items:center; justify-content:center;
    transition:background 0.15s;
  }
  .tap-palette-btn:hover { background:rgba(255,255,255,0.2); }

  .tap-progress-bar  { height:3px; background:#e2e8f0; }
  .tap-progress-fill { height:100%; background:linear-gradient(90deg,#3b82f6,#6366f1); transition:width 0.5s ease; }

  .tap-subj-tabs {
    display:flex; justify-content:center; background:#fff;
    border-bottom:1px solid #e2e8f0; overflow-x:auto;
    -webkit-overflow-scrolling:touch; scrollbar-width:none;
  }
  .tap-subj-tabs::-webkit-scrollbar { display:none; }
  .tap-subj-tab {
    display:flex; align-items:center; gap:5px; padding:0 18px; height:44px;
    font-size:13.5px; font-weight:600; color:#6b7280;
    background:none; border:none; border-bottom:2.5px solid transparent;
    cursor:pointer; white-space:nowrap; transition:color 0.15s, border-color 0.15s;
    margin-bottom:-1px; flex-shrink:0;
  }
  .tap-subj-tab:hover:not(.tap-subj-tab-active) { color:#374151; background:#fafafa; }
  .tap-subj-tab-active { font-weight:700; }
  .tap-tab-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }
  .tap-subj-tab-count {
    font-size:10.5px; font-weight:700; padding:2px 7px; border-radius:5px;
    background:#f1f5f9; color:#64748b; border:1px solid #e2e8f0; line-height:1.5;
  }

  .tap-palette-overlay {
    position:fixed; inset:0; background:rgba(0,0,0,0.45);
    z-index:500; display:flex; justify-content:flex-end; margin-top:70px;
  }
  .tap-palette {
    background:#fff; width:min(300px,90vw); height:100%;
    display:flex; flex-direction:column; overflow:hidden;
  }
  .tap-palette-head {
    display:flex; justify-content:space-between; align-items:center;
    font-size:14px; font-weight:800; color:#111827;
    padding:14px 14px 11px; border-bottom:1px solid #f0f0f0;
    flex-shrink:0; background:#fafafa;
  }
  .tap-palette-head button {
    background:none; border:none; font-size:16px; cursor:pointer;
    color:#9ca3af; padding:3px; line-height:1;
    width:28px; height:28px; border-radius:50%;
    display:flex; align-items:center; justify-content:center; transition:background 0.15s;
  }
  .tap-palette-head button:hover { background:#f3f4f6; color:#374151; }
  .tap-palette-legend {
    display:flex; justify-content:center; gap:7px; flex-wrap:wrap;
    padding:8px 14px; border-bottom:1px solid #f0f0f0; flex-shrink:0;
  }
  .tap-leg { font-size:10.5px; font-weight:600; padding:2px 8px; border-radius:4px; border:1px solid; }
  .tap-leg-answered { background:#f0fdf4; border-color:#bbf7d0; color:#15803d; }
  .tap-leg-flagged  { background:#fffbeb; border-color:#fde68a; color:#92400e; }
  .tap-leg-not      { background:#f1f5f9; border-color:#e2e8f0; color:#475569; }
  .tap-palette-scroll { flex:1; overflow-y:auto; padding:10px 12px 6px; -webkit-overflow-scrolling:touch; }
  .tap-pal-subj-block { margin-bottom:16px; }
  .tap-pal-subj-header {
    display:flex; justify-content:space-between; align-items:center;
    margin-bottom:8px; padding-left:8px; border-left:3px solid #2563eb;
  }
  .tap-pal-subj-done { font-size:10px; font-weight:700; padding:2px 7px; border-radius:4px; border:1px solid; }
  .tap-palette-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:4px; }
  .tap-pq-btn {
    height:29px; border-radius:5px; font-size:10.5px; font-weight:700;
    cursor:pointer; border:1.5px solid transparent; transition:transform 0.1s; line-height:1;
  }
  .tap-pq-btn:hover { transform:scale(1.1); }
  .tap-pq-not-visited      { background:#f1f5f9; color:#475569; border-color:#e2e8f0; }
  .tap-pq-active           { background:#eff6ff; color:#2563eb; border-color:#93c5fd; box-shadow:0 0 0 2px #bfdbfe; }
  .tap-pq-answered         { background:#f0fdf4; color:#15803d; border-color:#6ee7b7; }
  .tap-pq-flagged          { background:#fffbeb; color:#92400e; border-color:#fde68a; }
  .tap-pq-answered-flagged { background:#fef9c3; color:#854d0e; border-color:#fde68a; }
  .tap-palette-summary { flex-shrink:0; border-top:1px solid #f0f0f0; padding:8px 14px 5px; }
  .tap-ps-row {
    display:flex; justify-content:space-between; align-items:center;
    font-size:12px; color:#374151; padding:4px 0; border-bottom:1px solid #f9fafb;
  }
  .tap-ps-row b { font-size:13.5px; }
  .tap-submit-palette {
    flex-shrink:0; width:100%; background:#0f172a; color:#fff;
    border:none; padding:14px; font-size:14px; font-weight:700;
    cursor:pointer; transition:background 0.15s; letter-spacing:0.01em;
  }
  .tap-submit-palette:hover { background:#1e293b; }

  .tap-body { max-width:700px; margin:0 auto; padding:18px 16px 130px; }
  .tap-q-meta-row { display:flex; align-items:center; gap:7px; flex-wrap:wrap; margin-bottom:14px; }
  .tap-subj-pill { font-size:11px; font-weight:700; padding:3px 10px; border-radius:6px; border:1px solid; }
  .tap-qnum-badge { font-size:11px; font-weight:600; color:#64748b; background:#f1f5f9; border:1px solid #e2e8f0; padding:3px 9px; border-radius:6px; }
  .tap-marking-badge { font-size:11px; font-weight:700; color:#15803d; background:#f0fdf4; border:1px solid #bbf7d0; padding:3px 9px; border-radius:6px; }
  .tap-flagged-badge { font-size:11px; font-weight:700; color:#92400e; background:#fffbeb; border:1px solid #fde68a; padding:3px 9px; border-radius:6px; }
  .tap-qtext {
    font-size:16px; font-weight:600; color:#0f172a; line-height:1.75;
    margin-bottom:20px; background:#fff; border-radius:12px;
    padding:16px 16px; border:1px solid #e5e7eb; white-space:pre-line;
  }
  .tap-options { display:flex; flex-direction:column; gap:10px; }
  .tap-option {
    display:flex; align-items:center; gap:12px; background:#fff;
    border:1.5px solid #e2e8f0; border-radius:12px; padding:13px 14px;
    cursor:pointer; user-select:none; width:100%;
    transition:border-color 0.15s, background 0.15s, box-shadow 0.15s; min-height:52px;
  }
  .tap-option:hover:not(.tap-option-selected) { border-color:#bfdbfe; background:#f8fbff; }
  .tap-option-selected { background:#eff6ff; }
  .tap-opt-letter {
    width:36px; height:36px; border-radius:50%; flex-shrink:0;
    background:#f1f5f9; color:#475569;
    display:flex; align-items:center; justify-content:center;
    font-size:14px; font-weight:700; transition:background 0.15s, color 0.15s;
  }
  .tap-opt-letter-sel { color:#fff; }
  .tap-opt-text { font-size:15px; color:#1f2937; line-height:1.55; flex:1; font-weight:500; }
  .tap-flag-btn {
    margin-top:16px; background:none; border:1.5px solid #e2e8f0; border-radius:9px;
    padding:8px 14px; font-size:13px; font-weight:600; color:#6b7280;
    cursor:pointer; transition:all 0.15s; display:inline-flex; align-items:center; gap:5px;
  }
  .tap-flag-btn:hover { border-color:#fbbf24; color:#92400e; background:#fffbeb; }
  .tap-flag-active    { border-color:#fbbf24; color:#92400e; background:#fffbeb; }
  .tap-bottombar {
    position:fixed; bottom:0; left:0; right:0; background:#fff;
    border-top:1px solid #e2e8f0; padding:10px 16px 14px;
    z-index:200; box-shadow:0 -4px 20px rgba(0,0,0,0.08);
  }
  .tap-bottombar-inner { max-width:700px; margin:0 auto; display:flex; justify-content:space-between; align-items:center; gap:10px; }
  .tap-nav-btn {
    min-width:88px; height:44px; border-radius:11px; border:1.5px solid #d1d5db;
    background:#fff; color:#111827; font-size:14px; font-weight:600;
    cursor:pointer; transition:background 0.15s, border-color 0.15s; flex-shrink:0;
  }
  .tap-nav-btn:hover:not(:disabled) { background:#f8fafc; border-color:#9ca3af; }
  .tap-nav-btn:disabled { opacity:0.35; cursor:not-allowed; }
  .tap-submit-btn {
    flex:1; max-width:180px; height:44px; border-radius:11px;
    border:none; background:#0f172a; color:#fff; font-size:14px; font-weight:700;
    cursor:pointer; transition:background 0.15s, transform 0.12s;
  }
  .tap-submit-btn:hover  { background:#1e293b; transform:translateY(-1px); }
  .tap-submit-btn:active { transform:translateY(0); }

  .tap-modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:1000; display:flex; align-items:center; justify-content:center; padding:16px; }
  .tap-modal { background:#fff; border-radius:18px; padding:24px 20px; max-width:360px; width:100%; box-shadow:0 24px 64px rgba(0,0,0,0.22); }
  .tap-modal-title { font-size:18px; font-weight:800; color:#111827; margin-bottom:16px; text-align:center; }
  .tap-modal-stats { display:flex; gap:10px; margin-bottom:14px; }
  .tap-mstat { flex:1; border-radius:11px; padding:12px 8px; text-align:center; display:flex; flex-direction:column; gap:3px; }
  .tap-mstat b    { font-size:24px; font-weight:800; }
  .tap-mstat span { font-size:11.5px; font-weight:600; }
  .tap-mstat-green { background:#f0fdf4; color:#16a34a; border:1px solid #bbf7d0; }
  .tap-mstat-gray  { background:#f8fafc; color:#64748b; border:1px solid #e2e8f0; }
  .tap-modal-subj-counts { display:flex; gap:9px; margin-bottom:12px; flex-wrap:wrap; }
  .tap-modal-subj-row { display:flex; align-items:center; gap:5px; }
  .tap-subj-pill-xs { font-size:10.5px; font-weight:700; padding:2px 8px; border-radius:5px; border:1px solid; }
  .tap-modal-subj-count { font-size:12px; color:#374151; font-weight:600; }
  .tap-modal-warn { font-size:13px; color:#92400e; background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:10px 12px; margin-bottom:11px; line-height:1.5; }
  .tap-modal-time-left { font-size:13px; color:#374151; margin-bottom:18px; text-align:center; }
  .tap-modal-actions { display:flex; gap:10px; }
  .tap-modal-cancel { flex:1; height:44px; border-radius:11px; border:1.5px solid #d1d5db; background:#fff; color:#111827; font-size:14px; font-weight:600; cursor:pointer; transition:background 0.15s; }
  .tap-modal-cancel:hover { background:#f9fafb; }
  .tap-modal-confirm { flex:1; height:44px; border-radius:11px; border:none; background:#2563eb; color:#fff; font-size:14px; font-weight:700; cursor:pointer; transition:background 0.15s; }
  .tap-modal-confirm:hover { background:#1d4ed8; }

  /* ══════════════════════════════════
     RESULT
  ══════════════════════════════════ */
  .res-topbar { background:linear-gradient(135deg,#0f172a,#1e3a5f) !important; }
  .res-tabs { display:flex; background:#fff; border-bottom:2px solid #e2e8f0; position:sticky; top:56px; z-index:100; }
  .res-tab {
    flex:1; padding:12px 8px; font-size:13.5px; font-weight:600; color:#6b7280;
    background:none; border:none; border-bottom:2.5px solid transparent;
    cursor:pointer; transition:all 0.15s; margin-bottom:-2px;
    display:flex; align-items:center; justify-content:center; gap:6px;
  }
  .res-tab-active { color:#2563eb; border-bottom-color:#2563eb; font-weight:700; }
  .res-tab-count {
    font-size:10px; font-weight:700; padding:2px 7px; border-radius:999px;
    background:#fef2f2; color:#dc2626; border:1px solid #fecaca;
  }
  .res-body { max-width:680px; margin:0 auto; padding:16px 14px 80px; }
  .res-hero {
    background:linear-gradient(135deg,#0f172a,#1e3a5f);
    border-radius:16px; padding:20px 16px; text-align:center; margin-bottom:12px;
  }
  .res-hero-icon { font-size:36px; margin-bottom:6px; }
  .res-hero-score { display:flex; align-items:baseline; justify-content:center; gap:4px; margin-bottom:4px; }
  .res-score-main { font-size:42px; font-weight:900; color:#fff; line-height:1; }
  .res-score-denom { font-size:18px; color:rgba(255,255,255,0.6); font-weight:600; }
  .res-hero-acc { font-size:13.5px; color:rgba(255,255,255,0.75); font-weight:600; }
  .res-hero-acc strong { color:#fbbf24; }
  .res-cards { display:grid; grid-template-columns:repeat(4,1fr); gap:9px; margin-bottom:12px; }
  .res-card { border-radius:11px; padding:13px 6px; text-align:center; display:flex; flex-direction:column; align-items:center; gap:4px; border:1px solid; }
  .rcard-val { font-size:20px; font-weight:800; }
  .rcard-lbl { font-size:10.5px; font-weight:600; }
  .rcard-blue  { background:#eff6ff; border-color:#bfdbfe; color:#1d4ed8; }
  .rcard-green { background:#f0fdf4; border-color:#bbf7d0; color:#16a34a; }
  .rcard-red   { background:#fef2f2; border-color:#fecaca; color:#dc2626; }
  .rcard-gray  { background:#f8fafc; border-color:#e2e8f0; color:#64748b; }

  /* Analysis strip */
  .res-analysis-strip {
    display:grid; grid-template-columns:repeat(4,1fr);
    background:#fff; border:1px solid #e5e7eb; border-radius:12px;
    overflow:hidden; margin-bottom:12px;
  }
  .res-analysis-item { display:flex; flex-direction:column; align-items:center; gap:3px; padding:12px 6px; }
  .res-analysis-num { font-size:16px; font-weight:800; line-height:1; }
  .res-analysis-lbl { font-size:10px; font-weight:600; color:#9ca3af; text-align:center; }
  .res-analysis-divider { width:1px; background:#f0f0f0; align-self:stretch; margin:8px 0; }

  /* Score bar */
  .res-score-bar-card {
    background:#fff; border:1px solid #e5e7eb; border-radius:12px;
    padding:14px 14px; margin-bottom:12px;
  }
  .res-score-bar-head { font-size:12px; font-weight:700; color:#374151; margin-bottom:10px; text-transform:uppercase; letter-spacing:0.05em; }
  .res-score-bar-track {
    height:12px; border-radius:6px; overflow:hidden; background:#f1f5f9;
    display:flex;
  }
  .res-score-bar-correct { background:#22c55e; transition:width 0.8s ease; }
  .res-score-bar-wrong   { background:#ef4444; transition:width 0.8s ease; }
  .res-score-bar-skip    { background:#e2e8f0; transition:width 0.8s ease; }
  .res-score-bar-legend  { display:flex; gap:14px; margin-top:8px; flex-wrap:wrap; }
  .res-sbl { font-size:11px; font-weight:600; }
  .res-sbl-correct { color:#15803d; }
  .res-sbl-wrong   { color:#dc2626; }
  .res-sbl-skip    { color:#9ca3af; }

  .res-section-card { background:#fff; border-radius:12px; border:1px solid #e5e7eb; overflow:hidden; margin-bottom:10px; }
  .res-section-head { font-size:12px; font-weight:700; color:#111827; padding:11px 14px; border-bottom:1px solid #f3f4f6; background:#fafafa; letter-spacing:0.01em; text-transform:uppercase; }
  .res-subj-block { padding:12px 14px; border-bottom:1px solid #f5f5f5; }
  .res-subj-block:last-child { border-bottom:none; }
  .res-subj-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
  .res-subj-marks { font-size:13px; font-weight:700; }
  .res-subj-bar-bg { height:6px; background:#f1f5f9; border-radius:3px; margin-bottom:7px; overflow:hidden; }
  .res-subj-bar-fill { height:100%; border-radius:3px; transition:width 0.6s ease; }
  .res-subj-stats { display:flex; gap:10px; flex-wrap:wrap; font-size:12px; font-weight:600; }
  .rstat-ok    { color:#16a34a; }
  .rstat-wrong { color:#dc2626; }
  .rstat-skip  { color:#9ca3af; }
  .rstat-acc   { color:#6b7280; margin-left:auto; }
  .rstat-neg   { font-size:11px; }
  .res-marking-note { display:flex; align-items:center; gap:8px; flex-wrap:wrap; font-size:12px; color:#374151; font-weight:600; background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:9px 13px; margin-bottom:10px; }

  /* Tip card */
  .res-tip-card {
    display:flex; align-items:flex-start; gap:9px;
    background:#eff6ff; border:1px solid #bfdbfe; border-radius:10px;
    padding:11px 13px; font-size:13px; color:#1e40af; line-height:1.55; font-weight:500;
    margin-bottom:8px;
  }
  .res-tip-icon { font-size:16px; flex-shrink:0; margin-top:1px; }

  /* ══════════════════════════════════
     REVIEW TAB
  ══════════════════════════════════ */
  .rev-filter-bar {
    display:flex; gap:8px; align-items:center; flex-wrap:wrap;
    background:#fff; border:1px solid #e5e7eb; border-radius:12px;
    padding:10px 12px; margin-bottom:10px;
  }
  .rev-filter-group { display:flex; gap:6px; flex-wrap:wrap; flex:1; }
  .rev-filter-btn {
    padding:5px 11px; border-radius:7px; font-size:12px; font-weight:700;
    border:1.5px solid #e2e8f0; background:#f8fafc; color:#374151;
    cursor:pointer; transition:all 0.15s; white-space:nowrap;
  }
  .rev-filter-btn:hover { border-color:#9ca3af; }
  .rev-filter-active { background:#0f172a !important; color:#fff !important; border-color:#0f172a !important; }
  .rev-filter-correct { }
  .rev-filter-wrong   { }
  .rev-filter-skip    { }
  .rev-subj-select {
    padding:5px 10px; border-radius:7px; font-size:12px; font-weight:600;
    border:1.5px solid #e2e8f0; background:#f8fafc; color:#374151;
    cursor:pointer; outline:none;
  }
  .rev-summary-strip {
    display:flex; justify-content:space-between; align-items:center;
    font-size:12.5px; color:#6b7280; font-weight:600;
    padding:6px 2px; margin-bottom:8px;
  }

  /* Question blocks */
  .rev-q-block {
    border-bottom:1px solid #f3f4f6; transition:background 0.1s;
  }
  .rev-q-block:last-child { border-bottom:none; }
  .rev-q-ok   { border-left:3px solid #22c55e; }
  .rev-q-wrong { border-left:3px solid #ef4444; }
  .rev-q-skip  { border-left:3px solid #d1d5db; }

  .rev-q-header {
    display:flex; align-items:center; justify-content:space-between;
    padding:11px 14px; cursor:pointer; user-select:none;
  }
  .rev-q-header:hover { background:#fafafa; }
  .rev-q-header-left  { display:flex; align-items:center; gap:8px; flex:1; min-width:0; }
  .rev-q-header-right { display:flex; align-items:center; gap:8px; flex-shrink:0; }

  .rev-q-status-dot {
    width:8px; height:8px; border-radius:50%; flex-shrink:0;
  }
  .dot-ok    { background:#22c55e; }
  .dot-wrong { background:#ef4444; }
  .dot-skip  { background:#d1d5db; }

  .rev-q-num { font-size:12.5px; font-weight:800; color:#374151; min-width:28px; }
  .rev-q-status-label { font-size:12px; font-weight:700; white-space:nowrap; }
  .rsl-ok    { color:#15803d; }
  .rsl-wrong { color:#dc2626; }
  .rsl-skip  { color:#9ca3af; }

  .rev-q-mark { font-size:13px; font-weight:800; }
  .rev-q-expand { font-size:10px; color:#9ca3af; }

  /* Preview (collapsed) */
  .rev-q-preview {
    padding:0 14px 11px;
    font-size:13px; color:#6b7280; line-height:1.5;
    display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
  }

  /* Expanded */
  .rev-q-expanded { padding:0 14px 14px; }
  .rev-q-text {
    font-size:14.5px; font-weight:600; color:#0f172a; line-height:1.7;
    background:#f8fafc; border-radius:10px; padding:13px 14px; margin-bottom:12px;
    border:1px solid #e5e7eb; white-space:pre-line;
  }
  .rev-options-list { display:flex; flex-direction:column; gap:7px; margin-bottom:11px; }
  .rev-opt {
    display:flex; align-items:center; gap:10px;
    border:1.5px solid #e2e8f0; border-radius:10px;
    padding:10px 12px; background:#fff; min-height:44px;
  }
  .rev-opt-correct { border-color:#86efac; background:#f0fdf4; }
  .rev-opt-wrong   { border-color:#fca5a5; background:#fef2f2; }
  .rev-opt-letter {
    width:30px; height:30px; border-radius:50%; flex-shrink:0;
    background:#f1f5f9; color:#475569;
    display:flex; align-items:center; justify-content:center;
    font-size:13px; font-weight:700;
  }
  .rev-ol-correct { background:#22c55e; color:#fff; }
  .rev-ol-wrong   { background:#ef4444; color:#fff; }
  .rev-opt-text { font-size:13.5px; color:#1f2937; line-height:1.5; flex:1; font-weight:500; }
  .rev-opt-tag { flex-shrink:0; }
  .rev-tag-correct { font-size:10.5px; font-weight:700; color:#15803d; background:#dcfce7; padding:2px 8px; border-radius:4px; white-space:nowrap; }
  .rev-tag-wrong   { font-size:10.5px; font-weight:700; color:#dc2626; background:#fee2e2; padding:2px 8px; border-radius:4px; white-space:nowrap; }

  .rev-answer-summary {
    font-size:12.5px; line-height:1.55; font-weight:500;
    background:#f8fafc; border-radius:8px; padding:9px 12px;
    border:1px solid #e5e7eb;
  }

  .res-sticky-footer { position:fixed; bottom:0; left:0; right:0; background:#fff; border-top:1px solid #e2e8f0; padding:10px 16px 14px; z-index:200; box-shadow:0 -4px 20px rgba(0,0,0,0.08); }
  .res-back-btn { display:block; width:100%; max-width:680px; margin:0 auto; height:46px; border-radius:12px; border:none; background:#0f172a; color:#fff; font-size:15px; font-weight:700; cursor:pointer; transition:background 0.15s; }
  .res-back-btn:hover { background:#1e293b; }

  @media (min-width:600px) {
    .tap-subj-tab { padding:0 26px; font-size:14.5px; height:46px; }
    .tap-qtext    { font-size:17px; padding:18px 20px; }
    .tap-opt-text { font-size:15.5px; }
    .tap-opt-letter { width:38px; height:38px; font-size:15px; }
    .tap-option { padding:14px 16px; min-height:56px; }
    .tap-body   { padding:22px 20px 130px; }
    .res-score-main { font-size:50px; }
    .intro-last-score-num { font-size:52px; }
    .intro-hero-title { font-size:20px; }
  }
  @media (max-width:520px) {
    .res-cards { grid-template-columns:repeat(2,1fr); gap:7px; }
    .res-analysis-strip { grid-template-columns:repeat(2,1fr); }
    .res-analysis-divider:nth-child(4) { display:none; }
    .rcard-val { font-size:18px; }
    .intro-hero-banner { flex-direction:column; align-items:flex-start; }
    .intro-hero-right { flex-direction:row; }
    .intro-hero-divider { width:28px; height:1px; }
  }
  @media (max-width:400px) {
    .tap-topbar      { height:52px; padding:0 11px; }
    .tap-topbar-name { font-size:13px; }
    .tap-topbar-sub  { font-size:10px; }
    .tap-timer       { font-size:12px; padding:4px 9px; }
    .tap-exit-btn    { width:29px; height:29px; font-size:12px; }
    .tap-palette-btn { width:32px; height:32px; }
    .tap-subj-tab    { padding:0 13px; height:40px; font-size:12.5px; }
    .tap-qtext       { font-size:15px; padding:13px; }
    .tap-opt-text    { font-size:14px; }
    .tap-opt-letter  { width:32px; height:32px; font-size:13px; }
    .tap-option      { padding:10px 11px; gap:10px; min-height:48px; }
    .tap-nav-btn     { min-width:76px; height:42px; font-size:13px; }
    .tap-submit-btn  { height:42px; font-size:13px; }
    .tap-bottombar   { padding:8px 13px 12px; }
    .res-tabs        { top:52px; }
    .res-tab         { font-size:12.5px; padding:11px 6px; }
    .res-score-main  { font-size:36px; }
    .intro-last-score-num { font-size:38px; }
    .intro-start-btn { height:48px; font-size:15px; }
    .intro-strip     { grid-template-columns:repeat(2,1fr); }
  }
  @media (max-width:365px) {
    .tap-topbar      { padding:0 10px; gap:7px; }
    .tap-topbar-name { font-size:12px; }
    .tap-topbar-sub  { display:none; }
    .tap-timer       { font-size:11.5px; padding:3px 8px; }
    .tap-exit-btn    { width:27px; height:27px; font-size:11px; }
    .tap-palette-btn { width:29px; height:29px; }
    .tap-subj-tab    { padding:0 9px; height:37px; font-size:12px; gap:4px; }
    .tap-subj-tab-count { font-size:9.5px; padding:1px 5px; }
    .tap-tab-dot     { width:6px; height:6px; }
    .tap-body        { padding:12px 10px 120px; }
    .tap-qtext       { font-size:14px; line-height:1.65; padding:12px; margin-bottom:14px; }
    .tap-q-meta-row  { gap:5px; margin-bottom:10px; }
    .tap-subj-pill, .tap-qnum-badge, .tap-marking-badge, .tap-flagged-badge { font-size:10px; padding:2px 7px; }
    .tap-options     { gap:7px; }
    .tap-option      { padding:9px 10px; gap:8px; border-radius:10px; min-height:44px; }
    .tap-opt-letter  { width:28px; height:28px; font-size:12px; }
    .tap-opt-text    { font-size:13px; line-height:1.45; }
    .tap-flag-btn    { font-size:12px; padding:7px 11px; margin-top:12px; }
    .tap-nav-btn     { min-width:66px; height:39px; font-size:12.5px; border-radius:9px; }
    .tap-submit-btn  { height:39px; font-size:12.5px; border-radius:9px; }
    .tap-bottombar   { padding:7px 10px 11px; }
    .tap-palette     { width:100vw; }
    .tap-palette-grid { grid-template-columns:repeat(8,1fr); gap:3px; }
    .tap-pq-btn      { height:26px; font-size:10px; border-radius:4px; }
    .res-cards       { grid-template-columns:repeat(2,1fr); gap:6px; }
    .res-card        { padding:10px 6px; }
    .rcard-val       { font-size:17px; }
    .rcard-lbl       { font-size:10px; }
    .res-score-main  { font-size:32px; }
    .res-hero        { padding:16px 12px; }
    .res-tabs        { top:52px; }
    .res-tab         { font-size:12px; padding:10px 4px; }
    .intro-last-score-num { font-size:34px; }
    .intro-start-btn { height:46px; font-size:14.5px; border-radius:12px; }
    .rev-q-header    { padding:10px 11px; }
    .rev-q-expanded  { padding:0 11px 12px; }
    .rev-q-text      { font-size:13.5px; padding:11px 12px; }
    .rev-opt-text    { font-size:12.5px; }
  }
`;

export default function TestAttemptClient() {
  const router = useRouter();
  const params = useParams();
  const { testSeriesId, testId } = params || {};
  const { isLoggedIn } = useAuth();

  const subjectConfigs = useMemo(
    () => TEST_CONFIG[testSeriesId]?.subjects || DEFAULT_SUBJECT_CONFIG,
    [testSeriesId]
  );
  const SUBJECTS = useMemo(() => subjectConfigs.map((s) => s.name), [subjectConfigs]);
  const SUBJ_COUNTS = useMemo(
    () => Object.fromEntries(subjectConfigs.map((s) => [s.name, s.count])),
    [subjectConfigs]
  );
  const MARKS_WRONG = TEST_CONFIG[testSeriesId]?.marksWrong ?? DEFAULT_MARKS_WRONG;
  const hasNegativeMarking = MARKS_WRONG !== 0;

  const backRoute = TEST_SERIES_ROUTES[testSeriesId] || "/test-series";
  const examTitle = TEST_SERIES_NAMES[testSeriesId] || "Test Series";

  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [phase, setPhase] = useState("intro"); // "intro" | "attempt" | "confirm" | "result"
  const [showPalette, setShowPalette] = useState(false);
  const [showExitWarn, setShowExitWarn] = useState(false);
  const [resultTab, setResultTab] = useState("summary");
  const [reviewFilter, setReviewFilter] = useState("all");
  const [reviewSubject, setReviewSubject] = useState("all");
  const [expandedQ, setExpandedQ] = useState(null);

  const [lastAttempt, setLastAttempt] = useState(null);
  const [introLoading, setIntroLoading] = useState(true);

  const timerRef = useRef(null);
  const resultRef = useRef(null);
  const answersRef = useRef(answers);
  const timeLeftRef = useRef(timeLeft);
  const phaseRef = useRef(phase);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);
  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Fetch last attempt on mount
  useEffect(() => {
    if (!isLoggedIn) {
      router.push(backRoute);
      return;
    }
    if (!testSeriesId || !testId) return;

    const fetchLastAttempt = async () => {
      try {
        setIntroLoading(true);
        const res = await authFetch(
          `/test-series/last-attempt?exam=${testSeriesId}&testId=${testId}`
        );
        if (res.ok) {
          const data = await res.json();
          setLastAttempt(data && data.totalMarks !== undefined ? data : false);
        } else {
          setLastAttempt(false);
        }
      } catch {
        setLastAttempt(false);
      } finally {
        setIntroLoading(false);
      }
    };
    fetchLastAttempt();
  }, [isLoggedIn, testSeriesId, testId, backRoute, router]);

  // Hide site footer while on this page (ported from React version)
  useEffect(() => {
    const footer = document.querySelector("footer, .site-footer, #footer, [data-footer]");
    if (footer) footer.style.display = "none";
    return () => {
      if (footer) footer.style.display = "";
    };
  }, []);

  // Fetch questions on phase -> "attempt"
  const fetchQuestions = useCallback(async () => {
    if (!testSeriesId || !testId) return;
    try {
      setLoadingQuestions(true);
      setLoadError("");
      const res = await authFetch(
        `/test-series/questions?exam=${testSeriesId}&testId=${testId}`
      );
      if (!res.ok) {
        if (res.status === 503) {
          throw new Error("Server is waking up. Please try again in a few seconds.");
        }
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.message || `Failed to fetch questions (${res.status})`);
      }
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No questions available for this test yet.");
      }
      setQuestions(data.map((q) => ({ ...q, id: q.questionId || q.id })));
    } catch (err) {
      console.error("Failed to fetch questions:", err);
      setLoadError(err.message || "Failed to load questions. Please try again.");
    } finally {
      setLoadingQuestions(false);
    }
  }, [testSeriesId, testId]);

  useEffect(() => {
    if (phase === "attempt" && questions.length === 0) {
      fetchQuestions();
    }
  }, [phase, questions.length, fetchQuestions]);

  // Submit Handler
  const doSubmit = useCallback(
    (autoSubmit = false) => {
      if (phaseRef.current === "result") return;
      clearInterval(timerRef.current);
      const curAnswers = answersRef.current;
      const curTimeLeft = timeLeftRef.current;
      const bySubject = {};
      SUBJECTS.forEach((s) => {
        bySubject[s] = { correct: 0, wrong: 0, skipped: 0, marks: 0 };
      });

      let totalMarks = 0;
      questions.forEach((q) => {
        const ans = curAnswers[q.id];
        const subj = bySubject[q.subject] || bySubject[SUBJECTS[0]];
        if (ans === undefined) {
          if (subj) subj.skipped++;
        } else if (ans === q.correctIndex) {
          if (subj) {
            subj.correct++;
            subj.marks += MARKS_CORRECT;
          }
          totalMarks += MARKS_CORRECT;
        } else {
          if (subj) {
            subj.wrong++;
            subj.marks += MARKS_WRONG;
          }
          totalMarks += MARKS_WRONG;
        }
      });

      resultRef.current = {
        bySubject,
        totalMarks: totalMarks.toFixed(2),
        totalCorrect: SUBJECTS.reduce((s, k) => s + (bySubject[k]?.correct || 0), 0),
        totalWrong: SUBJECTS.reduce((s, k) => s + (bySubject[k]?.wrong || 0), 0),
        totalSkipped: SUBJECTS.reduce((s, k) => s + (bySubject[k]?.skipped || 0), 0),
        total: questions.length,
        timeTaken: TOTAL_SECONDS - curTimeLeft,
        autoSubmit,
        answersSnapshot: { ...curAnswers },
      };

      authFetch("/test-series/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testSeriesId,
          testId,
          answers: curAnswers,
          timeTaken: TOTAL_SECONDS - curTimeLeft,
          totalMarks: resultRef.current.totalMarks,
        }),
      }).catch((e) => console.error("Submit error:", e));

      setResultTab("summary");
      setReviewFilter("all");
      setReviewSubject("all");
      setExpandedQ(null);
      setPhase("result");
    },
    [questions, testSeriesId, testId, SUBJECTS, MARKS_WRONG]
  );

  // Timer Countdown
  useEffect(() => {
    if (phase !== "attempt") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((p) => {
        if (p <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  useEffect(() => {
    if (timeLeft === 0 && phase === "attempt") {
      doSubmit(true);
    }
  }, [timeLeft, phase, doSubmit]);

  // Back guard (ported from React version — uses history pushState)
  useEffect(() => {
    window.history.pushState({ page: "test" }, "");
    const guard = () => {
      if (phaseRef.current === "result" || phaseRef.current === "intro") {
        router.replace(backRoute);
        return;
      }
      setShowExitWarn(true);
      window.history.pushState({ page: "test" }, "");
    };
    window.addEventListener("popstate", guard);
    return () => window.removeEventListener("popstate", guard);
  }, [router, backRoute]);

  const handleSelect = useCallback((qid, idx) => {
    setAnswers((prev) => {
      if (prev[qid] === idx) {
        const n = { ...prev };
        delete n[qid];
        return n;
      }
      return { ...prev, [qid]: idx };
    });
  }, []);

  const q = questions[currentIndex] || {};
  const qid = q?.id;
  const answered = Object.keys(answers).length;
  const unanswered = questions.length - answered;
  const timerWarn = timeLeft <= 600;
  const timerDanger = timeLeft <= 300;
  const subj = q ? SUBJ_STYLE[q.subject] || SUBJ_STYLE.Physics : SUBJ_STYLE.Physics;

  /* ════════════════════════ INTRO PHASE ════════════════════════ */
  if (phase === "intro") {
    const totalQs = subjectConfigs.reduce((sum, s) => sum + s.count, 0);
    const maxMarks = totalQs * MARKS_CORRECT;

    const startTest = () => {
      setAnswers({});
      setFlagged({});
      setCurrentIndex(0);
      setTimeLeft(TOTAL_SECONDS);
      setPhase("attempt");
    };

    const scoreColor = (marks) => {
      const n = parseFloat(marks);
      if (n >= maxMarks * 0.7) return "#15803d";
      if (n >= maxMarks * 0.4) return "#ca8a04";
      return "#dc2626";
    };

    const pctLabel = (la) => {
      if (!la) return null;
      return ((la.totalCorrect / (la.total || totalQs)) * 100).toFixed(1);
    };

    const gradeLabel = (marks) => {
      const pct = (parseFloat(marks) / maxMarks) * 100;
      if (pct >= 90) return { label: "Outstanding", color: "#15803d", bg: "#f0fdf4", bd: "#86efac" };
      if (pct >= 70) return { label: "Excellent", color: "#16a34a", bg: "#f0fdf4", bd: "#bbf7d0" };
      if (pct >= 50) return { label: "Good", color: "#ca8a04", bg: "#fefce8", bd: "#fde047" };
      if (pct >= 35) return { label: "Average", color: "#d97706", bg: "#fffbeb", bd: "#fde68a" };
      return { label: "Needs Work", color: "#dc2626", bg: "#fef2f2", bd: "#fecaca" };
    };

    return (
      <div className="tap-root" style={{ minHeight: "100vh", background: "#f0f2f7" }}>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />

        {/* Topbar */}
        <div className="tap-topbar" style={{ marginTop: NAVBAR_HEIGHT }}>
          <div className="tap-topbar-left">
            <button className="tap-exit-btn" onClick={() => router.replace(backRoute)} aria-label="Back">
              ←
            </button>
            <div className="tap-topbar-titles">
              <div className="tap-topbar-name">
                {examTitle} — Test {testId}
              </div>
              <div className="tap-topbar-sub">
                {totalQs} Questions · {SUBJECTS.join(" · ")}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "20px 16px 48px" }}>
          {/* Hero banner */}
          <div className="intro-hero-banner">
            <div className="intro-hero-left">
              <div className="intro-hero-label">TEST {testId}</div>
              <div className="intro-hero-title">{examTitle}</div>
              <div className="intro-hero-meta">
                {SUBJECTS.map((s) => (
                  <span
                    key={s}
                    className="intro-hero-pill"
                    style={{
                      background: (SUBJ_STYLE[s] || SUBJ_STYLE.Physics).bg,
                      borderColor: (SUBJ_STYLE[s] || SUBJ_STYLE.Physics).bd,
                      color: (SUBJ_STYLE[s] || SUBJ_STYLE.Physics).tx,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="intro-hero-right">
              <div className="intro-hero-stat">
                <span className="intro-hero-stat-num">{totalQs}</span>
                <span className="intro-hero-stat-lbl">Questions</span>
              </div>
              <div className="intro-hero-divider" />
              <div className="intro-hero-stat">
                <span className="intro-hero-stat-num">{maxMarks}</span>
                <span className="intro-hero-stat-lbl">Max Marks</span>
              </div>
            </div>
          </div>

          {/* Quick info strip */}
          <div className="intro-strip">
            {[
              { icon: "⏱", label: "Duration", val: "2.5 Hours" },
              { icon: "✅", label: "Correct", val: `+${MARKS_CORRECT}` },
              { icon: "❌", label: "Wrong", val: `${MARKS_WRONG}` },
              { icon: "⬜", label: "Skipped", val: "0" },
            ].map(({ icon, label, val }) => (
              <div key={label} className="intro-strip-item">
                <span className="intro-strip-icon">{icon}</span>
                <span className="intro-strip-val">{val}</span>
                <span className="intro-strip-lbl">{label}</span>
              </div>
            ))}
          </div>

          {/* Subject breakdown */}
          <div className="intro-card">
            <div className="intro-card-head">📚 Subject Distribution</div>
            <div className="intro-subj-dist">
              {subjectConfigs.map(({ name: s, count }) => {
                const st = SUBJ_STYLE[s] || SUBJ_STYLE.Physics;
                const pct = Math.round((count / totalQs) * 100);
                return (
                  <div key={s} className="intro-subj-dist-row">
                    <div className="intro-subj-dist-left">
                      <span className="tap-subj-pill" style={{ background: st.bg, borderColor: st.bd, color: st.tx }}>
                        {s}
                      </span>
                      <span className="intro-subj-dist-qs">{count} Questions</span>
                    </div>
                    <div className="intro-subj-dist-right">
                      <div className="intro-subj-dist-bar-bg">
                        <div className="intro-subj-dist-bar-fill" style={{ width: `${pct}%`, background: st.accent }} />
                      </div>
                      <span className="intro-subj-dist-marks" style={{ color: st.tx }}>
                        {count} marks
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Last attempt card */}
          <div className="intro-card intro-last-card">
            <div className="intro-card-head">🕐 Previous Attempt</div>

            {introLoading ? (
              <div className="intro-last-loading">
                <div className="intro-spinner" />
                <span>Checking your history…</span>
              </div>
            ) : !lastAttempt ? (
              <div className="intro-no-attempt">
                <span className="intro-no-icon">🎯</span>
                <span>
                  No previous attempt found.
                  <br />
                  This will be your first attempt!
                </span>
              </div>
            ) : (
              <>
                <div className="intro-last-hero">
                  <div className="intro-last-score-block">
                    <span className="intro-last-score-num" style={{ color: scoreColor(lastAttempt.totalMarks) }}>
                      {lastAttempt.totalMarks}
                    </span>
                    <span className="intro-last-score-denom">/ {maxMarks}</span>
                  </div>
                  {(() => {
                    const g = gradeLabel(lastAttempt.totalMarks);
                    return (
                      <span className="intro-grade-badge" style={{ background: g.bg, borderColor: g.bd, color: g.color }}>
                        {g.label}
                      </span>
                    );
                  })()}
                  <div className="intro-last-acc">
                    {pctLabel(lastAttempt)}% accuracy · {formatTime(lastAttempt.timeTaken)} taken
                  </div>
                </div>

                <div className="intro-last-pills">
                  <span className="intro-pill intro-pill-green">✓ {lastAttempt.totalCorrect} Correct</span>
                  <span className="intro-pill intro-pill-red">✗ {lastAttempt.totalWrong} Wrong</span>
                  <span className="intro-pill intro-pill-gray">— {lastAttempt.totalSkipped} Skipped</span>
                  <span className="intro-pill intro-pill-blue">⏱ {formatTime(lastAttempt.timeTaken)}</span>
                </div>

                {hasNegativeMarking && (
                  <div className="intro-negative-bar">
                    <span className="intro-negative-label">⚠️ Marks lost to negative marking</span>
                    <span className="intro-negative-val" style={{ color: "#dc2626" }}>
                      −{(lastAttempt.totalWrong * Math.abs(MARKS_WRONG)).toFixed(2)}
                    </span>
                  </div>
                )}

                {lastAttempt.bySubject && (
                  <div className="intro-last-subj-rows">
                    {SUBJECTS.map((s) => {
                      const d = lastAttempt.bySubject[s];
                      if (!d) return null;
                      const st = SUBJ_STYLE[s] || SUBJ_STYLE.Physics;
                      const cnt = SUBJ_COUNTS[s] || 1;
                      const pctBar = ((d.correct / cnt) * 100).toFixed(0);
                      const acc =
                        d.correct + d.wrong > 0 ? ((d.correct / (d.correct + d.wrong)) * 100).toFixed(0) : 0;
                      return (
                        <div key={s} className="intro-subj-row">
                          <span
                            className="tap-subj-pill-xs"
                            style={{ background: st.bg, borderColor: st.bd, color: st.tx }}
                          >
                            {s.slice(0, 3)}
                          </span>
                          <div className="intro-subj-bar-wrap">
                            <div className="intro-subj-bar-bg">
                              <div className="intro-subj-bar-fill" style={{ width: `${pctBar}%`, background: st.accent }} />
                            </div>
                            <span className="intro-subj-stat">
                              {d.correct}/{cnt}
                            </span>
                          </div>
                          <span className="intro-subj-acc">{acc}%</span>
                          <span className="intro-subj-marks" style={{ color: d.marks < 0 ? "#dc2626" : "#15803d" }}>
                            {d.marks >= 0 ? "+" : ""}
                            {d.marks.toFixed(2)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="intro-last-date">
                  {lastAttempt.attemptedAt
                    ? `Attempted on ${new Date(lastAttempt.attemptedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}`
                    : "Previous attempt"}
                </div>
              </>
            )}
          </div>

          {/* Instructions */}
          <div className="intro-card intro-instr-card">
            <div className="intro-card-head">📌 Instructions</div>
            <ul className="intro-instr-list">
              <li>
                Do <b>not</b> close or refresh during the test — progress will be lost.
              </li>
              <li>
                Click a selected option again to <b>deselect</b> it.
              </li>
              <li>
                Use the palette <b>(☰)</b> to jump between questions.
              </li>
              <li>
                Timer counts down — test <b>auto-submits at 00:00</b>.
              </li>
              {hasNegativeMarking ? (
                <li>
                  Negative marking: <b>{MARKS_WRONG}</b> for every wrong answer.
                </li>
              ) : (
                <li>
                  <b>No negative marking</b> — wrong answers score 0.
                </li>
              )}
              <li>
                Unanswered questions score <b>0</b> (no penalty).
              </li>
            </ul>
          </div>

          {/* CTA */}
          <button className="intro-start-btn" onClick={startTest}>
            {lastAttempt ? "Attempt Again →" : "Start Test →"}
          </button>
          {lastAttempt && (
            <p style={{ textAlign: "center", fontSize: 11.5, color: "#9ca3af", marginTop: 8, fontWeight: 500 }}>
              Re-attempting will overwrite your previous result
            </p>
          )}
        </div>
      </div>
    );
  }

  /* ════════════════════════ LOADING QUESTIONS ════════════════════════ */
  if (loadingQuestions) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          background: "#f4f6f9",
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `@keyframes spin{to{transform:rotate(360deg)}}` }} />
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "3px solid #e5e7eb",
            borderTopColor: "#2563eb",
            animation: "spin 0.9s linear infinite",
          }}
        />
        <p style={{ fontSize: 15, fontWeight: 600, color: "#6b7280" }}>Loading test…</p>
      </div>
    );
  }

  /* ════════════════════════ ERROR STATE ════════════════════════ */
  if (loadError) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          background: "#f4f6f9",
          padding: 16,
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 16,
            padding: 24,
            maxWidth: 420,
            width: "100%",
            boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
          }}
        >
          <p style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 8 }}>
            Couldn't load the test
          </p>
          <p style={{ fontSize: 13.5, color: "#6b7280", marginBottom: 16 }}>{loadError}</p>
          <button className="intro-start-btn" onClick={fetchQuestions}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return <div style={{ padding: 40 }}>No questions found</div>;
  }

  /* ════════════════════════ ATTEMPT / CONFIRM PHASE ════════════════════════ */
  if (phase === "attempt" || phase === "confirm") {
    /* ════════════════════════ MODALS ════════════════════════ */
    const ConfirmModal = () => (
        <div className="tap-modal-overlay" onClick={() => setPhase("attempt")}>
            <div className="tap-modal" onClick={e => e.stopPropagation()}>
                <h3 className="tap-modal-title">Submit Test?</h3>
                <div className="tap-modal-stats">
                    <div className="tap-mstat tap-mstat-green"><b>{answered}</b><span>Answered</span></div>
                    <div className="tap-mstat tap-mstat-gray"><b>{unanswered}</b><span>Unanswered</span></div>
                </div>
                <div className="tap-modal-subj-counts">
                    {SUBJECTS.map(s => {
                        const qs   = questions.filter(q2 => q2.subject === s);
                        const done = qs.filter(q2 => answers[q2.id] !== undefined).length;
                        const st   = SUBJ_STYLE[s] || SUBJ_STYLE.Physics;
                        return (
                            <div key={s} className="tap-modal-subj-row">
                                <span className="tap-subj-pill-xs" style={{ background: st.bg, borderColor: st.bd, color: st.tx }}>{s.slice(0, 3)}</span>
                                <span className="tap-modal-subj-count">{done}/{qs.length}</span>
                            </div>
                        );
                    })}
                </div>
                {unanswered > 0 && <p className="tap-modal-warn">⚠️ {unanswered} question{unanswered !== 1 ? "s" : ""} unanswered — will score 0.</p>}
                <p className="tap-modal-time-left">⏱ Time remaining: <strong>{formatTime(timeLeft)}</strong></p>
                <div className="tap-modal-actions">
                    <button className="tap-modal-cancel" onClick={() => setPhase("attempt")}>Continue Test</button>
                    <button className="tap-modal-confirm" onClick={() => doSubmit(false)}>Yes, Submit</button>
                </div>
            </div>
        </div>
    );

    const ExitModal = () => (
        <div className="tap-modal-overlay" onClick={() => setShowExitWarn(false)}>
            <div className="tap-modal" onClick={e => e.stopPropagation()}>
                <h3 className="tap-modal-title">Leave Test?</h3>
                <p className="tap-modal-warn" style={{ marginBottom: 16 }}>⚠️ Your progress will NOT be saved if you leave now.</p>
                <div className="tap-modal-actions">
                    <button className="tap-modal-cancel" onClick={() => setShowExitWarn(false)}>Stay</button>
                    <button className="tap-modal-confirm" style={{ background: "#dc2626" }} onClick={() => router.replace(backRoute)}>Leave</button>
                </div>
            </div>
        </div>
    );

    /* ════════════════════════ ATTEMPT UI ════════════════════════ */
    const timerCls = timerDanger ? "tap-timer tap-timer-danger" : timerWarn ? "tap-timer tap-timer-warn" : "tap-timer";

    return (
        <MathJaxContext>
            <div className="tap-root">
                <style dangerouslySetInnerHTML={{ __html: CSS }} />
                {phase === "confirm" && <ConfirmModal />}
                {showExitWarn && <ExitModal />}

                <div className="tap-topbar" style={{ marginTop: NAVBAR_HEIGHT }}>
                    <div className="tap-topbar-left">
                        <button className="tap-exit-btn" onClick={() => setShowExitWarn(true)} aria-label="Exit">✕</button>
                        <div className="tap-topbar-titles">
                            <div className="tap-topbar-name">{examTitle} — Test {testId}</div>
                            <div className="tap-topbar-sub">
                                Q {currentIndex + 1}/{questions.length}
                                <span className="tap-topbar-dot">·</span>
                                <span style={{ color: "#86efac" }}>{answered}</span> done
                                <span className="tap-topbar-dot">·</span>
                                {unanswered} left
                            </div>
                        </div>
                    </div>
                    <div className="tap-topbar-right">
                        <div className={timerCls} role="timer" aria-live="polite">⏱ {formatTime(timeLeft)}</div>
                        <button className="tap-palette-btn" onClick={() => setShowPalette(v => !v)} aria-label="Palette">
                            <svg width="16" height="14" viewBox="0 0 16 14" fill="currentColor">
                                <rect x="0" y="0" width="16" height="2" rx="1" />
                                <rect x="0" y="6" width="16" height="2" rx="1" />
                                <rect x="0" y="12" width="16" height="2" rx="1" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="tap-progress-bar">
                    <div className="tap-progress-fill" style={{ width: `${(answered / questions.length) * 100}%` }} />
                </div>

                <div className="tap-subj-tabs">
                    {SUBJECTS.map(s => {
                        const qs     = questions.filter(q2 => q2.subject === s);
                        const done   = qs.filter(q2 => answers[q2.id] !== undefined).length;
                        const st     = SUBJ_STYLE[s] || SUBJ_STYLE.Physics;
                        const active = q.subject === s;
                        return (
                            <button key={s} role="tab" aria-selected={active}
                                className={`tap-subj-tab${active ? " tap-subj-tab-active" : ""}`}
                                style={active ? { borderBottomColor: st.tx, color: st.tx } : {}}
                                onClick={() => { const fi = questions.findIndex(q2 => q2.subject === s); if (fi !== -1) setCurrentIndex(fi); }}>
                                {active && <span className="tap-tab-dot" style={{ background: st.dot }} />}
                                {s}
                                <span className="tap-subj-tab-count" style={active ? { background: st.bg, color: st.tx, borderColor: st.bd } : {}}>
                                    {done}/{qs.length}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {showPalette && (
                    <div className="tap-palette-overlay" onClick={() => setShowPalette(false)}>
                        <div className="tap-palette" onClick={e => e.stopPropagation()}>
                            <div className="tap-palette-head">
                                <span>Question Palette</span>
                                <button onClick={() => setShowPalette(false)} aria-label="Close">✕</button>
                            </div>
                            <div className="tap-palette-legend">
                                <span className="tap-leg tap-leg-answered">✓ Answered</span>
                                <span className="tap-leg tap-leg-flagged">🚩 Flagged</span>
                                <span className="tap-leg tap-leg-not">Not Visited</span>
                            </div>
                            <div className="tap-palette-scroll">
                                {SUBJECTS.map(s => {
                                    const st      = SUBJ_STYLE[s] || SUBJ_STYLE.Physics;
                                    const subjQs  = questions.map((q2, i) => q2.subject === s ? i : null).filter(i => i !== null);
                                    const doneCount = subjQs.filter(i => answers[questions[i].id] !== undefined).length;
                                    const qSt = (idx) => {
                                        const qid2 = questions[idx].id;
                                        const ans  = answers[qid2] !== undefined;
                                        const flag = flagged[qid2];
                                        if (ans && flag) return "answered-flagged";
                                        if (ans)  return "answered";
                                        if (flag) return "flagged";
                                        if (idx === currentIndex) return "active";
                                        return "not-visited";
                                    };
                                    return (
                                        <div key={s} className="tap-pal-subj-block">
                                            <div className="tap-pal-subj-header" style={{ borderLeftColor: st.accent }}>
                                                <span style={{ color: st.tx, fontWeight: 800, fontSize: 13 }}>{s}</span>
                                                <span className="tap-pal-subj-done" style={{ background: st.bg, color: st.tx, borderColor: st.bd }}>{doneCount}/{subjQs.length}</span>
                                            </div>
                                            <div className="tap-palette-grid">
                                                {subjQs.map((idx, posInSubj) => (
                                                    <button key={idx}
                                                        className={`tap-pq-btn tap-pq-${qSt(idx)}`}
                                                        onClick={() => { setCurrentIndex(idx); setShowPalette(false); }}
                                                        aria-label={`Q ${idx + 1}`}>
                                                        {posInSubj + 1}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="tap-palette-summary">
                                <div className="tap-ps-row"><span>Answered</span><b style={{ color: "#16a34a" }}>{answered}</b></div>
                                <div className="tap-ps-row"><span>Unanswered</span><b style={{ color: "#dc2626" }}>{unanswered}</b></div>
                                <div className="tap-ps-row"><span>Flagged</span><b style={{ color: "#92400e" }}>{Object.values(flagged).filter(Boolean).length}</b></div>
                            </div>
                            <button className="tap-submit-palette" onClick={() => { setShowPalette(false); setPhase("confirm"); }}>Submit Test →</button>
                        </div>
                    </div>
                )}

                <div className="tap-body">
                    <div className="tap-q-meta-row">
                        <span className="tap-subj-pill" style={{ background: subj.bg, borderColor: subj.bd, color: subj.tx }}>{q.subject}</span>
                        <span className="tap-qnum-badge">Q {currentIndex + 1} / {questions.length}</span>
                        <span className="tap-marking-badge">+{MARKS_CORRECT} / {MARKS_WRONG}</span>
                        {flagged[qid] && <span className="tap-flagged-badge">🚩 Flagged</span>}
                    </div>
                    <div className="tap-qtext"><MathJax dynamic>{q.text}</MathJax></div>
                    <div className="tap-options" role="radiogroup">
                        {q.options?.map((opt, idx) => {
                            const selected = answers[qid] === idx;
                            return (
                                <div key={idx}
                                    className={`tap-option${selected ? " tap-option-selected" : ""}`}
                                    style={selected ? { borderColor: subj.accent, boxShadow: `0 0 0 3px ${subj.accent}18` } : {}}
                                    onClick={() => handleSelect(qid, idx)}
                                    role="radio" aria-checked={selected} tabIndex={0}
                                    onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleSelect(qid, idx); } }}>
                                    <div className={`tap-opt-letter${selected ? " tap-opt-letter-sel" : ""}`} style={selected ? { background: subj.accent } : {}}>
                                        {String.fromCharCode(65 + idx)}
                                    </div>
                                    <div className="tap-opt-text"><MathJax dynamic>{opt}</MathJax></div>
                                </div>
                            );
                        })}
                    </div>
                    <button className={`tap-flag-btn${flagged[qid] ? " tap-flag-active" : ""}`}
                        onClick={() => setFlagged(prev => ({ ...prev, [qid]: !prev[qid] }))}>
                        {flagged[qid] ? "🚩 Flagged for review" : "🏳 Mark for review"}
                    </button>
                </div>

                <div className="tap-bottombar">
                    <div className="tap-bottombar-inner">
                        <button className="tap-nav-btn" onClick={() => setCurrentIndex(i => i - 1)} disabled={currentIndex === 0}>← Prev</button>
                        <button className="tap-submit-btn" onClick={() => setPhase("confirm")}>Submit Test</button>
                        <button className="tap-nav-btn" onClick={() => setCurrentIndex(i => i + 1)} disabled={currentIndex === questions.length - 1}>Next →</button>
                    </div>
                </div>
            </div>
        </MathJaxContext>
    );
  }


  /* ════════════════════════ RESULT ════════════════════════ */
  if (phase === "result" && resultRef.current) {
    const r = resultRef.current;
    const pct = ((r.totalCorrect / r.total) * 100).toFixed(1);
    const maxMarks = r.total * MARKS_CORRECT;
    const score = parseFloat(r.totalMarks);
    const marksLost = (r.totalWrong * Math.abs(MARKS_WRONG)).toFixed(2);
    const attemptRate = (((r.totalCorrect + r.totalWrong) / r.total) * 100).toFixed(0);

    const filteredQs = questions.filter((qs) => {
      const userAns = r.answersSnapshot[qs.id];
      const isSkip = userAns === undefined;
      const isOk = !isSkip && userAns === qs.correctIndex;
      const matchStatus =
        reviewFilter === "all"
          ? true
          : reviewFilter === "correct"
          ? isOk
          : reviewFilter === "wrong"
          ? !isSkip && !isOk
          : isSkip;
      const matchSubj = reviewSubject === "all" || qs.subject === reviewSubject;
      return matchStatus && matchSubj;
    });

    return (
      <MathJaxContext>
        <div className="tap-root" style={{ background: "#f0f2f7" }}>
          <style dangerouslySetInnerHTML={{ __html: CSS }} />
          <div className="tap-topbar res-topbar" style={{ marginTop: NAVBAR_HEIGHT }}>
            <div className="tap-topbar-left">
              <div className="tap-topbar-titles">
                <div className="tap-topbar-name">Result — Test {testId}</div>
                <div className="tap-topbar-sub">
                  {r.autoSubmit ? "⏱ Time Over — Auto Submitted" : "✓ Submitted Successfully"}
                </div>
              </div>
            </div>
            <div className="tap-topbar-right">
              <div className="tap-timer" style={{ background: "#d1fae5", color: "#065f46", border: "1px solid #6ee7b7" }}>
                ⏱ {formatTime(r.timeTaken)} taken
              </div>
            </div>
          </div>

          <div className="res-tabs">
            <button
              className={`res-tab${resultTab === "summary" ? " res-tab-active" : ""}`}
              onClick={() => setResultTab("summary")}
            >
              📊 Summary
            </button>
            <button
              className={`res-tab${resultTab === "review" ? " res-tab-active" : ""}`}
              onClick={() => setResultTab("review")}
            >
              📋 Review
              <span className="res-tab-count">{r.totalWrong > 0 ? `${r.totalWrong} wrong` : `${r.total} qs`}</span>
            </button>
          </div>

          {/* ══════════════ SUMMARY TAB ══════════════ */}
          {resultTab === "summary" && (
            <div className="res-body">
              <div className="res-hero">
                <div className="res-hero-icon">{pct >= 70 ? "🏆" : pct >= 50 ? "🎉" : pct >= 35 ? "📊" : "💪"}</div>
                <div className="res-hero-score">
                  <span className="res-score-main" style={{ color: score < 0 ? "#fca5a5" : "#fff" }}>
                    {r.totalMarks}
                  </span>
                  <span className="res-score-denom">/ {maxMarks}</span>
                </div>
                <div className="res-hero-acc">
                  Accuracy: <strong>{pct}%</strong>
                </div>
              </div>

              <div className="res-cards">
                {[
                  { val: r.totalMarks, lbl: "Score", cls: "rcard-blue", neg: score < 0 },
                  { val: r.totalCorrect, lbl: "Correct", cls: "rcard-green" },
                  { val: r.totalWrong, lbl: "Wrong", cls: "rcard-red" },
                  { val: r.totalSkipped, lbl: "Skipped", cls: "rcard-gray" },
                ].map(({ val, lbl, cls, neg }) => (
                  <div key={lbl} className={`res-card ${cls}`}>
                    <span className="rcard-val" style={neg ? { color: "#dc2626" } : {}}>
                      {val}
                    </span>
                    <span className="rcard-lbl">{lbl}</span>
                  </div>
                ))}
              </div>

              <div className="res-analysis-strip">
                <div className="res-analysis-item">
                  <span className="res-analysis-num" style={{ color: "#dc2626" }}>
                    −{marksLost}
                  </span>
                  <span className="res-analysis-lbl">{hasNegativeMarking ? "Lost to negatives" : "Penalty (none)"}</span>
                </div>
                <div className="res-analysis-divider" />
                <div className="res-analysis-item">
                  <span className="res-analysis-num" style={{ color: "#2563eb" }}>
                    {attemptRate}%
                  </span>
                  <span className="res-analysis-lbl">Attempt rate</span>
                </div>
                <div className="res-analysis-divider" />
                <div className="res-analysis-item">
                  <span className="res-analysis-num" style={{ color: "#7c3aed" }}>
                    {formatTime(Math.round(r.timeTaken / r.total))}
                  </span>
                  <span className="res-analysis-lbl">Avg per question</span>
                </div>
                <div className="res-analysis-divider" />
                <div className="res-analysis-item">
                  <span className="res-analysis-num" style={{ color: "#0369a1" }}>
                    {formatTime(r.timeTaken)}
                  </span>
                  <span className="res-analysis-lbl">Total time</span>
                </div>
              </div>

              <div className="res-score-bar-card">
                <div className="res-score-bar-head">Score Breakdown</div>
                <div className="res-score-bar-track">
                  <div
                    className="res-score-bar-correct"
                    style={{ width: `${(r.totalCorrect / r.total) * 100}%` }}
                    title={`Correct: ${r.totalCorrect}`}
                  />
                  <div
                    className="res-score-bar-wrong"
                    style={{ width: `${(r.totalWrong / r.total) * 100}%` }}
                    title={`Wrong: ${r.totalWrong}`}
                  />
                  <div
                    className="res-score-bar-skip"
                    style={{ width: `${(r.totalSkipped / r.total) * 100}%` }}
                    title={`Skipped: ${r.totalSkipped}`}
                  />
                </div>
                <div className="res-score-bar-legend">
                  <span className="res-sbl res-sbl-correct">■ Correct ({r.totalCorrect})</span>
                  <span className="res-sbl res-sbl-wrong">■ Wrong ({r.totalWrong})</span>
                  <span className="res-sbl res-sbl-skip">■ Skipped ({r.totalSkipped})</span>
                </div>
              </div>

              <div className="res-section-card">
                <div className="res-section-head">Subject-wise Performance</div>
                {SUBJECTS.map((s) => {
                  const d = r.bySubject[s];
                  const st = SUBJ_STYLE[s] || SUBJ_STYLE.Physics;
                  const cnt = SUBJ_COUNTS[s] || 1;
                  const acc = d.correct + d.wrong > 0 ? ((d.correct / (d.correct + d.wrong)) * 100).toFixed(0) : "—";
                  const pctBar = (d.correct / cnt) * 100;

                  return (
                    <div key={s} className="res-subj-block">
                      <div className="res-subj-header">
                        <span className="tap-subj-pill" style={{ background: st.bg, borderColor: st.bd, color: st.tx }}>
                          {s}
                        </span>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                          <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600 }}>Acc {acc}%</span>
                          <span className="res-subj-marks" style={{ color: d.marks < 0 ? "#dc2626" : "#15803d" }}>
                            {d.marks >= 0 ? "+" : ""}
                            {d.marks.toFixed(2)} marks
                          </span>
                        </div>
                      </div>
                      <div className="res-subj-bar-bg">
                        <div className="res-subj-bar-fill" style={{ width: `${pctBar}%`, background: st.accent }} />
                      </div>
                      <div className="res-subj-stats">
                        <span className="rstat-ok">✓ {d.correct} correct</span>
                        <span className="rstat-wrong">✗ {d.wrong} wrong</span>
                        <span className="rstat-skip">— {d.skipped} skipped</span>
                        {hasNegativeMarking && (
                          <span className="rstat-neg" style={{ color: "#dc2626" }}>
                            −{(d.wrong * Math.abs(MARKS_WRONG)).toFixed(2)} penalty
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="res-marking-note">
                <span>📋 Marking:</span>
                {" "}+{MARKS_CORRECT} correct
                {hasNegativeMarking ? `, ${MARKS_WRONG} wrong` : ", no negative marking"}, 0 skipped.
              </div>
            </div>
          )}

                {/* ══════════════ REVIEW TAB ══════════════ */}
                {resultTab === "review" && (
                    <div className="res-body">

                        {/* Filter bar */}
                        <div className="rev-filter-bar">
                            <div className="rev-filter-group">
                                {[
                                    { key: "all",     label: `All (${r.total})` },
                                    { key: "correct", label: `✓ ${r.totalCorrect}`, cls: "rev-filter-correct" },
                                    { key: "wrong",   label: `✗ ${r.totalWrong}`,   cls: "rev-filter-wrong" },
                                    { key: "skipped", label: `— ${r.totalSkipped}`, cls: "rev-filter-skip" },
                                ].map(({ key, label, cls }) => (
                                    <button key={key}
                                        className={`rev-filter-btn ${cls || ""} ${reviewFilter === key ? "rev-filter-active" : ""}`}
                                        onClick={() => setReviewFilter(key)}>
                                        {label}
                                    </button>
                                ))}
                            </div>
                            <div className="rev-subj-group">
                                <select className="rev-subj-select"
                                    value={reviewSubject}
                                    onChange={e => setReviewSubject(e.target.value)}>
                                    <option value="all">All Subjects</option>
                                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Summary mini strip */}
                        <div className="rev-summary-strip">
                            <span>Showing <b>{filteredQs.length}</b> of {r.total} questions</span>
                            {reviewFilter === "wrong" && hasNegativeMarking && (
                                <span style={{ color: "#dc2626", fontWeight: 700 }}>−{marksLost} marks lost</span>
                            )}
                            {reviewFilter === "correct" && (
                                <span style={{ color: "#15803d", fontWeight: 700 }}>+{r.totalCorrect} marks earned</span>
                            )}
                        </div>

                        {/* Question list */}
                        <div className="res-section-card" style={{ padding: 0 }}>
                            {filteredQs.length === 0 ? (
                                <div style={{ padding: "32px 16px", textAlign: "center", color: "#9ca3af", fontSize: 14, fontWeight: 600 }}>
                                    No questions match this filter
                                </div>
                            ) : filteredQs.map((qs, idx) => {
                                const userAns  = r.answersSnapshot[qs.id];
                                const isSkip   = userAns === undefined;
                                const isOk     = !isSkip && userAns === qs.correctIndex;
                                
                                const st       = SUBJ_STYLE[qs.subject] || SUBJ_STYLE.Physics;
                                const globalIdx = questions.findIndex(q2 => q2.id === qs.id);
                                const isExpanded = expandedQ === qs.id;

                                return (
                                    <div key={qs.id} className={`rev-q-block ${isSkip ? "rev-q-skip" : isOk ? "rev-q-ok" : "rev-q-wrong"}`}>
                                        {/* ── Header row ── */}
                                        <div className="rev-q-header" onClick={() => setExpandedQ(isExpanded ? null : qs.id)}>
                                            <div className="rev-q-header-left">
                                                <span className={`rev-q-status-dot ${isSkip ? "dot-skip" : isOk ? "dot-ok" : "dot-wrong"}`} />
                                                <span className="rev-q-num">Q{globalIdx + 1}</span>
                                                <span className="tap-subj-pill-xs" style={{ background: st.bg, borderColor: st.bd, color: st.tx }}>
                                                    {qs.subject.slice(0, 3)}
                                                </span>
                                                <span className={`rev-q-status-label ${isSkip ? "rsl-skip" : isOk ? "rsl-ok" : "rsl-wrong"}`}>
                                                    {isSkip ? "Skipped" : isOk ? "✓ Correct" : "✗ Wrong"}
                                                </span>
                                            </div>
                                            <div className="rev-q-header-right">
                                                {!isSkip && (
                                                    <span className="rev-q-mark" style={{ color: isOk ? "#15803d" : "#dc2626" }}>
                                                        {isOk ? `+${MARKS_CORRECT}` : `${MARKS_WRONG}`}
                                                    </span>
                                                )}
                                                <span className="rev-q-expand">{isExpanded ? "▲" : "▼"}</span>
                                            </div>
                                        </div>

                                        {/* ── Collapsed preview ── */}
                                        {!isExpanded && (
                                            <div className="rev-q-preview">
                                                <MathJax dynamic>{qs.text?.length > 120 ? qs.text.slice(0, 120) + "…" : qs.text}</MathJax>
                                            </div>
                                        )}

                                        {/* ── Expanded detail ── */}
                                        {isExpanded && (
                                            <div className="rev-q-expanded">
                                                <div className="rev-q-text">
                                                    <MathJax dynamic>{qs.text}</MathJax>
                                                </div>
                                                <div className="rev-options-list">
                                                    {qs.options.map((opt, oi) => {
                                                        const isCorrectOpt = oi === qs.correctIndex;
                                                        const isUserOpt    = oi === userAns;
                                                        let optClass = "rev-opt";
                                                        if (isCorrectOpt) optClass += " rev-opt-correct";
                                                        else if (isUserOpt && !isCorrectOpt) optClass += " rev-opt-wrong";
                                                        return (
                                                            <div key={oi} className={optClass}>
                                                                <div className={`rev-opt-letter ${isCorrectOpt ? "rev-ol-correct" : isUserOpt ? "rev-ol-wrong" : ""}`}>
                                                                    {String.fromCharCode(65 + oi)}
                                                                </div>
                                                                <div className="rev-opt-text"><MathJax dynamic>{opt}</MathJax></div>
                                                                <div className="rev-opt-tag">
                                                                    {isCorrectOpt && <span className="rev-tag-correct">✓ Correct</span>}
                                                                    {isUserOpt && !isCorrectOpt && <span className="rev-tag-wrong">Your answer</span>}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                {/* Answer summary line */}
                                                {!isSkip && (
                                                    <div className="rev-answer-summary">
                                                        {isOk
                                                            ? <span style={{ color: "#15803d" }}>✓ You answered correctly: <b>{qs.options[userAns]}</b></span>
                                                            : <span style={{ color: "#dc2626" }}>✗ You chose <b>{qs.options[userAns]}</b> · Correct: <b>{qs.options[qs.correctIndex]}</b></span>
                                                        }
                                                    </div>
                                                )}
                                                {isSkip && (
                                                    <div className="rev-answer-summary" style={{ color: "#6b7280" }}>
                                                        — Skipped · Correct answer: <b>{qs.options[qs.correctIndex]}</b>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

          <div className="res-sticky-footer">
            <button className="res-back-btn" onClick={() => router.replace(backRoute)}>← Back to Tests</button>
          </div>
        </div>
      </MathJaxContext>
    );
  }

  return null;
}