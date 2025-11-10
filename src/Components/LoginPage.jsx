import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    // mock login
    setUser({ username: form.username, email: `${form.username}@example.com` });
    navigate("/profile");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Sign in</h2>

        <input className="w-full border px-3 py-2 rounded mb-2" placeholder="Username" value={form.username} onChange={(e) => setForm(s => ({...s, username: e.target.value}))} />
        <input type="password" className="w-full border px-3 py-2 rounded mb-4" placeholder="Password" value={form.password} onChange={(e) => setForm(s => ({...s, password: e.target.value}))} />

        <button className="w-full bg-blue-600 text-white py-2 rounded mb-3">Sign in</button>

        <div className="text-center text-sm">
          Don't have an account? <Link to="/signup" className="text-sky-600">Create one</Link>
        </div>
      </form>
    </main>
  );
}