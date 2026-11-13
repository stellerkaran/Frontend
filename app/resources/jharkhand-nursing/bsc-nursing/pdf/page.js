import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  BSC_NURSING_YEARS,
  BSC_NURSING_SUBJECTS,
  BSC_NURSING_SUBJECT_DETAILS,
  BSC_NURSING_LINKS,
} from "@/src/data_Resources/jharkhand/JharNursing/BscNursingData";

export const metadata = {
  title: "Jharkhand B.Sc Nursing Official Question Paper PDF Viewer & Download (2019–2024) | Futurely",
  description:
    "Preview, read, and download official Jharkhand B.Sc Nursing (Basic 4-Year Degree) Entrance Exam Question Papers PDF online. 150 MCQs covering Biology, Physics, and Chemistry for Government & Private Nursing Colleges.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.futurely.in/resources/jharkhand-nursing/bsc-nursing/pdf",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/resources/jharkhand-nursing/bsc-nursing/pdf",
    title: "Jharkhand B.Sc Nursing Official Question Paper PDF Viewer & Download | Futurely",
    description:
      "Read and download official Jharkhand B.Sc Nursing Previous Year Question Papers with high-resolution scans.",
    images: ["https://www.futurely.in/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jharkhand B.Sc Nursing Official Question Paper PDF Viewer | Futurely",
    description: "Read & download Jharkhand B.Sc Nursing entrance exam question papers free.",
    images: ["https://www.futurely.in/og-image.png"],
  },
};

const bscNursingBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.futurely.in/" },
    { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.futurely.in/resources" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Jharkhand B.Sc Nursing",
      item: "https://www.futurely.in/resources/jharkhand-nursing/bsc-nursing",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "B.Sc Nursing PDF Viewer",
      item: "https://www.futurely.in/resources/jharkhand-nursing/bsc-nursing/pdf",
    },
  ],
};

export default function BscNursingPdfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bscNursingBreadcrumbSchema) }}
      />
      <PdfViewerLayout
        semesterBadge="JCECEB • Jharkhand B.Sc Nursing Entrance"
        categoryTitle="Jharkhand B.Sc Nursing"
        allSubjects={BSC_NURSING_SUBJECTS}
        years={BSC_NURSING_YEARS}
        defaultYear={2025}
        subjectDetails={BSC_NURSING_SUBJECT_DETAILS}
        papers={BSC_NURSING_LINKS}
        basePath="/resources/jharkhand-nursing/bsc-nursing/pdf"
        currentSemester={0}
        readerTitle="Jharkhand B.Sc Nursing PYQ"
        scanLabel="100% Official JCECEB Scan"
        examBoard="JCECEB, Jharkhand"
        examMarks="150 Marks (150 MCQs)"
        classPrefix="bscn"
      />
    </>
  );
}
