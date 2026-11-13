import ExamsClient from "./ExamsClient";

// NOTE: Bihar aspirants are redirected to /bihar/exam-preparation inside
// ExamsClient itself — decided in a client-only pre-paint layout effect, so
// nothing is ever painted before the redirect. (The page is server-rendered
// now, so the decision deliberately moved out of the first render to keep the
// hydration render identical to the HTML the server sends.)

const faqData = [
  {
    question: "What exams can I prepare for on Futurely?",
    answer:
      "Futurely currently offers solved Previous Year Question Papers (PYQs) for Jharkhand D2D (Diploma to Degree / Lateral Entry) and Jharkhand Polytechnic exams (2021–2025). Bihar and Uttar Pradesh exam papers are Launching Soon.",
  },
  {
    question: "Is exam practice on Futurely free?",
    answer:
      "Yes, practising PYQs on Futurely is completely free. Create an account, choose your exam, and start solving questions — no payment or subscription required.",
  },
  {
    question: "What is the Jharkhand D2D (Diploma to Degree) exam?",
    answer:
      "Jharkhand D2D is a JCECEB lateral-entry entrance exam for diploma holders seeking direct admission to the 2nd year of B.Tech at colleges like BIT Sindri. Futurely covers 5 full years of solved D2D PYQs (2021–2025) for Physics, Chemistry, and Mathematics.",
  },
  {
    question: "What is the daily goal feature on Futurely?",
    answer:
      "The daily goal tracker encourages you to solve at least 5 questions every day. Your progress is shown visually with a progress bar and milestones. Consistent daily practice has been shown to significantly improve exam scores.",
  },
  {
    question: "How does the leaderboard work on Futurely?",
    answer:
      "The Futurely leaderboard ranks all students based on total questions solved and accuracy. You can view your current rank on the exam preparation dashboard and compare your performance with other students preparing for the same exams.",
  },
  {
    question: "When will Bihar and UP exam PYQs be available?",
    answer:
      "Bihar BCECE LE, Bihar Polytechnic, UP B.Tech Lateral Entry, and UP Polytechnic PYQs are currently in development and will be added to Futurely soon. You will be notified once they go live.",
  },
  {
    question: "Do I need to log in to practise questions on Futurely?",
    answer:
      "Yes, a free account is required to access the PYQ practice interface. Login is needed to save your daily progress, track your rank on the leaderboard, and personalise your preparation experience.",
  },
  {
    question: "Which subjects are covered in Jharkhand Polytechnic PYQs on Futurely?",
    answer:
      "The Jharkhand Polytechnic PYQ section covers Physics, Chemistry, and Mathematics — the three core subjects of the JCECEB Polytechnic entrance exam — with solved papers from 2021 to 2025.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "en-IN",
  mainEntity: faqData.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.futurely.in/" },
    { "@type": "ListItem", position: 2, name: "Exam Preparation", item: "https://www.futurely.in/exam-preparation" },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "en-IN",
  name: "Exam Preparation - Polytechnic, Engineering & Nursing PYQs | Futurely",
  description:
    "Free online practice for Jharkhand & Bihar Polytechnic, D2D B.tech Lateral Entry, Paramedical, ANM & GNM PYQs (2021–2026) with detailed solutions on Futurely.",
  url: "https://www.futurely.in/exam-preparation",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.futurely.in/" },
      { "@type": "ListItem", position: 2, name: "Exam Preparation", item: "https://www.futurely.in/exam-preparation" },
    ],
  },
};

export const metadata = {
  title: "Exam Preparation - Solved PYQs for Polytechnic, Nursing & Lateral Entry | Futurely",
  description: "Free online practice for Jharkhand & Bihar Polytechnic, D2D Lateral Entry, Paramedical, ANM & GNM PYQs (2021–2026) with detailed solutions on Futurely.",
  alternates: {
    canonical: "https://www.futurely.in/exam-preparation",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/exam-preparation",
    title: "Exam Preparation - Solved PYQs for Polytechnic, Nursing & Lateral Entry | Futurely",
    description: "Free online practice for Jharkhand & Bihar Polytechnic, D2D Lateral Entry, Paramedical, ANM & GNM PYQs (2021–2026) with detailed solutions on Futurely.",
    images: [{ url: "https://www.futurely.in/og-image.png" }],
    siteName: "Futurely",
  },
  twitter: {
    card: "summary_large_image",
    url: "https://www.futurely.in/exam-preparation",
    title: "Exam Preparation - Solved PYQs for Polytechnic, Nursing & Lateral Entry | Futurely",
    description: "Free online practice for Jharkhand & Bihar Polytechnic, D2D Lateral Entry, Paramedical, ANM & GNM PYQs (2021–2026) with detailed solutions on Futurely.",
    images: ["https://www.futurely.in/og-image.png"],
  },
};

export default function ExamPreparation() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <ExamsClient />
    </>
  );
}
