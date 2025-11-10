import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Thread() {
  const { id } = useParams();
  const { user } = useAuth();
  const [thread, setThread] = useState(null);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // mock load
    setTimeout(() => {
      setThread({
        id,
        title: "Help with PID tuning for line follower",
        content: "I'm getting oscillation at certain speeds — how should I tune P/I/D?",
        author: { name: "robotmaker", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=RM" },
        created_at: new Date().toISOString(),
        replies: [
          { id: 1, author: { name: "tuning_expert", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=TE" }, content: "Start with P then add I", created_at: new Date().toISOString() }
        ]
      });
      setLoading(false);
    }, 300);
  }, [id]);

  if (loading) return <div className="p-6">Loading…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  const submitReply = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    setThread(prev => ({ ...prev, replies: [...prev.replies, { id: Date.now(), author: { name: user?.username ?? "guest" }, content: reply, created_at: new Date().toISOString() }] }));
    setReply("");
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex gap-4 items-start">
            <img src={thread.author.avatar} alt="" className="w-12 h-12 rounded-full" />
            <div>
              <h1 className="text-2xl font-semibold">{thread.title}</h1>
              <div className="text-sm text-gray-500">By {thread.author.name} • {new Date(thread.created_at).toLocaleDateString()}</div>
              <p className="mt-4 text-gray-700">{thread.content}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold mb-4">Replies ({thread.replies.length})</h2>
          <div className="space-y-4">
            {thread.replies.map(r => (
              <div key={r.id} className="flex gap-4">
                <img src={r.author.avatar || "https://api.dicebear.com/7.x/initials/svg?seed=G"} alt="" className="w-10 h-10 rounded-full" />
                <div>
                  <div className="text-sm font-medium">{r.author.name} <span className="text-gray-400 text-xs">• {new Date(r.created_at).toLocaleDateString()}</span></div>
                  <div className="text-gray-700">{r.content}</div>
                </div>
              </div>
            ))}
          </div>

          {user ? (
            <form onSubmit={submitReply} className="mt-6">
              <textarea value={reply} onChange={(e) => setReply(e.target.value)} rows={4} className="w-full p-3 border rounded" placeholder="Write a reply..." />
              <div className="mt-3 flex justify-end">
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Post Reply</button>
              </div>
            </form>
          ) : (
            <div className="mt-6 text-center text-gray-600">
              <Link to="/login" className="text-sky-600 hover:underline">Log in</Link> to reply.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}