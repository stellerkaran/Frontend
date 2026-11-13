import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  SEM1_ALL_SUBJECTS,
  SEM1_YEARS,
  SEM1_SUBJECT_DETAILS,
  SEM1_PAPERS,
} from "@/src/data_Resources/jharkhand/JharDiploma/Sem1Data";

export const metadata = {
  title: "Jharkhand Diploma 1st Semester PDF Viewer & Download | JUT Ranchi | Futurely",
  description:
    "Preview and read official Jharkhand Diploma 1st Semester PYQ PDFs online before downloading. Engineering Mathematics, Engineering Physics, Engineering Chemistry, Fundamental of Computer, Mechanical Science, Electrical, Electronics, and Civil Surveying.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.futurely.in/resources/jharkhand-diploma/semester-1/pdf",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/resources/jharkhand-diploma/semester-1/pdf",
    title: "Jharkhand Diploma 1st Semester PDF Viewer & Download | Futurely",
    description:
      "Read and download Jharkhand Polytechnic Diploma 1st Semester Previous Year Question Papers (JUT Ranchi).",
    images: ["https://www.futurely.in/og-image.png"],
  },
};

export default function Sem1PdfPage() {
  return (
    <PdfViewerLayout
      semesterBadge="JUT Ranchi • Jharkhand Diploma 1st Sem"
      categoryTitle="Jharkhand Diploma 1st Sem"
      allSubjects={SEM1_ALL_SUBJECTS}
      years={SEM1_YEARS}
      defaultYear={2025}
      subjectDetails={SEM1_SUBJECT_DETAILS}
      papers={SEM1_PAPERS}
      basePath="/resources/jharkhand-diploma/semester-1/pdf"
      readerTitle="Jharkhand Diploma 1st Sem PYQ"
      scanLabel="100% Official JUT Scan"
      examBoard="JUT Ranchi"
      examMarks="70 External + 30 Sessional"
      browseSubjectsTitle="Browse Other 1st Semester Subjects"
    />
  );
}
