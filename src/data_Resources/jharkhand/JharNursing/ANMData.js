/**
 * Official Jharkhand Nursing Entrance Competitive Examination — ANM (Auxiliary Nurse Midwifery)
 * Previous Year Question Papers & Document Link Database
 */
import { createResourceData, slugifySubject } from '@/src/data_Resources/makeResourceData';

export const ANM_YEARS = [2025, 2024, 2023, 2022, 2021];

export const ANM_SUBJECTS = [
  "ANM Question Paper",
  "General Science",
  "Mathematics",
  "General Knowledge",
];

// Official Google Drive direct links for Jharkhand ANM Question Papers
export const ANM_LINKS = {
  2025: {
    "ANM Question Paper": "https://drive.google.com/file/d/1A9t2QfgXRQ-azuZY_rHhbdlYMAUx9Etw/view",
    "General Science": "https://drive.google.com/file/d/1A9t2QfgXRQ-azuZY_rHhbdlYMAUx9Etw/view",
    "Mathematics": "https://drive.google.com/file/d/1A9t2QfgXRQ-azuZY_rHhbdlYMAUx9Etw/view",
    "General Knowledge": "https://drive.google.com/file/d/1A9t2QfgXRQ-azuZY_rHhbdlYMAUx9Etw/view",
  },
  2024: {
    "ANM Question Paper": "https://drive.google.com/file/d/178iKiDCGxDOUqqf8UBy1bWyiXdeAtd7A/view",
    "General Science": "https://drive.google.com/file/d/178iKiDCGxDOUqqf8UBy1bWyiXdeAtd7A/view",
    "Mathematics": "https://drive.google.com/file/d/178iKiDCGxDOUqqf8UBy1bWyiXdeAtd7A/view",
    "General Knowledge": "https://drive.google.com/file/d/178iKiDCGxDOUqqf8UBy1bWyiXdeAtd7A/view",
  },
  2023: {
    "ANM Question Paper": null,
    "General Science": null,
    "Mathematics": null,
    "General Knowledge": null,
  },
  2022: {
    "ANM Question Paper": null,
    "General Science": null,
    "Mathematics": null,
    "General Knowledge": null,
  },
  2021: {
    "ANM Question Paper": null,
    "General Science": null,
    "Mathematics": null,
    "General Knowledge": null,
  },
};

export const ANM_SUBJECT_DETAILS = {
  "ANM Question Paper": {
    code: "JCECEB-NECE-ANM",
    type: "Complete ANM Entrance Paper",
    course: "ANM (Auxiliary Nurse Midwifery) 2-Year Diploma",
    marks: "100 Marks (100 MCQs)",
    duration: "2 Hours (120 Minutes)",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "General Science has the highest weightage (50%) and gets 1st priority in tie-breaking resolution. Practice all official previous papers.",
  },
  "General Science": {
    code: "ANM-GS",
    type: "Science Section",
    course: "ANM Entrance (Class 10 Level)",
    marks: "50 Marks (50 MCQs)",
    duration: "60 Mins Recommended",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "General Science is 50% of the entire paper. High scoring here virtually guarantees top rank and govt ANM training centre seat.",
  },
  "Mathematics": {
    code: "ANM-MATH",
    type: "Mathematics Section",
    course: "ANM Entrance (Class 10 Level)",
    marks: "25 Marks (25 MCQs)",
    duration: "30 Mins Recommended",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "Mathematics is second in tie-breaking priority. Solved correctly, 25/25 is achievable with Class 10 NCERT foundations.",
  },
  "General Knowledge": {
    code: "ANM-GK",
    type: "GK & Current Affairs Section",
    course: "ANM Entrance (State & National GK)",
    marks: "25 Marks (25 MCQs)",
    duration: "30 Mins Recommended",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "Focus on Jharkhand health schemes (MAMTA, Poshan Abhiyaan, Ayushman Bharat) and state geography.",
  },
};

export const ANM_FAQS = [
  {
    q: "How many questions and marks are in Jharkhand ANM Entrance Exam?",
    a: "Jharkhand ANM Entrance Exam (NECE) consists of 100 Multiple Choice Questions (MCQs) carrying 1 mark each (Total 100 Marks). General Science has 50 questions, Mathematics has 25 questions, and General Knowledge has 25 questions.",
  },
  {
    q: "Is there any negative marking in Jharkhand ANM Exam?",
    a: "No, there is NO negative marking in the Jharkhand ANM Entrance Exam. Candidates receive +1 mark for every correct response and 0 marks for unattempted or incorrect answers. Attempting all 100 questions is highly recommended.",
  },
  {
    q: "Who is eligible to apply for ANM course in Jharkhand?",
    a: "Only Female candidates who have passed Class 10th (Matriculation) from a recognised board with Jharkhand domicile and age between 17 to 35 years as on 31st December of the admission year are eligible.",
  },
  {
    q: "What is the tie-breaking rule for Jharkhand ANM Merit List?",
    a: "In case of equal total marks: (1) Higher marks in General Science section, (2) Higher marks in Mathematics section, (3) Older age (Date of Birth), (4) Alphabetical order of the candidate's first name.",
  },
  {
    q: "Can I download and view Jharkhand ANM Question Papers on mobile?",
    a: "Yes! Futurely provides a responsive multi-page PDF reader with zoom, fullscreen view, page navigation, and direct Google Drive download links tailored for Android, iOS, and PC devices.",
  },
];

/**
 * Helper to match slugified subject back to original name
 */
export function findANMSubjectBySlug(slug) {
  if (!slug) return ANM_SUBJECTS[0];
  const cleaned = slug.toLowerCase().trim();
  return (
    ANM_SUBJECTS.find((sub) => slugifySubject(sub) === cleaned) ||
    ANM_SUBJECTS.find((sub) => sub.toLowerCase().includes(cleaned)) ||
    ANM_SUBJECTS[0]
  );
}

const ANM = createResourceData({
  years: ANM_YEARS,
  allSubjects: ANM_SUBJECTS,
  subjectDetails: ANM_SUBJECT_DETAILS,
  papers: ANM_LINKS,
});

// ── Backward-compatible behavior (subject → fallback to ANM Question Paper) ──
export const getANMLink = (year, subject = "ANM Question Paper") =>
  ANM.getLink(year, subject) || ANM.getLink(year, "ANM Question Paper");

export { slugifySubject };
