"use client";

import React, { useState, useEffect, useMemo, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AdBanner from "@/components/AdBanner";
import PdfMultiPageViewer from "./PdfMultiPageViewer";
import {
  Download,
  ExternalLink,
  FileText,
  Clock,
  Share2,
  School,
  Layers,
  Info,
  Calendar,
} from "lucide-react";

// Drive helper utilities
export function extractDriveId(url) {
  if (!url) return null;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) return match[1];
  const idParam = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idParam && idParam[1]) return idParam[1];
  return null;
}

export function getDrivePreviewUrl(url) {
  const id = extractDriveId(url);
  if (!id) return url;
  return `https://drive.google.com/file/d/${id}/preview`;
}

export function getDriveDirectDownloadUrl(url) {
  const id = extractDriveId(url);
  if (!id) return url;
  return `https://drive.google.com/uc?export=download&id=${id}`;
}

function defaultSlugify(subject) {
  return subject
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ---------- Leaderboard Ad 728x90 (Desktop only, hidden on mobile) ----------
function LeaderboardAd({ slot, className = "" }) {
  const adRef = useRef(null);
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.adsbygoogle && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {}
  }, []);

  return (
    <div
      className={`hidden md:flex justify-center mb-5 ${className}`}
      style={{
        width: "100%",
        overflow: "hidden",
        background: "#f1f5f9",
        borderRadius: 10,
        minHeight: 90,
      }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%", maxWidth: 728, height: 90 }}
        data-ad-client="ca-pub-9939857316410378"
        data-ad-slot={slot}
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      />
    </div>
  );
}

const DEFAULT_BTECH_SEMESTERS = [
  { name: "1st Semester", href: "/resources/jharkhand-btech/semester-1", sem: 1 },
  { name: "2nd Semester", href: "/resources/jharkhand-btech/semester-2", sem: 2 },
  { name: "3rd Semester - CSE", href: "/resources/jharkhand-btech/semester-3-cse", sem: 3 },
  { name: "All Resources", href: "/resources", sem: null },
];
const DEFAULT_DIPLOMA_SEMESTERS = [
  { name: "1st Semester", href: "/resources/jharkhand-diploma/semester-1", sem: 1 },
  { name: "2nd Semester", href: "/resources/jharkhand-diploma/semester-2", sem: 2 },
  { name: "3rd Semester", href: "/resources/jharkhand-diploma/semester-3", sem: 3 },
  { name: "4th Semester", href: "/resources/jharkhand-diploma/semester-4-mech", sem: 4 },
  { name: "5th Semester", href: "/resources/jharkhand-diploma/semester-5", sem: 5 },
  { name: "6th Semester", href: "/resources/jharkhand-diploma/semester-6", sem: 6 },
  { name: "All Resources", href: "/resources", sem: null },
];

function PdfViewerContent({
  semesterBadge = "JUT Ranchi • Jharkhand B.Tech",
  categoryTitle = "Jharkhand B.Tech",
  allSubjects = [],
  years = [2025, 2024, 2023],
  defaultYear,
  subjectDetails = {},
  papers = {},
  basePath,
  sharedPdfGroups = {},
  readerTitle = "Jharkhand B.Tech PYQ",
  scanLabel = "100% Official JUT Scan",
  examBoard = "JUT Ranchi",
  examMarks = "70 External + 30 Sessional",
  browseSubjectsTitle,
  semestersNav = DEFAULT_BTECH_SEMESTERS,
  currentSemester,
  classPrefix = "pdf",
  slugifySubject = defaultSlugify,
  papersList,
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL query params
  const subjectParam = searchParams.get("subject") || searchParams.get("sub");
  const yearParam = searchParams.get("year");
  const fileParam = searchParams.get("file") || searchParams.get("url");

  // Build papers map from list format if provided (e.g. [{year, subject, url}])
  const normalizedPapers = useMemo(() => {
    if (papersList && Array.isArray(papersList) && papersList.length > 0) {
      const map = {};
      for (const item of papersList) {
        if (!map[item.year]) map[item.year] = {};
        map[item.year][item.subject] = item.url;
      }
      return map;
    }
    return papers;
  }, [papersList, papers]);

  // Determine active subject
  const currentSubject = useMemo(() => {
    if (!subjectParam) return allSubjects[0] || "";
    const clean = subjectParam.toLowerCase().trim();
    const slugMatch = allSubjects.find((s) => slugifySubject(s) === clean);
    if (slugMatch) return slugMatch;
    const directMatch = allSubjects.find((s) => s.toLowerCase().trim() === clean);
    if (directMatch) return directMatch;
    // Keep the raw param only if it actually maps to a paper entry (custom subjects)
    const rawHasPaper = Object.keys(normalizedPapers).some(
      (k) => normalizedPapers[k] && normalizedPapers[k][subjectParam]
    );
    if (rawHasPaper) return subjectParam;
    // Unknown subject param (e.g. legacy "Full Question Paper" deep links):
    // fall back to the first subject that actually has a paper for the
    // requested year (or any year) so the viewer still renders a PDF.
    const y = yearParam ? parseInt(yearParam, 10) : NaN;
    const hasPaper = (s, yr) => !!(normalizedPapers[yr] && normalizedPapers[yr][s]);
    const anyPaper = (s) => Object.keys(normalizedPapers).some((k) => hasPaper(s, k));
    return (
      (Number.isFinite(y) && allSubjects.find((s) => hasPaper(s, y))) ||
      allSubjects.find(anyPaper) ||
      allSubjects[0] ||
      subjectParam
    );
  }, [subjectParam, allSubjects, slugifySubject, normalizedPapers, yearParam]);

  // Determine initial selected year
  const initialYear = useMemo(() => {
    if (yearParam) {
      const parsed = parseInt(yearParam, 10);
      if (years.includes(parsed)) return parsed;
    }
    if (defaultYear && years.includes(defaultYear)) return defaultYear;
    return years[0] || 2024;
  }, [yearParam, defaultYear, years]);

  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloadTriggered, setDownloadTriggered] = useState(false);
  const [isDiploma, setIsDiploma] = useState(false);

  // Sync selected year if URL param changes
  useEffect(() => {
    if (yearParam) {
      const y = parseInt(yearParam, 10);
      if (years.includes(y)) {
        setSelectedYear(y);
      }
    }
  }, [yearParam, years]);
  
  // Detect if this is a diploma semester based on basePath
  useEffect(() => {
    setIsDiploma(basePath && basePath.includes('/jharkhand-diploma/'));
  }, [basePath]);

  // Resolve paper links
  const rawDriveUrl = useMemo(() => {
    if (fileParam) return fileParam;
    const y = parseInt(selectedYear, 10);
    if (normalizedPapers && normalizedPapers[y] && normalizedPapers[y][currentSubject]) {
      return normalizedPapers[y][currentSubject];
    }
    return null;
  }, [fileParam, selectedYear, currentSubject, normalizedPapers]);

  const previewUrl = useMemo(() => {
    if (!rawDriveUrl) return null;
    return getDrivePreviewUrl(rawDriveUrl);
  }, [rawDriveUrl]);

  const downloadUrl = useMemo(() => {
    if (!rawDriveUrl) return null;
    return getDriveDirectDownloadUrl(rawDriveUrl);
  }, [rawDriveUrl]);

  // Detect if the current subject belongs to a shared-URL group so the PDF doesn't visually change
  const sharedPdfGroupInfo = useMemo(() => {
    if (!sharedPdfGroups || Object.keys(sharedPdfGroups).length === 0) return null;
    const yearGroups = sharedPdfGroups[selectedYear];
    if (!yearGroups) return null;
    for (const [canonicalSubject, groupSubjects] of Object.entries(yearGroups)) {
      if (groupSubjects.includes(currentSubject)) {
        return { canonicalSubject, groupSubjects, count: groupSubjects.length };
      }
    }
    return null;
  }, [sharedPdfGroups, selectedYear, currentSubject]);

  const subjectMeta = subjectDetails[currentSubject] || {
    code: "BTECH-CORE",
    type: "Core Engineering",
    branch: "Common for all Branches",
    topics: ["Important PYQ Questions", "Repeated Model Problems", "Previous Year Question Paper Analysis"],
    tips: "Solve questions with clear diagrams, proper derivations, and structured point-wise answers to maximize marks.",
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    const params = new URLSearchParams(searchParams.toString());
    params.set("year", year.toString());
    params.set("subject", currentSubject);
    router.replace(`${basePath}?${params.toString()}`);
  };

  const handleSubjectChange = (newSubject) => {
    let targetYear = selectedYear;
    const curYearHasPaper = normalizedPapers && normalizedPapers[selectedYear] && normalizedPapers[selectedYear][newSubject];
    if (!curYearHasPaper) {
      for (const y of years) {
        if (normalizedPapers && normalizedPapers[y] && normalizedPapers[y][newSubject]) {
          targetYear = y;
          break;
        }
      }
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("subject", newSubject);
    params.set("year", targetYear.toString());
    params.delete("file");
    params.delete("url");
    setSelectedYear(targetYear);
    router.push(`${basePath}?${params.toString()}`);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const url = window.location.href;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2200);
        });
      }
    }
  };

  const handleDownload = () => {
    setDownloadTriggered(true);
    setTimeout(() => setDownloadTriggered(false), 3000);
    if (downloadUrl) {
      window.open(downloadUrl, "_blank", "noopener,noreferrer");
    } else if (rawDriveUrl) {
      window.open(rawDriveUrl, "_blank", "noopener,noreferrer");
    }
  };

  const currentBrowseSubjectsTitle =
    browseSubjectsTitle || `Browse Other ${categoryTitle} Subjects`;

  return (
    <div className={`${classPrefix}-view-wrapper ${isFullscreen ? "is-fullscreen" : ""}`}>
      {/* ── STYLES ── */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .${classPrefix}-view-wrapper {
          min-height: 100vh;
          background: #f8fafc;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #0f172a;
          padding-bottom: 60px;
        }

        .${classPrefix}-view-container {
          max-width: 1560px;
          margin: 16px auto 0;
          padding: 0 16px;
        }

        /* 3-Column Layout: Left Sidebar | PDF | Right Sidebar */
        .${classPrefix}-layout-grid {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 16px;
          width: 100%;
        }

        .${classPrefix}-sidebar-ad-col {
          display: none;
          width: 280px;
          flex-shrink: 0;
        }

        .${classPrefix}-sidebar-sticky {
          position: sticky;
          top: 72px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .${classPrefix}-sidebar-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 10px;
          box-shadow: 0 1px 4px rgba(15, 23, 42, 0.04);
          text-align: center;
          overflow: hidden;
        }

        .${classPrefix}-sidebar-card-label {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #94a3b8;
          margin-bottom: 6px;
        }

        .${classPrefix}-center-col {
          flex: 1 1 0%;
          min-width: 0;
          max-width: 920px;
          width: 100%;
        }

        /* Visible on desktop screens >= 1024px */
        @media (min-width: 1024px) {
          .${classPrefix}-sidebar-ad-col {
            display: block;
          }
        }

        @media (min-width: 1024px) and (max-width: 1280px) {
          .${classPrefix}-sidebar-ad-col {
            width: 220px;
          }
          .${classPrefix}-center-col {
            max-width: 780px;
          }
        }

        /* Top Action Bar / Download Banner */
        .${classPrefix}-action-hero {
          background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 55%, #3b82f6 100%);
          border-radius: 14px;
          padding: 18px 22px;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          box-shadow: 0 8px 20px -4px rgba(37, 99, 235, 0.28);
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .${classPrefix}-download-primary-btn {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff !important;
          border: none;
          padding: 11px 24px;
          border-radius: 10px;
          font-size: 0.98rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
          transition: all 0.2s ease;
          text-decoration: none;
          white-space: nowrap;
        }

        .${classPrefix}-download-primary-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(16, 185, 129, 0.45);
          filter: brightness(1.04);
        }

        .${classPrefix}-download-primary-btn:active {
          transform: translateY(0);
        }

        /* PDF Viewer Stage */
        .${classPrefix}-viewer-stage {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05);
          position: relative;
        }

        @media (max-width: 768px) {
          .${classPrefix}-action-hero {
            padding: 16px 18px;
            flex-direction: column;
            align-items: stretch;
            text-align: center;
          }
          .${classPrefix}-download-primary-btn {
            justify-content: center;
            width: 100%;
          }
        }

        /* Fullscreen Mode */
        .${classPrefix}-view-wrapper.is-fullscreen {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #000;
          padding: 0;
          margin: 0;
          height: 100vh;
          overflow: hidden;
        }

        .${classPrefix}-view-wrapper.is-fullscreen .${classPrefix}-action-hero,
        .${classPrefix}-view-wrapper.is-fullscreen .${classPrefix}-bottom-sections {
          display: none !important;
        }

        .${classPrefix}-view-wrapper.is-fullscreen .${classPrefix}-view-container {
          max-width: 100%;
          margin: 0;
          padding: 0;
          height: 100vh;
        }

        .${classPrefix}-view-wrapper.is-fullscreen .${classPrefix}-viewer-stage {
          height: 100vh;
          border-radius: 0;
          border: none;
        }

        .${classPrefix}-subject-chip {
          padding: 8px 14px;
          border-radius: 10px;
          font-size: 0.84rem;
          font-weight: 600;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          color: #334155;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.15s ease;
          cursor: pointer;
        }
        .${classPrefix}-subject-chip:hover {
          border-color: #2563eb;
          color: #2563eb;
          background: #eff6ff;
        }
        .${classPrefix}-subject-chip.active {
          background: #eff6ff;
          border-color: #3b82f6;
          color: #1d4ed8;
          font-weight: 700;
        }

        /* Shared PDF source warning */
        .${classPrefix}-shared-url-notice {
          background: linear-gradient(135deg, #fffbeb 0%, #fef9c3 100%);
          border: 1px solid #fde68a;
          border-radius: 10px;
          padding: 10px 14px;
          margin-bottom: 12px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.8rem;
          color: #92400e;
        }
        .${classPrefix}-shared-url-notice-icon {
          flex-shrink: 0;
          margin-top: 1px;
          color: #d97706;
        }
        .${classPrefix}-shared-url-notice strong {
          color: #b45309;
        }
        .${classPrefix}-shared-url-notice code {
          background: rgba(180, 83, 9, 0.08);
          padding: 1px 5px;
          border-radius: 4px;
          font-size: 0.75rem;
          color: #92400e;
        }
      `,
        }}
      />

      {/* ── MAIN CONTAINER ── */}
      <div className={`${classPrefix}-view-container`}>
        {/* ── SHARED URL WARNING ── */}
        {sharedPdfGroupInfo && (
          <div className={`${classPrefix}-shared-url-notice`} role="note" aria-label="Shared PDF notice">
            <span className={`${classPrefix}-shared-url-notice-icon`}>
              <Info className="w-4 h-4" />
            </span>
            <span>
              <strong>Note:</strong> All {sharedPdfGroupInfo.count} subjects for <strong>{selectedYear}</strong> use one combined
              question paper PDF — switching subjects shows the same document (each subject's questions are included
              together). The PDF is filterable by topic using the Drive viewer toolbar.
            </span>
          </div>
        )}

        {/* ── HERO & DOWNLOAD BAR ── */}
        <header className={`${classPrefix}-action-hero`} id="pdf-header-hero">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold text-blue-100 mb-2.5">
              <School className="w-3.5 h-3.5 text-yellow-300" />
              <span>{semesterBadge}</span>
              <span className="bg-yellow-400 text-slate-900 px-2 py-0.5 rounded-full font-bold text-[10px]">
                Year {selectedYear}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white mb-1">
             {currentSubject}
            </h1>

            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              Preview and read the complete question paper PDF below before saving.
              100% official format from {examBoard}.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            {rawDriveUrl ? (
              <button
                onClick={handleDownload}
                className={`${classPrefix}-download-primary-btn`}
                id="top-download-button"
                aria-label={`Download ${currentSubject} ${selectedYear} PDF`}
              >
                <Download className="w-5 h-5 animate-bounce" />
                <span>{downloadTriggered ? "Opening Download..." : "Download PDF"}</span>
              </button>
            ) : (
              <div className="px-5 py-3 rounded-xl bg-amber-500/20 border border-amber-300/40 text-amber-100 text-sm font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-300" />
                <span>Uploading Soon for {selectedYear}</span>
              </div>
            )}
          </div>
        </header>

        {/* Mobile/Tablet Year Switcher & Quick Actions */}
        <div className="flex lg:hidden items-center justify-between gap-2 p-2.5 bg-white rounded-xl border border-slate-200 shadow-xs mb-3.5">
          <div className="grid grid-cols-3 gap-1.5 w-full">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1 px-1 col-span-3 mb-0.5">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>Year:</span>
            </span>
            {years.map((y) => (
              <button
                key={y}
                onClick={() => handleYearChange(y)}
                className={`px-2 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedYear === y
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {rawDriveUrl && (
              <a
                href={rawDriveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-600 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                title="Open in Google Drive"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={handleShare}
              className="p-2 rounded-lg text-slate-600 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              title="Share Paper"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {copied && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500 text-white text-xs font-bold text-center animate-fade-in shadow-md">
            ✔ PDF Page link copied to clipboard!
          </div>
        )}

        {/* ── 3-COLUMN MAIN LAYOUT ── */}
        <div className={`${classPrefix}-layout-grid`} aria-label="PDF Document & Ad Rail Layout">
          {/* Left Sidebar Ad Rail — Desktop Sticky */}
          <aside className={`${classPrefix}-sidebar-ad-col`} aria-label="Left Advertisement Sidebar">
            <div className={`${classPrefix}-sidebar-sticky`}>
              {/* Subject Details Card */}
              <div className={`${classPrefix}-sidebar-card text-left p-3.5 shadow-xs`}>
                <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold text-sm">
                  <Info className="w-4.5 h-4.5 text-blue-600 flex-shrink-0" />
                  <span>Subject Details</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex justify-between items-start py-1 border-b border-slate-100 gap-1.5">
                    <span className="font-semibold text-slate-500 flex-shrink-0">Subject Name:</span>
                    <span className="font-bold text-slate-800 text-right">{currentSubject}</span>
                  </li>
                  {subjectMeta.code && (
                    <li className="flex justify-between items-start py-1 border-b border-slate-100 gap-1.5">
                      <span className="font-semibold text-slate-500 flex-shrink-0">Code:</span>
                      <span className="font-bold text-slate-800 text-right">{subjectMeta.code}</span>
                    </li>
                  )}
                  <li className="flex justify-between items-start py-1 border-b border-slate-100 gap-1.5">
                    <span className="font-semibold text-slate-500 flex-shrink-0">Branch:</span>
                    <span className="font-bold text-slate-800 text-right">{subjectMeta.branch}</span>
                  </li>
                  <li className="flex justify-between items-start py-1 border-b border-slate-100 gap-1.5">
                    <span className="font-semibold text-slate-500 flex-shrink-0">Category:</span>
                    <span className="font-bold text-blue-600 text-right">{subjectMeta.type}</span>
                  </li>
                  <li className="flex justify-between items-start py-1 border-b border-slate-100 gap-1.5">
                    <span className="font-semibold text-slate-500 flex-shrink-0">Exam Marks:</span>
                    <span className="font-bold text-emerald-600 text-right">{examMarks}</span>
                  </li>
                  <li className="flex justify-between items-start py-1 gap-1.5">
                    <span className="font-semibold text-slate-500 flex-shrink-0">Exam Board:</span>
                    <span className="font-bold text-slate-800 text-right">{examBoard}</span>
                  </li>
                </ul>
              </div>

              <div className={`${classPrefix}-sidebar-card`}>
                <div className={`${classPrefix}-sidebar-card-label`}>Advertisement</div>
                <AdBanner slot="1675110481" format="auto" />
              </div>

              {/* Quick Subjects Navigation Card */}
              <div className={`${classPrefix}-sidebar-card text-left`}>
                <div className={`${classPrefix}-sidebar-card-label`}>{categoryTitle} Subjects</div>
                <div className="flex flex-col gap-1.5 max-h-[320px] overflow-y-auto pr-1">
                  {allSubjects.map((sub) => {
                    const inSharedGroup = sharedPdfGroupInfo && sharedPdfGroupInfo.groupSubjects.includes(sub);
                    return (
                      <button
                        key={sub}
                        onClick={() => handleSubjectChange(sub)}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold text-left transition-all truncate ${
                          currentSubject === sub
                            ? "bg-blue-600 text-white shadow-xs"
                            : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                        }`}
                        title={inSharedGroup ? `${sub} — uses combined PDF for ${selectedYear}` : sub}
                      >
                        <span className="flex items-center gap-1.5">
                          {inSharedGroup && (
                            <span title={`Same PDF as other ${sharedPdfGroupInfo.count - 1} subjects`} className="text-[10px]">🔗</span>
                          )}
                          <span className="truncate">{sub}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Center Column: PDF Document Viewer Stage */}
          <main className={`${classPrefix}-center-col`}>
            {/* Top Leaderboard Ad Banner (Desktop Only) */}
            <LeaderboardAd slot="3476532920" />

            <section className={`${classPrefix}-viewer-stage`} aria-label="PDF Document Reader">
              {rawDriveUrl ? (
                <PdfMultiPageViewer
                  rawDriveUrl={rawDriveUrl}
                  driveId={extractDriveId(rawDriveUrl)}
                  previewUrl={previewUrl}
                  downloadUrl={downloadUrl}
                  subjectName={currentSubject}
                  year={selectedYear}
                  onFullscreenToggle={() => setIsFullscreen(!isFullscreen)}
                  isFullscreen={isFullscreen}
                  readerTitle={readerTitle}
                  scanLabel={scanLabel}
                />
              ) : (
                <div className="p-12 text-center bg-white">
                  <div className="w-16 h-16 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-center mx-auto mb-4 text-amber-500">
                    <Clock className="w-8 h-8" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-800 mb-2">
                    {currentSubject} ({selectedYear}) Paper Coming Soon
                  </h2>
                  <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                    We are currently uploading and verifying the official {selectedYear} paper for this subject.
                    You can browse other available years below.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {years.map((y) => {
                      const hasLink = papers && papers[y] && !!papers[y][currentSubject];
                      if (!hasLink) return null;
                      return (
                        <button
                          key={y}
                          onClick={() => handleYearChange(y)}
                          className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-md"
                        >
                          View {y} Paper instead →
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>
          </main>

          {/* Right Sidebar Ad Rail — Desktop Sticky */}
          <aside className={`${classPrefix}-sidebar-ad-col`} aria-label="Right Advertisement Sidebar">
            <div className={`${classPrefix}-sidebar-sticky`}>
              {/* Exam Year & Quick Actions Card */}
              <div className={`${classPrefix}-sidebar-card text-left p-3 shadow-xs`}>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>Select Year</span>
                  </span>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    Active: {selectedYear}
                  </span>
                </div>

                {/* Year Switcher Pills */}
                <div className="grid grid-cols-3 gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-100 mb-3">
                  {years.map((y) => (
                    <button
                      key={y}
                      onClick={() => handleYearChange(y)}
                      className={`py-1.5 px-1.5 rounded-lg text-xs font-bold text-center transition-all ${
                        selectedYear === y
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-600 border border-slate-200"
                      }`}
                      title={`${y} ${currentSubject} PYQ`}
                    >
                      {y}
                    </button>
                  ))}
                </div>

                {/* Quick Tools: Google Drive & Share */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  {rawDriveUrl && (
                    <a
                      href={rawDriveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 transition-colors border border-slate-200/80"
                      title="Open directly in Google Drive"
                      aria-label="Open PDF in Google Drive"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                      <span>Drive</span>
                    </a>
                  )}
                  <button
                    onClick={handleShare}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 transition-colors border border-slate-200/80"
                    title="Copy PDF link to share"
                    aria-label="Share paper link"
                  >
                    <Share2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>{copied ? "Copied!" : "Share"}</span>
                  </button>
                </div>
              </div>

              <div className={`${classPrefix}-sidebar-card`}>
                <div className={`${classPrefix}-sidebar-card-label`}>Sponsored</div>
                <AdBanner slot="4461940407" format="auto" />
              </div>
            </div>
          </aside>
        </div>

        {/* ── BOTTOM SECTIONS & DETAILS ── */}
        <div className={`${classPrefix}-bottom-sections mt-8 space-y-6`}>
          {/* Post-Reader In-Article Ad */}
          <div style={{ margin: "16px 0", minHeight: 0 }} className="overflow-visible rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm">
            <div className="text-center text-[10px] font-semibold tracking-wider text-slate-400 uppercase mb-1">
              Sponsored
            </div>
            <AdBanner slot="8679502538" format="fluid" layout="in-article" />
          </div>

          {/* Subject Exam Details (Mobile/Tablet Only) */}
          <div className="block lg:hidden bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold text-sm">
              <Info className="w-4.5 h-4.5" />
              <span>Subject Details</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex justify-between py-1 border-b border-slate-100">
                <span className="font-semibold text-slate-500">Subject Name:</span>
                <span className="font-bold text-slate-800 text-right">{currentSubject}</span>
              </li>
              {subjectMeta.code && (
                <li className="flex justify-between py-1 border-b border-slate-100">
                  <span className="font-semibold text-slate-500">Code:</span>
                  <span className="font-bold text-slate-800">{subjectMeta.code}</span>
                </li>
              )}
              <li className="flex justify-between py-1 border-b border-slate-100">
                <span className="font-semibold text-slate-500">Branch:</span>
                <span className="font-bold text-slate-800">{subjectMeta.branch}</span>
              </li>
              <li className="flex justify-between py-1 border-b border-slate-100">
                <span className="font-semibold text-slate-500">Category:</span>
                <span className="font-bold text-blue-600">{subjectMeta.type}</span>
              </li>
              <li className="flex justify-between py-1 border-b border-slate-100">
                <span className="font-semibold text-slate-500">Exam Marks:</span>
                <span className="font-bold text-emerald-600">{examMarks}</span>
              </li>
              <li className="flex justify-between py-1">
                <span className="font-semibold text-slate-500">Exam Board:</span>
                <span className="font-bold text-slate-800">{examBoard}</span>
              </li>
            </ul>
          </div>

          {/* Bottom Banner Ad */}
          <div style={{ margin: "16px 0", minHeight: 0 }} className="overflow-visible rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm">
            <div className="text-center text-[10px] font-semibold tracking-wider text-slate-400 uppercase mb-1">
              Advertisement
            </div>
            <AdBanner slot="3636692323" />
          </div>

          {/* Quick Subject Switcher */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-800 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>{currentBrowseSubjectsTitle}</span>
            </h3>

            <div className="flex flex-wrap gap-2">
              {allSubjects.map((sub) => (
                <button
                  key={sub}
                  onClick={() => handleSubjectChange(sub)}
                  className={`${classPrefix}-subject-chip ${currentSubject === sub ? "active" : ""}`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Related Semesters Navigation */}
          {semestersNav && semestersNav.length > 0 && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <School className="w-4 h-4 text-blue-600" />
                <span>Browse Other B.Tech Semesters</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {semestersNav.map((navItem) => {
                  const isActive = currentSemester != null && navItem.sem === currentSemester;
                  return (
                    <a
                      key={navItem.name}
                      href={navItem.href}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-700 font-bold border border-blue-200"
                          : "bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700"
                      }`}
                    >
                      {navItem.name}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PdfViewerLayout(props) {
  const loadingText = props.categoryTitle
    ? `Loading ${props.categoryTitle} PDF Viewer...`
    : "Loading Question Paper PDF Viewer...";

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 mx-auto mb-3"></div>
            <p className="text-sm font-semibold text-slate-600">{loadingText}</p>
          </div>
        </div>
      }
    >
      <PdfViewerContent {...props} />
    </Suspense>
  );
}
