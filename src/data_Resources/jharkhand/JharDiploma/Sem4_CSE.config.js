/* Per-branch config for Sem4_CSE.
 * Content copied verbatim from the original Sem4_CSE.js by the Phase 3 refactor.
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
  Coffee,
  Download,
  FileCheck,
  FileText,
  HelpCircle,
  Layers,
  Lightbulb,
  ListTree,
  Megaphone,
  School,
  Share2,
  Target,
  Terminal,
  Wallet,
  Zap,
} from "lucide-react";

import {
  SEM4_CSE_YEARS as years,
  SEM4_CSE_ALL_SUBJECTS as subjects,
  getSem4CseLink as getLink,
} from "./Sem4CseData";

const examInfoCards = [
  { icon: School, label: "Conducted By", value: "JUT Ranchi" },
  { icon: ClipboardList, label: "Branch", value: "Computer Science Engg" },
  { icon: Clock, label: "Duration", value: "3 Hours / Paper" },
  { icon: Award, label: "Total Marks", value: "100 per Subject" },
  { icon: FileCheck, label: "Pattern", value: "Internal + External" },
  { icon: BookOpen, label: "Semester", value: "4th Semester" },
]

const studyTips = [
  { icon: Target, tip: "Solve PYQs year by year and keep one notebook for repeated concepts and common question patterns." },
  { icon: ListTree, tip: "In Data Structures with Python, practice implementing arrays, linked lists, stacks, queues, and trees along with time-complexity analysis." },
  { icon: Terminal, tip: "In Operating System and Administration, revise process scheduling, memory management techniques, and basic Linux/Windows admin commands." },
  { icon: Coffee, tip: "In Object Oriented Programming and Design with Java, master inheritance, polymorphism, and encapsulation with simple design pattern examples." },
  { icon: Layers, tip: "In Software Engineering Principles and Practices, learn the SDLC models, requirement analysis techniques, and UML diagrams." },
  { icon: Wallet, tip: "In Mastering Personal Finance, revise budgeting, saving, investment basics, and simple financial planning numericals." },
]

const semLinks = [
  { label: "1st Semester", path: "/resources/jharkhand-diploma/semester-1" },
  { label: "2nd Semester", path: "/resources/jharkhand-diploma/semester-2" },
  { label: "3rd Sem — ECE", path: "/resources/jharkhand-diploma/semester-3-ece" },
  { label: "3rd Sem — EE/EEE", path: "/resources/jharkhand-diploma/semester-3-eee" },
  { label: "3rd Sem — CSE", path: "/resources/jharkhand-diploma/semester-3-cse" },
  { label: "3rd Sem — Mechanical", path: "/resources/jharkhand-diploma/semester-3-mech" },
  { label: "4th Sem — Mechanical", path: "/resources/jharkhand-diploma/semester-4-mech" },
  { label: "5th Semester", path: "/resources/jharkhand-diploma/semester-5" },
  { label: "6th Semester", path: "/resources/jharkhand-diploma/semester-6" },
]

const faqData = [
  {
    question: "What subjects are in Jharkhand Diploma 4th Semester for CSE?",
    answer:
      "Jharkhand Diploma 4th Semester for CSE (JUT Ranchi) includes 5 subjects: Data Structures with Python, Operating System and Administration, Object Oriented Programming and Design with Java, Software Engineering Principles and Practices, and Mastering Personal Finance. All five are compulsory for CSE students.",
  },
  {
    question: "Which years of 4th Semester CSE PYQs are available to download?",
    answer:
      "PYQs for Jharkhand Diploma 4th Semester CSE are currently being uploaded on Futurely. More years (2021–2026) will be added as they become available. Bookmark this page and check back regularly.",
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
    question: "Is Data Structures with Python only for CSE branch?",
    answer:
      "Yes. Data Structures with Python and the other 4th Semester subjects listed here are specific to the CSE branch. Other branches like ECE, Mechanical, Civil, and EE have their own respective subject papers.",
  },
  {
    question: "How many marks is each subject?",
    answer:
      "Each subject follows the JUT pattern with both internal and external marks. The external exam is typically 3 hours per paper. Check your official syllabus or institute notice for the exact marks breakdown for the current session.",
  },
  {
    question: "How should I use PYQs to prepare effectively?",
    answer:
      "Download papers from all available years, identify repeated topics and question patterns, then practice solving them within the exam duration. Focus especially on Data Structures with Python and Object Oriented Programming and Design with Java as they carry significant weightage.",
  },
  {
    question: "Will more years of PYQs be added in the future?",
    answer:
      "Yes. Futurely keeps adding new PYQ PDFs over time. Bookmark this page and check back regularly for 2021–2025 papers when they are uploaded.",
  },
]

export const config = {
  data: { years, subjects, getLink },
  heroTitle: "4th Semester PYQ — CSE",
  heroSubtitle: " CSE Branch &nbsp;|&nbsp; 2021–2025 &nbsp;|&nbsp; Data Structures, Operating Systems, Java OOP ",
  heroDescBlock: (
<p className="s3-hero-desc">
            This 4th Semester material has been carefully prepared to help
            Jharkhand Polytechnic Diploma CSE students prepare effectively for
            their examinations.
            <br />
            <span className="s3-hero-hindi">
              इसमें important questions, previous year papers तथा important topics शामिल हैं जिससे semester exam pattern और CSE branch topics की clear understanding मिल सके।
            </span>
          </p>
  ),
  subjectsAria: "4th semester CSE",
  subjectsHeading: "4th Semester (CSE)",
  branchPapersHeading: "CSE",
  noticeText: " CSE 4th Semester",
  browseLead: " आप Jharkhand Polytechnic Diploma 4th Semester CSE",
  yearPapersLabel: "4th Semester CSE Papers",
  pdfPathSegment: "4-cse",
  badge: (
<span className="s3-type-badge branch-cse">CSE</span>
  ),
  tipsAria: "4th semester CSE",
  tipsHeading: "4th Semester CSE",
  faqAria: "4th Semester CSE",
  faqLead: "4th Semester CSE PYQs and JUT Ranchi exams",
  lastUpdated: "September",
  examInfoCards,
  studyTips,
  semLinks,
  faqData,
};

/* Badge colours stay per-branch: Sem3 and Sem4 disagree on .branch-civil. */
export const badgeCss = ".s3-type-badge.branch-cse { background: #ede9fe; color: #6d28d9; }";
