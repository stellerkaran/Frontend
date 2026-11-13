import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  ANM_YEARS,
  ANM_SUBJECTS,
  ANM_SUBJECT_DETAILS,
  ANM_LINKS,
} from "@/src/data_Resources/jharkhand/JharNursing/ANMData";

export const metadata = {
  title: "Jharkhand ANM Official Question Paper PDF Viewer & Download (2021–2025) | Futurely",
  description:
    "Preview, read, and download official Jharkhand Nursing Entrance (NECE) ANM Question Papers PDF online. 100 MCQs covering General Science, Mathematics, and General Knowledge for Auxiliary Nurse Midwifery admission.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.futurely.in/resources/jharkhand-nursing/anm/pdf",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/resources/jharkhand-nursing/anm/pdf",
    title: "Jharkhand ANM Official Question Paper PDF Viewer & Download | Futurely",
    description:
      "Read and download official Jharkhand Nursing Entrance (NECE) ANM Previous Year Question Papers with official scans.",
    images: ["https://www.futurely.in/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jharkhand ANM Official Question Paper PDF Viewer | Futurely",
    description: "Read & download Jharkhand ANM entrance exam question papers free.",
    images: ["https://www.futurely.in/og-image.png"],
  },
};

const anmBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.futurely.in/" },
    { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.futurely.in/resources" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Jharkhand ANM Nursing",
      item: "https://www.futurely.in/resources/jharkhand-nursing/anm",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "ANM PDF Viewer",
      item: "https://www.futurely.in/resources/jharkhand-nursing/anm/pdf",
    },
  ],
};

export default function ANMPdfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(anmBreadcrumbSchema) }}
      />
      <PdfViewerLayout
        semesterBadge="JCECEB • Jharkhand ANM Nursing Entrance (NECE)"
        categoryTitle="Jharkhand ANM Nursing"
        allSubjects={ANM_SUBJECTS}
        years={ANM_YEARS}
        defaultYear={2025}
        subjectDetails={ANM_SUBJECT_DETAILS}
        papers={ANM_LINKS}
        basePath="/resources/jharkhand-nursing/anm/pdf"
        currentSemester={0}
        readerTitle="Jharkhand ANM Nursing PYQ"
        scanLabel="100% Official JCECEB Scan"
        examBoard="JCECEB, Jharkhand"
        examMarks="100 Marks (100 MCQs)"
        classPrefix="anm"
      />
    </>
  );
}
