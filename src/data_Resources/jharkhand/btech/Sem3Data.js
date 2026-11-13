// Jharkhand B.Tech 3rd Semester (CSE/IT) Papers & Subject Data
// Logic (getLink / slugify / findBySlug) shared via makeResourceData.
// Data below is untouched — only the repeated helpers were factored out.

import {
  createResourceData,
  slugifySubject,
} from '@/src/data_Resources/makeResourceData';

const SEM3 = createResourceData({
  years: [2025, 2024, 2023],

  allSubjects: [
    "Probability & Statistics",
    "Data Structures & Algorithms",
    "Digital Electronics & Systems",
    "Object Oriented Programming",
    "Database Management System",
  ],

  subjectDetails: {
    "Probability & Statistics": {
      code: "MATH-201",
      type: "Core Foundation",
      branch: "Computer Science & IT (CSE/IT)",
      tips: "Practice standard numericals on Bayes' theorem, Poisson distribution approximations, and normal distribution z-score calculations.",
    },
    "Data Structures & Algorithms": {
      code: "CSE-201",
      type: "Core Computer Science",
      branch: "Computer Science & IT (CSE/IT)",
      tips: "Write clean C/C++ code or structured pseudocode for tree traversals, stack applications (infix to postfix), and graph search algorithms with trace tables.",
    },
    "Digital Electronics & Systems": {
      code: "CSE-202",
      type: "Core Computer Science",
      branch: "Computer Science & IT (CSE/IT)",
      tips: "Draw complete logic gate diagrams, timing waveforms, and state transition tables for counter design problems.",
    },
    "Object Oriented Programming": {
      code: "CSE-203",
      type: "Core Computer Science",
      branch: "Computer Science & IT (CSE/IT)",
      tips: "Provide clear, compilable C++ code snippets with class definitions, constructors, and overridden virtual functions to demonstrate runtime polymorphism.",
    },
    "Database Management System": {
      code: "CSE-204",
      type: "Core Computer Science",
      branch: "Computer Science & IT (CSE/IT)",
      tips: "Draw complete ER diagrams with appropriate cardinality ratios and relational schemas. Write accurate SQL queries with proper GROUP BY and HAVING clauses.",
    },
  },

  papers: {
    2025: {
      "Probability & Statistics": null,
      "Data Structures & Algorithms": "https://drive.google.com/file/d/182m1QhcNOkd5VAqbq0wi5czY9VGN0Ds_/view",
      "Digital Electronics & Systems": "https://drive.google.com/file/d/1s3yim9MwiPn2S_QZMR74CI1iXw6sWvSH/view",
      "Object Oriented Programming": "https://drive.google.com/file/d/1tc9lVZTowhOWh7UvsKD0QiIGLaGufAeh/view",
      "Database Management System": "https://drive.google.com/file/d/1YifLjxNuAwwbciNvspry2Ji_yRbIjc_e/view",
    },
    2024: {
      "Probability & Statistics": null,
      "Data Structures & Algorithms": null,
      "Digital Electronics & Systems": null,
      "Object Oriented Programming": null,
      "Database Management System": null,
    },
    2023: {
      "Probability & Statistics": null,
      "Data Structures & Algorithms": null,
      "Digital Electronics & Systems": null,
      "Object Oriented Programming": null,
      "Database Management System": null,
    },
  },
});

// ── Backward-compatible aliases (page imports keep working, zero page change) ──
export const SEM3_YEARS = SEM3.YEARS;
export const SEM3_ALL_SUBJECTS = SEM3.ALL_SUBJECTS;
export const SEM3_SUBJECT_DETAILS = SEM3.SUBJECT_DETAILS;
export const SEM3_PAPERS = SEM3.PAPERS;
export const getSem3Link = SEM3.getLink;
export const getSem3PreviewLink = SEM3.getPreviewLink;
export const getSem3DownloadLink = SEM3.getDownloadLink;
export const findSubjectBySlug = SEM3.findSubjectBySlug;
export { slugifySubject };
export default SEM3;

