import Link from "next/link";
import { Mail, GraduationCap, ArrowRight, ArrowLeftRight } from "lucide-react";
import Image from "next/image";

const WHATSAPP_NUMBER = "918287426663";
const WHATSAPP_MSG = "Hi, I need help with GATE 2026 exam preparation on Futurely.";

const BRANCH_LINKS = [
  { label: "Computer Science & IT (CS)", href: "/gate/pyq/computer-science" },
  { label: "Electronics & Comm (EC)", href: "/gate/pyq/electronics-communication" },
  { label: "Electrical Engineering (EE)", href: "/gate/pyq/electrical-engineering" },
  { label: "Mechanical Engineering (ME)", href: "/gate/pyq/mechanical-engineering" },
  { label: "Civil Engineering (CE)", href: "/gate/pyq/civil-engineering" },
  { label: "Data Science & AI (DA)", href: "/gate/pyq/data-science-ai", isNew: true },
];

const RESOURCE_LINKS = [
  { label: "All GATE PYQs", href: "/gate/pyq" },
  { label: "Engineering Mathematics", href: "/gate/pyq/engineering-mathematics" },
  { label: "General Aptitude Bank", href: "/gate/pyq/general-aptitude" },
  { label: "Formula Sheets & Revision", href: "/gate/resources" },
  { label: "GATE Test Series 2026", href: "/gate/exam-preparation" },
];

const ADMISSION_LINKS = [
  { label: "Top IITs Cutoffs", href: "/gate/resources" },
  { label: "IISc Bangalore Programs", href: "/gate/resources" },
  { label: "Top NITs & CCMT Guide", href: "/gate/resources" },
  { label: "PSU Recruitment via GATE", href: "/gate/resources" },
  { label: "GATE Score Calculator", href: "/gate/resources" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Contact Us", href: "/contact" },
];

const BOTTOM_LINKS = [
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms-and-conditions" },
  { label: "Refunds", href: "/refund-policy" },
  { label: "Contact", href: "/contact" },
];

function WaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
        fill="#FF0000"
      />
      <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FFFFFF" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="instaGradGate" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <path
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
        fill="url(#instaGradGate)"
      />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
        fill="#0A66C2"
      />
    </svg>
  );
}

export default function GateFooter() {
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

  return (
    <footer className="bg-[#f0f4ff] text-[#475569] border-t border-[#dde6ff]" id="gate-footer">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-8 sm:gap-8">
          {/* Brand & Mission Info */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 space-y-4">
            <Link
              href="/gate"
              className="inline-flex items-center space-x-3 text-2xl font-bold text-[#1e1b4b] group"
              id="gate-footer-logo"
            >
              <Image width={48} height={48}
                src="/logo.png"
                alt="Futurely Logo"
                className="h-10 w-10 object-contain group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <div className="flex items-center space-x-1.5">
                <span className="text-primary font-extrabold leading-none">Futurely</span>
                <span className="bg-primary text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-2xs">
                  GATE
                </span>
              </div>
            </Link>
            <p className="text-sm text-[#64748b] max-w-sm lg:max-w-none">
              Futurely GATE is dedicated to engineering students preparing for GATE 2026. Access 15+ years solved papers, stream-wise question banks, test series, and IIT/PSU roadmaps.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.youtube.com/@engrkaran"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-[#dde6ff] hover:bg-[#fff5f5] hover:border-[#fca5a5] hover:scale-110 transition-all shadow-sm"
              >
                <YoutubeIcon />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-[#dde6ff] hover:bg-[#fff0f7] hover:border-[#f9a8d4] hover:scale-110 transition-all shadow-sm"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.linkedin.com/in/karan-kumar-14a6ba2a6/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-[#dde6ff] hover:bg-[#eff6ff] hover:border-[#93c5fd] hover:scale-110 transition-all shadow-sm"
              >
                <LinkedinIcon />
              </a>
            </div>
          </div>

          {/* Col 2: Branches */}
          <div className="col-span-1">
            <h3 className="text-[#1e1b4b] font-semibold text-sm uppercase tracking-wider mb-3 sm:mb-4">
              Streams
            </h3>
            <ul className="space-y-2 text-sm">
              {BRANCH_LINKS.map(({ label, href, isNew }) => (
                <li key={href} className="flex items-center gap-1.5">
                  <Link
                    href={href}
                    className="relative inline-block hover:text-[#4f46e5] transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] after:w-0 after:rounded-full after:bg-[#4f46e5] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {label}
                  </Link>
                  {isNew && (
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 bg-blue-100 text-blue-700 border border-blue-200 rounded-md shrink-0">
                      New
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="col-span-1">
            <h3 className="text-[#1e1b4b] font-semibold text-sm uppercase tracking-wider mb-3 sm:mb-4">
              PYQs &amp; Prep
            </h3>
            <ul className="space-y-2 text-sm">
              {RESOURCE_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="relative inline-block hover:text-[#4f46e5] transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] after:w-0 after:rounded-full after:bg-[#4f46e5] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Admissions & PSUs */}
          <div className="col-span-1">
            <h3 className="text-[#1e1b4b] font-semibold text-sm uppercase tracking-wider mb-3 sm:mb-4">
              Admissions
            </h3>
            <ul className="space-y-2 text-sm">
              {ADMISSION_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="relative inline-block hover:text-[#4f46e5] transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] after:w-0 after:rounded-full after:bg-[#4f46e5] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Company */}
          <div className="col-span-1">
            <h3 className="text-[#1e1b4b] font-semibold text-sm uppercase tracking-wider mb-3 sm:mb-4">
              Futurely
            </h3>
            <ul className="space-y-2 text-sm">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="relative inline-block hover:text-[#4f46e5] transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] after:w-0 after:rounded-full after:bg-[#4f46e5] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Switch Exam Banner (GATE <-> Diploma / Polytechnic) */}
        <div
          className="mt-8 bg-gradient-to-r from-blue-50 via-indigo-50/70 to-sky-50/80 border border-blue-200/90 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
          id="gate-footer-exam-switch-banner"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Switch Exam: Jharkhand &amp; Bihar Polytechnic / D2D
                </h4>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200 uppercase tracking-wider">
                  Main Portal
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Preparing for PECE, Polytechnic Lateral Entry, or D2D B.Tech Lateral Entry? Practice state-level test packs and semester PYQs on Futurely's main portal.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all"
              id="gate-footer-switch-poly-btn"
            >
              <ArrowLeftRight className="w-4 h-4 text-blue-200" />
              <span>Go to Diploma / B.Tech Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Need Help Box */}
        <div className="mt-8 sm:mt-10 bg-white border border-[#dde6ff] rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left shadow-[0_4px_20px_rgba(79,70,229,0.07)]">
          <div>
            <h3 className="text-[#1e1b4b] font-bold text-base sm:text-lg">Need guidance with GATE?</h3>
            <p className="text-xs sm:text-sm text-[#64748b]">
              Have questions about branch selection, PYQ solutions, or test series? Reach out to our mentors anytime.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#f0fdf8] text-[#065f46] border border-[#d1fae5] text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-[#dcfce7] hover:border-[#6ee7b7] transition-colors w-full sm:w-auto"
            >
              <WaIcon />
              Contact us on WhatsApp
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity w-full sm:w-auto"
            >
              <Mail className="h-4 w-4" />
              Send us an Email
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-[#dde6ff] flex flex-col md:flex-row justify-between items-center text-xs text-[#64748b] gap-4 text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} Futurely GATE. All rights reserved.</p>
          <p className="text-[#475569] font-medium flex items-center justify-center gap-1">
            Built with <span className="text-red-500">❤️</span> by <span className="text-[#1e1b4b] font-semibold">Futurely</span>
          </p>
          <div className="flex items-center justify-center space-x-4">
            {BOTTOM_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="relative inline-block hover:text-[#4f46e5] transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] after:w-0 after:rounded-full after:bg-[#4f46e5] after:transition-all after:duration-300 hover:after:w-full"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
