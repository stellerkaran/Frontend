import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  SEM4_CIVIL_ALL_SUBJECTS,
  SEM4_CIVIL_YEARS,
  SEM4_CIVIL_SUBJECT_DETAILS,
  SEM4_CIVIL_PAPERS,
} from "@/src/data_Resources/jharkhand/JharDiploma/Sem4CivilData";

export const metadata = {
  title: "Jharkhand Diploma 4th Sem Civil Engineering PDF Viewer | Question Papers | Futurely",
  description:
    "Read, preview, and download official Jharkhand Polytechnic Diploma 4th Semester Civil Engineering (CE) Previous Year Question Papers online.",
  robots: "noindex, follow",
};

export default function Sem4CivilPdfPage() {
  return (
    <PdfViewerLayout
      semesterBadge="JUT Ranchi • Jharkhand Diploma 4th Sem Civil Engineering"
      categoryTitle="Jharkhand Diploma 4th Sem Civil Engineering"
      allSubjects={SEM4_CIVIL_ALL_SUBJECTS}
      years={SEM4_CIVIL_YEARS}
      defaultYear={2025}
      subjectDetails={SEM4_CIVIL_SUBJECT_DETAILS}
      papers={SEM4_CIVIL_PAPERS}
      basePath="/resources/jharkhand-diploma/semester-4-civil/pdf"
      readerTitle="Jharkhand Diploma 4th Sem Civil Engineering PYQ"
      scanLabel="100% Official JUT Scan"
      examBoard="JUT Ranchi"
      examMarks="70 External + 30 Sessional"
      browseSubjectsTitle="Browse Other 4th Semester Civil Engineering Subjects"
    />
  );
}
