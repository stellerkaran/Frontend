"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import BTECH_COLLEGES from './btechCollegesData';
import AdBanner from '@/components/AdBanner';
import Image from "next/image";

const toSrc = img => (typeof img === 'string' ? img : img?.src || '');

const rupee = n => '₹' + Intl.NumberFormat('en-IN').format(Math.round(n || 0));
const sum = arr => arr.reduce((a, b) => a + (b || 0), 0);
const SITE_URL = 'https://www.futurely.in';

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
      <div style={{ position: 'relative', height: 140, overflow: 'hidden' }}>
        <Image width={800} height={600}
          src={toSrc(college.image) || 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=800'}
          alt={college.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          referrerPolicy="no-referrer"
        />
        {/* Rank */}
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
            Top Branch: <strong style={{ color: '#C75D3D' }}>{toughest.name}</strong>
            {' '}— Cutoff Rank {toughest.cutoffRank?.toLocaleString('en-IN') || 'N/A'}
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
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1B2A4A', whiteSpace: 'nowrap' }}>{s.value}</div>
            <div style={{ fontSize: 9, color: '#9C8F79', marginTop: 1, textTransform: 'uppercase', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>{s.label}</div>
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

export default function Btech() {
  const [colleges] = useState(BTECH_COLLEGES);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const router = useRouter();

  const filtered = useMemo(() => {
    return colleges.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.city.toLowerCase().includes(search.toLowerCase()) ||
        c.courses.some(crs => crs.name.toLowerCase().includes(search.toLowerCase()));
      const matchType = selectedType === 'All' || c.type.toLowerCase().includes(selectedType.toLowerCase());
      return matchSearch && matchType;
    });
  }, [colleges, search, selectedType]);

  function openDetails(id) {
    if (id) {
      router.push(`/btech/${id}`);
    }
  }

  const pageTitle = 'Top B.Tech Engineering Colleges in Jharkhand 2026 | Fees, Cutoff & Placements';
  const metaDescription = 'Compare top 7 B.Tech engineering colleges in Jharkhand — BIT Sindri, IIT (ISM) Dhanbad, NIT Jamshedpur, BIT Mesra, IIIT Ranchi, UCET Hazaribagh & GEC Ramgarh. Check fees, cutoff ranks, seats and placements.';

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
        .btech-hero { width: 100%; padding: 28px 16px 22px; text-align: center; }
        .btech-h1 { font-size: clamp(19px, 5.5vw, 36px); font-weight: 800; line-height: 1.25; margin: 0 0 10px; color: #1B2A4A; letter-spacing: -0.02em; word-wrap: break-word; }
        .btech-h1 span { color: #C75D3D; }
        .btech-sub { font-size: clamp(12px, 3.2vw, 14px); color: #6B6457; max-width: 500px; margin: 0 auto 20px; line-height: 1.55; word-wrap: break-word; }
        .btech-hero-stats { display: inline-flex; border: 1.5px solid #E4DDC9; border-radius: 10px; overflow: hidden; background: #fff; }
        .btech-hstat { padding: 12px 20px; text-align: center; border-right: 1px dashed #E4DDC9; }
        .btech-hstat:last-child { border-right: none; }
        .btech-hstat-val { font-size: 20px; font-weight: 800; color: #1B2A4A; line-height: 1; }
        .btech-hstat-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; color: #9C8F79; margin-top: 4px; font-weight: 500; }
        
        @media (max-width: 480px) {
          .btech-hero { padding: 20px 10px 16px; }
          .btech-hero-stats { display: grid !important; grid-template-columns: repeat(2, 1fr) !important; max-width: 320px; width: 100%; margin: 0 auto; border-radius: 8px; }
          .btech-hstat { padding: 9px 6px !important; border-right: 1px dashed #E4DDC9 !important; border-bottom: 1px dashed #E4DDC9 !important; }
          .btech-hstat:nth-child(2n) { border-right: none !important; }
          .btech-hstat:nth-last-child(-n+2) { border-bottom: none !important; }
          .btech-hstat-val { font-size: 16.5px !important; }
          .btech-hstat-label { font-size: 8.5px !important; margin-top: 2px !important; letter-spacing: 0.02em !important; }
        }

        .btech-rule { border: none; border-top: 1.5px dashed #E4DDC9; width: 100%; margin: 0; }
        .btech-layout {
          width: 100%;
          margin: 20px 0 0;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 20px;
          align-items: start;
        }
        @media (max-width: 1024px) { .btech-layout { grid-template-columns: 260px 1fr; } }
        @media (max-width: 860px) {
          .btech-layout { grid-template-columns: 1fr; padding: 0 14px; }
          .btech-sidebar { order: 2; }
          .btech-main { order: 1; }
        }
        @media (max-width: 400px) { .btech-layout { padding: 0 8px; margin-top: 14px; } }

        /* SIDEBAR */
        .btech-sidebar-panel {
          background: #fff;
          border: 1.5px solid #ECE5D3;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 14px;
        }
        .btech-sidebar-head {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #9C8F79;
          padding: 9px 13px;
          border-bottom: 1px dashed #E4DDC9;
          background: #FBF8F2;
        }
        .btech-sidebar-body { padding: 12px 13px; }
        .btech-coming {
          font-size: 11px;
          color: #B0A898;
          text-align: center;
          padding: 8px 0;
        }

        /* SECTION HEAD */
        .btech-section-head {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }
        .btech-section-head h2 {
          font-size: clamp(16px, 2.5vw, 22px);
          font-weight: 800;
          color: #1B2A4A;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .btech-count {
          font-size: 11px;
          color: #9C8F79;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .btech-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        @media (max-width: 960px) { .btech-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .btech-grid { grid-template-columns: 1fr; gap: 12px; } }
      `}</style>

      {/* Hero Header */}
      <div className="btech-hero">
        <h1 className="btech-h1">
          Top <span>B.Tech Colleges</span> in Jharkhand
        </h1>
        <p className="btech-sub">
          Explore top engineering institutes in Jharkhand — BIT Sindri, IIT (ISM), NIT Jamshedpur, BIT Mesra, IIIT Ranchi & more. Check fees, cutoff ranks and placement stats.
        </p>

        <div className="btech-hero-stats">
          <div className="btech-hstat">
            <div className="btech-hstat-val">{colleges.length}</div>
            <div className="btech-hstat-label">Colleges</div>
          </div>
          <div className="btech-hstat">
            <div className="btech-hstat-val">{totalSeatsAll}</div>
            <div className="btech-hstat-label">Total Seats</div>
          </div>
          <div className="btech-hstat">
            <div className="btech-hstat-val">{avgPlacement}%</div>
            <div className="btech-hstat-label">Avg Placement</div>
          </div>
          <div className="btech-hstat">
            <div className="btech-hstat-val">2026</div>
            <div className="btech-hstat-label">Counselling</div>
          </div>
        </div>
      </div>

      <hr className="btech-rule" />

      {/* LAYOUT WITH SIDEBAR */}
      <div className="btech-layout">

        {/* SIDEBAR */}
        <aside className="btech-sidebar">
          <div className="btech-sidebar-panel">
            <div className="btech-sidebar-head">Filters</div>
            <div className="btech-sidebar-body">
              <div className="btech-coming">🔧 Coming soon</div>
            </div>
          </div>
          <div className="btech-sidebar-panel">
            <div className="btech-sidebar-head">Notifications</div>
            <div className="btech-sidebar-body">
              <div className="btech-coming">🔔 Coming soon</div>
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
        <main className="btech-main">
          {/* Search & Filter */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
              <input
                type="text"
                placeholder="Search college, city, or branch..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  flex: 1, minWidth: 220, padding: '10px 14px', borderRadius: 8,
                  border: '1.5px solid #E4DDC9', fontSize: 14, outline: 'none', background: '#fff'
                }}
              />
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['All', 'Government', 'Deemed'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    style={{
                      padding: '8px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600,
                      border: 'none', cursor: 'pointer',
                      background: selectedType === type ? '#1B2A4A' : '#E4DDC9',
                      color: selectedType === type ? '#fff' : '#1B2A4A',
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="btech-section-head">
            <h2>Engineering Colleges</h2>
            <span className="btech-count">{filtered.length} results</span>
          </div>

          <div className="btech-grid">
            {filtered.map((c, i) => (
              <CollegeCard
                key={c.id}
                college={c}
                rank={c.rank || i + 1}
                onClick={() => openDetails(c.id)}
              />
            ))}
          </div>

          {/* Footer Banner */}
          <div style={{ margin: '30px 0 0' }}>
            <AdBanner slot="2434542863" />
          </div>
        </main>
      </div>
    </div>
  );
}
