/**
 * Official Jharkhand Nursing Entrance Competitive Examination — GNM (General Nursing & Midwifery)
 * Previous Year Question Papers & Document Link Database
 */
import { createResourceData, slugifySubject } from '@/src/data_Resources/makeResourceData';

export const GNM_YEARS = [2025, 2024, 2023, 2022, 2021];

export const GNM_SUBJECTS = [
  "GNM Question Paper",
  "Biology",
  "Physics",
  "Chemistry",
  "Mathematics",
  "English",
];

// Official Google Drive direct links for Jharkhand GNM Question Papers
export const GNM_LINKS = {
  2025: {
    "GNM Question Paper": "https://drive.google.com/file/d/1vWtq0iiYz8OKDrPGwB-EIwg940ALSQXn/view",
    "Biology": "https://drive.google.com/file/d/1vWtq0iiYz8OKDrPGwB-EIwg940ALSQXn/view",
    "Physics": "https://drive.google.com/file/d/1vWtq0iiYz8OKDrPGwB-EIwg940ALSQXn/view",
    "Chemistry": "https://drive.google.com/file/d/1vWtq0iiYz8OKDrPGwB-EIwg940ALSQXn/view",
    "Mathematics": "https://drive.google.com/file/d/1vWtq0iiYz8OKDrPGwB-EIwg940ALSQXn/view",
    "English": "https://drive.google.com/file/d/1vWtq0iiYz8OKDrPGwB-EIwg940ALSQXn/view",
  },
  2024: {
    "GNM Question Paper": "https://drive.google.com/file/d/1aOf86h6X2Hl7q3BjyBKqE9q_CfptUJNJ/view",
    "Biology": "https://drive.google.com/file/d/1aOf86h6X2Hl7q3BjyBKqE9q_CfptUJNJ/view",
    "Physics": "https://drive.google.com/file/d/1aOf86h6X2Hl7q3BjyBKqE9q_CfptUJNJ/view",
    "Chemistry": "https://drive.google.com/file/d/1aOf86h6X2Hl7q3BjyBKqE9q_CfptUJNJ/view",
    "Mathematics": "https://drive.google.com/file/d/1aOf86h6X2Hl7q3BjyBKqE9q_CfptUJNJ/view",
    "English": "https://drive.google.com/file/d/1aOf86h6X2Hl7q3BjyBKqE9q_CfptUJNJ/view",
  },
  2023: {
    "GNM Question Paper": "https://drive.google.com/file/d/10Pm7JwNE4j3cPaHz1QXuSJbqcUlEOPCG/view",
    "Biology": "https://drive.google.com/file/d/10Pm7JwNE4j3cPaHz1QXuSJbqcUlEOPCG/view",
    "Physics": "https://drive.google.com/file/d/10Pm7JwNE4j3cPaHz1QXuSJbqcUlEOPCG/view",
    "Chemistry": "https://drive.google.com/file/d/10Pm7JwNE4j3cPaHz1QXuSJbqcUlEOPCG/view",
    "Mathematics": "https://drive.google.com/file/d/10Pm7JwNE4j3cPaHz1QXuSJbqcUlEOPCG/view",
    "English": "https://drive.google.com/file/d/10Pm7JwNE4j3cPaHz1QXuSJbqcUlEOPCG/view",
  },
  2022: {
    "GNM Question Paper": null,
    "Biology": null,
    "Physics": null,
    "Chemistry": null,
    "Mathematics": null,
    "English": null,
  },
  2021: {
    "GNM Question Paper": null,
    "Biology": null,
    "Physics": null,
    "Chemistry": null,
    "Mathematics": null,
    "English": null,
  },
};

export const GNM_SUBJECT_DETAILS = {
  "GNM Question Paper": {
    code: "JCECEB-NECE-GNM",
    type: "Complete GNM Entrance Paper",
    course: "GNM (General Nursing and Midwifery) 3-Year Diploma",
    marks: "150 Marks (150 MCQs)",
    duration: "2.5 Hours (150 Minutes)",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "Biology holds 1st priority in tie-breaking resolution. 150 questions with 0 negative marking — solve all previous year papers.",
  },
  "Biology": {
    code: "GNM-BIO",
    type: "Biology Section",
    course: "GNM Entrance (Secondary Level)",
    marks: "30 Marks (30 MCQs)",
    duration: "30 Mins Recommended",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "Biology is the most crucial tie-breaking deciding subject. Strong mastery here determines your merit ranking.",
  },
  "Physics": {
    code: "GNM-PHY",
    type: "Physics Section",
    course: "GNM Entrance (Secondary Level)",
    marks: "30 Marks (30 MCQs)",
    duration: "30 Mins Recommended",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "Direct formula questions and conceptual NCERT Class 10 problems frequently appear in the exam.",
  },
  "Chemistry": {
    code: "GNM-CHEM",
    type: "Chemistry Section",
    course: "GNM Entrance (Secondary Level)",
    marks: "30 Marks (30 MCQs)",
    duration: "30 Mins Recommended",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "Revise chemical reactions, functional groups, and pH scale values thoroughly from NCERT.",
  },
  "Mathematics": {
    code: "GNM-MATH",
    type: "Mathematics Section",
    course: "GNM Entrance (Secondary Level)",
    marks: "30 Marks (30 MCQs)",
    duration: "30 Mins Recommended",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "Standard Class 10 math formulas ensure high scoring in this section without complex calculus.",
  },
  "English": {
    code: "GNM-ENG",
    type: "English Section",
    course: "GNM Entrance (General English)",
    marks: "30 Marks (30 MCQs)",
    duration: "25 Mins Recommended",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "Focus on basic English grammar rules and vocabulary lists to quickly secure full marks.",
  },
};

export const GNM_FAQS = [
  {
    q: "How many total questions and marks are in Jharkhand GNM Exam?",
    a: "The Jharkhand GNM Entrance Exam (NECE) consists of 150 Multiple Choice Questions (MCQs) carrying 150 Marks (1 mark each). The 5 sections are Biology (30), Physics (30), Chemistry (30), Mathematics (30), and English (30).",
  },
  {
    q: "Are male candidates eligible for Jharkhand GNM course?",
    a: "Yes! Unlike ANM (which is female only), GNM admissions in Jharkhand are open to BOTH male and female candidates who meet the 10+2 educational criteria.",
  },
  {
    q: "What is the eligibility criteria for Jharkhand GNM admission?",
    a: "Candidates must have passed 10+2 (Intermediate / Higher Secondary) with English and must have obtained a minimum of 40% marks in qualifying examination (35% for SC/ST). Candidates with Science (PCB) are given preference. Jharkhand domicile is mandatory.",
  },
  {
    q: "What is the tie-breaking priority for Jharkhand GNM Merit List?",
    a: "In case of tie in total marks: (1) Higher marks in Biology section, (2) Higher marks in Chemistry section, (3) Higher marks in Physics section, (4) Higher marks in Mathematics section, (5) Older in age (Date of Birth).",
  },
  {
    q: "How to download Jharkhand GNM Previous Year Question Papers PDF?",
    a: "On Futurely, you can preview every page of the official Jharkhand GNM (2021–2025) question papers with high-DPI rendering or download the complete PDF directly to your device for offline practice.",
  },
];

/**
 * Helper to match slugified subject back to original name
 */
export function findGNMSubjectBySlug(slug) {
  if (!slug) return GNM_SUBJECTS[0];
  const cleaned = slug.toLowerCase().trim();
  return (
    GNM_SUBJECTS.find((sub) => slugifySubject(sub) === cleaned) ||
    GNM_SUBJECTS.find((sub) => sub.toLowerCase().includes(cleaned)) ||
    GNM_SUBJECTS[0]
  );
}

const GNM = createResourceData({
  years: GNM_YEARS,
  allSubjects: GNM_SUBJECTS,
  subjectDetails: GNM_SUBJECT_DETAILS,
  papers: GNM_LINKS,
});

// ── Backward-compatible behavior (subject → fallback to GNM Question Paper) ──
export const getGNMLink = (year, subject = "GNM Question Paper") =>
  GNM.getLink(year, subject) || GNM.getLink(year, "GNM Question Paper");

export { slugifySubject };
