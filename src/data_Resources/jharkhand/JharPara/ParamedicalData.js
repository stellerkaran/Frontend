/**
 * Official Jharkhand Para-Medical Entrance Competitive Examination (PMECE)
 * Previous Year Question Papers & Document Link Database
 */
import { createResourceData, slugifySubject } from '@/src/data_Resources/makeResourceData';

export const PARAMEDICAL_YEARS = [2025, 2024, 2023, 2022, 2021];

export const PARAMEDICAL_SUBJECTS = [
  "PMECE Question Paper",
  "Physics",
  "Chemistry",
  "Mathematics",
  "Biology",
  "Science",
  "General Knowledge",
];

export const PARAMEDICAL_INTER_SUBJECTS = [
  "PMECE Question Paper",
  "Physics",
  "Chemistry",
  "Mathematics",
  "Biology",
];

export const PARAMEDICAL_MATRIC_SUBJECTS = [
  "PMECE Question Paper",
  "Mathematics",
  "Science",
  "General Knowledge",
];

// Official Google Drive direct links for Jharkhand Paramedical Question Papers
export const PARAMEDICAL_LINKS = {
  2025: {
    "PMECE Question Paper": "https://drive.google.com/file/d/11yGo-OIZh1-ScxJjDazoEH6_n5IjdPGU/view",
    "Physics": "https://drive.google.com/file/d/11yGo-OIZh1-ScxJjDazoEH6_n5IjdPGU/view",
    "Chemistry": "https://drive.google.com/file/d/11yGo-OIZh1-ScxJjDazoEH6_n5IjdPGU/view",
    "Mathematics": "https://drive.google.com/file/d/11yGo-OIZh1-ScxJjDazoEH6_n5IjdPGU/view",
    "Biology": "https://drive.google.com/file/d/11yGo-OIZh1-ScxJjDazoEH6_n5IjdPGU/view",
    "Science": "https://drive.google.com/file/d/11yGo-OIZh1-ScxJjDazoEH6_n5IjdPGU/view",
    "General Knowledge": "https://drive.google.com/file/d/11yGo-OIZh1-ScxJjDazoEH6_n5IjdPGU/view",
  },
  2024: {
    "PMECE Question Paper": "https://drive.google.com/file/d/1O98Jm-aZGR_UnqMV8SOmaLM1D14rHXOG/view",
    "Physics": "https://drive.google.com/file/d/1O98Jm-aZGR_UnqMV8SOmaLM1D14rHXOG/view",
    "Chemistry": "https://drive.google.com/file/d/1O98Jm-aZGR_UnqMV8SOmaLM1D14rHXOG/view",
    "Mathematics": "https://drive.google.com/file/d/1O98Jm-aZGR_UnqMV8SOmaLM1D14rHXOG/view",
    "Biology": "https://drive.google.com/file/d/1O98Jm-aZGR_UnqMV8SOmaLM1D14rHXOG/view",
    "Science": "https://drive.google.com/file/d/1O98Jm-aZGR_UnqMV8SOmaLM1D14rHXOG/view",
    "General Knowledge": "https://drive.google.com/file/d/1O98Jm-aZGR_UnqMV8SOmaLM1D14rHXOG/view",
  },
  2023: {
    "PMECE Question Paper": "https://drive.google.com/file/d/1DmvpumJzMJpiijlrGWkiFK4pI4u2cg_7/view",
    "Physics": "https://drive.google.com/file/d/1DmvpumJzMJpiijlrGWkiFK4pI4u2cg_7/view",
    "Chemistry": "https://drive.google.com/file/d/1DmvpumJzMJpiijlrGWkiFK4pI4u2cg_7/view",
    "Mathematics": "https://drive.google.com/file/d/1DmvpumJzMJpiijlrGWkiFK4pI4u2cg_7/view",
    "Biology": "https://drive.google.com/file/d/1DmvpumJzMJpiijlrGWkiFK4pI4u2cg_7/view",
    "Science": "https://drive.google.com/file/d/1DmvpumJzMJpiijlrGWkiFK4pI4u2cg_7/view",
    "General Knowledge": "https://drive.google.com/file/d/1DmvpumJzMJpiijlrGWkiFK4pI4u2cg_7/view",
  },
  2022: {
    "PMECE Question Paper": null,
    "Physics": null,
    "Chemistry": null,
    "Mathematics": null,
    "Biology": null,
    "Science": null,
    "General Knowledge": null,
  },
  2021: {
    "PMECE Question Paper": null,
    "Physics": null,
    "Chemistry": null,
    "Mathematics": null,
    "Biology": null,
    "Science": null,
    "General Knowledge": null,
  },
};

export const PARAMEDICAL_SUBJECT_DETAILS = {
  "PMECE Question Paper": {
    code: "JCECEB-PMECE",
    type: "Complete Paramedical Paper",
    course: "Pharmacy, Para-Medical Diploma & Certificate Courses",
    marks: "150 Marks (150 MCQs)",
    duration: "2.5 Hours (150 Minutes)",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "Intermediate PCM/PCB tie-breaking gives priority to Physics and Chemistry marks. Matric level prioritizes Mathematics.",
  },
  "Jharkhand Paramedical 2025 PMECE Question Paper": {
    code: "JCECEB-PMECE-2025",
    type: "Complete Paramedical Paper",
    course: "Pharmacy, Para-Medical Diploma & Certificate Courses",
    marks: "150 Marks (150 MCQs)",
    duration: "2.5 Hours (150 Minutes)",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "Intermediate PCM/PCB tie-breaking gives priority to Physics and Chemistry marks. Matric level prioritizes Mathematics.",
  },
  "Jharkhand Paramedical 2024 PMECE Question Paper": {
    code: "JCECEB-PMECE-2024",
    type: "Complete Paramedical Paper",
    course: "Pharmacy, Para-Medical Diploma & Certificate Courses",
    marks: "150 Marks (150 MCQs)",
    duration: "2.5 Hours (150 Minutes)",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "Intermediate PCM/PCB tie-breaking gives priority to Physics and Chemistry marks. Matric level prioritizes Mathematics.",
  },
  "Jharkhand Paramedical 2023 PMECE Question Paper": {
    code: "JCECEB-PMECE-2023",
    type: "Complete Paramedical Paper",
    course: "Pharmacy, Para-Medical Diploma & Certificate Courses",
    marks: "150 Marks (150 MCQs)",
    duration: "2.5 Hours (150 Minutes)",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "Intermediate PCM/PCB tie-breaking gives priority to Physics and Chemistry marks. Matric level prioritizes Mathematics.",
  },
  "Physics": {
    code: "PMECE-PHY",
    type: "Intermediate Level (PCM/PCB)",
    course: "Pharmacy & Para-Medical Diploma",
    marks: "50 Marks (50 MCQs)",
    duration: "50 Mins Recommended",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "Physics is the 1st tie-breaking deciding subject for Intermediate level merit list.",
  },
  "Chemistry": {
    code: "PMECE-CHEM",
    type: "Intermediate Level (PCM/PCB)",
    course: "Pharmacy & Para-Medical Diploma",
    marks: "50 Marks (50 MCQs)",
    duration: "50 Mins Recommended",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "Chemistry is the 2nd tie-breaking subject for Intermediate level merit list.",
  },
  "Mathematics": {
    code: "PMECE-MATH",
    type: "Inter (PCM) & Matric Level",
    course: "Pharmacy & Certificate Courses",
    marks: "50 Marks (50 MCQs)",
    duration: "50 Mins Recommended",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "Mathematics is 1st tie-breaker for Matric level Certificate courses and critical for PCM Pharmacy aspirants.",
  },
  "Biology": {
    code: "PMECE-BIO",
    type: "Intermediate Level (PCB)",
    course: "Pharmacy & Para-Medical Diploma",
    marks: "50 Marks (50 MCQs)",
    duration: "50 Mins Recommended",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "Essential section for PCB stream aspirants targeting DMLT, OT Technician, Dialysis, and Radiography courses.",
  },
  "Science": {
    code: "PMECE-SCI",
    type: "Matric Level",
    course: "Certificate Courses (1-Year)",
    marks: "50 Marks (50 MCQs)",
    duration: "50 Mins Recommended",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "Direct Class 10 NCERT science conceptual questions are asked for Matric level Dresser & Attendant courses.",
  },
  "General Knowledge": {
    code: "PMECE-GK",
    type: "Matric Level",
    course: "Certificate Courses (1-Year)",
    marks: "50 Marks (50 MCQs)",
    duration: "40 Mins Recommended",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "Focus on Jharkhand state geography, culture, and state health schemes.",
  },
};

// Subjects that share the same Google Drive PDF source URL within a given year.
// Key = canonical subject name (first in group), Value = array of all subjects sharing that URL.
// Only years where subjects have distinct URLs need grouping entries.
export const PARAMEDICAL_SHARED_GROUPS = {
  // 2025: All subjects share one combined question paper PDF
  2025: {
    "Jharkhand Paramedical 2025 PMECE Question Paper": [
      "Jharkhand Paramedical 2025 PMECE Question Paper",
      "Jharkhand Paramedical 2025 Physics",
      "Jharkhand Paramedical 2025 Chemistry",
      "Jharkhand Paramedical 2025 Mathematics",
      "Jharkhand Paramedical 2025 Biology",
      "Jharkhand Paramedical 2025 Science",
      "Jharkhand Paramedical 2025 General Knowledge",
    ],
  },
  // 2024: All subjects share one combined question paper PDF
  2024: {
    "Jharkhand Paramedical 2024 PMECE Question Paper": [
      "Jharkhand Paramedical 2024 PMECE Question Paper",
      "Jharkhand Paramedical 2024 Physics",
      "Jharkhand Paramedical 2024 Chemistry",
      "Jharkhand Paramedical 2024 Mathematics",
      "Jharkhand Paramedical 2024 Biology",
      "Jharkhand Paramedical 2024 Science",
      "Jharkhand Paramedical 2024 General Knowledge",
    ],
  },
  // 2023: All subjects share one combined question paper PDF
  2023: {
    "Jharkhand Paramedical 2023 PMECE Question Paper": [
      "Jharkhand Paramedical 2023 PMECE Question Paper",
      "Jharkhand Paramedical 2023 Physics",
      "Jharkhand Paramedical 2023 Chemistry",
      "Jharkhand Paramedical 2023 Mathematics",
      "Jharkhand Paramedical 2023 Biology",
      "Jharkhand Paramedical 2023 Science",
      "Jharkhand Paramedical 2023 General Knowledge",
    ],
  },
  // 2022 and 2021 have null links, no grouping needed
};

export const PARAMEDICAL_FAQS = [
  {
    q: "What is Jharkhand Paramedical Entrance Exam (PMECE)?",
    a: "PMECE (Para-Medical Entrance Competitive Examination) is a state-level exam conducted annually by JCECEB Ranchi for admission into Diploma in Pharmacy (2 Yrs 3 Mo), Para-Medical Diploma Courses (2 Years), and Certificate Courses (1 Year) across Government and Private institutes in Jharkhand.",
  },
  {
    q: "What is the examination pattern for PMECE?",
    a: "The exam consists of 150 Multiple Choice Questions (MCQs) carrying 150 Marks (1 mark each). Duration is 2.5 hours (150 minutes). Intermediate level has PCM and PCB groups (50 Physics + 50 Chemistry + 50 Math/Biology). Matric level has 50 Mathematics + 50 Science + 50 GK.",
  },
  {
    q: "Are both male and female candidates eligible for Paramedical courses?",
    a: "Yes! All courses under PMECE — Pharmacy, Para-Medical Diploma (DMLT, OT Tech, Radiographer, etc.), and Certificate courses — are open to BOTH male and female candidates with Jharkhand domicile.",
  },
  {
    q: "What is the tie-breaking rule for Jharkhand Paramedical Merit List?",
    a: "For Intermediate Level: (1) Higher marks in Physics, (2) Higher marks in Chemistry, (3) Older age (DOB), (4) Alphabetical order of first name. For Matric Level: (1) Higher marks in Mathematics, (2) Higher marks in Science, (3) Older age (DOB).",
  },
  {
    q: "How to read and download Jharkhand Paramedical Question Papers PDF?",
    a: "On Futurely, you can preview all official Jharkhand Paramedical (PMECE 2021–2025) question papers with high-DPI zoom, page jump, and download the original PDF directly to your device for offline study.",
  },
];

/**
 * Helper to match slugified subject back to original name
 */
export function findParamedicalSubjectBySlug(slug) {
  if (!slug) return PARAMEDICAL_SUBJECTS[0];
  const cleaned = slug.toLowerCase().trim();
  return (
    PARAMEDICAL_SUBJECTS.find((sub) => slugifySubject(sub) === cleaned) ||
    PARAMEDICAL_SUBJECTS.find((sub) => sub.toLowerCase().includes(cleaned)) ||
    PARAMEDICAL_SUBJECTS[0]
  );
}

const PARAMEDICAL = createResourceData({
  years: PARAMEDICAL_YEARS,
  allSubjects: PARAMEDICAL_SUBJECTS,
  subjectDetails: PARAMEDICAL_SUBJECT_DETAILS,
  papers: PARAMEDICAL_LINKS,
});

// ── Backward-compatible behavior (subject → fallback to PMECE Question Paper) ──
export const getParamedicalLink = (year, subject = "PMECE Question Paper") =>
  PARAMEDICAL.getLink(year, subject) || PARAMEDICAL.getLink(year, "PMECE Question Paper");

export { slugifySubject };
