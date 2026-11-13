import React from "react";
import HaryanaLeetClient from "./HaryanaLeetClient";
import { faqs } from "@/src/data_Resources/haryana/HaryanaLeetData";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Haryana LEET (OCET-2026) Lateral Entry B.Tech Preparation",
  description:
    "Free Haryana LEET 2026 preparation with full syllabus, eligibility criteria, exam pattern, important dates and online MCQ practice on Futurely.",
  provider: {
    "@type": "Organization",
    name: "Futurely",
    sameAs: "https://www.futurely.in",
  },
  url: "https://www.futurely.in/resources/haryana-leet-info",
  educationalLevel: "Undergraduate",
  inLanguage: ["en", "hi"],
  isAccessibleForFree: true,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.futurely.in" },
    { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.futurely.in/resources" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Haryana LEET Exam 2026",
      item: "https://www.futurely.in/resources/haryana-leet-info",
    },
  ],
};

export const metadata = {
  title: "Haryana LEET Exam 2026 – Syllabus, Eligibility, Dates & Online Practice | Futurely",
  description:
    "Haryana LEET (OCET) 2026 complete guide: official eligibility, 4-section syllabus, exam pattern (90Q/90M/90min, no negative marking), important dates, counselling schedule, and online MCQ practice — all free on Futurely.",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.futurely.in/resources/haryana-leet-info",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/resources/haryana-leet-info",
    title: "Haryana LEET Exam 2026 – Syllabus, Dates & Online Practice | Futurely",
    description:
      "Complete guide for Haryana LEET 2026: eligibility, full 4-section syllabus, exam pattern (90 MCQs, no negative marking), important dates, counselling schedule. Practice MCQs online free.",
    images: ["https://www.futurely.in/og-image-hl.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Haryana LEET 2026 – Full Guide & Online Practice | Futurely",
    description:
      "Eligibility, 4-section syllabus, important dates, counselling schedule — complete Haryana LEET 2026 guide + free online MCQ practice.",
    images: ["https://www.futurely.in/og-image-hl.png"],
  },
};

export default function HaryanaLeetInfoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HaryanaLeetClient />
    </>
  );
}
