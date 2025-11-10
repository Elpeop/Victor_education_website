import React, { useState } from "react";
import LessonCard from "../Components/LessonCard";

export default function Explore() {
  const [filter, setFilter] = useState({ difficulty: "", topic: "", format: "" });

  const lessons = [
    { id: 1, title: "Introduction to Arduino", description: "Basics of Arduino and circuits", difficulty: "Beginner", topic: "Electronics", format: "Interactive", thumbnail: "https://placehold.co/600x360/png", duration: "2h" },
    { id: 2, title: "PID Control for Line Following", description: "Tuning PID for mobile robots", difficulty: "Advanced", topic: "Control", format: "Video", thumbnail: "https://placehold.co/600x360/png", duration: "1.5h" },
    { id: 3, title: "Sensor Integration Basics", description: "Working with ultrasonic and IR sensors", difficulty: "Intermediate", topic: "Sensors", format: "Quiz", thumbnail: "https://placehold.co/600x360/png", duration: "1h" }
  ];

  const filtered = lessons.filter(l =>
    (filter.difficulty ? l.difficulty === filter.difficulty : true) &&
    (filter.topic ? l.topic === filter.topic : true) &&
    (filter.format ? l.format === filter.format : true)
  );

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Explore Lessons</h1>
          <p className="text-gray-600">Filter lessons by difficulty, topic, or format.</p>
        </header>

        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid sm:grid-cols-3 gap-3">
            <select value={filter.difficulty} onChange={(e) => setFilter({...filter, difficulty: e.target.value})} className="p-2 border rounded">
              <option value="">All difficulties</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <select value={filter.topic} onChange={(e) => setFilter({...filter, topic: e.target.value})} className="p-2 border rounded">
              <option value="">All topics</option>
              <option>Electronics</option>
              <option>Control</option>
              <option>Sensors</option>
            </select>
            <select value={filter.format} onChange={(e) => setFilter({...filter, format: e.target.value})} className="p-2 border rounded">
              <option value="">All formats</option>
              <option>Video</option>
              <option>Interactive</option>
              <option>Quiz</option>
            </select>
          </div>
        </div>

        {filtered.length ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(l => <LessonCard key={l.id} lesson={l} />)}
          </div>
        ) : (
          <div className="bg-white p-8 rounded shadow text-center text-gray-600">
            No lessons match your filters.
          </div>
        )}
      </div>
    </main>
  );
}