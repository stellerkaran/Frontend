import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
  POLY_YEARS,
  POLY_SUBJECTS,
  POLY_SUBJECT_DETAILS,
  POLY_PAPERS_BY_YEAR,
} from "@/src/data_Resources/jharkhand/JharPolytechnic/PolytechnicData";

export const metadata = {
  title: "Jharkhand Polytechnic (PECE) Official Question Paper PDF Viewer & Download (2021–2026) | Futurely",
  description:
    "Preview, read, and download official Jharkhand Polytechnic Entrance Examination (PECE 2021–2026) Question Papers PDF online. 150 MCQs covering Physics, Chemistry, and Mathematics for Diploma Engineering admission.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.futurely.in/resources/jharkhand-polytechnic/pdf",
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

export default function PolytechnicExamInfoPdfPage() {
  return (
    <PdfViewerLayout
      semesterBadge="JCECEB • Jharkhand Polytechnic PECE"
      categoryTitle="Jharkhand Polytechnic (PECE)"
      allSubjects={POLY_SUBJECTS}
      years={POLY_YEARS}
      defaultYear={2026}
      subjectDetails={POLY_SUBJECT_DETAILS}
      papers={transformPapers(POLY_PAPERS_BY_YEAR)}
      basePath="/resources/jharkhand-polytechnic/exam-information/pdf"
      currentSemester={0}
      readerTitle="Jharkhand Polytechnic PYQ Reader"
      scanLabel="100% Official JCECEB Scan"
      examBoard="JCECEB, Jharkhand"
      examMarks="150 Marks (150 MCQs)"
    />
  );
}
