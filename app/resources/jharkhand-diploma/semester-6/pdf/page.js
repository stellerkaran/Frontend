import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  SEM6_ALL_SUBJECTS,
  SEM6_YEARS,
  SEM6_SUBJECT_DETAILS,
  SEM6_PAPERS,
} from "@/src/data_Resources/jharkhand/JharDiploma/Sem6Data";

export const metadata = {
  title: "Jharkhand Diploma 6th Sem CSE PDF Viewer | Question Papers | Futurely",
  description:
    "Read, preview, and download official Jharkhand Polytechnic Diploma 6th Semester Computer Science & Engineering (CSE) Previous Year Question Papers online.",
  robots: "noindex, follow",
};

export default function Sem6PdfPage() {
  return (
    <PdfViewerLayout
      semesterBadge="JUT Ranchi • Jharkhand Diploma 6th Sem CSE"
      categoryTitle="Jharkhand Diploma 6th Sem CSE"
      allSubjects={SEM6_ALL_SUBJECTS}
      years={SEM6_YEARS}
      defaultYear={2024}
      subjectDetails={SEM6_SUBJECT_DETAILS}
      papers={SEM6_PAPERS}
      basePath="/resources/jharkhand-diploma/semester-6/pdf"
      readerTitle="Jharkhand Diploma 6th Sem CSE PYQ"
      scanLabel="100% Official JUT Scan"
      examBoard="JUT Ranchi"
      examMarks="70 External + 30 Sessional"
      browseSubjectsTitle="Browse Other 6th Semester CSE Subjects"
    />
  );
}
