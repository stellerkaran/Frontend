import GNMTestSeriesClient from "./GNMTestSeriesClient";

const JSON_LD_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the GNM Test Series 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is a set of 10 full-length mock tests designed as per the JCECEB GNM 2026 exam pattern, covering Physics, Chemistry, Biology, Maths and English with detailed solutions."
      }
    },
    {
      "@type": "Question",
      "name": "What is the price of the GNM Test Series on Futurely?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The test series is available at Rs.99 (50% off the original price of Rs.199) as a one-time purchase on Futurely."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a money back guarantee?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Score 120+ marks in GNM 2026 and get up to 100% of your fee back as a scholarship. Conditions apply."
      }
    },
    {
      "@type": "Question",
      "name": "How many questions are in each mock test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Each full test contains 150 questions — 30 questions each from 5 subjects: Physics, Chemistry, Biology, Maths and English — with a duration of 2.5 hours, following the official JCECEB GNM pattern. There is no negative marking."
      }
    }
  ]
};

const JSON_LD_BREADCRUMB = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.futurely.in" },
    { "@type": "ListItem", "position": 2, "name": "GNM Test Series 2026", "item": "https://www.futurely.in/gnm-test-series" }
  ]
};

const JSON_LD_COURSE = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "GNM Full Test Series 2026",
  "description": "10 full-length mock tests for JCECEB GNM 2026 covering Physics, Chemistry, Biology, Maths and English — 30 questions per subject, no negative marking.",
  "provider": { "@type": "Organization", "name": "Futurely", "sameAs": "https://www.futurely.in" },
  "url": "https://www.futurely.in/gnm-test-series",
  "courseMode": "online",
  "educationalLevel": "Secondary",
  "inLanguage": ["hi", "en"]
};

export const metadata = {
  title: "GNM Full Test Series 2026 | Futurely",
  description: "Attempt 10 full-length mock tests for GNM 2026. JCECEB pattern, 5 subjects with 30 questions each, no negative marking, detailed solutions — your fastest path to a Top 50 Jharkhand State Rank.",
  alternates: {
    canonical: "https://www.futurely.in/gnm-test-series"
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/gnm-test-series",
    title: "GNM Full Test Series 2026 | Futurely",
    description: "10 full-length mock tests for GNM 2026 (JCECEB pattern). Physics, Chemistry, Biology, Maths & English — 30 Qs per subject, no negative marking. Detailed solutions. Top 50 Jharkhand State Rank.",
    images: [
      {
        url: "https://www.futurely.in/your-imageGNM.jpg",
        width: 1080,
        height: 1920,
        alt: "GNM 2026 Full Test Series — Futurely"
      }
    ],
    siteName: "Futurely",
    locale: "en_IN"
  },
  twitter: {
    card: "summary_large_image",
    title: "GNM Full Test Series 2026 | Futurely",
    description: "10 full-length mock tests for GNM 2026. JCECEB pattern. 5 subjects, 30 Qs each, no negative marking. Top 50 Jharkhand State Rank.",
    images: ["https://www.futurely.in/your-imageGNM.jpg"]
  }
};

export default function GNMTestSeriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_FAQ) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_BREADCRUMB) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_COURSE) }}
      />
      <meta name="google-adsense-page" content="none" />
      <GNMTestSeriesClient />
    </>
  );
}
