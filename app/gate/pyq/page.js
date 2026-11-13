import ExamPrepClient, { GATE_PYQ_SUBJECTS } from "@/components/gate/ExamPrepClient";

export const metadata = {
  title: "GATE Previous Year Question Papers (PYQ) & Solutions | Futurely GATE",
  description:
    "Access official GATE solved question papers by branch: Computer Science, Electronics, Electrical, Mechanical, Civil, Data Science, Math, and Aptitude.",
};

export const SUBJECTS_LIST = GATE_PYQ_SUBJECTS;

export default function GatePyqListPage() {
  return <ExamPrepClient />;
}
