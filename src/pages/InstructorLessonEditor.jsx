import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { instructorApi, lessonApi } from "../api/api";

const difficulties = ["Beginner", "Intermediate", "Advanced"];

export default function InstructorLessonEditor() {
  const { id } = useParams(); // "new" or module id
  const isNew = id === "new";
  const navigate = useNavigate();
  const { user } = useAuth();

  const [moduleData, setModuleData] = useState({
    title: "",
    description: "",
    difficulty: "Beginner",
    published: false,
  });
  const [lessons, setLessons] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.is_instructor) {
      navigate("/instructor/apply");
      return;
    }
    if (!isNew) {
      (async () => {
        try {
          setLoading(true);
          const res = await instructorApi.getModule(id);
          setModuleData({
            title: res.data.title,
            description: res.data.description,
            difficulty: res.data.difficulty,
            published: res.data.published,
          });
          setLessons(res.data.lessons || []);
          setError(null);
        } catch (e) {
          setError(e.response?.data?.detail || "Failed to load module");
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id, isNew, user, navigate]);

  const sortedLessons = useMemo(
    () => [...lessons].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [lessons]
  );

  const saveModule = async () => {
    setSaving(true);
    try {
      if (isNew) {
        const res = await instructorApi.createModule(moduleData);
        navigate(`/instructor/lesson/${res.data.id}`, { replace: true });
        return;
      } else {
        const res = await instructorApi.updateModule(Number(id), moduleData);
        setModuleData({
          title: res.data.title,
          description: res.data.description,
          difficulty: res.data.difficulty,
          published: res.data.published,
        });
      }
      setError(null);
    } catch (e) {
      setError(e.response?.data?.detail || "Failed to save module");
    } finally {
      setSaving(false);
    }
  };

  const addLesson = async () => {
    const title = prompt("Lesson title:");
    if (!title) return;
    try {
      const res = await lessonApi.create({
        module: Number(id),
        title,
        description: "",
        content: "",
        video_url: "",
        duration: "",
        difficulty: moduleData.difficulty,
        order: (lessons?.length || 0) + 1,
      });
      setLessons((prev) => [...prev, res.data]);
    } catch (e) {
      alert("Failed to add lesson");
      console.error(e);
    }
  };

  const updateLesson = async (lesson) => {
    try {
      const res = await lessonApi.update(lesson.id, lesson);
      setLessons((prev) => prev.map((l) => (l.id === lesson.id ? res.data : l)));
    } catch (e) {
      alert("Failed to update lesson");
    }
  };

  const removeLesson = async (lessonId) => {
    if (!confirm("Delete this lesson?")) return;
    try {
      await lessonApi.remove(lessonId);
      setLessons((prev) => prev.filter((l) => l.id !== lessonId));
    } catch (e) {
      alert("Failed to delete lesson");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading editor…</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">
            {isNew ? "Create Module" : `Edit Module`}
          </h1>
          <Link to="/instructor/dashboard" className="text-sky-600 hover:underline">
            ← Back to Dashboard
          </Link>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded">{error}</div>
        )}

        <section className="bg-white p-6 rounded shadow space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              className="w-full border p-2 rounded"
              value={moduleData.title}
              onChange={(e) => setModuleData({ ...moduleData, title: e.target.value })}
              placeholder="e.g., Introduction to Arduino"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              className="w-full border p-2 rounded h-28"
              value={moduleData.description}
              onChange={(e) => setModuleData({ ...moduleData, description: e.target.value })}
              placeholder="What will students learn?"
            />
          </div>
          <div className="flex gap-4 items-center">
            <div>
              <label className="block text-sm font-medium">Difficulty</label>
              <select
                className="border p-2 rounded"
                value={moduleData.difficulty}
                onChange={(e) => setModuleData({ ...moduleData, difficulty: e.target.value })}
              >
                {difficulties.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            {!isNew && (
              <label className="flex items-center gap-2 mt-6">
                <input
                  type="checkbox"
                  checked={moduleData.published}
                  onChange={(e) => setModuleData({ ...moduleData, published: e.target.checked })}
                />
                <span>Published</span>
              </label>
            )}
          </div>

          <button
            onClick={saveModule}
            disabled={saving || !moduleData.title.trim()}
            className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 disabled:bg-sky-400"
          >
            {isNew ? (saving ? "Creating…" : "Create Module") : (saving ? "Saving…" : "Save")}
          </button>
        </section>

        {!isNew && (
          <section className="bg-white p-6 rounded shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium text-lg">Lessons</h2>
              <button
                onClick={addLesson}
                className="text-sm bg-emerald-600 text-white px-3 py-2 rounded hover:bg-emerald-700"
              >
                + Add Lesson
              </button>
            </div>

            {sortedLessons.length === 0 ? (
              <div className="text-gray-500">No lessons yet.</div>
            ) : (
              <div className="space-y-3">
                {sortedLessons.map((l) => (
                  <div key={l.id} className="border rounded p-3">
                    <input
                      className="w-full border p-2 rounded mb-2"
                      value={l.title}
                      onChange={(e) => (l.title = e.target.value)}
                      onBlur={() => updateLesson(l)}
                    />
                    <textarea
                      className="w-full border p-2 rounded mb-2 h-24"
                      value={l.description || ""}
                      onChange={(e) => (l.description = e.target.value)}
                      onBlur={() => updateLesson(l)}
                      placeholder="Lesson description"
                    />
                    <div className="flex gap-2">
                      <input
                        className="flex-1 border p-2 rounded"
                        placeholder="Video URL"
                        value={l.video_url || ""}
                        onChange={(e) => (l.video_url = e.target.value)}
                        onBlur={() => updateLesson(l)}
                      />
                      <input
                        className="w-32 border p-2 rounded"
                        placeholder="Duration"
                        value={l.duration || ""}
                        onChange={(e) => (l.duration = e.target.value)}
                        onBlur={() => updateLesson(l)}
                      />
                      <input
                        className="w-24 border p-2 rounded"
                        type="number"
                        min={0}
                        value={l.order ?? 0}
                        onChange={(e) => (l.order = Number(e.target.value))}
                        onBlur={() => updateLesson(l)}
                      />
                      <button
                        onClick={() => removeLesson(l.id)}
                        className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}