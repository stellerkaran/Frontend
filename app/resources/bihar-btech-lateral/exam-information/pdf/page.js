import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  LE_YEARS,
  LE_SUBJECTS,
  LE_SUBJECT_DETAILS,
  LE_ALL_PAPERS_LIST,
} from "@/src/data_Resources/bihar/BiharBtechLateral/BtechLateralData";

export const metadata = {
  title: "Bihar B.Tech Lateral Entry (BCECE LE) Official Question Paper PDF Viewer & Download (2021–2025) | Futurely",
  description:
    "Preview, read, and download official BCECE Lateral Entry (BCECE LE 2021–2025) Previous Year Question Papers PDF online. 150 MCQs covering Engineering Mathematics, Engineering Mechanics and Technical English for Lateral Entry B.Tech admission.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.futurely.in/resources/bihar-btech-lateral/pdf",
  },
};

export default function BiharBtechLateralExamInfoPdfPage() {
  return (
    <PdfViewerLayout
      semesterBadge="BCECEB • Bihar B.Tech Lateral Entry (BCECE LE)"
      categoryTitle="Bihar B.Tech Lateral (BCECE LE)"
      allSubjects={LE_SUBJECTS}
      years={LE_YEARS}
      defaultYear={2025}
      subjectDetails={LE_SUBJECT_DETAILS}
      papersList={LE_ALL_PAPERS_LIST.map((p) => ({
        year: p.year,
        subject: "BCECE LE Question Paper",
        url: p.driveUrl,
      }))}
      basePath="/resources/bihar-btech-lateral/exam-information/pdf"
      currentSemester={0}
      readerTitle="Bihar B.Tech Lateral PYQ Reader"
      scanLabel="100% Official BCECEB Scan"
      examBoard="BCECEB, Patna"
      examMarks="600 Marks (150 MCQs)"
      classPrefix="d2d"
    />
  );
}
