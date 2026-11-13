import Sem3_CIVIL from "@/src/data_Resources/jharkhand/JharDiploma/Sem3/Sem3_CIVIL";
import { buildFaqSchema, buildCollectionSchema, buildSemesterMetadata } from "../metadata";

const faqData = [
  {
    question: "What subjects are in Jharkhand Diploma 3rd Semester for Civil Engineering?",
    answer:
      "Jharkhand Diploma 3rd Semester for Civil Engineering (CE) at JUT Ranchi includes 5 subjects: Engineering Mechanics and Strength of Materials, Building Drawing using CAD, Modern Surveying, Construction Techniques, and Professional Skills. All five are compulsory for Civil students.",
  },
  {
    question: "Which years of 3rd Semester Civil PYQs are available to download?",
    answer:
      "PYQs for Jharkhand Diploma 3rd Semester Civil Engineering are currently being uploaded on Futurely. More years (2021–2026) will be added as they become available. Bookmark this page and check back regularly.",
  },
  {
    question: "Are these PYQ PDFs free to download?",
    answer:
      "Yes, 100% free. No login or payment is needed. Just click the Download PDF button next to any subject and the PDF opens directly from the linked source.",
  },
  {
    question: "Who conducts the Jharkhand Diploma 3rd Semester exam?",
    answer:
      "Jharkhand Diploma semester exams are conducted by JUT Ranchi (Jharkhand University of Technology). All polytechnic colleges affiliated with JUT Ranchi follow the same syllabus and question paper pattern.",
  },
  {
    question: "Is Building Drawing using CAD only for Civil branch?",
    answer:
      "Yes. Building Drawing using CAD and the other 3rd Semester subjects listed here are specific to the Civil branch. Other branches like CSE, ECE, Mechanical, and EE have their own respective subject papers.",
  },
  {
    question: "How many marks is each subject?",
    answer:
      "Each subject follows the JUT pattern with both internal and external marks. The external exam is typically 3 hours per paper. Check your official syllabus or institute notice for the exact marks breakdown for the current session.",
  },
  {
    question: "How should I use PYQs to prepare effectively?",
    answer:
      "Download papers from all available years, identify repeated topics and question patterns, then practice solving them within the exam duration. Focus especially on Engineering Mechanics and Strength of Materials and Modern Surveying as they carry significant weightage.",
  },
  {
    question: "Will more years of PYQs be added in the future?",
    answer:
      "Yes. Futurely keeps adding new PYQ PDFs over time. Bookmark this page and check back regularly for 2021–2025 papers when they are uploaded.",
  },
];

const collectionName = "Jharkhand Diploma 3rd Semester Civil Engineering PYQ (2021–2026) | CE | Futurely";
const collectionDescription = "Official Jharkhand Polytechnic Diploma 3rd Semester Previous Year Question Papers (2021–2026) for Civil Engineering branch — Engineering Mechanics and Strength of Materials, Building Drawing using CAD, Modern Surveying, Construction Techniques, and Professional Skills.";

const faqSchema = buildFaqSchema(faqData);
const collectionSchema = buildCollectionSchema({
  slug: "semester-3-civil",
  name: collectionName,
  description: collectionDescription,
});

export const metadata = buildSemesterMetadata({
  slug: "semester-3-civil",
  title: "Jharkhand Diploma 3rd Semester Civil Engineering PYQ (2021–2026) | CE | Futurely",
  description: "Download Official Jharkhand Polytechnic Diploma 3rd Semester Previous Year Question Papers (2021–2026) for Civil Engineering branch. Engineering Mechanics and Strength of Materials, Building Drawing using CAD, Modern Surveying and more on Futurely.",
  ogDescription: "Download Official Jharkhand Polytechnic Diploma 3rd Semester Previous Year Question Papers (2021–2026) for Civil Engineering branch. Engineering Mechanics and Strength of Materials, Building Drawing using CAD, Modern Surveying, Construction Techniques and more on Futurely.",
  twitterDescription: "Download free Jharkhand Polytechnic Diploma 3rd Semester Previous Year Question Papers (2021–2026) for Civil Engineering branch. Engineering Mechanics and Strength of Materials, Building Drawing using CAD, Modern Surveying and more on Futurely.",
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
      <Sem3_CIVIL />
    </>
  );
}