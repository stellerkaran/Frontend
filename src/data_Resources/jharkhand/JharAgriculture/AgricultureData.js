/**
 * Official Jharkhand JCECE Agriculture & Allied Courses Entrance Competitive Examination
 * Previous Year Question Papers & Document Link Database
 */
import { createResourceData, slugifySubject } from '@/src/data_Resources/makeResourceData';

export const AGRI_YEARS = [2026, 2025, 2024, 2023, 2022, 2021];

export const AGRI_SUBJECTS = [
  "JCECE Agriculture Question Paper",
  "PCM Group (Phy, Chem, Math)",
  "PCB Group (Phy, Chem, Bio)",
  "PCMB Group (Phy, Chem, Math, Bio)",
  "Biology",
  "Physics",
  "Chemistry",
  "Mathematics",
];

// Official Google Drive direct links for Jharkhand Agriculture Question Papers
export const AGRI_LINKS = {
  2026: {
    "JCECE Agriculture Question Paper": null,
    "PCM Group (Phy, Chem, Math)": null,
    "PCB Group (Phy, Chem, Bio)": null,
    "PCMB Group (Phy, Chem, Math, Bio)": null,
    "Biology": null,
    "Physics": null,
    "Chemistry": null,
    "Mathematics": null,
  },
  2025: {
    "JCECE Agriculture Question Paper": "https://drive.google.com/file/d/1qPt72rlVKV3r5yOlKhLC1czHB7WL5L33/view",
    "PCM Group (Phy, Chem, Math)": "https://drive.google.com/file/d/1qPt72rlVKV3r5yOlKhLC1czHB7WL5L33/view",
    "PCB Group (Phy, Chem, Bio)": "https://drive.google.com/file/d/1qPt72rlVKV3r5yOlKhLC1czHB7WL5L33/view",
    "PCMB Group (Phy, Chem, Math, Bio)": "https://drive.google.com/file/d/1qPt72rlVKV3r5yOlKhLC1czHB7WL5L33/view",
    "Biology": "https://drive.google.com/file/d/1qPt72rlVKV3r5yOlKhLC1czHB7WL5L33/view",
    "Physics": "https://drive.google.com/file/d/1qPt72rlVKV3r5yOlKhLC1czHB7WL5L33/view",
    "Chemistry": "https://drive.google.com/file/d/1qPt72rlVKV3r5yOlKhLC1czHB7WL5L33/view",
    "Mathematics": "https://drive.google.com/file/d/1qPt72rlVKV3r5yOlKhLC1czHB7WL5L33/view",
  },
  2024: {
    "JCECE Agriculture Question Paper": "https://drive.google.com/file/d/1o_yFzjotl3ma9noooQRAWIC7cCq1J_xG/view",
    "PCM Group (Phy, Chem, Math)": "https://drive.google.com/file/d/1o_yFzjotl3ma9noooQRAWIC7cCq1J_xG/view",
    "PCB Group (Phy, Chem, Bio)": "https://drive.google.com/file/d/1o_yFzjotl3ma9noooQRAWIC7cCq1J_xG/view",
    "PCMB Group (Phy, Chem, Math, Bio)": "https://drive.google.com/file/d/1o_yFzjotl3ma9noooQRAWIC7cCq1J_xG/view",
    "Biology": "https://drive.google.com/file/d/1o_yFzjotl3ma9noooQRAWIC7cCq1J_xG/view",
    "Physics": "https://drive.google.com/file/d/1o_yFzjotl3ma9noooQRAWIC7cCq1J_xG/view",
    "Chemistry": "https://drive.google.com/file/d/1o_yFzjotl3ma9noooQRAWIC7cCq1J_xG/view",
    "Mathematics": "https://drive.google.com/file/d/1o_yFzjotl3ma9noooQRAWIC7cCq1J_xG/view",
  },
  2023: {
    "JCECE Agriculture Question Paper": "https://drive.google.com/file/d/1IslTlbnY6w84XkqPwc49ZZe_6L3DRNA8/view",
    "PCM Group (Phy, Chem, Math)": "https://drive.google.com/file/d/1IslTlbnY6w84XkqPwc49ZZe_6L3DRNA8/view",
    "PCB Group (Phy, Chem, Bio)": "https://drive.google.com/file/d/1IslTlbnY6w84XkqPwc49ZZe_6L3DRNA8/view",
    "PCMB Group (Phy, Chem, Math, Bio)": "https://drive.google.com/file/d/1IslTlbnY6w84XkqPwc49ZZe_6L3DRNA8/view",
    "Biology": "https://drive.google.com/file/d/1IslTlbnY6w84XkqPwc49ZZe_6L3DRNA8/view",
    "Physics": "https://drive.google.com/file/d/1IslTlbnY6w84XkqPwc49ZZe_6L3DRNA8/view",
    "Chemistry": "https://drive.google.com/file/d/1IslTlbnY6w84XkqPwc49ZZe_6L3DRNA8/view",
    "Mathematics": "https://drive.google.com/file/d/1IslTlbnY6w84XkqPwc49ZZe_6L3DRNA8/view",
  },
  2022: {
    "JCECE Agriculture Question Paper": "https://drive.google.com/file/d/1np1zPK3Ewij4FrAgB0fudoBvYkjvBsSh/view",
    "PCM Group (Phy, Chem, Math)": "https://drive.google.com/file/d/1np1zPK3Ewij4FrAgB0fudoBvYkjvBsSh/view",
    "PCB Group (Phy, Chem, Bio)": "https://drive.google.com/file/d/1np1zPK3Ewij4FrAgB0fudoBvYkjvBsSh/view",
    "PCMB Group (Phy, Chem, Math, Bio)": "https://drive.google.com/file/d/1np1zPK3Ewij4FrAgB0fudoBvYkjvBsSh/view",
    "Biology": "https://drive.google.com/file/d/1np1zPK3Ewij4FrAgB0fudoBvYkjvBsSh/view",
    "Physics": "https://drive.google.com/file/d/1np1zPK3Ewij4FrAgB0fudoBvYkjvBsSh/view",
    "Chemistry": "https://drive.google.com/file/d/1np1zPK3Ewij4FrAgB0fudoBvYkjvBsSh/view",
    "Mathematics": "https://drive.google.com/file/d/1np1zPK3Ewij4FrAgB0fudoBvYkjvBsSh/view",
  },
  2021: {
    "JCECE Agriculture Question Paper": null,
    "PCM Group (Phy, Chem, Math)": null,
    "PCB Group (Phy, Chem, Bio)": null,
    "PCMB Group (Phy, Chem, Math, Bio)": null,
    "Biology": null,
    "Physics": null,
    "Chemistry": null,
    "Mathematics": null,
  },
};

export const AGRI_SUBJECT_DETAILS = {
  "JCECE Agriculture Question Paper": {
    code: "JCECEB-JCECE-AGRI",
    type: "Combined JCECE Agriculture & Allied Entrance Paper",
    course: "B.Sc (Hons) Agriculture, B.V.Sc & A.H., B.Tech Dairy, B.F.Sc, Forestry & Allied Courses",
    marks: "150–200 Marks (50 Marks Per Subject)",
    duration: "2.5 – 3.0 Hours",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "Exam centres are exclusively at Ranchi and Dumka headquarters. Choose your subject group carefully based on target courses.",
  },
  "PCM Group (Phy, Chem, Math)": {
    code: "JCECE-PCM",
    type: "Engineering & Tech Allied Group",
    course: "B.Tech (Dairy Technology), B.Tech (Agriculture Engg.), B.Sc (H) Forestry, B.Sc (H) Horticulture",
    marks: "150 Marks (150 MCQs)",
    duration: "2.5 Hours",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "Mathematics questions require quick calculations and formula recall. Practice NCERT Class 11 & 12 calculus and coordinate geometry.",
  },
  "PCB Group (Phy, Chem, Bio)": {
    code: "JCECE-PCB",
    type: "Medical & Agriculture Allied Group",
    course: "B.V.Sc & A.H., B.Sc (Hons) Agriculture, B.Sc (H) Forestry, B.F.Sc, B.Sc (H) Horticulture",
    marks: "150 Marks (150 MCQs)",
    duration: "2.5 Hours",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "For B.V.Sc & A.H. and B.Sc Agriculture, high marks in Biology and Chemistry give you the winning edge.",
  },
  "PCMB Group (Phy, Chem, Math, Bio)": {
    code: "JCECE-PCMB",
    type: "Universal Combined Group",
    course: "Eligible for All Agriculture, Veterinary, Engineering and Fisheries degree courses",
    marks: "200 Marks (200 MCQs)",
    duration: "3.0 Hours",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "PCMB gives admission flexibility across all faculties at Birsa Agricultural University (BAU) and affiliated colleges.",
  },
  "Biology": {
    code: "AGRI-BIO",
    type: "Biology Subject Section",
    course: "JCECE Entrance (Class 11 & 12 NCERT)",
    marks: "50 Marks (50 MCQs)",
    duration: "45 Mins Recommended",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "Pay special attention to plant anatomy, genetics, photosynthesis and environmental biology.",
  },
  "Physics": {
    code: "AGRI-PHY",
    type: "Physics Subject Section",
    course: "JCECE Entrance (Class 11 & 12 NCERT)",
    marks: "50 Marks (50 MCQs)",
    duration: "45 Mins Recommended",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "Direct NCERT formula applications and dimensional analysis are standard in JCECE exams.",
  },
  "Chemistry": {
    code: "AGRI-CHEM",
    type: "Chemistry Subject Section",
    course: "JCECE Entrance (Class 11 & 12 NCERT)",
    marks: "50 Marks (50 MCQs)",
    duration: "45 Mins Recommended",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "High-yield named reactions and periodic table trends provide quick scoring opportunities.",
  },
  "Mathematics": {
    code: "AGRI-MATH",
    type: "Mathematics Subject Section",
    course: "JCECE Entrance (Class 11 & 12 NCERT)",
    marks: "50 Marks (50 MCQs)",
    duration: "50 Mins Recommended",
    examBoard: "JCECEB Ranchi, Jharkhand",
    tips: "Focus on standard integral formulas, matrix properties, and vector 3D equations.",
  },
};

export const AGRI_FAQS = [
  {
    q: "JCECE Agriculture exam में कौन-कौन से courses में admission मिलता है?",
    a: "JCECE (Agriculture & Other Allied Courses) के माध्यम से Birsa Agricultural University (BAU) और राज्य के अन्य संस्थानों में B.Sc (Hons) Agriculture, B.V.Sc & A.H. (Veterinary), B.Sc (H) Forestry, B.Tech (Dairy Technology), B.Tech (Agriculture Engineering), B.F.Sc (Fisheries) और B.Sc (H) Horticulture में प्रवेश मिलता है।",
  },
  {
    q: "Jharkhand Agriculture PYQ PDF कैसे download करें?",
    a: "Futurely के interactive PDF viewer में आप 2022 से 2025 तक के सभी official papers ऑनलाइन पढ़ सकते हैं और 'Download PDF' बटन से सीधे अपने फोन या कंप्यूटर में PDF सेव कर सकते हैं।",
  },
  {
    q: "Exam Centres कहाँ बनाए जाते हैं?",
    a: "आधिकारिक अधिसूचना के अनुसार JCECE Agriculture entrance exam के परीक्षा केंद्र केवल राँची (Ranchi) और दुमका (Dumka) जिला मुख्यालयों में ही बनाए जाते हैं।",
  },
  {
    q: "Subject Groups PCM, PCB और PCMB में क्या अंतर है?",
    a: "PCM (150 प्रश्न) Dairy व Agri Engineering के लिए है; PCB (150 प्रश्न) Veterinary व B.Sc Agriculture के लिए है; और PCMB (200 प्रश्न) उन छात्रों के लिए है जो सभी कोर्सेज के लिए पात्र बनना चाहते हैं।",
  },
];

const AGRI = createResourceData({
  years: AGRI_YEARS,
  allSubjects: AGRI_SUBJECTS,
  subjectDetails: AGRI_SUBJECT_DETAILS,
  papers: AGRI_LINKS,
});

// ── Backward-compatible behavior (subject → fallback to JCECE Agriculture Question Paper) ──
export const getAgriLink = (year, subject = "JCECE Agriculture Question Paper") =>
  AGRI.getLink(year, subject) || AGRI.getLink(year, "JCECE Agriculture Question Paper");

export { slugifySubject };

export function findAgriSubjectBySlug(slug) {
  if (!slug) return "JCECE Agriculture Question Paper";
  const s = slug.toLowerCase();
  if (s.includes("pcmb")) return "PCMB Group (Phy, Chem, Math, Bio)";
  if (s.includes("pcm")) return "PCM Group (Phy, Chem, Math)";
  if (s.includes("pcb")) return "PCB Group (Phy, Chem, Bio)";
  if (s.includes("bio")) return "Biology";
  if (s.includes("phy")) return "Physics";
  if (s.includes("chem")) return "Chemistry";
  if (s.includes("math")) return "Mathematics";
  return "JCECE Agriculture Question Paper";
}
