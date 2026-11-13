import { NextResponse } from "next/server";
import { getClientIp, rateLimit, rateLimitResponse } from "@/lib/rateLimit";

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL || "https://futurely-backend.onrender.com"}/api`;

/**
 * OTP requests are strictly per-account, never cacheable, and expensive to
 * abuse (each hit sends an email). Limit per IP; the backend should also
 * limit per email address.
 */
const OTP_RATE_LIMIT = 5;
const OTP_RATE_WINDOW_MS = 10 * 60_000;

const NO_STORE = { "Cache-Control": "no-store" };

export async function POST(req) {
  const { allowed, retryAfterSeconds } = rateLimit(`forgot:${getClientIp(req)}`, {
    limit: OTP_RATE_LIMIT,
    windowMs: OTP_RATE_WINDOW_MS,
  });

  if (!allowed) {
    return rateLimitResponse(
      retryAfterSeconds,
      "Too many reset requests. Please wait a few minutes before trying again."
    );
  }

  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { message: "Please provide a valid email address." },
        { status: 400, headers: NO_STORE }
      );
    }

    const backendRes = await fetch(`${API_BASE}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await backendRes.json().catch(() => ({}));

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || data.error || "Failed to send OTP to email." },
        { status: backendRes.status || 400, headers: NO_STORE }
      );
    }

    return NextResponse.json(data, { status: 200, headers: NO_STORE });
  } catch (err) {
    console.error("Forgot password proxy error:", err);
    return NextResponse.json(
      { message: "Unable to reach password reset server. Please try again later." },
      { status: 500, headers: NO_STORE }
    );
  }
}
