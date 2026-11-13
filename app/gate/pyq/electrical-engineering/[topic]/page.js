import GateEESubjectPracticeClient from "@/components/gate/GateEESubjectPracticeClient";
import { GATE_EE_SUBJECTS } from "@/src/data_Exam/Gate/GateEEData";

export function generateStaticParams() {
  return GATE_EE_SUBJECTS.map((subject) => ({ topic: subject.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const subject = GATE_EE_SUBJECTS.find((item) => item.slug === resolvedParams?.topic);

  return {
    title: `${subject?.title || "GATE EE Subject"} PYQ Practice | Futurely GATE`,
    description: `Practice GATE Electrical Engineering ${subject?.title || "subject"} previous year questions and revise key topics.`,
  };
}

export default async function GateEESubjectPage({ params }) {
  const resolvedParams = await params;
  return <GateEESubjectPracticeClient subjectSlug={resolvedParams?.topic} />;
}
