// Jharkhand B.Tech 4th Semester (ECE) Papers & Subject Data
// Extracted from sem4-ece.js inline data — single source of truth.
// Logic (getLink / slugify / findBySlug) shared via makeResourceData.
// Data below is untouched.

import {
  createResourceData,
  slugifySubject,
} from '@/src/data_Resources/makeResourceData';

const SEM4_ECE = createResourceData({
  years: [2024, 2023, 2022],

  allSubjects: [
    "Communication Theory",
    "Machine Learning",
    "Control Systems",
    "Analog Electronics-I",
    "Semiconductor Device Modeling",
    "Mastering Personal Finance (Basic to Advance Strategies)",
  ],

  subjectDetails: {
    "Communication Theory": {
      code: "ECE-401",
      type: "Core Branch Subject",
      branch: "Electronics & Communication Engineering (ECE)",
      tips: "Focus on AM/FM modulation index numericals and noise figure/SNR calculations — these repeat almost every year.",
    },
    "Machine Learning": {
      code: "ECE-402",
      type: "Core Branch Subject",
      branch: "Electronics & Communication Engineering (ECE)",
      tips: "Understand the working and use-cases of core algorithms (Linear Regression, KNN, Decision Trees) with solved numerical examples.",
    },
    "Control Systems": {
      code: "ECE-403",
      type: "Core Branch Subject",
      branch: "Electronics & Communication Engineering (ECE)",
      tips: "Practice block diagram reduction and Routh-Hurwitz stability problems — these are the highest-weightage question types.",
    },
    "Analog Electronics-I": {
      code: "ECE-404",
      type: "Core Branch Subject",
      branch: "Electronics & Communication Engineering (ECE)",
      tips: "Practice amplifier gain/bandwidth numericals and oscillator circuit derivations — diagram-based questions carry the highest marks.",
    },
    "Semiconductor Device Modeling": {
      code: "ECE-405",
      type: "Core Branch Subject",
      branch: "Electronics & Communication Engineering (ECE)",
      tips: "Focus on device equivalent-circuit derivations and I-V characteristic curve based questions.",
    },
    "Mastering Personal Finance (Basic to Advance Strategies)": {
      code: "AC-406",
      type: "Audit Course",
      branch: "Common for all Branches",
      tips: "This is a qualifying audit course — focus on conceptual clarity of financial terms and instruments rather than heavy numericals.",
    },
  },

  // ⚠️ Replace `null` with real Google Drive share links as papers become available.
  // A `null` link renders "Uploading Soon" in the UI.
  papers: {
    2024: {
      "Communication Theory": null,
      "Machine Learning": null,
      "Control Systems": null,
      "Analog Electronics-I": null,
      "Semiconductor Device Modeling": null,
      "Mastering Personal Finance (Basic to Advance Strategies)": null,
    },
    2023: {
      "Communication Theory": null,
      "Machine Learning": null,
      "Control Systems": null,
      "Analog Electronics-I": null,
      "Semiconductor Device Modeling": null,
      "Mastering Personal Finance (Basic to Advance Strategies)": null,
    },
    2022: {
      "Communication Theory": null,
      "Machine Learning": null,
      "Control Systems": null,
      "Analog Electronics-I": null,
      "Semiconductor Device Modeling": null,
      "Mastering Personal Finance (Basic to Advance Strategies)": null,
    },
  },
});

// ── Backward-compatible aliases (page imports keep working, zero page change) ──
export const SEM4_ECE_YEARS = SEM4_ECE.YEARS;
export const SEM4_ECE_ALL_SUBJECTS = SEM4_ECE.ALL_SUBJECTS;
export const SEM4_ECE_SUBJECT_DETAILS = SEM4_ECE.SUBJECT_DETAILS;
export const SEM4_ECE_PAPERS = SEM4_ECE.PAPERS;
export const getSem4EceLink = SEM4_ECE.getLink;
export const getSem4EcePreviewLink = SEM4_ECE.getPreviewLink;
export const getSem4EceDownloadLink = SEM4_ECE.getDownloadLink;
export const findSubjectBySlug = SEM4_ECE.findSubjectBySlug;
export { slugifySubject };
export default SEM4_ECE;
