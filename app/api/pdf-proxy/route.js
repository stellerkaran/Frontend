import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import { getClientIp, rateLimit, rateLimitResponse } from "@/lib/rateLimit";

/**
 * In-memory cache of already-normalised PDFs.
 *
 * NOTE ON SCOPE: this is a per-instance warm cache only. The layer that
 * actually protects origin transfer is the CDN `Cache-Control` below - the
 * bytes are cached at the edge, so repeat views never reach a Function at all.
 * This Map just saves a Drive round-trip + pdf-lib parse on a cold instance.
 */
const pdfCache = new Map();

/** Hard cap on cached entries so a long-lived instance can't grow unbounded. */
const PDF_CACHE_MAX_ENTRIES = 50;

/**
 * CDN cache policy for successful PDF responses.
 *
 * PDFs are immutable per Drive file id and served with an explicit id (not a
 * signed, expiring URL), so the edge can hold them for a long time.
 * `stale-while-revalidate` keeps the viewer working even while a refresh is
 * in flight, which stops a burst of traffic from stampeding the Function.
 */
const PDF_CACHE_CONTROL =
  "public, max-age=86400, s-maxage=2592000, stale-while-revalidate=604800";

/** Rate limit: generous enough for a fast page-through, hostile to bulk scraping. */
const PDF_RATE_LIMIT = 40;
const PDF_RATE_WINDOW_MS = 60_000;

// Helper to fetch from Drive endpoints; magic-byte check rejects Google Drive virus-scan warning HTML interstitials
async function fetchFromDrive(driveId, rawUrl) {
  const downloadUrls = [];
  if (driveId) {
    downloadUrls.push(
      `https://drive.usercontent.google.com/download?id=${driveId}&export=download&confirm=t`,
      `https://drive.google.com/uc?export=download&id=${driveId}&confirm=t`,
      `https://docs.google.com/uc?export=download&id=${driveId}`
    );
  }
  if (rawUrl) {
    downloadUrls.push(rawUrl);
  }

  let lastError = null;

  for (const url of downloadUrls) {
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "application/pdf,application/octet-stream,*/*",
        },
        redirect: "follow",
      });

      if (res.ok) {
        const buf = await res.arrayBuffer();
        const header = new TextDecoder().decode(new Uint8Array(buf.slice(0, 5)));
        if (buf.byteLength > 1000 && header === "%PDF-") {
          return { buffer: buf, contentType: res.headers.get("content-type") || "application/pdf" };
        }
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error("Failed to download a valid PDF from all source endpoints");
}

async function normalizePdfBuffer(rawBuffer) {
  const srcDoc = await PDFDocument.load(rawBuffer, { ignoreEncryption: true });
  const pageCount = srcDoc.getPageCount();

  if (pageCount === 0) {
    throw new Error("PDF document contains 0 pages");
  }

  const cleanDoc = await PDFDocument.create();
  const pageIndices = srcDoc.getPageIndices();
  const copiedPages = await cleanDoc.copyPages(srcDoc, pageIndices);
  copiedPages.forEach((page) => cleanDoc.addPage(page));

  const cleanBytes = await cleanDoc.save();
  return cleanBytes;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const url = searchParams.get("url");

  const cacheKey = id || url;
  if (!cacheKey) {
    return NextResponse.json(
      { error: "No URL or ID provided" },
      // Errors must never be cached, or a transient failure gets pinned at
      // the edge for the whole s-maxage window.
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  // Rate limit per-IP. This route streams whole PDFs (often multi-MB) through
  // a Function, so it is by far the easiest way to burn origin transfer.
  const { allowed, retryAfterSeconds } = rateLimit(`pdf:${getClientIp(request)}`, {
    limit: PDF_RATE_LIMIT,
    windowMs: PDF_RATE_WINDOW_MS,
  });

  if (!allowed) {
    return rateLimitResponse(
      retryAfterSeconds,
      "Too many PDF requests. Please wait a moment before continuing."
    );
  }

  if (pdfCache.has(cacheKey)) {
    const cached = pdfCache.get(cacheKey);
    return new NextResponse(cached, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Cache-Control": PDF_CACHE_CONTROL,
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  // Normalization and fetch errors propagate directly to catch block, preventing caching of invalid or HTML responses
  try {
    const { buffer: rawBuffer } = await fetchFromDrive(id, url);
    const normalizedBuffer = await normalizePdfBuffer(rawBuffer);

    if (pdfCache.size > PDF_CACHE_MAX_ENTRIES) {
      const firstKey = pdfCache.keys().next().value;
      pdfCache.delete(firstKey);
    }
    pdfCache.set(cacheKey, normalizedBuffer);

    return new NextResponse(normalizedBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Cache-Control": PDF_CACHE_CONTROL,
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.error("PDF Proxy error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to load PDF" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
