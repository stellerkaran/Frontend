"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { Container, Row, Col, Badge, Table, Card } from 'react-bootstrap';
import { BTECH_COLLEGES_DETAIL } from './btechData';
import BTECH_COLLEGES from './btechCollegesData';
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

function SectionLabel({ eyebrow, title }) {
  return (
    <div className="mb-3">
      <div
        className="text-uppercase fw-semibold"
        style={{ fontSize: 12, letterSpacing: '0.08em', color: '#1B2A4A' }}
      >
        {eyebrow}
      </div>
      <h3 className="fw-bold mb-0 section-label-title" style={{ fontSize: '1.4rem', color: '#1B2A4A' }}>
        {title}
      </h3>
    </div>
  );
}

function StatPill({ label, value, accent }) {
  return (
    <div
      className="hero-stat-pill text-center rounded"
      style={{ background: '#fff', boxShadow: '0 4px 14px rgba(0,0,0,0.14)' }}
    >
      <div className="hero-stat-value" style={{ fontWeight: 800, color: accent || '#1B2A4A' }}>{value}</div>
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
        <span className="fw-semibold placement-branch-label" style={{ fontSize: '0.92rem', color: '#1B2A4A' }}>{branch}</span>
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
              background: 'linear-gradient(90deg, #1B2A4A 0%, #3D7A5C 100%)',
              borderRadius: 4,
            }}
          />
        </div>
        <div style={{ flex: 1, height: 8, background: '#e9ecef', borderRadius: 4, overflow: 'hidden' }}>
          <div
            style={{
              width: `${lpaWidthPct}%`,
              height: '100%',
              background: '#E8A33D',
              borderRadius: 4,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function ExploreColleges({ currentId }) {
  const list = BTECH_COLLEGES.filter(c => c.id !== currentId);
  return (
    <Card className="border-0" style={{ boxShadow: '0 1px 10px rgba(0,0,0,0.06)', borderRadius: 12 }}>
      <Card.Body className="p-3">
        <div
          className="text-uppercase fw-semibold mb-2 pb-2"
          style={{ fontSize: 12, letterSpacing: '0.08em', color: '#1B2A4A', borderBottom: '1px solid #e9ecef' }}
        >
          Explore Other B.Tech Colleges
        </div>
        <div className="d-flex flex-column">
          {list.map((col, i) => (
            <Link key={col.id} href={`/btech/${col.id}`} style={{ textDecoration: 'none' }}>
              <div
                className="d-flex align-items-center gap-3 py-2.5"
                style={{ borderBottom: i < list.length - 1 ? '1px solid #f1f5f9' : 'none' }}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: '50%', background: '#1B2A4A', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0
                }}>
                  #{col.rank}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div className="fw-semibold" style={{ fontSize: '0.9rem', color: '#1B2A4A', lineHeight: 1.3 }}>
                    {col.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#3D7A5C', lineHeight: 1.3 }}>
                    {col.city}, {col.state}
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

function PopularExams() {
  const exams = [
    { name: 'JEE Main 2026', path: '/colleges' },
    { name: 'JCECEB B.Tech Counselling 2026', path: '/colleges' },
    { name: 'Jharkhand D2D B.Tech Lateral Entry', path: '/resources/jharkhand-d2d/exam-information' },
  ];
  return (
    <Card className="border-0" style={{ boxShadow: '0 1px 10px rgba(0,0,0,0.06)', borderRadius: 12 }}>
      <Card.Body className="p-3">
        <div
          className="text-uppercase fw-semibold mb-2 pb-2"
          style={{ fontSize: 12, letterSpacing: '0.08em', color: '#1B2A4A', borderBottom: '1px solid #e9ecef' }}
        >
          Key Entrance Exams
        </div>
        <div className="d-flex flex-column">
          {exams.map((e, i) => (
            <Link key={i} href={e.path} style={{ textDecoration: 'none' }}>
              <div
                className="py-2 fw-semibold"
                style={{
                  fontSize: '0.9rem', color: '#1B2A4A',
                  borderBottom: i < exams.length - 1 ? '1px solid #f1f5f9' : 'none'
                }}
              >
                {e.name} →
              </div>
            </Link>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}

export default function BtechCollegeDetail({ customId }) {
  const params = useParams();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('overview');
  const sectionRefs = useRef({});

  const collegeId = customId || params?.id || (pathname ? pathname.split('/').pop() : 'bit-sindri');
  const d = BTECH_COLLEGES_DETAIL[collegeId] || BTECH_COLLEGES_DETAIL['bit-sindri'];
  const maxLpa = Math.max(...(d?.placements?.branchWise?.map(b => b.avgPackageLPA || 0) || [10]));

  const SITE_URL = 'https://www.futurely.in';
  const canonicalUrl = `${SITE_URL}/btech/${d.id}`;
  const totalSeats = d.courses.reduce((a, c) => a + (c.seats || 0), 0);
  const branchNames = d.courses.map(c => c.name).join(', ');
  const pageTitle = `${d.name}: Admission, Fees, Cutoff & Placements 2026`;
  const metaDescription = `${d.tagline} Courses: ${branchNames}. Fees ${rupee(d.fees.totalApproxFirstYear)}/yr, ${d.placements.summary.placementRate}% placements, ${d.placements.summary.avgPackageLPA} LPA avg package.`;

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.title = pageTitle;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', metaDescription);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      metaDesc.content = metaDescription;
      document.head.appendChild(metaDesc);
    }
  }, [pageTitle, metaDescription]);

  function scrollToSection(id) {
    const el = sectionRefs.current[id];
    if (el) {
      window.scrollTo({ top: el.offsetTop - 110, behavior: 'smooth' });
    }
  }

  return (
    <div className="bootstrap-scope" style={{ background: '#f8fafc', minHeight: '100vh', overflowX: 'hidden', width: '100%' }}>
      <style>{`
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

        .section-nav-scroll {
          overflow-x: auto;
          white-space: nowrap;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .section-nav-scroll::-webkit-scrollbar { display: none; }

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
          .card-body { padding: 10px !important; }
          .section-label-title { font-size: 1.15rem !important; }
        }
      `}</style>

      {/* Hero Banner */}
      <div
        className="hero-banner text-white"
        style={{
          background: 'linear-gradient(135deg, #1B2A4A 0%, #0F172A 100%)',
          paddingTop: 40,
          paddingBottom: 28,
          borderBottom: '3px solid #C75D3D',
        }}
      >
        <Container>
          <Row className="align-items-center gy-3">
            <Col lg={7} className="hero-title-block">
              <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                <Badge bg="warning" text="dark" className="fw-bold px-2 py-1">
                  {d.type}
                </Badge>
                <span style={{ fontSize: 13, color: '#e2e8f0' }}>Estd. {d.established} &bull; {d.affiliation}</span>
              </div>
              <h1 className="fw-bold mb-2 text-white" style={{ fontSize: '1.85rem', lineHeight: 1.25 }}>
                {d.name}
              </h1>
              <p className="mb-0" style={{ color: '#cbd5e1', fontSize: '0.95rem', maxWidth: 640 }}>
                {d.tagline}
              </p>
            </Col>
            <Col lg={5}>
              <div className="hero-stat-grid hero-stat-grid-mobile">
                <StatPill label="Avg Package" value={`${d.avgPackageLPA} LPA`} accent="#3D7A5C" />
                <StatPill label="Placement Rate" value={`${d.placementRate}%`} accent="#C75D3D" />
                <StatPill label="First Year Fee" value={rupee(d.fees.totalApproxFirstYear)} accent="#1B2A4A" />
                <StatPill label="Total Seats" value={totalSeats || '600+'} accent="#3D7A5C" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Sticky Section Nav */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 900,
          background: '#fff',
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <Container>
          <div className="section-nav-scroll section-nav-4col d-flex gap-2 py-2">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                type="button"
                className="btn btn-sm text-nowrap fw-semibold"
                style={{
                  borderRadius: 20,
                  fontSize: '0.85rem',
                  padding: '5px 14px',
                  background: activeSection === s.id ? '#1B2A4A' : '#f1f5f9',
                  color: activeSection === s.id ? '#fff' : '#475569',
                  border: 'none',
                }}
                onClick={() => scrollToSection(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-4">
        <Row className="gy-4">
          <Col lg={8}>

            {/* Overview */}
            <div ref={el => sectionRefs.current['overview'] = el} className="mb-5">
              <SectionLabel eyebrow="Overview" title={`About ${d.name}`} />
              <Card className="border-0 shadow-sm" style={{ borderRadius: 12 }}>
                <Card.Body className="p-4">
                  {d.overview.map((p, i) => (
                    <p key={i} className="mb-3 text-secondary" style={{ fontSize: '0.96rem', lineHeight: 1.6 }}>
                      {p}
                    </p>
                  ))}
                </Card.Body>
              </Card>
            </div>

            {/* Admission Process */}
            <div ref={el => sectionRefs.current['admission'] = el} className="mb-5">
              <SectionLabel eyebrow="Admission Process" title="How to Get Admission" />
              <Card className="border-0 shadow-sm mb-3" style={{ borderRadius: 12 }}>
                <Card.Body className="p-4">
                  <p className="text-muted mb-4" style={{ fontSize: '0.92rem' }}>
                    {d.admissionProcess.intro}
                  </p>
                  <div className="d-flex flex-column gap-3">
                    {d.admissionProcess.steps.map((step, idx) => (
                      <div key={idx} className="d-flex gap-3 align-items-start">
                        <div
                          style={{
                            width: 28, height: 28, borderRadius: '50%', background: '#1B2A4A', color: '#fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0
                          }}
                        >
                          {idx + 1}
                        </div>
                        <div>
                          <h6 className="fw-bold mb-1" style={{ color: '#1B2A4A', fontSize: '0.95rem' }}>{step.title}</h6>
                          <p className="text-secondary mb-0" style={{ fontSize: '0.88rem', lineHeight: 1.5 }}>{step.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </div>

            {/* Required Documents */}
            <div ref={el => sectionRefs.current['documents'] = el} className="mb-5">
              <SectionLabel eyebrow="Verification" title="Documents Required for Admission" />
              <Card className="border-0 shadow-sm" style={{ borderRadius: 12 }}>
                <Card.Body className="p-4">
                  <ul className="mb-0 ps-3 text-secondary" style={{ fontSize: '0.92rem', lineHeight: 1.7 }}>
                    {d.admissionProcess.documents.map((doc, i) => (
                      <li key={i} className="mb-1.5">{doc}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </div>

            {/* Courses & Seat Matrix */}
            <div ref={el => sectionRefs.current['courses'] = el} className="mb-5">
              <SectionLabel eyebrow="Academic Programs" title="B.Tech Branches & Seat Matrix" />
              <Card className="border-0 shadow-sm" style={{ borderRadius: 12 }}>
                <Card.Body className="p-4">
                  <div className="table-responsive">
                    <Table hover align="middle" className="mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Branch Name</th>
                          <th>Code</th>
                          <th>Seats</th>
                          <th>Entrance Exam</th>
                        </tr>
                      </thead>
                      <tbody>
                        {d.courses.map((c, i) => (
                          <tr key={i}>
                            <td className="fw-semibold" style={{ color: '#1B2A4A' }}>{c.name}</td>
                            <td><Badge bg="secondary">{c.code}</Badge></td>
                            <td className="fw-bold">{c.seats}</td>
                            <td><small className="text-muted">{c.exam}</small></td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </div>

            {/* Cutoff Ranks */}
            <div ref={el => sectionRefs.current['cutoff'] = el} className="mb-5">
              <SectionLabel eyebrow="Cutoff Analysis" title="Recent Cutoff Closing Ranks" />
              <Card className="border-0 shadow-sm" style={{ borderRadius: 12 }}>
                <Card.Body className="p-4">
                  <div className="table-responsive">
                    <Table striped bordered hover align="middle" className="mb-0">
                      <thead style={{ background: '#1B2A4A', color: '#fff' }}>
                        <tr>
                          <th>Branch</th>
                          {d.cutoffMatrix.categories.map((cat, idx) => (
                            <th key={idx}>{cat}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {d.cutoffMatrix.rows.map((r, i) => (
                          <tr key={i}>
                            <td className="fw-semibold">{r.branch}</td>
                            {d.cutoffMatrix.categories.map((cat, idx) => (
                              <td key={idx}>{r[cat] ? r[cat].toLocaleString('en-IN') : 'N/A'}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </div>

            {/* Fees */}
            <div ref={el => sectionRefs.current['fees'] = el} className="mb-5">
              <SectionLabel eyebrow="Financials" title="Fee Structure & Scholarships" />
              <Card className="border-0 shadow-sm mb-3" style={{ borderRadius: 12 }}>
                <Card.Body className="p-4">
                  {d.fees.categoryWise.map((cat, i) => (
                    <div key={i} className="mb-4">
                      <h6 className="fw-bold mb-2" style={{ color: '#1B2A4A' }}>{cat.category}</h6>
                      <div className="table-responsive">
                        <Table size="sm" bordered hover className="mb-1">
                          <tbody>
                            {cat.rows.map((r, ri) => (
                              <tr key={ri}>
                                <td>{r.head}</td>
                                <td className="text-end fw-semibold">{rupee(r.amount)}</td>
                              </tr>
                            ))}
                            <tr className="table-light fw-bold">
                              <td>Total Payable (First Year)</td>
                              <td className="text-end" style={{ color: '#C75D3D' }}>{rupee(cat.total)}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  ))}
                  {d.fees.note && (
                    <p className="text-muted small mb-0">{d.fees.note}</p>
                  )}
                </Card.Body>
              </Card>
            </div>

            {/* Hostel */}
            <div ref={el => sectionRefs.current['hostel'] = el} className="mb-5">
              <SectionLabel eyebrow="Accommodation" title="Hostel & Mess Facilities" />
              <Card className="border-0 shadow-sm" style={{ borderRadius: 12 }}>
                <Card.Body className="p-4">
                  <div className="table-responsive mb-2">
                    <Table bordered hover size="sm">
                      <tbody>
                        {d.fees.hostel.map((h, i) => (
                          <tr key={i}>
                            <td>{h.head} ({h.freq})</td>
                            <td className="text-end fw-semibold">{rupee(h.amount)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  <p className="text-muted small mb-0">{d.fees.hostelNote}</p>
                </Card.Body>
              </Card>
            </div>

            {/* Placements */}
            <div ref={el => sectionRefs.current['placements'] = el} className="mb-5">
              <SectionLabel eyebrow="Career Outcomes" title="Placement Statistics & Recruiters" />
              <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: 12 }}>
                <Card.Body className="p-4">
                  <Row className="text-center gy-3 mb-4">
                    <Col xs={6} md={3}>
                      <div className="fw-bold" style={{ fontSize: '1.4rem', color: '#3D7A5C' }}>{d.placements.summary.placementRate}%</div>
                      <div className="text-muted small">Placement Rate</div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="fw-bold" style={{ fontSize: '1.4rem', color: '#1B2A4A' }}>{d.placements.summary.avgPackageLPA} LPA</div>
                      <div className="text-muted small">Average Package</div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="fw-bold" style={{ fontSize: '1.4rem', color: '#C75D3D' }}>{d.placements.summary.highestPackageLPA} LPA</div>
                      <div className="text-muted small">Highest Package</div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="fw-bold" style={{ fontSize: '1.4rem', color: '#1B2A4A' }}>{d.placements.summary.recruitersCount}+</div>
                      <div className="text-muted small">Recruiters</div>
                    </Col>
                  </Row>

                  <h6 className="fw-bold mb-3" style={{ color: '#1B2A4A' }}>Branch-wise Placements</h6>
                  {d.placements.branchWise.map((bw, i) => (
                    <PlacementBar
                      key={i}
                      branch={bw.branch}
                      rate={bw.placementRate}
                      lpa={bw.avgPackageLPA}
                      maxLpa={maxLpa}
                      placed={bw.placed}
                      total={bw.total}
                    />
                  ))}

                  <h6 className="fw-bold mt-4 mb-2" style={{ color: '#1B2A4A' }}>Top Recruiting Companies</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {d.placements.recruiters.map((r, i) => (
                      <Badge key={i} bg="light" text="dark" className="border px-2.5 py-1.5 fw-semibold">
                        {r}
                      </Badge>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </div>

            {/* How to Reach */}
            <div className="mb-5">
              <SectionLabel eyebrow="Location & Transport" title="How to Reach Campus" />
              <Card className="border-0 shadow-sm" style={{ borderRadius: 12 }}>
                <Card.Body className="p-4">
                  <div className="d-flex flex-column gap-2 text-secondary" style={{ fontSize: '0.92rem' }}>
                    <div><strong>Nearest Railway Station:</strong> {d.howToReach.nearestRail}</div>
                    <div><strong>Nearest Airport:</strong> {d.howToReach.nearestAirport}</div>
                    {d.howToReach.nearestBus && <div><strong>Nearest Bus Stand:</strong> {d.howToReach.nearestBus}</div>}
                    <div className="mt-2">
                      <a href={d.howToReach.map} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary fw-semibold">
                        View on Google Maps ↗
                      </a>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>

            <AdBanner slot="2434542863" />

          </Col>

          {/* Right Sidebar */}
          <Col lg={4}>
            <div className="d-flex flex-column gap-4" style={{ position: 'sticky', top: 70 }}>
              <ExploreColleges currentId={d.id} />
              <PopularExams />
              <AdBanner slot="8679502538" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
