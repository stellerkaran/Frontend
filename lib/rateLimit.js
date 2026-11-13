/**
 * Dependency-free, best-effort rate limiter for Serverless / Edge Functions.
 *
 * WHY THIS EXISTS
 * ---------------
 * Every call to a Next.js Route Handler is a Vercel Function invocation. Bot and
 * scraper traffic therefore burns "Fast Origin Transfer" (CDN <-> Function bytes)
 * and function invocations long before a real user ever sees the site. The most
 * exposed endpoints in this project are:
 *
 *   - /api/chat       -> forwards to OpenRouter/Gemini (real money per call)
 *   - /api/pdf-proxy  -> downloads + re-serialises multi-MB PDFs through Vercel
 *   - /api/contact    -> sends email via Resend
 *   - /api/auth/*     -> proxies OTP send / reset
 *
 * IMPORTANT LIMITATION (read before relying on this)
 * -------------------------------------------------
 * This limiter keeps state in the module scope of a single Function instance.
 * On Vercel that state is (a) not shared between concurrent instances and
 * (b) reset whenever an instance recycles. It reliably stops casual scripted
 * abuse and single-threaded scrapers, which is what actually generates traffic.
 * It is NOT a distributed quota. For hard, account-wide limits, pair this with
 * Vercel Firewall (WAF) rate-limit rules or a shared store (Vercel KV /
 * Upstash Redis) - see the notes in the audit report.
 */

/** Buckets are evicted lazily; this bounds the map between sweeps. */
const MAX_BUCKETS = 10_000;
/** How often expired buckets are swept. */
const SWEEP_INTERVAL_MS = 60_000;

/**
 * @type {Map<string, { count: number, resetAt: number }>}
 * `resetAt` is an epoch-ms timestamp; a bucket is live while `Date.now() < resetAt`.
 */
const buckets = new Map();

let lastSweep = 0;

/** Drop expired buckets so the map cannot grow without bound. */
function sweep(now) {
  if (now - lastSweep < SWEEP_INTERVAL_MS) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
  // Hard-cap the map so a spoofed-IP flood cannot exhaust function memory.
  if (buckets.size > MAX_BUCKETS) {
    const excess = buckets.size - MAX_BUCKETS;
    let removed = 0;
    for (const key of buckets.keys()) {
      buckets.delete(key);
      if (++removed >= excess) break;
    }
  }
  lastSweep = now;
}

/**
 * Best-effort client IP from the request headers Vercel sets.
 * `x-forwarded-for` is a comma-separated chain; the left-most entry is the
 * original client. `x-real-ip` is set by Vercel's proxy as a fallback.
 *
 * @param {Request} request
 * @returns {string}
 */
export function getClientIp(request) {
  const headers = request.headers;

  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0].trim();
    if (first) return first;
  }

  return (
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    headers.get("x-vercel-forwarded-for") ||
    "unknown"
  );
}

/**
 * Consume one token for `key` inside the current window.
 *
 * @param {string} key      Bucket identity, e.g. `chat:1.2.3.4`.
 * @param {object} [options]
 * @param {number} [options.limit]     Max requests allowed per window.
 * @param {number} [options.windowMs]  Window length in milliseconds.
 * @returns {{ allowed: boolean, remaining: number, retryAfterSeconds: number }}
 */
export function rateLimit(key, { limit, windowMs }) {
  const now = Date.now();
  sweep(now);

  let bucket = buckets.get(key);

  // Missing or expired bucket -> start a fresh window.
  if (!bucket || bucket.resetAt <= now) {
    bucket = { count: 0, resetAt: now + windowMs };
    buckets.set(key, bucket);
  }

  bucket.count += 1;

  const allowed = bucket.count <= limit;
  const remaining = Math.max(0, limit - bucket.count);
  const retryAfterSeconds = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));

  return { allowed, remaining, retryAfterSeconds };
}

/**
 * Shared response for a rejected request.
 *
 * `no-store` is deliberate: a throttled response must never be cached by the
 * CDN or by an intermediary, otherwise a single 429 gets pinned for every
 * visitor in that region.
 *
 * @param {number} retryAfterSeconds
 * @param {string} message
 * @returns {Response}
 */
export function rateLimitResponse(retryAfterSeconds, message) {
  return Response.json(
    {
      error: "Too many requests",
      message:
        message || "Too many requests from this device. Please wait a moment and try again.",
    },
    {
      status: 429,
      headers: {
        "Cache-Control": "no-store",
        "Retry-After": String(retryAfterSeconds),
      },
    }
  );
}