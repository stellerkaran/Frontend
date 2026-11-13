import Link from "next/link";
import { FileText, ShieldCheck, Scale, CheckCircle2, AlertCircle, HelpCircle, Mail, ArrowLeft, Lock, RefreshCw } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Terms and Conditions | Futurely (futurely.in)",
  description: "Read the Terms and Conditions for using Futurely (futurely.in) services, solved PYQs, JUT semester study materials, and entrance test series.",
  alternates: {
    canonical: "https://www.futurely.in/terms-and-conditions",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/terms-and-conditions",
    title: "Terms and Conditions | Futurely",
    description: "Rules, guidelines, and terms of service for students and users on Futurely (futurely.in).",
    images: [{ url: "https://www.futurely.in/og-image.png" }],
    siteName: "Futurely",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16" id="terms-and-conditions-page">
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
            <Scale className="h-6 w-6" />
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight flex items-center justify-center gap-3 flex-wrap">
            <Image width={48} height={48}
              src="/logo.png"
              alt="Futurely Logo"
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-lg inline-block shadow-sm"
              referrerPolicy="no-referrer"
            />
            <span>
              Terms &amp; Conditions – <span className="text-primary font-extrabold">Futurely</span> (<span className="text-primary font-extrabold">futurely.in</span>)
            </span>
          </h1>

          <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full"></div>

          <p className="mt-4 text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Effective Date: January 1, 2026 | Last Updated: July 2026
          </p>
        </div>

        {/* Main Content Box */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 text-sm leading-relaxed">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-slate-950 font-extrabold text-lg border-b border-slate-100 pb-2">
              <FileText className="h-5 w-5 text-indigo-600 flex-shrink-0" />
              <h2>1. Agreement &amp; Acceptance of Terms</h2>
            </div>
            <p>
              By visiting, browsing, or accessing any service, study portal, question paper repository, mock simulator, or test package on <strong className="text-primary font-bold">Futurely</strong> (accessible at <span className="text-primary font-semibold">futurely.in</span>), you acknowledge that you have read, understood, and agreed to be legally bound by these Terms and Conditions.
            </p>
            <p>
              If you do not agree to these terms, please discontinue using the platform immediately. These terms apply to all students, aspirants, visitors, and users of the website.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-slate-950 font-extrabold text-lg border-b border-slate-100 pb-2">
              <CheckCircle2 className="h-5 w-5 text-indigo-600 flex-shrink-0" />
              <h2>2. Description of Educational Platform</h2>
            </div>
            <p>
              <strong className="text-primary font-bold">Futurely</strong> provides educational tools, previous year question (PYQ) blueprints, solved answer keys, JUT B.Tech and Diploma semester notes, mock test simulators, and college admission counseling guidance specifically curated for engineering, diploma, and competitive exam aspirants in Jharkhand and Bihar (including JCECEB PECE, D2D Lateral Entry, Paramedical, Nursing, and BCECEB).
            </p>
            <ul className="space-y-2 pl-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Free study materials, syllabus blueprints, and PYQ PDFs are provided for student self-learning purposes.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Premium test series, rank diagnostic reports, and specialized exam simulators require optional registration or subscription.</span>
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-slate-950 font-extrabold text-lg border-b border-slate-100 pb-2">
              <Lock className="h-5 w-5 text-indigo-600 flex-shrink-0" />
              <h2>3. User Eligibility &amp; Account Security</h2>
            </div>
            <p>
              Students under 18 years of age should access <strong className="text-primary font-bold">Futurely</strong> with the consent and supervision of a parent or legal guardian. When creating an account or submitting enrollment forms, you agree to provide truthful, complete, and accurate information.
            </p>
            <p>
              You are solely responsible for maintaining the confidentiality of your account credentials, login OTPs, and test series access keys. Sharing test series access or re-selling portal access accounts is strictly prohibited.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-slate-950 font-extrabold text-lg border-b border-slate-100 pb-2">
              <ShieldCheck className="h-5 w-5 text-indigo-600 flex-shrink-0" />
              <h2>4. Payments, Subscriptions &amp; UPI Verification</h2>
            </div>
            <p>
              Subscriptions to paid mock test series or premium ebooks are processed via secure Indian payment gateways (e.g., Razorpay / UPI) or manual UPI verification using 12-digit UTR Receipt transaction identifiers.
            </p>
            <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-4 text-indigo-900 font-medium text-xs sm:text-sm">
              <strong className="font-extrabold text-indigo-950">Manual UPI Activation Notice:</strong> When subscribing via manual UPI QR transfer, users must provide the valid 12-digit UTR/Ref number. Subscription activations are verified against bank ledger logs to prevent fraudulent submissions.
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-slate-950 font-extrabold text-lg border-b border-slate-100 pb-2">
              <RefreshCw className="h-5 w-5 text-indigo-600 flex-shrink-0" />
              <h2>5. Refund &amp; Cancellation Policy</h2>
            </div>
            <p>
              Due to the immediate digital availability and downloadable nature of educational test series, OMR answer keys, and PDF notes:
            </p>
            <ul className="space-y-2 pl-2">
              <li className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>All completed purchase transactions verified on payment logs are final and non-refundable.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>In the event of duplicate payment debits due to gateway connectivity failure, contact us at <a href="mailto:futurely.edu@gmail.com" className="text-indigo-600 font-bold underline">futurely.edu@gmail.com</a> with transaction receipts for manual verification and reversal.</span>
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-slate-950 font-extrabold text-lg border-b border-slate-100 pb-2">
              <Scale className="h-5 w-5 text-indigo-600 flex-shrink-0" />
              <h2>6. Intellectual Property Rights &amp; Fair Use</h2>
            </div>
            <p>
              All original question paper solutions, test series questions, analytical rank reports, graphics, UI design elements, and logos published on <strong className="text-primary font-bold">Futurely</strong> are protected by intellectual property laws.
            </p>
            <p>
              You are granted a personal, non-exclusive, non-transferable license for personal study use only. Commercial redistribution, copying, re-selling, or scraping of content without written permission from <strong className="text-primary font-bold">Futurely</strong> is strictly prohibited.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-slate-950 font-extrabold text-lg border-b border-slate-100 pb-2">
              <AlertCircle className="h-5 w-5 text-indigo-600 flex-shrink-0" />
              <h2>7. Limitation of Liability &amp; Disclaimers</h2>
            </div>
            <p>
              While <strong className="text-primary font-bold">Futurely</strong> takes utmost care in verifying previous year question keys and college cutoff data, official entrance exam dates, cutoff ranks, and seat matrices are determined solely by official government bodies (JCECEB, BCECEB, JUT Ranchi).
            </p>
            <p>
              <strong className="text-primary font-bold">Futurely</strong> is an independent educational platform and is not officially affiliated with JCECEB or JUT Ranchi unless explicitly stated. Students are advised to cross-verify official dates on official government portals.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-slate-950 font-extrabold text-lg border-b border-slate-100 pb-2">
              <HelpCircle className="h-5 w-5 text-indigo-600 flex-shrink-0" />
              <h2>8. Governing Law &amp; Dispute Resolution</h2>
            </div>
            <p>
              These Terms and Conditions are governed by and construed in accordance with the laws of India. Any legal proceedings or disputes arising out of or in connection with this website shall be subject to the exclusive jurisdiction of the courts in India.
            </p>
          </section>

          {/* Contact Box */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 mt-8 border border-slate-800">
            <h3 className="text-lg font-extrabold text-white mb-2 flex items-center gap-2">
              <Mail className="h-5 w-5 text-indigo-400" />
              <span>Questions &amp; Legal Inquiries</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
              For any clarification regarding these Terms and Conditions or assistance with your test series subscription, reach out to <strong className="text-primary-light font-bold">Futurely</strong> support:
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
