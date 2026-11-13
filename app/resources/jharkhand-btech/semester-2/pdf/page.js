import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  SEM2_ALL_SUBJECTS,
  SEM2_YEARS,
  SEM2_SUBJECT_DETAILS,
  SEM2_PAPERS,
} from "@/src/data_Resources/jharkhand/btech/Sem2Data";

export const metadata = {
  title: "B.Tech 2nd Semester Question Paper PDF Viewer | JUT Ranchi | Futurely",
  description:
    "Interactive continuous PDF reader for Jharkhand B.Tech 2nd Semester previous year question papers. Read online, zoom, and download official JUT papers.",
  robots: "noindex, follow",
};

export default function BtechSem2PdfPage() {
  return (
    <PdfViewerLayout
      semesterBadge="JUT Ranchi • Jharkhand B.Tech 2nd Sem"
      categoryTitle="Jharkhand B.Tech 2nd Sem"
      allSubjects={SEM2_ALL_SUBJECTS}
      years={SEM2_YEARS}
      defaultYear={2024}
      subjectDetails={SEM2_SUBJECT_DETAILS}
      papers={SEM2_PAPERS}
      basePath="/resources/jharkhand-btech/semester-2/pdf"
      currentSemester={2}
      readerTitle="Jharkhand B.Tech 2nd Sem PYQ"
      scanLabel="100% Official JUT Scan"
      examBoard="JUT Ranchi"
      examMarks="70 External + 30 Sessional"
      browseSubjectsTitle="Browse Other 2nd Semester Subjects"
    />
  );
}
