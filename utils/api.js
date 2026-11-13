import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://futurely-backend.onrender.com";
const API_BASE = `${API_BASE_URL}/api`;

// ── In-memory auth token bridge ────────────────────────────────────────────
// localStorage is not always writable (Safari Private Browsing, "Block all
// cookies", some in-app webviews, full quota). The token is therefore also
// held in a module-level variable so the session still works for the current
// page even when storage writes fail. AuthContext calls setAuthToken() on
// login / logout / session restore.
let memoryToken = null;

export const setAuthToken = (token) => {
  memoryToken = token || null;
};

const readToken = () => {
  if (memoryToken) return memoryToken;
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem("token");
  } catch {
    return null;
  }
};

// ── Central place to react to "the backend says this session is dead" ──────
// Used by BOTH the axios instance and authFetch below, so no matter which
// one a component uses, an expired/invalid token gets cleared immediately
// and the user is asked to log in again.
// NOTE: this used to hard-redirect to "/login", which is not a route in this
// app (it only has the login MODAL) — so any 401 dumped users on a 404 page.
// Instead we clear the session and broadcast an event; AuthModalProvider
// listens and opens the login modal on top of the current page.
const handleSessionExpired = () => {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } catch {
    // storage unavailable — nothing to clear
  }
  setAuthToken(null);

  window.dispatchEvent(new CustomEvent("futurely:session-expired"));
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = readToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Any 401 from any authenticated request made via `api` (expired token,
// tampered token, user deleted, etc.) now clears the stale session and asks
// the user to log in again via the login modal, instead of silently rejecting
// and leaving localStorage looking "logged in".
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      handleSessionExpired();
    }
    return Promise.reject(error);
  }
);

export const authFetch = async (endpoint, options = {}) => {
  const token = readToken();

  // ✅ FIX: Never force Content-Type for FormData —
  // browser sets it automatically WITH the multipart boundary.
  // Forcing "application/json" breaks the boundary and multer
  // cannot parse the file, which causes the backend to crash
  // before authMiddleware runs → surfaces as "Token failed".
  const headers = { ...options.headers };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let fullUrl = endpoint;
  if (!endpoint.startsWith("http")) {
    if (endpoint.startsWith("/api/")) {
      fullUrl = `${API_BASE_URL}${endpoint}`;
    } else {
      fullUrl = `${API_BASE}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
    }
  }

  try {
    const res = await fetch(fullUrl, {
      ...options,
      headers,
    });

    // Same 401 handling as the axios interceptor above, so raw authFetch()
    // calls clear the stale session and surface the login modal too.
    if (res.status === 401) {
      handleSessionExpired();
    }

    return res;
  } catch (err) {
    console.warn(`authFetch connection error for ${fullUrl}:`, err);
    return new Response(
      JSON.stringify({ error: "Backend service unreachable", details: String(err) }),
      {
        status: 503,
        statusText: "Service Unavailable",
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export default api;