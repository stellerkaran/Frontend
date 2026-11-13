"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import BuyModal from "@/components/BuyModal";
import { authFetch } from "@/src/utils/api";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useAuth } from "@/src/context/AuthContext";

/* ─────────────────────────────────────────────
   CHAPTER DATA — JHP (Jharkhand Polytechnic)
   Subjects: Physics, Chemistry, Mathematics
──────────────────────────────f─────────────── */
const CHAPTER_DATA = {

    Physics: [
        {
            name: "Light – Reflection and Refraction",
            questionIds: [
                // 2025
                "2025-phy-116", "2025-phy-117", "2025-phy-118", "2025-phy-119", "2025-phy-031",
                "2025-phy-112", "2025-phy-120", "2025-phy-032", "2025-phy-033", "2025-phy-034",
                "2025-phy-035", "2025-phy-036", "2025-phy-037", "2025-phy-141", "2025-phy-142",
                "2025-phy-143", "2025-phy-144", "2025-phy-145",
                // 2024
                "2024-phy-110", "2024-phy-112", "2024-phy-113", "2024-phy-114", "2024-phy-115",
                "2024-phy-136", "2024-phy-137", "2024-phy-138", "2024-phy-139", "2024-phy-140",
                "2024-phy-141", "2024-phy-146", "2024-phy-147", "2024-phy-148", "2024-phy-149",
                "2024-phy-150",
                // 2023
                "2023-phy-101", "2023-phy-102", "2023-phy-106", "2023-phy-107", "2023-phy-108",
                "2023-phy-109", "2023-phy-123", "2023-phy-124", "2023-phy-125", "2023-phy-126",
                "2023-phy-135", "2023-phy-141", "2023-phy-144", "2023-phy-145", "2023-phy-146",
                "2023-phy-147", "2023-phy-148", "2023-phy-149",
                // 2022
                "2022-phy-116", "2022-phy-117", "2022-phy-118", "2022-phy-122", "2022-phy-125",
                "2022-phy-126", "2022-phy-127", "2022-phy-128", "2022-phy-129", "2022-phy-130",
                "2022-phy-132",
                // 2021
                "2021-phy-102", "2021-phy-103", "2021-phy-104", "2021-phy-105", "2021-phy-110",
                "2021-phy-116", "2021-phy-117", "2021-phy-118", "2021-phy-131", "2021-phy-132",
                "2021-phy-133", "2021-phy-134", "2021-phy-135"
            ]
        },
        {
            name: "The Human Eye and the Colourful World",
            questionIds: [
                // 2025
                "2025-phy-101", "2025-phy-102", "2025-phy-106", "2025-phy-107", "2025-phy-108",
                "2025-phy-109", "2025-phy-110", "2025-phy-038", "2025-phy-039", "2025-phy-040",
                // 2024
                "2024-phy-109", "2024-phy-121", "2024-phy-122", "2024-phy-126", "2024-phy-130",
                "2024-phy-145",
                // 2023
                "2023-phy-116", "2023-phy-117", "2023-phy-127", "2023-phy-128", "2023-phy-129",
                "2023-phy-143",
                // 2022
                "2022-phy-119", "2022-phy-120", "2022-phy-123", "2022-phy-124", "2022-phy-134",
                "2022-phy-135",
                // 2021
                "2021-phy-119", "2021-phy-120", "2021-phy-127", "2021-phy-129", "2021-phy-146",
                "2021-phy-147"
            ]
        },
        {
            name: "Electricity",
            questionIds: [
                // 2025
                "2025-phy-103", "2025-phy-104", "2025-phy-105", "2025-phy-111", "2025-phy-113",
                "2025-phy-121", "2025-phy-122", "2025-phy-123", "2025-phy-124", "2025-phy-125",
                "2025-phy-126", "2025-phy-127", "2025-phy-128", "2025-phy-129", "2025-phy-130",
                "2025-phy-146", "2025-phy-147", "2025-phy-148", "2025-phy-149", "2025-phy-150",
                // 2024
                "2024-phy-101", "2024-phy-102", "2024-phy-103", "2024-phy-104", "2024-phy-105",
                "2024-phy-108", "2024-phy-123", "2024-phy-124", "2024-phy-125", "2024-phy-131",
                "2024-phy-132", "2024-phy-135", "2024-phy-142", "2024-phy-143", "2024-phy-144",
                // 2023
                "2023-phy-103", "2023-phy-110", "2023-phy-114", "2023-phy-118", "2023-phy-119",
                "2023-phy-121", "2023-phy-130", "2023-phy-131", "2023-phy-132", "2023-phy-133",
                "2023-phy-134", "2023-phy-136", "2023-phy-137", "2023-phy-138", "2023-phy-139",
                "2023-phy-140", "2023-phy-142", "2023-phy-150",
                // 2022
                "2022-phy-131", "2022-phy-136", "2022-phy-137", "2022-phy-138", "2022-phy-139",
                // 2021
                "2021-phy-106", "2021-phy-107", "2021-phy-108", "2021-phy-111", "2021-phy-112",
                "2021-phy-113", "2021-phy-115", "2021-phy-130", "2021-phy-139", "2021-phy-141",
                "2021-phy-142", "2021-phy-143", "2021-phy-144", "2021-phy-145", "2021-phy-148",
                "2021-phy-149", "2021-phy-150"
            ]
        },
        {
            name: "Magnetic Effects of Electric Current",
            questionIds: [
                // 2025
                "2025-phy-114", "2025-phy-115",
                // 2024
                "2024-phy-107", "2024-phy-111", "2024-phy-127", "2024-phy-128", "2024-phy-129",
                "2024-phy-133", "2024-phy-134",
                // 2023
                "2023-phy-104", "2023-phy-105", "2023-phy-111", "2023-phy-112", "2023-phy-113",
                "2023-phy-115", "2023-phy-120", "2023-phy-122",
                // 2021
                "2021-phy-109", "2021-phy-121", "2021-phy-122", "2021-phy-128", "2021-phy-136",
                "2021-phy-137"
            ]
        },
        {
            name: "Sources of Energy",
            questionIds: [
                // 2024
                "2024-phy-106", "2024-phy-116", "2024-phy-117", "2024-phy-118", "2024-phy-119",
                "2024-phy-120",
                // 2022
                "2022-phy-105", "2022-phy-106",
                // 2021
                "2021-phy-101", "2021-phy-114", "2021-phy-123", "2021-phy-124", "2021-phy-125",
                "2021-phy-138", "2021-phy-140"
            ]
        },
        {
            name: "Motion",
            questionIds: [
                "2022-phy-140", "2022-phy-141", "2022-phy-142", "2022-phy-143", "2022-phy-144"
            ]
        },
        {
            name: "Laws of Motion and Gravitation",
            questionIds: [
                "2022-phy-101", "2022-phy-102", "2022-phy-103", "2022-phy-104",
                "2022-phy-113", "2022-phy-114", "2022-phy-115",
                "2022-phy-145", "2022-phy-146", "2022-phy-147", "2022-phy-148", "2022-phy-149",
                "2022-phy-150"
            ]
        },
        {
            name: "Work and Energy",
            questionIds: [
                "2022-phy-107", "2022-phy-133"
            ]
        },
        {
            name: "Sound",
            questionIds: [
                "2022-phy-108", "2022-phy-109", "2022-phy-110", "2022-phy-111", "2022-phy-112"
            ]
        },
    ],
    Chemistry: [
        {
            name: "Chemical Reactions and Equations",
            free: true,
            questionIds: [
                "2025-chem-132", "2025-chem-134", "2025-chem-135", "2025-chem-141",
                "2025-chem-143", "2025-chem-144", "2025-chem-145",
                "2024-chem-119", "2024-chem-120", "2024-chem-138", "2024-chem-146",
                "2024-chem-149", "2024-chem-150",
                "2023-chem-103",
                "2022-chem-148",
                "2021-chem-126", "2021-chem-130", "2021-chem-131", "2021-chem-141",
                "2021-chem-142", "2021-chem-143", "2021-chem-144"
            ]
        },
        {
            name: "Acids, Bases and Salts",
            questionIds: [
                "2025-chem-115", "2025-chem-121", "2025-chem-122", "2025-chem-123",
                "2025-chem-124", "2025-chem-125", "2025-chem-131",
                "2024-chem-101", "2024-chem-102", "2024-chem-106", "2024-chem-107",
                "2024-chem-108", "2024-chem-110", "2024-chem-121", "2024-chem-122",
                "2024-chem-123", "2024-chem-124", "2024-chem-125", "2024-chem-129",
                "2024-chem-130", "2024-chem-139", "2024-chem-140", "2024-chem-141",
                "2024-chem-148",
                "2023-chem-105",
                "2021-chem-101", "2021-chem-102", "2021-chem-107", "2021-chem-109",
                "2021-chem-110", "2021-chem-127", "2021-chem-132", "2021-chem-133",
                "2021-chem-134", "2021-chem-135", "2021-chem-136", "2021-chem-137",
                "2021-chem-138", "2021-chem-139", "2021-chem-140", "2021-chem-146"
            ]
        },
        {
            name: "Metals and Non-metals",
            questionIds: [
                "2025-chem-102", "2025-chem-103", "2025-chem-104", "2025-chem-105",
                "2025-chem-112", "2025-chem-113", "2025-chem-114", "2025-chem-126",
                "2025-chem-133", "2025-chem-150",
                "2024-chem-103", "2024-chem-104", "2024-chem-105", "2024-chem-111",
                "2024-chem-112", "2024-chem-113", "2024-chem-114", "2024-chem-115",
                "2024-chem-131", "2024-chem-132", "2024-chem-136", "2024-chem-137",
                "2024-chem-142", "2024-chem-143", "2024-chem-144",
                "2022-chem-124", "2022-chem-126",
                "2021-chem-103", "2021-chem-104", "2021-chem-105", "2021-chem-106",
                "2021-chem-108", "2021-chem-111", "2021-chem-115", "2021-chem-116",
                "2021-chem-117", "2021-chem-119", "2021-chem-120", "2021-chem-121",
                "2021-chem-122", "2021-chem-123", "2021-chem-124", "2021-chem-125",
                "2021-chem-128", "2021-chem-129", "2021-chem-145", "2021-chem-147",
                "2021-chem-149", "2021-chem-150"
            ]
        },
        {
            name: "Carbon and its Compounds",
            questionIds: [
                "2025-chem-101", "2025-chem-110", "2025-chem-111", "2025-chem-129",
                "2025-chem-130", "2025-chem-136", "2025-chem-137", "2025-chem-138",
                "2025-chem-139", "2025-chem-140", "2025-chem-142", "2025-chem-146",
                "2025-chem-147", "2025-chem-148", "2025-chem-149",
                "2024-chem-109", "2024-chem-116", "2024-chem-117", "2024-chem-118",
                "2024-chem-127", "2024-chem-128", "2024-chem-133", "2024-chem-134",
                "2024-chem-135", "2024-chem-145", "2024-chem-147",
                "2022-chem-121", "2022-chem-122", "2022-chem-123", "2022-chem-127",
                "2022-chem-128", "2022-chem-129", "2022-chem-130", "2022-chem-131",
                "2022-chem-132", "2022-chem-133", "2022-chem-134", "2022-chem-135",
                "2022-chem-136", "2022-chem-137", "2022-chem-138",
                "2021-chem-112", "2021-chem-113", "2021-chem-118"
            ]
        },
        {
            name: "Periodic Classification of Elements",
            questionIds: [
                "2025-chem-106", "2025-chem-107", "2025-chem-108", "2025-chem-109",
                "2025-chem-116", "2025-chem-117", "2025-chem-118", "2025-chem-119",
                "2025-chem-120", "2025-chem-127", "2025-chem-128",
                "2024-chem-126",
                "2023-chem-119", "2023-chem-117", "2023-chem-118", "2023-chem-137", "2023-chem-145", "2023-chem-108", "2023-chem-132",
                "2022-chem-114", "2022-chem-118", "2022-chem-119", "2022-chem-120",
                "2022-chem-125", "2022-chem-145", "2022-chem-147",
                "2021-chem-114", "2021-chem-116", "2021-chem-148"
            ]
        },
        {
            name: "Atoms and Molecules / Structure of the Atom",
            questionIds: [
                "2022-chem-103", "2022-chem-104", "2022-chem-105", "2022-chem-106",
                "2022-chem-107", "2022-chem-108", "2022-chem-109", "2022-chem-110",
                "2022-chem-111", "2022-chem-112", "2022-chem-113", "2022-chem-115",
                "2022-chem-116", "2022-chem-117", "2022-chem-139", "2022-chem-146"
            ]
        },
        {
            name: "Matter in Our Surroundings / Is Matter Around Us Pure",
            questionIds: [
                "2022-chem-101", "2022-chem-102", "2022-chem-140", "2022-chem-141",
                "2022-chem-142", "2022-chem-143", "2022-chem-144", "2022-chem-149",
                "2022-chem-150"
            ]
        },
        {
            name: "Structure of Atom (Class 11)",
            questionIds: ["2023-chem-143", "2023-chem-144"]
        },
        {
            name: "Equilibrium (out of syllabus)",
            questionIds: ["2023-chem-101", "2023-chem-102"]
        },
        {
            name: "Solutions (out of syllabus)",
            questionIds: ["2023-chem-112", "2023-chem-113"]
        },
        {
            name: "Chemical Kinetics (out of syllabus)",
            questionIds: ["2023-chem-114", "2023-chem-115"]
        },
        {
            name: "Coordination Compounds (out of syllabus)",
            questionIds: ["2023-chem-122", "2023-chem-123", "2023-chem-124", "2023-chem-125"]
        },
        {
            name: "General Principles of Isolation of Elements (out of syllabus)",
            questionIds: ["2023-chem-131"]
        },
        {
            name: "Thermodynamics (out of syllabus)",
            questionIds: ["2023-chem-134", "2023-chem-135", "2023-chem-138"]
        },
        {
            name: "Some Basic Concepts of Chemistry (out of syllabus)",
            questionIds: ["2023-chem-141", "2023-chem-142", "2023-chem-112", "2023-chem-113"]
        },
    ],
    Mathematics: [
        {
            name: "Real Numbers",
            free: true,
            questionIds: [
                "2025-math-111", "2025-math-112", "2025-math-115",
                "2024-math-109",
                "2021-math-5", "2021-math-19",
            ]
        },
        {
            name: "Polynomials",
            questionIds: [
                "2025-math-113", "2025-math-114", "2025-math-121", "2025-math-122", "2025-math-123", "2025-math-124",
                "2024-math-105", "2024-math-125",
                "2022-math-1", "2022-math-6", "2022-math-40", "2022-math-41", "2022-math-42", "2022-math-43", "2022-math-44", "2022-math-49",
                "2021-math-21", "2021-math-31", "2021-math-32", "2021-math-50",
            ]
        },
        {
            name: "Pair of Linear Equations in Two Variables",
            questionIds: [
                "2025-math-125", "2025-math-131", "2025-math-132", "2025-math-135",
                "2024-math-120", "2024-math-128", "2024-math-146",
                "2021-math-20", "2021-math-26", "2021-math-33", "2021-math-34", "2021-math-42", "2021-math-47",
            ]
        },
        {
            name: "Quadratic Equations",
            questionIds: [
                "2025-math-133", "2025-math-134", "2025-math-141",
                "2021-math-10", "2021-math-14", "2021-math-15", "2021-math-44",
            ]
        },
        {
            name: "Arithmetic Progressions",
            questionIds: [
                "2025-math-142", "2025-math-143", "2025-math-144",
                "2024-math-103", "2024-math-104", "2024-math-116", "2024-math-142", "2024-math-148",
                "2022-math-45", "2022-math-46", "2022-math-47",
                "2021-math-13", "2021-math-27", "2021-math-28", "2021-math-48", "2021-math-49",
            ]
        },
        {
            name: "Triangles",
            questionIds: [
                "2025-math-101", "2025-math-102", "2025-math-145", "2025-math-117",
                "2024-math-115", "2024-math-121", "2024-math-126", "2024-math-134", "2024-math-144",
                "2022-math-16",
                "2021-math-4", "2021-math-37", "2021-math-43",
            ]
        },
        {
            name: "Coordinate Geometry",
            questionIds: [
                "2025-math-103", "2025-math-104", "2025-math-105",
                "2024-math-106", "2024-math-110", "2024-math-119", "2024-math-124", "2024-math-138", "2024-math-147", "2024-math-150",
                "2022-math-7", "2022-math-8", "2022-math-9", "2022-math-10",
                "2021-math-12", "2021-math-22",
            ]
        },
        {
            name: "Introduction to Trigonometry",
            questionIds: [
                "2025-math-146", "2025-math-147", "2025-math-148", "2025-math-149",
                "2024-math-107", "2024-math-114", "2024-math-127", "2024-math-132", "2024-math-135", "2024-math-136", "2024-math-139", "2024-math-141", "2024-math-149",
                "2022-math-26", "2022-math-37", "2022-math-38",
                "2021-math-2", "2021-math-6", "2021-math-7", "2021-math-46",
            ]
        },
        {
            name: "Some Applications of Trigonometry",
            questionIds: [
                "2025-math-136", "2025-math-137", "2025-math-150",
                "2024-math-122",
                "2021-math-39",
            ]
        },
        {
            name: "Circles",
            questionIds: [
                "2025-math-116", "2025-math-138", "2025-math-139", "2025-math-140",
                "2024-math-101", "2024-math-112", "2024-math-140",
                "2022-math-11", "2022-math-12", "2022-math-13", "2022-math-14", "2022-math-15",
                "2021-math-9",
            ]
        },
        {
            name: "Areas Related to Circles",
            questionIds: [
                "2025-math-118", "2025-math-119",
                "2024-math-102", "2024-math-111", "2024-math-129", "2024-math-133",
                "2021-math-8", "2021-math-38",
            ]
        },
        {
            name: "Surface Areas and Volumes",
            questionIds: [
                "2025-math-120", "2025-math-126", "2025-math-127", "2025-math-128",
                "2024-math-117", "2024-math-143",
                "2022-math-29", "2022-math-31", "2022-math-32",
                "2021-math-23",
            ]
        },
        {
            name: "Statistics",
            questionIds: [
                "2025-math-106", "2025-math-107", "2025-math-108", "2025-math-129", "2025-math-130",
                "2024-math-108", "2024-math-118", "2024-math-123", "2024-math-131",
                "2022-math-35", "2022-math-36",
                "2021-math-16", "2021-math-25", "2021-math-41",
            ]
        },
        {
            name: "Probability",
            questionIds: [
                "2025-math-109", "2025-math-110",
                "2024-math-130",
                "2022-math-33", "2022-math-34",
                "2021-math-1", "2021-math-24",
            ]
        },
    ]
};

const SUBJECTS = ["Physics", "Chemistry", "Mathematics"];

/* ─────────────────────────────────────────────
   SHARED STYLES
───────────────────────────────────────────── */
const CW_STYLES = `
@keyframes spin { to { transform: rotate(360deg); } }

.cw-jhp-root { padding: 4px 0 24px; background: #f8f9fa; }

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
  font-weight: 700; font-size: 1.02rem;
  line-height: 1.65; color: #1f2937; white-space: pre-line;
}
.cw-options-wrap { width: 100%; padding: 8px 16px 120px; box-sizing: border-box; }

.cw-option-box {
  display: flex; align-items: center; gap: 14px;
  background: #fff; border: 2px solid #e5e7eb; border-radius: 14px;
  padding: 14px 16px; margin-bottom: 12px;
  cursor: pointer; transition: all 0.15s; user-select: none;
}
.cw-option-box strong {
  width: 36px; height: 36px; border-radius: 50%;
  background: #f1f5f9; color: #475569;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 14px; flex-shrink: 0;
}
.cw-option-box.selected  { border-color: #6c45ff; }
.cw-option-box.selected strong { background: #6c45ff; color: #fff; }
.cw-option-box.correct   { border-color: #22c55e; background: #f0fdf4; }
.cw-option-box.correct strong { background: #22c55e; color: #fff; }
.cw-option-box.incorrect { border-color: #ef4444; background: #fef2f2; }
.cw-option-box.incorrect strong { background: #ef4444; color: #fff; }

.cw-bottom-bar {
  position: fixed; bottom: 0; left: 0; right: 0;
  background: #fff; border-top: 1px solid #e5e7eb;
  padding: 14px 16px 18px; z-index: 10000;
}
.cw-bottom-inner { max-width: 760px; margin: 0 auto; display: flex; gap: 12px; }
.cw-bottom-inner button { flex: 1; height: 46px; border-radius: 12px; font-weight: 700; font-size: 14px; cursor: pointer; }
.cw-btn-nav { background: #fff; border: 1.5px solid #d1d5db; color: #374151; }
.cw-btn-nav:disabled { color: #9ca3af; cursor: not-allowed; }
.cw-btn-check { flex: 2 !important; background: #006eff !important; color: #fff !important; border: none !important; }
.cw-btn-check:disabled { background: #57a0ff !important; color: #ffffff !important; cursor: not-allowed; opacity: 1 !important; }
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
  .cw-options-wrap  { padding: 8px 12px 120px; }
  .cw-topbar        { padding: 10px 12px; }
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
                const res = await authFetch(`/questions/by-ids?ids=${ids}&exam=JHP`);
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
        if (window.history.state?.page === "cw-jhp-viewer") window.history.replaceState(null, "");
        onBack();
    }, [onBack]);

    useEffect(() => {
        window.history.pushState({ page: "cw-jhp-viewer" }, "");
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
            const next = (prev[qid] || 0) + 1;
            if (chosen === q.correctIndex) {
                setShowAnswer(p => ({ ...p, [qid]: "FULL" }));
            } else if (next === 1) {
                setShowAnswer(p => ({ ...p, [qid]: "PARTIAL" }));
            } else {
                setShowAnswer(p => ({ ...p, [qid]: "FULL" }));
            }
            return { ...prev, [qid]: next };
        });

        timerRef.current && clearInterval(timerRef.current);

        try {
            await authFetch("/exam/attempt", {
                method: "POST",
                body: JSON.stringify({
                    questionId: q.questionId,
                    year: q.year,
                    isCorrect: chosen === q.correctIndex,
                    timeTaken: timeLeft,
                    exam: "JHP",
                    subject,
                    chapter: chapter.name,
                }),
            });
            window.dispatchEvent(new Event("progressUpdated"));
        } catch (err) {
            console.error("Failed to save attempt", err);
        }
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

    /* ── Loading / empty ── */
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
    const showTryAgain = showState === "PARTIAL" && chosen !== q.correctIndex;

    const chapterIndex = CHAPTER_DATA[subject].findIndex(c => c.name === chapter.name) + 1;

    return (
        <MathJaxContext>
            <style dangerouslySetInnerHTML={{ __html: CW_STYLES }} />
            <div className="cw-viewer-wrap">

                <div className="cw-topbar">
                    <div className="cw-topbar-left">
                        <strong>Ch {String(chapterIndex).padStart(2, "0")}: {chapter.name}</strong>
                        <span>{subject} · Jharkhand Polytechnic PYQ Practice</span>
                    </div>
                    <div className="cw-topbar-center">Q {currentIndex + 1} / {questions.length}</div>
                    <div className="cw-topbar-right">
                        <div className="cw-timer-pill">⏱ {fmt(timeLeft)}</div>
                        <button className="cw-close-btn" onClick={handleBack} aria-label="Close">✕</button>
                    </div>
                </div>

                <div className="cw-question-wrap">
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 700, color: "#1d4ed8", marginBottom: 10 }}>
                        📅 {q.year} · JHP
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

                        return (
                            <div key={idx} className={cls}
                                onClick={() => handleSelectOption(qid, idx)}
                                role="button" tabIndex={0}
                                onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleSelectOption(qid, idx); } }}
                                aria-pressed={optSelected} aria-disabled={!!showState}
                            >
                                <strong>{String.fromCharCode(65 + idx)}</strong>
                                <div style={{ fontSize: 14, lineHeight: 1.5 }}><MathJax dynamic>{opt}</MathJax></div>
                            </div>
                        );
                    })}
                </div>

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
export default function ChapterwisePYQJHP({ isUnlocked, onUnlocked, setFocusMode }) {
    const { isLoggedIn } = useAuth();
    const [activeSubject, setActiveSubject] = useState("Physics");
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
        <div className="cw-jhp-root">
            <style dangerouslySetInnerHTML={{ __html: CW_STYLES }} />

            {/* ── Unlock card ── */}
            {!isUnlocked && (
                <div className="cw-unlock-card">
                    <div className="cw-unlock-icon">🔒</div>
                    <h2 className="cw-unlock-title">Jharkhand Polytechnic Chapter-wise PYQs (2021–2025)</h2>
                    <p className="cw-unlock-desc">
                        750+ questions sorted by topic across Physics, Chemistry & Mathematics. Master each chapter for Jharkhand Polytechnic 2026.
                    </p>

                    <div className="cw-buymodal-wrap">
                        <BuyModal testSeriesId="JHP-chapterwise-pyq" onUnlocked={onUnlocked} />
                    </div>

                    <div className="cw-unlock-divider">
                        <span /><em>or get best value</em><span />
                    </div>

                    <div className="cw-buymodal-wrap-bundle">
                        <BuyModal testSeriesId="JHP-bundle" onUnlocked={onUnlocked} />
                    </div>
                </div>
            )}

            {/* ── Unlocked badge ── */}
            {isUnlocked && (
                <div className="cw-unlocked-badge">✅ Jharkhand Polytechnic Chapter-wise PYQs Unlocked!</div>
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
                        <BuyModal testSeriesId="JHP-chapterwise-pyq" onUnlocked={onUnlocked} />
                    </div>
                </div>
            )}
        </div>
    );
}
