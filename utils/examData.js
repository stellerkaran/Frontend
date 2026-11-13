// ── Shared exam catalogue + selection helpers ─────────────────────────────
// Plain module (no "use client") so BOTH server components and client
// components can import it — e.g. /exam-preparation's inline pre-paint
// redirect script for Bihar users. Consumed by ExamPickerModal (which
// re-exports for existing consumers), ExamsClient, dashboard and page.js.

export const EXAM_STORAGE_KEY = "futurely_exam";

// Add or remove exams here. `path` is where the user lands after choosing.
// GATE has its own route and Bihar has its own /bihar/exam-preparation page;
// everything else lands on /exam-preparation.
export const EXAM_GROUPS = [
    {
        key: "engineering",
        title: "Engineering",
        exams: [
            { id: "D2D", name: "D2D B.Tech", state: "Jharkhand", mono: "D2D", tone: "eng", path: "/exam-preparation" },
            { id: "GATE", name: "GATE", state: "All India", mono: "GATE", tone: "gate", path: "/gate/exam-preparation" },
        ],
    },
    {
        key: "polytechnic",
        title: "Polytechnic",
        exams: [
            { id: "JHP", name: "Polytechnic", state: "Jharkhand", mono: "JP", tone: "poly", path: "/exam-preparation" },
            { id: "JHPLE", name: "Polytechnic Lateral", state: "Jharkhand", mono: "PL", tone: "poly", path: "/exam-preparation" },
            { id: "BRP", name: "Polytechnic", state: "Bihar", mono: "BP", tone: "bihar", path: "/bihar/exam-preparation" },
        ],
    },
    {
        key: "health",
        title: "Nursing and health",
        exams: [
            { id: "ANM", name: "ANM", state: "Jharkhand", mono: "ANM", tone: "health", path: "/exam-preparation" },
            { id: "GNM", name: "GNM", state: "Jharkhand", mono: "GNM", tone: "health", path: "/exam-preparation" },
            { id: "BSCN", name: "BSc Nursing", state: "Jharkhand", mono: "BSc", tone: "health", path: "/exam-preparation" },
            { id: "PM", name: "Paramedical", state: "Jharkhand", mono: "PM", tone: "health", path: "/exam-preparation" },
        ],
    },
    {
        key: "agriculture",
        title: "Agriculture",
        exams: [
            { id: "AGRI", name: "Agriculture", state: "Jharkhand", mono: "AG", tone: "agri", path: "/exam-preparation" },
        ],
    },
];

export const ALL_EXAMS = EXAM_GROUPS.flatMap((group) => group.exams);

export const LEGACY_EXAM_IDS = {
    "d2d-btech-jh": "D2D",
    gate: "GATE",
    "polytechnic-jh": "JHP",
    "polytechnic-lateral-jh": "JHPLE",
    "polytechnic-bihar": "BRP",
    "anm-jh": "ANM",
    "gnm-jh": "GNM",
    "bsc-nursing-jh": "BSCN",
    "paramedical-jh": "PM",
    "agriculture-jh": "AGRI",
};

// Legacy ids (e.g. "polytechnic-jh") still exist on old profiles and storage —
// map them to the current EXAM_GROUPS ids so lookups never miss.
export const normalizeExamId = (id) => LEGACY_EXAM_IDS[id] || id || "";

export const getSavedExam = () => {
    try {
        const savedExam = localStorage.getItem(EXAM_STORAGE_KEY) || "";
        const normalizedExam = normalizeExamId(savedExam);
        if (normalizedExam !== savedExam) {
            localStorage.setItem(EXAM_STORAGE_KEY, normalizedExam);
        }
        return normalizedExam;
    } catch {
        return "";
    }
};

// Bihar exams have a dedicated preparation page (/bihar/exam-preparation).
// Derived from EXAM_GROUPS.state so any future Bihar exam is covered too.
export const BIHAR_EXAM_IDS = ALL_EXAMS.filter((exam) => exam.state === "Bihar").map((exam) => exam.id);

export const isBiharExam = (id) => BIHAR_EXAM_IDS.includes(normalizeExamId(id));

// Landing page for an exam: ANY Bihar exam always serves the Bihar page,
// so a Bihar user never lands on the combined /exam-preparation listing.
export const BIHAR_EXAM_HOME = "/bihar/exam-preparation";

// Bihar users have a dedicated resources hub too — same one-way rule: the
// combined /resources listing redirects them to /resources/bihar (and the
// Navbar sends them straight there).
export const BIHAR_RESOURCES_HOME = "/resources/bihar";

export const getExamHomePath = (exam) => {
    if (!exam) return "/exam-preparation";
    return isBiharExam(exam.id) ? BIHAR_EXAM_HOME : exam.path;
};