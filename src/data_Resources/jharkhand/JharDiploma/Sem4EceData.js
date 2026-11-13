// Jharkhand Diploma 4th Semester Electronics & Communication Engineering (ECE) Papers & Subject Data
// Helpers (getLink / slugify / findBySlug) shared via makeResourceData.

import { getPaperLink, slugifySubject, makeFindSubjectBySlug } from '@/src/data_Resources/makeResourceData';
import { getDrivePreviewUrl, getDriveDirectDownloadUrl } from '@/src/utils/drive';

export const SEM4_ECE_YEARS = [2026, 2025, 2024, 2023, 2022, 2021];

export const SEM4_ECE_ALL_SUBJECTS = [
  "PCB Design and Fabrication",
  "Wireless Communication",
  "Embedded C Programming",
  "Industrial Automation",
  "Mastering Personal Finance",
];

export const SEM4_ECE_SUBJECT_DETAILS = {
  "PCB Design and Fabrication": {
    code: "ECE-401",
    type: "Core Branch",
    branch: "Electronics & Communication Engineering (ECE)",
    tips: "Learn the PCB design flow — schematic to layout, layer stack-up, component placement, and routing. Revise etching, drilling, and soldering processes with manufacturing diagrams.",
  },
  "Wireless Communication": {
    code: "ECE-402",
    type: "Core Branch",
    branch: "Electronics & Communication Engineering (ECE)",
    tips: "Master cellular concepts (frequency reuse, handoff), modulation and multiple access techniques (FDMA/TDMA/CDMA), and block diagrams of GSM and satellite communication.",
  },
  "Embedded C Programming": {
    code: "ECE-403",
    type: "Core Branch",
    branch: "Electronics & Communication Engineering (ECE)",
    tips: "Practise writing embedded C programs using pointers, structures, bit manipulation, and interrupt-driven I/O. Revise microcontroller architecture (registers, stack, memory map).",
  },
  "Industrial Automation": {
    code: "ECE-404",
    type: "Core Branch",
    branch: "Electronics & Communication Engineering (ECE)",
    tips: "Revise PLC ladder logic basics, sensors and actuators, SCADA architecture, and open versus closed loop control with block diagrams.",
  },
  "Mastering Personal Finance": {
    code: "ECE-405",
    type: "Skill Enhancement",
    branch: "ECE / General",
    tips: "Cover budgeting, saving, and investment basics along with simple financial planning numericals. Revise key terms like interest, inflation, and risk-return trade-off.",
  },
};

export const SEM4_ECE_PAPERS = {
  2026: {
     "PCB Design and Fabrication": "https://drive.google.com/file/d/1UlozzqGQEeUcdZ7CN7jiXA6OWS446YO3/view",
      "Wireless Communication": "https://drive.google.com/file/d/1sFDiQVXPPm2z1rNjFPAdZvVdMR8rWiMV/view",
      "Embedded C Programming": "https://drive.google.com/file/d/1uT4yW24LvR5xca7sEJCxQTCmvafJwFze/view",
      "Industrial Automation": "https://drive.google.com/file/d/13LUKZcCZA9-odz7Kp0UTAbct2ELnm2RU/view",
  },
  2025: {
     "PCB Design and Fabrication": "https://drive.google.com/file/d/1TPPbagX40VqTfoHDMNRT0oR8UtJh6ZZL/view",
      "Wireless Communication": "https://drive.google.com/file/d/1Wtvk0MPsnlpu8mZ873zJTEizIPpcXeQs/view",
      "Embedded C Programming": "https://drive.google.com/file/d/1weyNbIcSfah31yW0OcRe_ELIzIN0I5d4/view",
      "Industrial Automation": "https://drive.google.com/file/d/1XloTshJEEfR5a3obeT-2QtIOZJvO5VOM/view",
  },
  2024: {},
};

export const getSem4EceLink = (year, sub) => getPaperLink(SEM4_ECE_PAPERS, year, sub);
export const getSem4EcePreviewLink = (year, sub) => {
  const u = getSem4EceLink(year, sub);
  return u ? getDrivePreviewUrl(u) : null;
};
export const getSem4EceDownloadLink = (year, sub) => {
  const u = getSem4EceLink(year, sub);
  return u ? getDriveDirectDownloadUrl(u) : null;
};

export { slugifySubject };

export const findSubjectBySlug = makeFindSubjectBySlug(SEM4_ECE_ALL_SUBJECTS);