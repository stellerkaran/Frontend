"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Trophy,
  Zap,
  TrendingUp,
  Footprints,
  Activity,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useAuthModal } from "../../context/AuthModalContext";
import { authFetch } from "../../utils/api";
import TrustedByToppers from "../TrustedByToppers";
import Image from "next/image";

// ── BIHAR EXAM CARDS — copied exactly from the /exam-preparation Bihar state group ──
export const BIHAR_EXAM_CARDS = [
  {
    title: "Bihar BCECE LE (Lateral Entry)\nPYQ (2021–2025) For 2027 Exam",
    path: "/exam-preparation/bihar-btech-lateral",
    gradient: "linear-gradient(135deg, #f7971e, #ffd200)",
    textColor: "#000",
  },
  {
    title: "Bihar Polytechnic PYQ\n(2018–2025) For 2027 Exam",
    path: "/exam-preparation/bihar-polytechnic",
    gradient: "linear-gradient(135deg, #f7971e, #ffd200)",
    textColor: "#000",
  },
  {
    title: "Bihar Polytechnic LE PYQ\n(2018–2025) For 2027 Exam",
    path: null,
    gradient: "linear-gradient(135deg, #f7971e, #ffd200)",
    textColor: "#000",
  },
];


export default function ExamPrepClient() {
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();
  const { openLogin } = useAuthModal();

  // Daily goal state
  const [rank, setRank] = useState(null);
  const [solvedToday, setSolvedToday] = useState(0);

  const fetchRank = useCallback(async () => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await authFetch("https://futurely-backend.onrender.com/api/leaderboard/rank");
      if (res && res.rank) setRank(res.rank);
    } catch {
      // ignore
    }
  }, []);

  const fetchDailyProgress = () => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("https://futurely-backend.onrender.com/api/exam/daily-progress", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setSolvedToday(data.solvedToday || 0))
      .catch(() => setSolvedToday(0));
  };

  useEffect(() => {
    if (user) fetchRank();
    fetchDailyProgress();
  }, [user, fetchRank]);

  useEffect(() => {
    const handleProgressUpdate = () => fetchDailyProgress();
    window.addEventListener("progressUpdated", handleProgressUpdate);
    return () => window.removeEventListener("progressUpdated", handleProgressUpdate);
  }, []);

  const dailyGoal = 5;
  const progressPercent = Math.min((solvedToday / dailyGoal) * 100, 100);

  const handleProtectedNavigate = (path) => {
    if (!isLoggedIn) {
      openLogin();
      return;
    }
    router.push(path);
  };

  // Bihar exams: live paper opens the practice page, upcoming ones show a notice
  // (same behavior as the state cards on /exam-preparation).
  const handleExamNavigate = (exam) => {
    if (exam.path) {
      handleProtectedNavigate(exam.path);
    } else {
      alert("Launching Soon!");
    }
  };

  return (
    <div className="exam-preparation-wrapper" id="bihar-exam-prep-arena">
      <style dangerouslySetInnerHTML={{ __html: `
        * { box-sizing: border-box; }

        :root {
          --bg-primary: #f0f2ff;
          --bg-secondary: #e8ebff;
          --accent-1: #2563eb;
          --accent-2: #4f46e5;
          --accent-3: #06b6d4;
          --accent-warm: #f59e0b;
          --accent-rose: #e11d48;
          --text-primary: #0f172a;
          --text-secondary: #475569;
          --text-muted: #94a3b8;
          --progress-from: #2563eb;
          --progress-to: #06b6d4;
          --pill-bg: #eff6ff;
          --pill-border: #bfdbfe;
        }

       .exam-preparation-wrapper {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  background: linear-gradient(160deg, #f0f2ff 0%, #e8eaff 50%, #f5f0ff 100%);
  padding: 10px 24px 32px;
  will-change: auto;
  -webkit-overflow-scrolling: touch;
}

.exam-preparation-wrapper::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse at 8% 18%,  rgba(99,102,241,0.18) 0%, transparent 38%),
    radial-gradient(ellipse at 90% 5%,  rgba(124,58,237,0.12) 0%, transparent 40%),
    radial-gradient(ellipse at 55% 92%, rgba(6,182,212,0.10)  0%, transparent 35%),
    radial-gradient(ellipse at 0%  75%, rgba(245,158,11,0.08) 0%, transparent 30%);
  z-index: 0;
  transform: translateZ(0);
}

.exam-preparation-wrapper::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: linear-gradient(to bottom, rgba(0,0,0,0.18), transparent 80%);
  -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.18), transparent 80%);
  z-index: 0;
  transform: translateZ(0);
}

        .exam-page-shell {
          position: relative;
          z-index: 1;
          max-width: 1400px;
          margin: 15px auto;
        }

        .exam-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 320px;
          gap: 20px;
          align-items: start;
        }

        .main-panel { min-width: 0; }

        .sidebar-panel {
          width: 320px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          position: sticky;
          top: 8px;
          align-self: start;
        }

        /* ── DAILY GOAL CARD ── */
        .daily-goal-card {
          background: rgba(255, 255, 255, 0.94);
          border: 1px solid rgba(191, 219, 254, 0.8);
          box-shadow: 0 16px 40px rgba(37, 99, 235, 0.10);
          border-radius: 22px;
          padding: 16px 20px;
          margin-bottom: 22px;
          height: 85px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .daily-goal-top {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 20px;
          align-items: center;
          width: 100%;
        }

        .goal-title {
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
          white-space: nowrap;
        }

        .goal-title b {
          font-weight: 700;
          color: var(--accent-1);
          margin-left: 6px;
        }

        .goal-arrow {
          margin-left: 4px;
          color: #3b82f6;
          font-size: 0.9rem;
        }

        .extra-count {
          color: #10b981;
          font-weight: 700;
          margin-left: 1px;
        }

        .goal-progress-track {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          gap: 18px;
        }

        .goal-progress-track::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 6px;
          background: #dbeafe;
          transform: translateY(-50%);
          border-radius: 999px;
          z-index: 0;
        }

        .goal-progress-fill {
          position: absolute;
          top: 50%;
          left: 0;
          height: 6px;
          background: linear-gradient(90deg, var(--progress-from), var(--progress-to));
          transform: translateY(-50%);
          border-radius: 999px;
          z-index: 0;
          transition: width 0.4s ease;
        }

        .goal-emoji {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #e2e8f0;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          line-height: 1;
          position: relative;
          z-index: 1;
          transition: all 0.3s ease;
        }

        .goal-emoji.active {
          background: linear-gradient(135deg, var(--accent-1), var(--accent-3));
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        /* ── PAGE HEADING ── */
        .page-heading {
          margin-bottom: 18px;
          padding-left: 2px;
        }

        .page-heading h1 {
          font-size: 1.25rem;
          line-height: 1.25;
          margin: 0 0 4px;
          color: var(--text-primary);
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .page-heading p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.95rem;
          font-weight: 500;
        }

        /* ── EXAM CARDS GRID — SAME SIZE AS JHARKHAND EXAM CARDS ── */
        /* Exam card colors (white bg, per-stream border/icon/button) kept exactly as-is */
        .exam-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .exam-item { min-width: 0; }

        .exam-card {
          border-radius: 18px;
          min-height: 168px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(40,49,90,0.14);
          transition: transform 0.22s ease;
          will-change: transform;
        }

        .exam-card::before,
        .exam-card::after {
          content: none !important;
          display: none !important;
        }

        .exam-card:hover { transform: translateY(-6px) scale(1.01); }

        .exam-card:active { transform: scale(0.98); }

        .exam-card .card-body { height: 100%; padding: 22px 22px 18px; display: flex; flex-direction: column; }

        .card-icon-wrap {
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .card-stream-icon {
          width: 32px;
          height: 32px;
        }

        .exam-card .card-title { font-size: 1.05rem; line-height: 1.34; font-weight: 700; margin-bottom: 18px; max-width: 240px; white-space: pre-line; }

        .solve-btn {
          margin-top: auto; border: 0; border-radius: 10px;
          background: rgba(255,255,255,0.95); color: #20242d;
          font-weight: 700; box-shadow: 0 4px 10px rgba(0,0,0,0.06); padding: 10px 14px;
        }
        .solve-btn:hover, .solve-btn:focus, .solve-btn:active {
          background: #fff !important; color: #20242d !important;
        }
        .solve-btn::after { content: " →"; font-weight: 800; color: #7b63ff; }

        /* ── DESKTOP USER HEADER IN SIDEBAR ── */
        .desktop-user-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 18px;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(191, 219, 254, 0.8);
          box-shadow: 0 16px 40px rgba(37, 99, 235, 0.08);
          margin-bottom: 4px;
          transition: transform 0.25s ease;
        }

        .desktop-user-header:hover { transform: translateY(-2px); }

        .desktop-user-header .user-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(191, 219, 254, 0.9);
          cursor: pointer;
        }

        .desktop-user-header .user-text {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .desktop-user-header .goal-leaderboard {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: 999px;
          background: var(--pill-bg);
          border: 1px solid var(--pill-border);
          height: 38px;
          transition: background 0.2s;
          cursor: pointer;
        }

        .desktop-user-header .goal-leaderboard:hover {
          background: #dbeafe;
          border-color: #93c5fd;
        }

        .desktop-user-header .goal-leaderboard .rank-text {
          font-size: 15px;
          font-weight: 800;
          color: var(--accent-1);
        }

        .desktop-user-header .goal-leaderboard .rank-arrow {
          font-size: 20px;
          color: #60a5fa;
          margin-left: 2px;
          margin-top: -2px;
        }

        .mobile-user-header { display: none; }

        /* ── RESPONSIVE MEDIA QUERIES ── */
        @media (max-width: 1180px) {
          .exam-layout {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .main-panel {
            width: 100%;
            min-width: 0;
          }
          .main-exams-section {
            width: 100%;
            min-width: 0;
          }
          .sidebar-panel {
            width: 100%;
            position: static;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
            margin-top: 8px;
          }
          .desktop-user-header {
            grid-column: span 2;
            margin-bottom: 0px;
          }
        }

        /* ── EXAM CARD MOBILE — MATCHES JHARKHAND'S 860px SQUARE-CARD BREAKPOINT ── */
        @media (max-width: 860px) {
          .exam-preparation-wrapper { padding: 4px 6px 0px; }
          .exam-page-shell { margin-top: 10px !important; }
          .page-heading { margin-bottom: 12px; }
          .page-heading h1 { font-size: 1.05rem; }
          .page-heading p { font-size: 0.76rem; }

          .exam-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 7px; }
          .exam-item { width: 100%; }
          .exam-card {
            aspect-ratio: 1 / 1;
            padding: 1px !important;
            min-height: unset;
            overflow: hidden;
            position: relative;
            border-radius: 8px;
          }
          .exam-card .card-body {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
            padding: 10px;
            overflow: hidden;
          }
          .card-icon-wrap { margin-bottom: 4px; }
          .card-stream-icon { width: 18px; height: 18px; }
          .exam-card .card-title {
            font-size: 0.72rem;
            line-height: 1.2;
            margin-bottom: 6px;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .solve-btn {
            width: 100%;
            font-size: 0.68rem;
            padding: 4px 0;
            border-radius: 8px;
            flex-shrink: 0;
          }

          .sidebar-panel { grid-template-columns: 1fr; margin-top: 10px; }
          .desktop-user-header { display: none; }

          .mobile-user-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
            padding-bottom: 12px;
            border-bottom: 1px solid rgba(191, 219, 254, 0.6);
          }

          .mobile-user-header .user-avatar {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid rgba(191, 219, 254, 0.9);
          }

          .mobile-user-header .user-text {
            font-size: 0.85rem;
            font-weight: 700;
            color: var(--text-primary);
          }

          .daily-goal-card {
            height: auto !important;
            padding: 16px 18px;
            border-radius: 20px;
            margin-bottom: 20px !important;
          }

          .goal-title { font-size: 0.85rem; }
          .goal-emoji { width: 28px; height: 28px; font-size: 11px; }
          .results-platform-stats-grid { grid-template-columns: repeat(2, 1fr); gap: 6px; }
        }
      ` }} />

      <div className="exam-page-shell">
        <div className="exam-layout">

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* ══ 1. MAIN PANEL ══ */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <div className="main-panel">
            <div className="main-exams-section">

              {/* ── DAILY GOAL CARD (MATCHING POLYTECHNIC & BTECH) ── */}
              <div className="daily-goal-card" id="bihar-daily-goal-widget">
                {/* Mobile User Header */}
                <div className="mobile-user-header">
                  <Image width={96} height={96}
                    src={user?.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}&background=2563eb&color=fff&bold=true`}
                    className="user-avatar"
                    alt="User avatar"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}&background=2563eb&color=fff&bold=true`;
                    }}
                    onClick={() => {
                      if (!isLoggedIn) {
                        openLogin();
                      } else {
                        router.push("/dashboard");
                      }
                    }}
                  />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <div className="user-text">
                      👋 Hey, {user?.name?.split(" ")[0] || "Aspirant"}
                    </div>
                    <div
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 cursor-pointer"
                      onClick={() => {
                        if (!isLoggedIn) {
                          openLogin();
                        } else {
                          router.push("/leaderboard");
                        }
                      }}
                    >
                      <Trophy className="w-3.5 h-3.5 text-amber-500" />
                      <span className="text-xs font-black text-blue-600">
                        {rank ? `#${rank}` : "New"}
                      </span>
                      <ChevronRight className="w-3 h-3 text-blue-400" />
                    </div>
                  </div>
                </div>

                {/* Daily Goal Top */}
                <div className="daily-goal-top">
                  <div className="goal-title">
                    Your Daily Goal
                    <b>
                      ({Math.min(solvedToday, dailyGoal)}
                      {solvedToday > dailyGoal && (
                        <span className="extra-count">+{solvedToday - dailyGoal}</span>
                      )}
                      {" "}/ {dailyGoal} Qs)
                      <span className="goal-arrow">→</span>
                    </b>
                  </div>

                  <div className="goal-progress-track" aria-hidden="true">
                    <div
                      className="goal-progress-fill"
                      style={{ width: `${progressPercent}%` }}
                    />
                    {[
                      { Icon: TrendingUp, label: "Start" },
                      { Icon: Footprints, label: "Walk" },
                      { Icon: Activity, label: "Run" },
                      { Icon: Zap, label: "Power" },
                      { Icon: Trophy, label: "Finish" },
                    ].map((item, i) => {
                      const IconComponent = item.Icon;
                      const isActive = solvedToday >= i + 1;
                      return (
                        <span
                          key={i}
                          className={`goal-emoji ${isActive ? "active" : ""}`}
                          title={item.label}
                        >
                          <IconComponent className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ── PAGE HEADING ── */}
              <div className="page-heading">
                <h1>Choose Bihar Exam &amp; Start Practice</h1>
                <p>BCECE LE • Polytechnic • Polytechnic Lateral Entry</p>
              </div>

              {/* ── BIHAR EXAM CARDS (SAME STRUCTURE & COLORS AS THE /exam-preparation STATE CARDS) ── */}
              <div className="exam-grid" id="bihar-exam-cards-grid">
                {BIHAR_EXAM_CARDS.map((exam, index) => (
                  <div className="exam-item" key={index}>
                    <div
                      className="exam-card card border-0"
                      style={{ background: exam.gradient, color: exam.textColor }}
                      onClick={() => handleExamNavigate(exam)}
                    >
                      <div className="card-body">
                        <div className="card-title h5 font-sans mb-3">{exam.title}</div>
                        <button
                          className="btn btn-light solve-btn cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExamNavigate(exam);
                          }}
                        >
                          Start Solving
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>{/* /main-exams-section */}

          </div>{/* /main-panel */}

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* ══ 2. SIDEBAR PANEL (WITH PROFILE & TOOLS) ══ */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <div className="sidebar-panel" id="bihar-sidebar-panel">

            {/* Desktop User Header Profile */}
            <div className="desktop-user-header">
              <Image width={96} height={96}
                src={user?.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}&background=2563eb&color=fff&bold=true`}
                className="user-avatar"
                alt="User avatar"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}&background=2563eb&color=fff&bold=true`;
                }}
                onClick={() => {
                  if (!isLoggedIn) {
                    openLogin();
                  } else {
                    router.push("/dashboard");
                  }
                }}
              />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                <div className="user-text">
                  👋 Hey, {user?.name?.split(" ")[0] || "Aspirant"}
                </div>
                <div
                  className="goal-leaderboard"
                  onClick={() => {
                    if (!isLoggedIn) {
                      openLogin();
                    } else {
                      router.push("/leaderboard");
                    }
                  }}
                >
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span className="rank-text">{rank ? `#${rank}` : "New"}</span>
                  <span className="rank-arrow">›</span>
                </div>
              </div>
            </div>

          </div>{/* /sidebar-panel */}

        </div>{/* /exam-layout */}

        {/* ══ TRUSTED BY TOPPERS — platform Hall of Fame, same section as /exam-preparation.
               Rendered without a test-series handler: the topper cards, heading and trust
               footer only (Bihar has no test series of its own on this page). ══ */}
        <TrustedByToppers />

      </div>{/* /exam-page-shell */}

    </div>
  );
}
