import JHPolytechnicClient from "./JHPolytechnicClient";

const faqData = [
  {
    question: "Jharkhand Polytechnic (PECE) exam क्या है?",
    answer: "Jharkhand Polytechnic Entrance Competitive Examination (PECE) JCECEB (Jharkhand Combined Entrance Competitive Examination Board) द्वारा आयोजित की जाती है। यह exam Jharkhand के Government, Private और PPP mode पर संचालित Polytechnic Colleges में Diploma Engineering के सभी branches में admission के लिए होती है।",
  },
  {
    question: "PECE 2026 exam date Aur timing क्या है?",
    answer: "Official notification के अनुसार, PECE 2026 exam 5 July 2026 (Sunday) को आयोजित होगी। Exam timing सुबह 10:30 AM से दोपहर 1:00 PM तक है, यानी exam की duration 2 घंटे 30 मिनट (150 minutes) है। Exam Ranchi, Hazaribagh, Jamshedpur, Dhanbad, Dumka, Chaibasa, Bokaro और Palamu के exam centers पर होगी।",
  },
  {
    question: "Polytechnic exam का syllabus क्या है?",
    answer: "Official syllabus के अनुसार, exam में Madhyamik / Secondary (Class 10) level के Physics (Bhautik Vigyan), Chemistry (Rasayan Vigyan) और Mathematics (Ganit) के questions होते हैं। तीनों subjects में 50-50 questions होते हैं — कुल 150 questions और 150 marks।",
  },
  {
    question: "Eligibility क्या है? Minimum marks कितने चाहिए?",
    answer: "Candidate को Class 10 या equivalent Madhyamik किसी recognised board से minimum 35% marks के साथ pass होना चाहिए। Jharkhand domicile भी जरूरी है। Appearing candidates भी apply कर सकते हैं लेकिन counselling से पहले passing certificate produce करना अनिवार्य होगा।",
  },
  {
    question: "Age limit क्या है?",
    answer: "Mining Engineering branch के लिए minimum age 17 years (as on 1 July 2026) अनिवार्य है। बाकी सभी Diploma Engineering branches के लिए कोई minimum या maximum age limit नहीं है।",
  },
  {
    question: "Tie-breaking rules क्या हैं?",
    answer: "अगर दो candidates के total marks equal हों तो पहले Mathematics के marks देखे जाते हैं। अगर वो भी equal हों तो Physics marks। फिर Date of Birth (पहले जन्मे candidate को priority) और अंत में First Name का English alphabetical order।",
  },
  {
    question: "Exam किस mode में होती है और negative marking है क्या?",
    answer: "Exam offline OMR-based mode (pen & paper) में होती है। Duration 2 hours 30 minutes है। सही answer पर +1 mark मिलता है। गलत answer पर –0.25 mark काटे जाते हैं। Unattempted questions पर कोई mark नहीं काटा जाता। एक question में एक से अधिक विकल्प भरने पर गलत माना जाएगा।",
  },
  {
    question: "Application fee कितनी है?",
    answer: "General/EWS/BC-I/BC-II candidates के लिए ₹650 और SC/ST/Female/Divyang candidates के लिए ₹325 (Divyang के लिए exempted) है। Fee online mode में — Credit Card, Net Banking या UPI से — जमा होती है। Fee non-refundable है।",
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
  name: "Jharkhand Polytechnic Exam 2026 – Free PYQ Papers, Syllabus & Online Practice | Futurely",
  description:
    "Jharkhand Polytechnic PECE 2026: Download free PYQ papers (2021–2025), full Class 10 syllabus, eligibility criteria, exam pattern and practice 750+ MCQs online free on Futurely.",
  url: "https://www.futurely.in/resources/jharkhand-polytechnic/exam-information",
  publisher: { "@type": "Organization", name: "Futurely", url: "https://www.futurely.in" },
};

export const metadata = {
  title: "Jharkhand Polytechnic Exam 2026 – Free PYQ Papers, Syllabus & Online Practice | Futurely",
  description:
    "Jharkhand Polytechnic PECE 2026: Download free PYQ papers (2021–2025), full Class 10 syllabus, eligibility criteria, exam pattern and practice 750+ MCQs online free on Futurely.",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.futurely.in/resources/jharkhand-polytechnic/exam-information",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/resources/jharkhand-polytechnic/exam-information",
    title: "Jharkhand Polytechnic Exam 2026 – Free PYQ Papers & Online Practice | Futurely",
    description:
      "Download free Jharkhand Polytechnic PYQ papers 2021–2025 and practice 750+ MCQs online. Complete guide: eligibility, syllabus, exam pattern, dates.",
    images: ["https://www.futurely.in/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jharkhand Polytechnic 2026 – Free PYQ Papers & Online Mock Tests | Futurely",
    description:
      "5 years Polytechnic PYQ papers + 750 MCQs online, free. Class 10 syllabus, eligibility, dates — all in one place.",
    images: ["https://www.futurely.in/og-image.png"],
  },
};

export default function JHPolytechnicPage() {
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
      <JHPolytechnicClient />
    </>
  );
}
