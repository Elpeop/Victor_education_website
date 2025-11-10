import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { instructorApi } from "../api/api";

export default function InstructorDashboard() {
  const { user } = useAuth();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.is_instructor) {
      setLoading(false);
      return;
    }
    const fetchModules = async () => {
      try {
        setLoading(true);
        const res = await instructorApi.modules();
        setModules(res.data || []);
        setError(null);
      } catch (e) {
        setError(e.response?.data?.detail || e.message || "Failed to load modules");
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, [user]);

  const handleDelete = async (moduleId) => {
    if (!window.confirm("Are you sure you want to delete this module?")) {
      return;
    }

    try {
      await instructorApi.deleteModule(moduleId);
      setModules(modules.filter(m => m.id !== moduleId));
    } catch (err) {
      alert("Failed to delete module");
      console.error(err);
    }
  };

  const handleTogglePublish = async (module) => {
    try {
      const response = await instructorApi.updateModule(module.id, {
        ...module,
        published: !module.published
      });
      setModules(modules.map(m => m.id === module.id ? response.data : m));
    } catch (err) {
      alert("Failed to update module");
      console.error(err);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 mb-2">Loading dashboard...</div>
          <div className="text-sm text-gray-400">User: {user?.username} (Instructor: {user?.is_instructor ? 'Yes' : 'No'})</div>
        </div>
      </main>
    );
  }

  // Redirect non-instructors
  if (!user?.is_instructor) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Instructor Access Required</h2>
          <p className="mb-4 text-gray-600">You need to apply to become an instructor first.</p>
          <Link
            to="/instructor/apply"
            className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
          >
            Apply Now
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Instructor Dashboard</h1>
          <p className="text-gray-600">Welcome, {user?.username ?? "Instructor"}</p>
        </header>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium text-lg">Your Modules</h2>
            <Link 
              to="/instructor/lesson/new" 
              className="text-sm bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700"
            >
              + Create New Module
            </Link>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
              <div className="font-medium">Error loading modules:</div>
              <div className="text-sm mt-1">{error}</div>
            </div>
          )}

          {modules.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-4">You haven't created any modules yet.</p>
              <Link 
                to="/instructor/lesson/new"
                className="inline-block px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
              >
                Create Your First Module
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {modules.map(module => (
                <div key={module.id} className="flex justify-between items-center border rounded p-4 hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="font-medium text-lg">{module.title}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {module.lessons?.length || 0} lessons • 
                      <span className={`ml-2 px-2 py-1 rounded text-xs ${
                        module.published 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {module.published ? 'Published' : 'Draft'}
                      </span>
                      <span className="ml-2">Difficulty: {module.difficulty}</span>
                    </div>
                    {module.description && (
                      <p className="text-sm text-gray-600 mt-2">{module.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Link 
                      to={`/instructor/lesson/${module.id}`}
                      className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleTogglePublish(module)}
                      className={`px-3 py-1 rounded ${
                        module.published
                          ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {module.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      onClick={() => handleDelete(module.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {modules.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-sm text-gray-600 mb-1">Total Modules</h3>
              <p className="text-2xl font-bold">{modules.length}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-sm text-gray-600 mb-1">Published</h3>
              <p className="text-2xl font-bold text-green-600">
                {modules.filter(m => m.published).length}
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-sm text-gray-600 mb-1">Total Lessons</h3>
              <p className="text-2xl font-bold">
                {modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0)}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}