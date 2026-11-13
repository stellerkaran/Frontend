import Sem3_CSE from "@/src/data_Resources/jharkhand/JharDiploma/Sem3/Sem3_CSE";
import { buildFaqSchema, buildCollectionSchema, buildSemesterMetadata } from "../metadata";

const faqData = [
  {
    question: "What subjects are in Jharkhand Diploma 3rd Semester for CSE?",
    answer:
      "Jharkhand Diploma 3rd Semester for CSE (JUT Ranchi) includes 5 subjects: Advanced Python Programming, Computer Hardware Maintenance and Administration, Computer Networks, Database System Concepts and PL/SQL, and Professional Skills. All five are compulsory for CSE students.",
  },
  {
    question: "Which years of 3rd Semester CSE PYQs are available to download?",
    answer:
      "PYQs for Jharkhand Diploma 3rd Semester CSE are currently being uploaded on Futurely. More years (2021–2026) will be added as they become available. Bookmark this page and check back regularly.",
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
    question: "Is Advanced Python Programming only for CSE branch?",
    answer:
      "Yes. Advanced Python Programming and the other 3rd Semester subjects listed here are specific to the CSE branch. Other branches like ECE, Mechanical, Civil, and EE have their own respective subject papers.",
  },
  {
    question: "How many marks is each subject?",
    answer:
      "Each subject follows the JUT pattern with both internal and external marks. The external exam is typically 3 hours per paper. Check your official syllabus or institute notice for the exact marks breakdown for the current session.",
  },
  {
    question: "How should I use PYQs to prepare effectively?",
    answer:
      "Download papers from all available years, identify repeated topics and question patterns, then practice solving them within the exam duration. Focus especially on Advanced Python Programming and Database System Concepts and PL/SQL as they carry significant weightage.",
  },
  {
    question: "Will more years of PYQs be added in the future?",
    answer:
      "Yes. Futurely keeps adding new PYQ PDFs over time. Bookmark this page and check back regularly for 2021–2025 papers when they are uploaded.",
  },
];

const collectionName = "Jharkhand Diploma 3rd Semester Computer Science PYQ (2021–2026) | CSE | Futurely";
const collectionDescription = "Official Jharkhand Polytechnic Diploma 3rd Semester Previous Year Question Papers (2021–2026) for CSE branch — Advanced Python Programming, Computer Hardware Maintenance and Administration, Computer Networks, Database System Concepts and PL/SQL, and Professional Skills.";

const faqSchema = buildFaqSchema(faqData);
const collectionSchema = buildCollectionSchema({
  slug: "semester-3-cse",
  name: collectionName,
  description: collectionDescription,
});

export const metadata = buildSemesterMetadata({
  slug: "semester-3-cse",
  title: "Jharkhand Diploma 3rd Semester Computer Science PYQ (2021–2026) | CSE | Futurely",
  description: "Download Official Jharkhand Polytechnic Diploma 3rd Semester Previous Year Question Papers (2021–2026) for CSE branch. Advanced Python Programming, Computer Networks, Database System Concepts and PL/SQL and more on Futurely.",
  twitterDescription: "Download free Jharkhand Polytechnic Diploma 3rd Semester Previous Year Question Papers (2021–2026) for CSE branch. Advanced Python Programming, Computer Networks, Database System Concepts and PL/SQL and more on Futurely.",
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
      <Sem3_CSE />
    </>
  );
}