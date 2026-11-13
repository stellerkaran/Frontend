import Link from "next/link";
import {
  Building2,
  GraduationCap,
  Award,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  MapPin,
  TrendingUp,
  Briefcase,
} from "lucide-react";

export const metadata = {
  title: "Top IITs, NITs & PSU Recruitment via GATE | Futurely GATE",
  description: "Explore GATE cutoff scores for M.Tech admissions at IISc Bangalore, IIT Bombay, IIT Delhi, and executive trainee recruitment at top PSUs (IOCL, NTPC, ONGC).",
};

export default function GateCollegesPage() {
  const topInstitutes = [
    {
      name: "Indian Institute of Science (IISc)",
      location: "Bengaluru, Karnataka",
      badge: "NIRF Rank #1 (University)",
      cutoffRange: "GATE Score 750 - 950+",
      programs: "M.Tech in AI, CSE, Smart Manufacturing, Quantum Tech",
      counselling: "Direct / COAP Portal",
    },
    {
      name: "IIT Bombay",
      location: "Mumbai, Maharashtra",
      badge: "Premier IIT",
      cutoffRange: "GATE Score 720 - 900+",
      programs: "M.Tech in CS, EE, Mech, Civil, IEOR",
      counselling: "COAP Portal",
    },
    {
      name: "IIT Delhi",
      location: "New Delhi",
      badge: "Premier IIT",
      cutoffRange: "GATE Score 700 - 890+",
      programs: "M.Tech, MS (Research), Interdisciplinary AI",
      counselling: "COAP Portal",
    },
    {
      name: "IIT Madras",
      location: "Chennai, Tamil Nadu",
      badge: "NIRF Rank #1 (Engineering)",
      cutoffRange: "GATE Score 710 - 890+",
      programs: "M.Tech in Aerospace, VLSI, Data Science",
      counselling: "COAP Portal",
    },
    {
      name: "IIT Kharagpur",
      location: "Kharagpur, West Bengal",
      badge: "Historic IIT",
      cutoffRange: "GATE Score 680 - 850+",
      programs: "M.Tech across 35+ specialized branches",
      counselling: "COAP Portal",
    },
    {
      name: "Top NITs (Trichy, Surathkal, Warangal)",
      location: "National Institutes of Technology",
      badge: "Premier Centrally Funded",
      cutoffRange: "GATE Score 550 - 750+",
      programs: "M.Tech in Core and Emerging Technology",
      counselling: "CCMT Counselling",
    },
  ];

  const psuRecruiters = [
    {
      name: "Indian Oil Corporation Ltd (IOCL)",
      designation: "Graduate Engineers / Officers",
      ctc: "₹16.3 LPA",
      eligibleBranches: "ME, CH, CE, EE, IN, CS",
      shortlistCutoff: "GATE Rank under 150 - 400",
    },
    {
      name: "National Thermal Power Corporation (NTPC)",
      designation: "Executive Trainees (ET)",
      ctc: "₹15.5 LPA",
      eligibleBranches: "EE, ME, IN, Mining, CE",
      shortlistCutoff: "GATE Rank under 200 - 500",
    },
    {
      name: "Oil & Natural Gas Corporation (ONGC)",
      designation: "Class-1 Executive (E1 Level)",
      ctc: "₹20+ LPA",
      eligibleBranches: "ME, EE, IN, CE, Petroleum",
      shortlistCutoff: "GATE Rank under 100 - 300",
    },
    {
      name: "Bhabha Atomic Research Centre (BARC)",
      designation: "OCES / DGFS Scientific Officer",
      ctc: "₹14.5 LPA + Gov Perks",
      eligibleBranches: "ME, CH, EE, EC, CS, Civil",
      shortlistCutoff: "Direct Interview Call on GATE Score",
    },
  ];

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-purple-100 text-purple-700 border border-purple-200">
          <Building2 className="w-3.5 h-3.5" />
          Admissions &amp; PSU Career Paths
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Target Institutes &amp; PSU Recruitment via GATE
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Explore benchmark GATE score cutoffs for M.Tech/Ph.D. seats at top IITs and high-paying Maharatna / Navratna PSU job opportunities.
        </p>
      </div>

      {/* COAP & CCMT Advisory Banner */}
      <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wide text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-md">
              Counselling Portals
            </span>
            <span className="text-xs text-slate-500 font-semibold">COAP &amp; CCMT</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Common Offer Acceptance Portal (COAP) for IITs &amp; Central Counselling (CCMT) for NITs
          </h3>
          <p className="text-xs text-slate-600">
            Remember to register on the COAP portal before applying individually to IIT portals, and on CCMT for NITs and IIEST Shibpur.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-3">
          <span className="text-xs font-bold text-purple-700 bg-white px-3 py-2 rounded-xl border border-purple-200 shadow-2xs">
            COAP 2026 Expected May 2026
          </span>
        </div>
      </div>

      {/* Section 1: Premier Institutes */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-purple-600" />
            Top M.Tech Destination Institutes (IISc &amp; IITs)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Approximate benchmark cutoff scores for general category aspirants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topInstitutes.map((inst, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
                    {inst.badge}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {inst.counselling}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {inst.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{inst.location}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                  <div className="text-slate-400 font-semibold">Expected GATE Cutoff:</div>
                  <div className="font-extrabold text-purple-700">{inst.cutoffRange}</div>
                  <div className="text-[11px] text-slate-500 pt-1">
                    {inst.programs}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Application Window</span>
                <span className="font-bold text-purple-600">March – April</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: PSU Recruitment via GATE */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-purple-600" />
            Top PSU Recruitment Through GATE Scores
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Public Sector Undertakings offering prestigious officer roles and handsome compensation packages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {psuRecruiters.map((psu, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-sm">
                  {psu.name.substring(0, 4)}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {psu.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{psu.designation}</p>
                </div>

                <div className="space-y-1.5 py-2 border-t border-slate-100 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Package (CTC):</span>
                    <span className="font-black text-emerald-600">{psu.ctc}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cutoff Rank:</span>
                    <span className="font-bold text-purple-700">{psu.shortlistCutoff}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 pt-1">
                    Eligible: {psu.eligibleBranches}
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 text-center">
                <span className="text-[11px] font-bold text-slate-500">
                  Notification: Jan - Mar Post-Results
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
