import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  NURSING_YEARS,
  NURSING_SUBJECTS,
  NURSING_SUBJECT_DETAILS,
  NURSING_ALL_PAPERS_LIST,
} from "@/src/data_Resources/bihar/BiharBscNursing/BscNursingData";

export const metadata = {
  title: "Bihar B.Sc. Nursing (BCECE PCB) Official Question Paper PDF Viewer & Download (2021–2025) | Futurely",
  description:
    "Preview, read, and download official Bihar B.Sc. Nursing Entrance Competitive Examination (BCECE PCB 2021–2025) Question Papers PDF online. 300 MCQs covering Physics, Chemistry, and Biology for B.Sc. Nursing admission in Bihar.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.futurely.in/resources/bihar-bsc-nursing/pdf",
  },
};

export default function BiharBscNursingExamInfoPdfPage() {
  return (
    <PdfViewerLayout
      semesterBadge="BCECEB • Bihar B.Sc. Nursing (PCB)"
      categoryTitle="Bihar B.Sc. Nursing (BCECE PCB)"
      allSubjects={NURSING_SUBJECTS}
      years={NURSING_YEARS}
      defaultYear={2025}
      subjectDetails={NURSING_SUBJECT_DETAILS}
      papersList={NURSING_ALL_PAPERS_LIST.map((p) => ({
        year: p.year,
        subject: "B.Sc. Nursing Question Paper",
        url: p.driveUrl,
      }))}
      basePath="/resources/bihar-bsc-nursing/exam-information/pdf"
      currentSemester={0}
      readerTitle="Bihar B.Sc. Nursing PYQ Reader"
      scanLabel="100% Official BCECEB Scan"
      examBoard="BCECEB, Patna"
      examMarks="1200 Marks (300 MCQs)"
      classPrefix="d2d"
    />
  );
}