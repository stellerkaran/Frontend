// Jharkhand Diploma 3rd Semester EE / EEE Papers & Subject Data
// Helpers (getLink / slugify / findBySlug) shared via makeResourceData.

import { getPaperLink, slugifySubject, makeFindSubjectBySlug } from '@/src/data_Resources/makeResourceData';
import { getDrivePreviewUrl, getDriveDirectDownloadUrl } from '@/src/utils/drive';

export const SEM3_EEE_YEARS = [2025, 2024, 2023, 2022, 2021];

export const SEM3_EEE_ALL_SUBJECTS = [
  "Basic of Electrical Power System",
  "Transmission and Distribution",
  "Switchgear and Protection",
  "Analog and Digital Electronics",
  "Professional Skills",
];

export const SEM3_EEE_SUBJECT_DETAILS = {
  "Basic of Electrical Power System": {
    code: "EE-301",
    type: "Core Branch",
    branch: "Electrical Engineering (EE / EEE)",
    tips: "Draw clean schematic layout diagrams for thermal, hydro, and nuclear generating stations. Practice numerical problems on tariff calculations and load factor.",
  },
  "Transmission and Distribution": {
    code: "EE-302",
    type: "Core Branch",
    branch: "Electrical Engineering (EE / EEE)",
    tips: "Learn the vector diagrams and derivations of ABCD constants for nominal T and π networks. Practice sag calculation considering wind and ice loads.",
  },
  "Switchgear and Protection": {
    code: "EE-303",
    type: "Core Branch",
    branch: "Electrical Engineering (EE / EEE)",
    tips: "Master the construction and working diagrams of SF6 and vacuum circuit breakers. Learn differential protection schemes (Merz-Price) with circuit diagrams.",
  },
  "Analog and Digital Electronics": {
    code: "EE-304",
    type: "Core Branch",
    branch: "Electrical Engineering (EE / EEE)",
    tips: "Draw neat circuit diagrams for Op-Amp inverting/non-inverting configurations and 555 timer pinouts. Practice 4-variable K-Map minimization.",
  },
  "Professional Skills": {
    code: "EE-305",
    type: "Skill Enhancement",
    branch: "EE / EEE / General",
    tips: "Use clear formatting, professional vocabulary, and structured point-wise answers for workplace communication and case study questions.",
  },
};

export const SEM3_EEE_PAPERS = {
  2025: {
    "Professional Skills":"https://drive.google.com/file/d/1EzDTrEX9aTc_uw3zr6NfgxnHYYMO1rbi/view",
  },
  2024: {
    "Basic of Electrical Power System": "https://drive.google.com/file/d/1pDqAU2Etn-WG7YyqGyVujQm6qTf79rvI/view",
    "Transmission and Distribution": "https://drive.google.com/file/d/1KqdhwhGZheLxvHmVCX6D_pGwOSa2rfzG/view",
    "Switchgear and Protection": "https://drive.google.com/file/d/1LnJnoYN11NA-OVR_RZzTh_1dNIJKwNNh/view",
    "Analog and Digital Electronics": "https://drive.google.com/file/d/1z5a_aQU5VXTpOl5rbV4vC3a4nEHq6r03/view",
    "Professional Skills": "https://drive.google.com/file/d/1sgppTOG3mOJKtuCtNnMm9ZUMKcMYosrJ/view",
  },
};

export const getSem3EeeLink = (year, sub) => getPaperLink(SEM3_EEE_PAPERS, year, sub);
export const getSem3EeePreviewLink = (year, sub) => {
  const u = getSem3EeeLink(year, sub);
  return u ? getDrivePreviewUrl(u) : null;
};
export const getSem3EeeDownloadLink = (year, sub) => {
  const u = getSem3EeeLink(year, sub);
  return u ? getDriveDirectDownloadUrl(u) : null;
};

export { slugifySubject };

export const findSubjectBySlug = makeFindSubjectBySlug(SEM3_EEE_ALL_SUBJECTS);
