"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import BuyModal from "@/components/BuyModal";
import { authFetch } from "@/src/utils/api";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useAuth } from "@/src/context/AuthContext";

/* ─────────────────────────────────────────────
   CHAPTER DATA FOR GNM
───────────────────────────────────────────── */
const CHAPTER_DATA = {
 Physics: [
  {
    "name": "Reflection & Refraction of Light",
    "free": true,
    "questionIds": [
      "2025-physics-106", "2025-physics-107", "2025-physics-108", "2025-physics-109", "2025-physics-110",
      "2025-physics-116", "2025-physics-117", "2025-physics-122", "2025-physics-123", "2025-physics-124",
      "2025-physics-125", "2025-physics-128", "2025-physics-129", "2025-physics-130",
      "2024-physics-102", "2024-physics-103", "2024-physics-106", "2024-physics-107", "2024-physics-108",
      "2024-physics-109", "2024-physics-110", "2024-physics-111", "2024-physics-112", "2024-physics-113",
      "2024-physics-114", "2024-physics-115", "2024-physics-126", "2024-physics-127", "2024-physics-128",
      "2024-physics-129", "2024-physics-130",
      "2023-physics-102", "2023-physics-103", "2023-physics-104", "2023-physics-122", "2023-physics-124",
      "2023-physics-125",
      "2022-physics-104", "2022-physics-111", "2022-physics-112", "2022-physics-113", "2022-physics-114",
      "2022-physics-115", "2022-physics-126", "2022-physics-127", "2022-physics-128", "2022-physics-129",
      "2022-physics-130"
    ]
  },
  {
    "name": "Human Eye and Optical Instruments",
    "questionIds": [
      "2025-physics-118", "2025-physics-119", "2025-physics-121",
      "2024-physics-101", "2024-physics-104", "2024-physics-105", "2024-physics-116", "2024-physics-117",
      "2024-physics-118", "2024-physics-121", "2024-physics-122", "2024-physics-123", "2024-physics-124",
      "2024-physics-125",
      "2023-physics-105", "2023-physics-110", "2023-physics-112", "2023-physics-126",
      "2022-physics-121", "2022-physics-122", "2022-physics-123", "2022-physics-124"
    ]
  },
  {
    "name": "Electrostatics",
    "questionIds": [
      "2024-physics-119",
      "2023-physics-130",
      "2022-physics-108"
    ]
  },
  {
    "name": "Current Electricity",
    "questionIds": [
      "2025-physics-101", "2025-physics-102", "2025-physics-104", "2025-physics-105", "2025-physics-111",
      "2025-physics-112", "2025-physics-115", "2025-physics-120", "2025-physics-126", "2025-physics-127",
      "2024-physics-120",
      "2023-physics-101", "2023-physics-106", "2023-physics-107", "2023-physics-108", "2023-physics-109",
      "2023-physics-113", "2023-physics-114", "2023-physics-115", "2023-physics-116", "2023-physics-119",
      "2023-physics-120", "2023-physics-121", "2023-physics-127", "2023-physics-128",
      "2022-physics-101", "2022-physics-102", "2022-physics-103", "2022-physics-105", "2022-physics-106",
      "2022-physics-107", "2022-physics-109", "2022-physics-110", "2022-physics-116", "2022-physics-117",
      "2022-physics-125"
    ]
  },
  {
    "name": "Magnetic Effects of Current",
    "questionIds": [
      "2025-physics-103", "2025-physics-113",
      "2023-physics-111", "2023-physics-117", "2023-physics-118", "2023-physics-123", "2023-physics-129",
      "2022-physics-118", "2022-physics-119", "2022-physics-120"
    ]
  },
  {
    "name": "Sources of Energy",
    "questionIds": [
      "2025-physics-114"
     ]
    }
  ],
 Chemistry: [
  {
    "name": "Matter — Elements, Mixtures & Compounds",
    "free": true,
    "questionIds": [
      "2023-chemistry-101", "2023-chemistry-103"
    ]
  },
  {
    "name": "Atomic Structure",
    "questionIds": [
      "2023-chemistry-125"
    ]
  },
  {
    "name": "Chemical Reactions & Equations",
    "questionIds": [
      "2025-chemistry-106", "2025-chemistry-107", "2025-chemistry-122",
      "2024-chemistry-111", "2024-chemistry-112", "2024-chemistry-114", "2024-chemistry-115",
      "2024-chemistry-116", "2024-chemistry-117", "2024-chemistry-119", "2024-chemistry-121",
      "2024-chemistry-123",
      "2023-chemistry-112", "2023-chemistry-118", "2023-chemistry-120", "2023-chemistry-126",
      "2023-chemistry-127", "2023-chemistry-128",
      "2022-chemistry-112", "2022-chemistry-113", "2022-chemistry-128", "2022-chemistry-129"
    ]
  },
  {
    "name": "Acids, Bases and Salts",
    "questionIds": [
      "2025-chemistry-108", "2025-chemistry-109", "2025-chemistry-111", "2025-chemistry-112",
      "2025-chemistry-113", "2025-chemistry-114", "2025-chemistry-115", "2025-chemistry-116",
      "2025-chemistry-118", "2025-chemistry-119", "2025-chemistry-120", "2025-chemistry-123",
      "2025-chemistry-124", "2025-chemistry-125", "2025-chemistry-126", "2025-chemistry-127",
      "2024-chemistry-101", "2024-chemistry-102", "2024-chemistry-103", "2024-chemistry-104",
      "2024-chemistry-105", "2024-chemistry-107", "2024-chemistry-108", "2024-chemistry-109",
      "2024-chemistry-110", "2024-chemistry-118", "2024-chemistry-120", "2024-chemistry-122",
      "2024-chemistry-125", "2024-chemistry-126", "2024-chemistry-127", "2024-chemistry-128",
      "2024-chemistry-129",
      "2023-chemistry-106", "2023-chemistry-108", "2023-chemistry-110", "2023-chemistry-121",
      "2023-chemistry-122", "2023-chemistry-123", "2023-chemistry-124", "2023-chemistry-129",
      "2023-chemistry-130",
      "2022-chemistry-103", "2022-chemistry-106", "2022-chemistry-107", "2022-chemistry-109",
      "2022-chemistry-110", "2022-chemistry-111", "2022-chemistry-115", "2022-chemistry-116",
      "2022-chemistry-117", "2022-chemistry-118", "2022-chemistry-119", "2022-chemistry-121",
      "2022-chemistry-122", "2022-chemistry-123", "2022-chemistry-126", "2022-chemistry-127",
      "2022-chemistry-130"
    ]
  },
  {
    "name": "Metals and Non-Metals",
    "questionIds": [
      "2025-chemistry-101", "2025-chemistry-103", "2025-chemistry-104", "2025-chemistry-105",
      "2025-chemistry-110", "2025-chemistry-117", "2025-chemistry-128", "2025-chemistry-129",
      "2025-chemistry-130",
      "2024-chemistry-113", "2024-chemistry-124",
      "2023-chemistry-102", "2023-chemistry-107", "2023-chemistry-111", "2023-chemistry-114",
      "2023-chemistry-117", "2023-chemistry-119",
      "2022-chemistry-101", "2022-chemistry-102", "2022-chemistry-104", "2022-chemistry-105",
      "2022-chemistry-108", "2022-chemistry-114", "2022-chemistry-120", "2022-chemistry-125"
    ]
  },
  {
    "name": "Carbon and its Compounds",
    "questionIds": [
      "2023-chemistry-104", "2023-chemistry-105", "2023-chemistry-109", "2023-chemistry-113",
      "2023-chemistry-115"
    ]
  },
  {
    "name": "Electrochemistry Basics",
    "questionIds": [
      "2024-chemistry-106",
      "2022-chemistry-124"
    ]
  },
  {
    "name": "Everyday Chemistry (Soaps, Detergents, Drugs)",
    "questionIds": [
      "2025-chemistry-121",
      "2024-chemistry-130",
      "2023-chemistry-116"
    ]
  },
  {
    "name": "Industrial Chemistry",
    "questionIds": [
      "2025-chemistry-102"
    ]
  }
],
 Biology: [
  {
    "name": "Cell Structure & Function",
    "free": true,
    "questionIds": [
      "2025-biology-108", "2025-biology-123",
      "2024-biology-116", "2024-biology-123",
      "2023-biology-102", "2023-biology-104", "2023-biology-121", "2023-biology-122",
      "2022-biology-106", "2022-biology-120"
    ]
  },
  {
    "name": "Human Body Systems (Digestive, Respiratory, Circulatory)",
    "questionIds": [
      "2025-biology-102", "2025-biology-104", "2025-biology-109", "2025-biology-110",
      "2025-biology-121", "2025-biology-122", "2025-biology-126",
      "2024-biology-102", "2024-biology-103", "2024-biology-104", "2024-biology-105",
      "2024-biology-112", "2024-biology-118", "2024-biology-126",
      "2023-biology-101", "2023-biology-107", "2023-biology-108", "2023-biology-109",
      "2023-biology-118", "2023-biology-119", "2023-biology-120", "2023-biology-126",
      "2023-biology-127",
      "2022-biology-101", "2022-biology-102", "2022-biology-103", "2022-biology-104",
      "2022-biology-122", "2022-biology-123", "2022-biology-128", "2022-biology-129",
      "2022-biology-130"
    ]
  },
  {
    "name": "Nervous System & Coordination",
    "questionIds": [
      "2025-biology-117", "2025-biology-118", "2025-biology-128", "2025-biology-129",
      "2024-biology-113", "2024-biology-114", "2024-biology-127",
      "2023-biology-110",
      "2022-biology-107", "2022-biology-108", "2022-biology-109", "2022-biology-112",
      "2022-biology-116", "2022-biology-117", "2022-biology-118"
    ]
  },
  {
    "name": "Reproductive System",
    "questionIds": [
      "2025-biology-119", "2025-biology-120",
      "2024-biology-115",
      "2023-biology-111", "2023-biology-112", "2023-biology-113", "2023-biology-114",
      "2023-biology-115", "2023-biology-123", "2023-biology-124",
      "2022-biology-110", "2022-biology-111", "2022-biology-114", "2022-biology-121"
    ]
  },
  {
    "name": "Nutrition & Health",
    "questionIds": [
      "2025-biology-106",
      "2023-biology-116"
    ]
  },
  {
    "name": "Common Diseases & Immunity",
    "questionIds": [
      "2024-biology-128"
    ]
  },
  {
    "name": "Genetics & Heredity Basics",
    "questionIds": [
      "2025-biology-105",
      "2023-biology-103"
    ]
  },
  {
    "name": "Plant Physiology",
    "questionIds": [
      "2025-biology-103", "2025-biology-107", "2025-biology-111", "2025-biology-112",
      "2025-biology-113", "2025-biology-116", "2025-biology-125", "2025-biology-127",
      "2024-biology-101", "2024-biology-106", "2024-biology-107", "2024-biology-108",
      "2024-biology-109", "2024-biology-110", "2024-biology-117", "2024-biology-119",
      "2024-biology-120", "2024-biology-121", "2024-biology-122", "2024-biology-125",
      "2023-biology-106", "2023-biology-117", "2023-biology-125",
      "2022-biology-105", "2022-biology-125", "2022-biology-126", "2022-biology-127"
    ]
  },
  {
    "name": "Ecology & Environment",
    "questionIds": [
      "2025-biology-101", "2025-biology-114", "2025-biology-115", "2025-biology-130",
      "2024-biology-124",
      "2023-biology-105"
    ]
  },
  {
    "name": "Health & Hygiene",
    "questionIds": [
      "2022-biology-119"
    ]
  },
  {
    "name": "Excretory System",
    "questionIds": [
      "2025-biology-124",
      "2024-biology-111", "2024-biology-129", "2024-biology-130",
      "2023-biology-128", "2023-biology-129", "2023-biology-130",
      "2022-biology-124"
    ]
  },
  {
    "name": "Microorganisms & Evolution",
    "questionIds": [
      "2022-biology-113", "2022-biology-115"
    ]
  }
],
  Mathematics: [
  {
    "name": "Number System",
    "free": true,
    "questionIds": [
      "2025-math-106", "2025-math-107", "2025-math-108",
      "2024-math-104", "2024-math-111",
      "2023-math-116",
      "2022-math-122", "2022-math-124"
    ]
  },
  {
    "name": "Percentage, Ratio & Proportion",
    "questionIds": [
      "2025-math-116", "2025-math-117", "2025-math-118", "2025-math-123",
      "2025-math-124", "2025-math-125",
      "2023-math-125"
    ]
  },
  {
    "name": "Simple & Compound Interest",
    "questionIds": [
      "2022-math-119"
    ]
  },
  {
    "name": "Time, Speed and Distance",
    "questionIds": [
      "2025-math-101", "2025-math-102", "2025-math-103", "2025-math-115",
      "2025-math-126", "2025-math-127", "2025-math-128", "2025-math-129",
      "2025-math-130"
    ]
  },
  {
    "name": "Time and Work",
    "questionIds": [
      "2025-math-111", "2025-math-112", "2025-math-113", "2025-math-114",
      "2025-math-119", "2025-math-120"
    ]
  },
  {
    "name": "Algebra — Linear & Quadratic Equations",
    "questionIds": [
      "2024-math-105", "2024-math-106", "2024-math-113", "2024-math-114",
      "2024-math-115", "2024-math-116", "2024-math-121", "2024-math-122",
      "2024-math-123", "2024-math-124", "2024-math-130",
      "2023-math-102", "2023-math-103", "2023-math-104", "2023-math-105",
      "2023-math-106", "2023-math-107", "2023-math-108", "2023-math-111",
      "2023-math-112", "2023-math-118", "2023-math-120", "2023-math-121",
      "2023-math-127",
      "2022-math-104", "2022-math-107", "2022-math-108", "2022-math-109",
      "2022-math-115", "2022-math-120", "2022-math-121", "2022-math-123",
      "2022-math-125"
    ]
  },
  {
    "name": "Mensuration — Area, Volume & Surface Area",
    "questionIds": [
      "2025-math-104", "2025-math-105",
      "2024-math-102", "2024-math-103", "2024-math-107",
      "2023-math-101", "2023-math-109", "2023-math-114", "2023-math-122",
      "2022-math-103", "2022-math-110"
    ]
  },
  {
    "name": "Statistics & Averages",
    "questionIds": [
      "2025-math-109", "2025-math-110", "2025-math-121", "2025-math-122",
      "2024-math-101",
      "2023-math-123", "2023-math-128", "2023-math-130",
      "2022-math-116", "2022-math-117"
    ]
  },
  {
    "name": "Geometry Basics",
    "questionIds": [
      "2024-math-108", "2024-math-117", "2024-math-119",
      "2023-math-110", "2023-math-129",
      "2022-math-102", "2022-math-106", "2022-math-113", "2022-math-114"
    ]
  },
  {
    "name": "Trigonometry Ratios",
    "questionIds": [
      "2024-math-118", "2024-math-128", "2024-math-129",
      "2023-math-117", "2023-math-124",
      "2022-math-101", "2022-math-126", "2022-math-127", "2022-math-128"
    ]
  },
  {
    "name": "Coordinate Geometry",
    "questionIds": [
      "2024-math-126", "2024-math-127",
      "2023-math-113", "2023-math-119", "2023-math-126",
      "2022-math-111", "2022-math-112"
    ]
  },
  {
    "name": "Probability & Combinatorics",
    "questionIds": [
      "2024-math-109", "2024-math-110", "2024-math-112", "2024-math-120",
      "2024-math-125",
      "2023-math-115",
      "2022-math-105", "2022-math-118"
    ]
  }
],
  English: [
  {
    "name": "Grammar — Tenses",
    "free": true,
    "questionIds": [
      "2025-english-104", "2025-english-105", "2025-english-106",
      "2025-english-128", "2025-english-129", "2025-english-130",
      "2024-english-101", "2024-english-102", "2024-english-103", "2024-english-104",
      "2024-english-115", "2024-english-116", "2024-english-117",
      "2023-english-106", "2023-english-107", "2023-english-108", "2023-english-109",
      "2022-english-101", "2022-english-102", "2022-english-103", "2022-english-104",
      "2022-english-130"
    ]
  },
  {
    "name": "Prepositions & Conjunctions",
    "questionIds": [
      "2025-english-120", "2025-english-121", "2025-english-122",
      "2024-english-122", "2024-english-123", "2024-english-124", "2024-english-125",
      "2024-english-126", "2024-english-127",
      "2023-english-101", "2023-english-102", "2023-english-103", "2023-english-104",
      "2023-english-118", "2023-english-119", "2023-english-120",
      "2022-english-111", "2022-english-113", "2022-english-125", "2022-english-127",
      "2022-english-129"
    ]
  },
  {
    "name": "Articles",
    "questionIds": [
      "2024-english-128", "2024-english-129", "2024-english-130",
      "2023-english-121", "2023-english-122",
      "2022-english-114", "2022-english-116"
    ]
  },
  {
    "name": "Synonyms & Antonyms",
    "questionIds": [
      "2025-english-101", "2025-english-102", "2025-english-103",
      "2024-english-113", "2024-english-114",
      "2023-english-113", "2023-english-114", "2023-english-115", "2023-english-116",
      "2023-english-117",
      "2022-english-106", "2022-english-108", "2022-english-110", "2022-english-112",
      "2022-english-126", "2022-english-128"
    ]
  },
  {
    "name": "One-Word Substitution",
    "questionIds": [
      "2025-english-113", "2025-english-114", "2025-english-115",
      "2024-english-118", "2024-english-119", "2024-english-120", "2024-english-121",
      "2023-english-127", "2023-english-128", "2023-english-129", "2023-english-130",
      "2022-english-115", "2022-english-117"
    ]
  },
  {
    "name": "Comprehension Passages",
    "questionIds": [
      "2025-english-123", "2025-english-124", "2025-english-125", "2025-english-126",
      "2025-english-127"
    ]
  },
  {
    "name": "Sentence Correction",
    "questionIds": [
      "2025-english-116", "2025-english-117"
    ]
  },
  {
    "name": "Spotting Errors",
    "questionIds": [
      "2025-english-107", "2025-english-108", "2025-english-109",
      "2022-english-118", "2022-english-120", "2022-english-122", "2022-english-123"
    ]
  },
  {
    "name": "Vocabulary Building",
    "questionIds": [
      "2025-english-110", "2025-english-111", "2025-english-112",
      "2024-english-109", "2024-english-110", "2024-english-111", "2024-english-112",
      "2023-english-105", "2023-english-123", "2023-english-124", "2023-english-125",
      "2023-english-126",
      "2022-english-105", "2022-english-107", "2022-english-109", "2022-english-124"
    ]
  },
  {
    "name": "Idioms & Phrases",
    "questionIds": [
      "2025-english-118", "2025-english-119",
      "2024-english-105", "2024-english-106", "2024-english-107", "2024-english-108",
      "2023-english-110", "2023-english-111", "2023-english-112"
    ]
  },
  {
    "name": "Pronouns & Relative Clauses",
    "questionIds": [
      "2022-english-119", "2022-english-121"
    ]
  }
]
};

const SUBJECTS = ["Physics", "Chemistry", "Biology", "Mathematics", "English"];

const CW_STYLES = `
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Chapter list root ── */
.cw-root { padding: 4px 0 24px; background: #f8f9fa; }

/* ── Chapter cards ── */
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
  width: 4px; background: #0aa06e; border-radius: 4px 0 0 4px;
  opacity: 0; transition: opacity 0.15s;
}
.cw-chapter-card:hover { box-shadow: 0 4px 16px rgba(10,160,110,0.13); transform: translateY(-1px); border-color: #6ee7b7; }
.cw-chapter-card:hover::before { opacity: 1; }
.cw-chapter-card--locked { border-color: #f3f4f6; cursor: default; opacity: 0.75; }
.cw-chapter-card--locked::before { display: none; }
.cw-chapter-card--locked:hover { box-shadow: none; transform: none; border-color: #f3f4f6; }

.cw-ch-num-badge {
  width: 32px; height: 32px; border-radius: 8px;
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 900; color: #0aa06e; flex-shrink: 0;
}
.cw-chapter-card--locked .cw-ch-num-badge { background: #f3f4f6; color: #9ca3af; }

.cw-ch-info { flex: 1; min-width: 0; }
.cw-ch-name { font-weight: 700; color: #1f2937; font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cw-ch-meta { font-size: 11px; color: #9ca3af; margin-top: 2px; }

.cw-ch-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.cw-ch-count { font-size: 11px; font-weight: 700; color: #0aa06e; background: #d1fae5; padding: 3px 9px; border-radius: 999px; white-space: nowrap; }
.cw-ch-soon { font-size: 10px; color: #9ca3af; background: #f9fafb; padding: 3px 8px; border-radius: 999px; }
.cw-ch-arrow { font-size: 16px; color: #6ee7b7; transition: transform 0.15s; }
.cw-chapter-card:hover .cw-ch-arrow { transform: translateX(3px); color: #0aa06e; }
.cw-ch-lock { font-size: 13px; opacity: 0.4; }
.cw-ch-free-badge {
  font-size: 10px; font-weight: 800; color: #16a34a;
  background: #dcfce7; border: 1px solid #86efac;
  padding: 2px 8px; border-radius: 999px; white-space: nowrap;
}

/* ── Blur overlay for locked preview ── */
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
  background: #0aa06e !important;
  color: #fff !important;
  font-weight: 800 !important;
  border: none !important;
  box-shadow: 0 4px 14px rgba(10,160,110,0.35) !important;
}

.cw-buymodal-wrap-bundle > button,
.cw-buymodal-wrap-bundle > div > button {
  width: 100% !important; justify-content: center !important;
  font-size: 14px !important; padding: 12px 20px !important;
  border-radius: 12px !important;
  background: #fff !important;
  color: #0aa06e !important;
  font-weight: 700 !important;
  border: 1.5px solid #a7f3d0 !important;
  box-shadow: none !important;
}

.cw-buymodal-wrap-bundle { display: flex; justify-content: center; margin-bottom: 6px; }

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
.cw-subject-tabs { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
.cw-stab {
  border: 1.5px solid #d1d5db; background: #fff; color: #374151;
  font-size: 12px; font-weight: 700; padding: 6px 14px; border-radius: 999px;
  cursor: pointer; transition: background 0.15s, color 0.15s;
}
.cw-stab.active { background: #0aa06e; color: #fff; border-color: #0aa06e; }

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
.cw-question-text { font-weight: 600; font-size: 1.02rem; line-height: 1.65; color: #1f2937; white-space: pre-line; }

.cw-options-wrap { width: 100%; padding: 8px 16px 16px; box-sizing: border-box; }
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
.cw-option-box.selected  { border-color: #0aa06e; }
.cw-option-box.selected strong { background: #0aa06e; color: #fff; }
.cw-option-box.correct   { border-color: #22c55e; background: #ffffff; position: relative; padding-right: 44px; }
.cw-option-box.correct strong { background: #dcfce7; color: #16a34a; }
.cw-option-box.incorrect { border-color: #ef4444; background: #ffffff; position: relative; padding-right: 44px; }
.cw-option-box.incorrect strong { background: #fee2e2; color: #dc2626; }

.cw-status-icon {
  position: absolute; top: 50%; right: 16px; transform: translateY(-50%);
  width: 26px; height: 26px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 700; color: #fff; flex-shrink: 0;
}
.cw-status-icon-correct { background: #22c55e; }
.cw-status-icon-wrong { background: #ef4444; }

.cw-marked-tag {
  position: absolute; top: -10px; right: 16px;
  background: #ffffff; padding: 0 6px;
  font-size: 11px; font-weight: 700; color: #ef4444; letter-spacing: 0.2px;
}

.cw-solution-box {
  margin: 20px 16px 140px 16px; padding: 18px;
  background: #fefce8; border: 1.5px solid #fde68a;
  border-radius: 14px; box-shadow: 0 1px 3px rgba(0,0,0,.04);
}
.cw-solution-header {
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid #fde68a;
}
.cw-solution-label { font-weight: 700; font-size: 15px; color: #1d4ed8; letter-spacing: 0.2px; text-align: center; }
.cw-solution-lang-block { margin-bottom: 14px; padding-left: 12px; border-left: 3px solid #fbbf24; }
.cw-solution-lang-block:last-child { margin-bottom: 0; }
.cw-solution-lang-hindi { border-left-color: #60a5fa; }
.cw-solution-lang-tag { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #b45309; margin-bottom: 4px; }
.cw-solution-lang-hindi .cw-solution-lang-tag { color: #1d4ed8; }
.cw-solution-text { font-size: 14.5px; line-height: 1.7; color: #1f2937; white-space: pre-line; }
.cw-solution-empty { font-size: 13.5px; color: #9ca3af; font-style: italic; }

.cw-bottom-bar {
  position: fixed; bottom: 0; left: 0; right: 0;
  background: #fff; border-top: 1px solid #e5e7eb;
  padding: 14px 16px 18px; z-index: 10000;
}
.cw-bottom-inner { max-width: 760px; margin: 0 auto; display: flex; gap: 12px; }
.cw-bottom-inner button { flex: 1; height: 46px; border-radius: 12px; font-weight: 700; font-size: 14px; cursor: pointer; }
.cw-btn-nav { background: #fff; border: 1.5px solid #d1d5db; color: #374151; }
.cw-btn-nav:disabled { color: #9ca3af; cursor: not-allowed; }
.cw-btn-check { flex: 2 !important; background: #0aa06e; color: #fff; border: none; }
.cw-btn-check:disabled { background: #e5e7eb; color: #9ca3af; cursor: not-allowed; }
.cw-btn-try { flex: 2 !important; background: #111827; color: #fff; border: none; display: flex; align-items: center; justify-content: center; gap: 8px; }

.cw-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 50px 20px; text-align: center; }
.cw-spinner { width: 40px; height: 40px; border: 4px solid #e5e7eb; border-top-color: #0aa06e; border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 14px; }
.cw-loading p { font-weight: 600; color: #374151; margin: 0; }

@media (max-width: 600px) {
  .cw-question-wrap { padding: 16px 12px 8px; }
  .cw-options-wrap  { padding: 8px 12px 16px; }
  .cw-topbar        { padding: 10px 12px; }
}
`;

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
        const res = await authFetch(`/questions/by-ids?ids=${ids}&exam=GNM`);
        const data = await res.json();
        const sorted = Array.isArray(data) ? data.sort((a, b) => b.year - a.year) : [];
        setQuestions(sorted);
        const sel = {}, att = {}, show = {}, cnt = {};
        sorted.forEach((q, i) => {
          const key = `${q.questionId || q.id}-${i}`;
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

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(0);
    timerRef.current = setInterval(() => setTimeLeft(t => t + 1), 1000);
  }, []);

  useEffect(() => {
    if (questions.length > 0) startTimer();
    return () => timerRef.current && clearInterval(timerRef.current);
  }, [questions, startTimer]);

  const handleBack = useCallback(() => {
    timerRef.current && clearInterval(timerRef.current);
    if (typeof window !== "undefined" && window.history.state?.page === "cw-viewer") {
      window.history.replaceState(null, "");
    }
    onBack();
  }, [onBack]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.pushState({ page: "cw-viewer" }, "");
    }
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
    const qid = `${q.questionId || q.id}-${currentIndex}`;
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
          questionId: q.questionId || q.id,
          year: q.year,
          isCorrect: chosen === q.correctIndex,
          timeTaken: timeLeft,
          exam: "GNM",
          subject,
          chapter: chapter.name,
        }),
      });
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("progressUpdated"));
      }
    } catch (err) {
      console.error("Failed to save attempt", err);
    }
  }

  function handleTryAgain() {
    const q = questions[currentIndex];
    if (!q) return;
    const qid = `${q.questionId || q.id}-${currentIndex}`;
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
  const qid = `${q.questionId || q.id}-${currentIndex}`;
  const showState = showAnswer[qid];
  const chosen = selectedAnswers[qid];
  const isShown = showState === "PARTIAL" || showState === "FULL";
  const showTryAgain = showState === "PARTIAL" && chosen !== q.correctIndex;

  const showSolution = (showState === "PARTIAL" && chosen === q.correctIndex) || showState === "FULL";

  let solutionBlock = null;
  if (showSolution) {
    const explanation = q.explanation;
    if (!explanation || explanation.trim().length === 0) {
      solutionBlock = (
        <div className="cw-solution-box">
          <div className="cw-solution-header">
            <span className="cw-solution-label">Futurely Solution</span>
          </div>
          <div className="cw-solution-empty">Solution not added yet for this question.</div>
        </div>
      );
    } else {
      const [englishPart = "", hindiPart = ""] = explanation.split("\n---\n");
      solutionBlock = (
        <div className="cw-solution-box">
          <div className="cw-solution-header">
            <span className="cw-solution-label">Futurely Solution</span>
          </div>
          <div className="cw-solution-lang-block">
            <div className="cw-solution-lang-tag">English</div>
            <div className="cw-solution-text"><MathJax dynamic>{englishPart}</MathJax></div>
          </div>
          {hindiPart && (
            <div className="cw-solution-lang-block cw-solution-lang-hindi">
              <div className="cw-solution-lang-tag">हिंदी</div>
              <div className="cw-solution-text"><MathJax dynamic>{hindiPart}</MathJax></div>
            </div>
          )}
        </div>
      );
    }
  }

  return (
    <MathJaxContext>
      <style dangerouslySetInnerHTML={{ __html: CW_STYLES }} />
      <div className="cw-viewer-wrap">

        <div className="cw-topbar">
          <div className="cw-topbar-left">
            <strong>Chapter {String(CHAPTER_DATA[subject]?.findIndex(c => c.name === chapter.name) + 1 || 1).padStart(2, "0")}: {chapter.name}</strong>
            <span>{subject} · Jharkhand GNM PYQ Practice</span>
          </div>
          <div className="cw-topbar-center">Q {currentIndex + 1} / {questions.length}</div>
          <div className="cw-topbar-right">
            <div className="cw-timer-pill">⏱ {fmt(timeLeft)}</div>
            <button className="cw-close-btn" onClick={handleBack} aria-label="Close">✕</button>
          </div>
        </div>

        <div className="cw-question-wrap">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 700, color: "#1d4ed8", marginBottom: 10 }}>
            📅 {q.year || "2025"} · GNM
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
                aria-pressed={optSelected} aria-disabled={!!showState} style={{ opacity: 1, position: "relative" }}
              >
                {isWrongMarked && <span className="cw-marked-tag">You Marked</span>}
                <strong>{String.fromCharCode(65 + idx)}</strong>
                <div style={{ fontSize: 14, lineHeight: 1.5 }}><MathJax dynamic>{opt}</MathJax></div>
                {isRightShown && <span className="cw-status-icon cw-status-icon-correct">✓</span>}
                {isWrongMarked && <span className="cw-status-icon cw-status-icon-wrong">✕</span>}
              </div>
            );
          })}
        </div>

        {solutionBlock}

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

export default function ChapterwisePYQGNM({ isUnlocked, onUnlocked, setFocusMode }) {
  const { isLoggedIn } = useAuth();
  const [activeSubject, setActiveSubject] = useState("Physics");
  const [activeChapter, setActiveChapter] = useState(null);

  useEffect(() => {
    setFocusMode && setFocusMode(!!activeChapter);
  }, [activeChapter, setFocusMode]);

  function openChapter(ch) {
    if (!isLoggedIn) {
      if (typeof window !== "undefined") {
        window.openLoginModal?.();
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
    <div className="cw-root">
      <style dangerouslySetInnerHTML={{ __html: CW_STYLES }} />

      {!isUnlocked && (
        <div className="cw-unlock-card">
          <div className="cw-unlock-icon">🔒</div>
          <h2 className="cw-unlock-title">Chapter-wise PYQs (2021–2025)</h2>
          <p className="cw-unlock-desc">
            Questions sorted by topic. Master each chapter individually for GNM 2026.
          </p>

          <div className="cw-buymodal-wrap">
            <BuyModal testSeriesId="gnm-chapterwise-pyq" onUnlocked={onUnlocked} />
          </div>

          <div className="cw-unlock-divider">
            <span /><em>or get best value</em><span />
          </div>

          <div className="cw-buymodal-wrap-bundle">
            <BuyModal testSeriesId="gnm-bundle" onUnlocked={onUnlocked} />
          </div>
        </div>
      )}

      {isUnlocked && (
        <div className="cw-unlocked-badge">✅ Chapter-wise PYQs Unlocked!</div>
      )}

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

      {isUnlocked ? (
        <div className="cw-chapter-grid">
          {(CHAPTER_DATA[activeSubject] || []).map((ch, i) => {
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
                  {hasQs && (
                    <div className="cw-ch-meta">
                      {years.join(" · ")}
                    </div>
                  )}
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
        <div className="cw-blur-wrap">
          <div className="cw-chapter-grid">
            {(CHAPTER_DATA[activeSubject] || []).map((ch, i) => {
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
            <BuyModal testSeriesId="gnm-chapterwise-pyq" onUnlocked={onUnlocked} />
          </div>
        </div>
      )}
    </div>
  );
}
