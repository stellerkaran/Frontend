import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  D2D_YEARS,
  D2D_SUBJECTS,
  D2D_SUBJECT_DETAILS,
  D2D_ALL_PAPERS_LIST,
} from "@/src/data_Resources/jharkhand/JharD2D/D2DData";

export const metadata = {
  title: "Jharkhand D2D Official Question Paper PDF Viewer & Download (2021–2026) | Futurely",
  description:
    "Preview, read, and download official Jharkhand D2D (JCECE Lateral Entry) Previous Year Question Papers (2021–2026) PDF online. 150 MCQs covering Engineering Physics, Chemistry, and Mathematics for Lateral Entry B.Tech admission.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.futurely.in/resources/jharkhand-d2d/pdf",
  },
};

export default function D2DExamInfoPdfPage() {
  return (
    <PdfViewerLayout
      semesterBadge="JCECEB • Jharkhand D2D Lateral Entry (DECE LE)"
      categoryTitle="Jharkhand D2D"
      allSubjects={D2D_SUBJECTS}
      years={D2D_YEARS}
      defaultYear={2026}
      subjectDetails={D2D_SUBJECT_DETAILS}
      papersList={D2D_ALL_PAPERS_LIST.map((p) => ({
        year: p.year,
        subject: "D2D (Lateral Entry) Question Paper",
        url: p.driveUrl,
      }))}
      basePath="/resources/jharkhand-d2d/exam-information/pdf"
      currentSemester={0}
      readerTitle="Jharkhand D2D Lateral Entry PYQ"
      scanLabel="100% Official JCECEB Scan"
      examBoard="JCECEB, Jharkhand"
      examMarks="150 Marks (150 MCQs)"
      classPrefix="d2d"
    />
  );
}
