import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  SEM3_CSE_ALL_SUBJECTS,
  SEM3_CSE_YEARS,
  SEM3_CSE_SUBJECT_DETAILS,
  SEM3_CSE_PAPERS,
} from "@/src/data_Resources/jharkhand/JharDiploma/Sem3CseData";

export const metadata = {
  title: "Jharkhand Diploma 3rd Sem CSE PDF Viewer | Question Papers | Futurely",
  description:
    "Read, preview, and download official Jharkhand Polytechnic Diploma 3rd Semester Computer Science Engineering (CSE) Previous Year Question Papers online.",
  robots: "noindex, follow",
};

export default function Sem3CsePdfPage() {
  return (
    <PdfViewerLayout
      semesterBadge="JUT Ranchi • Jharkhand Diploma 3rd Sem CSE"
      categoryTitle="Jharkhand Diploma 3rd Sem CSE"
      allSubjects={SEM3_CSE_ALL_SUBJECTS}
      years={SEM3_CSE_YEARS}
      defaultYear={2025}
      subjectDetails={SEM3_CSE_SUBJECT_DETAILS}
      papers={SEM3_CSE_PAPERS}
      basePath="/resources/jharkhand-diploma/semester-3-cse/pdf"
      readerTitle="Jharkhand Diploma 3rd Sem CSE PYQ"
      scanLabel="100% Official JUT Scan"
      examBoard="JUT Ranchi"
      examMarks="70 External + 30 Sessional"
      browseSubjectsTitle="Browse Other 3rd Semester CSE Subjects"
    />
  );
}