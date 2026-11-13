/* Per-branch config for Sem4_MECH.
 * Content copied verbatim from the original Sem4_MECH.js by the Phase 3 refactor.
 * The lucide icons below are needed HERE because this file owns the data
 * blocks that reference them.
 */
import {
  AlertTriangle,
  Award,
  BookOpen,
  Bot,
  Boxes,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Clock,
  Cpu,
  Download,
  FileCheck,
  FileText,
  HelpCircle,
  Lightbulb,
  Megaphone,
  PenTool,
  School,
  Share2,
  Target,
  Wallet,
  Zap,
} from "lucide-react";

import {
  SEM4_MECH_YEARS as years,
  SEM4_MECH_ALL_SUBJECTS as subjects,
  getSem4MechLink as getLink,
} from "./Sem4MechData";

const examInfoCards = [
  { icon: School, label: "Conducted By", value: "JUT Ranchi" },
  { icon: ClipboardList, label: "Branch", value: "Mechanical Engg" },
  { icon: Clock, label: "Duration", value: "3 Hours / Paper" },
  { icon: Award, label: "Total Marks", value: "100 per Subject" },
  { icon: FileCheck, label: "Pattern", value: "Internal + External" },
  { icon: BookOpen, label: "Semester", value: "4th Semester" },
]

const studyTips = [
  { icon: Target, tip: "Solve PYQs year by year and keep one notebook for repeated concepts and common question patterns." },
  { icon: Boxes, tip: "In Operations Management, focus on production planning, inventory control techniques (EOQ, JIT), and process layout diagrams with scheduling numericals." },
  { icon: Cpu, tip: "In CNC Programming and Machining, practice G-code and M-code programs for turning and milling along with tool offset and work coordinate concepts." },
  { icon: PenTool, tip: "In Product Design and Development, learn the design process stages, concurrent engineering, and QFD with diagrams." },
  { icon: Bot, tip: "In Elements of Industrial Automation, master PLC ladder logic basics, sensor/actuator types, and automation system block diagrams." },
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
    question: "What subjects are in Jharkhand Diploma 4th Semester for Mechanical (ME)?",
    answer:
      "Jharkhand Diploma 4th Semester for Mechanical Engineering (JUT Ranchi) includes 5 subjects: Operations Management, CNC Programming and Machining, Product Design and Development, Elements of Industrial Automation, and Mastering Personal Finance. All five are compulsory for Mechanical students.",
  },
  {
    question: "Which years of 4th Semester Mechanical PYQs are available to download?",
    answer:
      "PYQs for Jharkhand Diploma 4th Semester Mechanical are currently being uploaded on Futurely. More years (2021–2026) will be added as they become available. Bookmark this page and check back regularly.",
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
    question: "Is CNC Programming and Machining only for Mechanical branch?",
    answer:
      "Yes. CNC Programming and Machining and the other 4th Semester subjects listed here are specific to the Mechanical branch. Other branches like CSE, ECE, Civil, and EE have their own respective subject papers.",
  },
  {
    question: "How many marks is each subject?",
    answer:
      "Each subject follows the JUT pattern with both internal and external marks. The external exam is typically 3 hours per paper. Check your official syllabus or institute notice for the exact marks breakdown for the current session.",
  },
  {
    question: "How should I use PYQs to prepare effectively?",
    answer:
      "Download papers from all available years, identify repeated topics and question patterns, then practice solving them within the exam duration. Focus especially on Operations Management and CNC Programming and Machining as they carry significant weightage.",
  },
  {
    question: "Will more years of PYQs be added in the future?",
    answer:
      "Yes. Futurely keeps adding new PYQ PDFs over time. Bookmark this page and check back regularly for 2021–2025 papers when they are uploaded.",
  },
]

export const config = {
  data: { years, subjects, getLink },
  heroTitle: "4th Semester PYQ — Mechanical (ME)",
  heroSubtitle: " Mechanical Branch &nbsp;|&nbsp; 2021–2025 &nbsp;|&nbsp; Operations Management, CNC Programming, Product Design ",
  heroDescBlock: (
<p className="s3-hero-desc">
            This 4th Semester material has been carefully prepared to help
            Jharkhand Polytechnic Diploma Mechanical students prepare effectively for
            their examinations.
            <br />
            <span className="s3-hero-hindi">
              इसमें important questions, previous year papers तथा important topics शामिल हैं जिससे semester exam pattern और Mechanical branch topics की clear understanding मिल सके।
            </span>
          </p>
  ),
  subjectsAria: "4th semester Mechanical",
  subjectsHeading: "4th Semester (Mechanical)",
  branchPapersHeading: "Mechanical",
  noticeText: " Mechanical 4th Semester",
  browseLead: " आप Jharkhand Polytechnic Diploma 4th Semester Mechanical",
  yearPapersLabel: "4th Semester Mechanical Papers",
  pdfPathSegment: "4-mech",
  badge: (
<span className="s3-type-badge branch-mech">ME</span>
  ),
  tipsAria: "4th semester Mechanical",
  tipsHeading: "4th Semester Mechanical",
  faqAria: "4th Semester Mechanical",
  faqLead: "4th Semester Mechanical PYQs and JUT Ranchi exams",
  lastUpdated: "September",
  examInfoCards,
  studyTips,
  semLinks,
  faqData,
};

/* Badge colours stay per-branch: Sem3 and Sem4 disagree on .branch-civil. */
export const badgeCss = ".s3-type-badge.branch-mech { background: #ffedd5; color: #c2410c; }";
