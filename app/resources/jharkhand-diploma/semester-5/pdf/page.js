import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  SEM5_ALL_SUBJECTS,
  SEM5_YEARS,
  SEM5_SUBJECT_DETAILS,
  SEM5_PAPERS,
} from "@/src/data_Resources/jharkhand/JharDiploma/Sem5Data";

export const metadata = {
  title: "Jharkhand Diploma 5th Sem CSE PDF Viewer | Question Papers | Futurely",
  description:
    "Read, preview, and download official Jharkhand Polytechnic Diploma 5th Semester Computer Science & Engineering (CSE) Previous Year Question Papers online.",
  robots: "noindex, follow",
};

export default function Sem5PdfPage() {
  return (
    <PdfViewerLayout
      semesterBadge="JUT Ranchi • Jharkhand Diploma 5th Sem CSE"
      categoryTitle="Jharkhand Diploma 5th Sem CSE"
      allSubjects={SEM5_ALL_SUBJECTS}
      years={SEM5_YEARS}
      defaultYear={2024}
      subjectDetails={SEM5_SUBJECT_DETAILS}
      papers={SEM5_PAPERS}
      basePath="/resources/jharkhand-diploma/semester-5/pdf"
      readerTitle="Jharkhand Diploma 5th Sem CSE PYQ"
      scanLabel="100% Official JUT Scan"
      examBoard="JUT Ranchi"
      examMarks="70 External + 30 Sessional"
      browseSubjectsTitle="Browse Other 5th Semester CSE Subjects"
    />
  );
}
