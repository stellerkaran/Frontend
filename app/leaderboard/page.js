"use client";

import { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import AdBanner from "../../components/AdBanner";
import { Trophy, ArrowRight, X, Award, Flame, Target, Sparkles, CheckCircle2, ShieldCheck, BookOpen, ExternalLink, User, LayoutDashboard, Lock } from "lucide-react";
import Image from "next/image";

const API_BASE = "https://futurely-backend.onrender.com/api";

/* ================= HELPERS ================= */
function getInitials(name = "") {
  if (!name) return "ST";
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const AVATAR_COLORS = [
  "linear-gradient(135deg, #6366f1, #4f46e5)",
  "linear-gradient(135deg, #8b5cf6, #7c3aed)",
  "linear-gradient(135deg, #ec4899, #db2777)",
  "linear-gradient(135deg, #f59e0b, #d97706)",
  "linear-gradient(135deg, #10b981, #059669)",
  "linear-gradient(135deg, #3b82f6, #2563eb)",
  "linear-gradient(135deg, #ef4444, #dc2626)",
  "linear-gradient(135deg, #06b6d4, #0891b2)",
];

function getAvatarBg(userId) {
  const str = String(userId || "0");
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

/* ================= TABS CONFIG ================= */
const TABS = [
  { key: "daily", label: "Today", icon: "☀️" },
  { key: "weekly", label: "This Week", icon: "📅" },
  { key: "overall", label: "All Time", icon: "🏆" },
];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("overall");
  const [lists, setLists] = useState({ daily: [], weekly: [], overall: [] });
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const { token, user } = useAuth();

  const myUserId = user ? String(user.id || user._id || "") : "";

  // Close profile modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedProfile(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* ---- FETCH LEADERBOARD ---- */
  useEffect(() => {
    const controller = new AbortController();

    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const headers = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
        const res = await fetch(`${API_BASE}/leaderboard/${activeTab}`, {
          headers,
          signal: controller.signal,
        });

        let items = [];
        if (res.ok) {
          const data = await res.json().catch(() => []);
          items = Array.isArray(data) ? data : (data.leaderboard || data.data || []);
        }

        setLists((prev) => ({
          ...prev,
          [activeTab]: items || [],
        }));
      } catch (err) {
        if (err.name !== "AbortError") {
          console.warn("Leaderboard fetch error:", err);
          setLists((prev) => ({
            ...prev,
            [activeTab]: [],
          }));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
    return () => controller.abort();
  }, [token, activeTab]);

  /* ---- DERIVED DATA ---- */
  const fullList = useMemo(() => lists[activeTab] || [], [lists, activeTab]);
  const currentList = useMemo(() => {
    return fullList.slice(0, 10);
  }, [fullList]);

  const firstPlace = currentList.find((u) => (u.position || u.rank || 1) === 1) || currentList[0];
  const secondPlace = currentList.find((u) => (u.position || u.rank) === 2) || currentList[1];
  const thirdPlace = currentList.find((u) => (u.position || u.rank) === 3) || currentList[2];

  const top3 = useMemo(() => {
    const res = [];
    if (secondPlace) res.push({ ...secondPlace, podiumRank: 2 });
    if (firstPlace) res.push({ ...firstPlace, podiumRank: 1 });
    if (thirdPlace) res.push({ ...thirdPlace, podiumRank: 3 });
    return res;
  }, [firstPlace, secondPlace, thirdPlace]);

  const myRank = useMemo(() => {
    if (!user) return null;
    const found = fullList.find((u) => String(u.userId || u._id || u.id) === myUserId);
    if (found) return found;
    return {
      userId: myUserId,
      name: user.name || user.displayName || "You",
      points: user.points || user.score || 0,
      position: user.rank || user.position || 558,
      profilePic: user.profilePic || user.avatar || "",
    };
  }, [fullList, user, myUserId]);

  const isMyRankInTop10 = useMemo(() => {
    if (!myRank) return false;
    return currentList.some((u) => String(u.userId || u._id || u.id) === myUserId);
  }, [currentList, myRank, myUserId]);

  const isCurrentUser = (userId) => Boolean(myUserId && String(userId) === myUserId);

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16 pt-4 sm:pt-8">
      <Container className="max-w-4xl mx-auto px-3 sm:px-6">
        
        {/* HEADER HERO */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            🏆 Top Performers
          </h1>
        </div>

        {/* TABS SWITCHER */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 bg-slate-200/80 rounded-2xl shadow-inner w-full max-w-md sm:w-auto">
            {TABS.map((t) => {
              const isActive = activeTab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-white text-blue-600 shadow-md transform scale-[1.02]"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span className="text-base">{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="space-y-4 my-8">
            <div className="h-44 bg-slate-200/70 rounded-3xl animate-pulse" />
            <div className="h-16 bg-slate-200/70 rounded-2xl animate-pulse" />
            <div className="h-16 bg-slate-200/70 rounded-2xl animate-pulse" />
            <div className="h-16 bg-slate-200/70 rounded-2xl animate-pulse" />
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && currentList.length === 0 && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200/80 shadow-sm max-w-lg mx-auto my-6">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mx-auto mb-4 border border-amber-200/50">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Loading Leaderboard...</h3>
            <p className="text-sm text-slate-500 mb-6">
              {activeTab === "daily"
                ? "Start practicing now — your name could be #1"
                : activeTab === "weekly"
                ? "No scores logged this week yet. Start practicing now!"
                : "No student records available currently."}
            </p>
            <Link href="/exam-preparation" className="inline-flex items-center justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer">
                <span>Start Practice</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        )}

        {/* LEADERBOARD CONTENT */}
        {!loading && currentList.length > 0 && (
          <>
            {/* TOP 3 PODIUM */}
            {top3.length >= 2 && (
              <div className="mb-10 pt-4">
                <div className="grid grid-cols-3 gap-2 sm:gap-6 items-end max-w-2xl mx-auto">
                  {top3.map((student) => {
                    const is1st = student.podiumRank === 1;
                    const is2nd = student.podiumRank === 2;
                    const me = isCurrentUser(student.userId || student._id || student.id);

                    return (
                      <div
                        key={student.userId || student._id || student.id || student.podiumRank}
                        onClick={() => setSelectedProfile(student)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setSelectedProfile(student);
                          }
                        }}
                        className={`flex flex-col items-center text-center group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 focus:outline-none ${
                          is1st ? "order-2 -mt-2 sm:-mt-4 z-10" : is2nd ? "order-1" : "order-3"
                        }`}
                        title="Click to view public profile"
                      >
                        {/* Avatar Container */}
                        <div className="relative mb-2 sm:mb-3">
                          {/* Floating Trophy Icon Top Right */}
                          <div className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 z-20 text-2xl sm:text-4xl filter drop-shadow-md select-none transform transition-transform group-hover:scale-125 group-hover:rotate-12">
                            🏆
                          </div>

                          {/* Avatar Circle */}
                          <div
                            className={`rounded-full overflow-hidden flex items-center justify-center shadow-lg border-2 sm:border-4 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl ${
                              is1st
                                ? "w-20 h-20 sm:w-28 sm:h-28 border-amber-400 ring-4 ring-amber-300/40 group-hover:ring-amber-400"
                                : is2nd
                                ? "w-16 h-16 sm:w-22 sm:h-22 border-slate-300 ring-2 ring-slate-200/60 group-hover:ring-slate-300"
                                : "w-16 h-16 sm:w-22 sm:h-22 border-amber-200 ring-2 ring-amber-200/60 group-hover:ring-amber-300"
                            } ${me ? "ring-4 ring-blue-500" : ""}`}
                            style={{
                              background: student.profilePic
                                ? "transparent"
                                : is1st
                                ? "linear-gradient(135deg, #ef4444, #dc2626)"
                                : getAvatarBg(student.userId || student._id || student.id),
                            }}
                          >
                            {student.profilePic ? (
                              <Image width={96} height={96}
                                src={student.profilePic}
                                alt={student.name || "Student"}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name || "Student")}`;
                                }}
                              />
                            ) : (
                              <span className="text-white font-black text-lg sm:text-3xl tracking-wider">
                                {getInitials(student.name)}
                              </span>
                            )}
                          </div>

                          {/* Badge Number (1, 2, 3) */}
                          <div
                            className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-black text-xs sm:text-sm shadow-md border-2 border-white transition-transform group-hover:scale-110 ${
                              is1st
                                ? "bg-amber-400 text-amber-950"
                                : is2nd
                                ? "bg-slate-400 text-white"
                                : "bg-amber-500 text-white"
                            }`}
                          >
                            {student.podiumRank}
                          </div>
                        </div>

                        {/* Name & Points */}
                        <div className="w-full px-1 mt-1">
                          <p className="font-extrabold text-xs sm:text-base text-slate-900 truncate max-w-[95px] sm:max-w-[150px] mx-auto group-hover:text-blue-600 transition-colors flex items-center justify-center gap-1">
                            <span>{student.name || "Aspirant"}</span>
                          </p>
                          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5 group-hover:text-blue-500 transition-colors">
                            {student.points || student.score || 0} pts
                          </p>
                          <span className="text-[10px] text-blue-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity block -mt-0.5">
                            View Profile
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* LEADERBOARD LIST / TABLE */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
              <div className="bg-slate-100/70 px-4 sm:px-6 py-3.5 border-b border-slate-200/80 flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                <div className="flex items-center gap-4">
                  <span className="w-8 sm:w-12 text-center">Rank</span>
                  <span>Name</span>
                </div>
                <span>Points</span>
              </div>

              <div className="divide-y divide-slate-100">
                {currentList.map((student, idx) => {
                  const uid = student.userId || student._id || student.id;
                  const rank = student.position || student.rank || idx + 1;
                  const me = isCurrentUser(uid);

                  return (
                    <div
                      key={uid || idx}
                      onClick={() => setSelectedProfile(student)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setSelectedProfile(student);
                        }
                      }}
                      className={`px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between transition-all duration-200 cursor-pointer hover:bg-blue-50/70 group ${
                        me ? "bg-blue-50/80 font-bold border-l-4 border-blue-600" : ""
                      }`}
                      title="Tap to view public student profile"
                    >
                      {/* Left: Rank & Avatar & Name */}
                      <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
                        {/* Rank Badge */}
                        <div className="w-8 sm:w-12 text-center flex-shrink-0">
                          {rank === 1 ? (
                            <span className="text-xl">🥇</span>
                          ) : rank === 2 ? (
                            <span className="text-xl">🥈</span>
                          ) : rank === 3 ? (
                            <span className="text-xl">🥉</span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-100 text-slate-600 text-xs sm:text-sm font-black group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                              {rank}
                            </span>
                          )}
                        </div>

                        {/* Avatar */}
                        <div
                          className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0 shadow-sm border border-slate-200 overflow-hidden transition-transform duration-200 group-hover:scale-110 group-hover:shadow-md ${
                            me ? "ring-2 ring-blue-500" : ""
                          }`}
                          style={{
                            background: student.profilePic ? "transparent" : getAvatarBg(uid),
                          }}
                        >
                          {student.profilePic ? (
                            <Image width={96} height={96}
                              src={student.profilePic}
                              alt={student.name || "Student"}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name || "Student")}`;
                              }}
                            />
                          ) : (
                            getInitials(student.name)
                          )}
                        </div>

                        {/* Name */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`text-xs sm:text-base truncate max-w-[120px] sm:max-w-xs group-hover:text-blue-600 transition-colors ${me ? "text-blue-900 font-extrabold" : "text-slate-800 font-semibold"}`}>
                              {student.name || "Student Aspirant"}
                            </span>
                            {me && (
                              <span className="bg-blue-600 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded shadow-xs">
                                YOU
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 group-hover:text-blue-500 font-medium flex items-center gap-0.5 transition-colors">
                            <User className="w-2.5 h-2.5 inline" />
                            <span>View Profile</span>
                          </span>
                        </div>
                      </div>

                      {/* Right: Points */}
                      <div className="text-right flex-shrink-0 pl-2">
                        <span className="text-sm sm:text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                          {student.points || student.score || 0}
                        </span>
                        <span className="text-[10px] sm:text-xs text-slate-400 font-medium ml-1">pts</span>
                      </div>
                    </div>
                  );
                })}

                {/* PINNED USER ROW IF USER IS LOGGED IN AND NOT ALREADY VISIBLE IN TOP 10 */}
                {user && myRank && !isMyRankInTop10 && (
                  <div
                    onClick={() => setSelectedProfile(myRank)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setSelectedProfile(myRank);
                      }
                    }}
                    className="px-3 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between bg-slate-100/90 font-bold border-t-2 border-dashed border-blue-500 border-l-4 border-l-blue-600 transition-colors cursor-pointer hover:bg-blue-50/90 group"
                    title="View your public profile card"
                  >
                    {/* Left: Rank Number & YOU Badge & Avatar & Name */}
                    <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
                      {/* Rank & YOU Badge */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-sm sm:text-lg font-black text-blue-900">
                          {myRank.position || myRank.rank || "558"}
                        </span>
                        <span className="bg-blue-600 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
                          YOU
                        </span>
                      </div>

                      {/* Avatar */}
                      <div
                        className="w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0 shadow-sm border border-slate-200 overflow-hidden ring-2 ring-blue-500 transition-transform group-hover:scale-110"
                        style={{
                          background: myRank.profilePic ? "transparent" : getAvatarBg(myUserId),
                        }}
                      >
                        {myRank.profilePic ? (
                          <Image width={96} height={96}
                            src={myRank.profilePic}
                            alt={myRank.name || "You"}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(myRank.name || "You")}`;
                            }}
                          />
                        ) : (
                          getInitials(myRank.name || user.name || "You")
                        )}
                      </div>

                      {/* Name */}
                      <div className="min-w-0">
                        <span className="text-xs sm:text-base text-blue-900 font-extrabold truncate max-w-[120px] sm:max-w-xs block group-hover:text-blue-700">
                          {myRank.name || user.name || "You"}
                        </span>
                        <span className="text-[10px] text-slate-500 font-normal">
                          Tap to preview your public card
                        </span>
                      </div>
                    </div>

                    {/* Right: Points */}
                    <div className="text-right flex-shrink-0 pl-2">
                      <span className="text-sm sm:text-lg font-black text-blue-900">
                        {myRank.points || myRank.score || 0}
                      </span>
                      <span className="text-[10px] sm:text-xs text-slate-500 font-medium ml-1">pts</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* AD BANNER AT BOTTOM */}
            <div className="mt-8">
              <AdBanner slot="3578360924" format="auto" />
            </div>
          </>
        )}

        {/* ========================================================================= */}
        {/* PUBLIC STUDENT PROFILE PREVIEW MODAL */}
        {/* ========================================================================= */}
        {selectedProfile && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setSelectedProfile(null)}
          >
            <div
              className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-md overflow-hidden transform transition-all animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header Cover */}
              <div className="relative bg-linear-to-r from-blue-700 via-indigo-600 to-teal-600 px-6 pt-7 pb-14 text-white">
                <button
                  onClick={() => setSelectedProfile(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white/90 hover:text-white transition-colors cursor-pointer"
                  title="Close profile"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 text-xs font-semibold text-blue-100 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-teal-300" />
                  <span>Futurely Verified Aspirant Profile</span>
                </div>
              </div>

              {/* Profile Card Body */}
              <div className="px-5 sm:px-6 pb-6 pt-0 relative">
                {/* Floating Avatar */}
                <div className="flex justify-between items-end -mt-12 mb-4">
                  <div className="relative">
                    <div
                      className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden flex items-center justify-center shadow-xl border-4 border-white ${
                        (selectedProfile.podiumRank || selectedProfile.position || selectedProfile.rank) === 1
                          ? "ring-4 ring-amber-400"
                          : (selectedProfile.podiumRank || selectedProfile.position || selectedProfile.rank) <= 3
                          ? "ring-4 ring-indigo-400"
                          : "ring-2 ring-slate-200"
                      }`}
                      style={{
                        background: selectedProfile.profilePic
                          ? "transparent"
                          : (selectedProfile.podiumRank || selectedProfile.position || selectedProfile.rank) === 1
                          ? "linear-gradient(135deg, #ef4444, #dc2626)"
                          : getAvatarBg(selectedProfile.userId || selectedProfile._id || selectedProfile.id),
                      }}
                    >
                      {selectedProfile.profilePic ? (
                        <Image width={96} height={96}
                          src={selectedProfile.profilePic}
                          alt={selectedProfile.name || "Student"}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedProfile.name || "Student")}`;
                          }}
                        />
                      ) : (
                        <span className="text-white font-black text-2xl sm:text-3xl tracking-wider">
                          {getInitials(selectedProfile.name)}
                        </span>
                      )}
                    </div>

                    {/* Rank Badge Indicator */}
                    <div className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-950 font-black text-xs px-2 py-0.5 rounded-full border-2 border-white shadow-sm flex items-center gap-0.5">
                      <span>#</span>
                      <span>{selectedProfile.podiumRank || selectedProfile.position || selectedProfile.rank || 1}</span>
                    </div>
                  </div>

                  {/* Period Badge */}
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      <Trophy className="w-3 h-3 text-blue-600" />
                      <span>
                        {TABS.find((t) => t.key === activeTab)?.label || "Leaderboard"}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Name & Academic Title */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">
                      {selectedProfile.name || "Student Aspirant"}
                    </h3>
                    {isCurrentUser(selectedProfile.userId || selectedProfile._id || selectedProfile.id) && (
                      <span className="bg-blue-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
                        YOU
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>Jharkhand Polytechnic & Engineering Aspirant</span>
                  </p>
                </div>

                {/* Score & Standing Grid */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-4">
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 text-center">
                    <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">
                      Leaderboard Score
                    </span>
                    <div className="text-lg sm:text-xl font-black text-blue-600 mt-0.5 flex items-center justify-center gap-1">
                      <Award className="w-4 h-4 text-amber-500 inline" />
                      <span>{selectedProfile.points || selectedProfile.score || 0}</span>
                      <span className="text-xs text-slate-400 font-semibold">pts</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 text-center">
                    <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">
                      State Rank Standing
                    </span>
                    <div className="text-lg sm:text-xl font-black text-slate-800 mt-0.5 flex items-center justify-center gap-1">
                      <Target className="w-4 h-4 text-emerald-500 inline" />
                      <span>Rank #{selectedProfile.podiumRank || selectedProfile.position || selectedProfile.rank || 1}</span>
                    </div>
                  </div>
                </div>

                {/* Achievement Badges */}
                <div className="bg-linear-to-br from-slate-50 to-blue-50/40 border border-slate-200/80 rounded-2xl p-3.5 mb-5">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Unlocked Achievements</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {(selectedProfile.podiumRank || selectedProfile.position || selectedProfile.rank || 1) <= 3 && (
                      <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 border border-amber-300 text-[10.5px] font-bold px-2.5 py-1 rounded-lg">
                        🏆 Podium Finisher
                      </span>
                    )}

                    {(selectedProfile.podiumRank || selectedProfile.position || selectedProfile.rank || 1) <= 10 && (
                      <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-800 border border-indigo-200 text-[10.5px] font-bold px-2.5 py-1 rounded-lg">
                        ⭐ Top 10 High-Scorer
                      </span>
                    )}

                    <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10.5px] font-bold px-2.5 py-1 rounded-lg">
                      <Flame className="w-3 h-3 text-emerald-600" />
                      <span>Active Practice Streak</span>
                    </span>

                    <span className="inline-flex items-center gap-1 bg-teal-100 text-teal-800 border border-teal-200 text-[10.5px] font-bold px-2.5 py-1 rounded-lg">
                      <CheckCircle2 className="w-3 h-3 text-teal-600" />
                      <span>CBT Mock Verified</span>
                    </span>
                  </div>
                </div>

                {/* Call To Action Buttons */}
                <div className="space-y-2">
                  <Link href="/exam-preparation" className="block w-full">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer">
                      <span>Practice & Climb Leaderboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>

                  {/* View User Dashboard — disabled: leaderboard rows are public cards only */}
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    title="Viewing another user's full dashboard is not available from the leaderboard."
                    className="w-full bg-slate-50 border border-slate-200 text-slate-400 font-semibold text-xs py-2.5 px-4 rounded-xl cursor-not-allowed flex items-center justify-center gap-2 select-none"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-slate-300" />
                    <span>View User Dashboard</span>
                    <Lock className="w-3 h-3 text-slate-300" />
                  </button>
                </div>

                {/* Privacy Guarantee Footer */}
                <p className="text-[10px] text-slate-400 text-center mt-3 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-slate-400" />
                  <span>Public Academic Profile. Personal contact info is hidden & secure.</span>
                </p>
              </div>
            </div>
          </div>
        )}

      </Container>
    </div>
  );
}
