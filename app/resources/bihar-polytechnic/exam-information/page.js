import BiharPolytechnicClient from "./BiharPolytechnicClient";

const faqData = [
  {
    question: "Bihar Polytechnic (DCECE-PE) exam क्या है?",
    answer: "Bihar Polytechnic Entrance Competitive Examination (DCECE) के PE (Polytechnic Engineering) group का आयोजन BCECE Board (BCECEB), Patna करता है। इस exam के माध्यम से Bihar के Government और Private Polytechnic Colleges में Diploma Engineering (3 years) के सभी branches में admission होता है।",
  },
  {
    question: "DCECE-PE 2026 exam date और application dates क्या हैं?",
    answer: "Official BCECEB notification के अनुसार online application form 19 March 2026 से 27 April 2026 तक भरा जा सकता है (application fee जमा करने की last date भी 27 April 2026 है) और PE group का exam 23 May 2026 (Saturday) को आयोजित होगा। Exam की duration 2 घंटे 15 मिनट (135 minutes) है और shift/timing admit card पर दी जाती है।",
  },
  {
    question: "DCECE-PE का syllabus और exam pattern क्या है?",
    answer: "Syllabus Matric (Class 10) level का है — Physics (Bhautik Vigyan), Chemistry (Rasayan Vigyan) और Mathematics (Ganit) से 30-30 questions, कुल 90 questions और 450 marks। हर सही उत्तर पर 5 marks मिलते हैं, negative marking नहीं है और unattempted question पर 0 marks मिलते हैं। Paper Hindi और English दोनों भाषाओं में आता है।",
  },
  {
    question: "Eligibility क्या है? Minimum marks कितने चाहिए?",
    answer: "Candidate को किसी recognised board से Class 10 (Matric या equivalent) pass होना चाहिए। Appearing candidates भी apply कर सकते हैं, लेकिन counselling से पहले passing certificate produce करना अनिवार्य होगा। Reservation और seat allotment के लिए Bihar निवास (domicile) तथा category certificate जैसे documents लगते हैं।",
  },
  {
    question: "Age limit क्या है?",
    answer: "PE (Polytechnic Engineering) group के लिए कोई अलग minimum age limit नहीं रखी गई है। Age conditions, जहाँ prescribed हैं, वे Para Medical (PM / PMM) course groups पर लागू होती हैं।",
  },
  {
    question: "Tie-breaking rules क्या हैं?",
    answer: "अगर दो candidates के total DCECE marks (450 में से) equal हों तो official notification में दिए गए criteria के अनुसार merit तय होती है — subject-wise marks, फिर Date of Birth और अंत में नाम का alphabetical order। Counselling में इसी merit के अनुसार choice filling और seat allotment होता है।",
  },
  {
    question: "Exam किस mode में होती है और negative marking है क्या?",
    answer: "Exam offline OMR-based mode (pen & paper) में होती है और इसकी duration 2 घंटे 15 मिनट है। सही answer पर +5 marks मिलते हैं और negative marking नहीं है, इसलिए कोई भी question खाली न छोड़ें।",
  },
  {
    question: "Application fee कितनी है?",
    answer: "PE (1 course) के लिए General / OBC / EBC candidates को ₹750 और SC / ST / PwD candidates को ₹480 देना होता है। 2 courses के लिए ₹850 / ₹530 और 3 courses के लिए ₹950 / ₹630 है। Fee केवल online (Debit Card, Credit Card, Net Banking या UPI) से जमा होती है और non-refundable है।",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "en-IN",
  mainEntity: faqData.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  inLanguage: "en-IN",
  name: "Bihar Polytechnic (DCECE-PE) Exam 2026 – Free PYQ Papers, Syllabus & Dates | Futurely",
  description:
    "Bihar Polytechnic DCECE-PE 2026: download free official PYQ papers (2018–2025), full Matric-level syllabus, eligibility, exam pattern, dates and counselling details on Futurely.",
  url: "https://www.futurely.in/resources/bihar-polytechnic/exam-information",
  publisher: { "@type": "Organization", name: "Futurely", url: "https://www.futurely.in" },
};

export const metadata = {
  title: "Bihar Polytechnic (DCECE-PE) Exam 2026 – Free PYQ Papers, Syllabus & Dates | Futurely",
  description:
    "Bihar Polytechnic DCECE-PE 2026: download free official PYQ papers (2018–2025), full Matric-level syllabus, eligibility, exam pattern, dates and counselling details on Futurely.",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.futurely.in/resources/bihar-polytechnic/exam-information",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/resources/bihar-polytechnic/exam-information",
    title: "Bihar Polytechnic (DCECE-PE) Exam 2026 – Free PYQ Papers & Dates | Futurely",
    description:
      "Download free Bihar Polytechnic (DCECE-PE) PYQ papers 2018–2025, and check the complete guide: eligibility, syllabus, exam pattern, dates and fee.",
    images: ["https://www.futurely.in/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bihar Polytechnic DCECE-PE 2026 – Free PYQ Papers & Guide | Futurely",
    description:
      "8 years of DCECE-PE PYQ papers, Matric-level syllabus, eligibility, exam pattern and dates — all in one place.",
    images: ["https://www.futurely.in/og-image.png"],
  },
};

export default function BiharPolytechnicPage() {
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
      <BiharPolytechnicClient />
    </>
  );
}
