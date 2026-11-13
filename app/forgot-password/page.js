"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  KeyRound,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Eye,
  EyeOff,
  Clock,
  RotateCw,
  AlertCircle,
  Lock,
  Sparkles,
} from "lucide-react";
import { authFetch } from "../../utils/api";
import { useAuthModal } from "../../context/AuthModalContext";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { openLogin, prefilledEmail } = useAuthModal();

  const [step, setStep] = useState(1); // 1 = Email Input, 2 = OTP + New Password, 3 = Success
  const [email, setEmail] = useState(prefilledEmail || "");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (prefilledEmail && !email) {
      setEmail(prefilledEmail);
    }
  }, [prefilledEmail, email]);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Countdown timer for OTP resend (60s)
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let timerInterval;
    if (resendTimer > 0) {
      timerInterval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [resendTimer]);

  /* ================= CALCULATE PASSWORD STRENGTH ================= */
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: "", color: "bg-gray-200" };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 2) return { score: 1, label: "Weak", color: "bg-red-500" };
    if (score <= 4) return { score: 2, label: "Medium", color: "bg-amber-500" };
    return { score: 3, label: "Strong", color: "bg-emerald-500" };
  };

  const strength = getPasswordStrength(newPassword);

  /* ================= STEP 1: SEND OTP ================= */
  const sendOTP = async (e) => {
    if (e) e.preventDefault();
    if (loading) return;

    setError("");
    setMessage("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      // Call backend endpoint directly
      const res = await authFetch("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to send OTP to email.");
      }

      setMessage(data.message || `An OTP code has been sent to ${email}`);
      setStep(2);
      setResendTimer(60);
    } catch (err) {
      setError(err.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= STEP 2: RESET PASSWORD ================= */
  const handleResetPassword = async (e) => {
    if (e) e.preventDefault();
    if (loading) return;

    setError("");
    setMessage("");

    if (!otp || !otp.trim()) {
      setError("Please enter the OTP code sent to your email.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    setLoading(true);

    try {
      const res = await authFetch("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to reset password. Please check your OTP code.");
      }

      setMessage(data.message || "Password reset successful!");
      setStep(3);
    } catch (err) {
      setError(err.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 via-primary to-indigo-600 p-8 text-white text-center relative">
          <div className="mx-auto w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner mb-3">
            {step === 3 ? (
              <ShieldCheck className="h-7 w-7 text-white" />
            ) : (
              <KeyRound className="h-7 w-7 text-white" />
            )}
          </div>

          <h1 className="text-2xl font-black tracking-tight">
            {step === 1 && "Forgot Password"}
            {step === 2 && "Verify OTP & Reset"}
            {step === 3 && "Password Reset Complete!"}
          </h1>
          <p className="text-xs text-sky-100 font-medium mt-1">
            {step === 1 && "Enter your registered email address to receive an OTP code."}
            {step === 2 && `Enter the verification code sent to ${email}`}
            {step === 3 && "Your password has been reset successfully."}
          </p>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className={`h-2 rounded-full transition-all ${step === 1 ? "w-6 bg-white" : "w-2 bg-white/40"}`} />
            <span className={`h-2 rounded-full transition-all ${step === 2 ? "w-6 bg-white" : "w-2 bg-white/40"}`} />
            <span className={`h-2 rounded-full transition-all ${step === 3 ? "w-6 bg-white" : "w-2 bg-white/40"}`} />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {/* STEP 1 */}
          {step === 1 && (
            <form onSubmit={sendOTP} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-indigo-600 hover:from-primary-dark hover:to-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <RotateCw className="h-4 w-4 animate-spin" />
                    <span>Sending OTP...</span>
                  </>
                ) : (
                  <>
                    <span>Send Verification OTP</span>
                    <Sparkles className="h-4 w-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    openLogin(email);
                    router.push("/");
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-primary transition-colors cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Back to Login</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              {message && (
                <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-sky-800 text-xs font-semibold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary shrink-0" />
                  <span>{message}</span>
                </div>
              )}

              {/* OTP Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Verification Code (OTP)
                  </label>
                  <button
                    type="button"
                    onClick={() => sendOTP()}
                    disabled={resendTimer > 0 || loading}
                    className="text-xs font-bold text-primary hover:underline disabled:text-gray-400 disabled:no-underline cursor-pointer"
                  >
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Clock className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP code"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-center font-mono text-base font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    required
                    className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-primary transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {newPassword && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-bold text-gray-500">
                      <span>Password Strength</span>
                      <span className="uppercase">{strength.label}</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden flex gap-1">
                      <div className={`h-full flex-1 rounded-full transition-all ${strength.score >= 1 ? strength.color : "bg-gray-200"}`} />
                      <div className={`h-full flex-1 rounded-full transition-all ${strength.score >= 2 ? strength.color : "bg-gray-200"}`} />
                      <div className={`h-full flex-1 rounded-full transition-all ${strength.score >= 3 ? strength.color : "bg-gray-200"}`} />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    required
                    className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-primary transition-colors cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <RotateCw className="h-4 w-4 animate-spin" />
                    <span>Resetting Password...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Reset Password</span>
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-primary transition-colors cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Change Email</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="text-center space-y-5 py-4">
              <div className="mx-auto w-16 h-16 bg-emerald-100 border border-emerald-300 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <div className="space-y-1">
                <h2 className="text-lg font-black text-gray-900">Password Reset Successful!</h2>
                <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
                  Your new password has been saved. You can now log into your account using your updated password.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  openLogin(email);
                  router.push("/");
                }}
                className="w-full bg-gradient-to-r from-primary to-indigo-600 hover:from-primary-dark hover:to-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Back to Login</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
