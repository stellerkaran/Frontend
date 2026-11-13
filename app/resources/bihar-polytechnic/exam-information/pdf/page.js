import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  POLY_YEARS,
  POLY_SUBJECTS,
  POLY_SUBJECT_DETAILS,
  POLY_PAPERS_BY_YEAR,
} from "@/src/data_Resources/bihar/BiharPolytechnic/PolytechnicData";

export const metadata = {
  title: "Bihar Polytechnic (DCECE-PE) Official Question Paper PDF Viewer & Download (2018–2025) | Futurely",
  description:
    "Preview, read, and download official Bihar Polytechnic Entrance Competitive Examination (DCECE-PE 2018–2025) Question Papers PDF online. 90 MCQs covering Physics, Chemistry, and Mathematics for Diploma Engineering admission.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.futurely.in/resources/bihar-polytechnic/pdf",
  },
};

const transformPapers = (papersByYear) => {
  const result = {};
  for (const [year, paper] of Object.entries(papersByYear)) {
    result[year] = {};
    if (paper.subjectLinks) {
      for (const [subject, url] of Object.entries(paper.subjectLinks)) {
        result[year][subject] = url;
      }
    }
  }
  return result;
};

export default function BiharPolytechnicExamInfoPdfPage() {
  return (
    <PdfViewerLayout
      semesterBadge="BCECEB • Bihar Polytechnic DCECE-PE"
      categoryTitle="Bihar Polytechnic (DCECE-PE)"
      allSubjects={POLY_SUBJECTS}
      years={POLY_YEARS}
      defaultYear={2025}
      subjectDetails={POLY_SUBJECT_DETAILS}
      papers={transformPapers(POLY_PAPERS_BY_YEAR)}
      basePath="/resources/bihar-polytechnic/exam-information/pdf"
      currentSemester={0}
      readerTitle="Bihar Polytechnic PYQ Reader"
      scanLabel="100% Official BCECEB Scan"
      examBoard="BCECEB, Patna"
      examMarks="450 Marks (90 MCQs)"
    />
  );
}
