"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { authFetch } from "@/utils/api";

const TEST_SERIES_ID = "D2D-TS";

const tests = [
  { id: 1,  name: "Test 1",  desc: "Full Syllabus · JCECEB Pattern",       tag: "Start Here" },
  { id: 2,  name: "Test 2",  desc: "Full Syllabus · JCECEB Pattern",       tag: null },
  { id: 3,  name: "Test 3",  desc: "Full Syllabus · JCECEB Pattern",       tag: null },
  { id: 4,  name: "Test 4",  desc: "Full Syllabus · JCECEB Pattern",       tag: null },
  { id: 5,  name: "Test 5",  desc: "Full Syllabus · JCECEB Pattern",       tag: null },
  { id: 6,  name: "Test 6",  desc: "Full Syllabus · JCECEB Pattern",       tag: null },
  { id: 7,  name: "Test 7",  desc: "Full Syllabus · JCECEB Pattern",       tag: null },
  { id: 8,  name: "Test 8",  desc: "Full Syllabus · JCECEB Pattern",       tag: null },
  { id: 9,  name: "Test 9",  desc: "Full Syllabus · JCECEB Pattern",       tag: "Grand Test" },
  { id: 10, name: "Test 10", desc: "Full Syllabus · Final Grand Test",     tag: "Final" },
];

export default function JharkhandD2DTestsClient() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/d2d-test-series");
      return;
    }
    authFetch(`/purchase/check?testSeriesId=${TEST_SERIES_ID}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to verify access");
        return res.json();
      })
      .then((data) => {
        if (data.access) {
          setHasAccess(true);
        } else {
          router.push("/d2d-test-series");
        }
      })
      .catch(() => router.push("/d2d-test-series"))
      .finally(() => setLoading(false));
  }, [isLoggedIn, router]);

  const handleAttempt = (test) => {
    router.push(`/test/${TEST_SERIES_ID}/${test.id}`);
  };

  if (loading) {
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
          animation: "jd2d-spin 0.9s linear infinite"
        }} />
        <style dangerouslySetInnerHTML={{ __html: `@keyframes jd2d-spin { to { transform: rotate(360deg); } }` }} />
        <p style={{ color: "#9ca3af", fontSize: 13, fontWeight: 600 }}>Verifying access…</p>
      </div>
    );
  }

  if (!hasAccess) return null;

  return (
    <div className="jd2d-root">
      {/* Inline <style> via dangerouslySetInnerHTML so React never HTML-escapes the CSS (keeps "&" in the font URL and ">" combinators) and hydration stays clean. */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');

        .jd2d-root,
        .jd2d-root *,
        .jd2d-root *::before,
        .jd2d-root *::after {
          box-sizing: border-box;
        }

        .jd2d-root {
          margin: 0;
          padding: 0;
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
          --purple:       #7c3aed;
          --purple-bg:    #f5f3ff;
          --purple-bd:    #ddd6fe;
          --red:          #dc2626;
          --red-bg:       #fef2f2;
          --red-bd:       #fecaca;
          --sh-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
          --sh-md: 0 4px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04);
          font-family: 'DM Sans', system-ui, sans-serif;
          background: var(--ivory);
          color: var(--text-1);
          min-height: 100vh;
          overflow-x: hidden;
        }

        .jd2d-hero {
          background: linear-gradient(160deg, #1e1b4b 0%, #312e81 55%, #1d4ed8 100%);
          padding: 24px 20px 26px;
          position: relative;
          overflow: hidden;
        }
        .jd2d-hero::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 220px; height: 220px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          pointer-events: none;
        }
        .jd2d-hero::after {
          content: '';
          position: absolute;
          bottom: -40px; left: -30px;
          width: 160px; height: 160px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
          pointer-events: none;
        }

        .jd2d-hero-inner {
          max-width: 780px;
          margin: 0 auto;
          position: relative; z-index: 1;
        }

        .jd2d-eyebrow {
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
        .jd2d-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #34d399;
          animation: jd2d-pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes jd2d-pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.3; transform:scale(.65); }
        }

        .jd2d-headline {
          font-family: 'Fraunces', Georgia, serif;
          font-size: clamp(1.45rem, 6vw, 2.1rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.18;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
          padding-right: 38px;
        }
        .jd2d-headline em { font-style: italic; color: #fbbf24; }

        .jd2d-subline {
          font-size: 13px;
          color: rgba(255,255,255,0.72);
          font-weight: 400;
          line-height: 1.55;
          margin-bottom: 16px;
        }

        .jd2d-chips {
          display: flex; gap: 6px; flex-wrap: wrap;
          margin-bottom: 18px;
        }
        .jd2d-chip {
          display: flex; align-items: center; gap: 4px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 7px;
          padding: 5px 10px;
          font-size: 12px; font-weight: 600;
          color: rgba(255,255,255,0.85);
          white-space: nowrap;
        }
        .jd2d-chip b {
          color: #fff;
          font-size: 12.5px; font-weight: 800;
        }

        .jd2d-pro-tip {
          display: flex; align-items: flex-start; gap: 10px;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 11px;
          padding: 11px 13px;
        }
        .jd2d-pro-tip-icon {
          width: 32px; height: 32px; flex-shrink: 0;
          background: rgba(251,191,36,0.18);
          border: 1px solid rgba(251,191,36,0.35);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 15px;
        }
        .jd2d-pro-tip-title {
          display: block;
          font-size: 12px; font-weight: 800;
          color: #fde68a;
          letter-spacing: 0.02em;
          margin-bottom: 3px;
        }
        .jd2d-pro-tip-body {
          font-size: 11.5px; color: rgba(255,255,255,0.78);
          font-weight: 500; line-height: 1.55;
        }

        .jd2d-body {
          background: var(--ivory);
          padding: 18px 20px 60px;
          max-width: 780px;
          margin: 0 auto;
        }

        .jd2d-sec-row {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-bottom: 11px;
        }
        .jd2d-sec-label {
          font-size: 14px; font-weight: 700;
          color: var(--text-1);
          display: flex; align-items: center; gap: 8px;
        }
        .jd2d-sec-label::before {
          content: '';
          display: inline-block;
          width: 3px; height: 15px;
          background: var(--blue);
          border-radius: 2px;
        }
        .jd2d-sec-pill {
          font-size: 11.5px; font-weight: 700;
          color: var(--blue);
          background: var(--blue-bg);
          border: 1px solid var(--blue-bd);
          border-radius: 999px;
          padding: 2px 10px;
        }

        .jd2d-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 8px;
          box-shadow: var(--sh-sm);
          transition: border-color 0.18s, box-shadow 0.18s, transform 0.18s;
          animation: jd2d-up 0.32s ease both;
        }
        .jd2d-card:hover {
          border-color: var(--blue-bd);
          box-shadow: var(--sh-md);
          transform: translateY(-2px);
        }
        @keyframes jd2d-up {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .jd2d-card-top {
          display: flex; align-items: center;
          gap: 12px;
          padding: 13px 14px 0;
        }

        .jd2d-num {
          width: 38px; height: 38px; flex-shrink: 0;
          border-radius: 8px;
          background: linear-gradient(135deg, #eff6ff, #dbeafe);
          border: 1px solid var(--blue-bd);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Fraunces', serif;
          font-size: 13.5px; font-weight: 700;
          color: var(--blue);
        }

        .jd2d-info { flex: 1; min-width: 0; }

        .jd2d-name {
          font-size: 13px; font-weight: 700;
          color: var(--text-1);
          display: flex; align-items: center;
          gap: 5px; flex-wrap: wrap;
          line-height: 1.3;
        }

        .jd2d-desc {
          font-size: 11px; color: var(--text-3);
          font-weight: 500; margin-top: 3px;
        }

        .jd2d-tag {
          font-size: 9px; font-weight: 700;
          border-radius: 4px; padding: 2px 6px;
          text-transform: uppercase; letter-spacing: 0.04em;
          white-space: nowrap; flex-shrink: 0;
          display: inline-block;
        }
        .jd2d-tag-start  { background:var(--blue-bg);   border:1px solid var(--blue-bd);   color:var(--blue); }
        .jd2d-tag-grand  { background:var(--purple-bg); border:1px solid var(--purple-bd); color:var(--purple); }
        .jd2d-tag-final  { background:var(--red-bg);    border:1px solid var(--red-bd);    color:var(--red); }

        .jd2d-divider {
          height: 1px;
          background: var(--border-light);
          margin: 10px 14px 0;
        }

        .jd2d-card-foot {
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 8px 14px 12px;
          gap: 8px;
        }

        .jd2d-metas {
          display: flex; gap: 10px; flex-wrap: wrap; min-width: 0;
        }
        .jd2d-meta {
          font-size: 11px; font-weight: 500;
          color: var(--text-3);
          white-space: nowrap;
        }
        .jd2d-meta-green { color: var(--green); font-weight: 600; }

        .jd2d-subjects {
          display: flex; gap: 4px; flex-wrap: wrap;
          padding: 0 14px 5px;
        }
        .jd2d-subj {
          font-size: 10px; font-weight: 700;
          border-radius: 4px; padding: 2px 7px;
          letter-spacing: 0.03em;
          white-space: nowrap;
        }
        .jd2d-subj-phy { background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; }
        .jd2d-subj-che { background: #f0fdf4; border: 1px solid #bbf7d0; color: #15803d; }
        .jd2d-subj-mat { background: #fdf4ff; border: 1px solid #e9d5ff; color: #7e22ce; }

        .jd2d-btn {
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
        .jd2d-btn:hover  { background: var(--blue-dark); box-shadow: 0 4px 12px rgba(37,99,235,0.3); transform: translateY(-1px); }
        .jd2d-btn:active { transform: scale(0.97); }

        @media (max-width: 480px) {
          .jd2d-hero      { padding: 20px 16px 22px; }
          .jd2d-body      { padding: 14px 14px 52px; }
        }

        @media (max-width: 360px) {
          .jd2d-hero           { padding: 14px 12px 18px; }
          .jd2d-eyebrow        { font-size: 9px; padding: 3px 8px; margin-bottom: 8px; gap: 5px; }
          .jd2d-dot            { width: 5px; height: 5px; }
          .jd2d-headline       { font-size: 1.22rem; padding-right: 32px; margin-bottom: 5px; }
          .jd2d-subline        { font-size: 11.5px; margin-bottom: 12px; }
          .jd2d-chips          { gap: 4px; margin-bottom: 12px; }
          .jd2d-chip           { padding: 4px 7px; font-size: 10.5px; gap: 3px; }
          .jd2d-chip b         { font-size: 10.5px; }
          .jd2d-pro-tip        { padding: 9px 10px; gap: 8px; border-radius: 9px; }
          .jd2d-pro-tip-icon   { width: 28px; height: 28px; font-size: 13px; border-radius: 7px; }
          .jd2d-pro-tip-title  { font-size: 11px; margin-bottom: 2px; }
          .jd2d-pro-tip-body   { font-size: 10.5px; }
          .jd2d-body           { padding: 12px 10px 48px; }
          .jd2d-sec-row        { margin-bottom: 9px; }
          .jd2d-sec-label      { font-size: 13px; }
          .jd2d-sec-label::before { height: 13px; }
          .jd2d-sec-pill       { font-size: 10px; padding: 2px 8px; }
          .jd2d-card           { border-radius: 10px; margin-bottom: 7px; }
          .jd2d-card-top       { gap: 9px; padding: 11px 11px 0; }
          .jd2d-num            { width: 32px; height: 32px; font-size: 12px; border-radius: 7px; }
          .jd2d-name           { font-size: 11px; gap: 4px; }
          .jd2d-desc           { font-size: 10px; margin-top: 2px; }
          .jd2d-tag            { font-size: 8px; padding: 1px 5px; }
          .jd2d-divider        { margin: 8px 11px 0; }
          .jd2d-card-foot      { padding: 7px 11px 10px; gap: 6px; }
          .jd2d-metas          { gap: 7px; }
          .jd2d-meta           { font-size: 10px; }
          .jd2d-btn            { padding: 6px 10px; font-size: 11px; border-radius: 6px; }
          .jd2d-subjects       { padding: 0 11px 5px; gap: 3px; }
          .jd2d-subj           { font-size: 9px; padding: 2px 6px; }
        }
      ` }} />

      <div className="jd2d-hero">
        <div className="jd2d-hero-inner">
          <div className="jd2d-eyebrow">
            <span className="jd2d-dot" />
            Unlocked · Full Access
          </div>

          <h1 className="jd2d-headline">
            Jharkhand D2D <em>2026</em><br />Test Series
          </h1>
          <p className="jd2d-subline">
            10 full-length tests · Official JCECEB pattern · Physics, Chemistry &amp; Mathematics
          </p>

          <div className="jd2d-chips">
            <div className="jd2d-chip"><span>📋</span><b>10</b>&nbsp;Full-Length Tests</div>
            <div className="jd2d-chip"><span>❓</span><b>150</b>&nbsp;Qs / Test</div>
            <div className="jd2d-chip"><span>⏱</span><b>2.5h</b>&nbsp;Duration</div>
            <div className="jd2d-chip"><span>📝</span>Correct&nbsp;<b>+1</b>&nbsp;·&nbsp;Wrong&nbsp;<b style={{color:"#dc2626"}}>−0.25</b></div>
          </div>

          <div className="jd2d-pro-tip">
            <div className="jd2d-pro-tip-icon">💡</div>
            <div>
              <span className="jd2d-pro-tip-title">Pro Tip</span>
              <span className="jd2d-pro-tip-body">
                Attempt tests in order for the best preparation experience.
                Each test covers the full Jharkhand D2D 2026 syllabus —
                Physics, Chemistry &amp; Maths.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="jd2d-body">
        <div className="jd2d-sec-row">
          <span className="jd2d-sec-label">All Tests</span>
          <span className="jd2d-sec-pill">10 Papers</span>
        </div>

        {tests.map((t, i) => {
          const tagCls =
            t.tag === "Final"      ? "jd2d-tag-final"  :
            t.tag === "Grand Test" ? "jd2d-tag-grand"  :
            t.tag === "Start Here" ? "jd2d-tag-start"  : "";

          return (
            <div
              key={t.id}
              className="jd2d-card"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className="jd2d-card-top">
                <div className="jd2d-num">{String(t.id).padStart(2, "0")}</div>
                <div className="jd2d-info">
                  <div className="jd2d-name">
                    Jharkhand D2D 2026 – {t.name}
                    {t.tag && <span className={`jd2d-tag ${tagCls}`}>{t.tag}</span>}
                  </div>
                  <div className="jd2d-desc">{t.desc}</div>
                </div>
              </div>

              <div className="jd2d-divider" />

              <div className="jd2d-subjects">
                <span className="jd2d-subj jd2d-subj-phy">⚛ Physics</span>
                <span className="jd2d-subj jd2d-subj-che">🧪 Chemistry</span>
                <span className="jd2d-subj jd2d-subj-mat">📐 Maths</span>
              </div>

              <div className="jd2d-card-foot">
                <div className="jd2d-metas">
                  <span className="jd2d-meta">❓ 150 Qs</span>
                  <span className="jd2d-meta">⏱ 2.5 hrs</span>
                  <span className="jd2d-meta jd2d-meta-green">● Live</span>
                </div>
                <button className="jd2d-btn" onClick={() => handleAttempt(t)}>
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