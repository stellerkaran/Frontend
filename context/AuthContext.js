"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authFetch, setAuthToken } from "../utils/api";

// ── Storage helpers that never throw ───────────────────────────────────────
// Safari Private Browsing, "Block all cookies" settings, in-app webviews
// (Instagram / Facebook / WhatsApp) and full-quota devices make
// localStorage.setItem throw. Authentication must keep working in those
// environments: a storage failure simply means the session lives in memory.
const safeStorageGet = (key) => {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeStorageSet = (key, value) => {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
};

const safeStorageRemove = (key) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // storage unavailable — nothing to remove
  }
};

const AuthContext = createContext({
  user: null,
  token: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  loading: true,
  needsExam: false,
});

// Older deployed backend builds return auth payloads that omit the `exam`
// field entirely (the key is missing, not empty). Such a session looks like
// "no exam chosen", so the required picker popped up again on every visit
// even though the account had already picked one. When the response says
// nothing about the exam, reuse the locally saved choice — but ONLY when it
// belongs to this same account, so another login on the same browser still
// gets prompted. Once the current backend (which always returns `exam`) is
// deployed, this helper is a no-op because `"exam" in user` is then true.
const withKnownExam = (userObj) => {
  if (!userObj || typeof userObj !== "object" || "exam" in userObj || !userObj.id) {
    return userObj;
  }
  const savedExam = safeStorageGet("futurely_exam");
  const savedOwner = safeStorageGet("futurely_exam_owner");
  if (savedExam && savedOwner && savedOwner === String(userObj.id)) {
    return { ...userObj, exam: savedExam };
  }
  return userObj;
};

// Helper to safely stringify objects avoiding circular reference errors
const safeStringify = (obj) => {
  try {
    const seen = new WeakSet();
    return JSON.stringify(obj, (key, value) => {
      // Ignore React fiber nodes or DOM nodes
      if (key.startsWith && (key.startsWith("__react") || key.startsWith("$_"))) {
        return undefined;
      }
      if (typeof value === "object" && value !== null) {
        if (value instanceof Node || value instanceof Element) {
          return undefined;
        }
        if (seen.has(value)) {
          return undefined;
        }
        seen.add(value);
      }
      return value;
    });
  } catch (err) {
    console.error("Failed to stringify user object safely:", err);
    return null;
  }
};

// ── Decode a JWT's payload WITHOUT verifying its signature, purely to read
// the `exp` claim client-side. This is only a cheap, local sanity check —
// it lets us avoid rendering "logged in" UI for a token we already know has
// expired. The backend (authMiddleware) still does the real, trusted
// verification on every request; this is not a security boundary.
// NOTE: tokens that are NOT 3-part JWTs (opaque tokens) can't be checked
// locally, so they are left alone — the server decides validity and a 401
// clears the session through utils/api.js. Treating them as "expired" used
// to wipe perfectly valid sessions on every page reload. ──────────────────
const isTokenExpired = (token) => {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false; // opaque/legacy token — let the server decide
  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const payload = JSON.parse(atob(padded));
    if (!payload || typeof payload.exp !== "number") return false; // no exp claim → don't assume expired
    return Date.now() >= payload.exp * 1000;
  } catch {
    // Unreadable payload — don't destroy the session over it; a 401 from the
    // backend will clear it via handleSessionExpired() in utils/api.js.
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoaded, setProfileLoaded] = useState(false);

  // 🔁 Restore the local session immediately, then refresh the profile in the
  // background. needsExam remains false until that refresh settles so a stale
  // cached user cannot trigger the required picker for a user who already chose.
  useEffect(() => {
    let cancelled = false;

    const clearSession = () => {
      safeStorageRemove("token");
      safeStorageRemove("user");
      setAuthToken(null);
      if (!cancelled) {
        setToken(null);
        setUser(null);
      }
    };

    const restoreSession = async () => {
      const savedToken = safeStorageGet("token");
      const savedUser = safeStorageGet("user");

      if (!(savedToken && savedUser && !isTokenExpired(savedToken))) {
        if (savedToken || savedUser) {
          safeStorageRemove("token");
          safeStorageRemove("user");
          setAuthToken(null);
        }
        setProfileLoaded(true);
        if (!cancelled) setLoading(false);
        return;
      }

      setToken(savedToken);
      setAuthToken(savedToken); // memory fallback so storage is optional

      let restoredUser = null;
      try {
        restoredUser = JSON.parse(savedUser);
      } catch {
        restoredUser = null;
      }

      if (!restoredUser || typeof restoredUser !== "object" || Array.isArray(restoredUser)) {
        clearSession();
        setProfileLoaded(true);
        if (!cancelled) setLoading(false);
        return;
      }

      setUser(restoredUser);
      setProfileLoaded(false);
      if (!cancelled) setLoading(false);

      try {
        const res = await authFetch("/auth/profile");
        const profile = await res.json().catch(() => ({}));

        if (res.ok) {
          let refreshedUser = {
            ...restoredUser,
            ...profile,
            id: profile.id || restoredUser.id,
          };
          // A profile payload without an `exam` key (older backend build) must
          // not erase a known choice — keep the account's saved exam.
          if (!("exam" in profile)) {
            refreshedUser = withKnownExam(refreshedUser);
          }
          const jsonStr = safeStringify(refreshedUser);
          if (jsonStr) safeStorageSet("user", jsonStr);
          if (!cancelled) setUser(refreshedUser);
        } else if (res.status === 401) {
          clearSession();
        }
      } catch (err) {
        // Keep the cached session when a temporary network failure prevents the
        // profile refresh. Protected API calls will still validate the token.
        console.warn("Could not refresh the authenticated profile:", err);
      } finally {
        if (!cancelled) setProfileLoaded(true);
      }
    };

    restoreSession();
    return () => {
      cancelled = true;
    };
  }, []);

  // Keep the lightweight local exam preference synchronized with the server
  // profile, including after login and profile refreshes. The owner key lets
  // withKnownExam() reuse the choice safely for this same account only.
  useEffect(() => {
    if (user?.exam) {
      safeStorageSet("futurely_exam", user.exam);
      if (user?.id) safeStorageSet("futurely_exam_owner", String(user.id));
    }
  }, [user?.exam, user?.id]);

  // utils/api.js broadcasts this after a 401. Clear the in-memory context too;
  // storage cleanup alone would otherwise leave protected UI logged in.
  useEffect(() => {
    const onSessionExpired = () => {
      setProfileLoaded(true);
      setAuthToken(null);
      setToken(null);
      setUser(null);
    };
    window.addEventListener("futurely:session-expired", onSessionExpired);
    return () => window.removeEventListener("futurely:session-expired", onSessionExpired);
  }, []);

  // ✅ Login — never throws, even when storage is unavailable
  const login = (token, user) => {
    // Some deployed backend responses omit `exam` — recover the account's own
    // saved choice so needsExam (and the forced picker) stays correct.
    const nextUser = withKnownExam(user);
    if (token) {
      safeStorageSet("token", token);
      setAuthToken(token); // memory fallback so the session works without storage
    }
    if (nextUser) {
      const jsonStr = safeStringify(nextUser);
      if (jsonStr) {
        safeStorageSet("user", jsonStr);
      }
    }

    setProfileLoaded(true);
    setToken(token);
    setUser(nextUser);
  };

  // ✏️ Update User profile / avatar
  const updateUser = (updatedFields) => {
    setUser((prev) => {
      const updatedUser = { ...(prev || {}), ...updatedFields };
      const jsonStr = safeStringify(updatedUser);
      if (jsonStr) {
        safeStorageSet("user", jsonStr);
      }
      return updatedUser;
    });
  };

  // 🚪 Logout
  const logout = () => {
    if (typeof window !== "undefined") {
      try {
        // Wipe the session, but keep the account-tied exam preference: the
        // same user logging back in on this device should not be forced to
        // choose again (withKnownExam only reuses it when the owner matches,
        // so a different account still gets the picker).
        const savedExam = window.localStorage.getItem("futurely_exam");
        const savedExamOwner = window.localStorage.getItem("futurely_exam_owner");
        window.localStorage.clear();
        if (savedExam) window.localStorage.setItem("futurely_exam", savedExam);
        if (savedExamOwner) window.localStorage.setItem("futurely_exam_owner", savedExamOwner);
      } catch {
        // storage unavailable — nothing to clear
      }
    }
    setAuthToken(null);
    setProfileLoaded(true);
    setToken(null);
    setUser(null);
  };

  const needsExam = Boolean(token && user && profileLoaded && !user.exam);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: !!token,
        login,
        logout,
        updateUser,
        loading,
        needsExam,
      }}
    >
      {/* Children are always rendered — including during server rendering.
          `loading` is only ever cleared inside an effect (session restore), so
          gating the whole tree on it produced an EMPTY <body> in the SSR HTML
          for every route: crawlers and link previews saw a blank page and the
          JSON-LD authored by the server components never reached the document.
          Auth-dependent chrome must therefore read `loading` from this context
          and render its own placeholder until the session is restored (see
          components/Navbar.js) instead of hiding the entire app. */}
      {children}
    </AuthContext.Provider>
  );
};

// 🔥 Custom hook
export const useAuth = () => useContext(AuthContext);

export default AuthContext;