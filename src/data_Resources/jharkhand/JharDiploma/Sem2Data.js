// Jharkhand Diploma 2nd Semester Papers & Subject Data
// Helpers (getLink / slugify / findBySlug) shared via makeResourceData.

import { getPaperLink, slugifySubject, makeFindSubjectBySlug } from '@/src/data_Resources/makeResourceData';
import { getDrivePreviewUrl, getDriveDirectDownloadUrl } from '@/src/utils/drive';

export const SEM2_YEARS = [2025, 2024, 2023];

export const SEM2_COMMON_SUBJECTS = [
  "Project Management Skill",
  "Statistics and Analytics",
  "Fundamental of Electrical & Electronic Engg",
  "Environmental Sustainability",
];

export const SEM2_BRANCH_SUBJECTS = [
  "Python Programming",
  "Construction Material",
  "Transformer and Alternators",
  "Materials for Engineering",
  "Digital Electronics",
];

export const SEM2_ALL_SUBJECTS = [
  ...SEM2_COMMON_SUBJECTS,
  ...SEM2_BRANCH_SUBJECTS,
];

export const SEM2_SUBJECT_DETAILS = {
  "Project Management Skill": {
    code: "PMS",
    type: "Common",
    branch: "All Branches",
    tips: "Focus on drawing CPM/PERT network diagrams, finding critical paths, and project lifecycle phases.",
  },
  "Statistics and Analytics": {
    code: "STAT",
    type: "Common",
    branch: "All Branches",
    tips: "Formula-heavy subject. Practice numerical problems on Standard Deviation, Grouped Mean/Median, and basic Probability.",
  },
  "Fundamental of Electrical & Electronic Engg": {
    code: "FEEE",
    type: "Common",
    branch: "All Branches",
    tips: "Circuit diagrams and derivations carry high marks. Ensure you practice KCL/KVL nodal analysis and transformer EMF equations.",
  },
  "Environmental Sustainability": {
    code: "ENV",
    type: "Common",
    branch: "All Branches",
    tips: "Structured answers with headings, bullet points, and neat flowcharts/diagrams yield the best score.",
  },
  "Python Programming": {
    code: "PY",
    type: "Branch",
    branch: "Computer Science & Engg (CSE)",
    tips: "Write clean code snippets and dry-run outputs for loops, string slicing, and list operations.",
  },
  "Construction Material": {
    code: "CM",
    type: "Branch",
    branch: "Civil / Architecture / Interior Design",
    tips: "Memorize IS code standards, test procedures for cement/bricks, and water-cement ratio tables.",
  },
  "Transformer and Alternators": {
    code: "TA",
    type: "Branch",
    branch: "Electrical Engg & EEE",
    tips: "Phasor diagrams, open-circuit/short-circuit test calculations, and EMF equation derivations are tested every year.",
  },
  "Materials for Engineering": {
    code: "ME",
    type: "Branch",
    branch: "Mechanical / Automobile / Metallurgy",
    tips: "Draw the Iron-Iron Carbide phase diagram neatly with all temperatures, phases, and invariant reactions labeled.",
  },
  "Digital Electronics": {
    code: "DE",
    type: "Branch",
    branch: "Electronics & Communication (ECE)",
    tips: "K-Map minimization and circuit realization using universal NAND/NOR gates are compulsory questions.",
  },
};

export const SEM2_PAPERS = {
  2025: {
    "Project Management Skill":
      "https://drive.google.com/file/d/1xzTPA-Y0tUPl2XDLt7FjkzkHiZ5i8GBd/view",
    "Environmental Sustainability":
      "https://drive.google.com/file/d/1BU6rVqh4jAmrm1pqGlDvPZViHEXqp1L_/view",
    "Fundamental of Electrical & Electronic Engg":
      "https://drive.google.com/file/d/1XExHi0LB2Cal2JoNFWkuUUDUu1cR0eDR/view",
    "Statistics and Analytics":
      "https://drive.google.com/file/d/1bbVJL--B_SVDYwoRvhYtUskQD9vk0Rew/view",
    "Digital Electronics":
      "https://drive.google.com/file/d/10vmugmxHnd5QwKKgftFChGrmcAMfFfyz/view",
       "Materials for Engineering":
      "https://drive.google.com/file/d/1VRil8f2xkMkqgQvGTG7a8EhMq605nN_E/view",
  },
  2024: {
    "Project Management Skill":
      "https://drive.google.com/file/d/1Zfolr_572f8mk0NMUvjK4sMdkl1xd66-/view",
    "Environmental Sustainability":
      "https://drive.google.com/file/d/1WPIakGqpOkGlVn12raI6SLUSnkt2jwKY/view",
    "Fundamental of Electrical & Electronic Engg":
      "https://drive.google.com/file/d/1FbgOch6dAlShUXqpDYBPswDH4op2XSgr/view",
    "Statistics and Analytics":
      "https://drive.google.com/file/d/1ipIpC5JmkPybgLkQMWdd6AAyVdW_XiXW/view",
    "Python Programming":
      "https://drive.google.com/file/d/1QdpH1JrfLTKBwjcPPK0UmiPuT29WZpeD/view",
    "Construction Material":
      "https://drive.google.com/file/d/1tOfs3eZcwqrJ6Jn72yQY_dMzLxJ2OaWI/view",
    "Transformer and Alternators":
      "https://drive.google.com/file/d/1E3xKVn07dg1Ot8P94fWnZAtZnZLo_jK_/view",
    "Materials for Engineering":
      "https://drive.google.com/file/d/1pCB-Qd94IoukeWISswfFjtB2HhWO8Py2/view",
    "Digital Electronics":
      "https://drive.google.com/file/d/1B9nB_o6b2wVr7qOOacIvY2TbZmM8diOO/view",
  },
};

export const getSem2Link = (year, sub) => getPaperLink(SEM2_PAPERS, year, sub);
export const getSem2PreviewLink = (year, sub) => {
  const u = getSem2Link(year, sub);
  return u ? getDrivePreviewUrl(u) : null;
};
export const getSem2DownloadLink = (year, sub) => {
  const u = getSem2Link(year, sub);
  return u ? getDriveDirectDownloadUrl(u) : null;
};

export { slugifySubject };

export const findSubjectBySlug = makeFindSubjectBySlug(SEM2_ALL_SUBJECTS);
