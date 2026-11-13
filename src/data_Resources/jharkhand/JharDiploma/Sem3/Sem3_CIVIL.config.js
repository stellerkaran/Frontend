/* Per-branch config for Sem3_CIVIL.
 * Content copied verbatim from the original Sem3/Sem3_CIVIL.js by the Phase 3 refactor.
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
  Compass,
  Cpu,
  Download,
  FileCheck,
  FileText,
  HardHat,
  HelpCircle,
  Lightbulb,
  Megaphone,
  Ruler,
  School,
  Share2,
  Target,
  Wallet,
  Zap,
} from "lucide-react";

import {
  SEM3_CIVIL_YEARS as years,
  SEM3_CIVIL_ALL_SUBJECTS as subjects,
  getSem3CivilLink as getLink,
} from "../Sem3CivilData";

const examInfoCards = [
  { icon: School, label: "Conducted By", value: "JUT Ranchi" },
  { icon: ClipboardList, label: "Branch", value: "Civil Engg (CE)" },
  { icon: Clock, label: "Duration", value: "3 Hours / Paper" },
  { icon: Award, label: "Total Marks", value: "100 per Subject" },
  { icon: FileCheck, label: "Pattern", value: "Internal + External" },
  { icon: BookOpen, label: "Semester", value: "3rd Semester" },
]

const studyTips = [
  { icon: Target, tip: "Solve PYQs year by year and keep one notebook for repeated concepts and common question patterns." },
  { icon: Cpu, tip: "In Engineering Mechanics and Strength of Materials, practice free-body diagrams, resultant and equilibrium, and numericals on stress-strain, bending moment, shear force, and beam deflection." },
  { icon: Ruler, tip: "In Building Drawing using CAD, practise AutoCAD drawing commands and create plan, elevation, and section views with proper dimensioning and layer management." },
  { icon: Compass, tip: "In Modern Surveying, master chain, compass, and theodolite traversing, levelling and contouring, plus total station and GPS basics with instrument diagrams." },
  { icon: HardHat, tip: "In Construction Techniques, revise foundations, masonry, concrete technology, and formwork with construction stage diagrams for RCC buildings." },
  { icon: Wallet, tip: "In Professional Skills, use clear formatting, professional vocabulary, and structured point-wise answers for workplace communication and case study questions." },
]

const semLinks = [
  { label: "1st Semester", path: "/resources/jharkhand-diploma/semester-1" },
  { label: "2nd Semester", path: "/resources/jharkhand-diploma/semester-2" },
  { label: "3rd Sem — ECE", path: "/resources/jharkhand-diploma/semester-3-ece" },
  { label: "3rd Sem — EE/EEE", path: "/resources/jharkhand-diploma/semester-3-eee" },
  { label: "3rd Sem — CSE", path: "/resources/jharkhand-diploma/semester-3-cse" },
  { label: "3rd Sem — Mechanical", path: "/resources/jharkhand-diploma/semester-3-mech" },
  { label: "4th Semester", path: "/resources/jharkhand-diploma/semester-4-mech" },
  { label: "5th Semester", path: "/resources/jharkhand-diploma/semester-5" },
  { label: "6th Semester", path: "/resources/jharkhand-diploma/semester-6" },
]

const faqData = [
  {
    question: "What subjects are in Jharkhand Diploma 3rd Semester for Civil Engineering?",
    answer:
      "Jharkhand Diploma 3rd Semester for Civil Engineering (CE) at JUT Ranchi includes 5 subjects: Engineering Mechanics and Strength of Materials, Building Drawing using CAD, Modern Surveying, Construction Techniques, and Professional Skills. All five are compulsory for Civil students.",
  },
  {
    question: "Which years of 3rd Semester Civil PYQs are available to download?",
    answer:
      "PYQs for Jharkhand Diploma 3rd Semester Civil Engineering are currently being uploaded on Futurely. More years (2021–2026) will be added as they become available. Bookmark this page and check back regularly.",
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
    question: "Is Building Drawing using CAD only for Civil branch?",
    answer:
      "Yes. Building Drawing using CAD and the other 3rd Semester subjects listed here are specific to the Civil branch. Other branches like CSE, ECE, Mechanical, and EE have their own respective subject papers.",
  },
  {
    question: "How many marks is each subject?",
    answer:
      "Each subject follows the JUT pattern with both internal and external marks. The external exam is typically 3 hours per paper. Check your official syllabus or institute notice for the exact marks breakdown for the current session.",
  },
  {
    question: "How should I use PYQs to prepare effectively?",
    answer:
      "Download papers from all available years, identify repeated topics and question patterns, then practice solving them within the exam duration. Focus especially on Engineering Mechanics and Strength of Materials and Modern Surveying as they carry significant weightage.",
  },
  {
    question: "Will more years of PYQs be added in the future?",
    answer:
      "Yes. Futurely keeps adding new PYQ PDFs over time. Bookmark this page and check back regularly for 2021–2025 papers when they are uploaded.",
  },
]

export const config = {
  data: { years, subjects, getLink },
  heroTitle: "3rd Semester PYQ — Civil (CE)",
  heroSubtitle: " Civil Branch &nbsp;|&nbsp; 2021–2025 &nbsp;|&nbsp; Strength of Materials, Surveying, Construction ",
  heroDescBlock: (
<p className="s3-hero-desc">
            This 3rd Semester material has been carefully prepared to help
            Jharkhand Polytechnic Diploma Civil Engineering (CE) students prepare
            effectively for their examinations.
            <br />
            <span className="s3-hero-hindi">
              इसमें important questions, previous year papers तथा important topics शामिल हैं जिससे semester exam pattern और Civil branch topics की clear understanding मिल सके।
            </span>
          </p>
  ),
  subjectsAria: "3rd semester Civil",
  subjectsHeading: "3rd Semester (Civil)",
  branchPapersHeading: "Civil",
  noticeText: " Civil 3rd Semester",
  browseLead: " आप Jharkhand Polytechnic Diploma 3rd Semester Civil",
  yearPapersLabel: "3rd Semester Civil Papers",
  pdfPathSegment: "3-civil",
  badge: (
<span className="s3-type-badge branch-civil">CE</span>
  ),
  tipsAria: "3rd semester Civil",
  tipsHeading: "3rd Semester Civil",
  faqAria: "3rd Semester Civil",
  faqLead: "3rd Semester Civil PYQs and JUT Ranchi exams",
  lastUpdated: "June",
  examInfoCards,
  studyTips,
  semLinks,
  faqData,
};

/* Badge colours stay per-branch: Sem3 and Sem4 disagree on .branch-civil. */
export const badgeCss = ".s3-type-badge.branch-civil { background: #fde8d7; color: #9a5b1b; }";
