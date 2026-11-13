import BtechSem4Client from "@/src/data_Resources/jharkhand/btech/sem4-ece";

export const metadata = {
  title: "Jharkhand B.Tech 4th Semester ECE PYQ (2022–2026) | JUT Ranchi | Futurely",
  description: "Download official Jharkhand B.Tech 4th Semester (ECE) PYQs & Syllabus for JUT Ranchi - EDC, Digital Electronics, EMFT, Signals & Systems, Electrical Machines. Free PDF on Futurely.",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.futurely.in/resources/jharkhand-btech/semester-4-ece",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/resources/jharkhand-btech/semester-4-ece",
    title: "Jharkhand B.Tech 4th Semester ECE PYQs & Syllabus | Futurely",
    description: "Download official Jharkhand B.Tech 4th Semester (ECE) PYQs & Syllabus for JUT Ranchi. Free PDF on Futurely.",
  },
};

export default function BtechSem4EcePage() {
  return <BtechSem4Client />;
}
