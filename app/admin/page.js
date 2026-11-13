"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL || "https://futurely-backend.onrender.com"}/api`;

export default function AdminPanel() {
  const [adminToken, setAdminToken] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("admin_token") || "";
    }
    return "";
  });
  
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return !!sessionStorage.getItem("admin_token");
    }
    return false;
  });

  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState("");

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionMsg, setActionMsg] = useState({ id: "", msg: "", type: "" });

  // ── fetch pending requests ──────────────────────────────────
  const fetchRequests = useCallback(async () => {
    if (!adminToken) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/purchase/admin/requests`, {
        headers: { "x-admin-secret": adminToken },
      });
      if (res.status === 401 || res.status === 403) {
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("admin_token");
        }
        setLoggedIn(false);
        return;
      }
      const data = await res.json();
      setRequests(Array.isArray(data) ? data : []);
    } catch {
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, [adminToken]);

  useEffect(() => {
    if (loggedIn && adminToken) {
      fetchRequests();
    }
  }, [loggedIn, adminToken, fetchRequests]);

  // ── approve ─────────────────────────────────────────────────
  const handleApprove = async (purchaseId) => {
    try {
      const res = await fetch(`${API_BASE}/purchase/admin/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": adminToken,
        },
        body: JSON.stringify({ purchaseId }),
      });
      const data = await res.json();
      setActionMsg({ id: purchaseId, msg: data.message || "Approved!", type: "success" });
      // Remove from list after 1.5s
      setTimeout(() => {
        setRequests((prev) => prev.filter((r) => r._id !== purchaseId));
        setActionMsg({ id: "", msg: "", type: "" });
      }, 1500);
    } catch {
      setActionMsg({ id: purchaseId, msg: "Error. Try again.", type: "error" });
    }
  };

  // ── reject ──────────────────────────────────────────────────
  const handleReject = async (purchaseId) => {
    if (typeof window !== "undefined" && !window.confirm("Reject this request?")) return;
    try {
      const res = await fetch(`${API_BASE}/purchase/admin/reject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": adminToken,
        },
        body: JSON.stringify({ purchaseId }),
      });
      const data = await res.json();
      setActionMsg({ id: purchaseId, msg: data.message || "Rejected", type: "rejected" });
      setTimeout(() => {
        setRequests((prev) => prev.filter((r) => r._id !== purchaseId));
        setActionMsg({ id: "", msg: "", type: "" });
      }, 1500);
    } catch {
      setActionMsg({ id: purchaseId, msg: "Error. Try again.", type: "error" });
    }
  };

  const handleLogin = async () => {
    setPwError("");
    try {
      const res = await fetch(`${API_BASE}/purchase/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: password }),
      });
      if (!res.ok) {
        setPwError("Wrong password");
        return;
      }
      if (typeof window !== "undefined") {
        sessionStorage.setItem("admin_token", password);
      }
      setAdminToken(password);
      setLoggedIn(true);
    } catch {
      setPwError("Server error. Try again.");
    }
  };

  // ── LOGIN SCREEN ────────────────────────────────────────────
  if (!loggedIn) {
    return (
      <div style={styles.loginWrap}>
        <div style={styles.loginCard}>
          <div style={styles.loginLogo}>🛡️</div>
          <h2 style={styles.loginTitle}>Admin Access</h2>
          <p style={styles.loginSub}>Futurely — Purchase Approvals</p>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLogin();
            }}
            style={styles.loginInput}
          />
          {pwError && <p style={styles.loginError}>{pwError}</p>}
          <button style={styles.loginBtn} onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    );
  }

  // ── MAIN PANEL ───────────────────────────────────────────────
  return (
    <div style={styles.wrap}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.headerTitle}>Purchase Requests</h1>
          <p style={styles.headerSub}>
            {requests.length} pending approval
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={styles.refreshBtn} onClick={fetchRequests}>
            🔄 Refresh
          </button>
          <button
            style={{ ...styles.refreshBtn, color: "#dc2626", borderColor: "#fca5a5" }}
            onClick={() => {
              if (typeof window !== "undefined") {
                sessionStorage.removeItem("admin_token");
              }
              setLoggedIn(false);
              setAdminToken("");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div style={styles.center}>
          <div style={styles.spinner} className="animate-spin" />
          <p style={{ color: "#6b7280", marginTop: 12 }}>Loading requests...</p>
        </div>
      ) : requests.length === 0 ? (
        <div style={styles.emptyWrap}>
          <div style={styles.emptyIcon}>✅</div>
          <h3 style={styles.emptyTitle}>All clear!</h3>
          <p style={styles.emptySub}>No pending purchase requests right now.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {requests.map((req) => (
            <div key={req._id} style={styles.card}>
              {/* Status banner if action taken */}
              {actionMsg.id === req._id && (
                <div
                  style={{
                    ...styles.actionBanner,
                    background:
                      actionMsg.type === "success"
                        ? "#dcfce7"
                        : actionMsg.type === "rejected"
                          ? "#fee2e2"
                          : "#fef9c3",
                    color:
                      actionMsg.type === "success"
                        ? "#166534"
                        : actionMsg.type === "rejected"
                          ? "#991b1b"
                          : "#713f12",
                  }}
                >
                  {actionMsg.type === "success" ? "✅" : "❌"} {actionMsg.msg}
                </div>
              )}

              {/* Card Header */}
              <div style={styles.cardHeader}>
                <div style={styles.avatar}>
                  {req.email?.[0]?.toUpperCase() || "?"}
                </div>
                <div>
                  <p style={styles.cardEmail}>{req.email}</p>
                  <p style={styles.cardDate}>
                    {new Date(req.createdAt).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <span style={styles.statusBadge}>Pending</span>
              </div>

              {/* Details */}
              <div style={styles.detailsGrid}>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Test Series</span>
                  <span style={styles.detailValue}>{req.testSeriesId}</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>UPI Ref No.</span>
                  <span style={{ ...styles.detailValue, fontFamily: "monospace", letterSpacing: 1 }}>
                    {req.upiRef}
                  </span>
                </div>
              </div>

              {/* Screenshot */}
              {req.screenshotUrl && (
                <div style={styles.screenshotWrap}>
                  <p style={styles.detailLabel}>Payment Screenshot</p>
                  <a href={req.screenshotUrl} target="_blank" rel="noreferrer">
                    <Image width={800} height={600}
                      src={req.screenshotUrl}
                      alt="Payment proof"
                      style={styles.screenshot}
                    />
                    <p style={styles.viewFull}>Click to view full image ↗</p>
                  </a>
                </div>
              )}

              {/* Action Buttons */}
              <div style={styles.actions}>
                <button
                  style={styles.approveBtn}
                  onClick={() => handleApprove(req._id)}
                  disabled={actionMsg.id === req._id}
                >
                  ✅ Approve — Grant Access
                </button>
                <button
                  style={styles.rejectBtn}
                  onClick={() => handleReject(req._id)}
                  disabled={actionMsg.id === req._id}
                >
                  ❌ Reject
                </button>
              </div>

              {/* Reminder */}
              <p style={styles.reminder}>
                ⚠️ Check your GPay/PhonePe for UPI ref <strong>{req.upiRef}</strong> before approving
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────
const styles = {
  // Login
  loginWrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f8fafc",
    fontFamily: "system-ui, sans-serif",
  },
  loginCard: {
    background: "#fff",
    borderRadius: 20,
    padding: "48px 40px",
    boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
    width: "100%",
    maxWidth: 380,
    textAlign: "center",
  },
  loginLogo: { fontSize: 48, marginBottom: 16 },
  loginTitle: { fontSize: 24, fontWeight: 700, color: "#111827", margin: "0 0 6px" },
  loginSub: { fontSize: 14, color: "#6b7280", margin: "0 0 28px" },
  loginInput: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 12,
    border: "1.5px solid #e5e7eb",
    fontSize: 15,
    outline: "none",
    marginBottom: 8,
    boxSizing: "border-box",
  },
  loginError: { color: "#dc2626", fontSize: 13, margin: "0 0 12px" },
  loginBtn: {
    width: "100%",
    padding: "13px",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
    marginTop: 4,
  },
  // Main
  wrap: {
    minHeight: "100vh",
    background: "#f1f5f9",
    fontFamily: "system-ui, sans-serif",
    padding: "32px 16px 64px",
  },
  header: {
    maxWidth: 900,
    margin: "0 auto 28px",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 28, fontWeight: 800, color: "#111827", margin: 0 },
  headerSub: { fontSize: 14, color: "#6b7280", margin: "4px 0 0" },
  refreshBtn: {
    padding: "10px 20px",
    borderRadius: 10,
    border: "1.5px solid #e5e7eb",
    background: "#fff",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    color: "#374151",
  },
  center: { display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 80 },
  spinner: {
    width: 40,
    height: 40,
    border: "3px solid #e5e7eb",
    borderTop: "3px solid #4f46e5",
    borderRadius: "50%",
  },
  emptyWrap: { textAlign: "center", paddingTop: 80 },
  emptyIcon: { fontSize: 56, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: 700, color: "#111827", margin: "0 0 8px" },
  emptySub: { fontSize: 14, color: "#6b7280" },
  grid: {
    maxWidth: 900,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    border: "1px solid #e5e7eb",
  },
  actionBanner: {
    borderRadius: 10,
    padding: "10px 16px",
    fontWeight: 700,
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardEmail: { fontWeight: 700, color: "#111827", margin: 0, fontSize: 15 },
  cardDate: { fontSize: 12, color: "#9ca3af", margin: "2px 0 0" },
  statusBadge: {
    marginLeft: "auto",
    background: "#fef9c3",
    color: "#713f12",
    fontSize: 12,
    fontWeight: 700,
    padding: "4px 12px",
    borderRadius: 20,
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginBottom: 20,
  },
  detailItem: {
    background: "#f8fafc",
    borderRadius: 10,
    padding: "12px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  detailLabel: { fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 0.5, margin: 0 },
  detailValue: { fontSize: 14, fontWeight: 700, color: "#111827" },
  screenshotWrap: { marginBottom: 20 },
  screenshot: {
    width: "100%",
    maxHeight: 240,
    objectFit: "contain",
    borderRadius: 10,
    border: "1.5px solid #e5e7eb",
    marginTop: 8,
    cursor: "pointer",
  },
  viewFull: { fontSize: 12, color: "#4f46e5", margin: "6px 0 0", textAlign: "center" },
  actions: { display: "flex", gap: 10, marginBottom: 12 },
  approveBtn: {
    flex: 1,
    padding: "13px",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg, #16a34a, #15803d)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
  },
  rejectBtn: {
    padding: "13px 20px",
    borderRadius: 12,
    border: "1.5px solid #fca5a5",
    background: "#fff",
    color: "#dc2626",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
  },
  reminder: {
    fontSize: 12,
    color: "#92400e",
    background: "#fffbeb",
    border: "1px solid #fde68a",
    borderRadius: 8,
    padding: "8px 12px",
    margin: 0,
  },
};
