import { NextResponse } from "next/server";
import { getClientIp, rateLimit, rateLimitResponse } from "@/lib/rateLimit";

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL || "https://futurely-backend.onrender.com"}/api`;

/**
 * A reset attempt is a credential operation: limit it tightly per IP so a
 * script cannot brute-force the 6-digit OTP through this proxy.
 */
const RESET_RATE_LIMIT = 10;
const RESET_RATE_WINDOW_MS = 10 * 60_000;

const NO_STORE = { "Cache-Control": "no-store" };

export async function POST(req) {
  const { allowed, retryAfterSeconds } = rateLimit(`reset:${getClientIp(req)}`, {
    limit: RESET_RATE_LIMIT,
    windowMs: RESET_RATE_WINDOW_MS,
  });

  if (!allowed) {
    return rateLimitResponse(
      retryAfterSeconds,
      "Too many reset attempts. Please wait a few minutes before trying again."
    );
  }

  try {
    const { email, otp, newPassword } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { message: "Invalid email address." },
        { status: 400, headers: NO_STORE }
      );
    }

    if (!otp || !otp.trim()) {
      return NextResponse.json(
        { message: "Please enter the OTP code sent to your email." },
        { status: 400, headers: NO_STORE }
      );
    }

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { message: "New password must be at least 6 characters long." },
        { status: 400, headers: NO_STORE }
      );
    }

    const backendRes = await fetch(`${API_BASE}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, newPassword }),
    });

    const data = await backendRes.json().catch(() => ({}));

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || data.error || "Failed to reset password. Please check your OTP code." },
        { status: backendRes.status || 400, headers: NO_STORE }
      );
    }

    return NextResponse.json(data, { status: 200, headers: NO_STORE });
  } catch (err) {
    console.error("Reset password proxy error:", err);
    return NextResponse.json(
      { message: "Unable to reach password reset server. Please try again later." },
      { status: 500, headers: NO_STORE }
    );
  }
}
