// Jharkhand D2D (JCECE Lateral Entry) Papers & Subject Data
// Helpers (getLink / slugify) shared via makeResourceData.
import { createResourceData, slugifySubject } from '@/src/data_Resources/makeResourceData';

export const D2D_YEARS = [2026, 2025, 2024, 2023, 2022, 2021];

export const D2D_SUBJECTS = [
  "D2D (Lateral Entry) Question Paper",
  "Engineering Physics",
  "Engineering Chemistry",
  "Engineering Mathematics",
];

export const D2D_ALL_PAPERS_LIST = [
  {
    year: 2026,
    title: "Jharkhand D2D Official Question Paper 2026",
    driveUrl: "https://drive.google.com/file/d/1QijyQaxxqiUoNObpcoZmDzXY5WqsjObi/view",
    questions: 150,
    marks: 150,
    duration: "150 Minutes",
  },
  {
    year: 2025,
    title: "Jharkhand D2D Official Question Paper 2025",
    driveUrl: "https://drive.google.com/file/d/1SKd1YKnu3jCXFmhzcVsVFb9lVi2bwYnQ/view",
    questions: 150,
    marks: 150,
    duration: "150 Minutes",
  },
  {
    year: 2024,
    title: "Jharkhand D2D Official Question Paper 2024",
    driveUrl: "https://drive.google.com/file/d/1VK_1yRtZKCIUeyj8O0dxil-DvKV-z-7u/view",
    questions: 150,
    marks: 150,
    duration: "150 Minutes",
  },
  {
    year: 2023,
    title: "Jharkhand D2D Official Question Paper 2023",
    driveUrl: "https://drive.google.com/file/d/1i8EmeuA7zCCJyVCIUuFjp4HFDnnGXlQ8/view",
    questions: 150,
    marks: 150,
    duration: "150 Minutes",
  },
  {
    year: 2022,
    title: "Jharkhand D2D Official Question Paper 2022",
    driveUrl: "https://drive.google.com/file/d/1Yf9RF2bp2cw_Q3JPzrj5JwJO0R--kRKa/view",
    questions: 150,
    marks: 150,
    duration: "150 Minutes",
  },
  {
    year: 2021,
    title: "Jharkhand D2D Official Question Paper 2021",
    driveUrl: "https://drive.google.com/file/d/1-mgbElP-26lZzZ8xYl2GtWpSTBhFw-aT/view",
    questions: 150,
    marks: 150,
    duration: "150 Minutes",
  },
];

export const D2D_SUBJECT_DETAILS = {
  "D2D (Lateral Entry) Question Paper": {
    code: "JCECE-D2D-ALL",
    type: "Comprehensive Paper",
    branch: "All Diploma Branches (LE B.Tech / B.E.)",
    marks: "150 Marks (150 MCQs)",
    questions: "150 Questions (50 Phy + 50 Chem + 50 Maths)",
    duration: "2 Hours 30 Minutes (150 Minutes)",
    negative: "+1 for correct, –0.25 for wrong",
    examBoard: "JCECEB, Jharkhand",
    tips: "Attempt high-scoring sections first. Focus on Mathematics and Physics since tie-breaking rank is determined first by Maths marks, then Physics marks.",
  },
  "Engineering Physics": {
    code: "JCECE-D2D-PHY",
    type: "Section 1",
    branch: "Lateral Entry (D2D)",
    marks: "50 Marks (50 MCQs)",
    questions: "50 Questions",
    duration: "Sectional Weightage: 50 Mins",
    negative: "+1 for correct, –0.25 for wrong",
    examBoard: "JCECEB, Jharkhand",
    tips: "Formulas in Mechanics, Optics, and Modern Physics repeat frequently in D2D. Draw and remember ray diagrams and SI units.",
  },
  "Engineering Chemistry": {
    code: "JCECE-D2D-CHEM",
    type: "Section 2",
    branch: "Lateral Entry (D2D)",
    marks: "50 Marks (50 MCQs)",
    questions: "50 Questions",
    duration: "Sectional Weightage: 50 Mins",
    negative: "+1 for correct, –0.25 for wrong",
    examBoard: "JCECEB, Jharkhand",
    tips: "Chemistry is the highest scoring section in D2D. Direct factual questions from Water treatment, Polymers, and Alloys appear every year.",
  },
  "Engineering Mathematics": {
    code: "JCECE-D2D-MATH",
    type: "Section 3 (Rank Decider)",
    branch: "Lateral Entry (D2D)",
    marks: "50 Marks (50 MCQs)",
    questions: "50 Questions",
    duration: "Sectional Weightage: 50 Mins",
    negative: "+1 for correct, –0.25 for wrong",
    examBoard: "JCECEB, Jharkhand",
    tips: "CRITICAL: First tie-breaker in D2D merit list is Mathematics marks. Master Matrices, Calculus, and Vector Algebra formulas.",
  },
};

export const D2D_PAPERS = {
  2026: {
    "D2D (Lateral Entry) Question Paper": "https://drive.google.com/file/d/1QijyQaxxqiUoNObpcoZmDzXY5WqsjObi/view",
    "Engineering Physics": "https://drive.google.com/file/d/1QijyQaxxqiUoNObpcoZmDzXY5WqsjObi/view",
    "Engineering Chemistry": "https://drive.google.com/file/d/1QijyQaxxqiUoNObpcoZmDzXY5WqsjObi/view",
    "Engineering Mathematics": "https://drive.google.com/file/d/1QijyQaxxqiUoNObpcoZmDzXY5WqsjObi/view",
  },
  2025: {
    "D2D (Lateral Entry) Question Paper": "https://drive.google.com/file/d/1SKd1YKnu3jCXFmhzcVsVFb9lVi2bwYnQ/view",
    "Engineering Physics": "https://drive.google.com/file/d/1SKd1YKnu3jCXFmhzcVsVFb9lVi2bwYnQ/view",
    "Engineering Chemistry": "https://drive.google.com/file/d/1SKd1YKnu3jCXFmhzcVsVFb9lVi2bwYnQ/view",
    "Engineering Mathematics": "https://drive.google.com/file/d/1SKd1YKnu3jCXFmhzcVsVFb9lVi2bwYnQ/view",
  },
  2024: {
    "D2D (Lateral Entry) Question Paper": "https://drive.google.com/file/d/1VK_1yRtZKCIUeyj8O0dxil-DvKV-z-7u/view",
    "Engineering Physics": "https://drive.google.com/file/d/1VK_1yRtZKCIUeyj8O0dxil-DvKV-z-7u/view",
    "Engineering Chemistry": "https://drive.google.com/file/d/1VK_1yRtZKCIUeyj8O0dxil-DvKV-z-7u/view",
    "Engineering Mathematics": "https://drive.google.com/file/d/1VK_1yRtZKCIUeyj8O0dxil-DvKV-z-7u/view",
  },
  2023: {
    "D2D (Lateral Entry) Question Paper": "https://drive.google.com/file/d/1i8EmeuA7zCCJyVCIUuFjp4HFDnnGXlQ8/view",
    "Engineering Physics": "https://drive.google.com/file/d/1i8EmeuA7zCCJyVCIUuFjp4HFDnnGXlQ8/view",
    "Engineering Chemistry": "https://drive.google.com/file/d/1i8EmeuA7zCCJyVCIUuFjp4HFDnnGXlQ8/view",
    "Engineering Mathematics": "https://drive.google.com/file/d/1i8EmeuA7zCCJyVCIUuFjp4HFDnnGXlQ8/view",
  },
  2022: {
    "D2D (Lateral Entry) Question Paper": "https://drive.google.com/file/d/1Yf9RF2bp2cw_Q3JPzrj5JwJO0R--kRKa/view",
    "Engineering Physics": "https://drive.google.com/file/d/1Yf9RF2bp2cw_Q3JPzrj5JwJO0R--kRKa/view",
    "Engineering Chemistry": "https://drive.google.com/file/d/1Yf9RF2bp2cw_Q3JPzrj5JwJO0R--kRKa/view",
    "Engineering Mathematics": "https://drive.google.com/file/d/1Yf9RF2bp2cw_Q3JPzrj5JwJO0R--kRKa/view",
  },
  2021: {
    "D2D (Lateral Entry) Question Paper": "https://drive.google.com/file/d/1-mgbElP-26lZzZ8xYl2GtWpSTBhFw-aT/view",
    "Engineering Physics": "https://drive.google.com/file/d/1-mgbElP-26lZzZ8xYl2GtWpSTBhFw-aT/view",
    "Engineering Chemistry": "https://drive.google.com/file/d/1-mgbElP-26lZzZ8xYl2GtWpSTBhFw-aT/view",
    "Engineering Mathematics": "https://drive.google.com/file/d/1-mgbElP-26lZzZ8xYl2GtWpSTBhFw-aT/view",
  },
};

export const D2D_SUBJECT_ALIASES = {
  // Legacy/short input aliases (URL slugs, old callers) — map to canonical paper name.
  // Ye display strings nahi hai; sirf lookup keys hai jo canonical naam pe resolve hoti hai.
  "full question paper": "D2D (Lateral Entry) Question Paper",
  "full-question-paper": "D2D (Lateral Entry) Question Paper",
  "full paper": "D2D (Lateral Entry) Question Paper",
  "full-paper": "D2D (Lateral Entry) Question Paper",
  "d2d paper": "D2D (Lateral Entry) Question Paper",
  "all": "D2D (Lateral Entry) Question Paper",
  "physics": "Engineering Physics",
  "engineering-physics": "Engineering Physics",
  "phy": "Engineering Physics",
  "chemistry": "Engineering Chemistry",
  "engineering-chemistry": "Engineering Chemistry",
  "chem": "Engineering Chemistry",
  "mathematics": "Engineering Mathematics",
  "engineering-mathematics": "Engineering Mathematics",
  "maths": "Engineering Mathematics",
  "math": "Engineering Mathematics",
};

const D2D = createResourceData({
  years: D2D_YEARS,
  allSubjects: D2D_SUBJECTS,
  subjectDetails: D2D_SUBJECT_DETAILS,
  papers: D2D_PAPERS,
  aliases: D2D_SUBJECT_ALIASES,
});

// ── Backward-compatible behavior (alias lookup → fallback to D2D (Lateral Entry) Question Paper) ──
export const getD2DLink = (year, sub = "D2D (Lateral Entry) Question Paper") =>
  D2D.getLink(year, sub) || D2D.getLink(year, "D2D (Lateral Entry) Question Paper");

export { slugifySubject };

export const findD2DSubjectBySlug = (slug) => {
  if (!slug) return "D2D (Lateral Entry) Question Paper";
  const normalized = slug.toLowerCase().trim();
  if (D2D_SUBJECT_ALIASES[normalized]) return D2D_SUBJECT_ALIASES[normalized];

  return (
    D2D_SUBJECTS.find((sub) => slugifySubject(sub) === normalized) ||
    D2D_SUBJECTS.find(
      (sub) => sub.toLowerCase().replace(/[^a-z0-9]/g, "") === normalized.replace(/[^a-z0-9]/g, "")
    ) ||
    "D2D (Lateral Entry) Question Paper"
  );
};
