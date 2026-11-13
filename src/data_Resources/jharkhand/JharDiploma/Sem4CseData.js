// Jharkhand Diploma 4th Semester CSE Papers & Subject Data
// Helpers (getLink / slugify / findBySlug) shared via makeResourceData.

import { getPaperLink, slugifySubject, makeFindSubjectBySlug } from '@/src/data_Resources/makeResourceData';
import { getDrivePreviewUrl, getDriveDirectDownloadUrl } from '@/src/utils/drive';

export const SEM4_CSE_YEARS = [2026, 2025, 2024, 2023, 2022, 2021];

export const SEM4_CSE_ALL_SUBJECTS = [
  "Data Structures with Python",
  "Operating System and Administration",
  "Object Oriented Programming and Design with Java",
  "Software Engineering Principles and Practices",
  "Mastering Personal Finance",
];

export const SEM4_CSE_SUBJECT_DETAILS = {
  "Data Structures with Python": {
    code: "CSE-401",
    type: "Core Branch",
    branch: "Computer Science Engineering (CSE)",
    tips: "Practice implementing arrays, linked lists, stacks, queues, and trees in Python. Revise time-complexity analysis of common operations.",
  },
  "Operating System and Administration": {
    code: "CSE-402",
    type: "Core Branch",
    branch: "Computer Science Engineering (CSE)",
    tips: "Revise process scheduling algorithms, memory management techniques, and basic Linux/Windows administration commands.",
  },
  "Object Oriented Programming and Design with Java": {
    code: "CSE-403",
    type: "Core Branch",
    branch: "Computer Science Engineering (CSE)",
    tips: "Master core OOP concepts (inheritance, polymorphism, encapsulation) with Java syntax and simple design pattern examples.",
  },
  "Software Engineering Principles and Practices": {
    code: "CSE-404",
    type: "Core Branch",
    branch: "Computer Science Engineering (CSE)",
    tips: "Learn the SDLC models, requirement analysis techniques, and UML diagrams (use case, class, sequence).",
  },
  "Mastering Personal Finance": {
    code: "CSE-405",
    type: "Skill Enhancement",
    branch: "CSE / General",
    tips: "Cover budgeting, saving, and investment basics along with simple financial planning numericals. Revise key terms like interest, inflation, and risk-return trade-off.",
  },
};

export const SEM4_CSE_PAPERS = {
   2026: {
    "Data Structures with Python": "https://drive.google.com/file/d/1Q3NpFeCsrD2cLtxP72QqP85SIrxZeoji/view",
      "Operating System and Administration": "https://drive.google.com/file/d/1hrMCrLGw7JaQ0qlv3PMAoyN37zjlmRjv/view",
      "Object Oriented Programming and Design with Java": null,
      "Software Engineering Principles and Practices": "https://drive.google.com/file/d/16SxNPjEgpM8Y8ilsHUdtruw5A0AXjJu6/view",
      "Mastering Personal Finance": null,
     },
  2025: {
    "Data Structures with Python": "https://drive.google.com/file/d/1JRUV0ljVzAunuH5biU2nIB2R_k6PtV8y/view",
      "Operating System and Administration": "https://drive.google.com/file/d/1UAq-rynQLbojVJtRAFB8xfoLloTqXvuh/view",
      "Object Oriented Programming and Design with Java": "https://drive.google.com/file/d/1Pt5GfqWa4FwqhwsF_kcjNvwkcgIW3OS3/view",
      "Software Engineering Principles and Practices": "https://drive.google.com/file/d/1GQDteCLXMkyor5jlAhr3ZzcNG_G0JPjn/view",
      "Mastering Personal Finance": null,
  },
  2024: {
    "Data Structures with Python": null,
    "Operating System and Administration": null,
    "Object Oriented Programming and Design with Java": null,
    "Software Engineering Principles and Practices": null,
    "Mastering Personal Finance": null,
  },
};

export const getSem4CseLink = (year, sub) => getPaperLink(SEM4_CSE_PAPERS, year, sub);
export const getSem4CsePreviewLink = (year, sub) => {
  const u = getSem4CseLink(year, sub);
  return u ? getDrivePreviewUrl(u) : null;
};
export const getSem4CseDownloadLink = (year, sub) => {
  const u = getSem4CseLink(year, sub);
  return u ? getDriveDirectDownloadUrl(u) : null;
};

export { slugifySubject };

export const findSubjectBySlug = makeFindSubjectBySlug(SEM4_CSE_ALL_SUBJECTS);