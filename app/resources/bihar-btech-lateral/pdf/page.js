import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  LE_YEARS,
  LE_SUBJECTS,
  LE_SUBJECT_DETAILS,
  LE_ALL_PAPERS_LIST,
} from "@/src/data_Resources/bihar/BiharBtechLateral/BtechLateralData";

export const metadata = {
  title: "Bihar B.Tech Lateral Entry (BCECE LE) Official Question Paper PDF Viewer & Download (2021–2025) | Futurely",
  description:
    "Preview, read, and download official BCECE Lateral Entry (BCECE LE 2021–2025) Previous Year Question Papers PDF online. 150 MCQs covering Engineering Mathematics, Engineering Mechanics and Technical English for Lateral Entry B.Tech admission.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.futurely.in/resources/bihar-btech-lateral/pdf",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/resources/bihar-btech-lateral/pdf",
    title: "Bihar B.Tech Lateral Entry Official Question Paper PDF Viewer & Download | Futurely",
    description:
      "Read and download official BCECE LE Previous Year Question Papers (2021–2025) with full official BCECEB scans.",
    images: ["https://www.futurely.in/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bihar B.Tech Lateral Entry Official Question Paper PDF Viewer | Futurely",
    description: "Read & download Bihar B.Tech Lateral Entry (BCECE LE) question papers 2021–2025 free.",
    images: ["https://www.futurely.in/og-image.png"],
  },
};

const btechLateralBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.futurely.in/" },
    { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.futurely.in/resources" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Bihar B.Tech Lateral Exam",
      item: "https://www.futurely.in/resources/bihar-btech-lateral/exam-information",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "B.Tech Lateral PDF Viewer",
      item: "https://www.futurely.in/resources/bihar-btech-lateral/pdf",
    },
  ],
};

export default function BiharBtechLateralPdfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(btechLateralBreadcrumbSchema) }}
      />
      <PdfViewerLayout
        semesterBadge="BCECEB • Bihar B.Tech Lateral Entry (BCECE LE)"
        categoryTitle="Bihar B.Tech Lateral"
        allSubjects={LE_SUBJECTS}
        years={LE_YEARS}
        defaultYear={2025}
        subjectDetails={LE_SUBJECT_DETAILS}
        papersList={LE_ALL_PAPERS_LIST.map((p) => ({
          year: p.year,
          subject: "BCECE LE Question Paper",
          url: p.driveUrl,
        }))}
        basePath="/resources/bihar-btech-lateral/pdf"
        currentSemester={0}
        readerTitle="Bihar B.Tech Lateral Entry PYQ"
        scanLabel="100% Official BCECEB Scan"
        examBoard="BCECEB, Patna"
        examMarks="600 Marks (150 MCQs)"
        classPrefix="d2d"
      />
    </>
  );
}
