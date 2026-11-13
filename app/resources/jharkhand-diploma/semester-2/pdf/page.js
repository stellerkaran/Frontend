import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  SEM2_ALL_SUBJECTS,
  SEM2_YEARS,
  SEM2_SUBJECT_DETAILS,
  SEM2_PAPERS,
} from "@/src/data_Resources/jharkhand/JharDiploma/Sem2Data";

export const metadata = {
  title: "Jharkhand Diploma 2nd Semester PDF Viewer & Download | JUT Ranchi | Futurely",
  description:
    "Preview and read official Jharkhand Diploma 2nd Semester PYQ PDFs online before downloading. Project Management Skill, Statistics & Analytics, Electrical & Electronic Engg, Environmental Sustainability and Branch Papers.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.futurely.in/resources/jharkhand-diploma/semester-2/pdf",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/resources/jharkhand-diploma/semester-2/pdf",
    title: "Jharkhand Diploma 2nd Semester PDF Viewer & Download | Futurely",
    description:
      "Read and download Jharkhand Polytechnic Diploma 2nd Semester Previous Year Question Papers (JUT Ranchi).",
    images: ["https://www.futurely.in/og-image.png"],
  },
};

export default function Sem2PdfPage() {
  return (
    <PdfViewerLayout
      semesterBadge="JUT Ranchi • Jharkhand Diploma 2nd Sem"
      categoryTitle="Jharkhand Diploma 2nd Sem"
      allSubjects={SEM2_ALL_SUBJECTS}
      years={SEM2_YEARS}
      defaultYear={2025}
      subjectDetails={SEM2_SUBJECT_DETAILS}
      papers={SEM2_PAPERS}
      basePath="/resources/jharkhand-diploma/semester-2/pdf"
      readerTitle="Jharkhand Diploma 2nd Sem PYQ"
      scanLabel="100% Official JUT Scan"
      examBoard="JUT Ranchi"
      examMarks="70 External + 30 Sessional"
      browseSubjectsTitle="Browse Other 2nd Semester Subjects"
    />
  );
}
