// Jharkhand Diploma 3rd Semester Mechanical (ME) Papers & Subject Data
// Helpers (getLink / slugify / findBySlug) shared via makeResourceData.

import { getPaperLink, slugifySubject, makeFindSubjectBySlug } from '@/src/data_Resources/makeResourceData';
import { getDrivePreviewUrl, getDriveDirectDownloadUrl } from '@/src/utils/drive';

export const SEM3_MECH_YEARS = [2025, 2024, 2023, 2022, 2021];

export const SEM3_MECH_ALL_SUBJECTS = [
  "Mechanics of Materials",
  "Machine Tool Technology",
  "Manufacturing Processes",
  "Fluid Power Engineering",
  "Professional Skills",
];

export const SEM3_MECH_SUBJECT_DETAILS = {
  "Mechanics of Materials": {
    code: "ME-301",
    type: "Core Branch",
    branch: "Mechanical Engineering (ME)",
    tips: "Practice stress-strain diagrams, bending moment and shear force calculations, and numerical problems on torsion and deflection.",
  },
  "Machine Tool Technology": {
    code: "ME-302",
    type: "Core Branch",
    branch: "Mechanical Engineering (ME)",
    tips: "Revise lathe, milling, and drilling machine construction diagrams along with cutting tool geometry and machining operations.",
  },
  "Manufacturing Processes": {
    code: "ME-303",
    type: "Core Branch",
    branch: "Mechanical Engineering (ME)",
    tips: "Learn casting, welding, and forming process diagrams along with their advantages, limitations, and applications.",
  },
  "Fluid Power Engineering": {
    code: "ME-304",
    type: "Core Branch",
    branch: "Mechanical Engineering (ME)",
    tips: "Master hydraulic and pneumatic circuit diagrams, Pascal's law numericals, and components like pumps, valves, and actuators.",
  },
  "Professional Skills": {
    code: "ME-305",
    type: "Skill Enhancement",
    branch: "ME / General",
    tips: "Use clear formatting, professional vocabulary, and structured point-wise answers for workplace communication and case study questions.",
  },
};

export const SEM3_MECH_PAPERS = {
  2025: {      "Mechanics of Materials":"https://drive.google.com/file/d/1_EbzRD2IOtqEsMt7eS4byCV8c0ueb-zA/view",
  "Machine Tool Technology":"https://drive.google.com/file/d/1RsrWdpsiRfrBc0l9-QbRkFMebt-Seh1J/view",
  "Manufacturing Processes":"https://drive.google.com/file/d/1E5Ai_RpVKZ6_xoDv_EJBGaLi-4meNx37/view",
  "Fluid Power Engineering":"https://drive.google.com/file/d/1BY6hKfhf6OU-RMAMBxQu9w2RZlwL1FWe/view",
  "Professional Skills":"https://drive.google.com/file/d/1EzDTrEX9aTc_uw3zr6NfgxnHYYMO1rbi/view",
  },
  2024: {
     "Mechanics of Materials":"https://drive.google.com/file/d/1iJVh_pp5fawhYi-ZTrZYelZewQT0z24F/view",
  "Machine Tool Technology":"https://drive.google.com/file/d/1uAaba7L45n4sv7fLaQ9kw5npWcODzjqB/view",
  "Manufacturing Processes":"https://drive.google.com/file/d/1B23zcWSShlI1CRtlo6I6N_XvH9gYA6Y5/view",
  "Fluid Power Engineering":"https://drive.google.com/file/d/1BY6hKfhf6OU-RMAMBxQu9w2RZlwL1FWe/view",
  "Professional Skills":"https://drive.google.com/file/d/1sgppTOG3mOJKtuCtNnMm9ZUMKcMYosrJ/view",
  },
};

export const getSem3MechLink = (year, sub) => getPaperLink(SEM3_MECH_PAPERS, year, sub);
export const getSem3MechPreviewLink = (year, sub) => {
  const u = getSem3MechLink(year, sub);
  return u ? getDrivePreviewUrl(u) : null;
};
export const getSem3MechDownloadLink = (year, sub) => {
  const u = getSem3MechLink(year, sub);
  return u ? getDriveDirectDownloadUrl(u) : null;
};

export { slugifySubject };

export const findSubjectBySlug = makeFindSubjectBySlug(SEM3_MECH_ALL_SUBJECTS);