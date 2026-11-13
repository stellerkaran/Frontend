import Link from "next/link";
import {
  GraduationCap,
  Trophy,
  BookOpen,
  Building2,
  Sparkles,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Mail,
  Compass
} from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "About Futurely - Jharkhand & Bihar Prep, PYQs & College Insights",
  description: "Learn how Futurely (futurely.in) empowers Jharkhand & Bihar students with free solved PYQs, JUT B.Tech & Diploma semester resources, test series, and college cutoff insights.",
  alternates: {
    canonical: "https://www.futurely.in/about",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/about",
    title: "About Futurely - Jharkhand & Bihar Prep, PYQs & College Insights",
    description: "Learn how Futurely is democratizing technical education in Jharkhand & Bihar with solved PYQs, JUT B.Tech & Diploma semester notes, and college guidance.",
    images: [{ url: "https://www.futurely.in/og-image.png" }],
    siteName: "Futurely",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Futurely - Jharkhand & Bihar Prep, PYQs & College Insights",
    description: "Learn how Futurely is democratizing technical education in Jharkhand & Bihar with solved PYQs, JUT B.Tech & Diploma semester notes, and college guidance.",
    images: ["https://www.futurely.in/og-image.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Futurely",
  url: "https://www.futurely.in",
  logo: "https://www.futurely.in/og-image.png",
  sameAs: ["https://www.futurely.in"],
  description: "Premier education platform for Jharkhand & Bihar Polytechnic, D2D B.Tech, Nursing entrance PYQs, JUT university semester resources, and college cutoff insights.",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.futurely.in/" },
    { "@type": "ListItem", position: 2, name: "About Us", item: "https://www.futurely.in/about" },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="bg-slate-50 min-h-screen py-12 sm:py-16" id="about-us-page">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Title Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block mb-3 border border-indigo-100">
              Our Mission &amp; Impact
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight flex items-center justify-center gap-3 flex-wrap">
              <Image width={48} height={48}
                src="/logo.png"
                alt="Futurely Logo"
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-lg inline-block shadow-sm"
                referrerPolicy="no-referrer"
              />
              <span>
                About <span className="text-primary font-extrabold">Futurely</span> 
              </span>
            </h1>
            <div className="w-20 h-1 bg-accent mx-auto mt-4 rounded-full"></div>
            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              Democratizing technical entrance preparation, university semester resources, and college counseling for students across Jharkhand and Bihar.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 text-center shadow-sm">
              <div className="text-2xl sm:text-3xl font-black text-indigo-600 mb-1">100% Free</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">PYQs &amp; Notes</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200 text-center shadow-sm">
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 mb-1">2021–2026</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Solved Papers</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200 text-center shadow-sm">
              <div className="text-2xl sm:text-3xl font-black text-indigo-600 mb-1">500+ Govt</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Colleges Details</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200 text-center shadow-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-600 mb-1">JUT &amp; JCECEB</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Syllabus Covered</div>
            </div>
          </div>

          {/* Vision Narrative Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6 mb-12">
            <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Empowering Regional Technical Aspirants
                </h2>
                <p className="text-xs text-slate-500">Bridging the gap in entrance prep &amp; semester study materials</p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              At Futurely, we build high-quality, verified regional study resources for competitive entrance exam aspirants and university engineering students in Jharkhand and Bihar. Students preparing for JCECEB, BCECEB, and JUT semester exams often hail from tier-2/3 cities, rural towns, and districts like Ranchi, Dhanbad, Bokaro, Jamshedpur, Dumka, Deoghar, Purnia, Chapra, and Gaya — where updated previous year papers, authentic semester syllabi, and clear counseling guides are hard to find.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              What started as a student helpline for seat allotment and counseling guidance has grown into a comprehensive academic platform. Futurely bridges resource asymmetry by providing uncorrupted Previous Year Question (PYQ) blueprints, solved answer keys, JUT B.Tech and Diploma semester notes, category-wise college cutoffs, and daily goal practice tools completely free of cost.
            </p>
          </div>

          {/* Core Pillars / Features Grid */}
          <div className="mb-14">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                What We Offer at <span className="text-primary font-extrabold">Futurely</span>
              </h2>
              <p className="text-sm text-slate-500 mt-2">Everything you need from entrance preparation to diploma &amp; degree graduation</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pillar 1 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold mb-4">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">Entrance Exam Preparation (PYQs)</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    Solved Previous Year Questions (2021–2026) for Jharkhand Polytechnic (PECE), D2D (Diploma to Degree Lateral Entry), Polytechnic LE, Paramedical, ANM, GNM Nursing, and Bihar Polytechnic.
                  </p>
                  <ul className="space-y-2 mb-6 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span>Physics, Chemistry, Math &amp; Biology solved papers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span>Daily goal tracking &amp; state-wide leaderboards</span>
                    </li>
                  </ul>
                </div>
                <Link href="/exam-preparation" className="inline-flex items-center gap-2 text-sm font-extrabold text-indigo-600 hover:text-indigo-700">
                  <span>Explore Entrance Exams</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Pillar 2 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold mb-4">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">JUT B.Tech &amp; Diploma Semester Hub</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    Official Jharkhand University of Technology (JUT Ranchi) B.Tech 1st, 2nd &amp; 3rd semester question papers, branch-wise syllabi (CSE/IT, ECE, EE, ME, Civil) and Diploma 1st–6th semester papers.
                  </p>
                  <ul className="space-y-2 mb-6 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span>Free high-quality PDF downloads by subject</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span>Curated notes, formula sheets &amp; unit guides</span>
                    </li>
                  </ul>
                </div>
                <Link href="/resources" className="inline-flex items-center gap-2 text-sm font-extrabold text-emerald-600 hover:text-emerald-700">
                  <span>Browse Study Resources</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Pillar 3 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold mb-4">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">College Insights &amp; Cutoff Finder</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    Detailed profiles for government polytechnic and engineering colleges including GP Dhanbad, GP Ranchi, GP Adityapur, GWP Ranchi, GP Bokaro, GWP Bokaro, GWP Jamshedpur, and BIT Sindri.
                  </p>
                  <ul className="space-y-2 mb-6 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span>Category-wise CML closing ranks &amp; seat matrix</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span>Government fee structures, TFW waivers &amp; hostels</span>
                    </li>
                  </ul>
                </div>
                <Link href="/diploma" className="inline-flex items-center gap-2 text-sm font-extrabold text-amber-600 hover:text-amber-700">
                  <span>View Government Colleges</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Pillar 4 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center font-bold mb-4">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">Practice &amp; State Leaderboard</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    Interactive practice interface designed to build speed and accuracy. Set daily question goals, track accuracy percentages, and view state rank leaderboards.
                  </p>
                  <ul className="space-y-2 mb-6 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span>Chapter-wise practice &amp; timer focus mode</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span>Real-time score analysis &amp; instant answer keys</span>
                    </li>
                  </ul>
                </div>
                <Link href="/test-series" className="inline-flex items-center gap-2 text-sm font-extrabold text-purple-600 hover:text-purple-700">
                  <span>Explore Test Series</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 mb-12 shadow-lg">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Guiding Principles</span>
              <h2 className="text-2xl sm:text-3xl font-black mt-1 text-white">
                Why Students Trust <span className="text-primary-light font-extrabold">Futurely</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700">
                <ShieldCheck className="h-6 w-6 text-indigo-400 mb-3" />
                <h3 className="font-bold text-white text-base mb-1">100% Authentic Content</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every paper, answer key, and syllabus card is strictly aligned with official board guidelines (JCECEB, JUT, DCECE).
                </p>
              </div>

              <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700">
                <Compass className="h-6 w-6 text-emerald-400 mb-3" />
                <h3 className="font-bold text-white text-base mb-1">Mobile-First &amp; Fast</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Optimized for quick access on mobile devices, low network conditions, and instant PDF reading without clutter.
                </p>
              </div>

              <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700">
                <Users className="h-6 w-6 text-amber-400 mb-3" />
                <h3 className="font-bold text-white text-base mb-1">Student-Centered Mission</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Dedicated to keeping core entrance PYQs and university semester study resources free and accessible for all.
                </p>
              </div>
            </div>
          </div>

          {/* Contact & Support Section */}
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6 border border-indigo-800/50 shadow-md">
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                <Mail className="h-4 w-4" />
                <span>Get in Touch</span>
              </div>
              <h3 className="font-extrabold text-xl text-white">Have Questions or Need Guidance?</h3>
              <p className="text-xs text-slate-300 max-w-md leading-relaxed">
                Reach out to us for study material inquiries, college counseling questions, or website feedback.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href="mailto:futurely.edu@gmail.com"
                className="text-center bg-white text-slate-950 font-black px-6 py-3 rounded-xl text-xs hover:bg-indigo-50 transition-colors shadow"
              >
                futurely.edu@gmail.com
              </a>
              <Link
                href="/contact"
                className="text-center bg-indigo-600 text-white font-extrabold px-6 py-3 rounded-xl text-xs hover:bg-indigo-700 transition-colors"
              >
                Contact Page
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
