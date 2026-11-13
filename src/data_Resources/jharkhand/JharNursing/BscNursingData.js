/**
 * Official Jharkhand B.Sc Nursing Entrance Competitive Examination (Basic & Post-Basic)
 * Previous Year Question Papers & Document Link Database
 */
import { createResourceData, slugifySubject } from '@/src/data_Resources/makeResourceData';

export const BSC_NURSING_YEARS = [2025, 2024, 2023, 2022, 2021, 2020, 2019];

export const BSC_NURSING_SUBJECTS = [
  "B.Sc Nursing Question Paper",
  "Biology",
  "Physics",
  "Chemistry",
];

// Official Google Drive direct links for Jharkhand B.Sc Nursing Question Papers
export const BSC_NURSING_LINKS = {
  2025: {
    "B.Sc Nursing Question Paper": null,
    "Biology": null,
    "Physics": null,
    "Chemistry": null,
  },
  2024: {
    "B.Sc Nursing Question Paper": "https://drive.google.com/file/d/1HQuK5-f2o9PmLACqLewVQvleWeW17Jln/view",
    "Biology": "https://drive.google.com/file/d/1HQuK5-f2o9PmLACqLewVQvleWeW17Jln/view",
    "Physics": "https://drive.google.com/file/d/1HQuK5-f2o9PmLACqLewVQvleWeW17Jln/view",
    "Chemistry": "https://drive.google.com/file/d/1HQuK5-f2o9PmLACqLewVQvleWeW17Jln/view",
  },
  2023: {
    "B.Sc Nursing Question Paper": "https://drive.google.com/file/d/1zS8J_pR3FrqJPyE14tPLyh5S3KIDUyvX/view",
    "Biology": "https://drive.google.com/file/d/1zS8J_pR3FrqJPyE14tPLyh5S3KIDUyvX/view",
    "Physics": "https://drive.google.com/file/d/1zS8J_pR3FrqJPyE14tPLyh5S3KIDUyvX/view",
    "Chemistry": "https://drive.google.com/file/d/1zS8J_pR3FrqJPyE14tPLyh5S3KIDUyvX/view",
  },
  2022: {
    "B.Sc Nursing Question Paper": "https://drive.google.com/file/d/1LgSv2V_X8MFeUIiichv98ZuMMqnMGm-z/view",
    "Biology": "https://drive.google.com/file/d/1LgSv2V_X8MFeUIiichv98ZuMMqnMGm-z/view",
    "Physics": "https://drive.google.com/file/d/1LgSv2V_X8MFeUIiichv98ZuMMqnMGm-z/view",
    "Chemistry": "https://drive.google.com/file/d/1LgSv2V_X8MFeUIiichv98ZuMMqnMGm-z/view",
  },
  2021: {
    "B.Sc Nursing Question Paper": "https://drive.google.com/file/d/1AQuWXfJm1d-9UxuzwehwIu7CcmFAqJHo/view",
    "Biology": "https://drive.google.com/file/d/1AQuWXfJm1d-9UxuzwehwIu7CcmFAqJHo/view",
    "Physics": "https://drive.google.com/file/d/1AQuWXfJm1d-9UxuzwehwIu7CcmFAqJHo/view",
    "Chemistry": "https://drive.google.com/file/d/1AQuWXfJm1d-9UxuzwehwIu7CcmFAqJHo/view",
  },
  2020: {
    "B.Sc Nursing Question Paper": "https://drive.google.com/file/d/1Ypknk2r3DeJ8aih5ffPQN0fJnIzwm0A2/view",
    "Biology": "https://drive.google.com/file/d/1Ypknk2r3DeJ8aih5ffPQN0fJnIzwm0A2/view",
    "Physics": "https://drive.google.com/file/d/1Ypknk2r3DeJ8aih5ffPQN0fJnIzwm0A2/view",
    "Chemistry": "https://drive.google.com/file/d/1Ypknk2r3DeJ8aih5ffPQN0fJnIzwm0A2/view",
  },
  2019: {
    "B.Sc Nursing Question Paper": "https://drive.google.com/file/d/1Z3jttUFwbfetMKL5MhdjMa61fFDtxjKX/view",
    "Biology": "https://drive.google.com/file/d/1Z3jttUFwbfetMKL5MhdjMa61fFDtxjKX/view",
    "Physics": "https://drive.google.com/file/d/1Z3jttUFwbfetMKL5MhdjMa61fFDtxjKX/view",
    "Chemistry": "https://drive.google.com/file/d/1Z3jttUFwbfetMKL5MhdjMa61fFDtxjKX/view",
  },
};

export const BSC_NURSING_SUBJECT_DETAILS = {
  "B.Sc Nursing Question Paper": {
    code: "JCECEB-BSC-NURSING",
    type: "Complete B.Sc Nursing Entrance Paper",
    course: "B.Sc Nursing (Basic 4-Year Degree Course)",
    marks: "150 Marks (150 MCQs)",
    duration: "2.5 Hours (150 Minutes)",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "Biology carries equal marks (50 Qs) but has highest priority in tie-breaking resolution. Solve all past 6 years papers for high yield questions.",
  },
  "Biology": {
    code: "BSCN-BIO",
    type: "Biology Section",
    course: "B.Sc Nursing (Class 11 & 12 NCERT)",
    marks: "50 Marks (50 MCQs)",
    duration: "50 Mins Recommended",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "Biology is the ranking anchor for B.Sc Nursing. High accuracy in Human Physiology and Genetics secures a top rank.",
  },
  "Physics": {
    code: "BSCN-PHY",
    type: "Physics Section",
    course: "B.Sc Nursing (Class 11 & 12 NCERT)",
    marks: "50 Marks (50 MCQs)",
    duration: "50 Mins Recommended",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "Focus on direct formula-based numericals and conceptual questions from NCERT Class 11 & 12 Physics.",
  },
  "Chemistry": {
    code: "BSCN-CHEM",
    type: "Chemistry Section",
    course: "B.Sc Nursing (Class 11 & 12 NCERT)",
    marks: "50 Marks (50 MCQs)",
    duration: "50 Mins Recommended",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "NCERT named reactions, inorganic trends, and basic physical chemistry numericals repeat frequently across past years.",
  },
};

export const BSC_NURSING_FAQS = [
  {
    q: "Jharkhand B.Sc Nursing exam में कितने questions और marks होते हैं?",
    a: "B.Sc Nursing (Basic) Entrance Competitive Examination में कुल 150 Objective (MCQ) questions होते हैं — Biology से 50, Physics से 50 और Chemistry से 50 questions। कुल 150 marks होते हैं।",
  },
  {
    q: "क्या B.Sc Nursing PYQ PDF को offline download कर सकते हैं?",
    a: "हाँ, Futurely के built-in PDF viewer में डायरेक्ट 'Download PDF' बटन और Google Drive export link उपलब्ध है। आप 2019 से 2024 तक के सभी official papers free में download और offline study कर सकते हैं।",
  },
  {
    q: "Jharkhand B.Sc Nursing syllabus का level क्या है?",
    a: "B.Sc Nursing entrance exam का syllabus CBSE / Jharkhand Academic Council (JAC) के Class 11 और 12 (Intermediate Science) level का NCERT curriculum आधारित होता है।",
  },
  {
    q: "Merit List में tie-breaking rule क्या है?",
    a: "दो या दो से अधिक candidates के समान अंक होने पर पहले Biology के प्राप्तांक देखे जाते हैं। यदि Biology में भी बराबर हों तो Chemistry के अंक देखे जाते हैं, फिर जन्मतिथि (अधिक आयु) और अंत में अंग्रेजी वर्णमाला के आधार पर वरीयता दी जाती है।",
  },
  {
    q: "क्या male candidates Jharkhand B.Sc Nursing में apply कर सकते हैं?",
    a: "हाँ, B.Sc Nursing (Basic 4-Year Degree) पाठ्यक्रम male और female दोनों candidates के लिए खुला है, बशर्ते वे न्यूनतम शैक्षिक योग्यता और domicile मानदंड पूरे करते हों।",
  },
];

const BSC_NURSING = createResourceData({
  years: BSC_NURSING_YEARS,
  allSubjects: BSC_NURSING_SUBJECTS,
  subjectDetails: BSC_NURSING_SUBJECT_DETAILS,
  papers: BSC_NURSING_LINKS,
});

// ── Backward-compatible behavior (subject → fallback to B.Sc Nursing Question Paper) ──
export const getBscNursingLink = (year, subject = "B.Sc Nursing Question Paper") =>
  BSC_NURSING.getLink(year, subject) || BSC_NURSING.getLink(year, "B.Sc Nursing Question Paper");

export { slugifySubject };

export function findBscNursingSubjectBySlug(slug) {
  if (!slug) return "B.Sc Nursing Question Paper";
  const s = slug.toLowerCase();
  if (s.includes("bio")) return "Biology";
  if (s.includes("phy")) return "Physics";
  if (s.includes("chem")) return "Chemistry";
  return "B.Sc Nursing Question Paper";
}
