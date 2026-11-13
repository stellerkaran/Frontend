import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  SEM3_ALL_SUBJECTS,
  SEM3_YEARS,
  SEM3_SUBJECT_DETAILS,
  SEM3_PAPERS,
} from "@/src/data_Resources/jharkhand/btech/Sem3Data";

export const metadata = {
  title: "B.Tech 3rd Semester Question Paper PDF Viewer | JUT Ranchi | Futurely",
  description:
    "Interactive continuous PDF reader for Jharkhand B.Tech 3rd Semester (CSE/IT) previous year question papers. Read online, zoom, and download official JUT papers.",
  robots: "noindex, follow",
};

export default function BtechSem3PdfPage() {
  return (
    <PdfViewerLayout
      semesterBadge="JUT Ranchi • Jharkhand B.Tech 3rd Sem (CSE/IT)"
      categoryTitle="Jharkhand B.Tech 3rd Sem (CSE/IT)"
      allSubjects={SEM3_ALL_SUBJECTS}
      years={SEM3_YEARS}
      defaultYear={2025}
      subjectDetails={SEM3_SUBJECT_DETAILS}
      papers={SEM3_PAPERS}
      basePath="/resources/jharkhand-btech/semester-3-cse/pdf"
      currentSemester={3}
      readerTitle="Jharkhand B.Tech 3rd Sem PYQ"
      scanLabel="100% Official JUT Scan"
      examBoard="JUT Ranchi"
      examMarks="70 External + 30 Sessional"
      browseSubjectsTitle="Browse Other 3rd Semester (CSE/IT) Subjects"
    />
  );
}