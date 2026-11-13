"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Modal, Form } from "react-bootstrap";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";
import { authFetch } from "../../utils/api";
import "./AuthModal.css";
import Image from "next/image";

// Helper to safely parse Google ID token JWT payload
const parseGoogleJwt = (credential) => {
  try {
    const base64Url = credential.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

export default function AuthModal({ show, onClose, onForgotPassword, initialEmail = "" }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();

  // Reset or prefill state whenever modal show state changes
  useEffect(() => {
    if (show) {
      if (initialEmail && !email) {
        setEmail(initialEmail);
      }
    } else {
      setError("");
      setLoading(false);
    }
  }, [show, initialEmail, email]);

  // Persist the session without ever letting a storage problem block the
  // login flow. On browsers where localStorage throws (private mode, blocked
  // storage, in-app webviews) AuthContext keeps the session in memory, so the
  // user is still logged in for this page and the modal must close normally.
  const persistSession = (token, userObj) => {
    try {
      login(token, userObj);
    } catch (err) {
      console.warn("Session could not be persisted to storage:", err);
    }
  };

  // The global modal provider opens the required exam picker when this login
  // completes. Keeping ownership outside AuthModal also covers restored sessions.
  const finishAuth = () => {
    onClose();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isRegister ? "/auth/register" : "/auth/login";
    const payload = isRegister ? { name, email, password } : { email, password };

    try {
      const res = await authFetch(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        const token = data.token || data.accessToken || data.jwt || data.data?.token || data.result?.token;
        const userObj = data.user || data.data?.user || data.result?.user || {
          name: name || (email ? email.split("@")[0] : "Student"),
          email: email || "",
        };

        if (token) {
          persistSession(token, userObj);
          setEmail("");
          setPassword("");
          setName("");
          finishAuth();
          return;
        } else {
          setError("Login succeeded but no session was returned. Please try again.");
        }
      } else {
        const errMsg = data.message || data.error || data.details || "Login failed. Please try again.";
        setError(errMsg);
      }
    } catch (err) {
      console.warn("Auth request error:", err);
      setError("Unable to reach the server. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (response) => {
    if (!response?.credential) {
      setError("Google sign-in was cancelled.");
      return;
    }

    setError("");
    setLoading(true);

    const googlePayload = parseGoogleJwt(response.credential);
    const googleUser = {
      name: googlePayload?.name || "Google Student",
      email: googlePayload?.email || "",
      profilePic: googlePayload?.picture || "",
    };

    try {
      const res = await authFetch("/auth/google", {
        method: "POST",
        body: JSON.stringify({ token: response.credential }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        const token = data.token || data.accessToken || data.data?.token;
        const user = data.user || data.data?.user || googleUser;
        if (token) {
          persistSession(token, user);
          finishAuth();
        } else {
          setError("Google sign-in failed. Please try again.");
        }
      } else {
        setError(data.message || data.error || "Google sign-in failed. Please try again.");
      }
    } catch (err) {
      console.warn("Backend Google auth error:", err);
      setError("Unable to reach the server. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotClick = () => {
    onForgotPassword(email);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        centered
        backdrop="static"
        size="lg"
        dialogClassName="auth-modal-dialog"
        contentClassName="auth-modal-content"
        scrollable
      >
        <Modal.Body className="p-0 overflow-hidden position-relative">
          <button onClick={onClose} className="auth-close-btn" aria-label="Close">×</button>
          <div className="auth-layout">

            {/* Sidebar */}
            <div className="auth-sidebar">
              <div className="auth-sidebar-inner">
                <div className="auth-sidebar-logo">
                  <Image src="/logo.png" alt="Futurely" width="68" height="68" />
                </div>
                <h2 className="auth-sidebar-title">Welcome to Futurely</h2>
                <p className="auth-sidebar-sub">Prepare smarter. Track progress.<br />Crack exams with confidence.</p>
                <div className="auth-sidebar-features">
                  {[
                    { icon: "📚", text: "10,000+ practice questions" },
                    { icon: "📊", text: "Live performance analytics" },
                    { icon: "🏆", text: "Compete on leaderboards" },
                  ].map((f, i) => (
                    <div className="auth-feature-item" key={i}>
                      <span className="auth-feature-icon">{f.icon}</span>
                      <span>{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form panel */}
            <div className="auth-form-panel">
              <div className="auth-mobile-brand">
                <Image src="/logo.png" alt="Futurely" width="30" height="30" />
                <span>Futurely</span>
              </div>
              <div className="auth-form-header">
                <h3 className="auth-form-title">{isRegister ? "Create your account" : "Welcome back"}</h3>
                <p className="auth-form-subtitle">
                  {isRegister ? "Join thousands of students preparing smarter." : "Log in to continue your preparation journey."}
                </p>
              </div>

              <div className="auth-tabs">
                <button type="button" className={`auth-tab ${!isRegister ? "auth-tab--active" : ""}`}
                  onClick={() => { setIsRegister(false); setError(""); }}>Log in</button>
                <button type="button" className={`auth-tab ${isRegister ? "auth-tab--active" : ""}`}
                  onClick={() => { setIsRegister(true); setError(""); }}>Sign up</button>
              </div>

              <div className="auth-google-wrap" style={{ marginBottom: "10px" }}>
                {show && (
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => setError("Google login failed")}
                  />
                )}
              </div>

              <div className="auth-divider">
                <span>or continue with email</span>
              </div>

              <Form onSubmit={handleSubmit} className="auth-form">
                {isRegister && (
                  <Form.Group className="auth-field">
                    <Form.Label className="auth-label">Full name</Form.Label>
                    <Form.Control type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required className="auth-input" />
                  </Form.Group>
                )}
                <Form.Group className="auth-field">
                  <Form.Label className="auth-label">Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="auth-input" />
                </Form.Group>
                <Form.Group className="auth-field">
                  <div className="auth-label-row">
                    <Form.Label className="auth-label mb-0">Password</Form.Label>
                    {!isRegister && (
                      <button type="button" className="auth-forgot" onClick={handleForgotClick}>
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="auth-password-wrap">
                    <Form.Control type={showPassword ? "text" : "password"} placeholder="••••••••" value={password}
                      onChange={(e) => setPassword(e.target.value)} required className="auth-input auth-input--password" />
                    <button type="button" className="auth-eye-btn" onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}>
                      {showPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </Form.Group>

                {error && (
                  <div className="auth-error">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {error}
                  </div>
                )}

                <Button type="submit" className="auth-submit-btn" disabled={loading}>
                  {loading ? (
                    <span className="auth-spinner">
                      <span className="auth-spinner-dot"></span>
                      <span className="auth-spinner-dot"></span>
                      <span className="auth-spinner-dot"></span>
                    </span>
                  ) : (isRegister ? "Create account" : "Continue")}
                </Button>

                <p className="auth-legal">
                  By continuing, you agree to Futurely's{" "}
                  <Link href="/terms-and-conditions" className="auth-legal-link" onClick={onClose}>Terms</Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" className="auth-legal-link" onClick={onClose}>Privacy Policy</Link>.
                </p>
              </Form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}