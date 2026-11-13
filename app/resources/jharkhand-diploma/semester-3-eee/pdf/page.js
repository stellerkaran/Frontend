import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  SEM3_EEE_ALL_SUBJECTS,
  SEM3_EEE_YEARS,
  SEM3_EEE_SUBJECT_DETAILS,
  SEM3_EEE_PAPERS,
} from "@/src/data_Resources/jharkhand/JharDiploma/Sem3EeeData";

export const metadata = {
  title: "Jharkhand Diploma 3rd Sem EE / EEE PDF Viewer | Question Papers | Futurely",
  description:
    "Read, preview, and download official Jharkhand Polytechnic Diploma 3rd Semester Electrical Engineering (EE & EEE) Previous Year Question Papers online.",
  robots: "noindex, follow",
};

export default function Sem3EeePdfPage() {
  return (
    <PdfViewerLayout
      semesterBadge="JUT Ranchi • Jharkhand Diploma 3rd Sem EE/EEE"
      categoryTitle="Jharkhand Diploma 3rd Sem EE/EEE"
      allSubjects={SEM3_EEE_ALL_SUBJECTS}
      years={SEM3_EEE_YEARS}
      defaultYear={2025}
      subjectDetails={SEM3_EEE_SUBJECT_DETAILS}
      papers={SEM3_EEE_PAPERS}
      basePath="/resources/jharkhand-diploma/semester-3-eee/pdf"
      readerTitle="Jharkhand Diploma 3rd Sem EE/EEE PYQ"
      scanLabel="100% Official JUT Scan"
      examBoard="JUT Ranchi"
      examMarks="70 External + 30 Sessional"
      browseSubjectsTitle="Browse Other 3rd Semester EE/EEE Subjects"
    />
  );
}
