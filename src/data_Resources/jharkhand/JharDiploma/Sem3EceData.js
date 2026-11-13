// Jharkhand Diploma 3rd Semester ECE Papers & Subject Data
// Helpers (getLink / slugify / findBySlug) shared via makeResourceData.

import { getPaperLink, slugifySubject, makeFindSubjectBySlug } from '@/src/data_Resources/makeResourceData';
import { getDrivePreviewUrl, getDriveDirectDownloadUrl } from '@/src/utils/drive';

export const SEM3_ECE_YEARS = [2025, 2024, 2023, 2022, 2021];

export const SEM3_ECE_ALL_SUBJECTS = [
  "Analog Electronics",
  "Logic Design using Verilog",
  "Electronics Measurements & Testing Techniques",
  "Communication Systems",
  "Professional Skills",
];

export const SEM3_ECE_SUBJECT_DETAILS = {
  "Analog Electronics": {
    code: "ECE-301",
    type: "Core Branch",
    branch: "Electronics & Communication Engineering (ECE)",
    tips: "Draw clear circuit diagrams for Op-Amp configurations and derivation of voltage gain. Practice numerical questions on transistor biasing and oscillator frequency.",
  },
  "Logic Design using Verilog": {
    code: "ECE-302",
    type: "Core Branch",
    branch: "Electronics & Communication Engineering (ECE)",
    tips: "Write correct Verilog syntax for basic multiplexers, counters, and flip-flops. Draw state diagrams and timing diagrams for sequential counters.",
  },
  "Electronics Measurements & Testing Techniques": {
    code: "ECE-303",
    type: "Core Branch",
    branch: "Electronics & Communication Engineering (ECE)",
    tips: "Learn the bridge balance conditions with derivations and circuit diagrams. Draw block diagrams of CRO and DSO.",
  },
  "Communication Systems": {
    code: "ECE-304",
    type: "Core Branch",
    branch: "Electronics & Communication Engineering (ECE)",
    tips: "Master derivations for AM wave equation, modulation index, total power, and bandwidth calculation. Draw superheterodyne receiver block diagrams.",
  },
  "Professional Skills": {
    code: "ECE-305",
    type: "Skill Enhancement",
    branch: "ECE / General",
    tips: "Use clear formatting, professional vocabulary, and structured point-wise answers for workplace communication and case study questions.",
  },
};

export const SEM3_ECE_PAPERS = {
  2025: {
    "Analog Electronics": "https://drive.google.com/file/d/1mlLGh8_3K2539xZJNKv5i9gi99XVboaA/view",
    "Logic Design using Verilog": "https://drive.google.com/file/d/1g62m94wTTc4Tc9zyXNwVMWuO4EIwkwWY/view",
    "Electronics Measurements & Testing Techniques": "https://drive.google.com/file/d/17lPSvgHN7LDUcv9YgwgFBm0Zg5HggtHk/view",
    "Communication Systems": "https://drive.google.com/file/d/1GLpzqbpiGNmE1sshXZXexfaVKRYc32VC/view",
    "Professional Skills": "https://drive.google.com/file/d/1EzDTrEX9aTc_uw3zr6NfgxnHYYMO1rbi/view",
  },
  2024: {
     "Analog Electronics": "https://drive.google.com/file/d/10gq1lMdwGVL_mYsp4r85Kha1gTfizcvh/view",
    "Logic Design using Verilog": "https://drive.google.com/file/d/14JgWIS95iP5UCRrF2Ltf9Tbq6k0TBLA0/view",
    "Electronics Measurements & Testing Techniques": "https://drive.google.com/file/d/1iXNOI46yQD5VLYnI7l7W6TIvlrnfEBED/view",
    "Communication Systems": "https://drive.google.com/file/d/1hn1lOMpYdbC3guJxP6qOrjlG1QU3tC0m/view",
    "Professional Skills": "https://drive.google.com/file/d/1sgppTOG3mOJKtuCtNnMm9ZUMKcMYosrJ/view",
  },
};

export const getSem3EceLink = (year, sub) => getPaperLink(SEM3_ECE_PAPERS, year, sub);
export const getSem3EcePreviewLink = (year, sub) => {
  const u = getSem3EceLink(year, sub);
  return u ? getDrivePreviewUrl(u) : null;
};
export const getSem3EceDownloadLink = (year, sub) => {
  const u = getSem3EceLink(year, sub);
  return u ? getDriveDirectDownloadUrl(u) : null;
};

export { slugifySubject };

export const findSubjectBySlug = makeFindSubjectBySlug(SEM3_ECE_ALL_SUBJECTS);
