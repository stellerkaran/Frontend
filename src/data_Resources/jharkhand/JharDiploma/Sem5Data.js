// Jharkhand Diploma 5th Semester CSE Papers & Subject Data
// Helpers (getLink / slugify / findBySlug) shared via makeResourceData.

import { getPaperLink, slugifySubject, makeFindSubjectBySlug } from '@/src/data_Resources/makeResourceData';
import { getDrivePreviewUrl, getDriveDirectDownloadUrl } from '@/src/utils/drive';

export const SEM5_YEARS = [2024, 2023, 2022];

export const SEM5_ALL_SUBJECTS = [
  "Microprocessors & Microcontrollers",
  "Java Programming",
  "Computer Graphics",
  "Elective-I(Mobile Computing)",
  "Elective-II(E-Commerce)",
];

export const SEM5_SUBJECT_DETAILS = {
  "Microprocessors & Microcontrollers": {
    code: "CSE-501",
    type: "Core Branch",
    branch: "Computer Science & Engineering (CSE)",
    tips: "Practice architecture diagrams and pin configuration. Learn instruction timing diagrams and write clean assembly language programs (ALP) for arithmetic operations.",
  },
  "Java Programming": {
    code: "CSE-502",
    type: "Core Branch",
    branch: "Computer Science & Engineering (CSE)",
    tips: "Write complete, error-free Java code snippets with proper comments. Prepare definitions and difference charts (e.g. Abstract Class vs Interface, Method Overloading vs Overriding).",
  },
  "Computer Graphics": {
    code: "CSE-503",
    type: "Core Branch",
    branch: "Computer Science & Engineering (CSE)",
    tips: "Master numerical derivations for transformation matrices and clipping calculations. Practice algorithm steps with solved example coordinates.",
  },
  "Elective-I(Mobile Computing)": {
    code: "CSE-504A",
    type: "Elective-I",
    branch: "Computer Science & Engineering (CSE)",
    tips: "Draw clean block diagrams of GSM network architecture and Mobile IP packet delivery. Clearly state advantages of microcell and handover types.",
  },
  "Elective-II(E-Commerce)": {
    code: "CSE-505A",
    type: "Elective-II",
    branch: "Computer Science & Engineering (CSE)",
    tips: "Provide real-world examples with practical case studies. Structure answers with headings, bullet points, and neat payment workflow diagrams.",
  },
};

export const SEM5_PAPERS = {
  2024: {},
  2023: {},
  2022: {
    "Microprocessors & Microcontrollers":
      "https://drive.google.com/file/d/161Al7h76xaewNHG7HXph9OshYQazClTD/view",
    "Java Programming":
      "https://drive.google.com/file/d/1VJ1_Wr8NM1zfDtVMTh_iRkVDDrpFKsb7/view",
    "Computer Graphics":
      "https://drive.google.com/file/d/1yvK-oh89hCTe9lI0vuaAsxKKxjaS8Llx/view",
    "Elective-I(Mobile Computing)":
      "https://drive.google.com/file/d/1L9JLRqYzBbWZsjuzpqqW9P1n1D4jVafS/view",
    "Elective-II(E-Commerce)":
      "https://drive.google.com/file/d/14B1ZuXgQ9lRMGaS5yEr-tNfP0kWONSgi/view",
  },
};

export const getSem5Link = (year, sub) => getPaperLink(SEM5_PAPERS, year, sub);
export const getSem5PreviewLink = (year, sub) => {
  const u = getSem5Link(year, sub);
  return u ? getDrivePreviewUrl(u) : null;
};
export const getSem5DownloadLink = (year, sub) => {
  const u = getSem5Link(year, sub);
  return u ? getDriveDirectDownloadUrl(u) : null;
};

export { slugifySubject };

export const findSubjectBySlug = makeFindSubjectBySlug(SEM5_ALL_SUBJECTS);
