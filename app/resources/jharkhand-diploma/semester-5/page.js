import Sem5 from "@/src/data_Resources/jharkhand/JharDiploma/Sem5";
import { buildFaqSchema, buildCollectionSchema, buildSemesterMetadata } from "../metadata";

const faqData = [
  {
    question: "What subjects are in Jharkhand Diploma 5th Semester for CSE?",
    answer:
      "Jharkhand Diploma 5th Semester for CSE (JUT Ranchi) includes key branch papers such as Microprocessors & Microcontrollers, Java Programming, Computer Graphics, and the elective papers are Mobile Computing and E-Commerce prescribed for the semester. Students should follow the latest JUT syllabus and exam programme for the exact paper codes.",
  },
  {
    question: "Which years of 5th Semester PYQs are available to download?",
    answer:
      "PYQs for Jharkhand Diploma 5th Semester CSE are currently arranged year-wise from 2021 to 2025. More years and missing subjects can be added later on Futurely.",
  },
  {
    question: "Are these PYQ PDFs free to download?",
    answer:
      "Yes, 100% free. No login or payment is needed. Just click the Download PDF button next to any subject and the PDF opens directly from the linked source.",
  },
  {
    question: "Who conducts the Jharkhand Diploma 5th Semester exam?",
    answer:
      "Jharkhand Diploma semester exams are conducted by JUT Ranchi (Jharkhand University of Technology). All polytechnic colleges affiliated with JUT Ranchi follow the same syllabus and question paper pattern.",
  },
  {
    question: "Are CSE branch papers also included?",
    answer:
      "Yes. This page is prepared for the CSE branch and includes the CSE 5th-semester paper set that is commonly asked in the JUT exam programme.",
  },
  {
    question: "How many marks is each subject?",
    answer:
      "Each subject is usually treated as a full paper with internal and external marks as per the JUT pattern. Check your official syllabus or notice for the final marks scheme of the current session.",
  },
  {
    question: "How should I use PYQs to prepare effectively?",
    answer:
      "Download papers from all available years, identify repeated topics and question patterns, then practice solving them within the exam duration. Focus especially on Java, Computer Graphics, Microprocessors, and the elective papers.",
  },
  {
    question: "Will more years of PYQs be added in the future?",
    answer:
      "Yes. Futurely can keep adding new PYQ PDFs over time. Bookmark this page and check back regularly for updates.",
  },
];

const collectionName = "Jharkhand Diploma 5th Semester PYQ (2021–2026) | CSE | Futurely";
const collectionDescription = "Official Jharkhand Polytechnic Diploma 5th Semester Previous Year Question Papers (2021–2026) for CSE branch — Microprocessors, Java Programming, Computer Graphics, and elective papers.";

const faqSchema = buildFaqSchema(faqData);
const collectionSchema = buildCollectionSchema({
  slug: "semester-5",
  name: collectionName,
  description: collectionDescription,
});

export const metadata = buildSemesterMetadata({
  slug: "semester-5",
  title: "Jharkhand Diploma 5th Semester PYQ (2021–2026) | CSE | Futurely",
  description: "Download Official Jharkhand Polytechnic Diploma 5th Semester Previous Year Question Papers (2021–2026) for CSE branch. Microprocessors, Java Programming, Computer Graphics and elective papers on Futurely.",
  twitterDescription: "Download free Jharkhand Polytechnic Diploma 5th Semester Previous Year Question Papers (2021–2026) for CSE branch. Microprocessors, Java Programming, Computer Graphics and elective papers on Futurely.",
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
      <Sem5 />
    </>
  );
}