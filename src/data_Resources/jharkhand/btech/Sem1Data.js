// Jharkhand B.Tech 1st Semester Papers & Subject Data
// Logic (getLink / slugify / findBySlug) shared via makeResourceData.
// Data below is untouched — only the repeated helpers were factored out.

import {
  createResourceData,
  slugifySubject,
} from '@/src/data_Resources/makeResourceData';

const SEM1 = createResourceData({
  years: [2025, 2024, 2023],

  allSubjects: [
    "Engineering Mathematics-I",
    "Engineering Mechanics",
    "Engineering Chemistry",
    "Basic of Electrical & Electronics Engineering",
    "Engineering Drawing & Computer Graphics",
  ],

  subjectDetails: {
    "Engineering Mathematics-I": {
      code: "MATH-101",
      type: "Core Engineering",
      branch: "Common for all Branches",
      tips: "Practice step-by-step solutions for Eigenvalues/Eigenvectors and double integration. Focus on standard proof theorems (Euler's & Cayley-Hamilton).",
    },
    "Engineering Mechanics": {
      code: "MECH-101",
      type: "Core Engineering",
      branch: "Common for all Branches",
      tips: "Always draw neat Free Body Diagrams (FBD) for every mechanics problem. Show equations of equilibrium clearly (ΣFx=0, ΣFy=0, ΣM=0).",
    },
    "Engineering Chemistry": {
      code: "CHEM-101",
      type: "Basic Sciences",
      branch: "Common for all Branches",
      tips: "Draw clear chemical equations, EDTA titration reactions, and corrosion cell diagrams with labeled anode/cathode and electrolyte.",
    },
    "Basic of Electrical & Electronics Engineering": {
      code: "EEE-101",
      type: "Core Engineering",
      branch: "Common for all Branches",
      tips: "Practice numerical problems on mesh analysis and transformer equivalent circuits. Draw clean rectifier waveforms and filter circuits.",
    },
    "Engineering Drawing & Computer Graphics": {
      code: "EDG-101",
      type: "Engineering Graphics",
      branch: "Common for all Branches",
      tips: "Follow standard BIS conventions and line thickness. Practice projection of lines inclined to both reference planes and isometric view constructions.",
    },
  },

  papers: {
    2025: {
      "Engineering Mathematics-I": "https://drive.google.com/file/d/1fHvCWpVTTwP0Cgd5ls83UKLU9A82yYrj/view",
      "Engineering Mechanics": "https://drive.google.com/file/d/13LQLo0LWet-tLQVrqGTngDpVojJ3kl-b/view",
      "Engineering Chemistry": "https://drive.google.com/file/d/1azoeuwbNB-jQPzkUcSVx8YisLrXReWk8/view",
      "Basic of Electrical & Electronics Engineering": "https://drive.google.com/file/d/1Aw3258JlgBumeJlJmFE17eXgWe3iAuLP/view",
      "Engineering Drawing & Computer Graphics": "https://drive.google.com/file/d/1hw-c2Q8kTHYM8rTfZkPy3pJfYzj3u_x1/view",
    },
    2024: {
      "Engineering Mathematics-I": "https://drive.google.com/file/d/1Q9MYfOl7Y09UaMo4Z631w8mRBqIlm1G6/view",
      "Engineering Mechanics": "https://drive.google.com/file/d/1nGrfN0NLzMBlRfOi7ElUngEz956mRbIk/view",
      "Engineering Chemistry": "https://drive.google.com/file/d/1aUYyAdlcFlNCp8qvMAppYZrpGEurO_xT/view",
      "Basic of Electrical & Electronics Engineering": "https://drive.google.com/file/d/1GdTjmwuixTArfTh4eEbK3fCkLMWE5LXM/view",
      "Engineering Drawing & Computer Graphics": "https://drive.google.com/file/d/1FS2buB2CeW6Oh-lzBwc8m-LnEgVxzea_/view",
    },
    2023: {
      "Engineering Mathematics-I": "https://drive.google.com/file/d/1A1uZKq1aBEigiUPgDAKHh8Vc1vEeKuBQ/view",
      "Engineering Mechanics": "https://drive.google.com/file/d/1fWyVr6PXPy6tEb8A6HVj58jr5aHg_r9k/view",
      "Engineering Chemistry": "https://drive.google.com/file/d/1aUYyAdlcFlNCp8qvMAppYZrpGEurO_xT/view",
      "Basic of Electrical & Electronics Engineering": "https://drive.google.com/file/d/1yB9PKZyIv63aKcKdJAhrru_FK0I4jQr_/view",
      "Engineering Drawing & Computer Graphics": "https://drive.google.com/file/d/1FS2buB2CeW6Oh-lzBwc8m-LnEgVxzea_/view",
    },
  },
});

// ── Backward-compatible aliases (page imports keep working, zero page change) ──
export const SEM1_YEARS = SEM1.YEARS;
export const SEM1_ALL_SUBJECTS = SEM1.ALL_SUBJECTS;
export const SEM1_SUBJECT_DETAILS = SEM1.SUBJECT_DETAILS;
export const SEM1_PAPERS = SEM1.PAPERS;
export const getSem1Link = SEM1.getLink;
export const getSem1PreviewLink = SEM1.getPreviewLink;
export const getSem1DownloadLink = SEM1.getDownloadLink;
export const findSubjectBySlug = SEM1.findSubjectBySlug;
export { slugifySubject };
export default SEM1;

