"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Home,
  GraduationCap,
  BookOpen,
  School,
  Trophy,
  LogOut,
  User,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useAuthModal } from "../context/AuthModalContext";
import { BIHAR_EXAM_HOME, BIHAR_RESOURCES_HOME, getSavedExam, isBiharExam, normalizeExamId } from "../utils/examData";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname() || "";
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, user, logout, loading } = useAuth();
  const { openLogin } = useAuthModal();

  // Bihar aspirants have a dedicated preparation page — send them straight
  // there instead of the combined listing (which would bounce them anyway).
  const [examHomePath, setExamHomePath] = useState("/exam-preparation");
  // Bihar users also have a dedicated resources hub — send them straight there
  // (the /resources listing would bounce them anyway).
  const [resourcesHomePath, setResourcesHomePath] = useState("/resources");

  useEffect(() => {
    const activeExam = normalizeExamId(user?.exam) || getSavedExam();
    const isBihar = isBiharExam(activeExam);
    setExamHomePath(isBihar ? BIHAR_EXAM_HOME : "/exam-preparation");
    setResourcesHomePath(isBihar ? BIHAR_RESOURCES_HOME : "/resources");
  }, [user?.exam]);

  // "Exam Preparation" stays highlighted inside the Bihar exam arena too.
  const isExamNavActive =
    pathname.startsWith("/exam-preparation") || pathname.startsWith(BIHAR_EXAM_HOME);

  const handleLogout = () => {
    logout();
    router.push(examHomePath);
  };

  const handleLeaderboardClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      openLogin();
    }
  };

  const userAvatar =
    user?.avatar ||
    user?.avatarUrl ||
    user?.image ||
    user?.profilePic ||
    user?.profileImage;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-[210] shadow-sm" id="main-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 text-2xl font-bold text-primary group" id="nav-brand">
              <Image width={48} height={48}
                src="/logo.png"
                alt="Futurely Logo"
                className="h-11 w-11 object-contain rounded-lg group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <span className="text-primary font-extrabold">Futurely</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              href="/"
              id="nav-link-home"
              className={`text-sm font-medium transition-colors ${
                pathname === "/" ? "text-primary border-b-2 border-primary py-1 font-semibold" : "text-gray-600 hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              href={examHomePath}
              id="nav-link-exams"
              className={`text-sm font-medium transition-colors ${
                isExamNavActive ? "text-primary border-b-2 border-primary py-1 font-semibold" : "text-gray-600 hover:text-primary"
              }`}
            >
              Exam Preparation
            </Link>
            <Link
              href={resourcesHomePath}
              id="nav-link-resources"
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith("/resources") ? "text-primary border-b-2 border-primary py-1 font-semibold" : "text-gray-600 hover:text-primary"
              }`}
            >
              Resources
            </Link>
            <Link
              href="/colleges"
              id="nav-link-colleges"
              className={`text-sm font-medium transition-colors ${
                pathname === "/colleges" ? "text-primary border-b-2 border-primary py-1 font-semibold" : "text-gray-600 hover:text-primary"
              }`}
            >
              Colleges
            </Link>
            <Link
              href="/leaderboard"
              id="nav-link-leaderboard"
              className={`text-sm font-medium transition-colors ${
                pathname === "/leaderboard" ? "text-primary border-b-2 border-primary py-1 font-semibold" : "text-gray-600 hover:text-primary"
              }`}
              onClick={handleLeaderboardClick}
            >
              Leaderboard
            </Link>

            {loading ? (
              // The session is restored in an effect, so it is unknown while the
              // server renders (and during the hydration render). A same-size
              // placeholder keeps the markup identical on both sides — no
              // hydration mismatch, and a signed-in user never sees "Login".
              <div
                id="nav-auth-skeleton"
                className="h-9 w-32 rounded-lg bg-slate-200/80 animate-pulse"
                aria-hidden="true"
              />
            ) : isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  id="nav-link-dashboard"
                  className="bg-primary/10 hover:bg-primary/20 text-primary font-semibold px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2"
                >
                  {userAvatar ? (
                    <Image width={96} height={96}
                      src={userAvatar}
                      alt={user?.name || "User"}
                      className="h-6 w-6 rounded-full object-cover ring-1 ring-primary/30"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span>Hi, {user?.name?.split(" ")[0] || "User"}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  id="btn-logout"
                  className="text-gray-600 hover:text-red-600 transition-colors p-1 rounded-md"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={openLogin}
                id="nav-link-login"
                className="bg-primary text-white hover:bg-primary-dark font-semibold px-5 py-2 rounded-lg text-sm shadow transition-all duration-200"
              >
                Login / Register
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="btn-mobile-menu"
              className="text-gray-600 hover:text-primary focus:outline-none p-1 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Side Navigation Drawer */}
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[205] transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Side Drawer (Left aligned) */}
      <div
        id="mobile-menu"
        className={`fixed top-0 left-0 z-[210] h-full w-72 max-w-[80vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 overflow-y-auto flex-1">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2 text-xl font-bold text-primary"
            >
              <Image width={48} height={48}
                src="/logo.png"
                alt="Futurely Logo"
                className="h-9 w-9 object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
              <span className="text-primary font-extrabold">Futurely</span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              id="btn-close-mobile-menu"
              className="text-gray-500 hover:text-gray-700 p-1.5 rounded-lg focus:outline-none hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Nav Links */}
          <div className="space-y-1">
            <Link
              href="/"
              id="mobile-nav-link-home"
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                pathname === "/" ? "bg-primary/10 text-primary font-semibold" : "text-gray-700 hover:bg-sky-50 hover:text-primary"
              }`}
            >
              <Home className="h-5 w-5 shrink-0" />
              <span>Home</span>
            </Link>
            <Link
              href={examHomePath}
              id="mobile-nav-link-exams"
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                isExamNavActive ? "bg-primary/10 text-primary font-semibold" : "text-gray-700 hover:bg-sky-50 hover:text-primary"
              }`}
            >
              <GraduationCap className="h-5 w-5 shrink-0" />
              <span>Exam Preparation</span>
            </Link>
            <Link
              href={resourcesHomePath}
              id="mobile-nav-link-resources"
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                pathname.startsWith("/resources") ? "bg-primary/10 text-primary font-semibold" : "text-gray-700 hover:bg-sky-50 hover:text-primary"
              }`}
            >
              <BookOpen className="h-5 w-5 shrink-0" />
              <span>Resources</span>
            </Link>
            <Link
              href="/colleges"
              id="mobile-nav-link-colleges"
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                pathname === "/colleges" ? "bg-primary/10 text-primary font-semibold" : "text-gray-700 hover:bg-sky-50 hover:text-primary"
              }`}
            >
              <School className="h-5 w-5 shrink-0" />
              <span>Colleges</span>
            </Link>
            <Link
              href="/leaderboard"
              id="mobile-nav-link-leaderboard"
              onClick={(e) => {
                if (!isLoggedIn) {
                  e.preventDefault();
                  openLogin();
                  return;
                }
                setIsOpen(false);
              }}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                pathname === "/leaderboard" ? "bg-primary/10 text-primary font-semibold" : "text-gray-700 hover:bg-sky-50 hover:text-primary"
              }`}
            >
              <Trophy className="h-5 w-5 shrink-0" />
              <span>Leaderboard</span>
            </Link>
          </div>
        </div>

        {/* Drawer Footer / User Profile Card & Auth */}
        <div className="p-3 border-t border-gray-100 bg-sky-50/60">
          {loading ? (
            <div
              id="mobile-nav-auth-skeleton"
              className="h-10 w-full rounded-lg bg-white/80 border border-sky-100 animate-pulse"
              aria-hidden="true"
            />
          ) : isLoggedIn ? (
            <div className="space-y-2">
              <Link
                href="/dashboard"
                id="mobile-nav-link-profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-2.5 bg-white rounded-xl shadow-sm border border-sky-100 hover:border-sky-300 hover:bg-sky-50/80 transition-all group"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  {userAvatar ? (
                    <Image width={96} height={96}
                      src={userAvatar}
                      alt={user?.name || "User"}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-sky-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 ring-2 ring-sky-200 text-sm">
                      {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-gray-900 truncate leading-snug">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-sky-600 truncate font-medium">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-sky-500 shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                id="mobile-btn-logout"
                className="w-full flex items-center justify-center space-x-2 text-gray-600 hover:text-red-600 hover:bg-red-50 font-medium py-2 rounded-lg text-xs border border-gray-200 transition-colors bg-white shadow-2xs"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsOpen(false);
                openLogin();
              }}
              id="mobile-nav-link-login"
              className="w-full block text-center bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2.5 rounded-lg text-sm shadow transition-colors"
            >
              Login / Register
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
