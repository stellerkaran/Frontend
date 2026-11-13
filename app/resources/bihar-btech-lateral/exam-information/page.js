import BiharBtechLateralClient from "./BiharBtechLateralClient";

const faqData = [
  {
    question: "Bihar B.Tech Lateral Entry (BCECE LE) exam क्या है?",
    answer: "BCECE [LE] — Bihar Combined Entrance Competitive Examination (Lateral Entry) — को BCECE Board (BCECEB), Patna आयोजित करता है। यह exam Diploma और B.Sc holders को Bihar के सरकारी व निजी Engineering Colleges में B.Tech / B.E. के दूसरे वर्ष (2nd Year) में direct lateral entry दिलाता है।",
  },
  {
    question: "BCECE LE 2026 exam date और application dates क्या हैं?",
    answer: "BCECE [LE] 2026 का online application form 9 April 2026 को जारी हुआ और last date 7 May 2026 थी (fee 8 May 2026 तक, correction window 10–11 May 2026)। Admit card 23 May 2026 को जारी हुआ और परीक्षा 31 May 2026 (Sunday) को है। Shift और timing admit card पर दी जाती है।",
  },
  {
    question: "BCECE LE का syllabus और exam pattern क्या है?",
    answer: "परीक्षा offline OMR mode में होती है — कुल 150 MCQs: Engineering Mathematics 50, Engineering Mechanics 50 और Technical English 50 (diploma level syllabus)। कुल 600 marks (हर सही उत्तर पर +4) और गलत उत्तर पर –1 की negative marking लागू है। Duration 2 घंटे 15 मिनट और भाषा Hindi तथा English दोनों है।",
  },
  {
    question: "Eligibility क्या है? Diploma के बाद apply कर सकते हैं?",
    answer: "हाँ। किसी भी branch का 3-year या 2-year (Lateral Entry) Diploma in Engineering & Technology minimum 45% marks (reserved category के लिए 40%) के साथ pass होना चाहिए। B.Sc (45% + 10+2 में Mathematics) और B.Voc / 3-year D.Voc candidates भी eligible हैं। Final-year diploma students भी apply कर सकते हैं।",
  },
  {
    question: "Age limit क्या है?",
    answer: "B.Tech lateral entry (degree course) में admission के लिए examination year की 31 December तक minimum age 18 years होनी चाहिए, जैसा BCECEB prospectus में दिया गया है।",
  },
  {
    question: "Application fee कितनी है?",
    answer: "सभी categories (General / OBC / EBC / SC / ST / PwD) के लिए application fee ₹2,200 है। Fee online — Debit Card, Credit Card, Net Banking या UPI — से जमा होती है और non-refundable है।",
  },
  {
    question: "Tie-breaking rules क्या हैं?",
    answer: "अगर दो candidates के total BCECE [LE] marks (600 में से) equal हों तो जिसके total marks ज्यादा हैं उसे ऊँची merit rank मिलती है; इसके बाद inter-se merit official BCECE [LE] 2026 prospectus / BCECEB rules के अनुसार तय होती है और counselling में उसी merit से choice filling व seat allotment होता है।",
  },
  {
    question: "Rank card और counselling कैसे होगा?",
    answer: "Result Rank Card के रूप में जारी होता है, जो 600 में से प्राप्त कुल marks पर आधारित होता है। Rank Card bceceboard.bihar.gov.in पर आता है, उसके बाद merit-wise online counselling (choice filling और seat allotment) BCECEB द्वारा कराया जाता है।",
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
  name: "Bihar B.Tech Lateral Entry (BCECE LE) Exam 2026 – Free PYQ Papers, Syllabus & Dates | Futurely",
  description:
    "BCECE Lateral Entry (BCECE LE) 2026: download free official PYQ papers (2021–2025), diploma-level syllabus for Maths, Mechanics & English, eligibility, exam pattern, dates and counselling details on Futurely.",
  url: "https://www.futurely.in/resources/bihar-btech-lateral/exam-information",
  publisher: { "@type": "Organization", name: "Futurely", url: "https://www.futurely.in" },
};

export const metadata = {
  title: "Bihar B.Tech Lateral Entry (BCECE LE) Exam 2026 – Free PYQ Papers, Syllabus & Dates | Futurely",
  description:
    "BCECE Lateral Entry (BCECE LE) 2026: download free official PYQ papers (2021–2025), diploma-level syllabus for Maths, Mechanics & English, eligibility, exam pattern, dates and counselling details on Futurely.",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.futurely.in/resources/bihar-btech-lateral/exam-information",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/resources/bihar-btech-lateral/exam-information",
    title: "Bihar B.Tech Lateral Entry (BCECE LE) Exam 2026 – Free PYQ Papers & Dates | Futurely",
    description:
      "Download free BCECE LE PYQ papers 2021–2025 and check the complete guide: eligibility, syllabus, exam pattern, dates, fee and counselling.",
    images: ["https://www.futurely.in/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bihar B.Tech Lateral Entry (BCECE LE) 2026 – Free PYQ Papers & Guide | Futurely",
    description:
      "BCECE LE PYQ papers 2021–2025, diploma-level syllabus, eligibility, exam pattern and dates — all in one place.",
    images: ["https://www.futurely.in/og-image.png"],
  },
};

export default function BiharBtechLateralPage() {
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
      <BiharBtechLateralClient />
    </>
  );
}
