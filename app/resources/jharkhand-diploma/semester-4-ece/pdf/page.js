import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  SEM4_ECE_ALL_SUBJECTS,
  SEM4_ECE_YEARS,
  SEM4_ECE_SUBJECT_DETAILS,
  SEM4_ECE_PAPERS,
} from "@/src/data_Resources/jharkhand/JharDiploma/Sem4EceData";

export const metadata = {
  title: "Jharkhand Diploma 4th Sem ECE PDF Viewer | Question Papers | Futurely",
  description:
    "Read, preview, and download official Jharkhand Polytechnic Diploma 4th Semester Electronics & Communication Engineering (ECE) Previous Year Question Papers online.",
  robots: "noindex, follow",
};

export default function Sem4EcePdfPage() {
  return (
    <PdfViewerLayout
      semesterBadge="JUT Ranchi • Jharkhand Diploma 4th Sem ECE"
      categoryTitle="Jharkhand Diploma 4th Sem ECE"
      allSubjects={SEM4_ECE_ALL_SUBJECTS}
      years={SEM4_ECE_YEARS}
      defaultYear={2025}
      subjectDetails={SEM4_ECE_SUBJECT_DETAILS}
      papers={SEM4_ECE_PAPERS}
      basePath="/resources/jharkhand-diploma/semester-4-ece/pdf"
      readerTitle="Jharkhand Diploma 4th Sem ECE PYQ"
      scanLabel="100% Official JUT Scan"
      examBoard="JUT Ranchi"
      examMarks="70 External + 30 Sessional"
      browseSubjectsTitle="Browse Other 4th Semester ECE Subjects"
    />
  );
}