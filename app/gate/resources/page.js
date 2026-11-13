import Link from "next/link";
import {
  FileText,
  BookOpen,
  Sparkles,
  Download,
  CheckCircle2,
  Calculator,
  Compass,
  ArrowRight,
  Bookmark,
} from "lucide-react";

export const metadata = {
  title: "GATE Resources & Formula Books | Futurely GATE",
  description: "Download official GATE 2026 syllabus PDFs, Engineering Mathematics formula sheets, General Aptitude summaries, and virtual calculator tips.",
};

export default function GateResourcesPage() {
  const resourceCategories = [
    {
      id: "syllabus",
      title: "Official GATE 2026 Syllabus",
      desc: "Updated branch-wise syllabus issued by organizing IITs with weightage analysis.",
      items: [
        { name: "Computer Science (CS) Syllabus PDF", size: "1.2 MB", tag: "Updated" },
        { name: "Electronics & Communication (EC) PDF", size: "1.4 MB", tag: "Updated" },
        { name: "Electrical Engineering (EE) PDF", size: "1.3 MB", tag: "Updated" },
        { name: "Mechanical Engineering (ME) PDF", size: "1.5 MB", tag: "Updated" },
        { name: "Civil Engineering (CE) PDF", size: "1.4 MB", tag: "Updated" },
        { name: "Data Science & AI (DA) Syllabus PDF", size: "950 KB", tag: "New Paper" },
      ],
    },
    {
      id: "formulas",
      title: "Quick Revision Formula Books",
      desc: "Handy high-yield formula sheets for last-month revision and memory retention.",
      items: [
        { name: "Engineering Mathematics Formula Sheet", size: "2.8 MB", tag: "High Yield" },
        { name: "General Aptitude Shortcut Tricks", size: "1.9 MB", tag: "Recommended" },
        { name: "Control Systems & Signal Processing Cheatsheet", size: "3.1 MB", tag: "EE / EC" },
        { name: "Thermodynamics & Fluid Mechanics Formulas", size: "2.4 MB", tag: "ME / CE" },
        { name: "Data Structures & Algorithms Complexity Table", size: "1.1 MB", tag: "CS / IT" },
      ],
    },
    {
      id: "calculator",
      title: "Virtual Calculator Mastery",
      desc: "Tips, hotkeys, and precision methods for the official TCS-iON virtual calculator.",
      items: [
        { name: "GATE Virtual Calculator Step-by-Step Manual", size: "1.6 MB", tag: "Must Read" },
        { name: "Top 10 Calculator Pitfalls to Avoid in NAT", size: "850 KB", tag: "Tips" },
        { name: "Memory (M+, M-, MR) Usage Guide", size: "720 KB", tag: "Speed Trick" },
      ],
    },
  ];

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-purple-100 text-purple-700 border border-purple-200">
          <FileText className="w-3.5 h-3.5" />
          Study Material Vault
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          GATE Study Resources &amp; Formula Sheets
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Curated PDFs, formula books, subject summaries, and official syllabus guidelines for serious GATE aspirants.
        </p>
      </div>

      {/* Resource Sections */}
      <div className="space-y-10">
        {resourceCategories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">{cat.title}</h2>
              <p className="text-xs text-slate-500 mt-1">{cat.desc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-purple-300 hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 border border-purple-200">
                        {item.tag}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">{item.size}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 leading-snug">
                      {item.name}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                    <a
                      href="#download"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </a>
                    <span className="text-[11px] font-semibold text-slate-400">PDF</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA to PYQs */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold text-white">
            Have you solved the latest 2024 questions yet?
          </h3>
          <p className="text-xs text-purple-200">
            Apply these formulas on real GATE exam papers with step-by-step solutions.
          </p>
        </div>
        <Link
          href="/gate/pyq"
          className="px-5 py-2.5 bg-white hover:bg-purple-50 text-purple-900 font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
        >
          Solve Subject PYQs →
        </Link>
      </div>
    </div>
  );
}
