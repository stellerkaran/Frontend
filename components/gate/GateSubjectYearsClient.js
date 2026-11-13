"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  FileText,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  Clock,
  Sparkles,
  Zap,
  ExternalLink,
  Layers,
  Binary,
  Workflow,
  Cpu,
  Network,
  Database,
  Server,
  Code2,
  CircuitBoard,
  Sigma,
  Compass,
} from "lucide-react";

// Icon mapping helper (matches GateCSSubjectsClient / GateCSSubjectPracticeClient)
const ICON_MAP = {
  Binary,
  Workflow,
  Cpu,
  Network,
  Database,
  Server,
  Code2,
  CircuitBoard,
  Sigma,
  Compass,
};
import { GATE_PDS_YEARS_DATA } from "@/src/data_Exam/Gate/GatePDSYearData";
import { GATE_CS_SUBJECTS } from "@/src/data_Exam/Gate/GateCSData";

export default function GateSubjectYearsClient({
  subjectSlug = "programming-data-structures",
  branchCode = "CS",
  branchName = "Computer Science & IT"
}) {
  const router = useRouter();

  // Find metadata for current subject
  const currentSubject = useMemo(() => {
    return (
      GATE_CS_SUBJECTS.find((s) => s.slug === subjectSlug) || {
        title: "Programming & Data Structures",
        slug: "programming-data-structures",
        code: "PDS",
      }
    );
  }, [subjectSlug]);

  const SubjectIcon = ICON_MAP[currentSubject.iconName] || Binary;
  const subjectAccentColor = currentSubject.accentColor || "#2563eb";

  // Selected year filter (default: "All")
  const [selectedYear, setSelectedYear] = useState("All");

  // Expanded year cards (map of year -> boolean)
  const [expandedYears, setExpandedYears] = useState({});

  // Extract all distinct years descending, restricted to 2015–2026
  const yearsList = useMemo(() => {
    return GATE_PDS_YEARS_DATA
      .filter((item) => item.year >= 2015 && item.year <= 2026)
      .map((item) => item.year);
  }, []);

  // Total papers count (2015–2026 only)
  const totalPapersCount = useMemo(() => {
    return GATE_PDS_YEARS_DATA
      .filter((item) => item.year >= 2015 && item.year <= 2026)
      .reduce((sum, item) => sum + item.papersCount, 0);
  }, []);

  // Filtered years data (2015–2026 only, further filtered by selected year)
  const filteredData = useMemo(() => {
    const inRange = GATE_PDS_YEARS_DATA.filter(
      (item) => item.year >= 2015 && item.year <= 2026
    );
    if (selectedYear === "All") {
      return inRange;
    }
    return inRange.filter(
      (item) => item.year.toString() === selectedYear.toString()
    );
  }, [selectedYear]);

  // Toggle year expansion
  const toggleYearExpand = (year) => {
    setExpandedYears((prev) => ({
      ...prev,
      [year]: !prev[year],
    }));
  };

  return (
    <div className="min-h-screen bg-[#f0f4f9] text-slate-900 flex flex-col font-sans" id="gate-subject-years-page">
      {/* ── TOP APP BAR (Exact layout matching user reference image) ── */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3.5">
          {/* Back Button */}
          <button
            onClick={() => router.push("/gate/pyq/computer-science")}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Go back to Computer Science subjects"
            title="Back to CS Subjects"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Subject emblem (matches the subject's own card icon & color) */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-xs shrink-0"
            style={{ backgroundColor: subjectAccentColor }}
          >
            <SubjectIcon className="w-5 h-5 text-white" strokeWidth={2.3} />
          </div>

          {/* Title & Subtitle block */}
          <div className="flex-1 min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight truncate">
              {currentSubject.title}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5 tracking-normal">
              2015 - 2026 | {totalPapersCount} PYQ Tests
            </p>
          </div>
        </div>

        {/* ── HORIZONTAL YEAR PILLS SCROLLER (No Filter Button, No Showing All Mock Card) ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5 overflow-x-auto no-scrollbar flex items-center gap-2">
          {/* "All" Pill */}
          <button
            onClick={() => setSelectedYear("All")}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap border ${
              selectedYear === "All" ? "text-white shadow-xs" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
            }`}
            style={
              selectedYear === "All"
                ? { backgroundColor: subjectAccentColor, borderColor: subjectAccentColor }
                : undefined
            }
          >
            All
          </button>

          {/* Year Pills descending from 2026 to 2015 */}
          {yearsList.map((yr) => {
            const isSelected = selectedYear.toString() === yr.toString();
            return (
              <button
                key={yr}
                onClick={() => {
                  setSelectedYear(yr.toString());
                  // Automatically expand this year for fast access
                  setExpandedYears((prev) => ({
                    ...prev,
                    [yr]: true,
                  }));
                }}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap border ${
                  isSelected
                    ? "text-white font-semibold shadow-xs"
                    : "bg-white text-slate-700 font-medium border-slate-300 hover:bg-slate-50"
                }`}
                style={
                  isSelected
                    ? { backgroundColor: subjectAccentColor, borderColor: subjectAccentColor }
                    : undefined
                }
              >
                {yr}
              </button>
            );
          })}
        </div>
      </header>

      {/* ── MAIN CONTENT CONTAINER (Cards List) ── */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-5 sm:py-6 space-y-3">
        {filteredData.map((yearItem) => {
          const isExpanded = expandedYears[yearItem.year] ?? (selectedYear !== "All");

          return (
            <div
              key={yearItem.year}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-sm transition-all duration-200 overflow-hidden"
            >
              {/* Year Header Card */}
              <div
                onClick={() => toggleYearExpand(yearItem.year)}
                className="w-full px-5 py-4 sm:py-4.5 flex items-center justify-between cursor-pointer select-none hover:bg-slate-50/70 transition-colors"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && toggleYearExpand(yearItem.year)}
                aria-expanded={isExpanded}
              >
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    GATE {yearItem.year} Question Papers
                  </span>
                  <span
                    className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${subjectAccentColor}18`,
                      color: subjectAccentColor,
                    }}
                  >
                    {yearItem.papersCount} {yearItem.papersCount === 1 ? "Paper" : "Papers"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full hidden sm:inline-block ${
                      yearItem.year >= 2024
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {yearItem.year >= 2024 ? "Latest Pattern" : "Solved PYQ"}
                  </span>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 group-hover:text-slate-600 transition-colors">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </div>

              {/* Collapsible Year Papers Content */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-3 bg-slate-50/40">
                  {yearItem.papers.map((paper, pIdx) => {

                    return (
                      <div
                        key={paper.id || pIdx}
                        className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs transition-all"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                                {paper.title}
                              </h3>
                              <span
                                className="text-[11px] font-bold px-2 py-0.5 rounded-md border"
                                style={{
                                  backgroundColor: `${subjectAccentColor}12`,
                                  color: subjectAccentColor,
                                  borderColor: `${subjectAccentColor}33`,
                                }}
                              >
                                {paper.shift || "Full Paper"}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 mt-1.5 text-xs text-slate-500">
                              <span className="flex items-center gap-1 font-medium">
                                <FileText className="w-3.5 h-3.5 text-slate-400" />
                                {paper.questionsCount || 10} Questions
                              </span>
                              <span className="flex items-center gap-1 font-medium">
                                <Award className="w-3.5 h-3.5 text-slate-400" />
                                {paper.marks || 15} Marks
                              </span>
                              <span className="flex items-center gap-1 font-medium text-emerald-600">
                                <Sparkles className="w-3.5 h-3.5" />
                                {paper.difficulty || "Moderate"}
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 shrink-0">
                            <Link
                              href={`/gate/attempt/cs/${subjectSlug}/${yearItem.year}/${pIdx + 1}`}
                              className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer hover:brightness-110"
                              style={{ backgroundColor: subjectAccentColor }}
                            >
                              <Zap className="w-3.5 h-3.5 fill-current" />
                              Start Practice Now
                            </Link>
                          </div>
                        </div>

                        {/* Topics badges */}
                        {paper.topics && paper.topics.length > 0 && (
                          <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                              Topics:
                            </span>
                            {paper.topics.map((topicName, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                              >
                                {topicName}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {filteredData.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-md mx-auto my-8">
            <p className="text-slate-600 font-bold text-sm mb-3">
              No question papers found for {selectedYear}
            </p>
            <button
              onClick={() => setSelectedYear("All")}
              className="px-4 py-2 text-white font-bold rounded-xl text-xs cursor-pointer hover:brightness-110"
              style={{ backgroundColor: subjectAccentColor }}
            >
              Show All {totalPapersCount} Papers
            </button>
          </div>
        )}
      </main>
    </div>
  );
}