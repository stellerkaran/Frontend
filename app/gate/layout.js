import GateNavbar from "../../components/gate/GateNavbar";
import GateFooter from "../../components/gate/GateFooter";

export const metadata = {
  title: "Futurely GATE | Graduate Aptitude Test in Engineering Prep & Solved PYQs",
  description: "Prepare for GATE 2026 with solved previous year questions (PYQs), branch-wise practice, test series, formula books, and IIT/PSU cutoff guides.",
};

export default function GateLayout({ children }) {
  return (
    <div className="gate-section-root flex flex-col min-h-screen bg-slate-50 text-slate-900">
      {/* 
        Isolate GATE section:
        Hide main site's Navbar and Footer while inside /gate/* routes 
        without modifying existing root layout, Navbar, or Footer files.
      */}
      <style>{`
        #main-nav,
        #main-footer {
          display: none !important;
        }
      `}</style>

      {/* GATE-specific Navbar */}
      <GateNavbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* GATE-specific Footer */}
      <GateFooter />
    </div>
  );
}
