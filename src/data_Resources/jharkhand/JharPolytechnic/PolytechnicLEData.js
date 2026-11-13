// Jharkhand Polytechnic Lateral Entry (DECE LE) Question Papers & Subject Metadata
// Official scanned papers from JCECEB Ranchi (2021–2026)
// Helpers (getLink / slugify) shared via makeResourceData.
import { createResourceData, slugifySubject } from '@/src/data_Resources/makeResourceData';

export const POLY_LE_YEARS = [2026, 2025, 2024, 2023, 2022, 2021];

export const POLY_LE_SUBJECTS = [
  "DECE LE Question Paper",
  "Mathematics (Ganit)",
  "Science (Physics & Chemistry)",
];

export const POLY_LE_PAPERS_BY_YEAR = {
  2026: {
    year: 2026,
    exam: "Diploma Entrance Competitive Examination (Lateral Entry) – DECE LE",
    board: "JCECEB, Jharkhand",
    totalMarks: "100 Marks (100 MCQs)",
    duration: "2 Hours (120 Mins)",
    driveUrl: "https://drive.google.com/file/d/1CN--d9PUcNEqk6kG64TvGpjiNpHcxj9e/view",
    subjectLinks: {
      "DECE LE Question Paper": "https://drive.google.com/file/d/1CN--d9PUcNEqk6kG64TvGpjiNpHcxj9e/view",
      "Mathematics (Ganit)": "https://drive.google.com/file/d/1CN--d9PUcNEqk6kG64TvGpjiNpHcxj9e/view",
      "Science (Physics & Chemistry)": "https://drive.google.com/file/d/1CN--d9PUcNEqk6kG64TvGpjiNpHcxj9e/view",
    },
  },
  2025: {
    year: 2025,
    exam: "Diploma Entrance Competitive Examination (Lateral Entry) – DECE LE",
    board: "JCECEB, Jharkhand",
    totalMarks: "100 Marks (100 MCQs)",
    duration: "2 Hours (120 Mins)",
    driveUrl: "https://drive.google.com/file/d/1Wu_ctdoQSf4k3tACSYGa47Qk70gUr8wQ/view",
    subjectLinks: {
      "DECE LE Question Paper": "https://drive.google.com/file/d/1Wu_ctdoQSf4k3tACSYGa47Qk70gUr8wQ/view",
      "Mathematics (Ganit)": "https://drive.google.com/file/d/1Wu_ctdoQSf4k3tACSYGa47Qk70gUr8wQ/view",
      "Science (Physics & Chemistry)": "https://drive.google.com/file/d/1Wu_ctdoQSf4k3tACSYGa47Qk70gUr8wQ/view",
    },
  },
  2024: {
    year: 2024,
    exam: "Diploma Entrance Competitive Examination (Lateral Entry) – DECE LE",
    board: "JCECEB, Jharkhand",
    totalMarks: "100 Marks (100 MCQs)",
    duration: "2 Hours (120 Mins)",
    driveUrl: "https://drive.google.com/file/d/1VIlSqTnap8nhECdXse1jtGEx0JlFbCCW/view",
    subjectLinks: {
      "DECE LE Question Paper": "https://drive.google.com/file/d/1VIlSqTnap8nhECdXse1jtGEx0JlFbCCW/view",
      "Mathematics (Ganit)": "https://drive.google.com/file/d/1VIlSqTnap8nhECdXse1jtGEx0JlFbCCW/view",
      "Science (Physics & Chemistry)": "https://drive.google.com/file/d/1VIlSqTnap8nhECdXse1jtGEx0JlFbCCW/view",
    },
  },
  2023: {
    year: 2023,
    exam: "Diploma Entrance Competitive Examination (Lateral Entry) – DECE LE",
    board: "JCECEB, Jharkhand",
    totalMarks: "100 Marks (100 MCQs)",
    duration: "2 Hours (120 Mins)",
    driveUrl: "https://drive.google.com/file/d/1yQiVpCQa9kr4kYanBYbktq_m2x086xI-/view",
    subjectLinks: {
      "DECE LE Question Paper": "https://drive.google.com/file/d/1yQiVpCQa9kr4kYanBYbktq_m2x086xI-/view",
      "Mathematics (Ganit)": "https://drive.google.com/file/d/1yQiVpCQa9kr4kYanBYbktq_m2x086xI-/view",
      "Science (Physics & Chemistry)": "https://drive.google.com/file/d/1yQiVpCQa9kr4kYanBYbktq_m2x086xI-/view",
    },
  },
  2022: {
    year: 2022,
    exam: "Diploma Entrance Competitive Examination (Lateral Entry) – DECE LE",
    board: "JCECEB, Jharkhand",
    totalMarks: "100 Marks (100 MCQs)",
    duration: "2 Hours (120 Mins)",
    driveUrl: "https://drive.google.com/file/d/1Yti8uFOVfQQ1uCuO6tp98gmkyyicJFcN/view",
    subjectLinks: {
      "DECE LE Question Paper": "https://drive.google.com/file/d/1Yti8uFOVfQQ1uCuO6tp98gmkyyicJFcN/view",
      "Mathematics (Ganit)": "https://drive.google.com/file/d/1Yti8uFOVfQQ1uCuO6tp98gmkyyicJFcN/view",
      "Science (Physics & Chemistry)": "https://drive.google.com/file/d/1Yti8uFOVfQQ1uCuO6tp98gmkyyicJFcN/view",
    },
  },
  2021: {
    year: 2021,
    exam: "Diploma Entrance Competitive Examination (Lateral Entry) – DECE LE",
    board: "JCECEB, Jharkhand",
    totalMarks: "100 Marks (100 MCQs)",
    duration: "2 Hours (120 Mins)",
    driveUrl: "https://drive.google.com/file/d/1j8419eOW8iKnZC4AyNahTLzK4LJREOaL/view",
    subjectLinks: {
      "DECE LE Question Paper": "https://drive.google.com/file/d/1j8419eOW8iKnZC4AyNahTLzK4LJREOaL/view",
      "Mathematics (Ganit)": "https://drive.google.com/file/d/1j8419eOW8iKnZC4AyNahTLzK4LJREOaL/view",
      "Science (Physics & Chemistry)": "https://drive.google.com/file/d/1j8419eOW8iKnZC4AyNahTLzK4LJREOaL/view",
    },
  },
};

export const POLY_LE_SUBJECT_DETAILS = {
  "DECE LE Question Paper": {
    code: "JCECEB-DECE-LE",
    type: "Complete Lateral Entry Paper",
    branch: "Direct 2nd Year / 3rd Sem Diploma Engineering",
    marks: "100 Marks (50 Maths + 50 Science)",
    examBoard: "JCECEB Ranchi",
    tips: "Exam level is 10th standard per official JCECEB scheme. 10+2 PCM candidates are ranked above ITI candidates in tie-breaking.",
  },
  "Mathematics (Ganit)": {
    code: "DECE-LE-MATH",
    type: "Section Paper",
    branch: "Mathematics Section (10th Standard)",
    marks: "50 Marks (50 MCQs, 1 Mark Each)",
    examBoard: "JCECEB Ranchi",
    tips: "NCERT Class 9 & 10 Mathematics contains all tested concepts. Practice speed solving.",
  },
  "Science (Physics & Chemistry)": {
    code: "DECE-LE-SCI",
    type: "Section Paper",
    branch: "Science Section (10th Standard)",
    marks: "50 Marks (25 Phy + 25 Chem MCQs)",
    examBoard: "JCECEB Ranchi",
    tips: "Prepare NCERT Class 9 & 10 Science thoroughly with special focus on electricity formulas and chemical reactions.",
  },
};

// Flat { year: { subject: url } } derived from the rich PAPERS_BY_YEAR shape,
// so the shared factory resolves links the same way PdfViewerLayout does.
const POLY_LE_PAPERS = {};
for (const [y, p] of Object.entries(POLY_LE_PAPERS_BY_YEAR)) {
  POLY_LE_PAPERS[parseInt(y, 10)] = { ...(p.subjectLinks || {}) };
}

const POLY_LE = createResourceData({
  years: POLY_LE_YEARS,
  allSubjects: POLY_LE_SUBJECTS,
  subjectDetails: POLY_LE_SUBJECT_DETAILS,
  papers: POLY_LE_PAPERS,
});

export const getPolyLELink = POLY_LE.getLink;
export { slugifySubject };

export function findPolyLESubjectBySlug(slug) {
  if (!slug) return POLY_LE_SUBJECTS[0];
  const cleanSlug = slug.toLowerCase().trim();
  for (const s of POLY_LE_SUBJECTS) {
    if (slugifySubject(s) === cleanSlug) return s;
    if (s.toLowerCase().includes(cleanSlug) || cleanSlug.includes(s.toLowerCase())) return s;
  }
  if (cleanSlug.includes("math")) return "Mathematics (Ganit)";
  if (cleanSlug.includes("sci") || cleanSlug.includes("phy") || cleanSlug.includes("chem")) return "Science (Physics & Chemistry)";
  return POLY_LE_SUBJECTS[0];
}
