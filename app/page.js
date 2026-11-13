import HomeClient from "./HomeClient";

export const metadata = {
  title: "Futurely – Engineering PYQs, Study Resources & Exam Preparation",
  description: "Futurely provides engineering PYQs, semester papers, study resources and exam preparation materials for Diploma, Polytechnic, BTech and lateral entry students.",
  alternates: {
    canonical: "https://www.futurely.in/",
  },
};

export default function Page() {
  return <HomeClient />;
}
