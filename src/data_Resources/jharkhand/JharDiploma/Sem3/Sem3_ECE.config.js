/* Per-branch config for Sem3_ECE.
 * Content copied verbatim from the original Sem3/Sem3_ECE.js by the Phase 3 refactor.
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
  FileCheck,
  FileText,
  HelpCircle,
  Layers,
  Lightbulb,
  Megaphone,
  Radio,
  School,
  Share2,
  Target,
  Zap,
} from "lucide-react";

import {
  SEM3_ECE_YEARS as years,
  SEM3_ECE_ALL_SUBJECTS as subjects,
  getSem3EceLink as getLink,
} from "../Sem3EceData";

const examInfoCards = [
  { icon: School, label: "Conducted By", value: "JUT Ranchi" },
  { icon: ClipboardList, label: "Branch", value: "Electronics & Communication Engg" },
  { icon: Clock, label: "Duration", value: "3 Hours / Paper" },
  { icon: Award, label: "Total Marks", value: "100 per Subject" },
  { icon: FileCheck, label: "Pattern", value: "Internal + External" },
  { icon: BookOpen, label: "Semester", value: "3rd Semester" },
]

const studyTips = [
  { icon: Target, tip: "Solve PYQs year by year and keep one notebook for repeated concepts and common question patterns." },
  { icon: Zap, tip: "In Analog Electronics, focus on op-amps, diodes, transistor biasing, amplifier circuits, and feedback topologies." },
  { icon: Cpu, tip: "In Logic Design using Verilog, practise writing HDL code for combinational and sequential circuits like MUX, flip-flops, and counters." },
  { icon: Radio, tip: "In Communication Systems, focus on AM, FM, modulation techniques, bandwidth, and noise concepts." },
  { icon: Layers, tip: "In Electronics Measurements & Testing Techniques, revise CRO usage, bridges, transducers, and error analysis." },
  { icon: Clock, tip: "Attempt one full paper within the 3-hour exam time so your writing speed and time management improve before the actual exam." },
]

const semLinks = [
  { label: "1st Semester", path: "/resources/jharkhand-diploma/semester-1" },
  { label: "2nd Semester", path: "/resources/jharkhand-diploma/semester-2" },
  { label: "3rd Sem — EE/EEE", path: "/resources/jharkhand-diploma/semester-3-eee" },
  { label: "4th Semester", path: "/resources/jharkhand-diploma/semester-4-mech" },
  { label: "5th Semester", path: "/resources/jharkhand-diploma/semester-5" },
  { label: "6th Semester", path: "/resources/jharkhand-diploma/semester-6" },
]

const faqData = [
  {
    question: "What subjects are in Jharkhand Diploma 3rd Semester for ECE?",
    answer:
      "Jharkhand Diploma 3rd Semester for ECE (JUT Ranchi) includes 5 subjects: Analog Electronics, Logic Design using Verilog, Electronics Measurements & Testing Techniques, Communication Systems, and Professional Skills. All five are compulsory for ECE students.",
  },
  {
    question: "Which years of 3rd Semester ECE PYQs are available to download?",
    answer:
      "PYQs for Jharkhand Diploma 3rd Semester ECE are currently being uploaded on Futurely. More years (2021–2026) will be added as they become available. Bookmark this page and check back regularly.",
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
    question: "Is Analog Electronics only for ECE branch?",
    answer:
      "Yes. Analog Electronics and the other 3rd Semester subjects listed here are specific to the ECE branch. Other branches like CSE, Mechanical, Civil, and EE have their own respective subject papers.",
  },
  {
    question: "How many marks is each subject?",
    answer:
      "Each subject follows the JUT pattern with both internal and external marks. The external exam is typically 3 hours per paper. Check your official syllabus or institute notice for the exact marks breakdown for the current session.",
  },
  {
    question: "How should I use PYQs to prepare effectively?",
    answer:
      "Download papers from all available years, identify repeated topics and question patterns, then practice solving them within the exam duration. Focus especially on Analog Electronics and Communication Systems as they carry significant weightage.",
  },
  {
    question: "Will more years of PYQs be added in the future?",
    answer:
      "Yes. Futurely keeps adding new PYQ PDFs over time. Bookmark this page and check back regularly for 2021–2025 papers when they are uploaded.",
  },
]

export const config = {
  data: { years, subjects, getLink },
  heroTitle: "3rd Semester PYQ — ECE",
  heroSubtitle: " ECE Branch &nbsp;|&nbsp; 2021–2025 &nbsp;|&nbsp; Analog Electronics, Logic Design, Communication Systems ",
  heroDescBlock: (
<p className="s3-hero-desc">
            This 3rd Semester material has been carefully prepared to help
            Jharkhand Polytechnic Diploma ECE students prepare effectively for
            their examinations.
            <br />
            <span className="s3-hero-hindi">
              इसमें important questions, previous year papers तथा important topics शामिल हैं जिससे semester exam pattern और ECE branch topics की clear understanding मिल सके।
            </span>
          </p>
  ),
  subjectsAria: "3rd semester ECE",
  subjectsHeading: "3rd Semester (ECE)",
  branchPapersHeading: "ECE",
  noticeText: " ECE 3rd Semester",
  browseLead: " आप Jharkhand Polytechnic Diploma 3rd Semester ECE",
  yearPapersLabel: "3rd Semester ECE Papers",
  pdfPathSegment: "3-ece",
  badge: (
<span className="s3-type-badge branch-ece">ECE</span>
  ),
  tipsAria: "3rd semester ECE",
  tipsHeading: "3rd Semester ECE",
  faqAria: "3rd Semester ECE",
  faqLead: "3rd Semester ECE PYQs and JUT Ranchi exams",
  lastUpdated: "June",
  examInfoCards,
  studyTips,
  semLinks,
  faqData,
};

/* Badge colours stay per-branch: Sem3 and Sem4 disagree on .branch-civil. */
export const badgeCss = ".s3-type-badge.branch-ece { background: #dbeafe; color: #1e40af; }";
