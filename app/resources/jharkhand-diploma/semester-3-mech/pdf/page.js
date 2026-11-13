import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  SEM3_MECH_ALL_SUBJECTS,
  SEM3_MECH_YEARS,
  SEM3_MECH_SUBJECT_DETAILS,
  SEM3_MECH_PAPERS,
} from "@/src/data_Resources/jharkhand/JharDiploma/Sem3MechData";

export const metadata = {
  title: "Jharkhand Diploma 3rd Sem Mechanical PDF Viewer | Question Papers | Futurely",
  description:
    "Read, preview, and download official Jharkhand Polytechnic Diploma 3rd Semester Mechanical Engineering (ME) Previous Year Question Papers online.",
  robots: "noindex, follow",
};

export default function Sem3MechPdfPage() {
  return (
    <PdfViewerLayout
      semesterBadge="JUT Ranchi • Jharkhand Diploma 3rd Sem Mechanical"
      categoryTitle="Jharkhand Diploma 3rd Sem Mechanical"
      allSubjects={SEM3_MECH_ALL_SUBJECTS}
      years={SEM3_MECH_YEARS}
      defaultYear={2025}
      subjectDetails={SEM3_MECH_SUBJECT_DETAILS}
      papers={SEM3_MECH_PAPERS}
      basePath="/resources/jharkhand-diploma/semester-3-mech/pdf"
      readerTitle="Jharkhand Diploma 3rd Sem Mechanical PYQ"
      scanLabel="100% Official JUT Scan"
      examBoard="JUT Ranchi"
      examMarks="70 External + 30 Sessional"
      browseSubjectsTitle="Browse Other 3rd Semester Mechanical Subjects"
    />
  );
}