// Bihar B.Tech Lateral Entry (BCECE [LE]) Question Papers & Subject Metadata
// Years covered: 2021-2025 (Drive scans are uploaded separately - until then the
// viewer falls back to the "Uploading Soon" state).
import { slugifySubject } from "@/src/data_Resources/makeResourceData";

export { slugifySubject };

export const LE_YEARS = [2025, 2024, 2023, 2022, 2021];

export const LE_SUBJECTS = [
  "BCECE LE Question Paper",
  "Engineering Mathematics",
  "Engineering Mechanics",
  "Technical English",
];

export const LE_ALL_PAPERS_LIST = [
  { year: 2025, driveUrl: null },
  { year: 2024, driveUrl: null },
  { year: 2023, driveUrl: null },
  { year: 2022, driveUrl: null },
  { year: 2021, driveUrl: null },
];

export const LE_PAPERS_BY_YEAR = {
  2025: {
    year: 2025,
    exam: "BCECE Lateral Entry (BCECE LE)",
    board: "BCECE Board (BCECEB), Patna",
    totalMarks: "600 Marks (150 MCQs)",
    duration: "2 Hours 15 Minutes (135 Mins)",
    driveUrl: null,
  },
  2024: {
    year: 2024,
    exam: "BCECE Lateral Entry (BCECE LE)",
    board: "BCECE Board (BCECEB), Patna",
    totalMarks: "600 Marks (150 MCQs)",
    duration: "2 Hours 15 Minutes (135 Mins)",
    driveUrl: null,
  },
  2023: {
    year: 2023,
    exam: "BCECE Lateral Entry (BCECE LE)",
    board: "BCECE Board (BCECEB), Patna",
    totalMarks: "600 Marks (150 MCQs)",
    duration: "2 Hours 15 Minutes (135 Mins)",
    driveUrl: null,
  },
  2022: {
    year: 2022,
    exam: "BCECE Lateral Entry (BCECE LE)",
    board: "BCECE Board (BCECEB), Patna",
    totalMarks: "600 Marks (150 MCQs)",
    duration: "2 Hours 15 Minutes (135 Mins)",
    driveUrl: null,
  },
  2021: {
    year: 2021,
    exam: "BCECE Lateral Entry (BCECE LE)",
    board: "BCECE Board (BCECEB), Patna",
    totalMarks: "600 Marks (150 MCQs)",
    duration: "2 Hours 15 Minutes (135 Mins)",
    driveUrl: null,
  },
};

export const LE_SUBJECT_DETAILS = {
  "BCECE LE Question Paper": {
    code: "BCECEB-LE-ENG",
    type: "Complete Entrance Paper",
    branch: "Lateral Entry to B.Tech / B.E. (2nd Year)",
    marks: "600 Marks (50 Maths + 50 Mechanics + 50 English)",
    examBoard: "BCECE Board, Patna",
    tips: "Negative marking of -1 applies. Attempt only sure-shot answers first; Mathematics and Mechanics together carry 400 of the 600 marks.",
  },
  "Engineering Mathematics": {
    code: "LE-MATH",
    type: "Section 1",
    branch: "Lateral Entry (BCECE LE)",
    marks: "200 Marks (50 MCQs, 4 Marks Each)",
    examBoard: "BCECE Board, Patna",
    tips: "Calculus, matrices, vector algebra and differential equations repeat most often - keep formula sheets for daily revision.",
  },
  "Engineering Mechanics": {
    code: "LE-MECH",
    type: "Section 2",
    branch: "Lateral Entry (BCECE LE)",
    marks: "200 Marks (50 MCQs, 4 Marks Each)",
    examBoard: "BCECE Board, Patna",
    tips: "Force systems, friction, centroid and SFD-BMD numericals are high scoring - practise free-body diagrams daily.",
  },
  "Technical English": {
    code: "LE-ENGL",
    type: "Section 3",
    branch: "Lateral Entry (BCECE LE)",
    marks: "200 Marks (50 MCQs, 4 Marks Each)",
    examBoard: "BCECE Board, Patna",
    tips: "Grammar rules, vocabulary and comprehension are quick wins - solve previous years' English sections repeatedly.",
  },
};
