import Link from "next/link";
import {
  BookOpen,
  ArrowLeft,
  Download,
  CheckCircle2,
  FileText,
  Clock,
  Sparkles,
  ChevronRight,
  HelpCircle,
  Award,
} from "lucide-react";

// Subject metadata map
const SUBJECT_DETAILS = {
  "computer-science": {
    name: "Computer Science & IT (CS)",
    code: "CS",
    papers: [
      {
        year: 2024,
        shift: "Set 1 & Set 2",
        questions: 65,
        totalMarks: 100,
        difficulty: "Moderate to Hard",
        sampleQuestion: {
          q: "Consider a relation R(A, B, C, D, E) with functional dependencies: AB -> C, C -> D, D -> E. What is the candidate key of relation R?",
          type: "MCQ (1 Mark)",
          options: ["A) AB", "B) ABC", "C) ABD", "D) ABCD"],
          answer: "A) AB",
          explanation: "Taking closure of (AB)+: (AB)+ = {A, B, C, D, E}. Since no proper subset of AB derives all attributes and AB derives the entire relation schema, AB is the minimal candidate key.",
        },
      },
      {
        year: 2023,
        shift: "Shift 1 & Shift 2",
        questions: 65,
        totalMarks: 100,
        difficulty: "Moderate",
        sampleQuestion: {
          q: "Which of the following scheduling algorithms is non-preemptive in standard operating systems?",
          type: "MCQ (1 Mark)",
          options: ["A) Round Robin", "B) Shortest Job First without preemption", "C) Shortest Remaining Time First", "D) Priority Scheduling with preemption"],
          answer: "B) Shortest Job First without preemption",
          explanation: "Standard non-preemptive SJF runs the selected process to completion before allocating the CPU to another process.",
        },
      },
      {
        year: 2022,
        shift: "Single Shift",
        questions: 65,
        totalMarks: 100,
        difficulty: "Moderate",
      },
      {
        year: 2021,
        shift: "Set 1 & Set 2",
        questions: 65,
        totalMarks: 100,
        difficulty: "Tough",
      },
      {
        year: 2020,
        shift: "Single Shift",
        questions: 65,
        totalMarks: 100,
        difficulty: "Moderate",
      },
    ],
  },
  "electronics-communication": {
    name: "Electronics & Communication (EC)",
    code: "EC",
    papers: [
      {
        year: 2024,
        shift: "Single Shift",
        questions: 65,
        totalMarks: 100,
        difficulty: "Moderate to Difficult",
        sampleQuestion: {
          q: "For an ideal op-amp in an inverting amplifier configuration with R1 = 10kΩ and Rf = 100kΩ, what is the closed-loop voltage gain?",
          type: "NAT (1 Mark)",
          options: [],
          answer: "-10",
          explanation: "Inverting amplifier gain Av = -Rf / R1 = -100kΩ / 10kΩ = -10.",
        },
      },
      { year: 2023, shift: "Single Shift", questions: 65, totalMarks: 100, difficulty: "Moderate" },
      { year: 2022, shift: "Single Shift", questions: 65, totalMarks: 100, difficulty: "Moderate" },
      { year: 2021, shift: "Single Shift", questions: 65, totalMarks: 100, difficulty: "Moderate to Tough" },
    ],
  },
  "electrical-engineering": {
    name: "Electrical Engineering (EE)",
    code: "EE",
    papers: [
      { year: 2024, shift: "Single Shift", questions: 65, totalMarks: 100, difficulty: "Moderate to Tough" },
      { year: 2023, shift: "Single Shift", questions: 65, totalMarks: 100, difficulty: "Moderate" },
      { year: 2022, shift: "Single Shift", questions: 65, totalMarks: 100, difficulty: "Moderate" },
      { year: 2021, shift: "Single Shift", questions: 65, totalMarks: 100, difficulty: "Moderate" },
    ],
  },
  "mechanical-engineering": {
    name: "Mechanical Engineering (ME)",
    code: "ME",
    papers: [
      { year: 2024, shift: "Shift 1 & Shift 2", questions: 65, totalMarks: 100, difficulty: "Moderate" },
      { year: 2023, shift: "Single Shift", questions: 65, totalMarks: 100, difficulty: "Moderate" },
      { year: 2022, shift: "Single Shift", questions: 65, totalMarks: 100, difficulty: "Moderate" },
      { year: 2021, shift: "Shift 1 & Shift 2", questions: 65, totalMarks: 100, difficulty: "Moderate to Tough" },
    ],
  },
  "civil-engineering": {
    name: "Civil Engineering (CE)",
    code: "CE",
    papers: [
      { year: 2024, shift: "Shift 1 & Shift 2", questions: 65, totalMarks: 100, difficulty: "Moderate" },
      { year: 2023, shift: "Shift 1 & Shift 2", questions: 65, totalMarks: 100, difficulty: "Moderate" },
      { year: 2022, shift: "Shift 1 & Shift 2", questions: 65, totalMarks: 100, difficulty: "Moderate" },
      { year: 2021, shift: "Shift 1 & Shift 2", questions: 65, totalMarks: 100, difficulty: "Moderate" },
    ],
  },
  "data-science-ai": {
    name: "Data Science & Artificial Intelligence (DA)",
    code: "DA",
    papers: [
      {
        year: 2024,
        shift: "Single Shift (Inaugural)",
        questions: 65,
        totalMarks: 100,
        difficulty: "Moderate",
        sampleQuestion: {
          q: "Given a 2x2 matrix A with eigenvalues 2 and 5, what is the determinant of matrix A?",
          type: "NAT (1 Mark)",
          options: [],
          answer: "10",
          explanation: "The determinant of a square matrix is equal to the product of its eigenvalues. Det(A) = 2 * 5 = 10.",
        },
      },
    ],
  },
  "engineering-mathematics": {
    name: "Engineering Mathematics (Common)",
    code: "MATH",
    papers: [
      { year: 2024, shift: "All Branches Compiled", questions: 120, totalMarks: 13, difficulty: "Moderate" },
      { year: 2023, shift: "All Branches Compiled", questions: 120, totalMarks: 13, difficulty: "Moderate" },
      { year: 2022, shift: "All Branches Compiled", questions: 120, totalMarks: 13, difficulty: "Moderate" },
    ],
  },
  "general-aptitude": {
    name: "General Aptitude (Common)",
    code: "GA",
    papers: [
      { year: 2024, shift: "All Branches Compiled", questions: 150, totalMarks: 15, difficulty: "Moderate" },
      { year: 2023, shift: "All Branches Compiled", questions: 150, totalMarks: 15, difficulty: "Moderate" },
      { year: 2022, shift: "All Branches Compiled", questions: 150, totalMarks: 15, difficulty: "Moderate" },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(SUBJECT_DETAILS).map((subject) => ({
    subject,
  }));
}

export default async function GateSubjectPyqPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.subject || "computer-science";

  const subjectData = SUBJECT_DETAILS[slug] || {
    name: slug.replace(/-/g, " ").toUpperCase(),
    code: "GATE",
    papers: [
      { year: 2024, shift: "Shift 1", questions: 65, totalMarks: 100, difficulty: "Moderate" },
      { year: 2023, shift: "Shift 1", questions: 65, totalMarks: 100, difficulty: "Moderate" },
      { year: 2022, shift: "Shift 1", questions: 65, totalMarks: 100, difficulty: "Moderate" },
    ],
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/gate" className="hover:text-primary">GATE Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/gate/exam-preparation" className="hover:text-primary">Exam Preparation</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-primary font-bold">{subjectData.name}</span>
      </div>

      {/* Subject Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 font-extrabold text-xs px-2.5 py-1 rounded-md uppercase">
              Paper Code: {subjectData.code}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Official Solved Papers
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {subjectData.name} Previous Year Papers
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Download solved question papers, verify with master answer keys, and review step-by-step mathematical derivations.
          </p>
        </div>

        <Link
          href="/gate/exam-preparation"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-primary bg-slate-100 hover:bg-sky-50 px-4 py-2.5 rounded-xl transition-colors shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Exam Preparation</span>
        </Link>
      </div>

      {/* Year-wise Papers List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Year-Wise Solved Question Papers
          </h2>
          <span className="text-xs font-semibold text-slate-500">
            Official Question Format (MCQ / MSQ / NAT)
          </span>
        </div>

        <div className="space-y-4">
          {subjectData.papers.map((paper) => (
            <div
              key={paper.year}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-purple-200 hover:shadow-md transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-700 border border-purple-200 flex flex-col items-center justify-center font-black shrink-0">
                    <span className="text-xs font-bold leading-none">GATE</span>
                    <span className="text-lg leading-none mt-1">{paper.year}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">
                        GATE {paper.year} {subjectData.code} Question Paper
                      </h3>
                      <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                        {paper.shift}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                      <span>{paper.questions} Questions</span>
                      <span>•</span>
                      <span>{paper.totalMarks} Total Marks</span>
                      <span>•</span>
                      <span>Difficulty: {paper.difficulty}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="#download"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>

                  <Link
                    href={`/gate/exam-preparation?paper=${paper.year}-${subjectData.code.toLowerCase()}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl shadow-xs transition-colors"
                  >
                    <span>Practice Online</span>
                  </Link>
                </div>
              </div>

              {/* Sample Question Box if available */}
              {paper.sampleQuestion && (
                <div className="mt-2 p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-purple-800 uppercase tracking-wider text-[10px]">
                      Sample Question &bull; {paper.sampleQuestion.type}
                    </span>
                    <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Official Key: {paper.sampleQuestion.answer}
                    </span>
                  </div>

                  <p className="text-slate-800 font-medium leading-relaxed">
                    {paper.sampleQuestion.q}
                  </p>

                  {paper.sampleQuestion.options.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                      {paper.sampleQuestion.options.map((opt, i) => (
                        <div key={i} className="p-2 rounded-lg bg-white border border-slate-200">
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="p-3 bg-purple-50/70 rounded-lg border border-purple-100 text-slate-700 text-[11.5px] leading-relaxed">
                    <span className="font-bold text-purple-900">Explanation: </span>
                    {paper.sampleQuestion.explanation}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
