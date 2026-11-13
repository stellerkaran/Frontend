"use client";

import { createContext, useContext, useEffect, useState } from "react";
import AuthModal from "../components/Auth/AuthModal";
import ForgotPasswordModal from "../components/Auth/ForgotPasswordModal";
import ExamPickerModal from "../components/Auth/ExamPickerModal";
import { useAuth } from "./AuthContext";

const AuthModalContext = createContext({
  openLogin: (email) => {},
  openForgot: (email) => {},
  closeAuth: () => {},
  prefilledEmail: "",
});

/**
 * Wrap the app once (in app/layout.js) with this provider. It owns the
 * login/forgot-password popup state and renders both modals a single time,
 * so any component anywhere in the tree can pop the login modal via
 * useAuthModal() — e.g. BuyModal's "Login to Start" button, or a protected
 * nav item — without needing its own local copy of this state.
 */
export const AuthModalProvider = ({ children }) => {
  // 'closed' | 'login' | 'forgot'
  const [authView, setAuthView] = useState("closed");
  const [prefilledEmail, setPrefilledEmail] = useState("");
  const [showExamPicker, setShowExamPicker] = useState(false);
  const { needsExam } = useAuth();

  const openLogin = (email = "") => {
    if (typeof email === "string" && email) {
      setPrefilledEmail(email);
    }
    setAuthView("login");
  };

  const openForgot = (email = "") => {
    if (typeof email === "string" && email) {
      setPrefilledEmail(email);
    }
    setAuthView("forgot");
  };

  const closeAuth = () => {
    setAuthView("closed");
  };

  // A newly authenticated user and a returning user follow the same required
  // step. The picker has no dismiss action while needsExam is true.
  useEffect(() => {
    if (needsExam && authView === "closed") {
      setShowExamPicker(true);
    } else if (!needsExam) {
      setShowExamPicker(false);
    }
  }, [needsExam, authView]);

  // utils/api.js broadcasts this when the backend rejects a token. Instead of
  // hard-navigating to a /login page (which doesn't exist in this app), we
  // simply open the login modal on top of whatever page the user is on.
  useEffect(() => {
    const onSessionExpired = () => {
      setShowExamPicker(false);
      setAuthView("login");
    };
    window.addEventListener("futurely:session-expired", onSessionExpired);
    return () => window.removeEventListener("futurely:session-expired", onSessionExpired);
  }, []);

  return (
    <AuthModalContext.Provider value={{ openLogin, openForgot, closeAuth, prefilledEmail }}>
      {children}

      <AuthModal
        show={authView === "login"}
        onClose={closeAuth}
        onForgotPassword={(email) => openForgot(email)}
        initialEmail={prefilledEmail}
      />
      <ForgotPasswordModal
        show={authView === "forgot"}
        onClose={closeAuth}
        onBackToLogin={(email) => openLogin(email)}
        initialEmail={prefilledEmail}
      />
      <ExamPickerModal
        show={showExamPicker}
        onClose={() => setShowExamPicker(false)}
        required
      />
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => useContext(AuthModalContext);

export default AuthModalContext;