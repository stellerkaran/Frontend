// Jharkhand Diploma 3rd Semester Metallurgy (META) Papers & Subject Data
// Helpers (getLink / slugify / findBySlug) shared via makeResourceData.

import { getPaperLink, slugifySubject, makeFindSubjectBySlug } from '@/src/data_Resources/makeResourceData';
import { getDrivePreviewUrl, getDriveDirectDownloadUrl } from '@/src/utils/drive';

export const SEM3_META_YEARS = [2025, 2024, 2023, 2022, 2021];

export const SEM3_META_ALL_SUBJECTS = [
  "Machine Tool Technology",
  "Foundry Technology",
  "Iron Making",
  "Non Ferrous Extractive Metallurgy",
  "Professional Skills",
];

export const SEM3_META_SUBJECT_DETAILS = {
  "Machine Tool Technology": {
    code: "META-301",
    type: "Core Branch",
    branch: "Metallurgy Engineering (META)",
    tips: "Revise lathe, milling, and drilling machine construction diagrams along with cutting tool geometry, tool materials, and machining operations.",
  },
  "Foundry Technology": {
    code: "META-302",
    type: "Core Branch",
    branch: "Metallurgy Engineering (META)",
    tips: "Learn sand casting, mould and core making, gating and risering systems along with common casting defects and their remedies with labelled diagrams.",
  },
  "Iron Making": {
    code: "META-303",
    type: "Core Branch",
    branch: "Metallurgy Engineering (META)",
    tips: "Focus on blast furnace construction and reactions, raw material preparation like iron ore and coke, and sponge iron (DRI) processes with flow diagrams.",
  },
  "Non Ferrous Extractive Metallurgy": {
    code: "META-304",
    type: "Core Branch",
    branch: "Metallurgy Engineering (META)",
    tips: "Master pyrometallurgy, hydrometallurgy, and electrometallurgy flow sheets for extraction of copper, aluminium, zinc, and lead.",
  },
  "Professional Skills": {
    code: "META-305",
    type: "Skill Enhancement",
    branch: "META / General",
    tips: "Use clear formatting, professional vocabulary, and structured point-wise answers for workplace communication and case study questions.",
  },
};


export const SEM3_META_PAPERS = {
  2024: {
    "Machine Tool Technology": "https://drive.google.com/file/d/1CaGFsyZ7KcXeEuK714RjA9NFQTe8UgQV/view",
    "Foundry Technology": "https://drive.google.com/file/d/1xyo_BTj6DZOccxJ7ROvWshOPXShDlweR/view",
    "Iron Making": "https://drive.google.com/file/d/1ZRlkmfn3MOq8QErXecFqDmBxOmaTko9M/view",
    "Non Ferrous Extractive Metallurgy": "https://drive.google.com/file/d/1fPyBpJrep925ts8V_KM2xtUNBBcf0PL-/view",

  },
};

export const getSem3MetaLink = (year, sub) => getPaperLink(SEM3_META_PAPERS, year, sub);
export const getSem3MetaPreviewLink = (year, sub) => {
  const u = getSem3MetaLink(year, sub);
  return u ? getDrivePreviewUrl(u) : null;
};
export const getSem3MetaDownloadLink = (year, sub) => {
  const u = getSem3MetaLink(year, sub);
  return u ? getDriveDirectDownloadUrl(u) : null;
};

export { slugifySubject };

export const findSubjectBySlug = makeFindSubjectBySlug(SEM3_META_ALL_SUBJECTS);