import Link from "next/link";
import { RefreshCw, ShieldCheck, AlertCircle, CheckCircle2, Mail, ArrowLeft } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Refund Policy | Futurely (futurely.in)",
  description: "Read the Cancellation and Refund Policy for test series and digital educational resources on Futurely (futurely.in).",
  alternates: {
    canonical: "https://www.futurely.in/refund-policy",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/refund-policy",
    title: "Refund Policy | Futurely",
    description: "Learn about the refund, cancellation, and transaction reversal policies on Futurely.",
    images: [{ url: "https://www.futurely.in/og-image.png" }],
    siteName: "Futurely",
  },
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16" id="refund-policy-page">
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
            <RefreshCw className="h-6 w-6" />
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight flex items-center justify-center gap-3 flex-wrap">
            <Image width={48} height={48}
              src="/logo.png"
              alt="Futurely Logo"
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-lg inline-block shadow-sm"
              referrerPolicy="no-referrer"
            />
            <span>
              Refund Policy – <span className="text-primary font-extrabold">Futurely</span> (<span className="text-primary font-extrabold">futurely.in</span>)
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
              <ShieldCheck className="h-5 w-5 text-indigo-600 flex-shrink-0" />
              <h2>1. Digital Educational Content Policy</h2>
            </div>
            <p>
              At <strong className="text-primary font-bold">Futurely</strong> (accessible via <span className="text-primary font-semibold">futurely.in</span>), we provide digital test series, mock exam simulators, solved PYQ booklets, and B.Tech / Diploma notes.
            </p>
            <p>
              Because digital study products are accessible immediately upon account activation, all purchases are generally final and non-refundable once content access is delivered to your account.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-slate-950 font-extrabold text-lg border-b border-slate-100 pb-2">
              <AlertCircle className="h-5 w-5 text-indigo-600 flex-shrink-0" />
              <h2>2. Exception for Duplicate Debits</h2>
            </div>
            <p>
              If a technical glitch or network interruption during a payment gateway transaction results in a duplicate payment debit for the same test package:
            </p>
            <ul className="space-y-2 pl-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>The duplicate amount will be verified against payment ledger logs and refunded back to your original source account within 5 to 7 business days.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Please email transaction proof or UTR receipts to <a href="mailto:futurely.edu@gmail.com" className="text-indigo-600 font-bold underline">futurely.edu@gmail.com</a> for immediate resolution.</span>
              </li>
            </ul>
          </section>

          {/* Contact Box */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 mt-8 border border-slate-800">
            <h3 className="text-lg font-extrabold text-white mb-2 flex items-center gap-2">
              <Mail className="h-5 w-5 text-indigo-400" />
              <span>Contact Billing Support</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
              If you have any questions regarding your transaction or need help with access activation, reach out to <strong className="text-primary-light font-bold">Futurely</strong> billing team:
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
