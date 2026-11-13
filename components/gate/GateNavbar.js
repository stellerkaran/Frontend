"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Home,
  GraduationCap,
  BookOpen,
  FileText,
  School,
  LogOut,
  User,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useAuthModal } from "../../context/AuthModalContext";
import Image from "next/image";

export default function GateNavbar() {
  const pathname = usePathname() || "";
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const { openLogin } = useAuthModal();

  const handleLogout = () => {
    logout();
    router.push("/gate");
  };

  const userAvatar =
    user?.avatar ||
    user?.avatarUrl ||
    user?.image ||
    user?.profilePic ||
    user?.profileImage;

  const navLinks = [
    { label: "Home", href: "/gate", exact: true, icon: Home },
    { label: "Exam Preparation", href: "/gate/exam-preparation", icon: GraduationCap },
    { label: "Resources", href: "/gate/resources", icon: BookOpen },
    { label: "Colleges & PSUs", href: "/gate/resources", icon: School },
  ];

  const isActive = (link) => {
    if (link.exact) return pathname === link.href;
    return pathname.startsWith(link.href);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm" id="gate-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Brand / Logo matching Diploma Navbar */}
          <div className="flex items-center">
            <Link
              href="/gate"
              className="flex items-center space-x-3 text-2xl font-bold text-primary group"
              id="gate-nav-brand"
            >
              <Image width={48} height={48}
                src="/logo.png"
                alt="Futurely Logo"
                className="h-11 w-11 object-contain rounded-lg group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <div className="flex items-center space-x-1.5">
                <span className="text-primary font-extrabold">Futurely</span>
                <span className="bg-primary text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-2xs">
                  GATE
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => {
              const active = isActive(link);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  id={`gate-nav-link-${link.label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                  className={`text-sm font-medium transition-colors ${
                    active
                      ? "text-primary border-b-2 border-primary py-1 font-semibold"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Auth Buttons */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  id="gate-nav-link-dashboard"
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
                  id="gate-btn-logout"
                  className="text-gray-600 hover:text-red-600 transition-colors p-1 rounded-md"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={openLogin}
                id="gate-nav-link-login"
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
              id="gate-btn-mobile-menu"
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
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Side Drawer (Left aligned matching Diploma / BTech) */}
      <div
        id="gate-mobile-menu"
        className={`fixed top-0 left-0 z-50 h-full w-72 max-w-[80vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 overflow-y-auto flex-1">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
            <Link
              href="/gate"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2 text-xl font-bold text-primary"
            >
              <Image width={48} height={48}
                src="/logo.png"
                alt="Futurely Logo"
                className="h-9 w-9 object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
              <div className="flex items-center space-x-1.5">
                <span className="text-primary font-extrabold">Futurely</span>
                <span className="bg-primary text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded">
                  GATE
                </span>
              </div>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              id="gate-btn-close-mobile-menu"
              className="text-gray-500 hover:text-gray-700 p-1.5 rounded-lg focus:outline-none hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Nav Links */}
          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  id={`gate-mobile-nav-link-${link.label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    active
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-gray-700 hover:bg-sky-50 hover:text-primary"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Drawer Footer / User Profile Card & Auth */}
        <div className="p-3 border-t border-gray-100 bg-sky-50/60">
          {isLoggedIn ? (
            <div className="space-y-2">
              <Link
                href="/dashboard"
                id="gate-mobile-nav-link-profile"
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
                id="gate-mobile-btn-logout"
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
              id="gate-mobile-nav-link-login"
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
