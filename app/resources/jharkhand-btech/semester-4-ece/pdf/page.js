import PdfViewerLayout from "@/components/pdf/PdfViewerLayout";
import {
	SEM4_ECE_ALL_SUBJECTS,
	SEM4_ECE_YEARS,
	SEM4_ECE_SUBJECT_DETAILS,
	SEM4_ECE_PAPERS,
} from "@/src/data_Resources/jharkhand/btech/sem4-ece";

export const metadata = {
	title: "B.Tech 4th Semester (ECE) Question Paper PDF Viewer | JUT Ranchi | Futurely",
	description:
		"Interactive continuous PDF reader for Jharkhand B.Tech 4th Semester ECE previous year question papers. Read online, zoom, and download official JUT papers.",
	robots: "noindex, follow",
};

export default function BtechSem4PdfPage() {
	return (
		<PdfViewerLayout
			semesterBadge="JUT Ranchi • Jharkhand B.Tech 4th Sem (ECE)"
			categoryTitle="Jharkhand B.Tech 4th Sem (ECE)"
			allSubjects={SEM4_ECE_ALL_SUBJECTS}
			years={SEM4_ECE_YEARS}
			defaultYear={2024}
			subjectDetails={SEM4_ECE_SUBJECT_DETAILS}
			papers={SEM4_ECE_PAPERS}
			basePath="/resources/jharkhand-btech/semester-4-ece/pdf"
			currentSemester={4}
			readerTitle="Jharkhand B.Tech 4th Sem (ECE) PYQ"
			scanLabel="100% Official JUT Scan"
			examBoard="JUT Ranchi"
			examMarks="70 External + 30 Sessional"
			browseSubjectsTitle="Browse Other 4th Semester (ECE) Subjects"
		/>
	);
}
