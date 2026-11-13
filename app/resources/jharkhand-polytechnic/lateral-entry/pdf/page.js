import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  POLY_LE_YEARS,
  POLY_LE_SUBJECTS,
  POLY_LE_SUBJECT_DETAILS,
  POLY_LE_PAPERS_BY_YEAR,
} from "@/src/data_Resources/jharkhand/JharPolytechnic/PolytechnicLEData";

export const metadata = {
  title: "Jharkhand Polytechnic Lateral Entry (DECE LE) Question Paper PDF Viewer & Download (2021–2026) | Futurely",
  description:
    "Preview, read, and download official Jharkhand Polytechnic Lateral Entry (DECE LE 2021–2026) Question Papers PDF online. 100 MCQs covering Mathematics and Science for direct 2nd year Diploma Engineering admission.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.futurely.in/resources/jharkhand-polytechnic/lateral-entry/pdf",
  },
  openGraph: {
    type: "website",
    url: "/resources/jharkhand-polytechnic/lateral-entry/pdf",
    title: "Jharkhand Polytechnic Lateral Entry Question Paper PDF Viewer & Download | Futurely",
    description:
      "Read and download official Jharkhand Polytechnic Lateral Entry (DECE LE) Previous Year Question Papers (2021–2026) with official scans.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jharkhand Polytechnic Lateral Entry Question Paper PDF Viewer | Futurely",
    description: "Read & download Jharkhand Polytechnic DECE LE question papers 2021–2026 free.",
    images: ["/og-image.png"],
  },
};

const polytechnicLEBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "/" },
    { "@type": "ListItem", position: 2, name: "Resources", item: "/resources" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Jharkhand Polytechnic Lateral Entry",
      item: "/resources/jharkhand-polytechnic/lateral-entry",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Lateral Entry PDF Viewer",
      item: "/resources/jharkhand-polytechnic/lateral-entry/pdf",
    },
  ],
};

// Transform POLY_LE_PAPERS_BY_YEAR to the flat { year: { subject: url } } shape PdfViewerLayout expects
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

export default function PolytechnicLEPdfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(polytechnicLEBreadcrumbSchema) }}
      />
      <PdfViewerLayout
        semesterBadge="JCECEB • Jharkhand Polytechnic (Lateral Entry)  DECE LE"
        categoryTitle="Jharkhand Polytechnic Lateral Entry"
        allSubjects={POLY_LE_SUBJECTS}
        years={POLY_LE_YEARS}
        defaultYear={2026}
        subjectDetails={POLY_LE_SUBJECT_DETAILS}
        papers={transformPapers(POLY_LE_PAPERS_BY_YEAR)}
        basePath="/resources/jharkhand-polytechnic/lateral-entry/pdf"
        currentSemester={0}
        readerTitle="Jharkhand Polytechnic Lateral Entry PYQ"
        scanLabel="100% Official JCECEB Scan"
        examBoard="JCECEB, Jharkhand"
        examMarks="100 Marks (100 MCQs)"
      />
    </>
  );
}
