"use client";

import React, { useState, useEffect } from "react";
import SubjectQuestions from "../SubjectQuestions";
import ChapterwisePYQANM from "./ChapterwisePYQANM";
import AdBanner from "@/components/AdBanner";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DetailsPageANM() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("General Science");
  const [focusMode, setFocusMode] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [cwUnlocked, setCwUnlocked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowBanner(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={`pyq-app ${focusMode ? "focus-mode" : ""}`}>
        <style>{`
/* ================= ROOT ================= */
.pyq-app{
  font-family: Inter, system-ui;
  background:#f8f9fa;
  min-height:100vh;
  display:flex;
  flex-direction:column;
  align-items:center;
}

/* WIDTH CONTROL */
.pyq-header,
.pyq-card{
  width:100%;
  max-width:760px;
}

/* ================= HEADER ================= */
.pyq-header{
  background:linear-gradient(180deg,#0aa06e,#1fbf8f);
  color:#fff;
  padding:20px 16px 24px;
  border-radius:0 0 10px 10px;
  text-align:center;
}

.pyq-header h1{
  margin:0;
  font-size:clamp(18px, 5vw, 22px);
  font-weight:800;
}

.pyq-header p{
  margin:6px 0 14px;
  font-size:clamp(13px, 3.5vw, 14px);
  opacity:.95;
}

/* STATS */
.pyq-stats{
  display:flex;
  justify-content:center;
  gap:26px;
  font-size:13px;
}

.pyq-stats span{
  display:flex;
  flex-direction:column;
  align-items:center;
  font-weight:600;
}

.pyq-stats strong{
  font-size:15px;
}

/* TABS */
.pyq-tabs{
  margin-top:14px;
  display:flex;
  gap:8px;
  justify-content:center;
  flex-wrap:wrap;
}

.pyq-tabs button{
  border:none;
  padding:8px 16px;
  border-radius:999px;
  background:rgba(255,255,255,.25);
  color:#fff;
  font-size:13px;
  font-weight:700;
  min-height:36px;
  cursor:pointer;
}

.pyq-tabs button.active{
  background:#fff;
  color:#0aa06e;
}

.pyq-tabs button.tab-pro {
  background: rgba(255,200,0,0.25);
  color: #fff;
  border: 1.5px solid rgba(255,220,80,0.6);
}
.pyq-tabs button.tab-pro.active {
  background: linear-gradient(135deg,#ffe566,#ffb700);
  color: #1a1200;
  border-color: transparent;
}
.tab-pro-badge {
  font-size: 10px; font-weight: 800;
  background: #ff6b00; color: #fff;
  border-radius: 4px; padding: 1px 5px;
  margin-left: 5px; vertical-align: middle;
}

/* ================= CONTENT CARD ================= */
.pyq-card{
  background:#f8f9fa;
  margin:0px 12px;
  padding:16px 16px 96px;
  box-shadow:0 10px 30px rgba(0,0,0,.06);
}

.detail-page-ad{
  width:100%;
  max-width:760px;
  margin:0 0 40px;
  padding:240px 16px 0;
  box-sizing:border-box;
}

/* ================= FOCUS MODE ================= */
.focus-mode .pyq-header,
.focus-mode .pyq-seo{
  display:none;
}

.focus-mode .pyq-card{
  margin:0;
  padding:0;
  width:100%;
  max-width:100%;
  border-radius:0;
  box-shadow:none;
}

/* ================= MOBILE ================= */
@media (max-width:600px){
  .pyq-header{
    width:100vw;
    max-width:100vw;
    margin-left:calc(-50vw + 50%);
    margin-right:calc(-50vw + 50%);
    position:sticky;
    top:56px;
    z-index:50;
  }
}

/* ================= BANNER ================= */
.anm-banner-overlay {
  position: fixed; inset: 0; z-index: 9999;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.65);
  backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px);
  padding: 16px; box-sizing: border-box;
  animation: anmBannerFadeIn 0.3s ease;
}
@keyframes anmBannerFadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes anmBannerSlideUp { from { transform: translateY(40px) scale(0.96); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }

.anm-banner-wrapper {
  position: relative;
  width: min(340px, calc(100vw - 32px));
  max-height: calc(100vh - 80px);
  border-radius: 14px; overflow: hidden;
  box-shadow: 0 24px 60px rgba(0,0,0,0.55);
  animation: anmBannerSlideUp 0.35s cubic-bezier(0.34,1.56,0.64,1);
}
.anm-banner-wrapper img {
 width: 100%; height: auto; max-height: calc(100vh - 80px); object-fit: contain; display: block; cursor: pointer;
}
.anm-banner-close {
  position: absolute; top: 10px; right: 10px;
  width: 32px; height: 32px; border: none; background: transparent;
  color: #fff; font-size: 25px; line-height: 1;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; z-index: 10; transition: opacity 0.2s;
  -webkit-tap-highlight-color: transparent;
}
.anm-banner-close:hover { opacity: 0.7; }
@media (max-width: 360px) {
  .anm-banner-close { width: 28px; height: 28px; font-size: 18px; top: 8px; right: 8px; }
}
        `}</style>

        {/* BANNER */}
        {showBanner && (
          <div
            className="anm-banner-overlay"
            onClick={(e) => { if (e.target === e.currentTarget) setShowBanner(false); }}
          >
            <div className="anm-banner-wrapper">
              <Image width={1024} height={1536}
                src="/ANM.png"
                alt="Jharkhand ANM 2026 Full Test Series – Join on Futurely"
                draggable={false} loading="lazy" onClick={() => { setShowBanner(false); router.push("/anm-tests"); }}
              />
              <button
                className="anm-banner-close"
                onClick={() => setShowBanner(false)}
                aria-label="Close advertisement"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* ================= HEADER ================= */}
        {!focusMode && (
          <div className="pyq-header">
            <h1>Jharkhand ANM Previous Year Questions (PYQ)</h1>
            <p>JCECEB ANM Entrance — For 2026 Exam</p>

            <div className="pyq-stats">
              <span><strong>2021–2025</strong>Years</span>
              <span><strong>5</strong>Papers</span>
              <span><strong>500</strong>Questions</span>
            </div>

            <div className="pyq-tabs">
              <button className={activeTab === "General Science" ? "active" : ""} onClick={() => setActiveTab("General Science")}>General Science</button>
              <button className={activeTab === "General Knowledge" ? "active" : ""} onClick={() => setActiveTab("General Knowledge")}>General Knowledge</button>
              <button className={activeTab === "Mathematics" ? "active" : ""} onClick={() => setActiveTab("Mathematics")}>Mathematics</button>
              <button
                className={`tab-pro ${activeTab === "Chapterwise" ? "active" : ""}`}
                onClick={() => setActiveTab("Chapterwise")}
              >
                Chapter-wise PYQs
                {!cwUnlocked && <span className="tab-pro-badge">New</span>}
              </button>
            </div>
          </div>
        )}

        {/* ================= CONTENT ================= */}
        <div className="pyq-card">
          {activeTab === "General Science" && (
            <SubjectQuestions exam="ANM" subject="generalScience" setFocusMode={setFocusMode} />
          )}
          {activeTab === "General Knowledge" && (
            <SubjectQuestions exam="ANM" subject="generalKnowledge" setFocusMode={setFocusMode} />
          )}
          {activeTab === "Mathematics" && (
            <SubjectQuestions exam="ANM" subject="maths" setFocusMode={setFocusMode} />
          )}
          {activeTab === "Chapterwise" && (
            <ChapterwisePYQANM
              isUnlocked={cwUnlocked}
              onUnlocked={() => setCwUnlocked(true)}
              setFocusMode={setFocusMode}
            />
          )}
        </div>

        <div className="detail-page-ad">
          <AdBanner slot="2434542863" />
        </div>

      </div>
    </>
  );
}