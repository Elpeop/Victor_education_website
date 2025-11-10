import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative w-full overflow-hidden"
    >
      {/* Animated background gradients (decorative) */}
      <style>{`
        .animated-gradient {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: linear-gradient(90deg, #07142a 0%, #0b2a50 25%, #60a5fa 60%, #e6f8ff 100%);
          background-size: 200% 200%;
          animation: gradientShift 12s ease-in-out infinite;
          opacity: 0.10;
          filter: blur(48px);
          transform: translateZ(0);
        }
        .radial-accents {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(600px 300px at 10% 20%, rgba(96,165,250,0.06), transparent 10%),
            radial-gradient(500px 200px at 90% 60%, rgba(14,165,166,0.05), transparent 10%);
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div className="animated-gradient" aria-hidden="true" />
      <div className="radial-accents" aria-hidden="true" />

      <div
        className={`relative max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} transition-all duration-700`}
        style={{ zIndex: 2 }}
      >
        {/* LEFT: text + CTAs */}
        <div className="md:w-1/2 w-full">
          <h1 id="hero-title" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#07142a] leading-tight">
            Building the Future of Robotics Learning
          </h1>

          <p className="mt-4 text-slate-700 max-w-xl text-sm sm:text-base">
            Personalized learning paths, gamified assessments, and a collaborative community — designed
            for curious middle and high school students who want to learn robotics step‑by‑step and
            have fun doing it.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/explore"
              className="inline-flex items-center px-6 py-3 bg-[#07142a] hover:bg-[#0b2a50] text-white font-semibold rounded-md shadow-md transform transition duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              Explore Lessons
            </Link>

            <Link
              to="/signup"
              className="inline-flex items-center px-5 py-3 border-2 border-[#07142a] text-[#07142a] bg-white rounded-md font-semibold hover:bg-[#f0f8ff] transform transition duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-sky-200"
            >
              Create account
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Trusted resources • Hands-on labs • Friendly community
          </p>
        </div>

        {/* RIGHT: illustration / placeholder */}
        <div className="md:w-1/2 w-full flex justify-center md:justify-end">
          <div className="w-full max-w-sm md:max-w-md">
            <svg
              viewBox="0 0 320 320"
              className="w-full h-auto drop-shadow-lg"
              role="img"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="heroAccent" x1="0" x2="1">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#0ea5a9" />
                </linearGradient>
                <linearGradient id="heroNavy" x1="0" x2="1">
                  <stop offset="0%" stopColor="#07142a" />
                  <stop offset="100%" stopColor="#103a72" />
                </linearGradient>
              </defs>

              <rect x="28" y="200" width="264" height="18" rx="9" fill="#eaf8ff" />

              <g transform="translate(60,24)">
                <rect x="0" y="56" width="200" height="140" rx="18" fill="url(#heroNavy)" opacity="0.95" />
                <circle cx="56" cy="96" r="12" fill="url(#heroAccent)" />
                <rect x="116" y="88" width="20" height="20" rx="4" fill="#cfeefe" />
                <path d="M40 168 L56 132 L72 168" stroke="#e7f9ff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <rect x="94" y="20" width="12" height="36" rx="3" fill="#cfeefe" />
                <circle cx="100" cy="16" r="8" fill="#60a5fa" />
                <rect x="-8" y="86" width="12" height="64" rx="6" fill="#cfeefe" />
                <rect x="196" y="86" width="12" height="64" rx="6" fill="#cfeefe" />
              </g>

              <g opacity="0.9" transform="translate(10,6)">
                <circle cx="18" cy="28" r="4" fill="#cfeefe" />
                <circle cx="300" cy="60" r="3.6" fill="#cfeefe" />
                <rect x="250" y="16" width="22" height="6" rx="3" fill="#e6f6ff" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;