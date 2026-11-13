import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  SEM4_CSE_ALL_SUBJECTS,
  SEM4_CSE_YEARS,
  SEM4_CSE_SUBJECT_DETAILS,
  SEM4_CSE_PAPERS,
} from "@/src/data_Resources/jharkhand/JharDiploma/Sem4CseData";

export const metadata = {
  title: "Jharkhand Diploma 4th Sem CSE PDF | Question Papers | Futurely",
  description:
    "Read, preview, and download official Jharkhand Polytechnic Diploma 4th Semester Computer Science Engineering (CSE) Previous Year Question Papers online.",
  robots: "noindex, follow",
};

export default function Sem4CsePdfPage() {
  return (
    <PdfViewerLayout
      semesterBadge="JUT Ranchi • Jharkhand Diploma 4th Sem CSE"
      categoryTitle="Jharkhand Diploma 4th Sem CSE"
      allSubjects={SEM4_CSE_ALL_SUBJECTS}
      years={SEM4_CSE_YEARS}
      defaultYear={2025}
      subjectDetails={SEM4_CSE_SUBJECT_DETAILS}
      papers={SEM4_CSE_PAPERS}
      basePath="/resources/jharkhand-diploma/semester-4-cse/pdf"
      readerTitle="Jharkhand Diploma 4th Sem CSE PYQ"
      scanLabel="100% Official JUT Scan"
      examBoard="JUT Ranchi"
      examMarks="70 External + 30 Sessional"
      browseSubjectsTitle="Browse Other 4th Semester CSE Subjects"
    />
  );
}