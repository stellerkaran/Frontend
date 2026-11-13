import JHParamedicalClient from "./JHParamedicalClient";

const faqs = [
  {
    question: "Jharkhand Paramedical (PMECE) exam क्या है?",
    answer: "Jharkhand Paramedical Entrance Competitive Examination (PMECE) JCECEB (Jharkhand Combined Entrance Competitive Examination Board) द्वारा आयोजित की जाती है। यह exam Jharkhand के Government और Private Paramedical Institutes में Diploma और Certificate courses में admission के लिए होती है."
  },
  {
    question: "Paramedical 2026 exam date और timing क्या है?",
    answer: "Official notification के अनुसार, Paramedical 2026 exam July 2026 में आयोजित होने की संभावना है। Exam timing सुबह 10:00 AM से दोपहर 12:30 PM तक होती है।"
  },
  {
    question: "Paramedical exam का syllabus और pattern क्या है?",
    answer: "Diploma Paramedical Courses (10+2 Level) के लिए Syllabus Class 11th & 12th Level का Physics, Chemistry, Biology / Mathematics (150 Marks) होता है।"
  },
  {
    question: "Eligibility criteria क्या है?",
    answer: "Diploma Courses के लिए: Candidate को 10+2 (Science Stream - PCB or PCM) pass होना अनिवार्य है। Candidate का Jharkhand Domicile होना आवश्यक है।"
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "en-IN",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  inLanguage: "en-IN",
  name: "Jharkhand Paramedical (PMECE) 2026 – Free PYQ Papers, Syllabus & Practice | Futurely",
  description: "Jharkhand Paramedical PMECE 2026: Free PYQ Papers (2021-2025), syllabus, eligibility criteria, exam pattern and online practice tests on Futurely.",
  url: "https://www.futurely.in/resources/jharkhand-paramedical/exam-information",
  publisher: { "@type": "Organization", name: "Futurely", url: "https://www.futurely.in" },
};

export const metadata = {
  title: "Jharkhand Paramedical (PMECE) 2026 – Free PYQ Papers & Guide | Futurely",
  description: "Download free Jharkhand Paramedical (PMECE) PYQ papers 2021–2025. Complete guide: syllabus, eligibility, exam pattern, dates.",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.futurely.in/resources/jharkhand-paramedical/exam-information",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/resources/jharkhand-paramedical/exam-information",
    title: "Jharkhand Paramedical (PMECE) 2026 – Free PYQ Papers & Guide | Futurely",
    description: "Download free Jharkhand Paramedical PYQ papers 2021–2025 and practice online on Futurely.",
    images: ["https://www.futurely.in/og-image.png"],
  },
};

export default function JHParamedicalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <JHParamedicalClient />
    </>
  );
}
