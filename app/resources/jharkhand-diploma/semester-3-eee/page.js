import Sem3_EEE from "@/src/data_Resources/jharkhand/JharDiploma/Sem3/Sem3_EEE";
import { buildFaqSchema, buildCollectionSchema, buildSemesterMetadata } from "../metadata";

const faqData = [
  {
    question: "What subjects are in Jharkhand Diploma 3rd Semester for EE/EEE?",
    answer:
      "Jharkhand Diploma 3rd Semester for Electrical Engineering (EE) and Electrical and Electronics Engineering (EEE) at JUT Ranchi includes 5 subjects: Basic of Electrical Power System, Transmission and Distribution, Switchgear and Protection, Analog and Digital Electronics, and Professional Skills. All five are compulsory for EE and EEE students.",
  },
  {
    question: "Is this page for EE branch or EEE branch?",
    answer:
      "This page covers both Electrical Engineering (EE) and Electrical and Electronics Engineering (EEE) branches. Both branches follow the same 3rd Semester syllabus and question papers under JUT Ranchi.",
  },
  {
    question: "Which years of 3rd Semester EE/EEE PYQs are available to download?",
    answer:
      "Previous Year Question Papers for Jharkhand Diploma 3rd Semester EE/EEE are currently being uploaded on Futurely. More years (2021–2026) will be added as they become available. Bookmark this page and check back regularly.",
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
    question: "How many marks is each subject?",
    answer:
      "Each subject follows the JUT Ranchi pattern with both internal and external marks. The external exam is typically 3 hours per paper. Check your official syllabus or institute notice for the exact marks breakdown for the current session.",
  },
  {
    question: "How should I use PYQs to prepare effectively?",
    answer:
      "Download papers from all available years, identify repeated topics and question patterns, then practice solving them within the exam duration. Focus especially on Basic of Electrical Power System and Switchgear and Protection as they carry significant weightage.",
  },
  {
    question: "Will more years of PYQs be added in the future?",
    answer:
      "Yes. Futurely keeps adding new Previous Year Question Paper PDFs over time. Bookmark this page and check back regularly for 2021–2025 papers when they are uploaded.",
  },
];

const collectionName = "Jharkhand Diploma 3rd Semester Electrical PYQ (2021–2026) | EE / EEE | Futurely";
const collectionDescription = "Official Jharkhand Polytechnic Diploma 3rd Semester Previous Year Question Papers (2021–2026) for Electrical Engineering (EE) and Electrical and Electronics Engineering (EEE) branches — Basic of Electrical Power System, Transmission and Distribution, Switchgear and Protection, Analog and Digital Electronics, and Professional Skills.";

const faqSchema = buildFaqSchema(faqData);
const collectionSchema = buildCollectionSchema({
  slug: "semester-3-eee",
  name: collectionName,
  description: collectionDescription,
});

export const metadata = buildSemesterMetadata({
  slug: "semester-3-eee",
  title: "Jharkhand Diploma 3rd Semester Electrical PYQ (2021–2026) | EE / EEE | Futurely",
  description: "Download Official Jharkhand Polytechnic Diploma 3rd Semester Previous Year Question Papers (2021–2026) for EE and EEE branches. Basic of Electrical Power System, Transmission and Distribution, Switchgear and Protection, Analog and Digital Electronics and more on Futurely.",
  twitterDescription: "Download free Jharkhand Polytechnic Diploma 3rd Semester Previous Year Question Papers (2021–2026) for EE and EEE branches. Basic of Electrical Power System, Transmission and Distribution, Switchgear and Protection, Analog and Digital Electronics and more on Futurely.",
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
      <Sem3_EEE />
    </>
  );
}