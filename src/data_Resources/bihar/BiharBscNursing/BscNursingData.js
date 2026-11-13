// Bihar B.Sc. Nursing Entrance (BCECE - PCB Group) Question Papers & Subject Metadata
// Years covered: 2021-2025 (Drive scans are uploaded separately - until then the
// viewer falls back to the "Uploading Soon" state).
import { slugifySubject } from "@/src/data_Resources/makeResourceData";

export { slugifySubject };

export const NURSING_YEARS = [2025, 2024, 2023, 2022, 2021];

export const NURSING_SUBJECTS = [
  "B.Sc. Nursing Question Paper",
  "Physics",
  "Chemistry",
  "Biology",
];

export const NURSING_ALL_PAPERS_LIST = [
  { year: 2025, driveUrl: null },
  { year: 2024, driveUrl: null },
  { year: 2023, driveUrl: null },
  { year: 2022, driveUrl: null },
  { year: 2021, driveUrl: null },
];

export const NURSING_PAPERS_BY_YEAR = {
  2025: {
    year: 2025,
    exam: "BCECE B.Sc. Nursing (PCB Group)",
    board: "BCECE Board (BCECEB), Patna",
    totalMarks: "1200 Marks (300 MCQs)",
    duration: "90 Minutes per Subject Paper",
    driveUrl: null,
  },
  2024: {
    year: 2024,
    exam: "BCECE B.Sc. Nursing (PCB Group)",
    board: "BCECE Board (BCECEB), Patna",
    totalMarks: "1200 Marks (300 MCQs)",
    duration: "90 Minutes per Subject Paper",
    driveUrl: null,
  },
  2023: {
    year: 2023,
    exam: "BCECE B.Sc. Nursing (PCB Group)",
    board: "BCECE Board (BCECEB), Patna",
    totalMarks: "1200 Marks (300 MCQs)",
    duration: "90 Minutes per Subject Paper",
    driveUrl: null,
  },
  2022: {
    year: 2022,
    exam: "BCECE B.Sc. Nursing (PCB Group)",
    board: "BCECE Board (BCECEB), Patna",
    totalMarks: "1200 Marks (300 MCQs)",
    duration: "90 Minutes per Subject Paper",
    driveUrl: null,
  },
  2021: {
    year: 2021,
    exam: "BCECE B.Sc. Nursing (PCB Group)",
    board: "BCECE Board (BCECEB), Patna",
    totalMarks: "1200 Marks (300 MCQs)",
    duration: "90 Minutes per Subject Paper",
    driveUrl: null,
  },
};

export const NURSING_SUBJECT_DETAILS = {
  "B.Sc. Nursing Question Paper": {
    code: "BCECEB-PCB-NUR",
    type: "Complete Entrance Paper",
    branch: "Admission to 4-year B.Sc. Nursing",
    marks: "1200 Marks (100 Physics + 100 Chemistry + 100 Biology)",
    examBoard: "BCECE Board, Patna",
    tips: "Negative marking of -1 applies. Attempt only sure-shot answers first; Biology carries 400 of the 1200 marks and is usually the rank-decider.",
  },
  Physics: {
    code: "PCB-PHY",
    type: "Section 1",
    branch: "B.Sc. Nursing (PCB Group)",
    marks: "400 Marks (100 MCQs, 4 Marks Each)",
    examBoard: "BCECE Board, Patna",
    tips: "Mechanics, electrostatics, current electricity and optics repeat most often - keep NCERT examples and formula sheets for daily revision.",
  },
  Chemistry: {
    code: "PCB-CHE",
    type: "Section 2",
    branch: "B.Sc. Nursing (PCB Group)",
    marks: "400 Marks (100 MCQs, 4 Marks Each)",
    examBoard: "BCECE Board, Patna",
    tips: "Organic named reactions, chemical equilibrium and electrochemistry are high scoring - revise NCERT in-text questions repeatedly.",
  },
  Biology: {
    code: "PCB-BIO",
    type: "Section 3",
    branch: "B.Sc. Nursing (PCB Group)",
    marks: "400 Marks (100 MCQs, 4 Marks Each)",
    examBoard: "BCECE Board, Patna",
    tips: "Human physiology, genetics and ecology dominate the paper - read NCERT line by line and practise diagrams daily.",
  },
};