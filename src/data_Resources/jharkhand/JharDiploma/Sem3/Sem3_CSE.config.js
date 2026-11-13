/* Per-branch config for Sem3_CSE.
 * Content copied verbatim from the original Sem3/Sem3_CSE.js by the Phase 3 refactor.
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
  Code2,
  Database,
  Download,
  FileCheck,
  FileText,
  HelpCircle,
  Lightbulb,
  Megaphone,
  Network,
  School,
  Share2,
  Target,
  Wrench,
  Zap,
} from "lucide-react";

import {
  SEM3_CSE_YEARS as years,
  SEM3_CSE_ALL_SUBJECTS as subjects,
  getSem3CseLink as getLink,
} from "../Sem3CseData";

const examInfoCards = [
  { icon: School, label: "Conducted By", value: "JUT Ranchi" },
  { icon: ClipboardList, label: "Branch", value: "Computer Science Engg" },
  { icon: Clock, label: "Duration", value: "3 Hours / Paper" },
  { icon: Award, label: "Total Marks", value: "100 per Subject" },
  { icon: FileCheck, label: "Pattern", value: "Internal + External" },
  { icon: BookOpen, label: "Semester", value: "3rd Semester" },
]

const studyTips = [
  { icon: Target, tip: "Solve PYQs year by year and keep one notebook for repeated concepts and common question patterns." },
  { icon: Code2, tip: "In Advanced Python Programming, focus on OOP concepts, file handling, exception handling, modules, and writing clean, working code by hand." },
  { icon: Wrench, tip: "In Computer Hardware Maintenance and Administration, revise PC assembly steps, BIOS settings, troubleshooting flowcharts, and OS installation procedures." },
  { icon: Network, tip: "In Computer Networks, focus on the OSI/TCP-IP models, IP addressing & subnetting, and the roles of routers, switches, and hubs." },
  { icon: Database, tip: "In Database System Concepts and PL/SQL, practise writing SQL queries, PL/SQL blocks, ER diagrams, and normalization examples." },
  { icon: Clock, tip: "Attempt one full paper within the 3-hour exam time so your writing speed and time management improve before the actual exam." },
]

const semLinks = [
  { label: "1st Semester", path: "/resources/jharkhand-diploma/semester-1" },
  { label: "2nd Semester", path: "/resources/jharkhand-diploma/semester-2" },
  { label: "3rd Sem — ECE", path: "/resources/jharkhand-diploma/semester-3-ece" },
  { label: "3rd Sem — EE/EEE", path: "/resources/jharkhand-diploma/semester-3-eee" },
  { label: "4th Semester", path: "/resources/jharkhand-diploma/semester-4-mech" },
  { label: "5th Semester", path: "/resources/jharkhand-diploma/semester-5" },
  { label: "6th Semester", path: "/resources/jharkhand-diploma/semester-6" },
]

const faqData = [
  {
    question: "What subjects are in Jharkhand Diploma 3rd Semester for CSE?",
    answer:
      "Jharkhand Diploma 3rd Semester for CSE (JUT Ranchi) includes 5 subjects: Advanced Python Programming, Computer Hardware Maintenance and Administration, Computer Networks, Database System Concepts and PL/SQL, and Professional Skills. All five are compulsory for CSE students.",
  },
  {
    question: "Which years of 3rd Semester CSE PYQs are available to download?",
    answer:
      "PYQs for Jharkhand Diploma 3rd Semester CSE are currently being uploaded on Futurely. More years (2021–2026) will be added as they become available. Bookmark this page and check back regularly.",
  },
  {
    question: "Are these PYQ PDFs free to download?",
    answer:
      "Yes, 100% free. No login or payment is needed. Just click the Download PDF button next to any subject and the PDF opens directly from the linked source.",
  },
  {
    question: "Who conducts the Jharkhand Diploma 3rd Semester exam?",
    answer:
      "Jharkhand Diploma semester exams are conducted by JUT Ranchi (Jharkhand University of Technology). All polytechnic colleges affiliated with JUT Ranchi follow the same syllabus and question paper pattern.",
  },
  {
    question: "Is Advanced Python Programming only for CSE branch?",
    answer:
      "Yes. Advanced Python Programming and the other 3rd Semester subjects listed here are specific to the CSE branch. Other branches like ECE, Mechanical, Civil, and EE have their own respective subject papers.",
  },
  {
    question: "How many marks is each subject?",
    answer:
      "Each subject follows the JUT pattern with both internal and external marks. The external exam is typically 3 hours per paper. Check your official syllabus or institute notice for the exact marks breakdown for the current session.",
  },
  {
    question: "How should I use PYQs to prepare effectively?",
    answer:
      "Download papers from all available years, identify repeated topics and question patterns, then practice solving them within the exam duration. Focus especially on Advanced Python Programming and Database System Concepts and PL/SQL as they carry significant weightage.",
  },
  {
    question: "Will more years of PYQs be added in the future?",
    answer:
      "Yes. Futurely keeps adding new PYQ PDFs over time. Bookmark this page and check back regularly for 2021–2025 papers when they are uploaded.",
  },
]

export const config = {
  data: { years, subjects, getLink },
  heroTitle: "3rd Semester PYQ — CSE",
  heroSubtitle: " CSE Branch &nbsp;|&nbsp; 2021–2025 &nbsp;|&nbsp; Advanced Python, Computer Networks, Database Systems ",
  heroDescBlock: (
<p className="s3-hero-desc">
            This 3rd Semester material has been carefully prepared to help
            Jharkhand Polytechnic Diploma CSE students prepare effectively for
            their examinations.
            <br />
            <span className="s3-hero-hindi">
              इसमें important questions, previous year papers तथा important topics शामिल हैं जिससे semester exam pattern और CSE branch topics की clear understanding मिल सके।
            </span>
          </p>
  ),
  subjectsAria: "3rd semester CSE",
  subjectsHeading: "3rd Semester (CSE)",
  branchPapersHeading: "CSE",
  noticeText: " CSE 3rd Semester",
  browseLead: " आप Jharkhand Polytechnic Diploma 3rd Semester CSE",
  yearPapersLabel: "3rd Semester CSE Papers",
  pdfPathSegment: "3-cse",
  badge: (
<span className="s3-type-badge branch-cse">CSE</span>
  ),
  tipsAria: "3rd semester CSE",
  tipsHeading: "3rd Semester CSE",
  faqAria: "3rd Semester CSE",
  faqLead: "3rd Semester CSE PYQs and JUT Ranchi exams",
  lastUpdated: "September",
  examInfoCards,
  studyTips,
  semLinks,
  faqData,
};

/* Badge colours stay per-branch: Sem3 and Sem4 disagree on .branch-civil. */
export const badgeCss = ".s3-type-badge.branch-cse { background: #ede9fe; color: #6d28d9; }";
