import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  AGRI_YEARS,
  AGRI_SUBJECTS,
  AGRI_SUBJECT_DETAILS,
  AGRI_LINKS,
} from "@/src/data_Resources/jharkhand/JharAgriculture/AgricultureData";

export const metadata = {
  title: "Jharkhand Agriculture (JCECE) Official Question Paper PDF Viewer & Download (2022–2025) | Futurely",
  description:
    "Preview, read, and download official Jharkhand JCECE Agriculture & Allied Courses Entrance Exam Question Papers PDF online. Covers PCM, PCB, and PCMB subject groups for B.Sc (Hons) Agriculture, B.V.Sc & A.H., and allied colleges under BAU Ranchi.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.futurely.in/resources/jharkhand-agriculture/pdf",
  },
};

export default function AgriDirectPdfPage() {
  return (
    <PdfViewerLayout
      semesterBadge="JCECEB • Jharkhand JCECE Agriculture & Allied Courses"
      categoryTitle="Jharkhand Agriculture"
      allSubjects={AGRI_SUBJECTS}
      years={AGRI_YEARS}
      defaultYear={2025}
      subjectDetails={AGRI_SUBJECT_DETAILS}
      papers={AGRI_LINKS}
      basePath="/resources/jharkhand-agriculture/pdf"
      currentSemester={0}
      readerTitle="Jharkhand JCECE Agriculture PYQ"
      scanLabel="100% Official JCECEB Scan"
      examBoard="JCECEB, Jharkhand"
      examMarks="150–200 Marks"
      classPrefix="agri"
    />
  );
}
