import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  SEM1_ALL_SUBJECTS,
  SEM1_YEARS,
  SEM1_SUBJECT_DETAILS,
  SEM1_PAPERS,
} from "@/src/data_Resources/jharkhand/btech/Sem1Data";

export const metadata = {
  title: "B.Tech 1st Semester Question Paper PDF Viewer | JUT Ranchi | Futurely",
  description:
    "Interactive continuous PDF reader for Jharkhand B.Tech 1st Semester previous year question papers. Read online, zoom, and download official JUT papers.",
  robots: "noindex, follow",
};

export default function BtechSem1PdfPage() {
  return (
    <PdfViewerLayout
      semesterBadge="JUT Ranchi • Jharkhand B.Tech 1st Sem"
      categoryTitle="Jharkhand B.Tech 1st Sem"
      allSubjects={SEM1_ALL_SUBJECTS}
      years={SEM1_YEARS}
      defaultYear={2024}
      subjectDetails={SEM1_SUBJECT_DETAILS}
      papers={SEM1_PAPERS}
      basePath="/resources/jharkhand-btech/semester-1/pdf"
      currentSemester={1}
      readerTitle="Jharkhand B.Tech 1st Sem PYQ"
      scanLabel="100% Official JUT Scan"
      examBoard="JUT Ranchi"
      examMarks="70 External + 30 Sessional"
      browseSubjectsTitle="Browse Other 1st Semester Subjects"
    />
  );
}
