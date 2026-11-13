// Jharkhand Diploma 3rd Semester CSE Papers & Subject Data
// Helpers (getLink / slugify / findBySlug) shared via makeResourceData.

import { getPaperLink, slugifySubject, makeFindSubjectBySlug } from '@/src/data_Resources/makeResourceData';
import { getDrivePreviewUrl, getDriveDirectDownloadUrl } from '@/src/utils/drive';

export const SEM3_CSE_YEARS = [2025, 2024, 2023, 2022, 2021];

export const SEM3_CSE_ALL_SUBJECTS = [
  "Advanced Python Programming",
  "Computer Hardware Maintenance and Administration",
  "Computer Networks",
  "Database System Concepts and PL/SQL",
  "Professional Skills",
];

export const SEM3_CSE_SUBJECT_DETAILS = {
  "Advanced Python Programming": {
    code: "CSE-301",
    type: "Core Branch",
    branch: "Computer Science Engineering (CSE)",
    tips: "Practice OOP concepts, file handling, and exception handling with hand-written working code. Revise commonly used modules and be ready to trace outputs of short Python programs.",
  },
  "Computer Hardware Maintenance and Administration": {
    code: "CSE-302",
    type: "Core Branch",
    branch: "Computer Science Engineering (CSE)",
    tips: "Revise PC assembly steps, BIOS settings, and OS installation procedures with clear step diagrams. Practice troubleshooting flowcharts for common hardware and software faults.",
  },
  "Computer Networks": {
    code: "CSE-303",
    type: "Core Branch",
    branch: "Computer Science Engineering (CSE)",
    tips: "Master the OSI and TCP/IP model layers along with IP addressing and subnetting numericals. Learn the roles and differences between routers, switches, and hubs with network diagrams.",
  },
  "Database System Concepts and PL/SQL": {
    code: "CSE-304",
    type: "Core Branch",
    branch: "Computer Science Engineering (CSE)",
    tips: "Practice writing SQL queries, PL/SQL blocks, and ER diagrams by hand. Revise normalization forms (1NF, 2NF, 3NF) with solved examples.",
  },
  "Professional Skills": {
    code: "CSE-305",
    type: "Skill Enhancement",
    branch: "CSE / General",
    tips: "Use clear formatting, professional vocabulary, and structured point-wise answers for workplace communication and case study questions.",
  },
};

export const SEM3_CSE_PAPERS = {
   2025: {
      "Advanced Python Programming": "https://drive.google.com/file/d/17rslSssCtZr-IECbbb2pfNgjYRl4ZC3j/view",
      "Computer Networks": "https://drive.google.com/file/d/1xm8iNvJXi-lHZOcK0DeBCVlL8V3eqT3U/view",
      "Database System Concepts and PL/SQL": "https://drive.google.com/file/d/1y06ZxY9huzXy_aZkg1PT9xplnkqiQBP2/view",
       "Professional Skills": "https://drive.google.com/file/d/1EzDTrEX9aTc_uw3zr6NfgxnHYYMO1rbi/view"
    },
  2024: {
    "Professional Skills": "https://drive.google.com/file/d/1sgppTOG3mOJKtuCtNnMm9ZUMKcMYosrJ/view",
  },
};

export const getSem3CseLink = (year, sub) => getPaperLink(SEM3_CSE_PAPERS, year, sub);
export const getSem3CsePreviewLink = (year, sub) => {
  const u = getSem3CseLink(year, sub);
  return u ? getDrivePreviewUrl(u) : null;
};
export const getSem3CseDownloadLink = (year, sub) => {
  const u = getSem3CseLink(year, sub);
  return u ? getDriveDirectDownloadUrl(u) : null;
};

export { slugifySubject };

export const findSubjectBySlug = makeFindSubjectBySlug(SEM3_CSE_ALL_SUBJECTS);