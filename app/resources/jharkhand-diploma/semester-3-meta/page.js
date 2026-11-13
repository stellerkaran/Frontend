import Sem3_META from "@/src/data_Resources/jharkhand/JharDiploma/Sem3/Sem3_META";
import { buildFaqSchema, buildCollectionSchema, buildSemesterMetadata } from "../metadata";

const faqData = [
  {
    question: "What subjects are in Jharkhand Diploma 3rd Semester for Metallurgy (META)?",
    answer:
      "Jharkhand Diploma 3rd Semester for Metallurgy Engineering (JUT Ranchi) includes 5 subjects: Machine Tool Technology, Foundry Technology, Iron Making, Non Ferrous Extractive Metallurgy, and Professional Skills. All five are compulsory for Metallurgy students.",
  },
  {
    question: "Which years of 3rd Semester Metallurgy PYQs are available to download?",
    answer:
      "PYQs for Jharkhand Diploma 3rd Semester Metallurgy are currently being uploaded on Futurely. More years (2021–2026) will be added as they become available. Bookmark this page and check back regularly.",
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
    question: "Is Machine Tool Technology only for Metallurgy branch?",
    answer:
      "No. Machine Tool Technology is common to Mechanical and Metallurgy branches, but the full 3rd Semester subject set listed here is specific to the Metallurgy branch. Other branches like CSE, ECE, Civil, and EE have their own respective subject papers.",
  },
  {
    question: "How many marks is each subject?",
    answer:
      "Each subject follows the JUT pattern with both internal and external marks. The external exam is typically 3 hours per paper. Check your official syllabus or institute notice for the exact marks breakdown for the current session.",
  },
  {
    question: "How should I use PYQs to prepare effectively?",
    answer:
      "Download papers from all available years, identify repeated topics and question patterns, then practice solving them within the exam duration. Focus especially on Iron Making and Foundry Technology as they carry significant weightage.",
  },
  {
    question: "Will more years of PYQs be added in the future?",
    answer:
      "Yes. Futurely keeps adding new PYQ PDFs over time. Bookmark this page and check back regularly for 2021–2025 papers when they are uploaded.",
  },
];

const collectionName = "Jharkhand Diploma 3rd Semester Metallurgy PYQ (2021–2026) | META | Futurely";
const collectionDescription = "Official Jharkhand Polytechnic Diploma 3rd Semester Previous Year Question Papers (2021–2026) for Metallurgy branch — Machine Tool Technology, Foundry Technology, Iron Making, Non Ferrous Extractive Metallurgy, and Professional Skills.";

const faqSchema = buildFaqSchema(faqData);
const collectionSchema = buildCollectionSchema({
  slug: "semester-3-meta",
  name: collectionName,
  description: collectionDescription,
});

export const metadata = buildSemesterMetadata({
  slug: "semester-3-meta",
  title: "Jharkhand Diploma 3rd Semester Metallurgy PYQ (2021–2026) | META | Futurely",
  description: "Download Official Jharkhand Polytechnic Diploma 3rd Semester Previous Year Question Papers (2021–2026) for Metallurgy branch. Machine Tool Technology, Foundry Technology, Iron Making and more on Futurely.",
  twitterDescription: "Download free Jharkhand Polytechnic Diploma 3rd Semester Previous Year Question Papers (2021–2026) for Metallurgy branch. Machine Tool Technology, Foundry Technology, Iron Making and more on Futurely.",
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
      <Sem3_META />
    </>
  );
}