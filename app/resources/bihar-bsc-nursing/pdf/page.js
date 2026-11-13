import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  NURSING_YEARS,
  NURSING_SUBJECTS,
  NURSING_SUBJECT_DETAILS,
  NURSING_ALL_PAPERS_LIST,
} from "@/src/data_Resources/bihar/BiharBscNursing/BscNursingData";

export const metadata = {
  title: "Bihar B.Sc. Nursing (BCECE PCB) Official Question Paper PDF Viewer & Download (2021–2025) | Futurely",
  description:
    "Preview, read, and download official Bihar B.Sc. Nursing Entrance Competitive Examination (BCECE PCB 2021–2025) Question Papers PDF online. 300 MCQs covering Physics, Chemistry, and Biology for B.Sc. Nursing admission in Bihar.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.futurely.in/resources/bihar-bsc-nursing/pdf",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/resources/bihar-bsc-nursing/pdf",
    title: "Bihar B.Sc. Nursing Official Question Paper PDF Viewer & Download | Futurely",
    description:
      "Read and download official Bihar B.Sc. Nursing (BCECE PCB) Previous Year Question Papers (2021–2025) with official BCECEB scans.",
    images: ["https://www.futurely.in/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bihar B.Sc. Nursing Official Question Paper PDF Viewer | Futurely",
    description: "Read & download Bihar B.Sc. Nursing BCECE question papers 2021–2025 free.",
    images: ["https://www.futurely.in/og-image.png"],
  },
};

const biharBscNursingBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.futurely.in/" },
    { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.futurely.in/resources" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Bihar B.Sc. Nursing Exam",
      item: "https://www.futurely.in/resources/bihar-bsc-nursing/exam-information",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "B.Sc. Nursing PDF Viewer",
      item: "https://www.futurely.in/resources/bihar-bsc-nursing/pdf",
    },
  ],
};

export default function BiharBscNursingPdfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(biharBscNursingBreadcrumbSchema) }}
      />
      <PdfViewerLayout
        semesterBadge="BCECEB • Bihar B.Sc. Nursing (PCB)"
        categoryTitle="Bihar B.Sc. Nursing"
        allSubjects={NURSING_SUBJECTS}
        years={NURSING_YEARS}
        defaultYear={2025}
        subjectDetails={NURSING_SUBJECT_DETAILS}
        papersList={NURSING_ALL_PAPERS_LIST.map((p) => ({
          year: p.year,
          subject: "B.Sc. Nursing Question Paper",
          url: p.driveUrl,
        }))}
        basePath="/resources/bihar-bsc-nursing/pdf"
        currentSemester={0}
        readerTitle="Bihar B.Sc. Nursing PYQ"
        scanLabel="100% Official BCECEB Scan"
        examBoard="BCECEB, Patna"
        examMarks="1200 Marks (300 MCQs)"
        classPrefix="d2d"
      />
    </>
  );
}