import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "../context/AuthContext";
import { AuthModalProvider } from "../context/AuthModalContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  metadataBase: new URL('https://www.futurely.in'),
  title: "Futurely | Jharkhand & Bihar State Entrance Exam Preparation",
  description: "Prepare for Jharkhand Polytechnic (PECE), B.Tech Lateral Entry (D2D), Polytechnic Lateral (JHPLE), and Bihar Polytechnic (BRP). Get free PYQ PDFs, syllabus, and test packs.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="bg-slate-50 text-slate-800 antialiased min-h-screen flex flex-col font-sans">
        <Script
          id="adsbygoogle-init"
          strategy="beforeInteractive"
        >
          {`window.adsbygoogle = window.adsbygoogle || [];`}
        </Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9939857316410378"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-90GE2ZHQ2R"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-90GE2ZHQ2R');
  `}
        </Script>

        <AuthProvider>
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "1000000000000-placeholder.apps.googleusercontent.com"}>
            <AuthModalProvider>
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
             
            </AuthModalProvider>
          </GoogleOAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
