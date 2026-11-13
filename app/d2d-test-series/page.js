import JharkhandD2DTestSeriesClient from "./JharkhandD2DTestSeriesClient";

const faqData = [
  {
    question: "What is included in the Jharkhand D2D Full Test Series 2026?",
    answer: "The test series includes 10 full-length mock tests based strictly on the official JCECEB D2D 2026 syllabus — Physics, Chemistry, and Mathematics (100 questions per test). You also get detailed solutions, time analysis, and rank predictions."
  },
  {
    question: "How much does the Jharkhand D2D Test Series cost?",
    answer: "The complete test series is available at a discounted price of Rs.99 (original price Rs.199) as a one-time payment for full access until the exam day."
  },
  {
    question: "Is there a money-back guarantee?",
    answer: "Yes! If you score 100+ marks in the official Jharkhand D2D 2026 entrance exam, you get up to 100% of your test series fee back as a scholarship reward."
  },
  {
    question: "Can I target BIT Sindri using this test series?",
    answer: "Yes! The test series is spécialement curated to help B.Tech Lateral Entry (D2D) aspirants target BIT Sindri and top government engineering colleges in Jharkhand."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "en-IN",
  mainEntity: faqData.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer }
  }))
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.futurely.in/" },
    { "@type": "ListItem", position: 2, name: "D2D Test Series", item: "https://www.futurely.in/d2d-test-series" }
  ]
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Jharkhand D2D Full Test Series 2026",
  description: "10 full-length mock tests for Jharkhand D2D 2026 based on official JCECEB pattern. Detailed solutions and rank analysis included.",
  provider: {
    "@type": "Organization",
    name: "Futurely",
    url: "https://www.futurely.in"
  },
  offers: {
    "@type": "Offer",
    price: "99",
    priceCurrency: "INR",
    category: "Paid",
    availability: "https://schema.org/InStock"
  }
};

export const metadata = {
  title: "Jharkhand D2D Full Test Series 2026 | Futurely",
  description: "Attempt 10 full-length mock tests for Jharkhand D2D 2026. JCECEB pattern, detailed solutions, and score 100+ — your fastest path to a Top 50 Jharkhand State Rank.",
  alternates: {
    canonical: "https://www.futurely.in/d2d-test-series"
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/d2d-test-series",
    title: "Jharkhand D2D Full Test Series 2026 | Futurely",
    description: "10 full-length mock tests for Jharkhand D2D 2026 (JCECEB pattern). Physics, Chemistry & Mathematics. Detailed solutions. Top 50 Jharkhand State Rank.",
    images: [{ url: "https://www.futurely.in/your-imageD.jpg" }],
    siteName: "Futurely"
  },
  twitter: {
    card: "summary_large_image",
    url: "https://www.futurely.in/d2d-test-series",
    title: "Jharkhand D2D Full Test Series 2026 | Futurely",
    description: "10 full-length mock tests for Jharkhand D2D 2026. JCECEB pattern. Top 50 Jharkhand State Rank.",
    images: ["https://www.futurely.in/your-imageD.jpg"]
  }
};

export default function D2DTestSeriesPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <JharkhandD2DTestSeriesClient />
    </>
  );
}
