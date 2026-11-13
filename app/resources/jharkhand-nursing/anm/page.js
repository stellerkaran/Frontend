import JHANM from "@/src/data_Resources/jharkhand/JharNursing/JHANM";

export const metadata = {
  title: "Jharkhand ANM Exam 2026 – Complete Official Guide & Free PYQ Papers | Futurely",
  description:
    "Jharkhand ANM Entrance Exam (NECE) 2026: full eligibility criteria, Class 10 syllabus, exam pattern, important dates and free PYQ papers. Practice MCQs online free on Futurely.",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.futurely.in/resources/jharkhand-nursing/anm",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/resources/jharkhand-nursing/anm",
    title: "Jharkhand ANM Exam 2026 – Complete Guide & Free PYQs | Futurely",
    description:
      "Download free Jharkhand ANM PYQ papers and access complete exam guide: eligibility, syllabus, pattern, and dates.",
  },
};

export default function ANMPage() {
  return <JHANM />;
}
