import GateCSSubjectPracticeClient from "@/components/gate/GateCSSubjectPracticeClient";
import GateSubjectYearsClient from "@/components/gate/GateSubjectYearsClient";
import { GATE_CS_SUBJECTS } from "@/src/data_Exam/Gate/GateCSData";

// Subjects that use the year-wise PYQ listing page (like the reference screenshot)
// instead of the inline sample-question practice page.
const YEAR_LISTING_SLUGS = ["programming-data-structures"];

export function generateStaticParams() {
  return GATE_CS_SUBJECTS.map((subject) => ({ topic: subject.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const subject = GATE_CS_SUBJECTS.find((item) => item.slug === resolvedParams?.topic);

  return {
    title: `${subject?.title || "GATE CS Subject"} PYQ Practice | Futurely GATE`,
    description: `Practice GATE Computer Science & IT ${subject?.title || "subject"} previous year questions and revise key topics.`,
  };
}

export default async function GateCSSubjectPage({ params }) {
  const resolvedParams = await params;
  const subjectSlug = resolvedParams?.topic;

  if (YEAR_LISTING_SLUGS.includes(subjectSlug)) {
    return (
      <GateSubjectYearsClient
        subjectSlug={subjectSlug}
        branchCode="CS"
        branchName="Computer Science & IT"
      />
    );
  }

  return <GateCSSubjectPracticeClient subjectSlug={subjectSlug} />;
}