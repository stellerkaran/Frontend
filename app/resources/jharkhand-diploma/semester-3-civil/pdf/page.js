import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  SEM3_CIVIL_ALL_SUBJECTS,
  SEM3_CIVIL_YEARS,
  SEM3_CIVIL_SUBJECT_DETAILS,
  SEM3_CIVIL_PAPERS,
} from "@/src/data_Resources/jharkhand/JharDiploma/Sem3CivilData";

export const metadata = {
  title: "Jharkhand Diploma 3rd Sem Civil Engineering PDF Viewer | Question Papers | Futurely",
  description:
    "Read, preview, and download official Jharkhand Polytechnic Diploma 3rd Semester Civil Engineering (CE) Previous Year Question Papers online.",
  robots: "noindex, follow",
};

export default function Sem3CivilPdfPage() {
  return (
    <PdfViewerLayout
      semesterBadge="JUT Ranchi • Jharkhand Diploma 3rd Sem Civil Engineering"
      categoryTitle="Jharkhand Diploma 3rd Sem Civil Engineering"
      allSubjects={SEM3_CIVIL_ALL_SUBJECTS}
      years={SEM3_CIVIL_YEARS}
      defaultYear={2025}
      subjectDetails={SEM3_CIVIL_SUBJECT_DETAILS}
      papers={SEM3_CIVIL_PAPERS}
      basePath="/resources/jharkhand-diploma/semester-3-civil/pdf"
      readerTitle="Jharkhand Diploma 3rd Sem Civil Engineering PYQ"
      scanLabel="100% Official JUT Scan"
      examBoard="JUT Ranchi"
      examMarks="70 External + 30 Sessional"
      browseSubjectsTitle="Browse Other 3rd Semester Civil Engineering Subjects"
    />
  );
}