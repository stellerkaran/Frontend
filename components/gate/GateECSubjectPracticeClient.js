import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight, FileText } from "lucide-react";
import { GATE_EC_SUBJECTS } from "@/src/data_Exam/Gate/GateECData";

export default function GateECSubjectPracticeClient({ subjectSlug }) {
  const subject = GATE_EC_SUBJECTS.find((item) => item.slug === subjectSlug) || GATE_EC_SUBJECTS[0];

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/gate" className="hover:text-blue-600">GATE Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/gate/pyq/electronics-communication" className="hover:text-blue-600">EC Subjects</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-bold text-blue-600">{subject.title}</span>
      </div>

      <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-9">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <span className="inline-flex rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-blue-700">GATE EC &bull; {subject.code}</span>
            <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">{subject.title} PYQ Practice</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">Practice topic-wise previous year questions and revise the official GATE Electronics &amp; Communication syllabus.</p>
          </div>
          <Link href="/gate/pyq/electronics-communication" className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4" /> Back to EC Subjects
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {subject.topics.map((topic) => (
            <div key={topic} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
              <span className="text-sm font-bold text-slate-700">{topic}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
          <FileText className="h-5 w-5 text-blue-600" />
          <span className="font-semibold">2018&ndash;2024 solved PYQs will appear here.</span>
        </div>
      </section>
    </main>
  );
}
