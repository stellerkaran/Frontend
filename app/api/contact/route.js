import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getClientIp, rateLimit, rateLimitResponse } from "@/lib/rateLimit";

export const runtime = "nodejs";

/** Contact form: a handful of submissions a minute is plenty for real users. */
const CONTACT_RATE_LIMIT = 5;
const CONTACT_RATE_WINDOW_MS = 10 * 60_000;

/** Contact responses are user-specific and never cacheable. */
const NO_STORE = { "Cache-Control": "no-store" };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export async function POST(request) {
  // Guard before any validation or Resend call: each accepted request costs a
  // real outbound email, so this is an abuse/cost control, not just bandwidth.
  const { allowed, retryAfterSeconds } = rateLimit(`contact:${getClientIp(request)}`, {
    limit: CONTACT_RATE_LIMIT,
    windowMs: CONTACT_RATE_WINDOW_MS,
  });

  if (!allowed) {
    return rateLimitResponse(
      retryAfterSeconds,
      "Too many messages sent. Please wait a few minutes before trying again."
    );
  }

  try {
    const { name, email, phone, exam, message } = await request.json();

    const cleanName = String(name || "").trim();
    const cleanEmail = String(email || "").trim().toLowerCase();
    const cleanPhone = String(phone || "").replace(/\D/g, "");
    const cleanExam = String(exam || "").trim();
    const cleanMessage = String(message || "").trim();

    if (!cleanName || cleanName.length > 100) {
      return NextResponse.json({ message: "Please enter a valid name." }, { status: 400, headers: NO_STORE });
    }
    if (!emailPattern.test(cleanEmail) || cleanEmail.length > 254) {
      return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400, headers: NO_STORE });
    }
    if (cleanPhone.length !== 10) {
      return NextResponse.json({ message: "Please enter a valid 10-digit phone number." }, { status: 400, headers: NO_STORE });
    }
    if (!cleanExam || cleanExam.length > 80) {
      return NextResponse.json({ message: "Please select an exam." }, { status: 400, headers: NO_STORE });
    }
    if (!cleanMessage || cleanMessage.length > 5000) {
      return NextResponse.json({ message: "Please enter a message under 5000 characters." }, { status: 400, headers: NO_STORE });
    }

    if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL || !process.env.CONTACT_EMAIL) {
      console.error("Contact email configuration is incomplete.");
      return NextResponse.json({ message: "Email service is not configured." }, { status: 500, headers: NO_STORE });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.CONTACT_EMAIL,
      replyTo: cleanEmail,
      subject: `New Futurely contact query: ${cleanExam}`,
      html: `
        <h2>New Contact Query</h2>
        <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(cleanPhone)}</p>
        <p><strong>Exam:</strong> ${escapeHtml(cleanExam)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(cleanMessage).replaceAll("\n", "<br />")}</p>
      `,
    });

    if (result.error) {
      console.error("Resend contact email error:", result.error);
      return NextResponse.json({ message: "Unable to send your message right now." }, { status: 502, headers: NO_STORE });
    }

    return NextResponse.json({ message: "Your question has been sent successfully." }, { headers: NO_STORE });
  } catch (error) {
    console.error("Contact email route error:", error);
    return NextResponse.json({ message: "Unable to send your message right now." }, { status: 500, headers: NO_STORE });
  }
}
