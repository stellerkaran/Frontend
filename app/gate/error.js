"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function GateError({ error, reset }) {
  useEffect(() => {
    if (error) {
      console.error("GATE Section Error:", error.message || String(error));
      const isChunkError =
        error?.name === "ChunkLoadError" ||
        (typeof error?.message === "string" &&
          (error.message.includes("Loading chunk") ||
            error.message.includes("ChunkLoadError") ||
            error.message.includes("failed to fetch chunk")));

      if (isChunkError && typeof window !== "undefined") {
        const lastReload = window.sessionStorage.getItem("last_gate_chunk_reload");
        const now = Date.now();
        if (!lastReload || now - parseInt(lastReload, 10) > 15000) {
          window.sessionStorage.setItem("last_gate_chunk_reload", String(now));
          window.location.reload();
        }
      }
    }
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12 bg-slate-50" id="gate-error-view">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-8 text-center shadow-lg">
        <div className="inline-flex p-3 bg-amber-50 text-amber-600 rounded-full mb-4 ring-8 ring-amber-50/50">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">GATE Section Reload Required</h2>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          A bundle update occurred or connection was temporarily interrupted while loading this section.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset ? reset() : window.location.reload()}
            id="btn-gate-error-retry"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer shadow-sm"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
          <Link href="/gate" className="w-full sm:w-auto">
            <button
              id="btn-gate-error-home"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
            >
              <Home className="h-4 w-4" />
              <span>GATE Home</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
