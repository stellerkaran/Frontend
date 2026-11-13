// Jharkhand Diploma 4th Semester Civil Engineering (CE) Papers & Subject Data
// Helpers (getLink / slugify / findBySlug) shared via makeResourceData.

import { getPaperLink, slugifySubject, makeFindSubjectBySlug } from '@/src/data_Resources/makeResourceData';
import { getDrivePreviewUrl, getDriveDirectDownloadUrl } from '@/src/utils/drive';

export const SEM4_CIVIL_YEARS = [2026, 2025, 2024, 2023, 2022, 2021];

export const SEM4_CIVIL_ALL_SUBJECTS = [
  "Concrete Technology",
  "Building Estimating and Valuation",
  "Site Management",
  "Design and Detailing of RCC Structures",
  "Mastering Personal Finance",
];

export const SEM4_CIVIL_SUBJECT_DETAILS = {
  "Concrete Technology": {
    code: "CE-401",
    type: "Core Branch",
    branch: "Civil Engineering (CE)",
    tips: "Learn cement hydration, grades of concrete, mix design, and tests like slump, cube compression, and non-destructive testing with neat diagrams and procedure steps.",
  },
  "Building Estimating and Valuation": {
    code: "CE-402",
    type: "Core Branch",
    branch: "Civil Engineering (CE)",
    tips: "Practise quantity take-off for earthwork, masonry, RCC, and finishing works. Revise centre-line and long-wall short-wall methods along with valuation numericals.",
  },
  "Site Management": {
    code: "CE-403",
    type: "Core Branch",
    branch: "Civil Engineering (CE)",
    tips: "Master site layout, material storage, safety norms, quality control, and documentation. Learn bar chart and PERT/CPM basics with network diagrams.",
  },
  "Design and Detailing of RCC Structures": {
    code: "CE-404",
    type: "Core Branch",
    branch: "Civil Engineering (CE)",
    tips: "Revise design of beams, slabs, columns, and footings using IS 456. Practise bending moment and shear force calculations and draw reinforcement detailing sketches.",
  },
  "Mastering Personal Finance": {
    code: "CE-405",
    type: "Skill Enhancement",
    branch: "CE / General",
    tips: "Cover budgeting, saving, and investment basics along with simple financial planning numericals. Revise key terms like interest, inflation, and risk-return trade-off.",
  },
};

export const SEM4_CIVIL_PAPERS = {
  2026: {
    "Building Estimating and Valuation": "https://drive.google.com/file/d/1IviJBhYt91wf0laZf7hdaVF8qAlmBD_d/view",
  },
  2025: {

    "Building Estimating and Valuation": "https://drive.google.com/file/d/14CYqwl4E6G6iaAFjY7T8o5__GTonyJRx/view",
    "Site Management": "https://drive.google.com/file/d/1wngK4td7PM-6puOqJ3FSMT5lfvZjT5PW/view",
    "Concrete Technology": "https://drive.google.com/file/d/1OfRSWXJuaDobxATlPpuszcCgnq4Y7YVS/view",
    "Design and Detailing of RCC Structures": "https://drive.google.com/file/d/1qsgW2InorLRkLSoYx8ClOuThHdkxovHE/view",
  },
  2024: {},
};

export const getSem4CivilLink = (year, sub) => getPaperLink(SEM4_CIVIL_PAPERS, year, sub);
export const getSem4CivilPreviewLink = (year, sub) => {
  const u = getSem4CivilLink(year, sub);
  return u ? getDrivePreviewUrl(u) : null;
};
export const getSem4CivilDownloadLink = (year, sub) => {
  const u = getSem4CivilLink(year, sub);
  return u ? getDriveDirectDownloadUrl(u) : null;
};

export { slugifySubject };

export const findSubjectBySlug = makeFindSubjectBySlug(SEM4_CIVIL_ALL_SUBJECTS);