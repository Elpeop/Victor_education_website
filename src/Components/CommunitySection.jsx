import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CommunitySection() {
  const [q, setQ] = useState("");

  const posts = [
    { id: "p1", title: "How to wire a motor", excerpt: "Recommended motor drivers for small robots and wiring tips.", author: "alex", avatarSeed: "alex", tags: ["hardware","motors"], replies: 4, created: "2025-03-01" },
    { id: "p2", title: "Best sensors for beginners", excerpt: "Which distance sensors are easy to use?", author: "maria", avatarSeed: "maria", tags: ["sensors","beginner"], replies: 2, created: "2025-03-02" },
    { id: "p3", title: "Line following PID tuning", excerpt: "My robot oscillates — how to tune PID properly?", author: "sam", avatarSeed: "sam", tags: ["control","pid"], replies: 8, created: "2025-03-03" }
  ];

  const filtered = posts.filter(p => (p.title + p.excerpt + p.tags.join(" ")).toLowerCase().includes(q.toLowerCase()));

  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h3 className="text-lg font-medium">Community Threads</h3>

        <div className="flex items-center gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search threads or tags..."
            className="px-3 py-2 border rounded-md w-64"
            aria-label="Search community threads"
          />
          <Link to="/community/new" className="bg-blue-600 text-white px-3 py-2 rounded-md">New Discussion</Link>
        </div>
      </div>

      <ul className="space-y-3">
        {filtered.length ? filtered.map(p => (
          <li key={p.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
            <Link to={`/community/thread/${p.id}`} className="flex gap-4 items-start">
              <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${p.avatarSeed}`} alt="" className="w-12 h-12 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-sky-700">{p.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{p.excerpt}</p>
                    <div className="mt-2 flex gap-2">
                      {p.tags.map(t => (
                        <span key={t} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div>{p.replies} replies</div>
                    <div className="mt-2">{p.created}</div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        )) : (
          <li className="p-6 text-center text-gray-500">No threads found. Try a different search.</li>
        )}
      </ul>

      <div className="mt-4 text-sm text-gray-500">
        <Link to="/community" className="text-sky-600 hover:underline">View all discussions</Link>
      </div>
    </section>
  );
}

