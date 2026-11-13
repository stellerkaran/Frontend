import D2DClient from "./D2DClient";

const faqs = [
  {
    q: "Jharkhand D2D (JCECE LE) exam क्या है?",
    a: "Jharkhand D2D (Diploma to Degree) exam — officially JCECE Lateral Entry — JCECEB (Jharkhand Combined Entrance Competitive Examination Board) द्वारा आयोजित की जाती है। यह Diploma / B.Sc holders को Jharkhand के Government और Private Engineering Colleges में B.Tech 2nd Year में Direct Lateral Entry दिलाती है.",
  },
  {
    q: "D2D 2026 exam date और timing क्या है?",
    a: "Official notification के अनुसार, D2D 2026 exam 28 June 2026 (Sunday) को आयोजित होगी। Exam timing सुबह 10:00 AM से दोपहर 12:30 PM तक है, यानी exam की duration 2 घंटे 30 मिनट (150 minutes) है। Exam Ranchi जिले के विभिन्न exam centers पर होगी.",
  },
  {
    q: "D2D exam का syllabus क्या है?",
    a: "Official syllabus के अनुसार, इस exam में Engineering Physics, Engineering Chemistry और Engineering Mathematics (Diploma 1st & 2nd Semester level) के questions आते हैं। Physics में Units, Mechanics, Optics, Modern Physics; Chemistry में Atomic Structure, Corrosion, Water, Alloys, Plastics; Maths में Algebra, Trigonometry, Calculus और Coordinate Geometry शामिल हैं.",
  },
  {
    q: "Tie-breaking rules क्या हैं अगर दो candidates के marks equal हों?",
    a: "Tie-breaking के लिए पहले Engineering Mathematics के marks देखे जाते हैं। अगर वो भी equal हों तो Engineering Physics marks देखे जाते हैं। फिर Date of Birth (जो पहले हो) और अंत में First Name का alphabetical order (English) use होता है.",
  },
  {
    q: "क्या B.Sc और B.Voc students भी apply कर सकते हैं?",
    a: "हाँ। B.Sc graduates जिनके 10+2 में Mathematics था और Degree में minimum 45% marks हैं, वे eligible हैं। इसके अलावा B.Voc या 3-year D.Voc stream के candidates भी same or allied sector में eligible हैं — यह नया addition है 2026 में.",
  },
  {
    q: "Application fee कितनी है और कैसे जमा करें?",
    a: "General/EWS/BC-I/BC-II candidates के लिए ₹900 और SC/ST/Female/Divyang candidates के लिए ₹450 (Divyang के लिए exempted) है। Fee केवल online mode में जमा होती है — Debit Card, Credit Card, Net Banking, या UPI के through। Fee non-refundable है.",
  },
  {
    q: "Exam किस mode में होती है और negative marking है क्या?",
    a: "Exam offline mode (OMR-based, pen & paper) में होती है। Duration 2 hours 30 minutes है। सही answer पर +1 mark, गलत answer पर –0.25 mark काटे जाते हैं। Unattempted questions पर कोई mark नहीं काटा जाता.",
  },
  {
    q: "Counselling में कौन से documents चाहिए?",
    a: "Counselling में चाहिए: 10th Marksheet, Diploma All-Semester Marksheets, Jharkhand Domicile Certificate, Caste Certificate (अगर applicable हो), EWS Certificate (अगर applicable हो), Divyang Certificate (अगर applicable हो), और Entrance Exam का Admit Card। Xerox या Fax copy स्वीकार नहीं होगी — original documents + self-attested copies लेकर जाना अनिवार्य है.",
  },
];

const pyqPapers = [
  { year: "2025", driveUrl: "https://drive.google.com/file/d/1SKd1YKnu3jCXFmhzcVsVFb9lVi2bwYnQ/view" },
  { year: "2024", driveUrl: "https://drive.google.com/file/d/1VK_1yRtZKCIUeyj8O0dxil-DvKV-z-7u/view" },
  { year: "2023", driveUrl: "https://drive.google.com/file/d/1i8EmeuA7zCCJyVCIUuFjp4HFDnnGXlQ8/view" },
  { year: "2022", driveUrl: "https://drive.google.com/file/d/1Yf9RF2bp2cw_Q3JPzrj5JwJO0R--kRKa/view" },
  { year: "2021", driveUrl: "https://drive.google.com/file/d/1-mgbElP-26lZzZ8xYl2GtWpSTBhFw-aT/view" },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Jharkhand D2D (JCECE Lateral Entry) 2026 Preparation",
  description:
    "Free Jharkhand D2D 2026 preparation with 5 years of PYQ papers, full syllabus, eligibility and 750+ online MCQs.",
  provider: {
    "@type": "Organization",
    name: "Futurely",
    sameAs: "https://www.futurely.in",
  },
  url: "https://www.futurely.in/resources/jharkhand-d2d/exam-information",
  educationalLevel: "Undergraduate",
  inLanguage: ["en", "hi"],
  isAccessibleForFree: true,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.futurely.in/" },
    { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.futurely.in/resources" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Jharkhand D2D Exam 2026",
      item: "https://www.futurely.in/resources/jharkhand-d2d/exam-information",
    },
  ],
};

const pyqListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Jharkhand D2D Previous Year Question Papers",
  description: "Free PYQ papers for Jharkhand D2D JCECE Lateral Entry — 2021 to 2025.",
  itemListElement: pyqPapers.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `Jharkhand D2D Question Paper ${p.year} – 150 MCQs Physics Chemistry Maths`,
    url: `https://www.futurely.in/resources/jharkhand-d2d/exam-information`,
  })),
};

export const metadata = {
  title: "Jharkhand D2D Exam 2026 – Free PYQ Papers, Syllabus & Online Practice | Futurely",
  description: "Jharkhand D2D JCECE Lateral Entry 2026: Download free PYQ papers (2021–2025), full official syllabus, eligibility criteria, exam pattern, important dates and practice 750+ MCQs online free on Futurely.",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.futurely.in/resources/jharkhand-d2d/exam-information",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/resources/jharkhand-d2d/exam-information",
    title: "Jharkhand D2D Exam 2026 – Free PYQ Papers & Online Practice | Futurely",
    description: "Download free D2D PYQ papers 2021–2025 and practice 750+ MCQs online. Complete guide: eligibility, syllabus, exam pattern, dates.",
    images: [{ url: "https://www.futurely.in/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jharkhand D2D 2026 – Free PYQ Papers & Online Mock Tests | Futurely",
    description: "5 years D2D PYQ papers + 750 MCQs online, free. Syllabus, eligibility, dates — all in one place.",
    images: ["https://www.futurely.in/og-image.png"],
  },
};

export default function D2DExamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pyqListSchema) }}
      />
      <D2DClient />
    </>
  );
}
