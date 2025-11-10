import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";

export default function Lesson() {
  const { id } = useParams();
  const { state } = useLocation();
  const lesson = state?.lesson ?? {
    id,
    title: "Introduction to Arduino",
    description: "A hands-on intro to Arduino programming and electronics.",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    content: "This lesson covers wiring, sketch basics, and an LED blink example.",
    code: `void setup() {\n  pinMode(LED_BUILTIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_BUILTIN, HIGH);\n  delay(1000);\n  digitalWrite(LED_BUILTIN, LOW);\n  delay(1000);\n}`
  };

  const [tab, setTab] = useState("content");

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-semibold mb-2">{lesson.title}</h1>
          <p className="text-gray-600 mb-4">{lesson.description}</p>

          <div className="aspect-video bg-black mb-4">
            <iframe src={lesson.video_url} title="lesson video" className="w-full h-full" allowFullScreen />
          </div>

          <div className="border-b mb-4">
            <nav className="flex gap-4">
              <button onClick={() => setTab("content")} className={`py-2 ${tab === "content" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}>Content</button>
              <button onClick={() => setTab("code")} className={`py-2 ${tab === "code" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}>Code</button>
            </nav>
          </div>

          {tab === "content" ? (
            <div className="prose">
              <p>{lesson.content}</p>
            </div>
          ) : (
            <pre className="bg-gray-900 text-white p-4 rounded overflow-auto"><code>{lesson.code}</code></pre>
          )}
        </div>
      </div>
    </main>
  );
}