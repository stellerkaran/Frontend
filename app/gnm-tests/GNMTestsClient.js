"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { authFetch } from "@/utils/api";

const TEST_SERIES_ID = "GNM-TS";

const tests = [
  { id: 1,  name: "Test 1", desc: "Full Syllabus · JCECEB Pattern", tag: "Start Here" },
  { id: 2,  name: "Test 2", desc: "Full Syllabus · JCECEB Pattern", tag: null },
  { id: 3,  name: "Test 3", desc: "Full Syllabus · JCECEB Pattern", tag: null },
  { id: 4,  name: "Test 4", desc: "Full Syllabus · JCECEB Pattern", tag: null },
  { id: 5,  name: "Test 5", desc: "Full Syllabus · JCECEB Pattern", tag: null },
  { id: 6,  name: "Test 6", desc: "Full Syllabus · JCECEB Pattern", tag: null },
  { id: 7,  name: "Test 7", desc: "Full Syllabus · JCECEB Pattern", tag: null },
  { id: 8,  name: "Test 8", desc: "Full Syllabus · JCECEB Pattern", tag: null },
  { id: 9,  name: "Test 9", desc: "Full Syllabus · JCECEB Pattern", tag: "Grand Test" },
  { id: 10, name: "Test 10", desc: "Full Syllabus · Final Grand Test", tag: "Final" },
];

export default function GNMTestsClient() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [accessStatus, setAccessStatus] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) { router.push("/exam-preparation"); return; }
    authFetch(`/purchase/check?testSeriesId=${TEST_SERIES_ID}`)
      .then(r => r.json())
      .then(data => {
        if (!data.access) router.push("/gnm-test-series");
        else setAccessStatus(data);
      })
      .catch(() => router.push("/gnm-test-series"));
  }, [isLoggedIn, router]);

  const handleAttempt = (test) => {
    router.push(`/test/${TEST_SERIES_ID}/${test.id}`);
  };

  if (!accessStatus) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", background: "#f8f7f4",
        flexDirection: "column", gap: 14
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          border: "3px solid #e8e4de",
          borderTop: "3px solid #2563eb",
          animation: "gnmt-spin 0.9s linear infinite"
        }} />
        <style dangerouslySetInnerHTML={{ __html: `@keyframes gnmt-spin { to { transform: rotate(360deg); } }` }} />
        <p style={{ color: "#9ca3af", fontSize: 13, fontWeight: 600 }}>Verifying access…</p>
      </div>
    );
  }

  return (
    <div className="gnmt-root">
      {/* Inline <style> via dangerouslySetInnerHTML so React never HTML-escapes the CSS (keeps "&" in the font URL and ">" combinators) and hydration stays clean. */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --ivory:        #faf9f6;
          --warm-white:   #f5f3ef;
          --border:       #e8e3db;
          --border-light: #f0ece4;
          --text-1:       #1a1714;
          --text-2:       #6b6560;
          --text-3:       #a09c96;
          --blue:         #2563eb;
          --blue-bg:      #eff6ff;
          --blue-bd:      #dbeafe;
          --blue-dark:    #1d4ed8;
          --green:        #16a34a;
          --green-bg:     #f0fdf4;
          --green-bd:     #bbf7d0;
          --green-dark:   #15803d;
          --amber-bg:     #fffbeb;
          --amber-bd:     #fde68a;
          --amber-text:   #92400e;
          --amber-strong: #b45309;
          --red:          #dc2626;
          --red-bg:       #fef2f2;
          --red-bd:       #fecaca;
          --purple:       #7c3aed;
          --purple-bg:    #f5f3ff;
          --purple-bd:    #ddd6fe;
          --indigo:       #4f46e5;
          --sh-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
          --sh-md: 0 4px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04);
        }

        .gnmt-root {
          font-family: 'DM Sans', system-ui, sans-serif;
          background: var(--ivory);
          color: var(--text-1);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ═══════════════════════════════════
           HERO  — gradient top band
        ═══════════════════════════════════ */
        .gnmt-hero {
          background: linear-gradient(160deg, #1e1b4b 0%, #312e81 55%, #1d4ed8 100%);
          padding: 24px 20px 26px;
          position: relative;
          overflow: hidden;
        }

        .gnmt-hero::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 220px; height: 220px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          pointer-events: none;
        }
        .gnmt-hero::after {
          content: '';
          position: absolute;
          bottom: -40px; left: -30px;
          width: 160px; height: 160px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
          pointer-events: none;
        }

        .gnmt-hero-inner {
          max-width: 780px;
          margin: 0 auto;
          position: relative; z-index: 1;
        }

        .gnmt-close {
          position: absolute;
          top: 0; right: 0;
          width: 30px; height: 30px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.85);
          font-size: 14px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.18s;
          flex-shrink: 0;
        }
        .gnmt-close:hover { background: rgba(255,255,255,0.22); }

        .gnmt-eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.14);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 999px;
          padding: 4px 11px;
          font-size: 10.5px; font-weight: 700;
          color: #a5f3fc;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 11px;
        }
        .gnmt-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #34d399;
          animation: gnmt-pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes gnmt-pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.3; transform:scale(.65); }
        }

        .gnmt-headline {
          font-family: 'Fraunces', Georgia, serif;
          font-size: clamp(1.45rem, 6vw, 2.1rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.18;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
          padding-right: 38px;
          margin-top: 50px;
        }
        .gnmt-headline em { font-style: italic; color: #fbbf24; }

        .gnmt-subline {
          font-size: 13px;
          color: rgba(255,255,255,0.72);
          font-weight: 400;
          line-height: 1.55;
          margin-bottom: 16px;
        }

        .gnmt-chips {
          display: flex; gap: 6px; flex-wrap: wrap;
          margin-bottom: 18px;
        }
        .gnmt-chip {
          display: flex; align-items: center; gap: 4px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 7px;
          padding: 5px 10px;
          font-size: 12px; font-weight: 600;
          color: rgba(255,255,255,0.85);
          white-space: nowrap;
        }
        .gnmt-chip b {
          color: #fff;
          font-size: 12.5px; font-weight: 800;
        }

        .gnmt-pro-tip {
          display: flex; align-items: flex-start; gap: 10px;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 11px;
          padding: 11px 13px;
        }
        .gnmt-pro-tip-icon {
          width: 32px; height: 32px; flex-shrink: 0;
          background: rgba(251,191,36,0.18);
          border: 1px solid rgba(251,191,36,0.35);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 15px;
        }
        .gnmt-pro-tip-title {
          display: block;
          font-size: 12px; font-weight: 800;
          color: #fde68a;
          letter-spacing: 0.02em;
          margin-bottom: 3px;
        }
        .gnmt-pro-tip-body {
          font-size: 11.5px; color: rgba(255,255,255,0.78);
          font-weight: 500; line-height: 1.55;
        }

        /* ═══════════════════════════════════
           BODY
        ═══════════════════════════════════ */
        .gnmt-body {
          background: var(--ivory);
          padding: 18px 20px 60px;
          max-width: 780px;
          margin: 0 auto;
        }

        .gnmt-sec-row {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-bottom: 11px;
        }
        .gnmt-sec-label {
          font-size: 14px; font-weight: 700;
          color: var(--text-1);
          display: flex; align-items: center; gap: 8px;
        }
        .gnmt-sec-label::before {
          content: '';
          display: inline-block;
          width: 3px; height: 15px;
          background: var(--blue);
          border-radius: 2px;
        }
        .gnmt-sec-pill {
          font-size: 11.5px; font-weight: 700;
          color: var(--blue);
          background: var(--blue-bg);
          border: 1px solid var(--blue-bd);
          border-radius: 999px;
          padding: 2px 10px;
        }

        /* ═══════════════════════════════════
           TEST CARD
        ═══════════════════════════════════ */
        .gnmt-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 8px;
          box-shadow: var(--sh-sm);
          transition: border-color 0.18s, box-shadow 0.18s, transform 0.18s;
          animation: gnmt-up 0.32s ease both;
        }
        .gnmt-card:hover {
          border-color: var(--blue-bd);
          box-shadow: var(--sh-md);
          transform: translateY(-2px);
        }
        @keyframes gnmt-up {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .gnmt-card-top {
          display: flex; align-items: center;
          gap: 12px;
          padding: 13px 14px 0;
        }

        .gnmt-num {
          width: 38px; height: 38px; flex-shrink: 0;
          border-radius: 8px;
          background: linear-gradient(135deg, #eff6ff, #dbeafe);
          border: 1px solid var(--blue-bd);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Fraunces', serif;
          font-size: 13.5px; font-weight: 700;
          color: var(--blue);
        }

        .gnmt-info { flex: 1; min-width: 0; }

        .gnmt-name {
          font-size: 13px; font-weight: 700;
          color: var(--text-1);
          display: flex; align-items: center;
          gap: 5px; flex-wrap: wrap;
          white-space: normal;
          line-height: 1.3;
        }

        .gnmt-desc {
          font-size: 11px; color: var(--text-3);
          font-weight: 500; margin-top: 3px;
        }

        .gnmt-tag {
          font-size: 9px; font-weight: 700;
          border-radius: 4px; padding: 2px 6px;
          text-transform: uppercase; letter-spacing: 0.04em;
          white-space: nowrap; flex-shrink: 0;
          display: inline-block;
        }
        .gnmt-tag-start  { background:var(--blue-bg);   border:1px solid var(--blue-bd);   color:var(--blue); }
        .gnmt-tag-grand  { background:var(--purple-bg); border:1px solid var(--purple-bd); color:var(--purple); }
        .gnmt-tag-final  { background:var(--red-bg);    border:1px solid var(--red-bd);    color:var(--red); }

        .gnmt-divider {
          height: 1px;
          background: var(--border-light);
          margin: 10px 14px 0;
        }

        /* ── Subject pills ── */
        .gnmt-subjects {
          display: flex; gap: 4px; flex-wrap: wrap;
          padding:  0 14px 5px;
        }
        .gnmt-subj {
          font-size: 10px; font-weight: 700;
          border-radius: 4px; padding: 2px 7px;
          letter-spacing: 0.03em;
          white-space: nowrap;
        }
        .gnmt-subj-phy { background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; }
        .gnmt-subj-che { background: #f0fdf4; border: 1px solid #bbf7d0; color: #15803d; }
        .gnmt-subj-bio { background: #fff7ed; border: 1px solid #fed7aa; color: #c2410c; }
        .gnmt-subj-mat { background: #fdf4ff; border: 1px solid #e9d5ff; color: #7e22ce; }
        .gnmt-subj-eng { background: #fdf2f8; border: 1px solid #fbcfe8; color: #be185d; }

        .gnmt-card-foot {
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 8px 14px 12px;
          gap: 8px;
        }

        .gnmt-metas {
          display: flex; gap: 10px; flex-wrap: wrap; min-width: 0;
        }
        .gnmt-meta {
          font-size: 11px; font-weight: 500;
          color: var(--text-3);
          white-space: nowrap;
        }
        .gnmt-meta-green { color: var(--green); font-weight: 600; }

        .gnmt-btn {
          display: inline-flex; align-items: center; gap: 4px;
          background: var(--blue);
          color: #fff; border: none;
          border-radius: 7px;
          padding: 7px 13px;
          font-size: 12px; font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          white-space: nowrap; flex-shrink: 0;
          transition: background 0.18s, transform 0.15s, box-shadow 0.18s;
          box-shadow: 0 2px 8px rgba(37,99,235,0.22);
        }
        .gnmt-btn:hover  { background: var(--blue-dark); box-shadow: 0 4px 12px rgba(37,99,235,0.3); transform: translateY(-1px); }
        .gnmt-btn:active { transform: scale(0.97); }

        /* ═══════════════════════════════════
           RESPONSIVE ≤ 480px
        ═══════════════════════════════════ */
        @media (max-width: 480px) {
          .gnmt-hero  { padding: 20px 16px 22px; }
          .gnmt-body  { padding: 14px 14px 52px; }
        }

        /* ═══════════════════════════════════
           RESPONSIVE ≤ 360px  (covers 340px)
        ═══════════════════════════════════ */
        @media (max-width: 360px) {
          .gnmt-hero           { padding: 14px 12px 18px; }
          .gnmt-close          { width: 26px; height: 26px; font-size: 12px; }
          .gnmt-eyebrow        { font-size: 9px; padding: 3px 8px; margin-bottom: 8px; gap: 5px; }
          .gnmt-dot            { width: 5px; height: 5px; }
          .gnmt-headline       { font-size: 1.22rem; padding-right: 32px; margin-bottom: 5px; margin-top: 60px; }
          .gnmt-subline        { font-size: 11.5px; margin-bottom: 12px; }
          .gnmt-chips          { gap: 4px; margin-bottom: 12px; }
          .gnmt-chip           { padding: 4px 7px; font-size: 10.5px; gap: 3px; }
          .gnmt-chip b         { font-size: 10.5px; }
          .gnmt-pro-tip        { padding: 9px 10px; gap: 8px; border-radius: 9px; }
          .gnmt-pro-tip-icon   { width: 28px; height: 28px; font-size: 13px; border-radius: 7px; }
          .gnmt-pro-tip-title  { font-size: 11px; margin-bottom: 2px; }
          .gnmt-pro-tip-body   { font-size: 10.5px; }

          .gnmt-body           { padding: 12px 10px 48px; }
          .gnmt-sec-row        { margin-bottom: 9px; }
          .gnmt-sec-label      { font-size: 13px; }
          .gnmt-sec-label::before { height: 13px; }
          .gnmt-sec-pill       { font-size: 10px; padding: 2px 8px; }

          .gnmt-card           { border-radius: 10px; margin-bottom: 7px; }
          .gnmt-card-top       { gap: 9px; padding: 11px 11px 0; }
          .gnmt-num            { width: 32px; height: 32px; font-size: 12px; border-radius: 7px; }
          .gnmt-name           { font-size: 11px; gap: 4px; }
          .gnmt-desc           { font-size: 10px; margin-top: 2px; }
          .gnmt-tag            { font-size: 8px; padding: 1px 5px; }
          .gnmt-divider        { margin: 8px 11px 0; }
          .gnmt-subjects       { padding: 0 11px 5px; gap: 3px; }
          .gnmt-subj           { font-size: 9px; padding: 2px 6px; }
          .gnmt-card-foot      { padding: 7px 11px 10px; gap: 6px; }
          .gnmt-metas          { gap: 7px; }
          .gnmt-meta           { font-size: 10px; }
          .gnmt-btn            { padding: 6px 10px; font-size: 11px; border-radius: 6px; }
        }
      ` }} />

      {/* ══ HERO ══ */}
      <div className="gnmt-hero">
        <div className="gnmt-hero-inner">
          <h1 className="gnmt-headline">
            Jharkhand GNM <em>2026</em><br />Test Series
          </h1>
          <p className="gnmt-subline">
            10 full-length tests · Official JCECEB pattern · Physics, Chemistry, Biology, Maths &amp; English
          </p>

          <div className="gnmt-chips">
            <div className="gnmt-chip"><span>📋</span><b>10</b>&nbsp;Full-Length Tests</div>
            <div className="gnmt-chip"><span>❓</span><b>150</b>&nbsp;Qs / Test</div>
            <div className="gnmt-chip"><span>⏱</span><b>2.5h</b>&nbsp;Duration</div>
            <div className="gnmt-chip"><span>📝</span>Correct&nbsp;<b>+1</b>&nbsp;·&nbsp;Wrong&nbsp;<b style={{color:"#dc2626"}}>−0.25</b></div>
          </div>

          <div className="gnmt-pro-tip">
            <div className="gnmt-pro-tip-icon">💡</div>
            <div>
              <span className="gnmt-pro-tip-title">Pro Tip</span>
              <span className="gnmt-pro-tip-body">
                Attempt tests in order for the best preparation experience.
                Each test covers the full GNM 2026 syllabus —
                Physics, Chemistry, Biology, Maths &amp; English.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ══ BODY ══ */}
      <div className="gnmt-body">
        <div className="gnmt-sec-row">
          <span className="gnmt-sec-label">All Tests</span>
          <span className="gnmt-sec-pill">10 Papers</span>
        </div>

        {tests.map((t, i) => {
          const tagCls =
            t.tag === "Final"      ? "gnmt-tag-final"  :
            t.tag === "Grand Test" ? "gnmt-tag-grand"  :
            t.tag === "Start Here" ? "gnmt-tag-start"  : "";

          return (
            <div
              key={t.id}
              className="gnmt-card"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className="gnmt-card-top">
                <div className="gnmt-num">{String(t.id).padStart(2, "0")}</div>
                <div className="gnmt-info">
                  <div className="gnmt-name">
                    Jharkhand GNM 2026 – {t.name}
                    {t.tag && <span className={`gnmt-tag ${tagCls}`}>{t.tag}</span>}
                  </div>
                  <div className="gnmt-desc">{t.desc}</div>
                </div>
              </div>

              <div className="gnmt-divider" />

              <div className="gnmt-subjects">
                <span className="gnmt-subj gnmt-subj-phy">⚛ Physics</span>
                <span className="gnmt-subj gnmt-subj-che">🧪 Chemistry</span>
                <span className="gnmt-subj gnmt-subj-bio">🧬 Biology</span>
                <span className="gnmt-subj gnmt-subj-mat">📐 Maths</span>
                <span className="gnmt-subj gnmt-subj-eng">📖 English</span>
              </div>

              <div className="gnmt-card-foot">
                <div className="gnmt-metas">
                  <span className="gnmt-meta">❓ 150 Qs</span>
                  <span className="gnmt-meta">⏱ 2.5 hrs</span>
                  <span className="gnmt-meta gnmt-meta-green">● Live</span>
                </div>
                <button className="gnmt-btn" onClick={() => handleAttempt(t)}>
                  Attempt →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
