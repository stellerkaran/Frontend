import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, Mail, Phone, ArrowLeft, Building, HelpCircle } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Privacy Policy | Futurely (futurely.in)",
  description: "Read the Privacy Policy for Futurely (futurely.in). Learn how we collect, protect, and use student data for exam preparation and college counseling.",
  alternates: {
    canonical: "https://www.futurely.in/privacy-policy",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/privacy-policy",
    title: "Privacy Policy | Futurely",
    description: "Learn how Futurely (futurely.in) handles and protects student data, coaching inquiries, and test performance records.",
    images: [{ url: "https://www.futurely.in/og-image.png" }],
    siteName: "Futurely",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16" id="privacy-policy-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors gap-1.5"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm mb-8 text-center">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl mx-auto flex items-center justify-center font-bold mb-4 border border-indigo-100">
            <ShieldCheck className="h-6 w-6" />
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight flex items-center justify-center gap-3 flex-wrap">
            <Image width={48} height={48}
              src="/logo.png"
              alt="Futurely Logo"
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-lg inline-block shadow-sm"
              referrerPolicy="no-referrer"
            />
            <span>
              Privacy Policy – <span className="text-primary font-extrabold">Futurely</span>
            </span>
          </h1>

          <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full"></div>

          <p className="mt-4 text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Effective Date: January 1, 2026 | Last Updated: November 2026
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 text-sm leading-relaxed">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-slate-950 font-extrabold text-lg border-b border-slate-100 pb-2">
              <Lock className="h-5 w-5 text-indigo-600 flex-shrink-0" />
              <h2>1. Introduction &amp; Scope</h2>
            </div>
            <p>
              Welcome to <strong className="text-primary font-bold">Futurely</strong> (accessible via <span className="text-primary font-semibold">futurely.in</span>). We are committed to protecting the privacy, security, and personal data of our students, aspirants, parent guardians, and website visitors.
            </p>
            <p>
              This Privacy Policy explains how <strong className="text-primary font-bold">Futurely</strong> collects, uses, stores, and protects information when you browse our study material repository, attempt entrance exam PYQs, register for test series, or request college counseling guidance across Jharkhand and Bihar.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-slate-950 font-extrabold text-lg border-b border-slate-100 pb-2">
              <Eye className="h-5 w-5 text-indigo-600 flex-shrink-0" />
              <h2>2. Information We Collect</h2>
            </div>
            <p>We collect minimal required information to ensure seamless educational service delivery:</p>
            <ul className="space-y-2 pl-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span><strong>Personal Contact Details:</strong> Name, mobile number, WhatsApp number, email address, and city/district when submitting counseling or test series forms.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span><strong>Academic Profile Data:</strong> Target entrance exams (e.g., JCECEB PECE, D2D Lateral Entry, Paramedical, Nursing, BCECEB), current college/school name, and semester/branch.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span><strong>Technical &amp; Usage Logs:</strong> IP address, device type, browser information, pages visited, and test score performance logs stored locally or on secure servers to show your leaderboard standing.</span>
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-slate-950 font-extrabold text-lg border-b border-slate-100 pb-2">
              <FileText className="h-5 w-5 text-indigo-600 flex-shrink-0" />
              <h2>3. How We Use Your Information</h2>
            </div>
            <p>Your data is used strictly for legitimate educational purposes, including:</p>
            <ul className="space-y-2 pl-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Providing access to solved Previous Year Question (PYQ) PDFs and JUT B.Tech / Diploma semester notes.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Contacting you via WhatsApp or SMS regarding seat allotment counseling, admission updates, and mock test schedules.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Generating state-wide rank leaderboards and personalized performance analytics.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Improving platform navigation, load speed, and user experience.</span>
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-slate-950 font-extrabold text-lg border-b border-slate-100 pb-2">
              <ShieldCheck className="h-5 w-5 text-indigo-600 flex-shrink-0" />
              <h2>4. Data Security &amp; Non-Disclosure</h2>
            </div>
            <p>
              We implement technical and organizational security measures to protect student information against unauthorized access, loss, or alteration.
            </p>
            <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-4 text-indigo-900 font-medium text-xs sm:text-sm">
              <strong className="font-extrabold text-indigo-950">Strict Non-Disclosure Guarantee:</strong> <strong className="text-primary font-bold">Futurely</strong> does not sell, rent, or trade student phone numbers, email addresses, or personal information to third-party telemarketers or marketing databases.
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-slate-950 font-extrabold text-lg border-b border-slate-100 pb-2">
              <Building className="h-5 w-5 text-indigo-600 flex-shrink-0" />
              <h2>5. Third-Party Services &amp; Payments</h2>
            </div>
            <p>
              When purchasing premium test series or ebooks, transactions are processed directly through secure PCI-DSS compliant Indian payment gateways (e.g., Razorpay / UPI). <strong className="text-primary font-bold">Futurely</strong> never stores or handles your debit/credit card credentials, UPI PINs, or banking passwords.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-slate-950 font-extrabold text-lg border-b border-slate-100 pb-2">
              <HelpCircle className="h-5 w-5 text-indigo-600 flex-shrink-0" />
              <h2>6. Cookies &amp; Local Storage</h2>
            </div>
            <p>
              We use lightweight browser storage (`localStorage` and essential session cookies) to save your test progress, active theme preferences, and login state. You may clear your browser cookies at any time; however, this may reset local test streak counters.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-slate-950 font-extrabold text-lg border-b border-slate-100 pb-2">
              <Lock className="h-5 w-5 text-indigo-600 flex-shrink-0" />
              <h2>7. Your Rights &amp; Data Erasure</h2>
            </div>
            <p>
              You have the right to request access to your stored profile data or ask us to update, correct, or delete your contact records from our counseling outreach list. To exercise your rights, email us at <a href="mailto:futurely.edu@gmail.com" className="text-indigo-600 font-bold underline">futurely.edu@gmail.com</a>.
            </p>
          </section>

          {/* Contact Box */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 mt-8 border border-slate-800">
            <h3 className="text-lg font-extrabold text-white mb-2 flex items-center gap-2">
              <Mail className="h-5 w-5 text-indigo-400" />
              <span>Contact Privacy Officer</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
              If you have any questions or concerns regarding this Privacy Policy, please contact <strong className="text-primary-light font-bold">Futurely</strong> support:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-xs font-semibold">
              <a href="mailto:futurely.edu@gmail.com" className="inline-flex items-center gap-2 text-indigo-300 hover:text-white">
                <Mail className="h-4 w-4" />
                <span>futurely.edu@gmail.com</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
