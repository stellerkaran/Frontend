"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Trophy,
  FileText,
  Cpu,
  Radio,
  Zap,
  Cog,
  Landmark,
  BrainCircuit,
  Calculator,
  Compass,
  Check,
  X,
  ExternalLink,
  TrendingUp,
  Footprints,
  Activity,
  ChevronRight,
  Calendar,
  Monitor,
  Building2,
  Brain,
  Sigma,
  ClipboardList,
  Atom,
  Plane,
  FlaskConical,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useAuthModal } from "../../context/AuthModalContext";
import { authFetch } from "../../utils/api";
import Image from "next/image";

// ── GATE STREAM CARDS — original colors kept as-is, structure/sizing fixed for mobile ──
export const GATE_STREAM_CARDS = [
  {
    code: "CS",
    title: "GATE CS & IT\nPYQ (2018‑2026)\nFor 2027 Exam",
    path: "/gate/pyq/computer-science",
    icon: Monitor,
    iconColor: "#2563eb",
    cardBg: "#ffffff",
    borderColor: "#e2e8f0",
    btnColor: "#2563eb",
    btnBg: "#eff6ff",
    btnBorder: "#bfdbfe",
  },
  {
    code: "EC",
    title: "GATE Electronics\n(EC) PYQ (2018‑2026)\nFor 2027 Exam",
    path: "/gate/pyq/electronics-communication",
    icon: Cpu,
    iconColor: "#16a34a",
    cardBg: "#ffffff",
    borderColor: "#e2e8f0",
    btnColor: "#16a34a",
    btnBg: "#f0fdf4",
    btnBorder: "#bbf7d0",
  },
  {
    code: "EE",
    title: "GATE Electrical\n(EE) PYQ (2018‑2026)\nFor 2027 Exam",
    path: "/gate/pyq/electrical-engineering",
    icon: Zap,
    iconColor: "#d97706",
    cardBg: "#ffffff",
    borderColor: "#e2e8f0",
    btnColor: "#d97706",
    btnBg: "#fffbeb",
    btnBorder: "#fde68a",
  },
  {
    code: "ME",
    title: "GATE Mechanical\n(ME) PYQ (2018‑2026)\nFor 2027 Exam",
    path: "/gate/pyq/mechanical-engineering",
    icon: Cog,
    iconColor: "#7c3aed",
    cardBg: "#ffffff",
    borderColor: "#e2e8f0",
    btnColor: "#7c3aed",
    btnBg: "#faf5ff",
    btnBorder: "#e9d5ff",
  },
  {
    code: "CE",
    title: "GATE Civil\n(CE) PYQ (2018‑2026)\nFor 2027 Exam",
    path: "/gate/pyq/civil-engineering",
    icon: Building2,
    iconColor: "#0d9488",
    cardBg: "#ffffff",
    borderColor: "#e2e8f0",
    btnColor: "#0d9488",
    btnBg: "#f0fdfa",
    btnBorder: "#99f6e4",
  },
  {
    code: "DA",
    title: "GATE Data Science & AI\n(DA) PYQ (2026)\nFor 2027 Exam",
    path: "/gate/pyq/data-science-ai",
    icon: Brain,
    iconColor: "#e11d48",
    cardBg: "#ffffff",
    borderColor: "#e2e8f0",
    btnColor: "#e11d48",
    btnBg: "#fff1f2",
    btnBorder: "#fecdd3",
  },
  {
    code: "AE",
    title: "GATE Aerospace\n(AE) PYQ (2018‑2026)\nFor 2027 Exam",
    path: "/gate/pyq/aerospace-engineering",
    icon: Plane,
    iconColor: "#0ea5e9",
    cardBg: "#ffffff",
    borderColor: "#e2e8f0",
    btnColor: "#0ea5e9",
    btnBg: "#f0f9ff",
    btnBorder: "#bae6fd",
  },
  {
    code: "CH",
    title: "GATE Chemical\n(CH) PYQ (2018‑2026)\nFor 2027 Exam",
    path: "/gate/pyq/chemical-engineering",
    icon: FlaskConical,
    iconColor: "#ea580c",
    cardBg: "#ffffff",
    borderColor: "#e2e8f0",
    btnColor: "#ea580c",
    btnBg: "#fff7ed",
    btnBorder: "#fed7aa",
  },
  {
    code: "AR",
    title: "GATE Architecture\n& Planning (AR)\nFor 2027 Exam",
    path: "/gate/pyq/architecture-planning",
    icon: Compass,
    iconColor: "#c026d3",
    cardBg: "#ffffff",
    borderColor: "#e2e8f0",
    btnColor: "#c026d3",
    btnBg: "#fdf4ff",
    btnBorder: "#f5d0fe",
  },
];

export const GATE_PYQ_SUBJECTS = [
  {
    slug: "computer-science",
    code: "CS",
    title: "Computer Science & Information Technology",
    shortName: "Computer Science",
    years: "2018 – 2026",
    papersCount: 14,
    icon: Cpu,
    color: "from-blue-600 to-indigo-700",
    badge: "Most Attempted",
    topics: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "Computer Networks",
      "DBMS",
      "Theory of Computation",
      "Compiler Design",
    ],
  },
  {
    slug: "electronics-communication",
    code: "EC",
    title: "Electronics & Communication Engineering",
    shortName: "Electronics & Comm",
    years: "2018 – 2026",
    papersCount: 14,
    icon: Radio,
    color: "from-purple-600 to-indigo-700",
    badge: "Core Branch",
    topics: [
      "Signals & Systems",
      "Analog Circuits",
      "Electromagnetics",
      "Digital Electronics",
      "Communications",
      "Control Systems",
    ],
  },
  {
    slug: "electrical-engineering",
    code: "EE",
    title: "Electrical Engineering",
    shortName: "Electrical",
    years: "2018 – 2026",
    papersCount: 14,
    icon: Zap,
    color: "from-amber-600 to-orange-700",
    badge: "Core Branch",
    topics: [
      "Engineering Mathematics",
      "Electric Circuits",
      "Electromagnetic Fields",
      "Signals & Systems",
      "Electrical Machines",
      "Power Systems",
      "Control Systems",
      "Electrical & Electronic Measurements",
      "Analog & Digital Electronics",
      "Power Electronics",
    ],
  },
  {
    slug: "mechanical-engineering",
    code: "ME",
    title: "Mechanical Engineering",
    shortName: "Mechanical",
    years: "2018 – 2026",
    papersCount: 14,
    icon: Cog,
    color: "from-rose-600 to-pink-700",
    badge: "Core Branch",
    topics: [
      "Thermodynamics",
      "Fluid Mechanics",
      "Strength of Materials",
      "Manufacturing Science",
      "Theory of Machines",
      "Heat Transfer",
    ],
  },
  {
    slug: "civil-engineering",
    code: "CE",
    title: "Civil Engineering",
    shortName: "Civil",
    years: "2018 – 2026",
    papersCount: 14,
    icon: Landmark,
    color: "from-emerald-600 to-teal-700",
    badge: "Core Branch",
    topics: [
      "Structural Engineering",
      "Geotechnical Engineering",
      "Environmental Engineering",
      "Transportation",
      "Hydraulics",
      "Surveying",
    ],
  },
  {
    slug: "data-science-ai",
    code: "DA",
    title: "Data Science & Artificial Intelligence",
    shortName: "Data Science & AI",
    years: "2026",
    papersCount: 2,
    icon: BrainCircuit,
    color: "from-cyan-600 to-blue-700",
    badge: "Newly Introduced",
    topics: [
      "Probability & Statistics",
      "Linear Algebra",
      "Machine Learning",
      "AI Search Algorithms",
      "Database Management",
      "Python Data Structures",
    ],
  },
  {
    slug: "aerospace-engineering",
    code: "AE",
    title: "Aerospace Engineering",
    shortName: "Aerospace",
    years: "2018 – 2026",
    papersCount: 14,
    icon: Plane,
    color: "from-sky-600 to-blue-700",
    badge: "Two-Paper Option",
    topics: [
      "Flight Mechanics",
      "Space Dynamics",
      "Aerodynamics",
      "Aircraft Structures",
      "Propulsion",
      "Materials Science",
    ],
  },
  {
    slug: "chemical-engineering",
    code: "CH",
    title: "Chemical Engineering",
    shortName: "Chemical",
    years: "2018 – 2026",
    papersCount: 14,
    icon: FlaskConical,
    color: "from-orange-600 to-red-700",
    badge: "Core Branch",
    topics: [
      "Process Calculations",
      "Fluid Mechanics",
      "Mass Transfer",
      "Heat Transfer",
      "Chemical Reaction Engineering",
      "Plant Design",
    ],
  },
  {
    slug: "architecture-planning",
    code: "AR",
    title: "Architecture and Planning",
    shortName: "Architecture",
    years: "2018 – 2026",
    papersCount: 14,
    icon: Compass,
    color: "from-fuchsia-600 to-purple-700",
    badge: "Design & Planning",
    topics: [
      "Building Materials",
      "Town Planning",
      "Urban Design",
      "History of Architecture",
      "Building Services",
      "Sustainable Design",
    ],
  },
];

export const TEST_SERIES_PACKS = [
  {
    id: "gate-cs-2026",
    branch: "Computer Science (CS)",
    branchCode: "CS",
    title: "GATE CS 2026 Full Test Pack",
    meta: "12 Full Mocks · 30 Subject Tests · 65 Qs Official Pattern",
    price: "₹799",
    originalPrice: "₹1,999",
    badge: "Most Popular",
    status: "Registration Open",
    tagColor: "bg-blue-100 text-blue-700 border-blue-200",
    features: [
      "12 Full-Length 3-Hour Mocks with AIR Ranking",
      "30 Topic & Subject-Wise Practice Tests",
      "Real Virtual Scientific Calculator Interface",
      "NAT, MSQ & MCQ Official Exam Weightage",
      "Detailed Video & Step-by-Step Derivation Solutions",
    ],
  },
  {
    id: "gate-ec-2026",
    branch: "Electronics & Comm (EC)",
    branchCode: "EC",
    title: "GATE EC 2026 Test Series",
    meta: "10 Full Mocks · 25 Subject Tests · Real GATE Calculator",
    price: "₹799",
    originalPrice: "₹1,999",
    badge: "Highly Recommended",
    status: "Registration Open",
    tagColor: "bg-purple-100 text-purple-700 border-purple-200",
    features: [
      "10 Full-Length Mocks matching official GATE pattern",
      "25 Subject-Level Analytical Quizzes",
      "Formula Cheat-Sheet with each solution",
      "Virtual Calculator integrated in every test",
      "Detailed error and accuracy report",
    ],
  },
  {
    id: "gate-ee-2026",
    branch: "Electrical (EE)",
    branchCode: "EE",
    title: "GATE EE 2026 Test Series",
    meta: "10 Full Mocks · 25 Subject Tests · Detailed Solutions",
    price: "₹799",
    originalPrice: "₹1,999",
    badge: "Enrolling Now",
    status: "Registration Open",
    tagColor: "bg-amber-100 text-amber-700 border-amber-200",
    features: [
      "10 Full-Length EE Mock Exams",
      "25 Topic & Component Assessment Tests",
      "Power Systems, Machines & Power Electronics focus",
      "Real-time AIR & Percentile comparison",
      "Unlimited test re-attempts in review mode",
    ],
  },
  {
    id: "gate-me-2026",
    branch: "Mechanical (ME)",
    branchCode: "ME",
    title: "GATE ME 2026 Test Series",
    meta: "10 Full Mocks · 25 Subject Tests · NAT + MSQ Focus",
    price: "₹799",
    originalPrice: "₹1,999",
    badge: "Core Branch",
    status: "Registration Open",
    tagColor: "bg-rose-100 text-rose-700 border-rose-200",
    features: [
      "10 Full-Length Mock Exams",
      "25 Chapter-wise Numerical Practice Modules",
      "Thermodynamics, SOM, and Manufacturing high-weightage",
      "Numerical Answer Type (NAT) precision drills",
      "Benchmark against previous year IIT cutoffs",
    ],
  },
  {
    id: "gate-ce-2026",
    branch: "Civil (CE)",
    branchCode: "CE",
    title: "GATE CE 2026 Test Series",
    meta: "10 Full Mocks · 25 Subject Tests · IS Code References",
    price: "₹799",
    originalPrice: "₹1,999",
    badge: "Core Branch",
    status: "Registration Open",
    tagColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    features: [
      "10 Full-Length CE Mocks with IS Code references",
      "25 Subject Tests covering Soil, Structures, and Environment",
      "Complete Sectional Time-Management Metrics",
      "Detailed step-by-step solutions for every numerical question",
      "Official GATE pattern layout and controls",
    ],
  },
  {
    id: "gate-math-apt",
    branch: "Common Section",
    branchCode: "COMMON",
    title: "Engineering Math & Aptitude Booster",
    meta: "15 Specialized Section Tests · 28 Marks Weightage",
    price: "₹399",
    originalPrice: "₹999",
    badge: "Rank Decider",
    status: "Instant Access",
    tagColor: "bg-indigo-100 text-indigo-700 border-indigo-200",
    features: [
      "15 High-Yield Section Tests covering Math (13M) & Aptitude (15M)",
      "Essential for ALL engineering branches",
      "Calculus, Linear Algebra, Probability, and Verbal drills",
      "Instant step-by-step explanations and shortcut formulas",
      "Guaranteed confidence booster for the compulsory 28 marks",
    ],
  },
];

export default function ExamPrepClient() {
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();
  const { openLogin } = useAuthModal();

  const [enrollingPack, setEnrollingPack] = useState(null);
  const [showToast, setShowToast] = useState(false);

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

  // CS & IT and Electronics & Communication open their subject selectors;
  // the remaining streams keep their existing login-protected behavior.
  const handleStreamNavigate = (stream) => {
    if (["CS", "EC"].includes(stream.code)) {
      router.push(stream.path);
      return;
    }
    handleProtectedNavigate(stream.path);
  };

  const handleEnrollClick = (pack) => {
    if (!isLoggedIn) {
      openLogin();
      return;
    }
    setEnrollingPack(pack);
  };

  const handleConfirmEnroll = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setEnrollingPack(null);
    }, 2800);
  };

  const sidebarTestSeries = [
    {
      id: "gate-ts-cs",
      exam: "GATE 2026 CS & IT",
      meta: "12 Full Mocks · 65 Qs · 3.0 hrs · Virtual Calc",
      trust: "✓ Official IIT/IISc Pattern",
      iconEmoji: "🎯",
      pack: TEST_SERIES_PACKS[0],
    },
    {
      id: "gate-ts-me-ce",
      exam: "GATE 2026 Mech & Civil",
      meta: "10 Full Mocks · 25 Subject Tests · NAT + MSQ",
      trust: "✓ Detailed Step-by-Step Solutions",
      iconEmoji: "⚙️",
      pack: TEST_SERIES_PACKS[3],
    },
    {
      id: "gate-ts-ee-ec",
      exam: "GATE 2026 EE & EC",
      meta: "10 Full Tests · Power, Circuits & Signals",
      trust: "✓ Formula Cheatsheets Included",
      iconEmoji: "⚡",
      pack: TEST_SERIES_PACKS[1],
    },
    {
      id: "gate-ts-math-ga",
      exam: "GATE Math & GA Booster",
      meta: "15 Topic Tests · 28 Compulsory Marks",
      trust: "✓ High Yield Formulas Included",
      iconEmoji: "📐",
      pack: TEST_SERIES_PACKS[5],
    },
  ];

  return (
    <div className="exam-preparation-wrapper" id="gate-exam-prep-arena">
      <style dangerouslySetInnerHTML={{ __html: `
        * { box-sizing: border-box; }

        @keyframes ts-spin {
          to { transform: rotate(360deg); }
        }

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
        /* GATE colors (white bg, per-stream border/icon/button) kept exactly as-is */
        .exam-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .exam-item { min-width: 0; }

        .exam-card {
          width: 100%;
          min-height: 168px;
          border-radius: 18px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          background-image: none;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(40, 49, 90, 0.14);
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
          will-change: transform;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .exam-card::before,
        .exam-card::after {
          content: none !important;
          display: none !important;
        }

        .exam-card:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);
        }

        .exam-card:active { transform: scale(0.98); }

        .exam-card .card-body {
          width: 100%;
          height: 100%;
          background: #ffffff;
          background-image: none;
          padding: 22px 22px 18px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          box-sizing: border-box;
          position: relative;
          z-index: 1;
        }

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

        .exam-card .card-title {
          font-size: 1.05rem;
          line-height: 1.34;
          font-weight: 700;
          margin-bottom: 18px;
          max-width: 240px;
          letter-spacing: -0.01em;
          white-space: pre-line;
          color: #1e293b;
          text-align: left;
        }

       .solve-btn {
  margin-top: auto;
  align-self: flex-start;
  border-width: 1px;
  border-style: solid;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.95rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  padding: 10px 14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: fit-content;
  white-space: nowrap;
  transition: filter 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
  color: #2563eb;
  background-color: #eff6ff;
  border-color: #bfdbfe;
}

        .solve-btn:hover, .solve-btn:focus {
          filter: brightness(0.96);
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
          transform: translateY(-1px);
        }

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

        /* ── TEST SERIES CARDS (ROTATING GRADIENT BORDER) ── */
        .ts-card-wrap {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          padding: 2px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          transform: translateZ(0);
          transition: transform 0.22s ease;
          will-change: transform;
        }

        .ts-card-wrap::before {
          content: "";
          position: absolute;
          inset: -40px;
          background: conic-gradient(
            #38bdf8 0deg,
            #2563eb 60deg,
            #4f46e5 120deg,
            #818cf8 180deg,
            #4f46e5 240deg,
            #2563eb 300deg,
            #38bdf8 360deg
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
          width: 100%;
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
          background: #eff6ff;
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
          font-size: 13px;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.25;
          margin-bottom: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ts-meta {
          font-size: 10.5px;
          color: #64748b;
          font-weight: 500;
          line-height: 1.2;
        }

        .ts-trust {
          font-size: 10px;
          color: #2563eb;
          font-weight: 700;
          margin-top: 2px;
        }

        .ts-join-btn {
          flex-shrink: 0;
          background: linear-gradient(160deg, #2563eb 0%, #1d4ed8 100%);
          color: #ffffff;
          border: none;
          border-radius: 12px;
          padding: 8px 12px;
          font-size: 11px;
          font-weight: 800;
          text-align: center;
          cursor: pointer;
          line-height: 1.3;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
          transition: opacity 0.18s, transform 0.15s;
        }

        .ts-join-btn:hover { opacity: 0.92; transform: scale(1.03); }

        .ts-join-btn .join-top {
          display: block;
          font-size: 8.5px;
          font-weight: 700;
          opacity: 0.88;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 1px;
        }

        .ts-join-btn .join-main {
          display: block;
          font-size: 11.5px;
          font-weight: 900;
        }

        /* ── SIDEBAR TOOLKIT CARD ── */
        .sidebar-toolkit-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 16px;
          box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
        }

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
              <div className="daily-goal-card" id="gate-daily-goal-widget">
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
                      👋 Hey, {user?.name?.split(" ")[0] || "GATE Aspirant"}
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
                <h1>Choose GATE Stream &amp; Start Practice</h1>
                <p>Computer Science • Electronics • Electrical • Mechanical • Civil • Data Science • Aerospace • Chemical • Architecture</p>
              </div>

              {/* ── PRIMARY STREAM CARDS GRID (ORIGINAL COLORS, WHITE CARD BG) ── */}
              <div className="exam-grid" id="gate-stream-cards-grid">
                {GATE_STREAM_CARDS.map((stream) => {
                  const IconComponent = stream.icon;
                  return (
                    <div className="exam-item" key={stream.code}>
                      <div
                        className="exam-card"
                        style={{
                          backgroundColor: stream.cardBg,
                          borderColor: stream.borderColor,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = stream.btnBorder || "#cbd5e1";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = stream.borderColor;
                        }}
                        onClick={() => handleStreamNavigate(stream)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Start practicing ${stream.title.replace(/\n/g, " ")}`}
                      >
                        <div className="card-body">
                          {IconComponent && (
                            <div className="card-icon-wrap">
                              <IconComponent
                                className="card-stream-icon"
                                style={{ color: stream.iconColor }}
                                strokeWidth={1.8}
                              />
                            </div>
                          )}
                          <div className="card-title">{stream.title}</div>
                          <button
  className="solve-btn cursor-pointer"
  onClick={(e) => {
    e.stopPropagation();
    handleStreamNavigate(stream);
  }}
>
  <span>Start Solving</span>
  <span style={{ color: "#2563eb", fontWeight: 800 }}>→</span>
</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>{/* /main-exams-section */}

          </div>{/* /main-panel */}

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* ══ 2. SIDEBAR PANEL (WITH PROFILE & TEST SERIES) ══ */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <div className="sidebar-panel" id="gate-sidebar-panel">

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

            {/* Test Series Cards (Rotating Gradient Border) */}
            {sidebarTestSeries.map((ts) => (
              <div
                key={ts.id}
                className="ts-card-wrap"
                onClick={() => handleEnrollClick(ts.pack)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleEnrollClick(ts.pack)}
                aria-label={`Join ${ts.exam}`}
              >
                <div className="ts-card-inner">
                  <div className="ts-card-main-content">
                    <div className="ts-icon">{ts.iconEmoji}</div>
                    <div className="ts-text">
                      <div className="ts-title">{ts.exam}</div>
                      <div className="ts-meta">{ts.meta}</div>
                      <div className="ts-trust">{ts.trust}</div>
                    </div>
                  </div>

                  <button
                    className="ts-join-btn cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEnrollClick(ts.pack);
                    }}
                  >
                    <span className="join-top">JOIN</span>
                    <span className="join-main">Test Series</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Quick Toolkit Card */}
            <div className="sidebar-toolkit-card space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  GATE Preparation Tools
                </h4>
              </div>

              <div className="space-y-1.5 text-xs">
                <Link
                  href="/gate/resources"
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-primary" />
                    <span>Virtual Calculator Practice</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  href="/rank-predictor"
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <span>GATE Rank Predictor</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  href="/gate/resources"
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>Formula Sheets &amp; Notes</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  href="/gate/resources"
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-purple-600" />
                    <span>IIT &amp; NIT M.Tech Cutoffs</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* GATE 2026 Preparation Motivation Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-blue-200">
                <Calendar className="w-3.5 h-3.5" />
                <span>GATE 2026 Strategy</span>
              </div>
              <p className="text-xs font-semibold leading-relaxed">
                Consistency wins GATE. Solving 5 questions daily gives you 1,800+ solved previous year problems before the exam day!
              </p>
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full mt-1 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
              >
                Track Daily Progress
              </button>
            </div>

          </div>{/* /sidebar-panel */}

        </div>{/* /exam-layout */}
      </div>{/* /exam-page-shell */}

      {/* ── ENROLLMENT MODAL ── */}
      {enrollingPack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 uppercase">
                  {enrollingPack.branch}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  {enrollingPack.title}
                </h3>
              </div>
              <button
                onClick={() => setEnrollingPack(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Special Batch Offer:</span>
                <span className="text-emerald-700 font-bold">60% Discount Applied</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900">{enrollingPack.price}</span>
                <span className="text-sm text-slate-400 line-through">{enrollingPack.originalPrice}</span>
                <span className="text-xs text-slate-500 font-medium">(Lifetime Validity)</span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600">
              <p className="font-bold text-slate-900">What's included in this pack:</p>
              {enrollingPack.features.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleConfirmEnroll}
                className="flex-1 py-3 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Enroll in Batch ({enrollingPack.price})</span>
              </button>

              <a
                href={`https://wa.me/918287426663?text=Hi,%20I%20am%20interested%20in%20joining%20${encodeURIComponent(enrollingPack.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>WhatsApp Counselor</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── ENROLLMENT TOAST CONFIRMATION ── */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 text-white px-5 py-3.5 rounded-2xl shadow-xl border border-emerald-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <p className="text-xs font-bold text-white">Enrollment Request Received!</p>
            <p className="text-[11px] text-emerald-200">Our mentors will activate your test series access.</p>
          </div>
        </div>
      )}
    </div>
  );
}
