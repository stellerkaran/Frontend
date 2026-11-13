import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  AGRI_YEARS,
  AGRI_SUBJECTS,
  AGRI_SUBJECT_DETAILS,
  AGRI_LINKS,
} from "@/src/data_Resources/jharkhand/JharAgriculture/AgricultureData";

export const metadata = {
  title: "Jharkhand Agriculture (JCECE) Official Question Paper PDF Viewer & Download (2022–2025) | Futurely",
  description:
    "Preview, read, and download official Jharkhand JCECE Agriculture & Allied Courses Entrance Exam Question Papers PDF online. Covers PCM, PCB, and PCMB subject groups for B.Sc (Hons) Agriculture, B.V.Sc & A.H., and allied colleges under BAU Ranchi.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.futurely.in/resources/jharkhand-agriculture/exam-information/pdf",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/resources/jharkhand-agriculture/exam-information/pdf",
    title: "Jharkhand Agriculture (JCECE) Official Question Paper PDF Viewer & Download | Futurely",
    description:
      "Read and download official Jharkhand Agriculture Entrance Question Papers with high-resolution multi-page scans.",
    images: ["https://www.futurely.in/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jharkhand Agriculture Official Question Paper PDF Viewer | Futurely",
    description: "Read & download Jharkhand Agriculture JCECE entrance exam question papers free.",
    images: ["https://www.futurely.in/og-image.png"],
  },
};

const agriBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.futurely.in/" },
    { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.futurely.in/resources" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Jharkhand Agriculture",
      item: "https://www.futurely.in/resources/jharkhand-agriculture/exam-information",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Agriculture PDF Viewer",
      item: "https://www.futurely.in/resources/jharkhand-agriculture/exam-information/pdf",
    },
  ],
};

export default function AgriPdfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(agriBreadcrumbSchema) }}
      />
      <PdfViewerLayout
        semesterBadge="JCECEB • Jharkhand JCECE Agriculture & Allied Courses"
        categoryTitle="Jharkhand Agriculture"
        allSubjects={AGRI_SUBJECTS}
        years={AGRI_YEARS}
        defaultYear={2025}
        subjectDetails={AGRI_SUBJECT_DETAILS}
        papers={AGRI_LINKS}
        basePath="/resources/jharkhand-agriculture/exam-information/pdf"
        currentSemester={0}
        readerTitle="Jharkhand JCECE Agriculture PYQ"
        scanLabel="100% Official JCECEB Scan"
        examBoard="JCECEB, Jharkhand"
        examMarks="150–200 Marks"
        classPrefix="agri"
      />
    </>
  );
}
