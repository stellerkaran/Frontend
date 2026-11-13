"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useAuthModal } from "../context/AuthModalContext";
import { authFetch } from "../utils/api";
import { useRouter } from "next/navigation";
import Image from "next/image";

/* ─────────────────────────────────────────────
   PRODUCT CATALOGUE
   Add more products here as you expand.
───────────────────────────────────────────── */
const PRODUCTS = {
  /* ── Test Series ── */
  "JHP-TS": {
    icon: "📋",
    name: "Jharkhand Polytechnic Test Series 2027",
    sub: "PECE Pattern · 10 Full Tests",
    price: 199,
    originalPrice: 399,
    route: "/jh-poly-tests",
  },

  "D2D-TS": {
    icon: "📋",
    name: "Jharkhand D2D Full Test Series 2027",
    sub: "JCECEB Pattern · 10 Full Tests",
    price: 199,
    originalPrice: 399,
    route: "/d2d-tests",
  },

  "d2d-full-2026": {
    icon: "📋",
    name: "Jharkhand D2D Full Test Series 2027",
    sub: "JCECEB Pattern · 10 Full Tests",
    price: 199,
    originalPrice: 399,
    route: "/d2d-tests",
  },

  "JHPLE-TS": {
    icon: "📋",
    name: "Jharkhand Polytechnic Lateral Entry Test Series",
    sub: "PECE LE Pattern · 10 Full Tests",
    price: 199,
    originalPrice: 399,
    route: "/jh-poly-lateral-tests",
  },

  /* ── Chapter-wise PYQs & Bundles ── */
  "d2d-chapterwise-pyq": {
    icon: "📚",
    name: "D2D Chapter-wise PYQs (2021–2026",
    sub: "Physics · Chemistry · Mathematics · 600 Questions",
    price: 249,
    originalPrice: 499,
    route: null,
    isChapterwise: true,
  },

  "d2d-bundle": {
    icon: "🎯",
    name: "D2D Complete Bundle",
    sub: "Chapter-wise PYQs + Full Test Series — Best Value",
    price: 399,
    originalPrice: 599,
    route: null,
    isBundle: true,
    isChapterwise: true,
  },

  "JHP-chapterwise-pyq": {
    icon: "📚",
    name: "Jharkhand Polytechnic Chapter-wise PYQs (2021–2026)",
    sub: "Math · Science · 750 Questions",
    price: 259,
    originalPrice: 499,
    route: null,
    isChapterwise: true,
  },

  "JHP-bundle": {
    icon: "🎯",
    name: "Jharkhand Polytechnic Complete Bundle",
    sub: "Chapter-wise PYQs + Full Test Series — Best Value",
    price: 399,
    originalPrice: 599,
    route: null,
    isBundle: true,
    isChapterwise: true,
  },

  "JHPLE-chapterwise-pyq": {
    icon: "📚",
    name: "Jharkhand Polytechnic Lateral Entry Chapter-wise PYQs",
    sub: "Math · Science · 750 Questions",
    price: 249,
    originalPrice: 499,
    route: null,
    isChapterwise: true,
  },
  "GNM-TS": {
    icon: "📋",
    name: "GNM Test Series",
    sub: "JCECEB GNM Pattern · 10 Full Tests",
    price: 99,
    originalPrice: 199,
    route: "/gnm-tests",
  },

  "JHPLE-bundle": {
    icon: "🎯",
    name: "Jharkhand Polytechnic Lateral Entry Complete Bundle",
    sub: "Chapter-wise PYQs + Full Test Series — Best Value",
    price: 399,
    originalPrice: 599,
    route: null,
    isBundle: true,
    isChapterwise: true,
  },

  "gnm-chapterwise-pyq": {
    icon: "📚",
    name: "GNM Chapter-wise PYQs (2021–2025)",
    sub: "Physics · Chemistry · Biology · Maths · English",
    price: 99,
    originalPrice: 199,
    route: null,
    isChapterwise: true,
  },

  "gnm-bundle": {
    icon: "🎯",
    name: "GNM Complete Bundle",
    sub: "Chapter-wise PYQs + Full Test Series — Best Value",
    price: 149,
    originalPrice: 249,
    route: null,
    isBundle: true,
    isChapterwise: true,
  },

  "anm-chapterwise-pyq": {
    icon: "📚",
    name: "ANM Chapter-wise PYQs (2021–2025)",
    sub: "General Science · Mathematics · GK",
    price: 99,
    originalPrice: 199,
    route: null,
    isChapterwise: true,
  },

  "anm-bundle": {
    icon: "🎯",
    name: "ANM Complete Bundle",
    sub: "Chapter-wise PYQs + Full Test Series — Best Value",
    price: 149,
    originalPrice: 249,
    route: null,
    isBundle: true,
    isChapterwise: true,
  },

  "paramedical-chapterwise-pyq": {
    icon: "📚",
    name: "Paramedical Chapter-wise PYQs (2021–2025)",
    sub: "Physics · Chemistry · Biology",
    price: 99,
    originalPrice: 199,
    route: null,
    isChapterwise: true,
  },

  "paramedical-bundle": {
    icon: "🎯",
    name: "Paramedical Complete Bundle",
    sub: "Chapter-wise PYQs + Full Test Series — Best Value",
    price: 149,
    originalPrice: 249,
    route: null,
    isBundle: true,
    isChapterwise: true,
  },
};

const FALLBACK_PRODUCT = {
  icon: "📋",
  name: "Test Series",
  sub: "JCECEB Pattern · 10 Full Tests",
  price: 199,
  originalPrice: 399,
  route: null,
};

const YOUR_UPI_ID = "8287426663";
const YOUR_UPI_QR = "/upi-qr.png";

const S = {
  keyframes: `
    @keyframes bm-fade    { from{opacity:0;transform:scale(0.94)} to{opacity:1;transform:scale(1)} }
    @keyframes bm-spin    { to{transform:rotate(360deg)} }
    @keyframes bm-overlay { from{opacity:0} to{opacity:1} }
  `,

  overlay: {
    position: "fixed", inset: 0, zIndex: 9999,
    background: "rgba(10,10,20,0.70)",
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "12px",
    animation: "bm-overlay 0.18s ease",
    boxSizing: "border-box",
  },

  card: {
    background: "#fff",
    borderRadius: 18,
    width: "100%",
    maxWidth: 400,
    boxShadow: "0 24px 64px rgba(0,0,0,0.28)",
    animation: "bm-fade 0.22s cubic-bezier(0.34,1.56,0.64,1)",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    boxSizing: "border-box",
    overflow: "hidden",
    position: "relative",
  },

  closeBtn: {
    position: "absolute", top: 12, right: 12,
    width: 26, height: 26, borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(246, 246, 248, 0.85)",
    color: "#080808", fontSize: 19, fontWeight: 700, lineHeight: 1,
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", zIndex: 5,
    boxShadow: "0 4px 14px rgba(0,0,0,0.22)",
    backdropFilter: "blur(6px)",
  },

  topStrip: {
    background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    padding: "13px 14px 11px",
    boxSizing: "border-box",
  },
  /* chapter-wise strip gets a different gradient */
  topStripCW: {
    background: "linear-gradient(135deg, #1a1040 0%, #4f46e5 100%)",
    padding: "13px 14px 11px",
    boxSizing: "border-box",
  },
  stripRow: {
    display: "flex", alignItems: "center", gap: 9,
    paddingRight: 36, marginBottom: 9,
  },
  stripIcon: {
    width: 32, height: 32, borderRadius: 8, flexShrink: 0,
    background: "rgba(255,255,255,0.18)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 15,
  },
  stripName: { fontSize: 13, fontWeight: 800, color: "#fff", lineHeight: 1.25, margin: 0, wordBreak: "break-word" },
  stripSub: { fontSize: 10, color: "rgba(255,255,255,0.70)", margin: "2px 0 0", fontWeight: 500 },
  priceRow: {
    display: "flex", alignItems: "center", gap: 7,
    background: "rgba(255,255,255,0.13)",
    borderRadius: 9, padding: "7px 10px",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  priceMain: { fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" },
  priceOld: { fontSize: 11, color: "rgba(255,255,255,0.52)", textDecoration: "line-through", fontWeight: 600 },
  priceBadge: {
    marginLeft: "auto",
    background: "#dcfce7", color: "#16a34a",
    fontSize: 9, fontWeight: 800, borderRadius: 99, padding: "2px 7px",
  },

  stepBar: { display: "flex", alignItems: "center", padding: "10px 14px 0", boxSizing: "border-box" },
  stepCircle: (active, done) => ({
    width: 24, height: 24, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 11, fontWeight: 800,
    background: done ? "#4f46e5" : active ? "#4f46e5" : "#f1f5f9",
    color: done || active ? "#fff" : "#94a3b8",
    border: active ? "2px solid #c7d2fe" : done ? "2px solid #4f46e5" : "2px solid #e2e8f0",
    flexShrink: 0,
  }),
  stepLabel: (active, done) => ({
    fontSize: 8, fontWeight: 700, letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: active || done ? "#4f46e5" : "#94a3b8",
    marginTop: 3,
  }),
  stepLine: (done) => ({
    flex: 1, height: 2, margin: "0 4px", marginBottom: 10,
    background: done ? "#4f46e5" : "#e2e8f0",
  }),

  body: { padding: "10px 14px 14px", boxSizing: "border-box" },

  amountChip: {
    display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
    background: "linear-gradient(135deg,#eff6ff,#f0fdf4)",
    border: "1.5px solid #bfdbfe",
    borderRadius: 9, padding: "8px 10px",
    fontSize: 13, fontWeight: 900, color: "#1d4ed8",
    width: "100%", boxSizing: "border-box", marginBottom: 9,
  },
  amountSave: {
    fontSize: 10, fontWeight: 700, color: "#16a34a",
    background: "#dcfce7", borderRadius: 99, padding: "1px 7px",
  },

  howCard: {
    background: "#f8fafc", borderRadius: 9,
    border: "1px solid #f1f5f9",
    padding: "9px 10px", marginBottom: 9, boxSizing: "border-box",
  },
  howTitle: { fontSize: 9, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 },
  howRow: { display: "flex", alignItems: "center", gap: 7 },
  howNum: {
    width: 18, height: 18, borderRadius: "50%",
    background: "#eef2ff", color: "#4f46e5",
    fontSize: 9, fontWeight: 900, flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  howText: { fontSize: 11, color: "#374151", fontWeight: 500 },

  qrBox: {
    background: "#f8faff", borderRadius: 12,
    border: "1.5px solid #e0e7ff",
    padding: "10px 10px 8px",
    textAlign: "center", marginBottom: 8,
    boxSizing: "border-box",
  },
  qrLabel: { fontSize: 9, fontWeight: 800, color: "#6366f1", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 7, display: "block" },
  qrImg: {
    width: 140, height: 140, objectFit: "contain",
    borderRadius: 9, border: "1px solid #e0e7ff",
    background: "#fff", display: "block", margin: "0 auto",
  },
  qrFallback: {
    width: 140, height: 140, borderRadius: 9,
    border: "2px dashed #c7d2fe", background: "#eef2ff",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    margin: "0 auto", color: "#6366f1",
    fontSize: 11, fontWeight: 700, gap: 5,
  },

  upiRow: {
    display: "flex", alignItems: "center", gap: 7,
    background: "#f8faff", borderRadius: 9,
    border: "1.5px solid #e0e7ff",
    padding: "7px 10px", marginBottom: 9,
    boxSizing: "border-box",
  },
  upiLeft: { display: "flex", flexDirection: "column", gap: 1, flex: 1, minWidth: 0 },
  upiSmall: { fontSize: 8, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" },
  upiId: { fontSize: 12, fontWeight: 700, color: "#0f172a", wordBreak: "break-all" },
  copyBtn: (copied) => ({
    background: copied ? "#dcfce7" : "#4f46e5",
    color: copied ? "#16a34a" : "#fff",
    border: "none", borderRadius: 7,
    padding: "6px 10px", fontSize: 10, fontWeight: 800,
    cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap",
    transition: "all 0.2s",
  }),

  primaryBtn: {
    width: "100%", padding: "11px", borderRadius: 11, border: "none",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "#fff", fontSize: 13, fontWeight: 800, cursor: "pointer",
    boxShadow: "0 3px 12px rgba(79,70,229,0.35)",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
    boxSizing: "border-box",
  },

  infoNote: {
    display: "flex", alignItems: "flex-start", gap: 6,
    background: "#fffbeb", border: "1px solid #fde68a",
    borderRadius: 8, padding: "7px 9px", marginBottom: 9,
    fontSize: 10, color: "#92400e", fontWeight: 600, lineHeight: 1.5,
    boxSizing: "border-box",
  },
  fieldWrap: { marginBottom: 8 },
  label: { fontSize: 10, fontWeight: 800, color: "#374151", display: "block", marginBottom: 4, letterSpacing: "0.03em" },
  optBadge: {
    display: "inline-block", fontSize: 8, fontWeight: 700,
    color: "#64748b", background: "#f1f5f9",
    borderRadius: 99, padding: "1px 6px", marginLeft: 5,
    letterSpacing: "0.04em", textTransform: "uppercase", verticalAlign: "middle",
  },
  input: {
    width: "100%", padding: "9px 10px",
    borderRadius: 9, border: "1.5px solid #e2e8f0",
    fontSize: 13, color: "#0f172a", fontWeight: 600,
    outline: "none", boxSizing: "border-box", fontFamily: "inherit",
  },
  inputHint: { fontSize: 9, color: "#94a3b8", marginTop: 3 },
  orRow: { display: "flex", alignItems: "center", gap: 8, margin: "8px 0" },
  orLine: { flex: 1, height: 1, background: "#e2e8f0" },
  orText: { fontSize: 10, fontWeight: 800, color: "#94a3b8", letterSpacing: "0.05em" },

  uploadBox: {
    border: "2px dashed #c7d2fe", borderRadius: 9,
    padding: "16px", textAlign: "center",
    cursor: "pointer", background: "#f8faff",
    boxSizing: "border-box", width: "100%",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", gap: 3,
  },
  uploadIcon: { fontSize: 26 },
  uploadText: { fontSize: 11, fontWeight: 700, color: "#4f46e5" },
  uploadSub: { fontSize: 9, color: "#94a3b8" },

  previewWrap: { position: "relative", display: "flex", justifyContent: "center" },
  preview: {
    maxWidth: "100%", maxHeight: 130, objectFit: "contain",
    borderRadius: 9, border: "1.5px solid #e2e8f0", display: "block", margin: "0 auto",
  },
  changeImgBtn: {
    position: "absolute", top: 5, right: 5,
    background: "rgba(255,255,255,0.95)", border: "1px solid #e2e8f0",
    borderRadius: 6, padding: "3px 7px", fontSize: 9, fontWeight: 700,
    cursor: "pointer", color: "#374151",
  },
  errorBox: {
    display: "flex", alignItems: "flex-start", gap: 6,
    background: "#fef2f2", border: "1px solid #fecaca",
    borderRadius: 8, padding: "7px 9px", marginBottom: 8,
    fontSize: 11, color: "#dc2626", fontWeight: 600, boxSizing: "border-box",
  },
  formActions: { display: "flex", gap: 7, marginTop: 4 },
  backBtn: {
    padding: "10px 12px", borderRadius: 10,
    border: "1.5px solid #e2e8f0", background: "#fff",
    color: "#374151", fontWeight: 700, fontSize: 12,
    cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap",
  },
  submitBtn: (loading) => ({
    flex: 1, padding: "10px", borderRadius: 10, border: "none",
    background: loading ? "#86efac" : "linear-gradient(135deg,#16a34a,#15803d)",
    color: "#fff", fontWeight: 800, fontSize: 12,
    cursor: loading ? "not-allowed" : "pointer",
    boxShadow: loading ? "none" : "0 2px 10px rgba(22,163,74,0.3)",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
    transition: "all 0.2s",
  }),

  successWrap: { padding: "16px 14px 14px", textAlign: "center" },
  successCircle: {
    width: 54, height: 54, borderRadius: "50%",
    background: "linear-gradient(135deg,#dcfce7,#bbf7d0)",
    border: "3px solid #86efac",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 24, margin: "0 auto 10px",
  },
  successTitle: { fontSize: 16, fontWeight: 900, color: "#0f172a", margin: "0 0 5px" },
  successBody: { fontSize: 11, color: "#64748b", lineHeight: 1.6, margin: "0 0 12px" },
  successSteps: {
    background: "#f8faff", borderRadius: 9,
    border: "1px solid #e0e7ff",
    padding: "10px 12px", marginBottom: 12, textAlign: "left", boxSizing: "border-box",
  },
  successStepItem: { display: "flex", alignItems: "center", gap: 7, fontSize: 11, color: "#374151", fontWeight: 600 },
  successDot: { width: 6, height: 6, borderRadius: "50%", background: "#4f46e5", flexShrink: 0 },
  doneBtn: {
    width: "100%", padding: "11px", borderRadius: 11, border: "none",
    background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
    color: "#fff", fontWeight: 800, fontSize: 13, cursor: "pointer",
    boxShadow: "0 3px 12px rgba(79,70,229,0.28)", boxSizing: "border-box",
  },

  pendingWrap: { padding: "16px 14px 14px", textAlign: "center" },
  pendingCircle: {
    width: 54, height: 54, borderRadius: "50%",
    background: "linear-gradient(135deg,#fef9c3,#fde68a)",
    border: "3px solid #fcd34d",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 24, margin: "0 auto 10px",
  },
  pendingTitle: { fontSize: 16, fontWeight: 900, color: "#0f172a", margin: "0 0 5px" },
  pendingBody: { fontSize: 11, color: "#64748b", lineHeight: 1.6, margin: "0 0 12px" },
  timelineItem: { display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8, textAlign: "left" },
  timelineDot: (done) => ({
    width: 18, height: 18, borderRadius: "50%",
    background: done ? "#dcfce7" : "#fef9c3",
    border: done ? "2px solid #86efac" : "2px solid #fcd34d",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 9, flexShrink: 0, marginTop: 1,
  }),
  timelineText: { fontSize: 11, color: "#374151", fontWeight: 700, lineHeight: 1.3 },
  timelineSub: { fontSize: 9, color: "#94a3b8", fontWeight: 500 },

  accessWrap: { display: "flex", flexDirection: "column", gap: 9, alignItems: "stretch" },
  accessBadge: {
    display: "flex", alignItems: "center", gap: 7,
    fontSize: 12, fontWeight: 700, color: "#166534",
    background: "#dcfce7", padding: "7px 12px", borderRadius: 9,
    border: "1px solid #86efac",
  },
  startBtn: {
    padding: "12px", borderRadius: 11, border: "none",
    background: "linear-gradient(135deg,#16a34a,#15803d)",
    color: "#fff", fontWeight: 800, fontSize: 14, cursor: "pointer",
    boxShadow: "0 3px 12px rgba(22,163,74,0.28)",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
  },
  buyBtn: {
    padding: "11px 20px", borderRadius: 11, border: "none",
    background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
    color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer",
    display: "inline-flex", alignItems: "center", gap: 6,
    boxShadow: "0 3px 12px rgba(79,70,229,0.35)",
  },
  exhaustedBadge: {
    fontSize: 12, fontWeight: 700, color: "#991b1b",
    background: "#fee2e2", padding: "7px 14px", borderRadius: 9,
    display: "inline-block", border: "1px solid #fecaca",
  },
};

/* ── Step bar ── */
function StepBar({ step }) {
  return (
    <div style={S.stepBar}>
      {[{ num: 1, label: "Pay" }, { num: 2, label: "Confirm" }].map((s, i, arr) => (
        <React.Fragment key={s.num}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <div style={S.stepCircle(step === s.num, step > s.num)}>
              {step > s.num ? "✓" : s.num}
            </div>
            <span style={S.stepLabel(step === s.num, step > s.num)}>{s.label}</span>
          </div>
          {i < arr.length - 1 && <div style={S.stepLine(step > s.num)} />}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ── Top strip (price header) ── */
function TopStrip({ product }) {
  const save = product.originalPrice - product.price;
  const pct = Math.round((save / product.originalPrice) * 100);
  return (
    <div style={product.isChapterwise ? S.topStripCW : S.topStrip}>
      <div style={S.stripRow}>
        <div style={S.stripIcon}>{product.icon}</div>
        <div style={{ minWidth: 0 }}>
          <p style={S.stripName}>{product.name}</p>
          <p style={S.stripSub}>{product.sub}</p>
        </div>
      </div>
      <div style={S.priceRow}>
        <span style={S.priceMain}>₹{product.price}</span>
        <span style={S.priceOld}>₹{product.originalPrice}</span>
        <span style={S.priceBadge}>{pct}% OFF · Save ₹{save}</span>
      </div>
    </div>
  );
}

const Spinner = () => (
  <div style={{ width: 12, height: 12, border: "2px solid rgba(255,255,255,0.35)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "bm-spin 0.7s linear infinite" }} />
);

/* ════════════════════════════════════════
   MAIN COMPONENT
   Props:
     testSeriesId   – key in PRODUCTS catalogue
     testSeriesName – optional override for product name
     autoOpen       – open modal immediately
     onClose        – callback when modal closes
     onUnlocked     – callback when chapterwise access confirmed
════════════════════════════════════════ */
export default function BuyModal({ testSeriesId, testSeriesName, autoOpen = false, onClose, onUnlocked }) {
  const { isLoggedIn } = useAuth();
  const { openLogin } = useAuthModal();
  const router = useRouter();

  const product = { ...(PRODUCTS[testSeriesId] || FALLBACK_PRODUCT) };
  if (testSeriesName) product.name = testSeriesName;

  const [accessStatus, setAccessStatus] = useState(null);
  const [showModal, setShowModal] = useState(autoOpen);
  const [step, setStep] = useState(1);
  const [upiRef, setUpiRef] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [qrError, setQrError] = useState(false);

  const checkAccess = useCallback(async () => {
    try {
      const res = await authFetch(`/purchase/check?testSeriesId=${testSeriesId}`);
      if (!res.ok) throw new Error("Check access failed");
      const data = await res.json();
      setAccessStatus(data);
      // notify parent if chapterwise just got unlocked
      if (data?.access && product.isChapterwise) onUnlocked?.();
    } catch {
      setAccessStatus({ access: false, pending: false });
    }
  }, [testSeriesId]); // eslint-disable-line

  useEffect(() => {
    if (!isLoggedIn) return;
    checkAccess();
  }, [isLoggedIn, testSeriesId, checkAccess]);

  const handleCopy = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(YOUR_UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleScreenshot = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError("Image must be under 5 MB"); return; }
    setScreenshot(file);
    setScreenshotPreview(URL.createObjectURL(file));
    setError("");
  };

  const handleSubmit = async () => {
    const hasRef = upiRef.trim().length > 0;
    const hasSS = !!screenshot;
    if (!hasRef && !hasSS)
      return setError("Add your Transaction ID or upload a screenshot (either works)");

    setSubmitting(true);
    setError("");

    const attemptSubmit = async () => {
      const fd = new FormData();
      fd.append("testSeriesId", testSeriesId);
      if (hasRef) fd.append("upiRef", upiRef.trim());
      if (hasSS) fd.append("screenshot", screenshot);

      return authFetch("/purchase/request", {
        method: "POST",
        body: fd,
      });
    };

    try {
      let res = await attemptSubmit();
      if (!res.ok && (res.status === 401 || res.status === 500 || res.status === 503)) {
        await new Promise((r) => setTimeout(r, 3000));
        res = await attemptSubmit();
      }

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          data?.message || data?.error || data?.msg || "Submission failed. Please try again."
        );
      }

      // Optimistically record purchase locally so user access is preserved across sessions
      try {
        const purchased = JSON.parse(localStorage.getItem("purchased_series") || "[]");
        if (!purchased.includes(testSeriesId)) {
          purchased.push(testSeriesId);
          localStorage.setItem("purchased_series", JSON.stringify(purchased));
        }
      } catch (e) {
        console.warn("Could not save to localStorage", e);
      }

      setSubmitted(true);
      await checkAccess();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStartTest = async () => {
    try {
      const res = await authFetch("/purchase/attempt", { method: "POST", body: JSON.stringify({ testSeriesId }) });
      if (!res.ok) throw new Error("Attempt request failed");
      const data = await res.json();
      if (data.allowed) {
        if (product.route) router.push(product.route);
        else alert("Access granted! Refresh the page to see your content.");
      } else {
        alert(data.message || "No attempts remaining");
      }
    } catch {
      alert("Something went wrong. Try again.");
    }
  };

  const closeModal = () => {
    setShowModal(false); setStep(1); setUpiRef("");
    setScreenshot(null); setScreenshotPreview(null);
    setError(""); setSubmitted(false); onClose?.();
  };

  /* ── When autoOpen is true, render purely in modal mode ── */
  if (autoOpen) {
    if (!isLoggedIn) {
      return (
        <>
          <style dangerouslySetInnerHTML={{ __html: S.keyframes }} />
          {showModal && (
            <div style={S.overlay} onClick={closeModal}>
              <div style={{ ...S.card, padding: "24px 20px", textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
                <button style={S.closeBtn} onClick={closeModal}>×</button>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🔒</div>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: "#0f172a", marginBottom: 6 }}>Login Required</h3>
                <p style={{ fontSize: 12, color: "#64748b", marginBottom: 20 }}>Please log in or create an account to purchase {product.name}.</p>
                <button
                  style={S.primaryBtn}
                  onClick={() => {
                    closeModal();
                    openLogin();
                  }}
                >
                  Log In / Register Now
                </button>
              </div>
            </div>
          )}
        </>
      );
    }

    if (accessStatus === null) {
      return (
        <>
          <style dangerouslySetInnerHTML={{ __html: S.keyframes }} />
          {showModal && (
            <div style={S.overlay} onClick={closeModal}>
              <div style={{ ...S.card, padding: "36px 20px", textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
                <div style={{ width: 28, height: 28, border: "3px solid #e0e7ff", borderTop: "3px solid #4f46e5", borderRadius: "50%", animation: "bm-spin 0.7s linear infinite", margin: "0 auto 12px" }} />
                <p style={{ fontSize: 13, fontWeight: 700, color: "#4f46e5" }}>Checking your access status…</p>
              </div>
            </div>
          )}
        </>
      );
    }

    if (accessStatus?.access) {
      return (
        <>
          <style dangerouslySetInnerHTML={{ __html: S.keyframes }} />
          {showModal && (
            <div style={S.overlay} onClick={closeModal}>
              <div style={S.card} onClick={(e) => e.stopPropagation()}>
                <button style={S.closeBtn} onClick={closeModal}>×</button>
                <TopStrip product={product} />
                <div style={{ padding: "20px 16px", textAlign: "center" }}>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>🎉</div>
                  <h3 style={{ fontSize: 18, fontWeight: 900, color: "#0f172a", marginBottom: 4 }}>You Already Have Access!</h3>
                  <p style={{ fontSize: 12, color: "#64748b", marginBottom: 16 }}>
                    {product.isChapterwise ? "Chapter-wise PYQs are unlocked for your account." : `Access is active. ${accessStatus.remaining || 10} test attempts remaining.`}
                  </p>
                  <button
                    style={S.startBtn}
                    onClick={() => {
                      closeModal();
                      if (product.route) router.push(product.route);
                      else onUnlocked?.();
                    }}
                  >
                    {product.isChapterwise ? "📖 View Chapter-wise PYQs" : "▶ Go to Test Series"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      );
    }
  }

  /* ── Inline Mode (autoOpen = false) ── */
  if (!isLoggedIn) return (
    <><style dangerouslySetInnerHTML={{ __html: S.keyframes }} />
      <button style={S.buyBtn} onClick={openLogin}>🔒 Login to Start</button>
    </>
  );

  if (accessStatus === null) return (
    <><style dangerouslySetInnerHTML={{ __html: S.keyframes }} />
      <div style={{ fontSize: 12, color: "#64748b", display: "flex", alignItems: "center", gap: 7 }}>
        <div style={{ width: 13, height: 13, border: "2px solid #e2e8f0", borderTop: "2px solid #4f46e5", borderRadius: "50%", animation: "bm-spin 0.7s linear infinite" }} />
        Checking access…
      </div>
    </>
  );

  if (accessStatus?.access) return (
    <><style dangerouslySetInnerHTML={{ __html: S.keyframes }} />
      <div style={S.accessWrap}>
        <div style={S.accessBadge}>
          ✅ {product.isChapterwise ? "Chapter-wise PYQs Unlocked!" : `Access Active · ${accessStatus.remaining || 10} attempt${accessStatus.remaining !== 1 ? "s" : ""} left`}
        </div>
        {!product.isChapterwise && (
          <button style={S.startBtn} onClick={handleStartTest}>▶ Start Test Now</button>
        )}
        {product.isChapterwise && (
          <button style={S.startBtn} onClick={closeModal}>📖 View Chapter-wise PYQs</button>
        )}
      </div>
    </>
  );

  if (accessStatus?.reason === "attempts_exhausted") return (
    <div style={S.exhaustedBadge}>🚫 All {accessStatus.maxAttempts} attempts used</div>
  );

  const isPending = accessStatus?.pending;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: S.keyframes }} />

      {/* Trigger button (only rendered in inline mode) */}
      {!autoOpen && (
        <button
          style={{
            ...S.buyBtn,
            background: isPending
              ? "linear-gradient(135deg,#d97706,#b45309)"
              : product.isChapterwise
                ? "linear-gradient(135deg,#1a1040,#6c45ff)"
                : "linear-gradient(135deg,#4f46e5,#7c3aed)",
          }}
          onClick={() => setShowModal(true)}
        >
          {isPending
            ? "⏳ Check Payment Status"
            : product.isBundle
              ? `🎯 Test Series + Chapter-wise PYQs — ₹${product.price}`
              : product.isChapterwise
                ? `🔓 Unlock Chapter-wise PYQs — ₹${product.price}`
                : `🔓 Test Series + Chapter-wise PYQs — ₹${product.price}`}
        </button>
      )}

      {/* ══ MODAL ══ */}
      {showModal && (
        <div style={S.overlay} onClick={closeModal}>
          <div style={S.card} onClick={e => e.stopPropagation()}>

            <button style={S.closeBtn} onClick={closeModal}>×</button>

            {/* ── PENDING ── */}
            {isPending && (
              <>
                <TopStrip product={product} />
                <div style={S.pendingWrap}>
                  <div style={S.pendingCircle}>⏳</div>
                  <h3 style={S.pendingTitle}>Payment Under Review</h3>
                  <p style={S.pendingBody}>
                    {product.isChapterwise
                      ? "We are verifying your payment. Chapter-wise PYQs will unlock within 1–2 minutes."
                      : "We are verifying your payment. Access will be granted within 1 to 2 minutes."}
                  </p>
                  <div style={{ ...S.successSteps, textAlign: "left" }}>
                    {[
                      { done: true, text: "Payment submitted", sub: "UPI reference received" },
                      { done: false, text: "Verification in progress", sub: "Usually a few minutes" },
                      { done: false, text: product.isChapterwise ? "Chapter-wise access granted" : "Access granted via email", sub: "Confirmation email sent" },
                    ].map((t, i) => (
                      <div key={i} style={{ ...S.timelineItem, marginBottom: i < 2 ? 8 : 0 }}>
                        <div style={S.timelineDot(t.done)}>{t.done ? "✓" : i + 1}</div>
                        <div>
                          <div style={S.timelineText}>{t.text}</div>
                          <div style={S.timelineSub}>{t.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button style={{ ...S.doneBtn, marginTop: 12 }} onClick={closeModal}>OK, Got it!</button>
                </div>
              </>
            )}

            {/* ══ BUY FLOW ══ */}
            {!isPending && (
              <>
                <TopStrip product={product} />
                <StepBar step={step} />

                <div style={S.body}>

                  {/* ── SUCCESS ── */}
                  {submitted && (
                    <div style={S.successWrap}>
                      <div style={S.successCircle}>🎉</div>
                      <h3 style={S.successTitle}>Request Submitted!</h3>
                      <p style={S.successBody}>
                        Payment proof received. We'll verify and grant access — usually within a few minutes.
                      </p>
                      <div style={S.successSteps}>
                        <p style={{ fontSize: 9, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>What happens next</p>
                        {[
                          "We verify your UPI transaction",
                          product.isChapterwise ? "Chapter-wise PYQs unlock on this page" : "Access granted to your account",
                          "Confirmation email sent",
                        ].map((t, i) => (
                          <div key={i} style={{ ...S.successStepItem, marginBottom: i < 2 ? 6 : 0 }}>
                            <div style={S.successDot} />{t}
                          </div>
                        ))}
                      </div>
                      <button style={S.doneBtn} onClick={closeModal}>Got it — I'll wait for access</button>
                    </div>
                  )}

                  {/* ══ STEP 1: Pay ══ */}
                  {!submitted && step === 1 && (
                    <>
                      <div style={S.amountChip}>
                        💰 Pay only <strong style={{ fontSize: 15, margin: "0 4px" }}>₹{product.price}</strong>
                        <span style={S.amountSave}>Save ₹{product.originalPrice - product.price}</span>
                      </div>

                      <div style={S.howCard}>
                        <div style={S.howTitle}>How to pay</div>
                        {[
                          "Open Any UPI app",
                          `Send ₹${product.price} to QR or UPI ID below`,
                          "Take a screenshot of success page",
                          "Click 'Submit Proof' below",
                        ].map((t, i) => (
                          <div key={i} style={{ ...S.howRow, marginBottom: i < 3 ? 5 : 0 }}>
                            <div style={S.howNum}>{i + 1}</div>
                            <span style={S.howText}>{t}</span>
                          </div>
                        ))}
                      </div>

                      <div style={S.qrBox}>
                        <span style={S.qrLabel}>Scan QR to pay</span>
                        {qrError ? (
                          <div style={S.qrFallback}>
                            <span style={{ fontSize: 30 }}>📱</span>
                            <span>Use UPI ID below</span>
                          </div>
                        ) : (
                          <Image width={608} height={608} src={YOUR_UPI_QR} alt="UPI QR" style={S.qrImg} onError={() => setQrError(true)} />
                        )}
                      </div>

                      <div style={S.upiRow}>
                        <div style={S.upiLeft}>
                          <span style={S.upiSmall}>UPI ID</span>
                          <span style={S.upiId}>{YOUR_UPI_ID}</span>
                        </div>
                        <button style={S.copyBtn(copied)} onClick={handleCopy}>
                          {copied ? "✓ Copied!" : "📋 Copy"}
                        </button>
                      </div>

                      <button style={S.primaryBtn} onClick={() => setStep(2)}>
                        I've Paid — Submit Proof →
                      </button>
                    </>
                  )}

                  {/* ══ STEP 2: Submit Proof ══ */}
                  {!submitted && step === 2 && (
                    <>
                      <div style={S.infoNote}>
                        <span style={{ flexShrink: 0 }}>💡</span>
                        <span>Provide <strong>Transaction ID</strong> or <strong>Screenshot</strong> — either works. Both speeds up verification.</span>
                      </div>

                      <div style={S.fieldWrap}>
                        <label style={S.label}>
                          TRANSACTION ID <span style={S.optBadge}>OPTIONAL</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 435782394012"
                          value={upiRef}
                          onChange={e => setUpiRef(e.target.value)}
                          style={S.input}
                        />
                        <p style={S.inputHint}>Find in GPay → Transaction Details or PhonePe → History</p>
                      </div>

                      <div style={S.orRow}>
                        <div style={S.orLine} /><span style={S.orText}>OR</span><div style={S.orLine} />
                      </div>

                      <div style={S.fieldWrap}>
                        <label style={S.label}>
                          PAYMENT SCREENSHOT <span style={S.optBadge}>OPTIONAL</span>
                        </label>
                        {screenshotPreview ? (
                          <div style={S.previewWrap}>
                            <Image width={520} height={390} src={screenshotPreview} alt="Payment" style={S.preview} />
                            <button style={S.changeImgBtn} onClick={() => { setScreenshot(null); setScreenshotPreview(null); }}>
                              Change
                            </button>
                          </div>
                        ) : (
                          <label style={S.uploadBox}>
                            <div style={S.uploadIcon}>📸</div>
                            <div style={S.uploadText}>Tap to upload screenshot</div>
                            <div style={S.uploadSub}>JPG or PNG · max 5 MB</div>
                            <input type="file" accept="image/*" hidden onChange={handleScreenshot} />
                          </label>
                        )}
                      </div>

                      {error && (
                        <div style={S.errorBox}>
                          <span style={{ flexShrink: 0 }}>⚠️</span><span>{error}</span>
                        </div>
                      )}

                      <div style={S.formActions}>
                        <button style={S.backBtn} onClick={() => setStep(1)}>← Back</button>
                        <button style={S.submitBtn(submitting)} onClick={handleSubmit} disabled={submitting}>
                          {submitting ? <><Spinner /> Submitting…</> : "✅ Submit Proof"}
                        </button>
                      </div>
                    </>
                  )}

                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}