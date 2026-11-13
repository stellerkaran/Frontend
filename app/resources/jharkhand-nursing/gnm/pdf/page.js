import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  GNM_YEARS,
  GNM_SUBJECTS,
  GNM_SUBJECT_DETAILS,
  GNM_LINKS,
} from "@/src/data_Resources/jharkhand/JharNursing/GNMData";

export const metadata = {
  title: "Jharkhand GNM Official Question Paper PDF Viewer & Download (2021–2025) | Futurely",
  description:
    "Preview, read, and download official Jharkhand Nursing Entrance (NECE) GNM Question Papers PDF online. 150 MCQs covering Biology, Physics, Chemistry, Mathematics, and English for General Nursing and Midwifery admission.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.futurely.in/resources/jharkhand-nursing/gnm/pdf",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/resources/jharkhand-nursing/gnm/pdf",
    title: "Jharkhand GNM Official Question Paper PDF Viewer & Download | Futurely",
    description:
      "Read and download official Jharkhand Nursing Entrance (NECE) GNM Previous Year Question Papers with official scans.",
    images: ["https://www.futurely.in/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jharkhand GNM Official Question Paper PDF Viewer | Futurely",
    description: "Read & download Jharkhand GNM entrance exam question papers free.",
    images: ["https://www.futurely.in/og-image.png"],
  },
};

const gnmBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.futurely.in/" },
    { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.futurely.in/resources" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Jharkhand GNM Nursing",
      item: "https://www.futurely.in/resources/jharkhand-nursing/gnm",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "GNM PDF Viewer",
      item: "https://www.futurely.in/resources/jharkhand-nursing/gnm/pdf",
    },
  ],
};

export default function GNMPdfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gnmBreadcrumbSchema) }}
      />
      <PdfViewerLayout
        semesterBadge="JCECEB • Jharkhand GNM Nursing Entrance (NECE)"
        categoryTitle="Jharkhand GNM Nursing"
        allSubjects={GNM_SUBJECTS}
        years={GNM_YEARS}
        defaultYear={2025}
        subjectDetails={GNM_SUBJECT_DETAILS}
        papers={GNM_LINKS}
        basePath="/resources/jharkhand-nursing/gnm/pdf"
        currentSemester={0}
        readerTitle="Jharkhand GNM Nursing PYQ"
        scanLabel="100% Official JCECEB Scan"
        examBoard="JCECEB, Jharkhand"
        examMarks="150 Marks (150 MCQs)"
        classPrefix="gnm"
      />
    </>
  );
}
