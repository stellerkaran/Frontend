/* Per-branch config for Sem3_META.
 * Content copied verbatim from the original Sem3/Sem3_META.js by the Phase 3 refactor.
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
  Flame,
  HelpCircle,
  Lightbulb,
  Megaphone,
  School,
  Share2,
  Target,
  Wrench,
  Zap,
} from "lucide-react";

import {
  SEM3_META_YEARS as years,
  SEM3_META_ALL_SUBJECTS as subjects,
  getSem3MetaLink as getLink,
} from "../Sem3MetaData";

const examInfoCards = [
  { icon: School, label: "Conducted By", value: "JUT Ranchi" },
  { icon: ClipboardList, label: "Branch", value: "Metallurgy Engg" },
  { icon: Clock, label: "Duration", value: "3 Hours / Paper" },
  { icon: Award, label: "Total Marks", value: "100 per Subject" },
  { icon: FileCheck, label: "Pattern", value: "Internal + External" },
  { icon: BookOpen, label: "Semester", value: "3rd Semester" },
]

const studyTips = [
  { icon: Target, tip: "Solve PYQs year by year and keep one notebook for repeated concepts and common question patterns." },
  { icon: Wrench, tip: "In Machine Tool Technology, revise lathe, milling, and drilling machine construction diagrams along with cutting tool geometry and machining operations." },
  { icon: Droplets, tip: "In Foundry Technology, learn sand casting, mould and core making, gating and risering systems along with common casting defects and their remedies." },
  { icon: Factory, tip: "In Iron Making, focus on blast furnace construction and reactions, raw material preparation, and sponge iron (DRI) processes with flow diagrams." },
  { icon: Flame, tip: "In Non Ferrous Extractive Metallurgy, master extraction flow sheets of copper, aluminium, zinc, and lead through pyro, hydro, and electro-metallurgical routes." },
  { icon: Clock, tip: "Attempt one full paper within the 3-hour exam time so your writing speed and time management improve before the actual exam." },
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
    question: "What subjects are in Jharkhand Diploma 3rd Semester for Metallurgy (META)?",
    answer:
      "Jharkhand Diploma 3rd Semester for Metallurgy Engineering (JUT Ranchi) includes 5 subjects: Machine Tool Technology, Foundry Technology, Iron Making, Non Ferrous Extractive Metallurgy, and Professional Skills. All five are compulsory for Metallurgy students.",
  },
  {
    question: "Which years of 3rd Semester Metallurgy PYQs are available to download?",
    answer:
      "PYQs for Jharkhand Diploma 3rd Semester Metallurgy are currently being uploaded on Futurely. More years (2021–2026) will be added as they become available. Bookmark this page and check back regularly.",
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
    question: "Is Machine Tool Technology only for Metallurgy branch?",
    answer:
      "No. Machine Tool Technology is common to Mechanical and Metallurgy branches, but the full 3rd Semester subject set listed here is specific to the Metallurgy branch. Other branches like CSE, ECE, Civil, and EE have their own respective subject papers.",
  },
  {
    question: "How many marks is each subject?",
    answer:
      "Each subject follows the JUT pattern with both internal and external marks. The external exam is typically 3 hours per paper. Check your official syllabus or institute notice for the exact marks breakdown for the current session.",
  },
  {
    question: "How should I use PYQs to prepare effectively?",
    answer:
      "Download papers from all available years, identify repeated topics and question patterns, then practice solving them within the exam duration. Focus especially on Iron Making and Foundry Technology as they carry significant weightage.",
  },
  {
    question: "Will more years of PYQs be added in the future?",
    answer:
      "Yes. Futurely keeps adding new PYQ PDFs over time. Bookmark this page and check back regularly for 2021–2025 papers when they are uploaded.",
  },
]

export const config = {
  data: { years, subjects, getLink },
  heroTitle: "3rd Semester PYQ — Metallurgy",
  heroSubtitle: " Metallurgy Branch &nbsp;|&nbsp; 2021–2025 &nbsp;|&nbsp; Machine Tools, Foundry, Iron Making ",
  heroDescBlock: (
<p className="s3-hero-desc">
            This 3rd Semester material has been carefully prepared to help
            Jharkhand Polytechnic Diploma Metallurgy students prepare effectively for
            their examinations.
            <br />
            <span className="s3-hero-hindi">
              इसमें important questions, previous year papers तथा important topics शामिल हैं जिससे semester exam pattern और Metallurgy branch topics की clear understanding मिल सके।
            </span>
          </p>
  ),
  subjectsAria: "3rd semester Metallurgy",
  subjectsHeading: "3rd Semester (Metallurgy)",
  branchPapersHeading: "Metallurgy",
  noticeText: " Metallurgy 3rd Semester",
  browseLead: " आप Jharkhand Polytechnic Diploma 3rd Semester Metallurgy",
  yearPapersLabel: "3rd Semester Metallurgy Papers",
  pdfPathSegment: "3-meta",
  badge: (
<span className="s3-type-badge branch-met">META</span>
  ),
  tipsAria: "3rd semester Metallurgy",
  tipsHeading: "3rd Semester Metallurgy",
  faqAria: "3rd Semester Metallurgy",
  faqLead: "3rd Semester Metallurgy PYQs and JUT Ranchi exams",
  lastUpdated: "September",
  examInfoCards,
  studyTips,
  semLinks,
  faqData,
};

/* Badge colours stay per-branch: Sem3 and Sem4 disagree on .branch-civil. */
export const badgeCss = ".s3-type-badge.branch-met { background: #f3e8ff; color: #7e22ce; }";
