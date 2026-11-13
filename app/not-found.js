"use client";

import { useRouter } from "next/navigation";

const pencilRoute =
  "M42 105 L82 34 L82 145 M42 102 L110 102 M170 90 C170 48 190 28 215 28 C240 28 255 48 255 90 C255 132 240 150 215 150 C190 150 170 132 170 90 M290 105 L330 34 M330 34 L330 145 M290 102 L358 102";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="nf404-page" id="custom-404-screen">
      {/* Inline <style> via dangerouslySetInnerHTML so React never HTML-escapes the CSS (it would escape "&" and ">" inside a text child, breaking hydration on server-rendered HTML). */}
      <style dangerouslySetInnerHTML={{ __html: `
        .nf404-page {
          --nf404-ink: #172033;
          --nf404-blue: #2563eb;
          --nf404-blue-soft: #eff6ff;
          min-height: 72vh;
          display: grid;
          place-items: center;
          padding: 3rem 1rem;
          background: #f8fafc;
          color: var(--nf404-ink);
          overflow: hidden;
        }
        .nf404-card {
          width: min(100%, 42rem);
          border: 1px solid #e2e8f0;
          border-radius: 1.5rem;
          background: #fff;
          padding: clamp(1.5rem, 5vw, 3.25rem);
          text-align: center;
          box-shadow: 0 16px 40px rgba(15, 23, 42, .08);
        }
        .nf404-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: .45rem;
          border-radius: 999px;
          background: var(--nf404-blue-soft);
          color: var(--nf404-blue);
          padding: .4rem .75rem;
          font-size: .7rem;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .nf404-art {
          display: block;
          width: min(100%, 34rem);
          height: auto;
          margin: 1.25rem auto .25rem;
          overflow: visible;
        }
        .nf404-number-stroke {
          fill: none;
          stroke: var(--nf404-blue);
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 9;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: nf404-draw .42s ease-in-out forwards;
        }
        .nf404-stroke-1 { animation-delay: .1s; }
        .nf404-stroke-2 { animation-delay: .52s; }
        .nf404-stroke-3 { animation-delay: .94s; }
        .nf404-stroke-4 { animation-delay: 1.35s; }
        .nf404-stroke-5 { animation-delay: 1.78s; }
        .nf404-stroke-6 { animation-delay: 2.05s; }
        .nf404-stroke-7 { animation-delay: 2.3s; }
        .nf404-pencil-motion { transform-box: fill-box; transform-origin: center; }
        .nf404-pencil-body { fill: #f59e0b; stroke: #b45309; stroke-width: 1.5; }
        .nf404-pencil-tip { fill: #fef3c7; stroke: #92400e; stroke-width: 1.5; }
        .nf404-pencil-band { fill: #fb7185; }
        .nf404-pencil-motion > .nf404-pencil-tilt {
          transform-box: fill-box;
          transform-origin: 0 0;
          animation: nf404-pencil-tilt 4.2s ease-in forwards;
        }
        .nf404-copy {
          opacity: 0;
          animation: nf404-reveal .65s ease-out 3.0s forwards;
        }
        .nf404-title {
          margin: .4rem 0 0;
          color: var(--nf404-ink);
          font-size: clamp(1.25rem, 3vw, 1.7rem);
          font-weight: 850;
          letter-spacing: -.02em;
        }
        .nf404-description {
          margin: .7rem auto 0;
          max-width: 32rem;
          color: #64748b;
          font-size: clamp(.9rem, 2vw, 1rem);
          line-height: 1.6;
        }
        .nf404-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: .75rem;
          margin-top: 1.5rem;
        }
        .nf404-button {
          min-width: 9.5rem;
          border-radius: .8rem;
          padding: .7rem 1.1rem;
          font-size: .86rem;
          font-weight: 800;
          transition: transform .2s ease, box-shadow .2s ease, background-color .2s ease;
          cursor: pointer;
        }
        .nf404-button:hover, .nf404-button:focus-visible {
          transform: translateY(-2px);
          outline: none;
        }
        .nf404-button-primary {
          border: 1px solid var(--nf404-blue);
          background: var(--nf404-blue);
          color: #fff;
          box-shadow: 0 8px 18px rgba(37, 99, 235, .2);
        }
        .nf404-button-primary:hover, .nf404-button-primary:focus-visible {
          background: #1d4ed8;
          box-shadow: 0 10px 22px rgba(37, 99, 235, .28);
        }
        .nf404-button-secondary {
          border: 1px solid #bfdbfe;
          background: var(--nf404-blue-soft);
          color: var(--nf404-blue);
        }
        .nf404-button-secondary:hover, .nf404-button-secondary:focus-visible {
          background: #dbeafe;
          box-shadow: 0 8px 18px rgba(37, 99, 235, .14);
        }
        @keyframes nf404-draw { to { stroke-dashoffset: 0; } }
        @keyframes nf404-pencil-tilt {
          0%, 60% { transform: rotate(-42deg); }
          66% { transform: translateY(5px) rotate(18deg); }
          74% { transform: translateY(9px) rotate(48deg); }
          82% { transform: translateY(9px) rotate(185deg); }
          100% { transform: translate(35px, 9px) rotate(540deg); opacity: 0; }
        }
        @keyframes nf404-reveal {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 420px) {
          .nf404-page { padding: 2rem .75rem; }
          .nf404-card { border-radius: 1.15rem; padding: 1.25rem .9rem 1.5rem; }
          .nf404-actions { gap: .55rem; }
          .nf404-button { min-width: 8.5rem; padding: .65rem .8rem; font-size: .8rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .nf404-number-stroke { animation: none; stroke-dashoffset: 0; }
          .nf404-pencil-motion > .nf404-pencil-tilt { animation: none; opacity: 0; }
          .nf404-copy { animation: none; opacity: 1; }
          .nf404-button { transition: none; }
        }
      ` }} />

      <section className="nf404-card" aria-labelledby="nf404-title">

        <svg className="nf404-art" viewBox="0 0 400 180" role="img" aria-labelledby="nf404-svg-title">

          {/* First "4" */}
          <path className="nf404-number-stroke nf404-stroke-1" pathLength="1" d="M42 105 L82 34" />
          <path className="nf404-number-stroke nf404-stroke-2" pathLength="1" d="M82 34 L82 145" />
          <path className="nf404-number-stroke nf404-stroke-3" pathLength="1" d="M42 102 L110 102" />

          {/* "0" */}
          <path className="nf404-number-stroke nf404-stroke-4" pathLength="1" d="M170 90 C170 48 190 28 215 28 C240 28 255 48 255 90 C255 132 240 150 215 150 C190 150 170 132 170 90" />

          {/* Second "4" */}
          <path className="nf404-number-stroke nf404-stroke-5" pathLength="1" d="M290 105 L330 34" />
          <path className="nf404-number-stroke nf404-stroke-6" pathLength="1" d="M330 34 L330 145" />
          <path className="nf404-number-stroke nf404-stroke-7" pathLength="1" d="M290 102 L358 102" />

          <g className="nf404-pencil-motion">
            <animateMotion dur="4.2s" path={pencilRoute} rotate="auto" fill="freeze" />
            <g className="nf404-pencil-tilt" transform="rotate(-42)">
              <path className="nf404-pencil-tip" d="M0 0 L8 3 L3 9 Z" />
              <rect className="nf404-pencil-body" x="3" y="-8" width="26" height="10" rx="3" />
              <rect className="nf404-pencil-band" x="24" y="-8" width="5" height="10" />
              <path className="nf404-pencil-tip" d="M29 -8 L36 -3 L29 2 Z" />
            </g>
          </g>
        </svg>

        <div className="nf404-copy">
          <h1 className="nf404-title" id="nf404-title">This page doesn&apos;t exist — but your exam prep still does.</h1>
          <p className="nf404-description">The link may have moved, but your next practice session is only one click away.</p>
          <div className="nf404-actions">
            <button type="button" className="nf404-button nf404-button-primary" onClick={() => router.push("/")}>Go to Home</button>
            <button type="button" className="nf404-button nf404-button-secondary" onClick={() => router.push("/exam-preparation")}>Browse Exams</button>
          </div>
        </div>
      </section>
    </main>
  );
}