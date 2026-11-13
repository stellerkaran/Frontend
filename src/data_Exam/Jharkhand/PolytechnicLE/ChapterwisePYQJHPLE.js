"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import BuyModal from "@/components/BuyModal";
import { authFetch } from "@/src/utils/api";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useAuth } from "@/src/context/AuthContext";

/* ─────────────────────────────────────────────
   CHAPTER DATA — JHPLE
───────────────────────────────────────────── */
const CHAPTER_DATA = {

    Mathematics: [
        {
            name: "Real Numbers",
            free: true,
            questionIds: [
                "2025-math-111", "2025-math-116", "2025-math-117",
                "2024-math-111", "2024-math-116", "2024-math-117",
                "2022-math-112", "2022-math-113", "2022-math-116", "2022-math-117",
                "2022-math-121", "2022-math-122", "2022-math-131", "2022-math-134",
            ]
        },
        {
            name: "Polynomials",
            questionIds: [
                "2025-math-112", "2024-math-112",
                "2022-math-107", "2022-math-114", "2022-math-123", "2022-math-130",
                "2021-math-107", "2021-math-108", "2021-math-115", "2021-math-119", "2021-math-131",
            ]
        },
        {
            name: "Pair Of Linear Equations In Two Variables",
            questionIds: [
                "2025-math-106", "2025-math-131",
                "2024-math-106", "2024-math-131",
                "2022-math-109", "2022-math-118", "2022-math-124",
                "2021-math-125", "2021-math-129",
            ]
        },
        {
            name: "Quadratic Equations",
            questionIds: [
                "2025-math-118", "2025-math-119", "2025-math-132", "2025-math-133",
                "2024-math-118", "2024-math-119", "2024-math-132", "2024-math-133",
                "2021-math-106", "2021-math-118", "2021-math-121", "2021-math-128",
                "2021-math-130", "2021-math-134",
            ]
        },
        {
            name: "Arithmetic Progressions",
            questionIds: [
                "2025-math-101", "2025-math-107", "2025-math-114", "2025-math-134", "2025-math-135",
                "2024-math-101", "2024-math-107", "2024-math-114", "2024-math-134", "2024-math-135",
                "2023-math-102", "2023-math-128",
            ]
        },
        {
            name: "Triangles",
            questionIds: [
                "2025-math-102", "2025-math-103", "2025-math-108", "2025-math-115", "2025-math-136",
                "2024-math-102", "2024-math-103", "2024-math-108", "2024-math-115", "2024-math-136",
                "2022-math-111", "2022-math-128", "2022-math-132",
            ]
        },
        {
            name: "Coordinate Geometry",
            questionIds: [
                "2025-math-104", "2025-math-109", "2025-math-120", "2025-math-137",
                "2024-math-104", "2024-math-109", "2024-math-120", "2024-math-137",
                "2022-math-147", "2022-math-148", "2022-math-149",
                "2023-math-111", "2023-math-133", "2023-math-135",
            ]
        },
        {
            name: "Introduction to Trigonometry",
            questionIds: [
                "2025-math-105", "2025-math-110", "2025-math-139", "2025-math-140", "2025-math-141",
                "2024-math-105", "2024-math-110", "2024-math-139", "2024-math-140", "2024-math-141",
                "2022-math-110", "2022-math-119", "2022-math-120", "2022-math-126", "2022-math-127",
                "2021-math-105", "2021-math-109", "2021-math-124", "2021-math-126", "2021-math-132",
                "2021-math-136", "2021-math-139",
                "2023-math-114", "2023-math-127",
            ]
        },
        {
            name: "Some Applications of Trigonometry",
            questionIds: ["2022-math-138", "2021-math-137", "2021-math-138"]
        },
        {
            name: "Circles",
            questionIds: [
                "2025-math-121", "2025-math-122", "2025-math-126",
                "2024-math-121", "2024-math-122", "2024-math-126",
                "2022-math-135", "2022-math-136", "2022-math-139",
            ]
        },
        {
            name: "Areas Related to Circles",
            questionIds: [
                "2025-math-123", "2025-math-128", "2025-math-129", "2025-math-130", "2025-math-142", "2025-math-149", "2025-math-150",
                "2024-math-123", "2024-math-128", "2024-math-129", "2024-math-130", "2024-math-142", "2024-math-149", "2024-math-150",
                "2021-math-101", "2021-math-116",
            ]
        },
        {
            name: "Surface Areas and Volumes",
            questionIds: [
                "2025-math-124", "2025-math-143",
                "2024-math-124", "2024-math-143",
                "2022-math-137",
                "2021-math-102", "2021-math-117", "2021-math-120", "2021-math-123", "2021-math-127", "2021-math-135",
            ]
        },
        {
            name: "Statistics",
            questionIds: [
                "2025-math-125", "2025-math-127", "2025-math-144", "2025-math-146",
                "2024-math-125", "2024-math-127", "2024-math-144", "2024-math-146",
                "2022-math-108", "2022-math-115", "2022-math-125", "2022-math-129", "2022-math-133",
                "2021-math-113",
            ]
        },
        {
            name: "Probability",
            questionIds: [
                "2025-math-145", "2025-math-147", "2025-math-148",
                "2024-math-145", "2024-math-147", "2024-math-148",
                "2022-math-140", "2022-math-141", "2022-math-142", "2022-math-143", "2022-math-144",
                "2021-math-103", "2021-math-104", "2021-math-110", "2021-math-111", "2021-math-112",
                "2021-math-114", "2021-math-133", "2021-math-140",
                "2023-math-104", "2023-math-126", "2023-math-145",
            ]
        },
        {
            name: "Differential Equations",
            questionIds: [
                "2025-math-113", "2025-math-138",
                "2024-math-113", "2024-math-138",
                "2023-math-143", "2023-math-148",
            ]
        },
        {
            name: "Limits & Continuity",
            questionIds: ["2023-math-103", "2023-math-123", "2023-math-129", "2023-math-140"]
        },
        {
            name: "Differentiation",
            questionIds: ["2023-math-119", "2023-math-120", "2023-math-121", "2023-math-122"]
        },
        {
            name: "Applications of Derivatives",
            questionIds: ["2023-math-106", "2023-math-109", "2023-math-112", "2023-math-124", "2023-math-125", "2023-math-146"]
        },
        {
            name: "Integration",
            questionIds: ["2023-math-113", "2023-math-115", "2023-math-116", "2023-math-117", "2023-math-118", "2023-math-147"]
        },
        {
            name: "Vectors",
            questionIds: ["2023-math-107", "2023-math-136", "2023-math-141", "2023-math-142", "2023-math-149", "2023-math-150"]
        },
        {
            name: "Matrices & Determinants",
            questionIds: ["2023-math-108"]
        },
        {
            name: "3D Geometry",
            questionIds: ["2023-math-110", "2023-math-137", "2023-math-138", "2023-math-139", "2023-math-144"]
        },
        {
            name: "Complex Numbers",
            questionIds: ["2023-math-130", "2023-math-134"]
        },
        {
            name: "Permutations & Combinations",
            questionIds: ["2023-math-101", "2023-math-131", "2023-math-132", "2022-math-141", "2022-math-142"]
        },
        {
            name: "Functions",
            questionIds: ["2023-math-105"]
        },
        {
            name: "Speed, Distance & Time",
            questionIds: ["2022-math-101", "2022-math-102"]
        },
        {
            name: "Simple & Compound Interest",
            questionIds: ["2022-math-103", "2022-math-104"]
        },
        {
            name: "Work & Time",
            questionIds: ["2022-math-105", "2022-math-106"]
        },
        {
            name: "Profit, Loss & Partnerships",
            questionIds: ["2022-math-145", "2022-math-146"]
        },
    ],
    Science: [
        {
            name: "Chemical Reactions and Equations",
            free: true,
            questionIds: [
                "2025-science-122", "2025-science-123", "2025-science-139", "2025-science-143",
                "2024-science-116", "2024-science-117",
                "2023-science-106", "2023-science-134",
                "2021-science-111", "2021-science-113", "2021-science-114", "2021-science-116",
                "2021-science-120", "2021-science-121", "2021-science-122",
            ]
        },
        {
            name: "Acids, Bases and Salts",
            questionIds: [
                "2025-science-121", "2025-science-136", "2025-science-137", "2025-science-138",
                "2024-science-101", "2024-science-102", "2024-science-103", "2024-science-118",
                "2024-science-119", "2024-science-120",
                "2023-science-103", "2023-science-107", "2023-science-108", "2023-science-109",
                "2023-science-110", "2023-science-111", "2023-science-121", "2023-science-122",
                "2023-science-123", "2023-science-124", "2023-science-125",
                "2022-science-121", "2022-science-133",
                "2021-science-115", "2021-science-117", "2021-science-119", "2021-science-124", "2021-science-125",
            ]
        },
        {
            name: "Metals and Non-metals",
            questionIds: [
                "2025-science-101", "2025-science-102", "2025-science-103", "2025-science-104",
                "2025-science-105", "2025-science-131", "2025-science-140",
                "2024-science-104", "2024-science-105", "2024-science-131", "2024-science-132", "2024-science-133",
                "2023-science-131", "2023-science-132", "2023-science-133", "2023-science-135",
                "2021-science-110", "2021-science-118", "2021-science-123",
            ]
        },
        {
            name: "Carbon and its Compounds",
            questionIds: [
                "2025-science-132", "2025-science-133", "2025-science-134",
                "2024-science-134", "2024-science-142", "2024-science-143", "2024-science-144",
                "2023-science-101", "2023-science-102", "2023-science-103", "2023-science-104",
                "2022-science-118", "2022-science-119", "2022-science-126",
                "2021-science-112",
            ]
        },
        {
            name: "Life Processes",
            questionIds: [
                "2025-science-106", "2025-science-107", "2025-science-108", "2025-science-110",
                "2025-science-114", "2025-science-124", "2025-science-127", "2025-science-135",
                "2025-science-141", "2025-science-142", "2025-science-144", "2025-science-145",
                "2024-science-106", "2024-science-107", "2024-science-108", "2024-science-109",
                "2024-science-110", "2024-science-135", "2024-science-141", "2024-science-145",
                "2023-science-105", "2023-science-116", "2023-science-117", "2023-science-118",
                "2023-science-119", "2023-science-120",
                "2021-science-126", "2021-science-131",
            ]
        },
        {
            name: "Control and Coordination",
            questionIds: [
                "2025-science-109", "2025-science-116", "2025-science-117",
                "2024-science-130", "2024-science-136", "2024-science-137", "2024-science-138",
                "2024-science-139", "2024-science-146",
                "2023-science-113", "2023-science-136", "2023-science-137", "2023-science-146",
                "2023-science-147", "2023-science-148", "2023-science-149", "2023-science-150",
                "2022-science-137", "2022-science-138", "2022-science-142", "2022-science-146",
                "2021-science-127", "2021-science-128",
            ]
        },
        {
            name: "How do Organisms Reproduce",
            questionIds: [
                "2025-science-118", "2025-science-119",
                "2024-science-121", "2024-science-122", "2024-science-123", "2024-science-126",
                "2024-science-129", "2024-science-140",
                "2023-science-112", "2023-science-138", "2023-science-139", "2023-science-140",
                "2022-science-140", "2022-science-144", "2022-science-148",
                "2021-science-129", "2021-science-130",
            ]
        },
        {
            name: "Heredity",
            questionIds: ["2025-science-120", "2024-science-127", "2022-science-120"]
        },
        {
            name: "Light – Reflection and Refraction",
            questionIds: [
                "2025-science-146", "2025-science-148", "2025-science-149", "2025-science-150",
                "2024-science-124", "2024-science-125", "2024-science-148", "2024-science-149",
                "2023-science-114", "2023-science-115", "2023-science-126", "2023-science-127",
                "2022-science-101", "2022-science-102", "2022-science-106", "2022-science-108",
                "2022-science-110", "2022-science-111",
                "2021-science-102", "2021-science-107", "2021-science-108", "2021-science-109",
                "2021-science-135", "2021-science-137", "2021-science-143",
            ]
        },
        {
            name: "The Human Eye and the Colourful World",
            questionIds: [
                "2025-science-111", "2025-science-128", "2025-science-129", "2025-science-130", "2025-science-147",
                "2024-science-128", "2024-science-150",
                "2023-science-128", "2023-science-129", "2023-science-130",
                "2022-science-104",
                "2021-science-134", "2021-science-141",
            ]
        },
        {
            name: "Electricity",
            questionIds: [
                "2025-science-112",
                "2024-science-111", "2024-science-113", "2024-science-114",
                "2023-science-142", "2023-science-143", "2023-science-144", "2023-science-145",
                "2022-science-105", "2022-science-112", "2022-science-113", "2022-science-114", "2022-science-116",
                "2021-science-101", "2021-science-136", "2021-science-138", "2021-science-140", "2021-science-142",
            ]
        },
        {
            name: "Magnetic Effects of Electric Current",
            questionIds: ["2025-science-113", "2024-science-112", "2022-science-115", "2022-science-116"]
        },
        {
            name: "Our Environment",
            questionIds: [
                "2025-science-115", "2025-science-125", "2025-science-126",
                "2024-science-115",
                "2022-science-136", "2022-science-141", "2022-science-145", "2022-science-147",
                "2022-science-149", "2022-science-150",
                "2021-science-132", "2021-science-133",
            ]
        },
        {
            name: "Sources of Energy",
            questionIds: [
                "2022-science-103", "2022-science-107", "2022-science-139",
                "2021-science-103", "2021-science-104", "2021-science-105", "2021-science-106", "2021-science-139",
            ]
        },
        {
            name: "Nuclear Physics (Fission & Fusion)",
            questionIds: ["2022-science-109"]
        },
        {
            name: "Matter in Our Surroundings (States of Matter)",
            questionIds: [
                "2022-science-122", "2022-science-123", "2022-science-124",
                "2022-science-127", "2022-science-128", "2022-science-129",
            ]
        },
        {
            name: "Atoms and Molecules",
            questionIds: ["2022-science-125", "2022-science-130", "2022-science-131", "2022-science-132"]
        },
        {
            name: "Structure of Atom / Periodic Classification",
            questionIds: ["2022-science-120"]
        },
        {
            name: "Fluid Mechanics",
            questionIds: ["2022-science-117"]
        },
        {
            name: "Biology – Microorganisms & Human Body",
            questionIds: ["2022-science-134", "2022-science-135"]
        },
    ],
};

const SUBJECTS = ["Mathematics", "Science"];

/* ─────────────────────────────────────────────
   SHARED STYLES
───────────────────────────────────────────── */
const CW_STYLES = `
@keyframes spin { to { transform: rotate(360deg); } }

.cw-jhple-root { padding: 4px 0 24px; background: #f8f9fa; }

.cw-chapter-grid { display: flex; flex-direction: column; gap: 10px; }
.cw-chapter-card {
  display: flex; align-items: center; gap: 12px;
  background: #fff; border: 1.5px solid #ede9fe;
  border-radius: 14px; padding: 14px 14px 14px 12px;
  cursor: pointer; transition: box-shadow 0.15s, transform 0.12s, border-color 0.15s;
  position: relative; overflow: hidden;
}
.cw-chapter-card::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0;
  width: 4px; background: #6c45ff; border-radius: 4px 0 0 4px;
  opacity: 0; transition: opacity 0.15s;
}
.cw-chapter-card:hover { box-shadow: 0 4px 16px rgba(108,69,255,0.13); transform: translateY(-1px); border-color: #c4b5fd; }
.cw-chapter-card:hover::before { opacity: 1; }
.cw-chapter-card--locked { border-color: #f3f4f6; cursor: default; opacity: 0.75; }
.cw-chapter-card--locked::before { display: none; }
.cw-chapter-card--locked:hover { box-shadow: none; transform: none; border-color: #f3f4f6; }

.cw-ch-num-badge {
  width: 32px; height: 32px; border-radius: 8px;
  background: linear-gradient(135deg, #ede9fe, #ddd6fe);
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 900; color: #6c45ff; flex-shrink: 0;
}
.cw-chapter-card--locked .cw-ch-num-badge { background: #f3f4f6; color: #9ca3af; }

.cw-ch-info { flex: 1; min-width: 0; }
.cw-ch-name { font-weight: 700; color: #1f2937; font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cw-ch-meta { font-size: 11px; color: #9ca3af; margin-top: 2px; }

.cw-ch-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.cw-ch-count { font-size: 11px; font-weight: 700; color: #6c45ff; background: #ede9fe; padding: 3px 9px; border-radius: 999px; white-space: nowrap; }
.cw-ch-soon { font-size: 10px; color: #9ca3af; background: #f9fafb; padding: 3px 8px; border-radius: 999px; }
.cw-ch-arrow { font-size: 16px; color: #c4b5fd; transition: transform 0.15s; }
.cw-chapter-card:hover .cw-ch-arrow { transform: translateX(3px); color: #6c45ff; }
.cw-ch-lock { font-size: 13px; opacity: 0.4; }
.cw-ch-free-badge {
  font-size: 10px; font-weight: 800; color: #16a34a;
  background: #dcfce7; border: 1px solid #86efac;
  padding: 2px 8px; border-radius: 999px; white-space: nowrap;
}

.cw-blur-wrap { position: relative; border-radius: 12px; overflow: hidden; }
.cw-blur-overlay {
  position: absolute; bottom: 0; left: 0; right: 0; height: 65%;
  background: linear-gradient(to bottom, transparent 0%, rgba(248,249,250,0.92) 45%, #f8f9fa 100%);
  display: flex; align-items: flex-end; justify-content: center;
  padding-bottom: 20px;
}

.cw-unlock-card {
  background: #ffffff;
  border: 1.5px solid #e5e7eb;
  border-radius: 16px; padding: 28px 20px 22px;
  text-align: center; margin-bottom: 20px;
  position: relative; overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
}
.cw-unlock-icon { font-size: 40px; margin-bottom: 10px; }
.cw-unlock-title { color: #111827; font-size: clamp(16px,4vw,19px); font-weight: 800; margin: 0 0 6px; line-height: 1.3; }
.cw-unlock-desc { color: #6b7280; font-size: 13.5px; margin: 0 0 18px; line-height: 1.5; }
.cw-unlock-note { color: #9ca3af; font-size: 11px; margin: 10px 0 0; }
.cw-unlock-divider {
  display: flex; align-items: center; gap: 10px; margin: 14px 0 10px;
}
.cw-unlock-divider span { flex: 1; height: 1px; background: #e5e7eb; }
.cw-unlock-divider em { color: #9ca3af; font-size: 11px; font-style: normal; white-space: nowrap; }

.cw-buymodal-wrap { display: flex; justify-content: center; margin-bottom: 6px; }
.cw-buymodal-wrap > button,
.cw-buymodal-wrap > div > button {
  width: 100% !important; justify-content: center !important;
  font-size: 15px !important; padding: 14px 20px !important;
  border-radius: 12px !important;
  background: #3730a3 !important;
  color: #fff !important;
  font-weight: 800 !important;
  border: none !important;
  box-shadow: 0 4px 14px rgba(55,48,163,0.35) !important;
}

.cw-buymodal-wrap-bundle > button,
.cw-buymodal-wrap-bundle > div > button {
  width: 100% !important; justify-content: center !important;
  font-size: 14px !important; padding: 12px 20px !important;
  border-radius: 12px !important;
  background: #fff !important;
  color: #3730a3 !important;
  font-weight: 700 !important;
  border: 1.5px solid #c7d2fe !important;
  box-shadow: none !important;
}
.cw-buymodal-wrap-bundle { display: flex; justify-content: center; margin-bottom: 6px; }

.cw-blur-overlay > button,
.cw-blur-overlay > div > button {
  background: #3730a3 !important;
  border-radius: 10px !important; padding: 12px 28px !important;
  font-size: 14px !important; font-weight: 800 !important;
  color: #fff !important; border: none !important;
  box-shadow: 0 4px 18px rgba(55,48,163,0.35) !important;
}

.cw-section-label {
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.06em; color: #9ca3af; margin-bottom: 10px;
}
.cw-unlocked-badge {
  display: flex; align-items: center; justify-content: center;
  background: #dcfce7; border: 1px solid #86efac;
  border-radius: 10px; padding: 10px 14px;
  font-size: 13px; font-weight: 700; color: #166534; margin-bottom: 16px;
}
.cw-subject-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
.cw-stab {
  border: 1.5px solid #d1d5db; background: #fff; color: #374151;
  font-size: 12px; font-weight: 700; padding: 6px 14px; border-radius: 999px;
  cursor: pointer; transition: background 0.15s, color 0.15s;
  -webkit-tap-highlight-color: transparent;
}
.cw-stab.active { background: #6c45ff; color: #fff; border-color: #6c45ff; }

/* ── MCQ Viewer ── */
.cw-viewer-wrap {
  position: fixed; top: 56px; left: 0; width: 100%;
  height: calc(100% - 56px);
  z-index: 9999; background: #fff; overflow-y: auto;
  display: flex; flex-direction: column;
}
.cw-topbar {
  display: flex; justify-content: space-between; align-items: center;
  background: #0f172a; color: #fff; padding: 10px 16px;
  position: sticky; top: 0; z-index: 1001; flex-shrink: 0;
}
.cw-topbar-left strong { display: block; font-size: 13px; font-weight: 800; }
.cw-topbar-left span { display: block; font-size: 11px; opacity: 0.7; margin-top: 1px; }
.cw-topbar-center { font-weight: 700; font-size: 14px; }
.cw-topbar-right { display: flex; gap: 8px; align-items: center; }
.cw-timer-pill {
  padding: 5px 12px; border-radius: 999px;
  font-weight: 800; font-size: 12px;
  background: #e0edff; color: #1d4ed8;
}
.cw-close-btn {
  background: none; border: none; color: #fff;
  font-size: 20px; cursor: pointer; padding: 2px 6px; line-height: 1;
  border-radius: 6px; transition: background 0.15s;
}
.cw-close-btn:hover { background: rgba(255,255,255,0.15); }

.cw-question-wrap { width: 100%; padding: 20px 16px 8px; box-sizing: border-box; }
.cw-question-text {
  font-weight: 600; font-size: 1.02rem;
  line-height: 1.65; color: #1f2937; white-space: pre-line;
}
.cw-options-wrap { width: 100%; padding: 8px 16px 24px; box-sizing: border-box; }

.cw-option-box {
  display: flex; align-items: center; gap: 14px;
  background: #fff; border: 2px solid #e5e7eb; border-radius: 14px;
  padding: 14px 16px; margin-bottom: 12px;
  cursor: pointer; transition: all 0.15s; user-select: none;
  position: relative; box-sizing: border-box;
}
.cw-option-box strong {
  width: 36px; height: 36px; border-radius: 50%;
  background: #f1f5f9; color: #475569;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 14px; flex-shrink: 0;
}
.cw-option-box.selected  { border-color: #6c45ff; }
.cw-option-box.selected strong { background: #6c45ff; color: #fff; }
.cw-option-box.correct   {
  border-color: #22c55e; background: #ffffff;
  position: relative; padding-right: 44px;
}
.cw-option-box.correct strong { background: #dcfce7; color: #16a34a; }
.cw-option-box.incorrect {
  border-color: #ef4444; background: #ffffff;
  position: relative; padding-right: 44px;
}
.cw-option-box.incorrect strong { background: #fee2e2; color: #dc2626; }

.cw-status-icon{
  position: absolute; top: 50%; right: 16px; transform: translateY(-50%);
  width: 26px; height: 26px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 700; color: #fff; flex-shrink: 0;
}
.cw-status-icon-correct{ background: #22c55e; }
.cw-status-icon-wrong{ background: #ef4444; }
.cw-marked-tag{
  position: absolute; top: -10px; right: 16px;
  background: #ffffff; padding: 0 6px;
  font-size: 11px; font-weight: 700; color: #ef4444; letter-spacing: 0.2px;
}

/* ── Solution box ── */
.cw-solution-box{
  margin: 20px 16px 140px 16px;
  padding: 18px;
  background: #fefce8;
  border: 1.5px solid #fde68a;
  border-radius: 14px;
  box-shadow: 0 1px 3px rgba(0,0,0,.04);
}
.cw-solution-header{
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 14px; padding-bottom: 10px;
  border-bottom: 1px solid #fde68a;
}
.cw-solution-label{
  font-weight: 700; font-size: 15px; color: #1d4ed8;
  letter-spacing: 0.2px; text-align: center;
}
.cw-solution-lang-block{
  margin-bottom: 14px; padding-left: 12px; border-left: 3px solid #fbbf24;
}
.cw-solution-lang-block:last-child{ margin-bottom: 0; }
.cw-solution-lang-hindi{ border-left-color: #60a5fa; }
.cw-solution-lang-tag{
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.5px; color: #b45309; margin-bottom: 4px;
}
.cw-solution-lang-hindi .cw-solution-lang-tag{ color: #1d4ed8; }
.cw-solution-text{
  font-size: 14.5px; line-height: 1.7; color: #1f2937; white-space: pre-line;
}
.cw-solution-empty{
  font-size: 13.5px; color: #9ca3af; font-style: italic;
}

.cw-bottom-bar {
  position: fixed; bottom: 0; left: 0; right: 0;
  background: #fff; border-top: 1px solid #e5e7eb;
  padding: 14px 16px 18px; z-index: 10000;
}
.cw-bottom-inner { max-width: 760px; margin: 0 auto; display: flex; gap: 12px; }
.cw-bottom-inner button { flex: 1; height: 46px; border-radius: 12px; font-weight: 700; font-size: 14px; cursor: pointer; }
.cw-btn-nav { background: #fff; border: 1.5px solid #d1d5db; color: #374151; }
.cw-btn-nav:disabled { color: #9ca3af; cursor: not-allowed; }
.cw-btn-check { flex: 2 !important; background: #6c45ff; color: #fff; border: none; }
.cw-btn-check:disabled { background: #e5e7eb; color: #9ca3af; cursor: not-allowed; }
.cw-btn-try { flex: 2 !important; background: #111827; color: #fff; border: none; display: flex; align-items: center; justify-content: center; gap: 8px; }

.cw-loading {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 50px 20px; text-align: center;
}
.cw-spinner {
  width: 40px; height: 40px;
  border: 4px solid #e5e7eb; border-top-color: #6c45ff;
  border-radius: 50%; animation: spin 0.8s linear infinite;
  margin-bottom: 14px;
}
.cw-loading p { font-weight: 600; color: #374151; margin: 0; }

@media (max-width: 600px) {
  .cw-question-wrap { padding: 16px 12px 8px; }
  .cw-options-wrap  { padding: 8px 12px 24px; }
  .cw-topbar        { padding: 10px 12px; }
  .cw-solution-box  { margin: 16px 12px 140px 12px; }
}
`;

/* ─────────────────────────────────────────────
   MCQ VIEWER
───────────────────────────────────────────── */
function ChapterViewer({ chapter, subject, onBack }) {
    const timerRef = useRef(null);

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [, setAttempted] = useState({});
    const [showAnswer, setShowAnswer] = useState({});
    const [, setAttemptCount] = useState({});
    const [timeLeft, setTimeLeft] = useState(0);

    /* ── Load questions ── */
    useEffect(() => {
        setCurrentIndex(0);
        setSelectedAnswers({});
        setAttempted({});
        setShowAnswer({});
        setAttemptCount({});
        setTimeLeft(0);

        async function load() {
            if (!chapter.questionIds?.length) { setLoading(false); return; }
            try {
                const ids = chapter.questionIds.join(",");
                const res = await authFetch(`/questions/by-ids?ids=${ids}&exam=JHPLE`);
                const data = await res.json();
                const sorted = data.sort((a, b) => b.year - a.year);
                setQuestions(sorted);
                const sel = {}, att = {}, show = {}, cnt = {};
                sorted.forEach((q, i) => {
                    const key = `${q.questionId}-${i}`;
                    sel[key] = undefined;
                    att[key] = false;
                    show[key] = false;
                    cnt[key] = 0;
                });
                setSelectedAnswers(sel);
                setAttempted(att);
                setShowAnswer(show);
                setAttemptCount(cnt);
            } catch (err) {
                console.error("Failed to load chapter questions", err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [chapter]);

    /* ── Timer ── */
    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        setTimeLeft(0);
        timerRef.current = setInterval(() => setTimeLeft(t => t + 1), 1000);
    }, []);

    useEffect(() => {
        if (questions.length > 0) startTimer();
        return () => timerRef.current && clearInterval(timerRef.current);
    }, [questions, startTimer]);

    /* ── Back ── */
    const handleBack = useCallback(() => {
        timerRef.current && clearInterval(timerRef.current);
        if (window.history.state?.page === "cw-jhple-viewer") window.history.replaceState(null, "");
        onBack();
    }, [onBack]);

    useEffect(() => {
        window.history.pushState({ page: "cw-jhple-viewer" }, "");
        const pop = (e) => { e.preventDefault(); handleBack(); };
        window.addEventListener("popstate", pop);
        return () => window.removeEventListener("popstate", pop);
    }, [handleBack]);

    function fmt(sec) {
        return `${Math.floor(sec / 60).toString().padStart(2, "0")}:${(sec % 60).toString().padStart(2, "0")}`;
    }

    function handleSelectOption(qid, idx) {
        if (showAnswer[qid]) return;
        setSelectedAnswers(p => ({ ...p, [qid]: idx }));
    }

    async function handleCheckAnswer() {
        const q = questions[currentIndex];
        if (!q) return;
        const qid = `${q.questionId}-${currentIndex}`;
        const chosen = selectedAnswers[qid];
        if (chosen === undefined) return;

        setAttempted(p => ({ ...p, [qid]: true }));

        setAttemptCount(prev => {
            const nextCount = (prev[qid] || 0) + 1;

            if (nextCount === 1) {
                setShowAnswer(p => ({ ...p, [qid]: "PARTIAL" }));
            }
            if (nextCount >= 2) {
                setShowAnswer(p => ({ ...p, [qid]: "FULL" }));
            }

            return { ...prev, [qid]: nextCount };
        });

        try {
            await authFetch("/exam/attempt", {
                method: "POST",
                body: JSON.stringify({
                    questionId: q.questionId,
                    year: q.year,
                    isCorrect: chosen === q.correctIndex,
                    timeTaken: timeLeft,
                    exam: "JHPLE",
                    subject,
                    chapter: chapter.name,
                }),
            });
            window.dispatchEvent(new Event("progressUpdated"));
        } catch (err) {
            console.error("Failed to save attempt", err);
        }

        timerRef.current && clearInterval(timerRef.current);
    }

    function handleTryAgain() {
        const q = questions[currentIndex];
        if (!q) return;
        const qid = `${q.questionId}-${currentIndex}`;
        setShowAnswer(p => ({ ...p, [qid]: false }));
        setSelectedAnswers(p => ({ ...p, [qid]: undefined }));
        startTimer();
    }

    function goNext() {
        if (currentIndex < questions.length - 1) { setCurrentIndex(i => i + 1); startTimer(); }
    }
    function goPrev() {
        if (currentIndex > 0) { setCurrentIndex(i => i - 1); startTimer(); }
    }

    if (loading) return (
        <div className="cw-viewer-wrap">
            <style dangerouslySetInnerHTML={{ __html: CW_STYLES }} />
            <div className="cw-loading"><div className="cw-spinner" /><p>Loading questions…</p></div>
        </div>
    );

    if (!questions.length) return (
        <div className="cw-viewer-wrap">
            <style dangerouslySetInnerHTML={{ __html: CW_STYLES }} />
            <div className="cw-loading" style={{ gap: 12 }}>
                <p style={{ color: "#6b7280" }}>No questions found for this chapter.</p>
                <button onClick={handleBack} style={{ padding: "8px 20px", borderRadius: 8, border: "1.5px solid #e5e7eb", background: "#fff", cursor: "pointer", fontWeight: 700 }}>← Back</button>
            </div>
        </div>
    );

    const q = questions[currentIndex];
    const qid = `${q.questionId}-${currentIndex}`;
    const showState = showAnswer[qid];
    const chosen = selectedAnswers[qid];
    const isShown = showState === "PARTIAL" || showState === "FULL";
    const showTryAgain = isShown && chosen !== q.correctIndex;

    const showSolution =
        (showState === "PARTIAL" && chosen === q.correctIndex) ||
        showState === "FULL";

    const chapterIndex = CHAPTER_DATA[subject].findIndex(c => c.name === chapter.name) + 1;

    return (
        <MathJaxContext>
            <style dangerouslySetInnerHTML={{ __html: CW_STYLES }} />
            <div className="cw-viewer-wrap">

                <div className="cw-topbar">
                    <div className="cw-topbar-left">
                        <strong>Ch {String(chapterIndex).padStart(2, "0")}: {chapter.name}</strong>
                        <span>{subject} · JHPLE PYQ Practice</span>
                    </div>
                    <div className="cw-topbar-center">Q {currentIndex + 1} / {questions.length}</div>
                    <div className="cw-topbar-right">
                        <div className="cw-timer-pill">⏱ {fmt(timeLeft)}</div>
                        <button className="cw-close-btn" onClick={handleBack} aria-label="Close">✕</button>
                    </div>
                </div>

                <div className="cw-question-wrap">
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 700, color: "#1d4ed8", marginBottom: 10 }}>
                        📅 {q.year} · JHPLE
                    </div>
                    <div className="cw-question-text"><MathJax dynamic>{q.text}</MathJax></div>
                </div>

                <div className="cw-options-wrap">
                    {q.options.map((opt, idx) => {
                        const optCorrect = idx === q.correctIndex;
                        const optSelected = chosen === idx;

                        let cls = "cw-option-box";
                        if (!showState && optSelected) cls += " selected";
                        if (showState === "PARTIAL" && optSelected && optCorrect) cls += " correct";
                        if (showState === "PARTIAL" && optSelected && !optCorrect) cls += " incorrect";
                        if (showState === "FULL" && optCorrect) cls += " correct";
                        if (showState === "FULL" && optSelected && !optCorrect) cls += " incorrect";

                        const isWrongMarked = cls.includes("incorrect");
                        const isRightShown = cls.includes("correct");

                        return (
                            <div key={idx} className={cls}
                                onClick={() => handleSelectOption(qid, idx)}
                                role="button" tabIndex={0}
                                onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleSelectOption(qid, idx); } }}
                                aria-pressed={optSelected} aria-disabled={!!showState}
                            >
                                {isWrongMarked && (
                                    <span className="cw-marked-tag">You Marked</span>
                                )}

                                <strong>{String.fromCharCode(65 + idx)}</strong>
                                <div style={{ fontSize: 14, lineHeight: 1.5 }}><MathJax dynamic>{opt}</MathJax></div>

                                {isRightShown && (
                                    <span className="cw-status-icon cw-status-icon-correct">✓</span>
                                )}
                                {isWrongMarked && (
                                    <span className="cw-status-icon cw-status-icon-wrong">✕</span>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* ====== SOLUTION BLOCK ====== */}
                {showSolution && (() => {
                    const explanation = q.explanation;

                    if (!explanation || explanation.trim().length === 0) {
                        return (
                            <div className="cw-solution-box">
                                <div className="cw-solution-header">
                                    <span className="cw-solution-label">Futurely Solution</span>
                                </div>
                                <div className="cw-solution-empty">
                                    Solution not added yet for this question.
                                </div>
                            </div>
                        );
                    }

                    const [englishPart = "", hindiPart = ""] = explanation.split("\n---\n");

                    return (
                        <div className="cw-solution-box">
                            <div className="cw-solution-header">
                                <span className="cw-solution-label">Futurely Solution</span>
                            </div>

                            <div className="cw-solution-lang-block">
                                <div className="cw-solution-lang-tag">English</div>
                                <div className="cw-solution-text">
                                    <MathJax dynamic>{englishPart}</MathJax>
                                </div>
                            </div>

                            {hindiPart && (
                                <div className="cw-solution-lang-block cw-solution-lang-hindi">
                                    <div className="cw-solution-lang-tag">हिंदी</div>
                                    <div className="cw-solution-text">
                                        <MathJax dynamic>{hindiPart}</MathJax>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })()}

                <div className="cw-bottom-bar">
                    <div className="cw-bottom-inner">
                        <button className="cw-btn-nav" onClick={goPrev} disabled={currentIndex === 0}>← Prev</button>
                        {showTryAgain ? (
                            <button className="cw-btn-try" onClick={handleTryAgain}>
                                <span style={{ fontSize: 18 }}>↺</span> Try Again
                            </button>
                        ) : (
                            <button className="cw-btn-check" onClick={handleCheckAnswer} disabled={isShown || chosen === undefined}>
                                {isShown && chosen === q.correctIndex ? "✓ Correct!" : "Check Answer"}
                            </button>
                        )}
                        <button className="cw-btn-nav" onClick={goNext} disabled={currentIndex === questions.length - 1}>Next →</button>
                    </div>
                </div>

            </div>
        </MathJaxContext>
    );
}

/* ─────────────────────────────────────────────
   CHAPTER LIST — Locked / Unlocked
───────────────────────────────────────────── */
export default function ChapterwisePYQJHPLE({ isUnlocked, onUnlocked, setFocusMode }) {
    const { isLoggedIn } = useAuth();
    const [activeSubject, setActiveSubject] = useState("Mathematics");
    const [activeChapter, setActiveChapter] = useState(null);

    useEffect(() => {
        setFocusMode && setFocusMode(!!activeChapter);
    }, [activeChapter, setFocusMode]);

    function openChapter(ch) {
        if (!isLoggedIn) {
            if (typeof window !== "undefined" && window.openLoginModal) {
                window.openLoginModal();
            } else {
                alert("Please log in to continue.");
            }
            return;
        }
        if (ch.free || isUnlocked) {
            if (!ch.questionIds?.length) {
                alert("Questions coming soon for this chapter!");
                return;
            }
            setActiveChapter(ch);
        }
    }

    if ((isUnlocked || activeChapter?.free) && activeChapter) {
        return (
            <ChapterViewer
                chapter={activeChapter}
                subject={activeSubject}
                onBack={() => setActiveChapter(null)}
            />
        );
    }

    return (
        <div className="cw-jhple-root">
            <style dangerouslySetInnerHTML={{ __html: CW_STYLES }} />

            {/* ── Unlock card ── */}
            {!isUnlocked && (
                <div className="cw-unlock-card">
                    <div className="cw-unlock-icon">🔒</div>
                    <h2 className="cw-unlock-title">Jharkhand Polytechnic Lateral Entry Chapter-wise PYQs (2021–2025)</h2>
                    <p className="cw-unlock-desc">
                        750+ questions sorted by topic. Master each chapter for JHPLE 2026.
                    </p>

                    <div className="cw-buymodal-wrap">
                        <BuyModal testSeriesId="JHPLE-chapterwise-pyq" onUnlocked={onUnlocked} />
                    </div>

                    <div className="cw-unlock-divider">
                        <span /><em>or get best value</em><span />
                    </div>

                    <div className="cw-buymodal-wrap-bundle">
                        <BuyModal testSeriesId="JHPLE-bundle" onUnlocked={onUnlocked} />
                    </div>
                </div>
            )}

            {/* ── Unlocked badge ── */}
            {isUnlocked && (
                <div className="cw-unlocked-badge">✅ Jharkhand Polytechnic Lateral Entry Chapter-wise PYQs Unlocked!</div>
            )}

            {/* ── Subject tabs ── */}
            <div className="cw-section-label">
                {isUnlocked ? "Select Subject" : "Preview — Chapter List"}
            </div>
            <div className="cw-subject-tabs">
                {SUBJECTS.map(s => (
                    <button
                        key={s}
                        className={`cw-stab ${activeSubject === s ? "active" : ""}`}
                        onClick={() => setActiveSubject(s)}
                    >{s}</button>
                ))}
            </div>

            {/* ── Chapter grid ── */}
            {isUnlocked ? (
                <div className="cw-chapter-grid">
                    {CHAPTER_DATA[activeSubject].map((ch, i) => {
                        const hasQs = ch.questionIds?.length > 0;
                        const years = hasQs
                            ? [...new Set(ch.questionIds.map(id => id.split("-")[0]))].sort((a, b) => b - a)
                            : [];
                        return (
                            <div
                                key={i}
                                className={`cw-chapter-card${!hasQs ? " cw-chapter-card--locked" : ""}`}
                                onClick={() => openChapter(ch)}
                            >
                                <div className="cw-ch-num-badge">{String(i + 1).padStart(2, "0")}</div>
                                <div className="cw-ch-info">
                                    <div className="cw-ch-name">{ch.name}</div>
                                    {hasQs && <div className="cw-ch-meta">{years.join(" · ")}</div>}
                                </div>
                                <div className="cw-ch-right">
                                    {hasQs
                                        ? <span className="cw-ch-count">{ch.questionIds.length} Qs</span>
                                        : <span className="cw-ch-soon">Soon</span>
                                    }
                                    {hasQs
                                        ? <span className="cw-ch-arrow">›</span>
                                        : <span className="cw-ch-lock">🔒</span>
                                    }
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                /* Locked preview */
                <div className="cw-blur-wrap">
                    <div className="cw-chapter-grid">
                        {CHAPTER_DATA[activeSubject].map((ch, i) => {
                            const isFree = !!ch.free;
                            return (
                                <div
                                    key={i}
                                    className={`cw-chapter-card${isFree ? "" : " cw-chapter-card--locked"}`}
                                    onClick={() => isFree ? openChapter(ch) : undefined}
                                    style={isFree ? { cursor: "pointer" } : {}}
                                >
                                    <div className="cw-ch-num-badge">{String(i + 1).padStart(2, "0")}</div>
                                    <div className="cw-ch-info">
                                        <div className="cw-ch-name">{ch.name}</div>
                                        <div className="cw-ch-meta">2021 · 2022 · 2023 · 2024 · 2025</div>
                                    </div>
                                    <div className="cw-ch-right">
                                        <span className="cw-ch-count">{ch.questionIds?.length || "—"} Qs</span>
                                        {isFree
                                            ? <span className="cw-ch-free-badge">FREE</span>
                                            : <span className="cw-ch-lock">🔒</span>
                                        }
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="cw-blur-overlay">
                        <BuyModal testSeriesId="JHPLE-chapterwise-pyq" onUnlocked={onUnlocked} />
                    </div>
                </div>
            )}
        </div>
    );
}
