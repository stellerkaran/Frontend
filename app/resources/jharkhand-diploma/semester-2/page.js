import Sem2 from "@/src/data_Resources/jharkhand/JharDiploma/Sem2";
import { buildFaqSchema, buildCollectionSchema, buildSemesterMetadata } from "../metadata";

const faqData = [
  {
    question: "What subjects are in Jharkhand Diploma 2nd Semester?",
    answer:
      "Jharkhand Diploma 2nd Semester (JUT Ranchi) has 4 core subjects: Project Management Skill, Statistics and Analytics, Fundamental of Electrical & Electronic Engineering, and Environmental Sustainability — plus one branch-specific paper: Python Programming (CSE), Construction Material (Civil/Architecture/Interior Design), or Transformer and Alternators (Electrical Engg & EEE).",
  },
  {
    question: "Which years of 2nd Semester PYQs are available to download?",
    answer:
      "PYQs for Jharkhand Diploma 2nd Semester are currently available for 2021, 2022, 2023, 2024, and 2025. More years and missing subjects are being uploaded regularly on Futurely.",
  },
  {
    question: "Are these PYQ PDFs free to download?",
    answer:
      "Yes, 100% free. No login or payment needed. Just click the Download PDF button next to any subject and the PDF opens directly from Google Drive.",
  },
  {
    question: "Who conducts the Jharkhand Diploma 2nd Semester exam?",
    answer:
      "Jharkhand Diploma semester exams are conducted by JUT Ranchi (Jharkhand University of Technology). All polytechnic colleges affiliated with JUT Ranchi follow the same syllabus and question paper pattern.",
  },
  {
    question: "Are branch-specific PYQs also available for 2nd Semester?",
    answer:
      "Yes. Branch papers are available for CSE (Python Programming), Civil/Architecture/Interior Design (Construction Material), and Electrical Engineering & EEE (Transformer and Alternators), alongside the 4 common subjects.",
  },
  {
    question: "How many marks is the 2nd Semester exam?",
    answer:
      "Each subject in Jharkhand Diploma 2nd Semester is of 100 marks total — 30 marks internal (sessional) and 70 marks external (JUT Ranchi paper). The minimum passing marks for the external exam is 28 out of 70.",
  },
  {
    question: "How should I use PYQs to prepare for 2nd Semester effectively?",
    answer:
      "Download papers from all available years, identify repeated topics and question patterns, then practice solving them within 3 hours (exam duration). For Statistics focus on mean/median/mode and probability; for Electrical & Electronics focus on Ohm's law, transformers, and basic circuits; for Project Management focus on planning tools like CPM and PERT.",
  },
  {
    question: "Will more years of PYQs be added in the future?",
    answer:
      "Yes. Futurely regularly uploads new PYQ PDFs. Papers marked as 'Uploading Soon' will be added shortly. Bookmark this page and check back regularly for updates.",
  },
];

const collectionName = "Jharkhand Diploma 2nd Semester PYQ (2021–2026) | JUT Ranchi | Futurely";
const collectionDescription = "Official Jharkhand Polytechnic Diploma 2nd Semester Previous Year Question Papers (2021–2026) — Project Management Skill, Statistics & Analytics, Fundamental of Electrical & Electronic Engg, Environmental Sustainability and branch-specific PDFs from JUT Ranchi.";

const faqSchema = buildFaqSchema(faqData);
const collectionSchema = buildCollectionSchema({
  slug: "semester-2",
  name: collectionName,
  description: collectionDescription,
});

export const metadata = buildSemesterMetadata({
  slug: "semester-2",
  title: "Jharkhand Diploma 2nd Semester PYQ (2021–2026) | JUT Ranchi | Futurely",
  description: "Download Official Jharkhand Polytechnic Diploma 2nd Semester Previous Year Question Papers (2021–2026). Project Management Skill, Statistics & Analytics, Electrical & Electronic Engg, Environmental Sustainability & branch-specific PDFs from JUT Ranchi. 100% free on Futurely.",
  twitterDescription: "Download free Jharkhand Polytechnic Diploma 2nd Semester Previous Year Question Papers (2021–2026). Project Management Skill, Statistics & Analytics, Electrical & Electronic Engg, Environmental Sustainability & branch-specific PDFs from JUT Ranchi. 100% free on Futurely.",
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Sem2 />
    </>
  );
}