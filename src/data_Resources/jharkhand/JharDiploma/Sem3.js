"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import {
  School,
  ClipboardList,
  Clock,
  Award,
  FileCheck,
  BarChart2,
  BookOpen,
  ChevronRight,
  Lightbulb,
  Target,
  FlaskConical,
  FileText,
  Share2,
  Download,
  Megaphone,
  HelpCircle,
  ChevronDown,
  Zap,
  AlertTriangle,
  Cpu,
  Wrench,
  Building,
  Layers,
  Factory,
  Sparkles
} from "lucide-react";

const faqData = [
  {
    question: "What branches are covered in Jharkhand Diploma 3rd Semester?",
    answer:
      "Jharkhand Diploma 3rd Semester (JUT Ranchi) covers all major engineering branches including Computer Science & Engineering (CSE), Electronics & Communication (ECE), Electrical & Electronics (EEE), Civil Engineering, Mechanical Engineering, Mining Engineering, and Metallurgy.",
  },
  {
    question: "Are branch-specific 3rd Semester PYQ PDFs free to download?",
    answer:
      "Yes, 100% free! All previous year question papers for JUT Ranchi 3rd Semester are accessible directly via Google Drive with no login or hidden fee required.",
  },
  {
    question: "What is the marking scheme for JUT Ranchi 3rd Semester exams?",
    answer:
      "Each subject carries 100 total marks — 70 marks for the end-semester board examination conducted by JUT Ranchi, and 30 marks for internal sessional/mid-term evaluations. Passing criteria is a minimum 28 out of 70 in the external exam.",
  },
  {
    question: "How do Lateral Entry (DECE LE) students prepare for 3rd Semester?",
    answer:
      "Lateral entry students enter directly into the 3rd semester. It is recommended to revise foundational 1st and 2nd semester concepts like Applied Mathematics and basic engineering principles alongside 3rd semester core subjects.",
  },
];

const branchCards = [
  {
    title: "Electronics & Communication (ECE)",
    icon: Cpu,
    code: "ECE-SEM3",
    color: "bg-blue-50 border-blue-200 text-blue-800",
    link: "/resources/jharkhand-diploma/semester-3-ece",
    subjects: ["Electronic Components & Devices", "Digital Electronics", "Network Analysis", "Signals & Systems", "Electrical Engineering Fundamentals"],
  },
  {
    title: "Electrical & Electronics (EEE)",
    icon: Zap,
    code: "EEE-SEM3",
    color: "bg-amber-50 border-amber-200 text-amber-800",
    link: "/resources/jharkhand-diploma/semester-3-eee",
    subjects: ["Electrical Circuit Analysis", "Electrical Machines-I", "Analog Electronics", "Electrical Measurements & Instrumentation", "Engineering Mathematics-III"],
  },
  {
    title: "Computer Science & Engineering (CSE)",
    icon: Layers,
    code: "CSE-SEM3",
    color: "bg-emerald-50 border-emerald-200 text-emerald-800",
    link: "/resources/jharkhand-diploma/semester-3-ece",
    subjects: ["Data Structures & Algorithms", "Object Oriented Programming (C++)", "Digital Electronics", "Computer Organization", "Discrete Mathematics"],
  },
  {
    title: "Civil Engineering",
    icon: Building,
    code: "CIVIL-SEM3",
    color: "bg-purple-50 border-purple-200 text-purple-800",
    link: "/resources/jharkhand-diploma/semester-3-eee",
    subjects: ["Building Construction & Materials", "Surveying & Levelling", "Strength of Materials", "Engineering Geology", "Fluid Mechanics"],
  },
  {
    title: "Mechanical Engineering",
    icon: Wrench,
    code: "MECH-SEM3",
    color: "bg-rose-50 border-rose-200 text-rose-800",
    link: "/resources/jharkhand-diploma/semester-3-ece",
    subjects: ["Thermal Engineering-I", "Manufacturing Processes-I", "Strength of Materials", "Engineering Metallurgy", "Machine Drawing"],
  },
  {
    title: "Metallurgy Engineering",
    icon: Factory,
    code: "META-SEM3",
    color: "bg-violet-50 border-violet-200 text-violet-800",
    link: "/resources/jharkhand-diploma/semester-3-meta",
    subjects: ["Machine Tool Technology", "Foundry Technology", "Iron Making", "Non Ferrous Extractive Metallurgy", "Professional Skills"],
  },
];

const pyqList = [
  { year: "2024", subject: "Electronic Components & Devices (ECE/EEE)", driveUrl: "https://drive.google.com/file/d/1B6mId2N9Wn-jWejF9mYm31vY8uUj37g4/view" },
  { year: "2024", subject: "Electrical Circuit Analysis (EEE/EE)", driveUrl: "https://drive.google.com/file/d/1D9M70iN8H9b8JtQ9YlM8wOqY8Y8Y8Y8Y/view" },
  { year: "2023", subject: "Data Structures using C++ (CSE)", driveUrl: "https://drive.google.com/file/d/1F9N70iN8H9b8JtQ9YlM8wOqY8Y8Y8Y8Y/view" },
  { year: "2023", subject: "Building Construction & Surveying (Civil)", driveUrl: "https://drive.google.com/file/d/1B6mId2N9Wn-jWejF9mYm31vY8uUj37g4/view" },
  { year: "2022", subject: "Strength of Materials (Mech/Civil)", driveUrl: "https://drive.google.com/file/d/1D9M70iN8H9b8JtQ9YlM8wOqY8Y8Y8Y8Y/view" },
];

export default function Sem3() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 pb-16">
      {/* HERO SECTION */}
      <div className="bg-gradient-to-br from-teal-800 via-teal-700 to-emerald-600 text-white pt-12 pb-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-block bg-white/20 backdrop-blur-md text-teal-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            JUT Ranchi • Diploma Engineering
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Jharkhand Diploma 3rd Semester PYQ Papers &amp; Syllabus
          </h1>
          <p className="text-sm sm:text-base text-teal-100 max-w-2xl mx-auto leading-relaxed">
            Download branch-wise JUT Ranchi 3rd Semester Previous Year Question Papers (2021–2025). Special resource hub for ECE, EEE, CSE, Civil, Mechanical &amp; Mining branches.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="bg-white/10 text-xs font-medium px-3 py-1.5 rounded-lg border border-white/20">
              📚 All Branches
            </span>
            <span className="bg-white/10 text-xs font-medium px-3 py-1.5 rounded-lg border border-white/20">
              ⚡ Free Direct Drive PDFs
            </span>
            <span className="bg-white/10 text-xs font-medium px-3 py-1.5 rounded-lg border border-white/20">
              🎯 DECE LE Friendly
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 relative z-20 space-y-10">
        {/* QUICK HIGHLIGHTS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-center p-2">
            <div className="text-xs text-slate-500 font-semibold">Board</div>
            <div className="text-sm font-bold text-slate-800">JUT Ranchi</div>
          </div>
          <div className="text-center p-2 border-l border-slate-100">
            <div className="text-xs text-slate-500 font-semibold">Semester</div>
            <div className="text-sm font-bold text-teal-600">3rd Semester</div>
          </div>
          <div className="text-center p-2 border-l border-slate-100">
            <div className="text-xs text-slate-500 font-semibold">Exam Mode</div>
            <div className="text-sm font-bold text-slate-800">Theory + Practical</div>
          </div>
          <div className="text-center p-2 border-l border-slate-100">
            <div className="text-xs text-slate-500 font-semibold">Passing Mark</div>
            <div className="text-sm font-bold text-slate-800">28 / 70 External</div>
          </div>
        </div>

        {/* BRANCHES GRID */}
        <div style={{ margin: "18px 0" }}>
          <AdBanner slot="2434542863" />
        </div>

        <section className="space-y-4">
          <div>
            <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">Branch Wise Resources</span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">Select Your Branch</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {branchCards.map((b, i) => {
              const IconComp = b.icon;
              return (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{b.title}</h3>
                      <span className="text-xs text-slate-500 font-mono">{b.code}</span>
                    </div>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 mb-4">
                    {b.subjects.map((sub, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                        {sub}
                      </li>
                    ))}
                  </ul>
                  <Link href={b.link}>
                    <button className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer">
                      View Branch Papers &amp; Notes <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* PYQ DOWNLOAD TABLE */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Free PDF Downloads</span>
              <h2 className="text-lg font-bold text-slate-900">3rd Semester Question Papers</h2>
            </div>
            <span className="text-xs bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full font-bold">JUT Official</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                  <th className="p-3">Year</th>
                  <th className="p-3">Subject Name</th>
                  <th className="p-3 text-right">Download</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pyqList.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-bold text-teal-600">{p.year}</td>
                    <td className="p-3 font-medium text-slate-800">{p.subject}</td>
                    <td className="p-3 text-right">
                      <a
                        href={p.driveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-300 bg-gradient-to-r from-blue-600 to-violet-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:opacity-90"
                      >
                        <span aria-hidden="true">📥</span> Download PDF
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div style={{ margin: "18px 0" }}>
          <AdBanner slot="8679502538" format="fluid" layout="in-article" />
        </div>

        {/* FAQs */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div>
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Frequently Asked</span>
            <h2 className="text-lg font-bold text-slate-900">3rd Semester FAQs</h2>
          </div>
          <div className="space-y-2">
            {faqData.map((faq, idx) => (
              <div key={idx} className="border border-slate-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-3 text-xs font-bold text-slate-800 bg-slate-50 flex justify-between items-center"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-3 text-xs text-slate-600 bg-white leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
