/* Per-branch config for Sem4_CIVIL.
 * Content copied verbatim from the original Sem4_CIVIL.js by the Phase 3 refactor.
 * The lucide icons below are needed HERE because this file owns the data
 * blocks that reference them.
 */
import {
  AlertTriangle,
  Award,
  BookOpen,
  BrickWall,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Clock,
  Download,
  DraftingCompass,
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
  SEM4_CIVIL_YEARS as years,
  SEM4_CIVIL_ALL_SUBJECTS as subjects,
  getSem4CivilLink as getLink,
} from "./Sem4CivilData";

const examInfoCards = [
  { icon: School, label: "Conducted By", value: "JUT Ranchi" },
  { icon: ClipboardList, label: "Branch", value: "Civil Engg (CE)" },
  { icon: Clock, label: "Duration", value: "3 Hours / Paper" },
  { icon: Award, label: "Total Marks", value: "100 per Subject" },
  { icon: FileCheck, label: "Pattern", value: "Internal + External" },
  { icon: BookOpen, label: "Semester", value: "4th Semester" },
]

const studyTips = [
  { icon: Target, tip: "Solve PYQs year by year and keep one notebook for repeated concepts and common question patterns." },
  { icon: BrickWall, tip: "In Concrete Technology, learn cement hydration, grades of concrete, mix design, and tests like slump and cube compression with neat procedure steps." },
  { icon: Ruler, tip: "In Building Estimating and Valuation, practise quantity take-off for earthwork, masonry, RCC, and finishing works along with centre-line and long-wall short-wall methods." },
  { icon: HardHat, tip: "In Site Management, revise site layout, material storage, safety norms, quality control, and bar chart and PERT/CPM basics with network diagrams." },
  { icon: DraftingCompass, tip: "In Design and Detailing of RCC Structures, practise design of beams, slabs, columns, and footings using IS 456 and draw reinforcement detailing sketches." },
  { icon: Wallet, tip: "In Mastering Personal Finance, revise budgeting, saving, investment basics, and simple financial planning numericals." },
]

const semLinks = [
  { label: "1st Semester", path: "/resources/jharkhand-diploma/semester-1" },
  { label: "2nd Semester", path: "/resources/jharkhand-diploma/semester-2" },
  { label: "3rd Sem — ECE", path: "/resources/jharkhand-diploma/semester-3-ece" },
  { label: "3rd Sem — EE/EEE", path: "/resources/jharkhand-diploma/semester-3-eee" },
  { label: "3rd Sem — CSE", path: "/resources/jharkhand-diploma/semester-3-cse" },
  { label: "3rd Sem — Mechanical", path: "/resources/jharkhand-diploma/semester-3-mech" },
  { label: "3rd Sem — Civil", path: "/resources/jharkhand-diploma/semester-3-civil" },
  { label: "5th Semester", path: "/resources/jharkhand-diploma/semester-5" },
  { label: "6th Semester", path: "/resources/jharkhand-diploma/semester-6" },
]

const faqData = [
  {
    question: "What subjects are in Jharkhand Diploma 4th Semester for Civil Engineering?",
    answer:
      "Jharkhand Diploma 4th Semester for Civil Engineering (CE) at JUT Ranchi includes 5 subjects: Concrete Technology, Building Estimating and Valuation, Site Management, Design and Detailing of RCC Structures, and Mastering Personal Finance. All five are compulsory for Civil students.",
  },
  {
    question: "Which years of 4th Semester Civil PYQs are available to download?",
    answer:
      "PYQs for Jharkhand Diploma 4th Semester Civil Engineering are currently being uploaded on Futurely. More years (2021–2026) will be added as they become available. Bookmark this page and check back regularly.",
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
    question: "Is Concrete Technology only for Civil branch?",
    answer:
      "Yes. Concrete Technology and the other 4th Semester subjects listed here are specific to the Civil branch. Other branches like CSE, ECE, Mechanical, and EE have their own respective subject papers.",
  },
  {
    question: "How many marks is each subject?",
    answer:
      "Each subject follows the JUT pattern with both internal and external marks. The external exam is typically 3 hours per paper. Check your official syllabus or institute notice for the exact marks breakdown for the current session.",
  },
  {
    question: "How should I use PYQs to prepare effectively?",
    answer:
      "Download papers from all available years, identify repeated topics and question patterns, then practice solving them within the exam duration. Focus especially on Concrete Technology and Design and Detailing of RCC Structures as they carry significant weightage.",
  },
  {
    question: "Will more years of PYQs be added in the future?",
    answer:
      "Yes. Futurely keeps adding new PYQ PDFs over time. Bookmark this page and check back regularly for 2021–2025 papers when they are uploaded.",
  },
]

export const config = {
  data: { years, subjects, getLink },
  heroTitle: "4th Semester PYQ — Civil (CE)",
  heroSubtitle: " Civil Branch &nbsp;|&nbsp; 2021–2025 &nbsp;|&nbsp; Concrete Technology, Estimating, RCC Design ",
  heroDescBlock: (
<p className="s3-hero-desc">
            This 4th Semester material has been carefully prepared to help
            Jharkhand Polytechnic Diploma Civil Engineering (CE)
            students prepare effectively for their examinations.
            <br />
            <span className="s3-hero-hindi">
              इसमें important questions, previous year papers तथा important topics शामिल हैं जिससे semester exam pattern और Civil branch topics की clear understanding मिल सके।
            </span>
          </p>
  ),
  subjectsAria: "4th semester Civil",
  subjectsHeading: "4th Semester (Civil)",
  branchPapersHeading: "Civil",
  noticeText: " Civil 4th Semester",
  browseLead: " आप Jharkhand Polytechnic Diploma 4th Semester Civil",
  yearPapersLabel: "4th Semester Civil Papers",
  pdfPathSegment: "4-civil",
  badge: (
<span className="s3-type-badge branch-civil">CE</span>
  ),
  tipsAria: "4th semester Civil",
  tipsHeading: "4th Semester Civil",
  faqAria: "4th Semester Civil",
  faqLead: "4th Semester Civil PYQs and JUT Ranchi exams",
  lastUpdated: "September",
  examInfoCards,
  studyTips,
  semLinks,
  faqData,
};

/* Badge colours stay per-branch: Sem3 and Sem4 disagree on .branch-civil. */
export const badgeCss = ".s3-type-badge.branch-civil { background: #dbeafe; color: #1e40af; }";
