/* Per-branch config for Sem4_EEE.
 * Content copied verbatim from the original Sem4_EEE.js by the Phase 3 refactor.
 * The lucide icons below are needed HERE because this file owns the data
 * blocks that reference them.
 */
import {
  AlertTriangle,
  Award,
  BookOpen,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Clock,
  Cpu,
  Download,
  DraftingCompass,
  FileCheck,
  FileText,
  Gauge,
  HelpCircle,
  Lightbulb,
  Megaphone,
  Power,
  School,
  Share2,
  Target,
  Wallet,
  Zap,
} from "lucide-react";

import {
  SEM4_EEE_YEARS as years,
  SEM4_EEE_ALL_SUBJECTS as subjects,
  getSem4EeeLink as getLink,
} from "./Sem4EeeData";

const examInfoCards = [
  { icon: School, label: "Conducted By", value: "JUT Ranchi" },
  { icon: ClipboardList, label: "Branch", value: "Electrical / EE & EEE Engg" },
  { icon: Clock, label: "Duration", value: "3 Hours / Paper" },
  { icon: Award, label: "Total Marks", value: "100 per Subject" },
  { icon: FileCheck, label: "Pattern", value: "Internal + External" },
  { icon: BookOpen, label: "Semester", value: "4th Semester" },
]

const studyTips = [
  { icon: Target, tip: "Solve PYQs year by year and keep one notebook for repeated concepts and common question patterns." },
  { icon: Power, tip: "In Power Electronics, master SCR/MOSFET/IGBT characteristics, rectifiers, choppers, and inverters with waveform diagrams and numericals." },
  { icon: DraftingCompass, tip: "In Computer Aided Electrical Drafting, practice AutoCAD drawing commands and create single-line diagrams, panel layouts, and cable routing drawings." },
  { icon: Cpu, tip: "In Fundamentals of Automation Technology, revise PLC architecture, ladder logic basics, sensors/actuators, and open vs closed loop control with block diagrams." },
  { icon: Gauge, tip: "In Electric Motors, compare DC, induction, and synchronous motors with torque-slip characteristics, speed control methods, and starter circuits." },
  { icon: Wallet, tip: "In Mastering Personal Finance, revise budgeting, saving, investment basics, and simple financial planning numericals." },
]

const semLinks = [
  { label: "1st Semester", path: "/resources/jharkhand-diploma/semester-1" },
  { label: "2nd Semester", path: "/resources/jharkhand-diploma/semester-2" },
  { label: "3rd Sem — ECE", path: "/resources/jharkhand-diploma/semester-3-ece" },
  { label: "3rd Sem — EE/EEE", path: "/resources/jharkhand-diploma/semester-3-eee" },
  { label: "3rd Sem — CSE", path: "/resources/jharkhand-diploma/semester-3-cse" },
  { label: "3rd Sem — Mechanical", path: "/resources/jharkhand-diploma/semester-3-mech" },
  { label: "5th Semester", path: "/resources/jharkhand-diploma/semester-5" },
  { label: "6th Semester", path: "/resources/jharkhand-diploma/semester-6" },
]

const faqData = [
  {
    question: "What subjects are in Jharkhand Diploma 4th Semester for EE/EEE?",
    answer:
      "Jharkhand Diploma 4th Semester for Electrical Engineering (EE) and Electrical and Electronics Engineering (EEE) at JUT Ranchi includes 5 subjects: Power Electronics, Computer Aided Electrical Drafting, Fundamentals of Automation Technology, Electric Motors, and Mastering Personal Finance. All five are compulsory for EE and EEE students.",
  },
  {
    question: "Is this page for EE branch or EEE branch?",
    answer:
      "This page covers both Electrical Engineering (EE) and Electrical and Electronics Engineering (EEE) branches. Both branches follow the same 4th Semester syllabus and question papers under JUT Ranchi.",
  },
  {
    question: "Which years of 4th Semester EE/EEE PYQs are available to download?",
    answer:
      "PYQs for Jharkhand Diploma 4th Semester EE/EEE are currently being uploaded on Futurely. More years (2021–2026) will be added as they become available. Bookmark this page and check back regularly.",
  },
  {
    question: "Are these PYQ PDFs free to download?",
    answer:
      "Yes, 100% free. No login or payment is needed. Just click the Download PDF button next to any subject and the PDF opens directly from the linked source.",
  },
  {
    question: "Who conducts the Jharkhand Diploma 4th Semester exam?",
    answer:
      "Jharkhand Diploma semester exams are conducted by JUT Ranchi (Jharkhand University of Technology). All polytechnic colleges affiliated with JUT Ranchi follow the same syllabus and question paper pattern.",
  },
  {
    question: "Is Power Electronics only for Electrical branch?",
    answer:
      "No. Power Electronics is a core subject for EE/EEE, but it also helps ECE students understand converters and inverters. The 4th Semester subjects listed here are specific to the Electrical branch; other branches like CSE, ECE, Civil, and Mechanical have their own subject papers.",
  },
  {
    question: "How many marks is each subject?",
    answer:
      "Each subject follows the JUT pattern with both internal and external marks. The external exam is typically 3 hours per paper. Check your official syllabus or institute notice for the exact marks breakdown for the current session.",
  },
  {
    question: "How should I use PYQs to prepare effectively?",
    answer:
      "Download papers from all available years, identify repeated topics and question patterns, then practice solving them within the exam duration. Focus especially on Power Electronics and Electric Motors as they carry significant weightage.",
  },
  {
    question: "Will more years of PYQs be added in the future?",
    answer:
      "Yes. Futurely keeps adding new PYQ PDFs over time. Bookmark this page and check back regularly for 2021–2025 papers when they are uploaded.",
  },
]

export const config = {
  data: { years, subjects, getLink },
  heroTitle: "4th Semester PYQ — EE / EEE",
  heroSubtitle: " EE &amp; EEE Branch &nbsp;|&nbsp; 2021–2025 &nbsp;|&nbsp; Power Electronics, Electric Motors, Drafting ",
  heroDescBlock: (
<p className="s3-hero-desc">
            This 4th Semester material has been carefully prepared to help
            Jharkhand Polytechnic Diploma Electrical Engineering (EE and EEE)
            students prepare effectively for their examinations.
            <br />
            <span className="s3-hero-hindi">
              इसमें important questions, previous year papers तथा important topics शामिल हैं जिससे semester exam pattern और EE/EEE branch topics की clear understanding मिल सके।
            </span>
          </p>
  ),
  subjectsAria: "4th semester Electrical EE EEE",
  subjectsHeading: "4th Semester (EE / EEE)",
  branchPapersHeading: "EE / EEE",
  noticeText: " EE/EEE 4th Semester",
  browseLead: " आप Jharkhand Polytechnic Diploma 4th Semester EE/EEE",
  yearPapersLabel: "4th Semester EE / EEE Papers",
  pdfPathSegment: "4-eee",
  badge: (
<span className="s3-type-badge branch-eee">EE / EEE</span>
  ),
  tipsAria: "4th semester Electrical EE EEE",
  tipsHeading: "4th Semester EE / EEE",
  faqAria: "4th Semester Electrical EE EEE",
  faqLead: "4th Semester EE/EEE PYQs and JUT Ranchi exams",
  lastUpdated: "September",
  examInfoCards,
  studyTips,
  semLinks,
  faqData,
};

/* Badge colours stay per-branch: Sem3 and Sem4 disagree on .branch-civil. */
export const badgeCss = ".s3-type-badge.branch-eee { background: #fee2e2; color: #991b1b; }";
