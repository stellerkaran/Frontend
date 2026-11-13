import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  POLY_YEARS,
  POLY_SUBJECTS,
  POLY_SUBJECT_DETAILS,
  POLY_PAPERS_BY_YEAR,
} from "@/src/data_Resources/bihar/BiharPolytechnic/PolytechnicData";

export const metadata = {
  title: "Bihar Polytechnic (DCECE-PE) Official Question Paper PDF Viewer & Download (2018–2025) | Futurely",
  description:
    "Preview, read, and download official Bihar Polytechnic Entrance Competitive Examination (DCECE-PE 2018–2025) Question Papers PDF online. 90 MCQs covering Physics, Chemistry, and Mathematics for Diploma Engineering admission.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.futurely.in/resources/bihar-polytechnic/pdf",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/resources/bihar-polytechnic/pdf",
    title: "Bihar Polytechnic Official Question Paper PDF Viewer & Download | Futurely",
    description:
      "Read and download official Bihar Polytechnic (DCECE-PE) Previous Year Question Papers (2018–2025) with official BCECEB scans.",
    images: ["https://www.futurely.in/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bihar Polytechnic Official Question Paper PDF Viewer | Futurely",
    description: "Read & download Bihar Polytechnic DCECE-PE question papers 2018–2025 free.",
    images: ["https://www.futurely.in/og-image.png"],
  },
};

const biharPolytechnicBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.futurely.in/" },
    { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.futurely.in/resources" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Bihar Polytechnic Exam",
      item: "https://www.futurely.in/resources/bihar-polytechnic/exam-information",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Polytechnic PDF Viewer",
      item: "https://www.futurely.in/resources/bihar-polytechnic/pdf",
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

export default function BiharPolytechnicPdfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(biharPolytechnicBreadcrumbSchema) }}
      />
      <PdfViewerLayout
        semesterBadge="BCECEB • Bihar Polytechnic DCECE-PE"
        categoryTitle="Bihar Polytechnic"
        allSubjects={POLY_SUBJECTS}
        years={POLY_YEARS}
        defaultYear={2025}
        subjectDetails={POLY_SUBJECT_DETAILS}
        papers={transformPapers(POLY_PAPERS_BY_YEAR)}
        basePath="/resources/bihar-polytechnic/pdf"
        currentSemester={0}
        readerTitle="Bihar Polytechnic PYQ"
        scanLabel="100% Official BCECEB Scan"
        examBoard="BCECEB, Patna"
        examMarks="450 Marks (90 MCQs)"
      />
    </>
  );
}
