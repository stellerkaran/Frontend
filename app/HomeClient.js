"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  GraduationCap,
  BookOpen,
  Sparkles,
  HeartHandshake,
  Check,
  Star,
  Building2,
  Building,
  School
} from "lucide-react";

/* ─────────────────────────────────────────────
   FAQ DATA
───────────────────────────────────────────── */
const faqData = [
  {
    question: "What is Futurely and who is it for?",
    answer:
      "Futurely is a free online exam-preparation platform for diploma and polytechnic students preparing for state-level engineering entrance exams in Jharkhand, Bihar, Uttar Pradesh, Haryana, and Delhi. It provides solved Previous Year Question Papers (PYQs) for exams like Jharkhand D2D, Jharkhand Polytechnic (JCECEB), Bihar BCECE LE, and more.",
  },
  {
    question: "What is the Jharkhand D2D exam and who can apply?",
    answer:
      "Jharkhand D2D (Diploma to Degree) is a lateral-entry entrance exam conducted by JCECEB for diploma holders who want direct admission into the 2nd year of B.Tech at institutions like BIT Sindri and other engineering colleges in Jharkhand. Candidates with a 3-year diploma in engineering are eligible to apply.",
  },
  {
    question: "Which years of PYQs are available on Futurely?",
    answer:
      "Futurely currently provides solved Previous Year Question Papers from 2021 to 2025 for Jharkhand D2D and Jharkhand Polytechnic exams — 5 full years of practice material covering 600+ D2D questions and 750+ Polytechnic questions.",
  },
  {
    question: "Is Futurely completely free to use?",
    answer:
      "Yes, Futurely is 100% free. You can start practising PYQs for Jharkhand D2D and Polytechnic exams without any subscription or payment. Simply create an account and start solving.",
  },
  {
    question: "Which subjects are covered in the Jharkhand Polytechnic PYQ section?",
    answer:
      "The Jharkhand Polytechnic PYQ section covers three core subjects: Physics, Chemistry, and Mathematics. Each subject contains multiple years of solved questions (2021–2025) with detailed explanations.",
  },
  {
    question: "What is Focus Mode on Futurely?",
    answer:
      "Focus Mode is a distraction-free practice feature available on Futurely's PYQ pages. When enabled, it hides the header and navigation so students can concentrate on solving questions without visual interruptions.",
  },
  {
    question: "How should I prepare for the Jharkhand D2D 2027 exam?",
    answer:
      "The most effective strategy is to solve Previous Year Questions from 2021–2025, understand the question pattern for Physics, Chemistry, and Mathematics, and practise daily. Futurely provides all 5 years of solved PYQs with detailed solutions to help you maximise your JCECEB rank.",
  },
  {
    question: "Will Futurely add more state exams in the future?",
    answer:
      "Yes! Futurely is actively expanding. Upcoming additions include Bihar BCECE LE, Bihar Polytechnic, UP Polytechnic LE, UP B.Tech Lateral Entry, Haryana, and Delhi exams. Visit the Exam Preparation page for the latest updates.",
  },
];

export default function HomeClient() {
  const [openFaq, setOpenFaq] = useState(null);
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Safe and hydration-friendly typewriter effect
  useEffect(() => {
    const firstLineText = "Prepare Smart";
    const secondLineText = "Crack State Exams";
    
    let charIndex = 0;
    let charIndex2 = 0;
    let t1, t2;

    const typeFirstLine = () => {
      if (charIndex < firstLineText.length) {
        setLine1(firstLineText.substring(0, charIndex + 1));
        charIndex++;
        t1 = setTimeout(typeFirstLine, 75);
      } else {
        t2 = setTimeout(typeSecondLine, 200);
      }
    };

    const typeSecondLine = () => {
      if (charIndex2 < secondLineText.length) {
        setLine2(secondLineText.substring(0, charIndex2 + 1));
        charIndex2++;
        t2 = setTimeout(typeSecondLine, 75);
      }
    };

    const startTimer = setTimeout(typeFirstLine, 500);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="home-page">
      {/* ── HERO SECTION ── */}
      <section className="hero-section" id="hero-banner">
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
      <div className="flex flex-col items-center justify-center pt-8 pb-24 md:pt-12 md:pb-32">
            <div className="hero-badge transition-all duration-700 opacity-100 transform translate-y-0">
              <Star className="h-4 w-4 text-amber-300 fill-amber-300 mr-2" />
              <span>Trusted by 10000+ Students</span>
            </div>

            <h1 className="hero-title">
              {line1 || "\u00A0"}<br />
              <span className="title-gradient">{line2 || "\u00A0"}</span>
            </h1>

            <p className="hero-subtitle transition-all duration-700 opacity-100 transform translate-y-0">
              Diploma • Polytechnic • BTech • Lateral Entry <br />
              All State-Level Engineering Exams, One Trusted Platform
            </p>

            <div className="hero-buttons mt-4 transition-all duration-700 opacity-100 transform scale-100">
              <Link href="/exam-preparation" title="Start free PYQ practice for Jharkhand D2D and Polytechnic">
                <button className="btn-primary-glow font-extrabold shadow-lg rounded-full cursor-pointer flex items-center gap-2">
                  <span>Start Free Practice</span>
                  <Sparkles className="h-5 w-5 animate-pulse" />
                </button>
              </Link>
              <Link href="/resources" title="Download PYQs and study resources">
                <button className="btn-secondary-outline font-extrabold rounded-full cursor-pointer">
                  PYQ &amp; Resources
                </button>
              </Link>
              <Link href="/colleges" title="Explore top engineering and polytechnic colleges">
                <button className="btn-secondary-outline font-extrabold rounded-full cursor-pointer">
                  Top Colleges
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Stats Bar */}
        <div className="floating-stats" aria-label="Platform statistics">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="stats-card">
              <div className="stats-item">
                <BookOpen className="mx-auto" aria-hidden="true" />
                <h4>Exam</h4>
                <p>Practice &amp; Tests</p>
              </div>
              <div className="stats-divider" aria-hidden="true"></div>
              <div className="stats-item">
                <GraduationCap className="mx-auto" aria-hidden="true" />
                <h4>College</h4>
                <p>Top Colleges</p>
              </div>
              <div className="stats-divider" aria-hidden="true"></div>
              <div className="stats-item">
                <HeartHandshake className="mx-auto" aria-hidden="true" />
                <h4>Resource</h4>
                <p>Notes &amp; PYQs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXAM CATEGORIES ── */}
      <section className="exams-section py-24 bg-white" aria-label="Exam categories by state" id="exam-categories-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 section-header">
            <span className="bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block mb-3">
              Explore Selections
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Exam Categories – Jharkhand, Bihar &amp; More
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded"></div>
            <p className="mt-4 text-slate-500 text-sm sm:text-base leading-relaxed">
              Select your state and exam type to start your personalised preparation journey for JCECEB, BCECE and other state-level engineering entrance exams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Jharkhand Card */}
            <article
              className="exam-card jharkhand-card transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              aria-label="Jharkhand exam preparation"
            >
              <div className="card-glow jharkhand-glow" aria-hidden="true"></div>
              <div className="card-icon" aria-hidden="true">
                <GraduationCap className="h-12 w-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mt-2">Jharkhand</h3>
              <nav className="exam-types my-4 flex flex-wrap gap-1.5" aria-label="Jharkhand exam links">
                <Link href="/exam-preparation/jharkhand-d2d" title="Jharkhand D2D (Diploma to Degree) PYQ" className="badge-type">
                  Diploma to Degree (D2D)
                </Link>
                <Link href="/exam-preparation/jharkhand-polytechnic" title="Jharkhand Polytechnic PYQ" className="badge-type">
                  Polytechnic
                </Link>
                <Link href="/exam-preparation/jharkhand-polytechnic-lateral-entry" title="Jharkhand Polytechnic Lateral Entry" className="badge-type">
                  Polytechnic LE
                </Link>
                <Link href="/exam-preparation/jharkhand-paramedical" title="Jharkhand Paramedical PYQ" className="badge-type">
                  Paramedical
                </Link>
                <Link href="/exam-preparation/jharkhand-anm" title="Jharkhand ANM Nursing PYQ" className="badge-type">
                  ANM
                </Link>
                <Link href="/exam-preparation/jharkhand-gnm" title="Jharkhand GNM Nursing PYQ" className="badge-type">
                  GNM
                </Link>
              </nav>
              <p className="card-description">
                Comprehensive preparation for all Jharkhand entrance exams — D2D, Polytechnic, Lateral Entry, Paramedical, ANM &amp; GNM.
              </p>
              <Link href="/exam-preparation" className="explore-category group" title="Explore all Jharkhand exam preparation categories">
                <span>Explore Category</span>
                <ArrowRight className="h-5 w-5 text-slate-900 transition-transform group-hover:translate-x-1.5" aria-hidden="true" />
              </Link>
            </article>

            {/* Bihar Card */}
            <article
              className="exam-card bihar-card transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              aria-label="Bihar exam preparation"
            >
              <div className="card-glow bihar-glow" aria-hidden="true"></div>
              <div className="card-icon" aria-hidden="true">
                <BookOpen className="h-12 w-12 text-pink-600" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mt-2">Bihar</h3>
              <nav className="exam-types my-4" aria-label="Bihar exam links">
                <Link href="/exam-preparation/bihar-polytechnic" title="Bihar BCECE Lateral Entry (BTech LE) PYQ" className="badge-type">
                  BTech (Lateral Entry)
                </Link>
                <Link href="/exam-preparation/bihar-polytechnic" title="Bihar Polytechnic PYQ" className="badge-type">
                  Polytechnic
                </Link>
              </nav>
              <p className="card-description">
                Comprehensive preparation for all Bihar state engineering exams — BCECE LE, Polytechnic and Lateral Entry.
              </p>
              <Link href="/exam-preparation" className="explore-category group" title="Explore all Bihar exam preparation categories">
                <span>Explore Category</span>
                <ArrowRight className="h-5 w-5 text-slate-900 transition-transform group-hover:translate-x-1.5" aria-hidden="true" />
              </Link>
            </article>

            {/* Uttar Pradesh Card */}
            <article
              className="exam-card up-card coming-soon cursor-not-allowed transition-all duration-300"
              aria-label="Uttar Pradesh exam preparation – coming soon"
            >
              <div className="card-glow up-glow" aria-hidden="true"></div>
              <div className="card-icon" aria-hidden="true">
                <Sparkles className="h-12 w-12 text-sky-600" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mt-2">Uttar Pradesh</h3>
              <div className="exam-types my-4">
                <span className="badge-type bg-slate-100 text-slate-500">Coming Soon</span>
              </div>
              <p className="card-description">
                Get ready for UP B.Tech Lateral Entry and Polytechnic exams — launching very soon on Futurely.
              </p>
              <div className="explore-category opacity-50">
                <span>Explore Category</span>
                <ArrowRight className="h-5 w-5 text-slate-900" aria-hidden="true" />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── TOP COLLEGES SECTION ── */}
      <section className="colleges-section py-24 bg-white" aria-label="Top colleges in Jharkhand and Bihar" id="top-colleges-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 section-header">
            <span className="bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block mb-3">
              College Insights &amp; Finder
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Top Colleges – Jharkhand &amp; Bihar
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded"></div>
            <p className="mt-4 text-slate-500 text-sm sm:text-base leading-relaxed">
              Explore cutoffs, fee structures, seat matrix, hostel facilities, and placement stats for top Polytechnic, B.Tech, and Lateral Entry colleges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Govt Polytechnic Colleges Card */}
            <article
              className="exam-card polytechnic-college-card transition-all duration-300 hover:-translate-y-2 hover:shadow-lg bg-white rounded-2xl p-6 border border-slate-200 flex flex-col justify-between"
              aria-label="Government Polytechnic Colleges"
            >
              <div>
                <div className="card-icon mb-3" aria-hidden="true">
                  <Building2 className="h-10 w-10 text-teal-600" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mt-2">Polytechnic Colleges</h3>
                <nav className="exam-types my-4 flex flex-wrap gap-1.5" aria-label="Top polytechnic college links">
                  <Link href="/diploma/gp-dhanbad" title="GP Dhanbad" className="badge-type">
                    GP Dhanbad
                  </Link>
                  <Link href="/diploma/gp-ranchi" title="GP Ranchi" className="badge-type">
                    GP Ranchi
                  </Link>
                  <Link href="/diploma/gp-adityapur" title="GP Adityapur" className="badge-type">
                    GP Adityapur
                  </Link>
                  <Link href="/diploma/gwp-ranchi" title="GWP Ranchi" className="badge-type">
                    GWP Ranchi
                  </Link>
                  <Link href="/diploma/gp-bokaro" title="GP Bokaro" className="badge-type">
                    GP Bokaro
                  </Link>
                  <Link href="/diploma/gwp-bokaro" title="GWP Bokaro" className="badge-type">
                    GWP Bokaro
                  </Link>
                  <Link href="/diploma/gwp-jamshedpur" title="GWP Jamshedpur" className="badge-type">
                    GWP Jamshedpur
                  </Link>
                </nav>
                <p className="card-description text-slate-600 text-sm leading-relaxed mb-6">
                  Complete admission details, JCECEB PECE category cutoffs, 1st-year fee structures, and campus recruiter lists.
                </p>
              </div>
              <Link href="/diploma" className="explore-category group flex items-center justify-between pt-4 border-t border-slate-100 font-extrabold text-sm text-slate-900" title="Explore all polytechnic colleges">
                <span>View All Polytechnic Colleges</span>
                <ArrowRight className="h-5 w-5 text-teal-600 transition-transform group-hover:translate-x-1.5" aria-hidden="true" />
              </Link>
            </article>

            {/* B.Tech & Lateral Entry Colleges Card */}
            <article
              className="exam-card btech-college-card transition-all duration-300 hover:-translate-y-2 hover:shadow-lg bg-white rounded-2xl p-6 border border-slate-200 flex flex-col justify-between"
              aria-label="B.Tech & Lateral Entry Colleges"
            >
              <div>
                <div className="card-icon mb-3" aria-hidden="true">
                  <School className="h-10 w-10 text-indigo-600" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mt-2">B.Tech &amp; Lateral Entry</h3>
                <nav className="exam-types my-4 flex flex-wrap gap-1.5" aria-label="B.Tech college links">
                  <Link href="/colleges" title="BIT Sindri" className="badge-type">
                    BIT Sindri
                  </Link>
                  <Link href="/colleges" title="JUT Affiliated Colleges" className="badge-type">
                    JUT Ranchi
                  </Link>
                  <Link href="/colleges" title="Ranchi University" className="badge-type">
                    RU Ranchi
                  </Link>
                </nav>
                <p className="card-description text-slate-600 text-sm leading-relaxed mb-6">
                  Direct B.Tech and Diploma-to-Degree (D2D) lateral entry seats, JCECE closing ranks, branch seat matrix, and salary packages.
                </p>
              </div>
              <Link href="/colleges" className="explore-category group flex items-center justify-between pt-4 border-t border-slate-100 font-extrabold text-sm text-slate-900" title="Explore B.Tech and Lateral Entry colleges">
                <span>View B.Tech Colleges</span>
                <ArrowRight className="h-5 w-5 text-indigo-600 transition-transform group-hover:translate-x-1.5" aria-hidden="true" />
              </Link>
            </article>

            {/* College Finder & Cutoffs Card */}
            <article
              className="exam-card finder-college-card transition-all duration-300 hover:-translate-y-2 hover:shadow-lg bg-white rounded-2xl p-6 border border-slate-200 flex flex-col justify-between"
              aria-label="College Finder & Cutoff Comparison"
            >
              <div>
                <div className="card-icon mb-3" aria-hidden="true">
                  <Building className="h-10 w-10 text-amber-600" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mt-2">College Finder</h3>
                <nav className="exam-types my-4 flex flex-wrap gap-1.5" aria-label="College finder tools">
                  <span className="badge-type bg-amber-50 text-amber-800 border border-amber-200">
                    Rank Cutoffs
                  </span>
                  <span className="badge-type bg-amber-50 text-amber-800 border border-amber-200">
                    Fee Comparison
                  </span>
                  <span className="badge-type bg-amber-50 text-amber-800 border border-amber-200">
                    Seat Matrix
                  </span>
                </nav>
                <p className="card-description text-slate-600 text-sm leading-relaxed mb-6">
                  Match your JCECEB / PECE rank with top colleges. Compare government fees, TFW waivers, hostel accommodations, and branch preferences.
                </p>
              </div>
              <Link href="/colleges" className="explore-category group flex items-center justify-between pt-4 border-t border-slate-100 font-extrabold text-sm text-slate-900" title="Open College Finder">
                <span>Open College Finder</span>
                <ArrowRight className="h-5 w-5 text-amber-600 transition-transform group-hover:translate-x-1.5" aria-hidden="true" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* ── STUDY MATERIALS & COUNSELLING ── */}
      <section className="counselling-resources-section py-24 bg-white" aria-label="Study materials and college counselling">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 section-header">
            <span className="bg-accent/15 text-accent-dark text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block mb-3">
              Elite Resources
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Study Materials &amp; Expert Counselling
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded"></div>
            <p className="mt-4 text-slate-500 text-sm sm:text-base leading-relaxed">
              Everything you need to crack your exam — from solved PYQs and chapter-wise notes to 1-on-1 expert college counselling.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Box 1 */}
            <article
              className="resource-card study-card bg-white rounded-2xl border border-slate-200 p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              aria-label="Study materials and PYQ resources"
            >
              <div className="resource-content">
                <div className="bg-indigo-50 text-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center font-bold mb-6">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Study Materials &amp; PYQ</h3>
                <p className="text-sm text-slate-500 mb-4">Complete notes, semester papers, entrance PYQs &amp; solutions</p>
                
                {/* Resource Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  <Link href="/resources" className="badge-type bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100">
                    Diploma (1st–6th Sem)
                  </Link>
                  <Link href="/resources/jharkhand-btech/semester-1" className="badge-type bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100">
                    JUT B.Tech Papers
                  </Link>
                  <Link href="/exam-preparation/jharkhand-polytechnic" className="badge-type bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100">
                    Polytechnic PYQ
                  </Link>
                  <Link href="/exam-preparation/jharkhand-d2d" className="badge-type bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100">
                    D2D PYQ
                  </Link>
                </div>

                <ul className="space-y-3.5 mb-8" aria-label="Available study resources">
                  <li className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                    <Check className="h-4.5 w-4.5 text-emerald-500 flex-shrink-0" />
                    <span>Previous Year Questions (2021–2026) Solved Papers</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                    <Check className="h-4.5 w-4.5 text-emerald-500 flex-shrink-0" />
                    <span>JUT B.Tech &amp; Diploma Semester Question Papers in PDF</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                    <Check className="h-4.5 w-4.5 text-emerald-500 flex-shrink-0" />
                    <span>Chapter-wise Notes, Formula Sheets &amp; Official Syllabus</span>
                  </li>
                </ul>
              </div>
              <Link href="/resources" className="explore-category group flex items-center justify-between pt-4 border-t border-slate-100 font-extrabold text-sm text-slate-900" title="Access Materials">
                <span>Access Materials</span>
                <ArrowRight className="h-5 w-5 text-indigo-600 transition-transform group-hover:translate-x-1.5" aria-hidden="true" />
              </Link>
            </article>

            {/* Box 2 (Featured) */}
            <article
              className="resource-card counselling-card featured bg-amber-50/50 rounded-2xl border-2 border-amber-500/20 p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              aria-label="College counselling service"
            >
              <div className="resource-content">
                <div className="bg-amber-150 text-amber-900 w-12 h-12 rounded-xl flex items-center justify-center font-bold mb-6">
                  <HeartHandshake className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">College Counselling</h3>
                <p className="text-sm text-slate-500 mb-6">Expert guidance on college selection and admission</p>
                <ul className="space-y-3.5 mb-8" aria-label="Counselling services">
                  <li className="flex items-center gap-3 text-slate-650 text-sm">
                    <Check className="h-4.5 w-4.5 text-amber-500 flex-shrink-0" />
                    <span>1-on-1 Expert Guidance</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-650 text-sm">
                    <Check className="h-4.5 w-4.5 text-amber-500 flex-shrink-0" />
                    <span>College Shortlisting</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-650 text-sm">
                    <Check className="h-4.5 w-4.5 text-amber-500 flex-shrink-0" />
                    <span>Admission Allocation Support</span>
                  </li>
                </ul>
              </div>
              <Link href="/contact" className="resource-link bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm py-3 px-6 rounded-xl text-center flex items-center justify-center gap-2 transition-all">
                <span>Register Now</span>
                <ArrowRight className="h-4 w-4 text-amber-400" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* ── FAQ ACCORDION ── */}
      <section className="faq-section py-24 bg-white" aria-label="Frequently Asked Questions about Futurely" id="faq-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block mb-3">
              Preparation Helpdesk
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950">Frequently Asked Questions</h2>
            <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded"></div>
            <p className="mt-4 text-slate-500 text-sm sm:text-base leading-relaxed">
              Everything you need to know about Futurely, Jharkhand D2D, and Polytechnic exam preparation.
            </p>
          </div>

          <div role="list" className="space-y-4" aria-label="FAQ accordion">
            {faqData.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div className="faq-item bg-transparent border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all hover:border-indigo-200" key={index} role="listitem">
                  <button
                    className="faq-question w-full text-left p-5 md:p-6 font-bold text-slate-900 flex items-center justify-between gap-4 transition-colors hover:bg-slate-50/40"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    <span className="text-sm md:text-base tracking-wide leading-snug">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-indigo-600 transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className="transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: isOpen ? "400px" : "0px",
                      opacity: isOpen ? 1 : 0,
                      overflow: "hidden"
                    }}
                  >
                    <div className="px-5 pb-5 md:px-6 md:pb-6 text-slate-600 text-xs md:text-sm leading-relaxed border-t border-slate-100 pt-4 bg-transparent">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
