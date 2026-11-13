"use client";

import { useEffect, useState, useCallback, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronDown,
  BookOpen,
  GraduationCap,
  Award,
  Sparkles,
  Star,
  Activity,
  Footprints,
  Zap,
  TrendingUp,
  Trophy,
  CheckCircle2,
  Medal,
  Flame,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useAuthModal } from "../../context/AuthModalContext";
import { authFetch } from "../../utils/api";
import { BIHAR_EXAM_HOME, getSavedExam, isBiharExam, normalizeExamId } from "../../utils/examData";
import TrustedByToppers from "../../components/TrustedByToppers";
import Image from "next/image";

// The Bihar redirect must run BEFORE the browser paints this page, otherwise
// users see /exam-preparation flash for a frame. Layout effects do exactly
// that, but warn during SSR — so only use them in the browser.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Exam choice readable synchronously on the client: the lightweight exam
// preference (context/AuthContext keeps it in sync) and the cached profile.
const readLocalExam = () => {
  if (typeof window === "undefined") return "";
  try {
    const savedExam = normalizeExamId(window.localStorage.getItem("futurely_exam") || "");
    if (savedExam) return savedExam;
    const cachedUser = window.localStorage.getItem("user");
    return cachedUser ? normalizeExamId(JSON.parse(cachedUser)?.exam) : "";
  } catch {
    // Storage blocked (private mode / in-app webview) — the React-side check
    // still catches Bihar aspirants once the session loads.
    return "";
  }
};

const faqData = [
  {
    question: "What exams can I prepare for on Futurely?",
    answer:
      "Futurely currently offers solved Previous Year Question Papers (PYQs) for Jharkhand D2D (Diploma to Degree / Lateral Entry) and Jharkhand Polytechnic exams (2021–2025). Bihar and Uttar Pradesh exam papers are Launching Soon.",
  },
  {
    question: "Is exam practice on Futurely free?",
    answer:
      "Yes, practising PYQs on Futurely is completely free. Create an account, choose your exam, and start solving questions — no payment or subscription required.",
  },
  {
    question: "What is the Jharkhand D2D (Diploma to Degree) exam?",
    answer:
      "Jharkhand D2D is a JCECEB lateral-entry entrance exam for diploma holders seeking direct admission to the 2nd year of B.Tech at colleges like BIT Sindri. Futurely covers 5 full years of solved D2D PYQs (2021–2025) for Physics, Chemistry, and Mathematics.",
  },
  {
    question: "What is the daily goal feature on Futurely?",
    answer:
      "The daily goal tracker encourages you to solve at least 5 questions every day. Your progress is shown visually with a progress bar and milestones. Consistent daily practice has been shown to significantly improve exam scores.",
  },
  {
    question: "How does the leaderboard work on Futurely?",
    answer:
      "The Futurely leaderboard ranks all students based on total questions solved and accuracy. You can view your current rank on the exam preparation dashboard and compare your performance with other students preparing for the same exams.",
  },
  {
    question: "When will Bihar and UP exam PYQs be available?",
    answer:
      "Bihar BCECE LE, Bihar Polytechnic, UP B.Tech Lateral Entry, and UP Polytechnic PYQs are currently in development and will be added to Futurely soon. You will be notified once they go live.",
  },
  {
    question: "Do I need to log in to practise questions on Futurely?",
    answer:
      "Yes, a free account is required to access the PYQ practice interface. Login is needed to save your daily progress, track your rank on the leaderboard, and personalise your preparation experience.",
  },
  {
    question: "Which subjects are covered in Jharkhand Polytechnic PYQs on Futurely?",
    answer:
      "The Jharkhand Polytechnic PYQ section covers Physics, Chemistry, and Mathematics — the three core subjects of the JCECEB Polytechnic entrance exam — with solved papers from 2021 to 2025.",
  },
];

export default function ExamsClient() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();
  const { openLogin } = useAuthModal();
  const [openFaq, setOpenFaq] = useState(null);
  const [rank, setRank] = useState(null);
  const [solvedToday, setSolvedToday] = useState(0);
  const [expandedSections, setExpandedSections] = useState({});
  // Bihar aspirants must NEVER see this combined page — not even one frame.
  // router.replace() resolves asynchronously, so a redirect-only guard still
  // lets this page paint while the Bihar page loads. The decision therefore has
  // to happen before the browser paints — but it must NOT happen during the
  // first render: the tree is server-rendered now, so reading localStorage
  // while rendering would make the hydration render disagree with the HTML the
  // server sent (React would throw a hydration mismatch). A client-only layout
  // effect still runs before paint, which closes the gap exactly the same way.
  const [redirectingToBihar, setRedirectingToBihar] = useState(false);

  // Catches an exam that only becomes known later (login / profile refresh).
  useIsomorphicLayoutEffect(() => {
    const activeExam =
      normalizeExamId(user?.exam) || readLocalExam() || getSavedExam();
    if (isBiharExam(activeExam)) {
      setRedirectingToBihar(true);
      router.replace(BIHAR_EXAM_HOME);
    }
  }, [user?.exam, router]);

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  const handleProtectedNavigate = (path) => {
    router.push(path);
  };

  const states = [
    {
      name: "Jharkhand",
      gradient: "linear-gradient(135deg, #6a11cb, #2575fc)",
      textColor: "#fff",
      exams: [
        {
          title: "Jharkhand D2D PYQ\n(2021–2026) For 2027 Exam",
          path: "/exam-preparation/jharkhand-d2d",
        },
        {
          title: "Jharkhand Polytechnic PYQ\n(2021–2026) For 2027 Exam",
          path: "/exam-preparation/jharkhand-polytechnic",
        },
        {
          title: "Jharkhand Polytechnic LE PYQ\n(2021–2026) For 2027 Exam",
          path: "/exam-preparation/jharkhand-polytechnic-lateral-entry",
        },
        {
          title: "Jharkhand Para Medical PYQ\n(2021–2026) For 2027 Exam",
          path: "/exam-preparation/jharkhand-paramedical",
        },
        {
          title: "Jharkhand ANM PYQ\n(2021–2026) For 2027 Exam",
          path: "/exam-preparation/jharkhand-anm",
        },
        {
          title: "Jharkhand GNM PYQ\n(2021–2026) For 2027 Exam",
          path: "/exam-preparation/jharkhand-gnm",
        },
      ],
    },
    {
      name: "Uttar Pradesh",
      gradient: "linear-gradient(135deg, #2b1d1bff, #dd2476)",
      textColor: "#fff",
      exams: [
        { title: "UP B.Tech LE (Lateral Entry)\nPYQ (2021–2026) For 2027 Exam", path: null },
        { title: "UP Polytechnic PYQ\n(2018–2026) For 2027 Exam", path: null },
        { title: "UP Polytechnic LE PYQ\n(2018–2026) For 2027 Exam", path: null },
      ],
    },
  ];

  const fetchRank = useCallback(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    if (!token || !user) return;
    fetch("https://futurely-backend.onrender.com/api/leaderboard/overall", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const me = data.find((u) => String(u.userId) === String(user.id) || String(u.id) === String(user.id));
          setRank(me?.position || null);
        }
      })
      .catch(() => setRank(null));
  }, [user]);

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

  const testSeriesCards = [
    {
      icon: "🎯",
      exam: "Jharkhand Polytechnic",
      year: "2027",
      tag: "JCECEB",
      tests: 10,
      meta: "10 Full Tests · 150 Qs · 2.5 hrs",
      trust: "✓ Official JCECEB pattern",
      path: "/test-series",
      purchasedPath: "/jh-poly-tests",
      testSeriesId: "JHP-TS",
    },
    {
      icon: "🎯",
      exam: "Jharkhand D2D BTech",
      year: "2027",
      tag: "Lateral Entry",
      tests: 10,
      meta: "10 Full Tests · 100 Qs · 2.5 hrs",
      trust: "✓ Official JCECEB pattern",
      path: "/d2d-test-series",
      purchasedPath: "/d2d-tests",
      testSeriesId: "D2D-TS",
    },
    {
      icon: "🎯",
      exam: "Jharkhand Polytechnic Lateral Entry",
      year: "2027",
      tag: "Lateral Entry",
      tests: 10,
      meta: "10 Full Tests · 100 Qs · Math & Science",
      trust: "✓ Official JCECEB Lateral Entry pattern",
      path: "/test-series-lateral",
      purchasedPath: "/jh-poly-lateral-tests",
      testSeriesId: "JHPLE-TS",
    },
  ];

  const handleTsCardClick = async (ts) => {
    if (!isLoggedIn) {
      openLogin();
      return;
    }
    // Check purchase status from API
    try {
      const res = await authFetch(`/purchase/check?testSeriesId=${ts.testSeriesId}`);
      const data = await res.json();
      if (data && data.access) {
        router.push(ts.purchasedPath);
        return;
      }
    } catch {
      // ignore network errors and fallback
    }

    // Fallback check from localStorage
    try {
      const purchased = JSON.parse(localStorage.getItem("purchased_series") || "[]");
      const hasPurchase =
        purchased.includes(ts.testSeriesId) ||
        (ts.testSeriesId === "JHP-TS" && purchased.includes("jpoly-full-2026"));
      if (hasPurchase) {
        router.push(ts.purchasedPath);
      } else {
        router.push(ts.path);
      }
    } catch {
      router.push(ts.path);
    }
  };

  const getTsIcon = (id) => {
    switch (id) {
      case "JHP-TS":
      case "jpoly-full-2026":
        return <GraduationCap className="w-[18px] h-[18px] text-pink-600" />;
      case "D2D-TS":
        return <Award className="w-[18px] h-[18px] text-pink-600" />;
      case "JHPLE-TS":
        return <Sparkles className="w-[18px] h-[18px] text-pink-600" />;
      default:
        return <BookOpen className="w-[18px] h-[18px] text-pink-600" />;
    }
  };

  // Navigate to (or gate) the test series tied to a results section — reused
  // by both the section footer CTA and the new "+ More Rankers" card.
  const goToSectionTestSeries = (sec) => {
    const targetTs = testSeriesCards.find((ts) => ts.testSeriesId === sec.testSeriesId);
    if (targetTs) {
      handleTsCardClick(targetTs);
    } else if (sec.testSeriesUrl) {
      router.push(sec.testSeriesUrl);
    }
  };

  // Bihar aspirants get a blank page for the moment it takes the dedicated
  // Bihar page to load — never a frame of this one.
  if (redirectingToBihar) return null;

  return (
    <div className="exam-preparation-wrapper">
      <style dangerouslySetInnerHTML={{
        __html: `
        * { box-sizing: border-box; }

        @keyframes ts-spin {
          to { transform: rotate(360deg); }
        }

        :root {
          --bg-primary: #f0f2ff;
          --bg-secondary: #e8ebff;
          --accent-1: #4f46e5;
          --accent-2: #7c3aed;
          --accent-3: #06b6d4;
          --accent-warm: #f59e0b;
          --accent-rose: #e11d48;
          --glass-bg: rgba(255, 255, 255, 0.72);
          --glass-border: rgba(255, 255, 255, 0.65);
          --glass-shadow: 0 12px 32px rgba(79, 70, 229, 0.12);
          --text-primary: #0f172a;
          --text-secondary: #475569;
          --text-muted: #94a3b8;
          --progress-from: #4f46e5;
          --progress-to: #06b6d4;
          --grid-line: rgba(79, 70, 229, 0.07);
          --pill-bg: #eef2ff;
          --pill-border: #c7d2fe;
          --pink-from: #ec4899;
          --pink-to:   #be185d;
        }

        .exam-preparation-wrapper {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          background: linear-gradient(160deg, #f0f2ff 0%, #e8eaff 50%, #f5f0ff 100%);
          padding: 10px 28px 0px;
          will-change: auto;
          -webkit-overflow-scrolling: touch;
        }

        .exam-preparation-wrapper::after {
          content: "";
          position: absolute;
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
          position: absolute;
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

        .daily-goal-card {
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(199, 210, 254, 0.7);
          box-shadow: 0 16px 40px rgba(79, 70, 229, 0.10);
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
        .goal-title { font-size: 1rem; font-weight: 600; color: #1e293b; white-space: nowrap; }
        .goal-title b { font-weight: 700; color: var(--accent-1); }
        .goal-progress-track {
          display: flex; align-items: center; justify-content: space-between;
          position: relative; gap: 18px;
        }
        .goal-progress-track::before {
          content: ""; position: absolute; top: 50%; left: 0; right: 0;
          height: 6px; background: #dde4f7; transform: translateY(-50%);
          border-radius: 999px; z-index: 0;
        }
        .goal-progress-fill {
          position: absolute; top: 50%; left: 0; height: 6px;
          background: linear-gradient(90deg, var(--progress-from), var(--progress-to));
          transform: translateY(-50%); border-radius: 999px; z-index: 0;
          transition: width 0.4s ease;
        }
        .goal-emoji {
          width: 36px; height: 36px; border-radius: 50%; background: #dde4f7;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; line-height: 1; position: relative; z-index: 1;
          transition: background 0.3s;
        }
        .goal-emoji.active {
          background: linear-gradient(135deg, var(--accent-1), var(--accent-3));
          color: #fff;
        }

        .page-heading { margin-bottom: 18px; padding-left: 2px; }
        .page-heading h1 {
          font-size: 1.22rem; line-height: 1.2; margin: 0 0 4px;
          color: var(--text-primary); font-weight: 800; letter-spacing: -0.02em;
        }
        .page-heading p { margin: 0; color: var(--text-secondary); font-size: 0.96rem; font-weight: 500; }

        .state-group { margin-bottom: 18px; }
        .exam-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
        .exam-item { min-width: 0; }
        .exam-card {
          border-radius: 18px; min-height: 168px; overflow: hidden;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(40,49,90,0.14);
          transition: transform 0.22s ease;
          will-change: transform;
        }
        .exam-card:hover { transform: translateY(-6px) scale(1.01); }
        .exam-card:active { transform: scale(0.98); }
        .exam-card .card-body { height: 100%; padding: 22px 22px 18px; display: flex; flex-direction: column; }
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

        .desktop-user-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 20px;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(199, 210, 254, 0.7);
          box-shadow: 0 16px 40px rgba(79, 70, 229, 0.10);
          margin-bottom: 68px;
          height: auto;
          transition: transform 0.25s ease;
          will-change: transform;
        }
        .desktop-user-header:hover { transform: translateY(-2px); }
        .desktop-user-header .user-avatar {
          width: 48px; height: 48px; border-radius: 50%; object-fit: cover;
          cursor: pointer;
        }
        .desktop-user-header .user-text { font-size: 1.0rem; font-weight: 700; color: var(--text-primary); }
        .desktop-user-header .goal-leaderboard {
          display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px;
          border-radius: 999px; background: var(--pill-bg); border: 1px solid var(--pill-border);
          height: 40px; transition: background 0.2s; cursor: pointer;
        }
        .desktop-user-header .goal-leaderboard:hover { background: #e0e7ff; border-color: #818cf8; }
        .desktop-user-header .goal-leaderboard .trophy { font-size: 22px; }
        .desktop-user-header .goal-leaderboard .rank-text { font-size: 18px; font-weight: 800; color: var(--accent-1); }
        .desktop-user-header .goal-leaderboard .rank-arrow { font-size: 24px; color: #818cf8; margin-left: 2px; margin-top: -4px; }

        .mobile-user-header { display: none; }
        .user-avatar { width: 36px; height: 36px; object-fit: cover; }
        .user-text { font-size: 0.8rem; font-weight: 700; color: var(--text-primary); }
        .goal-leaderboard {
          width: auto; padding: 0 8px; height: 28px; border-radius: 999px;
          display: flex; align-items: center; justify-content: center; gap: 4px;
          background: var(--pill-bg); border: 1px solid var(--pill-border);
          cursor: pointer; transition: background 0.2s;
        }
        .goal-leaderboard:hover { background: #e0e7ff; border-color: #818cf8; }
        .goal-leaderboard .trophy { font-size: 14px; }
        .rank-text { font-size: 13px; font-weight: 800; color: var(--accent-1); }
        .rank-arrow { font-size: 18px; color: #818cf8; margin-top: -4px; }
        .extra-count { color: #10b981; font-weight: 700; margin-left: 1px; }

        .ts-card-wrap {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          padding: 2px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          height: 100%;
          transform: translateZ(0);
          transition: transform 0.22s ease;
          will-change: transform;
        }

        .ts-card-wrap::before {
          content: "";
          position: absolute;
          inset: -40px;
          background: conic-gradient(
            #f472b6 0deg,
            #ec4899 60deg,
            #be185d 120deg,
            #f9a8d4 180deg,
            #be185d 240deg,
            #ec4899 300deg,
            #f472b6 360deg
          );
          animation: ts-spin 2.8s linear infinite;
          will-change: transform;
        }

        .ts-card-wrap:hover {
          transform: translateY(-3px) translateZ(0);
        }
        .ts-card-wrap:active { transform: scale(0.98) translateZ(0); }

        .ts-card-inner {
          position: relative;
          z-index: 1;
          background: #ffffff;
          border-radius: 16px;
          padding: 12px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          height: 100%;
          width: 100%;
          flex: 1;
        }

        .ts-card-main-content {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          min-width: 0;
        }

        .ts-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: #fff0f7;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 18px;
        }

        .ts-text {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .ts-title {
          font-size: 13.5px;
          font-weight: 800;
          color: #111827;
          line-height: 1.25;
          margin-bottom: 2px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          word-break: break-word;
        }

        .ts-meta {
          font-size: 11px;
          color: #6b7280;
          font-weight: 500;
          line-height: 1.2;
        }

        .ts-trust {
          font-size: 10.5px;
          color: #ec4899;
          font-weight: 700;
          margin-top: 2px;
          line-height: 1.2;
        }

        .ts-join-btn {
          flex-shrink: 0;
          background: linear-gradient(160deg, #ec4899 0%, #be185d 100%);
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 8px 12px;
          font-size: 11px;
          font-weight: 800;
          text-align: center;
          cursor: pointer;
          line-height: 1.3;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(190, 24, 93, 0.25);
          transition: opacity 0.18s, transform 0.15s;
          letter-spacing: 0.02em;
        }
        .ts-join-btn:hover { opacity: 0.92; transform: scale(1.03); }
        .ts-join-btn .join-top {
          display: block; font-size: 8.5px; font-weight: 700; opacity: 0.88;
          letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 1px;
        }
        .ts-join-btn .join-main { display: block; font-size: 12px; font-weight: 900; }

        /* ── Responsive ── */
        @media (max-width: 1180px) {
          .exam-layout {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .main-panel {
            display: contents;
          }
          .main-exams-section {
            order: 1;
            width: 100%;
            min-width: 0;
          }
          .sidebar-panel {
            order: 2;
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

        @media (max-width: 860px) {
          .exam-preparation-wrapper { padding: 4px 6px 0px; }
          .exam-page-shell { margin-top: 10px !important; }
          .exam-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 7px; }
          .exam-item { width: 100%; }
          .exam-card {
            aspect-ratio: 1 / 1; padding: 1px !important; min-height: unset;
            overflow: hidden; position: relative; border-radius: 8px;
          }
          .exam-card .card-body { display: flex; flex-direction: column; justify-content: space-between; height: 100%; padding: 10px; overflow: hidden; }
          .exam-card .card-title { font-size: 0.72rem; line-height: 1.2; margin-bottom: 6px; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; }
          .solve-btn { width: 100%; font-size: 0.68rem; padding: 4px 0; border-radius: 8px; flex-shrink: 0; }

          .sidebar-panel { grid-template-columns: 1fr; margin-top: 10px; }
          .desktop-user-header { display: none; }
          .ts-card-wrap:nth-child(2) { margin-top: 0 !important; }

         .mobile-user-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(199, 210, 254, 0.4);
}

.daily-goal-card {
  height: auto !important;
  padding: 18px 20px;
  border-radius: 20px;
  margin-left: 0;
  margin-top: 0 !important;
  margin-bottom: 28px !important; /* Adds extra spacing below the card */
}
          .goal-title { font-size: 0.8rem; font-weight: 600; color: #1e293b; line-height: 1.1; flex-shrink: 0; }
          .goal-title b { display: block; font-size: 0.8rem; font-weight: 700; color: var(--accent-1); margin-top: 2px; }
          .goal-arrow { margin-left: 5px; font-size: 0.6rem; color: #818cf8; }
          .goal-progress-track { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 0; width: 100%; }
          .goal-progress-track::before { content: ""; position: absolute; top: 50%; left: 0; right: 0; height: 6px; background: #dde4f7; transform: translateY(-50%); border-radius: 999px; z-index: 0; }
          .goal-emoji { width: 25px; height: 25px; border-radius: 50%; background: #dde4f7; display: flex; align-items: center; justify-content: center; font-size: 10px; line-height: 1; padding: 0; position: relative; z-index: 1; }
          .page-heading h1 { font-size: 1rem; line-height: 1.2; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 3px; color: var(--text-primary); }
          .page-heading p { font-size: 0.78rem; color: var(--text-secondary); margin: 0; line-height: 1.2; opacity: 0.9; }
          .page-heading { padding-left: 2px; margin-bottom: 12px; border-bottom: 1px solid rgba(79,70,229,0.08); padding-bottom: 6px; }
          .daily-goal-top { display: flex; align-items: center; justify-content: flex-start; gap: 15px; }
          .goal-leaderboard { width: auto; padding: 0 6px; height: 26px; border-radius: 15px; display: flex; align-items: center; justify-content: center; gap: 4px; border: 1px solid var(--pill-border); }
          .goal-leaderboard .trophy { font-size: 14px; }
          .rank-text { font-size: 13px; font-weight: 800; color: var(--accent-1); }
          .rank-arrow { font-size: 18px; color: #818cf8; margin-top: -4px; }
          .desktop-user-header { display: none; }

          .ts-card-inner { padding: 12px 14px; gap: 10px; }
          .ts-card-main-content { gap: 10px; }
          .ts-icon { width: 36px; height: 36px; border-radius: 9px; }
          .ts-title { font-size: 13px; }
          .ts-meta { font-size: 11px; }
          .ts-trust { font-size: 10.5px; }
          .ts-join-btn { padding: 8px 12px; border-radius: 11px; }
          .ts-join-btn .join-main { font-size: 11.5px; }
        }

        @media (max-width: 480px) {
          .ts-card-inner {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
            padding: 12px 14px;
          }
          .ts-card-main-content {
            width: 100%;
          }
          .ts-title {
            font-size: 13.5px;
          }
          .ts-join-btn {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            padding: 8px 12px;
            border-radius: 12px;
          }
          .ts-join-btn .join-top {
            display: inline;
            margin-bottom: 0;
            margin-right: 4px;
            font-size: 10px;
          }
          .ts-join-btn .join-main {
            display: inline;
            font-size: 12.5px;
          }
        }

        @media (max-width: 420px) {
          .exam-preparation-wrapper { padding: 4px 4px 0px; }
          .exam-page-shell { max-width: 100%; }
          .daily-goal-card { padding: 14px 16px; margin-bottom: 20px !important; }
          .goal-title { font-size: 0.72rem; }
          .goal-title b { font-size: 0.72rem; }
          .goal-emoji { width: 22px; height: 22px; font-size: 9px; }
          .page-heading h1 { font-size: 0.92rem; }
          .page-heading p { font-size: 0.7rem; }
          .results-platform-stats-grid { gap: 6px; }
          .platform-stat-pill { padding: 6px 4px; }
          .platform-stat-val { font-size: 11px; }
          .platform-stat-lbl { font-size: 8.5px; }
        }

        @media (max-width: 380px) {
          .exam-preparation-wrapper { padding: 2px 3px 0px; }
          .daily-goal-card { padding: 10px 12px; margin-bottom: 14px !important; height: auto !important; }
          .goal-title { font-size: 0.65rem; }
          .goal-title b { font-size: 0.65rem; }
          .goal-emoji { width: 18px; height: 18px; font-size: 8px; }
          .page-heading h1 { font-size: 0.82rem; }
          .page-heading p { font-size: 0.62rem; }
          .page-heading { margin-bottom: 8px; padding-bottom: 4px; }
          .results-platform-stats-grid { gap: 4px; margin-bottom: 10px; }
          .platform-stat-pill { padding: 4px 3px; border-radius: 8px; }
          .platform-stat-val { font-size: 10px; }
          .platform-stat-lbl { font-size: 7.5px; }
          .mobile-user-header { gap: 8px; margin-bottom: 14px; padding-bottom: 10px; }
          .user-avatar { width: 28px; height: 28px; }
          .goal-leaderboard { height: 22px; padding: 0 4px; }
          .rank-text { font-size: 11px; }
          .rank-arrow { font-size: 14px; }
          .ts-card-inner { padding: 8px 10px; gap: 6px; }
          .ts-icon { width: 28px; height: 28px; }
          .ts-title { font-size: 11px; }
          .ts-meta { font-size: 9.5px; }
          .ts-trust { font-size: 9px; }
          .ts-join-btn { padding: 6px 10px; }
          .ts-join-btn .join-main { font-size: 11px; }
          .solve-btn { font-size: 0.6rem; padding: 3px 0; }
          .exam-card .card-title { font-size: 0.62rem; }
          .exam-card .card-body { padding: 6px; }
          .sidebar-panel { gap: 8px; }
        }

        @media (max-width: 380px) {
          .ts-title { font-size: 12.5px; }
          .ts-meta { font-size: 10.5px; }
          .ts-join-btn { padding: 7.5px 10px; }
          .ts-join-btn .join-main { font-size: 12px; }
        }

        @media (max-width: 520px) {
          .goal-title { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          .page-heading h1 { font-size: 1.02rem; }
          .page-heading p { font-size: 0.88rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ts-card-wrap::before { animation: none; }
          .exam-card, .desktop-user-header, .ts-card-wrap, .ts-join-btn { transition: none; }
        }
      ` }} />

      <div className="exam-page-shell">
        <div className="exam-layout">

          {/* ══ MAIN PANEL ══ */}
          <div className="main-panel">

            <div className="main-exams-section">
              {/* Daily Goal */}
              <div className="daily-goal-card">
                <div className="mobile-user-header">
                  <Image width={96} height={96}
                    src={user?.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}&background=random`}
                    className="user-avatar rounded-full" alt="User avatar"
                    onClick={() => { if (!isLoggedIn) { openLogin(); } else { router.push("/dashboard"); } }}
                  />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <div className="user-text"><span>👋 Hey, {user?.name?.split(" ")[0] || "User"}</span></div>
                    <div className="goal-leaderboard" onClick={() => { if (!isLoggedIn) { openLogin(); } else { router.push("/leaderboard"); } }}>
                      <Trophy className="w-4 h-4 text-amber-500 mr-1" />
                      <span className="rank-text">{rank ? `#${rank}` : "New"}</span>
                      <span className="rank-arrow">›</span>
                    </div>
                  </div>
                </div>

                <div className="daily-goal-top">
                  <div className="goal-title">
                    Your Daily Goal
                    <b>
                      ({Math.min(solvedToday, dailyGoal)}
                      {solvedToday > dailyGoal && <span className="extra-count">+{solvedToday - dailyGoal}</span>}
                      / {dailyGoal} Qs)
                      <span className="goal-arrow">→</span>
                    </b>
                  </div>
                  <div className="goal-progress-track" aria-hidden="true">
                    <div className="goal-progress-fill" style={{ width: `${progressPercent}%` }}></div>
                    {[
                      { Icon: TrendingUp, label: "Start" },
                      { Icon: Footprints, label: "Walk" },
                      { Icon: Activity, label: "Run" },
                      { Icon: Zap, label: "Power" },
                      { Icon: Trophy, label: "Finish" }
                    ].map((item, i) => {
                      const IconComponent = item.Icon;
                      const isActive = solvedToday >= i + 1;
                      return (
                        <span key={i} className={`goal-emoji ${isActive ? "active" : ""}`} title={item.label}>
                          <IconComponent className="w-3.5 h-3.5 md:w-5 md:h-5" />
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="page-heading">
                <h1>Choose Exam &amp; Start Practice</h1>
                <p>Diploma • Polytechnic • BTech • Lateral Entry</p>
              </div>

              {states.slice(0, 1).map((state) => (
                <div key={state.name} className="state-group">
                  <div className="exam-grid">
                    {state.exams.map((exam, index) => (
                      <div className="exam-item" key={index}>
                        <div
                          className="exam-card card border-0"
                          style={{ background: state.gradient, color: state.textColor }}
                          onClick={() => exam.path ? handleProtectedNavigate(exam.path) : alert("Launching Soon!")}
                        >
                          <div className="card-body">
                            <div className="card-title h5 font-sans mb-3">{exam.title}</div>
                            <button className="btn btn-light solve-btn cursor-pointer"
                              onClick={(e) => { e.stopPropagation(); exam.path ? handleProtectedNavigate(exam.path) : alert("Launching Soon!"); }}
                            >
                              Start Solving
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div style={{ marginTop: 10 }}>
                {states.slice(1).map((state) => (
                  <div key={state.name} className="state-group">
                    <div className="exam-grid">
                      {state.exams.map((exam, index) => (
                        <div className="exam-item" key={index}>
                          <div
                            className="exam-card card border-0"
                            style={{ background: state.gradient, color: state.textColor }}
                            onClick={() => exam.path ? handleProtectedNavigate(exam.path) : alert("Launching Soon!")}
                          >
                            <div className="card-body">
                              <div className="card-title h5 font-sans mb-3">{exam.title}</div>
                              <button className="btn btn-light solve-btn cursor-pointer"
                                onClick={(e) => { e.stopPropagation(); exam.path ? handleProtectedNavigate(exam.path) : alert("Launching Soon!"); }}
                              >
                                Start Solving
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>{/* /main-panel */}

          {/* ══ SIDEBAR ══ */}
          <div className="sidebar-panel">

            {/* Desktop user header */}
            <div className="desktop-user-header">
              <Image width={96} height={96}
                src={user?.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}&background=random`}
                className="user-avatar rounded-full" alt="User avatar"
                onClick={() => { if (!isLoggedIn) { openLogin(); } else { router.push("/dashboard"); } }}
              />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                <div className="user-text">👋 Hey, {user?.name?.split(" ")[0] || "User"}</div>
                <div className="goal-leaderboard" onClick={() => { if (!isLoggedIn) { openLogin(); } else { router.push("/leaderboard"); } }}>
                  <Trophy className="w-5 h-5 text-amber-500 mr-1" />
                  <span className="rank-text">{rank ? `#${rank}` : "New"}</span>
                  <span className="rank-arrow">›</span>
                </div>
              </div>
            </div>

            {/* ══ TEST SERIES CARDS ══ */}
            {testSeriesCards.map((ts) => (
              <div
                key={ts.testSeriesId}
                className="ts-card-wrap"
                onClick={() => handleTsCardClick(ts)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleTsCardClick(ts)}
                aria-label={`Join ${ts.exam} ${ts.year} Test Series`}
              >
                <div className="ts-card-inner">

                  <div className="ts-card-main-content">
                    {/* Icon */}
                    <div className="ts-icon">{getTsIcon(ts.testSeriesId)}</div>

                    {/* Text */}
                    <div className="ts-text">
                      <div className="ts-title">{ts.exam} {ts.year}</div>
                      <div className="ts-meta">{ts.meta}</div>
                      <div className="ts-trust">{ts.trust}</div>
                    </div>
                  </div>

                  {/* JOIN button */}
                  <button
                    className="ts-join-btn cursor-pointer"
                    onClick={(e) => { e.stopPropagation(); handleTsCardClick(ts); }}
                    aria-label={`Join ${ts.exam} Test Series`}
                  >
                    <span className="join-top">JOIN</span>
                    <span className="join-main">Test Series</span>
                  </button>

                </div>
              </div>
            ))}

          </div>
        </div>{/* /exam-layout */}

        {/* ══ TRUSTED BY TOPPERS — shared section (components/TrustedByToppers.js) ══ */}
        <TrustedByToppers onJoinTestSeries={goToSectionTestSeries} />

        {/* ══ FAQ ══ */}
        <section
          className="faq-section"
          aria-label="Frequently Asked Questions about Futurely"
          style={{ padding: '40px 0 60px' }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <span className="bg-indigo-50 text-indigo-600 text-sm font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block mb-3">
                Preparation Helpdesk
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950">Frequently Asked Questions</h2>
              <div className="w-16 h-1 bg-indigo-600 mx-auto mt-4 rounded"></div>
              <p className="mt-4 text-slate-500 text-sm sm:text-base leading-relaxed">
                Common questions about Futurely's PYQ practice, exams, and features.
              </p>
            </div>

            <div role="list" className="space-y-4" aria-label="FAQ accordion">
              {faqData.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div className="faq-item bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all hover:border-indigo-200" key={index} role="listitem">
                    <button
                      className="faq-question w-full text-left p-5 md:p-6 font-bold text-slate-900 flex items-center justify-between gap-4 transition-colors hover:bg-slate-50"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      id={`faq-question-${index}`}
                    >
                      <span className="text-sm md:text-base tracking-wide leading-snug">{faq.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 text-indigo-600 transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                    <div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      className="transition-all duration-300 ease-in-out"
                      style={{
                        maxHeight: isOpen ? "400px" : "0px",
                        opacity: isOpen ? 1 : 0,
                        overflow: "hidden"
                      }}
                    >
                      <div className="px-5 pb-5 md:px-6 md:pb-6 text-slate-600 text-xs md:text-sm leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/50">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </div>{/* /exam-page-shell */}
    </div>
  );
}