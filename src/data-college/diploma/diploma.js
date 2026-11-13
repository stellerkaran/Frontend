"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import DIPLOMA_COLLEGES from './diplomaCollegesData';
import AdBanner from '../../../components/AdBanner';
import Image from "next/image";

const toSrc = img => (typeof img === 'string' ? img : img?.src || '');
const SITE_URL = 'https://www.futurely.in';
const rupee = n => '₹' + Intl.NumberFormat('en-IN').format(Math.round(n || 0));
const sum = arr => arr.reduce((a, b) => a + (b || 0), 0);

function SidebarAd({ slot }) {
  const adRef = useRef(null);
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) { }
  }, []);
  return (
    <div style={{
      width: '100%', minHeight: 260,
      background: '#EDE8DC', borderRadius: 8, overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: '1px dashed #C9BFA8',
    }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: 260 }}
        data-ad-client="ca-pub-9939857316410378"
        data-ad-slot={slot}
        data-ad-format="rectangle"
        data-full-width-responsive="true"
      />
    </div>
  );
}

// ---------- Leaderboard Ad 728x90 ----------
function LeaderboardAd({ slot }) {
  const adRef = useRef(null);
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
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

function CollegeCard({ college, rank, onClick }) {
  const [hovered, setHovered] = useState(false);
  const totalSeats = sum(college.courses.map(x => x.seats || 0));
  const toughest = college.courses
    .slice()
    .sort((a, b) => (a.cutoffRank || 999999) - (b.cutoffRank || 999999))[0];

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: `1.5px solid ${hovered ? '#C75D3D' : '#ECE5D3'}`,
        borderRadius: 12,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered
          ? '0 20px 32px -16px rgba(27,42,74,0.28)'
          : '0 2px 12px rgba(27,42,74,0.07)',
      }}
    >
      {/* Image */}
      <div className="dip-card-img" style={{ position: 'relative', height: 140, overflow: 'hidden' }}>
        <Image width={800} height={600}
          src={toSrc(college.image) || 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=800'}
          alt={college.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          referrerPolicy="no-referrer"
        />
        {/* Rank — simple pill, no rotation */}
        <div style={{
          position: 'absolute', top: 10, left: 10,
          fontSize: 11, fontWeight: 700,
          color: '#fff',
          background: 'rgba(199,93,61,0.92)',
          borderRadius: 20,
          padding: '3px 10px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        }}>
          #{rank}
        </div>
        {/* Type */}
        <div style={{
          position: 'absolute', top: 10, right: 10,
          fontSize: 10, fontWeight: 600,
          color: '#fff',
          background: 'rgba(27,42,74,0.82)',
          borderRadius: 4,
          padding: '2px 7px',
        }}>
          {college.type}
        </div>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 50,
          background: 'linear-gradient(transparent, rgba(0,0,0,0.32))',
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: '12px 12px 0', position: 'relative' }}>
        <div style={{
          fontSize: 11, color: '#9C8F79', marginBottom: 5,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6, flexWrap: 'wrap',
        }}>
          <span>{college.city}, {college.state}</span>
          <span style={{
            fontSize: 10, fontWeight: 600,
            color: '#3D7A5C', background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: 10, padding: '1px 7px',
            whiteSpace: 'nowrap',
          }}>
            {college.placementRate}% placed
          </span>
        </div>
        <div style={{
          fontSize: 15, fontWeight: 700, color: '#1B2A4A',
          marginBottom: 5, lineHeight: 1.3,
          wordBreak: 'break-word',
        }}>
          {college.name}
        </div>
        {toughest && (
          <div style={{ fontSize: 11, color: '#6B6457', marginBottom: 0, lineHeight: 1.5, wordBreak: 'break-word' }}>
            Toughest: <strong style={{ color: '#C75D3D' }}>{toughest.name}</strong>
            {' '}— Rank {toughest.cutoffRank?.toLocaleString('en-IN') || 'N/A'}
          </div>
        )}

      </div>

      {/* Stats */}
      <div style={{ padding: '10px 12px 10px', display: 'flex', justifyContent: 'space-between', gap: 4 }}>
        {[
          { label: 'Fees/yr', value: rupee(college.fees) },
          { label: 'Seats', value: totalSeats },
          { label: 'Avg Pkg', value: `${(college.avgPackageLPA || 0).toFixed(1)} LPA` },
        ].map(s => (
          <div key={s.label} style={{ minWidth: 0 }}>
            <div className="dip-card-stat-val" style={{ fontSize: 13, fontWeight: 700, color: '#1B2A4A', whiteSpace: 'nowrap' }}>{s.value}</div>
            <div className="dip-card-stat-lbl" style={{ fontSize: 9, color: '#9C8F79', marginTop: 1, textTransform: 'uppercase', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{
        margin: '0 12px 12px',
        padding: '9px 0',
        textAlign: 'center',
        borderRadius: 7,
        fontSize: 12.5, fontWeight: 700,
        background: hovered ? '#C75D3D' : '#1B2A4A',
        color: '#fff',
        transition: 'background 0.18s',
      }}>
        {hovered ? 'View College →' : 'Details'}
      </div>
    </div>
  );
}

export default function Diploma() {
  const [colleges] = useState(DIPLOMA_COLLEGES);
  const router = useRouter();

  const filtered = useMemo(() => colleges.slice(), [colleges]);

  function openDetails(id) {
    if (id) {
      router.push(`/diploma/${id}`);
      return;
    }
  }

  const pageTitle = 'Top Polytechnic Colleges in Jharkhand 2026 | Fees, Cutoff & Placements';
  const metaDescription = 'Compare top diploma / polytechnic colleges in Jharkhand — GP Ranchi, GP Adityapur, GP Dhanbad & more. Check fees, branch-wise cutoff ranks, placement rates and seats. Admission via JCECEB PECE 2026 counselling.';
  const canonicalUrl = `${SITE_URL}/diploma`;
  const ogImage = `${SITE_URL}/og-diploma.jpg`;

  const listSchema = {
    '@context': 'https://schema.org', '@type': 'ItemList',
    name: 'Top Polytechnic Colleges in Jharkhand', url: canonicalUrl,
    itemListElement: filtered.map((c, i) => ({
      '@type': 'ListItem', position: i + 1, name: c.name, url: `${SITE_URL}/diploma/${c.id}`,
    })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Diploma Colleges', item: canonicalUrl },
    ],
  };
  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How to get admission in polytechnic colleges in Jharkhand?', acceptedAnswer: { '@type': 'Answer', text: 'Admission is through JCECEB PECE counselling by the Jharkhand Combined Entrance Competitive Examination Board.' } },
      { '@type': 'Question', name: 'What is the fee for polytechnic colleges in Jharkhand?', acceptedAnswer: { '@type': 'Answer', text: 'Annual fees range from ₹3,000 to ₹30,000 per year. SC/ST candidates get fee concessions.' } },
      { '@type': 'Question', name: 'Which is the best polytechnic college in Jharkhand?', acceptedAnswer: { '@type': 'Answer', text: 'GP Ranchi is ranked #1. GP Adityapur and GP Dhanbad are top choices for industry proximity.' } },
    ],
  };

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.title = pageTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', metaDescription);
  }, [pageTitle, metaDescription]);

  const totalSeatsAll = filtered.reduce((a, c) => a + sum(c.courses.map(x => x.seats || 0)), 0);
  const avgPlacement = Math.round(filtered.reduce((a, c) => a + (c.placementRate || 0), 0) / (filtered.length || 1));

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
      background: '#FBF8F2',
      color: '#1B2A4A',
      minHeight: '100vh',
      overflowX: 'hidden',
      paddingTop: 5,
      paddingBottom: 60,
    }}>
      <style>{`
        * { box-sizing: border-box; }

        /* HERO */
        .dip-hero {
          width: 100%;
          padding: 28px 16px 22px;
          text-align: center;
        }
        .dip-h1 {
          font-size: clamp(19px, 5.5vw, 36px);
          font-weight: 800;
          line-height: 1.25;
          margin: 0 0 10px;
          color: #1B2A4A;
          letter-spacing: -0.02em;
          word-wrap: break-word;
        }
        .dip-h1 span { color: #C75D3D; }
        .dip-sub {
          font-size: clamp(12px, 3.2vw, 14px);
          color: #6B6457;
          max-width: 500px;
          margin: 0 auto 20px;
          line-height: 1.55;
          word-wrap: break-word;
        }
        .dip-hero-stats {
          display: inline-flex;
          border: 1.5px solid #E4DDC9;
          border-radius: 10px;
          overflow: hidden;
          background: #fff;
        }
        .dip-hstat {
          padding: 12px 20px;
          text-align: center;
          border-right: 1px dashed #E4DDC9;
        }
        .dip-hstat:last-child { border-right: none; }
        .dip-hstat-val {
          font-size: 20px;
          font-weight: 800;
          color: #1B2A4A;
          line-height: 1;
        }
        .dip-hstat-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #9C8F79;
          margin-top: 4px;
          font-weight: 500;
        }
        @media (max-width: 480px) {
          .dip-hero { padding: 20px 10px 16px; }
          .dip-hero-stats {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            max-width: 320px;
            width: 100%;
            margin: 0 auto;
            border-radius: 8px;
          }
          .dip-hstat {
            padding: 9px 6px !important;
            border-right: 1px dashed #E4DDC9 !important;
            border-bottom: 1px dashed #E4DDC9 !important;
          }
          .dip-hstat:nth-child(2n) {
            border-right: none !important;
          }
          .dip-hstat:nth-last-child(-n+2) {
            border-bottom: none !important;
          }
          .dip-hstat-val { font-size: 16.5px !important; }
          .dip-hstat-label { font-size: 8.5px !important; margin-top: 2px !important; letter-spacing: 0.02em !important; }
        }

        /* RULE */
        .dip-rule {
          border: none;
          border-top: 1.5px dashed #E4DDC9;
          width: 100%;
          margin: 0;
        }

        /* LAYOUT */
        .dip-layout {
          width: 100%;
          margin: 20px 0 0;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 20px;
          align-items: start;
        }
        @media (max-width: 1024px) {
          .dip-layout { grid-template-columns: 260px 1fr; }
        }
        @media (max-width: 860px) {
          .dip-layout { grid-template-columns: 1fr; padding: 0 14px; }
          .dip-sidebar { order: 2; }
          .dip-main { order: 1; }
        }
        @media (max-width: 400px) {
          .dip-layout { padding: 0 8px; margin-top: 14px; }
        }

        /* SIDEBAR */
        .dip-sidebar-panel {
          background: #fff;
          border: 1.5px solid #ECE5D3;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 14px;
        }
        .dip-sidebar-head {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #9C8F79;
          padding: 9px 13px;
          border-bottom: 1px dashed #E4DDC9;
          background: #FBF8F2;
        }
        .dip-sidebar-body { padding: 12px 13px; }
        .dip-coming {
          font-size: 11px;
          color: #B0A898;
          text-align: center;
          padding: 8px 0;
        }

        /* SECTION HEAD */
        .dip-section-head {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }
        .dip-section-head h1 {
          font-size: clamp(16px, 2.5vw, 22px);
          font-weight: 800;
          color: #1B2A4A;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .dip-count {
          font-size: 11px;
          color: #9C8F79;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* GRID */
        .dip-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 960px) { .dip-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .dip-grid { grid-template-columns: 1fr; gap: 12px; } }

        /* FAQ */
        .dip-faq {
          margin-top: 24px;
          background: #fff;
          border: 1.5px solid #ECE5D3;
          border-radius: 10px;
          overflow: hidden;
        }
        .dip-faq-head {
          font-size: 15px;
          font-weight: 700;
          color: #1B2A4A;
          padding: 14px 18px;
          border-bottom: 1px dashed #E4DDC9;
          background: #FDFAF5;
        }
        .dip-faq-item {
          padding: 13px 18px;
          border-bottom: 1px dashed #E4DDC9;
        }
        .dip-faq-item:last-child { border-bottom: none; }
        .dip-faq-q { font-size: 13px; font-weight: 700; color: #1B2A4A; margin-bottom: 4px; word-wrap: break-word; }
        .dip-faq-a { font-size: 12px; color: #6B6457; line-height: 1.6; word-wrap: break-word; }

        @media (max-width: 400px) {
          .dip-faq-head { padding: 11px 12px; font-size: 14px; }
          .dip-faq-item { padding: 10px 12px; }
          .dip-faq-q { font-size: 12.5px; }
          .dip-faq-a { font-size: 11.5px; }
        }

        @media (max-width: 360px) {
          .dip-hero { padding: 16px 6px 12px; }
          .dip-h1 { font-size: 18px !important; }
          .dip-sub { font-size: 11.5px !important; margin-bottom: 14px; }
          .dip-hero-stats { max-width: 100% !important; }
          .dip-hstat { padding: 8px 4px !important; }
          .dip-hstat-val { font-size: 14.5px !important; }
          .dip-hstat-label { font-size: 8px !important; }
          .dip-layout { padding: 0 6px !important; margin-top: 10px !important; }
          .dip-card-img { height: 125px !important; }
          .dip-card-stat-val { font-size: 11.5px !important; }
          .dip-card-stat-lbl { font-size: 8px !important; letter-spacing: 0 !important; }
          .dip-faq-head { padding: 10px 10px !important; font-size: 13.5px !important; }
          .dip-faq-item { padding: 9px 10px !important; }
          .dip-faq-q { font-size: 12px !important; }
          .dip-faq-a { font-size: 11px !important; }
        }

        /* FOOTNOTE */
        .dip-footnote {
          width: 100%;
          margin: 28px 0 0;
          padding: 0 16px;
          font-size: 10px;
          color: #B0A898;
          letter-spacing: 0.05em;
          text-align: center;
          text-transform: uppercase;
        }
      `}</style>

      {/* HERO */}
      <div className="dip-hero">
        <h1 className="dip-h1">
          Top <span>Polytechnic </span> Colleges in Jharkhand
        </h1>
        <p className="dip-sub">
          Fees, cutoffs, placements & seats across all government diploma colleges. Find the right one for your rank.
        </p>
        <div className="dip-hero-stats">
          <div className="dip-hstat">
            <div className="dip-hstat-val">{filtered.length}+</div>
            <div className="dip-hstat-label">Colleges</div>
          </div>
          <div className="dip-hstat">
            <div className="dip-hstat-val">{totalSeatsAll}</div>
            <div className="dip-hstat-label">Total Seats</div>
          </div>
          <div className="dip-hstat">
            <div className="dip-hstat-val">{avgPlacement}%</div>
            <div className="dip-hstat-label">Avg Placement</div>
          </div>
          <div className="dip-hstat">
            <div className="dip-hstat-val">₹3K</div>
            <div className="dip-hstat-label">Lowest Fee/yr</div>
          </div>
        </div>
      </div>

      {/* LAYOUT */}
      <div className="dip-layout">

        {/* SIDEBAR */}
        <aside className="dip-sidebar">
          <div className="dip-sidebar-panel">
            <div className="dip-sidebar-head">Filters</div>
            <div className="dip-sidebar-body">
              <div className="dip-coming">🔧 Coming soon</div>
            </div>
          </div>
          <div className="dip-sidebar-panel">
            <div className="dip-sidebar-head">Notifications</div>
            <div className="dip-sidebar-body">
              <div className="dip-coming">🔔 Coming soon</div>
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <SidebarAd slot="1675110481" />
          </div>
          <div style={{ marginBottom: 14 }}>
            <SidebarAd slot="4461940407" />
          </div>
        </aside>

        {/* MAIN */}
        <main className="dip-main">
          <div className="dip-section-head">
            <h1>Diploma Colleges</h1>
            <span className="dip-count">{filtered.length} results · by lowest fee</span>
          </div>

          <div className="dip-grid">
            {filtered.map((c, idx) => (
              <CollegeCard
                key={c.id}
                college={c}
                rank={idx + 1}
                onClick={() => openDetails(c.id)}
              />
            ))}
          </div>

          <LeaderboardAd slot="4412954465" />

          <div className="dip-faq">
            <div className="dip-faq-head">Common Questions</div>
            {[
              {
                q: 'How to get admission in polytechnic colleges in Jharkhand?',
                a: 'Admission is through JCECEB PECE (Polytechnic Entrance Competitive Examination) counselling. Candidates must qualify PECE and participate in online counselling for seat allotment.',
              },
              {
                q: 'What is the fee for polytechnic colleges in Jharkhand?',
                a: 'Annual fees range from approximately ₹3,000 to ₹30,000 per year. SC/ST candidates are eligible for fee concessions as per state government norms.',
              },
              {
                q: 'Which is the best polytechnic college in Jharkhand?',
                a: 'GP Ranchi is ranked #1 based on placement rates and average package. GP Adityapur and GP Dhanbad are top choices for their industry proximity near Tata Steel and coal belt areas.',
              },
              {
                q: 'What branches are available in Jharkhand polytechnic colleges?',
                a: 'Common branches: Civil, Mechanical, Electrical, Electronics & Telecom, Computer Science, and IT. Availability varies by college.',
              },
            ].map((item, i) => (
              <div className="dip-faq-item" key={i}>
                <div className="dip-faq-q">{item.q}</div>
                <div className="dip-faq-a">{item.a}</div>
              </div>
            ))}
          </div>

        </main>
      </div>

      <div className="dip-footnote"></div>
    </div>
  );
}
