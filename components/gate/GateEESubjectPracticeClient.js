import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight, FileText } from "lucide-react";
import { GATE_EE_SUBJECTS } from "@/src/data_Exam/Gate/GateEEData";

export default function GateEESubjectPracticeClient({ subjectSlug }) {
  const subject = GATE_EE_SUBJECTS.find((item) => item.slug === subjectSlug) || GATE_EE_SUBJECTS[0];

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/gate" className="hover:text-amber-600">GATE Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/gate/pyq/electrical-engineering" className="hover:text-amber-600">EE Subjects</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-bold text-amber-600">{subject.title}</span>
      </div>

      <section className="rounded-3xl border border-amber-100 bg-white p-6 shadow-sm sm:p-9">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <span className="inline-flex rounded-md bg-amber-50 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-amber-700">GATE EE &bull; {subject.code}</span>
            <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">{subject.title} PYQ Practice</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">{subject.description}</p>
          </div>
          <Link href="/gate/pyq/electrical-engineering" className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-amber-50 hover:text-amber-700">
            <ArrowLeft className="h-4 w-4" /> Back to EE Subjects
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

        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-900">
          <FileText className="h-5 w-5 text-amber-600" />
          <span className="font-semibold">Subject-wise GATE EE PYQ practice will appear here.</span>
        </div>
      </section>
    </main>
  );
}
