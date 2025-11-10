// ...existing code...
import React from "react";
import { Link } from "react-router-dom";

export default function LessonCard({ lesson }) {
  const id = lesson?.id ?? "unknown";

  return (
    <article className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
      <Link
        to={`/lesson/${id}`}
        state={{ lesson }}
        className="block focus:outline-none focus:ring-2 focus:ring-sky-400"
        aria-label={`Open lesson ${lesson?.title ?? id}`}
      >
        <div className="aspect-video bg-gray-200">
          {lesson?.thumbnail ? (
            <img
              src={lesson.thumbnail}
              alt={lesson.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7M7 7v10M17 7v10" />
              </svg>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-medium text-lg text-sky-700">{lesson?.title ?? "Untitled lesson"}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{lesson?.description ?? ""}</p>
          <div className="mt-3 text-xs text-gray-500">
            {lesson?.duration ?? "—"} • {lesson?.difficulty ?? "—"}
          </div>
        </div>
      </Link>
    </article>
  );
}
// ...existing code...