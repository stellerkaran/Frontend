// Jharkhand Diploma 3rd Semester Civil Engineering (CE) Papers & Subject Data
// Helpers (getLink / slugify / findBySlug) shared via makeResourceData.

import { getPaperLink, slugifySubject, makeFindSubjectBySlug } from '@/src/data_Resources/makeResourceData';
import { getDrivePreviewUrl, getDriveDirectDownloadUrl } from '@/src/utils/drive';

export const SEM3_CIVIL_YEARS = [2025, 2024, 2023];

export const SEM3_CIVIL_ALL_SUBJECTS = [
  "Engineering Mechanics and Strength of Materials",
  "Building Drawing using CAD",
  "Modern Surveying",
  "Construction Techniques",
  "Professional Skills",
];

export const SEM3_CIVIL_SUBJECT_DETAILS = {
  "Engineering Mechanics and Strength of Materials": {
    code: "CE-301",
    type: "Core Branch",
    branch: "Civil Engineering (CE)",
    tips: "Practice free-body diagrams, resultant and equilibrium of force systems, and numericals on stress-strain, bending moment, shear force, and beam deflection.",
  },
  "Building Drawing using CAD": {
    code: "CE-302",
    type: "Core Branch",
    branch: "Civil Engineering (CE)",
    tips: "Learn AutoCAD drawing commands and create plan, elevation, and section views of buildings with proper dimensioning and layer management.",
  },
  "Modern Surveying": {
    code: "CE-303",
    type: "Core Branch",
    branch: "Civil Engineering (CE)",
    tips: "Master chain, compass, and theodolite traversing, levelling and contouring, plus total station and GPS basics with neat instrument diagrams.",
  },
  "Construction Techniques": {
    code: "CE-304",
    type: "Core Branch",
    branch: "Civil Engineering (CE)",
    tips: "Revise foundations, masonry, concrete technology, and formwork. Learn construction stages with diagrams for RCC buildings and water-proofing methods.",
  },
  "Professional Skills": {
    code: "CE-305",
    type: "Skill Enhancement",
    branch: "CE / General",
    tips: "Use clear formatting, professional vocabulary, and structured point-wise answers for workplace communication and case study questions.",
  },
};

export const SEM3_CIVIL_PAPERS = {
  2025: {
    "Engineering Mechanics and Strength of Materials": "https://drive.google.com/file/d/1tvar-MGfpAuqqxFJ94Aclc4VtyKxuj7L/view",
    "Building Drawing using CAD": "https://drive.google.com/file/d/1kjSQ-4wvpflIKa7-A_atX1jDZPw81Rvp/view",
    "Modern Surveying": "https://drive.google.com/file/d/1EAOfmutwHJL0eJc8j2hUJ7WdzC1AGNyc/view",
    "Construction Techniques": "https://drive.google.com/file/d/1_dCj5AZYREvxtlpBAqwLfJ33DkLzCyd_/view",
    "Professional Skills":"https://drive.google.com/file/d/1EzDTrEX9aTc_uw3zr6NfgxnHYYMO1rbi/view",


  },
  2024: {
    "Engineering Mechanics and Strength of Materials": "https://drive.google.com/file/d/1cC42yqAdVnwrA9Q3AaBTsWoXnD6b0ekL/view",
    "Building Drawing using CAD": "https://drive.google.com/file/d/1HNAn0gz9zH39RsqfB3TxIIn3rew-JdmA/view",
    "Modern Surveying": "https://drive.google.com/file/d/1H2mpkKkt4uFtVW2d5_f50qhCGLkM4vrM/view",
    "Construction Techniques": "https://drive.google.com/file/d/1zzJQxVjbxSmeNyqmgwhPfYzXcH45hbZV/view",
     "Professional Skills": "https://drive.google.com/file/d/1sgppTOG3mOJKtuCtNnMm9ZUMKcMYosrJ/view",
         

  },
};

export const getSem3CivilLink = (year, sub) => getPaperLink(SEM3_CIVIL_PAPERS, year, sub);
export const getSem3CivilPreviewLink = (year, sub) => {
  const u = getSem3CivilLink(year, sub);
  return u ? getDrivePreviewUrl(u) : null;
};
export const getSem3CivilDownloadLink = (year, sub) => {
  const u = getSem3CivilLink(year, sub);
  return u ? getDriveDirectDownloadUrl(u) : null;
};

export { slugifySubject };

export const findSubjectBySlug = makeFindSubjectBySlug(SEM3_CIVIL_ALL_SUBJECTS);