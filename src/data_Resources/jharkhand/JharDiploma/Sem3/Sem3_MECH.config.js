/* Per-branch config for Sem3_MECH.
 * Content copied verbatim from the original Sem3/Sem3_MECH.js by the Phase 3 refactor.
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
  Download,
  Droplets,
  Factory,
  FileCheck,
  FileText,
  HelpCircle,
  Lightbulb,
  Megaphone,
  Ruler,
  School,
  Share2,
  Target,
  Wrench,
  Zap,
} from "lucide-react";

import {
  SEM3_MECH_YEARS as years,
  SEM3_MECH_ALL_SUBJECTS as subjects,
  getSem3MechLink as getLink,
} from "../Sem3MechData";

const examInfoCards = [
  { icon: School, label: "Conducted By", value: "JUT Ranchi" },
  { icon: ClipboardList, label: "Branch", value: "Mechanical Engg" },
  { icon: Clock, label: "Duration", value: "3 Hours / Paper" },
  { icon: Award, label: "Total Marks", value: "100 per Subject" },
  { icon: FileCheck, label: "Pattern", value: "Internal + External" },
  { icon: BookOpen, label: "Semester", value: "3rd Semester" },
]

const studyTips = [
  { icon: Target, tip: "Solve PYQs year by year and keep one notebook for repeated concepts and common question patterns." },
  { icon: Ruler, tip: "In Mechanics of Materials, focus on stress-strain diagrams, bending moment and shear force calculations, and numerical problems on torsion and deflection." },
  { icon: Wrench, tip: "In Machine Tool Technology, revise lathe, milling, and drilling machine construction diagrams along with cutting tool geometry and machining operations." },
  { icon: Factory, tip: "In Manufacturing Processes, learn casting, welding, and forming process diagrams along with their advantages, limitations, and applications." },
  { icon: Droplets, tip: "In Fluid Power Engineering, master hydraulic and pneumatic circuit diagrams, Pascal's law numericals, and components like pumps, valves, and actuators." },
  { icon: Clock, tip: "Attempt one full paper within the 3-hour exam time so your writing speed and time management improve before the actual exam." },
]

const semLinks = [
  { label: "1st Semester", path: "/resources/jharkhand-diploma/semester-1" },
  { label: "2nd Semester", path: "/resources/jharkhand-diploma/semester-2" },
  { label: "3rd Sem — ECE", path: "/resources/jharkhand-diploma/semester-3-ece" },
  { label: "3rd Sem — EE/EEE", path: "/resources/jharkhand-diploma/semester-3-eee" },
  { label: "3rd Sem — CSE", path: "/resources/jharkhand-diploma/semester-3-cse" },
  { label: "4th Semester", path: "/resources/jharkhand-diploma/semester-4-mech" },
  { label: "5th Semester", path: "/resources/jharkhand-diploma/semester-5" },
  { label: "6th Semester", path: "/resources/jharkhand-diploma/semester-6" },
]

const faqData = [
  {
    question: "What subjects are in Jharkhand Diploma 3rd Semester for Mechanical (ME)?",
    answer:
      "Jharkhand Diploma 3rd Semester for Mechanical Engineering (JUT Ranchi) includes 5 subjects: Mechanics of Materials, Machine Tool Technology, Manufacturing Processes, Fluid Power Engineering, and Professional Skills. All five are compulsory for Mechanical students.",
  },
  {
    question: "Which years of 3rd Semester Mechanical PYQs are available to download?",
    answer:
      "PYQs for Jharkhand Diploma 3rd Semester Mechanical are currently being uploaded on Futurely. More years (2021–2026) will be added as they become available. Bookmark this page and check back regularly.",
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
    question: "Is Mechanics of Materials only for Mechanical branch?",
    answer:
      "Yes. Mechanics of Materials and the other 3rd Semester subjects listed here are specific to the Mechanical branch. Other branches like CSE, ECE, Civil, and EE have their own respective subject papers.",
  },
  {
    question: "How many marks is each subject?",
    answer:
      "Each subject follows the JUT pattern with both internal and external marks. The external exam is typically 3 hours per paper. Check your official syllabus or institute notice for the exact marks breakdown for the current session.",
  },
  {
    question: "How should I use PYQs to prepare effectively?",
    answer:
      "Download papers from all available years, identify repeated topics and question patterns, then practice solving them within the exam duration. Focus especially on Mechanics of Materials and Manufacturing Processes as they carry significant weightage.",
  },
  {
    question: "Will more years of PYQs be added in the future?",
    answer:
      "Yes. Futurely keeps adding new PYQ PDFs over time. Bookmark this page and check back regularly for 2021–2025 papers when they are uploaded.",
  },
]

export const config = {
  data: { years, subjects, getLink },
  heroTitle: "3rd Semester PYQ — Mechanical (ME)",
  heroSubtitle: " Mechanical Branch &nbsp;|&nbsp; 2021–2025 &nbsp;|&nbsp; Mechanics of Materials, Machine Tools, Manufacturing ",
  heroDescBlock: (
<p className="s3-hero-desc">
            This 3rd Semester material has been carefully prepared to help
            Jharkhand Polytechnic Diploma Mechanical students prepare effectively for
            their examinations.
            <br />
            <span className="s3-hero-hindi">
              इसमें important questions, previous year papers तथा important topics शामिल हैं जिससे semester exam pattern और Mechanical branch topics की clear understanding मिल सके।
            </span>
          </p>
  ),
  subjectsAria: "3rd semester Mechanical",
  subjectsHeading: "3rd Semester (Mechanical)",
  branchPapersHeading: "Mechanical",
  noticeText: " Mechanical 3rd Semester",
  browseLead: " आप Jharkhand Polytechnic Diploma 3rd Semester Mechanical",
  yearPapersLabel: "3rd Semester Mechanical Papers",
  pdfPathSegment: "3-mech",
  badge: (
<span className="s3-type-badge branch-mech">ME</span>
  ),
  tipsAria: "3rd semester Mechanical",
  tipsHeading: "3rd Semester Mechanical",
  faqAria: "3rd Semester Mechanical",
  faqLead: "3rd Semester Mechanical PYQs and JUT Ranchi exams",
  lastUpdated: "September",
  examInfoCards,
  studyTips,
  semLinks,
  faqData,
};

/* Badge colours stay per-branch: Sem3 and Sem4 disagree on .branch-civil. */
export const badgeCss = ".s3-type-badge.branch-mech { background: #ffedd5; color: #c2410c; }";
