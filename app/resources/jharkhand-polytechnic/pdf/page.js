import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  POLY_YEARS,
  POLY_SUBJECTS,
  POLY_SUBJECT_DETAILS,
  POLY_PAPERS_BY_YEAR,
} from "@/src/data_Resources/jharkhand/JharPolytechnic/PolytechnicData";

export const metadata = {
  title: "Jharkhand Polytechnic (PECE) Official Question Paper PDF Viewer & Download (2021–2026) | Futurely",
  description:
    "Preview, read, and download official Jharkhand Polytechnic Entrance Examination (PECE 2021–2026) Question Papers PDF online. 150 MCQs covering Physics, Chemistry, and Mathematics for Diploma Engineering admission.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.futurely.in/resources/jharkhand-polytechnic/pdf",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/resources/jharkhand-polytechnic/pdf",
    title: "Jharkhand Polytechnic Official Question Paper PDF Viewer & Download | Futurely",
    description:
      "Read and download official Jharkhand Polytechnic (PECE) Previous Year Question Papers (2021–2026) with official scans.",
    images: ["https://www.futurely.in/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jharkhand Polytechnic Official Question Paper PDF Viewer | Futurely",
    description: "Read & download Jharkhand Polytechnic PECE question papers 2021–2026 free.",
    images: ["https://www.futurely.in/og-image.png"],
  },
};

const polytechnicBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.futurely.in/" },
    { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.futurely.in/resources" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Jharkhand Polytechnic Exam",
      item: "https://www.futurely.in/resources/jharkhand-polytechnic/exam-information",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Polytechnic PDF Viewer",
      item: "https://www.futurely.in/resources/jharkhand-polytechnic/pdf",
    },
  ],
};

// Transform POLY_PAPERS_BY_YEAR to the flat { year: { subject: url } } shape PdfViewerLayout expects
const transformPapers = (papersByYear) => {
  const result = {};
  for (const [year, paper] of Object.entries(papersByYear)) {
    result[year] = {};
    if (paper.subjectLinks) {
      for (const [subject, url] of Object.entries(paper.subjectLinks)) {
        result[year][subject] = url;
      }
    }
  }
  return result;
};

export default function PolytechnicPdfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(polytechnicBreadcrumbSchema) }}
      />
      <PdfViewerLayout
        semesterBadge="JCECEB • Jharkhand Polytechnic PECE"
        categoryTitle="Jharkhand Polytechnic"
        allSubjects={POLY_SUBJECTS}
        years={POLY_YEARS}
        defaultYear={2026}
        subjectDetails={POLY_SUBJECT_DETAILS}
        papers={transformPapers(POLY_PAPERS_BY_YEAR)}
        basePath="/resources/jharkhand-polytechnic/pdf"
        currentSemester={0}
        readerTitle="Jharkhand Polytechnic PYQ"
        scanLabel="100% Official JCECEB Scan"
        examBoard="JCECEB, Jharkhand"
        examMarks="150 Marks (150 MCQs)"
      />
    </>
  );
}
