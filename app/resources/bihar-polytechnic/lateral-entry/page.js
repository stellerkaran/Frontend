import BiharPolytechnicLEClient from "./BiharPolytechnicLEClient";

const faqData = [
  {
    question: "Bihar DECE (LE) exam क्या है?",
    answer: "Diploma Entrance Competitive Examination (Lateral Entry) — DECE (LE) को BCECE Board (BCECEB), Patna आयोजित करता है। इस exam के ज़रिए Bihar के सरकारी और निजी Polytechnic colleges में Diploma Engineering के 2nd Year (3rd Semester) में सीधा admission मिलता है — यानी 1st year skip हो जाता है और diploma 2 साल में पूरा हो जाता है।",
  },
  {
    question: "DECE (LE) 2026 की exam date और application dates क्या हैं?",
    answer: "Official BCECEB notification के अनुसार online application 20 March 2026 से 27 April 2026 (extended) तक भरा जा सकता है, fee payment की last date भी 27 April 2026 (11:59 PM) है, correction window 29-30 April 2026 और admit card 11 May 2026 को जारी होगा। DECE (LE) 2026 का exam 17 May 2026 (Sunday) को आयोजित होगा और shift/timing admit card पर दी जाती है।",
  },
  {
    question: "DECE (LE) का syllabus और exam pattern क्या है?",
    answer: "Exam में Physics (Bhautik Vigyan), Chemistry (Rasayan Vigyan) और Mathematics (Ganit) से 50-50 questions पूछे जाते हैं — कुल 150 questions और 600 marks (हर question 4 marks का)। Duration 2 घंटे 15 मिनट (135 minutes) है और paper offline OMR mode में Hindi + English दोनों भाषाओं में आता है। Syllabus 10+2 (Intermediate) level का है — NCERT / BSEB Class 11-12 PCM।",
  },
  {
    question: "क्या DECE (LE) में negative marking होती है?",
    answer: "हाँ, DECE (LE) में negative marking लागू है — हर सही उत्तर पर +4 marks मिलते हैं और हर गलत उत्तर पर -1 mark कट जाता है। Unattempted question पर 0 marks मिलते हैं, इसलिए बिना confidence वाले question guess न करें।",
  },
  {
    question: "Eligibility क्या है? कौन apply कर सकता है?",
    answer: "दो तरह से eligible हो सकते हैं — (1) Class 12 / Intermediate pass या appearing with Physics, Chemistry और Mathematics (PCM), या (2) Class 10 (Matric) pass के बाद minimum 2-year ITI certificate (NCVT / SCVT recognised)। Bihar का local / permanent निवासी होना भी अनिवार्य है और counselling के समय domicile certificate original में लगेगा।",
  },
  {
    question: "DECE (LE) application fee कितनी है?",
    answer: "DECE (LE) 2026 के लिए application fee ₹2200 है (सभी categories के लिए समान)। Fee केवल online — Debit Card, Credit Card, Net Banking या UPI — से जमा होती है और non-refundable है। Latest amount bceceboard.bihar.gov.in पर verify कर लें।",
  },
  {
    question: "Lateral Entry में कितनी seats हैं और admission किस आधार पर मिलता है?",
    answer: "Session 2026-27 के लिए Bihar के Government और Private Polytechnics में Diploma Engineering 2nd Year की कुल 20,310 lateral entry seats हैं। Admission DECE (LE) की merit / rank के अनुसार BCECEB counselling (online choice filling और seat allotment) से मिलता है।",
  },
  {
    question: "ITI करने के बाद direct 2nd year में admission मिलेगा?",
    answer: "हाँ। 2-year ITI (NCVT / SCVT) पूरा करने वाले candidates DECE (LE) में apply कर सकते हैं और merit में selection होने पर संबंधित branch में Diploma Engineering के 2nd Year (3rd Semester) में direct admission मिलता है। ITI certificate counselling के समय original में दिखाना ज़रूरी है।",
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
  name: "Bihar Polytechnic Lateral Entry (DECE LE) 2026 – Free PYQ Papers, Syllabus & Dates | Futurely",
  description:
    "Bihar Polytechnic Lateral Entry DECE (LE) 2026: download free official PYQ papers (2021–2025), full 10+2-level syllabus, ITI / 12th PCM eligibility, exam pattern, dates and counselling details on Futurely.",
  url: "https://www.futurely.in/resources/bihar-polytechnic/lateral-entry",
  publisher: { "@type": "Organization", name: "Futurely", url: "https://www.futurely.in" },
};

export const metadata = {
  title: "Bihar Polytechnic Lateral Entry (DECE LE) 2026 – Free PYQ Papers, Syllabus & Dates | Futurely",
  description:
    "Bihar Polytechnic Lateral Entry DECE (LE) 2026: download free official PYQ papers (2021–2025), full 10+2-level PCM syllabus, Class 12 / ITI eligibility, exam pattern, dates and counselling details on Futurely.",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.futurely.in/resources/bihar-polytechnic/lateral-entry",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/resources/bihar-polytechnic/lateral-entry",
    title: "Bihar Polytechnic Lateral Entry (DECE LE) 2026 – Free PYQ Papers & Dates | Futurely",
    description:
      "Download free Bihar Polytechnic Lateral Entry (DECE LE) PYQ papers 2021–2025, and check the complete guide: ITI / 12th PCM eligibility, syllabus, exam pattern, seats, dates and fee.",
    images: ["https://www.futurely.in/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bihar Polytechnic Lateral Entry DECE LE 2026 – Free PYQ Papers & Guide | Futurely",
    description:
      "5 years of DECE LE PYQ papers, 10+2-level PCM syllabus, ITI / 12th eligibility, exam pattern and dates — all in one place.",
    images: ["https://www.futurely.in/og-image.png"],
  },
};

export default function BiharPolytechnicLateralEntryPage() {
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
      <BiharPolytechnicLEClient />
    </>
  );
}
