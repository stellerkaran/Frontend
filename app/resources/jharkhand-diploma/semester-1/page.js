import Sem1 from "@/src/data_Resources/jharkhand/JharDiploma/Sem1";
import { buildFaqSchema, buildCollectionSchema, buildSemesterMetadata } from "../metadata";

const faqData = [
  {
    question: "What subjects are in Jharkhand Diploma 1st Semester?",
    answer:
      "Jharkhand Diploma 1st Semester (JUT Ranchi) has 4 core subjects: Engineering Physics, Engineering Chemistry, Engineering Mathematics, plus one branch-specific paper — Mechanical Science & Engineering (Mech/Meta/Auto), Basics of Electrical Power System (EE), Fundamental of Computer (CSE), Electronic Component & Device (ECE), or Basic Surveying (Civil).",
  },
  {
    question: "Which years of 1st Semester PYQs are available to download?",
    answer:
      "PYQs for Jharkhand Diploma 1st Semester are currently available for 2021, 2022, 2023, 2024, and 2025. More years and missing subjects are being uploaded regularly on Futurely.",
  },
  {
    question: "Are these PYQ PDFs free to download?",
    answer:
      "Yes, 100% free. No login or payment needed. Just click the Download PDF button next to any subject and the PDF opens directly from Google Drive.",
  },
  {
    question: "Who conducts the Jharkhand Diploma 1st Semester exam?",
    answer:
      "Jharkhand Diploma semester exams are conducted by JUT Ranchi (Jharkhand University of Technology). All polytechnic colleges affiliated with JUT Ranchi follow the same syllabus and question paper pattern.",
  },
  {
    question: "Are branch-specific PYQs also available?",
    answer:
      "Yes. For 2025, branch papers are available for Civil, CSE, Mech/Meta/Auto, Electrical, and Electronics & Communication Engineering alongside the 3 common subjects.",
  },
  {
    question: "How many marks is the 1st Semester exam?",
    answer:
      "Each subject in Jharkhand Diploma 1st Semester is of 100 marks total — 30 marks internal (sessional) and 70 marks external (JUT Ranchi paper). The minimum passing marks for the external exam is 28 out of 70.",
  },
  {
    question: "How should I use PYQs to prepare effectively?",
    answer:
      "Download papers from all available years, identify repeated topics and question patterns, then practice solving them within 3 hours (exam duration). Focus especially on derivations in Physics, reactions in Chemistry, and integration/differentiation in Mathematics.",
  },
  {
    question: "Will more years of PYQs be added in the future?",
    answer:
      "Yes. Futurely regularly uploads new PYQ PDFs. Papers marked as 'Uploading Soon' will be added shortly. Bookmark this page and check back regularly for updates.",
  },
];

const collectionName = "Jharkhand Diploma 1st Semester PYQ (2021–2026) | JUT Ranchi | Futurely";
const collectionDescription = "Official Jharkhand Polytechnic Diploma 1st Semester Previous Year Question Papers (2021–2026) — Engineering Physics, Chemistry, Mathematics and branch-specific PDFs from JUT Ranchi.";

const faqSchema = buildFaqSchema(faqData);
const collectionSchema = buildCollectionSchema({
  slug: "semester-1",
  name: collectionName,
  description: collectionDescription,
});

export const metadata = buildSemesterMetadata({
  slug: "semester-1",
  title: "Jharkhand Diploma 1st Semester PYQ (2021–2026) | JUT Ranchi | Futurely",
  description: "Download Official Jharkhand Polytechnic Diploma 1st Semester Previous Year Question Papers (2021–2026). Engineering Physics, Chemistry, Mathematics & branch-specific PDFs from JUT Ranchi. 100% free on Futurely.",
  twitterDescription: "Download free Jharkhand Polytechnic Diploma 1st Semester Previous Year Question Papers (2021–2026). Engineering Physics, Chemistry, Mathematics & branch-specific PDFs from JUT Ranchi. 100% free on Futurely.",
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
      <Sem1 />
    </>
  );
}