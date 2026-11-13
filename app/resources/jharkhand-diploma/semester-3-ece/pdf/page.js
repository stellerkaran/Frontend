import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  SEM3_ECE_ALL_SUBJECTS,
  SEM3_ECE_YEARS,
  SEM3_ECE_SUBJECT_DETAILS,
  SEM3_ECE_PAPERS,
} from "@/src/data_Resources/jharkhand/JharDiploma/Sem3EceData";

export const metadata = {
  title: "Jharkhand Diploma 3rd Sem ECE PDF Viewer | Question Papers | Futurely",
  description:
    "Read, preview, and download official Jharkhand Polytechnic Diploma 3rd Semester Electronics & Communication Engineering (ECE) Previous Year Question Papers online.",
  robots: "noindex, follow",
};

export default function Sem3EcePdfPage() {
  return (
    <PdfViewerLayout
      semesterBadge="JUT Ranchi • Jharkhand Diploma 3rd Sem ECE"
      categoryTitle="Jharkhand Diploma 3rd Sem ECE"
      allSubjects={SEM3_ECE_ALL_SUBJECTS}
      years={SEM3_ECE_YEARS}
      defaultYear={2025}
      subjectDetails={SEM3_ECE_SUBJECT_DETAILS}
      papers={SEM3_ECE_PAPERS}
      basePath="/resources/jharkhand-diploma/semester-3-ece/pdf"
      readerTitle="Jharkhand Diploma 3rd Sem ECE PYQ"
      scanLabel="100% Official JUT Scan"
      examBoard="JUT Ranchi"
      examMarks="70 External + 30 Sessional"
      browseSubjectsTitle="Browse Other 3rd Semester ECE Subjects"
    />
  );
}
