import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  POLY_LE_YEARS,
  POLY_LE_SUBJECTS,
  POLY_LE_SUBJECT_DETAILS,
  POLY_LE_ALL_PAPERS_LIST,
} from "@/src/data_Resources/bihar/BiharPolytechnic/PolytechnicLEData";

export const metadata = {
  title: "Bihar Polytechnic Lateral Entry (DECE LE) Official Question Paper PDF Viewer & Download (2021–2025) | Futurely",
  description:
    "Preview, read, and download official Diploma Entrance Competitive Examination Lateral Entry (DECE LE 2021–2025) Question Papers PDF online. 150 MCQs covering Physics, Chemistry, and Mathematics at 10+2 level for Diploma Engineering 2nd year lateral entry admission.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.futurely.in/resources/bihar-polytechnic/lateral-entry/pdf",
  },
  openGraph: {
    type: "website",
    url: "/resources/bihar-polytechnic/lateral-entry/pdf",
    title: "Bihar Polytechnic Lateral Entry Official Question Paper PDF Viewer & Download | Futurely",
    description:
      "Read and download official Bihar Polytechnic Lateral Entry (DECE LE) Previous Year Question Papers (2021–2025) with official BCECEB scans.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bihar Polytechnic Lateral Entry Official Question Paper PDF Viewer | Futurely",
    description: "Read & download Bihar Polytechnic DECE LE question papers 2021–2025 free.",
    images: ["/og-image.png"],
  },
};

const biharPolytechnicLeBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.futurely.in/" },
    { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.futurely.in/resources" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Bihar Polytechnic Lateral Entry Exam",
      item: "https://www.futurely.in/resources/bihar-polytechnic/lateral-entry",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Polytechnic Lateral Entry PDF Viewer",
      item: "/resources/bihar-polytechnic/lateral-entry/pdf",
    },
  ],
};

export default function BiharPolytechnicLateralEntryPdfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(biharPolytechnicLeBreadcrumbSchema) }}
      />
      <PdfViewerLayout
        semesterBadge="BCECEB • Bihar Polytechnic Lateral Entry (DECE LE)"
        categoryTitle="Bihar Polytechnic Lateral Entry"
        allSubjects={POLY_LE_SUBJECTS}
        years={POLY_LE_YEARS}
        defaultYear={2025}
        subjectDetails={POLY_LE_SUBJECT_DETAILS}
        papersList={POLY_LE_ALL_PAPERS_LIST.map((p) => ({
          year: p.year,
          subject: p.subject,
          url: p.driveUrl,
        }))}
        basePath="/resources/bihar-polytechnic/lateral-entry/pdf"
        currentSemester={0}
        readerTitle="Bihar Polytechnic Lateral Entry PYQ"
        scanLabel="100% Official BCECEB Scan"
        examBoard="BCECEB, Patna"
        examMarks="600 Marks (150 MCQs)"
      />
    </>
  );
}
