import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  PARAMEDICAL_YEARS,
  PARAMEDICAL_SUBJECTS,
  PARAMEDICAL_SUBJECT_DETAILS,
  PARAMEDICAL_LINKS,
} from "@/src/data_Resources/jharkhand/JharPara/ParamedicalData";

export const metadata = {
  title: "Jharkhand Paramedical Official Question Paper PDF Viewer & Download (2021–2025) | Futurely",
  description:
    "Preview, read, and download official Jharkhand Paramedical Entrance (PMECE) Question Papers PDF online. 150 MCQs for Pharmacy (D.Pharm), Para-Medical Diploma & Certificate courses by JCECEB Ranchi.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.futurely.in/resources/jharkhand-paramedical/pdf",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/resources/jharkhand-paramedical/pdf",
    title: "Jharkhand Paramedical Official Question Paper PDF Viewer & Download | Futurely",
    description:
      "Read and download official Jharkhand Paramedical (PMECE) Previous Year Question Papers with high-resolution scans.",
    images: ["https://www.futurely.in/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jharkhand Paramedical Official Question Paper PDF Viewer | Futurely",
    description: "Read & download Jharkhand Paramedical (PMECE) entrance exam question papers free.",
    images: ["https://www.futurely.in/og-image.png"],
  },
};

const paramedicalBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.futurely.in/" },
    { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.futurely.in/resources" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Jharkhand Paramedical",
      item: "https://www.futurely.in/resources/jharkhand-paramedical/exam-information",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Paramedical PDF Viewer",
      item: "https://www.futurely.in/resources/jharkhand-paramedical/pdf",
    },
  ],
};

export default function ParamedicalPdfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(paramedicalBreadcrumbSchema) }}
      />
      <PdfViewerLayout
        semesterBadge="JCECEB • Jharkhand Paramedical PMECE"
        categoryTitle="Jharkhand Paramedical (PMECE)"
        allSubjects={PARAMEDICAL_SUBJECTS}
        years={PARAMEDICAL_YEARS}
        defaultYear={2025}
        subjectDetails={PARAMEDICAL_SUBJECT_DETAILS}
        papers={PARAMEDICAL_LINKS}
        basePath="/resources/jharkhand-paramedical/pdf"
        currentSemester={0}
        readerTitle="Jharkhand Paramedical PYQ Reader"
        scanLabel="100% Official JCECEB Scan"
        examBoard="JCECEB, Jharkhand"
        examMarks="150 Marks (150 MCQs)"
      />
    </>
  );
}