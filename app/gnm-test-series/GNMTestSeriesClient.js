"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import BuyModal from "@/components/BuyModal";
import { authFetch } from "@/utils/api";
import Image from "next/image";

const TS = {
  id: "GNM-TS",
  name: "Jharkhand GNM Full Test Series 2026",
  originalPrice: 199,
  price: 99,
  tests: 10,
};

const MOCKS = [
  "10 Full Syllabus Test Series (JCECEB GNM Exam Pattern 2026)",
  "5 Subjects · 30 Questions Each — Physics, Chemistry, Biology, Maths & English",
  "2021–2025 PYQ-based question bank",
  "JCECEB GNM latest pattern",
  "Detailed solutions after every test",
  "All Questions available in Hindi & English",
  "Speed & accuracy improvement tracker",
  "No negative marking — attempt without penalty",
  "Accessible on mobile & desktop",
];

export default function GNMTestSeriesClient() {
  const { isLoggedIn } = useAuth();
  const authModal = useAuthModal();
  const router = useRouter();
  const [showBuy, setShowBuy] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      setChecking(false);
      return;
    }
    authFetch("/purchase/check?testSeriesId=GNM-TS")
      .then((r) => r.json())
      .then((data) => {
        if (data.access) {
          router.push("/gnm-tests");
        } else {
          setChecking(false);
        }
      })
      .catch(() => setChecking(false));
  }, [isLoggedIn, router]);

  if (checking) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Nunito', sans-serif",
          color: "#64748b",
          background: "#f0f2ff",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 40,
              height: 40,
              border: "3px solid #e0e7ff",
              borderTop: "3px solid #4f46e5",
              borderRadius: "50%",
              margin: "0 auto 12px",
              animation: "spin 0.8s linear infinite",
            }}
          />
          Checking access…
        </div>
      </div>
    );
  }

  const handleJoin = () => {
    if (!isLoggedIn) {
      if (authModal?.openLogin) {
        authModal.openLogin();
      } else if (typeof window !== "undefined" && window.openLoginModal) {
        window.openLoginModal();
      }
      return;
    }
    setShowBuy(true);
  };

  return (
    <div className="gnmts-root">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(239,68,68,0.35); }
          70%  { box-shadow: 0 0 0 10px rgba(239,68,68,0); }
          100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); }
        }

        .gnmts-root, .gnmts-root *, .gnmts-root *::before, .gnmts-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .gnmts-root {
          --navy:         #0f1733;
          --indigo:       #3730a3;
          --violet:       #4f46e5;
          --violet-light: #6366f1;
          --gold:         #f59e0b;
          --gold-light:   #fde68a;
          --red:          #ef4444;
          --green:        #16a34a;
          --surface:      #f5f6ff;
          --card:         #ffffff;
          --border:       #e8eaf6;
          --muted:        #64748b;
          --text:         #0f172a;
        }

        .gnmts-root {
          font-family: 'Nunito', system-ui, sans-serif;
          background: var(--surface);
          color: var(--text);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ── TITLE BLOCK ── */
        .gnmts-title-block {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 18px 14px;
          background: var(--card);
          border-bottom: 1px solid var(--border);
          animation: fadeUp 0.4s ease both;
        }

        .gnmts-logo-circle {
          width: 48px; height: 48px; flex-shrink: 0;
          border-radius: 14px;
          overflow: hidden;
          background: #eef2ff;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(79,70,229,0.15);
        }
        .gnmts-logo-circle img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .gnmts-logo-fallback {
          font-size: 0.5rem; font-weight: 900; color: var(--violet);
          text-align: center; line-height: 1.2; padding: 4px;
        }
        .gnmts-title-text h1 {
          font-family: 'Sora', sans-serif;
          font-size: 0.97rem; font-weight: 800; color: var(--text); line-height: 1.25;
        }
        .gnmts-title-text p {
          font-size: 0.72rem; color: var(--muted); margin-top: 2px; font-weight: 600;
        }

        /* ── HERO ── */
        .gnmts-hero {
          position: relative;
          margin: 14px 14px 0;
          border-radius: 22px;
          overflow: hidden;
          min-height: 240px;
          background: linear-gradient(145deg, #0d0b2e 0%, #1e1b4b 45%, #2d2a6e 100%);
          box-shadow: 0 16px 48px rgba(15,11,46,0.40);
          animation: fadeUp 0.45s 0.05s ease both;
        }

        .gnmts-hero::before {
          content: "";
          position: absolute;
          width: 260px; height: 260px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%);
          top: -80px; right: -60px;
          pointer-events: none;
        }
        .gnmts-hero::after {
          content: "";
          position: absolute;
          width: 180px; height: 180px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245,158,11,0.20) 0%, transparent 70%);
          bottom: -50px; left: 20px;
          pointer-events: none;
        }

        .gnmts-hero-img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: center; opacity: 0.18;
        }

        .gnmts-hero-content {
          position: relative; z-index: 2;
          padding: 28px 22px 24px;
        }

        .gnmts-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 5px;
          background: rgba(245,158,11,0.15);
          border: 1px solid rgba(245,158,11,0.40);
          border-radius: 999px; padding: 4px 12px;
          font-size: 0.62rem; font-weight: 800; color: var(--gold-light);
          letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 12px;
        }
        .gnmts-hero-eyebrow::before { content: "★"; font-size: 8px; }

        .gnmts-hero-headline {
          font-family: 'Sora', sans-serif;
          font-size: 1.55rem; font-weight: 900; color: #fff;
          line-height: 1.18; letter-spacing: -0.025em; margin-bottom: 12px;
        }
        .gnmts-hero-headline em {
          font-style: normal;
          background: linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24);
          background-size: 200% auto;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }

        .gnmts-hero-desc {
          font-size: 0.82rem; color: rgba(255,255,255,0.78);
          line-height: 1.65; max-width: 340px; margin-bottom: 18px;
        }

        .gnmts-hero-badges { display: flex; flex-wrap: wrap; gap: 7px; }
        .gnmts-hero-badge {
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.20);
          backdrop-filter: blur(4px);
          border-radius: 8px; padding: 5px 11px;
          font-size: 0.69rem; font-weight: 700; color: rgba(255,255,255,0.90);
        }
        .gnmts-hero-badge.highlight {
          background: rgba(245,158,11,0.20);
          border-color: rgba(245,158,11,0.50);
          color: var(--gold-light);
        }

        /* ── STATS ROW ── */
        .gnmts-stats-row {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin: 12px 14px 0;
          animation: fadeUp 0.45s 0.10s ease both;
        }

        .gnmts-stat-cell {
          background: var(--card);
          border-radius: 16px;
          padding: 14px 6px 12px;
          text-align: center;
          border: 1px solid var(--border);
          box-shadow: 0 2px 8px rgba(79,70,229,0.06);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .gnmts-stat-cell:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(79,70,229,0.12);
        }

        .gnmts-stat-val {
          font-family: 'Sora', sans-serif;
          font-size: 1.3rem; font-weight: 900;
          color: var(--violet); display: block; line-height: 1;
        }
        .gnmts-stat-label {
          font-size: 0.60rem; color: var(--muted); font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.05em;
          margin-top: 5px; display: block;
        }

        /* ── SECTION CARD ── */
        .gnmts-section {
          margin: 12px 14px;
          background: var(--card);
          border-radius: 20px;
          padding: 22px 20px;
          border: 1px solid var(--border);
          box-shadow: 0 2px 12px rgba(79,70,229,0.06);
          animation: fadeUp 0.45s 0.15s ease both;
        }

        .gnmts-section-icon {
          width: 38px; height: 38px;
          background: linear-gradient(135deg, #eef2ff, #e0e7ff);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; margin-bottom: 13px;
          box-shadow: 0 2px 6px rgba(79,70,229,0.10);
        }

        .gnmts-section-title {
          font-family: 'Sora', sans-serif;
          font-size: 1.05rem; font-weight: 800; color: var(--text); margin-bottom: 4px;
        }
        .gnmts-section-sub {
          font-size: 0.80rem; color: var(--muted); margin-bottom: 16px;
          line-height: 1.6; font-weight: 600;
        }

        /* MOCK LIST */
        .gnmts-mock-list {
          list-style: none; display: flex; flex-direction: column; gap: 10px;
        }
        .gnmts-mock-list li {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 0.87rem; color: #1e293b; font-weight: 600; line-height: 1.55;
          padding: 10px 12px;
          background: #f8f9ff;
          border-radius: 12px;
          border: 1px solid #eef0fb;
          transition: background 0.2s, border-color 0.2s;
        }
        .gnmts-mock-list li:hover {
          background: #eef2ff;
          border-color: #c7d2fe;
        }

        .gnmts-mock-bullet {
          width: 20px; height: 20px; flex-shrink: 0;
          background: linear-gradient(135deg, var(--violet), #7c3aed);
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          font-size: 9px; color: #fff; font-weight: 900; margin-top: 1px;
        }

        .gnmts-schedule-btn {
          margin-top: 16px; width: 100%; padding: 12px;
          border-radius: 12px; border: 1.5px solid var(--border);
          background: #fff; font-size: 0.86rem; font-weight: 700; color: var(--violet);
          cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 7px;
        }
        .gnmts-schedule-btn:hover { background: #eef2ff; border-color: #c7d2fe; }

        /* FEATURE ROW */
        .gnmts-feature-row { display: flex; align-items: flex-start; gap: 16px; }
        .gnmts-feature-icon-wrap {
          width: 44px; height: 44px; flex-shrink: 0;
          background: linear-gradient(135deg, #eef2ff, #e0e7ff);
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
          box-shadow: 0 2px 8px rgba(79,70,229,0.10);
        }
        .gnmts-feature-text h3 {
          font-family: 'Sora', sans-serif;
          font-size: 0.95rem; font-weight: 800; color: var(--text); margin-bottom: 5px;
        }
        .gnmts-feature-text p {
          font-size: 0.83rem; color: #475569; line-height: 1.70;
        }

        /* ── GUARANTEE ── */
        .gnmts-guarantee {
          margin: 12px 14px;
          border-radius: 22px;
          background: linear-gradient(145deg, #064e3b 0%, #065f46 50%, #047857 100%);
          padding: 28px 22px 24px;
          box-shadow: 0 12px 36px rgba(6,78,59,0.35);
          position: relative; overflow: hidden;
          animation: fadeUp 0.45s 0.20s ease both;
        }
        .gnmts-guarantee::before {
          content: "";
          position: absolute;
          width: 200px; height: 200px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
          top: -60px; right: -40px; pointer-events: none;
        }
        .gnmts-guarantee::after {
          content: "Rs";
          position: absolute; right: -6px; bottom: -20px;
          font-family: 'Sora', sans-serif;
          font-size: 140px; font-weight: 900; line-height: 1;
          color: rgba(255,255,255,0.05); pointer-events: none;
        }

        .gnmts-guarantee-title {
          font-family: 'Sora', sans-serif;
          font-size: 1.65rem; font-weight: 900; color: #fff;
          line-height: 1.15; margin-bottom: 12px;
        }
        .gnmts-guarantee-body {
          font-size: 0.85rem; color: rgba(255,255,255,0.88);
          line-height: 1.75; margin-bottom: 20px;
        }
        .gnmts-guarantee-body strong { color: #fff; font-weight: 800; }
        .gnmts-guarantee-conditions {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(255,255,255,0.14);
          border: 1.5px solid rgba(255,255,255,0.32);
          border-radius: 12px; padding: 10px 20px;
          font-size: 0.84rem; font-weight: 700; color: #fff;
          cursor: pointer; transition: background 0.2s; text-decoration: none;
        }
        .gnmts-guarantee-conditions:hover { background: rgba(255,255,255,0.24); }

        /* ── COLLEGES ── */
        .gnmts-colleges-section { margin: 12px 14px 0; }
        .gnmts-colleges-heading {
          text-align: center; padding: 22px 4px 16px;
        }
        .gnmts-colleges-heading h2 {
          font-family: 'Sora', sans-serif;
          font-size: 1.15rem; font-weight: 900; color: var(--text); line-height: 1.25;
        }
        .gnmts-colleges-heading h2 span { color: var(--red); }
        .gnmts-colleges-heading p {
          font-size: 0.80rem; color: var(--muted); margin-top: 6px; line-height: 1.5; font-weight: 600;
        }
        .gnmts-colleges-image-wrap {
          border-radius: 20px; overflow: hidden;
          background: linear-gradient(135deg, #0f172a, #1e3a5f);
          min-height: 160px;
          display: flex; align-items: center; justify-content: center;
          position: relative;
          box-shadow: 0 8px 28px rgba(15,23,42,0.20);
        }
        .gnmts-colleges-real-img {
          width: 100%; height: auto; display: block; border-radius: 20px;
        }

        /* ── STICKY FOOTER ── */
        .gnmts-sticky-footer {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 150;
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-top: 1.5px solid var(--border);
          padding: 11px 16px;
          box-shadow: 0 -6px 30px rgba(0,0,0,0.10);
          display: flex; align-items: center; gap: 12px;
        }

        /* Price hidden state — skeleton shimmer */
        .gnmts-price-skeleton {
          flex-shrink: 0;
          display: flex; flex-direction: column; gap: 5px;
        }
        .gnmts-skeleton-line {
          border-radius: 6px;
          background: linear-gradient(90deg, #e8eaf6 25%, #f5f6ff 50%, #e8eaf6 75%);
          background-size: 200% 100%;
          animation: shimmer 1.2s infinite;
        }

        .gnmts-sticky-price { flex-shrink: 0; line-height: 1; }
        .gnmts-sticky-price .price-original {
          font-size: 0.72rem; color: #94a3b8;
          text-decoration: line-through; font-weight: 700;
          display: block; margin-bottom: 2px;
        }
        .gnmts-sticky-price .price-row {
          display: flex; align-items: baseline; gap: 6px;
        }
        .gnmts-sticky-price .price-main {
          font-family: 'Sora', sans-serif;
          font-size: 1.3rem; font-weight: 900; color: var(--text);
        }
        .gnmts-sticky-price .price-off {
          font-size: 0.66rem; font-weight: 800; color: #fff;
          background: var(--red); border-radius: 6px; padding: 2px 7px;
        }
        .gnmts-sticky-price .price-sub {
          font-size: 0.62rem; color: #94a3b8;
          display: block; font-weight: 600; margin-top: 2px;
        }

        /* BUY BUTTON */
        .gnmts-sticky-cta {
          flex: 1;
          background: linear-gradient(135deg, #dc2626, #ea580c);
          border: none; border-radius: 14px; padding: 0;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; min-height: 52px;
          box-shadow: 0 4px 18px rgba(220,38,38,0.35);
          animation: pulse-ring 2.5s ease infinite;
        }
        .gnmts-sticky-cta:hover {
          opacity: 0.93; transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(220,38,38,0.45);
        }
        .gnmts-sticky-cta:active { transform: scale(0.98); }

        .gnmts-cta-inner {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 11px 18px; gap: 2px; width: 100%;
        }
        .gnmts-cta-top {
          font-family: 'Sora', sans-serif;
          font-size: 0.94rem; font-weight: 900; color: #fff;
          display: flex; align-items: center; gap: 6px; line-height: 1.2;
        }
        .gnmts-cta-sub {
          font-size: 0.65rem; font-weight: 700;
          color: rgba(255,255,255,0.80); letter-spacing: 0.01em;
        }

        .gnmts-bottom-spacer { height: 90px; }

        /* ── DESKTOP ── */
        @media (min-width: 768px) {
          .gnmts-root { background: #e4e6f7; }
          .gnmts-inner { max-width: 780px; margin: 0 auto; background: var(--surface); min-height: 100vh; }
          .gnmts-title-block { padding: 22px 28px 18px; }
          .gnmts-logo-circle { width: 54px; height: 54px; }
          .gnmts-title-text h1 { font-size: 1.15rem; }
          .gnmts-hero { margin: 20px 22px 0; min-height: 280px; }
          .gnmts-hero-headline { font-size: 2rem; }
          .gnmts-hero-content { padding: 36px 30px 28px; }
          .gnmts-stats-row { margin: 14px 22px 0; }
          .gnmts-stat-val { font-size: 1.45rem; }
          .gnmts-section { margin: 14px 22px; padding: 26px 24px; }
          .gnmts-guarantee { margin: 14px 22px; padding: 32px 28px; }
          .gnmts-guarantee-title { font-size: 2rem; }
          .gnmts-colleges-section { margin: 14px 22px 0; }
          .gnmts-sticky-footer { padding: 14px 28px; }
          .gnmts-mock-list li { font-size: 0.92rem; }
          .gnmts-feature-text p { font-size: 0.88rem; }
          .gnmts-cta-top { font-size: 1.05rem; }
        }

        @media (min-width: 1024px) {
          .gnmts-inner { max-width: 900px; }
          .gnmts-hero-headline { font-size: 2.3rem; }
          .gnmts-hero { min-height: 320px; }
        }

        /* ── SMALL ── */
        @media (max-width: 420px) {
          .gnmts-title-block { padding: 13px 12px 11px; gap: 10px; }
          .gnmts-logo-circle { width: 42px; height: 42px; border-radius: 12px; }
          .gnmts-title-text h1 { font-size: 0.87rem; }
          .gnmts-hero { margin: 10px 10px 0; min-height: 200px; border-radius: 18px; }
          .gnmts-hero-headline { font-size: 1.25rem; }
          .gnmts-hero-content { padding: 20px 16px 16px; }
          .gnmts-stats-row { margin: 10px 10px 0; gap: 7px; }
          .gnmts-stat-val { font-size: 1.05rem; }
          .gnmts-stat-label { font-size: 0.56rem; }
          .gnmts-section { margin: 10px 10px; padding: 16px 14px; }
          .gnmts-guarantee { margin: 10px 10px; padding: 22px 16px; }
          .gnmts-guarantee-title { font-size: 1.4rem; }
          .gnmts-colleges-section { margin: 10px 10px 0; }
          .gnmts-sticky-footer { padding: 9px 13px; gap: 10px; }
          .gnmts-sticky-price .price-main { font-size: 1.15rem; }
          .gnmts-cta-top { font-size: 0.87rem; }
          .gnmts-cta-sub { font-size: 0.62rem; }
        }

        @media (max-width: 400px) {
          .gnmts-hero-headline { font-size: 1.12rem; }
          .gnmts-stats-row { grid-template-columns: repeat(2, 1fr); }
          .gnmts-hero-badge { font-size: 0.63rem; padding: 4px 9px; }
        }

        @media (max-width: 360px) {
          .gnmts-title-block { padding: 10px 8px 9px; gap: 8px; }
          .gnmts-logo-circle { width: 36px; height: 36px; border-radius: 10px; }
          .gnmts-title-text h1 { font-size: 0.78rem; }
          .gnmts-title-text p { font-size: 0.64rem; }
          .gnmts-hero { margin: 8px 8px 0; min-height: 178px; border-radius: 14px; }
          .gnmts-hero-headline { font-size: 1.02rem; }
          .gnmts-hero-content { padding: 15px 13px 13px; }
          .gnmts-hero-eyebrow { font-size: 0.56rem; padding: 3px 8px; }
          .gnmts-hero-desc { font-size: 0.74rem; }
          .gnmts-hero-badge { font-size: 0.60rem; padding: 3px 7px; }
          .gnmts-stats-row { margin: 8px 8px 0; gap: 6px; grid-template-columns: repeat(2, 1fr); }
          .gnmts-stat-val { font-size: 0.95rem; }
          .gnmts-stat-label { font-size: 0.52rem; }
          .gnmts-stat-cell { padding: 12px 4px; border-radius: 13px; }
          .gnmts-section { margin: 8px 8px; padding: 14px 12px; border-radius: 16px; }
          .gnmts-section-title { font-size: 0.90rem; }
          .gnmts-section-sub { font-size: 0.74rem; }
          .gnmts-mock-list li { font-size: 0.78rem; padding: 8px 10px; border-radius: 10px; }
          .gnmts-feature-text h3 { font-size: 0.85rem; }
          .gnmts-feature-text p { font-size: 0.75rem; }
          .gnmts-guarantee { margin: 8px 8px; padding: 18px 14px; border-radius: 18px; }
          .gnmts-guarantee-title { font-size: 1.18rem; }
          .gnmts-guarantee-body { font-size: 0.76rem; }
          .gnmts-colleges-section { margin: 8px 8px 0; }
          .gnmts-colleges-heading h2 { font-size: 0.98rem; }
          .gnmts-sticky-footer { padding: 8px 10px; gap: 9px; }
          .gnmts-sticky-price .price-main { font-size: 1rem; }
          .gnmts-sticky-price .price-original { font-size: 0.68rem; }
          .gnmts-sticky-price .price-sub { font-size: 0.57rem; }
          .gnmts-cta-top { font-size: 0.78rem; }
          .gnmts-cta-sub { font-size: 0.58rem; }
          .gnmts-schedule-btn { font-size: 0.76rem; padding: 10px; }
        }
      ` }} />

      <div className="gnmts-inner">
        {/* PAGE TITLE */}
        <header className="gnmts-title-block">
          <div className="gnmts-logo-circle">
            <Image
              src="https://res.cloudinary.com/do8knpreu/image/upload/v1789877078/logo-jceceb_hlegtl.png"
              alt="JCECEB Official Logo"
              width="48"
              height="48"
              onError={(e) => {
                e.target.style.display = "none";
                if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
              }}
            />
            <span className="gnmts-logo-fallback" style={{ display: "none" }}>
              JCECEB
            </span>
          </div>
          <div className="gnmts-title-text">
            <h1>Jharkhand GNM 2026 Test Series</h1>
            <p>JCECEB Pattern · 5 Subjects, 30 Qs Each · No Negative Marking</p>
          </div>
        </header>

        {/* HERO BANNER */}
        <section className="gnmts-hero" aria-label="GNM 2026 Test Series">
          <Image
            src="/GNMTop.jpg"
            alt="GNM 2026 Full Test Series — 10 Mock Tests, JCECEB Pattern, Rs.99"
            className="gnmts-hero-img"
            width="780"
            height="280"
          />
          <div className="gnmts-hero-content">
            <span className="gnmts-hero-eyebrow">Jharkhand GNM 2026</span>
            <h2 className="gnmts-hero-headline">
              Crack Jharkhand GNM 2026<br />
              with the<br />
              <em>Most Relevant</em><br />
              Test Series
            </h2>
            <p className="gnmts-hero-desc">
              Futurely's most trusted online test platform for every Jharkand GNM
              aspirant aiming for a top rank in JCECEB 2026.
            </p>
            <div className="gnmts-hero-badges">
              <span className="gnmts-hero-badge">10 Full Tests</span>
              <span className="gnmts-hero-badge">5 Subjects · 30 Qs Each</span>
              <span className="gnmts-hero-badge">No Negative Marking</span>
              <span className="gnmts-hero-badge highlight">Rs.99 Only (50% OFF)</span>
            </div>
          </div>
        </section>

        {/* STATS ROW */}
        <div className="gnmts-stats-row" aria-label="Test series at a glance">
          <div className="gnmts-stat-cell">
            <span className="gnmts-stat-val">10</span>
            <span className="gnmts-stat-label">Full Tests</span>
          </div>
          <div className="gnmts-stat-cell">
            <span className="gnmts-stat-val">5</span>
            <span className="gnmts-stat-label">Subjects</span>
          </div>
          <div className="gnmts-stat-cell">
            <span className="gnmts-stat-val">30</span>
            <span className="gnmts-stat-label">Qs / Subject</span>
          </div>
          <div className="gnmts-stat-cell">
            <span className="gnmts-stat-val">2.5h</span>
            <span className="gnmts-stat-label">Duration</span>
          </div>
        </div>

        {/* 10 TESTS INCLUDED */}
        <section className="gnmts-section" aria-labelledby="tests-heading">
          <div className="gnmts-section-icon" aria-hidden="true">📋</div>
          <h2 className="gnmts-section-title" id="tests-heading">10 Full Syllabus Tests Included</h2>
          <p className="gnmts-section-sub">
            Trusted by 1000+ students | Based on official JCECEB Pattern | No Negative Marking
          </p>
          <ul className="gnmts-mock-list">
            {MOCKS.map((item, i) => (
              <li key={i}>
                <span className="gnmts-mock-bullet" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* UPDATED PATTERN */}
        <section className="gnmts-section" aria-labelledby="pattern-heading">
          <div className="gnmts-feature-row">
            <div className="gnmts-feature-icon-wrap" aria-hidden="true">📅</div>
            <div className="gnmts-feature-text">
              <h3 id="pattern-heading">Updated as per the Latest Pattern</h3>
              <p>
                All 10 mock tests are designed strictly as per the JCECEB
                GNM 2026 exam pattern — 5 subjects with 30 questions each,
                no negative marking, same difficulty distribution as the real exam.
              </p>
            </div>
          </div>
        </section>

        {/* PERFORMANCE ANALYSIS */}
        <section className="gnmts-section" aria-labelledby="analysis-heading">
          <div className="gnmts-feature-row">
            <div className="gnmts-feature-icon-wrap" aria-hidden="true">📊</div>
            <div className="gnmts-feature-text">
              <h3 id="analysis-heading">In-Depth Test Performance Analysis</h3>
              <p>
                After each test, get a full breakdown — subject-wise score,
                time spent per question, accuracy percentage, and comparison
                with Jharkhand's top scorers. Know exactly where to improve.
              </p>
            </div>
          </div>
        </section>

        {/* MONEY BACK GUARANTEE */}
        <section className="gnmts-guarantee" aria-labelledby="guarantee-heading">
          <h2 className="gnmts-guarantee-title" id="guarantee-heading">
            100% Money Back<br />Guarantee
          </h2>
          <p className="gnmts-guarantee-body">
            Score <strong>120+ marks</strong> in{" "}
            <strong>GNM 2026</strong> and get up to{" "}
            <strong>100% of your fee back</strong> as a scholarship.
            We're confident in our test series — and so should you be.
          </p>
          <button
            className="gnmts-guarantee-conditions"
            onClick={() =>
              alert(
                "Conditions: Score 120+ in the official JCECEB GNM 2026 exam and share your marksheet with us within 30 days of result declaration."
              )
            }
          >
            Read All Conditions →
          </button>
        </section>

        {/* GET INTO TOP COLLEGES */}
        <section className="gnmts-colleges-section" aria-labelledby="colleges-heading">
          <div className="gnmts-colleges-heading">
            <h2 id="colleges-heading">
              Get Into <span>Top Jharkhand</span><br />GNM Nursing Colleges
            </h2>
            <p>Our students are across Jharkhand's best GNM nursing institutes</p>
          </div>
          <div className="gnmts-colleges-image-wrap">
            <Image
              src="/GNMBot.jpg"
              alt="Top Jharkhand GNM Nursing Colleges"
              className="gnmts-colleges-real-img"
              loading="lazy"
              width="780"
              height="400"
            />
          </div>
        </section>

        <div className="gnmts-bottom-spacer" />
      </div>

      {/* ── STICKY BUY FOOTER ── */}
      <div className="gnmts-sticky-footer">
        {checking ? (
          <div className="gnmts-price-skeleton">
            <div className="gnmts-skeleton-line" style={{ width: 48, height: 10 }} />
            <div className="gnmts-skeleton-line" style={{ width: 72, height: 22 }} />
            <div className="gnmts-skeleton-line" style={{ width: 56, height: 9 }} />
          </div>
        ) : (
          <div className="gnmts-sticky-price">
            <span className="price-original">Rs.{TS.originalPrice}</span>
            <div className="price-row">
              <span className="price-main">Rs.{TS.price}</span>
              <span className="price-off">50% OFF</span>
            </div>
            <span className="price-sub">one-time · {TS.tests} tests</span>
          </div>
        )}

        <button
          className="gnmts-sticky-cta"
          onClick={handleJoin}
          aria-label={`Buy GNM Test Series 2026 for Rs.${TS.price}`}
        >
          <div className="gnmts-cta-inner">
            <span className="gnmts-cta-top">🔓 Buy Now — Rs.{TS.price}</span>
            <span className="gnmts-cta-sub">Get instant access · {TS.tests} full tests</span>
          </div>
        </button>
      </div>

      {showBuy && (
        <BuyModal
          testSeriesId={TS.id}
          testSeriesName={TS.name}
          autoOpen={true}
          onClose={() => setShowBuy(false)}
        />
      )}
    </div>
  );
}
