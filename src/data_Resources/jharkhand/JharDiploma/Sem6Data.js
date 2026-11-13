// Jharkhand Diploma 6th Semester CSE Papers & Subject Data
// Helpers (getLink / slugify / findBySlug) shared via makeResourceData.

import { getPaperLink, slugifySubject, makeFindSubjectBySlug } from '@/src/data_Resources/makeResourceData';
import { getDrivePreviewUrl, getDriveDirectDownloadUrl } from '@/src/utils/drive';

export const SEM6_YEARS = [2024, 2023, 2022, 2021, 2020];

export const SEM6_ALL_SUBJECTS = [
  "Software Engineering",
  "Industrial Engineering & Management",
  "Elective-III(Network Security)",
  "Elective-III(Cloud Computing)",
  "Elective-III/IV(Internet of Things)",
  "Elective-IV(Animation & Multimedia)",
];

export const SEM6_SUBJECT_DETAILS = {
  "Software Engineering": {
    code: "CSE-601",
    type: "Core Branch",
    branch: "Computer Science & Engineering (CSE)",
    tips: "Draw clean flowcharts and UML diagrams (Use-Case, Class, Sequence). Memorize formulas and definitions for COCOMO model and testing matrix.",
  },
  "Industrial Engineering & Management": {
    code: "CSE-602",
    type: "Core Management",
    branch: "Computer Science & Engineering (CSE)",
    tips: "Explain concepts with neat tabular comparisons and industry examples. Practice EOQ calculation and break-even analysis charts.",
  },
  "Elective-III(Network Security)": {
    code: "CSE-603A",
    type: "Elective-III",
    branch: "Computer Science & Engineering (CSE)",
    tips: "Master numerical problems for RSA encryption/decryption key generation. Draw block diagrams for IPSec modes and firewall architectures.",
  },
  "Elective-III(Cloud Computing)": {
    code: "CSE-603B",
    type: "Elective-III",
    branch: "Computer Science & Engineering (CSE)",
    tips: "Draw clear architectural layers for IaaS, PaaS, and SaaS. Compare virtualization types and hypervisors with neat tables.",
  },
  "Elective-III/IV(Internet of Things)": {
    code: "CSE-604A",
    type: "Elective-III/IV",
    branch: "Computer Science & Engineering (CSE)",
    tips: "Draw clean communication protocol stack diagrams. Highlight differences between MQTT and HTTP in terms of packet overhead and battery efficiency.",
  },
  "Elective-IV(Animation & Multimedia)": {
    code: "CSE-604B",
    type: "Elective-IV",
    branch: "Computer Science & Engineering (CSE)",
    tips: "Explain 12 principles of animation with diagrams. Detail steps in JPEG and MPEG compression pipelines.",
  },
};

export const SEM6_PAPERS = {
  2024: {
    "Software Engineering":
      "https://drive.google.com/file/d/12F4sQEPXTlXcYpDqUulD0jpxKZ-OzvYw/view",
    "Industrial Engineering & Management": null,
    "Elective-III(Network Security)":
      "https://drive.google.com/file/d/1ojhkSJp8FiQ2xVG07J2vmB-4bgHIvY2g/view",
    "Elective-III(Cloud Computing)":
      "https://drive.google.com/file/d/1WDC2V4ebepLxnTJGBRj44O22lQ4GU3ny/view",
    "Elective-III/IV(Internet of Things)": null,
    "Elective-IV(Animation & Multimedia)":
      "https://drive.google.com/file/d/12B7hZRqS8RgGN-zDu_qMLfqFdgI8fQkQ/view",
  },
  2023: {
    "Software Engineering": null,
    "Industrial Engineering & Management":
      "https://drive.google.com/file/d/1lvgtWKUu8O_VYYRifSH4vWrXprlbaomh/view",
    "Elective-III(Network Security)": null,
    "Elective-III(Cloud Computing)": null,
    "Elective-III/IV(Internet of Things)": null,
    "Elective-IV(Animation & Multimedia)": null,
  },
  2022: {
    "Software Engineering":
      "https://drive.google.com/file/d/1EH8zRW5Nm9xxhUSC09oK0CVnOG6P653w/view",
    "Industrial Engineering & Management":
      "https://drive.google.com/file/d/1WlIhkGPcqtDjE88rSEEPcQXJUWhInJ1l/view",
    "Elective-III(Network Security)":
      "https://drive.google.com/file/d/15QHOg5MoK0ozhSQel0EC9hVNWIySr1_n/view",
    "Elective-III(Cloud Computing)":
      "https://drive.google.com/file/d/1NBsGsbu1mUjjIsdc2oMM1WmpCRKxKxiZ/view",
    "Elective-III/IV(Internet of Things)":
      "https://drive.google.com/file/d/1gzTu8FUQtQq9lscPqml3DaNaSpCmyeLL/view",
    "Elective-IV(Animation & Multimedia)": null,
  },
  2021: {
    "Software Engineering":
      "https://drive.google.com/file/d/1TwfGpP57QhH9ZpSS9HcmekAoStG_WH_o/view",
    "Industrial Engineering & Management":
      "https://drive.google.com/file/d/1qkT3GNM-yf54meNTAHyK9qcGayeGAqmh/view",
    "Elective-III(Network Security)":
      "https://drive.google.com/file/d/1rEIQuSLC9Uw1NL28EbQsxPVaIERMDheI/view",
    "Elective-III(Cloud Computing)":
      "https://drive.google.com/file/d/1baa7GdZgQOIhRRinh8kapIFI6D_UtZNY/view",
    "Elective-III/IV(Internet of Things)":
      "https://drive.google.com/file/d/1CNB-TM2SsHR3G6ucVy6Kk44HYOaALSSs/view",
    "Elective-IV(Animation & Multimedia)": null,
  },
  2020: {
    "Software Engineering":
      "https://drive.google.com/file/d/15QnhoWuAj6fjcg_K0j17HlkvG_KEr-1F/view",
    "Industrial Engineering & Management":
      "https://drive.google.com/file/d/1JnVxiz55ruZ5UyIfbGqD7n41tjHBc0ZC/view",
    "Elective-III(Network Security)":
      "https://drive.google.com/file/d/1oujyPQ3NGPqF2U4pDQhYw3DJblVi-rul/view",
    "Elective-III(Cloud Computing)":
      "https://drive.google.com/file/d/1H02QrOM6gVW_MYIag_AkobJrsKLeOClc/view",
    "Elective-III/IV(Internet of Things)":
      "https://drive.google.com/file/d/19s5fFWumqOy7qHRHuUHRQDXHuw_rOjeh/view",
    "Elective-IV(Animation & Multimedia)": null,
  },
};

export const getSem6Link = (year, sub) => getPaperLink(SEM6_PAPERS, year, sub);
export const getSem6PreviewLink = (year, sub) => {
  const u = getSem6Link(year, sub);
  return u ? getDrivePreviewUrl(u) : null;
};
export const getSem6DownloadLink = (year, sub) => {
  const u = getSem6Link(year, sub);
  return u ? getDriveDirectDownloadUrl(u) : null;
};

export { slugifySubject };

export const findSubjectBySlug = makeFindSubjectBySlug(SEM6_ALL_SUBJECTS);
