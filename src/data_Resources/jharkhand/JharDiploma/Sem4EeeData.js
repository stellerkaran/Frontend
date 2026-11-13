// Jharkhand Diploma 4th Semester Electrical / Electrical & Electronics (EE / EEE) Papers & Subject Data
// Helpers (getLink / slugify / findBySlug) shared via makeResourceData.

import { getPaperLink, slugifySubject, makeFindSubjectBySlug } from '@/src/data_Resources/makeResourceData';
import { getDrivePreviewUrl, getDriveDirectDownloadUrl } from '@/src/utils/drive';

export const SEM4_EEE_YEARS = [2026, 2025, 2024, 2023, 2022, 2021];

export const SEM4_EEE_ALL_SUBJECTS = [
  "Power Electronics",
  "Computer Aided Electrical Drafting",
  "Fundamentals of Automation Technology",
  "Electric Motors",
  "Mastering Personal Finance",
];

export const SEM4_EEE_SUBJECT_DETAILS = {
  "Power Electronics": {
    code: "EE-401",
    type: "Core Branch",
    branch: "Electrical Engineering (EE / EEE)",
    tips: "Master the VI characteristics of SCR, MOSFET, and IGBT. Practice numericals on rectifiers, choppers, and inverter commutation circuits with neat waveform diagrams.",
  },
  "Computer Aided Electrical Drafting": {
    code: "EE-402",
    type: "Core Branch",
    branch: "Electrical Engineering (EE / EEE)",
    tips: "Practise AutoCAD drawing commands (line, offset, trim, hatch) and create single-line diagrams, panel layouts, and cable routing drawings for electrical installations.",
  },
  "Fundamentals of Automation Technology": {
    code: "EE-403",
    type: "Core Branch",
    branch: "Electrical Engineering (EE / EEE)",
    tips: "Revise PLC architecture, ladder logic basics, sensor and actuator types, and open-loop versus closed-loop control with block diagrams.",
  },
  "Electric Motors": {
    code: "EE-404",
    type: "Core Branch",
    branch: "Electrical Engineering (EE / EEE)",
    tips: "Compare DC motors, induction motors, and synchronous motors. Practise torque-slip characteristics, speed control methods, and starter circuit diagrams.",
  },
  "Mastering Personal Finance": {
    code: "EE-405",
    type: "Skill Enhancement",
    branch: "EE / EEE / General",
    tips: "Cover budgeting, saving, and investment basics along with simple financial planning numericals. Revise key terms like interest, inflation, and risk-return trade-off.",
  },
};

export const SEM4_EEE_PAPERS = {
  2026: {
      "Power Electronics": "https://drive.google.com/file/d/1DitdTXVGCjQ_M_wSYSL30rzK2VDAbxln/view",
      "Electric Motors": "https://drive.google.com/file/d/1E3vjEkg3luHBh8aW0M9rY8BZRNOg1R4r/view",
      "Fundamentals of Automation Technology": "https://drive.google.com/file/d/1M_eDsWWrlycWc3ETV0_cp7XBK-gaC2EI/view",
      "Computer Aided Electrical Drafting": "https://drive.google.com/file/d/1Ij4Y8MmAB6NUQmqpZtUGU5EnRv6p-vYA/view",
  },
  2025: {
     "Power Electronics": "https://drive.google.com/file/d/1Y7dVdJisttyTZ0tKLZCZF8NnHnq0MHzt/view",
      "Electric Motors": "https://drive.google.com/file/d/1cOqplJwktyH89pgCWTtl4yT5vq64_FQs/view",
      "Fundamentals of Automation Technology": "https://drive.google.com/file/d/1ODTek-4UyCxvdyS7Xm-_HCaLoIDld9Ak/view",
      "Computer Aided Electrical Drafting": "https://drive.google.com/file/d/1duNr4tUVRad3uJ4CRLgRa6cvPzvv2nvu/view",
      
  },
  2024: {},
};

export const getSem4EeeLink = (year, sub) => getPaperLink(SEM4_EEE_PAPERS, year, sub);
export const getSem4EeePreviewLink = (year, sub) => {
  const u = getSem4EeeLink(year, sub);
  return u ? getDrivePreviewUrl(u) : null;
};
export const getSem4EeeDownloadLink = (year, sub) => {
  const u = getSem4EeeLink(year, sub);
  return u ? getDriveDirectDownloadUrl(u) : null;
};

export { slugifySubject };

export const findSubjectBySlug = makeFindSubjectBySlug(SEM4_EEE_ALL_SUBJECTS);