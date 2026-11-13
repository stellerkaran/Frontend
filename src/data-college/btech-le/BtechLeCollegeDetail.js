"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useParams } from 'next/navigation';
import { Container, Row, Col, Badge, Table, Card } from 'react-bootstrap';
import { BTECH_LE_COLLEGES_DETAIL } from './btechLeData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AdBanner from '@/components/AdBanner';
import '@/styles/bootstrap-scoped.css';

const rupee = n => '₹' + Intl.NumberFormat('en-IN').format(Math.round(n || 0));

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'admission', label: 'Admission' },
  { id: 'documents', label: 'Documents' },
  { id: 'courses', label: 'Courses' },
  { id: 'cutoff', label: 'Cutoff' },
  { id: 'fees', label: 'Fees' },
  { id: 'hostel', label: 'Hostel' },
  { id: 'placements', label: 'Placements' },
];

// ---------- Explore Colleges (built directly from the D2D data set — ----------
// ---------- no separate logo assets exist for these colleges yet) ------------
// NOTE: BTECH_LE_COLLEGES_DETAIL has reference-alias keys ('gec-chaibasa',
// 'gec-dumka', and 4 unrouted aliases), so dedupe by object identity —
const EXPLORE_SEEN = new Set();
const EXPLORE_COLLEGES = Object.entries(BTECH_LE_COLLEGES_DETAIL)
  .filter(([key, c]) => {
    if (EXPLORE_SEEN.has(c)) return false;
    EXPLORE_SEEN.add(c);
    // Skip the 4 unrouted alias keys (godda/bokaro/kk/rvs aliases):
    // they share the object with a routed id, and Object.entries keeps the
    // FIRST key ('gec-godda' etc.), so this keeps only routed keys.
    // Also skip 'gec-dumka'/'gec-chaibasa': they alias the dumka/chaibasa
    // objects whose id fields are 'dumka-engineering'/'chaibasa-engineering'.
    if (key !== c.id) return false;
    if (key === 'gec-dumka' || key === 'gec-chaibasa') return false;
    return true;
  })
  .map(([routeKey, c]) => ({
    name: c.name,
    path: `/btech-lateral-entry/${routeKey}`,
    location: `${c.city}, ${c.state}`,
    logo: c.image,
  }));

// Route slugs rendered by the 14 static pages -> college shown.
// (Alias routes pass the shared key's college but keep their own slug/URL,
//  e.g. route 'chaibasa-engineering' renders college id 'chaibasa-engineering'
//  with canonical .../gec-chaibasa.)
const ROUTE_RENDERED_IDS = {
  'bit-sindri': 'bit-sindri',
  'chaibasa-engineering': 'chaibasa-engineering',
  'cit-ranchi': 'cit-ranchi',
  'dumka-engineering': 'dumka-engineering',
  'gec-bokaro': 'gec-bokaro',
  'gec-chaibasa': 'chaibasa-engineering',
  'gec-dumka': 'dumka-engineering',
  'gec-godda': 'gec-godda',
  'gec-palamu': 'gec-palamu',
  'kkcem-dhanbad': 'kkcem-dhanbad',
  'ramgarh-engineering': 'ramgarh-engineering',
  'rtcit-ranchi': 'rtcit-ranchi',
  'rvscet-jamshedpur': 'rvscet-jamshedpur',
  'ucet-hazaribagh': 'ucet-hazaribagh',
};
// The Explore widget only ever linked to these 12 routed ids
// (bit-sindri + ramgarh-engineering were absent from every static EXPLORE list).
const LINKABLE_PATHS = new Set([
  '/btech-lateral-entry/cit-ranchi',
  '/btech-lateral-entry/gec-bokaro',
  '/btech-lateral-entry/chaibasa-engineering',
  '/btech-lateral-entry/gec-chaibasa',
  '/btech-lateral-entry/dumka-engineering',
  '/btech-lateral-entry/gec-dumka',
  '/btech-lateral-entry/gec-godda',
  '/btech-lateral-entry/gec-palamu',
  '/btech-lateral-entry/kkcem-dhanbad',
  '/btech-lateral-entry/rtcit-ranchi',
  '/btech-lateral-entry/rvscet-jamshedpur',
  '/btech-lateral-entry/ucet-hazaribagh',
]);

const POPULAR_EXAMS = [
  { name: 'D2D Btech Lateral Jharkhand 2026', path: '/resources/jharkhand-d2d/exam-information', logo: BTECH_LE_COLLEGES_DETAIL['bit-sindri']?.image },
  { name: 'JCECEB D2D Counselling 2026', path: '/resources/jharkhand-d2d/exam-information', logo: BTECH_LE_COLLEGES_DETAIL['bit-sindri']?.image },
  { name: 'Jharkhand Polytechnic 2026', path: '/resources/jharkhand-d2d/exam-information', logo: BTECH_LE_COLLEGES_DETAIL['bit-sindri']?.image },
];

// NOTE: no source data was given for a "Latest News" feed on D2D pages, so these
// items stay generic — but the college-specific headline is derived from the
// resolved college name so the shared component never shows another college's name.
const getLatestNews = collegeName => [
  { title: 'JCECEB D2D 2026: Application Form Released', date: 'Jun 2026' },
  { title: 'D2D Lateral Entry Counselling 2026: Schedule Out', date: 'Jun 2026' },
  { title: 'JCECEB D2D Admit Card 2026: Download Now', date: 'May 2026' },
  { title: 'D2D Lateral Entry Seat Allotment 2025: Result Declared', date: 'Apr 2026' },
  { title: `${collegeName} Lateral Entry Cutoff 2025: Category-wise Ranks Released`, date: 'Mar 2026' },
];

// ---------- Small building blocks ----------

function SectionLabel({ eyebrow, title }) {
  return (
    <div className="mb-3">
      <div
        className="text-uppercase fw-semibold"
        style={{ fontSize: 12, letterSpacing: '0.08em', color: '#0d9488' }}
      >
        {eyebrow}
      </div>
      <h2 className="fw-bold mb-0 section-label-title" style={{ fontSize: '1.4rem', color: '#1e293b' }}>
        {title}
      </h2>
    </div>
  );
}

function StatPill({ label, value, accent }) {
  return (
    <div
      className="hero-stat-pill text-center rounded"
      style={{ background: '#fff', boxShadow: '0 4px 14px rgba(0,0,0,0.14)' }}
    >
      <div className="hero-stat-value" style={{ fontWeight: 800, color: accent || '#1e293b' }}>{value}</div>
      <div className="hero-stat-label text-muted text-uppercase" style={{ letterSpacing: '0.06em' }}>{label}</div>
    </div>
  );
}

function PlacementBar({ branch, rate, lpa, maxLpa, placed, total }) {
  const widthPct = Math.min(100, (rate || 0));
  const lpaWidthPct = Math.min(100, (((lpa || 0) / (maxLpa || 1))) * 100);
  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between align-items-baseline mb-1">
        <span className="fw-semibold" style={{ fontSize: '0.92rem', color: '#1e293b' }}>{branch}</span>
        <span className="text-muted" style={{ fontSize: '0.8rem' }}>
          {placed && total ? `${placed}/${total}` : `${rate}%`} placed &bull; {(lpa || 0).toFixed(1)} LPA avg
        </span>
      </div>
      <div className="d-flex gap-2 align-items-center">
        <div style={{ flex: 1, height: 8, background: '#e9ecef', borderRadius: 4, overflow: 'hidden' }}>
          <div
            style={{
              width: `${widthPct}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #0d9488 0%, #06b6d4 100%)',
              borderRadius: 4,
            }}
          />
        </div>
        <div style={{ flex: 1, height: 8, background: '#e9ecef', borderRadius: 4, overflow: 'hidden' }}>
          <div
            style={{
              width: `${lpaWidthPct}%`,
              height: '100%',
              background: '#f59e0b',
              borderRadius: 4,
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ---------- Leaderboard Ad 728x90 ----------
// NOTE: ad slot IDs below are copied from the gp-adityapur page as placeholders.
// Reusing the same slot ID across two different pages is against AdSense policy
// in some setups — generate fresh slot IDs for this page in your AdSense dashboard
// before publishing.
function LeaderboardAd({ slot }) {
  const adRef = useRef(null);
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) { }
  }, []);

  return (
    <div
      className="mb-5"
      style={{
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        background: '#f1f5f9',
        borderRadius: 10,
        minHeight: 90,
      }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', maxWidth: 728, height: 90 }}
        data-ad-client="ca-pub-9939857316410378"
        data-ad-slot={slot}
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      />
    </div>
  );
}

// ---------- Sidebar Square Ad ----------
function SidebarAd({ slot }) {
  const adRef = useRef(null);
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) { }
  }, []);

  return (
    <div
      style={{
        width: '100%',
        minHeight: 250,
        background: '#f1f5f9',
        borderRadius: 10,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', maxWidth: 300, height: 250 }}
        data-ad-client="ca-pub-9939857316410378"
        data-ad-slot={slot}
        data-ad-format="rectangle"
        data-full-width-responsive="true"
      />
    </div>
  );
}

// ---------- Explore Colleges ----------
function ExploreColleges({ currentId }) {
  const normalized = ROUTE_RENDERED_IDS[currentId] || currentId;
  const list = EXPLORE_COLLEGES.filter(
    c => LINKABLE_PATHS.has(c.path) && !c.path.includes(currentId) && !c.path.includes(normalized)
  );
  return (
    <Card className="border-0" style={{ boxShadow: '0 1px 10px rgba(0,0,0,0.06)', borderRadius: 12 }}>
      <Card.Body className="p-3">
        <div
          className="text-uppercase fw-semibold mb-2 pb-2"
          style={{ fontSize: 12, letterSpacing: '0.08em', color: '#0d9488', borderBottom: '1px solid #e9ecef' }}
        >
          Explore Colleges
        </div>
        <div className="d-flex flex-column">
          {list.map((col, i) => (
            <Link
              key={i}
              href={col.path}
              style={{ textDecoration: 'none' }}
            >
              <div
                className="d-flex align-items-center gap-3 py-3"
                style={{
                  borderBottom: i < list.length - 1 ? '1px solid #f1f5f9' : 'none',
                }}
              >

                <div
                  style={{
                    position: 'relative',
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '1px solid #e9ecef',
                  }}
                >
                  <Image
                    src={col.logo}
                    alt={col.name}
                    fill
                    sizes="44px"
                    style={{ objectFit: 'cover' }}
                    unoptimized={typeof col.logo === 'string' && col.logo.startsWith('http')}
                  />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div className="fw-semibold" style={{ fontSize: '0.95rem', color: '#1e293b', lineHeight: 1.3 }}>
                    {col.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#0d9488', lineHeight: 1.3 }}>
                    {col.location}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}

// ---------- Popular Exams ----------
function PopularExams() {
  return (
    <Card className="border-0" style={{ boxShadow: '0 1px 10px rgba(0,0,0,0.06)', borderRadius: 12 }}>
      <Card.Body className="p-3">
        <div
          className="text-uppercase fw-semibold mb-2 pb-2"
          style={{ fontSize: 12, letterSpacing: '0.08em', color: '#0d9488', borderBottom: '1px solid #e9ecef' }}
        >
          Popular Exams
        </div>
        <div className="d-flex flex-column">
          {POPULAR_EXAMS.map((exam, i) => (
            <Link
              key={i}
              href={exam.path}
              style={{ textDecoration: 'none' }}
            >
              <div
                className="d-flex align-items-center gap-3 py-3"
                style={{
                  borderBottom: i < POPULAR_EXAMS.length - 1 ? '1px solid #f1f5f9' : 'none',
                }}
              >

                <div
                  style={{
                    position: 'relative',
                    width: 44,
                    height: 44,
                    borderRadius: 8,
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '1px solid #e9ecef',
                  }}
                >
                  <Image
                    src={exam.logo}
                    alt={exam.name}
                    fill
                    sizes="44px"
                    style={{ objectFit: 'cover' }}
                    unoptimized={typeof exam.logo === 'string' && exam.logo.startsWith('http')}
                  />
                </div>
                <div className="fw-semibold" style={{ fontSize: '0.92rem', color: '#1e293b', lineHeight: 1.35, minWidth: 0 }}>
                  {exam.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}

// ---------- Latest News ----------
function LatestNews({ collegeName }) {
  const newsList = getLatestNews(collegeName);
  return (
    <Card className="border-0" style={{ boxShadow: '0 1px 10px rgba(0,0,0,0.06)', borderRadius: 12 }}>
      <Card.Body className="p-3">
        <div
          className="text-uppercase fw-semibold mb-3"
          style={{ fontSize: 11, letterSpacing: '0.08em', color: '#0d9488' }}
        >
          Latest News
        </div>
        <div className="d-flex flex-column">
          {newsList.map((news, i) => (
            <div
              key={i}
              className="py-2"
              style={{
                borderBottom: i < newsList.length - 1 ? '1px solid #f1f5f9' : 'none',
              }}
            >
              <div
                style={{
                  fontSize: '0.82rem',
                  color: '#1e293b',
                  fontWeight: 500,
                  lineHeight: 1.45,
                  cursor: 'pointer',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#0d9488'}
                onMouseLeave={e => e.currentTarget.style.color = '#1e293b'}
              >
                {news.title}
              </div>
              <div className="text-muted" style={{ fontSize: '0.72rem', marginTop: 2 }}>
                {news.date}
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}

// Shared component renders one college from BTECH_LE_COLLEGES_DETAIL.
// routeSlug is the URL slug that brought the visitor here (needed because two
// routes share one data record but must keep their own slug/canonical/identity).
export default function BtechLeCollegeDetail({ customId, routeSlug }) {
  const params = useParams();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('overview');
  const [mounted, setMounted] = useState(false);
  const sectionRefs = useRef({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const collegeId = customId || params?.id || (pathname ? pathname.split('/').pop() : 'bit-sindri');
  const requestedSlug = routeSlug || (pathname ? pathname.split('/').pop() : collegeId);
  const effectiveSlug = ROUTE_RENDERED_IDS[requestedSlug] ? requestedSlug : collegeId;
  const d = { ...(BTECH_LE_COLLEGES_DETAIL[collegeId] || BTECH_LE_COLLEGES_DETAIL['bit-sindri']) };
  const maxLpa = Math.max(...(d?.placements?.branchWise?.map(b => b.avgPackageLPA || 0) || [1]));

  const SITE_URL = 'https://www.futurely.in';
  const canonicalUrl = `${SITE_URL}/btech-lateral-entry/${effectiveSlug}`;
  const totalSeats = d.courses.reduce((a, c) => a + c.seats, 0);
  const branchNames = d.courses.map(c => c.name).join(', ');
  const pageTitle = `${d.name}: D2D Lateral Entry Admission, Fees, Cutoff 2026`;
  const metaDescription = `${d.tagline} Lateral entry branches: ${branchNames}. Fees ${rupee(d.fees.totalApproxFirstYear)}/yr, ${d.placements.summary.placementRate}% placement, ${d.placements.summary.avgPackageLPA} LPA avg package. Admission via JCECEB D2D counselling.`;
  const imgSrc = typeof d.image === 'string' ? d.image : d.image?.src || '';
  const imageUrl = imgSrc.startsWith('http') ? imgSrc : `${SITE_URL}${imgSrc}`;

  const collegeSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollegeOrUniversity',
    name: d.name,
    description: d.tagline,
    url: canonicalUrl,
    image: imageUrl,
    foundingDate: d.established,
    address: {
      '@type': 'PostalAddress',
      addressLocality: d.city,
      addressRegion: d.state,
      addressCountry: 'IN',
    },
    parentOrganization: {
      '@type': 'CollegeOrUniversity',
      name: d.affiliation,
    },
    numberOfStudents: totalSeats,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'B.Tech Lateral Entry Colleges', item: `${SITE_URL}/btech-lateral-entry` },
      { '@type': 'ListItem', position: 3, name: d.name, item: canonicalUrl },
    ],
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = sectionRefs.current[s.id];
        if (el && el.offsetTop <= scrollPos) current = s.id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function scrollToSection(id) {
    const el = sectionRefs.current[id];
    if (el) {
      window.scrollTo({ top: el.offsetTop - 110, behavior: 'smooth' });
    }
  }

  return (
    <div className="bootstrap-scope" style={{ background: '#f8fafc', minHeight: '100vh', overflowX: 'hidden', width: '100%' }}>

      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collegeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Inline <style> via dangerouslySetInnerHTML so React never HTML-escapes the CSS (it would escape "&" and ">" inside a text child, breaking hydration on server-rendered HTML). */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* ---- Hero stat pill grid ---- */
        .hero-stat-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(100px, 1fr));
          gap: 10px;
        }
        .hero-stat-pill {
          padding: 12px 14px;
          min-width: 0;
          background: #fff;
          box-shadow: 0 4px 14px rgba(0,0,0,0.08);
          border: 1px solid #e2e8f0;
          border-radius: 8px;
        }
        .hero-stat-value { font-size: 1.15rem; line-height: 1.15; white-space: nowrap; }
        .hero-stat-label { font-size: 10px; margin-top: 3px; white-space: nowrap; }

        /* ---- Sticky section nav ---- */
        .section-nav-scroll {
          overflow-x: auto;
          white-space: nowrap;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .section-nav-scroll::-webkit-scrollbar { display: none; }

        /* ---- Tablet ---- */
        @media (max-width: 991px) {
          .hero-banner { min-height: 280px !important; }
          .hero-stat-pill { padding: 10px 10px; }
          .hero-stat-value { font-size: 1.05rem; }
          .hero-stat-label { font-size: 9.5px; }
        }

        /* ---- Mobile ---- */
        @media (max-width: 767px) {
          .hero-banner { min-height: 240px !important; padding-top: 28px !important; padding-bottom: 16px !important; }
          .hero-stat-grid-mobile {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 6px !important;
          }
          .hero-stat-pill { padding: 8px 6px; }
          .hero-stat-value { font-size: 0.95rem; }
          .hero-stat-label { font-size: 9px; letter-spacing: 0.03em !important; }
        }

        /* ---- Small mobile ---- */
        @media (max-width: 400px) {
          .hero-banner { min-height: 210px !important; }
          .hero-stat-pill { padding: 7px 4px; }
          .hero-stat-value { font-size: 0.85rem; }
          .hero-stat-label { font-size: 7.5px; }
        }

        /* ---- 340px & 360px fixes ---- */
        @media (max-width: 360px), (max-width: 340px) {
          *, *::before, *::after { box-sizing: border-box; }
          .bootstrap-scope { overflow-x: hidden !important; width: 100% !important; max-width: 100vw !important; }
          .container, .container-fluid { padding-left: 8px !important; padding-right: 8px !important; width: 100% !important; max-width: 100% !important; }
          .hero-banner { min-height: 190px !important; }
          .hero-title-block h1 { font-size: 1.1rem !important; line-height: 1.25 !important; word-wrap: break-word !important; }
          .hero-stat-grid-mobile { gap: 4px !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .hero-stat-pill { padding: 6px 3px !important; }
          .hero-stat-value { font-size: 0.78rem !important; }
          .hero-stat-label { font-size: 6.5px !important; letter-spacing: 0 !important; }
          .section-nav-4col { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; gap: 3px !important; padding: 6px 0 !important; }
          .section-nav-4col button { font-size: 0.72rem !important; padding: 5px 1px !important; border-radius: 6px !important; min-width: 0 !important; text-overflow: ellipsis !important; overflow: hidden !important; white-space: nowrap !important; }
          .table-responsive { overflow-x: auto !important; -webkit-overflow-scrolling: touch !important; width: 100% !important; }
          table { min-width: 0 !important; table-layout: auto !important; font-size: 0.70rem !important; width: 100% !important; }
          th, td { padding: 5px 4px !important; white-space: nowrap !important; }
          th[style*="width"], td[style*="width"] { width: auto !important; min-width: 0 !important; }
          .card-body { padding: 10px !important; }
          .col-6 { flex: 0 0 50% !important; max-width: 50% !important; }
          .placement-branch-label { white-space: normal !important; font-size: 0.78rem !important; }
          .recharts-wrapper { width: 100% !important; max-width: 100% !important; }
          .recharts-surface { max-width: 100% !important; }
          .recruiter-pill { font-size: 0.7rem !important; padding: 4px 8px !important; }
          .recruiter-pill-icon { width: 16px !important; height: 16px !important; font-size: 0.58rem !important; }
          .section-label-title { font-size: 1.15rem !important; }
          .fee-waiver-col { flex: 0 0 100% !important; max-width: 100% !important; }
          .placement-stat-col { flex: 0 0 50% !important; max-width: 50% !important; }
          .quick-facts-row { font-size: 0.78rem !important; }
          .transport-col { flex: 0 0 50% !important; max-width: 50% !important; }
          .doc-col { flex: 0 0 100% !important; max-width: 100% !important; }
        }
      ` }} />

      {/* ---------- HERO ---------- */}
      <div style={{ position: 'relative' }}>
        <div
          className="hero-banner"
          style={{
            position: 'relative',
            minHeight: 380,
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'flex-end',
            paddingTop: 40,
            paddingBottom: 20,
          }}
        >
          {/* Hero background image for SEO */}
          <Image
            src={d.image || imgSrc}
            alt={`${d.name} campus`}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            unoptimized={typeof (d.image || imgSrc) === 'string' && (d.image || imgSrc).startsWith('http')}
          />
          {/* Dark gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.85) 100%)',
              zIndex: 1,
            }}
          />
          <Container style={{ position: 'relative', zIndex: 2 }}>
            <Row className="align-items-end">
              <Col xs={12} md={7} lg={8}>
                <div className="hero-title-block">
                  <div className="d-flex flex-wrap gap-2 mb-2">
                    <Badge bg="light" text="dark" className="fw-semibold" style={{ fontSize: '0.72rem' }}>{d.type}</Badge>
                    <Badge bg="light" text="dark" className="fw-semibold" style={{ fontSize: '0.72rem' }}>Est. {d.established}</Badge>
                    <Badge bg="light" text="dark" className="fw-semibold" style={{ fontSize: '0.72rem' }}>{d.affiliation}</Badge>
                  </div>
                  <h1
                    className="fw-bold text-white mb-1"
                    style={{ fontSize: 'clamp(1.2rem, 1rem + 1.6vw, 2.3rem)', letterSpacing: '-0.01em', lineHeight: 1.25 }}
                  >
                    {d.name}
                  </h1>
                  <div className="text-white-50" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                    {d.city}, {d.state}
                  </div>
                </div>
              </Col>
              <Col md={5} lg={4} className="d-none d-md-block">
                <div className="hero-stat-grid">
                  <StatPill label="Lateral Branches" value={d.courses.length} />
                  <StatPill label="Total LE Seats" value={d.courses.reduce((a, c) => a + c.seats, 0)} accent="#0d9488" />
                  <StatPill label="Avg Package" value={`${d.placements.summary.avgPackageLPA} LPA`} accent="#0d9488" />
                  <StatPill label="Placement" value={`${d.placements.summary.placementRate}%`} accent="#0d9488" />
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Mobile stat grid (cleanly below hero image) */}
        <div className="d-block d-md-none py-2 px-2" style={{ background: '#f8fafc' }}>
          <Container>
            <div className="hero-stat-grid-mobile d-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              <StatPill label="Lateral Branches" value={d.courses.length} />
              <StatPill label="Total LE Seats" value={d.courses.reduce((a, c) => a + c.seats, 0)} accent="#0d9488" />
              <StatPill label="Avg Package" value={`${d.placements.summary.avgPackageLPA} LPA`} accent="#0d9488" />
              <StatPill label="Placement" value={`${d.placements.summary.placementRate}%`} accent="#0d9488" />
            </div>
          </Container>
        </div>
      </div>

      {/* ---------- STICKY SECTION NAV ---------- */}
      <div
        style={{
          position: 'sticky',
          top: 64,
          zIndex: 20,
          background: '#fff',
          borderBottom: '1px solid #e9ecef',
          boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
        }}
      >
        <Container>
          {/* Desktop — horizontal scroll */}
          <div className="d-none d-md-flex section-nav-scroll gap-1 py-2">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="border-0 fw-semibold"
                style={{
                  background: activeSection === s.id ? '#0d9488' : 'transparent',
                  color: activeSection === s.id ? '#fff' : '#475569',
                  fontSize: '0.85rem',
                  padding: '6px 14px',
                  borderRadius: 20,
                  transition: 'all 0.15s ease',
                  flexShrink: 0,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Mobile — 4x2 grid */}
          <div
            className="d-grid d-md-none section-nav-4col"
            style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', padding: '8px 0' }}
          >
            {SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="border-0 fw-semibold"
                style={{
                  background: activeSection === s.id ? '#0d9488' : '#f8fafc',
                  color: activeSection === s.id ? '#fff' : '#475569',
                  fontSize: 'clamp(0.82rem, 3vw, 0.92rem)',
                  padding: '6px 2px',
                  borderRadius: 8,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  minWidth: 0,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* ---------- CONTENT ---------- */}
      <Container className="py-4">
        <Row>
          <Col xs={12} lg={8}>

            {/* OVERVIEW */}
            <section ref={el => (sectionRefs.current.overview = el)} id="overview" className="mb-5" style={{ scrollMarginTop: 110 }}>
              <SectionLabel eyebrow="About the college" title="Overview" />
              <Card className="border-0" style={{ boxShadow: '0 1px 10px rgba(0,0,0,0.06)', borderRadius: 12 }}>
                <Card.Body className="p-4">
                  <p className="mb-3 fst-italic text-muted" style={{ fontSize: '0.95rem' }}>{d.tagline}</p>
                  {d.overview.map((p, i) => (
                    <p key={i} className="mb-2" style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.7 }}>{p}</p>
                  ))}
                  <hr className="my-3" />
                  <Row className="g-3">
                    {/* NOTE: BTECH_LE_COLLEGES_DETAIL only supplies nearestRail, nearestBus,
                        nearestAirport (no separate "major junction" field like gpaData did),
                        so this row is 3 columns instead of 4. Add a nearestRailAlt field to
                        the data if you want the 4-column layout back. */}
                    <Col xs={6} md={4} className="transport-col">
                      <div className="text-muted" style={{ fontSize: 11 }}>NEAREST RAILWAY</div>
                      <div className="fw-semibold" style={{ fontSize: '0.88rem' }}>{d.howToReach.nearestRail || '—'}</div>
                    </Col>
                    <Col xs={6} md={4} className="transport-col">
                      <div className="text-muted" style={{ fontSize: 11 }}>BUS STAND</div>
                      <div className="fw-semibold" style={{ fontSize: '0.88rem' }}>{d.howToReach.nearestBus || '—'}</div>
                    </Col>
                    <Col xs={6} md={4} className="transport-col">
                      <div className="text-muted" style={{ fontSize: 11 }}>NEAREST AIRPORT</div>
                      <div className="fw-semibold" style={{ fontSize: '0.88rem' }}>{d.howToReach.nearestAirport || '—'}</div>
                    </Col>
                  </Row>
                  <div className="mt-3">
                    <a
                      href={d.howToReach.map}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm"
                      style={{ background: '#0d9488', color: '#fff', borderRadius: 6 }}
                    >
                      Open location in Maps
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </section>

            {/* AD 1 */}
            <div className="my-3">
              <AdBanner slot="2434542863" />
            </div>

            {/* ADMISSION PROCESS */}
            <section ref={el => (sectionRefs.current.admission = el)} id="admission" className="mb-5" style={{ scrollMarginTop: 110 }}>
              <SectionLabel eyebrow="How to get in" title="Admission Process" />
              <Card className="border-0" style={{ boxShadow: '0 1px 10px rgba(0,0,0,0.06)', borderRadius: 12 }}>
                <Card.Body className="p-4">
                  <p className="mb-4" style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.7 }}>
                    {d.admissionProcess.intro}
                  </p>
                  <div className="mb-0">
                    {d.admissionProcess.steps.map((step, i) => (
                      <div key={i} className="d-flex mb-3">
                        <div
                          className="d-flex align-items-center justify-content-center flex-shrink-0 fw-bold"
                          style={{
                            width: 28, height: 28, borderRadius: '50%',
                            background: '#0d948815', color: '#0d9488',
                            fontSize: '0.8rem', marginRight: 12,
                          }}
                        >
                          {i + 1}
                        </div>
                        <div>
                          <div className="fw-semibold" style={{ fontSize: '0.9rem', color: '#1e293b' }}>{step.title}</div>
                          <div className="text-muted" style={{ fontSize: '0.85rem' }}>{step.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </section>

            {/* DOCUMENTS */}
            <section ref={el => (sectionRefs.current.documents = el)} id="documents" className="mb-5" style={{ scrollMarginTop: 110 }}>
              <SectionLabel eyebrow="Keep these ready" title="Documents Required" />
              <Card className="border-0" style={{ boxShadow: '0 1px 10px rgba(0,0,0,0.06)', borderRadius: 12 }}>
                <Card.Body className="p-4">
                  <Row className="g-2">
                    {d.admissionProcess.documents.map((doc, i) => (
                      <Col xs={12} sm={6} key={i} className="doc-col">
                        <div className="d-flex align-items-start" style={{ fontSize: '0.85rem', color: '#475569' }}>
                          <span style={{ color: '#0d9488', marginRight: 6, flexShrink: 0 }}>&#10003;</span> {doc}
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            </section>
            <LeaderboardAd slot="5805927182" />

            {/* COURSES & SEATS */}
            <section ref={el => (sectionRefs.current.courses = el)} id="courses" className="mb-5" style={{ scrollMarginTop: 110 }}>
              <SectionLabel eyebrow="What's on offer" title="B.Tech Lateral Entry Courses & Seats" />
              <Card className="border-0" style={{ boxShadow: '0 1px 10px rgba(0,0,0,0.06)', borderRadius: 12 }}>
                <Card.Body className="p-0">
                  <Table responsive className="mb-0 align-middle">
                    <thead style={{ background: '#f8fafc' }}>
                      <tr style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        <th className="ps-3 py-3">Branch</th>
                        <th className="py-3">Duration</th>
                        <th className="py-3">Seats</th>
                        <th className="py-3 pe-3">Cutoff</th>
                      </tr>
                    </thead>
                    <tbody>
                      {d.courses.map((c, i) => (
                        <tr key={i} style={{ fontSize: '0.85rem' }}>
                          <td className="ps-3 py-3">
                            <div className="fw-semibold" style={{ color: '#1e293b' }}>{c.name}</div>
                            <div className="text-muted" style={{ fontSize: '0.75rem' }}>{c.code}</div>
                          </td>
                          <td className="py-3 text-muted">{c.duration}</td>
                          <td className="py-3">
                            <Badge bg="light" text="dark" style={{ fontSize: '0.78rem' }}>{c.seats}</Badge>
                          </td>
                          <td className="py-3 pe-3 fw-semibold" style={{ color: '#0d9488' }}>
                            {c.cutoffRank ? c.cutoffRank.toLocaleString('en-IN') : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>

              <div className="mt-3">
                <div className="fw-semibold mb-2" style={{ fontSize: '0.88rem', color: '#1e293b' }}>
                  Category-wise seat matrix ({d.seatMatrix.year})
                </div>
                <Card className="border-0" style={{ boxShadow: '0 1px 10px rgba(0,0,0,0.06)', borderRadius: 12 }}>
                  <Card.Body className="p-0">
                    <Table responsive bordered size="sm" className="mb-0" style={{ fontSize: '0.78rem' }}>
                      <thead style={{ background: '#f8fafc' }}>
                        <tr>
                          <th className="ps-2">Branch</th>
                          {d.seatMatrix.categories.map(cat => (
                            <th key={cat} className="text-center">{cat}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {d.seatMatrix.rows.map((row, i) => (
                          <tr key={i}>
                            <td className="ps-2 fw-semibold">{row.branch}</td>
                            {d.seatMatrix.categories.map(cat => (
                              <td key={cat} className="text-center">{row[cat] ?? '—'}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
                {/* NOTE: BIT Sindri's seatMatrix only lists 4 of its 10 lateral-entry
                    branches (CSE, Electrical, Mechanical, Civil). Add rows for IT, ECE,
                    Mining, Metallurgical, Chemical, and Production once you have the
                    category-wise numbers for them. */}
              </div>
            </section>
            {/* AD 2 */}
            <LeaderboardAd slot="4412954465" />

            {/* CUTOFF */}
            <section ref={el => (sectionRefs.current.cutoff = el)} id="cutoff" className="mb-5" style={{ scrollMarginTop: 110 }}>
              <SectionLabel eyebrow={`${d.cutoffMatrix.year} closing ranks`} title="Cutoff Ranks (Closing Ranks)" />
              <div className="row g-3">
                {d.cutoffMatrix.rows.map((row, i) => (
                  <div key={i} className="col-12 col-sm-6">
                    <Card className="border-0 h-100" style={{ boxShadow: '0 1px 10px rgba(0,0,0,0.06)', borderRadius: 12 }}>
                      <Card.Body className="p-0">
                        <div
                          className="px-3 py-2 fw-semibold"
                          style={{
                            fontSize: '0.8rem',
                            color: '#0f4c81',
                            background: '#eef4fb',
                            borderRadius: '12px 12px 0 0',
                            letterSpacing: '0.02em',
                          }}
                        >
                          {row.branch}
                        </div>
                        <Table bordered size="sm" className="mb-0" style={{ fontSize: '0.82rem' }}>
                          <thead style={{ background: '#f8fafc' }}>
                            <tr>
                              <th className="ps-3 py-2">Category</th>
                              <th className="text-center py-2">Closing Rank (CML)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {d.cutoffMatrix.categories.map(cat => (
                              <tr key={cat}>
                                <td className="ps-3 fw-medium">{cat}</td>
                                <td className="text-center">
                                  {row[cat] === null || row[cat] === undefined
                                    ? '—'
                                    : row[cat].toLocaleString('en-IN')}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
              <div className="text-muted mt-2" style={{ fontSize: '0.75rem' }}>
                Figures denote CML (Common Merit List Rank) closing rank — higher rank number = easier to get in. Actual cutoffs vary year to year based on applicant pool.
              </div>
            </section>

            {/* AD  */}
            <div className="my-3">
              <AdBanner slot="8679502538" />
            </div>

            {/* MARKS VS RANK — omitted: no marksVsRank data provided for D2D
                lateral-entry colleges. Add a `marksVsRank: { year, rows, note }`
                object to the data entry to enable this section (see gp-adityapur
                for the expected shape), and this block will render automatically. */}
            {d.marksVsRank && (
              <section className="mb-5">
                <SectionLabel eyebrow={`Jharkhand D2D ${d.marksVsRank.year}`} title="Marks vs Rank 2026" />
                <Card className="border-0" style={{ boxShadow: '0 1px 10px rgba(0,0,0,0.06)', borderRadius: 12 }}>
                  <Card.Body className="p-0">
                    <Table responsive bordered size="sm" className="mb-0" style={{ fontSize: '0.82rem' }}>
                      <thead style={{ background: '#f8fafc' }}>
                        <tr>
                          <th className="ps-3 py-3 text-center" style={{ color: '#1e293b' }}>
                            Marks (out of 150)
                          </th>
                          <th className="py-3 text-center" style={{ color: '#1e293b' }}>
                            Expected Rank 2026
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {d.marksVsRank.rows.map((row, i) => (
                          <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                            <td className="ps-3 py-2 text-center fw-semibold" style={{ color: '#1e293b' }}>
                              {row.marksRange}
                            </td>
                            <td className="py-2 text-center fw-semibold" style={{ color: '#0d9488' }}>
                              {row.rank}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
                <div className="text-muted mt-2" style={{ fontSize: '0.75rem' }}>
                  {d.marksVsRank.note}
                </div>
              </section>
            )}



            {/* FEES */}
            <section ref={el => (sectionRefs.current.fees = el)} id="fees" className="mb-5" style={{ scrollMarginTop: 110 }}>
              <SectionLabel eyebrow="What it costs" title="Fee Structure" />

              {d.fees.categoryWise ? (
                <Card className="border-0 mb-3" style={{ boxShadow: '0 1px 10px rgba(0,0,0,0.06)', borderRadius: 12 }}>
                  <Card.Body className="p-0">
                    <Table responsive bordered size="sm" className="mb-0" style={{ fontSize: '0.78rem' }}>
                      <thead style={{ background: '#f8fafc' }}>
                        <tr>
                          <th className="ps-2 py-3">Fee - 1 Year</th>
                          {d.fees.categoryWise.map(cat => (
                            <th key={cat.category} className="text-center py-3" style={{ color: '#0d9488', fontSize: '0.75rem' }}>{cat.category}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {/* Categories do not always list the same number of fee
                            heads (the e-Kalyan variants carry one row less), so a
                            missing cell renders as a dash instead of crashing the
                            table while server-rendering. */}

                        {d.fees.categoryWise[0].rows.map((row, i) => (
                          <tr key={i}>
                            <td className="ps-2 fw-semibold">{row.head}</td>
                            {d.fees.categoryWise.map(cat => (
                              <td key={cat.category} className="text-center">{cat.rows?.[i] ? rupee(cat.rows[i].amount) : "—"}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr style={{ background: '#f0fdfa', fontWeight: 700 }}>
                          <td className="ps-2 py-2">Total Fee</td>
                          {d.fees.categoryWise.map(cat => (
                            <td key={cat.category} className="text-center py-2" style={{ color: '#0d9488' }}>{rupee(cat.total)}</td>
                          ))}
                        </tr>
                      </tfoot>
                    </Table>
                  </Card.Body>
                </Card>
              ) : (
                <Card className="border-0 mb-3" style={{ boxShadow: '0 1px 10px rgba(0,0,0,0.06)', borderRadius: 12 }}>
                  <Card.Body className="p-0">
                    <Table responsive className="mb-0 align-middle">
                      <thead style={{ background: '#f8fafc' }}>
                        <tr style={{ fontSize: '0.78rem', color: '#64748b' }}>
                          <th className="ps-3 py-3">Fee Head</th>
                          <th className="py-3 text-end pe-3">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {d.fees.tuition?.map((f, i) => (
                          <tr key={i} style={{ fontSize: '0.85rem' }}>
                            <td className="ps-3 py-2">
                              {f.head}
                              <span className="text-muted ms-1" style={{ fontSize: '0.74rem' }}>({f.freq})</span>
                            </td>
                            <td className="py-2 text-end pe-3 fw-semibold">{rupee(f.amount)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr style={{ background: '#f8fafc', fontSize: '0.88rem' }}>
                          <td className="ps-3 py-3 fw-bold">Approx. Total (1st year)</td>
                          <td className="py-3 text-end pe-3 fw-bold" style={{ color: '#0d9488' }}>{rupee(d.fees.totalApproxFirstYear)}</td>
                        </tr>
                        <tr style={{ fontSize: '0.82rem' }}>
                          <td className="ps-3 py-2 text-muted">Approx. Total (subsequent years)</td>
                          <td className="py-2 text-end pe-3 text-muted">{rupee(d.fees.totalApproxSubsequentYear)}</td>
                        </tr>
                      </tfoot>
                    </Table>
                  </Card.Body>
                </Card>
              )}

              <div className="text-muted mb-3" style={{ fontSize: '0.75rem' }}>{d.fees.note}</div>
              {/* NOTE: no fee waivers/scholarship list was supplied for BIT Sindri
                  (gpaData's colleges had a d.fees.waivers array; this data set
                  doesn't). Section is safely skipped when the array is missing —
                  add d.fees.waivers = [{ title, detail }, ...] to enable it. */}
              {d.fees.waivers && (
                <>
                  <div className="fw-semibold mb-2" style={{ fontSize: '0.92rem', color: '#1e293b' }}>Fee waivers & scholarships</div>
                  <Row className="g-3">
                    {d.fees.waivers.map((w, i) => (
                      <Col xs={12} md={6} key={i} className="fee-waiver-col">
                        <Card className="border-0 h-100" style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05)', borderRadius: 10 }}>
                          <Card.Body className="p-3">
                            <div className="fw-semibold mb-1" style={{ fontSize: '0.86rem', color: '#0d9488' }}>{w.title}</div>
                            <div className="text-muted" style={{ fontSize: '0.82rem', lineHeight: 1.55 }}>{w.detail}</div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </>
              )}
            </section>

            {/* HOSTEL */}
            <section ref={el => (sectionRefs.current.hostel = el)} id="hostel" className="mb-5" style={{ scrollMarginTop: 110 }}>
              <SectionLabel eyebrow="Staying on campus" title="Hostel Fees" />
              <Card className="border-0" style={{ boxShadow: '0 1px 10px rgba(0,0,0,0.06)', borderRadius: 12 }}>
                <Card.Body className="p-0">
                  <Table responsive className="mb-0 align-middle">
                    <thead style={{ background: '#f8fafc' }}>
                      <tr style={{ fontSize: '0.78rem', color: '#64748b' }}>
                        <th className="ps-3 py-3">Head</th>
                        <th className="py-3 text-end pe-3">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {d.fees.hostel.map((f, i) => (
                        <tr key={i} style={{ fontSize: '0.85rem' }}>
                          <td className="ps-3 py-2">
                            {f.head}
                            <span className="text-muted ms-1" style={{ fontSize: '0.74rem' }}>({f.freq})</span>
                          </td>
                          <td className="py-2 text-end pe-3 fw-semibold">{rupee(f.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
              <div className="text-muted mt-2" style={{ fontSize: '0.75rem' }}>{d.fees.hostelNote}</div>
            </section>

            {/* AD 3 */}
            <LeaderboardAd slot="7488532762" />

            {/* PLACEMENTS */}
            <section ref={el => (sectionRefs.current.placements = el)} id="placements" className="mb-3" style={{ scrollMarginTop: 110 }}>
              <SectionLabel eyebrow={`${d.placements.summary.lastUpdatedYear} placement season`} title="Placements" />

              <Row className="g-3 mb-4">
                {[
                  { val: `${d.placements.summary.placementRate}%`, label: 'Placement Rate', color: '#0d9488' },
                  { val: `${d.placements.summary.avgPackageLPA} LPA`, label: 'Avg. Package', color: '#1e293b' },
                  { val: `${d.placements.summary.highestPackageLPA} LPA`, label: 'Highest Package', color: '#1e293b' },
                  { val: `${d.placements.summary.recruitersCount}+`, label: 'Recruiters', color: '#1e293b' },
                ].map((s, i) => (
                  <Col xs={6} md={3} key={i} className="placement-stat-col">
                    <Card className="border-0 text-center h-100" style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05)', borderRadius: 10 }}>
                      <Card.Body className="py-3 px-1">
                        <div className="fw-bold" style={{ fontSize: 'clamp(0.95rem, 3vw, 1.3rem)', color: s.color }}>{s.val}</div>
                        <div className="text-muted" style={{ fontSize: 'clamp(0.62rem, 1.8vw, 0.76rem)' }}>{s.label}</div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              <Card className="border-0 mb-3" style={{ boxShadow: '0 1px 10px rgba(0,0,0,0.06)', borderRadius: 12 }}>
                <Card.Body className="p-3">
                  <div className="fw-semibold mb-1" style={{ fontSize: '0.92rem', color: '#1e293b' }}>Branch-wise Placement</div>
                  <div className="text-muted mb-3" style={{ fontSize: '0.78rem' }}>Eligible vs Placed — Session {d.placements.summary.lastUpdatedYear}</div>
                  {/* NOTE: BIT Sindri's branchWise data only covers CSE (Lateral) and
                      Electrical (Lateral) out of its 10 lateral-entry branches. Add the
                      remaining 8 (IT, ECE, ME, CE, Mining, Metallurgical, Chemical,
                      Production) with { branch, placementRate, avgPackageLPA, placed, total }
                      once available. */}

                  {mounted && d.placements.branchWise?.some(b => b.total) ? (
                    <>
                      <div style={{ width: '100%', overflowX: 'auto' }}>
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart
                            data={d.placements.branchWise.map(b => ({
                              branch: b.branch.replace(' Engg.', '').replace(' Engineering', ''),
                              Eligible: b.total,
                              Placed: b.placed,
                            }))}
                            margin={{ top: 10, right: 4, left: -18, bottom: 0 }}
                            barCategoryGap="30%"
                            barGap={4}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="branch" tick={{ fontSize: 9, fill: '#64748b' }} />
                            <YAxis tick={{ fontSize: 9, fill: '#64748b' }} label={{ value: 'Students', angle: -90, position: 'insideLeft', offset: 16, style: { fontSize: 9, fill: '#94a3b8' } }} />
                            <Tooltip contentStyle={{ fontSize: '0.75rem', borderRadius: 8, border: '1px solid #e2e8f0' }} />
                            <Legend wrapperStyle={{ fontSize: '0.72rem', paddingTop: 8 }} />
                            <Bar dataKey="Eligible" fill="#1e4d7b" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="Placed" fill="#e07b39" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      <Table className="mt-3 mb-0" style={{ fontSize: '0.88rem' }}>
                        <thead style={{ background: '#f8fafc' }}>
                          <tr>
                            <th style={{ fontWeight: 700, color: '#1e293b', padding: '8px 10px' }}>Branch</th>
                            <th className="text-end" style={{ fontWeight: 700, color: '#1e293b', padding: '8px 10px' }}>Placed (%)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {d.placements.branchWise.map((b, i) => (
                            <tr key={i}>
                              <td className="placement-branch-label" style={{ color: '#334155', padding: '8px 10px', fontWeight: 500 }}>{b.branch}</td>
                              <td className="text-end fw-bold" style={{ color: '#0d9488', padding: '8px 10px' }}>{b.placementRate}%</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr style={{ borderTop: '2px solid #e2e8f0', background: '#f0fdfa' }}>
                            <td className="fw-bold" style={{ color: '#1e293b', padding: '10px 10px' }}>Overall</td>
                            <td className="text-end fw-bold" style={{ color: '#0d9488', padding: '10px 10px', fontSize: '1rem' }}>{d.placements.summary.placementRate}%</td>
                          </tr>
                        </tfoot>
                      </Table>
                    </>
                  ) : (
                    d.placements.branchWise.map((b, i) => (
                      <PlacementBar key={i} branch={b.branch} rate={b.placementRate} lpa={b.avgPackageLPA} maxLpa={maxLpa} placed={b.placed} total={b.total} />
                    ))
                  )}
                </Card.Body>
              </Card>

              {/* Top Recruiters */}
              <Card className="border-0" style={{ boxShadow: '0 1px 10px rgba(0,0,0,0.06)', borderRadius: 12 }}>
                <Card.Body className="p-3">
                  <div className="fw-semibold mb-1" style={{ fontSize: '0.92rem', color: '#1e293b' }}>Top Recruiters</div>
                  <div className="text-muted mb-3" style={{ fontSize: '0.78rem' }}>{d.placements.recruiters.length} companies hired from this college</div>
                  <div className="d-flex flex-wrap gap-2">
                    {d.placements.recruiters.map((r, i) => {
                      const colors = [
                        { bg: '#eff6ff', border: '#bfdbfe', text: '#1d4ed8' },
                        { bg: '#f0fdf4', border: '#bbf7d0', text: '#15803d' },
                        { bg: '#fef3c7', border: '#fde68a', text: '#b45309' },
                        { bg: '#fdf2f8', border: '#f5d0fe', text: '#7e22ce' },
                        { bg: '#fff1f2', border: '#fecdd3', text: '#be123c' },
                        { bg: '#f0fdfa', border: '#99f6e4', text: '#0f766e' },
                      ];
                      const c = colors[i % colors.length];
                      return (
                        <div
                          key={i}
                          className="recruiter-pill d-flex align-items-center gap-1 px-2 py-2 rounded-pill"
                          style={{
                            background: c.bg,
                            border: `1px solid ${c.border}`,
                            fontSize: 'clamp(0.68rem, 2vw, 0.82rem)',
                            fontWeight: 600,
                            color: c.text,
                            letterSpacing: '0.01em',
                          }}
                        >
                          <span
                            className="recruiter-pill-icon"
                            style={{
                              width: 20, height: 20, borderRadius: '50%',
                              background: c.border,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: '0.65rem', fontWeight: 800, color: c.text, flexShrink: 0,
                            }}
                          >
                            {r.charAt(0)}
                          </span>
                          {r}
                        </div>
                      );
                    })}
                  </div>
                </Card.Body>
              </Card>
            </section>

            <div className="my-3">
              <AdBanner slot="3636692323" />
            </div>
            </Col>
          <Col xs={12} lg={4}>
            <div>

              {/* Quick Facts Card */}
              <Card className="border-0 mb-3" style={{ boxShadow: '0 1px 10px rgba(0,0,0,0.06)', borderRadius: 12 }}>
                <Card.Body className="p-3">
                  <div className="fw-semibold mb-3" style={{ fontSize: '0.92rem', color: '#1e293b' }}>
                    Quick facts
                  </div>
                  {[
                    { label: 'Type', val: d.type },
                    { label: 'Established', val: d.established },
                    { label: 'Lateral Branches', val: d.courses.length },
                    { label: 'Total LE Seats', val: d.courses.reduce((a, c) => a + c.seats, 0) },
                    { label: '1st Yr Fee', val: rupee(d.fees.totalApproxFirstYear) },
                  ].map((row, i) => (
                    <div key={i} className="quick-facts-row d-flex justify-content-between py-2 border-bottom" style={{ fontSize: '0.83rem' }}>
                      <span className="text-muted">{row.label}</span>
                      <span className="fw-semibold">{row.val}</span>
                    </div>
                  ))}
                  <div className="quick-facts-row d-flex justify-content-between py-2" style={{ fontSize: '0.83rem' }}>
                    <span className="text-muted">Avg. Package</span>
                    <span className="fw-semibold" style={{ color: '#0d9488' }}>{d.placements.summary.avgPackageLPA} LPA</span>
                  </div>
                  <a
                    href={d.howToReach.map}
                    target="_blank"
                    rel="noreferrer"
                    className="btn w-100 mt-3 fw-semibold"
                    style={{ background: '#0d9488', color: '#fff', borderRadius: 8, fontSize: '0.88rem' }}
                  >
                    View on Map
                  </a>
                </Card.Body>
              </Card>

              {/* Ad 1 */}
              <div className="mb-3">
                <SidebarAd slot="1675110481" />
              </div>

              {/* Explore Colleges */}
              <div className="mb-3">
                <ExploreColleges currentId={effectiveSlug} />
              </div>

              {/* Latest News */}
              <div className="mb-3">
                <LatestNews collegeName={d.name} />
              </div>

              {/* Popular Exams */}
              <div className="mb-3">
                <PopularExams />
              </div>

              <div className="my-3">
                <AdBanner slot="6242297060" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}