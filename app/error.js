"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log safely without circular references
    if (error) {
      console.error("Application Error:", error.message || String(error));
    }
  }, [error]);

  return (
    <div className="bg-slate-50 min-h-[60vh] flex items-center justify-center px-4" id="app-error-screen">
      <div className="bg-white border border-gray-200 rounded-2xl max-w-sm p-8 text-center shadow-md">
        <AlertTriangle className="mx-auto h-12 w-12 text-amber-500 mb-3" />
        <h2 className="text-xl font-bold text-gray-900">Something went wrong</h2>
        <p className="text-xs text-gray-500 mt-2 leading-relaxed">
          An unexpected issue occurred while rendering this page.
        </p>
        <div className="mt-5 flex justify-center gap-3">
          <button
            onClick={() => reset()}
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Try Again
          </button>
          <Link href="/">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
