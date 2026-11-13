"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { authFetch } from "@/utils/api";

const TEST_SERIES_ID = "JHPLE-TS";

const tests = [
  { id: 1,  name: "Test 1",  desc: "Full Syllabus · JCECEB Lateral Entry Pattern", tag: "Start Here" },
  { id: 2,  name: "Test 2",  desc: "Full Syllabus · JCECEB Lateral Entry Pattern", tag: null },
  { id: 3,  name: "Test 3",  desc: "Full Syllabus · JCECEB Lateral Entry Pattern", tag: null },
  { id: 4,  name: "Test 4",  desc: "Full Syllabus · JCECEB Lateral Entry Pattern", tag: null },
  { id: 5,  name: "Test 5",  desc: "Full Syllabus · JCECEB Lateral Entry Pattern", tag: null },
  { id: 6,  name: "Test 6",  desc: "Full Syllabus · JCECEB Lateral Entry Pattern", tag: null },
  { id: 7,  name: "Test 7",  desc: "Full Syllabus · JCECEB Lateral Entry Pattern", tag: null },
  { id: 8,  name: "Test 8",  desc: "Full Syllabus · JCECEB Lateral Entry Pattern", tag: null },
  { id: 9,  name: "Test 9",  desc: "Full Syllabus · JCECEB Lateral Entry Pattern", tag: "Grand Test" },
  { id: 10, name: "Test 10", desc: "Full Syllabus · Final Grand Test",              tag: "Final" },
];

export default function JharkhandPolyLateralTestsClient() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/exam-preparation");
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
          router.push("/test-series-lateral");
        }
      })
      .catch(() => router.push("/test-series-lateral"))
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
          animation: "jhple-spin 0.9s linear infinite"
        }} />
        <style dangerouslySetInnerHTML={{ __html: `@keyframes jhple-spin { to { transform: rotate(360deg); } }` }} />
        <p style={{ color: "#9ca3af", fontSize: 13, fontWeight: 600 }}>Verifying access…</p>
      </div>
    );
  }

  if (!hasAccess) return null;

  return (
    <div className="jhple-root">
      {/* Inline <style> via dangerouslySetInnerHTML so React never HTML-escapes the CSS (keeps "&" in the font URL and ">" combinators) and hydration stays clean. */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');

        .jhple-root,
        .jhple-root *,
        .jhple-root *::before,
        .jhple-root *::after {
          box-sizing: border-box;
        }

        .jhple-root {
          margin: 0;
          padding: 0;
          --ivory:        #faf9f6;
          --warm-white:   #f5f3ef;
          --border:       #e8e3db;
          --border-light: #f0ece4;
          --text-1:       #1a1714;
          --text-2:       #6b6560;
          --text-3:       #a09c96;
          --green:        #16a34a;
          --green-bg:     #f0fdf4;
          --green-bd:     #bbf7d0;
          --green-dark:   #15803d;
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

        .jhple-hero {
          background: linear-gradient(160deg, #064e3b 0%, #065f46 50%, #047857 100%);
          padding: 24px 20px 26px;
          position: relative;
          overflow: hidden;
        }
        .jhple-hero::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 220px; height: 220px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          pointer-events: none;
        }
        .jhple-hero::after {
          content: '';
          position: absolute;
          bottom: -40px; left: -30px;
          width: 160px; height: 160px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
          pointer-events: none;
        }

        .jhple-hero-inner {
          max-width: 780px;
          margin: 0 auto;
          position: relative; z-index: 1;
        }

        .jhple-eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.14);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 999px;
          padding: 4px 11px;
          font-size: 10.5px; font-weight: 700;
          color: #a7f3d0;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 11px;
        }
        .jhple-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #34d399;
          animation: jhple-pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes jhple-pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.3; transform:scale(.65); }
        }

        .jhple-headline {
          font-family: 'Fraunces', Georgia, serif;
          font-size: clamp(1.45rem, 6vw, 2.1rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.18;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
          padding-right: 38px;
        }
        .jhple-headline em { font-style: italic; color: #fbbf24; }

        .jhple-subline {
          font-size: 13px;
          color: rgba(255,255,255,0.72);
          font-weight: 400;
          line-height: 1.55;
          margin-bottom: 16px;
        }

        .jhple-chips {
          display: flex; gap: 6px; flex-wrap: wrap;
          margin-bottom: 18px;
        }
        .jhple-chip {
          display: flex; align-items: center; gap: 4px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 7px;
          padding: 5px 10px;
          font-size: 12px; font-weight: 600;
          color: rgba(255,255,255,0.85);
          white-space: nowrap;
        }
        .jhple-chip b {
          color: #fff;
          font-size: 12.5px; font-weight: 800;
        }

        .jhple-subj-strip {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 14px;
        }
        .jhple-subj-strip-card {
          border-radius: 10px;
          padding: 10px 12px;
          display: flex; align-items: center; gap: 9px;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.10);
        }
        .jhple-subj-strip-icon { font-size: 18px; line-height: 1; }
        .jhple-subj-strip-name {
          font-size: 12px; font-weight: 800; color: #fff; display: block; line-height: 1.2;
        }
        .jhple-subj-strip-count {
          font-size: 10.5px; color: rgba(255,255,255,0.70); font-weight: 500;
        }

        .jhple-pro-tip {
          display: flex; align-items: flex-start; gap: 10px;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 11px;
          padding: 11px 13px;
        }
        .jhple-pro-tip-icon {
          width: 32px; height: 32px; flex-shrink: 0;
          background: rgba(251,191,36,0.18);
          border: 1px solid rgba(251,191,36,0.35);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 15px;
        }
        .jhple-pro-tip-title {
          display: block;
          font-size: 12px; font-weight: 800;
          color: #fde68a;
          letter-spacing: 0.02em;
          margin-bottom: 3px;
        }
        .jhple-pro-tip-body {
          font-size: 11.5px; color: rgba(255,255,255,0.78);
          font-weight: 500; line-height: 1.55;
        }

        .jhple-body {
          background: var(--ivory);
          padding: 18px 20px 60px;
          max-width: 780px;
          margin: 0 auto;
        }

        .jhple-sec-row {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-bottom: 11px;
        }
        .jhple-sec-label {
          font-size: 14px; font-weight: 700;
          color: var(--text-1);
          display: flex; align-items: center; gap: 8px;
        }
        .jhple-sec-label::before {
          content: '';
          display: inline-block;
          width: 3px; height: 15px;
          background: var(--green);
          border-radius: 2px;
        }
        .jhple-sec-pill {
          font-size: 11.5px; font-weight: 700;
          color: var(--green);
          background: var(--green-bg);
          border: 1px solid var(--green-bd);
          border-radius: 999px;
          padding: 2px 10px;
        }

        .jhple-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 8px;
          box-shadow: var(--sh-sm);
          transition: border-color 0.18s, box-shadow 0.18s, transform 0.18s;
          animation: jhple-up 0.32s ease both;
        }
        .jhple-card:hover {
          border-color: var(--green-bd);
          box-shadow: var(--sh-md);
          transform: translateY(-2px);
        }
        @keyframes jhple-up {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .jhple-card-top {
          display: flex; align-items: center;
          gap: 12px;
          padding: 13px 14px 0;
        }

        .jhple-num {
          width: 38px; height: 38px; flex-shrink: 0;
          border-radius: 8px;
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
          border: 1px solid var(--green-bd);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Fraunces', serif;
          font-size: 13.5px; font-weight: 700;
          color: var(--green);
        }

        .jhple-info { flex: 1; min-width: 0; }

        .jhple-name {
          font-size: 13px; font-weight: 700;
          color: var(--text-1);
          display: flex; align-items: center;
          gap: 5px; flex-wrap: wrap;
          line-height: 1.3;
        }

        .jhple-desc {
          font-size: 11px; color: var(--text-3);
          font-weight: 500; margin-top: 3px;
        }

        .jhple-tag {
          font-size: 9px; font-weight: 700;
          border-radius: 4px; padding: 2px 6px;
          text-transform: uppercase; letter-spacing: 0.04em;
          white-space: nowrap; flex-shrink: 0;
          display: inline-block;
        }
        .jhple-tag-start  { background:var(--green-bg);  border:1px solid var(--green-bd);  color:var(--green); }
        .jhple-tag-grand  { background:var(--purple-bg); border:1px solid var(--purple-bd); color:var(--purple); }
        .jhple-tag-final  { background:var(--red-bg);    border:1px solid var(--red-bd);    color:var(--red); }

        .jhple-divider {
          height: 1px;
          background: var(--border-light);
          margin: 10px 14px 0;
        }

        .jhple-subjects {
          display: flex; gap: 4px; flex-wrap: wrap;
          padding: 0 14px 5px;
        }
        .jhple-subj {
          font-size: 10px; font-weight: 700;
          border-radius: 4px; padding: 2px 7px;
          letter-spacing: 0.03em;
          white-space: nowrap;
        }
        .jhple-subj-mat { background: #fdf4ff; border: 1px solid #e9d5ff; color: #7e22ce; }
        .jhple-subj-sci { background: #f0fdf4; border: 1px solid #bbf7d0; color: #15803d; }

        .jhple-card-foot {
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 8px 14px 12px;
          gap: 8px;
        }

        .jhple-metas {
          display: flex; gap: 10px; flex-wrap: wrap; min-width: 0;
        }
        .jhple-meta {
          font-size: 11px; font-weight: 500;
          color: var(--text-3);
          white-space: nowrap;
        }
        .jhple-meta-green { color: var(--green); font-weight: 600; }

        .jhple-btn {
          display: inline-flex; align-items: center; gap: 4px;
          background: var(--green);
          color: #fff; border: none;
          border-radius: 7px;
          padding: 7px 13px;
          font-size: 12px; font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          white-space: nowrap; flex-shrink: 0;
          transition: background 0.18s, transform 0.15s, box-shadow 0.18s;
          box-shadow: 0 2px 8px rgba(22,163,74,0.22);
        }
        .jhple-btn:hover  { background: var(--green-dark); box-shadow: 0 4px 12px rgba(22,163,74,0.3); transform: translateY(-1px); }
        .jhple-btn:active { transform: scale(0.97); }

        @media (max-width: 480px) {
          .jhple-hero  { padding: 20px 16px 22px; }
          .jhple-body  { padding: 14px 14px 52px; }
        }

        @media (max-width: 360px) {
          .jhple-hero           { padding: 14px 12px 18px; }
          .jhple-eyebrow        { font-size: 9px; padding: 3px 8px; margin-bottom: 8px; gap: 5px; }
          .jhple-dot            { width: 5px; height: 5px; }
          .jhple-headline       { font-size: 1.22rem; padding-right: 32px; margin-bottom: 5px; }
          .jhple-subline        { font-size: 11.5px; margin-bottom: 12px; }
          .jhple-chips          { gap: 4px; margin-bottom: 10px; }
          .jhple-chip           { padding: 4px 7px; font-size: 10.5px; gap: 3px; }
          .jhple-chip b         { font-size: 10.5px; }
          .jhple-subj-strip     { gap: 6px; margin-bottom: 10px; }
          .jhple-subj-strip-card { padding: 8px 10px; border-radius: 8px; gap: 7px; }
          .jhple-subj-strip-icon { font-size: 15px; }
          .jhple-subj-strip-name { font-size: 11px; }
          .jhple-subj-strip-count { font-size: 9.5px; }
          .jhple-pro-tip        { padding: 9px 10px; gap: 8px; border-radius: 9px; }
          .jhple-pro-tip-icon   { width: 28px; height: 28px; font-size: 13px; border-radius: 7px; }
          .jhple-pro-tip-title  { font-size: 11px; margin-bottom: 2px; }
          .jhple-pro-tip-body   { font-size: 10.5px; }
          .jhple-body           { padding: 12px 10px 48px; }
          .jhple-sec-row        { margin-bottom: 9px; }
          .jhple-sec-label      { font-size: 13px; }
          .jhple-sec-label::before { height: 13px; }
          .jhple-sec-pill       { font-size: 10px; padding: 2px 8px; }
          .jhple-card           { border-radius: 10px; margin-bottom: 7px; }
          .jhple-card-top       { gap: 9px; padding: 11px 11px 0; }
          .jhple-num            { width: 32px; height: 32px; font-size: 12px; border-radius: 7px; }
          .jhple-name           { font-size: 11px; gap: 4px; }
          .jhple-desc           { font-size: 10px; margin-top: 2px; }
          .jhple-tag            { font-size: 8px; padding: 1px 5px; }
          .jhple-divider        { margin: 8px 11px 0; }
          .jhple-subjects       { padding: 0 11px 5px; gap: 3px; }
          .jhple-subj           { font-size: 9px; padding: 2px 6px; }
          .jhple-card-foot      { padding: 7px 11px 10px; gap: 6px; }
          .jhple-metas          { gap: 7px; }
          .jhple-meta           { font-size: 10px; }
          .jhple-btn            { padding: 6px 10px; font-size: 11px; border-radius: 6px; }
        }
      ` }} />

      <div className="jhple-hero">
        <div className="jhple-hero-inner">
          <div className="jhple-eyebrow">
            <span className="jhple-dot" />
            Jharkhand Polytechnic Lateral Entry 2026
          </div>

          <h1 className="jhple-headline">
            Jharkhand Polytechnic Lateral Entry <em>2026</em><br />Test Series
          </h1>
          <p className="jhple-subline">
            10 full-length tests · Official JCECEB Lateral Entry pattern · Mathematics &amp; Science
          </p>

          <div className="jhple-chips">
            <div className="jhple-chip"><span>📋</span><b>10</b>&nbsp;Full-Length Tests</div>
            <div className="jhple-chip"><span>❓</span><b>100</b>&nbsp;Qs / Test</div>
            <div className="jhple-chip"><span>🔢</span><b>1000</b>&nbsp;Total Qs</div>
            <div className="jhple-chip"><span>📝</span>Correct&nbsp;<b>+1</b>&nbsp;·&nbsp;Wrong&nbsp;<b style={{color:"#fca5a5"}}>−0.25</b></div>
          </div>

          <div className="jhple-subj-strip">
            <div className="jhple-subj-strip-card">
              <span className="jhple-subj-strip-icon">📐</span>
              <div>
                <span className="jhple-subj-strip-name">Mathematics</span>
                <span className="jhple-subj-strip-count">50 Qs per test · 500 total</span>
              </div>
            </div>
            <div className="jhple-subj-strip-card">
              <span className="jhple-subj-strip-icon">🔬</span>
              <div>
                <span className="jhple-subj-strip-name">Science</span>
                <span className="jhple-subj-strip-count">50 Qs per test · 500 total</span>
              </div>
            </div>
          </div>

          <div className="jhple-pro-tip">
            <div className="jhple-pro-tip-icon">💡</div>
            <div>
              <span className="jhple-pro-tip-title">Pro Tip</span>
              <span className="jhple-pro-tip-body">
                Attempt tests in order for the best preparation experience.
                Each test covers the full JCECEB Lateral Entry 2026 syllabus —
                Mathematics &amp; Science.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="jhple-body">
        <div className="jhple-sec-row">
          <span className="jhple-sec-label">All Tests</span>
          <span className="jhple-sec-pill">10 Papers</span>
        </div>

        {tests.map((t, i) => {
          const tagCls =
            t.tag === "Final"      ? "jhple-tag-final"  :
            t.tag === "Grand Test" ? "jhple-tag-grand"  :
            t.tag === "Start Here" ? "jhple-tag-start"  : "";

          return (
            <div
              key={t.id}
              className="jhple-card"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className="jhple-card-top">
                <div className="jhple-num">{String(t.id).padStart(2, "0")}</div>
                <div className="jhple-info">
                  <div className="jhple-name">
                    Jharkhand Polytechnic Lateral Entry 2026 – {t.name}
                    {t.tag && <span className={`jhple-tag ${tagCls}`}>{t.tag}</span>}
                  </div>
                  <div className="jhple-desc">{t.desc}</div>
                </div>
              </div>

              <div className="jhple-divider" />

              <div className="jhple-subjects">
                <span className="jhple-subj jhple-subj-mat">📐 Mathematics</span>
                <span className="jhple-subj jhple-subj-sci">🔬 Science</span>
              </div>

              <div className="jhple-card-foot">
                <div className="jhple-metas">
                  <span className="jhple-meta">❓ 100 Qs</span>
                  <span className="jhple-meta">50+50</span>
                  <span className="jhple-meta jhple-meta-green">● Live</span>
                </div>
                <button className="jhple-btn" onClick={() => handleAttempt(t)}>
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