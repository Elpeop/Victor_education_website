import React from "react";
import { Link } from "react-router-dom";

export default function TestPage() {
  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4">Route Test</h1>
        <div className="space-y-2">
          <Link to="/" className="text-sky-600">Home</Link>
          <Link to="/explore" className="text-sky-600">Explore</Link>
          <Link to="/community" className="text-sky-600">Community</Link>
          <Link to="/profile" className="text-sky-600">Profile</Link>
          <Link to="/instructor/apply" className="text-sky-600">
            Apply (Instructor)
          </Link>
        </div>
      </div>
    </main>
  );
}