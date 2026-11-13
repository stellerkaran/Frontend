// Bihar Polytechnic Lateral Entry — DECE (LE) Question Papers & Subject Metadata
// Years covered: 2021-2025 (Drive scans are uploaded separately - until then the
// viewer falls back to the "Uploading Soon" state).
// Helper (slugifySubject) shared via makeResourceData, same as the Bihar Polytechnic (PE) pages.
import { slugifySubject } from "@/src/data_Resources/makeResourceData";

export { slugifySubject };

export const POLY_LE_YEARS = [2025, 2024, 2023, 2022, 2021];

export const POLY_LE_SUBJECTS = [
  "DECE LE Question Paper",
  "Physics (Bhautik Vigyan)",
  "Chemistry (Rasayan Vigyan)",
  "Mathematics (Ganit)",
];

export const POLY_LE_ALL_PAPERS_LIST = [
  { year: 2025, subject: "DECE LE Question Paper", driveUrl: null },
  { year: 2024, subject: "DECE LE Question Paper", driveUrl: null },
  { year: 2023, subject: "DECE LE Question Paper", driveUrl: null },
  { year: 2022, subject: "DECE LE Question Paper", driveUrl: null },
  { year: 2021, subject: "DECE LE Question Paper", driveUrl: null },
];

export const POLY_LE_PAPERS_BY_YEAR = {
  2025: {
    year: 2025,
    exam: "Diploma Entrance Competitive Examination (Lateral Entry) — DECE (LE)",
    board: "BCECE Board (BCECEB), Patna",
    totalMarks: "600 Marks (150 MCQs)",
    duration: "2 Hours 15 Minutes (135 Mins)",
    driveUrl: null,
    subjectLinks: {},
  },
  2024: {
    year: 2024,
    exam: "Diploma Entrance Competitive Examination (Lateral Entry) — DECE (LE)",
    board: "BCECE Board (BCECEB), Patna",
    totalMarks: "600 Marks (150 MCQs)",
    duration: "2 Hours 15 Minutes (135 Mins)",
    driveUrl: null,
    subjectLinks: {},
  },
  2023: {
    year: 2023,
    exam: "Diploma Entrance Competitive Examination (Lateral Entry) — DECE (LE)",
    board: "BCECE Board (BCECEB), Patna",
    totalMarks: "600 Marks (150 MCQs)",
    duration: "2 Hours 15 Minutes (135 Mins)",
    driveUrl: null,
    subjectLinks: {},
  },
  2022: {
    year: 2022,
    exam: "Diploma Entrance Competitive Examination (Lateral Entry) — DECE (LE)",
    board: "BCECE Board (BCECEB), Patna",
    totalMarks: "600 Marks (150 MCQs)",
    duration: "2 Hours 15 Minutes (135 Mins)",
    driveUrl: null,
    subjectLinks: {},
  },
  2021: {
    year: 2021,
    exam: "Diploma Entrance Competitive Examination (Lateral Entry) — DECE (LE)",
    board: "BCECE Board (BCECEB), Patna",
    totalMarks: "600 Marks (150 MCQs)",
    duration: "2 Hours 15 Minutes (135 Mins)",
    driveUrl: null,
    subjectLinks: {},
  },
};

export const POLY_LE_SUBJECT_DETAILS = {
  "DECE LE Question Paper": {
    code: "BCECEB-DECE-LE",
    type: "Complete Entrance Paper",
    branch: "Diploma in Engineering - 2nd Year Lateral Entry (All Branches)",
    marks: "600 Marks (50 Phy + 50 Chem + 50 Maths)",
    examBoard: "BCECE Board, Patna",
    tips: "Negative marking of -1 applies - attempt only sure-shot answers first. Syllabus is 10+2 (Intermediate) level PCM, not Matric level.",
  },
  "Physics (Bhautik Vigyan)": {
    code: "DECE-LE-PHY",
    type: "Section Paper",
    branch: "Physics Section — 10+2 Level",
    marks: "200 Marks (50 MCQs, 4 Marks Each)",
    examBoard: "BCECE Board, Patna",
    tips: "Rotational motion, thermodynamics, current electricity and optics repeat frequently - revise formulas and SI units daily.",
  },
  "Chemistry (Rasayan Vigyan)": {
    code: "DECE-LE-CHEM",
    type: "Section Paper",
    branch: "Chemistry Section — 10+2 Level",
    marks: "200 Marks (50 MCQs, 4 Marks Each)",
    examBoard: "BCECE Board, Patna",
    tips: "Mole concept, chemical bonding, redox and organic reactions are high scoring - keep a short reaction-mechanism sheet.",
  },
  "Mathematics (Ganit)": {
    code: "DECE-LE-MATH",
    type: "Section Paper",
    branch: "Mathematics Section — 10+2 Level",
    marks: "200 Marks (50 MCQs, 4 Marks Each)",
    examBoard: "BCECE Board, Patna",
    tips: "Calculus, matrices, trigonometry and coordinate geometry take the most time - practise short-cut methods for speed.",
  },
};
