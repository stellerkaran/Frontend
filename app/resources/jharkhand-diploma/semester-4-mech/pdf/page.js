import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  SEM4_MECH_ALL_SUBJECTS,
  SEM4_MECH_YEARS,
  SEM4_MECH_SUBJECT_DETAILS,
  SEM4_MECH_PAPERS,
} from "@/src/data_Resources/jharkhand/JharDiploma/Sem4MechData";

export const metadata = {
  title: "Jharkhand Diploma 4th Sem Mechanical PDF Viewer | Question Papers | Futurely",
  description:
    "Read, preview, and download official Jharkhand Polytechnic Diploma 4th Semester Mechanical Engineering (ME) Previous Year Question Papers online.",
  robots: "noindex, follow",
};

export default function Sem4MechPdfPage() {
  return (
    <PdfViewerLayout
      semesterBadge="JUT Ranchi • Jharkhand Diploma 4th Sem Mechanical"
      categoryTitle="Jharkhand Diploma 4th Sem Mechanical"
      allSubjects={SEM4_MECH_ALL_SUBJECTS}
      years={SEM4_MECH_YEARS}
      defaultYear={2025}
      subjectDetails={SEM4_MECH_SUBJECT_DETAILS}
      papers={SEM4_MECH_PAPERS}
      basePath="/resources/jharkhand-diploma/semester-4-mech/pdf"
      readerTitle="Jharkhand Diploma 4th Sem Mechanical PYQ"
      scanLabel="100% Official JUT Scan"
      examBoard="JUT Ranchi"
      examMarks="70 External + 30 Sessional"
      browseSubjectsTitle="Browse Other 4th Semester Mechanical Subjects"
    />
  );
}