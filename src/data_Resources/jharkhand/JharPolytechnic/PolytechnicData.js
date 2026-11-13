// Jharkhand Polytechnic (PECE) Question Papers & Subject Metadata
// Official scanned papers from JCECEB Ranchi (2021–2026)
// Helpers (getLink / slugify) shared via makeResourceData.
import { createResourceData, slugifySubject } from '@/src/data_Resources/makeResourceData';

export const POLY_YEARS = [2026, 2025, 2024, 2023, 2022, 2021];

export const POLY_SUBJECTS = [
  "PECE Question Paper",
  "Physics (Bhautik Vigyan)",
  "Chemistry (Rasayan Vigyan)",
  "Mathematics (Ganit)",
];

export const POLY_PAPERS_BY_YEAR = {
  2026: {
    year: 2026,
    exam: "Jharkhand Polytechnic Entrance Competitive Examination (PECE)",
    board: "JCECEB, Jharkhand",
    totalMarks: "150 Marks (150 MCQs)",
    duration: "2 Hours 30 Minutes (150 Mins)",
    driveUrl: "https://drive.google.com/file/d/1CjDK8jVPnqzxtXR4_Kw3V0imhD4l-R16/view",
    subjectLinks: {
      "PECE Question Paper": "https://drive.google.com/file/d/1CjDK8jVPnqzxtXR4_Kw3V0imhD4l-R16/view",
      "Physics (Bhautik Vigyan)": "https://drive.google.com/file/d/1CjDK8jVPnqzxtXR4_Kw3V0imhD4l-R16/view",
      "Chemistry (Rasayan Vigyan)": "https://drive.google.com/file/d/1CjDK8jVPnqzxtXR4_Kw3V0imhD4l-R16/view",
      "Mathematics (Ganit)": "https://drive.google.com/file/d/1CjDK8jVPnqzxtXR4_Kw3V0imhD4l-R16/view",
    },
  },
  2025: {
    year: 2025,
    exam: "Jharkhand Polytechnic Entrance Competitive Examination (PECE)",
    board: "JCECEB, Jharkhand",
    totalMarks: "150 Marks (150 MCQs)",
    duration: "2 Hours 30 Minutes (150 Mins)",
    driveUrl: "https://drive.google.com/file/d/18asg7qiIY9TYGcpUU9Q4Ghb3kdJm6WFZ/view",
    subjectLinks: {
      "PECE Question Paper": "https://drive.google.com/file/d/18asg7qiIY9TYGcpUU9Q4Ghb3kdJm6WFZ/view",
      "Physics (Bhautik Vigyan)": "https://drive.google.com/file/d/18asg7qiIY9TYGcpUU9Q4Ghb3kdJm6WFZ/view",
      "Chemistry (Rasayan Vigyan)": "https://drive.google.com/file/d/18asg7qiIY9TYGcpUU9Q4Ghb3kdJm6WFZ/view",
      "Mathematics (Ganit)": "https://drive.google.com/file/d/18asg7qiIY9TYGcpUU9Q4Ghb3kdJm6WFZ/view",
    },
  },
  2024: {
    year: 2024,
    exam: "Jharkhand Polytechnic Entrance Competitive Examination (PECE)",
    board: "JCECEB, Jharkhand",
    totalMarks: "150 Marks (150 MCQs)",
    duration: "2 Hours 30 Minutes (150 Mins)",
    driveUrl: "https://drive.google.com/file/d/17rK99BvD_E6zJMWLO_Loqp0NgVWmV_Z3/view",
    subjectLinks: {
      "PECE Question Paper": "https://drive.google.com/file/d/17rK99BvD_E6zJMWLO_Loqp0NgVWmV_Z3/view",
      "Physics (Bhautik Vigyan)": "https://drive.google.com/file/d/17rK99BvD_E6zJMWLO_Loqp0NgVWmV_Z3/view",
      "Chemistry (Rasayan Vigyan)": "https://drive.google.com/file/d/17rK99BvD_E6zJMWLO_Loqp0NgVWmV_Z3/view",
      "Mathematics (Ganit)": "https://drive.google.com/file/d/17rK99BvD_E6zJMWLO_Loqp0NgVWmV_Z3/view",
    },
  },
  2023: {
    year: 2023,
    exam: "Jharkhand Polytechnic Entrance Competitive Examination (PECE)",
    board: "JCECEB, Jharkhand",
    totalMarks: "150 Marks (150 MCQs)",
    duration: "2 Hours 30 Minutes (150 Mins)",
    driveUrl: "https://drive.google.com/file/d/18SHXRF3MrK_agzA3T3Ncd24G7vqerVl9/view",
    subjectLinks: {
      "PECE Question Paper": "https://drive.google.com/file/d/18SHXRF3MrK_agzA3T3Ncd24G7vqerVl9/view",
      "Physics (Bhautik Vigyan)": "https://drive.google.com/file/d/18SHXRF3MrK_agzA3T3Ncd24G7vqerVl9/view",
      "Chemistry (Rasayan Vigyan)": "https://drive.google.com/file/d/18SHXRF3MrK_agzA3T3Ncd24G7vqerVl9/view",
      "Mathematics (Ganit)": "https://drive.google.com/file/d/18SHXRF3MrK_agzA3T3Ncd24G7vqerVl9/view",
    },
  },
  2022: {
    year: 2022,
    exam: "Jharkhand Polytechnic Entrance Competitive Examination (PECE)",
    board: "JCECEB, Jharkhand",
    totalMarks: "150 Marks (150 MCQs)",
    duration: "2 Hours 30 Minutes (150 Mins)",
    driveUrl: "https://drive.google.com/file/d/1NeXaMaHortAK8HEAf9Pcd_SiXAaaNiNi/view",
    subjectLinks: {
      "PECE Question Paper": "https://drive.google.com/file/d/1NeXaMaHortAK8HEAf9Pcd_SiXAaaNiNi/view",
      "Physics (Bhautik Vigyan)": "https://drive.google.com/file/d/1NeXaMaHortAK8HEAf9Pcd_SiXAaaNiNi/view",
      "Chemistry (Rasayan Vigyan)": "https://drive.google.com/file/d/1NeXaMaHortAK8HEAf9Pcd_SiXAaaNiNi/view",
      "Mathematics (Ganit)": "https://drive.google.com/file/d/1NeXaMaHortAK8HEAf9Pcd_SiXAaaNiNi/view",
    },
  },
  2021: {
    year: 2021,
    exam: "Jharkhand Polytechnic Entrance Competitive Examination (PECE)",
    board: "JCECEB, Jharkhand",
    totalMarks: "150 Marks (150 MCQs)",
    duration: "2 Hours 30 Minutes (150 Mins)",
    driveUrl: "https://drive.google.com/file/d/1otyj5pK4yjSbtOXr4JIQpoE2qbtf0HFv/view",
    subjectLinks: {
      "PECE Question Paper": "https://drive.google.com/file/d/1otyj5pK4yjSbtOXr4JIQpoE2qbtf0HFv/view",
      "Physics (Bhautik Vigyan)": "https://drive.google.com/file/d/1otyj5pK4yjSbtOXr4JIQpoE2qbtf0HFv/view",
      "Chemistry (Rasayan Vigyan)": "https://drive.google.com/file/d/1otyj5pK4yjSbtOXr4JIQpoE2qbtf0HFv/view",
      "Mathematics (Ganit)": "https://drive.google.com/file/d/1otyj5pK4yjSbtOXr4JIQpoE2qbtf0HFv/view",
    },
  },
};

export const POLY_SUBJECT_DETAILS = {
  "PECE Question Paper": {
    code: "JCECEB-PECE",
    type: "Complete Entrance Paper",
    branch: "Diploma in Engineering (All Branches)",
    marks: "150 Marks (50 Phy + 50 Chem + 50 Maths)",
    examBoard: "JCECEB Ranchi",
    tips: "Focus heavily on Mathematics and Physics since tie-breaker rank is determined by Maths marks first.",
  },
  "Physics (Bhautik Vigyan)": {
    code: "PECE-PHY",
    type: "Section Paper",
    branch: "Physics Section",
    marks: "50 Marks (50 MCQs, 1 Mark Each)",
    examBoard: "JCECEB Ranchi",
    tips: "Formulas of optics and electricity are heavily asked. Revise numerical shortcuts.",
  },
  "Chemistry (Rasayan Vigyan)": {
    code: "PECE-CHEM",
    type: "Section Paper",
    branch: "Chemistry Section",
    marks: "50 Marks (50 MCQs, 1 Mark Each)",
    examBoard: "JCECEB Ranchi",
    tips: "Chemical equations, reaction types, and periodic properties give high scoring accuracy.",
  },
  "Mathematics (Ganit)": {
    code: "PECE-MATH",
    type: "Section Paper",
    branch: "Mathematics Section",
    marks: "50 Marks (50 MCQs, 1 Mark Each)",
    examBoard: "JCECEB Ranchi",
    tips: "Maths carries first priority in tie-breaking resolution. Practice high-speed calculation.",
  },
};

// Flat { year: { subject: url } } derived from the rich PAPERS_BY_YEAR shape,
// so the shared factory resolves links the same way PdfViewerLayout does.
const POLY_PAPERS = {};
for (const [y, p] of Object.entries(POLY_PAPERS_BY_YEAR)) {
  POLY_PAPERS[parseInt(y, 10)] = { ...(p.subjectLinks || {}) };
}

const POLY = createResourceData({
  years: POLY_YEARS,
  allSubjects: POLY_SUBJECTS,
  subjectDetails: POLY_SUBJECT_DETAILS,
  papers: POLY_PAPERS,
});

export const getPolyLink = POLY.getLink;
export { slugifySubject };

export function findPolySubjectBySlug(slug) {
  if (!slug) return POLY_SUBJECTS[0];
  const cleanSlug = slug.toLowerCase().trim();
  for (const s of POLY_SUBJECTS) {
    if (slugifySubject(s) === cleanSlug) return s;
    if (s.toLowerCase().includes(cleanSlug) || cleanSlug.includes(s.toLowerCase())) return s;
  }
  if (cleanSlug.includes("phy")) return "Physics (Bhautik Vigyan)";
  if (cleanSlug.includes("chem")) return "Chemistry (Rasayan Vigyan)";
  if (cleanSlug.includes("math")) return "Mathematics (Ganit)";
  return POLY_SUBJECTS[0];
}
