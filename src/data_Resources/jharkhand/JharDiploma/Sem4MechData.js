// Jharkhand Diploma 4th Semester Mechanical (ME) Papers & Subject Data
// Helpers (getLink / slugify / findBySlug) shared via makeResourceData.

import { getPaperLink, slugifySubject, makeFindSubjectBySlug } from '@/src/data_Resources/makeResourceData';
import { getDrivePreviewUrl, getDriveDirectDownloadUrl } from '@/src/utils/drive';

export const SEM4_MECH_YEARS = [2026, 2025, 2024, 2023, 2022, 2021];

export const SEM4_MECH_ALL_SUBJECTS = [
  "Operations Management",
  "CNC Programming and Machining",
  "Product Design and Development",
  "Elements of Industrial Automation",
  "Mastering Personal Finance",
];

export const SEM4_MECH_SUBJECT_DETAILS = {
  "Operations Management": {
    code: "ME-401",
    type: "Core Branch",
    branch: "Mechanical Engineering (ME)",
    tips: "Focus on production planning, inventory control techniques (EOQ, JIT), and process layout diagrams. Practice numerical problems on scheduling and capacity planning.",
  },
  "CNC Programming and Machining": {
    code: "ME-402",
    type: "Core Branch",
    branch: "Mechanical Engineering (ME)",
    tips: "Practice G-code and M-code programming for turning and milling operations. Revise CNC machine axis conventions, tool offsets, and work coordinate systems.",
  },
  "Product Design and Development": {
    code: "ME-403",
    type: "Core Branch",
    branch: "Mechanical Engineering (ME)",
    tips: "Learn the stages of the product design process, concurrent engineering concepts, and Quality Function Deployment (QFD) with diagrams.",
  },
  "Elements of Industrial Automation": {
    code: "ME-404",
    type: "Core Branch",
    branch: "Mechanical Engineering (ME)",
    tips: "Master PLC ladder logic basics, sensor and actuator types, and industrial automation system block diagrams.",
  },
  "Mastering Personal Finance": {
    code: "ME-405",
    type: "Skill Enhancement",
    branch: "ME / General",
    tips: "Cover budgeting, saving, and investment basics along with simple financial planning numericals. Revise key terms like interest, inflation, and risk-return trade-off.",
  },
};

export const SEM4_MECH_PAPERS = {
  2026: {
     "Operations Management":"https://drive.google.com/file/d/1t7GwnP_Qfra-Fo8g6My55bI2k34E1Ukt/view",
  "CNC Programming and Machining":"https://drive.google.com/file/d/1qN2ydsU-5-9Wafy2_Ui_HYzKVsHRud9J/view",
  "Product Design and Development":"https://drive.google.com/file/d/1CsGFZlYjU6lHVhdShVSczK5OZ7KrJVBV/view",
  "Elements of Industrial Automation":"https://drive.google.com/file/d/19DdOODAPCAKBhkftpT_g-f2HJwjghmwd/view",
  },
  2025: {
    "Operations Management":"https://drive.google.com/file/d/13aGOva41d5U-hGNcdGNwHJMolSrFc9mD/view",
  "CNC Programming and Machining":"https://drive.google.com/file/d/1wHsL8VVIVTBP0hKD9mS62T91AaIGEMat/view",
  "Product Design and Development":"https://drive.google.com/file/d/1xfhTfw8AscLqNmWjofk-CVT53UwDZGXu/view",
  "Elements of Industrial Automation":"https://drive.google.com/file/d/1Z19-eH5xO3el5yPRfeaiBuHVrBq8mpH6/view",
  },
};

export const getSem4MechLink = (year, sub) => getPaperLink(SEM4_MECH_PAPERS, year, sub);
export const getSem4MechPreviewLink = (year, sub) => {
  const u = getSem4MechLink(year, sub);
  return u ? getDrivePreviewUrl(u) : null;
};
export const getSem4MechDownloadLink = (year, sub) => {
  const u = getSem4MechLink(year, sub);
  return u ? getDriveDirectDownloadUrl(u) : null;
};

export { slugifySubject };

export const findSubjectBySlug = makeFindSubjectBySlug(SEM4_MECH_ALL_SUBJECTS);