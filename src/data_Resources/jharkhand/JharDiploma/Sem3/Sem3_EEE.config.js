/* Per-branch config for Sem3_EEE.
 * Content copied verbatim from the original Sem3/Sem3_EEE.js by the Phase 3 refactor.
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
  FileCheck,
  FileText,
  HelpCircle,
  Lightbulb,
  Megaphone,
  Power,
  School,
  Share2,
  Shield,
  Target,
  Zap,
} from "lucide-react";

import {
  SEM3_EEE_YEARS as years,
  SEM3_EEE_ALL_SUBJECTS as subjects,
  getSem3EeeLink as getLink,
} from "../Sem3EeeData";

const examInfoCards = [
  { icon: School, label: "Conducted By", value: "JUT Ranchi" },
  { icon: ClipboardList, label: "Branch", value: "Electrical / EE & EEE Engg" },
  { icon: Clock, label: "Duration", value: "3 Hours / Paper" },
  { icon: Award, label: "Total Marks", value: "100 per Subject" },
  { icon: FileCheck, label: "Pattern", value: "Internal + External" },
  { icon: BookOpen, label: "Semester", value: "3rd Semester" },
]

const studyTips = [
  { icon: Target, tip: "Solve Previous Year Question Papers year by year and keep one notebook for repeated concepts and common question patterns." },
  { icon: Zap, tip: "In Basic of Electrical Power System, focus on generation types, power factor, load curves, tariffs, and per-unit system." },
  { icon: Power, tip: "In Transmission and Distribution, revise overhead line parameters, ABCD constants, sag calculation, and distribution systems (radial, ring, interconnected)." },
  { icon: Shield, tip: "In Switchgear and Protection, focus on circuit breakers, relays (overcurrent, differential, distance), arc extinction, and protective schemes for alternators and transformers." },
  { icon: Lightbulb, tip: "In Analog and Digital Electronics, practise operational amplifier circuits, logic gates, Boolean algebra, Karnaugh maps, flip-flops, and counters." },
  { icon: Clock, tip: "Attempt one full paper within the 3-hour exam time so your writing speed and time management improve before the actual exam." },
]

const semLinks = [
  { label: "1st Semester", path: "/resources/jharkhand-diploma/semester-1" },
  { label: "2nd Semester", path: "/resources/jharkhand-diploma/semester-2" },
  { label: "3rd Sem — ECE", path: "/resources/jharkhand-diploma/semester-3-ece" },
  { label: "4th Semester", path: "/resources/jharkhand-diploma/semester-4-mech" },
  { label: "5th Semester", path: "/resources/jharkhand-diploma/semester-5" },
  { label: "6th Semester", path: "/resources/jharkhand-diploma/semester-6" },
]

const faqData = [
  {
    question: "What subjects are in Jharkhand Diploma 3rd Semester for EE/EEE?",
    answer:
      "Jharkhand Diploma 3rd Semester for Electrical Engineering (EE) and Electrical and Electronics Engineering (EEE) at JUT Ranchi includes 5 subjects: Basic of Electrical Power System, Transmission and Distribution, Switchgear and Protection, Analog and Digital Electronics, and Professional Skills. All five are compulsory for EE and EEE students.",
  },
  {
    question: "Is this page for EE branch or EEE branch?",
    answer:
      "This page covers both Electrical Engineering (EE) and Electrical and Electronics Engineering (EEE) branches. Both branches follow the same 3rd Semester syllabus and question papers under JUT Ranchi.",
  },
  {
    question: "Which years of 3rd Semester EE/EEE PYQs are available to download?",
    answer:
      "Previous Year Question Papers for Jharkhand Diploma 3rd Semester EE/EEE are currently being uploaded on Futurely. More years (2021–2026) will be added as they become available. Bookmark this page and check back regularly.",
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
    question: "How many marks is each subject?",
    answer:
      "Each subject follows the JUT Ranchi pattern with both internal and external marks. The external exam is typically 3 hours per paper. Check your official syllabus or institute notice for the exact marks breakdown for the current session.",
  },
  {
    question: "How should I use PYQs to prepare effectively?",
    answer:
      "Download papers from all available years, identify repeated topics and question patterns, then practice solving them within the exam duration. Focus especially on Basic of Electrical Power System and Switchgear and Protection as they carry significant weightage.",
  },
  {
    question: "Will more years of PYQs be added in the future?",
    answer:
      "Yes. Futurely keeps adding new Previous Year Question Paper PDFs over time. Bookmark this page and check back regularly for 2021–2025 papers when they are uploaded.",
  },
]

export const config = {
  data: { years, subjects, getLink },
  heroTitle: "3rd Semester PYQ — EE / EEE",
  heroSubtitle: " EE &amp; EEE Branch &nbsp;|&nbsp; 2021–2025 &nbsp;|&nbsp; Electrical Power System, Switchgear, Transmission ",
  heroDescBlock: (
<p className="s3-hero-desc">
            This 3rd Semester material has been carefully prepared to help
            Jharkhand Polytechnic Diploma Electrical Engineering (EE and EEE)
            students prepare effectively for their examinations.
            <br />
            <span className="s3-hero-hindi">
              इसमें important questions, previous year papers तथा important topics शामिल हैं जिससे semester exam pattern और EE/EEE branch topics की clear understanding मिल सके।
            </span>
          </p>
  ),
  subjectsAria: "3rd semester EE EEE",
  subjectsHeading: "3rd Semester (EE / EEE)",
  branchPapersHeading: "EE / EEE",
  noticeText: " EE/EEE 3rd Semester",
  browseLead: " आप Jharkhand Polytechnic Diploma 3rd Semester EE/EEE",
  yearPapersLabel: "3rd Semester EE / EEE Papers",
  pdfPathSegment: "3-eee",
  badge: (
<span className="s3-type-badge branch-eee">EE / EEE</span>
  ),
  tipsAria: "3rd semester EE EEE",
  tipsHeading: "3rd Semester EE / EEE",
  faqAria: "3rd Semester EE EEE",
  faqLead: "3rd Semester EE/EEE previous year papers and examinations",
  lastUpdated: "June",
  examInfoCards,
  studyTips,
  semLinks,
  faqData,
};

/* Badge colours stay per-branch: Sem3 and Sem4 disagree on .branch-civil. */
export const badgeCss = ".s3-type-badge.branch-eee { background: #fee2e2; color: #991b1b; }";
