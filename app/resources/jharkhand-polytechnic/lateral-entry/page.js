import JHPolytechnicLEClient from "./JHPolytechnicLEClient";

const faqData = [
  {
    question: "Jharkhand Polytechnic Lateral Entry (DECE LE) क्या है?",
    answer: "Jharkhand Polytechnic Lateral Entry (DECE LE) JCECEB द्वारा आयोजित की जाने वाली एक professional entrance examination है। इस exam को clear करने वाले candidates को सीधे 3-साल के Engineering Diploma Course के 2nd Year (3rd Semester) में direct admission मिलता है। इससे Polytechnic diploma 2 years में ही complete हो जाता है।",
  },
  {
    question: "DECE LE की Eligibility Criteria क्या है?",
    answer: "Candidates को Class 10th pass होने के साथ-साथ minimum 2-year ITI Course completed होना चाहिए, या Class 12th Science (with Maths) pass होना चाहिए, या 12th Vocational course pass होना चाहिए। उम्मीदवार को Jharkhand का local/permanent निवासी होना भी अनिवार्य है।",
  },
  {
    question: "DECE LE 2026 की exam date और pattern क्या है?",
    answer: "Official notification के अनुसार exam 28 June 2026 (Sunday) को Ranchi और Jamshedpur के centers पर offline mode में आयोजित होगी। Exam 2 hours (120 minutes) की होगी जिसमें कुल 100 questions (50 Mathematics + 50 Science) होंगे।",
  },
  {
    question: "क्या DECE LE में negative marking होती है?",
    answer: "हाँ, DECE (LE) exam में negative marking schema लागू होता है। प्रत्येक सही उत्तर के लिए +1 mark मिलता है, और प्रत्येक गलत उत्तर पर −0.25 mark काट लिया जाता है। Unattempted questions पर 0 mark मिलते हैं।",
  },
  {
    question: "DECE LE Syllabus का standard क्या है?",
    answer: "DECE LE exam का syllabus completely Class 10th (Secondary Standard) का होता है। इसमें Mathematics और Science (Physics, Chemistry & Biology) के questions पूछे जाते हैं। 11th या 12th level के high-level questions नहीं पूछे जाते हैं।",
  },
  {
    question: "Lateral Entry Application Form Fees कितनी है?",
    answer: "General, BC-I, BC-II और EWS श्रेणी के candidates के लिए application fee ₹650 है। Scheduled Caste (SC), Scheduled Tribe (ST) और सभी category की Female (महिला) candidates के लिए fee ₹325 है। Divyang/PwBD candidates के लिए fee exempted (निशुल्क) है।",
  },
  {
    question: "Tie-breaking standard क्या है?",
    answer: "अगर दो candidates के equal numbers हों तो पहले Mathematics subject के marks देखे जाते हैं। जिसके Maths में ज्यादा marks होंगे, उसे higher rank मिलेगी। अगर वो भी equal हो, तो Date of Birth (Older candidate को priority) और फिर First Name का alphabetical order देखा जाता है।",
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
  name: "Jharkhand Polytechnic Lateral Entry 2026 – DECE LE Syllabus, Eligibility & PYQ | Futurely",
  description:
    "Jharkhand Polytechnic Lateral Entry (DECE LE) 2026: Complete guide — 10th Standard Mathematics + Science syllabus, eligibility, exam pattern (100 MCQs), important dates (28 June 2026), PYQ papers and online practice. Free on Futurely.",
  url: "https://www.futurely.in/resources/jharkhand-polytechnic/lateral-entry",
  publisher: { "@type": "Organization", name: "Futurely", url: "https://www.futurely.in" },
};

export const metadata = {
  title: "Jharkhand Polytechnic Lateral Entry 2026 – DECE LE Syllabus, Eligibility & PYQ | Futurely",
  description:
    "Jharkhand Polytechnic Lateral Entry (DECE LE) 2026: Complete guide — 10th Standard Mathematics + Science syllabus, eligibility, exam pattern (100 MCQs), important dates (28 June 2026), PYQ papers and online practice. Free on Futurely.",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.futurely.in/resources/jharkhand-polytechnic/lateral-entry",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/resources/jharkhand-polytechnic/lateral-entry",
    title: "Jharkhand Polytechnic Lateral Entry 2026 – DECE LE Complete Guide | Futurely",
    description:
      "Complete guide: Jharkhand Polytechnic Lateral Entry DECE LE 2026 — 10th Standard Mathematics + Science syllabus, eligibility, 100 MCQ exam pattern, PYQ papers, online practice.",
    images: ["https://www.futurely.in/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jharkhand Polytechnic Lateral Entry 2026 – DECE LE Guide | Futurely",
    description:
      "DECE LE 2026 — 10th Standard Mathematics + Science syllabus, eligibility, 100 MCQs, exam 28 June 2026. Free on Futurely.",
    images: ["https://www.futurely.in/og-image.png"],
  },
};

export default function JHPolytechnicLEPage() {
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
      <JHPolytechnicLEClient />
    </>
  );
}
