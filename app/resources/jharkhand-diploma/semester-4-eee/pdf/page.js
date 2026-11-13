import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  SEM4_EEE_ALL_SUBJECTS,
  SEM4_EEE_YEARS,
  SEM4_EEE_SUBJECT_DETAILS,
  SEM4_EEE_PAPERS,
} from "@/src/data_Resources/jharkhand/JharDiploma/Sem4EeeData";

export const metadata = {
  title: "Jharkhand Diploma 4th Sem EE / EEE PDF Viewer | Question Papers | Futurely",
  description:
    "Read, preview, and download official Jharkhand Polytechnic Diploma 4th Semester Electrical Engineering (EE & EEE) Previous Year Question Papers online.",
  robots: "noindex, follow",
};

export default function Sem4EeePdfPage() {
  return (
    <PdfViewerLayout
      semesterBadge="JUT Ranchi • Jharkhand Diploma 4th Sem EE/EEE"
      categoryTitle="Jharkhand Diploma 4th Sem EE/EEE"
      allSubjects={SEM4_EEE_ALL_SUBJECTS}
      years={SEM4_EEE_YEARS}
      defaultYear={2025}
      subjectDetails={SEM4_EEE_SUBJECT_DETAILS}
      papers={SEM4_EEE_PAPERS}
      basePath="/resources/jharkhand-diploma/semester-4-eee/pdf"
      readerTitle="Jharkhand Diploma 4th Sem EE/EEE PYQ"
      scanLabel="100% Official JUT Scan"
      examBoard="JUT Ranchi"
      examMarks="70 External + 30 Sessional"
      browseSubjectsTitle="Browse Other 4th Semester EE/EEE Subjects"
    />
  );
}