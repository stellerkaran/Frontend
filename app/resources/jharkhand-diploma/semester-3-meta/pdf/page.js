import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  SEM3_META_ALL_SUBJECTS,
  SEM3_META_YEARS,
  SEM3_META_SUBJECT_DETAILS,
  SEM3_META_PAPERS,
} from "@/src/data_Resources/jharkhand/JharDiploma/Sem3MetaData";

export const metadata = {
  title: "Jharkhand Diploma 3rd Sem Metallurgy PDF Viewer | Question Papers | Futurely",
  description:
    "Read, preview, and download official Jharkhand Polytechnic Diploma 3rd Semester Metallurgy Engineering (META) Previous Year Question Papers online.",
  robots: "noindex, follow",
};

export default function Sem3MetaPdfPage() {
  return (
    <PdfViewerLayout
      semesterBadge="JUT Ranchi • Jharkhand Diploma 3rd Sem Metallurgy"
      categoryTitle="Jharkhand Diploma 3rd Sem Metallurgy"
      allSubjects={SEM3_META_ALL_SUBJECTS}
      years={SEM3_META_YEARS}
      defaultYear={2025}
      subjectDetails={SEM3_META_SUBJECT_DETAILS}
      papers={SEM3_META_PAPERS}
      basePath="/resources/jharkhand-diploma/semester-3-meta/pdf"
      readerTitle="Jharkhand Diploma 3rd Sem Metallurgy PYQ"
      scanLabel="100% Official JUT Scan"
      examBoard="JUT Ranchi"
      examMarks="70 External + 30 Sessional"
      browseSubjectsTitle="Browse Other 3rd Semester Metallurgy Subjects"
    />
  );
}