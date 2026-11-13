import GateECSubjectPracticeClient from "@/components/gate/GateECSubjectPracticeClient";
import { GATE_EC_SUBJECTS } from "@/src/data_Exam/Gate/GateECData";

export function generateStaticParams() {
  return GATE_EC_SUBJECTS.map((subject) => ({ topic: subject.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const subject = GATE_EC_SUBJECTS.find((item) => item.slug === resolvedParams?.topic);
  return {
    title: `${subject?.title || "GATE EC Subject"} PYQ Practice | Futurely GATE`,
    description: `Practice GATE Electronics & Communication ${subject?.title || "subject"} previous year questions and revise key topics.`,
  };
}

export default async function GateECSubjectPage({ params }) {
  const resolvedParams = await params;
  return <GateECSubjectPracticeClient subjectSlug={resolvedParams?.topic} />;
}
