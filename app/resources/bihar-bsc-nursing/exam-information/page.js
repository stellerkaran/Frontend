import BiharBscNursingClient from "./BiharBscNursingClient";

const faqData = [
  {
    question: "Bihar B.Sc. Nursing (BCECE PCB) exam क्या है?",
    answer: "BCECE 2026 (PCB Group) — Bihar Combined Entrance Competitive Examination — का आयोजन BCECE Board (BCECEB), Patna करता है। इस exam के माध्यम से Bihar के Government और Private Nursing Colleges में 4-year B.Sc. Nursing course में admission होता है।",
  },
  {
    question: "BCECE Nursing 2026 exam date और application dates क्या हैं?",
    answer: "Official BCECEB notification के अनुसार online application form 5 May 2026 से शुरू हुआ और last date 13 May 2026 (re-extended) थी (correction window 11–12 May 2026)। Admit card 22 May 2026 को जारी हुआ और exam 30 और 31 May 2026 को आयोजित होगा। Shift/timing admit card पर दी जाती है।",
  },
  {
    question: "BCECE Nursing का syllabus और exam pattern क्या है?",
    answer: "Syllabus NCERT Class 11–12 level का है — Physics, Chemistry और Biology से 100-100 questions, कुल 300 questions और 1200 marks। हर सही उत्तर पर 4 marks मिलते हैं, गलत उत्तर पर –1 की negative marking लागू है। हर subject का अलग 90-minute का paper होता है और paper Hindi और English दोनों भाषाओं में आता है।",
  },
  {
    question: "Eligibility क्या है? 10+2 में कितने marks चाहिए?",
    answer: "Candidate को 10+2 (Intermediate) में Physics, Chemistry, Biology और English के साथ pass होना चाहिए — General के लिए 45% aggregate और SC/ST/OBC के लिए 40% aggregate। Appearing candidates भी apply कर सकते हैं, लेकिन counselling से पहले passing certificate देना अनिवार्य है। Reservation और seat allotment के लिए Bihar निवास (domicile) तथा category certificate ज़रूरी हैं।",
  },
  {
    question: "Age limit क्या है?",
    answer: "न्यूनतम 17 वर्ष आयु 31 December 2026 तक अनिवार्य है। कोई upper age limit नहीं रखी गई है, जैसा BCECE 2026 official notification में दिया गया है।",
  },
  {
    question: "Application fee कितनी है?",
    answer: "General / BC / EBC candidates के लिए ₹1,000 और SC / ST / DQ (Divyang) candidates के लिए ₹500। Fee केवल online (Debit Card, Credit Card, Net Banking या UPI) से जमा होती है और non-refundable है।",
  },
  {
    question: "Exam किस mode में होती है और negative marking है क्या?",
    answer: "Exam offline OMR-based mode (pen & paper) में होती है — प्रत्येक subject (Physics, Chemistry, Biology) के लिए 90 minutes। सही answer पर +4 marks मिलते हैं और गलत answer पर –1 mark कटता है, इसलिए doubtful questions में blind guess से बचें।",
  },
  {
    question: "Tie-breaking rules और counselling कैसे होगा?",
    answer: "अगर दो candidates के total BCECE marks (1200 में से) equal हों तो official prospectus के अनुसार inter-se merit तय होती है। Rank Card bceceboard.bihar.gov.in पर जारी होता है, उसके बाद merit-wise online counselling (choice filling और seat allotment) BCECEB द्वारा कराई जाती है।",
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
  name: "Bihar B.Sc. Nursing (BCECE PCB) Exam 2026 – Free PYQ Papers, Syllabus & Dates | Futurely",
  description:
    "Bihar B.Sc. Nursing BCECE 2026 (PCB Group): download free official PYQ papers (2021–2025), full NCERT Class 11–12 syllabus, eligibility, exam pattern, dates and counselling details on Futurely.",
  url: "https://www.futurely.in/resources/bihar-bsc-nursing/exam-information",
  publisher: { "@type": "Organization", name: "Futurely", url: "https://www.futurely.in" },
};

export const metadata = {
  title: "Bihar B.Sc. Nursing (BCECE PCB) Exam 2026 – Free PYQ Papers, Syllabus & Dates | Futurely",
  description:
    "Bihar B.Sc. Nursing BCECE 2026 (PCB Group): download free official PYQ papers (2021–2025), full NCERT Class 11–12 syllabus, eligibility, exam pattern, dates and counselling details on Futurely.",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.futurely.in/resources/bihar-bsc-nursing/exam-information",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/resources/bihar-bsc-nursing/exam-information",
    title: "Bihar B.Sc. Nursing (BCECE PCB) Exam 2026 – Free PYQ Papers & Dates | Futurely",
    description:
      "Download free Bihar B.Sc. Nursing BCECE PYQ papers 2021–2025, and check the complete guide: eligibility, syllabus, exam pattern, dates and fee.",
    images: ["https://www.futurely.in/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bihar B.Sc. Nursing BCECE 2026 – Free PYQ Papers & Guide | Futurely",
    description:
      "5 years of Bihar B.Sc. Nursing PYQ papers, NCERT syllabus, eligibility, exam pattern and dates — all in one place.",
    images: ["https://www.futurely.in/og-image.png"],
  },
};

export default function BiharBscNursingPage() {
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
      <BiharBscNursingClient />
    </>
  );
}