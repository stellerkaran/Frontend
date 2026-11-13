"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdBanner from "../../components/AdBanner";
import CollegesMapExplorer from "@/components/colleges-map/CollegesMapExplorer";

const SITE_URL = "https://www.futurely.in";

const CATEGORIES = [
  {
    id: "polytechnic",
    serial: "Jharkhand",
    title: "Polytechnic",
    subtitle: "Diploma · 3 Years",
    desc: "JCECEB/PECE diploma colleges across Jharkhand & Bihar.",
    stats: [
      { label: "Colleges", value: "13" },
      { label: "Lowest Fee/yr", value: "₹3K" },
      { label: "Branches", value: "12" },
    ],
    accent: "#C75D3D",
    cta: "Explore Polytechnic Colleges",
  },
  {
    id: "btech-le",
    serial: "Jharkhand",
    title: "B.Tech Lateral Entry",
    subtitle: "Btech Lateral · 3 Years",
    desc: "Diploma-to-Degree lateral entry seats for polytechnic students via JCECE.",
    stats: [
      { label: "Colleges", value: "45+" },
      { label: "Lowest Fee/yr", value: "₹16K" },
      { label: "Seats (Lateral)", value: "10%" },
    ],
    accent: "#3D7A5C",
    cta: "Explore B.Tech Lateral Colleges",
  },
  {
    id: "btech4",
    serial: "Jharkhand",
    title: "B.Tech",
    subtitle: "Btech · 4 Years",
    desc: "Direct-entry engineering degree colleges, govt & private, via JCECE.",
    stats: [
      { label: "Colleges", value: "60+" },
      { label: "Lowest Fee/yr", value: "₹16K" },
      { label: "Branches", value: "18" },
    ],
    accent: "#1B2A4A",
    cta: "Explore B.Tech Colleges",
  },
];

const EXPLORE_ITEMS = [
  { label: "Cutoff & Rank", icon: "target" },
  { label: "Admission Process", icon: "doc" },
  { label: "Seat Matrix", icon: "grid" },
  { label: "Placements", icon: "briefcase" },
  { label: "Fees & Scholarships", icon: "coin" },
  { label: "Location & Hostel", icon: "pin" },
];

function Icon({ name }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "target":
      return <svg {...common}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /></svg>;
    case "doc":
      return <svg {...common}><path d="M6 2h9l5 5v15H6z" /><path d="M15 2v5h5" /></svg>;
    case "grid":
      return <svg {...common}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>;
    case "briefcase":
      return <svg {...common}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v2" /></svg>;
    case "coin":
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v10M9.5 9.5h3.2a1.8 1.8 0 0 1 0 3.6H9.8a1.8 1.8 0 0 0 0 3.6h3.5" /></svg>;
    case "pin":
      return <svg {...common}><path d="M12 22s7-7.4 7-12.5A7 7 0 0 0 5 9.5C5 14.6 12 22 12 22z" /><circle cx="12" cy="9.5" r="2.3" /></svg>;
    default:
      return null;
  }
}

export default function CollegeFinderHome() {
  const [hovered, setHovered] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    if (typeof document === "undefined") return;
    
    // Schemas initialized inside useEffect - no need for SITE_URL/CATEGORIES deps
    // since they're stable const values
    window.__next_schemas = window.__next_schemas || {};
    
    const canonicalUrl = `${SITE_URL}/colleges`;
    
    // itemListSchema
    window.__next_schemas.itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "College Finder Categories",
      url: canonicalUrl,
      itemListElement: CATEGORIES.map((cat, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: cat.title,
        description: cat.desc,
      })),
    };
    
    // breadcrumbSchema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "College Finder", item: canonicalUrl },
      ],
    };
    
    // faqSchema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I find the best polytechnic college in Jharkhand for my rank?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Use the Polytechnic category to compare colleges by cutoff rank, fees, branches and placement rate based on your JCECEB PECE counselling rank.",
          },
        },
        {
          "@type": "Question",
          name: "What is B.Tech Lateral Entry and who is eligible?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "B.Tech Lateral Entry (D2D) allows diploma/polytechnic students to join the second year of a B.Tech degree directly through JCECE, with 10% lateral entry seats reserved across most colleges.",
          },
        },
        {
          "@type": "Question",
          name: "How many B.Tech colleges are available in Jharkhand?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "There are 60+ government and private B.Tech colleges in Jharkhand offering direct-entry engineering degrees via JCECE counselling.",
          },
        },
      ],
    };
    
    // Inject itemListSchema into DOM
    const jsonLd = document.createElement("script");
    jsonLd.type = "application/ld+json";
    jsonLd.textContent = JSON.stringify(window.__next_schemas.itemListSchema);
    document.head.appendChild(jsonLd);
    
    // Inject breadcrumbSchema into DOM
    const breadcrumbJsonLd = document.createElement("script");
    breadcrumbJsonLd.type = "application/ld+json";
    breadcrumbJsonLd.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbJsonLd);
    
    // Inject faqSchema into DOM
    const faqJsonLd = document.createElement("script");
    faqJsonLd.type = "application/ld+json";
    faqJsonLd.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(faqJsonLd);
  }, []);

  const onSelectCategory = (id) => console.log("selected:", id);

  const handleCategoryClick = (categoryId) => {
    if (categoryId === "polytechnic") {
      router.push("/diploma");
    } else if (categoryId === "btech-le") {
      router.push("/btech-lateral-entry");
      //} else if (categoryId === "btech4" || categoryId === "btech") {
      // router.push("/btech");
    } else {
      onSelectCategory(categoryId);
    }
  };

  const pageTitle = "College Finder: Best B.Tech & Polytechnic Colleges in Jharkhand 2026";
  const metaDescription = "Find the best B.Tech, B.Tech Lateral Entry, and Polytechnic colleges in Jharkhand & Bihar. Compare cutoffs, admission process, seat matrix, placements, fees and hostel facilities by your JCECEB/PECE rank.";
  const canonicalUrl = `${SITE_URL}/colleges`;
  const ogImage = `${SITE_URL}/og-college-finder.jpg`;

  useEffect(() => {
    if (typeof document === "undefined") return;

    document.title = pageTitle;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute("content", metaDescription);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = metaDescription;
      document.head.appendChild(meta);
    }

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute("href", canonicalUrl);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", pageTitle);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute("content", metaDescription);
    }

    const ogImageTag = document.querySelector('meta[property="og:image"]');
    if (ogImageTag) {
      ogImageTag.setAttribute("content", ogImage);
    }

    const jsonLd = document.createElement("script");
    jsonLd.type = "application/ld+json";
    jsonLd.textContent = JSON.stringify(itemListSchema);
    document.head.appendChild(jsonLd);

    const breadcrumbJsonLd = document.createElement("script");
    breadcrumbJsonLd.type = "application/ld+json";
    breadcrumbJsonLd.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbJsonLd);

    const faqJsonLd = document.createElement("script");
    faqJsonLd.type = "application/ld+json";
    faqJsonLd.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(faqJsonLd);
  }, [canonicalUrl, faqSchema, itemListSchema, metaDescription, ogImage, pageTitle, breadcrumbSchema]);

  return (
    <div className="cf-page">
      <style dangerouslySetInnerHTML={{ __html: `
        .cf-page {
          --ink: #1B2A4A;
          --paper: #FBF8F2;
          --paper-line: #E4DDC9;
          --amber: #E8A33D;
          --terracotta: #C75D3D;
          --green: #3D7A5C;
          --muted: #6B6457;
          font-family: 'Inter', -apple-system, system-ui, sans-serif;
          background: var(--paper);
          color: var(--ink);
          min-height: 100vh;
          padding: 0 0 60px;
          overflow-x: hidden;
          width: 100%;
        }
        .cf-page * { box-sizing: border-box; }

        .cf-hero {
          padding: 40px 16px 24px;
          max-width: 1080px;
          margin: 0 auto;
          text-align: center;
        }

        .cf-h1 {
          font-size: clamp(20px, 5.5vw, 46px);
          line-height: 1.15;
          font-weight: 700;
          margin: 0 0 0px;
          word-break: break-word;
          overflow-wrap: break-word;
        }
        .cf-h1 em {
          font-style: normal;
          color: var(--terracotta);
        }
        @media (max-width: 380px) {
          .cf-h1 {
            font-size: 19px;
            line-height: 1.2;
          }
          .cf-hero {
            padding: 24px 8px 16px;
          }
        }
        @media (max-width: 340px) {
          .cf-h1 {
            font-size: 17.5px;
            line-height: 1.22;
          }
          .cf-hero {
            padding: 20px 6px 14px;
          }
        }

        .cf-rule {
          border: none;
          border-top: 1.5px dashed var(--paper-line);
          max-width: 1080px;
          margin: 24px auto 0;
        }

        .cf-cards {
          max-width: 1080px;
          margin: 24px auto 0;
          padding: 0 16px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          align-items: start;
        }
        @media (max-width: 860px) {
          .cf-cards {
            grid-template-columns: 1fr;
            max-width: 480px;
          }
        }
        @media (max-width: 380px) {
          .cf-cards {
            padding: 0 8px;
            gap: 10px;
          }
        }
        @media (max-width: 340px) {
          .cf-cards {
            padding: 0 6px;
            gap: 8px;
          }
        }

        .cf-card--primary {
          box-shadow: 0 4px 24px -8px rgba(27,42,74,0.18) !important;
        }

        .cf-card {
          background: #fff;
          border-radius: 12px;
          position: relative;
          cursor: pointer;
          border: 1.5px solid #ECE5D3;
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
          overflow: hidden;
          min-width: 0;
        }
        .cf-card:hover, .cf-card:focus-visible {
          transform: translateY(-4px);
          box-shadow: 0 20px 32px -16px rgba(27,42,74,0.30);
          border-color: var(--card-accent);
        }
        .cf-card:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }

        .cf-card-top {
          padding: 16px 16px 14px;
          border-bottom: 1px dashed #E4DDC9;
          position: relative;
        }
        @media (max-width: 380px) {
          .cf-card-top { padding: 12px 10px 10px; }
        }
        @media (max-width: 340px) {
          .cf-card-top { padding: 10px 8px 8px; }
        }

        .cf-card-serial {
          font-family: 'Courier New', monospace;
          font-size: 10px;
          letter-spacing: 0.06em;
          color: var(--muted);
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          gap: 6px;
          overflow: hidden;
        }
        .cf-card-serial span:first-child {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .cf-card-serial .stamp {
          color: var(--card-accent);
          font-weight: 700;
          border: 1.5px solid var(--card-accent);
          border-radius: 4px;
          padding: 1px 6px;
          transform: rotate(-2deg);
          display: inline-block;
          font-size: 9px;
          flex-shrink: 0;
        }
        .cf-card-title {
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 4px;
          color: var(--ink);
        }
        @media (max-width: 380px) {
          .cf-card-title { font-size: 19px; }
        }
        @media (max-width: 340px) {
          .cf-card-title { font-size: 17.5px; }
        }
        .cf-card-subtitle {
          font-size: 11.5px;
          color: var(--card-accent);
          font-weight: 700;
          margin: 0 0 8px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        @media (max-width: 340px) {
          .cf-card-subtitle { font-size: 10.5px; margin-bottom: 6px; }
        }
        .cf-card-desc {
          font-size: 12.5px;
          color: var(--muted);
          line-height: 1.5;
          margin: 0;
        }
        @media (max-width: 380px) {
          .cf-card-desc { font-size: 11.5px; line-height: 1.4; }
        }
        @media (max-width: 340px) {
          .cf-card-desc { font-size: 11px; }
        }

        .cf-perf {
          position: absolute;
          left: -1px; right: -1px;
          bottom: -7px;
          height: 14px;
          background: radial-gradient(circle 5px, var(--paper) 99%, transparent 100%);
          background-size: 16px 14px;
          background-repeat: repeat-x;
          background-position: left center;
          z-index: 1;
        }

        .cf-card-bottom {
          padding: 18px 16px 14px;
          display: flex;
          justify-content: space-between;
          gap: 4px;
        }
        @media (max-width: 380px) {
          .cf-card-bottom { padding: 12px 10px 10px; gap: 2px; }
        }
        @media (max-width: 340px) {
          .cf-card-bottom { padding: 10px 8px 8px; }
        }

        .cf-stat { text-align: left; min-width: 0; }
        .cf-stat-value {
          font-size: 17px;
          font-weight: 700;
          color: var(--ink);
          white-space: nowrap;
        }
        .cf-stat-label {
          font-size: 9.5px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--muted);
          margin-top: 2px;
          line-height: 1.3;
        }
        @media (max-width: 380px) {
          .cf-stat-value { font-size: 14px; }
          .cf-stat-label { font-size: 8px; }
        }
        @media (max-width: 340px) {
          .cf-stat-value { font-size: 13px; }
          .cf-stat-label { font-size: 7.5px; }
        }

        .cf-card-cta {
          margin: 0 16px 16px;
          padding: 10px 0;
          text-align: center;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 700;
          background: var(--card-accent);
          color: #fff;
          opacity: 0.9;
          letter-spacing: 0.01em;
          transition: opacity 0.15s;
        }
        .cf-card:hover .cf-card-cta { opacity: 1; }
        @media (max-width: 380px) {
          .cf-card-cta { margin: 0 10px 12px; font-size: 11.5px; padding: 8px 0; }
        }
        @media (max-width: 340px) {
          .cf-card-cta { margin: 0 8px 10px; font-size: 11px; padding: 7px 0; }
        }

        .cf-card--secondary { opacity: 0.88; }
        .cf-card--secondary:hover { opacity: 1; }

        .cf-explore {
          max-width: 1080px;
          margin: 36px auto 0;
          padding: 0 16px;
        }
        @media (max-width: 380px) {
          .cf-explore { padding: 0 8px; margin-top: 24px; }
        }
        @media (max-width: 340px) {
          .cf-explore { padding: 0 6px; margin-top: 20px; }
        }
        .cf-explore-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 14px;
          gap: 8px;
        }
        .cf-explore-title {
          font-size: 18px;
          font-weight: 700;
          margin: 0;
          color: var(--ink);
        }
        .cf-explore-note {
          font-size: 11px;
          color: var(--muted);
          white-space: nowrap;
        }
        @media (max-width: 380px) {
          .cf-explore-note { display: none; }
          .cf-explore-title { font-size: 15px; }
        }
        .cf-explore-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 1px;
          background: var(--paper-line);
          border: 1px solid var(--paper-line);
          border-radius: 10px;
          overflow: hidden;
        }
        @media (max-width: 900px) {
          .cf-explore-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 560px) {
          .cf-explore-grid { grid-template-columns: 1fr 1fr; }
        }
        .cf-explore-item {
          background: #fff;
          padding: 14px 10px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          font-weight: 600;
          color: var(--ink);
          cursor: pointer;
          transition: background 0.15s;
          overflow: hidden;
          min-width: 0;
        }
        .cf-explore-item span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .cf-explore-item:hover { background: #FBF8F2; }
        .cf-explore-item svg { color: var(--amber); flex-shrink: 0; }
        @media (max-width: 380px) {
          .cf-explore-item { padding: 10px 6px; font-size: 10.5px; gap: 4px; }
        }
        @media (max-width: 340px) {
          .cf-explore-item { padding: 9px 5px; font-size: 10px; gap: 3.5px; }
        }

        .cf-footnote {
          max-width: 1080px;
          margin: 32px auto 0;
          padding: 0 16px;
          font-size: 10px;
          color: var(--muted);
          font-family: 'Courier New', monospace;
          opacity: 0.6;
          word-break: break-word;
        }
        @media (max-width: 380px) {
          .cf-footnote { padding: 0 8px; font-size: 9px; margin-top: 20px; }
        }

        /* Keep the map controls' layout, but match the warm card theme above. */
        .cf-map-theme,
        .cf-map-theme * {
          font-family: 'Inter', -apple-system, system-ui, sans-serif;
        }
        .cf-map-theme .font-serif { font-family: inherit !important; }
        .cf-map-theme .text-slate-900,
        .cf-map-theme .text-slate-800,
        .cf-map-theme .text-slate-700 { color: var(--ink) !important; }
        .cf-map-theme .text-slate-600,
        .cf-map-theme .text-slate-500,
        .cf-map-theme .text-slate-400 { color: var(--muted) !important; }
        .cf-map-theme .border-slate-200,
        .cf-map-theme .border-slate-300,
        .cf-map-theme .border-slate-100 { border-color: var(--paper-line) !important; }
        .cf-map-theme .bg-slate-50 { background-color: var(--paper) !important; }
        .cf-map-theme .bg-slate-100 { background-color: #F4F0E8 !important; }
        .cf-map-theme .hover\\:bg-slate-100:hover { background-color: #F4F0E8 !important; }
        .cf-map-theme .hover\\:bg-slate-200:hover { background-color: #ECE5D3 !important; }
        .cf-map-theme .bg-teal-700,
        .cf-map-theme .bg-teal-600 { background-color: var(--terracotta) !important; }
        .cf-map-theme .text-teal-700,
        .cf-map-theme .text-teal-800,
        .cf-map-theme .text-teal-600 { color: var(--terracotta) !important; }
        .cf-map-theme .border-teal-600,
        .cf-map-theme .border-teal-200 { border-color: #E5A28E !important; }
        .cf-map-theme .bg-teal-50 { background-color: #FCEDE7 !important; }
        .cf-map-theme .ring-teal-600\\/30 { --tw-ring-color: rgba(199, 93, 61, 0.3) !important; }
        .cf-map-theme .text-sky-600 { color: var(--green) !important; }
        .cf-map-theme .bg-sky-600,
        .cf-map-theme .border-sky-600 { background-color: var(--green) !important; border-color: var(--green) !important; }
        .cf-map-theme input:focus,
        .cf-map-theme select:focus { --tw-ring-color: rgba(199, 93, 61, 0.3) !important; }
      ` }} />

      <div className="cf-hero mt-3 sm:mt-5">
        <h1 className="cf-h1">
          Got your rank? Find the{" "}
          <em>Best B.Tech &amp; Polytechnic College</em>{" "}
          in Jharkhand.
        </h1>
        
        {/* Interactive Colleges Map Featured Callout */}
        
       
      </div>

      <div className="cf-cards">
        {CATEGORIES.map((cat, i) => {
          const isDisabled = cat.id === "btech4"; // TODO: remove once /btech is live
          return (
            <div
              key={cat.id}
              className={`cf-card ${i < 2 ? "cf-card--primary" : "cf-card--secondary"}`}
              style={{ "--card-accent": cat.accent, ...(isDisabled ? { cursor: "default", opacity: 0.6 } : {}) }}
              role={isDisabled ? undefined : "button"}
              tabIndex={isDisabled ? -1 : 0}
              onMouseEnter={() => !isDisabled && setHovered(cat.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => !isDisabled && handleCategoryClick(cat.id)}
              onKeyDown={(e) => !isDisabled && (e.key === "Enter" || e.key === " ") && handleCategoryClick(cat.id)}
            >
              <div className="cf-card-strip" />
              <div className="cf-card-top">
                <div className="cf-card-serial">
                  <span>{cat.serial}</span>
                  <span className="stamp">{hovered === cat.id ? "OPEN →" : "VIEW"}</span>
                </div>
                <h2 className="cf-card-title">{cat.title}</h2>
                <p className="cf-card-subtitle">{cat.subtitle}</p>
                <p className="cf-card-desc">{cat.desc}</p>
                <div className="cf-perf" />
              </div>
              <div className="cf-card-bottom">
                {cat.stats.map((s) => (
                  <div className="cf-stat" key={s.label}>
                    <div className="cf-stat-value">{s.value}</div>
                    <div className="cf-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="cf-card-cta">{isDisabled ? "Coming Soon" : cat.cta}</div>
            </div>
          );
        })}
      </div>

      <div className="cf-explore">
        <div className="cf-explore-head">
          <h3 className="cf-explore-title">Explore by Topic</h3>
          <span className="cf-explore-note">Select a category above first</span>
        </div>
        <div className="cf-explore-grid">
          {EXPLORE_ITEMS.map((item) => (
            <div className="cf-explore-item" key={item.label}>
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Filter & Colleges Map Section */}
      <div className="cf-map-theme max-w-[1080px] mx-auto mt-7 sm:mt-10 px-1.5 sm:px-4">
        <CollegesMapExplorer embedded={true} />
      </div>

      <div style={{ margin: "20px 0" }}>
        <AdBanner slot="2434542863" />
      </div>
    </div>
  );
}
