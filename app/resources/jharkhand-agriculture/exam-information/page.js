import JHAgricultureClient from "./JHAgricultureClient";

const faqs = [
  {
    question: "Jharkhand Agriculture (JCECE) exam क्या है?",
    answer: "Jharkhand Agriculture Entrance Competitive Examination JCECEB द्वारा आयोजित की जाती है। यह B.Sc Agriculture, Forestry, Horticulture, Veterinary Science, etc. courses में admission के लिए होती है."
  },
  {
    question: "Agriculture 2026 exam date और timing क्या है?",
    answer: "Official notification के अनुसार, JCECE Agriculture 2026 exam June / July 2026 में आयोजित होने की संभावना है।"
  },
  {
    question: "Exam groups और subject combination क्या हैं?",
    answer: "PCM, PCB, PCMB, CBA / PCA Groups (150 Marks total)."
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
  name: "Jharkhand Agriculture & Allied Courses 2026 – Free PYQ Papers & Guide | Futurely",
  description: "Jharkhand Agriculture JCECE 2026: Free PYQ Papers (2021-2025), syllabus, eligibility criteria, exam pattern and online practice on Futurely.",
  url: "https://www.futurely.in/resources/jharkhand-agriculture/exam-information",
  publisher: { "@type": "Organization", name: "Futurely", url: "https://www.futurely.in" },
};

export const metadata = {
  title: "Jharkhand Agriculture 2026 – Free PYQ Papers & Guide | Futurely",
  description: "Download free Jharkhand Agriculture (JCECE) PYQ papers 2021–2025. Complete guide: syllabus, eligibility, exam pattern, dates.",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.futurely.in/resources/jharkhand-agriculture/exam-information",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/resources/jharkhand-agriculture/exam-information",
    title: "Jharkhand Agriculture 2026 – Free PYQ Papers & Guide | Futurely",
    description: "Download free Jharkhand Agriculture PYQ papers 2021–2025 and practice online on Futurely.",
    images: ["https://www.futurely.in/og-image.png"],
  },
};

export default function JHAgriculturePage() {
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
      <JHAgricultureClient />
    </>
  );
}
