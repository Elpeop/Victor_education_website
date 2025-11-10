import React from "react";
import { Link } from "react-router-dom";

export default function InstructorCTASection() {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 p-8 items-center">
          <div>
            <h2 className="text-3xl font-semibold leading-tight mb-2">Share your expertise — become an instructor</h2>
            <p className="text-sky-100 mb-6">Create interactive lessons, reach learners worldwide, and build a curriculum that inspires future engineers.</p>

            <div className="flex gap-3 flex-wrap">
              <Link to="/instructor/apply" className="inline-flex items-center gap-2 bg-white text-sky-700 px-5 py-2 rounded-md font-semibold shadow hover:translate-y-[-1px]">
                Apply to teach
              </Link>

              <Link to="/instructor/dashboard" className="inline-flex items-center gap-2 border border-white/30 text-white px-5 py-2 rounded-md hover:bg-white/5">
                Instructor dashboard
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="bg-white/10 rounded p-3 text-center">
                <div className="text-2xl font-bold">120+</div>
                <div className="text-sm text-sky-100">Active students</div>
              </div>
              <div className="bg-white/10 rounded p-3 text-center">
                <div className="text-2xl font-bold">85</div>
                <div className="text-sm text-sky-100">Published lessons</div>
              </div>
              <div className="bg-white/10 rounded p-3 text-center">
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-sm text-sky-100">Avg rating</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            {/* subtle illustration */}
            <svg className="w-56 h-56" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0" stopColor="#fff" stopOpacity="0.9"/>
                  <stop offset="1" stopColor="#38bdf8" stopOpacity="0.15"/>
                </linearGradient>
              </defs>
              <rect x="10" y="10" rx="20" ry="20" width="180" height="180" fill="url(#g1)" />
              <g transform="translate(20,30)" fill="#fff" opacity="0.95">
                <rect x="0" y="0" width="120" height="18" rx="4"/>
                <rect x="0" y="30" width="90" height="10" rx="4"/>
                <rect x="0" y="50" width="100" height="10" rx="4"/>
                <circle cx="150" cy="80" r="20" fill="#a78bfa" />
                <path d="M130 100 q20 -30 40 0" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}