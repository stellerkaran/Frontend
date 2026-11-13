"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiCalendar } from "react-icons/fi";
import {
  ShieldAlert,
  Sparkles,
  Camera,
  Upload,
  Check,
  Edit2,
  X,
  GraduationCap,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useAuthModal } from "../../context/AuthModalContext";
import ExamPickerModal, { getSavedExam, normalizeExamId, EXAM_GROUPS } from "../../components/Auth/ExamPickerModal";
import ProfileActivityCard from "../../components/ProfileActivityCard";
import Image from "next/image";

// Flat list of exams so we can look up the selected one for display.
const EXAM_OPTIONS = EXAM_GROUPS.flatMap((g) => g.exams);

const PRESET_AVATARS = [
  { id: "a1", name: "Student Girl", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250" },
  { id: "a2", name: "Student Boy", url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250" },
  { id: "a3", name: "Scholar Female", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250" },
  { id: "a4", name: "Scholar Male", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250" },
  { id: "a5", name: "Avatar Felix", url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" },
  { id: "a6", name: "Avatar Aneka", url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" },
  { id: "a7", name: "Avatar Zack", url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zack" },
  { id: "a8", name: "Avatar Molly", url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Molly" },
];

export default function StudentDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user: authUser, updateUser } = useAuth();
  const { openLogin } = useAuthModal();

  // Get userId and userName from query parameters
  const viewingUserId = searchParams.get("userId");
  const viewingUserName = searchParams.get("userName");
  const isViewingOtherUser = Boolean(viewingUserId);

  const [student, setStudent] = useState(null);
  const [purchasedIds, setPurchasedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Profile modal states
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [editName, setEditName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [showConfirmClose, setShowConfirmClose] = useState(false);
  const fileInputRef = useRef(null);

  // Academic info (college/branch admission) states
  const [editCollege, setEditCollege] = useState("");
  const [editBranch, setEditBranch] = useState("");
  const [editAdmissionYear, setEditAdmissionYear] = useState("");
  const [editExamCleared, setEditExamCleared] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Selected exam (top board) — the authenticated profile is the source of
  // truth; local storage is only a fallback while the profile is unavailable.
  const [examPickerOpen, setExamPickerOpen] = useState(false);
  const [examId, setExamId] = useState("");
  useEffect(() => {
    setExamId(normalizeExamId(authUser?.exam) || getSavedExam() || "");
  }, [authUser?.exam]);

  const selectedExam = EXAM_OPTIONS.find((e) => e.id === examId) || null;

  const handleExamPickerClose = () => {
    setExamPickerOpen(false);
    // The picker persists the new exam before calling onClose, so prefer that
    // fresh local value over the pre-update auth-user closure.
    setExamId(getSavedExam() || normalizeExamId(authUser?.exam) || "");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // If viewing another user's dashboard, don't redirect
      if (!isViewingOtherUser) {
        const token = localStorage.getItem("token");
        if (!token) {
          // No JWT token found - only for own dashboard.
          // This app has no /login route; the auth modal is the login entry
          // point (same approach as the "futurely:session-expired" handler in
          // context/AuthModalContext.js), so the user stays on the page and
          // gets the login form instead of a 404.
          openLogin();
          return;
        }
      }

      try {
        if (isViewingOtherUser) {
          // Viewing another user's dashboard - use info from query params
          // Reset all editable state to pristine values
          setStudent({
            id: viewingUserId,
            name: decodeURIComponent(viewingUserName || "Student"),
            isPublicProfile: true,
          });
          setEditName(decodeURIComponent(viewingUserName || "Student"));
          setSelectedAvatar(""); // Clear avatar to show default
          setEditCollege(""); // Clear college info
          setEditBranch(""); // Clear branch
          setEditAdmissionYear(""); // Clear admission year
          setEditExamCleared(""); // Clear exam cleared
          setPurchasedIds([]); // Don't show purchased series for other users
        } else {
          // Viewing own dashboard
          const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
          const currentUser = authUser || storedUser;
          setStudent(currentUser);
          setEditName(currentUser?.name || "");
          setSelectedAvatar(currentUser?.avatar || currentUser?.profilePic || currentUser?.avatarUrl || "");
          setEditCollege(currentUser?.collegeName || "");
          setEditBranch(currentUser?.branch || "");
          setEditAdmissionYear(currentUser?.admissionYear ? String(currentUser.admissionYear) : "");
          setEditExamCleared(currentUser?.examCleared || "");

          const purchased = JSON.parse(localStorage.getItem("purchased_series") || "[]");
          setPurchasedIds(purchased);
        }
      } catch (err) {
        console.error("Dashboard metadata parse failed:", err);
      }
      setLoading(false);
    }
  // openLogin comes from context and is stable in practice; adding it would
  // re-run this effect (and re-open the modal) on every provider render.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, authUser, isViewingOtherUser, viewingUserId, viewingUserName]);

  // Hydrate academic info (college/branch/admission year) from the backend —
  // this data may not be present in localStorage/authUser yet on first load,
  // e.g. if it was saved from a different device/session.
  // ONLY for own dashboard, NOT when viewing another user
  useEffect(() => {
    if (isViewingOtherUser) return; // Skip when viewing another user

    const controller = new AbortController();

    async function fetchFullProfile() {
      const token = localStorage.getItem("token");
      const apiBase = process.env.NEXT_PUBLIC_API_URL;
      if (!token || !apiBase) return;

      try {
        const res = await fetch(`${apiBase}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        if (!res.ok) return;

        const profile = await res.json();

        setStudent((prev) => ({ ...(prev || {}), ...profile }));
        setEditCollege(profile.collegeName || "");
        setEditBranch(profile.branch || "");
        setEditAdmissionYear(profile.admissionYear ? String(profile.admissionYear) : "");
        setEditExamCleared(profile.examCleared || "");
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("PROFILE HYDRATE ERROR:", err);
        }
      }
    }

    fetchFullProfile();
    return () => controller.abort();
  }, [isViewingOtherUser]);

  // Keep student state synced when authUser updates
  // ONLY for own dashboard, NOT when viewing another user
  useEffect(() => {
    if (isViewingOtherUser) return; // Skip when viewing another user

    if (authUser) {
      setStudent(authUser);
      setEditName(authUser.name || "");
      setSelectedAvatar(authUser.avatar || authUser.profilePic || authUser.avatarUrl || "");
    }
  }, [authUser, isViewingOtherUser]);

  // Hydrate PUBLIC academic info (college/branch/admission year/exam cleared)
  // when viewing ANOTHER user's profile. This comes from /api/profile/stats,
  // which is already correctly scoped to the target userId — read-only,
  // no editing controls are ever shown for another user's info.
  useEffect(() => {
    if (!isViewingOtherUser || !viewingUserId) return;

    const controller = new AbortController();

    async function fetchPublicAcademicInfo() {
      const token = localStorage.getItem("token");
      const apiBase = process.env.NEXT_PUBLIC_API_URL;
      if (!token || !apiBase) return;

      try {
        const res = await fetch(
          `${apiBase}/api/profile/stats?userId=${encodeURIComponent(viewingUserId)}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            signal: controller.signal,
          }
        );
        if (!res.ok) return;

        const data = await res.json();
        setStudent((prev) => ({
          ...(prev || {}),
          collegeName: data.collegeName || "",
          branch: data.branch || "",
          admissionYear: data.admissionYear || null,
          examCleared: data.examCleared || "",
        }));
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("PUBLIC PROFILE ACADEMIC INFO ERROR:", err);
        }
      }
    }

    fetchPublicAcademicInfo();
    return () => controller.abort();
  }, [isViewingOtherUser, viewingUserId]);

  const handleOpenProfileModal = () => {
    const currentAvatar = student?.avatar || student?.profilePic || student?.avatarUrl || "";
    setSelectedAvatar(currentAvatar);
    setEditName(student?.name || "");
    setEditCollege(student?.collegeName || "");
    setEditBranch(student?.branch || "");
    setEditAdmissionYear(student?.admissionYear ? String(student.admissionYear) : "");
    setEditExamCleared(student?.examCleared || "");
    setSaveMessage("");
    setSaveError("");
    setShowConfirmClose(false);
    setIsProfileModalOpen(true);
  };

  const currentAvatar = student?.avatar || student?.profilePic || student?.avatarUrl || "";
  const currentName = student?.name || "";
  const currentCollege = student?.collegeName || "";
  const currentBranch = student?.branch || "";
  const currentAdmissionYear = student?.admissionYear ? String(student.admissionYear) : "";
  const currentExamCleared = student?.examCleared || "";
  const hasUnsavedChanges =
    (selectedAvatar !== currentAvatar) ||
    (editName.trim() !== currentName) ||
    (editCollege.trim() !== currentCollege) ||
    (editBranch.trim() !== currentBranch) ||
    (editAdmissionYear.trim() !== currentAdmissionYear) ||
    (editExamCleared.trim() !== currentExamCleared);

  // Handle Preset Avatar Selection (Draft mode)
  const handleSelectPresetAvatar = (url) => {
    setSelectedAvatar(url);
    setSaveMessage("Avatar selected! Click 'Save Changes' below to apply.");
  };

  // Handle Custom File Upload (compressing to Canvas for fast performance)
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 250;
        const MAX_HEIGHT = 250;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        setSelectedAvatar(dataUrl);
        setSaveMessage("Photo loaded! Click 'Save Changes' below to confirm.");
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Handle Save Changes
  const handleSaveChanges = async (e) => {
    if (e) e.preventDefault();

    const finalName = editName.trim() || student?.name || "Student";
    const finalAvatar = selectedAvatar || currentAvatar;
    const trimmedYear = editAdmissionYear.trim();

    setSaveError("");
    setSavingProfile(true);

    try {
      const token = localStorage.getItem("token");
      const apiBase = process.env.NEXT_PUBLIC_API_URL;

      let savedUser = null;

      if (token && apiBase) {
        const res = await fetch(`${apiBase}/api/auth/update-profile`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: finalName,
            profilePic: finalAvatar,
            collegeName: editCollege.trim(),
            branch: editBranch.trim(),
            admissionYear: trimmedYear === "" ? "" : Number(trimmedYear),
            examCleared: editExamCleared.trim(),
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setSaveError(data?.message || "Couldn't save changes. Try again.");
          setSavingProfile(false);
          return;
        }

        savedUser = data.user;
      }

      const updated = {
        ...(student || {}),
        name: finalName,
        avatar: finalAvatar,
        profilePic: finalAvatar,
        avatarUrl: finalAvatar,
        collegeName: savedUser?.collegeName ?? editCollege.trim(),
        branch: savedUser?.branch ?? editBranch.trim(),
        admissionYear:
          savedUser?.admissionYear ?? (trimmedYear === "" ? null : Number(trimmedYear)),
        examCleared: savedUser?.examCleared ?? editExamCleared.trim(),
      };

      setStudent(updated);
      if (updateUser) {
        updateUser(updated);
      } else if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(updated));
      }

      setSaveMessage("Profile changes saved successfully!");
      setSavingProfile(false);
      setTimeout(() => {
        setIsProfileModalOpen(false);
        setSaveMessage("");
        setShowConfirmClose(false);
      }, 800);
    } catch (err) {
      console.error("SAVE PROFILE ERROR:", err);
      setSaveError("Network error — check your connection and try again.");
      setSavingProfile(false);
    }
  };

  // Close handlers
  const handleAttemptCloseModal = () => {
    if (hasUnsavedChanges) {
      setShowConfirmClose(true);
    } else {
      setIsProfileModalOpen(false);
      setShowConfirmClose(false);
    }
  };

  const handleDiscardChanges = () => {
    setShowConfirmClose(false);
    setIsProfileModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <span className="text-gray-400 font-bold font-mono">Authenticating Token and Workspace...</span>
      </div>
    );
  }

  // Fallback protection check UI
  if (!student) return null;

  return (
    <div className="bg-slate-50 min-h-screen py-8" id="student-portal-dashboard">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back to Leaderboard Navigation - Only show when viewing other user */}
        {isViewingOtherUser && (
          <div className="mb-4 sm:mb-6">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Leaderboard</span>
            </button>
          </div>
        )}

        {/* Portal top board */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
          <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 w-full sm:w-auto">
            {/* Interactive Avatar with Camera Overlay */}
            <div className="relative group shrink-0">
              <Image width={96} height={96}
                src={
                  student.avatar ||
                  student.profilePic ||
                  student.avatarUrl ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name || "U")}&background=0284c7&color=fff`
                }
                alt={student.name || "User avatar"}
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover border-2 border-sky-200 shadow-sm transition-transform group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {!isViewingOtherUser && (
                <button
                  onClick={handleOpenProfileModal}
                  id="btn-edit-avatar-camera"
                  className="absolute -bottom-1 -right-1 bg-primary hover:bg-primary-dark text-white p-1.5 rounded-full shadow-md transition-all hover:scale-110 focus:outline-none ring-2 ring-white"
                  title="Change Profile Photo"
                >
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {isViewingOtherUser ? (
                  <span className="text-[10px] bg-blue-100 text-blue-700 font-bold uppercase py-0.5 px-2 rounded-full inline-block">
                    Viewing Profile
                  </span>
                ) : (
                  <span className="text-[10px] bg-green-100 text-green-700 font-bold uppercase py-0.5 px-2 rounded-full inline-block">
                    Welcome Back, {student.name ? student.name.split(" ")[0] : "Student"}!
                  </span>
                )}
                {!isViewingOtherUser && (
                  <button
                    onClick={handleOpenProfileModal}
                    id="btn-open-profile-settings"
                    className="text-xs text-primary hover:text-primary-dark font-semibold inline-flex items-center space-x-1 hover:underline"
                  >
                    <Edit2 className="h-3 w-3" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-gray-900 mt-0.5 sm:mt-1 truncate">{student.name}</h2>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400 font-semibold mt-0.5">
                {!isViewingOtherUser && <span className="truncate max-w-[180px] sm:max-w-none">{student.email}</span>}
                {!isViewingOtherUser && <span className="hidden sm:inline">•</span>}
                <span className="flex items-center gap-1">
                  <FiCalendar className="flex-shrink-0" />
                  {isViewingOtherUser ? "Leaderboard Member" : `Joined ${student?.id
                    ? new Date(parseInt(student.id.substring(0, 8), 16) * 1000).toLocaleDateString("en-IN", {
                      month: "long",
                      year: "numeric"
                    })
                    : "—"}`}
                </span>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col justify-around items-center gap-2 shadow-inner bg-slate-50 rounded-xl px-4 py-3 border border-gray-100 text-center w-full sm:w-auto flex-shrink-0">
            <div className="flex-grow">
              {isViewingOtherUser ? (
                <>
                  <span className="text-[10px] text-gray-400 uppercase font-black tracking-wide block">Unlocked Packs</span>
                  <span className="text-xl font-extrabold text-primary block mt-0.5">{purchasedIds.length} Series</span>
                </>
              ) : (
                <>
                  <span className="text-[10px] text-gray-400 uppercase font-black tracking-wide block">Selected Exam</span>
                  <span className="text-xl font-extrabold text-primary block mt-0.5">
                    {selectedExam ? selectedExam.name : "Not chosen"}
                  </span>
                  {selectedExam && (
                    <span className="text-[10px] font-semibold text-gray-500 block mt-0.5">
                      {selectedExam.state}
                    </span>
                  )}
                </>
              )}
            </div>
            {!isViewingOtherUser && (
              <button
                type="button"
                onClick={() => setExamPickerOpen(true)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:text-primary-dark cursor-pointer transition-colors"
              >
                <Edit2 className="h-3 w-3" />
                {selectedExam ? "Change" : "Choose exam"}
              </button>
            )}
          </div>
        </div>

        {/* Dashboard Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">

          {/* Main Column */}
          <div className="lg:col-span-8 space-y-6">

            {/* Activity heatmap, streaks, subject breakdown */}
            <ProfileActivityCard
              userId={viewingUserId || undefined}
              userName={viewingUserName ? decodeURIComponent(viewingUserName) : student?.name || "Student"}
              isPublicProfile={isViewingOtherUser}
            />

          </div>

          {/* User Status / Info bar column */}
          <div className="lg:col-span-4 space-y-6">

            {/* College / Admission Info
                - Own dashboard: always shown (filled state, or empty state with Add/Edit prompt)
                - Another user's profile: shown ONLY if they've filled it in, and always read-only
                  (no edit button, no "add info" prompt — that never applies to a visitor) */}
            {(!isViewingOtherUser || student?.collegeName) && (
              <div className="bg-white rounded-2xl border border-gray-150 p-5 shadow-sm">
                <h3 className="font-bold text-sm text-gray-950 border-b border-gray-100 pb-2 flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Admission Info</span>
                </h3>

                {student?.collegeName ? (
                  <div className="pt-3.5 space-y-1.5">
                    <p className="text-sm font-bold text-gray-900 leading-snug">
                      {student.collegeName}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {student.branch && (
                        <span className="text-[10px] font-bold uppercase tracking-wide bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {student.branch}
                        </span>
                      )}
                      {student.admissionYear && (
                        <span className="text-[10px] font-bold uppercase tracking-wide bg-slate-100 text-gray-600 px-2 py-0.5 rounded-full">
                          Batch {student.admissionYear}
                        </span>
                      )}
                    </div>
                    {student.examCleared && (
                      <p className="text-xs text-gray-500 pt-1">
                        Cleared: <span className="font-semibold text-gray-700">{student.examCleared}</span>
                      </p>
                    )}
                    {!isViewingOtherUser && (
                      <button
                        onClick={handleOpenProfileModal}
                        className="text-xs text-primary hover:text-primary-dark font-semibold inline-flex items-center gap-1 pt-2 hover:underline"
                      >
                        <Edit2 className="h-3 w-3" />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>
                ) : (
                  // Only reachable for the logged-in user's own dashboard —
                  // the outer condition above already hides this for other users.
                  <div className="pt-4 pb-1 text-center">
                    <GraduationCap className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs text-gray-500 leading-relaxed mb-3">
                      Got admitted? Add your college & branch to show it here.
                    </p>
                    <button
                      onClick={handleOpenProfileModal}
                      className="text-xs font-bold text-white bg-primary hover:bg-primary-dark px-4 py-2 rounded-xl transition-colors"
                    >
                      Add College Info
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Profile Settings & Avatar Upload Modal - Only show for own dashboard */}
      {!isViewingOtherUser && isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 text-primary rounded-xl">
                  <Camera className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">
                    Edit Profile & Avatar
                  </h3>
                  <p className="text-xs text-gray-500">
                    Change your profile photo or display name
                  </p>
                </div>
              </div>
              <button
                onClick={handleAttemptCloseModal}
                id="btn-close-profile-modal"
                className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-200/60 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
              {/* Confirm Close Alert (Ask To Save Prompt) */}
              {showConfirmClose && (
                <div className="bg-amber-50 border border-amber-200 text-amber-950 rounded-2xl p-4 space-y-3 animate-fadeIn shadow-sm">
                  <div className="flex items-center space-x-2">
                    <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0" />
                    <span className="font-extrabold text-xs sm:text-sm">Save Unsaved Changes?</span>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    You have unsaved edits on your profile. Would you like to save your new avatar or display name before closing?
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleSaveChanges}
                      className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-4 py-2 rounded-xl shadow transition-all cursor-pointer"
                    >
                      Save & Exit
                    </button>
                    <button
                      type="button"
                      onClick={handleDiscardChanges}
                      className="bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs px-3.5 py-2 rounded-xl border border-red-200 transition-colors cursor-pointer"
                    >
                      Discard Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowConfirmClose(false)}
                      className="text-gray-600 hover:text-gray-900 font-medium text-xs px-2 py-2"
                    >
                      Keep Editing
                    </button>
                  </div>
                </div>
              )}

              {/* Status Notification Alert */}
              {saveMessage && (
                <div className="bg-sky-50 border border-sky-200 text-sky-900 text-xs font-semibold p-3.5 rounded-xl flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 text-primary shrink-0 animate-spin" />
                  <span>{saveMessage}</span>
                </div>
              )}

              {/* Current / Preview Avatar & Custom Upload */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative shrink-0">
                  <Image width={96} height={96}
                    src={
                      selectedAvatar ||
                      currentAvatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(student?.name || "U")}&background=0284c7&color=fff`
                    }
                    alt="Preview profile"
                    className="h-20 w-20 rounded-2xl object-cover ring-4 ring-white shadow-md"
                    referrerPolicy="no-referrer"
                  />
                  {selectedAvatar && selectedAvatar !== currentAvatar && (
                    <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full shadow-sm">
                      New
                    </span>
                  )}
                </div>
                <div className="flex-1 text-center sm:text-left space-y-2">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Upload Photo</h4>
                    <p className="text-xs text-gray-500">
                      Upload any image from your device (JPG, PNG)
                    </p>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    id="btn-upload-custom-photo"
                    className="inline-flex items-center space-x-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold text-xs px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <Upload className="h-4 w-4 text-primary" />
                    <span>Choose Image File...</span>
                  </button>
                </div>
              </div>

              {/* Preset Avatars Selection */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Or Choose from Preset Avatars
                </h4>
                <div className="grid grid-cols-4 sm:grid-cols-4 gap-3">
                  {PRESET_AVATARS.map((preset) => {
                    const isSelected = selectedAvatar === preset.url;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPresetAvatar(preset.url)}
                        className={`relative rounded-xl overflow-hidden border-2 p-1 transition-all group focus:outline-none cursor-pointer ${
                          isSelected
                            ? "border-primary ring-2 ring-primary/30 scale-105 bg-sky-50 shadow-sm"
                            : "border-gray-200 hover:border-sky-300 hover:scale-102 bg-white"
                        }`}
                        title={preset.name}
                      >
                        <Image width={96} height={96}
                          src={preset.url}
                          alt={preset.name}
                          className="h-14 w-14 w-full object-cover rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center rounded-lg">
                            <div className="bg-primary text-white p-1 rounded-full shadow">
                              <Check className="h-3.5 w-3.5" />
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Display Name Edit Input */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Display Name
                </h4>
                <div>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Enter your display name"
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                    required
                  />
                </div>
              </div>

              {/* Academic / Admission Info */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <div>
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5 text-primary" />
                    Academic Info (optional)
                  </h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    Add this once you're admitted — it'll show on your progress card.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-semibold text-gray-500 block mb-1">
                      College Name
                    </label>
                    <input
                      type="text"
                      value={editCollege}
                      onChange={(e) => setEditCollege(e.target.value)}
                      placeholder="e.g. GEC Chaibasa"
                      maxLength={150}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-gray-500 block mb-1">
                      Branch
                    </label>
                    <input
                      type="text"
                      value={editBranch}
                      onChange={(e) => setEditBranch(e.target.value)}
                      placeholder="e.g. Mechanical Engineering"
                      maxLength={100}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-gray-500 block mb-1">
                      Admission Year
                    </label>
                    <input
                      type="number"
                      value={editAdmissionYear}
                      onChange={(e) => setEditAdmissionYear(e.target.value)}
                      placeholder="e.g. 2026"
                      min={2000}
                      max={new Date().getFullYear() + 1}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-gray-500 block mb-1">
                      Exam Cleared
                    </label>
                    <input
                      type="text"
                      value={editExamCleared}
                      onChange={(e) => setEditExamCleared(e.target.value)}
                      placeholder="e.g. JCECEB D2D 2026"
                      maxLength={100}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                    />
                  </div>
                </div>

                {saveError && (
                  <p className="text-xs text-red-600 font-semibold">{saveError}</p>
                )}
              </div>
            </div>

            {/* Modal Footer with Explicit Save Changes Action */}
            <div className="p-4 border-t border-gray-100 bg-slate-50/80 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleAttemptCloseModal}
                className="px-4 py-2.5 text-xs font-semibold text-gray-600 hover:text-gray-900 border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveChanges}
                disabled={savingProfile}
                id="btn-save-profile-changes"
                className={`inline-flex items-center space-x-1.5 font-extrabold text-xs px-6 py-2.5 rounded-xl shadow transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
                  hasUnsavedChanges
                    ? "bg-primary hover:bg-primary-dark text-white ring-2 ring-primary/40 scale-102"
                    : "bg-primary hover:bg-primary-dark text-white opacity-90"
                }`}
              >
                <Check className="h-4 w-4" />
                <span>{savingProfile ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change selected exam (user stays on the dashboard — no redirect) */}
      <ExamPickerModal
        show={examPickerOpen}
        onClose={handleExamPickerClose}
        redirectOnContinue={false}
      />
    </div>
  );
}