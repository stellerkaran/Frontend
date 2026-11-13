"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import AdBanner from "@/components/AdBanner";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Download,
  Layers,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

// Ad slot assignments for in-between pages
// 5 slots cycled by page index — reduces same-slot duplication on longer PDFs
const INTERSTITIAL_AD_SLOTS = [
  { slot: "8679502538", format: "fluid", layout: "in-article", title: "Sponsored • Between Pages" },
  { slot: "3636692323", format: "auto", layout: null, title: "Advertisement • Page Break" },
  { slot: "4839618464", format: "auto", layout: null, title: "Sponsored Content" },
  { slot: "6242297060", format: "auto", layout: null, title: "Recommended Links" },
  { slot: "8729236906", format: "fluid", layout: "in-article", title: "Sponsored • Between Pages" },
];

function SinglePdfPage({ pdfDoc, pageNum, scale, onRenderSuccess, scanLabel }) {
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);
  const [rendering, setRendering] = useState(true);
  const [renderError, setRenderError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    async function renderPage() {
      if (!pdfDoc || !canvasRef.current) return;
      setRendering(true);
      setRenderError(null);

      try {
        if (renderTaskRef.current) {
          try {
            renderTaskRef.current.cancel();
          } catch (e) {
            // ignore cancel exception
          }
        }

        const page = await pdfDoc.getPage(pageNum);
        if (isCancelled || !canvasRef.current) return;

        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // High DPI sharpness
        const outputScale = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

        const renderContext = {
          canvasContext: ctx,
          transform: transform,
          viewport: viewport,
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;

        await renderTask.promise;
        if (!isCancelled) {
          setRendering(false);
          if (onRenderSuccess) onRenderSuccess(pageNum);
        }
      } catch (err) {
        if (err?.name !== "RenderingCancelledException" && !isCancelled) {
          console.warn(`Error rendering page ${pageNum}:`, err);
          setRendering(false);
          setRenderError("Failed to render page");
        }
      }
    }

    renderPage();

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch (e) {}
      }
    };
  }, [pdfDoc, pageNum, scale, onRenderSuccess]);

  return (
    <div className="relative mx-auto my-3 flex flex-col items-center">
      {/* Page Card */}
      <div className="relative overflow-hidden rounded-xl bg-white shadow-md border border-slate-200/90 transition-shadow hover:shadow-lg">
        {/* Page Tag Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-3 py-1.5 text-[11px] font-semibold text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
            Page {pageNum}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            {scanLabel || "100% Official JUT Scan"}
          </span>
        </div>

        {/* Canvas Area */}
        <div className="relative flex min-h-[360px] min-w-[280px] items-center justify-center p-2 sm:p-4 bg-slate-50/40">
          {rendering && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-xs z-10">
              <div className="h-7 w-7 animate-spin rounded-full border-3 border-blue-200 border-t-blue-600"></div>
              <span className="mt-2 text-xs font-medium text-slate-500">Loading Page {pageNum}...</span>
            </div>
          )}
          {renderError && (
            <div className="p-6 text-center text-xs text-red-500">
              <AlertCircle className="mx-auto h-6 w-6 mb-1 text-red-400" />
              <span>{renderError}</span>
            </div>
          )}
          <canvas ref={canvasRef} className="block max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
}

export default function PdfMultiPageViewer({
  rawDriveUrl,
  driveId,
  previewUrl,
  downloadUrl,
  subjectName,
  year,
  onFullscreenToggle,
  isFullscreen,
  readerTitle = "Jharkhand B.Tech PYQ",
  scanLabel = "100% Official JUT Scan",
}) {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scale, setScale] = useState(1.15);
  const [viewMode, setViewMode] = useState("canvas"); // 'canvas' or 'embed'
  const [renderProgress, setRenderProgress] = useState(0);
  const containerRef = useRef(null);

  // Auto-tune scale for smaller/mobile screens
  useEffect(() => {
    function handleResize() {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      if (width < 640) {
        setScale(0.72);
      } else if (width < 768) {
        setScale(0.88);
      } else if (width < 1024) {
        setScale(1.05);
      } else {
        setScale(1.18);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch and load PDF using pdfjsLib
  const loadPdfDocument = useCallback(async () => {
    if (!driveId) {
      setViewMode("embed");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (typeof window === "undefined") return;

      if (!window.pdfjsLib) {
        // Dynamically load PDF.js from CDN if not already on window
        await new Promise((resolve, reject) => {
          if (document.getElementById("pdfjs-cdn-script")) {
            const checkTimer = setInterval(() => {
              if (window.pdfjsLib) {
                clearInterval(checkTimer);
                resolve();
              }
            }, 100);
            setTimeout(() => {
              clearInterval(checkTimer);
              resolve();
            }, 5000);
            return;
          }
          const script = document.createElement("script");
          script.id = "pdfjs-cdn-script";
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
          script.onload = () => {
            if (window.pdfjsLib) {
              window.pdfjsLib.GlobalWorkerOptions.workerSrc =
                "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
            }
            resolve();
          };
          script.onerror = () => reject(new Error("Failed to load PDF rendering engine."));
          document.head.appendChild(script);
        });
      }

      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      }

      // Proxy endpoint
      const proxyUrl = `/api/pdf-proxy?id=${driveId}`;
      const loadingTask = window.pdfjsLib.getDocument({
        url: proxyUrl,
        cMapUrl: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/",
        cMapPacked: true,
      });

      const doc = await loadingTask.promise;
      setPdfDoc(doc);
      setTotalPages(doc.numPages);
      setViewMode("canvas");
      setLoading(false);
    } catch (err) {
      console.warn("Multi-page PDF load failed, switching to Drive embed mode:", err);
      setError("Direct canvas render unavailable. Displaying interactive Drive reader below.");
      setViewMode("embed");
      setLoading(false);
    }
  }, [driveId]);

  useEffect(() => {
    loadPdfDocument();
  }, [loadPdfDocument]);

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.15, 2.2));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.15, 0.5));
  const handleResetZoom = () => {
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      setScale(0.72);
    } else {
      setScale(1.15);
    }
  };

  const handlePageRenderSuccess = useCallback((num) => {
    setRenderProgress((prev) => Math.max(prev, num));
  }, []);

  return (
    <div className="w-full" ref={containerRef}>
      {/* ── STICKY TOP TOOLBAR FOR PDF READER ── */}
      <div className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-slate-200 bg-white/95 px-3 py-2.5 backdrop-blur-md shadow-xs sm:px-4">
        {/* Left: Document Info */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0">
            <Layers className="h-4 w-4" />
          </span>
          <div className="truncate">
            <div className="text-xs font-bold text-slate-800 truncate">
              {subjectName} ({year})
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              {totalPages > 0 ? (
                <span>Total {totalPages} Pages • {readerTitle}</span>
              ) : (
                <span>{readerTitle}</span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Controls & Actions */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
          {viewMode === "canvas" && (
            <>
              {/* Zoom Out */}
              <button
                onClick={handleZoomOut}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
                title="Zoom Out"
                aria-label="Zoom Out"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>

              {/* Zoom % badge */}
              <button
                onClick={handleResetZoom}
                className="hidden sm:inline-flex px-2 py-1 text-[11px] font-mono font-semibold rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                title="Reset Zoom"
              >
                {Math.round(scale * 100)}%
              </button>

              {/* Zoom In */}
              <button
                onClick={handleZoomIn}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
                title="Zoom In"
                aria-label="Zoom In"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
            </>
          )}

          {/* Switch View Mode */}
          <button
            onClick={() => setViewMode(viewMode === "canvas" ? "embed" : "canvas")}
            className="hidden md:inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            title="Toggle Reader Mode"
          >
            <RefreshCw className="h-3 w-3 text-blue-600" />
            <span>{viewMode === "canvas" ? "Embed Mode" : "Page View"}</span>
          </button>

          {/* Fullscreen */}
          {onFullscreenToggle && (
            <button
              onClick={onFullscreenToggle}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Reader"}
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? (
                <Minimize2 className="h-3.5 w-3.5 text-blue-600" />
              ) : (
                <Maximize2 className="h-3.5 w-3.5" />
              )}
            </button>
          )}

          {/* Direct Download button in Toolbar */}
          {downloadUrl && (
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition-colors"
              title="Download official PDF"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Save</span>
            </a>
          )}
        </div>
      </div>

      {/* ── LOADING STATE ── */}
      {loading && (
        <div className="flex flex-col items-center justify-center p-12 bg-slate-50/60 min-h-[480px]">
          <div className="relative">
            <div className="h-12 w-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Layers className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <p className="mt-4 text-sm font-semibold text-slate-800">
            Loading {subjectName} ({year}) Pages...
          </p>
          <p className="text-xs text-slate-500 mt-1">
            If this takes too long, Click on Download Button to View.  
          </p>
        </div>
      )}

      {/* ── CANVAS MULTI-PAGE VIEW WITH IN-BETWEEN AD BREAKS ── */}
      {!loading && viewMode === "canvas" && (
        <div className="bg-slate-100/70 p-2 sm:p-4 min-h-[500px]">
          {totalPages > 0 ? (
            <div className="mx-auto max-w-full">
              {Array.from({ length: totalPages }, (_, idx) => {
                const pageNum = idx + 1;
                const isLastPage = pageNum === totalPages;
                const adConfig = INTERSTITIAL_AD_SLOTS[idx % INTERSTITIAL_AD_SLOTS.length];

                return (
                  <React.Fragment key={`page-wrapper-${pageNum}`}>
                    {/* The Rendered PDF Page */}
                    <SinglePdfPage
                      pdfDoc={pdfDoc}
                      pageNum={pageNum}
                      scale={scale}
                      onRenderSuccess={handlePageRenderSuccess}
                      scanLabel={scanLabel}
                    />

                    {/* IN-BETWEEN PAGE AD */}
                    {!isLastPage && (
                      <div
                        style={{ margin: "18px 0", minHeight: 0 }}
                        className="rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-xs text-center"
                      >
                        <div className="flex items-center justify-center gap-2 mb-1.5">
                          <span className="h-px w-8 bg-slate-200"></span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            {adConfig.title || "Advertisement • Between Pages"} (After Page {pageNum})
                          </span>
                          <span className="h-px w-8 bg-slate-200"></span>
                        </div>
                        <AdBanner
                          key={`ad-${adConfig.slot}-page-${pageNum}`}
                          slot={adConfig.slot}
                          format={adConfig.format}
                          layout={adConfig.layout}
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}

              {/* End of Pages Indicator */}
              <div className="my-4 rounded-lg border border-emerald-200/80 bg-emerald-50/60 p-3 text-center text-xs font-semibold text-emerald-800 shadow-xs">
                ✅ You have reached the end of the {totalPages}-page question paper for {subjectName} ({year}).
              </div>
            </div>
          ) : (
            /* Fallback if no pages */
            <div className="p-8 text-center bg-white rounded-lg">
              <p className="text-xs text-slate-500 mb-3">
                Switching to Google Drive preview mode...
              </p>
              <button
                onClick={() => setViewMode("embed")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold"
              >
                Open in Drive Reader
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── GOOGLE DRIVE EMBED FALLBACK VIEW ── */}
      {viewMode === "embed" && previewUrl && (
        <div className="relative bg-white overflow-hidden">
          <iframe
            src={previewUrl}
            className="w-full h-[700px] border-none block"
            title={`${subjectName} ${year} Question Paper`}
            allow="autoplay"
          />
        </div>
      )}
    </div>
  );
}
