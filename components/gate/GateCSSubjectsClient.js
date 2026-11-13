"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Binary,
  Workflow,
  Cpu,
  Network,
  Database,
  Sparkles,
  Server,
  Code2,
  CircuitBoard,
  Sigma,
  Compass,
  ArrowLeft,
  ArrowRight,
  Search,
  CheckCircle2,
  BookOpen,
  Award,
  TrendingUp,
  Layers,
  ChevronRight,
  FileText,
  Filter,
  Zap,
  Activity,
  Radio,
  Sliders,
  Gauge,
} from "lucide-react";
import { GATE_CS_SUBJECTS } from "@/src/data_Exam/Gate/GateCSData";

// Icon mapping helper
const ICON_MAP = {
  Binary,
  Workflow,
  Cpu,
  Network,
  Database,
  Sparkles,
  Server,
  Code2,
  CircuitBoard,
  Sigma,
  Compass,
  Zap,
  Activity,
  Radio,
  Sliders,
  Gauge,
  FileText,
  Layers,
};

export default function GateCSSubjectsClient({
  subjects = GATE_CS_SUBJECTS,
  streamLabel = "GATE CS & IT",
  routePrefix = "computer-science",
  coreFilterLabel = "Core Subjects (7+ M)",
  questionBankLabel,
  isEEGrid = false,
  isTwoColumnGrid = false,
}) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const isParallelGrid =
    isTwoColumnGrid ||
    isEEGrid ||
    routePrefix === "electrical-engineering" ||
    routePrefix === "electronics-communication";

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      // Filter category
      if (selectedFilter === "core" && subject.weightageNum < 7) return false;
      if (selectedFilter === "compulsory" && !["MATH", "GA", "EM"].includes(subject.code)) return false;
      if (selectedFilter === "quick" && subject.weightageNum > 6) return false;

      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchTitle = subject.title.toLowerCase().includes(q);
      const matchCode = subject.code?.toLowerCase().includes(q);
      const matchTopics = subject.topics?.some((t) => t.toLowerCase().includes(q));
      const matchDesc = subject.description?.toLowerCase().includes(q);

      return matchTitle || matchCode || matchTopics || matchDesc;
    });
  }, [subjects, searchQuery, selectedFilter]);

  return (
    <div
      className={`gate-cs-wrapper ${isParallelGrid ? "parallel-layout" : ""}`}
      id="gate-cs-subjects-portal"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* Main background and shell */
        .gate-cs-wrapper {
          min-height: 100vh;
          padding: 24px 20px 52px;
          background: #f3f6fc;
          position: relative;
          overflow-x: hidden;
        }

        .gate-cs-shell {
          max-width: 760px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Default 1-column layout for subjects */
        .subjects-grid {
          display: flex;
          flex-direction: column;
          gap: 18px;
          max-width: 580px;
          margin: 0 auto;
        }

        /* ── 2-column desktop parallel layout for Electrical & Electronics Engineering ── */
        .gate-cs-wrapper.parallel-layout .gate-cs-shell {
          max-width: 1240px;
        }

        @media (min-width: 960px) {
          .gate-cs-wrapper.parallel-layout .subjects-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 580px));
            gap: 20px 24px;
            max-width: 1200px;
            margin: 0 auto;
            justify-content: center;
          }
        }

        @media (max-width: 1180px) and (min-width: 960px) {
          .gate-cs-wrapper.parallel-layout .subjects-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
          }
        }

        /* Consistent Card Style across all streams */
        .subject-card {
          position: relative;
          min-height: 132px;
          padding: 22px 100px 20px 24px;
          overflow: hidden;
          border: 1px solid;
          border-radius: 18px;
          background: #ffffff !important;
          box-shadow: 0 5px 12px rgba(15,23,42,.12);
          transition: transform .2s ease, box-shadow .2s ease, filter .2s ease;
          cursor: pointer;
          box-sizing: border-box;
          width: 100%;
        }

        .subject-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          border-radius: inherit;
          background: linear-gradient(115deg, rgba(255,255,255,.65), rgba(255,255,255,0) 38%);
        }

        .subject-card::after {
          content: "";
          position: absolute;
          z-index: 0;
          top: 50%;
          right: -38px;
          width: 170px;
          height: 170px;
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          background: var(--gate-cs-accent, rgba(96,165,250,.2));
          transform: translateY(-50%);
        }

        .subject-card:hover, .subject-card:focus-visible {
          transform: translateY(-2px);
          box-shadow: 0 10px 22px rgba(15,23,42,.16);
          filter: brightness(1.01);
          outline: none;
        }

        .subject-icon-box {
          position: absolute;
          z-index: 1;
          top: 50%;
          right: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border: 0 !important;
          border-radius: 16px;
          transform: translateY(-50%);
          color: #fff !important;
          background: var(--gate-cs-icon, #2563eb) !important;
          box-shadow: 0 7px 15px rgba(0,0,0,.2);
        }

        .subject-title {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 13px;
          max-width: 475px;
          color: #111827;
          font-size: clamp(1.15rem, 2.4vw, 1.6rem);
          font-weight: 850;
          line-height: 1.18;
          letter-spacing: -.025em;
        }

        .subject-arrow {
          flex: 0 0 auto;
          width: 26px;
          height: 26px;
          stroke-width: 2.5;
        }

        .subject-desc {
          position: relative;
          z-index: 1;
          margin-top: 12px;
          color: #5b6b85;
          font-size: clamp(.88rem, 2vw, 1.05rem);
          font-weight: 500;
        }

        @media (max-width: 600px) {
          .gate-cs-wrapper { padding: 18px 14px 38px; }
          .subjects-grid { gap: 16px; }
          .subject-card { min-height: 126px; padding: 23px 88px 20px 20px; border-radius: 16px; }
          .subject-icon-box { right: 17px; width: 52px; height: 52px; border-radius: 13px; }
          .subject-title { font-size: clamp(1.05rem, 5vw, 1.35rem); gap: 8px; }
          .subject-arrow { width: 22px; height: 22px; }
          .subject-desc { margin-top: 8px; font-size: .86rem; }
        }
      `,
        }}
      />

      <div className="gate-cs-shell">
        {/* Subjects Grid */}
        <div className="subjects-grid" id="gate-cs-subjects-grid">
          {filteredSubjects.map((subject) => {
            const IconComponent = ICON_MAP[subject.iconName] || Cpu;
            const chaptersCount = subject.chaptersCount || subject.topics?.length || 5;

            return (
              <div
                key={subject.id}
                className="subject-card"
                style={{
                  borderColor: subject.accentColor,
                  "--gate-cs-accent": `${subject.accentColor}42`,
                  "--gate-cs-icon": subject.accentColor,
                }}
                onClick={() =>
                  router.push(`/gate/pyq/${routePrefix}/${subject.slug}`)
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  router.push(`/gate/pyq/${routePrefix}/${subject.slug}`)
                }
              >
                <div
                  className="subject-icon-box"
                  style={{
                    backgroundColor: subject.accentColor,
                  }}
                >
                  <IconComponent className="w-7 h-7" strokeWidth={2} />
                </div>
                <div className="subject-title">
                  {subject.title}
                  <ChevronRight className="subject-arrow" aria-hidden="true" />
                </div>
                <div className="subject-desc">{chaptersCount} Chapters</div>
              </div>
            );
          })}
        </div>

        {filteredSubjects.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 mt-4 max-w-lg mx-auto">
            <p className="text-slate-600 font-bold text-base mb-2">
              No subjects found matching &quot;{searchQuery}&quot;
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedFilter("all");
              }}
              className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs"
            >
              Clear Search Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
