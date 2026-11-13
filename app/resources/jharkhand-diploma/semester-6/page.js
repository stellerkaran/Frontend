import Sem6 from "@/src/data_Resources/jharkhand/JharDiploma/Sem6";
import { buildFaqSchema, buildCollectionSchema, buildSemesterMetadata } from "../metadata";

const faqData = [
  {
    question: "What subjects are in Jharkhand Diploma 6th Semester for CSE?",
    answer:
      "Jharkhand Diploma 6th Semester for CSE (JUT Ranchi) includes core papers: Software Engineering, Industrial Engineering & Management, and elective papers — Network Security (Elective III/IV), Cloud Computing (Elective III), Internet of Things (Elective III/IV), and Animation & Multimedia (Elective IV). Students should follow the latest JUT syllabus and exam programme for exact paper codes.",
  },
  {
    question: "Which years of 6th Semester PYQs are available to download?",
    answer:
      "PYQs for Jharkhand Diploma 6th Semester CSE are currently arranged year-wise from 2021 to 2025. More years and missing subjects will be added on Futurely regularly.",
  },
  {
    question: "Are these PYQ PDFs free to download?",
    answer:
      "Yes, 100% free. No login or payment is needed. Just click the Download PDF button next to any subject and the PDF opens directly from the linked source.",
  },
  {
    question: "Who conducts the Jharkhand Diploma 6th Semester exam?",
    answer:
      "Jharkhand Diploma semester exams are conducted by JUT Ranchi (Jharkhand University of Technology). All polytechnic colleges affiliated with JUT Ranchi follow the same syllabus and question paper pattern.",
  },
  {
    question: "What are Elective III and Elective IV in 6th Semester CSE?",
    answer:
      "In 6th Semester CSE (JUT Ranchi), Elective III options include Network Security and Cloud Computing, while Elective IV options include Network Security, Internet of Things, and Animation & Multimedia. Students choose one paper from each elective group as per their college offering.",
  },
  {
    question: "How many marks is each subject in 6th Semester?",
    answer:
      "Each subject is usually treated as a full paper with internal and external marks as per the JUT pattern. Check your official syllabus or notice for the final marks scheme of the current session.",
  },
  {
    question: "How should I use PYQs to prepare for 6th Semester effectively?",
    answer:
      "Download papers from all available years, identify repeated topics and question patterns, then practice solving them within the exam duration. Focus especially on Software Engineering, Industrial Engineering & Management, and your chosen elective subjects.",
  },
  {
    question: "Will more years of 6th Semester PYQs be added in the future?",
    answer:
      "Yes. Futurely keeps adding new PYQ PDFs over time. Bookmark this page and check back regularly for updates.",
  },
];

const collectionName = "Jharkhand Diploma 6th Semester PYQ (2021–2026) | CSE | Futurely";
const collectionDescription = "Official Jharkhand Polytechnic Diploma 6th Semester Previous Year Question Papers (2021–2026) for CSE branch — Software Engineering, Industrial Engineering & Management, Network Security, Cloud Computing, IoT, and Animation & Multimedia.";

const faqSchema = buildFaqSchema(faqData);
const collectionSchema = buildCollectionSchema({
  slug: "semester-6",
  name: collectionName,
  description: collectionDescription,
});

export const metadata = buildSemesterMetadata({
  slug: "semester-6",
  title: "Jharkhand Diploma 6th Semester PYQ (2021–2026) | CSE | Futurely",
  description: "Download Official Jharkhand Polytechnic Diploma 6th Semester Previous Year Question Papers (2021–2026) for CSE branch. Software Engineering, Industrial Engineering, Network Security, Cloud Computing, IoT, Animation & Multimedia on Futurely.",
  twitterDescription: "Download free Jharkhand Polytechnic Diploma 6th Semester Previous Year Question Papers (2021–2026) for CSE branch. Software Engineering, Industrial Engineering, Network Security, Cloud Computing, IoT, Animation & Multimedia on Futurely.",
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
      <Sem6 />
    </>
  );
}