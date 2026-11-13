import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  FileText,
  Sparkles,
  ArrowRight,
  Cpu,
  Radio,
  Zap,
  Cog,
  Landmark,
  BrainCircuit,
  Clock,
  Award,
  Star,
} from "lucide-react";
import AnimatedGateTitle from "./AnimatedGateTitle";

export const metadata = {
  title: "Prepare Smart, Crack GATE 2027 | Futurely GATE",
  description:
    "Your comprehensive portal for GATE 2027 preparation: Solved PYQs, engineering branch question banks, formula sheets, mock tests, and IIT cutoffs.",
  alternates: {
    canonical: "https://www.futurely.in/gate",
  },
};

export default function GateHomePage() {
  const branches = [
    {
      id: "computer-science",
      code: "CS / IT",
      name: "Computer Science & Information Tech",
      icon: Cpu,
      color: "from-blue-600 to-indigo-700",
      bgLight: "bg-blue-50 text-blue-700 border-blue-200",
      desc: "Algorithms, DBMS, Operating Systems, Theory of Computation, Computer Networks",
      status: "PYQs Available",
    },
    {
      id: "electronics-communication",
      code: "EC",
      name: "Electronics & Communication",
      icon: Radio,
      color: "from-indigo-600 to-blue-700",
      bgLight: "bg-indigo-50 text-indigo-700 border-indigo-200",
      desc: "Signals & Systems, EDC, Analog Circuits, Digital Logic, Communications",
      status: "PYQs Available",
    },
    {
      id: "electrical-engineering",
      code: "EE",
      name: "Electrical Engineering",
      icon: Zap,
      color: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50 text-amber-700 border-amber-200",
      desc: "Circuits, Machines, Power Systems, Control, Measurements & Power Electronics",
      status: "PYQs Available",
    },
    {
      id: "mechanical-engineering",
      code: "ME",
      name: "Mechanical Engineering",
      icon: Cog,
      color: "from-rose-500 to-pink-600",
      bgLight: "bg-rose-50 text-rose-700 border-rose-200",
      desc: "Thermodynamics, Strength of Materials, Fluid Mechanics, Manufacturing",
      status: "PYQs Available",
    },
    {
      id: "civil-engineering",
      code: "CE",
      name: "Civil Engineering",
      icon: Landmark,
      color: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50 text-emerald-700 border-emerald-200",
      desc: "Structural Analysis, Geotechnical, Environmental, Transportation, Surveying",
      status: "PYQs Available",
    },
    {
      id: "data-science-ai",
      code: "DA",
      name: "Data Science & Artificial Intelligence",
      icon: BrainCircuit,
      color: "from-cyan-500 to-blue-600",
      bgLight: "bg-cyan-50 text-cyan-700 border-cyan-200",
      desc: "Probability, Linear Algebra, Machine Learning, AI Search, Python & DBMS",
      status: "New Paper Added",
    },
  ];

  const highlights = [
    {
      title: "15+ Years Solved PYQs",
      desc: "Carefully solved previous years' questions with step-by-step verified explanations.",
      icon: FileText,
    },
    {
      title: "Branch-wise Mock Tests",
      desc: "Simulate official GATE exam pattern with timed virtual test sessions.",
      icon: Clock,
    },
    {
      title: "Engineering Math & Aptitude",
      desc: "Master the 28 marks common scoring section (General Aptitude + Math).",
      icon: BookOpen,
    },
    {
      title: "IIT & PSU Admission Guides",
      desc: "Branch-specific cutoff scores for M.Tech admissions at IISc/IITs and PSU recruitments.",
      icon: Award,
    },
  ];

  return (
    <div className="gate-home-wrapper bg-[#f8fafc]">
      {/* ── HERO SECTION (Matching Diploma / BTech Home UI) ── */}
      <section className="hero-section relative" id="gate-hero-banner">
        <div className="hero-background" aria-hidden="true">
          <div
            className="hero-shapes shape-1 animate-[float_8s_ease-in-out_infinite]"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="hero-shapes shape-2 animate-[float_10s_ease-in-out_infinite]"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="hero-shapes shape-3 animate-[float_7s_ease-in-out_infinite]"
            style={{ animationDelay: "0.5s" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hero-content">
          <div className="flex flex-col items-center justify-center pt-4 pb-24 md:pt-8 md:pb-32">
            <div className="hero-badge transition-all duration-700 opacity-100 transform translate-y-0">
              <Star className="h-4 w-4 text-amber-300 fill-amber-300 mr-2" />    <span>Trusted by 10000+ Students</span>            </div>           <AnimatedGateTitle />             <p className="hero-subtitle text-center">
              CSE • ECE • EEE • Mechanical • Civil • Chemical + 23 More Branches<br />
              15+ Years Solved Papers, Formula Sheets &amp; Mock Tests, One Trusted Platform
            </p>

            <div className="hero-buttons mt-4 flex flex-wrap items-center justify-center gap-3">
              <Link href="/gate/exam-preparation" title="Start Free Practice">
                <button className="btn-primary-glow font-extrabold shadow-lg rounded-full cursor-pointer flex items-center gap-2">
                  <span>Start Free Practice</span>
                  <Sparkles className="h-5 w-5 animate-pulse" />
                </button>
              </Link>
              <Link href="/gate/resources" title="Download GATE Formula Revision Sheets">
                <button className="btn-secondary-outline font-extrabold rounded-full cursor-pointer">
                  Resources &amp; Formulas
                </button>
              </Link>
              <Link href="/gate/exam-preparation" title="GATE Exam Preparation & Mock Tests">
                <button className="btn-secondary-outline font-extrabold rounded-full cursor-pointer">
                  Exam Preparation
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Stats Bar (Matching Diploma / BTech Style) */}
        <div className="floating-stats" aria-label="GATE platform statistics">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="stats-card">
              <div className="stats-item">
                <FileText className="mx-auto" aria-hidden="true" />
                <h4>15+ Years</h4>
                <p>Solved PYQs</p>
              </div>
              <div className="stats-divider" aria-hidden="true"></div>
              <div className="stats-item">
                <GraduationCap className="mx-auto" aria-hidden="true" />
                <h4>6 Core Streams</h4>
                <p>CS, EC, EE, ME, CE, DA</p>
              </div>
              <div className="stats-divider" aria-hidden="true"></div>
              <div className="stats-item">
                <Award className="mx-auto" aria-hidden="true" />
                <h4>100% Free</h4>
                <p>Notes &amp; Formulas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENGINEERING DISCIPLINES (BRANCHES) SECTION ── */}
      <section className="pt-24 sm:pt-28 pb-16 bg-white" aria-label="Engineering disciplines" id="gate-branches-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 section-header">
            <span className="bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block mb-3">
              Engineering Disciplines
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Select Your GATE Branch – CS, EC, EE, ME &amp; More
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded"></div>
            <p className="mt-4 text-slate-500 text-sm sm:text-base leading-relaxed">
              Choose your engineering stream to start practicing year-wise solved question papers, test series, and formula revision sheets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {branches.map((b) => {
              const Icon = b.icon;
              return (
                <article
                  key={b.id}
                  className="exam-card transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-primary/40 group flex flex-col justify-between"
                  aria-label={`${b.name} GATE preparation`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${b.color} text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${b.bgLight}`}>
                        {b.status}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-xs font-extrabold text-primary tracking-wide uppercase">
                        Branch Code: {b.code}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                        {b.name}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {b.desc}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/gate/pyq/${b.id}`}
                    className="explore-category group mt-6 pt-4 border-t border-slate-100"
                    title={`Solve ${b.name} PYQs & Papers`}
                  >
                    <span className="text-primary font-bold text-sm">Solve PYQs &amp; Papers</span>
                    <ArrowRight className="explore-arrow w-4 h-4 text-primary transition-transform group-hover:translate-x-1.5" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY FUTURELY GATE (HIGHLIGHTS BAR) ── */}
      <section className="py-16 bg-[#f8fafc] border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block mb-2">
              Why Prepare with Futurely
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Structured Exam Resources Built for Engineers
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-200 transition-all space-y-3 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COMMON SCORING SECTIONS (MATH & GENERAL APTITUDE) ── */}
      {/* ── PORTAL SWITCHER BANNER (DIPLOMA / POLYTECHNIC) ── */}
      <section className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#dde6ff] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_4px_20px_rgba(79,70,229,0.07)]">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-bold text-slate-900">
                  Looking for Diploma, Polytechnic, or B.Tech Lateral Entry (D2D)?
                </h4>
                <p className="text-xs sm:text-sm text-slate-500">
                  Futurely's main portal offers dedicated test packs and PYQs for PECE, D2D, and state polytechnic entrance tests.
                </p>
              </div>
            </div>
            <Link
              href="/"
              className="whitespace-nowrap px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-2"
            >
              <span>Go to Diploma / Polytechnic Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
