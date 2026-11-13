import BtechSem3Client from "@/src/data_Resources/jharkhand/btech/sem3";

export const metadata = {
  title: "Jharkhand B.Tech 3rd Semester CSE/IT PYQ (2023–2026) | JUT Ranchi | Futurely",
  description: "Download official Jharkhand B.Tech 3rd Semester (CSE/IT) PYQs & Syllabus for JUT Ranchi - Prob & Stats, DSA, Digital Electronics, OOP, DBMS. Free on Futurely.",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.futurely.in/resources/jharkhand-btech/semester-3-cse",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/resources/jharkhand-btech/semester-3-cse",
    title: "Jharkhand B.Tech 3rd Semester CSE/IT PYQs & Syllabus | Futurely",
    description: "Download official Jharkhand B.Tech 3rd Semester (CSE/IT) PYQs & Syllabus for JUT Ranchi - Prob & Stats, DSA, Digital Electronics, OOP, DBMS. Free on Futurely.",
  },
};

export default function BtechSem3CsePage() {
  return <BtechSem3Client />;
}
