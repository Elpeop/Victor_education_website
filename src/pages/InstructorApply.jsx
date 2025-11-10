import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { instructorApi } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function InstructorApply() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ expertise: [], experience: "", motivation: "", sample_lesson: "", resume_url: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [existingApplication, setExistingApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }

    if (user.is_instructor) {
      // Don't auto-navigate; show button instead to avoid loops
      setLoading(false);
      return;
    }

    instructorApi.apply()
      .then(res => {
        setExistingApplication(res.data);
        setLoading(false);
      })
      .catch(err => {
        if (err.response?.status === 404) {
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setStatus("submitting");
    try {
      console.debug("Apply: submitting application", form);
      const response = await instructorApi.apply(form);
      console.debug("Apply: submitted =", response.data);
      setStatus("success");
      setExistingApplication(response.data);
    } catch (err) {
      console.debug("Apply: submit error =", err.response?.data || err.message);
      setStatus("error");
      setErrors(err.response?.data || { general: "Submission failed" });
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </main>
    );
  }

  if (user?.is_instructor) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">You're already an instructor</h2>
          <Link to="/instructor/dashboard" className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700">
            Go to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  if (existingApplication) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white p-6 rounded shadow max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Application Status</h2>
          <p className="mb-2">
            <strong>Status:</strong> 
            <span className={`ml-2 px-2 py-1 rounded ${
              existingApplication.status === 'approved' ? 'bg-green-100 text-green-800' :
              existingApplication.status === 'rejected' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {existingApplication.status}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Submitted: {new Date(existingApplication.submitted_at).toLocaleDateString()}
          </p>
          {existingApplication.review_notes && (
            <div className="mt-4 p-3 bg-gray-50 rounded">
              <strong>Review Notes:</strong>
              <p>{existingApplication.review_notes}</p>
            </div>
          )}
          {existingApplication.status === 'approved' && (
            <div className="mt-6">
              <p className="text-green-600 font-medium mb-2">
                Congratulations! Your application has been approved.
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Please log out and log back in to access your instructor dashboard.
              </p>
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Apply to Become an Instructor</h2>

        {errors.general && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
            {errors.general}
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-medium">Areas of Expertise</label>
          <input
            type="text"
            placeholder="e.g., Arduino, Raspberry Pi, Python (comma-separated)"
            value={form.expertise.join(", ")}
            onChange={(e) => setForm({ 
              ...form, 
              expertise: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
            })}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Teaching Experience</label>
          <textarea
            value={form.experience}
            onChange={(e) => setForm({ ...form, experience: e.target.value })}
            placeholder="Describe your teaching or professional experience..."
            className="w-full border p-2 rounded h-32"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Why do you want to teach?</label>
          <textarea
            value={form.motivation}
            onChange={(e) => setForm({ ...form, motivation: e.target.value })}
            placeholder="Tell us your motivation..."
            className="w-full border p-2 rounded h-32"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Sample Lesson Plan (optional)</label>
          <textarea
            value={form.sample_lesson}
            onChange={(e) => setForm({ ...form, sample_lesson: e.target.value })}
            placeholder="Describe a sample lesson you'd like to teach..."
            className="w-full border p-2 rounded h-32"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Resume/Portfolio URL (optional)</label>
          <input
            type="url"
            value={form.resume_url}
            onChange={(e) => setForm({ ...form, resume_url: e.target.value })}
            placeholder="https://..."
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-sky-600 text-white py-2 rounded hover:bg-sky-700 disabled:bg-sky-400"
        >
          {status === "submitting" ? "Submitting..." : "Submit Application"}
        </button>

        {status === "success" && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded">
            Application submitted successfully! We'll review it soon.
          </div>
        )}
      </form>
    </main>
  );
}