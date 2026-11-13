import React from "react";
import ResourcesClient from "./ResourcesClient";

const faqData = [
  {
    question: "What study materials are available on Futurely for Jharkhand students?",
    answer: "Futurely provides Jharkhand Diploma Semester PYQs (1st to 6th Semester), Jharkhand B.Tech Semester PYQs (1st to 8th Semester), Jharkhand Polytechnic PYQ (2021–2025), and Jharkhand D2D PYQ (2021–2025). All materials are free, mobile-friendly, and regularly updated.",
  },
  {
    question: "Are the study materials on Futurely free to download?",
    answer: "Yes, all study materials on Futurely — including Previous Year Question Papers, semester PYQs, and exam guides — are 100% free to access and download. No subscription or payment is required.",
  },
  {
    question: "What B.Tech semester PYQs are available on Futurely?",
    answer: "Futurely covers all 8 semesters of Jharkhand B.Tech courses — from 1st Semester to 8th Semester — with Previous Year Question Papers organised by subject for easy access and preparation.",
  },
  {
    question: "How can I download Jharkhand Polytechnic PYQ papers?",
    answer: "Navigate to the 'Jharkhand Polytechnic PYQ' section on this page, click to expand it, and select 'Download All Papers (2021–2025)'. You will be taken to a dedicated page with all available question papers.",
  },
  {
    question: "What is the Jharkhand D2D exam and what papers are available?",
    answer: "Jharkhand D2D (Diploma to Degree) is a JCECEB lateral-entry exam for diploma holders seeking direct B.Tech 2nd-year admission. Futurely provides solved D2D PYQs from 2021 to 2025 covering Physics, Chemistry, and Mathematics.",
  },
  {
    question: "Which semesters of Jharkhand Diploma PYQ are available?",
    answer: "Futurely covers all 6 semesters of the Jharkhand Diploma course — from 1st Semester to 6th Semester — with Previous Year Question Papers organised by subject for easy access.",
  },
  {
    question: "How often is the content updated on Futurely?",
    answer: "Futurely regularly adds new exam papers, updated solutions, and exam-related information as soon as official results or new papers are released by JCECEB and other state boards.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "en-IN",
  mainEntity: faqData.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.futurely.in/" },
    { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.futurely.in/resources" },
  ],
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  inLanguage: "en-IN",
  name: "Jharkhand Study Resources - Syllabus, Notes & PYQs | Futurely",
  description: "Free Jharkhand Diploma Semester PYQs (1st–6th Sem), B.Tech Semester PYQs (1st–8th Sem), Jharkhand Polytechnic PYQ and D2D PYQ (2021–2025). Organised, mobile-friendly, regularly updated.",
  url: "https://www.futurely.in/resources",
  publisher: { "@type": "Organization", name: "Futurely", url: "https://www.futurely.in" },
};

export const metadata = {
  title: "Jharkhand Study Resources - Syllabus, Notes & PYQs | Futurely",
  description: "Download free Jharkhand Diploma Semester PYQs (1st–6th Sem), B.Tech Semester PYQs (1st–8th Sem), Jharkhand Polytechnic PYQ and D2D PYQ (2021–2025). Organised by subject, mobile-friendly and updated regularly on Futurely.",
  alternates: {
    canonical: "https://www.futurely.in/resources",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/resources",
    title: "Jharkhand Study Resources - Syllabus, Notes & PYQs | Futurely",
    description: "Free Jharkhand Diploma, B.Tech, Polytechnic & D2D PYQs (2021–2025). All semesters covered. Mobile-friendly & updated.",
    images: [{ url: "https://www.futurely.in/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jharkhand Study Resources - Syllabus, Notes & PYQs | Futurely",
    description: "Free JCECEB solved papers for Diploma (1st–6th Sem), B.Tech (1st–8th Sem), Polytechnic & D2D 2026. Download on Futurely.",
    images: ["https://www.futurely.in/og-image.png"],
  },
};

export default function ResourcesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <ResourcesClient />
    </>
  );
}
