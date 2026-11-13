// Jharkhand B.Tech 2nd Semester Papers & Subject Data
// Logic (getLink / slugify / findBySlug) shared via makeResourceData.
// Data below is untouched — only the repeated helpers were factored out.

import {
  createResourceData,
  slugifySubject,
} from '@/src/data_Resources/makeResourceData';

const SEM2 = createResourceData({
  years: [2025, 2024, 2023],

  allSubjects: [
    "Engineering Mathematics-II",
    "Engineering Chemistry",
    "Biology for Engineers",
    "Elements of Electronics Engineering",
    "Engineering Drawing and Computer Graphics",
    "Fundamentals of Measurement and Sensors",
  ],

  subjectDetails: {
    "Engineering Mathematics-II": {
      code: "MATH-102",
      type: "Core Engineering",
      branch: "Common for all Branches",
      tips: "Practice solving differential equations using Laplace Transforms with initial conditions. Memorize Laplace transform standard pairs and Fourier coefficients formulae.",
    },
    "Engineering Chemistry": {
      code: "CHEM-102",
      type: "Basic Sciences",
      branch: "Common for all Branches",
      tips: "Draw complete phase diagram curves with degrees of freedom calculated using Gibbs Phase Rule (F = C - P + 2).",
    },
    "Biology for Engineers": {
      code: "BIO-101",
      type: "Basic Sciences",
      branch: "Common for all Branches",
      tips: "Highlight engineering analogies for biological systems (e.g. heart as pump, nervous system as communication network). Draw labeled cell & enzyme-substrate diagrams.",
    },
    "Elements of Electronics Engineering": {
      code: "ECE-102",
      type: "Core Engineering",
      branch: "Common for all Branches",
      tips: "Derive op-amp closed loop gain equations using virtual ground concept. Practice K-map reduction and truth tables for combinational logic circuits.",
    },
    "Engineering Drawing and Computer Graphics": {
      code: "EDG-102",
      type: "Engineering Graphics",
      branch: "Common for all Branches",
      tips: "Draw step-by-step projection lines clearly. Practice surface development by parallel line and radial line methods.",
    },
    "Fundamentals of Measurement and Sensors": {
      code: "INST-101",
      type: "Engineering Science",
      branch: "Common for all Branches",
      tips: "Draw circuit diagrams of Wheatstone bridge and Instrumentation Amplifier with derivations. Explain working principles with neat labeled sensor diagrams.",
    },
  },

  papers: {
    2025: {
      "Engineering Mathematics-II": null,
      "Engineering Chemistry": null,
      "Biology for Engineers": null,
      "Elements of Electronics Engineering": null,
      "Engineering Drawing and Computer Graphics": null,
      "Fundamentals of Measurement and Sensors": null,
    },
    2024: {
      "Engineering Mathematics-II": "https://drive.google.com/file/d/18CNbxnPstJeA1vv6tZXyjgsZ1Y5FbDUd/view",
      "Engineering Chemistry": "https://drive.google.com/file/d/1N8BcFAMTKC7u9PVlbbkJRTD92l7d8GXc/view",
      "Biology for Engineers": "https://drive.google.com/file/d/1Q_nem_jWrT-gzTNJIn1Jazxl8JzG355k/view",
      "Elements of Electronics Engineering": "https://drive.google.com/file/d/1S8WFciwT05tRIWeiMgLvBsS9iJgzwQrS/view",
      "Engineering Drawing and Computer Graphics": "https://drive.google.com/file/d/1gIsvjD-yUBgYjhguPqim5dGKP7fUyRIJ/view",
      "Fundamentals of Measurement and Sensors": "https://drive.google.com/file/d/1BQlFouLh882dRfhcf1y4EqLuE9fDrWZD/view",
    },
    2023: {
      "Engineering Mathematics-II": null,
      "Engineering Chemistry": null,
      "Biology for Engineers": null,
      "Elements of Electronics Engineering": null,
      "Engineering Drawing and Computer Graphics": null,
      "Fundamentals of Measurement and Sensors": null,
    },
  },
});

// ── Backward-compatible aliases (page imports keep working, zero page change) ──
export const SEM2_YEARS = SEM2.YEARS;
export const SEM2_ALL_SUBJECTS = SEM2.ALL_SUBJECTS;
export const SEM2_SUBJECT_DETAILS = SEM2.SUBJECT_DETAILS;
export const SEM2_PAPERS = SEM2.PAPERS;
export const getSem2Link = SEM2.getLink;
export const getSem2PreviewLink = SEM2.getPreviewLink;
export const getSem2DownloadLink = SEM2.getDownloadLink;
export const findSubjectBySlug = SEM2.findSubjectBySlug;
export { slugifySubject };
export default SEM2;

