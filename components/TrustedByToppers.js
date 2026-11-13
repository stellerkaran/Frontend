"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────────────────────
// "Trusted by Toppers" — the platform Hall of Fame section (D2D / Polytechnic /
// Lateral results: photo + rank badge + name + college).
//
// Lives in its own file so the dedicated exam pages can reuse the very same
// section that /exam-preparation renders, with a single copy of the markup,
// the data and the CSS.
//
// `onJoinTestSeries` is optional. /exam-preparation passes its test-series
// handler, which renders the "+ More Rankers" card and the "Join ... Test
// Series" button. Pages with no matching test series (e.g. the Bihar page)
// omit the prop and get the topper cards only.
// ─────────────────────────────────────────────────────────────────────────────

const TOPPER_SECTION_CSS = `
        /* ══════════════════════════════════════════════════════════════
           TOP EXAM RESULTS — Platform Hall of Fame & Topper Cards Grid
           Full-bleed section with generous whitespace and clear hierarchy
           for the headline, photo rings and rank badges.
           ══════════════════════════════════════════════════════════════ */
        .top-results-card {
          padding: 44px 0 40px;
          margin-top: 72px;
          overflow: hidden;
          position: relative;
          background: linear-gradient(180deg, #ffffff 0%, #fbfbff 100%);
          border-top: 1px solid rgba(226, 232, 240, 0.8);
          /* Full-bleed breakout: escapes the 1400px .exam-page-shell and the
             wrapper's side padding so this section spans the entire viewport
             width, edge to edge, with no outer padding. */
          width: 100vw;
          max-width: 100vw;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          padding-left: 0;
          padding-right: 0;
        }

        .top-results-header {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          padding-top: 8px;
          padding-bottom: 12px;
          position: relative;
        }

        .top-results-title-group {
          display: flex;
          align-items: center;
          gap: 10px;
          text-align: center;
        }

        .top-results-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 14px;
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #b45309;
          box-shadow: 0 2px 10px rgba(245, 158, 11, 0.25);
          flex-shrink: 0;
        }

        .top-results-title {
          font-size: 16px;
          font-weight: 900;
          color: #0f172a;
          line-height: 1.2;
          display: flex;
          align-items: center;
          gap: 6px;
          justify-content: center;
        }

        .top-results-subtitle {
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
          margin-top: 2px;
          text-align: center;
        }

        .top-results-header > span {
          position: absolute;
          right: 0;
        }

        .top-results-header-v2 {
          flex-direction: column;
          gap: 8px;
          margin-bottom: 40px;
        }

        .top-results-heading {
          font-size: 30px;
          font-weight: 900;
          color: #0f172a;
          line-height: 1.15;
          letter-spacing: -0.01em;
          text-align: center;
        }

        .top-results-heading-accent {
          color: #ef4444;
        }

        .top-results-heading-sub {
          font-size: 15px;
          font-weight: 600;
          color: #64748b;
          margin-top: 4px;
          text-align: center;
        }

        @media (min-width: 640px) {
          .top-results-heading {
            font-size: 38px;
          }
          .top-results-heading-sub {
            font-size: 17px;
          }
        }

        @media (max-width: 640px) {
          .top-results-header {
            flex-wrap: wrap;
            gap: 8px;
          }
          .top-results-header > span {
            position: static;
          }
        }

        /* ── Platform Stat Metric Chips (PW/Unacademy Style) ── */
        .results-platform-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-bottom: 16px;
        }
        @media (max-width: 640px) {
          .results-platform-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
          }
        }

        .platform-stat-pill {
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 12px;
          padding: 8px 6px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .platform-stat-pill:hover {
          border-color: #cbd5e1;
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }
        .platform-stat-val {
          font-size: 12.5px;
          font-weight: 900;
          color: #0f172a;
          line-height: 1.1;
        }
        .platform-stat-lbl {
          font-size: 9.5px;
          font-weight: 700;
          color: #64748b;
          margin-top: 3px;
          white-space: nowrap;
        }

        /* ── Filter Pills ── */
        .top-results-filters {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          padding-bottom: 6px;
          margin-bottom: 14px;
          scrollbar-width: none;
        }
        .top-results-filters::-webkit-scrollbar {
          display: none;
        }

        .result-filter-btn {
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          color: #475569;
          font-size: 11.5px;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 20px;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.18s ease;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .result-filter-btn:hover {
          background: #e2e8f0;
          color: #1e293b;
        }
        .result-filter-btn.active {
          background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%);
          color: #ffffff;
          border-color: #4338ca;
          box-shadow: 0 3px 10px rgba(79, 70, 229, 0.28);
        }

        /* ── Exam-Wise Section Blocks ── */
        .exam-wise-sections-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 28px;
        }

        .exam-section-block {
          background: transparent;
          border: none;
          border-radius: 0;
          padding: 36px 0;
          transition: background 0.2s ease;
        }
        .exam-section-block + .exam-section-block {
          border-top: 1px solid rgba(226, 232, 240, 0.7);
        }
        @media (max-width: 860px) {
          .exam-section-block { padding: 28px 4px; }
        }
        .exam-section-block:hover {
          background: #fafbfe;
        }

        .exam-section-header-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          margin: -14px -14px 12px -14px;
          border-top-left-radius: 19px;
          border-top-right-radius: 19px;
        }

        .exam-section-title-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .exam-section-emoji {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.06);
          flex-shrink: 0;
        }

        .exam-section-name {
          font-size: 13px;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.2;
        }

        .exam-section-sub {
          font-size: 10px;
          color: #64748b;
          font-weight: 600;
        }

        .exam-section-results-heading {
          font-size: 20px;
          font-weight: 800;
          color: #1e293b;
          text-align: center;
          margin: 0 0 32px;
          letter-spacing: -0.01em;
          line-height: 1.35;
        }
        @media (min-width: 640px) {
          .exam-section-results-heading { font-size: 22px; }
        }

        .exam-section-badge {
          font-size: 9.5px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 8px;
          white-space: nowrap;
        }

        /* ── Platform Topper Poster Cards Grid (Bento Style) ── */
        .topper-poster-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px 16px;
        }
        @media (min-width: 640px) {
          .topper-poster-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 26px 20px;
          }
        }
        @media (min-width: 960px) {
          .topper-poster-grid {
            grid-template-columns: repeat(6, 1fr);
            gap: 24px 18px;
          }
        }

        /* ── Topper card: circular photo + overlapping rank badge + name + college ── */
        .topper-poster-card {
          background: transparent;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          transition: transform 0.2s ease;
        }
        .topper-poster-card:hover {
          transform: translateY(-4px);
        }

        .topper-photo-frame {
          width: 84px;
          height: 84px;
          border-radius: 50%;
          overflow: hidden;
          background: #eef2ff;
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.14), 0 0 0 3px rgba(245, 158, 11, 0.18);
          position: relative;
          z-index: 2;
          transition: box-shadow 0.25s ease;
        }
        .topper-poster-card:hover .topper-photo-frame {
          box-shadow: 0 10px 22px rgba(217, 119, 6, 0.30), 0 0 0 3px rgba(245, 158, 11, 0.45);
        }

        .topper-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .topper-photo-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #c7d2fe 0%, #a5b4fc 100%);
        }
        .topper-photo-fallback-icon {
          width: 62%;
          height: 62%;
          color: #ffffff;
        }

        /* ── Rank badge (category-specific: D2D / Polytechnic / Lateral) overlapping the bottom of the photo, amber/gold styling ── */
        .topper-score-badge {
          margin-top: -10px;
          z-index: 3;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #ffffff;
          font-weight: 800;
          font-size: 12px;
          letter-spacing: 0.02em;
          padding: 4px 12px;
          border-radius: 8px;
          box-shadow: 0 3px 8px rgba(217, 119, 6, 0.35);
          white-space: nowrap;
          line-height: 1.4;
        }

        @media (min-width: 640px) {
          .topper-photo-frame { width: 96px; height: 96px; }
          .topper-score-badge { font-size: 13px; padding: 5px 14px; }
        }

        .topper-card-name {
          font-size: 14.5px;
          font-weight: 800;
          color: #0f172a;
          margin-top: 12px;
          text-transform: uppercase;
          letter-spacing: 0.01em;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 1.2;
        }

        .topper-card-college {
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          line-height: 1.3;
          max-width: 100%;
          margin-top: 4px;
          padding: 0 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .topper-category-pill {
          margin-top: 6px;
          font-size: 10px;
          font-weight: 700;
          color: #4f46e5;
          background: #eef2ff;
          border: 1px solid #c7d2fe;
          padding: 2px 10px;
          border-radius: 999px;
          line-height: 1.4;
          white-space: nowrap;
        }

        /* ── "+ More Rankers" card — sits after the last topper in each
           section's grid, matching the circular-photo layout but using a
           dashed accent ring + count instead of a real photo, so it reads
           as "there are more results here" rather than a broken profile. ── */
        .topper-more-card {
          cursor: pointer;
        }
        .topper-more-card:focus-visible {
          outline: 2px solid var(--accent-1);
          outline-offset: 4px;
          border-radius: 12px;
        }

        .topper-more-circle {
          width: 84px;
          height: 84px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
          border: 2px dashed #a5b4fc;
          box-shadow: 0 4px 14px rgba(79, 70, 229, 0.14);
          transition: box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease;
        }
        .topper-more-card:hover .topper-more-circle {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          border-color: transparent;
          border-style: solid;
          box-shadow: 0 10px 22px rgba(79, 70, 229, 0.32);
        }
        .topper-more-card:hover .topper-more-count {
          color: #ffffff;
        }

        .topper-more-count {
          font-size: 11px;
          font-weight: 800;
          color: #4f46e5;
          line-height: 1.25;
          text-align: center;
          padding: 0 8px;
          transition: color 0.25s ease;
        }

        @media (min-width: 640px) {
          .topper-more-circle { width: 96px; height: 96px; }
          .topper-more-count { font-size: 12.5px; padding: 0 10px; }
        }

        .exam-section-footer-cta {
          margin-top: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .exam-section-cta-btn {
          font-size: 14px;
          font-weight: 800;
          color: #4f46e5;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.15s ease;
          background: #eef2ff;
          border: 1px solid #c7d2fe;
          border-radius: 999px;
          padding: 10px 22px;
        }
        .exam-section-cta-btn:hover {
          background: #e0e7ff;
          border-color: #a5b4fc;
          color: #3730a3;
          transform: translateY(-1px);
        }

        .top-results-trust-footer {
          margin-top: 36px;
          text-align: center;
          font-size: 13.5px;
          font-weight: 700;
          color: #9d174d;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .top-results-trust-footer::before,
        .top-results-trust-footer::after {
          content: "";
          width: 28px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #f9a8d4);
        }
        .top-results-trust-footer::after {
          background: linear-gradient(90deg, #f9a8d4, transparent);
        }
        /* ── Responsive overrides (moved verbatim out of the page sheet) ── */
        @media (max-width: 860px) {
          .top-results-card {
            margin-top: 32px;
            padding: 28px 0 24px;
          }
          .exam-wise-sections-list {
            padding: 0 12px;
          }
        }
        @media (max-width: 420px) {
          .exam-section-block { padding: 22px 6px; }
          .top-results-card { padding: 20px 0 16px; }
          .exam-section-results-heading { font-size: 17px; margin-bottom: 20px; }
          .topper-poster-grid { gap: 18px 10px; }
          .topper-photo-frame { width: 72px; height: 72px; }
          .topper-more-circle { width: 72px; height: 72px; }
          .topper-more-count { font-size: 9.5px; padding: 0 6px; }
          .topper-score-badge { font-size: 10.5px; padding: 3px 8px; margin-top: -8px; }
          .topper-card-name { font-size: 12px; margin-top: 9px; }
          .topper-card-college { font-size: 10.5px; margin-top: 3px; }
          .exam-section-cta-btn { font-size: 12px; padding: 8px 16px; }
        }
        @media (max-width: 380px) {
          .exam-section-block { padding: 18px 4px; }
          .top-results-card { padding: 16px 0 12px; margin-top: 24px; }
          .exam-section-results-heading { font-size: 15px; margin-bottom: 16px; }
          .topper-poster-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px 8px;
          }
          .topper-photo-frame { width: 60px; height: 60px; }
          .topper-more-circle { width: 60px; height: 60px; }
          .topper-more-count { font-size: 8.5px; padding: 0 5px; }
          .topper-score-badge { font-size: 9.5px; padding: 2px 6px; margin-top: -6px; }
          .topper-card-name { font-size: 10.5px; margin-top: 7px; }
          .topper-card-college { font-size: 9px; margin-top: 2px; }
          .exam-section-cta-btn { font-size: 11px; padding: 6px 12px; }
          .top-results-heading { font-size: 22px; }
          .top-results-heading-sub { font-size: 12px; }
        }
`;

const examResultsSections = [
  {
    sectionId: "d2d",
    category: "D2D",
    examTitle: "Jharkhand D2D (B.Tech Lateral)",
    examSubtitle: "Direct 2nd Year B.Tech • BIT Sindri",
    badge: "100% BIT Sindri Selections",
    iconEmoji: "🎓",
    themeColor: "amber",
    headerBg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
    borderColor: "#fde68a",
    testSeriesId: "jhar-d2d",
    testSeriesUrl: "/d2d-test-series",
    resultsHeading: "Our Jharkhand D2D (B.Tech Lateral) 2026 Results",
    totalRankers: 12,
    toppers: [
      {
        id: "d2d-1",
        name: "Sanjana",
        rank: "D2d Rank 109",
        rawRank: 5,
        category: "D2D",
        exam: "Jharkhand D2D 2025",
        college: "BIT Sindri",
        badge: "Top 5 D2D",
        score: "95.5",
        image: "https://res.cloudinary.com/do8knpreu/image/upload/v1789875552/Sanjana_py9pni.jpg",
        icon: "⭐"
      },
      {
        id: "d2d-2",
        name: "Munnam Jilani",
        rank: "D2d Rank 129",
        rawRank: 1,
        category: "D2D",
        exam: "Jharkhand D2D 2025",
        college: "BIT Sindri",
        badge: "State Topper",
        score: "98.4",
        showCategoryRank: true,
        categoryRank: 49,
        image: "https://res.cloudinary.com/do8knpreu/image/upload/v1789875379/Munnam_d6oicr.jpg",
        icon: "⭐"
      },

      {
        id: "d2d-3",
        name: "Priya",
        rank: "D2d Rank 243",
        rawRank: 12,
        category: "D2D",
        exam: "Jharkhand D2D 2025",
        college: "Govt Palamu (CSE)",
        badge: "D2D Achiever",
        score: "92.8",
        image: "https://res.cloudinary.com/do8knpreu/image/upload/v1789875525/Priya_xwndno.jpg",
        icon: "⭐"
      },
      {
        id: "d2d-4",
        name: "Akhilesh Kumar",
        rank: "D2D Rank 557",
        rawRank: 22,
        category: "D2D",
        exam: "Jharkhand D2D 2025",
        badge: "D2D Star",
        score: "90.5",
        showCategoryRank: true,
        categoryRank: 26,
        image: "https://res.cloudinary.com/do8knpreu/image/upload/v1789874646/Akhilesh_iky1xc.jpg",
        icon: "⭐"
      },
      {
        id: "d2d-5",
        name: "Mahima",
        rank: "D2d Rank 605",
        rawRank: 12,
        category: "D2D",
        exam: "Jharkhand D2D 2025",
        college: "Govt Palamu (CSE)",
        showCategoryRank: true,
        categoryRank: 104,
        score: "92.8",
        image: "",
        icon: "⭐"
      },
    ]
  },
  {
    sectionId: "polytechnic",
    category: "Polytechnic",
    examTitle: "Jharkhand Polytechnic (PECE)",
    examSubtitle: "Top Govt Polytechnic Colleges",
    badge: "Top 3 State Rankers",
    iconEmoji: "⚙️",
    themeColor: "blue",
    headerBg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
    borderColor: "#bfdbfe",
    testSeriesId: "jhar-poly",
    testSeriesUrl: "/test-series",
    resultsHeading: "Our Jharkhand Polytechnic 2026 Results",
    totalRankers: 27,
    toppers: [
      {
        id: "poly-1",
        name: "Pratik",
        rank: "Rank 101",
        rawRank: 3,
        category: "Polytechnic 454",
        exam: "Jharkhand Polytechnic 2025",
        college: "GP Ranchi (Civil)",
        badge: "Top 3 State Ranker",
        score: "138/150",
        image: "",
        icon: "⭐"
      },
      {
        id: "poly-2",
        name: "Prince",
        rank: "Rank 263",
        rawRank: 14,
        category: "Polytechnic",
        exam: "Jharkhand Polytechnic 2025",
        college: "GP Adityapur (Electrical)",
        badge: "Top State Ranker",
        score: "132/150",
        showCategoryRank: true,
        categoryRank: 42,
        image: "https://res.cloudinary.com/do8knpreu/image/upload/v1789875399/Prince_ckcw6p.jpg",
        icon: "⭐"
      },
      {
        id: "poly-3",
        name: "Aman",
        rank: "Rank 288",
        rawRank: 27,
        category: "Polytechnic",
        exam: "Jharkhand Polytechnic 2025",
        college: "GP Ranchi (CSE)",

        badge: "Top State Ranker",
        score: "126/150",
        image: "https://res.cloudinary.com/do8knpreu/image/upload/v1789875374/Aman_bxqjmt.jpg",
        icon: "⭐"
      },
      {
        id: "poly-4",
        name: "Ronit Raj",
        rank: "Rank 436",
        rawRank: 27,
        category: "Polytechnic",
        exam: "Jharkhand Polytechnic 2025",
        college: "GP Dhanbad (Electrical)",

        showCategoryRank: true,
        categoryRank: 96, badge: "Top State Ranker",
        score: "126/150",
        image: "https://res.cloudinary.com/do8knpreu/image/upload/v1789874748/Ronit_rv4kcd.jpg",
        icon: "⭐"
      },
      {
        id: "poly-5",
        name: "Vicky",
        rank: "Rank 2301",
        rawRank: 27,
        category: "Polytechnic",
        exam: "Jharkhand Polytechnic 2025",
        college: "GP Dhanbad (Electrical)",

        showCategoryRank: true,
        categoryRank: 968, badge: "Top State Ranker",
        score: "126/150",
        image: "",
        icon: "⭐"
      }
    ]
  },
  {
    sectionId: "lateral",
    category: "Lateral",
    examTitle: "Polytechnic Lateral Entry (DECE LE)",
    examSubtitle: "Direct 2nd Year Diploma Admission",
    badge: "Top 10 State Rankers",
    iconEmoji: "⚡",
    themeColor: "indigo",
    headerBg: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
    borderColor: "#c7d2fe",
    testSeriesId: "jhar-poly-lateral",
    testSeriesUrl: "/test-series-lateral",
    resultsHeading: "Our Jharkhand Polytechnic Lateral Entry 2026 Results",
    totalRankers: 15,
    toppers: [
      {
        id: "lat-1",
        name: "Durgesh",
        rank: "Rank 181",
        rawRank: 9,
        category: "Lateral",
        exam: "Jharkhand Poly Lateral 2025",
        college: "GP Ranchi (CSE)",
        badge: "Top 10 Lateral",
        showCategoryRank: true,
        categoryRank: 74,
        score: "89/100",
        image: "https://res.cloudinary.com/do8knpreu/image/upload/v1789874615/Durgesh_nadd5q.jpg",
        icon: "⭐"
      },
      {
        id: "lat-2",
        name: "Shashikant",
        rank: "Rank 346",
        rawRank: 9,
        category: "Lateral",
        exam: "Jharkhand Poly Lateral 2025",
        college: "Silli Polytechnic (Free)",
        badge: "Top 10 Lateral",
        showCategoryRank: true,
        categoryRank: 61,
        score: "89/100",
        image: "https://res.cloudinary.com/do8knpreu/image/upload/v1789874603/Sashi_fifj74.png",
        icon: "⭐"
      },
      {
        id: "lat-3",
        name: "Nav Prabhat",
        rank: "Rank 507",
        rawRank: 9,
        category: "Lateral",
        exam: "Jharkhand Poly Lateral 2025",
        college: "",
        badge: "Top 10 Lateral",
        score: "89/100",
        image: "https://res.cloudinary.com/do8knpreu/image/upload/v1789875386/Nav_mbgsge.png",
        icon: "⭐"
      },
      {
        id: "lat-4",
        name: "VITTHAL NATH",
        rank: "Rank 763",
        rawRank: 9,
        category: "Lateral",
        exam: "Jharkhand Poly Lateral 2025",
        college: "GP Simdega (Electrical)",
        badge: "Top 10 Lateral",
        score: "89/100",
        image: "https://res.cloudinary.com/do8knpreu/image/upload/v1789875570/Vitthal_fqxezb.jpg",
        icon: "⭐"
      },
      {
        id: "lat-5",
        name: "NIKITA",
        rank: "Rank 834",
        rawRank: 9,
        category: "Lateral",
        exam: "Jharkhand Poly Lateral 2025",
        college: "Silli Polytechnic",
        badge: "Top 10 Lateral",
        score: "89/100",
        image: "",
        icon: "⭐"
      }
    ]
  }
];

const DefaultProfileIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4.4183 3.5817-8 8-8s8 3.5817 8 8v1H4v-1z" />
  </svg>
);

function TopperPhoto({ src, alt }) {
  const [imgError, setImgError] = useState(false);
  const hasImage = Boolean(src && src.trim() !== "") && !imgError;

  if (!hasImage) {
    return (
      <div className="topper-photo-fallback">
        <DefaultProfileIcon className="topper-photo-fallback-icon" />
      </div>
    );
  }

  return (
    <Image width={96} height={96}
      src={src}
      alt={alt}
      className="topper-photo-img"
      referrerPolicy="no-referrer"
      onError={() => setImgError(true)}
    />
  );
}

export default function TrustedByToppers({ onJoinTestSeries }) {
  return (
    <div className="top-results-card" id="top-exam-results-section">
      {/* Section-scoped stylesheet — the section is reused by several pages, so
          it ships its own CSS instead of depending on the host page sheet. */}
      <style dangerouslySetInnerHTML={{ __html: TOPPER_SECTION_CSS }} />

      <div className="top-results-header top-results-header-v2">
        <h3 className="top-results-heading">
          Trusted by <span className="top-results-heading-accent">Toppers</span>
        </h3>
      </div>

      {/* ══ EXAM SECTION-WISE TOPPER POSTER CARDS GRID ══ */}
      <div className="exam-wise-sections-list">
        {examResultsSections.map((sec) => {
          const remainingRankers = Math.max((sec.totalRankers || 0) - sec.toppers.length, 0);

          return (
            <div key={sec.sectionId} className="exam-section-block">
              {sec.resultsHeading && (
                <div className="exam-section-results-heading">{sec.resultsHeading}</div>
              )}

              {/* Platform Topper Poster Cards Grid — photo, rank badge, name, college */}
              <div className="topper-poster-grid">
                {sec.toppers.map((student) => {
                  return (
                    <div key={student.id} className="topper-poster-card">
                      {/* Circular photo (falls back to a profile icon if missing/broken) */}
                      <div className="topper-photo-frame">
                        <TopperPhoto src={student.image} alt={student.name} />
                      </div>

                      {/* Rank badge overlapping the bottom of the photo */}
                      <div className="topper-score-badge">
                        <span className="flex flex-col items-center leading-tight">
                          <span>{student.rank}</span>
                          {student.showCategoryRank && (
                            <span className="text-[7px] opacity-80 tracking-wide">Category Rank {student.categoryRank}</span>
                          )}
                        </span>
                      </div>

                      {/* Name */}
                      <div className="topper-card-name">{student.name}</div>

                      {/* College name */}
                      <div className="topper-card-college" title={student.college}>
                        {student.college}
                      </div>
                    </div>
                  );
                })}

                {/* "+N More Rankers" card — test-series entry point, rendered only
                    when the host page passes a test-series handler */}
                {onJoinTestSeries && remainingRankers > 0 && (
                  <div
                    className="topper-poster-card topper-more-card"
                    role="button"
                    tabIndex={0}
                    onClick={() => onJoinTestSeries(sec)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onJoinTestSeries(sec);
                      }
                    }}
                    aria-label={`View ${remainingRankers} more ${sec.category} rankers and join the test series`}
                  >
                    <div className="topper-more-circle">
                      <span className="topper-more-count">+ More Rankers</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Section Action Footer */}
              {onJoinTestSeries && (
                <div className="exam-section-footer-cta">
                  <button
                    type="button"
                    onClick={() => onJoinTestSeries(sec)}
                    className="exam-section-cta-btn"
                    aria-label={`Join ${sec.examTitle} Test Series`}
                  >
                    <span>Join {sec.category} Test Series</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Trust Footer */}
      <p className="top-results-trust-footer">
        500+ Students Selected in Top Govt Colleges in 2026
      </p>
    </div>
  );
}
