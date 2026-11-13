import BtechSem1Client from "@/src/data_Resources/jharkhand/btech/sem1";

const faqs = [
  {
    q: "Futurely पर 1st Semester B.Tech के कौन से PYQs उपलब्ध हैं?",
    a: "Futurely पर Jharkhand University of Technology (JUT) और Jharkhand के अन्य technical colleges के core subjects जैसे Engineering Mathematics-I, Engineering Physics, Basic Electrical Engineering, और Programming for Problem Solving के official question papers PDF format में free download के लिए उपलब्ध हैं.",
  },
  {
    q: "क्या B.Tech 1st Semester के PYQs download करने के लिए कोई login या payment करनी पड़ेगी?",
    a: "नहीं, Futurely पर उपलब्ध सभी previous year question papers और study materials completely free हैं. आप बिना किसी login या payment के high-quality PDF direct download कर सकते हैं.",
  },
  {
    q: "ये PYQs किन universities के Engineering Syllabus के लिए valid हैं?",
    a: "ये papers मुख्य रूप से JUT (Jharkhand University of Technology), Ranchi University, BBMKU, VBU, और Jharkhand के अन्य UGC-recognised institutes के AICTE standard syllabus पर आधारित 1st semester courses के लिए valid हैं.",
  },
  {
    q: "क्या 1st Semester B.Tech syllabus सभी branches के लिए same होता है?",
    a: "हाँ, AICTE norms के अनुसार B.Tech 1st Year (1st & 2nd Semester) का syllabus सभी branches (CSE, IT, ECE, EEE, Mechanical, Civil, Chemical, Metallurgy) के लिए standard core template पर common होता है.",
  },
];

const pyqPapers = [
  { name: "Engineering Mathematics-I", year: "2024", driveUrl: "https://drive.google.com/file/d/1_j4X56p-VzJ9vS3pW11V_yS3H_4R9m7o/view" },
  { name: "Engineering Mathematics-I", year: "2023", driveUrl: "https://drive.google.com/file/d/14Yv-kF2JPyB6vV3SjM-7vS_3eXz8u9_a/view" },
  { name: "Engineering Physics", year: "2024", driveUrl: "https://drive.google.com/file/d/1S_vP_hU6J5D4tY3S_M7v_rS9v-v3H_6p/view" },
  { name: "Engineering Physics", year: "2023", driveUrl: "https://drive.google.com/file/d/1Vk_KyRtZKCIUeyj8O0dxil-DvKV-z-7u/view" },
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
  name: "Jharkhand B.Tech 1st Semester PYQ (2021–2026) | JUT Ranchi | Futurely",
  description:
    "Free Jharkhand B.Tech 1st Semester Previous Year Question Papers — Engineering Mathematics, Mechanics, Chemistry, Electrical Engineering and more. JUT Ranchi affiliated. 100% free on Futurely.",
  provider: {
    "@type": "Organization",
    name: "Futurely",
    sameAs: "https://www.futurely.in",
  },
  url: "https://www.futurely.in/resources/jharkhand-btech/semester-1",
  educationalLevel: "University",
  inLanguage: "en",
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
      name: "B.Tech Semester PYQ",
      item: "https://www.futurely.in/resources",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "1st Semester",
      item: "https://www.futurely.in/resources/jharkhand-btech/semester-1",
    },
  ],
};

const pyqListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Jharkhand B.Tech 1st Semester PYQs",
  description: "Official JUT and university previous year question papers for B.Tech Semester 1.",
  itemListElement: pyqPapers.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `JUT B.Tech 1st Semester ${p.name} Question Paper ${p.year}`,
    url: `https://www.futurely.in/resources/jharkhand-btech/semester-1`,
  })),
};

export const metadata = {
  title: "Jharkhand B.Tech 1st Semester PYQ (2021–2026) | JUT Ranchi | Futurely",
  description: "Download official Jharkhand B.Tech 1st Semester PYQs & Syllabus for JUT Ranchi - Maths, Mechanics, Chemistry, Electrical Engineering & more. Free PDF on Futurely.",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.futurely.in/resources/jharkhand-btech/semester-1",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/resources/jharkhand-btech/semester-1",
    title: "Jharkhand B.Tech 1st Semester PYQ (2021–2026) | JUT Ranchi | Futurely",
    description: "Download official Jharkhand B.Tech 1st Semester PYQs & Syllabus for JUT Ranchi - Maths, Mechanics, Chemistry, Electrical Engineering & more. Free PDF on Futurely.",
    images: [{ url: "https://www.futurely.in/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jharkhand B.Tech 1st Semester PYQs | Free PDF Downloads | Futurely",
    description: "Get 1st Semester PYQs for all subjects of JUT Jharkhand. Download free PDFs now.",
    images: ["https://www.futurely.in/og-image.png"],
  },
};

export default function BtechSem1Page() {
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
      <BtechSem1Client />
    </>
  );
}
