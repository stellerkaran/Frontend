"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    if (error) {
      console.error("Global Error:", error.message || String(error));
    }
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white border border-gray-200 rounded-2xl max-w-sm p-8 text-center shadow-md">
          <h2 className="text-xl font-bold text-gray-900">Application Error</h2>
          <p className="text-xs text-gray-500 mt-2">
            A critical error occurred. Please refresh or try again.
          </p>
          <div className="mt-5">
            <button
              onClick={() => reset()}
              className="bg-primary text-white px-5 py-2.5 rounded-xl text-xs font-bold"
            >
              Reload Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
