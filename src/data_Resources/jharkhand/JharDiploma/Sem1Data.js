// Jharkhand Diploma 1st Semester Papers & Subject Data
// Helpers (getLink / slugify / findBySlug) shared via makeResourceData.
// Alias map + branch-subject fallback preserved via factory options.

import { getPaperLink, slugifySubject, makeFindSubjectBySlug } from '@/src/data_Resources/makeResourceData';
import { getDrivePreviewUrl, getDriveDirectDownloadUrl } from '@/src/utils/drive';

export const SEM1_YEARS = [2025, 2024, 2023, 2022];

export const SEM1_COMMON_SUBJECTS = [
  "Engineering Mathematics",
  "Engineering Physics",
  "Engineering Chemistry",
];

export const SEM1_BRANCH_SUBJECTS = [
  "Mechanical Science & Engineering",
  "Basics of Electrical Power System",
  "Fundamental of Computer",
  "Electronic Component & Device",
  "Basic Surveying",
  "Civil Engineering",
  "Computer Science Engineering",
  "Mech/ Meta/ Auto Engineering",
  "Electrical Engineering",
  "Electronics & Comm Engineering",
];

export const SEM1_ALL_SUBJECTS = [
  ...SEM1_COMMON_SUBJECTS,
  "Mechanical Science & Engineering",
  "Basics of Electrical Power System",
  "Fundamental of Computer",
  "Electronic Component & Device",
  "Basic Surveying",
];

export const SEM1_SUBJECT_DETAILS = {
  "Engineering Mathematics": {
    code: "MATH-1",
    type: "Common",
    branch: "All Branches",
    tips: "Focus heavily on Matrices (Cramer's Rule, Inverse), Differential Calculus formulas, and standard Integrals. Derivations and step-by-step solutions fetch full marks.",
  },
  "Engineering Physics": {
    code: "PHY-1",
    type: "Common",
    branch: "All Branches",
    tips: "Draw clean, labeled diagrams for optics and properties of matter (Bernoulli's theorem, Young's modulus). Memorize dimensional formulas and SI units.",
  },
  "Engineering Chemistry": {
    code: "CHEM-1",
    type: "Common",
    branch: "All Branches",
    tips: "Practice numerical problems on hardness calculation and calorific value (Dulong's formula). Balanced chemical reactions and corrosion mechanisms are repeated every year.",
  },
  "Mechanical Science & Engineering": {
    code: "MSE-1",
    type: "Branch",
    branch: "Mechanical / Metallurgy / Automobile",
    tips: "Draw Free Body Diagrams (FBD) for equilibrium numericals. Learn Lami's theorem and derivations of velocity ratio for pulley systems.",
  },
  "Basics of Electrical Power System": {
    code: "EE-1",
    type: "Branch",
    branch: "Electrical Engineering",
    tips: "Single-line layout diagrams of generating stations and substations are frequently asked. Master basic Ohm's Law and KCL/KVL circuit equations.",
  },
  "Fundamental of Computer": {
    code: "CSE-1",
    type: "Branch",
    branch: "Computer Science & Engg (CSE)",
    tips: "Practice binary arithmetic conversions and draw standard flowchart symbols neatly with clear decision branches.",
  },
  "Electronic Component & Device": {
    code: "ECE-1",
    type: "Branch",
    branch: "Electronics & Communication (ECE)",
    tips: "Draw V-I characteristic curves with proper voltage and current labels. Practice circuit diagrams for half-wave and full-wave bridge rectifiers.",
  },
  "Basic Surveying": {
    code: "CIVIL-1",
    type: "Branch",
    branch: "Civil Engineering",
    tips: "Practice field book entries and numericals for Reduced Level (RL) using Rise & Fall and Height of Instrument (HI) methods.",
  },
  "Civil Engineering": {
    code: "CIVIL-1",
    type: "Branch",
    branch: "Civil Engineering",
    tips: "Practice field book entries and Reduced Level calculation methods.",
  },
  "Computer Science Engineering": {
    code: "CSE-1",
    type: "Branch",
    branch: "Computer Science & Engg (CSE)",
    tips: "Practice binary arithmetic and draw clear flowcharts.",
  },
  "Mech/ Meta/ Auto Engineering": {
    code: "MSE-1",
    type: "Branch",
    branch: "Mechanical / Metallurgy / Automobile",
    tips: "Draw Free Body Diagrams for equilibrium problems.",
  },
  "Electrical Engineering": {
    code: "EE-1",
    type: "Branch",
    branch: "Electrical Engineering",
    tips: "Learn single-line diagrams of substations and basic circuit laws.",
  },
  "Electronics & Comm Engineering": {
    code: "ECE-1",
    type: "Branch",
    branch: "Electronics & Communication (ECE)",
    tips: "Draw clean V-I characteristics and rectifier circuits.",
  },
};

// Aliases mapping
export const SEM1_SUBJECT_ALIASES = {
  "mechanical science & engineering": "Mech/ Meta/ Auto Engineering",
  "mechanical science and engineering": "Mech/ Meta/ Auto Engineering",
  "mech/ meta/ auto engineering": "Mech/ Meta/ Auto Engineering",
  "mech-meta-auto-engineering": "Mech/ Meta/ Auto Engineering",
  "basics of electrical power system": "Electrical Engineering",
  "electrical engineering": "Electrical Engineering",
  "fundamental of computer": "Computer Science Engineering",
  "computer science engineering": "Computer Science Engineering",
  "electronic component & device": "Electronics & Comm Engineering",
  "electronic component and device": "Electronics & Comm Engineering",
  "electronics & comm engineering": "Electronics & Comm Engineering",
  "basic surveying": "Civil Engineering",
  "civil engineering": "Civil Engineering",
};

export const SEM1_PAPERS = {
  2025: {
    "Engineering Physics":
      "https://drive.google.com/file/d/1apPGk_-k49kFGJpzAbzOP7TNyvAmSZwO/view",
    "Engineering Mathematics":
      "https://drive.google.com/file/d/1EMyEBVTUU9pyChuM13B7vNtq1NYz-feN/view",
    "Engineering Chemistry":
      "https://drive.google.com/file/d/1x_HcT2LZnC47sa1mD6JB8wA5g9QBELjF/view",
  },
  2024: {
    "Engineering Physics":
      "https://drive.google.com/file/d/11Anhppa96B03pasBNkeX35LxLz2NxHI1/view",
    "Engineering Mathematics":
      "https://drive.google.com/file/d/1q37HmN_xbt_1GA0wQT0EUQpQfDtRuXPf/view",
    "Engineering Chemistry":
      "https://drive.google.com/file/d/1_IwKbn4BjXZq4A9ewSIJEuEbyfbZUv-i/view",
    "Fundamental of Computer":
      "https://drive.google.com/file/d/1Gjz0xoPFQoqLcxCHcVYx0ZCdHZK2VZpV/view",
    "Computer Science Engineering":
      "https://drive.google.com/file/d/1Gjz0xoPFQoqLcxCHcVYx0ZCdHZK2VZpV/view",
    "Mechanical Science & Engineering":
      "https://drive.google.com/file/d/1kHdxTwtfzAtQrmfTejsPd5M8EMJJY01w/view",
    "Mech/ Meta/ Auto Engineering":
      "https://drive.google.com/file/d/1kHdxTwtfzAtQrmfTejsPd5M8EMJJY01w/view",
    "Basic Surveying":
      "https://drive.google.com/file/d/1XFA3EzbGprCDKHPHUjk0FRHX_vjNFrqA/view",
    "Civil Engineering":
      "https://drive.google.com/file/d/1XFA3EzbGprCDKHPHUjk0FRHX_vjNFrqA/view",
    "Basics of Electrical Power System":
      "https://drive.google.com/file/d/18iarYtU6KEyYVefONC3sv-YcpdBKN3dl/view",
    "Electrical Engineering":
      "https://drive.google.com/file/d/18iarYtU6KEyYVefONC3sv-YcpdBKN3dl/view",
    "Electronic Component & Device":
      "https://drive.google.com/file/d/18iarYtU6KEyYVefONC3sv-YcpdBKN3dl/view",
    "Electronics & Comm Engineering":
      "https://drive.google.com/file/d/18iarYtU6KEyYVefONC3sv-YcpdBKN3dl/view",
  },
  2022: {
    "Engineering Physics":
      "https://drive.google.com/file/d/1ZwKXeMYt2L7fMjI7zT4gBqBol8AMH8R4/view",
    "Engineering Mathematics":
      "https://drive.google.com/file/d/1dQscU3njwVPjCjrVfkKjauRQ4lO0A8zs/view",
    "Engineering Chemistry":
      "https://drive.google.com/file/d/1qfUJbUKbMLvMOC0VQeJtBN3zNcv-R8zO/view",
  },
};

export const getSem1Link = (year, sub) =>
  getPaperLink(SEM1_PAPERS, year, sub, SEM1_SUBJECT_ALIASES);
export const getSem1PreviewLink = (year, sub) => {
  const u = getSem1Link(year, sub);
  return u ? getDrivePreviewUrl(u) : null;
};
export const getSem1DownloadLink = (year, sub) => {
  const u = getSem1Link(year, sub);
  return u ? getDriveDirectDownloadUrl(u) : null;
};

export { slugifySubject };

export const findSubjectBySlug = makeFindSubjectBySlug(SEM1_ALL_SUBJECTS, [
  SEM1_BRANCH_SUBJECTS,
]);
